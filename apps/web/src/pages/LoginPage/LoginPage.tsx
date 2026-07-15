import { AuthLayout } from '../../components/templates/AuthLayout'
import { LoginForm } from '../../components/organisms/LoginForm'

export function LoginPage() {
  return (
    <AuthLayout
      bannerSrc="/banner-login.png"
      bannerAlt="Desenvolvedora trabalhando em um laptop com elementos digitais verdes ao fundo"
    >
      <LoginForm />
    </AuthLayout>
  )
}
