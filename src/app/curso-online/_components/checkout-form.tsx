'use client'

import { useActionState } from 'react'
import { ArrowRight } from 'lucide-react'
import { createPublicCheckoutSession } from '@/app/actions/checkoutPublic'

const KV_MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
}

type ActionState = { error: string } | null

async function checkoutAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const slug = formData.get('cohortSlug') as string
  return await createPublicCheckoutSession(slug)
}

interface CheckoutFormProps {
  cohortSlug: string
  label?: string
}

export function CheckoutForm({ cohortSlug, label = 'Comprar agora — R$ 499' }: CheckoutFormProps) {
  const [state, formAction, isPending] = useActionState(checkoutAction, null)

  return (
    <div>
      <form action={formAction} className="w-full sm:w-auto">
        <input type="hidden" name="cohortSlug" value={cohortSlug} />
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold uppercase transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 w-full sm:w-auto"
          style={{ ...KV_MONO, background: '#FF3A0E', color: '#050507', fontSize: '12px' }}
        >
          {isPending ? 'Aguarde...' : label}
          {!isPending && <ArrowRight size={14} aria-hidden="true" />}
        </button>
      </form>
      {state?.error && (
        <p
          className="mt-3 text-xs"
          style={{ ...KV_MONO, color: 'rgba(255, 80, 50, 0.9)' }}
          role="alert"
        >
          {state.error}
        </p>
      )}
    </div>
  )
}
