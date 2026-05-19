import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import ProductForm from '@/components/ProductForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditarProdutoPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!product) notFound()

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
          }}
        >
          Produtos &amp; Máquinas
        </Link>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(23,35,58,0.3)" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#17233A' }}>
          {product.name}
        </span>
      </div>

      <h1
        style={{
          fontFamily: 'var(--font-barlow)',
          fontWeight: 900,
          fontSize: 32,
          color: '#17233A',
          lineHeight: 1.1,
          marginBottom: 6,
        }}
      >
        Editar Produto
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 14,
          color: 'rgba(23,35,58,0.45)',
          marginBottom: 28,
        }}
      >
        {product.name}
      </p>

      <ProductForm product={product} />
    </div>
  )
}
