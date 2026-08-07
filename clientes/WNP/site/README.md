# WNP — Site institucional

Site institucional (homepage) da WNP Comunicação Visual. HTML/CSS/JS vanilla, sem build step.

## Estrutura

```
site/
├── index.html       # página única (nav, hero, pilares, por que, como funciona, sobre, cta, footer, dialog)
├── css/style.css     # design tokens (cores, tipografia, espaçamento) + estilos
├── js/main.js        # ícones inline (Lucide/MIT), scroll da nav, menu mobile, smooth scroll, dialog de contato
└── assets/
    ├── hero-neon.png
    └── portrait-founder.png
```

## Rodar localmente

Sem dependências — só abrir `index.html` no navegador. Para servir com um servidor local (evita
problemas de CORS/paths em alguns navegadores):

```powershell
npx serve .
# ou
python -m http.server 8000
```

## Deploy

Padrão Vercel (raiz do site = esta pasta `/site`). Ver `CLAUDE.md` na raiz do workspace para o fluxo completo.

## Pendências

- Formulário de contato (`#contactForm` em `index.html` / `initDialog()` em `js/main.js`) só simula o
  envio no front-end — precisa ser ligado a um backend (ex: Nodemailer, um form endpoint, etc).
- Telefone, e-mail, redes sociais e logos da vitrine de clientes estão com placeholders — confirmar com
  o cliente antes de publicar.
