import Link from 'next/link';
import Image from 'next/image';
import type { Agente, Squad } from '@/data/agentes';

interface AgentCardProps {
  agente: Agente;
  squad: Squad;
}

const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em' };

export function AgentCard({ agente, squad }: AgentCardProps) {
  const href = `/agentes/${agente.squad}/${agente.slug}`;

  return (
    <Link
      href={href}
      className="group flex flex-col border border-white/[0.10] hover:border-white/25 transition-all hover:-translate-y-0.5 backdrop-blur-md"
      style={{
        '--accent': squad.accent,
        background: 'rgba(2,2,10,0.45)',
      } as React.CSSProperties}
    >
      {/* Square image */}
      <div
        className="relative aspect-square w-full overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${squad.accent}22 0%, ${squad.accent}08 50%, #0e0e11 100%)`,
        }}
      >
        <Image
          src={`/agentes/${agente.slug}.png`}
          alt={agente.codename || agente.name}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* Subtle dark overlay at bottom for badge legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Squad badge top-left */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-flex items-center gap-1.5 px-2 py-1 backdrop-blur-sm"
            style={{
              background: 'rgba(0,0,0,0.4)',
              border: `1px solid ${squad.accent}55`,
              ...MONO,
            }}
          >
            <span className="w-1 h-1 rounded-full" style={{ background: squad.accent }} />
            <span className="text-white/90 uppercase">{squad.label}</span>
          </span>
        </div>

        {/* Model badge top-right */}
        <div className="absolute top-3 right-3">
          <span
            className="inline-block px-2 py-1 text-white/60 backdrop-blur-sm"
            style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.10)', ...MONO }}
          >
            {agente.model}
          </span>
        </div>

        {/* Bottom gradient + arrow */}
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(to top, rgba(2,2,10,0.85), transparent)' }} />
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={squad.accent}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3
            className="text-xl text-white mb-0.5 transition-colors group-hover:text-[var(--accent)]"
            style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.01em' }}
          >
            {agente.codename || agente.name}
          </h3>
          <p className="text-white/50 text-xs" style={MONO}>
            {agente.id}
          </p>
        </div>

        {agente.race && (
          <p className="text-white/35 uppercase" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.15em' }}>
            {agente.race}
          </p>
        )}

        {agente.title && <p className="text-white/80 text-sm font-medium leading-snug">{agente.title}</p>}

        <p className="text-white/55 text-sm leading-relaxed line-clamp-3 flex-1">
          {agente.squadRole || agente.description}
        </p>

        {agente.abilities && agente.abilities.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2 border-t border-white/[0.06]">
            {agente.abilities.slice(0, 3).map((ability) => (
              <span key={ability} className="px-1.5 py-0.5 bg-white/[0.06] text-white/60 text-[10px]" style={MONO}>
                {ability}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
