import React from 'react'
import Image from 'next/image'

const KV_DISPLAY: React.CSSProperties = {
  fontFamily: 'var(--font-display-serif)',
  fontWeight: 400,
  letterSpacing: '-0.03em',
}

const KV_MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
}

export function CursoFacilitador() {
  return (
    <section
      id="facilitador"
      className="py-16 sm:py-24"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-[140px]">
        <div className="text-center mb-12 sm:mb-16">
          <p
            className="mb-4 sm:mb-6"
            style={{ ...KV_MONO, color: 'rgba(255, 58, 14, 0.85)' }}
          >
            Quem Facilita
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4"
            style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
          >
            Seu <span className="text-[#FF3A0E]">Facilitador</span>
          </h2>
          <div className="mx-auto w-12 sm:w-16 h-[1px] bg-[#FF3A0E]/40" />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center group">
            {/* Photo */}
            <div className="relative mb-8">
              <div
                className="w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72 overflow-hidden transition-all duration-500 group-hover:[box-shadow:0_0_32px_rgba(255,58,14,0.18)] group-hover:[border-color:rgba(255,58,14,0.35)]"
                style={{ border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <Image
                  src="/images/joao-guirunas-profile.jpg"
                  alt="João Guirunas — Facilitador"
                  width={288}
                  height={288}
                  sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, 288px"
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4">
              <div>
                <h3
                  className="text-2xl sm:text-3xl text-white mb-2 group-hover:text-[#FF3A0E] transition-colors"
                  style={{
                    fontFamily: 'var(--font-display-serif)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                  }}
                >
                  João Guirunas
                </h3>
                <p
                  className="text-[#FF3A0E]/80 text-xs font-semibold tracking-[0.15em] uppercase"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Fundador GrowthSales.ai
                </p>
              </div>
              <p
                className="text-sm sm:text-base leading-relaxed max-w-md mx-auto"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                Especialista em IA aplicada a negócios reais. Pioneiro em orquestração de agentes autônomos com Claude Code. Criador do framework AIOX. O que funciona em produção, ele ensina.
              </p>
              <a
                href="https://www.linkedin.com/in/joaoguirunas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-[#FF3A0E] hover:text-white transition-all text-xs sm:text-sm font-semibold border border-[#FF3A0E]/30 hover:border-[#FF3A0E] px-6 py-3 hover:bg-[#FF3A0E]/5"
                style={{
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
