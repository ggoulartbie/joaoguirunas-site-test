'use server'

import { revalidatePath } from 'next/cache'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function saveSetting(key: string, value: string) {
  const { error } = await supabaseAdmin
    .from('settings')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })

  if (error) {
    console.error('[settings] save error:', error)
    return { error: 'Erro ao salvar configuração.' }
  }

  revalidatePath('/academy/admin/configuracoes')
  return { ok: true }
}

export async function getSetting(key: string): Promise<string | null> {
  const { data } = await supabaseAdmin
    .from('settings')
    .select('value')
    .eq('key', key)
    .maybeSingle()

  return data?.value ?? null
}
