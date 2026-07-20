# Clínica Reab — Site Institucional

Site responsivo de fisioterapia em Florianópolis.

## Stack

- **HTML5** — semântico, acessível
- **CSS3** — Grid + Flexbox, mobile-first
- **JavaScript Vanilla** — sem dependências externas
- **Deploy** — Vercel (auto-deploy on `main` branch)

## Estrutura

```
site/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos (mobile-first, dark mode)
├── js/
│   └── main.js         # Lógica (navbar, animações, filtros, contadores)
├── assets/
│   └── hero-reab.mp4   # Vídeo da hero section
└── README.md           # Esse arquivo
```

## Design

- **Paleta:** Dark mode (marrom/bege/rosa)
  - Background: `#1F1917`
  - Accent: `#8C4450`
  - Text Light: `#F2E9E8`
  - Text Secondary: `#B9ACA9`
- **Tipografia:** 
  - Headings: Bricolage Grotesque
  - Body: Instrument Sans
- **Layout:** Hero + Sobre + Serviços (bento) + Estrutura + Patologias + Depoimentos + Blog + Footer

## Desenvolvimento local

1. Abra `index.html` em um navegador
2. F5 para recarregar após mudanças
3. DevTools (F12) para debug

## Funcionalidades

- Navbar responsiva com scroll effect
- Contadores animados na hero
- Filtro de patologias (Todas, Ortopedia, Neurologia, Desempenho)
- Animações de fade-in ao scroll
- Mobile-first responsivo

## Deploy (Vercel)

1. Push do `main` branch dispara deploy automático
2. Raiz do site: pasta `/site`
3. Build: nenhum (static HTML/CSS/JS)

## Contato

Links WhatsApp/Telefone/Email devem ser preenchidos no HTML conforme dados do cliente.
