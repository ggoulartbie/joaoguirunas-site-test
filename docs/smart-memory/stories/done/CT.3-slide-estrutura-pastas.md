---
title: "Story CT.3: Slide novo — Estrutura de pastas (centro de treinamento ↔ projetos)"
type: story
status: backlog
epic: CT
complexity: M
agent: sites-dev-alpha
created: 2026-05-14
updated: 2026-05-14
tags: [story, frontend, mentoria, centro-treinamento, diagrams, folder-structure]
related: ["[[CT.2-slide-squads-detalhado]]", "[[CT.5-qa-gate-centro-treinamento]]"]
---

# Story CT.3: Slide novo — Estrutura de pastas (centro de treinamento ↔ projetos)

## Objetivo
Adicionar **1 slide novo** com diagrama `folder-structure` que mostra a relação entre o **projeto centro de treinamento** (catálogo source — `~/Projects/centro-treinamento-agentes/.claude/agents/` e `.claude/skills/`) e **cada projeto individual** que consome um subset (`{projeto}/.claude/agents/` e `.claude/skills/`). Este é o conceito-chave que falta nos slides atuais.

## Acceptance Criteria
- [ ] AC1: novo diagrama `folder-structure` adicionado ao union `Slide['diagram']` em `ModuloSlideshow.tsx:27-31`
- [ ] AC2: componente `FolderStructureDiagram` implementado seguindo o padrão de árvore textual do `ClaudeMdDiagram` (`ModuloSlideshow.tsx:330-358`) e `ClaudeStructureDiagram` (`ModuloSlideshow.tsx:362-409`)
- [ ] AC3: layout do diagrama mostra **2 colunas (ou 2 blocos verticais)**:
  - **Fonte:** `~/Projects/centro-treinamento-agentes/` com `.claude/agents/*.md` (catálogo dos 37) e `.claude/skills/*` (catálogo de skills)
  - **Destino:** `{projeto-do-cliente}/.claude/agents/*.md` (subset escolhido) e `.claude/skills/*`
- [ ] AC4: setinha mono indicando fluxo `copia/sincroniza` da fonte para o destino (texto `team-os-creator install` perto da seta — pista para o slide do creator)
- [ ] AC5: dados de árvore consumidos de `FOLDER_STRUCTURE` em `@/data/treinamento` (já provisionado por Seranol) — **não hardcodear** a estrutura no componente
- [ ] AC6: entrada no `switch` da função de renderização (`ModuloSlideshow.tsx:1170-1189`)
- [ ] AC7: slide inserido no array `slides` de `centro-treinamento/page.tsx`, **antes** do slide `team-os-commands`; copy:
  - `label`: `Estrutura · Source → Projects`
  - `title`: "Um catálogo central. Cada projeto puxa o que precisa."
  - `body`: ≤220 chars explicando que `.claude/agents/` e `.claude/skills/` são portáveis e que o centro de treinamento é a fonte única
  - `note` (opcional): "team-os-creator faz a sincronização — sem cópia manual."
- [ ] AC8: `pnpm build` passa

## Escopo

**IN:**
- `src/app/mentoria/presencial/_components/ModuloSlideshow.tsx` — novo componente `FolderStructureDiagram` + extensão do union + switch
- `src/app/mentoria/presencial/centro-treinamento/page.tsx` — inserir slide novo

**OUT:**
- Edição em `src/data/treinamento/` (já provisionado por Seranol)
- Alteração em outros diagramas de árvore (`claude-md`, `claude-structure`) — esses pertencem ao módulo 2
- Implementação real do `team-os-creator install` (apenas referência textual neste slide)

## Contexto Técnico
- `ClaudeMdDiagram` em `ModuloSlideshow.tsx:330-358` é o template visual (renderização indentada com `├─`, accents `#FF3A0E` em paths importantes)
- `ClaudeStructureDiagram` em `:362-409` mostra padrão de cards empilhados — alternativa estrutural
- `FOLDER_STRUCTURE` em `@/data/treinamento` (provisionado por Seranol) — tipo `FolderNode` recursivo
- Largura sugerida: 320–360px no `DiagramBox`

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
