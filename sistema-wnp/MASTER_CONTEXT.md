# MASTER_CONTEXT.md — Sistema Interno WNP

> Fonte de verdade do projeto. Qualquer sessão futura do Claude Code deve ler este arquivo
> antes de continuar o desenvolvimento — ele carrega o prompt original, as decisões de
> arquitetura já tomadas e o estado atual das fases.

## O que é este projeto

Sistema operacional interno da WNP (agência de comunicação visual e posicionamento digital
de Guilherme Weber) — **uso próprio, não é entrega de cliente**. Nasceu de um vídeo sobre
"Business Operating System" para agências que um amigo mandou num grupo de networking;
Guilherme pediu pro ChatGPT interpretar o vídeo, e o resultado (prompt abaixo) virou o
briefing funcional deste sistema.

## Prompt original (fonte de verdade dos requisitos funcionais)

> Analisei a gravação inteira (~3min10s). O que aparece ali não é simplesmente um site: é um
> sistema operacional/comercial para uma agência, com dashboard, gestão de clientes/prospecção,
> tarefas, integrações e uma camada de IA.
>
> Para fazer algo semelhante no Claude Code, eu dividiria assim:
>
> - **Dashboard / Visão geral**: métricas do negócio, progresso do dia, atividades recentes e atalhos.
> - **Briefing do dia**: central de execução dizendo o foco de hoje, prioridades, pendências e próximos passos.
> - **CRM / Prospecção**: lista de prospects, status, informações da empresa, contatos, histórico, modal por lead.
> - **Dossiê do prospect**: dados, diagnóstico, oportunidades e informações para abordagem comercial.
> - **Gerador/assistente de proposta**: IA montando materiais, análises e textos relacionados ao prospect.
> - **Gestão de campanhas**: Google Ads e Meta Ads, investimento, campanhas e indicadores.
> - **Tarefas e execução**: atividades por prioridade/status, com progresso.
> - **IA contextual**: não é chatbot genérico — conhece cliente, prospect, campanha e tarefa.
> - **Atendimento por voz/chat**: interface flutuante de conversa/voz com IA.
> - **Interface**: dark mode, verde como accent, sidebar/header discreto, cards grandes, pouco efeito visual, muita informação operacional.
>
> O principal ponto para copiar é a arquitetura, não exatamente o visual. A sensação do vídeo
> vem de tudo estar conectado: Prospect → diagnóstico → abordagem → proposta → cliente →
> campanha → métricas → tarefas → IA.
>
> **STACK**: Next.js, TypeScript, Tailwind CSS, Supabase (banco + auth), componentização
> profissional, estrutura preparada para integração futura com Google Ads, Meta Ads,
> WhatsApp e modelos de IA.
>
> **DESIGN**: dark mode como padrão, fundo quase preto/grafite, verde como cor principal de
> destaque, cards discretos, bordas finas, pouco glow, nada de aparência de template genérico
> de IA, densidade de informação semelhante a ferramentas SaaS B2B reais, tipografia limpa,
> excelente hierarquia visual, responsivo.
>
> **MÓDULOS FUNCIONAIS** (todos a implementar eventualmente, módulo por módulo):
>
> 1. **Visão Geral**: saudação/contexto do dia, progresso diário, atividades realizadas,
>    prospects ativos, clientes ativos, tarefas pendentes, campanhas rodando, indicadores
>    comerciais, últimas atividades, bloco "Foco de hoje".
> 2. **Foco de Hoje**: prioridades, prospects para hoje, clientes que precisam de atenção,
>    campanhas com alerta, tarefas atrasadas, oportunidades comerciais.
> 3. **Prospecção / CRM**: tabela e/ou kanban. Campos: empresa, segmento, responsável,
>    telefone, WhatsApp, e-mail, site, Instagram, cidade, origem, status, potencial estimado,
>    última interação, próxima ação, observações. Pipeline: Novo → Pesquisando → Qualificado →
>    Contato iniciado → Reunião → Proposta → Negociação → Ganho → Perdido.
> 4. **Dossiê do prospect**: Dados da empresa, Informações de contato, Presença digital,
>    Diagnóstico, Oportunidades, Histórico, Próximos passos. "Diagnóstico Digital" (IA analisa
>    site/Google/Instagram/anúncios/posicionamento/reputação/comunicação/conversão) → lista
>    problemas encontrados → "Serviços recomendados" (Criação de site, Google Ads, Meta Ads,
>    SEO, Automação comercial, CRM, Chatbot IA). Botão "Gerar abordagem" (simulado por
>    enquanto) gera WhatsApp, e-mail, roteiro de ligação, mensagem Instagram, follow-up.
> 5. **Propostas**: prospect + serviços + valor + setup + mensalidade + prazo + observações,
>    preview profissional. Status: Rascunho, Enviada, Visualizada, Negociação, Aceita, Recusada.
> 6. **Clientes**: prospect marcado GANHO vira cliente. Página: informações, serviços
>    contratados, mensalidade, projetos, tarefas, campanhas, documentos, histórico, reuniões,
>    métricas, observações.
> 7. **Projetos**: status, responsável, deadline, progresso, tarefas, arquivos, cliente
>    relacionado. Exemplos: Novo site, Landing Page, Google Ads, Meta Ads, Automação WhatsApp,
>    CRM, SEO/Google.
> 8. **Tarefas**: status (A fazer, Em andamento, Aguardando, Concluído), prioridade (Baixa,
>    Normal, Alta, Urgente), relacionável a cliente/prospect/projeto/campanha.
> 9. **Campanhas ("Tráfego pago")**: Google Ads e Meta Ads separados, mock data inicialmente.
>    Indicadores: Investimento, Impressões, Cliques, CTR, CPC, Leads, CPL, Conversões, CPA, ROAS.
> 10. **Central de IA**: botão flutuante discreto, modal/painel lateral, modos Chat e Voz,
>     contextual por página (prospect, campanha, cliente, dashboard). Simulado por enquanto,
>     código estruturado pra plugar LLM depois.
>
> **Mock data**: pelo menos 10 prospects, 5 clientes, 8 projetos, 20 tarefas, 6 campanhas, 5
> propostas, todos relacionados entre si.
>
> **Arquitetura pedida explicitamente**: definir entidades, relacionamentos, arquitetura de
> pastas, rotas, componentes reutilizáveis ANTES de implementar. Código limpo e modular. Não é
> demo estática — é fundação de produto SaaS real que depois recebe Supabase, APIs de
> anúncios, WhatsApp, automações e IA de verdade.
>
> Eu não pediria tudo de uma vez para o Claude implementar — usaria isso como
> `MASTER_CONTEXT.md` e faria módulo por módulo, pra reduzir o risco de virar um dashboard
> genérico. E tem uma oportunidade melhor ainda: adaptar a lógica do vídeo aos 3 pilares da
> WNP — Tráfego, Comercial, Operacional — em vez de copiar a estrutura do vídeo literalmente.

## Decisões de arquitetura (não reabrir sem justificativa nova)

1. **Localização:** `sistema-wnp/`, top-level, isolado do resto do monorepo (que é todo
   HTML/CSS/JS vanilla sem build step). Primeiro projeto do workspace com Next.js/TS/build step.
2. **Eixo de navegação:** os 3 pilares da WNP, não a lista literal do vídeo:
   - **Tráfego** → campanhas Google Ads + Meta Ads (módulo 9)
   - **Comercial** → prospecção/CRM + dossiê + gerador de abordagem + propostas (módulos 3, 4, 5)
   - **Operacional** → clientes + projetos + tarefas (módulos 6, 7, 8)
   - **Transversais** (fora dos pilares) → Visão Geral (1), Foco de Hoje (2), Central de IA (10), Configurações
3. **Stack:** Next.js 16 (App Router, `params`/`searchParams` são `Promise`, use os helpers
   globais `PageProps<'/rota'>` e `LayoutProps<'/rota'>`), TypeScript, Tailwind CSS v4
   (tokens via `@theme` em `src/app/globals.css` — **não existe** `tailwind.config.ts` nesta
   versão do Tailwind), Supabase (futuro).
4. **Paleta:** tokens da marca WNP (`identidade/design-guide.md` na raiz do workspace), mas com
   **mint como accent primário** deste sistema (em vez de coral, primário no site
   institucional) — o prompt original pede "verde" como cor de destaque, e o mint da WNP já é
   esse verde. Coral fica reservado para alerta/urgência/erro. Ver tokens em
   `src/app/globals.css`.
5. **Dados:** mock-first. Componentes **nunca** importam `src/lib/mock/*` diretamente — sempre
   passam por `src/lib/data/*.repository.ts`. Quando o Supabase entrar, só o repository muda
   de implementação, zero refactor na UI.

## Estado atual do projeto

- [x] **Fase A — Scaffold + Shell**: Next.js/TS/Tailwind configurado, tokens de design (mint
      primário), fontes Sora/Manrope, `AppShell` com `Sidebar` (3 pilares + transversais),
      `Topbar`, `AiLauncherButton` (desabilitado). Todas as 12 rotas existem e navegam.
- [x] **Fase B — Mock data + types + dashboard**: entidades tipadas em `src/types/`, mock data
      relacionado em `src/lib/mock/` (10 prospects, 5 clientes, 8 projetos, 20 tarefas, 6
      campanhas, 5 propostas — usando os clientes/prospects reais da WNP quando fazia sentido,
      ex: RDO, Plotter Service, Clínica Reab, Central Floripa, Ingleses Congelados, Neger
      Telecom, Schaefer Yachts, Móveis do Bem), repositories em `src/lib/data/`, dashboard de
      Visão Geral funcional em `src/app/visao-geral/page.tsx`.
- [x] **Refinamento da Visão Geral** (pós-Fase B, feedback externo via ChatGPT sobre o vídeo
      original): a primeira versão da Visão Geral tinha "cara de dashboard genérico" — cards
      retangulares todos com o mesmo peso visual. Reformulada para funcionar como central de
      comando: `FocoHojeHero` (elemento principal, com CTAs por item e progresso do dia
      embutido no cabeçalho, substituindo o antigo card de progresso + lista de tarefas
      pendentes), `CompactKpiRow` (indicadores finos com número + contexto, não mais cards
      grandes), `PipelineComercialCard` (funil de prospects por etapa + valor em negociação),
      `PerformanceTrafegoCard` (métricas agregadas de tráfego + split por canal, sem gráficos
      grandes), `ActivityTimeline` (HH:mm — sujeito — ação, não mais lista genérica). A Central
      de IA (`AiLauncherButton`) deixou de ser só decorativa: agora abre um painel "Pergunte à
      WNP" com perguntas sugeridas e respostas computadas a partir do mock data em
      `src/lib/ai/sugestoes.ts` (assinatura isolada, pronta pra virar LLM real na Fase J). Regra
      importante: os cálculos de "hoje"/"atrasado" nesta fase usam `AGORA_MOCK`
      (`src/lib/mock/agora.ts`), uma data fixa (~2026-08-10), não `new Date()` — os prazos do
      mock foram escritos em torno dessa data e ficariam incoerentes com o relógio real do
      sistema assim que o dia virasse. Trocar por `new Date()` nos call sites quando os dados
      pararem de ser mock (Fase K).
- [x] **Fase C — Comercial 1**: Prospecção em `/comercial/prospeccao` com toggle Kanban/Tabela
      (`ProspectsView`, client). Kanban agrupa por `PROSPECT_PIPELINE` (9 colunas, scroll
      horizontal); tabela é densa com `StatusBadge`. Ambas linkam pra
      `/comercial/prospeccao/[id]` (dossiê — ainda placeholder, é a Fase D). Componentes em
      `src/components/comercial/`.
- [x] **Fase D — Comercial 2**: Dossiê do prospect (`/comercial/prospeccao/[id]`) — Dados da
      empresa, Contato, Presença digital, Diagnóstico Digital (`DiagnosticoPanel`, client —
      botão "Gerar diagnóstico" chama `lib/ai/diagnostico.ts`, heurística simulada sobre os
      dados do prospect), Oportunidades (serviços recomendados dentro do próprio diagnóstico),
      Histórico (atividades relacionadas ao prospect + suas propostas), Próximos passos.
      "Gerar abordagem" (`AbordagemPanel`, client) chama `lib/ai/abordagem.ts` — gera
      WhatsApp/e-mail/roteiro de ligação/Instagram/follow-up com templates preenchidos, em abas.
      Ambos os geradores têm assinatura isolada (`gerarDiagnostico(prospect)`,
      `gerarAbordagem(prospect)`) pra trocar por LLM real na Fase J sem mexer na UI.
- [x] **Fase E — Comercial 3**: Propostas (`/comercial/propostas`) — lista expansível
      (`PropostasList`, client) mostrando prospect, valores, status, e preview dos itens ao
      clicar. **Não há formulário de criação** — não existe camada de escrita/persistência
      ainda (tudo é mock read-only), então "criar proposta" fica pra quando o Supabase entrar
      (Fase K). O que existe cobre listar, ver status e detalhar itens/valores.
- [x] **Fase F — Operacional 1**: Clientes — lista em `/operacional/clientes`
      (`ClientesTable`) e detalhe em `/operacional/clientes/[id]` (serviços contratados,
      mensalidade, projetos com progresso, tarefas e campanhas relacionadas, histórico,
      observações). Documentos e reuniões não têm modelo de dados ainda — a página avisa isso
      em vez de fingir que existe.
- [x] **Fase G — Operacional 2**: Projetos (`/operacional/projetos`, tabela com progresso e
      link pro cliente) e Tarefas (`/operacional/tarefas`, quadro por status — A fazer/Em
      andamento/Aguardando/Concluído — com prioridade e a entidade relacionada resolvida por
      nome).
- [x] **Fase H — Tráfego**: Campanhas (`/trafego/campanhas`) — `CompactKpiRow` com
      investimento/leads/CPL médio/alertas agregados, mais `CampanhasTable` densa (cliente,
      canal, status, investimento, leads, CPL, ROAS).
- [x] **Fase I — Foco do Dia**: página dedicada (`/foco-do-dia`) reaproveitando
      `FocoHojeHero` (lista completa, sem o corte de 5 itens da prévia do dashboard) +
      Prospects para hoje, Clientes que precisam de atenção, Campanhas com alerta,
      Oportunidades comerciais. A lógica de montar os itens do Foco de Hoje foi extraída pra
      `src/lib/foco/buildFocoHoje.ts`, compartilhada entre `/visao-geral` (prévia, top 5) e
      `/foco-do-dia` (lista completa) — não duplicar essa lógica nas duas páginas.
- [~] **Fase J — Central de IA**: o essencial já está no ar desde o refinamento da Visão Geral
      (`AiLauncherButton` com painel "Pergunte à WNP", perguntas sugeridas, respostas
      computadas do mock data em `lib/ai/sugestoes.ts`). O que falta pra fechar a fase
      completa do prompt original: input de texto livre funcional (hoje é só decorativo/
      desabilitado), modo Voz, e contexto por página (hoje as sugestões são globais/
      transversais, não mudam se você está dentro de um prospect específico, por exemplo).
- [ ] **Fase K — Supabase**: troca de implementação nos `*.repository.ts` de mock para client
      Supabase real, + autenticação, + camada de escrita (criar/editar prospect, proposta,
      tarefa etc — hoje tudo é somente leitura). **Precisa de decisão/input do Guilherme**
      (criar projeto Supabase, definir schema das tabelas, variáveis de ambiente) — não dá pra
      avançar sozinho aqui.

Ordem pensada assim: Comercial primeiro porque é onde a WNP mais precisa de ferramenta hoje
(prospecção ativa), Operacional depois porque depende de Clientes existirem, Tráfego é o
pilar mais isolado/mockável a qualquer momento, IA e Supabase por último por serem
transversais e de maior risco técnico.

### Limitação importante desta rodada (mock read-only)

Nenhuma tela tem escrita real — não existe criar/editar/mover prospect de coluna no kanban,
criar proposta, marcar tarefa como concluída, etc. Tudo isso depende de uma camada de
mutação (Server Actions ou API routes) que só faz sentido implementar depois que os dados
pararem de ser mock estático (Fase K, Supabase). Até lá, o sistema é uma "maquete funcional
navegável" — todas as rotas, relações e visualizações são reais, só a escrita que falta.

## Entidades e relacionamentos

Definidas em `src/types/` (ver `src/types/index.ts` para o barrel export):

- `Prospect` (`prospect.ts`) — pipeline `novo → ... → ganho/perdido`, `DiagnosticoDigital` com
  `problemasEncontrados[]` e `servicosRecomendados: ServicoWNP[]`.
- `Cliente` (`cliente.ts`) — `prospectOrigemId?` rastreia de qual prospect veio,
  `servicosContratados`, `projetos: RefResumo[]`.
- `Projeto` (`projeto.ts`) — `clienteId` obrigatório.
- `Tarefa` (`tarefa.ts`) — FK opcional para `clienteId` / `prospectId` / `projetoId` /
  `campanhaId` (no máx. uma preenchida, por convenção).
- `Campanha` (`campanha.ts`) — `canal: google_ads | meta_ads`, `clienteId` obrigatório,
  `MetricasCampanha` com investimento/CTR/CPC/CPL/ROAS etc.
- `Proposta` (`proposta.ts`) — `prospectId` obrigatório, `itens: ItemProposta[]`.
- `Atividade` (`atividade.ts`) — feed genérico cross-entidade, usado no dashboard.

## Convenções de código

- Componentes em PascalCase, um por arquivo.
- `src/lib/data/*.repository.ts` é a única porta de entrada de dados — nunca importar
  `src/lib/mock` diretamente de um componente.
- `src/components/ui/StatusBadge.tsx` + `src/lib/utils/constants.ts` (`STATUS_POR_DOMINIO`,
  `getStatusMeta`) são o único lugar de mapeamento status → cor/label. Ao adicionar um novo
  domínio de status, estender ali, não duplicar lógica de cor em cada módulo.
- Dark mode é a base, não uma opção — sem toggle de tema.
- `next dev`/`next build` regeneram `AGENTS.md` e `CLAUDE.md` (aponta pra `AGENTS.md`)
  automaticamente — não editar esses dois arquivos manualmente, usar este `MASTER_CONTEXT.md`
  para contexto de projeto.
