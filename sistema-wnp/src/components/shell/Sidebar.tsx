"use client";

import { NAV_TOPO, NAV_PILARES, NAV_RODAPE } from "./navConfig";
import { SidebarNavItem } from "./SidebarNavItem";
import { SidebarNavGroup } from "./SidebarNavGroup";

export function Sidebar() {
  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-ink-700 bg-ink-900 px-3 py-5">
      <div className="mb-6 flex items-center gap-2 px-2.5">
        <span className="font-display text-lg font-bold text-mint-400">WNP</span>
        <span className="text-[10px] font-semibold tracking-[0.14em] text-paper-500 uppercase">Sistema</span>
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto">
        <div className="flex flex-col gap-0.5">
          {NAV_TOPO.map((item) => (
            <SidebarNavItem key={item.href} item={item} />
          ))}
        </div>

        <div className="flex flex-col gap-5">
          {NAV_PILARES.map((group) => (
            <SidebarNavGroup key={group.label} group={group} />
          ))}
        </div>
      </nav>

      <div className="flex flex-col gap-0.5 border-t border-ink-700 pt-3">
        {NAV_RODAPE.map((item) => (
          <SidebarNavItem key={item.href} item={item} />
        ))}
      </div>
    </aside>
  );
}
