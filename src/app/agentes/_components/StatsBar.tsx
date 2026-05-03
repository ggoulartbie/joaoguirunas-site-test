import type { Squad } from '@/data/agentes';

const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.14em' };
const KV_DISPLAY: React.CSSProperties = { fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.03em' };

interface StatsBarProps {
  total: number;
  squads: Squad[];
}

export function StatsBar({ total, squads }: StatsBarProps) {
  const stats = [
    { value: String(total), label: 'Agentes' },
    { value: String(squads.length), label: 'Squads' },
    { value: '40+', label: 'Skills' },
    { value: '100%', label: 'Open Source' },
  ];

  return (
    <section className="border-y border-white/[0.10] backdrop-blur-[2px]" style={{ background: 'transparent' }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12 py-10 sm:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <p className="text-4xl sm:text-5xl text-white mb-1" style={{ ...KV_DISPLAY, lineHeight: 1 }}>
                {s.value}
              </p>
              <p className="text-white/45 uppercase" style={MONO}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
