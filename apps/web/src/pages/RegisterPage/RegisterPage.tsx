import { AuthLayout } from '../../components/templates/AuthLayout'
import { RegisterForm } from '../../components/organisms/RegisterForm'

export function RegisterPage() {
  return (
    <AuthLayout
      bannerSrc="/banner-register.webp"
      bannerAlt="Desenvolvedora trabalhando em um laptop com elementos digitais verdes ao fundo"
    >
      <RegisterForm />
    </AuthLayout>
  )
}
