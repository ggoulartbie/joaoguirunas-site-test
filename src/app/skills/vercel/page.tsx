import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui';

export const metadata: Metadata = {
  title: 'Vercel Deploy',
  description:
    'Deploy automatizado com Vercel. CI/CD, preview deployments e dominios custom para projetos web.',
  openGraph: {
    images: ['/images/og-default.png'],
  },
  alternates: {
    canonical: '/skills/vercel',
  },
};

const features = [
  {
    title: 'Auto Deploy',
    description:
      'Deploy automatico a cada push no repositorio. Zero configuracao para frameworks como Next.js, Astro e Nuxt.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>',
  },
  {
    title: 'Preview URLs',
    description:
      'URLs de preview unicas para cada branch e PR. Revise mudancas visualmente antes de mergear.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>',
  },
  {
    title: 'Custom Domains',
    description:
      'Configure dominios personalizados com SSL automatico. DNS management integrado e certificados gratuitos.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>',
  },
  {
    title: 'Edge Functions',
    description:
      'Execute codigo no edge, proximo ao usuario. Latencia minima para APIs, middleware e server-side rendering.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
  },
  {
    title: 'Analytics',
    description:
      'Web analytics integrado com metricas de performance. Core Web Vitals, traffic e experiencia do usuario em tempo real.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>',
  },
  {
    title: 'Zero-Config',
    description:
      'Deteccao automatica de framework e configuracao. Funciona com Next.js, Astro, Remix, SvelteKit e mais.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>',
  },
];

const longDescription = [
  'Vercel Deploy e uma skill de integracao que conecta o Claude Code ao ecossistema Vercel para deploy automatizado de projetos web. A cada push no repositorio, o deploy acontece automaticamente com zero configuracao para frameworks como Next.js, Astro, Remix e SvelteKit.',
  'Preview deployments sao gerados para cada branch e pull request, permitindo revisao visual de mudancas antes do merge. Cada preview tem sua propria URL unica, facilitando QA, feedback de stakeholders e testes de aceitacao em ambiente real.',
  'Com edge functions, o codigo roda proximo ao usuario final com latencia minima. Analytics integrado monitora Core Web Vitals, performance e experiencia do usuario em tempo real. Custom domains com SSL automatico completam o stack de producao.',
];

export default function VercelPage() {
  return (
    <SkillPage
      title="Vercel Deploy"
      description="Deploy automatizado com Vercel. CI/CD, preview deployments e dominios custom para projetos web."
      category="Integracoes"
      categoryColor="integracoes"
      longDescription={longDescription}
      features={features}
      primaryLink="https://github.com/vercel/vercel"
      primaryLabel="Ver no GitHub"
      isExternal
      author="Vercel"
      authorUrl="https://github.com/vercel"
      bgImage="/images/bg-vercel.png"
      canonicalPath="/skills/vercel"
    >
      <section className="py-20 bg-[#0A0A0F]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9] mb-3">
              Tutorial
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-8">
              Setup no Terminal
            </h2>
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  1. Instalar Vercel CLI
                </h3>
                <pre className="bg-black/50 p-4 text-sm text-green-400 overflow-x-auto">
                  <code>npm i -g vercel</code>
                </pre>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">2. Login</h3>
                <pre className="bg-black/50 p-4 text-sm text-green-400 overflow-x-auto">
                  <code>vercel login</code>
                </pre>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  3. Deploy do projeto
                </h3>
                <pre className="bg-black/50 p-4 text-sm text-green-400 overflow-x-auto">
                  <code>{`# Preview deploy
vercel

# Deploy para producao
vercel --prod`}</code>
                </pre>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  4. Configurar dominio
                </h3>
                <pre className="bg-black/50 p-4 text-sm text-green-400 overflow-x-auto">
                  <code>{`# Adicionar dominio custom
vercel domains add meusite.com

# Listar dominios
vercel domains ls`}</code>
                </pre>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  5. Variaveis de ambiente
                </h3>
                <pre className="bg-black/50 p-4 text-sm text-green-400 overflow-x-auto">
                  <code>{`# Adicionar env var
vercel env add MINHA_CHAVE

# Listar env vars
vercel env ls

# Puxar envs para .env.local
vercel env pull`}</code>
                </pre>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  6. Comandos uteis
                </h3>
                <pre className="bg-black/50 p-4 text-sm text-green-400 overflow-x-auto">
                  <code>{`# Ver deploys recentes
vercel ls

# Inspecionar deploy
vercel inspect [url]

# Remover deploy
vercel remove [url]

# Logs em tempo real
vercel logs [url] --follow`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SkillPage>
  );
}
