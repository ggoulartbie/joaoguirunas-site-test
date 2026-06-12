import type { Metadata } from 'next';
import { ReflexaoContent } from './ReflexaoContent';

export const metadata: Metadata = {
  title: '09 — Reflexão final | Workshop 3',
  robots: { index: false, follow: false },
};

export default function ReflexaoPage() {
  return <ReflexaoContent />;
}
