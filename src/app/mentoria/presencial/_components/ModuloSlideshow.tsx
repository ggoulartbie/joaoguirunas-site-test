'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MODULOS_PRESENCIAIS } from './ModuloLayout';
import { SQUADS, getAgentesBySquad } from '@/data/agentes';

export interface SlideAgent {
  slug: string;
  codename: string;
  accent: string;
  title?: string;
}

export interface Slide {
  label: string;
  title: string;
  body: string;
  note?: string;
  agents?: SlideAgent[];
  belt?: boolean;
  clients?: string[];
  stats?: { label: string; value: string }[];
  screenshot?: string;
  video?: string;
  diagram?: 'agent-anatomy' | 'webhook' | 'api' | 'mcp' | 'claude-md' | 'claude-structure'
           | 'hub-and-spoke' | 'squads-grid' | 'solo-vs-team' | 'agent-flow'
           | 'team-os-commands' | 'smart-memory-tree' | 'creator-commands' | 'getting-started'
           | 'ct-overview' | 'team-protocol'
           | 'limites-contraste' | 'limites-disfarces' | 'limites-exige' | 'limites-flow'
           | 'squads-detail' | 'all-agents';
}

interface ModuloSlideshowProps {
  slug: string;
  slides: Slide[];
}

const ACCENT  = '#FF3A0E';
const MONO    = 'var(--font-mono)';
const SERIF   = 'var(--font-display-serif)';
const DISPLAY = 'var(--font-display)';

const slideVariants = {
  enter:  { opacity: 0, y: 32, filter: 'blur(8px)' },
  center: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  exit:   { opacity: 0, y: -20, filter: 'blur(4px)' },
};
const slideTx = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

/* ── Agent mini card — 110×147 ── */
function AgentCard({ agent, delay = 0 }: { agent: SlideAgent; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="relative overflow-hidden flex-shrink-0"
      style={{
        width: 110,
        height: 147,
        border: `1px solid ${agent.accent}30`,
        background: `linear-gradient(160deg, ${agent.accent}18 0%, #050507 65%)`,
      }}
    >
      <Image src={`/agentes/${agent.slug}.png`} alt={agent.codename} fill className="object-cover object-top" sizes="110px" />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '6px 8px' }}>
        <div style={{ height: 1, background: agent.accent, opacity: 0.6, marginBottom: 5 }} />
        <p style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.8)', lineHeight: 1.3 }}>
          {agent.codename}
        </p>
        {agent.title && (
          <p style={{ fontFamily: MONO, fontSize: '7px', letterSpacing: '0.04em', color: 'rgba(255,255,255,0.38)', lineHeight: 1.2, marginTop: 2 }}>
            {agent.title}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ── Belt ── */
function AgentBelt({ agents }: { agents: SlideAgent[] }) {
  const cardW = 110;
  const gap   = 10;
  const totalW = agents.length * (cardW + gap);
  return (
    <div className="overflow-hidden w-full" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)' }}>
      <motion.div
        className="flex items-end"
        style={{ gap, width: totalW * 2 }}
        animate={{ x: [0, -totalW] }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      >
        {[...agents, ...agents].map((a, i) => (
          <div key={`${a.slug}-${i}`} className="flex-shrink-0">
            <AgentCard agent={a} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Agent grid ── */
function AgentGrid({ agents }: { agents: SlideAgent[] }) {
  const cols = agents.length <= 4 ? 2 : 3;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 110px)`, gap: 8, alignContent: 'start' }}>
      {agents.map((a, i) => <AgentCard key={a.slug} agent={a} delay={0.3 + i * 0.06} />)}
    </div>
  );
}

/* ── Video frame ── */
function VideoFrame({ src }: { src: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0 overflow-hidden"
      style={{
        width: '100%',
        maxWidth: 520,
        border: '1px solid rgba(255,255,255,0.1)',
        background: '#080810',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      <div style={{ padding: '7px 10px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,100,80,0.5)' }} />
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,200,50,0.35)' }} />
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(80,200,80,0.35)' }} />
      </div>
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        style={{ width: '100%', display: 'block', aspectRatio: '16/10', objectFit: 'cover', objectPosition: 'top' }}
      />
    </motion.div>
  );
}

/* ── Screenshot frame ── */
function ScreenshotFrame({ src }: { src: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0 overflow-hidden"
      style={{
        width: '100%',
        maxWidth: 520,
        border: '1px solid rgba(255,255,255,0.1)',
        background: '#080810',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      {/* Browser chrome */}
      <div style={{ padding: '7px 10px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,100,80,0.5)' }} />
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,200,50,0.35)' }} />
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(80,200,80,0.35)' }} />
      </div>
      <div style={{ position: 'relative', aspectRatio: '16/10' }}>
        <Image src={src} alt="screenshot" fill className="object-cover object-top" sizes="520px" />
      </div>
    </motion.div>
  );
}

/* ── Shared diagram wrapper ── */
function DiagramBox({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 300, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', padding: '16px', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}
    >
      {children}
    </motion.div>
  );
}

function DiagramNode({ label, sub, color = 'rgba(255,255,255,0.08)', accent }: { label: string; sub?: string; color?: string; accent?: boolean }) {
  return (
    <div style={{ border: `1px solid ${accent ? 'rgba(255,58,14,0.4)' : 'rgba(255,255,255,0.1)'}`, background: accent ? 'rgba(255,58,14,0.08)' : color, padding: '7px 12px', borderRadius: 0 }}>
      <p style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.1em', color: accent ? ACCENT : 'rgba(255,255,255,0.8)' }}>{label}</p>
      {sub && <p style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{sub}</p>}
    </div>
  );
}

function Arrow({ label, dir = 'down' }: { label?: string; dir?: 'down' | 'right' }) {
  return (
    <div style={{ display: 'flex', flexDirection: dir === 'down' ? 'column' : 'row', alignItems: 'center', gap: 2, padding: dir === 'down' ? '3px 0' : '0 3px' }}>
      {label && <span style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>{label}</span>}
      <span style={{ fontFamily: MONO, fontSize: '12px', color: 'rgba(255,58,14,0.6)' }}>{dir === 'down' ? '↓' : '→'}</span>
    </div>
  );
}

/* ── Webhook diagram ── */
function WebhookDiagram() {
  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 280 }}>
      {/* label */}
      <p style={{ fontFamily: MONO, fontSize: '7.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 14 }}>Webhook · push unidirecional</p>
      {/* external trigger */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', marginBottom: 0 }}>
        <p style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.75)' }}>Sistema Externo</p>
        <p style={{ fontFamily: MONO, fontSize: '7.5px', color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>Stripe · Hotmart · Google Forms</p>
      </motion.div>
      {/* event trigger line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto', width: '50%' }}>
        <motion.div animate={{ scaleY: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{ width: 1, height: 18, background: `linear-gradient(to bottom, rgba(255,255,255,0.15), ${ACCENT})` }} />
        <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{ fontFamily: MONO, fontSize: '7px', color: ACCENT, letterSpacing: '0.12em', padding: '2px 8px', border: `1px solid ${ACCENT}33`, background: `${ACCENT}11` }}>
          POST /webhook
        </motion.div>
        <div style={{ width: 1, height: 18, background: `linear-gradient(to bottom, ${ACCENT}, rgba(255,255,255,0.1))` }} />
        <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `7px solid rgba(255,255,255,0.25)` }} />
      </div>
      {/* claude receives */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        style={{ border: `1px solid ${ACCENT}55`, background: `${ACCENT}0d`, padding: '10px 14px', marginBottom: 12 }}>
        <p style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.06em', color: ACCENT }}>Claude Code</p>
        <p style={{ fontFamily: MONO, fontSize: '7.5px', color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>recebe → processa → age</p>
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
        style={{ fontFamily: MONO, fontSize: '7.5px', color: 'rgba(255,255,255,0.22)', lineHeight: 1.6, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 10 }}>
        O sistema avisa você. Claude não pergunta — só recebe e executa.
      </motion.p>
    </motion.div>
  );
}

/* ── API diagram ── */
function ApiDiagram() {
  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 300 }}>
      <p style={{ fontFamily: MONO, fontSize: '7.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 14 }}>API · ida e volta</p>
      {/* two columns */}
      <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
        {/* claude column */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
          style={{ border: `1px solid ${ACCENT}55`, background: `${ACCENT}0d`, padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.06em', color: ACCENT }}>Claude Code</p>
          <p style={{ fontFamily: MONO, fontSize: '7.5px', color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>toma iniciativa</p>
        </motion.div>
        {/* arrows column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 10px', flexShrink: 0 }}>
          {/* request arrow → */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
            <motion.p animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              style={{ fontFamily: MONO, fontSize: '6.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>GET /api →</motion.p>
            <motion.div animate={{ scaleX: [0.85, 1, 0.85] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              style={{ height: 1, width: 50, background: `linear-gradient(to right, ${ACCENT}88, ${ACCENT})`, transformOrigin: 'left' }} />
          </div>
          {/* response arrow ← */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
            <motion.div animate={{ scaleX: [0.85, 1, 0.85] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut', delay: 1.1 }}
              style={{ height: 1, width: 50, background: `linear-gradient(to left, rgba(255,255,255,0.5), rgba(255,255,255,0.18))`, transformOrigin: 'right' }} />
            <motion.p animate={{ x: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut', delay: 1.1 }}
              style={{ fontFamily: MONO, fontSize: '6.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>← JSON</motion.p>
          </div>
        </div>
        {/* service column */}
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
          style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.75)' }}>Serviço</p>
          <p style={{ fontFamily: MONO, fontSize: '7.5px', color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>Supabase · Stripe · OpenAI</p>
        </motion.div>
      </div>
      {/* cycle label */}
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        style={{ marginTop: 10, padding: '8px 12px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <p style={{ fontFamily: MONO, fontSize: '7.5px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
          Claude pergunta → sistema responde → Claude age.<br />
          <span style={{ color: 'rgba(255,255,255,0.18)' }}>Síncrono. Claude toma a iniciativa.</span>
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ── MCP diagram ── */
function McpDiagram() {
  const tool = (name: string, desc: string) => (
    <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 20, height: 1, background: 'rgba(255,58,14,0.4)' }} />
      <div style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', padding: '5px 10px', flex: 1 }}>
        <p style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.75)' }}>{name}</p>
        <p style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.28)' }}>{desc}</p>
      </div>
    </div>
  );
  return (
    <DiagramBox>
      <p style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 12 }}>MCP · conexões permanentes</p>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', padding: '10px 12px', flexShrink: 0, textAlign: 'center' }}>
          <p style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.1em', color: ACCENT }}>Claude</p>
          <p style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>Code</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          {tool('Google Drive', 'lê e escreve docs')}
          {tool('Supabase', 'consulta o banco')}
          {tool('Gmail / E-mail', 'envia mensagens')}
          {tool('CRM / Slack', 'opera ferramentas')}
        </div>
      </div>
      <p style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.25)', marginTop: 12, lineHeight: 1.5 }}>Cada MCP Server é uma ferramenta que Claude opera nativamente.</p>
    </DiagramBox>
  );
}

/* ── CLAUDE.md diagram ── */
function ClaudeMdDiagram() {
  const line = (depth: number, text: string, accent?: boolean) => (
    <div key={text} style={{ display: 'flex', alignItems: 'baseline', gap: 6, padding: '2.5px 0' }}>
      <span style={{ fontFamily: MONO, fontSize: '9px', color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>{'  '.repeat(depth)}{depth > 0 ? '├─' : ''}</span>
      <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.06em', color: accent ? ACCENT : 'rgba(255,255,255,0.65)' }}>{text}</span>
    </div>
  );
  return (
    <DiagramBox>
      <p style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 12 }}>Estrutura do CLAUDE.md</p>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 10, marginBottom: 10 }}>
        <p style={{ fontFamily: MONO, fontSize: '9px', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>~/.claude/CLAUDE.md <span style={{ color: 'rgba(255,58,14,0.6)' }}>← global</span></p>
        {line(1, 'Preferências pessoais')}
        {line(1, 'Regras que valem em todo projeto')}
        {line(1, 'Tom de voz padrão')}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 10 }}>
        <p style={{ fontFamily: MONO, fontSize: '9px', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>{'{projeto}'}/CLAUDE.md <span style={{ color: 'rgba(255,58,14,0.6)' }}>← projeto</span></p>
        {line(1, 'Identidade & persona', true)}
        {line(1, 'Regras do negócio', true)}
        {line(1, 'O que PODE fazer')}
        {line(1, 'O que NÃO pode fazer')}
        {line(1, 'Stack & arquitetura')}
        {line(1, 'Comandos e atalhos')}
        {line(1, 'Contexto do produto')}
      </div>
      <p style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.25)', marginTop: 12, lineHeight: 1.5 }}>Lido automaticamente em cada sessão. Nunca repita contexto.</p>
    </DiagramBox>
  );
}

/* ── Claude Code full structure ── */
function ClaudeStructureDiagram() {
  const file = (name: string, desc: string, accent?: boolean) => (
    <div key={name} style={{ display: 'flex', gap: 8, alignItems: 'baseline', padding: '2.5px 0' }}>
      <span style={{ fontFamily: MONO, fontSize: '9px', color: accent ? ACCENT : 'rgba(255,255,255,0.65)', flexShrink: 0 }}>{name}</span>
      <span style={{ fontFamily: MONO, fontSize: '7.5px', color: 'rgba(255,255,255,0.25)', lineHeight: 1.4 }}>{desc}</span>
    </div>
  );
  const hook = (name: string, desc: string) => (
    <div key={name} style={{ display: 'flex', gap: 8, padding: '2.5px 0' }}>
      <div style={{ width: 3, height: 3, background: 'rgba(255,58,14,0.6)', flexShrink: 0, marginTop: 5 }} />
      <div>
        <span style={{ fontFamily: MONO, fontSize: '8.5px', color: ACCENT }}>{name}</span>
        <span style={{ fontFamily: MONO, fontSize: '7.5px', color: 'rgba(255,255,255,0.3)', marginLeft: 6 }}>{desc}</span>
      </div>
    </div>
  );
  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 310, display: 'flex', flexDirection: 'column', gap: 10 }}>

      {/* CLAUDE.md */}
      <div style={{ border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.05)', padding: '10px 12px' }}>
        <p style={{ fontFamily: MONO, fontSize: '7.5px', letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: 7 }}>Instruções · CLAUDE.md</p>
        {file('~/.claude/CLAUDE.md', 'global — vale em todo projeto')}
        {file('{projeto}/CLAUDE.md', 'projeto — identidade, regras, stack')}
        <p style={{ fontFamily: MONO, fontSize: '7px', color: 'rgba(255,255,255,0.2)', marginTop: 5 }}>Lido automaticamente no início de cada sessão.</p>
      </div>

      {/* .env + settings */}
      <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', padding: '10px 12px' }}>
        <p style={{ fontFamily: MONO, fontSize: '7.5px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 7 }}>Ambiente & Configuração</p>
        {file('.env', 'API keys, tokens, URLs — nunca commitado')}
        {file('.claude/settings.json', 'model, permissões, env vars expostas')}
        {file('.claude/settings.local.json', 'overrides locais, git-ignored')}
      </div>

      {/* Hooks */}
      <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', padding: '10px 12px' }}>
        <p style={{ fontFamily: MONO, fontSize: '7.5px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 7 }}>Hooks · Ciclo de vida</p>
        {hook('PreToolUse', 'antes de executar qualquer ferramenta')}
        {hook('PostToolUse', 'após execução — validar, formatar')}
        {hook('Stop', 'quando Claude encerra a resposta')}
        {hook('UserPromptSubmit', 'antes do prompt chegar ao Claude')}
        <p style={{ fontFamily: MONO, fontSize: '7px', color: 'rgba(255,255,255,0.2)', marginTop: 5 }}>Scripts shell que rodam automaticamente. Configurados em settings.json.</p>
      </div>
    </motion.div>
  );
}

/* ── CT Overview: hub-and-spoke + squad cards (merged slide 1+2) ── */
function CtOverviewDiagram() {
  const squads = [
    { name: 'dev', agents: 10, color: '#A78BFA', focus: 'Backend · frontend · infra · QA' },
    { name: 'sites', agents: 10, color: '#FF3A0E', focus: 'Next.js · SEO · deploy · CMS' },
    { name: 'social', agents: 7, color: '#EC4899', focus: 'Content · design · vídeo · publish' },
    { name: 'traffic', agents: 10, color: '#06B6D4', focus: 'Google · Meta · TikTok Ads' },
  ];
  const Card = ({ s, delay }: { s: typeof squads[0]; delay: number }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ border: `1px solid ${s.color}40`, background: `${s.color}0d`, padding: '10px 14px', flex: 1 }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.1em', color: s.color }}>{s.name}</span>
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.2 }}
          style={{ fontFamily: MONO, fontSize: '20px', fontWeight: 800, color: s.color, lineHeight: 1 }}
        >{s.agents}</motion.span>
      </div>
      <p style={{ fontFamily: MONO, fontSize: '7.5px', color: 'rgba(255,255,255,0.32)', lineHeight: 1.5 }}>{s.focus}</p>
    </motion.div>
  );

  return (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Top row */}
      <div style={{ display: 'flex', gap: 8 }}>
        <Card s={squads[0]!} delay={0.5} />
        <Card s={squads[1]!} delay={0.6} />
      </div>

      {/* Connector lines + hub */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        <motion.div initial={{ scaleX: 0, originX: 1 }} animate={{ scaleX: 1 }} transition={{ delay: 0.75, duration: 0.35 }}
          style={{ flex: 1, height: 1, background: 'rgba(255,58,14,0.3)' }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ border: '1px solid rgba(255,58,14,0.55)', background: 'rgba(255,58,14,0.12)', padding: '10px 20px', textAlign: 'center', flexShrink: 0, boxShadow: '0 0 32px rgba(255,58,14,0.18)' }}
        >
          <motion.div
            animate={{ boxShadow: ['0 0 0px rgba(255,58,14,0)', '0 0 18px rgba(255,58,14,0.35)', '0 0 0px rgba(255,58,14,0)'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p style={{ fontFamily: MONO, fontSize: '12px', letterSpacing: '0.16em', color: ACCENT, fontWeight: 700 }}>team-os</p>
            <p style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>Lead · Orquestrador</p>
          </motion.div>
        </motion.div>
        <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.75, duration: 0.35 }}
          style={{ flex: 1, height: 1, background: 'rgba(255,58,14,0.3)' }} />
      </div>

      {/* Bottom row */}
      <div style={{ display: 'flex', gap: 8 }}>
        <Card s={squads[2]!} delay={0.7} />
        <Card s={squads[3]!} delay={0.8} />
      </div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
        style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.18)', textAlign: 'center', letterSpacing: '0.14em' }}>
        37 agentes · 42 skills · portável entre projetos
      </motion.p>
    </div>
  );
}

/* ── Team Protocol: comparison + flow (merged slide 3+4) ── */
function TeamProtocolDiagram() {
  const rows = [
    ['Uma sessão, um contexto', 'Múltiplos agentes em paralelo'],
    ['Faz tudo, faz mal', 'Especialista no papel'],
    ['Sem verificação cruzada', 'QA formal: PASS / FAIL'],
    ['Sem memória persistente', 'Smart-memory compartilhada'],
  ];

  const agents = [
    { name: 'architect', color: '#A78BFA', label: 'stories' },
    { name: 'dev-beta', color: '#A78BFA', label: 'implementa' },
    { name: 'qa', color: '#A78BFA', label: 'PASS/FAIL' },
    { name: 'devops', color: '#A78BFA', label: 'push + PR' },
  ];

  return (
    <div style={{ width: 380, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Comparison */}
      <div style={{ border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ padding: '5px 10px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontFamily: MONO, fontSize: '7.5px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase' }}>IA solo</p>
          </div>
          <div style={{ padding: '5px 10px' }}>
            <p style={{ fontFamily: MONO, fontSize: '7.5px', letterSpacing: '0.2em', color: ACCENT, textTransform: 'uppercase' }}>Agentes em time</p>
          </div>
        </div>
        {rows.map(([bad, good], i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
            <div style={{ padding: '7px 10px', borderRight: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
              <p style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>{bad}</p>
            </div>
            <div style={{ padding: '7px 10px' }}>
              <p style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.4 }}>{good}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Flow */}
      <div style={{ border: '1px solid rgba(255,255,255,0.07)', padding: '10px 12px' }}>
        <p style={{ fontFamily: MONO, fontSize: '7.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>Protocolo · Agent Teams</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}
            style={{ border: `1px solid rgba(255,58,14,0.5)`, background: 'rgba(255,58,14,0.1)', padding: '5px 10px', flexShrink: 0 }}>
            <p style={{ fontFamily: MONO, fontSize: '8.5px', color: ACCENT }}>team-os</p>
            <p style={{ fontFamily: MONO, fontSize: '7px', color: 'rgba(255,255,255,0.3)' }}>lead</p>
          </motion.div>
          <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.85, duration: 0.3 }}
            style={{ flex: 1, height: 1, background: 'rgba(255,58,14,0.3)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            {agents.map((a, i) => (
              <motion.div key={a.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.08 }}
                style={{ border: `1px solid ${a.color}30`, background: `${a.color}08`, padding: '4px 8px' }}>
                <p style={{ fontFamily: MONO, fontSize: '7.5px', color: a.color }}>{a.name}</p>
                <p style={{ fontFamily: MONO, fontSize: '7px', color: 'rgba(255,255,255,0.28)' }}>{a.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          style={{ fontFamily: MONO, fontSize: '7.5px', color: 'rgba(255,255,255,0.2)', marginTop: 8, textAlign: 'right' }}>
          SendMessage(lead) ao concluir →
        </motion.p>
      </div>
    </div>
  );
}

/* ── Hub-and-spoke: team-os centro + 4 squads ── */
function HubAndSpokeDiagram() {
  const squads = [
    { name: 'dev', agents: 10, color: '#A78BFA', desc: 'Software' },
    { name: 'sites', agents: 10, color: '#FF3A0E', desc: 'Websites' },
    { name: 'social', agents: 7, color: '#EC4899', desc: 'Social' },
    { name: 'traffic', agents: 10, color: '#06B6D4', desc: 'Tráfego' },
  ];
  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      {/* Top 2 squads */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
        {squads.slice(0, 2).map(s => (
          <div key={s.name} style={{ border: `1px solid ${s.color}40`, background: `${s.color}10`, padding: '8px 14px', textAlign: 'center', minWidth: 90 }}>
            <p style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.12em', color: s.color }}>{s.name}</p>
            <p style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{s.agents} agentes</p>
          </div>
        ))}
      </div>
      {/* Lines down to center */}
      <div style={{ display: 'flex', gap: 16, width: '100%', justifyContent: 'center' }}>
        {[0, 1].map(i => <div key={i} style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.12)', margin: '0 44px' }} />)}
      </div>
      {/* Center hub */}
      <div style={{ border: `1px solid rgba(255,58,14,0.5)`, background: 'rgba(255,58,14,0.1)', padding: '10px 24px', textAlign: 'center', boxShadow: '0 0 24px rgba(255,58,14,0.15)' }}>
        <p style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.14em', color: ACCENT, fontWeight: 700 }}>team-os</p>
        <p style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>Lead · Orquestrador</p>
      </div>
      {/* Lines down */}
      <div style={{ display: 'flex', gap: 16, width: '100%', justifyContent: 'center' }}>
        {[0, 1].map(i => <div key={i} style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.12)', margin: '0 44px' }} />)}
      </div>
      {/* Bottom 2 squads */}
      <div style={{ display: 'flex', gap: 16, marginTop: 0 }}>
        {squads.slice(2).map(s => (
          <div key={s.name} style={{ border: `1px solid ${s.color}40`, background: `${s.color}10`, padding: '8px 14px', textAlign: 'center', minWidth: 90 }}>
            <p style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.12em', color: s.color }}>{s.name}</p>
            <p style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{s.agents} agentes</p>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.2)', marginTop: 14, textAlign: 'center', letterSpacing: '0.1em' }}>37 agentes · 4 squads · 1 lead</p>
    </motion.div>
  );
}

/* ── Squads grid ── */
function SquadsGridDiagram() {
  const squads = [
    { name: 'dev', agents: 10, color: '#A78BFA', focus: 'Backend, frontend, infra, QA' },
    { name: 'sites', agents: 10, color: '#FF3A0E', focus: 'Next.js, landing pages, SEO' },
    { name: 'social', agents: 7, color: '#EC4899', focus: 'Content, design, vídeo, publish' },
    { name: 'traffic', agents: 10, color: '#06B6D4', focus: 'Google, Meta, TikTok Ads' },
  ];
  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, width: 300 }}>
      {squads.map((s, i) => (
        <motion.div key={s.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.07 }}
          style={{ border: `1px solid ${s.color}35`, background: `${s.color}08`, padding: '12px' }}>
          <p style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.1em', color: s.color, marginBottom: 4 }}>{s.name}</p>
          <p style={{ fontFamily: MONO, fontSize: '18px', fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: 6 }}>{s.agents}</p>
          <p style={{ fontFamily: MONO, fontSize: '7px', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>{s.focus}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ── Solo vs Team comparison ── */
function SoloVsTeamDiagram() {
  const rows = [
    ['Uma sessão, um contexto', 'Múltiplos agentes em paralelo'],
    ['Faz tudo, faz mal', 'Cada um especialista no papel'],
    ['Sem verificação cruzada', 'QA formal: PASS / FAIL'],
    ['Sem memória entre sessões', 'Smart-memory compartilhada'],
    ['Bloqueante — uma coisa', 'Tasks em paralelo real'],
  ];
  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 320, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'rgba(255,255,255,0.04)' }}>
        <div style={{ padding: '6px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>IA solo</p>
        </div>
        <div style={{ padding: '6px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.2em', color: ACCENT, textTransform: 'uppercase' }}>Agentes em time</p>
        </div>
      </div>
      {rows.map(([bad, good], i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ padding: '8px 12px', borderRight: '1px solid rgba(255,255,255,0.06)', background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
            <p style={{ fontFamily: MONO, fontSize: '8.5px', color: 'rgba(255,255,255,0.32)', lineHeight: 1.4 }}>{bad}</p>
          </div>
          <div style={{ padding: '8px 12px', background: i % 2 === 0 ? 'rgba(255,58,14,0.03)' : 'transparent' }}>
            <p style={{ fontFamily: MONO, fontSize: '8.5px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>{good}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/* ── Agent flow diagram ── */
function AgentFlowDiagram() {
  const box = (label: string, sub: string, color = ACCENT) => (
    <div style={{ border: `1px solid ${color}40`, background: `${color}08`, padding: '5px 10px' }}>
      <p style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.08em', color }}>{label}</p>
      {sub && <p style={{ fontFamily: MONO, fontSize: '7px', color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{sub}</p>}
    </div>
  );
  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 280 }}>
      {box('/team-os', 'Usuário invoca', ACCENT)}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3px 0' }}><span style={{ fontFamily: MONO, fontSize: '11px', color: 'rgba(255,58,14,0.5)' }}>↓</span></div>
      {box('TeamCreate', 'cria o team e context', 'rgba(255,255,255,0.6)')}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3px 0' }}><span style={{ fontFamily: MONO, fontSize: '11px', color: 'rgba(255,58,14,0.5)' }}>↓</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {[
          ['dev-architect', 'escreve stories', '#A78BFA'],
          ['dev-dev-beta', 'implementa', '#A78BFA'],
          ['dev-qa', 'PASS / FAIL', '#A78BFA'],
          ['dev-devops', 'git push + PR', '#A78BFA'],
        ].map(([name, sub, color]) => (
          <div key={name} style={{ border: `1px solid ${color}30`, background: `${color}08`, padding: '5px 8px' }}>
            <p style={{ fontFamily: MONO, fontSize: '8px', color: color as string }}>{name}</p>
            <p style={{ fontFamily: MONO, fontSize: '7px', color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{sub}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3px 0' }}><span style={{ fontFamily: MONO, fontSize: '11px', color: 'rgba(255,58,14,0.5)' }}>↓</span></div>
      <div style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', padding: '5px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.4)' }}>SendMessage(lead)</span>
        <span style={{ fontFamily: MONO, fontSize: '8px', color: ACCENT }}>→ próximo passo</span>
      </div>
    </motion.div>
  );
}

/* ── team-os commands ── */
function TeamOsCommandsDiagram() {
  const cmds = [
    ['/team-os', 'Detecta estado e roteia'],
    ['*bootstrap', 'Init + Discovery completo'],
    ['*plan "obj"', 'Quebra em stories no backlog'],
    ['*dispatch', 'Forma time e inicia trabalho'],
    ['*status', 'Tasks, agentes, blockers'],
    ['*resume', 'Retoma sessão anterior'],
    ['*close', 'Arquiva e encerra o team'],
  ];
  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 300, border: '1px solid rgba(255,255,255,0.08)' }}>
      {cmds.map(([cmd, desc], i) => (
        <div key={cmd} style={{ display: 'flex', gap: 0, borderBottom: i < cmds.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
          <div style={{ padding: '7px 12px', width: 110, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.06em', color: ACCENT }}>{cmd}</p>
          </div>
          <div style={{ padding: '7px 12px' }}>
            <p style={{ fontFamily: MONO, fontSize: '8.5px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>{desc}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/* ── Smart memory tree ── */
function SmartMemoryTreeDiagram() {
  const line = (depth: number, name: string, desc?: string, accent?: boolean) => (
    <div key={name} style={{ display: 'flex', alignItems: 'baseline', gap: 6, padding: '2.5px 0' }}>
      <span style={{ fontFamily: MONO, fontSize: '9px', color: 'rgba(255,255,255,0.18)', flexShrink: 0 }}>
        {'  '.repeat(depth)}{depth > 0 ? '├─' : ''}
      </span>
      <span style={{ fontFamily: MONO, fontSize: '9px', color: accent ? ACCENT : 'rgba(255,255,255,0.7)' }}>{name}</span>
      {desc && <span style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.25)', marginLeft: 4 }}>← {desc}</span>}
    </div>
  );
  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 300, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', padding: '14px 16px' }}>
      <p style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: 10 }}>docs/smart-memory/</p>
      {line(0, 'project/', undefined, true)}
      {line(1, 'overview.md', 'síntese do projeto')}
      {line(1, 'architecture.md', 'padrão arquitetural')}
      {line(1, 'tech-stack.md', 'stack e versões')}
      {line(0, 'stories/', undefined, true)}
      {line(1, 'backlog/', 'próximas')}
      {line(1, 'active/', 'em progresso')}
      {line(1, 'done/', 'concluídas')}
      {line(0, 'decisions/', 'ADRs', true)}
      {line(0, 'ops/', undefined, true)}
      {line(1, 'teams-log.md', 'histórico de times')}
      {line(1, 'delegation-log.md', 'delegações')}
      <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <p style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.25)', lineHeight: 1.6 }}>Compatível com Obsidian — wikilinks [[arquivo]], frontmatter YAML, tags canônicas.</p>
      </div>
    </motion.div>
  );
}

/* ── creator commands ── */
function CreatorCommandsDiagram() {
  const cmds = [
    ['/team-os-creator', 'Scan CT projects + menu criar / atualizar / instalar'],
    ['*analyze', 'Detecta archetype do projeto, sem criar nada'],
    ['*squad <preset>', 'Cria squad inteira: dev / data / content / marketing / custom'],
    ['*create <role>', 'Cria UM agente interativamente'],
    ['*skills <agente>', 'Enriquece agente existente com skills do skills.sh'],
    ['*preset-list', 'Lista presets disponíveis e seus agentes'],
    ['*audit', 'Valida compliance de todos os agentes criados'],
    ['*propagate', 'Propaga agentes atualizados para projetos do CT'],
    ['*install', 'Instala squads + skills em projeto destino'],
  ];
  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 340, border: '1px solid rgba(255,255,255,0.08)' }}>
      {cmds.map(([cmd, desc], i) => (
        <div key={cmd} style={{ display: 'flex', borderBottom: i < cmds.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
          <div style={{ padding: '7px 12px', width: 150, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.04em', color: ACCENT }}>{cmd}</p>
          </div>
          <div style={{ padding: '7px 12px' }}>
            <p style={{ fontFamily: MONO, fontSize: '7.5px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{desc}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/* ── Getting started 3 steps ── */
function GettingStartedDiagram() {
  const steps = [
    { n: '01', cmd: '/team-os-creator\n*install', desc: 'Detecta stack, propõe agentes, instala tudo em .claude/' },
    { n: '02', cmd: '/team-os', desc: 'Bootstrap automático: descobre o projeto, popula smart-memory' },
    { n: '03', cmd: '/team-os *plan\n/team-os *dispatch', desc: 'Stories criadas, time formado, trabalho em paralelo' },
  ];
  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 290, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {steps.map((s, i) => (
        <motion.div key={s.n} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
          style={{ display: 'flex', gap: 12, alignItems: 'flex-start', border: '1px solid rgba(255,255,255,0.08)', padding: '10px 12px', background: 'rgba(255,255,255,0.015)' }}>
          <div style={{ flexShrink: 0, width: 24, height: 24, border: `1px solid rgba(255,58,14,0.4)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: MONO, fontSize: '9px', color: ACCENT, fontWeight: 700 }}>{s.n}</span>
          </div>
          <div style={{ flex: 1 }}>
            <pre style={{ fontFamily: MONO, fontSize: '8.5px', color: ACCENT, lineHeight: 1.6, margin: 0, marginBottom: 5 }}>{s.cmd}</pre>
            <p style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{s.desc}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ── Limites: Contraste (slide 2) ── */
function LimitesContrasteDiagram() {
  const left  = ['Tanta tecnologia', 'Tanto acesso', 'Tanta liberdade de criação'];
  const right = ['Burnout cresce', 'Ansiedade cresce', 'Vazio cresce'];
  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 300 }}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        {/* coluna esquerda */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <p style={{ fontFamily: MONO, fontSize: '7px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>tivemos</p>
          {left.map((item, i) => (
            <motion.div key={item} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
              style={{ padding: '7px 10px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.025)' }}>
              <p style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{item}</p>
            </motion.div>
          ))}
        </div>
        {/* coluna direita */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <p style={{ fontFamily: MONO, fontSize: '7px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,58,14,0.5)', marginBottom: 4 }}>mesmo assim</p>
          {right.map((item, i) => (
            <motion.div key={item} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
              style={{ padding: '7px 10px', border: '1px solid rgba(255,58,14,0.2)', background: 'rgba(255,58,14,0.06)' }}>
              <p style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        style={{ padding: '10px 12px', border: '1px solid rgba(255,255,255,0.06)', borderLeft: '2px solid rgba(255,58,14,0.5)', background: 'rgba(255,255,255,0.01)' }}>
        <p style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontStyle: 'italic' }}>
          &quot;A mente prefere o conhecido ao potencial.&quot;
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ── Limites: Disfarces (slide 3) ── */
function LimitesDisfarcesDiagram() {
  const items = ['Perfeccionismo', 'Procrastinação', 'Excesso de preparo', 'Medo de exposição'];
  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 270 }}>
      <p style={{ fontFamily: MONO, fontSize: '7px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 12 }}>limites se disfarçam de</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
        {items.map((item, i) => (
          <motion.div key={item} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.12 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,58,14,0.5)', flexShrink: 0 }} />
            <p style={{ fontFamily: MONO, fontSize: '9px', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>{item}</p>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
        style={{ padding: '10px 12px', border: '1px solid rgba(255,255,255,0.06)', borderLeft: '2px solid rgba(255,58,14,0.5)' }}>
        <p style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontStyle: 'italic' }}>
          &quot;Perfeccionismo não impede erro.<br />Impede existência.&quot;
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ── Limites: O que exige (slide 4) ── */
function LimitesExigeDiagram() {
  const items = ['Consciência', 'Presença', 'Direção', 'Disciplina interior', 'Coragem para agir imperfeito'];
  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 260 }}>
      <p style={{ fontFamily: MONO, fontSize: '7px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 12 }}>superar exige</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
        {items.map((item, i) => (
          <motion.div key={item} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <p style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.6)' }}>{String(i + 1).padStart(2, '0')}</p>
            <p style={{ fontFamily: MONO, fontSize: '8.5px', color: 'rgba(255,255,255,0.65)' }}>{item}</p>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }}
        style={{ padding: '8px 12px', background: 'rgba(255,58,14,0.08)', border: '1px solid rgba(255,58,14,0.2)' }}>
        <p style={{ fontFamily: MONO, fontSize: '8.5px', color: ACCENT, letterSpacing: '0.08em' }}>Movimento gera clareza.</p>
      </motion.div>
    </motion.div>
  );
}

/* ── Limites: Valores flow (slide 5) ── */
function LimitesFlowDiagram() {
  const pairs: [string, string][] = [
    ['Consciência', 'direção'],
    ['Clareza', 'expansão'],
    ['Coragem', 'construção'],
  ];
  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 270 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {pairs.map(([from, to], i) => (
          <motion.div key={from} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.15 }}
            style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <div style={{ padding: '10px 14px', border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.07)', minWidth: 110, textAlign: 'center' }}>
              <p style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.08em', color: ACCENT }}>{from}</p>
            </div>
            <motion.div animate={{ scaleX: [0.7, 1, 0.7] }} transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.4, ease: 'easeInOut' }}
              style={{ height: 1, width: 28, background: `linear-gradient(to right, ${ACCENT}66, rgba(255,255,255,0.3))`, transformOrigin: 'left', flexShrink: 0 }} />
            <div style={{ padding: '10px 14px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.025)', flex: 1, textAlign: 'center' }}>
              <p style={{ fontFamily: MONO, fontSize: '9px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em' }}>{to}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        style={{ padding: '10px 14px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
        <p style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7 }}>
          O mundo não precisa só de pessoas produtivas.<br />
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>Precisa de pessoas conscientes.</span>
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ── Agent anatomy diagram ── */
function AgentAnatomyDiagram() {
  const row = (label: string, value: string, accent?: boolean) => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', padding: '2.5px 0' }}>
      <span style={{ fontFamily: MONO, fontSize: '8.5px', color: 'rgba(255,255,255,0.28)', flexShrink: 0, width: 110 }}>{label}</span>
      <span style={{ fontFamily: MONO, fontSize: '9px', color: accent ? ACCENT : 'rgba(255,255,255,0.7)' }}>{value}</span>
    </div>
  );
  const pill = (text: string) => (
    <span key={text} style={{ fontFamily: MONO, fontSize: '7.5px', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.1)', padding: '2px 6px', background: 'rgba(255,255,255,0.03)' }}>{text}</span>
  );
  const block = (label: string, desc: string) => (
    <div key={label} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '3.5px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ width: 3, height: 3, background: ACCENT, opacity: 0.6, flexShrink: 0, marginTop: 5 }} />
      <div>
        <span style={{ fontFamily: MONO, fontSize: '8.5px', color: 'rgba(255,255,255,0.72)' }}>{label}</span>
        <span style={{ fontFamily: MONO, fontSize: '7.5px', color: 'rgba(255,255,255,0.28)', marginLeft: 6 }}>{desc}</span>
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 310, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', padding: '14px 16px', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>
      {/* File path */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ width: 5, height: 5, background: ACCENT, opacity: 0.8 }} />
        <span style={{ fontFamily: MONO, fontSize: '8.5px', color: 'rgba(255,255,255,0.35)' }}>.claude/agents/</span>
        <span style={{ fontFamily: MONO, fontSize: '8.5px', color: ACCENT }}>nome.md</span>
      </div>

      {/* Frontmatter */}
      <div style={{ marginBottom: 10 }}>
        <p style={{ fontFamily: MONO, fontSize: '7.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 7 }}>Frontmatter</p>
        {row('name:', 'nome-do-agente', true)}
        {row('description:', 'quando delegar para este agente')}
        {row('model:', 'sonnet · opus · haiku')}
        {row('permissionMode:', 'auto · bypassPermissions · default')}
        {row('memory:', 'user · project · local')}
        <div style={{ padding: '2.5px 0' }}>
          <span style={{ fontFamily: MONO, fontSize: '8.5px', color: 'rgba(255,255,255,0.28)', display: 'block', marginBottom: 4 }}>tools:</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, paddingLeft: 4 }}>
            {['Bash', 'Read', 'Edit', 'Write', 'WebFetch', 'Agent'].map(pill)}
          </div>
        </div>
        {row('skills:', 'skills pré-carregadas no contexto')}
        {row('hooks:', 'PreToolUse · PostToolUse')}
      </div>

      {/* Body */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 10 }}>
        <p style={{ fontFamily: MONO, fontSize: '7.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 7 }}>Body — System Prompt (Markdown)</p>
        {block('Persona', 'nome, tom de voz, estilo')}
        {block('Papel definido', 'o que é seu e o que não é')}
        {block('Contrato com o time', 'como se coordena com o lead')}
        {block('Instruções específicas', 'regras, restrições, padrões')}
      </div>
    </motion.div>
  );
}

/* ── All agents: filtro por squad + belt/grid ── */
function AllAgentsDiagram({ agents }: { agents: SlideAgent[] }) {
  const FILTERS = [
    { id: 'all',     label: 'All',     accent: 'rgba(255,255,255,0.55)' },
    { id: 'dev',     label: 'Dev',     accent: '#A78BFA' },
    { id: 'sites',   label: 'Sites',   accent: '#FF3A0E' },
    { id: 'social',  label: 'Social',  accent: '#EC4899' },
    { id: 'traffic', label: 'Traffic', accent: '#06B6D4' },
  ] as const;

  const [active, setActive] = React.useState<string>('all');

  const filtered = active === 'all'
    ? agents
    : agents.filter((a) => {
        const accent = active === 'dev'     ? '#A78BFA'
                    : active === 'sites'   ? '#FF3A0E'
                    : active === 'social'  ? '#EC4899'
                    :                        '#06B6D4';
        return a.accent === accent;
      });

  const showBelt = active === 'all';

  return (
    <div style={{ width: '100%' }}>
      {/* Filter chips */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}
      >
        {FILTERS.map((f) => {
          const isActive = active === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              style={{
                fontFamily: MONO,
                fontSize: '9px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '5px 12px',
                border: `1px solid ${isActive ? f.accent : 'rgba(255,255,255,0.12)'}`,
                background: isActive ? `${f.accent}18` : 'transparent',
                color: isActive ? f.accent : 'rgba(255,255,255,0.35)',
                cursor: 'pointer',
                transition: 'all 0.18s',
              }}
            >
              {f.label}
            </button>
          );
        })}
      </motion.div>

      {/* Belt — all agents */}
      {showBelt && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AgentBelt agents={agents} />
        </motion.div>
      )}

      {/* Grid — filtered */}
      {!showBelt && (
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <AgentGrid agents={filtered} />
        </motion.div>
      )}
    </div>
  );
}

/* ── Squads detail: 4 colunas com todos os agentes por squad ── */
function SquadsDetailDiagram() {
  const squadAccents: Record<string, string> = {
    dev: '#A78BFA',
    sites: '#FF3A0E',
    social: '#EC4899',
    traffic: '#06B6D4',
  };
  const squadAuthorities: Record<string, string> = {
    dev: 'devops · push exclusivo  |  qa · veredictos',
    sites: 'devops · push exclusivo  |  qa · veredictos',
    social: 'strategist · aprovação final',
    traffic: 'bi · dados oficiais  |  qa · pré-launch',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', gap: 8, alignItems: 'flex-start', width: 480, maxHeight: '60vh', overflowY: 'auto' }}
    >
      {SQUADS.map((squad, si) => {
        const agentes = getAgentesBySquad(squad.id);
        const accent = squadAccents[squad.id] ?? ACCENT;
        const authority = squadAuthorities[squad.id] ?? '';
        return (
          <motion.div
            key={squad.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + si * 0.08, duration: 0.4 }}
            style={{ flex: 1, border: `1px solid ${accent}30`, background: `${accent}07`, overflow: 'hidden' }}
          >
            {/* Squad header */}
            <div style={{ padding: '7px 9px', borderBottom: `1px solid ${accent}25`, background: `${accent}10` }}>
              <p style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.12em', color: accent, textTransform: 'uppercase', marginBottom: 2 }}>{squad.label}</p>
              <p style={{ fontFamily: MONO, fontSize: '18px', fontWeight: 800, color: accent, lineHeight: 1 }}>{squad.count}</p>
            </div>

            {/* Agent list */}
            <div style={{ padding: '6px 0' }}>
              {agentes.map((a, ai) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 + si * 0.08 + ai * 0.04 }}
                  style={{
                    padding: '4px 9px',
                    borderBottom: ai < agentes.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}
                >
                  <p style={{ fontFamily: MONO, fontSize: '8.5px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.3, letterSpacing: '0.02em' }}>
                    {a.codename || a.name}
                  </p>
                  {a.title && (
                    <p style={{ fontFamily: MONO, fontSize: '7px', color: 'rgba(255,255,255,0.28)', lineHeight: 1.2, marginTop: 1 }}>
                      {a.title}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Authority footer */}
            {authority && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + si * 0.06 }}
                style={{ padding: '5px 9px', borderTop: `1px solid ${accent}20`, background: `${accent}08` }}
              >
                <p style={{ fontFamily: MONO, fontSize: '6.5px', color: `${accent}99`, lineHeight: 1.4, letterSpacing: '0.04em' }}>{authority}</p>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export function ModuloSlideshow({ slug, slides }: ModuloSlideshowProps) {
  const [current, setCurrent] = useState(0);

  const modulo = MODULOS_PRESENCIAIS.find((m) => m.slug === slug)!;
  const idx    = MODULOS_PRESENCIAIS.indexOf(modulo);
  const prev   = idx > 0 ? MODULOS_PRESENCIAIS[idx - 1] : null;
  const next   = idx < MODULOS_PRESENCIAIS.length - 1 ? MODULOS_PRESENCIAIS[idx + 1] : null;
  const isFirst = current === 0;
  const isLast  = current === slides.length - 1;

  const goTo   = useCallback((i: number) => setCurrent(i), []);
  const goNext = useCallback(() => { if (!isLast)  goTo(current + 1); }, [current, isLast, goTo]);
  const goPrev = useCallback(() => { if (!isFirst) goTo(current - 1); }, [current, isFirst, goTo]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goPrev();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [goNext, goPrev]);

  const slide = slides[current]!;
  const num   = String(current + 1).padStart(2, '0');
  const total = String(slides.length).padStart(2, '0');
  const pct   = slides.length > 1 ? (current / (slides.length - 1)) * 100 : 100;

  const hasBelt       = !!(slide.belt && slide.agents?.length);
  const hasGrid       = !!(slide.agents?.length && !slide.belt);
  const hasScreenshot = !!slide.screenshot;
  const hasVideo      = !!slide.video;
  const hasDiagram    = !!slide.diagram;
  const hasRight      = hasGrid || hasScreenshot || hasVideo || hasDiagram;

  return (
    <div className="relative flex flex-col" style={{ height: '100dvh', background: '#050507', color: '#fff', overflow: 'hidden' }}>

      {/* Glow */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 55% 50% at 5% 60%, rgba(255,58,14,0.05) 0%, transparent 65%), radial-gradient(ellipse 40% 50% at 90% 10%, rgba(255,255,255,0.018) 0%, transparent 55%)' }} />

      {/* Top bar */}
      <div className="relative flex items-center justify-between px-8 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/mentoria/presencial" className="flex items-center gap-2 transition-colors hover:text-[#FF3A0E]" style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Dia Presencial
        </Link>
        <div className="flex items-center gap-3">
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>Módulo {String(modulo.number).padStart(2, '0')}</span>
          <span className="border px-2.5 py-0.5" style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: ACCENT, borderColor: 'rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.06)' }}>{modulo.type}</span>
        </div>
      </div>

      {/* Module progress */}
      <div className="flex gap-px flex-shrink-0">
        {MODULOS_PRESENCIAIS.map((m) => (
          <Link key={m.slug} href={m.href} title={`Módulo ${m.number} — ${m.title}`} className="flex-1 transition-opacity hover:opacity-60"
            style={{ height: 2, background: m.number < modulo.number ? 'rgba(255,58,14,0.5)' : m.slug === slug ? ACCENT : 'rgba(255,255,255,0.08)' }} />
        ))}
      </div>

      {/* Slide progress */}
      <div className="flex-shrink-0" style={{ height: 1, background: 'rgba(255,255,255,0.06)', position: 'relative' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} style={{ position: 'absolute', inset: 0, width: 0, background: 'rgba(255,58,14,0.55)' }} />
      </div>

      {/* Slide content */}
      <div className="relative flex-1 flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={current} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTx}
            className="absolute inset-0 flex items-center overflow-y-auto"
            style={{ padding: hasBelt ? '1.5rem 2.5rem 1rem' : '1.5rem 2.5rem 2rem' }}
          >
            <div className="w-full max-w-6xl mx-auto">

              {/* Counter + label */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className="flex items-center gap-3 mb-6">
                <span style={{ fontFamily: MONO, fontSize: '12px', fontWeight: 700, color: ACCENT }}>{num}</span>
                <span style={{ fontFamily: MONO, fontSize: '10px', color: 'rgba(255,255,255,0.15)' }}>/</span>
                <span style={{ fontFamily: MONO, fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>{total}</span>
                <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.12)', margin: '0 4px' }} />
                <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT }}>{slide.label}</span>
              </motion.div>

              {/* Main layout: left text + right visual */}
              <div className={hasRight ? 'flex gap-10 xl:gap-16 items-start' : 'flex flex-col'}>

                {/* Left */}
                <div className="flex-1 min-w-0">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontFamily: SERIF,
                      fontSize: hasRight ? 'clamp(1.8rem, 3.5vw, 3.4rem)' : hasBelt ? 'clamp(2rem, 4vw, 3.8rem)' : 'clamp(2.2rem, 5vw, 5rem)',
                      fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.025em', color: '#fff', marginBottom: '1.25rem',
                    }}
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2, duration: 0.45 }}
                    style={{ width: '2rem', height: 2, background: ACCENT, marginBottom: '1.25rem' }} />

                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    style={{ fontFamily: DISPLAY, fontSize: 'clamp(0.88rem, 1.4vw, 1.05rem)', lineHeight: 1.8, color: 'rgba(255,255,255,0.62)', maxWidth: hasRight ? '34rem' : '42rem' }}>
                    {slide.body}
                  </motion.p>

                  {/* Note */}
                  {slide.note && !hasScreenshot && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                      className="mt-5 border-l pl-5" style={{ borderColor: 'rgba(255,58,14,0.35)' }}>
                      <p style={{ fontFamily: DISPLAY, fontSize: '0.875rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, fontStyle: 'italic' }}>{slide.note}</p>
                    </motion.div>
                  )}

                  {/* Clients */}
                  {slide.clients?.length && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }} className="mt-5 flex flex-wrap gap-2">
                      {slide.note && (
                        <p style={{ width: '100%', fontFamily: MONO, fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 4 }}>
                          {slide.note}
                        </p>
                      )}
                      {slide.clients.map((c) => (
                        <span key={c} style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.12)', padding: '4px 12px', background: 'rgba(255,255,255,0.03)' }}>{c}</span>
                      ))}
                    </motion.div>
                  )}

                  {/* Stats */}
                  {slide.stats?.length && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}
                      className="mt-6 flex gap-8 flex-wrap" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.25rem' }}>
                      {slide.stats.map((s) => (
                        <div key={s.label}>
                          <p style={{ fontFamily: MONO, fontSize: '8.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 4 }}>{s.label}</p>
                          <p style={{ fontFamily: SERIF, fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 300, color: ACCENT, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.value}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Right: video */}
                {hasVideo && (
                  <div className="flex-shrink-0 w-[45%] min-w-[300px] max-w-[560px]">
                    <VideoFrame src={slide.video!} />
                  </div>
                )}

                {/* Right: screenshot */}
                {!hasVideo && hasScreenshot && (
                  <div className="flex-shrink-0 w-[45%] min-w-[300px] max-w-[560px]">
                    <ScreenshotFrame src={slide.screenshot!} />
                  </div>
                )}

                {/* Right: agent grid */}
                {hasGrid && (
                  <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex-shrink-0">
                    <AgentGrid agents={slide.agents!} />
                  </motion.div>
                )}

                {/* Right: diagram */}
                {hasDiagram && (
                  <div className="flex-shrink-0">
                    {slide.diagram === 'agent-anatomy'     && <AgentAnatomyDiagram />}
                    {slide.diagram === 'webhook'           && <WebhookDiagram />}
                    {slide.diagram === 'api'               && <ApiDiagram />}
                    {slide.diagram === 'mcp'               && <McpDiagram />}
                    {slide.diagram === 'claude-md'         && <ClaudeMdDiagram />}
                    {slide.diagram === 'claude-structure'  && <ClaudeStructureDiagram />}
                    {slide.diagram === 'hub-and-spoke'     && <HubAndSpokeDiagram />}
                    {slide.diagram === 'squads-grid'       && <SquadsGridDiagram />}
                    {slide.diagram === 'solo-vs-team'      && <SoloVsTeamDiagram />}
                    {slide.diagram === 'agent-flow'        && <AgentFlowDiagram />}
                    {slide.diagram === 'team-os-commands'  && <TeamOsCommandsDiagram />}
                    {slide.diagram === 'smart-memory-tree' && <SmartMemoryTreeDiagram />}
                    {slide.diagram === 'creator-commands'  && <CreatorCommandsDiagram />}
                    {slide.diagram === 'getting-started'   && <GettingStartedDiagram />}
                    {slide.diagram === 'ct-overview'          && <CtOverviewDiagram />}
                    {slide.diagram === 'team-protocol'        && <TeamProtocolDiagram />}
                    {slide.diagram === 'limites-contraste'    && <LimitesContrasteDiagram />}
                    {slide.diagram === 'limites-disfarces'    && <LimitesDisfarcesDiagram />}
                    {slide.diagram === 'limites-exige'        && <LimitesExigeDiagram />}
                    {slide.diagram === 'limites-flow'         && <LimitesFlowDiagram />}
                    {slide.diagram === 'squads-detail'        && <SquadsDetailDiagram />}
                    {slide.diagram === 'all-agents'           && <AllAgentsDiagram agents={slide.agents ?? []} />}
                  </div>
                )}
              </div>

              {/* Belt */}
              {hasBelt && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="mt-8">
                  <AgentBelt agents={slide.agents!} />
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div className="relative flex-shrink-0 flex items-center justify-between px-8 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
              style={{ width: i === current ? 18 : 5, height: 5, background: i === current ? ACCENT : 'rgba(255,255,255,0.18)', border: 'none', cursor: 'pointer', padding: 0, borderRadius: 9999, transition: 'all 0.2s' }} />
          ))}
        </div>
        <div className="flex items-center gap-3">
          {!isFirst ? (
            <button onClick={goPrev} className="flex items-center gap-2 transition-colors hover:text-white"
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer' }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Anterior
            </button>
          ) : prev ? (
            <Link href={prev.href} className="flex items-center gap-2 transition-colors hover:text-white"
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Módulo {prev.number}
            </Link>
          ) : null}

          {!isLast ? (
            <button onClick={goNext} className="flex items-center gap-3 px-5 py-2.5"
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', background: ACCENT, color: '#050507', border: 'none', cursor: 'pointer', fontWeight: 700 }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}>
              Próximo
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          ) : next ? (
            <Link href={next.href} className="flex items-center gap-3 px-5 py-2.5 transition-opacity hover:opacity-85"
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', background: ACCENT, color: '#050507', fontWeight: 700 }}>
              Módulo {next.number}
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          ) : (
            <Link href="/academy" className="flex items-center gap-3 px-5 py-2.5 transition-opacity hover:opacity-85"
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', background: ACCENT, color: '#050507', fontWeight: 700 }}>
              Acessar Academy
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          )}
        </div>
      </div>

      <div className="absolute bottom-[4.2rem] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.1)' }}>
        ← → para navegar
      </div>
    </div>
  );
}
