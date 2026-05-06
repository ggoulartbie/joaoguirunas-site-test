'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { RefreshCw, ExternalLink, Check } from 'lucide-react'
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
  EXPIRED: 'text-[#84848c]',
  REMOVED: 'text-[#ff3a0e]',
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
  DECLINED: 'text-[#ff3a0e] bg-[#ff3a0e]/10',
  PENDING: 'text-amber-400 bg-amber-400/10',
  REFUNDED: 'text-[#84848c] bg-white/5',
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

function MonoLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-[#84848c]">
      {children}
    </label>
  )
}

function SectionDividerLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-widest text-[#84848c]">{children}</p>
  )
}

function ProfileHeader({
  profile,
  email,
}: {
  profile: ServerProfile
  email: string
}) {
  const avatarInitial = (profile?.name ?? email).charAt(0).toUpperCase()

  return (
    <div className="border border-[rgba(255,255,255,0.07)] bg-[#0e0e11] p-6">
      <div className="flex items-center gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#ff3a0e]/20">
          <span className="font-mono text-2xl uppercase text-[#ff3a0e]">{avatarInitial}</span>
        </div>
        <div className="min-w-0">
          {profile?.name && (
            <p
              className="truncate font-[family-name:var(--type-display)] text-[28px] italic leading-tight text-[#f1f1f3]"
              style={{ fontFamily: 'var(--type-display, serif)' }}
            >
              {profile.name}
            </p>
          )}
          <p className="mt-0.5 font-mono text-[12px] text-[#84848c]">{email}</p>
          {profile?.bio && (
            <p className="mt-2 font-[family-name:var(--type-sans)] text-sm text-[#c5c5ca]">
              {profile.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function EditProfileForm({
  profile,
  email,
}: {
  profile: ServerProfile
  email: string
}) {
  const [name, setName] = useState(profile?.name ?? '')
  const [bio, setBio] = useState(profile?.bio ?? '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [profileSaved, setProfileSaved] = useState(false)
  const [profileError, setProfileError] = useState('')
  const [passwordSaved, setPasswordSaved] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  function handleSaveProfile() {
    if (!name.trim()) {
      setProfileError('Nome não pode estar vazio.')
      return
    }
    setProfileError('')
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2500)
  }

  function handleChangePassword() {
    if (!currentPassword) {
      setPasswordError('Informe a senha atual.')
      return
    }
    if (newPassword.length < 8) {
      setPasswordError('Nova senha deve ter ao menos 8 caracteres.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('As senhas não coincidem.')
      return
    }
    setPasswordError('')
    setPasswordSaved(true)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setTimeout(() => setPasswordSaved(false), 2500)
  }

  const inputClass =
    'w-full border border-[rgba(255,255,255,0.16)] bg-[#16161a] p-3 font-mono text-sm text-[#f1f1f3] outline-none transition-colors focus:border-[#ff3a0e]'

  return (
    <div className="mt-4 border border-[rgba(255,255,255,0.07)] bg-[#0e0e11] p-6">
      <SectionDividerLabel>Editar perfil</SectionDividerLabel>

      <div className="mt-4 space-y-4">
        <div>
          <MonoLabel>Nome</MonoLabel>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <MonoLabel>Bio</MonoLabel>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className={`${inputClass} min-h-24 resize-y`}
          />
        </div>

        {profileError && (
          <div className="border border-[#ff3a0e]/20 bg-[#ff3a0e]/10 p-3">
            <p className="font-mono text-[12px] text-[#ff3a0e]">{profileError}</p>
          </div>
        )}

        {profileSaved && (
          <div className="border border-green-500/20 bg-green-500/10 p-3">
            <p className="flex items-center gap-2 font-mono text-[12px] text-green-400">
              <Check className="h-3.5 w-3.5" />
              Perfil salvo com sucesso.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleSaveProfile}
          className="mt-2 bg-[#ff3a0e] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#050507]"
        >
          Salvar perfil
        </button>
      </div>

      <div className="mt-6 border-t border-[rgba(255,255,255,0.07)] pt-6">
        <SectionDividerLabel>Alterar senha</SectionDividerLabel>

        <div className="mt-4 space-y-4">
          <div>
            <MonoLabel>Senha atual</MonoLabel>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          <div>
            <MonoLabel>Nova senha</MonoLabel>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          <div>
            <MonoLabel>Confirmar nova senha</MonoLabel>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          {passwordError && (
            <div className="border border-[#ff3a0e]/20 bg-[#ff3a0e]/10 p-3">
              <p className="font-mono text-[12px] text-[#ff3a0e]">{passwordError}</p>
            </div>
          )}

          {passwordSaved && (
            <div className="border border-green-500/20 bg-green-500/10 p-3">
              <p className="flex items-center gap-2 font-mono text-[12px] text-green-400">
                <Check className="h-3.5 w-3.5" />
                Senha alterada com sucesso.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={handleChangePassword}
            className="bg-[#ff3a0e] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#050507]"
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

  if (memberships.length === 0) return null

  return (
    <div className="mt-4 border border-[rgba(255,255,255,0.07)] bg-[#0e0e11] p-6">
      <SectionDividerLabel>Minhas turmas</SectionDividerLabel>

      {active.length > 0 && (
        <div className="mt-4 space-y-3">
          {active.map((m) => {
            const days = m.expiresAt ? daysUntil(m.expiresAt) : null
            const isExpiringSoon = days !== null && days <= 30 && days > 0

            return (
              <div
                key={m.id}
                className={`border p-4 ${
                  isExpiringSoon
                    ? 'border-amber-400/20 bg-amber-400/5'
                    : 'border-[rgba(255,255,255,0.07)] bg-[#16161a]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm font-medium text-[#f1f1f3]">{m.cohortName}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-3">
                      <span
                        className={`font-mono text-[10px] uppercase tracking-wider ${STATUS_COLORS[m.status]}`}
                      >
                        {STATUS_LABELS[m.status]}
                      </span>
                      {m.expiresAt ? (
                        <span
                          className={`font-mono text-[10px] ${isExpiringSoon ? 'text-amber-400' : 'text-[#84848c]'}`}
                        >
                          {days !== null && days > 0
                            ? `Expira em ${days} dia${days !== 1 ? 's' : ''} — ${formatDate(m.expiresAt)}`
                            : `Expirou em ${formatDate(m.expiresAt)}`}
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] text-[#84848c]">Vitalício</span>
                      )}
                    </div>
                  </div>

                  {m.isPurchasable && m.extensionPriceCents && (
                    <Link
                      href={`/checkout/${m.cohortSlug}`}
                      className="shrink-0 bg-[#ff3a0e] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[#050507] transition-opacity hover:opacity-90"
                    >
                      Estender por {formatBRL(m.extensionPriceCents)}
                    </Link>
                  )}
                </div>

                {m.isPurchasable && m.allowsAutoRenewal && (
                  <div className="mt-3 flex items-center justify-between border-t border-[rgba(255,255,255,0.07)] pt-3">
                    <div>
                      <p className="font-mono text-xs text-[#c5c5ca]">Renovação automática</p>
                      <p className="font-mono text-[10px] text-[#84848c]">
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
                      className={`relative h-5 w-9 transition-colors disabled:opacity-50 ${m.autoRenewEnabled ? 'bg-[#ff3a0e]' : 'bg-[rgba(255,255,255,0.1)]'}`}
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

      {past.length > 0 && (
        <div className={active.length > 0 ? 'mt-4' : 'mt-4'}>
          {active.length > 0 && (
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#84848c]">
              Histórico
            </p>
          )}
          <div className="space-y-2">
            {past.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between border border-[rgba(255,255,255,0.07)] bg-[#16161a] px-4 py-3"
              >
                <div>
                  <p className="font-mono text-sm text-[#84848c]">{m.cohortName}</p>
                  <p className="font-mono text-[10px] text-[#84848c]/60">
                    {m.expiresAt ? `Expirou em ${formatDate(m.expiresAt)}` : 'Removida'}
                  </p>
                </div>
                {m.isPurchasable && m.extensionPriceCents && (
                  <Link
                    href={`/checkout/${m.cohortSlug}`}
                    className="flex items-center gap-1.5 border border-[rgba(255,255,255,0.16)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[#84848c] transition-colors hover:border-[rgba(255,255,255,0.3)] hover:text-[#c5c5ca]"
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
  if (payments.length === 0) return null

  return (
    <div className="mt-4 border border-[rgba(255,255,255,0.07)] bg-[#0e0e11] p-6">
      <SectionDividerLabel>Histórico de pagamentos</SectionDividerLabel>

      <div className="mt-4 overflow-x-auto border border-[rgba(255,255,255,0.07)]">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.07)] bg-[#16161a]">
              {['Turma', 'Tipo', 'Valor', 'Status', 'Data', ''].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-[#84848c]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,255,255,0.07)]">
            {payments.map((p) => (
              <tr key={p.id} className="transition-colors hover:bg-[#16161a]">
                <td className="px-4 py-3 font-mono text-xs text-[#c5c5ca]">{p.cohortName}</td>
                <td className="px-4 py-3 font-mono text-[10px] text-[#84848c]">
                  {KIND_LABELS[p.purchaseKind]}
                </td>
                <td className="px-4 py-3 font-mono text-sm font-semibold text-[#f1f1f3]">
                  {formatBRL(p.amountCents)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${PAYMENT_STATUS_COLORS[p.status] ?? 'text-[#84848c]'}`}
                  >
                    {PAYMENT_STATUS_LABELS[p.status] ?? p.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-[10px] text-[#84848c]">
                  {p.paidAt ? formatDate(p.paidAt) : '—'}
                </td>
                <td className="px-4 py-3">
                  {p.stripeCheckoutSessionId && (
                    <a
                      href="https://dashboard.stripe.com/test/payments"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#84848c] transition-colors hover:text-[#c5c5ca]"
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
    </div>
  )
}

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
  const memberships = serverMemberships.map(toMembership)
  const payments = serverPayments.map(toPayment)

  return (
    <div className="mx-auto max-w-2xl">
      <ProfileHeader profile={serverProfile ?? null} email={serverEmail} />
      <EditProfileForm profile={serverProfile ?? null} email={serverEmail} />
      <MembershipsSection memberships={memberships} />
      <PaymentsSection payments={payments} />
    </div>
  )
}
