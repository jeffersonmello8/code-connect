import { apiClient } from './apiClient'
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  UserResponse,
} from './types'

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', payload)
  return data
}

export async function register(payload: RegisterPayload): Promise<UserResponse> {
  const { data } = await apiClient.post<UserResponse>('/users', payload)
  return data
}

export async function me(): Promise<UserResponse> {
  const { data } = await apiClient.get<UserResponse>('/auth/me')
  return data
}
