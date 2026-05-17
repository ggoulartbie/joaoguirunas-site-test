---
title: Shared Context
type: status-board
updated: 2026-05-17
tags: [ops]
---

# Status Board

O lead (team-os) atualiza este arquivo a cada mudança de estado dos teammates.

## Team ativo — joao-guirunas-site-mentoria-curso

**Status:** 🟢 ativo desde 2026-05-17
**Objetivo:** Estruturar e popular o curso "Mentoria Claude Code" no Supabase
**Branch:** `main` (sem branch separada por ora)
**Restrição:** Nenhum commit/push sem autorização explícita do João.

| Teammate | Fase | Status | Task |
|---|---|---|---|
| sites-architect (Zaelion) | Arquitetura + stories | ✅ concluído | `docs/mentoria-claude-code/02-arquitetura-sistema.md` + 5 stories MC-1.1..MC-1.4 + MC-2.1 contingente em `stories/backlog/` + BACKLOG.md atualizado |
| sites-data | Mapeamento schema banco | ✅ concluído | `docs/mentoria-claude-code/03-schema-banco.md` — schema completo, ERD, RLS, sequência inserção, 5 gaps |
| sites-ux (Velani) | Fluxo aluno | ✅ concluído | `docs/mentoria-claude-code/07-ux-fluxo-aluno.md` + `agents/ux/spec-curso-mentoria-claude-code.md` — fluxo completo, 33 aulas especificadas com slugs, integração Vimeo documentada |
| sites-devops | Pipeline deploy | ✅ concluído | `docs/mentoria-claude-code/06-deploy-pipeline.md` — em standby para commits |
| sites-dev-alpha (Novael) | Inventário frontend | ✅ concluído | `docs/mentoria-claude-code/04-componentes-frontend.md` — todos os componentes aluno+admin, Vimeo, materiais, data requirements |
| sites-analyst (Lyrel) | Análise conteúdo + gap analysis | ✅ concluído | `docs/mentoria-claude-code/01-analise-conteudo.md` — 11 módulos, 33 aulas, 9 gaps mapeados. Achado crítico: vimeo_id ausente é o único blocker real para publicar |

---

## Team ativo — joaoguirunas-academy-materiais-por-modulo

**Status:** 🟢 ativo desde 2026-05-17 — FASE 1 em curso (ADR-002)
**Objetivo:** Materiais (PDF, IMG, ZIP, LINK) por módulo, espelhando fluxo por aula
**Branch:** `feat-aulas-v2` (a definir)
**Restrição:** Nenhum commit/push sem autorização explícita do João. Schema decision passa por aprovação via ADR-002.

**Pipeline com bloqueios explícitos:**
1. ✅ **Soren/Zaelion (architect)** — ADR-002 entregue + status `accepted` (Opção A: tabela `module_materials` espelhada)
2. ✅ **João** — ADR-002 APROVADO em 2026-05-17
3. ✅ **Soren (architect)** — Fase 2: 6 stories FM-3.2..3.7 criadas (FM-3.2 active, demais backlog). Story 2.4 arquivada como superseded em `done/`. BACKLOG.md atualizado. Regras anti-recorrência (2.2 + 1.1) embutidas em ACs específicos.
4. ✅ **Bythelion (data) + lead** — FM-3.2 fechada: migration aplicada em prod, tipos OK, typecheck PASS, story movida para `done/`. Follow-up: `pnpm db:types` aponta para path errado (não bloqueia).
5. ✅ **Rexali (dev-beta)** — FM-3.3 fechada: 3 actions implementadas no `actions.ts` canônico + helper `src/lib/materials/storage.ts` (`getMaterialKind`, `buildMaterialPath`, `extractExt`) compartilhado. Bônus: refatorou actions de aula para usar os mesmos helpers — duplicação real reduzida vs. ADR projetava. Build OK.
6. ✅ **Novael (dev-alpha)** — todas as entregas concluídas (FM-3.4 + FM-3.5 + FM-3.7), reorder UX aprovado visualmente pelo João.
7. ⏭️ **Axilun (qa) — FM-3.6 PULADO**: João decidiu não fazer gate adversarial final (smoke AC10 + visual review do reorder foram suficientes para PO). FM-3.6 fica como story de processo no backlog (não bloqueia release).
8. 🔄 **sites-devops** — autorizado pelo João: 3 commits planejados (feat backend+admin / feat student / chore cleanup+docs) + push feat-aulas-v2 + fast-forward main + push main. Pré-commit housekeeping inclui mover stories ativas para done/.
7. ✅ **Axilun (qa)** — gate executado:
   - FM-3.2 ✅ PASS, FM-3.3 ⚠️ CONCERNS não-bloqueante (path mismatch lib/materials/storage.ts vs storage policy), FM-3.4 ✅ PASS, FM-3.5 ❌ FAIL
   - Catch crítico: typecheck/build não detectam `.is('coluna_string', null)` em coluna inexistente — PostgrestFilterBuilder é genérico
   - Documentado em `agents/qa/results.md` (entrada 2026-05-17 Epic FM) + 10 testes manuais para João
8. ⏳ **sites-devops** — release sob pedido explícito

**Nomenclatura cuidado:** `FM-2.x` = Fix Materiais (aulas, em curso) vs `FM-3.x` = Functional Materials por Módulo (nova feature). Mesmo prefixo FM, sequências distintas.
4. ⏳ **sites-data** — migration + RLS (espera ADR + story FM-3.2)
5. ⏳ **sites-dev-beta** — server actions (espera migration)
6. ⏳ **Novael (dev-alpha)** — UI admin nova rota `/modulos/[moduleId]/` + UI student (espera actions)
7. ⏳ **Axilun (qa)** — gate adversarial (espera tudo)
8. ⏳ **sites-devops** — release (sob pedido explícito, opcional)

**Aprendizados aplicados desde Story 2.2 (bug recorrente que vai entrar no escopo do FM-3.4 desde o início):**
- Botão delete visível para LINK também
- Optimistic com await + try/catch + rollback
- `revalidatePath` em todas as rotas afetadas
- `storage.remove` com guard de path vazio

---

## Team encerrado (release done) — joaoguirunas-academy-fix-vimeo-dimensions (2026-05-17)

**Status:** ✅ encerrado — FAA-1.4 publicada em main, deploy Vercel disparado
**Commits:**
- `57a7302` — `fix(student/video-player): forçar iframe Vimeo a preencher container 16:9`
- `bcc1250` — `chore(smart-memory): registrar team fix-vimeo-dimensions + Story FAA-1.4 done`
**Push:** `origin/feat-aulas-v2` ✅ + `origin/main` ✅ (fast-forward `01b0e8d..bcc1250`)
**Veredicto final:** PASS pragmático assinado pelo PO João, 4 teammates contribuíram (Soren / Novael / Axilun / sites-devops)
**Fricção descoberta:** Vimeo precisa de `localhost` no whitelist de domínios para dev local — salvo em memory `project_vimeo_localhost_domain`
**Sugestão para próximo ciclo (Axilun):** criar story XS no backlog para curso oculto "QA-Video-Player" com 3 vídeos fixos (16:9, 9:16, 4:3) — gate visual sistemático em mudanças no VideoPlayer

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

---

## Team ativo — joao-guirunas-site-mentoria-curso (2026-05-17)

**Status:** 🟢 ativo — mapeamento de estrutura e APIs em curso
**Objetivo:** Estruturar e popular o curso "Mentoria Claude Code" no Supabase
**Branch:** main

| Teammate | Task | Status |
|---|---|---|
| sites-dev-beta (Rexali) | Mapear server actions e APIs para população de cursos | ✅ concluído |

**Entregue:** `docs/mentoria-claude-code/05-server-actions-api.md`
**Achado chave:** A estrutura (curso + módulos + 12 aulas) já existe em prod via migration SQL. O conteúdo (video_id, summary, transcript) está NULL — precisa ser populado via migration SQL (batch) + Admin UI (iterativo). Não existe script de population TypeScript.

---

## Capacidades operacionais confirmadas (2026-05-17)

- **Supabase CLI** disponível em `/opt/homebrew/bin/supabase` v2.90.0, projeto linkado `mksmmpfyqowuzjcchhkl`
- Agentes podem executar SQL diretamente em produção: `supabase db query --linked "SQL"`
- Canal preferido para operações de banco — não requer que João rode SQL manualmente
- Detalhes completos em `docs/smart-memory/project/operational-capabilities.md`

---

## Team ativo — joao-guirunas-site-popular-mentoria-mc11-mc12 (2026-05-17)

**Status:** 🟢 ativo
**Objetivo:** Popular curso Mentoria Claude Code — stories MC-1.1 e MC-1.2
**Servidor local:** http://localhost:3000 (rodando)

| Teammate | Task | Status |
|---|---|---|
| bythelion (sites-data) | MC-1.1 AC1: snapshot banco M3+M5 → depois MC-1.2 migration | 🔄 em andamento |
| lyrel (sites-analyst) | MC-1.1 AC2: inventário .txt locais M3+M5 | 🔄 em andamento |
| zaelion (sites-architect) | MC-1.1 AC3-5: mapeamento + gap report (aguarda bythelion + lyrel) | ⏳ aguardando |
| rexali (sites-dev-beta) | MC-1.2: validar schema + dry-run pré-migration | 🔄 em andamento |

## Blockers
<!-- Nenhum blocker de código — apenas operacionais aguardando João -->
