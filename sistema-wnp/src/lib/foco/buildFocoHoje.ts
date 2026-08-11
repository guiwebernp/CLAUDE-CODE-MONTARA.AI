import { clientesRepository } from "@/lib/data/clientes.repository";
import { prospectsRepository } from "@/lib/data/prospects.repository";
import { tarefasRepository } from "@/lib/data/tarefas.repository";
import { campanhasRepository } from "@/lib/data/campanhas.repository";
import { propostasRepository } from "@/lib/data/propostas.repository";
import { AGORA_MOCK } from "@/lib/mock/agora";
import { diasDesde, formatDataCurta } from "@/lib/utils/format";
import type { FocoItem } from "@/components/dashboard/FocoHojeHero";

const STATUS_PROPOSTA_ABERTA = new Set(["enviada", "visualizada", "negociacao"]);

/** Núcleo do "Foco de hoje" — compartilhado entre a Visão Geral (prévia) e a página dedicada. */
export async function buildFocoHoje() {
  const [clientesAtivos, prospectsAtivos, prospectsTodos, tarefasPendentes, tarefasAtrasadas, tarefasTodas, campanhasAlerta, propostas] =
    await Promise.all([
      clientesRepository.getAtivos(),
      prospectsRepository.getAtivos(),
      prospectsRepository.getAll(),
      tarefasRepository.getPendentes(),
      tarefasRepository.getAtrasadas(AGORA_MOCK),
      tarefasRepository.getAll(),
      campanhasRepository.getComAlerta(),
      propostasRepository.getAll(),
    ]);

  const idsAtrasadas = new Set(tarefasAtrasadas.map((t) => t.id));

  const itensDeTarefa: FocoItem[] = tarefasPendentes
    .filter((t) => idsAtrasadas.has(t.id) || t.prioridade === "urgente" || t.prioridade === "alta")
    .sort((a, b) => Number(idsAtrasadas.has(b.id)) - Number(idsAtrasadas.has(a.id)))
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

  const focoItensCompleto = [...itensDeCampanha, ...itensDeProposta, ...itensDeTarefa].sort(
    (a, b) => Number(b.tom === "alerta") - Number(a.tom === "alerta")
  );

  const hojeStr = AGORA_MOCK.toISOString().slice(0, 10);
  const tarefasHoje = tarefasTodas.filter((t) => t.prazo?.slice(0, 10) === hojeStr);
  const concluidasHoje = tarefasHoje.filter((t) => t.status === "concluido").length;

  return {
    focoItensCompleto,
    concluidasHoje,
    totalHoje: tarefasHoje.length,
    clientesAtivos,
    prospectsAtivos,
    prospectsTodos,
    tarefasPendentes,
    tarefasAtrasadas,
    tarefasTodas,
    campanhasAlerta,
    propostas,
  };
}
