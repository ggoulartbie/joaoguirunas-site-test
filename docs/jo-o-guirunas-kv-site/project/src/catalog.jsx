/* global React */
/**
 * Catalogs — Components and Interaction States.
 *
 * Renderizados em artboards menores no DesignCanvas. Cada catálogo
 * carrega: when to use / when NOT to use / variations / dimensions
 * inline em pequenas anotações em mono.
 */

/* ============================================================
   ComponentsCatalog — buttons, fields, cards, badges, etc.
   ============================================================ */
function ComponentsCatalog() {
  return (
    <div style={{ width: '100%', background: 'var(--void)', padding: 48, color: 'var(--fg)', fontFamily: 'var(--font-sans)' }}>
      <div style={{ background: 'var(--texture-dot)', position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }}/>
      <div style={{ position: 'relative' }}>
        <p className="eyebrow" style={{ marginBottom: 12 }}>Catálogo · Componentes</p>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 48, lineHeight: 0.95, letterSpacing: '-0.03em', color: 'var(--fg)' }}>
          Bloco a bloco, <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>nada inventado</em>.
        </h2>
        <div className="accent-line" style={{ marginTop: 16 }}/>

        {/* BUTTONS */}
        <CatBlock title="Botões" subtitle="3 variações · sempre mono uppercase · radius 0">
          <Row>
            <Spec label="Primary"><a href="#" className="btn btn-primary">Mentoria <Icon name="arrow-right" size={12}/></a></Spec>
            <Spec label="Ghost"><a href="#" className="btn btn-ghost">Open Source</a></Spec>
            <Spec label="Ember outline"><a href="#" className="btn btn-ember-outline">Ler mais</a></Spec>
            <Spec label="Disabled"><a href="#" className="btn btn-primary btn-disabled">Em breve</a></Spec>
          </Row>
          <Note>USAR · CTAs claros, 1 primário por seção. NÃO USAR · acompanhado de outro primário (hierarquia se perde). Min size · 36px height (btn-sm). Max · 56px (btn-lg).</Note>
        </CatBlock>

        {/* FIELDS */}
        <CatBlock title="Campos de formulário" subtitle="States: idle, focus, error, filled">
          <Row>
            <Spec label="Idle"><input className="field" placeholder="seu@email.com" defaultValue=""/></Spec>
            <Spec label="Focus"><input className="field" style={{ borderColor: 'var(--ember)', background: 'rgba(255,58,14,0.03)' }} defaultValue="joao@growthsales.ai"/></Spec>
            <Spec label="Error"><input className="field field-error" defaultValue="invalido@"/></Spec>
            <Spec label="Filled"><input className="field" defaultValue="João Guirunas"/></Spec>
          </Row>
          <Note>USAR · sempre com label em mono uppercase acima. NÃO USAR · placeholder no lugar de label (a11y). Altura padrão 48px · 40px em forms compactos.</Note>
        </CatBlock>

        {/* EYEBROWS */}
        <CatBlock title="Eyebrows · Mono labels" subtitle="Tracking 0.16em wide · 0.10em default">
          <Row>
            <Spec label="Ember"><p className="eyebrow" style={{ margin: 0 }}>Mentoria · Floripa · 12 vagas</p></Spec>
            <Spec label="Muted"><p className="eyebrow-muted" style={{ margin: 0 }}>Quem confia · Onde tá rodando</p></Spec>
            <Spec label="Mono mini"><p className="mono-mini" style={{ margin: 0 }}>12 ABR 2026 · 8 MIN</p></Spec>
          </Row>
        </CatBlock>

        {/* BADGES / STATUS */}
        <CatBlock title="Badges & status" subtitle="Mono + ember para todos os semânticos">
          <Row>
            <Spec label="Status"><span className="status">● 12 vagas · Floripa</span></Spec>
            <Spec label="Neutral"><span className="status status-neutral">v0.4 · MIT</span></Spec>
            <Spec label="Cat chip on"><span style={{ padding: '6px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ember)', background: 'rgba(255,58,14,0.10)', border: '1px solid rgba(255,58,14,0.40)', fontWeight: 500 }}>SQUADS</span></Spec>
            <Spec label="Cat chip off"><span style={{ padding: '6px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-muted)', background: 'transparent', border: '1px solid var(--border)', fontWeight: 500 }}>APPS</span></Spec>
          </Row>
          <Note>Estados semânticos (success/error/warning) usam SEMPRE ember + ícone Lucide. Não introduzimos verde/vermelho/amarelo separados.</Note>
        </CatBlock>

        {/* CARDS */}
        <CatBlock title="Cards · 4 variações" subtitle="Sempre radius 0 · hover lifta UM nível">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {/* OS card sample */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: 20, minHeight: 200 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, background: 'var(--bg-card-raised)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-muted)' }}>
                  <Icon name="cube" size={14} stroke={1.5}/>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>SQUADS</span>
              </div>
              <h4 style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: 'var(--fg)' }}>AIOX Framework</h4>
              <p style={{ margin: '8px 0 0', fontSize: 12.5, lineHeight: 1.55, color: 'var(--fg-muted)' }}>Sistema de orquestração de agentes com squads e personas.</p>
              <Note inline>Card OS · 1px gutter grid</Note>
            </div>

            {/* Blog card */}
            <div>
              <div style={{ aspectRatio: '4/3', background: 'var(--bg-card)', border: '1px solid var(--border)', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 40%, rgba(255,58,14,0.15) 0%, transparent 50%)' }}/>
                <span style={{ position: 'absolute', top: 12, left: 12, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ember)', background: 'rgba(5,5,7,0.6)', border: '1px solid rgba(255,58,14,0.3)', padding: '4px 8px' }}>SQUADS</span>
              </div>
              <h4 style={{ margin: '12px 0 0', fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 18, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--fg)' }}>Como rodar 96 agentes</h4>
              <Note inline>Card blog · imagem 4:3</Note>
            </div>

            {/* Testimonial card */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: 20, gridColumn: 'span 2' }}>
              <Icon name="info" size={18} style={{ color: 'var(--ember)', marginBottom: 12, transform: 'rotate(180deg) scaleX(-1)' }}/>
              <blockquote style={{ margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 18, lineHeight: 1.4, color: 'var(--fg)' }}>
                "O João não vende framework. Ele entrega uma squad rodando na minha máquina na semana 4."
              </blockquote>
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--bg-card-raised)', border: '1px solid var(--border)' }}/>
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg)', fontWeight: 500 }}>Carlos Mendes</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>CEO · Synkra · T02</div>
                </div>
              </div>
              <Note inline>Card testimonial · 2-col span</Note>
            </div>
          </div>
        </CatBlock>

        {/* ICONS */}
        <CatBlock title="Iconografia · AIOX v1.0" subtitle="24×24 viewBox · 2px stroke · currentColor · zero fill">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 12, color: 'var(--fg-muted)' }}>
            {['arrow-right','arrow-up-right','chevron-right','check','close','plus','menu','search','target','wrench','zap','trophy','brain','users','briefcase','rocket','megaphone','lock','mail','phone','map-pin','github','linkedin','twitter','instagram','code','cube','play','calendar','star','clock','book','layers','grid','send','terminal','database','plug','alert-triangle','info','loader'].map(n => (
              <div key={n} title={n} style={{
                aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 4, background: 'var(--bg-card)', border: '1px solid var(--border)',
              }}>
                <Icon name={n} size={18} stroke={1.5}/>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.04em', color: 'var(--fg-faint)' }}>{n}</span>
              </div>
            ))}
          </div>
        </CatBlock>

        {/* TYPE SCALE */}
        <CatBlock title="Escala tipográfica" subtitle="Fraunces (display) · Inter Tight (body) · JetBrains Mono (UI)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, borderTop: '1px solid var(--border)' }}>
            {[
              ['display-xl', 'clamp(64, 10vw, 120)px', 'Hero H1', { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 64, letterSpacing: '-0.03em', lineHeight: 0.92 }],
              ['display-md', 'clamp(36, 5vw, 56)px',   'Section H2', { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 44, letterSpacing: '-0.03em', lineHeight: 0.95 }],
              ['h3',         '24px',                    'Card title', { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 24, letterSpacing: '-0.02em' }],
              ['lead',       'clamp(17, 1.5vw, 22)px',  'Sub-hero',   { fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 19, color: 'var(--fg-secondary)', lineHeight: 1.5 }],
              ['body',       '16px',                    'Paragraph',  { fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 16, color: 'var(--fg-secondary)', lineHeight: 1.6 }],
              ['mono-label', '11px',                    'Eyebrow',    { fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--ember)' }],
            ].map(([n, sz, use, st]) => (
              <div key={n} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 200px', gap: 24, padding: '16px 0', borderBottom: '1px solid var(--border)', alignItems: 'baseline' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ember)' }}>--fs-{n}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-faint)', marginTop: 4 }}>{sz}</div>
                </div>
                <div style={st}>{n === 'display-xl' ? 'Aprendo · aplico' : n === 'display-md' ? 'Hub do operador' : n === 'h3' ? 'AIOX Framework' : n === 'lead' ? 'Lead paragraph elegante.' : n === 'body' ? 'The quick brown fox jumps over the lazy dog.' : 'MENTORIA · FLORIPA'}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>{use}</div>
              </div>
            ))}
          </div>
        </CatBlock>

        {/* COLOR */}
        <CatBlock title="Paleta · Brutalist mono + ember" subtitle="Void background · ember accent · 3-step ink surfaces">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
            {[
              ['#050507', '--void', 'Background'],
              ['#08080C', '--void-2', 'Section'],
              ['#0e0e11', '--ink', 'Card'],
              ['#16161a', '--ink-2', 'Raised'],
              ['#1f1f24', '--ink-3', 'Hover'],
              ['#FF3A0E', '--ember', 'Accent'],
              ['#FF5A1F', '--ember-hover', 'Hover'],
              ['#B81F00', '--ember-deep', 'Deep'],
              ['#FFFFFF', '--bone', 'FG'],
              ['rgba(255,255,255,0.7)', '--bone-dim', 'FG 70'],
              ['rgba(255,255,255,0.5)', '--bone-mute', 'FG 50'],
              ['rgba(255,255,255,0.3)', '--bone-faint', 'FG 30'],
            ].map(([hex, tok, lbl]) => (
              <div key={tok} style={{ background: hex.startsWith('rgba') ? 'var(--bg-card)' : hex, height: 88, padding: 12, position: 'relative', color: hex.startsWith('#FF') ? 'var(--void)' : '#fff' }}>
                {hex.startsWith('rgba') && <div style={{ position: 'absolute', inset: 0, background: hex }}/>}
                <div style={{ position: 'relative', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.10em', opacity: 0.8 }}>{tok}</div>
                <div style={{ position: 'absolute', bottom: 8, left: 12, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{lbl}</div>
              </div>
            ))}
          </div>
        </CatBlock>
      </div>
    </div>
  );
}

function CatBlock({ title, subtitle, children }) {
  return (
    <section style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 28, color: 'var(--fg)', letterSpacing: '-0.02em' }}>{title}</h3>
        <p style={{ margin: '6px 0 0', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function Row({ children }) {
  return <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'start' }}>{children}</div>;
}

function Spec({ label, children }) {
  return (
    <div style={{ minWidth: 200 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)', marginBottom: 10 }}>{label}</div>
      {children}
    </div>
  );
}

function Note({ children, inline }) {
  return (
    <p style={{
      marginTop: inline ? 12 : 20, padding: '10px 14px',
      border: '1px dashed var(--border-strong)',
      fontFamily: 'var(--font-mono)', fontSize: 10, lineHeight: 1.6,
      letterSpacing: '0.04em', color: 'var(--fg-muted)',
    }}>{children}</p>
  );
}

/* ============================================================
   StatesCatalog — loading, empty, error, success
   ============================================================ */
function StatesCatalog() {
  return (
    <div style={{ width: '100%', background: 'var(--void)', padding: 48, color: 'var(--fg)', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ background: 'var(--texture-dot)', position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }}/>
      <div style={{ position: 'relative' }}>
        <p className="eyebrow" style={{ marginBottom: 12 }}>Catálogo · Estados</p>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 48, lineHeight: 0.95, letterSpacing: '-0.03em' }}>
          Estados de <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>interação</em>.
        </h2>
        <div className="accent-line" style={{ marginTop: 16 }}/>

        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
          {/* LOADING / SKELETON */}
          <StateCard label="Loading · Skeleton">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="skeleton" style={{ height: 14, width: '40%' }}/>
              <div className="skeleton" style={{ height: 28, width: '85%' }}/>
              <div className="skeleton" style={{ height: 12, width: '95%' }}/>
              <div className="skeleton" style={{ height: 12, width: '70%' }}/>
              <div className="skeleton" style={{ height: 40, width: 160, marginTop: 12 }}/>
            </div>
            <Note>USAR · em qualquer card aguardando fetch. Shimmer suave white/04→white/08 a cada 1.5s.</Note>
          </StateCard>

          {/* EMPTY */}
          <StateCard label="Empty state">
            <div style={{ textAlign: 'center', padding: 24 }}>
              <div style={{ width: 48, height: 48, margin: '0 auto', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-faint)' }}>
                <Icon name="search" size={20} stroke={1.5}/>
              </div>
              <h4 style={{ margin: '20px 0 8px', fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 22, color: 'var(--fg)' }}>Nenhum resultado</h4>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.5 }}>Ajuste sua busca ou limpe os filtros.</p>
              <button className="btn btn-ghost btn-sm" style={{ marginTop: 16 }}>Limpar filtros</button>
            </div>
          </StateCard>

          {/* ERROR */}
          <StateCard label="Error · Form validation">
            <div>
              <label className="field-label">E-mail</label>
              <input className="field field-error" defaultValue="invalido@"/>
              <p className="field-help field-help-error" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="alert-triangle" size={11} stroke={2}/> E-mail incompleto. Use formato voce@empresa.com
              </p>
            </div>
            <Note>USAR · sempre par texto + ícone alert-triangle. Texto ember + borda ember.</Note>
          </StateCard>

          {/* SUCCESS */}
          <StateCard label="Success · Form sent">
            <div style={{ textAlign: 'center', padding: 24, border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.05)' }}>
              <div style={{ width: 48, height: 48, margin: '0 auto', border: '1px solid var(--ember)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ember)', borderRadius: '50%' }}>
                <Icon name="check" size={22} stroke={2.5}/>
              </div>
              <h4 style={{ margin: '20px 0 8px', fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 22, color: 'var(--fg)' }}>Recebido</h4>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.5 }}>Respondemos em até 48h úteis.</p>
            </div>
          </StateCard>

          {/* LOADING — button */}
          <StateCard label="Loading · Button submitting">
            <button className="btn btn-primary" style={{ opacity: 0.85 }}>
              <span style={{ animation: 'spin 1s linear infinite', display: 'inline-flex' }}>
                <Icon name="loader" size={14} stroke={2}/>
              </span>
              Enviando...
            </button>
            <style>{`@keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }`}</style>
            <Note>USAR · troca ícone arrow→loader, label muda pra "Enviando..." ou ação.</Note>
          </StateCard>

          {/* FOCUS RING */}
          <StateCard label="Focus · Keyboard nav">
            <button className="btn btn-ghost" style={{ outline: '2px solid var(--ember)', outlineOffset: 2 }}>
              Tab Focus
            </button>
            <p style={{ marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-faint)', letterSpacing: '0.10em' }}>OUTLINE 2px EMBER · OFFSET 2px</p>
            <Note>USAR · em qualquer elemento focável. WCAG AA mínimo.</Note>
          </StateCard>

          {/* HOVER CARD */}
          <StateCard label="Hover · Card">
            <div style={{ background: 'var(--bg-card-raised)', border: '1px solid rgba(255,58,14,0.30)', padding: 16, position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ width: 28, height: 28, border: '1px solid rgba(255,58,14,0.30)', color: 'var(--ember)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="cube" size={14} stroke={1.5}/>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.10em', color: 'var(--fg-faint)' }}>SQUADS</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>AIOX Framework</div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'var(--ember)' }}/>
            </div>
            <Note>Hover · background sobe 1 step + border ember 30% + barra ember scaleX 0→1.</Note>
          </StateCard>

          {/* MOBILE NAV / SLIDE-IN */}
          <StateCard label="Mobile · Menu aberto">
            <div style={{ width: '100%', height: 280, position: 'relative', background: 'var(--bg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 48, background: 'var(--bg-section)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ember)' }}>JG</div>
                <Icon name="close" size={16}/>
              </div>
              <ul style={{ listStyle: 'none', padding: 16, margin: '48px 0 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {['Sobre', 'Open-source', 'Blog', 'Curso', 'Mentoria'].map((l, i) => (
                  <li key={l} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 22, color: i === 4 ? 'var(--ember)' : 'var(--fg)' }}>{l}</span>
                    <Icon name="arrow-up-right" size={14} stroke={1.5} style={{ color: 'var(--fg-faint)' }}/>
                  </li>
                ))}
              </ul>
            </div>
          </StateCard>
        </div>
      </div>
    </div>
  );
}

function StateCard({ label, children }) {
  return (
    <div style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>{label}</div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  );
}

Object.assign(window, { ComponentsCatalog, StatesCatalog });
