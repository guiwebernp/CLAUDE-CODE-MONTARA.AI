---
name: prospectar
description: >
  Gera lista de leads qualificados por nicho + cidade, priorizados por quem tem o site
  mais ruim (ou nenhum site) — ou seja, quem mais precisa do serviço da WNP. Usa busca
  web pra mapear empresas do nicho, avalia o site atual de cada uma (existe? é responsivo?
  tem SEO básico? parece feito há anos?) e devolve uma lista pronta pra abordagem via
  WhatsApp, ordenada por oportunidade.
  Use quando o usuário pedir "prospectar", "buscar leads", "achar clientes de [nicho]",
  "quem precisa de site em [cidade]", "lista de prospecção", ou /prospectar.
---

# /prospectar — Lista de leads priorizados por oportunidade

Skill que substitui a busca manual no Google Maps: mapeia empresas de um nicho numa
cidade/região e classifica cada uma pela qualidade do site atual, pra saber quem abordar
primeiro.

## Dependências

- **Contexto do negócio:** `_memoria/empresa.md` (ticket médio, perfil de cliente ideal)
- **Ferramentas:** WebSearch, WebFetch (nativos)
- **Output vai em:** `saidas/prospeccao/<nicho>-<cidade>-<data>.md`

## Como rodar

```
/prospectar
nicho: fisioterapia
cidade: Florianópolis
```

Se o usuário não especificar nicho/cidade, perguntar antes de começar.

## Workflow

### Passo 1 — Mapear empresas do nicho

1. Usar **WebSearch** com variações: `"[nicho] em [cidade]"`, `"[nicho] [cidade] telefone"`,
   `"[nicho] [cidade] endereço"` pra listar o máximo de empresas possível (alvo: 20-40).
2. Pra cada empresa encontrada, registrar: nome, telefone/WhatsApp (se público), bairro,
   link do site (se existir), link do Instagram/Facebook (se não tiver site).

### Passo 2 — Avaliar o site de cada uma (o que importa)

Pra cada empresa com site, usar **WebFetch** no site e classificar:

| Critério | Como avaliar |
|---|---|
| **Existe site próprio?** | Não tem = oportunidade máxima. Só rede social = quase tão bom quanto não ter. |
| **Responsivo?** | Layout quebra em tela estreita, texto cortado, botões sobrepostos |
| **Atualizado?** | Copyright de ano antigo, design datado (2010s), fotos de baixa qualidade |
| **SEO básico?** | Title/description genéricos ou ausentes, sem estrutura de H1/H2 |
| **CTA claro?** | Tem WhatsApp/telefone visível? Formulário funciona? |
| **Velocidade percebida** | Site pesado, muitas imagens não otimizadas |

Classificar cada empresa em:
- 🔴 **Sem site** (oportunidade máxima — só Instagram/Facebook ou nada)
- 🟠 **Site ruim** (existe mas quebrado, datado, sem CTA — oportunidade alta)
- 🟡 **Site mediano** (funcional mas genérico/builder — oportunidade média)
- 🟢 **Site bom** (recente, responsivo, profissional — baixa prioridade, pular)

### Passo 3 — Priorizar

Ordenar a lista: 🔴 primeiro, depois 🟠, depois 🟡. Descartar 🟢 da lista de abordagem
(anotar só como referência de concorrência).

Dentro de cada grupo, priorizar quem:
- Tem WhatsApp/telefone público (abordagem direta é possível)
- Parece ter porte compatível com o ticket médio (`_memoria/empresa.md`)
- Não é filial de rede grande (dono provavelmente não decide)

### Passo 4 — Salvar e entregar

Salvar em `saidas/prospeccao/<nicho>-<cidade>-<YYYY-MM-DD>.md`:

```markdown
# Prospecção: <nicho> em <cidade> — <data>

## Resumo
- N empresas mapeadas
- N sem site (🔴) / N site ruim (🟠) / N site mediano (🟡) / N site bom (🟢, ignoradas)

## Lista priorizada

### 🔴 Sem site
| Empresa | WhatsApp/Tel | Bairro | Rede social | Observação |
|---|---|---|---|---|

### 🟠 Site ruim
| Empresa | WhatsApp/Tel | Bairro | Site | Problema principal |
|---|---|---|---|---|

### 🟡 Site mediano
| Empresa | WhatsApp/Tel | Bairro | Site | Problema principal |
|---|---|---|---|---|
```

Mostrar o resumo executivo no chat (contagem + top 5 da lista 🔴/🟠) e apontar pro
arquivo completo.

### Passo 5 — Próximo passo natural

Perguntar se o usuário quer que a skill gere a mensagem de abordagem pra WhatsApp
(usar tom de `_memoria/preferencias.md`, mencionar referência de cliente similar já
atendido — ver seção "Clientes ativos" em `_memoria/empresa.md`). Se quiser confirmar
CNPJ/dados oficiais antes de abordar, usar `/consultar-cnpj`.

---

## Regras

- **Nunca inventar dados.** Se não conseguir achar telefone/site de uma empresa, deixar em branco — não completar com suposição.
- **Respeitar robots/ToS:** usar apenas WebSearch/WebFetch (busca e leitura pública), nunca scraping agressivo ou automação que viole termos de uso de plataformas.
- **Foco em porte compatível:** descartar grandes redes/franquias nacionais — não são o perfil de cliente da WNP (`_memoria/empresa.md`: 5-50 pessoas).
- **Sempre datar o arquivo** — leads esfriam, uma lista de 3 meses atrás pode estar desatualizada.
