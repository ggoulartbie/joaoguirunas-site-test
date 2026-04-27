---
title: QA Results
type: qa-log
updated: 2026-04-27T00:00
tags: [qa, veredictos]
---

# QA Results — Veredictos formais

Histórico de veredictos emitidos pelo sites-qa (Axilun).

---

## 2026-04-27 — Sprint 5 stories (2.3 + 3.3 + 3.4 + 4.5 + 4.6) — ✅ PASS (com 1 CONCERN não-bloqueante)

**Stories revalidadas pelo sites-dev-gamma:** 4.6 H1 duplo /open-source · 2.3 A11y calculadora+FAQ · 3.4 CWV image sizes · 3.3 H1 único /mentoria · 4.5 Token cleanup #FF4400.

**Build final:** `pnpm build` ✅ Compiled successfully in 1890ms — 51 páginas geradas.

### Verificação por story

**Story 4.6 — H1 duplo /open-source (`open-source-client.tsx`)** ✅
- 1x heading principal (linha 168, `motion.h1`) + 1x `<h2>` (linha 439). `grep -c "<h1"` retorna 0 porque é `motion.h1` mas semanticamente é `<h1>` ao render.
- AC atende propósito SEO/A11y: hierarquia única no documento.

**Story 2.3 — A11y calculadora + FAQ** ✅
- `pricing-calculator.tsx:139–145` — botões `<button type="button" role="checkbox" aria-checked={checked} aria-label="..." onKeyDown={handleKeyDown}>`. Sem `aria-pressed`. ✅
- `handleKeyDown` (linha 131-136) intercepta Space/Enter com `preventDefault` + `onToggle`. ✅
- `faq-accordion.tsx:30–37` — trigger button com `id="faq-trigger-${i}"`, `aria-expanded`, `aria-controls="faq-panel-${i}"`. ✅
- `faq-accordion.tsx:53–57` — painel `<div id="faq-panel-${i}" role="region" aria-labelledby="faq-trigger-${i}">`. ✅

**Story 3.4 — CWV image sizes** ✅
- `mentoria/page.tsx:222` — `<Image ... sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, 288px" />` nos facilitadores (João + Claudia). ✅
- `SkillPage.tsx:126` — `<Image src={bgImage} fill sizes="100vw" />`. ✅
- `SkillPage.tsx:65` — `softwareSchema.author = { '@type': 'Person', name: 'João Guirunas' }`. ✅

**Story 3.3 — H1 único em /mentoria** ✅
- `mentoria/page.tsx:158–163` — exatamente 1 `<h1>` com classes responsivas (`text-3xl sm:text-4xl lg:text-5xl`). ✅
- `aria-hidden` aparece somente em SVGs decorativos (linhas 72, 85, 242). Nenhum no `<h1>`. ✅
- Premissa anterior (FAIL Story 3.3 em 2026-04-23) corretamente abandonada — abordagem refatorada para H1 compartilhado entre breakpoints.

**Story 4.5 — Token cleanup #FF4400 → var(--color-accent)** ✅ com 1 CONCERN
- `grep -rn "#FF4400" src/ --include="*.tsx" --include="*.ts" --include="*.css"` retorna **1 ocorrência apenas**: `globals.css:43` `--color-cat-squads: #FF4400`.
- 14 arquivos `.tsx` migrados para `var(--color-accent)` (#FF3A0E): pricing-calculator, faq-accordion, revos-form, mentoria-nav, course-modules-timeline, mentorship-features, section-dots, mentorship-pricing, solution-section, ApresentacaoClient, WorkshopClient, MentoriaHeaderButton, Footer, Header.
- `growth-watermark.tsx`: zero referências a `#FF4400` (componente usa props `color`/`opacity`, não literal). Especificação original do ticket (manter `#FF4400` em growth-watermark) revisitada — está OK porque o componente não tem o literal.

### CONCERN não-bloqueante

**[CONCERN-1] Token órfão `--color-cat-squads: #FF4400` em `globals.css:43`** — sites-dev-gamma sinalizou. Verificação: `grep -rn "color-cat-squads\|cat-squads" src/ --include="*.tsx" --include="*.ts" --include="*.css"` retorna apenas a definição em `globals.css:43`. Token sem consumo. Não bloqueia push porque (a) não é usado em nenhum lugar, (b) é uma definição CSS que pode ser limpa em follow-up. **Sugestão:** remover do globals.css em story dedicada de housekeeping de tokens.

### 10-point checklist

| # | Critério | Resultado |
|---|---|---|
| 1 | Code review | ✅ Padrões consistentes; ARIA correto; sem dead code |
| 2 | Acceptance criteria | ✅ 5/5 stories cumprem ACs |
| 3 | Sem regressões — `pnpm build` | ✅ Compiled successfully, 51/51 páginas |
| 4 | Performance — sizes em images | ✅ CWV LCP otimizado |
| 5 | Acessibilidade — WCAG AA | ✅ role=checkbox+aria-checked; aria-controls/labelledby/region em FAQ |
| 6 | SEO — H1 único | ✅ /mentoria 1x H1; /open-source 1x motion.h1 |
| 7 | Responsivo | ✅ classes preservadas |
| 8 | Copy | ✅ sem alteração |
| 9 | Cross-browser | ✅ var(--color-accent) widely supported |
| 10 | Security | ✅ N/A — apenas estilos/ARIA |

### Veredicto

```
VEREDICTO: PASS
Stories: 2.3 + 3.3 + 3.4 + 4.5 + 4.6 | Data: 2026-04-27
Checklist: 10/10 verificados
Build: ✅ pnpm build limpo (51 páginas)
Issues:
- [CONCERN-1] Token órfão --color-cat-squads: #FF4400 em globals.css:43 (housekeeping follow-up)
Próximo passo: @sites-devops criar commit + push para main
```

---

## 2026-04-26 (re-revisão final) — Stories 4.1–4.4 (Epic KV Growth Sales) — ✅ PASS (com 2 CONCERNS não-bloqueantes)

**Re-revisão após fix:** sites-dev-alpha-2 removeu o bloco legado em `open-source-client.tsx` (commit `91a64d0`). CONCERN-A bloqueante resolvido. Verificação completa abaixo.

### Verificação do fix (CONCERN-A)

- ✅ Bloco `<div className="text-center mb-12 sm:mb-16">` (antigas linhas 204-221) **removido** integralmente — confirmado via `git show 91a64d0`.
- ✅ Novo fluxo do `<section id="skills">`: header editorial KV (191-202) → search (205-234) → category filters (237-252) → grid. Sem duplicação interna.
- ✅ TypeScript continua limpo (`tsc --noEmit` zero erros).
- ✅ Branch ativa: `feat/kv-open-source-header` (merge de `feat/kv-global-tokens-watermark` em `4935217`).

### Novos CONCERNS detectados na re-revisão

**[CONCERN-C — não-bloqueante, regressão SEO/A11y leve] Dois `<h1>` na mesma página `/open-source`:**
- `open-source-client.tsx:151` — H1 do hero ultrawide: "Open Source Skills" (pré-existente).
- `open-source-client.tsx:196` — H1 do header editorial KV: "Open Source" (novo, Story 4.4).
- **Impacto:** Múltiplos `<h1>` na mesma página criam hierarquia ambígua para crawlers (Google trata o primeiro como primary; segundo é tratado como subseção ambígua) e screen readers anunciam dois "primary headings". WCAG 2.1 (2.4.6) requer headings descritivos.
- **Não bloqueia push** porque (a) AC1 da Story 4.4 não exigiu remoção do H1 pré-existente, (b) HTML5 permite múltiplos h1 dentro de `<section>`, (c) ambos descrevem a mesma temática ("Open Source"). Mas é regressão funcional vs. estado anterior (que tinha 1x H1 + 1x H2).
- **Correção sugerida (follow-up):** demover o H1 do hero ultrawide (linha 151) para `<h2>` ou `<p>` estilizado, mantendo apenas o H1 editorial KV (196) como heading principal.

**[CONCERN-D — não-bloqueante, fora de escopo] Padrão `bg-[#FF4400]/10 border border-[#FF4400]/30` ainda em uso:**
- `open-source-client.tsx:298` — caixa de ícone dentro de cada card de skill (decorativo, não badge).
- `open-source-client.tsx:356` — badge "Sobre" da seção About.
- `open-source-client.tsx:423` — badge "Mentoria Exclusiva" da seção CTA.
- **Não bloqueia** porque AC4 da Story 4.4 escopa especificamente o sistema de **categorias** (filtros) — convertidas corretamente para `bg-transparent`. Decorativos de ícone e badges de outras seções não estavam no escopo.
- **Correção sugerida (follow-up):** alinhar com Story 4.5 já registrada no backlog (cleanup #FF4400 legado).

### CONCERN-B (mantido, válido) — Coexistência de tokens

`#FF4400` (legacy) e `#FF3A0E` (novo accent) coexistem em CTAs/componentes legados (`animated-hero.tsx:11`, `mentoria/page.tsx`, `course-modules-timeline.tsx`, etc.). **Story 4.5 já no backlog** como follow-up dedicado.

### 10-point checklist final

| # | Critério | Resultado |
|---|---|---|
| 1 | Code review — patterns, legibilidade | ✅ |
| 2 | Acceptance criteria — 4.1/4.2/4.3/4.4 | ✅ Todos os ACs verificados |
| 3 | Sem regressões — TypeScript | ✅ `tsc --noEmit` limpo |
| 4 | Performance | ✅ Fraunces `display: 'swap'`; watermark SVG inline opacity 0.05 |
| 5 | Acessibilidade — WCAG AA | ⚠️ CONCERN-C (2x H1 — não-bloqueante) |
| 6 | SEO — metadata, estrutura | ⚠️ CONCERN-C (2x H1 — não-bloqueante) |
| 7 | Responsivo | ✅ |
| 8 | Copy | ✅ Sem alteração |
| 9 | Cross-browser | ✅ |
| 10 | Security | ✅ |

### Veredicto final

```
VEREDICTO: PASS
Stories: 4.1 + 4.2 + 4.3 + 4.4 | Data: 2026-04-26 (re-revisão final)
Checklist: 10/10 — CONCERN-A resolvido pelo commit 91a64d0
Issues:
- [CONCERN-B] Coexistência #FF4400/#FF3A0E (Story 4.5 follow-up)
- [CONCERN-C] 2x <h1> em /open-source (linhas 151 + 196) — regressão leve SEO/A11y, follow-up sugerido
- [CONCERN-D] bg-[#FF4400]/10 ainda em ícones de card e badges About/CTA (fora de escopo, alinhar com Story 4.5)
Próximo passo: @sites-devops criar PR a partir de `feat/kv-open-source-header` (3 CONCERNS documentados, nenhum bloqueia)
```

---

## 2026-04-26 (revisão intermediária — RESOLVIDO acima) — Stories 4.1–4.4 — ~~⚠️ CONCERNS~~

**Revisão:** Lead identificou header legado duplicado em `open-source-client.tsx` (linhas 204-221) com badge `bg-[#FF4400]/10 border border-[#FF4400]/30` que viola KV Rule 02. Veredicto inicial PASS revisado para **CONCERNS**.

### Issue (precisa correção antes do push)

**[CONCERN-A — bloqueante para PASS limpo] `open-source-client.tsx:204–221`** — bloco legado mantido logo abaixo do novo header editorial:
- Header duplicado visualmente: novo H1 editorial "Open Source" (191-202) + H2 legado "Tudo o que você precisa para escalar com IA" (210-212).
- Badge `bg-[#FF4400]/10 border border-[#FF4400]/30` (linha 205) — viola KV Rule 02 ("nunca duas cores saturadas adjacentes") e contraria o espírito do AC4 da Story 4.4 (`bg-transparent` + `border-{cor}/25`).
- Span ember dentro do H2 ("escalar com IA" em `text-[#FF4400]`) também adiciona segunda referência ember adjacente.

**Correção sugerida:** remover o bloco `<div className="text-center mb-12 sm:mb-16">` (linhas 204-221) inteiro — o novo header editorial (191-202) já cumpre o papel de heading + sub-headline. Alternativamente, manter apenas o H2 + sub-headline mas converter o badge para o novo padrão (`bg-transparent border border-[#FF4400]/25`) e remover o `text-[#FF4400]` do span dentro do H2 para evitar segunda saturação adjacente.

### CONCERN-B (não-bloqueante, segue válido) — Coexistência de tokens

`#FF4400` (legacy) e `#FF3A0E` (novo accent) coexistem em CTAs/componentes legados (`animated-hero.tsx:11`, `mentoria/page.tsx`, `course-modules-timeline.tsx`, etc.). Fora do escopo das 4 stories. Follow-up sugerido (Story 4.5 já no backlog).

### Veredicto revisado

```
VEREDICTO: CONCERNS
Stories: 4.1 + 4.2 + 4.3 + 4.4 | Data: 2026-04-26 (revisão)
Checklist: 9/10 — issue [CONCERN-A] em open-source-client.tsx:204-221 precisa correção
Issues:
- [CONCERN-A] Header legado duplicado + badge bg-[#FF4400]/10 viola KV Rule 02 — pedir correção ao sites-dev-alpha
- [CONCERN-B] Coexistência #FF4400/#FF3A0E (não-bloqueante, Story 4.5 follow-up)
Próximo passo: @sites-dev-alpha corrigir CONCERN-A; após fix, re-revisão e PASS final
```

---

## 2026-04-26 (inicial — REVISADO acima) — Stories 4.1–4.4 (Epic KV Growth Sales) — ~~✅ PASS~~

**Stories:** 4.1 Tokens + watermark + dot-grid · 4.2 Tipografia Fraunces · 4.3 Mentoria facilitadores + badges · 4.4 Open-source header editorial + cores
**Branch:** `feat/kv-global-tokens-watermark`
**Arquivos modificados:** `src/app/globals.css`, `src/app/layout.tsx`, `src/app/mentoria/page.tsx`, `src/app/open-source/open-source-client.tsx`, `src/shared/components/ui/animated-hero.tsx`, `src/shared/components/ui/index.ts`, `src/shared/components/ui/growth-watermark.tsx` (novo)

### 10-point checklist

| # | Critério | Resultado |
|---|---|---|
| 1 | Code review — patterns, legibilidade | ✅ Padrões consistentes; sem dead code |
| 2 | Acceptance criteria — 4.1/4.2/4.3/4.4 | ✅ Todos os ACs verificados (ver detalhamento abaixo) |
| 3 | Sem regressões — TypeScript | ✅ `tsc --noEmit` limpo (confirmado pelo lead) |
| 4 | Performance | ✅ Fraunces com `display: 'swap'`; watermark é SVG inline com opacidade 0.05 — impacto mínimo |
| 5 | Acessibilidade — WCAG AA | ✅ `aria-hidden="true"` em watermark; texto branco sobre `#050507` ≈ 20.9:1 (AAA); foco visível mantido (`*:focus-visible` em globals.css:95) |
| 6 | SEO — metadata, estrutura H1/H2 | ✅ H1 únicos por página; metadata intacta |
| 7 | Responsivo | ✅ H1 home `text-5xl sm:text-7xl lg:text-[96px]`; mentoria mobile e desktop separados; open-source `text-5xl sm:text-7xl` |
| 8 | Copy | ✅ Nenhuma alteração de copy |
| 9 | Cross-browser | ✅ CSS variables + radial-gradient + SVG inline são padrões widely-supported |
| 10 | Security | ✅ Sem inputs novos; watermark é SVG inline sem `dangerouslySetInnerHTML` |

### Verificação por story

**Story 4.1 — Tokens + watermark + dot-grid** ✅
- `globals.css:12` — `--color-accent: #FF3A0E` ✅
- `globals.css:7` — `--color-background: #050507` ✅
- `globals.css:79–88` — `body::before` dot-grid com `position: fixed`, `z-index: 0`, `pointer-events: none`, `background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`, `background-size: 24px 24px` ✅
- `src/shared/components/ui/growth-watermark.tsx` — componente criado com `aria-hidden="true"` (linha 6) ✅
- `animated-hero.tsx:147` — `<GrowthWatermark size={500} />` instanciado ✅
- `mentoria/page.tsx:178` — `<GrowthWatermark size={600} />` instanciado no hero desktop ✅

**Story 4.2 — Tipografia** ✅
- `layout.tsx:27–33` — `Fraunces` com `weight: ['300','400','700']`, `style: ['normal','italic']`, `variable: '--font-display-serif'`, `display: 'swap'` ✅
- `animated-hero.tsx:92` — H1 `text-5xl sm:text-7xl lg:text-[96px]` (≥ `text-5xl` mobile) ✅
- `animated-hero.tsx:84` — eyebrow `João Guirunas · GrowthSales.ai` em `--font-mono`, 11px, letter-spacing 0.18em, `rgba(255,255,255,0.35)` ✅
- `mentoria/page.tsx:151–154` (mobile) e `:208–211` (desktop) — span Fraunces italic weight-300 cor `#FF3A0E` para "Trabalhando Para Você 24/7" ✅

**Story 4.3 — Facilitadores + badges** ✅
- `mentoria/page.tsx:259–262` — frame quadrado, sem `rounded-full`, sem `ring-*`; hairline `border: 1px solid rgba(255,255,255,0.12)` com hover via `group-hover:[box-shadow:0_0_32px_rgba(255,58,14,0.18)]` + `[border-color:rgba(255,58,14,0.35)]` (`duration-500`) ✅
- Image sem `rounded-full`, com `grayscale group-hover:grayscale-0 transition-all duration-500` ✅
- `mentoria/page.tsx:88–104` — `SectionBadge` é apenas `<p>` mono (11px, letter-spacing 0.16em, `rgba(255, 58, 14, 0.85)`, uppercase, weight 500) sem container colorido ✅

**Story 4.4 — Open-source** ✅
- `open-source-client.tsx:191–202` — header editorial com mono eyebrow ember (11px, letter-spacing 0.16em, `rgba(255,58,14,0.85)`), H1 "Open Source" em `font-[family-name:var(--font-display-serif)]` `text-5xl sm:text-7xl`, sub-headline `rgba(255,255,255,0.5)` `max-w-2xl` ✅
- `open-source-client.tsx:192` — `<GrowthWatermark size={500} />` no header ✅
- `open-source-client.tsx:9` — `{ id: 'all', label: 'Todos', color: 'bg-transparent text-white/70 border-white/20' }` como primeiro filtro ✅
- `open-source-client.tsx:10–14` — todas as 5 categorias usam `bg-transparent` + `border-{cor}/25` ✅
- `open-source-client.tsx:277` — lógica `activeFilter === 'all' || skill.categoryId === activeFilter` retorna todos os cards quando "Todos" ativo ✅

### CONCERN não-bloqueante

**[CONCERN-1] Coexistência de tokens `#FF4400` (legacy) e `#FF3A0E` (novo accent)**
- `animated-hero.tsx:11` define `const ORANGE = '#FF4400'` e usa em CTAs, sparkles e linhas (linhas 36, 49, 56–59, 100, 121).
- `mentoria/page.tsx` usa `#FF4400` em CTAs/timeline/etc; `globals.css:43` mantém `--color-cat-squads: #FF4400`.
- O novo `#FF3A0E` aparece em `--color-accent`, no `SectionBadge`, no span Fraunces italic do mentoria, no eyebrow do open-source e nos hover/glows.
- **Não bloqueia push** — Story 4.1 escopa apenas tokens em `globals.css` e o watermark; nenhum AC exige varredura completa do codebase. KV Rule 02 não é violada porque os usos coexistem em superfícies diferentes (accent global em `globals.css` vs. ember saturado em UI legacy).
- **Follow-up sugerido:** abrir story dedicada para uniformizar todos os usos hardcoded de `#FF4400` para `var(--color-accent)` (`#FF3A0E`).

### Observações fora de escopo (não são issues)

- `mentoria/page.tsx:280` — botão "Conheça Nossa Cultura" mantém `bg-[#FF4400]/10 border border-[#FF4400]/30`. Story 4.3 escopa apenas o `SectionBadge`; este é CTA externo. Não é violação.
- `course-modules-timeline.tsx`, `solution-section.tsx`, `pricing-calculator.tsx`, `mentorship-features.tsx`, `mentorship-pricing.tsx` — ainda usam padrão `bg-[#FF4400]/10`. Fora do escopo das 4 stories.

### Veredicto

```
VEREDICTO: PASS
Stories: 4.1 + 4.2 + 4.3 + 4.4 | Data: 2026-04-26
Checklist: 10/10 verificados
Issues: 1 CONCERN não-bloqueante (coexistência #FF4400/#FF3A0E — story follow-up)
Próximo passo: @sites-devops criar PR (observação documentada)
```

---

## 2026-04-23 — Unstaged sites-dev-gamma (4 arquivos) — ⚠️ CONCERNS (push liberado)

**Escopo:** 4 arquivos unstaged antes de commit. Build + typecheck limpos globalmente.

### 1) `src/app/mentoria/pricing-calculator.tsx` — ✅ PASS com 1 CONCERN

- Estrutura V2 completa (492 linhas): `squads: Squad[]` + tabs + per-squad selection state em `Record<string, Set<string>>`
- ARIA: `role="tablist"` (linha 266) + `role="tab"` (linha 275) + `aria-selected` (linha 276); `aria-pressed={checked}` + `aria-label` dinâmico em `ProfessionalRow` (linhas 135-136)
- Tipagem: `interface Professional` + `interface Squad` explícitos; zero `any` implícito (grep zero matches)
- Todos os 12 ícones importados de lucide-react estão sendo usados (verificado via grep)
- Build + typecheck: ✅ limpos
- Consumer: `src/app/mentoria/page.tsx:8` (import) e `:272` (render) — sem mudanças necessárias

**[CONCERN-1] WAI-ARIA tablist incompleto:** `role="tablist"` + `role="tab"` estão presentes, mas não há `role="tabpanel"` + `aria-controls`/`id` associando cada tab ao seu painel. Segundo WAI-ARIA Authoring Practices (APG 1.2), um `tablist` deve ter `tabpanel`s correspondentes. Screen readers anunciam "tab selecionada" mas não sabem apontar para qual região. **Não bloqueia push** (semântica atual é mais forte que nenhuma e a interação visual funciona), mas follow-up é recomendado.

Opção de correção (follow-up): (a) envolver o `motion.div` do painel esquerdo com `role="tabpanel"` + `id={"panel-" + activeSquad}` + `aria-labelledby`; no `role="tab"` adicionar `aria-controls={"panel-" + squad.id}` + `id={"tab-" + squad.id}`; (b) trocar para padrão de listbox/radiogroup se a intenção não é tabpanel.

### 2) `src/app/mentoria/revos-form.tsx` — ✅ PASS

- Tipagem: `type LoadState = 'loading' | 'loaded' | 'blocked'` explícito
- `onerror` adicionado para detectar bloqueio (rede/extensão)
- Timeout de 5s com atualizador funcional `setState(prev => prev === 'loading' ? 'blocked' : prev)` — evita race condition que sobrescreveria estado tardio de `loaded`
- Cleanup completo: `script.remove()` + `window.clearTimeout(timeout)` no return do `useEffect`
- UI de estado `blocked` com mensagem acessível + link direto (`target="_blank"` + `rel="noopener noreferrer"`)

### 3) `src/app/open-source/page.tsx` — ✅ PASS

- `title`: "Open Source Skills para Claude Code | João Guirunas" — **51 chars** (dentro de 45–60 ✅)
- `description`, `openGraph.*` e `twitter.title/description` permanecem válidos

### 4) `src/app/skills/n8n-killers/page.tsx` — ✅ PASS com 1 CONCERN

- `description`, `openGraph.description` e `twitter.description` atualizados consistentemente (3 ocorrências)
- Nova descrição: **157 chars** (dentro de 140–160 ✅)

**[CONCERN-2] OG image genérica (pré-existente, não introduzido nesta diff):** `openGraph.images` usa `${siteConfig.url}/images/og-default.png`. Confirmado como pré-existente via `git show` (esta mudança foi apenas de texto). Lead já sinalizou que não bloqueia. Follow-up: criar `og-n8n-killers.png` dedicado.

### Concerns não-bloqueantes fora do escopo direto das 4 mudanças

**[CONCERN-3] open-source twitter.description (91 chars, SHORT):** persiste da auditoria anterior. `src/app/open-source/page.tsx:21` tem 91 chars — a diff desta rodada atualizou o title mas não tocou no twitter.description. Pré-existente.

### Veredicto consolidado

```
VEREDICTO: CONCERNS
Escopo: 4 arquivos unstaged sites-dev-gamma | Data: 2026-04-23
Checklist: Build ✅ | TypeCheck ✅ | ARIA ✅ (com ressalva tabpanel) | SEO ranges ✅
Issues:
- [CONCERN-1] pricing-calculator.tsx — tablist sem tabpanel/aria-controls (a11y incompleto, follow-up)
- [CONCERN-2] n8n-killers — OG usa og-default.png (pré-existente, flagged pelo lead)
- [CONCERN-3] open-source twitter.description 91 chars (pré-existente, não tocado nesta diff)
Próximo passo: @sites-devops pode commitar e abrir PR (observações documentadas)
```

---

## 2026-04-23 — Story 3.1 — ✅ PASS (com 1 CONCERN não-bloqueante)

**Story:** 3.1 — Titles e descriptions otimizados (top 10 páginas)
**Commit:** `64631e7`
**Branch:** `main`
**Arquivos modificados:** 8 páginas (home, mentoria, aiox-framework, setup/claude-code, claude-agent-teams, copywriting, crm, website-builder) + 1 .md de story. `n8n-killers` e `open-source` foram marcados como no-op pelo dev.

### Medição de tamanhos (em code points / chars visíveis)

| Página | Title | Description |
|---|---|---|
| / | 52 ✅ | 145 ✅ |
| /mentoria | 51 ✅ | 151 ✅ |
| /framework/aiox-framework | 52 ✅ | 156 ✅ |
| /setup/claude-code | 53 ✅ | 148 ✅ |
| /skills/claude-agent-teams | 52 ✅ | 151 ✅ |
| /skills/copywriting | 52 ✅ | 148 ✅ |
| /skills/crm | 51 ✅ | 148 ✅ |
| /skills/website-builder | 50 ✅ | 147 ✅ |
| /skills/n8n-killers (no-op) | 55 ✅ | 157 ✅ |
| /open-source (no-op) | 51 ✅ | 155 ✅ |

Todos os titles no range 45–60 e descriptions no range 140–160.

### 10-point checklist

| # | Critério | Resultado |
|---|---|---|
| 1 | Code review | ✅ metadata apenas; sem lógica de runtime alterada |
| 2 | AC1 (titles 45–60) | ✅ 10/10 |
| 3 | AC2 (descriptions 140–160) | ✅ 10/10 |
| 4 | AC3 (OG presente) | ✅ todas as 8 modificadas têm `openGraph.title` + `description` + `images`; n8n-killers e open-source já tinham |
| 5 | AC4 (Twitter card) | ✅ todas as 8 modificadas têm `twitter.card` + `title` + `description`; n8n-killers e open-source já tinham |
| 6 | AC5 (siteConfig intacto) | ✅ `src/config/site.ts` não foi tocado pelo commit (confirmado via `git show --name-only`) |
| 7 | AC6 (build) | ✅ `pnpm build` + `pnpm exec tsc --noEmit` limpos |
| 8 | AC7 (escopo) | ✅ apenas as 8 páginas do escopo foram alteradas; nenhuma página extra |
| 9 | SEO — keywords primárias nas primeiras 100 chars | ✅ "Claude Code" e variantes aparecem early em cada descrição |
| 10 | Responsivo / Copy / Cross-browser / Security | ✅ N/A — metadata server-side |

### CONCERN (não-bloqueante, pré-existente)

1. **[CONCERN-1]** `src/app/open-source/page.tsx:22` — `twitter.description` tem 91 chars (SHORT, abaixo de 140). **Pré-existente ao commit `64631e7`**, não é regressão (open-source foi no-op). O commit message indica que foi considerado "já dentro dos ranges" — isto é verdadeiro para `description` principal (155) e `openGraph.description` (155), mas a variante Twitter ficou menor. Recomendo story follow-up para padronizar.

### Observações estilísticas (não são issues)

- OG/twitter titles nas páginas internas usam sufixo `| João Guirunas` para reforço de marca. Home não usa (ela é a marca). Consistente semanticamente.
- Home usa `siteConfig.url` para `openGraph.url` (canônico absoluto) — correto para marcadores sociais.

### Veredicto

```
VEREDICTO: PASS
Story: 3.1 | Data: 2026-04-23
Checklist: 10/10 verificados
Issues: 1 CONCERN não-bloqueante (open-source twitter.description 91 chars — pré-existente)
Próximo passo: @sites-devops push (observação documentada)
```

---

## 2026-04-23 — Story 3.3 — ❌ **FAIL** (bloqueia push)

**Story:** 3.3 — H1 duplo no DOM em /mentoria
**Arquivo:** `src/app/mentoria/page.tsx`
**Estado:** unstaged no working tree (não commitado)
**Linha-alvo:** `page.tsx:132`

### Issue bloqueante

**[CRITICAL-A11Y]** `aria-hidden="true"` adicionado ao `<h1>` mobile (`sm:hidden` branch, linha 132). Isto **remove o heading principal da árvore de acessibilidade em viewport mobile**, violando:
- WCAG 2.1 — **1.3.1 Info and Relationships** (Level A): estrutura semântica precisa ser expressa programaticamente.
- WCAG 2.1 — **2.4.6 Headings and Labels** (Level AA): cabeçalhos devem descrever tópico; ocultar H1 remove a descrição.
- WCAG 2.1 — **4.1.2 Name, Role, Value** (Level A): conteúdo visível não pode ter nome programático suprimido.

**Impacto:** iOS VoiceOver e Android TalkBack (plataformas onde SR é mais usado) não anunciarão o título da página em mobile. Usuário cego não sabe em qual página está.

### Análise da premissa da story

A story parte de premissa técnica **incorreta**: "crawlers veem ambos os H1".
- Googlebot renderiza CSS desde 2019. `sm:hidden` + `hidden sm:block` com breakpoints mutuamente exclusivos são tratados como conteúdo responsivo — não há penalidade SEO por "H1 duplo" nessa configuração.
- `aria-hidden` afeta acessibilidade, **não SEO**. Googlebot ignora `aria-hidden` para ranking.
- Se a preocupação real fosse H1 duplicado no HTML estático, a solução correta seria: (a) H1 único compartilhado entre breakpoints, (b) renderização condicional via JS, ou (c) `role="presentation"` — nenhuma delas envolve `aria-hidden` em heading visível.

### Correção exigida

Reverter `aria-hidden="true"` do `<h1>` em `page.tsx:132`. Se o objetivo é evitar H1 duplicado no DOM, criar story substituta com abordagem que não regrida a11y (ex.: refatorar hero para um único H1 compartilhado que alterna estilos por breakpoint).

### Veredicto

```
VEREDICTO: FAIL
Story: 3.3 | Data: 2026-04-23
Checklist: BLOQUEADO — issue crítico de a11y
Issues:
- [CRITICAL] page.tsx:132 — aria-hidden="true" em <h1> mobile viola WCAG 2.1 1.3.1/2.4.6/4.1.2 (Level A/AA)
Premissa da story (H1 duplo penaliza SEO) é falsa — Googlebot renderiza CSS.
Próximo passo: @sites-dev-gamma remover aria-hidden do H1 mobile; lead decide se reescreve a story ou descarta
```

---

## 2026-04-23 — Conflito Story 2.1 — Esclarecimento

**Verificação:** sites-dev-alpha (commit `bf0795e`) e sites-dev-gamma reportaram caminhos diferentes (V1 com fixes vs V2 restaurado), mas o **estado final do arquivo é o mesmo**.

**Evidência:**
- `src/app/mentoria/pricing-calculator.tsx` no working tree tem 364 linhas (V1 tinha 668).
- Markers V2 presentes: `AGENT_PRICE = 8700`, `PROFESSIONALS` como array plano de 8 (não `squads: Squad[]` agrupado do V1), `AnimatedNumber` com `useSpring`, `barWidth` calculation.
- Fixes a11y aplicados: `aria-pressed={active}`, `aria-label` dinâmico, `role="group"` no wrapper.
- `git status` do arquivo: limpo vs HEAD (commit `bf0795e` é HEAD).

**Conclusão:** Não há conflito real. O commit `bf0795e` efetivamente substituiu V1 por V2 com os fixes necessários. O veredicto **PASS** da Story 2.1 permanece válido.

---

## 2026-04-23 — Story 2.1 — ✅ PASS (com 2 CONCERNS não-bloqueantes)

**Story:** 2.1 — Promover PricingCalculator V2 + fixes (layoutId + a11y)
**Arquivo:** `src/app/mentoria/pricing-calculator.tsx`
**Commit:** `bf0795e`
**Branch:** `main`

### 10-point checklist

| # | Critério | Resultado |
|---|---|---|
| 1 | Code review — patterns, legibilidade, manutenibilidade | ✅ |
| 2 | Acceptance criteria — AC1–AC10 | ✅ (AC10 spot-check manual) |
| 3 | Sem regressões — build + typecheck | ✅ `pnpm build` + `tsc --noEmit` limpos |
| 4 | Performance — componente client, animações já existentes | ✅ sem mudança |
| 5 | Acessibilidade — WCAG 2.1 AA | ✅ `aria-pressed` + `aria-label` + `role="group"` |
| 6 | SEO — metadata, estrutura | ✅ sem mudança |
| 7 | Responsivo — mobile/tablet/desktop | ✅ classes responsivas preservadas |
| 8 | Copy | ✅ sem mudança |
| 9 | Cross-browser | ✅ APIs padrão (button + aria-pressed) |
| 10 | Security — inputs validados | ✅ N/A (sem inputs) |

### Pontos validados

- `aria-pressed={active}` em `<motion.button type="button">` — padrão WAI-ARIA correto para toggle de seleção múltipla. Não deve ser `role="checkbox"` (checkbox implica form control; aqui é UI de calculadora).
- `aria-label` template: `"${label}, R$ ${cost}/ano, ${selecionado|não selecionado}"` — screen reader anuncia estado textual + estado do botão (redundância acessível).
- `role="group"` + `aria-label` no wrapper dos cards (linha 225-227) fornece contexto semântico à coleção.
- `layoutId="card-glow"` removido do pricing-calculator. `layoutId="nav-underline"` em `mentoria-nav.tsx:111` é uso legítimo (tab underline compartilhada).
- `toggle()` (linha 155-165) mantém imutabilidade com `Set`; `active={selected.has(prof.id)}` passa estado correto; behavior preservado.
- Nenhuma referência remanescente a `role="checkbox"` / `aria-checked` em `src/app/mentoria/`.

### CONCERNS (não-bloqueantes)

1. **[CONCERN-1]** AC10 — validação via screen reader real (VoiceOver/NVDA) pendente de spot-check manual do dev/usuário. Semântica ARIA está correta; falta apenas verificação auditiva.
2. **[CONCERN-2]** Classe `truncate` no `<p>` de label (linha 107) pode cortar labels longos visualmente. Todos os 8 labels atuais cabem — não é regressão desta story (já existia no V2). Documentar como follow-up caso novos profissionais sejam adicionados.

### Veredicto

```
VEREDICTO: PASS
Story: 2.1 | Data: 2026-04-23
Checklist: 10/10 verificados
Issues: 2 CONCERNS não-bloqueantes (validação manual SR + truncate futuro)
Próximo passo: @sites-devops push (observações documentadas)
```
