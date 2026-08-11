import Link from "next/link";
import { ArrowRight, AlertTriangle, Circle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";

export interface FocoItem {
  id: string;
  titulo: string;
  contexto: string;
  tom: "alerta" | "atencao" | "normal";
  cta: { label: string; href: string };
}

interface FocoHojeHeroProps {
  itens: FocoItem[];
  concluidas: number;
  totalHoje: number;
}

const TOM_ICON = {
  alerta: AlertTriangle,
  atencao: Circle,
  normal: Circle,
} as const;

const TOM_ICON_CLASS = {
  alerta: "text-coral-400",
  atencao: "text-mint-300",
  normal: "text-paper-500",
} as const;

export function FocoHojeHero({ itens, concluidas, totalHoje }: FocoHojeHeroProps) {
  return (
    <Card className="flex flex-col gap-1 p-0">
      <div className="flex items-center justify-between border-b border-ink-700 px-6 py-4">
        <h2 className="text-[13px] font-bold tracking-[0.08em] text-paper-0 uppercase">Foco de hoje</h2>
        <span className="text-xs font-semibold text-paper-500">
          {concluidas}/{totalHoje} concluídas hoje
        </span>
      </div>

      {itens.length === 0 ? (
        <p className="px-6 py-8 text-sm text-paper-500">Nada urgente por enquanto — bom sinal.</p>
      ) : (
        <ul className="divide-y divide-ink-700">
          {itens.map((item) => {
            const Icon = TOM_ICON[item.tom];
            return (
              <li key={item.id} className="flex items-start gap-3.5 px-6 py-4">
                <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", TOM_ICON_CLASS[item.tom])} strokeWidth={2} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-semibold text-paper-0">{item.titulo}</p>
                  <p className="mt-0.5 text-[13px] text-paper-500">{item.contexto}</p>
                </div>
                <Link
                  href={item.cta.href}
                  className="mt-0.5 flex shrink-0 items-center gap-1 text-[13px] font-semibold text-mint-400 hover:text-mint-300"
                >
                  {item.cta.label}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
