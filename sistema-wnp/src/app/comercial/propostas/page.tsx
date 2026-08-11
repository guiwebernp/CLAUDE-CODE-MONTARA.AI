import { propostasRepository } from "@/lib/data/propostas.repository";
import { prospectsRepository } from "@/lib/data/prospects.repository";
import { PageContainer } from "@/components/ui/PageContainer";
import { PropostasList, type PropostaComProspect } from "@/components/comercial/PropostasList";

export default async function PropostasPage() {
  const [propostas, prospects] = await Promise.all([propostasRepository.getAll(), prospectsRepository.getAll()]);

  const propostasComProspect: PropostaComProspect[] = propostas
    .map((proposta) => ({
      ...proposta,
      prospectNome: prospects.find((p) => p.id === proposta.prospectId)?.empresa ?? "Prospect",
    }))
    .sort((a, b) => new Date(b.atualizadaEm).getTime() - new Date(a.atualizadaEm).getTime());

  return (
    <PageContainer title="Propostas" subtitle="Propostas comerciais — de rascunho a aceita/recusada.">
      <PropostasList propostas={propostasComProspect} />
    </PageContainer>
  );
}
