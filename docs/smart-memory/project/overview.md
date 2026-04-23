---
title: Project Overview
type: overview
status: active
agent: team-os
created: 2026-04-23
updated: 2026-04-23
tags: [project, overview]
related: ["[[modules]]", "[[architecture]]", "[[tech-stack]]", "[[conventions]]", "[[../agents/ux/components]]"]
---

# Overview — joao-guirunas-site

Site de autoridade pessoal + funil de conversão de **João Guirunas** (CEO GrowthSales.ai), publicado em `joaoguirunas.com`.

## Objetivo do projeto

Hub de conteúdo open source com 40+ recursos (skills, tools, learn, frameworks) e funil principal para a **Mentoria** — produto pago. O site funciona como prova social de autoridade técnica e canal de captação.

## Stack principal

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 + App Router |
| Linguagem | TypeScript 5.7 (strict) |
| UI | React 19 — Server Components por padrão |
| Styling | Tailwind v4 (sem config file, `@theme` em globals.css) |
| Animações | Framer Motion + tsParticles |
| Fontes | Geist + Space Grotesk + Geist Mono via next/font |
| Deploy | Vercel (redirect 301 de opensource.growthsales.ai) |
| Analytics | GA4 (`G-3JD3TYNF7V`) manual no layout |
| Formulário | Revos embed (terceiro) |

> Detalhes completos: [[tech-stack]]

## Padrão arquitetural

- **App Router 100%** — nenhum `/pages`, SSG dominante, zero ISR/SSR dinâmico
- **Padrão SkillPage** — ~33 páginas compartilham um único template (`src/shared/components/templates/SkillPage.tsx`), reduzindo boilerplate para novas páginas
- **Co-location** — componentes específicos de rota vivem junto da página em `src/app/<rota>/`
- **Zero backend próprio** — todas integrações via SaaS (Revos, GA, Vercel)
- **SEO** — Metadata API + JSON-LD por página (Person/WebSite global, Breadcrumb/SoftwareApplication por página)

> Decisões e riscos detalhados: [[architecture]]

## Módulos principais

| Grupo | Rotas | Descrição |
|---|---|---|
| Core | `/`, `/open-source` | Home (hero animado) + hub filtrável de 40+ recursos |
| **Mentoria** | `/mentoria`, `/mentoria/apresentacao` | Funil principal — 12 componentes co-locados, embed Revos |
| Workshop | `/workshop-1` | Apresentação canvas com layout fullscreen próprio |
| Skills | `/skills/*` (25 páginas) | Páginas de skills — padrão SkillPage |
| Tools | `/tools/*` (4 páginas) | Páginas de ferramentas — padrão SkillPage |
| Learn | `/learn/*` (10 páginas) | Páginas de aprendizado — padrão SkillPage |
| Framework/Infra | `/framework`, `/monitor`, `/squads`, `/setup` | Páginas do ecossistema AIOX |
| SEO | `robots.ts`, `sitemap.ts` | 47 URLs catalogadas (hardcoded) |

> Mapa completo de rotas: [[modules]]

## Componentes UI principais

- **SiteChrome** — wrapper global (Header + Footer), com comportamento especial na home
- **SkillPage** — template de ~33 páginas
- **AnimatedHero** — hero rotativo com framer-motion (apenas na home)
- **PricingCalculator** — calculadora ativa na /mentoria
- **WorkshopClient / ApresentacaoClient** — apresentações canvas/Reveal.js

> Catálogo completo: [[../agents/ux/components]]

## Pontos de atenção

1. ~~**Dead code** removido~~ — Story 1.1 concluída (HeroSection + PricingCalculatorV2 deletados)
2. **Sitemap hardcoded** em `src/app/sitemap.ts` — novas rotas exigem edição manual do array (Story 1.2 adicionou claude-agent-teams; automação é story futura)
3. **Zero testes** — nenhum test runner configurado
4. ~~**src/features/ removida**~~ — Story 1.3 concluída
5. **RevosForm** é embed de terceiro — acessibilidade não auditável pelo projeto
