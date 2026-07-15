import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('should render with value', () => {
    render(<Input value="teste@email.com" onChange={() => {}} />)
    expect(screen.getByDisplayValue('teste@email.com')).toBeInTheDocument()
  })

  it('should call onChange when typed', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Input onChange={onChange} />)

    await user.type(screen.getByRole('textbox'), 'a')
    expect(onChange).toHaveBeenCalled()
  })

  it('should apply error styles when error is true', () => {
    render(<Input error aria-label="email" />)
    expect(screen.getByRole('textbox')).toHaveClass('border-error')
  })
})
