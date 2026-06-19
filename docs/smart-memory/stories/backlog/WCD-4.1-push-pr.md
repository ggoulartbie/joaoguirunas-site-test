---
title: "Story WCD-4.1: Push + PR — Workshop Claude Design"
type: story
status: backlog
epic: WCD-4
complexity: S
mode: yolo
agent: sites-devops
created: 2026-06-19
updated: 2026-06-19
tags: [story, workshop-claude-design, devops]
related: ["WCD-3.1"]
---

# Story WCD-4.1: Push + PR — Workshop Claude Design

## Objetivo
Fazer push da branch de implementação e abrir PR para main após QA PASS.

## Acceptance Criteria
- [ ] AC1: QA Gate WCD-3.1 emitiu veredicto PASS (verificar `docs/smart-memory/agents/qa/WCD-3.1-verdict.md`)
- [ ] AC2: Autorização explícita do usuário (João) antes do push
- [ ] AC3: `pnpm build` passa sem erros antes do push
- [ ] AC4: Push para branch de feature, NÃO direto para main
- [ ] AC5: PR aberto com título: `feat(workshop): claude-design deck — 10 slides sobre pitch e design system`
- [ ] AC6: Descrição do PR inclui: rota `/workshop-claude-design`, lista dos 10 slides, instrução de preview

## Escopo
**IN:** push + PR
**OUT:** Merge (decisão do usuário), deploy Vercel (automático via CI)

## Restrição Crítica
**NÃO fazer push, NÃO abrir PR sem autorização explícita do PO (João).**

## Dev Agent Record
| Campo | Valor |
|---|---|
| Agente | — |
| Iniciado | — |
| Concluído | — |
| Branch | — |

## File List

## QA Results
