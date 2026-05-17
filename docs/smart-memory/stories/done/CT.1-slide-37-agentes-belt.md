---
title: "Story CT.1: Slide novo — Belt visual dos 37 agentes (abertura)"
type: story
status: backlog
epic: CT
complexity: S
agent: sites-dev-alpha
created: 2026-05-14
updated: 2026-05-14
tags: [story, frontend, mentoria, centro-treinamento, agents]
related: ["[[CT.2-slide-squads-detalhado]]", "[[CT.5-qa-gate-centro-treinamento]]"]
---

# Story CT.1: Slide novo — Belt visual dos 37 agentes (abertura)

## Objetivo
Adicionar um slide de abertura ao `/mentoria/presencial/centro-treinamento` mostrando os **37 agentes em esteira contínua** (`belt`) — uso direto da capacidade `belt: true` já existente em `ModuloSlideshow.tsx`, alimentado pelos dados de `src/data/agentes/agentes.json`.

## Acceptance Criteria
- [ ] AC1: novo slide é inserido como **primeiro** do array `slides` em `src/app/mentoria/presencial/centro-treinamento/page.tsx`, **antes** do atual slide `ct-overview`
- [ ] AC2: slide usa `belt: true` + `agents: SlideAgent[]` com **37 entradas** na ordem dev (10) → sites (10) → social (7) → traffic (10)
- [ ] AC3: cada `SlideAgent` é mapeado a partir de `ALL_AGENTES` de `@/data/agentes` (campos `slug`, `codename`, `title`); accent vem do squad (`#A78BFA` dev, `#FF3A0E` sites, `#EC4899` social, `#06B6D4` traffic)
- [ ] AC4: copy do slide:
  - `label`: `Centro de Treinamento · 37 Agentes`
  - `title`: "Conheça o time inteiro — 37 agentes, 4 squads."
  - `body` (≤220 chars): apresentação direta de que cada agente tem identidade, papel e ferramentas; o catálogo completo vive em `.claude/agents/` do projeto centro de treinamento
- [ ] AC5: nenhum dos 37 PNG retorna 404 em dev (verificado em `public/agentes/{slug}.png` — todos os 37 já existem)
- [ ] AC6: não há duplicação local do array — o slide importa de `@/data/agentes` (fonte canônica) e faz `.map()` inline ou via helper local; **não criar** `ALL_37_AGENTS` duplicado em `_components/`
- [ ] AC7: `pnpm build` passa; loop visual da esteira funciona (animação `x: [0, -totalW]` em 45s — já implementada em `AgentBelt` interno do ModuloSlideshow)

## Escopo

**IN:**
- Edição de `src/app/mentoria/presencial/centro-treinamento/page.tsx` — adicionar 1 slide no início
- Mapear `ALL_AGENTES` → `SlideAgent[]` (transformação inline ou helper privado da page)

**OUT:**
- Criação de novo módulo de constantes (a fonte canônica é `@/data/agentes`)
- Alteração no componente `AgentBelt` interno do `ModuloSlideshow.tsx`
- Alteração no componente `AgentBelt` de `/agentes/_components/` (esse é scroll-driven, não aplicável aqui)
- Qualquer alteração em `src/data/agentes/`

## Contexto Técnico
- `ModuloSlideshow.tsx:84-104` define `AgentBelt` interno (loop infinito automático)
- `SlideAgent` em `ModuloSlideshow.tsx:9-14` (`slug`, `codename`, `accent`, `title?`)
- Fonte de dados canônica: `src/data/agentes/agentes.json` via `ALL_AGENTES` em `@/data/agentes` (37 entradas)
- Catálogo de codenames também presente em `o-que-e-possivel/page.tsx:16-58` como referência verbatim
- PNGs em `public/agentes/{slug}.png` — todos os 37 confirmados existentes

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
