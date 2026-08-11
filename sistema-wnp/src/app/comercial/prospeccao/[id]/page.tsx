import { PageContainer } from "@/components/ui/PageContainer";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function DossieProspectPage(props: PageProps<"/comercial/prospeccao/[id]">) {
  const { id } = await props.params;

  return (
    <PageContainer title="Dossiê do prospect" subtitle={`ID: ${id}`}>
      <EmptyState
        titulo="Módulo em construção"
        descricao="Dados da empresa, diagnóstico digital, oportunidades e gerador de abordagem chegam na próxima fase."
      />
    </PageContainer>
  );
}
