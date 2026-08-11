import { PageContainer } from "@/components/ui/PageContainer";
import { EmptyState } from "@/components/ui/EmptyState";

export default function TarefasPage() {
  return (
    <PageContainer title="Tarefas" subtitle="Todas as tarefas da WNP — clientes, prospects, projetos e campanhas.">
      <EmptyState
        titulo="Módulo em construção"
        descricao="Quadro completo por status e prioridade chega na próxima fase."
      />
    </PageContainer>
  );
}
