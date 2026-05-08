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
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5"
      style={{
        background: completed ? 'rgba(255,58,14,0.06)' : 'var(--ink)',
        border: `1px solid ${completed ? 'rgba(255,58,14,0.25)' : 'var(--hairline)'}`,
        transition: 'background 0.3s, border-color 0.3s',
      }}
    >
      <div className="flex flex-col gap-0.5">
        <span
          className="text-sm font-medium"
          style={{ color: completed ? 'var(--ember)' : 'var(--bone)' }}
        >
          {completed ? 'Aula concluída' : 'Concluiu esta aula?'}
        </span>
        <span className="text-xs" style={{ color: 'var(--bone-mute)' }}>
          {completed ? 'Clique para desmarcar' : 'Marque para registrar seu progresso'}
        </span>
      </div>

      <button
        onClick={handleClick}
        disabled={loading}
        aria-label={completed ? 'Desmarcar aula como concluída' : 'Marcar aula como concluída'}
        className="flex items-center justify-center gap-2.5 px-6 py-2.5 font-mono text-xs uppercase tracking-widest transition-all hover:opacity-80 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--void)] sm:flex-shrink-0"
        style={
          completed
            ? { background: 'var(--ember)', border: '1px solid var(--ember)', color: 'var(--void)' }
            : { background: 'transparent', border: '1px solid var(--ember)', color: 'var(--ember)' }
        }
      >
        {completed
          ? <CheckCircle className="h-4 w-4" aria-hidden="true" />
          : <Circle className="h-4 w-4" aria-hidden="true" />
        }
        {loading ? 'Salvando…' : completed ? 'Concluída' : 'Marcar como concluída'}
      </button>
    </div>
  )
}
