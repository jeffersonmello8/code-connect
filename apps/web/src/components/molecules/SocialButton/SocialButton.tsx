import { cn } from '../../../lib/cn'

export type SocialProvider = 'github' | 'gmail'

const providerAssets: Record<SocialProvider, { src: string; alt: string }> = {
  github: { src: '/github.png', alt: 'Logo do GitHub' },
  gmail: { src: '/gmail.png', alt: 'Logo do Gmail' },
}

export interface SocialButtonProps {
  provider: SocialProvider
  label: string
  onClick?: () => void
}

export function SocialButton({ provider, label, onClick }: SocialButtonProps) {
  const asset = providerAssets[provider]

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'flex flex-col items-center gap-2 rounded-lg p-2',
        'text-text transition-opacity hover:opacity-80',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
      )}
    >
      <img
        src={asset.src}
        alt={asset.alt}
        className="h-10 w-10 object-contain"
      />
      <span className="text-sm text-text-muted">{label}</span>
    </button>
  )
}
