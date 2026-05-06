import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export const metadata: Metadata = {
  title: 'Turmas disponíveis',
  description: 'Conheça as turmas abertas e garanta sua vaga.',
}

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
    return { label: 'Esgotada', isOpen: false }
  }
  if (status === 'OPEN') {
    return { label: 'Vagas abertas', isOpen: true }
  }
  if (status === 'IN_PROGRESS') {
    return { label: 'Em andamento', isOpen: true }
  }
  return { label: status, isOpen: false }
}

export default async function TurmasPage() {
  const { data: cohorts } = await supabaseAdmin
    .from('cohorts')
    .select('id, slug, name, description, cover_image_url, status, start_date, end_date, total_seats, filled_seats, entry_price_cents, extension_price_cents')
    .eq('is_purchasable', true)
    .in('status', PURCHASABLE_STATUSES)
    .order('start_date', { ascending: true })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const list = (cohorts ?? []) as CohortRow[]

  return (
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
            maxWidth: 1040,
            margin: '0 auto',
            padding: '0 24px',
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Image src="/images/brand/symbol-official.svg" alt="João Guirunas" width={28} height={24} />
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
      </nav>

      {/* Hero */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <div
            style={{
              fontFamily: 'var(--type-mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--bone-mute)',
              marginBottom: 32,
            }}
          >
            Academy · Turmas abertas
          </div>
          <h1
            style={{
              fontFamily: 'var(--type-display)',
              fontWeight: 300,
              fontSize: 'clamp(64px, 8vw, 96px)',
              letterSpacing: '-0.025em',
              lineHeight: 0.95,
              color: 'var(--bone)',
              marginBottom: 28,
            }}
          >
            Aprenda com<br />
            quem{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>opera.</em>
          </h1>
          <p
            style={{
              fontFamily: 'var(--type-display)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 20,
              color: 'var(--bone-dim)',
              lineHeight: 1.5,
              marginBottom: 40,
            }}
          >
            Turmas com vagas limitadas. Conteúdo real de quem usa IA em negócios todo dia.
          </p>
          <a
            href="#turmas"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: 'var(--ember)',
              color: 'var(--void)',
              fontFamily: 'var(--type-mono)',
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '14px 28px',
              textDecoration: 'none',
              fontWeight: 500,
              borderRadius: 0,
            }}
          >
            Ver turmas disponíveis →
          </a>
        </div>
      </section>

      {/* Turmas section */}
      <section
        id="turmas"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '80px 24px 120px',
        }}
      >
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <p
              style={{
                fontFamily: 'var(--type-mono)',
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--bone-mute)',
                marginBottom: 12,
              }}
            >
              Turmas disponíveis
            </p>
            <h2
              style={{
                fontFamily: 'var(--type-display)',
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(28px, 4vw, 36px)',
                letterSpacing: '-0.02em',
                color: 'var(--bone)',
              }}
            >
              Escolha sua turma
            </h2>
            {list.length > 0 && (
              <p
                style={{
                  fontFamily: 'var(--type-sans)',
                  fontSize: 14,
                  color: 'var(--bone-mute)',
                  marginTop: 8,
                }}
              >
                {list.length} {list.length === 1 ? 'turma disponível' : 'turmas disponíveis'}
              </p>
            )}
          </div>

          {/* Grid */}
          {list.length === 0 ? (
            <TurmasEmptyState />
          ) : (
            <div
              className="grid gap-px sm:grid-cols-2 xl:grid-cols-3"
              style={{ background: 'var(--hairline)' }}
            >
              {list.map((cohort) => {
                const spotsLeft = cohort.total_seats !== null
                  ? cohort.total_seats - cohort.filled_seats
                  : null
                const badge = statusBadge(cohort.status, spotsLeft)
                const sold = spotsLeft !== null && spotsLeft === 0
                const checkoutHref = user
                  ? `/academy/checkout/${cohort.slug}`
                  : `/academy/login?next=/academy/checkout/${cohort.slug}`

                const dateRange = cohort.start_date || cohort.end_date
                  ? [formatDate(cohort.start_date), formatDate(cohort.end_date)]
                      .filter(Boolean)
                      .join(' – ')
                  : null

                const fillPercent = cohort.total_seats && cohort.total_seats > 0
                  ? Math.round((cohort.filled_seats / cohort.total_seats) * 100)
                  : null

                return (
                  <div
                    key={cohort.id}
                    className="group flex flex-col border border-[var(--hairline)] hover:border-[var(--hairline-strong)] transition-colors"
                    style={{
                      background: 'var(--ink)',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        aspectRatio: '16/9',
                        background: 'var(--ink-2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {cohort.cover_image_url ? (
                        <Image
                          src={cohort.cover_image_url}
                          alt={cohort.name}
                          fill
                          className="object-cover opacity-70"
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                      ) : (
                        <BookOpen
                          style={{ width: 32, height: 32, color: 'rgba(132,132,140,0.3)' }}
                        />
                      )}
                    </div>

                    {/* Body */}
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Badge status */}
                      <span
                        style={{
                          display: 'inline-block',
                          fontFamily: 'var(--type-mono)',
                          fontSize: 10,
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          border: badge.isOpen
                            ? '1px solid rgba(255,58,14,0.3)'
                            : '1px solid var(--hairline)',
                          color: badge.isOpen ? 'var(--ember)' : 'var(--bone-mute)',
                          padding: '2px 8px',
                          alignSelf: 'flex-start',
                        }}
                      >
                        {badge.label}
                      </span>

                      {/* Nome */}
                      <p
                        style={{
                          fontFamily: 'var(--type-sans)',
                          fontWeight: 500,
                          fontSize: 16,
                          color: 'var(--bone)',
                          marginTop: 8,
                          lineHeight: 1.3,
                        }}
                      >
                        {cohort.name}
                      </p>

                      {/* Descrição */}
                      {cohort.description && (
                        <p
                          style={{
                            fontFamily: 'var(--type-sans)',
                            fontSize: 13,
                            color: 'var(--bone-dim)',
                            marginTop: 4,
                            lineHeight: 1.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {cohort.description}
                        </p>
                      )}

                      {/* Preço */}
                      <div style={{ marginTop: 12, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                        <span
                          style={{
                            fontFamily: 'var(--type-display)',
                            fontWeight: 300,
                            fontSize: 24,
                            color: 'var(--bone)',
                            letterSpacing: '-0.025em',
                          }}
                        >
                          {formatPrice(cohort.entry_price_cents)}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--type-mono)',
                            fontSize: 10,
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--bone-mute)',
                          }}
                        >
                          entrada
                        </span>
                      </div>

                      {/* Barra de vagas */}
                      {fillPercent !== null && !sold && (
                        <div style={{ marginTop: 12 }}>
                          <div
                            style={{
                              height: 2,
                              background: 'var(--ink-3)',
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
                                marginTop: 6,
                              }}
                            >
                              {spotsLeft} {spotsLeft === 1 ? 'vaga restante' : 'vagas restantes'}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Card footer */}
                    <div
                      style={{
                        borderTop: '1px solid var(--hairline)',
                        padding: '12px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--type-mono)',
                          fontSize: 11,
                          color: 'var(--bone-mute)',
                        }}
                      >
                        {dateRange ?? '—'}
                      </span>
                      {sold ? (
                        <span
                          style={{
                            fontFamily: 'var(--type-mono)',
                            fontSize: 11,
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--bone-mute)',
                          }}
                        >
                          Esgotada
                        </span>
                      ) : (
                        <Link
                          href={checkoutHref}
                          style={{
                            fontFamily: 'var(--type-mono)',
                            fontSize: 11,
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--ember)',
                            textDecoration: 'none',
                          }}
                        >
                          Ver turma →
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
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
  )
}

function TurmasEmptyState() {
  return (
    <div
      style={{
        border: '1px solid var(--hairline)',
        background: 'var(--ink)',
        padding: '80px 40px',
        textAlign: 'center',
      }}
    >
      <BookOpen
        style={{ width: 48, height: 48, color: 'rgba(132,132,140,0.3)', margin: '0 auto 20px' }}
      />
      <p
        style={{
          fontFamily: 'var(--type-sans)',
          fontSize: 16,
          color: 'var(--bone-mute)',
          marginBottom: 8,
        }}
      >
        Nenhuma turma aberta no momento.
      </p>
      <p
        style={{
          fontFamily: 'var(--type-sans)',
          fontSize: 14,
          color: 'var(--bone-mute)',
          fontWeight: 300,
          marginBottom: 32,
        }}
      >
        Cadastre-se para ser avisado quando abrirmos novas turmas.
      </p>
      <Link
        href="/academy/cadastro"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--ember)',
          color: 'var(--void)',
          fontFamily: 'var(--type-mono)',
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          padding: '14px 24px',
          textDecoration: 'none',
          fontWeight: 500,
          borderRadius: 0,
        }}
      >
        Criar conta →
      </Link>
    </div>
  )
}
