import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { ALL_AGENTES, getAgenteBySlug, getSquad, getSiblings, type SquadId } from '@/data/agentes';
import { AgentCard } from '../../_components/AgentCard';
import { AgentPlanetBackground } from '../../_components/AgentPlanetBackground';

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

  // Merge abilities + specialization into one deduplicated full list
  const specItems = a.specialization && a.specialization.length > 0 ? a.specialization : [];
  const generalItems = a.abilities.filter((ab) => !specItems.some((s) => s.toLowerCase().includes(ab.toLowerCase().slice(0, 12))));
  const allAbilities = [...specItems, ...generalItems];

  const profileJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: a.codename || a.name,
      alternateName: a.id,
      description: a.squadRole || a.description,
      jobTitle: a.title,
      knowsAbout: allAbilities,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }} />

      {/* 3D planet canvas — fixed full-screen, behind everything */}
      <AgentPlanetBackground squadId={a.squad} />

      {/* All page content sits above the fixed canvas */}
      <div className="relative z-10">

      {/* HERO — transparent over 3D scene */}
      <section className="relative overflow-hidden -mt-16 pt-32 pb-16 sm:pt-44 sm:pb-24">
        {/* Subtle vignette so text stays legible over the 3D scene */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to right, rgba(2,2,10,0.75) 0%, rgba(2,2,10,0.30) 60%, transparent 100%),
              linear-gradient(to bottom, rgba(2,2,10,0.5) 0%, transparent 30%, rgba(2,2,10,0.6) 100%)
            `,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="mb-10 flex items-center gap-2" style={MONO} aria-label="Breadcrumb">
            <Link href="/agentes" className="text-white/40 hover:text-white uppercase transition-colors">Agentes</Link>
            <span className="text-white/20">/</span>
            <Link href={`/agentes#squad-${sq.id}`} className="uppercase hover:opacity-80 transition-opacity" style={{ color: sq.accent }}>
              {sq.label}
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/60 uppercase">{a.id}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-start">
            {/* LEFT — Agent photo + race badge */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div
                className="aspect-square w-full max-w-[280px] sm:max-w-[300px] relative overflow-hidden border"
                style={{ borderColor: `${sq.accent}40` }}
              >
                <Image
                  src={`/agentes/${a.slug}.png`}
                  alt={a.codename || a.name}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {/* Squad glow on photo */}
                <div
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(ellipse at top, ${sq.accent}18 0%, transparent 60%)` }}
                />
              </div>

              {/* Race badge below photo */}
              {a.race && (
                <div className="text-center lg:text-left w-full max-w-[300px]">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/25 mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    Raça alienígena
                  </p>
                  <span
                    className="inline-flex items-center gap-2 px-3 py-2 border text-xs uppercase w-full justify-center lg:justify-start"
                    style={{ borderColor: `${sq.accent}44`, color: sq.accent, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
                  >
                    ◈ {a.race}
                  </span>
                  {sq.raceDescription && (
                    <p className="mt-2 text-white/35 text-xs leading-relaxed hidden lg:block">
                      {sq.raceDescription}
                    </p>
                  )}
                </div>
              )}

              {/* Meta badges */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start w-full max-w-[300px]">
                <span className="inline-block px-3 py-1.5 text-white/55 border border-white/10 bg-white/[0.03]" style={MONO}>
                  {a.model}
                </span>
                {a.color && (
                  <span className="inline-block px-3 py-1.5 text-white/55 border border-white/10 bg-white/[0.03]" style={MONO}>
                    <span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" style={{ background: sq.accent }} />
                    {a.color}
                  </span>
                )}
              </div>
            </div>

            {/* RIGHT — Main content */}
            <div>
              <p className="mb-3 inline-flex items-center gap-2" style={{ ...MONO, color: sq.accent, textTransform: 'uppercase' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: sq.accent }} />
                {sq.label} Squad · {a.id}
              </p>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white mb-3" style={{ ...KV_DISPLAY, lineHeight: 0.92 }}>
                {a.codename || a.name}
              </h1>

              {a.title && (
                <p className="text-xl sm:text-2xl text-white/75 mb-5" style={{ fontFamily: 'var(--font-display-serif)', fontStyle: 'italic', fontWeight: 300 }}>
                  {a.title}
                </p>
              )}

              {a.tagline && (
                <blockquote className="border-l-2 pl-4 mb-5 italic text-white/50 text-sm leading-relaxed max-w-xl" style={{ borderColor: sq.accent }}>
                  {a.tagline}
                </blockquote>
              )}

              {a.squadRole && (
                <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">{a.squadRole}</p>
              )}

              {/* Tools grid */}
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/30 mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                  Tools disponíveis
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {a.tools.map((tool) => (
                    <span key={tool} className="px-2.5 py-1 text-white/65 border border-white/[0.10] bg-white/[0.03] text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="/skills/claude-agent-teams"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold uppercase transition-all hover:brightness-110 active:scale-[0.98]"
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

        {/* Fade hero → solid content */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #050507)' }} />
      </section>

      {/* HABILIDADES COMPLETAS */}
      {allAbilities.length > 0 && (
        <section className="bg-[#050507] py-14 border-t border-white/[0.06]">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
            <div className="mb-6 flex items-end gap-3">
              <div>
                <p className="mb-1" style={{ ...MONO, color: sq.accent, textTransform: 'uppercase' }}>Especialização</p>
                <h2 className="text-2xl sm:text-3xl text-white" style={{ ...KV_DISPLAY, lineHeight: 1 }}>
                  O que {a.codename || a.name} domina
                </h2>
              </div>
              <span className="mb-0.5 text-white/25 text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                {allAbilities.length} habilidades
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {allAbilities.map((ability, i) => (
                <div key={i} className="flex items-start gap-3 p-4 border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] transition-colors">
                  <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full" style={{ background: sq.accent }} />
                  <span className="text-white/75 text-sm leading-snug">{ability}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SKILLS (slash commands) */}
      {a.skills && a.skills.length > 0 && (
        <section className="bg-[#050507] py-12 border-t border-white/[0.06]">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12">
            <p className="mb-1" style={{ ...MONO, color: sq.accent, textTransform: 'uppercase' }}>Skills & Comandos</p>
            <h2 className="text-2xl sm:text-3xl text-white mb-6" style={{ ...KV_DISPLAY, lineHeight: 1 }}>
              Invoke diretamente no Claude Code
            </h2>
            <div className="flex flex-col gap-3">
              {a.skills.map((skill) => (
                <div key={skill.command} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 border border-white/[0.08] bg-white/[0.02]">
                  <code
                    className="shrink-0 px-3 py-1.5 text-sm border"
                    style={{ fontFamily: 'var(--font-mono)', color: sq.accent, background: `${sq.accent}10`, borderColor: `${sq.accent}33` }}
                  >
                    {skill.command}
                  </code>
                  <span className="text-white/60 text-sm leading-snug">{skill.description}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DESCRIPTION + AUTHORITIES + NEVER DOES */}
      <section className="bg-[#050507] py-16 sm:py-20 border-t border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">
          {/* Left */}
          <div>
            <p className="mb-1" style={{ ...MONO, color: sq.accent, textTransform: 'uppercase' }}>Quando usar</p>
            <h2 className="text-3xl sm:text-4xl text-white mb-6" style={{ ...KV_DISPLAY, lineHeight: 1 }}>
              Contexto de uso ideal
            </h2>
            <p className="text-white/70 leading-relaxed text-base sm:text-lg mb-10">{a.description}</p>

            {a.authorities.length > 0 && (
              <>
                <h3 className="text-xl text-white mb-4" style={{ ...KV_DISPLAY }}>
                  Autoridades exclusivas
                </h3>
                <ul className="space-y-3 mb-10">
                  {a.authorities.map((auth, i) => (
                    <li key={i} className="flex gap-3 text-white/65 text-sm leading-relaxed">
                      <span className="mt-2 w-1 h-1 shrink-0 rounded-full" style={{ background: sq.accent }} />
                      <span>{auth}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {a.neverDoes && a.neverDoes.length > 0 && (
              <>
                <h3 className="text-xl text-white mb-4" style={{ ...KV_DISPLAY }}>
                  Fora do escopo
                </h3>
                <ul className="space-y-3">
                  {a.neverDoes.map((item, i) => (
                    <li key={i} className="flex gap-3 text-white/45 text-sm leading-relaxed line-through decoration-white/20">
                      <span className="mt-2 w-1 h-1 shrink-0 rounded-full bg-white/20 no-underline" style={{ textDecoration: 'none' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Right — tools sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
            <div className="border border-white/10 bg-[#0a0a0d] p-6">
              <p className="mb-3" style={{ ...MONO, color: sq.accent, textTransform: 'uppercase' }}>Tools</p>
              <ul className="space-y-2">
                {a.tools.map((tool) => (
                  <li key={tool} className="flex items-center gap-2 text-white/75 text-sm">
                    <span className="w-1 h-1 rounded-full" style={{ background: sq.accent }} />
                    <span style={{ fontFamily: 'var(--font-mono)' }}>{tool}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Race card */}
            {a.race && sq.raceDescription && (
              <div className="border p-6" style={{ borderColor: `${sq.accent}30`, background: `${sq.accent}06` }}>
                <p className="mb-2" style={{ ...MONO, color: sq.accent, textTransform: 'uppercase' }}>Raça</p>
                <p className="text-white/80 text-sm font-medium mb-3" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
                  ◈ {a.race}
                </p>
                <p className="text-white/45 text-xs leading-relaxed">{sq.raceDescription}</p>
              </div>
            )}
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
                className="text-white/55 hover:text-white text-sm uppercase border border-white/10 px-4 py-2 hover:bg-white/[0.05] transition-all"
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

      </div>{/* end relative z-10 */}
    </>
  );
}
