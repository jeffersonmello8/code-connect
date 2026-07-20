import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { isAxiosError } from 'axios'
import * as authApi from '../lib/api/authApi'
import { clearToken, getToken, setToken } from '../lib/api/tokenStorage'
import type { LoginPayload, RegisterPayload, UserResponse } from '../lib/api/types'

interface AuthContextValue {
  user: UserResponse | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (payload: LoginPayload, rememberMe: boolean) => Promise<void>
  register: (payload: RegisterPayload, rememberMe: boolean) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [token, setTokenState] = useState<string | null>(() => getToken())
  const [isLoading, setIsLoading] = useState(true)

  const logout = useCallback(() => {
    clearToken()
    setTokenState(null)
    setUser(null)
  }, [])

  const bootstrap = useCallback(async () => {
    const storedToken = getToken()

    if (!storedToken) {
      setTokenState(null)
      setUser(null)
      setIsLoading(false)
      return
    }

    setTokenState(storedToken)

    try {
      const profile = await authApi.me()
      setUser(profile)
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        logout()
      } else {
        setUser(null)
      }
    } finally {
      setIsLoading(false)
    }
  }, [logout])

  useEffect(() => {
    void bootstrap()
  }, [bootstrap])

  const login = useCallback(
    async (payload: LoginPayload, rememberMe: boolean) => {
      const { access_token } = await authApi.login(payload)
      setToken(access_token, rememberMe)
      setTokenState(access_token)

      const profile = await authApi.me()
      setUser(profile)
    },
    [],
  )

  const register = useCallback(
    async (payload: RegisterPayload, rememberMe: boolean) => {
      await authApi.register(payload)
      await login(
        { email: payload.email, password: payload.password },
        rememberMe,
      )
    },
    [login],
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: Boolean(user && token),
      login,
      register,
      logout,
    }),
    [user, token, isLoading, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }

  return context
}
