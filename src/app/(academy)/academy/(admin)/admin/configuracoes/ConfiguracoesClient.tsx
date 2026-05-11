'use client'

import { useActionState } from 'react'
import { saveSetting } from './actions'
import { Save } from 'lucide-react'

const PAYLOAD_EXAMPLE = JSON.stringify(
  {
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '11999999999',
    cohort_slug: 'turma-1',
    cohort_name: 'Turma 1 — Growth Sales',
    source: 'checkout',
    timestamp: '2026-05-10T12:00:00.000Z',
  },
  null,
  2
)

type State = { ok?: boolean; error?: string } | null

async function saveWebhookAction(
  _prev: State,
  formData: FormData
): Promise<State> {
  const url = (formData.get('crm_webhook_url') as string | null)?.trim() ?? ''
  return saveSetting('crm_webhook_url', url)
}

async function saveWebhookPaymentApprovedAction(
  _prev: State,
  formData: FormData
): Promise<State> {
  const url = (formData.get('crm_webhook_payment_approved') as string | null)?.trim() ?? ''
  return saveSetting('crm_webhook_payment_approved', url)
}

async function saveWebhookPaymentDeclinedAction(
  _prev: State,
  formData: FormData
): Promise<State> {
  const url = (formData.get('crm_webhook_payment_declined') as string | null)?.trim() ?? ''
  return saveSetting('crm_webhook_payment_declined', url)
}

interface Props {
  currentUrl: string | null
  currentPaymentApprovedUrl: string | null
  currentPaymentDeclinedUrl: string | null
}

function WebhookField({
  id,
  label,
  defaultValue,
  placeholder,
  actionFn,
}: {
  id: string
  label: string
  defaultValue: string
  placeholder: string
  actionFn: (prev: State, formData: FormData) => Promise<State>
}) {
  const [state, formAction, isPending] = useActionState(actionFn, null)

  return (
    <form action={formAction} className="space-y-4 max-w-xl">
      <div className="space-y-1.5">
        <label
          htmlFor={id}
          className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]"
        >
          {label}
        </label>
        <input
          id={id}
          name={id}
          type="url"
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="w-full px-4 py-3 font-mono text-[13px] outline-none"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff',
            borderRadius: 0,
          }}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 px-6 py-3 font-mono text-[11px] uppercase tracking-wider transition-all hover:brightness-110 disabled:opacity-60"
        style={{ background: 'var(--ember)', color: '#050507', borderRadius: 0 }}
      >
        <Save size={13} />
        {isPending ? 'Salvando...' : 'Salvar'}
      </button>

      {state?.ok && (
        <p className="font-mono text-[11px] text-emerald-400">✓ Salvo com sucesso.</p>
      )}
      {state?.error && (
        <p className="font-mono text-[11px] text-[var(--ember)]">⚠ {state.error}</p>
      )}
    </form>
  )
}

export function ConfiguracoesClient({ currentUrl, currentPaymentApprovedUrl, currentPaymentDeclinedUrl }: Props) {
  const [state, formAction, isPending] = useActionState(saveWebhookAction, null)

  return (
    <div className="space-y-10">

      {/* CRM Webhook — Lead Capturado */}
      <section className="space-y-4">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--bone-mute)]">
            Webhook CRM
          </h2>
          <p className="mt-1 font-sans text-sm text-[var(--bone-dim)]">
            Disparado no momento do checkout (antes do pagamento) — captura leads inclusive abandonados.
          </p>
        </div>

        <form action={formAction} className="space-y-4 max-w-xl">
          <div className="space-y-1.5">
            <label
              htmlFor="crm_webhook_url"
              className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]"
            >
              URL do Webhook
            </label>
            <input
              id="crm_webhook_url"
              name="crm_webhook_url"
              type="url"
              defaultValue={currentUrl ?? ''}
              placeholder="https://seu-crm.com/webhook/leads"
              className="w-full px-4 py-3 font-mono text-[13px] outline-none"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                borderRadius: 0,
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 px-6 py-3 font-mono text-[11px] uppercase tracking-wider transition-all hover:brightness-110 disabled:opacity-60"
            style={{ background: 'var(--ember)', color: '#050507', borderRadius: 0 }}
          >
            <Save size={13} />
            {isPending ? 'Salvando...' : 'Salvar'}
          </button>

          {state?.ok && (
            <p className="font-mono text-[11px] text-emerald-400">✓ Salvo com sucesso.</p>
          )}
          {state?.error && (
            <p className="font-mono text-[11px] text-[var(--ember)]">⚠ {state.error}</p>
          )}
        </form>
      </section>

      {/* Webhook: Pagamento Aprovado */}
      <section className="space-y-4">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--bone-mute)]">
            Webhook: Pagamento Aprovado
          </h2>
          <p className="mt-1 font-sans text-sm text-[var(--bone-dim)]">
            Disparado quando o pagamento é confirmado — use para criar o contato no CRM e liberar acesso.
          </p>
        </div>

        <WebhookField
          id="crm_webhook_payment_approved"
          label="URL do Webhook"
          defaultValue={currentPaymentApprovedUrl ?? ''}
          placeholder="https://... (disparado quando pagamento é confirmado)"
          actionFn={saveWebhookPaymentApprovedAction}
        />
      </section>

      {/* Webhook: Pagamento Recusado */}
      <section className="space-y-4">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--bone-mute)]">
            Webhook: Pagamento Recusado
          </h2>
          <p className="mt-1 font-sans text-sm text-[var(--bone-dim)]">
            Disparado quando o pagamento é recusado — use para acionar régua de recuperação no CRM.
          </p>
        </div>

        <WebhookField
          id="crm_webhook_payment_declined"
          label="URL do Webhook"
          defaultValue={currentPaymentDeclinedUrl ?? ''}
          placeholder="https://... (disparado quando pagamento é recusado)"
          actionFn={saveWebhookPaymentDeclinedAction}
        />
      </section>

      {/* Payload reference */}
      <section className="space-y-3">
        <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--bone-mute)]">
          Payload enviado (POST JSON)
        </h2>
        <pre
          className="overflow-x-auto p-5 font-mono text-[12px] leading-relaxed text-[var(--bone-dim)]"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 0,
          }}
        >
          {PAYLOAD_EXAMPLE}
        </pre>
        <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)]">
          Método: POST · Content-Type: application/json · Fire-and-forget (não bloqueia o checkout)
        </p>
      </section>

    </div>
  )
}
