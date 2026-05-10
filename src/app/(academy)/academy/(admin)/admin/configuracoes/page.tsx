import type { Metadata } from 'next'
import { getSetting } from './actions'
import { ConfiguracoesClient } from './ConfiguracoesClient'

export const metadata: Metadata = { title: 'Configurações' }

export default async function ConfiguracoesPage() {
  const crmWebhookUrl = await getSetting('crm_webhook_url')

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-1">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
          Admin
        </span>
        <h1 className="font-[family-name:var(--type-display)] text-4xl italic font-light text-[var(--bone)]">
          Configurações
        </h1>
      </div>

      <ConfiguracoesClient currentUrl={crmWebhookUrl} />
    </div>
  )
}
