import { useState } from "react";
import { 
  Target, 
  User, 
  FileText, 
  TrendingUp, 
  Lightbulb, 
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import FormModal from "@/components/FormModal";
import { useToast } from "@/hooks/use-toast";
import mentoriaHeroImage from "@/assets/mentoria-hero.jpg";

const benefits = [
  {
    icon: User,
    title: "Sessões Individuais",
    description: "Mentoria 1:1 com diagnóstico e plano de ação personalizado."
  },
  {
    icon: Target,
    title: "Plano de Evolução", 
    description: "Metas semanais, rotinas de estudo/trabalho e checkpoints."
  },
  {
    icon: FileText,
    title: "Materiais de Apoio",
    description: "Checklists, roteiros, templates e boas práticas de redação."
  }
];

const topics = [
  "Definição de nicho",
  "Gestão de casos", 
  "Tecnologia na prática",
  "Redação forense",
  "Estratégia processual",
  "Organização e produtividade"
];

const steps = [
  {
    title: "Diagnóstico",
    description: "entrevista, mapeamento de contexto e metas.",
    icon: Target
  },
  {
    title: "Plano de ação", 
    description: "cronograma de evolução por semanas.",
    icon: TrendingUp
  },
  {
    title: "Acompanhamento",
    description: "sessões 1:1 + checkpoints objetivos.", 
    icon: User
  },
  {
    title: "Entrega contínua",
    description: "materiais e feedbacks práticos.",
    icon: FileText
  }
];

const faqs = [
  {
    question: "As sessões são online?",
    answer: "Sim. Usamos plataformas de videoconferência e entregamos materiais digitais."
  },
  {
    question: "Existe promessa de resultado?",
    answer: "Não. A mentoria é orientação técnica e estratégica; resultados dependem de execução."
  },
  {
    question: "Posso reagendar?",
    answer: "Reagendamentos conforme disponibilidade e política combinada no início."
  }
];

export default function MentoriaPage() {
  const { toast } = useToast();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={mentoriaHeroImage} 
            alt="Mentoria jurídica - advogados em reunião de consultoria estratégica"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/85" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            <span className="text-gradient">Mentoria</span> para Advogados
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Orientação estratégica e prática para nicho, gestão, tecnologia e redação forense — com 35 anos de atuação em diversas áreas do Direito, sem IA.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-4 justify-center lg:justify-start">
              <FormModal
                title="Aplicar para a Mentoria"
                description="Preencha os dados para iniciarmos sua avaliação de mentoria"
                fields={[
                  { name: 'nome', label: 'Nome completo', type: 'text', required: true },
                  { name: 'email', label: 'E-mail profissional', type: 'email', required: true },
                  { name: 'telefone', label: 'Telefone', type: 'tel', required: true },
                  { name: 'cidade', label: 'Cidade/UF', type: 'text', required: true },
                  { name: 'objetivos', label: 'Objetivos principais', type: 'textarea', required: true, rows: 5 },
                  { name: 'company', label: '', type: 'text' },
                  { name: 'lgpd', label: 'Li e concordo com a Política de Privacidade', type: 'checkbox', required: true }
                ]}
                trigger={<button className="btn-gold">Solicitar Mentoria</button>}
              />
              <a href="/" className="btn-outline-gold">
                Voltar à Home
              </a>
            </div>
            
            {/* Video Hero */}
            <div className="video-hero card-premium">
              <iframe 
                src="" 
                title="Vídeo de apresentação - Mentoria" 
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ul className="space-y-4">
                {[
                  "Advogados(as) buscando consolidar ou redefinir seu nicho jurídico.",
                  "Profissionais que querem ganhar eficiência com gestão e tecnologia.", 
                  "Quem precisa elevar a redação forense e a estratégia dos casos.",
                  "Escritórios em fase de reestruturação e padronização de qualidade."
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-accent mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img 
                src={mentoriaHeroImage} 
                alt="Consultoria e mentoria jurídica especializada para advogados"
                className="rounded-xl shadow-elegant"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* O que você recebe */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">O que você recebe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <FeatureCard key={index} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* Tópicos */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Tópicos que trabalhamos</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {topics.map((topic, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium border border-accent/20"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Como funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Perguntas Frequentes</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="group">
                <summary className="flex justify-between items-center cursor-pointer p-4 bg-card rounded-lg border border-border hover:border-accent/50 transition-colors">
                  <span className="text-foreground font-medium">{faq.question}</span>
                  <ArrowRight className="h-5 w-5 text-accent transition-transform group-open:rotate-90" />
                </summary>
                <div className="p-4 bg-background rounded-b-lg border-x border-b border-border">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Aviso Ético */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            Comunicação informativa. Sem promessa de resultado. Serviço B2B para advogados(as). Dados tratados conforme LGPD.
          </p>
        </div>
      </section>
    </div>
  );
}