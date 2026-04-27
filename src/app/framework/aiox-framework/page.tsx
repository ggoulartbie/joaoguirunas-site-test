import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'AIOX Framework — Orquestração de Agentes Claude Code',
  description:
    'Framework open source para orquestrar squads de agentes autônomos com Claude Code. Personas, coordenação inter-agentes e workflows produtivos para negócios.',
  alternates: { canonical: `${siteConfig.url}/framework/aiox-framework` },
  openGraph: {
    title: 'AIOX Framework — Orquestração de Agentes Claude Code | João Guirunas',
    description:
      'Framework open source para orquestrar squads de agentes autônomos com Claude Code. Personas, coordenação inter-agentes e workflows produtivos para negócios.',
    url: `${siteConfig.url}/framework/aiox-framework`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'AIOX Framework — Orquestração de Agentes Claude Code | João Guirunas',
    description:
      'Framework open source para orquestrar squads de agentes autônomos com Claude Code. Personas, coordenação inter-agentes e workflows produtivos para negócios.',
  },
};

const features = [
  {
    title: 'Sistema de Squads',
    description:
      'Organize agentes em squads especializadas com roles definidos, comunicação estruturada e objetivos claros.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>',
  },
  {
    title: 'Personas de Agentes',
    description:
      'Defina personalidades, especialidades e comportamentos únicos para cada agente do seu sistema.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>',
  },
  {
    title: 'Workflow Orchestration',
    description:
      'Crie workflows complexos com delegação automática de tasks entre agentes especializados.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>',
  },
  {
    title: 'Story-Driven Development',
    description:
      'Metodologia ágil integrada onde agentes trabalham baseados em user stories e acceptance criteria.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>',
  },
  {
    title: 'QA Loop Automático',
    description:
      'Ciclo de review e correção automatizado onde @qa valida e @dev corrige até aprovação.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  },
  {
    title: 'CLI Completo',
    description:
      'Interface de linha de comando para gerenciar squads, executar workflows e monitorar agentes.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"/>',
  },
];

const longDescription = [
  'O AIOX Framework é um meta-framework de orquestração de agentes de IA projetado para operações enterprise. Permite criar, configurar e gerenciar múltiplas squads de agentes autônomos trabalhando em conjunto.',
  'Com sistema de personas, cada agente pode ter especialidade, personalidade e comportamentos únicos. @dev implementa código, @qa valida qualidade, @architect desenha soluções, @pm gerencia produto — todos trabalhando coordenados.',
  'A metodologia Story-Driven Development garante que todo trabalho seja rastreável, mensurável e alinhado com objetivos de negócio. Ideal para empresas que querem escalar operações de IA com governança e controle.',
];

export default function AioxFrameworkPage() {
  return (
    <SkillPage
      title="AIOX Framework"
      description="Sistema de orquestração de agentes com squads e personas. Defina workflows, delegue tasks e escale sua operação."
      category="Squads AIOX"
      categoryColor="squads-aiox"
      longDescription={longDescription}
      features={features}
      primaryLink="https://github.com/SynkraAI/aiox-core"
      primaryLabel="Ver no GitHub"
      author="@SynkraAI"
      authorUrl="https://github.com/SynkraAI/aiox-core"
      bgImage="/images/bg-framework.png"
      canonicalPath="/framework/aiox-framework"
    >
      <section className="py-20 bg-[#0e0e11]">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-[140px]">
          <div className="max-w-3xl">
            <p
              className="text-[#FF3A0E] mb-3"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontWeight: 600,
              }}
            >
              Instalação
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-8">Como instalar</h2>
            <div className="space-y-6">
              <div>
                <p className="text-white/60 mb-3 text-sm">Novo projeto:</p>
                <div className="bg-[#16161a] border border-white/10 p-4 font-mono text-sm text-[#FF3A0E]">
                  npx aiox-core init meu-projeto
                </div>
              </div>
              <div>
                <p className="text-white/60 mb-3 text-sm">Projeto existente:</p>
                <div className="bg-[#16161a] border border-white/10 p-4 font-mono text-sm text-[#FF3A0E]">
                  cd seu-projeto
                  <br />
                  npx aiox-core install
                </div>
              </div>
              <div>
                <p className="text-white/60 mb-3 text-sm">Ativar um agente (Claude Code):</p>
                <div className="bg-[#16161a] border border-white/10 p-4 font-mono text-sm text-[#FF3A0E]">
                  /agent-name
                </div>
              </div>
              <p className="text-white/50 text-sm">
                Requer Node.js 18+. Após a instalação, ative qualquer agente e confirme o greeting
                para validar o setup.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SkillPage>
  );
}
