import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { ALL_AGENTES, getAgenteBySlug, getSquad, getSiblings, type SquadId } from '@/data/agentes';
import { AgentCard } from '../../_components/AgentCard';

const KV_DISPLAY: React.CSSProperties = { fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.03em' };
const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.14em' };

interface AgentPageParams {
  params: Promise<{ squad: string; agent: string }>;
}

const SQUAD_IDS: SquadId[] = ['dev', 'sites', 'social', 'traffic'];

function isValidSquad(s: string): s is SquadId {
  return (SQUAD_IDS as string[]).includes(s);
}

export async function generateStaticParams() {
  return ALL_AGENTES.map((a) => ({ squad: a.squad, agent: a.slug }));
}

export async function generateMetadata({ params }: AgentPageParams): Promise<Metadata> {
  const { squad, agent } = await params;
  if (!isValidSquad(squad)) return {};
  const a = getAgenteBySlug(squad, agent);
  if (!a) return {};

  const title = `${a.codename || a.name} — ${a.title || a.id} | Claude Agent Teams`;
  const description = a.squadRole || a.description.slice(0, 160);

  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/agentes/${a.squad}/${a.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/agentes/${a.squad}/${a.slug}`,
      type: 'profile',
    },
  };
}

export default async function AgentDetailPage({ params }: AgentPageParams) {
  const { squad, agent } = await params;
  if (!isValidSquad(squad)) notFound();

  const a = getAgenteBySlug(squad, agent);
  const sq = getSquad(squad);
  if (!a || !sq) notFound();

  const siblings = getSiblings(a, 4);

  const profileJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: a.codename || a.name,
      alternateName: a.id,
      description: a.squadRole || a.description,
      jobTitle: a.title,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }} />

      {/* HERO */}
      <section
        className="relative overflow-hidden -mt-16 pt-32 pb-16 sm:pt-40 sm:pb-20"
        style={{
          background: `
            radial-gradient(ellipse at 70% 40%, ${sq.accent}1a 0%, transparent 50%),
            linear-gradient(to bottom, #050507, #0a0a0d)
          `,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm" style={MONO} aria-label="Breadcrumb">
            <Link href="/agentes" className="text-white/50 hover:text-white uppercase">Agentes</Link>
            <span className="text-white/30">/</span>
            <Link href={`/agentes#squad-${sq.id}`} className="uppercase hover:opacity-80" style={{ color: sq.accent }}>
              {sq.label}
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80 uppercase">{a.id}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start">
            {/* Agent photo */}
            <div
              className="aspect-square w-full max-w-[280px] mx-auto lg:mx-0 relative overflow-hidden border"
              style={{ borderColor: `${sq.accent}33` }}
            >
              <Image
                src={`/agentes/${a.slug}.png`}
                alt={a.codename || a.name}
                fill
                className="object-cover object-top"
                sizes="280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Headline */}
            <div>
              <p className="mb-3 inline-flex items-center gap-2" style={{ ...MONO, color: sq.accent, textTransform: 'uppercase' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: sq.accent }} />
                {sq.label} Squad · {a.id}
              </p>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white mb-3" style={{ ...KV_DISPLAY, lineHeight: 0.92 }}>
                {a.codename || a.name}
              </h1>

              {a.title && (
                <p className="text-xl sm:text-2xl text-white/80 mb-4" style={{ fontFamily: 'var(--font-display-serif)', fontStyle: 'italic', fontWeight: 300 }}>
                  {a.title}
                </p>
              )}

              {a.tagline && (
                <blockquote className="border-l-2 pl-4 my-4 italic text-white/55 text-sm leading-relaxed" style={{ borderColor: sq.accent }}>
                  {a.tagline}
                </blockquote>
              )}

              {a.race && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border text-sm uppercase" style={{ borderColor: `${sq.accent}55`, color: sq.accent, ...MONO }}>
                    ◈ {a.race}
                  </span>
                </div>
              )}

              {a.squadRole && (
                <p className="text-white/80 text-base leading-relaxed mb-5">{a.squadRole}</p>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-block px-3 py-1.5 text-white/70 border border-white/10 bg-white/[0.04]" style={MONO}>
                  Model: <span className="text-white">{a.model}</span>
                </span>
                {a.color && (
                  <span className="inline-block px-3 py-1.5 text-white/70 border border-white/10 bg-white/[0.04]" style={MONO}>
                    <span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" style={{ background: sq.accent }} />
                    {a.color}
                  </span>
                )}
              </div>

              <a
                href="/skills/claude-agent-teams"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold uppercase transition-all hover:brightness-110"
                style={{ ...MONO, background: sq.accent, color: '#050507' }}
              >
                Instalar squad completa
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ESPECIALIZAÇÃO */}
      {a.abilities && a.abilities.length > 0 && (
        <section className="bg-[#050507] py-12 border-t border-white/[0.06]">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
            <p className="mb-3" style={{ ...MONO, color: sq.accent, textTransform: 'uppercase' }}>Especialização</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {a.abilities.map((ability, i) => (
                <div key={i} className="flex items-start gap-3 p-4 border border-white/[0.07] bg-white/[0.02]">
                  <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full" style={{ background: sq.accent }} />
                  <span className="text-white/80 text-sm leading-snug">{ability}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DESCRIPTION + DETAILS */}
      <section className="bg-[#050507] py-16 sm:py-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
          {/* Left — full description + authorities */}
          <div>
            <p className="mb-4" style={{ ...MONO, color: sq.accent, textTransform: 'uppercase' }}>O que faz</p>
            <h2 className="text-3xl sm:text-4xl text-white mb-6" style={{ ...KV_DISPLAY, lineHeight: 1 }}>
              Quando usar este agente
            </h2>
            <p className="text-white/75 leading-relaxed text-base sm:text-lg mb-8">{a.description}</p>

            {a.authorities.length > 0 && (
              <>
                <h3 className="text-xl text-white mb-4 mt-10" style={{ ...KV_DISPLAY }}>
                  Autoridades exclusivas
                </h3>
                <ul className="space-y-2">
                  {a.authorities.map((auth, i) => (
                    <li key={i} className="flex gap-3 text-white/70 text-sm leading-relaxed">
                      <span className="mt-2 w-1 h-1 shrink-0 rounded-full" style={{ background: sq.accent }} />
                      <span>{auth}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Right — tools sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-white/10 bg-[#0a0a0d] p-6">
              <p className="mb-3" style={{ ...MONO, color: sq.accent, textTransform: 'uppercase' }}>Tools</p>
              <ul className="space-y-2">
                {a.tools.map((tool) => (
                  <li key={tool} className="flex items-center gap-2 text-white/80 text-sm">
                    <span className="w-1 h-1 rounded-full" style={{ background: sq.accent }} />
                    <span style={{ fontFamily: 'var(--font-mono)' }}>{tool}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* SIBLINGS */}
      {siblings.length > 0 && (
        <section className="bg-[#0a0a0d] py-16 sm:py-20 border-t border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
            <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
              <div>
                <p className="mb-2" style={{ ...MONO, color: sq.accent, textTransform: 'uppercase' }}>Mesma squad</p>
                <h3 className="text-3xl sm:text-4xl text-white" style={{ ...KV_DISPLAY, lineHeight: 1 }}>
                  Outros agentes <span style={{ color: sq.accent }}>{sq.label}</span>
                </h3>
              </div>
              <Link
                href={`/agentes#squad-${sq.id}`}
                className="text-white/60 hover:text-white text-sm uppercase border border-white/10 px-4 py-2 hover:bg-white/[0.05] transition-all"
                style={MONO}
              >
                Ver squad completa →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {siblings.map((s) => (
                <AgentCard key={s.id} agente={s} squad={sq} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
