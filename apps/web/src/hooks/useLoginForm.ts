import { type FormEvent, useState } from 'react'

export interface LoginFormErrors {
  email?: string
  password?: string
}

export interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

export interface UseLoginFormOptions {
  onSubmit?: (data: LoginFormData) => void | Promise<void>
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(email: string, password: string): LoginFormErrors {
  const errors: LoginFormErrors = {}
  const trimmedEmail = email.trim()

  if (!trimmedEmail) {
    errors.email = 'Email é obrigatório'
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'E-mail inválido'
  }

  if (!password) {
    errors.password = 'Senha é obrigatória'
  } else if (password.length < 6) {
    errors.password = 'Senha deve ter no mínimo 6 caracteres'
  }

  return errors
}

export function useLoginForm({ onSubmit }: UseLoginFormOptions = {}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const validationErrors = validate(email, password)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setSubmitting(true)
    try {
      await onSubmit?.({ email, password, rememberMe })
    } finally {
      setSubmitting(false)
    }
  }

  return {
    email,
    password,
    rememberMe,
    errors,
    formError,
    submitting,
    setEmail,
    setPassword,
    setRememberMe,
    setFormError,
    handleSubmit,
  }
}
