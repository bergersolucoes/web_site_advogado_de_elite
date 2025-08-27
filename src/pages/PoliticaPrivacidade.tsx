export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Política de Privacidade</h1>
        
        <div className="space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Controlador</h2>
            <p>
              Esta política de privacidade se aplica aos serviços prestados pelo Advogado de Elite, 
              que atua como controlador dos dados pessoais coletados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Dados Coletados</h2>
            <p className="mb-4">Coletamos os seguintes dados pessoais:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dados de identificação: nome completo, OAB, UF</li>
              <li>Dados de contato: e-mail profissional, telefone</li>
              <li>Dados do caso: informações processuais, documentos anexos</li>
              <li>Dados de comunicação: mensagens trocadas durante o atendimento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Finalidades</h2>
            <p className="mb-4">Utilizamos seus dados para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Análise de viabilidade dos serviços solicitados</li>
              <li>Elaboração de petições e documentos jurídicos</li>
              <li>Faturamento e controle financeiro</li>
              <li>Suporte técnico e atendimento ao cliente</li>
              <li>Comunicações relacionadas aos serviços</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Bases Legais (LGPD)</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Execução de contrato:</strong> para prestação dos serviços contratados</li>
              <li><strong>Procedimentos preliminares:</strong> para análise de viabilidade</li>
              <li><strong>Legítimo interesse:</strong> para organização interna e melhorias</li>
              <li><strong>Consentimento:</strong> para comunicações promocionais (opcional)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Compartilhamento</h2>
            <p>
              Seus dados são compartilhados apenas com operadores necessários para a prestação do serviço, 
              como provedores de armazenamento em nuvem e sistemas de emissão fiscal, sempre sob contrato 
              de confidencialidade.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Segurança</h2>
            <p className="mb-4">Implementamos as seguintes medidas de segurança:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Criptografia em trânsito para todas as comunicações</li>
              <li>Acesso restrito aos dados por colaboradores autorizados</li>
              <li>Logs de auditoria para monitoramento de acessos</li>
              <li>Retenção mínima necessária dos dados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Direitos do Titular</h2>
            <p className="mb-4">Você tem os seguintes direitos:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acesso aos seus dados pessoais</li>
              <li>Correção de dados incompletos ou desatualizados</li>
              <li>Eliminação dos dados (quando aplicável)</li>
              <li>Oposição ao tratamento</li>
              <li>Portabilidade dos dados</li>
              <li>Revogação do consentimento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Canal de Privacidade</h2>
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de dados, 
              entre em contato através do e-mail: <strong>privacidade@advogadodeelite.com.br</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Alterações</h2>
            <p>
              Esta política pode ser atualizada periodicamente. As alterações serão comunicadas 
              através dos nossos canais oficiais de comunicação.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Vigência</h2>
            <p>
              Esta política entra em vigor na data de sua publicação e permanece válida até 
              posterior alteração.
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-card rounded-xl border border-border">
          <p className="text-sm text-muted-foreground text-center">
            Última atualização: Janeiro de 2024
          </p>
        </div>
      </div>
    </div>
  );
}