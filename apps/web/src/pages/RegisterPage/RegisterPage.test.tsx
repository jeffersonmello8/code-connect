import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AxiosError, type AxiosResponse } from 'axios'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthProvider } from '../../contexts/AuthContext'
import * as authApi from '../../lib/api/authApi'
import { RegisterPage } from './RegisterPage'

vi.mock('../../lib/api/authApi', () => ({
  login: vi.fn(),
  register: vi.fn(),
  me: vi.fn(),
}))

function renderRegisterPage() {
  return render(
    <AuthProvider>
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    </AuthProvider>,
  )
}

describe('RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    sessionStorage.clear()
    vi.mocked(authApi.me).mockRejectedValue(new Error('no session'))
  })

  it('should show API error when email already exists', async () => {
    const user = userEvent.setup()

    vi.mocked(authApi.register).mockRejectedValue(
      new AxiosError(
        'Conflict',
        AxiosError.ERR_BAD_REQUEST,
        undefined,
        undefined,
        { status: 409, data: { message: 'Conflict' } } as AxiosResponse,
      ),
    )

    renderRegisterPage()

    await user.type(screen.getByLabelText('Nome'), 'Maria Silva')
    await user.type(screen.getByLabelText('Email'), 'maria@example.com')
    await user.type(screen.getByLabelText('Senha'), '123456')
    await user.click(screen.getByRole('button', { name: 'Cadastrar' }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('E-mail já cadastrado')
    })
  })
})
