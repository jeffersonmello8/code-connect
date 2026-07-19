import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AuthBanner } from './AuthBanner'

describe('AuthBanner', () => {
  it('should render image with src and alt', () => {
    render(
      <AuthBanner
        src="/banner-login.webp"
        alt="Banner de login"
      />,
    )
    const img = screen.getByRole('img', { name: 'Banner de login' })
    expect(img).toHaveAttribute('src', '/banner-login.webp')
    expect(img).toHaveAttribute('fetchPriority', 'high')
    expect(img).toHaveAttribute('width', '1024')
    expect(img).toHaveAttribute('height', '683')
  })

  it('should render brand logo overlay', () => {
    render(
      <AuthBanner
        src="/banner-login.webp"
        alt="Banner de login"
      />,
    )
    expect(screen.getByAltText('code connect')).toHaveAttribute(
      'src',
      '/logo-code-connect.webp',
    )
  })
})
