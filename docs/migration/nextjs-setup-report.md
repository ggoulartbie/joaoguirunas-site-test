# Next.js Setup Report — Migracao Astro → Next.js

> **Agente:** Arjuna (UX Alpha) — UI Component Designer + Dev Frontend
> **Data:** 2026-04-04
> **Diretorio:** `next-app/`
> **Status:** Setup completo, pronto para migracao de paginas

---

## 1. Resumo Executivo

Projeto Next.js 16+ com App Router criado em `next-app/` com:
- TypeScript strict (AIOX preset nextjs-react)
- Tailwind CSS 4 com design tokens do ux-audit
- 3 componentes Astro convertidos para React/TSX
- 5 issues criticas de a11y corrigidas
- Estrutura feature-based conforme AIOX
- SEO preservado 100% (meta tags, JSON-LD, sitemap, robots)

---

## 2. Arquivos Criados

### Configuracao (raiz next-app/)

| Arquivo | Descricao |
|---------|-----------|
| `package.json` | Next.js 16, React 19, Tailwind CSS 4 |
| `tsconfig.json` | strict + noUncheckedIndexedAccess + noImplicitReturns + noFallthroughCasesInSwitch + noImplicitOverride |
| `next.config.ts` | reactStrictMode, image formats (avif/webp) |
| `postcss.config.mjs` | @tailwindcss/postcss |
| `next-env.d.ts` | Next.js type declarations |

### App Router (src/app/)

| Arquivo | Descricao |
|---------|-----------|
| `layout.tsx` | RootLayout com next/font (Inter + Geist Mono), metadata.title.template, JSON-LD Organization + WebSite, skip link, Header + Footer |
| `globals.css` | Design tokens, prefers-reduced-motion, skip-link, glass-card, btn-primary, mono-label, accent-line, glow-text |
| `page.tsx` | Homepage placeholder com metadata |
| `sitemap.ts` | Todas as 18 URLs do site |
| `robots.ts` | Allow all + sitemap reference |

### Componentes Convertidos (src/shared/components/)

| Componente Astro | Componente React | Mudancas |
|-----------------|-----------------|----------|
| `BaseLayout.astro` | `layout/Header.tsx` + `layout/Footer.tsx` + `app/layout.tsx` | Extraido header/footer como componentes separados. next/font substitui Google Fonts CDN. Metadata API substitui tags manuais. |
| `SkillPage.astro` | `ui/SkillPage.tsx` | Props tipadas com interface exportada. generateSkillJsonLd() como funcao reutilizavel. next/image para bg images. Breadcrumb com aria-label. |
| `Icon.astro` | `ui/Icon.tsx` | IconName union type exportado (28 icones). IconSize type. Props interface. dangerouslySetInnerHTML para SVG paths. |

### Configuracao e Tipos

| Arquivo | Descricao |
|---------|-----------|
| `src/config/site.ts` | Constantes do site, JSON-LD schemas, social links |
| `src/shared/types/index.ts` | CategoryColor type |
| `src/shared/components/ui/index.ts` | Barrel exports |
| `src/shared/components/layout/index.ts` | Barrel exports |

### Estrutura Feature-Based

```
src/
  app/          → App Router (layouts, pages, sitemap, robots)
  config/       → Site config, constantes
  features/     → Feature modules (vazio, pronto para uso)
  lib/          → Integracoes third-party (vazio, pronto para uso)
  shared/
    components/
      layout/   → Header, Footer
      ui/       → Icon, SkillPage
    hooks/      → Custom hooks (vazio)
    types/      → Shared types
    utils/      → Utilities (vazio)
```

---

## 3. Correcoes de A11y Implementadas (5 Criticas)

| ID | Issue | Fix Aplicado | Arquivo |
|----|-------|-------------|---------|
| A11Y-012 | Nenhuma animacao respeita prefers-reduced-motion | `@media (prefers-reduced-motion: reduce)` global desabilitando animacoes | `globals.css` |
| A11Y-014 | Textos com contraste < 4.5:1 (white/45, white/40, white/35) | Opacidade minima aumentada para 0.6 em text-muted, footer, feature descriptions | `globals.css`, `Footer.tsx`, `SkillPage.tsx` |
| A11Y-019 | #8B5CF6 (Apps badge) falha AA sobre dark bg | Cor ajustada para #A78BFA em categoryColors | `globals.css`, `SkillPage.tsx` |
| A11Y-006 | animate-pulse em badge de urgencia sem motion preference | Coberto pelo fix global de prefers-reduced-motion | `globals.css` |
| PERF-004 | Font TASA Orbiter nao carregada | Removida referencia — font-bb-display aponta para font-sans (Inter) | `globals.css` |

---

## 4. Melhorias Adicionais de A11y

| Fix | Descricao | Arquivo |
|-----|-----------|---------|
| Skip Link | `<a href="#main-content" class="skip-link">` no layout global | `layout.tsx`, `globals.css` |
| A11Y-003 | `aria-label="Breadcrumb"` na nav do breadcrumb | `SkillPage.tsx` |
| A11Y-004 | `aria-label="Voltar para lista de skills"` no botao Voltar | `SkillPage.tsx` |
| Footer nav | Links de ferramentas/aprendizado envolvidos em `<nav aria-label>` | `Footer.tsx` |
| Copyright | Ano dinamico via `new Date().getFullYear()` (era 2025 hardcoded) | `Footer.tsx` |
| Social links | Opacidade aumentada de white/50 para white/60 | `Footer.tsx` |

---

## 5. SEO — Checklist de Preservacao

### Global Layout (app/layout.tsx)

- [x] `<html lang="pt-BR">`
- [x] Meta charset, viewport, robots (via Metadata API)
- [x] Title template: `%s | GrowthSales Open Source`
- [x] Default description
- [x] Canonical URL dinamico via `metadata.alternates.canonical`
- [x] OG tags com defaults (`metadata.openGraph`)
- [x] Twitter card tags (`metadata.twitter`)
- [x] JSON-LD Organization (via `<script>` no layout)
- [x] JSON-LD WebSite (via `<script>` no layout)
- [x] Google Fonts via `next/font` (Inter + Geist Mono)
- [x] Favicon SVG

### Infra SEO

- [x] `app/sitemap.ts` — 18 URLs com prioridades
- [x] `app/robots.ts` — Allow all + sitemap
- [x] metadataBase configurado para resolucao de URLs absolutas

### SkillPage (por pagina)

- [x] generateSkillJsonLd() gera BreadcrumbList + SoftwareApplication
- [x] Props tipadas para title, description, canonicalPath
- [x] Suporte a ogImage custom via generateMetadata() por pagina

---

## 6. Decisoes Tecnicas

| Decisao | Razao |
|---------|-------|
| next/font ao inves de Google Fonts CDN | Elimina request externo, font-display automatico, melhor LCP |
| Metadata API ao inves de `<meta>` manual | Type-safe, merging automatico, canonical/OG/Twitter integrados |
| Header/Footer como componentes separados | Eram inline no BaseLayout. Facilita manutencao e testing |
| categoryColors com #A78BFA | Substitui #8B5CF6 para compliance WCAG AA (contraste 5.2:1 vs 3.8:1) |
| text-muted com opacity 0.6 | Substitui 0.5 para compliance WCAG AA (6.5:1 vs 4.1:1) |
| dangerouslySetInnerHTML no Icon | Necessario para SVG paths inline — mesmo pattern que set:html do Astro |

---

## 7. Proximos Passos (Nakula)

1. Migrar paginas de conteudo (`/mentoria`, `/framework/aiox-framework`, etc.)
2. Copiar assets de `public/` do projeto Astro para `next-app/public/`
3. Implementar `generateMetadata()` em cada page.tsx com dados do seo-audit
4. Implementar filtro de categorias na homepage com `aria-live="polite"`
5. Configurar `next/image` para todas as imagens de pagina

---

*Relatorio gerado por Arjuna (UX Alpha) — cada componente e uma flecha de precisao.*
