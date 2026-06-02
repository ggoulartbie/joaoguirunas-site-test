'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, CheckCircle2, Play, BookOpen, X } from 'lucide-react'

type SidebarLesson = {
  id: string
  slug: string
  title: string
  sort_order: number
  moduleTitle: string
  moduleId: string
}

type SidebarModule = {
  id: string
  title: string
  sort_order: number
  completedCount: number
  totalCount: number
  lessons: {
    id: string
    slug: string
    title: string
    sort_order: number
    completed: boolean
  }[]
}

type CourseSidebarProps = {
  modules: SidebarModule[]
  currentLessonId: string
  currentModuleId: string
  courseSlug: string
  totalCompleted: number
  totalLessons: number
}

export function CourseSidebar({
  modules,
  currentLessonId,
  currentModuleId,
  courseSlug,
  totalCompleted,
  totalLessons,
}: CourseSidebarProps) {
  // Track which modules are open; current module starts open
  const [openModules, setOpenModules] = useState<Set<string>>(
    () => new Set([currentModuleId])
  )

  function toggleModule(moduleId: string) {
    setOpenModules((prev) => {
      const next = new Set(prev)
      if (next.has(moduleId)) {
        next.delete(moduleId)
      } else {
        next.add(moduleId)
      }
      return next
    })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Sidebar header */}
      <div
        className="border-b px-4 py-3 shrink-0"
        style={{ borderColor: 'var(--hairline)' }}
      >
        <p
          className="font-mono text-[11px] uppercase tracking-widest"
          style={{ color: 'var(--bone-mute)' }}
        >
          Conteudo do curso
        </p>
        <p
          className="mt-1 font-mono text-[11px]"
          style={{ color: 'var(--bone-mute)', opacity: 0.6 }}
        >
          {totalCompleted}/{totalLessons} aulas concluidas
        </p>
      </div>

      {/* Module list */}
      <nav className="flex-1 overflow-y-auto" aria-label="Conteudo do curso">
        {modules.map((mod) => {
          const isOpen = openModules.has(mod.id)
          const isCurrentModule = mod.id === currentModuleId

          return (
            <div
              key={mod.id}
              style={{ borderBottom: '1px solid var(--hairline)' }}
            >
              {/* Module header (accordion toggle) */}
              <button
                type="button"
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors"
                style={{
                  background: isCurrentModule
                    ? 'rgba(255,58,14,0.04)'
                    : 'transparent',
                }}
                aria-expanded={isOpen}
              >
                <div className="flex-1 min-w-0">
                  <p
                    className="font-mono text-[11px] uppercase tracking-wide truncate"
                    style={{
                      color: isCurrentModule
                        ? 'var(--ember)'
                        : 'var(--bone-dim)',
                    }}
                  >
                    {mod.title}
                  </p>
                  <p
                    className="mt-0.5 font-mono text-[10px]"
                    style={{ color: 'var(--bone-mute)', opacity: 0.6 }}
                  >
                    {mod.completedCount}/{mod.totalCount} aulas
                  </p>
                </div>
                <ChevronDown
                  className="ml-2 h-3.5 w-3.5 shrink-0 transition-transform"
                  style={{
                    color: 'var(--bone-mute)',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                  aria-hidden="true"
                />
              </button>

              {/* Lesson list (collapsible) */}
              {isOpen && (
                <ul>
                  {mod.lessons.map((lesson, idx) => {
                    const isCurrent = lesson.id === currentLessonId

                    return (
                      <li key={lesson.id}>
                        <Link
                          href={`/academy/curso/${courseSlug}/aula/${lesson.slug}`}
                          className="flex items-start gap-3 px-4 py-2.5 transition-colors"
                          style={{
                            background: isCurrent
                              ? 'rgba(255,58,14,0.07)'
                              : 'transparent',
                            borderLeft: isCurrent
                              ? '2px solid var(--ember)'
                              : '2px solid transparent',
                            borderBottom: '1px solid var(--hairline)',
                            color: isCurrent
                              ? 'var(--bone)'
                              : 'var(--bone-mute)',
                          }}
                          aria-current={isCurrent ? 'page' : undefined}
                        >
                          {/* Index / status icon */}
                          <span
                            className="mt-0.5 shrink-0"
                            style={{ width: '20px', textAlign: 'center' }}
                          >
                            {lesson.completed ? (
                              <CheckCircle2
                                className="h-3.5 w-3.5 inline"
                                style={{ color: 'var(--ember)', opacity: 0.7 }}
                                aria-label="Concluida"
                              />
                            ) : isCurrent ? (
                              <Play
                                className="h-3.5 w-3.5 inline"
                                style={{ color: 'var(--ember)' }}
                                aria-label="Aula atual"
                              />
                            ) : (
                              <span
                                className="font-mono text-[10px]"
                                style={{ color: 'var(--bone-mute)', opacity: 0.5 }}
                              >
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                            )}
                          </span>

                          <span className="text-[12px] leading-snug">
                            {lesson.title}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}

// Mobile lesson list drawer
type MobileLessonDrawerProps = {
  modules: SidebarModule[]
  currentLessonId: string
  currentModuleId: string
  courseSlug: string
  totalCompleted: number
  totalLessons: number
}

export function MobileLessonDrawer(props: MobileLessonDrawerProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wide transition-colors border"
        style={{
          background: 'var(--ink)',
          borderColor: 'var(--hairline)',
          color: 'var(--bone-mute)',
        }}
      >
        <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
        Lista de aulas
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          {/* Slide-up panel */}
          <div
            className="mt-auto flex flex-col"
            style={{
              background: 'var(--void)',
              maxHeight: '80vh',
              borderTop: '1px solid var(--hairline)',
            }}
          >
            {/* Panel header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b shrink-0"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <p
                className="font-mono text-[11px] uppercase tracking-widest"
                style={{ color: 'var(--bone-mute)' }}
              >
                Conteudo do curso
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 transition-colors"
                style={{ color: 'var(--bone-mute)' }}
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Reuse CourseSidebar content, scrollable */}
            <div className="flex-1 overflow-y-auto">
              <CourseSidebar {...props} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
