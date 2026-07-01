import Image from 'next/image';
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

interface SquadInstrutorProps {
  instrutor: SquadConfig['instrutor'];
}

export function SquadInstrutor({ instrutor }: SquadInstrutorProps) {
  return (
    <section
      id="instrutor"
      className="py-16 sm:py-24"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p
            className="mb-4 sm:mb-6"
            style={{ ...KV_MONO, color: 'rgba(255, 58, 14, 0.85)' }}
          >
            Sobre o instrutor
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-white"
            style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
          >
            Quem criou este módulo
          </h2>
          <div className="mx-auto mt-4 sm:mt-6 w-12 sm:w-16 h-[1px] bg-[#FF3A0E]/40" />
        </div>

        <div className="flex flex-col items-center text-center gap-6 sm:gap-8 max-w-lg mx-auto">
          <div
            className="w-44 h-44 sm:w-56 sm:h-56 overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <Image
              src="/images/joao-guirunas-profile.jpg"
              alt={`${instrutor.nome} — ${instrutor.cargo}`}
              width={224}
              height={224}
              sizes="(max-width: 640px) 176px, 224px"
              className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div className="space-y-3">
            <h3
              className="text-2xl sm:text-3xl text-white"
              style={{ ...KV_DISPLAY }}
            >
              {instrutor.nome}
            </h3>
            <p
              className="text-[#FF3A0E]/80 text-xs font-semibold tracking-[0.15em] uppercase"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {instrutor.cargo}
            </p>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              {instrutor.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
