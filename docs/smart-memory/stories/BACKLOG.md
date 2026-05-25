---
title: Story Backlog
type: backlog
updated: 2026-05-25
tags: [story]
---


# Backlog de Stories

## Epic TGA — Turma Granular Access (2026-05-25)

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/TGA-1.1-migration-included-lesson-ids\|TGA-1.1]] | Migration `included_lesson_ids` em `cohort_courses` + atualização `has_access` + regen types | M | backlog | sites-data |
| [[backlog/TGA-1.2-admin-ui-lesson-selector\|TGA-1.2]] | Admin UI — tree-select Curso > Módulo > Aula em CohortForm + `cohortCourseSchema` estendido | M | backlog | sites-dev-alpha + sites-dev-beta |
| [[backlog/TGA-1.3-student-enforcement-included-lesson-ids\|TGA-1.3]] | Student — enforcement de `included_lesson_ids` nas 5 páginas do aluno + helper compartilhado | M | backlog | sites-dev-alpha |
| [[backlog/TGA-1.4-qa-gate-granular-access\|TGA-1.4]] | QA gate adversarial — 4 variants de cohort, RLS, defense in depth, veredicto formal | M | backlog | sites-qa |

**ADR autoritativa:** [[../decisions/ADR-turma-granular-access]] (Opção A — coluna `included_lesson_ids: uuid[]` espelhada em `cohort_courses`). **Proposed** 2026-05-25, aguarda aprovação do PO.

**Objetivo do Epic TGA:** permitir que uma turma controle acesso até a granularidade aula (Curso > Módulo > Aula), abrindo o caminho para vender subconjuntos do curso como turmas-produto (ex.: "só Módulo 1", "Módulo 2 + aulas 1-3 do Módulo 3"). Estende o padrão existente `included_module_ids` com um terceiro nível paralelo `included_lesson_ids` — mesma semântica de "lista vazia = sem restrição neste nível".

**Sequência:**
1. **TGA-1.1** (sites-data) primeiro — migration aditiva + RPC `has_access` ganha 1 cláusula nova + types regenerados. **Bloqueia TGA-1.2 e TGA-1.3.**
2. **TGA-1.2** + **TGA-1.3** em paralelo após TGA-1.1. Mesmo dev (sites-dev-alpha) coordena os 2 que tocam UI; sites-dev-beta cuida do schema/action de TGA-1.2.
3. **TGA-1.4** (sites-qa) por último — adversarial end-to-end com veredicto formal. **AC12 anti-recorrência Story 1.1**: QA Results obrigatoriamente preenchido antes de mover qualquer TGA para `done/`.

**Decisões arquiteturais (detalhe na ADR-003):**
- Opção A vs B: array em `cohort_courses` (escolhida) vs tabela nova `cohort_lessons` (rejeitada). Razão #1: padrão existente `included_module_ids` já é a convenção do projeto. Razão #2: minimiza diff em `has_access` (1 cláusula nova vs reescrita estrutural — RLS é risco crítico no ADR-001).
- `has_module_access` (materiais de módulo, ADR-002) **NÃO é tocada** — materiais de módulo continuam por módulo, semântica preservada.
- 5 caminhos no aluno consomem `included_module_ids` hoje (dashboard, /meus-cursos, /curso/[slug], /curso/[slug]/aula/[lesson-slug] via RPC, /turmas/[slug]). TGA-1.3 cobre todos via helper compartilhado `src/lib/access/cohort-filters.ts`.
- Backwards compat garantida: `DEFAULT '{}'` na coluna nova = lista vazia = comportamento atual preservado para 100% das cohorts existentes.

**Invariante semântica documentada:** módulo bloqueia antes de aula. Se aula listada em `included_lesson_ids` mas módulo não está em `included_module_ids`, aula permanece bloqueada (UI impede configurar; RPC faz `AND` das duas listas). Variant "L-only" do QA gate (TGA-1.4 AC4) testa exatamente isso.

**Anti-recorrência embutida:**
- AC8 da TGA-1.2 (coerência módulo/aula no admin) — desmarcar módulo limpa as aulas órfãs.
- AC8 da TGA-1.3 (não-leak via listagem) — aula bloqueada **não aparece** na lista do aluno.
- AC12 da TGA-1.4 (QA Results obrigatório) — defesa contra Story 1.1 histórica.

**5-point checklist:** GO 5/5 em cada story. Prefixo TGA livre — Epics anteriores: AP, LA, MC, FAA, AV, FM, F1-F13, CT, KV, LS, RK.

**Revisão Axilun (sites-qa, 2026-05-25):** 3 concerns incorporados após primeira pass.
- **#1 RPC gate primário:** TGA-1.1 AC3 reforçada + novo AC9 (atomicidade DDL: ALTER TABLE + CREATE OR REPLACE FUNCTION no mesmo arquivo de migration; splittar é proibido por criar janela de bypass via URL direta).
- **#2 Inconsistência student pages:** TGA-1.3 AC4 expandido para refatorar `aula/[lesson-slug]/page.tsx:119-145` (padrão "set vazio = todos passam" acidental) usando o helper `filterLessonsByCohortAccess` do AC6 — nivela com `curso/[slug]/page.tsx:159-165` que já faz expansão explícita.
- **#3 Semântica módulo=[] ignora aula:** ADR-003 ganhou "Tabela verdade semântica autoritativa". TGA-1.1 AC10 documenta no comentário SQL da função. TGA-1.2 AC13 + AC7 normalizado bloqueiam dirty state na UI/action (aula só editável quando módulo tem restrição). TGA-1.3 AC11 fixa a invariante no helper.

---

## Epic LS — Live Sessions (2026-05-18)

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[done/LS-1.1-fix-invalid-uuid-live-session\|LS-1.1]] | Fix `z.string().uuid()` → `uuidField()` em `createLiveSession` | S | done | sites-dev-alpha |
| [[done/LS-1.2-calendar-default-date-session\|LS-1.2]] | Data padrão (próxima hora cheia BRT) no form de encontro | S | done | sites-dev-alpha |
| [[done/LS-1.3-copy-button-code-blocks\|LS-1.3]] | Botão copiar em code blocks (live sessions UX) | S | done | sites-dev-alpha |
| [[done/LS-2.1-datepicker-sessoes-ao-vivo\|LS-2.1]] | Separar campo data+hora em sessões ao vivo e usar calendário nativo | S | done | sites-dev-alpha |

**Objetivo do Epic LS:** evoluir a UX de criação/edição de encontros ao vivo no admin de turmas (`CohortForm.tsx`). LS-1.x consolidaram fixes pontuais (UUID, default date, copy button). LS-2.1 abre o segundo ciclo focado em datepicker.

**LS-2.1 (2026-05-21):** o `<input type="datetime-local">` atual exige clicar num ícone minúsculo para abrir o calendário — UX ruim no admin. Decisão validada pelo lead: separar em dois campos nativos (`type="date"` + `type="time"`), reaproveitando o padrão já presente em 3 lugares do mesmo arquivo (startDate, endDate, memberExpiresAt). Zero deps, zero migration — só UI. ACs cobrem ambos os forms (Adicionar + Editar), refactor de `getDefaultSessionDate()` / `toDatetimeLocalValue()`, validação dos dois campos e build pass. Checklist 5/5 GO.

---

## Epic RK — Ranking de Progresso (2026-05-21)

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/RK-1.1-server-action-ranking-by-period\|RK-1.1]] | Server action `getRankingByPeriod` — top 5 alunos por período (week/biweek/month) | M | backlog | sites-dev-beta |
| [[backlog/RK-1.2-pagina-ranking-podio\|RK-1.2]] | Página `/academy/ranking` — pódio com tabs (Semanal/Quinzenal/Mensal) + entrada na sidebar | M | backlog | sites-dev-alpha |

**Objetivo:** dar a TODOS os alunos autenticados uma tela pública de ranking — pódio dos top 5 alunos por número de aulas concluídas em três janelas rolling (7d / 15d / 30d). Métrica: `lesson_progress.completed = true` agregado por `user_id` no intervalo. Desempate por `completed_at` mais recente. Privacidade: nunca exibir email; mostrar apenas primeiro nome de `profiles.name`.

**Sequência:**
1. **RK-1.1** primeiro — server action `getRankingByPeriod(period)` em `src/app/actions/ranking.ts`. Define contrato `RankingEntry` consumido pela UI. **Bloqueia RK-1.2**.
2. **RK-1.2** após RK-1.1 — page `/academy/ranking` (Server Component `force-dynamic`) + `RankingTabs` (Client) + `Podium` (Server). Entrada na sidebar `Trophy`.

**Decisões arquiteturais:**
- `supabaseAdmin` + `requireUser()` (não `requireAdmin`) na action — primeira leitura cross-user para aluno. Gate é o aluno autenticado + limite de 5 + payload sem email.
- Janelas **rolling em dias corridos** (`now - 7/15/30 dias`), não calendário. Mais simples e consistente com a descrição "semanal/quinzenal/mensal" do lead.
- 2 queries por chamada da action: `lesson_progress` (filtrado por janela + completed) → agregação em memória → `profiles` em batch (`.in('id', top5)`). Anti-N+1.
- Page pré-carrega os 3 períodos em paralelo via `Promise.all` — sem flash entre tabs, sem novas requisições no client.
- `force-dynamic` na page (toca `supabaseAdmin`, ver memory `supabase_admin_proxy_build`).

**Privacidade:**
- `displayName` = primeiro token de `profiles.name`, com fallback `'Aluno'` se vazio. Email nunca trafega no payload.
- `userId` é retornado (necessário para keys no React) mas não há rota pública que aceite isso, então não vaza nada usável.

**Anti-recorrência:**
- RK-1.1 AC5 + RK-1.2 AC5: defesa em profundidade contra vazamento de email — backend não envia, UI não consome.
- RK-1.2 AC1 reforça `force-dynamic` explicitamente (anti-recorrência do incidente de build em rotas com `supabaseAdmin`).
- RK-1.2 AC11 embute padrão ARIA para tabs — evita débito de a11y.

**Prefixo RK** escolhido por estar livre. Epics anteriores: AP, LA, MC, FAA, AV, FM, F1–F13, CT, KV, LS.

**5-point checklist:** GO 5/5 nas duas stories.

---

## Epic AP — Admin Progress (2026-05-21)

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/AP-1.1-server-actions-progresso-admin\|AP-1.1]] | Server actions admin de progresso (agregado por aluno × curso e por aula × conclusões, filtrável por turma) | M | backlog | sites-dev-beta |
| [[backlog/AP-1.2-pagina-admin-progresso\|AP-1.2]] | Página admin `/admin/progresso` — tabela de alunos (expansível) + seção por aula | M | backlog | sites-dev-alpha |
| [[backlog/AP-1.3-filtros-progresso-admin\|AP-1.3]] | (Opcional) Filtros do dashboard de progresso (curso, turma, módulo) | S | backlog | sites-dev-alpha |

**Objetivo:** dar ao admin uma área de acompanhamento dos alunos (% de progresso por curso, aulas concluídas, contagem de conclusões por aula). PO pediu: "área de acompanhamento dos alunos: quantos marcaram que viram, o progresso deles, etc."

**Sequência:**
1. **AP-1.1** primeiro — server actions agregadas (`getStudentsProgress`, `getLessonsCompletionStats`, `getStudentLessonsBreakdown`). Define contrato de tipos consumido pela UI. **Bloqueia AP-1.2**.
2. **AP-1.2** após AP-1.1 — página `/admin/progresso` com tabela expansível + seção por aula. Entrada no menu admin.
3. **AP-1.3** opcional, contingente — filtros (curso/turma/módulo) com sincronização URL. Só promover se PO pedir após AP-1.2 entregue.

**Decisões arquiteturais:**
- `supabaseAdmin` + `requireAdmin()` em todas as actions (paridade com `/admin/usuarios`). Bypass de RLS intencional; barreira é o gate de admin.
- **NÃO** duplicar `src/app/actions/progress.ts` (escopo aluno, `requireUser` + RLS via `createClient`). Esta epic é uma camada de leitura agregada paralela.
- Sem N+1: agregações em memória após ≤ 3 queries por action.
- Página `force-dynamic` (toca `supabaseAdmin`, ver memory `supabase_admin_proxy_build`).
- Sem caching/realtime/charts/export — escopo MVP do que PO pediu.

**Anti-recorrência:**
- AC7 da AP-1.1 explicita "supabaseAdmin apenas + requireAdmin no topo de cada action" — defesa contra vazamento via export para client component.
- AP-1.2 AC1 reforça `force-dynamic` (project memory: build quebra se omitir).

**Prefixo AP-1.x** escolhido por estar livre (Epics anteriores: LA, MC, FAA, AV, FM, F1–F13, CT, KV, etc.).

**5-point checklist:** GO 5/5 nas três stories.

---

## Epic LA — Lesson Availability (2026-05-17)

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/LA-1.1-migration-is-available\|LA-1.1]] | Migration `is_available BOOLEAN DEFAULT TRUE NOT NULL` em `lessons` + regerar types | S | backlog | sites-data |
| [[backlog/LA-1.2-admin-toggle-is-available\|LA-1.2]] | Admin — toggle Eye/EyeOff em `SortableLesson` + server action `toggleLessonAvailable` (otimistic + rollback) | M | backlog | sites-dev-alpha + sites-dev-beta |
| [[backlog/LA-1.3-student-badge-em-breve\|LA-1.3]] | Student — badge "Em breve" no listing + `LessonUnavailable` bloqueia player (após gate `hasAccess`) | M | backlog | sites-dev-alpha |

**Objetivo:** dar ao admin um interruptor por aula para marcá-la como "Em breve". No aluno, a aula permanece listada (não some) com badge visual e, ao clicar, o player é substituído por um estado bloqueado dedicado — sem leak de `video_id`. Default `TRUE` mantém todas as aulas existentes disponíveis.

**Dependências:**
- **LA-1.1 bloqueia LA-1.2 e LA-1.3** — sem a coluna + tipos, TypeScript impede o build.
- **LA-1.2 e LA-1.3 podem rodar em paralelo** após LA-1.1 done. QA E2E só faz sentido com as duas integradas.

**Decisão arquitetural (em [[backlog/LA-1.3-student-badge-em-breve|LA-1.3]]):** badge + link clicável → estado bloqueado na própria página da aula (após `hasAccess`). Não esconder a aula; não desabilitar o link; não pular no nav prev/next nesta story. Gate semântico de aplicação (não RLS), permitindo PO reverter rápido sem migration.

**Anti-recorrência:** LA-1.2 exige rollback explícito no otimistic update (anti-recorrência FM-2.2). LA-1.3 garante ordem `hasAccess` → `is_available` para defesa em profundidade (paywall antes de "em breve").

**5-point checklist:** GO 5/5 nas três stories.

---

## Epic MC — Mentoria Claude Code (2026-05-17)

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[done/MC-1.1-mapear-campos-treinamento-supabase\|MC-1.1]] | Mapear conteúdo Mentoria → schema Supabase + JSON-fonte | M | done | sites-architect + sites-analyst |
| [[done/MC-1.2-popular-curso-mentoria-claude-code-supabase\|MC-1.2]] | Popular curso "Mentoria Claude Code" no Supabase (módulos + aulas, idempotente) | M | done | sites-data + sites-dev-beta |
| [[backlog/MC-1.3-integrar-links-vimeo-aulas-mentoria\|MC-1.3]] | Integrar `video_id` Vimeo nas aulas do curso (update lessons) | S | backlog | sites-data + João |
| [[backlog/MC-1.4-validar-visualizacao-curso-aluno\|MC-1.4]] | Validar visualização do curso pelo aluno (smoke E2E + veredicto formal) | S | backlog | sites-qa |
| [[backlog/MC-2.1-adaptar-sistema-campos-extras\|MC-2.1]] | (Contingente) Adaptar sistema academy para campos extras do conteúdo | M | backlog | sites-architect + sites-data |

Objetivo do time **joao-guirunas-site-mentoria-curso**: estruturar e popular o curso "Mentoria Claude Code" no Supabase a partir da pasta-fonte `docs/mentoria-claude-code/Curso On-line/` (10 módulos; 5 com aulas gravadas — M3/M4/M5/M6/M9-bonus-tarefas/M9-bonus-comercial). Arquitetura documentada em [[../../mentoria-claude-code/02-arquitetura-sistema]].

**Sequência:**
1. **MC-1.1** primeiro — define JSON-fonte canônico, decide cohort (A vs B) e destino dos manuais PDF. **Bloqueia MC-1.2**.
2. **MC-1.2** após MC-1.1 — script ou migration idempotente popula `courses` + `modules` + `lessons` + `cohort_courses`.
3. **MC-1.3** em paralelo a MC-1.2 ou logo após — preenche `video_id` Vimeo (depende de upload manual do João).
4. **MC-1.4** após MC-1.2 + MC-1.3 — smoke E2E adversarial com veredicto formal (anti-recorrência Story 1.1: `QA Results` não pode ficar vazio).
5. **MC-2.1** contingente — só vira `active` se MC-1.1 identificar gap real de schema; caso contrário, `deleted` com justificativa.

**Restrição operacional:** nada de migration ou push para `main` sem autorização explícita do João. Todas as 5 stories validadas com 5-point checklist: GO (5/5), exceto MC-2.1 (CONDITIONAL_GO).

**Prefixo MC** escolhido porque livre — Epics anteriores usaram numerais (1.x, 2.x, 3.x) ou prefixos FAA/FM/AV/F1..F13.

---

## Epic Fix Aula Aluno UX (2026-05-16)

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[done/1.1-fix-vimeo-aspect-ratio\|FAA-1.1]] | Fix Vimeo aspect ratio — iframe cortado fora do container 16:9 | S | done | sites-dev-alpha |
| [[backlog/1.2-comentario-live-update\|FAA-1.2]] | Comentários sem live update — addComment retorna comment + useOptimistic | M | backlog | sites-dev-beta + sites-dev-alpha + sites-dev-gamma |
| [[backlog/1.3-sobre-aula-render-markdown\|FAA-1.3]] | Aba "Sobre a aula" exibe markdown raw — fallback não renderiza | S | backlog | sites-dev-alpha |
| [[active/1.4-fix-vimeo-iframe-dimensions-v2\|FAA-1.4]] | Fix Vimeo iframe dimensions v2 — regressão em vídeos não-16:9 | S | active | sites-dev-alpha |

3 bugs UX da área do aluno detectados pelo lead. Stories independentes entre si
(podem rodar em paralelo). 1.1 e 1.3 são fixes pequenos (S). 1.2 envolve handoff
server → client (M) — sites-dev-beta ajusta `addComment` para retornar o
comment, sites-dev-alpha integra `useOptimistic` no `CommentsSection`,
sites-dev-gamma valida E2E. Todas validadas com 5-point checklist: GO (5/5).
Numeração FAA-1.x para não colidir com a Epic 1 histórica (Cleanup pós-discovery).

**FAA-1.4 (2026-05-16):** o fix de FAA-1.1 regrediu para vídeos com aspect
ratio nativo diferente de 16:9 (9:16, 4:3). Causa-raiz: `responsive: true` do
SDK Vimeo respeita o aspect ratio nativo, não o do container. Solução aprovada:
`responsive: false` + CSS forçando o iframe a `position: absolute; inset: 0;
w/h: 100%` via Tailwind arbitrary descendant selector. Modificação local já
existe em `feat-aulas-v2` (não commitada) — story formaliza, define ACs com 3
aspect ratios de teste e critério explícito de "pronto". Checklist 5/5 GO.

---

## Epic Aulas v2 (2026-05-16)

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/AV-3.1-migration-aulas-v2\|AV-3.1]] | Migration única — ADD `summary`+`transcript` + CREATE `lesson_reactions`+RLS + UPDATE description vazias com template | M | backlog | sites-data |
| [[backlog/AV-3.2-template-md-elegante\|AV-3.2]] | Template MD elegante para `description` vazia (minimalista, sem emojis, sem cards) | S | backlog | sites-ux + sites-dev-alpha |
| [[backlog/AV-3.3-admin-3-campos-toggle\|AV-3.3]] | Admin — 3 campos textuais (`description`, `summary`, `transcript`) com toggle Editar/Visualizar (reuso padrão Story 2.3) | M | backlog | sites-dev-alpha |
| [[backlog/AV-3.4-aluno-5-abas\|AV-3.4]] | Aluno — 5 abas em linha (Sobre \| Resumo \| Transcrição \| Materiais \| Comentários), abas vazias somem | M | backlog | sites-dev-alpha |
| [[backlog/AV-3.5-aluno-like-dislike\|AV-3.5]] | Aluno — Like/Dislike (UI + server action `setReaction` + count agregado, optimistic update) | M | backlog | sites-dev-alpha + sites-dev-beta |
| [[backlog/AV-3.6-nav-prev-next-topo\|AV-3.6]] | Mover nav prev/next pra topo da página (compacta, remove NavCards do rodapé) | S | backlog | sites-dev-alpha |
| [[backlog/AV-3.7-smoke-e2e\|AV-3.7]] | Smoke E2E final (admin → aluno end-to-end, veredicto GO/NO-GO) | S | backlog | sites-qa |

Epic Aulas v2 redesenha a experiência da aula tanto no admin quanto no aluno.
Branch ativa: **`feat-aulas-v2`** (NÃO main). 7 stories validadas com 5-point
checklist: GO 5/5 cada. Prefixo **AV-3.x** (Aulas v2) escolhido para não colidir
com a Epic 3 histórica (SEO, abaixo).

**Sequência sugerida:**
1. AV-3.2 (template) e AV-3.1 (migration) — em paralelo, AV-3.1 lê o template definido por AV-3.2.
2. AV-3.3, AV-3.4, AV-3.5, AV-3.6 — em paralelo após AV-3.1 aplicada e tipos regenerados. Mesmo dev (sites-dev-alpha) coordena os 3 que tocam `page.tsx` (AV-3.4, AV-3.5, AV-3.6); sites-dev-beta cuida da action de AV-3.5.
3. AV-3.7 — após todas anteriores em `feat-aulas-v2`. sites-qa valida. GO → lead aprova merge → sites-devops faz push.

**Cuidados críticos:**
- **NÃO TOCAR EM MAIN.** Push só após GO de QA + aprovação do lead.
- DB de PROD: AV-3.1 faz UPDATE em ~13 rows reais. Dry-run obrigatório antes (sites-data).
- Template MD: minimalista, sem emojis, sem cards (diretriz "menos é mais" do lead em AV-3.2).

---

## Epic Fix Materiais (2026-05-16)

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/2.1-material-download-nova-aba\|FM-2.1]] | Download de material abre em nova aba — `target="_blank"` em todos os kinds | S | active | sites-dev-alpha |
| [[backlog/2.2-admin-gerencia-materiais\|FM-2.2]] | Admin gerencia materiais da aula (listar todos os kinds + excluir + cleanup storage + rollback) | M | active | sites-dev-alpha + sites-dev-beta |
| [[backlog/2.3-preview-markdown-admin\|FM-2.3]] | Preview de markdown/HTML/MDX no editor de aula admin — reusa `LessonContent` + server action `previewContentAction` | M | active | sites-dev-alpha + sites-ux |

2 bugs de materiais + 1 enhancement no editor admin reportados pelo lead.
**FM-2.1** é fix UX da área do aluno (`MaterialsList.tsx` faz o anchor sem
`target="_blank"` para arquivos, navegando a aba atual em PDFs/imagens servidos
com `Content-Disposition: inline` pelo Supabase). **FM-2.2** corrige gap de UX
no editor de aula admin: lista existe mas (a) botão delete não aparece para
materiais `LINK` por causa do guard `mat.storage_path && ...`, (b) optimistic
update sem rollback engole erros do server, (c) action não tolera `storagePath`
nulo no `storage.remove`. Hard delete (tabela sem `deleted_at`), cleanup de
storage SIM, sem ownership (coluna `uploaded_by` não existe). **FM-2.3** dá ao
admin um preview ao vivo do markdown/HTML/MDX dos campos `description` e
`content` no editor de aula — reusa o componente `LessonContent` (já é o
renderer canônico do aluno) via server action `previewContentAction` que chama
`renderContent()` server-only, garantindo paridade 1:1 com o que o aluno vê.
Live debounced 400ms, sanitização de HTML, fallback de erro para MDX inválido,
cleanup do stub MDX quebrado em `ContentEditor.tsx`. Stories independentes da
Epic FAA-1.x. Todas validadas com 5-point checklist: GO (5/5). Prefixo FM-2.x
para não colidir com a Epic 2 histórica (Design recommendations P0–P2).

**Story 2.4 — SUPERSEDED por FM-3.7** (cleanup absorvido na Epic FM-3.x).

---

## Epic FM-3 — Materiais por Módulo (2026-05-17)

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[active/FM-3.2-migration-module-materials\|FM-3.2]] | Migration `module_materials` + função `has_module_access` + RLS + storage convention | M | active | sites-data |
| [[backlog/FM-3.3-server-actions-module-materials\|FM-3.3]] | Server actions espelhadas (uploadModuleMaterial, deleteModuleMaterial, addLinkModuleMaterial) + helpers em `lib/materials/storage.ts` | M | backlog | sites-dev-beta |
| [[backlog/FM-3.4-admin-module-editor-client\|FM-3.4]] | UI admin — nova rota `/cursos/[courseId]/modulos/[moduleId]/` com `ModuleEditorClient.tsx` (espelho de LessonEditorClient, anti-recorrência 2.2) | M | backlog | sites-dev-alpha |
| [[backlog/FM-3.5-student-module-materials-listing\|FM-3.5]] | UI student — exibir materiais do módulo na página do curso (signed URL, target=_blank, RLS-gated) | M | backlog | sites-dev-alpha |
| [[backlog/FM-3.6-qa-gate-materiais-modulo\|FM-3.6]] | QA gate adversarial — RLS, admin escape, corrupted state, concurrency, perf, regressão Story 2.2 (QA Results obrigatório — anti-recorrência 1.1) | M | backlog | sites-qa |
| [[active/FM-3.7-cleanup-material-actions-duplicate\|FM-3.7]] | Cleanup `material-actions.ts` + `MaterialsUpload.tsx` órfãos (absorve Story 2.4) | S | done | sites-dev-alpha |

**ADR autoritativa:** [[../decisions/ADR-002-materiais-por-modulo-schema]] (Opção A — tabela `module_materials` espelhada). Aprovada pelo PO João em 2026-05-17.

**Sequência:**
1. **FM-3.2** (sites-data) — primeira, libera tipos
2. **FM-3.3** (sites-dev-beta) — após FM-3.2
3. **FM-3.4** + **FM-3.5** (sites-dev-alpha) — em paralelo após FM-3.3
4. **FM-3.7** (sites-dev-alpha) — após FM-3.3 (caminho canônico do addLink existe), preferencialmente antes da FM-3.6
5. **FM-3.6** (sites-qa) — última, gate adversarial end-to-end

**Regras anti-recorrência embutidas (sem espaço para repetir falhas conhecidas):**
- **Anti-recorrência Story 2.2** nos ACs da FM-3.4 (botão delete visível para LINK, optimistic+rollback, revalidatePath duplo, guard storage_path vazio nas actions FM-3.3)
- **Anti-recorrência Story 1.1** nos ACs da FM-3.6 (QA Results obrigatoriamente preenchido com evidência reproduzível OU aceitação pragmática do PO antes de mover para done)

**Stack escolhida:** Opção A (tabela nova `module_materials`). Trade-offs e justificativa ranqueada detalhados na ADR-002. Sem refactor de `materials` existente — defesa em profundidade preservada conforme risco RLS crítico do ADR-001. Todas 6 stories validadas com 5-point checklist: GO (5/5) cada.

**Prefixo FM-3.x** escolhido para evoluir o namespace FM (Fix Materials → Functional Materials) sem colidir com FM-2.x (Fix Materiais por aula, em curso).

---

## Epic 1 (histórica) — Cleanup pós-discovery

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/1.1-remove-dead-code-hero-pricing-v2\|1.1]] | Remover dead code — HeroSection e PricingCalculatorV2 | S | done | sites-dev-gamma |
| [[backlog/1.2-sitemap-claude-agent-teams\|1.2]] | Adicionar /skills/claude-agent-teams ao sitemap.xml | S | done | sites-dev-gamma |
| [[backlog/1.3-remove-src-features-folder\|1.3]] | Remover src/features/ (pasta inutilizada) | S | done | sites-dev-gamma |
| [[backlog/2.1-pricing-calculator-fixes\|2.1]] | PricingCalculator V1 — fixes squad reset + aria-pressed (P0) | M | done | sites-dev-gamma |
| [[backlog/2.2-revosform-skeleton\|2.2]] | Skeleton loading no RevosForm (P1) | S | done | sites-dev-gamma |
| [[backlog/2.3-a11y-calculator-faq\|2.3]] | A11y — role=checkbox na calculadora + aria-controls no FAQ (P2) | S | done | sites-dev-gamma |

Stories 1.1–1.3 (históricas) resolvem os pontos de atenção 1, 2 (parcial — apenas inclusão da rota ausente) e 4 do [[../project/overview|overview]]. Pontos 3 (zero testes) e 5 (RevosForm externo) ficam fora deste epic.

## Epic 2 — Design recommendations P0–P2

Stories 2.1–2.3: 2.1 aplica fixes pontuais no V1 ativo (squad reset bug + aria). 2.2 e 2.3 são independentes. Decisão de lead: manter V1 (squad tabs, parcelas, trust indicators) — V2 era dead code e foi deletado na Story 1.1.

Ponto 5 do overview (RevosForm externo) é parcialmente mitigado pela Story 2.2 no quesito UX — acessibilidade interna do form Revos permanece fora de escopo (embed de terceiro).

## Epic 3 — SEO (derivado do seo-audit.md)

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/3.0-open-source-metadata\|3.0]] | /open-source metadata + server wrapper (P0) | S | done | sites-dev-gamma |
| [[backlog/3.1-titles-descriptions-top10\|3.1]] | Titles e descriptions — top 10 páginas (P1) | L | done | sites-dev-gamma |
| [[backlog/3.2-course-schema-mentoria\|3.2]] | Course schema JSON-LD em /mentoria (P1) | S | done | sites-dev-gamma |
| [[backlog/3.3-h1-duplo-mentoria\|3.3]] | H1 duplo no DOM em /mentoria (P1) | XS | done | sites-dev-gamma |
| [[backlog/3.4-cwv-image-sizes\|3.4]] | CWV — sizes em imagens responsivas (P2) | S | backlog | — |

Source: [[../agents/research/seo-audit]]. Prioridade: 3.0 e 3.3 resolvem lacunas críticas. 3.1 é a maior oportunidade de tráfego (bulk titles/descriptions). 3.2 aumenta elegibilidade de rich results na página de maior valor comercial. 3.4 melhora CWV marginal.

## Epic 4 — KV Growth Sales — Unidade Visual

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/4.1-kv-global-tokens-watermark\|4.1]] | KV Global — tokens de cor, dot-grid texture e watermark diamante | S | done | sites-dev-alpha |
| [[backlog/4.2-kv-typography-display\|4.2]] | KV Tipografia — Fraunces display nos H1 principais | M | done | sites-dev-alpha |
| [[backlog/4.3-kv-mentoria-facilitadores-badges\|4.3]] | KV Mentoria — facilitadores rect style + section badges | M | done | sites-dev-alpha |
| [[backlog/4.4-kv-open-source-header-colors\|4.4]] | KV Open-Source — header editorial + unificação de cores | M | done | sites-dev-alpha |
| [[backlog/4.5-kv-token-cleanup-legacy-ff4400\|4.5]] | KV Token Cleanup — uniformizar #FF4400 legados | S | backlog | — |
| [[backlog/4.6-kv-open-source-dual-h1\|4.6]] | KV Open-Source — corrigir H1 duplo (regressão SEO/a11y) | S | backlog | — |

Source: análise KV Growth Sales (2026-04-26). Epic adapta Home, Mentoria e Open-Source ao KV da Growth Sales sem alterar logos. Foco: simbologia (watermark diamante), tipografia display (Fraunces), refinamento de tokens e section badges. Stories 4.1–4.4 concluídas (QA PASS 2026-04-26). Stories 4.5 e 4.6 são follow-ups de concerns não-bloqueantes do QA.

## Epic 5 — Cleanup pós-KV

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/5.1-remove-orphan-cat-squads-token\|5.1]] | Remover token órfão --color-cat-squads de globals.css | XS | backlog | — |

## Epic 6 — /agentes Enhancement

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/6.1-upgrade-planet-textures-4k\|6.1]] | Upgrade texturas dos planetas para 4K | S | backlog | sites-dev-gamma |
| [[backlog/6.2-enrich-agentes-json-codenames-abilities\|6.2]] | Enriquecer agentes.json com codenames, abilities e squadRole | M | backlog | sites-dev-gamma |
| [[backlog/6.3-agentcard-race-abilities-upgrade\|6.3]] | AgentCard — exibir raça alienígena + abilities + squadRole | S | backlog | sites-dev-alpha |
| [[backlog/6.4-agent-single-page-rewrite\|6.4]] | Rewrite da single page do agente com conteúdo rico | L | backlog | sites-dev-alpha |

Objetivo: elevar a qualidade visual e informacional da página /agentes. 6.1 melhora os planetas 3D. 6.2 é a base de dados para 6.3 e 6.4. 6.3 enriquece os cards da listagem. 6.4 reescreve as páginas individuais dos agentes com identidade, raça, abilities e squadRole.

---

# Epic Plataforma de Cursos (F1–F8)

Plataforma multi-curso com cohorts como unidade central. Decisões consolidadas em [[../decisions/ADR-001-plataforma-cursos-stack]]. Fonte: [[../../PRD-plataforma-cursos|PRD-plataforma-cursos]] v3.0.

## Fase 1 — Schema Supabase + Storage + Seeds

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F1.1-supabase-link-env-setup\|F1.1]] | Vincular projeto Supabase + variáveis de ambiente | S | backlog | sites-data |
| [[backlog/F1.2-schema-identidade-catalogo\|F1.2]] | Migration — Identidade + Catálogo (profiles, courses, modules, lessons, materials) | M | backlog | sites-data |
| [[backlog/F1.3-schema-cohorts\|F1.3]] | Migration — Cohorts (unidade central) | M | backlog | sites-data |
| [[backlog/F1.4-schema-pagamento-progresso-comunidade\|F1.4]] | Migration — Pagamento + Progresso + Comunidade + Auxiliares | M | backlog | sites-data |
| [[backlog/F1.5-has-access-rls-policies\|F1.5]] | Função has_access() + RLS em todas as tabelas | L | backlog | sites-data |
| [[backlog/F1.6-storage-buckets-policies\|F1.6]] | Buckets de Storage + policies | S | backlog | sites-data |
| [[backlog/F1.7-seed-dados-demo\|F1.7]] | Seed de dados demo | M | backlog | sites-data |
| [[backlog/F1.8-types-typescript-utilitarios\|F1.8]] | Geração de tipos TS + utilitários de banco | S | backlog | sites-data |

## Fase 2 — Auth Supabase + RBAC

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F2.1-auth-supabase-providers\|F2.1]] | Configuração Supabase Auth (email/senha + Google OAuth) | S | backlog | sites-dev-beta |
| [[backlog/F2.2-paginas-auth-ui\|F2.2]] | Páginas auth — login, cadastro, recuperar senha | M | backlog | sites-dev-beta |
| [[backlog/F2.3-middleware-rbac-helpers\|F2.3]] | Middleware Next.js + helpers RBAC | M | backlog | sites-dev-beta |
| [[backlog/F2.4-emails-resend-templates\|F2.4]] | Emails transacionais — Resend + React Email | M | backlog | sites-dev-beta |

## Fase 3 — Player de vídeo + Progresso + Lesson

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F3.1-video-adapter-vimeo\|F3.1]] | Video adapter + Vimeo implementation | M | backlog | sites-dev-alpha |
| [[backlog/F3.2-video-player-progresso\|F3.2]] | VideoPlayer + Server Action saveProgress | M | backlog | sites-dev-alpha |
| [[backlog/F3.3-pagina-aula-has-access-locked\|F3.3]] | Página da aula + has_access + LockedContent | L | backlog | sites-dev-alpha |
| [[backlog/F3.4-renderizacao-mdx-html-markdown\|F3.4]] | Renderização triplo formato (MDX, HTML, Markdown) | M | backlog | sites-dev-alpha |
| [[backlog/F3.5-dashboard-meus-cursos-curso\|F3.5]] | Dashboard + /meus-cursos + /curso/[slug] | M | backlog | sites-dev-alpha |

## Fase 4 — Comments + Materials

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F4.1-comments-aulas\|F4.1]] | Sistema de comments nas aulas | M | backlog | sites-dev-alpha |
| [[backlog/F4.2-materials-storage-signed-url\|F4.2]] | Materials — listagem e download via signed URL | S | backlog | sites-dev-alpha |

## Fase 5 — Forum + Live Sessions + Certificates

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F5.1-forum-categorias-threads\|F5.1]] | Fórum — categorias, threads e replies | L | backlog | sites-dev-alpha |
| [[backlog/F5.2-agenda-live-sessions\|F5.2]] | /agenda + live_sessions | M | backlog | sites-dev-alpha |
| [[backlog/F5.3-certificados-pdf-verificacao\|F5.3]] | Certificates — geração PDF + página pública | M | backlog | sites-dev-alpha |

## Fase 6 — Área Administrativa

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F6.1-admin-dashboard-metricas\|F6.1]] | Admin Dashboard com métricas | M | backlog | sites-dev-delta |
| [[backlog/F6.2-admin-crud-courses-modules-lessons\|F6.2]] | CRUD courses, modules, lessons | XL | backlog | sites-dev-delta |
| [[backlog/F6.3-admin-crud-cohorts\|F6.3]] | CRUD de cohorts (coração comercial) | XL | backlog | sites-dev-delta |
| [[backlog/F6.4-admin-usuarios-pagamentos-moderacao\|F6.4]] | Usuários, pagamentos, moderação, fórum | L | backlog | sites-dev-delta |

## Fase 7 — Stripe e Checkout

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F7.1-payment-adapter-stripe\|F7.1]] | Payment adapter + Stripe implementation | M | backlog | sites-dev-gamma |
| [[backlog/F7.2-sync-cohort-stripe\|F7.2]] | Sincronização Cohort ↔ Stripe | L | backlog | sites-dev-gamma |
| [[backlog/F7.3-checkout-session-entry-extension\|F7.3]] | createCheckoutSession (decide ENTRY vs EXTENSION) | M | backlog | sites-dev-gamma |
| [[backlog/F7.4-webhook-stripe-cross-extensions\|F7.4]] | Webhook Stripe + idempotência + cross extensions | XL | backlog | sites-dev-gamma |
| [[backlog/F7.5-auto-renewal-cron\|F7.5]] | Renovação automática + cron diário | L | backlog | sites-dev-gamma |
| [[backlog/F7.6-emails-pagamento-renovacao\|F7.6]] | Templates de email — pagamento e renovação | S | backlog | sites-dev-gamma |
| [[backlog/F7.7-perfil-historico-matriculas-renovar\|F7.7]] | /perfil — histórico, matrículas, recompra | M | backlog | sites-dev-gamma |
| [[backlog/F7.8-turmas-lp-publicas\|F7.8]] | /turmas listagem + /turmas/[slug] LP automática | M | backlog | sites-dev-gamma |

## Fase 8 — Polimento e Deploy

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F8.1-notifications-onboarding\|F8.1]] | Notifications in-app + onboarding | M | backlog | sites-dev-alpha |
| [[backlog/F8.2-emails-restantes-lembretes\|F8.2]] | Emails restantes (session lembrete, novo material) | S | backlog | sites-dev-alpha |
| [[backlog/F8.3-mobile-acessibilidade\|F8.3]] | Responsividade mobile + acessibilidade WCAG AA | L | backlog | sites-dev-alpha |
| [[backlog/F8.4-observabilidade-sentry-analytics\|F8.4]] | Sentry + Vercel Analytics | S | backlog | sites-devops |
| [[done/F8.5-e2e-playwright-tests\|F8.5]] | Testes E2E com Playwright | L | done | sites-qa |
| [[done/F8.6-deploy-vercel-producao\|F8.6]] | Deploy Vercel + produção | M | done | sites-devops |
| [[done/F8.7-smoke-test-pre-lancamento\|F8.7]] | Smoke test pré-lançamento + go-live checklist | S | done | sites-qa |

## Fase F9 — Curso Online + Admin Hardening

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F9.1-refactor-curso-online-estrutura-mentoria\|F9.1]] | Refactor /curso-online com estrutura visual da /mentoria | M | backlog | sites-dev-alpha |
| [[backlog/F9.2-auditar-checkout-stripe-curso-online\|F9.2]] | Auditar checkout Stripe da /curso-online (cohort, action, redirect, webhook) | M | backlog | sites-dev-beta |
| [[backlog/F9.3-validar-acesso-admin-middleware\|F9.3]] | Validar gate de acesso /academy/admin (middleware + RBAC) | S | backlog | sites-dev-delta |
| [[backlog/F9.4-bug-hunt-academy-admin\|F9.4]] | Bug hunt sweep nas páginas /academy/admin/* | L | backlog | sites-dev-delta |
| [[backlog/F9.5-auditar-apis-admin\|F9.5]] | Auditar APIs em /api/admin/* | S | backlog | sites-dev-beta |
| [[backlog/F9.6-admin-editor-encontros-ao-vivo\|F9.6]] | Editor completo de Encontros ao Vivo no admin de turmas | M | done | Kronilux |
| [[backlog/F9.7-auditar-fluxo-certificados\|F9.7]] | Auditar fluxo de certificados (emissão, download PDF, verificação pública) | M | backlog | sites-dev-alpha |
| [[backlog/F9.8-auditar-videoplayer-progresso\|F9.8]] | Auditar VideoPlayer + flow de progresso (saveProgress, markComplete, edge cases) | M | backlog | sites-dev-alpha |
| [[backlog/F9.9-auditar-has-access-rpc\|F9.9]] | Auditar has_access RPC + gates de acesso a aulas e módulos | M | backlog | sites-data |
| [[backlog/F9.10-auditar-dashboard-meus-cursos-agenda\|F9.10]] | Auditar dashboard + meus-cursos + agenda do aluno (queries cross-cohort, expiração, livestreams) | M | backlog | sites-dev-alpha |
| [[backlog/F9.11-auditar-comments-forum-permissions\|F9.11]] | Auditar comments + fórum (permissions, RLS bypass via supabaseAdmin, moderação) | M | backlog | sites-dev-alpha |
| [[backlog/F9.12-auditar-area-aluno-bug-hunt\|F9.12]] | Auditar área do aluno — bug hunt + a11y sweep | L | validated | sites-qa |
| [[backlog/F9.13-auditar-server-actions-aluno-rls\|F9.13]] | Auditar Server Actions do aluno + integridade RLS | M | validated | sites-dev-beta |
| [[backlog/F9.14-auditar-fluxos-auth\|F9.14]] | Auditar fluxos auth (login, cadastro, recuperar/redefinir senha) | M | validated | sites-dev-beta |
| [[backlog/F9.15-auditar-apis-publicas-jobs\|F9.15]] | Auditar APIs públicas e jobs (webhooks, crons, certificado) | M | validated | sites-dev-beta |
| [[backlog/F9.16-auditar-components-student\|F9.16]] | Auditar components student críticos (VideoPlayer, Materials, Comments) | M | validated | sites-dev-alpha |
| [[backlog/F9.17-payments-unique-stripe-session\|F9.17]] | UNIQUE constraint em payments(stripe_checkout_session_id) + ON CONFLICT no webhook | S | validated | sites-data + sites-dev-beta |
| [[backlog/F9.18-p1-cleanup-area-aluno\|F9.18]] | P1-cleanup F9.12 — bugs B-02 a B-06 (Stripe link, /turmas link, cross-module nav, N+1 fórum) | M | validated | sites-dev-alpha + sites-dev-beta |

Objetivo: refinar a página /curso-online (espelhando /mentoria sem elementos presenciais/ao vivo/bônus) e endurecer a área administrativa antes do lançamento. Stories F9.3–F9.5 podem rodar em paralelo. F9.1 e F9.2 são independentes mas relacionadas (F9.2 garante que o CTA de F9.1 funciona). F9.6 completa o CRUD de live_sessions no admin (faltam UPDATE, description, recording_url, UX).

**Auditoria granular técnica (F9.7–F9.11)**: stories focadas em comportamento e regras de negócio, técnicas e específicas (referenciam linhas exatas de código). F9.7 corrige TODO crítico em `/api/certificado/[code]` (rota retorna mock em produção). F9.8 audita race conditions e edge cases do VideoPlayer (95% threshold, double-tab, swap provider). F9.9 audita o RPC `has_access` e o fallback `hasGlobalAccess` — barreira de autorização cross-cohort. F9.10 valida queries cross-cohort em dashboard/meus-cursos/agenda (incluindo janela de meeting_url). F9.11 audita permissões e moderação em comments + fórum, justificando bypasses via `supabaseAdmin`. Já em curso: sites-qa (F9.7-relacionado) e sites-dev-beta (F9.9/F9.10).

**Auditoria de cobertura ampla (F9.12–F9.16)**: stories complementares cobrindo segurança/funcionalidade transversal. F9.4 cobriu admin pages, F9.5 cobriu APIs admin, F9.2 cobriu checkout. F9.12 estende o bug hunt para o lado student. F9.13 audita Server Actions e RLS. F9.14 audita os 4 fluxos auth. F9.15 audita webhooks/crons/certificado público. F9.16 audita components críticos (XSS, signed URL TTL, video_id leak). Podem rodar em paralelo entre si — sem dependências. Foco: auditoria + fixes P0/P1, sem features novas. Reservadas para o próximo ciclo.

**F9.17 — UNIQUE constraint em payments**: gap identificado por Rex-S durante a auditoria. Migration + ON CONFLICT no webhook. Idempotência ao nível DB.

**F9.18 — P1-cleanup F9.12**: 5 bugs P1 abertos pelo sites-qa durante o bug-hunt da área do aluno (F9.12). B-02 (Stripe `/test/` em prod) e B-03 (link `/turmas/` inexistente) são fixes pequenos de UI. B-04 (cross-module nav sem gate `has_access`) bloqueia AC4 da F9.12. B-05/B-06 (N+1 no fórum) são performance — index e detail. Coordena sites-dev-alpha (UI/nav) e sites-dev-beta (queries).

## Fase F13 — Admin Destructive Actions + InfinitePay Hardening Operacional

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F13.1-excluir-aluno-admin\|F13.1]] | Excluir aluno no admin (auth.admin.deleteUser + confirmação dupla) | M | backlog | sites-dev-delta |
| [[backlog/F13.2-excluir-pagamentos-pendentes-admin\|F13.2]] | Excluir pagamentos pendentes no admin (guard status=PENDING) | S | backlog | sites-dev-delta |
| [[backlog/F13.4-infinitepay-static-url-warning-setup-guide\|F13.4]] | Aviso link estático no CohortForm + guia turma de teste R$1 | S | backlog | sites-dev-alpha |

**Objetivo:** completar o admin com ações destrutivas faltantes (Pipeline A) e endurecer operação InfinitePay (Pipeline B). F13.1 adiciona delete de conta na `UserProfileModal` (complementa o ban/unban). F13.2 adiciona delete de pagamentos PENDING na tabela (complementa o refund de APPROVED). F13.4 alerta admin sobre trade-off do link estático em `CohortForm` (não rastreia pagamento via webhook) e cria guia operacional `docs/smart-memory/ops/infinitepay-setup-guide.md` para criar turma de teste R$1 end-to-end. Stories independentes entre si, podem rodar em paralelo.

**Pipeline A (F13.1/F13.2):** research do analyst-1.
**Pipeline B (F13.4):** research do analyst-2 (decisão do lead 2026-05-11). O GAP 1 reportado ("Bearer Token não implementado") foi descartado — adapter já está correto, autenticando via campo `handle` no body conforme runbook `checkout-infinitepay.md`. A nota incorreta originou de QA results em `docs/smart-memory/agents/qa/results.md` (F12.1).

**Não-objetivos:** soft delete, bulk delete, audit log, cancelamento de sessão Stripe/InfinitePay remota, alterações no adapter `infinitepay.ts` (já correto), criação programática de turma de teste.

## Fase F12 — InfinitePay (segundo provider de pagamento)

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F12.1-infinitepay-adapter-webhook\|F12.1]] | InfinitePayAdapter + webhook handler (createCheckoutLink, payment_check, idempotência via order_nsu) | M | validated | sites-dev-beta |
| [[backlog/F12.2-infinitepay-migration-admin-ui-dual-provider\|F12.2]] | Migration cohorts.payment_provider + admin UI dual-provider (CohortForm) | M | validated | sites-data + sites-dev-alpha |
| [[backlog/F12.3-checkout-router-por-provider\|F12.3]] | Router de checkout por provider (Stripe vs InfinitePay) em checkoutPublic + página de sucesso | S | validated | sites-dev-beta |

**Objetivo:** habilitar InfinitePay como segundo provider de pagamento, configurável por cohort. Default permanece Stripe (backwards-compatible). InfinitePay não tem assinatura HMAC — segurança via `payment_check` server-to-server. Idempotência via `order_nsu` (UUID gerado server-side, igual a `payments.id`).

**Dependências:** F12.1 (adapter + webhook + coluna `infinitepay_order_nsu` em payments) deve completar antes ou em paralelo a F12.3 (router). F12.2 (migration `payment_provider` + UI) precisa estar antes de F12.3 (que lê a coluna). F12.1 e F12.2 podem rodar em paralelo. F12.3 depende das duas.

**Numeração:** epic F12 escolhido por ser o próximo livre (F1–F11 já em uso, F10/F11 em done).

## Notas de orquestração

- **Sequencial estrita**: F1 → F2 → F3 (em paralelo F3 e F4). F5/F6 em paralelo após F3-F4. F7 depende de F2, F3 e F6 (LP usa cohort do admin). F8 fecha tudo
- **Maior risco**: F7.4 (webhook idempotência + cross extensions) — assignar dev mais experiente
- **Story mais detalhada**: F1.5 (RLS) — vazamento de dados é risco crítico do ADR-001
- **Sugestão de squads** (PRD Seção 13):
  - Architect → F1 (sites-data, sites-architect supervisão)
  - Auth Engineer → F2 (sites-dev-beta)
  - Student Frontend → F3, F4, F5 (sites-dev-alpha)
  - Admin Frontend → F6 (sites-dev-delta)
  - Payment Engineer → F7 (sites-dev-gamma)
  - DevOps → F8.4, F8.6 (sites-devops); QA → F8.5 (sites-qa)

## Follow-ups pós-ciclo F9+F12 (2026-05-10)

### F12.4 — Hardening InfinitePay (pre-launch blocker)
- **CONCERN-1:** gate `paid_amount >= amount_cents` em `route.ts:138-139` (✅ já fixado em commit 55e1339)
- **CONCERN-4:** Sentry alert no branch `null user_id + null customer_email` (✅ já fixado em commit 55e1339)
- Status: resolvido no follow-up push

### F12.5 (opcional) — Cleanup tipos InfinitePay
- CONCERN-2: coluna `infinitepay_order_nsu TEXT` → migrar para UUID em próxima migration
- CONCERN-5: regenerar `database.types.ts` para cobrir `increment_filled_seats` RPC e remover `as any`

### F9.x cleanup (baixa prioridade)
- Follow-ups documentação de F9.13 (cobertura de testes), F9.14 (OAuth whitelist no Dashboard), F9.15 (crons Supabase Edge Functions — já migrados em F11.1)
