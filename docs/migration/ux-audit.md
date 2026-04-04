# UX & Accessibility Audit — Baseline para Migração Astro → Next.js

> **Auditora:** Kunti (UX Delta) — UX Research + Accessibility + Dev Frontend
> **Data:** 2026-04-04
> **Projeto:** GrowthSales Open Source (opensource.growthsales.ai)
> **Stack atual:** Astro + Tailwind CSS v4 + Google Fonts (Inter + Geist Mono)
> **Total de páginas auditadas:** 18

---

## Sumário Executivo

O site é um catálogo de ferramentas open source com foco em conversão para mentoria. Design brutalist/enterprise com tema escuro. A estrutura geral é sólida, mas há problemas significativos de acessibilidade (hierarquia de headings, contraste em textos secundários, falta de skip links, formulários inacessíveis via iframe) e oportunidades de CRO na página de mentoria.

### Nota Geral de Acessibilidade: 6.5/10

| Critério | Nota | Prioridade |
|----------|------|------------|
| Hierarquia de Headings | 5/10 | ALTA |
| Contraste de Cores | 6/10 | ALTA |
| Navegação por Teclado | 7/10 | MÉDIA |
| Alt Texts em Imagens | 8/10 | BAIXA |
| Responsividade Mobile | 8/10 | BAIXA |
| Performance de Loading | 5/10 | ALTA |
| Semântica HTML | 7/10 | MÉDIA |
| ARIA & Screen Readers | 6/10 | ALTA |

---

## 1. Auditoria por Página

### 1.1 Homepage (`/`)

**Headings:**
- `h1`: "Open Source Skills" (dentro do hero)
- `h2`: "Tudo o que você precisa para escalar com IA" (seção skills)
- `h3`: Títulos dos cards de skills (18 cards)
- `h2`: "Desenvolvido por quem trabalha com agentes todos os dias" (about)
- `h2`: "Pronto para escalar com a gente?" (CTA)
- `h4`: "Ferramentas" e "Aprender" (footer)
- **Problema:** `h4` no footer sem `h3` precedente (skip de nível)

**Imagens & Alt Texts:**
- Hero: `alt="Equipe GrowthSales AI trabalhando com agentes autônomos e inteligência artificial"` — BOM
- CTA: `alt="Equipe GrowthSales trabalhando com inteligência artificial"` — BOM
- Logo: `alt="Logo GrowthSales AI"` — BOM
- Claude logos: `alt="Logo Claude AI"`, `alt="Logo Claude Code"` — BOM
- SVG icons nos cards: sem alt (correto, são decorativos)

**Interatividade:**
- Filtro de categorias via JavaScript (buttons com `data-filter`)
- Smooth scroll para anchors (`#skills`)
- Cards são links clicáveis (`<a>` tags) — BOM para a11y

**Issues:**
- [A11Y-001] Filtro de categorias não anuncia mudança para screen readers (falta `aria-live`)
- [A11Y-002] Badges "NEW" / "FEATURED" são puramente visuais, sem `aria-label`
- [PERF-001] Hero image `hero-ultrawide.png` carrega sem `loading="lazy"` (above-the-fold, ok)
- [PERF-002] CTA image `cta-team.png` sem `loading="lazy"` (below-the-fold, deveria ter)

---

### 1.2 Páginas de Skills (SkillPage component)

**Páginas que usam este template (14 páginas):**
- `/framework/aiox-framework`
- `/monitor/aiox-monitor`
- `/tools/maestri`
- `/squads/xquads`
- `/setup/claude-code`
- `/learn/anthropic-courses`
- `/learn/google-ads-ai`
- `/learn/meta-ads-ai`
- `/skills/ai-image`
- `/skills/ai-video`
- `/skills/carousel`
- `/skills/graphic-designer`
- `/skills/github`
- `/skills/supabase`
- `/skills/vercel`

**Headings (padrão em todas):**
- `h1`: Título da skill (hero)
- `h2`: Título repetido (seção "O que é") — **Redundância**
- `h2`: "Principais recursos" (seção features)
- `h3`: Títulos dos feature cards
- `h2`: "Comece agora" (CTA final)
- `h2`: "Como instalar" (quando presente, ex: framework, monitor)
- **Problema:** Dois `h2` com o mesmo título da skill é redundante

**Imagens & Alt Texts:**
- Background images: `alt=""` — CORRETO (decorativas)
- Author GitHub icon: SVG inline sem alt — CORRETO (decorativo, link tem texto)

**Breadcrumb:**
- Implementado como `<nav>` + `<ol>` com schema.org BreadcrumbList
- **BOM:** Semântica correta
- **Issue:** Falta `aria-label="Breadcrumb"` na `<nav>`

**Issues comuns:**
- [A11Y-003] Breadcrumb `<nav>` sem `aria-label`
- [A11Y-004] Botão "Voltar" (`/#skills`) — sem `aria-label` descritivo
- [PERF-003] Background images sem `loading="lazy"` em páginas internas
- [A11Y-005] Code blocks (instalação) não têm `role="code"` ou `<code>` wrapper no bloco

---

### 1.3 Mentoria (`/mentoria`)

**Headings:**
- `h1`: "Tenha uma Equipe de Agentes de IA Trabalhando Para Você 24/7"
- `h2`: "Você sabe que IA é o futuro..." (problema)
- `h2`: "Imagine ter uma equipe de especialistas..." (solução)
- `h2`: "Do Zero ao Time Completo em 8 Semanas" (como funciona)
- `h3`: Títulos de cada um dos 8 encontros
- `h3`: "Gostou da metodologia?" (CTA intermediário)
- `h2`: "Não É Mais Um Curso Online..." (diferenciais)
- `h3`: Títulos dos 4 cards de diferenciais
- Mais seções abaixo (facilitadores, pricing, FAQ, etc.)

**Issues CRÍTICAS:**
- [A11Y-006] Badge "Restam somente 4 vagas" tem `animate-pulse` — pode causar desconforto em pessoas com sensibilidade a movimento. Falta `prefers-reduced-motion` media query
- [A11Y-007] A página usa CSS custom properties diferentes do global.css (`--bb-*` com oklch) — design system inconsistente
- [A11Y-008] CTAs apontam para formulário externo Revos (iframe) — sem fallback se JS/iframe falhar
- [A11Y-009] Estrutura h3 → h2 em "Gostou da metodologia?" — skip invertido
- [CRO-001] Múltiplos CTAs competem pela atenção (5+ botões "Fale com Especialista" / "Quero Participar")
- [CRO-002] Badge de urgência ("4 vagas") é estático no HTML — não é dinâmico/real

**Imagens:**
- Hero: `alt="Mentoria Claude Code + AIOX"` — genérico, poderia ser mais descritivo
- Facilitadores: `claudia-guirunas.png`, `joao-guirunas-profile.jpg` — verificar alt texts

**Tipografia especial:**
- Usa `--font-bb-display: 'TASA Orbiter'` — **NÃO está sendo carregada via Google Fonts ou local**
- Fallback: `system-ui, sans-serif` — fonte display não renderiza como esperado
- [PERF-004] Font TASA Orbiter não declarada no `<link>` — cai no fallback

---

### 1.4 Apresentação (`/mentoria/apresentacao`)

**Estrutura:**
- Usa Reveal.js (CDN) para slides
- Headings dentro de `<section>` slides: `h1`, `h2`, `h3`, `h4`
- **Problema:** Reveal.js carrega CSS/JS de CDN externo sem fallback
- **Problema:** Navegação por teclado depende 100% do Reveal.js

**Issues:**
- [A11Y-010] Slides não são acessíveis para screen readers sem Reveal.js a11y plugin
- [PERF-005] Reveal.js carrega ~200KB de CSS+JS do CDN
- [A11Y-011] Nenhum alt text nos slides (conteúdo é todo textual, ok)

---

## 2. Componentes de UI Existentes

### 2.1 Inventário de Componentes

| Componente | Arquivo | Usado em | Variantes |
|-----------|---------|----------|-----------|
| **BaseLayout** | `src/layouts/BaseLayout.astro` | Todas as páginas | Single variant |
| **SkillPage** | `src/components/SkillPage.astro` | 14 skill pages | Com/sem bgImage, com/sem author |
| **Icon** | `src/components/icons/Icon.astro` | mentoria, skills | 28 ícones, 4 tamanhos (16/24/32/48) |
| **Header** (inline) | BaseLayout.astro:77-113 | Global | Desktop + Mobile CTA |
| **Footer** (inline) | BaseLayout.astro:121-184 | Global | Single variant |
| **Hero - Home** | index.astro:199-257 | Homepage | Full-width image |
| **Hero - Skill** | SkillPage.astro:86-190 | Skill pages | Com/sem background image |
| **Hero - Mentoria** | mentoria.astro:64-128 | Mentoria | Custom design, urgency badge |
| **Card - Skill** | index.astro:299-348 | Homepage grid | Category color, featured/new badge |
| **Card - Glass** | global.css `.glass-card` | Skills, mentoria | Hover glow effect |
| **Card - Encontro** | mentoria.astro:255-542 | Mentoria | Presencial (orange) + Online (blue) |
| **Card - Diferencial** | mentoria.astro:577-649 | Mentoria | 4 variants with SVG icons |
| **Button - Primary** | global.css `.btn-primary` | Global | Mono, uppercase, brutalist |
| **Button - Secondary** | Inline styles | Various | Ghost/outline style |
| **Badge - Category** | SkillPage + index | Skills | 6 color variants |
| **Badge - Urgency** | mentoria.astro:81-88 | Mentoria | Animated pulse |
| **Badge - "Open Source"** | index.astro:215-221 | Homepage | Ping animation |
| **Breadcrumb** | SkillPage.astro:102-109 | Skill pages | Mono, uppercase |
| **Code Block** | aiox-framework.astro:65-79 | Framework, Monitor | Dark bg, mono text |
| **Accent Line** | global.css `.accent-line` | Various | Gradient separator |
| **Stats Grid** | index.astro:398-417 | Homepage | 2x2 grid |
| **Filter Buttons** | index.astro:278-294 | Homepage | Active/inactive states |
| **Social Links** | BaseLayout.astro:172-181 | Footer | GitHub, LinkedIn, Twitter/X |

### 2.2 Componentes Ausentes (oportunidade para Next.js)

- **Skip Link** — Não existe
- **Back to Top** — Não existe
- **Mobile Menu** — Não existe (header tem apenas logo + CTA)
- **Search** — Não existe
- **Toast/Notification** — Não existe
- **Loading State** — Não existe
- **Error Boundary** — Não existe (Astro é SSG)
- **Dark/Light Toggle** — Não existe (tema escuro fixo)

---

## 3. Padrões de Interação

### 3.1 Hover States

| Elemento | Efeito | CSS |
|----------|--------|-----|
| **Glass Card** | Border glow orange + translateY(-2px) + box-shadow | `glass-card:hover` |
| **Skill Card Title** | Color change → `#FF4400` | `group-hover:text-[#FF4400]` |
| **Skill Card "Ver mais"** | Opacity 0→1 + arrow translateX(+1) | `group-hover:opacity-100` |
| **Button Primary** | Brightness +10% + box-shadow glow | `btn-primary:hover` |
| **Button Secondary** | Background white/10 | `hover:bg-white/10` |
| **Footer Links** | Color white/60 → white | `hover:text-white` |
| **Header Logo** | Opacity 90% | `hover:opacity-90` |
| **Mentoria CTA** | Scale 1.05 + bg change | `hover:scale-105` |
| **Social Icons** | Color white/50 → white | `hover:text-white` |

### 3.2 Animações

| Animação | Tipo | Localização |
|----------|------|-------------|
| `animate-ping` | Pulse infinito | Badge "Open Source" (homepage), Badge urgência (mentoria) |
| `animate-pulse` | Pulse suave | Badge urgência mentoria |
| `transition-all 0.2s` | Ease | Todos os botões e cards |
| `transition-colors` | Color only | Links, textos hover |
| `transition-transform` | Transform only | Arrow icons em hover |
| Smooth scroll | `scroll-behavior: smooth` | Global (html) |

### 3.3 Issues de Interação

- [A11Y-012] Nenhuma animação respeita `prefers-reduced-motion`
- [A11Y-013] Cards inteiros são links (`<a>`) — bom para click area, mas todo o conteúdo interno é read como link text para screen readers
- [UX-001] Hover "Ver mais" nos cards é invisible até hover — discovery problem em touch devices

---

## 4. Design System Atual

### 4.1 Paleta de Cores

#### Cores Primárias

| Token | Valor | Uso | Contraste com bg |
|-------|-------|-----|-------------------|
| `--color-background` | `#08080C` | Background principal | — |
| `--color-background-secondary` | `#0A0A0F` | Seções alternadas | — |
| `--color-card` | `#0C0C12` | Surface de cards | — |
| `--color-accent` | `#FF4400` | CTAs, badges, links | 4.97:1 com #08080C (PASSA AA large) |
| `--color-accent-hover` | `#FF5C10` | Hover de accent | 5.53:1 com #08080C |
| `--color-text-primary` | `#FFFFFF` | Texto principal | 19.39:1 com #08080C (PASSA AAA) |
| `--color-text-secondary` | `rgba(255,255,255,0.7)` | Texto secundário | ~10.1:1 (PASSA AAA) |
| `--color-text-muted` | `rgba(255,255,255,0.5)` | Texto muted | ~6.5:1 (PASSA AA) |
| `--color-border` | `rgba(255,255,255,0.10)` | Bordas | Decorativo — N/A |

#### Cores de Categoria

| Categoria | Cor | Uso |
|-----------|-----|-----|
| Squads / AIOX | `#FF4400` | Framework, Xquads |
| Skills / Produtividade | `#22C55E` | Skills pages |
| Apps | `#8B5CF6` | Monitor, Maestri |
| Integrações | `#0EA5E9` | Vercel, GitHub, Supabase, Google/Meta Ads |
| Aprendizado | `#06B6D4` | Anthropic Courses |

#### Issues de Contraste

- [A11Y-014] `rgba(255,255,255,0.45)` (footer copyright) = ~4.1:1 — **FALHA AA para texto normal** (min 4.5:1)
- [A11Y-015] `rgba(255,255,255,0.35)` (labels "Você sai com") = ~3.2:1 — **FALHA AA**
- [A11Y-016] `rgba(255,255,255,0.40)` (texto dos encontros) = ~3.6:1 — **FALHA AA**
- [A11Y-017] `#22C55E` sobre `#0C0C12` = ~6.2:1 — PASSA AA
- [A11Y-018] `#0EA5E9` sobre `#0C0C12` = ~5.1:1 — PASSA AA
- [A11Y-019] `#8B5CF6` sobre `#0C0C12` = ~3.8:1 — **FALHA AA para texto normal**

### 4.2 Tipografia

#### Font Families

| Token | Valor | Uso |
|-------|-------|-----|
| `--font-sans` | `'Inter', system-ui, -apple-system, sans-serif` | Body text, headings |
| `--font-mono` | `'Geist Mono', 'Roboto Mono', ui-monospace, monospace` | Labels, badges, CTAs, code |
| `--font-bb-display` | `'TASA Orbiter', system-ui, sans-serif` | Mentoria h1 only |

**Carregamento:** Google Fonts com `display=swap` e `preconnect`
```
Inter: 400, 500, 600, 700, 800
Geist Mono: 400, 500, 600, 700
```

#### Typography Scale

| Contexto | Size | Weight | Font | Transform |
|----------|------|--------|------|-----------|
| H1 (hero home) | `text-xl → text-4xl` (responsive) | 700 (bold) | Inter | — |
| H1 (skill page) | `text-4xl → text-6xl` | 700 | Inter | — |
| H1 (mentoria) | `clamp(1.5rem, 4.5vw, 2.75rem)` | 800 | TASA Orbiter (fallback Inter) | — |
| H2 | `text-2xl → text-5xl` | 700 | Inter | — |
| H3 | `text-lg → text-xl` | 700 | Inter | — |
| Body | `text-sm → text-lg` | 400 | Inter | — |
| Mono Label | `0.65rem → 0.7rem` | 500-600 | Geist Mono | uppercase, tracking-wider |
| Badge | `0.55rem → 0.65rem` | 600 | Geist Mono | uppercase, letter-spacing: 0.10-0.14em |
| Code | `text-sm` | 400 | Geist Mono | — |

### 4.3 Spacing System

Definido em `global.css` via CSS custom properties:

```
--space-1:  0.25rem  (4px)
--space-2:  0.5rem   (8px)
--space-3:  0.75rem  (12px)
--space-4:  1rem     (16px)
--space-5:  1.25rem  (20px)
--space-6:  1.5rem   (24px)
--space-8:  2rem     (32px)
--space-10: 2.5rem   (40px)
--space-12: 3rem     (48px)
--space-16: 4rem     (64px)
--space-20: 5rem     (80px)
--space-24: 6rem     (96px)
```

**Na prática:** A maioria das páginas usa Tailwind utility classes (`px-4`, `py-20`, `gap-5`) ao invés dos custom properties. A mentoria é a única página que usa `var(--space-*)` extensivamente.

### 4.4 Padrões de Layout

| Pattern | Implementação | Uso |
|---------|---------------|-----|
| Max width | `max-w-7xl` (1280px) | Container principal |
| Horizontal padding | `px-4 sm:px-6 lg:px-8` | Consistente |
| Section spacing | `py-16 sm:py-20 md:py-24` | Seções maiores |
| Grid columns | `1 → 2 → 3 → 4` (responsive) | Skills grid |
| Card gap | `gap-4 sm:gap-5` | Entre cards |

### 4.5 Border & Shadow System

| Elemento | Border | Shadow |
|----------|--------|--------|
| Card normal | `1px solid rgba(255,255,255,0.10)` | None |
| Card hover | `rgba(255,68,0,0.35)` | `0 0 24px rgba(255,68,0,0.12)` |
| Button primary hover | None | `0 0 20px rgba(255,68,0,0.25)` |
| CTA mentoria | None | `shadow-lg shadow-[#FF4400]/25` |
| Header | `border-b border-transparent` | backdrop-blur-xl |
| Footer | `border-t border-white/[0.08]` | None |
| **Border radius** | **0 (ZERO)** em tudo | Estilo brutalist |

**Exceção:** Xquads author card usa `rounded-2xl` — inconsistência com o brutalist design.

---

## 5. Problemas Consolidados por Severidade

### CRÍTICOS (Bloqueia WCAG 2.2 AA)

| ID | Problema | Páginas | Fix |
|----|----------|---------|-----|
| A11Y-012 | Nenhuma animação respeita `prefers-reduced-motion` | Todas | Adicionar media query global |
| A11Y-014 | Textos com contraste < 4.5:1 (white/45, white/40, white/35) | Mentoria, Footer | Aumentar opacidade mínima para 0.6 |
| A11Y-019 | `#8B5CF6` (Apps badge) falha AA sobre dark bg | Skills, Home | Usar tom mais claro |
| A11Y-006 | `animate-pulse` em badge de urgência sem motion preference | Mentoria | `prefers-reduced-motion: reduce` |
| PERF-004 | Font TASA Orbiter não carregada | Mentoria | Adicionar ao `<link>` ou remover referência |

### ALTOS (Impacta significativamente a experiência)

| ID | Problema | Páginas | Fix |
|----|----------|---------|-----|
| A11Y-001 | Filtro não anuncia mudanças para screen readers | Home | `aria-live="polite"` no grid |
| A11Y-003 | Breadcrumb `<nav>` sem `aria-label` | 14 skill pages | Adicionar `aria-label="Breadcrumb"` |
| A11Y-010 | Reveal.js slides inacessíveis | Apresentação | Usar plugin a11y do Reveal |
| A11Y-013 | Cards inteiros como link leem todo conteúdo | Home | Usar link no título + click handler |
| UX-001 | "Ver mais" invisível sem hover (touch devices) | Home | Mostrar sempre em mobile |

### MÉDIOS (Melhorias recomendadas)

| ID | Problema | Páginas | Fix |
|----|----------|---------|-----|
| A11Y-002 | Badges NEW/FEATURED sem marcação | Home | `aria-label` nos badges |
| A11Y-004 | Botão "Voltar" sem label descritivo | Skill pages | `aria-label="Voltar para lista de skills"` |
| A11Y-005 | Code blocks sem wrapper semântico | Framework, Monitor | Usar `<pre><code>` |
| A11Y-007 | Design tokens inconsistentes (mentoria vs global) | Mentoria | Unificar tokens |
| A11Y-009 | Skip de heading level (h3 → h2) | Mentoria | Corrigir hierarquia |
| PERF-002 | Imagens below-fold sem lazy loading | Home, Skills | `loading="lazy"` |
| PERF-003 | Background images sem lazy loading | Skill pages | Lazy ou CSS bg |
| PERF-005 | Reveal.js CDN sem fallback | Apresentação | Self-host ou fallback |

### BAIXOS (Nice to have)

| ID | Problema | Páginas | Fix |
|----|----------|---------|-----|
| CRO-001 | Excesso de CTAs na mentoria | Mentoria | Reduzir para max 3 estratégicos |
| CRO-002 | Urgência estática ("4 vagas") | Mentoria | Tornar dinâmico ou remover |
| A11Y-008 | Formulário Revos sem fallback | Mentoria | Fallback link para página externa |
| A11Y-011 | Slides sem alt text | Apresentação | N/A (textual) |
| — | Falta skip link global | Todas | Adicionar skip-to-main |
| — | Footer sem `<nav>` semântico | Todas | Envolver links em `<nav>` |
| — | Copyright 2025 (desatualizado) | Footer | Atualizar para 2026 |

---

## 6. Recomendações para Migração Next.js

### 6.1 Componentes para Criar

Com base no inventário, estes componentes devem ser criados no Next.js:

```
components/
├── layout/
│   ├── Header.tsx          ← Extrair de BaseLayout (inline atualmente)
│   ├── Footer.tsx          ← Extrair de BaseLayout (inline atualmente)
│   ├── SkipLink.tsx        ← NOVO (não existe)
│   └── BaseLayout.tsx      ← Wrapper com header/footer/meta
├── ui/
│   ├── Button.tsx          ← btn-primary + secondary + ghost variants
│   ├── Card.tsx            ← glass-card com hover effects
│   ├── Badge.tsx           ← Category colors + urgency + animated
│   ├── Icon.tsx            ← Migrar de Icon.astro (28 ícones SVG)
│   ├── AccentLine.tsx      ← Gradient separator
│   ├── CodeBlock.tsx       ← NOVO (semântico, acessível)
│   └── Breadcrumb.tsx      ← Com aria-label e schema.org
├── sections/
│   ├── Hero.tsx            ← 3 variants (home, skill, mentoria)
│   ├── SkillGrid.tsx       ← Com filtro acessível
│   ├── StatsGrid.tsx       ← 2x2 números
│   ├── CTASection.tsx      ← Reusável com variants
│   └── FeatureGrid.tsx     ← Grid de features com ícones
└── mentoria/
    ├── UrgencyBadge.tsx    ← Com prefers-reduced-motion
    ├── EncountroCard.tsx   ← Presencial vs Online variants
    └── DiferencialCard.tsx ← Com ícone SVG custom
```

### 6.2 Design Tokens para Preservar

```typescript
// tokens.ts
export const colors = {
  background: '#08080C',
  backgroundSecondary: '#0A0A0F',
  card: '#0C0C12',
  accent: '#FF4400',
  accentHover: '#FF5C10',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.6)', // ← Ajustado de 0.5 para compliance
  border: 'rgba(255, 255, 255, 0.10)',
  categories: {
    squads: '#FF4400',
    skills: '#22C55E',
    apps: '#A78BFA', // ← Ajustado de #8B5CF6 para compliance
    integracoes: '#0EA5E9',
    aprendizado: '#06B6D4',
  }
} as const;

export const fonts = {
  sans: "'Inter', system-ui, -apple-system, sans-serif",
  mono: "'Geist Mono', 'Roboto Mono', ui-monospace, monospace",
} as const;
```

### 6.3 Padrões de Interação para Preservar

1. **Glass card hover:** Border glow + translateY(-2px) — identidade visual core
2. **Mono uppercase labels:** Geist Mono em badges/CTAs/labels — DNA brutalist
3. **Zero border-radius:** Manter em TUDO (corrigir exceção no Xquads)
4. **Orange glow effects:** box-shadow com `#FF4400` translúcido em hovers
5. **Group hover nos cards:** "Ver mais" + title color change + arrow shift
6. **Smooth scroll:** Para anchors internos
7. **Accent line gradient:** Separador horizontal com fade-in/out

### 6.4 Correções de A11y para Incluir na Migração

1. Adicionar `<a class="skip-link" href="#main-content">Pular para conteúdo</a>` no layout
2. Adicionar `@media (prefers-reduced-motion: reduce)` global desabilitando animações
3. Aumentar opacidade mínima de texto para `0.6` (compliance AA)
4. Usar `aria-live="polite"` no grid de skills filtrado
5. Adicionar `aria-label="Breadcrumb"` no `<nav>` do breadcrumb
6. Refatorar card link para usar link no título + JS click handler no card
7. Adicionar `role="region"` + `aria-label` nas seções principais
8. Footer links dentro de `<nav aria-label="Links do rodapé">`
9. Remover font TASA Orbiter ou carregá-la corretamente
10. Ajustar cor `#8B5CF6` → `#A78BFA` para compliance de contraste

---

## 7. Assets & Imagens

### 7.1 Inventário de Imagens

| Arquivo | Usado em | Tipo | Observações |
|---------|----------|------|-------------|
| `hero-ultrawide.png` | Homepage hero | Photo | Above-fold, sem lazy |
| `cta-team.png` | Homepage CTA | Photo | Below-fold, precisa lazy |
| `mentoria-hero.png` | Mentoria hero | Photo | CSS `scaleX(-1)` flip |
| `claudia-guirunas.png` | Mentoria facilitadores | Portrait | — |
| `joao-guirunas-profile.jpg` | Mentoria facilitadores | Portrait | — |
| `logo.svg` | Header/Footer | Logo SVG | Inline SVG ideal |
| `claude-logo.png` | Footer, Home | Logo | Considerar SVG |
| `claude-code-logo.png` | Footer | Logo | Considerar SVG |
| `bg-framework.png` | AIOX Framework | Background | Pode ser lazy |
| `bg-monitor.png` | AIOX Monitor | Background | Pode ser lazy |
| `bg-maestri.png` | Maestri | Background | Pode ser lazy |
| `bg-xquads.png` | Xquads | Background | Pode ser lazy |
| `bg-claude-code.png` | Setup Claude Code | Background | Pode ser lazy |
| `bg-learn.png` | Anthropic Courses | Background | Pode ser lazy |
| + 10 more `bg-*.png` | Various skill pages | Background | Podem ser lazy |

### 7.2 Recomendações de Imagem para Next.js

- Usar `next/image` com formato WebP/AVIF automático
- Implementar `placeholder="blur"` para LCP improvement
- Hero images: `priority={true}`, demais: `loading="lazy"`
- Background images: considerar CSS `background-image` ou `next/image` com fill
- Logos PNG → converter para SVG onde possível

---

## 8. SEO & Meta Data (Baseline)

### Implementado (preservar na migração):

- `<html lang="pt-BR">` — BOM
- `<meta name="viewport">` — BOM
- `<meta name="description">` — Em todas as páginas
- `<link rel="canonical">` — Dinâmico por página
- Open Graph completo (title, description, image, url, locale)
- Twitter Cards (summary_large_image)
- Schema.org Organization + WebSite + SearchAction
- Schema.org BreadcrumbList nas skill pages
- Schema.org SoftwareApplication nas skill pages
- `<meta name="robots" content="index, follow">`

### Faltando (adicionar na migração):

- Sitemap.xml
- robots.txt
- Favicon set completo (apenas SVG atualmente)
- `<meta name="theme-color">`
- Alternate hreflang (se houver i18n futuro)

---

## 9. Resumo de Métricas de Baseline

| Métrica | Valor Atual | Meta Next.js |
|---------|-------------|-------------|
| Total de páginas | 18 | 18+ |
| Componentes reutilizáveis | 3 (BaseLayout, SkillPage, Icon) | 15+ componentizados |
| Design tokens definidos | ~25 | Manter + unificar mentoria |
| Ícones SVG no Icon system | 28 | Manter ou migrar para lib |
| Issues A11Y críticas | 5 | 0 |
| Issues A11Y altas | 5 | 0 |
| Issues A11Y médias | 8 | <=2 |
| Heading level skips | 3+ | 0 |
| Imagens sem lazy | ~15 | 0 (next/image gerencia) |
| Fonts externas | 2 (Inter + Geist Mono) | 2 (next/font otimiza) |
| Animações sem motion-reduce | ALL | 0 |
| Skip links | 0 | 1 global |
| ARIA landmarks | Parcial (header, main, footer) | Completo |

---

*Auditoria realizada por Kunti (UX Delta) — nenhum visitante fica para trás.*
*Relatório gerado em 2026-04-04 como baseline para migração Astro → Next.js.*
