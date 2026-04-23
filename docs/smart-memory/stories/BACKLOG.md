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
| [[backlog/2.1-pricing-calculator-v1-to-v2\|2.1]] | Promover PricingCalculator V2 (P0) + fixes layoutId/aria | M | done | sites-dev-gamma |
| [[backlog/2.2-revosform-skeleton\|2.2]] | Skeleton loading no RevosForm (P1) | S | done | sites-dev-gamma |
| [[backlog/2.3-a11y-calculator-faq\|2.3]] | A11y — role=checkbox na calculadora + aria-controls no FAQ (P2) | S | done | sites-dev-gamma |

## Epic 1 — Cleanup pós-discovery

Stories 1.1–1.3 resolvem os pontos de atenção 1, 2 (parcial — apenas inclusão da rota ausente) e 4 do [[../project/overview|overview]]. Pontos 3 (zero testes) e 5 (RevosForm externo) ficam fora deste epic.

## Epic 2 — Design recommendations P0–P2

Stories 2.1–2.3 derivadas das recomendações do sites-ux em [[../agents/ux/design-recommendations]]. Prioridade de execução: **2.1 primeiro** (P0, bloqueia 2.3 pois modifica o componente canônico `PricingCalculator`). 2.2 é independente e pode rodar em paralelo com 2.1. 2.3 roda depois da 2.1.

Ponto 5 do overview (RevosForm externo) é parcialmente mitigado pela Story 2.2 no quesito UX — acessibilidade interna do form Revos permanece fora de escopo (embed de terceiro).

## Epic 3 — SEO (derivado do seo-audit.md)

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/3.0-open-source-metadata\|3.0]] | /open-source metadata + server wrapper (P0) | S | done | sites-dev-gamma |
| [[backlog/3.1-titles-descriptions-top10\|3.1]] | Titles e descriptions — top 10 páginas (P1) | L | backlog | sites-dev-alpha |
| [[backlog/3.2-course-schema-mentoria\|3.2]] | Course schema JSON-LD em /mentoria (P1) | S | done | sites-dev-gamma |
| [[backlog/3.3-h1-duplo-mentoria\|3.3]] | H1 duplo no DOM em /mentoria (P1) | XS | done | sites-dev-gamma |
| [[backlog/3.4-cwv-image-sizes\|3.4]] | CWV — sizes em imagens responsivas (P2) | S | backlog | — |

Source: [[../agents/research/seo-audit]]. Prioridade: 3.0 e 3.3 resolvem lacunas críticas. 3.1 é a maior oportunidade de tráfego (bulk titles/descriptions). 3.2 aumenta elegibilidade de rich results na página de maior valor comercial. 3.4 melhora CWV marginal.
