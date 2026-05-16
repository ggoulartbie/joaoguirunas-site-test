export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { ALL_AGENTES, SQUADS, TOTAL_AGENTES, getAgentesBySquad } from '@/data/agentes';
import { AgentesHero } from './_components/AgentesHero';
import { StatsBar } from './_components/StatsBar';
import { SquadSection } from './_components/SquadSection';
import { SolarSystemBackground } from './_components/SolarSystemBackground';
import { SquadSideNav } from './_components/SquadSideNav';

export const metadata: Metadata = {
  title: `${TOTAL_AGENTES} Agentes Claude Agent Teams — Dev, Sites, Social, Traffic`,
  description: `Conheça os ${TOTAL_AGENTES} agentes pré-configurados do Claude Agent Teams. ${SQUADS.length} squads completas com persona, autoridades e skills definidos. Drop-in pra qualquer projeto Claude Code.`,
  alternates: { canonical: `${siteConfig.url}/agentes` },
  openGraph: {
    title: `${TOTAL_AGENTES} Agentes Claude Agent Teams | João Guirunas`,
    description: `${SQUADS.length} squads especializadas — ${SQUADS.map((s) => `${s.label} (${s.count})`).join(', ')}.`,
    url: `${siteConfig.url}/agentes`,
    images: [{ url: `${siteConfig.url}/images/hero-ultrawide.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TOTAL_AGENTES} Agentes Claude Agent Teams`,
    description: `${SQUADS.length} squads completas com persona, autoridades e skills definidos.`,
  },
};

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: `${TOTAL_AGENTES} Agentes Claude Agent Teams`,
  description: `Catálogo completo dos ${TOTAL_AGENTES} agentes em ${SQUADS.length} squads.`,
  url: `${siteConfig.url}/agentes`,
  hasPart: ALL_AGENTES.map((a) => ({
    '@type': 'Person',
    name: a.codename || a.name,
    alternateName: a.id,
    description: a.description,
    url: `${siteConfig.url}/agentes/${a.squad}/${a.slug}`,
  })),
};

export default function AgentesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />

      {/* Fixed 3D solar system canvas behind everything */}
      <SolarSystemBackground />

      {/* Side nav — fixed left, mobile bottom */}
      <SquadSideNav squads={SQUADS} />

      {/* Content sits above the canvas */}
      <div className="relative z-10">
        <AgentesHero total={TOTAL_AGENTES} squads={SQUADS} />
        <StatsBar total={TOTAL_AGENTES} squads={SQUADS} />

        <div id="squads">
          {SQUADS.map((squad) => (
            <SquadSection key={squad.id} squad={squad} agentes={getAgentesBySquad(squad.id)} />
          ))}
        </div>

      {/* CTA final — leva pra mentoria */}
      <section className="py-24 sm:py-32 border-t border-white/[0.10]">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
          <p className="mb-6 inline-flex items-center gap-2" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.16em', color: 'rgba(255,58,14,0.85)', textTransform: 'uppercase' }}>
            <span className="relative inline-flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3A0E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3A0E]" />
            </span>
            Mentoria · Próxima turma 12 de maio
          </p>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-5" style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 0.95 }}>
            Quer ter uma equipe de{' '}
            <span className="text-[#FF3A0E] italic" style={{ fontWeight: 300 }}>
              37 agentes trabalhando por você
            </span>
            ?
          </h3>
          <p className="text-white/65 mb-10 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Aprenda a configurar, customizar e orquestrar a sua squad de agentes Claude Code. Mentoria intensiva e prática — turmas de até 12 pessoas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              href="/mentoria"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold uppercase transition-all hover:brightness-110 active:scale-[0.98]"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', background: '#FF3A0E', color: '#050507' }}
            >
              Conhecer a Mentoria
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/skills/claude-agent-teams"
              className="inline-flex items-center justify-center gap-2 text-white/60 hover:text-white px-6 py-3 text-sm font-semibold uppercase transition-all hover:bg-white/[0.05]"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', border: '1px solid rgba(255,255,255,0.16)' }}
            >
              Instalar grátis (open source)
            </a>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
