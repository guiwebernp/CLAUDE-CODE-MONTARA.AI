import { campanhasRepository } from "@/lib/data/campanhas.repository";
import { clientesRepository } from "@/lib/data/clientes.repository";
import { PageContainer } from "@/components/ui/PageContainer";
import { CompactKpiRow } from "@/components/ui/CompactKpiRow";
import { CampanhasTable } from "@/components/trafego/CampanhasTable";
import { formatMoneyFromCentavos } from "@/lib/utils/format";

export default async function CampanhasPage() {
  const [campanhas, clientes] = await Promise.all([campanhasRepository.getAll(), clientesRepository.getAtivos()]);

  const ativas = campanhas.filter((c) => c.status === "ativa" || c.status === "alerta");
  const investimentoTotal = ativas.reduce((s, c) => s + c.metricas.investimentoCentavos, 0);
  const leadsTotal = ativas.reduce((s, c) => s + c.metricas.leads, 0);
  const conversoesTotal = ativas.reduce((s, c) => s + c.metricas.conversoes, 0);
  const cplMedio = leadsTotal > 0 ? Math.round(investimentoTotal / leadsTotal) : 0;
  const alertas = campanhas.filter((c) => c.status === "alerta").length;

  const indicadores = [
    { label: "Investimento ativo", valor: formatMoneyFromCentavos(investimentoTotal), contexto: `${ativas.length} campanha(s) rodando` },
    { label: "Leads", valor: leadsTotal, contexto: `${conversoesTotal} conversões` },
    { label: "CPL médio", valor: formatMoneyFromCentavos(cplMedio), contexto: "média ponderada" },
    {
      label: "Alertas",
      valor: alertas,
      contexto: alertas > 0 ? "precisam de atenção" : "tudo dentro do esperado",
      tom: alertas > 0 ? ("alerta" as const) : ("positivo" as const),
    },
  ];

  return (
    <PageContainer title="Campanhas" subtitle="Tráfego pago — Google Ads e Meta Ads dos clientes ativos.">
      <div className="flex flex-col gap-4">
        <CompactKpiRow indicadores={indicadores} />
        <CampanhasTable campanhas={campanhas} clientes={clientes} />
      </div>
    </PageContainer>
  );
}
