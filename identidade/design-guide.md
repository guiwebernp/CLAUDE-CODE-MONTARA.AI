# Identidade visual

> Como a marca aparece em tudo que o MazyOS gera.
> As skills de conteúdo, carrossel e post leem esse arquivo antes de criar qualquer visual.
> Edite quando a marca evoluir.

---

## Cores

Paleta base (formato CSS variables, mesmo padrão usado nos sites de cliente):

```css
--color-bg-dark: #0A0A0F;      /* fundo principal, quase preto */
--color-bg-darker: #050507;    /* fundo mais escuro (footer, seções alternadas) */
--color-bg-card: #12121A;      /* cards, blocos elevados */
--color-text-light: #F5F7FA;   /* texto principal sobre fundo escuro */
--color-text-secondary: #A0A8B8; /* texto secundário, descrições */
--color-text-tertiary: #6B7280;  /* legendas, metadados */
--color-accent: #2E9EFF;       /* azul da marca — CTA, links, destaques */
--color-accent-light: #5CB6FF; /* azul mais claro — hover, glow */
--color-accent-muted: #1B4A7A; /* azul escurecido — bordas sutis, backgrounds tênues */
```

O azul (`--color-accent`) vem direto do logo oficial. Fundo sempre escuro — é a base da identidade (todas as variações do logo foram feitas sobre preto).

---

## Tipografia

```css
--font-display: 'Space Grotesk', sans-serif;  /* títulos, headline — geométrica, tech */
--font-body: 'Inter', sans-serif;              /* corpo de texto — neutra, legível */
```

Ambas via Google Fonts. `Space Grotesk` reforça o caráter geométrico do ícone (montanha/M feita de linhas retas); `Inter` mantém o corpo de texto limpo e profissional.

---

## Estilo geral

Moderno, tech, confiável. Marca de IA que faz automação profissional. Visual escuro (dark mode como padrão, não como opção), com o azul do logo como único acento de cor — evitar múltiplas cores concorrendo com a marca.

---

## Elementos-chave

- **Ícone:** montanha estilizada formando um "M" (duas linhas que se cruzam, sem preenchimento — só contorno), remete a "montar"/"Montara" e a picos/crescimento
- **Uso do ícone sozinho:** favicon, avatar, elementos decorativos pequenos
- **Uso do wordmark (ícone + "Montara.ai"):** header de sites, propostas, assinaturas, apresentações

---

## O que NUNCA fazer

- Não usar o logo sobre fundos claros/brancos sem antes gerar uma versão invertida — ele foi desenhado para fundo escuro
- Não colorir o ícone com cores fora da paleta (a versão verde existe como variação testada, mas o azul é a oficial)
- Não preencher o ícone (ele é uma linha/contorno, preencher descaracteriza)
- Não misturar a tipografia com outras fontes decorativas — `Space Grotesk` + `Inter` é a combinação fechada

---

## Logo

- **Arquivo principal:** `identidade/logo.png` (ícone azul sobre fundo preto)
- **Wordmark:** `identidade/logo-wordmark.png` (ícone + "Montara.ai", fundo preto)
- **Versão pra fundo escuro:** é a versão padrão — já nasceu pra isso
- **Versão pra fundo claro:** Pendente (gerar se algum dia precisar de aplicação sobre branco)
- **Onde usar:** Propostas, carrossel, slides de apresentação, header/footer de sites, favicon
- **Tamanho sugerido:** 150-180px nos HTMLs (wordmark); 32-40px (ícone isolado, ex: favicon/nav mobile)

---

## Observações adicionais

Identidade consolidada em 2026-08-03 a partir dos arquivos de logo em `identidade/logo.png` e `identidade/logo-wordmark.png`. Primeira aplicação real: site institucional da própria Montara.AI (`clientes/Montara.AI/site/`).
