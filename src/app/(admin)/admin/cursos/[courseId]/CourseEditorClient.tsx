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
import { GripVertical, Plus, Pencil, Trash2, ChevronDown, ChevronRight } from 'lucide-react'
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
      style={style}
      className={cn('border border-white/10 bg-white/[0.02]', isDragging && 'opacity-50')}
    >
      {/* Module header */}
      <div className="flex items-center gap-2 p-3">
        <button type="button" {...attributes} {...listeners} className="cursor-grab text-white/20 hover:text-white/50 active:cursor-grabbing">
          <GripVertical className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => setOpen((o) => !o)} className="flex flex-1 items-center gap-2 text-left">
          {open ? <ChevronDown className="h-3.5 w-3.5 text-white/30" /> : <ChevronRight className="h-3.5 w-3.5 text-white/30" />}
          <span className="font-mono text-xs font-medium text-white/80">{mod.title}</span>
          <span className="font-mono text-[10px] text-white/20">{mod.lessons.length} aula{mod.lessons.length !== 1 ? 's' : ''}</span>
        </button>
        <Link
          href={`/admin/cursos/${courseId}/modulos/${mod.id}`}
          className="p-1 text-white/20 transition-colors hover:text-white/60"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Link>
        <button
          type="button"
          onClick={() => {
            if (confirm(`Remover módulo "${mod.title}"?`)) onDelete(mod.id)
          }}
          className="p-1 text-white/20 transition-colors hover:text-red-400"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Lessons list */}
      {open && (
        <div className="border-t border-white/5 pb-2">
          {mod.lessons.map((lesson) => (
            <div key={lesson.id} className="flex items-center gap-2 px-4 py-2 hover:bg-white/[0.02]">
              <span className={cn(
                'shrink-0 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider',
                lesson.kind === 'VIDEO' ? 'bg-blue-500/10 text-blue-400' :
                lesson.kind === 'LIVE' ? 'bg-green-500/10 text-green-400' :
                lesson.kind === 'CODE' ? 'bg-yellow-500/10 text-yellow-400' :
                'bg-white/5 text-white/30'
              )}>
                {KIND_LABELS[lesson.kind] ?? lesson.kind}
              </span>
              <span className="flex-1 font-mono text-xs text-white/60">{lesson.title}</span>
              <Link
                href={`/admin/cursos/${courseId}/aulas/${lesson.id}`}
                className="font-mono text-[10px] text-white/20 transition-colors hover:text-white/60"
              >
                Editar
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Remover aula "${lesson.title}"?`)) {
                    startTransition(() => deleteLesson(lesson.id, courseId))
                  }
                }}
                className="text-white/20 transition-colors hover:text-red-400"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}

          {/* Add lesson inline form */}
          {addingLesson ? (
            <form onSubmit={handleAddLesson} className="flex flex-wrap items-center gap-2 px-4 py-2">
              <input
                autoFocus
                value={lessonTitle}
                onChange={(e) => { setLessonTitle(e.target.value); setLessonSlug(slugify(e.target.value)) }}
                placeholder="Título da aula"
                required
                className="min-w-0 flex-1 border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/70 outline-none"
              />
              <input
                value={lessonSlug}
                onChange={(e) => setLessonSlug(e.target.value)}
                placeholder="slug"
                required
                className="w-36 border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] text-white/50 outline-none"
              />
              <select
                value={lessonKind}
                onChange={(e) => setLessonKind(e.target.value)}
                className="border border-white/10 bg-[#0C0C12] px-2 py-1.5 font-mono text-[10px] text-white/60 outline-none"
              >
                {Object.entries(KIND_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
              <button type="submit" disabled={pending} className="bg-[#FF3A0E] px-3 py-1.5 font-mono text-[10px] text-white disabled:opacity-40">
                {pending ? '...' : 'Adicionar'}
              </button>
              <button type="button" onClick={() => setAddingLesson(false)} className="font-mono text-[10px] text-white/30 hover:text-white/60">
                Cancelar
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setAddingLesson(true)}
              className="flex w-full items-center gap-1.5 px-4 py-2 font-mono text-[10px] text-white/25 transition-colors hover:text-white/50"
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
      setModules((prev) => [...prev, { ...{ id: mod.id, course_id: course.id, title: modTitle, slug: modSlug, description: null, sort_order: prev.length, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), deleted_at: null }, lessons: [] }])
      setModTitle('')
      setModSlug('')
      setAddingModule(false)
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <button type="button" onClick={() => router.push('/admin/cursos')} className="mb-2 font-mono text-[10px] text-white/30 transition-colors hover:text-white/60">
            ← Cursos
          </button>
          <h1 className="font-mono text-lg font-semibold uppercase tracking-widest text-white/90">
            {course.title}
          </h1>
          <p className="mt-1 font-mono text-[10px] text-white/30">{course.slug}</p>
        </div>
        <span className={cn(
          'shrink-0 px-2 py-1 font-mono text-[10px] uppercase tracking-wider',
          course.published ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-white/30'
        )}>
          {course.published ? 'Publicado' : 'Rascunho'}
        </span>
      </div>

      {/* Course metadata form */}
      <form onSubmit={handleSaveCourse} className="space-y-3 border border-white/10 bg-white/[0.02] p-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">Informações do Curso</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="font-mono text-[10px] text-white/30">Título</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-white/10 bg-transparent px-3 py-2 font-mono text-sm text-white/80 outline-none focus:border-white/20"
            />
          </div>
          <div className="space-y-1">
            <label className="font-mono text-[10px] text-white/30">Descrição</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-white/10 bg-transparent px-3 py-2 font-mono text-sm text-white/80 outline-none focus:border-white/20"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="bg-[#FF3A0E] px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white disabled:opacity-40">
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>

      {/* Modules with drag-and-drop */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
            Módulos ({modules.length})
          </p>
          <button
            type="button"
            onClick={() => setAddingModule(true)}
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-white/30 transition-colors hover:text-white/70"
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
          <div className="py-8 text-center">
            <p className="font-mono text-xs text-white/20">Nenhum módulo ainda — adicione o primeiro</p>
          </div>
        )}

        {/* Add module inline form */}
        {addingModule && (
          <form onSubmit={handleAddModule} className="flex flex-wrap items-center gap-2 border border-white/10 bg-white/[0.02] p-3">
            <input
              autoFocus
              value={modTitle}
              onChange={(e) => { setModTitle(e.target.value); setModSlug(slugify(e.target.value)) }}
              placeholder="Título do módulo"
              required
              className="min-w-0 flex-1 border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/70 outline-none"
            />
            <input
              value={modSlug}
              onChange={(e) => setModSlug(e.target.value)}
              placeholder="slug"
              required
              className="w-40 border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] text-white/50 outline-none"
            />
            <button type="submit" disabled={saving} className="bg-[#FF3A0E] px-3 py-1.5 font-mono text-[10px] text-white disabled:opacity-40">
              {saving ? '...' : 'Adicionar'}
            </button>
            <button type="button" onClick={() => setAddingModule(false)} className="font-mono text-[10px] text-white/30 hover:text-white/60">
              Cancelar
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
