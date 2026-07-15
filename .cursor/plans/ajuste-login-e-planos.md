# Ajuste Login e Planos

**Data de conclusão:** 14/07/2026

## Overview

Aproximar a página de login do mock (card centralizado, marca, copy e novos elementos de UI) e instituir arquivo permanente de planos executados via pasta no repo + regra Cursor.

## Principais entregas

- AuthLayout refatorado: card centralizado com marca d'água de BrandMark
- Atom BrandMark (SVG dos elos) + overlay "code connect" no AuthBanner
- Atom Checkbox para "Lembrar-me"
- FormField com suporte a placeholder
- SocialButton estilo ghost (ícone + label, sem caixa pesada)
- LoginForm alinhado ao mock: copy, checkbox, divider, rodapé de cadastro
- useLoginForm: identificador email ou usuário + rememberMe
- Rota `/register` temporária (Navigate para `/login`)
- Pasta `.cursor/plans/` com arquivos de planos executados
- Regra `.cursor/rules/planos-executados.mdc` (alwaysApply)
