'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MODULOS_PRESENCIAIS } from '../_components/ModuloLayout';

const MONO    = 'var(--font-mono)';
const SERIF   = 'var(--font-display-serif)';
const DISPLAY = 'var(--font-display)';
const ACCENT  = '#FF3A0E';

type OS = 'mac' | 'linux' | 'windows';

function CodeLine({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      className="group flex items-center justify-between gap-4 px-4 py-3 rounded cursor-pointer transition-colors"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      onClick={async () => {
        await navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
    >
      <code style={{ fontFamily: MONO, fontSize: '13px', color: 'rgba(255,255,255,0.85)', wordBreak: 'break-all' }}>
        {children}
      </code>
      <span
        className="flex-shrink-0 transition-opacity"
        style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: copied ? '#4ade80' : 'rgba(255,255,255,0.25)', opacity: copied ? 1 : undefined }}
      >
        {copied ? 'copiado!' : 'copiar'}
      </span>
    </div>
  );
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5">
      <div
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm font-bold mt-0.5"
        style={{ fontFamily: MONO, fontSize: '11px', color: ACCENT, border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.06)' }}
      >
        {String(number).padStart(2, '0')}
      </div>
      <div className="flex-1 pb-8" style={{ borderBottom: number < 99 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
        <h3 className="text-base font-semibold text-white mb-3" style={{ fontFamily: DISPLAY }}>
          {title}
        </h3>
        <div className="space-y-3 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: DISPLAY }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 px-4 py-3 rounded" style={{ background: 'rgba(255,58,14,0.06)', border: '1px solid rgba(255,58,14,0.2)' }}>
      <span style={{ color: ACCENT, flexShrink: 0 }}>✦</span>
      <p style={{ fontFamily: DISPLAY, fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{children}</p>
    </div>
  );
}

const TABS: { id: OS; label: string }[] = [
  { id: 'mac',     label: 'Mac' },
  { id: 'linux',   label: 'Linux' },
  { id: 'windows', label: 'Windows' },
];

function MacContent() {
  return (
    <div className="space-y-8">
      <Step number={1} title="Instalar o Homebrew">
        <p>O Homebrew é o gerenciador de pacotes do Mac — permite instalar ferramentas de desenvolvimento com um comando. Abra o Terminal (Command + Espaço → "Terminal") e cole:</p>
        <CodeLine>/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</CodeLine>
        <p>Siga as instruções na tela. Pode pedir sua senha. Aguarde a instalação terminar.</p>
        <Callout>Se o Homebrew já estiver instalado, esse comando vai atualizá-lo. Sem problema.</Callout>
      </Step>

      <Step number={2} title="Instalar o Node.js">
        <p>O Claude Code precisa do Node.js para funcionar. Com o Homebrew instalado:</p>
        <CodeLine>brew install node</CodeLine>
        <p>Confirme que instalou corretamente:</p>
        <CodeLine>node --version</CodeLine>
        <p>Deve aparecer algo como <code style={{ fontFamily: MONO, fontSize: '12px', color: ACCENT }}>v20.x.x</code> ou superior.</p>
      </Step>

      <Step number={3} title="Instalar o Claude Code">
        <p>Agora instale a CLI do Claude Code globalmente:</p>
        <CodeLine>npm install -g @anthropic-ai/claude-code</CodeLine>
        <p>Confirme a instalação:</p>
        <CodeLine>claude --version</CodeLine>
        <Callout>Se aparecer um erro de permissão, rode: <code style={{ fontFamily: MONO, fontSize: '12px' }}>sudo npm install -g @anthropic-ai/claude-code</code></Callout>
      </Step>

      <Step number={4} title="Autenticar com sua conta Anthropic">
        <p>Execute o Claude Code pela primeira vez:</p>
        <CodeLine>claude</CodeLine>
        <p>Ele vai pedir para autenticar. Siga o fluxo de login no navegador que abrir. Use a mesma conta que você tem no claude.ai.</p>
      </Step>

      <Step number={5} title="Verificar que está funcionando">
        <p>Dentro de uma pasta de projeto, execute:</p>
        <CodeLine>claude "olá, me diga em qual pasta estou"</CodeLine>
        <p>Se o Claude responder descrevendo a pasta, está tudo funcionando. Parabéns — você tem Claude Code rodando no seu Mac.</p>
      </Step>
    </div>
  );
}

function LinuxContent() {
  return (
    <div className="space-y-8">
      <Step number={1} title="Instalar o Node.js via NodeSource">
        <p>Abra o terminal e rode os comandos abaixo para adicionar o repositório oficial do Node.js e instalá-lo:</p>
        <CodeLine>curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -</CodeLine>
        <CodeLine>sudo apt-get install -y nodejs</CodeLine>
        <p>Confirme a instalação:</p>
        <CodeLine>node --version</CodeLine>
        <Callout>Esses comandos são para distribuições baseadas em Debian/Ubuntu. Se usar Fedora, Arch ou outra distro, consulte a documentação do NodeSource para seu sistema.</Callout>
      </Step>

      <Step number={2} title="Instalar o Claude Code">
        <p>Com o Node.js instalado, instale a CLI do Claude Code globalmente:</p>
        <CodeLine>npm install -g @anthropic-ai/claude-code</CodeLine>
        <p>Se aparecer erro de permissão, rode com sudo:</p>
        <CodeLine>sudo npm install -g @anthropic-ai/claude-code</CodeLine>
        <p>Confirme:</p>
        <CodeLine>claude --version</CodeLine>
      </Step>

      <Step number={3} title="Autenticar com sua conta Anthropic">
        <p>Execute o Claude Code pela primeira vez:</p>
        <CodeLine>claude</CodeLine>
        <p>Ele vai abrir um link de autenticação. Se o terminal não abrir o navegador automaticamente, copie o link e abra manualmente. Use a mesma conta do claude.ai.</p>
      </Step>

      <Step number={4} title="Verificar que está funcionando">
        <p>Dentro de uma pasta de projeto:</p>
        <CodeLine>claude "olá, me diga em qual pasta estou"</CodeLine>
        <p>Se o Claude responder descrevendo a pasta, está tudo pronto.</p>
        <Callout>No Linux, certifique-se de que o PATH do npm global está configurado. Se o comando "claude" não for reconhecido após a instalação, adicione ao seu .bashrc: <code style={{ fontFamily: MONO, fontSize: '12px' }}>export PATH="$PATH:$(npm prefix -g)/bin"</code></Callout>
      </Step>
    </div>
  );
}

function WindowsContent() {
  return (
    <div className="space-y-8">
      <Callout>Recomendamos usar o WSL2 (Windows Subsystem for Linux) para a melhor experiência com Claude Code no Windows. O fluxo abaixo instala o WSL2 primeiro e depois o Claude Code dentro dele.</Callout>

      <Step number={1} title="Instalar o WSL2 (Windows Subsystem for Linux)">
        <p>Abra o PowerShell como Administrador (Menu Iniciar → PowerShell → clique direito → "Executar como administrador") e rode:</p>
        <CodeLine>wsl --install</CodeLine>
        <p>Aguarde. O Windows vai instalar o WSL2 com Ubuntu. <strong>Reinicie o computador quando solicitado.</strong></p>
        <p>Após reiniciar, o Ubuntu vai abrir automaticamente pedindo para criar usuário e senha.</p>
      </Step>

      <Step number={2} title="Instalar o Node.js dentro do WSL2">
        <p>No terminal do Ubuntu (WSL2), rode:</p>
        <CodeLine>curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -</CodeLine>
        <CodeLine>sudo apt-get install -y nodejs</CodeLine>
        <p>Confirme:</p>
        <CodeLine>node --version</CodeLine>
      </Step>

      <Step number={3} title="Instalar o Claude Code">
        <p>Ainda no terminal do Ubuntu (WSL2):</p>
        <CodeLine>npm install -g @anthropic-ai/claude-code</CodeLine>
        <p>Confirme:</p>
        <CodeLine>claude --version</CodeLine>
      </Step>

      <Step number={4} title="Instalar a extensão do VS Code para WSL (recomendado)">
        <p>Se usar VS Code, instale a extensão "WSL" da Microsoft. Ela permite abrir qualquer pasta do WSL2 diretamente no VS Code com integração completa.</p>
        <CodeLine>code --install-extension ms-vscode-remote.remote-wsl</CodeLine>
        <Callout>Com essa extensão, você navega até sua pasta de projeto no WSL2 e abre com "code ." — o VS Code abre integrado com o ambiente Linux.</Callout>
      </Step>

      <Step number={5} title="Autenticar e verificar">
        <p>No terminal do Ubuntu (WSL2), execute:</p>
        <CodeLine>claude</CodeLine>
        <p>Siga o fluxo de autenticação no navegador. Depois confirme:</p>
        <CodeLine>claude "olá, me diga em qual pasta estou"</CodeLine>
        <p>Se responder, está tudo funcionando.</p>
      </Step>
    </div>
  );
}

export default function SetupInstalacaoPage() {
  const [activeTab, setActiveTab] = useState<OS>('mac');
  const modulo  = MODULOS_PRESENCIAIS.find((m) => m.slug === 'setup-instalacao')!;
  const idx     = MODULOS_PRESENCIAIS.indexOf(modulo);
  const prev    = idx > 0 ? MODULOS_PRESENCIAIS[idx - 1] : null;

  return (
    <div className="min-h-screen" style={{ background: '#050507', color: '#fff' }}>
      <div className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">

        {/* ── Top bar ── */}
        <div className="flex items-center justify-between mb-10">
          <Link
            href="/mentoria/modulos"
            className="flex items-center gap-2 transition-colors hover:text-[#FF3A0E]"
            style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Dia Presencial
          </Link>
          <span
            className="border px-2.5 py-1"
            style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: ACCENT, borderColor: 'rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.08)' }}
          >
            {modulo.type}
          </span>
        </div>

        {/* ── Module progress bar ── */}
        <div className="flex gap-1 mb-10">
          {MODULOS_PRESENCIAIS.map((m) => (
            <Link
              key={m.slug}
              href={m.href}
              title={`Módulo ${m.number} — ${m.title}`}
              className="flex-1 transition-colors"
              style={{
                height: '1px',
                background: m.number < modulo.number ? 'rgba(255,58,14,0.4)' : m.slug === 'setup-instalacao' ? ACCENT : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>

        {/* ── Header ── */}
        <header className="mb-10">
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, display: 'block', marginBottom: '0.5rem' }}>
            Módulo {String(modulo.number).padStart(2, '0')} · {modulo.date}
          </span>
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Setup e Instalação
          </h1>
          <p style={{ fontFamily: DISPLAY, fontSize: '1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, maxWidth: '36rem' }}>
            Escolha o seu sistema operacional abaixo e siga o passo a passo. Todos os comandos são copy-paste — clique em qualquer um para copiar.
          </p>
        </header>

        {/* ── OS Tabs ── */}
        <div className="mb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex gap-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  fontFamily: MONO,
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  padding: '12px 24px',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? `2px solid ${ACCENT}` : '2px solid transparent',
                  background: 'transparent',
                  color: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.35)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  marginBottom: '-1px',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab content ── */}
        <div>
          {activeTab === 'mac'     && <MacContent />}
          {activeTab === 'linux'   && <LinuxContent />}
          {activeTab === 'windows' && <WindowsContent />}
        </div>

        {/* ── Nav ── */}
        <nav className="mt-16 border-t pt-8" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between">
            {prev && (
              <Link href={prev.href} className="group flex flex-col gap-1">
                <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
                  ← Anterior
                </span>
                <span className="text-base transition-colors group-hover:text-[#FF3A0E]" style={{ fontFamily: DISPLAY, color: 'rgba(255,255,255,0.6)' }}>
                  {String(prev.number).padStart(2, '0')} · {prev.title}
                </span>
              </Link>
            )}
            <Link
              href="/mentoria#inscricao"
              className="flex items-center gap-2 px-6 py-3 ml-auto transition-all hover:brightness-110"
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', background: ACCENT, color: '#050507', fontWeight: 600 }}
            >
              Garantir minha vaga
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
