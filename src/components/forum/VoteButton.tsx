'use client'

import { useTransition } from 'react'
import { ThumbsUp } from 'lucide-react'
import { voteThread } from '@/app/(academy)/academy/(student)/forum/actions'

export function VoteButton({ threadId, voteCount }: { threadId: string; voteCount: number }) {
  const [pending, startTransition] = useTransition()
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(async () => { await voteThread(threadId) })}
      className="flex items-center gap-1.5 font-mono text-xs text-white/30 transition-colors hover:text-white/60 disabled:opacity-50"
    >
      <ThumbsUp className="h-3.5 w-3.5" />
      {voteCount} votos
    </button>
  )
}
