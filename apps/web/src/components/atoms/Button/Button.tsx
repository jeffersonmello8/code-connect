import { type ButtonHTMLAttributes } from 'react'
import { cn } from '../../../lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'social'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-verde-destaque text-verde-petroleo font-semibold hover:bg-verde-destaque-hover focus-visible:ring-verde-destaque',
  secondary:
    'border border-grafite bg-transparent text-offwhite hover:border-verde-destaque focus-visible:ring-verde-destaque',
  social:
    'border border-grafite bg-transparent text-offwhite hover:border-verde-destaque focus-visible:ring-verde-destaque',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-4 py-3 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-grafite',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {loading ? 'Carregando...' : children}
    </button>
  )
}
