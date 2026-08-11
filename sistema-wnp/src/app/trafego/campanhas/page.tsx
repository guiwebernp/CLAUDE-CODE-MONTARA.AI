import { PageContainer } from "@/components/ui/PageContainer";
import { EmptyState } from "@/components/ui/EmptyState";

export default function CampanhasPage() {
  return (
    <PageContainer title="Campanhas" subtitle="Tráfego pago — Google Ads e Meta Ads dos clientes ativos.">
      <EmptyState
        titulo="Módulo em construção"
        descricao="Cards e tabelas de campanhas (investimento, CTR, CPL, ROAS) chegam na próxima fase."
      />
    </PageContainer>
  );
}
