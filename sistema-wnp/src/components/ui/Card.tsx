import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-ink-700 bg-ink-750 shadow-[var(--shadow-subtle)]",
        className
      )}
      {...props}
    />
  );
}
