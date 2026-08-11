import { PageContainer } from "@/components/ui/PageContainer";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function DetalheClientePage(props: PageProps<"/operacional/clientes/[id]">) {
  const { id } = await props.params;

  return (
    <PageContainer title="Cliente" subtitle={`ID: ${id}`}>
      <EmptyState
        titulo="Módulo em construção"
        descricao="Serviços contratados, projetos, tarefas, campanhas e histórico chegam na próxima fase."
      />
    </PageContainer>
  );
}
