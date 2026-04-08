import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Pixel Agents — VS Code Extension',
  description:
    'Visualize seus agentes Claude Code trabalhando ao vivo. Personagens pixel art que espelham cada ação em tempo real.',
  alternates: { canonical: `${siteConfig.url}/tools/pixel-agents` },
  openGraph: {
    title: 'Pixel Agents — VS Code Extension | GrowthSales Open Source',
    description:
      'Visualize seus agentes Claude Code trabalhando ao vivo. Personagens pixel art que espelham cada ação em tempo real.',
    url: `${siteConfig.url}/tools/pixel-agents`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Pixel Agents — VS Code Extension | GrowthSales Open Source',
    description:
      'Visualize seus agentes Claude Code trabalhando ao vivo. Personagens pixel art que espelham cada ação em tempo real.',
  },
};

const features = [
  {
    title: 'Personagens Pixel em Tempo Real',
    description:
      'Cada ação do Claude Code — escrever, ler arquivo, aguardar — é espelhada por um personagem pixel art ao vivo.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>',
  },
  {
    title: 'Múltiplos Agentes Visíveis Simultâneos',
    description:
      'Rodando agentes em paralelo, você vê todos eles se movendo e coordenando no mesmo escritório virtual.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>',
  },
  {
    title: 'Lê Transcript Files do Claude Code',
    description:
      'A extensão apenas lê os arquivos de transcript do Claude Code — sem interferir em nenhum processo ou workflow.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>',
  },
  {
    title: 'Zero Interferência no Workflow',
    description:
      'Nenhuma performance é comprometida. A visualização roda em paralelo sem tocar no processo do agente.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>',
  },
  {
    title: 'Totalmente Gratuito',
    description:
      'Extensão gratuita disponível no marketplace do VS Code — instale e use imediatamente sem custo.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/>',
  },
  {
    title: 'Open Source no GitHub',
    description:
      'Código aberto, auditável e extensível — contribua ou adapte para o seu fluxo de trabalho.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>',
  },
];

const longDescription = [
  'Pixel Agents é uma extensão gratuita do VS Code que transforma cada terminal do Claude Code em um personagem pixel art dentro de um escritório virtual. Quando o agente escreve código, o personagem digita. Quando lê um arquivo, ele abre o documento. Quando aguarda aprovação, aparece um balão de fala.',
  'O diferencial técnico é que a extensão apenas lê os arquivos de transcript do Claude Code — sem interferir em nada no seu fluxo de trabalho. Nenhuma performance é comprometida.',
  'Quando você roda múltiplos agentes em paralelo, você os vê se movendo e coordenando visualmente no mesmo escritório. Isso torna o trabalho da IA tangível — você passa a entender o que cada agente está fazendo em qualquer momento, sem precisar ler logs de terminal.',
];

export default function PixelAgentsPage() {
  return (
    <SkillPage
      title="Pixel Agents — VS Code Extension"
      description="Visualize seus agentes Claude Code trabalhando ao vivo. Personagens pixel art que espelham cada ação em tempo real."
      category="Apps"
      categoryColor="apps"
      longDescription={longDescription}
      features={features}
      primaryLink="https://marketplace.visualstudio.com/items?itemName=pablodelucca.pixel-agents"
      primaryLabel="Instalar no VS Code"
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/tools/pixel-agents"
    />
  );
}
