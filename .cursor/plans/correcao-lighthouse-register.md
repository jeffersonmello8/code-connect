# Correção Lighthouse — `/register`

## Overview

Correções de performance, acessibilidade e SEO na página de cadastro com base no relatório Lighthouse, validadas no build de produção (preview), não no Vite dev.

## Data de conclusão

2026-07-19

## Principais entregas

- **Imagens WebP**: banners (~1,4 MB → ~38 KB), brand-mark e logo convertidos e redimensionados; `fetchPriority`, `width`/`height` em `AuthBanner`, `AuthLayout` e `BrandMark`
- **Ícones SVG**: Material Symbols (~320 KB) substituído por SVGs inline no átomo `Icon`; fonte Prompt via `<link>` + `preconnect` no `index.html`
- **A11y SocialButton**: removido `aria-label` conflitante; ícones decorativos com `alt=""` e `aria-hidden`
- **SEO**: `lang="pt-BR"`, `<title>`, meta description e `public/robots.txt`
- **Validação**: 37 testes passando, lint limpo; Lighthouse no preview — Performance **0,92** (era 0,61), A11y **1,00**, SEO **1,00**, LCP **2,7 s** (era 6,0 s)
