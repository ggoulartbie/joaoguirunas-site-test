import type { Metadata } from 'next'
import Link from 'next/link'
import { SolarSystemBackground } from '@/app/agentes/_components/SolarSystemBackground'
import { SectionDots } from '@/app/mentoria/section-dots'
import { EmBreveHero } from '@/app/cursos/_shared/EmBreveHero'
import { CursoFacilitador } from '@/app/cursos/_shared/CursoFacilitador'
import { CursoInscricaoEmBreve } from '@/app/cursos/_shared/CursoInscricaoEmBreve'
import { CursoEmBreveFaq } from '@/app/cursos/_shared/CursoEmBreveFaq'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Bundle — Os 4 Cursos de IA num Pacote Completo | Em Breve',
  description:
    'IA & Agentes, Design com IA, Dev com IA e Social Media com IA — tudo num único pacote. Acesso completo com condições especiais. Lista de espera aberta.',
  alternates: { canonical: '/curso-bundle' },
  openGraph: {
    title: 'Bundle Completo — 4 Cursos de IA | João Guirunas — Em Breve',
    description:
      'IA & Agentes, Design com IA, Dev com IA e Social Media com IA — tudo num único pacote com condições especiais.',
    url: `${siteConfig.url}/curso-bundle`,
    images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bundle Completo — 4 Cursos de IA | João Guirunas — Em Breve',
    description:
      'IA & Agentes, Design com IA, Dev com IA e Social Media com IA — tudo num único pacote com condições especiais.',
  },
}

const COURSE_SLUG = 'curso-bundle'

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

const BUNDLE_COURSES = [
  {
    area: 'IA & Agentes',
    slug: '/curso-ia-agentes',
    headline: 'Claude Code, MCP, AIOX e orquestração de squads autônomas.',
    tags: ['Claude Code', 'MCP', 'AIOX'],
    color: '#FF3A0E',
  },
  {
    area: 'Design com IA',
    slug: '/curso-design',
    headline: 'Design systems automatizados, Figma + IA e brand com agentes.',
    tags: ['Design System', 'Figma', 'Claude Design'],
    color: '#FF3A0E',
  },
  {
    area: 'Dev com IA',
    slug: '/curso-dev',
    headline: 'Sites full-stack com Next.js, Supabase, Vercel e GitHub.',
    tags: ['Next.js', 'Supabase', 'Vercel'],
    color: '#FF3A0E',
  },
  {
    area: 'Social Media & Conteúdo',
    slug: '/curso-social-media',
    headline: 'Squad de conteúdo com IA: carrosséis, captions e calendário editorial.',
    tags: ['Instagram', 'Copywriting', 'Agentes'],
    color: '#FF3A0E',
  },
]

const BUNDLE_BENEFITS = [
  {
    title: 'Acesso completo a todos os 4 cursos',
    description: 'Um único login, todos os conteúdos — IA & Agentes, Design, Dev e Social Media.',
  },
  {
    title: 'Melhor custo-benefício',
    description: 'O bundle sai significativamente mais barato do que comprar os 4 cursos individualmente.',
  },
  {
    title: 'Trilha de aprendizado integrada',
    description: 'Os cursos foram desenhados para se complementar — você aprende de forma progressiva e conectada.',
  },
  {
    title: 'Acesso simultâneo',
    description: 'Assista qualquer curso a qualquer momento, no ritmo que faz sentido para você.',
  },
]

const FAQ_ITEMS = [
  {
    q: 'Posso comprar os cursos individualmente em vez do bundle?',
    a: 'Sim. Cada curso estará disponível para venda individual. O bundle é a opção mais econômica para quem quer acesso a todos os 4 cursos.',
  },
  {
    q: 'Os cursos têm pré-requisitos entre si?',
    a: 'Não há pré-requisitos obrigatórios. O Curso IA & Agentes é uma boa porta de entrada, mas você pode começar por qualquer área que seja mais relevante para você.',
  },
  {
    q: 'Por quanto tempo terei acesso?',
    a: 'A duração de acesso será definida e comunicada na abertura das inscrições. Entre na lista de espera e você saberá em primeira mão.',
  },
  {
    q: 'Quando as inscrições do bundle abrem?',
    a: 'A data ainda não está confirmada. Cadastre-se na lista de espera e seja notificado(a) imediatamente — com as melhores condições disponíveis.',
  },
]

export default function CursoBundlePage() {
  return (
    <>
      <SolarSystemBackground />
      <div className="relative z-10">
        <SectionDots />

        <EmBreveHero
          area="Bundle · 4 Cursos Completos"
          headline="Tudo que você precisa para"
          headlineAccent="dominar a IA"
          subtitle="Os 4 cursos num único pacote: IA & Agentes, Design com IA, Dev com IA e Social Media. Uma trilha completa de aprendizado — do zero à operação real."
          tags={['IA & Agentes', 'Design', 'Dev', 'Social Media', 'Bundle']}
          stats={[
            { value: '4', label: 'Cursos' },
            { value: '24+', label: 'Módulos' },
            { value: '100%', label: 'On-demand' },
          ]}
        />

        {/* Os 4 cursos inclusos */}
        <section
          id="cursos-inclusos"
          className="py-16 sm:py-24"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-[140px]">
            <div className="text-center mb-12 sm:mb-16">
              <p
                className="mb-4 sm:mb-6"
                style={{ ...KV_MONO, color: 'rgba(255, 58, 14, 0.85)' }}
              >
                Inclusos no Bundle
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4"
                style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
              >
                Os <span className="text-[#FF3A0E]">4 cursos</span> completos
              </h2>
              <div className="mx-auto w-12 sm:w-16 h-[1px] bg-[#FF3A0E]/40" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {BUNDLE_COURSES.map((course) => (
                <Link
                  key={course.slug}
                  href={course.slug}
                  className="group block p-6 sm:p-8 transition-all hover:border-[#FF3A0E]/30"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs px-2 py-1"
                      style={{
                        background: 'rgba(255,58,14,0.1)',
                        border: '1px solid rgba(255,58,14,0.25)',
                        ...KV_MONO,
                        color: '#FF3A0E',
                        fontSize: '9px',
                      }}
                    >
                      {course.area}
                    </span>
                    <svg
                      className="h-4 w-4 text-[#FF3A0E] opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                  <h3
                    className="text-white text-xl mb-3 group-hover:text-[#FF3A0E] transition-colors"
                    style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400 }}
                  >
                    {course.area}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    {course.headline}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          ...KV_MONO,
                          color: 'rgba(255,255,255,0.4)',
                          fontSize: '9px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p
                    className="mt-4 text-xs group-hover:text-[#FF3A0E]/80 transition-colors"
                    style={{ ...KV_MONO, color: 'rgba(255,255,255,0.2)', fontSize: '9px' }}
                  >
                    Ver detalhes do curso →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Benefícios do bundle */}
        <section
          id="beneficios"
          className="py-16 sm:py-24"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-[140px]">
            <div className="text-center mb-12 sm:mb-16">
              <p
                className="mb-4 sm:mb-6"
                style={{ ...KV_MONO, color: 'rgba(255, 58, 14, 0.85)' }}
              >
                Por que o Bundle
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4"
                style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
              >
                Bundle vs{' '}
                <span className="text-[#FF3A0E]">Individual</span>
              </h2>
              <div className="mx-auto w-12 sm:w-16 h-[1px] bg-[#FF3A0E]/40" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {BUNDLE_BENEFITS.map((benefit, i) => (
                <div
                  key={i}
                  className="p-6 sm:p-8"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div
                    className="flex h-8 w-8 items-center justify-center mb-4"
                    style={{
                      background: 'rgba(255,58,14,0.1)',
                      border: '1px solid rgba(255,58,14,0.2)',
                    }}
                  >
                    <span style={{ color: '#FF3A0E', fontSize: '14px', fontWeight: 700 }}>
                      {i + 1}
                    </span>
                  </div>
                  <h3
                    className="text-white text-base mb-2"
                    style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400 }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CursoFacilitador />

        <CursoInscricaoEmBreve
          courseSlug={COURSE_SLUG}
          headline="Entre na lista de"
          headlineAccent="espera do Bundle"
          description="Seja avisado(a) assim que as inscrições do bundle abrirem. Os primeiros da lista garantem as melhores condições de acesso."
          bullets={[
            'Notificação imediata quando as inscrições abrirem',
            'Melhores condições garantidas para os primeiros',
            'Acesso ao melhor preço do pacote completo',
          ]}
        />

        <CursoEmBreveFaq items={FAQ_ITEMS} id="faq-bundle" />
      </div>
    </>
  )
}
