/* global React */
/**
 * OpenSourcePage — 41+ filterable resources grid.
 *
 * Sections:
 *  1. Hero (full-bleed photo bg + stats strip)
 *  2. Search + category chips
 *  3. 1px-gutter grid (renders the full SKILLS dataset)
 *  4. Closing CTA (ember full-bleed)
 *  5. Footer
 */
function OpenSourcePage({ vp = 'desktop' }) {
  const isMobile = vp === 'mobile';
  const PAD = isMobile ? '0 20px' : '0 32px';
  const CONTAINER = { maxWidth: 1152, margin: '0 auto', padding: PAD };

  const categories = [
    { id: 'all',         label: 'Todos' },
    { id: 'squads',      label: 'Squads' },
    { id: 'skills',      label: 'Skills' },
    { id: 'apps',        label: 'Apps' },
    { id: 'integracoes', label: 'Integrações' },
    { id: 'aprendizado', label: 'Aprendizado' },
  ];

  const SKILLS = [
    { t: 'AIOX Framework',           d: 'Sistema de orquestração de agentes com squads e personas. Defina workflows, delegue tasks e escale.',  c: 'squads',      a: '@SynkraAI',     icon: 'cube' },
    { t: 'Xquads Squads',            d: '12 squads especializadas com 96+ agentes. A maior coleção de squads AIOX da comunidade.',                c: 'squads',      a: '@rafa.grandi',  icon: 'users' },
    { t: 'n8n Killers Squad',        d: '10 agentes AI pra migrar workflows do n8n. Dexter, Hannibal, Bourne, Lisbeth e mais.',                    c: 'squads',      a: '@joaoguirunas', icon: 'zap' },
    { t: 'Claude Agent Teams',       d: '27 agentes pré-configurados em 3 squads + smart-memory + /team-os. Drop-in pra qualquer Claude Code.',    c: 'squads',      a: '@joaoguirunas', icon: 'cube' },
    { t: 'Maestro Squad',            d: 'Squad de orquestração que coordena outras squads. Roteamento, paralelismo, observabilidade.',              c: 'squads',      a: '@joaoguirunas', icon: 'layers' },
    { t: 'Growth Squad',             d: '8 agentes pra rodar growth full-stack: SEO, mídia, conteúdo, e-mail, analytics.',                          c: 'squads',      a: '@joaoguirunas', icon: 'rocket' },
    { t: 'AIOX Monitor',             d: 'Dashboard isométrico real-time de agentes autônomos. Performance, tasks e métricas.',                      c: 'apps',        a: '@joaoguirunas', icon: 'grid' },
    { t: 'Maestri',                  d: 'Comunicação inter-agentes entre terminais. Conecte múltiplos Claude Code em tempo real.',                  c: 'apps',        a: 'Maestri Team',  icon: 'terminal' },
    { t: 'Pixel Agents',             d: 'Visualize seus agentes Claude Code ao vivo. Pixel-art que reflete cada ação em tempo real.',               c: 'apps',        a: '@joaoguirunas', icon: 'play' },
    { t: 'Squad Inspector',          d: 'Inspecione contexto, memory e tool-calls de cada agente. Debug de squad em segundos.',                     c: 'apps',        a: '@joaoguirunas', icon: 'search' },
    { t: 'Setup Claude Code',        d: 'Guia completo de configuração avançada. Do básico ao expert em Claude Code CLI.',                          c: 'skills',      a: '@joaoguirunas', icon: 'wrench' },
    { t: 'AI Video Generation',      d: 'Gere vídeos com IA usando 40+ modelos. Veo 3.1, Seedance, Wan 2.5, Grok e mais.',                          c: 'skills',      a: '@nichochar',    icon: 'play' },
    { t: 'AI Image Generation',      d: 'Gere imagens com IA usando 50+ modelos. FLUX, Gemini, Grok, Seedream e mais.',                             c: 'skills',      a: '@nichochar',    icon: 'star' },
    { t: 'Social Media Carousel',    d: 'Carrosséis multi-slide pra Instagram, LinkedIn e X com hooks e swipe psychology.',                         c: 'skills',      a: '@joaoguirunas', icon: 'layers' },
    { t: 'Remotion + Claude Code',   d: 'Edite vídeos via prompt no terminal. Cortes, legendas, split screen — sem timeline.',                      c: 'skills',      a: '@joaoguirunas', icon: 'play' },
    { t: 'Email Copy Squad',         d: '4 agentes pra escrever sequências de e-mail: nurture, vendas, reativação, broadcast.',                     c: 'skills',      a: '@joaoguirunas', icon: 'mail' },
    { t: 'Slack Notes Skill',        d: 'Extraia ações de threads do Slack automaticamente. Sumarização + task creation.',                          c: 'skills',      a: '@joaoguirunas', icon: 'book' },
    { t: 'PR Reviewer Skill',        d: 'Code review automatizado com contexto da codebase. Comenta no PR como sênior.',                            c: 'skills',      a: '@joaoguirunas', icon: 'code' },
    { t: 'Meta Ads com IA',          d: 'Automação de campanhas Meta com agentes. Otimize criativos, copy e targeting.',                            c: 'integracoes', a: '@joaoguirunas', icon: 'megaphone' },
    { t: 'Google Ads com IA',        d: 'Performance Max, Search e Display gerenciados por agentes.',                                                 c: 'integracoes', a: '@joaoguirunas', icon: 'search' },
    { t: 'Vercel Deploy',            d: 'Deploy automatizado com preview deployments, domínios custom e edge functions.',                            c: 'integracoes', a: 'Vercel',        icon: 'rocket' },
    { t: 'GitHub Workflows',         d: 'Integração com repos, PRs, Issues e Actions pra workflow de desenvolvimento.',                              c: 'integracoes', a: 'GitHub',        icon: 'github' },
    { t: 'Linear Integration',       d: 'Crie issues, atualize status e movimente projetos via agente direto no Claude Code.',                       c: 'integracoes', a: '@joaoguirunas', icon: 'arrow-right' },
    { t: 'Notion Sync',              d: 'Sync bidirecional entre Claude Code e Notion. Páginas, databases, embeddings.',                             c: 'integracoes', a: '@joaoguirunas', icon: 'book' },
    { t: 'PostgreSQL Skill',         d: 'Query, migrate e otimize Postgres direto do terminal. Schema-aware.',                                       c: 'integracoes', a: '@joaoguirunas', icon: 'database' },
    { t: 'Cursos Anthropic',         d: 'Curadoria dos 13 cursos gratuitos da Anthropic. Aprenda a construir com Claude.',                           c: 'aprendizado', a: 'Anthropic',     icon: 'book' },
    { t: 'Time de Agentes com IA',   d: 'Monte uma empresa de agentes IA trabalhando 24/7. Do zero a operação completa.',                            c: 'aprendizado', a: '@joaoguirunas', icon: 'users' },
    { t: '8 Repositórios Essenciais',d: 'Os repos GitHub que fazem o Claude Code performar 10x mais.',                                                c: 'aprendizado', a: '@joaoguirunas', icon: 'github' },
    { t: 'Managed Agents',           d: 'Como a Anthropic desacoplou brain/hands em agentes. Session + Harness + Sandbox.',                          c: 'aprendizado', a: 'Anthropic Eng', icon: 'brain' },
    { t: 'Prompt Engineering BR',    d: 'Curso completo em pt-BR. Do básico (zero-shot) ao avançado (chain-of-thought + tools).',                    c: 'aprendizado', a: '@joaoguirunas', icon: 'book' },
    { t: 'Tool Use Patterns',        d: 'Padrões de uso de tools nos agentes. Quando expor, quando esconder, quando compor.',                       c: 'aprendizado', a: '@joaoguirunas', icon: 'wrench' },
    { t: 'Memory Architectures',     d: 'Memory vetorial, semântica e episódica em squads. O guia técnico definitivo.',                              c: 'aprendizado', a: '@joaoguirunas', icon: 'brain' },
  ];

  const stats = [
    ['41', 'Recursos'],
    ['100%', 'Open Source'],
    ['13', 'Cursos curados'],
    ['24/7', 'Agentes ativos'],
  ];

  const [activeCat, setActiveCat] = React.useState('all');
  const [query, setQuery] = React.useState('');

  const filtered = SKILLS.filter(s => {
    const okCat = activeCat === 'all' || s.c === activeCat;
    const q = query.toLowerCase().trim();
    const okQ = !q || s.t.toLowerCase().includes(q) || s.d.toLowerCase().includes(q) || s.a.toLowerCase().includes(q);
    return okCat && okQ;
  });

  return (
    <div className="page-frame" style={{ width: '100%', minHeight: '100%', paddingTop: isMobile ? 56 : 64 }}>
      <Header vp={vp} active="/open-source" />

      {/* ═══ HERO ═══ */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? 'auto' : 580 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'url(assets/bg-open-source.png) center 20%/cover' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,5,7,0.95) 0%, rgba(5,5,7,0.70) 50%, rgba(5,5,7,0.20) 100%)' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, var(--void) 0%, rgba(5,5,7,0.2) 50%, transparent 100%)' }}/>

        <div style={{ ...CONTAINER, position: 'relative', paddingTop: isMobile ? 80 : 128, paddingBottom: isMobile ? 64 : 80 }}>
          <p className="eyebrow" style={{ marginBottom: 32 }}>João Guirunas · 41 Recursos · Open Source</p>
          <h1 style={{
            margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: isMobile ? 'clamp(64px, 18vw, 88px)' : 'clamp(80px, 10vw, 144px)',
            lineHeight: 0.9, letterSpacing: '-0.03em', color: 'var(--fg)',
          }}>
            Open <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>Source</em>.
          </h1>
          <p style={{ marginTop: 32, fontSize: isMobile ? 17 : 19, lineHeight: 1.5, maxWidth: 520, color: 'var(--fg-muted)' }}>
            Ferramentas reais para Claude Code — curadas e usadas em produção. Skills, squads, apps e integrações. Tudo MIT.
          </p>

          <div style={{
            marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--border)',
            display: 'flex', gap: isMobile ? 32 : 64, flexWrap: 'wrap',
          }}>
            {stats.map(([v,l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--ember)', fontSize: 30, lineHeight: 1 }}>{v}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-faint)', marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FILTERS + GRID ═══ */}
      <section style={{ padding: isMobile ? '40px 0 80px' : '48px 0 128px' }}>
        <div style={CONTAINER}>
          {/* Search */}
          <div style={{ paddingTop: 24, paddingBottom: 16 }}>
            <div style={{ position: 'relative', maxWidth: 360 }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-faint)' }}>
                <Icon name="search" size={16} stroke={1.5}/>
              </span>
              <input
                type="search"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                placeholder="Buscar recursos..."
                className="field"
                style={{ paddingLeft: 40, fontFamily: 'var(--font-mono)', fontSize: 13 }}
              />
            </div>
          </div>

          {/* Category chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            {categories.map(c => {
              const on = activeCat === c.id;
              return (
                <button key={c.id} onClick={()=>setActiveCat(c.id)} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '10px 16px', cursor: 'pointer',
                  fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
                  textTransform: 'uppercase', letterSpacing: '0.10em',
                  background: on ? 'rgba(255,58,14,0.10)' : 'transparent',
                  border: on ? '1px solid rgba(255,58,14,0.40)' : '1px solid var(--border)',
                  color: on ? 'var(--ember)' : 'var(--fg-muted)',
                  transition: 'all 150ms',
                }}>
                  {c.label}
                  {on && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, opacity: 0.6 }}>
                    {c.id === 'all' ? SKILLS.length : SKILLS.filter(s => s.c === c.id).length}
                  </span>}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 1,
            background: 'var(--border)',
            border: '1px solid var(--border)',
          }}>
            {filtered.map(s => <OSGridCard key={s.t} s={s} categoryLabel={categories.find(c=>c.id===s.c)?.label} />)}
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
          <p style={{ marginBottom: 24, fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(5,5,7,0.55)', fontWeight: 500 }}>
            Mentoria · Floripa · Turma 03
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 400, lineHeight: 0.95,
            letterSpacing: '-0.03em', color: 'var(--void)', margin: 0, maxWidth: 920,
            fontSize: isMobile ? 44 : 'clamp(48px, 7vw, 88px)',
          }}>
            Quer aprender a <span style={{ fontStyle: 'italic', fontWeight: 300 }}>operar</span> isso tudo?
          </h2>
          <p style={{ color: 'rgba(5,5,7,0.7)', fontSize: isMobile ? 16 : 18, lineHeight: 1.5, marginTop: 24, maxWidth: 560 }}>
            Os 41 recursos estão grátis pra você baixar agora. Configurar uma squad rodando sua operação é outra coisa.
          </p>
          <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#/mentoria" className="btn" style={{ background: 'var(--void)', color: 'var(--fg)', height: 56, padding: '0 32px' }}>
              Entrar na mentoria <Icon name="arrow-right" size={14}/>
            </a>
          </div>
        </div>
      </section>

      <Footer vp={vp} />
    </div>
  );
}

/* OSGridCard — 1px gutter card */
function OSGridCard({ s, categoryLabel }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{
      padding: 20, background: hover ? 'var(--bg-card-hover)' : 'var(--bg-card)',
      display: 'flex', flexDirection: 'column', minHeight: 220,
      transition: 'background 150ms', cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
        <div style={{
          width: 36, height: 36, background: 'var(--bg-card-raised)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: hover ? 'var(--ember)' : 'var(--fg-muted)', transition: 'color 150ms',
        }}>
          <Icon name={s.icon} size={16} stroke={1.5}/>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)', fontWeight: 500 }}>{categoryLabel}</span>
      </div>
      <h4 style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, lineHeight: 1.25, color: 'var(--fg)' }}>{s.t}</h4>
      <p style={{ margin: '8px 0 0', fontSize: 12.5, lineHeight: 1.55, color: 'var(--fg-muted)', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{s.d}</p>
      <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: hover ? 'var(--ember)' : 'transparent', transition: 'color 150ms' }}>Ver →</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-faint)' }}>{s.a}</span>
      </div>
    </div>
  );
}

window.OpenSourcePage = OpenSourcePage;
