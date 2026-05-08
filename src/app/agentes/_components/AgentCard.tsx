import Link from 'next/link';
import Image from 'next/image';
import type { Agente, Squad } from '@/data/agentes';

export function AgentCardCompact({ agente, squad }: { agente: Agente; squad: Squad }) {
  return (
    <div
      className="flex flex-col border border-white/[0.10]"
      style={{
        '--accent': squad.accent,
        background: 'rgba(2,2,10,0.45)',
      } as React.CSSProperties}
    >
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
          className="object-cover object-top"
          sizes="(max-width: 768px) 120px, 120px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Squad badge top-left */}
        <div className="absolute top-1 left-1">
          <span
            className="inline-flex items-center gap-1 px-1 py-0.5"
            style={{
              background: 'rgba(0,0,0,0.4)',
              border: `1px solid ${squad.accent}55`,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.10em',
            }}
          >
            <span className="w-1 h-1 rounded-full" style={{ background: squad.accent }} />
            <span className="text-white/90 uppercase">{squad.label}</span>
          </span>
        </div>

        {/* Model badge top-right */}
        <div className="absolute top-1 right-1">
          <span
            className="inline-block px-1 py-0.5 text-white/60"
            style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.10)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.10em',
            }}
          >
            {agente.model}
          </span>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-10"
          style={{ background: 'linear-gradient(to top, rgba(2,2,10,0.85), transparent)' }}
        />
      </div>

      {/* Body — só nome/codename */}
      <div className="p-1.5 flex flex-col gap-0.5">
        <h3
          className="text-[11px] text-white leading-tight"
          style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.01em' }}
        >
          {agente.codename || agente.name}
        </h3>
        <p
          className="text-white/50 text-[9px]"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.10em' }}
        >
          {agente.id}
        </p>
      </div>
    </div>
  );
}

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
          sizes="(max-width: 768px) 160px, 220px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Squad badge top-left */}
        <div className="absolute top-2 left-2">
          <span
            className="inline-flex items-center gap-1 px-1.5 py-0.5 backdrop-blur-sm"
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
        <div className="absolute top-2 right-2">
          <span
            className="inline-block px-1.5 py-0.5 text-white/60 backdrop-blur-sm"
            style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.10)', ...MONO }}
          >
            {agente.model}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(to top, rgba(2,2,10,0.85), transparent)' }} />
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke={squad.accent}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Body */}
      <div className="p-2 sm:p-3 flex flex-col gap-1.5 flex-1">
        <div>
          <h3
            className="text-sm sm:text-base text-white mb-0.5 transition-colors group-hover:text-[var(--accent)] leading-tight"
            style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.01em' }}
          >
            {agente.codename || agente.name}
          </h3>
          <p className="text-white/50 text-[9px] sm:text-[10px]" style={MONO}>
            {agente.id}
          </p>
        </div>

        {agente.title && <p className="text-white/80 text-[10px] sm:text-xs font-medium leading-snug">{agente.title}</p>}

        <p className="text-white/55 text-[10px] sm:text-xs leading-relaxed line-clamp-2 flex-1">
          {agente.squadRole || agente.description}
        </p>
      </div>
    </Link>
  );
}
