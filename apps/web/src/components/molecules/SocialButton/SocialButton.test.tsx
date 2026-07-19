import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SocialButton } from './SocialButton'

describe('SocialButton', () => {
  it('should render logo and label for github', () => {
    const { container } = render(<SocialButton provider="github" label="Github" />)
    const img = container.querySelector('img')
    expect(img).toHaveAttribute('src', '/github.svg')
    expect(img).toHaveAttribute('alt', '')
    expect(img).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('Github')).toBeInTheDocument()
  })

  it('should render logo and label for gmail', () => {
    const { container } = render(<SocialButton provider="gmail" label="Gmail" />)
    const img = container.querySelector('img')
    expect(img).toHaveAttribute('src', '/gmail.svg')
    expect(img).toHaveAttribute('alt', '')
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
