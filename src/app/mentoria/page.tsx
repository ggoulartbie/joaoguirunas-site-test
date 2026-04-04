import type { Metadata } from 'next';
import Image from 'next/image';
import { Icon } from '@/shared/components/ui';
import { FaqAccordion } from './faq-accordion';
import { MentorshipFeatures } from './mentorship-features';
import { CourseModulesTimeline } from './course-modules-timeline';
import { RevosForm } from './revos-form';
import { PricingCalculator } from './pricing-calculator';
import { MentoriaNav } from './mentoria-nav';
import { SectionDots } from './section-dots';
import { SolutionSection } from './solution-section';

const INSCRICAO_ANCHOR = '#inscricao';
const DISPLAY_FONT = { fontFamily: "'TASAOrbiter', var(--font-bb-display), sans-serif" } as const;

export const metadata: Metadata = {
  title: 'Mentoria Claude Code + AIOX',
  description:
    'Tenha uma equipe de agentes de IA trabalhando para voce. Mentoria intensiva e pratica com turmas de no maximo 12 pessoas em Florianopolis.',
  openGraph: {
    images: [{ url: '/images/mentoria-og.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: '/mentoria',
  },
};

function CtaButton({ label, variant = 'primary', className = '' }: { label: string; variant?: 'primary' | 'secondary'; className?: string }) {
  if (variant === 'secondary') {
    return (
      <a
        href="#modulos"
        className={`inline-flex items-center justify-center gap-2 border border-[#FF4400]/50 bg-white/5 backdrop-blur-md text-white px-6 py-3 text-sm sm:text-base font-bold uppercase tracking-widest hover:bg-white/10 transition-all ${className}`}
        style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
      >
        {label}
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    );
  }
  return (
    <a
      href={INSCRICAO_ANCHOR}
      className={`btn-primary inline-flex items-center justify-center gap-2 bg-[#FF4400] text-white px-8 py-4 text-sm sm:text-base font-bold shadow-2xl shadow-[#FF4400]/40 hover:bg-[#FF5722] transition-all hover:scale-105 ${className}`}
    >
      <span>{label}</span>
      <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </a>
  );
}

function SectionBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 border border-[#FF4400]/30 bg-[#FF4400]/10 px-3 sm:px-4 py-1.5 mb-4 sm:mb-6">
      <span className="text-[#FF4400] text-[0.55rem] sm:text-[0.65rem]" style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace", textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
        {label}
      </span>
    </div>
  );
}

export default function MentoriaPage() {
  return (
    <>
      <MentoriaNav />
      <SectionDots />
      {/* ===== HERO ===== */}
      <section id="hero" className="relative w-full min-h-[85vh] overflow-hidden bg-[#08080C]">
        <Image
          src="/images/mentoria-hero.png"
          alt="Mentoria Claude Code + AIOX"
          fill
          className="object-cover"
          style={{ objectPosition: '70% 25%', transform: 'scaleX(-1)' }}
          priority
        />
        {/* Gradiente lateral forte — escurece a esquerda, preserva rostos na direita */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #08080C 0%, #08080C 35%, rgba(8,8,12,0.85) 50%, rgba(8,8,12,0.4) 70%, rgba(8,8,12,0.25) 100%)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080C]/40 via-transparent to-[#08080C]" />

        <div className="absolute inset-0 flex items-center px-6 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl w-full">
            <div className="max-w-xl lg:max-w-2xl">
              <div className="inline-flex items-center gap-2 backdrop-blur-sm border border-[#FF4400]/60 px-4 py-2 mb-6" style={{ background: 'rgba(255,68,0,0.08)' }}>
                <span className="relative inline-flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4400] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF4400]" />
                </span>
                <span className="text-[#FF4400] text-[0.7rem] font-semibold uppercase tracking-wider" style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}>
                  Restam somente 4 vagas
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-[1.15] tracking-tight mb-5" style={DISPLAY_FONT}>
                Tenha uma Equipe de Agentes de IA{' '}
                <span className="text-[#FF4400]">Trabalhando Para Voce 24/7</span>
              </h1>

              <p className="text-sm sm:text-base text-white/80 max-w-lg leading-relaxed mb-8">
                Aprenda a criar, configurar e orquestrar agentes autonomos que executam tarefas complexas para voce — da escrita de codigo a criacao de conteudo. <strong className="text-white font-medium">Mentoria intensiva e pratica.</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
                <CtaButton label="Fale com um Especialista" />
                <CtaButton label="Como Funciona" variant="secondary" />
              </div>

              <p className="text-white/40 text-[0.65rem] uppercase tracking-widest flex items-center gap-2 flex-wrap" style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}>
                <Icon name="clock" size="16" className="text-[#FF4400]" /> Max. 12 pessoas <span className="opacity-40">|</span> <Icon name="check" size="16" className="text-[#FF4400]" /> Garantia 7 dias
              </p>
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
      <section id="facilitadores" className="py-16 sm:py-24 bg-[#0C0C12]">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <SectionBadge label="Quem Facilita" />
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl mb-4 leading-tight tracking-tight" style={DISPLAY_FONT}>Seus <span className="text-[#FF4400]">Facilitadores</span></h2>
            <div className="mx-auto w-12 sm:w-16 accent-line mb-4 sm:mb-6" />
            <p className="text-sm sm:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">Profissionais experientes que vivem e respiram IA aplicada a negocios. Fundadores da GrowthSales.ai.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 max-w-5xl mx-auto">
            {[
              { name: 'Joao Guirunas', role: 'Fundador GrowthSales.ai', bio: 'Especialista em IA aplicada a vendas e marketing. Pioneiro em orquestracao de agentes autonomos. Criador do framework AIOX.', img: '/images/joao-guirunas-profile.jpg', linkedin: 'https://www.linkedin.com/in/joaoguirunas' },
              { name: 'Claudia Guirunas', role: 'Co-Fundadora GrowthSales.ai', bio: 'Especialista em transformacao digital e implementacao de IA em processos de vendas. Focada em resultados mensuraveis e ROI.', img: '/images/claudia-guirunas.png', linkedin: 'https://www.linkedin.com/in/claudiaguirunas' },
            ].map((f) => (
              <div key={f.name} className="flex flex-col items-center text-center group">
                <div className="relative mb-8">
                  <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden ring-[3px] ring-[#FF4400]/20 group-hover:ring-[#FF4400]/50 transition-all duration-500 shadow-2xl shadow-[#FF4400]/15">
                    <Image src={f.img} alt={`${f.name} - ${f.role}`} width={288} height={288} className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-[#FF4400] transition-colors">{f.name}</h3>
                    <p className="text-[#FF4400]/80 text-[0.65rem] sm:text-xs font-semibold tracking-[0.15em] uppercase" style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}>{f.role}</p>
                  </div>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">{f.bio}</p>
                  <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-[#FF4400] hover:text-white transition-all text-xs font-semibold border border-[#FF4400]/30 hover:border-[#FF4400] px-6 py-3 hover:bg-[#FF4400]/5" style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace", textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    <Icon name="linkedin" size="16" /> LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="https://www.growthsales.ai/cultura" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-[#FF4400]/30 bg-[#FF4400]/10 text-[#FF4400] hover:bg-[#FF4400]/20 transition-all text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}>
              Conheca Nossa Cultura
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
          <div className="absolute inset-0 bg-[#08080C]/85" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <RevosForm />
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-16 sm:py-24 bg-[#08080C]">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <SectionBadge label="FAQ" />
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl tracking-tight" style={DISPLAY_FONT}>Duvidas Comuns</h2>
            <div className="mx-auto mt-4 sm:mt-6 w-12 sm:w-16 accent-line" />
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-12 sm:py-16 bg-[#08080C]">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl sm:text-3xl font-bold text-white mb-4 leading-tight">Pronto para ter sua propria <span className="text-[#FF4400]">equipe de agentes IA</span>?</h3>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto text-sm sm:text-base">Fale com nossa equipe e garante sua vaga na proxima turma</p>
          <CtaButton label="Falar com Especialista" className="text-base sm:text-lg" />
          <p className="mt-6 text-xs sm:text-sm text-white/60"><Icon name="zap" size="16" className="inline" /> Resposta em ate 24h | <Icon name="lock" size="16" className="inline" /> Dados 100% seguros</p>
        </div>
      </section>

    </>
  );
}
