import { type LabelHTMLAttributes } from 'react'
import { cn } from '../../../lib/cn'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string
}

export function Label({ htmlFor, className, children, ...props }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('block text-sm font-medium text-text', className)}
      {...props}
    >
      {children}
    </label>
  )
}
