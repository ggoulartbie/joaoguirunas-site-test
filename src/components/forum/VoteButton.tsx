'use client'

import { useTransition } from 'react'
import { ChevronUp } from 'lucide-react'
import { voteThread } from '@/app/(academy)/academy/(student)/forum/actions'

export function VoteButton({ threadId, voteCount }: { threadId: string; voteCount: number }) {
  const [pending, startTransition] = useTransition()
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(async () => { await voteThread(threadId) })}
      className="flex items-center gap-1.5 font-mono text-xs text-[color:var(--bone-mute)] transition-colors hover:text-[color:var(--ember)] disabled:opacity-50"
    >
      <ChevronUp className="h-3.5 w-3.5" />
      <span>{voteCount}</span>
      <span>votos</span>
    </button>
  )
}
