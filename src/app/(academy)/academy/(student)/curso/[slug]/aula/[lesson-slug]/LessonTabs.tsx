'use client'

import { useState } from 'react'
import { CommentsSection } from '@/components/student/CommentsSection'
import { MaterialsList } from '@/components/student/MaterialsList'
import { LessonContent } from '@/components/editor/LessonContent'
import type { CommentWithAuthor } from '@/types/student'
import type { Database } from '@/types/database'
import type { RenderedContent } from '@/lib/content'

type Comment = CommentWithAuthor
type Material = Database['public']['Tables']['materials']['Row']
type Tab = 'sobre' | 'resumo' | 'transcricao' | 'materiais' | 'comentarios'

const ALL_TABS: { id: Tab; label: string }[] = [
  { id: 'sobre', label: 'Sobre a aula' },
  { id: 'resumo', label: 'Resumo' },
  { id: 'transcricao', label: 'Transcrição' },
  { id: 'materiais', label: 'Materiais' },
  { id: 'comentarios', label: 'Comentários' },
]

type LessonTabsProps = {
  courseSlug: string
  lessonSlug: string
  activeTab: Tab
  description: string
  descriptionContent?: RenderedContent | null
  summaryContent?: RenderedContent | null
  transcriptContent?: RenderedContent | null
  materials: Material[]
  comments: Comment[]
  lessonId: string
  currentUserId?: string
}

export function LessonTabs({
  courseSlug: _courseSlug,
  lessonSlug: _lessonSlug,
  activeTab: initialTab,
  description,
  descriptionContent,
  summaryContent,
  transcriptContent,
  materials,
  comments,
  lessonId,
  currentUserId,
}: LessonTabsProps) {
  const activeCommentCount = comments.filter((c) => !c.deleted_at).length

  const availableTabs = ALL_TABS.filter(({ id }) => {
    if (id === 'sobre') return !!(descriptionContent || description)
    if (id === 'resumo') return !!summaryContent
    if (id === 'transcricao') return !!transcriptContent
    if (id === 'materiais') return materials.length > 0
    if (id === 'comentarios') return true
    return false
  })

  const resolvedInitial =
    availableTabs.find((t) => t.id === initialTab)?.id ?? availableTabs[0]?.id ?? 'comentarios'

  const [active, setActive] = useState<Tab>(resolvedInitial)

  return (
    <div
      style={{
        background: 'var(--ink)',
        borderTop: '1px solid var(--hairline)',
      }}
    >
      {/* Tab nav — overflow-x-auto para mobile */}
      <div
        className="overflow-x-auto border-b"
        style={{ borderColor: 'var(--hairline)' }}
      >
        <div className="inline-flex min-w-full">
          {availableTabs.map(({ id, label }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                className="relative whitespace-nowrap px-4 py-3 font-mono text-[11px] uppercase tracking-wide transition-colors"
                style={{
                  color: isActive ? 'var(--ember)' : 'var(--bone-mute)',
                  borderBottom: isActive ? '2px solid var(--ember)' : '2px solid transparent',
                  marginBottom: '-1px',
                }}
              >
                {label}
                {id === 'comentarios' && activeCommentCount > 0 && (
                  <span
                    className="ml-1.5 font-mono text-[9px]"
                    style={{ color: 'var(--bone-mute)', opacity: 0.6 }}
                  >
                    ({activeCommentCount})
                  </span>
                )}
                {id === 'materiais' && materials.length > 0 && (
                  <span
                    className="ml-1.5 font-mono text-[9px]"
                    style={{ color: 'var(--bone-mute)', opacity: 0.6 }}
                  >
                    ({materials.length})
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="space-y-4 p-4 lg:p-6">
        {active === 'sobre' && (
          descriptionContent ? (
            <LessonContent content={descriptionContent} className="" />
          ) : description ? (
            <p className="text-sm leading-relaxed" style={{ color: 'var(--bone-dim)' }}>
              {description}
            </p>
          ) : (
            <p className="py-4 font-mono text-xs" style={{ color: 'var(--bone-mute)', opacity: 0.5 }}>
              Esta aula não possui descrição.
            </p>
          )
        )}

        {active === 'resumo' && summaryContent && (
          <LessonContent content={summaryContent} className="" />
        )}

        {active === 'transcricao' && transcriptContent && (
          <LessonContent content={transcriptContent} className="" />
        )}

        {active === 'materiais' && (
          <MaterialsList materials={materials} />
        )}

        {active === 'comentarios' && (
          <CommentsSection
            lessonId={lessonId}
            initialComments={comments}
            currentUserId={currentUserId ?? ''}
          />
        )}
      </div>
    </div>
  )
}
