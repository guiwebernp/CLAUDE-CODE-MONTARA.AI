# Configuração SMTP — Opções Detalhadas

Guia para configurar o envio de e-mails do formulário com diferentes provedores.

---

## 🏆 Opção 1: Gmail (Recomendado para começar)

**Vantagens:** Gratuito, confiável, fácil de configurar  
**Desvantagens:** Limite de ~500 e-mails/dia

### Passo a passo

#### 1. Habilitar 2-Step Verification

1. Vá para [myaccount.google.com](https://myaccount.google.com)
2. Clique **"Security"** (esquerda)
3. Procure por **"2-Step Verification"**
4. Siga as instruções para ativar

#### 2. Gerar Senha de App

1. Vá para [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Se não aparecer, volte e confirme que 2-Step está ligado
3. Em **"Select the app and device you're using"**:
   - App: **Mail**
   - Device: **Windows Computer** (ou seu SO)
4. Clique **"Generate"**
5. Google gera uma **senha de 16 caracteres** (sem espaços)
6. **Copie essa senha** (fica visível só uma vez)

#### 3. Configurar na Vercel

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx  ← Cola a senha de 16 caracteres aqui
SMTP_FROM=seu-email@gmail.com
```

⚠️ **Importante:** Use a **senha de app gerada**, não sua senha comum do Gmail!

---

## 📨 Opção 2: SendGrid (Profissional, escalável)

**Vantagens:** Suporta até 100 e-mails/dia grátis, bom para produção  
**Desvantagens:** Requer conta no SendGrid

### Passo a passo

#### 1. Criar Conta SendGrid

1. Vá para [sendgrid.com](https://sendgrid.com)
2. Clique **"Sign Up"**
3. Preencha os dados
4. Confirme via e-mail

#### 2. Gerar Chave de API

1. No dashboard do SendGrid, vá em **Settings** → **API Keys**
2. Clique **"Create API Key"**
3. Nome: `RDO Site Form`
4. Permissões: Full Access (ou Mail Send)
5. Clique **"Create & View"**
6. **Copie a chave** (aparece uma única vez)

#### 3. Configurar na Vercel

```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=SG.sua-chave-api-aqui
SMTP_FROM=noreply@rdocomvisual.com.br
```

Neste caso, `SMTP_USER` é sempre `apikey` (literal).

---

## 🚀 Opção 3: Resend (Muito fácil para indie devs)

**Vantagens:** Simples, otimizado para JavaScript/Node.js  
**Desvantagens:** Limite de 100 e-mails/dia grátis

### Passo a passo

#### 1. Criar Conta Resend

1. Vá para [resend.com](https://resend.com)
2. Clique **"Get started"**
3. Autentique com GitHub ou Google

#### 2. Gerar Chave de API

1. Vá em **API Keys**
2. Clique **"Create API Key"**
3. **Copie a chave**

#### 3. Atualizar Código (modificar `api/contact.js`)

```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // ...validação...
  
  try {
    await resend.emails.send({
      from: process.env.SMTP_FROM || 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Pedido de orçamento — ${name}`,
      html: `...` // mesmo HTML acima
    });
    res.status(200).json({ success: true });
  } catch (err) {
    // ...
  }
}
```

#### 4. Variáveis de Ambiente

```
RESEND_API_KEY=re_sua_chave_api
CONTACT_EMAIL=contato@rdocomvisual.com.br
SMTP_FROM=noreply@rdocomvisual.com.br
```

**Instale Resend:**
```bash
npm install resend
```

---

## 💼 Opção 4: Seu Próprio Servidor SMTP

Se a RDO tem hospedagem própria com e-mail.

### Exemplo: cPanel / Plesk

```
SMTP_HOST=mail.seu-dominio.com.br
SMTP_PORT=587          # ou 465 para SSL
SMTP_SECURE=false      # ou true se for porta 465
SMTP_USER=contato@seu-dominio.com.br
SMTP_PASS=sua-senha-email
SMTP_FROM=contato@seu-dominio.com.br
```

**Verifique com seu provedor de hospedagem qual é o SMTP_HOST exato.**

---

## ✉️ Opção 5: Brevo (ex-Sendinblue) — Brasil-friendly

**Vantagens:** Suporta português, bom custo-benefício  
**Desvantagens:** Interface em francês/inglês

### Passo a passo

1. Vá para [brevo.com](https://brevo.com)
2. Criar conta
3. Em **SMTP & API** → **SMTP**
4. Copiar configurações:

```
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com    # seu email de conta Brevo
SMTP_PASS=sua-chave-smtp-brevo
SMTP_FROM=seu-email-verificado@seu-dominio.com.br
```

---

## 🔍 Testar a Configuração Localmente

Antes de fazer push para Vercel:

### 1. Crie `.env.local` na raiz do projeto

```env
CONTACT_EMAIL=seu-email-teste@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app
SMTP_FROM=seu-email@gmail.com
```

### 2. Instale dependências

```bash
npm install
```

### 3. Rode localmente

```bash
npm run dev
```

### 4. Teste o formulário

1. Acesse http://localhost:3000
2. Role até **Contato**
3. Preencha:
   - Nome: "Teste"
   - E-mail: "seu-email-teste@gmail.com"
   - Telefone: "(48) 99999-9999"
   - Serviço: qualquer um
   - Mensagem: "Teste do formulário"
4. Clique **"Enviar pedido de orçamento"**
5. Você deve ver **"Recebemos seu pedido!"**
6. Verifique seu e-mail (pode levar 1-5 minutos)

**Se não funcionar:**
- Verifique a senha SMTP (para Gmail, garanta que é a **senha de app**)
- Verifique os logs locais no terminal (verá erros ali)
- Tente outro provedor

---

## 🚨 Segurança

- **Nunca** commite `.env` ou `.env.local` (estão no `.gitignore`)
- **Sempre** use a **senha de app** para Gmail, não a senha comum
- **Verifique** que a variável SMTP_PASS não fica visível em logs públicos
- Para produção, use HTTPS (Vercel faz automaticamente)

---

## 📊 Comparação Rápida

| Provedor | Setup | Gratuito | Limite Gratuito | Recomendado Para |
|----------|--------|----------|-----------------|-----------------|
| **Gmail** | ⭐⭐⭐ Fácil | ✅ Sim | 500/dia | Testes, pequeno volume |
| **SendGrid** | ⭐⭐ Médio | ✅ Sim | 100/dia | Startup, escalável |
| **Resend** | ⭐⭐⭐ Fácil | ✅ Sim | 100/dia | Dev-friendly |
| **Seu servidor** | ⭐ Difícil | ✅ Sim* | Ilimitado* | Produção, grande volume |
| **Brevo** | ⭐⭐ Médio | ✅ Sim | 300/dia | Brasil |

*Depende do seu plano de hospedagem

---

## 💡 Minha Recomendação

Para RDO agora:
1. **Comece com Gmail** (mais fácil)
2. **Depois considere SendGrid ou Resend** quando escalar
3. **Se tiver servidor próprio**, use seu SMTP

---

## 🆘 Verificar Credenciais SMTP

Se não tiver certeza das credenciais:

### Gmail
1. [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Se não aparecer, ativar 2-Step Verification primeiro

### SendGrid
1. [app.sendgrid.com](https://app.sendgrid.com) → Settings → API Keys

### Seu servidor
1. Verifique sua hospedagem / painel cPanel / Plesk
2. Geralmente aparece em **Email** ou **Mail**
3. Procure por "SMTP", "Mail Server", "Outgoing Mail"

---

## ✅ Checklist Final

- [ ] Escolhi meu provedor SMTP
- [ ] Gerei a senha/chave de API
- [ ] Testei localmente com `.env.local`
- [ ] E-mail de teste chegou com sucesso
- [ ] Adicionei as variáveis no Vercel Dashboard
- [ ] Site foi re-deployed automaticamente
- [ ] Testei o formulário em produção (vercel.app)
- [ ] E-mail chegou no endereço correto

Sucesso! 🎉
