export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'CRM com Claude Code — Gestão de Clientes sem Código',
  description:
    'CRM no-code construído com Claude Code. Automatize funil, pipeline e follow-up de vendas com agentes de IA. Skill open source, pronto para integrar.',
  alternates: { canonical: `${siteConfig.url}/skills/crm` },
  openGraph: {
    title: 'CRM com Claude Code — Gestão de Clientes sem Código | João Guirunas',
    description:
      'CRM no-code construído com Claude Code. Automatize funil, pipeline e follow-up de vendas com agentes de IA. Skill open source, pronto para integrar.',
    url: `${siteConfig.url}/skills/crm`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'CRM com Claude Code — Gestão de Clientes sem Código | João Guirunas',
    description:
      'CRM no-code construído com Claude Code. Automatize funil, pipeline e follow-up de vendas com agentes de IA. Skill open source, pronto para integrar.',
  },
};

const features = [
  {
    title: 'Pipelines Customizados para seu Negócio',
    description:
      'Etapas, campos e fluxos exatamente como o seu negócio funciona — sem adaptar seu processo ao sistema.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"/>',
  },
  {
    title: 'Lead Scoring com IA',
    description:
      'O Claude analisa dados do lead e atribui pontuação automática baseada nos critérios do seu funil.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>',
  },
  {
    title: 'Agente IA para Ligação em 30 Segundos',
    description:
      'SDR automático que liga para novos leads em 30 segundos após entrada no CRM — qualifica e agenda reuniões.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>',
  },
  {
    title: 'Drag & Drop entre Etapas',
    description:
      'Interface visual para mover leads entre etapas do pipeline com arrastar e soltar.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/>',
  },
  {
    title: 'Campos Específicos por Segmento',
    description:
      'Capture exatamente os dados que importam para o seu setor — sem campos genéricos desnecessários.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/>',
  },
  {
    title: 'Sem Mensalidade de Plataforma',
    description:
      'Seu CRM roda localmente ou em VPS — sem pagar por seat, sem mensalidade crescente conforme a equipe cresce.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>',
  },
];

const longDescription = [
  'O Claude Code cria CRMs personalizados do zero — com exatamente os campos, pipelines e etapas que o seu negócio precisa. Sem o custo mensal do HubSpot e sem a inflexibilidade dos CRMs genéricos. Um prompt descreve o que você quer, o agente constrói.',
  'O diferencial é a camada de IA integrada. Você pode configurar um agente para ligar para novos leads nos primeiros 30 segundos após a entrada no CRM, funcionando como um SDR automático que qualifica e agenda reuniões.',
  'O CRM fica hospedado localmente ou em VPS, com drag and drop entre etapas, coleta de dados específicos do seu segmento e automações que escalam conforme o volume de leads cresce — sem aumentar o custo da plataforma.',
];

export default function CrmPage() {
  return (
    <SkillPage
      title="CRM Personalizado com Claude Code"
      description="Crie seu CRM do zero sem programação. Pipelines customizados com automações de IA integradas."
      category="Skills"
      categoryColor="skills"
      longDescription={longDescription}
      features={features}
      primaryLink="https://github.com/anthropics/claude-code"
      primaryLabel="Ver Documentação"
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/skills/crm"
    />
  );
}
