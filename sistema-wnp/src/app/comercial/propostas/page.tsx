import { PageContainer } from "@/components/ui/PageContainer";
import { EmptyState } from "@/components/ui/EmptyState";

export default function PropostasPage() {
  return (
    <PageContainer title="Propostas" subtitle="Propostas comerciais — de rascunho a aceita/recusada.">
      <EmptyState
        titulo="Módulo em construção"
        descricao="Criação de proposta com preview profissional chega na próxima fase."
      />
    </PageContainer>
  );
}
