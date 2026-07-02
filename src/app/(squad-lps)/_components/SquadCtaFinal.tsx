import type { SquadConfig } from './types';

const KV_DISPLAY: React.CSSProperties = {
  fontFamily: 'var(--font-display-serif)',
  fontWeight: 400,
  letterSpacing: '-0.03em',
};

interface SquadCtaFinalProps {
  ctaLabel: SquadConfig['ctaLabel'];
  checkoutUrl: string;
}

export function SquadCtaFinal({ ctaLabel, checkoutUrl }: SquadCtaFinalProps) {
  return (
    <section
      className="py-12 sm:py-16"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
        <h3
          className="text-3xl sm:text-4xl text-white mb-4"
          style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
        >
          Pronto para montar sua{' '}
          <span className="text-[#FF3A0E] italic" style={{ fontWeight: 300 }}>squad de agentes</span>
          ?
        </h3>
        <p className="text-white/60 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
          Acesso imediato às aulas gravadas. Comece hoje, no seu ritmo.
        </p>
        <div className="flex justify-center">
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold uppercase transition-all hover:brightness-110 active:scale-[0.98]"
            style={{ background: '#FF3A0E', color: '#050507', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.16em' }}
          >
            {ctaLabel}
          </a>
        </div>
        <p className="mt-6 text-xs sm:text-sm text-white/60">
          7 dias de garantia total &middot; Acesso por 6 meses &middot; Cancelamento simplificado
        </p>
      </div>
    </section>
  );
}
