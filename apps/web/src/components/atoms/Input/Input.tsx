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
        'w-full rounded border border-transparent bg-cinza-medio px-4 py-2 text-sm text-cinza-escuro',
        'placeholder:text-cinza-escuro/70',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cinza-escuro',
        error
          ? 'border-error focus:ring-error'
          : 'focus:border-verde-destaque focus:ring-verde-destaque',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      {...props}
    />
  )
}
