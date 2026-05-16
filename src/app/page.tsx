export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { AnimatedHero } from '@/shared/components/ui/animated-hero';
import { AuthHashRedirect } from '@/shared/components/ui/AuthHashRedirect';

export const metadata: Metadata = {
  title: 'João Guirunas — IA em Negócios Reais com Claude Code',
  description:
    'CEO da GrowthSales.ai. Uso IA em negócios reais — automação, growth e sistemas que escalam com Claude Code. O que funciona, compartilho e ensino.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'João Guirunas — IA em Negócios Reais com Claude Code',
    description:
      'CEO da GrowthSales.ai. Uso IA em negócios reais — automação, growth e sistemas que escalam com Claude Code. O que funciona, compartilho e ensino.',
    url: siteConfig.url,
    images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'João Guirunas — IA em Negócios Reais com Claude Code',
    description:
      'CEO da GrowthSales.ai. Uso IA em negócios reais — automação, growth e sistemas que escalam com Claude Code. O que funciona, compartilho e ensino.',
  },
};

export default function HomePage() {
  return (
    <main>
      <AuthHashRedirect />
      <AnimatedHero />
    </main>
  );
}
