import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await supabaseAdmin
    .from('cohorts')
    .select('name, description')
    .eq('slug', slug)
    .eq('has_public_page', true)
    .single()

  if (!data) return { title: 'Turma' }
  return {
    title: data.name,
    description: data.description ?? undefined,
  }
}

export async function generateStaticParams() {
  const { data } = await supabaseAdmin
    .from('cohorts')
    .select('slug')
    .eq('has_public_page', true)
    .eq('is_purchasable', true)

  return (data ?? []).map((c) => ({ slug: c.slug }))
}

function formatPrice(cents: number | null): string {
  if (!cents) return 'Consultar'
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

function formatDate(date: string | null): string {
  if (!date) return ''
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(date))
}

export default async function TurmaSlugPage({ params }: Props) {
  const { slug } = await params

  const [cohortResult, supabase] = await Promise.all([
    supabaseAdmin
      .from('cohorts')
      .select(`
        id, slug, name, description, cover_image_url, status,
        start_date, end_date, total_seats, filled_seats,
        entry_price_cents, extension_price_cents,
        has_live_sessions, has_support, allows_auto_renewal,
        max_installments_entry, access_duration_days,
        is_purchasable, has_public_page
      `)
      .eq('slug', slug)
      .eq('has_public_page', true)
      .single(),
    createClient(),
  ])

  if (cohortResult.error || !cohortResult.data) notFound()

  const cohort = cohortResult.data
  const { data: { user } } = await supabase.auth.getUser()

  const coursesResult = await supabaseAdmin
    .from('cohort_courses')
    .select('courses(id, title, description, cover_image_url)')
    .eq('cohort_id', cohort.id)

  const courses = (coursesResult.data ?? [])
    .map((row) => row.courses)
    .filter(Boolean) as { id: string; title: string; description: string | null; cover_image_url: string | null }[]

  const spotsLeft = cohort.total_seats !== null
    ? cohort.total_seats - cohort.filled_seats
    : null
  const sold = spotsLeft !== null && spotsLeft === 0
  const checkoutHref = user
    ? `/checkout/${cohort.slug}`
    : `/login?next=/checkout/${cohort.slug}`

  const features: string[] = []
  if (cohort.has_live_sessions) features.push('Sessões ao vivo')
  if (cohort.has_support) features.push('Suporte direto')
  if (cohort.allows_auto_renewal) features.push('Renovação automática')
  if (cohort.access_duration_days) features.push(`Acesso por ${cohort.access_duration_days} dias`)

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      {/* Hero */}
      <div className="relative">
        {cohort.cover_image_url && (
          <div className="absolute inset-0 h-72 overflow-hidden">
            <Image
              src={cohort.cover_image_url}
              alt={cohort.name}
              fill
              priority
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050507]" />
          </div>
        )}
        <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-12">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-white/30">
            <Link href="/turmas" className="hover:text-white/60 transition-colors">Turmas</Link>
            {' / '}
            <span>{cohort.name}</span>
          </p>
          <h1 className="text-4xl font-bold tracking-tight">{cohort.name}</h1>
          {cohort.description && (
            <p className="mt-4 max-w-2xl text-lg text-white/50">{cohort.description}</p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-4xl px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Left */}
          <div className="space-y-10">
            {/* Dates / meta */}
            {(cohort.start_date || cohort.end_date) && (
              <div className="flex flex-wrap gap-6 border-b border-white/10 pb-6">
                {cohort.start_date && (
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-white/30">Início</p>
                    <p className="mt-1 text-sm text-white/70">{formatDate(cohort.start_date)}</p>
                  </div>
                )}
                {cohort.end_date && (
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-white/30">Término</p>
                    <p className="mt-1 text-sm text-white/70">{formatDate(cohort.end_date)}</p>
                  </div>
                )}
                {spotsLeft !== null && (
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-white/30">Vagas</p>
                    <p className={`mt-1 text-sm ${sold ? 'text-red-400' : 'text-white/70'}`}>
                      {sold ? 'Esgotadas' : `${spotsLeft} restante${spotsLeft !== 1 ? 's' : ''}`}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Courses included */}
            {courses.length > 0 && (
              <div>
                <h2 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Cursos incluídos
                </h2>
                <div className="space-y-3">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-start gap-4 border border-white/10 bg-white/[0.02] p-4"
                    >
                      {course.cover_image_url && (
                        <div className="relative h-14 w-20 shrink-0 overflow-hidden bg-white/5">
                          <Image
                            src={course.cover_image_url}
                            alt={course.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-mono text-sm font-medium text-white/90">{course.title}</p>
                        {course.description && (
                          <p className="mt-1 text-xs text-white/40 line-clamp-2">{course.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {features.length > 0 && (
              <div>
                <h2 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
                  O que está incluído
                </h2>
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sticky CTA card */}
          <div className="lg:sticky lg:top-8 self-start">
            <div className="border border-white/10 bg-white/[0.03] p-6 space-y-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/30">Investimento</p>
                <p className="mt-1 text-3xl font-bold">
                  {formatPrice(cohort.entry_price_cents)}
                </p>
                {cohort.max_installments_entry > 1 && cohort.entry_price_cents && (
                  <p className="mt-1 text-xs text-white/40">
                    em até {cohort.max_installments_entry}x de{' '}
                    {formatPrice(Math.ceil(cohort.entry_price_cents / cohort.max_installments_entry))}
                  </p>
                )}
              </div>

              {sold ? (
                <button
                  disabled
                  className="w-full bg-white/10 py-3 font-mono text-xs uppercase tracking-wider text-white/30 cursor-not-allowed"
                >
                  Turma esgotada
                </button>
              ) : cohort.is_purchasable ? (
                <Link
                  href={checkoutHref}
                  className="block w-full bg-white py-3 text-center font-mono text-xs uppercase tracking-wider text-[#050507] font-semibold transition-opacity hover:opacity-90"
                >
                  Matricular-se agora
                </Link>
              ) : (
                <p className="text-center font-mono text-xs text-white/30">
                  Inscrições em breve
                </p>
              )}

              {!user && cohort.is_purchasable && !sold && (
                <p className="text-center font-mono text-[10px] text-white/30">
                  Necessário{' '}
                  <Link href={`/login?next=/checkout/${cohort.slug}`} className="underline hover:text-white/60">
                    fazer login
                  </Link>{' '}
                  para prosseguir
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
