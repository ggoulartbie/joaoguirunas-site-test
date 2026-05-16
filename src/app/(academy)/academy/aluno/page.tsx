export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { requireUser } from '@/lib/auth/helpers'

export default async function AlunoPage() {
  await requireUser()
  redirect('/academy/dashboard')
}
