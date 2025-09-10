# Configuração do Projeto - Advogado de Elite

## ✅ O que foi feito

1. **Removido Supabase completamente**:
   - Deletadas pastas `src/integrations/supabase/` e `supabase/`
   - Removidas dependências `@supabase/supabase-js` e `@tanstack/react-query`
   - Deletado arquivo `.env` antigo

2. **Criado backend próprio**:
   - Servidor Express.js na pasta `backend/`
   - Configuração SMTP com Hostinger
   - Templates de email diferenciados para cada tipo de formulário
   - Sistema anti-spam com honeypot

3. **Atualizados os 5 formulários**:
   - ✅ **Contato** (`ContatoPage.tsx`) - Formulário direto
   - ✅ **Petição Sob Medida** (`FormModal` em `PetitionPage.tsx`) - 2 instâncias
   - ✅ **Mentoria** (`FormModal` em `MentoriaPage.tsx`)
   - ✅ **Preparação OAB** (`FormModal` em `OabPage.tsx`)

## 🚀 Como executar

### 1. Frontend (React)
```bash
npm install
npm run dev
```

### 2. Backend (Express)
```bash
cd backend
npm install
npm run dev
```

Ou use o script automatizado:
```bash
chmod +x setup-backend.sh
./setup-backend.sh
cd backend
npm run dev
```

### 3. Testar formulários
1. Frontend: http://localhost:5173
2. Backend: http://localhost:3001
3. Teste de email: http://localhost:3001/test-email

## 📧 Configuração SMTP

As credenciais já estão configuradas em `backend/.env`:

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=envios@assinasite.com.br
SMTP_PASS=Assina@0892@1981
```

## 🔄 Templates de Email

Cada tipo de formulário tem seu template específico:

- **Contato**: Template simples com todos os campos
- **Petição**: Template com dados da petição (área, tipo, prazo, detalhes)
- **Mentoria**: Template focado em experiência e objetivos
- **OAB**: Template com dados universitários e modalidade

## 🛡️ Segurança

- ✅ Validação de campos obrigatórios
- ✅ Sistema honeypot anti-spam
- ✅ Sanitização de dados
- ✅ CORS configurado
- ✅ Helmet para headers de segurança

## 📋 Para produção

1. **Deploy do backend**: Vercel, Railway, Heroku, etc.
2. **Atualizar URLs**: Mudar `http://localhost:3001` para URL de produção
3. **Configurar variáveis**: Ajustar `FRONTEND_URL` e `TO_EMAIL`
4. **SSL**: Certificado para HTTPS

## 🎯 Próximos passos

O projeto está 100% funcional e independente do Supabase. Todos os 5 formulários enviam emails via SMTP do Hostinger.

Para colocar em produção, apenas faça o deploy do backend e atualize as URLs nos componentes React.