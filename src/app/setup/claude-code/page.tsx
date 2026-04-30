import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { RelatedPages } from '@/shared/components/ui/RelatedPages';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Setup Claude Code — Guia Completo de Configuração CLI',
  description:
    'Guia prático para configurar o Claude Code CLI: instalação, skills, agents e integrações. Do zero ao time de agentes em produção com exemplos reais.',
  alternates: { canonical: `${siteConfig.url}/setup/claude-code` },
  openGraph: {
    title: 'Setup Claude Code — Guia Completo de Configuração CLI | João Guirunas',
    description:
      'Guia prático para configurar o Claude Code CLI: instalação, skills, agents e integrações. Do zero ao time de agentes em produção com exemplos reais.',
    url: `${siteConfig.url}/setup/claude-code`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Setup Claude Code — Guia Completo de Configuração CLI | João Guirunas',
    description:
      'Guia prático para configurar o Claude Code CLI: instalação, skills, agents e integrações. Do zero ao time de agentes em produção com exemplos reais.',
  },
};

const features = [
  {
    title: 'Instalação Completa',
    description:
      'Passo a passo desde a instalação do Node.js até configuração avançada do Claude Code CLI.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>',
  },
  {
    title: 'Configuração de Skills',
    description:
      'Como adicionar, remover e configurar skills via settings.json e linha de comando.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>',
  },
  {
    title: 'MCP Servers',
    description:
      'Integração com Model Context Protocol para expandir capacidades com ferramentas externas.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"/>',
  },
  {
    title: 'Keybindings',
    description:
      'Personalização de atalhos de teclado para otimizar seu fluxo de trabalho.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 9h16.5m-16.5 6.75h16.5"/>',
  },
  {
    title: 'CLAUDE.md',
    description:
      'Configuração de contexto persistente para projetos com instruções e regras customizadas.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>',
  },
  {
    title: 'Dicas Avançadas',
    description:
      'Técnicas de power user para maximizar produtividade com Claude Code.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/>',
  },
];

const longDescription = [
  'Este guia completo cobre tudo que você precisa saber para configurar e otimizar o Claude Code CLI. Desde a instalação básica até configurações avançadas usadas por power users.',
  'Aprenda a configurar skills, integrar MCP servers para expandir capacidades, personalizar keybindings, e criar arquivos CLAUDE.md para manter contexto entre sessões.',
  'O guia inclui exemplos práticos, configurações recomendadas, e dicas de troubleshooting para resolver problemas comuns.',
];

export default function ClaudeCodePage() {
  return (
    <SkillPage
      title="Setup Claude Code"
      description="Guia completo de configuração avançada. Do básico ao expert em Claude Code CLI."
      category="Produtividade"
      categoryColor="produtividade"
      longDescription={longDescription}
      features={features}
      primaryLink="https://docs.anthropic.com/en/docs/claude-code/overview"
      primaryLabel="Documentação Oficial"
      isExternal
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      bgImage="/images/bg-claude-code.png"
      canonicalPath="/setup/claude-code"
    >
      <RelatedPages
        heading="Próximos passos"
        pages={[
          { href: '/learn/github-repos',      title: '8 Repositórios Essenciais', description: 'Os repos da comunidade que multiplicam o que o Claude Code faz — Superpower, Memory, AIOX e mais.', tag: 'Learn' },
          { href: '/learn/claude-code-skills', title: '5 Ferramentas Grátis',      description: 'Superpower, N8N MCP, UI UX Pro Max e Self-Healing — instale com um comando.', tag: 'Learn' },
          { href: '/framework/aiox-framework', title: 'AIOX Framework',            description: 'O próximo passo: squads de agentes autônomos orquestrados dentro do Claude Code.', tag: 'AIOX' },
        ]}
      />
    </SkillPage>
  );
}
