import { PageContainer } from "@/components/ui/PageContainer";
import { EmptyState } from "@/components/ui/EmptyState";

export default function FocoDoDiaPage() {
  return (
    <PageContainer title="Foco do Dia" subtitle="Central operacional matinal — prioridades, prospects, clientes e alertas do dia.">
      <EmptyState
        titulo="Módulo em construção"
        descricao="A versão completa do Foco do Dia chega na próxima fase — por enquanto, veja o resumo na Visão Geral."
      />
    </PageContainer>
  );
}
