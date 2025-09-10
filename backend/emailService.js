import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configuração do transporter SMTP
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verificar conexão SMTP
transporter.verify(function (error, success) {
  if (error) {
    console.log('Erro na configuração SMTP:', error);
  } else {
    console.log('Servidor SMTP configurado corretamente');
  }
});

// Templates de email
const emailTemplates = {
  contact: (data) => ({
    subject: 'Novo contato - Advogado de Elite',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #c9a961;">Novo Contato Recebido</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Nome:</strong> ${data.nome}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telefone:</strong> ${data.telefone}</p>
          <p><strong>UF/OAB:</strong> ${data.uf}</p>
          <p><strong>Número OAB:</strong> ${data.oab || 'Não informado'}</p>
          <div style="margin-top: 20px;">
            <strong>Mensagem:</strong>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${data.mensagem}
            </div>
          </div>
        </div>
        <p style="color: #666; font-size: 12px;">
          Email enviado automaticamente pelo site Advogado de Elite
        </p>
      </div>
    `
  }),

  petition: (data) => ({
    subject: 'Solicitação de Petição Sob Medida - Advogado de Elite',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #c9a961;">Solicitação de Petição Sob Medida</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Nome:</strong> ${data.nome}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telefone:</strong> ${data.telefone}</p>
          <p><strong>Área do Direito:</strong> ${data.area}</p>
          <p><strong>Tipo de Petição:</strong> ${data.tipoPeticao}</p>
          <p><strong>Prazo:</strong> ${data.prazo}</p>
          <div style="margin-top: 20px;">
            <strong>Detalhes do Caso:</strong>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${data.detalhes}
            </div>
          </div>
        </div>
        <p style="color: #666; font-size: 12px;">
          Email enviado automaticamente pelo site Advogado de Elite
        </p>
      </div>
    `
  }),

  mentoria: (data) => ({
    subject: 'Inscrição na Mentoria - Advogado de Elite',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #c9a961;">Nova Inscrição na Mentoria</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Nome:</strong> ${data.nome}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telefone:</strong> ${data.telefone}</p>
          <p><strong>Experiência:</strong> ${data.experiencia}</p>
          <p><strong>Área de Interesse:</strong> ${data.area}</p>
          <div style="margin-top: 20px;">
            <strong>Objetivos:</strong>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${data.objetivos}
            </div>
          </div>
        </div>
        <p style="color: #666; font-size: 12px;">
          Email enviado automaticamente pelo site Advogado de Elite
        </p>
      </div>
    `
  }),

  oab: (data) => ({
    subject: 'Inscrição na Preparação OAB - Advogado de Elite',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #c9a961;">Nova Inscrição na Preparação OAB</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Nome:</strong> ${data.nome}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telefone:</strong> ${data.telefone}</p>
          <p><strong>Universidade:</strong> ${data.universidade}</p>
          <p><strong>Semestre:</strong> ${data.semestre}</p>
          <p><strong>Modalidade:</strong> ${data.modalidade}</p>
          <div style="margin-top: 20px;">
            <strong>Experiência com a OAB:</strong>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${data.experiencia}
            </div>
          </div>
        </div>
        <p style="color: #666; font-size: 12px;">
          Email enviado automaticamente pelo site Advogado de Elite
        </p>
      </div>
    `
  })
};

// Função para enviar email
export const sendEmail = async (formType, formData) => {
  try {
    const template = emailTemplates[formType];
    if (!template) {
      throw new Error(`Template não encontrado para o tipo: ${formType}`);
    }

    const { subject, html } = template(formData);

    const mailOptions = {
      from: `"Advogado de Elite" <${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL,
      subject: subject,
      html: html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw error;
  }
};

export default { sendEmail };