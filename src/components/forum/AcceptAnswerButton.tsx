'use client'

import { useTransition } from 'react'
import { CheckCircle } from 'lucide-react'
import { markAsAccepted } from '@/app/(academy)/academy/(student)/forum/actions'

export function AcceptAnswerButton({
  replyId,
  isAuthor,
}: {
  replyId: string
  isAuthor: boolean
}) {
  const [pending, startTransition] = useTransition()
  if (!isAuthor) return null
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(async () => { await markAsAccepted(replyId) })}
      className="flex items-center gap-1 font-mono text-[10px] text-[color:var(--bone-mute)] transition-colors hover:text-[color:var(--ember)] disabled:opacity-50"
    >
      <CheckCircle className="h-3.5 w-3.5" />
      Melhor resposta
    </button>
  )
}
