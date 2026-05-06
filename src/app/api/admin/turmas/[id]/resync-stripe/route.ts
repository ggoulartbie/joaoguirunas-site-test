import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth/helpers'
import { syncCohortWithStripe } from '@/lib/payment/sync'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

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
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Sync failed' },
      { status: 500 },
    )
  }
}
