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
    ? `/academy/checkout/${cohort.slug}`
    : `/academy/login?next=/academy/checkout/${cohort.slug}`

  const features: string[] = []
  if (cohort.has_live_sessions) features.push('Sessões ao vivo')
  if (cohort.has_support) features.push('Suporte direto')
  if (cohort.allows_auto_renewal) features.push('Renovação automática')
  if (cohort.access_duration_days) features.push(`Acesso por ${cohort.access_duration_days} dias`)

  const fillPercent = cohort.total_seats && cohort.total_seats > 0
    ? Math.round((cohort.filled_seats / cohort.total_seats) * 100)
    : null

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://joaoguirunas.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: cohort.name,
    description: cohort.description ?? undefined,
    image: cohort.cover_image_url ?? undefined,
    url: `${appUrl}/academy/turmas/${cohort.slug}`,
    provider: {
      '@type': 'Person',
      name: 'João Guirunas',
      url: appUrl,
    },
    ...(cohort.start_date ? { startDate: cohort.start_date } : {}),
    ...(cohort.end_date ? { endDate: cohort.end_date } : {}),
    ...(cohort.entry_price_cents
      ? {
          offers: {
            '@type': 'Offer',
            price: (cohort.entry_price_cents / 100).toFixed(2),
            priceCurrency: 'BRL',
            availability: sold
              ? 'https://schema.org/SoldOut'
              : 'https://schema.org/InStock',
            url: `${appUrl}/academy/checkout/${cohort.slug}`,
          },
        }
      : {}),
    hasCourseInstance: courses.map((c) => ({
      '@type': 'CourseInstance',
      name: c.title,
      description: c.description ?? undefined,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div style={{ background: 'var(--void)', minHeight: '100vh' }}>
      {/* Dot texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.55,
        }}
      />

      {/* Nav */}
      <nav
        style={{
          borderBottom: '1px solid var(--hairline)',
          background: 'var(--void)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            padding: '0 24px',
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Image src="/images/brand/symbol-official.svg" alt="João Guirunas" width={28} height={28} priority />
            <span
              style={{
                fontFamily: 'var(--type-mono)',
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--bone-mute)',
              }}
            >
              João Guirunas Academy
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <Link
              href="/academy/turmas"
              style={{
                fontFamily: 'var(--type-mono)',
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--bone-mute)',
                textDecoration: 'none',
              }}
            >
              ← Turmas
            </Link>
            <Link
              href="/academy/login"
              style={{
                fontFamily: 'var(--type-mono)',
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--bone-dim)',
                textDecoration: 'none',
              }}
            >
              Entrar →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          background: 'var(--ink)',
          borderBottom: '1px solid var(--hairline)',
        }}
      >
        {cohort.cover_image_url && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
            }}
          >
            <Image
              src={cohort.cover_image_url}
              alt={cohort.name}
              fill
              priority
              style={{ objectFit: 'cover', opacity: 0.12 }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 0%, var(--ink) 100%)',
              }}
            />
          </div>
        )}
        <div
          style={{
            position: 'relative',
            maxWidth: 960,
            margin: '0 auto',
            padding: '72px 24px 64px',
          }}
        >
          {/* Eyebrow breadcrumb */}
          <p
            style={{
              fontFamily: 'var(--type-mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--bone-mute)',
              marginBottom: 24,
            }}
          >
            <Link
              href="/academy/turmas"
              style={{ color: 'var(--bone-mute)', textDecoration: 'none' }}
            >
              Turmas
            </Link>
            {' / '}
            <span style={{ color: 'var(--bone-dim)' }}>{cohort.name}</span>
          </p>

          {/* Status badge */}
          {!sold && (
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--type-mono)',
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255,58,14,0.3)',
                color: 'var(--ember)',
                padding: '3px 10px',
                marginBottom: 20,
              }}
            >
              {cohort.status === 'OPEN' ? 'Vagas abertas' : 'Em andamento'}
            </span>
          )}

          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--type-display)',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(36px, 5vw, 64px)',
              letterSpacing: '-0.025em',
              lineHeight: 1,
              color: 'var(--bone)',
              marginBottom: 20,
            }}
          >
            {cohort.name}
          </h1>

          {cohort.description && (
            <p
              style={{
                fontFamily: 'var(--type-display)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 18,
                color: 'var(--bone-dim)',
                lineHeight: 1.5,
                maxWidth: 560,
              }}
            >
              {cohort.description}
            </p>
          )}
        </div>
      </section>

      {/* Body */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 960,
          margin: '0 auto',
          padding: '64px 24px 120px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gap: 40,
            gridTemplateColumns: '1fr',
          }}
          className="lg:grid-cols-[1fr_300px]"
        >
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

            {/* Datas / meta */}
            {(cohort.start_date || cohort.end_date || spotsLeft !== null) && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 32,
                  paddingBottom: 32,
                  borderBottom: '1px solid var(--hairline)',
                }}
              >
                {cohort.start_date && (
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--type-mono)',
                        fontSize: 10,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--bone-mute)',
                        marginBottom: 4,
                      }}
                    >
                      Início
                    </p>
                    <p style={{ fontFamily: 'var(--type-sans)', fontSize: 14, color: 'var(--bone-dim)' }}>
                      {formatDate(cohort.start_date)}
                    </p>
                  </div>
                )}
                {cohort.end_date && (
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--type-mono)',
                        fontSize: 10,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--bone-mute)',
                        marginBottom: 4,
                      }}
                    >
                      Término
                    </p>
                    <p style={{ fontFamily: 'var(--type-sans)', fontSize: 14, color: 'var(--bone-dim)' }}>
                      {formatDate(cohort.end_date)}
                    </p>
                  </div>
                )}
                {spotsLeft !== null && (
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--type-mono)',
                        fontSize: 10,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--bone-mute)',
                        marginBottom: 4,
                      }}
                    >
                      Vagas
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--type-sans)',
                        fontSize: 14,
                        color: sold ? 'var(--ember)' : 'var(--bone-dim)',
                      }}
                    >
                      {sold ? 'Esgotadas' : `${spotsLeft} restante${spotsLeft !== 1 ? 's' : ''}`}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Cursos incluídos */}
            {courses.length > 0 && (
              <div>
                <p
                  style={{
                    fontFamily: 'var(--type-mono)',
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--bone-mute)',
                    marginBottom: 20,
                  }}
                >
                  Cursos incluídos
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--hairline)' }}>
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 16,
                        background: 'var(--ink)',
                        padding: '16px 20px',
                      }}
                    >
                      {course.cover_image_url ? (
                        <div
                          style={{
                            position: 'relative',
                            width: 72,
                            height: 48,
                            flexShrink: 0,
                            overflow: 'hidden',
                            background: 'var(--ink-2)',
                          }}
                        >
                          <Image
                            src={course.cover_image_url}
                            alt={course.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="72px"
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            width: 72,
                            height: 48,
                            flexShrink: 0,
                            background: 'var(--ink-2)',
                          }}
                        />
                      )}
                      <div>
                        <p
                          style={{
                            fontFamily: 'var(--type-sans)',
                            fontSize: 14,
                            fontWeight: 500,
                            color: 'var(--bone)',
                            lineHeight: 1.3,
                          }}
                        >
                          {course.title}
                        </p>
                        {course.description && (
                          <p
                            style={{
                              fontFamily: 'var(--type-sans)',
                              fontSize: 12,
                              color: 'var(--bone-mute)',
                              marginTop: 4,
                              lineHeight: 1.5,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {course.description}
                          </p>
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
                <p
                  style={{
                    fontFamily: 'var(--type-mono)',
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--bone-mute)',
                    marginBottom: 16,
                  }}
                >
                  O que está incluído
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, listStyle: 'none', padding: 0, margin: 0 }}>
                  {features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        fontFamily: 'var(--type-sans)',
                        fontSize: 14,
                        color: 'var(--bone-dim)',
                      }}
                    >
                      <Check
                        style={{ width: 14, height: 14, color: 'var(--ember)', flexShrink: 0 }}
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right column — sticky CTA */}
          <div className="lg:sticky lg:top-8 self-start">
            <div
              style={{
                border: '1px solid var(--hairline)',
                background: 'var(--ink)',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              {/* Preço */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--type-mono)',
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--bone-mute)',
                    marginBottom: 8,
                  }}
                >
                  Investimento
                </p>
                <p
                  style={{
                    fontFamily: 'var(--type-display)',
                    fontWeight: 300,
                    fontSize: 36,
                    letterSpacing: '-0.025em',
                    color: 'var(--bone)',
                    lineHeight: 1,
                  }}
                >
                  {formatPrice(cohort.entry_price_cents)}
                </p>
                {cohort.max_installments_entry > 1 && cohort.entry_price_cents && (
                  <p
                    style={{
                      fontFamily: 'var(--type-mono)',
                      fontSize: 10,
                      color: 'var(--bone-mute)',
                      marginTop: 6,
                    }}
                  >
                    em até {cohort.max_installments_entry}x de{' '}
                    {formatPrice(Math.ceil(cohort.entry_price_cents / cohort.max_installments_entry))}
                  </p>
                )}
              </div>

              {/* Barra de vagas */}
              {fillPercent !== null && !sold && (
                <div>
                  <div
                    style={{
                      height: 2,
                      background: 'var(--hairline)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: `${fillPercent}%`,
                        background: 'var(--ember)',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                  {spotsLeft !== null && (
                    <p
                      style={{
                        fontFamily: 'var(--type-mono)',
                        fontSize: 10,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--bone-mute)',
                        marginTop: 8,
                      }}
                    >
                      {spotsLeft} {spotsLeft === 1 ? 'vaga restante' : 'vagas restantes'}
                    </p>
                  )}
                </div>
              )}

              {/* CTA button */}
              {sold ? (
                <button
                  disabled
                  style={{
                    width: '100%',
                    fontFamily: 'var(--type-mono)',
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    padding: '14px 0',
                    border: '1px solid var(--hairline-strong)',
                    background: 'transparent',
                    color: 'var(--bone-mute)',
                    cursor: 'not-allowed',
                  }}
                >
                  Turma esgotada
                </button>
              ) : cohort.is_purchasable ? (
                <Link
                  href={checkoutHref}
                  className="block w-full text-center bg-[var(--ember)] hover:bg-[var(--ember-glow)] transition-colors"
                  style={{
                    color: 'var(--void)',
                    fontFamily: 'var(--type-mono)',
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    padding: '14px 0',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  Matricular-se agora →
                </Link>
              ) : (
                <p
                  style={{
                    textAlign: 'center',
                    fontFamily: 'var(--type-mono)',
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--bone-mute)',
                  }}
                >
                  Inscrições em breve
                </p>
              )}

              {/* Login hint */}
              {!user && cohort.is_purchasable && !sold && (
                <p
                  style={{
                    textAlign: 'center',
                    fontFamily: 'var(--type-mono)',
                    fontSize: 10,
                    color: 'var(--bone-mute)',
                  }}
                >
                  Necessário{' '}
                  <Link
                    href={`/academy/login?next=/academy/checkout/${cohort.slug}`}
                    style={{ color: 'var(--ember)', textDecoration: 'none' }}
                  >
                    fazer login
                  </Link>{' '}
                  para prosseguir
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer simples */}
      <footer
        style={{
          position: 'relative',
          zIndex: 1,
          borderTop: '1px solid var(--hairline)',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--type-mono)',
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--bone-mute)',
          }}
        >
          João Guirunas Academy · {new Date().getFullYear()}
        </span>
      </footer>
    </div>
    </>
  )
}
