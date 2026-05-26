import type { Metadata } from 'next'
import { SolarSystemBackground } from '@/app/agentes/_components/SolarSystemBackground'
import { SectionDots } from '@/app/mentoria/section-dots'
import { EmBreveHero } from '@/app/cursos/_shared/EmBreveHero'
import { CursoFeatures } from '@/app/cursos/_shared/CursoFeatures'
import { CursoParaQuem } from '@/app/cursos/_shared/CursoParaQuem'
import { CursoFacilitador } from '@/app/cursos/_shared/CursoFacilitador'
import { CursoInscricaoEmBreve } from '@/app/cursos/_shared/CursoInscricaoEmBreve'
import { CursoEmBreveFaq } from '@/app/cursos/_shared/CursoEmBreveFaq'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Curso Dev com IA — Next.js, Supabase, Vercel e GitHub com Claude Code | Em Breve',
  description:
    'Construa sites e apps full-stack com agentes Claude Code. Next.js, Supabase, Vercel e GitHub Actions — do zero ao deploy em produção. Lista de espera aberta.',
  alternates: { canonical: '/curso-dev' },
  openGraph: {
    title: 'Curso Dev com IA | João Guirunas — Em Breve',
    description:
      'Construa sites e apps full-stack com agentes Claude Code. Next.js, Supabase, Vercel e GitHub Actions.',
    url: `${siteConfig.url}/curso-dev`,
    images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curso Dev com IA | João Guirunas — Em Breve',
    description:
      'Construa sites e apps full-stack com agentes Claude Code. Next.js, Supabase, Vercel e GitHub Actions.',
  },
}

const COURSE_SLUG = 'curso-dev'

const FEATURES = [
  {
    title: 'Sites Full-Stack com Agentes',
    description:
      'Construa aplicações Next.js completas usando Claude Code como copiloto: layout, lógica, banco de dados e deploy.',
  },
  {
    title: 'Next.js 15 — App Router e Server Actions',
    description:
      'Aprenda os padrões modernos do Next.js App Router, Server Actions e Server Components com auxílio direto de IA.',
  },
  {
    title: 'Supabase — Backend sem Fricção',
    description:
      'Configure banco de dados Postgres, autenticação e storage no Supabase usando agentes para acelerar o setup e as migrations.',
  },
  {
    title: 'Vercel — Deploy Contínuo',
    description:
      'Deploy automatizado na Vercel: variáveis de ambiente, preview branches e rollbacks sem dor de cabeça.',
  },
  {
    title: 'GitHub Actions — CI/CD com IA',
    description:
      'Crie pipelines de integração contínua com GitHub Actions, com agentes IA para gerar e manter os workflows.',
  },
  {
    title: 'Projeto Final: Site em Produção',
    description:
      'Ao final do curso, você terá um site real rodando em produção — do design ao deploy, construído com agentes.',
  },
]

const PERSONAS = [
  {
    title: 'Profissionais não-técnicos que querem codar',
    description:
      'Gestores, marketeiros e empreendedores que querem criar seus próprios sites e apps usando IA como copiloto de desenvolvimento.',
  },
  {
    title: 'Devs que querem acelerar com IA',
    description:
      'Desenvolvedores que já programam e querem usar Claude Code para multiplicar a velocidade de entrega e reduzir o overhead técnico.',
  },
  {
    title: 'Freelancers e agências digitais',
    description:
      'Quem presta serviços de desenvolvimento e quer entregar projetos de qualidade em metade do tempo com agentes IA.',
  },
]

const FAQ_ITEMS = [
  {
    q: 'Preciso saber programar antes do curso?',
    a: 'Não é obrigatório. O curso usa Claude Code como copiloto — você vai aprender a guiar o agente para construir o que você precisa. Alguma familiaridade com conceitos web ajuda, mas não é requisito.',
  },
  {
    q: 'Vou precisar pagar por serviços externos?',
    a: 'Os serviços usados (Vercel, Supabase, GitHub) têm planos gratuitos suficientes para o aprendizado. Você vai precisar de uma assinatura Claude Pro (US$ 20/mês) para usar o Claude Code.',
  },
  {
    q: 'Quando as inscrições abrem?',
    a: 'A data ainda não está confirmada. Entre na lista de espera e seja notificado(a) imediatamente, com condições especiais para os primeiros inscritos.',
  },
]

export default function CursoDevPage() {
  return (
    <>
      <SolarSystemBackground />
      <div className="relative z-10">
        <SectionDots />

        <EmBreveHero
          area="Dev com IA · Claude Code"
          headline="Sites e apps que"
          headlineAccent="se constroem sozinhos"
          subtitle="Domine Next.js, Supabase, Vercel e GitHub com Claude Code como copiloto. Do zero ao deploy em produção — mesmo que você não seja dev."
          tags={['Next.js', 'Supabase', 'Vercel', 'GitHub', 'Claude Code']}
          stats={[
            { value: '6', label: 'Módulos' },
            { value: '100%', label: 'On-demand' },
            { value: '1', label: 'Site em prod.' },
          ]}
        />

        <CursoFeatures
          features={FEATURES}
          sectionLabel="O que você vai aprender"
          heading="Conteúdo do"
          headingAccent="Curso Dev com IA"
        />

        <CursoParaQuem personas={PERSONAS} />

        <CursoFacilitador />

        <CursoInscricaoEmBreve
          courseSlug={COURSE_SLUG}
          headline="Entre na lista de"
          headlineAccent="espera"
          description="Seja avisado(a) assim que as inscrições abrirem. Os primeiros da lista ganham condições especiais de early access."
          bullets={[
            'Notificação imediata quando as inscrições abrirem',
            'Early access com condições especiais',
            'Sem compromisso',
          ]}
        />

        <CursoEmBreveFaq items={FAQ_ITEMS} id="faq-dev" />
      </div>
    </>
  )
}
