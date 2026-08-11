# Estratégia

> O que importa agora. Prioridades, metas, prazos.
> O Claude usa isso pra decidir o que sugerir primeiro e o que adiar.
> Atualize sempre que as prioridades mudarem.

## Fase

**Crescimento** — De 2 clientes fechados para escalar a entrega. Rebrand recém-concluído
(Montara.AI → WNP, 2026-08-07): site institucional novo no ar em `clientes/WNP/site/`.

## Prioridade principal

Automatizar a criação de sites. Criar templates reutilizáveis para cada nicho (info+, estilo RDO, etc) para não sair do zero a cada projeto.

## O que pode esperar

- Estruturar modelos de sites como base para projetos
- Montar portfólio de templates para mostrar aos clientes
- Captar mais clientes com portfólio forte

## Nova frente: Posicionamento em IA / ChatGPT Ads (2026-08-11, em exploração)

Ideia trazida de conversa com ChatGPT: reposicionar a WNP de "faço site" pra "posiciono sua
empresa onde o cliente pesquisa, pergunta e decide" — cobrindo Google (busca) e ChatGPT Ads
(conversa/intenção). Vira "Arquitetura de Aquisição Digital": site + mapeamento de intenções
por produto + criativos pra IA + campanha (Google + ChatGPT) + relatório. Encaixa como camada
nova dentro do pilar Tráfego do framework já validado ([[wnp-3-pilares-framework]] na memória),
não como serviço isolado.

**Antes de vender pra cliente real, confirmar:**
- Se ChatGPT Ads já está disponível pra contas brasileiras comprarem (piloto anunciado pra
  expandir ao Brasil em maio/2026, mas checar disponibilidade real antes de prometer entrega).
- CPC sugerido pela OpenAI (~US$3-5, ~R$17-28) é caro pro ticket médio de cliente da WNP
  (R$3-8k, micro/pequena empresa) — risco de vender expectativa que o cliente não sustenta
  em verba de mídia. Enquadrar como "estruturação/preparação" enquanto não há orçamento de
  ads condizente, e só oferecer gestão de campanha quando o cliente tiver verba real.
- Isso muda o modelo de negócio de produto pontual (site) pra recorrência (retainer de mídia)
  — decisão maior que precisa ser deliberada, não só um texto novo no site.

**Status:** mensagem aplicada e home reestruturada em formato pedagógico (comparação antes/agora,
pipeline "Arquitetura de Aquisição Digital", entregáveis concretos) no site institucional da WNP
(`clientes/WNP/site/`, 2026-08-11). Publicado no Netlify em `wnp-comunicacao-visual.netlify.app`
(exceção ao padrão Vercel, ver `CLAUDE.md`). Linguagem usada é "presença/preparação para buscas
com IA", sem prometer gestão de campanha ChatGPT Ads ainda (ressalva de disponibilidade acima
segue valendo). Falta aplicar em propostas de cliente.

**Próximo passo concreto:** validar disponibilidade real do ChatGPT Ads Manager pra Brasil
antes de oferecer gestão de campanha (não só posicionamento) em proposta comercial.

## Contexto com prazo

**Gargalo atual:** Fazer sites manualmente é lento.  
**Candidata a skill:** `/template-builder` ou `/gerar-modelos-site` (quando usar `/mapear-rotinas`)

**Cliente ativo:**
- RDO Comunicação Visual (Florianópolis) — site institucional (finalizado e no ar em rdocomvisual.com.br), relação contínua

**Em negociação/pendente:**
- Plotter Service (São José/SC) — site pronto (hero animada, mobile responsivo), ainda em negociação
- Clínica Reab (Florianópolis) — site de fisioterapia pronto, falta retomar contato com o cliente

**Em andamento / prospecção (ainda não fechados):**
- Ingleses Congelados (Florianópolis) — indústria de pães/salgados congelados B2B. Site em produção (institucional + calculadora "Monte seu pedido"); proposta pronta mas ainda não enviada ao cliente
- Móveis do Bem (Florianópolis) — móveis de demolição. Site em produção a partir de handoff Figma; faltam fotos do catálogo em alta resolução
- Central Floripa (Florianópolis) — comunicação visual. Demo de proposta pronta (baseada no site do Plotter Service); **não confirmado se a empresa segue ativa**, checar por telefone antes de prosseguir
- Neger Telecom — proposta de posicionamento digital (site + Instagram + Google) ainda a apresentar; falta briefing formal do cliente (histórico, cores, tom, concorrentes)
- Schaefer Yachts — iniciativa pessoal de prospecção: site nível internacional (nicho de iates/lanchas) sendo construído como peça de abordagem, sem contrato fechado

**Leva de prospecção 2026-08-11** (listas geradas em `saidas/prospeccao/`, abordagem já iniciada com):
- Meneghetti Móveis, Alemão Defumados, JC Embalagens, Mc Gráfica, Imagem SC — vieram das listas de
  fábricas/produtos SC, B2B médio-grande Floripa, comunicação visual Floripa e NSC Total; ainda sem
  fechamento, primeiro contato em andamento

**Outras iniciativas:**
- Nicho Certo (`clientes/Nicho Certo/`) — sistema de agentes de IA para advogados no nicho de ludopatia; produto/ferramenta própria, não é site de cliente no padrão usual
