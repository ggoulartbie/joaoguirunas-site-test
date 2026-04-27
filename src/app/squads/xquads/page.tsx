import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Xquads Squads',
  description:
    '12 squads especializadas com 96+ agentes prontos para uso. A maior coleção de squads AIOX da comunidade.',
  alternates: { canonical: `${siteConfig.url}/squads/xquads` },
  openGraph: {
    title: 'Xquads Squads | João Guirunas',
    description:
      '12 squads especializadas com 96+ agentes prontos para uso. A maior coleção de squads AIOX da comunidade.',
    url: `${siteConfig.url}/squads/xquads`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Xquads Squads | João Guirunas',
    description:
      '12 squads especializadas com 96+ agentes prontos para uso. A maior coleção de squads AIOX da comunidade.',
  },
};

const features = [
  {
    title: '12 Squads Especializadas',
    description:
      'Dev, QA, DevOps, PM, Design, Data, Security, Architecture, Analytics, Marketing, Content e Support.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>',
  },
  {
    title: '96+ Agentes',
    description:
      'Mais de 96 agentes com personas definidas, cada um especializado em tarefas específicas do seu domínio.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>',
  },
  {
    title: 'Tasks Prontas',
    description:
      'Workflows e tasks pré-configuradas para cada squad. Comece a trabalhar imediatamente sem setup.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  },
  {
    title: 'Compatível AIOX',
    description:
      'Totalmente compatível com o AIOX Framework. Instale e use com qualquer projeto AIOX existente.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"/>',
  },
  {
    title: 'Community-Driven',
    description:
      'Criado pela comunidade AIOX. Contribuições abertas, evolução constante e feedback coletivo.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>',
  },
  {
    title: 'Open Source',
    description:
      'Código aberto no GitHub. Clone, customize e contribua para expandir o ecossistema de squads AIOX.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>',
  },
];

const longDescription = [
  'Xquads é a maior coleção de squads AIOX da comunidade, criada por @rafa.grandi — desenvolvedor e creator que construiu do zero 12 squads especializadas com mais de 96 agentes prontos para uso. As squads cobrem todas as áreas: Dev, QA, DevOps, PM, Design, Data, Security, Architecture, Analytics, Marketing, Content e Support.',
  'Cada squad vem com agentes pré-configurados com personas, tasks e workflows definidos. Basta instalar e começar a trabalhar — sem necessidade de configuração manual. É o jeito mais rápido de escalar operações com agentes AIOX. Rafa é referência na comunidade AIOX e compartilha ativamente seu conhecimento nas redes.',
  'O projeto é totalmente open source e compatível com qualquer instalação do AIOX Framework. A comunidade contribui ativamente com melhorias, novos agentes e novas squads. Se você quer ver o poder do AIOX em ação, Xquads é o melhor ponto de partida.',
];

export default function XquadsPage() {
  return (
    <SkillPage
      title="Xquads Squads"
      description="12 squads especializadas com 96+ agentes prontos para uso. A maior coleção de squads AIOX da comunidade."
      category="Squads"
      categoryColor="squads"
      longDescription={longDescription}
      features={features}
      primaryLink="https://github.com/ohmyjahh/xquads-squads"
      primaryLabel="Ver no GitHub"
      author="@rafa.grandi"
      authorUrl="https://www.instagram.com/rafa.grandi/"
      bgImage="/images/bg-xquads.png"
      canonicalPath="/squads/xquads"
    >
      {/* Sobre o Autor */}
      <section className="py-20 bg-[#0e0e11]">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-[140px]">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#FF3A0E] mb-3">
              Sobre o Autor
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white sm:text-3xl mb-6">@rafa.grandi</h2>
            <div className="glass-card p-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <p className="text-lg text-white/60 leading-relaxed">
                    Rafa Grandi é desenvolvedor e creator que construiu o Xquads do zero — a maior
                    coleção open source de squads para o ecossistema AIOX. Com 12 squads e 96+
                    agentes especializados, o projeto se tornou referência para quem quer escalar
                    operações com agentes de IA.
                  </p>
                  <p className="text-lg text-white/60 leading-relaxed">
                    Ativo na comunidade AIOX, Rafa compartilha processos, aprendizados e bastidores
                    do desenvolvimento nas redes sociais. Seu trabalho demonstra como um único
                    desenvolvedor pode multiplicar produtividade usando agentes orquestrados.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href="https://www.instagram.com/rafa.grandi/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-all"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                      Instagram
                    </a>
                    <a
                      href="https://github.com/ohmyjahh/xquads-squads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-all"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SkillPage>
  );
}
