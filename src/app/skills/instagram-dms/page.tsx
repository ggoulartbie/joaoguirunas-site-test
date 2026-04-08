import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Claude Respondendo DMs do Instagram',
  description:
    'Configure o Claude como vendedor 24/7 no Instagram. Responde directs automaticamente com sua chave de API.',
  alternates: { canonical: `${siteConfig.url}/skills/instagram-dms` },
  openGraph: {
    title: 'Claude Respondendo DMs do Instagram | GrowthSales Open Source',
    description:
      'Configure o Claude como vendedor 24/7 no Instagram. Responde directs automaticamente com sua chave de API.',
    url: `${siteConfig.url}/skills/instagram-dms`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Claude Respondendo DMs do Instagram | GrowthSales Open Source',
    description:
      'Configure o Claude como vendedor 24/7 no Instagram. Responde directs automaticamente com sua chave de API.',
  },
};

const features = [
  {
    title: 'Vendedor Ativo 24h no Instagram',
    description:
      'O Claude responde leads em segundos, qualifica interesse e encaminha para conversão enquanto você dorme.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  },
  {
    title: 'Integração via ManyChat ou Plataformas',
    description:
      'Conecta com ManyChat, Chatfuel e outras plataformas de automação sem precisar escrever código.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>',
  },
  {
    title: 'Chave de API Claude',
    description:
      'Gerada em claude.ai/settings em menos de dois minutos — sem configuração técnica complexa.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"/>',
  },
  {
    title: 'Respostas Personalizadas por Contexto',
    description:
      'O Claude lê cada mensagem, entende o contexto e responde com tom e informações adequados ao seu negócio.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>',
  },
  {
    title: 'Sem Código para Configurar',
    description:
      'Três passos: gerar API Key, conectar na plataforma e treinar o Claude sobre produto e tom — pronto.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  },
  {
    title: 'Escala para Qualquer Volume de DMs',
    description:
      'Opera centenas de conversas simultâneas sem degradação — o Claude atende todos os leads ao mesmo tempo.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>',
  },
];

const longDescription = [
  'Com uma chave de API da Anthropic e uma plataforma de automação como o ManyChat, você configura o Claude para responder todos os directs do seu Instagram automaticamente. O Claude lê a mensagem, entende o contexto e responde como você definiria.',
  'O processo tem três passos: gerar uma API Key em claude.ai/settings, conectar a key na plataforma de automação escolhida (ManyChat, Chatfuel ou similar) e treinar o Claude dentro da plataforma sobre como responder — tom, produto, objeções, CTA.',
  'O resultado é um vendedor que não dorme: responde leads em segundos, qualifica interesse, envia informações do produto, coleta contato e agenda. Enquanto você cria conteúdo, o Claude opera a conversão nos bastidores.',
];

export default function InstagramDmsPage() {
  return (
    <SkillPage
      title="Claude Respondendo DMs do Instagram"
      description="Configure o Claude como vendedor 24/7 no Instagram. Responde directs automaticamente com sua chave de API."
      category="Integrações"
      categoryColor="integracoes"
      longDescription={longDescription}
      features={features}
      primaryLink="https://claude.ai/settings"
      primaryLabel="Gerar API Key"
      isExternal
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/skills/instagram-dms"
    />
  );
}
