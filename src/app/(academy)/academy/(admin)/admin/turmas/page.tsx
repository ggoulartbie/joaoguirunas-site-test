export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { CohortListClient } from './CohortListClient'

export const metadata: Metadata = { title: 'Turmas' }

export default async function AdminTurmasPage() {
  const { data: cohorts } = await supabaseAdmin
    .from('cohorts')
    .select('id, slug, name, description, cover_image_url, status, start_date, end_date, total_seats, filled_seats, is_purchasable, has_public_page, entry_price_cents, created_at, updated_at')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Admin</p>
          <h1 className="font-[family-name:var(--type-display)] text-[32px] italic font-light text-[var(--bone)]">
            Turmas
          </h1>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
            Gerencie cohorts — criação, edição e configuração
          </p>
        </div>
        <Link
          href="/academy/admin/turmas/nova"
          className="bg-[var(--ember)] px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--void)] transition-opacity hover:opacity-90"
          style={{ borderRadius: 0 }}
        >
          + Nova Turma
        </Link>
      </div>
      <CohortListClient initialCohorts={cohorts ?? []} />
    </div>
  )
}
