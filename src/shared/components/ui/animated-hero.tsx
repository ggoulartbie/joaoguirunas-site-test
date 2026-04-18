'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SparklesCore } from '@/shared/components/ui/sparkles';

const ORANGE = '#FF4400';

export function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ['aprendo usando', 'aplico', 'compartilho'], []);

  useEffect(() => {
    const id = setTimeout(() => {
      setTitleNumber((n) => (n === titles.length - 1 ? 0 : n + 1));
    }, 2000);
    return () => clearTimeout(id);
  }, [titleNumber, titles]);

  return (
    <div className="w-full bg-black flex flex-col items-center justify-start sm:justify-center min-h-screen overflow-hidden">

      {/* Conteúdo */}
      <div className="order-2 sm:order-1 flex flex-col items-center text-center px-5 pt-6 sm:pt-28 pb-0 w-full max-w-3xl">

        {/* Eyebrow — foto + nome */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6 sm:mb-10"
        >
          <div
            className="w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0"
            style={{ boxShadow: `0 0 0 2px ${ORANGE}` }}
          >
            <Image
              src="/images/joao-guirunas-profile.jpg"
              alt="João Guirunas"
              width={56}
              height={56}
              className="w-full h-full object-cover object-[center_20%]"
            />
          </div>
          <span className="text-xs font-semibold tracking-[0.18em] uppercase">
            <span className="text-white">JOÃO</span>
            <span style={{ color: ORANGE }}>GUIRUNAS</span>
          </span>
        </motion.div>

        {/* H1 animado */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter text-center font-bold font-[family-name:var(--font-display)]"
        >
          <span className="relative flex w-full justify-center pb-2 sm:pb-4">
            <span className="invisible" aria-hidden>aprendo usando</span>
            {titles.map((title, index) => (
              <motion.span
                key={title}
                className="absolute inset-0 flex justify-center font-semibold"
                style={{ color: title === 'aplico' ? '#ffffff' : ORANGE }}
                initial={{ opacity: 0 }}
                animate={{ opacity: titleNumber === index ? 1 : 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {title}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* CTAs — fora das sparkles, no fluxo normal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 w-full max-w-xs sm:max-w-none sm:w-auto mb-0 mt-4 sm:mt-6"
        >
          <Link
            href="/mentoria"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-[2px] text-sm font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{ background: ORANGE }}
          >
            Mentoria
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="https://www.growthsales.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-7 py-3 rounded-[2px] text-sm font-semibold text-white transition-all duration-200 hover:bg-white/5"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
          >
            Consultoria
          </Link>

          <Link
            href="/open-source"
            className="inline-flex items-center justify-center px-7 py-3 rounded-[2px] text-sm font-semibold text-white transition-all duration-200 hover:bg-white/5"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
          >
            Open Source
          </Link>
        </motion.div>
      </div>

      {/* Sparkles — puramente visual, abaixo do conteúdo */}
      <div className="order-1 sm:order-2 w-full max-w-2xl h-32 sm:h-48 relative flex-shrink-0 mt-0 sm:mt-2">
        {/* Linha gradiente laranja */}
        <div className="absolute inset-x-[10%] top-0 bg-gradient-to-r from-transparent via-[#FF4400] to-transparent h-[2px] w-4/5 blur-sm" />
        <div className="absolute inset-x-[10%] top-0 bg-gradient-to-r from-transparent via-[#FF4400] to-transparent h-px w-4/5" />
        <div className="absolute inset-x-[35%] top-0 bg-gradient-to-r from-transparent via-orange-300 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-[35%] top-0 bg-gradient-to-r from-transparent via-orange-300 to-transparent h-px w-1/4" />

        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
      </div>

      {/* Subheadline — por último */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="order-3 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md sm:max-w-xl text-center px-5 mt-6 mb-10"
        style={{ color: 'rgba(255,255,255,0.45)' }}
      >
        CEO da GrowthSales.ai. Uso IA em negócios reais — automação, growth
        e sistemas que escalam. O que funciona, eu compartilho e ensino.
      </motion.p>
    </div>
  );
}
