import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAxiosError } from 'axios'
import { AuthLayout } from '../../components/templates/AuthLayout'
import { LoginForm } from '../../components/organisms/LoginForm'
import { getApiErrorMessage } from '../../lib/api/getApiErrorMessage'
import { useAuth } from '../../contexts/AuthContext'
import type { LoginFormData } from '../../hooks/useLoginForm'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit({ email, password, rememberMe }: LoginFormData) {
    try {
      await login({ email, password }, rememberMe)
      navigate('/')
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        setFormError('Email ou senha inválidos')
        return
      }

      setFormError(getApiErrorMessage(error, 'Não foi possível fazer login'))
    }
  }

  return (
    <AuthLayout
      bannerSrc="/banner-login.webp"
      bannerAlt="Desenvolvedora trabalhando em um laptop com elementos digitais verdes ao fundo"
    >
      <LoginForm
        onSubmit={handleSubmit}
        formError={formError}
        onFormErrorClear={() => setFormError(null)}
      />
    </AuthLayout>
  )
}
