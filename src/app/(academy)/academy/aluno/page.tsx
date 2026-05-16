import { redirect } from 'next/navigation'
import { requireUser } from '@/lib/auth/helpers'

export const dynamic = 'force-dynamic'

export default async function AlunoPage() {
  await requireUser()
  redirect('/academy/dashboard')
}
