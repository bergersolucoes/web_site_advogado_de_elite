# 🚨 CORREÇÕES NECESSÁRIAS

## 1. Erro do Deploy Vercel - "vite: command not found"

**Problema**: O Vite está em `devDependencies`, mas a Vercel precisa dele em `dependencies`.

**Solução**: Mover o Vite para dependencies:

```bash
npm install vite --save
npm uninstall vite --save-dev
```

Ou manualmente editar o `package.json`:
- Mover `"vite": "^5.4.19"` de `devDependencies` para `dependencies`

## 2. 📧 Configuração do Email de Destino

**Onde configurar**: No arquivo `backend/.env` na linha 14:

```env
TO_EMAIL=contato@advogadodeelite.com.br
```

**Mude para seu email**:
```env
TO_EMAIL=seuemail@seudominio.com.br
```

## 3. 🔄 URLs de Produção

Quando fizer deploy do backend, atualize estas URLs nos componentes:

### FormModal.tsx (linha ~28):
```javascript
// Mudar de:
fetch('http://localhost:3001/api/contact', {

// Para:
fetch('https://seu-backend.vercel.app/api/contact', {
```

### ContatoPage.tsx (linha ~20):
```javascript
// Mudar de:
fetch('http://localhost:3001/api/contact', {

// Para:
fetch('https://seu-backend.vercel.app/api/contact', {
```

## 4. ⚡ Deploy Rápido

### Frontend (Vercel):
1. Corrigir o package.json (mover vite)
2. Deploy na Vercel

### Backend (Vercel):
1. Criar novo projeto na Vercel
2. Deploy da pasta `backend/`
3. Configurar variáveis de ambiente:
   - `SMTP_HOST=smtp.hostinger.com`
   - `SMTP_PORT=465`
   - `SMTP_SECURE=true`
   - `SMTP_USER=envios@assinasite.com.br`
   - `SMTP_PASS=Assina@0892@1981`
   - `FROM_EMAIL=envios@assinasite.com.br`
   - `TO_EMAIL=seuemail@seudominio.com.br`
   - `FRONTEND_URL=https://seu-frontend.vercel.app`

## 5. 🎯 Resumo

1. **Corrigir vite**: Mover para dependencies
2. **Email destino**: Mudar `TO_EMAIL` no backend/.env
3. **Deploy backend**: Vercel com variáveis de ambiente
4. **Atualizar URLs**: Trocar localhost pelas URLs de produção
5. **Testar**: Verificar se formulários enviam emails

Todos os 5 formulários estão prontos e funcionais!