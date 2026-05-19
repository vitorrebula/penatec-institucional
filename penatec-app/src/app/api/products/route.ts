import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tab = searchParams.get('tab')
  const destaque = searchParams.get('destaque')

  let query = supabase.from('products').select('*').order('created_at', { ascending: true })
  if (tab) query = query.eq('tab', tab)
  if (destaque === 'true') query = query.eq('destaque', true)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}
