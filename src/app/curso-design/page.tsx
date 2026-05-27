import type { Metadata } from 'next'
import { SolarSystemBackground } from '@/app/agentes/_components/SolarSystemBackground'
import { SectionDots } from '@/app/mentoria/section-dots'
import { EmBreveHero } from '@/app/cursos/_shared/EmBreveHero'
import { CursoFeatures } from '@/app/cursos/_shared/CursoFeatures'
import { CursoParaQuem } from '@/app/cursos/_shared/CursoParaQuem'
import { CursoFacilitador } from '@/app/cursos/_shared/CursoFacilitador'
import { CursoInscricaoEmBreve } from '@/app/cursos/_shared/CursoInscricaoEmBreve'
import { CursoEmBreveFaq } from '@/app/cursos/_shared/CursoEmBreveFaq'
import { OutrosCursos } from '@/app/cursos/_shared/OutrosCursos'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Curso Site com IA — Crie e lance sua presença digital | Em Breve',
  description:
    'Crie um site profissional do zero com Claude Design e publique com GitHub + Vercel. Identidade visual, domínio e SEO — sem equipe de design ou dev. Lista de espera aberta.',
  alternates: { canonical: '/curso-design' },
  openGraph: {
    title: 'Curso Site com IA | João Guirunas — Em Breve',
    description:
      'Crie e lance sua presença digital com Claude Design e deploy automatizado. Do visual ao ar — com IA.',
    url: `${siteConfig.url}/curso-design`,
    images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curso Site com IA | João Guirunas — Em Breve',
    description:
      'Crie e lance sua presença digital com Claude Design e deploy automatizado. Do visual ao ar — com IA.',
  },
}

const COURSE_SLUG = 'curso-design'

const FEATURES = [
  {
    title: 'Identidade Visual com Claude Design',
    description:
      'Crie a identidade do seu negócio — paleta de cores, tipografia, logo e tom visual — usando Claude Design como seu designer pessoal.',
  },
  {
    title: 'Estrutura e Páginas do Site',
    description:
      'Monte as páginas essenciais do seu site: hero, sobre, serviços, portfólio e contato — com layout profissional e copy persuasivo.',
  },
  {
    title: 'Deploy com GitHub e Vercel',
    description:
      'Publique seu site do zero ao ar em minutos. Configure repositório, deploy automático e preview de alterações sem precisar de dev.',
  },
  {
    title: 'Domínio e Hospedagem com IA',
    description:
      'Configure seu domínio personalizado, SSL e hospedagem profissional — com agentes guiando cada etapa do processo.',
  },
  {
    title: 'SEO e Performance com IA',
    description:
      'Otimize seu site para aparecer no Google: títulos, descrições, velocidade de carregamento e estrutura — com auxílio direto de IA.',
  },
  {
    title: 'Site como Ferramenta de Negócio',
    description:
      'Transforme seu site em máquina de captação: CTAs estratégicos, formulários de lead, integração com WhatsApp e rastreamento de conversões.',
  },
]

const PERSONAS = [
  {
    title: 'Empreendedores e pequenos negócios',
    description:
      'Donos de negócio que precisam de um site profissional mas não têm equipe de design ou dev — e querem fazer isso com IA, sem complicação.',
  },
  {
    title: 'Profissionais liberais e freelancers',
    description:
      'Advogados, psicólogos, consultores e prestadores de serviço que querem uma presença digital que transmita credibilidade e gere contatos.',
  },
  {
    title: 'Empreendedores digitais iniciantes',
    description:
      'Quem está lançando seu primeiro produto ou serviço online e quer criar uma landing page ou site completo sem depender de ninguém.',
  },
]

const FAQ_ITEMS = [
  {
    q: 'Preciso saber programar para fazer este curso?',
    a: 'Não. O curso foi desenhado para quem não tem background técnico. Você vai usar IA e ferramentas visuais para criar e publicar seu site — sem escrever código.',
  },
  {
    q: 'Vou precisar contratar alguém para colocar o site no ar?',
    a: 'Não. O curso cobre todo o processo: do design ao deploy. Você vai publicar seu próprio site com GitHub e Vercel, com IA guiando cada etapa.',
  },
  {
    q: 'Quando as inscrições abrem?',
    a: 'A data ainda não está confirmada. Entre na lista de espera e seja avisado(a) imediatamente quando abrirmos — com condições especiais para os primeiros.',
  },
]

export default function CursoDesignPage() {
  return (
    <>
      <SolarSystemBackground />
      <div className="relative z-10">
        <SectionDots />

        <EmBreveHero
          area="Site com IA · Claude Design"
          headline="Seu site profissional,"
          headlineAccent="do zero ao ar"
          subtitle="Crie a identidade visual, monte as páginas e publique com GitHub e Vercel. Presença digital completa — sem equipe de design ou dev."
          tags={['Claude Design', 'Vercel', 'GitHub', 'SEO', 'Landing Page']}
          stats={[
            { value: '6', label: 'Módulos' },
            { value: '100%', label: 'On-demand' },
            { value: '1', label: 'Site no ar' },
          ]}
        />

        <CursoFeatures
          features={FEATURES}
          sectionLabel="O que você vai aprender"
          heading="Conteúdo do"
          headingAccent="Curso Site com IA"
        />

        <CursoParaQuem personas={PERSONAS} />

        <CursoFacilitador />

        <CursoInscricaoEmBreve
          courseSlug={COURSE_SLUG}
          headline="Entre na lista de"
          headlineAccent="espera"
          description="Seja avisado(a) assim que as inscrições abrirem. Os primeiros da lista ganham condições especiais."
          bullets={[
            'Notificação imediata quando as inscrições abrirem',
            'Condições especiais para os primeiros inscritos',
            'Sem compromisso',
          ]}
        />

        <CursoEmBreveFaq items={FAQ_ITEMS} id="faq-design" />

        <OutrosCursos currentSlug="curso-design" />
      </div>
    </>
  )
}
