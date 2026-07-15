import { type InputHTMLAttributes } from 'react'
import { cn } from '../../../lib/cn'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  const inputId = id ?? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <label
      htmlFor={inputId}
      className={cn('inline-flex cursor-pointer items-center gap-2', className)}
    >
      <input
        id={inputId}
        type="checkbox"
        className="h-4 w-4 rounded border-border bg-surface-elevated accent-accent"
        {...props}
      />
      <span className="text-sm text-text-muted">{label}</span>
    </label>
  )
}
