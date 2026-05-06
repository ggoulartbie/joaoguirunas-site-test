import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, X, ArrowRight, Play, FileText, MessageSquare, Award } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Curso Online | Claude Agents Team — R$ 499',
  description:
    'Acesso completo ao conteúdo em vídeo, materiais, fórum e certificado. Aprenda a criar e orquestrar agentes de IA com Claude Code no seu próprio ritmo.',
  alternates: { canonical: '/curso-online' },
  openGraph: {
    title: 'Curso Online | Claude Agents Team — R$ 499 | João Guirunas',
    description:
      'Acesso completo ao conteúdo em vídeo, materiais, fórum e certificado. Aprenda a criar e orquestrar agentes de IA com Claude Code no seu próprio ritmo.',
    url: `${siteConfig.url}/curso-online`,
    images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curso Online | Claude Agents Team — R$ 499',
    description:
      'Acesso completo ao conteúdo em vídeo, materiais, fórum e certificado. Aprenda a criar e orquestrar agentes de IA com Claude Code no seu próprio ritmo.',
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
    price: '499',
    priceCurrency: 'BRL',
    availability: 'https://schema.org/InStock',
    url: `${siteConfig.url}/academy/checkout/${COHORT_SLUG}`,
  },
}

const KV_MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
}

const INCLUDED = [
  { icon: Play, text: 'Acesso completo ao conteúdo em vídeo' },
  { icon: FileText, text: 'Materiais e templates de cada módulo' },
  { icon: MessageSquare, text: 'Fórum da comunidade — tire dúvidas' },
  { icon: Award, text: 'Certificado de conclusão' },
]

const NOT_INCLUDED = [
  'Encontros ao vivo em grupo',
  'Sessões de mentoria individual',
  'Bônus dos frameworks aceleradores (código Growth Sales)',
  'Suporte prioritário via WhatsApp',
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

export default async function CursoOnlinePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const checkoutHref = user
    ? `/academy/checkout/${COHORT_SLUG}`
    : `/academy/login?next=/academy/checkout/${COHORT_SLUG}`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ background: '#050507', minHeight: '100vh', color: '#f1f1f3' }}>

        {/* Dot texture */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Nav */}
        <nav
          className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white/70"
            style={KV_MONO}
          >
            João Guirunas
          </Link>
          <Link
            href="/mentoria"
            className="font-mono text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white/70"
            style={KV_MONO}
          >
            Ver Mentoria ↗
          </Link>
        </nav>

        {/* ===== HERO ===== */}
        <section className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 pt-20 pb-16 text-center">
          <p
            className="mb-6"
            style={{ ...KV_MONO, color: 'rgba(255, 58, 14, 0.85)' }}
          >
            Curso Online
          </p>
          <h1
            className="mb-6 text-4xl sm:text-6xl lg:text-7xl"
            style={{
              fontFamily: 'var(--font-display-serif)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              color: '#f1f1f3',
            }}
          >
            Claude Agents{' '}
            <span
              className="italic"
              style={{ color: '#FF3A0E', fontWeight: 300 }}
            >
              Team
            </span>
          </h1>
          <p
            className="mx-auto mb-10 max-w-xl text-base sm:text-lg leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Aprenda a criar e orquestrar agentes de IA com Claude Code no seu
            próprio ritmo. Acesso completo ao conteúdo, materiais e certificado.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={checkoutHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold uppercase transition-all hover:brightness-110 active:scale-[0.98] w-full sm:w-auto"
              style={{ ...KV_MONO, background: '#FF3A0E', color: '#050507', fontSize: '12px' }}
            >
              Comprar agora — R$ 499
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <a
              href="#o-que-inclui"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold uppercase transition-all hover:bg-white/[0.05] w-full sm:w-auto"
              style={{ ...KV_MONO, border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.55)', fontSize: '12px' }}
            >
              Ver o que está incluído
            </a>
          </div>
          <p
            className="mt-5 text-xs"
            style={{ ...KV_MONO, color: 'rgba(255,255,255,0.25)' }}
          >
            Pagamento único · Acesso imediato · Sem mensalidade
          </p>
        </section>

        {/* ===== O QUE ESTÁ INCLUÍDO ===== */}
        <section id="o-que-inclui" className="relative z-10 py-16 sm:py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <p className="mb-4" style={{ ...KV_MONO, color: 'rgba(255, 58, 14, 0.85)' }}>
              Incluído
            </p>
            <h2
              className="mb-10 text-3xl sm:text-4xl"
              style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 0.95 }}
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

        {/* ===== DIFERENCIAL HONESTO — O QUE NÃO ESTÁ INCLUÍDO ===== */}
        <section className="relative z-10 py-16 sm:py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.015)' }}>
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="grid gap-10 sm:grid-cols-2 items-start">
              <div>
                <p className="mb-4" style={{ ...KV_MONO, color: 'rgba(255,255,255,0.35)' }}>
                  Não incluído neste plano
                </p>
                <h2
                  className="mb-2 text-2xl sm:text-3xl"
                  style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1 }}
                >
                  Transparência total
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  O Curso Online não inclui os elementos ao vivo da Mentoria. Se precisas de acompanhamento presencial,{' '}
                  <Link href="/mentoria" className="underline underline-offset-2" style={{ color: '#FF3A0E' }}>
                    veja a Mentoria
                  </Link>
                  .
                </p>
              </div>
              <div className="space-y-3">
                {NOT_INCLUDED.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 py-3 px-4"
                    style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <X className="h-3.5 w-3.5 shrink-0" style={{ color: 'rgba(255,255,255,0.2)' }} aria-hidden="true" />
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== DEPOIMENTOS ===== */}
        <section className="relative z-10 py-16 sm:py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <p className="mb-4" style={{ ...KV_MONO, color: 'rgba(255, 58, 14, 0.85)' }}>
              Quem já passou por aqui
            </p>
            <h2
              className="mb-10 text-3xl sm:text-4xl"
              style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 0.95 }}
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
                    <p className="mt-0.5 text-xs" style={{ ...KV_MONO, color: 'rgba(255,255,255,0.35)' }}>{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PREÇO + CTA ===== */}
        <section className="relative z-10 py-16 sm:py-24" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="mx-auto max-w-2xl px-5 sm:px-8 text-center">
            <p className="mb-3" style={{ ...KV_MONO, color: 'rgba(255, 58, 14, 0.85)' }}>
              Investimento
            </p>
            <div
              className="mb-2 text-6xl sm:text-7xl"
              style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1 }}
            >
              R$ 499
            </div>
            <p className="mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Pagamento único · Acesso por 12 meses
            </p>
            <div className="mb-6 space-y-2">
              {INCLUDED.map(({ text }) => (
                <div key={text} className="flex items-center justify-center gap-2">
                  <Check className="h-3.5 w-3.5 shrink-0" style={{ color: '#FF3A0E' }} aria-hidden="true" />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{text}</span>
                </div>
              ))}
            </div>
            <Link
              href={checkoutHref}
              className="inline-flex items-center justify-center gap-2 px-10 py-4 text-sm font-semibold uppercase transition-all hover:brightness-110 active:scale-[0.98] w-full sm:w-auto"
              style={{ ...KV_MONO, background: '#FF3A0E', color: '#050507', fontSize: '12px' }}
            >
              Comprar agora — R$ 499
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <p className="mt-4 text-xs" style={{ ...KV_MONO, color: 'rgba(255,255,255,0.2)' }}>
              Preferes acompanhamento ao vivo?{' '}
              <Link href="/mentoria" className="underline underline-offset-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Ver a Mentoria →
              </Link>
            </p>
          </div>
        </section>

        {/* Footer mínimo */}
        <footer
          className="relative z-10 py-6 text-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-xs" style={{ ...KV_MONO, color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} João Guirunas · GrowthSales.ai
          </p>
        </footer>
      </div>
    </>
  )
}
