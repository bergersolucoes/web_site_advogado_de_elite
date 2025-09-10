import { useState } from "react";
import { Mail, Phone, Clock, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    uf: "",
    oab: "",
    mensagem: ""
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://adv.bergersolucoes.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          uf: formData.uf,
          oab: formData.oab,
          mensagem: formData.mensagem,
          formType: 'contact',
          company: '' // Honeypot field
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Mensagem Enviada",
          description: result.message || "Recebemos sua mensagem. Responderemos em até 24 horas úteis."
        });
        setFormData({ nome: "", email: "", telefone: "", uf: "", oab: "", mensagem: "" });
      } else {
        throw new Error(result.error || 'Erro no envio');
      }
    } catch (error) {
      console.error('Error sending form:', error);
      toast({
        title: "Erro no Envio",
        description: "Não foi possível enviar sua mensagem. Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-premium py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Entre em <span className="text-gradient">Contato</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Estamos aqui para esclarecer suas dúvidas e ajudar com seus projetos jurídicos.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card-premium">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Envie sua mensagem</h2>
              <p className="text-muted-foreground">
                Preencha o formulário abaixo e entraremos em contato o mais breve possível.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    E-mail profissional
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    UF/OAB
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.uf}
                    onChange={(e) => setFormData({...formData, uf: e.target.value})}
                    placeholder="Ex: SP/123456"
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Número OAB
                  </label>
                  <input
                    type="text"
                    value={formData.oab}
                    onChange={(e) => setFormData({...formData, oab: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mensagem
                </label>
                <textarea
                  rows={6}
                  required
                  value={formData.mensagem}
                  onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                  placeholder="Descreva sua necessidade ou dúvida..."
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="mt-1 mr-3 h-4 w-4 text-accent border-border rounded focus:ring-accent"
                />
                <label className="text-sm text-muted-foreground">
                  Li e concordo com a{" "}
                  <a href="/politica-privacidade" className="text-accent hover:underline">
                    Política de Privacidade
                  </a>
                </label>
              </div>

              <button type="submit" className="btn-gold w-full">
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensagem
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="card-premium mb-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Informações de Contato</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">E-mail Profissional</h4>
                    <p className="text-muted-foreground">contato@advogadodeelite.com.br</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">WhatsApp Corporativo</h4>
                    <p className="text-muted-foreground">+55 (11) 99999-9999</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Horário de Atendimento</h4>
                    <p className="text-muted-foreground">
                      Segunda à Sexta: 9h às 18h<br />
                      Resposta em até 24 horas úteis
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Atendimento</h4>
                    <p className="text-muted-foreground">
                      Exclusivamente online<br />
                      Todo o Brasil
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-premium">
              <h3 className="text-xl font-bold text-foreground mb-4">Sobre nossos serviços</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Atendemos advogados em todo o Brasil com serviços especializados em petições sob medida, 
                  mentoria profissional e preparação para a OAB.
                </p>
                <p>
                  Todos os nossos serviços são prestados com sigilo profissional, qualidade técnica e 
                  acompanhamento personalizado.
                </p>
                <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                  <p className="text-accent text-sm font-medium">
                    Tempo médio de resposta: 4-6 horas úteis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Aviso Legal */}
      <section className="py-12 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            Comunicação informativa. Sem promessa de resultado. Serviços destinados a advogados(as). 
            Dados tratados conforme LGPD.
          </p>
        </div>
      </section>
    </div>
  );
}
