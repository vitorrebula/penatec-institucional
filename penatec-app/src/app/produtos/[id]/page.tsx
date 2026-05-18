'use client'

import { use } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { fadeUp, fadeLeft, fadeRight, staggerContainer } from '@/lib/animations'

interface ProductDetail {
  id: number
  name: string
  category: string
  description: string
  tagline: string
  variant: 'dark-blue' | 'graphite' | 'deep-navy' | 'steel' | 'warm-dark' | 'industrial'
  badge?: string
  specs: { label: string; value: string }[]
}

const PALETTES: Record<string, string> = {
  'dark-blue':  'linear-gradient(135deg,#0a1628 0%,#1F325A 60%,#17233A 100%)',
  'graphite':   'linear-gradient(135deg,#1a1a1a 0%,#2C2C2C 60%,#1a1a1a 100%)',
  'deep-navy':  'linear-gradient(135deg,#0F1924 0%,#17233A 50%,#0a111c 100%)',
  'steel':      'linear-gradient(135deg,#232b38 0%,#344155 60%,#232b38 100%)',
  'warm-dark':  'linear-gradient(135deg,#1a1008 0%,#2a1a0a 50%,#17233A 100%)',
  'industrial': 'linear-gradient(160deg,#0d1520 0%,#1F325A 40%,#2a3a52 100%)',
}

const PRODUCTS: ProductDetail[] = [
  { id: 1, name: 'Misturador de Ingredientes', category: 'Linha Industrial', variant: 'dark-blue',
    description: 'Misturador de alta capacidade para produção contínua, com controle eletrônico de velocidade e cuba em aço inox.',
    tagline: 'Homogeneidade perfeita a cada ciclo.',
    specs: [{ label: 'Capacidade da cuba', value: '20 L' }, { label: 'Motor', value: '1,5 CV' }, { label: 'Material', value: 'Aço inox 304' }, { label: 'Controle', value: 'Eletrônico de velocidade' }, { label: 'Rotação máx.', value: '1.400 rpm' }] },
  { id: 2, name: 'Balança Digital Industrial', category: 'Linha Técnica', variant: 'graphite',
    description: 'Pesagem de precisão com display retroiluminado, capacidade de até 30 kg e resolução de 1 g.',
    tagline: 'Precisão que não mente.',
    specs: [{ label: 'Capacidade máx.', value: '30 kg' }, { label: 'Resolução', value: '1 g' }, { label: 'Display', value: 'LCD retroiluminado' }, { label: 'Interface', value: 'RS-232 / USB' }, { label: 'Plataforma', value: 'Aço inox' }] },
  { id: 3, name: 'Cortador de Frios', category: 'Linha Industrial', variant: 'steel',
    description: 'Fatiamento uniforme de embutidos e queijos com lâmina de aço temperado e espessura regulável.',
    tagline: 'Cada fatia com espessura exata.',
    specs: [{ label: 'Lâmina', value: 'Aço temperado 220 mm' }, { label: 'Espessura de corte', value: '0 a 15 mm' }, { label: 'Prato', value: '220 × 170 mm' }, { label: 'Motor', value: '180 W' }, { label: 'Tensão', value: '110V / 220V' }] },
  { id: 4, name: 'Dosador de Ingredientes', category: 'Linha Técnica', variant: 'warm-dark',
    description: 'Dosagem volumétrica automatizada para farinhas, açúcares e aditivos com alta repetibilidade.',
    tagline: 'Dose certa. Sem desperdício.',
    specs: [{ label: 'Princípio', value: 'Volumétrico' }, { label: 'Dose por ciclo', value: '5 g a 2 kg' }, { label: 'Precisão', value: '± 0,5%' }, { label: 'Material', value: 'Aço inox / PP' }, { label: 'Controle', value: 'Painel digital' }] },
  { id: 5, name: 'Seladora de Embalagens', category: 'Embalagem', variant: 'industrial',
    description: 'Selagem contínua a calor para filmes plásticos e embalagens flexíveis, com ajuste de temperatura.',
    tagline: 'Selagem segura. Produto protegido.',
    specs: [{ label: 'Tipo de selagem', value: 'Contínua a calor' }, { label: 'Temperatura', value: '0 a 200°C (ajustável)' }, { label: 'Velocidade', value: 'até 12 m/min' }, { label: 'Largura da barra', value: '10 mm' }, { label: 'Tensão', value: '220V' }] },
  { id: 6, name: 'Liquidificador Industrial', category: 'Linha Industrial', variant: 'deep-navy',
    description: 'Motor de alta rotação com copo de 4 L em aço inox, ideal para processamento contínuo.',
    tagline: 'Potência para processar sem parar.',
    specs: [{ label: 'Volume do copo', value: '4 L' }, { label: 'Material do copo', value: 'Aço inox 304' }, { label: 'Motor', value: '1 CV' }, { label: 'Rotação máx.', value: '18.000 rpm' }, { label: 'Base', value: 'Borracha antiderrapante' }] },
  { id: 7, name: 'Extrator de Suco', category: 'Linha Técnica', variant: 'graphite', badge: 'Novo',
    description: 'Alta eficiência de extração com separação automática de polpa e capacidade de 30 L/h.',
    tagline: 'Extração máxima. Desperdício zero.',
    specs: [{ label: 'Capacidade', value: '30 L/h' }, { label: 'Separação de polpa', value: 'Automática' }, { label: 'Filtro', value: 'Aço inox perfurado' }, { label: 'Motor', value: '0,5 CV' }, { label: 'Dreno', value: 'Lateral com registro' }] },
  { id: 8, name: 'Fritadeira Industrial', category: 'Linha Industrial', variant: 'dark-blue',
    description: 'Capacidade de 20 L de óleo com termostato digital, dreno de fundo e estrutura em aço inox.',
    tagline: 'Fritura uniforme. Alta produtividade.',
    specs: [{ label: 'Volume de óleo', value: '20 L' }, { label: 'Termostato', value: 'Digital 0–200°C' }, { label: 'Cesto', value: 'Aço inox com gancho' }, { label: 'Dreno de fundo', value: 'Com válvula' }, { label: 'Tensão', value: '220V monofásico' }] },
  { id: 9, name: 'Fogão Industrial 6 Bocas', category: 'Linha Premium', variant: 'steel', badge: 'Destaque',
    description: 'Queimadores de alta BTU com grelhas de ferro fundido e mesa em aço inox 304.',
    tagline: 'Potência de chef. Estrutura que dura.',
    specs: [{ label: 'Queimadores', value: '6 duplo-fogo' }, { label: 'BTU total', value: '180.000 BTU/h' }, { label: 'Grelhas', value: 'Ferro fundido' }, { label: 'Mesa', value: 'Aço inox 304' }, { label: 'Combustível', value: 'GN ou GLP' }] },
  { id: 10, name: 'Chapa para Lanches', category: 'Linha Técnica', variant: 'warm-dark',
    description: 'Superfície em aço laminado com resistência de aquecimento dupla e regulagem de temperatura.',
    tagline: 'Temperatura certa para o ponto perfeito.',
    specs: [{ label: 'Superfície', value: 'Aço laminado 6 mm' }, { label: 'Aquecimento', value: 'Resistências duplas' }, { label: 'Temperatura máx.', value: '300°C' }, { label: 'Regulagem', value: 'Termostato ajustável' }, { label: 'Dimensões', value: '40 × 70 cm' }] },
  { id: 11, name: 'Processador de Alimentos', category: 'Linha Premium', variant: 'industrial',
    description: 'Múltiplos discos de corte intercambiáveis para fatiamento, ralação e moagem com capacidade de 8 kg/min.',
    tagline: 'Versatilidade industrial. Um equipamento, mil possibilidades.',
    specs: [{ label: 'Capacidade', value: '8 kg/min' }, { label: 'Discos inclusos', value: '5 tipos' }, { label: 'Cuba', value: 'Aço inox 2 L' }, { label: 'Motor', value: '0,75 CV' }, { label: 'Velocidades', value: '2 + pulso' }] },
  { id: 12, name: 'Estufa de Fermentação', category: 'Linha Premium', variant: 'deep-navy',
    description: 'Controle de temperatura e umidade com circulação forçada de ar, capacidade para 24 formas.',
    tagline: 'Condições ideais. Resultado consistente.',
    specs: [{ label: 'Capacidade', value: '24 formas (60×40)' }, { label: 'Temperatura', value: '25°C a 45°C' }, { label: 'Umidade', value: '60% a 95% UR' }, { label: 'Circulação', value: 'Forçada com ventilador' }, { label: 'Painel', value: 'Digital com timer' }] },
]

const PRODUCTS_MAP: Record<number, ProductDetail> = Object.fromEntries(PRODUCTS.map(p => [p.id, p]))

function ProductSVGPattern() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.25 }}
      viewBox="0 0 600 400"
      preserveAspectRatio="xMidYMid slice"
    >
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
      <text x="300" y="358" textAnchor="middle" fill="#FFCB08" fontSize="9" fontFamily="monospace" opacity="0.35" letterSpacing="5">PENATEC INDUSTRIAL</text>
    </svg>
  )
}

export default function ProdutoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const product = PRODUCTS_MAP[Number(id)]
  if (!product) notFound()

  const heroGradient = PALETTES[product.variant]

  return (
    <>
      <Header />

      <main style={{ minHeight: '100vh' }}>

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section id="produto-hero" style={{
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

          <div className="produto-hero-deco" style={{
            position: 'absolute', right: 0, top: 0, bottom: 0,
            width: '42%', overflow: 'hidden', opacity: 0.18,
          }}>
            <div style={{ position: 'absolute', inset: 0, background: heroGradient }} />
            <ProductSVGPattern />
          </div>

          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', position: 'relative' }} className="produto-hero-inner">
            {/* Breadcrumb */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}
            >
              {[
                { label: 'Início', href: '/' },
                { label: 'Portfólio', href: '/produtos' },
                { label: 'Produtos', href: '/produtos' },
              ].map((crumb) => (
                <span key={crumb.href + crumb.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
                {product.name}
              </span>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'var(--font-barlow)', fontWeight: 600,
                  fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase',
                  color: '#FFCB08', paddingLeft: 20, borderLeft: '3px solid #FFCB08',
                }}>
                  {product.category}
                </span>
                {product.badge && (
                  <span style={{
                    backgroundColor: '#FFCB08', color: '#17233A',
                    fontFamily: 'var(--font-barlow)', fontWeight: 800,
                    fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                    padding: '4px 10px',
                  }}>
                    {product.badge}
                  </span>
                )}
              </motion.div>

              <motion.h1 variants={fadeUp} style={{
                fontFamily: 'var(--font-barlow)', fontWeight: 900,
                fontSize: 'clamp(40px, 6vw, 80px)',
                color: '#ffffff', lineHeight: 1.0, marginBottom: 20,
                maxWidth: 700,
              }}>
                {product.name}
              </motion.h1>

              <motion.p variants={fadeUp} style={{
                fontFamily: 'var(--font-barlow)', fontWeight: 700,
                fontSize: 'clamp(18px, 2.2vw, 26px)',
                color: 'rgba(255,203,8,0.85)', lineHeight: 1.3,
                marginBottom: 14, maxWidth: 520,
              }}>
                {product.tagline}
              </motion.p>

              <motion.p variants={fadeUp} style={{
                fontFamily: 'var(--font-inter)', fontSize: 15.5, lineHeight: 1.7,
                color: 'rgba(255,255,255,0.5)', maxWidth: 460, marginBottom: 40,
              }}>
                {product.description}
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
                  Solicitar informações
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Imagem + Especificações ───────────────────────────────── */}
        <section id="especificacoes" style={{ backgroundColor: '#F4F6FA', padding: '80px 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }} className="produto-specs-inner">
            <div className="produto-specs-grid">

              {/* Image */}
              <motion.div
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'relative', height: 460, overflow: 'hidden' }} className="produto-main-img-wrap">
                  <div style={{ position: 'absolute', inset: 0, background: heroGradient }} />
                  <ProductSVGPattern />
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
                </div>
              </motion.div>

              {/* Specs */}
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
                  Dados do Produto
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {product.specs.map((spec, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '16px 0',
                      borderBottom: '1px solid rgba(23,35,58,0.08)',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-inter)', fontSize: 13.5,
                        color: 'rgba(23,35,58,0.5)', display: 'flex', alignItems: 'center', gap: 10,
                      }}>
                        <span style={{
                          width: 6, height: 6, backgroundColor: '#FFCB08', flexShrink: 0,
                          display: 'inline-block',
                        }} />
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

                <div style={{ marginTop: 36, paddingTop: 28, borderTop: '2px solid rgba(23,35,58,0.1)' }}>
                  <p style={{
                    fontFamily: 'var(--font-inter)', fontSize: 13, lineHeight: 1.6,
                    color: 'rgba(23,35,58,0.4)', marginBottom: 20,
                  }}>
                    Especificações sujeitas a alteração sem aviso prévio. Consulte nossa equipe para mais detalhes.
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

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: '#17233A', padding: '80px 0' }}>
          <div className="produto-section-pad" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
            <div className="produto-cta-inner">

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
                  color: '#ffffff', lineHeight: 1.05, marginBottom: 16,
                }}>
                  Quer saber mais sobre<br />o {product.name}?
                </h2>
                <p style={{
                  fontFamily: 'var(--font-inter)', fontSize: 15, lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.5)', maxWidth: 440,
                }}>
                  Nossa equipe está pronta para apresentar uma proposta personalizada e esclarecer todas as suas dúvidas.
                </p>
              </motion.div>

              <motion.div
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="produto-cta-panel"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)', padding: '48px 44px',
                  border: '1px solid rgba(255,255,255,0.1)',
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
                    Ver outros produtos
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
        .produto-hero-inner { max-width: 700px; }

        .produto-specs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .produto-cta-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .produto-hero-inner { max-width: 100% !important; }
          .produto-specs-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .produto-cta-inner { grid-template-columns: 1fr !important; gap: 40px !important; }
        }

        @media (max-width: 768px) {
          .produto-hero-deco { display: none; }
        }

        @media (max-width: 640px) {
          #produto-hero { padding: 120px 0 56px !important; }
          .produto-hero-inner { padding: 0 16px !important; }
          .produto-specs-inner { padding: 0 16px !important; }
          .produto-section-pad { padding: 0 16px !important; }
          .produto-main-img-wrap { height: 280px !important; }
          .produto-cta-panel { padding: 32px 24px !important; }
        }
      `}</style>
    </>
  )
}
