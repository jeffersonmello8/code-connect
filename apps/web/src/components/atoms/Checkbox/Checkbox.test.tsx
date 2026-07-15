import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('should render label', () => {
    render(<Checkbox label="Lembrar-me" />)
    expect(screen.getByLabelText('Lembrar-me')).toBeInTheDocument()
  })

  it('should call onChange when toggled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox label="Lembrar-me" onChange={onChange} />)

    await user.click(screen.getByLabelText('Lembrar-me'))
    expect(onChange).toHaveBeenCalled()
  })
})
