'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SparklesCore } from '@/shared/components/ui/sparkles';
import { GrowthWatermark } from './growth-watermark';

const EMBER = '#FF3A0E';
const CINEMA: [number, number, number, number] = [0.7, 0, 0.2, 1];

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
    <div className="w-full bg-black flex flex-col items-center justify-start sm:justify-center min-h-screen overflow-hidden relative">

      {/* Eyebrow — foto + nome (mobile: topo; desktop: acima do H1) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="order-1 sm:order-1 flex items-center gap-3 pt-10 sm:pt-28"
      >
        <div
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0"
          style={{ boxShadow: `0 0 0 2px ${EMBER}` }}
        >
          <Image
            src="/images/joao-guirunas-profile.jpg"
            alt="João Guirunas"
            width={56}
            height={56}
            className="w-full h-full object-cover object-[center_20%]"
            priority
          />
        </div>
        <span
          className="text-white uppercase"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.14em', fontWeight: 500 }}
        >
          JOÃO<span style={{ color: EMBER }}>GUIRUNAS</span>
        </span>
      </motion.div>

      {/* Sparkles — mobile: order-2; desktop: order-3 */}
      <div className="order-2 sm:order-3 w-full max-w-2xl h-52 sm:h-48 relative flex-shrink-0 mt-8 sm:mt-2">
        {/* Linha gradiente laranja */}
        <div className="absolute inset-x-[10%] top-0 bg-gradient-to-r from-transparent via-[#FF3A0E] to-transparent h-[2px] w-4/5 blur-sm" />
        <div className="absolute inset-x-[10%] top-0 bg-gradient-to-r from-transparent via-[#FF3A0E] to-transparent h-px w-4/5" />
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

      {/* H1 + CTAs — mobile: order-3 sobrepõe sparkles; desktop: order-2 */}
      <div className="order-3 sm:order-2 relative z-10 flex flex-col items-center text-center px-5 pb-0 w-full max-w-3xl -mt-36 sm:mt-0">

        {/* H1 animado */}
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.1, ease: CINEMA }}
          className="relative z-10 text-5xl sm:text-7xl lg:text-[96px] text-center font-[family-name:var(--font-display-serif)] font-[400]"
          style={{ letterSpacing: '-0.03em', lineHeight: 0.92 }}
        >
          <span className="relative flex w-full justify-center pb-2 sm:pb-4">
            <span className="invisible" aria-hidden>aprendo usando</span>
            {titles.map((title, index) => (
              <motion.span
                key={title}
                className="absolute inset-0 flex justify-center italic font-[300]"
                style={{ color: title === 'aplico' ? '#ffffff' : EMBER }}
                initial={{ opacity: 0, y: '0.25em', filter: 'blur(4px)' }}
                animate={{
                  opacity: titleNumber === index ? 1 : 0,
                  y: titleNumber === index ? '0em' : '-0.15em',
                  filter: titleNumber === index ? 'blur(0px)' : 'blur(4px)',
                }}
                transition={{ duration: 0.55, ease: CINEMA }}
              >
                {title}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: CINEMA }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-xs sm:max-w-none sm:w-auto mb-0 mt-12 sm:mt-8"
        >
          <Link
            href="/mentoria"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            style={{ background: EMBER, color: '#050507', letterSpacing: '-0.01em' }}
          >
            Mentoria
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="https://www.growthsales.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/[0.05]"
            style={{ border: '1px solid rgba(255,255,255,0.16)', letterSpacing: '-0.01em' }}
          >
            Consultoria
          </Link>

          <Link
            href="/open-source"
            className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/[0.05]"
            style={{ border: '1px solid rgba(255,255,255,0.16)', letterSpacing: '-0.01em' }}
          >
            Open Source
          </Link>
        </motion.div>
      </div>

      <GrowthWatermark size={500} className="bottom-0 right-0 translate-x-1/4 translate-y-1/4" />

      {/* Subheadline — por último */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="order-4 sm:order-4 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md sm:max-w-xl text-center px-5 mt-6 mb-10"
        style={{ color: 'rgba(255,255,255,0.45)' }}
      >
        CEO da GrowthSales.ai. Uso IA em negócios reais — automação, growth
        e sistemas que escalam. O que funciona, eu compartilho e ensino.
      </motion.p>
    </div>
  );
}
