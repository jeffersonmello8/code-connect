import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { PostCard } from './PostCard'

const post = {
  id: 'post-1',
  title: 'Titulo do post',
  description: 'Descricao do post',
  code: null,
  thumbnailUrl: null,
  tags: ['React'],
  author: { id: '1', name: 'Julio Santos', handle: '@julio_santos' },
  likesCount: 2,
  commentsCount: 3,
  likedByMe: false,
  createdAt: '2026-01-01T00:00:00.000Z',
}

describe('PostCard', () => {
  it('should render post title and author', () => {
    render(
      <MemoryRouter>
        <PostCard
          post={post}
          isAuthenticated={false}
          onLike={vi.fn()}
          onShare={vi.fn()}
        />
      </MemoryRouter>,
    )

    expect(screen.getByText('Titulo do post')).toBeInTheDocument()
    expect(screen.getByText('@julio_santos')).toBeInTheDocument()
  })

  it('should disable like button when user is not authenticated', () => {
    render(
      <MemoryRouter>
        <PostCard
          post={post}
          isAuthenticated={false}
          onLike={vi.fn()}
          onShare={vi.fn()}
        />
      </MemoryRouter>,
    )

    expect(screen.getByRole('button', { name: 'Curtir post' })).toBeDisabled()
  })

  it('should call onLike when authenticated user clicks like', async () => {
    const user = userEvent.setup()
    const onLike = vi.fn()

    render(
      <MemoryRouter>
        <PostCard
          post={post}
          isAuthenticated
          onLike={onLike}
          onShare={vi.fn()}
        />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'Curtir post' }))
    expect(onLike).toHaveBeenCalledWith('post-1')
  })
})
