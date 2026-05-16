'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { fadeUp, staggerContainer, EASE_EXPO } from '@/lib/animations'

const TRUST_ITEMS = [
  { value: '+50', unit: 'anos', label: 'de mercado',      desc: 'Uma trajetória sólida e comprovada de excelência operacional.', countTo: 50, prefix: '+', suffix: '' },
  { value: '100%', unit: '',    label: 'comprometimento', desc: 'Total dedicação ao sucesso e à satisfação de cada cliente.',       countTo: 100, prefix: '', suffix: '%' },
  { value: '6',   unit: 'dias', label: 'por semana',      desc: 'Atendimento e assistência técnica sempre disponíveis.',            countTo: 6,   prefix: '', suffix: '' },
  { value: '∞',   unit: '',    label: 'confiança',        desc: 'Relações de longo prazo construídas sobre resultados concretos.',  countTo: null, prefix: '', suffix: '' },
]

function CountValue({ countTo, prefix, suffix, unit, isVisible }: {
  countTo: number | null; prefix: string; suffix: string; unit: string; isVisible: boolean
}) {
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!isVisible || countTo === null) return
    const ctrl = animate(0, countTo, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate(v) {
        if (spanRef.current) spanRef.current.textContent = prefix + Math.round(v) + suffix
      },
    })
    return ctrl.stop
  }, [isVisible, countTo, prefix, suffix])

  if (countTo === null) {
    return <span>∞</span>
  }

  return <span ref={spanRef}>{prefix}0{suffix}</span>
}

const statItem = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
}

export default function TrustSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  const gridInView = useInView(gridRef, { once: true, amount: 0.3 })

  const [activeStat, setActiveStat] = useState(0)
  const trustCarouselRef = useRef<HTMLDivElement>(null)

  const onTrustScroll = useCallback(() => {
    const el = trustCarouselRef.current
    if (!el) return
    const containerRect = el.getBoundingClientRect()
    let closestIdx = 0
    let minDist = Infinity
    Array.from(el.children).forEach((child, idx) => {
      const dist = Math.abs(child.getBoundingClientRect().left - containerRect.left)
      if (dist < minDist) { minDist = dist; closestIdx = idx }
    })
    setActiveStat(closestIdx)
  }, [])

  const scrollToStat = useCallback((idx: number) => {
    const el = trustCarouselRef.current
    if (!el) return
    const card = el.children[idx] as HTMLElement
    if (card) el.scrollTo({ left: card.offsetLeft, behavior: 'smooth' })
  }, [])

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
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
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
        </motion.div>

        {/* Stats grid — stagger + count-up */}
        <motion.div
          ref={gridRef}
          id="trust-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              variants={statItem}
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
                  <CountValue
                    countTo={item.countTo}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    unit={item.unit}
                    isVisible={gridInView}
                  />
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
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile carousel */}
        <div className="trust-mobile-carousel">
          <div
            ref={trustCarouselRef}
            className="trust-carousel-track"
            onScroll={onTrustScroll}
          >
            {TRUST_ITEMS.map((item, i) => (
              <div
                key={i}
                className="trust-carousel-card"
                style={{
                  flex: '0 0 76vw',
                  maxWidth: 300,
                  padding: '36px 28px',
                  textAlign: 'center',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ marginBottom: 4 }}>
                  <span style={{
                    fontFamily: 'var(--font-barlow)', fontWeight: 900,
                    fontSize: 72, color: '#FFCB08', lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}>
                    {item.value}
                  </span>
                  {item.unit && (
                    <span style={{
                      fontFamily: 'var(--font-barlow)', fontWeight: 700,
                      fontSize: 20, color: 'rgba(255,203,8,0.6)',
                      marginLeft: 4,
                    }}>
                      {item.unit}
                    </span>
                  )}
                </div>
                <div style={{
                  fontFamily: 'var(--font-barlow)', fontWeight: 700,
                  fontSize: 14, color: 'rgba(255,255,255,0.8)',
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                  marginBottom: 12,
                }}>
                  {item.label}
                </div>
                <div style={{ width: 24, height: 2, backgroundColor: '#FFCB08', margin: '0 auto 14px', opacity: 0.5 }} />
                <p style={{
                  fontFamily: 'var(--font-inter)', fontSize: 13,
                  color: 'rgba(255,255,255,0.4)', lineHeight: 1.65,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 24 }}>
            {TRUST_ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToStat(i)}
                aria-label={`Stat ${i + 1} de ${TRUST_ITEMS.length}`}
                style={{
                  width: activeStat === i ? 20 : 6,
                  height: 6,
                  backgroundColor: activeStat === i ? '#FFCB08' : 'rgba(255,203,8,0.25)',
                  border: 'none', borderRadius: 3, cursor: 'pointer', padding: 0,
                  transition: 'width 0.3s ease, background-color 0.3s ease',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom seal */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          style={{ textAlign: 'center', marginTop: 72 }}
        >
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
        </motion.div>
      </div>

      <style>{`
        .trust-mobile-carousel { display: none; }
        .trust-carousel-track {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          gap: 12px;
          padding: 0 24px;
          scroll-padding-left: 24px;
        }
        .trust-carousel-track::-webkit-scrollbar { display: none; }
        .trust-carousel-card { scroll-snap-align: start; }

        @media (max-width: 900px) {
          #trust-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          #confianca { padding: 72px 0 !important; }
          #confianca > div { padding: 0 !important; }
          #confianca > div > div:first-child { padding: 0 24px !important; margin-bottom: 40px !important; }
          #trust-grid { display: none !important; }
          .trust-mobile-carousel { display: block; }
          #confianca .trust-mobile-carousel ~ div { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  )
}
