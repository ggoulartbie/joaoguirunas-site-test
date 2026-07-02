import Image from 'next/image'

const KV_MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
}

const KV_DISPLAY: React.CSSProperties = {
  fontFamily: 'var(--font-display-serif)',
  fontWeight: 400,
  letterSpacing: '-0.03em',
}

function hexAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

const AGENCY_SITES = [
  {
    slug: 'clinicadorotea',
    name: 'Clínica Dorotea',
    url: 'https://www.clinicadorotea.com.br/',
    value: '+R$5.000',
  },
  {
    slug: 'growthsales',
    name: 'GrowthSales.ai',
    url: 'https://www.growthsales.ai/',
    value: '+R$5.000',
  },
  {
    slug: 'sahaj',
    name: 'Sahaj Landell',
    url: 'https://sahaj.com.br/',
    value: '+R$5.000',
  },
]

const STUDENT_SITES = [
  {
    slug: 'cranium',
    name: 'Cranium Digital',
    url: 'https://craniumdigital.com.br/',
  },
  {
    slug: 'plugaigym',
    name: 'PlugAI Gym',
    url: 'https://www.plugaigym.com.br/',
  },
  {
    slug: 'thementor',
    name: 'The Mentor 360',
    url: 'https://thementor360.com.br/',
  },
]

interface SiteCardProps {
  slug: string
  name: string
  url: string
  value?: string
  accent: string
}

function SiteCard({ slug, name, url, value, accent }: SiteCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative overflow-hidden transition-all duration-300"
      style={{ border: `1px solid ${hexAlpha(accent, 0.14)}` }}
    >
      {/* Screenshot */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Image
          src={`/portfolio/sites/${slug}.jpg`}
          alt={`Screenshot de ${name}`}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `${hexAlpha(accent, 0.12)}` }}
        />
        {/* Hover overlay arrow */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span
            className="flex items-center justify-center w-10 h-10"
            style={{ background: accent, color: '#050507' }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </span>
        </div>
      </div>

      {/* Card footer */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ background: 'rgba(255,255,255,0.025)' }}
      >
        <span className="text-white text-sm font-medium" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.06em' }}>
          {name}
        </span>
        {value && (
          <span
            className="text-[10px] font-bold px-2 py-0.5"
            style={{
              ...KV_MONO,
              fontSize: '9px',
              color: '#050507',
              background: accent,
            }}
          >
            {value}
          </span>
        )}
        {!value && (
          <span style={{ ...KV_MONO, fontSize: '9px', color: hexAlpha(accent, 0.7) }}>
            Aluno
          </span>
        )}
      </div>
    </a>
  )
}

interface SitesPortfolioProps {
  accent?: string
}

export function SitesPortfolio({ accent = '#FF3A0E' }: SitesPortfolioProps) {
  return (
    <section
      className="relative py-16 sm:py-24"
      style={{ background: '#050507' }}
    >
      <div
        className="absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <p className="mb-3" style={{ ...KV_MONO, color: accent }}>
            <span
              className="inline-flex items-center gap-2"
              style={{
                border: `1px solid ${hexAlpha(accent, 0.35)}`,
                background: hexAlpha(accent, 0.08),
                padding: '0.25rem 0.75rem',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
              Prova de trabalho · Sites reais
            </span>
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-white"
            style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
          >
            Sites entregues{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: accent }}>
              com nossa squad
            </span>
          </h2>
        </div>

        {/* Agency sites */}
        <div className="mb-3">
          <p style={{ ...KV_MONO, color: 'rgba(255,255,255,0.35)', marginBottom: '0.875rem' }}>
            Nossos sites · acima de R$5k · feitos em 2 dias
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {AGENCY_SITES.map((site) => (
              <SiteCard key={site.slug} {...site} accent={accent} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 sm:my-10 flex items-center gap-4">
          <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.07)' }} />
          <span style={{ ...KV_MONO, color: 'rgba(255,255,255,0.25)' }}>e nossos alunos</span>
          <span className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.07)' }} />
        </div>

        {/* Student sites */}
        <div>
          <p style={{ ...KV_MONO, color: 'rgba(255,255,255,0.35)', marginBottom: '0.875rem' }}>
            Sites feitos pelos alunos · com a mesma squad
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {STUDENT_SITES.map((site) => (
              <SiteCard key={site.slug} {...site} accent={accent} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
