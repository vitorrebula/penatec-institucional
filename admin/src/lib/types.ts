export type ProductTab = 'produtos' | 'maquinas'

export type ProductVariant =
  | 'dark-blue'
  | 'graphite'
  | 'deep-navy'
  | 'steel'
  | 'warm-dark'
  | 'industrial'

export interface GalleryImage {
  url: string
  public_id: string
}

export interface Product {
  id: string
  name: string
  category: string
  description: string
  tab: ProductTab
  variant: ProductVariant
  badge: string | null
  destaque: boolean
  image_url: string | null
  image_public_id: string | null
  gallery_images: GalleryImage[] | null
  video_url: string | null
  created_at: string
  updated_at: string
}

export type ProductInsert = Omit<Product, 'id' | 'created_at' | 'updated_at'>
export type ProductUpdate = Partial<ProductInsert>
