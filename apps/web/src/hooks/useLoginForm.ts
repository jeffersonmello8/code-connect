import { type FormEvent, useState } from 'react'

export interface LoginFormErrors {
  identifier?: string
  password?: string
}

export interface LoginFormData {
  identifier: string
  password: string
  rememberMe: boolean
}

export interface UseLoginFormOptions {
  onSubmit?: (data: LoginFormData) => void | Promise<void>
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const USERNAME_REGEX = /^[a-zA-Z0-9._-]{3,}$/

function validate(identifier: string, password: string): LoginFormErrors {
  const errors: LoginFormErrors = {}
  const trimmed = identifier.trim()

  if (!trimmed) {
    errors.identifier = 'Email ou usuário é obrigatório'
  } else if (trimmed.includes('@')) {
    if (!EMAIL_REGEX.test(trimmed)) {
      errors.identifier = 'E-mail inválido'
    }
  } else if (!USERNAME_REGEX.test(trimmed)) {
    errors.identifier = 'Usuário inválido (mínimo 3 caracteres)'
  }

  if (!password) {
    errors.password = 'Senha é obrigatória'
  } else if (password.length < 6) {
    errors.password = 'Senha deve ter no mínimo 6 caracteres'
  }

  return errors
}

export function useLoginForm({ onSubmit }: UseLoginFormOptions = {}) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validate(identifier, password)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setSubmitting(true)
    try {
      await onSubmit?.({ identifier, password, rememberMe })
    } finally {
      setSubmitting(false)
    }
  }

  return {
    identifier,
    password,
    rememberMe,
    errors,
    submitting,
    setIdentifier,
    setPassword,
    setRememberMe,
    handleSubmit,
  }
}
