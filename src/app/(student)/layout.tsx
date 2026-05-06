import type { Metadata } from 'next'
import { StudentSidebar } from '@/components/student/StudentSidebar'
import { StudentTopBar } from '@/components/student/StudentTopBar'

export const metadata: Metadata = {
  title: {
    default: 'Área do Aluno',
    template: '%s | Área do Aluno',
  },
}

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#050507]">
      <StudentSidebar />
      <div className="flex flex-1 flex-col lg:pl-64">
        <StudentTopBar />
        <main id="main-content" className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
