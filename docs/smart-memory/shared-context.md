---
title: Shared Context
type: status-board
updated: 2026-05-16
tags: [ops]
---

# Status Board

O lead (team-os) atualiza este arquivo a cada mudança de estado dos teammates.

## Team ativo — joaoguirunas-academy-materials-fix

**Nome:** joaoguirunas-academy-materials-fix
**Status:** 🟢 ativo desde 2026-05-16
**Objetivo:** Fix UX de materiais: (A) download abre nova aba no aluno; (B) admin lista/exclui materiais da aula
**Início:** 2026-05-16T03:25:00-03:00
**Branch:** fix-aula-aluno-ux-bugs

| Teammate | Story | Status | Task atual |
|---|---|---|---|
| sites-architect | 2.1, 2.2 | ✅ concluído | Stories 2.1 e 2.2 criadas, GO 5/5. Achado: lista admin já existe em `LessonEditorClient.tsx`, só fixar 3 bugs |
| sites-ux | 2.2 | ✅ concluído | Spec em `agents/ux/spec-admin-materials-management.md` (sem shadcn — painel inline) |
| sites-dev-alpha | 2.1, 2.2 | ✅ concluído | Commits `8035b6a` (2.1), `8c85989`+`bba354d` (2.2 UI) |
| sites-dev-beta | 2.2 | ✅ concluído | Commits `4861283` (material-actions.ts), `d05e5ac` (actions.ts:211) — 2 componentes coexistem |
| sites-qa | 2.1, 2.2 | 🔄 revisando | Gate request enviado: typecheck + build + smoke test admin/aluno |
| sites-devops | 2.1, 2.2 | ⏳ aguardando | Push após QA PASS |

## Team anterior (joao-guirunas-site-academy-ops)

**Nome:** joao-guirunas-site-academy-ops
**Status:** ⛔ encerrado implicitamente (nova sessão, novo team)
**Encerramento:** 2026-05-16

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
