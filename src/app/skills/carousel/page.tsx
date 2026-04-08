import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui';

export const metadata: Metadata = {
  title: 'Social Media Carousel',
  description:
    'Design de carrosseis multi-slide para Instagram, LinkedIn e Twitter/X com layout rules e hooks.',
  openGraph: {
    images: ['/images/og-default.png'],
  },
  alternates: {
    canonical: '/skills/carousel',
  },
};

const features = [
  {
    title: 'Slide Structure',
    description:
      'Estrutura otimizada de slides com capa, conteudo e CTA. Fluxo narrativo que mantem engajamento do inicio ao fim.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"/>',
  },
  {
    title: 'Text Hierarchy',
    description:
      'Hierarquia tipografica com headlines impactantes, body text legivel e labels de suporte. Contraste e peso visual calculados.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"/>',
  },
  {
    title: 'Swipe Psychology',
    description:
      'Tecnicas de retencao entre slides: open loops, pattern interrupts e curiosity gaps que forcam o swipe.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"/>',
  },
  {
    title: 'Platform Specs',
    description:
      'Dimensoes e safe zones para Instagram (1080x1350), LinkedIn (1080x1080) e Twitter/X. Zona segura de 98px top/bottom.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/>',
  },
  {
    title: 'Hook Engineering',
    description:
      'Frameworks de hooks testados: provocacao, pergunta retorica, estatistica chocante e promessa de valor. Slide 1 decide tudo.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
  },
  {
    title: 'CTA Design',
    description:
      'Call-to-actions estrategicos no ultimo slide. Salvar, compartilhar, seguir — cada CTA com design e copy otimizados.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>',
  },
];

const longDescription = [
  'Social Media Carousel e uma skill para Claude Code que automatiza o design de carrosseis multi-slide para Instagram, LinkedIn e Twitter/X. Ela aplica regras de layout, tipografia e psicologia de swipe para criar conteudo que retem atencao e gera engajamento.',
  'A skill segue principios rigorosos de design: zona segura de 98px para nao perder conteudo no Instagram, hierarquia tipografica com no maximo 3 niveis, e fatiamento adjacente para imagens que fluem entre slides. Cada carousel e estruturado com hook no slide 1, conteudo no meio e CTA no final.',
  'Frameworks de hook engineering sao aplicados automaticamente — provocacao, pergunta retorica, estatistica chocante ou promessa de valor. A skill tambem calcula o numero ideal de slides baseado no conteudo e plataforma, mantendo densidade informativa sem sobrecarregar.',
];

export default function CarouselPage() {
  return (
    <SkillPage
      title="Social Media Carousel"
      description="Design de carrosseis multi-slide para Instagram, LinkedIn e Twitter/X com layout rules e hooks."
      category="Skills"
      categoryColor="skills"
      longDescription={longDescription}
      features={features}
      primaryLink="https://skills.sh/coreyhaines31/marketingskills/social-content"
      primaryLabel="Ver Skill no skills.sh"
      author="@SynkraAI"
      authorUrl="https://github.com/SynkraAI/aiox-squads"
      bgImage="/images/bg-carousel.png"
      canonicalPath="/skills/carousel"
    >
      <section className="py-20 bg-[#08080C]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p
              className="text-[#FF4400] mb-3"
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontWeight: 600,
              }}
            >
              Instalacao
            </p>
            <h2 className="text-3xl font-bold text-white mb-8">Como instalar</h2>
            <div className="space-y-6">
              <div>
                <p className="text-white/60 mb-3 text-sm">Via AIOX (recomendado):</p>
                <div className="bg-[#0D0D14] border border-white/10 p-4 font-mono text-sm text-[#FF4400]">
                  *download-squad social-media
                </div>
              </div>
              <div>
                <p className="text-white/60 mb-3 text-sm">
                  Ou clone o repositorio de squads:
                </p>
                <div className="bg-[#0D0D14] border border-white/10 p-4 font-mono text-sm text-[#FF4400]">
                  git clone https://github.com/SynkraAI/aiox-squads
                </div>
              </div>
              <p className="text-white/60 text-sm">
                Requer o AIOX Framework instalado. A skill funciona no Claude Code com o
                agente carousel-architect ativado via{' '}
                <code className="text-white/70">@carousel-architect</code>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SkillPage>
  );
}
