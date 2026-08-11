import type { LucideIcon } from "lucide-react";
import { Card } from "./Card";
import { cn } from "@/lib/utils/cn";

interface KpiCardProps {
  label: string;
  valor: string | number;
  icon?: LucideIcon;
  delta?: { valor: string; positivo: boolean };
}

export function KpiCard({ label, valor, icon: Icon, delta }: KpiCardProps) {
  return (
    <Card className="flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-paper-500">{label}</span>
        {Icon && <Icon className="h-4 w-4 text-mint-400" strokeWidth={2} />}
      </div>
      <div className="flex items-end justify-between">
        <span className="font-display text-[28px] leading-none font-semibold text-paper-0">{valor}</span>
        {delta && (
          <span className={cn("text-xs font-semibold", delta.positivo ? "text-mint-300" : "text-coral-300")}>
            {delta.positivo ? "▲" : "▼"} {delta.valor}
          </span>
        )}
      </div>
    </Card>
  );
}
