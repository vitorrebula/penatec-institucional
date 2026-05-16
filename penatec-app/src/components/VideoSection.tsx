'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight, EASE_EXPO } from '@/lib/animations'

const PENATEC_VIDEO_SRC =
  'https://penatec.com.br/wp-content/uploads/2024/08/WhatsApp-Video-2024-07-15-at-14.52.28.mp4'

function MainVideo({ title, description }: { title: string; description: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div style={{ position: 'relative', width: '100%', backgroundColor: '#0a1628', overflow: 'hidden' }}>
      {/* Aspect ratio wrapper — 16:9 */}
      <div style={{ paddingBottom: '56.25%', position: 'relative' }}>
        <video
          ref={videoRef}
          src={PENATEC_VIDEO_SRC}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          controls
          playsInline
          preload="metadata"
          onLoadedMetadata={() => {
            if (videoRef.current) videoRef.current.currentTime = 2
          }}
        />
      </div>

      {/* Info bar below video */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid rgba(255,203,8,0.15)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FFCB08', flexShrink: 0,
          animation: 'pulse 2s ease-in-out infinite',
        }} />
        <div>
          <h3 style={{
            fontFamily: 'var(--font-barlow)', fontWeight: 800,
            fontSize: 16, color: '#ffffff', marginBottom: 2, lineHeight: 1.2,
          }}>
            {title}
          </h3>
          <p style={{
            fontFamily: 'var(--font-inter)', fontSize: 12,
            color: 'rgba(255,255,255,0.45)', lineHeight: 1.4,
          }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

function SmallVideoMock({ title, duration, category }: { title: string; duration: string; category: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ display: 'flex', gap: 16, cursor: 'pointer', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.07)', alignItems: 'center' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: 120, height: 72, flexShrink: 0, position: 'relative', overflow: 'hidden',
        backgroundColor: '#17233A',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0a111c 0%, #1F325A 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            backgroundColor: hovered ? '#FFCB08' : 'rgba(255,203,8,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background-color 0.2s',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#17233A">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
        <div style={{
          position: 'absolute', bottom: 4, right: 6,
          fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, color: '#fff',
          backgroundColor: 'rgba(0,0,0,0.6)', padding: '1px 5px',
        }}>
          {duration}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: 'var(--font-barlow)', fontWeight: 600,
          fontSize: 10, color: '#FFCB08', letterSpacing: '0.15em',
          textTransform: 'uppercase', marginBottom: 4,
        }}>
          {category}
        </div>
        <div style={{
          fontFamily: 'var(--font-barlow)', fontWeight: 700,
          fontSize: 15, color: hovered ? '#ffffff' : 'rgba(255,255,255,0.85)',
          transition: 'color 0.2s',
        }}>
          {title}
        </div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,203,8,0.5)" strokeWidth="2">
        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
      </svg>
    </div>
  )
}

export default function VideoSection() {
  return (
    <section style={{ backgroundColor: '#0F1924', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>

      <div style={{
        position: 'absolute', right: -200, top: '20%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(31,50,90,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div id="video-section-wrap" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          style={{ marginBottom: 56 }}
        >
          <span style={{
            display: 'inline-block',
            fontFamily: 'var(--font-barlow)', fontWeight: 600,
            fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase',
            color: '#FFCB08', marginBottom: 12, paddingLeft: 20, borderLeft: '3px solid #FFCB08',
          }}>
            Conheça a PENATEC
          </span>
          <h2 style={{
            fontFamily: 'var(--font-barlow)', fontWeight: 900,
            fontSize: 'clamp(32px, 4vw, 52px)',
            color: '#ffffff', lineHeight: 1.05, marginTop: 12,
          }}>
            Uma História de Excelência<br />em Imagens
          </h2>
        </motion.div>

        {/* Main layout: large video + sidebar */}
        <div id="video-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 3, alignItems: 'start' }}>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <MainVideo
              title="PENATEC — 50 Anos de Confiança e Excelência"
              description="Uma jornada de meio século construindo relações sólidas, entregando qualidade e inovando continuamente no fornecimento de produtos e serviços industriais."
            />
          </motion.div>

          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '24px' }}
          >
            <h4 style={{
              fontFamily: 'var(--font-barlow)', fontWeight: 800,
              fontSize: 15, color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              marginBottom: 4, paddingBottom: 16,
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}>
              Mais vídeos
            </h4>
            <SmallVideoMock title="Assessoria Técnica Especializada" duration="2:18" category="Serviços" />
            <SmallVideoMock title="Como Funciona Nossa Assistência" duration="3:05" category="Suporte" />
            <SmallVideoMock title="Depoimentos de Clientes PENATEC" duration="5:47" category="Clientes" />
            <SmallVideoMock title="Inovação e Tradição Industrial" duration="1:55" category="Institucional" />

            <button
              style={{
                marginTop: 20, width: '100%',
                backgroundColor: 'transparent', color: '#FFCB08',
                border: '1px solid rgba(255,203,8,0.3)', cursor: 'pointer',
                padding: '10px 16px', fontSize: 12, fontWeight: 700,
                fontFamily: 'var(--font-barlow)', letterSpacing: '0.1em', textTransform: 'uppercase',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,203,8,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              Ver Todos os Vídeos
            </button>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; } 50% { opacity:0.3; }
        }
        @media (max-width: 900px) {
          #video-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          #video-section-wrap { padding: 0 20px !important; }
          #video-layout > div:last-child { padding: 16px !important; }
        }
      `}</style>
    </section>
  )
}
