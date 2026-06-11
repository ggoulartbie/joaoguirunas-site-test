/* global React */
/**
 * ContatoPage — form de contato + canais diretos.
 */
function ContatoPage({ vp = 'desktop' }) {
  const isMobile = vp === 'mobile';
  const PAD = isMobile ? '0 20px' : '0 32px';
  const CONTAINER = { maxWidth: 1152, margin: '0 auto', padding: PAD };

  return (
    <div className="page-frame" style={{ width: '100%', minHeight: '100%', paddingTop: isMobile ? 56 : 64 }}>
      <Header vp={vp} active="/contato" />

      <section style={{ padding: isMobile ? '64px 0 32px' : '128px 0 48px' }}>
        <div style={CONTAINER}>
          <p className="eyebrow" style={{ marginBottom: 24 }}>Contato · Fala comigo</p>
          <h1 style={{
            margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: isMobile ? 'clamp(48px, 13vw, 64px)' : 'clamp(64px, 8vw, 104px)',
            lineHeight: 0.92, letterSpacing: '-0.03em', color: 'var(--fg)',
          }}>
            Pergunte qualquer<br/>coisa, <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>direto</em>.
          </h1>
          <p className="lead" style={{ marginTop: 32 }}>
            Respondo pessoalmente. Em até 48h úteis. Sem assistente, sem chatbot.
          </p>
        </div>
      </section>

      <section style={{ padding: isMobile ? '32px 0 80px' : '48px 0 128px' }}>
        <div style={CONTAINER}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
            gap: isMobile ? 48 : 80, alignItems: 'start',
          }}>
            {/* Form */}
            <form onSubmit={(e)=>e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <label className="field-label">Como você se chama?</label>
                <input className="field" placeholder="João da Silva"/>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24 }}>
                <div>
                  <label className="field-label">Email</label>
                  <input className="field" type="email" placeholder="voce@empresa.com"/>
                </div>
                <div>
                  <label className="field-label">Empresa</label>
                  <input className="field" placeholder="GrowthSales.ai"/>
                </div>
              </div>
              <div>
                <label className="field-label">Sobre o que você quer falar?</label>
                <select className="field" defaultValue="">
                  <option value="" disabled>Escolha um assunto</option>
                  <option>Mentoria · Turma 03</option>
                  <option>Curso online · Lista de espera</option>
                  <option>Open Source · Contribuição</option>
                  <option>Parceria · Empresa</option>
                  <option>Outro</option>
                </select>
              </div>
              <div>
                <label className="field-label">Sua mensagem</label>
                <textarea className="field field-textarea" placeholder="Conta o contexto, sem rodeio. Quanto mais direto, melhor a resposta." defaultValue=""/>
                <p className="field-help">280 caracteres mínimo · sem teaser, vá direto ao ponto</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, gap: 16, flexDirection: isMobile ? 'column-reverse' : 'row' }}>
                <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>
                  Respondemos em até 48h
                </p>
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: isMobile ? '100%' : 'auto' }}>
                  Enviar mensagem <Icon name="send" size={14}/>
                </button>
              </div>
            </form>

            {/* Direct channels */}
            <aside style={{
              padding: isMobile ? 28 : 36,
              border: '1px solid var(--border-strong)',
              background: 'var(--bg-card)',
            }}>
              <p className="eyebrow" style={{ marginBottom: 20 }}>Canais diretos</p>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--fg)' }}>
                Prefere outro <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>canal</em>?
              </h3>

              <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  { icon: 'linkedin',  label: 'LinkedIn',  v: '/in/joaoguirunas',     fast: 'Mais rápido' },
                  { icon: 'github',    label: 'GitHub',    v: '@joaoguirunas',         fast: null },
                  { icon: 'mail',      label: 'E-mail',    v: 'joao@growthsales.ai',   fast: null },
                  { icon: 'instagram', label: 'Instagram', v: '@joaoguirunas',         fast: null },
                ].map(ch => (
                  <a key={ch.label} href="#" style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 0', borderTop: '1px solid var(--border)',
                    textDecoration: 'none', color: 'inherit',
                    transition: 'color 150ms',
                  }}>
                    <span style={{ color: 'var(--fg-muted)', flexShrink: 0 }}><Icon name={ch.icon} size={18} stroke={1.5}/></span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>{ch.label}</div>
                      <div style={{ fontSize: 14, color: 'var(--fg)', marginTop: 2 }}>{ch.v}</div>
                    </div>
                    {ch.fast && <span className="status" style={{ fontSize: 9, padding: '3px 8px' }}>{ch.fast}</span>}
                    <Icon name="arrow-up-right" size={14} stroke={1.5} style={{ color: 'var(--fg-faint)' }}/>
                  </a>
                ))}
              </div>

              <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-faint)', marginBottom: 8 }}>Localização</div>
                <div style={{ display: 'flex', alignItems: 'start', gap: 10, color: 'var(--fg-secondary)' }}>
                  <span style={{ color: 'var(--ember)', flexShrink: 0, marginTop: 4 }}><Icon name="map-pin" size={16} stroke={1.5}/></span>
                  <div>
                    <div style={{ fontSize: 14, color: 'var(--fg)' }}>Florianópolis · SC · Brasil</div>
                    <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 4 }}>Atendo presencialmente apenas para alunos da mentoria.</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer vp={vp} />
    </div>
  );
}

window.ContatoPage = ContatoPage;
