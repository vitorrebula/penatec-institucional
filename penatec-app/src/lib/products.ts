export type ProductTab = 'produtos' | 'maquinas'

export type ProductVariant =
  | 'dark-blue'
  | 'graphite'
  | 'deep-navy'
  | 'steel'
  | 'warm-dark'
  | 'industrial'

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
  created_at: string
  updated_at: string
}

// ─── Extended data (tagline + specs) keyed by product name ──────────────────
// This data is not stored in the admin system — it lives here.
// When a product is added via admin with a name that matches a key below,
// the detail page will show the full specs. Otherwise it shows only the
// basic info from Supabase.

export interface ProductExtended {
  tagline: string
  specs: { label: string; value: string }[]
}

export const EXTENDED_BY_NAME: Record<string, ProductExtended> = {
  'Misturador de Ingredientes': {
    tagline: 'Homogeneidade perfeita a cada ciclo.',
    specs: [
      { label: 'Capacidade da cuba', value: '20 L' },
      { label: 'Motor', value: '1,5 CV' },
      { label: 'Material', value: 'Aço inox 304' },
      { label: 'Controle', value: 'Eletrônico de velocidade' },
      { label: 'Rotação máx.', value: '1.400 rpm' },
    ],
  },
  'Balança Digital Industrial': {
    tagline: 'Precisão que não mente.',
    specs: [
      { label: 'Capacidade máx.', value: '30 kg' },
      { label: 'Resolução', value: '1 g' },
      { label: 'Display', value: 'LCD retroiluminado' },
      { label: 'Interface', value: 'RS-232 / USB' },
      { label: 'Plataforma', value: 'Aço inox' },
    ],
  },
  'Cortador de Frios': {
    tagline: 'Cada fatia com espessura exata.',
    specs: [
      { label: 'Lâmina', value: 'Aço temperado 220 mm' },
      { label: 'Espessura de corte', value: '0 a 15 mm' },
      { label: 'Prato', value: '220 × 170 mm' },
      { label: 'Motor', value: '180 W' },
      { label: 'Tensão', value: '110V / 220V' },
    ],
  },
  'Dosador de Ingredientes': {
    tagline: 'Dose certa. Sem desperdício.',
    specs: [
      { label: 'Princípio', value: 'Volumétrico' },
      { label: 'Dose por ciclo', value: '5 g a 2 kg' },
      { label: 'Precisão', value: '± 0,5%' },
      { label: 'Material', value: 'Aço inox / PP' },
      { label: 'Controle', value: 'Painel digital' },
    ],
  },
  'Seladora de Embalagens': {
    tagline: 'Selagem segura. Produto protegido.',
    specs: [
      { label: 'Tipo de selagem', value: 'Contínua a calor' },
      { label: 'Temperatura', value: '0 a 200°C (ajustável)' },
      { label: 'Velocidade', value: 'até 12 m/min' },
      { label: 'Largura da barra', value: '10 mm' },
      { label: 'Tensão', value: '220V' },
    ],
  },
  'Liquidificador Industrial': {
    tagline: 'Potência para processar sem parar.',
    specs: [
      { label: 'Volume do copo', value: '4 L' },
      { label: 'Material do copo', value: 'Aço inox 304' },
      { label: 'Motor', value: '1 CV' },
      { label: 'Rotação máx.', value: '18.000 rpm' },
      { label: 'Base', value: 'Borracha antiderrapante' },
    ],
  },
  'Extrator de Suco': {
    tagline: 'Extração máxima. Desperdício zero.',
    specs: [
      { label: 'Capacidade', value: '30 L/h' },
      { label: 'Separação de polpa', value: 'Automática' },
      { label: 'Filtro', value: 'Aço inox perfurado' },
      { label: 'Motor', value: '0,5 CV' },
      { label: 'Dreno', value: 'Lateral com registro' },
    ],
  },
  'Fritadeira Industrial': {
    tagline: 'Fritura uniforme. Alta produtividade.',
    specs: [
      { label: 'Volume de óleo', value: '20 L' },
      { label: 'Termostato', value: 'Digital 0–200°C' },
      { label: 'Cesto', value: 'Aço inox com gancho' },
      { label: 'Dreno de fundo', value: 'Com válvula' },
      { label: 'Tensão', value: '220V monofásico' },
    ],
  },
  'Fogão Industrial 6 Bocas': {
    tagline: 'Potência de chef. Estrutura que dura.',
    specs: [
      { label: 'Queimadores', value: '6 duplo-fogo' },
      { label: 'BTU total', value: '180.000 BTU/h' },
      { label: 'Grelhas', value: 'Ferro fundido' },
      { label: 'Mesa', value: 'Aço inox 304' },
      { label: 'Combustível', value: 'GN ou GLP' },
    ],
  },
  'Chapa para Lanches': {
    tagline: 'Temperatura certa para o ponto perfeito.',
    specs: [
      { label: 'Superfície', value: 'Aço laminado 6 mm' },
      { label: 'Aquecimento', value: 'Resistências duplas' },
      { label: 'Temperatura máx.', value: '300°C' },
      { label: 'Regulagem', value: 'Termostato ajustável' },
      { label: 'Dimensões', value: '40 × 70 cm' },
    ],
  },
  'Processador de Alimentos': {
    tagline: 'Versatilidade industrial. Um equipamento, mil possibilidades.',
    specs: [
      { label: 'Capacidade', value: '8 kg/min' },
      { label: 'Discos inclusos', value: '5 tipos' },
      { label: 'Cuba', value: 'Aço inox 2 L' },
      { label: 'Motor', value: '0,75 CV' },
      { label: 'Velocidades', value: '2 + pulso' },
    ],
  },
  'Estufa de Fermentação': {
    tagline: 'Condições ideais. Resultado consistente.',
    specs: [
      { label: 'Capacidade', value: '24 formas (60×40)' },
      { label: 'Temperatura', value: '25°C a 45°C' },
      { label: 'Umidade', value: '60% a 95% UR' },
      { label: 'Circulação', value: 'Forçada com ventilador' },
      { label: 'Painel', value: 'Digital com timer' },
    ],
  },

  // ── Máquinas ──────────────────────────────────────────────────────────────
  'Amassadeira Espiral 25 kg': {
    tagline: 'Mais glúten. Mais estrutura. Mais resultado.',
    specs: [
      { label: 'Capacidade', value: '25 kg' },
      { label: 'Potência', value: '2 CV' },
      { label: 'Voltagem', value: '220V / 380V' },
      { label: 'Velocidades', value: '2 (lenta / rápida)' },
      { label: 'Material', value: 'Aço inox 304' },
    ],
  },
  'Divisora de Massas': {
    tagline: 'Precisão que padroniza cada peça.',
    specs: [
      { label: 'Porções', value: '20 ou 30 unidades' },
      { label: 'Capacidade', value: 'até 1,5 kg/ciclo' },
      { label: 'Pistões', value: 'Aço inox temperado' },
      { label: 'Regulagem', value: 'Micrométrica' },
      { label: 'Acionamento', value: 'Manual / Pneumático' },
    ],
  },
  'Modeladora de Pães': {
    tagline: 'Forma perfeita. Produção constante.',
    specs: [
      { label: 'Velocidade', value: 'Ajustável' },
      { label: 'Comprimento máx.', value: '28 cm' },
      { label: 'Rolos', value: 'Aço inox polido' },
      { label: 'Correia', value: 'Alimentar certificada' },
      { label: 'Produção', value: 'até 1.200 pçs/h' },
    ],
  },
  'Câmara Fria Industrial': {
    tagline: 'Conservação industrial sob medida.',
    specs: [
      { label: 'Volume', value: 'até 20 m³' },
      { label: 'Temperatura', value: '-25°C a +5°C' },
      { label: 'Painel', value: '100 mm poliuretano' },
      { label: 'Piso', value: 'Modulável (opt.)' },
      { label: 'Instalação', value: 'Modular in loco' },
    ],
  },
  'Forno de Lastro 4 Câmaras': {
    tagline: 'Calor controlado. Qualidade em cada câmara.',
    specs: [
      { label: 'Câmaras', value: '4 independentes' },
      { label: 'Dimensão int.', value: '80 × 120 cm/câmara' },
      { label: 'Temperatura', value: 'até 350°C' },
      { label: 'Lastro', value: 'Pedra refratária' },
      { label: 'Vapor', value: 'Borrifador integrado' },
    ],
  },
  'Forno Turbo a Gás': {
    tagline: 'Eficiência máxima. Assamento uniforme.',
    specs: [
      { label: 'Assadeiras', value: '10 (60 × 40 cm)' },
      { label: 'Temperatura', value: 'até 280°C' },
      { label: 'Combustível', value: 'Gás GN / GLP' },
      { label: 'Circulação', value: 'Forçada bidirecional' },
      { label: 'Timer', value: 'Digital programável' },
    ],
  },
  'Laminadora de Massas': {
    tagline: 'Espessura certa. Produção sem paradas.',
    specs: [
      { label: 'Espessura', value: '0,5 a 30 mm' },
      { label: 'Largura útil', value: '50 cm' },
      { label: 'Rolos', value: 'Aço inox polido' },
      { label: 'Correia', value: 'Dupla (ida e volta)' },
      { label: 'Motor', value: '0,5 CV monofásico' },
    ],
  },
  'Batedeira Planetária 20 L': {
    tagline: 'Potência e controle para cada receita.',
    specs: [
      { label: 'Volume da cuba', value: '20 L (inox)' },
      { label: 'Velocidades', value: '3 + pulso' },
      { label: 'Batedores', value: 'Raquete, gancho, globo' },
      { label: 'Motor', value: '1 CV' },
      { label: 'Estrutura', value: 'Ferro fundido pintado' },
    ],
  },
  'Túnel de Resfriamento': {
    tagline: 'Resfriamento rápido. Produto pronto mais rápido.',
    specs: [
      { label: 'Comprimento', value: '3 a 10 m (modular)' },
      { label: 'Largura correia', value: '60 cm' },
      { label: 'Temperatura', value: '8°C a 15°C' },
      { label: 'Velocidade', value: 'Ajustável (inversor)' },
      { label: 'Refrigeração', value: 'Evaporação forçada' },
    ],
  },
  'Embaladora a Vácuo': {
    tagline: 'Vedação precisa. Vida útil estendida.',
    specs: [
      { label: 'Câmaras', value: '2 (ciclo alternado)' },
      { label: 'Barra selagem', value: '42 cm' },
      { label: 'Bomba vácuo', value: '20 m³/h' },
      { label: 'Vácuo máximo', value: '99,9%' },
      { label: 'Ciclo', value: '15–20 seg.' },
    ],
  },
  'Lavadora de Bandejas': {
    tagline: 'Higiene industrial em alto ritmo.',
    specs: [
      { label: 'Capacidade', value: '40 bandejas/ciclo' },
      { label: 'Temperatura', value: 'até 85°C' },
      { label: 'Lavagem', value: 'Imersão + jato' },
      { label: 'Tempo de ciclo', value: '3 a 8 min.' },
      { label: 'Aquecimento', value: 'Elétrico / vapor' },
    ],
  },
  'Cortadora de Pães Industrial': {
    tagline: 'Cada fatia no ponto certo.',
    specs: [
      { label: 'Espessura corte', value: '8 a 25 mm' },
      { label: 'Lâminas', value: 'Aço inox endurecido' },
      { label: 'Guia', value: 'Acrílico transparente' },
      { label: 'Produção', value: 'até 800 pães/h' },
      { label: 'Tensão', value: '110V / 220V' },
    ],
  },
}
