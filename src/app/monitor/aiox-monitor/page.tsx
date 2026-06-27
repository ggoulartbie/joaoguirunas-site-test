export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'AIOX Monitor — Observabilidade de Agentes IA',
  description:
    'Dashboard isométrico em tempo real para agentes autônomos no Claude Code. Visualize performance, tasks e métricas de todos os agentes em execução.',
  alternates: { canonical: `${siteConfig.url}/monitor/aiox-monitor` },
  openGraph: {
    title: 'AIOX Monitor — Observabilidade de Agentes IA',
    description:
      'Dashboard isométrico em tempo real para agentes autônomos no Claude Code. Visualize performance, tasks e métricas de todos os agentes em execução.',
    url: `${siteConfig.url}/monitor/aiox-monitor`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'AIOX Monitor — Observabilidade de Agentes IA',
    description:
      'Dashboard isométrico em tempo real para agentes autônomos no Claude Code. Visualize performance, tasks e métricas de todos os agentes em execução.',
  },
};

const features = [
  {
    title: 'Dashboard Isométrico',
    description:
      'Visualização 3D em tempo real de todos os agentes em execução com métricas de performance.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5"/>',
  },
  {
    title: 'Métricas em Tempo Real',
    description:
      'Acompanhe tasks, tokens consumidos, tempo de execução e status de cada agente instantaneamente.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>',
  },
  {
    title: 'Histórico de Execução',
    description:
      'Log completo de todas as ações, decisões e outputs de cada agente com filtros avançados.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  },
  {
    title: 'Alertas Inteligentes',
    description:
      'Notificações configuráveis para erros, timeouts, uso excessivo de tokens e anomalias.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>',
  },
  {
    title: 'Multi-Squad View',
    description:
      'Visualize múltiplas squads simultaneamente com dashboards personalizáveis por projeto.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>',
  },
  {
    title: 'Export & Integração',
    description:
      'Exporte dados para análise externa ou integre com seus sistemas via API REST.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>',
  },
];

const longDescription = [
  'O AIOX Monitor é um dashboard de monitoramento em tempo real para sistemas de agentes autônomos. Desenvolvido para equipes que operam múltiplos agentes de IA simultaneamente, oferece visualização isométrica 3D que torna fácil entender o estado de toda a operação.',
  'Com suporte a múltiplas squads, histórico detalhado de execução e alertas inteligentes, você mantém controle total sobre seus agentes sem precisar monitorar terminais individuais.',
  'Ideal para operações enterprise que precisam de observabilidade completa sobre seus workflows de IA automatizados.',
];

export default function AioxMonitorPage() {
  return (
    <SkillPage
      title="AIOX Monitor"
      description="Dashboard isométrico real-time de agentes autônomos. Visualize performance, tasks e métricas de todos os agentes em execução."
      category="Squads AIOX"
      categoryColor="squads-aiox"
      longDescription={longDescription}
      features={features}
      primaryLink="https://github.com/SynkraAI/aiox-dashboard"
      primaryLabel="Ver no GitHub"
      author="@SynkraAI"
      authorUrl="https://github.com/SynkraAI/aiox-dashboard"
      bgImage="/images/bg-monitor.png"
      bgPosition="center 15%"
      canonicalPath="/monitor/aiox-monitor"
    >
      <section className="py-20 bg-[#0e0e11]">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-[140px]">
          <div className="max-w-3xl">
            <p
              className="text-[#FF3A0E] mb-3"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontWeight: 600,
              }}
            >
              Instalação
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-8">Como instalar</h2>
            <div className="space-y-6">
              <div>
                <p className="text-white/60 mb-3 text-sm">Clone o repositório:</p>
                <div className="overflow-x-auto rounded-none">
                  <div className="bg-[#16161a] border border-white/10 p-4 font-mono text-sm text-[#FF3A0E] whitespace-pre min-w-0">
                    {'git clone https://github.com/SynkraAI/aiox-dashboard\ncd aiox-dashboard'}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-white/60 mb-3 text-sm">Instale as dependências e inicie:</p>
                <div className="overflow-x-auto rounded-none">
                  <div className="bg-[#16161a] border border-white/10 p-4 font-mono text-sm text-[#FF3A0E] whitespace-pre min-w-0">
                    {'npm install\nnpm run dev'}
                  </div>
                </div>
              </div>
              <p className="text-white/50 text-sm">
                Open source, licença MIT. Requer Node.js 18+, React 19 e Vite. Funciona em conjunto
                com o AIOX Framework e Maestri para visualização completa dos agentes em execução.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SkillPage>
  );
}
