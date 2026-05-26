---
title: "Story TGA-1.3: Student — enforcement de `included_lesson_ids` nas páginas do aluno"
type: story
status: backlog
epic: TGA
complexity: M
agent: sites-dev-alpha
created: 2026-05-25
updated: 2026-05-25
tags: [story, student, cohorts, access-control, defense-in-depth]
related:
  - "[[../../decisions/ADR-turma-granular-access]]"
  - "[[TGA-1.1-migration-included-lesson-ids]]"
  - "[[TGA-1.2-admin-ui-lesson-selector]]"
  - "[[TGA-1.4-qa-gate-granular-access]]"
---

# Story TGA-1.3: Student — enforcement de `included_lesson_ids` nas páginas do aluno

## Objetivo

Propagar o filtro de `included_lesson_ids` nas 5 páginas/queries do aluno que hoje consomem `cohort_courses.included_module_ids`, garantindo defesa em profundidade (camada de aplicação) além do RPC `has_access` atualizado em TGA-1.1. Aula não-liberada some das listagens; tentativa direta de URL devolve 404 ou bloqueio (não vaza `video_id`).

## Acceptance Criteria

- [ ] **AC1 — `/dashboard` (`src/app/(academy)/academy/(student)/dashboard/page.tsx:42-90`):** ao montar `moduleIdsByCohort` e fetchar lessons (linhas ~82-90), aplicar filtro pós-fetch que remove qualquer lesson `l.id NOT IN included_lesson_ids` quando a respectiva `cohort_courses` row tem `cardinality(included_lesson_ids) > 0`. Manter o filtro existente `is_available = true`. Contagem total e progresso permanecem coerentes.
- [ ] **AC2 — `/meus-cursos` (`src/app/(academy)/academy/(student)/meus-cursos/page.tsx:27-100`):** mesmo tratamento em `accessibleModuleIds` (linha ~69-72) — montar mapa `accessibleLessonIdsByCourse` derivado de `cohort_courses` e filtrar `lessonRows` após o fetch. Contadores de progresso refletem apenas aulas liberadas.
- [ ] **AC3 — `/curso/[slug]` (`src/app/(academy)/academy/(student)/curso/[slug]/page.tsx:120-180`):** após fetch de `course.modules.lessons` (já filtra por `deleted_at`), aplicar filtro de visibilidade na renderização: aulas não-liberadas pelo `included_lesson_ids` da cohort do aluno **não aparecem na lista** (espelha o tratamento de módulo não-liberado). `hasGlobalAccess` (linha 170) continua válido como override quando `cohort_courses` row não existe para o curso. Variável local `accessibleLessonIdsByModule: Map<string, Set<string>>` é o melhor abstrato.
- [ ] **AC4 — `/curso/[slug]/aula/[lesson-slug]` — gate primário via RPC + nivelar inconsistência com `curso/[slug]/page.tsx` (concern formal Axilun):** a chamada `supabase.rpc('has_access', { p_user_id, p_lesson_id })` em `page.tsx:98-102` **já respeita** o novo filtro (TGA-1.1 atualizou a função). Validar que: aula bloqueada por `included_lesson_ids` → `access = false` → renderiza `<LockedContent />`, NÃO vaza `video_id` no DOM. **Além disso, nivelar o padrão de "accessibleModuleIds" em `aula/[lesson-slug]/page.tsx:119-129`** que hoje funciona por acidente: monta `accessibleModuleIds = new Set(flatMap(included_module_ids))` e usa o guard `accessibleModuleIds.size > 0 && !accessibleModuleIds.has(m.id)` na linha 145 — quando a lista é `[]` (acesso total) o set fica vazio e o guard inverte. Substituir esse bloco pela expansão explícita do helper `filterLessonsByCohortAccess` (AC6), eliminando a fragilidade: se alguém remover o `size > 0 &&` do guard, todos os alunos com acesso total perdem navegação prev/next. Após o refactor, a página inteira passa a usar o mesmo padrão de expansão explícita de `curso/[slug]/page.tsx:159-165`.
- [ ] **AC5 — `/turmas/[slug]` (`src/app/(academy)/academy/turmas/[slug]/page.tsx`):** se a LP pública lista módulos/aulas da turma, refletir apenas o conjunto liberado (`included_module_ids ∩ included_lesson_ids`). Se a LP só mostra cursos (sem entrar em módulos/aulas), nenhuma mudança necessária — documentar no PR a inspeção feita.
- [ ] **AC6 — Helper compartilhado:** extrair uma função utilitária em `src/lib/access/cohort-filters.ts` (novo arquivo) com:
  ```ts
  export function filterLessonsByCohortAccess(
    lessons: { id: string; module_id: string }[],
    cohortCourseRows: { course_id: string; included_module_ids: string[]; included_lesson_ids: string[] }[],
    moduleIdsByCourse: Map<string, string[]>,
    hasGlobalAccess: boolean,
  ): Set<string> // returns Set of accessible lessonIds
  ```
  Os 4 caminhos do aluno (AC1, AC2, AC3, AC5 quando aplicável) consomem o mesmo helper — single source of truth para a lógica de 3 níveis. AC4 fica fora (usa RPC direto).
- [ ] **AC7 — Backwards compat (legacy data):** queries continuam tratando `included_lesson_ids = []` como "todas as aulas liberadas" (igual à semântica de `included_module_ids = []`). Cohorts existentes (todas com `included_lesson_ids = '{}'` após apply de TGA-1.1) renderizam exatamente o mesmo conteúdo que renderizavam antes — zero regressão visual ou de contagem.
- [ ] **AC8 — Aula bloqueada por aula ≠ bloqueada por módulo (sem leak):** quando aula está bloqueada via `included_lesson_ids` mas o módulo aparece nas listagens, a UI **não exibe a aula na listagem** (AC1/AC2/AC3). Isso impede o "vazamento por menção" (admin vê aula X liberada para outra turma, aluno de turma restrita não deve ver nem o título).
- [ ] **AC9 — TypeScript build passa:** tipos regenerados em TGA-1.1 já trazem `included_lesson_ids: string[]`. Nenhum cast `as any` é necessário; se aparecer, é red flag.
- [ ] **AC10 — `hasGlobalAccess` preservado:** o fallback "cohort ativa mas sem `cohort_courses` row para o curso" (`page.tsx:170`) continua liberando tudo. `included_lesson_ids` não entra nesse caminho — não há `cohort_courses` para consultar.
- [ ] **AC11 — Semântica `[]` em `included_lesson_ids` quando `included_module_ids = []` (concern Axilun #3):** o helper `filterLessonsByCohortAccess` (AC6) trata `included_module_ids = []` como "acesso total ao curso" via expansão explícita, e **ignora `included_lesson_ids`** nesse cenário (mesmo se contiver UUIDs por erro do admin). Documentação inline no helper: "Se módulo é vazio (acesso total), `included_lesson_ids` não restringe — coerente com a tabela verdade ADR-003." Defesa contra estado dirty no banco.

## Escopo

**IN:**
- Edição dos 4 caminhos do aluno (dashboard, meus-cursos, curso/[slug], turmas/[slug] se aplicável).
- Novo helper compartilhado `src/lib/access/cohort-filters.ts`.
- Verificação de AC4 (RPC já cobre) — sem mudança de código, apenas evidência no PR.

**OUT:**
- Migration ou tipos (TGA-1.1).
- UI admin (TGA-1.2).
- QA gate adversarial (TGA-1.4).
- Refactor de `progress.ts` / `admin-progress.ts` — se essas actions referenciam `cohort_courses` para contagem de progresso, decidir caso a caso: progresso é "do que o aluno tem direito a ver", então o filtro `included_lesson_ids` deve aplicar; se o helper já é reutilizado, custo é mínimo.
  Concretamente: revisar `src/app/actions/progress.ts` e `src/app/actions/admin-progress.ts` e aplicar o helper quando o cálculo cruza `cohort_courses`. Anti-N+1: o helper recebe row já fetchada.
- Mudanças em comments/forum/livesessions (gated por outras regras).
- Materiais por módulo (ADR-002 — gated por `has_module_access`, fora do escopo de aula).
- Performance tuning (queries já são anti-N+1; helper é pure function em memória).

**OUT (mas confirmar inexistência no PR):**
- Listagens públicas (não-autenticadas) que mencionam aulas. Provavelmente inexistentes; confirmar no `/turmas/[slug]`.

## Contexto Técnico

**Bloqueado por:** [[TGA-1.1-migration-included-lesson-ids|TGA-1.1]] (coluna + tipos + RPC atualizada). Pode rodar **em paralelo** com [[TGA-1.2-admin-ui-lesson-selector|TGA-1.2]].

**5 caminhos identificados (linha ranges aproximadas):**

1. **`src/app/(academy)/academy/(student)/dashboard/page.tsx:42-90`** — `cohortCoursesResult` lê `included_module_ids`; mesma row precisa selecionar `included_lesson_ids`. Filtro depois do fetch de lessons.
2. **`src/app/(academy)/academy/(student)/meus-cursos/page.tsx:27-100`** — mesmo padrão; mesma row.
3. **`src/app/(academy)/academy/(student)/curso/[slug]/page.tsx:120-180`** — `cohortCourseRows` (linha 149-155); ganha `included_lesson_ids` no select. Filtro aplicado no render da lista de módulos/aulas. **Este é o caminho canônico** que faz expansão explícita de `included_module_ids = []` (linhas 159-165) — outros caminhos devem se alinhar a ele.
4. **`src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx:98-145`** — RPC `has_access` é o gate primário. Adicionalmente, refactor das linhas 119-145 para usar o helper `filterLessonsByCohortAccess`, eliminando o padrão acidental "set vazio = todos passam" (AC4). Após refactor, lista de lessons usada para navegação prev/next deriva do helper, igual ao `curso/[slug]/page.tsx`.
5. **`src/app/(academy)/academy/turmas/[slug]/page.tsx`** — LP pública da turma. Se lista aulas, aplicar helper; se só lista cursos/módulos, documentar inspeção.

**Padrão a ser substituído (frágil) em `aula/[lesson-slug]/page.tsx:127-129`:**
```ts
// Antes (frágil — funciona por acidente quando included_module_ids = [])
const accessibleModuleIds = new Set(
  (cohortCoursesRows ?? []).flatMap((cc) => cc.included_module_ids ?? [])
)
// e na linha 145:
if (accessibleModuleIds.size > 0 && !accessibleModuleIds.has(m.id)) return []
```

**Padrão alvo (explícito):** consumir `filterLessonsByCohortAccess` do helper compartilhado. Mesmo padrão usado por `curso/[slug]/page.tsx` e pelos demais caminhos. Sem `size > 0 &&` mágico.

**Helper canônico (`src/lib/access/cohort-filters.ts`):**

```ts
// Single source of truth for "aula X é acessível dado o conjunto de cohort_courses rows do aluno"
// ADR-003 — TGA-1.3

export type CohortCourseAccessRow = {
  course_id: string
  included_module_ids: string[]
  included_lesson_ids: string[]
}

export function filterLessonsByCohortAccess(
  lessons: { id: string; module_id: string }[],
  cohortCourseRows: CohortCourseAccessRow[],
  moduleIdsByCourse: Map<string, string[]>,
  hasGlobalAccess: boolean,
): Set<string> {
  if (hasGlobalAccess) return new Set(lessons.map((l) => l.id))

  const accessibleLessons = new Set<string>()

  for (const cc of cohortCourseRows) {
    const modulesAllowed = cc.included_module_ids.length === 0
      ? new Set(moduleIdsByCourse.get(cc.course_id) ?? [])
      : new Set(cc.included_module_ids)

    const lessonsAllowedSet = cc.included_lesson_ids.length === 0
      ? null
      : new Set(cc.included_lesson_ids)

    for (const l of lessons) {
      if (!modulesAllowed.has(l.module_id)) continue
      if (lessonsAllowedSet && !lessonsAllowedSet.has(l.id)) continue
      accessibleLessons.add(l.id)
    }
  }

  return accessibleLessons
}
```

**Anti-recorrência:**
- O RPC `has_access` é a fonte de verdade autoritativa (RLS). Esta story adiciona defesa em profundidade na camada de aplicação (esconder o item das listagens) — não substitui o RPC.
- Os 4 caminhos do dashboard/meus-cursos/curso já passam por revisão extensa em F9.10/F9.12 (auditorias prévias). Manter os padrões existentes (anti-N+1, server-side, sem leak de `video_id`).
- Defense in depth crítico: mesmo que UI tenha bug e exiba uma aula bloqueada, o RPC vai bloquear `has_access` e o player renderiza `<LockedContent />`. AC8 cobre não-leak via listagem.
- **Concern formal Axilun #2 (inconsistência student pages):** AC4 nivela o padrão acidental de `aula/[lesson-slug]/page.tsx` com a expansão explícita já presente em `curso/[slug]/page.tsx`. Sem isso, o sistema continua com 2 padrões coexistindo e a Epic TGA perde a oportunidade de simplificar.
- **Concern Axilun #3 (semântica módulo=[] ignora aula):** AC11 fixa a invariante no helper. Helper é puro JS, fácil de testar com unit test simples (opcional, não obrigatório nesta story).

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | sites-dev-alpha |
| Iniciado   | — |
| Concluído  | — |
| Branch     | feat-turma-granular-access |

## File List
<!-- Dev preenche ao concluir -->
- `src/lib/access/cohort-filters.ts` (NEW — helper compartilhado)
- `src/app/(academy)/academy/(student)/dashboard/page.tsx` (EDIT)
- `src/app/(academy)/academy/(student)/meus-cursos/page.tsx` (EDIT)
- `src/app/(academy)/academy/(student)/curso/[slug]/page.tsx` (EDIT)
- `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx` (EDIT — AC4: nivelar inconsistência via helper, substituir bloco frágil de `accessibleModuleIds` por expansão explícita)
- `src/app/(academy)/academy/turmas/[slug]/page.tsx` (EDIT condicional — confirmar e documentar)

## QA Results
<!-- QA preenche ao revisar; validação final adversarial em TGA-1.4 -->
