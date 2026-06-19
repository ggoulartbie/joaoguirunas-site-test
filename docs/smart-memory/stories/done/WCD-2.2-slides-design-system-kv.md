---
title: "Story WCD-2.2: Slides 03-05 — Design System + KV Social + KV Site"
type: story
status: done
epic: WCD-2
complexity: M
mode: yolo
agent: sites-dev-alpha
created: 2026-06-19
updated: 2026-06-19
tags: [story, workshop-claude-design, slides]
related: ["WCD-2.1", "WCD-2.3"]
---

# Story WCD-2.2: Slides 03-05 — Design System + KV Social + KV Site

## Objetivo
Implementar os três slides de demo: Design System, KV Social e KV Site.

## Acceptance Criteria

### Slide 03 — `design-system`
- [ ] AC1: `src/app/workshop-claude-design/design-system/page.tsx` criado
- [ ] AC2: Usa `WorkshopClaudeDesignLayout` com `slug="design-system"`
- [ ] AC3: Título: "Design System" com badge `DEMO` em accent
- [ ] AC4: Definição: "O Design System é a linguagem visual permanente da sua marca — paleta, tipografia, componentes e tom de voz em um único artefato."
- [ ] AC5: Seção "O que o Claude produz" — lista com 5 itens: Paleta de cores · Escala tipográfica · Componentes visuais · Tom de voz · Guia de uso (DOs & DON'Ts)
- [ ] AC6: Box de destaque (fundo `#161322`, borda `WARM #FF6B35`): "Antes de criar qualquer peça, você precisa ter o Design System. É a base de tudo."
- [ ] AC7: Metadata: `title: 'Design System | Workshop Claude Design'`, canonical `/workshop-claude-design/design-system`

### Slide 04 — `kv-social`
- [ ] AC8: `src/app/workshop-claude-design/kv-social/page.tsx` criado
- [ ] AC9: Usa `WorkshopClaudeDesignLayout` com `slug="kv-social"`
- [ ] AC10: Título: "KV Social" com badge `DEMO`
- [ ] AC11: Definição: "Key Visual Social — a identidade visual derivada do Design System, aplicada às redes sociais (Instagram, LinkedIn, X)."
- [ ] AC12: Grid 3 colunas mostrando os formatos: Feed 1:1 · Stories 9:16 · Carrossel · Banner LinkedIn · Capa de perfil (cada um com dimensões exatas)
- [ ] AC13: Nota: "O KV não recria a identidade — ela deriva. O Design System é a lei; o KV é a aplicação."
- [ ] AC14: Metadata: `title: 'KV Social | Workshop Claude Design'`, canonical `/workshop-claude-design/kv-social`

### Slide 05 — `kv-site`
- [ ] AC15: `src/app/workshop-claude-design/kv-site/page.tsx` criado
- [ ] AC16: Usa `WorkshopClaudeDesignLayout` com `slug="kv-site"`
- [ ] AC17: Título: "KV Site" com badge `DEMO`
- [ ] AC18: Definição: "Key Visual para o site — hero section, OG image, banners e seções de destaque alinhados ao Design System."
- [ ] AC19: Lista de outputs: Hero image · OG Image (1200×630) · Banners de seção · Favicon
- [ ] AC20: Nota de destaque: "Se o seu site não reflete o que você fala no pitch, o mercado percebe o ruído."
- [ ] AC21: Metadata: `title: 'KV Site | Workshop Claude Design'`, canonical `/workshop-claude-design/kv-site`

## Escopo
**IN:** `design-system/page.tsx`, `kv-social/page.tsx`, `kv-site/page.tsx`
**OUT:** Slides 06+ (WCD-2.3)

## Contexto Técnico
- Tokens inline: `BG='#0D0B12'`, `SURFACE='#161322'`, `TEXT='#EDE9FF'`, `MUTED='#8B84A7'`, `ACCENT='#9B6DFF'`, `WARM='#FF6B35'`
- Badge `DEMO`: pequeno chip com `background: ACCENT`, `color: white`, `font-mono text-xs`, `uppercase tracking-widest`, `px-2 py-0.5`
- Referência de estrutura: workshop-3 slides existentes

## Dev Agent Record
| Campo | Valor |
|---|---|
| Agente | Novael (sites-dev-alpha) |
| Iniciado | 2026-06-19 |
| Concluído | 2026-06-19 |
| Branch | main |

## File List

## QA Results
