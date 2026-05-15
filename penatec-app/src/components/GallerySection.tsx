'use client'

interface MockPhotoProps {
  variant: 'dark-blue' | 'graphite' | 'deep-navy' | 'steel' | 'warm-dark' | 'industrial'
  label: string
  category: string
  tall?: boolean
}

function MockPhoto({ variant, label, category, tall }: MockPhotoProps) {
  const palettes = {
    'dark-blue':  { bg: 'linear-gradient(135deg,#0a1628 0%,#1F325A 60%,#17233A 100%)', accent: '#FFCB08' },
    'graphite':   { bg: 'linear-gradient(135deg,#1a1a1a 0%,#2C2C2C 60%,#1a1a1a 100%)', accent: '#FFCB08' },
    'deep-navy':  { bg: 'linear-gradient(135deg,#0F1924 0%,#17233A 50%,#0a111c 100%)', accent: '#FFCB08' },
    'steel':      { bg: 'linear-gradient(135deg,#232b38 0%,#344155 60%,#232b38 100%)', accent: '#FFCB08' },
    'warm-dark':  { bg: 'linear-gradient(135deg,#1a1008 0%,#2a1a0a 50%,#17233A 100%)', accent: '#FFCB08' },
    'industrial': { bg: 'linear-gradient(160deg,#0d1520 0%,#1F325A 40%,#2a3a52 100%)', accent: '#FFCB08' },
  }
  const { bg, accent } = palettes[variant]

  return (
    <div style={{
      position: 'relative', width: '100%',
      height: tall ? '100%' : 240,
      overflow: 'hidden', cursor: 'pointer',
      transition: 'transform 0.3s',
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
    >
      {/* Background gradient */}
      <div style={{ position: 'absolute', inset: 0, background: bg }} />

      {/* Abstract industrial pattern */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.25 }}
        viewBox="0 0 300 200"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Central geometric form */}
        <rect x="80" y="40" width="140" height="120" rx="2" fill="none" stroke={accent} strokeWidth="0.8" />
        <rect x="100" y="60" width="100" height="80" rx="1" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.6" />
        {/* Corner marks */}
        <polyline points="80,40 64,40 64,56" fill="none" stroke={accent} strokeWidth="1" />
        <polyline points="220,40 236,40 236,56" fill="none" stroke={accent} strokeWidth="1" />
        <polyline points="80,160 64,160 64,144" fill="none" stroke={accent} strokeWidth="1" />
        <polyline points="220,160 236,160 236,144" fill="none" stroke={accent} strokeWidth="1" />
        {/* Center cross */}
        <line x1="120" y1="100" x2="180" y2="100" stroke={accent} strokeWidth="0.5" opacity="0.5" />
        <line x1="150" y1="70"  x2="150" y2="130" stroke={accent} strokeWidth="0.5" opacity="0.5" />
        <circle cx="150" cy="100" r="16" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.6" />
        <circle cx="150" cy="100" r="6"  fill={accent} opacity="0.3" />
        {/* Horizontal scan lines */}
        <line x1="0" y1="20"  x2="300" y2="20"  stroke={accent} strokeWidth="0.3" opacity="0.3" strokeDasharray="3 6" />
        <line x1="0" y1="180" x2="300" y2="180" stroke={accent} strokeWidth="0.3" opacity="0.3" strokeDasharray="3 6" />
      </svg>

      {/* Bottom gradient overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
      }} />

      {/* Content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px 18px' }}>
        <div style={{
          display: 'inline-block', marginBottom: 6,
          backgroundColor: accent, color: '#17233A',
          fontFamily: 'var(--font-barlow)', fontWeight: 700,
          fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
          padding: '3px 8px',
        }}>
          {category}
        </div>
        <div style={{
          fontFamily: 'var(--font-barlow)', fontWeight: 800,
          fontSize: 18, color: '#ffffff', lineHeight: 1.2,
        }}>
          {label}
        </div>
      </div>

      {/* Top-right "camera" icon mock */}
      <div style={{
        position: 'absolute', top: 14, right: 14,
        width: 28, height: 28, border: '1px solid rgba(255,203,8,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFCB08" strokeWidth="1.5" opacity="0.7">
          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
      </div>
    </div>
  )
}

export default function GallerySection() {
  return (
    <section id="galeria" style={{ backgroundColor: '#F4F6FA', padding: '120px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{
              display: 'inline-block',
              fontFamily: 'var(--font-barlow)', fontWeight: 600,
              fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase',
              color: '#FFCB08', marginBottom: 12, paddingLeft: 20, borderLeft: '3px solid #FFCB08',
            }}>
              Produtos &amp; Serviços
            </span>
            <h2 style={{
              fontFamily: 'var(--font-barlow)', fontWeight: 900,
              fontSize: 'clamp(32px, 3.5vw, 50px)',
              color: '#17233A', lineHeight: 1.05, marginTop: 10,
            }}>
              Nossa Linha de Atuação
            </h2>
          </div>
          <p style={{
            fontFamily: 'var(--font-inter)', fontSize: 15, lineHeight: 1.7,
            color: '#6B7280', maxWidth: 380,
          }}>
            Portfólio diversificado com soluções técnicas para atender a diferentes
            segmentos industriais com qualidade e confiança.
          </p>
        </div>

        {/* Bento grid */}
        <div className="gallery-bento" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto auto', gap: 3 }}>

          {/* Row 1 — tall left + 2 right */}
          <div style={{ gridRow: '1 / 3' }}>
            <MockPhoto variant="dark-blue" label="Equipamentos Industriais" category="Linha Principal" tall />
          </div>
          <div>
            <MockPhoto variant="graphite" label="Ferramentas Especializadas" category="Linha Técnica" />
          </div>
          <div>
            <MockPhoto variant="steel" label="Sistemas de Manutenção" category="Linha Premium" />
          </div>

          {/* Row 2 — 2 right continue */}
          <div>
            <MockPhoto variant="warm-dark" label="Peças e Componentes" category="Linha Industrial" />
          </div>
          <div>
            <MockPhoto variant="industrial" label="Soluções Personalizadas" category="Sob Demanda" />
          </div>
        </div>

        {/* Bottom row — 3 equal */}
        <div className="gallery-bento" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, marginTop: 3 }}>
          <MockPhoto variant="deep-navy" label="Assistência Técnica" category="Suporte On-site" />
          <MockPhoto variant="graphite" label="Consultoria Técnica" category="Assessoria" />
          <MockPhoto variant="dark-blue" label="Manutenção Preventiva" category="Serviços" />
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <button
            onClick={() => {
              const el = document.querySelector('#contato')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              backgroundColor: '#1F325A', color: '#ffffff',
              border: 'none', cursor: 'pointer',
              padding: '14px 40px', fontSize: 13, fontWeight: 800,
              fontFamily: 'var(--font-barlow)', letterSpacing: '0.08em', textTransform: 'uppercase',
              transition: 'background-color 0.2s, transform 0.2s',
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FFCB08'; e.currentTarget.style.color = '#17233A' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#1F325A'; e.currentTarget.style.color = '#ffffff' }}
          >
            Ver Portfólio Completo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .gallery-bento { grid-template-columns: 1fr 1fr !important; }
          .gallery-bento > div:first-child { grid-row: auto !important; }
        }
        @media (max-width: 600px) {
          #galeria { padding: 72px 0 !important; }
          #galeria > div { padding: 0 20px !important; }
          .gallery-bento { grid-template-columns: 1fr !important; }
          .gallery-bento > div > div { height: 220px !important; }
        }
      `}</style>
    </section>
  )
}
