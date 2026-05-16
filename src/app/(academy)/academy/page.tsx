import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/helpers'

export const dynamic = 'force-dynamic'

export default async function AcademyRootPage() {
  const user = await getCurrentUser()
  redirect(user ? '/academy/aluno' : '/academy/login')
}
