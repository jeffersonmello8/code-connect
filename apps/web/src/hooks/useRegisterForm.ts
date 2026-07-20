import { type FormEvent, useState } from 'react'

export interface RegisterFormErrors {
  name?: string
  email?: string
  password?: string
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  rememberMe: boolean
}

export interface UseRegisterFormOptions {
  onSubmit?: (data: RegisterFormData) => void | Promise<void>
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(
  name: string,
  email: string,
  password: string,
): RegisterFormErrors {
  const errors: RegisterFormErrors = {}
  const trimmedName = name.trim()
  const trimmedEmail = email.trim()

  if (!trimmedName) {
    errors.name = 'Nome é obrigatório'
  } else if (trimmedName.length < 2) {
    errors.name = 'Nome deve ter no mínimo 2 caracteres'
  }

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

export function useRegisterForm({ onSubmit }: UseRegisterFormOptions = {}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<RegisterFormErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const validationErrors = validate(name, email, password)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setSubmitting(true)
    try {
      await onSubmit?.({ name, email, password, rememberMe })
    } finally {
      setSubmitting(false)
    }
  }

  return {
    name,
    email,
    password,
    rememberMe,
    errors,
    formError,
    submitting,
    setName,
    setEmail,
    setPassword,
    setRememberMe,
    setFormError,
    handleSubmit,
  }
}
