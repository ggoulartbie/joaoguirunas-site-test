export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { RelatedPages } from '@/shared/components/ui/RelatedPages';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: '5 Ferramentas Grátis para Claude Code',
  description:
    'As ferramentas que todo usuário de Claude Code deveria usar. Superpower, Memory, N8N MCP, UI Pro e Everything CC.',
  alternates: { canonical: `${siteConfig.url}/learn/claude-code-skills` },
  openGraph: {
    title: '5 Ferramentas Grátis para Claude Code | João Guirunas',
    description:
      'As ferramentas que todo usuário de Claude Code deveria usar. Superpower, Memory, N8N MCP, UI Pro e Everything CC.',
    url: `${siteConfig.url}/learn/claude-code-skills`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: '5 Ferramentas Grátis para Claude Code | João Guirunas',
    description:
      'As ferramentas que todo usuário de Claude Code deveria usar. Superpower, Memory, N8N MCP, UI Pro e Everything CC.',
  },
};

const features = [
  {
    title: 'Superpower (Piloto Automático com Subagentes)',
    description:
      'Coloca o Claude em piloto automático — cria subagentes que distribuem tarefas e trabalham por horas sem perder o fio.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
  },
  {
    title: 'Everything Claude Code (28 Agentes Especializados)',
    description:
      '28 agentes especializados prontos para usar — cada um treinado para uma tarefa específica de desenvolvimento.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>',
  },
  {
    title: 'UI UX Pro Max (161 Categorias de Indústria)',
    description:
      '161 categorias de indústria com cores, tipografias e estruturas validadas — design system pronto para cada setor.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"/>',
  },
  {
    title: 'Claude Mem (Memória Permanente de Sessão)',
    description:
      'Salva tudo que acontece numa sessão e carrega automaticamente na próxima — contexto nunca se perde.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"/>',
  },
  {
    title: 'N8N MCP (Automações Completas)',
    description:
      'Dá ao Claude acesso para montar automações completas no N8N — workflows automatizados sem escrever código.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>',
  },
  {
    title: 'Self-Healing (Aprende com Próprios Erros)',
    description:
      'O agente identifica e corrige seus próprios erros durante a sessão, sem precisar de intervenção.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>',
  },
];

const longDescription = [
  'Existem cinco ferramentas gratuitas que a maioria dos usuários de Claude Code não conhece e que mudam completamente a capacidade do agente. Cada uma resolve um problema diferente e todas são instaladas com um comando.',
  'O Superpower coloca o Claude em piloto automático — cria subagentes que distribuem tarefas e trabalham por horas sem perder o fio. O UI UX Pro Max tem 161 categorias de indústria e seleciona cores, tipografias e estruturas validadas para o seu setor. O Claude Mem salva tudo que acontece numa sessão e carrega automaticamente na próxima.',
  'O N8N MCP dá ao Claude acesso para montar automações completas para o N8N. E o Self-Healing faz o agente aprender com seus próprios erros durante a sessão, sem precisar que você identifique o problema. Para instalar qualquer uma: copie o link, abra o Claude Code, peça para instalar.',
];

export default function ClaudeCodeSkillsPage() {
  return (
    <SkillPage
      title="5 Ferramentas Grátis para Claude Code"
      description="As ferramentas que todo usuário de Claude Code deveria usar. Superpower, Memory, N8N MCP, UI Pro e Everything CC."
      category="Aprendizado"
      categoryColor="aprendizado"
      longDescription={longDescription}
      features={features}
      primaryLink="https://github.com/anthropics/claude-code"
      primaryLabel="Ver no GitHub"
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/learn/claude-code-skills"
    >
      <RelatedPages
        heading="Ver também"
        pages={[
          { href: '/setup/claude-code',        title: 'Setup Claude Code',         description: 'Instale e configure o Claude Code primeiro para usar essas ferramentas.', tag: 'Setup', isPrereq: true },
          { href: '/learn/github-repos',       title: '8 Repositórios Essenciais', description: 'A lista completa de repos que mais impactam a performance — com estrelas e contexto.', tag: 'Learn' },
          { href: '/framework/aiox-framework', title: 'AIOX Framework',            description: 'O próximo nível: squads de agentes especializados orquestrados com Claude Code.', tag: 'AIOX' },
        ]}
      />
    </SkillPage>
  );
}
