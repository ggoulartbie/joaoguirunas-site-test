import 'server-only'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// service_role ignora RLS — usar APENAS em Route Handlers, Server Actions e webhooks
// Lazy para não falhar no build quando env vars não estão disponíveis (ex: CI)
let _admin: ReturnType<typeof createClient<Database>> | null = null

export function getSupabaseAdmin() {
  if (!_admin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) throw new Error('Supabase admin env vars not configured')
    _admin = createClient<Database>(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  }
  return _admin
}

// Alias para compatibilidade com código existente que importa supabaseAdmin diretamente
export const supabaseAdmin = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get(_t, prop) {
    return (getSupabaseAdmin() as unknown as Record<string | symbol, unknown>)[prop]
  },
})
