import { Link } from 'react-router-dom'
import { Button } from '../../atoms/Button'
import { Checkbox } from '../../atoms/Checkbox'
import { Divider } from '../../atoms/Divider'
import { Icon } from '../../atoms/Icon'
import { FormField } from '../../molecules/FormField'
import { SocialButton } from '../../molecules/SocialButton'
import {
  useRegisterForm,
  type RegisterFormData,
} from '../../../hooks/useRegisterForm'

export interface RegisterFormProps {
  onSubmit?: (data: RegisterFormData) => void | Promise<void>
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const {
    name,
    email,
    password,
    rememberMe,
    errors,
    submitting,
    setName,
    setEmail,
    setPassword,
    setRememberMe,
    handleSubmit,
  } = useRegisterForm({ onSubmit })

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-6"
      noValidate
    >
      <header className="flex flex-col gap-6">
        <h1 className="text-3xl font-semibold leading-normal text-offwhite">
          Cadastro
        </h1>
        <p className="text-2xl leading-normal text-offwhite">
          Olá! Preencha seus dados.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        <FormField
          id="name"
          label="Nome"
          type="text"
          placeholder="Nome completo"
          value={name}
          error={errors.name}
          onChange={(e) => setName(e.target.value)}
        />

        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="Digite seu email"
          value={email}
          error={errors.email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex flex-col gap-2">
          <FormField
            id="password"
            label="Senha"
            type="password"
            placeholder="******"
            value={password}
            error={errors.password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Checkbox
            label="Lembrar-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg" loading={submitting}>
        Cadastrar
        <Icon name="arrow_forward" className="text-2xl" />
      </Button>

      <Divider>ou entre com outras contas</Divider>

      <div className="flex justify-center gap-6">
        <SocialButton provider="github" label="Github" />
        <SocialButton provider="gmail" label="Gmail" />
      </div>

      <footer className="flex flex-wrap items-center gap-2">
        <span className="text-lg text-offwhite">Já tem conta?</span>
        <Link
          to="/login"
          className="inline-flex items-center gap-3 text-lg text-verde-destaque hover:text-verde-destaque-hover"
        >
          Faça seu login!
          <Icon name="login" className="text-2xl" />
        </Link>
      </footer>
    </form>
  )
}
