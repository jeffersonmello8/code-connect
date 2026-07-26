import { useState } from 'react'
import { Avatar } from '../../atoms/Avatar/Avatar'
import { Button } from '../../atoms/Button'
import { Input } from '../../atoms/Input'
import type { CommentResponse } from '../../../lib/api/postTypes'
import { cn } from '../../../lib/cn'

export interface CommentItemProps {
  comment: CommentResponse
  isAuthenticated: boolean
  onReply: (parentId: string, body: string) => Promise<void>
  depth?: number
}

export function CommentItem({
  comment,
  isAuthenticated,
  onReply,
  depth = 0,
}: CommentItemProps) {
  const [showReplies, setShowReplies] = useState(true)
  const [isReplying, setIsReplying] = useState(false)
  const [replyBody, setReplyBody] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleReplySubmit() {
    if (!replyBody.trim()) {
      return
    }

    setSubmitting(true)
    try {
      await onReply(comment.id, replyBody.trim())
      setReplyBody('')
      setIsReplying(false)
      setShowReplies(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={cn('space-y-2', depth > 0 && 'ml-10')}>
      <div className="flex items-start gap-2">
        <Avatar name={comment.author.name} />
        <div className="min-w-0 flex-1">
          <p className="text-sm text-cinza-escuro">
            <span className="font-semibold">{comment.author.handle}</span>{' '}
            {comment.body}
          </p>
        </div>
      </div>

      {isAuthenticated ? (
        <button
          type="button"
          onClick={() => setIsReplying((current) => !current)}
          className="text-sm font-semibold text-cinza-escuro"
        >
          Responder
        </button>
      ) : null}

      {isReplying ? (
        <div className="flex gap-2">
          <Input
            value={replyBody}
            onChange={(event) => setReplyBody(event.target.value)}
            placeholder="Escreva uma resposta"
            aria-label="Resposta"
          />
          <Button
            type="button"
            size="sm"
            loading={submitting}
            onClick={() => void handleReplySubmit()}
          >
            Enviar
          </Button>
        </div>
      ) : null}

      {comment.replies.length > 0 ? (
        <button
          type="button"
          onClick={() => setShowReplies((current) => !current)}
          className="text-xs text-cinza-escuro"
        >
          {showReplies ? 'Ocultar respostas' : 'Ver respostas'}
        </button>
      ) : null}

      {showReplies
        ? comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              isAuthenticated={isAuthenticated}
              onReply={onReply}
              depth={depth + 1}
            />
          ))
        : null}
    </div>
  )
}
