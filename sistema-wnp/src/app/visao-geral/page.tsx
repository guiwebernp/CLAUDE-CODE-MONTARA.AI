import { clientesRepository } from "@/lib/data/clientes.repository";
import { prospectsRepository } from "@/lib/data/prospects.repository";
import { tarefasRepository } from "@/lib/data/tarefas.repository";
import { campanhasRepository } from "@/lib/data/campanhas.repository";
import { propostasRepository } from "@/lib/data/propostas.repository";
import { projetosRepository } from "@/lib/data/projetos.repository";
import { atividadesRepository } from "@/lib/data/atividades.repository";
import { AGORA_MOCK } from "@/lib/mock/agora";
import { resolveNomeEntidade } from "@/lib/utils/atividade";
import { diasDesde, formatDataCurta } from "@/lib/utils/format";
import { PROSPECT_PIPELINE, type ProspectStatus } from "@/types";
import { GreetingBlock } from "@/components/dashboard/GreetingBlock";
import { CompactKpiRow } from "@/components/dashboard/CompactKpiRow";
import { FocoHojeHero, type FocoItem } from "@/components/dashboard/FocoHojeHero";
import { PipelineComercialCard } from "@/components/dashboard/PipelineComercialCard";
import { PerformanceTrafegoCard } from "@/components/dashboard/PerformanceTrafegoCard";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";

const LABEL_STATUS: Record<ProspectStatus, string> = {
  novo: "Novo",
  pesquisando: "Pesquisando",
  qualificado: "Qualificado",
  contato_iniciado: "Contato iniciado",
  reuniao: "Reunião",
  proposta: "Proposta",
  negociacao: "Negociação",
  ganho: "Ganho",
  perdido: "Perdido",
};

const STATUS_PROPOSTA_ABERTA = new Set(["enviada", "visualizada", "negociacao"]);

export default async function VisaoGeralPage() {
  const [
    clientesAtivos,
    prospectsAtivos,
    prospectsTodos,
    tarefasPendentes,
    tarefasAtrasadas,
    tarefasTodas,
    campanhasRodando,
    campanhasAlerta,
    campanhasTodas,
    propostas,
    projetos,
    atividadesRecentes,
  ] = await Promise.all([
    clientesRepository.getAtivos(),
    prospectsRepository.getAtivos(),
    prospectsRepository.getAll(),
    tarefasRepository.getPendentes(),
    tarefasRepository.getAtrasadas(AGORA_MOCK),
    tarefasRepository.getAll(),
    campanhasRepository.getRodando(),
    campanhasRepository.getComAlerta(),
    campanhasRepository.getAll(),
    propostasRepository.getAll(),
    projetosRepository.getAll(),
    atividadesRepository.getRecentes(6),
  ]);

  const idsAtrasadas = new Set(tarefasAtrasadas.map((t) => t.id));

  // ---- Foco de hoje ----------------------------------------------------
  const itensDeTarefa: FocoItem[] = tarefasPendentes
    .filter((t) => idsAtrasadas.has(t.id) || t.prioridade === "urgente" || t.prioridade === "alta")
    .sort((a, b) => Number(idsAtrasadas.has(b.id)) - Number(idsAtrasadas.has(a.id)))
    .slice(0, 3)
    .map((tarefa) => {
      const cta = tarefa.prospectId
        ? { label: "Abrir prospect", href: `/comercial/prospeccao/${tarefa.prospectId}` }
        : tarefa.clienteId
          ? { label: "Abrir cliente", href: `/operacional/clientes/${tarefa.clienteId}` }
          : tarefa.campanhaId
            ? { label: "Analisar campanha", href: "/trafego/campanhas" }
            : { label: "Ver tarefa", href: "/operacional/tarefas" };

      const contexto = idsAtrasadas.has(tarefa.id)
        ? `Atrasada desde ${tarefa.prazo ? formatDataCurta(tarefa.prazo) : "sem prazo"}`
        : tarefa.prazo
          ? `Prazo ${formatDataCurta(tarefa.prazo)}`
          : "Sem prazo definido";

      return {
        id: `tarefa-${tarefa.id}`,
        titulo: tarefa.titulo,
        contexto,
        tom: idsAtrasadas.has(tarefa.id) || tarefa.prioridade === "urgente" ? "alerta" : "atencao",
        cta,
      } satisfies FocoItem;
    });

  const itensDeProposta: FocoItem[] = propostas
    .filter((p) => STATUS_PROPOSTA_ABERTA.has(p.status) && diasDesde(p.atualizadaEm, AGORA_MOCK) >= 1)
    .slice(0, 2)
    .map((proposta) => {
      const prospect = prospectsTodos.find((p) => p.id === proposta.prospectId);
      const dias = diasDesde(proposta.atualizadaEm, AGORA_MOCK);
      return {
        id: `proposta-${proposta.id}`,
        titulo: `Finalizar proposta ${prospect?.empresa ?? ""}`.trim(),
        contexto: `Sem atualização há ${dias} dia${dias === 1 ? "" : "s"}`,
        tom: dias >= 3 ? "alerta" : "atencao",
        cta: { label: "Abrir proposta", href: "/comercial/propostas" },
      } satisfies FocoItem;
    });

  const itensDeCampanha: FocoItem[] = campanhasAlerta.map((campanha) => ({
    id: `campanha-${campanha.id}`,
    titulo: campanha.nome,
    contexto: `CPL subiu — investimento de ${(campanha.metricas.investimentoCentavos / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })} com CTR de ${campanha.metricas.ctr}%`,
    tom: "alerta",
    cta: { label: "Analisar campanha", href: "/trafego/campanhas" },
  }));

  const focoItens = [...itensDeCampanha, ...itensDeProposta, ...itensDeTarefa]
    .sort((a, b) => Number(b.tom === "alerta") - Number(a.tom === "alerta"))
    .slice(0, 5);

  const hojeStr = AGORA_MOCK.toISOString().slice(0, 10);
  const tarefasHoje = tarefasTodas.filter((t) => t.prazo?.slice(0, 10) === hojeStr);
  const concluidasHoje = tarefasHoje.filter((t) => t.status === "concluido").length;

  // ---- KPIs compactos ----------------------------------------------------
  const seteDiasAtras = new Date(AGORA_MOCK.getTime() - 7 * 24 * 60 * 60 * 1000);
  const prospectsNovosSemana = prospectsTodos.filter((p) => new Date(p.criadoEm) >= seteDiasAtras).length;
  const receitaMensalCentavos = clientesAtivos.reduce((soma, c) => soma + c.mensalidadeTotal.valorCentavos, 0);

  const indicadores = [
    {
      label: "Prospects",
      valor: prospectsAtivos.length,
      contexto: prospectsNovosSemana > 0 ? `+${prospectsNovosSemana} esta semana` : "sem novos esta semana",
      tom: prospectsNovosSemana > 0 ? ("positivo" as const) : ("neutro" as const),
    },
    {
      label: "Clientes",
      valor: clientesAtivos.length,
      contexto: `${(receitaMensalCentavos / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}/mês`,
    },
    {
      label: "Pendências",
      valor: tarefasPendentes.length,
      contexto: `${tarefasAtrasadas.length} atrasada${tarefasAtrasadas.length === 1 ? "" : "s"}`,
      tom: tarefasAtrasadas.length > 0 ? ("alerta" as const) : ("neutro" as const),
    },
    {
      label: "Campanhas",
      valor: campanhasRodando.length,
      contexto: `${campanhasAlerta.length} em alerta`,
      tom: campanhasAlerta.length > 0 ? ("alerta" as const) : ("positivo" as const),
    },
  ];

  // ---- Pipeline comercial -------------------------------------------------
  const etapasPipeline = PROSPECT_PIPELINE.filter((s) => s !== "perdido").map((status) => ({
    label: LABEL_STATUS[status],
    quantidade: prospectsTodos.filter((p) => p.status === status).length,
  }));

  const valorEmNegociacaoCentavos = propostas
    .filter((p) => STATUS_PROPOSTA_ABERTA.has(p.status))
    .reduce((soma, p) => soma + p.valorTotalSetup.valorCentavos + p.valorTotalMensalidade.valorCentavos, 0);

  // ---- Performance de tráfego ----------------------------------------------
  const campanhasAtivas = campanhasTodas.filter((c) => c.status === "ativa" || c.status === "alerta");
  const investimentoTotal = campanhasAtivas.reduce((s, c) => s + c.metricas.investimentoCentavos, 0);
  const leadsTotal = campanhasAtivas.reduce((s, c) => s + c.metricas.leads, 0);
  const conversoesTotal = campanhasAtivas.reduce((s, c) => s + c.metricas.conversoes, 0);
  const cplMedio = leadsTotal > 0 ? Math.round(investimentoTotal / leadsTotal) : 0;
  const investimentoPorCanal = (["google_ads", "meta_ads"] as const).map((canal) => ({
    canal: canal === "google_ads" ? ("Google Ads" as const) : ("Meta Ads" as const),
    investimentoCentavos: campanhasAtivas.filter((c) => c.canal === canal).reduce((s, c) => s + c.metricas.investimentoCentavos, 0),
  }));

  // ---- Timeline de atividades ------------------------------------------------
  const contextoAtividades = {
    prospects: prospectsTodos,
    clientes: clientesAtivos,
    projetos,
    campanhas: campanhasTodas,
    propostas,
    tarefas: tarefasTodas,
  };
  const atividadesResolvidas = atividadesRecentes.map((atividade) => ({
    id: atividade.id,
    ocorridaEm: atividade.ocorridaEm,
    sujeito: resolveNomeEntidade(atividade, contextoAtividades),
    acao: atividade.descricao,
  }));

  return (
    <div className="flex flex-col gap-5 px-8 py-7">
      <GreetingBlock />

      <CompactKpiRow indicadores={indicadores} />

      <FocoHojeHero itens={focoItens} concluidas={concluidasHoje} totalHoje={tarefasHoje.length} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PipelineComercialCard etapas={etapasPipeline} valorEmNegociacaoCentavos={valorEmNegociacaoCentavos} />
        <PerformanceTrafegoCard
          investimentoCentavos={investimentoTotal}
          leads={leadsTotal}
          cplCentavos={cplMedio}
          conversoes={conversoesTotal}
          canais={investimentoPorCanal}
        />
      </div>

      <ActivityTimeline atividades={atividadesResolvidas} />
    </div>
  );
}
