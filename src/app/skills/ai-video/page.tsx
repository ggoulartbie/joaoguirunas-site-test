export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui';

export const metadata: Metadata = {
  title: 'AI Video Generation',
  description:
    'Gere videos com IA usando 40+ modelos. Veo 3.1, Seedance, Wan 2.5, Grok e mais via inference.sh CLI.',
  openGraph: {
    images: ['/images/og-default.png'],
  },
  alternates: {
    canonical: '/skills/ai-video',
  },
};

const features = [
  {
    title: 'Text-to-Video',
    description:
      'Gere videos a partir de prompts de texto usando modelos como Veo 3.1, Seedance 1.1, Wan 2.5 e Kling 2.1.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-2.625 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m14.25 0h1.5"/>',
  },
  {
    title: 'Image-to-Video',
    description:
      'Anime imagens estaticas em videos dinamicos. Transforme qualquer foto ou ilustracao em movimento.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"/>',
  },
  {
    title: 'Lipsync',
    description:
      'Sincronize labios de personagens com audio. Perfeito para criar talking heads e apresentacoes.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"/>',
  },
  {
    title: 'Avatar Generation',
    description:
      'Crie avatares de IA realistas para videos. Ideal para conteudo de marketing e apresentacoes.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>',
  },
  {
    title: 'Upscaling',
    description:
      'Aumente a resolucao dos seus videos com IA. De 480p para 4K mantendo qualidade e detalhes.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/>',
  },
  {
    title: 'Foley Sound',
    description:
      'Gere efeitos sonoros automaticamente para seus videos. Audio sincronizado com a acao visual.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"/>',
  },
];

const longDescription = [
  'AI Video Generation e uma skill que conecta o Claude Code ao inference.sh, dando acesso a mais de 40 modelos de geracao de video via CLI. Com um unico comando, voce gera videos usando Veo 3.1 do Google, Seedance 1.1, Wan 2.5, Kling 2.1, Grok Video e muitos outros.',
  'A skill suporta multiplos modos de geracao: text-to-video para criar do zero, image-to-video para animar fotos, lipsync para sincronizar fala, e avatar generation para criar apresentadores virtuais. Tudo direto do terminal, sem precisar abrir interfaces web.',
  'Para producao de conteudo em escala, a combinacao de upscaling com foley sound permite gerar videos de alta qualidade com audio sincronizado automaticamente. Ideal para social media, ads, e conteudo educacional.',
];

export default function AiVideoPage() {
  return (
    <SkillPage
      title="AI Video Generation"
      description="Gere videos com IA usando 40+ modelos. Veo 3.1, Seedance, Wan 2.5, Grok e mais via inference.sh CLI."
      category="Skills"
      categoryColor="skills"
      longDescription={longDescription}
      features={features}
      primaryLink="https://skills.sh/inferen-sh/skills/ai-video-generation"
      primaryLabel="Ver Skill no skills.sh"
      author="@inference-sh"
      authorUrl="https://github.com/inference-sh/skills"
      bgImage="/images/bg-video.png"
      canonicalPath="/skills/ai-video"
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
                <p className="text-white/60 mb-3 text-sm">
                  Instalar como plugin do Claude Code:
                </p>
                <div className="bg-[#16161a] border border-white/10 p-4 font-mono text-sm text-[#FF3A0E]">
                  /plugin install inference-sh
                </div>
              </div>
              <div>
                <p className="text-white/60 mb-3 text-sm">
                  Ou instalar skill especifica de video:
                </p>
                <div className="bg-[#16161a] border border-white/10 p-4 font-mono text-sm text-[#FF3A0E]">
                  npx skills add inference-sh/skills@google-veo
                </div>
              </div>
              <div>
                <p className="text-white/60 mb-3 text-sm">
                  Instalar CLI do inference.sh:
                </p>
                <div className="bg-[#16161a] border border-white/10 p-4 font-mono text-sm text-[#FF3A0E]">
                  npm install -g infsh
                  <br />
                  infsh login
                </div>
              </div>
              <p className="text-white/60 text-sm">
                Apos a instalacao, gere videos direto do terminal com{' '}
                <code className="text-white/70">infsh app run google/veo-3</code> ou via
                skill no Claude Code.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SkillPage>
  );
}
