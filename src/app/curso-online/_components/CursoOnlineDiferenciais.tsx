'use client';

import * as React from 'react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Monitor, Users } from 'lucide-react';

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
      className="relative group h-full"
    >
      <div className="relative h-full min-h-[320px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-md p-6 sm:p-8 transition-all duration-300 hover:border-[#FF3A0E]/40 hover:bg-white/[0.04]">
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(600px at 50% 0%, rgba(255,58,14,0.04), transparent)' }}
          />
        )}
        <div className="relative z-10">
          <div className="mb-4 inline-flex items-center justify-center w-10 h-10 bg-[#FF3A0E]/10">
            <div className="text-[#FF3A0E]">{icon}</div>
          </div>
          <h3
            className="text-lg sm:text-xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.02em' }}
          >
            {title}
          </h3>
          <ul className="space-y-3">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-3 text-white/60">
                <span className="mt-1.5 w-1.5 h-1.5 bg-[#FF3A0E] flex-shrink-0" />
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
    icon: <Play size={20} />,
    title: 'Aulas Gravadas — Assista no Seu Ritmo',
    highlights: [
      'Todo o conteúdo disponível 24/7 durante o período de acesso',
      'Pause, retome e reassista quantas vezes quiser',
      'Sem horário fixo, sem pressão de turma',
    ],
  },
  {
    icon: <Monitor size={20} />,
    title: 'Materiais e Templates Prontos',
    highlights: [
      'Templates de cada módulo para usar imediatamente',
      'Código e frameworks disponíveis para download',
      'Documentação detalhada para cada agente configurado',
    ],
  },
  {
    icon: <Users size={20} />,
    title: 'Comunidade e Certificado',
    highlights: [
      'Acesso ao fórum da comunidade para tirar dúvidas',
      'Certificado de conclusão ao finalizar os módulos',
      'Conexão com outros alunos que trilharam o mesmo caminho',
    ],
  },
];

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
            i === activeIndex ? 'bg-[#FF3A0E]' : 'bg-white/20'
          }`}
        />
      ))}
    </div>
  );
}

export function CursoOnlineDiferenciais() {
  const headerRef = React.useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-50px' });
  const { scrollRef: carouselRef, activeIndex } = useCarouselDots(features.length);

  return (
    <section id="diferenciais" className="py-16 sm:py-24 overflow-hidden" style={{ background: 'rgba(8,8,12,0.82)' }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p
            className="mb-4 sm:mb-6"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(255, 58, 14, 0.85)',
              fontWeight: 500,
            }}
          >
            O que está incluso
          </p>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl text-white leading-tight"
            style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.03em' }}
          >
            Aprenda no Seu Ritmo.{' '}
            <span className="text-[#FF3A0E] italic" style={{ fontWeight: 300 }}>
              Sem Compromisso de Horário.
            </span>
          </h2>
          <div className="mx-auto mt-4 sm:mt-6 w-16 sm:w-24 h-[2px] bg-gradient-to-r from-transparent via-[#FF3A0E] to-transparent" />
          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            O mesmo conteúdo da mentoria intensiva, agora disponível 100% online e assíncrono
          </p>
        </motion.div>

        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:items-stretch md:overflow-visible md:snap-none md:gap-6 md:pb-0"
          style={{ scrollbarWidth: 'none' }}
        >
          {features.map((feature, index) => (
            <div key={feature.title} className="w-[280px] flex-shrink-0 snap-center md:w-auto md:flex-shrink-0 md:h-full">
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
      </div>
    </section>
  );
}
