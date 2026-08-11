import { tarefasRepository } from "@/lib/data/tarefas.repository";
import { clientesRepository } from "@/lib/data/clientes.repository";
import { prospectsRepository } from "@/lib/data/prospects.repository";
import { projetosRepository } from "@/lib/data/projetos.repository";
import { campanhasRepository } from "@/lib/data/campanhas.repository";
import { PageContainer } from "@/components/ui/PageContainer";
import { TarefasBoard, type TarefaComRelacao } from "@/components/operacional/TarefasBoard";

export default async function TarefasPage() {
  const [tarefas, clientes, prospects, projetos, campanhas] = await Promise.all([
    tarefasRepository.getAll(),
    clientesRepository.getAtivos(),
    prospectsRepository.getAll(),
    projetosRepository.getAll(),
    campanhasRepository.getAll(),
  ]);

  const tarefasComRelacao: TarefaComRelacao[] = tarefas.map((tarefa) => {
    let relacao: string | undefined;
    if (tarefa.clienteId) relacao = clientes.find((c) => c.id === tarefa.clienteId)?.empresa;
    else if (tarefa.prospectId) relacao = prospects.find((p) => p.id === tarefa.prospectId)?.empresa;
    else if (tarefa.projetoId) relacao = projetos.find((p) => p.id === tarefa.projetoId)?.nome;
    else if (tarefa.campanhaId) relacao = campanhas.find((c) => c.id === tarefa.campanhaId)?.nome;
    return { ...tarefa, relacao };
  });

  return (
    <PageContainer title="Tarefas" subtitle="Todas as tarefas da WNP — clientes, prospects, projetos e campanhas.">
      <TarefasBoard tarefas={tarefasComRelacao} />
    </PageContainer>
  );
}
