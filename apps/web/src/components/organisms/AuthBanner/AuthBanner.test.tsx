import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AuthBanner } from './AuthBanner'

describe('AuthBanner', () => {
  it('should render image with src and alt', () => {
    render(
      <AuthBanner
        src="/banner-login.png"
        alt="Banner de login"
      />,
    )
    const img = screen.getByRole('img', { name: 'Banner de login' })
    expect(img).toHaveAttribute('src', '/banner-login.png')
  })

  it('should render brand overlay', () => {
    render(
      <AuthBanner
        src="/banner-login.png"
        alt="Banner de login"
      />,
    )
    expect(screen.getByText('code connect')).toBeInTheDocument()
  })
})
