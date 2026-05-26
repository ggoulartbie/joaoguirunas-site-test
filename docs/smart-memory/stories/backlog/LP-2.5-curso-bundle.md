---
title: "Story LP-2.5: LP Bundle — Todos os 4 Cursos (/curso-bundle)"
type: story
status: backlog
epic: LP
complexity: M
agent: sites-dev-alpha
created: 2026-05-26
updated: 2026-05-26
tags: [story, landing-pages, lp, bundle, sitemap]
related:
  - "[[../../decisions/ADR-landing-pages-cursos]]"
  - "[[LP-1.1-server-action-create-lead-only]]"
  - "[[LP-1.2-shared-components-cursos]]"
  - "[[LP-2.1-curso-ia-agentes]]"
  - "[[LP-2.2-curso-design]]"
  - "[[LP-2.3-curso-dev]]"
  - "[[LP-2.4-curso-social-media]]"
---

# Story LP-2.5: LP Bundle — Todos os 4 Cursos

## Objetivo
Criar landing page `src/app/curso-bundle/page.tsx` para o pacote completo dos 4 cursos (IA & Agentes + Design + Dev + Social Media). Posicionada como a oferta principal — combo com preço cheio + desconto sugerido. Também consolidar atualização do `sitemap.ts` com as 5 LPs.

## Acceptance Criteria

- [ ] **AC1** — Rota `src/app/curso-bundle/page.tsx` existe. Server Component + `export const dynamic = 'force-dynamic'`.
- [ ] **AC2** — `metadata` definido: `title: "Bundle Completo — 4 Cursos de IA com Agentes | João Guirunas"` (≤ 70 char), `description` ≤ 160 char com angle "O pacote completo: a squad de IA por trás do seu negócio", `alternates.canonical: '/curso-bundle'`.
- [ ] **AC3** — JSON-LD `@type: "Course"` + `hasCourseInstance` que referencia os 4 cursos individuais. `offers.availability: 'PreOrder'`, `offers.price: '1497'` (placeholder de bundle — confirmar com PO), `offers.priceCurrency: 'BRL'`.
- [ ] **AC4** — Ordem das seções: `<SolarSystemBackground />`, `<SectionDots />`, `<CursoHero>` (especial — destaca bundle), `<CursoBenefits>` (com features do combo), **novo bloco `<BundleCoursesGrid />` (4 cards linkando para as LPs individuais)**, `<CursoCurriculum>` (consolidado com todas as fases dos 4 cursos — paridade com `curso-online/page.tsx`), `<CursoFacilitadores>`, bloco de Inscrição (id="inscricao") com `<ComingSoonCTA>`, `<CursoFaq>`, `<CursoFinalCTA>`.
- [ ] **AC5** — `<CursoHero>` recebe: eyebrow="Pacote Completo · 4 Cursos", headline="A squad de IA por trás do", headlineHighlight="seu negócio inteiro", subhead destacando que é o combo dos 4 (IA & Agentes, Design, Dev, Social). Badges: `{ value: '4', label: 'Cursos' }`, `{ value: '11', label: 'Módulos' }`, `{ value: '6m', label: 'Acesso' }`. `priceLabel="Em Breve — R$ 1.497"`. `source="curso-bundle"`.
- [ ] **AC6** — Novo componente `BundleCoursesGrid` em `src/app/curso-bundle/_components/BundleCoursesGrid.tsx` renderiza 4 cards (IA & Agentes, Design, Dev, Social) com: ícone, título, copy 1-liner, link `Link` (next/link) para a LP individual respectiva. Estilo paridade com `CursoOnlineDiferenciais` (cards bordered black/50, hover laranja).
- [ ] **AC7** — `<CursoCurriculum>` recebe `phases` completos cobrindo todos os 10 módulos do curso (paridade com `CursoOnlineTimeline.tsx:23-105` — Fundamentos + Semana 1 + Semana 2 + Semana 3 + Semana 4).
- [ ] **AC8** — `<CursoBenefits>` recebe 3 features de combo: "4 áreas, 1 acesso", "Desconto vs. comprar separado", "A squad completa para qualquer negócio". Ícones: `Package`, `Tag`, `Users` (de `lucide-react`).
- [ ] **AC9** — `<CursoFaq>` recebe items focados em bundle: "Posso comprar apenas uma área?" (resposta: sim, ver LPs individuais), "Tem desconto vs. comprar separado?" (resposta: sim), "Posso fazer todos ao mesmo tempo?", "É a mesma coisa que a Mentoria?" (resposta diferenciando — bundle é assíncrono; mentoria é ao vivo), + "Por quanto tempo tenho acesso?", "E se eu não gostar?".
- [ ] **AC10** — Bloco de Inscrição (id="inscricao") com `<ComingSoonCTA priceLabel="Em Breve — R$ 1.497" source="curso-bundle" />`.
- [ ] **AC11** — `<CursoFinalCTA>` recebe headline "Pronto para ter a", headlineHighlight="squad completa de IA?", copy curta + `priceLabel`.
- [ ] **AC12** — `src/app/sitemap.ts` atualizado para incluir as **5 rotas**: `/curso-ia-agentes`, `/curso-design`, `/curso-dev`, `/curso-social-media`, `/curso-bundle`. Cada uma com `lastModified` atual, `changeFrequency: 'weekly'`, `priority: 0.8`.
- [ ] **AC13** — Smoke local: form submete e CRM recebe `source="curso-bundle"`. Os 4 cards do `BundleCoursesGrid` linkam corretamente para as 4 LPs individuais (clique → navega).
- [ ] **AC14** — Lighthouse Performance ≥ 80 mobile, A11y ≥ 90, SEO ≥ 95.
- [ ] **AC15** — `npm run build` passa.

## Escopo

**IN:**
- `src/app/curso-bundle/page.tsx`
- `src/app/curso-bundle/_components/BundleCoursesGrid.tsx`
- Update `src/app/sitemap.ts` com 5 rotas

**OUT:**
- Página `/cursos` (listing público) — futuro Epic se PO pedir.
- Cross-sell automation (popups, exit-intent).
- Mesmos OUTs da LP-2.1.

## Contexto Técnico

- **Bloqueada por LP-1.1, LP-1.2, LP-2.1, LP-2.2, LP-2.3, LP-2.4** — os 4 cards do BundleCoursesGrid linkam para as 4 LPs; faz sentido entregar última.
- Preço placeholder `R$ 1.497` — confirmar com PO. (4 individuais separados somariam ~R$ 1.888.)
- Sitemap consolidado nesta story para evitar 5 commits de sitemap (anti-recorrência: alterações de sitemap historicamente foram esquecidas — ver Story 1.2 da Epic 1).

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
