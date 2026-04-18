import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Dev Browser — Automação de Navegador',
  description:
    'Controle o Chrome com Claude Code via código. Mais rápido, barato e preciso que Computer Use.',
  alternates: { canonical: `${siteConfig.url}/skills/dev-browser` },
  openGraph: {
    title: 'Dev Browser — Automação de Navegador | João Guirunas',
    description:
      'Controle o Chrome com Claude Code via código. Mais rápido, barato e preciso que Computer Use.',
    url: `${siteConfig.url}/skills/dev-browser`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Dev Browser — Automação de Navegador | João Guirunas',
    description:
      'Controle o Chrome com Claude Code via código. Mais rápido, barato e preciso que Computer Use.',
  },
};

const features = [
  {
    title: 'Controle via Código (não por visão)',
    description:
      'Lê a estrutura da página e interage com elementos por acessibilidade — sem screenshots, sem adivinhação.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"/>',
  },
  {
    title: 'Conecta ao Chrome Real com Cookies e Sessões',
    description:
      'Acessa seu Chrome com todos os logins e cookies ativos — sem reautenticar nada.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>',
  },
  {
    title: 'Sem Print de Tela e Sem Latência',
    description:
      'Sem tirar screenshots a cada ação — o agente interage diretamente com o DOM, muito mais rápido.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
  },
  {
    title: 'Baseado em Playwright',
    description:
      'Usa a biblioteca Playwright para controle preciso do navegador — confiável, documentado e amplamente testado.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/>',
  },
  {
    title: 'Mantém Estado entre Execuções',
    description:
      'Sessão persistente — o agente retoma do ponto onde parou, sem perder login nem estado da página.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>',
  },
  {
    title: 'Instalação com Um Comando no Terminal',
    description:
      'Configure o Dev Browser com um único comando — sem servidor externo, sem configuração de infraestrutura.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"/>',
  },
];

const longDescription = [
  'O Computer Use do Claude navega pelo navegador tirando prints de tela e tentando interpretar o que vê. É lento, caro em tokens e erra mais. O Dev Browser resolve isso: ele lê a estrutura da página, identifica cada elemento por acessibilidade e interage diretamente via código.',
  'A diferença é prática: sem adivinhação, sem latência, sem queimar tokens com screenshots. O Dev Browser se conecta ao seu Chrome real — com seus logins, cookies e sessões abertas. Você não precisa autenticar nada novamente.',
  'Casos de uso: preencher formulários automaticamente, extrair dados de páginas dinâmicas, testar fluxos de usuário, tirar screenshots sob demanda — tudo rodando localmente no terminal sem precisar de servidor ou MCP externo. Instala com um único comando.',
];

export default function DevBrowserPage() {
  return (
    <SkillPage
      title="Dev Browser — Automação de Navegador"
      description="Controle o Chrome com Claude Code via código. Mais rápido, barato e preciso que Computer Use."
      category="Skills"
      categoryColor="skills"
      longDescription={longDescription}
      features={features}
      primaryLink="https://skills.sh/microsoft/playwright-cli/playwright-cli"
      primaryLabel="Ver Skill no skills.sh"
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/skills/dev-browser"
    />
  );
}
