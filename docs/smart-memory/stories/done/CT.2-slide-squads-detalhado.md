---
title: "Story CT.2: Slide novo — Squads detalhado (agentes por squad + funções)"
type: story
status: backlog
epic: CT
complexity: M
agent: sites-dev-alpha
created: 2026-05-14
updated: 2026-05-14
tags: [story, frontend, mentoria, centro-treinamento, squads, diagrams]
related: ["[[CT.1-slide-37-agentes-belt]]", "[[CT.5-qa-gate-centro-treinamento]]"]
---

# Story CT.2: Slide novo — Squads detalhado (agentes por squad + funções)

## Objetivo
Adicionar **1 slide novo** após o slide `ct-overview` existente para detalhar cada uma das 4 squads (dev, sites, social, traffic) com **lista de codenames principais + função de cada agente**. Atualmente `ct-overview` mostra apenas contagem + foco; falta o "quem é quem" de cada squad.

## Acceptance Criteria
- [ ] AC1: novo diagrama `squads-detail` adicionado ao union `Slide['diagram']` em `ModuloSlideshow.tsx:27-31`
- [ ] AC2: componente `SquadsDetailDiagram` implementado seguindo o padrão visual dos diagramas existentes (paleta accent por squad, mono font, animações framer-motion delay escalonado)
- [ ] AC3: diagrama renderiza **4 colunas** (uma por squad), cada coluna lista codename + título de **todos os agentes da squad** (10/10/7/10), com cor da squad no codename e cinza no título
- [ ] AC4: header de cada coluna mostra nome da squad em uppercase mono + contagem em número grande (mesmo padrão do `SquadsGridDiagram` em `ModuloSlideshow.tsx:600-620`)
- [ ] AC5: dados consumidos de `@/data/agentes` (`SQUADS` + `getAgentesBySquad(id)`), sem hardcode de codenames no diagrama
- [ ] AC6: entrada no `switch` da função de renderização (`ModuloSlideshow.tsx:1170-1189`) adicionada na ordem correta
- [ ] AC7: slide novo inserido no array `slides` de `centro-treinamento/page.tsx` **logo após** o slide `ct-overview` existente; copy:
  - `label`: `Squads · Quem é quem`
  - `title`: "4 squads, papéis claros — nenhum agente sabe fazer tudo."
  - `body`: ≤220 chars destacando especialização e autoridades exclusivas (QA, devops, architect)
- [ ] AC8: `pnpm build` passa; layout responsivo na largura padrão do `DiagramBox` (~400px para acomodar 4 colunas — ajustar se necessário)

## Escopo

**IN:**
- `src/app/mentoria/presencial/_components/ModuloSlideshow.tsx` — novo componente `SquadsDetailDiagram` + entrada no union + entrada no switch
- `src/app/mentoria/presencial/centro-treinamento/page.tsx` — inserir slide novo

**OUT:**
- Alteração do slide `ct-overview` existente (mantém-se como visão geral)
- Alteração em `src/data/agentes/`
- Mudança em outros diagramas existentes

## Contexto Técnico
- `SquadsGridDiagram` (`ModuloSlideshow.tsx:600-620`) é a referência visual mais próxima — replicar tipografia e accents
- 4 squads × até 10 codenames = ~37 linhas — viabilidade visual: cards de codename com altura ~22px cabem em coluna de 280px
- Squad accents canônicos: `dev #A78BFA`, `sites #FF3A0E`, `social #EC4899`, `traffic #06B6D4`
- Fonte de codenames: `@/data/agentes` (campo `codename` em cada `Agente`)

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
