---
title: "Story LP-2.3: LP Curso Dev com IA (/curso-dev)"
type: story
status: backlog
epic: LP
complexity: M
agent: sites-dev-alpha
created: 2026-05-26
updated: 2026-05-26
tags: [story, landing-pages, lp, dev, supabase, github, vercel]
related:
  - "[[../../decisions/ADR-landing-pages-cursos]]"
  - "[[LP-1.1-server-action-create-lead-only]]"
  - "[[LP-1.2-shared-components-cursos]]"
---

# Story LP-2.3: LP Curso Dev com IA

## Objetivo
Criar landing page `src/app/curso-dev/page.tsx` para o curso de Dev com IA — sites e apps com agentes (cobertura: módulos 6 e 10 do curso completo — Github/Vercel + Supabase).

## Acceptance Criteria

- [ ] **AC1** — Rota `src/app/curso-dev/page.tsx` existe. Server Component + `export const dynamic = 'force-dynamic'`.
- [ ] **AC2** — `metadata` definido: `title: "Curso de Dev com IA | Sites e Apps com Agentes — João Guirunas"`, `description` ≤ 160 char com angle "Sites e apps no ar, sem escrever código", `alternates.canonical: '/curso-dev'`.
- [ ] **AC3** — JSON-LD `@type: "Course"`, `offers.availability: 'PreOrder'`.
- [ ] **AC4** — Ordem das seções idêntica a LP-2.1.
- [ ] **AC5** — `<CursoHero>` recebe: eyebrow="Curso · Dev com IA", headline="Sites e apps no ar", headlineHighlight="sem digitar uma linha", subhead focado em Github + Vercel + Supabase + agentes. Badges: `{ value: '2', label: 'Módulos' }`, `{ value: '6m', label: 'Acesso' }`, `{ value: 'Squad', label: 'Frontend + QA + Deploy' }`. `priceLabel="Em Breve — R$ 497"`. `source="curso-dev"`.
- [ ] **AC6** — `<CursoCurriculum>` recebe `phases`: Fase 1 "Squad de Sites" (módulo 6 — Github/Vercel), Fase 2 "Squad de Dev com Banco de Dados" (módulo 10 — Supabase). Extraídos do `CursoOnlineTimeline.tsx:71-104`.
- [ ] **AC7** — `<CursoBenefits>` recebe 3 features específicas: "Site profissional no ar em horas", "Banco de dados real com agentes", "Deploy automatizado Github → Vercel". Ícones: `Globe`, `Database`, `Rocket` (de `lucide-react`).
- [ ] **AC8** — `<CursoFaq>` recebe items específicos focados em dev: "Preciso saber programar?" (resposta adaptada: parte do zero), "Funciona com qualquer linguagem?", "O Supabase é gratuito?", "Posso usar para projetos comerciais?", "Vou conseguir criar SaaS?", + "Por quanto tempo tenho acesso?", "E se eu não gostar?".
- [ ] **AC9** — Bloco de Inscrição (id="inscricao") com `<ComingSoonCTA priceLabel="Em Breve — R$ 497" source="curso-dev" />`.
- [ ] **AC10** — `<CursoFinalCTA>` recebe headline "Pronto para virar o", headlineHighlight="dev que você sempre quis contratar?", copy curta + `priceLabel`.
- [ ] **AC11** — Smoke local: form submete e CRM recebe `source="curso-dev"`.
- [ ] **AC12** — Lighthouse Performance ≥ 80 mobile, A11y ≥ 90, SEO ≥ 95.
- [ ] **AC13** — `npm run build` passa.

## Escopo

**IN:**
- `src/app/curso-dev/page.tsx`

**OUT:**
- Mesmos OUTs da LP-2.1.

## Contexto Técnico

- **Bloqueada por LP-1.1 e LP-1.2.**
- Preço placeholder `R$ 497` — confirmar com PO.

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
