import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { AuthProvider } from '../../../contexts/AuthContext'
import { Sidebar } from './Sidebar'

vi.mock('../../../lib/api/authApi', () => ({
  login: vi.fn(),
  register: vi.fn(),
  me: vi.fn().mockRejectedValue(new Error('unauthorized')),
}))

describe('Sidebar', () => {
  it('should show Login when user is not authenticated', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Sidebar />
        </AuthProvider>
      </MemoryRouter>,
    )

    expect(await screen.findByText('Login')).toBeInTheDocument()
  })

  it('should render Publicar button', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Sidebar />
        </AuthProvider>
      </MemoryRouter>,
    )

    expect(screen.getByRole('button', { name: 'Publicar' })).toBeInTheDocument()
  })
})
