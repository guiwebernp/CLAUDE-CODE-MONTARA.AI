import Link from "next/link";
import { formatMoneyFromCentavos } from "@/lib/utils/format";
import type { Cliente } from "@/types";

export function ClientesTable({ clientes }: { clientes: Cliente[] }) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-card)] border border-ink-700">
      <table className="w-full min-w-[640px] border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-ink-700 bg-ink-800 text-left text-[11px] font-semibold tracking-[0.04em] text-paper-500 uppercase">
            <th className="px-4 py-2.5 font-semibold">Cliente</th>
            <th className="px-4 py-2.5 font-semibold">Serviços</th>
            <th className="px-4 py-2.5 font-semibold">Mensalidade</th>
            <th className="px-4 py-2.5 font-semibold">Projetos</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-700">
          {clientes.map((cliente) => (
            <tr key={cliente.id} className="group transition-colors hover:bg-ink-750">
              <td className="px-4 py-3">
                <Link href={`/operacional/clientes/${cliente.id}`} className="block">
                  <span className="font-semibold text-paper-0 group-hover:text-mint-300">{cliente.empresa}</span>
                  <span className="block text-[12px] text-paper-500">
                    {cliente.segmento} · {cliente.endereco.cidade}
                  </span>
                </Link>
              </td>
              <td className="px-4 py-3 text-paper-300">{cliente.servicosContratados.length}</td>
              <td className="px-4 py-3 text-paper-300">
                {cliente.mensalidadeTotal.valorCentavos > 0
                  ? formatMoneyFromCentavos(cliente.mensalidadeTotal.valorCentavos)
                  : "—"}
              </td>
              <td className="px-4 py-3 text-paper-300">{cliente.projetos.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
