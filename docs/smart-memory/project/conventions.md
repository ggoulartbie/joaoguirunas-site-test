---
title: Code Conventions
type: project
status: active
agent: sites-analyst
created: 2026-04-23
updated: 2026-04-23
tags: [project, conventions]
related: ["[[tech-stack]]", "[[architecture]]"]
---

# Code Conventions — joao-guirunas-site

## Estrutura de diretórios

```
src/
  app/           — App Router (Next.js 13+): pages, layouts, route segments
  shared/
    components/
      layout/    — Header, Footer, SiteChrome (componentes de shell)
      sections/  — Seções de página reutilizáveis (HeroSection)
      ui/        — Primitivos e componentes genéricos (Button, Icon, SkillPage…)
    types/       — Tipos TypeScript compartilhados (index.ts)
  config/        — Configuração global do site (siteConfig, JSON-LD)
  lib/           — Utilitários (utils.ts: cn())
  features/      — Placeholder (vazio, .gitkeep)
```

Componentes específicos de uma rota ficam **co-localizados** na pasta da rota dentro de `app/`. Exemplo: `src/app/mentoria/faq-accordion.tsx`.

## Naming Conventions

| Artefato | Convenção | Exemplo |
|---|---|---|
| Componentes React | PascalCase | `SiteChrome`, `SkillPage`, `FaqAccordion` |
| Arquivos de componente | kebab-case ou PascalCase | `animated-hero.tsx`, `WorkshopClient.tsx` |
| Funções utilitárias | camelCase | `cn()`, `generateSkillJsonLd()` |
| Constantes | SCREAMING_SNAKE_CASE | `INSCRICAO_ANCHOR`, `DISPLAY_FONT`, `ORANGE` |
| Tipos/Interfaces | PascalCase com sufixo `Props` | `SkillPageProps`, `SkillFeature`, `ButtonProps` |
| Arquivos de config | camelCase | `siteConfig`, `organizationJsonLd` |
| Barrel files | `index.ts` | `src/shared/components/ui/index.ts` |

## TypeScript

- **strict mode ativado**: `"strict": true` + extras (`noUncheckedIndexedAccess`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noImplicitOverride`)
- `target: ES2017`, `moduleResolution: bundler`
- Interfaces exportadas junto ao componente (`export interface ButtonProps`)
- Tipos `as const` para objetos de config (`siteConfig as const`)
- `Pick<>` e utilitários de tipo usados ativamente (ex: `generateSkillJsonLd` recebe `Pick<SkillPageProps, …>`)

## Padrão de Componentes

### Server Components (padrão)
Componentes sem `'use client'` são Server Components por default. Ex: `Header`, `Footer`, `SkillPage`, todas as pages.

### Client Components
Adicionam `'use client'` na primeira linha quando precisam de hooks ou eventos. Ex: `SiteChrome` (usa `usePathname`), `AnimatedHero` (usa `useEffect`, `useState`), `RevosForm`.

### Estrutura interna de componente
```tsx
// 'use client'; // só se necessário

import ...

// Constantes locais em SCREAMING_SNAKE ou camelCase
const ORANGE = '#FF4400';

// Tipos/interfaces antes do componente
export interface Props { ... }

// Componentes auxiliares locais (funções declaradas acima do export principal)
function CtaButton({ ... }) { ... }

// Export nomeado (não default, exceto pages/layouts do App Router)
export function ComponentName({ ... }: Props) { ... }
```

### Pages e Layouts (App Router)
- `page.tsx` exporta `default function`
- `layout.tsx` exporta `default function`
- Metadata estática via `export const metadata: Metadata = { … }`
- Metadata por rota em cada `page.tsx` (título, description, OG, canonical)

## Padrão de Imports

Ordem observada (sem enforcer automático detectado):
1. Imports de `next/*` e `react`
2. Imports com path alias `@/` (internos ao projeto)
3. Imports relativos `./` dentro da mesma rota

Path alias `@/` aponta para `src/`. Sempre preferido sobre caminhos relativos longos.

Barrel exports em `index.ts`:
```ts
// src/shared/components/layout/index.ts
export { Header } from './Header';
export { Footer } from './Footer';
```

## Tailwind CSS

- Classes utility diretamente no JSX (não CSS modules)
- `cn()` de `@/lib/utils` para composição condicional: `cn(base, conditional, className)`
- Variáveis CSS do `@theme {}` usadas junto com classes Tailwind:
  - `var(--font-mono)` nos `style={}` inline para tipografia monotipada em badges/labels
  - Cores hardcoded como `#FF4400` em Tailwind arbitrary values: `bg-[#FF4400]`, `text-[#FF4400]/60`
- Padrão de opacidade: `white/60`, `white/10` (Tailwind opacity modifier)
- Zero config file — Tailwind v4 lê o CSS diretamente

### Classes reutilizáveis definidas em globals.css
- `.glass-card` — card brutalist com hover glow laranja
- `.btn-primary` — botão mono uppercase brutalist
- `.mono-label` — label mono uppercase para badges
- `.accent-line` — linha decorativa gradiente laranja
- `.glow-text` — text-shadow laranja para headings display
- `.skip-link` — acessibilidade: link "pular para conteúdo"

## Acessibilidade (A11y)

Convenção ativa: fixes são marcados com comentários `// [FIX A11Y-NNN]` no código. Ex:
- `[FIX A11Y-003]` — breadcrumb com `aria-label`
- `[FIX A11Y-012]` — `prefers-reduced-motion` global
- `[FIX A11Y-014]` — contraste de texto aumentado de `white/50` para `white/60`

`aria-hidden="true"` usado consistentemente em ícones SVG decorativos.
`aria-label` em links com conteúdo somente visual/imagem.
`aria-current="page"` no breadcrumb item ativo.

## SEO por Página

Cada `page.tsx` define `export const metadata` local com:
- `title` (string simples — o template `| João Guirunas` é adicionado pelo layout raiz)
- `description`
- `openGraph.images`
- `alternates.canonical`

JSON-LD inline via `<script type="application/ld+json" dangerouslySetInnerHTML>`. Schemas usados: `Person`, `WebSite`, `SoftwareApplication`, `BreadcrumbList`.

## Configuração Global do Site

`src/config/site.ts` centraliza:
- `siteConfig` — nome, URL, description, OG image, locale, redes sociais
- `organizationJsonLd` — schema Person (João Guirunas / GrowthSales.ai)
- `websiteJsonLd` — schema WebSite

Importado em `layout.tsx` (root) e em páginas/componentes que precisam de URLs absolutas.

## Gestão de Estado

Sem state management global (sem Redux, Zustand, Context API). Estado é local a componentes client (`useState`). Formulários externos (Revos) via script embed + `useEffect`.
