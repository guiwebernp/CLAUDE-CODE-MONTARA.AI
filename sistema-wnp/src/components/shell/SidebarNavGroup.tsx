import type { NavGroup } from "./navConfig";
import { SidebarNavItem } from "./SidebarNavItem";

export function SidebarNavGroup({ group }: { group: NavGroup }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="px-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-paper-500">{group.label}</span>
      <div className="flex flex-col gap-0.5">
        {group.items.map((item) => (
          <SidebarNavItem key={item.href} item={item} />
        ))}
      </div>
    </div>
  );
}
