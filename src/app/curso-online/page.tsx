import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Check, Play, FileText, MessageSquare, Award } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { ALL_AGENTES, SQUADS, TOTAL_AGENTES } from '@/data/agentes'
import { SolarSystemBackground } from '@/app/agentes/_components/SolarSystemBackground'
import { CursoSquadsSticky } from './_components/CursoSquadsSticky'
import { CursoFaqAccordion } from './_components/CursoFaqAccordion'
import { CheckoutForm } from './_components/checkout-form'
import { CursoOnlineTimeline } from './_components/CursoOnlineTimeline'
import { CursoPricingCalculator } from './_components/CursoPricingCalculator'

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

const COHORT_SLUG = 'curso-online-padrao'

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
    url: `${siteConfig.url}/academy/checkout/${COHORT_SLUG}`,
  },
}

const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
}

const KV_DISPLAY: React.CSSProperties = {
  fontFamily: 'var(--font-display-serif)',
  fontWeight: 400,
  letterSpacing: '-0.03em',
}

const INCLUDED = [
  { icon: Play, text: 'Aulas gravadas — assista no seu ritmo' },
  { icon: FileText, text: 'Materiais e templates de cada módulo' },
  { icon: MessageSquare, text: 'Fórum da comunidade — tire dúvidas' },
  { icon: Award, text: 'Certificado de conclusão' },
]

const FOR_WHOM = [
  'Profissionais que querem aprender no próprio ritmo, sem horário fixo',
  'Fundadores e solopreneurs que precisam de autonomia para escalar',
  'Devs e criadores de conteúdo que já usam IA mas querem orquestrar agentes de verdade',
  'Pessoas fora de Florianópolis que não podem comparecer à mentoria presencial',
  'Quem prefere consumir conteúdo em vídeo antes de investir numa mentoria intensiva',
]

const TESTIMONIALS = [
  {
    name: 'Ana Carolina M.',
    role: 'Head de Marketing',
    text: 'Consegui automatizar 80% do meu fluxo de conteúdo em 2 semanas. O método é direto ao ponto.',
  },
  {
    name: 'Rafael T.',
    role: 'Desenvolvedor Full Stack',
    text: 'Finalmente entendi como estruturar agentes de verdade. O Claude Code mudou minha forma de trabalhar.',
  },
  {
    name: 'Mariana S.',
    role: 'Fundadora de Startup',
    text: 'Implementei o sistema de agentes na minha empresa com os templates do curso. ROI em menos de 30 dias.',
  },
]


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
    bio: 'Especialista em transformação digital e implementação de IA em processos de vendas. No curso online você tem acesso ao mesmo conteúdo que usamos na mentoria presencial.',
    img: '/images/claudia-guirunas.png',
    linkedin: 'https://www.linkedin.com/in/claudiaguirunas',
  },
]

export default function CursoOnlinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Solar system background — fora do wrapper z-10 */}
      <SolarSystemBackground />

      <div style={{ background: 'transparent', minHeight: '100vh', color: '#f1f1f3' }}>

        {/* ===== HERO ===== */}
        <section id="hero" className="relative w-full -mt-16">
          <div className="relative min-h-[560px] sm:min-h-[92vh] overflow-hidden">
            <div className="relative z-10 flex flex-col h-full min-h-[560px] sm:min-h-[92vh] items-start justify-center px-6 sm:px-10 lg:px-16">
              <div className="sm:max-w-xl lg:max-w-2xl w-full pt-28 sm:pt-0 pb-8 sm:pb-0">

                {/* Badge */}
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <span
                    className="inline-flex items-center gap-2 border border-[#FF3A0E]/60 px-3 py-1.5"
                    style={{ background: 'rgba(255,58,14,0.08)', ...MONO }}
                  >
                    <span className="relative inline-flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3A0E] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3A0E]" />
                    </span>
                    <span className="text-[#FF3A0E] uppercase">Curso Online · Aulas Gravadas</span>
                  </span>
                </div>

                {/* H1 */}
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl text-white mb-4 sm:mb-6"
                  style={{ lineHeight: 0.95, letterSpacing: '-0.03em' }}
                >
                  <span style={{ ...KV_DISPLAY }}>{TOTAL_AGENTES} agentes Claude que </span>
                  <span style={{ ...KV_DISPLAY, fontStyle: 'italic', fontWeight: 300, color: '#FF3A0E' }}>
                    trabalham por você
                  </span>
                </h1>

                {/* Subtítulo */}
                <p className="text-base sm:text-lg text-white/80 sm:max-w-lg leading-relaxed mb-6 sm:mb-8">
                  Aprenda a criar, configurar e orquestrar uma squad completa de agentes de IA com Claude Code. No seu ritmo, sem horário fixo.
                </p>

                {/* Squad chips */}
                <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                  {SQUADS.map((s) => (
                    <a
                      key={s.id}
                      href={`#squad-${s.id}`}
                      className="inline-flex items-center gap-2 px-3 py-2 border transition-all hover:bg-white/[0.06]"
                      style={{ borderColor: `${s.accent}55`, background: `${s.accent}0d`, ...MONO }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.accent }} />
                      <span className="text-white/90 uppercase">{s.label}</span>
                      <span className="text-white/50">{s.count}</span>
                    </a>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <CheckoutForm cohortSlug={COHORT_SLUG} label="Comprar — R$ 797" />
                  <a
                    href="#squad-dev"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 uppercase transition-all hover:bg-white/[0.05]"
                    style={{ ...MONO, border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.55)' }}
                  >
                    Ver os agentes
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 sm:hidden pointer-events-none z-[2]" style={{ background: 'linear-gradient(to bottom, transparent, #050507)' }} />
          </div>
        </section>

        {/* ===== STATS BAR ===== */}
        <div
          className="relative z-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(5,5,7,0.85)' }}
        >
          <div className="mx-auto max-w-4xl px-5 sm:px-8 py-4 flex items-center justify-center gap-8 sm:gap-16">
            {[
              { value: `${TOTAL_AGENTES}`, label: 'Agentes' },
              { value: '4', label: 'Squads' },
              { value: '5', label: 'Módulos' },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span
                  className="text-2xl sm:text-3xl"
                  style={{ ...KV_DISPLAY, color: '#FF3A0E' }}
                >
                  {value}
                </span>
                <span style={{ ...MONO, color: 'rgba(255,255,255,0.35)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== AGENTES POR SQUAD ===== */}
        <div id="squads" className="relative z-10" style={{ background: 'rgba(5,5,7,0.6)' }}>
          <CursoSquadsSticky squads={SQUADS} agentes={ALL_AGENTES} />
        </div>

        {/* ===== FACILITADORES ===== */}
        <section
          id="facilitadores"
          className="relative z-10 py-16 sm:py-24"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(14,14,17,0.92)' }}
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-[140px]">
            <div className="text-center mb-12 sm:mb-16">
              <p
                className="mb-4"
                style={{ ...MONO, color: 'rgba(255, 58, 14, 0.85)' }}
              >
                Quem Facilita
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4" style={{ ...KV_DISPLAY, lineHeight: 0.95 }}>
                Seus <span className="text-[#FF3A0E]">Facilitadores</span>
              </h2>
              <div className="mx-auto w-12 sm:w-16 h-[1px] bg-[#FF3A0E]/40 mb-4 sm:mb-6" />
              <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
                No curso online você tem acesso ao mesmo conteúdo que usamos na mentoria presencial. Profissionais que vivem e respiram IA aplicada a negócios.
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
                        style={{ ...KV_DISPLAY, letterSpacing: '-0.02em' }}
                      >
                        {f.name}
                      </h3>
                      <p className="text-[#FF3A0E]/80 text-xs font-semibold tracking-[0.15em] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
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

        {/* ===== TIMELINE DE MÓDULOS ===== */}
        <div className="relative z-10">
          <CursoOnlineTimeline />
        </div>

        {/* ===== CALCULADORA DE PRECIFICAÇÃO ===== */}
        <div className="relative z-10">
          <CursoPricingCalculator />
        </div>

        {/* ===== O QUE ESTÁ INCLUÍDO ===== */}
        <section
          className="relative z-10 py-16 sm:py-20"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(5,5,7,0.9)' }}
        >
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <p className="mb-4" style={{ ...MONO, color: 'rgba(255, 58, 14, 0.85)' }}>
              Incluído
            </p>
            <h2
              className="mb-10 text-3xl sm:text-4xl"
              style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
            >
              Tudo que você precisa para{' '}
              <span className="italic" style={{ color: '#FF3A0E', fontWeight: 300 }}>começar agora</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {INCLUDED.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-4 p-5"
                  style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center"
                    style={{ background: 'rgba(255,58,14,0.12)', border: '1px solid rgba(255,58,14,0.2)' }}
                  >
                    <Icon className="h-4 w-4" style={{ color: '#FF3A0E' }} aria-hidden="true" />
                  </div>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PARA QUEM É ===== */}
        <section
          className="relative z-10 py-16 sm:py-20"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(5,5,7,0.9)' }}
        >
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <p className="mb-4" style={{ ...MONO, color: 'rgba(255, 58, 14, 0.85)' }}>
              Para quem é
            </p>
            <h2
              className="mb-10 text-3xl sm:text-4xl"
              style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
            >
              Este curso foi feito{' '}
              <span className="italic" style={{ color: '#FF3A0E', fontWeight: 300 }}>para você se</span>
            </h2>
            <div className="space-y-3">
              {FOR_WHOM.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 p-4"
                  style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                >
                  <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: '#FF3A0E' }} aria-hidden="true" />
                  <span className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>{item}</span>
                </div>
              ))}
            </div>
            <div
              className="mt-8 p-5"
              style={{ border: '1px solid rgba(255,58,14,0.2)', background: 'rgba(255,58,14,0.04)' }}
            >
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Precisa de acompanhamento intensivo, acesso a encontros ao vivo e suporte prioritário?{' '}
                <Link href="/mentoria" className="underline underline-offset-2" style={{ color: '#FF3A0E' }}>
                  Veja a Mentoria
                </Link>{' '}
                — um programa presencial em Florianópolis com turmas de até 12 pessoas.
              </p>
            </div>
          </div>
        </section>

        {/* ===== DEPOIMENTOS ===== */}
        <section
          className="relative z-10 py-16 sm:py-20"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.015)' }}
        >
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <p className="mb-4" style={{ ...MONO, color: 'rgba(255, 58, 14, 0.85)' }}>
              Quem já passou por aqui
            </p>
            <h2
              className="mb-10 text-3xl sm:text-4xl"
              style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
            >
              Resultados{' '}
              <span className="italic" style={{ color: '#FF3A0E', fontWeight: 300 }}>reais</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="flex flex-col p-6"
                  style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                >
                  <p className="mb-5 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-auto">
                    <p className="text-sm font-medium" style={{ color: '#f1f1f3' }}>{t.name}</p>
                    <p className="mt-0.5 text-xs" style={{ ...MONO, color: 'rgba(255,255,255,0.35)' }}>{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== GARANTIA ===== */}
        <section
          className="relative z-10 py-16 sm:py-20"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(5,5,7,0.9)' }}
        >
          <div className="mx-auto max-w-2xl px-5 sm:px-8 text-center">
            <p className="mb-4" style={{ ...MONO, color: 'rgba(255, 58, 14, 0.85)' }}>
              Garantia
            </p>
            <h2
              className="mb-6 text-3xl sm:text-4xl"
              style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
            >
              7 dias de{' '}
              <span className="italic" style={{ color: '#FF3A0E', fontWeight: 300 }}>garantia total</span>
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Se dentro de 7 dias após a compra você sentir que o curso não é para você, devolvemos 100% do valor pago. Sem burocracia, sem questionamentos.
            </p>
            <div
              className="inline-flex items-center gap-3 px-6 py-3"
              style={{ border: '1px solid rgba(255,58,14,0.25)', background: 'rgba(255,58,14,0.06)' }}
            >
              <span style={{ ...MONO, color: '#FF3A0E', fontSize: '10px' }}>Risco zero para você</span>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section
          id="faq"
          className="relative z-10 py-16 sm:py-20"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.015)' }}
        >
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <p className="mb-4 text-center" style={{ ...MONO, color: 'rgba(255, 58, 14, 0.85)' }}>
              FAQ
            </p>
            <h2
              className="mb-10 text-center text-3xl sm:text-4xl"
              style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
            >
              Dúvidas Comuns
            </h2>
            <CursoFaqAccordion />
          </div>
        </section>

        {/* ===== PREÇO + CTA FINAL ===== */}
        <section
          id="inscricao"
          className="relative z-10 py-16 sm:py-24"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(5,5,7,0.95)' }}
        >
          <div className="mx-auto max-w-2xl px-5 sm:px-8 text-center">
            <p className="mb-3" style={{ ...MONO, color: 'rgba(255, 58, 14, 0.85)' }}>
              Investimento
            </p>
            <div
              className="mb-2 text-6xl sm:text-7xl"
              style={{ ...KV_DISPLAY, letterSpacing: '-0.04em', lineHeight: 1 }}
            >
              6x de R$ 133,17
            </div>
            <p className="mb-1 text-base sm:text-lg" style={{ color: 'rgba(255,255,255,0.35)' }}>
              ou R$ 797 à vista
            </p>
            <p className="mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Acesso por 6 meses · Renovação disponível
            </p>
            <div className="mb-6 space-y-2">
              {INCLUDED.map(({ text }) => (
                <div key={text} className="flex items-center justify-center gap-2">
                  <Check className="h-3.5 w-3.5 shrink-0" style={{ color: '#FF3A0E' }} aria-hidden="true" />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{text}</span>
                </div>
              ))}
            </div>
            <CheckoutForm cohortSlug={COHORT_SLUG} label="Comprar agora — R$ 797" />
            <p className="mt-4 text-xs" style={{ ...MONO, color: 'rgba(255,255,255,0.2)' }}>
              Preferes acompanhamento intensivo ao vivo?{' '}
              <Link href="/mentoria" className="underline underline-offset-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Ver a Mentoria →
              </Link>
            </p>
          </div>
        </section>

        {/* Footer mínimo */}
        <footer
          className="relative z-10 py-6 text-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(5,5,7,0.95)' }}
        >
          <p className="text-xs" style={{ ...MONO, color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} João Guirunas · GrowthSales.ai
          </p>
        </footer>
      </div>
    </>
  )
}
