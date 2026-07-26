import { type ImgHTMLAttributes, useState } from 'react'
import { cn } from '../../../lib/cn'

export interface PostThumbnailProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null
  alt: string
  variant?: 'card' | 'detail'
}

export function PostThumbnail({
  src,
  alt,
  variant = 'card',
  className,
  ...props
}: PostThumbnailProps) {
  const [hasError, setHasError] = useState(false)
  const showPlaceholder = !src || hasError

  if (showPlaceholder) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          'flex w-full items-center justify-center bg-cinza-medio text-cinza-escuro',
          variant === 'card' ? 'h-[192px]' : 'h-[320px]',
          className,
        )}
      >
        <img
          src="/post-thumbnail-placeholder.svg"
          alt=""
          aria-hidden="true"
          className="h-16 w-16 opacity-70"
        />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={cn(
        'w-full object-cover',
        variant === 'card' ? 'h-[192px]' : 'h-[320px]',
        className,
      )}
      {...props}
    />
  )
}
