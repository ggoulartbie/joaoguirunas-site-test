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
  title: 'Curso Social Media & Conteúdo com IA — Instagram, Copywriting e Agentes | Em Breve',
  description:
    'Monte uma squad de conteúdo com IA: carrosséis, captions, estratégia e calendário editorial automatizados. Lista de espera aberta.',
  alternates: { canonical: '/curso-social-media' },
  openGraph: {
    title: 'Curso Social Media & Conteúdo com IA | João Guirunas — Em Breve',
    description:
      'Monte uma squad de conteúdo com IA: carrosséis, captions, estratégia e calendário editorial automatizados.',
    url: `${siteConfig.url}/curso-social-media`,
    images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curso Social Media & Conteúdo com IA | João Guirunas — Em Breve',
    description:
      'Monte uma squad de conteúdo com IA: carrosséis, captions, estratégia e calendário editorial automatizados.',
  },
}

const COURSE_SLUG = 'curso-social-media'

const FEATURES = [
  {
    title: 'Squad de Conteúdo com IA',
    description:
      'Monte uma squad de agentes especializados: um para pesquisa, um para redação, um para revisão e um para distribuição.',
  },
  {
    title: 'Carrosséis e Posts para Instagram',
    description:
      'Gere carrosséis completos — roteiro, design e copy — usando agentes IA integrados ao seu processo de criação.',
  },
  {
    title: 'Copywriting com Agentes',
    description:
      'Aprenda a usar agentes para criar captions, headlines e CTAs que convertem, mantendo a voz da sua marca.',
  },
  {
    title: 'Estratégia de Conteúdo Automatizada',
    description:
      'Defina sua estratégia uma vez e deixe os agentes criarem o calendário editorial, os temas e as pautas para o mês.',
  },
  {
    title: 'Calendário Editorial com IA',
    description:
      'Automatize o planejamento de conteúdo: frequência, formato, plataforma e horário — tudo gerenciado por agentes.',
  },
  {
    title: 'Métricas e Otimização Contínua',
    description:
      'Use agentes para analisar o desempenho das publicações e sugerir melhorias baseadas em dados reais.',
  },
]

const PERSONAS = [
  {
    title: 'Criadores de conteúdo',
    description:
      'Influenciadores e criadores que querem produzir mais, com mais qualidade, sem aumentar as horas de trabalho.',
  },
  {
    title: 'Social media managers',
    description:
      'Profissionais que gerenciam múltiplos clientes e querem automatizar a produção de conteúdo sem perder a autenticidade.',
  },
  {
    title: 'Empreendedores e marcas pessoais',
    description:
      'Quem precisa de presença digital consistente mas não tem tempo — nem equipe — para produzir conteúdo diariamente.',
  },
]

const FAQ_ITEMS = [
  {
    q: 'O conteúdo gerado por IA vai parecer robótico?',
    a: 'Não, se você configurar os agentes corretamente. O curso ensina exatamente como definir tom, voz e estilo para que os agentes gerem conteúdo autêntico que parece humano — e que representa sua marca.',
  },
  {
    q: 'O curso foca em qual plataforma?',
    a: 'O foco principal é Instagram, mas os conceitos e os agentes criados se adaptam a LinkedIn, TikTok e outras plataformas. O que muda é o formato do output, não a lógica dos agentes.',
  },
  {
    q: 'Quando as inscrições abrem?',
    a: 'A data ainda não está confirmada. Entre na lista de espera e seja notificado(a) imediatamente quando abrirmos — com condições especiais para os primeiros.',
  },
]

export default function CursoSocialMediaPage() {
  return (
    <>
      <SolarSystemBackground />
      <div className="relative z-10">
        <SectionDots />

        <EmBreveHero
          area="Social Media & Conteúdo · IA"
          headline="Conteúdo que"
          headlineAccent="se cria sozinho"
          subtitle="Monte uma squad de agentes IA para produzir carrosséis, captions e estratégia de conteúdo. Publique mais, trabalhe menos — com a sua voz."
          tags={['Instagram', 'Conteúdo', 'Copywriting', 'Agentes', 'Calendário Editorial']}
          stats={[
            { value: '6', label: 'Módulos' },
            { value: '100%', label: 'On-demand' },
            { value: '30d', label: 'Calendário gerado' },
          ]}
        />

        <CursoFeatures
          features={FEATURES}
          sectionLabel="O que você vai aprender"
          heading="Conteúdo do"
          headingAccent="Curso Social Media"
        />

        <CursoParaQuem personas={PERSONAS} />

        <CursoFacilitador />

        <CursoInscricaoEmBreve
          courseSlug={COURSE_SLUG}
          headline="Entre na lista de"
          headlineAccent="espera"
          description="Seja avisado(a) assim que as inscrições abrirem. Os primeiros da lista garantem condições especiais de acesso."
          bullets={[
            'Notificação imediata quando as inscrições abrirem',
            'Condições especiais para os primeiros inscritos',
            'Sem compromisso',
          ]}
        />

        <CursoEmBreveFaq items={FAQ_ITEMS} id="faq-social-media" />
      </div>
    </>
  )
}
