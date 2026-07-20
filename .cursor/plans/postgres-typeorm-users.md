# Persistência de usuários com PostgreSQL + TypeORM

## Overview

Substituição do storage em memória por PostgreSQL com TypeORM na API NestJS, incluindo Docker Compose na raiz do monorepo com volume persistente.

## Data de conclusão

2026-07-19

## Principais entregas

- `docker-compose.yml` na raiz com PostgreSQL 16, credenciais de dev e volume `postgres_data`
- Dependências: `@nestjs/typeorm`, `typeorm`, `pg`, `@nestjs/config`
- `ConfigModule` global + `TypeOrmModule.forRootAsync` em `app.module.ts`
- Entidade `User` com UUID, email único e coluna `password_hash`
- `UsersService` reescrito com `Repository<User>` (create, findByEmail, findById)
- `AuthService` e `JwtStrategy` atualizados para métodos async
- `.env.example` com variáveis `DATABASE_*`
- Testes unitários com mock do repositório; e2e com emails únicos por execução

## ORM escolhido

**TypeORM** — integração nativa NestJS, decorators alinhados ao padrão do projeto, suporte maduro a PostgreSQL.

Considerados e descartados: Prisma (schema externo), MikroORM (ecossistema Nest menor), Drizzle (integração Nest menos estabelecida).

## Uso local

```bash
docker compose up -d
cp apps/api/.env.example apps/api/.env
pnpm dev:api
```
