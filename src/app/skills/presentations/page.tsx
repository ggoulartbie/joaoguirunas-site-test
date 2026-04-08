import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Apresentações com Claude + Gamma',
  description:
    'Crie slides, e-books e infográficos diretamente no Claude. Gamma App integrado para layouts profissionais em um clique.',
  alternates: { canonical: `${siteConfig.url}/skills/presentations` },
  openGraph: {
    title: 'Apresentações com Claude + Gamma | GrowthSales Open Source',
    description:
      'Crie slides, e-books e infográficos diretamente no Claude. Gamma App integrado para layouts profissionais em um clique.',
    url: `${siteConfig.url}/skills/presentations`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Apresentações com Claude + Gamma | GrowthSales Open Source',
    description:
      'Crie slides, e-books e infográficos diretamente no Claude. Gamma App integrado para layouts profissionais em um clique.',
  },
};

const features = [
  {
    title: 'Slides Profissionais em 1 Clique',
    description:
      'Transforme qualquer conversa em uma apresentação visual completa sem sair do Claude.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"/>',
  },
  {
    title: 'E-books com Layout Visual Completo',
    description:
      'Gere e-books estruturados com capa, índice e layout profissional em minutos, prontos para publicação.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>',
  },
  {
    title: 'Integração com Notion e E-mail',
    description:
      'O Claude puxa dados do Notion e e-mail para estruturar slides com conteúdo real do seu negócio.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>',
  },
  {
    title: 'Infográficos Gerados Automaticamente',
    description:
      'Dados e textos transformados em infográficos visuais prontos para compartilhar em redes sociais.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"/>',
  },
  {
    title: 'Ativar Gamma MCP no Claude',
    description:
      'Adicione o MCP server do Gamma ao Claude Code em um passo e desbloqueie criação visual integrada.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"/>',
  },
  {
    title: 'Economia Reportada de 40h/mês',
    description:
      'Empresas reportam economia de até 40 horas mensais em criação de apresentações e materiais visuais.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  },
];

const longDescription = [
  'O Gamma App é uma ferramenta de apresentações com IA. Quando você conecta o MCP do Gamma ao Claude, você consegue criar slides, e-books e infográficos diretamente dentro do Claude — sem sair para outra ferramenta.',
  'A ativação é simples: você adiciona o MCP server do Gamma ao Claude Code. A partir daí, qualquer conversa pode virar uma apresentação. O Claude puxa dados do e-mail e do Notion, estrutura os slides e entrega um layout visual pronto.',
  'Empresas relatam economia de até 40 horas por mês só com essa função. Casos de uso: apresentações comerciais, e-books de captura de lead, relatórios executivos, materiais de treinamento de time — tudo criado dentro da mesma conversa com o Claude.',
];

export default function PresentationsPage() {
  return (
    <SkillPage
      title="Apresentações com Claude + Gamma"
      description="Crie slides, e-books e infográficos diretamente no Claude. Gamma App integrado para layouts profissionais em um clique."
      category="Skills"
      categoryColor="skills"
      longDescription={longDescription}
      features={features}
      primaryLink="https://gamma.app"
      primaryLabel="Ver Gamma App"
      isExternal
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/skills/presentations"
    />
  );
}
