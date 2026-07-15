import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { FormField } from './FormField'

describe('FormField', () => {
  it('should render label and input', () => {
    render(
      <FormField
        id="email"
        label="E-mail"
        value=""
        onChange={() => {}}
      />,
    )
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
  })

  it('should render placeholder', () => {
    render(
      <FormField
        id="email"
        label="E-mail"
        value=""
        placeholder="usuario123"
        onChange={() => {}}
      />,
    )
    expect(screen.getByPlaceholderText('usuario123')).toBeInTheDocument()
  })

  it('should show error message', () => {
    render(
      <FormField
        id="email"
        label="E-mail"
        value=""
        error="E-mail é obrigatório"
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('E-mail é obrigatório')
  })

  it('should call onChange when typed', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <FormField
        id="email"
        label="E-mail"
        value=""
        onChange={onChange}
      />,
    )

    await user.type(screen.getByLabelText('E-mail'), 'a')
    expect(onChange).toHaveBeenCalled()
  })
})
