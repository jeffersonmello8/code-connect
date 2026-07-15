# Revisar código

Revise as mudanças atuais (staged, unstaged ou arquivos mencionados) usando este checklist:

## Escopo

- [ ] A mudança resolve apenas o que foi pedido?
- [ ] Não há refatorações ou arquivos não relacionados?

## TypeScript

- [ ] Tipos explícitos onde necessário?
- [ ] Sem `any` desnecessário?

## apps/web

- [ ] Componente na camada Atomic Design correta (atoms → pages)?
- [ ] Imports respeitam hierarquia de camadas?
- [ ] Estilização com Tailwind (sem `.css` por componente)?
- [ ] **Todo componente novo tem `*.test.tsx` com uso essencial?**
- [ ] Acessibilidade básica (roles, alt, type="button")
- [ ] `pnpm lint:web` sem erros
- [ ] `pnpm --filter web test` passa (se aplicável)

## apps/api

- [ ] URLs REST: substantivos plural, sem verbos
- [ ] Verbos HTTP e status codes corretos (201 POST, 204 DELETE, etc.)
- [ ] DTOs com validação para entrada
- [ ] Respostas de erro padronizadas
- [ ] Paginação em listagens quando aplicável
- [ ] Padrão module → controller → service
- [ ] `pnpm lint:api` sem erros
- [ ] Testes cobrem contrato HTTP

## Git

- [ ] Mensagem de commit segue Conventional Commits?
- [ ] Scope correto (`web`, `api`)?

## Segurança

- [ ] Sem segredos, tokens ou `.env` nos arquivos?
- [ ] Inputs validados em endpoints?

## Resultado

Liste problemas por severidade (crítico / sugestão) e proponha correções concretas.
