import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-control)] px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-mint-400 text-ink-900 hover:brightness-105",
        variant === "ghost" && "border border-ink-600 text-paper-300 hover:border-ink-500 hover:text-paper-0",
        className
      )}
      {...props}
    />
  );
}
