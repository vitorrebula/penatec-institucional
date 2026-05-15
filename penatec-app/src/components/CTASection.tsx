'use client'

export default function CTASection() {
  const scrollToContact = () => {
    const el = document.querySelector('#contato')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section style={{ backgroundColor: '#FFCB08', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>

      {/* Subtle background shapes */}
      <div style={{
        position: 'absolute', right: -80, top: -80,
        width: 400, height: 400, borderRadius: '50%',
        backgroundColor: 'rgba(23,35,58,0.06)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', left: -40, bottom: -40,
        width: 240, height: 240, borderRadius: '50%',
        backgroundColor: 'rgba(23,35,58,0.04)',
        pointerEvents: 'none',
      }} />
      {/* Dot grid on gold */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(23,35,58,0.08) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          marginBottom: 24,
        }}>
          <div style={{ height: 1, width: 40, backgroundColor: '#17233A', opacity: 0.3 }} />
          <span style={{
            fontFamily: 'var(--font-barlow)', fontWeight: 700,
            fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase',
            color: '#17233A', opacity: 0.6,
          }}>
            Fale Conosco
          </span>
          <div style={{ height: 1, width: 40, backgroundColor: '#17233A', opacity: 0.3 }} />
        </div>

        <h2 style={{
          fontFamily: 'var(--font-barlow)', fontWeight: 900,
          fontSize: 'clamp(36px, 5vw, 64px)',
          color: '#17233A', lineHeight: 1.05,
          letterSpacing: '-0.02em', marginBottom: 24,
        }}>
          Sua empresa merece um parceiro com experiência, confiança e excelência.
        </h2>

        <p style={{
          fontFamily: 'var(--font-inter)', fontSize: 18, lineHeight: 1.7,
          color: 'rgba(23,35,58,0.72)',
          maxWidth: 640, margin: '0 auto 48px',
        }}>
          A PENATEC está pronta para oferecer soluções eficientes, suporte técnico
          especializado e atendimento profissional para impulsionar os resultados
          do seu negócio.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={scrollToContact}
            style={{
              backgroundColor: '#17233A', color: '#ffffff',
              border: 'none', cursor: 'pointer',
              padding: '16px 40px',
              fontSize: 14, fontWeight: 800,
              fontFamily: 'var(--font-barlow)',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              transition: 'transform 0.2s, background-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1F325A'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#17233A'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Entrar em Contato
          </button>
          <a
            href="tel:+5500000000000"
            style={{
              backgroundColor: 'transparent', color: '#17233A',
              border: '2px solid rgba(23,35,58,0.35)',
              cursor: 'pointer',
              padding: '14px 40px',
              fontSize: 14, fontWeight: 700,
              fontFamily: 'var(--font-barlow)',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 10,
              transition: 'border-color 0.2s, background-color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#17233A'; (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(23,35,58,0.08)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(23,35,58,0.35)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.9v2.02z"/>
            </svg>
            Solicitar Atendimento
          </a>
        </div>
      </div>
    </section>
  )
}
