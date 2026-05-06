'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { markLessonComplete } from '@/app/actions/progress'

type Props = {
  lessonId: string
  initialCompleted: boolean
}

export function MarkCompleteButton({ lessonId, initialCompleted }: Props) {
  const [completed, setCompleted] = useState(initialCompleted)
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (completed || loading) return
    setLoading(true)
    try {
      await markLessonComplete(lessonId)
      setCompleted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-between border border-white/10 bg-[#0C0C12] p-4">
      <span className="text-sm text-white/60">
        {completed ? 'Aula concluída' : 'Concluiu esta aula?'}
      </span>
      <button
        onClick={handleClick}
        disabled={completed || loading}
        className={`flex items-center gap-2 border px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors disabled:cursor-default ${
          completed
            ? 'border-green-500/40 text-green-400'
            : 'border-white/10 text-white/50 hover:border-green-500/40 hover:text-green-400'
        }`}
      >
        <CheckCircle className="h-3.5 w-3.5" />
        {loading ? 'Salvando...' : completed ? 'Concluída' : 'Marcar como concluída'}
      </button>
    </div>
  )
}
