# opensource.growthsales.ai — Architecture Plan

> Portal open source para distribuir ferramentas do João Ramos.
> Frontend-only, SSG, deploy Vercel.

---

## 1. Tech Stack

### Core Framework

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | Astro 5.x | SSG perfeito para content sites, zero JS by default, partial hydration, melhor performance que Next.js para este caso |
| **Content** | MDX + Content Collections | Type-safe, frontmatter validation, componentes em markdown |
| **Styling** | Tailwind CSS 4.x | Utility-first, tree-shaking, design system nativo |
| **Icons** | Lucide React | Consistente, tree-shakeable, 1000+ icons |
| **Fonts** | Inter (variable) | Self-hosted via Fontsource, zero CLS |

### Build & Deploy

| Tool | Purpose |
|------|---------|
| **Vercel** | Deploy automático, Edge Functions, Analytics |
| **pnpm** | Package manager (mais rápido, disk-efficient) |
| **TypeScript** | Type safety across MDX and components |

### Performance Stack

| Feature | Implementation |
|---------|----------------|
| **Images** | `@astrojs/image` com WebP/AVIF auto |
| **Prefetch** | `prefetch` nativo do Astro |
| **Compression** | Brotli via Vercel |
| **Critical CSS** | Inline automático pelo Astro |

---

## 2. Estrutura de Pastas

```
opensource.growthsales.ai/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD Vercel
├── public/
│   ├── favicon.svg
│   ├── og-image.png            # Default OG image
│   ├── robots.txt
│   └── assets/
│       ├── logos/              # Product logos
│       └── screenshots/        # Product screenshots
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Navigation.astro
│   │   │   ├── ThemeToggle.astro
│   │   │   └── SEOHead.astro
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── Badge.astro
│   │   │   ├── Tag.astro
│   │   │   ├── CodeBlock.astro
│   │   │   └── CopyButton.astro
│   │   ├── content/
│   │   │   ├── ProductCard.astro
│   │   │   ├── FeatureGrid.astro
│   │   │   ├── InstallSteps.astro
│   │   │   ├── GitHubStats.astro
│   │   │   └── CategoryHeader.astro
│   │   └── sections/
│   │       ├── Hero.astro
│   │       ├── ProductGrid.astro
│   │       ├── Newsletter.astro
│   │       └── CallToAction.astro
│   ├── content/
│   │   ├── config.ts           # Content Collections config
│   │   ├── monitor/
│   │   │   └── aiox-monitor.mdx
│   │   ├── framework/
│   │   │   └── aiox-framework.mdx
│   │   ├── tools/
│   │   │   └── maestri.mdx
│   │   ├── skills/
│   │   │   └── skills-pack.mdx
│   │   ├── setup/
│   │   │   └── claude-code-setup.mdx
│   │   ├── learn/
│   │   │   ├── meta-ads-ai.mdx
│   │   │   ├── google-ads-ai.mdx
│   │   │   └── anthropic-courses.mdx
│   │   └── repos/
│   │       └── all-repos.mdx
│   ├── layouts/
│   │   ├── BaseLayout.astro    # HTML shell, SEO, fonts
│   │   ├── PageLayout.astro    # Header + Footer wrapper
│   │   ├── ProductLayout.astro # Product detail pages
│   │   └── CategoryLayout.astro # Category listing pages
│   ├── pages/
│   │   ├── index.astro         # Homepage
│   │   ├── [...slug].astro     # Dynamic MDX pages
│   │   ├── monitor/
│   │   │   └── [...slug].astro
│   │   ├── framework/
│   │   │   └── [...slug].astro
│   │   ├── tools/
│   │   │   └── [...slug].astro
│   │   ├── skills/
│   │   │   └── [...slug].astro
│   │   ├── setup/
│   │   │   └── [...slug].astro
│   │   ├── learn/
│   │   │   └── [...slug].astro
│   │   └── repos/
│   │       └── index.astro
│   ├── styles/
│   │   └── global.css          # Tailwind + custom utilities
│   ├── utils/
│   │   ├── seo.ts              # SEO helpers
│   │   └── github.ts           # GitHub API helpers (build-time)
│   └── types/
│       └── content.ts          # TypeScript types
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── vercel.json
```

---

## 3. Rotas/Páginas

### URL Structure

```
/                              → Homepage (hero + product grid)
/monitor/                      → Monitor category index
/monitor/aiox-monitor          → AIOX Monitor product page
/framework/                    → Framework category index
/framework/aiox-framework      → AIOX Framework product page
/tools/                        → Tools category index
/tools/maestri                 → Maestri product page
/skills/                       → Skills category index
/skills/aiox-skills            → Skills Pack product page
/setup/                        → Setup category index
/setup/claude-code             → Setup Guide product page
/learn/                        → Learn category index
/learn/meta-ads-ai             → Meta Ads AI product page
/learn/google-ads-ai           → Google Ads AI product page
/learn/anthropic-courses       → Anthropic Courses page
/repos/                        → All repositories listing
```

### Page Types

| Type | Template | Content |
|------|----------|---------|
| **Homepage** | `index.astro` | Hero + Featured products + Categories |
| **Category Index** | `CategoryLayout.astro` | Category header + Product cards |
| **Product Detail** | `ProductLayout.astro` | Full product info from MDX |
| **Repos Listing** | Custom | Grid of all GitHub repos |

---

## 4. Componentes

### Design Components Hierarchy

```
BaseLayout.astro
└── SEOHead.astro (meta tags, structured data)
└── PageLayout.astro
    ├── Header.astro
    │   ├── Navigation.astro
    │   └── ThemeToggle.astro (dark mode toggle)
    ├── [Page Content]
    └── Footer.astro

ProductLayout.astro (extends PageLayout)
├── CategoryHeader.astro
├── [MDX Content]
│   ├── FeatureGrid.astro
│   ├── InstallSteps.astro
│   ├── CodeBlock.astro
│   └── GitHubStats.astro
└── CallToAction.astro

CategoryLayout.astro (extends PageLayout)
├── CategoryHeader.astro
└── ProductGrid.astro
    └── ProductCard.astro
        ├── Badge.astro
        └── Tag.astro
```

### Component Specifications

#### `ProductCard.astro`
```typescript
interface Props {
  title: string;
  description: string;
  category: string;
  href: string;
  icon?: string;
  tags?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  githubUrl?: string;
  stars?: number;
}
```

#### `InstallSteps.astro`
```typescript
interface Props {
  steps: Array<{
    title: string;
    code?: string;
    description?: string;
  }>;
}
```

#### `GitHubStats.astro`
```typescript
interface Props {
  repo: string;  // "owner/repo"
  showStars?: boolean;
  showForks?: boolean;
  showIssues?: boolean;
}
```

---

## 5. Design System

### Color Palette

```css
:root {
  /* Background */
  --bg-primary: #08080C;
  --bg-secondary: #0D0D12;
  --bg-tertiary: #121218;
  --bg-elevated: #1A1A22;

  /* Accent */
  --accent-primary: #FF4500;
  --accent-hover: #FF5722;
  --accent-muted: rgba(255, 69, 0, 0.15);

  /* Text */
  --text-primary: #FFFFFF;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-muted: rgba(255, 255, 255, 0.5);
  --text-subtle: rgba(255, 255, 255, 0.35);

  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-default: rgba(255, 255, 255, 0.12);
  --border-accent: rgba(255, 69, 0, 0.3);

  /* Status */
  --success: #22C55E;
  --warning: #EAB308;
  --error: #EF4444;
}
```

### Typography

```css
/* Font Family */
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Font Sizes (fluid) */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
--text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
--text-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem);
--text-5xl: clamp(3rem, 2rem + 5vw, 4.5rem);

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;

/* Line Heights */
--leading-tight: 1.1;
--leading-snug: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
```

### Spacing Scale

```css
/* 8px base grid */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.4);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.5);
--shadow-glow: 0 0 20px rgba(255, 69, 0, 0.3);
```

### Tailwind Config

```javascript
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#08080C',
          secondary: '#0D0D12',
          tertiary: '#121218',
          elevated: '#1A1A22',
        },
        accent: {
          DEFAULT: '#FF4500',
          hover: '#FF5722',
          muted: 'rgba(255, 69, 0, 0.15)',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          DEFAULT: 'rgba(255, 255, 255, 0.12)',
          accent: 'rgba(255, 69, 0, 0.3)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

---

## 6. SEO Strategy

### Meta Tags Structure

```typescript
// src/utils/seo.ts
interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean;
  structuredData?: object;
}

// Default values
const defaults = {
  siteName: 'GrowthSales Open Source',
  siteUrl: 'https://opensource.growthsales.ai',
  defaultOgImage: '/og-image.png',
  twitterHandle: '@joaoguirunas',
  locale: 'pt_BR',
}
```

### Structured Data (JSON-LD)

#### Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GrowthSales",
  "url": "https://opensource.growthsales.ai",
  "logo": "https://opensource.growthsales.ai/logo.png",
  "sameAs": [
    "https://github.com/joaoguirunas",
    "https://linkedin.com/in/joaoguirunas",
    "https://twitter.com/joaoguirunas"
  ]
}
```

#### SoftwareApplication Schema (per product)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AIOX Monitor",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Cross-platform",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Person",
    "name": "João Ramos"
  }
}
```

### Content Collection Schema

```typescript
// src/content/config.ts
import { z, defineCollection } from 'astro:content';

const productSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum(['monitor', 'framework', 'tools', 'skills', 'setup', 'learn']),
  icon: z.string().optional(),
  tags: z.array(z.string()).default([]),
  githubUrl: z.string().url().optional(),
  docsUrl: z.string().url().optional(),
  status: z.enum(['stable', 'beta', 'alpha', 'coming-soon']).default('stable'),
  featured: z.boolean().default(false),
  publishedAt: z.date(),
  updatedAt: z.date().optional(),
  ogImage: z.string().optional(),
  // SEO
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  keywords: z.array(z.string()).default([]),
});

export const collections = {
  monitor: defineCollection({ type: 'content', schema: productSchema }),
  framework: defineCollection({ type: 'content', schema: productSchema }),
  tools: defineCollection({ type: 'content', schema: productSchema }),
  skills: defineCollection({ type: 'content', schema: productSchema }),
  setup: defineCollection({ type: 'content', schema: productSchema }),
  learn: defineCollection({ type: 'content', schema: productSchema }),
};
```

### robots.txt

```
User-agent: *
Allow: /

Sitemap: https://opensource.growthsales.ai/sitemap.xml
```

### Sitemap

Astro generates automatically with `@astrojs/sitemap` integration.

---

## 7. Deploy

### Vercel Configuration

```json
// vercel.json
{
  "framework": "astro",
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "redirects": [
    { "source": "/github", "destination": "https://github.com/joaoguirunas", "permanent": false }
  ]
}
```

### GitHub Actions CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - run: pnpm astro check
```

### Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| **LCP** | < 1.2s | Lighthouse |
| **FID** | < 50ms | Lighthouse |
| **CLS** | < 0.05 | Lighthouse |
| **TTI** | < 1.5s | Lighthouse |
| **Bundle Size** | < 50KB JS | bundlephobia |
| **Lighthouse Score** | > 95 | Lighthouse |

### Domain Setup

```
opensource.growthsales.ai → Vercel
                          → CDN Edge (automatic)
                          → SSL (automatic)
```

---

## 8. Implementation Phases

### Phase 1: Foundation (Day 1)
- [ ] Initialize Astro project with pnpm
- [ ] Configure Tailwind CSS with design tokens
- [ ] Create BaseLayout and PageLayout
- [ ] Setup Content Collections schema
- [ ] Configure SEO utilities

### Phase 2: Components (Day 1-2)
- [ ] Build Header, Footer, Navigation
- [ ] Create ProductCard, Badge, Tag
- [ ] Build CodeBlock with syntax highlighting
- [ ] Create InstallSteps component
- [ ] Build FeatureGrid component

### Phase 3: Content (Day 2-3)
- [ ] Write MDX for all 8 products
- [ ] Create category index pages
- [ ] Build homepage with hero
- [ ] Add screenshots and logos

### Phase 4: Polish (Day 3)
- [ ] Add animations (fade-in, slide-up)
- [ ] Implement dark mode toggle
- [ ] Add GitHub stars fetching (build-time)
- [ ] Optimize images with @astrojs/image

### Phase 5: Deploy (Day 3)
- [ ] Configure Vercel project
- [ ] Setup domain DNS
- [ ] Test performance (Lighthouse)
- [ ] Launch

---

## 9. Content Structure Example

### MDX Frontmatter Example

```yaml
---
title: "AIOX Monitor"
description: "Interface visual real-time para agentes Claude Code"
category: "monitor"
icon: "monitor"
tags: ["claude-code", "monitoring", "real-time", "dashboard"]
githubUrl: "https://github.com/joaoguirunas/aiox-monitor"
docsUrl: "https://docs.growthsales.ai/monitor"
status: "stable"
featured: true
publishedAt: 2024-01-15
ogImage: "/assets/screenshots/aiox-monitor-og.png"
seoTitle: "AIOX Monitor - Dashboard Real-Time para Claude Code"
seoDescription: "Monitore seus agentes Claude Code em tempo real com interface visual isométrica. Open source, MIT license."
keywords: ["aiox", "monitor", "claude code", "dashboard", "real-time"]
---
```

---

## 10. Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Framework** | Astro over Next.js | Zero JS by default, better for static content sites, faster builds |
| **Styling** | Tailwind over CSS Modules | Rapid development, consistent design system, tree-shaking |
| **Content** | MDX over Markdown | Component support in content, better DX |
| **Package Manager** | pnpm over npm | Faster, disk-efficient, monorepo-ready |
| **Dark Mode** | Always dark | Brand consistency, premium feel, reduces complexity |
| **GitHub Stats** | Build-time fetch | Avoids rate limits, faster page loads, SSG-compatible |

---

*— Aria, arquitetando o futuro 🏗️*
