'use client'

import { useState } from 'react'
import { CheckCircle, Circle } from 'lucide-react'
import { toggleLessonComplete } from '@/app/actions/progress'

type Props = {
  lessonId: string
  initialCompleted: boolean
}

export function MarkCompleteButton({ lessonId, initialCompleted }: Props) {
  const [completed, setCompleted] = useState(initialCompleted)
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (loading) return
    setLoading(true)
    const next = !completed
    try {
      await toggleLessonComplete(lessonId, next)
      setCompleted(next)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="flex items-center justify-between p-4"
      style={{
        background: 'var(--ink)',
        border: '1px solid var(--hairline)',
      }}
    >
      <span className="text-sm" style={{ color: 'var(--bone-dim)' }}>
        {completed ? 'Aula concluída' : 'Concluiu esta aula?'}
      </span>
      <button
        onClick={handleClick}
        disabled={loading}
        aria-label={completed ? 'Desmarcar aula como concluída' : 'Marcar aula como concluída'}
        className="flex items-center gap-2 border px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--void)]"
        style={
          completed
            ? {
                background: 'var(--ember)',
                borderColor: 'var(--ember)',
                color: 'var(--bone)',
              }
            : {
                background: 'transparent',
                borderColor: 'var(--ember)',
                color: 'var(--ember)',
              }
        }
      >
        {completed
          ? <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
          : <Circle className="h-3.5 w-3.5" aria-hidden="true" />
        }
        {loading ? 'Salvando...' : completed ? 'Concluída' : 'Marcar como concluída'}
      </button>
    </div>
  )
}
