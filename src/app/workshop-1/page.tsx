import type { Metadata } from 'next';
import { WorkshopClient } from './WorkshopClient';

export const metadata: Metadata = {
  title: 'Workshop: Claude Code na Prática',
  description: 'Claude Code, AIOX, Squad Creator e Obsidian — tudo em 1h',
  alternates: { canonical: '/workshop-1' },
};

export default function Workshop1Page() {
  return <WorkshopClient />;
}
