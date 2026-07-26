import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../../atoms/Button'
import { Icon } from '../../atoms/Icon'
import { useAuth } from '../../../contexts/AuthContext'
import { cn } from '../../../lib/cn'

type NavItem = {
  label: string
  icon: 'feed' | 'account_circle' | 'info'
  to?: string
  disabled?: boolean
}

const navItems: NavItem[] = [
  { label: 'Feed', icon: 'feed', to: '/' },
  { label: 'Perfil', icon: 'account_circle', disabled: true },
  { label: 'Sobre nós', icon: 'info', disabled: true },
]

export function Sidebar() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function handlePublish() {
    navigate(isAuthenticated ? '/posts/new' : '/login')
  }

  function handleAuthAction() {
    if (isAuthenticated) {
      logout()
      return
    }

    navigate('/login')
  }

  return (
    <aside className="flex w-full max-w-[282px] flex-col items-center gap-10 rounded-lg bg-cinza-escuro px-4 py-10 lg:w-[177px]">
      <Link to="/" aria-label="Code Connect">
        <img
          src="/logo-code-connect.webp"
          alt="Code Connect"
          width={127}
          height={40}
          className="h-10 w-auto"
        />
      </Link>

      <div className="flex w-full flex-col items-center gap-10">
        <Button
          type="button"
          variant="secondary"
          className="w-full border-verde-destaque text-xl text-verde-destaque hover:border-verde-destaque-hover hover:text-verde-destaque-hover"
          onClick={handlePublish}
        >
          Publicar
        </Button>

        <nav className="flex w-full flex-col items-center gap-2">
          {navItems.map((item) => {
            const isActive = item.to === location.pathname

            if (item.disabled || !item.to) {
              return (
                <span
                  key={item.label}
                  className="flex flex-col items-center gap-2 px-4 py-2 text-cinza-medio opacity-50"
                  aria-disabled="true"
                >
                  <Icon name={item.icon} className="size-8" />
                  <span className="text-xl">{item.label}</span>
                </span>
              )
            }

            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  'flex flex-col items-center gap-2 px-4 py-2',
                  isActive ? 'text-offwhite' : 'text-cinza-medio hover:text-offwhite',
                )}
              >
                <Icon name={item.icon} className="size-8" />
                <span className="text-xl">{item.label}</span>
              </Link>
            )
          })}

          <button
            type="button"
            onClick={handleAuthAction}
            className="flex flex-col items-center gap-2 px-4 py-2 text-cinza-medio hover:text-offwhite"
          >
            <Icon name={isAuthenticated ? 'logout' : 'login'} className="size-8" />
            <span className="text-xl">{isAuthenticated ? 'Sair' : 'Login'}</span>
          </button>
        </nav>
      </div>
    </aside>
  )
}
