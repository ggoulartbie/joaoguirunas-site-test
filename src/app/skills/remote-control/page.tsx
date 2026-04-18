import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Claude Code Remote Control',
  description:
    'Acesse seu Claude Code pelo celular. Um QR Code e seu setup local fica acessível de qualquer lugar.',
  alternates: { canonical: `${siteConfig.url}/skills/remote-control` },
  openGraph: {
    title: 'Claude Code Remote Control | João Guirunas',
    description:
      'Acesse seu Claude Code pelo celular. Um QR Code e seu setup local fica acessível de qualquer lugar.',
    url: `${siteConfig.url}/skills/remote-control`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Claude Code Remote Control | João Guirunas',
    description:
      'Acesse seu Claude Code pelo celular. Um QR Code e seu setup local fica acessível de qualquer lugar.',
  },
};

const features = [
  {
    title: 'Acesso pelo Celular',
    description:
      'Use o Claude Code completo pelo celular — mesmo ambiente, mesma conversa, mesmo contexto do desktop.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3.75h3M6.75 20.25v.008h.008v-.008H6.75z"/>',
  },
  {
    title: 'QR Code Setup em 1 minuto',
    description:
      'Digite /remote no terminal, escaneie o QR Code gerado no celular — conexão estabelecida.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"/>',
  },
  {
    title: 'Mesmos Arquivos e Skills do Desktop',
    description:
      'O celular é uma janela para sua máquina — todos os arquivos, skills e CLAUDE.md disponíveis.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>',
  },
  {
    title: 'Sem Custo Extra de API',
    description:
      'Usa a mesma chave de API do desktop — sem duplicar plano, sem pagar por dispositivo adicional.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>',
  },
  {
    title: 'Sem Hospedagem na Nuvem',
    description:
      'Tudo roda localmente — sem expor arquivos para servidores externos, sem configurar infraestrutura.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>',
  },
  {
    title: 'Funciona em Tablet, Celular e PC',
    description:
      'Qualquer dispositivo com navegador se torna um terminal do Claude Code — troque entre eles sem perder contexto.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3"/>',
  },
];

const longDescription = [
  'Com o Remote Control do Claude Code você acessa seu setup local — arquivos, pastas, skills, agentes e CLAUDE.md — diretamente pelo celular. Sem hospedar nada na nuvem, sem pagar por API extra. O celular é só uma janela para sua máquina.',
  'A configuração leva menos de um minuto: você abre o Claude Code no terminal, digita /remote e ele gera um QR Code. Você escaneia no celular e pronto — mesmo ambiente, mesma conversa, continuando de onde parou no desktop.',
  'Usos práticos: monitorar tarefas longas do sofá, aprovar ações do agente enquanto está longe do computador, trocar entre dispositivos sem perder o contexto, controlar automações em andamento remotamente.',
];

export default function RemoteControlPage() {
  return (
    <SkillPage
      title="Claude Code Remote Control"
      description="Acesse seu Claude Code pelo celular. Um QR Code e seu setup local fica acessível de qualquer lugar."
      category="Skills"
      categoryColor="skills"
      longDescription={longDescription}
      features={features}
      primaryLink="https://github.com/anthropics/claude-code"
      primaryLabel="Ver Documentação"
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/skills/remote-control"
    />
  );
}
