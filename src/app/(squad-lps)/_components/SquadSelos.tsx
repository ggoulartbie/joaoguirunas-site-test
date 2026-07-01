const KV_MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 500,
};

const SELOS = [
  { icon: '◎', label: 'Garantia 7 dias' },
  { icon: '◈', label: 'Acesso imediato' },
  { icon: '◆', label: 'Baseado na Mentoria R$8.700' },
];

export function SquadSelos() {
  return (
    <div
      className="border-y border-white/[0.07] py-5 sm:py-6"
      style={{ background: 'rgba(255,255,255,0.015)' }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-10 lg:px-16">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 lg:gap-16">
          {SELOS.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <span className="text-[#FF3A0E] text-sm" aria-hidden="true">{icon}</span>
              <span style={{ ...KV_MONO, color: 'rgba(255,255,255,0.55)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
