import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getOnboarding } from '@/lib/actions/onboarding';
import { OnboardingFormClient } from './OnboardingFormClient';

export const metadata: Metadata = {
  title: 'Onboarding — Mentoria Claude Code + IA',
  robots: { index: false, follow: false },
};

export default async function OnboardingFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = await getOnboarding(id);
  if (!record) notFound();

  return <OnboardingFormClient id={id} initialData={record} />;
}
