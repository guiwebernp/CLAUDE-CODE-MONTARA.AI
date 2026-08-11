// Assinatura isolada para trocar por uma LLM real na Fase J (ver MASTER_CONTEXT.md).
// Por enquanto, as "respostas" são derivadas diretamente do mock data via repositories.
import { clientesRepository } from "@/lib/data/clientes.repository";
import { prospectsRepository } from "@/lib/data/prospects.repository";
import { tarefasRepository } from "@/lib/data/tarefas.repository";
import { campanhasRepository } from "@/lib/data/campanhas.repository";
import { projetosRepository } from "@/lib/data/projetos.repository";
import { formatMoneyFromCentavos } from "@/lib/utils/format";
import { AGORA_MOCK } from "@/lib/mock/agora";
import type { SugestaoIA } from "@/components/shell/AiLauncherButton";

export async function getSugestoesIA(): Promise<SugestaoIA[]> {
  const [clientes, prospectsAtivos, tarefasAtrasadas, campanhasAlerta, projetos] = await Promise.all([
    clientesRepository.getAtivos(),
    prospectsRepository.getAtivos(),
    tarefasRepository.getAtrasadas(AGORA_MOCK),
    campanhasRepository.getComAlerta(),
    projetosRepository.getAll(),
  ]);

  return [
    respostaAtencaoHoje(tarefasAtrasadas.length, campanhasAlerta.map((c) => c.nome)),
    respostaProximoProspect(prospectsAtivos),
    respostaCampanhasRuins(campanhasAlerta),
    await respostaClientesComAtraso(tarefasAtrasadas, clientes, projetos, campanhasAlerta),
  ];
}

function respostaAtencaoHoje(qtdAtrasadas: number, nomesAlerta: string[]): SugestaoIA {
  const partes: string[] = [];
  if (qtdAtrasadas > 0) partes.push(`${qtdAtrasadas} tarefa(s) atrasada(s)`);
  if (nomesAlerta.length > 0) partes.push(`a campanha de ${nomesAlerta.join(" e ")} em alerta de performance`);

  const resposta =
    partes.length === 0
      ? "Nada urgente agora — nenhuma tarefa atrasada e nenhuma campanha em alerta."
      : `Hoje pede atenção: ${partes.join(" e ")}. Dá uma olhada no Foco de Hoje pra priorizar.`;

  return { pergunta: "O que precisa da minha atenção hoje?", resposta };
}

function respostaProximoProspect(prospectsAtivos: Awaited<ReturnType<typeof prospectsRepository.getAtivos>>): SugestaoIA {
  const ordenados = [...prospectsAtivos].sort((a, b) => {
    const potencialOrdem = { alto: 0, medio: 1, baixo: 2 } as const;
    return potencialOrdem[a.potencialEstimado] - potencialOrdem[b.potencialEstimado];
  });
  const primeiro = ordenados[0];

  const resposta = primeiro
    ? `${primeiro.empresa} — potencial ${primeiro.potencialEstimado}, status "${primeiro.status.replace(/_/g, " ")}"${
        primeiro.proximaAcao ? `. Próxima ação sugerida: ${primeiro.proximaAcao}.` : "."
      }`
    : "Nenhum prospect ativo no momento.";

  return { pergunta: "Qual prospect devo abordar primeiro?", resposta };
}

function respostaCampanhasRuins(campanhasAlerta: Awaited<ReturnType<typeof campanhasRepository.getComAlerta>>): SugestaoIA {
  const resposta =
    campanhasAlerta.length === 0
      ? "Nenhuma campanha em alerta no momento — performance dentro do esperado."
      : campanhasAlerta
          .map((c) => `${c.nome}: CPL de ${formatMoneyFromCentavos(c.metricas.cplCentavos)} e CTR de ${c.metricas.ctr}%`)
          .join(". ");

  return { pergunta: "Alguma campanha está performando mal?", resposta };
}

async function respostaClientesComAtraso(
  tarefasAtrasadas: Awaited<ReturnType<typeof tarefasRepository.getAtrasadas>>,
  clientes: Awaited<ReturnType<typeof clientesRepository.getAtivos>>,
  projetos: Awaited<ReturnType<typeof projetosRepository.getAll>>,
  campanhasAlerta: Awaited<ReturnType<typeof campanhasRepository.getComAlerta>>
): Promise<SugestaoIA> {
  const clienteIds = new Set<string>();

  for (const tarefa of tarefasAtrasadas) {
    if (tarefa.clienteId) clienteIds.add(tarefa.clienteId);
    if (tarefa.projetoId) {
      const projeto = projetos.find((p) => p.id === tarefa.projetoId);
      if (projeto) clienteIds.add(projeto.clienteId);
    }
    if (tarefa.campanhaId) {
      const campanha = campanhasAlerta.find((c) => c.id === tarefa.campanhaId);
      if (campanha) clienteIds.add(campanha.clienteId);
    }
  }

  const nomes = [...clienteIds].map((id) => clientes.find((c) => c.id === id)?.empresa).filter(Boolean);

  const resposta = nomes.length === 0 ? "Nenhum cliente com tarefa atrasada agora." : nomes.join(", ");

  return { pergunta: "Quais clientes possuem tarefas atrasadas?", resposta };
}
