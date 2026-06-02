---
title: Shared Context
type: status-board
updated: 2026-05-17
tags: [ops]
---

# Status Board

O lead (team-os) atualiza este arquivo a cada mudança de estado dos teammates.

## Team ativo — joaoguirunas-academy-turma-acesso-granular (2026-05-25)

**Status:** 🟡 em execução — teammates em paralelo
**Objetivo:** `included_lesson_ids` em cohort_courses + admin UI + student enforcement
**Branch:** a ser criada pelo sites-devops (feat/turma-acesso-granular)
**Restrição:** Nenhum push sem QA PASS + autorização explícita do João.

**Semântica definida pelo lead:**
- `included_lesson_ids uuid[] DEFAULT '{}'` — array vazio = todas as aulas do módulo liberadas
- Se `included_module_ids = []` (full course) → `included_lesson_ids` não se aplica
- Aula de módulo não permitido é bloqueada independente de `included_lesson_ids`
- RPC `has_access` no banco é o gate primário — migration deve atualizá-la

**Pipeline:**
1. 🔄 **sites-architect** — ADR + stories TGA (incorporando feedback QA + semântica)
2. ⏳ **sites-data** — pronto para migration assim que ADR confirmar (semântica entregue)
3. ⏳ **sites-dev-alpha** — plano mapeado (Novael): novo estado `selectedLessons`, 3º nível UI, query atualizada
4. ⏳ **sites-dev-beta** — plano mapeado (Rexali): 5 pontos de modificação identificados
5. ⏳ **sites-qa** — observações críticas prontas (Axilun): RPC, inconsistência pages, 10 ataques
6. ⏳ **sites-devops** — pronto (Graveli): branch main limpa

---

## Team encerrado — joaoguirunas-academy-fix-aulas-abertura-404 (2026-05-17)

**Status:** 🟢 commits locais criados, aguardando autorização do PO para push
**Objetivo:** Fix bug 404 em aulas "Abertura" — colisão de slug entre módulos do mesmo curso
**Branch:** `feat-aulas-v2` (rebased em origin/main)
**Restrição:** Nenhum push sem autorização explícita do João.

**Pipeline com bloqueios explícitos:**
1. ✅ **sites-data (Bythelion)** — diagnóstico data layer em `agents/data-engineer/diagnose-slug-abertura.md`. Causa raiz: schema `unique(module_id, slug)` permite slug "abertura" em múltiplos módulos do mesmo curso; query lookup filtra só por slug+course, retorna 2 rows, `.single()` → null → notFound().
2. ✅ **sites-dev-gamma (Seranol)** — diagnóstico fullstack em `decisions/diagnose-aulas-abertura-404.md`. Confirmou bug também em `generateMetadata` (linha 28).
3. ✅ **Lead (team-os)** — sintetizou + apresentou ao PO. **Decisão João:** Opção C (fix de dados rápido) + guard no gerador.
4. ✅ **sites-data (Bythelion)** — fix de dados aplicado em prod via MCP: lesson M5 (id `0c96c53a-fd68-4651-bcd4-530d6e3f9bd0`) renomeada de `abertura` → `abertura-2`. M3 (`9828e194`, criada antes) mantém `abertura`. 3 smoke-tests PASS, zero slugs duplicados no banco. URLs `/aula/abertura` e `/aula/abertura-2` ambas funcionando.
5. ✅ **sites-dev-gamma (Seranol)** — guard implementado em `src/lib/lessons/slug.ts` (helper `ensureUniqueSlugInCourse`) + integrado em `createLesson` e `updateLesson` de `actions.ts`. Sufixo numérico `-2`, `-3`. Idempotente via `ignoreLessonId`.
6. ✅ **sites-qa (Axilun)** — veredito PASS (10/10 ataques, typecheck+build PASS, guard cobre 100% das vias admin, zero refs hardcoded a `abertura`). 3 nits não-bloqueantes documentados.
7. ✅ **sites-dev-gamma** — endereçados NIT-1 (slug efetivo retornado no `createLesson` + setState do `CourseEditorClient` usa retorno em vez do digitado) e NIT-2 (`let`→`const` em `slug.ts`). NIT-3 vai pro backlog (ADR `UNIQUE(course_id, slug)`). Typecheck+build PASS final.
8. ✅ **Lead (team-os)** — 2 commits locais criados em `feat-aulas-v2` (`fix(lessons): guard de slug único por curso` + `chore(smart-memory): registrar team`) e rebased em `origin/main` (que tinha 9 commits de mentoria-curso + soft-delete fix). **Push pendente de autorização explícita do PO.**

**Estado em prod:**
- `/aula/abertura` → Módulo 3 (funcional)
- `/aula/abertura-2` → Módulo 5 (nova URL)
- Admin futuro: colisões intra-curso auto-sufixadas (apenas se branch publicada).

**Aprendizado prévio relevante:**
- Commit `6a44c6d fix(db): unique slug em courses/modules/lessons ignora soft-deleted` — verificar se a estratégia atual de uniqueness é por escopo ou global.
- Regra institucional Story FAA-1.1: typecheck/build NÃO detectam queries `.is('coluna_string', null)` em coluna inexistente — Axilun deve aplicar adversarial sempre que tocar query.

---

## Team encerrado — joao-guirunas-site-mentoria-curso (2026-05-17)

**Status:** ✅ encerrado — MC-1.1 e MC-1.2 concluídas, mergeado em main (HEAD: `8d214e4`)
**Objetivo:** Estruturar e popular o curso "Mentoria Claude Code" no Supabase

| Entrega | Status | Detalhe |
|---|---|---|
| Schema + mapeamento | ✅ | `docs/mentoria-claude-code/01..07` + stories |
| 33 aulas M3+M4+M5 inseridas | ✅ | Títulos, slugs, description, summary OK |
| Títulos canonizados | ✅ | Padrão `Módulo X \| Aula N \| Título` — 23 títulos + 12 slugs aplicados |
| HTML manuais PDF | ✅ | `content` + `content_format='HTML'` populado — 33 aulas (M3:10, M4:12, M5:11) |
| Frontend "Sobre a Aula" | ✅ | LessonTabs lê `content` (HTML), "Resumo" lê `summary` — commit 35f7ae5 |
| Docs 11–14 commitados | ✅ | commit 970ee64 em main |
| MC-1.3 Vimeo | ⏳ | Bloqueado — João precisa subir vídeos + Vimeo MCP configurado |
| MC-1.4 smoke E2E | ⏳ | Pode ser feito agora em localhost:3000 |

---

## Team encerrado (release done) — joaoguirunas-academy-materiais-por-modulo (2026-05-17)

**Status:** ✅ Epic FM-3 publicada em main, deploy Vercel disparado
**Commits:**
- `718c68d` — `feat(materials): adicionar materiais por módulo (DB + admin)`
- `e465b5f` — `feat(student): listar materiais do módulo na página do curso`
- `856fbb6` — `chore(materials): cleanup órfãos + smart-memory Epic FM-3`
**Push:** `origin/feat-aulas-v2` ✅ + `origin/main` ✅ (fast-forward `bcc1250..856fbb6`)
**Veredicto final:** smoke AC10 PASS do PO + reorder UX aprovado visualmente. Gate adversarial FM-3.6 pulado por escolha do PO.
**Stories produzidas:** FM-3.2, FM-3.3, FM-3.4, FM-3.5, FM-3.7 — todas em `stories/done/`. Story 2.4 superseded. FM-3.6 fica como story de processo no backlog.
**ADR:** [[../decisions/ADR-002-materiais-por-modulo-schema]] (accepted)
**Migration aplicada em prod via MCP:** `module_materials` + `has_module_access(user_id, module_id)`

---

## Team encerrado anterior — joaoguirunas-academy-materiais-por-modulo (sumário detalhado)

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
