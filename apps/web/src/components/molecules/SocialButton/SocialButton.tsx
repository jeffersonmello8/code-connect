import { cn } from '../../../lib/cn'

export type SocialProvider = 'github' | 'gmail'

const providerAssets: Record<SocialProvider, { src: string }> = {
  github: { src: '/github.svg' },
  gmail: { src: '/gmail.svg' },
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
      className={cn(
        'flex flex-col items-center gap-2 rounded-lg p-2',
        'text-offwhite transition-opacity hover:opacity-80',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde-destaque',
      )}
    >
      <img
        src={asset.src}
        alt=""
        aria-hidden="true"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
      <span className="text-xs text-offwhite">{label}</span>
    </button>
  )
}
