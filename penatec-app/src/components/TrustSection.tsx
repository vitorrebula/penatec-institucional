'use client'

const TRUST_ITEMS = [
  {
    value: '+50',
    unit: 'anos',
    label: 'de mercado',
    desc: 'Uma trajetória sólida e comprovada de excelência operacional.',
  },
  {
    value: '100%',
    unit: '',
    label: 'comprometimento',
    desc: 'Total dedicação ao sucesso e à satisfação de cada cliente.',
  },
  {
    value: '6',
    unit: 'dias',
    label: 'por semana',
    desc: 'Atendimento e assistência técnica sempre disponíveis.',
  },
  {
    value: '∞',
    unit: '',
    label: 'confiança',
    desc: 'Relações de longo prazo construídas sobre resultados concretos.',
  },
]

export default function TrustSection() {
  return (
    <section id="confianca" style={{ backgroundColor: '#0F1924', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>

      {/* Faint background text */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-barlow)', fontWeight: 900,
        fontSize: 'clamp(120px, 20vw, 280px)',
        color: 'rgba(255,255,255,0.015)',
        whiteSpace: 'nowrap', userSelect: 'none',
        letterSpacing: '-0.02em', lineHeight: 1,
        pointerEvents: 'none', zIndex: 0,
      }}>
        PENATEC
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            fontFamily: 'var(--font-barlow)', fontWeight: 600,
            fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase',
            color: '#FFCB08', marginBottom: 20,
          }}>
            <span style={{ display: 'inline-block', width: 32, height: 1, backgroundColor: '#FFCB08', opacity: 0.6 }} />
            Credibilidade &amp; Confiança
            <span style={{ display: 'inline-block', width: 32, height: 1, backgroundColor: '#FFCB08', opacity: 0.6 }} />
          </span>
          <h2 style={{
            fontFamily: 'var(--font-barlow)', fontWeight: 900,
            fontSize: 'clamp(36px, 4vw, 56px)',
            color: '#ffffff', lineHeight: 1.05,
            letterSpacing: '-0.01em',
          }}>
            Números que Traduzem Nossa História
          </h2>
          <p style={{
            fontFamily: 'var(--font-inter)', fontSize: 17, lineHeight: 1.7,
            color: 'rgba(255,255,255,0.5)',
            maxWidth: 560, margin: '20px auto 0',
          }}>
            Décadas de trabalho sério e comprometido, construindo confiança
            cliente a cliente, entrega a entrega.
          </p>
        </div>

        {/* Stats grid */}
        <div id="trust-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
        }}>
          {TRUST_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                padding: '48px 32px',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                textAlign: 'center',
                transition: 'background-color 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,203,8,0.04)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {/* Value */}
              <div style={{ marginBottom: 4 }}>
                <span style={{
                  fontFamily: 'var(--font-barlow)', fontWeight: 900,
                  fontSize: 'clamp(56px, 6vw, 80px)',
                  color: '#FFCB08', lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}>
                  {item.value}
                </span>
                {item.unit && (
                  <span style={{
                    fontFamily: 'var(--font-barlow)', fontWeight: 700,
                    fontSize: 24, color: 'rgba(255,203,8,0.6)',
                    marginLeft: 4,
                  }}>
                    {item.unit}
                  </span>
                )}
              </div>

              {/* Label */}
              <div style={{
                fontFamily: 'var(--font-barlow)', fontWeight: 700,
                fontSize: 15, color: 'rgba(255,255,255,0.8)',
                letterSpacing: '0.05em', textTransform: 'uppercase',
                marginBottom: 12,
              }}>
                {item.label}
              </div>

              {/* Divider */}
              <div style={{ width: 24, height: 2, backgroundColor: '#FFCB08', margin: '0 auto 16px', opacity: 0.5 }} />

              {/* Description */}
              <p style={{
                fontFamily: 'var(--font-inter)', fontSize: 13,
                color: 'rgba(255,255,255,0.4)', lineHeight: 1.65,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom seal */}
        <div style={{ textAlign: 'center', marginTop: 72 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 24,
            padding: '20px 40px',
            border: '1px solid rgba(255,203,8,0.2)',
          }}>
            <div style={{
              width: 56, height: 56,
              border: '2px solid #FFCB08',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: 'var(--font-barlow)', fontWeight: 900,
                fontSize: 12, color: '#FFCB08',
                textAlign: 'center', lineHeight: 1.2, letterSpacing: '0.02em',
              }}>
                +50<br/>ANOS
              </span>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 18, color: '#ffffff' }}>
                Empresa Certificada pela Experiência
              </div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
                Mais de cinco décadas de compromisso com qualidade e inovação
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #trust-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          #confianca { padding: 72px 0 !important; }
          #confianca > div { padding: 0 20px !important; }
          #trust-grid { grid-template-columns: 1fr !important; }
          #trust-grid > div { padding: 32px 20px !important; }
        }
      `}</style>
    </section>
  )
}
