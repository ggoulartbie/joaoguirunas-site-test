---
title: "Story TGA-1.2: Admin UI — seletor de aulas por módulo no CohortForm"
type: story
status: backlog
epic: TGA
complexity: M
agent: sites-dev-alpha + sites-dev-beta
created: 2026-05-25
updated: 2026-05-25
tags: [story, admin, cohorts, ui, server-action]
related:
  - "[[../../decisions/ADR-turma-granular-access]]"
  - "[[TGA-1.1-migration-included-lesson-ids]]"
  - "[[TGA-1.3-student-enforcement-included-lesson-ids]]"
  - "[[TGA-1.4-qa-gate-granular-access]]"
---

# Story TGA-1.2: Admin UI — seletor de aulas por módulo no CohortForm

## Objetivo

Expandir a seção "Cursos Liberados" do `CohortForm.tsx` para um tree-select de 3 níveis (Curso > Módulo > Aula), e estender a server action de save (`saveCohortCourses`) e o `cohortCourseSchema` para persistir `includedLessonIds` em paralelo a `includedModuleIds`.

## Acceptance Criteria

- [ ] **AC1 — Tree-select 3 níveis:** ao expandir um módulo no seletor, lista as aulas do módulo (`lessons` ordenadas por `sort_order`, filtrando `deleted_at is null` e `is_available is not false`) com checkbox individual. UI espelha o padrão visual atual de módulos: chevron + checkbox + label + contagem (ex.: "12 minutos" ou tag de "Em breve" se `is_available=false`).
- [ ] **AC2 — Semântica "lista vazia = todas":** quando todas as aulas de um módulo estão **selecionadas** (todas marcadas), a UI internamente armazena lista vazia (Set vazio interpretado como "todas") — espelha o comportamento atual de módulos via `current = null` quando todas marcadas. Quando o usuário desmarca a primeira aula, o estado passa a Set explícito sem aquela aula.
- [ ] **AC3 — Atalho "Todos/Limpar" por módulo:** botões compactos no header do módulo expandido (espelhando `CohortForm.tsx:828-851` que tem "Todos/Limpar" no curso). "Todos" = limpar lista (= todas), "Limpar" = todas desmarcadas (= bloquear o módulo inteiro, equivalente a remover o módulo).
- [ ] **AC4 — Coerência módulo/aula:** ao desmarcar um módulo (toggle do checkbox de módulo), todas as aulas daquele módulo são removidas de `includedLessonIds` automaticamente. Ao remarcar o módulo, aulas voltam ao estado "todas selecionadas" (lista vazia). Defense: server action faz a mesma normalização antes de inserir.
- [ ] **AC5 — Copy explicativa atualizada:** o parágrafo introdutório da seção (linha ~774-777 de `CohortForm.tsx`) ganha menção ao terceiro nível: "Selecione cursos, módulos e (opcionalmente) aulas específicas. Deixar aulas desmarcadas dentro de um módulo selecionado equivale a liberar todas as aulas daquele módulo."
- [ ] **AC6 — Tipos `CourseForSelector` estendidos:** o tipo `CourseForSelector` em `CohortForm.tsx:8-12` ganha um array `lessons` em cada módulo: `modules: { id; title; lessonCount; lessons: { id; title; sort_order; is_available }[] }[]`. A query em `src/app/(academy)/academy/(admin)/admin/turmas/page.tsx` (e qualquer outra origem do `courses` prop) carrega essas aulas no Server Component que renderiza o form.
- [ ] **AC7 — `cohortCourseSchema` estendido em `actions.ts:18-22` + normalização defensiva:** schema ganha `includedLessonIds: z.array(uuidField()).default([])`. `saveCohortCourses` (linha 62-77) passa `included_lesson_ids: cc.includedLessonIds` no insert. **Normalização defensiva (AC13):** antes do insert, se `cc.includedModuleIds.length === 0`, o código força `cc.includedLessonIds = []` — defense in depth contra UI bug que envie aulas com módulo vazio. Documentar no comentário do schema: "Se módulo é vazio (acesso total), aulas são ignoradas; normalizar para evitar dirty state."
- [ ] **AC8 — `buildFormData` em `CohortForm.tsx:492-535`:** passa `includedLessonIds: lessonSet === null ? [] : Array.from(lessonSet)` simétrico a `includedModuleIds`.
- [ ] **AC9 — Carregar estado inicial em edit:** quando `props.cohortCourses` chega com `included_lesson_ids`, o seletor reconstrói o `Set<string>` por módulo (`null` se vazio = todas; `Set(ids)` caso contrário). Espelha exatamente o padrão de módulos em `CohortForm.tsx:295-302`.
- [ ] **AC10 — Resumo no rodapé da seção:** abaixo dos counts existentes (linha ~904-910), adicionar `N aulas selecionadas explicitamente` quando alguma aula está em estado restritivo. Quando todas as aulas estão livres (lista vazia em todos os módulos), não mostrar o contador (UI atual permanece igual).
- [ ] **AC11 — `pnpm build` (ou `pnpm typecheck` + `pnpm build`) passa.** Sem TS errors, sem erros de runtime na save action.
- [ ] **AC12 — Smoke manual admin:** após pull do branch de TGA-1.1, abrir uma turma existente, marcar uma aula específica dentro de um módulo, salvar, recarregar — estado preservado. Marcar módulo inteiro, salvar, recarregar — `included_lesson_ids = []`. Anti-recorrência manual.
- [ ] **AC13 — Aula só editável quando módulo tem restrição (semântica Axilun #3):** quando o curso tem `includedModuleIds = []` (estado "curso liberado sem restrição de módulo"), o tree-select **não deve permitir** o admin entrar em nível de aula — o terceiro nível fica visualmente oculto OU os checkboxes de aula ficam desabilitados com tooltip "Liberar módulos específicos primeiro para restringir aulas". Razão: nesse cenário a função `has_access` ignora `included_lesson_ids` (cláusula `OR cardinality=0` da branch de módulo já passou); permitir o admin selecionar aulas criaria estado dirty no banco sem efeito real. Implementação canônica: ao salvar (`buildFormData`), se `includedModuleIds.length === 0` para um curso, **forçar** `includedLessonIds = []` independente do que o state local diz — normalização defensiva no client antes da action ser chamada. A action faz a mesma normalização como defense in depth (AC7 ganha essa cláusula).

## Escopo

**IN:**
- Extensão do tree-select em `CohortForm.tsx` para 3 níveis.
- Atualização do tipo `CourseForSelector` e da query Server Component que popula `props.courses`.
- Extensão de `cohortCourseSchema` e `saveCohortCourses` em `actions.ts`.
- `buildFormData` passa novo campo para a action.
- Estado inicial em mode `edit` reconstrói `Set` de aulas.
- Texto explicativo atualizado.
- Counter de "aulas selecionadas explicitamente" no rodapé.

**OUT:**
- Mudanças nas páginas do aluno (TGA-1.3).
- QA adversarial (TGA-1.4).
- Drag-and-drop reordering de aulas no seletor.
- Bulk "selecionar todas as aulas de todos os módulos" (atalhos por módulo são suficientes).
- Migration ou tipos de banco (TGA-1.1).
- Audit log de mudanças em `included_lesson_ids`.
- Validação cruzada com Stripe (granularidade interna não afeta preço da turma).

## Contexto Técnico

**Bloqueado por:** [[TGA-1.1-migration-included-lesson-ids|TGA-1.1]] (precisa da coluna + tipos regenerados antes de TypeScript permitir o build).

**Padrão de referência:** seção "Cursos Liberados" em `CohortForm.tsx:764-913` é o exemplo canônico de tree-select de 2 níveis. Esta story adiciona o 3º nível **dentro do mesmo componente**, sem extrair sub-componente novo (mantém a co-location e a leitura linear do form). Pode-se extrair função `LessonCheckbox` se a complexidade cognitiva passar do limite, mas só se inevitável.

**Estado lógico esperado em `CohortForm.tsx`:**

Hoje:
```ts
const [selectedCourses, setSelectedCourses] = useState<Record<string, Set<string> | null>>(...)
// courseId → Set<moduleId> | null (null = todos os módulos)
```

Depois:
```ts
const [selectedCourses, setSelectedCourses] = useState<Record<string, Set<string> | null>>(...) // mesmo (módulos)
const [selectedLessons, setSelectedLessons] = useState<Record<string, Set<string> | null>>(...)
// moduleId → Set<lessonId> | null (null = todas as aulas)
```

Justificativa: `selectedLessons` indexado por `moduleId` (não `courseId/moduleId`) simplifica `isLessonSelected(moduleId, lessonId)` e o lookup de "todas aulas deste módulo". Persistência: ao montar `buildFormData`, percorre `selectedCourses` e, para cada `courseId`, agrega `lessonSet` de cada `moduleId` selecionado naquele curso.

**Server action (`src/app/(academy)/academy/(admin)/admin/turmas/actions.ts:18-22, 62-77`):**

```ts
const cohortCourseSchema = z.object({
  courseId: uuidField(),
  includedModuleIds: z.array(uuidField()).default([]),
  includedLessonIds: z.array(uuidField()).default([]), // NOVO
})

async function saveCohortCourses(cohortId, cohortCourses) {
  await supabaseAdmin.from('cohort_courses').delete().eq('cohort_id', cohortId)
  if (cohortCourses.length === 0) return
  const { error } = await supabaseAdmin.from('cohort_courses').insert(
    cohortCourses.map((cc, idx) => ({
      cohort_id: cohortId,
      course_id: cc.courseId,
      included_module_ids: cc.includedModuleIds,
      included_lesson_ids: cc.includedLessonIds, // NOVO
      sort_order: idx,
    }))
  )
  if (error) throw new Error('Erro ao salvar cursos da turma: ' + error.message)
}
```

**Query Server Component (origem de `courses` prop):**

O Server Component que renderiza `<CohortForm courses={...} />` (em `src/app/(academy)/academy/(admin)/admin/turmas/page.tsx` para create e `[id]/page.tsx` para edit) atualmente carrega `courses → modules → lessonCount`. Precisa carregar `courses → modules → lessons (id, title, sort_order, is_available)` (filtrando `deleted_at is null`). Manter o `lessonCount` derivado para compatibilidade.

**Anti-recorrência:**
- Tipo `CourseForSelector` é compartilhado entre `page.tsx` (create) e `[id]/page.tsx` (edit). Atualizar nos 2 lugares senão TS quebra um lado.
- A query nova pode causar payload maior (módulos × aulas). Mitigação: a tela é admin, frequência de carga baixa, dataset realista (<200 aulas por curso) — sem paginação por enquanto.
- Caso QA de TGA-1.4 detecte regressão na save (linhas existentes ficarem com `included_lesson_ids = NULL`), checar se a migration TGA-1.1 manteve `NOT NULL DEFAULT '{}'`. A action manda array vazio quando vazio, nunca `null`.
- **Concern Axilun #3 (semântica):** AC13 + normalização defensiva no AC7 garantem que `includedLessonIds` nunca contém UUIDs quando `includedModuleIds = []` — coerente com a tabela verdade ADR-003 e evita dirty state. Defense in depth: UI bloqueia + action normaliza + função RLS já honra naturalmente.

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | sites-dev-alpha (UI) + sites-dev-beta (server action + schema) |
| Iniciado   | — |
| Concluído  | — |
| Branch     | feat-turma-granular-access |

## File List
<!-- Dev preenche ao concluir -->
- `src/app/(academy)/academy/(admin)/admin/turmas/CohortForm.tsx` (EDIT — tree-select 3 níveis + state)
- `src/app/(academy)/academy/(admin)/admin/turmas/actions.ts` (EDIT — schema + saveCohortCourses)
- `src/app/(academy)/academy/(admin)/admin/turmas/page.tsx` (EDIT — query com lessons)
- `src/app/(academy)/academy/(admin)/admin/turmas/[id]/page.tsx` (EDIT — query com lessons)

## QA Results
<!-- QA preenche ao revisar; validação final adversarial em TGA-1.4 -->
