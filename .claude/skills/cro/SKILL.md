---
name: cro
description: >
  Analisa uma página (landing page, home, página de serviço) em 7 dimensões de conversão
  ordenadas por impacto e devolve recomendações práticas, separadas por Quick Wins,
  mudanças de alto impacto e ideias de teste. Serve como checklist final antes de
  entregar um site de cliente, ou pra diagnosticar por que uma página não converte.
  Use quando o usuário pedir "essa página não converte", "revisa a conversão do site",
  "checklist antes de entregar", "feedback desse site", "otimizar conversão", ou /cro.
---

# /cro — Análise de conversão (CRO) de uma página

## Dependências

- **Contexto do negócio:** `_memoria/empresa.md` (pra saber o público/ticket do cliente sendo analisado)
- **Input:** URL da página ou arquivo `site/index.html` do cliente
- **Ferramentas:** WebFetch (se for URL ao vivo) ou Read (se for arquivo local)

## Como rodar

```
/cro
clientes/plotter-service/site/index.html
```

ou

```
/cro https://rdocomvisual.com.br
```

## As 7 dimensões (nessa ordem de impacto)

1. **Clareza da proposta de valor** — em 5 segundos, dá pra entender o que a empresa faz e pra quem?
2. **Headline** — a primeira frase visível vende o benefício ou só descreve a empresa genericamente?
3. **CTA (call-to-action)** — existe, é visível acima da dobra, o texto é específico ("Peça seu orçamento no WhatsApp" > "Saiba mais")?
4. **Hierarquia visual** — o olho é guiado na ordem certa? O que devia se destacar se destaca?
5. **Prova social** — depoimentos, avaliações, clientes atendidos, anos de mercado, fotos de trabalho real
6. **Tratamento de objeções** — a página responde as dúvidas óbvias antes do visitante ir embora (preço, prazo, garantia, "atende minha região?")
7. **Pontos de fricção** — formulário longo demais, botão de WhatsApp escondido, tempo de carregamento, texto ilegível no mobile

## Workflow

1. Ler/acessar a página completa (todas as seções, não só o hero).
2. Avaliar cada uma das 7 dimensões, anotando o que funciona e o que não funciona — com exemplo concreto do que está na página (não genérico).
3. Organizar a saída assim:

```markdown
## Análise de conversão — <página>

### Quick Wins (implementar agora)
- <mudança pequena, alto retorno, baixo esforço>

### Mudanças de alto impacto (priorizar)
- <mudança estrutural que exige mais trabalho mas move o ponteiro>

### Ideias de teste
- <hipótese que vale testar/comparar, não é certeza>

### Alternativas de copy
- Headline atual: "<atual>" → Alternativa: "<sugestão>"
- CTA atual: "<atual>" → Alternativa: "<sugestão>"
```

4. Se identificar problema de copy (headline fraca, CTA genérico), oferecer rodar `/copywriting` pra reescrever a seção inteira.
5. Se identificar frase com "cheiro de IA" na copy atual, oferecer `/humanizar`.

## Regras

- **Ser específico, nunca genérico.** "Melhorar o CTA" não ajuda; "trocar 'Saiba mais' por 'Peça orçamento no WhatsApp' no botão do hero" ajuda.
- **Priorizar por esforço x impacto** — Quick Wins primeiro sempre, é o que o cliente vai implementar primeiro.
- **Calibrar pelo público do cliente** — o que converte pra um público B2B corporativo é diferente de um público local que decide pelo WhatsApp.
