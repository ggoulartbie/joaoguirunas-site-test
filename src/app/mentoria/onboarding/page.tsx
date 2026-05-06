import type { Metadata } from 'next';
import { OnboardingClient } from './OnboardingClient';

export const metadata: Metadata = {
  title: 'Onboarding — Mentoria Claude Code + IA',
  robots: { index: false, follow: false },
};

export default function OnboardingPage() {
  return <OnboardingClient />;
}
