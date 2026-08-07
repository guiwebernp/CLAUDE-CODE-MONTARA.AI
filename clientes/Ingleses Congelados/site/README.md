# Ingleses Congelados — Site institucional

Site de entrada (isca da proposta), em HTML/CSS/JS vanilla, sem build step.

## Referência de estrutura

A arquitetura da home segue o modelo da [Fiorelle Alimentos](https://fiorellealimentos.com.br/) — negócio equivalente: indústria de congelados vendendo B2B para food service. A lógica deles é enxuta e concreta: credencial e logística na frente, storytelling no mínimo.

| Fiorelle | Ingleses |
|---|---|
| Hero com selos (SISP, entrega 24h) | Hero em vídeo com selos (25 anos, 180+ itens, entrega semanal) |
| "Feito por quem entende de carne há mais de duas décadas" | "Feito por quem entende de pão há mais de 25 anos" |
| Nossa linha (cortes bovinos, suínos, miúdos) | Nossa linha (pães, especiais, pré-assados, salgados, doces, confeitaria) |
| Nossa estrutura (SISP, produção, entrega) | Nossa estrutura (fábrica, produção, entrega, comodato, treinamento) |
| Nossos clientes (logos de bares e restaurantes) | Nossos clientes (Imperatriz, Brasil Atacadista + depoimentos) |
| Feijoadômetro (página separada) | Monte seu pedido (página separada) |
| Contato com formulário | Contato com formulário |

Diferença proposital: a Ingleses tem 6 lojas próprias, então existe uma seção "Lojas" que a Fiorelle não tem — é a porta do consumidor final, atendendo o pedido de separar B2B de B2C.

## Páginas

- `index.html` — home
- `monte-seu-pedido.html` — calculadora de abastecimento (fora da home, de propósito: é destino de Google Ads na fase de tráfego pago)

## Estrutura de arquivos

- `css/style.css` — CSS Variables com a paleta da marca, mobile-first
- `js/main.js` — palavra rotativa, nav sticky, reveal on scroll, formulário
- `js/simulador.js` — lógica da calculadora

### Ajustando a calculadora

Toda a lógica fica em constantes no topo de `js/simulador.js`:

- `TIPOS` — tipos de estabelecimento e a `taxa` (fração dos clientes/dia que levam panificados)
- `CATEGORIAS` — itens por comprador/dia (`unid`) e peso médio por item (`peso`, em kg)
- `PORTES` — faixas de volume → sugestão de equipamento em comodato

**Os coeficientes atuais são estimativas de referência do protótipo.** O time comercial da Ingleses precisa validar com os números reais antes de publicar — a calculadora entrega um número que o cliente vai cobrar depois.

## Assets

- `assets/hero-video.mp4` — vídeo do hero (loja com moinho girando), fornecido pelo cliente. Loop suavizado com crossfade de 1s via ffmpeg
- `assets/hero-photo.png` — poster/fallback do vídeo, também usado na seção "Sobre"
- `assets/logo.png` — logo em cores originais, fundo removido. Rodapé e nav sólido
- `assets/logo-claro.png` — logo monocromática branca, para o nav sobre o vídeo
- `assets/logo-simbolo.png` — só o símbolo do moinho (não usado ainda)

## Pendências antes de publicar

- [ ] **Fotos de produto** — os cards da "Nossa linha" usam gradientes da marca como placeholder. Cada card tem `.linha-foto`; basta trocar por `background-image: url('../assets/produtos/paes.jpg')`. O Instagram bloqueia download automatizado, então as imagens precisam ser salvas na mão de @ingleses.industria ou pedidas ao cliente
- [ ] **Fotos da estrutura** — a seção "Nossa estrutura" já está com o tratamento visual pronto (foto entrando pela direita, dissolvida no fundo escuro). Faltam os 6 arquivos: ver `assets/estrutura/LEIA-ME.md` com a lista do que vai em cada card
- [ ] **Logos dos clientes** — hoje Imperatriz e Brasil Atacadista aparecem como texto. Com os logos reais a seção ganha muito
- [ ] **Logo em vetor** — os arquivos disponíveis são 300px. Pedir `.ai`/`.svg`/`.eps` ao cliente
- [ ] Confirmar o WhatsApp comercial (`js/main.js`, `WHATSAPP_NUMERO`) — usei (48) 98828-8670, mas o mockup original trazia outro número (5548991844549)
- [ ] Revisar os itens citados em cada categoria de produto com o catálogo real
- [ ] **Validar os coeficientes da calculadora** com o comercial da Ingleses
- [ ] Otimizar o vídeo (2.4MB) para mobile
- [ ] Formulário abre o WhatsApp com a mensagem pronta (sem backend) — validar se atende
- [ ] Considerar um blog (a Fiorelle tem, e a proposta prevê conteúdo/SEO na fase 2)

## Deploy

Padrão Vercel (branch `main`, raiz = pasta `/site`). Ver `CLAUDE.md` da raiz do monorepo.
