# Backend - Advogado de Elite

Backend para processar formulários do site Advogado de Elite.

## Configuração

1. Instalar dependências:
```bash
cd backend
npm install
```

2. Configurar variáveis de ambiente no arquivo `.env`:
```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=envios@assinasite.com.br
SMTP_PASS=Assina@0892@1981
PORT=3001
FRONTEND_URL=http://localhost:5173
FROM_EMAIL=envios@assinasite.com.br
TO_EMAIL=contato@advogadodeelite.com.br
```

## Execução

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

## Endpoints

- `POST /api/contact` - Recebe formulários
- `GET /health` - Health check
- `GET /test-email` - Teste de envio de email

## Tipos de Formulário

- `contact` - Formulário de contato geral
- `petition` - Solicitação de petição sob medida
- `mentoria` - Inscrição na mentoria
- `oab` - Inscrição na preparação OAB

## Deploy

Para produção, configure as variáveis de ambiente no seu provedor de hospedagem e ajuste a `FRONTEND_URL` para o domínio do site.