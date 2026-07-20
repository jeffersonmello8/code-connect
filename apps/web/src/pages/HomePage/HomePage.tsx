import { Button } from '../../components/atoms/Button'
import { useAuth } from '../../contexts/AuthContext'

export function HomePage() {
  const { user, logout } = useAuth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-verde-escuro px-6 text-offwhite">
      <h1 className="text-3xl font-semibold">Code Connect</h1>
      <p className="text-xl">
        Olá, {user?.name ?? 'usuário'} ({user?.email})
      </p>
      <Button type="button" variant="primary" size="lg" onClick={logout}>
        Sair
      </Button>
    </main>
  )
}
