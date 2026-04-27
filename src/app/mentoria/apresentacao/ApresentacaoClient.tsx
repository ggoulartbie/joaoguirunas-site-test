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
              padding: 40px 60px;
            }
            .reveal .slides section h1,
            .reveal .slides section h2 {
              text-transform: none;
              font-family: var(--font-sans), system-ui, sans-serif;
              font-weight: 700;
              color: #fff;
            }
            .reveal .slides section h1 {
              font-size: 2.4em;
              line-height: 1.15;
            }
            .reveal .slides section h2 {
              font-size: 1.8em;
              margin-bottom: 0.6em;
            }
            .reveal .slides section p,
            .reveal .slides section li {
              font-size: 0.7em;
              line-height: 1.6;
              color: #d4d4d8;
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
              gap: 16px;
              margin-top: 32px;
            }
            .stat-box {
              border: 1px solid rgba(255, 255, 255, 0.12);
              border-radius: 8px;
              padding: 16px 24px;
              text-align: center;
              flex: 1;
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
              grid-template-columns: 1fr 1fr;
              gap: 12px 32px;
              margin: 16px 0;
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
              grid-template-columns: 1fr 1fr 1fr;
              gap: 8px 24px;
              margin: 16px 0;
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
              grid-template-columns: 1fr 1fr;
              gap: 24px;
              margin: 16px 0;
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
                <span style={{ color: 'var(--color-accent)' }}>+ AIOX</span>
              </h1>
              <p style={{ fontSize: '0.85em', color: '#a1a1aa', textAlign: 'center', marginTop: '8px' }}>
                Tenha uma equipe de agentes de IA trabalhando para você
              </p>
              <div className="stat-grid" style={{ justifyContent: 'center', maxWidth: '600px', margin: '32px auto 0' }}>
                <div className="stat-box">
                  <span className="number">8</span>
                  <span className="label">Encontros</span>
                </div>
                <div className="stat-box">
                  <span className="number">~19h</span>
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
              <p><span className="check">&#10003;</span> Framework AIOX configurado com seus agentes</p>
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

          {/* Slide 4: Online 1 - Claude Code */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">Online &middot; 2h</span>
            <h2>Online 1: Dominando o Claude Code</h2>
            <div className="topic-grid">
              <div className="topic-item"><span className="check">&#10003;</span> Navegacao e interface</div>
              <div className="topic-item"><span className="check">&#10003;</span> Edicao de arquivos</div>
              <div className="topic-item"><span className="check">&#10003;</span> Comandos bash</div>
              <div className="topic-item"><span className="check">&#10003;</span> Integracao com git</div>
              <div className="topic-item"><span className="check">&#10003;</span> Gerenciamento de contexto</div>
              <div className="topic-item"><span className="check">&#10003;</span> Modelo de seguranca</div>
              <div className="topic-item"><span className="check">&#10003;</span> Estrutura de prompts</div>
            </div>
            <div className="deliverable">
              <div className="label">Entregavel</div>
              <div className="value">Dominio completo do Claude Code</div>
            </div>
          </section>

          {/* Slide 5: Online 2 - Skills */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">Online &middot; 2h</span>
            <h2>Online 2: Skills</h2>
            <div className="agent-list" style={{ marginBottom: '20px' }}>
              <span className="agent-tag">/pdf</span>
              <span className="agent-tag">/pptx</span>
              <span className="agent-tag">/docx</span>
              <span className="agent-tag">/graphic-designer</span>
              <span className="agent-tag">/copywriting</span>
              <span className="agent-tag">/social-media-content</span>
            </div>
            <p style={{ fontSize: '0.65em', color: '#a1a1aa' }}>
              1h de conteudo + 1h de bate-papo e auxilio
            </p>
            <div className="deliverable">
              <div className="label">Entregavel</div>
              <div className="value">Skills instaladas e funcionando</div>
            </div>
          </section>

          {/* Slide 6: Online 3 - MCP Servers */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">Online &middot; 2h</span>
            <h2>Online 3: MCP Servers</h2>
            <div style={{ margin: '20px 0' }}>
              <p><span className="check">&#10003;</span> <strong>Playwright</strong> &mdash; Automacao de browser</p>
              <p><span className="check">&#10003;</span> <strong>Context7</strong> &mdash; Documentacao de bibliotecas</p>
              <p><span className="check">&#10003;</span> <strong>Apify</strong> &mdash; Web scraping</p>
            </div>
            <div className="deliverable">
              <div className="label">Entregavel</div>
              <div className="value">MCPs instalados e integrados</div>
            </div>
          </section>

          {/* Slide 7: Online 4 - Framework AIOX */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">Online &middot; 2h</span>
            <h2>Online 4: Framework AIOX</h2>
            <div className="topic-grid" style={{ marginBottom: '16px' }}>
              <div className="topic-item"><span className="check">&#10003;</span> Estrutura do framework</div>
              <div className="topic-item"><span className="check">&#10003;</span> Constitution</div>
              <div className="topic-item"><span className="check">&#10003;</span> Sistema de camadas</div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div className="col-title">Agentes</div>
              <div className="agent-list">
                <span className="agent-tag">@dev</span>
                <span className="agent-tag">@qa</span>
                <span className="agent-tag">@pm</span>
                <span className="agent-tag">@po</span>
                <span className="agent-tag">@sm</span>
                <span className="agent-tag">@architect</span>
                <span className="agent-tag">@devops</span>
              </div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div className="col-title">Workflows</div>
              <div className="agent-list">
                <span className="agent-tag">SDC</span>
                <span className="agent-tag">QA Loop</span>
                <span className="agent-tag">Spec Pipeline</span>
              </div>
            </div>
            <div className="deliverable">
              <div className="label">Entregavel</div>
              <div className="value">Compreensao completa do framework AIOX</div>
            </div>
          </section>

          {/* Slide 8: Online 5 - Squads Personalizadas */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">Online &middot; 2h</span>
            <h2>Online 5: Squads Personalizadas</h2>
            <div>
              <div className="part-item">
                <span className="duration">1</span>
                <span className="desc"><strong>Anatomia de um Agente</strong> &mdash; Persona, comandos, dependencias e memoria</span>
              </div>
              <div className="part-item">
                <span className="duration">2</span>
                <span className="desc"><strong>Criacao de Agentes</strong> &mdash; Definir agentes para seu contexto profissional</span>
              </div>
              <div className="part-item">
                <span className="duration">3</span>
                <span className="desc"><strong>Workshop Pratico</strong> &mdash; Construir e testar sua primeira squad</span>
              </div>
            </div>
            <div className="deliverable">
              <div className="label">Entregavel</div>
              <div className="value">Primeira versao da squad personalizada</div>
            </div>
          </section>

          {/* Slide 9: Online 6 - Integracoes */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">Online &middot; 2h</span>
            <h2>Online 6: Integracoes &amp; Automacoes</h2>
            <div className="two-col">
              <div>
                <div className="col-title">Integracoes</div>
                <p className="topic-item"><span className="check">&#10003;</span> APIs externas</p>
                <p className="topic-item"><span className="check">&#10003;</span> Webhooks</p>
                <p className="topic-item"><span className="check">&#10003;</span> Bancos de dados</p>
                <p className="topic-item"><span className="check">&#10003;</span> Servicos cloud</p>
              </div>
              <div>
                <div className="col-title">Automacoes</div>
                <p className="topic-item"><span className="check">&#10003;</span> Workflows multi-agente</p>
                <p className="topic-item"><span className="check">&#10003;</span> Scheduling</p>
                <p className="topic-item"><span className="check">&#10003;</span> Casos avancados</p>
              </div>
            </div>
            <div className="deliverable">
              <div className="label">Entregavel</div>
              <div className="value">Integracoes funcionando e projeto final</div>
            </div>
          </section>

          {/* Slide 10: Encontro Final */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">Presencial ou Online &middot; 2-3h</span>
            <h2>Encontro Final</h2>
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

          {/* Slide 11: Para Quem E? */}
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
