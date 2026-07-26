import { type FormEvent } from 'react'
import { Icon } from '../../atoms/Icon'
import { Input } from '../../atoms/Input'
import { cn } from '../../../lib/cn'

export interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  placeholder?: string
  className?: string
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Digite o que você procura',
  className,
}: SearchBarProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'flex items-center gap-4 rounded bg-cinza-escuro px-4 py-2 text-offwhite',
        className,
      )}
    >
      <Icon name="search" className="size-8 text-offwhite" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="border-none bg-transparent px-0 py-0 text-xl text-offwhite placeholder:text-offwhite/70 focus:ring-0 focus:ring-offset-0"
        aria-label="Buscar posts"
      />
    </form>
  )
}
