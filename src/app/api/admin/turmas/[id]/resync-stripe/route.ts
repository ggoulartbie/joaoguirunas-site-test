import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getCurrentUser } from '@/lib/auth/helpers'
import { syncCohortWithStripe } from '@/lib/payment/sync'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const profile = await getCurrentUser()
  if (!profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (profile.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params

  if (!z.string().uuid().safeParse(id).success) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const { data: cohort } = await supabaseAdmin
    .from('cohorts')
    .select('id, is_purchasable')
    .eq('id', id)
    .single()

  if (!cohort) {
    return NextResponse.json({ error: 'Cohort not found' }, { status: 404 })
  }

  if (!cohort.is_purchasable) {
    return NextResponse.json({ error: 'Cohort is not purchasable — enable is_purchasable first' }, { status: 422 })
  }

  try {
    await syncCohortWithStripe(id)
    return NextResponse.json({ ok: true, cohort_id: id })
  } catch (err) {
    console.error('[resync-stripe] sync failed:', err)
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 })
  }
}
