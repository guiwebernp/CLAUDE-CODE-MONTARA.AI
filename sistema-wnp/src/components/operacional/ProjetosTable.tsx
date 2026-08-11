import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDataCurta } from "@/lib/utils/format";
import type { Cliente, Projeto } from "@/types";

const LABEL_TIPO: Record<string, string> = {
  novo_site: "Novo site",
  landing_page: "Landing page",
  google_ads: "Google Ads",
  meta_ads: "Meta Ads",
  automacao_whatsapp: "Automação WhatsApp",
  crm: "CRM",
  seo: "SEO",
};

export function ProjetosTable({ projetos, clientes }: { projetos: Projeto[]; clientes: Cliente[] }) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-card)] border border-ink-700">
      <table className="w-full min-w-[720px] border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-ink-700 bg-ink-800 text-left text-[11px] font-semibold tracking-[0.04em] text-paper-500 uppercase">
            <th className="px-4 py-2.5 font-semibold">Projeto</th>
            <th className="px-4 py-2.5 font-semibold">Cliente</th>
            <th className="px-4 py-2.5 font-semibold">Tipo</th>
            <th className="px-4 py-2.5 font-semibold">Progresso</th>
            <th className="px-4 py-2.5 font-semibold">Status</th>
            <th className="px-4 py-2.5 font-semibold">Deadline</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-700">
          {projetos.map((projeto) => {
            const cliente = clientes.find((c) => c.id === projeto.clienteId);
            return (
              <tr key={projeto.id} className="transition-colors hover:bg-ink-750">
                <td className="px-4 py-3 font-semibold text-paper-0">{projeto.nome}</td>
                <td className="px-4 py-3">
                  {cliente ? (
                    <Link href={`/operacional/clientes/${cliente.id}`} className="text-paper-300 hover:text-mint-300">
                      {cliente.empresa}
                    </Link>
                  ) : (
                    <span className="text-paper-500">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-paper-300">{LABEL_TIPO[projeto.tipo] ?? projeto.tipo}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-20 overflow-hidden rounded-full bg-ink-700">
                      <div className="h-full rounded-full bg-mint-400" style={{ width: `${projeto.progresso}%` }} />
                    </div>
                    <span className="text-[12px] text-paper-500">{projeto.progresso}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge dominio="projeto" status={projeto.status} />
                </td>
                <td className="px-4 py-3 text-paper-300">{projeto.deadline ? formatDataCurta(projeto.deadline) : "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
