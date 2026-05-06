'use client'

import { useState } from 'react'
import { MOCK_PROFILES, MOCK_COHORTS } from '@/components/admin/mock-data'
import type { MockProfile } from '@/components/admin/mock-data'
import { ChevronDown, X } from 'lucide-react'

const ROLE_LABELS: Record<string, string> = {
  STUDENT: 'Aluno',
  MENTOR: 'Mentor',
  SUPPORT: 'Suporte',
  ADMIN: 'Admin',
}

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: 'text-emerald-400',
  EXPIRED: 'text-[#84848c]',
  REMOVED: 'text-[#ff3a0e]',
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
      <span className="border border-[#ff3a0e] bg-[#ff3a0e]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[#ff3a0e]">
        {ROLE_LABELS[role] ?? role}
      </span>
    )
  }
  return (
    <span className="border border-[rgba(255,255,255,0.07)] bg-transparent px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[#84848c]">
      {ROLE_LABELS[role] ?? role}
    </span>
  )
}

function UserProfileModal({
  user,
  onClose,
}: {
  user: MockProfile
  onClose: () => void
}) {
  const [role, setRole] = useState(user.role)

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 pt-16">
      <div className="w-full max-w-2xl border border-[rgba(255,255,255,0.07)] bg-[#0e0e11]">
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.07)] px-6 py-4">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-[#f1f1f3]">
            Perfil — {user.name}
          </h2>
          <button
            onClick={onClose}
            className="text-[#84848c] transition-colors hover:text-[#f1f1f3]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="divide-y divide-[rgba(255,255,255,0.07)] p-6">
          <div className="pb-5">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-[#84848c]">
              Identidade
            </p>
            <div className="grid gap-2 md:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] text-[#84848c]">ID</p>
                <p className="font-mono text-xs text-[#c5c5ca]">{user.id}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-[#84848c]">Cadastro</p>
                <p className="font-mono text-xs text-[#c5c5ca]">{formatDate(user.created_at)}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-[#84848c]">Stripe Customer</p>
                <p className="font-mono text-xs text-[#c5c5ca]">
                  {user.stripe_customer_id ?? '—'}
                </p>
              </div>
            </div>
          </div>

          <div className="py-5">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-[#84848c]">
              Papel
            </p>
            <div className="flex items-center gap-3">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border border-[rgba(255,255,255,0.16)] bg-[#16161a] px-3 py-2 font-mono text-xs text-[#c5c5ca] focus:outline-none"
              >
                {Object.entries(ROLE_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="bg-[#ff3a0e] px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-white"
                onClick={() => {}}
              >
                Atualizar
              </button>
            </div>
          </div>

          <div className="py-5">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-[#84848c]">
              Matrículas
            </p>
            {!user.memberships?.length ? (
              <p className="font-mono text-xs text-[#84848c]">Nenhuma matrícula</p>
            ) : (
              <div className="space-y-2">
                {user.memberships.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between border border-[rgba(255,255,255,0.07)] px-4 py-3"
                  >
                    <div>
                      <p className="font-mono text-xs text-[#f1f1f3]">{m.cohortName}</p>
                      <p className="font-mono text-[10px] text-[#84848c]">
                        Expira: {m.expires_at ? formatDate(m.expires_at) : 'Vitalício'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-[10px] ${STATUS_COLORS[m.status] ?? 'text-[#84848c]'}`}
                      >
                        {m.status}
                      </span>
                      <button
                        type="button"
                        className="border border-[rgba(255,255,255,0.07)] px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-[#84848c] hover:text-[#c5c5ca]"
                      >
                        Estender
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className="border border-[rgba(255,255,255,0.07)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[#84848c] transition-colors hover:border-[rgba(255,255,255,0.16)] hover:text-[#c5c5ca]"
              >
                Conceder acesso manual
              </button>
            </div>
          </div>

          <div className="pt-5">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-[#84848c]">
              Ações
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="border border-emerald-400/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-emerald-400 transition-colors hover:bg-emerald-400/10"
              >
                Ativar conta
              </button>
              <button
                type="button"
                className="border border-[#ff3a0e]/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[#ff3a0e] transition-colors hover:bg-[#ff3a0e]/10"
              >
                Desativar conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function UsersClient() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [cohortFilter, setCohortFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState<MockProfile | null>(null)

  const filtered = MOCK_PROFILES.filter((u) => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false
    if (cohortFilter !== 'all') {
      const hasMembership = u.memberships?.some((m) => m.cohort_id === cohortFilter)
      if (!hasMembership) return false
    }
    if (search) {
      const q = search.toLowerCase()
      if (!u.name.toLowerCase().includes(q) && !u.id.toLowerCase().includes(q)) return false
    }
    return true
  })

  return (
    <>
      {selectedUser && (
        <UserProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Buscar por nome ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-60 border border-[rgba(255,255,255,0.16)] bg-[#16161a] px-3 py-2 font-mono text-xs text-[#f1f1f3] placeholder-[#84848c] focus:outline-none"
        />

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#84848c]">Papel:</span>
          {['all', 'STUDENT', 'MENTOR', 'SUPPORT', 'ADMIN'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                roleFilter === r
                  ? 'bg-[#ff3a0e] text-white'
                  : 'border border-[rgba(255,255,255,0.07)] text-[#84848c] hover:text-[#c5c5ca]'
              }`}
            >
              {r === 'all' ? 'Todos' : ROLE_LABELS[r]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#84848c]">Turma:</span>
          <div className="relative">
            <select
              value={cohortFilter}
              onChange={(e) => setCohortFilter(e.target.value)}
              className="appearance-none border border-[rgba(255,255,255,0.16)] bg-[#16161a] py-2 pl-3 pr-7 font-mono text-[10px] text-[#84848c] focus:outline-none"
            >
              <option value="all">Todas</option>
              {MOCK_COHORTS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[#84848c]" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-[rgba(255,255,255,0.07)]">
        <table className="w-full">
          <thead>
            <tr className="bg-[#16161a]">
              {['Usuário', 'ID', 'Papel', 'Turmas', 'Criado em', 'Ações'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wide text-[#84848c]"
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
                className="border-b border-[rgba(255,255,255,0.07)] hover:bg-[#050507]/40"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ff3a0e]/20">
                      <span className="font-mono text-[10px] font-semibold text-[#ff3a0e]">
                        {avatarInitials(user.name)}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#f1f1f3]">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-[10px] text-[#84848c]">
                  {user.id.slice(0, 12)}…
                </td>
                <td className="px-4 py-3">
                  <RoleBadge role={user.role} />
                </td>
                <td className="px-4 py-3 font-mono text-xs text-[#84848c]">
                  {user.memberships?.length ?? 0}
                </td>
                <td className="px-4 py-3 font-mono text-[10px] text-[#84848c]">
                  {formatDate(user.created_at)}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setSelectedUser(user)}
                    className="font-mono text-[10px] uppercase tracking-wide text-[#84848c] transition-colors hover:text-[#f1f1f3]"
                  >
                    Ver perfil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-mono text-[10px] text-[#84848c]">
        {filtered.length} usuário{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
      </p>
    </>
  )
}
