import { cn } from '../../../lib/cn'

export interface AvatarProps {
  name: string
  className?: string
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function Avatar({ name, className }: AvatarProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-full bg-cinza-medio text-xs font-semibold text-cinza-escuro',
        className,
      )}
    >
      {getInitials(name)}
    </div>
  )
}
