import { cn } from '../../../lib/cn'

export interface TagProps {
  label: string
  onRemove?: () => void
  className?: string
}

export function Tag({ label, onRemove, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded bg-offwhite px-2 py-1 text-lg text-cinza-escuro',
        className,
      )}
    >
      {label}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remover tag ${label}`}
          className="text-cinza-escuro/80 hover:text-cinza-escuro"
        >
          ×
        </button>
      ) : null}
    </span>
  )
}
