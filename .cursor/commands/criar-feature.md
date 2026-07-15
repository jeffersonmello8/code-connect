# Criar feature

Implemente a feature descrita pelo usuário seguindo este fluxo:

## 1. Identificar o app

- UI, componentes, páginas → `apps/web`
- API, endpoints, lógica de servidor → `apps/api`
- Ambos → começar pelo api (REST), depois integrar no web

## 2. Explorar antes de criar

- Ler arquivos similares existentes no app
- Seguir convenções de `apps/web/AGENTS.md` ou `apps/api/AGENTS.md`

## 3. Estrutura (api — REST)

```
src/users/
  users.module.ts
  users.controller.ts    → GET/POST/PUT/PATCH/DELETE /users
  users.service.ts
  users.controller.spec.ts
  dto/
    create-user.dto.ts
    update-user.dto.ts
```

- URLs no plural, status codes corretos, DTOs com validação
- Registrar módulo em `app.module.ts`

## 4. Estrutura (web — Atomic Design + Tailwind)

Identifique a camada correta e crie componente + teste:

```
src/components/atoms/Button/
  Button.tsx
  Button.test.tsx
src/pages/UsersPage/
  UsersPage.tsx
  UsersPage.test.tsx
```

- Estilizar com Tailwind (`className`)
- Teste cobrindo uso essencial (render + interação principal)

## 5. Validar

```bash
pnpm lint:web              # se alterou web
pnpm lint:api              # se alterou api
pnpm --filter web test     # se alterou web
pnpm --filter api test     # se alterou api
```

## 6. Resumir

Informe arquivos criados/alterados, camada Atomic Design usada, endpoints REST criados e como testar manualmente.

Sugira mensagem de commit em Conventional Commits (ex.: `feat(web): add UsersPage with user list`).
