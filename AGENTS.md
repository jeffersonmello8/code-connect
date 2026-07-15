# code-connect



Monorepo pnpm com frontend React e backend NestJS.



## Estrutura



```

apps/web/   → React 19 + Vite + Tailwind + Atomic Design + Oxlint

apps/api/   → NestJS 11 + REST + ESLint + Prettier + Jest

```



## Comandos essenciais



```bash

pnpm dev:web          # Frontend em modo dev

pnpm dev:api          # Backend em modo watch

pnpm build:web        # Build do frontend

pnpm build:api        # Build do backend

pnpm lint:web         # Oxlint no web

pnpm lint:api         # ESLint no api

```



## Princípios



- **Diff mínimo**: altere só o necessário para a tarefa

- **Convenções existentes**: leia o código ao redor antes de escrever

- **Sem segredos**: nunca commitar `.env`, credenciais ou tokens

- **Não editar gerados**: ignore `dist/`, `coverage/` e `node_modules/`

- **Comunicação**: responder em português

- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/) em ambos os apps



## Convenções por app



| App | Arquitetura | Testes |

|-----|-------------|--------|

| web | Atomic Design + Tailwind | Todo componente com teste de uso essencial |

| api | REST (verbos, status, recursos) | Specs colocalizados + e2e |



## Regras detalhadas



Convenções por área estão em `.cursor/rules/`. Contexto específico de cada app:



- `apps/web/AGENTS.md` — frontend

- `apps/api/AGENTS.md` — backend


