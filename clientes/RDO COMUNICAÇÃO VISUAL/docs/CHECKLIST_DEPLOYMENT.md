# ☑️ RDO Site — Checklist de Deployment

**Data de Início:** _______________  
**Data de Conclusão:** _______________  
**Responsável:** _______________

---

## 📋 PRÉ-DEPLOYMENT (Preparação)

- [ ] Ler `QUICK_START.txt`
- [ ] Ter Python 3.x instalado (Node.js)
- [ ] Ter Git instalado
- [ ] Ter conta GitHub (criar em github.com se não tiver)
- [ ] Ter conta Vercel (criar em vercel.com se não tiver)
- [ ] Ter conta em um provedor SMTP (Gmail, SendGrid, etc)

---

## 🔧 FASE 1: GitHub Setup

**Tempo estimado: 5 minutos**

### Criar Repositório no GitHub

- [ ] Abrir [github.com/new](https://github.com/new)
- [ ] **Repository name:** `rdo-site`
- [ ] **Description:** `RDO Comunicação Visual — Site institucional`
- [ ] **Visibility:** `Private` ✓
- [ ] **NÃO inicializar com README, .gitignore, license**
- [ ] Clicar em **"Create repository"**
- [ ] Copiar a URL: `https://github.com/SEU-USUARIO/rdo-site.git`

**Resultado esperado:** Repositório criado, vazio, com instruções na tela.

---

## 🚀 FASE 2: Git Push

**Tempo estimado: 5 minutos**

### Fazer Push para GitHub

- [ ] Abrir **PowerShell** na pasta do site
  ```
  C:\Users\Gusin\OneDrive\Área de Trabalho\RDO COMUNICAÇÃO VISUAL\
  Novo site RDO Comvisual\design_handoff_rdo_site\site
  ```

- [ ] Executar comandos (substitua `SEU-USUARIO`):
  ```
  git remote add origin https://github.com/SEU-USUARIO/rdo-site.git
  git branch -M main
  git push -u origin main
  ```

- [ ] Se pedir **autenticação**:
  - [ ] Gerar **Personal Access Token** em [github.com/settings/tokens](https://github.com/settings/tokens)
  - [ ] Usar como **password**

- [ ] Verificar em GitHub:
  - [ ] Acessar [github.com/seu-usuario/rdo-site](https://github.com)
  - [ ] Ver todos os arquivos (index.html, css/, js/, api/, assets/, etc)

**Resultado esperado:** Código no GitHub, branch main com todos os commits.

---

## 🔌 FASE 3: Vercel Connection

**Tempo estimado: 5 minutos**

### Importar Repositório na Vercel

- [ ] Acessar [vercel.com](https://vercel.com)
- [ ] Fazer login (criar conta se necessário)
- [ ] Clicar **"Add New..."** → **"Project"**
- [ ] Procurar e selecionar **`rdo-site`**
- [ ] Clique **"Import"**
- [ ] Vercel faz o setup automático
- [ ] Aguardar até ver **"Deployment Successful"** em verde

**Resultado esperado:** Projeto importado, URL temporária gerada (ex: `rdo-site.vercel.app`).

---

## 📧 FASE 4: SMTP Setup

**Tempo estimado: 10-15 minutos**

### Escolher e Configurar Provedor de E-mail

**Opção recomendada: Gmail**

- [ ] Abrir [myaccount.google.com](https://myaccount.google.com)
- [ ] Ir em **"Security"**
- [ ] Habilitar **"2-Step Verification"** (se não tiver)
- [ ] Ir em [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
- [ ] App: **Mail** | Device: **Windows Computer**
- [ ] Clicar **"Generate"**
- [ ] **Copiar a senha de 16 caracteres** (sem espaços): `________________`

**Anotações:**
```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_SECURE = false
SMTP_USER = seu-email@gmail.com
SMTP_PASS = xxxx xxxx xxxx xxxx  ← Cole a senha aqui
SMTP_FROM = seu-email@gmail.com
CONTACT_EMAIL = contato@rdocomvisual.com.br
```

**Alternativas (se preferir):**
- [ ] SendGrid — Abrir [sendgrid.com](https://sendgrid.com), gerar API key
- [ ] Resend — Abrir [resend.com](https://resend.com), gerar API key
- [ ] Seu servidor SMTP — Obter credenciais do seu painel de hospedagem

---

## ✅ FASE 5: Teste Local

**Tempo estimado: 5-10 minutos**

### Validar Tudo Localmente Antes de Vercel

- [ ] Abrir PowerShell na pasta do site
- [ ] Instalar dependências:
  ```
  npm install
  ```
  
- [ ] Criar `.env.local` com as credenciais SMTP do passo anterior:
  ```
  CONTACT_EMAIL=contato@rdocomvisual.com.br
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=587
  SMTP_SECURE=false
  SMTP_USER=seu-email@gmail.com
  SMTP_PASS=sua-senha-app-aqui
  SMTP_FROM=seu-email@gmail.com
  ```

- [ ] Rodar o servidor local:
  ```
  npm run dev
  ```

- [ ] Abrir `http://localhost:3000`
- [ ] Rolar até seção **"Contato"**
- [ ] Preencher formulário:
  - [ ] Nome: `Teste Local`
  - [ ] E-mail: `seu-email@gmail.com` (seu e-mail mesmo)
  - [ ] Telefone: `(48) 99999-9999`
  - [ ] Serviço: qualquer opção
  - [ ] Mensagem: `Teste do formulário local`

- [ ] Clicar **"Enviar pedido de orçamento"**
- [ ] Ver a mensagem **"Recebemos seu pedido!"**
- [ ] Verificar seu e-mail (pode levar 1-5 minutos)

**Resultado esperado:** E-mail recebido com os dados do formulário.

**Se não chegou:**
- [ ] Verificar pasta **SPAM/Lixo** do e-mail
- [ ] Confirmar que `SMTP_PASS` é a **senha de app** (16 caracteres), não a senha comum
- [ ] Verificar logs locais no PowerShell (erros ali aparecem)
- [ ] Tentar outro provedor (SendGrid, Resend)

**Para parar o servidor local:** Pressione `Ctrl+C` no PowerShell

---

## 🔐 FASE 6: Environment Variables na Vercel

**Tempo estimado: 5 minutos**

### Adicionar Variáveis de Ambiente no Dashboard Vercel

- [ ] Acessar [vercel.com/dashboard](https://vercel.com/dashboard)
- [ ] Clicar no projeto **`rdo-site`**
- [ ] Ir em **"Settings"** (abinha superior)
- [ ] Clicar em **"Environment Variables"** (esquerda)

Para cada variável abaixo, **clicar "Add"**:

#### Variável 1
- [ ] Name: `CONTACT_EMAIL`
- [ ] Value: `contato@rdocomvisual.com.br`
- [ ] Clicar **"Save"**

#### Variável 2
- [ ] Name: `SMTP_HOST`
- [ ] Value: `smtp.gmail.com`
- [ ] Clicar **"Save"**

#### Variável 3
- [ ] Name: `SMTP_PORT`
- [ ] Value: `587`
- [ ] Clicar **"Save"**

#### Variável 4
- [ ] Name: `SMTP_SECURE`
- [ ] Value: `false`
- [ ] Clicar **"Save"**

#### Variável 5
- [ ] Name: `SMTP_USER`
- [ ] Value: `seu-email@gmail.com`
- [ ] Clicar **"Save"**

#### Variável 6
- [ ] Name: `SMTP_PASS`
- [ ] Value: `xxxx xxxx xxxx xxxx` (sua senha de app de 16 caracteres)
- [ ] Clicar **"Save"**

#### Variável 7
- [ ] Name: `SMTP_FROM`
- [ ] Value: `seu-email@gmail.com`
- [ ] Clicar **"Save"**

**Resultado esperado:** Todas as 7 variáveis visíveis no dashboard.  
**Efeito:** Vercel faz re-deploy automático (~1-2 min).

---

## 🧪 FASE 7: Teste em Produção

**Tempo estimado: 5 minutos**

### Validar que Tudo Funciona na Vercel

- [ ] Acessar [vercel.com/dashboard](https://vercel.com/dashboard)
- [ ] Seu projeto **`rdo-site`**
- [ ] Clicar no link (ex: `rdo-site.vercel.app`)
- [ ] Esperar carregar
- [ ] Rolar até seção **"Contato"**

- [ ] Preencher formulário:
  - [ ] Nome: `Teste Produção`
  - [ ] Empresa: (deixar em branco ou preencher)
  - [ ] E-mail: `seu-email@gmail.com`
  - [ ] Telefone: `(48) 99999-9999`
  - [ ] Serviço: qualquer opção
  - [ ] Mensagem: `Teste do formulário em produção`

- [ ] Clicar **"Enviar pedido de orçamento"**
- [ ] Ver **"Recebemos seu pedido!"**
- [ ] Aguardar 1-5 minutos
- [ ] Verificar seu e-mail
- [ ] Confirmar que o e-mail chegou corretamente

**Resultado esperado:** Site ao vivo e funcionando, formulário enviando e-mails.

**Se algo quebrou:**
- [ ] Ir em Vercel → Functions → `contact`
- [ ] Checar os logs de erro
- [ ] Verificar as variáveis de ambiente

---

## 🎯 Pós-Deployment

### Aguardando Cliente

- [ ] Receber **fotos reais do portfólio**
- [ ] Receber **fotos da seção "A Empresa"**
- [ ] Atualizar `index.html` com as novas imagens
- [ ] Fazer push: `git push origin main`
- [ ] Vercel faz deploy automaticamente

### Melhorias Futuras

- [ ] Domínio personalizado (ex: `rdocomvisual.com.br`)
- [ ] Analytics (Google Analytics)
- [ ] Rate limiting no formulário
- [ ] CMS para gerenciar portfólio

---

## ✨ Status Final

- [ ] GitHub setup completo
- [ ] Vercel importado e conectado
- [ ] SMTP configurado e testado (local)
- [ ] Variáveis adicionadas em Vercel
- [ ] Teste em produção passou
- [ ] Site ao vivo! 🎉

---

## 📞 Contato RDO

```
RDO Comunicação Visual
Telefone: (48) 3284-8000
E-mail: contato@rdocomvisual.com.br
Endereço: Rod. Maurício Sirotsky Sobrinho, 4567
          Jurerê — Florianópolis / SC · CEP 88053-701
```

---

## 📚 Documentação de Referência

- **QUICK_START.txt** — Guia ultra-rápido (6 passos)
- **SETUP_GITHUB_VERCEL.md** — Passo a passo detalhado
- **SMTP_SETUP.md** — 5 opções de provedor e-mail
- **README.md** — Overview técnico
- **RESUMO_PREPARACAO.md** — Checklist geral e status

---

## 💡 Dicas Importantes

✅ **Sempre teste localmente** antes de fazer push  
✅ **Use a senha de app do Gmail**, não a comum  
✅ **Não commite `.env`** (está em `.gitignore`)  
✅ **Aguarde 1-2 min** após adicionar variáveis no Vercel  
✅ **Verifique spam** se e-mail não chegar  

---

**🚀 Parabéns por chegar até aqui! Seu site está no ar!**

---

*Ultima atualização: 20 de julho de 2026*
