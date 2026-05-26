---
title: "Story LP-2.2: LP Curso Design com IA (/curso-design)"
type: story
status: backlog
epic: LP
complexity: M
agent: sites-dev-alpha
created: 2026-05-26
updated: 2026-05-26
tags: [story, landing-pages, lp, design, claude-design]
related:
  - "[[../../decisions/ADR-landing-pages-cursos]]"
  - "[[LP-1.1-server-action-create-lead-only]]"
  - "[[LP-1.2-shared-components-cursos]]"
---

# Story LP-2.2: LP Curso Design com IA

## Objetivo
Criar landing page `src/app/curso-design/page.tsx` para o curso de Design com IA — Claude Design + Design Systems (cobertura: módulo 5 do curso completo).

## Acceptance Criteria

- [ ] **AC1** — Rota `src/app/curso-design/page.tsx` existe. Server Component + `export const dynamic = 'force-dynamic'`.
- [ ] **AC2** — `metadata` definido: `title: "Curso de Design com IA | Claude Design — João Guirunas"` (≤ 70 char), `description` ≤ 160 char com angle "Design systems profissionais com IA, sem ser designer", `alternates.canonical: '/curso-design'`.
- [ ] **AC3** — JSON-LD `@type: "Course"`, `offers.availability: 'PreOrder'`, mesma estrutura da LP-2.1.
- [ ] **AC4** — Ordem das seções idêntica a LP-2.1: `<SolarSystemBackground />`, `<SectionDots />`, `<CursoHero>`, `<CursoBenefits>`, `<CursoCurriculum>`, `<CursoFacilitadores>`, inscrição (id="inscricao") com `<ComingSoonCTA>`, `<CursoFaq>`, `<CursoFinalCTA>`.
- [ ] **AC5** — `<CursoHero>` recebe: eyebrow="Curso · Design com IA", headline="Design Systems", headlineHighlight="que se montam sozinhos", subhead focado em paleta, tipografia, componentes via agentes. Badges: `{ value: '1', label: 'Módulo Aprofundado' }`, `{ value: '6m', label: 'Acesso' }`, `{ value: 'Claude Design', label: 'Agente Dedicado' }`. `priceLabel="Em Breve — R$ 397"`. `source="curso-design"`.
- [ ] **AC6** — `<CursoCurriculum>` recebe `phases` cobrindo módulo 5 — "Claude Design — Design System" (descritivo, tags `Design System`, `Claude Design`, `Componentes`). Pode subdividir o módulo em 3-4 sub-aulas (Paleta, Tipografia, Componentes, Tokens) para dar densidade à timeline. Fase única "Design System Completo".
- [ ] **AC7** — `<CursoBenefits>` recebe 3 features específicas: "Paleta e tipografia em minutos", "Componentes consistentes sem designer", "Tokens prontos para integrar no código". Ícones: `Palette`, `Type`, `Layers` (de `lucide-react`).
- [ ] **AC8** — `<CursoFaq>` recebe items específicos focados em design (subset de `CursoFaqAccordion.tsx`): "Preciso saber Figma?", "Funciona para web e mobile?", "Posso usar para clientes?", "Vou aprender Figma também?" (resposta: foco é Claude Design + tokens, não Figma diretamente), + "Por quanto tempo tenho acesso?", "E se eu não gostar?".
- [ ] **AC9** — Bloco de Inscrição (id="inscricao") com `<ComingSoonCTA priceLabel="Em Breve — R$ 397" source="curso-design" />`.
- [ ] **AC10** — `<CursoFinalCTA>` recebe headline "Pronto para acabar com a desculpa", headlineHighlight="\"não sei design\"?", copy curta + `priceLabel`.
- [ ] **AC11** — Smoke local: form submete e CRM recebe `source="curso-design"`.
- [ ] **AC12** — Lighthouse Performance ≥ 80 mobile, A11y ≥ 90, SEO ≥ 95.
- [ ] **AC13** — `npm run build` passa.

## Escopo

**IN:**
- `src/app/curso-design/page.tsx`

**OUT:**
- Mesmos OUTs da LP-2.1.

## Contexto Técnico

- **Bloqueada por LP-1.1 e LP-1.2.**
- Preço placeholder `R$ 397` (individual). Bundle LP-2.5 mostra preço cheio com desconto. Confirmar valor com PO antes do go-live.

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
