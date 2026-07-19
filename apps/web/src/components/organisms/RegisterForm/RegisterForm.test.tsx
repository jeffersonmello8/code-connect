import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { RegisterForm } from './RegisterForm'

function renderRegisterForm(props?: { onSubmit?: (data: unknown) => void }) {
  return render(
    <MemoryRouter>
      <RegisterForm {...props} />
    </MemoryRouter>,
  )
}

describe('RegisterForm', () => {
  it('should render form fields', () => {
    renderRegisterForm()
    expect(screen.getByRole('heading', { name: 'Cadastro' })).toBeInTheDocument()
    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByLabelText('Lembrar-me')).toBeInTheDocument()
  })

  it('should show errors on submit with empty fields', async () => {
    const user = userEvent.setup()
    renderRegisterForm()

    await user.click(screen.getByRole('button', { name: 'Cadastrar' }))

    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument()
    expect(screen.getByText('Email é obrigatório')).toBeInTheDocument()
    expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument()
  })

  it('should call onSubmit with valid data', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    renderRegisterForm({ onSubmit })

    await user.type(screen.getByLabelText('Nome'), 'Maria Silva')
    await user.type(screen.getByLabelText('Email'), 'maria@example.com')
    await user.type(screen.getByLabelText('Senha'), '123456')
    await user.click(screen.getByRole('button', { name: 'Cadastrar' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'Maria Silva',
        email: 'maria@example.com',
        password: '123456',
        rememberMe: false,
      })
    })
  })

  it('should render login link', () => {
    renderRegisterForm()
    expect(screen.getByRole('link', { name: 'Faça seu login!' })).toHaveAttribute(
      'href',
      '/login',
    )
  })
})
