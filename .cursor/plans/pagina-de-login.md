# Página de Login

**Data de conclusão:** 13/07/2026

## Overview

Construir a página de login do `apps/web` seguindo Atomic Design + Tailwind, com layout split-screen reutilizável para a futura página de cadastro.

## Principais entregas

- Setup: Tailwind v4, Vitest, react-router-dom, clsx/tailwind-merge
- Atoms: Button, Input, Label, Divider
- Molecules: FormField, SocialButton
- Organisms: LoginForm, AuthBanner
- Template: AuthLayout (split-screen com `children` reutilizável)
- Page: LoginPage com rota `/login`
- Hook: `useLoginForm` com validação de email/senha
- 21 testes colocalizados passando
