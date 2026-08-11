"use client";

import { usePathname } from "next/navigation";
import { NAV_TOPO, NAV_PILARES, NAV_RODAPE } from "./navConfig";

const TODOS_ITENS = [...NAV_TOPO, ...NAV_PILARES.flatMap((g) => g.items), ...NAV_RODAPE];

function tituloDaRota(pathname: string): string {
  const item = TODOS_ITENS.find((i) => pathname === i.href || pathname.startsWith(`${i.href}/`));
  if (item) return item.label;
  const ultimoSegmento = pathname.split("/").filter(Boolean).pop() ?? "";
  return ultimoSegmento.replace(/-/g, " ");
}

export function Topbar() {
  const pathname = usePathname();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-ink-700 px-8">
      <span className="text-sm font-semibold text-paper-0 capitalize">{tituloDaRota(pathname)}</span>
      <div className="flex items-center gap-2 rounded-full border border-ink-700 py-1 pr-3 pl-1">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint-400 text-[11px] font-bold text-ink-900">
          G
        </span>
        <span className="text-xs font-medium text-paper-300">Guilherme</span>
      </div>
    </header>
  );
}
