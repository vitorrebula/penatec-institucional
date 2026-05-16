'use client'

import { motion } from 'framer-motion'
import { fadeUp, fadeRight, fadeLeft, EASE_EXPO } from '@/lib/animations'

export default function AssistanceSection() {
  return (
    <section id="assistencia" style={{ backgroundColor: '#17233A', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>

      {/* Backgrounds */}
      <div className="line-grid" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
      <div style={{
        position: 'absolute', left: -200, top: '50%', transform: 'translateY(-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,203,8,0.05) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      <div id="assist-wrap" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 2 }}>

        {/* Label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <span style={{
            display: 'inline-block',
            fontFamily: 'var(--font-barlow)', fontWeight: 600,
            fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase',
            color: '#FFCB08', marginBottom: 16,
          }}>
            Suporte de Alto Nível
          </span>
          <h2 style={{
            fontFamily: 'var(--font-barlow)', fontWeight: 900,
            fontSize: 'clamp(36px, 4vw, 56px)',
            color: '#ffffff', lineHeight: 1.05,
            letterSpacing: '-0.01em',
          }}>
            Assistência Técnica
          </h2>
        </motion.div>

        {/* Main time display */}
        <div className="time-grid" style={{
          display: 'grid', gridTemplateColumns: '1fr auto 1fr',
          gap: 0, alignItems: 'center', marginBottom: 56,
        }}>

          {/* Left info — slides from left */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '48px 40px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{
                width: 48, height: 48,
                backgroundColor: 'rgba(255,203,8,0.1)',
                border: '1px solid rgba(255,203,8,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFCB08" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 14, color: '#FFCB08', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Atendimento
              </span>
            </div>
            <div className="assist-time-value" style={{
              fontFamily: 'var(--font-barlow)', fontWeight: 900,
              fontSize: 72, color: '#FFCB08', lineHeight: 1,
              marginBottom: 8, letterSpacing: '-0.02em',
            }}>
              08h<span style={{ color: 'rgba(255,203,8,0.4)' }}>–</span>18h
            </div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
              Todos os dias da semana<br/>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Segunda a Sábado</span>
            </div>
          </motion.div>

          {/* Center divider — fades in */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="center-divider"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '0 40px',
            }}
          >
            <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, transparent, rgba(255,203,8,0.4))' }} />
            <div style={{
              width: 40, height: 40, border: '1px solid rgba(255,203,8,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '16px 0',
            }}>
              <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 12, color: '#FFCB08', letterSpacing: '0.1em' }}>+</span>
            </div>
            <div style={{ width: 1, height: 60, background: 'linear-gradient(to top, transparent, rgba(255,203,8,0.4))' }} />
          </motion.div>

          {/* Right info — slides from right */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            style={{
              backgroundColor: 'rgba(255,203,8,0.06)',
              border: '1px solid rgba(255,203,8,0.2)',
              padding: '48px 40px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{
                width: 48, height: 48,
                backgroundColor: 'rgba(255,203,8,0.15)',
                border: '1px solid rgba(255,203,8,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFCB08" strokeWidth="1.5">
                  <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 14, color: '#FFCB08', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Plantão
              </span>
            </div>
            <div className="assist-time-value" style={{
              fontFamily: 'var(--font-barlow)', fontWeight: 900,
              fontSize: 72, color: '#ffffff', lineHeight: 1,
              marginBottom: 8, letterSpacing: '-0.02em',
            }}>
              Sábados
            </div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
              E <strong style={{ color: '#FFCB08' }}>Feriados</strong><br/>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Plantão especializado disponível</span>
            </div>
          </motion.div>
        </div>

        {/* Notice */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="notice-box"
          style={{
            display: 'flex', alignItems: 'flex-start', gap: 20,
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderLeft: '3px solid rgba(255,203,8,0.6)',
            padding: '24px 28px',
            maxWidth: 720, margin: '0 auto',
          }}
        >
          <div style={{ flexShrink: 0, marginTop: 2 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFCB08" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65 }}>
              <strong style={{ color: '#ffffff' }}>Importante:</strong> O atendimento de assistência técnica é realizado exclusivamente
              em equipamentos e máquinas adquiridos através da PENATEC. Consulte nossa equipe para mais informações.
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #assistencia .time-grid {
            grid-template-columns: 1fr !important;
          }
          #assistencia .center-divider { display: none !important; }
        }
        @media (max-width: 600px) {
          #assistencia { padding: 72px 0 !important; }
          #assist-wrap { padding: 0 20px !important; }
          #assistencia .time-grid > div { padding: 32px 24px !important; }
          #assistencia .assist-time-value { font-size: 52px !important; }
          #assistencia .time-grid { margin-bottom: 36px !important; }
          #assistencia .notice-box { padding: 20px 20px !important; }
        }
      `}</style>
    </section>
  )
}
