import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatHora } from "@/lib/utils/format";

export interface AtividadeResolvida {
  id: string;
  ocorridaEm: string;
  sujeito: string;
  acao: string;
}

export function ActivityTimeline({ atividades }: { atividades: AtividadeResolvida[] }) {
  return (
    <div>
      <SectionHeader title="Atividade recente" />
      {atividades.length === 0 ? (
        <p className="text-sm text-paper-500">Nenhuma atividade recente.</p>
      ) : (
        <ul className="flex flex-col">
          {atividades.map((atividade) => (
            <li
              key={atividade.id}
              className="flex items-center gap-4 border-t border-ink-700 py-2.5 text-[13px] first:border-t-0"
            >
              <span className="w-12 shrink-0 font-mono text-[12px] text-paper-500">
                {formatHora(atividade.ocorridaEm)}
              </span>
              <span className="w-44 shrink-0 truncate font-semibold text-paper-0">{atividade.sujeito}</span>
              <span className="truncate text-paper-300">{atividade.acao}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
