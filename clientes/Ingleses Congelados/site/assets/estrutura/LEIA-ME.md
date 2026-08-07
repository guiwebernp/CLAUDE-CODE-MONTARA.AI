# Fotos da seção "Nossa estrutura"

## Status atual (o que falta)

Só existem 4 fotos reais da fábrica. Elas já estão aplicadas sem duplicar:

| Arquivo | Onde aparece hoje |
|---|---|
| `estrutura-producao.webp` | Foto principal (topo direito) **e** card "Produção contínua" |
| `estrutura-entrega.webp` | Card "Entrega recorrente" |
| `estrutura-equipe.webp` | Card "Equipe treinada" |
| `estrutura-paes.webp` | Card "Sem padeiro, sem madrugada" |

`estrutura-producao.webp` aparece duas vezes (hero da seção + card) porque é a única foto de esteira/produção disponível — evitei inventar uma segunda versão fake. Card "Fábrica própria" está usando `assets/hero-photo.png` (a foto de pôr do sol já usada no hero e na seção "Sobre") como solução provisória, por ser a única imagem de exterior que existe no projeto.

**Faltam de verdade, sem substituto decente:**

| Arquivo a criar | Card | O que precisa mostrar |
|---|---|---|
| `estrutura-fabrica.webp` | Fábrica própria | Fachada/exterior real da unidade do Rio Vermelho |
| `estrutura-forno.webp` | Forno em comodato | Forno turbo/estufa instalados num ponto de venda |

Assim que chegarem, ativa em `css/style.css`:

```css
.est-fabrica { --card-img: url('../assets/estrutura/estrutura-fabrica.webp'); }
.est-forno { --card-img: url('../assets/estrutura/estrutura-forno.webp'); }
```

(a segunda linha precisa ser adicionada de volta — hoje o card "Forno em comodato" não tem `--card-img` nenhum, fica só com o fundo escuro e o ícone).

Formato: WebP, ~1200x800px. Enquadre o assunto **à direita** da imagem — o lado esquerdo fica coberto pelo degradê.

## Como alterar

**Trocar uma foto:** substitua o arquivo mantendo o nome. Para usar outro nome, edite o bloco no fim de `css/style.css`:

```css
.est-fabrica { --card-img: url('../assets/estrutura/estrutura-fabrica.webp'); }
```

**Alterar os textos:** direto no `index.html`, na seção `<section id="estrutura">`. Cada card é um `<article class="est-item ...">` com `<h3>` e `<p>`.

**Ajustar a intensidade dos degradês:** no topo do bloco `.estrutura` em `css/style.css`:

```css
--grad-topo:  /* foto principal */
--grad-card:  /* fotos dos cards */
```

Cada um é um `linear-gradient(90deg, ...)`. Aumentar as porcentagens de opacidade escurece (texto mais legível); diminuir revela mais a foto. Ex.: trocar `rgba(42,16,8,0.78) 55%` por `rgba(42,16,8,0.60) 55%` deixa a imagem do card mais visível.

## Atenção

As imagens do mockup foram geradas por IA e mostram uma fábrica e uma van com a marca Ingleses que não são reais. Para o site no ar, use fotos reais da operação — mostrar instalações fabricadas como se fossem da empresa é risco de credibilidade, e comprador de supermercado costuma visitar fábrica.
