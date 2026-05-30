import type { Metadata } from 'next'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { SectionDots } from '@/app/mentoria/section-dots'
import { SolutionSection } from '@/app/mentoria/solution-section'
import { CursoOnlineHero } from './_components/CursoOnlineHero'
import { CursoOnlineDiferenciais } from './_components/CursoOnlineDiferenciais'
import { CursoOnlineTimeline } from './_components/CursoOnlineTimeline'
import { CursoPricingCalculator } from './_components/CursoPricingCalculator'
import { CursoFaqAccordion } from './_components/CursoFaqAccordion'
import { CursoOnlineForm } from './_components/CursoOnlineForm'
import { SolarSystemBackground } from '@/app/agentes/_components/SolarSystemBackground'

export const metadata: Metadata = {
  title: 'Curso Online | Claude Agents Team — R$ 797',
  description:
    'Acesso por 6 meses ao conteúdo em vídeo, materiais, fórum e certificado. Aprenda a criar e orquestrar agentes de IA com Claude Code no seu próprio ritmo.',
  alternates: { canonical: '/curso-online' },
  openGraph: {
    title: 'Curso Online | Claude Agents Team — R$ 797 | João Guirunas',
    description:
      'Acesso por 6 meses ao conteúdo em vídeo, materiais, fórum e certificado. Aprenda a criar e orquestrar agentes de IA com Claude Code no seu próprio ritmo.',
    url: `${siteConfig.url}/curso-online`,
    images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curso Online | Claude Agents Team — R$ 797',
    description:
      'Acesso por 6 meses ao conteúdo em vídeo, materiais, fórum e certificado. Aprenda a criar e orquestrar agentes de IA com Claude Code no seu próprio ritmo.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Curso Online | Claude Agents Team',
  description:
    'Aprenda a criar e orquestrar agentes de IA com Claude Code e o framework AIOX. Acesso completo ao conteúdo em vídeo, materiais, fórum e certificado.',
  provider: {
    '@type': 'Person',
    name: 'João Guirunas',
    url: siteConfig.url,
  },
  inLanguage: 'pt-BR',
  url: `${siteConfig.url}/curso-online`,
  offers: {
    '@type': 'Offer',
    price: '797',
    priceCurrency: 'BRL',
    availability: 'https://schema.org/InStock',
    url: `${siteConfig.url}/curso-online`,
  },
}

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


const FACILITADORES = [
  {
    name: 'João Guirunas',
    role: 'Fundador GrowthSales.ai',
    bio: 'Especialista em IA aplicada a vendas e marketing. Pioneiro em orquestração de agentes autônomos. Criador do framework AIOX.',
    img: '/images/joao-guirunas-profile.jpg',
    linkedin: 'https://www.linkedin.com/in/joaoguirunas',
  },
  {
    name: 'Claudia Guirunas',
    role: 'Co-Fundadora GrowthSales.ai',
    bio: 'Especialista em transformação digital e implementação de IA em processos de vendas. No curso online você tem acesso ao mesmo conteúdo que usamos na mentoria intensiva.',
    img: '/images/claudia-guirunas.png',
    linkedin: 'https://www.linkedin.com/in/claudiaguirunas',
  },
]

function SectionBadge({ label }: { label: string }) {
  return (
    <p
      className="mb-4 sm:mb-6"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'rgba(255, 58, 14, 0.85)',
        fontWeight: 500,
      }}
    >
      {label}
    </p>
  )
}

export default function CursoOnlinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Fixed 3D solar system canvas behind everything */}
      <SolarSystemBackground />

      <div className="relative z-10">

      <SectionDots />

      {/* ===== HERO ===== */}
      <CursoOnlineHero />

      {/* ===== SOLUÇÃO ===== */}
      <SolutionSection />

      {/* ===== DIFERENCIAIS ===== */}
      <CursoOnlineDiferenciais />

      {/* ===== TIMELINE DOS MÓDULOS ===== */}
      <CursoOnlineTimeline />

      {/* ===== FACILITADORES ===== */}
      <section id="facilitadores" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-[140px]">
          <div className="text-center mb-12 sm:mb-16">
            <SectionBadge label="Quem Facilita" />
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4"
              style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
            >
              Seus <span className="text-[#FF3A0E]">Facilitadores</span>
            </h2>
            <div className="mx-auto w-12 sm:w-16 h-[1px] bg-[#FF3A0E]/40 mb-4 sm:mb-6" />
            <p className="text-sm sm:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
              Profissionais que vivem e respiram IA aplicada a negócios. Fundadores da GrowthSales.ai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 max-w-5xl mx-auto">
            {FACILITADORES.map((f) => (
              <div key={f.name} className="flex flex-col items-center text-center group">
                <div className="relative mb-8">
                  <div
                    className="w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72 overflow-hidden transition-all duration-500 group-hover:[box-shadow:0_0_32px_rgba(255,58,14,0.18)] group-hover:[border-color:rgba(255,58,14,0.35)]"
                    style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    <Image
                      src={f.img}
                      alt={`${f.name} - ${f.role}`}
                      width={288}
                      height={288}
                      sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, 288px"
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3
                      className="text-2xl sm:text-3xl text-white mb-2 group-hover:text-[#FF3A0E] transition-colors"
                      style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.02em' }}
                    >
                      {f.name}
                    </h3>
                    <p
                      className="text-[#FF3A0E]/80 text-xs font-semibold tracking-[0.15em] uppercase"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {f.role}
                    </p>
                  </div>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">{f.bio}</p>
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-[#FF3A0E] hover:text-white transition-all text-xs sm:text-sm font-semibold border border-[#FF3A0E]/30 hover:border-[#FF3A0E] px-6 py-3 hover:bg-[#FF3A0E]/5"
                    style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INVESTIMENTO ===== */}
      <CursoPricingCalculator />

      {/* ===== INSCRIÇÃO / CTA ===== */}
      <section
        id="inscricao"
        className="relative py-16 sm:py-24 overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/form-bg.jpg"
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: 'center top' }}
          />
          <div className="absolute inset-0 bg-[#050507]/65" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span
              className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 mb-6"
              style={{ background: 'rgba(255,255,255,0.06)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.12em' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#FF3A0E]" style={{ boxShadow: '0 0 6px #FF3A0E' }} />
              <span className="text-[#FF3A0E] uppercase">Acesso imediato · R$ 797</span>
            </span>
            <h2
              className="text-3xl sm:text-4xl text-white mb-3"
              style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 0.95 }}
            >
              Comece a aprender{' '}
              <span className="text-[#FF3A0E] italic" style={{ fontWeight: 300 }}>agora mesmo</span>
            </h2>
            <p className="text-white/55 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              8 módulos em vídeo, materiais por módulo e certificado de conclusão. 6 meses de acesso.
            </p>
          </div>
          <CursoOnlineForm />
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section
        id="faq"
        className="py-16 sm:py-24"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <SectionBadge label="FAQ" />
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-white"
              style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
            >
              Dúvidas Comuns
            </h2>
            <div className="mx-auto mt-4 sm:mt-6 w-12 sm:w-16 h-[1px] bg-[#FF3A0E]/40" />
          </div>
          <CursoFaqAccordion />
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section
        className="py-12 sm:py-16"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
          <h3
            className="text-3xl sm:text-4xl text-white mb-4"
            style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
          >
            Pronto para ter sua própria{' '}
            <span className="text-[#FF3A0E] italic" style={{ fontWeight: 300 }}>
              squad de agentes IA
            </span>
            ?
          </h3>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
            Acesso imediato às aulas gravadas. Comece hoje, no seu ritmo.
          </p>
          <div className="flex justify-center">
            <a
              href="#inscricao"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold uppercase transition-all hover:brightness-110 active:scale-[0.98]"
              style={{ background: '#FF3A0E', color: '#050507', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.16em' }}
            >
              Comprar agora — R$ 797
            </a>
          </div>
          <p className="mt-6 text-xs sm:text-sm text-white/60">
            7 dias de garantia total &middot; Acesso por 6 meses &middot; Cancelamento simplificado
          </p>
        </div>
      </section>

      </div>{/* end relative z-10 */}
    </>
  )
}
