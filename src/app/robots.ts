import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Página de onboarding privada — fora do índice (vinha do robots.txt estático).
      disallow: '/mentoria/onboarding',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
