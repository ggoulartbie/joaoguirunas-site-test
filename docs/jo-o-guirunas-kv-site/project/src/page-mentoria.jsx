/* global React */
/**
 * MentoriaPage — tier 1 conversion landing for Mentoria (R$8.700, 12 vagas).
 *
 * Sections:
 *  1. Sticky hero (full-bleed photo + manifesto + CTA + countdown)
 *  2. Problema (what's broken — 3 cards numbered)
 *  3. Solução (3 numbered feature cards)
 *  4. Programa (8 weeks timeline)
 *  5. Para quem é / Não é
 *  6. Investimento (pricing card)
 *  7. Depoimentos
 *  8. FAQ (accordion)
 *  9. Multi-step form (waitlist)
 *  10. Footer
 */
function MentoriaPage({ vp = 'desktop' }) {
  const isMobile = vp === 'mobile';
  const PAD = isMobile ? '0 20px' : '0 32px';
  const CONTAINER = { maxWidth: 1152, margin: '0 auto', padding: PAD };

  return (
    <div className="page-frame" style={{ width: '100%', minHeight: '100%', paddingTop: isMobile ? 56 : 64 }}>
      <Header vp={vp} active="/mentoria" />

      {/* ═══ HERO ═══ */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? 'auto' : 720 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'url(assets/mentoria-hero.png) center 30%/cover', opacity: 0.6 }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,5,7,0.95) 0%, rgba(5,5,7,0.75) 50%, rgba(5,5,7,0.4) 100%)' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, var(--void) 0%, rgba(5,5,7,0.3) 40%, transparent 80%)' }}/>

        <div style={{ ...CONTAINER, position: 'relative', paddingTop: isMobile ? 80 : 128, paddingBottom: isMobile ? 80 : 96 }}>
          <div style={{ maxWidth: 760 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.10)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ember)', fontWeight: 500, marginBottom: 32 }}>
              <span style={{ position: 'relative', width: 8, height: 8 }}>
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--ember)' }}/>
              </span>
              Turma 03 · Inscrições abertas
            </span>

            <h1 style={{
              margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: isMobile ? 'clamp(48px, 13vw, 64px)' : 'clamp(64px, 8vw, 104px)',
              lineHeight: 0.92, letterSpacing: '-0.03em', color: 'var(--fg)',
            }}>
              Não é mais um <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>curso</em>.<br/>
              É uma <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>operação</em>.
            </h1>

            <p style={{ marginTop: 32, fontSize: isMobile ? 17 : 20, lineHeight: 1.55, color: 'var(--fg-secondary)', maxWidth: 560 }}>
              8 semanas presenciais em Floripa. 12 vagas. Você chega operador médio e sai operando uma equipe de agentes IA em produção real.
            </p>

            <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap', flexDirection: isMobile ? 'column' : 'row' }}>
              <a href="#waitlist" className="btn btn-primary btn-lg">Lista de espera <Icon name="arrow-right" size={14}/></a>
              <a href="#programa" className="btn btn-ghost btn-lg">Ver programa</a>
            </div>

            {/* Inline meta */}
            <div style={{
              marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--border)',
              display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
              gap: isMobile ? 24 : 32,
            }}>
              {[
                ['INVESTIMENTO', 'R$8.700', 'à vista ou 12×'],
                ['VAGAS', '12', 'turma fechada'],
                ['INÍCIO', '15 jun', '2026'],
                ['LOCAL', 'Floripa', 'presencial'],
              ].map(([lbl, v, sub]) => (
                <div key={lbl}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>{lbl}</div>
                  <div style={{ marginTop: 6, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: isMobile ? 26 : 32, color: 'var(--fg)', lineHeight: 1 }}>{v}</div>
                  <div style={{ marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROBLEMA ═══ */}
      <section style={{ padding: isMobile ? '80px 0' : '128px 0', background: 'var(--bg-section)' }}>
        <div style={CONTAINER}>
          <div style={{ textAlign: 'center', marginBottom: 64, maxWidth: 720, margin: '0 auto 64px' }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>O Problema · Onde você tá agora</p>
            <h2 style={{
              margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: isMobile ? 36 : 'clamp(36px, 4.5vw, 56px)',
              lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--fg)',
            }}>
              Você consome conteúdo de IA<br/>
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>e não opera nada com IA.</em>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
            {[
              { n: '01', t: 'Cursos não viraram operação', d: 'Você fez 4 cursos de IA em 2025. Tem 16h de aula salva no Notion. Ainda copia e cola prompt no chat.' },
              { n: '02', t: 'Ferramenta nova toda semana', d: 'n8n, Make, Zapier, Lindy. Você tentou. Nenhuma resolve a operação ponta-a-ponta. Stack acumulou, resultado não.' },
              { n: '03', t: 'Custos só crescem', d: 'Seu time aumentou, sua margem caiu. Você sabe que IA poderia substituir 70% do trabalho repetitivo — mas não sabe por onde começar.' },
            ].map(c => (
              <div key={c.n} style={{ padding: 32, background: 'var(--bg)', position: 'relative' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 64, color: 'var(--ember)', lineHeight: 1, opacity: 0.4 }}>{c.n}</div>
                <h3 style={{ margin: '20px 0 12px', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 18, color: 'var(--fg)' }}>{c.t}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--fg-muted)' }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOLUÇÃO ═══ */}
      <section id="programa" style={{ padding: isMobile ? '80px 0' : '128px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -160, left: -160, width: 480, height: 480, borderRadius: '50%', background: 'rgba(255,58,14,0.05)', filter: 'blur(120px)', pointerEvents: 'none' }}/>
        <div style={{ ...CONTAINER, position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.10)', padding: '6px 14px', marginBottom: 24, fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ember)' }}>
              Solução · 3 movimentos
            </span>
            <h2 style={{
              margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: isMobile ? 32 : 'clamp(32px, 4vw, 48px)',
              lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--fg)', maxWidth: 720, marginLeft: 'auto', marginRight: 'auto',
            }}>
              Imagine uma equipe de especialistas<br/>
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>trabalhando para você 24/7</em>.
            </h2>
            <div className="accent-line" style={{ margin: '24px auto 0' }}/>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 24 }}>
            {[
              { n: '01', icon: 'briefcase', t: 'Delegação Inteligente', d: 'Delegar tarefas complexas para agentes que nunca dormem, nunca erram contexto e custam uma fração de um funcionário.' },
              { n: '02', icon: 'users',     t: 'Sua Equipe Completa',  d: 'Ter um dev sênior, um QA, um designer, um copywriter — tudo rodando na sua máquina, integrado aos seus projetos.' },
              { n: '03', icon: 'rocket',    t: 'Escala Sem Contratar', d: 'Criar 10 posts de LinkedIn, 5 apresentações e revisar 20 PRs em uma tarde. Sem contratar.' },
            ].map(c => (
              <div key={c.n} style={{
                position: 'relative', overflow: 'hidden',
                border: '1px solid var(--border-strong)', background: 'rgba(255,255,255,0.03)',
                padding: '32px 28px', minHeight: 280,
              }}>
                <span style={{ position: 'absolute', top: 22, right: 22, fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--fg-faint)', textTransform: 'uppercase', letterSpacing: '0.16em' }}>{c.n}</span>
                <div style={{ color: 'rgba(255,58,14,0.85)', marginBottom: 22 }}>
                  <Icon name={c.icon} size={36} stroke={1.5}/>
                </div>
                <h4 style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 700, color: 'var(--fg)' }}>{c.t}</h4>
                <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.6, color: 'var(--fg-muted)' }}>{c.d}</p>
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, background: 'var(--ember)', transform: 'scaleX(0.4)', transformOrigin: 'left' }}/>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: 80, fontFamily: 'var(--font-sans)', fontSize: isMobile ? 18 : 22, fontWeight: 600, color: 'var(--fg)' }}>
            Isso não é ficção científica.<br/>
            <span style={{ color: 'var(--fg-muted)', fontWeight: 400 }}>É o que você vai <span style={{ color: 'var(--ember)' }}>construir nesta mentoria</span>.</span>
          </p>
        </div>
      </section>

      <hr className="hairline" />

      {/* ═══ PROGRAMA / TIMELINE ═══ */}
      <section style={{ padding: isMobile ? '80px 0' : '128px 0' }}>
        <div style={CONTAINER}>
          <div style={{ marginBottom: 64, maxWidth: 720 }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>Programa · 8 semanas</p>
            <h2 style={{
              margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: isMobile ? 36 : 'clamp(36px, 4.5vw, 56px)',
              lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--fg)',
            }}>
              Da primeira squad ao <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>Demo Day</em>.
            </h2>
            <div className="accent-line" style={{ marginTop: 24 }}/>
            <p className="lead" style={{ marginTop: 24 }}>8 encontros presenciais. 2h cada. Saída garantida com uma operação rodando.</p>
          </div>

          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { n: '01', date: '15 JUN', t: 'Diagnóstico + Mapeamento', d: 'Mapeamos sua operação atual. Identificamos os 5 processos mais delegáveis. Você sai com a stack-alvo definida.' },
              { n: '02', date: '22 JUN', t: 'Setup Claude Code', d: 'Configuração avançada do CLI. Workflows, slash commands, /skill, memory. Tudo na sua máquina, não em SaaS.' },
              { n: '03', date: '29 JUN', t: 'Sua primeira Squad', d: 'Configuramos 4 agentes-base com persona, skills e contexto do seu negócio. Você operando agentes na semana 3.' },
              { n: '04', date: '06 JUL', t: 'Integrações reais', d: 'Conexão com seus dados: planilhas, CRM, banco, GitHub. Os agentes saem do brinquedo e entram na operação.' },
              { n: '05', date: '13 JUL', t: 'Squad de Growth', d: 'Mídia paga, conteúdo, e-mail. Squad dedicada a aquisição rodando ao final do encontro.' },
              { n: '06', date: '20 JUL', t: 'Squad de Operação', d: 'Atendimento, ops, processos internos. Você cobre o ciclo completo, não só marketing.' },
              { n: '07', date: '27 JUL', t: 'Maestri · Inter-agentes', d: 'Como conectar squads diferentes. Comunicação cross-terminal. Aqui você vira regente.' },
              { n: '08', date: '03 AGO', t: 'Demo Day', d: 'Você apresenta sua operação para os 11 outros alunos. Saída garantida com uma squad em produção.' },
            ].map((w, i, arr) => (
              <li key={w.n} style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '60px 1fr' : '100px 140px 1fr',
                gap: isMobile ? 16 : 24,
                padding: '28px 0',
                borderTop: '1px solid var(--border)',
                borderBottom: i === arr.length - 1 ? '1px solid var(--border)' : 'none',
                alignItems: 'baseline',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ember)', fontWeight: 500 }}>
                  Semana {w.n}
                </span>
                {!isMobile && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>{w.date}</span>}
                <div style={{ gridColumn: isMobile ? 'span 2' : 'auto' }}>
                  <h4 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: isMobile ? 24 : 28, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--fg)' }}>{w.t}</h4>
                  <p style={{ margin: '8px 0 0', fontSize: 15, lineHeight: 1.55, color: 'var(--fg-muted)', maxWidth: 600 }}>{w.d}</p>
                  {isMobile && <p style={{ margin: '8px 0 0', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>{w.date}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ PARA QUEM É / NÃO É ═══ */}
      <section style={{ padding: isMobile ? '80px 0' : '128px 0', background: 'var(--bg-section)' }}>
        <div style={CONTAINER}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
            <div style={{ padding: isMobile ? 32 : 48, background: 'var(--bg)' }}>
              <p className="eyebrow" style={{ marginBottom: 20 }}>Pra quem é</p>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 32, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--fg)' }}>
                Operador com <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>contexto real</em>.
              </h3>
              <ul style={{ marginTop: 32, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  'CEO, founder ou C-level com operação rodando',
                  'Faturamento R$1M+ por ano',
                  'Equipe técnica suficiente pra rodar Claude Code local',
                  'Disponibilidade pra estar presencial em Floripa, 8 quartas',
                  'Quer parar de consumir conteúdo e começar a operar',
                ].map(l => (
                  <li key={l} style={{ display: 'flex', alignItems: 'start', gap: 12, fontSize: 15, color: 'var(--fg-secondary)' }}>
                    <span style={{ color: 'var(--ember)', flexShrink: 0, marginTop: 4 }}><Icon name="check" size={16} stroke={2.5}/></span>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ padding: isMobile ? 32 : 48, background: 'var(--bg)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--fg-faint)', fontWeight: 500, marginBottom: 20, marginTop: 0 }}>Pra quem não é</p>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 32, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--fg-muted)' }}>
                Curioso de IA sem skin in the game.
              </h3>
              <ul style={{ marginTop: 32, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  'Quem nunca rodou um terminal',
                  'Quem ainda valida ideia de negócio',
                  'Quem busca template pronto pra revender',
                  'Quem espera que IA "faça por você"',
                  'Quem não pode estar em Floripa nas 8 quartas',
                ].map(l => (
                  <li key={l} style={{ display: 'flex', alignItems: 'start', gap: 12, fontSize: 15, color: 'var(--fg-muted)' }}>
                    <span style={{ color: 'var(--fg-faint)', flexShrink: 0, marginTop: 4 }}><Icon name="close" size={16} stroke={2}/></span>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INVESTIMENTO ═══ */}
      <section style={{ padding: isMobile ? '80px 0' : '128px 0' }}>
        <div style={CONTAINER}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 16 }}>Investimento</p>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: isMobile ? 36 : 'clamp(36px, 4.5vw, 56px)', lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--fg)' }}>
                R$8.700 hoje,<br/>
                <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>pay-back em 60 dias</em>.
              </h2>
              <div className="accent-line" style={{ marginTop: 24 }}/>
              <p className="lead" style={{ marginTop: 24 }}>
                A turma 02 reportou em média R$22k/mês de custo de freelancer cortado nos 90 dias seguintes ao Demo Day.
              </p>
            </div>

            <div style={{
              border: '2px solid var(--ember)', padding: isMobile ? 28 : 40,
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(255,58,14,0.04) 0%, transparent 100%)',
            }}>
              <div style={{ position: 'absolute', top: -1, right: -1, padding: '6px 12px', background: 'var(--ember)', color: 'var(--void)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
                Turma 03
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>Mentoria · Presencial</div>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: isMobile ? 56 : 72, color: 'var(--fg)', lineHeight: 1 }}>R$8.700</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)' }}>à vista</span>
              </div>
              <p style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', color: 'var(--fg-muted)' }}>
                ou 12× R$845 sem juros
              </p>

              <ul style={{ marginTop: 32, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
                {[
                  '8 encontros presenciais (16h)',
                  'Squad configurada com seu negócio',
                  'Acesso vitalício 41+ recursos open source',
                  'Grupo WhatsApp permanente da turma',
                  'Demo Day final com case próprio',
                ].map(l => (
                  <li key={l} style={{ display: 'flex', alignItems: 'start', gap: 10, fontSize: 14, color: 'var(--fg-secondary)' }}>
                    <span style={{ color: 'var(--ember)', flexShrink: 0, marginTop: 3 }}><Icon name="check" size={14} stroke={2.5}/></span>
                    {l}
                  </li>
                ))}
              </ul>

              <a href="#waitlist" className="btn btn-primary btn-lg" style={{ marginTop: 32, width: '100%' }}>
                Entrar na lista de espera <Icon name="arrow-right" size={14}/>
              </a>
              <p style={{ marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)', textAlign: 'center' }}>
                Sem cobrança · Garantia de 7 dias após início
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* ═══ DEPOIMENTOS ═══ */}
      <section style={{ padding: isMobile ? '80px 0' : '128px 0' }}>
        <div style={CONTAINER}>
          <div style={{ marginBottom: 48 }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>Turmas anteriores · Verbatim</p>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: isMobile ? 32 : 'clamp(32px, 4vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--fg)' }}>
              O que <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>23 operadores</em> falaram.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 24 }}>
            {[
              { q: 'Cortei R$22k/mês de freelancer substituindo com squad própria configurada na mentoria. Pay-back foi em 28 dias.', n: 'Marina Aoki', r: 'Founder · Maestri · T01' },
              { q: 'O João não vende framework. Ele entrega uma squad rodando na minha máquina na semana 4. Levei mais resultado em 2 meses do que em 1 ano de consultoria.', n: 'Carlos Mendes', r: 'CEO · Synkra · T02' },
              { q: 'A operação de growth da minha empresa virou squad em 6 semanas. Hoje rodo Meta + Google + conteúdo com 1 pessoa orquestrando 14 agentes.', n: 'Rafael Grandi', r: 'CMO · Xquads · T02' },
            ].map(t => (
              <figure key={t.n} style={{ margin: 0, padding: 32, border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                <Icon name="info" size={20} style={{ color: 'var(--ember)', marginBottom: 16, transform: 'rotate(180deg) scaleX(-1)' }}/>
                <blockquote style={{ margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 18, lineHeight: 1.4, letterSpacing: '-0.01em', color: 'var(--fg)' }}>
                  "{t.q}"
                </blockquote>
                <figcaption style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-card-raised)', border: '1px solid var(--border)', flexShrink: 0 }}/>
                  <div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg)', fontWeight: 500 }}>{t.n}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)', marginTop: 2 }}>{t.r}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ padding: isMobile ? '80px 0' : '128px 0', background: 'var(--bg-section)' }}>
        <div style={{ ...CONTAINER, maxWidth: 800 }}>
          <div style={{ marginBottom: 48 }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>FAQ · Direto</p>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: isMobile ? 32 : 'clamp(32px, 4vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--fg)' }}>
              Perguntas <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>que valem perguntar</em>.
            </h2>
          </div>

          <div>
            {[
              { q: 'Não sei programar. Vou conseguir acompanhar?', a: 'Conseguir, sim. Mas precisa estar disposto a usar terminal. Não é mágica — você executa comandos. A mentoria foca em lógica de operação, não em sintaxe.', open: true },
              { q: 'Por que presencial em Floripa? Não pode ser remoto?', a: 'Porque presencial vira execução, remoto vira conteúdo. As 8 quartas em Floripa são o que separa essa mentoria do curso async. Se você não pode ir, o curso online é a alternativa.' },
              { q: 'Posso parcelar em mais vezes?', a: '12× no cartão sem juros. Acima disso, conversamos no formulário — a gente avalia case a case.' },
              { q: 'Tem garantia?', a: 'Sim. Se você não estiver satisfeito até 7 dias após o primeiro encontro, devolvemos 100% do valor sem perguntas.' },
              { q: 'E se eu não puder ir num dos encontros?', a: 'Todas as sessões são gravadas e disponibilizadas. Mas se você pretende perder mais de 2 dos 8 encontros, esta mentoria não é pra você.' },
              { q: 'Quem é o João? Por que confiar?', a: 'CEO da GrowthSales.ai. 12 anos operando agências de growth. Hoje opera uma equipe de 96 agentes IA gerando R$2M+/ano com 1 pessoa orquestrando.' },
            ].map((f, i) => (
              <FAQItem key={i} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WAITLIST FORM ═══ */}
      <section id="waitlist" style={{ padding: isMobile ? '80px 0' : '128px 0' }}>
        <div style={{ ...CONTAINER, maxWidth: 720 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>Lista de espera · Turma 03</p>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: isMobile ? 36 : 'clamp(36px, 5vw, 64px)', lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--fg)' }}>
              12 vagas. <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>3 já preenchidas</em>.
            </h2>
            <p className="lead" style={{ marginTop: 24, marginLeft: 'auto', marginRight: 'auto' }}>
              Conversamos com cada candidato antes da matrícula. Preencha o formulário — entramos em contato em até 48h.
            </p>
          </div>

          {/* Step indicator */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
            {['Identificação', 'Contexto', 'Confirmação'].map((s, i) => (
              <div key={s} style={{ flex: 1 }}>
                <div style={{ height: 2, background: i === 0 ? 'var(--ember)' : 'var(--border)' }}/>
                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: i === 0 ? 'var(--ember)' : 'var(--fg-faint)' }}>{String(i+1).padStart(2,'0')}</span>
                  {!isMobile && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', color: i === 0 ? 'var(--fg)' : 'var(--fg-faint)' }}>{s}</span>}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={(e)=>e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20 }}>
              <div>
                <label className="field-label">Nome completo</label>
                <input className="field" placeholder="João da Silva" defaultValue="" />
              </div>
              <div>
                <label className="field-label">Email corporativo</label>
                <input className="field" type="email" placeholder="voce@empresa.com" defaultValue="" />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20 }}>
              <div>
                <label className="field-label">Empresa</label>
                <input className="field" placeholder="GrowthSales.ai" />
              </div>
              <div>
                <label className="field-label">Cargo</label>
                <input className="field" placeholder="CEO" />
              </div>
            </div>
            <div>
              <label className="field-label">WhatsApp</label>
              <input className="field" placeholder="+55 48 9 9999-9999" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, flexDirection: isMobile ? 'column-reverse' : 'row', gap: 16 }}>
              <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>
                Etapa 1 de 3
              </p>
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: isMobile ? '100%' : 'auto' }}>
                Próxima etapa <Icon name="arrow-right" size={14}/>
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer vp={vp} />
    </div>
  );
}

/* FAQItem — accordion entry */
function FAQItem({ q, a, open: defaultOpen }) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return (
    <div style={{ borderTop: '1px solid var(--border)' }}>
      <button
        onClick={()=>setOpen(!open)}
        style={{
          width: '100%', background: 'transparent', border: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, padding: '24px 0', textAlign: 'left',
          fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 500, color: 'var(--fg)',
          cursor: 'pointer',
        }}
      >
        <span>{q}</span>
        <span style={{ color: 'var(--ember)', flexShrink: 0, transform: open ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 200ms' }}>
          <Icon name="plus" size={18} />
        </span>
      </button>
      {open && (
        <div style={{ paddingBottom: 24, color: 'var(--fg-muted)', fontSize: 15, lineHeight: 1.6, maxWidth: 640 }}>
          {a}
        </div>
      )}
    </div>
  );
}

window.MentoriaPage = MentoriaPage;
window.FAQItem = FAQItem;
