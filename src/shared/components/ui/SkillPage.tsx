import Image from 'next/image';
import Link from 'next/link';
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
  author?: string;
  authorUrl?: string;
  bgImage?: string;
  bgPosition?: string;
  canonicalPath: string;
  children?: React.ReactNode;
}

const categoryColors: Record<string, string> = {
  'squads-aiox': 'bg-[#FF4400]/20 text-[#FF4400] border-[#FF4400]/30',
  produtividade: 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]/30',
  marketing: 'bg-[#A78BFA]/20 text-[#A78BFA] border-[#A78BFA]/30',
  aprendizado: 'bg-[#06B6D4]/20 text-[#06B6D4] border-[#06B6D4]/30',
  skills: 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]/30',
  apps: 'bg-[#A78BFA]/20 text-[#A78BFA] border-[#A78BFA]/30',
  squads: 'bg-[#FF4400]/20 text-[#FF4400] border-[#FF4400]/30',
  integracoes: 'bg-[#0EA5E9]/20 text-[#0EA5E9] border-[#0EA5E9]/30',
};

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
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
      { '@type': 'ListItem', position: 2, name: 'Skills', item: `${siteConfig.url}/#skills` },
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
    ...(author && { author: { '@type': 'Person', name: author.replace('@', '') } }),
    ...(primaryLink && { url: primaryLink }),
  };

  return { breadcrumbSchema, softwareSchema };
}

export function SkillPage({
  title,
  description,
  category,
  categoryColor,
  longDescription,
  features,
  primaryLink,
  primaryLabel = 'Ver no GitHub',
  isExternal = false,
  author,
  authorUrl,
  bgImage,
  bgPosition = 'center 30%',
  canonicalPath,
  children,
}: SkillPageProps) {
  const colorClass = categoryColors[categoryColor] ?? categoryColors['squads-aiox']!;
  const { breadcrumbSchema, softwareSchema } = generateSkillJsonLd({
    title,
    description,
    canonicalPath,
    author,
    primaryLink,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[50vh] flex items-center">
        {bgImage ? (
          <>
            <Image
              src={bgImage}
              alt=""
              fill
              className="object-cover"
              style={{ objectPosition: bgPosition }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#08080C]/80 via-[#08080C]/40 to-[#08080C]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080C]/80 via-transparent to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D14] via-[#08080C] to-[#0A0A10]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FF4400]/8 via-transparent to-transparent" />
          </>
        )}

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 w-full">
          {/* [FIX A11Y-003] Breadcrumb com aria-label */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol
              className="flex items-center gap-2 text-white/60"
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-white/30" aria-hidden="true">
                /
              </li>
              <li>
                <Link href="/#skills" className="hover:text-white transition-colors">
                  Skills
                </Link>
              </li>
              <li className="text-white/30" aria-hidden="true">
                /
              </li>
              <li className="text-[#FF4400]" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>

          {/* Category Badge */}
          <div
            className={`inline-flex items-center border px-3 py-1 mb-6 ${colorClass}`}
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 600,
            }}
          >
            {category}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl max-w-3xl glow-text">
            {title}
          </h1>

          {/* Author Badge */}
          {author && (
            <div className="mt-5 flex items-center gap-2">
              {authorUrl ? (
                <a
                  href={authorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/15 bg-white/10 backdrop-blur-sm px-4 py-2 text-white hover:bg-white/20 hover:border-white/25 transition-all"
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 500,
                  }}
                >
                  <GitHubIcon className="h-3.5 w-3.5 text-[#FF4400]" />
                  <span>{author}</span>
                </a>
              ) : (
                <span
                  className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 text-white/70"
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 500,
                  }}
                >
                  <svg
                    className="h-3.5 w-3.5 text-[#FF4400]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>{author}</span>
                </span>
              )}
            </div>
          )}

          {/* Description */}
          <p className="mt-4 text-xl text-white/60 max-w-2xl leading-relaxed">
            {description}
          </p>

          {/* CTA Buttons */}
          {primaryLink && (
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={primaryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 bg-[#FF4400] px-6 py-3 text-sm text-white shadow-lg shadow-[#FF4400]/25 hover:bg-[#FF5C10] hover:shadow-[#FF4400]/40 transition-all"
              >
                {isExternal ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                ) : (
                  <GitHubIcon className="h-4 w-4" />
                )}
                {primaryLabel}
              </a>
              <Link
                href="/#skills"
                className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-6 py-3 text-white hover:bg-white/10 transition-all"
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: 500,
                }}
                aria-label="Voltar para lista de skills"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Voltar
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* O que e */}
      <section className="py-20 bg-[#0A0A0F]" aria-labelledby="what-is-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p
              className="text-[#FF4400] mb-3"
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontWeight: 600,
              }}
            >
              O que e
            </p>
            <h2 id="what-is-heading" className="text-3xl font-bold text-white sm:text-4xl mb-8">
              {title}
            </h2>
            <div className="space-y-6">
              {longDescription.map((paragraph, i) => (
                <p key={i} className="text-lg text-white/60 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-20 bg-[#08080C]" aria-labelledby="features-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p
              className="text-[#FF4400] mb-3"
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontWeight: 600,
              }}
            >
              Como funciona
            </p>
            <h2 id="features-heading" className="text-3xl font-bold text-white sm:text-4xl">
              Principais recursos
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <div key={i} className="glass-card p-6">
                <div className="mb-4 inline-flex items-center justify-center bg-[#FF4400]/10 p-3 text-[#FF4400]">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: feature.icon }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                {/* [FIX A11Y-014] Aumentado de white/50 para white/60 */}
                <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Content */}
      {children}

      {/* CTA Final */}
      <section className="py-20 bg-[#0A0A0F]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0D0D14] via-[#0A0A10] to-[#08080C] border border-white/[0.10] p-8 sm:p-12 text-center">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#FF4400]/10 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white sm:text-3xl glow-text">
                Comece agora
              </h2>
              {/* [FIX A11Y-014] Aumentado de white/50 para white/60 */}
              <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">
                Explore o repositorio, contribua com melhorias ou integre na sua operacao.
              </p>

              {primaryLink && (
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a
                    href={primaryLink}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="btn-primary inline-flex items-center gap-2 bg-[#FF4400] px-6 py-3 text-sm text-white shadow-lg shadow-[#FF4400]/25 hover:bg-[#FF5C10] transition-all"
                  >
                    {primaryLabel}
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
