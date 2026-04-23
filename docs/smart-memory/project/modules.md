---
title: Mapa de Módulos
type: modules
status: active
agent: sites-architect
created: 2026-04-23
updated: 2026-04-23
tags: [project, modules, routing]
related: ["[[overview]]", "[[architecture]]", "[[tech-stack]]"]
---

# Mapa de Módulos — joao-guirunas-site

Site pessoal/autoridade de **João Guirunas** (CEO GrowthSales.ai), hospedado em `joaoguirunas.com`. Funciona como hub de conteúdo open source + funil de conversão para a mentoria. Arquitetura Next.js App Router, páginas majoritariamente estáticas (Server Components) com ilhas de interatividade client-side.

> Fonte da verdade de rotas para SEO: `src/app/sitemap.ts` (47 URLs catalogadas). Ver [[architecture]] para organização de pastas.

---

## 1. Core / Institucional

### 1.1 Home — Landing Principal
- **Path no repo:** `src/app/page.tsx`
- **URL:** `/`
- **Descrição:** Hero animado com os 3 verbos rotativos ("aprendo usando → aplico → compartilho") introduzindo a marca pessoal. Renderiza `AnimatedHero` (client component com framer-motion + sparkles). Única página que **não** usa o `SiteChrome` padrão (Header/Footer suprimidos via `SiteChrome.tsx` — `isHome` retorna apenas children).
- **Tipo:** Client Component (indireto via `AnimatedHero`)
- **Observação:** A home **não** é o hub de skills. O antigo hub "Open Source Skills" com catálogo filtrável foi movido para `/open-source`.

### 1.2 Open Source — Hub de Skills
- **Path no repo:** `src/app/open-source/page.tsx`
- **URL:** `/open-source`
- **Descrição:** Catálogo interativo com 40+ skills/squads/apps/integrações classificados em 5 categorias (`squads`, `skills`, `apps`, `integracoes`, `aprendizado`). Filtragem client-side por categoria. Cards linkam para páginas dedicadas em `/skills/*`, `/tools/*`, `/learn/*`, `/framework/*`, `/monitor/*`, `/squads/*`.
- **Tipo:** Client Component (`'use client'`, usa `useState` para filtros)
- **Stats exibidos:** 40 recursos, 100% open source, 13 cursos curados, 24/7 agentes.

### 1.3 Layout Global
- **Path no repo:** `src/app/layout.tsx`
- **Descrição:** Root layout. Injeta fonts Google (`Geist`, `Geist_Mono`, `Space_Grotesk`), Google Analytics (`G-3JD3TYNF7V`), JSON-LD (Person + WebSite schemas), metadados canônicos/OG/Twitter derivados de `siteConfig`. Define tema escuro (`bg-[#08080C]`) e envolve tudo em `SiteChrome`.
- **Config central:** `src/config/site.ts` — `siteConfig`, `organizationJsonLd`, `websiteJsonLd`.

---

## 2. Mentoria — Funil de Conversão (CORE BUSINESS)

Módulo mais rico do site, multi-seção com navegação própria. Meta: converter lead → inscrição via form Revos embarcado.

### 2.1 Mentoria — Landing
- **Path no repo:** `src/app/mentoria/page.tsx`
- **URL:** `/mentoria`
- **Descrição:** Landing completa com hero dual (mobile/desktop), seções numeradas, CTAs para `#inscricao`. Integração com sistema externo de formulários Revos (`https://revos.growthsales.ai/embed.js`). Meta de SEO: `Mentoria Claude Code + AIOX`.
- **Seções:** `hero`, `solucao`, `diferenciais`, `modulos`, `facilitadores`, `investimento`, `inscricao`, `faq`.

### 2.2 Componentes-cliente da Mentoria
Componentes auxiliares co-locados em `src/app/mentoria/`:
- `mentoria-nav.tsx` — nav flutuante com scroll spy (7 âncoras de seção).
- `section-dots.tsx` — indicador de progresso por seção (dots laterais).
- `solution-section.tsx` — seção "solução".
- `mentorship-features.tsx` — cards de diferenciais animados.
- `course-modules-timeline.tsx` — timeline dos módulos do curso.
- `mentorship-pricing.tsx` — variante antiga de pricing.
- `pricing-calculator.tsx` + `pricing-calculator-v2.tsx` — calculadora de investimento (interativa).
- `faq-accordion.tsx` — FAQ colapsável.
- `revos-form.tsx` — embed externo do form Revos (ID `a11d7cc4-17b8-400e-94e4-0f27ca47e9a4`). Reinicializa script no mount para garantir renderização em navegação SPA.

### 2.3 Mentoria / Apresentação
- **Path no repo:** `src/app/mentoria/apresentacao/page.tsx` + `ApresentacaoClient.tsx` + `layout.tsx`
- **URL:** `/mentoria/apresentacao`
- **Descrição:** Deck/apresentação completa do programa da mentoria. Página com layout próprio (provavelmente fullscreen sem header/footer — padrão semelhante ao workshop-1).
- **Tipo:** Server → Client (delegação).

---

## 3. Workshop

### 3.1 Workshop 1 — Claude Code na Prática
- **Path no repo:** `src/app/workshop-1/page.tsx` + `WorkshopClient.tsx` + `layout.tsx`
- **URL:** `/workshop-1`
- **Descrição:** Workshop de 1h cobrindo Claude Code, AIOX, Squad Creator e Obsidian. **Layout isolado:** o `layout.tsx` injeta CSS global para ocultar `header`, `footer`, `.skip-link` e `overflow: hidden` no body — página fullscreen sem chrome.
- **Padrão:** Route-scoped layout sobrescrevendo defaults do RootLayout.

---

## 4. Framework / Infraestrutura Própria

Páginas descrevendo produtos/frameworks autorais construídos pela GrowthSales.

### 4.1 AIOX Framework
- **Path no repo:** `src/app/framework/aiox-framework/page.tsx`
- **URL:** `/framework/aiox-framework`
- **Descrição:** Sistema de orquestração de agentes com squads e personas. Página usa componente reutilizável `SkillPage` (ver [[architecture]] §Padrão-Template-Pages).

### 4.2 AIOX Monitor
- **Path no repo:** `src/app/monitor/aiox-monitor/page.tsx`
- **URL:** `/monitor/aiox-monitor`
- **Descrição:** Dashboard isométrico real-time de agentes autônomos. Mesma base `SkillPage`.

### 4.3 Xquads Squads
- **Path no repo:** `src/app/squads/xquads/page.tsx`
- **URL:** `/squads/xquads`
- **Descrição:** Catálogo de 12 squads especializadas + 96 agentes. Base `SkillPage`.

### 4.4 Setup Claude Code
- **Path no repo:** `src/app/setup/claude-code/page.tsx`
- **URL:** `/setup/claude-code`
- **Descrição:** Guia de configuração avançada do Claude Code CLI. Base `SkillPage`.

---

## 5. Skills (Catálogo `/skills/*`)

25 páginas, cada uma dedicada a uma skill Claude Code open source. **Todas seguem o mesmo padrão:** Server Component + metadata + `<SkillPage />` com `features[]` + conteúdo opcional via children.

- **Path base no repo:** `src/app/skills/<slug>/page.tsx`
- **Template compartilhado:** `src/shared/components/ui/SkillPage.tsx` — gera breadcrumb + SoftwareApplication JSON-LD via `generateSkillJsonLd`.

| Slug | URL | Tema |
|---|---|---|
| `copywriting` | `/skills/copywriting` | Frameworks de texto de venda |
| `website-builder` | `/skills/website-builder` | Claude Code + 21st.dev para sites |
| `crm` | `/skills/crm` | CRM no-code com Claude Code |
| `instagram-dms` | `/skills/instagram-dms` | Claude como vendedor nos DMs |
| `n8n` | `/skills/n8n` | Migração de workflows N8N |
| `n8n-killers` | `/skills/n8n-killers` | Squad de 10 agentes pra n8n |
| `presentations` | `/skills/presentations` | Gamma App integrado |
| `content-dashboard` | `/skills/content-dashboard` | Dashboard de conteúdo |
| `ads-dashboard` | `/skills/ads-dashboard` | Meta + Google Ads unificado |
| `design-system` | `/skills/design-system` | Consistência visual via skill |
| `remotion` | `/skills/remotion` | Vídeo programático |
| `ai-image` | `/skills/ai-image` | 50+ modelos de imagem |
| `ai-video` | `/skills/ai-video` | 40+ modelos de vídeo |
| `graphic-designer` | `/skills/graphic-designer` | Thumbnails e banners |
| `notebook-lm` | `/skills/notebook-lm` | RAG com NotebookLM |
| `obsidian` | `/skills/obsidian` | Memória permanente via Obsidian |
| `dev-browser` | `/skills/dev-browser` | Controle do Chrome via código |
| `remote-control` | `/skills/remote-control` | Acesso mobile via QR Code |
| `cowork-plugins` | `/skills/cowork-plugins` | Módulos pra Claude Cowork |
| `carousel` | `/skills/carousel` | Carrosséis pra Instagram/LinkedIn |
| `supabase` | `/skills/supabase` | Backend open source |
| `vercel` | `/skills/vercel` | Deploy automatizado |
| `github` | `/skills/github` | Integração GitHub |

---

## 6. Tools (`/tools/*`)

Apps/ferramentas standalone. Mesmo padrão `SkillPage`.

| Slug | URL | Descrição |
|---|---|---|
| `maestri` | `/tools/maestri` | Comunicação inter-agentes entre terminais |
| `pixel-agents` | `/tools/pixel-agents` | Visualização pixel-art de agentes Claude |
| `animejs` | `/tools/animejs` | Componentes animados prontos |
| `instagram-cli` | `/tools/instagram-cli` | Instagram pelo terminal |

---

## 7. Learn (`/learn/*`)

Conteúdo educacional / curadoria. Mesmo padrão `SkillPage`.

| Slug | URL | Tema |
|---|---|---|
| `multi-agent` | `/learn/multi-agent` | Time de agentes IA 24/7 |
| `claude-code-skills` | `/learn/claude-code-skills` | 5 ferramentas grátis |
| `google-ads-ai` | `/learn/google-ads-ai` | Google Ads com IA |
| `meta-ads-ai` | `/learn/meta-ads-ai` | Meta Ads com IA |
| `seo-claude-code` | `/learn/seo-claude-code` | SEO via Claude Code |
| `ai-layouts` | `/learn/ai-layouts` | Layouts profissionais com IA |
| `anthropic-courses` | `/learn/anthropic-courses` | 13 cursos Anthropic |
| `managed-agents` | `/learn/managed-agents` | Managed Agents (Anthropic) |
| `learn-your-way` | `/learn/learn-your-way` | Google Learn Your Way |
| `github-repos` | `/learn/github-repos` | 8 repositórios essenciais |

---

## 8. SEO / Metadata Dinâmica

### 8.1 `robots.ts`
- **Path no repo:** `src/app/robots.ts`
- **Descrição:** Gera `/robots.txt` via `MetadataRoute.Robots` — libera `/` pra todos os bots e aponta sitemap.

### 8.2 `sitemap.ts`
- **Path no repo:** `src/app/sitemap.ts`
- **Descrição:** Gera `/sitemap.xml` — 47 URLs catalogadas com prioridade (1.0 → 0.5) e frequência (weekly/monthly). **Fonte única da verdade de rotas indexáveis.**

---

## 9. Shared (Design System Interno)

Componentes reutilizados em múltiplas rotas. Ver [[architecture]] §Organização-de-Pastas.

### 9.1 Layout
- **Path no repo:** `src/shared/components/layout/`
  - `SiteChrome.tsx` — wrapper que aplica Header/Footer em todas as páginas **exceto** `/`. Client component (usa `usePathname`).
  - `Header.tsx` — topbar fixo com logo/avatar e CTA `MentoriaHeaderButton`.
  - `Footer.tsx` — footer com 3 colunas (brand/ferramentas/aprender) e social links.
  - `MentoriaHeaderButton.tsx` — CTA contextual.

### 9.2 UI Primitives
- **Path no repo:** `src/shared/components/ui/`
  - `SkillPage.tsx` — **template reutilizado em ~30+ rotas**. Gera breadcrumb + SoftwareApplication JSON-LD.
  - `Icon.tsx` — biblioteca de ícones inline (Heroicons).
  - `animated-hero.tsx` — hero com framer-motion + sparkles (usado em `/`).
  - `sparkles.tsx` — wrapper tsparticles.
  - `button.tsx` — button com `class-variance-authority` + `cn()` de `@/lib/utils`.

### 9.3 Sections
- **Path no repo:** `src/shared/components/sections/HeroSection.tsx`
- **Descrição:** Hero alternativo (não ativo no momento — paleta diferente, `#E8601C`/`#1E3A5F`).

### 9.4 Types / Lib
- `src/shared/types/index.ts` — `CategoryColor` union type.
- `src/lib/utils.ts` — utility `cn()` (Tailwind merge).
- `src/config/site.ts` — `siteConfig`, `organizationJsonLd`, `websiteJsonLd`.

---

## 10. Integrações Externas Identificadas

| Integração | Onde | Propósito |
|---|---|---|
| Google Analytics `G-3JD3TYNF7V` | `app/layout.tsx` | Analytics |
| Google Fonts | `app/layout.tsx` | Geist / Geist Mono / Space Grotesk |
| Revos Forms | `app/mentoria/revos-form.tsx` | Form de inscrição na mentoria |
| Vercel | `vercel.json` | Deploy + redirect de `opensource.growthsales.ai` → `joaoguirunas.com` |
| GrowthSales.ai | Links no rodapé / facilitadores | Site matriz |

---

## Observações Arquiteturais

- **Rota dominante:** Padrão template-page com `<SkillPage />` — ~33 páginas seguem este molde (todas sob `/skills`, `/tools`, `/learn`, `/framework`, `/monitor`, `/squads`, `/setup`). Ver [[architecture]] §Padrão-Template-Pages.
- **Co-location:** Componentes específicos de uma rota ficam dentro da própria pasta de rota (`src/app/mentoria/*.tsx`) em vez de `shared/`. Ver [[architecture]] §Co-location-Rule.
- **Pasta `src/features/`:** vazia (apenas `.gitkeep`). Indica intenção de organizar por feature mas ainda não adotada.
- **Módulos órfãos do sitemap:** `/mentoria/apresentacao` tem `priority: 0.7`, mas `HeroSection.tsx` em `shared/sections/` parece não estar em uso ativo.
