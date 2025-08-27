import { 
  BookOpen, 
  Target, 
  Users, 
  FileText, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Award,
  Calendar,
  User
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import FormModal from "@/components/FormModal";
import { useToast } from "@/hooks/use-toast";
import oabHeroImage from "@/assets/oab-hero.jpg";
import oabStudyGroupImage from "@/assets/oab-study-group.jpg";

const overview = [
  {
    icon: BookOpen,
    title: "Método Claro",
    description: "Roteiros semanais por disciplina, metas objetivas e revisão periódica."
  },
  {
    icon: Target,
    title: "Simulados & Correções",
    description: "Provas modelos com gabarito comentado e análise de desempenho."
  },
  {
    icon: User,
    title: "Acompanhamento Humano", 
    description: "Sessões individuais e checkpoints para ajustar o percurso."
  }
];

const areas = [
  "Trabalho", "Civil", "Penal", "Empresarial", "Tributário", "Constitucional", "Administrativo"
];

const faqs = [
  {
    question: "Vocês garantem aprovação?",
    answer: "Não. Oferecemos método, materiais e correções para maximizar preparo; aprovação depende do candidato."
  },
  {
    question: "As sessões são online?",
    answer: "Sim. Materiais e simulados são entregues digitalmente."
  },
  {
    question: "Qual área devo escolher na 2ª fase?",
    answer: "Avaliamos seu histórico e afinidade para recomendar a melhor área."
  },
  {
    question: "Tem turma intensiva?",
    answer: "Podemos abrir janelas intensivas conforme calendário do exame."
  },
  {
    question: "Posso reagendar sessões?",
    answer: "Reagendamentos dependem de disponibilidade e política definida no início."
  }
];

export default function OabPage() {
  const { toast } = useToast();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={oabHeroImage} 
            alt="Preparação para Exame da Ordem OAB - estudante focado com materiais de estudo"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/85" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Preparação para a <span className="text-gradient">OAB</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Programa estruturado para 1ª e 2ª fase, com método claro, simulados e correções personalizadas — acompanhamento humano, sem IA.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-4 justify-center lg:justify-start">
              <FormModal
                title="Aplicar para a Preparação OAB"
                description="Preencha os dados para iniciarmos sua preparação para a OAB"
                fields={[
                  { name: 'nome', label: 'Nome completo', type: 'text', required: true },
                  { name: 'email', label: 'E-mail', type: 'email', required: true },
                  { name: 'telefone', label: 'Telefone', type: 'tel', required: true },
                  { name: 'cidade', label: 'Cidade/UF', type: 'text', required: true },
                  { name: 'status', label: 'Status', type: 'select', required: true, options: ['Estudante de Direito', 'Bacharel'] },
                  { name: 'fase', label: 'Fase desejada', type: 'select', required: true, options: ['1ª Fase (Objetiva)', '2ª Fase (Prático‑Profissional)'] },
                  { name: 'area', label: 'Área pretendida (2ª fase)', type: 'select', options: ['Trabalho', 'Civil', 'Penal', 'Empresarial', 'Tributário', 'Constitucional', 'Administrativo'] },
                  { name: 'dataExame', label: 'Data prevista do exame (se souber)', type: 'text' },
                  { name: 'disponibilidade', label: 'Disponibilidade semanal (horas)', type: 'number' },
                  { name: 'objetivos', label: 'Principais dúvidas/objetivos', type: 'textarea', required: true, rows: 5 },
                  { name: 'company', label: '', type: 'text' },
                  { name: 'lgpd', label: 'Li e concordo com a Política de Privacidade', type: 'checkbox', required: true }
                ]}
                trigger={<button className="btn-gold">Quero Preparação para OAB</button>}
              />
              <a href="/" className="btn-outline-gold">
                Voltar à Home
              </a>
            </div>
            
            {/* Video Hero */}
            <div className="video-hero card-premium">
              <iframe 
                src="" 
                title="Vídeo de apresentação - Exame OAB" 
                allowFullScreen 
                loading="lazy"
                className="mb-4"
              ></iframe>
              <p className="text-sm text-muted-foreground">Trocar o src deste iframe quando o vídeo estiver pronto.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Para quem é</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="text-center lg:text-left">
              <ul className="space-y-6">
                {[
                  "Estudantes de Direito que vão prestar o Exame da Ordem.",
                  "Bacharéis que buscam retomar os estudos com método e disciplina.",
                  "Quem precisa de plano prático, rotina guiada e correções individualizadas."
                ].map((item, index) => (
                  <li key={index} className="flex items-start justify-center lg:justify-start">
                    <CheckCircle className="h-6 w-6 text-accent mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-foreground text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img 
                src={oabStudyGroupImage} 
                alt="Estudantes de direito em grupo de estudo para OAB com livros e materiais"
                className="rounded-xl shadow-card hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visão Geral */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Visão Geral do Programa</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Preparação completa e realista para as duas fases. Construímos um plano que combina estudo dirigido, simulados e feedbacks, com foco em constância e clareza.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {overview.map((item, index) => (
              <FeatureCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Trilhas de Estudo */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Trilhas de Estudo</h2>
          
          {/* 1ª Fase */}
          <div className="mb-16">
            <div className="card-premium mb-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">OAB 1ª Fase (Objetiva)</h3>
                <p className="text-muted-foreground">
                  Dominamos a abordagem objetiva com foco em Ética, legislação seca, súmulas e treino orientado por assunto.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Conteúdos</h4>
                  <ul className="space-y-2">
                    {[
                      "Mapa de estudos por disciplina (ênfase em Ética).",
                      "Leitura dirigida: legislação, súmulas e entendimentos cobrados.",
                      "Resolução de questões por tema, com revisão espaçada.",
                      "Simulados por blocos e gerais, controle de tempo."
                    ].map((item, index) => (
                      <li key={index} className="flex items-start text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Técnicas</h4>
                  <ul className="space-y-2">
                    {[
                      "Método de revisão 7–3–1 na reta final.",
                      "Gestão de tempo e estratégias de prova.",
                      "Diário de erros e caderno de revisões."
                    ].map((item, index) => (
                      <li key={index} className="flex items-start text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">Entregáveis da 1ª Fase</h4>
                <ul className="space-y-2">
                  {[
                    "Plano pessoal de estudos (cronograma semanal).",
                    "Listas‑guia por disciplina e checklists.",
                    "Simulados com gabarito comentado e relatório de desempenho."
                  ].map((item, index) => (
                    <li key={index} className="flex items-start text-muted-foreground">
                      <Award className="h-4 w-4 text-accent mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 2ª Fase */}
          <div>
            <div className="card-premium">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">OAB 2ª Fase (Prático‑Profissional)</h3>
                <p className="text-muted-foreground">
                  Foco em identificação da peça, estrutura canônica e redação técnica com fundamentos contextualizados.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Áreas Disponíveis</h4>
                  <p className="text-muted-foreground mb-4">
                    {areas.join(", ")}.
                  </p>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Conteúdos</h4>
                  <ul className="space-y-2">
                    {[
                      "Identificação rápida da peça e organização da resposta.",
                      "Estrutura: endereçamento, fatos, fundamentos, pedidos.",
                      "Banco de peças comentadas e espelhos de correção.",
                      "Jurisprudência e fundamentos sem prolixidade."
                    ].map((item, index) => (
                      <li key={index} className="flex items-start text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Prática & Correção</h4>
                  <ul className="space-y-2">
                    {[
                      "Simulados prático‑profissionais por área escolhida.",
                      "Correção individual com feedback ponto a ponto.",
                      "Checklist de materiais permitidos e organização."
                    ].map((item, index) => (
                      <li key={index} className="flex items-start text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">Entregáveis da 2ª Fase</h4>
                <ul className="space-y-2">
                  {[
                    "Roteiros de peças por área.",
                    "Modelos comentados (uso didático).",
                    "Correções com observações personalizadas."
                  ].map((item, index) => (
                    <li key={index} className="flex items-start text-muted-foreground">
                      <Award className="h-4 w-4 text-accent mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              "Diagnóstico inicial: entrevista, linha do tempo e disponibilidade.",
              "Plano de ação: cronograma semanal com metas claras.",
              "Acompanhamento: sessões individuais e checkpoints.",
              "Simulados & correções: relatórios de desempenho e ajustes.",
              "Reta final: estratégia de véspera e checklist de prova."
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-accent-foreground">{index + 1}</span>
                </div>
                <p className="text-muted-foreground text-sm">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendário & Rotina */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Calendário & Rotina</h2>
            <p className="text-muted-foreground">
              Adaptamos o plano conforme a data do exame. Mantemos constância com metas semanais e revisões guiadas.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-4">
              {[
                "Ritmo sugerido: 8–12 semanas para 1ª fase; 6–8 semanas para 2ª fase.",
                "Blocos de estudo diários com pausas e revisão ativa.",
                "Janelas de plantão de dúvidas combinadas."
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <Calendar className="h-6 w-6 text-accent mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Perguntas Frequentes</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="group">
                <summary className="flex justify-between items-center cursor-pointer p-4 bg-background rounded-lg border border-border hover:border-accent/50 transition-colors">
                  <span className="text-foreground font-medium">{faq.question}</span>
                  <ArrowRight className="h-5 w-5 text-accent transition-transform group-open:rotate-90" />
                </summary>
                <div className="p-4 bg-card rounded-b-lg border-x border-b border-border">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Aviso Legal */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            Comunicação de caráter informativo. Sem promessa de aprovação. Dados tratados conforme LGPD. Materiais e correções são apoio ao estudo, não substituem preparação pessoal.
          </p>
        </div>
      </section>
    </div>
  );
}