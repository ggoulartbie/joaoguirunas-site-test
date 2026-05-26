import React from 'react'
import { LeadCaptureForm } from './LeadCaptureForm'

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

export interface CursoInscricaoEmBreveProps {
  courseSlug: string
  headline?: string
  headlineAccent?: string
  description?: string
  bullets?: string[]
}

export function CursoInscricaoEmBreve({
  courseSlug,
  headline = 'Entre na lista de',
  headlineAccent = 'espera',
  description = 'Seja um dos primeiros a saber quando as inscrições abrirem. Deixe seu contato e avisaremos assim que estiver disponível.',
  bullets = [
    'Notificação imediata quando as inscrições abrirem',
    'Acesso antecipado com condições especiais',
    'Sem compromisso — cancele quando quiser',
  ],
}: CursoInscricaoEmBreveProps) {
  return (
    <section
      id="inscricao"
      className="py-16 sm:py-24"
      style={{ background: '#050507', borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_400px] lg:gap-16 lg:items-start">

          {/* Left: info */}
          <div>
            <p
              className="mb-4 sm:mb-6"
              style={{ ...KV_MONO, color: 'rgba(255, 58, 14, 0.85)' }}
            >
              Lista de Espera
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4"
              style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
            >
              {headline}{' '}
              <span
                className="text-[#FF3A0E] italic"
                style={{ fontWeight: 300 }}
              >
                {headlineAccent}
              </span>
            </h2>
            <p
              className="text-white/55 text-sm sm:text-base leading-relaxed mb-8 max-w-md"
            >
              {description}
            </p>

            <div className="space-y-3 mb-10">
              {bullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-3">
                  <div
                    className="flex h-2 w-2 shrink-0 rounded-full"
                    style={{ background: 'rgba(255,58,14,0.7)' }}
                    aria-hidden="true"
                  />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form card */}
          <div
            className="mt-12 lg:mt-0 sticky top-24"
            style={{
              background: '#0D0D14',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div
              className="p-6 sm:p-8"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p
                className="mb-1"
                style={{ ...KV_MONO, color: '#FF3A0E', fontSize: '10px' }}
              >
                Em Breve
              </p>
              <div className="flex items-baseline gap-2">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold"
                  style={{
                    background: 'rgba(255,176,0,0.12)',
                    border: '1px solid rgba(255,176,0,0.4)',
                    color: '#FFB000',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  Inscrições em breve
                </span>
              </div>
              <p
                className="text-white/40 text-xs mt-3"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Deixe seus dados e seja avisado(a) primeiro.
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <LeadCaptureForm courseSlug={courseSlug} label="Quero ser avisado(a)" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
