import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui';

export const metadata: Metadata = {
  title: 'AI Image Generation',
  description:
    'Gere imagens com IA usando 50+ modelos. FLUX, Gemini, Grok, Seedream e mais via inference.sh CLI.',
  openGraph: {
    images: ['/images/og-default.png'],
  },
  alternates: {
    canonical: '/skills/ai-image',
  },
};

const features = [
  {
    title: 'Text-to-Image',
    description:
      'Gere imagens a partir de prompts de texto usando FLUX, Gemini Imagen, Grok, Seedream e dezenas de outros modelos.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>',
  },
  {
    title: 'Image-to-Image',
    description:
      'Transforme imagens existentes com style transfer, variacoes e edicoes guiadas por prompt.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>',
  },
  {
    title: 'Inpainting',
    description:
      'Edite areas especificas de uma imagem. Remova objetos, adicione elementos ou altere fundos com precisao.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/>',
  },
  {
    title: 'LoRA Support',
    description:
      'Use modelos LoRA customizados para estilos especificos. Aplique fine-tuning sem treinar do zero.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"/>',
  },
  {
    title: 'Upscaling',
    description:
      'Aumente a resolucao de imagens com IA. De baixa resolucao para alta qualidade preservando detalhes.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/>',
  },
  {
    title: 'Text Rendering',
    description:
      'Gere imagens com texto legivel e estilizado. Ideal para thumbnails, banners e social media.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>',
  },
];

const longDescription = [
  'AI Image Generation e uma skill que conecta o Claude Code ao inference.sh, dando acesso a mais de 50 modelos de geracao de imagem via CLI. Crie imagens com FLUX Pro, Gemini Imagen 3, Grok Vision, Seedream 3.0, Recraft V3 e muitos outros sem sair do terminal.',
  'A skill oferece modos avancados como inpainting para edicao cirurgica de imagens, image-to-image para transformacoes de estilo, e suporte a LoRA para aplicar fine-tuning customizado. Cada modelo tem suas especialidades - FLUX para fotorealismo, Seedream para arte conceitual, Recraft para ilustracoes vetoriais.',
  'Para producao em escala, combine text rendering com upscaling para gerar assets de social media em alta resolucao. A integracao CLI permite automatizar pipelines de geracao, processando dezenas de variacoes em batch direto do terminal.',
];

export default function AiImagePage() {
  return (
    <SkillPage
      title="AI Image Generation"
      description="Gere imagens com IA usando 50+ modelos. FLUX, Gemini, Grok, Seedream e mais via inference.sh CLI."
      category="Skills"
      categoryColor="skills"
      longDescription={longDescription}
      features={features}
      primaryLink="https://github.com/inference-sh/skills"
      primaryLabel="Ver no GitHub"
      author="@inference-sh"
      authorUrl="https://github.com/inference-sh/skills"
      bgImage="/images/bg-image.png"
      canonicalPath="/skills/ai-image"
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
                <p className="text-white/60 mb-3 text-sm">
                  Instalar como plugin do Claude Code:
                </p>
                <div className="bg-[#0D0D14] border border-white/10 p-4 font-mono text-sm text-[#FF4400]">
                  /plugin install inference-sh
                </div>
              </div>
              <div>
                <p className="text-white/60 mb-3 text-sm">Ou instalar via skills:</p>
                <div className="bg-[#0D0D14] border border-white/10 p-4 font-mono text-sm text-[#FF4400]">
                  npx skills add inference-sh/skills
                </div>
              </div>
              <div>
                <p className="text-white/60 mb-3 text-sm">
                  Instalar CLI do inference.sh:
                </p>
                <div className="bg-[#0D0D14] border border-white/10 p-4 font-mono text-sm text-[#FF4400]">
                  npm install -g infsh
                  <br />
                  infsh login
                </div>
              </div>
              <p className="text-white/60 text-sm">
                Apos a instalacao, as skills ficam disponiveis como{' '}
                <code className="text-white/70">/inference-sh:flux-image</code>,{' '}
                <code className="text-white/70">/inference-sh:google-veo</code> e outros
                no Claude Code.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SkillPage>
  );
}
