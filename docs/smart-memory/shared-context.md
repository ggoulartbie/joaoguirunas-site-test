---
title: Shared Context
type: status-board
updated: 2026-05-07
tags: [ops]
---

# Status Board

O lead (team-os) atualiza este arquivo a cada mudança de estado dos teammates.

## Teammates ativos

| Teammate | Status | Task atual | Desde |
|---|---|---|---|
| sites-data | ✅ concluído | F1.2–F1.8 + F9.x — todas as stories done | 2026-05-06 |
| sites-dev-beta | ✅ concluído | Fix mock data → Supabase real (pagamentos + moderação + types) | 2026-05-07 |
| sites-dev-alpha | ✅ concluído | F10.2 (badge admin) + F10.3 (/curso-online + home CTA) | 2026-05-06 |
| sites-dev-delta | ✅ concluído | F10.4 — criar aluno manual + email convite | 2026-05-06 |
| sites-dev-gamma | ⏳ pendente | F11.1 — migrar crons para Supabase pg_cron (backlog) | 2026-05-07 |
| sites-devops | ✅ concluído | F8.6 ✅ deploy no ar — joaoguirunas.com, webhook Stripe, todas env vars | 2026-05-07 |
| sites-qa | ⏸️ bloqueado | F8.7 — aguarda criação de cohort `curso-online-padrao` em /academy/admin | 2026-05-07 |

## Team ativo

**Nome:** joao-guirunas-site-plataforma-cursos-completo
**Objetivo:** Plataforma de cursos Fases 1–9 — 42 stories, do schema ao deploy
**Início:** 2026-05-06T19:30:00-03:00

## Último encerramento

**Data:** 2026-05-07
**Sessão:** Fixes pós-deploy — mock data, types regenerados, deploy em produção
**Trabalho realizado:**
- PaymentsClient: mock → query Supabase real (payments + profiles + cohorts)
- ModerationClient: mock → queries comments + forum_threads reais
- types/database.ts regenerado (onboarding table + modules.cover_image_url)
- Commit 0acc951 + push → Vercel redeploy automático

## ⚠️ Pendente para próxima sessão

- **João**: Criar cohort `curso-online-padrao` em joaoguirunas.com/academy/admin/turmas/nova
  - slug: `curso-online-padrao`, preço: 49900 (centavos), status: OPEN, purchasable: ✅
  - Desbloqueia F8.7 smoke test (AC4)
- **João**: Fornecer VIMEO_ACCESS_TOKEN (Vercel env var) para vídeos em produção
- **João**: Fornecer SENTRY_DSN + SENTRY_AUTH_TOKEN
- **F11.1**: Migrar crons para Supabase pg_cron — aguarda sinal para iniciar
- **F8.7**: Smoke test — aguarda cohort em prod
- **F8.5**: E2E Playwright — MVP debt, baixa prioridade

## Decisões ativas
<!-- Architect atualiza após cada ADR -->

## Blockers
- sites-qa: aguarda cohort `curso-online-padrao` criada em produção por João
