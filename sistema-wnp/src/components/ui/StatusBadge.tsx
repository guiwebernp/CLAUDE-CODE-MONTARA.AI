import { getStatusMeta, TOM_CLASSNAME, type StatusDominio } from "@/lib/utils/constants";
import { cn } from "@/lib/utils/cn";

interface StatusBadgeProps {
  dominio: StatusDominio;
  status: string;
  className?: string;
}

export function StatusBadge({ dominio, status, className }: StatusBadgeProps) {
  const meta = getStatusMeta(dominio, status);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap",
        TOM_CLASSNAME[meta.tom],
        className
      )}
    >
      {meta.label}
    </span>
  );
}
