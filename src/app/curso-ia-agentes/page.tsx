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
  title: 'Curso Tráfego com IA — Automação Comercial e Captação de Leads | Em Breve',
  description:
    'Use agentes de IA para prospectar, nutrir e converter leads no piloto automático. Orquestrador comercial, funis automatizados e CRM inteligente. Lista de espera aberta.',
  alternates: { canonical: '/curso-ia-agentes' },
  openGraph: {
    title: 'Curso Tráfego com IA | João Guirunas — Em Breve',
    description:
      'Automatize prospecção, conteúdo e conversão de leads com agentes de IA. Do tráfego à venda — no piloto automático.',
    url: `${siteConfig.url}/curso-ia-agentes`,
    images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curso Tráfego com IA | João Guirunas — Em Breve',
    description:
      'Automatize prospecção, conteúdo e conversão de leads com agentes de IA. Do tráfego à venda — no piloto automático.',
  },
}

const COURSE_SLUG = 'curso-ia-agentes'

const FEATURES = [
  {
    title: 'Orquestrador Comercial com IA',
    description:
      'Configure agentes que prospectam, qualificam e categorizam leads automaticamente — sem depender de SDR ou time comercial manual.',
  },
  {
    title: 'Criação de Conteúdo em Escala',
    description:
      'Produza posts, anúncios, emails e roteiros com agentes IA: volume de agência, custo de operação solo.',
  },
  {
    title: 'Funil Automatizado: captação ao fechamento',
    description:
      'Monte funis completos com agentes: landing pages, lead magnets, sequências de nutrição e ofertas — tudo no piloto automático.',
  },
  {
    title: 'CRM Inteligente com Follow-up Automático',
    description:
      'Classifique leads por temperatura, configure gatilhos de follow-up e nunca deixe uma oportunidade esfriar — com IA tomando as decisões.',
  },
  {
    title: 'Análise de Métricas e Otimização',
    description:
      'Use IA para interpretar dados de campanha, identificar o que está convertendo e tomar decisões de otimização com velocidade.',
  },
  {
    title: 'Integração com WhatsApp, Instagram e Email',
    description:
      'Conecte seus agentes aos canais onde seus leads estão: WhatsApp, DMs do Instagram, email marketing — tudo integrado e automatizado.',
  },
]

const PERSONAS = [
  {
    title: 'Empreendedores e donos de negócio',
    description:
      'Quem quer crescer a carteira de clientes sem contratar time comercial — usando agentes de IA para prospectar e nutrir no piloto automático.',
  },
  {
    title: 'Times comerciais e gestores de vendas',
    description:
      'Líderes que querem multiplicar a capacidade do time sem aumentar headcount, automatizando prospecção, qualificação e follow-up.',
  },
  {
    title: 'Infoprodutores e agências digitais',
    description:
      'Criadores e agências que querem escalar captação de leads e receita com automações inteligentes, sem depender só de anúncios pagos.',
  },
]

const FAQ_ITEMS = [
  {
    q: 'Preciso ter experiência com marketing digital para fazer este curso?',
    a: 'Não é obrigatório, mas ajuda entender conceitos básicos de funil e geração de leads. O curso explica os fundamentos e vai direto às automações práticas com IA.',
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
          area="Tráfego com IA · Automação Comercial"
          headline="Leads e vendas no"
          headlineAccent="piloto automático"
          subtitle="Configure agentes que prospectam, produzem conteúdo e convertem leads enquanto você foca no negócio. Do tráfego ao fechamento — automatizado."
          tags={['Orquestrador Comercial', 'WhatsApp', 'Funil', 'CRM', 'Automação']}
          stats={[
            { value: '6', label: 'Módulos' },
            { value: '100%', label: 'On-demand' },
            { value: '24/7', label: 'Prospecção' },
          ]}
        />

        <CursoFeatures
          features={FEATURES}
          sectionLabel="O que você vai aprender"
          heading="Conteúdo do"
          headingAccent="Curso Tráfego com IA"
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

        <OutrosCursos currentSlug="curso-ia-agentes" />
      </div>
    </>
  )
}
