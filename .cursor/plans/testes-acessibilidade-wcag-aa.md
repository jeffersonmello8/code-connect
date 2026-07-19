# Testes de acessibilidade (WCAG AA)

**Data de conclusão:** 19/07/2026

## Overview

Configuração de testes automatizados com axe-core (via `vitest-axe`) para o nível AA do WCAG 2.0 / 2.1 / 2.2 nas páginas de autenticação, sem correções manuais nesta etapa.

## Principais entregas

- Dependência `vitest-axe` em `apps/web`
- Helper `src/test/a11y.ts` com tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`
- Matcher `toHaveNoViolations` registrado em `src/test/setup.ts`
- Testes: `LoginPage.a11y.test.tsx` e `RegisterPage.a11y.test.tsx` (estado inicial + erros de validação)
- Scripts: `pnpm test:a11y` (raiz) e `pnpm --filter web test:a11y`

## Resultado do levantamento

| Página | Estado | Violações WCAG AA (axe/jsdom) |
|--------|--------|-------------------------------|
| Login (`/login`) | Inicial | 0 |
| Login | Com erros de validação | 0 |
| Cadastro (`/register`) | Inicial | 0 |
| Cadastro | Com erros de validação | 0 |

### Limitações desta rodada

- Ambiente jsdom não avalia bem contraste de cor (`color-contrast` fica incomplete — aviso de `HTMLCanvasElement.getContext`)
- Não cobre teclado, leitores de tela nem fluxos e2e no browser

### Próximos passos sugeridos

1. Auditoria em browser (Playwright + axe) para contraste e navegação
2. Revisão manual WCAG AA nos critérios não automatizáveis
3. Corrigir violações quando aparecerem e manter `*.a11y.test.tsx` nas novas páginas
