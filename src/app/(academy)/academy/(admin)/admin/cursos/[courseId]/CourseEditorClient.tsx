'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Plus, Pencil, Trash2, ChevronDown, ChevronRight, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  updateCourse,
  createModule,
  deleteModule,
  reorderModules,
  createLesson,
  deleteLesson,
  updateModule,
  reorderLessons,
} from '../actions'
import type { Database } from '@/types/database'
import Link from 'next/link'

type CourseRow = Database['public']['Tables']['courses']['Row']
type ModuleRow = Database['public']['Tables']['modules']['Row']
type LessonRow = Database['public']['Tables']['lessons']['Row']
type ModuleWithLessons = ModuleRow & { lessons: LessonRow[] }

const KIND_LABELS: Record<string, string> = {
  VIDEO: 'Vídeo',
  LIVE: 'Ao Vivo',
  IN_PERSON: 'Presencial',
  CODE: 'Código',
  READING: 'Leitura',
}

const inputClass =
  'w-full border border-[rgba(255,255,255,0.16)] bg-[var(--ink-2)] px-3 py-3 font-mono text-sm text-[var(--bone)] placeholder-[var(--bone-mute)] outline-none focus:border-[var(--ember)] transition-colors'

// ── Sortable Lesson Row ───────────────────────────────────────────────────────

function SortableLesson({
  lesson,
  courseId,
  onDelete,
}: {
  lesson: LessonRow
  courseId: string
  onDelete: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: lesson.id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-[var(--ink-3)]',
        isDragging && 'opacity-50'
      )}
    >
      <button
        type="button"
        suppressHydrationWarning
        {...attributes}
        {...listeners}
        className="cursor-grab text-[var(--bone-mute)] opacity-30 transition-opacity hover:opacity-80 active:cursor-grabbing"
      >
        <GripVertical className="h-3.5 w-3.5" />
      </button>
      <span
        className={cn(
          'shrink-0 border border-[rgba(255,255,255,0.07)] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider',
          lesson.kind === 'VIDEO' || lesson.kind === 'LIVE' || lesson.kind === 'CODE'
            ? 'text-[var(--bone-dim)]'
            : 'text-[var(--bone-mute)]'
        )}
        style={{ borderRadius: 0 }}
      >
        {KIND_LABELS[lesson.kind] ?? lesson.kind}
      </span>
      <span className="flex-1 font-[--type-sans] text-xs text-[var(--bone-dim)]">{lesson.title}</span>
      <Link
        href={`/academy/admin/cursos/${courseId}/aulas/${lesson.id}`}
        className="p-1 text-[var(--bone-mute)] transition-colors hover:text-[var(--bone)]"
      >
        <Pencil className="h-3 w-3" />
      </Link>
      <button
        type="button"
        onClick={onDelete}
        className="p-1 text-[var(--bone-mute)] transition-colors hover:text-[var(--ember)]"
      >
        <Trash2 className="h-3 w-3" />
      </button>
    </div>
  )
}

// ── Sortable Module Row ───────────────────────────────────────────────────────

function SortableModule({
  mod,
  courseId,
  onDelete,
}: {
  mod: ModuleWithLessons
  courseId: string
  onDelete: (id: string) => void
}) {
  const [open, setOpen] = useState(true)
  const [editingTitle, setEditingTitle] = useState(false)
  const [titleDraft, setTitleDraft] = useState(mod.title)
  const [addingLesson, setAddingLesson] = useState(false)
  const [lessonTitle, setLessonTitle] = useState('')
  const [lessonSlug, setLessonSlug] = useState('')
  const [lessonKind, setLessonKind] = useState<string>('VIDEO')
  const [pending, startTransition] = useTransition()
  const [lessonError, setLessonError] = useState<string | null>(null)
  const [lessons, setLessons] = useState(mod.lessons)
  const lessonSensors = useSensors(useSensor(PointerSensor))

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: mod.id })

  function handleLessonDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = lessons.findIndex((l) => l.id === active.id)
    const newIndex = lessons.findIndex((l) => l.id === over.id)
    const reordered = arrayMove(lessons, oldIndex, newIndex)
    setLessons(reordered)
    startTransition(() => reorderLessons(mod.id, courseId, reordered.map((l) => l.id)))
  }
  const style = { transform: CSS.Transform.toString(transform), transition }

  function slugify(str: string) {
    return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
  }

  function handleAddLesson(e: React.FormEvent) {
    e.preventDefault()
    setLessonError(null)
    startTransition(async () => {
      try {
        await createLesson({ module_id: mod.id, title: lessonTitle, slug: lessonSlug, kind: lessonKind, courseId })
        setLessonTitle('')
        setLessonSlug('')
        setAddingLesson(false)
      } catch (err) {
        setLessonError(err instanceof Error ? err.message : 'Erro ao criar aula')
      }
    })
  }

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, borderRadius: 0 }}
      className={cn(
        'border border-[rgba(255,255,255,0.07)] bg-[var(--ink-2)]',
        isDragging && 'opacity-50'
      )}
    >
      {/* Module header */}
      <div className="flex items-center gap-2 px-4 py-3">
        <button
          type="button"
          suppressHydrationWarning
          {...attributes}
          {...listeners}
          className="cursor-grab text-[var(--bone-mute)] opacity-50 transition-opacity hover:opacity-100 active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex flex-1 items-center gap-2 text-left"
        >
          {open
            ? <ChevronDown className="h-3.5 w-3.5 text-[var(--bone-mute)]" />
            : <ChevronRight className="h-3.5 w-3.5 text-[var(--bone-mute)]" />
          }
          {editingTitle ? (
            <input
              autoFocus
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={() => {
                const trimmed = titleDraft.trim()
                if (trimmed && trimmed !== mod.title) {
                  startTransition(async () => {
                    await updateModule(mod.id, courseId, { title: trimmed, slug: slugify(trimmed) })
                  })
                }
                setEditingTitle(false)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.currentTarget.blur()
                if (e.key === 'Escape') { setTitleDraft(mod.title); setEditingTitle(false) }
              }}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 bg-transparent font-mono text-xs font-medium text-[var(--bone)] outline-none border-b border-[var(--ember)]"
            />
          ) : (
            <span className="font-mono text-xs font-medium text-[var(--bone)]">{mod.title}</span>
          )}
          <span className="font-mono text-[10px] text-[var(--bone-mute)]">
            {mod.lessons.length} aula{mod.lessons.length !== 1 ? 's' : ''}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setEditingTitle(true)}
          className="p-1 text-[var(--bone-mute)] transition-colors hover:text-[var(--bone)]"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => {
            if (confirm(`Remover módulo "${mod.title}"?`)) onDelete(mod.id)
          }}
          className="p-1 text-[var(--bone-mute)] transition-colors hover:text-[var(--ember)]"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Lessons list */}
      {open && (
        <div className="border-t border-[rgba(255,255,255,0.07)] pb-1">
          <DndContext sensors={lessonSensors} collisionDetection={closestCenter} onDragEnd={handleLessonDragEnd}>
            <SortableContext items={lessons.map((l) => l.id)} strategy={verticalListSortingStrategy}>
              {lessons.map((lesson) => (
                <SortableLesson
                  key={lesson.id}
                  lesson={lesson}
                  courseId={courseId}
                  onDelete={() => {
                    if (confirm(`Remover aula "${lesson.title}"?`)) {
                      setLessons((prev) => prev.filter((l) => l.id !== lesson.id))
                      startTransition(() => deleteLesson(lesson.id, courseId))
                    }
                  }}
                />
              ))}
            </SortableContext>
          </DndContext>

          {/* Add lesson inline form */}
          {addingLesson ? (
            <form onSubmit={handleAddLesson} className="flex flex-wrap items-center gap-2 border-t border-[rgba(255,255,255,0.07)] px-4 py-3">
              <input
                autoFocus
                value={lessonTitle}
                onChange={(e) => { setLessonTitle(e.target.value); setLessonSlug(slugify(e.target.value)) }}
                placeholder="Título da aula"
                required
                className="min-w-0 flex-1 border border-[rgba(255,255,255,0.16)] bg-[var(--ink)] px-3 py-2 font-mono text-xs text-[var(--bone)] outline-none focus:border-[var(--ember)]"
                style={{ borderRadius: 0 }}
              />
              <input
                value={lessonSlug}
                onChange={(e) => setLessonSlug(e.target.value)}
                placeholder="slug"
                required
                className="w-36 border border-[rgba(255,255,255,0.16)] bg-[var(--ink)] px-3 py-2 font-mono text-[10px] text-[var(--bone-mute)] outline-none focus:border-[var(--ember)]"
                style={{ borderRadius: 0 }}
              />
              <select
                value={lessonKind}
                onChange={(e) => setLessonKind(e.target.value)}
                className="border border-[rgba(255,255,255,0.16)] bg-[var(--ink)] px-2 py-2 font-mono text-[10px] text-[var(--bone-dim)] outline-none focus:border-[var(--ember)]"
                style={{ borderRadius: 0 }}
              >
                {Object.entries(KIND_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
              <button
                type="submit"
                disabled={pending}
                className="bg-[var(--ember)] px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--void)] disabled:opacity-40"
                style={{ borderRadius: 0 }}
              >
                {pending ? '...' : 'Adicionar'}
              </button>
              <button
                type="button"
                onClick={() => setAddingLesson(false)}
                className="font-mono text-[10px] text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]"
              >
                Cancelar
              </button>
              {lessonError && (
                <p className="w-full font-mono text-[10px] text-red-400">{lessonError}</p>
              )}
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setAddingLesson(true)}
              className="flex w-full items-center gap-1.5 border-t border-[rgba(255,255,255,0.07)] px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]"
            >
              <Plus className="h-3 w-3" /> Nova Aula
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main Editor ───────────────────────────────────────────────────────────────

export function CourseEditorClient({
  course,
  initialModules,
}: {
  course: CourseRow
  initialModules: ModuleWithLessons[]
}) {
  const router = useRouter()
  const [modules, setModules] = useState(initialModules)
  const [title, setTitle] = useState(course.title)
  const [description, setDescription] = useState(course.description ?? '')
  const [saving, startSave] = useTransition()
  const [courseError, setCourseError] = useState<string | null>(null)
  const [courseSaved, setCourseSaved] = useState(false)
  const [addingModule, setAddingModule] = useState(false)
  const [modTitle, setModTitle] = useState('')
  const [modSlug, setModSlug] = useState('')

  const sensors = useSensors(useSensor(PointerSensor))

  function slugify(str: string) {
    return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = modules.findIndex((m) => m.id === active.id)
    const newIndex = modules.findIndex((m) => m.id === over.id)
    const reordered = arrayMove(modules, oldIndex, newIndex)
    setModules(reordered)
    startSave(() => reorderModules(course.id, reordered.map((m) => m.id)))
  }

  function handleSaveCourse(e: React.FormEvent) {
    e.preventDefault()
    setCourseError(null)
    setCourseSaved(false)
    startSave(async () => {
      try {
        await updateCourse(course.id, { title, description: description || null })
        setCourseSaved(true)
        setTimeout(() => setCourseSaved(false), 2000)
      } catch (err) {
        setCourseError(err instanceof Error ? err.message : 'Erro ao salvar curso')
      }
    })
  }

  function handleDeleteModule(id: string) {
    setModules((prev) => prev.filter((m) => m.id !== id))
    startSave(() => deleteModule(id, course.id))
  }

  async function handleAddModule(e: React.FormEvent) {
    e.preventDefault()
    startSave(async () => {
      const mod = await createModule({ course_id: course.id, title: modTitle, slug: modSlug, description: null })
      setModules((prev) => [
        ...prev,
        {
          id: mod.id,
          course_id: course.id,
          title: modTitle,
          slug: modSlug,
          description: null,
          cover_image_url: null,
          sort_order: prev.length,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
          lessons: [],
        },
      ])
      setModTitle('')
      setModSlug('')
      setAddingModule(false)
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.07)] pb-4">
        <div>
          <button
            type="button"
            onClick={() => router.push('/academy/admin/cursos')}
            className="mb-1 flex items-center gap-1 font-mono text-[10px] text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]"
          >
            <ArrowLeft className="h-3 w-3" />
            Cursos
          </button>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Admin / Cursos</p>
          <h1 className="font-[--type-display] text-[28px] italic text-[var(--bone)]">{course.title}</h1>
          <p className="font-mono text-[10px] text-[var(--bone-mute)]">{course.slug}</p>
        </div>
        <span
          className={cn(
            'shrink-0 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider',
            course.published
              ? 'border-[rgba(255,255,255,0.16)] text-[var(--bone)]'
              : 'border-[rgba(255,255,255,0.07)] text-[var(--bone-mute)]'
          )}
          style={{ borderRadius: 0 }}
        >
          {course.published ? 'Publicado' : 'Rascunho'}
        </span>
      </div>

      {/* Course metadata form */}
      <div className="max-w-3xl border border-[rgba(255,255,255,0.07)] bg-[var(--ink)] p-6" style={{ borderRadius: 0 }}>
        <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Informações do Curso</p>
        <form onSubmit={handleSaveCourse} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Título</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
                style={{ borderRadius: 0 }}
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Descrição</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição breve..."
                className={inputClass}
                style={{ borderRadius: 0 }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.07)] pt-4">
            <div>
              {courseError && <p className="font-mono text-[10px] text-red-400">{courseError}</p>}
              {courseSaved && <p className="font-mono text-[10px] text-emerald-400">Salvo</p>}
            </div>
            <button
              type="submit"
              disabled={saving}
              className="bg-[var(--ember)] px-5 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--void)] transition-opacity hover:opacity-90 disabled:opacity-40"
              style={{ borderRadius: 0 }}
            >
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>

      {/* Modules with drag-and-drop */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
            Módulos ({modules.length})
          </p>
          <button
            type="button"
            onClick={() => setAddingModule(true)}
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]"
          >
            <Plus className="h-3 w-3" /> Novo Módulo
          </button>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={modules.map((m) => m.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {modules.map((mod) => (
                <SortableModule key={mod.id} mod={mod} courseId={course.id} onDelete={handleDeleteModule} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {modules.length === 0 && !addingModule && (
          <div className="border border-[rgba(255,255,255,0.07)] py-10 text-center" style={{ borderRadius: 0 }}>
            <p className="font-mono text-xs text-[var(--bone-mute)]">Nenhum módulo ainda — adicione o primeiro</p>
          </div>
        )}

        {/* Add module inline form */}
        {addingModule && (
          <form
            onSubmit={handleAddModule}
            className="flex flex-wrap items-center gap-2 border border-[rgba(255,255,255,0.07)] bg-[var(--ink-2)] p-4"
            style={{ borderRadius: 0 }}
          >
            <input
              autoFocus
              value={modTitle}
              onChange={(e) => { setModTitle(e.target.value); setModSlug(slugify(e.target.value)) }}
              placeholder="Título do módulo"
              required
              className="min-w-0 flex-1 border border-[rgba(255,255,255,0.16)] bg-[var(--ink)] px-3 py-2 font-mono text-xs text-[var(--bone)] outline-none focus:border-[var(--ember)]"
              style={{ borderRadius: 0 }}
            />
            <input
              value={modSlug}
              onChange={(e) => setModSlug(e.target.value)}
              placeholder="slug"
              required
              className="w-40 border border-[rgba(255,255,255,0.16)] bg-[var(--ink)] px-3 py-2 font-mono text-[10px] text-[var(--bone-mute)] outline-none focus:border-[var(--ember)]"
              style={{ borderRadius: 0 }}
            />
            <button
              type="submit"
              disabled={saving}
              className="bg-[var(--ember)] px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--void)] disabled:opacity-40"
              style={{ borderRadius: 0 }}
            >
              {saving ? '...' : 'Adicionar'}
            </button>
            <button
              type="button"
              onClick={() => setAddingModule(false)}
              className="font-mono text-[10px] text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]"
            >
              Cancelar
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
