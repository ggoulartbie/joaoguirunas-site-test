'use client'

import { useState, useTransition } from 'react'
import { ChevronDown, X } from 'lucide-react'
import {
  updateUserRole,
  banUser,
  unbanUser,
  grantCohortAccess,
  extendMembership,
  createStudentManually,
} from './actions'

type Membership = {
  id: string
  cohort_id: string
  member_role: string
  status: string
  expires_at: string | null
  cohortName: string
}

type UserRow = {
  id: string
  name: string
  avatar_url: string | null
  bio: string | null
  role: string
  stripe_customer_id: string | null
  created_at: string
  updated_at: string
  email: string
  isBanned: boolean
  memberships: Membership[]
}

type CohortOption = { id: string; name: string }

const ROLE_LABELS: Record<string, string> = {
  STUDENT: 'Aluno',
  MENTOR: 'Mentor',
  SUPPORT: 'Suporte',
  ADMIN: 'Admin',
}

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: 'text-emerald-400',
  EXPIRED: 'text-[var(--bone-mute)]',
  REMOVED: 'text-[var(--ember)]',
  PAST_DUE: 'text-amber-400',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR')
}

function avatarInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function RoleBadge({ role }: { role: string }) {
  if (role === 'ADMIN') {
    return (
      <span className="border border-[var(--ember)] bg-[var(--ember)]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[var(--ember)]">
        {ROLE_LABELS[role] ?? role}
      </span>
    )
  }
  return (
    <span className="border border-[rgba(255,255,255,0.07)] bg-transparent px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[var(--bone-mute)]">
      {ROLE_LABELS[role] ?? role}
    </span>
  )
}

function UserProfileModal({
  user,
  cohorts,
  onClose,
  onUpdate,
}: {
  user: UserRow
  cohorts: CohortOption[]
  onClose: () => void
  onUpdate: (updated: Partial<UserRow>) => void
}) {
  const [role, setRole] = useState(user.role)
  const [grantCohortId, setGrantCohortId] = useState('')
  const [grantExpiresAt, setGrantExpiresAt] = useState('')
  const [extendDates, setExtendDates] = useState<Record<string, string>>({})
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleError(e: unknown) {
    setError(e instanceof Error ? e.message : 'Erro desconhecido')
  }

  function handleUpdateRole() {
    setError(null)
    startTransition(async () => {
      try {
        await updateUserRole(user.id, role)
        onUpdate({ role })
      } catch (e) {
        handleError(e)
      }
    })
  }

  function handleBan() {
    setError(null)
    startTransition(async () => {
      try {
        await banUser(user.id)
        onUpdate({ isBanned: true })
      } catch (e) {
        handleError(e)
      }
    })
  }

  function handleUnban() {
    setError(null)
    startTransition(async () => {
      try {
        await unbanUser(user.id)
        onUpdate({ isBanned: false })
      } catch (e) {
        handleError(e)
      }
    })
  }

  function handleGrantAccess() {
    if (!grantCohortId) return
    setError(null)
    startTransition(async () => {
      try {
        await grantCohortAccess(user.id, grantCohortId, grantExpiresAt || undefined)
        setGrantCohortId('')
        setGrantExpiresAt('')
      } catch (e) {
        handleError(e)
      }
    })
  }

  function handleExtend(memberId: string) {
    const newDate = extendDates[memberId]
    if (!newDate) return
    setError(null)
    startTransition(async () => {
      try {
        await extendMembership(memberId, newDate)
        setExtendDates((prev) => {
          const next = { ...prev }
          delete next[memberId]
          return next
        })
      } catch (e) {
        handleError(e)
      }
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 pt-16">
      <div className="w-full max-w-2xl border border-[rgba(255,255,255,0.07)] bg-[var(--ink)]">
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.07)] px-6 py-4">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--bone)]">
            Perfil — {user.name}
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--bone-mute)] transition-colors hover:text-[var(--bone)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="divide-y divide-[rgba(255,255,255,0.07)] p-6">
          {error && (
            <div className="mb-4 border border-[var(--ember)]/40 bg-[var(--ember)]/10 px-4 py-2 font-mono text-xs text-[var(--ember)]">
              {error}
            </div>
          )}

          <div className="pb-5">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)]">
              Identidade
            </p>
            <div className="grid gap-2 md:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] text-[var(--bone-mute)]">ID</p>
                <p className="font-mono text-xs text-[var(--bone-dim)]">{user.id}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-[var(--bone-mute)]">Email</p>
                <p className="font-mono text-xs text-[var(--bone-dim)]">{user.email}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-[var(--bone-mute)]">Cadastro</p>
                <p className="font-mono text-xs text-[var(--bone-dim)]">{formatDate(user.created_at)}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-[var(--bone-mute)]">Stripe Customer</p>
                <p className="font-mono text-xs text-[var(--bone-dim)]">
                  {user.stripe_customer_id ?? '—'}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-[var(--bone-mute)]">Status</p>
                <p className={`font-mono text-xs ${user.isBanned ? 'text-[var(--ember)]' : 'text-emerald-400'}`}>
                  {user.isBanned ? 'Banido' : 'Ativo'}
                </p>
              </div>
            </div>
          </div>

          <div className="py-5">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)]">
              Papel
            </p>
            <div className="flex items-center gap-3">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border border-[rgba(255,255,255,0.16)] bg-[var(--ink-2)] px-3 py-2 font-mono text-xs text-[var(--bone-dim)] focus:outline-none"
              >
                {Object.entries(ROLE_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
              <button
                type="button"
                disabled={isPending || role === user.role}
                className="bg-[var(--ember)] px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-white disabled:opacity-40"
                onClick={handleUpdateRole}
              >
                Atualizar
              </button>
            </div>
          </div>

          <div className="py-5">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)]">
              Matrículas
            </p>
            {!user.memberships?.length ? (
              <p className="font-mono text-xs text-[var(--bone-mute)]">Nenhuma matrícula</p>
            ) : (
              <div className="space-y-2">
                {user.memberships.map((m) => (
                  <div
                    key={m.id}
                    className="border border-[rgba(255,255,255,0.07)] px-4 py-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-mono text-xs text-[var(--bone)]">{m.cohortName}</p>
                        <p className="font-mono text-[10px] text-[var(--bone-mute)]">
                          Expira: {m.expires_at ? formatDate(m.expires_at) : 'Vitalício'}
                        </p>
                      </div>
                      <span
                        className={`font-mono text-[10px] ${STATUS_COLORS[m.status] ?? 'text-[var(--bone-mute)]'}`}
                      >
                        {m.status}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="date"
                        value={extendDates[m.id] ?? ''}
                        onChange={(e) =>
                          setExtendDates((prev) => ({ ...prev, [m.id]: e.target.value }))
                        }
                        className="border border-[rgba(255,255,255,0.16)] bg-[var(--ink-2)] px-2 py-1 font-mono text-[10px] text-[var(--bone-dim)] focus:outline-none"
                      />
                      <button
                        type="button"
                        disabled={isPending || !extendDates[m.id]}
                        onClick={() => handleExtend(m.id)}
                        className="border border-[rgba(255,255,255,0.07)] px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-[var(--bone-mute)] hover:text-[var(--bone-dim)] disabled:opacity-40"
                      >
                        Estender
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)]">
                Conceder acesso manual
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={grantCohortId}
                  onChange={(e) => setGrantCohortId(e.target.value)}
                  className="border border-[rgba(255,255,255,0.16)] bg-[var(--ink-2)] px-3 py-2 font-mono text-[10px] text-[var(--bone-mute)] focus:outline-none"
                >
                  <option value="">Selecionar turma...</option>
                  {cohorts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={grantExpiresAt}
                  onChange={(e) => setGrantExpiresAt(e.target.value)}
                  className="border border-[rgba(255,255,255,0.16)] bg-[var(--ink-2)] px-2 py-1.5 font-mono text-[10px] text-[var(--bone-dim)] focus:outline-none"
                />
                <button
                  type="button"
                  disabled={isPending || !grantCohortId}
                  onClick={handleGrantAccess}
                  className="border border-[rgba(255,255,255,0.07)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)] transition-colors hover:border-[rgba(255,255,255,0.16)] hover:text-[var(--bone-dim)] disabled:opacity-40"
                >
                  Conceder
                </button>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)]">
              Ações
            </p>
            <div className="flex flex-wrap gap-2">
              {user.isBanned ? (
                <button
                  type="button"
                  disabled={isPending}
                  onClick={handleUnban}
                  className="border border-emerald-400/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-emerald-400 transition-colors hover:bg-emerald-400/10 disabled:opacity-40"
                >
                  Desbanir conta
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isPending}
                  onClick={handleBan}
                  className="border border-[var(--ember)]/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--ember)] transition-colors hover:bg-[var(--ember)]/10 disabled:opacity-40"
                >
                  Banir conta
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CreateStudentModal({
  cohorts,
  onClose,
  onCreated,
}: {
  cohorts: CohortOption[]
  onClose: () => void
  onCreated: (user: UserRow) => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cohortId, setCohortId] = useState(cohorts[0]?.id ?? '')
  const [role, setRole] = useState<'STUDENT' | 'MENTOR'>('STUDENT')
  const [expiresAt, setExpiresAt] = useState('')
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccessMsg(null)
    startTransition(async () => {
      try {
        const result = await createStudentManually({
          name: name.trim(),
          email: email.trim(),
          cohortId,
          role,
          expiresAt: expiresAt || undefined,
        })
        setSuccessMsg(`Aluno criado e convite enviado para ${result.email}`)
        const newUser: UserRow = {
          id: result.userId,
          name: name.trim(),
          email: result.email,
          avatar_url: null,
          bio: null,
          role,
          stripe_customer_id: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          isBanned: false,
          memberships: [{
            id: crypto.randomUUID(),
            cohort_id: cohortId,
            member_role: role,
            status: 'ACTIVE',
            expires_at: expiresAt || null,
            cohortName: cohorts.find((c) => c.id === cohortId)?.name ?? '—',
          }],
        }
        onCreated(newUser)
        setName('')
        setEmail('')
        setExpiresAt('')
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Erro desconhecido')
      }
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 pt-16">
      <div className="w-full max-w-lg border border-[rgba(255,255,255,0.07)] bg-[var(--ink)]">
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.07)] px-6 py-4">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--bone)]">
            Criar aluno
          </h2>
          <button onClick={onClose} className="text-[var(--bone-mute)] transition-colors hover:text-[var(--bone)]">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {error && (
            <div className="border border-[var(--ember)]/40 bg-[var(--ember)]/10 px-4 py-2 font-mono text-xs text-[var(--ember)]">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 font-mono text-xs text-emerald-400">
              {successMsg}
            </div>
          )}

          <div>
            <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)]">
              Nome completo
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-[rgba(255,255,255,0.16)] bg-[var(--ink-2)] px-3 py-2 font-mono text-xs text-[var(--bone)] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)]">
              Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[rgba(255,255,255,0.16)] bg-[var(--ink-2)] px-3 py-2 font-mono text-xs text-[var(--bone)] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)]">
              Turma
            </label>
            <select
              required
              value={cohortId}
              onChange={(e) => setCohortId(e.target.value)}
              className="w-full border border-[rgba(255,255,255,0.16)] bg-[var(--ink-2)] px-3 py-2 font-mono text-xs text-[var(--bone-mute)] focus:outline-none"
            >
              {cohorts.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)]">
                Papel
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'STUDENT' | 'MENTOR')}
                className="w-full border border-[rgba(255,255,255,0.16)] bg-[var(--ink-2)] px-3 py-2 font-mono text-xs text-[var(--bone-mute)] focus:outline-none"
              >
                <option value="STUDENT">Aluno</option>
                <option value="MENTOR">Mentor</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)]">
                Expira em (opcional)
              </label>
              <input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="w-full border border-[rgba(255,255,255,0.16)] bg-[var(--ink-2)] px-3 py-2 font-mono text-xs text-[var(--bone-dim)] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)] hover:text-[var(--bone-dim)]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="bg-[var(--ember)] px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-white disabled:opacity-40"
            >
              {isPending ? 'Criando...' : 'Criar e enviar convite'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function UsersClient({
  initialUsers,
  cohorts,
}: {
  initialUsers: UserRow[]
  cohorts: CohortOption[]
}) {
  const [users, setUsers] = useState<UserRow[]>(initialUsers)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [cohortFilter, setCohortFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  function handleUserUpdate(userId: string, updated: Partial<UserRow>) {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...updated } : u))
    )
    setSelectedUser((prev) => (prev?.id === userId ? { ...prev, ...updated } : prev))
  }

  const filtered = users.filter((u) => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false
    if (cohortFilter !== 'all') {
      const hasMembership = u.memberships?.some((m) => m.cohort_id === cohortFilter)
      if (!hasMembership) return false
    }
    if (search) {
      const q = search.toLowerCase()
      if (
        !u.name.toLowerCase().includes(q) &&
        !u.email.toLowerCase().includes(q) &&
        !u.id.toLowerCase().includes(q)
      ) {
        return false
      }
    }
    return true
  })

  return (
    <>
      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          cohorts={cohorts}
          onClose={() => setSelectedUser(null)}
          onUpdate={(updated) => handleUserUpdate(selectedUser.id, updated)}
        />
      )}
      {showCreateModal && (
        <CreateStudentModal
          cohorts={cohorts}
          onClose={() => setShowCreateModal(false)}
          onCreated={(newUser) => {
            setUsers((prev) => [newUser, ...prev])
            setShowCreateModal(false)
          }}
        />
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Buscar por nome, email ou ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 border border-[rgba(255,255,255,0.16)] bg-[var(--ink-2)] px-3 py-2 font-mono text-xs text-[var(--bone)] placeholder-[var(--bone-mute)] focus:outline-none"
        />

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)]">Papel:</span>
          {['all', 'STUDENT', 'MENTOR', 'SUPPORT', 'ADMIN'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                roleFilter === r
                  ? 'bg-[var(--ember)] text-white'
                  : 'border border-[rgba(255,255,255,0.07)] text-[var(--bone-mute)] hover:text-[var(--bone-dim)]'
              }`}
            >
              {r === 'all' ? 'Todos' : ROLE_LABELS[r]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)]">Turma:</span>
          <div className="relative">
            <select
              value={cohortFilter}
              onChange={(e) => setCohortFilter(e.target.value)}
              className="appearance-none border border-[rgba(255,255,255,0.16)] bg-[var(--ink-2)] py-2 pl-3 pr-7 font-mono text-[10px] text-[var(--bone-mute)] focus:outline-none"
            >
              <option value="all">Todas</option>
              {cohorts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[var(--bone-mute)]" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="ml-auto bg-[var(--ember)] px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-white hover:opacity-90"
        >
          Criar aluno
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-[rgba(255,255,255,0.07)]">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--ink-2)]">
              {['Usuário', 'Email', 'Papel', 'Turmas', 'Status', 'Criado em', 'Ações'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wide text-[var(--bone-mute)]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr
                key={user.id}
                className="border-b border-[rgba(255,255,255,0.07)] hover:bg-[var(--void)]/40"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--ember)]/20">
                      <span className="font-mono text-[10px] font-semibold text-[var(--ember)]">
                        {avatarInitials(user.name)}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[var(--bone)]">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-[10px] text-[var(--bone-mute)]">
                  {user.email}
                </td>
                <td className="px-4 py-3">
                  <RoleBadge role={user.role} />
                </td>
                <td className="px-4 py-3 font-mono text-xs text-[var(--bone-mute)]">
                  {user.memberships?.length ?? 0}
                </td>
                <td className="px-4 py-3">
                  {user.isBanned ? (
                    <span className="font-mono text-[10px] text-[var(--ember)]">Banido</span>
                  ) : (
                    <span className="font-mono text-[10px] text-emerald-400">Ativo</span>
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-[10px] text-[var(--bone-mute)]">
                  {formatDate(user.created_at)}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setSelectedUser(user)}
                    className="font-mono text-[10px] uppercase tracking-wide text-[var(--bone-mute)] transition-colors hover:text-[var(--bone)]"
                  >
                    Ver perfil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-mono text-[10px] text-[var(--bone-mute)]">
        {filtered.length} usuário{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
      </p>
    </>
  )
}
