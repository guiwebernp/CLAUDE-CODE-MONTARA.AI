import { prospectsRepository } from "@/lib/data/prospects.repository";
import { PageContainer } from "@/components/ui/PageContainer";
import { ProspectsView } from "@/components/comercial/ProspectsView";

export default async function ProspeccaoPage() {
  const prospects = await prospectsRepository.getAll();

  return (
    <PageContainer title="Prospecção" subtitle="Pipeline de prospects — de Novo a Ganho/Perdido.">
      <ProspectsView prospects={prospects} />
    </PageContainer>
  );
}
