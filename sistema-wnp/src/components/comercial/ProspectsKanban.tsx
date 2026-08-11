import { PROSPECT_PIPELINE, type Prospect } from "@/types";
import { ProspectCard } from "./ProspectCard";

const LABEL_STATUS: Record<string, string> = {
  novo: "Novo",
  pesquisando: "Pesquisando",
  qualificado: "Qualificado",
  contato_iniciado: "Contato iniciado",
  reuniao: "Reunião",
  proposta: "Proposta",
  negociacao: "Negociação",
  ganho: "Ganho",
  perdido: "Perdido",
};

export function ProspectsKanban({ prospects }: { prospects: Prospect[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {PROSPECT_PIPELINE.map((status) => {
        const itens = prospects.filter((p) => p.status === status);
        return (
          <div key={status} className="flex w-64 shrink-0 flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold tracking-[0.06em] text-paper-500 uppercase">
                {LABEL_STATUS[status]}
              </span>
              <span className="text-[11px] font-semibold text-paper-500">{itens.length}</span>
            </div>
            <div className="flex flex-col gap-2">
              {itens.map((prospect) => (
                <ProspectCard key={prospect.id} prospect={prospect} />
              ))}
              {itens.length === 0 && (
                <div className="rounded-[var(--radius-card)] border border-dashed border-ink-700 px-3 py-6 text-center text-[11px] text-paper-500">
                  Vazio
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
