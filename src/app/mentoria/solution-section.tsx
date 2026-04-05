'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bot, Code, TrendingUp } from 'lucide-react';

const DISPLAY_FONT = {
  fontFamily: "'TASAOrbiter', var(--font-bb-display), sans-serif",
} as const;

interface CardData {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const cards: CardData[] = [
  {
    number: '01',
    icon: <Bot size={48} strokeWidth={1.5} />,
    title: 'Delegação Inteligente',
    description:
      'Delegar tarefas complexas para agentes que nunca dormem, nunca erram contexto e custam uma fração de um funcionário.',
  },
  {
    number: '02',
    icon: <Code size={48} strokeWidth={1.5} />,
    title: 'Sua Equipe Completa',
    description:
      'Ter um dev sênior, um QA, um designer, um copywriter — tudo rodando na sua máquina, integrado aos seus projetos.',
  },
  {
    number: '03',
    icon: <TrendingUp size={48} strokeWidth={1.5} />,
    title: 'Escala Sem Contratar',
    description:
      'Escalar sua produção sem contratar — criar 10 posts de LinkedIn, 5 apresentações e revisar 20 PRs... em uma tarde.',
  },
];

function SolutionCard({
  card,
  index,
  inView,
}: {
  card: CardData;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: 'easeOut' }}
      className="group relative h-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-[#FF4400]/30"
    >
      {/* Number */}
      <span
        className="absolute top-6 right-6 text-xs font-semibold text-white/30 uppercase tracking-widest"
        style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
      >
        {card.number}
      </span>

      {/* Icon */}
      <div className="mb-6 text-[#FF4400]/80 group-hover:text-[#FF4400] transition-colors duration-300">
        {card.icon}
      </div>

      {/* Content */}
      <h3
        className="text-xl font-bold text-white mb-3 tracking-tight"
        style={DISPLAY_FONT}
      >
        {card.title}
      </h3>
      <p className="text-sm text-white/50 leading-relaxed">
        {card.description}
      </p>

      {/* Bottom accent line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF4400] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  );
}

function useCarouselDots(count: number) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / count;
    setActiveIndex(Math.round(el.scrollLeft / cardWidth));
  }, [count]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return { scrollRef, activeIndex };
}

function CarouselDots({ count, activeIndex }: { count: number; activeIndex: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-4 md:hidden">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
            i === activeIndex ? 'bg-[#FF4400]' : 'bg-white/20'
          }`}
        />
      ))}
    </div>
  );
}

export function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const { scrollRef: carouselRef, activeIndex } = useCarouselDots(cards.length);

  return (
    <section
      ref={sectionRef}
      id="solucao"
      className="relative py-16 sm:py-24 bg-[#0C0C12] overflow-hidden"
    >
      {/* Background blurs */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-80 h-80 bg-[#FF4400]/[0.04] rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-80 h-80 bg-[#FF4400]/[0.03] rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
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
              Solução Completa
            </span>
          </div>

          <h2
            className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl leading-tight tracking-tight"
            style={DISPLAY_FONT}
          >
            Imagine ter uma equipe de especialistas
            <br />
            <span className="text-[#FF4400]">trabalhando para você 24/7</span>
          </h2>

          <div className="mx-auto mt-4 sm:mt-6 w-16 sm:w-24 h-[2px] bg-gradient-to-r from-transparent via-[#FF4400] to-transparent" />

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            E se você pudesse delegar, escalar e automatizar com agentes de IA
            especializados?
          </p>
        </motion.div>

        {/* Cards carousel (mobile) / grid (desktop) */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:overflow-visible md:snap-none md:gap-6 md:pb-0"
          style={{ scrollbarWidth: 'none' }}
        >
          {cards.map((card, i) => (
            <div key={card.number} className="w-[280px] flex-shrink-0 snap-center md:w-auto md:flex-shrink-0">
              <SolutionCard
                card={card}
                index={i}
                inView={isInView}
              />
            </div>
          ))}
        </div>
        <CarouselDots count={cards.length} activeIndex={activeIndex} />

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-14 sm:mt-20 text-center"
        >
          <p className="text-white font-semibold text-lg sm:text-2xl tracking-tight">
            Isso não é ficção científica.
            <br />
            <span className="text-white/60">
              É o que você vai{' '}
              <span className="text-[#FF4400]">construir nesta mentoria.</span>
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
