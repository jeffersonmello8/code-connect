import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { axe } from '../../test/a11y'
import { RegisterPage } from './RegisterPage'

function renderRegisterPage() {
  return render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>,
  )
}

describe('RegisterPage a11y (WCAG AA)', () => {
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
