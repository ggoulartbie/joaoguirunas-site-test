'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/auth/helpers'

export async function markNotificationRead(id: string): Promise<void> {
  const user = await requireUser()
  const supabase = await createClient()

  await supabase
    .from('notifications')
    .update({ read_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', user.id)

  revalidatePath('/', 'layout')
}

export async function markAllNotificationsRead(): Promise<void> {
  const user = await requireUser()
  const supabase = await createClient()

  await supabase
    .from('notifications')
    .update({ read_at: new Date().toISOString() })
    .eq('user_id', user.id)
    .is('read_at', null)

  revalidatePath('/', 'layout')
}

export async function completeOnboarding(name: string, bio: string): Promise<void> {
  const user = await requireUser()
  const supabase = await createClient()

  await supabase
    .from('profiles')
    .update({ name: name.trim() || undefined, bio: bio.trim() || undefined })
    .eq('id', user.id)

  revalidatePath('/', 'layout')
}
