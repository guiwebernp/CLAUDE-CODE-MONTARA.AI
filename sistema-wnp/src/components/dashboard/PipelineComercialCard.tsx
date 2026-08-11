import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatMoneyFromCentavos } from "@/lib/utils/format";

interface EtapaPipeline {
  label: string;
  quantidade: number;
}

interface PipelineComercialCardProps {
  etapas: EtapaPipeline[];
  valorEmNegociacaoCentavos: number;
}

export function PipelineComercialCard({ etapas, valorEmNegociacaoCentavos }: PipelineComercialCardProps) {
  const maxQuantidade = Math.max(1, ...etapas.map((e) => e.quantidade));

  return (
    <Card className="flex flex-col gap-4 p-5">
      <SectionHeader title="Pipeline comercial" />
      <ul className="flex flex-col gap-2.5">
        {etapas.map((etapa) => (
          <li key={etapa.label} className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-[13px] text-paper-300">{etapa.label}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-700">
              <div
                className="h-full rounded-full bg-mint-400"
                style={{ width: `${(etapa.quantidade / maxQuantidade) * 100}%` }}
              />
            </div>
            <span className="w-4 shrink-0 text-right text-[13px] font-semibold text-paper-0">
              {etapa.quantidade}
            </span>
          </li>
        ))}
      </ul>
      <p className="border-t border-ink-700 pt-3 text-[13px] text-paper-300">
        <span className="font-semibold text-mint-300">{formatMoneyFromCentavos(valorEmNegociacaoCentavos)}</span> em
        propostas ativas
      </p>
    </Card>
  );
}
