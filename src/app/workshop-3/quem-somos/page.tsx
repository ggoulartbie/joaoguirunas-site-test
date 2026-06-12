'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';
import { GrowthLogo } from '../_components/GrowthLogo';

const MONO  = "'Geist Mono', 'JetBrains Mono', ui-monospace, monospace";
const SERIF = "var(--font-display-serif), 'Fraunces', Georgia, serif";
const EMBER = '#FF3A0E';
const BONE  = '#f1f1f3';
const BONEDIM  = '#c5c5ca';
const BONEMUTE = 'rgba(132,132,140,0.85)';
const CINEMA   = [0.22, 0.61, 0.36, 1] as const;

const ease = CINEMA;

export default function QuemSomosPage() {
  return (
    <Workshop3DeckLayout slug="quem-somos">
      {/* ── BGs split 50/50 ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, display: 'flex' }}>
        {/* Claudia — esquerda */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease }}
          style={{ position: 'relative', flex: 1 }}
        >
          <Image
            src="/photos/claudia/claudia-bg-dashboards.png"
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            priority
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(5,5,7,0.55) 0%, rgba(5,5,7,0.72) 100%)',
          }} />
        </motion.div>

        {/* Hairline divisória */}
        <div style={{ width: 1, background: `rgba(255,58,14,0.25)`, flexShrink: 0, zIndex: 2 }} />

        {/* João — direita */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease }}
          style={{ position: 'relative', flex: 1 }}
        >
          <Image
            src="/photos/joao/joao-rooftop-night.png"
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            priority
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(5,5,7,0.50) 0%, rgba(5,5,7,0.70) 100%)',
          }} />
        </motion.div>
      </div>

      {/* ── Conteúdo principal ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column',
        height: '100%', gap: 0,
      }}>

        {/* ── Hero header ── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(16px, 2.5vh, 28px)' }}>
          {/* Kicker */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5, ease }}
            style={{
              display: 'block', marginBottom: 10,
              fontFamily: MONO, fontSize: 10,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: BONEMUTE,
            }}
          >
            Growth Sales.ai · Workshop 3 · Jun 2026
          </motion.span>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.65, ease }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <GrowthLogo size="hero" />
          </motion.div>

          {/* Tagline produtos */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.5, ease }}
            style={{
              fontFamily: SERIF, fontStyle: 'italic',
              fontWeight: 300, fontSize: 'clamp(13px, 1.6vw, 18px)',
              color: BONEDIM, letterSpacing: '-0.01em',
              marginTop: 10, marginBottom: 14,
            }}
          >
            Os dois produtos da empresa
          </motion.p>

          {/* Product chips */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.5, ease }}
            style={{
              display: 'inline-flex', gap: 0,
              border: '1px solid rgba(255,255,255,0.13)',
            }}
          >
            {/* Rev OS */}
            <div style={{
              padding: 'clamp(10px,1.4vh,16px) clamp(16px,2.2vw,28px)',
              borderRight: '1px solid rgba(255,255,255,0.13)',
              display: 'flex', flexDirection: 'column', gap: 3, minWidth: 140,
            }}>
              <span style={{
                fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: EMBER,
              }}>
                Acelerador
              </span>
              <span style={{
                fontFamily: SERIF, fontStyle: 'italic',
                fontWeight: 300, fontSize: 'clamp(18px, 2vw, 24px)',
                color: BONE, lineHeight: 1, letterSpacing: '-0.01em',
              }}>
                Rev OS<sup style={{ fontSize: '0.4em', verticalAlign: 'super', color: BONEMUTE }}>™</sup>
              </span>
              <span style={{
                fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: BONEMUTE,
              }}>
                Service as a System
              </span>
            </div>

            {/* Build OS */}
            <div style={{
              padding: 'clamp(10px,1.4vh,16px) clamp(16px,2.2vw,28px)',
              display: 'flex', flexDirection: 'column', gap: 3, minWidth: 140,
            }}>
              <span style={{
                fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: BONEMUTE,
              }}>
                Open Source
              </span>
              <span style={{
                fontFamily: SERIF, fontStyle: 'italic',
                fontWeight: 300, fontSize: 'clamp(18px, 2vw, 24px)',
                color: BONE, lineHeight: 1, letterSpacing: '-0.01em',
              }}>
                Build OS<sup style={{ fontSize: '0.4em', verticalAlign: 'super', color: BONEMUTE }}>™</sup>
              </span>
              <span style={{
                fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: BONEMUTE,
              }}>
                System as a Service
              </span>
            </div>
          </motion.div>
        </div>

        {/* Hairline */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 'clamp(14px,2vh,22px)' }} />

        {/* ── Founders boxes (split) ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(16px, 2.5vw, 32px)',
          flex: 1,
          minHeight: 0,
        }}>

          {/* ── Box Claudia ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.58, duration: 0.72, ease }}
            style={{
              display: 'flex', gap: 'clamp(12px,1.6vw,20px)',
              background: 'rgba(5,5,7,0.78)',
              border: '1px solid rgba(255,255,255,0.09)',
              padding: 'clamp(14px,1.8vh,22px) clamp(14px,1.6vw,20px)',
            }}
          >
            {/* Foto perfil */}
            <div style={{
              position: 'relative',
              width: 'clamp(80px,8vw,110px)',
              aspectRatio: '3/4',
              flexShrink: 0,
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              <Image
                src="/photos/founders/claudia-official.png"
                alt="Claudia Guirunas"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
              />
            </div>

            {/* Identity + formação */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1, minWidth: 0 }}>
              {/* Cargo */}
              <span style={{
                fontFamily: MONO, fontSize: 9,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: EMBER, marginBottom: 3,
              }}>
                CRO · Co-Founder
              </span>

              {/* Nome */}
              <span style={{
                fontFamily: SERIF, fontWeight: 400,
                fontSize: 'clamp(18px, 2.2vw, 26px)',
                letterSpacing: '-0.02em', lineHeight: 1.05,
                color: BONE, marginBottom: 2,
              }}>
                Claudia Guirunas
              </span>

              {/* Handle */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05, duration: 0.5, ease }}
                style={{
                  fontFamily: MONO, fontSize: 9,
                  letterSpacing: '0.14em', color: BONEMUTE,
                  marginBottom: 10,
                }}
              >
                @claudia.guirunas
              </motion.span>

              {/* Hairline */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 9 }} />

              {/* Formação */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5, ease }}
                style={{
                  fontFamily: "'Geist', system-ui, sans-serif",
                  fontWeight: 300, fontSize: 'clamp(11px, 1.1vw, 13px)',
                  lineHeight: 1.6, color: BONEMUTE,
                }}
              >
                MBA em Gestão Estratégica · Psicanalista · Estratégia corporativa · Gestão · Comportamento humano · Experiência do cliente · Cultura organizacional · IA aplicada a processos
              </motion.p>
            </div>
          </motion.div>

          {/* ── Box João ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.78, duration: 0.72, ease }}
            style={{
              display: 'flex', gap: 'clamp(12px,1.6vw,20px)',
              background: 'rgba(5,5,7,0.78)',
              border: '1px solid rgba(255,255,255,0.09)',
              padding: 'clamp(14px,1.8vh,22px) clamp(14px,1.6vw,20px)',
            }}
          >
            {/* Foto perfil */}
            <div style={{
              position: 'relative',
              width: 'clamp(80px,8vw,110px)',
              aspectRatio: '3/4',
              flexShrink: 0,
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              <Image
                src="/photos/founders/joao-official.png"
                alt="João Guirunas"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
              />
            </div>

            {/* Identity + formação */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1, minWidth: 0 }}>
              {/* Cargo */}
              <span style={{
                fontFamily: MONO, fontSize: 9,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: EMBER, marginBottom: 3,
              }}>
                CSO · Co-Founder
              </span>

              {/* Nome */}
              <span style={{
                fontFamily: SERIF, fontWeight: 400,
                fontSize: 'clamp(18px, 2.2vw, 26px)',
                letterSpacing: '-0.02em', lineHeight: 1.05,
                color: BONE, marginBottom: 2,
              }}>
                João Guirunas
              </span>

              {/* Handle */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05, duration: 0.5, ease }}
                style={{
                  fontFamily: MONO, fontSize: 9,
                  letterSpacing: '0.14em', color: BONEMUTE,
                  marginBottom: 10,
                }}
              >
                @joaoguirunas
              </motion.span>

              {/* Hairline */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 9 }} />

              {/* Formação */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5, ease }}
                style={{
                  fontFamily: "'Geist', system-ui, sans-serif",
                  fontWeight: 300, fontSize: 'clamp(11px, 1.1vw, 13px)',
                  lineHeight: 1.6, color: BONEMUTE,
                }}
              >
                ESPM · PURS · Web Developer INFNET · MBAs em Gestão Empresarial, Inteligência Competitiva, Data Science & Big Data, Inteligência Artificial e Neurociência
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </Workshop3DeckLayout>
  );
}
