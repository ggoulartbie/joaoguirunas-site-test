---
title: Shared Context
type: status-board
updated: 2026-05-11
tags: [ops]
---

# Status Board

O lead (team-os) atualiza este arquivo a cada mudança de estado dos teammates.

## Team ativo — joao-guirunas-site-academy-ops

**Nome:** joao-guirunas-site-academy-ops
**Status:** 🟢 ativo desde 2026-05-11
**Objetivo:** Operação contínua da área /academy — 2 pipelines em paralelo
**Início:** 2026-05-11T09:56:00-03:00

| Teammate | Pipeline | Status | Task atual |
|---|---|---|---|
| analyst-1 | A | 🔄 em andamento | Research admin: usuários (delete/block) + pagamentos (delete pending) |
| analyst-2 | B | 🔄 em andamento | Research InfinitePay: webhook URL, produto R$1, fluxo completo |
| architect-1 | A | ⏳ aguardando | Aguarda relatório do analyst-1 |
| architect-2 | B | ⏳ aguardando | Aguarda relatório do analyst-2 |
| dev-alpha | A/B | ⏳ aguardando | Lendo contexto do projeto |
| dev-beta | A/B | ⏳ aguardando | Lendo contexto do projeto |
| sites-qa | gate | ⏳ aguardando | Gate de qualidade — acionado após implementação |
| sites-devops | release | ⏳ aguardando | Push/PR — acionado após QA PASS |

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
