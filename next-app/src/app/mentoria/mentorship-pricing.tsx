'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, X, Sparkles } from 'lucide-react'

const cn = (...classes: (string | undefined | false)[]) => classes.filter(Boolean).join(' ')

const semAiox = [
  { text: '1 dev sobrecarregado', ok: false },
  { text: 'Velocidade limitada', ok: false },
  { text: 'Sem especializacao', ok: false },
  { text: 'Burnout garantido', ok: false },
  { text: 'Custo alto e variavel', ok: false },
  { text: 'Escalabilidade zero', ok: false },
]

const comAiox = [
  { text: '8 agentes especializados', ok: true },
  { text: 'Velocidade 10x', ok: true },
  { text: 'Cada agente domina sua area', ok: true },
  { text: 'Disponivel 24/7', ok: true },
  { text: 'Custo fixo e previsivel', ok: true },
  { text: 'Escala infinita', ok: true },
]

const incluso = [
  '8 encontros (1 presencial + 6 online + 1 final)',
  'Desbloqueio mental com Claudia',
  'Framework AIOX completo',
  'Squad personalizada para seu negocio',
  'Grupo exclusivo vitalicio',
  'Gravacoes de todas as aulas',
  'Atualizacoes futuras do AIOX',
  'Certificado de conclusao',
]

function ComparisonColumn({
  title,
  subtitle,
  items,
  variant,
  delay,
}: {
  title: string
  subtitle: string
  items: { text: string; ok: boolean }[]
  variant: 'dim' | 'highlight'
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const isDim = variant === 'dim'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={cn(
        'p-6 sm:p-8 border',
        isDim
          ? 'border-white/[0.08] bg-white/[0.02]'
          : 'border-[#FF4400]/30 bg-[#FF4400]/[0.04]'
      )}
    >
      <div className="text-center mb-6">
        <h3
          className={cn(
            'text-lg sm:text-xl font-bold mb-1',
            isDim ? 'text-white/40' : 'text-[#FF4400]'
          )}
        >
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-white/40">{subtitle}</p>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <motion.li
            key={item.text}
            initial={{ opacity: 0, x: isDim ? -10 : 10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: delay + 0.1 + i * 0.08 }}
            className="flex items-center gap-2.5"
          >
            {item.ok ? (
              <Check className="h-4 w-4 flex-shrink-0 text-[#FF4400]" />
            ) : (
              <X className="h-4 w-4 flex-shrink-0 text-red-400/70" />
            )}
            <span
              className={cn(
                'text-sm',
                item.ok ? 'text-white/80' : 'text-white/40 line-through'
              )}
            >
              {item.text}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export function MentorshipPricing() {
  const cardRef = useRef<HTMLDivElement>(null)
  const isCardInView = useInView(cardRef, { once: true, margin: '-80px' })

  return (
    <section id="investimento" className="py-16 sm:py-24 bg-[#0C0C12]">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 border border-[#FF4400]/30 bg-[#FF4400]/10 px-3 sm:px-4 py-1.5 mb-4 sm:mb-6">
            <span
              className="text-[#FF4400] text-[0.55rem] sm:text-[0.65rem]"
              style={{
                fontFamily: "'Geist Mono', monospace",
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 600,
              }}
            >
              Investimento
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl mb-4 leading-tight">
            Quanto Custa Ter Sua Equipe de{' '}
            <span className="text-[#FF4400]">Agentes IA</span>?
          </h2>
          <div className="mx-auto w-12 sm:w-16 h-[2px] bg-[#FF4400] mb-4" />
          <p className="text-sm sm:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
            Compare o custo de contratar equipes tradicionais vs. ter agentes IA
            trabalhando para voce
          </p>
        </div>

        {/* 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-6xl mx-auto mb-12 sm:mb-16">
          {/* Sem AIOX */}
          <ComparisonColumn
            title="Sem AIOX"
            subtitle="1 dev fazendo tudo sozinho"
            items={semAiox}
            variant="dim"
            delay={0}
          />

          {/* Pricing Card - Centro */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isCardInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative p-6 sm:p-8 border-2 border-[#FF4400]/40 bg-[#FF4400]/[0.03] z-10 md:-my-4"
            style={{
              boxShadow: '0 0 60px rgba(255,68,0,0.12), 0 0 120px rgba(255,68,0,0.06)',
            }}
          >
            {/* Animated border glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,68,0,0.15) 0%, transparent 40%, transparent 60%, rgba(255,68,0,0.15) 100%)',
              }}
            />

            <div className="relative z-10">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-1.5 bg-[#FF4400] px-3 py-1">
                  <Sparkles className="h-3 w-3 text-white" />
                  <span
                    className="text-white text-[0.6rem] font-bold uppercase tracking-wider"
                    style={{ fontFamily: "'Geist Mono', monospace" }}
                  >
                    Investimento Unico
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-center mb-2">
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="text-[#FF4400]/80 text-2xl sm:text-3xl font-bold">
                    R$
                  </span>
                  <span
                    className="text-[#FF4400] text-5xl sm:text-6xl font-bold"
                    style={{ fontFamily: "'Geist Mono', monospace" }}
                  >
                    8.700
                  </span>
                </div>
              </div>
              <p className="text-center text-white/40 text-xs sm:text-sm mb-6">
                ou{' '}
                <span
                  className="text-[#FF4400] font-bold"
                  style={{ fontFamily: "'Geist Mono', monospace" }}
                >
                  12x
                </span>{' '}
                de{' '}
                <span
                  className="text-white font-semibold"
                  style={{ fontFamily: "'Geist Mono', monospace" }}
                >
                  R$ 725
                </span>
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-white/10 mb-6" />

              {/* Checklist */}
              <ul className="space-y-2.5 mb-8">
                {incluso.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isCardInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    className="flex items-start gap-2"
                  >
                    <Check className="h-4 w-4 flex-shrink-0 text-[#FF4400] mt-0.5" />
                    <span className="text-xs sm:text-sm text-white/60">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#inscricao"
                className="block w-full text-center bg-[#FF4400] text-white py-4 text-sm sm:text-base font-bold shadow-2xl shadow-[#FF4400]/40 hover:bg-[#FF5722] transition-all hover:scale-[1.02]"
              >
                Fale com um Especialista
              </a>
            </div>
          </motion.div>

          {/* Com AIOX */}
          <ComparisonColumn
            title="Com AIOX"
            subtitle="Equipe de 8 agentes especializados"
            items={comAiox}
            variant="highlight"
            delay={0.4}
          />
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isCardInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-white/40 text-xs sm:text-sm"
        >
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 bg-[#FF4400]" />
            Vagas limitadas (max 12)
          </span>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 bg-[#FF4400]" />
            Suporte vitalicio
          </span>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 bg-[#FF4400]" />
            Satisfacao garantida
          </span>
        </motion.div>
      </div>
    </section>
  )
}
