import { cn } from "@/lib/utils/cn";

interface Indicador {
  label: string;
  valor: string | number;
  contexto: string;
  tom?: "alerta" | "positivo" | "neutro";
}

const TOM_TEXT = {
  alerta: "text-coral-300",
  positivo: "text-mint-300",
  neutro: "text-paper-500",
} as const;

export function CompactKpiRow({ indicadores }: { indicadores: Indicador[] }) {
  return (
    <div className="grid grid-cols-2 divide-x divide-ink-700 rounded-[var(--radius-card)] border border-ink-700 bg-ink-750 lg:grid-cols-4">
      {indicadores.map((ind) => (
        <div key={ind.label} className="flex flex-col gap-1 px-5 py-4">
          <span className="font-display text-2xl leading-none font-semibold text-paper-0">{ind.valor}</span>
          <span className="text-[12px] font-medium text-paper-300">{ind.label}</span>
          <span className={cn("text-[11.5px]", TOM_TEXT[ind.tom ?? "neutro"])}>{ind.contexto}</span>
        </div>
      ))}
    </div>
  );
}
