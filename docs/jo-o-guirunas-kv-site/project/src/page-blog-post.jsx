/* global React */
/**
 * BlogPostPage — artigo individual com prose tipográfica.
 */
function BlogPostPage({ vp = 'desktop' }) {
  const isMobile = vp === 'mobile';

  return (
    <div className="page-frame" style={{ width: '100%', minHeight: '100%', paddingTop: isMobile ? 56 : 64 }}>
      <Header vp={vp} active="/blog" />

      {/* ═══ ARTICLE HERO ═══ */}
      <article>
        <header style={{ padding: isMobile ? '64px 0 32px' : '128px 0 48px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '0 20px' : '0 32px' }}>
            <a href="#/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', textDecoration: 'none', marginBottom: 40 }}>
              ← Todos os posts
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ember)', border: '1px solid rgba(255,58,14,0.30)', background: 'rgba(255,58,14,0.10)', padding: '4px 10px', fontWeight: 500 }}>
                SQUADS
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>12 ABR 2026 · 8 min de leitura</span>
            </div>

            <h1 style={{
              margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: isMobile ? 'clamp(40px, 11vw, 56px)' : 'clamp(48px, 5.5vw, 80px)',
              lineHeight: 0.98, letterSpacing: '-0.03em', color: 'var(--fg)',
            }}>
              Como rodar 96 agentes <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>sem virar gerente</em>.
            </h1>

            <p style={{ marginTop: 32, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: isMobile ? 22 : 28, lineHeight: 1.4, letterSpacing: '-0.01em', color: 'var(--fg-secondary)' }}>
              O modelo de orquestração que tirou 15 pessoas do meu time e botou squads no lugar. Sem perder qualidade, com 4× a velocidade.
            </p>

            <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', boxShadow: '0 0 0 2px var(--ember)', flexShrink: 0 }}>
                <img src="assets/joao-profile.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}/>
              </span>
              <div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--fg)', fontWeight: 500 }}>João Guirunas</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)', marginTop: 2 }}>CEO · GrowthSales.ai</div>
              </div>
            </div>
          </div>
        </header>

        {/* Cover image */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 20px' : '0 32px' }}>
          <div style={{ aspectRatio: isMobile ? '4/3' : '21/9', background: 'var(--bg-card)', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 40% 50%, rgba(255,58,14,0.25) 0%, transparent 55%), repeating-linear-gradient(45deg, transparent 0 24px, rgba(255,255,255,0.04) 24px 25px)' }}/>
            <div style={{ position: 'absolute', bottom: 24, left: 24, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 144, color: 'var(--ember)', lineHeight: 0.85, opacity: 0.5 }}>01</div>
            <div style={{ position: 'absolute', top: 24, right: 24, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>FIG. 1 · OVERVIEW</div>
          </div>
        </div>

        {/* Prose body */}
        <div style={{ padding: isMobile ? '48px 20px 80px' : '80px 32px 128px' }}>
          <div style={{ maxWidth: '68ch', margin: '0 auto' }} className="prose">
            <p>
              Em <strong>janeiro de 2025</strong>, eu tinha 28 pessoas na GrowthSales. Era um time funcional, performando — mas eu passava 4 horas por dia em <em>standups</em>, revisão de PR e desbloqueio. Era gerente, não operador.
            </p>

            <p>
              Hoje, <strong>14 meses depois</strong>, eu tenho 0 PJs e <strong>96 agentes</strong>. Faturamento subiu 2,1×. Custo de operação caiu 73%. Eu opero — não gerencio.
            </p>

            <p>
              Este post não é sobre <em>"IA é o futuro"</em>. É sobre o modelo de orquestração que tornou essa transição possível. Vou descrever os 3 movimentos.
            </p>

            <h2>Movimento 1 — Squad é unidade, agente é função</h2>

            <p>
              O erro mais comum quando você começa com Claude Code é tratar cada agente como funcionário. Você dá nome, escopo amplo, esperar que ele <em>"resolva"</em>.
            </p>

            <blockquote>
              Um agente bom não é um humano em miniatura. É uma função pura: contexto + skill + tool calls.
            </blockquote>

            <p>
              Em vez disso, pense em <strong>squads</strong>. Uma squad é uma unidade composta de 4 a 12 agentes, cada um com uma função estreita, conectados por um <a href="#">protocolo de comunicação</a>. A squad é o que entrega valor — não o agente individual.
            </p>

            <h3>Estrutura mínima de uma squad</h3>

            <ul>
              <li><strong>1 maestro</strong> — roteia tasks e mantém memory compartilhada</li>
              <li><strong>2-4 executores</strong> — cada um com uma especialidade (copy, code, design)</li>
              <li><strong>1 revisor</strong> — valida output antes de fechar o ciclo</li>
              <li><strong>1 reporter</strong> — gera relatório pro humano (você)</li>
            </ul>

            <p>
              Essa estrutura roda em qualquer Claude Code. Custo médio por squad rodando 8h/dia: <code>$1.20</code> em tokens. Um terço do que custa 1h de freelancer mid-level.
            </p>

            <h2>Movimento 2 — Orquestrador humano, não micro-manager</h2>

            <p>
              Seu papel muda. Você não <em>"acompanha"</em> tasks. Você <strong>desenha squads</strong>, define <strong>contratos</strong> e <strong>auditoria os outputs</strong>.
            </p>

            <pre><code>{`# fluxo típico de uma manhã
$ claude-code --squad=growth review yesterday
$ claude-code --squad=growth dispatch this-week
$ claude-code --squad=ops audit incidents`}</code></pre>

            <p>
              3 comandos. 20 minutos. Eu sei o que aconteceu, o que vai acontecer e o que está fora do trilho. Esse é o briefing matinal de quem opera 12 squads em paralelo.
            </p>

            <h2>Movimento 3 — Memory é o ativo</h2>

            <p>
              Agente individual não tem memória. Squad tem. E memory bem desenhada é o que separa um experimento bonito de uma operação séria.
            </p>

            <p>
              Eu uso 3 camadas: <strong>vetorial</strong> (semântica, longo prazo), <strong>episódica</strong> (curto prazo, sessão atual) e <strong>estrutural</strong> (regras imutáveis, contratos). Mais detalhes <a href="#">neste outro post</a>.
            </p>

            <hr/>

            <p>
              Esse modelo é o que ensino na <a href="#/mentoria">Mentoria · Turma 03</a>. Em 8 semanas você sai com uma squad rodando sua operação, não com um PDF.
            </p>
          </div>
        </div>
      </article>

      {/* ═══ INLINE CTA ═══ */}
      <section style={{ padding: isMobile ? '0 0 64px' : '0 0 96px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '0 20px' : '0 32px' }}>
          <div style={{ padding: isMobile ? 28 : 40, border: '1px solid rgba(255,58,14,0.30)', background: 'rgba(255,58,14,0.04)' }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>Gostou desse post?</p>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--fg)' }}>
              A mentoria abre em <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>15 de junho</em>.
            </h3>
            <p style={{ marginTop: 12, color: 'var(--fg-muted)', fontSize: 15, lineHeight: 1.55 }}>
              12 vagas presenciais em Floripa. Você sai com uma squad rodando sua operação.
            </p>
            <a href="#/mentoria" className="btn btn-primary" style={{ marginTop: 24 }}>
              Entrar na lista de espera <Icon name="arrow-right" size={12}/>
            </a>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* ═══ RELATED POSTS ═══ */}
      <section style={{ padding: isMobile ? '64px 0' : '96px 0' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto', padding: isMobile ? '0 20px' : '0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 32, flexDirection: isMobile ? 'column' : 'row', gap: 16 }}>
            <SectionHeader eyebrow="Continue lendo" title="Mais sobre" italic="squads."/>
            <a href="#/blog" className="btn btn-ghost" style={{ flexShrink: 0 }}>Ver todos <Icon name="arrow-right" size={12}/></a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 24 }}>
            {[
              { n: '04', cat: 'SQUADS', t: 'Memory architectures: 3 padrões testados.',     date: '21 MAR 2026', read: '14 min' },
              { n: '07', cat: 'SQUADS', t: 'Maestri, a regente das squads.',                 date: '28 FEV 2026', read: '11 min' },
              { n: '03', cat: 'OPS',    t: 'Por que abandonei n8n pra Claude Code.',         date: '28 MAR 2026', read: '12 min' },
            ].map(p => <PostCard key={p.n} p={{...p, d: ''}}/>)}
          </div>
        </div>
      </section>

      <Footer vp={vp} />
    </div>
  );
}

window.BlogPostPage = BlogPostPage;
