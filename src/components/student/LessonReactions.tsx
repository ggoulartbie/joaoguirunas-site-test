'use client'

import { useOptimistic, useTransition, useState } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { setReaction } from '@/app/actions/lesson-reactions'

type Reaction = 'LIKE' | 'DISLIKE' | null

type ReactionState = {
  likes: number
  dislikes: number
  mine: Reaction
}

type Props = {
  lessonId: string
  initialLikes: number
  initialDislikes: number
  initialMine: Reaction
}

function computeOptimistic(current: ReactionState, next: Reaction): ReactionState {
  const { likes, dislikes, mine } = current

  if (next === mine) {
    // toggle off
    return {
      likes: next === 'LIKE' ? likes - 1 : likes,
      dislikes: next === 'DISLIKE' ? dislikes - 1 : dislikes,
      mine: null,
    }
  }

  if (next === 'LIKE') {
    return {
      likes: likes + 1,
      dislikes: mine === 'DISLIKE' ? dislikes - 1 : dislikes,
      mine: 'LIKE',
    }
  }

  if (next === 'DISLIKE') {
    return {
      likes: mine === 'LIKE' ? likes - 1 : likes,
      dislikes: dislikes + 1,
      mine: 'DISLIKE',
    }
  }

  return current
}

export function LessonReactions({ lessonId, initialLikes, initialDislikes, initialMine }: Props) {
  const [committed, setCommitted] = useState<ReactionState>({
    likes: initialLikes,
    dislikes: initialDislikes,
    mine: initialMine,
  })
  const [optimistic, addOptimistic] = useOptimistic(committed)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleClick(clicked: 'LIKE' | 'DISLIKE') {
    const next: Reaction = optimistic.mine === clicked ? null : clicked
    const rollback = committed

    startTransition(async () => {
      addOptimistic(computeOptimistic(optimistic, next))
      setError(null)
      try {
        await setReaction(lessonId, next)
        setCommitted(computeOptimistic(rollback, next))
      } catch {
        setCommitted(rollback)
        setError('Não foi possível registrar')
      }
    })
  }

  const btnBase =
    'flex items-center gap-1.5 rounded-sm border px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] disabled:pointer-events-none disabled:opacity-50'

  const activeStyle = { color: 'var(--ember)', borderColor: 'var(--ember)', opacity: 1 }
  const inactiveStyle = { color: 'var(--bone-mute)', borderColor: 'var(--hairline)' }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => handleClick('LIKE')}
        disabled={isPending}
        aria-label="Curtir aula"
        aria-pressed={optimistic.mine === 'LIKE'}
        className={btnBase}
        style={optimistic.mine === 'LIKE' ? activeStyle : inactiveStyle}
      >
        <ThumbsUp
          className="h-4 w-4"
          fill={optimistic.mine === 'LIKE' ? 'currentColor' : 'none'}
          aria-hidden="true"
        />
        <span>{optimistic.likes}</span>
      </button>

      <button
        type="button"
        onClick={() => handleClick('DISLIKE')}
        disabled={isPending}
        aria-label="Não curtir aula"
        aria-pressed={optimistic.mine === 'DISLIKE'}
        className={btnBase}
        style={optimistic.mine === 'DISLIKE' ? activeStyle : inactiveStyle}
      >
        <ThumbsDown
          className="h-4 w-4"
          fill={optimistic.mine === 'DISLIKE' ? 'currentColor' : 'none'}
          aria-hidden="true"
        />
        <span>{optimistic.dislikes}</span>
      </button>

      {error && (
        <span
          className="font-mono text-[10px]"
          style={{ color: 'var(--bone-mute)' }}
          aria-live="polite"
          role="status"
        >
          {error}
        </span>
      )}
    </div>
  )
}
