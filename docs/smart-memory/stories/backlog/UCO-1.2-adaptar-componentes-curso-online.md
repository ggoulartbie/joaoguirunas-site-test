---
title: "Story UCO-1.2: Adaptar componentes /curso-online espelhando /mentoria"
type: story
status: backlog
epic: UCO
complexity: L
agent: sites-dev-alpha
created: 2026-05-29
updated: 2026-05-29
tags: [story, frontend, curso-online, mentoria, unificacao]
related:
  - "[[backlog/UCO-1.1-spec-ux-pagina-unificada]]"
  - "[[backlog/UCO-1.3-remover-paginas-obsoletas]]"
  - "[[backlog/UCO-1.4-atualizar-sitemap-links-internos]]"
  - "[[backlog/UCO-2.1-qa-gate-curso-online-unificado]]"
---

# Story UCO-1.2: Adaptar componentes /curso-online espelhando /mentoria

## Objetivo
Implementar a página `/curso-online` para ficar visual e estruturalmente igual a `/mentoria`, removendo as secções `Pré-Mentoria`, `Dia Presencial` (encontros ao vivo), `Bônus Online` e `Encerramento`. Seguir spec [[backlog/UCO-1.1-spec-ux-pagina-unificada|UCO-1.1]].

## Acceptance Criteria
- [ ] AC1: `src/app/curso-online/page.tsx` consome os mesmos componentes da `/mentoria` na mesma ordem: `SectionDots` → Hero → `SolutionSection` → Diferenciais → Timeline → Facilitadores → Pricing → Inscrição → FAQ → CTA Final.
- [ ] AC2: Timeline do curso-online derivada de `course-modules-timeline.tsx` da mentoria com **4 fases removidas**: `Pré-Mentoria`, `Dia Presencial`, `Bônus Online`, `Encerramento`. Mantém apenas `Semana 1`, `Semana 2`, `Semana 3`, `Semana 4`. Implementar via componente novo (`CursoOnlineTimeline.tsx` actualizado) ou via prop `excludePhases` no componente da mentoria — decisão da UCO-1.1.
- [ ] AC3: Diferenciais espelha visualmente `mentorship-features.tsx` (mesmo grid, mesma motion, mesmos ícones / tipografia) — copy pode divergir.
- [ ] AC4: FAQ espelha visualmente `faq-accordion.tsx` — mesmo acordeão, mesma motion.
- [ ] AC5: Secção `Inscrição` mantém o `CheckoutForm` com `cohortSlug = 'curso-online-padrao'` e preço R$ 797 (não troca para `RevosForm` da mentoria).
- [ ] AC6: Hero mantém badge / heading / CTA do curso-online (R$ 797, "Comprar agora"), com tratamento visual do Spline / Solar System conforme decisão UCO-1.1 AC6.
- [ ] AC7: Facilitadores: lista de 2 (João + Claudia) idêntica à mentoria — usar o mesmo grid + tratamento de imagem.
- [ ] AC8: Página build (`pnpm build`) passa sem warning / erro de tipo / lint.
- [ ] AC9: Visual QA manual: comparar `/mentoria` e `/curso-online` lado a lado em `dev` — secções batem em altura, espaçamento, tipografia. Anexar screenshots no PR.
- [ ] AC10: JSON-LD `@type: Course`, `metadata`, `canonical` permanecem corretos para `/curso-online` (preço 797, slug `curso-online-padrao`).
- [ ] AC11: Nenhum import morto / componente órfão em `src/app/curso-online/_components/` (`CursoSquadSection.tsx`, `CursoSquadsSticky.tsx` removidos se não usados).

## Escopo

**IN:**
- `src/app/curso-online/page.tsx`
- `src/app/curso-online/_components/CursoOnlineTimeline.tsx` (refactor para espelhar mentoria sem as 4 fases).
- `src/app/curso-online/_components/CursoOnlineDiferenciais.tsx` (refactor para espelhar `mentorship-features.tsx`).
- `src/app/curso-online/_components/CursoFaqAccordion.tsx` (refactor para espelhar `faq-accordion.tsx`).
- Remoção de componentes órfãos do `curso-online/_components/`.

**OUT:**
- Apagar páginas `curso-bundle/`, `curso-design/`, `curso-dev/`, `curso-ia-agentes/`, `curso-social-media/`, `cursos/_shared/` — vai para UCO-1.3.
- Sitemap, NavLinks, CoursesDropdown — vai para UCO-1.4.
- Não modificar `src/app/mentoria/*` (origem permanece intacta).
- Não tocar em `CheckoutForm`, `cohort`, schema, server actions.

## Contexto Técnico

**Componentes-fonte de cópia:**
- `src/app/mentoria/mentorship-features.tsx` → `CursoOnlineDiferenciais.tsx`
- `src/app/mentoria/course-modules-timeline.tsx` (PHASES filtradas) → `CursoOnlineTimeline.tsx`
- `src/app/mentoria/faq-accordion.tsx` → `CursoFaqAccordion.tsx`

**Modos de partilha** (escolher 1 na UCO-1.1):
- **Mode A (duplicar):** copiar código para `curso-online/_components/`, ajustando data e copy. Bom: zero acoplamento, fácil de divergir. Ruim: duplicação.
- **Mode B (reutilizar com props):** importar directo de `mentoria/` e passar prop `excludePhases` / `mode='curso-online'`. Bom: DRY. Ruim: acoplamento entre rotas.

**Padrão de componente partilhado a manter:**
- `SolutionSection` já importado por curso-online da mentoria — manter padrão.
- `SectionDots` já importado da mentoria — manter padrão.

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
