'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const ORANGE = '#E8601C';
const BLUE = '#1E3A5F';
const BG = '#111111';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-5 py-24 overflow-hidden"
      style={{ background: BG }}
    >
      {/* Glow de fundo — laranja */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, rgba(232,96,28,0.10) 0%, rgba(232,96,28,0.03) 50%, transparent 75%)`,
          filter: 'blur(40px)',
        }}
      />
      {/* Glow secundário — azul */}
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, rgba(30,58,95,0.15) 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center">

        {/* Badge social proof */}
        <motion.div {...fadeUp(0)}>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
            style={{
              background: 'rgba(232,96,28,0.10)',
              border: `1px solid rgba(232,96,28,0.30)`,
              color: ORANGE,
            }}
          >
            <Sparkles size={12} />
            +200 fundadores já escalam com IA
          </div>
        </motion.div>

        {/* Nome */}
        <motion.p
          {...fadeUp(0.08)}
          className="text-sm font-medium tracking-[0.2em] uppercase mb-4"
          style={{ color: 'rgba(255,255,255,0.40)' }}
        >
          João Guirunas
        </motion.p>

        {/* Headline principal — slogan */}
        <motion.h1
          {...fadeUp(0.16)}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white mb-6"
        >
          Aprendo usando.{' '}
          <span style={{ color: ORANGE }}>Aplico.</span>{' '}
          Compartilho.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.24)}
          className="text-base sm:text-lg leading-relaxed max-w-xl mb-10"
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          CEO da GrowthSales.ai. Ajudo fundadores e CEOs a escalar empresas com sistemas de IA — sem precisar virar engenheiro.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.32)}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <Link
            href="/mentoria"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:brightness-110 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8601C]"
            style={{ background: ORANGE }}
          >
            Quero Mentoria
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href="/open-source"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8601C]"
            style={{ border: `1px solid rgba(255,255,255,0.15)` }}
          >
            Ver Open Source
          </Link>
        </motion.div>

        {/* Cargo/empresa */}
        <motion.p
          {...fadeUp(0.42)}
          className="mt-12 text-xs font-medium tracking-wide"
          style={{ color: 'rgba(255,255,255,0.22)' }}
        >
          CEO · GrowthSales.ai &nbsp;·&nbsp; Consultor de Growth com IA
        </motion.p>
      </div>
    </section>
  );
}
