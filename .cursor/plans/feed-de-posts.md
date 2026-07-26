# Feed de posts

## Overview

Implementação do domínio de posts na API (TypeORM + migrations + FTS + seed) e das telas Feed, Detalhe e Publicar no frontend, com layout compartilhado, busca full-text no backend e ações autenticadas (criar, curtir, comentar).

## Data de conclusão

2026-07-26

## Principais entregas

### Backend (`apps/api`)

- Entidades `Post`, `Like`, `Comment` com relações a `User`
- Migration `1730000000000-CreatePostsDomain` (tabelas + `search_vector` via trigger + índice GIN)
- `synchronize: false` e `migrationsRun` habilitado em `app.module.ts`
- Scripts: `migration:run`, `migration:revert`, `seed`
- `PostsModule`: listagem com FTS (`q`), paginação, sort recent/popular, detalhe, criar, curtir/descurtir, comentários aninhados (1 nível)
- JWT opcional em leitura (`likedByMe`); JWT obrigatório em mutações
- `UploadsModule` com Multer + `ServeStaticModule` em `/uploads`
- Seed com 3 usuários, 8 posts mockados (incluindo posts sem thumbnail e URL inválida)

### Frontend (`apps/web`)

- `AppLayout` + `Sidebar` (Publicar, Feed, Login/Sair dinâmico)
- Rotas públicas: `/`, `/posts/:id`; protegida: `/posts/new`
- `PostFeed` com SearchBar, chips de filtro, tabs Recentes/Populares
- `PostCard` + `PostThumbnail` com placeholder em `public/post-thumbnail-placeholder.svg`
- `PostDetail` com bloco de código, comentários/respostas e formulário para logados
- `CreatePostForm` conforme Figma (upload, tags, publicar/descartar)
- `postsApi.ts` + tipos; compartilhar via clipboard

## Uso local

```bash
docker compose up -d
cd apps/api && pnpm migration:run && pnpm seed
pnpm dev:api
pnpm dev:web
```

Usuários seed: `julio@codeconnect.dev`, `marcia@codeconnect.dev`, `gabriel@codeconnect.dev` (senha: `senha123`).
