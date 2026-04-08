import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Claude Code + Obsidian',
  description:
    'Dê memória permanente ao Claude Code com Obsidian. Tudo que você faz numa sessão é salvo e lembrado.',
  alternates: { canonical: `${siteConfig.url}/skills/obsidian` },
  openGraph: {
    title: 'Claude Code + Obsidian | GrowthSales Open Source',
    description:
      'Dê memória permanente ao Claude Code com Obsidian. Tudo que você faz numa sessão é salvo e lembrado.',
    url: `${siteConfig.url}/skills/obsidian`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Claude Code + Obsidian | GrowthSales Open Source',
    description:
      'Dê memória permanente ao Claude Code com Obsidian. Tudo que você faz numa sessão é salvo e lembrado.',
  },
};

const features = [
  {
    title: 'Memória Permanente entre Sessões',
    description:
      'O Claude nunca começa do zero — tudo que foi discutido e decidido fica salvo para a próxima sessão.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"/>',
  },
  {
    title: 'Vault Privado e Local',
    description:
      'Toda a memória fica em arquivos locais no seu computador — sem sincronizar com servidores externos.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>',
  },
  {
    title: 'Estrutura de Conhecimento Automática',
    description:
      'O Claude cria e mantém a organização da vault — pastas, notas e conexões são geradas automaticamente.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"/>',
  },
  {
    title: 'Registra Decisões e Projetos',
    description:
      'Decisões arquiteturais, contexto de projeto e preferências ficam documentados automaticamente.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>',
  },
  {
    title: 'Interconexão de Notas por Projeto',
    description:
      'Notas se conectam entre si — o Claude navega pelo grafo de conhecimento para respostas mais precisas.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>',
  },
  {
    title: 'Segundo Cérebro para o Claude',
    description:
      'Na próxima sessão, o agente consulta a vault e retoma exatamente de onde parou — como um segundo cérebro.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>',
  },
];

const longDescription = [
  'O maior problema do Claude Code é que cada sessão começa do zero. O Obsidian resolve isso: é uma aplicação de base de conhecimento onde tudo fica interconectado em uma vault local e privada. Conectado ao Claude Code, ele vira a memória permanente do agente.',
  'A instalação tem cinco passos: baixar o repositório de skills do Obsidian, instalar o Obsidian, criar uma pasta e uma vault, abrir no VS Code e carregar as skills. A partir daí, o Claude cria automaticamente uma estrutura para armazenar memória, decisões e projetos.',
  'Na prática: tudo que você discute com o Claude — decisões arquiteturais, contexto de projeto, preferências, fluxos aprovados — fica registrado. Na próxima sessão, o agente consulta a vault e retoma de onde parou. Como ter um segundo cérebro que nunca esquece.',
];

export default function ObsidianPage() {
  return (
    <SkillPage
      title="Claude Code + Obsidian"
      description="Dê memória permanente ao Claude Code com Obsidian. Tudo que você faz numa sessão é salvo e lembrado."
      category="Skills"
      categoryColor="skills"
      longDescription={longDescription}
      features={features}
      primaryLink="https://obsidian.md"
      primaryLabel="Acessar Obsidian"
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/skills/obsidian"
    />
  );
}
