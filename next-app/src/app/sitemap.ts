import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const routes = [
    '/',
    '/mentoria',
    '/mentoria/apresentacao',
    '/framework/aiox-framework',
    '/monitor/aiox-monitor',
    '/squads/xquads',
    '/tools/maestri',
    '/setup/claude-code',
    '/learn/anthropic-courses',
    '/learn/meta-ads-ai',
    '/learn/google-ads-ai',
    '/skills/vercel',
    '/skills/github',
    '/skills/supabase',
    '/skills/carousel',
    '/skills/graphic-designer',
    '/skills/ai-image',
    '/skills/ai-video',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/mentoria' ? 0.9 : 0.7,
  }));
}
