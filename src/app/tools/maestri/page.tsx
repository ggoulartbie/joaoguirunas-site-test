export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Maestri',
  description:
    'Comunicação inter-agentes entre terminais. Conecte múltiplos Claude Code para colaboração em tempo real.',
  alternates: { canonical: `${siteConfig.url}/tools/maestri` },
  openGraph: {
    title: 'Maestri | João Guirunas',
    description:
      'Comunicação inter-agentes entre terminais. Conecte múltiplos Claude Code para colaboração em tempo real.',
    url: `${siteConfig.url}/tools/maestri`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Maestri | João Guirunas',
    description:
      'Comunicação inter-agentes entre terminais. Conecte múltiplos Claude Code para colaboração em tempo real.',
  },
};

const features = [
  {
    title: 'Comunicação Inter-Agentes',
    description:
      'Conecte múltiplos terminais Claude Code para que agentes possam trocar mensagens em tempo real.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>',
  },
  {
    title: 'Sticky Notes Compartilhadas',
    description:
      'Notas persistentes que podem ser lidas e escritas por qualquer agente conectado no workspace.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>',
  },
  {
    title: 'Delegação de Tasks',
    description:
      'Delegue tarefas específicas para agentes especializados e receba resultados automaticamente.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>',
  },
  {
    title: 'Descoberta Automática',
    description:
      'Agentes na mesma rede são descobertos automaticamente, sem configuração manual.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"/>',
  },
  {
    title: 'Broadcast & Direct',
    description:
      'Envie mensagens para todos os agentes ou comunique diretamente com um agente específico.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"/>',
  },
  {
    title: 'Histórico de Mensagens',
    description:
      'Log completo de todas as comunicações para auditoria, debug e análise de workflows.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  },
];

const longDescription = [
  'Maestri é uma plataforma de comunicação inter-agentes que permite conectar múltiplos terminais Claude Code para trabalho colaborativo. Quando você precisa que diferentes agentes especializados trabalhem juntos em um projeto complexo, Maestri é a cola que une tudo.',
  'Com sticky notes compartilhadas, agentes podem deixar informações persistentes que outros agentes acessam quando necessário. Isso permite workflows assíncronos onde cada agente contribui no seu tempo.',
  'A descoberta automática elimina configuração manual — basta estar na mesma rede e os agentes se encontram. Perfeito para equipes que precisam escalar operações de IA com múltiplos workstations.',
];

export default function MaestriPage() {
  return (
    <SkillPage
      title="Maestri"
      description="Comunicação inter-agentes entre terminais. Conecte múltiplos Claude Code para colaboração em tempo real."
      category="Produtividade"
      categoryColor="produtividade"
      longDescription={longDescription}
      features={features}
      primaryLink="https://www.themaestri.app/pt-br"
      primaryLabel="Acessar Maestri"
      isExternal
      author="Maestri Team"
      authorUrl="https://www.themaestri.app"
      bgImage="/images/bg-maestri.png"
      canonicalPath="/tools/maestri"
    />
  );
}
