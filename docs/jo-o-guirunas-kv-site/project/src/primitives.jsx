/* global React */
/**
 * Primitives — shared building blocks used by every page.
 * Each component accepts a `vp` prop ('mobile' | 'desktop') for layout decisions.
 *
 * Exports to window:
 *   - Logo, LogoSymbol
 *   - Icon (AIOX icon system)
 *   - Header, Footer
 *   - Eyebrow, AccentLine, SectionHeader
 *   - PrimaryBtn, GhostBtn, EmberOutlineBtn
 *   - Field, Textarea
 */

/* ─────────────────────────────────────────────────────────────
   Logo
   ───────────────────────────────────────────────────────────── */
function LogoSymbol({ size = 28, color = '#FF3A0E' }) {
  return (
    <svg width={size} height={size * (390/450)} viewBox="0 0 450 390" fill={color} aria-hidden="true">
      <path d="M394.945 344H52L223.473 47L394.945 344ZM135 302H311L223 149L135 302Z"/>
      <path d="M353.151 320.5H25.8L189.473 36.999L353.151 320.5Z" fill="none" stroke={color} strokeWidth="9"/>
    </svg>
  );
}

function Logo({ height = 22 }) {
  return <img src="assets/logo-alltype.svg" alt="João Guirunas" style={{ height, display: 'block' }} />;
}

/* ─────────────────────────────────────────────────────────────
   Icon — AIOX system, 24×24 viewBox, 2px stroke, currentColor
   ───────────────────────────────────────────────────────────── */
const ICON_PATHS = {
  'arrow-right':   <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  'arrow-up-right':<><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></>,
  'chevron-down':  <polyline points="6 9 12 15 18 9"/>,
  'chevron-right': <polyline points="9 18 15 12 9 6"/>,
  'check':         <polyline points="20 6 9 17 4 12"/>,
  'close':         <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  'plus':          <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
  'minus':         <line x1="5" y1="12" x2="19" y2="12"/>,
  'menu':          <><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></>,
  'search':        <><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
  'target':        <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
  'laptop':        <><rect x="3" y="4" width="18" height="12" rx="1"/><line x1="2" y1="20" x2="22" y2="20"/></>,
  'wrench':        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>,
  'zap':           <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
  'trophy':        <><line x1="6" y1="9" x2="6" y2="2"/><line x1="18" y1="9" x2="18" y2="2"/><line x1="6" y1="9" x2="18" y2="9"/><path d="M6 9c0 2.5 2 4.5 4 5v3h4v-3c2-.5 4-2.5 4-5"/><path d="M6 5H4a2 2 0 0 0 0 4h2"/><path d="M18 5h2a2 2 0 0 1 0 4h-2"/><line x1="9" y1="22" x2="15" y2="22"/></>,
  'brain':         <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z"/>,
  'users':         <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
  'briefcase':     <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
  'rocket':        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0 M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>,
  'megaphone':     <><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></>,
  'lock':          <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
  'mail':          <><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2 7 12 13 22 7"/></>,
  'phone':         <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
  'map-pin':       <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
  'github':        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>,
  'linkedin':      <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
  'twitter':       <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753c-.002-.249 1.51-2.772 1.818-4.013z"/>,
  'instagram':     <><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37a4 4 0 1 1-7.914 1.173 4 4 0 0 1 7.914-1.173z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>,
  'alert-triangle':<><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
  'info':          <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
  'plug':          <><path d="M9 2v6"/><path d="M15 2v6"/><path d="M6 8h12v4a6 6 0 0 1-12 0V8z"/><path d="M12 18v4"/></>,
  'code':          <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
  'cube':          <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
  'play':          <polygon points="5 3 19 12 5 21 5 3"/>,
  'calendar':      <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  'star':          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
  'clock':         <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  'book':          <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
  'layers':        <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
  'grid':          <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
  'send':          <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
  'loader':        <><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></>,
  'terminal':      <><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></>,
  'database':      <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
};

function Icon({ name, size = 20, stroke = 2, style }) {
  const path = ICON_PATHS[name];
  if (!path) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }}
      aria-hidden="true"
    >{path}</svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Header — fixed top nav; collapses to hamburger on mobile
   ───────────────────────────────────────────────────────────── */
function Header({ vp = 'desktop', active = '/' }) {
  const isMobile = vp === 'mobile';
  const NAV = [
    { href: '/sobre', label: 'Sobre' },
    { href: '/open-source', label: 'Open-source' },
    { href: '/blog', label: 'Blog' },
    { href: '/curso-online', label: 'Curso' },
    { href: '/mentoria', label: 'Mentoria' },
  ];

  return (
    <header style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
      borderBottom: '1px solid var(--border)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      background: 'linear-gradient(180deg, rgba(8,8,14,0.98), rgba(4,4,8,0.95))',
    }}>
      <div style={{
        maxWidth: 1152, margin: '0 auto',
        padding: isMobile ? '0 20px' : '0 32px',
        height: isMobile ? 56 : 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <span style={{
            width: 28, height: 28, borderRadius: '50%', overflow: 'hidden',
            boxShadow: '0 0 0 2px var(--ember)', flexShrink: 0,
          }}>
            <img src="assets/joao-profile.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
          </span>
          <Logo height={isMobile ? 18 : 20} />
        </a>

        {!isMobile && (
          <>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {NAV.map(({ href, label }) => (
                <a key={href} href={"#" + href} style={{
                  padding: '8px 12px',
                  fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
                  textTransform: 'uppercase', letterSpacing: '0.16em',
                  color: active === href ? 'var(--ember)' : 'rgba(255,255,255,0.55)',
                  textDecoration: 'none',
                  transition: 'color 150ms ease',
                }}>{label}</a>
              ))}
            </nav>
            <a href="#/mentoria" className="btn btn-primary btn-sm" style={{ height: 36, padding: '0 16px' }}>
              Lista de espera <Icon name="arrow-right" size={12} />
            </a>
          </>
        )}

        {isMobile && (
          <button aria-label="Abrir menu" style={{
            width: 40, height: 40, background: 'transparent', border: 0,
            color: 'var(--fg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="menu" size={22} />
          </button>
        )}
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────
   Footer — 4-col desktop, stacked on mobile
   ───────────────────────────────────────────────────────────── */
function Footer({ vp = 'desktop' }) {
  const isMobile = vp === 'mobile';
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--ink)',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: 1152, margin: '0 auto',
        padding: isMobile ? '56px 20px 32px' : '72px 32px 32px',
      }}>
        {/* Newsletter strip */}
        <div style={{
          paddingBottom: 48, marginBottom: 48,
          borderBottom: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: 40, alignItems: 'end',
        }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: 16 }}>Newsletter · Sem ruído</p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: isMobile ? 26 : 34, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--fg)', margin: 0 }}>
              O que <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>funciona</em>, na sua caixa.
            </h3>
            <p style={{ marginTop: 12, color: 'var(--fg-muted)', fontSize: 14, lineHeight: 1.55, maxWidth: 480 }}>
              Drops práticos sobre Claude Code, squads, automação e growth. Direto ao ponto, sem teaser.
            </p>
          </div>
          <form onSubmit={(e)=>e.preventDefault()} style={{ display: 'flex', gap: 8, flexDirection: isMobile ? 'column' : 'row' }}>
            <input type="email" placeholder="seu@email.com" className="field" style={{ flex: 1 }} />
            <button type="submit" className="btn btn-primary">Inscrever <Icon name="arrow-right" size={12} /></button>
          </form>
        </div>

        {/* Link columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : '2fr 1fr 1fr 1fr',
          gap: isMobile ? 32 : 40,
        }}>
          <div style={{ gridColumn: isMobile ? 'span 2' : 'span 1' }}>
            <a href="#/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <LogoSymbol size={26} />
              <Logo height={26} />
            </a>
            <p style={{ marginTop: 18, maxWidth: 360, fontSize: 14, lineHeight: 1.6, color: 'var(--fg-muted)' }}>
              CEO da GrowthSales.ai. Uso IA em negócios reais — automação, growth e sistemas que escalam.
            </p>
            <div style={{
              marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
              padding: '6px 12px',
            }}>
              <img src="assets/claude-logo.png" alt="" style={{ width: 16, height: 16 }} />
              <img src="assets/claude-code-logo.png" alt="" style={{ height: 14 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', color: 'var(--fg-muted)' }}>BUILT FOR CLAUDE CODE</span>
            </div>
          </div>

          {[
            { title: 'Surfaces', links: ['Open Source', 'Mentoria', 'Curso Online', 'Framework AIOX', 'Monitor'] },
            { title: 'Aprender',  links: ['Setup Claude Code', 'Cursos Anthropic', 'Meta Ads com IA', 'Squad Manual', 'Blog'] },
            { title: 'Contato',   links: ['LinkedIn', 'GitHub', 'Twitter / X', 'Instagram', 'Fale comigo →'] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--fg-faint)', marginBottom: 18, fontWeight: 500 }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map(l => (
                  <li key={l}><a href="#" style={{ color: 'var(--fg-secondary)', textDecoration: 'none', fontSize: 14, transition: 'color 150ms' }}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{
          marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 16, flexWrap: 'wrap',
          flexDirection: isMobile ? 'column-reverse' : 'row',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em', color: 'var(--fg-faint)', margin: 0 }}>
            © 2026 João Guirunas · Florianópolis, BR · Todos os direitos reservados
          </p>
          <div style={{ display: 'flex', gap: 18, color: 'var(--fg-muted)' }}>
            <a href="#" aria-label="GitHub"   style={{ color: 'inherit' }}><Icon name="github" size={18} stroke={1.5} /></a>
            <a href="#" aria-label="LinkedIn" style={{ color: 'inherit' }}><Icon name="linkedin" size={18} stroke={1.5} /></a>
            <a href="#" aria-label="Twitter"  style={{ color: 'inherit' }}><Icon name="twitter" size={18} stroke={1.5} /></a>
            <a href="#" aria-label="Instagram"style={{ color: 'inherit' }}><Icon name="instagram" size={18} stroke={1.5} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section header pattern — eyebrow → H2 → accent-line → lead
   ───────────────────────────────────────────────────────────── */
function SectionHeader({ eyebrow, title, italic, lead, align = 'left', children }) {
  return (
    <div style={{ textAlign: align, maxWidth: align === 'center' ? 720 : 'none', marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }}>
      {eyebrow && <p className="eyebrow" style={{ margin: 0, marginBottom: 16 }}>{eyebrow}</p>}
      <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(32px, 4.2vw, 56px)', lineHeight: 0.98, letterSpacing: '-0.03em', color: 'var(--fg)' }}>
        {title}{italic && <> <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>{italic}</em></>}
      </h2>
      <div className="accent-line" style={{ marginTop: 24, marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }} />
      {lead && <p className="lead" style={{ marginTop: 24, marginBottom: 0, marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }}>{lead}</p>}
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Floating CTA — shows after scroll on Home / Mentoria
   (Static visual in design; not actually attached to scroll)
   ───────────────────────────────────────────────────────────── */
function FloatingCta({ vp = 'desktop' }) {
  if (vp === 'mobile') {
    return (
      <div style={{
        position: 'absolute', bottom: 16, left: 16, right: 16, zIndex: 40,
        background: 'var(--ink)', border: '1px solid var(--border-strong)',
        padding: '12px 14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ember)' }}>12 vagas · Floripa</p>
          <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Mentoria · Início 15/06</p>
        </div>
        <a href="#/mentoria" className="btn btn-primary btn-sm">Entrar</a>
      </div>
    );
  }
  return (
    <div style={{
      position: 'absolute', bottom: 24, right: 24, zIndex: 40,
      background: 'var(--ink)', border: '1px solid var(--border-strong)',
      padding: '16px 18px', maxWidth: 320,
      boxShadow: '0 0 40px rgba(0,0,0,0.5)',
    }}>
      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ember)' }}>
          <span style={{ position: 'relative', width: 8, height: 8 }}>
            <span className="dot" style={{ position: 'absolute', inset: 0 }} />
          </span>
          12 vagas · Floripa
        </span>
        <button aria-label="Fechar" style={{ background: 'transparent', border: 0, color: 'var(--fg-faint)', padding: 0, lineHeight: 0 }}>
          <Icon name="close" size={14} />
        </button>
      </div>
      <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 22, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--fg)' }}>
        Mentoria abre <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--ember)' }}>15 de junho</em>
      </p>
      <a href="#/mentoria" className="btn btn-primary btn-sm" style={{ marginTop: 14, width: '100%' }}>
        Entrar na lista <Icon name="arrow-right" size={12} />
      </a>
    </div>
  );
}

/* expose globals */
Object.assign(window, {
  Logo, LogoSymbol, Icon,
  Header, Footer,
  SectionHeader, FloatingCta,
});
