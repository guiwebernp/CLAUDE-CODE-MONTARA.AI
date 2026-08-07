# Plotter Service — Website

Site profissional responsivo para Plotter Service (impressão digital & offset).

## Estrutura

```
site/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos (responsivo)
├── js/
│   └── main.js         # Scripts (animações, etc)
├── assets/             # Imagens e ícones
│   ├── plotter-symbol.png      # Logo símbolo (animado)
│   ├── plotter-wordmark.png    # Logo wordmark
│   ├── placeholder-hero.jpg    # Hero background (substitua)
│   └── [outras imagens]
└── README.md           # Este arquivo
```

## Cores Oficiais

- **Azul**: `#29ABE2`
- **Magenta/Rosa**: `#E6007E`
- **Amarelo**: `#FFD100`
- **Azul Escuro**: `#123A7A` / `#0F1B33`
- **Fundo**: `#FBFAF7`

## Fontes

- **Headings**: Space Grotesk (400, 500, 600, 700)
- **Body**: Manrope (400, 500, 600, 700, 800)

*Carregadas via Google Fonts no HTML*

## Seções

1. **Navbar** - Logo animada + menu + CTA
2. **Hero** - Banner com heading, subtitle e dois botões
3. **Marquee** - Serviços em rolagem infinita
4. **Sobre** - Apresentação da empresa com foto
5. **Serviços** - 6 cards com ícones coloridos
6. **Trabalhos** - Galeria de portfólio (placeholders)
7. **Localização** - Mapa + contato
8. **Contato** - CTA com WhatsApp, Instagram, Facebook
9. **Footer** - Logo e copyright

## Próximos Passos

### 1. Substituir Placeholders de Imagens

Coloque as imagens na pasta `assets/`:

- `placeholder-hero.jpg` → Foto de impressora em ação (banner 16:9)
- Galeria de trabalhos → Substituir placeholders na seção "Trabalhos"
- Foto da empresa → Substituir na seção "Sobre"

### 2. Integrar Mapa Google Maps

Na seção "Localização", substituir:
```html
<div class="location__map">
  <span class="placeholder">[ mapa — Google Maps ]</span>
</div>
```

Por um iframe do Google Maps:
```html
<iframe class="location__map" src="https://www.google.com/maps/embed?pb=..." style="border: 0; border-radius: 24px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
```

### 3. Email/Formulário de Contato (Opcional)

Atualmente, os botões de contato levam direto pro WhatsApp e redes sociais.
Se quiser um formulário, adicione um backend/Formspree/etc.

### 4. Deploy

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Ou fazer upload manual** em qualquer hosting.

## Responsividade

O site é totalmente responsivo:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: até 767px

Breakpoints no CSS:
- `@media (max-width: 768px)` - Tablets e Mobile
- `@media (max-width: 480px)` - Phones

## Tipografia

- `font-size: clamp(valor-min, vw, valor-max)` → Escala fluida com viewport

Exemplos:
- `clamp(44px, 8vw, 104px)` → Entre 44px e 104px, baseado em 8% da viewport width

## Customização

### Mudar Cores Principais

No `css/style.css`, busque por:
- `#29ABE2` (azul)
- `#E6007E` (magenta)
- `#FFD100` (amarelo)
- `#123A7A` (azul escuro)

### Mudar Tipografia

No `index.html`, altere a URL do Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
```

### Adicionar/Remover Seções

Cada seção é independente. Basta copiar a estrutura e adaptar.

## Desempenho

- Sem dependências externas (puro HTML/CSS/JS)
- CSS otimizado (sem bloat)
- Lazy loading de imagens (nativo)
- Animações suaves com `@keyframes`

## Suporte

Para dúvidas ou ajustes, fale com Guilherme — workspace WNP (antes Montara.AI).

---

*Criado com Claude Code · 20 de julho de 2026*
