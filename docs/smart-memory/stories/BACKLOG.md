---
title: Story Backlog
type: backlog
updated: 2026-04-23
tags: [story]
---

# Backlog de Stories

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/1.1-remove-dead-code-hero-pricing-v2\|1.1]] | Remover dead code — HeroSection e PricingCalculatorV2 | S | done | sites-dev-gamma |
| [[backlog/1.2-sitemap-claude-agent-teams\|1.2]] | Adicionar /skills/claude-agent-teams ao sitemap.xml | S | done | sites-dev-gamma |
| [[backlog/1.3-remove-src-features-folder\|1.3]] | Remover src/features/ (pasta inutilizada) | S | done | sites-dev-gamma |
| [[backlog/2.1-pricing-calculator-fixes\|2.1]] | PricingCalculator V1 — fixes squad reset + aria-pressed (P0) | M | done | sites-dev-gamma |
| [[backlog/2.2-revosform-skeleton\|2.2]] | Skeleton loading no RevosForm (P1) | S | done | sites-dev-gamma |
| [[backlog/2.3-a11y-calculator-faq\|2.3]] | A11y — role=checkbox na calculadora + aria-controls no FAQ (P2) | S | done | sites-dev-gamma |

## Epic 1 — Cleanup pós-discovery

Stories 1.1–1.3 resolvem os pontos de atenção 1, 2 (parcial — apenas inclusão da rota ausente) e 4 do [[../project/overview|overview]]. Pontos 3 (zero testes) e 5 (RevosForm externo) ficam fora deste epic.

## Epic 2 — Design recommendations P0–P2

Stories 2.1–2.3: 2.1 aplica fixes pontuais no V1 ativo (squad reset bug + aria). 2.2 e 2.3 são independentes. Decisão de lead: manter V1 (squad tabs, parcelas, trust indicators) — V2 era dead code e foi deletado na Story 1.1.

Ponto 5 do overview (RevosForm externo) é parcialmente mitigado pela Story 2.2 no quesito UX — acessibilidade interna do form Revos permanece fora de escopo (embed de terceiro).

## Epic 3 — SEO (derivado do seo-audit.md)

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/3.0-open-source-metadata\|3.0]] | /open-source metadata + server wrapper (P0) | S | done | sites-dev-gamma |
| [[backlog/3.1-titles-descriptions-top10\|3.1]] | Titles e descriptions — top 10 páginas (P1) | L | done | sites-dev-gamma |
| [[backlog/3.2-course-schema-mentoria\|3.2]] | Course schema JSON-LD em /mentoria (P1) | S | done | sites-dev-gamma |
| [[backlog/3.3-h1-duplo-mentoria\|3.3]] | H1 duplo no DOM em /mentoria (P1) | XS | done | sites-dev-gamma |
| [[backlog/3.4-cwv-image-sizes\|3.4]] | CWV — sizes em imagens responsivas (P2) | S | backlog | — |

Source: [[../agents/research/seo-audit]]. Prioridade: 3.0 e 3.3 resolvem lacunas críticas. 3.1 é a maior oportunidade de tráfego (bulk titles/descriptions). 3.2 aumenta elegibilidade de rich results na página de maior valor comercial. 3.4 melhora CWV marginal.

## Epic 4 — KV Growth Sales — Unidade Visual

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/4.1-kv-global-tokens-watermark\|4.1]] | KV Global — tokens de cor, dot-grid texture e watermark diamante | S | done | sites-dev-alpha |
| [[backlog/4.2-kv-typography-display\|4.2]] | KV Tipografia — Fraunces display nos H1 principais | M | done | sites-dev-alpha |
| [[backlog/4.3-kv-mentoria-facilitadores-badges\|4.3]] | KV Mentoria — facilitadores rect style + section badges | M | done | sites-dev-alpha |
| [[backlog/4.4-kv-open-source-header-colors\|4.4]] | KV Open-Source — header editorial + unificação de cores | M | done | sites-dev-alpha |
| [[backlog/4.5-kv-token-cleanup-legacy-ff4400\|4.5]] | KV Token Cleanup — uniformizar #FF4400 legados | S | backlog | — |
| [[backlog/4.6-kv-open-source-dual-h1\|4.6]] | KV Open-Source — corrigir H1 duplo (regressão SEO/a11y) | S | backlog | — |

Source: análise KV Growth Sales (2026-04-26). Epic adapta Home, Mentoria e Open-Source ao KV da Growth Sales sem alterar logos. Foco: simbologia (watermark diamante), tipografia display (Fraunces), refinamento de tokens e section badges. Stories 4.1–4.4 concluídas (QA PASS 2026-04-26). Stories 4.5 e 4.6 são follow-ups de concerns não-bloqueantes do QA.
