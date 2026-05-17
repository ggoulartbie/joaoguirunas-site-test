---
title: Shared Context
type: status-board
updated: 2026-05-16
tags: [ops]
---

# Status Board

O lead (team-os) atualiza este arquivo a cada mudança de estado dos teammates.

## Team ativo (release) — joaoguirunas-academy-fix-vimeo-dimensions (2026-05-17)

**Status:** 🟢 release em andamento — sites-devops fazendo commit + push para main (autorizado pelo João)
**Veredicto:** PASS pragmático — fix validado (build OK, QA OK, teste visual localhost OK)
**Entregue:** fix do iframe Vimeo em `src/components/student/VideoPlayer.tsx` (linhas 108 + 310)
**Fricção descoberta:** Vimeo precisa de `localhost` no whitelist de domínios para dev local — salvo em memory `project_vimeo_localhost_domain`

| Teammate | Fase | Status |
|---|---|---|
| sites-architect (Soren) | Story | ✅ FAA-1.4 entregue |
| sites-dev-alpha (Novael) | Impl | ✅ fix validado + build OK |
| sites-qa (Axilun) | Gate | ✅ PASS pragmático |
| sites-devops | Release | 🔄 commit + push feat-aulas-v2 → fast-forward main → push main |

---

**Contexto crítico:** Modificação local não commitada em `src/components/student/VideoPlayer.tsx` tenta consertar via `responsive: false` + `[&_iframe]:h-full [&_iframe]:w-full [&_iframe]:absolute [&_iframe]:inset-0`.

**Gap raiz da Story 1.1 (insight do QA Axilun):** o arquivo `stories/done/1.1-fix-vimeo-aspect-ratio.md` tem `checklist: GO` mas campo "QA Results" VAZIO — o gate formal nunca foi exercido. A nova story 1.4 NÃO pode ser fechada sem QA Results preenchido com PASS/CONCERNS/FAIL + testes visuais manuais documentados pelo João com vídeos reais 9:16 e 4:3.

**Pontos de auditoria adversarial (QA Axilun, pré-implementação):**
1. `responsive: false` no SDK: o Vimeo SDK ainda emite `timeupdate`/`ended` corretamente? Risco quebrar saveProgress/markComplete.
2. Arbitrary CSS selector `[&_iframe]:...` funciona com o purge do Tailwind do projeto?
3. Cobertura: 9:16 (vertical), 4:3 e 16:9 com e sem letterbox nativo.
4. YouTube não regredir.
5. `pnpm build` deve passar.

---

## Team anterior — joaoguirunas-academy-investigar-servidor-restart (encerrado 2026-05-16)

**Status:** ✅ encerrado — build Vercel passou, deploy concluído
**Entregues:** dev:restart no package.json + force-dynamic global em 104 pages server-side

---

## Team anterior — joaoguirunas-academy-investigar-servidor-restart

**Nome:** joaoguirunas-academy-investigar-servidor-restart
**Status:** 🟢 ativo desde 2026-05-16
**Objetivo:** Investigar queda do servidor local e implementar restart automático
**Restrição:** Nenhum push/deploy sem confirmação explícita de João

| Teammate | Fase | Status | Task atual |
|---|---|---|---|
| sites-dev-delta | Investigação | 🔄 em andamento | Analisar causa raiz — process duplicado vs. crash real |
| sites-devops | Implementação | 🔄 em andamento | Script `dev:restart` no package.json |
| sites-qa | Gate | ✅ concluído | CONCERNS — liberado p/ push. Veredicto em `agents/qa/server-restart-verdict.md` |

---

## Team anterior — joaoguirunas-academy-server-perf-crash

**Nome:** joaoguirunas-academy-server-perf-crash
**Status:** 🟢 ativo desde 2026-05-16T14:40:00-03:00
**Objetivo:** Investigar e corrigir instabilidade do servidor web — crashes frequentes por libs pesadas
**Restrição:** Nenhum push/deploy sem confirmação explícita de João

| Teammate | Fase | Status | Task atual |
|---|---|---|---|
| sites-analyst | Diagnóstico | ✅ concluído | Relatório em `agents/research/server-perf-analysis.md` — 3 causas críticas |
| sites-dev-delta | Hardening | ✅ concluído | Relatório em `agents/hardening/server-perf-hardening.md` — 3 CRÍTICOs, 4 ALTOs |
| sites-dev-alpha | Frontend | ✅ concluído | Relatório em `agents/research/frontend-bundle-audit.md` — tsParticles estático |
| sites-dev-beta | Backend | ✅ concluído | Relatório em `agents/research/backend-perf-audit.md` — middleware com query por request |
| sites-qa | Gate | ✅ pronto | Critérios em `agents/qa/server-perf-qa-criteria.md` — 9 seções, 6 ACs críticos |

## Team anterior — joaoguirunas-academy-materials-fix

**Nome:** joaoguirunas-academy-materials-fix
**Status:** ⏳ pausado (QA pendente + push aguardando João)
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
| sites-devops | 2.1, 2.2 | ⏳ aguardando | Push após QA PASS e confirmação de João |

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
