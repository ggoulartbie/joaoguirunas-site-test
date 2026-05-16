export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { ModuloSlideshow } from '../_components/ModuloSlideshow';
import type { SlideAgent } from '../_components/ModuloSlideshow';

export const metadata: Metadata = {
  title: 'Módulo 1: O que é possível | Mentoria Claude Code',
  alternates: { canonical: '/mentoria/presencial/o-que-e-possivel' },
};

/* ── Agent data com accent colors ── */
const DEV   = '#A78BFA';
const SITES = '#FF3A0E';
const SOC   = '#EC4899';
const TRF   = '#06B6D4';

const ALL_AGENTS: SlideAgent[] = [
  // dev
  { slug: 'dev-analyst',       codename: 'Lyrak',    accent: DEV,   title: 'Research Analyst' },
  { slug: 'dev-architect',     codename: 'Zaelor',   accent: DEV,   title: 'Architect' },
  { slug: 'dev-data-engineer', codename: 'Bythak',   accent: DEV,   title: 'Data Engineer' },
  { slug: 'dev-dev-alpha',     codename: 'Novik',    accent: DEV,   title: 'Frontend Developer' },
  { slug: 'dev-dev-beta',      codename: 'Rexar',    accent: DEV,   title: 'Backend Developer' },
  { slug: 'dev-dev-delta',     codename: 'Kronix',   accent: DEV,   title: 'Hardening & Resilience' },
  { slug: 'dev-dev-gamma',     codename: 'Serak',    accent: DEV,   title: 'Fullstack Developer' },
  { slug: 'dev-devops',        codename: 'Gravok',   accent: DEV,   title: 'DevOps Guardian' },
  { slug: 'dev-qa',            codename: 'Axikar',   accent: DEV,   title: 'QA Master' },
  { slug: 'dev-ux',            codename: 'Velax',    accent: DEV,   title: 'UX Specialist' },
  // sites
  { slug: 'sites-analyst',     codename: 'Lyrel',    accent: SITES, title: 'Research Analyst' },
  { slug: 'sites-architect',   codename: 'Zaelion',  accent: SITES, title: 'Architect' },
  { slug: 'sites-data',        codename: 'Bythelion',accent: SITES, title: 'Data Engineer' },
  { slug: 'sites-dev-alpha',   codename: 'Novael',   accent: SITES, title: 'Frontend Developer' },
  { slug: 'sites-dev-beta',    codename: 'Rexali',   accent: SITES, title: 'Backend Developer' },
  { slug: 'sites-dev-delta',   codename: 'Kronilux', accent: SITES, title: 'Hardening & Resilience' },
  { slug: 'sites-dev-gamma',   codename: 'Seranol',  accent: SITES, title: 'Fullstack Developer' },
  { slug: 'sites-devops',      codename: 'Graveli',  accent: SITES, title: 'DevOps Guardian' },
  { slug: 'sites-qa',          codename: 'Axilun',   accent: SITES, title: 'QA Master' },
  { slug: 'sites-ux',          codename: 'Velani',   accent: SITES, title: 'UX Specialist' },
  // social
  { slug: 'social-analyst',    codename: 'Soph',     accent: SOC,   title: 'Social Analyst' },
  { slug: 'social-content',    codename: 'Lyrix',    accent: SOC,   title: 'Content Creator' },
  { slug: 'social-design',     codename: 'Aevon',    accent: SOC,   title: 'Graphic Designer' },
  { slug: 'social-photo',      codename: 'Irix',     accent: SOC,   title: 'Photo Creator' },
  { slug: 'social-publisher',  codename: 'Zenav',    accent: SOC,   title: 'Publisher & Analytics' },
  { slug: 'social-strategist', codename: 'Verak',    accent: SOC,   title: 'Strategist' },
  { slug: 'social-video',      codename: 'Fluxx',    accent: SOC,   title: 'Video Editor' },
  // traffic
  { slug: 'traffic-analyst',   codename: 'Lyrath',   accent: TRF,   title: 'Performance Analyst' },
  { slug: 'traffic-automation',codename: 'Florix',   accent: TRF,   title: 'Automation Specialist' },
  { slug: 'traffic-bi',        codename: 'Bytax',    accent: TRF,   title: 'BI & Analytics' },
  { slug: 'traffic-copywriter',codename: 'Koprath',  accent: TRF,   title: 'Ad Copywriter' },
  { slug: 'traffic-designer',  codename: 'Pixrek',   accent: TRF,   title: 'Ad Creative Designer' },
  { slug: 'traffic-google',    codename: 'Gorix',    accent: TRF,   title: 'Google Ads Specialist' },
  { slug: 'traffic-meta',      codename: 'Zukar',    accent: TRF,   title: 'Meta Ads Specialist' },
  { slug: 'traffic-qa',        codename: 'Gathar',   accent: TRF,   title: 'Campaign QA' },
  { slug: 'traffic-strategist',codename: 'Axar',     accent: TRF,   title: 'Traffic Strategist' },
  { slug: 'traffic-tiktok',    codename: 'Tokris',   accent: TRF,   title: 'TikTok Ads' },
];

const SITES_SQUAD: SlideAgent[] = [
  { slug: 'sites-analyst',   codename: 'Lyrel',     accent: SITES, title: 'Research Analyst' },
  { slug: 'sites-architect', codename: 'Zaelion',   accent: SITES, title: 'Architect' },
  { slug: 'sites-data',      codename: 'Bythelion', accent: SITES, title: 'Data Engineer' },
  { slug: 'sites-dev-alpha', codename: 'Novael',    accent: SITES, title: 'Frontend Developer' },
  { slug: 'sites-dev-beta',  codename: 'Rexali',    accent: SITES, title: 'Backend Developer' },
  { slug: 'sites-dev-delta', codename: 'Kronilux',  accent: SITES, title: 'Hardening & Resilience' },
  { slug: 'sites-dev-gamma', codename: 'Seranol',   accent: SITES, title: 'Fullstack Developer' },
  { slug: 'sites-devops',    codename: 'Graveli',   accent: SITES, title: 'DevOps Guardian' },
  { slug: 'sites-qa',        codename: 'Axilun',    accent: SITES, title: 'QA Master' },
  { slug: 'sites-ux',        codename: 'Velani',    accent: SITES, title: 'UX Specialist' },
];

const slides = [
  {
    label: 'Team OS · Sistema de Orquestração',
    title: 'Tudo que você vai ver foi construído com Team OS.',
    body: 'Team OS é o sistema de orquestração nativo do Claude Code — a skill que coordena squads de agentes especializados, cada um com papel definido, trabalhando em paralelo. Cada sistema que você vai ver aqui foi construído usando exatamente isso.',
    belt: true,
    agents: ALL_AGENTS,
  },
  {
    label: 'REV OS · Orquestrador Comercial',
    title: 'Mais de R$ 100k/mês em receita gerada por agentes.',
    body: 'REV OS é o sistema de orquestração comercial da GrowthSales. Qualifica leads, personaliza abordagem, gera propostas e faz follow-up automaticamente — em todos os canais ao mesmo tempo. Sem uma pessoa tocar no processo.',
    note: 'Operando em produção para:',
    clients: ['Sisprime', 'Blue3', 'Viva América', 'Argoplan', 'The Mentor', 'PlugaiGym'],
    screenshot: '/mentoria/revos.png',
  },
  {
    label: 'WORK OS · Gestão de Projetos',
    title: 'Adeus Asana. Adeus Trello. Adeus Monday.',
    body: 'Work OS é o sistema interno de gestão de projetos da GrowthSales. Cria tarefas, delega, monitora progresso e sinaliza bloqueios sozinho — do briefing ao entregável, com rastreabilidade completa de cada decisão.',
    note: 'A mesma infraestrutura de Agent Teams que você vai aprender a montar neste dia.',
    screenshot: '/mentoria/workos.png',
  },
  {
    label: 'Brandbook · GrowthSales.ai',
    title: 'Brandbook de R$ 60k entregue em 2 dias.',
    body: 'Com o Diretor de Criação Claude Design, tokens, paletas, tipografia, componentes e brandbook foram construídos do zero. O que uma agência levaria semanas e cobrava R$ 60k — feito em 2 dias por um squad de agentes de design.',
    screenshot: '/mentoria/brandbook.png',
  },
  {
    label: 'Portal · joaoguirunas.com',
    title: 'Open-source, páginas de venda — 10 agentes, 70+ stories, live.',
    body: 'A squad Sites redesenhou e publicou o portal completo: home, open-source com 40+ recursos, e páginas de venda do curso e da mentoria. Do wireframe ao ar, coordenado por um lead, executado em paralelo com veredicto formal de QA a cada entrega.',
    stats: [
      { label: 'Agentes', value: '10' },
      { label: 'Stories', value: '70+' },
      { label: 'Páginas', value: '8+' },
      { label: 'Deploy', value: 'Live' },
    ],
    screenshot: '/mentoria/portal-opensource.png',
  },
  {
    label: 'Área de Mídia · João Guirunas',
    title: 'Strategy Room Live — onde o squad opera.',
    body: 'O Portal de Social Media reúne posicionamento, design system, estratégia e campanhas num único ambiente. Carrossel e Reels produzidos e publicados toda semana — sem o João precisar planejar manualmente nada.',
    stats: [
      { label: 'Seguidores', value: '4.626' },
      { label: 'ER Médio', value: '12,0%' },
      { label: 'Posts · Abril', value: '17' },
      { label: 'Regime', value: 'One-shot' },
    ],
    screenshot: '/mentoria/strategy-room.png',
  },
  {
    label: 'Academy · Área do Aluno',
    title: 'Plataforma de cursos online completa — em produção.',
    body: 'Academy com autenticação, checkout Stripe e InfinitePay, área do aluno, módulos, aulas com progresso, certificados e fórum. 42 stories em 12 fases — do schema Supabase ao webhook de pagamento. Tudo construído pela squad Sites com Agent Teams.',
    stats: [
      { label: 'Stories', value: '70+' },
      { label: 'Fases', value: '12' },
      { label: 'Agentes', value: '10' },
      { label: 'Deploy', value: 'Live' },
    ],
    screenshot: '/mentoria/academy-area-aluno.png',
  },
];

export default function OQueEPossivelPage() {
  return <ModuloSlideshow slug="o-que-e-possivel" slides={slides} />;
}
