# Handoff: Móveis do Bem — Novo Site (Home)

## Overview
Redesign da home do site da Móveis do Bem (Florianópolis), loja/ateliê que transforma madeira de demolição em móveis (peças únicas + sob medida). Objetivo: vitrine moderna, geração de contato via WhatsApp, apresentação da loja física. Tom sofisticado, editorial, com forte apelo natural/orgânico.

## About the Design Files
Os arquivos neste pacote são **referências de design em HTML** — protótipos de alta fidelidade mostrando aparência e comportamento pretendidos, não código de produção para copiar diretamente. A tarefa é **recriar este design HTML no ambiente do codebase de destino** (framework escolhido pelo dev — React, Vue, HTML/CSS estático, etc.) usando os padrões já estabelecidos do projeto, ou escolher a stack mais adequada se não houver uma ainda.

O arquivo principal é `Moveis do Bem - Home.dc.html`. Ele usa uma sintaxe de template proprietária (`{{ }}`, `<sc-for>`, `<sc-if>`, `style-hover=`) de uma ferramenta de design interna — **não é HTML/JS padrão e não deve ser copiado literalmente**. Trate-o como especificação visual e de comportamento; a lógica em `<script data-dc-script>` no fim do arquivo mostra os dados e o comportamento pretendido (ex.: crossfade de vídeo, reveal on scroll) em pseudo-JS de fácil leitura.

## Fidelity
**Alta fidelidade (hifi)**: cores, tipografia, espaçamento e interações finais. O desenvolvedor deve recriar a UI fielmente.

## Screens / Views
Uma única página (home), rolagem vertical, seções com âncoras (`#catalogo`, `#sobmedida`, `#sobrenos`, `#sobre`, `#contato`).

### 1. Header (fixo sobre o hero)
- Posição: absolute, top:0, full-width, padding 28px 64px, z-index acima do vídeo.
- Esquerda: logo (ícone + nome empilhado com subtítulo "MÓVEIS DE DEMOLIÇÃO" abaixo do nome, ambos em branco via filtro).
- Centro: nav — Catálogo, Sob medida, Sobre nós, A loja, Contato (Work Sans 500 14px, cor `rgba(245,239,226,0.85)`).
- Direita: botão "WhatsApp" pill, fundo `rgba(245,239,226,0.14)`, borda `rgba(245,239,226,0.4)`, backdrop-blur 6px.

### 2. Hero (tela cheia, 100vh, min-height 640px)
- Fundo: vídeo em loop com **crossfade contínuo** entre duas cópias do mesmo vídeo (evita corte visível no loop) — ver seção Interações.
- Overlay: gradiente `linear-gradient(rgba(12,10,8,0.6), rgba(12,10,8,0.38) 40%, rgba(12,10,8,0.8))`.
- Centralizado: eyebrow "MADEIRA DE DEMOLIÇÃO · FLORIANÓPOLIS" (Work Sans 500 13px, letter-spacing 4px, uppercase, cor `rgba(245,239,226,0.7)`); H1 "Madeira com passado. *Móveis com futuro.*" (Instrument Serif, clamp(48px,7.5vw,100px), a 2ª linha em itálico); dois CTAs pill — sólido claro "Explorar o catálogo" e outline "Projeto sob medida".
- Rodapé do hero: "ROLE PARA DESCOBRIR ↓", flutuando suavemente (animação vertical).
- Entrada: eyebrow, título e botões entram com fade+translateY escalonado (delays 0.2s/0.45s/0.75s).

### 3. Faixa de vantagens (marquee)
- Fundo `#f5efe2`, altura ~72px, texto rolando infinitamente da direita pra esquerda (Work Sans 600 13px uppercase, cor `#4a3b28`, separadores "✦" em `#a3541e`): Sob medida · Pronta-entrega · Garantia · Até 10x · Montagem em casa · Eco-amigável.

### 4. Catálogo (`#catalogo`, fundo `#1c1916`)
- Título "Peças únicas, *de agora*" (Instrument Serif, itálico na 2ª parte em `#c9ad7f`) + link "CONSULTAR DISPONIBILIDADE →" à direita.
- Grid 4 colunas, gap 20px, 8 cards de produto (foto 320px altura, cover, overlay gradiente inferior com nome + detalhe). Hover: eleva (-6px) + sombra + zoom leve na foto.
- Rodapé da seção: texto "O estoque muda toda semana" + CTA outline "Pergunte o que chegou hoje".

### 5. Sob medida (`#sobmedida`, fundo `#f5efe2`, grid 2 colunas)
- Fundo decorativo: textura sutil de "veios de madeira" (linhas diagonais repetidas, opacidade 0.05) + glow radial verde no canto superior esquerdo + **folhas caindo** (emoji 🍃, ~10 instâncias, animação de queda com leve balanço lateral, cores alternando verde `#7a9c7f`/terracota `#a3541e`, loop infinito, posições e durações variadas).
- Esquerda: eyebrow "SOB MEDIDA" (`#a3541e`), título "Do resgate da madeira à sua sala", sublinhado curto (56×2px, `#a3541e`), parágrafo, 3 benefícios em lista (ícone circular escudo verde `#26433a` + título + descrição), CTA sólido escuro "Pedir orçamento no WhatsApp".
- Direita: foto grande (imagem de projeto sob medida).

### 6. Depoimentos (fundo `#141210`)
- Título centralizado "Quem levou uma história pra casa".
- Grid 3 colunas, cards com borda `#33291e`, 5 estrelas (`#c9ad7f`), citação em Instrument Serif itálico, autor em uppercase pequeno. Hover: borda vira dourada + eleva levemente.
- Seção pode ser ocultada via flag (`mostrarDepoimentos`).

### 7. Sobre nós (`#sobrenos`, altura fixa 760px)
- Foto de fundo cheia (já vem com **degradê pré-aplicado na própria imagem**, escuro à esquerda clareando à direita — não adicionar gradiente CSS extra por cima).
- Texto sobreposto à esquerda: eyebrow "SOBRE NÓS", título "Mais que móveis, criamos histórias.", sublinhado, 2 parágrafos, 3 "valores" (ícone em círculo outline dourado + título + descrição curta).
- Logo dividida (não usada aqui, ver seção Assets) — abaixo desta seção há uma faixa verde escura `#26433a` só com a logo (ícone + nome + subtítulo, empilhados, centralizados, brancos).

### 8. A loja (`#sobre`, fundo `#1c1916`, grid 2 colunas)
- Esquerda: foto da fachada/loja física.
- Direita: eyebrow "A LOJA", título "Venha ver e tocar cada peça", parágrafo, 2 CTAs — "Como chegar" (sólido claro, linka pro Google Maps) e "@moveisdobem_floripa" (outline, linka pro Instagram).

### 9. Contato / Rodapé (`#contato`, fundo `#0e0c0a`)
- Grid 3 colunas: (1) logo empilhada + descrição curta; (2) links de navegação (Catálogo, Sob medida, Sobre nós, A loja, Depoimentos); (3) contato (WhatsApp com número, Instagram, "Florianópolis · SC").
- Linha de copyright centralizada no rodapé, borda superior sutil.

### 10. Botão flutuante de WhatsApp
- Fixed bottom-right, pill verde `#2f6152`, texto "Fale conosco", ponto verde-claro pulsando (`@keyframes pulse`) à esquerda do texto. Hover: scale leve.

## Interactions & Behavior
- **Scroll reveal**: elementos com um atributo tipo `data-reveal` começam com `opacity:0; translateY(30px)` e animam para opacidade 1 / posição normal quando entram no viewport (IntersectionObserver, threshold ~0.15, dispara uma vez).
- **Crossfade de vídeo em loop infinito**: duas tags `<video>` empilhadas (mesma fonte), uma tocando e visível (opacity 1), outra pausada e invisível. Um polling (a cada ~150ms) monitora o tempo restante do vídeo ativo; quando faltam ~1.4s para acabar, a cópia ociosa começa a tocar do zero e faz fade-in (opacity 0→1, transição 1.4s) enquanto a ativa faz fade-out — depois de completado o fade, a antiga pausa. Isso evita o "salto"/corte visível de um loop simples com `loop` nativo.
- **Marquee** da faixa de vantagens: `translateX(0)` → `translateX(-50%)` em loop linear infinito (a lista de itens está duplicada no HTML para o loop ficar contínuo).
- **Folhas caindo**: cada folha anima `top`/`translateY` de fora da tela (topo) até abaixo da seção, com leve rotação e balanço lateral (`margin-left` oscilando), em loop infinito, com delays negativos escalonados para não sincronizarem.
- **Hovers**: cards de produto e depoimento elevam com `translateY` negativo + sombra; botões pill sobem levemente; fotos de produto dão zoom sutil (`scale(1.06)`).
- **Todos os links de CTA** (botões, cards de produto, "pedir orçamento") apontam para wa.me com o número da loja; "Como chegar" aponta pro Google Maps; "@moveisdobem_floripa" pro Instagram.

## State Management
Não há estado de aplicação real — é uma landing estática. Os únicos "dados" dinâmicos no protótipo:
- Número de WhatsApp e telefone de exibição (deveriam vir de config/env, não hardcoded).
- Lista de produtos do catálogo (8 itens: nome, foto, detalhe/tag) — no site real isso provavelmente deve vir de um CMS ou planilha, já que "o estoque muda toda semana" (peças únicas de garimpo + sob medida).
- Lista de depoimentos (3 itens: texto, autor) — atualmente com dados de exemplo, precisam ser substituídos por depoimentos reais.
- Flag para mostrar/ocultar a seção de depoimentos.

## Design Tokens

### Cores
- Preto/marrom escuro (fundo principal): `#141210`, `#1c1916`, `#0e0c0a`
- Verde escuro (destaque/faixas): `#26433a`
- Terracota (acento, links secundários): `#a3541e`
- Dourado/areia (acento sobre fundo escuro): `#c9ad7f`
- Bege claro (fundo claro / texto sobre escuro): `#f5efe2`
- Marrom-texto sobre bege: `#4a3b28`, `#5b4d3c`
- Textos secundários sobre escuro: `#d8cdb8`, `#a89b83`, `#8d7f68`, `#5f5443`
- Bordas sutis sobre escuro: `#33291e`, `#221c15`
- Verde/terracota das folhas decorativas: `#7a9c7f` / `#a3541e`

### Tipografia
- Display/títulos: **Instrument Serif** (itálico usado para ênfase pontual), pesos 400, tamanhos de clamp(32px,4vw,100px) conforme a seção.
- Corpo/UI: **Work Sans**, pesos 400/500/600, 13–17px.
- Letter-spacing generoso em eyebrows/labels (2–4px, uppercase).

### Espaçamento / raios
- Padding de seção padrão: 96px vertical, 64px horizontal (desktop).
- Border-radius de botões: 99px (pill). Cards de produto: 6px. Cards de depoimento: 10px.
- Sombras de hover: `0 18px 40px rgba(0,0,0,0.45)` (cards), `0 10px 30px rgba(0,0,0,0.35)` (botões).

## Assets
- `assets/logo-icon.png` — ícone da marca (folha, colorido original).
- `assets/logo-text-title.png` — palavra "MÓVEISDOBEM" recortada da logo oficial (usar com `filter: brightness(0) invert(1)` para versão branca).
- `assets/logo-subtitle.png` — "MÓVEIS DE DEMOLIÇÃO" recortado da logo oficial (mesmo filtro).
- `assets/p01.png`–`p24.png` — fotos de produtos recortadas de um mosaico/print do Instagram, **baixa resolução — servem só de placeholder**. Pedir fotos originais em alta ao cliente antes de produção.
- `uploads/pasted-1785458285346-0.png` — foto usada na seção "Sob medida".
- `uploads/pasted-1785524816313-0.png` — foto da fachada da loja, seção "A loja".
- `uploads/pasted-1785525891973-0.png` — foto usada na seção "Sobre nós" — **já vem com degradê escuro pré-aplicado do lado esquerdo**; não sobrepor gradiente CSS adicional.
- `uploads/Sunlight_drifting_across_room_202607302119.mp4` — vídeo de fundo do hero (luz solar passando por um ambiente).

## Files
- `Moveis do Bem - Home.dc.html` — arquivo de referência principal (ver aviso sobre sintaxe de template no topo deste README).
