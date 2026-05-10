import type { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';
import { Icon } from '@/shared/components/ui';
import { MentoriaHeroSpline } from './_components/MentoriaHeroSpline';
import { FaqAccordion } from './faq-accordion';
import { MentorshipFeatures } from './mentorship-features';
import { CourseModulesTimeline } from './course-modules-timeline';
import { RevosForm } from './revos-form';
import { PricingCalculator } from './pricing-calculator';
import { SectionDots } from './section-dots';
import { SolutionSection } from './solution-section';

const INSCRICAO_ANCHOR = '#inscricao';
const KV_DISPLAY: React.CSSProperties = { fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.03em' };
const KV_MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 500 };

export const metadata: Metadata = {
  title: 'Mentoria Claude Code + AIOX — Agentes IA na Prática',
  description:
    'Mentoria intensiva e prática em Florianópolis. Aprenda a criar e orquestrar agentes de IA com Claude Code e o framework AIOX. Turmas de até 12 pessoas.',
  openGraph: {
    title: 'Mentoria Claude Code + AIOX — Agentes IA na Prática | João Guirunas',
    description:
      'Mentoria intensiva e prática em Florianópolis. Aprenda a criar e orquestrar agentes de IA com Claude Code e o framework AIOX. Turmas de até 12 pessoas.',
    images: [{ url: '/images/mentoria-hero-v2.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mentoria Claude Code + AIOX — Agentes IA na Prática | João Guirunas',
    description:
      'Mentoria intensiva e prática em Florianópolis. Aprenda a criar e orquestrar agentes de IA com Claude Code e o framework AIOX. Turmas de até 12 pessoas.',
  },
  alternates: {
    canonical: '/mentoria',
  },
};

const courseJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Mentoria Claude Code + AIOX',
  description:
    'Mentoria intensiva e prática para criar, configurar e orquestrar agentes de IA autônomos com Claude Code e o framework AIOX. Turmas de no máximo 12 pessoas.',
  provider: {
    '@type': 'Organization',
    name: 'GrowthSales.ai',
    url: 'https://www.growthsales.ai',
  },
  inLanguage: 'pt-BR',
  url: 'https://joaoguirunas.com/mentoria',
  offers: {
    '@type': 'Offer',
    price: '8700',
    priceCurrency: 'BRL',
    availability: 'https://schema.org/LimitedAvailability',
    url: 'https://joaoguirunas.com/mentoria#inscricao',
  },
};

function CtaButton({ label, variant = 'primary', className = '' }: { label: string; variant?: 'primary' | 'secondary'; className?: string }) {
  const monoStyle: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em' };
  if (variant === 'secondary') {
    return (
      <a
        href="#modulos"
        className={`inline-flex items-center justify-center gap-2 text-white/70 px-6 py-3 text-sm font-semibold uppercase transition-all hover:bg-white/[0.05] hover:text-white ${className}`}
        style={{ ...monoStyle, border: '1px solid rgba(255,255,255,0.16)' }}
      >
        {label}
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    );
  }
  return (
    <a
      href={INSCRICAO_ANCHOR}
      className={`inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold uppercase transition-all hover:brightness-110 active:scale-[0.98] ${className}`}
      style={{ ...monoStyle, background: '#FF3A0E', color: '#050507' }}
    >
      <span>{label}</span>
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  );
}

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
  );
}

export default function MentoriaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <SectionDots />
      {/* ===== HERO ===== */}
      <MentoriaHeroSpline />

      {/* ===== SOLUCAO ===== */}
      <SolutionSection />

      {/* ===== DIFERENCIAIS (Animated - 21st.dev) ===== */}
      <MentorshipFeatures />

      {/* ===== TIMELINE DOS MODULOS ===== */}
      <CourseModulesTimeline />

      {/* ===== FACILITADORES ===== */}
      <section id="facilitadores" className="py-16 sm:py-24 bg-[#0e0e11]">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-[140px]">
          <div className="text-center mb-12 sm:mb-16">
            <SectionBadge label="Quem Facilita" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4" style={{ ...KV_DISPLAY, lineHeight: 0.95 }}>Seus <span className="text-[#FF3A0E]">Facilitadores</span></h2>
            <div className="mx-auto w-12 sm:w-16 accent-line mb-4 sm:mb-6" />
            <p className="text-sm sm:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">Profissionais experientes que vivem e respiram IA aplicada a negócios. Fundadores da GrowthSales.ai.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 max-w-5xl mx-auto">
            {[
              { name: 'João Guirunas', role: 'Fundador GrowthSales.ai', bio: 'Especialista em IA aplicada a vendas e marketing. Pioneiro em orquestração de agentes autônomos. Criador do framework AIOX.', img: '/images/joao-guirunas-profile.jpg', linkedin: 'https://www.linkedin.com/in/joaoguirunas' },
              { name: 'Claudia Guirunas', role: 'Co-Fundadora GrowthSales.ai', bio: 'Especialista em transformação digital e implementação de IA em processos de vendas. Focada em resultados mensuráveis e ROI.', img: '/images/claudia-guirunas.png', linkedin: 'https://www.linkedin.com/in/claudiaguirunas' },
            ].map((f) => (
              <div key={f.name} className="flex flex-col items-center text-center group">
                <div className="relative mb-8">
                  <div
                    className="w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72 overflow-hidden transition-all duration-500 group-hover:[box-shadow:0_0_32px_rgba(255,58,14,0.18)] group-hover:[border-color:rgba(255,58,14,0.35)]"
                    style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    <Image src={f.img} alt={`${f.name} - ${f.role}`} width={288} height={288} sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, 288px" className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl text-white mb-2 group-hover:text-[#FF3A0E] transition-colors" style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.02em' }}>{f.name}</h3>
                    <p className="text-[#FF3A0E]/80 text-xs font-semibold tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>{f.role}</p>
                  </div>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">{f.bio}</p>
                  <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-[#FF3A0E] hover:text-white transition-all text-xs sm:text-sm font-semibold border border-[#FF3A0E]/30 hover:border-[#FF3A0E] px-6 py-3 hover:bg-[#FF3A0E]/5" style={{ fontFamily: "var(--font-mono)", textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    <Icon name="linkedin" size="16" /> LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="https://www.growthsales.ai/cultura" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-[#FF3A0E]/30 bg-[#FF3A0E]/10 text-[#FF3A0E] hover:bg-[#FF3A0E]/20 transition-all text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
              Conheça Nossa Cultura
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ===== INVESTIMENTO (Calculadora Interativa) ===== */}
      <PricingCalculator />

      {/* ===== INSCRICAO (LISTA DE ESPERA) ===== */}
      <section id="inscricao" className="relative py-16 sm:py-24 overflow-hidden">
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
          {/* Aviso de turma esgotada */}
          <div className="text-center mb-10">
            <span
              className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 mb-6"
              style={{ background: 'rgba(255,255,255,0.06)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.12em' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#FF3A0E]" style={{ boxShadow: '0 0 6px #FF3A0E' }} />
              <span className="text-[#FF3A0E] uppercase">Turma de junho · 15/06 · 12 vagas</span>
            </span>
            <h2
              className="text-3xl sm:text-4xl text-white mb-3"
              style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 0.95 }}
            >
              Garanta sua vaga na{' '}
              <span className="text-[#FF3A0E] italic" style={{ fontWeight: 300 }}>turma de junho</span>
            </h2>
            <p className="text-white/55 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Início em 15 de junho. Turma de 12 alunos com vagas limitadas.
            </p>
          </div>
          <RevosForm />
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-16 sm:py-24 bg-[#050507]">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <SectionBadge label="FAQ" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white" style={{ ...KV_DISPLAY, lineHeight: 0.95 }}>Dúvidas Comuns</h2>
            <div className="mx-auto mt-4 sm:mt-6 w-12 sm:w-16 accent-line" />
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-12 sm:py-16 bg-[#050507]">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl sm:text-4xl text-white mb-4" style={{ ...KV_DISPLAY, lineHeight: 0.95 }}>Pronto para ter sua própria <span className="text-[#FF3A0E] italic" style={{ fontWeight: 300 }}>equipe de agentes IA</span>?</h3>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto text-sm sm:text-base">Início em 15 de junho. Turma de 12 alunos — vagas limitadas.</p>
          <CtaButton label="Entrar na lista de espera" className="text-base sm:text-lg" />
          <p className="mt-6 text-xs sm:text-sm text-white/60"><Icon name="zap" size="16" className="inline" /> Resposta em até 24h | <Icon name="lock" size="16" className="inline" /> Dados 100% seguros</p>
        </div>
      </section>

    </>
  );
}
