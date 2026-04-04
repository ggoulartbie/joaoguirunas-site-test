'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import {
  Megaphone,
  TrendingUp,
  Share2,
  Palette,
  Code2,
  BarChart3,
  Server,
  PenTool,
  Check,
  ArrowRight,
  Bot,
  Sparkles,
} from 'lucide-react';

const PROFESSIONALS = [
  { id: 'marketing', label: 'Marketing Manager', cost: 96000, icon: Megaphone },
  { id: 'growth', label: 'Growth Marketer', cost: 108000, icon: TrendingUp },
  { id: 'social', label: 'Social Media Manager', cost: 72000, icon: Share2 },
  { id: 'designer', label: 'Web Designer', cost: 84000, icon: Palette },
  { id: 'engineer', label: 'Software Engineer', cost: 144000, icon: Code2 },
  { id: 'data', label: 'Data Analyst', cost: 120000, icon: BarChart3 },
  { id: 'devops', label: 'DevOps Engineer', cost: 156000, icon: Server },
  { id: 'ux', label: 'UX Designer', cost: 96000, icon: PenTool },
] as const;

const AGENT_PRICE = 8700;

const INCLUDED_ITEMS = [
  '4 semanas de mentoria intensiva',
  'Squad de agentes personalizada',
  'Acesso ao Claude Code + AIOX',
  'Desbloqueio mental com Claudia',
  'Turma de no maximo 12 pessoas',
  'Suporte durante todo o programa',
  'Templates e workflows prontos',
  'Comunidade exclusiva pos-mentoria',
];

function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const spring = useSpring(0, { stiffness: 80, damping: 20 });
  const display = useTransform(spring, (v) =>
    `${prefix}${Math.round(v).toLocaleString('pt-BR')}${suffix}`
  );
  const [text, setText] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsubscribe = display.on('change', (v) => setText(v));
    return unsubscribe;
  }, [display]);

  return <span>{text}</span>;
}

function ProfessionalCard({
  professional,
  active,
  onToggle,
  index,
}: {
  professional: (typeof PROFESSIONALS)[number];
  active: boolean;
  onToggle: () => void;
  index: number;
}) {
  const Icon = professional.icon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onToggle}
      className={`group relative w-full text-left p-4 border-2 transition-all duration-300 ${
        active
          ? 'border-[#FF4400] bg-[#FF4400]/[0.06]'
          : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]'
      }`}
    >
      {active && (
        <motion.div
          layoutId="card-glow"
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 30px rgba(255,68,0,0.08)' }}
        />
      )}
      <div className="relative flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center border transition-colors duration-300 ${
            active ? 'border-[#FF4400] text-[#FF4400]' : 'border-white/[0.12] text-white/40'
          }`}
        >
          <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium truncate transition-colors duration-300 ${
              active ? 'text-white' : 'text-white/60'
            }`}
          >
            {professional.label}
          </p>
          <p
            className="text-xs mt-0.5 transition-colors duration-300"
            style={{
              fontFamily: "'Geist Mono', monospace",
              color: active ? '#FF4400' : 'rgba(255,255,255,0.35)',
            }}
          >
            R$ {professional.cost.toLocaleString('pt-BR')}/ano
          </p>
        </div>
        <div
          className={`flex h-5 w-5 items-center justify-center border transition-all duration-300 ${
            active ? 'border-[#FF4400] bg-[#FF4400]' : 'border-white/[0.15]'
          }`}
        >
          {active && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
              <Check size={12} className="text-white" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.button>
  );
}

export function PricingCalculatorV2() {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(PROFESSIONALS.map((p) => p.id))
  );
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  const totalTraditional = PROFESSIONALS.filter((p) => selected.has(p.id)).reduce(
    (sum, p) => sum + p.cost,
    0
  );
  const savings = Math.max(totalTraditional - AGENT_PRICE, 0);
  const savingsPercent = totalTraditional > 0 ? Math.round((savings / totalTraditional) * 100) : 0;
  const maxTotal = PROFESSIONALS.reduce((sum, p) => sum + p.cost, 0);
  const barWidth = totalTraditional > 0 ? (totalTraditional / maxTotal) * 100 : 0;

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 bg-[#08080C] overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
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
              Calculadora de Investimento
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
            Quanto Custa Montar <span className="text-[#FF4400]">Sua Equipe?</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/40 max-w-2xl mx-auto leading-relaxed">
            Selecione os profissionais que voce precisa e veja a economia real com agentes de IA
          </p>
        </motion.div>

        {/* Calculator Grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* LEFT — Traditional Team */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="border-2 border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center border border-white/[0.15] text-white/40">
                  <BarChart3 size={16} />
                </div>
                <h3 className="text-lg font-bold text-white">Sua Equipe Tradicional</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROFESSIONALS.map((prof, i) => (
                  <ProfessionalCard
                    key={prof.id}
                    professional={prof}
                    active={selected.has(prof.id)}
                    onToggle={() => toggle(prof.id)}
                    index={i}
                  />
                ))}
              </div>

              {/* Total Bar */}
              <div className="mt-6 pt-5 border-t border-white/[0.08]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-white/40">Total Anual</span>
                  <span
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "'Geist Mono', monospace" }}
                  >
                    <AnimatedNumber value={totalTraditional} prefix="R$ " />
                  </span>
                </div>
                <div className="h-2 w-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-500/80 to-red-400/60"
                    animate={{ width: `${barWidth}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <p
                  className="mt-2 text-[0.65rem] text-white/40"
                  style={{ fontFamily: "'Geist Mono', monospace" }}
                >
                  {selected.size} de {PROFESSIONALS.length} profissionais selecionados
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Claude Code Agents */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="border-2 border-[#FF4400]/30 bg-[#FF4400]/[0.03] p-5 sm:p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center border border-[#FF4400] text-[#FF4400]">
                  <Bot size={16} />
                </div>
                <h3 className="text-lg font-bold text-white">Com Claude Code Agents</h3>
              </div>

              {/* Price Card */}
              <div className="border-2 border-[#FF4400]/40 bg-[#08080C] p-6 mb-6">
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-4xl sm:text-5xl font-bold text-[#FF4400]"
                    style={{ fontFamily: "'Geist Mono', monospace" }}
                  >
                    R$ 8.700
                  </span>
                </div>
                <p className="text-sm text-white/40 mt-2">Investimento unico na mentoria</p>

                {/* Savings */}
                {totalTraditional > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-5 pt-5 border-t border-[#FF4400]/20"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-[#FF4400]" />
                      <span className="text-sm text-white/60">Economia estimada</span>
                    </div>
                    <p
                      className="text-2xl sm:text-3xl font-bold text-[#FF4400]"
                      style={{ fontFamily: "'Geist Mono', monospace" }}
                    >
                      <AnimatedNumber value={savings} prefix="R$ " suffix="/ano" />
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1.5 border border-[#FF4400]/30 bg-[#FF4400]/10 px-3 py-1">
                      <span
                        className="text-[#FF4400] text-sm font-bold"
                        style={{ fontFamily: "'Geist Mono', monospace" }}
                      >
                        <AnimatedNumber value={savingsPercent} suffix="%" />
                      </span>
                      <span className="text-[#FF4400]/70 text-xs">de economia</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Included Items */}
              <div className="flex-1">
                <p
                  className="text-[0.65rem] text-white/40 uppercase tracking-widest mb-4"
                  style={{ fontFamily: "'Geist Mono', monospace" }}
                >
                  Incluso na mentoria
                </p>
                <ul className="space-y-2.5">
                  {INCLUDED_ITEMS.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                      className="flex items-start gap-2.5"
                    >
                      <div className="mt-0.5 flex h-4 w-4 items-center justify-center bg-[#FF4400]/20">
                        <Check size={10} className="text-[#FF4400]" />
                      </div>
                      <span className="text-sm text-white/60 leading-snug">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href="#inscricao"
                className="mt-6 inline-flex items-center justify-center gap-2 w-full bg-[#FF4400] text-white px-8 py-4 sm:py-5 text-sm sm:text-base font-bold shadow-2xl shadow-[#FF4400]/30 hover:bg-[#FF5722] transition-all hover:scale-[1.02]"
              >
                <span>Fale com um Especialista</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
