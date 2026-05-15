'use client'

const CARDS = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    number: '01',
    title: 'Qualidade e Confiabilidade',
    desc: 'Compromisso com a excelência em cada entrega. Produtos e serviços que atendem os mais altos padrões de qualidade, garantindo a satisfação e a confiança dos nossos clientes.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    number: '02',
    title: 'Mais de 50 Anos de Experiência',
    desc: 'Décadas de conhecimento acumulado, evolução constante e relacionamento sólido com clientes. Uma história de competência que se traduz em soluções confiáveis para o seu negócio.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    number: '03',
    title: 'Assessoria Especializada',
    desc: 'Nossos clientes recebem orientação técnica personalizada para otimizar o uso dos produtos, reduzir custos de manutenção e aumentar a produtividade da operação.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    number: '04',
    title: 'Assistência Técnica Especializada',
    desc: 'Atendimento técnico disponível todos os dias, das 08h às 18h, com plantão aos sábados e feriados. Equipe treinada para resolver com agilidade e precisão.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    number: '05',
    title: 'Atendimento Profissional',
    desc: 'Equipe altamente capacitada para compreender e atender as necessidades específicas de cada cliente com eficiência, agilidade e comprometimento total.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
    number: '06',
    title: 'Soluções Personalizadas',
    desc: 'Desenvolvemos soluções alinhadas às necessidades reais de cada cliente. Flexibilidade, adaptação e foco em resultados concretos para o seu negócio.',
  },
]

export default function DifferentialsSection() {
  return (
    <section id="diferenciais" style={{ backgroundColor: '#F4F6FA', padding: '120px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

        {/* Header */}
        <div style={{ maxWidth: 640, marginBottom: 64 }}>
          <span style={{
            display: 'inline-block',
            fontFamily: 'var(--font-barlow)', fontWeight: 600,
            fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase',
            color: '#FFCB08', marginBottom: 12,
            paddingLeft: 20,
            borderLeft: '3px solid #FFCB08',
          }}>
            Por que escolher a PENATEC
          </span>
          <h2 style={{
            fontFamily: 'var(--font-barlow)', fontWeight: 900,
            fontSize: 'clamp(36px, 4vw, 54px)',
            color: '#17233A', lineHeight: 1.05,
            letterSpacing: '-0.01em', marginTop: 12,
          }}>
            Nossos Diferenciais
          </h2>
          <p style={{
            fontFamily: 'var(--font-inter)', fontSize: 17, lineHeight: 1.7,
            color: '#6B7280', marginTop: 16,
          }}>
            Décadas de experiência traduzidas em qualidade, confiança e suporte técnico
            que vai além do esperado.
          </p>
        </div>

        {/* Cards grid */}
        <div className="cards-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          backgroundColor: '#E8EBF0',
        }}>
          {CARDS.map((card, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#ffffff',
                padding: '40px 36px',
                position: 'relative',
                transition: 'background-color 0.25s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#1F325A'
                const numEl = e.currentTarget.querySelector('[data-num]') as HTMLElement
                const iconEl = e.currentTarget.querySelector('[data-icon]') as HTMLElement
                const titleEl = e.currentTarget.querySelector('[data-title]') as HTMLElement
                const descEl = e.currentTarget.querySelector('[data-desc]') as HTMLElement
                if (numEl) numEl.style.color = 'rgba(255,203,8,0.2)'
                if (iconEl) iconEl.style.color = '#FFCB08'
                if (titleEl) titleEl.style.color = '#ffffff'
                if (descEl) descEl.style.color = 'rgba(255,255,255,0.65)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#ffffff'
                const numEl = e.currentTarget.querySelector('[data-num]') as HTMLElement
                const iconEl = e.currentTarget.querySelector('[data-icon]') as HTMLElement
                const titleEl = e.currentTarget.querySelector('[data-title]') as HTMLElement
                const descEl = e.currentTarget.querySelector('[data-desc]') as HTMLElement
                if (numEl) numEl.style.color = 'rgba(31,50,90,0.08)'
                if (iconEl) iconEl.style.color = '#1F325A'
                if (titleEl) titleEl.style.color = '#17233A'
                if (descEl) descEl.style.color = '#6B7280'
              }}
            >
              {/* Background number */}
              <div
                data-num=""
                style={{
                  position: 'absolute', top: 24, right: 28,
                  fontFamily: 'var(--font-barlow)', fontWeight: 900,
                  fontSize: 72, color: 'rgba(31,50,90,0.08)',
                  lineHeight: 1, userSelect: 'none',
                  transition: 'color 0.25s',
                }}
              >
                {card.number}
              </div>

              {/* Icon */}
              <div
                data-icon=""
                style={{
                  color: '#1F325A',
                  marginBottom: 24,
                  transition: 'color 0.25s',
                }}
              >
                {card.icon}
              </div>

              {/* Gold accent line */}
              <div style={{ width: 32, height: 3, backgroundColor: '#FFCB08', marginBottom: 20 }} />

              <h3
                data-title=""
                style={{
                  fontFamily: 'var(--font-barlow)', fontWeight: 800,
                  fontSize: 22, color: '#17233A',
                  letterSpacing: '-0.01em', marginBottom: 12,
                  lineHeight: 1.2, transition: 'color 0.25s',
                }}
              >
                {card.title}
              </h3>
              <p
                data-desc=""
                style={{
                  fontFamily: 'var(--font-inter)', fontSize: 15,
                  color: '#6B7280', lineHeight: 1.7,
                  transition: 'color 0.25s',
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #diferenciais .cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          #diferenciais { padding: 72px 0 !important; }
          #diferenciais > div { padding: 0 24px !important; }
          #diferenciais .cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
