---
title: "Story UCO-1.1: Spec UX da página /curso-online unificada (espelho de /mentoria)"
type: story
status: backlog
epic: UCO
complexity: M
agent: sites-ux
created: 2026-05-29
updated: 2026-05-29
tags: [story, ux, curso-online, mentoria, unificacao]
related:
  - "[[backlog/UCO-1.2-adaptar-componentes-curso-online]]"
  - "[[backlog/UCO-1.3-remover-paginas-obsoletas]]"
  - "[[backlog/UCO-1.4-atualizar-sitemap-links-internos]]"
  - "[[backlog/UCO-2.1-qa-gate-curso-online-unificado]]"
  - "[[backlog/UCO-2.2-push-pr-uco]]"
---

# Story UCO-1.1: Spec UX da página /curso-online unificada (espelho de /mentoria)

## Objetivo
Produzir spec UX/IA da página `/curso-online` para ficar visualmente e estruturalmente igual à `/mentoria`, com **quatro secções removidas**: `Pré-Mentoria`, `Dia Presencial` (encontros ao vivo / facilitação presencial), `Bônus Online` e `Encerramento`. A spec é insumo único de [[backlog/UCO-1.2-adaptar-componentes-curso-online|UCO-1.2]].

## Acceptance Criteria
- [ ] AC1: Documento `docs/smart-memory/specs/uco-curso-online-unified.md` criado, secção-por-secção, mapeando cada bloco da `/mentoria` ao bloco correspondente em `/curso-online` (manter / adaptar / criar).
- [ ] AC2: Inventário das **secções a manter** (`Hero`, `SolutionSection`, `Diferenciais`, `Timeline filtrada`, `Facilitadores`, `PricingCalculator`, `Inscrição/Form`, `FAQ`, `CTA Final`) com referência aos componentes-fonte da mentoria e ao alvo no curso-online.
- [ ] AC3: Inventário das **secções a remover da Timeline** (`Pré-Mentoria`, `Dia Presencial`, `Bônus Online`, `Encerramento`) — comando explícito: filtrar `PHASES` de `course-modules-timeline.tsx:23` para manter apenas as fases `Semana 1`, `Semana 2`, `Semana 3`, `Semana 4`.
- [ ] AC4: Decisão UX explícita sobre `PricingCalculator` (curso-online cobra R$ 797 fixo, sem cálculo de squad): manter calculadora ou trocar pela secção fixa atual de `/curso-online` (`INCLUDED`, `NOT_INCLUDED`, card R$ 797 com `CheckoutForm`). Justificar.
- [ ] AC5: Decisão UX explícita sobre `Inscrição` (curso-online usa `CheckoutForm` + cohort `curso-online-padrao`; mentoria usa `RevosForm` lista de espera). Manter `CheckoutForm` no curso-online — confirmar contrato.
- [ ] AC6: Decisão UX sobre `MentoriaHeroSpline` vs `CursoOnlineHero` — manter Hero específico do curso-online (R$ 797, "comprar agora") ou espelhar o Spline da mentoria adaptando copy. Justificar.
- [ ] AC7: Lista final de wireframes/seções aprovada por sites-architect (este agente) antes de UCO-1.2 começar.

## Escopo

**IN:**
- Spec textual da página unificada com mapeamento 1:1 das secções.
- Inventário do que cada componente do `_components/` da mentoria precisa receber como prop ou ser duplicado/adaptado em `curso-online/_components/`.
- Decisões UX numeradas com justificativa de uma frase cada.

**OUT:**
- Implementação de código (vai para UCO-1.2).
- Mudança no sitemap, NavLinks, CoursesDropdown (vai para UCO-1.4).
- Remoção das páginas obsoletas (vai para UCO-1.3).
- QA / push / PR (vai para UCO-2.1 e UCO-2.2).

## Contexto Técnico

**Arquivos-fonte (mentoria):**
- `src/app/mentoria/page.tsx` — ordem canônica das secções (Hero → Solução → Diferenciais → Timeline → Facilitadores → Calculadora → Inscrição → FAQ → CTA).
- `src/app/mentoria/_components/MentoriaHeroSpline.tsx`
- `src/app/mentoria/mentorship-features.tsx`
- `src/app/mentoria/course-modules-timeline.tsx` — `PHASES` array com 8 fases; remover índices 0 (Pré-Mentoria), 1 (Dia Presencial), 6 (Bônus Online), 7 (Encerramento).
- `src/app/mentoria/pricing-calculator.tsx` — calculadora dinâmica de squads.
- `src/app/mentoria/faq-accordion.tsx`
- `src/app/mentoria/solution-section.tsx` — já reutilizado pela curso-online.

**Arquivos-fonte (curso-online):**
- `src/app/curso-online/page.tsx` — estrutura atual.
- `src/app/curso-online/_components/CursoOnlineHero.tsx`
- `src/app/curso-online/_components/CursoOnlineDiferenciais.tsx`
- `src/app/curso-online/_components/CursoOnlineTimeline.tsx`
- `src/app/curso-online/_components/CursoPricingCalculator.tsx`
- `src/app/curso-online/_components/CursoFaqAccordion.tsx`
- `src/app/curso-online/_components/checkout-form.tsx`

**Constraints:**
- Não criar story / decisão que ative pagamento ou checkout novo — o `CheckoutForm` e `cohortSlug = 'curso-online-padrao'` permanecem.
- Manter `SolarSystemBackground` ou trocar pelo fundo da mentoria — decisão UCO-1.1 AC6.

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | — |
| Iniciado   | — |
| Concluído  | — |
| Branch     | — |

## File List
<!-- UX preenche ao concluir -->

## QA Results
<!-- QA preenche ao revisar -->
