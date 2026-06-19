---
title: "Story WCD-2.1: Slides 01-02 — Abertura + Interface Claude Design"
type: story
status: done
epic: WCD-2
complexity: M
mode: yolo
agent: sites-dev-alpha
created: 2026-06-19
updated: 2026-06-19
tags: [story, workshop-claude-design, slides]
related: ["WCD-1.1", "WCD-2.2"]
---

# Story WCD-2.1: Slides 01-02 — Abertura + Interface Claude Design

## Objetivo
Implementar os dois primeiros slides: abertura com contexto do pitch e apresentação da interface do Claude Design.

## Acceptance Criteria

### Slide 01 — `abertura`
- [ ] AC1: Arquivo `src/app/workshop-claude-design/abertura/page.tsx` criado
- [ ] AC2: Usa `WorkshopClaudeDesignLayout` com `slug="abertura"`
- [ ] AC3: Título principal: "Antes da técnica, existe a percepção"
- [ ] AC4: Bloco de citações com 3 frases da palestrante (ver Contexto Técnico), estilizadas como pull quotes com borda accent `#9B6DFF`
- [ ] AC5: Seção "O que vamos construir hoje" — lista visual dos 4 momentos: Interface · Design System · KV · Prompts
- [ ] AC6: Frase de chamada no rodapé do slide: "Pitch não é decorar uma fala bonita. É traduzir posicionamento em percepção."
- [ ] AC7: Metadata: `title: 'Abertura | Workshop Claude Design'`, canonical `/workshop-claude-design/abertura`

### Slide 02 — `interface`
- [ ] AC8: Arquivo `src/app/workshop-claude-design/interface/page.tsx` criado
- [ ] AC9: Usa `WorkshopClaudeDesignLayout` com `slug="interface"`
- [ ] AC10: Título: "Interface do Claude Design"
- [ ] AC11: Parágrafo introdutório: o que é Claude Design, como acessar (`claude.ai > Projects > Design`)
- [ ] AC12: Grid 2×2 com os 4 tipos de output: Design System · KV Social · KV Site · Apresentação — cada célula com ícone (emoji), título bold e descrição de 1 linha
- [ ] AC13: Nota de destaque (box com fundo surface `#161322`, borda `#9B6DFF`): "Você não precisa saber design. Você precisa saber o que quer comunicar."
- [ ] AC14: Metadata: `title: 'Interface | Workshop Claude Design'`, canonical `/workshop-claude-design/interface`

## Escopo
**IN:** `abertura/page.tsx`, `interface/page.tsx`
**OUT:** Slides 03+ (WCD-2.2)

## Contexto Técnico

### Frases da palestrante para Slide 01 (usar exatamente):
1. "Antes de alguém entender tecnicamente o que você entrega, essa pessoa já está formando uma percepção sobre você. O mercado lê sinais o tempo todo."
2. "Uma boa solução mal apresentada pode parecer fraca. Uma solução simples, bem posicionada, pode parecer muito mais valiosa."
3. "O mercado não compra apenas o que você faz. Ele compra o que consegue entender, confiar e lembrar sobre você."

### Referência visual
- Replicar a estrutura das páginas de slide do workshop-3 (ex: `src/app/workshop-3/workos/page.tsx`)
- Usar os tokens inline: `BG='#0D0B12'`, `TEXT='#EDE9FF'`, `MUTED='#8B84A7'`, `ACCENT='#9B6DFF'`, `WARM='#FF6B35'`

## Dev Agent Record
| Campo | Valor |
|---|---|
| Agente | Nova-S (sites-dev-alpha) |
| Iniciado | 2026-06-19 |
| Concluído | 2026-06-19 |
| Branch | main |

## File List
- `src/app/workshop-claude-design/abertura/page.tsx`
- `src/app/workshop-claude-design/interface/page.tsx`

## QA Results
