import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '../../atoms/Avatar/Avatar'
import { Button } from '../../atoms/Button'
import { Icon } from '../../atoms/Icon'
import { PostThumbnail } from '../../atoms/PostThumbnail/PostThumbnail'
import { Tag } from '../../atoms/Tag/Tag'
import { CommentItem } from '../../molecules/CommentItem/CommentItem'
import { useAuth } from '../../../contexts/AuthContext'
import { getApiErrorMessage } from '../../../lib/api/getApiErrorMessage'
import {
  createComment,
  getPost,
  likePost,
  unlikePost,
} from '../../../lib/api/postsApi'
import type { PostDetailResponse } from '../../../lib/api/postTypes'
import { cn } from '../../../lib/cn'

export interface PostDetailProps {
  postId: string
}

export function PostDetail({ postId }: PostDetailProps) {
  const { isAuthenticated } = useAuth()
  const [post, setPost] = useState<PostDetailResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [commentBody, setCommentBody] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const loadPost = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await getPost(postId)
      setPost(data)
    } catch (loadError) {
      setError(getApiErrorMessage(loadError))
    } finally {
      setLoading(false)
    }
  }, [postId])

  useEffect(() => {
    void loadPost()
  }, [loadPost])

  async function handleLike() {
    if (!post || !isAuthenticated) {
      return
    }

    try {
      if (post.likedByMe) {
        await unlikePost(post.id)
      } else {
        await likePost(post.id)
      }

      await loadPost()
    } catch (likeError) {
      setError(getApiErrorMessage(likeError))
    }
  }

  async function handleShare() {
    if (!post) {
      return
    }

    await navigator.clipboard.writeText(`${window.location.origin}/posts/${post.id}`)
  }

  async function handleComment(parentId?: string, body?: string) {
    if (!post) {
      return
    }

    const content = body ?? commentBody
    if (!content.trim()) {
      return
    }

    setSubmitting(true)
    try {
      await createComment(post.id, {
        body: content.trim(),
        parentId,
      })
      setCommentBody('')
      await loadPost()
    } catch (commentError) {
      setError(getApiErrorMessage(commentError))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <p className="text-cinza-medio">Carregando post...</p>
  }

  if (error || !post) {
    return (
      <div className="space-y-4">
        <p className="text-error">{error ?? 'Post não encontrado.'}</p>
        <Link to="/" className="text-verde-destaque">
          Voltar ao feed
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      <article className="overflow-hidden rounded-lg">
        <div className="bg-cinza-medio px-4 py-6">
          <PostThumbnail
            src={post.thumbnailUrl}
            alt={post.title}
            variant="detail"
            className="rounded-lg shadow-[0_16px_24px_rgba(0,0,0,0.24)]"
          />
        </div>

        <div className="space-y-4 bg-cinza-escuro p-4">
          <div className="space-y-2 text-offwhite/80">
            <h1 className="text-2xl font-semibold text-offwhite">{post.title}</h1>
            <p className="text-sm">{post.description}</p>
          </div>

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
                onClick={() => void handleLike()}
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
                onClick={() => void handleShare()}
                className="flex flex-col items-center"
                aria-label="Compartilhar post"
              >
                <Icon name="share" className="size-6" />
              </button>
              <a
                href="#comments"
                className="flex flex-col items-center"
                aria-label="Ver comentários"
              >
                <Icon name="chat" className="size-6" />
                <span className="text-sm">{post.commentsCount}</span>
              </a>
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

      {post.code ? (
        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-cinza-medio">Código:</h2>
          <pre className="overflow-x-auto rounded-lg bg-cinza-escuro p-4 text-sm text-offwhite/80 shadow-[0_8px_12px_rgba(0,0,0,0.24)]">
            <code>{post.code}</code>
          </pre>
        </section>
      ) : null}

      <section
        id="comments"
        className="rounded-lg bg-cinza-medio px-4 py-8 text-cinza-escuro"
      >
        <h2 className="mb-6 text-2xl font-semibold">Comentários</h2>

        {isAuthenticated ? (
          <div className="mb-6 flex gap-2">
            <textarea
              value={commentBody}
              onChange={(event) => setCommentBody(event.target.value)}
              placeholder="Escreva um comentário"
              aria-label="Comentário"
              className="min-h-24 w-full rounded border border-transparent bg-offwhite px-4 py-2 text-sm text-cinza-escuro"
            />
            <Button
              type="button"
              loading={submitting}
              onClick={() => void handleComment()}
            >
              Enviar
            </Button>
          </div>
        ) : (
          <p className="mb-6 text-sm">
            <Link to="/login" className="font-semibold underline">
              Faça login
            </Link>{' '}
            para comentar.
          </p>
        )}

        <div className="space-y-4">
          {post.comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              isAuthenticated={isAuthenticated}
              onReply={(parentId, body) => handleComment(parentId, body)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
