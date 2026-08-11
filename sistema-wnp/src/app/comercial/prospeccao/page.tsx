import { PageContainer } from "@/components/ui/PageContainer";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ProspeccaoPage() {
  return (
    <PageContainer title="Prospecção" subtitle="Pipeline de prospects — de Novo a Ganho/Perdido.">
      <EmptyState
        titulo="Módulo em construção"
        descricao="Lista em tabela e kanban, com dossiê por prospect, chega na próxima fase."
      />
    </PageContainer>
  );
}
