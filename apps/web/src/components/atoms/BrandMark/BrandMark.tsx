import { cn } from '../../../lib/cn'

export interface BrandMarkProps {
  className?: string
}

const BRAND_MARK_WIDTH = 814
const BRAND_MARK_HEIGHT = 972

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <img
      src="/brand-mark.webp"
      alt=""
      width={BRAND_MARK_WIDTH}
      height={BRAND_MARK_HEIGHT}
      decoding="async"
      aria-hidden="true"
      className={cn('object-contain', className)}
    />
  )
}
