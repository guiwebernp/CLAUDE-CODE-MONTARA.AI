import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatMoneyFromCentavos } from "@/lib/utils/format";

interface PerformanceTrafegoCardProps {
  investimentoCentavos: number;
  leads: number;
  cplCentavos: number;
  conversoes: number;
  canais: { canal: "Google Ads" | "Meta Ads"; investimentoCentavos: number }[];
}

export function PerformanceTrafegoCard({
  investimentoCentavos,
  leads,
  cplCentavos,
  conversoes,
  canais,
}: PerformanceTrafegoCardProps) {
  const totalCanais = Math.max(1, canais.reduce((soma, c) => soma + c.investimentoCentavos, 0));

  return (
    <Card className="flex flex-col gap-4 p-5">
      <SectionHeader title="Performance de tráfego" />

      <div className="grid grid-cols-2 gap-3">
        <Metric label="Investimento" valor={formatMoneyFromCentavos(investimentoCentavos)} />
        <Metric label="Leads" valor={leads} />
        <Metric label="CPL médio" valor={formatMoneyFromCentavos(cplCentavos)} />
        <Metric label="Conversões" valor={conversoes} />
      </div>

      <div className="flex flex-col gap-2 border-t border-ink-700 pt-3">
        {canais.map((c) => (
          <div key={c.canal} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-[12px] text-paper-300">{c.canal}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-700">
              <div
                className="h-full rounded-full bg-mint-400"
                style={{ width: `${(c.investimentoCentavos / totalCanais) * 100}%` }}
              />
            </div>
            <span className="w-16 shrink-0 text-right text-[12px] text-paper-500">
              {formatMoneyFromCentavos(c.investimentoCentavos)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Metric({ label, valor }: { label: string; valor: string | number }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-lg leading-none font-semibold text-paper-0">{valor}</span>
      <span className="mt-1 text-[11px] font-medium text-paper-500 uppercase">{label}</span>
    </div>
  );
}
