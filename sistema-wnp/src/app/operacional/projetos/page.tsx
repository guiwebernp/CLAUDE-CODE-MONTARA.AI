import { projetosRepository } from "@/lib/data/projetos.repository";
import { clientesRepository } from "@/lib/data/clientes.repository";
import { PageContainer } from "@/components/ui/PageContainer";
import { ProjetosTable } from "@/components/operacional/ProjetosTable";

export default async function ProjetosPage() {
  const [projetos, clientes] = await Promise.all([projetosRepository.getAll(), clientesRepository.getAtivos()]);

  return (
    <PageContainer title="Projetos" subtitle="Projetos em andamento para os clientes da WNP.">
      <ProjetosTable projetos={projetos} clientes={clientes} />
    </PageContainer>
  );
}
