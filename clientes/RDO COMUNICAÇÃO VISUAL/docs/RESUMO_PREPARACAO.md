# ✅ RDO Site — Preparação para GitHub + Vercel

Data: 20 de Julho de 2026  
Status: **Pronto para deploy**

---

## 📦 O que foi feito

### 1. **Git Inicializado** ✅
- Repositório local criado
- `.gitignore` configurado
- `.gitattributes` para evitar conflitos de linha
- **2 commits iniciais** já feitos

### 2. **Vercel Functions (API Backend)** ✅
- Arquivo: `api/contact.js`
- Funcionalidade: Processa POST `/api/contact`
- Validação: Frontend + Backend
- E-mail: Envia com **Nodemailer**
- Segurança: HTML escape para prevenir XSS

### 3. **Configurações Vercel** ✅
- `vercel.json` — configuração de rotas e functions
- `package.json` — dependências (nodemailer)
- `.env.example` — referência de variáveis

### 4. **Documentação Completa** ✅
- `README.md` — overview do projeto e troubleshooting
- `SETUP_GITHUB_VERCEL.md` — passo a passo para deploy
- `SMTP_SETUP.md` — guias de 5 provedores de e-mail diferentes

### 5. **Formulário Atualizado** ✅
- `js/main.js` — agora aponta para `/api/contact` real
- Validação mantida no frontend
- Fallback: se API falhar, mostra erro amigável

---

## 🚀 Próximos Passos (Ação do Cliente/Dev)

### Passo 1: Criar Repositório no GitHub
```
1. Vá para github.com/new
2. Nome: "rdo-site"
3. Descrição: "RDO Comunicação Visual — Site institucional"
4. Visibility: Private (ou Public, sua escolha)
5. NÃO marque "Initialize repository"
6. Crie o repositório
```

**Arquivo:** [SETUP_GITHUB_VERCEL.md](./Novo\ site\ RDO\ Comvisual/design_handoff_rdo_site/site/SETUP_GITHUB_VERCEL.md) → Seção 1

---

### Passo 2: Push para GitHub
```powershell
cd "C:\Users\Gusin\OneDrive\Área de Trabalho\RDO COMUNICAÇÃO VISUAL\Novo site RDO Comvisual\design_handoff_rdo_site\site"

# Substitua SEU-USUARIO pelo seu usuário GitHub
git remote add origin https://github.com/SEU-USUARIO/rdo-site.git
git branch -M main
git push -u origin main
```

**Arquivo:** [SETUP_GITHUB_VERCEL.md](./Novo\ site\ RDO\ Comvisual/design_handoff_rdo_site/site/SETUP_GITHUB_VERCEL.md) → Seção 2

---

### Passo 3: Conectar Vercel
```
1. Vá para vercel.com
2. Faça login / Crie conta
3. Clique "Add New..." → "Project"
4. Procure por "rdo-site"
5. Clique "Import"
```

**Arquivo:** [SETUP_GITHUB_VERCEL.md](./Novo\ site\ RDO\ Comvisual/design_handoff_rdo_site/site/SETUP_GITHUB_VERCEL.md) → Seção 3

---

### Passo 4: Escolher Provedor SMTP & Configurar
**Opções:**
- ⭐ **Gmail** (mais fácil)
- 📨 **SendGrid** (escalável)
- 🚀 **Resend** (moderno)
- 💼 **Seu servidor SMTP**
- 🇧🇷 **Brevo** (Brasil)

**Arquivo:** [SMTP_SETUP.md](./Novo\ site\ RDO\ Comvisual/design_handoff_rdo_site/site/SMTP_SETUP.md) → Escolha sua opção

**Teste Local (antes de colocar em Vercel):**
```bash
# Crie .env.local na pasta do site com suas credenciais
npm install
npm run dev
# Teste o formulário em http://localhost:3000
```

---

### Passo 5: Adicionar Variáveis no Vercel Dashboard
```
1. vercel.com/dashboard → seu projeto "rdo-site"
2. Settings → Environment Variables
3. Adicione cada variável (CONTACT_EMAIL, SMTP_HOST, etc)
4. Clique "Save"
5. Site será re-deployed automaticamente
```

**Variáveis Necessárias:**
```
CONTACT_EMAIL = contato@rdocomvisual.com.br
SMTP_HOST = seu-host-smtp
SMTP_PORT = 587 (ou 465)
SMTP_SECURE = false (ou true)
SMTP_USER = seu-usuario-smtp
SMTP_PASS = sua-senha-app
SMTP_FROM = noreply@rdocomvisual.com.br
```

**Arquivo:** [SETUP_GITHUB_VERCEL.md](./Novo\ site\ RDO\ Comvisual/design_handoff_rdo_site/site/SETUP_GITHUB_VERCEL.md) → Seção 4

---

### Passo 6: Testar & Validar
```
1. Vá em vercel.com/dashboard → seu projeto
2. Clique no link (ex: rdo-site.vercel.app)
3. Role até "Contato"
4. Preencha o formulário
5. Clique "Enviar pedido de orçamento"
6. Confirme que recebeu o e-mail em CONTACT_EMAIL
```

---

## 📋 Estrutura de Arquivos Criados

```
site/
├── .git/                    # Repositório Git
├── .gitignore
├── .gitattributes
├── .env.example             # Template de variáveis
├── package.json             # Dependências
├── vercel.json              # Config Vercel
├── README.md                # Overview do projeto
├── SETUP_GITHUB_VERCEL.md   # Guia passo-a-passo ⭐ LEIA ESTE
├── SMTP_SETUP.md            # Opções de provedor e-mail ⭐ LEIA ESTE
├── index.html               # Frontend
├── css/style.css            # Estilos (design tokens)
├── js/main.js               # JavaScript (agora com /api/contact)
├── api/
│   └── contact.js           # Vercel Function para formulário
└── assets/
    ├── rdo-logo.png
    ├── eyes-blink.mp4
    ├── eyes-poster.png
    └── premio-banner.png
```

---

## 🔑 Checklist de Implementação

- [ ] Criar repositório no GitHub (SETUP_GITHUB_VERCEL.md, Seção 1)
- [ ] Fazer push do código (SETUP_GITHUB_VERCEL.md, Seção 2)
- [ ] Conectar Vercel (SETUP_GITHUB_VERCEL.md, Seção 3)
- [ ] Escolher provedor SMTP (SMTP_SETUP.md)
- [ ] Testar email localmente (SMTP_SETUP.md → "Testar a Configuração")
- [ ] Adicionar variáveis no Vercel (SETUP_GITHUB_VERCEL.md, Seção 4)
- [ ] Testar formulário em produção (SETUP_GITHUB_VERCEL.md, Seção 5)
- [ ] Receber fotos do portfólio
- [ ] Atualizar placeholders com fotos reais

---

## 🛠️ Tecnologia Usada

| Layer | Tecnologia | Versão |
|-------|-----------|--------|
| **Frontend** | HTML5, CSS3, JavaScript | Vanilla (sem framework) |
| **Backend** | Node.js + Nodemailer | 20.x |
| **Hosting** | Vercel Functions | — |
| **Versionamento** | Git + GitHub | — |
| **E-mail** | Nodemailer (SMTP) | 6.9.7 |
| **Environment** | dotenv | 16.3.1 |

---

## 💡 Detalhes Técnicos

### Como o Formulário Funciona (Nova Pipeline)

```
Frontend (HTML) 
    ↓
User preenche → Validação JS
    ↓
POST /api/contact
    ↓
Vercel Function (api/contact.js)
    ↓
Validação Backend + Escape HTML
    ↓
Nodemailer → SMTP
    ↓
Seu servidor SMTP → Gmail/SendGrid/etc
    ↓
E-mail chega em CONTACT_EMAIL
    ↓
Frontend mostra "Recebemos seu pedido!"
```

### Segurança

✅ **XSS Prevention:** HTML escape no backend  
✅ **Input Validation:** Frontend + Backend  
✅ **No exposed secrets:** `.env` em `.gitignore`  
✅ **HTTPS:** Automático na Vercel  
✅ **Rate limiting:** Pode adicionar depois se necessário  

---

## ⚠️ Pontos de Atenção

1. **Fotos do Portfólio** — Ainda são placeholders
   - Quando receber as fotos, substitua em `assets/portfolio/` ou `index.html`
   - Atualize e faça `git push` — Vercel faz deploy automático

2. **Domínio Personalizado** — Opcional
   - Por enquanto será `seu-projeto.vercel.app`
   - Depois pode apontar seu domínio na Vercel Dashboard

3. **Limites Gratuitos** — Depende do SMTP
   - Gmail: 500 e-mails/dia
   - SendGrid/Resend: 100 e-mails/dia
   - Seu servidor: Ilimitado (se for seu)

4. **Testes Locais** — Importante!
   - Sempre teste `npm run dev` antes de fazer push
   - Evita descobrir bugs em produção

---

## 📞 Contato do Cliente

```
RDO Comunicação Visual
Telefone: (48) 3284-8000
E-mail: contato@rdocomvisual.com.br
Endereço: Rod. Maurício Sirotsky Sobrinho, 4567
Jurerê — Florianópolis / SC · CEP 88053-701
```

---

## 📖 Documentação Referência

- **README.md** — Overview, troubleshooting, estrutura
- **SETUP_GITHUB_VERCEL.md** — Passo a passo de deployment
- **SMTP_SETUP.md** — Opções de e-mail e como configurar
- **API: api/contact.js** — Código da função serverless

---

## ✨ Próximas Melhorias (Futuro)

1. **Rate Limiting** — Prevenir spam (add depois)
2. **Analytics** — Google Analytics ou similar
3. **CMS para Portfólio** — Se mudar fotos com frequência
4. **Chat/WhatsApp** — Integração direta
5. **Dark Mode Toggle** — Site já é dark, mas poderia ter light
6. **Sitemap + SEO** — Melhorar indexação

---

## 🎉 Status Final

| Item | Status |
|------|--------|
| Git inicializado | ✅ Feito |
| API backend criada | ✅ Feito |
| Documentação | ✅ Completa |
| Código pronto para GitHub | ✅ Sim |
| Pronto para Vercel | ✅ Sim |
| Formulário funcional | ⏳ Aguardando SMTP config |
| Fotos do portfólio | ⏳ Aguardando cliente |

---

## 🚀 Você está 90% lá!

O código está pronto. Agora é só seguir os passos:

1. Crie repo no GitHub
2. Faça push
3. Conecte Vercel
4. Configure SMTP
5. Pronto!

**Tempo estimado:** 30-45 minutos

---

**Qualquer dúvida, consulte os arquivos de documentação no projeto.**

Boa sorte! 🎯
