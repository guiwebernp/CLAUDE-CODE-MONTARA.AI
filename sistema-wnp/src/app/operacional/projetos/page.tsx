import { PageContainer } from "@/components/ui/PageContainer";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ProjetosPage() {
  return (
    <PageContainer title="Projetos" subtitle="Projetos em andamento para os clientes da WNP.">
      <EmptyState
        titulo="Módulo em construção"
        descricao="Status, progresso, deadline e tarefas por projeto chegam na próxima fase."
      />
    </PageContainer>
  );
}
