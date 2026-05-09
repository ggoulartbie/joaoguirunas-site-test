---
title: Smart Memory Index
type: index
updated: 2026-05-08
tags: [index]
---

# joao-guirunas-site — Smart Memory

MOC raiz. Todo arquivo novo em `docs/smart-memory/` deve ser referenciado aqui.

## Projeto
- [[project/overview]] — contexto e objetivo
- [[project/tech-stack]] — stack (fonte: sites-analyst)
- [[project/architecture]] — padrão arquitetural Next.js App Router + SkillPage template (fonte: sites-architect)
- [[project/modules]] — mapa de ~50 rotas agrupadas em 10 grupos (fonte: sites-architect)
- [[project/conventions]] — convenções de código (fonte: sites-analyst)

## Stories
- [[stories/BACKLOG]] — stories pendentes (Epics 1–6 do site + Epic Plataforma de Cursos F1–F8)
- `stories/active/` — em desenvolvimento
- `stories/done/` — concluídas

## Decisões Arquiteturais
- [[decisions/ADR-001-plataforma-cursos-stack]] — stack e decisões consolidadas da plataforma de cursos
- `decisions/` — ADRs numerados

## Operações
- [[ops/delegation-log]] — histórico de delegações do lead
- [[ops/teams-log]] — times formados e seus objetivos
- [[ops/launch-readiness]] — relatório de prontidão de launch (features completas, concerns, env vars, infra checklist)
- [[ops/smoke-test-script]] — roteiro de smoke test manual pós-deploy para João

## Runbooks
- [[runbooks/go-live-checklist]] — gate formal F8.7 (13 ACs: auth, conteúdo bloqueado, compra real, cross-ext, refund, emails, performance, RLS, sentry, cron, backup)
- [[runbooks/launch-2026-05-07]] — execução go-live em prod 2026-05-07 (pré-flight ✅; checklist final F8.7 2026-05-08 com BLOCKER de Stripe Price ID + CONCERNs documentados)
- [[runbooks/certificados]] — reemissão manual, revogação, env vars, decisão rate limit P-02

## Agentes
- [[agents/data-engineer/schema]] — schema completo (21 tabelas, funções, índices)
- [[agents/data-engineer/rls-policies]] — RLS policies por tabela + casos de teste
- [[agents/data-engineer/storage]] — buckets de storage, paths, signed URLs
- [[agents/data-engineer/migrations-log]] — log de migrations aplicadas
- [[agents/qa/results]] — histórico de veredictos
- [[agents/ux/components]] — specs de componentes
- [[agents/ux/design-recommendations]] — recomendações P0/P1/P2 (accent, dead code, a11y)
- [[agents/ux/curso-online-agents-redesign]] — spec redesign seção agentes /curso-online (cards 110px, sem blur, sem link, min-h 80vh)
- `agents/research/` — research reports
- [[agents/research/seo-audit]] — auditoria SEO completa (titles, headings, schema, CWV, sitemap) — 2026-04-23
- [[agents/research/api-admin-inventory]] — inventário e audit das APIs em /api/admin/ — 2026-05-07
- [[agents/research/student-bug-hunt]] — bug hunt + a11y sweep área do aluno (14 bugs: 1 P0, 5 P1) — 2026-05-09
- [[agents/data/audit-database]] — auditoria schema + RLS + bugs fluxo /curso-online — 2026-05-08

## Status
- [[shared-context]] — status board em tempo real
