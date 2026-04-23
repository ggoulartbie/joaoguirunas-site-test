---
title: QA Results
type: qa-log
updated: 2026-04-23T22:00
tags: [qa, veredictos]
---

# QA Results — Veredictos formais

Histórico de veredictos emitidos pelo sites-qa (Axis-S).

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
