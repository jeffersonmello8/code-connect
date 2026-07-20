import { Link } from 'react-router-dom'
import { Button } from '../../atoms/Button'
import { Checkbox } from '../../atoms/Checkbox'
import { Divider } from '../../atoms/Divider'
import { Icon } from '../../atoms/Icon'
import { FormField } from '../../molecules/FormField'
import { SocialButton } from '../../molecules/SocialButton'
import { useLoginForm, type LoginFormData } from '../../../hooks/useLoginForm'

export interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void | Promise<void>
  formError?: string | null
  onFormErrorClear?: () => void
}

export function LoginForm({
  onSubmit,
  formError: externalFormError,
  onFormErrorClear,
}: LoginFormProps) {
  const {
    email,
    password,
    rememberMe,
    errors,
    formError: internalFormError,
    submitting,
    setEmail,
    setPassword,
    setRememberMe,
    setFormError,
    handleSubmit,
  } = useLoginForm({ onSubmit })

  const formError = externalFormError ?? internalFormError

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xs flex-col gap-6"
      noValidate
    >
      <header className="flex flex-col gap-6">
        <h1 className="text-3xl font-semibold leading-normal text-offwhite">Login</h1>
        <p className="text-2xl leading-normal text-offwhite">
          Boas-vindas! Faça seu login.
        </p>
      </header>

      {formError ? (
        <p role="alert" className="text-sm text-red-400">
          {formError}
        </p>
      ) : null}

      <div className="flex flex-col gap-4">
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          error={errors.email}
          onChange={(e) => {
            onFormErrorClear?.()
            setFormError(null)
            setEmail(e.target.value)
          }}
        />

        <div className="flex flex-col gap-2">
          <FormField
            id="password"
            label="Senha"
            type="password"
            placeholder="******"
            value={password}
            error={errors.password}
            onChange={(e) => {
              onFormErrorClear?.()
              setFormError(null)
              setPassword(e.target.value)
            }}
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label="Lembrar-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <a
              href="#"
              className="text-sm text-offwhite underline hover:text-verde-destaque"
            >
              Esqueci a senha
            </a>
          </div>
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg" loading={submitting}>
        Login
        <Icon name="arrow_forward" className="text-2xl" />
      </Button>

      <Divider>ou entre com outras contas</Divider>

      <div className="flex justify-center gap-6">
        <SocialButton provider="github" label="Github" />
        <SocialButton provider="gmail" label="Gmail" />
      </div>

      <footer className="flex flex-col items-center gap-2 text-center">
        <span className="text-sm text-offwhite">Ainda não tem conta?</span>
        <Link
          to="/register"
          className="inline-flex items-center gap-3 text-lg text-verde-destaque hover:text-verde-destaque-hover"
        >
          Crie seu cadastro!
          <Icon name="assignment" className="text-2xl" />
        </Link>
      </footer>
    </form>
  )
}
