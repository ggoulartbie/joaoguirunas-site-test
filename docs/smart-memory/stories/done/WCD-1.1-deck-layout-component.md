---
title: "Story WCD-1.1: WorkshopClaudeDesignLayout component + slides.ts"
type: story
status: done
epic: WCD-1
complexity: M
mode: yolo
agent: sites-dev-alpha
created: 2026-06-19
updated: 2026-06-19
tags: [story, workshop-claude-design, layout, deck]
related: ["WCD-1.2", "WCD-2.1", "WCD-2.2", "WCD-2.3", "WCD-2.4"]
---

# Story WCD-1.1: WorkshopClaudeDesignLayout component + slides.ts

## Objetivo
Criar o componente de layout compartilhado e o catálogo de slides para o workshop `/workshop-claude-design`, replicando a arquitetura do Workshop3DeckLayout mas com a identidade visual do Claude (dark purple, não Growth Sales Ember).

## Acceptance Criteria
- [x] AC1: `src/app/workshop-claude-design/_components/slides.ts` exporta `WORKSHOP_CD_SLIDES: DeckSlide[]` com 10 slides (slug, number, title, duration, href)
- [x] AC2: Slugs dos 10 slides: `abertura`, `interface`, `design-system`, `kv-social`, `kv-site`, `divisao`, `handoff`, `prompt-design-system`, `prompt-apresentacao`, `demo-slides`
- [x] AC3: `src/app/workshop-claude-design/_components/WorkshopClaudeDesignLayout.tsx` criado com `'use client'`; recebe `slug` + `children`; resolve slide atual via lookup em WORKSHOP_CD_SLIDES
- [x] AC4: Lança erro se `slug` não existe em WORKSHOP_CD_SLIDES
- [x] AC5: Top bar: link `← Workshop Claude Design` (aponta para `/workshop-claude-design`) + duration em accent + número `0N/10`
- [x] AC6: Progress dots: 10 faixas finas clicáveis — atual = `#9B6DFF`, anteriores = `rgba(155,109,255,0.35)`, futuros = `rgba(255,255,255,0.08)`
- [x] AC7: Header: "Slide NN de 10" + título da fase em fonte display (`'Fraunces'` ou fallback)
- [x] AC8: Nav inferior: link prev (ou texto "Início") + link next (ou vazio) + "Voltar ao índice"
- [x] AC9: `useEffect` com listener `keydown` → `ArrowRight` navega para `next.href`, `ArrowLeft` para `prev.href` (ou `/workshop-claude-design` se não há prev), usando `window.location.href`
- [x] AC10: Tokens de cor inline (sem CSS vars externas): `BG = '#0D0B12'`, `SURFACE = '#161322'`, `TEXT = '#EDE9FF'`, `MUTED = '#8B84A7'`, `ACCENT = '#9B6DFF'`, `WARM = '#FF6B35'`
- [x] AC11: Layout responsivo `max-w-4xl mx-auto`; padding com `clamp`

## Escopo
**IN:** `_components/WorkshopClaudeDesignLayout.tsx`, `_components/slides.ts`
**OUT:** Páginas individuais de cada slide (WCD-2.x), index page (WCD-1.2)

## Contexto Técnico
- Replicar exatamente a arquitetura de `src/app/workshop-3/_components/Workshop3DeckLayout.tsx`
- NÃO importar Workshop3DeckLayout — criar do zero com brand Claude
- NÃO usar GrowthLogo — usar texto "João Guirunas" em `font-mono text-xs tracking-widest opacity-60`
- Leitura de referência: `src/app/workshop-3/_components/Workshop3DeckLayout.tsx` e `slides.ts`

## Dev Agent Record
| Campo | Valor |
|---|---|
| Agente | Novael (sites-dev-alpha) |
| Iniciado | 2026-06-19 |
| Concluído | 2026-06-19 |
| Branch | main (worktree wcd-workshop-claude-design) |

## File List
- `src/app/workshop-claude-design/_components/slides.ts`
- `src/app/workshop-claude-design/_components/WorkshopClaudeDesignLayout.tsx`

## QA Results
