'use client'

const BENEFITS = [
  { label: 'Otimização de uso dos produtos', desc: 'Orientação técnica para extrair o máximo desempenho.' },
  { label: 'Redução de custos de manutenção', desc: 'Diagnóstico preventivo que evita gastos desnecessários.' },
  { label: 'Aumento de produtividade', desc: 'Processos mais eficientes com o suporte certo.' },
  { label: 'Atendimento personalizado', desc: 'Cada cliente recebe atenção específica para sua realidade.' },
]

export default function AdvisorySection() {
  return (
    <section id="assessoria" style={{ backgroundColor: '#ffffff', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>

      {/* Decorative background element */}
      <div style={{
        position: 'absolute', right: -120, top: '50%', transform: 'translateY(-50%)',
        width: 480, height: 480,
        borderRadius: '50%',
        border: '1px solid rgba(31,50,90,0.06)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: -60, top: '50%', transform: 'translateY(-50%)',
        width: 360, height: 360,
        borderRadius: '50%',
        border: '1px solid rgba(31,50,90,0.08)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'center' }}>

          {/* Left — visual panel */}
          <div>
            <div style={{
              backgroundColor: '#1F325A',
              padding: '56px 48px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Dot grid inside panel */}
              <div className="dot-grid" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: 64, height: 64,
                  backgroundColor: 'rgba(255,203,8,0.12)',
                  border: '1px solid rgba(255,203,8,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 32,
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFCB08" strokeWidth="1.5">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>

                <blockquote style={{
                  fontFamily: 'var(--font-barlow)', fontWeight: 800,
                  fontSize: 28, color: '#ffffff',
                  lineHeight: 1.25, marginBottom: 24,
                  letterSpacing: '-0.01em',
                }}>
                  "Mais do que fornecer produtos, entregamos suporte especializado para maximizar resultados."
                </blockquote>

                <div style={{ width: 48, height: 3, backgroundColor: '#FFCB08' }} />

                <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {['Diagnóstico técnico gratuito', 'Orientação de uso', 'Acompanhamento contínuo'].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 20, height: 20, backgroundColor: '#FFCB08', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#17233A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(255,255,255,0.8)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — content */}
          <div>
            <span style={{
              display: 'inline-block',
              fontFamily: 'var(--font-barlow)', fontWeight: 600,
              fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase',
              color: '#FFCB08', marginBottom: 16,
              paddingLeft: 20, borderLeft: '3px solid #FFCB08',
            }}>
              Assessoria Técnica
            </span>

            <h2 style={{
              fontFamily: 'var(--font-barlow)', fontWeight: 900,
              fontSize: 'clamp(32px, 3.5vw, 50px)',
              color: '#17233A', lineHeight: 1.05,
              letterSpacing: '-0.01em', marginBottom: 20, marginTop: 12,
            }}>
              Assessoria Técnica Especializada
            </h2>

            <p style={{
              fontFamily: 'var(--font-inter)', fontSize: 17, lineHeight: 1.75,
              color: '#4B5563', marginBottom: 40,
            }}>
              Clientes PENATEC contam com assessoria especializada para otimizar o uso de nossos
              produtos, economizar em manutenções e aprimorar sua produção. Nossa equipe técnica
              está preparada para ser seu parceiro estratégico.
            </p>

            {/* Benefits list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {BENEFITS.map((benefit, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex', gap: 20, alignItems: 'flex-start',
                    padding: '20px 0',
                    borderBottom: i < BENEFITS.length - 1 ? '1px solid #E8EBF0' : 'none',
                  }}
                >
                  <div style={{
                    width: 36, height: 36, backgroundColor: '#F4F6FA',
                    border: '1px solid #E8EBF0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    fontFamily: 'var(--font-barlow)', fontWeight: 900,
                    fontSize: 13, color: '#1F325A',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-barlow)', fontWeight: 700,
                      fontSize: 17, color: '#17233A', marginBottom: 4,
                    }}>
                      {benefit.label}
                    </div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#6B7280', lineHeight: 1.6 }}>
                      {benefit.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #assessoria > div > div { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 600px) {
          #assessoria { padding: 72px 0 !important; }
          #assessoria > div { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  )
}
