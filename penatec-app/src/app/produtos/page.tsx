'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { fadeUp, staggerContainer, EASE_EXPO } from '@/lib/animations'
import { type Tab, type Item, ALL_ITEMS } from '@/lib/products'

// ─── Card visual (consistent with GallerySection MockPhoto) ──────────────────

const PALETTES = {
  'dark-blue':  { bg: 'linear-gradient(135deg,#0a1628 0%,#1F325A 60%,#17233A 100%)', accent: '#FFCB08' },
  'graphite':   { bg: 'linear-gradient(135deg,#1a1a1a 0%,#2C2C2C 60%,#1a1a1a 100%)', accent: '#FFCB08' },
  'deep-navy':  { bg: 'linear-gradient(135deg,#0F1924 0%,#17233A 50%,#0a111c 100%)', accent: '#FFCB08' },
  'steel':      { bg: 'linear-gradient(135deg,#232b38 0%,#344155 60%,#232b38 100%)', accent: '#FFCB08' },
  'warm-dark':  { bg: 'linear-gradient(135deg,#1a1008 0%,#2a1a0a 50%,#17233A 100%)', accent: '#FFCB08' },
  'industrial': { bg: 'linear-gradient(160deg,#0d1520 0%,#1F325A 40%,#2a3a52 100%)', accent: '#FFCB08' },
}

function itemDetailHref(item: Item) {
  return item.tab === 'maquinas'
    ? `/produtos/maquinas/${item.id}#especificacoes`
    : `/produtos/${item.id}#especificacoes`
}

function ItemCard({ item, index }: { item: Item; index: number }) {
  const { bg, accent } = PALETTES[item.variant]

  const card = (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.42, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid rgba(23,35,58,0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'box-shadow 0.22s',
      }}
    >
      {/* Visual thumb */}
      <motion.div
        style={{ position: 'relative', height: 180, overflow: 'hidden', flexShrink: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.35, ease: EASE_EXPO }}
      >
        <div style={{ position: 'absolute', inset: 0, background: bg }} />

        {/* Industrial SVG pattern */}
        <svg
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.22 }}
          viewBox="0 0 300 180"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect x="80" y="30" width="140" height="120" rx="2" fill="none" stroke={accent} strokeWidth="0.8" />
          <rect x="100" y="50" width="100" height="80" rx="1" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.6" />
          <polyline points="80,30 64,30 64,46" fill="none" stroke={accent} strokeWidth="1" />
          <polyline points="220,30 236,30 236,46" fill="none" stroke={accent} strokeWidth="1" />
          <polyline points="80,150 64,150 64,134" fill="none" stroke={accent} strokeWidth="1" />
          <polyline points="220,150 236,150 236,134" fill="none" stroke={accent} strokeWidth="1" />
          <line x1="120" y1="90" x2="180" y2="90" stroke={accent} strokeWidth="0.5" opacity="0.5" />
          <line x1="150" y1="60" x2="150" y2="120" stroke={accent} strokeWidth="0.5" opacity="0.5" />
          <circle cx="150" cy="90" r="16" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.6" />
          <circle cx="150" cy="90" r="6" fill={accent} opacity="0.3" />
          <line x1="0" y1="15" x2="300" y2="15" stroke={accent} strokeWidth="0.3" opacity="0.3" strokeDasharray="3 6" />
          <line x1="0" y1="165" x2="300" y2="165" stroke={accent} strokeWidth="0.3" opacity="0.3" strokeDasharray="3 6" />
        </svg>

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
        }} />

        {/* Category chip */}
        <div style={{
          position: 'absolute', bottom: 14, left: 16,
          backgroundColor: accent, color: '#17233A',
          fontFamily: 'var(--font-barlow)', fontWeight: 700,
          fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
          padding: '3px 8px',
        }}>
          {item.category}
        </div>

        {/* Badge */}
        {item.badge && (
          <div style={{
            position: 'absolute', top: 14, right: 14,
            backgroundColor: '#17233A', color: '#FFCB08',
            fontFamily: 'var(--font-barlow)', fontWeight: 800,
            fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '4px 10px', border: '1px solid rgba(255,203,8,0.4)',
          }}>
            {item.badge}
          </div>
        )}
      </motion.div>

      {/* Text content */}
      <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontFamily: 'var(--font-barlow)', fontWeight: 800,
          fontSize: 19, color: '#17233A', lineHeight: 1.15, marginBottom: 10,
        }}>
          {item.name}
        </h3>
        <p style={{
          fontFamily: 'var(--font-inter)', fontSize: 13.5, lineHeight: 1.65,
          color: '#6B7280', flex: 1,
        }}>
          {item.description}
        </p>

        <div style={{
          marginTop: 20, paddingTop: 16,
          borderTop: '1px solid rgba(23,35,58,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{
            fontFamily: 'var(--font-barlow)', fontWeight: 700,
            fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: '#17233A',
          }}>
            Ver detalhes
          </span>
          <div style={{
            width: 32, height: 32,
            backgroundColor: '#17233A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFCB08" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    </motion.article>
  )

  return (
    <Link href={itemDetailHref(item)} style={{ textDecoration: 'none', display: 'block' }}>
      {card}
    </Link>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProdutosPage() {
  const [tab, setTab] = useState<Tab>('produtos')
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('Todos')
  const [filterOpen, setFilterOpen] = useState(true)

  const categories = useMemo(() => {
    const inTab = ALL_ITEMS.filter(i => i.tab === tab)
    const unique = Array.from(new Set(inTab.map(i => i.category)))
    return ['Todos', ...unique]
  }, [tab])

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim()
    return ALL_ITEMS.filter(item => {
      if (item.tab !== tab) return false
      if (activeCategory !== 'Todos' && item.category !== activeCategory) return false
      if (term && !item.name.toLowerCase().includes(term) && !item.description.toLowerCase().includes(term) && !item.category.toLowerCase().includes(term)) return false
      return true
    })
  }, [tab, activeCategory, search])

  const handleTabChange = (next: Tab) => {
    setTab(next)
    setActiveCategory('Todos')
  }

  return (
    <>
      <Header />

      <main style={{ minHeight: '100vh', backgroundColor: '#F4F6FA' }}>

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section id="produtos-hero" style={{
          backgroundColor: '#17233A',
          padding: '140px 0 72px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background grid pattern */}
          <svg
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              opacity: 0.06, pointerEvents: 'none',
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#FFCB08" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', position: 'relative' }}>
            {/* Breadcrumb */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}
            >
              <Link
                href="/"
                style={{
                  fontFamily: 'var(--font-inter)', fontSize: 13,
                  color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)' }}
              >
                Início
              </Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,203,8,0.45)" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                Portfólio
              </span>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.span
                variants={fadeUp}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-barlow)', fontWeight: 600,
                  fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase',
                  color: '#FFCB08', marginBottom: 14, paddingLeft: 20, borderLeft: '3px solid #FFCB08',
                }}
              >
                Portfólio Completo
              </motion.span>

              <motion.h1
                variants={fadeUp}
                style={{
                  fontFamily: 'var(--font-barlow)', fontWeight: 900,
                  fontSize: 'clamp(38px, 5vw, 68px)',
                  color: '#ffffff', lineHeight: 1.0, marginBottom: 16,
                }}
              >
                Produtos &amp; Máquinas
              </motion.h1>

              <motion.p
                variants={fadeUp}
                style={{
                  fontFamily: 'var(--font-inter)', fontSize: 16, lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.55)', maxWidth: 480,
                }}
              >
                Linha completa de equipamentos e produtos para o setor industrial,
                com qualidade e suporte especializado da PENATEC.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── Sticky filter bar ─────────────────────────────────────── */}
        <div style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid rgba(23,35,58,0.08)',
          position: 'sticky',
          top: 80,
          zIndex: 40,
        }}>
          <div className="filter-bar-inner" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

            {/* Tab switcher */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid rgba(23,35,58,0.08)',
              gap: 0,
            }}>
              {([
                { key: 'produtos' as Tab, label: 'Produtos', count: ALL_ITEMS.filter(i => i.tab === 'produtos').length },
                { key: 'maquinas' as Tab, label: 'Máquinas', count: ALL_ITEMS.filter(i => i.tab === 'maquinas').length },
              ] as const).map(t => (
                <button
                  key={t.key}
                  onClick={() => handleTabChange(t.key)}
                  className="tab-btn"
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '20px 28px',
                    fontFamily: 'var(--font-barlow)', fontWeight: 800,
                    fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase',
                    color: tab === t.key ? '#17233A' : 'rgba(23,35,58,0.35)',
                    borderBottom: tab === t.key ? '3px solid #FFCB08' : '3px solid transparent',
                    marginBottom: -1,
                    transition: 'color 0.2s, border-color 0.2s',
                    display: 'flex', alignItems: 'center', gap: 8,
                    flexShrink: 0,
                  }}
                >
                  {t.label}
                  <span style={{
                    fontFamily: 'var(--font-inter)', fontWeight: 600,
                    fontSize: 11,
                    backgroundColor: tab === t.key ? '#FFCB08' : 'rgba(23,35,58,0.07)',
                    color: tab === t.key ? '#17233A' : 'rgba(23,35,58,0.45)',
                    padding: '2px 7px',
                    borderRadius: 20,
                    transition: 'background-color 0.2s, color 0.2s',
                  }}>
                    {t.count}
                  </span>
                </button>
              ))}

              {/* Mobile filter toggle */}
              <button
                className="filter-toggle-btn"
                onClick={() => setFilterOpen(o => !o)}
                style={{
                  marginLeft: 'auto',
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '10px 16px',
                  display: 'none',
                  alignItems: 'center', gap: 6,
                  alignSelf: 'center',
                  fontFamily: 'var(--font-barlow)', fontWeight: 700,
                  fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: filterOpen ? '#17233A' : 'rgba(23,35,58,0.45)',
                  transition: 'color 0.2s',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="11" y1="18" x2="13" y2="18" />
                </svg>
                Filtros
                <motion.svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  animate={{ rotate: filterOpen ? 180 : 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </button>
            </div>

            {/* Search + category chips */}
            <AnimatePresence initial={false}>
              {filterOpen && (
                <motion.div
                  key="filter-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="filter-panel-inner">
                    {/* Search */}
                    <div className="filter-search-wrapper" style={{ position: 'relative' }}>
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="rgba(23,35,58,0.35)" strokeWidth="2"
                        style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Buscar..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="filter-search-input"
                        style={{
                          paddingLeft: 38, paddingRight: 14, paddingTop: 9, paddingBottom: 9,
                          border: '1px solid rgba(23,35,58,0.14)',
                          fontFamily: 'var(--font-inter)', fontSize: 14,
                          color: '#17233A', width: 220,
                          outline: 'none',
                          backgroundColor: '#F4F6FA',
                          transition: 'border-color 0.2s',
                          boxSizing: 'border-box',
                        }}
                        onFocus={e => { e.currentTarget.style.borderColor = '#FFCB08' }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(23,35,58,0.14)' }}
                      />
                    </div>

                    {/* Desktop: category chips */}
                    <div className="filter-chips" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          style={{
                            background: activeCategory === cat ? '#17233A' : 'transparent',
                            color: activeCategory === cat ? '#ffffff' : 'rgba(23,35,58,0.55)',
                            border: activeCategory === cat ? '1px solid #17233A' : '1px solid rgba(23,35,58,0.15)',
                            cursor: 'pointer',
                            padding: '6px 14px',
                            fontFamily: 'var(--font-barlow)', fontWeight: 700,
                            fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase',
                            transition: 'all 0.18s',
                          }}
                          onMouseEnter={e => {
                            if (activeCategory !== cat) {
                              e.currentTarget.style.borderColor = '#17233A'
                              e.currentTarget.style.color = '#17233A'
                            }
                          }}
                          onMouseLeave={e => {
                            if (activeCategory !== cat) {
                              e.currentTarget.style.borderColor = 'rgba(23,35,58,0.15)'
                              e.currentTarget.style.color = 'rgba(23,35,58,0.55)'
                            }
                          }}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Mobile: category select */}
                    <select
                      className="filter-select"
                      value={activeCategory}
                      onChange={e => setActiveCategory(e.target.value)}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>

                    {/* Result count */}
                    <span style={{
                      fontFamily: 'var(--font-inter)', fontSize: 13,
                      color: 'rgba(23,35,58,0.4)', flexShrink: 0, whiteSpace: 'nowrap',
                    }}>
                      {filtered.length} {filtered.length === 1 ? 'item' : 'itens'}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Grid ──────────────────────────────────────────────────── */}
        <section className="produtos-grid-section" style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 40px 96px' }}>
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={`${tab}-${activeCategory}-${search}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 24,
                }}
                className="produtos-grid"
              >
                {filtered.map((item, i) => (
                  <ItemCard key={item.id} item={item} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: 'center', padding: '80px 0' }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(23,35,58,0.2)" strokeWidth="1.5" style={{ margin: '0 auto 20px', display: 'block' }}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <p style={{
                  fontFamily: 'var(--font-barlow)', fontWeight: 700,
                  fontSize: 18, color: 'rgba(23,35,58,0.35)',
                }}>
                  Nenhum resultado encontrado para &ldquo;{search}&rdquo;
                </p>
                <button
                  onClick={() => { setSearch(''); setActiveCategory('Todos') }}
                  style={{
                    marginTop: 16, background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-barlow)', fontWeight: 700,
                    fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: '#FFCB08', textDecoration: 'underline',
                  }}
                >
                  Limpar filtros
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ── CTA faixa ─────────────────────────────────────────────── */}
        <section style={{ backgroundColor: '#17233A', padding: '72px 0' }}>
          <div className="produtos-cta-inner" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
            >
              <span style={{
                display: 'inline-block',
                fontFamily: 'var(--font-barlow)', fontWeight: 600,
                fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase',
                color: '#FFCB08', marginBottom: 14, paddingLeft: 20, borderLeft: '3px solid #FFCB08',
              }}>
                Fale conosco
              </span>
              <h2 style={{
                fontFamily: 'var(--font-barlow)', fontWeight: 900,
                fontSize: 'clamp(28px, 3vw, 44px)',
                color: '#ffffff', lineHeight: 1.1, marginBottom: 12,
              }}>
                Não encontrou o que precisava?
              </h2>
              <p style={{
                fontFamily: 'var(--font-inter)', fontSize: 15, lineHeight: 1.7,
                color: 'rgba(255,255,255,0.55)', maxWidth: 460, margin: '0 auto 32px',
              }}>
                Nossa equipe técnica está pronta para encontrar a solução ideal para sua necessidade.
              </p>
              <Link
                href="/#contato"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  backgroundColor: '#FFCB08', color: '#17233A',
                  textDecoration: 'none',
                  padding: '14px 40px', fontSize: 13, fontWeight: 800,
                  fontFamily: 'var(--font-barlow)', letterSpacing: '0.08em', textTransform: 'uppercase',
                  transition: 'opacity 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.9'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)' }}
              >
                Solicitar Atendimento
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .filter-panel-inner {
          padding: 16px 0;
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .filter-select { display: none; }

        @media (max-width: 1024px) {
          .produtos-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 640px) {
          .produtos-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          #produtos-hero { padding: 120px 0 56px !important; }
          #produtos-hero > div { padding: 0 20px !important; }
          .produtos-grid-section { padding: 40px 16px 72px !important; }
          .produtos-cta-inner { padding: 0 16px !important; }

          .filter-bar-inner { padding: 0 12px !important; }
          .filter-toggle-btn { display: flex !important; }

          .tab-btn {
            padding: 14px 14px !important;
            font-size: 12px !important;
            letter-spacing: 0.04em !important;
          }

          .filter-panel-inner {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
            padding: 12px 0 !important;
          }
          .filter-search-wrapper { width: 100% !important; }
          .filter-search-input { width: 100% !important; box-sizing: border-box !important; }
          .filter-chips { display: none !important; }
          .filter-select {
            display: block !important;
            width: 100%;
            padding: 10px 12px;
            border: 1px solid rgba(23,35,58,0.14);
            background-color: #F4F6FA;
            font-family: var(--font-barlow);
            font-weight: 700;
            font-size: 13px;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: #17233A;
            outline: none;
          }
        }
      `}</style>
    </>
  )
}
