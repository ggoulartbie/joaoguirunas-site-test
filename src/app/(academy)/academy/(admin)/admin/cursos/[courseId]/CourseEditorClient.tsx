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
  'w-full border border-[rgba(255,255,255,0.16)] bg-[#16161a] px-3 py-3 font-mono text-sm text-[#f1f1f3] placeholder-[#84848c] outline-none focus:border-[#ff3a0e] transition-colors'

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
  const [addingLesson, setAddingLesson] = useState(false)
  const [lessonTitle, setLessonTitle] = useState('')
  const [lessonSlug, setLessonSlug] = useState('')
  const [lessonKind, setLessonKind] = useState<string>('VIDEO')
  const [pending, startTransition] = useTransition()

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: mod.id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  function slugify(str: string) {
    return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
  }

  function handleAddLesson(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      await createLesson({ module_id: mod.id, title: lessonTitle, slug: lessonSlug, kind: lessonKind, courseId })
      setLessonTitle('')
      setLessonSlug('')
      setAddingLesson(false)
    })
  }

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, borderRadius: 0 }}
      className={cn(
        'border border-[rgba(255,255,255,0.07)] bg-[#16161a]',
        isDragging && 'opacity-50'
      )}
    >
      {/* Module header */}
      <div className="flex items-center gap-2 px-4 py-3">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab text-[#84848c] opacity-50 transition-opacity hover:opacity-100 active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex flex-1 items-center gap-2 text-left"
        >
          {open
            ? <ChevronDown className="h-3.5 w-3.5 text-[#84848c]" />
            : <ChevronRight className="h-3.5 w-3.5 text-[#84848c]" />
          }
          <span className="font-mono text-xs font-medium text-[#f1f1f3]">{mod.title}</span>
          <span className="font-mono text-[10px] text-[#84848c]">
            {mod.lessons.length} aula{mod.lessons.length !== 1 ? 's' : ''}
          </span>
        </button>
        <Link
          href={`/admin/cursos/${courseId}/modulos/${mod.id}`}
          className="p-1 text-[#84848c] transition-colors hover:text-[#f1f1f3]"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Link>
        <button
          type="button"
          onClick={() => {
            if (confirm(`Remover módulo "${mod.title}"?`)) onDelete(mod.id)
          }}
          className="p-1 text-[#84848c] transition-colors hover:text-[#ff3a0e]"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Lessons list */}
      {open && (
        <div className="border-t border-[rgba(255,255,255,0.07)] pb-1">
          {mod.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-[#1f1f24]"
            >
              <span className={cn(
                'shrink-0 border border-[rgba(255,255,255,0.07)] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider',
                lesson.kind === 'VIDEO' ? 'text-[#c5c5ca]' :
                lesson.kind === 'LIVE' ? 'text-[#c5c5ca]' :
                lesson.kind === 'CODE' ? 'text-[#c5c5ca]' :
                'text-[#84848c]'
              )} style={{ borderRadius: 0 }}>
                {KIND_LABELS[lesson.kind] ?? lesson.kind}
              </span>
              <span className="flex-1 font-[--type-sans] text-xs text-[#c5c5ca]">{lesson.title}</span>
              <Link
                href={`/academy/admin/cursos/${courseId}/aulas/${lesson.id}`}
                className="p-1 text-[#84848c] transition-colors hover:text-[#f1f1f3]"
              >
                <Pencil className="h-3 w-3" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Remover aula "${lesson.title}"?`)) {
                    startTransition(() => deleteLesson(lesson.id, courseId))
                  }
                }}
                className="p-1 text-[#84848c] transition-colors hover:text-[#ff3a0e]"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}

          {/* Add lesson inline form */}
          {addingLesson ? (
            <form onSubmit={handleAddLesson} className="flex flex-wrap items-center gap-2 border-t border-[rgba(255,255,255,0.07)] px-4 py-3">
              <input
                autoFocus
                value={lessonTitle}
                onChange={(e) => { setLessonTitle(e.target.value); setLessonSlug(slugify(e.target.value)) }}
                placeholder="Título da aula"
                required
                className="min-w-0 flex-1 border border-[rgba(255,255,255,0.16)] bg-[#0e0e11] px-3 py-2 font-mono text-xs text-[#f1f1f3] outline-none focus:border-[#ff3a0e]"
                style={{ borderRadius: 0 }}
              />
              <input
                value={lessonSlug}
                onChange={(e) => setLessonSlug(e.target.value)}
                placeholder="slug"
                required
                className="w-36 border border-[rgba(255,255,255,0.16)] bg-[#0e0e11] px-3 py-2 font-mono text-[10px] text-[#84848c] outline-none focus:border-[#ff3a0e]"
                style={{ borderRadius: 0 }}
              />
              <select
                value={lessonKind}
                onChange={(e) => setLessonKind(e.target.value)}
                className="border border-[rgba(255,255,255,0.16)] bg-[#0e0e11] px-2 py-2 font-mono text-[10px] text-[#c5c5ca] outline-none focus:border-[#ff3a0e]"
                style={{ borderRadius: 0 }}
              >
                {Object.entries(KIND_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
              <button
                type="submit"
                disabled={pending}
                className="bg-[#ff3a0e] px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#050507] disabled:opacity-40"
                style={{ borderRadius: 0 }}
              >
                {pending ? '...' : 'Adicionar'}
              </button>
              <button
                type="button"
                onClick={() => setAddingLesson(false)}
                className="font-mono text-[10px] text-[#84848c] transition-colors hover:text-[#c5c5ca]"
              >
                Cancelar
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setAddingLesson(true)}
              className="flex w-full items-center gap-1.5 border-t border-[rgba(255,255,255,0.07)] px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider text-[#84848c] transition-colors hover:text-[#c5c5ca]"
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
    startSave(() => updateCourse(course.id, { title, description: description || null }))
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
            className="mb-1 flex items-center gap-1 font-mono text-[10px] text-[#84848c] transition-colors hover:text-[#c5c5ca]"
          >
            <ArrowLeft className="h-3 w-3" />
            Cursos
          </button>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#84848c]">Admin / Cursos</p>
          <h1 className="font-[--type-display] text-[28px] italic text-[#f1f1f3]">{course.title}</h1>
          <p className="font-mono text-[10px] text-[#84848c]">{course.slug}</p>
        </div>
        <span
          className={cn(
            'shrink-0 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider',
            course.published
              ? 'border-[rgba(255,255,255,0.16)] text-[#f1f1f3]'
              : 'border-[rgba(255,255,255,0.07)] text-[#84848c]'
          )}
          style={{ borderRadius: 0 }}
        >
          {course.published ? 'Publicado' : 'Rascunho'}
        </span>
      </div>

      {/* Course metadata form */}
      <div className="max-w-3xl border border-[rgba(255,255,255,0.07)] bg-[#0e0e11] p-6" style={{ borderRadius: 0 }}>
        <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-[#84848c]">Informações do Curso</p>
        <form onSubmit={handleSaveCourse} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-[#84848c]">Título</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
                style={{ borderRadius: 0 }}
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-[#84848c]">Descrição</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição breve..."
                className={inputClass}
                style={{ borderRadius: 0 }}
              />
            </div>
          </div>
          <div className="flex justify-end border-t border-[rgba(255,255,255,0.07)] pt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#ff3a0e] px-5 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#050507] transition-opacity hover:opacity-90 disabled:opacity-40"
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
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#84848c]">
            Módulos ({modules.length})
          </p>
          <button
            type="button"
            onClick={() => setAddingModule(true)}
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#84848c] transition-colors hover:text-[#c5c5ca]"
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
            <p className="font-mono text-xs text-[#84848c]">Nenhum módulo ainda — adicione o primeiro</p>
          </div>
        )}

        {/* Add module inline form */}
        {addingModule && (
          <form
            onSubmit={handleAddModule}
            className="flex flex-wrap items-center gap-2 border border-[rgba(255,255,255,0.07)] bg-[#16161a] p-4"
            style={{ borderRadius: 0 }}
          >
            <input
              autoFocus
              value={modTitle}
              onChange={(e) => { setModTitle(e.target.value); setModSlug(slugify(e.target.value)) }}
              placeholder="Título do módulo"
              required
              className="min-w-0 flex-1 border border-[rgba(255,255,255,0.16)] bg-[#0e0e11] px-3 py-2 font-mono text-xs text-[#f1f1f3] outline-none focus:border-[#ff3a0e]"
              style={{ borderRadius: 0 }}
            />
            <input
              value={modSlug}
              onChange={(e) => setModSlug(e.target.value)}
              placeholder="slug"
              required
              className="w-40 border border-[rgba(255,255,255,0.16)] bg-[#0e0e11] px-3 py-2 font-mono text-[10px] text-[#84848c] outline-none focus:border-[#ff3a0e]"
              style={{ borderRadius: 0 }}
            />
            <button
              type="submit"
              disabled={saving}
              className="bg-[#ff3a0e] px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#050507] disabled:opacity-40"
              style={{ borderRadius: 0 }}
            >
              {saving ? '...' : 'Adicionar'}
            </button>
            <button
              type="button"
              onClick={() => setAddingModule(false)}
              className="font-mono text-[10px] text-[#84848c] transition-colors hover:text-[#c5c5ca]"
            >
              Cancelar
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
