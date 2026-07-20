import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthProvider } from '../../contexts/AuthContext'
import * as authApi from '../../lib/api/authApi'
import { axe } from '../../test/a11y'
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

describe('RegisterPage a11y (WCAG AA)', () => {
  beforeEach(() => {
    vi.mocked(authApi.me).mockRejectedValue(new Error('no session'))
  })

  it('should have no accessibility violations on initial render', async () => {
    const { container } = renderRegisterPage()

    expect(await axe(container)).toHaveNoViolations()
  })

  it('should have no accessibility violations with validation errors', async () => {
    const user = userEvent.setup()
    const { container } = renderRegisterPage()

    await user.click(screen.getByRole('button', { name: 'Cadastrar' }))
    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument()

    expect(await axe(container)).toHaveNoViolations()
  })
})
