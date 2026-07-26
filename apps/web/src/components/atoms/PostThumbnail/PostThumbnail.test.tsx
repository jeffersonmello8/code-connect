import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PostThumbnail } from './PostThumbnail'

describe('PostThumbnail', () => {
  it('should render placeholder when src is missing', () => {
    render(<PostThumbnail alt="Post sem imagem" />)
    expect(screen.getByRole('img', { name: 'Post sem imagem' })).toBeInTheDocument()
  })

  it('should render image when src is provided', () => {
    render(<PostThumbnail src="https://example.com/image.png" alt="Post" />)
    expect(screen.getByRole('img', { name: 'Post' })).toHaveAttribute(
      'src',
      'https://example.com/image.png',
    )
  })
})
