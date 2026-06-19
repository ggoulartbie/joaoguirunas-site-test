---
title: "Story WCD-2.3: Slides 06-07 — Divisão DS vs KV + Handoff"
type: story
status: backlog
epic: WCD-2
complexity: M
mode: yolo
agent: sites-dev-alpha
created: 2026-06-19
updated: 2026-06-19
tags: [story, workshop-claude-design, slides]
related: ["WCD-2.2", "WCD-2.4"]
---

# Story WCD-2.3: Slides 06-07 — Divisão DS vs KV + Handoff

## Objetivo
Implementar os slides que explicam a lógica do Design System vs KV e o processo de handoff.

## Acceptance Criteria

### Slide 06 — `divisao`
- [ ] AC1: `src/app/workshop-claude-design/divisao/page.tsx` criado
- [ ] AC2: Usa `WorkshopClaudeDesignLayout` com `slug="divisao"`
- [ ] AC3: Título: "Design System vs KV — quando usar cada um"
- [ ] AC4: Tabela comparativa ou cards lado-a-lado com 3 linhas de comparação:
  - **Design System**: Base permanente da marca · Quando: criando ou renovando identidade · Frequência: 1× por marca
  - **KV**: Derivação para canal/campanha · Quando: evento, workshop, campanha · Frequência: por demanda
- [ ] AC5: Hierarquia visual: diagrama simples em texto (ASCII ou boxes) mostrando `Design System → KV Social / KV Site / KV Evento`
- [ ] AC6: Regra destacada (box accent): "KV sem DS é improviso. DS sem KV é teoria. Os dois juntos são sistema."
- [ ] AC7: Metadata: `title: 'Divisão | Workshop Claude Design'`, canonical `/workshop-claude-design/divisao`

### Slide 07 — `handoff`
- [ ] AC8: `src/app/workshop-claude-design/handoff/page.tsx` criado
- [ ] AC9: Usa `WorkshopClaudeDesignLayout` com `slug="handoff"`
- [ ] AC10: Título: "O Handoff"
- [ ] AC11: Definição: "O handoff é o documento que garante que o que foi criado no Claude seja usado corretamente — pela sua equipe, pelos fornecedores ou pelo cliente."
- [ ] AC12: Lista do que o handoff inclui (5 itens): Tokens de cor (HEX + RGB) · Escala tipográfica · Exemplos de aplicação correta · DOs & DON'Ts com exemplos visuais · Links para assets (PNG, SVG, PDF)
- [ ] AC13: Como gerar via Claude: "Prompt: 'Gere um documento de handoff do design system acima, formatado para Notion/Google Docs, incluindo todos os tokens, exemplos de uso e guia de aplicação.'"
- [ ] AC14: Frase de fechamento: "Se o cliente não consegue reproduzir o design sem você, o design system não foi entregue — foi apresentado."
- [ ] AC15: Metadata: `title: 'Handoff | Workshop Claude Design'`, canonical `/workshop-claude-design/handoff`

## Escopo
**IN:** `divisao/page.tsx`, `handoff/page.tsx`
**OUT:** Slides 08-10 (WCD-2.4)

## Contexto Técnico
- Tokens inline: `BG='#0D0B12'`, `SURFACE='#161322'`, `TEXT='#EDE9FF'`, `MUTED='#8B84A7'`, `ACCENT='#9B6DFF'`, `WARM='#FF6B35'`
- Para o diagrama de hierarquia no AC5: usar `font-mono` com boxes em bordas simples (sem SVG)

## Dev Agent Record
| Campo | Valor |
|---|---|
| Agente | — |
| Iniciado | — |
| Concluído | — |
| Branch | — |

## File List

## QA Results
