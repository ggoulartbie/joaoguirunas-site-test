import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { OpenSourceClient } from './open-source-client';

export const metadata: Metadata = {
  title: 'Open Source Skills para Claude Code',
  description:
    'Mais de 40 recursos open source para Claude Code — skills, tools, frameworks e aprendizado. Automação, growth e sistemas com IA, curados por João Guirunas.',
  alternates: { canonical: '/open-source' },
  openGraph: {
    title: 'Open Source Skills para Claude Code | João Guirunas',
    description:
      'Mais de 40 recursos open source para Claude Code — skills, tools, frameworks e aprendizado. Automação, growth e sistemas com IA, curados por João Guirunas.',
    url: `${siteConfig.url}/open-source`,
    images: [{ url: '/images/hero-ultrawide.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Source Skills para Claude Code | João Guirunas',
    description:
      'Mais de 40 recursos open source para Claude Code — skills, tools, frameworks e aprendizado.',
  },
};

export default function OpenSourcePage() {
  return <OpenSourceClient />;
}
