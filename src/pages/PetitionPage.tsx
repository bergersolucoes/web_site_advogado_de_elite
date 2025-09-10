import { useState, useEffect } from "react";
import { 
  Shield, 
  Award, 
  Lock, 
  Zap, 
  FileText, 
  MessageSquare, 
  Scale,
  Building2,
  ShoppingCart,
  Users2,
  Heart,
  Briefcase,
  Calculator,
  UserCheck,
  Gavel,
  MapPin,
  CheckCircle,
  Clock,
  Star,
  Target,
  Archive,
  Eye,
  Download
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import PetitionCard from "@/components/PetitionCard";
import FormModal from "@/components/FormModal";
import { useToast } from "@/hooks/use-toast";
import { petitionModels, categories, areas as dataAreas } from "@/data/petitionModels";
import heroImage from "@/assets/law-office-hero.jpg";
import legalDocsImage from "@/assets/legal-documents.jpg";
import lawLibraryImage from "@/assets/law-library.jpg";

const differentials = [
  {
    icon: Shield,
    title: "Exclusividade real",
    description: "Peças feitas do zero, alinhadas ao caso e à voz do subscritor."
  },
  {
    icon: Award,
    title: "Senioridade",
    description: "Revisão sênior com 35 anos de experiência prática."
  },
  {
    icon: Lock,
    title: "Sigilo & LGPD",
    description: "Dados tratados com segurança, finalidade definida e acesso restrito."
  },
  {
    icon: Zap,
    title: "Modernidade",
    description: "Técnica jurídica sólida com visão de futuro."
  }
];

const areas = [
  { name: "Cível", icon: Scale },
  { name: "Contratos", icon: FileText },
  { name: "Consumidor", icon: ShoppingCart },
  { name: "Família e Sucessões", icon: Heart },
  { name: "Empresarial", icon: Building2 },
  { name: "Tributário", icon: Calculator },
  { name: "Trabalhista", icon: Users2 },
  { name: "Previdenciário", icon: UserCheck },
  { name: "Penal", icon: Gavel },
  { name: "Administrativo", icon: MapPin }
];

const petitionTypes = [
  {
    category: "Petições Iniciais",
    items: [
      { name: "Ação de Cobrança", icon: FileText },
      { name: "Ação de Indenização", icon: Scale },
      { name: "Ação de Alimentos", icon: Heart },
      { name: "Ação Trabalhista", icon: Users2 },
      { name: "Mandado de Segurança", icon: Shield },
      { name: "Ação Empresarial", icon: Building2 }
    ]
  },
  {
    category: "Defesas e Recursos",
    items: [
      { name: "Contestação Cível", icon: MessageSquare },
      { name: "Contestação Trabalhista", icon: Users2 },
      { name: "Recurso de Apelação", icon: Gavel },
      { name: "Embargos de Declaração", icon: Eye },
      { name: "Agravo de Instrumento", icon: Archive },
      { name: "Defesa Preliminar", icon: Shield }
    ]
  },
  {
    category: "Peças Especiais",
    items: [
      { name: "Cumprimento de Sentença", icon: CheckCircle },
      { name: "Sustentação Oral", icon: MessageSquare },
      { name: "Memoriais", icon: FileText },
      { name: "Réplica/Tréplica", icon: MessageSquare },
      { name: "Incidentes Processuais", icon: Target },
      { name: "Manifestações", icon: FileText }
    ]
  }
];

const samplePetitions = [
  {
    title: "Petição Inicial - Ação de Cobrança",
    area: "Cível",
    description: "Modelo completo para ação de cobrança com fundamentos e pedidos estruturados, incluindo cálculos e jurisprudência."
  },
  {
    title: "Contestação - Direito do Consumidor",
    area: "Consumidor", 
    description: "Defesa fundamentada com argumentos técnicos para relações de consumo, CDC aplicado e precedentes."
  },
  {
    title: "Recurso de Apelação Trabalhista",
    area: "Trabalhista",
    description: "Recurso estruturado para revisão de decisões trabalhistas com súmulas e precedentes do TST."
  },
  {
    title: "Embargos de Declaração",
    area: "Processual",
    description: "Peça técnica para esclarecimento de omissões, contradições ou obscuridade com fundamentos processuais."
  },
  {
    title: "Mandado de Segurança",
    area: "Administrativo",
    description: "Impetração fundamentada para proteção de direito líquido e certo contra ato de autoridade."
  },
  {
    title: "Ação de Alimentos",
    area: "Família",
    description: "Petição inicial completa para fixação ou revisão de pensão alimentícia com fundamentos e cálculos."
  },
  {
    title: "Ação de Indenização por Danos Morais",
    area: "Cível",
    description: "Modelo estruturado para ações indenizatórias com fundamentação robusta e precedentes."
  },
  {
    title: "Defesa Preliminar Penal",
    area: "Penal",
    description: "Peça de defesa com análise técnica, excludentes de ilicitude e atipicidade."
  },
  {
    title: "Agravo de Instrumento",
    area: "Processual",
    description: "Recurso contra decisões interlocutórias com fundamentação e demonstração de urgência."
  }
];

const benefits = [
  {
    icon: Star,
    title: "Redação Artesanal",
    description: "Peças feitas do zero, sem IA, com fundamentação curada manualmente."
  },
  {
    icon: Clock,
    title: "Prazos Respeitados",
    description: "Entrega pontual conforme cronograma estabelecido no briefing."
  },
  {
    icon: CheckCircle,
    title: "Revisão Inclusa",
    description: "Uma rodada de ajustes inclusa para alinhamento final da peça."
  },
  {
    icon: Download,
    title: "Entrega Completa",
    description: "Arquivos em Word (.docx) e PDF para facilitar seu protocolo."
  }
];

export default function PetitionPage() {
  const [showCatalog, setShowCatalog] = useState(false);
  const { toast } = useToast();

  // Simple catalog filter functionality
  useEffect(() => {
    const grid = document.querySelector(".catalog-grid");
    if (grid) {
      const buttons = document.querySelectorAll("[data-filter]");
      buttons.forEach(btn => {
        btn.addEventListener("click", () => {
          const filter = btn.getAttribute("data-filter");
          const cards = grid.querySelectorAll(".card-premium");
          
          cards.forEach(card => {
            if (filter === "*" || card.classList.contains(filter?.slice(1) || "")) {
              (card as HTMLElement).style.display = "";
            } else {
              (card as HTMLElement).style.display = "none";
            }
          });
          
          // Update active button
          buttons.forEach(b => {
            b.classList.remove("bg-accent", "text-accent-foreground");
            b.classList.add("border-border");
          });
          btn.classList.add("bg-accent", "text-accent-foreground");
        });
      });
    }
  }, []);

  const handleRequestPetition = () => {
    toast({
      title: "Briefing Iniciado",
      description: "Em breve você será redirecionado para o formulário de briefing.",
    });
  };

  const handleRequestQuote = () => {
    toast({
      title: "Orçamento Solicitado",
      description: "Entraremos em contato em até 24 horas com a proposta.",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-8 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Escritório de advocacia elegante com balança da justiça e livros jurídicos"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/85" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Petições Sob Medida e <span className="text-gradient">Modelos Jurídicos</span> Exclusivos
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto lg:mx-0">
                35 anos de atuação em diversas áreas do Direito. Exclusividade, sigilo e técnica — sem IA.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <FormModal
                  title="Solicitar Petição Sob Medida"
                  description="Preencha os dados para iniciarmos o briefing da sua petição"
                  fields={[
                    { name: 'nome', label: 'Nome completo', type: 'text', required: true },
                    { name: 'email', label: 'E-mail profissional', type: 'email', required: true },
                    { name: 'telefone', label: 'Telefone', type: 'tel', required: true },
                    { name: 'oab', label: 'UF/OAB', type: 'text', required: true },
                    { name: 'area', label: 'Área do Direito', type: 'select', required: true, options: ['Cível', 'Trabalhista', 'Família', 'Empresarial', 'Penal', 'Tributário', 'Administrativo'] },
                    { name: 'tipo_peca', label: 'Tipo de peça', type: 'text', required: true },
                    { name: 'prazo', label: 'Prazo necessário', type: 'text' },
                    { name: 'caso', label: 'Resumo do caso', type: 'textarea', required: true, rows: 4 },
                    { name: 'company', label: '', type: 'text' },
                    { name: 'lgpd', label: 'Li e concordo com a Política de Privacidade', type: 'checkbox', required: true }
                  ]}
                  trigger={<button className="btn-gold">Solicitar Petição Sob Medida</button>}
                />
                <a 
                  href="#catalogo"
                  className="btn-outline-gold"
                >
                  Ver Catálogo de Modelos
                </a>
              </div>
            </div>
            
            {/* Video Hero */}
            <div className="video-hero card-premium">
              <iframe 
                src="" 
                title="Vídeo de apresentação" 
                allowFullScreen 
                loading="lazy"
                className="mb-4"
              ></iframe>
              <p className="text-sm text-muted-foreground">Trocar o src deste iframe quando o vídeo estiver pronto.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            Por que Escolher Petições Sob Medida?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Redação artesanal que reflete sua voz profissional e estratégia do caso
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((item, index) => (
              <FeatureCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Petition Types Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Tipos de Peças Disponíveis</h2>
            <p className="text-muted-foreground">Cobertura completa para todas as fases processuais</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {petitionTypes.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-background rounded-xl p-6 border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <div key={itemIndex} className="flex items-center p-3 rounded-lg hover:bg-card transition-colors">
                        <Icon className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground">{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Diferenciais Únicos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentials.map((item, index) => (
              <FeatureCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Áreas Atendidas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {areas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div key={index} className="flex items-center justify-center p-4 rounded-lg bg-background border border-border hover:border-accent/50 transition-colors">
                  <Icon className="w-5 h-5 text-accent mr-2" />
                  <span className="text-sm font-medium text-foreground">{area.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Como Funciona</h2>
              <p className="text-muted-foreground mb-8">
                Do briefing à entrega, um processo transparente e profissional
              </p>
              
              <div className="space-y-6">
                {[
                  { 
                    number: "1", 
                    title: "Briefing Detalhado", 
                    description: "Formulário guiado para entender seu caso, objetivos e anexar documentos essenciais"
                  },
                  { 
                    number: "2", 
                    title: "Análise e Proposta", 
                    description: "Avaliação de viabilidade, definição de cronograma e aprovação da proposta"
                  },
                  { 
                    number: "3", 
                    title: "Redação Artesanal", 
                    description: "Elaboração da peça do zero, sem IA, com fundamentação curada e sua voz profissional"
                  },
                  { 
                    number: "4", 
                    title: "Entrega e Revisão", 
                    description: "Arquivos em Word e PDF + 1 rodada de ajustes conforme briefing inicial"
                  }
                ].map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-sm font-bold text-accent-foreground">{step.number}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <FormModal
                  title="Iniciar Briefing - Petição Sob Medida"
                  description="Preencha os dados para iniciarmos o briefing da sua petição"
                  fields={[
                    { name: 'nome', label: 'Nome completo', type: 'text', required: true },
                    { name: 'email', label: 'E-mail profissional', type: 'email', required: true },
                    { name: 'telefone', label: 'Telefone', type: 'tel', required: true },
                    { name: 'oab', label: 'UF/OAB', type: 'text', required: true },
                    { name: 'area', label: 'Área do Direito', type: 'select', required: true, options: ['Cível', 'Trabalhista', 'Família', 'Empresarial', 'Penal', 'Tributário', 'Administrativo'] },
                    { name: 'tipo_peca', label: 'Tipo de peça', type: 'text', required: true },
                    { name: 'prazo', label: 'Prazo necessário', type: 'text' },
                    { name: 'caso', label: 'Resumo do caso', type: 'textarea', required: true, rows: 4 },
                    { name: 'company', label: '', type: 'text' },
                    { name: 'lgpd', label: 'Li e concordo com a Política de Privacidade', type: 'checkbox', required: true }
                  ]}
                  trigger={<button className="btn-gold">Iniciar Briefing Agora</button>}
                />
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={legalDocsImage} 
                alt="Documentos jurídicos e laptop mostrando processo de redação de petições"
                className="rounded-xl shadow-elegant"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src={lawLibraryImage} 
                alt="Biblioteca jurídica moderna com livros de direito e ambiente de estudo"
                className="rounded-xl shadow-elegant"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-xl"></div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Escopo e Responsabilidades</h2>
              
              <div className="space-y-6">
                <div className="bg-card p-6 rounded-xl border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Nossa Responsabilidade</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Redação técnica e fundamentação jurídica</li>
                    <li>• Estruturação conforme normas processuais</li>
                    <li>• Referências normativas e jurisprudenciais</li>
                    <li>• Entrega nos prazos combinados</li>
                  </ul>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Responsabilidade do Advogado</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Conferência final e adequações ao caso</li>
                    <li>• Protocolo e acompanhamento processual</li>
                    <li>• Assinatura e responsabilidade pela peça</li>
                    <li>• Fornecimento completo de informações no briefing</li>
                  </ul>
                </div>
                
                <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                  <p className="text-sm text-accent font-medium">
                    ⚖️ Sem promessa de resultado. Serviço redacional técnico para advogados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-20 bg-card" id="catalogo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Catálogo de Modelos Jurídicos</h2>
            <p className="text-muted-foreground mb-4">
              Modelos como ponto de partida — não substituem a análise do caso concreto.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8" aria-label="Filtros">
            <button 
              className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:border-accent/50 transition-colors bg-accent text-accent-foreground"
              data-filter="*"
            >
              Todos
            </button>
            <button 
              className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:border-accent/50 transition-colors"
              data-filter=".civel"
            >
              Cível
            </button>
            <button 
              className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:border-accent/50 transition-colors"
              data-filter=".trabalhista"
            >
              Trabalhista
            </button>
            <button 
              className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:border-accent/50 transition-colors"
              data-filter=".previdenciario"
            >
              Previdenciário
            </button>
            <button 
              className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:border-accent/50 transition-colors"
              data-filter=".familia"
            >
              Família
            </button>
            <button 
              className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:border-accent/50 transition-colors"
              data-filter=".empresarial"
            >
              Empresarial
            </button>
            <button 
              className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:border-accent/50 transition-colors"
              data-filter=".tributario"
            >
              Tributário
            </button>
            <button 
              className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:border-accent/50 transition-colors"
              data-filter=".penal"
            >
              Penal
            </button>
            <button 
              className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:border-accent/50 transition-colors"
              data-filter=".administrativo"
            >
              Administrativo
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 catalog-grid">
            {/* EXEMPLOS (8 modelos em 4 colunas x 2 linhas) */}
            <article className="card-premium civel">
              <h3 className="text-lg font-semibold text-foreground mb-2">Petição Inicial Cível</h3>
              <p className="text-sm text-muted-foreground mb-4">Cível · Propositura</p>
              <div className="flex justify-center">
                <a className="btn-gold text-sm px-4 py-2" href="/modelos/peticao-inicial-civel.html">Ver Detalhes</a>
              </div>
            </article>

            <article className="card-premium trabalhista">
              <h3 className="text-lg font-semibold text-foreground mb-2">Recurso Trabalhista</h3>
              <p className="text-sm text-muted-foreground mb-4">Trabalhista · Recurso</p>
              <div className="flex justify-center">
                <a className="btn-gold text-sm px-4 py-2" href="/modelos/recurso-trabalhista.html">Ver Detalhes</a>
              </div>
            </article>

            <article className="card-premium previdenciario">
              <h3 className="text-lg font-semibold text-foreground mb-2">Ação Previdenciária</h3>
              <p className="text-sm text-muted-foreground mb-4">Previdenciário · Propositura</p>
              <div className="flex justify-center">
                <a className="btn-gold text-sm px-4 py-2" href="/modelos/acao-previdenciaria.html">Ver Detalhes</a>
              </div>
            </article>

            <article className="card-premium familia">
              <h3 className="text-lg font-semibold text-foreground mb-2">Ação de Alimentos</h3>
              <p className="text-sm text-muted-foreground mb-4">Família · Propositura</p>
              <div className="flex justify-center">
                <a className="btn-gold text-sm px-4 py-2" href="/modelos/acao-alimentos.html">Ver Detalhes</a>
              </div>
            </article>

            <article className="card-premium empresarial">
              <h3 className="text-lg font-semibold text-foreground mb-2">Contrato Empresarial</h3>
              <p className="text-sm text-muted-foreground mb-4">Empresarial · Contrato</p>
              <div className="flex justify-center">
                <a className="btn-gold text-sm px-4 py-2" href="/modelos/contrato-empresarial.html">Ver Detalhes</a>
              </div>
            </article>

            <article className="card-premium tributario">
              <h3 className="text-lg font-semibold text-foreground mb-2">Mandado Tributário</h3>
              <p className="text-sm text-muted-foreground mb-4">Tributário · Mandado</p>
              <div className="flex justify-center">
                <a className="btn-gold text-sm px-4 py-2" href="/modelos/mandado-tributario.html">Ver Detalhes</a>
              </div>
            </article>

            <article className="card-premium penal">
              <h3 className="text-lg font-semibold text-foreground mb-2">Defesa Preliminar</h3>
              <p className="text-sm text-muted-foreground mb-4">Penal · Defesa</p>
              <div className="flex justify-center">
                <a className="btn-gold text-sm px-4 py-2" href="/modelos/defesa-preliminar.html">Ver Detalhes</a>
              </div>
            </article>

            <article className="card-premium administrativo">
              <h3 className="text-lg font-semibold text-foreground mb-2">Mandado de Segurança</h3>
              <p className="text-sm text-muted-foreground mb-4">Administrativo · Mandado</p>
              <div className="flex justify-center">
                <a className="btn-gold text-sm px-4 py-2" href="/modelos/mandado-seguranca.html">Ver Detalhes</a>
              </div>
            </article>
          </div>

          <p className="text-sm text-muted-foreground text-center mt-8">
            Observação: modelos servem como referência e exigem adaptação criteriosa ao caso concreto.
          </p>
        </div>
      </section>

      {/* Ethics Notice */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            Comunicação informativa. Sem promessa de resultado. Serviços exclusivos para advogados(as).
          </p>
        </div>
      </section>
    </div>
  );
}
