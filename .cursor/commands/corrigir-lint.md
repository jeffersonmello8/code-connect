# Corrigir lint

Corrija todos os erros de lint nos arquivos alterados ou no escopo indicado pelo usuário.

## Detectar app

- Arquivos em `apps/web/**` → Oxlint
- Arquivos em `apps/api/**` → ESLint + Prettier

## Executar lint

```bash
# Web
pnpm lint:web

# Api
pnpm lint:api
pnpm --filter api format
```

## Corrigir

1. Rodar o lint apropriado
2. Corrigir cada erro reportado
3. Re-rodar até passar sem erros
4. Não desabilitar regras de lint sem justificativa clara

## Se lint não auto-corrige (api)

ESLint com `--fix` já está no script `lint:api`. Para formatação:

```bash
pnpm --filter api format
```

Informe quais erros foram corrigidos e se algum exigiu decisão manual.
