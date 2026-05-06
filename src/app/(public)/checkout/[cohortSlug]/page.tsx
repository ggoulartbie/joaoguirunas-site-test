import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { createCheckoutSession } from '@/app/actions/checkout'

interface Props {
  params: Promise<{ cohortSlug: string }>
}

export default async function CheckoutPage({ params }: Props) {
  const { cohortSlug } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/login?next=/checkout/${cohortSlug}`)
  }

  const { data: cohort } = await supabaseAdmin
    .from('cohorts')
    .select('id, name, slug, is_purchasable, entry_price_cents, extension_price_cents, description')
    .eq('slug', cohortSlug)
    .single()

  if (!cohort || !cohort.is_purchasable) {
    redirect('/turmas')
  }

  const { data: existingMember } = await supabaseAdmin
    .from('cohort_members')
    .select('id')
    .eq('cohort_id', cohort.id)
    .eq('user_id', user.id)
    .maybeSingle()

  const isExtension = !!existingMember
  const priceCents = isExtension ? cohort.extension_price_cents : cohort.entry_price_cents
  const priceLabel = priceCents
    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceCents / 100)
    : 'Consulte'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{cohort.name}</h1>
          {cohort.description && (
            <p className="mt-2 text-gray-600 text-sm">{cohort.description}</p>
          )}
        </div>

        <div className="border-t border-b py-4 space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{isExtension ? 'Extensão de acesso' : 'Acesso à turma'}</span>
            <span className="font-semibold text-gray-900">{priceLabel}</span>
          </div>
        </div>

        <form
          action={async () => {
            'use server'
            await createCheckoutSession(cohortSlug, user.id)
          }}
        >
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            {isExtension ? 'Estender acesso' : 'Garantir minha vaga'} — {priceLabel}
          </button>
        </form>

        <p className="text-xs text-center text-gray-400">
          Pagamento processado com segurança via Stripe
        </p>
      </div>
    </div>
  )
}
