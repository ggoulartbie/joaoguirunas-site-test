'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutGrid, Users, Zap, Monitor, Plug, BookOpen,
  Search, X, ArrowRight,
} from 'lucide-react';
import { GrowthWatermark } from '@/shared/components/ui/growth-watermark';
import { SQUADS, TOTAL_AGENTES } from '@/data/agentes';
import { contentPosts } from '@/data/content-posts';
import { categoryMeta } from '@/data/open-source-categories';
import { skillIcons } from '@/data/skill-icons';

const CINEMA: [number, number, number, number] = [0.7, 0, 0.2, 1];
const GLIDE: [number, number, number, number] = [0.25, 1, 0.3, 1];

const statsVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.38 } },
};
const statItemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: GLIDE } },
};

const categories = [
  { id: 'all',         label: 'Todos',        Icon: LayoutGrid },
  { id: 'squads',      label: 'Squads',       Icon: Users      },
  { id: 'skills',      label: 'Skills',       Icon: Zap        },
  { id: 'apps',        label: 'Apps',         Icon: Monitor    },
  { id: 'integracoes', label: 'Integrações',  Icon: Plug       },
  { id: 'aprendizado', label: 'Aprendizado',  Icon: BookOpen   },
];

const skills = [
  { title: 'AIOX Framework',              description: 'Sistema de orquestração de agentes com squads e personas. Defina workflows, delegue tasks e escale sua operação.',                                               icon: 'framework',    href: '/framework/aiox-framework',          categoryId: 'squads',      categoryLabel: 'Squads',       author: '@SynkraAI' },
  { title: 'Xquads Squads',               description: '12 squads especializadas com 96+ agentes. A maior coleção de squads AIOX da comunidade.',                                                                       icon: 'community',    href: '/squads/xquads',                     categoryId: 'squads',      categoryLabel: 'Squads',       author: '@rafa.grandi' },
  { title: 'n8n Killers Squad',           description: '10 agentes AI para migrar workflows n8n e criar automações via API. Dexter, Hannibal, Bourne, Lisbeth e mais.',                                               icon: 'automation',   href: '/skills/n8n-killers',                categoryId: 'squads',      categoryLabel: 'Squads',       author: '@joaoguirunas' },
  { title: 'Claude Agent Teams',          description: '27 agentes pré-configurados em 3 squads + smart-memory + /team-os. Drop-in para qualquer projeto Claude Code.',                                               icon: 'agents',       href: '/skills/claude-agent-teams',         categoryId: 'squads',      categoryLabel: 'Squads',       author: '@joaoguirunas' },
  { title: 'AIOX Monitor',                description: 'Dashboard isométrico real-time de agentes autônomos. Visualize performance, tasks e métricas.',                                                               icon: 'monitor',      href: '/monitor/aiox-monitor',              categoryId: 'apps',        categoryLabel: 'Apps',         author: '@joaoguirunas' },
  { title: 'Maestri',                     description: 'Comunicação inter-agentes entre terminais. Conecte múltiplos Claude Code para colaboração em tempo real.',                                                    icon: 'message',      href: '/tools/maestri',                     categoryId: 'apps',        categoryLabel: 'Apps',         author: 'Maestri Team' },
  { title: 'Pixel Agents',                description: 'Visualize seus agentes Claude Code ao vivo. Personagens pixel art que espelham cada ação em tempo real.',                                                    icon: 'pixel',        href: '/tools/pixel-agents',                categoryId: 'apps',        categoryLabel: 'Apps',         author: '@joaoguirunas' },
  { title: 'Anime.js',                    description: 'Biblioteca de componentes animados profissionais. Botões, temporizadores, transições — código pronto para usar.',                                             icon: 'animejs',      href: '/tools/animejs',                     categoryId: 'apps',        categoryLabel: 'Apps',         author: '@joaoguirunas' },
  { title: 'Instagram CLI',               description: 'Use o Instagram pelo terminal. Sem doom-scrolling, sem feed. Integra com LLMs para automatizar.',                                                            icon: 'instagram',    href: '/tools/instagram-cli',               categoryId: 'apps',        categoryLabel: 'Apps',         author: '@joaoguirunas' },
  { title: 'Setup Claude Code',           description: 'Guia completo de configuração avançada. Do básico ao expert em Claude Code CLI.',                                                                             icon: 'setup',        href: '/setup/claude-code',                 categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'AI Video Generation',         description: 'Gere vídeos com IA usando 40+ modelos. Veo 3.1, Seedance, Wan 2.5, Grok e mais.',                                                                            icon: 'video',        href: '/skills/ai-video',                   categoryId: 'skills',      categoryLabel: 'Skills',       author: '@nichochar' },
  { title: 'AI Image Generation',         description: 'Gere imagens com IA usando 50+ modelos. FLUX, Gemini, Grok, Seedream e mais.',                                                                               icon: 'image',        href: '/skills/ai-image',                   categoryId: 'skills',      categoryLabel: 'Skills',       author: '@nichochar' },
  { title: 'Social Media Carousel',       description: 'Design de carrosséis multi-slide para Instagram, LinkedIn e Twitter/X com hooks e swipe psychology.',                                                        icon: 'carousel',     href: '/skills/carousel',                   categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Graphic Designer',            description: 'Design de thumbnails, social media, banners e apresentações com princípios CRAP e Gestalt.',                                                                  icon: 'design',       href: '/skills/graphic-designer',           categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Remotion + Claude Code',      description: 'Edite e crie vídeos com Claude Code. Cortes, legendas, split screen — tudo via prompt no terminal.',                                                         icon: 'remotion',     href: '/skills/remotion',                   categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Website Builder',             description: 'Crie sites profissionais com Claude Code + 21st.dev. Do zero ao deploy em minutos, sem experiência prévia.',                                                  icon: 'website',      href: '/skills/website-builder',            categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Claude Cowork & Plugins',     description: 'Módulos prontos que transformam o Claude em especialista da sua área. Open source, gratuitos.',                                                              icon: 'plugin',       href: '/skills/cowork-plugins',             categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Claude Code vs N8N',          description: 'Migre suas automações do N8N para o Claude Code. Webhooks, APIs, lógica condicional — tudo no terminal.',                                                   icon: 'automation',   href: '/skills/n8n',                        categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Remote Control',              description: 'Acesse seu Claude Code pelo celular. Um QR Code e seu setup local fica acessível de qualquer lugar.',                                                        icon: 'mobile',       href: '/skills/remote-control',             categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Claude Code + NotebookLM',    description: 'O maior hack de 2026. Combine Claude Code com NotebookLM como sistema RAG gratuito e potente.',                                                              icon: 'notebook',     href: '/skills/notebook-lm',                categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Claude Code + Obsidian',      description: 'Dê memória permanente ao Claude Code com Obsidian. Tudo que você faz numa sessão é salvo e lembrado.',                                                      icon: 'obsidian',     href: '/skills/obsidian',                   categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'CRM com Claude Code',         description: 'Crie seu CRM do zero sem programação. Pipelines customizados com automações de IA integradas.',                                                              icon: 'crm',          href: '/skills/crm',                        categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Dev Browser',                 description: 'Controle o Chrome com Claude Code via código. Mais rápido, barato e preciso que Computer Use.',                                                              icon: 'browser',      href: '/skills/dev-browser',                categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Copywriting Skill',           description: 'Skill que ensina o Claude a escrever textos de venda. Frameworks profissionais para landing pages e preços.',                                                icon: 'copywriting',  href: '/skills/copywriting',                categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Design System Skill',         description: 'Skill que mantém consistência visual em todo código gerado. Claude aprende seu design system e aplica automaticamente.',                                     icon: 'design',       href: '/skills/design-system',              categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Apresentações com Gamma',     description: 'Crie slides, e-books e infográficos no Claude. Gamma App integrado para layouts profissionais em um clique.',                                                icon: 'presentation', href: '/skills/presentations',              categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Dashboard de Conteúdo',       description: 'Claude Code constrói e opera seu dashboard. Publica, agenda, analisa — tudo dentro do software que ele criou.',                                             icon: 'dashboard',    href: '/skills/content-dashboard',          categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Meta Ads com IA',             description: 'Automação de campanhas Meta com agentes. Otimize criativos, copy e targeting automaticamente.',                                                              icon: 'ads',          href: '/learn/meta-ads-ai',                 categoryId: 'integracoes', categoryLabel: 'Integrações',  author: '@joaoguirunas' },
  { title: 'Google Ads com IA',           description: 'Otimização de Google Ads com IA. Performance Max, Search e Display gerenciados por agentes.',                                                               icon: 'google',       href: '/learn/google-ads-ai',               categoryId: 'integracoes', categoryLabel: 'Integrações',  author: '@joaoguirunas' },
  { title: 'Vercel Deploy',               description: 'Deploy automatizado com preview deployments, domínios custom e edge functions para projetos web.',                                                           icon: 'deploy',       href: '/skills/vercel',                     categoryId: 'integracoes', categoryLabel: 'Integrações',  author: 'Vercel' },
  { title: 'GitHub',                      description: 'Integração completa com repositórios, PRs, Issues e Actions para workflow de desenvolvimento.',                                                              icon: 'github',       href: '/skills/github',                     categoryId: 'integracoes', categoryLabel: 'Integrações',  author: 'GitHub' },
  { title: 'Supabase',                    description: 'Backend open source com PostgreSQL, Auth, Storage e Realtime para aplicações modernas.',                                                                     icon: 'database',     href: '/skills/supabase',                   categoryId: 'integracoes', categoryLabel: 'Integrações',  author: 'Supabase' },
  { title: 'Claude nos DMs do Instagram', description: 'Configure o Claude como vendedor 24/7 no Instagram. Responde directs automaticamente.',                                                                      icon: 'dm',           href: '/skills/instagram-dms',              categoryId: 'integracoes', categoryLabel: 'Integrações',  author: '@joaoguirunas' },
  { title: 'Ads Dashboard',               description: 'Meta Ads, Google Ads e Analytics em um painel centralizado. Relatórios, alertas e recomendações automáticas.',                                              icon: 'dashboard',    href: '/skills/ads-dashboard',              categoryId: 'integracoes', categoryLabel: 'Integrações',  author: '@joaoguirunas' },
  { title: 'Cursos Anthropic',            description: 'Curadoria dos 13 cursos gratuitos da Anthropic. Aprenda a construir com Claude.',                                                                            icon: 'book',         href: '/learn/anthropic-courses',           categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: 'Anthropic' },
  { title: 'Time de Agentes com IA',      description: 'Monte uma empresa de agentes de IA trabalhando 24/7. Do zero a uma operação completa delegada para IA.',                                                    icon: 'agents',       href: '/learn/multi-agent',                 categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: '@joaoguirunas' },
  { title: '8 Repositórios Essenciais',   description: 'Os repositórios GitHub que fazem o Claude Code performar até 10x mais. Curadoria dos melhores.',                                                            icon: 'github',       href: '/learn/github-repos',                categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: '@joaoguirunas' },
  { title: 'SEO com Claude Code',         description: 'Agentes de SEO que auditam, planejam e implementam melhorias no seu site. Do relatório à execução automática.',                                             icon: 'seo',          href: '/learn/seo-claude-code',             categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: '@joaoguirunas' },
  { title: '5 Ferramentas Grátis',        description: 'As ferramentas que todo usuário de Claude Code deveria usar. Superpower, Memory, N8N MCP, UI Pro e mais.',                                                  icon: 'setup',        href: '/learn/claude-code-skills',          categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: '@joaoguirunas' },
  { title: 'Brandbook com Claude Design',  description: 'Tutorial completo com os prompts exatos — do brief ao app React interativo. Logo, direção visual, tipografia e motion num dia.',                   icon: 'layout',       href: '/learn/claude-design-brandbook',     categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: '@joaoguirunas' },
  { title: 'Layouts Profissionais com IA',description: 'Crie interfaces com design de nível profissional usando IA. Prompts exatos, variações ilimitadas.',                                                         icon: 'layout',       href: '/learn/ai-layouts',                  categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: '@joaoguirunas' },
  { title: 'Claude Code + Google Stitch',  description: 'Design profissional → código de produção via MCP. Sem designer, sem agência. Guia completo com prompt exato.',                                                  icon: 'design',       href: '/learn/google-stitch',               categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: '@joaoguirunas' },
  { title: 'Learn Your Way',              description: 'IA que aprende como você aprende. Mapas mentais, áudios, quizzes personalizados para qualquer conteúdo.',                                                   icon: 'brain',        href: '/learn/learn-your-way',              categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: 'Google' },
  { title: 'Managed Agents',              description: 'Como a Anthropic desacoplou brain/hands em agentes. Session + Harness + Sandbox com 60% menos latência.',                                                   icon: 'agents',       href: '/learn/managed-agents',              categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: 'Anthropic Engineering' },
];

// Stats fixos do header. O total de "Recursos" é calculado dinamicamente no
// componente (skills + content-posts migrados) e injetado no início.
const fixedStats = [
  { value: '100%', label: 'Open Source' },
  { value: '13',   label: 'Cursos Curados' },
  { value: '24/7', label: 'Agentes Ativos' },
];

export function OpenSourceClient() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Content-posts migrados para tutorial entram no catálogo como cards
  // filtráveis. Só entram os que já têm categoryId (migração em andamento);
  // posts ainda não enriquecidos ficam de fora até serem categorizados.
  const postCards = contentPosts
    .filter((p) => !!p.categoryId)
    .map((p) => {
      const meta = categoryMeta(p.categoryId);
      return {
        title: p.titulo,
        description: p.longDescription?.[0] ?? (p.legenda ?? '').replace(/#\w+/g, '').replace(/\s+/g, ' ').trim().slice(0, 120),
        icon: meta.icon,
        href: `/open-source/${p.slug}/`,
        categoryId: p.categoryId as string,
        categoryLabel: p.categoryLabel ?? meta.label,
        author: p.author ?? '@joaoguirunas',
      };
    });

  const catalog = [...skills, ...postCards];

  const stats = [
    { value: String(catalog.length), label: 'Recursos' },
    ...fixedStats,
  ];

  const filtered = (() => {
    const q = searchQuery.toLowerCase().trim();
    return catalog.filter((s) => {
      const cat = activeFilter === 'all' || s.categoryId === activeFilter;
      const text = !q || s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.author.toLowerCase().includes(q);
      return cat && text;
    });
  })();

  return (
    <>
      {/* ── 1. Editorial Header ── */}
      <section className="relative overflow-hidden bg-[#050507] pt-20 sm:pt-32 pb-16 sm:pb-20 min-h-[60vh] flex items-end">
        {/* Founder portrait */}
        <Image
          src="/images/bg-open-source.png"
          alt=""
          fill
          className="object-cover object-[center_20%]"
          priority
        />
        {/* Gradients — text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/95 via-[#050507]/70 to-[#050507]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/20 to-transparent" />

        <GrowthWatermark size={520} className="top-0 right-0 -translate-y-1/4 translate-x-1/4" />

        <div className="relative w-full mx-auto max-w-6xl px-6 lg:px-8">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: CINEMA }}
            className="mb-8"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,58,14,0.8)', fontWeight: 500 }}
          >
            João Guirunas · 40+ Recursos · Open Source
          </motion.p>

          {/* H1 Display */}
          <motion.h1
            initial={{ opacity: 0, y: 44, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.08, ease: CINEMA }}
            className="font-[family-name:var(--font-display-serif)] font-[400] leading-[0.92] tracking-[-0.03em] text-white mb-8"
            style={{ fontSize: 'clamp(48px, 10vw, 120px)' }}
          >
            Open{' '}
            <span className="italic font-[300]" style={{ color: '#FF3A0E' }}>
              Source
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: GLIDE }}
            className="text-base sm:text-lg max-w-lg leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.42)' }}
          >
            Ferramentas reais para Claude Code — curadas e usadas em produção.
          </motion.p>

          {/* Stats strip — stagger por item */}
          <motion.div
            variants={statsVariants}
            initial="hidden"
            animate="show"
            className="mt-14 pt-8 flex flex-wrap gap-10 sm:gap-16"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={statItemVariants} className="flex flex-col gap-1">
                <span
                  className="text-2xl sm:text-3xl font-bold leading-none"
                  style={{ color: '#FF3A0E', fontFamily: 'var(--font-display-serif)' }}
                >
                  {stat.value}
                </span>
                <span
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 1.5 Featured: Agent Teams ── */}
      <section className="relative bg-[#050507] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Link
            href="/agentes"
            className="group relative block overflow-hidden border border-white/10 hover:border-[#FF3A0E]/50 transition-all"
            style={{
              background: `
                radial-gradient(ellipse at 80% 50%, rgba(255,58,14,0.10) 0%, transparent 60%),
                linear-gradient(135deg, #0a0a0d 0%, #050507 100%)
              `,
            }}
          >
            {/* dot grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center p-5 sm:p-8 lg:p-12">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="inline-block px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase"
                    style={{ background: '#FF3A0E', color: '#050507', fontFamily: 'var(--font-mono)' }}
                  >
                    Novo
                  </span>
                  <span
                    className="text-white/50 uppercase"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em' }}
                  >
                    Centro de Treinamento Claude
                  </span>
                </div>

                <h2
                  className="font-[family-name:var(--font-display-serif)] font-[400] leading-[0.95] tracking-[-0.02em] text-white mb-4"
                  style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
                >
                  {TOTAL_AGENTES} agentes que{' '}
                  <span className="italic font-[300]" style={{ color: '#FF3A0E' }}>
                    trabalham por você
                  </span>
                </h2>

                <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
                  Conheça as 4 squads completas — Dev, Sites, Social e Traffic. Cada agente com persona,
                  autoridades e skills definidos. Drop-in pra qualquer projeto Claude Code.
                </p>

                {/* Squad chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {SQUADS.map((s) => (
                    <span
                      key={s.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 border"
                      style={{
                        borderColor: `${s.accent}55`,
                        background: `${s.accent}0d`,
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        letterSpacing: '0.12em',
                      }}
                    >
                      <span className="w-1 h-1 rounded-full" style={{ background: s.accent }} />
                      <span className="text-white/85 uppercase">{s.label}</span>
                      <span className="text-white/40">{s.count}</span>
                    </span>
                  ))}
                </div>

                <span
                  className="inline-flex items-center gap-2 text-[#FF3A0E] uppercase font-semibold transition-transform group-hover:translate-x-1"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em' }}
                >
                  Conhecer os {TOTAL_AGENTES} agentes
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>

              {/* Big number on the right */}
              <div className="hidden lg:flex items-center justify-center pr-4">
                <div className="text-center">
                  <div
                    className="font-[family-name:var(--font-display-serif)] font-[300] leading-none"
                    style={{
                      fontSize: 'clamp(120px, 14vw, 180px)',
                      color: '#FF3A0E',
                      textShadow: '0 0 80px rgba(255,58,14,0.4)',
                    }}
                  >
                    {TOTAL_AGENTES}
                  </div>
                  <div
                    className="text-white/50 uppercase mt-2"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em' }}
                  >
                    Agentes
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── 2. Skills Grid ── */}
      <section id="skills" className="bg-[#050507] pb-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          {/* Search */}
          <div className="pt-10 pb-5">
            <div className="relative w-full sm:max-w-xs">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none"
                style={{ color: 'rgba(255,255,255,0.28)' }}
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar..."
                className="w-full pl-10 pr-8 py-3 text-sm placeholder-white/25 bg-transparent focus:outline-none transition-colors min-h-[44px]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                aria-label="Buscar recursos"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                  aria-label="Limpar busca"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: GLIDE }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map(({ id, label, Icon }) => {
              const active = activeFilter === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveFilter(id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-[44px] transition-all duration-150"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    fontWeight: 500,
                    background: active ? 'rgba(255,58,14,0.06)' : 'transparent',
                    border: `1px solid ${active ? 'rgba(255,58,14,0.3)' : 'rgba(255,255,255,0.07)'}`,
                    color: active ? '#FF3A0E' : 'rgba(255,255,255,0.38)',
                    cursor: 'pointer',
                  }}
                >
                  <Icon className="h-3 w-3 flex-shrink-0" />
                  {label}
                </button>
              );
            })}
          </motion.div>

          {/* Result label */}
          {searchQuery && (
            <p className="mb-5 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)' }}>
              {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} para &ldquo;{searchQuery}&rdquo;
            </p>
          )}

          {/* Empty state */}
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="mb-4 text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)' }}>
                Nenhum resultado para &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                className="text-sm underline underline-offset-4 transition-colors"
                style={{ color: '#FF3A0E', fontFamily: 'var(--font-mono)' }}
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              style={{ border: '1px solid rgba(255,255,255,0.07)', gap: 1, background: 'rgba(255,255,255,0.07)' }}
            >
              {filtered.map((skill) => (
                <Link
                  key={skill.title}
                  href={skill.href}
                  className="group flex flex-col p-5 bg-[#0e0e11] hover:bg-[#1f1f24] transition-colors duration-150"
                  aria-label={`Ver detalhes de ${skill.title}`}
                >
                  {/* Icon + category */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-8 h-8 flex items-center justify-center flex-shrink-0 transition-colors duration-150 group-hover:border-white/[0.14]"
                      style={{
                        background: '#16161a',
                        border: '1px solid rgba(255,255,255,0.07)',
                        color: 'rgba(255,255,255,0.38)',
                      }}
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        dangerouslySetInnerHTML={{ __html: skillIcons[skill.icon] ?? skillIcons['monitor']! }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.55rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'rgba(255,255,255,0.22)',
                        fontWeight: 500,
                      }}
                    >
                      {skill.categoryLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-sm font-semibold leading-snug mb-2 transition-colors duration-150"
                    style={{ color: 'rgba(255,255,255,0.82)' }}
                  >
                    {skill.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-xs leading-relaxed flex-1 mb-4 line-clamp-2"
                    style={{ color: 'rgba(255,255,255,0.38)' }}
                  >
                    {skill.description}
                  </p>

                  {/* Footer */}
                  <div
                    className="flex items-center justify-between pt-3"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <span
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center gap-1"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#FF3A0E',
                      }}
                      aria-hidden="true"
                    >
                      Ver
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.58rem',
                        color: 'rgba(255,255,255,0.2)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {skill.author}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 3. CTA — Full-bleed ember (KV closing pattern) ── */}
      <section
        className="relative overflow-hidden py-20 sm:py-28 lg:py-36"
        style={{ background: '#FF3A0E' }}
      >
        {/* Brand watermark — símbolo JG em void sobre ember */}
        <GrowthWatermark
          size={560}
          className="bottom-0 right-0 translate-x-1/4 translate-y-1/4"
          color="#050507"
          opacity={0.07}
        />

        <div className="relative mx-auto max-w-6xl px-6 sm:px-12 lg:px-[140px]">
          {/* Eyebrow */}
          <p
            className="mb-6"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: 'rgba(5,5,7,0.45)',
              fontWeight: 500,
            }}
          >
            Mentoria Exclusiva · João Guirunas
          </p>

          {/* H2 */}
          <h2
            className="font-[family-name:var(--font-display-serif)] font-[400] leading-[0.92] tracking-[-0.03em] mb-8 max-w-3xl"
            style={{ fontSize: 'clamp(36px, 7vw, 96px)', color: '#050507' }}
          >
            Pronto para{' '}
            <span className="italic font-[300]">escalar?</span>
          </h2>

          {/* Subtext */}
          <p
            className="text-base sm:text-lg leading-relaxed mb-12 max-w-md"
            style={{ color: 'rgba(5,5,7,0.58)', letterSpacing: '-0.005em' }}
          >
            Turmas exclusivas de 10 alunos · 4 semanas · 10 encontros que transformam sua operação com IA.
          </p>

          {/* CTA — primary button: void bg, bone text (KV spec) */}
          <Link
            href="/mentoria"
            className="inline-flex items-center gap-3 transition-all duration-300 hover:gap-4 active:scale-[0.98]"
            style={{
              background: '#050507',
              color: '#f1f1f3',
              padding: '16px 28px',
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: '-0.01em',
            }}
            aria-label="Ir para página de mentoria"
          >
            Quero minha vaga
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
