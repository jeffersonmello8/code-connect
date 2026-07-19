import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AuthLayout } from './AuthLayout'

describe('AuthLayout', () => {
  it('should render banner and children in centered card', () => {
    render(
      <AuthLayout bannerSrc="/banner-login.webp" bannerAlt="Banner de login">
        <p>Conteúdo do formulário</p>
      </AuthLayout>,
    )

    expect(screen.getByRole('img', { name: 'Banner de login' })).toBeInTheDocument()
    expect(screen.getByText('Conteúdo do formulário')).toBeInTheDocument()
  })
})
