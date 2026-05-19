import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { createClient } from '@/lib/supabase/server'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp']
const MAX_BYTES = 5 * 1024 * 1024 // 5 MB

async function getAuthenticatedUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

/** POST /api/upload — upload image to Cloudinary */
export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser()
  if (!user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Requisição inválida' }, { status: 400 })
  }

  const file = formData.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })
  }

  if (!ALLOWED_MIME.includes(file.type)) {
    return NextResponse.json(
      { error: 'Formato inválido. Use JPG, PNG ou WebP.' },
      { status: 422 },
    )
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: 'Arquivo muito grande. Máximo 5 MB.' },
      { status: 422 },
    )
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const dataUri = `data:${file.type};base64,${buffer.toString('base64')}`

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'penatec/produtos',
      resource_type: 'image',
      // Auto-optimize: strip metadata, choose best format
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    })

    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
    })
  } catch (err) {
    console.error('[upload] Cloudinary error:', err)
    return NextResponse.json({ error: 'Falha no upload. Tente novamente.' }, { status: 500 })
  }
}

/** DELETE /api/upload?public_id=xxx — delete image from Cloudinary */
export async function DELETE(req: NextRequest) {
  const user = await getAuthenticatedUser()
  if (!user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const publicId = req.nextUrl.searchParams.get('public_id')
  if (!publicId || publicId.trim().length === 0) {
    return NextResponse.json({ error: 'public_id ausente' }, { status: 400 })
  }

  // Sanity-check: only allow deletion of images within our folder
  if (!publicId.startsWith('penatec/')) {
    return NextResponse.json({ error: 'Operação não permitida' }, { status: 403 })
  }

  try {
    await cloudinary.uploader.destroy(publicId)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[upload] Cloudinary destroy error:', err)
    return NextResponse.json({ error: 'Falha ao excluir imagem.' }, { status: 500 })
  }
}
