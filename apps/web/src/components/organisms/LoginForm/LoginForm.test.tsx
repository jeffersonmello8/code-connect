import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { LoginForm } from './LoginForm'

function renderLoginForm(props?: { onSubmit?: (data: unknown) => void }) {
  return render(
    <MemoryRouter>
      <LoginForm {...props} />
    </MemoryRouter>,
  )
}

describe('LoginForm', () => {
  it('should render form fields', () => {
    renderLoginForm()
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByLabelText('Lembrar-me')).toBeInTheDocument()
  })

  it('should show errors on submit with empty fields', async () => {
    const user = userEvent.setup()
    renderLoginForm()

    await user.click(screen.getByRole('button', { name: 'Login' }))

    expect(screen.getByText('Email é obrigatório')).toBeInTheDocument()
    expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument()
  })

  it('should call onSubmit with valid data', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    renderLoginForm({ onSubmit })

    await user.type(screen.getByLabelText('Email'), 'user@example.com')
    await user.type(screen.getByLabelText('Senha'), '123456')
    await user.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: '123456',
        rememberMe: false,
      })
    })
  })

  it('should render register link', () => {
    renderLoginForm()
    expect(screen.getByRole('link', { name: 'Crie seu cadastro!' })).toHaveAttribute(
      'href',
      '/register',
    )
  })

  it('should render form error message', () => {
    renderLoginForm({ formError: 'Email ou senha inválidos' } as never)
    expect(screen.getByRole('alert')).toHaveTextContent('Email ou senha inválidos')
  })
})
