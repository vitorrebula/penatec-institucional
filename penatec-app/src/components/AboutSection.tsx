'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight, scaleUp, staggerContainer, EASE_EXPO } from '@/lib/animations'

const TIMELINE = [
  { year: '1970s', title: 'Fundação', desc: 'Início das operações com foco em qualidade e confiança no mercado regional.' },
  { year: '1990s', title: 'Expansão', desc: 'Crescimento das operações e ampliação do portfólio de produtos e serviços.' },
  { year: '2000s', title: 'Inovação', desc: 'Investimentos em tecnologia e atendimento técnico especializado.' },
  { year: 'Hoje', title: 'Referência', desc: 'Consolidada como referência em qualidade, assistência técnica e atendimento diferenciado.' },
]

const NUMBERS = [
  { to: 50, prefix: '+', suffix: '', label: 'Anos de mercado', dark: true },
  { to: 100, prefix: '', suffix: '%', label: 'Foco no cliente', dark: false },
  { to: 6, prefix: '', suffix: 'd/sem', label: 'Assistência ativa', dark: false },
]

function CountStat({ to, prefix, suffix, isVisible }: { to: number; prefix: string; suffix: string; isVisible: boolean }) {
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!isVisible) return
    const ctrl = animate(0, to, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate(v) {
        if (spanRef.current) spanRef.current.textContent = prefix + Math.round(v) + suffix
      },
    })
    return ctrl.stop
  }, [isVisible, to, prefix, suffix])

  return <span ref={spanRef}>{prefix}0{suffix}</span>
}

function AboutVideo({ label }: { label: string }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', backgroundColor: '#0a111c' }}>
      <video
        src="https://penatec.com.br/wp-content/uploads/2024/08/WhatsApp-Video-2024-07-15-at-14.52.28_1.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(10,17,28,0.6) 0%, transparent 60%)',
      }} />

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
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 })

  return (
    <section id="sobre" style={{ backgroundColor: '#ffffff', padding: '120px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 72 }}
        >
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
        </motion.div>

        {/* Three-column: text | mock photo | timeline */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px 1fr', gap: 56, alignItems: 'start' }}>

          {/* LEFT — story + numbers */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: EASE_EXPO, delay: 0.1 }}
          >
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
            <div
              ref={statsRef}
              className="about-numbers"
              style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 1, marginTop: 48, backgroundColor: '#E8EBF0',
              }}
            >
              {NUMBERS.map((num, i) => (
                <div key={i} style={{
                  backgroundColor: num.dark ? '#1F325A' : '#ffffff',
                  padding: '24px 16px', textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-barlow)', fontWeight: 900,
                    fontSize: 34, color: num.dark ? '#FFCB08' : '#1F325A', lineHeight: 1,
                  }}>
                    <CountStat to={num.to} prefix={num.prefix} suffix={num.suffix} isVisible={statsInView} />
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-inter)', fontSize: 11,
                    color: num.dark ? 'rgba(255,255,255,0.5)' : '#6B7280',
                    marginTop: 6, letterSpacing: '0.04em',
                  }}>{num.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CENTER — industrial mock photo */}
          <motion.div
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.15 }}
            style={{ height: 520, overflow: 'hidden', flexShrink: 0 }}
          >
            <AboutVideo label="Instalações PENATEC" />
          </motion.div>

          {/* RIGHT — timeline */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            style={{ paddingTop: 4 }}
          >
            <div style={{ position: 'relative', paddingLeft: 32 }}>
              <div style={{
                position: 'absolute', left: 6, top: 10,
                width: 2, height: 'calc(100% - 20px)',
                background: 'linear-gradient(to bottom, #FFCB08, rgba(255,203,8,0.1))',
              }} />
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeLeft}
                  style={{ position: 'relative', marginBottom: i < TIMELINE.length - 1 ? 44 : 0 }}
                >
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
                </motion.div>
              ))}
            </div>
          </motion.div>

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
          #sobre > div > div:first-child { margin-bottom: 40px !important; }
        }
        @media (max-width: 400px) {
          #sobre .about-numbers { grid-template-columns: 1fr !important; }
          #sobre .about-numbers > div { padding: 20px 16px !important; }
        }
      `}</style>
    </section>
  )
}
