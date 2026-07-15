# Estrutura Regras Cursor

**Data de conclusão:** 12/07/2026

## Overview

Criar estrutura completa de orientação para o Cursor no monorepo code-connect: AGENTS.md, regras modulares em `.cursor/rules/`, comandos slash e hooks de lint.

## Principais entregas

- `AGENTS.md` na raiz e em `apps/web/` e `apps/api/`
- 6 regras `.mdc` em `.cursor/rules/` (projeto, typescript, react, nestjs, testes, git)
- 3 comandos slash em `.cursor/commands/`
- `hooks.json` + script `lint-after-edit.mjs` cross-platform
- `.cursorignore` para indexação limpa
