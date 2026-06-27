import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { StudentShell } from '@/components/student/StudentShell'
import { OnboardingWizard } from '@/components/student/OnboardingWizard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: {
    default: 'Área do Aluno',
    template: '%s | Área do Aluno',
  },
  robots: { index: false, follow: false },
}

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [notificationsResult, profileResult] = user
    ? await Promise.all([
        supabase
          .from('notifications')
          .select('id, title, message, notification_type, action_url, read_at, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(20),
        supabase
          .from('profiles')
          .select('name, bio, role')
          .eq('id', user.id)
          .single(),
      ])
    : [{ data: null }, { data: null }]

  const notifications = notificationsResult.data ?? []
  const profile = profileResult.data

  const userInitials =
    profile?.name
      ?.split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? 'JG'

  const needsOnboarding = user !== null && profile !== null && !profile?.name && !profile?.bio
  const isAdmin = profile?.role === 'ADMIN'

  return (
    <>
      {/* Skip-to-content para navegação por teclado (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[var(--ember)] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-wider focus:text-white"
      >
        Pular para conteúdo principal
      </a>

      <StudentShell notifications={notifications} userInitials={userInitials} isAdmin={isAdmin}>
        {children}
      </StudentShell>

      {needsOnboarding && (
        <OnboardingWizard userName={null} />
      )}
    </>
  )
}
