import type { CurriculumItem } from './types';

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

interface SquadCurriculumProps {
  curriculum: CurriculumItem[];
}

export function SquadCurriculum({ curriculum }: SquadCurriculumProps) {
  return (
    <section
      id="modulos"
      className="py-16 sm:py-24"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p
            className="mb-4 sm:mb-6"
            style={{ ...KV_MONO, color: 'rgba(255, 58, 14, 0.85)' }}
          >
            O que você aprende
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-white"
            style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
          >
            Aula a aula,{' '}
            <span className="text-[#FF3A0E] italic" style={{ fontWeight: 300 }}>resultado por resultado</span>
          </h2>
          <div className="mx-auto mt-4 sm:mt-6 w-12 sm:w-16 h-[1px] bg-[#FF3A0E]/40" />
        </div>

        <div className="space-y-3">
          <div
            className="grid grid-cols-[1fr_1fr] gap-4 px-4 py-2"
            style={{ ...KV_MONO, color: 'rgba(255,255,255,0.3)' }}
          >
            <span>Aula</span>
            <span>Resultado</span>
          </div>
          {curriculum.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_1fr] gap-4 px-4 py-4 sm:py-5 transition-colors hover:border-[#FF3A0E]/20"
              style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 text-[#FF3A0E] text-xs mt-0.5"
                  style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-white text-sm sm:text-base leading-snug">{item.titulo}</span>
              </div>
              <p className="text-white/55 text-sm leading-relaxed">{item.resultado}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#inscricao"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold uppercase transition-all hover:brightness-110 active:scale-[0.98]"
            style={{ background: '#FF3A0E', color: '#050507', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.16em' }}
          >
            Quero garantir minha vaga
          </a>
        </div>
      </div>
    </section>
  );
}
