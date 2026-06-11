/* global React */
/**
 * Páginas secundárias — desktop-first, layout principal.
 *   - CursoPage (curso async)
 *   - FrameworkPage (AIOX Framework, docs landing)
 *   - MonitorPage (AIOX Monitor preview)
 *   - NotFoundPage (404)
 */

/* ============================================================
   CursoPage
   ============================================================ */
function CursoPage({ vp = 'desktop' }) {
  const isMobile = vp === 'mobile';
  const PAD = isMobile ? '0 20px' : '0 32px';
  const CONTAINER = { maxWidth: 1152, margin: '0 auto', padding: PAD };

  return (
    <div className="page-frame" style={{ width: '100%', minHeight: '100%', paddingTop: isMobile ? 56 : 64 }}>
      <Header vp={vp} active="/curso-online" />

      {/* HERO */}
      <section style={{ padding: isMobile ? '80px 0 64px' : '128px 0 96px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -200, right: -200, width: 600, height: 600, borderRadius: '50%', background: 'rgba(255,58,14,0.06)', filter: 'blur(140px)', pointerEvents: 'none' }}/>
        <div style={{ ...CONTAINER, position: 'relative' }}>
          <div style={{ maxWidth: 760 }}>
            <span className="status" style={{ marginBottom: 32, display: 'inline-flex' }}>Curso · Lista de espera</span>
            <h1 style={{
              margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: 'clamp(64px, 8vw, 104px)', lineHeight: 0.92, letterSpacing: '-0.03em',
              color: 'var(--fg)',
            }}>
              Quando Floripa<br/><em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>não é uma opção</em>.
            </h1>
            <p className="lead" style={{ marginTop: 32 }}>
              Curso async pra quem não pode estar presencial. 6 módulos, 32 aulas práticas, lifetime access ao AIOX Framework e às squads.
            </p>
            <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#" className="btn btn-primary btn-lg">Entrar na lista <Icon name="arrow-right" size={14}/></a>
              <a href="#" className="btn btn-ghost btn-lg">Ver módulos</a>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* MÓDULOS */}
      <section style={{ padding: isMobile ? '80px 0' : '128px 0' }}>
        <div style={CONTAINER}>
          <div style={{ marginBottom: 64, maxWidth: 640 }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>6 módulos · 32 aulas</p>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--fg)' }}>
              Estrutura <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>do curso</em>.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
            {[
              { n: '01', t: 'Fundamentos do Claude Code', lessons: 4, hrs: '2h 40m' },
              { n: '02', t: 'Skills, /commands e memory',    lessons: 5, hrs: '3h 10m' },
              { n: '03', t: 'Sua primeira squad',            lessons: 6, hrs: '3h 40m' },
              { n: '04', t: 'Integrações reais',             lessons: 5, hrs: '2h 50m' },
              { n: '05', t: 'Squad de growth',               lessons: 6, hrs: '4h 00m' },
              { n: '06', t: 'Maestri · regendo squads',      lessons: 6, hrs: '4h 20m' },
            ].map(m => (
              <div key={m.n} style={{ padding: 32, background: 'var(--bg)', display: 'flex', alignItems: 'start', gap: 24 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 48, color: 'var(--ember)', lineHeight: 1, opacity: 0.5, flexShrink: 0 }}>{m.n}</span>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 24, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--fg)' }}>{m.t}</h4>
                  <div style={{ marginTop: 12, display: 'flex', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>
                    <span>{m.lessons} aulas</span>·<span>{m.hrs}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div style={{ marginTop: 80, padding: 48, border: '1px solid var(--border-strong)', background: 'var(--bg-card)', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 16 }}>Investimento</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 56, color: 'var(--fg)', lineHeight: 1 }}>R$2.400</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)' }}>à vista</span>
              </div>
              <p style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-muted)' }}>ou 12× R$235 sem juros</p>
              <p style={{ marginTop: 20, fontSize: 14, color: 'var(--fg-secondary)', lineHeight: 1.6, maxWidth: 360 }}>
                Acesso vitalício · Updates gratuitos · Grupo de alunos · 41 recursos open source liberados.
              </p>
            </div>
            <a href="#" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Entrar na lista de espera <Icon name="arrow-right" size={14}/>
            </a>
          </div>
        </div>
      </section>

      <Footer vp={vp} />
    </div>
  );
}

/* ============================================================
   FrameworkPage
   ============================================================ */
function FrameworkPage({ vp = 'desktop' }) {
  const isMobile = vp === 'mobile';
  const PAD = isMobile ? '0 20px' : '0 32px';
  const CONTAINER = { maxWidth: 1152, margin: '0 auto', padding: PAD };

  return (
    <div className="page-frame" style={{ width: '100%', minHeight: '100%', paddingTop: isMobile ? 56 : 64 }}>
      <Header vp={vp} />

      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'url(assets/bg-framework.png) center/cover', opacity: 0.45 }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,5,7,0.75) 0%, rgba(5,5,7,0.55) 50%, var(--void) 100%)' }}/>

        <div style={{ ...CONTAINER, position: 'relative', paddingTop: isMobile ? 80 : 144, paddingBottom: isMobile ? 64 : 96 }}>
          <p className="eyebrow" style={{ marginBottom: 32 }}>Framework · v0.4 · MIT</p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: 48, alignItems: 'end' }}>
            <h1 style={{
              margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: 'clamp(64px, 9vw, 120px)', lineHeight: 0.9, letterSpacing: '-0.03em',
              color: 'var(--fg)',
            }}>
              AIOX <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>Framework</em>.
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--fg-muted)' }}>
              Engine de orquestração de agentes com squads, personas e contratos. Open source. Em produção desde Q4/2024.
            </p>
          </div>

          <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
            {[
              ['v0.4', 'release atual'],
              ['96', 'agentes rodando'],
              ['12', 'squads em produção'],
              ['MIT', 'licença'],
            ].map(([v,l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--ember)', fontSize: 32, lineHeight: 1 }}>{v}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-faint)', marginTop: 8 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '96px 0' }}>
        <div style={CONTAINER}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
            {/* Diagram column */}
            <div style={{ padding: 40, background: 'var(--bg)' }}>
              <p className="eyebrow" style={{ marginBottom: 20 }}>Arquitetura · Layered</p>
              <h3 style={{ margin: '0 0 32px', fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 32, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--fg)' }}>
                4 camadas, <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>nada mais</em>.
              </h3>
              {/* Pseudo-diagram */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
                {[
                  ['MAESTRO', 'Orquestrador · roteia tasks entre squads'],
                  ['SQUAD',   'Unidade · 4-12 agentes coordenados'],
                  ['AGENT',   'Persona · contexto + skill + tools'],
                  ['TOOL',    'I/O · file, http, db, shell'],
                ].map(([lbl,desc]) => (
                  <div key={lbl} style={{ padding: '16px 20px', background: 'var(--bg-card)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em', color: 'var(--ember)', fontWeight: 600 }}>{lbl}</span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-muted)', textAlign: 'right' }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code column */}
            <div style={{ padding: 40, background: 'var(--bg)' }}>
              <p className="eyebrow" style={{ marginBottom: 20 }}>Quickstart · 5 linhas</p>
              <h3 style={{ margin: '0 0 32px', fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 32, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--fg)' }}>
                Sua primeira squad <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>em segundos</em>.
              </h3>
              <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.7, color: 'var(--fg)', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: 24, overflow: 'auto' }}>
{`# install
$ npm i -g @aiox/framework

# init squad
$ aiox init --squad=growth

# run
$ aiox run --task="audit mídia"`}
              </pre>
              <div style={{ marginTop: 24, display: 'flex', gap: 8 }}>
                <a href="#" className="btn btn-primary btn-sm"><Icon name="github" size={12}/> Star no GitHub</a>
                <a href="#" className="btn btn-ghost btn-sm">Ver docs <Icon name="arrow-right" size={12}/></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer vp={vp} />
    </div>
  );
}

/* ============================================================
   MonitorPage
   ============================================================ */
function MonitorPage({ vp = 'desktop' }) {
  const isMobile = vp === 'mobile';
  const PAD = isMobile ? '0 20px' : '0 32px';
  const CONTAINER = { maxWidth: 1152, margin: '0 auto', padding: PAD };

  return (
    <div className="page-frame" style={{ width: '100%', minHeight: '100%', paddingTop: isMobile ? 56 : 64 }}>
      <Header vp={vp} />

      <section style={{ padding: isMobile ? '80px 0 64px' : '144px 0 96px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,58,14,0.07) 0%, transparent 60%)', pointerEvents: 'none' }}/>
        <div style={{ ...CONTAINER, position: 'relative' }}>
          <p className="eyebrow" style={{ marginBottom: 24 }}>Monitor · Beta privado</p>
          <h1 style={{
            margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: 'clamp(64px, 9vw, 120px)', lineHeight: 0.92, letterSpacing: '-0.03em',
            color: 'var(--fg)', maxWidth: 880, marginLeft: 'auto', marginRight: 'auto',
          }}>
            AIOX <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>Monitor</em>.
          </h1>
          <p className="lead" style={{ marginTop: 32, marginLeft: 'auto', marginRight: 'auto' }}>
            Dashboard isométrico real-time pras suas squads. Saiba o que cada agente está fazendo, agora.
          </p>
          <div style={{ marginTop: 40, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" className="btn btn-primary btn-lg">Entrar no beta <Icon name="arrow-right" size={14}/></a>
          </div>

          {/* Dashboard mock preview */}
          <div style={{ marginTop: 80, textAlign: 'left', border: '1px solid var(--border-strong)', background: 'var(--bg-card)', maxWidth: 1100, margin: '80px auto 0' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>
                <span className="dot"/>
                12 SQUADS · 96 AGENTES · ATIVO
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', color: 'var(--fg-faint)' }}>16:42:08 BRT</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 1, background: 'var(--border)' }}>
              {[
                { l: 'TASKS / MIN', v: '142', sub: '↑ 18% hr' },
                { l: 'AGENTES IDLE', v: '04 / 96', sub: '4.1%' },
                { l: 'CUSTO HOJE',  v: '$23.40', sub: 'vs $26 ontem' },
                { l: 'P95 LATENCY', v: '1.4s',  sub: 'estável' },
              ].map(s => (
                <div key={s.l} style={{ padding: 24, background: 'var(--bg)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>{s.l}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 36, color: 'var(--fg)', marginTop: 8 }}>{s.v}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', color: 'var(--ember)', marginTop: 4 }}>{s.sub}</div>
                </div>
              ))}
            </div>
            {/* Pseudo squad rows */}
            <div style={{ padding: 24 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-faint)', marginBottom: 16 }}>SQUADS · TEMPO REAL</div>
              {[
                { s: 'GROWTH',     a: 12, t: 'gerando 4 criativos · Meta Ads', st: 'running' },
                { s: 'OPS',        a:  6, t: 'revisando 23 tickets · Zendesk', st: 'running' },
                { s: 'CONTENT',    a:  8, t: 'publicando carrossel LinkedIn',   st: 'running' },
                { s: 'SUPPORT',    a:  4, t: 'idle · aguardando',               st: 'idle' },
              ].map(row => (
                <div key={row.s} style={{ display: 'grid', gridTemplateColumns: '120px 60px 1fr 80px', gap: 16, padding: '12px 0', borderTop: '1px solid var(--border)', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg)', fontWeight: 600 }}>{row.s}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)' }}>{row.a} ag</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-secondary)' }}>{row.t}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: row.st === 'running' ? 'var(--ember)' : 'var(--fg-faint)', textAlign: 'right' }}>● {row.st}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer vp={vp} />
    </div>
  );
}

/* ============================================================
   NotFoundPage (404)
   ============================================================ */
function NotFoundPage({ vp = 'desktop' }) {
  const isMobile = vp === 'mobile';
  return (
    <div className="page-frame" style={{ width: '100%', minHeight: '100%', paddingTop: isMobile ? 56 : 64 }}>
      <Header vp={vp} />
      <section style={{ minHeight: 640, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(120px, 22vw, 240px)', lineHeight: 0.85, color: 'var(--ember)', margin: 0 }}>404</p>
          <h1 style={{ margin: '24px 0 0', fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 0.98, letterSpacing: '-0.03em', color: 'var(--fg)' }}>
            Essa rota <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>não existe</em>.
          </h1>
          <p className="lead" style={{ marginTop: 24, marginLeft: 'auto', marginRight: 'auto' }}>
            Provavelmente um link velho ou um typo. Volta pra Home — ou aproveita pra dar uma olhada no que tem rodando.
          </p>
          <div style={{ marginTop: 40, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#/" className="btn btn-primary">← Home</a>
            <a href="#/open-source" className="btn btn-ghost">Open Source</a>
            <a href="#/mentoria" className="btn btn-ghost">Mentoria</a>
          </div>
        </div>
      </section>
      <Footer vp={vp} />
    </div>
  );
}

Object.assign(window, { CursoPage, FrameworkPage, MonitorPage, NotFoundPage });
