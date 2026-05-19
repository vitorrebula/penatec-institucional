'use client'

import Image from 'next/image'

const QUICK_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre a PENATEC', href: '#sobre' },
  { label: 'Nossos Diferenciais', href: '#diferenciais' },
  { label: 'Assessoria Técnica', href: '#assessoria' },
  { label: 'Assistência Técnica', href: '#assistencia' },
  { label: 'Contato', href: '#contato' },
]

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer id="contato" style={{ backgroundColor: '#0A111C', color: '#ffffff' }}>

      {/* Main footer content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 40px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 64 }}>

          {/* Brand column */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <Image
                src="/logo_penatecsombraespalhada-1-1.png"
                alt="PENATEC"
                width={140}
                height={66}
                style={{ objectFit: 'contain', height: 66, width: 'auto' }}
              />
            </div>

            <p style={{
              fontFamily: 'var(--font-inter)', fontSize: 15, lineHeight: 1.75,
              color: 'rgba(255,255,255,0.5)', marginBottom: 28, maxWidth: 280,
            }}>
              Mais de 50 anos entregando confiança, inovação e excelência no fornecimento de produtos e serviços.
            </p>

            {/* Gold seal */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              padding: '12px 16px',
              border: '1px solid rgba(255,203,8,0.25)',
              backgroundColor: 'rgba(255,203,8,0.05)',
            }}>
              <div style={{
                width: 36, height: 36, border: '2px solid rgba(255,203,8,0.6)',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 9, color: '#FFCB08', lineHeight: 1.2, textAlign: 'center' }}>
                  +50<br/>ANOS
                </span>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 13, color: '#FFCB08' }}>Empresa Tradição</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Qualidade garantida</div>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-barlow)', fontWeight: 700,
              fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#FFCB08', marginBottom: 24,
            }}>
              Links Rápidos
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {QUICK_LINKS.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', padding: 0,
                    fontFamily: 'var(--font-inter)', fontSize: 14,
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#ffffff' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Horários */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-barlow)', fontWeight: 700,
              fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#FFCB08', marginBottom: 24,
            }}>
              Horários
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { day: 'Segunda a Sexta', hours: '08h às 18h' },
                { day: 'Sábados', hours: 'Plantão disponível' },
                { day: 'Feriados', hours: 'Plantão disponível' },
              ].map((h, i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 2 }}>
                    {h.day}
                  </div>
                  <div style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 16, color: '#ffffff' }}>
                    {h.hours}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-barlow)', fontWeight: 700,
              fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#FFCB08', marginBottom: 24,
            }}>
              Contato
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
              {[
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.9v2.02z"/></svg>,
                  label: 'Telefone',
                  value: '(XX) XXXX-XXXX',
                },
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                  label: 'E-mail',
                  value: 'contato@penatec.com.br',
                },
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                  label: 'Endereço',
                  value: 'Consulte nossa localização',
                },
              ].map((contact, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ color: '#FFCB08', flexShrink: 0, marginTop: 2 }}>
                    {contact.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 2, letterSpacing: '0.04em' }}>
                      {contact.label}
                    </div>
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
                      {contact.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA button in footer */}
            <button
              onClick={() => scrollTo('#contato')}
              style={{
                width: '100%',
                backgroundColor: '#FFCB08', color: '#17233A',
                border: 'none', cursor: 'pointer',
                padding: '12px 20px',
                fontSize: 13, fontWeight: 800,
                fontFamily: 'var(--font-barlow)',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.9' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              Solicitar Atendimento
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '20px 40px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} PENATEC. Todos os direitos reservados.
          </span>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
            Desenvolvido por DevRebula
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          footer > div:first-child > div { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 640px) {
          footer > div:first-child > div { grid-template-columns: 1fr !important; }
          footer > div:first-child { padding: 56px 24px 40px !important; }
          footer > div:last-child > div { padding: 16px 24px !important; flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </footer>
  )
}
