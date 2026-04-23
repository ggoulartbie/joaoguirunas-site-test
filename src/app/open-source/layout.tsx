import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Open Source Skills — Claude Code, Squads e Ferramentas de IA',
  description:
    'Mais de 40 recursos open source para Claude Code: squads de agentes, skills especializadas, apps e integrações. Tudo gratuito, produção-ready, by GrowthSales.ai.',
  openGraph: {
    title: 'Open Source Skills — Claude Code, Squads e Ferramentas de IA',
    description:
      'Mais de 40 recursos open source para Claude Code: squads de agentes, skills especializadas, apps e integrações. Tudo gratuito, produção-ready.',
    images: ['/images/hero-ultrawide.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Source Skills — Claude Code, Squads e Ferramentas de IA',
    description:
      'Mais de 40 recursos open source para Claude Code: squads de agentes, skills especializadas, apps e integrações.',
    images: ['/images/hero-ultrawide.png'],
  },
  alternates: {
    canonical: '/open-source',
  },
};

export default function OpenSourceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
