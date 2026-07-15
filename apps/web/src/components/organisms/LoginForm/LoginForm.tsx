import { Link } from 'react-router-dom'
import { Button } from '../../atoms/Button'
import { Checkbox } from '../../atoms/Checkbox'
import { Divider } from '../../atoms/Divider'
import { FormField } from '../../molecules/FormField'
import { SocialButton } from '../../molecules/SocialButton'
import { useLoginForm, type LoginFormData } from '../../../hooks/useLoginForm'

export interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void | Promise<void>
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    identifier,
    password,
    rememberMe,
    errors,
    submitting,
    setIdentifier,
    setPassword,
    setRememberMe,
    handleSubmit,
  } = useLoginForm({ onSubmit })

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-6"
      noValidate
    >
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-text">Login</h1>
        <p className="text-sm text-text-muted">
          Boas-vindas! Faça seu login.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        <FormField
          id="identifier"
          label="Email ou usuário"
          type="text"
          placeholder="usuario123"
          value={identifier}
          error={errors.identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <FormField
          id="password"
          label="Senha"
          type="password"
          placeholder="******"
          value={password}
          error={errors.password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between">
          <Checkbox
            label="Lembrar-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <a
            href="#"
            className="text-sm text-text underline hover:text-accent"
          >
            Esqueci a senha
          </a>
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg" loading={submitting}>
        Login →
      </Button>

      <Divider>ou entre com outras contas</Divider>

      <div className="flex justify-center gap-8">
        <SocialButton provider="github" label="Github" />
        <SocialButton provider="gmail" label="Gmail" />
      </div>

      <footer className="flex flex-col items-center gap-1 text-center text-sm text-text-muted">
        <span>Ainda não tem conta?</span>
        <Link
          to="/register"
          className="inline-flex items-center gap-1 font-medium text-accent hover:text-accent-hover"
        >
          Crie seu cadastro!
        </Link>
      </footer>
    </form>
  )
}
