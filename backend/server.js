import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { sendEmail } from './emailService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://adv.bergersolucoes.com/',
  credentials: true
}));
app.use(express.json());

// Middleware para logs
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Validação básica de campos obrigatórios
const validateRequired = (data, requiredFields) => {
  const missing = requiredFields.filter(field => !data[field] || data[field].trim() === '');
  if (missing.length > 0) {
    throw new Error(`Campos obrigatórios não preenchidos: ${missing.join(', ')}`);
  }
};

// Verificação de honeypot (anti-spam)
const checkHoneypot = (data) => {
  if (data.company && data.company.trim() !== '') {
    throw new Error('Spam detectado');
  }
};

// Endpoint principal para receber formulários
app.post('/api/contact', async (req, res) => {
  try {
    const { formType, ...formData } = req.body;

    // Verificação de honeypot
    checkHoneypot(formData);

    // Validações por tipo de formulário
    switch (formType) {
      case 'contact':
        validateRequired(formData, ['nome', 'email', 'telefone', 'uf', 'mensagem']);
        break;
      case 'petition':
        validateRequired(formData, ['nome', 'email', 'telefone', 'area', 'tipoPeticao', 'prazo', 'detalhes']);
        break;
      case 'mentoria':
        validateRequired(formData, ['nome', 'email', 'telefone', 'experiencia', 'area', 'objetivos']);
        break;
      case 'oab':
        validateRequired(formData, ['nome', 'email', 'telefone', 'universidade', 'semestre', 'modalidade', 'experiencia']);
        break;
      default:
        throw new Error('Tipo de formulário inválido');
    }

    // Enviar email
    const result = await sendEmail(formType, formData);

    res.json({
      success: true,
      message: 'Formulário enviado com sucesso! Entraremos em contato em breve.',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Erro no endpoint /api/contact:', error);
    res.status(400).json({
      success: false,
      error: error.message,
      message: 'Erro ao processar formulário. Tente novamente.'
    });
  }
});

// Endpoint de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Endpoint para testar configuração de email
app.get('/test-email', async (req, res) => {
  try {
    const testData = {
      nome: 'Teste',
      email: 'teste@teste.com',
      telefone: '(11) 99999-9999',
      uf: 'SP',
      mensagem: 'Email de teste'
    };

    await sendEmail('contact', testData);
    res.json({ success: true, message: 'Email de teste enviado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor',
    message: 'Tente novamente mais tarde'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📧 SMTP configurado para: ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
});
