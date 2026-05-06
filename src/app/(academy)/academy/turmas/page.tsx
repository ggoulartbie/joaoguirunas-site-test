import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export const metadata: Metadata = {
  title: 'Turmas disponíveis',
  description: 'Conheça as turmas abertas e garanta sua vaga.',
}

// Cohort status visíveis publicamente
const PURCHASABLE_STATUSES = ['OPEN', 'IN_PROGRESS'] as const

type CohortRow = {
  id: string
  slug: string
  name: string
  description: string | null
  cover_image_url: string | null
  status: string
  start_date: string | null
  end_date: string | null
  total_seats: number | null
  filled_seats: number
  entry_price_cents: number | null
  extension_price_cents: number | null
}

function formatPrice(cents: number | null): string {
  if (!cents) return 'Consulte'
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

function formatDate(date: string | null): string {
  if (!date) return ''
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(date))
}

function statusBadge(status: string, spotsLeft: number | null) {
  if (spotsLeft !== null && spotsLeft === 0) {
    return { label: 'Esgotadas', className: 'bg-white/10 text-white/40' }
  }
  if (status === 'OPEN') {
    return { label: 'Abertas', className: 'bg-emerald-500/20 text-emerald-400' }
  }
  if (status === 'IN_PROGRESS') {
    return { label: 'Em andamento', className: 'bg-blue-500/20 text-blue-400' }
  }
  return { label: status, className: 'bg-white/10 text-white/40' }
}

export default async function TurmasPage() {
  // Busca cohorts purchasable e com status visível
  const { data: cohorts } = await supabaseAdmin
    .from('cohorts')
    .select('id, slug, name, description, cover_image_url, status, start_date, end_date, total_seats, filled_seats, entry_price_cents, extension_price_cents')
    .eq('is_purchasable', true)
    .in('status', PURCHASABLE_STATUSES)
    .order('start_date', { ascending: true })

  // Sessão do usuário (para o CTA de compra)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''

  const list = (cohorts ?? []) as CohortRow[]

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      {/* Hero */}
      <div className="mx-auto max-w-5xl px-6 pt-20 pb-12">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Turmas disponíveis
        </h1>
        <p className="mt-3 max-w-xl text-lg text-white/50">
          Escolha sua turma, garanta sua vaga e comece a aprender com quem está na prática.
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-5xl px-6 pb-24">
        {list.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((cohort) => {
              const spotsLeft = cohort.total_seats !== null
                ? cohort.total_seats - cohort.filled_seats
                : null
              const badge = statusBadge(cohort.status, spotsLeft)
              const sold = spotsLeft !== null && spotsLeft === 0
              const checkoutHref = user
                ? `/checkout/${cohort.slug}`
                : `/login?next=/checkout/${cohort.slug}`

              const dateRange = cohort.start_date || cohort.end_date
                ? [formatDate(cohort.start_date), formatDate(cohort.end_date)]
                    .filter(Boolean)
                    .join(' – ')
                : null

              return (
                <div
                  key={cohort.id}
                  className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="relative h-40 bg-white/5">
                    {cohort.cover_image_url ? (
                      <Image
                        src={cohort.cover_image_url}
                        alt={cohort.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div className="h-10 w-10 rounded-full bg-white/10" />
                      </div>
                    )}
                    {/* Badge */}
                    <span className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-medium ${badge.className}`}>
                      {badge.label}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div>
                      <h2 className="text-base font-semibold leading-snug text-white">
                        {cohort.name}
                      </h2>
                      {cohort.description && (
                        <p className="mt-1.5 text-sm text-white/50 line-clamp-2">
                          {cohort.description}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 text-xs text-white/40">
                      {dateRange && (
                        <span>{dateRange}</span>
                      )}
                      {spotsLeft !== null && (
                        <span>
                          {sold
                            ? 'Sem vagas disponíveis'
                            : `${spotsLeft} ${spotsLeft === 1 ? 'vaga restante' : 'vagas restantes'}`}
                        </span>
                      )}
                    </div>

                    {/* Preço */}
                    <div className="mt-auto pt-2 border-t border-white/10">
                      <span className="text-xl font-bold text-white">
                        {formatPrice(cohort.entry_price_cents)}
                      </span>
                    </div>

                    {/* CTA */}
                    {sold ? (
                      <button
                        disabled
                        className="w-full rounded-xl bg-white/10 py-2.5 text-sm font-medium text-white/30 cursor-not-allowed"
                      >
                        Turma esgotada
                      </button>
                    ) : (
                      <Link
                        href={checkoutHref}
                        className="block w-full rounded-xl bg-white py-2.5 text-center text-sm font-semibold text-[#050507] transition-opacity hover:opacity-90"
                      >
                        Matricular-se
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center">
      <p className="text-lg font-medium text-white/70">
        Nenhuma turma aberta no momento.
      </p>
      <p className="mt-2 max-w-sm text-sm text-white/40">
        Cadastre-se para ser avisado quando abrirmos novas turmas.
      </p>
      <Link
        href="/cadastro"
        className="mt-6 inline-block rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-[#050507] transition-opacity hover:opacity-90"
      >
        Criar conta
      </Link>
    </div>
  )
}
