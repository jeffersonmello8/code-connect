# Backend: cadastro, login JWT e perfil

## Overview

Implementação dos três endpoints de autenticação na API NestJS com storage em memória, Swagger e AuthGuard JWT.

## Data de conclusão

2026-07-19

## Principais entregas

- `POST /users` — cadastro com validação (nome, email, senha) e hash bcrypt
- `POST /auth/login` — login com retorno de `access_token` JWT
- `GET /auth/me` — perfil do usuário logado protegido por `AuthGuard('jwt')`
- Swagger em `/api` com DTOs documentados e Bearer auth
- `ValidationPipe` global, CORS habilitado
- Storage em memória via array no `UsersService`
- Testes unitários (`users.service`, `auth.service`) e e2e do fluxo completo
