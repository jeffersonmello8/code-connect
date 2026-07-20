import { AxiosError, type AxiosResponse } from 'axios'
import { describe, expect, it } from 'vitest'
import { getApiErrorMessage } from './getApiErrorMessage'
import type { ApiErrorBody } from './types'

function createAxiosError(
  data: ApiErrorBody,
  status = 400,
): AxiosError<ApiErrorBody> {
  return new AxiosError(
    'Request failed',
    AxiosError.ERR_BAD_REQUEST,
    undefined,
    undefined,
    {
      status,
      data,
    } as AxiosResponse<ApiErrorBody>,
  )
}

describe('getApiErrorMessage', () => {
  it('should return string message from API error', () => {
    const error = createAxiosError({ message: 'Credenciais inválidas' })

    expect(getApiErrorMessage(error)).toBe('Credenciais inválidas')
  })

  it('should join array messages from API error', () => {
    const error = createAxiosError({
      message: ['email must be an email', 'password is too short'],
    })

    expect(getApiErrorMessage(error)).toBe(
      'email must be an email, password is too short',
    )
  })

  it('should return fallback for unknown errors', () => {
    expect(getApiErrorMessage(new Error('boom'), 'Falhou')).toBe('Falhou')
  })
})
