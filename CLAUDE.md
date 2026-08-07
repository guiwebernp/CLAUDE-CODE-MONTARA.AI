# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# Guilherme Weber — WNP (MazyOS)

> Operação WNP (antes Montara.AI — rebrand em 2026-08-07). Aqui ficam clientes, propostas, entregas,
> portfólio e tudo que girar em torno de captar e entregar sites com IA.

## Desenvolvimento de Sites para Clientes

### Estrutura de um projeto de cliente

Cada site segue este padrão:

```
clientes/<nome-cliente>/
├── briefing.md                    # Escopo, objetivos, tom
├── site/                          # Site de produção
│   ├── index.html                 # Página principal
│   ├── js/main.js                 # Lógica (sempre vanilla JS)
│   ├── css/style.css              # Estilos (CSS Grid/Flexbox, mobile-first)
│   ├── assets/                    # Imagens, ícones
│   └── README.md                  # Deploy instructions
├── design_handoff_<cliente>/      # Designs originais (Figma export)
└── docs/                          # Checklists, notas de produção
```

### Fluxo técnico: Design → Desenvolvimento → Deploy

1. **Design** → Figma `.dc.html` handoff (em `design_handoff_*/`)
2. **Dev** → HTML/CSS/JS vanilla (sem frameworks, sem build step)
3. **Deploy** → padrão é Vercel (via GitHub, branch `main` em produção automaticamente). **Exceção: RDO Comunicação Visual** usa cPanel — repo próprio `github.com/guiwebernp/rdo-comunicacao-visual` (separado deste monorepo) + deploy manual em cPanel → Git™ Version Control → "Update from Remote" → "Deploy HEAD Commit". Ao editar o site da RDO, sincronizar `index.html`, `css/`, `js/`, `assets/` da pasta de trabalho pra esse repo separado antes de dar push (detalhes em `rdo-deploy-workflow` na memória).
4. **Suporte** → Site roda sob demanda, documentação em `/site/README.md`

### Stack e padrões

- **HTML:** Semântico, acessível (ARIA onde necessário), meta tags SEO
- **CSS:** Grid + Flexbox, mobile-first, CSS Variables para cores da marca
- **JS:** Vanilla ES6+, sem dependências externas; max ~200 linhas por arquivo
- **Deploy:** Vercel (raiz do site = pasta `/site`, URL via CNAME ou subdomain)
- **SEO:** Open Graph, meta descriptions, sitemap.xml se multi-página
- **Performance:** Imagens otimizadas (WebP com fallback), defer scripts, inline CSS crítica

### Desenvolvendo um site

Quando editar HTML/CSS/JS de cliente:

1. **Editar localmente** → arquivo diretamente em `clientes/<nome>/site/`
2. **Testar** → abrir `/site/index.html` no navegador (hot-reload é manual: F5)
3. **Verificar** → Lighthouse (Chrome DevTools) para Performance/Acessibilidade/SEO
4. **Commit e Push** → `/salvar` (ou `git add . && git commit && git push`)
5. **Deploy automático** — Vercel escuta `main` branch e deploya em ~60s

### Criando um novo site (template)

Copiar de `templates/<categoria>/` como base:

```powershell
# Copiar template
cp -r templates/corporativo clientes/novo-cliente/site

# Customizar
# 1. Cores: editar CSS Variables em style.css
# 2. Logo/Imagens: colocar em assets/
# 3. Conteúdo: HTML em index.html
# 4. Funcionalidades: js/main.js se precisar
# 5. Meta tags: SEO em <head>

# Testar e commitar
/salvar
```

### Reutilização e templates

**O gargalo é fazer sites do zero.** Usar templates reduz de 2-3 semanas para 3-5 dias:

- `templates/corporativo/` — branding, hero, sobre, serviços, footer (base padrão)
- `templates/ecommerce-simples/` — produtos em grid, carrinho, checkout conceitual
- `templates/agencia/` — portfólio, case studies, contato
- `templates/identidade/` — inclui colors.css com palette da WNP

**Quando criar template novo:** após 2+ clientes no mesmo nicho, consolidar em `templates/`.

---

## O que é esse workspace

WNP — comunicação visual e posicionamento digital, com automação usando
inteligência artificial, focando em criação de sites profissionais para
empresas que não têm recursos internos. (Antes "Montara.AI" — rebrand em 2026-08-07.)

**Estrutura de pastas:**

- `_memoria/` — quem sou, como falo, prioridades atuais
- `identidade/` — marca visual WNP (cores, logo, tipografia)
- `clientes/` — uma pasta por cliente (RDO, Plotter Service, etc)
  - `clientes/RDO COMUNICAÇÃO VISUAL/` — briefing, documentação, site
  - `clientes/plotter-service/` — briefing, documentação, site
- `templates/` — templates de sites e componentes reutilizáveis
- `marketing/` — meu próprio conteúdo (portfólio, LinkedIn, Instagram)
- `saidas/` — emails, documentos pontuais
- `dados/` — arquivos de clientes (imagens, specs, etc)
- `scripts/` — utilitários e automações

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

1. **RDO Comunicação Visual** (Florianópolis) — site institucional completo, finalizado e no ar em rdocomvisual.com.br
2. **Plotter Service** (São José/SC) — site institucional com hero animada + portfólio de trabalhos
3. **Clínica Reab** (Florianópolis) — site moderno de fisioterapia (implementado e finalizado)

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

## Fluxos Comuns

### Iniciar sessão com contexto carregado

```
/abrir
```

Carrega automaticamente `_memoria/*` + `identidade/*`, pronto pra trabalhar sem pedir contexto de novo.

### Salvar progresso (commit + push)

```
/salvar
```

Faz `git add .`, `git commit` com mensagem automática, e `git push origin main`. Na primeira vez, configura o remote.

### Criar novo projeto de cliente

```
/novo-projeto
```

Guia interativo: pergunta nome, cria pasta em `clientes/`, inicia com `briefing.md` e `.gitignore`.

### Atualizar memória com aprendizados

```
/atualizar
```

Varre o projeto (clientes, sites, templates), detecta mudanças, sugere atualizações em `_memoria/`.

---

## Notas de Arquitetura

### Por que vanilla JS (sem frameworks)?

- Sites de cliente são simples: formulário + navegação + efeitos visuais
- Reduz dependências e complexidade de build
- Deploy é mais rápido (sem npm install)
- Clientes podem editar HTML diretamente sem conhecer toolchain
- Vercel não precisa de build step

### CSS Variables para marca

Cada `style.css` começa com:

```css
:root {
  --color-primary: #valor-cliente;
  --color-secondary: #valor-cliente;
  --font-family-body: family-sem-serif;
  --font-family-heading: family-com-peso;
}
```

Assim, customizar cores é trocar 4 linhas, não o CSS todo.

### Pastas intocáveis (nunca editar diretamente)

- `.claude/skills/` — skills são geradas/atualizadas pelo `/instalar` e `/mapear-rotinas`
- `_memoria/` — editar via `/atualizar` ou manualmente com cuidado (estrutura esperada é importante)
- `.git/` — sempre via `/salvar`

### Quando adicionar novo cliente

1. Copiar template da categoria mais próxima
2. Criar pasta em `clientes/nome-novo/`
3. Preencher `briefing.md` com escopo + objetivos
4. Customizar template (cores, conteúdo, assets)
5. Deploy: criar repo no GitHub com nome `cliente-nome`, configurar Vercel
6. Commit + push via `/salvar`

---

*Última atualização: 7 de agosto de 2026 — rebrand Montara.AI → WNP, novo site institucional implementado*
