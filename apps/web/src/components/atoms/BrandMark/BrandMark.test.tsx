import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BrandMark } from './BrandMark'

describe('BrandMark', () => {
  it('should render image with aria-hidden', () => {
    const { container } = render(<BrandMark />)
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('aria-hidden', 'true')
    expect(img).toHaveAttribute('src', '/brand-mark.webp')
  })
})
