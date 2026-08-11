import { campanhasRepository } from "@/lib/data/campanhas.repository";
import { projetosRepository } from "@/lib/data/projetos.repository";
import { atividadesRepository } from "@/lib/data/atividades.repository";
import { buildFocoHoje } from "@/lib/foco/buildFocoHoje";
import { AGORA_MOCK } from "@/lib/mock/agora";
import { resolveNomeEntidade } from "@/lib/utils/atividade";
import { PROSPECT_PIPELINE, type ProspectStatus } from "@/types";
import { GreetingBlock } from "@/components/dashboard/GreetingBlock";
import { CompactKpiRow } from "@/components/ui/CompactKpiRow";
import { FocoHojeHero } from "@/components/dashboard/FocoHojeHero";
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
  const [foco, campanhasRodando, campanhasTodas, projetos, atividadesRecentes] = await Promise.all([
    buildFocoHoje(),
    campanhasRepository.getRodando(),
    campanhasRepository.getAll(),
    projetosRepository.getAll(),
    atividadesRepository.getRecentes(6),
  ]);

  const {
    focoItensCompleto,
    concluidasHoje,
    totalHoje,
    clientesAtivos,
    prospectsAtivos,
    prospectsTodos,
    tarefasPendentes,
    tarefasAtrasadas,
    tarefasTodas,
    campanhasAlerta,
    propostas,
  } = foco;

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
    investimentoCentavos: campanhasAtivas
      .filter((c) => c.canal === canal)
      .reduce((s, c) => s + c.metricas.investimentoCentavos, 0),
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

      <FocoHojeHero itens={focoItensCompleto.slice(0, 5)} concluidas={concluidasHoje} totalHoje={totalHoje} />

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
