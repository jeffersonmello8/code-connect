# Página de Cadastro

**Data de conclusão:** 19/07/2026

## Overview

Implementação da página de cadastro reutilizando `AuthLayout` e componentes de formulário do login, com alinhamento de tokens, tipografia e assets ao Figma.

## Principais entregas

- Tokens Figma em `index.css`: accent `#81FE88`, surfaces `#00090E`/`#171D1F`, inputs `#888`, fonte Prompt
- Assets em `public/`: `banner-login.png`, `banner-register.png`, `github.png`, `gmail.png`
- Atom `Icon` (Material Symbols: `arrow_forward`, `assignment`, `login`)
- Ajustes em Input, Label, Button, Divider, SocialButton, AuthLayout (watermark + `rounded-[32px]`)
- `LoginForm` corrigido: tipografia Figma, botão com ícone, link de cadastro com `assignment`
- `useRegisterForm`, `RegisterForm`, `RegisterPage` e rota `/register`
- 33 testes passando (incluindo `RegisterForm.test.tsx`)
