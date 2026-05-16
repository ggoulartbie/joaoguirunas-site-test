export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui';

export const metadata: Metadata = {
  title: 'Supabase',
  description:
    'Backend open source com PostgreSQL, Auth, Storage e Realtime para aplicacoes modernas.',
  openGraph: {
    images: ['/images/og-default.png'],
  },
  alternates: {
    canonical: '/skills/supabase',
  },
};

const features = [
  {
    title: 'PostgreSQL',
    description:
      'Database PostgreSQL completo com extensoes, triggers e stored procedures. Performance enterprise.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>',
  },
  {
    title: 'Row Level Security',
    description:
      'Politicas de seguranca a nivel de linha para controle granular de acesso.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>',
  },
  {
    title: 'Auth',
    description:
      'Autenticacao pronta com OAuth, magic links, email/password e SSO. 20+ providers sociais.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"/>',
  },
  {
    title: 'Storage',
    description:
      'Armazenamento de arquivos com CDN global. Upload e transformacao de imagens integrados.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/>',
  },
  {
    title: 'Realtime',
    description:
      'Subscriptions em tempo real via WebSocket. Mudancas no banco instantaneamente no frontend.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
  },
  {
    title: 'Edge Functions',
    description:
      'Serverless functions com Deno runtime no edge. APIs customizadas com latencia minima.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"/>',
  },
];

const longDescription = [
  'Supabase e a alternativa open source ao Firebase, oferecendo um backend completo com PostgreSQL, autenticacao, storage e realtime. Na nossa stack, e o backbone de dados para dashboards, APIs e aplicacoes que requerem persistencia.',
  'Row Level Security (RLS) permite controle granular de acesso: cada usuario ve apenas seus dados, sem logica extra no backend. Auth integrado suporta 20+ providers OAuth, magic links e SSO enterprise.',
  'Com Edge Functions rodando em Deno, e possivel criar APIs serverless com latencia minima. Realtime via WebSocket entrega mudancas no banco instantaneamente ao frontend.',
];

export default function SupabasePage() {
  return (
    <SkillPage
      title="Supabase"
      description="Backend open source com PostgreSQL, Auth, Storage e Realtime para aplicacoes modernas."
      category="Integracoes"
      categoryColor="integracoes"
      longDescription={longDescription}
      features={features}
      primaryLink="https://skills.sh/supabase/agent-skills/supabase-postgres-best-practices"
      primaryLabel="Ver Skill no skills.sh"
      author="Supabase"
      authorUrl="https://github.com/supabase"
      bgImage="/images/bg-supabase.png"
      canonicalPath="/skills/supabase"
    >
      <section className="py-20 bg-[#0e0e11]">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-[140px]">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#FF3A0E] mb-3">
              Tutorial
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white sm:text-3xl mb-8">
              Supabase CLI no Terminal
            </h2>
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  1. Instalar Supabase CLI
                </h3>
                <pre className="bg-[#050507] p-4 text-sm text-[#FF3A0E] overflow-x-auto">
                  <code>{`# macOS
brew install supabase/tap/supabase

# npm (qualquer OS)
npx supabase --version

# Windows
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase`}</code>
                </pre>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  2. Login e Init
                </h3>
                <pre className="bg-[#050507] p-4 text-sm text-[#FF3A0E] overflow-x-auto">
                  <code>{`# Login
supabase login

# Inicializar projeto
supabase init

# Linkar com projeto remoto
supabase link --project-ref SEU_PROJECT_REF`}</code>
                </pre>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  3. Desenvolvimento local
                </h3>
                <pre className="bg-[#050507] p-4 text-sm text-[#FF3A0E] overflow-x-auto">
                  <code>{`# Subir Supabase local (Docker)
supabase start

# Ver status e URLs
supabase status

# Parar
supabase stop`}</code>
                </pre>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  4. Migrations
                </h3>
                <pre className="bg-[#050507] p-4 text-sm text-[#FF3A0E] overflow-x-auto">
                  <code>{`# Criar migration
supabase migration new create_users_table

# Aplicar migrations locais
supabase db reset

# Push migrations para producao
supabase db push

# Listar migrations
supabase migration list

# Gerar diff do schema atual
supabase db diff --schema public`}</code>
                </pre>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  5. Edge Functions
                </h3>
                <pre className="bg-[#050507] p-4 text-sm text-[#FF3A0E] overflow-x-auto">
                  <code>{`# Criar edge function
supabase functions new minha-funcao

# Servir localmente
supabase functions serve minha-funcao

# Deploy para producao
supabase functions deploy minha-funcao

# Listar functions
supabase functions list`}</code>
                </pre>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  6. Gerar tipos TypeScript
                </h3>
                <pre className="bg-[#050507] p-4 text-sm text-[#FF3A0E] overflow-x-auto">
                  <code>{`# Gerar types do schema
supabase gen types typescript --local > types/database.ts

# Ou do projeto remoto
supabase gen types typescript --project-id SEU_ID > types/database.ts`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SkillPage>
  );
}
