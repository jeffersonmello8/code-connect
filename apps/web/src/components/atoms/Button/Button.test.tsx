import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('should render children', () => {
    render(<Button>Entrar</Button>)
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument()
  })

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Clique</Button>)

    await user.click(screen.getByRole('button', { name: 'Clique' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('should not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Clique
      </Button>,
    )

    await user.click(screen.getByRole('button', { name: 'Clique' }))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('should show loading state', () => {
    render(<Button loading>Entrar</Button>)
    expect(screen.getByRole('button', { name: 'Carregando...' })).toBeDisabled()
  })
})
