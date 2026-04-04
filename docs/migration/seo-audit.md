# SEO Audit — Astro to Next.js Migration

> Generated: 2026-04-04
> Agent: Sahadeva (SEO Analyst)
> Site: https://opensource.growthsales.ai
> Framework: Astro 5.x with @astrojs/sitemap and @astrojs/mdx

---

## 1. Global Configuration

### astro.config.mjs

```js
site: 'https://opensource.growthsales.ai'
integrations: [mdx(), sitemap()]
```

- **Site URL**: `https://opensource.growthsales.ai` (usado para canonical URLs e sitemap)
- **Sitemap**: Auto-gerado via `@astrojs/sitemap` (todas as páginas em `src/pages/`)
- **MDX**: Suporte a MDX habilitado

### robots.txt (`public/robots.txt`)

```
User-agent: *
Allow: /

Sitemap: https://opensource.growthsales.ai/sitemap-index.xml
```

**Next.js action**: Recriar em `public/robots.txt` ou via `app/robots.ts`.

---

## 2. BaseLayout.astro — Meta Tags Globais

**Arquivo**: `src/layouts/BaseLayout.astro`

### Props Interface

```typescript
interface Props {
  title: string;
  description?: string;
  ogImage?: string;
}
```

### Defaults

| Prop | Default Value |
|------|--------------|
| `description` | `"Open Source Tools by GrowthSales AI — Multiplicacao de produtividade com agentes autonomos e Claude Code."` |
| `ogImage` | `/images/og-default.png` |

### Title Pattern

```
{title} | GrowthSales Open Source
```

### HTML Attributes

| Attribute | Value |
|-----------|-------|
| `lang` | `pt-BR` |
| `class` | `dark` |

### Head Meta Tags

| Tag | Value |
|-----|-------|
| `charset` | `UTF-8` |
| `viewport` | `width=device-width, initial-scale=1.0` |
| `robots` | `index, follow` |
| `description` | `{description}` (prop) |
| `canonical` | `{Astro.url.pathname}` resolved against site |
| `favicon` | `/favicon.svg` (SVG) |

### Fonts (Preconnect + Load)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

### Open Graph Tags

| Property | Value |
|----------|-------|
| `og:title` | `{fullTitle}` (= `{title} \| GrowthSales Open Source`) |
| `og:description` | `{description}` |
| `og:type` | `website` |
| `og:site_name` | `GrowthSales Open Source` |
| `og:url` | `{canonicalURL.href}` |
| `og:image` | `{ogImageURL.href}` (resolved from prop) |
| `og:image:width` | `1200` |
| `og:image:height` | `630` |
| `og:locale` | `pt_BR` |

### Twitter Card Tags

| Name | Value |
|------|-------|
| `twitter:card` | `summary_large_image` |
| `twitter:site` | `@growthsales_ai` |
| `twitter:creator` | `@growthsales_ai` |
| `twitter:title` | `{fullTitle}` |
| `twitter:description` | `{description}` |
| `twitter:image` | `{ogImageURL.href}` |

### Structured Data (JSON-LD) — Global

**1. Organization**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GrowthSales AI",
  "url": "https://opensource.growthsales.ai",
  "logo": "https://opensource.growthsales.ai/logo.svg",
  "description": "Open source tools para multiplicacao de produtividade com agentes autonomos e Claude Code.",
  "sameAs": [
    "https://github.com/SynkraAI",
    "https://linkedin.com/company/growthsales-ai",
    "https://twitter.com/growthsales_ai"
  ]
}
```

**2. WebSite**

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "GrowthSales Open Source",
  "url": "https://opensource.growthsales.ai",
  "description": "{description prop}",
  "inLanguage": "pt-BR"
}
```

### hreflang / Alternate

**Nao existe.** O site e single-language (pt-BR). Nenhuma tag `hreflang` ou `link rel="alternate"` foi encontrada.

---

## 3. SkillPage Component — Structured Data por Pagina

**Arquivo**: `src/components/SkillPage.astro`

Todas as paginas que usam `<SkillPage>` recebem automaticamente 2 JSON-LD adicionais:

### BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://opensource.growthsales.ai/" },
    { "@type": "ListItem", "position": 2, "name": "Skills", "item": "https://opensource.growthsales.ai/#skills" },
    { "@type": "ListItem", "position": 3, "name": "{title}", "item": "{canonicalURL}" }
  ]
}
```

### SoftwareApplication

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "{title}",
  "description": "{description}",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Cross-platform",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
  "author": { "@type": "Person", "name": "{author}" },
  "url": "{primaryLink}"
}
```

---

## 4. Mapa Completo de Paginas e SEO

### 4.1 Homepage — `/`

| Campo | Valor |
|-------|-------|
| **Arquivo** | `src/pages/index.astro` |
| **Title** | `Open Source Tools \| GrowthSales Open Source` |
| **Description** | (default do BaseLayout) |
| **ogImage** | `/images/og-default.png` (default) |
| **JSON-LD** | Organization + WebSite (global) |
| **URL** | `https://opensource.growthsales.ai/` |

**Nota**: A homepage usa `<BaseLayout title="Open Source Tools">` sem description ou ogImage custom. Herda os defaults.

### 4.2 Mentoria — `/mentoria`

| Campo | Valor |
|-------|-------|
| **Arquivo** | `src/pages/mentoria.astro` |
| **Title** | `Mentoria Claude Code + AIOX \| GrowthSales Open Source` |
| **Description** | `Tenha uma equipe de agentes de IA trabalhando para voce. Mentoria intensiva e pratica com turmas de no maximo 12 pessoas em Florianopolis.` |
| **ogImage** | `/images/mentoria-og.png` |
| **JSON-LD** | Organization + WebSite (global only, nenhum adicional) |
| **URL** | `https://opensource.growthsales.ai/mentoria` |

### 4.3 Mentoria Apresentacao — `/mentoria/apresentacao`

| Campo | Valor |
|-------|-------|
| **Arquivo** | `src/pages/mentoria/apresentacao.astro` |
| **Title** | `Apresentacao: Mentoria Claude Code + AIOX \| GrowthSales Open Source` |
| **Description** | `Programa completo da Mentoria Claude Code + AIOX - Tenha uma equipe de agentes de IA trabalhando para voce` |
| **ogImage** | `/images/og-default.png` (default) |
| **JSON-LD** | Organization + WebSite (global only) |
| **URL** | `https://opensource.growthsales.ai/mentoria/apresentacao` |
| **Extra** | Carrega Reveal.js via CDN |

### 4.4 AIOX Framework — `/framework/aiox-framework`

| Campo | Valor |
|-------|-------|
| **Arquivo** | `src/pages/framework/aiox-framework.astro` |
| **Title** | `AIOX Framework \| GrowthSales Open Source` |
| **Description** | `Sistema de orquestracao de agentes com squads e personas. Defina workflows, delegue tasks e escale sua operacao.` |
| **ogImage** | `/images/og-default.png` (default) |
| **JSON-LD** | Organization + WebSite + BreadcrumbList + SoftwareApplication |
| **URL** | `https://opensource.growthsales.ai/framework/aiox-framework` |

### 4.5 AIOX Monitor — `/monitor/aiox-monitor`

| Campo | Valor |
|-------|-------|
| **Arquivo** | `src/pages/monitor/aiox-monitor.astro` |
| **Title** | `AIOX Monitor \| GrowthSales Open Source` |
| **Description** | `Dashboard isometrico real-time de agentes autonomos. Visualize performance, tasks e metricas de todos os agentes em execucao.` |
| **ogImage** | `/images/og-default.png` (default) |
| **JSON-LD** | Organization + WebSite + BreadcrumbList + SoftwareApplication |
| **URL** | `https://opensource.growthsales.ai/monitor/aiox-monitor` |

### 4.6 Xquads Squads — `/squads/xquads`

| Campo | Valor |
|-------|-------|
| **Arquivo** | `src/pages/squads/xquads.astro` |
| **Title** | `Xquads Squads \| GrowthSales Open Source` |
| **Description** | `12 squads especializadas com 96+ agentes prontos para uso. A maior colecao de squads AIOX da comunidade.` |
| **ogImage** | `/images/og-default.png` (default) |
| **JSON-LD** | Organization + WebSite + BreadcrumbList + SoftwareApplication |
| **URL** | `https://opensource.growthsales.ai/squads/xquads` |

### 4.7 Maestri — `/tools/maestri`

| Campo | Valor |
|-------|-------|
| **Arquivo** | `src/pages/tools/maestri.astro` |
| **Title** | `Maestri \| GrowthSales Open Source` |
| **Description** | `Comunicacao inter-agentes entre terminais. Conecte multiplos Claude Code para colaboracao em tempo real.` |
| **ogImage** | `/images/og-default.png` (default) |
| **JSON-LD** | Organization + WebSite + BreadcrumbList + SoftwareApplication |
| **URL** | `https://opensource.growthsales.ai/tools/maestri` |

### 4.8 Setup Claude Code — `/setup/claude-code`

| Campo | Valor |
|-------|-------|
| **Arquivo** | `src/pages/setup/claude-code.astro` |
| **Title** | `Setup Claude Code \| GrowthSales Open Source` |
| **Description** | `Guia completo de configuracao avancada. Do basico ao expert em Claude Code CLI.` |
| **ogImage** | `/images/og-default.png` (default) |
| **JSON-LD** | Organization + WebSite + BreadcrumbList + SoftwareApplication |
| **URL** | `https://opensource.growthsales.ai/setup/claude-code` |

### 4.9 Cursos Anthropic — `/learn/anthropic-courses`

| Campo | Valor |
|-------|-------|
| **Arquivo** | `src/pages/learn/anthropic-courses.astro` |
| **Title** | `Cursos Anthropic \| GrowthSales Open Source` |
| **Description** | `Curadoria dos 13 cursos gratuitos da Anthropic. Aprenda a construir com Claude.` |
| **ogImage** | `/images/og-default.png` (default) |
| **JSON-LD** | Organization + WebSite + BreadcrumbList + SoftwareApplication |
| **URL** | `https://opensource.growthsales.ai/learn/anthropic-courses` |

### 4.10 Meta Ads com IA — `/learn/meta-ads-ai`

| Campo | Valor |
|-------|-------|
| **Arquivo** | `src/pages/learn/meta-ads-ai.astro` |
| **Title** | `Meta Ads com IA \| GrowthSales Open Source` |
| **Description** | `Automacao de campanhas Meta com agentes. Otimize criativos, copy e targeting automaticamente.` |
| **ogImage** | `/images/og-default.png` (default) |
| **JSON-LD** | Organization + WebSite + BreadcrumbList + SoftwareApplication |
| **URL** | `https://opensource.growthsales.ai/learn/meta-ads-ai` |

### 4.11 Google Ads com IA — `/learn/google-ads-ai`

| Campo | Valor |
|-------|-------|
| **Arquivo** | `src/pages/learn/google-ads-ai.astro` |
| **Title** | `Google Ads com IA \| GrowthSales Open Source` |
| **Description** | `Otimizacao de Google Ads com IA. Performance Max, Search e Display gerenciados por agentes.` |
| **ogImage** | `/images/og-default.png` (default) |
| **JSON-LD** | Organization + WebSite + BreadcrumbList + SoftwareApplication |
| **URL** | `https://opensource.growthsales.ai/learn/google-ads-ai` |

### 4.12 Vercel Deploy — `/skills/vercel`

| Campo | Valor |
|-------|-------|
| **Arquivo** | `src/pages/skills/vercel.astro` |
| **Title** | `Vercel Deploy \| GrowthSales Open Source` |
| **Description** | `Deploy automatizado com Vercel. CI/CD, preview deployments e dominios custom para projetos web.` |
| **ogImage** | `/images/og-default.png` (default) |
| **JSON-LD** | Organization + WebSite + BreadcrumbList + SoftwareApplication |
| **URL** | `https://opensource.growthsales.ai/skills/vercel` |

### 4.13 GitHub — `/skills/github`

| Campo | Valor |
|-------|-------|
| **Arquivo** | `src/pages/skills/github.astro` |
| **Title** | `GitHub \| GrowthSales Open Source` |
| **Description** | `Integracao completa com GitHub. Repositorios, PRs, Issues e Actions para workflow de desenvolvimento.` |
| **ogImage** | `/images/og-default.png` (default) |
| **JSON-LD** | Organization + WebSite + BreadcrumbList + SoftwareApplication |
| **URL** | `https://opensource.growthsales.ai/skills/github` |

### 4.14 Supabase — `/skills/supabase`

| Campo | Valor |
|-------|-------|
| **Arquivo** | `src/pages/skills/supabase.astro` |
| **Title** | `Supabase \| GrowthSales Open Source` |
| **Description** | `Backend open source com PostgreSQL, Auth, Storage e Realtime para aplicacoes modernas.` |
| **ogImage** | `/images/og-default.png` (default) |
| **JSON-LD** | Organization + WebSite + BreadcrumbList + SoftwareApplication |
| **URL** | `https://opensource.growthsales.ai/skills/supabase` |

### 4.15 Social Media Carousel — `/skills/carousel`

| Campo | Valor |
|-------|-------|
| **Arquivo** | `src/pages/skills/carousel.astro` |
| **Title** | `Social Media Carousel \| GrowthSales Open Source` |
| **Description** | `Design de carrosseis multi-slide para Instagram, LinkedIn e Twitter/X com layout rules e hooks.` |
| **ogImage** | `/images/og-default.png` (default) |
| **JSON-LD** | Organization + WebSite + BreadcrumbList + SoftwareApplication |
| **URL** | `https://opensource.growthsales.ai/skills/carousel` |

### 4.16 Graphic Designer — `/skills/graphic-designer`

| Campo | Valor |
|-------|-------|
| **Arquivo** | `src/pages/skills/graphic-designer.astro` |
| **Title** | `Graphic Designer \| GrowthSales Open Source` |
| **Description** | `Design de thumbnails, social media, banners e apresentacoes com principios CRAP e Gestalt.` |
| **ogImage** | `/images/og-default.png` (default) |
| **JSON-LD** | Organization + WebSite + BreadcrumbList + SoftwareApplication |
| **URL** | `https://opensource.growthsales.ai/skills/graphic-designer` |

### 4.17 AI Image Generation — `/skills/ai-image`

| Campo | Valor |
|-------|-------|
| **Arquivo** | `src/pages/skills/ai-image.astro` |
| **Title** | `AI Image Generation \| GrowthSales Open Source` |
| **Description** | `Gere imagens com IA usando 50+ modelos. FLUX, Gemini, Grok, Seedream e mais via inference.sh CLI.` |
| **ogImage** | `/images/og-default.png` (default) |
| **JSON-LD** | Organization + WebSite + BreadcrumbList + SoftwareApplication |
| **URL** | `https://opensource.growthsales.ai/skills/ai-image` |

### 4.18 AI Video Generation — `/skills/ai-video`

| Campo | Valor |
|-------|-------|
| **Arquivo** | `src/pages/skills/ai-video.astro` |
| **Title** | `AI Video Generation \| GrowthSales Open Source` |
| **Description** | `Gere videos com IA usando 40+ modelos. Veo 3.1, Seedance, Wan 2.5, Grok e mais via inference.sh CLI.` |
| **ogImage** | `/images/og-default.png` (default) |
| **JSON-LD** | Organization + WebSite + BreadcrumbList + SoftwareApplication |
| **URL** | `https://opensource.growthsales.ai/skills/ai-video` |

---

## 5. Sitemap — URLs Completas

O sitemap e gerado automaticamente pelo `@astrojs/sitemap` em `sitemap-index.xml`. Todas as 18 paginas abaixo serao incluidas:

| # | URL | Priority |
|---|-----|----------|
| 1 | `/` | Homepage |
| 2 | `/mentoria` | Landing page |
| 3 | `/mentoria/apresentacao` | Subpage |
| 4 | `/framework/aiox-framework` | Product |
| 5 | `/monitor/aiox-monitor` | Product |
| 6 | `/squads/xquads` | Product |
| 7 | `/tools/maestri` | Product |
| 8 | `/setup/claude-code` | Guide |
| 9 | `/learn/anthropic-courses` | Guide |
| 10 | `/learn/meta-ads-ai` | Guide |
| 11 | `/learn/google-ads-ai` | Guide |
| 12 | `/skills/vercel` | Integration |
| 13 | `/skills/github` | Integration |
| 14 | `/skills/supabase` | Integration |
| 15 | `/skills/carousel` | Skill |
| 16 | `/skills/graphic-designer` | Skill |
| 17 | `/skills/ai-image` | Skill |
| 18 | `/skills/ai-video` | Skill |

**Next.js action**: Implementar via `app/sitemap.ts` retornando array com todas as URLs.

---

## 6. Assets Criticos de SEO

### Imagens

| Asset | Usado em |
|-------|----------|
| `/favicon.svg` | Global (BaseLayout) |
| `/logo.svg` | Header, Footer, JSON-LD Organization |
| `/images/og-default.png` | OG image default (1200x630) |
| `/images/mentoria-og.png` | OG image mentoria |
| `/images/mentoria-hero.png` | Hero mentoria |
| `/images/claude-logo.png` | Footer badge |
| `/images/claude-code-logo.png` | Footer badge |
| `/images/bg-*.png` | Background images por pagina |

### Social Profiles (JSON-LD sameAs)

- GitHub: `https://github.com/SynkraAI`
- LinkedIn: `https://linkedin.com/company/growthsales-ai`
- Twitter/X: `https://twitter.com/growthsales_ai`

---

## 7. Checklist de Migracao Next.js

### Global Layout (`app/layout.tsx`)

- [ ] `<html lang="pt-BR">`
- [ ] Meta charset, viewport, robots
- [ ] Title template: `%s | GrowthSales Open Source`
- [ ] Default description
- [ ] Canonical URL dinamico via `metadata.alternates.canonical`
- [ ] OG tags com defaults (`metadata.openGraph`)
- [ ] Twitter card tags (`metadata.twitter`)
- [ ] JSON-LD Organization (via `<script>` no layout)
- [ ] JSON-LD WebSite (via `<script>` no layout)
- [ ] Google Fonts via `next/font` (Inter + Geist Mono)
- [ ] Favicon SVG

### Por Pagina (`page.tsx`)

- [ ] Export `metadata` ou `generateMetadata()` com title + description
- [ ] ogImage custom quando aplicavel (mentoria)
- [ ] JSON-LD BreadcrumbList para paginas de skill/tool
- [ ] JSON-LD SoftwareApplication para paginas de skill/tool

### Infra SEO

- [ ] `app/sitemap.ts` — gerar sitemap dinamico com todas as 18 URLs
- [ ] `public/robots.txt` ou `app/robots.ts`
- [ ] Verificar que todas as URLs mantem o mesmo path (sem trailing slash inconsistente)
- [ ] Redirects de URLs antigas se houver mudanca de estrutura
- [ ] Testar OG image rendering (verificar resolucao de URLs absolutas)

### Itens NAO existentes no projeto atual (oportunidades)

- [ ] hreflang tags (nao necessario — site single-language pt-BR)
- [ ] Meta `author` por pagina
- [ ] JSON-LD especifico para mentoria (Event/Course schema)
- [ ] OG images customizadas por pagina de skill (todas usam default)
- [ ] `<meta name="theme-color">` para mobile
- [ ] Structured data FAQ para paginas que poderiam se beneficiar

---

## 8. Resumo Executivo

| Metrica | Valor |
|---------|-------|
| **Total de paginas** | 18 |
| **Paginas com SkillPage (JSON-LD extra)** | 15 |
| **Paginas sem JSON-LD extra** | 3 (index, mentoria, apresentacao) |
| **OG images custom** | 1 (mentoria) |
| **OG images default** | 17 |
| **Structured data types** | Organization, WebSite, BreadcrumbList, SoftwareApplication |
| **Language** | pt-BR (single) |
| **hreflang** | Nenhum |
| **Canonical** | Sim (todas as paginas) |
| **Twitter cards** | summary_large_image (todas) |
| **robots.txt** | Allow all + sitemap |
| **Sitemap** | Auto-gerado via @astrojs/sitemap |

---

*Sahadeva saw every tag before the crawler did.*
