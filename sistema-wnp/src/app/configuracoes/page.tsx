import { PageContainer } from "@/components/ui/PageContainer";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ConfiguracoesPage() {
  return (
    <PageContainer title="Configurações" subtitle="Preferências do sistema e integrações futuras.">
      <EmptyState
        titulo="Módulo em construção"
        descricao="Integrações (Google Ads, Meta Ads, WhatsApp, IA) e Supabase chegam em fases futuras."
      />
    </PageContainer>
  );
}
