/* global React */
/**
 * HomePage — primary marketing surface.
 *
 * Sections:
 *  1. Hero (rotating word, 3 CTAs)
 *  2. Surfaces grid (Open Source / Mentoria / Curso / Framework)
 *  3. Open Source teaser (5 cards + view-all)
 *  4. Mentoria editorial (split layout, photo + manifesto)
 *  5. Stats strip
 *  6. Recent writing (3 blog cards)
 *  7. Closing CTA block (ember full-bleed)
 *  8. Footer
 *
 * Render twice: <HomePage vp="mobile" /> and <HomePage vp="desktop" />
 */
function HomePage({ vp = 'desktop' }) {
  const isMobile = vp === 'mobile';
  const PAD = isMobile ? '0 20px' : '0 32px';
  const CONTAINER = { maxWidth: 1152, margin: '0 auto', padding: PAD };

  return (
    <div className="page-frame" style={{ width: '100%', minHeight: '100%', paddingTop: isMobile ? 56 : 64 }}>
      <Header vp={vp} active="/" />

      {/* ═══ HERO ═══ */}
      <section style={{
        position: 'relative',
        padding: isMobile ? '88px 20px 64px' : '140px 32px 96px',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Glow line */}
        <div style={{
          position: 'absolute', top: isMobile ? 120 : 180, left: '15%', right: '15%', height: 1,
          background: 'linear-gradient(90deg, transparent, var(--ember), transparent)',
        }}/>
        <div style={{
          position: 'absolute', top: isMobile ? 120 : 180, left: '15%', right: '15%', height: 2,
          background: 'linear-gradient(90deg, transparent, var(--ember), transparent)',
          filter: 'blur(2px)', opacity: 0.6,
        }}/>

        <p className="eyebrow jg-fade-up" style={{ marginBottom: 24, fontSize: isMobile ? 10 : 11 }}>
          João Guirunas · CEO GrowthSales.ai
        </p>

        <h1 className="jg-blur-in" style={{
          fontFamily: 'var(--font-display)', fontWeight: 400,
          fontSize: isMobile ? 'clamp(48px, 16vw, 72px)' : 'clamp(72px, 8.5vw, 120px)',
          lineHeight: 0.92, letterSpacing: '-0.03em',
          color: 'var(--fg)', margin: 0, maxWidth: 920, marginLeft: 'auto', marginRight: 'auto',
        }}>
          aprendo <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>usando</em>,<br/>
          aplico, <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>compartilho</em>.
        </h1>

        <p className="lead jg-fade-up jg-d3" style={{
          marginTop: 32,
          marginLeft: 'auto', marginRight: 'auto',
          maxWidth: 560, color: 'var(--fg-muted)',
        }}>
          CEO da GrowthSales.ai. Uso IA em negócios reais — automação, growth e sistemas que escalam. O que funciona, eu compartilho e ensino.
        </p>

        <div className="jg-fade-up jg-d4" style={{
          display: 'flex', gap: 10, marginTop: 40, flexWrap: 'wrap',
          justifyContent: 'center', flexDirection: isMobile ? 'column' : 'row',
          maxWidth: isMobile ? 320 : 'none', marginLeft: isMobile ? 'auto' : undefined, marginRight: isMobile ? 'auto' : undefined,
        }}>
          <a href="#/mentoria" className="btn btn-primary">Mentoria <Icon name="arrow-right" size={12}/></a>
          <a href="#/open-source" className="btn btn-ghost">Open Source</a>
          <a href="#/curso-online" className="btn btn-ghost">Curso Online</a>
        </div>

        {/* Hairline stats below hero */}
        <div style={{
          maxWidth: 720, margin: '80px auto 0', paddingTop: 32,
          borderTop: '1px solid var(--border)',
          display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
          gap: isMobile ? 32 : 24, textAlign: 'left',
        }}>
          {[
            ['41', 'Recursos open source'],
            ['12', 'Vagas mentoria'],
            ['96+', 'Agentes em squads'],
            ['R$1M+', 'Ticket dos alunos'],
          ].map(([v,l]) => (
            <div key={l}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--ember)', fontSize: isMobile ? 28 : 36, lineHeight: 1 }}>{v}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-faint)', marginTop: 8 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="hairline" />

      {/* ═══ SURFACES GRID ═══ */}
      <section style={{ padding: isMobile ? '64px 0' : '96px 0' }}>
        <div style={CONTAINER}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 48, flexDirection: isMobile ? 'column' : 'row', gap: 24, alignItems: isMobile ? 'flex-start' : 'flex-end' }}>
            <SectionHeader
              eyebrow="Surfaces · O que existe aqui"
              title="Quatro pontas,"
              italic="um operador."
              lead="Cada surface resolve um problema concreto. Sem hub falso, sem 'em breve'."
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
            gap: 1, background: 'var(--border)', border: '1px solid var(--border)',
          }}>
            {[
              {
                cat: 'Open Source',
                title: '41+ recursos pra Claude Code.',
                desc: 'Skills, squads, apps e integrações usadas em produção. Sem paywall.',
                meta: '100% OSS · MIT',
                icon: 'cube',
                cta: 'Ver no GitHub',
              },
              {
                cat: 'Mentoria · Floripa',
                title: 'Você + agentes IA em 8 semanas.',
                desc: '12 vagas presenciais. Você sai com uma operação rodando, não com PDFs.',
                meta: '12 vagas · 15/06',
                icon: 'users',
                cta: 'Lista de espera',
                primary: true,
              },
              {
                cat: 'Curso Online',
                title: 'Time de agentes do zero ao deploy.',
                desc: 'Async, prático, sem teoria. Para quem não consegue ir pra Floripa.',
                meta: 'Async · 6 módulos',
                icon: 'play',
                cta: 'Entrar na lista',
              },
              {
                cat: 'Framework AIOX',
                title: 'Orquestração de squads e personas.',
                desc: 'Engine que roda as 96+ agentes. Open source, documentação completa.',
                meta: 'v0.4 · Docs',
                icon: 'layers',
                cta: 'Ver docs',
              },
            ].map(s => (
              <SurfaceCard key={s.cat} {...s} primary={s.primary} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MENTORIA EDITORIAL ═══ */}
      <section style={{ padding: isMobile ? '80px 0' : '128px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Radial ember glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,58,14,0.08) 0%, transparent 60%)', pointerEvents: 'none' }}/>
        <div style={{ ...CONTAINER, position: 'relative' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 32 : 80, alignItems: 'center',
          }}>
            {/* Photo */}
            <div style={{ position: 'relative', aspectRatio: '4/5', border: '1px solid var(--border-strong)' }}>
              <img src="assets/portrait-founder.png" alt="João Guirunas" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.4) contrast(1.05)' }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: 18, background: 'linear-gradient(0deg, rgba(5,5,7,0.9), transparent)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 8,
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>JOÃO · ABRIL 2026</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-faint)', marginTop: 2 }}>FLORIANÓPOLIS — BR</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--ember)' }}>● AO VIVO</div>
              </div>
            </div>

            {/* Manifesto */}
            <div>
              <p className="eyebrow" style={{ marginBottom: 20 }}>Mentoria · 8 semanas</p>
              <h2 style={{
                margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400,
                fontSize: isMobile ? 40 : 'clamp(40px, 5vw, 64px)',
                lineHeight: 0.98, letterSpacing: '-0.03em', color: 'var(--fg)',
              }}>
                Não é mais um curso online. É uma <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>transformação guiada</em>.
              </h2>
              <div className="accent-line" style={{ marginTop: 24 }}/>
              <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.6, color: 'var(--fg-secondary)', maxWidth: 520 }}>
                12 vagas, presencial em Floripa. Você chega operador médio e sai operando uma equipe de agentes em produção. Sem promessa de milhão, sem framework de slide.
              </p>

              <ul style={{ marginTop: 32, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  '8 semanas · Encontros semanais presenciais',
                  'Squad própria configurada com seu negócio',
                  'Acesso vitalício aos 41+ recursos open source',
                  'Demo Day final · Sua operação rodando',
                ].map(l => (
                  <li key={l} style={{ display: 'flex', alignItems: 'start', gap: 12, fontSize: 15, color: 'var(--fg-secondary)' }}>
                    <span style={{ color: 'var(--ember)', flexShrink: 0, marginTop: 4 }}><Icon name="check" size={16} stroke={2.5}/></span>
                    {l}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', gap: 10, marginTop: 40, flexWrap: 'wrap' }}>
                <a href="#/mentoria" className="btn btn-primary">Lista de espera <Icon name="arrow-right" size={12}/></a>
                <a href="#/mentoria" className="btn btn-ghost">Ver detalhes</a>
              </div>

              <p style={{ marginTop: 28, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>
                Turma 03 · Início 15/06 · 12 vagas · R$8.700
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* ═══ OPEN SOURCE TEASER ═══ */}
      <section style={{ padding: isMobile ? '64px 0' : '96px 0' }}>
        <div style={CONTAINER}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            marginBottom: 48, gap: 24,
            flexDirection: isMobile ? 'column' : 'row',
          }}>
            <SectionHeader
              eyebrow="Open Source · 41 recursos"
              title="O que eu uso,"
              italic="você usa."
              lead="Skills, squads, apps e integrações testadas em produção real. Tudo MIT."
            />
            <a href="#/open-source" className="btn btn-ghost" style={{ flexShrink: 0 }}>Ver todos os 41 <Icon name="arrow-right" size={12}/></a>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
            gap: 1, background: 'var(--border)', border: '1px solid var(--border)',
          }}>
            {[
              { cat: 'SQUADS',      icon: 'cube',     title: 'AIOX Framework',     desc: 'Orquestração de agentes com squads e personas.', meta: '@SynkraAI' },
              { cat: 'SKILLS',      icon: 'wrench',   title: 'Setup Claude Code',  desc: 'Do básico ao expert. Config avançada do CLI.',    meta: '@joaoguirunas' },
              { cat: 'APPS',        icon: 'grid',     title: 'AIOX Monitor',       desc: 'Dashboard isométrico real-time de agentes.',      meta: '@joaoguirunas' },
              { cat: 'SQUADS',      icon: 'users',    title: 'Xquads Squads',      desc: '12 squads especializadas com 96+ agentes.',       meta: '@rafa.grandi' },
              { cat: 'INTEGRAÇÕES', icon: 'megaphone',title: 'Meta Ads com IA',    desc: 'Automação de campanhas. Criativos, copy, target.', meta: '@joaoguirunas' },
              { cat: 'APRENDIZADO', icon: 'book',     title: 'Cursos Anthropic',   desc: 'Curadoria dos 13 cursos gratuitos da Anthropic.',  meta: 'Anthropic' },
            ].map(c => <OSCard key={c.title} {...c} />)}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* ═══ STATS / SOCIAL PROOF ═══ */}
      <section style={{
        padding: isMobile ? '64px 0' : '96px 0',
        background: 'var(--bg-section)',
      }}>
        <div style={CONTAINER}>
          <p className="eyebrow-muted" style={{ marginBottom: 32 }}>Quem confia · Onde tá rodando</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(3,1fr)' : 'repeat(6,1fr)',
            gap: 1, background: 'var(--border)', border: '1px solid var(--border)',
          }}>
            {['SynkraAI', 'Maestri', 'Xquads', 'GrowthSales', 'Anthropic', 'Vercel'].map(n => (
              <div key={n} style={{ padding: '32px 20px', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.05em', color: 'var(--fg-muted)', fontWeight: 500 }}>{n}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
            {[
              {
                quote: 'O João não vende framework. Ele entrega uma squad rodando na minha máquina na semana 4. Levei mais resultado em 2 meses do que em 1 ano de consultoria.',
                author: 'Carlos Mendes',
                role: 'CEO · Synkra · Turma 02',
              },
              {
                quote: 'Cortei R$22k/mês de freelancer substituindo com squad própria configurada na mentoria. Pay-back foi em 28 dias.',
                author: 'Marina Aoki',
                role: 'Founder · Maestri · Turma 01',
              },
            ].map(t => (
              <figure key={t.author} style={{ margin: 0, padding: isMobile ? 32 : 40, background: 'var(--bg)' }}>
                <Icon name="info" size={20} style={{ color: 'var(--ember)', marginBottom: 16, transform: 'rotate(180deg) scaleX(-1)' }}/>
                <blockquote style={{ margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: isMobile ? 20 : 24, lineHeight: 1.35, letterSpacing: '-0.01em', color: 'var(--fg)' }}>
                  "{t.quote}"
                </blockquote>
                <figcaption style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--bg-card-raised)', border: '1px solid var(--border)', flexShrink: 0 }}/>
                  <div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--fg)', fontWeight: 500 }}>{t.author}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)', marginTop: 2 }}>{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* ═══ RECENT WRITING ═══ */}
      <section style={{ padding: isMobile ? '64px 0' : '96px 0' }}>
        <div style={CONTAINER}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            marginBottom: 48, gap: 24,
            flexDirection: isMobile ? 'column' : 'row',
          }}>
            <SectionHeader
              eyebrow="Escrito · 2026"
              title="Notas do operador,"
              italic="não do guru."
            />
            <a href="#/blog" className="btn btn-ghost" style={{ flexShrink: 0 }}>Ver todos <Icon name="arrow-right" size={12}/></a>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
            gap: isMobile ? 32 : 24,
          }}>
            {[
              { cat: 'SQUADS', title: 'Como rodar 96 agentes sem virar gerente.', date: '12 ABR 2026', read: '8 min' },
              { cat: 'GROWTH', title: 'O squad de Meta Ads que substituiu 3 mídias.', date: '04 ABR 2026', read: '6 min' },
              { cat: 'OPERAÇÕES', title: 'Por que abandonei n8n pra Claude Code.', date: '28 MAR 2026', read: '12 min' },
            ].map(p => <BlogCard key={p.title} {...p} />)}
          </div>
        </div>
      </section>

      {/* ═══ CLOSING CTA BLOCK ═══ */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        padding: isMobile ? '80px 20px' : '128px 32px',
        background: 'var(--ember)',
      }}>
        <svg viewBox="0 0 450 390" fill="currentColor" style={{ position: 'absolute', bottom: -120, right: -120, width: 480, height: 480, opacity: 0.08, color: 'var(--void)' }}>
          <path d="M394.945 344H52L223.473 47L394.945 344ZM135 302H311L223 149L135 302Z"/>
        </svg>
        <div style={{ position: 'relative', maxWidth: 1152, margin: '0 auto' }}>
          <p style={{ marginBottom: 24, fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(5,5,7,0.55)', fontWeight: 500 }}>
            Mentoria Exclusiva · Turma 03
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 400, lineHeight: 0.95,
            letterSpacing: '-0.03em', color: 'var(--void)', margin: 0, maxWidth: 920,
            fontSize: isMobile ? 44 : 'clamp(48px, 7vw, 88px)',
          }}>
            Pronto pra ter sua própria <span style={{ fontStyle: 'italic', fontWeight: 300 }}>equipe de agentes IA</span>?
          </h2>
          <p style={{ color: 'rgba(5,5,7,0.7)', fontSize: isMobile ? 16 : 18, lineHeight: 1.5, marginTop: 24, maxWidth: 560 }}>
            Turma de 12 alunos, presencial em Floripa, início 15 de junho. As últimas turmas esgotaram em 8 dias.
          </p>
          <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap', flexDirection: isMobile ? 'column' : 'row' }}>
            <a href="#/mentoria" className="btn" style={{ background: 'var(--void)', color: 'var(--fg)', height: 56, padding: '0 32px' }}>
              Entrar na lista <Icon name="arrow-right" size={14}/>
            </a>
            <a href="#/contato" className="btn" style={{ background: 'transparent', color: 'var(--void)', border: '1px solid rgba(5,5,7,0.3)', height: 56, padding: '0 32px' }}>
              Falar com João
            </a>
          </div>
        </div>
      </section>

      <Footer vp={vp} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SurfaceCard — used in the surfaces grid on Home
   ───────────────────────────────────────────────────────────── */
function SurfaceCard({ cat, title, desc, meta, icon, cta, primary }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        position: 'relative', padding: 32, background: primary ? '#0e0e11' : 'var(--bg)',
        minHeight: 280, display: 'flex', flexDirection: 'column',
        transition: 'background 200ms ease',
        cursor: 'pointer',
        ...(hover ? { background: 'var(--bg-card-raised)' } : {}),
      }}
    >
      {primary && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--ember)' }}/>}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 24 }}>
        <div style={{ width: 40, height: 40, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: hover ? 'var(--ember)' : 'var(--fg-muted)', transition: 'color 200ms' }}>
          <Icon name={icon} size={20} />
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: primary ? 'var(--ember)' : 'var(--fg-faint)', fontWeight: 500 }}>{cat}</span>
      </div>

      <h3 style={{
        margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400,
        fontSize: 28, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--fg)',
      }}>{title}</h3>

      <p style={{ marginTop: 16, marginBottom: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--fg-muted)', flex: 1 }}>{desc}</p>

      <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>{meta}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', color: hover ? 'var(--ember)' : 'var(--fg-secondary)', transition: 'color 200ms', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          {cta} <Icon name="arrow-right" size={11}/>
        </span>
      </div>

      {/* Hover bar */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 2,
        background: 'var(--ember)',
        transform: hover ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left',
        transition: 'transform 300ms var(--ease-glide)',
      }}/>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   OSCard — open-source mini-card (1px gutter grid)
   ───────────────────────────────────────────────────────────── */
function OSCard({ cat, icon, title, desc, meta }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{
      padding: 20, background: hover ? 'var(--bg-card-hover)' : 'var(--bg-card)',
      display: 'flex', flexDirection: 'column', minHeight: 200, transition: 'background 150ms',
      cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
        <div style={{ width: 32, height: 32, background: 'var(--bg-card-raised)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: hover ? 'var(--ember)' : 'var(--fg-muted)', transition: 'color 150ms' }}>
          <Icon name={icon} size={14} stroke={1.5}/>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)', fontWeight: 500 }}>{cat}</span>
      </div>
      <h4 style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, lineHeight: 1.3, color: 'var(--fg)' }}>{title}</h4>
      <p style={{ marginTop: 8, marginBottom: 0, fontSize: 13, lineHeight: 1.55, color: 'var(--fg-muted)', flex: 1 }}>{desc}</p>
      <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.06em', color: hover ? 'var(--ember)' : 'transparent', transition: 'color 150ms' }}>Ver →</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-faint)' }}>{meta}</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   BlogCard — blog post preview card
   ───────────────────────────────────────────────────────────── */
function BlogCard({ cat, title, date, read, image }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href="#/blog/post" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{
      display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'pointer',
      transition: 'background 200ms',
    }}>
      <div style={{
        aspectRatio: '4/3', background: 'var(--bg-card)', border: '1px solid var(--border)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Editorial placeholder — abstract numerical motif */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 30% 40%, rgba(255,58,14,0.15) 0%, transparent 50%), repeating-linear-gradient(45deg, transparent 0 18px, rgba(255,255,255,0.03) 18px 19px)`,
          filter: hover ? 'none' : 'grayscale(0.5)',
          transition: 'filter 300ms',
        }}/>
        <div style={{ position: 'absolute', bottom: 12, left: 12, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 56, color: 'var(--ember)', lineHeight: 1, opacity: 0.5 }}>
          {cat === 'SQUADS' ? '01' : cat === 'GROWTH' ? '02' : '03'}
        </div>
        <div style={{ position: 'absolute', top: 12, left: 12, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ember)', background: 'rgba(5,5,7,0.6)', border: '1px solid rgba(255,58,14,0.3)', padding: '4px 8px' }}>{cat}</div>
      </div>
      <h4 style={{ margin: 0, marginTop: 20, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 22, lineHeight: 1.2, letterSpacing: '-0.02em', color: hover ? 'var(--ember)' : 'var(--fg)', transition: 'color 200ms' }}>{title}</h4>
      <div style={{ marginTop: 14, display: 'flex', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>
        <span>{date}</span><span>·</span><span>{read}</span>
      </div>
    </a>
  );
}

window.HomePage = HomePage;
window.SurfaceCard = SurfaceCard;
window.OSCard = OSCard;
window.BlogCard = BlogCard;
