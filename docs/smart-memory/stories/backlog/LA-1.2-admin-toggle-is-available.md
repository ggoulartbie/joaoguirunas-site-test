---
title: "Story LA-1.2: Admin toggle is_available em CourseEditorClient"
type: story
status: backlog
epic: LA
complexity: M
agent: sites-dev-alpha + sites-dev-beta
created: 2026-05-17
updated: 2026-05-17
tags: [story, admin, frontend, server-action, lessons]
related: ["[[LA-1.1-migration-is-available]]", "[[LA-1.3-student-badge-em-breve]]"]
---

# Story LA-1.2: Admin toggle is_available em CourseEditorClient

## Objetivo
Adicionar um toggle de disponibilidade (ícone `Eye` / `EyeOff` do lucide-react) em cada linha de aula no `CourseEditorClient`, com server action `toggleLessonAvailable` espelhando o padrão de `toggleCoursePublished`. O admin pode marcar/desmarcar a aula como "Em breve" sem entrar no editor de aula.

## Acceptance Criteria
- [ ] AC1: Server action `toggleLessonAvailable(lessonId, courseId, isAvailable: boolean)` em `src/app/(academy)/academy/(admin)/admin/cursos/actions.ts` chama `requireAdmin()`, faz `UPDATE lessons SET is_available = $isAvailable WHERE id = $lessonId` via `supabaseAdmin` e revalida `/academy/admin/cursos/${courseId}` e `/academy/curso/${courseSlug}` (path do aluno). Erros do Supabase são lançados como `Error(message)` (padrão da action).
- [ ] AC2: `SortableLesson` em `CourseEditorClient.tsx` ganha um botão `Eye`/`EyeOff` (lucide-react) entre o título e o botão `Pencil`. `is_available=true` mostra `Eye` (cor `bone-mute`); `is_available=false` mostra `EyeOff` (cor `ember` para sinalizar estado especial). Tooltip via `title`: "Marcar como em breve" / "Marcar como disponível".
- [ ] AC3: Click no toggle dispara `startTransition` com `toggleLessonAvailable`, atualizando o estado local `lessons` otimisticamente. Em caso de erro do server, faz rollback do estado local e exibe mensagem em `console.error` (sem toast nesta story — manter UX consistente com `deleteLesson` que também não tem toast).
- [ ] AC4: A criação de aula (`createLesson` + `setLessons` em `SortableModule.handleAddLesson`) inicializa `is_available: true` no objeto local, mantendo paridade com o default do DB.
- [ ] AC5: `pnpm build` passa. Aulas existentes (todas `is_available=true` após LA-1.1) renderizam com `Eye`. Toggle persiste após reload da página (`SELECT lessons` no Server Component carrega o valor real do DB).

## Escopo

**IN:**
- Nova server action em `actions.ts`.
- Botão toggle no `SortableLesson` (lucide `Eye`/`EyeOff`).
- Otimistic update + rollback no `SortableLesson` / `SortableModule`.
- Atualizar criação de aula (`handleAddLesson`) para incluir `is_available: true` no estado local.

**OUT:**
- Badge/bloqueio no lado do aluno (LA-1.3).
- Bulk-toggle (selecionar várias e marcar todas como em breve).
- Histórico de quando a aula foi marcada como em breve (sem coluna nova de auditoria nesta story).
- Toast/notificação visual de sucesso. Manter consistente com o padrão atual (`deleteLesson`, `reorderLessons` também não notificam).
- Confirmação modal (`confirm()`). A ação é reversível com 1 clique; não há fricção necessária.
- Toggle no editor individual da aula (`/cursos/[courseId]/aulas/[lessonId]`). Esta story foca no editor do curso (lista de aulas). Pode ser follow-up.

## Contexto Técnico

**Arquivos afetados:**
- `src/app/(academy)/academy/(admin)/admin/cursos/actions.ts` — nova função `toggleLessonAvailable`.
- `src/app/(academy)/academy/(admin)/admin/cursos/[courseId]/CourseEditorClient.tsx` — botão toggle em `SortableLesson`; estado local sincronizado.

**Server action canônica (espelho de `toggleCoursePublished` em `actions.ts:46-55`):**
```ts
export async function toggleLessonAvailable(
  lessonId: string,
  courseId: string,
  isAvailable: boolean
) {
  await requireAdmin()
  const { error } = await supabaseAdmin
    .from('lessons')
    .update({ is_available: isAvailable })
    .eq('id', lessonId)

  if (error) throw new Error(error.message)
  revalidatePath(`/academy/admin/cursos/${courseId}`)
  // revalidatePath do aluno requer o courseSlug — buscar via course_id se necessário,
  // ou aceitar invalidação por TTL/refresh manual (ver decisão abaixo).
}
```

**Decisão sobre `revalidatePath` do aluno:** o `courseSlug` não está disponível em `actions.ts` sem query extra. Duas opções:
1. **Adicionar parâmetro `courseSlug`** à signature — preferido (1 string extra, simples).
2. **Buscar `slug` do course** dentro da action — 1 query a mais por toggle.

**Recomendação:** opção 1 (passar `courseSlug` do client). O cliente já tem `course.slug` no escopo.

**Trecho do `SortableLesson` (`CourseEditorClient.tsx:53-110`) — adicionar entre `title` e botão `Pencil`:**
```tsx
import { Eye, EyeOff } from 'lucide-react'

// dentro do SortableLesson:
<button
  type="button"
  onClick={onToggleAvailable}
  className="p-1 transition-colors"
  style={{ color: lesson.is_available ? 'var(--bone-mute)' : 'var(--ember)' }}
  title={lesson.is_available ? 'Marcar como em breve' : 'Marcar como disponível'}
>
  {lesson.is_available ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
</button>
```

**Estado local com otimistic + rollback** (em `SortableModule` ou no parent que segura `lessons`):
```tsx
function handleToggleAvailable(lessonId: string, current: boolean) {
  const next = !current
  setLessons((prev) => prev.map((l) => l.id === lessonId ? { ...l, is_available: next } : l))
  startTransition(async () => {
    try {
      await toggleLessonAvailable(lessonId, courseId, courseSlug, next)
    } catch (err) {
      // Rollback
      setLessons((prev) => prev.map((l) => l.id === lessonId ? { ...l, is_available: current } : l))
      console.error('[toggleLessonAvailable] falhou:', err)
    }
  })
}
```

**Anti-recorrência Story 2.2 (FM-2.2):** otimistic update SEM rollback engoliu erros de server. Aqui o rollback está explícito no AC3.

**Helper de slug:** `ensureUniqueSlugInCourse` (`src/lib/lessons/slug.ts`) é god node recente — **não alterar nesta story**. Toggle de `is_available` não toca em slug.

**Dependência:** LA-1.1 (migration + tipos) é PRÉ-REQUISITO. Sem `is_available` em `LessonRow`, TypeScript bloqueia o build. Não iniciar antes de LA-1.1 ter status `done`.

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | — |
| Iniciado   | — |
| Concluído  | — |
| Branch     | — |

## File List
<!-- Dev preenche ao concluir -->

## QA Results
<!-- QA preenche ao revisar -->
