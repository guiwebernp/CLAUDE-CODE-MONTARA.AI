# Handoff: Site Plotter Service (redesign)

## Overview
Landing page institucional de página única para a **Plotter Service** — gráfica de impressão digital e offset em São José/SC. Objetivo: apresentar a empresa, listar serviços, mostrar trabalhos, localização e converter o visitante em contato via WhatsApp. Idioma: Português (Brasil).

## About the Design Files
Os arquivos deste pacote são **referências de design feitas em HTML** — protótipos que demonstram o visual e o comportamento pretendidos, **não** código de produção para copiar diretamente. A tarefa é **recriar este design no ambiente/código de destino** (React, Vue, Astro, WordPress, HTML estático, etc.) usando os padrões e bibliotecas já estabelecidos ali. Se ainda não houver um ambiente, escolha o framework mais adequado (para um site institucional simples, Astro ou Next.js estático funcionam bem) e implemente lá.

Obs.: `Plotter Service.dc.html` usa um runtime interno de componentes (tags `<x-dc>`, `<sc-for>`, `support.js`). **Ignore esse runtime** — o que importa é a marcação, os estilos inline e os dados. Os arrays de dados (`services`, `gallery`) estão no `<script data-dc-script>` ao final do arquivo.

## Fidelity
**Alta fidelidade (hifi).** Cores, tipografia, espaçamentos e interações são finais. Recriar pixel-perfect usando as bibliotecas/design system do código de destino. As imagens são **placeholders** (padrão listrado com legenda) — devem ser substituídas por fotos reais.

## Screens / Views

### Página única (single page) com âncoras
Navegação por âncoras: `#top`, `#empresa`, `#servicos`, `#trabalhos`, `#local`, `#contato`. `scroll-behavior: smooth` e `scroll-padding-top: 84px` (compensa a navbar fixa).

Container padrão de conteúdo: `max-width: 1200px; margin: 0 auto`. Padding horizontal das seções: `40px`.

#### 1. Navbar (sticky)
- **Layout**: `position: sticky; top: 0; z-index: 50`, flex space-between, padding `14px 40px`. Fundo `rgba(251,250,247,0.85)` + `backdrop-filter: blur(12px)`, borda inferior `1px solid rgba(15,27,51,0.08)`.
- **Logo (esquerda)**: símbolo colorido (`plotter-symbol.png`, 42×42px) **girando** (`@keyframes spin`, 8s linear infinite) + wordmark (`plotter-wordmark.png`, altura 32px).
- **Links (direita)**: Empresa, Serviços, Trabalhos, Localização — peso 600, 15px, cor `#0F1B33`. Botão "Fale conosco" → `#contato`: fundo `#123A7A`, texto branco, `border-radius: 999px`, padding `11px 22px`.

#### 2. Hero (`#top`)
- **Layout**: `position: relative; overflow: hidden; padding: 84px 40px 60px`.
- **Fundo**: camada full-bleed (`position:absolute; inset:0`) com imagem (placeholder/upload) + dois overlays de degradê:
  - `linear-gradient(105deg, #FBFAF7 0%, #FBFAF7 32%, rgba(251,250,247,0.82) 52%, rgba(251,250,247,0.45) 100%)` (legibilidade do texto à esquerda)
  - `linear-gradient(to bottom, rgba(251,250,247,0) 60%, #FBFAF7 100%)` (fade inferior)
  - **Importante**: conteúdo e cards precisam de `position: relative; z-index: 1` para ficarem acima dos overlays.
- **Badge**: pill branca com 4 pontos CMYK (cyan `#29ABE2`, magenta `#E6007E`, amarelo `#FFD100`, preto `#0F1B33`) + texto "IMPRESSÃO DIGITAL & OFFSET · SÃO JOSÉ/SC".
- **H1**: `clamp(44px, 8vw, 104px)`, Space Grotesk 700, `line-height: 0.95`, `letter-spacing: -0.035em`, cor `#0F1B33`. Texto: "Toda a cor do seu projeto, **impressa** [magenta] com **precisão** [cyan]." Palavras coloridas em `<span>`.
- **Parágrafo**: `clamp(17px,2vw,21px)`, cor `#4a5468`, peso 500, `max-width: 52ch`.
- **CTAs**: "Ver serviços →" (fundo `#E6007E`, branco) e "Pedir orçamento" (fundo branco, borda, texto `#123A7A`). Ambos pill 999px.
- **Cards (grid 1.6fr / 1fr, altura 380px, gap 20px)**:
  - Card grande: placeholder de foto com 3 chips CMYK no topo-esquerdo.
  - Card "+25" (fundo `#123A7A`, texto branco): "anos dando forma a projetos em Santa Catarina".
  - Card "CMYK" (fundo `#FFD100`, texto `#0F1B33`): "cor fiel, do arquivo ao papel".

#### 3. Marquee de serviços
Faixa `#123A7A`, texto branco Space Grotesk 22px, rolando infinito (`@keyframes marquee`, 24s linear). Itens separados por bullets coloridos (ciclo cyan/magenta/amarelo): PLOTAGENS CAD · BANNERS · OFFSET · ADESIVOS · LAMINAÇÃO · DIGITALIZAÇÃO. Conteúdo duplicado para loop contínuo.

#### 4. A Empresa (`#empresa`)
Grid 1fr/1fr, gap 70px, padding vertical 100px. Esquerda: placeholder de foto (`border-radius: 28px`, altura 460px). Direita: eyebrow "A EMPRESA" (magenta), H2 "Onde a inspiração toma forma", 2 parágrafos, e 2 stats ("6+ serviços especializados", "Digital + Offset").

#### 5. Serviços (`#servicos`)
Eyebrow "SERVIÇOS" (cyan), H2 "Do papel ao material que sua ideia pedir". Grid `repeat(3,1fr)`, gap 20px, **6 cards** (dados no array `services`). Cada card: fundo branco, borda `rgba(15,27,51,0.08)`, `border-radius: 22px`, padding 30px, `min-height: 250px`. Badge numérico 52×52px na cor do serviço. Hover: `border-color` = cor do serviço + `translateY(-4px)` (transição 0.2s).

#### 6. Trabalhos (`#trabalhos`)
Seção escura (fundo `#0F1B33`, texto branco). Eyebrow "TRABALHOS" (amarelo), H2 "O que sai da nossa gráfica", link "Quer algo assim?..." (amarelo). Grid `repeat(4,1fr)`, `grid-auto-rows: 200px`, gap 16px — cards com `span`/`row` variáveis (dados no array `gallery`), cada um com chip de cor no canto e label monospace.

#### 7. Localização (`#local`)
Grid 1fr/1fr. Esquerda: placeholder de mapa (substituir por embed do Google Maps). Direita: card `#123A7A` "Unidade São José" com Endereço (Subsolo do Supermercado Giassi, Rua Irineu Bornhausen, 425 — Campinas, São José/SC), Telefone (48) 3241-7564, WhatsApp (48) 98844-9144. Labels em amarelo.

#### 8. Contato (`#contato`)
Card grande com degradê `linear-gradient(135deg, #123A7A, #0F1B33)`, `border-radius: 32px`, padding `72px 56px`. Decoração: 3 quadrados CMYK arredondados no topo-direito. Eyebrow "CONTATO" (amarelo), H2 "Bora dar forma à sua ideia?", parágrafo. Botões: WhatsApp (fundo `#25D366`) → `https://wa.me/5548988449144`; Instagram e Facebook (fundo `rgba(255,255,255,0.12)`).

#### 9. Footer
Borda superior. Logo (símbolo + wordmark) à esquerda, copyright "© 2026 Plotter Service · Impressão Digital & Offset · São José/SC" à direita.

## Interactions & Behavior
- **Navegação por âncora** suave (`scroll-behavior: smooth`, `scroll-padding-top: 84px`).
- **Símbolo girando** na navbar: `animation: spin 8s linear infinite; transform-origin: 50% 50%`.
- **Marquee**: `animation: marquee 24s linear infinite` sobre um flex `width: max-content` com conteúdo duplicado; anima `translateX(0 → -50%)`.
- **Cards de serviço**: hover muda cor da borda e sobe 4px.
- **Links externos**: WhatsApp, Instagram, Facebook abrem os perfis reais.
- **Responsivo**: os grids de 2/3/4 colunas devem colapsar para 1 coluna em telas menores (o protótipo é desktop-first; implementar breakpoints no destino, ~768px).

## State Management
Site estático — sem estado de aplicação. Único ponto dinâmico: a imagem de fundo do hero (no protótipo é um slot arrastável; no site real, usar uma `<img>`/`background-image` fixa com a foto final).

## Design Tokens

**Cores**
- Fundo página: `#FBFAF7`
- Texto/escuro primário: `#0F1B33`
- Azul-marinho da marca: `#123A7A`
- Texto secundário: `#4a5468`; terciário/legenda: `#6a7183`, `#8a90a0`
- CMYK (acentos da marca): Ciano `#29ABE2`, Magenta `#E6007E`, Amarelo `#FFD100`, Preto `#0F1B33`
- WhatsApp: `#25D366`
- Placeholder listrado: `#eef0f4` / `#e6e9f0` (claro), `#232f47` / `#1c2740` (escuro)
- Bordas: `rgba(15,27,51,0.08)`

**Tipografia** (Google Fonts)
- Títulos/números: **Space Grotesk** (400/500/600/700)
- Corpo/UI: **Manrope** (400/500/600/700/800)
- Escala títulos: H1 `clamp(44px,8vw,104px)`; H2 `clamp(32px,4.5vw,52px)`; H2 contato `clamp(34px,5vw,60px)`
- Eyebrows: 14px, peso 800, `letter-spacing: 0.12em`, uppercase

**Raios**: cards 22px; blocos grandes 24–28px; contato 32px; pills/botões 999px; badges pequenos 10–14px.

**Espaçamento**: seções `padding: 100px 40px` (vertical típico); gaps 16–20px (grids), 70px (empresa), 40px (stats). Container `max-width: 1200px`.

## Assets
Em `assets/`:
- `plotter-symbol.png` — símbolo circular CMYK (recortado da logo). Usado na navbar (girando) e footer.
- `plotter-wordmark.png` — letreiro "plotter service" (recortado da logo). Navbar e footer.
- `logo-full-new.png` — logo completa original (referência).
- Placeholders de foto/mapa são gerados via CSS (`repeating-linear-gradient`) — substituir por imagens reais. Sugestão de hero: macro de impressora de grande formato com lona colorida saindo.

## Files
- `Plotter Service.dc.html` — protótipo completo (referência principal). Arrays de dados `services` e `gallery` no `<script data-dc-script>` final.
- `assets/plotter-symbol.png`, `assets/plotter-wordmark.png`, `assets/logo-full-new.png`
