'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import type { Product, ProductInsert, ProductUpdate, ProductTab, ProductVariant, GalleryImage } from '@/lib/types'

const TABS: { value: ProductTab; label: string }[] = [
  { value: 'produtos', label: 'Produto' },
  { value: 'maquinas', label: 'Máquina' },
]

const VARIANTS: { value: ProductVariant; label: string }[] = [
  { value: 'dark-blue', label: 'Dark Blue' },
  { value: 'graphite', label: 'Graphite' },
  { value: 'deep-navy', label: 'Deep Navy' },
  { value: 'steel', label: 'Steel' },
  { value: 'warm-dark', label: 'Warm Dark' },
  { value: 'industrial', label: 'Industrial' },
]

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_MB = 5

interface Props {
  product?: Product
}

export default function ProductForm({ product }: Props) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState(product?.name ?? '')
  const [category, setCategory] = useState(product?.category ?? '')
  const [description, setDescription] = useState(product?.description ?? '')
  const [tab, setTab] = useState<ProductTab>(product?.tab ?? 'produtos')
  const [variant, setVariant] = useState<ProductVariant>(product?.variant ?? 'dark-blue')
  const [badge, setBadge] = useState(product?.badge ?? '')
  const [destaque, setDestaque] = useState(product?.destaque ?? false)
  const [price, setPrice] = useState(product?.price != null ? String(product.price) : '')

  // Image state
  const [currentImageUrl, setCurrentImageUrl] = useState(product?.image_url ?? null)
  const [currentPublicId, setCurrentPublicId] = useState(product?.image_public_id ?? null)
  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [removeImage, setRemoveImage] = useState(false)

  // Gallery state (máquinas only)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(product?.gallery_images ?? [])
  const [galleryUploading, setGalleryUploading] = useState(false)

  // Video state (máquinas only)
  const [videoUrl, setVideoUrl] = useState(product?.video_url ?? '')

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Formato inválido. Use JPG, PNG ou WebP.')
      return
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Arquivo muito grande. Máximo ${MAX_SIZE_MB} MB.`)
      return
    }

    setError(null)
    setNewImageFile(file)
    setRemoveImage(false)
    const reader = new FileReader()
    reader.onload = (ev) => setImagePreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  function handleRemoveImage() {
    setNewImageFile(null)
    setImagePreview(null)
    setRemoveImage(true)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function handleCancelNewImage() {
    setNewImageFile(null)
    setImagePreview(null)
    setRemoveImage(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function uploadImage(file: File): Promise<{ url: string; public_id: string }> {
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error ?? 'Falha no upload da imagem')
    }
    return res.json()
  }

  async function deleteImage(public_id: string) {
    await fetch(`/api/upload?public_id=${encodeURIComponent(public_id)}`, { method: 'DELETE' })
  }

  async function handleGalleryFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    if (galleryImages.length + files.length > 8) {
      setError('Máximo de 8 imagens na galeria.')
      return
    }

    setGalleryUploading(true)
    setError(null)
    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          if (!ALLOWED_TYPES.includes(file.type)) throw new Error(`Formato inválido: ${file.name}`)
          if (file.size > MAX_SIZE_MB * 1024 * 1024) throw new Error(`Arquivo muito grande: ${file.name}`)
          return uploadImage(file)
        })
      )
      setGalleryImages(prev => [...prev, ...uploaded])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha no upload da galeria.')
    } finally {
      setGalleryUploading(false)
      if (galleryInputRef.current) galleryInputRef.current.value = ''
    }
  }

  async function removeGalleryImage(idx: number) {
    const img = galleryImages[idx]
    setGalleryImages(prev => prev.filter((_, i) => i !== idx))
    try { await deleteImage(img.public_id) } catch { /* best-effort */ }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name.trim()) { setError('Nome é obrigatório.'); return }
    if (!category.trim()) { setError('Categoria é obrigatória.'); return }
    if (!description.trim()) { setError('Descrição é obrigatória.'); return }

    setSaving(true)
    setError(null)

    try {
      let imageUrl: string | null = currentImageUrl
      let imagePublicId: string | null = currentPublicId

      // Upload new image if selected
      if (newImageFile) {
        const uploaded = await uploadImage(newImageFile)

        // Delete the old image from Cloudinary if there was one
        if (currentPublicId) {
          await deleteImage(currentPublicId)
        }

        imageUrl = uploaded.url
        imagePublicId = uploaded.public_id
      }

      // Remove image if requested
      if (removeImage && !newImageFile) {
        if (currentPublicId) await deleteImage(currentPublicId)
        imageUrl = null
        imagePublicId = null
      }

      const parsedPrice = price.trim() ? parseFloat(price.replace(',', '.')) : null

      const supabase = createClient()

      const payload = {
        name: name.trim(),
        category: category.trim(),
        description: description.trim(),
        tab,
        variant,
        badge: badge.trim() || null,
        destaque,
        price: parsedPrice != null && !isNaN(parsedPrice) ? parsedPrice : null,
        image_url: imageUrl,
        image_public_id: imagePublicId,
        gallery_images: tab === 'maquinas' ? (galleryImages.length ? galleryImages : null) : null,
        video_url: tab === 'maquinas' ? (videoUrl.trim() || null) : null,
      }

      if (product) {
        const { error: dbError } = await supabase
          .from('products')
          .update(payload satisfies ProductUpdate)
          .eq('id', product.id)

        if (dbError) throw dbError
      } else {
        const { error: dbError } = await supabase
          .from('products')
          .insert(payload satisfies ProductInsert)

        if (dbError) throw dbError
      }

      router.push('/produtos')
      router.refresh()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Ocorreu um erro. Tente novamente.'
      setError(msg)
      setSaving(false)
    }
  }

  const displayedImage = imagePreview ?? (removeImage ? null : currentImageUrl)

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Basic info */}
      <div className="card">
        <h2
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 800,
            fontSize: 16,
            color: '#17233A',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: 24,
            paddingBottom: 16,
            borderBottom: '1px solid rgba(23,35,58,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span
            style={{
              width: 4,
              height: 18,
              backgroundColor: '#FFCB08',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          Informações Básicas
        </h2>

        <div className="form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label className="form-label" htmlFor="name">Nome do produto *</label>
            <input
              id="name"
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Misturador de Ingredientes"
              maxLength={120}
              required
            />
          </div>

          <div>
            <label className="form-label" htmlFor="category">Categoria *</label>
            <input
              id="category"
              type="text"
              className="form-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Ex: Linha Industrial"
              maxLength={80}
              required
            />
          </div>

          <div>
            <label className="form-label" htmlFor="price">Preço (R$) <span style={{ fontWeight: 400, color: 'rgba(23,35,58,0.4)' }}>opcional</span></label>
            <input
              id="price"
              type="text"
              inputMode="decimal"
              className="form-input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ex: 1.290,00"
              maxLength={20}
            />
          </div>

          <div>
            <label className="form-label" htmlFor="tab">Tipo *</label>
            <select
              id="tab"
              className="form-input"
              value={tab}
              onChange={(e) => setTab(e.target.value as ProductTab)}
              style={{ cursor: 'pointer' }}
            >
              {TABS.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label className="form-label" htmlFor="description">Descrição *</label>
            <textarea
              id="description"
              className="form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o produto com suas características técnicas principais..."
              rows={4}
              maxLength={500}
              required
              style={{ resize: 'vertical', fontFamily: 'var(--font-inter)' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 11,
                color: 'rgba(23,35,58,0.35)',
                marginTop: 4,
                display: 'block',
              }}
            >
              {description.length}/500 caracteres
            </span>
          </div>
        </div>
      </div>

      {/* Visual settings */}
      <div className="card">
        <h2
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 800,
            fontSize: 16,
            color: '#17233A',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: 24,
            paddingBottom: 16,
            borderBottom: '1px solid rgba(23,35,58,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ width: 4, height: 18, backgroundColor: '#FFCB08', display: 'inline-block', flexShrink: 0 }} />
          Configurações Visuais
        </h2>

        <div className="form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <label className="form-label" htmlFor="variant">Variante de cor</label>
            <select
              id="variant"
              className="form-input"
              value={variant}
              onChange={(e) => setVariant(e.target.value as ProductVariant)}
              style={{ cursor: 'pointer' }}
            >
              {VARIANTS.map((v) => (
                <option key={v.value} value={v.value}>{v.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label" htmlFor="badge">Badge (opcional)</label>
            <input
              id="badge"
              type="text"
              className="form-input"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="Ex: Novo, Destaque"
              maxLength={30}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <div
                onClick={() => setDestaque(!destaque)}
                style={{
                  width: 20,
                  height: 20,
                  border: destaque ? '2px solid #FFCB08' : '2px solid rgba(23,35,58,0.2)',
                  backgroundColor: destaque ? '#FFCB08' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'border-color 0.15s, background-color 0.15s',
                }}
              >
                {destaque && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#17233A" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#17233A',
                }}
              >
                Marcar como destaque
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 12,
                  color: 'rgba(23,35,58,0.45)',
                }}
              >
                Produtos em destaque aparecem em posição prioritária
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="card">
        <h2
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 800,
            fontSize: 16,
            color: '#17233A',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: 24,
            paddingBottom: 16,
            borderBottom: '1px solid rgba(23,35,58,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ width: 4, height: 18, backgroundColor: '#FFCB08', display: 'inline-block', flexShrink: 0 }} />
          Imagem do Produto
        </h2>

        {displayedImage ? (
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div
              style={{
                width: 160,
                height: 120,
                flexShrink: 0,
                overflow: 'hidden',
                border: '1px solid rgba(23,35,58,0.1)',
                position: 'relative',
              }}
            >
              <Image
                src={displayedImage}
                alt="Preview"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {newImageFile ? (
                <>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: 13,
                      color: 'rgba(23,35,58,0.6)',
                    }}
                  >
                    Nova imagem selecionada: <strong>{newImageFile.name}</strong>
                  </span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-secondary"
                    >
                      Trocar
                    </button>
                    <button type="button" onClick={handleCancelNewImage} className="btn-danger">
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: 13,
                      color: 'rgba(23,35,58,0.6)',
                    }}
                  >
                    Imagem atual do produto
                  </span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-secondary"
                    >
                      Trocar imagem
                    </button>
                    <button type="button" onClick={handleRemoveImage} className="btn-danger">
                      Remover
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: '2px dashed rgba(23,35,58,0.15)',
              padding: '40px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#FFCB08' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(23,35,58,0.15)' }}
          >
            <svg
              width="36" height="36" viewBox="0 0 24 24" fill="none"
              stroke="rgba(23,35,58,0.25)" strokeWidth="1.5"
              style={{ margin: '0 auto 12px', display: 'block' }}
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <p
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 700,
                fontSize: 14,
                color: 'rgba(23,35,58,0.5)',
                marginBottom: 4,
              }}
            >
              Clique para selecionar uma imagem
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 12,
                color: 'rgba(23,35,58,0.35)',
              }}
            >
              JPG, PNG ou WebP · Máximo {MAX_SIZE_MB} MB
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_TYPES.join(',')}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>

      {/* Galeria de imagens — máquinas only */}
      {tab === 'maquinas' && (
        <div className="card">
          <h2
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 800,
              fontSize: 16,
              color: '#17233A',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: 24,
              paddingBottom: 16,
              borderBottom: '1px solid rgba(23,35,58,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ width: 4, height: 18, backgroundColor: '#FFCB08', display: 'inline-block', flexShrink: 0 }} />
            Galeria de Imagens
            <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 400, fontSize: 12, color: 'rgba(23,35,58,0.4)', textTransform: 'none', letterSpacing: 0 }}>
              (máx. 8 fotos)
            </span>
          </h2>

          {galleryImages.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, marginBottom: 16 }}>
              {galleryImages.map((img, idx) => (
                <div key={img.public_id} style={{ position: 'relative', border: '1px solid rgba(23,35,58,0.1)', overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: 100 }}>
                    <Image src={img.url} alt={`Galeria ${idx + 1}`} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    style={{
                      position: 'absolute', top: 6, right: 6,
                      width: 24, height: 24, backgroundColor: 'rgba(220,38,38,0.85)',
                      border: 'none', cursor: 'pointer', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                    }}
                    title="Remover imagem"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                  <div style={{
                    padding: '4px 8px',
                    fontFamily: 'var(--font-inter)', fontSize: 11,
                    color: 'rgba(23,35,58,0.45)', textAlign: 'center',
                  }}>
                    Foto {idx + 1}
                  </div>
                </div>
              ))}
            </div>
          )}

          {galleryImages.length < 8 && (
            <div
              onClick={() => !galleryUploading && galleryInputRef.current?.click()}
              style={{
                border: '2px dashed rgba(23,35,58,0.15)',
                padding: '28px',
                textAlign: 'center',
                cursor: galleryUploading ? 'not-allowed' : 'pointer',
                opacity: galleryUploading ? 0.6 : 1,
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={(e) => { if (!galleryUploading) e.currentTarget.style.borderColor = '#FFCB08' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(23,35,58,0.15)' }}
            >
              <svg
                width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="rgba(23,35,58,0.25)" strokeWidth="1.5"
                style={{ margin: '0 auto 10px', display: 'block' }}
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 13, color: 'rgba(23,35,58,0.5)', marginBottom: 4 }}>
                {galleryUploading ? 'Enviando...' : 'Adicionar imagens à galeria'}
              </p>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(23,35,58,0.35)' }}>
                JPG, PNG ou WebP · Máx. {MAX_SIZE_MB} MB · Seleção múltipla permitida
              </p>
            </div>
          )}

          <input
            ref={galleryInputRef}
            type="file"
            accept={ALLOWED_TYPES.join(',')}
            multiple
            onChange={handleGalleryFileSelect}
            style={{ display: 'none' }}
          />
        </div>
      )}

      {/* URL do vídeo — máquinas only */}
      {tab === 'maquinas' && (
        <div className="card">
          <h2
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 800,
              fontSize: 16,
              color: '#17233A',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: 24,
              paddingBottom: 16,
              borderBottom: '1px solid rgba(23,35,58,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ width: 4, height: 18, backgroundColor: '#FFCB08', display: 'inline-block', flexShrink: 0 }} />
            Vídeo Demonstrativo
          </h2>

          <label className="form-label" htmlFor="video_url">URL do vídeo (YouTube)</label>
          <input
            id="video_url"
            type="url"
            className="form-input"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Ex: https://www.youtube.com/watch?v=XXXXXXXXXX"
          />
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(23,35,58,0.35)', marginTop: 6, display: 'block' }}>
            Cole a URL do YouTube (watch ou youtu.be). A conversão para embed é feita automaticamente.
          </span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: 'rgba(220,38,38,0.06)',
            border: '1px solid rgba(220,38,38,0.2)',
            fontFamily: 'var(--font-inter)',
            fontSize: 13,
            color: '#dc2626',
          }}
        >
          {error}
        </div>
      )}

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          paddingTop: 8,
        }}
      >
        <button
          type="submit"
          disabled={saving}
          className="btn-primary"
          style={{ opacity: saving ? 0.7 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}
        >
          {saving ? (
            <>Salvando...</>
          ) : product ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Salvar alterações
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Criar produto
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary"
          disabled={saving}
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
