export type Tab = 'produtos' | 'maquinas'

export interface Item {
  id: number
  name: string
  category: string
  description: string
  tab: Tab
  variant: 'dark-blue' | 'graphite' | 'deep-navy' | 'steel' | 'warm-dark' | 'industrial'
  badge?: string
  destaque?: boolean
}

export const ALL_ITEMS: Item[] = [
  // ── Produtos ──
  {
    id: 1, tab: 'produtos', variant: 'dark-blue',
    name: 'Misturador de Ingredientes',
    category: 'Linha Industrial',
    description: 'Misturador de alta capacidade para produção contínua, com controle eletrônico de velocidade e cuba em aço inox.',
    destaque: true,
  },
  {
    id: 2, tab: 'produtos', variant: 'graphite',
    name: 'Balança Digital Industrial',
    category: 'Linha Técnica',
    description: 'Pesagem de precisão com display retroiluminado, capacidade de até 30 kg e resolução de 1 g.',
  },
  {
    id: 3, tab: 'produtos', variant: 'steel',
    name: 'Cortador de Frios',
    category: 'Linha Industrial',
    description: 'Fatiamento uniforme de embutidos e queijos com lâmina de aço temperado e espessura regulável.',
  },
  {
    id: 4, tab: 'produtos', variant: 'warm-dark',
    name: 'Dosador de Ingredientes',
    category: 'Linha Técnica',
    description: 'Dosagem volumétrica automatizada para farinhas, açúcares e aditivos com alta repetibilidade.',
  },
  {
    id: 5, tab: 'produtos', variant: 'industrial',
    name: 'Seladora de Embalagens',
    category: 'Embalagem',
    description: 'Selagem contínua a calor para filmes plásticos e embalagens flexíveis, com ajuste de temperatura.',
  },
  {
    id: 6, tab: 'produtos', variant: 'deep-navy',
    name: 'Liquidificador Industrial',
    category: 'Linha Industrial',
    description: 'Motor de alta rotação com copo de 4 L em aço inox, ideal para processamento contínuo.',
  },
  {
    id: 7, tab: 'produtos', variant: 'graphite',
    name: 'Extrator de Suco',
    category: 'Linha Técnica',
    description: 'Alta eficiência de extração com separação automática de polpa e capacidade de 30 L/h.',
    badge: 'Novo',
  },
  {
    id: 8, tab: 'produtos', variant: 'dark-blue',
    name: 'Fritadeira Industrial',
    category: 'Linha Industrial',
    description: 'Capacidade de 20 L de óleo com termostato digital, dreno de fundo e estrutura em aço inox.',
  },
  {
    id: 9, tab: 'produtos', variant: 'steel',
    name: 'Fogão Industrial 6 Bocas',
    category: 'Linha Premium',
    description: 'Queimadores de alta BTU com grelhas de ferro fundido e mesa em aço inox 304.',
    badge: 'Destaque',
    destaque: true,
  },
  {
    id: 10, tab: 'produtos', variant: 'warm-dark',
    name: 'Chapa para Lanches',
    category: 'Linha Técnica',
    description: 'Superfície em aço laminado com resistência de aquecimento dupla e regulagem de temperatura.',
  },
  {
    id: 11, tab: 'produtos', variant: 'industrial',
    name: 'Processador de Alimentos',
    category: 'Linha Premium',
    description: 'Múltiplos discos de corte intercambiáveis para fatiamento, ralação e moagem com capacidade de 8 kg/min.',
    destaque: true,
  },
  {
    id: 12, tab: 'produtos', variant: 'deep-navy',
    name: 'Estufa de Fermentação',
    category: 'Linha Premium',
    description: 'Controle de temperatura e umidade com circulação forçada de ar, capacidade para 24 formas.',
    destaque: true,
  },

  // ── Máquinas ──
  {
    id: 13, tab: 'maquinas', variant: 'dark-blue',
    name: 'Amassadeira Espiral 25 kg',
    category: 'Panificação',
    description: 'Desenvolvimento de glúten superior com espiral e cuba rotativos, motor protegido contra sobrecarga.',
    badge: 'Destaque',
    destaque: true,
  },
  {
    id: 14, tab: 'maquinas', variant: 'graphite',
    name: 'Divisora de Massas',
    category: 'Panificação',
    description: 'Divisão precisa em 20 ou 30 porções iguais com pistões de aço inox e regulagem de peso.',
  },
  {
    id: 15, tab: 'maquinas', variant: 'steel',
    name: 'Modeladora de Pães',
    category: 'Panificação',
    description: 'Modelagem cilíndrica e alongada com rolos reguláveis para diferentes espessuras de massa.',
  },
  {
    id: 16, tab: 'maquinas', variant: 'warm-dark',
    name: 'Câmara Fria Industrial',
    category: 'Refrigeração',
    description: 'Painéis modulares de 100 mm com sistema de refrigeração integrado, capacidade de até 20 m³.',
    badge: 'Novo',
  },
  {
    id: 17, tab: 'maquinas', variant: 'industrial',
    name: 'Forno de Lastro 4 Câmaras',
    category: 'Panificação',
    description: 'Lastro de pedra refratária com controle independente de temperatura por câmara e vapor com borrifador.',
    destaque: true,
  },
  {
    id: 18, tab: 'maquinas', variant: 'deep-navy',
    name: 'Forno Turbo a Gás',
    category: 'Panificação',
    description: 'Circulação forçada de ar quente para assamento uniforme, capacidade para 10 assadeiras 60×40.',
    destaque: true,
  },
  {
    id: 19, tab: 'maquinas', variant: 'graphite',
    name: 'Laminadora de Massas',
    category: 'Confeitaria',
    description: 'Espessura regulável de 0,5 a 30 mm, rolos de aço inox polido com largura útil de 50 cm.',
  },
  {
    id: 20, tab: 'maquinas', variant: 'dark-blue',
    name: 'Batedeira Planetária 20 L',
    category: 'Confeitaria',
    description: 'Três velocidades com proteção de cuba e três tipos de batedor inclusos, estrutura em ferro fundido.',
    badge: 'Destaque',
    destaque: true,
  },
  {
    id: 21, tab: 'maquinas', variant: 'steel',
    name: 'Túnel de Resfriamento',
    category: 'Refrigeração',
    description: 'Resfriamento rápido de produtos assados com correia transportadora ajustável em velocidade.',
  },
  {
    id: 22, tab: 'maquinas', variant: 'warm-dark',
    name: 'Embaladora a Vácuo',
    category: 'Embalagem',
    description: 'Câmara dupla com ciclo automático, barra de selagem de 42 cm e bomba de 20 m³/h.',
  },
  {
    id: 23, tab: 'maquinas', variant: 'industrial',
    name: 'Lavadora de Bandejas',
    category: 'Limpeza',
    description: 'Lavagem por imersão e jato com temperatura programável, capacidade de 40 bandejas/ciclo.',
  },
  {
    id: 24, tab: 'maquinas', variant: 'deep-navy',
    name: 'Cortadora de Pães Industrial',
    category: 'Panificação',
    description: 'Fatiamento uniforme com lâminas de aço inox, largura ajustável de 8 a 25 mm e guia de acrílico.',
  },
]
