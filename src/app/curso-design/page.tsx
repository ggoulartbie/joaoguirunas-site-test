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
  title: 'Curso Design com IA — Claude Design, Design Systems e Brand | Em Breve',
  description:
    'Aprenda a criar design systems automatizados, identidades visuais com IA e work­flows Figma + Claude Design. Lista de espera aberta.',
  alternates: { canonical: '/curso-design' },
  openGraph: {
    title: 'Curso Design com IA | João Guirunas — Em Breve',
    description:
      'Crie design systems, identidades visuais e workflows Figma com Claude Design. Do brand ao componente — com IA.',
    url: `${siteConfig.url}/curso-design`,
    images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curso Design com IA | João Guirunas — Em Breve',
    description:
      'Crie design systems, identidades visuais e workflows Figma com Claude Design. Do brand ao componente — com IA.',
  },
}

const COURSE_SLUG = 'curso-design'

const FEATURES = [
  {
    title: 'Claude Design na Prática',
    description:
      'Aprenda a usar Claude Design para criar layouts, identidades visuais e design systems de forma acelerada e consistente.',
  },
  {
    title: 'Design Systems Automatizados',
    description:
      'Construa design systems completos com tokens, variáveis e componentes gerados e mantidos com auxílio de IA.',
  },
  {
    title: 'Figma + IA — Workflow Integrado',
    description:
      'Integre Figma com agentes IA para acelerar handoffs, gerar documentação automaticamente e manter consistência.',
  },
  {
    title: 'Brand Identity com Agentes',
    description:
      'Crie identidades de marca coesas usando agentes para gerar e iterar sobre conceitos visuais, paletas e tipografias.',
  },
  {
    title: 'UI & Componentes com IA',
    description:
      'Do wireframe ao componente final: use IA para acelerar a criação de interfaces com qualidade pixel-perfect.',
  },
  {
    title: 'Apresentação e Entrega ao Cliente',
    description:
      'Aprenda a montar apresentações, documentar decisões de design e entregar projetos profissionais com auxílio de IA.',
  },
]

const PERSONAS = [
  {
    title: 'Designers que querem escalar',
    description:
      'Profissionais de design que querem multiplicar a produção, automatizar tarefas repetitivas e focar na criatividade estratégica.',
  },
  {
    title: 'Empreendedores e founders',
    description:
      'Quem precisa de materiais visuais profissionais sem equipe de design dedicada — usando IA para criar com qualidade.',
  },
  {
    title: 'Agências e freelancers',
    description:
      'Profissionais que atendem múltiplos clientes e querem reduzir tempo de entrega sem abrir mão da consistência visual.',
  },
]

const FAQ_ITEMS = [
  {
    q: 'Preciso ter experiência em design para participar?',
    a: 'Não é obrigatório, mas alguma familiaridade com ferramentas de design como Figma ajuda. O curso vai do básico ao avançado, explicando os conceitos necessários.',
  },
  {
    q: 'O curso ensina Figma do zero?',
    a: 'O foco principal é o uso de IA no processo de design, não o Figma em si. Você vai aprender como integrar as ferramentas — Figma, Claude Design e agentes — em um workflow profissional.',
  },
  {
    q: 'Quando as inscrições abrem?',
    a: 'A data ainda não está confirmada. Entre na lista de espera e seja avisado(a) imediatamente quando abrirmos, com condições especiais para os primeiros.',
  },
]

export default function CursoDesignPage() {
  return (
    <>
      <SolarSystemBackground />
      <div className="relative z-10">
        <SectionDots />

        <EmBreveHero
          area="Design com IA · Claude Design"
          headline="Design que"
          headlineAccent="escala com IA"
          subtitle="Crie design systems, identidades visuais e interfaces com Claude Design e agentes IA. Do brand ao componente — mais rápido, mais consistente, mais profissional."
          tags={['Design System', 'Figma', 'Brand', 'Claude Design', 'UI/UX']}
          stats={[
            { value: '6', label: 'Módulos' },
            { value: '100%', label: 'On-demand' },
            { value: '10x', label: 'Velocidade' },
          ]}
        />

        <CursoFeatures
          features={FEATURES}
          sectionLabel="O que você vai aprender"
          heading="Conteúdo do"
          headingAccent="Curso Design com IA"
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
      </div>
    </>
  )
}
