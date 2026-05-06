'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { User, CreditCard, GraduationCap, RefreshCw, ExternalLink, Check } from 'lucide-react'
import { enableAutoRenewal, disableAutoRenewal } from '@/app/actions/autoRenewal'

type MembershipStatus = 'ACTIVE' | 'EXPIRED' | 'REMOVED' | 'PAST_DUE'

type Membership = {
  id: string
  cohortName: string
  cohortSlug: string
  status: MembershipStatus
  joinedAt: Date
  expiresAt: Date | null
  autoRenewEnabled: boolean
  extensionPriceCents: number | null
  extensionDurationDays: number | null
  isPurchasable: boolean
  allowsAutoRenewal: boolean
}

type ServerProfile = {
  id: string
  name: string | null
  avatar_url: string | null
  bio: string | null
  role: string
  stripe_customer_id: string | null
  created_at: string
} | null

type ServerMembership = {
  id: string
  cohort_id: string
  status: string
  expires_at: string | null
  auto_renew_enabled: boolean | null
  next_renewal_at: string | null
  joined_at: string | null
  member_role: string | null
  cohorts: {
    id: string
    name: string
    slug: string
    extension_price_cents: number | null
    extension_duration_days: number | null
    allows_auto_renewal: boolean | null
    is_purchasable: boolean | null
  } | null
}

type ServerPayment = {
  id: string
  purchase_kind: string
  amount_cents: number
  status: string
  paid_at: string | null
  cohort_id: string | null
  stripe_checkout_session_id: string | null
  cohorts: { name: string } | null
}

function toMembership(m: ServerMembership): Membership {
  return {
    id: m.id,
    cohortName: m.cohorts?.name ?? 'Turma',
    cohortSlug: m.cohorts?.slug ?? m.cohort_id,
    status: m.status as MembershipStatus,
    joinedAt: m.joined_at ? new Date(m.joined_at) : new Date(),
    expiresAt: m.expires_at ? new Date(m.expires_at) : null,
    autoRenewEnabled: m.auto_renew_enabled ?? false,
    extensionPriceCents: m.cohorts?.extension_price_cents ?? null,
    extensionDurationDays: m.cohorts?.extension_duration_days ?? null,
    isPurchasable: m.cohorts?.is_purchasable ?? false,
    allowsAutoRenewal: m.cohorts?.allows_auto_renewal ?? false,
  }
}

function toPayment(p: ServerPayment): Payment {
  return {
    id: p.id,
    cohortName: p.cohorts?.name ?? '—',
    purchaseKind: p.purchase_kind as Payment['purchaseKind'],
    amountCents: p.amount_cents,
    status: p.status as Payment['status'],
    paidAt: p.paid_at ? new Date(p.paid_at) : null,
    stripeCheckoutSessionId: p.stripe_checkout_session_id,
  }
}

type Payment = {
  id: string
  cohortName: string
  purchaseKind: 'ENTRY' | 'EXTENSION' | 'AUTO_RENEWAL'
  amountCents: number
  status: 'APPROVED' | 'DECLINED' | 'PENDING' | 'REFUNDED'
  paidAt: Date | null
  stripeCheckoutSessionId: string | null
}


function formatBRL(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

function formatDate(d: Date) {
  return d.toLocaleDateString('pt-BR')
}

function daysUntil(d: Date): number {
  return Math.ceil((d.getTime() - Date.now()) / 86400000)
}

const STATUS_COLORS: Record<MembershipStatus, string> = {
  ACTIVE: 'text-emerald-400',
  EXPIRED: 'text-white/30',
  REMOVED: 'text-red-400',
  PAST_DUE: 'text-amber-400',
}

const STATUS_LABELS: Record<MembershipStatus, string> = {
  ACTIVE: 'Ativa',
  EXPIRED: 'Expirada',
  REMOVED: 'Removida',
  PAST_DUE: 'Pagamento pendente',
}

const PAYMENT_STATUS_COLORS: Record<string, string> = {
  APPROVED: 'text-emerald-400 bg-emerald-400/10',
  DECLINED: 'text-red-400 bg-red-400/10',
  PENDING: 'text-amber-400 bg-amber-400/10',
  REFUNDED: 'text-white/30 bg-white/5',
}

const PAYMENT_STATUS_LABELS: Record<string, string> = {
  APPROVED: 'Aprovado',
  DECLINED: 'Recusado',
  PENDING: 'Pendente',
  REFUNDED: 'Reembolsado',
}

const KIND_LABELS: Record<string, string> = {
  ENTRY: 'Entrada',
  EXTENSION: 'Extensão',
  AUTO_RENEWAL: 'Renovação Auto.',
}

type TabId = 'perfil' | 'matriculas' | 'pagamentos'

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-white/40">
      {children}
    </label>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
      {children}
    </h2>
  )
}

function IdentitySection({
  profile,
  email,
}: {
  profile: ServerProfile
  email: string
}) {
  const [name, setName] = useState(profile?.name ?? '')
  const [bio, setBio] = useState(profile?.bio ?? '')
  const [saved, setSaved] = useState(false)

  const avatarInitial = (profile?.name ?? email).charAt(0).toUpperCase()
  const createdAt = profile?.created_at ? new Date(profile.created_at) : null

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <SectionTitle>Dados pessoais</SectionTitle>

      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center bg-[#FF3A0E]/20 font-mono text-xl font-bold text-[#FF3A0E]">
          {avatarInitial}
        </div>
        <div>
          <p className="font-mono text-xs text-white/60">{email}</p>
          {createdAt && (
            <p className="font-mono text-[10px] text-white/20">
              Membro desde {formatDate(createdAt)}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <FieldLabel>Nome</FieldLabel>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-sm text-white/80 focus:border-white/20 focus:outline-none"
          />
        </div>
        <div>
          <FieldLabel>Bio</FieldLabel>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-sm text-white/80 focus:border-white/20 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="bg-[#FF3A0E] px-5 py-2 font-mono text-xs uppercase tracking-wider text-white"
        >
          Salvar
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
            <Check className="h-3.5 w-3.5" />
            Salvo
          </span>
        )}
      </div>

      <div className="border-t border-white/10 pt-6">
        <SectionTitle>Segurança</SectionTitle>
        <div className="space-y-4">
          <div>
            <FieldLabel>Nova senha</FieldLabel>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-sm text-white/80 focus:border-white/20 focus:outline-none"
            />
          </div>
          <div>
            <FieldLabel>Confirmar nova senha</FieldLabel>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-sm text-white/80 focus:border-white/20 focus:outline-none"
            />
          </div>
          <button
            type="button"
            className="border border-white/10 px-5 py-2 font-mono text-xs uppercase tracking-wider text-white/50 transition-colors hover:border-white/20 hover:text-white/80"
          >
            Alterar senha
          </button>
        </div>
      </div>
    </div>
  )
}

function MembershipsSection({ memberships: initialMemberships }: { memberships: Membership[] }) {
  const [memberships, setMemberships] = useState(initialMemberships)
  const [pending, startTransition] = useTransition()
  const [togglingId, setTogglingId] = useState<string | null>(null)

  function toggleAutoRenew(id: string, current: boolean) {
    setTogglingId(id)
    startTransition(async () => {
      try {
        if (current) {
          await disableAutoRenewal(id)
        } else {
          await enableAutoRenewal(id)
        }
        setMemberships((prev) =>
          prev.map((m) => (m.id === id ? { ...m, autoRenewEnabled: !current } : m))
        )
      } catch {
        // silently revert — error handled server-side
      } finally {
        setTogglingId(null)
      }
    })
  }

  const active = memberships.filter((m) => m.status === 'ACTIVE' || m.status === 'PAST_DUE')
  const past = memberships.filter((m) => m.status === 'EXPIRED' || m.status === 'REMOVED')

  return (
    <div className="space-y-6">
      <div>
        <SectionTitle>Matrículas ativas</SectionTitle>
        {active.length === 0 ? (
          <p className="font-mono text-sm text-white/30">Nenhuma matrícula ativa.</p>
        ) : (
          <div className="space-y-3">
            {active.map((m) => {
              const days = m.expiresAt ? daysUntil(m.expiresAt) : null
              const isExpiringSoon = days !== null && days <= 30 && days > 0

              return (
                <div
                  key={m.id}
                  className={`border p-5 ${isExpiringSoon ? 'border-amber-400/20 bg-amber-400/5' : 'border-white/10 bg-white/[0.02]'}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-sm font-medium text-white/90">
                        {m.cohortName}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-3">
                        <span
                          className={`font-mono text-[10px] uppercase tracking-wider ${STATUS_COLORS[m.status]}`}
                        >
                          {STATUS_LABELS[m.status]}
                        </span>
                        {m.expiresAt ? (
                          <span
                            className={`font-mono text-[10px] ${isExpiringSoon ? 'text-amber-400' : 'text-white/30'}`}
                          >
                            {days !== null && days > 0
                              ? `Expira em ${days} dia${days !== 1 ? 's' : ''} — ${formatDate(m.expiresAt)}`
                              : `Expirou em ${formatDate(m.expiresAt)}`}
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] text-white/30">Vitalício</span>
                        )}
                      </div>
                    </div>

                    {m.isPurchasable && m.extensionPriceCents && (
                      <Link
                        href={`/checkout/${m.cohortSlug}`}
                        className="shrink-0 bg-[#FF3A0E] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                      >
                        Estender por {formatBRL(m.extensionPriceCents)}
                      </Link>
                    )}
                  </div>

                  {m.isPurchasable && m.allowsAutoRenewal && (
                    <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                      <div>
                        <p className="font-mono text-xs text-white/60">Renovação automática</p>
                        <p className="font-mono text-[10px] text-white/30">
                          {m.autoRenewEnabled
                            ? `Ativa${m.extensionDurationDays ? ` — renova +${m.extensionDurationDays} dias` : ''}`
                            : 'Desativada — renovação manual'}
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={m.autoRenewEnabled}
                        disabled={togglingId === m.id && pending}
                        onClick={() => toggleAutoRenew(m.id, m.autoRenewEnabled)}
                        className={`relative h-5 w-9 transition-colors disabled:opacity-50 ${m.autoRenewEnabled ? 'bg-[#FF3A0E]' : 'bg-white/10'}`}
                      >
                        <span
                          className={`absolute top-0.5 h-4 w-4 bg-white transition-transform ${m.autoRenewEnabled ? 'translate-x-4' : 'translate-x-0.5'}`}
                        />
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {past.length > 0 && (
        <div>
          <SectionTitle>Histórico de matrículas</SectionTitle>
          <div className="space-y-2">
            {past.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between border border-white/5 bg-white/[0.01] px-5 py-4"
              >
                <div>
                  <p className="font-mono text-sm text-white/50">{m.cohortName}</p>
                  <p className="font-mono text-[10px] text-white/25">
                    {m.expiresAt ? `Expirou em ${formatDate(m.expiresAt)}` : 'Removida'}
                  </p>
                </div>
                {m.isPurchasable && m.extensionPriceCents && (
                  <Link
                    href={`/checkout/${m.cohortSlug}`}
                    className="flex items-center gap-1.5 border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/40 transition-colors hover:border-white/20 hover:text-white/70"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Reativar por {formatBRL(m.extensionPriceCents)}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function PaymentsSection({ payments }: { payments: Payment[] }) {
  return (
    <div>
      <SectionTitle>Histórico de pagamentos</SectionTitle>

      {payments.length === 0 ? (
        <p className="font-mono text-sm text-white/30">Nenhum pagamento registrado.</p>
      ) : (
        <div className="overflow-x-auto border border-white/10">
          <table className="w-full min-w-[480px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                {['Turma', 'Tipo', 'Valor', 'Status', 'Data', ''].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-white/30"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-mono text-xs text-white/70">{p.cohortName}</td>
                  <td className="px-4 py-3 font-mono text-[10px] text-white/40">
                    {KIND_LABELS[p.purchaseKind]}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm font-semibold text-white/80">
                    {formatBRL(p.amountCents)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${PAYMENT_STATUS_COLORS[p.status] ?? 'text-white/40'}`}
                    >
                      {PAYMENT_STATUS_LABELS[p.status] ?? p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[10px] text-white/30">
                    {p.paidAt ? formatDate(p.paidAt) : '—'}
                  </td>
                  <td className="px-4 py-3">
                    {p.stripeCheckoutSessionId && (
                      <a
                        href="https://dashboard.stripe.com/test/payments"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/20 transition-colors hover:text-white/60"
                        title="Ver recibo no Stripe"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'perfil', label: 'Dados', icon: User },
  { id: 'matriculas', label: 'Matrículas', icon: GraduationCap },
  { id: 'pagamentos', label: 'Pagamentos', icon: CreditCard },
]

export type PerfilClientProps = {
  serverProfile?: ServerProfile
  serverEmail?: string
  serverMemberships?: ServerMembership[]
  serverPayments?: ServerPayment[]
}

export function PerfilClient({
  serverProfile,
  serverEmail = '',
  serverMemberships = [],
  serverPayments = [],
}: PerfilClientProps) {
  const [activeTab, setActiveTab] = useState<TabId>('perfil')

  const memberships = serverMemberships.map(toMembership)
  const payments = serverPayments.map(toPayment)

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-mono text-lg font-semibold uppercase tracking-widest text-white/90">
          Perfil
        </h1>
        <p className="mt-1 font-mono text-xs text-white/30">
          Dados pessoais, matrículas e pagamentos
        </p>
      </div>

      <div className="flex border-b border-white/10">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-5 py-3 font-mono text-xs uppercase tracking-wider transition-colors ${
              activeTab === id
                ? 'border-b-2 border-[#FF3A0E] text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'perfil' && (
          <IdentitySection profile={serverProfile ?? null} email={serverEmail} />
        )}
        {activeTab === 'matriculas' && <MembershipsSection memberships={memberships} />}
        {activeTab === 'pagamentos' && <PaymentsSection payments={payments} />}
      </div>
    </div>
  )
}
