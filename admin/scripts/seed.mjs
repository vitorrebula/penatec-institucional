#!/usr/bin/env node
/**
 * Seed script — inserts 24 mock products into Supabase.
 *
 * Requirements:
 *   SUPABASE_SERVICE_KEY env variable (bypasses RLS).
 *   Find it at: Supabase Dashboard > Project Settings > API > service_role secret key.
 *
 * Usage:
 *   SUPABASE_SERVICE_KEY=your_key node admin/scripts/seed.mjs
 *
 * Or add to admin/.env.local and run:
 *   node -e "require('dotenv').config({path:'.env.local'})" admin/scripts/seed.mjs
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://kgoslpermawzmykrpqur.supabase.co'
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!SERVICE_KEY) {
  console.error('\n❌  SUPABASE_SERVICE_KEY is required.')
  console.error('   Find it at: Supabase Dashboard > Project Settings > API > service_role\n')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
})

const ITEMS = [
  // ── Produtos ──────────────────────────────────────────────────────────────
  {
    name: 'Misturador de Ingredientes',
    category: 'Linha Industrial',
    description: 'Misturador de alta capacidade para produção contínua, com controle eletrônico de velocidade e cuba em aço inox.',
    tab: 'produtos',
    variant: 'dark-blue',
    badge: null,
    destaque: true,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Balança Digital Industrial',
    category: 'Linha Técnica',
    description: 'Pesagem de precisão com display retroiluminado, capacidade de até 30 kg e resolução de 1 g.',
    tab: 'produtos',
    variant: 'graphite',
    badge: null,
    destaque: false,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Cortador de Frios',
    category: 'Linha Industrial',
    description: 'Fatiamento uniforme de embutidos e queijos com lâmina de aço temperado e espessura regulável.',
    tab: 'produtos',
    variant: 'steel',
    badge: null,
    destaque: false,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Dosador de Ingredientes',
    category: 'Linha Técnica',
    description: 'Dosagem volumétrica automatizada para farinhas, açúcares e aditivos com alta repetibilidade.',
    tab: 'produtos',
    variant: 'warm-dark',
    badge: null,
    destaque: false,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Seladora de Embalagens',
    category: 'Embalagem',
    description: 'Selagem contínua a calor para filmes plásticos e embalagens flexíveis, com ajuste de temperatura.',
    tab: 'produtos',
    variant: 'industrial',
    badge: null,
    destaque: false,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Liquidificador Industrial',
    category: 'Linha Industrial',
    description: 'Motor de alta rotação com copo de 4 L em aço inox, ideal para processamento contínuo.',
    tab: 'produtos',
    variant: 'deep-navy',
    badge: null,
    destaque: false,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Extrator de Suco',
    category: 'Linha Técnica',
    description: 'Alta eficiência de extração com separação automática de polpa e capacidade de 30 L/h.',
    tab: 'produtos',
    variant: 'graphite',
    badge: 'Novo',
    destaque: false,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Fritadeira Industrial',
    category: 'Linha Industrial',
    description: 'Capacidade de 20 L de óleo com termostato digital, dreno de fundo e estrutura em aço inox.',
    tab: 'produtos',
    variant: 'dark-blue',
    badge: null,
    destaque: false,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Fogão Industrial 6 Bocas',
    category: 'Linha Premium',
    description: 'Queimadores de alta BTU com grelhas de ferro fundido e mesa em aço inox 304.',
    tab: 'produtos',
    variant: 'steel',
    badge: 'Destaque',
    destaque: true,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Chapa para Lanches',
    category: 'Linha Técnica',
    description: 'Superfície em aço laminado com resistência de aquecimento dupla e regulagem de temperatura.',
    tab: 'produtos',
    variant: 'warm-dark',
    badge: null,
    destaque: false,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Processador de Alimentos',
    category: 'Linha Premium',
    description: 'Múltiplos discos de corte intercambiáveis para fatiamento, ralação e moagem com capacidade de 8 kg/min.',
    tab: 'produtos',
    variant: 'industrial',
    badge: null,
    destaque: true,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Estufa de Fermentação',
    category: 'Linha Premium',
    description: 'Controle de temperatura e umidade com circulação forçada de ar, capacidade para 24 formas.',
    tab: 'produtos',
    variant: 'deep-navy',
    badge: null,
    destaque: true,
    image_url: null,
    image_public_id: null,
  },

  // ── Máquinas ──────────────────────────────────────────────────────────────
  {
    name: 'Amassadeira Espiral 25 kg',
    category: 'Panificação',
    description: 'Desenvolvimento de glúten superior com espiral e cuba rotativos, motor protegido contra sobrecarga.',
    tab: 'maquinas',
    variant: 'dark-blue',
    badge: 'Destaque',
    destaque: true,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Divisora de Massas',
    category: 'Panificação',
    description: 'Divisão precisa em 20 ou 30 porções iguais com pistões de aço inox e regulagem de peso.',
    tab: 'maquinas',
    variant: 'graphite',
    badge: null,
    destaque: false,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Modeladora de Pães',
    category: 'Panificação',
    description: 'Modelagem cilíndrica e alongada com rolos reguláveis para diferentes espessuras de massa.',
    tab: 'maquinas',
    variant: 'steel',
    badge: null,
    destaque: false,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Câmara Fria Industrial',
    category: 'Refrigeração',
    description: 'Painéis modulares de 100 mm com sistema de refrigeração integrado, capacidade de até 20 m³.',
    tab: 'maquinas',
    variant: 'warm-dark',
    badge: 'Novo',
    destaque: false,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Forno de Lastro 4 Câmaras',
    category: 'Panificação',
    description: 'Lastro de pedra refratária com controle independente de temperatura por câmara e vapor com borrifador.',
    tab: 'maquinas',
    variant: 'industrial',
    badge: null,
    destaque: true,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Forno Turbo a Gás',
    category: 'Panificação',
    description: 'Circulação forçada de ar quente para assamento uniforme, capacidade para 10 assadeiras 60×40.',
    tab: 'maquinas',
    variant: 'deep-navy',
    badge: null,
    destaque: true,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Laminadora de Massas',
    category: 'Confeitaria',
    description: 'Espessura regulável de 0,5 a 30 mm, rolos de aço inox polido com largura útil de 50 cm.',
    tab: 'maquinas',
    variant: 'graphite',
    badge: null,
    destaque: false,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Batedeira Planetária 20 L',
    category: 'Confeitaria',
    description: 'Três velocidades com proteção de cuba e três tipos de batedor inclusos, estrutura em ferro fundido.',
    tab: 'maquinas',
    variant: 'dark-blue',
    badge: 'Destaque',
    destaque: true,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Túnel de Resfriamento',
    category: 'Refrigeração',
    description: 'Resfriamento rápido de produtos assados com correia transportadora ajustável em velocidade.',
    tab: 'maquinas',
    variant: 'steel',
    badge: null,
    destaque: false,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Embaladora a Vácuo',
    category: 'Embalagem',
    description: 'Câmara dupla com ciclo automático, barra de selagem de 42 cm e bomba de 20 m³/h.',
    tab: 'maquinas',
    variant: 'warm-dark',
    badge: null,
    destaque: false,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Lavadora de Bandejas',
    category: 'Limpeza',
    description: 'Lavagem por imersão e jato com temperatura programável, capacidade de 40 bandejas/ciclo.',
    tab: 'maquinas',
    variant: 'industrial',
    badge: null,
    destaque: false,
    image_url: null,
    image_public_id: null,
  },
  {
    name: 'Cortadora de Pães Industrial',
    category: 'Panificação',
    description: 'Fatiamento uniforme com lâminas de aço inox, largura ajustável de 8 a 25 mm e guia de acrílico.',
    tab: 'maquinas',
    variant: 'deep-navy',
    badge: null,
    destaque: false,
    image_url: null,
    image_public_id: null,
  },
]

async function seed() {
  console.log(`\nSeeding ${ITEMS.length} products into Supabase...`)

  // Check if table already has data
  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  if (count && count > 0) {
    console.log(`\n⚠️  Table already has ${count} row(s).`)
    const args = process.argv.slice(2)
    if (!args.includes('--force')) {
      console.log('   Pass --force to insert anyway.\n')
      process.exit(0)
    }
    console.log('   --force passed, inserting anyway...')
  }

  const { error } = await supabase.from('products').insert(ITEMS)

  if (error) {
    console.error('\n❌  Insert failed:', error.message, '\n')
    process.exit(1)
  }

  console.log(`\n✅  ${ITEMS.length} products seeded successfully!\n`)
}

seed()
