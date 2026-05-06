'use client'

import { useState, useTransition, useEffect, useRef } from 'react'
import { GraduationCap, Compass, User, ArrowRight, X } from 'lucide-react'
import { completeOnboarding } from '@/app/actions/notifications'

type Step = 1 | 2 | 3

const STEPS = [
  { id: 1 as Step, label: 'Boas-vindas' },
  { id: 2 as Step, label: 'Tour rápido' },
  { id: 3 as Step, label: 'Seu perfil' },
]

type Props = {
  userName: string | null
}

export function OnboardingWizard({ userName }: Props) {
  const [open, setOpen] = useState(true)
  const [step, setStep] = useState<Step>(1)
  const [name, setName] = useState(userName ?? '')
  const [bio, setBio] = useState('')
  const [pending, startTransition] = useTransition()
  const dialogRef = useRef<HTMLDivElement>(null)
  const firstFocusRef = useRef<HTMLButtonElement>(null)

  // Trap focus and handle Escape — but don't allow dismissal before completing
  useEffect(() => {
    if (!open) return
    firstFocusRef.current?.focus()

    function handleKey(e: KeyboardEvent) {
      // Escape only available on step 3 after they've had the tour
      if (e.key === 'Escape' && step === 3) handleSkip()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, step])

  function handleSkip() {
    startTransition(async () => {
      await completeOnboarding(name, bio)
      setOpen(false)
    })
  }

  function handleFinish() {
    startTransition(async () => {
      await completeOnboarding(name, bio)
      setOpen(false)
    })
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-md border border-white/10 bg-[#0C0C12] shadow-2xl"
      >
        {/* Progress bar */}
        <div className="flex h-1 bg-white/5">
          {STEPS.map((s) => (
            <div
              key={s.id}
              className={`flex-1 transition-colors ${step >= s.id ? 'bg-[#FF3A0E]' : 'bg-transparent'}`}
            />
          ))}
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            {STEPS.map((s) => (
              <div key={s.id} className="flex items-center gap-1.5">
                <div
                  className={`flex h-5 w-5 items-center justify-center font-mono text-[10px] ${
                    step === s.id
                      ? 'bg-[#FF3A0E] text-white'
                      : step > s.id
                      ? 'bg-[#FF3A0E]/30 text-[#FF3A0E]'
                      : 'bg-white/5 text-white/20'
                  }`}
                >
                  {s.id}
                </div>
                <span
                  className={`hidden font-mono text-[10px] uppercase tracking-wider sm:block ${
                    step === s.id ? 'text-white/70' : 'text-white/20'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          {step === 3 && (
            <button
              onClick={handleSkip}
              disabled={pending}
              aria-label="Pular configuração de perfil"
              className="text-white/20 transition-colors hover:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3A0E]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Step content */}
        <div className="px-6 py-8">
          {step === 1 && (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center bg-[#FF3A0E]/10">
                <GraduationCap className="h-8 w-8 text-[#FF3A0E]" aria-hidden="true" />
              </div>
              <div>
                <h2 id="onboarding-title" className="text-xl font-bold text-white">
                  Bem-vindo à plataforma
                </h2>
                <p className="mt-2 text-sm text-white/50">
                  Você acaba de entrar na sua área de aprendizado. Vamos dar um tour rápido antes de começar.
                </p>
              </div>
              <button
                ref={firstFocusRef}
                onClick={() => setStep(2)}
                className="flex w-full items-center justify-center gap-2 bg-[#FF3A0E] px-6 py-3 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[#FF5A1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3A0E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C12]"
              >
                Começar
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#FF3A0E]/10">
                  <Compass className="h-5 w-5 text-[#FF3A0E]" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="onboarding-title" className="font-semibold text-white">
                    O que você encontra aqui
                  </h2>
                  <p className="text-sm text-white/40">Um tour rápido pelos recursos</p>
                </div>
              </div>

              <ul className="space-y-3" role="list">
                {[
                  { icon: '📚', label: 'Meus Cursos', desc: 'Acesse todas as aulas das suas turmas' },
                  { icon: '📅', label: 'Agenda', desc: 'Encontros ao vivo com link e calendário' },
                  { icon: '💬', label: 'Fórum', desc: 'Tire dúvidas e conecte-se com a turma' },
                  { icon: '🎓', label: 'Certificados', desc: 'Baixe seus certificados após concluir' },
                ].map(({ icon, label, desc }) => (
                  <li key={label} className="flex items-start gap-3 border border-white/5 bg-white/[0.02] p-3">
                    <span className="text-base" aria-hidden="true">{icon}</span>
                    <div>
                      <p className="font-mono text-xs font-medium uppercase tracking-wide text-white/80">{label}</p>
                      <p className="text-xs text-white/40">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                ref={step === 2 ? firstFocusRef : undefined}
                onClick={() => setStep(3)}
                className="flex w-full items-center justify-center gap-2 bg-[#FF3A0E] px-6 py-3 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[#FF5A1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3A0E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C12]"
              >
                Continuar
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#FF3A0E]/10">
                  <User className="h-5 w-5 text-[#FF3A0E]" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="onboarding-title" className="font-semibold text-white">
                    Configure seu perfil
                  </h2>
                  <p className="text-sm text-white/40">Opcional — pode editar depois em /perfil</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="onboarding-name" className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-white/40">
                    Nome
                  </label>
                  <input
                    id="onboarding-name"
                    ref={step === 3 ? firstFocusRef as React.RefObject<HTMLInputElement> : undefined}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-sm text-white/80 placeholder:text-white/20 focus:border-white/20 focus:outline-none"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="onboarding-bio" className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-white/40">
                    Bio <span className="text-white/20">(opcional)</span>
                  </label>
                  <textarea
                    id="onboarding-bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Conte um pouco sobre você..."
                    rows={3}
                    className="w-full resize-none border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-sm text-white/80 placeholder:text-white/20 focus:border-white/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleFinish}
                  disabled={pending}
                  className="flex flex-1 items-center justify-center gap-2 bg-[#FF3A0E] px-6 py-3 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[#FF5A1F] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3A0E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C12]"
                >
                  {pending ? 'Salvando...' : 'Concluir'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
