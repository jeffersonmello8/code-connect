import { Link } from 'react-router-dom'
import { Avatar } from '../../atoms/Avatar/Avatar'
import { Icon } from '../../atoms/Icon'
import { PostThumbnail } from '../../atoms/PostThumbnail/PostThumbnail'
import { Tag } from '../../atoms/Tag/Tag'
import type { PostResponse } from '../../../lib/api/postTypes'
import { cn } from '../../../lib/cn'

export interface PostCardProps {
  post: PostResponse
  isAuthenticated: boolean
  onLike: (postId: string) => void
  onShare: (postId: string) => void
  className?: string
}

export function PostCard({
  post,
  isAuthenticated,
  onLike,
  onShare,
  className,
}: PostCardProps) {
  return (
    <article
      className={cn(
        'flex max-w-[486px] flex-col overflow-hidden rounded-lg',
        className,
      )}
    >
      <Link to={`/posts/${post.id}`} className="block">
        <div className="bg-cinza-medio p-6">
          <PostThumbnail
            src={post.thumbnailUrl}
            alt={post.title}
            variant="card"
            className="rounded-lg shadow-[0_16px_24px_rgba(0,0,0,0.24)]"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-4 bg-cinza-escuro p-4">
        <Link to={`/posts/${post.id}`} className="space-y-2 text-offwhite/80">
          <h2 className="text-lg font-semibold text-offwhite">{post.title}</h2>
          <p className="line-clamp-3 text-sm">{post.description}</p>
        </Link>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-cinza-medio">
            <button
              type="button"
              disabled={!isAuthenticated}
              onClick={() => onLike(post.id)}
              className={cn(
                'flex flex-col items-center disabled:cursor-not-allowed disabled:opacity-50',
                post.likedByMe && 'text-verde-destaque',
              )}
              aria-label="Curtir post"
            >
              <Icon name="code" className="size-6" />
              <span className="text-sm">{post.likesCount}</span>
            </button>
            <button
              type="button"
              onClick={() => onShare(post.id)}
              className="flex flex-col items-center"
              aria-label="Compartilhar post"
            >
              <Icon name="share" className="size-6" />
            </button>
            <Link
              to={`/posts/${post.id}#comments`}
              className="flex flex-col items-center"
              aria-label="Ver comentários"
            >
              <Icon name="chat" className="size-6" />
              <span className="text-sm">{post.commentsCount}</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Avatar name={post.author.name} />
            <span className="text-sm font-semibold text-cinza-medio">
              {post.author.handle}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
