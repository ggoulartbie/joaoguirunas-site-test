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

const ROLE_COLORS: Record<string, string> = {
  STUDENT: 'text-white/50',
  MENTOR: 'text-blue-400',
  SUPPORT: 'text-amber-400',
  ADMIN: 'text-[#FF3A0E]',
}

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: 'text-emerald-400',
  EXPIRED: 'text-white/30',
  REMOVED: 'text-red-400',
  PAST_DUE: 'text-amber-400',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR')
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
      <div className="w-full max-w-2xl border border-white/15 bg-[#0C0C12]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-white/90">
            Perfil — {user.name}
          </h2>
          <button
            onClick={onClose}
            className="text-white/30 transition-colors hover:text-white/70"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="divide-y divide-white/5 p-6">
          {/* Identity */}
          <div className="pb-5">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-white/30">
              Identidade
            </p>
            <div className="grid gap-2 md:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] text-white/30">ID</p>
                <p className="font-mono text-xs text-white/60">{user.id}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-white/30">Cadastro</p>
                <p className="font-mono text-xs text-white/60">{formatDate(user.created_at)}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-white/30">Stripe Customer</p>
                <p className="font-mono text-xs text-white/60">
                  {user.stripe_customer_id ?? '—'}
                </p>
              </div>
            </div>
          </div>

          {/* Role */}
          <div className="py-5">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-white/30">
              Papel
            </p>
            <div className="flex items-center gap-3">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border border-white/10 bg-[#0C0C12] px-3 py-2 font-mono text-xs text-white/70 focus:outline-none"
              >
                {Object.entries(ROLE_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="bg-[#FF3A0E] px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-white"
                onClick={() => {}}
              >
                Atualizar
              </button>
            </div>
          </div>

          {/* Memberships */}
          <div className="py-5">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-white/30">
              Matrículas
            </p>
            {!user.memberships?.length ? (
              <p className="font-mono text-xs text-white/30">Nenhuma matrícula</p>
            ) : (
              <div className="space-y-2">
                {user.memberships.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between border border-white/5 px-4 py-3"
                  >
                    <div>
                      <p className="font-mono text-xs text-white/80">{m.cohortName}</p>
                      <p className="font-mono text-[10px] text-white/30">
                        Expira: {m.expires_at ? formatDate(m.expires_at) : 'Vitalício'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-[10px] ${STATUS_COLORS[m.status] ?? 'text-white/40'}`}
                      >
                        {m.status}
                      </span>
                      <button
                        type="button"
                        className="border border-white/10 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-white/30 hover:text-white/60"
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
                className="border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/40 transition-colors hover:border-white/20 hover:text-white/70"
              >
                Conceder acesso manual
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-5">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-white/30">
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
                className="border border-red-400/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-red-400 transition-colors hover:bg-red-400/10"
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
  const [roleFilter, setRoleFilter] = useState('all')
  const [cohortFilter, setCohortFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState<MockProfile | null>(null)

  const filtered = MOCK_PROFILES.filter((u) => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false
    if (cohortFilter !== 'all') {
      const hasMembership = u.memberships?.some((m) => m.cohort_id === cohortFilter)
      if (!hasMembership) return false
    }
    return true
  })

  return (
    <>
      {selectedUser && (
        <UserProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">Papel:</span>
          {['all', 'STUDENT', 'MENTOR', 'SUPPORT', 'ADMIN'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                roleFilter === r
                  ? 'bg-[#FF3A0E] text-white'
                  : 'border border-white/10 text-white/40 hover:text-white/60'
              }`}
            >
              {r === 'all' ? 'Todos' : ROLE_LABELS[r]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">Turma:</span>
          <div className="relative">
            <select
              value={cohortFilter}
              onChange={(e) => setCohortFilter(e.target.value)}
              className="appearance-none border border-white/10 bg-[#0C0C12] py-1 pl-3 pr-7 font-mono text-[10px] text-white/40 focus:outline-none"
            >
              <option value="all">Todas</option>
              {MOCK_COHORTS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-white/30" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-white/10">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              {['Usuário', 'Papel', 'Matrículas', 'Cadastro', 'Ações'].map((h) => (
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
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-white/[0.02]">
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="font-mono text-sm text-white/90">{user.name}</span>
                    <span className="font-mono text-[10px] text-white/30">{user.id}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`font-mono text-[10px] uppercase tracking-wider ${ROLE_COLORS[user.role] ?? 'text-white/40'}`}>
                    {ROLE_LABELS[user.role] ?? user.role}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-mono text-xs text-white/50">
                    {user.memberships?.length ?? 0}
                  </span>
                </td>
                <td className="px-4 py-4 font-mono text-xs text-white/40">
                  {formatDate(user.created_at)}
                </td>
                <td className="px-4 py-4">
                  <button
                    type="button"
                    onClick={() => setSelectedUser(user)}
                    className="border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/60 transition-colors hover:border-white/20 hover:text-white/90"
                  >
                    Ver perfil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-mono text-[10px] text-white/20">
        {filtered.length} usuário{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
      </p>
    </>
  )
}
