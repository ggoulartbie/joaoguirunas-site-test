'use client';

import * as React from 'react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Users, Target } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  highlights: string[];
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, highlights, index }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="relative h-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md p-6 sm:p-8 transition-all duration-300 hover:border-[#FF4400]/40 hover:bg-white/[0.04]">
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(600px at 50% 0%, rgba(255,68,0,0.04), transparent)',
            }}
          />
        )}
        <div className="relative z-10">
          <div className="mb-4 inline-flex items-center justify-center w-10 h-10 bg-[#FF4400]/10">
            <div className="text-[#FF4400]">{icon}</div>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4 tracking-tight">
            {title}
          </h3>
          <ul className="space-y-3">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-3 text-white/60">
                <span className="mt-1.5 w-1.5 h-1.5 bg-[#FF4400] flex-shrink-0" />
                <span className="text-sm leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const features = [
  {
    icon: <Brain size={20} />,
    title: 'Desbloqueio Mental com Claudia Guirunas',
    highlights: [
      'Psicanalista e Socia da GrowthSales',
      'Tecnicas de desbloqueio mental e respiracao para controlar a ansiedade da tela preta',
      'Voce nao vai ouvir isso em nenhum curso tecnico',
    ],
  },
  {
    icon: <Users size={20} />,
    title: 'Turmas de No Maximo 12 Pessoas',
    highlights: [
      'Atencao individual em cada encontro',
      'Troubleshooting personalizado',
      'Networking real com pessoas comprometidas',
    ],
  },
  {
    icon: <Target size={20} />,
    title: 'Squad Personalizada Para Seu Contexto',
    highlights: [
      'Entendemos seu caso de uso',
      'Criamos agentes especificos para sua necessidade',
      'Voce sai com algo funcionando para SEU trabalho',
    ],
  },
];

const INSCRICAO_ANCHOR = '#inscricao';

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

export function MentorshipFeatures() {
  const headerRef = React.useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-50px' });
  const { scrollRef: carouselRef, activeIndex } = useCarouselDots(features.length);

  return (
    <section id="diferenciais" className="py-16 sm:py-24 bg-[#08080C] overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl leading-tight tracking-tight" style={{ fontFamily: "'TASAOrbiter', var(--font-bb-display), sans-serif" }}>
            Nao E Mais Um Curso Online.
            <br />
            <span className="text-[#FF4400]">E Uma Transformacao Guiada.</span>
          </h2>
          <div className="mx-auto mt-4 sm:mt-6 w-16 sm:w-24 h-[2px] bg-gradient-to-r from-transparent via-[#FF4400] to-transparent" />
          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Descubra por que nossa mentoria e diferente de tudo que voce ja viu
          </p>
        </motion.div>

        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:overflow-visible md:snap-none md:gap-6 md:pb-0"
          style={{ scrollbarWidth: 'none' }}
        >
          {features.map((feature, index) => (
            <div key={feature.title} className="min-w-[80vw] md:min-w-0 snap-center flex-shrink-0 md:flex-shrink">
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                highlights={feature.highlights}
                index={index}
              />
            </div>
          ))}
        </div>
        <CarouselDots count={features.length} activeIndex={activeIndex} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <a
            href={INSCRICAO_ANCHOR}
            className="btn-primary inline-flex items-center justify-center gap-2 bg-[#FF4400] px-8 py-4 text-sm sm:text-base font-bold text-white shadow-2xl shadow-[#FF4400]/40 hover:bg-[#FF5722] transition-all hover:scale-105 uppercase tracking-wider"
            style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
          >
            <span>Fale com um Especialista</span>
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
