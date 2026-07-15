import { cn } from '../../../lib/cn'

export interface BrandMarkProps {
  className?: string
}

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-accent', className)}
      aria-hidden="true"
    >
      <path
        d="M18 14C14.6863 14 12 16.6863 12 20V24C12 27.3137 14.6863 30 18 30H22C25.3137 30 28 27.3137 28 24V20C28 16.6863 25.3137 14 22 14H18Z"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M26 18C26 14.6863 28.6863 12 32 12H36C39.3137 12 42 14.6863 42 18V22C42 25.3137 39.3137 28 36 28H32C28.6863 28 26 25.3137 26 22V18Z"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M20 24H28"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
