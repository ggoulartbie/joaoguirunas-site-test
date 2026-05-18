'use client'

import { useState, useTransition, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Database } from '@/types/database'

type CourseForSelector = {
  id: string
  title: string
  modules: { id: string; title: string; lessonCount: number }[]
}
type CohortForSelector = { id: string; name: string }
import {
  ChevronDown,
  ChevronRight,
  Check,
  Plus,
  Trash2,
  Save,
  ArrowLeft,
} from 'lucide-react'
import { createCohort, updateCohort, addMembersByIds, removeMemberFromCohort, createCoupon, createLiveSession, updateLiveSession, deleteLiveSession } from './actions'

type CohortCourse = Database['public']['Tables']['cohort_courses']['Row']
type CrossExtension = Database['public']['Tables']['cohort_cross_extensions']['Row']
type CohortMember = Database['public']['Tables']['cohort_members']['Row'] & {
  userName: string
  userEmail: string
}
type LiveSession = Database['public']['Tables']['live_sessions']['Row'] & {
  cohortName: string
}
type Coupon = Database['public']['Tables']['coupons']['Row'] & {
  cohortName: string
}

type CohortRow = Database['public']['Tables']['cohorts']['Row']

type UserOption = { id: string; name: string; email: string }

type CohortFormProps =
  | { mode: 'create'; courses: CourseForSelector[]; allCohorts: CohortForSelector[] }
  | {
      mode: 'edit'
      cohort: CohortRow
      cohortCourses: CohortCourse[]
      crossExtensions: CrossExtension[]
      members: CohortMember[]
      liveSessions: LiveSession[]
      coupons: Coupon[]
      courses: CourseForSelector[]
      allCohorts: CohortForSelector[]
      allUsers: UserOption[]
    }

const SECTIONS = [
  { id: 'identidade', label: 'Identidade' },
  { id: 'status', label: 'Status e Datas' },
  { id: 'acesso', label: 'Acesso' },
  { id: 'cursos', label: 'Cursos Liberados' },
  { id: 'comercial', label: 'Comercial' },
  { id: 'extensoes', label: 'Extensoes Cruzadas' },
  { id: 'membros', label: 'Membros' },
  { id: 'sessoes', label: 'Sessoes ao Vivo' },
  { id: 'cupons', label: 'Cupons' },
] as const

type SectionId = (typeof SECTIONS)[number]['id']

const sectionIndexMap: Record<SectionId, number> = {
  identidade: 1,
  status: 2,
  acesso: 3,
  cursos: 4,
  comercial: 5,
  extensoes: 6,
  membros: 7,
  sessoes: 8,
  cupons: 9,
}

function SectionHeader({
  idx,
  label,
  open,
  onToggle,
}: {
  idx: number
  label: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between border-b border-white/[0.07] px-4 py-3 text-left transition-colors hover:bg-white/[0.02]"
    >
      <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--bone-mute)]">
        {String(idx).padStart(2, '0')} — {label}
      </span>
      {open ? (
        <ChevronDown className="h-3.5 w-3.5 text-[var(--bone-mute)]" />
      ) : (
        <ChevronRight className="h-3.5 w-3.5 text-[var(--bone-mute)]" />
      )}
    </button>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
      {children}
    </label>
  )
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ borderRadius: 0 }}
      className="w-full border border-white/[0.16] bg-[var(--ink-2)] px-3 py-2.5 font-mono text-sm text-[var(--bone)] placeholder-[var(--bone-mute)] focus:border-[var(--ember)]/50 focus:outline-none"
    />
  )
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{ borderRadius: 0 }}
        className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors ${
          checked
            ? 'border-[var(--ember)] bg-[var(--ember)]'
            : 'border-white/[0.16] hover:border-white/[0.30]'
        }`}
      >
        {checked && <Check className="h-2.5 w-2.5 text-[var(--void)]" />}
      </button>
      <span className="font-mono text-xs text-[var(--bone-dim)]">{label}</span>
    </label>
  )
}

function SelectInput({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ borderRadius: 0 }}
      className="w-full border border-white/[0.16] bg-[var(--ink-2)] px-3 py-2.5 font-mono text-sm text-[var(--bone)] focus:border-[var(--ember)]/50 focus:outline-none"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-[var(--ink-2)]">
          {o.label}
        </option>
      ))}
    </select>
  )
}

function formatBRL(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

function parseBRL(v: string): number {
  return Math.round(parseFloat(v.replace(/[^\d,]/g, '').replace(',', '.')) * 100) || 0
}

function formatDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('pt-BR')
}

function getDefaultSessionDate(): string {
  const now = new Date()
  now.setMinutes(0, 0, 0)
  now.setHours(now.getHours() + 1)
  const brt = new Date(now.getTime() - 3 * 60 * 60 * 1000)
  return brt.toISOString().slice(0, 16)
}

function formatDateTimeBR(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', dateStyle: 'short', timeStyle: 'short' })
}

function toDatetimeLocalValue(iso: string | null) {
  if (!iso) return ''
  // Converts ISO UTC to datetime-local string in Sao Paulo time
  const d = new Date(iso)
  const tzOffset = -3 * 60 // BRT = UTC-3
  const local = new Date(d.getTime() + tzOffset * 60000 - d.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 16)
}

const STATUS_OPTIONS = [
  { value: 'DRAFT', label: 'Rascunho' },
  { value: 'OPEN', label: 'Aberta' },
  { value: 'IN_PROGRESS', label: 'Em Andamento' },
  { value: 'CLOSED', label: 'Encerrada' },
  { value: 'ARCHIVED', label: 'Arquivada' },
]

const PAYMENT_PROVIDER_OPTIONS = [
  { value: 'STRIPE', label: 'Stripe' },
  { value: 'INFINITEPAY', label: 'InfinitePay' },
]

const MEMBER_ROLE_LABELS: Record<string, string> = {
  STUDENT: 'Aluno',
  MONITOR: 'Monitor',
  MENTOR: 'Mentor',
}

const MEMBER_STATUS_COLORS: Record<string, string> = {
  ACTIVE: 'text-green-400',
  EXPIRED: 'text-[var(--bone-mute)]',
  REMOVED: 'text-red-400',
  PAST_DUE: 'text-amber-400',
}

export function CohortForm(props: CohortFormProps) {
  const isEdit = props.mode === 'edit'
  const initial = isEdit ? props.cohort : null
  const courses = props.courses
  const allCohorts = props.allCohorts
  const allUsers = isEdit ? props.allUsers : []
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [saveError, setSaveError] = useState<string | null>(null)

  const [openSections, setOpenSections] = useState<Set<SectionId>>(
    new Set(['identidade'] as SectionId[])
  )

  // Section 1 — Identidade
  const [name, setName] = useState(initial?.name ?? '')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [coverImageUrl, setCoverImageUrl] = useState(initial?.cover_image_url ?? '')

  // Section 2 — Status e Datas
  const [status, setStatus] = useState(initial?.status ?? 'DRAFT')
  const [startDate, setStartDate] = useState(initial?.start_date ?? '')
  const [endDate, setEndDate] = useState(initial?.end_date ?? '')
  const [totalSeats, setTotalSeats] = useState(String(initial?.total_seats ?? ''))

  // Section 3 — Acesso
  const [accessDurationDays, setAccessDurationDays] = useState(
    String(initial?.access_duration_days ?? '')
  )
  const [groupUrl, setGroupUrl] = useState(initial?.group_url ?? '')
  const [hasLiveSessions, setHasLiveSessions] = useState(initial?.has_live_sessions ?? false)
  const [hasSupport, setHasSupport] = useState(initial?.has_support ?? false)

  // Section 4 — Cursos liberados
  const initialCohortCourses = isEdit ? props.cohortCourses : []
  const [selectedCourses, setSelectedCourses] = useState<Record<string, Set<string> | null>>(() => {
    const map: Record<string, Set<string> | null> = {}
    for (const cc of initialCohortCourses) {
      map[cc.course_id] =
        cc.included_module_ids.length === 0 ? null : new Set(cc.included_module_ids)
    }
    return map
  })
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(
    new Set(Object.keys(selectedCourses))
  )

  // Section 5 — Comercial
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [paymentProvider, setPaymentProvider] = useState<string>((initial as any)?.payment_provider ?? 'STRIPE')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [infinitepayHandle, setInfinitepayHandle] = useState<string>((initial as any)?.infinitepay_handle ?? '')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [infinitepayCheckoutUrl, setInfinitepayCheckoutUrl] = useState<string>((initial as any)?.infinitepay_checkout_url ?? '')
  const [isPurchasable, setIsPurchasable] = useState(initial?.is_purchasable ?? false)
  const [hasPublicPage, setHasPublicPage] = useState(initial?.has_public_page ?? false)
  const [entryPriceBRL, setEntryPriceBRL] = useState(
    initial?.entry_price_cents ? String(initial.entry_price_cents / 100) : ''
  )
  const [extensionPriceBRL, setExtensionPriceBRL] = useState(
    initial?.extension_price_cents ? String(initial.extension_price_cents / 100) : ''
  )
  const [maxInstEntry, setMaxInstEntry] = useState(String(initial?.max_installments_entry ?? 1))
  const [maxInstExt, setMaxInstExt] = useState(String(initial?.max_installments_extension ?? 1))
  const [extDurationDays, setExtDurationDays] = useState(
    String(initial?.extension_duration_days ?? '')
  )
  const [allowsAutoRenewal, setAllowsAutoRenewal] = useState(
    initial?.allows_auto_renewal ?? false
  )
  const [stripePriceEntryId, setStripePriceEntryId] = useState(
    initial?.stripe_price_entry_id ?? ''
  )

  // Section 6 — Extensoes cruzadas
  const initialExtensions = isEdit ? props.crossExtensions : []
  const [extensions, setExtensions] = useState<
    Array<{ id?: string; targetCohortId: string; daysGranted: string; description: string; isActive: boolean }>
  >(
    initialExtensions.map((e) => ({
      id: e.id,
      targetCohortId: e.target_cohort_id,
      daysGranted: String(e.days_granted),
      description: e.description ?? '',
      isActive: e.is_active,
    }))
  )

  // Section 7 — Membros
  const members = isEdit ? props.members : []
  const [showAddMember, setShowAddMember] = useState(false)
  const [memberSearch, setMemberSearch] = useState('')
  const [memberDropdownOpen, setMemberDropdownOpen] = useState(false)
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const [memberRole, setMemberRole] = useState('STUDENT')
  const memberDropdownRef = useRef<HTMLDivElement>(null)
  const [memberExpiresAt, setMemberExpiresAt] = useState('')
  const [memberError, setMemberError] = useState<string | null>(null)
  const [memberPending, startMemberTransition] = useTransition()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (memberDropdownRef.current && !memberDropdownRef.current.contains(e.target as Node)) {
        setMemberDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Section 8 — Sessoes ao vivo
  const liveSessions = isEdit ? props.liveSessions : []
  const [showAddSession, setShowAddSession] = useState(false)
  const [newSessionTitle, setNewSessionTitle] = useState('')
  const [newSessionDate, setNewSessionDate] = useState('')
  const [newSessionDuration, setNewSessionDuration] = useState('90')
  const [newSessionUrl, setNewSessionUrl] = useState('')
  const [newSessionDescription, setNewSessionDescription] = useState('')
  const [newSessionRecordingUrl, setNewSessionRecordingUrl] = useState('')
  const [sessionError, setSessionError] = useState<string | null>(null)
  const [sessionPending, startSessionTransition] = useTransition()
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null)
  const [editSessionTitle, setEditSessionTitle] = useState('')
  const [editSessionDate, setEditSessionDate] = useState('')
  const [editSessionDuration, setEditSessionDuration] = useState('90')
  const [editSessionUrl, setEditSessionUrl] = useState('')
  const [editSessionDescription, setEditSessionDescription] = useState('')
  const [editSessionRecordingUrl, setEditSessionRecordingUrl] = useState('')
  const [editSessionError, setEditSessionError] = useState<string | null>(null)
  const [editSessionPending, startEditSessionTransition] = useTransition()

  // Section 9 — Cupons
  const coupons = isEdit ? props.coupons : []
  const [showAddCoupon, setShowAddCoupon] = useState(false)
  const [newCouponCode, setNewCouponCode] = useState('')
  const [newCouponKind, setNewCouponKind] = useState('PERCENT')
  const [newCouponValue, setNewCouponValue] = useState('')
  const [newCouponAppliesTo, setNewCouponAppliesTo] = useState('ENTRY')
  const [couponError, setCouponError] = useState<string | null>(null)
  const [couponPending, startCouponTransition] = useTransition()

  const [saved, setSaved] = useState(false)

  function toggleSection(id: SectionId) {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleAutoSlug(v: string) {
    setName(v)
    if (!isEdit) {
      setSlug(
        v
          .toLowerCase()
          .normalize('NFD')
          .replace(/[̀-ͯ]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      )
    }
  }

  function toggleCourseSelection(courseId: string) {
    setSelectedCourses((prev) => {
      const next = { ...prev }
      if (courseId in next) {
        delete next[courseId]
        setExpandedCourses((e) => {
          const ne = new Set(e)
          ne.delete(courseId)
          return ne
        })
      } else {
        next[courseId] = null
        setExpandedCourses((e) => new Set([...e, courseId]))
      }
      return next
    })
  }

  function toggleModuleSelection(courseId: string, moduleId: string) {
    setSelectedCourses((prev) => {
      const next = { ...prev }
      const course = courses.find((c) => c.id === courseId)
      if (!course) return prev

      const allModuleIds = course.modules.map((m) => m.id)
      let current: Set<string> | null = next[courseId] ?? null

      if (current === null) {
        current = new Set(allModuleIds.filter((id) => id !== moduleId))
      } else if (current.has(moduleId)) {
        current = new Set(current)
        current.delete(moduleId)
        if (current.size === 0) {
          delete next[courseId]
          return next
        }
      } else {
        current = new Set(current)
        current.add(moduleId)
        if (current.size === allModuleIds.length) {
          current = null
        }
      }
      next[courseId] = current
      return next
    })
  }

  function isModuleSelected(courseId: string, moduleId: string): boolean {
    const sel = selectedCourses[courseId]
    if (sel === undefined) return false
    if (sel === null) return true
    return sel.has(moduleId)
  }

  function addExtension() {
    setExtensions((prev) => [
      ...prev,
      { targetCohortId: '', daysGranted: '', description: '', isActive: true },
    ])
  }

  function removeExtension(idx: number) {
    setExtensions((prev) => prev.filter((_, i) => i !== idx))
  }

  function buildFormData() {
    const cohortCoursesPayload = Object.entries(selectedCourses).map(([courseId, moduleSet]) => ({
      courseId,
      includedModuleIds: moduleSet === null ? [] : Array.from(moduleSet),
    }))

    const crossExtensionsPayload = extensions
      .filter((e) => e.targetCohortId && e.daysGranted)
      .map((e) => ({
        targetCohortId: e.targetCohortId,
        daysGranted: parseInt(e.daysGranted, 10),
        description: e.description || undefined,
        isActive: e.isActive,
      }))

    return {
      name,
      slug,
      description: description || undefined,
      cover_image_url: coverImageUrl || undefined,
      status: status as 'DRAFT' | 'OPEN' | 'IN_PROGRESS' | 'CLOSED' | 'ARCHIVED',
      start_date: startDate || undefined,
      end_date: endDate || undefined,
      total_seats: totalSeats ? parseInt(totalSeats, 10) : undefined,
      access_duration_days: accessDurationDays ? parseInt(accessDurationDays, 10) : undefined,
      group_url: groupUrl || undefined,
      has_live_sessions: hasLiveSessions,
      has_support: hasSupport,
      is_purchasable: isPurchasable,
      has_public_page: hasPublicPage,
      entry_price_cents: entryPriceBRL ? parseBRL(entryPriceBRL) : undefined,
      extension_price_cents: extensionPriceBRL ? parseBRL(extensionPriceBRL) : undefined,
      max_installments_entry: parseInt(maxInstEntry, 10) || 1,
      max_installments_extension: parseInt(maxInstExt, 10) || 1,
      extension_duration_days: extDurationDays ? parseInt(extDurationDays, 10) : undefined,
      allows_auto_renewal: allowsAutoRenewal,
      stripe_price_entry_id: stripePriceEntryId || undefined,
      payment_provider: paymentProvider as 'STRIPE' | 'INFINITEPAY',
      infinitepay_handle: infinitepayHandle || undefined,
      infinitepay_checkout_url: infinitepayCheckoutUrl || undefined,
      cohortCourses: cohortCoursesPayload,
      crossExtensions: crossExtensionsPayload,
    }
  }

  function handleSave() {
    setSaveError(null)
    startTransition(async () => {
      try {
        if (isEdit) {
          await updateCohort(props.cohort.id, buildFormData())
        } else {
          await createCohort(buildFormData())
        }
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
        router.push('/academy/admin/turmas')
      } catch (err) {
        setSaveError(err instanceof Error ? err.message : 'Erro ao salvar')
      }
    })
  }

  function handleAddMember() {
    if (!isEdit || !selectedUserIds.length) return
    setMemberError(null)
    startMemberTransition(async () => {
      try {
        await addMembersByIds(
          props.cohort.id,
          selectedUserIds,
          memberRole as 'STUDENT' | 'MENTOR' | 'MONITOR',
          memberExpiresAt || undefined,
        )
        setShowAddMember(false)
        setSelectedUserIds([])
        setMemberSearch('')
        setMemberExpiresAt('')
        setMemberRole('STUDENT')
        router.refresh()
      } catch (err) {
        setMemberError(err instanceof Error ? err.message : 'Erro ao adicionar membros')
      }
    })
  }

  function handleSaveCoupon() {
    if (!isEdit) return
    setCouponError(null)
    const discountValue = newCouponKind === 'PERCENT'
      ? parseInt(newCouponValue, 10)
      : parseBRL(newCouponValue)
    if (!newCouponCode || !discountValue) {
      setCouponError('Preencha o codigo e o valor do desconto')
      return
    }
    startCouponTransition(async () => {
      try {
        await createCoupon({
          cohortId: props.cohort.id,
          code: newCouponCode,
          discountKind: newCouponKind as 'PERCENT' | 'FIXED',
          discountValue,
          appliesTo: newCouponAppliesTo as 'ENTRY' | 'EXTENSION' | 'BOTH',
        })
        setShowAddCoupon(false)
        setNewCouponCode('')
        setNewCouponKind('PERCENT')
        setNewCouponValue('')
        setNewCouponAppliesTo('ENTRY')
        router.refresh()
      } catch (err) {
        setCouponError(err instanceof Error ? err.message : 'Erro ao criar cupom')
      }
    })
  }

  return (
    <div className="space-y-1">
      {/* Section nav */}
      <div className="mb-6 flex flex-wrap gap-2">
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              if (!openSections.has(id)) toggleSection(id)
              document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            style={{ borderRadius: 0 }}
            className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
              openSections.has(id)
                ? 'bg-[var(--ember)]/10 text-[var(--ember)]'
                : 'border border-white/[0.07] text-[var(--bone-mute)] hover:border-white/[0.16] hover:text-[var(--bone-dim)]'
            }`}
          >
            {sectionIndexMap[id]}. {label}
          </button>
        ))}
      </div>

      {/* Section 1 — Identidade */}
      <div id="section-identidade" className="border border-white/[0.07]">
        <SectionHeader
          idx={1}
          label="Identidade"
          open={openSections.has('identidade')}
          onToggle={() => toggleSection('identidade')}
        />
        {openSections.has('identidade') && (
          <div className="grid gap-4 bg-[var(--ink-2)]/30 p-5 md:grid-cols-2">
            <div>
              <FieldLabel>Nome da turma *</FieldLabel>
              <TextInput
                value={name}
                onChange={handleAutoSlug}
                placeholder="Ex.: Mentoria Maio 2026"
              />
            </div>
            <div>
              <FieldLabel>Slug * (auto-gerado)</FieldLabel>
              <TextInput
                value={slug}
                onChange={setSlug}
                placeholder="mentoria-maio-2026"
              />
            </div>
            <div className="md:col-span-2">
              <FieldLabel>Descricao</FieldLabel>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Descreva brevemente o que esta turma oferece..."
                style={{ borderRadius: 0 }}
                className="w-full border border-white/[0.16] bg-[var(--ink-2)] px-3 py-2.5 font-mono text-sm text-[var(--bone)] placeholder-[var(--bone-mute)] focus:border-[var(--ember)]/50 focus:outline-none"
              />
            </div>
            <div>
              <FieldLabel>URL da capa</FieldLabel>
              <TextInput
                value={coverImageUrl}
                onChange={setCoverImageUrl}
                placeholder="https://..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Section 2 — Status e Datas */}
      <div id="section-status" className="border border-white/[0.07]">
        <SectionHeader
          idx={2}
          label="Status e Datas"
          open={openSections.has('status')}
          onToggle={() => toggleSection('status')}
        />
        {openSections.has('status') && (
          <div className="grid gap-4 bg-[var(--ink-2)]/30 p-5 md:grid-cols-3">
            <div>
              <FieldLabel>Status *</FieldLabel>
              <SelectInput
                value={status}
                onChange={setStatus}
                options={STATUS_OPTIONS}
              />
            </div>
            <div>
              <FieldLabel>Data de inicio</FieldLabel>
              <TextInput type="date" value={startDate} onChange={setStartDate} />
            </div>
            <div>
              <FieldLabel>Data de encerramento</FieldLabel>
              <TextInput type="date" value={endDate} onChange={setEndDate} />
            </div>
            <div>
              <FieldLabel>Vagas totais (vazio = ilimitado)</FieldLabel>
              <TextInput
                type="number"
                value={totalSeats}
                onChange={setTotalSeats}
                placeholder="20"
              />
            </div>
          </div>
        )}
      </div>

      {/* Section 3 — Acesso */}
      <div id="section-acesso" className="border border-white/[0.07]">
        <SectionHeader
          idx={3}
          label="Acesso"
          open={openSections.has('acesso')}
          onToggle={() => toggleSection('acesso')}
        />
        {openSections.has('acesso') && (
          <div className="grid gap-4 bg-[var(--ink-2)]/30 p-5 md:grid-cols-2">
            <div>
              <FieldLabel>Duracao do acesso (dias — vazio = vitalicio)</FieldLabel>
              <TextInput
                type="number"
                value={accessDurationDays}
                onChange={setAccessDurationDays}
                placeholder="180"
              />
            </div>
            <div>
              <FieldLabel>URL do grupo (WhatsApp, Discord etc.)</FieldLabel>
              <TextInput
                value={groupUrl}
                onChange={setGroupUrl}
                placeholder="https://chat.whatsapp.com/..."
              />
            </div>
            <div className="flex flex-col gap-4">
              <Checkbox
                checked={hasLiveSessions}
                onChange={setHasLiveSessions}
                label="Tem sessoes ao vivo"
              />
              <Checkbox
                checked={hasSupport}
                onChange={setHasSupport}
                label="Tem suporte dedicado"
              />
            </div>
          </div>
        )}
      </div>

      {/* Section 4 — Cursos liberados */}
      <div id="section-cursos" className="border border-white/[0.07]">
        <SectionHeader
          idx={4}
          label="Cursos Liberados"
          open={openSections.has('cursos')}
          onToggle={() => toggleSection('cursos')}
        />
        {openSections.has('cursos') && (
          <div className="bg-[var(--ink-2)]/30 p-5">
            <p className="mb-4 font-mono text-[10px] text-[var(--bone-mute)]">
              Selecione cursos e, opcionalmente, quais modulos especificos liberar. Deixar
              sub-itens desmarcados equivale a liberar todos os modulos do curso.
            </p>
            <div className="space-y-1">
              {courses.map((course) => {
                const isCourseSelected = course.id in selectedCourses
                const isExpanded = expandedCourses.has(course.id)

                return (
                  <div key={course.id} className="border border-white/[0.07]">
                    <div className="flex items-center gap-3 px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggleCourseSelection(course.id)}
                        style={{ borderRadius: 0 }}
                        className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors ${
                          isCourseSelected
                            ? 'border-[var(--ember)] bg-[var(--ember)]'
                            : 'border-white/[0.16] hover:border-white/[0.30]'
                        }`}
                        aria-label={`Selecionar ${course.title}`}
                      >
                        {isCourseSelected && <Check className="h-2.5 w-2.5 text-[var(--void)]" />}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setExpandedCourses((prev) => {
                            const next = new Set(prev)
                            if (next.has(course.id)) next.delete(course.id)
                            else next.add(course.id)
                            return next
                          })
                        }
                        className="flex flex-1 items-center gap-2 text-left"
                      >
                        <span
                          className={`font-mono text-sm ${isCourseSelected ? 'text-[var(--bone)]' : 'text-[var(--bone-mute)]'}`}
                        >
                          {course.title}
                        </span>
                        <span className="font-mono text-[10px] text-[var(--bone-mute)]">
                          {course.modules.length} modulo{course.modules.length !== 1 ? 's' : ''}
                        </span>
                        {isExpanded ? (
                          <ChevronDown className="ml-auto h-3 w-3 text-[var(--bone-mute)]" />
                        ) : (
                          <ChevronRight className="ml-auto h-3 w-3 text-[var(--bone-mute)]" />
                        )}
                      </button>

                      {isCourseSelected && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedCourses((prev) => ({ ...prev, [course.id]: null }))
                            }
                            className="font-mono text-[9px] uppercase tracking-widest text-[var(--bone-mute)] hover:text-[var(--bone-dim)]"
                          >
                            Todos
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedCourses((prev) => ({
                                ...prev,
                                [course.id]: new Set(),
                              }))
                            }
                            className="font-mono text-[9px] uppercase tracking-widest text-[var(--bone-mute)] hover:text-[var(--bone-dim)]"
                          >
                            Limpar
                          </button>
                        </div>
                      )}
                    </div>

                    {isExpanded && (
                      <div className="border-t border-white/[0.07] bg-[var(--ink)]">
                        {course.modules.map((mod) => {
                          const isModSel = isModuleSelected(course.id, mod.id)
                          return (
                            <div
                              key={mod.id}
                              className="flex items-center gap-3 py-2.5 pl-11 pr-4"
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  if (!isCourseSelected) {
                                    setSelectedCourses((prev) => ({
                                      ...prev,
                                      [course.id]: new Set([mod.id]),
                                    }))
                                    setExpandedCourses((e) => new Set([...e, course.id]))
                                  } else {
                                    toggleModuleSelection(course.id, mod.id)
                                  }
                                }}
                                style={{ borderRadius: 0 }}
                                className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center border transition-colors ${
                                  isModSel
                                    ? 'border-[var(--ember)]/70 bg-[var(--ember)]/70'
                                    : 'border-white/[0.16] hover:border-white/[0.30]'
                                }`}
                                aria-label={`Selecionar modulo ${mod.title}`}
                              >
                                {isModSel && <Check className="h-2 w-2 text-[var(--void)]" />}
                              </button>
                              <span
                                className={`font-mono text-xs ${isModSel ? 'text-[var(--bone-dim)]' : 'text-[var(--bone-mute)]'}`}
                              >
                                {mod.title}
                              </span>
                              <span className="ml-auto font-mono text-[10px] text-[var(--bone-mute)]">
                                {mod.lessonCount} aula{mod.lessonCount !== 1 ? 's' : ''}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {Object.keys(selectedCourses).length > 0 && (
              <p className="mt-3 font-mono text-[10px] text-[var(--bone-mute)]">
                {Object.keys(selectedCourses).length} curso
                {Object.keys(selectedCourses).length !== 1 ? 's' : ''} selecionado
                {Object.keys(selectedCourses).length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Section 5 — Comercial */}
      <div id="section-comercial" className="border border-white/[0.07]">
        <SectionHeader
          idx={5}
          label="Comercial"
          open={openSections.has('comercial')}
          onToggle={() => toggleSection('comercial')}
        />
        {openSections.has('comercial') && (
          <div className="space-y-5 bg-[var(--ink-2)]/30 p-5">
            <div className="flex flex-col gap-4">
              <Checkbox
                checked={isPurchasable}
                onChange={setIsPurchasable}
                label="Turma vendavel (gera Stripe Price)"
              />
              <Checkbox
                checked={hasPublicPage}
                onChange={setHasPublicPage}
                label="Tem pagina publica (/turmas/[slug])"
              />
              <Checkbox
                checked={allowsAutoRenewal}
                onChange={setAllowsAutoRenewal}
                label="Permite renovacao automatica"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>Preco de entrada (R$)</FieldLabel>
                <TextInput
                  type="number"
                  value={entryPriceBRL}
                  onChange={setEntryPriceBRL}
                  placeholder="499.00"
                />
              </div>
              <div>
                <FieldLabel>Preco de extensao (R$)</FieldLabel>
                <TextInput
                  type="number"
                  value={extensionPriceBRL}
                  onChange={setExtensionPriceBRL}
                  placeholder="299.00"
                />
              </div>
              <div>
                <FieldLabel>Parcelas maximas — entrada</FieldLabel>
                <TextInput
                  type="number"
                  value={maxInstEntry}
                  onChange={setMaxInstEntry}
                  placeholder="1"
                />
              </div>
              <div>
                <FieldLabel>Parcelas maximas — extensao</FieldLabel>
                <TextInput
                  type="number"
                  value={maxInstExt}
                  onChange={setMaxInstExt}
                  placeholder="1"
                />
              </div>
              <div>
                <FieldLabel>Dias adicionados por extensao</FieldLabel>
                <TextInput
                  type="number"
                  value={extDurationDays}
                  onChange={setExtDurationDays}
                  placeholder="180"
                />
              </div>
            </div>

            <div>
              <FieldLabel>Stripe Price ID (entrada)</FieldLabel>
              <TextInput
                value={stripePriceEntryId}
                onChange={setStripePriceEntryId}
                placeholder="price_1ABC..."
              />
              <p className="mt-1 font-mono text-[10px] text-[var(--bone-mute)]">
                ID do price one-time no Stripe para checkout de entrada
              </p>
            </div>

            <div>
              <FieldLabel>Provider de Pagamento</FieldLabel>
              <SelectInput
                value={paymentProvider}
                onChange={setPaymentProvider}
                options={PAYMENT_PROVIDER_OPTIONS}
              />
              {paymentProvider === 'INFINITEPAY' && (
                <div className="mt-3">
                  <FieldLabel>Handle InfinitePay (InfiniteTag)</FieldLabel>
                  <input
                    type="text"
                    value={infinitepayHandle}
                    onChange={(e) => setInfinitepayHandle(e.target.value)}
                    placeholder="growthsales"
                    className="w-full bg-[var(--ink-2)] px-3 py-2 font-mono text-xs text-[var(--bone)] outline-none border border-[rgba(255,255,255,0.07)] focus:border-[var(--ember)]"
                    style={{ borderRadius: 0 }}
                  />
                  <p className="mt-1 font-mono text-[10px] text-[var(--bone-mute)]">
                    Sua InfiniteTag sem o $ (ex: growthsales)
                  </p>
                </div>
              )}
              {paymentProvider === 'INFINITEPAY' && (
                <div className="mt-3">
                  <FieldLabel>URL de Checkout (link estático InfinitePay)</FieldLabel>
                  <input
                    type="url"
                    value={infinitepayCheckoutUrl}
                    onChange={(e) => setInfinitepayCheckoutUrl(e.target.value)}
                    placeholder="https://checkout.infinitepay.io/growthsales/..."
                    className="w-full bg-[var(--ink-2)] px-3 py-2 font-mono text-xs text-[var(--bone)] outline-none border border-[rgba(255,255,255,0.07)] focus:border-[var(--ember)]"
                    style={{ borderRadius: 0 }}
                  />
                  <p className="mt-1 font-mono text-[10px] text-[var(--bone-mute)]">
                    Cole aqui o link criado manualmente no painel InfinitePay. Quando preenchido, o checkout redireciona diretamente para este link.
                  </p>
                  <div
                    role="alert"
                    data-testid="infinitepay-static-url-warning"
                    className="mt-2 border border-[var(--ember)] bg-[var(--ember)]/10 p-3 font-mono text-[10px] text-[var(--bone)]"
                  >
                    <span className="font-semibold">Atenção:</span> Link estático não rastreia pagamentos automaticamente. O webhook não conseguirá associar o pagamento ao aluno. Use apenas se o checkout for externo à plataforma.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Section 6 — Extensoes cruzadas */}
      <div id="section-extensoes" className="border border-white/[0.07]">
        <SectionHeader
          idx={6}
          label="Extensoes Cruzadas"
          open={openSections.has('extensoes')}
          onToggle={() => toggleSection('extensoes')}
        />
        {openSections.has('extensoes') && (
          <div className="bg-[var(--ink-2)]/30 p-5">
            <p className="mb-4 font-mono text-[10px] text-[var(--bone-mute)]">
              Quando alguem comprar esta turma, quantos dias sao adicionados em outras turmas?
            </p>

            <div className="space-y-2">
              {extensions.map((ext, idx) => (
                <div key={idx} className="border border-white/[0.07] p-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="md:col-span-1">
                      <FieldLabel>Turma destino</FieldLabel>
                      <SelectInput
                        value={ext.targetCohortId}
                        onChange={(v) =>
                          setExtensions((prev) =>
                            prev.map((e, i) => (i === idx ? { ...e, targetCohortId: v } : e))
                          )
                        }
                        options={[
                          { value: '', label: 'Selecionar...' },
                          ...allCohorts.filter((c) => c.id !== initial?.id).map((c) => ({
                            value: c.id,
                            label: c.name,
                          })),
                        ]}
                      />
                    </div>
                    <div>
                      <FieldLabel>Dias concedidos</FieldLabel>
                      <TextInput
                        type="number"
                        value={ext.daysGranted}
                        onChange={(v) =>
                          setExtensions((prev) =>
                            prev.map((e, i) => (i === idx ? { ...e, daysGranted: v } : e))
                          )
                        }
                        placeholder="180"
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      <Checkbox
                        checked={ext.isActive}
                        onChange={(v) =>
                          setExtensions((prev) =>
                            prev.map((e, i) => (i === idx ? { ...e, isActive: v } : e))
                          )
                        }
                        label="Ativa"
                      />
                      <button
                        type="button"
                        onClick={() => removeExtension(idx)}
                        className="ml-auto p-1.5 text-red-400/50 transition-colors hover:text-red-400"
                        title="Remover"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="md:col-span-3">
                      <FieldLabel>Descricao</FieldLabel>
                      <TextInput
                        value={ext.description}
                        onChange={(v) =>
                          setExtensions((prev) =>
                            prev.map((e, i) => (i === idx ? { ...e, description: v } : e))
                          )
                        }
                        placeholder="Ex.: Mentorado que comprar Online ganha 180 dias adicionais na Mentoria"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addExtension}
              style={{ borderRadius: 0 }}
              className="mt-3 flex items-center gap-2 border border-white/[0.07] px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] transition-colors hover:border-white/[0.16] hover:text-[var(--bone-dim)]"
            >
              <Plus className="h-3.5 w-3.5" />
              Adicionar extensao cruzada
            </button>
          </div>
        )}
      </div>

      {/* Section 7 — Membros */}
      <div id="section-membros" className="border border-white/[0.07]">
        <SectionHeader
          idx={7}
          label="Membros"
          open={openSections.has('membros')}
          onToggle={() => toggleSection('membros')}
        />
        {openSections.has('membros') && (
          <div className="bg-[var(--ink-2)]/30 p-5">
            {!isEdit ? (
              <p className="font-mono text-xs text-[var(--bone-mute)]">
                Salve a turma primeiro para adicionar membros.
              </p>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--bone-mute)]">
                    {members.length} membro{members.length !== 1 ? 's' : ''}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAddMember(true)}
                    style={{ borderRadius: 0 }}
                    className="flex items-center gap-1.5 border border-white/[0.07] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] transition-colors hover:border-white/[0.16] hover:text-[var(--bone-dim)]"
                  >
                    <Plus className="h-3 w-3" />
                    Adicionar
                  </button>
                </div>

                {showAddMember && (() => {
                  const memberUserIds = isEdit ? props.members.map((m) => m.user_id) : []
                  const availableUsers = allUsers.filter((u) => !memberUserIds.includes(u.id))
                  const filtered = availableUsers.filter((u) =>
                    memberSearch === '' ||
                    u.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
                    u.email.toLowerCase().includes(memberSearch.toLowerCase())
                  )
                  return (
                  <div className="mb-4 border border-white/[0.07] p-4">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                      Adicionar membros
                    </p>

                    {/* Multi-select */}
                    <div className="mb-3">
                      <FieldLabel>Usuários ({availableUsers.length} disponíveis)</FieldLabel>

                      {/* Selected chips */}
                      {selectedUserIds.length > 0 && (
                        <div className="mb-2 flex flex-wrap gap-1.5">
                          {selectedUserIds.map((uid) => {
                            const u = allUsers.find((x) => x.id === uid)
                            return (
                              <span
                                key={uid}
                                className="flex items-center gap-1 border border-[var(--ember)]/40 bg-[var(--ember)]/10 px-2 py-0.5 font-mono text-[10px] text-[var(--ember)]"
                              >
                                {u?.name || u?.email || uid.slice(0, 8)}
                                <button
                                  type="button"
                                  onClick={() => setSelectedUserIds((ids) => ids.filter((i) => i !== uid))}
                                  className="ml-0.5 opacity-60 hover:opacity-100"
                                >
                                  ×
                                </button>
                              </span>
                            )
                          })}
                          <button
                            type="button"
                            onClick={() => setSelectedUserIds([])}
                            className="font-mono text-[10px] text-[var(--bone-mute)] underline hover:text-[var(--bone-dim)]"
                          >
                            limpar
                          </button>
                        </div>
                      )}

                      {/* Search + dropdown */}
                      <div ref={memberDropdownRef} className="relative">
                        <input
                          type="text"
                          value={memberSearch}
                          onChange={(e) => { setMemberSearch(e.target.value); setMemberDropdownOpen(true) }}
                          onFocus={() => setMemberDropdownOpen(true)}
                          placeholder="Buscar por nome ou email…"
                          autoComplete="new-password"
                          className="w-full border border-white/[0.16] bg-[var(--ink-2)] px-3 py-2 font-mono text-xs text-[var(--bone)] placeholder-[var(--bone-mute)] focus:outline-none focus:border-white/30"
                          style={{ borderRadius: 0 }}
                        />
                        {memberDropdownOpen && filtered.length > 0 && (
                          <div className="absolute z-10 max-h-52 w-full overflow-y-auto border border-white/[0.16] bg-[var(--ink)] shadow-xl">
                            {filtered.map((u) => {
                              const isSelected = selectedUserIds.includes(u.id)
                              return (
                                <button
                                  key={u.id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedUserIds((ids) =>
                                      isSelected ? ids.filter((i) => i !== u.id) : [...ids, u.id]
                                    )
                                    setMemberSearch('')
                                  }}
                                  className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-white/[0.05]"
                                >
                                  <span className={`flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center border ${isSelected ? 'border-[var(--ember)] bg-[var(--ember)]' : 'border-white/30'}`}>
                                    {isSelected && <Check className="h-2.5 w-2.5 text-[var(--void)]" />}
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block font-mono text-[11px] text-[var(--bone)]">{u.name}</span>
                                    <span className="block font-mono text-[10px] text-[var(--bone-mute)]">{u.email}</span>
                                  </span>
                                </button>
                              )
                            })}
                          </div>
                        )}
                        {memberDropdownOpen && memberSearch !== '' && filtered.length === 0 && (
                          <div className="absolute z-10 w-full border border-white/[0.16] bg-[var(--ink)] px-3 py-2 font-mono text-[10px] text-[var(--bone-mute)]">
                            Nenhum usuário encontrado
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <FieldLabel>Papel</FieldLabel>
                        <SelectInput
                          value={memberRole}
                          onChange={setMemberRole}
                          options={[
                            { value: 'STUDENT', label: 'Aluno' },
                            { value: 'MONITOR', label: 'Monitor' },
                            { value: 'MENTOR', label: 'Mentor' },
                          ]}
                        />
                      </div>
                      <div>
                        <FieldLabel>Expira em (vazio = vitalício)</FieldLabel>
                        <TextInput type="date" value={memberExpiresAt} onChange={setMemberExpiresAt} />
                      </div>
                    </div>

                    {memberError && (
                      <p className="mt-2 font-mono text-xs text-red-400">{memberError}</p>
                    )}

                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        disabled={memberPending || !selectedUserIds.length}
                        style={{ borderRadius: 0 }}
                        className="bg-[var(--ember)] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[var(--void)] disabled:opacity-40"
                        onClick={handleAddMember}
                      >
                        {memberPending
                          ? 'Adicionando...'
                          : selectedUserIds.length > 1
                            ? `Adicionar ${selectedUserIds.length} membros`
                            : 'Adicionar'}
                      </button>
                      <button
                        type="button"
                        style={{ borderRadius: 0 }}
                        className="border border-white/[0.07] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]"
                        onClick={() => { setShowAddMember(false); setMemberError(null); setSelectedUserIds([]); setMemberSearch('') }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                  )
                })()}

                <div className="overflow-x-auto">
                <table className="w-full" style={{ borderRadius: 0 }}>
                  <thead>
                    <tr className="border-b border-white/[0.07] bg-[var(--ink-2)]">
                      {['Aluno', 'Papel', 'Status', 'Expira em', 'Acoes'].map((h) => (
                        <th
                          key={h}
                          className="px-3 py-2.5 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {members.map((m) => (
                      <tr key={m.id} className="hover:bg-white/[0.02]">
                        <td className="px-3 py-3">
                          <div className="flex flex-col">
                            <span className="font-mono text-xs text-[var(--bone)]">{m.userName}</span>
                            <span className="font-mono text-[10px] text-[var(--bone-mute)]">{m.userEmail}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className="font-mono text-[10px] text-[var(--bone-dim)]">
                            {MEMBER_ROLE_LABELS[m.member_role] ?? m.member_role}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`font-mono text-[10px] ${MEMBER_STATUS_COLORS[m.status] ?? 'text-[var(--bone-mute)]'}`}
                          >
                            {m.status}
                          </span>
                        </td>
                        <td className="px-3 py-3 font-mono text-xs text-[var(--bone-mute)]">
                          {formatDate(m.expires_at)}
                        </td>
                        <td className="px-3 py-3">
                          <button
                            type="button"
                            className="font-mono text-[10px] text-red-400/50 transition-colors hover:text-red-400"
                            onClick={async () => {
                              if (!confirm(`Remover ${m.userName} da turma?`)) return
                              await removeMemberFromCohort(m.id)
                              router.refresh()
                            }}
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Section 8 — Sessoes ao vivo */}
      <div id="section-sessoes" className="border border-white/[0.07]">
        <SectionHeader
          idx={8}
          label="Sessoes ao Vivo"
          open={openSections.has('sessoes')}
          onToggle={() => toggleSection('sessoes')}
        />
        {openSections.has('sessoes') && (
          <div className="bg-[var(--ink-2)]/30 p-5">
            {!isEdit ? (
              <p className="font-mono text-xs text-[var(--bone-mute)]">
                Salve a turma primeiro para agendar sessoes.
              </p>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--bone-mute)]">
                    {liveSessions.length} encontro{liveSessions.length !== 1 ? 's' : ''}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (!showAddSession) setNewSessionDate(getDefaultSessionDate())
                      setShowAddSession(!showAddSession)
                      setSessionError(null)
                    }}
                    style={{ borderRadius: 0 }}
                    className="flex items-center gap-1.5 border border-white/[0.07] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] transition-colors hover:border-white/[0.16] hover:text-[var(--bone-dim)]"
                  >
                    <Plus className="h-3 w-3" />
                    Adicionar Encontro
                  </button>
                </div>

                {showAddSession && (
                  <div className="mb-4 border border-white/[0.07] p-4">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                      Novo encontro ao vivo
                    </p>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <FieldLabel>Titulo *</FieldLabel>
                        <TextInput
                          value={newSessionTitle}
                          onChange={setNewSessionTitle}
                          placeholder="Aula ao Vivo — Closures"
                        />
                      </div>
                      <div>
                        <FieldLabel>Data e hora * (horario de Brasilia)</FieldLabel>
                        <TextInput
                          type="datetime-local"
                          value={newSessionDate}
                          onChange={setNewSessionDate}
                        />
                      </div>
                      <div>
                        <FieldLabel>Duracao (minutos)</FieldLabel>
                        <TextInput
                          type="number"
                          value={newSessionDuration}
                          onChange={setNewSessionDuration}
                          placeholder="90"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <FieldLabel>Link do encontro (Google Meet, Zoom etc.)</FieldLabel>
                        <TextInput
                          value={newSessionUrl}
                          onChange={setNewSessionUrl}
                          placeholder="https://meet.google.com/..."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <FieldLabel>Link da gravacao (preencher apos o encontro)</FieldLabel>
                        <TextInput
                          value={newSessionRecordingUrl}
                          onChange={setNewSessionRecordingUrl}
                          placeholder="https://youtube.com/watch?v=..."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <FieldLabel>Descricao (opcional)</FieldLabel>
                        <textarea
                          value={newSessionDescription}
                          onChange={(e) => setNewSessionDescription(e.target.value)}
                          rows={2}
                          placeholder="Topicos que serao abordados neste encontro..."
                          style={{ borderRadius: 0 }}
                          className="w-full border border-white/[0.16] bg-[var(--ink-2)] px-3 py-2.5 font-mono text-sm text-[var(--bone)] placeholder-[var(--bone-mute)] focus:border-[var(--ember)]/50 focus:outline-none"
                        />
                      </div>
                    </div>
                    {sessionError && (
                      <p className="mt-2 font-mono text-xs text-red-400">{sessionError}</p>
                    )}
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        disabled={sessionPending || !newSessionTitle || !newSessionDate}
                        style={{ borderRadius: 0 }}
                        className="bg-[var(--ember)] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[var(--void)] disabled:opacity-40"
                        onClick={() => {
                          if (!isEdit || !newSessionTitle || !newSessionDate) return
                          setSessionError(null)
                          startSessionTransition(async () => {
                            try {
                              await createLiveSession({
                                cohortId: props.cohort.id,
                                title: newSessionTitle,
                                description: newSessionDescription || undefined,
                                scheduledAt: new Date(newSessionDate).toISOString(),
                                durationMinutes: parseInt(newSessionDuration, 10) || 90,
                                meetingUrl: newSessionUrl || undefined,
                                recordingUrl: newSessionRecordingUrl || undefined,
                              })
                              setShowAddSession(false)
                              setNewSessionTitle('')
                              setNewSessionDate('')
                              setNewSessionDuration('90')
                              setNewSessionUrl('')
                              setNewSessionDescription('')
                              setNewSessionRecordingUrl('')
                              router.refresh()
                            } catch (err) {
                              setSessionError(err instanceof Error ? err.message : 'Erro ao criar encontro')
                            }
                          })
                        }}
                      >
                        {sessionPending ? 'Salvando...' : 'Salvar'}
                      </button>
                      <button
                        type="button"
                        style={{ borderRadius: 0 }}
                        className="border border-white/[0.07] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]"
                        onClick={() => { setShowAddSession(false); setSessionError(null) }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  {liveSessions.map((ls, idx) => {
                    const isEditing = editingSessionId === ls.id
                    const isPast = new Date(ls.scheduled_at) < new Date()
                    const prevWasFuture = idx > 0 && new Date(liveSessions[idx - 1]!.scheduled_at) >= new Date()
                    const showPastDivider = isPast && prevWasFuture

                    let sessionBadge: { label: string; className: string }
                    if (!isPast) {
                      sessionBadge = { label: 'Agendado', className: 'text-green-400' }
                    } else if (ls.recording_url) {
                      sessionBadge = { label: 'Realizado', className: 'text-blue-400' }
                    } else {
                      sessionBadge = { label: 'Encerrado', className: 'text-[var(--bone-mute)]' }
                    }

                    return (
                      <div key={ls.id}>
                        {showPastDivider && (
                          <div className="my-3 flex items-center gap-2">
                            <div className="flex-1 border-t border-white/[0.07]" />
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--bone-mute)]">Passados</span>
                            <div className="flex-1 border-t border-white/[0.07]" />
                          </div>
                        )}
                      <div className="border border-white/[0.07]">
                        {/* Row — collapsed view */}
                        {!isEditing && (
                          <div className="flex items-center justify-between px-4 py-3">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <p className="truncate font-mono text-xs text-[var(--bone)]">{ls.title}</p>
                                <span className={`shrink-0 font-mono text-[9px] uppercase tracking-widest ${sessionBadge.className}`}>
                                  {sessionBadge.label}
                                </span>
                              </div>
                              <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5">
                                <span className="font-mono text-[10px] text-[var(--bone-mute)]">
                                  {formatDateTimeBR(ls.scheduled_at)} · {ls.duration_minutes} min
                                </span>
                                {ls.meeting_url && (
                                  <a
                                    href={ls.meeting_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-[10px] text-[var(--ember)]/70 transition-colors hover:text-[var(--ember)] truncate max-w-[200px]"
                                  >
                                    Link do encontro
                                  </a>
                                )}
                                {ls.recording_url && (
                                  <a
                                    href={ls.recording_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-[10px] text-blue-400/70 transition-colors hover:text-blue-400"
                                  >
                                    Gravacao
                                  </a>
                                )}
                              </div>
                            </div>
                            <div className="ml-4 flex shrink-0 items-center gap-3">
                              <button
                                type="button"
                                className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]"
                                onClick={() => {
                                  setEditingSessionId(ls.id)
                                  setEditSessionTitle(ls.title)
                                  setEditSessionDate(toDatetimeLocalValue(ls.scheduled_at))
                                  setEditSessionDuration(String(ls.duration_minutes))
                                  setEditSessionUrl(ls.meeting_url ?? '')
                                  setEditSessionRecordingUrl(ls.recording_url ?? '')
                                  setEditSessionDescription(ls.description ?? '')
                                  setEditSessionError(null)
                                }}
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                className="text-red-400/50 transition-colors hover:text-red-400"
                                onClick={() => {
                                  if (!isEdit) return
                                  if (!confirm(`Excluir o encontro "${ls.title}"? Esta ação não pode ser desfeita.`)) return
                                  startTransition(async () => {
                                    await deleteLiveSession(ls.id, props.cohort.id)
                                    router.refresh()
                                  })
                                }}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Inline edit form */}
                        {isEditing && (
                          <div className="bg-[var(--ink-2)]/50 p-4">
                            <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                              Editando encontro
                            </p>
                            <div className="grid gap-3 md:grid-cols-2">
                              <div className="md:col-span-2">
                                <FieldLabel>Titulo *</FieldLabel>
                                <TextInput
                                  value={editSessionTitle}
                                  onChange={setEditSessionTitle}
                                  placeholder="Aula ao Vivo — Closures"
                                />
                              </div>
                              <div>
                                <FieldLabel>Data e hora * (horario de Brasilia)</FieldLabel>
                                <TextInput
                                  type="datetime-local"
                                  value={editSessionDate}
                                  onChange={setEditSessionDate}
                                />
                              </div>
                              <div>
                                <FieldLabel>Duracao (minutos)</FieldLabel>
                                <TextInput
                                  type="number"
                                  value={editSessionDuration}
                                  onChange={setEditSessionDuration}
                                  placeholder="90"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <FieldLabel>Link do encontro (Google Meet, Zoom etc.)</FieldLabel>
                                <TextInput
                                  value={editSessionUrl}
                                  onChange={setEditSessionUrl}
                                  placeholder="https://meet.google.com/..."
                                />
                              </div>
                              <div className="md:col-span-2">
                                <FieldLabel>Link da gravacao (preencher apos o encontro)</FieldLabel>
                                <TextInput
                                  value={editSessionRecordingUrl}
                                  onChange={setEditSessionRecordingUrl}
                                  placeholder="https://youtube.com/watch?v=..."
                                />
                              </div>
                              <div className="md:col-span-2">
                                <FieldLabel>Descricao (opcional)</FieldLabel>
                                <textarea
                                  value={editSessionDescription}
                                  onChange={(e) => setEditSessionDescription(e.target.value)}
                                  rows={2}
                                  placeholder="Topicos que serao abordados neste encontro..."
                                  style={{ borderRadius: 0 }}
                                  className="w-full border border-white/[0.16] bg-[var(--ink-2)] px-3 py-2.5 font-mono text-sm text-[var(--bone)] placeholder-[var(--bone-mute)] focus:border-[var(--ember)]/50 focus:outline-none"
                                />
                              </div>
                            </div>
                            {editSessionError && (
                              <p className="mt-2 font-mono text-xs text-red-400">{editSessionError}</p>
                            )}
                            <div className="mt-3 flex gap-2">
                              <button
                                type="button"
                                disabled={editSessionPending || !editSessionTitle || !editSessionDate}
                                style={{ borderRadius: 0 }}
                                className="bg-[var(--ember)] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[var(--void)] disabled:opacity-40"
                                onClick={() => {
                                  if (!isEdit || !editSessionTitle || !editSessionDate) return
                                  setEditSessionError(null)
                                  startEditSessionTransition(async () => {
                                    try {
                                      await updateLiveSession(ls.id, props.cohort.id, {
                                        title: editSessionTitle,
                                        description: editSessionDescription || undefined,
                                        scheduledAt: new Date(editSessionDate).toISOString(),
                                        durationMinutes: parseInt(editSessionDuration, 10) || 90,
                                        meetingUrl: editSessionUrl || undefined,
                                        recordingUrl: editSessionRecordingUrl || undefined,
                                      })
                                      setEditingSessionId(null)
                                      router.refresh()
                                    } catch (err) {
                                      setEditSessionError(err instanceof Error ? err.message : 'Erro ao atualizar encontro')
                                    }
                                  })
                                }}
                              >
                                {editSessionPending ? 'Salvando...' : 'Salvar alteracoes'}
                              </button>
                              <button
                                type="button"
                                style={{ borderRadius: 0 }}
                                className="border border-white/[0.07] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]"
                                onClick={() => { setEditingSessionId(null); setEditSessionError(null) }}
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Section 9 — Cupons */}
      <div id="section-cupons" className="border border-white/[0.07]">
        <SectionHeader
          idx={9}
          label="Cupons"
          open={openSections.has('cupons')}
          onToggle={() => toggleSection('cupons')}
        />
        {openSections.has('cupons') && (
          <div className="bg-[var(--ink-2)]/30 p-5">
            {!isEdit ? (
              <p className="font-mono text-xs text-[var(--bone-mute)]">
                Salve a turma primeiro para criar cupons.
              </p>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--bone-mute)]">
                    {coupons.length} cupom{coupons.length !== 1 ? 'ns' : ''}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAddCoupon(!showAddCoupon)}
                    style={{ borderRadius: 0 }}
                    className="flex items-center gap-1.5 border border-white/[0.07] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] transition-colors hover:border-white/[0.16] hover:text-[var(--bone-dim)]"
                  >
                    <Plus className="h-3 w-3" />
                    Novo Cupom
                  </button>
                </div>

                {showAddCoupon && (
                  <div className="mb-4 border border-white/[0.07] p-4">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                      Criar cupom
                    </p>
                    <div className="grid gap-3 md:grid-cols-3">
                      <div>
                        <FieldLabel>Codigo</FieldLabel>
                        <TextInput
                          value={newCouponCode}
                          onChange={setNewCouponCode}
                          placeholder="LAUNCH50"
                        />
                      </div>
                      <div>
                        <FieldLabel>Tipo de desconto</FieldLabel>
                        <SelectInput
                          value={newCouponKind}
                          onChange={setNewCouponKind}
                          options={[
                            { value: 'PERCENT', label: 'Percentual (%)' },
                            { value: 'FIXED', label: 'Valor fixo (R$)' },
                          ]}
                        />
                      </div>
                      <div>
                        <FieldLabel>
                          {newCouponKind === 'PERCENT' ? 'Percentual (0-100)' : 'Valor (R$)'}
                        </FieldLabel>
                        <TextInput
                          type="number"
                          value={newCouponValue}
                          onChange={setNewCouponValue}
                          placeholder={newCouponKind === 'PERCENT' ? '50' : '99.90'}
                        />
                      </div>
                      <div>
                        <FieldLabel>Aplica em</FieldLabel>
                        <SelectInput
                          value={newCouponAppliesTo}
                          onChange={setNewCouponAppliesTo}
                          options={[
                            { value: 'ENTRY', label: 'Entrada' },
                            { value: 'EXTENSION', label: 'Extensao' },
                            { value: 'BOTH', label: 'Ambos' },
                          ]}
                        />
                      </div>
                    </div>
                    {couponError && (
                      <p className="mt-2 font-mono text-xs text-red-400">{couponError}</p>
                    )}
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        disabled={couponPending}
                        style={{ borderRadius: 0 }}
                        className="bg-[var(--ember)] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[var(--void)] disabled:opacity-40"
                        onClick={handleSaveCoupon}
                      >
                        {couponPending ? 'Salvando...' : 'Salvar'}
                      </button>
                      <button
                        type="button"
                        style={{ borderRadius: 0 }}
                        className="border border-white/[0.07] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]"
                        onClick={() => { setShowAddCoupon(false); setCouponError(null) }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                <div className="overflow-x-auto">
                <table className="w-full" style={{ borderRadius: 0 }}>
                  <thead>
                    <tr className="border-b border-white/[0.07] bg-[var(--ink-2)]">
                      {['Codigo', 'Desconto', 'Aplica em', 'Usos', 'Status', 'Acoes'].map((h) => (
                        <th
                          key={h}
                          className="px-3 py-2.5 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {coupons.map((c) => (
                      <tr key={c.id} className="hover:bg-white/[0.02]">
                        <td className="px-3 py-3 font-mono text-xs font-medium text-[var(--bone)]">
                          {c.code}
                        </td>
                        <td className="px-3 py-3 font-mono text-xs text-[var(--bone-dim)]">
                          {c.discount_kind === 'PERCENT'
                            ? `${c.discount_value}%`
                            : formatBRL(c.discount_value)}
                        </td>
                        <td className="px-3 py-3 font-mono text-[10px] text-[var(--bone-mute)]">
                          {c.applies_to}
                        </td>
                        <td className="px-3 py-3 font-mono text-xs text-[var(--bone-mute)]">
                          {c.current_uses}
                          {c.max_uses ? ` / ${c.max_uses}` : ''}
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`font-mono text-[10px] ${c.is_active ? 'text-green-400' : 'text-[var(--bone-mute)]'}`}
                          >
                            {c.is_active ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <button
                            type="button"
                            className="text-red-400/50 transition-colors hover:text-red-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-3 border-t border-white/[0.07] pt-6">
        {saveError && (
          <p className="font-mono text-xs text-red-400">{saveError}</p>
        )}
        <div className="flex items-center justify-between">
          <Link
            href="/academy/admin/turmas"
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar para Turmas
          </Link>

          <div className="flex items-center gap-3">
            {saved && (
              <span className="flex items-center gap-1.5 font-mono text-xs text-green-400">
                <Check className="h-3.5 w-3.5" />
                Salvo
              </span>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={pending}
              style={{ borderRadius: 0 }}
              className="flex items-center gap-2 bg-[var(--ember)] px-6 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--void)] transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <Save className="h-3.5 w-3.5" />
              {pending ? 'Salvando...' : isEdit ? 'Salvar alteracoes' : 'Criar turma'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
