# Brandbook Audit — Mentoria Page

**Data:** 2026-04-04
**Fonte:** https://brand.aioxsquad.ai/brandbook/ (typography, buttons, cards, tables, lists)
**Escopo:** `next-app/src/app/mentoria/` (page.tsx, mentorship-features.tsx, course-modules-timeline.tsx, faq-accordion.tsx, mentorship-pricing.tsx, revos-form.tsx)

---

## 1. Tokens do Brandbook (Referencia)

### 1.1 Tipografia

| Token | Valor | Uso |
|-------|-------|-----|
| `--font-bb-display` | TASAOrbiter Black (weight: 800) | Hero, h1, h2 |
| `--font-bb-sans` | Geist (weights: 400-700) | Body, paragraphs |
| `--font-bb-mono` | Roboto Mono (weights: 400-500) | Labels, badges, HUD |

| Escala | Tamanho | Familia |
|--------|---------|---------|
| Display | 4rem | TASAOrbiter 800 |
| H1 | 2.5rem | TASAOrbiter 800 |
| H2 | 1.5rem | TASAOrbiter 800 |
| Body | 1rem | Geist 400-700 |
| Small | 0.8rem | Geist |
| Label | 0.65rem | Roboto Mono |
| Micro | 0.6rem | Roboto Mono |

| Propriedade | Valor |
|-------------|-------|
| Display letter-spacing | -0.03em (tight) |
| Label letter-spacing | 0.1em a 0.12em (expanded) |
| Display line-height | 1 a 1.2 |
| Body line-height | 1.5 (implicito) |
| Display text-transform | uppercase |

### 1.2 Cores

| Token | Valor | Uso |
|-------|-------|-----|
| `--bb-lime` / `var(--lime)` | `#D1FF00` | Accent primario |
| `--bb-dark` | `#0a0a0a` | Background principal |
| `--bb-cream` | (light) | Texto primario |
| `--bb-dim` / `var(--dim)` | `#666` | Texto secundario/muted |
| `--bb-surface` | (surface) | Backgrounds de cards |
| `--bb-border` | (border) | Bordas de componentes |

### 1.3 Botoes

| Propriedade | Valor |
|-------------|-------|
| Min-height | 44px (touch target) |
| Padding | 0.65rem 1.5rem |
| Font-weight | 500 / 800 |
| Text-transform | uppercase |
| Letter-spacing | 0.08em a 0.12em |
| Display | inline-flex, center aligned |
| Variantes | Primary, Secondary, Ghost, Delete, CtaButton, PrimaryLink, SiteCta |

### 1.4 Cards

| Propriedade | Valor |
|-------------|-------|
| Border | `var(--bb-border)` |
| Padding (gutter) | `var(--bb-gutter, 2rem)` |
| Footer padding | `3rem var(--bb-gutter, 2rem)` |
| Footer border | `border-t` |
| Variantes | Default (surface bg + border), Elevated (shadow), Outlined (transparent bg) |

### 1.5 Lists

| Propriedade | Valor |
|-------------|-------|
| Bullet/marker | Custom via CSS variables |
| Spacing | Definido pelo contexto |
| Typography | Herda do parent (Geist / Roboto Mono) |

---

## 2. Inconsistencias Encontradas

### 2.1 COR ACCENT — CRITICA

**Problema:** A mentoria inteira usa `#FF4400` (laranja) como cor accent. O brandbook define `#D1FF00` (lime) como accent primario.

| Arquivo | Linha(s) | Atual | Brandbook |
|---------|----------|-------|-----------|
| page.tsx | 29, 42, 54-55, 122-129, etc. | `#FF4400` | `#D1FF00` (`var(--lime)`) |
| mentorship-features.tsx | 29, 37, 42, 51, 108, 113, 140 | `#FF4400` | `#D1FF00` |
| course-modules-timeline.tsx | 13-38, 61-76, 92, 109, 148-161, 187 | `#FF4400` | `#D1FF00` |
| faq-accordion.tsx | 35, 39 | `#FF4400` | `#D1FF00` |
| mentorship-pricing.tsx | 118-131, 159-176, 190-210, 231-243 | `#FF4400` | `#D1FF00` |

> **NOTA:** Esta pode ser uma decisao intencional de branding para a mentoria (diferenciar do produto AIOX). Confirmar com stakeholder antes de alterar.

### 2.2 COR SECUNDARIA EMERALD — NAO EXISTE NO BRANDBOOK

**Problema:** `mentorship-pricing.tsx` usa `emerald-500` e `emerald-400` (Tailwind green) na coluna "Com AIOX", que nao existe no brandbook.

| Arquivo | Linha(s) | Atual | Sugestao |
|---------|----------|-------|----------|
| mentorship-pricing.tsx | 66 | `border-emerald-500/30 bg-emerald-500/[0.04]` | `border-[#D1FF00]/30 bg-[#D1FF00]/[0.04]` |
| mentorship-pricing.tsx | 73 | `text-emerald-400` | `text-[#D1FF00]` |
| mentorship-pricing.tsx | 90 | `text-emerald-400` | `text-[#D1FF00]` |

### 2.3 BACKGROUND — INCONSISTENTE

**Problema:** Mentoria alterna entre `#08080C` e `#0C0C12`. O brandbook define `#0a0a0a` (`--bb-dark`).

| Arquivo | Secao | Atual | Brandbook |
|---------|-------|-------|-----------|
| page.tsx:106 | Hero | `bg-[#08080C]` | `bg-[#0a0a0a]` / `var(--bb-dark)` |
| page.tsx:155 | Problema | `bg-[#08080C]` | `var(--bb-dark)` |
| page.tsx:179 | Solucao | `bg-[#0C0C12]` | `var(--bb-dark)` |
| page.tsx:197 | Como Funciona | `bg-[#0C0C12]` | `var(--bb-dark)` |
| mentorship-features.tsx:99 | Diferenciais | `bg-[#08080C]` | `var(--bb-dark)` |
| course-modules-timeline.tsx:128 | Timeline | `bg-[#08080C]` | `var(--bb-dark)` |
| mentorship-pricing.tsx:114 | Investimento | `bg-[#0C0C12]` | `var(--bb-dark)` |

> Recomendacao: Usar CSS variable `var(--bb-dark)` em vez de hardcoded hex. Se alternancia de backgrounds for intencional, criar `--bb-dark-alt` no design system.

### 2.4 FONT DISPLAY — HEADINGS NAO USAM TASAORBITER

**Problema:** Todos os headings da mentoria usam `font-bold` (Tailwind default / Geist Bold). O brandbook requer **TASAOrbiter Black (800)** para Display, H1, H2.

| Arquivo | Linha | Elemento | Atual | Brandbook |
|---------|-------|----------|-------|-----------|
| page.tsx:132 | h1 Hero | `font-bold text-white` | `font-display` (TASAOrbiter 800) |
| page.tsx:157 | h2 Problema | `font-bold text-white` | `font-display` |
| page.tsx:181 | h2 Solucao | `font-bold text-white` | `font-display` |
| page.tsx:201 | h2 Como Funciona | `font-bold text-white` | `font-display` |
| page.tsx:261 | h2 Para Quem | `font-bold text-white` | `font-display` |
| page.tsx:292 | h2 Entregaveis | `font-bold text-white` | `font-display` |
| page.tsx:328 | h2 Facilitadores | `font-bold text-white` | `font-display` |
| page.tsx:387 | h2 FAQ | `font-bold text-white` | `font-display` |
| page.tsx:401 | h2 CTA Final | `font-bold text-white` | `font-display` |
| mentorship-features.tsx:108 | h2 | `font-bold text-white` | `font-display` |
| course-modules-timeline.tsx:161 | h2 | `font-bold text-white` | `font-display` |
| mentorship-pricing.tsx:131 | h2 | `font-bold text-white` | `font-display` |

> **Correcao:** Adicionar `style={{ fontFamily: "var(--font-bb-display), 'TASAOrbiter', sans-serif" }}` ou classe `font-display` em todos os h1/h2.

### 2.5 FONT MONO — GEIST MONO vs ROBOTO MONO

**Problema:** Mentoria usa `fontFamily: "'Geist Mono', monospace"` em badges, labels e precos. O brandbook define **Roboto Mono** como font mono.

| Arquivo | Linha(s) | Atual | Brandbook |
|---------|----------|-------|-----------|
| page.tsx:55 (SectionBadge) | inline style | `'Geist Mono', monospace` | `var(--font-bb-mono)` (Roboto Mono) |
| page.tsx:127, 146, 215 | inline styles | `'Geist Mono', monospace` | `var(--font-bb-mono)` |
| course-modules-timeline.tsx:69, 93, 110, 152 | inline styles | `'Geist Mono', monospace` | `var(--font-bb-mono)` |
| mentorship-pricing.tsx:125, 180, 195, 208 | inline styles | `'Geist Mono', monospace` | `var(--font-bb-mono)` |
| mentorship-features.tsx:142 | inline style | `'Geist Mono', monospace` | `var(--font-bb-mono)` |

### 2.6 TYPE SCALE — TAMANHOS FORA DA ESCALA

**Problema:** Varios elementos usam tamanhos que nao correspondem a escala do brandbook.

| Arquivo | Linha | Atual | Mais proximo no brandbook |
|---------|-------|-------|---------------------------|
| page.tsx:132 (h1) | `text-2xl sm:text-3xl lg:text-4xl` | ~2.25rem max | Display (4rem) ou H1 (2.5rem) |
| page.tsx:157 (h2) | `text-2xl sm:text-4xl lg:text-5xl` | ~3rem max | H1 (2.5rem) — oversized |
| mentorship-features.tsx:45 (h3) | `text-xl sm:text-2xl` | ~1.5rem | H2 (1.5rem) OK |
| mentorship-features.tsx:108 (h2) | `text-2xl sm:text-4xl lg:text-5xl` | ~3rem | H1 (2.5rem) — oversized |
| course-modules-timeline.tsx:97 (h3) | `text-lg sm:text-xl` | ~1.25rem | Entre Body e H2 |

> O brandbook tem uma escala mais contida. As seccoes de mentoria usam `text-5xl` (3rem) para H2, enquanto o brandbook define H2 como apenas 1.5rem.

### 2.7 BOTOES — PADDING E ESTRUTURA DIFERENTE

**Problema:** CTAs da mentoria usam padding maior que o brandbook e nao seguem o padrao exato.

| Propriedade | Mentoria | Brandbook |
|-------------|----------|-----------|
| Padding (primary) | `px-8 sm:px-10 py-4 sm:py-5` | `0.65rem 1.5rem` |
| Border-radius | Nenhum (sharp) | Nao especificado (OK) |
| Shadow | `shadow-2xl shadow-[#FF4400]/40` | Nao especificado |
| Hover | `hover:bg-[#FF5722] hover:scale-105` | Nao especificado detalhadamente |
| Font-weight | `font-semibold` (600) ou `font-bold` (700) | 500 ou 800 |

> O CTA `CtaButton` em page.tsx:42 usa `font-semibold` (600) — brandbook espera 500 ou 800.

### 2.8 CARDS — `glass-card` NAO SEGUE BRANDBOOK

**Problema:** A mentoria usa uma classe `glass-card` custom que nao e definida no brandbook. O brandbook define variantes Default, Elevated e Outlined com tokens especificos.

| Elemento | Mentoria | Brandbook |
|----------|----------|-----------|
| FAQ items | `glass-card overflow-hidden` | Default card com `--bb-border` |
| Encontros grid | `glass-card p-5 sm:p-6` | Default card, padding `var(--bb-gutter, 2rem)` |
| Entregaveis | `glass-card p-8 border-[#FF4400]/10` | Outlined card |
| CTA Final | `glass-card border-[#FF4400]/20 p-8 sm:p-12 lg:p-16` | Elevated card |

### 2.9 TEXTO SECUNDARIO — CORES INCONSISTENTES

**Problema:** O brandbook define `--bb-dim` (`#666`) para texto secundario. A mentoria usa multiplas variantes de `white/XX`.

| Arquivo | Uso | Atual | Brandbook |
|---------|-----|-------|-----------|
| Varios | Paragrafos | `text-white/60`, `text-white/70`, `text-white/80` | `var(--bb-dim)` / `#666` |
| Varios | Labels | `text-white/50`, `text-white/40`, `text-white/35` | `var(--bb-dim)` |

> Recomendacao: Padronizar em 2-3 niveis: `text-white/80` (high), `text-white/60` ou `var(--bb-dim)` (medium), `text-white/40` (low).

### 2.10 LETTER-SPACING — HEADINGS SEM TIGHT

**Problema:** Display headings no brandbook usam `-0.03em` (tight). Na mentoria, so o h1 do hero tem `tracking-tight`.

| Arquivo | Linha | Elemento | Atual | Brandbook |
|---------|-------|----------|-------|-----------|
| page.tsx:132 | h1 | `tracking-tight` | `-0.03em` OK |
| page.tsx:157 | h2 | (nenhum) | Deveria ter `tracking-tight` |
| page.tsx:181 | h2 | (nenhum) | Deveria ter `tracking-tight` |
| mentorship-features.tsx:108 | h2 | (nenhum) | Deveria ter `tracking-tight` |
| mentorship-pricing.tsx:131 | h2 | (nenhum) | Deveria ter `tracking-tight` |

---

## 3. Sugestoes de Correcao Especificas

### 3.1 Prioridade ALTA (Visual Identity)

| # | Componente | De | Para |
|---|-----------|-----|------|
| 1 | Todos os h1/h2 | `className="font-bold"` | Adicionar `style={{ fontFamily: "var(--font-bb-display)" }}` + `tracking-tight` |
| 2 | Todos os `'Geist Mono'` | `fontFamily: "'Geist Mono', monospace"` | `fontFamily: "var(--font-bb-mono)"` |
| 3 | Todos os headings h2 | (sem tracking) | Adicionar `tracking-tight` |
| 4 | emerald no pricing | `border-emerald-500/30`, `text-emerald-400` | `border-[var(--lime)]/30`, `text-[var(--lime)]` |

### 3.2 Prioridade MEDIA (Consistencia)

| # | Componente | De | Para |
|---|-----------|-----|------|
| 5 | Backgrounds | `bg-[#08080C]` / `bg-[#0C0C12]` | `bg-[var(--bb-dark)]` ou definir tokens |
| 6 | glass-card | classe custom | Mapear para variantes do brandbook (Default/Elevated/Outlined) |
| 7 | Button font-weight | `font-semibold` (600) | `font-medium` (500) ou `font-extrabold` (800) |
| 8 | Texto secundario | `white/60`, `white/70`, `white/50` etc. | Padronizar: `white/70` (body), `var(--bb-dim)` (muted) |

### 3.3 Prioridade BAIXA (Fine-tuning)

| # | Componente | De | Para |
|---|-----------|-----|------|
| 9 | H2 type scale | `text-4xl lg:text-5xl` (~3rem) | Alinhar com H1 brandbook (2.5rem) ou criar token Display-Section |
| 10 | Button padding | `px-8 py-4` a `px-12 py-6` | Padronizar em `0.65rem 1.5rem` base, scale up com classes |
| 11 | Card padding | `p-5`, `p-6`, `p-8` variados | `var(--bb-gutter, 2rem)` consistente |

### 3.4 DECISAO REQUERIDA (Stakeholder)

| # | Questao |
|---|---------|
| A | **Cor accent `#FF4400` vs `#D1FF00`:** A mentoria intencionalmente usa laranja diferente do lime do AIOX? Se sim, documentar como variante aprovada. Se nao, trocar tudo para `var(--lime)` / `#D1FF00`. |
| B | **Cor azul `#0EA5E9`:** Usada nos encontros "Online" — nao existe no brandbook. Aprovar como token adicional ou substituir? |

---

## 4. Resumo Quantitativo

| Categoria | Ocorrencias | Severidade |
|-----------|-------------|------------|
| Cor accent errada (#FF4400 vs #D1FF00) | ~80+ | DECISAO |
| Font display ausente (TASAOrbiter) | ~15 headings | ALTA |
| Font mono errada (Geist vs Roboto) | ~12 inline styles | ALTA |
| Background nao-tokenizado | ~10 sections | MEDIA |
| Emerald (cor nao-brandbook) | 3 | MEDIA |
| glass-card sem mapeamento | 8+ usos | MEDIA |
| Letter-spacing ausente em headings | ~10 | BAIXA |
| Type scale oversized | ~8 | BAIXA |
| Texto secundario inconsistente | ~20+ | BAIXA |
| Button font-weight fora do padrao | ~6 | BAIXA |

**Total de inconsistencias unicas: ~10 categorias, ~170+ ocorrencias**
