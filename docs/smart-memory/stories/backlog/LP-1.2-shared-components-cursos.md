---
title: "Story LP-1.2: Componentes compartilhados das LPs em src/app/cursos/_shared/"
type: story
status: backlog
epic: LP
complexity: M
agent: sites-dev-alpha
created: 2026-05-26
updated: 2026-05-26
tags: [story, landing-pages, shared-components, ui]
related:
  - "[[../../decisions/ADR-landing-pages-cursos]]"
  - "[[LP-1.1-server-action-create-lead-only]]"
  - "[[LP-2.1-curso-ia-agentes]]"
  - "[[LP-2.2-curso-design]]"
  - "[[LP-2.3-curso-dev]]"
  - "[[LP-2.4-curso-social-media]]"
  - "[[LP-2.5-curso-bundle]]"
---

# Story LP-1.2: Componentes compartilhados das LPs em src/app/cursos/_shared/

## Objetivo
Extrair e criar a biblioteca de componentes shared para as 5 LPs em `src/app/cursos/_shared/`, parametrizando o que hoje está duplicável em `curso-online/_components/`. Inclui `LeadForm`, `ComingSoonCTA`, `CursoHero`, `CursoBenefits`, `CursoCurriculum`, `CursoFacilitadores`, `CursoFaq`, `CursoFinalCTA`, `PhoneField` (movido) e `types.ts`.

## Acceptance Criteria

- [ ] **AC1** — Diretório `src/app/cursos/_shared/` criado com os arquivos: `LeadForm.tsx`, `ComingSoonCTA.tsx`, `CursoHero.tsx`, `CursoBenefits.tsx`, `CursoCurriculum.tsx`, `CursoFacilitadores.tsx`, `CursoFaq.tsx`, `CursoFinalCTA.tsx`, `PhoneField.tsx`, `types.ts`.
- [ ] **AC2** — `types.ts` define interfaces: `CursoLpConfig` (slug, eyebrow, headline, headlineHighlight, subhead, badges, modules, faqItems, finalCtaHeadline, finalCtaCopy, priceLabel, source), `Module` (num, type, title, description, tags), `FaqItem` (q, a), `Phase` (label, items). Sem `any`.
- [ ] **AC3** — `LeadForm.tsx` é Client Component (`'use client'`). Usa `useActionState` chamando `createLeadOnly` (importado de `@/app/actions/leadCapture`). Campos: Nome, Email, WhatsApp (via `PhoneField`). Hidden `source`. Botão CTA: "Quero ser avisado(a)". Em sucesso (`state?.ok === true`), substitui o form por bloco "Recebemos seu contato! Avisamos assim que abrir." Em erro, mostra mensagem inline (padrão de `checkout-form.tsx:96-107`).
- [ ] **AC4** — `ComingSoonCTA.tsx` renderiza botão estilizado mas **não-clicável**: `aria-disabled="true"`, `tabIndex={-1}`, sem `<button type="submit">`. Label parametrizada via prop `priceLabel` (ex.: `"Em Breve — R$ 797"`). Opacity ~60% + cursor not-allowed. Logo abaixo renderiza o `LeadForm`. Componente recebe prop `source: string` para passar ao form.
- [ ] **AC5** — `CursoHero.tsx` recebe props `{ eyebrow, headline, headlineHighlight, subhead, badges: { value, label }[], priceLabel, source }`. Visual idêntico ao `CursoOnlineHero.tsx:21-94` (background radial, dot-grid, KV_DISPLAY, KV_MONO). O bloco do botão de compra é substituído por **link âncora** para `#inscricao` com label igual a `priceLabel`. Sem `dynamic = 'force-dynamic'` (componente).
- [ ] **AC6** — `CursoBenefits.tsx` recebe prop `features: { icon: ReactNode; title: string; highlights: string[] }[]`. Reusa visual de `CursoOnlineDiferenciais.tsx` (carousel mobile + grid 3 colunas desktop). Animações Framer Motion preservadas.
- [ ] **AC7** — `CursoCurriculum.tsx` recebe prop `phases: Phase[]` e título `{ eyebrow, headline, headlineHighlight, subhead, badges, ctaLabel }`. Reusa visual da `CursoOnlineTimeline.tsx` (fases, timeline cards, separators). CTA âncora `#inscricao`.
- [ ] **AC8** — `CursoFacilitadores.tsx` é estático (não recebe props além de classe opcional). Mesma dupla João + Claudia hard-coded conforme `curso-online/page.tsx:91-106` e `:153-216`. Imports de `Image` e `next/link` preservados.
- [ ] **AC9** — `CursoFaq.tsx` recebe prop `items: FaqItem[]` + título opcional. Visual idêntico ao `CursoFaqAccordion.tsx` (open/close state, aria-expanded, aria-controls com keys únicos do contexto da LP — usar `useId()` para evitar colisões caso 2 accordions coexistam).
- [ ] **AC10** — `CursoFinalCTA.tsx` recebe `{ headline, headlineHighlight, copy, priceLabel, source }`. Renderiza headline final + `ComingSoonCTA` interno. Visual baseado em `curso-online/page.tsx:337-369`.
- [ ] **AC11** — `PhoneField.tsx` é **movido** de `curso-online/_components/PhoneField.tsx` para `cursos/_shared/PhoneField.tsx` (mesmo conteúdo, mesma API). Import em `curso-online/_components/checkout-form.tsx:8` atualizado para apontar para o novo caminho. Curso-online continua funcionando idêntico.
- [ ] **AC12** — Todos os componentes shared **não importam** nada de `src/app/curso-online/_components/` — apenas inverso (curso-online pode importar de shared, ex.: `PhoneField`). Garante a direção da dependência.
- [ ] **AC13** — `npm run build` passa. Curso-online renderiza idêntico (smoke visual: hero, diferenciais, timeline, facilitadores, FAQ, CTA final aparecem sem regressão).
- [ ] **AC14** — Sem testes unitários novos (escopo). QA visual é coberto na LP-3.1.

## Escopo

**IN:**
- `src/app/cursos/_shared/` (10 arquivos novos)
- Move de `src/app/curso-online/_components/PhoneField.tsx` para `src/app/cursos/_shared/PhoneField.tsx`
- Atualizar import em `src/app/curso-online/_components/checkout-form.tsx`

**OUT:**
- Refatorar `CursoOnlineHero`, `CursoOnlineDiferenciais`, `CursoOnlineTimeline`, `CursoOnlineDiferenciais`, `CursoFaqAccordion` para consumir os shared. (Pode virar follow-up futuro; por ora curso-online mantém seus componentes próprios para evitar regressão.)
- `CursoPricingCalculator`, `CursoSquadSection`, `CursoSquadsSticky` — não migram (específicos do curso completo).
- A11y avançada / animações novas (preservar o que já existe).
- Storybook ou playground visual.

## Contexto Técnico

- App Router: `_shared/` (com underscore) é tratado como pasta privada e não vira rota — segura para guardar componentes.
- Tokens visuais (`KV_DISPLAY`, `KV_MONO`, cor `#FF3A0E`) inline ou via CSS vars já existentes (`--font-display-serif`, `--font-mono`, `--color-accent`). Mantém paridade visual com curso-online.
- `useActionState` em `LeadForm` requer Client Component. Server action é importada do server file.
- `useId()` para o accordion evita ID collision se um dia 2 FAQ coexistirem na mesma página (defensivo).
- Bloqueia LP-2.1 a LP-2.5. Pode rodar em paralelo a LP-1.1 (dev pode mockar a action inicialmente).

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | sites-dev-alpha |
| Iniciado   | — |
| Concluído  | — |
| Branch     | `feat/landing-pages-cursos` |

## File List
<!-- Dev preenche ao concluir -->

## QA Results
<!-- QA cobre na LP-3.1 -->
