'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const NAV_ITEMS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Assistência Técnica', href: '#assistencia' },
  { label: 'Contato', href: '#contato' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        transition: 'background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        backgroundColor: scrolled ? 'rgba(23,35,58,0.97)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,203,8,0.15)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        boxShadow: scrolled ? '0 2px 32px rgba(0,0,0,0.35)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <button onClick={() => scrollTo('#inicio')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <Image
            src="/logo_penatecsombraespalhada-1-1.png"
            alt="PENATEC"
            width={120}
            height={56}
            style={{ objectFit: 'contain', height: 100, width: 'auto' }}
            priority
          />
        </button>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden-mobile">
          {NAV_ITEMS.map(item => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.72)', fontSize: 14, fontWeight: 500,
                letterSpacing: '0.04em', transition: 'color 0.2s',
                fontFamily: 'var(--font-inter)',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.72)')}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button
          onClick={() => scrollTo('#contato')}
          className="hidden-mobile"
          style={{
            backgroundColor: '#FFCB08', color: '#17233A',
            border: 'none', cursor: 'pointer',
            padding: '10px 24px', fontSize: 13, fontWeight: 700,
            fontFamily: 'var(--font-barlow)', letterSpacing: '0.06em',
            textTransform: 'uppercase', transition: 'opacity 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Solicitar Atendimento
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="show-mobile"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 8, display: 'none' }}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div style={{
        overflow: 'hidden', transition: 'max-height 0.35s ease',
        maxHeight: menuOpen ? 400 : 0,
        backgroundColor: '#0F1924',
        borderTop: menuOpen ? '1px solid rgba(255,203,8,0.15)' : 'none',
      }}>
        <div style={{ padding: '24px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: 500,
                padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'var(--font-inter)',
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contato')}
            style={{
              marginTop: 12, backgroundColor: '#FFCB08', color: '#17233A',
              border: 'none', cursor: 'pointer',
              padding: '12px 24px', fontSize: 13, fontWeight: 700,
              fontFamily: 'var(--font-barlow)', letterSpacing: '0.06em', textTransform: 'uppercase',
            }}
          >
            Solicitar Atendimento
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
