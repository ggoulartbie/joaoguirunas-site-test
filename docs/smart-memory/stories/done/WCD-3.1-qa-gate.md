---
title: "Story WCD-3.1: QA Gate — Workshop Claude Design"
type: story
status: done
epic: WCD-3
complexity: M
mode: yolo
agent: sites-qa
created: 2026-06-19
updated: 2026-06-19
tags: [story, workshop-claude-design, qa]
related: ["WCD-2.1", "WCD-2.2", "WCD-2.3", "WCD-2.4"]
---

# Story WCD-3.1: QA Gate — Workshop Claude Design

## Objetivo
Emitir veredicto formal PASS/CONCERNS/FAIL para o workshop antes de qualquer push.

## Acceptance Criteria
- [x] AC1: Verificar que todos os 10 slugs existem como rotas: `abertura`, `interface`, `design-system`, `kv-social`, `kv-site`, `divisao`, `handoff`, `prompt-design-system`, `prompt-apresentacao`, `demo-slides`
- [x] AC2: Verificar que `WORKSHOP_CD_SLIDES` em `slides.ts` tem exatamente 10 slides com `slug`, `number`, `title`, `duration`, `href` preenchidos
- [x] AC3: Verificar navegação: prev/next funciona em todos os slides (primeiro sem prev, último sem next)
- [x] AC4: Verificar keyboard navigation (`ArrowLeft`/`ArrowRight`) está presente no `WorkshopClaudeDesignLayout`
- [x] AC5: Verificar TypeScript sem erros: `pnpm typecheck`
- [x] AC6: Verificar que metadata (`title`, `canonical`) é único por página
- [x] AC7: Verificar que os prompts (AC4 de WCD-2.4 e AC11 de WCD-2.4) aparecem completos — sem truncamento
- [x] AC8: Verificar que o pitch completo da palestrante aparece no slide `demo-slides`
- [x] AC9: Verificar contraste de texto: `#EDE9FF` sobre `#0D0B12` ≥ 4.5:1 (WCAG AA)
- [x] AC10: Emitir veredicto formal em `docs/smart-memory/agents/qa/WCD-3.1-verdict.md`
- [x] AC11: SendMessage ao lead com veredicto e lista de issues (se houver)

## Escopo
**IN:** QA de todas as 10 páginas + layout + index
**OUT:** Não corrigir código — apenas reportar

## Dev Agent Record
| Campo | Valor |
|---|---|
| Agente | sites-qa (Axilun) |
| Iniciado | 2026-06-19 |
| Concluído | 2026-06-19 |
| Branch | main |

## File List
- `src/app/workshop-claude-design/_components/slides.ts`
- `src/app/workshop-claude-design/_components/WorkshopClaudeDesignLayout.tsx`
- `src/app/workshop-claude-design/layout.tsx`
- `src/app/workshop-claude-design/page.tsx`
- `src/app/workshop-claude-design/*/page.tsx` (10 páginas)

## QA Results
VEREDICTO: PASS — 2026-06-19
10/10 ACs verificados. Nenhum issue bloqueante.
Veredicto completo: `docs/smart-memory/agents/qa/WCD-3.1-verdict.md`
