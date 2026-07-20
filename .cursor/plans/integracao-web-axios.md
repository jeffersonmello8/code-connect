# Integração frontend com API (axios)

## Overview

Camada HTTP com axios no frontend React, sessão JWT e wiring de login/cadastro contra a API NestJS.

## Data de conclusão

2026-07-19

## Principais entregas

- `axios` + `VITE_API_URL` com client tipado e interceptor Bearer
- `authApi` (`login`, `register`, `me`) e `tokenStorage` (localStorage/sessionStorage via "Lembrar-me")
- `AuthContext` com bootstrap via `GET /auth/me`
- Rotas protegidas (`ProtectedRoute` / `GuestRoute`) e `HomePage` mínima pós-login
- Login alinhado a e-mail; pages com tratamento de erros 401/409
- Testes unitários da camada API e pages
