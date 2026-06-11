import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/config/site';

export interface SkillFeature {
  title: string;
  description: string;
  icon: string;
}

export interface SkillPageProps {
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  longDescription: string[];
  features: SkillFeature[];
  primaryLink?: string;
  primaryLabel?: string;
  isExternal?: boolean;
  showMentoria?: boolean;
  author?: string;
  authorUrl?: string;
  bgImage?: string;
  bgPosition?: string;
  canonicalPath: string;
  children?: React.ReactNode;
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export function generateSkillJsonLd({
  title,
  description,
  canonicalPath,
  author,
  primaryLink,
}: Pick<SkillPageProps, 'title' | 'description' | 'canonicalPath' | 'author' | 'primaryLink'>) {
  const canonicalURL = `${siteConfig.url}${canonicalPath}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Open Source', item: `${siteConfig.url}/open-source` },
      { '@type': 'ListItem', position: 3, name: title, item: canonicalURL },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: title,
    description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    ...(author && { author: { '@type': 'Person', name: 'João Guirunas' } }),
    ...(primaryLink && { url: primaryLink }),
  };

  return { breadcrumbSchema, softwareSchema };
}

const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.68rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  fontWeight: 500,
};

const EYEBROW: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.16em',
  fontWeight: 500,
  color: 'rgba(255,58,14,0.8)',
};

export function SkillPage({
  title,
  description,
  category,
  longDescription,
  features,
  primaryLink,
  primaryLabel = 'Ver no GitHub',
  isExternal = false,
  showMentoria = false,
  author,
  authorUrl,
  bgImage,
  bgPosition = 'center 30%',
  canonicalPath,
  children,
}: SkillPageProps) {
  const { breadcrumbSchema, softwareSchema } = generateSkillJsonLd({
    title,
    description,
    canonicalPath,
    author,
    primaryLink,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden flex items-end min-h-fit sm:min-h-[52vh]">
        {bgImage ? (
          <>
            <Image
              src={bgImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: bgPosition }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/85 via-[#050507]/50 to-[#050507]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/30 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0" style={{ background: '#050507' }}>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(255,58,14,0.06) 0%, transparent 60%)' }} />
          </div>
        )}

        <div className="relative w-full mx-auto max-w-6xl px-5 sm:px-10 lg:px-[140px] py-10 sm:py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-7 sm:mb-10">
            <ol className="flex items-center gap-2 flex-wrap" style={{ ...MONO, color: 'rgba(255,255,255,0.35)' }}>
              <li>
                <Link href="/" className="transition-colors hover:text-white/70">Home</Link>
              </li>
              <li aria-hidden="true" style={{ color: 'rgba(255,255,255,0.2)' }}>/</li>
              <li>
                <Link href="/open-source" className="transition-colors hover:text-white/70">Open Source</Link>
              </li>
              <li aria-hidden="true" style={{ color: 'rgba(255,255,255,0.2)' }}>/</li>
              <li className="truncate max-w-[160px] sm:max-w-none" style={{ color: '#FF3A0E' }} aria-current="page">{title}</li>
            </ol>
          </nav>

          {/* Category + author row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              style={{
                ...MONO,
                color: '#FF3A0E',
                border: '1px solid rgba(255,58,14,0.3)',
                padding: '4px 10px',
              }}
            >
              {category}
            </span>
            {author && (
              <>
                {authorUrl ? (
                  <a
                    href={authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-white/70"
                    style={{
                      ...MONO,
                      color: 'rgba(255,255,255,0.4)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      padding: '4px 10px',
                    }}
                  >
                    <GitHubIcon className="h-3 w-3" />
                    {author}
                  </a>
                ) : (
                  <span
                    style={{
                      ...MONO,
                      color: 'rgba(255,255,255,0.35)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      padding: '4px 10px',
                    }}
                  >
                    {author}
                  </span>
                )}
              </>
            )}
          </div>

          {/* H1 — Fraunces Display */}
          <h1
            className="font-[family-name:var(--font-display-serif)] font-[400] text-white leading-[0.92] tracking-[-0.03em] mb-6 max-w-3xl"
            style={{ fontSize: 'clamp(34px, 7vw, 80px)' }}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className="max-w-2xl leading-relaxed mb-8 sm:mb-10 text-base sm:text-[1.1rem]"
            style={{ color: 'rgba(255,255,255,0.65)', letterSpacing: '-0.005em' }}
          >
            {description}
          </p>

          {/* CTA buttons */}
          {primaryLink && (
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href={primaryLink}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-[0.98] min-h-[44px]"
                style={{
                  background: '#FF3A0E',
                  color: '#050507',
                  padding: '12px 20px',
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                }}
              >
                {isExternal ? <ExternalLink className="h-4 w-4" /> : <GitHubIcon className="h-4 w-4" />}
                {primaryLabel}
              </a>
              {showMentoria && (
                <Link
                  href="/mentoria"
                  className="inline-flex items-center justify-center gap-2 transition-all hover:brightness-110 min-h-[44px]"
                  style={{
                    border: '1px solid rgba(255,58,14,0.45)',
                    color: 'rgba(255,58,14,0.9)',
                    background: 'rgba(255,58,14,0.06)',
                    padding: '12px 16px',
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                  }}
                >
                  Mentoria
                </Link>
              )}
              <Link
                href="/open-source"
                className="inline-flex items-center justify-center gap-2 transition-all hover:bg-white/5 min-h-[44px]"
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
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── O que é ── */}
      <section className="py-14 sm:py-20 lg:py-24" style={{ background: '#050507' }} aria-labelledby="what-is-heading">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 lg:px-[140px]">
          <div className="max-w-3xl">
            <p className="mb-4" style={EYEBROW}>O que é</p>
            <h2
              id="what-is-heading"
              className="text-2xl sm:text-3xl font-semibold text-white mb-8 tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              {title}
            </h2>
            <div className="space-y-5">
              {longDescription.map((paragraph, i) => (
                <p key={i} className="text-base sm:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section
        className="py-14 sm:py-20 lg:py-24"
        style={{ background: '#0e0e11', borderTop: '1px solid rgba(255,255,255,0.07)' }}
        aria-labelledby="features-heading"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-10 lg:px-[140px]">
          <div className="mb-10 sm:mb-14">
            <p className="mb-3" style={EYEBROW}>Como funciona</p>
            <h2
              id="features-heading"
              className="text-2xl sm:text-3xl font-semibold text-white tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Principais recursos
            </h2>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gap: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {features.map((feature, i) => (
              <div key={i} className="flex flex-col p-6" style={{ background: '#0e0e11' }}>
                {/* Icon */}
                <div
                  className="mb-5 inline-flex items-center justify-center w-9 h-9 flex-shrink-0"
                  style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.45)' }}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: feature.icon }}
                  />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Extra Content ── */}
      {children}

      {/* ── CTA Final — KV ctaSplit pattern ── */}
      {primaryLink && (
        <section
          className="py-12 sm:py-16 lg:py-20"
          style={{ background: '#050507', borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-10 lg:px-[140px]">
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 sm:p-8 lg:p-10"
              style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.16)' }}
            >
              <div>
                <p className="mb-2" style={EYEBROW}>Comece agora</p>
                <p className="text-base sm:text-lg font-semibold text-white tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                  Explore o repositório, contribua ou integre na sua operação.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full sm:w-auto sm:flex-shrink-0">
                {showMentoria && (
                  <Link
                    href="/mentoria"
                    className="inline-flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-[0.98] min-h-[44px]"
                    style={{
                      background: '#FF3A0E',
                      color: '#050507',
                      padding: '12px 20px',
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Conhecer a Mentoria
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
                <a
                  href={primaryLink}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center justify-center gap-2 transition-all hover:bg-white/5 min-h-[44px]"
                  style={{
                    border: '1px solid rgba(255,255,255,0.16)',
                    color: showMentoria ? 'rgba(255,255,255,0.55)' : '#050507',
                    background: showMentoria ? 'transparent' : '#FF3A0E',
                    padding: '12px 20px',
                    fontSize: 14,
                    fontWeight: showMentoria ? 500 : 600,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {primaryLabel}
                  {!showMentoria && <ArrowRight className="h-4 w-4" />}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
