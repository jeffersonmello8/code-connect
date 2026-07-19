import { type HTMLAttributes } from 'react'
import { cn } from '../../../lib/cn'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  children?: string
}

export function Divider({ children = 'ou', className, ...props }: DividerProps) {
  return (
    <div
      className={cn('flex items-center gap-4', className)}
      role="separator"
      {...props}
    >
      <span className="h-px flex-1 bg-cinza-medio" aria-hidden="true" />
      <span className="text-sm text-cinza-medio">{children}</span>
      <span className="h-px flex-1 bg-cinza-medio" aria-hidden="true" />
    </div>
  )
}
