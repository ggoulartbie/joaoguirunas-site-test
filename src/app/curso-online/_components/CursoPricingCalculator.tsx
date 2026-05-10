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
  Shield,
  ArrowRight,
  Terminal,
  Sparkles,
  BookOpen,
  Users2,
} from 'lucide-react';
import { CheckoutForm } from './checkout-form';

const cn = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(' ');

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

const AGENT_COST = 797;
const INSTALLMENTS = 6;

const checklist = [
  'Acesso por 6 meses ao conteúdo completo',
  'Aulas gravadas — assista no seu ritmo',
  'Materiais e templates de cada módulo',
  'Fórum da comunidade — tire dúvidas',
  'Certificado de conclusão',
  'Atualizações futuras do conteúdo',
];

const COHORT_SLUG = 'curso-online-padrao';

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

function ProfessionalRow({
  pro,
  checked,
  onToggle,
}: {
  pro: Professional;
  checked: boolean;
  onToggle: () => void;
}) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onToggle();
    }
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      role="checkbox"
      aria-checked={checked}
      aria-label={`${pro.label}, R$ ${pro.annual.toLocaleString('pt-BR')}/ano`}
      className={cn(
        'w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 border transition-all duration-200 cursor-pointer select-none',
        checked
          ? 'border-white/[0.10] bg-white/[0.06]'
          : 'border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05]',
      )}
    >
      <span
        className={cn(
          'flex-shrink-0 w-4 h-4 border flex items-center justify-center transition-colors',
          checked
            ? 'border-[var(--color-accent)] bg-[var(--color-accent)]'
            : 'border-white/20 bg-transparent',
        )}
      >
        {checked && <Check size={10} className="text-white" />}
      </span>

      <span className="flex items-center gap-2 flex-1 text-left">
        <span className={checked ? 'text-white/80' : 'text-white/40'}>
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
          checked ? 'text-white/45' : 'text-white/25',
        )}
      >
        R$ {pro.annual.toLocaleString('pt-BR')}/ano
      </span>
    </button>
  );
}

export function CursoPricingCalculator() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [activeSquad, setActiveSquad] = React.useState('engineering');

  const currentSquad = squads.find((s) => s.id === activeSquad)!;

  const [selectionBySquad, setSelectionBySquad] = React.useState<Record<string, Set<string>>>(
    () => Object.fromEntries(squads.map((s) => [s.id, new Set(s.professionals.map((p) => p.id))]))
  );

  const selected = selectionBySquad[activeSquad] ?? new Set<string>();

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
    setSelectionBySquad((prev) => {
      const current = new Set(prev[activeSquad]);
      if (current.has(id)) current.delete(id);
      else current.add(id);
      return { ...prev, [activeSquad]: current };
    });
  }

  return (
    <section
      ref={sectionRef}
      id="investimento"
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ background: 'rgba(8,8,12,0.82)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,68,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,68,0,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 sm:px-4 py-1.5 mb-4 sm:mb-6">
            <span
              className="text-[var(--color-accent)] text-xs sm:text-[0.65rem]"
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
          <h2 className="text-2xl text-white sm:text-3xl lg:text-4xl leading-tight" style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.03em' }}>
            Compare o Custo Anual de uma Equipe Tradicional{' '}
            <span className="text-[var(--color-accent)]">vs Claude Code Agents</span>
          </h2>
          <div className="mx-auto mt-4 sm:mt-6 w-16 sm:w-24 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          role="tablist"
          aria-label="Tipo de equipe"
          className="flex gap-3 mb-10 sm:mb-12 overflow-x-auto sm:overflow-visible sm:flex-wrap sm:justify-center pb-2 sm:pb-0"
          style={{ scrollbarWidth: 'none' }}
        >
          {squads.map((squad) => (
            <button
              key={squad.id}
              type="button"
              role="tab"
              aria-selected={activeSquad === squad.id}
              onClick={() => setActiveSquad(squad.id)}
              className={cn(
                'flex-shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200',
                activeSquad === squad.id
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white/50 hover:bg-white/[0.08] hover:text-white/70',
              )}
              style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
            >
              {squad.label}
            </button>
          ))}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_48px_1fr] lg:gap-0 lg:items-start">
          {/* LEFT: Calculator */}
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

            <div className="mt-6 border border-white/[0.08] bg-white/[0.05] px-3 sm:px-5 py-3 sm:py-4 flex items-center justify-between">
              <span className="text-white/60 text-sm font-medium uppercase tracking-wider">
                Custo Anual
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[var(--color-accent)] tabular-nums">
                <AnimatedNumber value={totalAnnual} prefix="R$ " />
              </span>
            </div>

            {savings > 0 && (
              <motion.div
                key={savings}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-4 border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/[0.08] px-5 py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[var(--color-accent)]" />
                  <span className="text-sm font-semibold text-white/80">
                    Você Economiza
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-lg sm:text-xl font-bold text-[var(--color-accent)] tabular-nums">
                    <AnimatedNumber value={savings} prefix="R$ " suffix="/ano" />
                  </span>
                  <span className="ml-2 text-xs sm:text-sm text-[var(--color-accent)]/70">
                    ({savingsPercent}%)
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* VS Separator */}
          <div className="flex lg:flex-col items-center justify-center gap-3 py-2 lg:py-0 lg:px-0 lg:self-stretch">
            <div className="h-px lg:h-full lg:w-px flex-1 bg-white/10" />
            <span
              className="text-[var(--color-accent)] font-bold text-sm uppercase tracking-widest flex-shrink-0"
              style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
            >
              vs
            </span>
            <div className="h-px lg:h-full lg:w-px flex-1 bg-white/10" />
          </div>

          {/* RIGHT: Investment card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative h-full border border-[var(--color-accent)]/20 bg-[#0C0C12]/80 backdrop-blur-md p-5 sm:p-8 lg:p-12 overflow-hidden">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  boxShadow:
                    '0 0 80px rgba(255,68,0,0.12), inset 0 0 80px rgba(255,68,0,0.04)',
                }}
              />

              <div className="relative z-10">
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/[0.06] mb-6">
                  Investimento Único
                </span>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center border border-white/[0.08] bg-white/[0.05]">
                    <Terminal size={16} className="text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-bold text-white leading-tight">
                      Curso Online — Claude Agents
                    </p>
                    <p className="text-white/60 text-xs sm:text-sm">
                      Acesso por 6 meses
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    'Sem mensalidade',
                    'Assista no seu ritmo',
                    'Acesso imediato',
                  ].map((b) => (
                    <span
                      key={b}
                      className="text-xs text-[var(--color-accent)]/80 border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 px-2 py-0.5"
                      style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
                    >
                      {b}
                    </span>
                  ))}
                </div>

                {/* Destaque: parcelas */}
                <div className="mb-1">
                  <span className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
                    {INSTALLMENTS}x de R$ {Math.ceil(AGENT_COST / INSTALLMENTS).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="text-white/60 text-sm mb-8">
                  ou R$ {AGENT_COST.toLocaleString('pt-BR')} à vista no cartão
                </p>

                <ul className="space-y-3 mb-8">
                  {checklist.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 bg-[var(--color-accent)] flex items-center justify-center">
                        <Check size={10} className="text-white" />
                      </span>
                      <span className="text-sm text-white/60 leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <CheckoutForm cohortSlug={COHORT_SLUG} label="Comprar agora — R$ 797" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          <span className="flex items-center gap-2 text-sm text-white/60">
            <BookOpen size={16} className="text-[var(--color-accent)]" />
            13 módulos + 2 bônus com código
          </span>
          <span className="flex items-center gap-2 text-sm text-white/60">
            <Users2 size={16} className="text-[var(--color-accent)]" />
            Fórum de comunidade incluso
          </span>
          <span className="flex items-center gap-2 text-sm text-white/60">
            <Shield size={16} className="text-[var(--color-accent)]" />
            7 dias de garantia total
          </span>
        </motion.div>
      </div>
    </section>
  );
}
