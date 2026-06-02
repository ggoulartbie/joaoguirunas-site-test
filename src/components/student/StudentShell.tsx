'use client'

import { useState } from 'react'
import { StudentSidebar } from './StudentSidebar'
import { StudentTopBar } from './StudentTopBar'

type Notification = {
  id: string
  title: string
  message: string | null
  notification_type: string
  action_url: string | null
  read_at: string | null
  created_at: string
}

type Props = {
  notifications: Notification[]
  userInitials: string
  isAdmin?: boolean
  children: React.ReactNode
}

export function StudentShell({ notifications, userInitials, isAdmin, children }: Props) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--void)' }}>
      <StudentSidebar
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      <div className="flex flex-1 flex-col lg:pl-64">
        <StudentTopBar
          notifications={notifications}
          userInitials={userInitials}
          isAdmin={isAdmin}
          onMenuClick={() => setMobileNavOpen(true)}
        />
        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
