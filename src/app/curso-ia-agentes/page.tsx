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
  title: 'Curso IA & Agentes — Claude Code, Automação e Agentes | Em Breve',
  description:
    'Aprenda a criar agentes Claude Code, orquestrar squads autônomas e automatizar processos com o framework AIOX. Lista de espera aberta.',
  alternates: { canonical: '/curso-ia-agentes' },
  openGraph: {
    title: 'Curso IA & Agentes | João Guirunas — Em Breve',
    description:
      'Aprenda a criar agentes Claude Code, orquestrar squads autônomas e automatizar processos com o framework AIOX.',
    url: `${siteConfig.url}/curso-ia-agentes`,
    images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curso IA & Agentes | João Guirunas — Em Breve',
    description:
      'Aprenda a criar agentes Claude Code, orquestrar squads autônomas e automatizar processos com o framework AIOX.',
  },
}

const COURSE_SLUG = 'curso-ia-agentes'

const FEATURES = [
  {
    title: 'Fundamentos de Agentes com Claude Code',
    description:
      'Entenda como agentes autônomos funcionam, como configurar o ambiente e criar seus primeiros agentes do zero.',
  },
  {
    title: 'Orquestração com Agent Teams',
    description:
      'Aprenda a criar e coordenar squads completas de agentes que trabalham em paralelo e se comunicam entre si.',
  },
  {
    title: 'Framework AIOX na Prática',
    description:
      'Domine o framework AIOX — arquitetura de agentes orientada a negócios, com padrões prontos para produção.',
  },
  {
    title: 'MCP — Model Context Protocol',
    description:
      'Configure servidores MCP para conectar seus agentes a APIs externas, bancos de dados e ferramentas corporativas.',
  },
  {
    title: 'Automações de Alto Impacto',
    description:
      'Construa pipelines automatizados: processamento de documentos, análise de dados, geração de relatórios e mais.',
  },
  {
    title: 'Deploy e Operação em Produção',
    description:
      'Aprenda a monitorar, escalar e manter squads de agentes rodando de forma confiável em produção.',
  },
]

const PERSONAS = [
  {
    title: 'Profissionais que querem automatizar',
    description:
      'Gestores, analistas e empreendedores que querem delegar tarefas repetitivas para agentes de IA e focar no que importa.',
  },
  {
    title: 'Devs e tech leads',
    description:
      'Desenvolvedores que querem incorporar agentes Claude Code em seus produtos e pipelines com arquitetura robusta.',
  },
  {
    title: 'Consultores e fundadores',
    description:
      'Quem quer oferecer automação com IA como serviço para clientes ou usar agentes para escalar o próprio negócio.',
  },
]

const FAQ_ITEMS = [
  {
    q: 'Preciso saber programar para fazer este curso?',
    a: 'Não é necessário ter experiência avançada. O curso parte de conceitos fundamentais e avança gradualmente. Familiaridade básica com linha de comando é recomendada.',
  },
  {
    q: 'Qual a diferença entre este curso e a Mentoria?',
    a: 'A Mentoria é intensiva, ao vivo, com turmas pequenas e suporte direto. Este curso será 100% assíncrono — aulas gravadas no seu ritmo, com acesso contínuo ao conteúdo.',
  },
  {
    q: 'Quando as inscrições abrem?',
    a: 'Ainda não temos uma data confirmada. Cadastre-se na lista de espera e você será o(a) primeiro(a) a saber — com condições especiais para os primeiros inscritos.',
  },
]

export default function CursoIaAgentesPage() {
  return (
    <>
      <SolarSystemBackground />
      <div className="relative z-10">
        <SectionDots />

        <EmBreveHero
          area="IA & Agentes · Claude Code"
          headline="Crie agentes que"
          headlineAccent="trabalham por você"
          subtitle="Domine Claude Code, o framework AIOX e a orquestração de squads autônomas. Do primeiro agente ao sistema em produção — sem depender de ninguém."
          tags={['Claude Code', 'MCP', 'Automação', 'AIOX', 'Agent Teams']}
          stats={[
            { value: '6', label: 'Módulos' },
            { value: '100%', label: 'On-demand' },
            { value: '∞', label: 'Possibilidades' },
          ]}
        />

        <CursoFeatures
          features={FEATURES}
          sectionLabel="O que você vai aprender"
          heading="Conteúdo do"
          headingAccent="Curso IA & Agentes"
        />

        <CursoParaQuem personas={PERSONAS} />

        <CursoFacilitador />

        <CursoInscricaoEmBreve
          courseSlug={COURSE_SLUG}
          headline="Entre na lista de"
          headlineAccent="espera"
          description="Seja avisado(a) assim que as inscrições abrirem. Os primeiros da lista ganham condições especiais de acesso antecipado."
          bullets={[
            'Notificação imediata quando as inscrições abrirem',
            'Condições especiais para os primeiros inscritos',
            'Sem compromisso',
          ]}
        />

        <CursoEmBreveFaq items={FAQ_ITEMS} id="faq-ia-agentes" />
      </div>
    </>
  )
}
