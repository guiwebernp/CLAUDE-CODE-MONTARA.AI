---
name: consultar-cnpj
description: >
  Consulta dados oficiais de uma empresa (CNPJ) via API pública gratuita (BrasilAPI/ReceitaWS)
  antes de mandar proposta — confirma que a empresa existe, está ativa, o ramo (CNAE), porte,
  endereço e sócios. Serve pra qualificar leads da /prospectar e evitar propor pra empresa
  baixada ou inativa.
  Use quando o usuário pedir "consultar CNPJ", "verificar empresa", "essa empresa existe",
  "qualificar esse lead", "dados da empresa [nome/cnpj]", ou /consultar-cnpj.
---

# /consultar-cnpj — Qualificação rápida de empresa antes da proposta

## Dependências

- **Ferramentas:** WebFetch (nativo)
- **API:** BrasilAPI — pública, gratuita, sem necessidade de chave
  `https://brasilapi.com.br/api/cnpj/v1/<CNPJ-apenas-numeros>`

## Como rodar

```
/consultar-cnpj 12345678000199
```

Se o usuário só tiver o nome da empresa (sem CNPJ), primeiro usar WebSearch pra achar o
CNPJ (geralmente aparece no rodapé do site, Google, ou Reclame Aqui) e depois seguir o fluxo.

## Workflow

### Passo 1 — Consultar

1. Limpar o CNPJ (só dígitos).
2. WebFetch em `https://brasilapi.com.br/api/cnpj/v1/<cnpj>`.
3. Se der erro/não encontrado, tentar `https://receitaws.com.br/v1/cnpj/<cnpj>` como fallback.

### Passo 2 — Extrair o que importa pra prospecção

Da resposta, puxar:

- **Razão social / nome fantasia**
- **Situação cadastral:** ATIVA, BAIXADA, SUSPENSA, INAPTA — se não for ATIVA, sinalizar
  em vermelho e recomendar não prosseguir com a abordagem
- **CNAE principal** (ramo de atuação — confirma se bate com o nicho da prospecção)
- **Porte** (MEI, ME, EPP, Demais) — cruzar com perfil de cliente ideal (`_memoria/empresa.md`)
- **Data de abertura** — empresa muito nova (<1 ano) pode não ter orçamento ainda; muito
  antiga sem site pode ser oportunidade forte (negócio consolidado, digital defasado)
- **Endereço completo**
- **Sócios/responsável** (se disponível) — nome do decisor pra personalizar abordagem
- **Telefone/email cadastrado** (se público)

### Passo 3 — Resumo pra decisão

```markdown
## <Nome da empresa> — CNPJ <XX.XXX.XXX/XXXX-XX>

**Situação:** 🟢 ATIVA / 🔴 <outra>
**Ramo (CNAE):** <descrição>
**Porte:** <MEI/ME/EPP/Demais>
**Aberta desde:** <data> (<X anos de mercado>)
**Endereço:** <cidade/bairro>
**Decisor provável:** <sócio, se disponível>

**Recomendação:** <seguir com abordagem / descartar / atenção especial>
```

### Passo 4 — Ação seguinte

Se ATIVA e dentro do perfil, sugerir seguir pra abordagem (mensagem de WhatsApp
personalizada, mencionando o ramo/porte real da empresa em vez de genérico).

---

## Regras

- **Nunca inventar dado que a API não retornou** — se um campo vier vazio, dizer "não disponível", não supor.
- **Situação cadastral é o dado mais importante** — empresa baixada/inapta não vale abordagem comercial.
- Essa consulta é sobre **dados públicos oficiais** (Receita Federal via API), não é investigação de terceiros — uso legítimo de qualificação comercial B2B.
