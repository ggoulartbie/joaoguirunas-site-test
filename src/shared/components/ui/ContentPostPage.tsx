import Link from 'next/link'
import { ExternalLink, Play, Layers, ArrowLeft } from 'lucide-react'
import { ContentPost } from '@/types/content-post'
import { contentPosts } from '@/data/content-posts'
import { RelatedPages } from './RelatedPages'
import { RoteiroToggle } from './RoteiroToggle'
import { LegendaCopyBox } from './LegendaCopyBox'
import { siteConfig } from '@/config/site'

// ── Design tokens ──────────────────────────────────────────────────────────
const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.68rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.12em',
  fontWeight: 500,
}

const EYEBROW: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.16em',
  fontWeight: 500,
  color: 'rgba(255,58,14,0.8)',
}

// ── Helpers ────────────────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function isPendente(link: string): boolean {
  return link === 'PENDENTE' || link.startsWith('PENDENTE:')
}

function getRelatedPosts(current: ContentPost, all: ContentPost[], max = 3): ContentPost[] {
  const currentDate = new Date(current.data).getTime()

  const samePilar = all
    .filter((p) => p.slug !== current.slug && p.pilar === current.pilar)
    .sort((a, b) => {
      const diffA = Math.abs(new Date(a.data).getTime() - currentDate)
      const diffB = Math.abs(new Date(b.data).getTime() - currentDate)
      return diffA - diffB
    })
    .slice(0, max)

  if (samePilar.length >= max) return samePilar

  // Fill with nearest by date from any pilar
  const remaining = all
    .filter((p) => p.slug !== current.slug && !samePilar.find((s) => s.slug === p.slug))
    .sort((a, b) => {
      const diffA = Math.abs(new Date(a.data).getTime() - currentDate)
      const diffB = Math.abs(new Date(b.data).getTime() - currentDate)
      return diffA - diffB
    })
    .slice(0, max - samePilar.length)

  return [...samePilar, ...remaining]
}

// ── JSON-LD ────────────────────────────────────────────────────────────────
function generateJsonLd(post: ContentPost) {
  const hashtags = (post.legenda.match(/#\w+/g) ?? []).map((h: string) => h.replace('#', ''))
  const canonicalUrl = `${siteConfig.url}/open-source/${post.slug}/`

  const socialMediaSchema = {
    '@context': 'https://schema.org',
    '@type': 'SocialMediaPosting',
    headline: post.titulo,
    datePublished: post.data,
    author: { '@type': 'Person', name: 'João Guirunas' },
    keywords: hashtags.join(', '),
    url: canonicalUrl,
    ...(!isPendente(post.link) && {
      about: {
        '@type': 'Thing',
        name: post.ferramenta,
        url: post.link,
      },
    }),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Open Source', item: `${siteConfig.url}/open-source/` },
      { '@type': 'ListItem', position: 3, name: post.titulo, item: canonicalUrl },
    ],
  }

  return { socialMediaSchema, breadcrumbSchema }
}

// ── Component ──────────────────────────────────────────────────────────────
interface ContentPostPageProps {
  post: ContentPost
}

export function ContentPostPage({ post }: ContentPostPageProps) {
  const { socialMediaSchema, breadcrumbSchema } = generateJsonLd(post)
  const pendente = isPendente(post.link)
  const related = getRelatedPosts(post, contentPosts)
  const formattedDate = formatDate(post.data)

  const relatedPages = related.map((r) => ({
    href: `/open-source/${r.slug}/`,
    title: r.titulo,
    description: `${r.formato} · ${formatDate(r.data)}`,
    tag: r.formato,
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(socialMediaSchema) }}
      />

      {/* ── Seção 1: Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#050507' }}
      >
        {/* Subtle radial gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 20% 50%, rgba(255,58,14,0.05) 0%, transparent 55%)',
          }}
          aria-hidden="true"
        />

        <div className="relative w-full mx-auto max-w-6xl px-5 sm:px-10 lg:px-[140px] py-10 sm:py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-7 sm:mb-10">
            <ol
              className="flex items-center gap-2 flex-wrap"
              style={{ ...MONO, color: 'rgba(255,255,255,0.35)' }}
            >
              <li>
                <Link href="/" className="transition-colors hover:text-white/70">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" style={{ color: 'rgba(255,255,255,0.2)' }}>/</li>
              <li>
                <Link href="/open-source" className="transition-colors hover:text-white/70">
                  Open Source
                </Link>
              </li>
              <li aria-hidden="true" style={{ color: 'rgba(255,255,255,0.2)' }}>/</li>
              <li
                className="truncate max-w-[160px] sm:max-w-none"
                style={{ color: '#FF3A0E' }}
                aria-current="page"
              >
                {post.titulo}
              </li>
            </ol>
          </nav>

          {/* Badge row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
            {/* Format badge */}
            {post.formato === 'Reel' ? (
              <span
                className="inline-flex items-center gap-1.5"
                style={{
                  ...MONO,
                  fontSize: 9,
                  letterSpacing: '0.16em',
                  color: '#A78BFA',
                  border: '1px solid rgba(167,139,250,0.35)',
                  background: 'rgba(167,139,250,0.08)',
                  padding: '4px 10px',
                }}
              >
                <Play className="h-3 w-3" fill="currentColor" aria-hidden="true" />
                REEL
              </span>
            ) : (
              <span
                className="inline-flex items-center gap-1.5"
                style={{
                  ...MONO,
                  fontSize: 9,
                  letterSpacing: '0.16em',
                  color: '#0EA5E9',
                  border: '1px solid rgba(14,165,233,0.35)',
                  background: 'rgba(14,165,233,0.08)',
                  padding: '4px 10px',
                }}
              >
                <Layers className="h-3 w-3" aria-hidden="true" />
                CARROSSEL
              </span>
            )}

            {/* Pilar badge */}
            <span
              style={{
                ...MONO,
                fontSize: 9,
                letterSpacing: '0.16em',
                color: 'rgba(255,255,255,0.3)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '4px 10px',
              }}
            >
              {post.pilar}
            </span>

            {/* Date */}
            <span
              style={{
                ...MONO,
                fontSize: 11,
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              · {formattedDate}
            </span>
          </div>

          {/* H1 */}
          <h1
            className="font-[family-name:var(--font-display-serif)] font-[400] text-white leading-[0.92] tracking-[-0.03em] mb-5 max-w-2xl"
            style={{ fontSize: 'clamp(28px, 5.5vw, 64px)' }}
          >
            {post.titulo}
          </h1>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            {pendente ? (
              /* "Em breve" badge when link is PENDENTE */
              <span
                aria-disabled="true"
                role="status"
                style={{
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.12em',
                  fontWeight: 500,
                  fontSize: 13,
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.3)',
                  cursor: 'default',
                  padding: '12px 20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  minHeight: '44px',
                }}
              >
                Em breve
              </span>
            ) : (
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-[0.98] min-h-[44px] w-full sm:w-auto"
                style={{
                  background: '#FF3A0E',
                  color: '#050507',
                  padding: '12px 20px',
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                }}
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                {post.ferramenta}
              </a>
            )}

            <Link
              href="/open-source"
              className="inline-flex items-center justify-center gap-2 transition-all hover:bg-white/5 min-h-[44px] w-full sm:w-auto"
              style={{
                border: '1px solid rgba(255,255,255,0.16)',
                color: 'rgba(255,255,255,0.65)',
                padding: '12px 16px',
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: '-0.01em',
              }}
              aria-label="Voltar para Open Source"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Voltar
            </Link>
          </div>
        </div>
      </section>

      {/* ── Seção 2: Roteiro (Client Component) ───────────────────────── */}
      <RoteiroToggle
        roteiro={post.roteiro}
        formato={post.formato}
        duracao={post.duracao}
      />

      {/* ── Seção 3: Legenda (Client Component) ───────────────────────── */}
      <LegendaCopyBox legenda={post.legenda} />

      {/* ── Seção 4: CTA Engajamento ───────────────────────────────────── */}
      <section
        className="py-12 sm:py-16"
        style={{
          background: '#16161a',
          borderTop: '1px solid rgba(255,255,255,0.16)',
        }}
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-10 lg:px-[140px]">
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 sm:p-8"
            style={{
              background: '#16161a',
              border: '1px solid rgba(255,255,255,0.16)',
            }}
          >
            <div>
              <p className="mb-2" style={EYEBROW}>
                Engajamento
              </p>
              <p
                id="cta-heading"
                className="text-base sm:text-lg font-semibold text-white tracking-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                Comenta{' '}
                <span style={{ color: '#FF3A0E' }}>{post.keyword_cta}</span>
                {' '}no post original
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Seção 5: Related Pages ─────────────────────────────────────── */}
      {relatedPages.length > 0 && (
        <RelatedPages
          heading={`Mais posts · ${post.pilar}`}
          pages={relatedPages}
        />
      )}
    </>
  )
}
