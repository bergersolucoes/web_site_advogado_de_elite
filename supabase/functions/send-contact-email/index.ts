
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactRequest {
  nome?: string;
  name?: string;
  email: string;
  telefone?: string;
  phone?: string;
  uf?: string;
  oab?: string;
  mensagem?: string;
  message?: string;
  formType?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Edge function called:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const contactData: ContactRequest = await req.json();
    console.log('Received contact data:', contactData);

    // Normalize field names
    const name = contactData.nome || contactData.name || '';
    const email = contactData.email || '';
    const phone = contactData.telefone || contactData.phone || '';
    const message = contactData.mensagem || contactData.message || '';
    const formType = contactData.formType || 'contact';

    if (!name || !email || !message) {
      console.error('Missing required fields:', { name: !!name, email: !!email, message: !!message });
      return new Response(
        JSON.stringify({ error: 'Campos obrigatórios: nome, email e mensagem' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get site information (for multi-site setup)
    const domain = 'advogadodeelite.adv.br';
    const { data: site, error: siteError } = await supabase
      .from('sites')
      .select('id')
      .eq('domain', domain)
      .single();

    if (siteError) {
      console.error('Site query error:', siteError);
      return new Response(
        JSON.stringify({ error: 'Erro na configuração do site' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!site) {
      console.error('Site not found for domain:', domain);
      return new Response(
        JSON.stringify({ error: 'Site não encontrado' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Save contact to database
    const { error: dbError } = await supabase
      .from('contacts')
      .insert({
        site_id: site.id,
        name,
        email,
        phone,
        message: `${message}${contactData.uf ? `\nUF/OAB: ${contactData.uf}` : ''}${contactData.oab ? `\nNúmero OAB: ${contactData.oab}` : ''}`,
        form_type: formType
      });

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Erro ao salvar contato no banco de dados' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Contact saved to database successfully');

    // Try to send email using Resend API
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (resendApiKey) {
      try {
        const emailSubject = `Novo contato do site - ${name}`;
        const emailBody = `
          <h2>Novo contato recebido do site Advogado de Elite</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Telefone:</strong> ${phone}</p>` : ''}
          ${contactData.uf ? `<p><strong>UF/OAB:</strong> ${contactData.uf}</p>` : ''}
          ${contactData.oab ? `<p><strong>Número OAB:</strong> ${contactData.oab}</p>` : ''}
          <p><strong>Tipo:</strong> ${formType}</p>
          <h3>Mensagem:</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Enviado automaticamente pelo sistema em ${new Date().toLocaleString('pt-BR')}</small></p>
        `;

        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Advogado de Elite <noreply@advogadodeelite.adv.br>',
            to: ['bergersolucoes@gmail.com'],
            subject: emailSubject,
            html: emailBody,
          }),
        });

        const emailResult = await emailResponse.json();
        
        if (!emailResponse.ok) {
          console.error('Resend API error:', emailResult);
        } else {
          console.log('Email sent successfully via Resend:', emailResult);
        }
      } catch (emailError) {
        console.error('Error sending email via Resend:', emailError);
      }
    } else {
      console.log('RESEND_API_KEY not found, email not sent');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contato enviado com sucesso! Responderemos em até 24 horas úteis.' 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Error in send-contact-email function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor', 
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
};

serve(handler);
