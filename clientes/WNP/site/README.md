# WNP — Site institucional

Site institucional (homepage) da WNP Comunicação Visual. HTML/CSS/JS vanilla, sem build step.

## Estrutura

```
site/
├── index.html       # página única (nav, hero, comparação antes/agora, pipeline de aquisição, entregáveis, por que/modelo/clientes, sobre, cta, footer, dialog)
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

Netlify (exceção ao padrão Vercel dos demais sites, ver `CLAUDE.md`) — projeto `wnp-comunicacao-visual`,
site id `3a88aeec-f39c-45cc-a9fc-7c9d4c098ad0`. Redeploy via MCP Netlify (`deploy-site`), que devolve um
comando `npx @netlify/mcp` pra rodar dentro desta pasta.

## Pendências

- Formulário de contato (`#contactForm` em `index.html` / `initDialog()` em `js/main.js`) só simula o
  envio no front-end — precisa ser ligado a um backend (ex: Nodemailer, um form endpoint, etc).
- Telefone, e-mail, redes sociais e logos da vitrine de clientes estão com placeholders — confirmar com
  o cliente antes de publicar.
