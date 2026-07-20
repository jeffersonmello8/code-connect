import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAxiosError } from 'axios'
import { AuthLayout } from '../../components/templates/AuthLayout'
import { RegisterForm } from '../../components/organisms/RegisterForm'
import { getApiErrorMessage } from '../../lib/api/getApiErrorMessage'
import { useAuth } from '../../contexts/AuthContext'
import type { RegisterFormData } from '../../hooks/useRegisterForm'

export function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit({
    name,
    email,
    password,
    rememberMe,
  }: RegisterFormData) {
    try {
      await register({ name, email, password }, rememberMe)
      navigate('/')
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 409) {
        setFormError('E-mail já cadastrado')
        return
      }

      setFormError(getApiErrorMessage(error, 'Não foi possível criar a conta'))
    }
  }

  return (
    <AuthLayout
      bannerSrc="/banner-register.webp"
      bannerAlt="Desenvolvedora trabalhando em um laptop com elementos digitais verdes ao fundo"
    >
      <RegisterForm
        onSubmit={handleSubmit}
        formError={formError}
        onFormErrorClear={() => setFormError(null)}
      />
    </AuthLayout>
  )
}
