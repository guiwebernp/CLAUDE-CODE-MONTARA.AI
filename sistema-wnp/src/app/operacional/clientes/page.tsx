import { clientesRepository } from "@/lib/data/clientes.repository";
import { PageContainer } from "@/components/ui/PageContainer";
import { ClientesTable } from "@/components/operacional/ClientesTable";

export default async function ClientesPage() {
  const clientes = await clientesRepository.getAtivos();

  return (
    <PageContainer title="Clientes" subtitle="Clientes ativos da WNP — serviços contratados, projetos e histórico.">
      <ClientesTable clientes={clientes} />
    </PageContainer>
  );
}
