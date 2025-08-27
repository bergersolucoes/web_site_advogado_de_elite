export interface PetitionModel {
  id: number;
  title: string;
  area: string;
  description: string;
  category: string;
  featured?: boolean;
}

export const petitionModels: PetitionModel[] = [
  // Featured models (first 8)
  {
    id: 1,
    title: "Petição Inicial - Ação de Cobrança",
    area: "Cível",
    description: "Modelo completo para ação de cobrança com fundamentos e pedidos estruturados, incluindo cálculos e jurisprudência atualizada.",
    category: "Petições Iniciais",
    featured: true
  },
  {
    id: 2,
    title: "Contestação - Direito do Consumidor",
    area: "Consumidor",
    description: "Defesa fundamentada com argumentos técnicos para relações de consumo, CDC aplicado e precedentes do STJ.",
    category: "Defesas e Recursos",
    featured: true
  },
  {
    id: 3,
    title: "Recurso de Apelação Trabalhista",
    area: "Trabalhista",
    description: "Recurso estruturado para revisão de decisões trabalhistas com súmulas e precedentes do TST atualizados.",
    category: "Defesas e Recursos",
    featured: true
  },
  {
    id: 4,
    title: "Embargos de Declaração",
    area: "Processual",
    description: "Peça técnica para esclarecimento de omissões, contradições ou obscuridade com fundamentos processuais.",
    category: "Peças Especiais",
    featured: true
  },
  {
    id: 5,
    title: "Mandado de Segurança",
    area: "Administrativo",
    description: "Impetração fundamentada para proteção de direito líquido e certo contra ato de autoridade pública.",
    category: "Petições Iniciais",
    featured: true
  },
  {
    id: 6,
    title: "Ação de Alimentos",
    area: "Família",
    description: "Petição inicial completa para fixação ou revisão de pensão alimentícia com fundamentos e cálculos detalhados.",
    category: "Petições Iniciais",
    featured: true
  },
  {
    id: 7,
    title: "Ação de Indenização por Danos Morais",
    area: "Cível",
    description: "Modelo estruturado para ações indenizatórias com fundamentação robusta e precedentes do STJ.",
    category: "Petições Iniciais",
    featured: true
  },
  {
    id: 8,
    title: "Defesa Preliminar Penal",
    area: "Penal",
    description: "Peça de defesa com análise técnica, excludentes de ilicitude e atipicidade conforme CP e CPP.",
    category: "Defesas e Recursos",
    featured: true
  },
  // Additional models
  {
    id: 9,
    title: "Agravo de Instrumento",
    area: "Processual",
    description: "Recurso contra decisões interlocutórias com fundamentação e demonstração de urgência e relevância.",
    category: "Defesas e Recursos"
  },
  {
    id: 10,
    title: "Cumprimento de Sentença",
    area: "Processual",
    description: "Modelo para execução de título judicial com cálculos e fundamentos do CPC/2015.",
    category: "Peças Especiais"
  },
  {
    id: 11,
    title: "Ação Rescisória Trabalhista",
    area: "Trabalhista",
    description: "Peça complexa para desconstituir decisão transitada em julgado com vícios específicos.",
    category: "Defesas e Recursos"
  },
  {
    id: 12,
    title: "Petição de Habeas Corpus",
    area: "Penal",
    description: "Garantia constitucional para proteção da liberdade de locomoção com fundamentação específica.",
    category: "Petições Iniciais"
  },
  {
    id: 13,
    title: "Ação de Despejo por Falta de Pagamento",
    area: "Cível",
    description: "Modelo para despejo com fundamentos no CC e Lei do Inquilinato, cálculos e prazos.",
    category: "Petições Iniciais"
  },
  {
    id: 14,
    title: "Revisional de Contrato Bancário",
    area: "Consumidor",
    description: "Ação para revisão de cláusulas abusivas em contratos bancários com fundamentos no CDC.",
    category: "Petições Iniciais"
  },
  {
    id: 15,
    title: "Ação de Divórcio Consensual",
    area: "Família",
    description: "Modelo para divórcio consensual com partilha de bens e regulamentação de guarda.",
    category: "Petições Iniciais"
  },
  {
    id: 16,
    title: "Reclamação Trabalhista",
    area: "Trabalhista",
    description: "Petição inicial trabalhista com cálculos, fundamentos na CLT e precedentes.",
    category: "Petições Iniciais"
  },
  {
    id: 17,
    title: "Ação Anulatória de Débito Fiscal",
    area: "Tributário",
    description: "Modelo para anular débito fiscal com vícios de constituição e fundamentos tributários.",
    category: "Petições Iniciais"
  },
  {
    id: 18,
    title: "Contestação em Ação de Despejo",
    area: "Cível",
    description: "Defesa em ação de despejo com argumentos de direito material e processual.",
    category: "Defesas e Recursos"
  },
  {
    id: 19,
    title: "Recurso Extraordinário",
    area: "Processual",
    description: "Recurso para STF com demonstração de repercussão geral e violação constitucional.",
    category: "Defesas e Recursos"
  },
  {
    id: 20,
    title: "Ação de Execução de Título Extrajudicial",
    area: "Processual",
    description: "Execução de títulos extrajudiciais com fundamentos e procedimentos do CPC.",
    category: "Peças Especiais"
  },
  {
    id: 21,
    title: "Ação de Usucapião Urbana",
    area: "Cível",
    description: "Modelo para usucapião urbana com fundamentos constitucionais e documentação.",
    category: "Petições Iniciais"
  },
  {
    id: 22,
    title: "Ação de Reconhecimento de União Estável",
    area: "Família",
    description: "Petição para reconhecimento de união estável com efeitos patrimoniais.",
    category: "Petições Iniciais"
  },
  {
    id: 23,
    title: "Recurso Ordinário em Mandado de Segurança",
    area: "Administrativo",
    description: "Recurso específico para MS com fundamentos em direito administrativo.",
    category: "Defesas e Recursos"
  },
  {
    id: 24,
    title: "Ação de Indenização por Acidente de Trabalho",
    area: "Trabalhista",
    description: "Modelo para indenização por acidente laboral com nexo causal e danos.",
    category: "Petições Iniciais"
  }
];

export const categories = [
  "Todos",
  "Petições Iniciais", 
  "Defesas e Recursos",
  "Peças Especiais"
];

export const areas = [
  "Todos",
  "Cível",
  "Trabalhista", 
  "Família",
  "Empresarial",
  "Penal",
  "Administrativo",
  "Processual",
  "Consumidor",
  "Tributário"
];