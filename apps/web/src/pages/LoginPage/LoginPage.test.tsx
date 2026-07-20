import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AxiosError, type AxiosResponse } from 'axios'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthProvider } from '../../contexts/AuthContext'
import * as authApi from '../../lib/api/authApi'
import { LoginPage } from './LoginPage'

vi.mock('../../lib/api/authApi', () => ({
  login: vi.fn(),
  register: vi.fn(),
  me: vi.fn(),
}))

function renderLoginPage() {
  return render(
    <AuthProvider>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </AuthProvider>,
  )
}

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    sessionStorage.clear()
    vi.mocked(authApi.me).mockRejectedValue(new Error('no session'))
  })

  it('should show API error on invalid credentials', async () => {
    const user = userEvent.setup()

    vi.mocked(authApi.login).mockRejectedValue(
      new AxiosError(
        'Unauthorized',
        AxiosError.ERR_BAD_REQUEST,
        undefined,
        undefined,
        { status: 401, data: { message: 'Unauthorized' } } as AxiosResponse,
      ),
    )

    renderLoginPage()

    await user.type(screen.getByLabelText('Email'), 'user@example.com')
    await user.type(screen.getByLabelText('Senha'), '123456')
    await user.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Email ou senha inválidos')
    })
  })
})
