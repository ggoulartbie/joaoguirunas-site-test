export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { listOnboardings } from '@/lib/actions/onboarding';
import { OnboardingListClient } from './OnboardingListClient';

export const metadata: Metadata = {
  title: 'Onboardings — Mentoria',
  robots: { index: false, follow: false },
};

export default async function OnboardingListPage() {
  const records = await listOnboardings();
  return <OnboardingListClient initialRecords={records} />;
}
