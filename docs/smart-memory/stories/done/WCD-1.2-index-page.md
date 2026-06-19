---
title: "Story WCD-1.2: Página índice /workshop-claude-design"
type: story
status: backlog
epic: WCD-1
complexity: S
mode: yolo
agent: sites-dev-alpha
created: 2026-06-19
updated: 2026-06-19
tags: [story, workshop-claude-design, index]
related: ["WCD-1.1"]
---

# Story WCD-1.2: Página índice /workshop-claude-design

## Objetivo
Criar a página de entrada do workshop com menu de slides, usando os mesmos tokens Claude e exportando metadata adequado.

## Acceptance Criteria
- [ ] AC1: `src/app/workshop-claude-design/layout.tsx` criado — exporta metadata base (`title: 'Workshop Claude Design | João Guirunas'`, `robots: { index: false, follow: false }`)
- [ ] AC2: `src/app/workshop-claude-design/page.tsx` renderiza fundo `#0D0B12`, título "Workshop Claude Design" em display serif grande
- [ ] AC3: Subtítulo: "Do pitch ao visual — como Claude Design traduz posicionamento em percepção"
- [ ] AC4: Lista todos os 10 slides com número, título, duração e link para cada `/workshop-claude-design/{slug}`
- [ ] AC5: Botão/link proeminente "Começar →" aponta para `/workshop-claude-design/abertura`
- [ ] AC6: Tipografia, cores e espaçamento consistentes com WCD-1.1 (tokens `BG`, `TEXT`, `ACCENT`, `MUTED`)
- [ ] AC7: `dynamic = 'force-dynamic'` no topo
- [ ] AC8: Metadado `alternates.canonical` = `/workshop-claude-design`

## Escopo
**IN:** `src/app/workshop-claude-design/page.tsx`, `layout.tsx`
**OUT:** Slides individuais

## Contexto Técnico
- Referência de padrão: `src/app/workshop-3/page.tsx`
- Importar `WORKSHOP_CD_SLIDES` de `./_components/slides` para gerar a lista dinamicamente

## Dev Agent Record
| Campo | Valor |
|---|---|
| Agente | — |
| Iniciado | — |
| Concluído | — |
| Branch | — |

## File List

## QA Results
