import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Workshop 2: AIOX × Claude Code × Design System',
    template: '%s | Workshop 2',
  },
  description:
    'Workshop prático: do briefing ao deploy com AIOX, Claude Code, Obsidian e Claude Design — um squad completo construindo uma landing page real.',
  alternates: { canonical: '/workshop-2' },
};

export default function Workshop2Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
