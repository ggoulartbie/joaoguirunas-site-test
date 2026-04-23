---
title: Arquitetura
type: architecture
status: active
agent: sites-architect
created: 2026-04-23
updated: 2026-04-23
tags: [project, architecture, next-js, app-router]
related: ["[[overview]]", "[[modules]]", "[[tech-stack]]", "[[conventions]]"]
---

# Arquitetura — joao-guirunas-site

Site de autoridade pessoal + funil de conversão (mentoria). Stack principal documentada em [[tech-stack]] (responsabilidade do sites-analyst). Mapa de rotas em [[modules]].

---

## 1. Padrão Arquitetural

### Next.js 16 — App Router (100%)

- **Router:** App Router exclusivamente. Não há `/pages` nem híbrido. Todas as rotas vivem em `src/app/`.
- **React 19:** `reactStrictMode: true` em [next.config.ts](../../../next.config.ts).
- **Server-first:** Páginas são **Server Components por padrão**. Apenas componentes com interatividade real declaram `'use client'` (ex: `AnimatedHero`, `SiteChrome`, calculadora de pricing, FAQ accordion).
- **TypeScript estrito:** `strict: true` + `noUncheckedIndexedAccess: true` + `noImplicitReturns` + `noFallthroughCasesInSwitch` + `noImplicitOverride` em [tsconfig.json](../../../tsconfig.json). Config mais rigorosa que o preset default do Next.

### Renderização

- **SSG dominante:** Todas as páginas com `export const metadata` e sem fetch dinâmico são renderizadas estaticamente em build time. Nenhuma página declara `dynamic = 'force-dynamic'` ou `revalidate` — **não há ISR configurada**.
- **Zero SSR runtime:** Não há consumo de APIs server-side por request. O único "dinâmico" é o embed Revos (roda client-side).
- **Turbopack em dev:** `npm run dev` usa `next dev --turbopack` (definido em `package.json:7`).

---

## 2. Organização de Pastas

```
src/
├── app/                    # App Router — única fonte de rotas
│   ├── layout.tsx          # RootLayout: fonts, GA, JSON-LD, SiteChrome
│   ├── page.tsx            # Home (/)
│   ├── robots.ts           # /robots.txt (Metadata API)
│   ├── sitemap.ts          # /sitemap.xml (Metadata API) — 47 URLs
│   ├── globals.css         # Tailwind v4 + tokens
│   ├── mentoria/           # Rota + componentes co-locados
│   │   ├── page.tsx
│   │   ├── *.tsx           # ~12 client components específicos
│   │   └── apresentacao/
│   ├── workshop-1/         # Rota com layout fullscreen próprio
│   │   ├── layout.tsx      # Override: oculta header/footer/skip-link
│   │   ├── page.tsx
│   │   └── WorkshopClient.tsx
│   ├── open-source/        # Hub de skills
│   ├── skills/<slug>/      # 25 páginas — padrão SkillPage
│   ├── tools/<slug>/       # 4 páginas — padrão SkillPage
│   ├── learn/<slug>/       # 10 páginas — padrão SkillPage
│   ├── framework/, monitor/, squads/, setup/  # 1 página cada — padrão SkillPage
│   └── mentoria/apresentacao/
│
├── config/
│   └── site.ts             # siteConfig + JSON-LD schemas (Person/WebSite)
│
├── shared/                 # Design system interno (reusado entre rotas)
│   ├── components/
│   │   ├── layout/         # SiteChrome, Header, Footer, MentoriaHeaderButton
│   │   ├── ui/             # SkillPage (template), Icon, button, animated-hero, sparkles
│   │   └── sections/       # HeroSection (legado, não ativo)
│   └── types/              # Union types compartilhados (ex: CategoryColor)
│
├── lib/
│   └── utils.ts            # cn() — twMerge + clsx
│
└── features/               # Removida (Story 1.3) — padrão real é co-location em src/app/
```

### Aliases TypeScript

- **`@/*`** → `./src/*` (definido em `tsconfig.json:29-32`)
- **Uso universal:** Todos os imports internos passam por `@/` — nunca há `../../../shared/...`.

---

## 3. Padrões Estruturais Observáveis

### 3.1 Padrão Template-Pages (SkillPage)

**~33 páginas usam o mesmo molde.** Todas as rotas em `/skills`, `/tools`, `/learn`, `/framework`, `/monitor`, `/squads`, `/setup` seguem este formato:

```tsx
// src/app/skills/<slug>/page.tsx
import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: '...',
  description: '...',
  alternates: { canonical: `${siteConfig.url}/...` },
  openGraph: { ... },
  twitter: { ... },
};

const features = [ { title, description, icon }, ... ];

export default function Page() {
  return <SkillPage title={...} features={features} ... />;
}
```

O componente `SkillPage` ([src/shared/components/ui/SkillPage.tsx](../../../src/shared/components/ui/SkillPage.tsx)) encapsula:
- Hero + breadcrumb
- Grid de features
- Structured data (BreadcrumbList + SoftwareApplication JSON-LD) via `generateSkillJsonLd()`
- CTA para GitHub / link primário

**Consequência arquitetural:** Adicionar uma nova skill = criar pasta + `page.tsx` com ~30 linhas. Zero duplicação de layout/SEO boilerplate.

### 3.2 Co-location Rule

Componentes **específicos de uma rota** ficam dentro da pasta dessa rota, não em `shared/`.

- Exemplo: `/mentoria` tem ~12 `.tsx` co-locados (`mentoria-nav.tsx`, `revos-form.tsx`, `pricing-calculator.tsx`, etc.).
- Apenas componentes genuinamente reutilizados migram para `src/shared/components/`.

**Critério observável:** se só um `page.tsx` importa, fica co-locado. Se 2+ importam, vai pra `shared/`.

### 3.3 Client Component Boundary

Componentes com `'use client'` identificados:

- **UI interativa:** `animated-hero.tsx`, `sparkles.tsx`, botões/CTAs com scroll smooth.
- **Widgets da mentoria:** `mentoria-nav.tsx` (scroll spy), `section-dots.tsx`, `faq-accordion.tsx`, `pricing-calculator*.tsx`, `revos-form.tsx` (useEffect para embed externo).
- **Layout condicional:** `SiteChrome.tsx` (usa `usePathname` para detectar home).
- **Catálogo filtrável:** `/open-source/page.tsx` (useState para filtros de categoria).

**Regra:** Server por padrão, client só quando há hook, browser API ou event handler.

### 3.4 Layout Override Pattern

Rotas com chrome customizado usam `layout.tsx` próprio no segmento da rota.

- **Exemplo:** `/workshop-1/layout.tsx` injeta `<style>` que oculta header/footer/skip-link e trava `overflow: hidden` no body — página fullscreen.
- **Exemplo:** `/mentoria/apresentacao/layout.tsx` — mesmo padrão provável.
- **RootLayout** (`/app/layout.tsx`) define tema escuro, fonts e JSON-LD globais; segments layouts apenas sobrescrevem quando necessário.

---

## 4. SEO / Metadata

### Estratégia
- **Metadata API nativa do Next 16** — cada `page.tsx` exporta `metadata: Metadata` com `title`, `description`, `alternates.canonical`, `openGraph`, `twitter`.
- **Templates de título:** RootLayout define `title.template = '%s | João Guirunas'` — todas as rotas filhas herdam.
- **`metadataBase`:** definido em RootLayout como `new URL(siteConfig.url)` — resolve URLs relativas de OG.
- **Structured data:**
  - Global (Person + WebSite) em [layout.tsx](../../../src/app/layout.tsx) injetado via `<script type="application/ld+json">`.
  - Per-page (BreadcrumbList + SoftwareApplication) via `generateSkillJsonLd()` dentro do `SkillPage`.

### Rotas indexáveis
- **Single source of truth:** [src/app/sitemap.ts](../../../src/app/sitemap.ts) — 47 URLs com `priority` e `changeFrequency` explícitos.
- `/robots.ts` libera tudo (`allow: '/'`) e aponta para `/sitemap.xml`.
- `metadata.robots = { index: true, follow: true }` global (RootLayout).

---

## 5. Styling

- **Tailwind v4** (via `@tailwindcss/postcss`). Config mínima — tokens e customs em `src/app/globals.css`.
- **Design tokens inline:**
  - Fundo: `#08080C` (near-black)
  - Accent: `#FF4400` (laranja principal)
  - Alternativo: `#FF5C10`, `#FF5722` (hovers)
  - Fonts: Geist (sans), Geist Mono, Space Grotesk (display), TASAOrbiter (CSS-referenciado em mentoria)
- **Util `cn()`** em `src/lib/utils.ts` — `twMerge + clsx` para merge consistente de classes.
- **Componentes com `class-variance-authority`:** `button.tsx` usa `cva` para variants.
- **Radix UI:** apenas `@radix-ui/react-slot` (base primitive do button).
- **Lucide-react:** ícones em componentes client (ex: `animated-hero` usa `ArrowRight`).

---

## 6. Integrações Externas

| Integração | Localização | Tipo |
|---|---|---|
| **Google Analytics** (`G-3JD3TYNF7V`) | `app/layout.tsx` — `<script async>` + inline config | Client-side script |
| **Google Fonts** | `app/layout.tsx` — `next/font/google` | Build-time (self-hosted) |
| **Revos Forms** (`revos.growthsales.ai/embed.js`) | `app/mentoria/revos-form.tsx` — dinâmica via `useEffect` | Client-side embed. Re-injeta script a cada mount (corrige bug de SPA navigation) |
| **Vercel** | `vercel.json` | Deploy + redirect permanente de `opensource.growthsales.ai` → `joaoguirunas.com` |
| **framer-motion** | Hero animado, mentorship features | Animações client-side |
| **@tsparticles/react + @tsparticles/slim** | `animated-hero.tsx` via `sparkles.tsx` | Partículas no hero |

**Zero backend próprio.** Não há `route.ts` (API routes), Server Actions, ou banco de dados. Todas as interações que exigem backend são delegadas a serviços externos (Revos, GA).

---

## 7. Build / Deploy

- **Build:** `next build` — produz output estático + SSG.
- **Deploy:** Vercel (evidência: `.vercel/` no repo, `vercel.json` com regras de redirect).
- **Type checking:** script `typecheck` dedicado (`tsc --noEmit`) — separado do build.
- **Lint:** `next lint` (ESLint default do Next).

### Redirect de domínio legado
Em `vercel.json`:
```json
{
  "source": "/(.*)",
  "has": [{ "type": "host", "value": "opensource.growthsales.ai" }],
  "destination": "https://joaoguirunas.com/$1",
  "permanent": true
}
```
Contexto: o site começou em `opensource.growthsales.ai` e foi rebrandeado para `joaoguirunas.com` (ver `siteConfig.url`). Todos os paths legados são preservados via 301.

---

## 8. Decisões Arquiteturais Observáveis

Não há ADRs formais ainda em `docs/smart-memory/decisions/`. Decisões inferidas do código:

1. **App Router puro, zero Pages Router** — modernidade e React Server Components como default.
2. **Template reutilizado `SkillPage`** — padroniza ~33 páginas sem DRY manual.
3. **Co-location de componentes específicos** (`src/app/mentoria/*.tsx`) em vez de `src/features/` (que existe vazia).
4. **SSG total, sem ISR** — site de baixa frequência de atualização; rebuild via push.
5. **Zero API routes próprias** — integrações delegadas a SaaS (Revos, GA). Backend mínimo.
6. **TypeScript mais estrito que o default Next** — `noUncheckedIndexedAccess`, `noImplicitReturns`, etc.
7. **Tailwind v4 com tokens inline** — sem `tailwind.config` elaborado; estilo direto em className.
8. **Um único hero component ativo** (`animated-hero` em `shared/ui/`) — `HeroSection` (legado) removido em Story 1.1.
9. **Pasta `src/features/` removida** — padrão adotado é co-location em `src/app/` (Story 1.3).

---

## 9. Riscos / Débitos Observados

- **`src/lib/.gitkeep`** — apenas `lib/utils.ts` com conteúdo real; `.gitkeep` pode ser removido.
- **Dois pricing calculators resolvido** — `pricing-calculator-v2.tsx` removido em Story 1.1; apenas v1 ativo.
- **Sitemap hardcoded** (`sitemap.ts` com array literal de 47 entradas) — adicionar uma nova rota exige edição manual do sitemap. Sem automação.
- **Zero testes** observáveis no repo. Sem `tests/`, `__tests__/`, ou configuração de Vitest/Jest.
