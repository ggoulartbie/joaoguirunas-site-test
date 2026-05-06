'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  MOCK_COURSES,
  MOCK_COHORTS,
  type MockCohort,
} from '@/components/admin/mock-data'
import type { Database } from '@/types/database'
import {
  ChevronDown,
  ChevronRight,
  Check,
  Plus,
  Trash2,
  Save,
  ArrowLeft,
} from 'lucide-react'
import { createCohort, updateCohort, addMemberByCohortEmail, createCoupon } from './actions'

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

type CohortFormProps =
  | { mode: 'create' }
  | {
      mode: 'edit'
      cohort: MockCohort
      cohortCourses: CohortCourse[]
      crossExtensions: CrossExtension[]
      members: CohortMember[]
      liveSessions: LiveSession[]
      coupons: Coupon[]
    }

const SECTIONS = [
  { id: 'identidade', label: 'Identidade' },
  { id: 'status', label: 'Status e Datas' },
  { id: 'acesso', label: 'Acesso' },
  { id: 'cursos', label: 'Cursos Liberados' },
  { id: 'comercial', label: 'Comercial' },
  { id: 'extensoes', label: 'Extensões Cruzadas' },
  { id: 'membros', label: 'Membros' },
  { id: 'sessoes', label: 'Sessões ao Vivo' },
  { id: 'cupons', label: 'Cupons' },
] as const

type SectionId = (typeof SECTIONS)[number]['id']

function SectionHeader({
  id,
  label,
  open,
  onToggle,
}: {
  id: string
  label: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between border-b border-white/10 px-1 py-3 text-left transition-colors hover:text-white"
    >
      <span className="font-mono text-xs font-semibold uppercase tracking-widest text-white/70">
        {id.padStart(2, '0').slice(-2).toUpperCase()} — {label}
      </span>
      {open ? (
        <ChevronDown className="h-4 w-4 text-white/40" />
      ) : (
        <ChevronRight className="h-4 w-4 text-white/40" />
      )}
    </button>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-white/40">
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
      className="w-full border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-sm text-white/80 placeholder-white/20 focus:border-white/20 focus:outline-none"
    />
  )
}

function Toggle({
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
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 transition-colors ${checked ? 'bg-[#FF3A0E]' : 'bg-white/10'}`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 bg-white transition-transform ${checked ? 'translate-x-4' : 'translate-x-0.5'}`}
        />
      </button>
      <span className="font-mono text-xs text-white/60">{label}</span>
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
      className="w-full border border-white/10 bg-[#0C0C12] px-3 py-2 font-mono text-sm text-white/80 focus:border-white/20 focus:outline-none"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
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

const STATUS_OPTIONS = [
  { value: 'DRAFT', label: 'Rascunho' },
  { value: 'OPEN', label: 'Aberta' },
  { value: 'IN_PROGRESS', label: 'Em Andamento' },
  { value: 'CLOSED', label: 'Encerrada' },
  { value: 'ARCHIVED', label: 'Arquivada' },
]

const MEMBER_ROLE_LABELS: Record<string, string> = {
  STUDENT: 'Aluno',
  MONITOR: 'Monitor',
  MENTOR: 'Mentor',
}

const MEMBER_STATUS_COLORS: Record<string, string> = {
  ACTIVE: 'text-emerald-400',
  EXPIRED: 'text-white/30',
  REMOVED: 'text-red-400',
  PAST_DUE: 'text-amber-400',
}

export function CohortForm(props: CohortFormProps) {
  const isEdit = props.mode === 'edit'
  const initial = isEdit ? props.cohort : null
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
  // selectedCourses: courseId -> Set<moduleId> | null (null = todos módulos)
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

  // Section 6 — Extensões cruzadas
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

  // Section 7 — Membros (read-only list + add modal state)
  const members = isEdit ? props.members : []
  const [showAddMember, setShowAddMember] = useState(false)
  const [memberEmail, setMemberEmail] = useState('')
  const [memberRole, setMemberRole] = useState('STUDENT')
  const [memberExpiresAt, setMemberExpiresAt] = useState('')
  const [memberError, setMemberError] = useState<string | null>(null)
  const [memberPending, startMemberTransition] = useTransition()

  // Section 8 — Sessões ao vivo
  const liveSessions = isEdit ? props.liveSessions : []
  const [showAddSession, setShowAddSession] = useState(false)
  const [newSessionTitle, setNewSessionTitle] = useState('')
  const [newSessionDate, setNewSessionDate] = useState('')
  const [newSessionDuration, setNewSessionDuration] = useState('90')
  const [newSessionUrl, setNewSessionUrl] = useState('')

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
        next[courseId] = null // null = todos os módulos
        setExpandedCourses((e) => new Set([...e, courseId]))
      }
      return next
    })
  }

  function toggleModuleSelection(courseId: string, moduleId: string) {
    setSelectedCourses((prev) => {
      const next = { ...prev }
      const course = MOCK_COURSES.find((c) => c.id === courseId)
      if (!course) return prev

      const allModuleIds = course.modules.map((m) => m.id)
      let current: Set<string> | null = next[courseId] ?? null

      if (current === null) {
        // era "todos" → excluir este módulo
        current = new Set(allModuleIds.filter((id) => id !== moduleId))
      } else if (current.has(moduleId)) {
        current = new Set(current)
        current.delete(moduleId)
        if (current.size === 0) {
          // nenhum módulo → desselecionar curso
          delete next[courseId]
          return next
        }
      } else {
        current = new Set(current)
        current.add(moduleId)
        if (current.size === allModuleIds.length) {
          current = null // todos selecionados → compactar
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
    // B7: build cohortCourses from selectedCourses state
    const cohortCoursesPayload = Object.entries(selectedCourses).map(([courseId, moduleSet]) => ({
      courseId,
      includedModuleIds: moduleSet === null ? [] : Array.from(moduleSet),
    }))

    // B6: build crossExtensions from extensions state
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
        router.push('/admin/turmas')
      } catch (err) {
        setSaveError(err instanceof Error ? err.message : 'Erro ao salvar')
      }
    })
  }

  function handleAddMember() {
    if (!isEdit || !memberEmail) return
    setMemberError(null)
    startMemberTransition(async () => {
      try {
        // B4: pass memberRole so the action respects the selected role
        await addMemberByCohortEmail(
          props.cohort.id,
          memberEmail,
          memberRole as 'STUDENT' | 'MENTOR',
          memberExpiresAt || undefined,
        )
        setShowAddMember(false)
        setMemberEmail('')
        setMemberExpiresAt('')
        setMemberRole('STUDENT')
        router.refresh()
      } catch (err) {
        setMemberError(err instanceof Error ? err.message : 'Erro ao adicionar membro')
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
      setCouponError('Preencha o código e o valor do desconto')
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
            className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
              openSections.has(id)
                ? 'bg-[#FF3A0E]/10 text-[#FF3A0E]'
                : 'border border-white/10 text-white/30 hover:text-white/60'
            }`}
          >
            {sectionIndexMap[id]}. {label}
          </button>
        ))}
      </div>

      {/* Section 1 — Identidade */}
      <div id="section-identidade" className="border border-white/10 bg-white/[0.01]">
        <SectionHeader
          id="01"
          label="Identidade"
          open={openSections.has('identidade')}
          onToggle={() => toggleSection('identidade')}
        />
        {openSections.has('identidade') && (
          <div className="grid gap-4 p-5 md:grid-cols-2">
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
              <FieldLabel>Descrição</FieldLabel>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Descreva brevemente o que esta turma oferece..."
                className="w-full border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-sm text-white/80 placeholder-white/20 focus:border-white/20 focus:outline-none"
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
      <div id="section-status" className="border border-white/10 bg-white/[0.01]">
        <SectionHeader
          id="02"
          label="Status e Datas"
          open={openSections.has('status')}
          onToggle={() => toggleSection('status')}
        />
        {openSections.has('status') && (
          <div className="grid gap-4 p-5 md:grid-cols-3">
            <div>
              <FieldLabel>Status *</FieldLabel>
              <SelectInput
                value={status}
                onChange={setStatus}
                options={STATUS_OPTIONS}
              />
            </div>
            <div>
              <FieldLabel>Data de início</FieldLabel>
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
      <div id="section-acesso" className="border border-white/10 bg-white/[0.01]">
        <SectionHeader
          id="03"
          label="Acesso"
          open={openSections.has('acesso')}
          onToggle={() => toggleSection('acesso')}
        />
        {openSections.has('acesso') && (
          <div className="grid gap-4 p-5 md:grid-cols-2">
            <div>
              <FieldLabel>Duração do acesso (dias — vazio = vitalício)</FieldLabel>
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
            <div className="flex flex-col gap-3">
              <Toggle
                checked={hasLiveSessions}
                onChange={setHasLiveSessions}
                label="Tem sessões ao vivo"
              />
              <Toggle
                checked={hasSupport}
                onChange={setHasSupport}
                label="Tem suporte dedicado"
              />
            </div>
          </div>
        )}
      </div>

      {/* Section 4 — Cursos liberados */}
      <div id="section-cursos" className="border border-white/10 bg-white/[0.01]">
        <SectionHeader
          id="04"
          label="Cursos Liberados"
          open={openSections.has('cursos')}
          onToggle={() => toggleSection('cursos')}
        />
        {openSections.has('cursos') && (
          <div className="p-5">
            <p className="mb-4 font-mono text-[10px] text-white/30">
              Selecione cursos e, opcionalmente, quais módulos específicos liberar. Deixar
              sub-itens desmarcados equivale a liberar todos os módulos do curso.
            </p>
            <div className="space-y-2">
              {MOCK_COURSES.map((course) => {
                const isCourseSelected = course.id in selectedCourses
                const isExpanded = expandedCourses.has(course.id)

                return (
                  <div key={course.id} className="border border-white/5">
                    {/* Course row */}
                    <div className="flex items-center gap-3 px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggleCourseSelection(course.id)}
                        className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors ${
                          isCourseSelected
                            ? 'border-[#FF3A0E] bg-[#FF3A0E]'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                        aria-label={`Selecionar ${course.title}`}
                      >
                        {isCourseSelected && <Check className="h-2.5 w-2.5 text-white" />}
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
                          className={`font-mono text-sm ${isCourseSelected ? 'text-white/90' : 'text-white/50'}`}
                        >
                          {course.title}
                        </span>
                        <span className="font-mono text-[10px] text-white/20">
                          {course.modules.length} módulo{course.modules.length !== 1 ? 's' : ''}
                        </span>
                        {isExpanded ? (
                          <ChevronDown className="ml-auto h-3 w-3 text-white/30" />
                        ) : (
                          <ChevronRight className="ml-auto h-3 w-3 text-white/30" />
                        )}
                      </button>

                      {isCourseSelected && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedCourses((prev) => ({ ...prev, [course.id]: null }))
                            }
                            className="font-mono text-[9px] uppercase tracking-wider text-white/30 hover:text-white/60"
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
                            className="font-mono text-[9px] uppercase tracking-wider text-white/30 hover:text-white/60"
                          >
                            Limpar
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Modules */}
                    {isExpanded && (
                      <div className="border-t border-white/5 bg-white/[0.01]">
                        {course.modules.map((mod) => {
                          const isModSel = isModuleSelected(course.id, mod.id)
                          return (
                            <div
                              key={mod.id}
                              className="flex items-center gap-3 py-2.5 pl-10 pr-4"
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
                                className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center border transition-colors ${
                                  isModSel
                                    ? 'border-[#FF3A0E]/70 bg-[#FF3A0E]/70'
                                    : 'border-white/15 hover:border-white/30'
                                }`}
                                aria-label={`Selecionar módulo ${mod.title}`}
                              >
                                {isModSel && <Check className="h-2 w-2 text-white" />}
                              </button>
                              <span
                                className={`font-mono text-xs ${isModSel ? 'text-white/70' : 'text-white/30'}`}
                              >
                                {mod.title}
                              </span>
                              <span className="ml-auto font-mono text-[10px] text-white/20">
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
              <p className="mt-3 font-mono text-[10px] text-white/30">
                {Object.keys(selectedCourses).length} curso
                {Object.keys(selectedCourses).length !== 1 ? 's' : ''} selecionado
                {Object.keys(selectedCourses).length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Section 5 — Comercial */}
      <div id="section-comercial" className="border border-white/10 bg-white/[0.01]">
        <SectionHeader
          id="05"
          label="Comercial"
          open={openSections.has('comercial')}
          onToggle={() => toggleSection('comercial')}
        />
        {openSections.has('comercial') && (
          <div className="space-y-4 p-5">
            <div className="flex flex-col gap-3">
              <Toggle
                checked={isPurchasable}
                onChange={setIsPurchasable}
                label="Turma vendável (gera Stripe Price)"
              />
              <Toggle
                checked={hasPublicPage}
                onChange={setHasPublicPage}
                label="Tem página pública (/turmas/[slug])"
              />
              <Toggle
                checked={allowsAutoRenewal}
                onChange={setAllowsAutoRenewal}
                label="Permite renovação automática"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>Preço de entrada (R$)</FieldLabel>
                <TextInput
                  type="number"
                  value={entryPriceBRL}
                  onChange={setEntryPriceBRL}
                  placeholder="499.00"
                />
              </div>
              <div>
                <FieldLabel>Preço de extensão (R$)</FieldLabel>
                <TextInput
                  type="number"
                  value={extensionPriceBRL}
                  onChange={setExtensionPriceBRL}
                  placeholder="299.00"
                />
              </div>
              <div>
                <FieldLabel>Parcelas máximas — entrada</FieldLabel>
                <TextInput
                  type="number"
                  value={maxInstEntry}
                  onChange={setMaxInstEntry}
                  placeholder="1"
                />
              </div>
              <div>
                <FieldLabel>Parcelas máximas — extensão</FieldLabel>
                <TextInput
                  type="number"
                  value={maxInstExt}
                  onChange={setMaxInstExt}
                  placeholder="1"
                />
              </div>
              <div>
                <FieldLabel>Dias adicionados por extensão</FieldLabel>
                <TextInput
                  type="number"
                  value={extDurationDays}
                  onChange={setExtDurationDays}
                  placeholder="180"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section 6 — Extensões cruzadas */}
      <div id="section-extensoes" className="border border-white/10 bg-white/[0.01]">
        <SectionHeader
          id="06"
          label="Extensões Cruzadas"
          open={openSections.has('extensoes')}
          onToggle={() => toggleSection('extensoes')}
        />
        {openSections.has('extensoes') && (
          <div className="p-5">
            <p className="mb-4 font-mono text-[10px] text-white/30">
              Quando alguém comprar esta turma, quantos dias são adicionados em outras turmas?
            </p>

            <div className="space-y-3">
              {extensions.map((ext, idx) => (
                <div key={idx} className="border border-white/5 p-4">
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
                          ...MOCK_COHORTS.filter((c) => c.id !== initial?.id).map((c) => ({
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
                      <Toggle
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
                      <FieldLabel>Descrição</FieldLabel>
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
              className="mt-3 flex items-center gap-2 border border-white/10 px-3 py-2 font-mono text-xs text-white/40 transition-colors hover:border-white/20 hover:text-white/70"
            >
              <Plus className="h-3.5 w-3.5" />
              Adicionar extensão cruzada
            </button>
          </div>
        )}
      </div>

      {/* Section 7 — Membros */}
      <div id="section-membros" className="border border-white/10 bg-white/[0.01]">
        <SectionHeader
          id="07"
          label="Membros"
          open={openSections.has('membros')}
          onToggle={() => toggleSection('membros')}
        />
        {openSections.has('membros') && (
          <div className="p-5">
            {!isEdit ? (
              <p className="font-mono text-xs text-white/30">
                Salve a turma primeiro para adicionar membros.
              </p>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-white/40">
                    {members.length} membro{members.length !== 1 ? 's' : ''}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAddMember(true)}
                    className="flex items-center gap-1.5 border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/40 transition-colors hover:border-white/20 hover:text-white/70"
                  >
                    <Plus className="h-3 w-3" />
                    Adicionar
                  </button>
                </div>

                {showAddMember && (
                  <div className="mb-4 border border-white/10 p-4">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-white/30">
                      Adicionar membro manualmente
                    </p>
                    <div className="grid gap-3 md:grid-cols-3">
                      <div>
                        <FieldLabel>E-mail do aluno</FieldLabel>
                        <TextInput
                          value={memberEmail}
                          onChange={setMemberEmail}
                          placeholder="aluno@exemplo.com"
                        />
                      </div>
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
                        disabled={memberPending || !memberEmail}
                        className="bg-[#FF3A0E] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white disabled:opacity-40"
                        onClick={handleAddMember}
                      >
                        {memberPending ? 'Adicionando...' : 'Adicionar'}
                      </button>
                      <button
                        type="button"
                        className="border border-white/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white/40"
                        onClick={() => { setShowAddMember(false); setMemberError(null) }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      {['Aluno', 'Papel', 'Status', 'Expira em', 'Ações'].map((h) => (
                        <th
                          key={h}
                          className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-wider text-white/30"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {members.map((m) => (
                      <tr key={m.id} className="hover:bg-white/[0.02]">
                        <td className="px-3 py-3">
                          <div className="flex flex-col">
                            <span className="font-mono text-xs text-white/80">{m.userName}</span>
                            <span className="font-mono text-[10px] text-white/30">{m.userEmail}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className="font-mono text-[10px] text-white/50">
                            {MEMBER_ROLE_LABELS[m.member_role] ?? m.member_role}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`font-mono text-[10px] ${MEMBER_STATUS_COLORS[m.status] ?? 'text-white/40'}`}
                          >
                            {m.status}
                          </span>
                        </td>
                        <td className="px-3 py-3 font-mono text-xs text-white/40">
                          {formatDate(m.expires_at)}
                        </td>
                        <td className="px-3 py-3">
                          <button
                            type="button"
                            className="font-mono text-[10px] text-red-400/50 transition-colors hover:text-red-400"
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}
      </div>

      {/* Section 8 — Sessões ao vivo */}
      <div id="section-sessoes" className="border border-white/10 bg-white/[0.01]">
        <SectionHeader
          id="08"
          label="Sessões ao Vivo"
          open={openSections.has('sessoes')}
          onToggle={() => toggleSection('sessoes')}
        />
        {openSections.has('sessoes') && (
          <div className="p-5">
            {!isEdit ? (
              <p className="font-mono text-xs text-white/30">
                Salve a turma primeiro para agendar sessões.
              </p>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-white/40">
                    {liveSessions.length} sessão{liveSessions.length !== 1 ? 'ões' : ''}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAddSession(!showAddSession)}
                    className="flex items-center gap-1.5 border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/40 transition-colors hover:border-white/20 hover:text-white/70"
                  >
                    <Plus className="h-3 w-3" />
                    Agendar
                  </button>
                </div>

                {showAddSession && (
                  <div className="mb-4 border border-white/10 p-4">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-white/30">
                      Nova sessão ao vivo
                    </p>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <FieldLabel>Título</FieldLabel>
                        <TextInput
                          value={newSessionTitle}
                          onChange={setNewSessionTitle}
                          placeholder="Aula ao Vivo — Closures"
                        />
                      </div>
                      <div>
                        <FieldLabel>Data e hora</FieldLabel>
                        <TextInput
                          type="datetime-local"
                          value={newSessionDate}
                          onChange={setNewSessionDate}
                        />
                      </div>
                      <div>
                        <FieldLabel>Duração (minutos)</FieldLabel>
                        <TextInput
                          type="number"
                          value={newSessionDuration}
                          onChange={setNewSessionDuration}
                          placeholder="90"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <FieldLabel>URL da reunião (liberada automaticamente 30min antes)</FieldLabel>
                        <TextInput
                          value={newSessionUrl}
                          onChange={setNewSessionUrl}
                          placeholder="https://meet.google.com/..."
                        />
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        className="bg-[#FF3A0E] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white"
                        onClick={() => setShowAddSession(false)}
                      >
                        Salvar
                      </button>
                      <button
                        type="button"
                        className="border border-white/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white/40"
                        onClick={() => setShowAddSession(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {liveSessions.map((ls) => (
                    <div key={ls.id} className="flex items-center justify-between border border-white/5 px-4 py-3">
                      <div>
                        <p className="font-mono text-xs text-white/80">{ls.title}</p>
                        <p className="font-mono text-[10px] text-white/30">
                          {formatDate(ls.scheduled_at)} · {ls.duration_minutes} min
                        </p>
                      </div>
                      <button
                        type="button"
                        className="text-red-400/50 transition-colors hover:text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Section 9 — Cupons */}
      <div id="section-cupons" className="border border-white/10 bg-white/[0.01]">
        <SectionHeader
          id="09"
          label="Cupons"
          open={openSections.has('cupons')}
          onToggle={() => toggleSection('cupons')}
        />
        {openSections.has('cupons') && (
          <div className="p-5">
            {!isEdit ? (
              <p className="font-mono text-xs text-white/30">
                Salve a turma primeiro para criar cupons.
              </p>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-white/40">
                    {coupons.length} cupom{coupons.length !== 1 ? 'ns' : ''}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAddCoupon(!showAddCoupon)}
                    className="flex items-center gap-1.5 border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/40 transition-colors hover:border-white/20 hover:text-white/70"
                  >
                    <Plus className="h-3 w-3" />
                    Novo Cupom
                  </button>
                </div>

                {showAddCoupon && (
                  <div className="mb-4 border border-white/10 p-4">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-white/30">
                      Criar cupom
                    </p>
                    <div className="grid gap-3 md:grid-cols-3">
                      <div>
                        <FieldLabel>Código</FieldLabel>
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
                          {newCouponKind === 'PERCENT' ? 'Percentual (0–100)' : 'Valor (R$)'}
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
                            { value: 'EXTENSION', label: 'Extensão' },
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
                        className="bg-[#FF3A0E] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white disabled:opacity-40"
                        onClick={handleSaveCoupon}
                      >
                        {couponPending ? 'Salvando...' : 'Salvar'}
                      </button>
                      <button
                        type="button"
                        className="border border-white/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white/40"
                        onClick={() => { setShowAddCoupon(false); setCouponError(null) }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      {['Código', 'Desconto', 'Aplica em', 'Usos', 'Status', 'Ações'].map((h) => (
                        <th
                          key={h}
                          className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-wider text-white/30"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {coupons.map((c) => (
                      <tr key={c.id} className="hover:bg-white/[0.02]">
                        <td className="px-3 py-3 font-mono text-xs font-medium text-white/80">
                          {c.code}
                        </td>
                        <td className="px-3 py-3 font-mono text-xs text-white/60">
                          {c.discount_kind === 'PERCENT'
                            ? `${c.discount_value}%`
                            : formatBRL(c.discount_value)}
                        </td>
                        <td className="px-3 py-3 font-mono text-[10px] text-white/40">
                          {c.applies_to}
                        </td>
                        <td className="px-3 py-3 font-mono text-xs text-white/40">
                          {c.current_uses}
                          {c.max_uses ? ` / ${c.max_uses}` : ''}
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`font-mono text-[10px] ${c.is_active ? 'text-emerald-400' : 'text-white/30'}`}
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
              </>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-3 border-t border-white/10 pt-6">
        {saveError && (
          <p className="font-mono text-xs text-red-400">{saveError}</p>
        )}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/turmas"
            className="flex items-center gap-2 font-mono text-xs text-white/40 transition-colors hover:text-white/70"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar para Turmas
          </Link>

          <div className="flex items-center gap-3">
            {saved && (
              <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                <Check className="h-3.5 w-3.5" />
                Salvo
              </span>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={pending}
              className="flex items-center gap-2 bg-[#FF3A0E] px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <Save className="h-3.5 w-3.5" />
              {pending ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Criar turma'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
