import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { ALL_AGENTES } from '@/data/agentes';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const pages: Array<{ path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { path: '/',                          priority: 1.0, freq: 'weekly' },
    { path: '/mentoria',                  priority: 0.9, freq: 'weekly' },
    { path: '/agentes',                   priority: 0.9, freq: 'weekly' },
    { path: '/open-source',               priority: 0.8, freq: 'weekly' },
    { path: '/workshop-1',                priority: 0.8, freq: 'monthly' },
    { path: '/mentoria/apresentacao',     priority: 0.7, freq: 'monthly' },
    // Learn
    { path: '/learn/multi-agent',         priority: 0.7, freq: 'monthly' },
    { path: '/learn/claude-code-skills',  priority: 0.7, freq: 'monthly' },
    { path: '/learn/google-ads-ai',       priority: 0.7, freq: 'monthly' },
    { path: '/learn/meta-ads-ai',         priority: 0.7, freq: 'monthly' },
    { path: '/learn/seo-claude-code',     priority: 0.7, freq: 'monthly' },
    { path: '/learn/ai-layouts',          priority: 0.6, freq: 'monthly' },
    { path: '/learn/anthropic-courses',   priority: 0.6, freq: 'monthly' },
    { path: '/learn/managed-agents',      priority: 0.6, freq: 'monthly' },
    { path: '/learn/learn-your-way',      priority: 0.6, freq: 'monthly' },
    { path: '/learn/github-repos',        priority: 0.6, freq: 'monthly' },
    // Setup
    { path: '/setup/claude-code',         priority: 0.7, freq: 'monthly' },
    // Tools
    { path: '/tools/maestri',             priority: 0.7, freq: 'monthly' },
    { path: '/tools/pixel-agents',        priority: 0.6, freq: 'monthly' },
    { path: '/tools/animejs',             priority: 0.6, freq: 'monthly' },
    { path: '/tools/instagram-cli',       priority: 0.6, freq: 'monthly' },
    // Skills
    { path: '/skills/claude-agent-teams', priority: 0.7, freq: 'monthly' },
    { path: '/skills/copywriting',        priority: 0.6, freq: 'monthly' },
    { path: '/skills/website-builder',    priority: 0.6, freq: 'monthly' },
    { path: '/skills/crm',                priority: 0.6, freq: 'monthly' },
    { path: '/skills/instagram-dms',      priority: 0.6, freq: 'monthly' },
    { path: '/skills/n8n',                priority: 0.6, freq: 'monthly' },
    { path: '/skills/n8n-killers',        priority: 0.6, freq: 'monthly' },
    { path: '/skills/presentations',      priority: 0.6, freq: 'monthly' },
    { path: '/skills/content-dashboard',  priority: 0.6, freq: 'monthly' },
    { path: '/skills/ads-dashboard',      priority: 0.6, freq: 'monthly' },
    { path: '/skills/design-system',      priority: 0.6, freq: 'monthly' },
    { path: '/skills/remotion',           priority: 0.6, freq: 'monthly' },
    { path: '/skills/ai-image',           priority: 0.6, freq: 'monthly' },
    { path: '/skills/ai-video',           priority: 0.6, freq: 'monthly' },
    { path: '/skills/graphic-designer',   priority: 0.6, freq: 'monthly' },
    { path: '/skills/notebook-lm',        priority: 0.5, freq: 'monthly' },
    { path: '/skills/obsidian',           priority: 0.5, freq: 'monthly' },
    { path: '/skills/dev-browser',        priority: 0.5, freq: 'monthly' },
    { path: '/skills/remote-control',     priority: 0.5, freq: 'monthly' },
    { path: '/skills/cowork-plugins',     priority: 0.5, freq: 'monthly' },
    { path: '/skills/carousel',           priority: 0.5, freq: 'monthly' },
    { path: '/skills/supabase',           priority: 0.5, freq: 'monthly' },
    { path: '/skills/vercel',             priority: 0.5, freq: 'monthly' },
    { path: '/skills/github',             priority: 0.5, freq: 'monthly' },
    // Framework / Monitor / Squads
    { path: '/framework/aiox-framework',  priority: 0.6, freq: 'monthly' },
    { path: '/squads/xquads',             priority: 0.5, freq: 'monthly' },
    { path: '/monitor/aiox-monitor',      priority: 0.5, freq: 'monthly' },
  ];

  // Agent profile pages — one per agent
  const agentEntries: MetadataRoute.Sitemap = ALL_AGENTES.map((a) => ({
    url: `${base}/agentes/${a.squad}/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    ...pages.map(({ path, priority, freq }) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: freq,
      priority,
    })),
    ...agentEntries,
  ];
}
