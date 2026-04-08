import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Claude Cowork & Plugins',
  description:
    'Módulos prontos que transformam o Claude em especialista da sua área. Open source, gratuitos, sem programação.',
  alternates: { canonical: `${siteConfig.url}/skills/cowork-plugins` },
  openGraph: {
    title: 'Claude Cowork & Plugins | GrowthSales Open Source',
    description:
      'Módulos prontos que transformam o Claude em especialista da sua área. Open source, gratuitos, sem programação.',
    url: `${siteConfig.url}/skills/cowork-plugins`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Claude Cowork & Plugins | GrowthSales Open Source',
    description:
      'Módulos prontos que transformam o Claude em especialista da sua área. Open source, gratuitos, sem programação.',
  },
};

const features = [
  {
    title: 'Plugins por Área (Vendas/Finanças/Jurídico/RH)',
    description:
      'Módulos especializados que ensinam o Claude os processos, termos e fluxos de cada setor.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"/>',
  },
  {
    title: 'Extensão Chrome para Navegação',
    description:
      'Plugin que adiciona o Cowork diretamente no Chrome — acesse seus módulos enquanto navega.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>',
  },
  {
    title: 'Integração Google Drive, Gmail e Slack',
    description:
      'O Claude acessa dados em tempo real do Drive, Gmail e Slack para respostas contextuais.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>',
  },
  {
    title: 'Criar Plugin Personalizado',
    description:
      'Escreva um arquivo de texto com os processos da sua empresa e o Claude aprende seu jeito de trabalhar.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>',
  },
  {
    title: 'Distribuir para o Time',
    description:
      'Compartilhe plugins com toda a equipe — cada membro usa o mesmo contexto especializado.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>',
  },
  {
    title: 'Open Source e Gratuito no GitHub',
    description:
      'Todo o código está no GitHub — sem mensalidade, sem lock-in, contribuições da comunidade abertas.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>',
  },
];

const longDescription = [
  'O Claude Cowork transforma o Claude de assistente genérico em especialista da sua área. São módulos prontos — chamados plugins — que ensinam o Claude os processos, termos técnicos e fluxos de trabalho de setores específicos como vendas, finanças, RH, marketing e jurídico.',
  'Para usar, você abre o Claude Desktop, vai na aba Cowork, clica em Browse Plugins e escolhe o plugin da sua função. Instalou? O Claude já sabe os processos daquela área e acessa dados em tempo real do Google Drive, Gmail e Slack.',
  'O diferencial técnico é que todos os plugins são baseados em arquivo de texto — sem código para configurar. Você pode criar seu próprio plugin do zero, personalizar para o jeito que sua empresa funciona e distribuir para toda a equipe.',
];

export default function CoworkPluginsPage() {
  return (
    <SkillPage
      title="Claude Cowork & Plugins"
      description="Módulos prontos que transformam o Claude em especialista da sua área. Open source, gratuitos, sem programação."
      category="Skills"
      categoryColor="skills"
      longDescription={longDescription}
      features={features}
      primaryLink="https://claude.ai/projects"
      primaryLabel="Ver Plugins Oficiais"
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/skills/cowork-plugins"
    />
  );
}
