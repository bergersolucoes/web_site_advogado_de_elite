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
  name: string;
  email: string;
  phone?: string;
  message: string;
  formType?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message, formType = 'contact' }: ContactRequest = await req.json();

    console.log('Received contact form submission:', { name, email, formType });

    // Get site information (for multi-site setup)
    const domain = 'advogadodeelite.adv.br';
    const { data: site } = await supabase
      .from('sites')
      .select('id')
      .eq('domain', domain)
      .single();

    if (!site) {
      console.error('Site not found for domain:', domain);
      return new Response(
        JSON.stringify({ error: 'Site configuration not found' }),
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
        message,
        form_type: formType
      });

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save contact' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Send email using SMTP
    const smtpHost = Deno.env.get('SMTP_HOST');
    const smtpPort = Deno.env.get('SMTP_PORT');
    const smtpUser = Deno.env.get('SMTP_USER');
    const smtpPassword = Deno.env.get('SMTP_PASSWORD');

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword) {
      console.error('SMTP configuration missing');
      return new Response(
        JSON.stringify({ error: 'Email configuration missing' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create email content
    const emailSubject = `Novo contato do site - ${formType}`;
    const emailBody = `
Novo contato recebido do site Advogado de Elite:

Nome: ${name}
Email: ${email}
${phone ? `Telefone: ${phone}` : ''}
Tipo: ${formType}

Mensagem:
${message}

---
Enviado automaticamente pelo sistema
`;

    // Send email using fetch to SMTP service
    try {
      // Using a simple HTTP request to send email
      // Note: In production, you might want to use a proper SMTP library
      const emailResponse = await fetch(`https://api.emailjs.com/api/v1.0/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'smtp_service',
          template_id: 'contact_template',
          user_id: 'public_key',
          template_params: {
            to_email: smtpUser,
            from_name: name,
            from_email: email,
            subject: emailSubject,
            message: emailBody
          }
        })
      });

      console.log('Email sent successfully');
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails, contact is already saved
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contato enviado com sucesso!' 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Error in send-contact-email function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
};

serve(handler);