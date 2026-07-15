import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SocialButton } from './SocialButton'

describe('SocialButton', () => {
  it('should render logo and label for github', () => {
    render(<SocialButton provider="github" label="Github" />)
    expect(screen.getByAltText('Logo do GitHub')).toHaveAttribute('src', '/github.png')
    expect(screen.getByText('Github')).toBeInTheDocument()
  })

  it('should render logo and label for gmail', () => {
    render(<SocialButton provider="gmail" label="Gmail" />)
    expect(screen.getByAltText('Logo do Gmail')).toHaveAttribute('src', '/gmail.png')
    expect(screen.getByText('Gmail')).toBeInTheDocument()
  })

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<SocialButton provider="github" label="Github" onClick={onClick} />)

    await user.click(screen.getByRole('button', { name: 'Github' }))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
