# Handoff: Site RDO Comunicação Visual (Landing Page)

## Visão geral
Landing page institucional de página única para a **RDO Comunicação Visual** (Florianópolis / SC, desde 2006) — empresa de comunicação visual: impressão digital, envelopamento de frota, placas/sinalização, outdoors, luminosos, painéis, adesivos e feiras/eventos.

O site é dark (fundo quase-preto) com azul elétrico como cor de marca, um herói com o wordmark "RDO" cromado, um **vídeo dos olhos piscando** em faixa full-bleed e o slogan **"Sua marca vista com outros olhos!"**. Objetivo: apresentar a empresa e capturar pedidos de orçamento via formulário.

## Sobre os arquivos deste pacote
Os arquivos aqui são uma **referência de design feita em HTML** — um protótipo que mostra a aparência e o comportamento pretendidos, **não** código de produção para copiar diretamente.

> `RDO Home.dc.html` é um "Design Component": abre no navegador, mas depende do runtime `support.js` (que interpreta as tags `<x-dc>`, `<sc-for>`, `<sc-if>` e o `data-props`). **Não** faça deploy desse arquivo como está.

A tarefa é **recriar este design no ambiente do projeto de destino** usando os padrões e bibliotecas já estabelecidos. Se ainda não existir um projeto, recomenda-se implementar como um site estático simples — **Next.js** (React) ou **Astro** são ótimas escolhas para uma landing page com um formulário. Toda a marcação é HTML/CSS comum com um pouco de JS; converter para componentes é direto.

## Fidelidade
**Alta fidelidade (hi-fi).** Cores, tipografia, espaçamentos e interações são finais. Recrie a UI pixel-a-pixel. Os valores exatos estão em **Design Tokens** abaixo.

## Como recriar (resumo prático)
1. Estruture uma página única com âncoras: `#empresa`, `#servicos`, `#portfolio`, `#premios`, `#contato`.
2. Copie todo o CSS inline do protótipo (cada elemento tem `style="..."`). Os `{{ ... }}` são dados vindos da classe lógica — veja os arrays em **Conteúdo/Dados** e renderize com `.map()`.
3. Fontes via Google Fonts: **Saira** (600–900), **Poppins** (500–800), **Manrope** (400–800), **IBM Plex Mono** (400–500).
4. Assets em `assets/` (ver seção **Assets**).
5. O formulário hoje só troca estado local (mostra "Recebemos seu pedido!"). Ligue a um backend/e-mail real (ver **Formulário**).

---

## Telas / Seções (em ordem)

### 1. Nav (sticky, topo)
- **Layout:** flex `space-between`, `padding:18px 40px`, fundo `rgba(5,7,13,.82)` com `backdrop-filter:blur(14px)`, borda inferior `1px solid rgba(120,160,255,.1)`, `position:sticky; top:0; z-index:100`.
- **Esquerda:** logo `assets/rdo-logo.png`, `height:52px`.
- **Centro:** links uppercase, `font-size:13px; font-weight:700; letter-spacing:.08em; gap:30px`. Itens: Home (ativo, cor `#3b8dff`), Sobre (`#empresa`), Serviços, Portfólio, Prêmios, Contato (inativos `rgba(255,255,255,.72)`).
- **Direita:** rótulo "SIGA-NOS" (IBM Plex Mono, 11px, `#3b8dff`) + 2 ícones sociais (Instagram, Facebook `https://www.facebook.com/rdocomvisual/`) em quadrados 32×32, borda `rgba(120,160,255,.28)`, `border-radius:8px`.

### 2. Hero
- **Fundo:** `radial-gradient(60% 40% at 50% 32%, rgba(31,123,255,.20), transparent 60%)` sobre `#05070d`. `padding:56px 0 0`, `text-align:center`.
- **Decoração:** dois blocos de "dot grid" nos cantos (`radial-gradient(rgba(120,160,255,.12) 1px, transparent 1px)`, `background-size:22px 22px`, com máscara diagonal) + dois "streaks" verticais azuis animados (`@keyframes streak`).
- **Wordmark "RDO":** Saira 800, `font-size:200px`, `line-height:.86`, classe `.chrome` (degradê prata — ver tokens).
- **Telefone:** Saira, `font-size:64px`. "(48)" em `#2b8fff` peso 800; "3284-8000" com `.chrome`.
- **Localidade:** "JURERÊ – FLORIPA – BRASIL", Saira 600, `font-size:22px`, `letter-spacing:.42em`, `rgba(255,255,255,.72)`.
- **Divisor azul:** barra `height:2px`, `linear-gradient(90deg,transparent,#2b8fff 30%,#9fccff 50%,#2b8fff 70%,transparent)`, `box-shadow:0 0 22px rgba(43,143,255,.7)`.
- **Faixa de olhos (vídeo):** container `overflow:hidden`, altura `380px`. **Dois** elementos `<video>` sobrepostos (`assets/eyes-blink.mp4`, `muted playsinline`, `object-fit:cover; object-position:center 60%`) que fazem crossfade para loop sem corte (ver **Interações**). Sobre eles: brilho azul pulsante embaixo (`@keyframes eyeGlow`), vinheta lateral (`box-shadow:inset 60px 0 70px -20px #05070d` nos dois lados) e fades topo/base para `#05070d`.
- **Slogan:** Poppins 600, `font-size:30px`, `letter-spacing:.14em`, uppercase, branco; "outros olhos!" em `#2b8fff` com `text-shadow:0 0 26px rgba(43,143,255,.7)`.
- **Linha de serviços (5 colunas):** grid `repeat(5,1fr)`, cada item = ícone de linha (SVG, stroke `#3b8dff`) + título em duas linhas (2ª palavra em `#2b8fff`) + descrição curta `11.5px rgba(255,255,255,.5)`; separador `border-left:1px solid rgba(120,160,255,.14)`. Conteúdo: ver `heroServices` em **Conteúdo/Dados**.
- **Chevron:** seta para baixo animada (`@keyframes bob`), link para `#servicos`.

### 3. A Empresa (`#empresa`)
- Grid 2 colunas (`1fr 1fr`, `gap:56px`), `padding:96px 40px`, fundo dark com `radial-gradient(... at 82% 0%)` e textura dot-grid.
- **Esquerda:** eyebrow "// A EMPRESA" (IBM Plex Mono, `#2b8fff`, `letter-spacing:.18em`); H2 Poppins 800 `40px` uppercase "Experiência, estrutura e gente que faz acontecer"; 2 parágrafos (`16px`, `line-height:1.7`, `rgba(255,255,255,.65)`) — ver **Conteúdo**; 3 stats em Saira 800 `40px` cor `#2b8fff`: **+20** anos de mercado, **100%** equipe própria, **+500** projetos entregues.
- **Direita:** grid 2×2 de placeholders de foto (aspecto definido por `170px` de linha), um deles ocupando 2 linhas. São **placeholders** aguardando fotos reais.

### 4. Serviços (`#servicos`)
- `padding:96px 40px`, fundo `#080b14`, borda superior `rgba(120,160,255,.08)`.
- Cabeçalho central: "// O QUE FAZEMOS" + H2 "Comunicação visual de ponta a ponta".
- Grid `repeat(4,1fr)`, `gap:16px`, 8 cards. Card: `linear-gradient(180deg,#0d1320,#0a0f1a)`, borda `rgba(120,160,255,.12)`, `border-radius:14px`, `padding:26px 22px`. Hover: `translateY(-4px)`, `box-shadow:0 18px 44px rgba(31,123,255,.22)`, borda `rgba(43,143,255,.45)`. Badge numérico 44×44 com `linear-gradient(145deg,#2b8fff,#0f4fbf)`. Conteúdo: ver `services` em **Conteúdo/Dados**.

### 5. Portfólio (`#portfolio`)
- `padding:96px 40px`, fundo `#080b14`.
- Cabeçalho "// NOSSOS TRABALHOS" + H2 "Portfólio".
- **Filtros:** pílulas (`border-radius:100px`) com categorias — a ativa usa `linear-gradient(180deg,#3b8dff,#1560d8)` e texto branco; inativas borda `rgba(120,160,255,.2)`. Categorias: Todos, Adesivo Digital, Frontlight, Lona, Luminosos, Painéis, Personalização de Frota, Feiras & Eventos.
- **Grade:** `repeat(3,1fr)`, `gap:16px`, cards `aspect-ratio:4/3` com overlay inferior (categoria em `#2b8fff` mono + título branco). Filtragem por categoria no clique.
- Hoje as imagens são **placeholders** (a RDO deve enviar fotos reais). Há URLs de referência do site atual no array `items` do JS (podem estar protegidas por hotlink — baixar e servir localmente).

### 6. Reconhecimento / Prêmios (`#premios`)
- `padding:80px 40px`. Um banner de imagem `assets/premio-banner.png` (medalha "Eleita a melhor em qualidade e atendimento — Global Pesquisas"), `border-radius:14px`, `box-shadow` + moldura dourada sutil `inset 0 0 0 1px rgba(240,201,74,.22)`. Sobre a arte há uma área clicável (link para `#servicos`) posicionada sobre o botão desenhado no banner.

### 7. Depoimentos (`#depoimentos`)
- Grid `repeat(3,1fr)`, 3 cards. Estrelas `★★★★★` em `#2b8fff`, citação, autor (branco 800) e empresa (`#2b8fff`). Conteúdo em `testimonials`.

### 8. Contato / Orçamento (`#contato`)
- Grid 2 colunas (`1fr 1.1fr`). Esquerda: eyebrow "// FALE COM A GENTE", H2 "Peça seu orçamento", parágrafo, telefone **(48) 3284-8000** e endereço **Rod. Maurício Sirotsky Sobrinho, 4567 — Jurerê, Florianópolis / SC · CEP 88053-701**.
- Direita: card de formulário (ver **Formulário**).

### 9. Footer
- Fundo `#04060a`. Logo `assets/rdo-logo.png` (56px) + tagline; coluna Contato; coluna Navegação. Copyright "© 2006–2026 RDO Comunicação Visual".

---

## Interações & Comportamento
- **Loop do vídeo dos olhos (importante):** o `.mp4` tem frames iniciais "neon" e um corte perceptível no fim. A solução usa **duas camadas de vídeo** que começam em `currentTime = 0.9s` (pula o neon) e fazem **crossfade de 1.1s** perto do fim (`duration - CROSS`) — a camada oculta entra em `opacity 1` enquanto a ativa vai a `0`, então trocam de papel. Há um "watchdog" (`setInterval` 1s) que dá `play()` de novo caso o autoplay seja bloqueado. Ambos os vídeos ficam **mudos** (`muted`) para o autoplay funcionar. Veja `componentDidMount` no JS.
- **Filtro de portfólio:** clicar numa pílula filtra os cards por `cat` (estado `filter`, default `'Todos'`).
- **Hover dos cards de serviço:** elevação + sombra azul + borda azul (transição `.15s`).
- **Animações CSS:** `streak` (linhas do herói), `bob` (chevron), `eyeGlow` (brilho azul pulsante). Existem `lidTop/lidBot/breathe/irisShine` no CSS que **não estão em uso** (sobras de uma versão com pálpebras animadas — podem ser removidas).
- **Scroll suave:** `html { scroll-behavior: smooth }` para os links âncora.
- **Parallax:** foi intencionalmente **desativado** (a faixa dos olhos fica fixa para manter a distância até o slogan constante). Não reintroduzir.

## Formulário (estado e integração)
- Campos (estado local): `f_name`, `f_company`, `f_email`, `f_phone`, `f_service` (select), `f_msg` (textarea). `f_service` default = `'Impressão digital'`.
- Opções do select: Impressão digital, Envelopamento de frota, Placas e sinalização, Outdoors / Frontlight, Luminosos, Painéis, Adesivos, Feiras e eventos.
- Ao enviar (`submit`), hoje só faz `sent = true` e troca o card por uma confirmação "Recebemos seu pedido! / Nossa equipe entrará em contato em breve."
- **A implementar no destino:** enviar para um endpoint real (e-mail/CRM/WhatsApp). Adicionar validação (nome, e-mail e telefone obrigatórios) e estados de loading/erro. Sugestão: também oferecer botão de WhatsApp com o número da empresa.

## Estado
- `filter: string` (portfólio) — default `'Todos'`.
- `sent: boolean` — default `false`.
- Campos do formulário (acima).

## Design Tokens

### Cores
- Fundo base: `#05070d`
- Fundos de seção: `#080b14`, `#04060a` (footer)
- Fundo de card: `linear-gradient(180deg,#0d1320,#0a0f1a)`; inputs `#0a0f1a`
- Azul de marca / acento: `#2b8fff` (classe `.acc`)
- Azul link / claro: `#3b8dff`; hover link `#7fb3ff`
- Azul de botão: `linear-gradient(180deg,#3b8dff,#1560d8)`
- Azul badge serviço: `linear-gradient(145deg,#2b8fff,#0f4fbf)`
- Bordas: `rgba(120,160,255,.12)` (padrão), `.08`, `.16`, `.2`, `.28`
- Texto: branco `#fff`; secundário `rgba(255,255,255,.65)`; suave `.5`/`.55`; sutil `.35`
- Glow azul: `rgba(31,123,255,...)` / `rgba(43,143,255,...)`
- Dourado (moldura prêmio): `rgba(240,201,74,.22)`
- **Cromo (wordmark `.chrome`):** `linear-gradient(180deg,#f6f9fd 0%,#d6e0ec 38%,#aebdcf 68%,#8b9db2 100%)` com `-webkit-background-clip:text; color:transparent; filter:drop-shadow(0 2px 2px rgba(0,0,0,.32))`.

### Tipografia
- **Saira** 600–900: wordmark, telefone, localidade, números/stats, badges.
- **Poppins** 500–800: títulos de seção (H2, uppercase) e slogan/labels do herói.
- **Manrope** 400–800: corpo de texto, botões, pílulas.
- **IBM Plex Mono** 400–500: "eyebrows" (// SEÇÃO), rótulos pequenos, categorias.
- Escala: H1/wordmark 200px · telefone 64px · H2 40–44px · slogan 30px · corpo 15–16px · rótulos 10–13px.

### Espaçamento & formas
- Padding de seção: `96px 40px` (Prêmios `80px 40px`; nav `18px 40px`).
- Largura máx. de conteúdo: `1120–1180px`; página inteira `1280px` centralizada.
- Border-radius: 8px (inputs/ícones), 10–14px (cards/badges), 16–18px (card do form), 100px (pílulas).
- Sombras: card hover `0 18px 44px rgba(31,123,255,.22)`; botão `0 10px 30px rgba(43,143,255,.35)`; prêmio `0 30px 74px rgba(0,0,0,.55)`.

## Conteúdo / Dados
Todos os arrays estão na classe `Component` dentro de `RDO Home.dc.html` (tag `<script data-dc-script>`):
- `heroServices` — 5 itens da linha do herói (título 2 palavras + descrição + ícone).
- `services` — 8 serviços (número, título, descrição).
- `items` — 12 itens de portfólio (título, categoria, label do placeholder, `img` de referência).
- `testimonials` — 3 depoimentos (citação, autor, empresa).
- Ícones do herói: SVGs de linha gerados em `icon(name)` (printer, car, sign, board, tent).

## Assets
Todos em `assets/` (incluídos neste pacote):
- `rdo-logo.png` — logo oficial "RDO Comunicação Visual" (usada na nav e no footer). Fornecida pelo cliente.
- `eyes-blink.mp4` — vídeo dos olhos azuis piscando (gerado pelo cliente no Google Flow). Usado na faixa do herói.
- `premio-banner.png` — arte da premiação "Eleita a melhor em qualidade e atendimento" (Global Pesquisas). Fornecida pelo cliente.
- **Placeholders (não incluídos):** fotos de portfólio e fotos da seção "A Empresa" ainda precisam ser fornecidas pela RDO. Há URLs de referência do site atual no array `items` (podem exigir download manual por proteção de hotlink).

## Arquivos neste pacote
- `RDO Home.dc.html` — o design (template + CSS inline + classe lógica com os dados).
- `support.js` — runtime do protótipo (apenas para abrir o `.dc.html` localmente; **não** usar em produção).
- `assets/` — os 3 assets reais usados.
- `README.md` — este documento.

## Informações da empresa (para SEO/rodapé/contato)
- Nome: RDO Comunicação Visual
- Desde: 2006
- Telefone: (48) 3284-8000
- Endereço: Rod. Maurício Sirotsky Sobrinho, 4567 — Jurerê, Florianópolis / SC · CEP 88053-701
- Facebook: https://www.facebook.com/rdocomvisual/
- Slogan: "Sua marca vista com outros olhos!"
