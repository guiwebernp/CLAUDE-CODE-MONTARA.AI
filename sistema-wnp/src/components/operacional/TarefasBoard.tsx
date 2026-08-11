import { PRIORIDADE_META } from "@/lib/utils/constants";
import { formatDataCurta } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { Tarefa, TarefaStatus } from "@/types";

const COLUNAS: { status: TarefaStatus; label: string }[] = [
  { status: "a_fazer", label: "A fazer" },
  { status: "em_andamento", label: "Em andamento" },
  { status: "aguardando", label: "Aguardando" },
  { status: "concluido", label: "Concluído" },
];

const PRIORIDADE_DOT: Record<string, string> = {
  neutro: "bg-paper-500",
  progresso: "bg-mint-400",
  positivo: "bg-mint-400",
  negativo: "bg-coral-400",
  alerta: "bg-coral-400",
};

export interface TarefaComRelacao extends Tarefa {
  relacao?: string;
}

export function TarefasBoard({ tarefas }: { tarefas: TarefaComRelacao[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      {COLUNAS.map((coluna) => {
        const itens = tarefas.filter((t) => t.status === coluna.status);
        return (
          <div key={coluna.status} className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold tracking-[0.06em] text-paper-500 uppercase">
                {coluna.label}
              </span>
              <span className="text-[11px] font-semibold text-paper-500">{itens.length}</span>
            </div>
            <div className="flex flex-col gap-2">
              {itens.map((tarefa) => {
                const prioridade = PRIORIDADE_META[tarefa.prioridade];
                return (
                  <div
                    key={tarefa.id}
                    className="flex flex-col gap-1.5 rounded-[var(--radius-card)] border border-ink-700 bg-ink-750 p-3"
                  >
                    <div className="flex items-start gap-2">
                      <span className={cn("mt-1 h-1.5 w-1.5 shrink-0 rounded-full", PRIORIDADE_DOT[prioridade.tom])} />
                      <p className="text-[12.5px] font-medium text-paper-0">{tarefa.titulo}</p>
                    </div>
                    {tarefa.relacao && <p className="text-[11.5px] text-paper-500">{tarefa.relacao}</p>}
                    {tarefa.prazo && <p className="text-[11px] text-paper-500">Prazo {formatDataCurta(tarefa.prazo)}</p>}
                  </div>
                );
              })}
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
