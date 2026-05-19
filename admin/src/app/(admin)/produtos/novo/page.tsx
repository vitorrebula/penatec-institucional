'use client'

import Link from 'next/link'
import ProductForm from '@/components/ProductForm'

export default function NovoProdutoPage() {
  return (
    <div style={{ padding: '36px 40px', maxWidth: 860 }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
        <Link
          href="/produtos"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 13,
            color: 'rgba(23,35,58,0.45)',
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#17233A' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(23,35,58,0.45)' }}
        >
          Produtos &amp; Máquinas
        </Link>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(23,35,58,0.3)" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#17233A' }}>
          Novo item
        </span>
      </div>

      <h1
        style={{
          fontFamily: 'var(--font-barlow)',
          fontWeight: 900,
          fontSize: 32,
          color: '#17233A',
          lineHeight: 1.1,
          marginBottom: 28,
        }}
      >
        Novo Produto / Máquina
      </h1>

      <ProductForm />
    </div>
  )
}
