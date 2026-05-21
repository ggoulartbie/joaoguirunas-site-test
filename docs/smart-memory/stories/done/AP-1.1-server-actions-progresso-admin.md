---
title: "AP-1.1: Server actions admin de progresso (agregado por aluno e por aula, filtrável por turma)"
type: story
status: backlog
epic: AP
complexity: M
agent: sites-dev-beta
created: 2026-05-21
updated: 2026-05-21
tags: [story, admin, progress, server-actions, supabase]
checklist: GO
related:
  - "[[AP-1.2-pagina-admin-progresso]]"
  - "[[AP-1.3-filtros-progresso-admin]]"
  - "[[../../project/architecture]]"
---

# AP-1.1: Server actions admin de progresso (agregado por aluno e por aula, filtrável por turma)

## Objetivo

Criar a camada de dados (server actions) que alimentará o dashboard admin de acompanhamento. Duas queries principais: (1) progresso agregado por **aluno × curso** (% concluído + contagem aulas vistas) e (2) progresso por **aula × quantos alunos concluíram** (contagem absoluta + percentual sobre a base de alunos elegíveis). Ambas com filtro opcional por `cohortId` para escopar o universo.

## Acceptance Criteria

- [ ] **AC1 — Arquivo criado:** `src/app/(academy)/academy/(admin)/admin/progresso/actions.ts` com `'use server'` e header `requireAdmin()` no topo de cada export (mesmo padrão de `admin/usuarios/actions.ts`).
- [ ] **AC2 — `getStudentsProgress(filters)`:** retorna lista de alunos elegíveis (com matrícula `ACTIVE` em `cohort_members`) e, para cada um, `{ userId, name, email, cohortName, courses: Array<{ courseId, courseTitle, totalLessons, completedLessons, percentage }> }`. Percentage = `completedLessons / totalLessons * 100` arredondado a 1 casa decimal. Aulas que estão fora de algum curso disponível para o aluno via `cohort_courses` não entram no denominador.
- [ ] **AC3 — `getLessonsCompletionStats(filters)`:** retorna lista de aulas com `{ lessonId, lessonTitle, lessonSlug, moduleId, moduleTitle, courseId, courseTitle, completedCount, eligibleCount, percentage }`. `eligibleCount` = quantos alunos `ACTIVE` têm a aula disponível via `cohort_members` → `cohort_courses` → `modules` → `lessons`. `completedCount` = registros em `lesson_progress` com `completed=true` filtrados por esse universo.
- [ ] **AC4 — `getStudentLessonsBreakdown(userId, courseId)`:** retorna, para um aluno + curso específicos, a lista de aulas do curso com `{ lessonId, lessonTitle, moduleTitle, completed (boolean), completedAt (timestamp \| null), secondsWatched (int) }`. Usada na expansão da linha do aluno na AP-1.2.
- [ ] **AC5 — Filtros suportados:** o objeto `filters` aceita `{ cohortId?: string, courseId?: string }`. Quando `cohortId` é informado, restringe `cohort_members` àquela turma. Quando `courseId` é informado, restringe a lista de cursos retornados àquele curso. Ambos opcionais e combináveis.
- [ ] **AC6 — Validação de input:** `cohortId` e `courseId` (quando presentes) passam por `isUUID()` (regex idêntica à de `admin/usuarios/actions.ts:6-7`). Inputs inválidos → `throw new Error('Cohort ID inválido')` / `'Course ID inválido'`. `userId` em `getStudentLessonsBreakdown` segue mesma regra.
- [ ] **AC7 — `supabaseAdmin` apenas:** todas as queries usam `supabaseAdmin` (bypass de RLS é correto neste contexto admin — paridade com `admin/usuarios/page.tsx:14`). `requireAdmin()` é a barreira de autorização.
- [ ] **AC8 — Sem N+1:** `getStudentsProgress` e `getLessonsCompletionStats` resolvem o agregado em no máximo **3 queries** cada uma (ex.: 1 para universo de alunos+cursos via joins em `cohort_members`+`cohort_courses`, 1 para `lessons` desse universo, 1 para `lesson_progress` desse universo) e fazem a agregação em memória no JS. Não fazer 1 query por aluno nem 1 por aula. Documentar contagem real no PR description.
- [ ] **AC9 — Emails dos alunos:** `getStudentsProgress` usa `supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })` para mapear `userId → email` e `userId → name` (paridade com `admin/usuarios/page.tsx:31-37`). `profiles.name` é a fonte primária do nome; cai para email se `name` for nulo.
- [ ] **AC10 — Aulas indisponíveis (`is_available=false`):** quando uma aula tem `is_available=false` (epic LA, ainda backlog), ela deve ser **excluída** do `totalLessons` e do `eligibleCount`. Mesmo critério aplicado pelo aluno. Se a epic LA ainda não tiver sido implementada (coluna não existe), o filtro é no-op — implementar de forma defensiva (`if 'is_available' in lesson`).
- [ ] **AC11 — Performance baseline:** com 50 alunos, 3 cursos, 60 aulas no total, `getStudentsProgress` sem filtros executa em **< 800ms** medido em ambiente dev local (registrar no PR). Caso ultrapasse, abrir follow-up.
- [ ] **AC12 — Sem caching agressivo:** os resultados são lidos em página `force-dynamic`. Não usar `unstable_cache` nesta story (consistência > performance pra um admin que vê dados quase em tempo real).
- [ ] **AC13 — Tipos exportados:** types `StudentProgressRow`, `LessonCompletionRow`, `StudentLessonsBreakdownRow`, `ProgressFilters` exportados do mesmo arquivo, consumidos pela AP-1.2.
- [ ] **AC14 — Typecheck + lint:** `pnpm typecheck` e `pnpm lint` PASS.

## Escopo

**IN:**
- 3 server actions read-only descritas em AC2/AC3/AC4
- Filtros de `cohortId` e `courseId`
- Validação UUID + `requireAdmin()`
- Tipos públicos do contrato
- Otimização N+1 (≤ 3 queries por action agregada)

**OUT:**
- Página UI (é a AP-1.2)
- Filtro por módulo / filtros adicionais (AP-1.3 opcional)
- Export CSV / download (não pedido pelo PO)
- Realtime / websockets
- Mutação de progresso (já existe em `src/app/actions/progress.ts`, escopo aluno)
- Cache (Redis, `unstable_cache`)
- Notificações para o aluno
- Permissão MENTOR (só ADMIN nesta story; abrir follow-up se PO pedir)

## Contexto Técnico

**Schema relevante (já existente, NÃO criar migration):**
- `lesson_progress(user_id, lesson_id, completed, completed_at, seconds_watched)`
- `lessons(id, title, slug, module_id, is_available?)`
- `modules(id, title, course_id)`
- `courses(id, title, slug)`
- `cohort_members(user_id, cohort_id, status, member_role)` — filtrar `status='ACTIVE'`
- `cohort_courses(cohort_id, course_id)` — junção que define quais cursos cada cohort tem
- `profiles(id, name, avatar_url, role)`
- `auth.users` acessível só via `supabaseAdmin.auth.admin.listUsers`

**Padrão de referência:**
- `src/app/(academy)/academy/(admin)/admin/usuarios/page.tsx:13-37` — pattern de fetch agregado com joins + `listUsers` em batch
- `src/app/(academy)/academy/(admin)/admin/usuarios/actions.ts:1-27` — pattern de `'use server'` + `requireAdmin()` + UUID validation
- `src/app/actions/progress.ts` — **NÃO duplicar**; aquilo é escopo aluno (`requireUser` + RLS via `createClient`), esta story é escopo admin (`requireAdmin` + `supabaseAdmin`)

**Risco RLS:** usar `supabaseAdmin` aqui é intencional. A barreira de autorização é o `requireAdmin()` no topo de cada action. **Crítico:** nenhuma dessas actions pode ser exportada para um client component sem o gate — `'use server'` + `requireAdmin()` é a defesa em profundidade.

**Cohort × Curso × Aluno:** o universo "aulas elegíveis para um aluno" é a interseção: `cohort_members.user_id × cohort_members.cohort_id × cohort_courses.course_id × modules.course_id × lessons.module_id`. Quando um aluno está em múltiplas cohorts com cursos sobrepostos, contar a aula **uma vez** (dedupar por `lessonId`).

## Dev Agent Record

| Campo | Valor |
|---|---|
| Agente | sites-dev-beta |
| Iniciado | — |
| Concluído | — |
| Branch | — |

## File List
<!-- Dev preenche ao concluir -->

## QA Results
<!-- QA preenche ao revisar -->
