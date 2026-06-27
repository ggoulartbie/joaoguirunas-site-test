'use client';

import { useEffect, useRef, useState } from 'react';

const REVEAL_CDN = 'https://cdn.jsdelivr.net/npm/reveal.js@5.0.4';

export function ApresentacaoClient() {
  const deckRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Load Reveal.js CSS
    const linkReveal = document.createElement('link');
    linkReveal.rel = 'stylesheet';
    linkReveal.href = `${REVEAL_CDN}/dist/reveal.css`;
    document.head.appendChild(linkReveal);

    const linkTheme = document.createElement('link');
    linkTheme.rel = 'stylesheet';
    linkTheme.href = `${REVEAL_CDN}/dist/theme/black.css`;
    document.head.appendChild(linkTheme);

    // Load Reveal.js script
    const script = document.createElement('script');
    script.src = `${REVEAL_CDN}/dist/reveal.js`;
    script.onload = () => setReady(true);
    document.head.appendChild(script);

    return () => {
      linkReveal.remove();
      linkTheme.remove();
      script.remove();
    };
  }, []);

  useEffect(() => {
    if (!ready || !deckRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Reveal = (window as any).Reveal;
    if (!Reveal) return;

    const deck = new Reveal(deckRef.current, {
      hash: true,
      controls: true,
      progress: true,
      center: true,
      transition: 'slide',
    });

    deck.initialize();

    return () => {
      try {
        deck.destroy();
      } catch {
        // Reveal may already be destroyed
      }
    };
  }, [ready]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .reveal-presentation {
              width: 100vw;
              height: 100vh;
            }
            .reveal .slides section {
              text-align: left;
              padding: 24px 28px;
            }
            @media (min-width: 640px) {
              .reveal .slides section {
                padding: 40px 60px;
              }
            }
            .reveal .slides section h1,
            .reveal .slides section h2 {
              text-transform: none;
              font-family: var(--font-sans), system-ui, sans-serif;
              font-weight: 700;
              color: #fff;
            }
            .reveal .slides section h1 {
              font-size: 1.6em;
              line-height: 1.15;
            }
            @media (min-width: 640px) {
              .reveal .slides section h1 {
                font-size: 2.4em;
              }
            }
            .reveal .slides section h2 {
              font-size: 1.2em;
              margin-bottom: 0.5em;
            }
            @media (min-width: 640px) {
              .reveal .slides section h2 {
                font-size: 1.8em;
                margin-bottom: 0.6em;
              }
            }
            .reveal .slides section p,
            .reveal .slides section li {
              font-size: 0.6em;
              line-height: 1.6;
              color: #d4d4d8;
            }
            @media (min-width: 640px) {
              .reveal .slides section p,
              .reveal .slides section li {
                font-size: 0.7em;
              }
            }
            .badge {
              display: inline-block;
              border: 1px solid rgba(255, 68, 0, 0.3);
              background: rgba(255, 68, 0, 0.1);
              color: var(--color-accent);
              padding: 4px 16px;
              border-radius: 9999px;
              font-family: var(--font-mono), ui-monospace, monospace;
              font-size: 0.55em;
              font-weight: 500;
              letter-spacing: 0.02em;
              margin-bottom: 16px;
            }
            .stat-grid {
              display: flex;
              flex-wrap: wrap;
              gap: 12px;
              margin-top: 24px;
            }
            @media (min-width: 640px) {
              .stat-grid {
                flex-wrap: nowrap;
                gap: 16px;
                margin-top: 32px;
              }
            }
            .stat-box {
              border: 1px solid rgba(255, 255, 255, 0.12);
              border-radius: 8px;
              padding: 12px 16px;
              text-align: center;
              flex: 1;
              min-width: 80px;
            }
            @media (min-width: 640px) {
              .stat-box {
                padding: 16px 24px;
              }
            }
            .stat-box .number {
              font-size: 1.4em;
              font-weight: 700;
              color: var(--color-accent);
              display: block;
            }
            .stat-box .label {
              font-size: 0.55em;
              color: #a1a1aa;
              font-family: var(--font-mono), ui-monospace, monospace;
            }
            .check {
              color: var(--color-accent);
              margin-right: 8px;
              font-weight: 700;
            }
            .topic-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 8px 32px;
              margin: 16px 0;
            }
            @media (min-width: 640px) {
              .topic-grid {
                grid-template-columns: 1fr 1fr;
                gap: 12px 32px;
              }
            }
            .topic-item {
              font-size: 0.65em !important;
              color: #d4d4d8;
              padding: 4px 0;
            }
            .deliverable {
              margin-top: 28px;
              padding: 16px 20px;
              border-left: 3px solid var(--color-accent);
              background: rgba(255, 68, 0, 0.05);
              border-radius: 0 8px 8px 0;
            }
            .deliverable .label {
              font-size: 0.5em;
              color: var(--color-accent);
              font-family: var(--font-mono), ui-monospace, monospace;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            .deliverable .value {
              font-size: 0.65em;
              color: #fff;
              margin-top: 4px;
            }
            .part-item {
              display: flex;
              align-items: baseline;
              gap: 12px;
              margin: 8px 0;
            }
            .part-item .duration {
              font-family: var(--font-mono), ui-monospace, monospace;
              font-size: 0.5em;
              color: var(--color-accent);
              white-space: nowrap;
              min-width: 40px;
            }
            .part-item .desc {
              font-size: 0.65em;
              color: #d4d4d8;
            }
            .subtitle {
              font-size: 0.75em !important;
              color: #a1a1aa !important;
              margin-top: -8px;
              margin-bottom: 24px;
            }
            .persona-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 8px 16px;
              margin: 16px 0;
            }
            @media (min-width: 640px) {
              .persona-grid {
                grid-template-columns: 1fr 1fr 1fr;
                gap: 8px 24px;
              }
            }
            .persona-item {
              font-size: 0.6em;
              color: #d4d4d8;
              padding: 6px 0;
            }
            .persona-item strong {
              color: var(--color-accent);
            }
            .alert-box {
              background: rgba(255, 68, 0, 0.08);
              border: 1px solid rgba(255, 68, 0, 0.25);
              border-radius: 8px;
              padding: 12px 20px;
              margin-bottom: 20px;
              font-size: 0.65em;
              color: var(--color-accent);
              font-weight: 600;
            }
            .req-list {
              font-size: 0.55em !important;
              color: #a1a1aa !important;
              margin-top: 16px;
            }
            .agent-list {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
              margin: 12px 0;
            }
            .agent-tag {
              font-family: var(--font-mono), ui-monospace, monospace;
              font-size: 0.5em;
              background: rgba(255, 68, 0, 0.1);
              border: 1px solid rgba(255, 68, 0, 0.2);
              color: var(--color-accent);
              padding: 4px 12px;
              border-radius: 6px;
            }
            .two-col {
              display: grid;
              grid-template-columns: 1fr;
              gap: 16px;
              margin: 16px 0;
            }
            @media (min-width: 640px) {
              .two-col {
                grid-template-columns: 1fr 1fr;
                gap: 24px;
              }
            }
            .col-title {
              font-size: 0.6em;
              color: var(--color-accent);
              font-weight: 600;
              font-family: var(--font-mono), ui-monospace, monospace;
              margin-bottom: 8px;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
          `,
        }}
      />

      <div className="reveal reveal-presentation" ref={deckRef}>
        <div className="slides">
          {/* Slide 1: Cover */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <div style={{ textAlign: 'center' }}>
              <span className="badge">TURMAS LIMITADAS</span>
              <h1 style={{ textAlign: 'center' }}>
                Mentoria Claude Code
                <br />
                <span style={{ color: 'var(--color-accent)' }}>+ Claude Agent Teams</span>
              </h1>
              <p style={{ fontSize: '0.85em', color: '#a1a1aa', textAlign: 'center', marginTop: '8px' }}>
                Tenha uma equipe de agentes de IA trabalhando para você
              </p>
              <div className="stat-grid" style={{ justifyContent: 'center', maxWidth: '600px', margin: '32px auto 0' }}>
                <div className="stat-box">
                  <span className="number">7</span>
                  <span className="label">Encontros</span>
                </div>
                <div className="stat-box">
                  <span className="number">~12h</span>
                  <span className="label">Totais</span>
                </div>
                <div className="stat-box">
                  <span className="number">12</span>
                  <span className="label">Max Alunos</span>
                </div>
              </div>
            </div>
          </section>

          {/* Slide 2: Visao Geral */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <h2>Visao Geral</h2>
            <p style={{ marginBottom: '24px' }}>
              Programa intensivo e pratico que transforma sua forma de trabalhar com IA. Ao final,
              voce tera uma squad completa de agentes de IA configurada para o seu negocio.
            </p>
            <div>
              <p><span className="check">&#10003;</span> Claude Code dominado do basico ao avancado</p>
              <p><span className="check">&#10003;</span> Skills e MCPs instalados e funcionando</p>
              <p><span className="check">&#10003;</span> Claude Agent Teams configurado com seus agentes</p>
              <p><span className="check">&#10003;</span> Squad personalizada para sua area de atuacao</p>
            </div>
          </section>

          {/* Slide 3: Encontro Presencial */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">Presencial &middot; 4h</span>
            <h2>Encontro Presencial</h2>
            <p className="subtitle">Fundamentos, Mindset &amp; Setup</p>
            <div>
              <div className="part-item">
                <span className="duration">1h</span>
                <span className="desc"><strong>Fundamentos Conceituais</strong> &mdash; O que e IA generativa, LLMs, Claude e o ecossistema</span>
              </div>
              <div className="part-item">
                <span className="duration">1h</span>
                <span className="desc"><strong>Desbloqueio Mental</strong> &mdash; Claudia Guirunas &mdash; Superando barreiras com IA</span>
              </div>
              <div className="part-item">
                <span className="duration">2h</span>
                <span className="desc"><strong>Workshop Pratico</strong> &mdash; Instalacao e configuracao completa do ambiente</span>
              </div>
            </div>
            <div className="deliverable">
              <div className="label">Entregavel</div>
              <div className="value">Computador 100% configurado + Mindset desbloqueado</div>
            </div>
          </section>

          {/* Slide 4: Online 2 - Tira-duvidas CTA */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">Online &middot; 12/08/2026 &middot; 1h30</span>
            <h2>Online 2: Tira-duvidas Centro de Treinamento de Agentes</h2>
            <p style={{ fontSize: '0.65em', color: '#a1a1aa', marginBottom: '20px' }}>
              Voce traz o que travou na semana e resolvemos juntos. A duvida de um beneficia toda a turma.
            </p>
            <div>
              <p><span className="check">&#10003;</span> Duvidas sobre Claude Code e primeiros agentes</p>
              <p><span className="check">&#10003;</span> Troubleshooting ao vivo em grupo</p>
              <p><span className="check">&#10003;</span> Proximos passos individuais</p>
            </div>
            <div className="deliverable">
              <div className="label">Entregavel</div>
              <div className="value">Desbloqueio das duvidas da semana 1</div>
            </div>
          </section>

          {/* Slide 5: Online 3 - Claude Design */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">Online &middot; 19/08/2026 &middot; 1h30</span>
            <h2>Online 3: Claude Design</h2>
            <div className="topic-grid">
              <div className="topic-item"><span className="check">&#10003;</span> Design System com agentes</div>
              <div className="topic-item"><span className="check">&#10003;</span> Paleta e tipografia</div>
              <div className="topic-item"><span className="check">&#10003;</span> Componentes e tokens</div>
              <div className="topic-item"><span className="check">&#10003;</span> Consistencia visual</div>
            </div>
            <div className="deliverable">
              <div className="label">Entregavel</div>
              <div className="value">Design system configurado com agente Claude Design</div>
            </div>
          </section>

          {/* Slide 6: Online 4 - Squad de Sites */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">Online &middot; 26/08/2026 &middot; 1h30</span>
            <h2>Online 4: Squad de Sites</h2>
            <div className="agent-list" style={{ marginBottom: '16px' }}>
              <span className="agent-tag">Frontend Agent</span>
              <span className="agent-tag">QA Agent</span>
              <span className="agent-tag">DevOps Agent</span>
            </div>
            <div>
              <p><span className="check">&#10003;</span> <strong>Github</strong> &mdash; Commits e versionamento automaticos</p>
              <p><span className="check">&#10003;</span> <strong>Vercel</strong> &mdash; Deploy continuo sem linha de codigo manual</p>
            </div>
            <div className="deliverable">
              <div className="label">Entregavel</div>
              <div className="value">Site publicado do zero com squad de agentes</div>
            </div>
          </section>

          {/* Slide 7: Online 5 - Squad de Social Media */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">Online &middot; 02/09/2026 &middot; 1h30</span>
            <h2>Online 5: Squad de Social Media</h2>
            <div className="agent-list" style={{ marginBottom: '16px' }}>
              <span className="agent-tag">Freepik</span>
              <span className="agent-tag">Eleven Labs</span>
              <span className="agent-tag">Heygen</span>
              <span className="agent-tag">Meta API</span>
            </div>
            <div>
              <p><span className="check">&#10003;</span> Imagens, narracao em voz e videos com avatar</p>
              <p><span className="check">&#10003;</span> Publicacao automatica via Meta API</p>
            </div>
            <div className="deliverable">
              <div className="label">Entregavel</div>
              <div className="value">Squad de conteudo configurado e publicando</div>
            </div>
          </section>

          {/* Slide 8: Online 6 - Squad de Dev */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">Online &middot; 09/09/2026 &middot; 1h30</span>
            <h2>Online 6: Squad de Dev</h2>
            <div className="agent-list" style={{ marginBottom: '16px' }}>
              <span className="agent-tag">Supabase</span>
              <span className="agent-tag">Banco de Dados</span>
              <span className="agent-tag">APIs</span>
            </div>
            <div>
              <p><span className="check">&#10003;</span> Agentes criando tabelas, queries e autenticacao</p>
              <p><span className="check">&#10003;</span> Logica de negocio sem contratar um dev</p>
            </div>
            <div className="deliverable">
              <div className="label">Entregavel</div>
              <div className="value">Projeto com banco de dados real funcionando</div>
            </div>
          </section>

          {/* Slide 9: Encontro Final */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">Presencial &middot; 16/09/2026 &middot; Florianopolis</span>
            <h2>Encontro 7: Encerramento Presencial</h2>
            <div style={{ margin: '20px 0' }}>
              <p><span className="check">&#10003;</span> <strong>Apresentacoes</strong> &mdash; Cada aluno apresenta sua squad e projeto</p>
              <p><span className="check">&#10003;</span> <strong>Feedback</strong> &mdash; Revisao e orientacoes finais</p>
              <p><span className="check">&#10003;</span> <strong>Certificacao</strong> &mdash; Certificado de conclusao</p>
            </div>
            <div className="deliverable">
              <div className="label">Entregavel</div>
              <div className="value">Certificado + Comunidade vitalicia</div>
            </div>
          </section>

          {/* Slide 10: Para Quem E? */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <h2>Para Quem E?</h2>
            <div className="alert-box">
              &#9888; NAO e exclusivo para desenvolvedores!
            </div>
            <div className="persona-grid">
              <div className="persona-item"><strong>Empresarios</strong> que querem escalar com IA</div>
              <div className="persona-item"><strong>Empreendedores</strong> que buscam produtividade</div>
              <div className="persona-item"><strong>Marketing &amp; Design</strong> profissionais criativos</div>
              <div className="persona-item"><strong>Consultores</strong> que querem oferecer IA</div>
              <div className="persona-item"><strong>Devs</strong> que querem agentes inteligentes</div>
              <div className="persona-item"><strong>PMs &amp; Tech Leads</strong> que lideram equipes</div>
            </div>
            <div className="req-list">
              <p><span className="check">&#10003;</span> Mac, Windows ou Linux com 8GB+ RAM</p>
              <p><span className="check">&#10003;</span> Claude Pro (US$20/mes)</p>
              <p><span className="check">&#10003;</span> Ingles tecnico basico</p>
              <p style={{ marginTop: '8px', color: '#71717a' }}>
                Nao e necessario conhecimento previo de terminal
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
