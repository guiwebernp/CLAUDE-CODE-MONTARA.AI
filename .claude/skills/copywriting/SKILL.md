---
name: copywriting
description: >
  Escreve ou reescreve a copy de uma seção/página de site (home, serviços, sobre, preço)
  seguindo um processo estruturado: levanta propósito da página, ação primária esperada
  do visitante, público-alvo e objeções antes de escrever. Devolve copy organizada por
  seção com 2-3 alternativas de headline/CTA e a justificativa de cada uma.
  Use quando o usuário pedir "escreve a copy do site", "reescreve essa seção", "copy da
  home", "texto de vendas pro site do cliente", "headline pra essa página", ou /copywriting.
---

# /copywriting — Copy estruturada pra páginas de site

## Dependências

- **Contexto do cliente:** `briefing.md` do cliente (escopo, tom, diferenciais)
- **Tom de voz:** `_memoria/preferencias.md`
- **Depois de escrever:** rodar `/humanizar` pra tirar qualquer cheiro de IA que sobrar

## Como rodar

```
/copywriting
cliente: <nome>
página: home (ou: serviços, sobre, preço, contato)
```

## Antes de escrever — levantar (não pular essa etapa)

1. **Propósito da página** — o que ela precisa fazer? (gerar contato via WhatsApp, explicar um serviço, construir confiança)
2. **Ação primária esperada** — qual É a única coisa que o visitante deve fazer ao sair dessa página?
3. **Público-alvo** — quem chega nessa página e por quê (veio de anúncio, indicação, busca orgânica)?
4. **Diferenciação** — o que essa empresa tem que o concorrente não tem (do `briefing.md`)?
5. **Objeções prováveis** — preço, prazo, confiança, "atende minha região/necessidade?"

Se alguma dessas respostas não estiver clara no briefing, perguntar ao usuário antes de escrever.

## Princípios de escrita

- **Clareza > esperteza.** Trocadilho ou frase de efeito que exige esforço pra entender perde pra frase direta.
- **Benefício > característica.** "Site pronto em 3 semanas" > "Metodologia ágil de desenvolvimento".
- **Linguagem do cliente, não da empresa.** Escrever como o público fala, não como o negócio se descreve internamente.
- **Sem estatística inventada.** Se não tem o número real, não afirmar ("milhares de clientes" sem base é mentira).
- **Tom direto** — seguir `_memoria/preferencias.md`: sem jargão desnecessário, sem formalidade excessiva.

## Saída

Copy organizada por seção da página:

```markdown
## Copy — <página> — <cliente>

### Hero
**Headline (opção 1):** ...
**Headline (opção 2):** ...
**Subheadline:** ...
**CTA:** ...
*Por quê essa direção:* <justificativa em 1 linha>

### <próxima seção>
...
```

Pra cada headline/CTA, dar 2-3 alternativas com a lógica de cada uma (uma mais direta,
uma mais emocional/aspiracional, uma mais focada em prova/número).

## Depois de escrever

1. Rodar mentalmente o checklist de `/humanizar` antes de entregar (ou chamar a skill).
2. Se a copy for pra uma página já existente, sugerir também `/cro` pra validar se a
   nova copy resolve os pontos fracos identificados.

## Regras

- **Nunca inventar prova social, número ou depoimento.** Se não existir, deixar um placeholder claro (`[inserir depoimento real aqui]`) em vez de fabricar.
- **Uma única ação primária por página.** Copy com 5 CTAs diferentes confunde o visitante.
- **Copy curta domina.** Cortar antes de adicionar — só manter frase que empurra a ação primária ou remove uma objeção real.
