'use client'

import { ParticleTextEffect } from '@/components/ui/interactive-text-particle'

/*
 * Standalone "PENATEC" particle section.
 * Lives between DifferentialsSection and AdvisorySection as a dramatic visual interlude.
 * The user can hover / touch to scatter the golden particles.
 */

const PENATEC_GOLD = [
  'FFCB08', 'FFC500', 'FFD340', 'FFB000',
  'E69800', 'D48200', 'C06C00', 'A85800',
]

export default function ParticleTextSection() {
  return (
    <section
      id="particle-section"
      aria-label="PENATEC — seção interativa de partículas"
      style={{
        position: 'relative',
        backgroundColor: '#0F1924',
        overflow: 'hidden',
      }}
    >
      {/* Fine line grid */}
      <div className="line-grid" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Radial glow from center */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(31,50,90,0.4) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Gold glow accent */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,203,8,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Canvas container — determines particle size */}
      <div style={{ position: 'relative', zIndex: 2, height: 'clamp(280px, 40vw, 520px)', width: '100%' }}>
        <ParticleTextEffect
          text="PENATEC"
          colors={PENATEC_GOLD}
          animationForce={100}
          particleDensity={3}
        />
      </div>

      {/* Bottom caption */}
      <div style={{
        position: 'relative', zIndex: 3,
        textAlign: 'center',
        padding: '0 24px 56px',
        marginTop: -16,
      }}>
        {/* Gold rule */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
          <div style={{ height: 1, width: 64, background: 'linear-gradient(to right, transparent, rgba(255,203,8,0.5))' }} />
          <div style={{ width: 6, height: 6, backgroundColor: '#FFCB08', transform: 'rotate(45deg)', opacity: 0.7 }} />
          <div style={{ height: 1, width: 64, background: 'linear-gradient(to left, transparent, rgba(255,203,8,0.5))' }} />
        </div>

        <p style={{
          fontFamily: 'var(--font-barlow)', fontWeight: 700,
          fontSize: 'clamp(13px, 1.4vw, 17px)',
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.3em', textTransform: 'uppercase',
          marginBottom: 8,
        }}>
          Maquinário para Panificação Industrial
        </p>
        <p style={{
          fontFamily: 'var(--font-inter)', fontSize: 12,
          color: 'rgba(255,255,255,0.22)',
          letterSpacing: '0.1em',
        }}>
          ↑ Passe o cursor para interagir com as partículas
        </p>
      </div>

      {/* Top fade */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 80, zIndex: 4,
        background: 'linear-gradient(to bottom, #F4F6FA, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, zIndex: 4,
        background: 'linear-gradient(to top, #ffffff, transparent)',
        pointerEvents: 'none',
      }} />

      <style>{`
        @media (max-width: 768px) {
          #particle-section { display: none !important; }
        }
      `}</style>
    </section>
  )
}
