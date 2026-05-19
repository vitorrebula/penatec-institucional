'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Search, Plus, ImageOff, Pencil, Trash2, Check, Package, Cpu } from 'lucide-react'
import type { Product } from '@/lib/types'

const TAB_LABELS: Record<string, string> = { produtos: 'Produto', maquinas: 'Máquina' }

const VARIANT_LABELS: Record<string, string> = {
  'dark-blue': 'Dark Blue',
  graphite: 'Graphite',
  'deep-navy': 'Deep Navy',
  steel: 'Steel',
  'warm-dark': 'Warm Dark',
  industrial: 'Industrial',
}

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [tabFilter, setTabFilter] = useState<'todos' | 'produtos' | 'maquinas'>('todos')

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    setProducts(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  async function handleDelete(product: Product) {
    if (!confirm(`Excluir "${product.name}"? Esta ação não pode ser desfeita.`)) return
    setDeletingId(product.id)
    if (product.image_public_id) {
      await fetch(`/api/upload?public_id=${encodeURIComponent(product.image_public_id)}`, { method: 'DELETE' })
    }
    const supabase = createClient()
    await supabase.from('products').delete().eq('id', product.id)
    setDeletingId(null)
    fetchProducts()
  }

  const filtered = products.filter((p) => {
    if (tabFilter !== 'todos' && p.tab !== tabFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    }
    return true
  })

  return (
    <div className="admin-page">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 900,
              fontSize: 'clamp(22px, 5vw, 32px)',
              color: '#17233A',
              lineHeight: 1.1,
              marginBottom: 4,
            }}
          >
            Produtos &amp; Máquinas
          </h1>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(23,35,58,0.45)' }}>
            {loading ? '—' : `${products.length} ${products.length === 1 ? 'item cadastrado' : 'itens cadastrados'}`}
          </p>
        </div>

        <Link href="/produtos/novo" className="btn-primary flex-shrink-0">
          <Plus size={14} strokeWidth={2.5} />
          <span className="hidden sm:inline">Novo item</span>
          <span className="sm:hidden">Novo</span>
        </Link>
      </div>

      {/* ── Filters ── */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid rgba(23,35,58,0.08)',
          marginBottom: 16,
          overflow: 'hidden',
        }}
      >
        {/* Search row */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(23,35,58,0.06)' }}>
          <div style={{ position: 'relative' }}>
            <Search
              size={15}
              strokeWidth={2}
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(23,35,58,0.3)',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              placeholder="Buscar por nome, categoria..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: 38 }}
            />
          </div>
        </div>

        {/* Tabs + count row */}
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="filter-tabs-row" style={{ flex: 1 }}>
            {(['todos', 'produtos', 'maquinas'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTabFilter(t)}
                className="flex-shrink-0 flex items-center gap-1.5 transition-all duration-150 active:scale-95"
                style={{
                  padding: '6px 14px',
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: tabFilter === t ? '1px solid #17233A' : '1px solid rgba(23,35,58,0.12)',
                  backgroundColor: tabFilter === t ? '#17233A' : 'transparent',
                  color: tabFilter === t ? '#ffffff' : 'rgba(23,35,58,0.5)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {t === 'maquinas' && <Cpu size={10} />}
                {t === 'produtos' && <Package size={10} />}
                {t === 'todos' ? 'Todos' : t === 'produtos' ? 'Produtos' : 'Máquinas'}
              </button>
            ))}
          </div>

          <span
            className="flex-shrink-0"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 12,
              color: 'rgba(23,35,58,0.35)',
              whiteSpace: 'nowrap',
            }}
          >
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid rgba(23,35,58,0.08)',
            padding: '64px',
            textAlign: 'center',
            fontFamily: 'var(--font-barlow)',
            fontWeight: 700,
            fontSize: 13,
            color: 'rgba(23,35,58,0.3)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Carregando...
        </div>
      )}

      {/* ── Empty state ── */}
      {!loading && filtered.length === 0 && (
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid rgba(23,35,58,0.08)',
            padding: '64px 32px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              backgroundColor: 'rgba(23,35,58,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <Package size={22} color="rgba(23,35,58,0.25)" strokeWidth={1.5} />
          </div>
          <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 15, color: 'rgba(23,35,58,0.35)', marginBottom: 4 }}>
            {search || tabFilter !== 'todos' ? 'Nenhum resultado encontrado' : 'Nenhum item cadastrado ainda'}
          </p>
          {!search && tabFilter === 'todos' && (
            <Link href="/produtos/novo" className="btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>
              <Plus size={13} />
              Cadastrar primeiro item
            </Link>
          )}
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <>
          {/* ── Desktop Table ── */}
          <div className="product-table-wrapper" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(23,35,58,0.08)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(23,35,58,0.08)' }}>
                  {['Imagem', 'Nome', 'Categoria', 'Tipo', 'Destaque', 'Badge', 'Ações'].map((h) => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(23,35,58,0.45)', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((product, i) => (
                  <tr
                    key={product.id}
                    style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(23,35,58,0.06)' : 'none', transition: 'background-color 0.12s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F4F6FA' }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                  >
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ width: 52, height: 40, backgroundColor: '#17233A', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {product.image_url ? (
                          <Image src={product.image_url} alt={product.name} width={52} height={40} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                        ) : (
                          <ImageOff size={16} color="rgba(255,203,8,0.35)" strokeWidth={1.5} />
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 14, color: '#17233A', display: 'block' }}>{product.name}</span>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(23,35,58,0.38)', marginTop: 2, display: 'block' }}>{VARIANT_LABELS[product.variant] ?? product.variant}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'rgba(23,35,58,0.7)' }}>{product.category}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ display: 'inline-block', padding: '3px 10px', backgroundColor: product.tab === 'maquinas' ? 'rgba(23,35,58,0.07)' : 'rgba(255,203,8,0.12)', fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: product.tab === 'maquinas' ? '#17233A' : '#8B6D00' }}>
                        {TAB_LABELS[product.tab]}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      {product.destaque
                        ? <Check size={15} color="#FFCB08" strokeWidth={2.5} />
                        : <span style={{ color: 'rgba(23,35,58,0.18)', fontSize: 18 }}>—</span>
                      }
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      {product.badge
                        ? <span style={{ display: 'inline-block', padding: '2px 8px', border: '1px solid rgba(23,35,58,0.2)', fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(23,35,58,0.55)' }}>{product.badge}</span>
                        : <span style={{ color: 'rgba(23,35,58,0.18)', fontSize: 18 }}>—</span>
                      }
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Link href={`/produtos/${product.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', border: '1px solid rgba(23,35,58,0.15)', fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#17233A', textDecoration: 'none', transition: 'border-color 0.15s' }}>
                          <Pencil size={11} strokeWidth={2.5} />
                          Editar
                        </Link>
                        <button className="btn-danger" onClick={() => handleDelete(product)} disabled={deletingId === product.id} style={{ opacity: deletingId === product.id ? 0.5 : 1 }}>
                          <Trash2 size={11} strokeWidth={2.5} />
                          {deletingId === product.id ? '...' : 'Excluir'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Mobile Cards ── */}
          <div className="product-mobile-cards">
            {filtered.map((product, i) => (
              <article
                key={product.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(23,35,58,0.08)',
                  borderLeft: `3px solid ${product.destaque ? '#FFCB08' : 'rgba(23,35,58,0.08)'}`,
                  animation: 'cardSlideIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) both',
                  animationDelay: `${i * 45}ms`,
                }}
              >
                {/* Card body */}
                <div className="flex gap-3 p-4">
                  {/* Thumbnail */}
                  <div
                    style={{
                      width: 60,
                      height: 52,
                      backgroundColor: '#17233A',
                      flexShrink: 0,
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}
                  >
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        width={60}
                        height={52}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    ) : (
                      <ImageOff size={18} color="rgba(255,203,8,0.3)" strokeWidth={1.5} />
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-barlow)',
                        fontWeight: 800,
                        fontSize: 15,
                        color: '#17233A',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        lineHeight: 1.2,
                        marginBottom: 3,
                      }}
                    >
                      {product.name}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: 12,
                        color: 'rgba(23,35,58,0.42)',
                        marginBottom: 8,
                      }}
                    >
                      {product.category}
                    </p>

                    {/* Tags row */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          padding: '2px 8px',
                          backgroundColor: product.tab === 'maquinas' ? 'rgba(23,35,58,0.07)' : 'rgba(255,203,8,0.13)',
                          fontFamily: 'var(--font-barlow)',
                          fontWeight: 700,
                          fontSize: 9,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: product.tab === 'maquinas' ? '#17233A' : '#7A6000',
                        }}
                      >
                        {product.tab === 'maquinas' ? <Cpu size={9} /> : <Package size={9} />}
                        {TAB_LABELS[product.tab]}
                      </span>

                      {product.destaque && (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 3,
                            padding: '2px 7px',
                            backgroundColor: 'rgba(255,203,8,0.1)',
                            border: '1px solid rgba(255,203,8,0.3)',
                            fontFamily: 'var(--font-barlow)',
                            fontWeight: 700,
                            fontSize: 9,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: '#7A6000',
                          }}
                        >
                          <Check size={9} strokeWidth={3} />
                          Destaque
                        </span>
                      )}

                      {product.badge && (
                        <span
                          style={{
                            padding: '2px 7px',
                            border: '1px solid rgba(23,35,58,0.14)',
                            fontFamily: 'var(--font-barlow)',
                            fontWeight: 700,
                            fontSize: 9,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'rgba(23,35,58,0.45)',
                          }}
                        >
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action row */}
                <div
                  className="flex"
                  style={{ borderTop: '1px solid rgba(23,35,58,0.07)' }}
                >
                  <Link
                    href={`/produtos/${product.id}`}
                    className="flex items-center justify-center gap-2 flex-1 transition-colors duration-150 active:scale-[0.97]"
                    style={{
                      padding: '12px 0',
                      fontFamily: 'var(--font-barlow)',
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#17233A',
                      textDecoration: 'none',
                      borderRight: '1px solid rgba(23,35,58,0.07)',
                    }}
                    onTouchStart={(e) => { e.currentTarget.style.backgroundColor = '#F4F6FA' }}
                    onTouchEnd={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                  >
                    <Pencil size={12} strokeWidth={2.5} />
                    Editar
                  </Link>

                  <button
                    onClick={() => handleDelete(product)}
                    disabled={deletingId === product.id}
                    className="flex items-center justify-center gap-2 transition-colors duration-150 active:scale-[0.97]"
                    style={{
                      padding: '12px 24px',
                      background: 'none',
                      border: 'none',
                      cursor: deletingId === product.id ? 'not-allowed' : 'pointer',
                      fontFamily: 'var(--font-barlow)',
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: deletingId === product.id ? 'rgba(220,38,38,0.3)' : '#dc2626',
                    }}
                    onTouchStart={(e) => { if (deletingId !== product.id) e.currentTarget.style.backgroundColor = 'rgba(220,38,38,0.04)' }}
                    onTouchEnd={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                  >
                    <Trash2 size={12} strokeWidth={2.5} />
                    {deletingId === product.id ? '...' : 'Excluir'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
