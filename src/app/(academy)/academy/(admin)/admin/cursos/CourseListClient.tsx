'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { BookOpen, Eye, EyeOff, Pencil, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toggleCoursePublished, deleteCourse } from './actions'
import type { Database } from '@/types/database'

type CourseRow = Pick<
  Database['public']['Tables']['courses']['Row'],
  'id' | 'slug' | 'title' | 'description' | 'published' | 'sort_order' | 'cover_image_url' | 'created_at'
>

export function CourseListClient({ initialCourses }: { initialCourses: CourseRow[] }) {
  const [courses, setCourses] = useState(initialCourses)
  const [search, setSearch] = useState('')
  const [pending, startTransition] = useTransition()

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase())
  )

  function handleToggle(id: string, published: boolean) {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, published } : c)))
    startTransition(() => toggleCoursePublished(id, published))
  }

  function handleDelete(id: string) {
    if (!confirm('Remover curso? Essa ação pode ser revertida no banco.')) return
    setCourses((prev) => prev.filter((c) => c.id !== id))
    startTransition(() => deleteCourse(id))
  }

  return (
    <div className="space-y-4">
      <input
        type="search"
        placeholder="Buscar por título ou slug..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-xs text-white/80 placeholder-white/20 outline-none focus:border-white/20"
      />

      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <BookOpen className="h-8 w-8 text-white/20" />
          <p className="font-mono text-xs text-white/30">
            {search ? 'Nenhum curso encontrado.' : 'Nenhum curso criado ainda.'}
          </p>
        </div>
      )}

      <div className="divide-y divide-white/5">
        {filtered.map((course) => (
          <div
            key={course.id}
            className={cn(
              'flex items-center justify-between gap-4 py-4',
              pending && 'opacity-60'
            )}
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 bg-white/[0.03]">
                <BookOpen className="h-4 w-4 text-white/40" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-mono text-sm font-medium text-white/90">
                  {course.title}
                </p>
                <p className="font-mono text-[10px] text-white/30">{course.slug}</p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={() => handleToggle(course.id, !course.published)}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors',
                  course.published
                    ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                    : 'bg-white/5 text-white/30 hover:bg-white/10'
                )}
              >
                {course.published ? (
                  <><Eye className="h-3 w-3" /> Publicado</>
                ) : (
                  <><EyeOff className="h-3 w-3" /> Rascunho</>
                )}
              </button>

              <Link
                href={`/admin/cursos/${course.id}`}
                className="flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/40 transition-colors hover:text-white/80"
              >
                <Pencil className="h-3 w-3" />
                Editar
              </Link>

              <button
                onClick={() => handleDelete(course.id)}
                className="flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-red-400/50 transition-colors hover:text-red-400"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
