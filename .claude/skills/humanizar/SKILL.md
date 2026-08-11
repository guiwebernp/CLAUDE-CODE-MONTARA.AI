---
name: humanizar
description: >
  Revisa um texto (proposta, email, copy de site, legenda) e remove "cheiro de IA":
  jargão vazio, hedging excessivo, estrutura repetitiva ("não é só X, é Y"), em-dashes
  em excesso, generalidades sem fato concreto. Devolve o texto mais direto e no tom real
  da WNP.
  Use quando o usuário pedir "humanizar", "tira o cheiro de IA", "deixa mais natural",
  "revisa esse texto", "parece texto de robô", ou /humanizar.
---

# /humanizar — Tirar cheiro de IA de um texto

Skill de revisão pra rodar em cima de qualquer texto gerado (proposta, email, copy de
site, legenda de post) antes de mandar pro cliente. Objetivo: soar como o Guilherme
escrevendo, não como um LLM genérico.

## Dependências

- **Tom de voz:** `_memoria/preferencias.md` — é o alvo final, não o "humanizar" genérico
- **Input:** texto colado pelo usuário ou apontado por arquivo

## Como rodar

```
/humanizar
<colar o texto ou apontar o arquivo>
```

## O que caçar e cortar

### 1. Muletas estruturais de IA
- "Não é só X, é Y" / "não se trata apenas de X, mas de Y"
- "Em um mundo cada vez mais [adjetivo]..."
- Abrir com pergunta retórica genérica ("Já parou pra pensar...?")
- Fechar com frase de efeito grandiosa sem substância
- Listas de 3 itens paralelos artificiais quando prosa corrida ficaria melhor

### 2. Pontuação e ritmo
- Em-dash (—) em excesso — usar no máximo 1-2 por texto curto, trocar o resto por vírgula, ponto, ou parênteses
- Frases todas do mesmo tamanho (cadência robótica) — variar: frase curta. Depois uma mais longa que desenvolve a ideia anterior.
- Excesso de negrito/itálico "pra destacar tudo" — destaque só o que realmente importa

### 3. Vocabulário genérico de IA
Trocar por algo concreto e específico ao contexto real:
- "soluções inovadoras" → o que exatamente foi entregue
- "elevar o nível" / "levar ao próximo patamar" → resultado concreto (número, prazo, comparação)
- "robusto", "sinérgico", "otimizado" (sem contexto) → cortar ou substituir por fato
- "é importante notar que" / "vale ressaltar que" → cortar, ir direto ao ponto
- Hedging em excesso ("pode ajudar a", "tende a", "geralmente") quando dá pra afirmar direto

### 4. Falta de especificidade
- Trocar afirmação vaga por dado real: nome do cliente, número, prazo, referência concreta
  ("já fiz site pra empresa X no seu ramo" em vez de "tenho experiência no setor")
- Se o texto fala de resultado, ele tem número? Se não tem, ou busca o número ou tira a alegação

## Workflow

1. Ler o texto original completo antes de mexer.
2. Passar pelos 4 filtros acima, marcando mentalmente o que precisa mudar.
3. Reescrever mantendo o **conteúdo e a intenção**, só mudando forma — não é pra encurtar
   o texto arbitrariamente nem mudar o que ele promete.
4. Conferir contra `_memoria/preferencias.md`: o resultado final soa como o tom real da
   WNP (direto, amigável, contextual, sem jargão)?
5. Entregar o texto revisado. Se cortou alguma alegação por falta de dado concreto,
   avisar o que foi cortado e por quê ("tirei 'resultados comprovados' porque não temos
   número pra sustentar — quer que eu busque um caso real pra usar aqui?").

## Regras

- **Nunca inventar dado concreto pra preencher o vazio** (número, nome de cliente, prazo) — se não existir, cortar a alegação vaga em vez de fabricar prova.
- **Preservar a mensagem central** — humanizar é forma, não é reescrever a proposta.
- O alvo não é "parecer humano genérico", é soar como **o Guilherme especificamente** — sempre calibrar contra `_memoria/preferencias.md`.
