---
title: "Story UCO-1.3: Remover páginas obsoletas curso-bundle, curso-design, curso-dev, curso-ia-agentes, curso-social-media, cursos/_shared"
type: story
status: backlog
epic: UCO
complexity: S
agent: sites-dev-gamma
created: 2026-05-29
updated: 2026-05-29
tags: [story, cleanup, curso-online, unificacao]
related:
  - "[[backlog/UCO-1.1-spec-ux-pagina-unificada]]"
  - "[[backlog/UCO-1.2-adaptar-componentes-curso-online]]"
  - "[[backlog/UCO-1.4-atualizar-sitemap-links-internos]]"
  - "[[backlog/UCO-2.1-qa-gate-curso-online-unificado]]"
---

# Story UCO-1.3: Remover páginas obsoletas

## Objetivo
Apagar as 5 landing pages "Em Breve" criadas no Epic LP e a pasta `cursos/_shared/` que as alimentava. A página única de curso passa a ser `/curso-online` (entregue por UCO-1.2). Sem fallback / sem 301 — as rotas deixam de existir.

## Acceptance Criteria
- [ ] AC1: `src/app/curso-bundle/` (pasta inteira) removida.
- [ ] AC2: `src/app/curso-design/` (pasta inteira) removida.
- [ ] AC3: `src/app/curso-dev/` (pasta inteira) removida.
- [ ] AC4: `src/app/curso-ia-agentes/` (pasta inteira) removida.
- [ ] AC5: `src/app/curso-social-media/` (pasta inteira) removida.
- [ ] AC6: `src/app/cursos/` (pasta inteira, incluindo `_shared/`) removida.
- [ ] AC7: Nenhum import morto restante: `grep -rn "curso-bundle\|curso-design\|curso-dev\|curso-ia-agentes\|curso-social-media\|cursos/_shared\|from '@/app/cursos" src/` retorna 0 linhas.
- [ ] AC8: `pnpm build` passa sem `Module not found` ou warning de import quebrado.
- [ ] AC9: Stories antigas do Epic LP (`LP-1.1`, `LP-1.2`, `LP-2.1` a `LP-2.5`, `LP-3.1`) movidas de `backlog/` para `done/` com nota de superseded por UCO. Manter para auditoria.
- [ ] AC10: ADR `decisions/ADR-landing-pages-cursos.md` actualizada para `superseded` com link para esta story.

## Escopo

**IN:**
- Remoção física das 6 pastas listadas.
- Limpeza de import órfão se existir além dos arquivos listados na UCO-1.4.
- Marcar Epic LP stories como `superseded`.
- Marcar ADR LP como `superseded`.

**OUT:**
- Sitemap update — vai para UCO-1.4 (depende desta story).
- NavLinks / CoursesDropdown update — vai para UCO-1.4.
- Stripe / cohorts / payments — fora de escopo. Cohorts já criados em DB podem permanecer; só se PO pedir cleanup, abre-se nova story.

## Contexto Técnico

**Arquivos identificados:**
- `src/app/curso-bundle/page.tsx`
- `src/app/curso-design/page.tsx`
- `src/app/curso-dev/page.tsx`
- `src/app/curso-ia-agentes/page.tsx`
- `src/app/curso-social-media/page.tsx`
- `src/app/cursos/_shared/CursoEmBreveFaq.tsx`
- `src/app/cursos/_shared/CursoFacilitador.tsx`
- `src/app/cursos/_shared/CursoFeatures.tsx`
- `src/app/cursos/_shared/CursoInscricaoEmBreve.tsx`
- `src/app/cursos/_shared/CursoParaQuem.tsx`
- `src/app/cursos/_shared/EmBreveHero.tsx`
- `src/app/cursos/_shared/LeadCaptureForm.tsx`
- `src/app/cursos/_shared/OutrosCursos.tsx`

**Stories LP a marcar como done/superseded:**
- `backlog/LP-1.1-server-action-create-lead-only.md`
- `backlog/LP-1.2-shared-components-cursos.md`
- `backlog/LP-2.1-curso-ia-agentes.md`
- `backlog/LP-2.2-curso-design.md`
- `backlog/LP-2.3-curso-dev.md`
- `backlog/LP-2.4-curso-social-media.md`
- `backlog/LP-2.5-curso-bundle.md`
- `backlog/LP-3.1-qa-gate-landing-pages.md`

**Dependência:** UCO-1.2 concluída (curso-online já não importa nada de `cursos/_shared/`).

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | — |
| Iniciado   | — |
| Concluído  | — |
| Branch     | — |

## File List
<!-- Dev preenche ao concluir -->

## QA Results
<!-- QA preenche ao revisar -->
