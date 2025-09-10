#!/bin/bash

echo "🚀 Configurando backend para Advogado de Elite..."

# Entrar na pasta backend
cd backend

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Criar arquivo .env se não existir
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp .env .env.example
fi

echo "✅ Backend configurado!"
echo ""
echo "Para iniciar o backend:"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo "Para testar o envio de email:"
echo "  curl http://localhost:3001/test-email"
echo ""
echo "⚠️  Lembre-se de verificar se as configurações SMTP estão corretas no arquivo backend/.env"