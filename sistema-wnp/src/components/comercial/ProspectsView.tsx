"use client";

import { useState } from "react";
import { List, Kanban } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ProspectsTable } from "./ProspectsTable";
import { ProspectsKanban } from "./ProspectsKanban";
import type { Prospect } from "@/types";

type Visao = "tabela" | "kanban";

export function ProspectsView({ prospects }: { prospects: Prospect[] }) {
  const [visao, setVisao] = useState<Visao>("kanban");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1 self-start rounded-[var(--radius-control)] border border-ink-700 bg-ink-800 p-0.5">
        <ToggleButton ativo={visao === "kanban"} onClick={() => setVisao("kanban")} icon={Kanban} label="Kanban" />
        <ToggleButton ativo={visao === "tabela"} onClick={() => setVisao("tabela")} icon={List} label="Tabela" />
      </div>

      {visao === "kanban" ? <ProspectsKanban prospects={prospects} /> : <ProspectsTable prospects={prospects} />}
    </div>
  );
}

function ToggleButton({
  ativo,
  onClick,
  icon: Icon,
  label,
}: {
  ativo: boolean;
  onClick: () => void;
  icon: typeof List;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-[var(--radius-control)] px-3 py-1.5 text-[12.5px] font-semibold transition-colors",
        ativo ? "bg-mint-400 text-ink-900" : "text-paper-300 hover:text-paper-0"
      )}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
      {label}
    </button>
  );
}
