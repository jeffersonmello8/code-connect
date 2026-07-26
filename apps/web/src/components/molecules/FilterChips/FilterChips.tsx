import { Tag } from '../../atoms/Tag/Tag'
import { cn } from '../../../lib/cn'

export interface FilterChipsProps {
  terms: string[]
  onRemove: (term: string) => void
  onClear: () => void
  className?: string
}

export function FilterChips({
  terms,
  onRemove,
  onClear,
  className,
}: FilterChipsProps) {
  if (terms.length === 0) {
    return null
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-4', className)}>
      {terms.map((term) => (
        <Tag key={term} label={term} onRemove={() => onRemove(term)} />
      ))}
      <button
        type="button"
        onClick={onClear}
        className="text-lg text-cinza-medio hover:text-offwhite"
      >
        Limpar tudo
      </button>
    </div>
  )
}
