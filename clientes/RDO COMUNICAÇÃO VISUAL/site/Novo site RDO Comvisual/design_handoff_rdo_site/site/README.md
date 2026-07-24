# RDO Comunicação Visual — Site Institucional

Landing page institucional para RDO Comunicação Visual. Hospedado na Vercel com API serverless para processar pedidos de orçamento.

## 📋 Stack

- **Frontend:** HTML5, CSS3, JavaScript vanilla
- **Backend:** Vercel Functions (Node.js)
- **Email:** Nodemailer
- **Hosting:** Vercel
- **Versionamento:** GitHub

## 🚀 Início Rápido

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/rdo-site.git
cd rdo-site
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
CONTACT_EMAIL=contato@rdocomvisual.com.br
SMTP_HOST=seu-smtp-host.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-usuario-smtp@email.com
SMTP_PASS=sua-senha-smtp
SMTP_FROM=noreply@rdocomvisual.com.br
```

#### Configurações SMTP recomendadas:

**Opção 1: Gmail** (melhor para começar)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app-gmail
```

⚠️ Para Gmail, gere uma [senha de aplicativo](https://myaccount.google.com/apppasswords) (não use sua senha comum).

**Opção 2: SendGrid**
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=SG.sua-chave-api
```

**Opção 3: Seu próprio servidor SMTP**
Configure conforme o provedor.

### 4. Teste localmente

```bash
npm run dev
```

Abre http://localhost:3000. O formulário funcionará em `/api/contact`.

### 5. Deploy na Vercel

#### Via CLI:

```bash
npm i -g vercel
vercel
```

#### Via GitHub + Vercel Dashboard:

1. Push para GitHub: `git push origin main`
2. Conecte o repositório em [vercel.com](https://vercel.com)
3. Adicione as variáveis de ambiente no Vercel Dashboard:
   - Settings → Environment Variables
4. Deploy automático a cada push

## 📁 Estrutura do Projeto

```
.
├── index.html              # Homepage
├── css/
│   └── style.css           # Estilos (design tokens + responsivo)
├── js/
│   └── main.js             # Lógica do frontend
├── api/
│   └── contact.js          # Endpoint POST para formulário
├── assets/
│   ├── rdo-logo.png
│   ├── eyes-blink.mp4
│   └── premio-banner.png
├── vercel.json             # Config da Vercel
├── package.json
└── .gitignore
```

## 🔧 Variáveis de Ambiente (Vercel)

No dashboard da Vercel, adicione:

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `CONTACT_EMAIL` | E-mail que recebe os pedidos | `contato@rdocomvisual.com.br` |
| `SMTP_HOST` | Host do servidor SMTP | `smtp.gmail.com` |
| `SMTP_PORT` | Porta SMTP | `587` |
| `SMTP_SECURE` | Usar TLS/SSL | `false` (para 587) ou `true` (para 465) |
| `SMTP_USER` | Usuário SMTP | `seu-email@gmail.com` |
| `SMTP_PASS` | Senha SMTP | Senha de app (não a senha comum) |
| `SMTP_FROM` | E-mail remetente | `noreply@rdocomvisual.com.br` |

## 📝 Formulário de Contato

O formulário coleta:
- Nome (obrigatório)
- Empresa (opcional)
- E-mail (obrigatório, validado)
- Telefone (obrigatório)
- Serviço de interesse (select)
- Detalhes do projeto (textarea)

Validação ocorre no frontend e no backend.

## 🎨 Design Tokens

Cores, tipografia e espaçamento estão centralizados em `css/style.css` (variáveis CSS).

Para customizar, edite as variáveis `:root`.

## 🎥 Vídeo dos Olhos

Duas camadas de `eyes-blink.mp4` fazem crossfade contínuo para parecer um loop perfeito.

O algoritmo:
1. Inicia em 0.9s (pula o intro "neon")
2. Faz crossfade 1.1s antes do fim
3. Alterna entre layer A e B
4. Watchdog a cada 1s garante que continue tocando

## 📊 Portfólio

Filtrável por categorias. As imagens são placeholders — atualize `assets/` quando receber as fotos reais.

Para adicionar nova foto:
1. Coloque em `assets/portfolio/`
2. Atualize a referência em `index.html` ou crie um CMS

## 🔒 Segurança

- Validação de input no frontend e backend
- Escape de HTML para prevenir XSS
- Variáveis sensíveis (.env) nunca são commitadas
- Sem exposição de chaves de API no cliente

## 📱 Responsivo

Breakpoints principais:
- Desktop: 1280px (full)
- Tablet: 900px
- Mobile: 560px (cards em coluna única)

## 🐛 Troubleshooting

**Formulário não envia?**
- Verifique as variáveis de ambiente em Vercel Dashboard
- Teste `npm run dev` localmente
- Verifique logs em Vercel → Functions → Logs

**E-mail não chega?**
- Verifique SMTP_HOST, PORT, USER, PASS
- Para Gmail, verifique se a "senha de app" foi gerada corretamente
- Check spam folder

**Vercel Functions não funcionam?**
- Certifique-se de que `api/contact.js` existe
- Verifique `vercel.json` → "functions"
- Teste localmente com `vercel dev`

## 📄 Contrato / Cliente

Contato: (48) 3284-8000  
E-mail: contato@rdocomvisual.com.br  
Endereço: Rod. Maurício Sirotsky Sobrinho, 4567 — Jurerê, Florianópolis / SC

## 📜 License

Proprietary — RDO Comunicação Visual
