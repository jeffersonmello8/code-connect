# apps/api — Backend

## Stack

- NestJS 11, TypeScript 5, Jest
- Lint: ESLint | Format: Prettier
- API: **REST** aderente aos princípios HTTP

## Estrutura

```
src/
  main.ts           → bootstrap da aplicação
  app.module.ts     → módulo raiz
  feature/
    feature.module.ts
    feature.controller.ts
    feature.service.ts
    feature.controller.spec.ts
    dto/
      create-feature.dto.ts
      update-feature.dto.ts
  *.spec.ts         → testes unitários colocalizados
test/
  *.e2e-spec.ts     → testes end-to-end
```

## REST — princípios obrigatórios

### URLs e recursos

- Substantivos no plural: `/users`, `/posts/:id`
- Sem verbos na URL: ❌ `/getUsers`, ✅ `GET /users`
- Hierarquia para relações: `/users/:userId/posts`
- Query params para filtros, paginação e ordenação

### Verbos HTTP

| Verbo | Uso | Status de sucesso |
|-------|-----|-------------------|
| GET | Listar ou buscar | 200 |
| POST | Criar recurso | 201 + body ou Location header |
| PUT | Substituir recurso inteiro | 200 ou 204 |
| PATCH | Atualizar parcialmente | 200 ou 204 |
| DELETE | Remover recurso | 204 (sem body) |

### Respostas e erros

- Corpo JSON consistente em sucesso e erro
- Status codes semânticos: 400 (validação), 401 (não autenticado), 403 (proibido), 404 (não encontrado), 409 (conflito), 422 (regra de negócio)
- DTOs com `class-validator` para validar entrada
- Nunca expor stack traces em produção

### Stateless

- Sem estado de sessão no servidor; autenticação via token quando necessário
- Cada request contém toda informação necessária

### Paginação (listagens)

```json
{
  "data": [...],
  "meta": { "page": 1, "limit": 20, "total": 100 }
}
```

Query: `?page=1&limit=20&sort=createdAt&order=desc`

## Padrões Nest

- Um módulo por domínio/feature
- Controller: rotas HTTP, status codes, DTOs de entrada
- Service: lógica de negócio
- Injeção de dependência via construtor
- Specs colocalizados (`*.spec.ts`)

## Referência canônica

Veja `src/app.module.ts` para estrutura de módulo NestJS.

## Lint, format e testes

```bash
pnpm lint:api                  # na raiz do monorepo
pnpm --filter api format       # Prettier
pnpm --filter api test         # unitários
pnpm --filter api test:e2e     # e2e
```
