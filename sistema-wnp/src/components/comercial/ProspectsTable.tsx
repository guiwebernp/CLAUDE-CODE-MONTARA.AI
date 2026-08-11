import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDataRelativa } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { Prospect } from "@/types";

const POTENCIAL_LABEL: Record<Prospect["potencialEstimado"], string> = {
  alto: "Alto",
  medio: "Médio",
  baixo: "Baixo",
};

const POTENCIAL_CLASS: Record<Prospect["potencialEstimado"], string> = {
  alto: "text-mint-300",
  medio: "text-paper-300",
  baixo: "text-paper-500",
};

export function ProspectsTable({ prospects }: { prospects: Prospect[] }) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-card)] border border-ink-700">
      <table className="w-full min-w-[720px] border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-ink-700 bg-ink-800 text-left text-[11px] font-semibold tracking-[0.04em] text-paper-500 uppercase">
            <th className="px-4 py-2.5 font-semibold">Empresa</th>
            <th className="px-4 py-2.5 font-semibold">Status</th>
            <th className="px-4 py-2.5 font-semibold">Potencial</th>
            <th className="px-4 py-2.5 font-semibold">Última interação</th>
            <th className="px-4 py-2.5 font-semibold">Próxima ação</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-700">
          {prospects.map((prospect) => (
            <tr key={prospect.id} className="group transition-colors hover:bg-ink-750">
              <td className="px-4 py-3">
                <Link href={`/comercial/prospeccao/${prospect.id}`} className="block">
                  <span className="font-semibold text-paper-0 group-hover:text-mint-300">{prospect.empresa}</span>
                  <span className="block text-[12px] text-paper-500">
                    {prospect.segmento} · {prospect.endereco.cidade}
                  </span>
                </Link>
              </td>
              <td className="px-4 py-3">
                <StatusBadge dominio="pipeline" status={prospect.status} />
              </td>
              <td className={cn("px-4 py-3 font-medium", POTENCIAL_CLASS[prospect.potencialEstimado])}>
                {POTENCIAL_LABEL[prospect.potencialEstimado]}
              </td>
              <td className="px-4 py-3 text-paper-300">
                {prospect.ultimaInteracaoEm ? formatDataRelativa(prospect.ultimaInteracaoEm) : "—"}
              </td>
              <td className="max-w-64 truncate px-4 py-3 text-paper-300">{prospect.proximaAcao ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
