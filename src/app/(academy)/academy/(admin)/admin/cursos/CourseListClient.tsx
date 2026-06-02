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
        className="w-full border border-[rgba(255,255,255,0.16)] bg-[var(--ink-2)] px-4 py-3 font-mono text-xs text-[var(--bone)] placeholder-[var(--bone-mute)] outline-none focus:border-[var(--ember)]"
        style={{ borderRadius: 0 }}
      />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <BookOpen className="h-8 w-8 text-[var(--bone-mute)]" />
          <p className="font-mono text-xs text-[var(--bone-mute)]">
            {search ? 'Nenhum curso encontrado.' : 'Nenhum curso criado ainda.'}
          </p>
        </div>
      ) : (
        <table className="w-full" style={{ borderRadius: 0 }}>
          <thead className="bg-[var(--ink-2)]">
            <tr>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)]">Curso</th>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)]">Slug</th>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)]">Status</th>
              <th className="px-4 py-3 text-right font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)]">Ações</th>
            </tr>
          </thead>
          <tbody className={cn(pending && 'opacity-60')}>
            {filtered.map((course) => (
              <tr
                key={course.id}
                className="border-b border-[rgba(255,255,255,0.07)] transition-colors hover:bg-[rgba(5,5,7,0.4)]"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[rgba(255,255,255,0.07)] bg-[var(--ink-2)]">
                      <BookOpen className="h-3.5 w-3.5 text-[var(--bone-mute)]" />
                    </div>
                    <span className="font-[--type-sans] text-sm text-[var(--bone)]">{course.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-[10px] text-[var(--bone-mute)]">{course.slug}</span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggle(course.id, !course.published)}
                    className={cn(
                      'flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors',
                      course.published
                        ? 'border-[rgba(255,255,255,0.16)] text-[var(--bone)] hover:border-[rgba(255,255,255,0.3)]'
                        : 'border-[rgba(255,255,255,0.07)] text-[var(--bone-mute)] hover:border-[rgba(255,255,255,0.16)]'
                    )}
                    style={{ borderRadius: 0 }}
                  >
                    {course.published ? (
                      <><Eye className="h-3 w-3" /> Publicado</>
                    ) : (
                      <><EyeOff className="h-3 w-3" /> Rascunho</>
                    )}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/academy/admin/cursos/${course.id}`}
                      className="text-[var(--bone-mute)] transition-colors hover:text-[var(--bone)]"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="text-[var(--bone-mute)] transition-colors hover:text-[var(--ember)]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
