import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Website Builder com Claude Code',
  description:
    'Crie sites profissionais com Claude Code + 21st.dev. Do zero ao deploy em minutos, sem experiência prévia.',
  alternates: { canonical: `${siteConfig.url}/skills/website-builder` },
  openGraph: {
    title: 'Website Builder com Claude Code | GrowthSales Open Source',
    description:
      'Crie sites profissionais com Claude Code + 21st.dev. Do zero ao deploy em minutos, sem experiência prévia.',
    url: `${siteConfig.url}/skills/website-builder`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Website Builder com Claude Code | GrowthSales Open Source',
    description:
      'Crie sites profissionais com Claude Code + 21st.dev. Do zero ao deploy em minutos, sem experiência prévia.',
  },
};

const features = [
  {
    title: 'Componentes Premium (21st.dev)',
    description:
      'Acesso à biblioteca do 21st.dev com hero sections, cards, navbars e mais — todos prontos para produção.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"/>',
  },
  {
    title: 'Design Skill Customizada',
    description:
      'Skill de design que dá ao Claude o contexto de estilo, paleta de cores e padrões do seu projeto.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/>',
  },
  {
    title: 'Clone de Sites Existentes',
    description:
      'Passe uma URL e o Claude Code recria a estrutura visual do site com código limpo e editável.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>',
  },
  {
    title: 'VS Code Integration',
    description:
      'Funciona diretamente no VS Code — edite, veja preview e faça deploy sem sair do editor.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"/>',
  },
  {
    title: 'Zero Experiência Necessária',
    description:
      'Descreva o site em português. O Claude Code cria a estrutura, os estilos e o código completo.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/>',
  },
  {
    title: 'Deploy Imediato',
    description:
      'Integração com Vercel e Netlify — um comando no terminal publica o site em produção.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/>',
  },
];

const longDescription = [
  'Com Claude Code + 21st.dev você conecta uma biblioteca de componentes premium diretamente ao seu ambiente de desenvolvimento. A skill de design dá ao Claude acesso a hero sections, cards, navbars e muito mais — todos prontos para produção.',
  'A configuração leva três passos: instalar o Claude Code, adicionar a design skill via GitHub, e conectar o MCP server do 21st.dev. A partir daí, um único comando gera páginas completas usando os componentes da biblioteca.',
  'O resultado são sites que não parecem gerados por IA. A biblioteca do 21st.dev tem padrões de design validados em produção, o que elimina o problema de layouts genéricos que afetam a maioria das ferramentas de geração de sites.',
];

export default function WebsiteBuilderPage() {
  return (
    <SkillPage
      title="Website Builder com Claude Code"
      description="Crie sites profissionais com Claude Code + 21st.dev. Do zero ao deploy em minutos, sem experiência prévia."
      category="Skills"
      categoryColor="skills"
      longDescription={longDescription}
      features={features}
      primaryLink="https://21st.dev"
      primaryLabel="Ver 21st.dev"
      isExternal
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/skills/website-builder"
    />
  );
}
