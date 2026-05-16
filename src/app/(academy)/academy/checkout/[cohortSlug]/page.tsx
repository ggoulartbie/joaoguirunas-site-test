export const dynamic = 'force-dynamic'

import Image from 'next/image'
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
    redirect(`/academy/login?next=/academy/checkout/${cohortSlug}`)
  }

  const { data: cohort } = await supabaseAdmin
    .from('cohorts')
    .select('id, name, slug, is_purchasable, entry_price_cents, extension_price_cents, description')
    .eq('slug', cohortSlug)
    .single()

  if (!cohort || !cohort.is_purchasable) {
    redirect('/academy/turmas')
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

  const benefits = [
    'Acesso completo ao conteúdo da turma',
    'Certificado de conclusão',
    'Comunidade exclusiva de alunos',
    'Suporte direto com o mentor',
  ]

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--void)',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Header */}
      <header
        className="h-16 flex items-center px-6"
        style={{ borderBottom: '1px solid var(--hairline)' }}
      >
        <div className="flex items-center gap-3">
          <Image
            src="/images/brand/symbol-official.svg"
            alt="Academy"
            width={28}
            height={28}
          />
          <span
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
          >
            Academy
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto py-12 px-4">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT — Order summary */}
          <div
            className="p-6"
            style={{
              backgroundColor: 'var(--ink)',
              border: '1px solid var(--hairline)',
              borderRadius: 0,
            }}
          >
            <p
              className="text-xs tracking-widest uppercase mb-5"
              style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
            >
              Resumo do pedido
            </p>

            <h1
              className="text-2xl mb-3"
              style={{
                fontFamily: 'var(--type-display)',
                fontStyle: 'italic',
                color: 'var(--bone)',
              }}
            >
              {cohort.name}
            </h1>

            {cohort.description && (
              <p
                className="text-sm mb-5"
                style={{ color: 'var(--bone-mute)' }}
              >
                {cohort.description}
              </p>
            )}

            <div
              className="my-5"
              style={{ height: '1px', backgroundColor: 'var(--hairline)' }}
            />

            <div className="mb-5">
              <p
                className="text-4xl font-bold"
                style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone)' }}
              >
                {priceLabel}
                <span
                  className="text-sm font-normal ml-1"
                  style={{ color: 'var(--bone-mute)' }}
                >
                  /{isExtension ? 'extensão' : 'entrada'}
                </span>
              </p>
            </div>

            <ul className="space-y-2">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mt-0.5 shrink-0"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="var(--ember)"
                      strokeWidth="2"
                      strokeLinecap="square"
                    />
                  </svg>
                  <span
                    className="text-sm"
                    style={{ color: 'var(--bone-dim)' }}
                  >
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Form / CTA */}
          <div
            className="p-6"
            style={{
              backgroundColor: 'var(--ink)',
              borderTop: '2px solid var(--ember)',
              borderRight: '1px solid var(--hairline)',
              borderBottom: '1px solid var(--hairline)',
              borderLeft: '1px solid var(--hairline)',
              borderRadius: 0,
            }}
          >
            <p
              className="text-xs tracking-widest uppercase mb-6"
              style={{ fontFamily: 'var(--type-mono)', color: 'var(--ember)' }}
            >
              Garantir vaga
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label
                  className="block text-xs tracking-wider uppercase mb-1"
                  style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
                >
                  Turma
                </label>
                <p
                  className="text-sm"
                  style={{ color: 'var(--bone-dim)' }}
                >
                  {cohort.name}
                </p>
              </div>
              <div>
                <label
                  className="block text-xs tracking-wider uppercase mb-1"
                  style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
                >
                  Tipo
                </label>
                <p
                  className="text-sm"
                  style={{ color: 'var(--bone-dim)' }}
                >
                  {isExtension ? 'Extensão de acesso' : 'Acesso à turma'}
                </p>
              </div>
              <div>
                <label
                  className="block text-xs tracking-wider uppercase mb-1"
                  style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
                >
                  Total
                </label>
                <p
                  className="text-sm font-bold"
                  style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone)' }}
                >
                  {priceLabel}
                </p>
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
                className="w-full h-12 text-xs tracking-widest uppercase font-bold transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: 'var(--ember)',
                  color: 'var(--void)',
                  fontFamily: 'var(--type-mono)',
                  borderRadius: 0,
                  border: 'none',
                }}
              >
                {isExtension ? 'Estender acesso' : 'Garantir minha vaga'} — {priceLabel}
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 mt-4">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect x="3" y="11" width="18" height="11" rx="0" stroke="var(--bone-mute)" strokeWidth="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="var(--bone-mute)" strokeWidth="2" strokeLinecap="square" />
              </svg>
              <span
                className="text-xs"
                style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
              >
                Pagamento seguro
              </span>
            </div>

            <p
              className="text-center mt-3"
              style={{ fontSize: '11px', color: 'var(--bone-mute)' }}
            >
              Ao prosseguir, você concorda com os termos de uso e política de privacidade.
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}
