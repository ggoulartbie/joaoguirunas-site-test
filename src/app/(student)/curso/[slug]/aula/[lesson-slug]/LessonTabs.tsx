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
  { id: 'comentarios', label: 'Comentários' },
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
  currentUserName?: string
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
  currentUserName: _currentUserName,
}: LessonTabsProps) {
  const [active, setActive] = useState<Tab>(initialTab)

  return (
    <div className="border border-t-0 border-white/10">
      {/* Tab nav */}
      <div className="flex border-b border-white/10">
        {TAB_LABELS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActive(id)}
            className={`px-5 py-3 font-mono text-xs uppercase tracking-wider transition-colors ${
              active === id
                ? 'border-b-2 border-[#FF3A0E] text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {label}
            {id === 'comentarios' && comments.filter((c) => !c.deleted_at).length > 0 && (
              <span className="ml-1.5 font-mono text-[9px] text-white/20">
                ({comments.filter((c) => !c.deleted_at).length})
              </span>
            )}
            {id === 'materiais' && materials.length > 0 && (
              <span className="ml-1.5 font-mono text-[9px] text-white/20">
                ({materials.length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6">
        {active === 'sobre' && (
          descriptionContent ? (
            <LessonContent
              content={descriptionContent}
              className="prose prose-sm prose-invert max-w-none text-white/70"
            />
          ) : (
            <p className="text-sm leading-relaxed text-white/70">{description}</p>
          )
        )}

        {active === 'materiais' && (
          <MaterialsList materials={materials} />
        )}

        {active === 'comentarios' && (
          <CommentsSection lessonId={lessonId} initialComments={comments} currentUserName={currentUserId ?? ''} />
        )}
      </div>
    </div>
  )
}
