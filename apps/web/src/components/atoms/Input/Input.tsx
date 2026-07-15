import { type InputHTMLAttributes } from 'react'
import { cn } from '../../../lib/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export function Input({ error, className, disabled, ...props }: InputProps) {
  return (
    <input
      disabled={disabled}
      className={cn(
        'w-full rounded-lg border bg-surface-elevated px-4 py-2.5 text-text',
        'placeholder:text-text-muted',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface',
        error
          ? 'border-error focus:ring-error'
          : 'border-border focus:border-accent focus:ring-accent',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      {...props}
    />
  )
}
