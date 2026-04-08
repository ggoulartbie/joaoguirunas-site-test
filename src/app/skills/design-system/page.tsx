import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Design System Skill',
  description:
    'Skill que mantém consistência visual em todo código gerado. Claude aprende seu design system e aplica automaticamente.',
  alternates: { canonical: `${siteConfig.url}/skills/design-system` },
  openGraph: {
    title: 'Design System Skill | GrowthSales Open Source',
    description:
      'Skill que mantém consistência visual em todo código gerado. Claude aprende seu design system e aplica automaticamente.',
    url: `${siteConfig.url}/skills/design-system`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Design System Skill | GrowthSales Open Source',
    description:
      'Skill que mantém consistência visual em todo código gerado. Claude aprende seu design system e aplica automaticamente.',
  },
};

const features = [
  {
    title: 'Onboarding Único de Design System',
    description:
      'Na primeira sessão, o Claude faz um onboarding completo sobre seu stack, paleta, tipografia e densidade visual.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>',
  },
  {
    title: 'Arquivo project-style.md Automático',
    description:
      'Cria e mantém um arquivo de configuração do design system na raiz do projeto para persistência entre sessões.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>',
  },
  {
    title: 'Tipografia e Paleta Persistentes',
    description:
      'Fontes, tamanhos e cores configurados uma vez são aplicados automaticamente em todos os componentes gerados.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"/>',
  },
  {
    title: 'Dark Mode e Arredondamentos Configuráveis',
    description:
      'Suporte a temas claro e escuro com raios de borda configuráveis para manter coerência visual.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>',
  },
  {
    title: 'Componentes Consistentes entre Sessões',
    description:
      'Cada novo componente gerado, em qualquer sessão futura, segue automaticamente o design system configurado.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>',
  },
  {
    title: 'Sem Reconfiguração a Cada Prompt',
    description:
      'Elimina o problema de inconsistência visual: cada componente sai com as mesmas cores, bordas e tamanhos.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  },
];

const longDescription = [
  'O problema mais comum de quem usa IA para gerar front-end é a inconsistência visual: cada componente sai com uma cor diferente, uma borda diferente, um tamanho de fonte diferente. A Front-end Style Guide skill resolve isso de uma vez.',
  'Na primeira vez que você gera código front-end com a skill instalada, o Claude faz um onboarding: pergunta sobre tamanho de fonte, paleta de cores, stack, tipografia, dark mode, arredondamento, densidade visual e personalidade do design. Com essas respostas, cria um arquivo project-style.md na raiz do projeto.',
  'A partir daí, toda vez que você pedir um componente, o Claude verifica o project-style.md e aplica as configurações automaticamente. O card com avatar, nome e status vai sair exatamente no seu design system, sem você precisar repetir as instruções.',
];

export default function DesignSystemPage() {
  return (
    <SkillPage
      title="Design System Skill"
      description="Skill que mantém consistência visual em todo código gerado. Claude aprende seu design system e aplica automaticamente."
      category="Skills"
      categoryColor="skills"
      longDescription={longDescription}
      features={features}
      primaryLink="https://skills.sh/wshobson/agents/tailwind-design-system"
      primaryLabel="Ver Skill no skills.sh"
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/skills/design-system"
    />
  );
}
