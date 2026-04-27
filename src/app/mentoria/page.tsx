import type { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';
import { Icon } from '@/shared/components/ui';
import { GrowthWatermark } from '@/shared/components/ui/growth-watermark';
import { FaqAccordion } from './faq-accordion';
import { MentorshipFeatures } from './mentorship-features';
import { CourseModulesTimeline } from './course-modules-timeline';
import { RevosForm } from './revos-form';
import { PricingCalculator } from './pricing-calculator';
import { MentoriaNav } from './mentoria-nav';
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
      <MentoriaNav />
      <SectionDots />
      {/* ===== HERO ===== */}
      <section id="hero" className="relative w-full bg-[#050507] -mt-16">
        {/* MOBILE: imagem no topo, texto abaixo com overlap */}
        <div className="sm:hidden">
          {/* Imagem com overlay, degradê e texto dentro */}
          <div className="relative w-full overflow-hidden" style={{ height: '380px' }}>
            <Image
              src="/images/mentoria-hero-v2.png"
              alt="João Guirunas - Mentoria Claude Code"
              fill
              className="object-cover"
              style={{ objectPosition: '92% 30%', transform: 'scaleX(-1)' }}
              priority
            />
            {/* Overlay geral */}
            <div className="absolute inset-0 bg-[#050507]/55" />
            {/* Degradê na base */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(5,5,7,0.03) 30%, rgba(5,5,7,0.1) 55%, rgba(5,5,7,0.5) 75%, rgba(5,5,7,0.82) 88%, #050507 98%)' }} />
            {/* Texto sobre a imagem */}
            <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-6">
              <div className="flex flex-col items-start gap-2 mb-4">
                <div className="inline-flex items-center gap-2 border border-white/20 px-3 py-1.5" style={{ background: 'rgba(255,255,255,0.04)', fontFamily: "var(--font-mono)" }}>
                  <Icon name="clock" size="16" className="text-[#FF3A0E]" />
                  <span className="text-white/70 text-xs uppercase tracking-wider">Início da turma: <strong className="text-white">12 de maio</strong></span>
                </div>
                <div className="inline-flex items-center gap-2 border border-[#FF3A0E]/60 px-4 py-2" style={{ background: 'rgba(255,58,14,0.08)' }}>
                  <span className="relative inline-flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3A0E] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF3A0E]" />
                  </span>
                  <span className="text-[#FF3A0E] text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
                    Restam somente 4 vagas
                  </span>
                </div>
              </div>
              <h1 className="text-3xl text-white mb-3" style={{ lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                <span style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400 }}>Tenha uma Equipe de Agentes de IA </span>
                <span style={{ fontFamily: 'var(--font-display-serif)', fontStyle: 'italic', fontWeight: 300, color: '#FF3A0E' }}>
                  Trabalhando Para Você 24/7
                </span>
              </h1>
              <p className="text-sm text-white/80 leading-relaxed mb-5">
                Aprenda a criar, configurar e orquestrar agentes autônomos que executam tarefas complexas para você. <strong className="text-white font-medium">Mentoria intensiva e prática.</strong>
              </p>
              <div className="flex flex-col gap-3">
                <CtaButton label="Fale com um Especialista" />
                <CtaButton label="Como Funciona" variant="secondary" />
              </div>
            </div>
          </div>
          {/* Linha abaixo da imagem */}
          <div className="px-6 py-4 bg-[#050507]">
            <p className="text-white/60 text-xs uppercase tracking-widest flex items-center gap-2 flex-wrap" style={{ fontFamily: "var(--font-mono)" }}>
              <Icon name="clock" size="16" className="text-[#FF3A0E]" /> Max. 12 pessoas <span className="opacity-40">|</span> <Icon name="check" size="16" className="text-[#FF3A0E]" /> Garantia 7 dias
            </p>
            <p className="text-white/40 text-xs uppercase tracking-widest flex items-center gap-2 flex-wrap mt-2" style={{ fontFamily: "var(--font-mono)" }}>
              <Icon name="clock" size="16" className="text-[#FF3A0E]" /> Próxima turma: <span className="text-white font-semibold">12 de maio</span> <span className="opacity-40">|</span> Restam 4 vagas
            </p>
          </div>
        </div>

        {/* DESKTOP: layout overlay original */}
        <div className="relative hidden sm:block min-h-[62vh] overflow-hidden">
          <GrowthWatermark size={600} className="bottom-0 right-0 translate-x-1/4" />
          <Image
            src="/images/mentoria-hero-v2.png"
            alt="Equipe GrowthSales AI"
            fill
            className="object-cover"
            style={{ objectPosition: '92% 30%', transform: 'scaleX(-1)' }}
            priority
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #050507 0%, #050507 28%, rgba(5,5,7,0.85) 44%, rgba(5,5,7,0.3) 68%, rgba(5,5,7,0.1) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,5,7,0.4) 0%, transparent 25%, transparent 48%, rgba(5,5,7,0.6) 65%, rgba(5,5,7,0.88) 78%, #050507 88%)' }} />
          <div className="absolute inset-0 flex items-center px-10 lg:px-16">
            <div className="mx-auto max-w-7xl w-full">
              <div className="max-w-xl lg:max-w-2xl">
                <div className="flex flex-col items-start gap-2 mb-6">
                  <div className="inline-flex items-center gap-2 border border-white/20 px-3 py-1.5" style={{ background: 'rgba(255,255,255,0.04)', fontFamily: "var(--font-mono)" }}>
                    <Icon name="clock" size="16" className="text-[#FF3A0E]" />
                    <span className="text-white/70 text-xs uppercase tracking-wider">Início da turma: <strong className="text-white">12 de maio</strong></span>
                  </div>
                  <div className="inline-flex items-center gap-2 backdrop-blur-sm border border-[#FF3A0E]/60 px-4 py-2" style={{ background: 'rgba(255,58,14,0.08)' }}>
                    <span className="relative inline-flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3A0E] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF3A0E]" />
                    </span>
                    <span className="text-[#FF3A0E] text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
                      Restam somente 4 vagas
                    </span>
                  </div>
                </div>
                <h1 className="text-4xl lg:text-5xl text-white mb-5" style={{ lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                  <span style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400 }}>Tenha uma Equipe de Agentes de IA </span>
                  <span style={{ fontFamily: 'var(--font-display-serif)', fontStyle: 'italic', fontWeight: 300, color: '#FF3A0E' }}>
                    Trabalhando Para Você 24/7
                  </span>
                </h1>
                <p className="text-base text-white/80 max-w-lg leading-relaxed mb-8">
                  Aprenda a criar, configurar e orquestrar agentes autônomos que executam tarefas complexas para você — da escrita de código à criação de conteúdo. <strong className="text-white font-medium">Mentoria intensiva e prática.</strong>
                </p>
                <div className="flex flex-row gap-4 mb-8">
                  <CtaButton label="Fale com um Especialista" />
                  <CtaButton label="Como Funciona" variant="secondary" />
                </div>
                <p className="text-white/60 text-xs uppercase tracking-widest flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                  <Icon name="clock" size="16" className="text-[#FF3A0E]" /> Max. 12 pessoas <span className="opacity-40">|</span> <Icon name="check" size="16" className="text-[#FF3A0E]" /> Garantia 7 dias
                </p>
                <p className="text-white/40 text-xs uppercase tracking-widest flex items-center gap-2 mt-2" style={{ fontFamily: "var(--font-mono)" }}>
                  <Icon name="clock" size="16" className="text-[#FF3A0E]" /> Próxima turma: <span className="text-white font-semibold">12 de maio</span> <span className="opacity-40">|</span> Restam 4 vagas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                    <Image src={f.img} alt={`${f.name} - ${f.role}`} width={288} height={288} className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500" />
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

      {/* ===== INSCRICAO (FORMULARIO EMBEDADO) ===== */}
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
          <p className="text-white/60 mb-8 max-w-2xl mx-auto text-sm sm:text-base">Fale com nossa equipe e garanta sua vaga na próxima turma</p>
          <CtaButton label="Falar com Especialista" className="text-base sm:text-lg" />
          <p className="mt-6 text-xs sm:text-sm text-white/60"><Icon name="zap" size="16" className="inline" /> Resposta em até 24h | <Icon name="lock" size="16" className="inline" /> Dados 100% seguros</p>
        </div>
      </section>

    </>
  );
}
