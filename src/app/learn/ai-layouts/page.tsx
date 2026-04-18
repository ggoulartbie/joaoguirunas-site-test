import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Layouts Profissionais com IA',
  description:
    'Crie interfaces com design de nível profissional usando IA. Prompts exatos, variações ilimitadas, exportação imediata.',
  alternates: { canonical: `${siteConfig.url}/learn/ai-layouts` },
  openGraph: {
    title: 'Layouts Profissionais com IA | João Guirunas',
    description:
      'Crie interfaces com design de nível profissional usando IA. Prompts exatos, variações ilimitadas, exportação imediata.',
    url: `${siteConfig.url}/learn/ai-layouts`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Layouts Profissionais com IA | João Guirunas',
    description:
      'Crie interfaces com design de nível profissional usando IA. Prompts exatos, variações ilimitadas, exportação imediata.',
  },
};

const features = [
  {
    title: 'Layouts Prontos para Produção',
    description:
      'Ferramentas como Lovable geram interfaces de nível profissional prontas para usar em projetos reais.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>',
  },
  {
    title: 'Prompt Exato do Design Incluído',
    description:
      'A ferramenta mostra o prompt que gerou cada layout — copie e use em qualquer outra plataforma.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>',
  },
  {
    title: 'Variações Ilimitadas com 1 Clique',
    description:
      'Ajuste o prompt com as cores e fontes da sua marca e gere versões personalizadas instantaneamente.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>',
  },
  {
    title: 'Exportar para Lovable ou Claude Code',
    description:
      'Leve o layout gerado para o Lovable ou cole o prompt no Claude Code para personalização total.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>',
  },
  {
    title: 'Animações e Gradientes Modernos',
    description:
      'Layouts gerados com animações CSS modernas, gradientes e efeitos visuais de nível profissional.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/>',
  },
  {
    title: 'Zero Experiência em Design Necessária',
    description:
      'Fundadores, agências e desenvolvedores criam interfaces profissionais sem depender de um designer.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
  },
];

const longDescription = [
  'Ferramentas como Lovable e outras plataformas de IA para design geram layouts profissionais e — detalhe importante — mostram o prompt exato que foi usado. Isso significa que você pode pegar esse prompt, colar em outra ferramenta como o Claude Code, e recriar o mesmo layout personalizado para sua marca.',
  'O fluxo de trabalho é: você escolhe um layout que gosta, copia o prompt do design gerado, cola no Claude Code ou no Lovable com as cores e fontes da sua marca, e gera uma versão personalizada. Você pode criar variações infinitas ajustando o prompt.',
  'Esse método funciona para qualquer projeto: agências que criam layouts para clientes, fundadores que precisam de uma interface rápida para MVP, criadores de conteúdo que querem peças visuais para redes sociais — sem depender de um designer para cada variação.',
];

export default function AiLayoutsPage() {
  return (
    <SkillPage
      title="Layouts Profissionais com IA"
      description="Crie interfaces com design de nível profissional usando IA. Prompts exatos, variações ilimitadas, exportação imediata."
      category="Aprendizado"
      categoryColor="aprendizado"
      longDescription={longDescription}
      features={features}
      primaryLink="https://lovable.dev"
      primaryLabel="Ver Lovable"
      isExternal
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/learn/ai-layouts"
    />
  );
}
