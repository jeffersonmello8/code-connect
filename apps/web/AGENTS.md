# apps/web — Frontend

## Stack

- React 19, Vite 8, TypeScript 6
- **Tailwind CSS** — estilização exclusiva via utility classes
- **Atomic Design** — organização de componentes por camada
- Lint: Oxlint (`pnpm lint:web` na raiz)
- Testes: Vitest + Testing Library (colocalizados)

## Estrutura (Atomic Design)

```
src/
  components/
    atoms/        → Button, Input, Label, Icon
    molecules/    → SearchBar, FormField, Card
    organisms/    → Header, Sidebar, ProductList
    templates/    → PageLayout, AuthLayout
  pages/          → HomePage, LoginPage (composição de templates + organisms)
  hooks/          → custom hooks reutilizáveis
  assets/         → imagens e SVGs estáticos
  main.tsx        → entry point
  App.tsx         → roteamento / shell da aplicação
```

## Regras de camada

| Camada | Pode importar de | Não importa de |
|--------|------------------|----------------|
| atoms | — | molecules, organisms, templates, pages |
| molecules | atoms | organisms, templates, pages |
| organisms | atoms, molecules | templates, pages |
| templates | atoms, molecules, organisms | pages |
| pages | todas as camadas abaixo | — |

## Tailwind

- Estilizar com classes Tailwind no JSX (`className`)
- Não criar arquivos `.css` por componente (exceto `index.css` global)
- Extrair classes repetidas com `@apply` em `@layer components` somente quando necessário
- Preferir composição (`cn()` ou similar) para variantes

## Testes obrigatórios

**Todo componente novo** deve ter um arquivo de teste colocalizado:

```
components/atoms/Button/
  Button.tsx
  Button.test.tsx
```

O teste deve cobrir o **uso essencial**: renderização, interação principal e props críticas.

```typescript
// Exemplo mínimo
it('should call onClick when clicked', () => { ... })
it('should render children', () => { ... })
```

## Padrões

- Componentes funcionais com hooks
- Named exports para componentes reutilizáveis
- Acessibilidade: `alt`, `type="button"`, `aria-*` quando necessário
- Lógica de negócio em hooks, não no JSX

## Lint e testes

```bash
pnpm lint:web                              # na raiz
pnpm --filter web test                     # testes (quando configurado)
```
