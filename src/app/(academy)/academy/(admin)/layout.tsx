import type { Metadata } from 'next'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminTopBar } from '@/components/admin/AdminTopBar'
import { requireAdmin } from '@/lib/auth/helpers'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: {
    default: 'Admin',
    template: '%s | Admin',
  },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdmin()
  return (
    <div className="flex min-h-screen bg-[var(--void)]">
      <AdminSidebar />
      <div className="flex flex-1 flex-col lg:pl-64">
        <AdminTopBar />
        <main id="main-content" className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
