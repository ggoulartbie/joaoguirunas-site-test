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
| sites-dev-alpha | ✅ concluído | Fix SEO canonical + OG tags /academy/turmas (7c39341) | 2026-05-07 |
| sites-dev-delta | ✅ concluído | F10.4 — criar aluno manual + email convite | 2026-05-06 |
| sites-dev-gamma | ✅ concluído | F11.1 — pg_cron + Edge Functions em produção (a0c1c8b) | 2026-05-07 |
| sites-devops | ✅ concluído | F8.6 ✅ deploy no ar — joaoguirunas.com, webhook Stripe, todas env vars | 2026-05-07 |
| sites-qa | ⚠️ CONCERNS preliminar | F8.7 — veredicto final aguarda ACs manuais de João | 2026-05-07 |

## Team ativo

**Nome:** joao-guirunas-site-refactor-checkout-academy
**Status:** 🟢 ativo desde 2026-05-08
**Objetivo:** Refactor /curso-online + auditoria completa checkout Stripe e academy
**Início:** 2026-05-08T23:17:00-03:00

| Teammate | Status | Task atual |
|---|---|---|
| sites-architect | 🔄 em andamento | Criar stories F9.7+ para auditoria completa academy |
| sites-dev-alpha | 🔄 em andamento | F9.1 — refactor /curso-online |
| sites-dev-beta | 🔄 em andamento | Auditoria backend academy + verificação F9.2 |
| sites-qa | 🔄 em andamento | QA formal F9.2 (sem QA ainda) |
| sites-devops | ⏳ aguardando | Push + PR após QA gate |

---

## Team anterior

**Nome:** joao-guirunas-site-plataforma-cursos-completo
**Status:** ⛔ encerrado por João em 2026-05-07
**Objetivo:** Plataforma de cursos Fases 1–9 — 42 stories, do schema ao deploy
**Início:** 2026-05-06T19:30:00-03:00
**Encerramento:** 2026-05-07

## Último encerramento

**Data:** 2026-05-07
**Sessão:** Sprint plataforma-cursos-completo — encerramento
**Trabalho realizado:**
- 70 stories done (Fases 1–11)
- Produção live: joaoguirunas.com
- F11.1 pg_cron + Edge Functions (cron-daily, cron-hourly) deployados no Supabase
- Admin pagamentos + moderação: dados reais (sem mocks)
- types/database.ts regenerado
- SEO /academy/turmas: canonical + OG tags corrigidos

## ⚠️ Pendente para próxima sessão

- **João**: Criar cohort `curso-online-padrao` em joaoguirunas.com/academy/admin/turmas/nova
  - slug: `curso-online-padrao`, preço: 79700 (centavos = R$ 797), status: OPEN, purchasable: ✅
  - Desbloqueia F8.7 smoke test (AC4)
- **João**: Verificar seed UUID `40000000-0000-0000-0000-000000000001` no Supabase prod (Table Editor → cohort_members)
- **João**: Fornecer VIMEO_ACCESS_TOKEN (Vercel env var)
- **João**: Fornecer SENTRY_DSN + SENTRY_AUTH_TOKEN
- **F8.7**: Smoke test ACs manuais — aguarda cohort + João disponível
- **F8.5**: E2E Playwright — MVP debt, baixa prioridade
- **Próximo ciclo**: João definir objetivo do novo time

## Decisões ativas

- Vercel Hobby plan — sem crons. Toda lógica agendada via Supabase pg_cron + Edge Functions.
- Auth: sem signup público. Admin cria alunos manualmente ou via webhook Stripe.
- Duas rotas de compra: /curso-online (público, sem auth) e /mentoria (lead gen).

## Blockers
<!-- Nenhum blocker de código — apenas operacionais aguardando João -->
