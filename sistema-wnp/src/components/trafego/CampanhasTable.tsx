import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatMoneyFromCentavos } from "@/lib/utils/format";
import type { Campanha, Cliente } from "@/types";

const LABEL_CANAL: Record<string, string> = { google_ads: "Google Ads", meta_ads: "Meta Ads" };

export function CampanhasTable({ campanhas, clientes }: { campanhas: Campanha[]; clientes: Cliente[] }) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-card)] border border-ink-700">
      <table className="w-full min-w-[880px] border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-ink-700 bg-ink-800 text-left text-[11px] font-semibold tracking-[0.04em] text-paper-500 uppercase">
            <th className="px-4 py-2.5 font-semibold">Campanha</th>
            <th className="px-4 py-2.5 font-semibold">Cliente</th>
            <th className="px-4 py-2.5 font-semibold">Canal</th>
            <th className="px-4 py-2.5 font-semibold">Status</th>
            <th className="px-4 py-2.5 text-right font-semibold">Investimento</th>
            <th className="px-4 py-2.5 text-right font-semibold">Leads</th>
            <th className="px-4 py-2.5 text-right font-semibold">CPL</th>
            <th className="px-4 py-2.5 text-right font-semibold">ROAS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-700">
          {campanhas.map((campanha) => (
            <tr key={campanha.id} className="transition-colors hover:bg-ink-750">
              <td className="px-4 py-3 font-semibold text-paper-0">{campanha.nome}</td>
              <td className="px-4 py-3 text-paper-300">
                {clientes.find((c) => c.id === campanha.clienteId)?.empresa ?? "—"}
              </td>
              <td className="px-4 py-3 text-paper-300">{LABEL_CANAL[campanha.canal]}</td>
              <td className="px-4 py-3">
                <StatusBadge dominio="campanha" status={campanha.status} />
              </td>
              <td className="px-4 py-3 text-right text-paper-300">
                {formatMoneyFromCentavos(campanha.metricas.investimentoCentavos)}
              </td>
              <td className="px-4 py-3 text-right text-paper-300">{campanha.metricas.leads}</td>
              <td className="px-4 py-3 text-right text-paper-300">
                {formatMoneyFromCentavos(campanha.metricas.cplCentavos)}
              </td>
              <td className="px-4 py-3 text-right font-medium text-mint-300">{campanha.metricas.roas.toFixed(1)}x</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
