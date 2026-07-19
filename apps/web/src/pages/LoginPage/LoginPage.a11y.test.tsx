import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { axe } from '../../test/a11y'
import { LoginPage } from './LoginPage'

function renderLoginPage() {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
  )
}

describe('LoginPage a11y (WCAG AA)', () => {
  it('should have no accessibility violations on initial render', async () => {
    const { container } = renderLoginPage()

    expect(await axe(container)).toHaveNoViolations()
  })

  it('should have no accessibility violations with validation errors', async () => {
    const user = userEvent.setup()
    const { container } = renderLoginPage()

    await user.click(screen.getByRole('button', { name: 'Login' }))
    expect(screen.getByText('Email ou usuário é obrigatório')).toBeInTheDocument()

    expect(await axe(container)).toHaveNoViolations()
  })
})
