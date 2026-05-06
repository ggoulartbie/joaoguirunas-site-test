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

      {/* Nav simples */}
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
            maxWidth: 900,
            margin: '0 auto',
            padding: '0 24px',
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Image src="/images/brand/logo-symbol.svg" alt="João Guirunas" width={28} height={24} />
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
              transition: 'color 0.15s',
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
          {/* Eyebrow */}
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

          {/* Título */}
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

          {/* Subtítulo */}
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

          {/* CTA */}
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
              transition: 'background 0.15s',
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
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: 'var(--type-mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--bone-mute)',
              marginBottom: 40,
            }}
          >
            Turmas disponíveis
          </div>

          {/* Grid */}
          {list.length === 0 ? (
            <EmptyState />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--hairline)' }}>
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
                    style={{
                      background: 'var(--ink)',
                      padding: '40px 36px',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = 'var(--ink-2)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'var(--ink)')}
                  >
                    {/* Badge */}
                    <div
                      style={{
                        fontFamily: 'var(--type-mono)',
                        fontSize: 10,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: badge.isOpen ? 'var(--ember)' : 'var(--bone-mute)',
                        marginBottom: 16,
                      }}
                    >
                      {badge.label}
                    </div>

                    {/* Nome */}
                    <h3
                      style={{
                        fontFamily: 'var(--type-sans)',
                        fontSize: 22,
                        fontWeight: 500,
                        color: 'var(--bone)',
                        marginBottom: 10,
                      }}
                    >
                      {cohort.name}
                    </h3>

                    {/* Descrição */}
                    {cohort.description && (
                      <p
                        style={{
                          fontFamily: 'var(--type-sans)',
                          fontSize: 14,
                          color: 'var(--bone-dim)',
                          fontWeight: 300,
                          lineHeight: 1.6,
                          marginBottom: 20,
                        }}
                      >
                        {cohort.description}
                      </p>
                    )}

                    {/* Datas */}
                    {dateRange && (
                      <div
                        style={{
                          fontFamily: 'var(--type-mono)',
                          fontSize: 10,
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: 'var(--bone-mute)',
                          marginBottom: 20,
                        }}
                      >
                        {dateRange}
                      </div>
                    )}

                    {/* Preço */}
                    <div style={{ marginBottom: 20, display: 'flex', alignItems: 'baseline', gap: 10 }}>
                      <span
                        style={{
                          fontFamily: 'var(--type-display)',
                          fontWeight: 300,
                          fontSize: 32,
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
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: 'var(--bone-mute)',
                        }}
                      >
                        / entrada
                      </span>
                    </div>

                    {/* Barra de vagas */}
                    {fillPercent !== null && !sold && (
                      <div style={{ marginBottom: 24 }}>
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
                          <div
                            style={{
                              fontFamily: 'var(--type-mono)',
                              fontSize: 10,
                              letterSpacing: '0.18em',
                              textTransform: 'uppercase',
                              color: 'var(--bone-mute)',
                              marginTop: 8,
                            }}
                          >
                            {spotsLeft} {spotsLeft === 1 ? 'vaga restante' : 'vagas restantes'}
                          </div>
                        )}
                      </div>
                    )}

                    {/* CTA */}
                    {sold ? (
                      <button
                        disabled
                        style={{
                          fontFamily: 'var(--type-mono)',
                          fontSize: 11,
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          padding: '14px 24px',
                          border: '1px solid var(--hairline-strong)',
                          background: 'transparent',
                          color: 'var(--bone-mute)',
                          cursor: 'not-allowed',
                          borderRadius: 0,
                        }}
                      >
                        Lista de espera
                      </button>
                    ) : (
                      <Link
                        href={checkoutHref}
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
                          padding: '14px 24px',
                          textDecoration: 'none',
                          fontWeight: 500,
                          borderRadius: 0,
                        }}
                      >
                        Garantir vaga →
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

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
  )
}

function EmptyState() {
  return (
    <div
      style={{
        border: '1px solid var(--hairline)',
        background: 'var(--ink)',
        padding: '80px 40px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--type-mono)',
          fontSize: 10,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--bone-mute)',
          marginBottom: 20,
        }}
      >
        Em breve
      </div>
      <p
        style={{
          fontFamily: 'var(--type-sans)',
          fontSize: 18,
          fontWeight: 400,
          color: 'var(--bone-dim)',
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
