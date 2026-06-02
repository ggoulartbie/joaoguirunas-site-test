---
title: "Story DEV-1.1: NODE_OPTIONS heap limit no script dev"
type: story
status: backlog
epic: DEV-1
complexity: S
agent: sites-devops
created: 2026-05-16
updated: 2026-05-16
tags: [story, devops, performance]
related: [DEV-1.2]
---

# Story DEV-1.1: NODE_OPTIONS heap limit no script dev

## Objetivo
Adicionar `NODE_OPTIONS='--max-old-space-size=4096'` ao script `dev` para prevenir OOM em sessões longas com Turbopack + libs pesadas (Three.js + Spline + tsParticles).

## Acceptance Criteria
- [ ] AC1: Script `dev` em `package.json` inclui `NODE_OPTIONS='--max-old-space-size=4096'`
- [ ] AC2: `pnpm dev` sobe sem erro após a mudança
- [ ] AC3: `pnpm build` não é afetado pela mudança

## Escopo

**IN:**
- `package.json` — script `dev`

**OUT:**
- Scripts `build`, `start`, `dev:restart`
- `pnpm-workspace.yaml`

## Contexto Técnico
Identificado por sites-dev-delta em `docs/smart-memory/agents/research/server-crash-analysis.md`. OOM é cenário P1 em sessões longas — Turbopack mantém árvore de dependências em memória enquanto Three.js (8.1MB) + Spline (6.6MB) + tsParticles (5MB) somam heap considerável. QA (sites-qa) recomendou como C-001 em `docs/smart-memory/agents/qa/server-restart-verdict.md`.

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
