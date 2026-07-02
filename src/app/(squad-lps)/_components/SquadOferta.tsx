import type { SquadConfig } from './types';

const KV_DISPLAY: React.CSSProperties = {
  fontFamily: 'var(--font-display-serif)',
  fontWeight: 400,
  letterSpacing: '-0.03em',
};

const KV_MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
};

interface SquadOfertaProps {
  price: SquadConfig['price'];
  priceInstallments: SquadConfig['priceInstallments'];
  ctaLabel: SquadConfig['ctaLabel'];
  checkoutUrl: string;
}

export function SquadOferta({ price, priceInstallments, ctaLabel, checkoutUrl }: SquadOfertaProps) {
  return (
    <section
      id="inscricao"
      className="relative py-16 sm:py-24 overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span
            className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 mb-6"
            style={{ background: 'rgba(255,255,255,0.06)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.12em' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#FF3A0E]" style={{ boxShadow: '0 0 6px #FF3A0E' }} aria-hidden="true" />
            <span className="text-[#FF3A0E] uppercase">Acesso imediato · {price}</span>
          </span>
          <h2
            className="text-3xl sm:text-4xl text-white mb-3"
            style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
          >
            Garanta sua vaga{' '}
            <span className="text-[#FF3A0E] italic" style={{ fontWeight: 300 }}>agora</span>
          </h2>
        </div>

        <div
          className="mb-8 p-6 sm:p-8"
          style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <p style={{ ...KV_MONO, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Valor</p>
              <p
                className="text-3xl sm:text-4xl text-white"
                style={{ ...KV_DISPLAY }}
              >
                {price}
              </p>
              <p className="text-white/50 text-sm mt-1">ou {priceInstallments} no cartão</p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-white/50">
              {['Garantia de 7 dias', 'Acesso por 6 meses', 'Aulas gravadas on-demand'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="text-[#FF3A0E] text-xs" aria-hidden="true">◈</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-8 py-4 font-semibold uppercase transition-all hover:brightness-110 active:scale-[0.98]"
          style={{ background: '#FF3A0E', color: '#050507', fontFamily: 'var(--font-mono)', fontSize: '13px', letterSpacing: '0.16em' }}
        >
          Garantir minha vaga
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>

        <p className="mt-6 text-center text-xs sm:text-sm text-white/40">
          7 dias de garantia total &middot; Acesso por 6 meses &middot; Cancelamento simplificado
        </p>
      </div>
    </section>
  );
}
