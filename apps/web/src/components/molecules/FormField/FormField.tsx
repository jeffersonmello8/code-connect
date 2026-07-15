import { type ChangeEvent } from 'react'
import { Input } from '../../atoms/Input'
import { Label } from '../../atoms/Label'

export interface FormFieldProps {
  id: string
  label: string
  type?: string
  value: string
  placeholder?: string
  error?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function FormField({
  id,
  label,
  type = 'text',
  value,
  placeholder,
  error,
  onChange,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        error={Boolean(error)}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
