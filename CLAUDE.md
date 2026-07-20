# Guilherme Weber — Montara.AI (MazyOS)

> Operação Montara.AI. Aqui ficam clientes, propostas, entregas, portfólio
> e tudo que girar em torno de captar e entregar sites com IA.

## O que é esse workspace

Montara.AI — automação com inteligência artificial, focando em criação
de sites profissionais para empresas que não têm recursos internos.

**Estrutura de pastas:**

- `_memoria/` — quem sou, como falo, prioridades atuais
- `identidade/` — marca visual Montara.AI (cores, logo, tipografia)
- `clientes/` — uma pasta por cliente (RDO, Info+, etc)
  - `clientes/RDO/` — briefing, documentação, site
  - `clientes/info-plus/` — briefing, documentação, site
- `propostas/` — propostas em rascunho ou enviadas
- `modelos/` — templates de sites profissionais (reutilizáveis)
- `marketing/` — meu próprio conteúdo (portfólio, LinkedIn, Instagram)
- `saidas/` — emails, documentos pontuais
- `dados/` — arquivos de clientes (imagens, specs, etc)
- `tarefas.md` — pipeline, prazos, próximos projetos

---

## Quem sou

Sou Guilherme Weber, freelancer especializado em implementação de automação
com IA. Trabalho com empresas que têm site desatualizado ou não têm equipe
interna pra cuidar disso, entregando sites profissionais + integração de IA.

## Meu serviço

- **Sites profissionais com IA** — estrutura, design responsivo, integração
- **Automação de processos** — usando agentes de IA
- **Consuloria técnica** — como implementar IA no negócio

**Perfil de cliente:** Micro/pequena empresa com 5-50 pessoas  
**Ticket médio:** ~R$ 3-8k por site  
**Capacidade:** 2 projetos simultâneos (máximo)

## Clientes ativos

1. **RDO Comunicação Visual** (Florianópolis) — site institucional + formulário
2. **Info+** (loja de informática) — site e-commerce + catálogo
3. **Plotter Service** (São José/SC) — site institucional com hero animada + portfólio de trabalhos

## Como trabalho

1. **Prospeção:** WhatsApp + referências ("já trabalho com empresa X no seu ramo")
2. **Proposta:** exemplos de sites similares + escopo claro
3. **Desenvolvimento:** templates reutilizáveis + customização por cliente
4. **Entrega:** site ao vivo na Vercel + documentação + suporte inicial
5. **Cobrança:** 50% no fechamento, 50% na entrega

**Ferramentas:** HTML/CSS/JS, Vercel, GitHub, Claude Code, Nodemailer  
**Tempo médio:** ~2-3 semanas por site (com automação)

## Tom de voz

Direto, amigável, contextual. Menciono referências pra gerar confiança
("já trabalho com RDO em Jurerê"). Descontraído mas respeitoso. Prático:
foco em próximos passos concretos.

Evitar: jargão sem necessidade, formalidade excessiva

## Prioridade atual

Estruturar **modelos reutilizáveis de sites** para não sair do zero a cada
projeto. Criar portfólio visual forte para captar mais clientes.

**Gargalo:** Fazer sites manualmente é lento. Preciso de templates.

## Regras do sistema

- Cliente novo → criar pasta `clientes/<Nome>/` com `briefing.md`
- Proposta enviada → `clientes/<Nome>/proposta.html`
- Template novo → guardar em `modelos/` com documentação
- Cobrança → registrar em `saidas/cobranca.md`
- Cliente fechado → adicionar em seção "Clientes ativos" acima

## Próximos passos

1. `/mapear-rotinas` — transformar "estruturar modelos" em skill própria
2. Criar 3-5 templates profissionais (por nicho)
3. Consolidar identidade visual (cores, tipografia)
4. Expandir portfólio pra 5+ clientes

---

## MazyOS — Como o sistema funciona

### Contexto lido automaticamente

No início de cada conversa, essas arquivos são carregados:

1. `_memoria/empresa.md` — quem é você, o que faz, clientes
2. `_memoria/preferencias.md` — tom de voz, estilo, o que evitar
3. `_memoria/estrategia.md` — foco atual, prioridades, gargalos
4. `identidade/design-guide.md` — marca visual (cores, tipografia, logo)

### Fluxo padrão

- **Antes de executar tarefa:** verificar se existe skill relevante em `.claude/skills/`
- **Se encontrar skill:** seguir as instruções da skill
- **Se não encontrar:** executar normalmente
- **Ao concluir:** perguntar se mudou contexto (novo cliente, nova prioridade, nova skill)

### Criação de skills

Quando uma tarefa é repetível, transformar em skill:

```
/mapear-rotinas → identificar padrão
→ criar skill em `.claude/skills/nome/SKILL.md`
→ pronto pra usar com `/nome`
```

---

*Última atualização: 20 de julho de 2026 — Setup MazyOS completo via `/instalar`*
