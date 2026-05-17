---
title: "Story CT.4: Slide novo — Comandos base (/model, /compact, /clear)"
type: story
status: backlog
epic: CT
complexity: S
agent: sites-dev-alpha
created: 2026-05-14
updated: 2026-05-14
tags: [story, frontend, mentoria, centro-treinamento, diagrams, commands]
related: ["[[CT.3-slide-estrutura-pastas]]", "[[CT.5-qa-gate-centro-treinamento]]"]
---

# Story CT.4: Slide novo — Comandos base (/model, /compact, /clear)

## Objetivo
Adicionar **1 slide novo** com diagrama `base-commands` que documenta os 3 comandos nativos do Claude Code que todo aluno precisa dominar antes de operar squads: `/model`, `/compact`, `/clear`. Atualmente o slideshow só cobre comandos `team-os` e `team-os-creator`.

## Acceptance Criteria
- [ ] AC1: novo diagrama `base-commands` adicionado ao union `Slide['diagram']` em `ModuloSlideshow.tsx:27-31`
- [ ] AC2: componente `BaseCommandsDiagram` implementado seguindo o padrão tabular de `TeamOsCommandsDiagram` (`ModuloSlideshow.tsx:693-719`) — coluna esquerda comando (accent), coluna direita descrição
- [ ] AC3: diagrama renderiza **3 linhas** (uma por comando), cada uma com:
  - **Comando** (`/model`, `/compact`, `/clear`) em accent `#FF3A0E`
  - **Função** (1 linha curta)
  - **Quando usar** (1 linha em cinza)
- [ ] AC4: dados consumidos de `BASE_COMMANDS` em `@/data/treinamento` (já provisionado por Seranol) — sem hardcode no componente
- [ ] AC5: entrada no `switch` da função de renderização (`ModuloSlideshow.tsx:1170-1189`)
- [ ] AC6: slide inserido no array `slides` de `centro-treinamento/page.tsx`, **antes** do slide `creator-commands` (logo após team-os/smart-memory); copy:
  - `label`: `Comandos base · CLI`
  - `title`: "Antes de orquestrar agentes — domine os 3 comandos."
  - `body`: ≤220 chars explicando que `/model` controla custo, `/compact` preserva contexto longo, `/clear` reinicia sessão limpa
- [ ] AC7: `pnpm build` passa

## Escopo

**IN:**
- `src/app/mentoria/presencial/_components/ModuloSlideshow.tsx` — novo componente `BaseCommandsDiagram` + extensão do union + switch
- `src/app/mentoria/presencial/centro-treinamento/page.tsx` — inserir slide novo

**OUT:**
- Edição em `src/data/treinamento/`
- Reescrita do diagrama `team-os-commands` existente
- Documentação canônica dos comandos do Claude Code (referência rápida, não substitui docs oficiais)

## Contexto Técnico
- `TeamOsCommandsDiagram` (`ModuloSlideshow.tsx:693-719`) é a referência tabular direta — replicar largura 300px e padding 7px/12px
- `BASE_COMMANDS` em `@/data/treinamento` (provisionado por Seranol) — tipo `BaseCommand` com `command`, `function`, `whenToUse`
- 3 linhas curtas → diagrama compacto (~120px altura total) — pode coexistir bem com belt ou screenshot ao lado se necessário

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
