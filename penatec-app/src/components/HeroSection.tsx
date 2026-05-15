'use client';

import Image from 'next/image';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

/*
 * PLACEHOLDERS — replace with real PENATEC assets:
 *
 * HERO_VIDEO_SRC   → MP4 of industrial bread-making machinery (or YouTube URL)
 * HERO_POSTER_SRC  → Still frame / thumbnail for the video
 * HERO_BG_SRC      → High-res photo of factory / industrial bakery environment
 *
 * Recommended resolution: video 1920×1080, bg image 1920×1080 minimum.
 */
const HERO_VIDEO_SRC =
  'https://penatec.com.br/wp-content/uploads/2024/08/WhatsApp-Video-2024-07-15-at-14.52.28_1.mp4';

const HERO_POSTER_SRC =
  'https://images.pexels.com/photos/5490228/pexels-photo-5490228.jpeg?auto=compress&cs=tinysrgb&w=1280';

// Dark industrial bakery environment background
const HERO_BG_SRC =
  './paes.svg';

const STATS = [
  { value: '+50', label: 'Anos de Experiência' },
  { value: '100%', label: 'Atendimento Especializado' },
  { value: '6d/sem', label: 'Assistência Técnica' },
  { value: 'Regional', label: 'Área de Atuação' },
];

function HeroChildren() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: '#17233A' }}>
      {/* Stats bar */}
      <div style={{
        borderTop: '1px solid rgba(255,203,8,0.15)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backgroundColor: 'rgba(10,17,28,0.9)',
      }}>
        <div className="stats-inner" style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 40px',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {STATS.map((stat, i) => (
            <div key={i} style={{
              padding: '24px 16px', textAlign: 'center',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-barlow)', fontWeight: 900,
                fontSize: 30, color: '#FFCB08', lineHeight: 1, marginBottom: 4,
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-inter)', fontSize: 12,
                color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post-expand content — brief intro + CTAs */}
      <div className="hero-content-wrap" style={{ padding: '80px 40px', maxWidth: 1280, margin: '0 auto' }}>
        <div className="hero-post-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

          <div>
            <div style={{ marginBottom: 28 }}>
              <Image
                src="/logo_penatecsombraespalhada-1-1.png"
                alt="PENATEC"
                width={160}
                height={76}
                style={{ objectFit: 'contain', height: 76, width: 'auto' }}
              />
            </div>
            <span style={{
              display: 'inline-block',
              fontFamily: 'var(--font-barlow)', fontWeight: 600,
              fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase',
              color: '#FFCB08', marginBottom: 16,
              paddingLeft: 20, borderLeft: '3px solid #FFCB08',
            }}>
              Especialistas em Maquinário para Panificação
            </span>
            <h2 style={{
              fontFamily: 'var(--font-barlow)', fontWeight: 900,
              fontSize: 'clamp(32px, 3.5vw, 52px)',
              color: '#ffffff', lineHeight: 1.05,
              letterSpacing: '-0.01em', marginTop: 12, marginBottom: 20,
            }}>
              Mais de 50 anos entregando confiança, inovação e excelência.
            </h2>
            <p style={{
              fontFamily: 'var(--font-inter)', fontSize: 17, lineHeight: 1.75,
              color: 'rgba(255,255,255,0.6)', marginBottom: 36,
            }}>
              A PENATEC se destaca pela qualidade, confiança e inovação no fornecimento
              de produtos e serviços, oferecendo soluções eficientes e suporte especializado
              para impulsionar o sucesso dos seus clientes.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button
                onClick={() => scrollTo('#contato')}
                style={{
                  backgroundColor: '#FFCB08', color: '#17233A',
                  border: 'none', cursor: 'pointer',
                  padding: '14px 32px', fontSize: 13, fontWeight: 800,
                  fontFamily: 'var(--font-barlow)', letterSpacing: '0.08em', textTransform: 'uppercase',
                  transition: 'opacity 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Solicitar Atendimento
              </button>
              <button
                onClick={() => scrollTo('#sobre')}
                style={{
                  backgroundColor: 'transparent', color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer',
                  padding: '14px 32px', fontSize: 13, fontWeight: 600,
                  fontFamily: 'var(--font-barlow)', letterSpacing: '0.08em', textTransform: 'uppercase',
                  transition: 'border-color 0.2s, background-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#FFCB08'; e.currentTarget.style.backgroundColor = 'rgba(255,203,8,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                Falar com Especialista
              </button>
            </div>
          </div>

          {/* Right side — industrial feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { icon: '⚙', label: 'Maquinário para panificação industrial' },
              { icon: '🔧', label: 'Assistência técnica especializada' },
              { icon: '📦', label: 'Fornecimento de peças e componentes' },
              { icon: '🏆', label: 'Assessoria e suporte técnico completo' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 20,
                padding: '20px 0',
                borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}>
                <div style={{
                  width: 40, height: 40,
                  backgroundColor: 'rgba(255,203,8,0.1)',
                  border: '1px solid rgba(255,203,8,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <span style={{
                  fontFamily: 'var(--font-inter)', fontSize: 16,
                  color: 'rgba(255,255,255,0.75)', lineHeight: 1.4,
                }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-post-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .stats-inner { grid-template-columns: repeat(2, 1fr) !important; padding: 0 20px !important; }
          .hero-content-wrap { padding: 48px 20px !important; }
        }
      `}</style>
    </div>
  );
}

export default function HeroSection() {
  return (
    <div id="inicio">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={HERO_VIDEO_SRC}
        posterSrc={HERO_POSTER_SRC}
        bgImageSrc={HERO_BG_SRC}
        /*
         * "PENATEC" becomes the first word (moves LEFT on scroll).
         * "Maquinário Industrial" becomes the rest (moves RIGHT).
         */
        title="PENATEC Maquinário Industrial"
        date="50+ Anos de Excelência"
        scrollToExpand="Role para explorar"
        accentColor="#FFCB08"
        titleColor="#ffffff"
      >
        <HeroChildren />
      </ScrollExpandMedia>
    </div>
  );
}
