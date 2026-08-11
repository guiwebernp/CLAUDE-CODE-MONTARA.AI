# Identidade visual — WNP

> Como a marca aparece em tudo que o MazyOS gera.
> As skills de conteúdo, carrossel e post leem esse arquivo antes de criar qualquer visual.
> Edite quando a marca evoluir.

---

## Rebrand (2026-08-07)

O negócio, antes "Montara.AI", passou a se chamar **WNP** (WNP Comunicação Visual). Identidade visual
completamente nova — cores, tipografia e tom passam de "tech dark azul" para "editorial dark coral/mint".
O material da marca antiga (logo montanha/M azul, paleta `#2E9EFF`) foi arquivado em
`clientes/WNP/_site-antigo-montara/identidade-montara/` como referência histórica — não usar mais.

---

## Cores

Paleta base (formato CSS variables, mesmo padrão usado nos sites de cliente — ver
`clientes/WNP/site/css/style.css` para a implementação completa dos tokens):

```css
/* neutros — quase preto, nunca cinza puro */
--ink-850: #0D0E0E;      /* fundo principal */
--ink-900: #0C0C0C;      /* fundo mais escuro (footer) */
--ink-750: #171615;      /* cards */
--ink-700: #1C1B1A;      /* cards em hover/elevados */
--ink-800: #121211;      /* superfícies "inset» (painéis, inputs) */
--paper-0: #FCFBFC;      /* texto principal sobre fundo escuro */
--paper-300: #AAAAA8;    /* texto secundário, descrições */
--paper-500: #7C7B78;    /* legendas, metadados */

/* coral — acento primário da marca */
--coral-400: #FF8968;    /* CTA, links, destaques */
--coral-300: #FFA184;    /* hover */
--coral-500: #F2683F;    /* press */
--coral-600: #C4502E;    /* bordas de destaque */

/* mint — acento secundário, só para completar um título ou marcar algo positivo */
--mint-400: #6DB578;
--mint-300: #86D093;
```

Fundo sempre escuro (quase preto, `#0D0E0E`) — dark mode é a base, não uma opção. Coral é o acento
principal (CTAs, links, ícones); mint aparece com moderação, normalmente só para fechar uma frase de
destaque num título (ex: "lugar **certo**", "próximo **nível**").

---

## Tipografia

```css
--font-display: 'Sora', 'Segoe UI', system-ui, sans-serif;  /* títulos, headline — geométrica, editorial */
--font-body: 'Manrope', 'Segoe UI', system-ui, sans-serif;   /* corpo de texto — neutra, legível */
```

Ambas via Google Fonts. `Sora` traz peso editorial/moderno para títulos; `Manrope` mantém o corpo limpo.

---

## Estilo geral

Editorial, quente, humano — mas ainda confiável e "tech" no fundo. Visual escuro (dark mode como padrão),
com coral como acento dominante e mint só como toque secundário. Cards com bordas sutis (`1px solid`
quase invisível) e sombras suaves em vez de contornos duros. Tipografia grande e confiante nos títulos.

---

## Elementos-chave

- **Logo:** existe uma marca desenhada — wordmark "WNP" com um corte diagonal vermelho/coral no "V",
  tagline "COMUNICAÇÃO VISUAL" abaixo. Arquivo fonte em `clientes/WNP/site/assets/logo-wnp.jpeg` (nasceu
  em fundo branco, traço preto).
- **Versão pra fundo escuro:** `logo-wnp-mark-dark.png` (só a marca) e `logo-wnp-crop-dark.png` (marca +
  tagline) — traço preto convertido pra branco (`--paper-0`), acento convertido pra coral, fundo
  transparente. Usadas direto no header/footer do site, sem placa/badge por trás (testado e aprovado —
  o selo branco quadrado foi rejeitado).
- **Uso do wordmark:** header de sites, propostas, assinaturas, apresentações, footer.

---

## O que NUNCA fazer

- Não usar o logo/paleta antigos da Montara (azul `#2E9EFF`, ícone de montanha) — está descontinuado,
  só arquivado como histórico
- Não colorir o texto "WNP" fora de coral (`--coral-400`) ou branco (`--paper-0`) sem necessidade
- Não misturar a tipografia com outras fontes decorativas — `Sora` + `Manrope` é a combinação fechada
- Não usar mint como cor dominante — ele é sempre um acento secundário, pontual

---

## Logo

- **Arquivo:** `clientes/WNP/site/assets/logo-wnp.jpeg` (fonte, fundo branco) + versões prontas pra
  fundo escuro `logo-wnp-mark-dark.png` (só marca) e `logo-wnp-crop-dark.png` (marca + tagline)
- **Onde usar:** header/footer de sites, propostas, carrossel, slides de apresentação

---

## Observações adicionais

Identidade reconstruída em 2026-08-07 a partir do handoff de design da homepage da WNP
(`clientes/WNP/design_handoff_wnp/WNP Site.dc.html`, projeto Claude Design
`1b0d213a-596f-4ed8-b8ff-a7b5be15ed8e`). Primeira aplicação real: site institucional da própria WNP
(`clientes/WNP/site/`). Identidade anterior (Montara.AI, azul/montanha) consolidada em 2026-08-03 e
arquivada em `clientes/WNP/_site-antigo-montara/`.
