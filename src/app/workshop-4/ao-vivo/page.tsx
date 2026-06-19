import type { Metadata } from 'next';
import { WorkshopClaudeDesignLayout } from '../_components/WorkshopClaudeDesignLayout';

export const metadata: Metadata = {
  title: '03 — Demo ao vivo | Workshop 4',
  robots: { index: false },
};

const MONO      = "'JetBrains Mono', 'Roboto Mono', ui-monospace, monospace";
const DISPLAY   = "'Fraunces', 'Instrument Serif', Georgia, serif";
const EMBER     = '#FF3A0E';
const BONE      = '#f1f1f3';
const BONE_MUTE = '#84848c';

const VideoBg = (
  <div
    aria-hidden="true"
    style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}
  >
    <video
      autoPlay
      muted
      loop
      playsInline
      poster="/photos/editorial/editorial-ai-workflow-man.png"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        display: 'block',
      }}
    >
      <source src="/video/joao/foco-03.mp4" type="video/mp4" />
    </video>
    {/* vinheta central pesada — texto legível em cima do vídeo */}
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(5,5,7,0.35) 0%, rgba(5,5,7,0.70) 45%, rgba(5,5,7,0.96) 100%)',
    }} />
    {/* ember screen sutil */}
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse 40% 50% at 50% 100%, rgba(255,58,14,0.08) 0%, transparent 60%)',
      mixBlendMode: 'screen',
    }} />
  </div>
);

export default function AoVivoPage() {
  return (
    <WorkshopClaudeDesignLayout slug="ao-vivo" background={VideoBg}>
      <div
        className="slide-content flex flex-col gap-6"
        style={{ position: 'relative', zIndex: 1, minHeight: '40vh', justifyContent: 'center' }}
      >

        {/* Eyebrow com dot pulsando */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: EMBER, boxShadow: `0 0 10px ${EMBER}`,
            flexShrink: 0,
            display: 'inline-block',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }} />
          {/* eslint-disable-next-line react/no-danger */}
          <style dangerouslySetInnerHTML={{ __html: '@keyframes pulse { 0%, 100% { opacity: 1; box-shadow: 0 0 10px #FF3A0E; } 50% { opacity: 0.5; box-shadow: 0 0 20px #FF3A0E, 0 0 40px rgba(255,58,14,0.4); } }' }} />
          <span style={{
            fontFamily: MONO,
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: BONE_MUTE,
          }}>
            Demo ao vivo · claude.ai/design
          </span>
        </div>

        {/* Título enorme */}
        <h2 style={{
          fontFamily: DISPLAY,
          fontWeight: 300,
          fontSize: 'clamp(72px, 14vw, 160px)',
          letterSpacing: '-0.04em',
          lineHeight: 0.88,
          color: BONE,
        }}>
          Ao vivo.
        </h2>

        {/* Subtítulo */}
        <p style={{
          fontFamily: DISPLAY,
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(16px, 2vw, 22px)',
          color: 'rgba(241,241,243,0.65)',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
        }}>
          Abrindo Claude Design agora.
        </p>

      </div>
    </WorkshopClaudeDesignLayout>
  );
}
