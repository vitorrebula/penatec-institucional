'use client'

const TIMELINE = [
  { year: '1970s', title: 'Fundação', desc: 'Início das operações com foco em qualidade e confiança no mercado regional.' },
  { year: '1990s', title: 'Expansão', desc: 'Crescimento das operações e ampliação do portfólio de produtos e serviços.' },
  { year: '2000s', title: 'Inovação', desc: 'Investimentos em tecnologia e atendimento técnico especializado.' },
  { year: 'Hoje', title: 'Referência', desc: 'Consolidada como referência em qualidade, assistência técnica e atendimento diferenciado.' },
]

const NUMBERS = [
  { value: '+50', label: 'Anos de mercado', dark: true },
  { value: '100%', label: 'Foco no cliente', dark: false },
  { value: '6d/sem', label: 'Assistência ativa', dark: false },
]

/* Mock industrial photo — simulates a factory environment */
function IndustrialPhotoMock({ label }: { label: string }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Base gradient — dark industrial palette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #0a111c 0%, #17233A 30%, #1F325A 60%, #0F1924 100%)',
      }} />

      {/* Abstract industrial structure SVG */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Factory floor lines */}
        <line x1="0" y1="420" x2="400" y2="420" stroke="rgba(255,203,8,0.2)" strokeWidth="1" />
        {/* Vertical columns */}
        <rect x="40" y="100" width="12" height="320" fill="rgba(255,203,8,0.08)" />
        <rect x="180" y="80" width="14" height="340" fill="rgba(255,203,8,0.1)" />
        <rect x="348" y="120" width="12" height="300" fill="rgba(255,203,8,0.07)" />
        {/* Horizontal beams */}
        <rect x="40" y="100" width="320" height="8" fill="rgba(255,203,8,0.12)" />
        <rect x="40" y="220" width="320" height="6" fill="rgba(255,203,8,0.07)" />
        {/* Diagonal brace */}
        <line x1="40" y1="108" x2="180" y2="220" stroke="rgba(255,203,8,0.1)" strokeWidth="2" />
        <line x1="180" y1="108" x2="360" y2="220" stroke="rgba(255,203,8,0.1)" strokeWidth="2" />
        {/* Machine silhouette */}
        <rect x="80" y="280" width="100" height="140" rx="2" fill="rgba(31,50,90,0.6)" stroke="rgba(255,203,8,0.15)" strokeWidth="1" />
        <rect x="95" y="295" width="70" height="50" rx="1" fill="rgba(255,203,8,0.08)" />
        <circle cx="130" cy="370" r="25" fill="none" stroke="rgba(255,203,8,0.2)" strokeWidth="2" />
        <circle cx="130" cy="370" r="12" fill="rgba(255,203,8,0.1)" />
        {/* Second machine */}
        <rect x="220" y="300" width="120" height="120" rx="2" fill="rgba(31,50,90,0.5)" stroke="rgba(255,203,8,0.12)" strokeWidth="1" />
        <rect x="235" y="315" width="90" height="40" fill="rgba(255,203,8,0.06)" />
        <rect x="250" y="368" width="60" height="8" fill="rgba(255,203,8,0.15)" />
        <rect x="250" y="385" width="60" height="8" fill="rgba(255,203,8,0.1)" />
        {/* Ceiling pipe */}
        <rect x="0" y="55" width="400" height="18" fill="rgba(255,203,8,0.06)" />
        <circle cx="70" cy="64" r="10" fill="none" stroke="rgba(255,203,8,0.2)" strokeWidth="2" />
        <circle cx="200" cy="64" r="10" fill="none" stroke="rgba(255,203,8,0.2)" strokeWidth="2" />
        <circle cx="330" cy="64" r="10" fill="none" stroke="rgba(255,203,8,0.2)" strokeWidth="2" />
        {/* Light beams from ceiling */}
        <polygon points="70,73 45,240 95,240" fill="rgba(255,203,8,0.025)" />
        <polygon points="200,73 170,320 230,320" fill="rgba(255,203,8,0.03)" />
        {/* Grid floor dots */}
        {[0,1,2,3,4,5].map(col =>
          [0,1,2].map(row => (
            <circle key={`${col}-${row}`} cx={col * 70 + 20} cy={row * 15 + 430} r="1.5" fill="rgba(255,203,8,0.2)" />
          ))
        )}
      </svg>

      {/* Gradient overlay for readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(10,17,28,0.7) 0%, transparent 60%)',
      }} />

      {/* Photo label */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '20px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: 'var(--font-barlow)', fontWeight: 600,
          fontSize: 12, color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.15em', textTransform: 'uppercase',
        }}>
          {label}
        </span>
        <div style={{
          width: 28, height: 28,
          border: '1px solid rgba(255,203,8,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: 8, height: 8, backgroundColor: '#FFCB08', opacity: 0.6 }} />
        </div>
      </div>
    </div>
  )
}

export default function AboutSection() {
  return (
    <section id="sobre" style={{ backgroundColor: '#ffffff', padding: '120px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 72 }}>
          <div style={{ width: 3, height: 40, backgroundColor: '#FFCB08' }} />
          <div>
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-barlow)', fontWeight: 600,
              fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase',
              color: '#FFCB08', marginBottom: 4,
            }}>Nossa História</span>
            <h2 style={{
              fontFamily: 'var(--font-barlow)', fontWeight: 900,
              fontSize: 'clamp(36px, 4vw, 56px)',
              color: '#17233A', lineHeight: 1.05, letterSpacing: '-0.01em',
            }}>Sobre a PENATEC</h2>
          </div>
        </div>

        {/* Three-column: text | mock photo | timeline */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px 1fr', gap: 56, alignItems: 'start' }}>

          {/* LEFT — story + numbers */}
          <div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 18, lineHeight: 1.8, color: '#374151', marginBottom: 24 }}>
              Há mais de cinco décadas, a <strong style={{ color: '#1F325A' }}>PENATEC</strong> constrói
              uma trajetória baseada em confiança, excelência e compromisso com os resultados dos clientes.
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, lineHeight: 1.75, color: '#6B7280', marginBottom: 24 }}>
              Nossa história é marcada por décadas de dedicação ao fornecimento de produtos e serviços
              com qualidade superior. Ao longo dos anos, expandimos nossa atuação, aprimoramos nossos
              processos e mantivemos o compromisso que nos define.
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, lineHeight: 1.75, color: '#6B7280' }}>
              Hoje, somos reconhecidos pela inovação contínua e pelo atendimento técnico diferenciado —
              construindo relações de longo prazo baseadas em confiança mútua.
            </p>

            {/* Numbers */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1, marginTop: 48, backgroundColor: '#E8EBF0',
            }}>
              {NUMBERS.map((num, i) => (
                <div key={i} style={{
                  backgroundColor: num.dark ? '#1F325A' : '#ffffff',
                  padding: '24px 16px', textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-barlow)', fontWeight: 900,
                    fontSize: 34, color: num.dark ? '#FFCB08' : '#1F325A', lineHeight: 1,
                  }}>{num.value}</div>
                  <div style={{
                    fontFamily: 'var(--font-inter)', fontSize: 11,
                    color: num.dark ? 'rgba(255,255,255,0.5)' : '#6B7280',
                    marginTop: 6, letterSpacing: '0.04em',
                  }}>{num.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER — industrial mock photo */}
          <div style={{ height: 520, overflow: 'hidden', flexShrink: 0 }}>
            <IndustrialPhotoMock label="Instalações PENATEC" />
          </div>

          {/* RIGHT — timeline */}
          <div style={{ paddingTop: 4 }}>
            <div style={{ position: 'relative', paddingLeft: 32 }}>
              <div style={{
                position: 'absolute', left: 6, top: 10,
                width: 2, height: 'calc(100% - 20px)',
                background: 'linear-gradient(to bottom, #FFCB08, rgba(255,203,8,0.1))',
              }} />
              {TIMELINE.map((item, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: i < TIMELINE.length - 1 ? 44 : 0 }}>
                  <div style={{
                    position: 'absolute', left: -32, top: 4,
                    width: 14, height: 14, borderRadius: '50%',
                    backgroundColor: i === TIMELINE.length - 1 ? '#FFCB08' : '#1F325A',
                    border: `3px solid ${i === TIMELINE.length - 1 ? '#FFCB08' : '#E8EBF0'}`,
                    boxShadow: i === TIMELINE.length - 1 ? '0 0 0 4px rgba(255,203,8,0.2)' : 'none',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-barlow)', fontWeight: 700,
                    fontSize: 12, color: '#FFCB08', letterSpacing: '0.1em',
                    textTransform: 'uppercase', display: 'block', marginBottom: 4,
                  }}>{item.year}</span>
                  <h3 style={{
                    fontFamily: 'var(--font-barlow)', fontWeight: 800,
                    fontSize: 21, color: '#17233A', marginBottom: 6,
                  }}>{item.title}</h3>
                  <p style={{
                    fontFamily: 'var(--font-inter)', fontSize: 14,
                    color: '#6B7280', lineHeight: 1.65,
                  }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          #sobre > div > div:last-child { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
          #sobre > div > div:last-child > div:nth-child(2) { display: none !important; }
        }
        @media (max-width: 700px) {
          #sobre { padding: 72px 0 !important; }
          #sobre > div { padding: 0 24px !important; }
          #sobre > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
