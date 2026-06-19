---
title: Story Backlog
type: backlog
updated: 2026-06-19
tags: [story]
---

# Backlog de Stories

## Epic WCD — Workshop Claude Design (2026-06-19)

| Story | Título | Complexidade | Wave | Status | Agente |
|---|---|---|---|---|---|
| [[backlog/WCD-1.1-deck-layout-component\|WCD-1.1]] | WorkshopClaudeDesignLayout component + slides.ts | M | Wave 0 | backlog | sites-dev-alpha |
| [[backlog/WCD-1.2-index-page\|WCD-1.2]] | Página índice /workshop-claude-design | S | Wave 1 | backlog | sites-dev-alpha |
| [[backlog/WCD-2.1-slides-abertura-interface\|WCD-2.1]] | Slides 01-02: Abertura + Interface Claude Design | M | Wave 1 | backlog | sites-dev-alpha |
| [[backlog/WCD-2.2-slides-design-system-kv\|WCD-2.2]] | Slides 03-05: Design System + KV Social + KV Site | M | Wave 1 | backlog | sites-dev-alpha |
| [[backlog/WCD-2.3-slides-divisao-handoff\|WCD-2.3]] | Slides 06-07: Divisão DS vs KV + Handoff | M | Wave 1 | backlog | sites-dev-alpha |
| [[backlog/WCD-2.4-slides-prompts-demo\|WCD-2.4]] | Slides 08-10: Prompt DS + Prompt Apresentação + Demo Final | M | Wave 1 | backlog | sites-dev-alpha |
| [[backlog/WCD-3.1-qa-gate\|WCD-3.1]] | QA Gate — Workshop Claude Design | M | Wave 2 | backlog | sites-qa |
| [[backlog/WCD-4.1-push-pr\|WCD-4.1]] | Push + PR (user-triggered) | S | Wave 3 | backlog | sites-devops |

**Objetivo do Epic WCD:** Criar o workshop `/workshop-claude-design` — 10 slides em Next.js similar ao workshop-3, cobrindo: Interface do Claude Design, Design System, KV Social, KV Site, divisão DS vs KV, handoff, e prompts reutilizáveis. O slide final (demo-slides) exibe o pitch da palestrante e instrui a criação ao vivo de slides no Claude.

**Brand:** Dark purple (`#0D0B12` BG · `#9B6DFF` accent · `#FF6B35` warm · `#EDE9FF` text) — identidade Claude, não Growth Sales.

**Slides e rotas:**
1. `/workshop-claude-design/abertura` — Contexto do pitch, frases da palestrante
2. `/workshop-claude-design/interface` — O que é Claude Design, como acessar
3. `/workshop-claude-design/design-system` — Demo: criar Design System
4. `/workshop-claude-design/kv-social` — Demo: KV Social (Instagram, LinkedIn)
5. `/workshop-claude-design/kv-site` — Demo: KV Site (hero, OG image)
6. `/workshop-claude-design/divisao` — DS vs KV: quando usar cada
7. `/workshop-claude-design/handoff` — Como entregar o handoff
8. `/workshop-claude-design/prompt-design-system` — Prompt reutilizável
9. `/workshop-claude-design/prompt-apresentacao` — Prompt para slides/pitch
10. `/workshop-claude-design/demo-slides` — Demo final com pitch da palestrante

**Wave plan:**
- Wave 0 (solo): WCD-1.1 — layout + slides.ts (pré-requisito de tudo)
- Wave 1 (5 paralelos): WCD-1.2 + WCD-2.1 + WCD-2.2 + WCD-2.3 + WCD-2.4
- Wave 2: WCD-3.1 QA Gate
- Wave 3: WCD-4.1 Push + PR (requer autorização do João)
