'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
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

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  async function handleDelete(product: Product) {
    if (!confirm(`Excluir "${product.name}"? Esta ação não pode ser desfeita.`)) return

    setDeletingId(product.id)

    // Delete image from Cloudinary if it exists
    if (product.image_public_id) {
      await fetch(`/api/upload?public_id=${encodeURIComponent(product.image_public_id)}`, {
        method: 'DELETE',
      })
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
    <div style={{ padding: '36px 40px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 32,
          gap: 16,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 900,
              fontSize: 32,
              color: '#17233A',
              lineHeight: 1.1,
              marginBottom: 4,
            }}
          >
            Produtos &amp; Máquinas
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 14,
              color: 'rgba(23,35,58,0.5)',
            }}
          >
            {products.length} {products.length === 1 ? 'item cadastrado' : 'itens cadastrados'}
          </p>
        </div>

        <Link href="/produtos/novo" className="btn-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Novo item
        </Link>
      </div>

      {/* Filters */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid rgba(23,35,58,0.08)',
          padding: '16px 20px',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <svg
            width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="rgba(23,35,58,0.35)" strokeWidth="2"
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nome, categoria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ paddingLeft: 38, maxWidth: 320 }}
          />
        </div>

        {/* Tab filter */}
        <div style={{ display: 'flex', gap: 6 }}>
          {(['todos', 'produtos', 'maquinas'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTabFilter(t)}
              style={{
                padding: '7px 16px',
                fontFamily: 'var(--font-barlow)',
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: tabFilter === t ? '1px solid #17233A' : '1px solid rgba(23,35,58,0.15)',
                backgroundColor: tabFilter === t ? '#17233A' : 'transparent',
                color: tabFilter === t ? '#ffffff' : 'rgba(23,35,58,0.55)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {t === 'todos' ? 'Todos' : t === 'produtos' ? 'Produtos' : 'Máquinas'}
            </button>
          ))}
        </div>

        <span
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 12,
            color: 'rgba(23,35,58,0.4)',
            marginLeft: 'auto',
          }}
        >
          {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid rgba(23,35,58,0.08)',
          overflow: 'hidden',
        }}
      >
        {loading ? (
          <div
            style={{
              padding: '64px',
              textAlign: 'center',
              fontFamily: 'var(--font-barlow)',
              fontWeight: 700,
              fontSize: 14,
              color: 'rgba(23,35,58,0.35)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Carregando...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center' }}>
            <svg
              width="40" height="40" viewBox="0 0 24 24" fill="none"
              stroke="rgba(23,35,58,0.2)" strokeWidth="1.5"
              style={{ margin: '0 auto 16px', display: 'block' }}
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <p
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 700,
                fontSize: 16,
                color: 'rgba(23,35,58,0.35)',
              }}
            >
              {search || tabFilter !== 'todos'
                ? 'Nenhum resultado encontrado'
                : 'Nenhum item cadastrado ainda'}
            </p>
            {!search && tabFilter === 'todos' && (
              <Link
                href="/produtos/novo"
                className="btn-primary"
                style={{ marginTop: 16, display: 'inline-flex' }}
              >
                Cadastrar primeiro item
              </Link>
            )}
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(23,35,58,0.08)' }}>
                {['Imagem', 'Nome', 'Categoria', 'Tipo', 'Destaque', 'Badge', 'Ações'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontFamily: 'var(--font-barlow)',
                      fontWeight: 700,
                      fontSize: 10,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'rgba(23,35,58,0.45)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, i) => (
                <tr
                  key={product.id}
                  style={{
                    borderBottom: i < filtered.length - 1 ? '1px solid rgba(23,35,58,0.06)' : 'none',
                    transition: 'background-color 0.12s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F4F6FA'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  {/* Image */}
                  <td style={{ padding: '12px 16px' }}>
                    <div
                      style={{
                        width: 52,
                        height: 40,
                        backgroundColor: '#17233A',
                        overflow: 'hidden',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          width={52}
                          height={40}
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,203,8,0.4)" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      )}
                    </div>
                  </td>

                  {/* Name */}
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-barlow)',
                        fontWeight: 800,
                        fontSize: 14,
                        color: '#17233A',
                        display: 'block',
                      }}
                    >
                      {product.name}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: 12,
                        color: 'rgba(23,35,58,0.4)',
                        marginTop: 2,
                        display: 'block',
                      }}
                    >
                      {VARIANT_LABELS[product.variant] ?? product.variant}
                    </span>
                  </td>

                  {/* Category */}
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: 13,
                        color: 'rgba(23,35,58,0.7)',
                      }}
                    >
                      {product.category}
                    </span>
                  </td>

                  {/* Tab */}
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '3px 10px',
                        backgroundColor:
                          product.tab === 'maquinas'
                            ? 'rgba(23,35,58,0.07)'
                            : 'rgba(255,203,8,0.12)',
                        fontFamily: 'var(--font-barlow)',
                        fontWeight: 700,
                        fontSize: 10,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: product.tab === 'maquinas' ? '#17233A' : '#8B6D00',
                      }}
                    >
                      {TAB_LABELS[product.tab]}
                    </span>
                  </td>

                  {/* Destaque */}
                  <td style={{ padding: '12px 16px' }}>
                    {product.destaque ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFCB08" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <span style={{ color: 'rgba(23,35,58,0.2)', fontSize: 18 }}>—</span>
                    )}
                  </td>

                  {/* Badge */}
                  <td style={{ padding: '12px 16px' }}>
                    {product.badge ? (
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          border: '1px solid rgba(23,35,58,0.2)',
                          fontFamily: 'var(--font-barlow)',
                          fontWeight: 700,
                          fontSize: 10,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: 'rgba(23,35,58,0.6)',
                        }}
                      >
                        {product.badge}
                      </span>
                    ) : (
                      <span style={{ color: 'rgba(23,35,58,0.2)', fontSize: 18 }}>—</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Link
                        href={`/produtos/${product.id}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '6px 12px',
                          border: '1px solid rgba(23,35,58,0.15)',
                          fontFamily: 'var(--font-barlow)',
                          fontWeight: 700,
                          fontSize: 11,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: '#17233A',
                          textDecoration: 'none',
                          transition: 'border-color 0.15s',
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Editar
                      </Link>

                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(product)}
                        disabled={deletingId === product.id}
                        style={{ opacity: deletingId === product.id ? 0.5 : 1 }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                          <path d="M9 6V4h6v2" />
                        </svg>
                        {deletingId === product.id ? '...' : 'Excluir'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
