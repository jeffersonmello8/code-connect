import { isAxiosError } from 'axios'
import type { ApiErrorBody } from './types'

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Ocorreu um erro inesperado. Tente novamente.',
): string {
  if (!isAxiosError<ApiErrorBody>(error)) {
    return fallback
  }

  const message = error.response?.data?.message

  if (Array.isArray(message)) {
    return message.join(', ')
  }

  if (typeof message === 'string' && message.length > 0) {
    return message
  }

  return fallback
}
