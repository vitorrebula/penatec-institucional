'use client'

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { fadeUp, fadeLeft, fadeRight, staggerContainer, EASE_EXPO } from '@/lib/animations'
import { type Product, EXTENDED_BY_NAME } from '@/lib/products'

const PALETTES: Record<string, string> = {
  'dark-blue':  'linear-gradient(135deg,#0a1628 0%,#1F325A 60%,#17233A 100%)',
  'graphite':   'linear-gradient(135deg,#1a1a1a 0%,#2C2C2C 60%,#1a1a1a 100%)',
  'deep-navy':  'linear-gradient(135deg,#0F1924 0%,#17233A 50%,#0a111c 100%)',
  'steel':      'linear-gradient(135deg,#232b38 0%,#344155 60%,#232b38 100%)',
  'warm-dark':  'linear-gradient(135deg,#1a1008 0%,#2a1a0a 50%,#17233A 100%)',
  'industrial': 'linear-gradient(160deg,#0d1520 0%,#1F325A 40%,#2a3a52 100%)',
}

const CAROUSEL_GRADIENTS = [
  'linear-gradient(135deg,#0a1628 0%,#1F325A 60%,#17233A 100%)',
  'linear-gradient(155deg,#232b38 0%,#344155 60%,#1F325A 100%)',
  'linear-gradient(120deg,#0F1924 0%,#17233A 50%,#1F325A 100%)',
  'linear-gradient(170deg,#0d1520 0%,#2a3a52 40%,#17233A 100%)',
]

function MachineSVGPattern({ rotate = 0 }: { rotate?: number }) {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.28 }}
      viewBox="0 0 600 400"
      preserveAspectRatio="xMidYMid slice"
    >
      <g transform={`rotate(${rotate}, 300, 200)`}>
        <rect x="120" y="60" width="360" height="280" rx="2" fill="none" stroke="#FFCB08" strokeWidth="0.9" />
        <rect x="160" y="100" width="280" height="200" rx="1" fill="none" stroke="#FFCB08" strokeWidth="0.5" opacity="0.6" />
        <polyline points="120,60 96,60 96,84" fill="none" stroke="#FFCB08" strokeWidth="1.5" />
        <polyline points="480,60 504,60 504,84" fill="none" stroke="#FFCB08" strokeWidth="1.5" />
        <polyline points="120,340 96,340 96,316" fill="none" stroke="#FFCB08" strokeWidth="1.5" />
        <polyline points="480,340 504,340 504,316" fill="none" stroke="#FFCB08" strokeWidth="1.5" />
        <line x1="200" y1="200" x2="400" y2="200" stroke="#FFCB08" strokeWidth="0.5" opacity="0.5" />
        <line x1="300" y1="110" x2="300" y2="290" stroke="#FFCB08" strokeWidth="0.5" opacity="0.5" />
        <circle cx="300" cy="200" r="48" fill="none" stroke="#FFCB08" strokeWidth="0.9" opacity="0.7" />
        <circle cx="300" cy="200" r="20" fill="none" stroke="#FFCB08" strokeWidth="0.7" opacity="0.5" />
        <circle cx="300" cy="200" r="5" fill="#FFCB08" opacity="0.4" />
        <line x1="0" y1="28" x2="600" y2="28" stroke="#FFCB08" strokeWidth="0.35" opacity="0.3" strokeDasharray="4 8" />
        <line x1="0" y1="372" x2="600" y2="372" stroke="#FFCB08" strokeWidth="0.35" opacity="0.3" strokeDasharray="4 8" />
        <line x1="28" y1="0" x2="28" y2="400" stroke="#FFCB08" strokeWidth="0.35" opacity="0.2" strokeDasharray="4 8" />
        <line x1="572" y1="0" x2="572" y2="400" stroke="#FFCB08" strokeWidth="0.35" opacity="0.2" strokeDasharray="4 8" />
        <text x="300" y="358" textAnchor="middle" fill="#FFCB08" fontSize="9" fontFamily="monospace" opacity="0.35" letterSpacing="5">PENATEC INDUSTRIAL</text>
      </g>
    </svg>
  )
}

export default function MachinaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [machine, setMachine] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFoundState, setNotFoundState] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const totalSlides = CAROUSEL_GRADIENTS.length

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(r => { if (!r.ok) { setNotFoundState(true); return null } return r.json() })
      .then((data: Product | null) => { if (data) setMachine(data); setLoading(false) })
      .catch(() => { setNotFoundState(true); setLoading(false) })
  }, [id])

  if (notFoundState) notFound()

  if (loading || !machine) {
    return (
      <>
        <Header />
        <main style={{ minHeight: '100vh', backgroundColor: '#17233A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: 40, height: 40, border: '3px solid rgba(255,203,8,0.2)',
            borderTopColor: '#FFCB08', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
        </main>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </>
    )
  }

  const extended = EXTENDED_BY_NAME[machine.name]
  const heroGradient = PALETTES[machine.variant]

  const prev = () => setActiveSlide(i => (i - 1 + totalSlides) % totalSlides)
  const next = () => setActiveSlide(i => (i + 1) % totalSlides)

  return (
    <>
      <Header />

      <main style={{ minHeight: '100vh' }}>

        {/* ── 1. Hero ─────────────────────────────────────────────── */}
        <section id="maquinas-hero" style={{
          backgroundColor: '#17233A',
          padding: '140px 0 80px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.055, pointerEvents: 'none' }}>
            <defs>
              <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#FFCB08" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>

          <div className="maquina-hero-deco" style={{
            position: 'absolute', right: 0, top: 0, bottom: 0,
            width: '42%', overflow: 'hidden', opacity: 0.18,
          }}>
            <div style={{ position: 'absolute', inset: 0, background: heroGradient }} />
            <MachineSVGPattern rotate={0} />
          </div>

          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', position: 'relative' }} className="maquina-hero-inner">
            <motion.div variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}
            >
              {[
                { label: 'Início', href: '/' },
                { label: 'Portfólio', href: '/produtos' },
                { label: 'Máquinas', href: '/produtos?tab=maquinas' },
              ].map((crumb) => (
                <span key={crumb.href} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Link href={crumb.href} style={{
                    fontFamily: 'var(--font-inter)', fontSize: 13,
                    color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.4)' }}
                  >
                    {crumb.label}
                  </Link>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,203,8,0.35)" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              ))}
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
                {machine.name}
              </span>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'var(--font-barlow)', fontWeight: 600,
                  fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase',
                  color: '#FFCB08', paddingLeft: 20, borderLeft: '3px solid #FFCB08',
                }}>
                  {machine.category}
                </span>
                {machine.badge && (
                  <span style={{
                    backgroundColor: '#FFCB08', color: '#17233A',
                    fontFamily: 'var(--font-barlow)', fontWeight: 800,
                    fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                    padding: '4px 10px',
                  }}>
                    {machine.badge}
                  </span>
                )}
              </motion.div>

              <motion.h1 variants={fadeUp} style={{
                fontFamily: 'var(--font-barlow)', fontWeight: 900,
                fontSize: 'clamp(40px, 6vw, 80px)',
                color: '#ffffff', lineHeight: 1.0, marginBottom: 20,
                maxWidth: 700,
              }}>
                {machine.name}
              </motion.h1>

              {extended?.tagline && (
                <motion.p variants={fadeUp} style={{
                  fontFamily: 'var(--font-barlow)', fontWeight: 700,
                  fontSize: 'clamp(18px, 2.2vw, 26px)',
                  color: 'rgba(255,203,8,0.85)', lineHeight: 1.3,
                  marginBottom: 14, maxWidth: 520,
                }}>
                  {extended.tagline}
                </motion.p>
              )}

              <motion.p variants={fadeUp} style={{
                fontFamily: 'var(--font-inter)', fontSize: 15.5, lineHeight: 1.7,
                color: 'rgba(255,255,255,0.5)', maxWidth: 460, marginBottom: 40,
              }}>
                {machine.description}
              </motion.p>

              <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#especificacoes" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  backgroundColor: '#FFCB08', color: '#17233A',
                  textDecoration: 'none', padding: '13px 32px',
                  fontFamily: 'var(--font-barlow)', fontWeight: 800,
                  fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
                  transition: 'opacity 0.2s, transform 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.9'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)' }}
                >
                  Ver especificações
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </a>
                <Link href="/#contato" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  backgroundColor: 'transparent', color: 'rgba(255,255,255,0.75)',
                  textDecoration: 'none', padding: '13px 32px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  fontFamily: 'var(--font-barlow)', fontWeight: 700,
                  fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,203,8,0.5)'; (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)' }}
                >
                  Solicitar orçamento
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── 2. Imagem + Especificações ─────────────────────────── */}
        <section id="especificacoes" style={{ backgroundColor: '#F4F6FA', padding: '80px 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }} className="maquina-specs-inner">
            <div className="maquina-specs-grid">

              <motion.div
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                style={{ position: 'relative', overflow: 'hidden' }}
                className="maquina-main-image"
              >
                <div className="maquina-main-img-wrap" style={{ position: 'relative', height: 460, overflow: 'hidden' }}>
                  {machine.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={machine.image_url}
                      alt={machine.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <>
                      <div style={{ position: 'absolute', inset: 0, background: heroGradient }} />
                      <MachineSVGPattern rotate={0} />
                      <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
                      }} />
                      <div style={{
                        position: 'absolute', bottom: 24, left: 28,
                        fontFamily: 'var(--font-barlow)', fontWeight: 700,
                        fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.45)',
                      }}>
                        Imagem ilustrativa
                      </div>
                    </>
                  )}
                </div>
              </motion.div>

              <motion.div
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              >
                <span style={{
                  fontFamily: 'var(--font-barlow)', fontWeight: 600,
                  fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase',
                  color: '#FFCB08', marginBottom: 16, paddingLeft: 20, borderLeft: '3px solid #FFCB08',
                  display: 'block',
                }}>
                  Especificações Técnicas
                </span>
                <h2 style={{
                  fontFamily: 'var(--font-barlow)', fontWeight: 900,
                  fontSize: 'clamp(26px, 3vw, 38px)',
                  color: '#17233A', lineHeight: 1.1, marginBottom: 36,
                }}>
                  Dados do Equipamento
                </h2>

                {extended?.specs?.length ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {extended.specs.map((spec, i) => (
                      <div key={i} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '16px 0',
                        borderBottom: '1px solid rgba(23,35,58,0.08)',
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-inter)', fontSize: 13.5,
                          color: 'rgba(23,35,58,0.5)', display: 'flex', alignItems: 'center', gap: 10,
                        }}>
                          <span style={{ width: 6, height: 6, backgroundColor: '#FFCB08', flexShrink: 0, display: 'inline-block' }} />
                          {spec.label}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-barlow)', fontWeight: 800,
                          fontSize: 15, color: '#17233A', letterSpacing: '0.02em',
                        }}>
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{
                    fontFamily: 'var(--font-inter)', fontSize: 14, lineHeight: 1.7,
                    color: 'rgba(23,35,58,0.45)',
                  }}>
                    {machine.description}
                  </p>
                )}

                <div style={{ marginTop: 36, paddingTop: 28, borderTop: '2px solid rgba(23,35,58,0.1)' }}>
                  <p style={{
                    fontFamily: 'var(--font-inter)', fontSize: 13, lineHeight: 1.6,
                    color: 'rgba(23,35,58,0.4)', marginBottom: 20,
                  }}>
                    Especificações sujeitas a alteração sem aviso prévio. Consulte nossa equipe para configurações personalizadas.
                  </p>
                  <Link href="/#contato" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    backgroundColor: '#17233A', color: '#FFCB08',
                    textDecoration: 'none', padding: '12px 28px',
                    fontFamily: 'var(--font-barlow)', fontWeight: 800,
                    fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
                    transition: 'opacity 0.2s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}
                  >
                    Solicitar ficha técnica completa
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 3. Vídeo ────────────────────────────────────────────── */}
        <section style={{ backgroundColor: '#ffffff', padding: '80px 0' }}>
          <div className="maquina-section-pad" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{ textAlign: 'center', marginBottom: 48 }}
            >
              <motion.span variants={fadeUp} style={{
                display: 'inline-block',
                fontFamily: 'var(--font-barlow)', fontWeight: 600,
                fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase',
                color: '#FFCB08', marginBottom: 14, paddingLeft: 20, borderLeft: '3px solid #FFCB08',
              }}>
                Vídeo Demonstrativo
              </motion.span>
              <motion.h2 variants={fadeUp} style={{
                fontFamily: 'var(--font-barlow)', fontWeight: 900,
                fontSize: 'clamp(26px, 3vw, 40px)',
                color: '#17233A', lineHeight: 1.1, marginBottom: 12, display: 'block',
              }}>
                Veja a Máquina em Ação
              </motion.h2>
              <motion.p variants={fadeUp} style={{
                fontFamily: 'var(--font-inter)', fontSize: 15, lineHeight: 1.7,
                color: 'rgba(23,35,58,0.5)', maxWidth: 480, margin: '0 auto',
              }}>
                Assista ao vídeo e conheça o desempenho da {machine.name} em operação real.
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              style={{ maxWidth: 880, margin: '0 auto', position: 'relative' }}
            >
              <div style={{
                position: 'relative', paddingBottom: '56.25%',
                height: 0, overflow: 'hidden',
                backgroundColor: '#17233A',
                border: '2px solid rgba(23,35,58,0.1)',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: heroGradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: 20,
                }}>
                  <MachineSVGPattern rotate={5} />
                  <div style={{
                    position: 'relative', zIndex: 1,
                    width: 72, height: 72,
                    backgroundColor: '#FFCB08',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 8px 32px rgba(255,203,8,0.35)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.08)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(255,203,8,0.5)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(255,203,8,0.35)' }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="#17233A">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <p style={{
                    position: 'relative', zIndex: 1,
                    fontFamily: 'var(--font-barlow)', fontWeight: 700,
                    fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                  }}>
                    Vídeo em breve
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 4. Carrossel de imagens ──────────────────────────────── */}
        <section style={{ backgroundColor: '#17233A', padding: '80px 0', overflow: 'hidden' }}>
          <div className="maquina-section-pad" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{ marginBottom: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}
            >
              <div>
                <motion.span variants={fadeUp} style={{
                  display: 'block',
                  fontFamily: 'var(--font-barlow)', fontWeight: 600,
                  fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase',
                  color: '#FFCB08', marginBottom: 14, paddingLeft: 20, borderLeft: '3px solid #FFCB08',
                }}>
                  Galeria
                </motion.span>
                <motion.h2 variants={fadeUp} style={{
                  fontFamily: 'var(--font-barlow)', fontWeight: 900,
                  fontSize: 'clamp(26px, 3vw, 40px)',
                  color: '#ffffff', lineHeight: 1.1,
                }}>
                  Galeria de Imagens
                </motion.h2>
              </div>

              <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  fontFamily: 'var(--font-barlow)', fontWeight: 700,
                  fontSize: 12, letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.35)', marginRight: 8,
                }}>
                  {activeSlide + 1} / {totalSlides}
                </span>
                <button onClick={prev} aria-label="Imagem anterior" style={{
                  width: 44, height: 44, backgroundColor: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#ffffff', transition: 'background-color 0.2s, border-color 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,203,8,0.15)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,203,8,0.4)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button onClick={next} aria-label="Próxima imagem" style={{
                  width: 44, height: 44, backgroundColor: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#ffffff', transition: 'background-color 0.2s, border-color 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,203,8,0.15)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,203,8,0.4)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>

            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: EASE_EXPO }}
                  className="maquina-carousel-slide"
                  style={{ position: 'relative', height: 420, overflow: 'hidden' }}
                >
                  <div style={{ position: 'absolute', inset: 0, background: CAROUSEL_GRADIENTS[activeSlide] }} />
                  <MachineSVGPattern rotate={activeSlide * 8} />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
                  }} />
                  <div style={{
                    position: 'absolute', bottom: 24, left: 28,
                    fontFamily: 'var(--font-barlow)', fontWeight: 700,
                    fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                  }}>
                    {machine.name} — Foto {activeSlide + 1}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
                {CAROUSEL_GRADIENTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    aria-label={`Ir para foto ${i + 1}`}
                    style={{
                      width: i === activeSlide ? 24 : 8,
                      height: 8,
                      backgroundColor: i === activeSlide ? '#FFCB08' : 'rgba(255,255,255,0.2)',
                      border: 'none', cursor: 'pointer', padding: 0,
                      transition: 'width 0.3s ease, background-color 0.2s',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. CTA ──────────────────────────────────────────────── */}
        <section style={{ backgroundColor: '#F4F6FA', padding: '80px 0', borderTop: '1px solid rgba(23,35,58,0.07)' }}>
          <div className="maquina-section-pad" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
            <div className="maquina-cta-inner">

              <motion.div
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-barlow)', fontWeight: 600,
                  fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase',
                  color: '#FFCB08', marginBottom: 14, paddingLeft: 20, borderLeft: '3px solid #FFCB08',
                }}>
                  Fale conosco
                </span>
                <h2 style={{
                  fontFamily: 'var(--font-barlow)', fontWeight: 900,
                  fontSize: 'clamp(28px, 3.5vw, 46px)',
                  color: '#17233A', lineHeight: 1.05, marginBottom: 16,
                }}>
                  Quer saber mais sobre<br />a {machine.name}?
                </h2>
                <p style={{
                  fontFamily: 'var(--font-inter)', fontSize: 15, lineHeight: 1.7,
                  color: 'rgba(23,35,58,0.5)', maxWidth: 440,
                }}>
                  Nossa equipe técnica está pronta para apresentar uma proposta personalizada, esclarecer dúvidas e agendar uma demonstração.
                </p>
              </motion.div>

              <motion.div
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="maquina-cta-panel"
                style={{
                  backgroundColor: '#17233A', padding: '48px 44px',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: 80, height: 80,
                  borderLeft: '2px solid rgba(255,203,8,0.15)',
                  borderBottom: '2px solid rgba(255,203,8,0.15)',
                }} />

                <p style={{
                  fontFamily: 'var(--font-barlow)', fontWeight: 700,
                  fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)', marginBottom: 24,
                }}>
                  Solicitar informações
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Link href="/#contato" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    backgroundColor: '#FFCB08', color: '#17233A',
                    textDecoration: 'none', padding: '16px 24px',
                    fontFamily: 'var(--font-barlow)', fontWeight: 800,
                    fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase',
                    transition: 'opacity 0.2s, transform 0.2s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.92'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)' }}
                  >
                    Solicitar Proposta
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>

                  <Link href="/produtos" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    backgroundColor: 'transparent', color: 'rgba(255,255,255,0.65)',
                    textDecoration: 'none', padding: '14px 24px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    fontFamily: 'var(--font-barlow)', fontWeight: 700,
                    fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,203,8,0.35)'; (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.65)' }}
                  >
                    Ver outros equipamentos
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        .maquina-hero-inner { max-width: 700px; }

        .maquina-specs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .maquina-cta-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .maquina-hero-inner { max-width: 100% !important; }
          .maquina-specs-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .maquina-cta-inner { grid-template-columns: 1fr !important; gap: 40px !important; }
          .maquina-main-image { order: -1; }
        }

        @media (max-width: 768px) {
          .maquina-hero-deco { display: none; }
        }

        @media (max-width: 640px) {
          #maquinas-hero { padding: 120px 0 56px !important; }
          .maquina-hero-inner { padding: 0 16px !important; }
          .maquina-specs-inner { padding: 0 16px !important; }
          .maquina-section-pad { padding: 0 16px !important; }
          .maquina-main-img-wrap { height: 280px !important; }
          .maquina-carousel-slide { height: 260px !important; }
          .maquina-cta-panel { padding: 32px 24px !important; }
        }
      `}</style>
    </>
  )
}
