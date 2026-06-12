import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Workshop 3 — Growth Sales',
  robots: { index: false, follow: false },
};

export default function Workshop3Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
