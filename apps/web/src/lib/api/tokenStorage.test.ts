import { describe, expect, it, beforeEach } from 'vitest'
import { clearToken, getToken, setToken } from './tokenStorage'

describe('tokenStorage', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it('should store token in sessionStorage when rememberMe is false', () => {
    setToken('token-123', false)

    expect(sessionStorage.getItem('codeconnect_access_token')).toBe('token-123')
    expect(localStorage.getItem('codeconnect_access_token')).toBeNull()
    expect(getToken()).toBe('token-123')
  })

  it('should store token in localStorage when rememberMe is true', () => {
    setToken('token-456', true)

    expect(localStorage.getItem('codeconnect_access_token')).toBe('token-456')
    expect(sessionStorage.getItem('codeconnect_access_token')).toBeNull()
    expect(getToken()).toBe('token-456')
  })

  it('should clear token from both storages', () => {
    setToken('token-789', true)
    clearToken()

    expect(getToken()).toBeNull()
    expect(localStorage.getItem('codeconnect_access_token')).toBeNull()
    expect(sessionStorage.getItem('codeconnect_access_token')).toBeNull()
  })
})
