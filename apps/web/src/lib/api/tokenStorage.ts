const TOKEN_KEY = 'codeconnect_access_token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string, rememberMe: boolean): void {
  clearToken()

  if (rememberMe) {
    localStorage.setItem(TOKEN_KEY, token)
    return
  }

  sessionStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(TOKEN_KEY)
}
