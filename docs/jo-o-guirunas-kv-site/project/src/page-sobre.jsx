/* global React */
/**
 * SobrePage — bio longa, manifesto, trajetória, prova social.
 */
function SobrePage({ vp = 'desktop' }) {
  const isMobile = vp === 'mobile';
  const PAD = isMobile ? '0 20px' : '0 32px';
  const CONTAINER = { maxWidth: 1152, margin: '0 auto', padding: PAD };

  return (
    <div className="page-frame" style={{ width: '100%', minHeight: '100%', paddingTop: isMobile ? 56 : 64 }}>
      <Header vp={vp} active="/sobre" />

      {/* ═══ HERO — split portrait + manifesto ═══ */}
      <section style={{ padding: isMobile ? '80px 0 64px' : '128px 0 96px' }}>
        <div style={CONTAINER}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr',
            gap: isMobile ? 40 : 80, alignItems: 'start',
          }}>
            <div>
              <div style={{ aspectRatio: '3/4', border: '1px solid var(--border-strong)', position: 'relative', overflow: 'hidden' }}>
                <img src="assets/portrait-founder.png" alt="João Guirunas" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.6) contrast(1.1)' }}/>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '32px 20px 16px',
                  background: 'linear-gradient(0deg, rgba(5,5,7,0.95), transparent)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'end',
                }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>JOÃO GUIRUNAS</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-faint)', marginTop: 2 }}>FLORIANÓPOLIS · 2026</div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--ember)' }}>● AO VIVO</span>
                </div>
              </div>
            </div>

            <div>
              <p className="eyebrow" style={{ marginBottom: 24 }}>Sobre · CEO GrowthSales.ai</p>
              <h1 style={{
                margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400,
                fontSize: isMobile ? 'clamp(40px, 11vw, 56px)' : 'clamp(56px, 6vw, 88px)',
                lineHeight: 0.95, letterSpacing: '-0.03em', color: 'var(--fg)',
              }}>
                Operador, não <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>guru</em>.
              </h1>
              <div className="accent-line" style={{ marginTop: 24 }}/>

              <p style={{ marginTop: 32, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: isMobile ? 22 : 28, lineHeight: 1.35, color: 'var(--fg)', maxWidth: 580, letterSpacing: '-0.01em' }}>
                "Uso IA em negócios reais — automação, growth e sistemas que escalam. O que funciona, eu compartilho e ensino."
              </p>

              <div style={{ marginTop: 32, fontSize: 16, lineHeight: 1.7, color: 'var(--fg-secondary)', maxWidth: 580, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <p style={{ margin: 0 }}>
                  Eu sou <strong style={{ color: 'var(--fg)' }}>João Guirunas</strong>. CEO da <strong style={{ color: 'var(--fg)' }}>GrowthSales.ai</strong>, uma operação 100% IA que faz <strong style={{ color: 'var(--fg)' }}>R$2M+ por ano</strong> com uma única pessoa orquestrando uma equipe de 96 agentes.
                </p>
                <p style={{ margin: 0 }}>
                  Antes disso, 12 anos rodando agência de growth. Cresci, contratei, errei. Hoje opero sozinho, com squads. É essa transição que eu ensino — não a teoria do que IA poderia ser.
                </p>
                <p style={{ margin: 0 }}>
                  Tudo que aprendo, eu compartilho aqui — open source, blog e mentoria. <span style={{ color: 'var(--fg)', fontWeight: 500 }}>Sem teaser, sem hype.</span>
                </p>
              </div>

              <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#/mentoria" className="btn btn-primary">Conheça a Mentoria <Icon name="arrow-right" size={12}/></a>
                <a href="#/contato" className="btn btn-ghost">Fale comigo</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* ═══ NÚMEROS ═══ */}
      <section style={{ padding: isMobile ? '64px 0' : '96px 0' }}>
        <div style={CONTAINER}>
          <p className="eyebrow-muted" style={{ marginBottom: 32 }}>Hoje · Em produção</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
            gap: 1, background: 'var(--border)', border: '1px solid var(--border)',
          }}>
            {[
              ['96', 'agentes ativos', 'rodando 24/7'],
              ['R$2M+', 'receita anual', 'GrowthSales.ai'],
              ['41', 'recursos open', 'MIT · 100% grátis'],
              ['23', 'alunos formados', 'turmas 01 + 02'],
            ].map(([v,l,sub]) => (
              <div key={l} style={{ padding: isMobile ? 24 : 32, background: 'var(--bg)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--ember)', fontSize: isMobile ? 32 : 44, lineHeight: 1 }}>{v}</div>
                <div style={{ marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-secondary)', fontWeight: 500 }}>{l}</div>
                <div style={{ marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* ═══ TIMELINE ═══ */}
      <section style={{ padding: isMobile ? '80px 0' : '128px 0' }}>
        <div style={CONTAINER}>
          <div style={{ marginBottom: 64, maxWidth: 640 }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>Trajetória · 12 anos operando</p>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: isMobile ? 36 : 'clamp(36px, 4.5vw, 56px)', lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--fg)' }}>
              De agência humana a <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>operação 100% agentes</em>.
            </h2>
          </div>

          <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { y: '2014', t: 'Primeira agência', d: 'Cofundo a primeira agência de growth com 3 sócios. Cresce de 0 a 40 pessoas em 18 meses.' },
              { y: '2017', t: 'Performance pra ecommerce', d: 'Pivota pra performance marketing focado em ecommerce mid-market. Gerencia R$120M/ano de mídia.' },
              { y: '2020', t: 'GrowthSales fundada', d: 'Cria a GrowthSales como spin-off focado em SaaS B2B. 28 pessoas no auge.' },
              { y: '2023', t: 'Primeiro contato com Claude Code', d: 'Começa a substituir tarefas operacionais por agentes. Equipe diminui de 28 pra 12, faturamento sobe.' },
              { y: '2024', t: 'AIOX Framework v0.1', d: 'Publica o primeiro framework de squad. Recebe 1.2k stars em 2 semanas.' },
              { y: '2025', t: 'Mentoria · Turma 01', d: 'Primeira turma presencial em Floripa. 12 alunos, lista de espera de 80.' },
              { y: '2026', t: 'GrowthSales 100% agentes', d: 'Encerra todos os contratos PJ. Opera sozinho com 96 agentes. R$2M+/ano.' },
            ].map((row, i, arr) => (
              <li key={row.y} style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '60px 1fr' : '120px 1fr 220px',
                gap: isMobile ? 16 : 32,
                padding: '24px 0',
                borderTop: '1px solid var(--border)',
                borderBottom: i === arr.length - 1 ? '1px solid var(--border)' : 'none',
                alignItems: 'baseline',
              }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: isMobile ? 22 : 32, color: 'var(--ember)', lineHeight: 1 }}>{row.y}</span>
                <div>
                  <h4 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: isMobile ? 20 : 26, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--fg)' }}>{row.t}</h4>
                  <p style={{ margin: '8px 0 0', fontSize: 15, lineHeight: 1.55, color: 'var(--fg-muted)' }}>{row.d}</p>
                </div>
                {!isMobile && (
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)', alignSelf: 'baseline' }}>
                    {i === 0 ? 'INÍCIO' : i === arr.length - 1 ? 'HOJE' : '·'}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ MANIFESTO ═══ */}
      <section style={{ padding: isMobile ? '80px 0' : '128px 0', background: 'var(--bg-section)' }}>
        <div style={{ ...CONTAINER, maxWidth: 880 }}>
          <p className="eyebrow" style={{ marginBottom: 24, textAlign: 'center' }}>Manifesto · 3 verdades</p>
          <h2 style={{
            margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: isMobile ? 36 : 'clamp(40px, 5vw, 64px)',
            lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--fg)', textAlign: 'center',
          }}>
            O que <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>funciona</em>,<br/>
            eu compartilho e ensino.
          </h2>

          <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 24 }}>
            {[
              { n: 'I.',   t: 'Operação > Conteúdo',  d: 'Não te ensino o que ainda não rodei. Tudo que tá aqui passou pela minha máquina.' },
              { n: 'II.',  t: 'Direto > Hedging',     d: 'Sem "talvez", "pode ser", "imagine se". Indicativo, números, exemplo concreto.' },
              { n: 'III.', t: 'Aberto > Fechado',     d: 'O que vendo é tempo + tutoria. O que ensino, eu publico open source.' },
            ].map(p => (
              <div key={p.n} style={{ padding: 32, background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 48, color: 'var(--ember)', lineHeight: 1 }}>{p.n}</div>
                <h4 style={{ margin: '20px 0 12px', fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 600, color: 'var(--fg)' }}>{p.t}</h4>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--fg-muted)' }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLOSING CTA ═══ */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        padding: isMobile ? '80px 20px' : '128px 32px',
        background: 'var(--ember)',
      }}>
        <svg viewBox="0 0 450 390" fill="currentColor" style={{ position: 'absolute', bottom: -120, right: -120, width: 480, height: 480, opacity: 0.08, color: 'var(--void)' }}>
          <path d="M394.945 344H52L223.473 47L394.945 344ZM135 302H311L223 149L135 302Z"/>
        </svg>
        <div style={{ position: 'relative', maxWidth: 1152, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 400, lineHeight: 0.95,
            letterSpacing: '-0.03em', color: 'var(--void)', margin: 0, maxWidth: 920,
            fontSize: isMobile ? 44 : 'clamp(48px, 7vw, 88px)',
          }}>
            Quer construir <span style={{ fontStyle: 'italic', fontWeight: 300 }}>com</span> o João?
          </h2>
          <p style={{ color: 'rgba(5,5,7,0.7)', fontSize: isMobile ? 16 : 18, lineHeight: 1.5, marginTop: 24, maxWidth: 560 }}>
            Mentoria presencial em Floripa · 12 vagas · Turma 03 começa em 15 de junho.
          </p>
          <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#/mentoria" className="btn" style={{ background: 'var(--void)', color: 'var(--fg)', height: 56, padding: '0 32px' }}>
              Entrar na lista <Icon name="arrow-right" size={14}/>
            </a>
          </div>
        </div>
      </section>

      <Footer vp={vp} />
    </div>
  );
}

window.SobrePage = SobrePage;
