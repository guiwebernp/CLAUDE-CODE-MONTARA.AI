# Montara.AI — Site Institucional

Site de vitrine/captação da própria Montara.AI: serviços, portfólio (RDO, Plotter Service, Clínica Reab), sobre e contato.

## Stack

- **HTML5** — semântico, acessível
- **CSS3** — Grid + Flexbox, mobile-first
- **JavaScript Vanilla** — sem dependências externas
- **Deploy** — a definir (padrão do monorepo é Vercel; domínio/hospedagem ainda não decididos)

## Estrutura

```
site/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos (mobile-first, dark mode)
├── js/
│   └── main.js         # Lógica (navbar, scroll reveal)
├── assets/
│   ├── logo.png         # Ícone (montanha/M azul)
│   └── logo-wordmark.png # Ícone + "Montara.ai"
└── README.md            # Esse arquivo
```

## Design

- **Paleta:** Dark mode, azul da marca como acento
  - Background: `#0A0A0F`
  - Accent: `#2E9EFF`
  - Text Light: `#F5F7FA`
  - Text Secondary: `#A0A8B8`
- **Tipografia:**
  - Headings: Space Grotesk
  - Body: Inter
- **Layout:** Hero + Serviços + Portfólio + Sobre + Contato + Footer

Detalhes completos da identidade em `identidade/design-guide.md`.

## Desenvolvimento local

1. Abra `index.html` em um navegador
2. F5 para recarregar após mudanças
3. DevTools (F12) para debug

## Funcionalidades

- Navbar responsiva com scroll effect + menu mobile
- Animações de fade-in ao scroll (IntersectionObserver)
- Mobile-first responsivo

## Pendências antes do deploy

- [ ] Definir domínio/hospedagem (Vercel é o padrão do monorepo)
- [ ] Trocar o número de WhatsApp placeholder em `index.html` (`https://wa.me/5548999999999`) pelo número real
- [ ] Confirmar e-mail de contato usado no `mailto:`

## Deploy

Segue o mesmo padrão dos demais projetos do monorepo (Vercel, raiz = pasta `/site`, deploy automático no push pra `main`) assim que o domínio for definido.
