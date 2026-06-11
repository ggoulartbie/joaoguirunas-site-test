/* global React */
/**
 * BlogPage — lista de posts editoriais.
 */
function BlogPage({ vp = 'desktop' }) {
  const isMobile = vp === 'mobile';
  const PAD = isMobile ? '0 20px' : '0 32px';
  const CONTAINER = { maxWidth: 1152, margin: '0 auto', padding: PAD };

  const POSTS = [
    { n: '01', cat: 'SQUADS',     t: 'Como rodar 96 agentes sem virar gerente.',         d: 'O modelo de orquestração que tirou 15 pessoas do meu time e botou squads. Sem perder qualidade, com 4× a velocidade.', date: '12 ABR 2026', read: '8 min', feat: true },
    { n: '02', cat: 'GROWTH',     t: 'O squad de Meta Ads que substituiu 3 mídias.',     d: 'Configuração, criativos, copy e otimização — tudo rodando por agentes desde dezembro. Os números brutos.', date: '04 ABR 2026', read: '6 min' },
    { n: '03', cat: 'OPERAÇÕES', t: 'Por que abandonei n8n pra Claude Code.',           d: 'Workflows visuais são bonitos. Mas quando seu negócio cresce, eles quebram. O caminho que fiz.',           date: '28 MAR 2026', read: '12 min' },
    { n: '04', cat: 'SQUADS',     t: 'Memory architectures: 3 padrões testados.',        d: 'Vetorial, semântica, episódica. Quando usar cada uma e como elas conversam em squads grandes.',           date: '21 MAR 2026', read: '14 min' },
    { n: '05', cat: 'GROWTH',     t: 'Pay-back de R$8.700 em 28 dias.',                 d: 'O case da Marina (Maestri T01). Como ela quebrou R$22k/mês em custos de freelancer em menos de um mês.',     date: '14 MAR 2026', read: '5 min' },
    { n: '06', cat: 'OPS',        t: 'O fim do PJ: estrutura legal pós-agentes.',        d: 'Implicações trabalhistas, fiscais e contratuais quando seu time vira squad. O que aprendi com o contador.', date: '07 MAR 2026', read: '9 min' },
    { n: '07', cat: 'SQUADS',     t: 'Maestri, a regente das squads.',                   d: 'Como construí o roteador que coordena 12 squads independentes. Comunicação cross-terminal explicada.',     date: '28 FEV 2026', read: '11 min' },
    { n: '08', cat: 'OPERAÇÕES', t: 'Onde Claude Code falha (e como contornar).',        d: 'Limites de contexto, tool-call drift, custo de tokens. Os 3 gargalos reais e os hacks que uso.',          date: '21 FEV 2026', read: '7 min' },
    { n: '09', cat: 'GROWTH',     t: 'A operação 100% agentes: 1 ano depois.',           d: 'Aniversário da GrowthSales 100% agentes. Métricas reais, decisões erradas e os 3 momentos críticos.',     date: '14 FEV 2026', read: '15 min' },
  ];

  const CATS = ['Todos', 'Squads', 'Growth', 'Operações', 'Ops'];
  const [activeCat, setActiveCat] = React.useState('Todos');
  const filtered = activeCat === 'Todos' ? POSTS : POSTS.filter(p => p.cat === activeCat.toUpperCase() || p.cat === activeCat.toUpperCase().slice(0,-1));
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="page-frame" style={{ width: '100%', minHeight: '100%', paddingTop: isMobile ? 56 : 64 }}>
      <Header vp={vp} active="/blog" />

      {/* ═══ HERO ═══ */}
      <section style={{ padding: isMobile ? '64px 0 32px' : '128px 0 48px' }}>
        <div style={CONTAINER}>
          <p className="eyebrow" style={{ marginBottom: 24 }}>Blog · Operador, não guru</p>
          <h1 style={{
            margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: isMobile ? 'clamp(56px, 16vw, 88px)' : 'clamp(80px, 10vw, 144px)',
            lineHeight: 0.9, letterSpacing: '-0.03em', color: 'var(--fg)',
          }}>
            Escrito.
          </h1>
          <p className="lead" style={{ marginTop: 32 }}>
            Notas técnicas sobre Claude Code, squads, automação e growth. Tudo que rodou na minha máquina, eu publico.
          </p>
        </div>
      </section>

      {/* ═══ CATEGORIES + FEATURED ═══ */}
      <section style={{ padding: isMobile ? '24px 0 64px' : '32px 0 96px' }}>
        <div style={CONTAINER}>
          {/* Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 48, paddingBottom: 32, borderBottom: '1px solid var(--border)' }}>
            {CATS.map(c => {
              const on = activeCat === c;
              return (
                <button key={c} onClick={()=>setActiveCat(c)} style={{
                  padding: '10px 16px', cursor: 'pointer',
                  fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
                  textTransform: 'uppercase', letterSpacing: '0.10em',
                  background: on ? 'rgba(255,58,14,0.10)' : 'transparent',
                  border: on ? '1px solid rgba(255,58,14,0.40)' : '1px solid var(--border)',
                  color: on ? 'var(--ember)' : 'var(--fg-muted)',
                  transition: 'all 150ms',
                }}>{c}</button>
              );
            })}
          </div>

          {/* Featured post */}
          {featured && (
            <a href="#/blog/post" style={{ display: 'block', textDecoration: 'none', color: 'inherit', marginBottom: 64 }}>
              <article style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
                gap: isMobile ? 24 : 48, alignItems: 'center',
                padding: isMobile ? 0 : 0,
              }}>
                <div style={{
                  aspectRatio: '4/3', border: '1px solid var(--border)',
                  position: 'relative', overflow: 'hidden', background: 'var(--bg-card)',
                }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 40%, rgba(255,58,14,0.18) 0%, transparent 55%), repeating-linear-gradient(45deg, transparent 0 22px, rgba(255,255,255,0.03) 22px 23px)' }}/>
                  <div style={{ position: 'absolute', bottom: 16, left: 16, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 96, color: 'var(--ember)', lineHeight: 0.9, opacity: 0.55 }}>{featured.n}</div>
                  <div style={{ position: 'absolute', top: 16, left: 16, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ember)', background: 'rgba(5,5,7,0.65)', border: '1px solid rgba(255,58,14,0.3)', padding: '4px 8px' }}>{featured.cat}</div>
                  <div style={{ position: 'absolute', top: 16, right: 16, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg)', background: 'rgba(255,58,14,0.9)', padding: '4px 8px' }}>EM DESTAQUE</div>
                </div>
                <div>
                  <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: isMobile ? 32 : 'clamp(36px, 4vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--fg)' }}>
                    {featured.t}
                  </h2>
                  <p style={{ marginTop: 20, fontSize: isMobile ? 16 : 18, lineHeight: 1.55, color: 'var(--fg-muted)', maxWidth: 560 }}>{featured.d}</p>
                  <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>
                    <span>{featured.date}</span>·<span>{featured.read}</span>·<span style={{ color: 'var(--ember)' }}>Ler →</span>
                  </div>
                </div>
              </article>
            </a>
          )}

          <hr className="hairline" style={{ marginBottom: 48 }}/>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? 32 : 28,
          }}>
            {rest.map(p => <PostCard key={p.n} p={p}/>)}
          </div>

          {/* Pagination */}
          <div style={{ marginTop: 80, paddingTop: 32, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexDirection: isMobile ? 'column' : 'row' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>
              Mostrando 1 – 9 de 47 posts
            </p>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="btn btn-ghost btn-sm" disabled style={{ opacity: 0.4 }}>← Anterior</button>
              <button className="btn btn-ghost btn-sm" style={{ background: 'rgba(255,58,14,0.10)', borderColor: 'rgba(255,58,14,0.40)', color: 'var(--ember)' }}>1</button>
              <button className="btn btn-ghost btn-sm">2</button>
              <button className="btn btn-ghost btn-sm">3</button>
              <button className="btn btn-ghost btn-sm">…</button>
              <button className="btn btn-ghost btn-sm">6</button>
              <button className="btn btn-ghost btn-sm">Próxima →</button>
            </div>
          </div>
        </div>
      </section>

      <Footer vp={vp} />
    </div>
  );
}

function PostCard({ p }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href="#/blog/post" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{ display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
      <div style={{ aspectRatio: '4/3', background: 'var(--bg-card)', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 30% 40%, rgba(255,58,14,0.15) 0%, transparent 50%), repeating-linear-gradient(45deg, transparent 0 18px, rgba(255,255,255,0.03) 18px 19px)',
          filter: hover ? 'none' : 'grayscale(0.4)',
          transition: 'filter 300ms',
        }}/>
        <div style={{ position: 'absolute', bottom: 12, left: 12, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 56, color: 'var(--ember)', lineHeight: 1, opacity: 0.5 }}>{p.n}</div>
        <div style={{ position: 'absolute', top: 12, left: 12, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ember)', background: 'rgba(5,5,7,0.6)', border: '1px solid rgba(255,58,14,0.3)', padding: '4px 8px' }}>{p.cat}</div>
      </div>
      <h4 style={{ margin: 0, marginTop: 20, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 22, lineHeight: 1.2, letterSpacing: '-0.02em', color: hover ? 'var(--ember)' : 'var(--fg)', transition: 'color 200ms' }}>{p.t}</h4>
      <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.55, color: 'var(--fg-muted)' }}>{p.d}</p>
      <div style={{ marginTop: 14, display: 'flex', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>
        <span>{p.date}</span><span>·</span><span>{p.read}</span>
      </div>
    </a>
  );
}

window.BlogPage = BlogPage;
window.PostCard = PostCard;
