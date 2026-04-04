# Design System Brandbook — Relatorio de Auditoria

> **Data:** 2026-04-04
> **Fonte:** https://brand.aioxsquad.ai/brandbook/
> **Escopo:** Comparacao entre AIOX Brand Book v2.0 (Dark Cockpit Edition) e pagina de mentoria (`/mentoria`)

---

## 1. TIPOGRAFIA

### Brand Book (Oficial)

| Token | Font | Size | Weight | Letter-Spacing | Line-Height | Uso |
|-------|------|------|--------|----------------|-------------|-----|
| Display | TASA Orbiter Black | 4rem (64px) | 800 | -0.03em | 1.0 | Large headlines, impact |
| H1 | TASA Orbiter Black | 2.5rem (40px) | 800 | -0.03em | 1.2 | Page titles |
| H2 | TASA Orbiter Black | 1.5rem (24px) | 800 | -0.03em | 1.2 | Section titles |
| Body | Geist Semibold | 1rem (16px) | 400-700 | normal | 1.2 | Primary text |
| Small | Geist Semibold | 0.8rem (12.8px) | 400-700 | normal | 1.2 | Secondary desc |
| Label | Roboto Mono Medium | 0.65rem (10.4px) | 400-500 | 0.12em | 1.2 | HUD labels, nav |
| Micro | Roboto Mono Medium | 0.6rem (9.6px) | 400-500 | 0.08-0.12em | 1.2 | Footer, refs |

**CSS Variables:**
- `--font-bb-display` = TASA Orbiter Black (weight 800)
- `--font-bb-sans` = Geist Semibold (weight 400-700)
- `--font-bb-mono` = Roboto Mono Medium (weight 400-500)

**Regras:**
- Headers SEMPRE uppercase
- Labels SEMPRE uppercase + mono
- Display usa tracking negativo (-0.03em)
- Mono labels usam 0.10em-0.12em

### Mentoria (Atual)

- `--font-sans` = Inter, system-ui (NAO e Geist)
- `--font-mono` = Geist Mono, Roboto Mono
- `--font-bb-display` = alias para `--font-sans` (Inter) — NAO e TASA Orbiter
- Headers usam `font-bold` (700) — Brand Book usa 800
- H1 hero: `text-2xl sm:text-3xl lg:text-4xl` (24px→36px) — Brand Book: 2.5rem (40px) ou 4rem (64px) display
- Sections H2: `text-2xl sm:text-4xl lg:text-5xl` (24px→48px) — mais proximo, mas inconsistente entre sections
- Nenhum header usa `uppercase` — Brand Book requer uppercase em headers
- `letter-spacing: tracking-tight` em headers — Brand Book usa -0.03em (similar, OK)
- Labels/badges usam inline `fontFamily: "'Geist Mono', monospace"` — deveria usar var CSS

---

## 2. CORES

### Brand Book (Oficial)

| Token | Hex | Uso |
|-------|-----|-----|
| `--bb-lime` / `--lime` | `#D1FF00` | **Primary accent** (botoes, highlights, badges) |
| `--bb-dark` / `--dark` | `#0a0a0a` | Background principal |
| `--bb-dim` / `--dim` | `#666` | Texto secundario |
| `--bb-cream` | ~#FFFFFF / off-white | Texto primario |
| `--bb-border` | rgba branco baixa opacidade | Dividers, bordas |

### Mentoria (Atual)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-accent` | `#FF4400` | Accent (laranja) |
| `--color-background` | `#08080C` | Background |
| `--bb-accent` | `#FF4400` | Alias |

### INCONSISTENCIAS DE COR

| Item | Brand Book | Mentoria | Severidade |
|------|-----------|----------|------------|
| **Accent primario** | `#D1FF00` (lime/neon) | `#FF4400` (laranja) | **CRITICA** — cor completamente diferente |
| **Background** | `#0a0a0a` | `#08080C` | MENOR — muito similar |
| **Texto dim** | `#666` | `rgba(255,255,255,0.6)` | MEDIA — abordagem diferente |
| Pricing "Com AIOX" column | Deveria ser lime | `emerald-500` (verde Tailwind) | **ALTA** — cor fora do sistema |
| Status badges | lime accent | `#0EA5E9` (azul) para "Online" | MEDIA — cor custom nao do brand |

> **NOTA IMPORTANTE:** A mentoria usa `#FF4400` como accent unico. O Brand Book usa `#D1FF00` (lime). Esta e a maior divergencia. A decisao de usar laranja pode ser intencional para a landing page de marketing, mas nao segue o Brand Book.

---

## 3. BOTOES

### Brand Book (Oficial)

| Propriedade | Valor |
|-------------|-------|
| Font | `var(--font-bb-mono)` / Roboto Mono |
| Size | 0.6rem |
| Weight | 500 |
| Transform | uppercase |
| Letter-spacing | 0.08em |
| Border-radius | 0 (sharp/brutalist) |
| Variantes | Primary, Secondary, Ghost, Delete |
| Componentes | SiteCta (marketing), Button (product), PrimaryLink (editorial) |
| Cor primaria | `#D1FF00` (lime) bg + `#0a0a0a` text |

### Mentoria (Atual)

**CtaButton (primary):**
- `bg-[#FF4400]` (laranja, nao lime)
- `text-sm sm:text-base` (~14-16px) — Brand Book: 0.6rem (9.6px)
- `font-semibold` (600) — Brand Book: 500
- `tracking-wider` — Brand Book: 0.08em
- `shadow-2xl shadow-[#FF4400]/40` — nao especificado no Brand Book
- `hover:scale-105` — nao no Brand Book (usa brightness/glow)

**CtaButton (secondary):**
- `border-[#FF4400]/50 bg-white/5 backdrop-blur-md` — Brand Book: ghost nao tem blur
- `text-sm sm:text-base` — deveria ser 0.6rem
- `font-semibold` — deveria ser 500

**MentorshipPricing CTA:**
- `text-sm sm:text-base font-semibold` — sem mono font explicitamente
- Sem `text-transform: uppercase` — inconsistente
- Sem `letter-spacing` — inconsistente

**MentorshipFeatures CTA:**
- Usa `fontFamily: "'Geist Mono', monospace"` inline — correto mas deveria ser var
- Tem `uppercase tracking-wider` — proximo do correto

### INCONSISTENCIAS DE BOTOES

| Local | Problema | Brand Book Esperado |
|-------|---------|---------------------|
| CtaButton | Tamanho de fonte variavel (sm→base) | Fixo 0.6rem |
| CtaButton | `font-semibold` (600) | weight 500 |
| CtaButton primary | `hover:scale-105` | brightness(1.1) + glow |
| MentorshipPricing CTA | Sem font mono, sem uppercase | Mono, uppercase, 0.08em |
| CourseModulesTimeline CTA | Sem font mono, sem uppercase | Mono, uppercase, 0.08em |
| LinkedIn button (facilitadores) | Custom inline — diferente de todos | Deveria ser Ghost variant |
| "Conheca Nossa Cultura" | Custom inline — diferente de todos | Deveria ser Secondary variant |

---

## 4. CARDS

### Brand Book (Oficial)

| Variante | Background | Border | Shadow | Radius |
|----------|-----------|--------|--------|--------|
| Default | dark surface | `--bb-border` | none | 0 (sharp) |
| Elevated | dark surface | `--bb-border` | elevated shadow | 0 |
| Outlined | transparent | border visible | none | 0 |

- Font vars: `--font-display`, `--font-mono`, `--font-bb-mono`
- Accent: `#D1FF00`
- Composicao: category tag + status badge + description + actions

### Mentoria (Atual)

**`.glass-card` (globals.css):**
- `background: rgba(255,255,255,0.02)` — OK
- `border: 1px solid rgba(255,255,255,0.10)` — OK
- `border-radius: 0` — OK (brutalist)
- Hover: `border-color: rgba(255,68,0,0.35)` + glow — cor errada (laranja vs lime)
- Hover: `transform: translateY(-2px)` — nao no Brand Book

**FeatureCard (mentorship-features.tsx):**
- `border-2 border-[#FF4400]/30` — borda mais grossa que o padrao (2px vs 1px)
- `bg-[#08080C]/80 backdrop-blur-md` — blur nao no Brand Book
- Hover: `border-[#FF4400]` full border — muito forte
- Glow extra com box-shadow inline — excesso

**ComparisonColumn (mentorship-pricing.tsx):**
- Coluna "Com AIOX": `border-emerald-500/30 bg-emerald-500/[0.04]` — **COR FORA DO SISTEMA**
- `emerald-500` nao existe no Brand Book
- Deveria ser `#D1FF00` (lime) ou pelo menos `#FF4400` para consistencia interna

**TimelineCard (course-modules-timeline.tsx):**
- `border border-white/[0.06]` — borda muito fraca (6% vs 10%)
- `rounded-lg` — **TEM BORDER-RADIUS** — Brand Book e 0 (brutalist)
- Tags: `rounded-full` — **PIOR**: pills arredondadas em sistema brutalist

**FAQ Accordion:**
- Usa `.glass-card` — consistente com o global
- Sem radius — OK

### INCONSISTENCIAS DE CARDS

| Componente | Problema | Esperado |
|-----------|---------|----------|
| FeatureCard | border-2 (2px) | 1px |
| FeatureCard | backdrop-blur-md | Sem blur |
| ComparisonColumn highlight | `emerald-500` | Accent do sistema |
| TimelineCard | `rounded-lg` | border-radius: 0 |
| TimelineCard tags | `rounded-full` | border-radius: 0 |
| Timeline indicator | `rounded-full` (circulo) | OK (indicador de timeline) |
| Todos os cards | Hover com laranja | Brand Book usa lime |

---

## 5. ESPACAMENTOS

### Brand Book (Oficial)

| Token | Valor | Uso |
|-------|-------|-----|
| Gutter | `var(--bb-gutter, 2rem)` | Layout spacing padrao |
| Card padding | `0.65rem 1.5rem` a `3rem` | Interno dos cards |
| Section margin | `1.5rem` a `3rem` | Entre sections |
| Component gap | `2rem` | Gap padrao |

### Mentoria (Atual)

| Section | Padding Y | Horizontal | Observacao |
|---------|-----------|------------|------------|
| Hero | min-h-[85vh] | px-6 sm:px-10 lg:px-16 | Inconsistente com outros |
| Problema | py-16 sm:py-24 | px-5 sm:px-6 lg:px-8 | Padrao |
| Solucao | py-16 sm:py-24 | px-5 sm:px-6 lg:px-8 | Padrao |
| Como Funciona | py-16 sm:py-24 | px-5 sm:px-6 lg:px-8 | Padrao |
| CTAs intermediarios | py-12 sm:py-16 | px-5 | **INCONSISTENTE** — px-5 sem responsive |
| Diferenciais | py-16 sm:py-24 | px-5 sm:px-6 lg:px-8 | Padrao |
| Para Quem | py-16 sm:py-24 | px-5 sm:px-6 lg:px-8 | Padrao |
| Entregaveis | py-16 sm:py-24 | px-4 sm:px-6 lg:px-8 | **px-4** (diferente) |
| FAQ | py-16 sm:py-24 | px-5 sm:px-6 lg:px-8 | Padrao |
| Inscricao | py-16 sm:py-24 | px-5 sm:px-6 lg:px-8 | Padrao |

### INCONSISTENCIAS DE ESPACAMENTO

| Local | Problema | Padrao Esperado |
|-------|---------|-----------------|
| Hero | px-6 sm:px-10 lg:px-16 | px-5 sm:px-6 lg:px-8 |
| Entregaveis | px-4 | px-5 |
| CTAs intermediarios | px-5 (sem breakpoints) | px-5 sm:px-6 lg:px-8 |
| Max-width variavel | max-w-4xl, 5xl, 6xl, 7xl | Deveria ser consistente |
| Card paddings | p-5, p-6, p-7, p-8 | Inconsistente entre componentes |

---

## 6. LISTAS

### Brand Book (Oficial)

- Status-based list items com name + badge (Active, In Progress, etc.)
- KPI cards com metricas grandes (clamp(4rem, 10vw, 8rem))
- Bullet: quadrado colorido (nao circulo)
- Font: mono para labels, 0.6-0.7rem
- Spacing: gap consistente

### Mentoria (Atual)

**CheckItem:**
- Usa `<Icon name="check">` — OK semanticamente
- `text-[#FF4400]` — cor do check e laranja (nao lime)
- Sem tamanho de fonte padrao — herda do contexto
- `gap-2 sm:gap-3` — OK

**XItem:**
- Usa `<Icon name="close">` com tamanho `w-5 h-5 sm:w-6 sm:h-6` — muito grande
- `text-sm sm:text-base` — OK

**FeatureCard bullets (mentorship-features.tsx):**
- `w-1.5 h-1.5 bg-[#FF4400]` — quadrado! **Consistente com Brand Book** (unica coisa)
- `text-sm` — OK

### INCONSISTENCIAS DE LISTAS

| Local | Problema | Esperado |
|-------|---------|----------|
| CheckItem icon size | Sem padrao (16px) | Consistente com sistema |
| XItem icon | `w-5 h-5 sm:w-6 sm:h-6` — oversized | Mesmo tamanho do check |
| Pricing checklist | Check icons verdes (emerald) e vermelhos (red) | Accent do sistema |
| Nenhuma lista usa mono | Body font normal | Labels deveriam ser mono |

---

## 7. RESUMO DE INCONSISTENCIAS (Priorizadas)

### CRITICAS (Identidade Visual Quebrada)

1. **Cor accent `#FF4400` vs `#D1FF00`** — Toda a pagina usa laranja; Brand Book usa lime neon
2. **Font display Inter vs TASA Orbiter** — Headlines nao usam a font oficial
3. **Headers sem uppercase** — Brand Book requer uppercase em todos os headers
4. **Emerald-500 no pricing** — Cor completamente fora do sistema de design

### ALTAS (Consistencia de Componentes)

5. **Botoes sem padrao unificado** — Cada CTA tem estilo diferente
6. **Font size de botoes variavel** — Brand Book: fixo 0.6rem; mentoria: sm→base
7. **Border-radius em timeline** — `rounded-lg` e `rounded-full` em sistema brutalist
8. **Inline styles vs CSS vars** — `fontFamily: "'Geist Mono'"` repetido em vez de usar `var(--font-mono)`
9. **Hover effects inconsistentes** — scale, brightness, glow misturados

### MEDIAS (Padronizacao)

10. **Espacamento horizontal inconsistente** — px-4, px-5, px-6 misturados
11. **Max-width variavel** — Sections usam max-w-4xl a 7xl sem logica clara
12. **Card padding variavel** — p-5 a p-8 sem padrao
13. **Font weight de botoes** — 600 (semibold) vs Brand Book 500 (medium)
14. **Backdrop-blur em cards** — Nao faz parte do Brand Book

### BAIXAS (Detalhes)

15. **Background `#08080C` vs `#0a0a0a`** — Diferenca minima
16. **Texto dim opacity vs hex** — `rgba(255,255,255,0.6)` vs `#666`
17. **Accent line vs divider** — Implementacao OK, cor errada (laranja vs lime)

---

## 8. TOKENS A MIGRAR (Referencia Rapida)

```
BRAND BOOK → MENTORIA (mudancas necessarias)

Cores:
  accent:     #D1FF00 → atualmente #FF4400
  dark:       #0a0a0a → atualmente #08080C (manter? proximos)
  dim:        #666    → atualmente rgba(255,255,255,0.6)
  cream:      #FAFAFA → atualmente #FFFFFF

Fonts:
  display:    TASA Orbiter Black (800)    → atualmente Inter (700)
  sans:       Geist Semibold (400-700)    → atualmente Inter
  mono:       Roboto Mono Medium (400-500) → atualmente Geist Mono

Typography:
  headers:    uppercase                   → atualmente sentence case
  display:    4rem, -0.03em, lh 1.0      → atualmente variavel
  labels:     0.65rem, 0.12em, mono      → atualmente ~OK mas inconsistente
  buttons:    0.6rem, 0.08em, mono, 500  → atualmente variavel

Cards:
  radius:     0                           → atualmente 0 (glass-card) mas rounded em timeline
  border:     1px                         → atualmente 1px a 2px
  blur:       nenhum                      → atualmente backdrop-blur em alguns

Buttons:
  hover:      brightness(1.1) + glow      → atualmente scale + bg change
```

---

> **Proximo passo:** Definir se a mentoria deve migrar para o Brand Book completo (incluindo mudar accent de laranja para lime) ou se mantem o laranja como excecao de marketing. A partir dessa decisao, aplicar as correcoes nos componentes.
