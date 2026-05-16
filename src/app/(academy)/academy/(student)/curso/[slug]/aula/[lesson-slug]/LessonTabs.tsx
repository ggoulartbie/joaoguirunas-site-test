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

type Tab = 'sobre' | 'materiais' | 'comentarios'

const TAB_LABELS: { id: Tab; label: string }[] = [
  { id: 'sobre', label: 'Sobre a aula' },
  { id: 'materiais', label: 'Materiais' },
  { id: 'comentarios', label: 'Comentarios' },
]

type LessonTabsProps = {
  courseSlug: string
  lessonSlug: string
  activeTab: Tab
  description: string
  descriptionContent?: RenderedContent | null
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
  materials,
  comments,
  lessonId,
  currentUserId,
}: LessonTabsProps) {
  const [active, setActive] = useState<Tab>(initialTab)

  const activeCommentCount = comments.filter((c) => !c.deleted_at).length

  return (
    <div
      style={{
        background: 'var(--ink)',
        borderTop: '1px solid var(--hairline)',
      }}
    >
      {/* Tab nav */}
      <div
        className="inline-flex border-b"
        style={{ borderColor: 'var(--hairline)', width: '100%' }}
      >
        {TAB_LABELS.map(({ id, label }) => {
          const isActive = active === id

          return (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className="relative px-4 py-3 font-mono text-[11px] uppercase tracking-wide transition-colors"
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

      {/* Tab content */}
      <div className="space-y-4 p-4 lg:p-6">
        {active === 'sobre' && (
          descriptionContent ? (
            <LessonContent
              content={descriptionContent}
              className=""
            />
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
