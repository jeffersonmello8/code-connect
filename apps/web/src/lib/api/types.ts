export interface UserResponse {
  id: string
  name: string
  email: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface ApiErrorBody {
  statusCode?: number
  message?: string | string[]
  error?: string
}
