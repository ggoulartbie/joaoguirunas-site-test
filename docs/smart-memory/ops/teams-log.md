---
title: Teams Log
type: task-log
updated: 2026-05-06
tags: [ops]
---

# Teams Log

Registro de todos os Agent Teams formados neste projeto. Lead (team-os) atualiza a cada `*dispatch` e `*close`.

## 2026-05-26 — Team joaoguirunas-academy-landing-pages-cursos

**Objetivo:** Criar 5 landing pages de venda de cursos: 4 individuais (IA & Agentes, Design, Dev, Social Media) + 1 bundle. Form "Em Breve" coleta lead → CRM webhook. Sem InfinityPay/Stripe no momento.
**Branch:** `feat/landing-pages-cursos`
**Lead:** team-os (skill)
**Composição:**
- sites-architect — ADR de arquitetura, stories LP-1.x a LP-3.1
- sites-dev-beta — server action `createLeadOnly` (LP-1.1)
- sites-dev-alpha — componentes compartilhados + 5 LPs (LP-1.2 + LP-2.x)
- sites-dev-delta — hardening pós-implementação
- sites-qa — gate de qualidade formal (LP-3.1)
- sites-devops — commits locais (sem push)

**Status:** ativo
**Início:** 2026-05-26T00:00:00-03:00
**Stories:** ver [[../stories/BACKLOG]] — epic LP (em criação por sites-architect)

---

## 2026-05-25 — Team joaoguirunas-academy-turma-acesso-granular

**Objetivo:** Estender controle de acesso de turmas para suportar seleção de aulas específicas por módulo (`included_lesson_ids`), permitindo criar turmas-produto com conteúdo granular para venda separada.
**Lead:** team-os (skill)
**Composição:**
- sites-architect — decisão arquitetural, ADR, criação de stories TGA
- sites-data — migration `included_lesson_ids` + atualização de types
- sites-dev-alpha — admin UI: seletor de aulas no CohortForm "Cursos Liberados"
- sites-dev-beta — student enforcement (dashboard, /curso, /aula, server actions)
- sites-qa — gate adversarial (10 ataques, foco access control)
- sites-devops — commits + PR após QA PASS

**Status:** ativo
**Início:** 2026-05-25T09:51:00-03:00
**Stories:** ver [[../stories/BACKLOG]] — epic TGA (a ser criado por sites-architect)

---

## 2026-05-22 — Team joaoguirunas-academy-qa-ranking-seguranca

**Objetivo:** Verificação de segurança pré-deploy do epic RK-2 (ranking 3 categorias: Aulas, Comentários, Geral)
**Lead:** team-os (skill)
**Branch:** `feat/rk-ranking-progresso`
**Composição:**
- sites-qa — auditoria de interface, a11y, tipos, imports
- sites-data — auditoria de banco (colunas, índices, autenticação, soft delete)

**Status:** encerrado
**Início:** 2026-05-22T14:10:00-03:00
**Encerrado:** 2026-05-22T14:20:00-03:00
**Veredicto final:** ✅ PASS (após correções)

**Issues corrigidos:**
- `aria-controls` apontava para IDs inexistentes → categoria virou `role="group"` + `aria-pressed`, período manteve tablist com painel real `#ranking-podium`
- Índices de banco ausentes para queries de ranking → migration `20260522120000_ranking_comments_indexes.sql` criada

**Débitos técnicos (não bloqueantes):**
- SELECTs sem LIMIT (volume baixo hoje)
- `lessonsCompleted` carrega comentários/pontos (naming confuso mas não quebra)
- Admins aparecem no ranking se participarem
- Peso igual aulas/comentários no ranking geral (1:1)

---

## 2026-05-17 — Team joaoguirunas-academy-robot-curso-fix

**Objetivo:** Corrigir posição do robô Spline — remover da página de aula, adicionar no hero da página do curso ao lado do 0%
**Lead:** team-os (skill)
**Branch:** `main`
**Composição:**
- sites-dev-alpha — correção de posicionamento
- sites-devops — push

**Status:** encerrado
**Início:** 2026-05-17T23:30:00-03:00
**Encerrado:** 2026-05-17T23:35:00-03:00
**Commit:** `3a0b240` — feat(robot-mascot): mover robô Spline da aula para o hero do curso
**Arquivos:**
- `RobotMascot.tsx` — deletado (era fixed na aula, lugar errado)
- `RobotMascotCourse.tsx` (novo) — absolute right-0 top-0 bottom-0 w-[160px], hidden lg:block, dentro do hero do curso
- `aula/[lesson-slug]/page.tsx` — import/JSX removido
- `curso/[slug]/page.tsx` — RobotMascotCourse adicionado dentro do div.relative.p-6

---

## 2026-05-17 — Team joaoguirunas-academy-robot-mascot

**Objetivo:** Adicionar robô Spline mascote na página de aula + como capa de curso em Meus Cursos
**Lead:** team-os (skill)
**Branch:** `main` (pós-merge feat-aulas-v2)
**Composição:**
- sites-dev-alpha — implementação frontend (2 histórias)
- sites-qa — gate adversarial
- sites-devops — commit + push

**Status:** encerrado
**Início:** 2026-05-17T23:15:00-03:00
**Encerrado:** 2026-05-17T23:25:00-03:00
**Pipeline:** dev-alpha implementa em paralelo → QA PASS 10/10 → devops commit + push
**Release:**
- Commit: `8da5815` — feat(ui): adicionar robô Spline mascote na aula + capa em Meus Cursos
- Push: `origin/main`
- Vercel: auto-deploy
**Arquivos entregues:**
- `RobotMascot.tsx` (novo) — robô fixed 96×96px, hidden em mobile, desktop only
- `CourseCoverSpline.tsx` (novo) — robô como fallback de capa em Meus Cursos
- `aula/[lesson-slug]/page.tsx` — import RobotMascot
- `meus-cursos/page.tsx` — CourseCoverSpline substituindo BookOpen nos cursos acessíveis
**Tech-debt:** múltiplas cenas WebGL em meus-cursos se houver >10 cursos sem cover (não-bloqueante)

---

## 2026-05-17 — Team joaoguirunas-academy-materials-validate

**Objetivo:** Validar mudanças de materiais (feat-aulas-v2) + push para main se aprovado
**Lead:** team-os (skill)
**Branch:** `feat-aulas-v2`
**Composição:**
- sites-qa — revisão adversarial do commit f0384da
- sites-devops — merge para main após QA PASS

**Status:** encerrado
**Início:** 2026-05-17T22:50:00-03:00
**Encerrado:** 2026-05-17T23:00:00-03:00
**Pipeline:** QA detectou FAIL crítico (guard `kind === 'FILE'` nunca verdadeiro) → lead corrigiu inline → QA re-aprovou PASS → devops build ✅ + merge fast-forward
**Release:**
- Fix: `4d93407` — fix(materials): corrigir guard de signedUrl — kind nunca é 'FILE'
- Push: `feat-aulas-v2` → `main` (fast-forward, origin/main @ `935be42`)
- Vercel: auto-deploy em progresso
**QA final:** PASS (2 rounds — FAIL → PASS)
**Bug encontrado:** `kind === 'FILE'` era dead code; migration usa `'PDF'|'ZIP'|'IMAGE'|'LINK'|'OTHER'`. Todos os arquivos apareciam dimmed sem link na página da aula.
**Tech-debt registrado:** RLS bucket materials com path `modules/...` (C2-médio), N+1 signed URLs (C3-baixo)

---

## 2026-05-17 — Team joaoguirunas-academy-lesson-availability

**Objetivo:** Adicionar campo `is_available` (boolean, default `true`) na tabela `lessons` — admin ganha toggle (ícone olho) por aula no CourseEditorClient para indisponibilizar; aluno vê aula listada com badge "Em breve" e sem acesso ao player quando `is_available = false`.
**Lead:** team-os (skill)
**Branch:** `feat-aulas-v2`
**Composição:**
- sites-architect — ADR + stories LA-1.1, LA-1.2, LA-1.3 (5-point)
- sites-data — migration `is_available` + atualizar database.ts
- sites-dev-alpha — toggle olho admin + badge "Em breve" no aluno
- sites-dev-beta — server action updateLesson + query aluno com is_available
- sites-qa — gate adversarial pré-release
- sites-devops — commit + push após QA PASS

**Status:** encerrado (release done)
**Início:** 2026-05-17T20:35:00-03:00
**Encerrado:** 2026-05-17T21:30:00-03:00
**Pipeline:** architect (stories) + data (migration) em paralelo → dev-alpha + dev-beta implementam → QA 3 rounds (FAIL → CONCERNS → PASS 11/11) → devops commit 1aa8c7f → migration aplicada via Dashboard Supabase → merge main
**Release:**
- Commit: `1aa8c7f` — feat(lessons): adicionar is_available
- Push: `feat-aulas-v2` → `main` (fast-forward `bfe5ce5..1aa8c7f`)
- Migration prod: `ALTER TABLE lessons ADD COLUMN is_available BOOLEAN NOT NULL DEFAULT TRUE` (Success)
**QA final:** PASS 11/11 (3 rounds — FAIL→CONCERNS→PASS)
**Decisões PO:**
- App-level gate suficiente (sem RPC update)
- Aulas Em breve excluídas de progresso e certificado
- ADMIN/MENTOR ignoram gate (podem ver conteúdo indisponível)
**Follow-up (backlog):** LA-1.5 — hardening RPC has_access + progress.ts server actions

---

## 2026-05-17 — Team joaoguirunas-academy-fix-aulas-abertura-404

**Objetivo:** Bug em produção — aulas com título "Abertura" em qualquer módulo retornam 404 ao acessar. Hipótese PO: colisão de slug entre aulas homônimas em módulos diferentes.
**Lead:** team-os (skill)
**Branch:** `feat-aulas-v2`
**Composição:**
- sites-data — investigar schema lessons (uniqueness slug global vs composto) + queries de lookup
- sites-dev-gamma — diagnóstico fullstack (rota student + lookup + href gen) + implementar fix
- sites-qa — gate adversarial pré-release (bug em prod, exige PASS explícito)
- sites-devops — release autorizado pelo PO

**Status:** encerrado (release done)
**Início:** 2026-05-17
**Encerrado:** 2026-05-17T20:30:00-03:00
**Pipeline:** diagnóstico (data + gamma em paralelo) → síntese pelo lead → Opção C aprovada pelo PO (fix de dados + guard no gerador) → implementação (gamma) → QA PASS 10/10 → release
**Release:**
- Commit fix: `49edd4d` — guard `ensureUniqueSlugInCourse()` em `src/lib/lessons/slug.ts`
- Commit smart-memory: `bfe5ce5`
- Push: `feat-aulas-v2` → `main` (fast-forward `8d214e4..bfe5ce5`)
**Veredicto QA (Axilun):** ✅ PASS — typecheck EXIT 0, build OK, 10 ataques sem bloqueante
**Fix de dados prod:** slug `abertura` (M5) → `abertura-2` via Bythelion/MCP (pré-release)

---

## 2026-05-17 — Team joaoguirunas-academy-materiais-por-modulo

**Objetivo:** Implementar upload/gerenciamento de materiais (PDF, IMG, ZIP, LINK) por módulo, espelhando o fluxo existente por aula. Inclui ADR de schema, migration, server actions, UI admin nova rota e UI student.
**Lead:** team-os (skill)
**Composição:**
- sites-architect (Soren) — ADR-002 schema + 6 stories formais FM-3.2..3.7
- sites-data — migration + RLS policies + storage convention (espera ADR aprovado)
- sites-dev-beta — server actions backend `*ModuleMaterial*` (espera migration)
- sites-dev-alpha (Novael) — UI admin nova rota `/modulos/[moduleId]/` + UI student (espera server actions)
- sites-qa (Axilun) — gate formal adversarial (regra institucional: CONCERNS sem evidência → FAIL)

**Status:** encerrado (release done)
**Início:** 2026-05-17
**Encerrado:** 2026-05-17 (Epic FM-3 publicada em main, deploy Vercel disparado)
**Branch:** `feat-aulas-v2` → fast-forward para `main`
**Pipeline executado:** ADR (Soren) → aprovação João → migration aplicada via MCP (data + lead) → actions (Rexali) → UI admin + student + cleanup (Novael) → smoke PO (PASS) → reorder UX (Novael) → release (sites-devops)
**FM-3.6 (QA gate adversarial)** pulado por escolha explícita do PO após smoke + visual review.
**Release:**
- Commit feat backend+admin: `718c68d`
- Commit feat student: `e465b5f`
- Commit chore cleanup+docs: `856fbb6`
- Push: `origin/feat-aulas-v2` + `origin/main` (fast-forward `bcc1250..856fbb6`)
**Stories produzidas:** FM-3.2, FM-3.3, FM-3.4, FM-3.5, FM-3.7 todas em `done/`. Story 2.4 superseded. FM-3.6 no backlog como story de processo.
**ADR:** [[../decisions/ADR-002-materiais-por-modulo-schema]]
**Migration prod via MCP:** `module_materials` + função `has_module_access(user_id, module_id)` aplicada com `success: true`, advisor sem regressão (3 warns novos consistentes com padrão pré-existente).
**Aprendizado institucional consolidado:** regra anti-Story 1.1 reforçada com nova captura no Epic FM-3 (Axilun catch crítico de `.is('coluna_string', null)` em coluna inexistente — typecheck não detecta).

---

## 2026-05-16 — Team joaoguirunas-academy-fix-vimeo-dimensions

**Objetivo:** Resolver bug recorrente das dimensões do iframe Vimeo (recorrência da Story 1.1) — garantir iframe ocupa 100% do container 16:9 para todos aspect ratios nativos (9:16, 4:3, 16:9)
**Lead:** team-os (skill)
**Composição:**
- sites-architect (Soren) — criou story FAA-1.4 com ACs cobrindo todos aspect ratios
- sites-dev-alpha (Novael) — validou que o fix local do João já estava correto, rodou `pnpm build` (exit 0)
- sites-qa (Axilun) — veredicto adversarial inicial: CONCERNS pendente teste visual

**Status:** encerrado
**Início:** 2026-05-16 (branch `feat-aulas-v2`)
**Encerrado:** 2026-05-17 (release publicada)
**Trigger:** modificação local não commitada em `src/components/student/VideoPlayer.tsx` — sinal de que fix anterior recorreu.
**Veredicto final:** PASS pragmático assinado pelo PO João após teste visual em localhost (screenshot 2026-05-17).
**Release:**
- Commit fix: `57a7302` — `fix(student/video-player): forçar iframe Vimeo a preencher container 16:9`
- Commit docs: `bcc1250` — `chore(smart-memory): registrar team fix-vimeo-dimensions + Story FAA-1.4 done`
- Push: `origin/feat-aulas-v2` + `origin/main` (fast-forward `01b0e8d..bcc1250`)
**Stories produzidas:** [[../stories/done/1.4-fix-vimeo-iframe-dimensions-v2]]
**Memória nova:** [[../../../../../.claude/projects/-home-victor-Claude-joaoguirunas-academy/memory/project_vimeo_localhost_domain]] — Vimeo localhost whitelist
**Aprendizado institucional (Axilun):** regra consolidada em `agents/qa/results.md` — CONCERNS sem evidência reproduzível OU aceitação pragmática documentada do PO → FAIL automático.

---

## 2026-05-16 — Team joaoguirunas-academy-investigar-servidor-restart

**Objetivo:** Investigar queda do servidor local e implementar restart automático
**Lead:** team-os (skill)
**Composição:**
- sites-dev-delta — investigar causa raiz (processo duplicado vs. crash real)
- sites-devops — implementar script `dev:restart` no package.json
- sites-qa — veredicto formal da solução

\*\*Status:\*\* encerrado\n**Encerrado:** 2026-05-21\n**PR:** https://github.com/joaoguirunas/joaoguirunas-academy/pull/4
**Início:** 2026-05-16

---

## 2026-05-08 — Team joao-guirunas-site-refactor-checkout-academy

**Objetivo:** Refactor /curso-online com estrutura visual da /mentoria + auditoria completa do checkout Stripe e do academy
**Lead:** team-os (skill)
**Composição:**
- sites-architect — quebrar "auditoria completa academy" em stories novas (F9.7+)
- sites-dev-alpha — implementar F9.1 (refactor /curso-online)
- sites-dev-beta — auditoria backend academy + verificação F9.2
- sites-qa — QA formal F9.2 (já implementada) + gate F9.1
- sites-devops — push + PR quando stories passarem gate

**Status:** ativo
**Início:** 2026-05-08T23:17:00-03:00
**Stories:** F9.1 (backlog), F9.2 (validated/sem QA), F9.7+ (a criar)

---

## 2026-05-06 — Sessão inline — Mentoria Onboarding Tool

**Objetivo:** Construir ferramenta de onboarding presencial para mentorados — formulário com auto-save no Supabase, lista com CRUD, upload de PDF no Storage
**Lead:** team-os (skill) + trabalho inline
**Composição:** — (sem Agent Team formal)

**Status:** encerrado
**Encerrado:** 2026-05-06
**Trabalho realizado:**
- Tabela `public.onboarding` criada (migration 20260506070000) com todos os campos do formulário + trigger `updated_at`
- Bucket privado `onboarding-pdfs` criado (migration 20260506080000) + policy bloqueando acesso público
- `src/lib/actions/onboarding.ts` — server actions: create, update, delete, list, get, upload PDF (signed URL), get PDF URL
- Rota `/mentoria/onboarding` = lista paginada com grid single-line, status badge, copy prompt, PDF ↗, excluir (2-step)
- Rota `/mentoria/onboarding/[id]` = formulário vertical com auto-save debounced 1500ms, save indicator, ✓ por campo, nav com "Planejamento" como último item
- PDF upload corrigido: signed URL (`createSignedUploadUrl`) → PUT direto ao Supabase Storage → `confirmPdfUpload` — evita limite de 1MB do Next.js server actions
- PromptPreview vem antes do PdfUpload (gera no Claude primeiro, depois faz upload)

**Pendente (próxima sessão):**
- `git commit` + push das mudanças (nenhum commit ainda desta sessão)
- Arquivos modificados mas não commitados: `OnboardingListClient.tsx`, `OnboardingFormClient.tsx`, `onboarding.ts`, migrations, academy pages (plataforma-cursos)

---

## 2026-05-05 — Team joao-guirunas-site-agentes-belt

**Objetivo:** Redesign /agentes — horizontal card belt + cards metade do tamanho + transição fluida entre squads
**Lead:** team-os (skill)
**Composição:**
- sites-dev-alpha — implementação frontend (SquadSection.tsx + AgentCard.tsx)

**Status:** encerrado
**Encerrado:** 2026-05-05
**Stories:** [[../stories/done/F9.1-agentes-horizontal-belt-cards]]

## 2026-05-05 — Team joao-guirunas-site-plataforma-cursos-mvp

**Objetivo:** Construir plataforma de cursos multi-cohort com área do aluno, área admin, pagamentos Stripe e acesso baseado em turmas — 8 fases conforme PRD v3.0
**Lead:** team-os (skill)
**Composição:**
- sites-architect — Quebrar PRD em stories por fase, ADRs
- sites-data — Schema SQL, migrations, RLS, has_access() (Fase 1)
- sites-dev-beta — Auth middleware, APIs, webhooks Stripe (Fases 2 e 7)
- sites-dev-alpha — UI área do aluno + área pública (Fases 3, 4, 5)
- sites-dev-gamma — Video adapter, MDX/TipTap, cross-layer (Fases 3 e 6)
- sites-qa — Gate formal de aceite entre fases
- sites-devops — Deploy Vercel + CI/CD (Fase 8)

**Status:** ativo
**Início:** 2026-05-05T00:00:00-03:00
**Encerrado:** —
**PRD:** docs/PRD-plataforma-cursos.md
**Stories:** ver [[../stories/BACKLOG]] (sites-architect populando)

---

## 2026-05-03 — Team joao-guirunas-site-agentes-upgrade

**Objetivo:** Melhoria da página /agentes — texturas 3D 4K, enriquecimento de dados dos agentes, redesign do AgentCard e rewrite das single pages
**Lead:** team-os (skill)
**Composição:**
- sites-dev-gamma — Stories 6.1 (planet textures) + 6.2 (agentes.json enrichment)
- sites-dev-alpha — Stories 6.3 (AgentCard) + 6.4 (single page rewrite)

**Status:** ativo
**Início:** 2026-05-03T03:45:00-03:00
**Encerrado:** —
**Stories:** 6.1, 6.2, 6.3, 6.4

---

## 2026-04-23 — Team joao-guirunas-site-discovery

**Objetivo:** Bootstrap — descoberta inicial do projeto
**Lead:** team-os (skill)
**Composição:**
- sites-architect — modules.md + architecture.md
- sites-analyst — tech-stack.md + conventions.md
- sites-ux — agents/ux/components.md

**Status:** encerrado
**Início:** 2026-04-23T20:55:00Z
**Encerrado:** 2026-04-23T20:59:00Z
**Arquivos produzidos:**
- [[../project/modules]]
- [[../project/architecture]]
- [[../project/tech-stack]]
- [[../project/conventions]]
- [[../project/overview]]
- [[../agents/ux/components]]

**Resultado:** Smart-memory populada com descoberta completa. 5 pontos de atenção identificados (dead code, sitemap hardcoded, zero testes, src/features/ vazia, RevosForm inacessível).

---

## 2026-04-26 — Team joao-guirunas-site-kv-growth-sales

**Objetivo:** Adaptar Home, Mentoria e Open-Source ao KV Growth Sales — unidade visual entre João Guirunas e a Growth Sales sem alterar logos
**Lead:** team-os (skill)
**Composição:**
- sites-dev-alpha — implementação frontend (stories 4.1–4.4)
- sites-qa — gate de qualidade pós-implementação
- sites-devops — PR consolidado após QA PASS

**Status:** encerrado
**Início:** 2026-04-26T22:00:00-03:00
**Encerrado:** 2026-04-26T22:41:00-03:00
**Stories:** [[../stories/backlog/4.1-kv-global-tokens-watermark]], [[../stories/backlog/4.2-kv-typography-display]], [[../stories/backlog/4.3-kv-mentoria-facilitadores-badges]], [[../stories/backlog/4.4-kv-open-source-header-colors]]
**PR:** https://github.com/joaoguirunas/growthsales-opensource/pull/2
**Resultado:** Epic 4 entregue. QA PASS (4.1–4.4). 2 concerns não-bloqueantes registrados como stories 4.5 e 4.6 no backlog. Fix de merge conflict aplicado no bloco legado open-source.

---

## 2026-04-27 — Team joao-guirunas-site-backlog-sprint

**Objetivo:** Executar o backlog completo — a11y, CWV, KV token cleanup, H1 fixes, housekeeping de story files
**Lead:** team-os (skill)
**Composição:**
- sites-dev-gamma — execução sequencial das 5 stories pendentes
- sites-qa — gate de qualidade
- sites-devops — commit + push para main

**Status:** encerrado
**Início:** 2026-04-27T19:15:00-03:00
**Encerrado:** 2026-04-27T19:31:00-03:00
**Stories:** 2.3, 3.3, 3.4, 4.5, 4.6
**Commit:** ad64a60 (main)
**Resultado:** QA PASS 5/5. 35 arquivos, +291/-413 linhas. 51 páginas. Vercel auto-deploy acionado. Backlog zerado (16 done, 2 active). 1 concern não-bloqueante: token órfão `--color-cat-squads` em globals.css.

---

## 2026-04-27 — Sessão inline (sem team formal)

**Objetivo:** Fixes página de mentoria — header, hero, imagem bg
**Lead:** team-os (skill) + usuário direto
**Composição:** — (trabalho inline, sem Agent Team)

**Status:** encerrado
**Início:** 2026-04-27T20:00:00-03:00
**Encerrado:** 2026-04-27T21:00:00-03:00
**Commits:** 62b75d3, fa3f79b (main)
**Resultado:** MentoriaNav removido (não era pretendido). Hero height aumentado. Imagem reposicionada com translateX(200px) scaleX(-1) para João visível à direita. Stories 4.1 e 4.2 arquivadas em done/. Backlog: 1 story (5.1).

---

<!-- Entrada template:

## 2026-04-23 — Team {nome}

**Objetivo:** Bootstrap — descoberta inicial
**Lead:** team-os (skill)
**Composição:**
- {teammate-1} — {papel}
- {teammate-2} — {papel}

**Status:** ativo / encerrado
**Início:** {ISO date}
**Encerrado:** {ISO date ou —}
**Stories:** —
**Resultado:** {resumo quando encerrado}

---
-->

---

## 2026-05-17 — Team joao-guirunas-site-mentoria-curso

**Objetivo:** Estruturar e popular o curso "Mentoria Claude Code" no Supabase — estudar academy completo, mapear schema, criar docs/mentoria-claude-code/, preparar fluxo de população de conteúdo com links Vimeo
**Lead:** team-os (skill)
**Composição:**
- sites-analyst — análise do conteúdo `src/data/treinamento/` + gap analysis vs schema Supabase
- sites-architect — arquitetura do fluxo academy + criação de stories MC-1.x / MC-2.x
- sites-data — mapeamento completo schema tabelas courses/modules/lessons/materials
- sites-dev-alpha — inventário componentes frontend (student + admin)
- sites-dev-beta — mapeamento server actions e APIs para população
- sites-devops — pipeline deploy + standby para commits
- sites-ux — fluxo UX aluno + spec estrutura curso Mentoria Claude Code

**Status:** ativo
**Início:** 2026-05-17T13:52:00-03:00
**Pasta de conteúdo:** `docs/mentoria-claude-code/` (criada nesta sessão)
**Restrição:** Nenhum commit/push sem autorização explícita do João. Fase atual = discovery + documentação.

---

## 2026-05-06 — Team joao-guirunas-site-plataforma-cursos-completo

**Objetivo:** Implementação completa da plataforma de cursos — Fases 1 a 9, 42 stories, do schema ao deploy
**Lead:** team-os (skill)
**Composição:**
- sites-data — F1.2–F1.8 (schema, RLS, buckets, seed, tipos TS) + F9.x
- sites-dev-beta — F2.1–F2.4 (Auth, middleware RBAC, emails)
- sites-dev-alpha — F3.1–F5.3 + F8.1–F8.3 (player, aulas, fórum, certificados, mobile)
- sites-dev-delta — F6.1–F6.4 (Admin dashboard + CRUD)
- sites-dev-gamma — F7.1–F7.8 (Stripe, checkout, webhook, renovação, /perfil, /turmas)
- sites-devops — F8.4, F8.6 (Sentry, deploy Vercel produção)
- sites-qa — F8.5, F8.7 (Playwright E2E, go-live checklist)

**Status:** ativo
**Início:** 2026-05-06T19:30:00-03:00
**Encerrado:** —
**Stories:** active: 7, backlog: 35, done: 24

## 2026-05-07 — Team joao-guirunas-site-plataforma-cursos-completo (encerrado)

**Objetivo:** Plataforma de cursos Fases 1–9 — 42 stories, do schema ao deploy
**Lead:** team-os (skill)
**Composição:**
- sites-data — schema, migrations, RLS
- sites-dev-alpha — frontend, UI components
- sites-dev-beta — backend, APIs, fixes pós-deploy
- sites-dev-delta — hardening, email, resiliência
- sites-dev-gamma — fullstack, F10.5, F11.1 pg_cron
- sites-devops — deploy, Vercel, Stripe webhook
- sites-qa — QA gates, smoke test

**Status:** encerrado
**Início:** 2026-05-06T19:30:00-03:00
**Encerrado:** 2026-05-07
**Stories:** 70 done, 2 backlog (F8.5 E2E, F8.7 smoke manual)

**Highlights:**
- Plataforma de cursos completa do zero ao deploy
- joaoguirunas.com em produção
- pg_cron + Edge Functions substituem Vercel crons (Hobby plan)
- Auth sem signup público + admin badge + /curso-online + checkout público

---

## 2026-05-08 — Team fix-checkout-encontros

**Objetivo:** Corrigir bug de checkout no /curso-online (sem turma disponível) + adicionar editor de encontros ao vivo com link meet/zoom no admin

**Lead:** team-os (skill)

**Composição:**
- sites-architect — story F9.6 + validação F9.2
- sites-dev-beta — fix checkout (F9.2)
- sites-dev-gamma — CRUD encontros ao vivo no admin (F9.6)
- sites-qa — gate de qualidade
- sites-devops — PR + push

**Status:** ativo
**Início:** 2026-05-08T08:34:00-03:00
**Stories:** [[../stories/BACKLOG]]

## 2026-05-08 — Team joao-guirunas-site-academy-audit

**Objetivo:** Auditoria completa do fluxo /academy — compra em curso-online não dispara matrícula, sem e-mails, sem acesso ao conteúdo
**Lead:** team-os (skill)
**Composição:**
- sites-dev-beta — audit backend: webhook Stripe, sync.ts, e-mail dispatch
- sites-dev-gamma — audit cross-layer: curso-online → checkout → DB → academy
- sites-data — audit schema/RLS: tabelas de matrícula, policies de INSERT
- sites-qa — veredicto formal + síntese de bugs

**Status:** ativo
**Início:** 2026-05-08T23:09:00
**Stories:** auditoria inline (sem stories em backlog)

## 2026-05-10 — Team joao-guirunas-site-finalizar-f9-f12

**Objetivo:** Finalizar backlog completo F9 (auditorias, bugs P1) e F12 (integração InfinitePay dual-provider)
**Lead:** team-os (skill)
**Composição:**
- sites-dev-beta — backend/API (F12.1, F12.3, F9.13, F9.14, F9.15, F9.18-AC4/5)
- sites-dev-alpha — frontend (F9.18-AC1/2/3, F12.2 UI, F9.16)
- sites-data — database (F9.17, F12.2 migration, F9.9)
- sites-qa — quality gates (10 veredictos: 7 PASS, 4 WAIVED, 0 FAIL)
- sites-devops — push/deploy (2 pushes autorizados)

**Status:** encerrado
**Início:** 2026-05-10T18:03
**Encerrado:** 2026-05-10T18:36
**Duração:** ~33 minutos

**Stories concluídas (11 + F9.12 fechada oficialmente):**
- F9.9, F9.13, F9.14, F9.15, F9.16, F9.17, F9.18 (PASS)
- F12.1, F12.2, F12.3 (PASS)
- F9.12 (parent bug-hunt — PASS final após F9.18 resolver todos os P1)

**Commits:**
- ecd54ac — push principal (10 stories, 3 migrations)
- 2b1ddaa — fix(webhook): underpayment guard + Sentry alert InfinitePay

**Build:** 137 páginas · typecheck EXIT 0 · deploy Vercel em prod

## 2026-05-11 — Team joao-guirunas-site-academy-ops

**Objetivo:** Operação contínua da área /academy — delete/block alunos, excluir pagamentos pendentes, configuração InfinitePay + produto R$1 + teste fluxo completo
**Lead:** team-os (skill)
**Composição:**
- analyst-1 — Pipeline A: research admin usuários + pagamentos
- analyst-2 — Pipeline B: research InfinitePay + fluxo checkout
- architect-1 — Pipeline A: stories após research
- architect-2 — Pipeline B: stories após research
- dev-alpha — Frontend (React, Next.js, shadcn/ui)
- dev-beta — Backend (API routes, DB, integrações)
- sites-qa — Gate de qualidade (veredictos formais)
- sites-devops — Push + PR (autoridade exclusiva)

**Status:** ativo
**Início:** 2026-05-11T09:56:00-03:00
**Stories:** [[../stories/BACKLOG]] — F13.x (em criação)

## 2026-05-16 — Team joaoguirunas-academy-fix-aula-aluno-ux

**Objetivo:** Corrigir 3 bugs UX na página de aula do aluno: (1) player Vimeo cortando barra de controles, (2) comentários só aparecem após reload, (3) markdown não renderiza em "Sobre a aula"
**Lead:** team-os (skill)
**Branch:** `fix-aula-aluno-ux-bugs` (a partir de `main` @ 4875987)
**Composição:**
- sites-architect — quebrar stories, validar 5-point
- sites-analyst — confirmar libs disponíveis
- sites-ux — spec visual player + UX feedback comentário
- sites-data — audit queries (sem schema change esperado)
- sites-dev-alpha — frontend (3 bugs)
- sites-dev-beta — server action addComment retornar comment
- sites-dev-gamma — integração end-to-end fluxo comentário
- sites-dev-delta — hardening edge cases
- sites-qa — gate final PASS/CONCERNS/FAIL
- sites-devops — commit estruturado (push manual do usuário — token exposto)

**Status:** ativo
**Stories:** ver [[../stories/BACKLOG]]

---

## 2026-05-16 — Team joaoguirunas-academy-materials-fix

**Objetivo:** Fix UX de materiais — (A) download de material abre em nova aba no aluno; (B) admin ganha UI pra listar e excluir materiais que subiu na aula
**Lead:** team-os (skill)
**Branch:** `fix-aula-aluno-ux-bugs` (mesma branch do team anterior)
**Composição:**
- sites-architect — criar Stories 2.1 e 2.2 validadas (5-point)
- sites-ux — spec UI admin (lista de materiais + AlertDialog de delete)
- sites-dev-alpha — frontend dos 2 bugs (download fix + UI admin)
- sites-dev-beta — server action `deleteMaterial` + Storage cleanup
- sites-qa — verdict PASS/CONCERNS/FAIL antes do push
- sites-devops — push autorizado (sem PR auto)

**Status:** ativo
**Início:** 2026-05-16T03:25:00-03:00
**Stories:** 2.1 (download nova aba), 2.2 (admin lista/exclui materiais) — ver [[../stories/BACKLOG]]

---

## 2026-05-16 — Team joaoguirunas-academy-server-perf-crash

**Objetivo:** Investigar e corrigir instabilidade do servidor web — crashes frequentes causados por dependências pesadas (Three.js, Spline, tsParticles) e possíveis gargalos server-side
**Lead:** team-os (skill)
**Composição:**
- sites-analyst — diagnóstico holístico de causa raiz
- sites-dev-delta — hardening e resiliência (error boundaries, memory leaks, error handling)
- sites-dev-alpha — frontend bundle (dynamic imports, code splitting das libs pesadas)
- sites-dev-beta — backend/server (API routes, Supabase queries, middleware, cache)
- sites-qa — gate de qualidade formal (veredicto PASS/FAIL após correções)

**Restrição de deploy:** Nenhum push/deploy sem confirmação explícita do usuário João

**Status:** ativo
**Início:** 2026-05-16T14:40:00-03:00
**Stories:** a criar após diagnóstico dos agentes

---

## 2026-05-18 — Team joaoguirunas-academy-encontro-fixes

**Objetivo:** Corrigir bug "Invalid UUID" ao cadastrar encontro + implementar data padrão no form de sessão
**Lead:** team-os (skill)
**Composição:**
- sites-dev-beta — Story LS-1.1: fix UUID validation em createLiveSession (actions.ts)
- sites-dev-alpha — Story LS-1.2: default datetime no form de encontro (CohortForm.tsx)
- sites-qa — gate de qualidade formal após ambas as stories

**Status:** ativo
**Início:** 2026-05-18T14:48:00-03:00
**Stories:** [[../stories/active/LS-1.1-fix-invalid-uuid-live-session]], [[../stories/active/LS-1.2-calendar-default-date-session]]

---

## 2026-05-21 — Team joaoguirunas-academy-copy-btn-code

**Objetivo:** Adicionar botão "Copiar" estilizado com toast "Copiado com sucesso" nos blocos de código das aulas
**Lead:** team-os (skill)
**Composição:**
- sites-dev-alpha — redesign botão + toast em CodeBlock.tsx + fix LessonContent.tsx
- sites-qa — gate de qualidade pós-implementação

**Status:** ativo
**Início:** 2026-05-21T10:07:00-03:00
**Stories:** [[../stories/active/LS-1.3-copy-button-code-blocks]]

## 2026-05-21 — Team joaoguirunas-academy-ranking-progresso

**Objetivo:** Criar tela de ranking com top 5 de melhor progresso semanal, quinzenal e mensal — visível a todos os alunos
**Lead:** team-os (skill)
**Composição:**
- sites-architect — stories RK-1.1, RK-1.2
- sites-data — query SQL de ranking por período
- sites-dev-gamma — implementação fullstack (server action + UI)
- sites-qa — gate de qualidade (a spawnar após implementação)
- sites-devops — push + PR (a spawnar após QA)

**Status:** ativo
**Início:** 2026-05-21
**Stories:** ver [[../stories/BACKLOG]]
