import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: '8 Repositórios Essenciais do Claude Code',
  description:
    'Os repositórios GitHub que fazem o Claude Code performar até 10x mais. Curadoria dos melhores da comunidade.',
  alternates: { canonical: `${siteConfig.url}/learn/github-repos` },
  openGraph: {
    title: '8 Repositórios Essenciais do Claude Code | GrowthSales Open Source',
    description:
      'Os repositórios GitHub que fazem o Claude Code performar até 10x mais. Curadoria dos melhores da comunidade.',
    url: `${siteConfig.url}/learn/github-repos`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: '8 Repositórios Essenciais do Claude Code | GrowthSales Open Source',
    description:
      'Os repositórios GitHub que fazem o Claude Code performar até 10x mais. Curadoria dos melhores da comunidade.',
  },
};

const features = [
  {
    title: 'Superpower (80k estrelas — piloto automático)',
    description:
      'Coloca o Claude Code em modo piloto automático: cria subagentes que distribuem tarefas e trabalham sozinhos por horas.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
  },
  {
    title: 'Awesome Claude Code (30k — coleção de skills)',
    description:
      'Lista curada com as melhores skills, integrações e ferramentas da comunidade Claude Code.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>',
  },
  {
    title: 'Claude Memory (34k — recupera contexto anterior)',
    description:
      'Recupera automaticamente o que foi discutido na sessão anterior — sem repassar o contexto toda vez.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>',
  },
  {
    title: 'N8N MCP (15k — automações sem limite)',
    description:
      'Conecta o Claude Code ao N8N MCP para criar automações complexas diretamente no terminal.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>',
  },
  {
    title: 'Obsidian Skill (13k — memória permanente)',
    description:
      'Conecta o Claude Code ao Obsidian para criar uma vault de memória permanente entre sessões.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"/>',
  },
  {
    title: 'AIOX Framework (2k — squads especializados)',
    description:
      'Framework meta para orquestrar squads de agentes especializados em projetos full stack completos.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>',
  },
];

const longDescription = [
  'Existem repositórios que multiplicam o que o Claude Code consegue fazer. A diferença entre um setup básico e um setup que performa 10x está nesses projetos da comunidade — e a maioria das pessoas não sabe que eles existem.',
  'O Superpower coloca o Claude Code em modo piloto automático: cria subagentes que distribuem tarefas e trabalham sozinhos por horas sem perder o contexto. O Claude Memory recupera automaticamente o que foi discutido na sessão anterior. O UI UX Pro Max tem 161 categorias de indústria para design profissional.',
  'Para instalar qualquer um deles, você copia o link do repositório, abre o Claude Code no terminal e pede para ele baixar e instalar. A maioria leva menos de dois minutos. A ordem recomendada: comece pelo Claude Memory, depois o Superpower, depois o Awesome Claude Code para descobrir outros.',
];

export default function GithubReposPage() {
  return (
    <SkillPage
      title="8 Repositórios Essenciais do Claude Code"
      description="Os repositórios GitHub que fazem o Claude Code performar até 10x mais. Curadoria dos melhores da comunidade."
      category="Aprendizado"
      categoryColor="aprendizado"
      longDescription={longDescription}
      features={features}
      primaryLink="https://github.com/anthropics/claude-code"
      primaryLabel="Ver no GitHub"
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/learn/github-repos"
    />
  );
}
