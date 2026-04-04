'use client';

import * as React from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import {
  Code,
  Server,
  BarChart3,
  PenTool,
  Megaphone,
  TrendingUp,
  Share2,
  Palette,
  FileText,
  Check,
  Users,
  HeartHandshake,
  Shield,
  ArrowRight,
  Terminal,
  Sparkles,
} from 'lucide-react';

const cn = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(' ');

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Professional {
  id: string;
  label: string;
  annual: number;
  icon: React.ReactNode;
}

interface Squad {
  id: string;
  label: string;
  professionals: Professional[];
}

const squads: Squad[] = [
  {
    id: 'engineering',
    label: 'Software Engineering',
    professionals: [
      { id: 'senior-dev', label: 'Senior Developer', annual: 144_000, icon: <Code size={18} /> },
      { id: 'devops', label: 'DevOps Engineer', annual: 156_000, icon: <Server size={18} /> },
      { id: 'data', label: 'Data Analyst', annual: 120_000, icon: <BarChart3 size={18} /> },
      { id: 'ux', label: 'UX Designer', annual: 96_000, icon: <PenTool size={18} /> },
    ],
  },
  {
    id: 'growth',
    label: 'Growth Marketing',
    professionals: [
      { id: 'growth-marketer', label: 'Growth Marketer', annual: 108_000, icon: <TrendingUp size={18} /> },
      { id: 'marketing-mgr', label: 'Marketing Manager', annual: 96_000, icon: <Megaphone size={18} /> },
      { id: 'social-media', label: 'Social Media Manager', annual: 72_000, icon: <Share2 size={18} /> },
    ],
  },
  {
    id: 'social',
    label: 'Social Media',
    professionals: [
      { id: 'social-mgr', label: 'Social Media Manager', annual: 72_000, icon: <Share2 size={18} /> },
      { id: 'web-designer', label: 'Web Designer', annual: 84_000, icon: <Palette size={18} /> },
      { id: 'content-creator', label: 'Content Creator', annual: 60_000, icon: <FileText size={18} /> },
    ],
  },
  {
    id: 'branding',
    label: 'Branding',
    professionals: [
      { id: 'brand-designer', label: 'Web Designer', annual: 84_000, icon: <Palette size={18} /> },
      { id: 'brand-ux', label: 'UX Designer', annual: 96_000, icon: <PenTool size={18} /> },
      { id: 'brand-content', label: 'Content Creator', annual: 72_000, icon: <FileText size={18} /> },
    ],
  },
];

const AGENT_COST = 8_700;
const INSTALLMENTS = 12;
const INSTALLMENT_VALUE = Math.ceil(AGENT_COST / INSTALLMENTS);

const checklist = [
  '8 encontros (1 presencial + 6 online + 1 final)',
  'Desbloqueio mental com Claudia',
  'Framework AIOX completo',
  'Squad personalizada para seu negocio',
  'Grupo exclusivo vitalicio',
  'Gravacoes de todas as aulas',
  'Atualizacoes futuras do AIOX',
  'Certificado de conclusao',
];

/* ------------------------------------------------------------------ */
/*  Animated number (supports 6-digit values)                          */
/* ------------------------------------------------------------------ */

function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const spring = useSpring(0, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (v) =>
    Math.round(v).toLocaleString('pt-BR'),
  );

  React.useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <span>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Professional row                                                   */
/* ------------------------------------------------------------------ */

function ProfessionalRow({
  pro,
  checked,
  onToggle,
}: {
  pro: Professional;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 border transition-all duration-200 cursor-pointer select-none',
        checked
          ? 'border-[#FF4400]/30 bg-[#FF4400]/[0.08]'
          : 'border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06]',
      )}
    >
      <span
        className={cn(
          'flex-shrink-0 w-4 h-4 border flex items-center justify-center transition-colors',
          checked
            ? 'border-[#FF4400] bg-[#FF4400]'
            : 'border-white/20 bg-transparent',
        )}
      >
        {checked && <Check size={10} className="text-white" />}
      </span>

      <span className="flex items-center gap-2 flex-1 text-left">
        <span className={checked ? 'text-[#FF4400]' : 'text-white/40'}>
          {pro.icon}
        </span>
        <span
          className={cn(
            'text-sm font-medium',
            checked ? 'text-white' : 'text-white/60',
          )}
        >
          {pro.label}
        </span>
      </span>

      <span
        className={cn(
          'text-xs sm:text-sm tabular-nums whitespace-nowrap',
          checked ? 'text-[#FF4400] font-bold' : 'text-white/40',
        )}
      >
        R$ {pro.annual.toLocaleString('pt-BR')}/ano
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function PricingCalculator() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [activeSquad, setActiveSquad] = React.useState('engineering');

  const currentSquad = squads.find((s) => s.id === activeSquad)!;

  const [selected, setSelected] = React.useState<Set<string>>(() =>
    new Set(currentSquad.professionals.map((p) => p.id)),
  );

  // Reset selection when squad changes
  React.useEffect(() => {
    setSelected(new Set(currentSquad.professionals.map((p) => p.id)));
  }, [activeSquad]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalAnnual = React.useMemo(
    () =>
      currentSquad.professionals
        .filter((p) => selected.has(p.id))
        .reduce((sum, p) => sum + p.annual, 0),
    [currentSquad, selected],
  );

  const savings = Math.max(totalAnnual - AGENT_COST, 0);
  const savingsPercent =
    totalAnnual > 0 ? Math.round((savings / totalAnnual) * 100) : 0;

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section
      ref={sectionRef}
      id="investimento"
      className="py-16 sm:py-24 bg-[#08080C] relative overflow-hidden"
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,68,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,68,0,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 border border-[#FF4400]/30 bg-[#FF4400]/10 px-3 sm:px-4 py-1.5 mb-4 sm:mb-6">
            <span
              className="text-[#FF4400] text-xs sm:text-[0.65rem]"
              style={{
                fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace",
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 600,
              }}
            >
              Calculadora de Custos
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl leading-tight tracking-tight" style={{ fontFamily: "'TASAOrbiter', var(--font-bb-display), sans-serif" }}>
            Compare o Custo Anual de uma Equipe Tradicional{' '}
            <span className="text-[#FF4400]">vs Claude Code Agents</span>
          </h2>
          <div className="mx-auto mt-4 sm:mt-6 w-16 sm:w-24 h-[2px] bg-gradient-to-r from-transparent via-[#FF4400] to-transparent" />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-10 sm:mb-12"
        >
          {squads.map((squad) => (
            <button
              key={squad.id}
              type="button"
              onClick={() => setActiveSquad(squad.id)}
              className={cn(
                'px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200',
                activeSquad === squad.id
                  ? 'bg-[#FF4400] text-white'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white/50 hover:bg-white/[0.08] hover:text-white/70',
              )}
              style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
            >
              {squad.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* ---- LEFT: Calculator ---- */}
          <motion.div
            key={activeSquad}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
              Equipe Tradicional
            </h3>
            <p className="text-white/60 text-sm mb-6">
              Custo anual de profissionais CLT
            </p>

            <div className="space-y-2">
              {currentSquad.professionals.map((pro) => (
                <ProfessionalRow
                  key={pro.id}
                  pro={pro}
                  checked={selected.has(pro.id)}
                  onToggle={() => toggle(pro.id)}
                />
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 border border-white/[0.08] bg-white/[0.05] px-3 sm:px-5 py-3 sm:py-4 flex items-center justify-between">
              <span className="text-white/60 text-sm font-medium uppercase tracking-wider">
                Custo Anual
              </span>
              <span className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                <AnimatedNumber value={totalAnnual} prefix="R$ " />
              </span>
            </div>

            {/* Savings callout */}
            {savings > 0 && (
              <motion.div
                key={savings}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-4 border border-[#FF4400]/20 bg-[#FF4400]/[0.08] px-5 py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[#FF4400]" />
                  <span className="text-sm font-semibold text-white/80">
                    Voce Economiza
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-lg sm:text-xl font-bold text-[#FF4400] tabular-nums">
                    <AnimatedNumber value={savings} prefix="R$ " suffix="/ano" />
                  </span>
                  <span className="ml-2 text-xs sm:text-sm text-[#FF4400]/70">
                    ({savingsPercent}%)
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* ---- RIGHT: Investment card ---- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative h-full border border-[#FF4400]/20 bg-[#0C0C12]/80 backdrop-blur-md p-5 sm:p-8 lg:p-12 overflow-hidden">
              {/* Glow */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  boxShadow:
                    '0 0 80px rgba(255,68,0,0.12), inset 0 0 80px rgba(255,68,0,0.04)',
                }}
              />

              <div className="relative z-10">
                {/* Badge */}
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#FF4400] border border-[#FF4400]/20 bg-[#FF4400]/[0.06] mb-6">
                  Investimento Unico
                </span>

                {/* Claude Code branding */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center border border-white/[0.08] bg-white/[0.05]">
                    <Terminal size={16} className="text-[#FF4400]" />
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-bold text-white leading-tight">
                      Claude Code Agents
                    </p>
                    <p className="text-white/60 text-xs sm:text-sm">
                      Investimento unico de setup
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    'Sem salarios mensais',
                    'Disponibilidade 24/7',
                    'Escalabilidade instantanea',
                  ].map((b) => (
                    <span
                      key={b}
                      className="text-xs text-[#FF4400]/80 border border-[#FF4400]/20 bg-[#FF4400]/5 px-2 py-0.5"
                      style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
                    >
                      {b}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="mb-2">
                  <span className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
                    R$ {AGENT_COST.toLocaleString('pt-BR')}
                  </span>
                </div>
                <p className="text-white/60 text-sm mb-8">
                  ou em ate {INSTALLMENTS}x de{' '}
                  <span className="text-white font-semibold">
                    R$ {INSTALLMENT_VALUE}
                  </span>
                </p>

                {/* Checklist */}
                <ul className="space-y-3 mb-8">
                  {checklist.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={
                        isInView
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: 20 }
                      }
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 bg-[#FF4400] flex items-center justify-center">
                        <Check size={10} className="text-white" />
                      </span>
                      <span className="text-sm text-white/60 leading-relaxed">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#inscricao"
                  className="btn-primary inline-flex items-center justify-center gap-2 w-full bg-[#FF4400] px-8 py-4 text-sm sm:text-base font-bold text-white shadow-2xl shadow-[#FF4400]/40 hover:bg-[#FF5722] transition-all hover:scale-[1.02] uppercase tracking-wider"
                  style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
                >
                  <span>Fale com um Especialista</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          <span className="flex items-center gap-2 text-sm text-white/60">
            <Users size={16} className="text-[#FF4400]" />
            Vagas limitadas (max 12 por turma)
          </span>
          <span className="flex items-center gap-2 text-sm text-white/60">
            <HeartHandshake size={16} className="text-[#FF4400]" />
            Suporte vitalicio
          </span>
          <span className="flex items-center gap-2 text-sm text-white/60">
            <Shield size={16} className="text-[#FF4400]" />
            Satisfacao garantida
          </span>
        </motion.div>
      </div>
    </section>
  );
}
