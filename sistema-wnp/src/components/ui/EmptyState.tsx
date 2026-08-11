import type { LucideIcon } from "lucide-react";
import { Construction } from "lucide-react";

interface EmptyStateProps {
  titulo: string;
  descricao?: string;
  icon?: LucideIcon;
}

export function EmptyState({ titulo, descricao, icon: Icon = Construction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border border-dashed border-ink-600 px-8 py-20 text-center">
      <Icon className="h-7 w-7 text-paper-500" strokeWidth={1.5} />
      <div>
        <p className="text-sm font-semibold text-paper-300">{titulo}</p>
        {descricao && <p className="mt-1 text-sm text-paper-500">{descricao}</p>}
      </div>
    </div>
  );
}
