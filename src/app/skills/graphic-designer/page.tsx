export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui';

export const metadata: Metadata = {
  title: 'Graphic Designer',
  description:
    'Design de thumbnails, social media, banners e apresentacoes com principios CRAP e Gestalt.',
  openGraph: {
    images: ['/images/og-default.png'],
  },
  alternates: {
    canonical: '/skills/graphic-designer',
  },
};

const features = [
  {
    title: 'Visual Hierarchy',
    description:
      'Organizacao visual que guia o olho do espectador. Tamanho, cor, contraste e posicao usados estrategicamente.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>',
  },
  {
    title: 'Typography',
    description:
      'Selecao e combinacao tipografica com regras de peso, tamanho e espacamento. Legibilidade em qualquer formato.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"/>',
  },
  {
    title: 'Color Theory',
    description:
      'Paletas de cores baseadas em teoria cromatica. Harmonia, contraste e acessibilidade WCAG aplicados automaticamente.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"/>',
  },
  {
    title: 'Layout Design',
    description:
      'Layouts com grid system, alinhamento e espacamento consistente. Principios CRAP (Contraste, Repeticao, Alinhamento, Proximidade).',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z"/>',
  },
  {
    title: 'Brand Consistency',
    description:
      'Manutencao de identidade visual com paleta, fontes e elementos graficos consistentes entre pecas.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/>',
  },
  {
    title: 'Research-Backed',
    description:
      'Decisoes de design baseadas em pesquisa de Gestalt, neurociencia visual e dados de engajamento.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>',
  },
];

const longDescription = [
  'Graphic Designer e uma skill para Claude Code que aplica principios profissionais de design na criacao de thumbnails, social media, banners, apresentacoes e qualquer asset visual. Ela usa os principios CRAP (Contraste, Repeticao, Alinhamento, Proximidade) e leis de Gestalt para decisoes fundamentadas.',
  'A skill domina hierarquia visual, tipografia, teoria de cores e layout design. Cada peca criada segue regras de acessibilidade WCAG, harmonia cromatica e legibilidade em diferentes tamanhos de tela. Nada e arbitrario — cada escolha de cor, fonte e espacamento tem justificativa tecnica.',
  'Para manter brand consistency, a skill trabalha com paletas definidas, familias tipograficas e elementos graficos recorrentes. Ela tambem incorpora insights de neurociencia visual e dados de engajamento para decisoes que nao sao so bonitas, mas eficazes em reter atencao e comunicar mensagem.',
];

export default function GraphicDesignerPage() {
  return (
    <SkillPage
      title="Graphic Designer"
      description="Design de thumbnails, social media, banners e apresentacoes com principios CRAP e Gestalt."
      category="Skills"
      categoryColor="skills"
      longDescription={longDescription}
      features={features}
      primaryLink="https://github.com/SynkraAI/aiox-squads"
      primaryLabel="Ver no GitHub"
      author="@SynkraAI"
      authorUrl="https://github.com/SynkraAI/aiox-squads"
      bgImage="/images/bg-designer.png"
      canonicalPath="/skills/graphic-designer"
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
              Instalacao
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-8">Como instalar</h2>
            <div className="space-y-6">
              <div>
                <p className="text-white/60 mb-3 text-sm">Via AIOX (recomendado):</p>
                <div className="bg-[#16161a] border border-white/10 p-4 font-mono text-sm text-[#FF3A0E]">
                  *download-squad social-media
                </div>
              </div>
              <div>
                <p className="text-white/60 mb-3 text-sm">
                  Ou clone o repositorio de squads:
                </p>
                <div className="bg-[#16161a] border border-white/10 p-4 font-mono text-sm text-[#FF3A0E]">
                  git clone https://github.com/SynkraAI/aiox-squads
                </div>
              </div>
              <p className="text-white/60 text-sm">
                Requer o AIOX Framework instalado. Ative o agente com{' '}
                <code className="text-white/70">@graphic-designer</code> no Claude Code
                para ter acesso a todas as capacidades de design com principios CRAP e
                Gestalt.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SkillPage>
  );
}
