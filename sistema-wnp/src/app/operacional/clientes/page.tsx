import { PageContainer } from "@/components/ui/PageContainer";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ClientesPage() {
  return (
    <PageContainer title="Clientes" subtitle="Clientes ativos da WNP — serviços contratados, projetos e histórico.">
      <EmptyState
        titulo="Módulo em construção"
        descricao="Lista e página de detalhe de cliente chegam na próxima fase."
      />
    </PageContainer>
  );
}
