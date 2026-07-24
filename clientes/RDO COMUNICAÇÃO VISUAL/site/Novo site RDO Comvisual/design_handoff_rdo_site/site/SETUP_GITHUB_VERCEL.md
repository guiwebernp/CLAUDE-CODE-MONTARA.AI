# Setup: GitHub + Vercel Deployment

Guia passo a passo para publicar o site RDO na Vercel via GitHub.

## 📌 O que faremos

1. Criar repositório no GitHub
2. Fazer push do código local
3. Conectar no Vercel
4. Configurar variáveis de ambiente
5. Deploy automático

---

## 1️⃣ Criar Repositório no GitHub

### A. No site do GitHub

1. Vá para [github.com/new](https://github.com/new)
2. **Repository name:** `rdo-site` (ou seu nome preferido)
3. **Description:** "RDO Comunicação Visual — Site institucional"
4. **Visibility:** Private (se for projeto fechado) ou Public
5. **Initialize:** NÃO marque nenhuma opção (já temos commits locais)
6. Clique **"Create repository"**

### B. Você verá comandos como:

```bash
# Não execute estes! Use os do passo 2 em vez disso.
```

---

## 2️⃣ Fazer Push do Código Local

No PowerShell/terminal, na pasta do projeto:

```powershell
cd "C:\Users\Gusin\OneDrive\Área de Trabalho\RDO COMUNICAÇÃO VISUAL\Novo site RDO Comvisual\design_handoff_rdo_site\site"

# Adicione o repositório remoto (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/rdo-site.git

# Renomeie a branch para 'main' (se estiver em 'master')
git branch -M main

# Faça push de todo o código
git push -u origin main
```

✅ Pronto! Seu código está no GitHub.

---

## 3️⃣ Conectar no Vercel

### Via Dashboard (mais fácil)

1. Vá para [vercel.com](https://vercel.com)
2. Faça login com sua conta (crie se não tiver)
3. Clique **"Add New..."** → **"Project"**
4. Em "Import Git Repository", procure por `rdo-site`
5. Clique **"Import"**

### Via CLI (alternativa)

```powershell
npm install -g vercel
vercel login
vercel
```

---

## 4️⃣ Configurar Variáveis de Ambiente

Após importar o projeto na Vercel:

1. Acesse seu projeto em [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique no projeto **"rdo-site"**
3. Vá em **"Settings"** → **"Environment Variables"**
4. Adicione cada variável abaixo (clique **"Add" a cada uma):

| Nome | Valor | Notas |
|------|-------|-------|
| `CONTACT_EMAIL` | `contato@rdocomvisual.com.br` | Onde os pedidos chegarão |
| `SMTP_HOST` | `smtp.gmail.com` | Ou seu SMTP |
| `SMTP_PORT` | `587` | Porta do SMTP |
| `SMTP_SECURE` | `false` | Para porta 587 (use `true` se for 465) |
| `SMTP_USER` | `seu-email@gmail.com` | Seu e-mail SMTP |
| `SMTP_PASS` | `sua-senha-app` | **NÃO sua senha comum** |
| `SMTP_FROM` | `noreply@rdocomvisual.com.br` | E-mail de origem |

### 📧 Configurar Gmail SMTP

Se for usar Gmail (recomendado para começar):

1. Ative 2-Step Verification em sua conta Google
2. Vá em [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Selecione "Mail" e "Windows Computer"
4. Copie a **senha de 16 caracteres** gerada
5. Cole como `SMTP_PASS` na Vercel

**Não use sua senha comum do Gmail!**

### ✅ Após adicionar as variáveis

Clique **"Save"** — o site será re-deployed automaticamente com as novas variáveis.

---

## 5️⃣ Deploy & Testes

### Verificar Deploy

1. Vá em **"Deployments"** tab no Vercel
2. Você deve ver um deployment "READY" em verde
3. Clique no link do projeto (ex: `rdo-site.vercel.app`)

### Testar Formulário

1. Acesse o site
2. Role até "Contato"
3. Preencha o formulário
4. Clique "Enviar pedido de orçamento"
5. Você deve ver "Recebemos seu pedido!"
6. Verifique seu e-mail (CONTACT_EMAIL)

### Ver Logs (se houver erro)

1. No Vercel Dashboard → seu projeto
2. **"Functions"** → **"contact"**
3. Veja os logs de execução

---

## 🔄 Workflow: Atualizar o Site

De agora em diante, basta:

```powershell
# Faça suas alterações nos arquivos

# Commit
git add .
git commit -m "Descrição do que mudou"

# Push para GitHub
git push origin main

# Vercel detecta automaticamente e faz deploy em ~1-2 min
```

Acompanhe em [vercel.com/dashboard](https://vercel.com/dashboard) → seu projeto.

---

## 🆘 Troubleshooting

### "git push" pede senha?

Gere um **GitHub Personal Access Token** (PAT):

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens**
2. Clique **"Generate new token"**
3. Selecione `repo` (acesso completo)
4. Copie o token (só aparece uma vez)
5. Use como **password** quando git pedir

Ou configure SSH:
- [GitHub Docs: SSH Setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

### Formulário não envia na Vercel?

- Verifique se as variáveis estão corretas no Vercel Dashboard
- Teste localmente: `npm run dev`
- Verifique logs em Vercel → Functions → Logs
- Confirme que SMTP_HOST, PORT, USER, PASS estão corretos

### E-mail de confirmação não chega?

- Verifique spam/lixo
- Para Gmail: confirme que você usou a **senha de app** (16 caracteres), não a senha da conta
- Tente com outro provedor (SendGrid, seu servidor SMTP, etc)

### Site mostra erro 500?

1. Acesse Vercel → Functions → contact
2. Veja qual erro exato aparece nos logs
3. Verifique variáveis de ambiente
4. Se for SMTP, teste a conexão localmente

---

## 📱 Domínio Personalizado (opcional)

Quando quiser usar um domínio seu (ex: `rdocomvisual.com.br`):

1. Vercel → seu projeto → **Settings** → **Domains**
2. Adicione seu domínio
3. Siga as instruções de DNS do seu registrador

---

## 🎯 Próximos Passos

Após o setup:

1. ✅ Receber fotos reais do portfólio
2. ✅ Atualizar placeholders com as fotos
3. ✅ Testar formulário completamente
4. ✅ Possível: adicionar CMS para portfólio
5. ✅ Possível: adicionar analytics (Google Analytics, etc)

---

## 💡 Dicas

- **Branch `main` é produção:** Qualquer push aqui faz deploy automático
- **Crie uma branch `develop`** para mudanças maiores se quiser
- **Sempre faça commit com mensagem clara:** Facilita rastrear mudanças
- **Teste localmente antes de fazer push:** `npm run dev`

---

## 📞 Suporte

Se encontrar dificuldades:

- **GitHub Docs:** [github.com/docs](https://github.com/docs)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Nodemailer:** [nodemailer.com/about](https://nodemailer.com/about/)

Boa sorte! 🚀
