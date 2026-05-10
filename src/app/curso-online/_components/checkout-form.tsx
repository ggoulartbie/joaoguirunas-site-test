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
  const email = (formData.get('email') as string | null) ?? undefined
  const phone = (formData.get('phone') as string | null) ?? undefined
  return await createPublicCheckoutSession(slug, email, phone)
}

interface CheckoutFormProps {
  cohortSlug: string
  label?: string
}

export function CheckoutForm({ cohortSlug, label = 'Comprar agora — R$ 797' }: CheckoutFormProps) {
  const [state, formAction, isPending] = useActionState(checkoutAction, null)

  return (
    <div className="w-full sm:w-auto">
      <form action={formAction} className="flex flex-col gap-3 w-full sm:w-auto">
        <input type="hidden" name="cohortSlug" value={cohortSlug} />
        <input
          type="email"
          name="email"
          required
          placeholder="seu@email.com"
          className="w-full px-4 py-3 text-sm outline-none"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            borderRadius: 0,
          }}
        />
        <input
          type="tel"
          name="phone"
          required
          placeholder="WhatsApp (11) 99999-9999"
          className="w-full px-4 py-3 text-sm outline-none"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            borderRadius: 0,
          }}
        />
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
        <div
          className="mt-4 flex items-start gap-3 px-4 py-3"
          style={{ background: 'rgba(255,58,14,0.1)', border: '1px solid rgba(255,58,14,0.3)' }}
          role="alert"
        >
          <span style={{ color: '#FF3A0E', flexShrink: 0 }}>⚠</span>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
            {state.error}
          </p>
        </div>
      )}
    </div>
  )
}
