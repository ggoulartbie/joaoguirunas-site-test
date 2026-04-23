---
title: Tech Stack
type: project
status: active
agent: sites-analyst
created: 2026-04-23
updated: 2026-04-23
tags: [project, tech-stack]
related: ["[[overview]]", "[[conventions]]", "[[architecture]]"]
---

# Tech Stack — joao-guirunas-site

## Framework & Runtime

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | Next.js | ^16.0.0 |
| Linguagem | TypeScript | ^5.7.0 |
| Runtime JS | React | ^19.0.0 |
| React DOM | react-dom | ^19.0.0 |
| Node types | @types/node | ^22.0.0 |

Next.js roda com **Turbopack** no dev (`next dev --turbopack`). `reactStrictMode: true`. Build padrão estático/SSR via `next build`.

## Styling

| Tecnologia | Versão | Função |
|---|---|---|
| Tailwind CSS | ^4.0.0 | Utility-first CSS |
| @tailwindcss/postcss | ^4.0.0 | PostCSS plugin para Tailwind v4 |
| tailwind-merge | ^3.5.0 | Merge seguro de classes Tailwind |
| clsx | ^2.1.1 | Composição condicional de classnames |

Tailwind v4 usa **`@import "tailwindcss"`** direto no CSS (sem config file separado). O tema é definido via `@theme {}` block em `src/app/globals.css`. Não há `tailwind.config.js/ts`.

Design system: **Brutalist Enterprise** inspirado no AIOX Brandbook v2.0. Paleta dark com fundo `#08080C`, accent `#FF4400`.

## Fontes (Google Fonts via next/font)

- **Geist** → `--font-sans` (corpo/UI)
- **Space Grotesk** 700 → `--font-display` (headings display)
- **Geist Mono** 400/500/600/700 → `--font-mono` (labels, badges, CTAs)

Aliases BrandBook: `--font-bb-sans`, `--font-bb-mono`, `--font-bb-display`.

## Componentes UI

| Biblioteca | Versão | Uso |
|---|---|---|
| @radix-ui/react-slot | ^1.2.4 | Primitivo para `asChild` pattern no Button |
| class-variance-authority | ^0.7.1 | Variantes tipadas do `Button` component |
| lucide-react | ^1.7.0 | Ícones (ex: `ArrowRight` no hero) |

Não usa shadcn/ui como biblioteca completa — apenas o padrão `cva` + `@radix-ui/react-slot` para o Button.

## Animação & Partículas

| Biblioteca | Versão | Uso |
|---|---|---|
| framer-motion | ^12.38.0 | Animações de entrada no hero (motion.div) |
| @tsparticles/react | ^3.0.0 | Wrapper React para tsParticles |
| @tsparticles/engine | ^3.9.1 | Engine core |
| @tsparticles/slim | ^3.9.1 | Bundle slim de preset (usado no SparklesCore) |

## Imagens

Next.js `<Image>` com formatos `['image/avif', 'image/webb']` habilitados via `next.config.ts`.

## SEO & Structured Data

- Metadata API do Next.js 15+ (exportando `metadata` em `layout.tsx` e pages)
- JSON-LD inline via `dangerouslySetInnerHTML`: `Person`, `WebSite`, `SoftwareApplication`, `BreadcrumbList`
- `robots.ts` e `sitemap.ts` no App Router (`src/app/`)
- Google Analytics: GA4 `G-3JD3TYNF7V` (script manual no `<head>`)
- OpenGraph + Twitter Cards configurados via `siteConfig`

## Serviços Externos

| Serviço | Integração | Arquivo |
|---|---|---|
| Vercel | Deploy + redirect de domínio antigo | `vercel.json` |
| Google Analytics | GA4 gtag.js manual | `layout.tsx` |
| Revos | Form embed externo (script injection) | `src/app/mentoria/revos-form.tsx` |
| Google Fonts | next/font/google | `layout.tsx` |

`vercel.json`: redirect permanente de `opensource.growthsales.ai` → `joaoguirunas.com`.

## Build & Tooling

| Ferramenta | Config |
|---|---|
| TypeScript | `tsconfig.json` — strict mode, noUncheckedIndexedAccess, noImplicitReturns |
| PostCSS | `postcss.config.mjs` — só `@tailwindcss/postcss` |
| ESLint | Via `next lint` (sem config customizado detectado) |
| Prettier | Não detectado |

## Path Aliases

`@/*` → `./src/*` (definido em `tsconfig.json` paths).

## Scripts npm

```
dev       → next dev --turbopack
build     → next build
start     → next start
lint      → next lint
typecheck → tsc --noEmit
```
