"use client";

import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface SugestaoIA {
  pergunta: string;
  resposta: string;
}

export function AiLauncherButton({ sugestoes }: { sugestoes: SugestaoIA[] }) {
  const [aberto, setAberto] = useState(false);
  const [selecionada, setSelecionada] = useState<SugestaoIA | null>(null);

  return (
    <div className="fixed right-6 bottom-6 z-40 flex flex-col items-end gap-3">
      {aberto && (
        <div className="flex w-80 flex-col gap-3 rounded-[var(--radius-card)] border border-ink-600 bg-ink-800 p-4 shadow-[var(--shadow-elevated)]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[13px] font-semibold text-paper-0">
              <Sparkles className="h-3.5 w-3.5 text-mint-400" strokeWidth={2} />
              Pergunte à WNP
            </span>
            <button
              type="button"
              onClick={() => setAberto(false)}
              aria-label="Fechar"
              className="text-paper-500 hover:text-paper-0"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          {selecionada ? (
            <div className="flex flex-col gap-2">
              <p className="text-[13px] font-semibold text-paper-300">{selecionada.pergunta}</p>
              <p className="rounded-[var(--radius-control)] border border-ink-700 bg-ink-750 p-3 text-[13px] leading-relaxed text-paper-300">
                {selecionada.resposta}
              </p>
              <button
                type="button"
                onClick={() => setSelecionada(null)}
                className="self-start text-[12px] font-semibold text-mint-400 hover:text-mint-300"
              >
                ← Ver outras perguntas
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {sugestoes.map((s) => (
                <button
                  key={s.pergunta}
                  type="button"
                  onClick={() => setSelecionada(s)}
                  className="rounded-[var(--radius-control)] border border-ink-700 px-3 py-2 text-left text-[12.5px] text-paper-300 transition-colors hover:border-mint-500/40 hover:bg-ink-750"
                >
                  {s.pergunta}
                </button>
              ))}
            </div>
          )}

          <input
            type="text"
            disabled
            placeholder="Pergunte algo — em breve"
            className="w-full rounded-[var(--radius-control)] border border-ink-700 bg-ink-900 px-3 py-2 text-[12.5px] text-paper-500 placeholder:text-paper-500"
          />
        </div>
      )}

      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-label="Central de IA"
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full border shadow-[var(--shadow-elevated)] transition-colors",
          aberto
            ? "border-mint-400 bg-mint-400 text-ink-900"
            : "border-ink-600 bg-ink-750 text-mint-400 hover:border-mint-500/40"
        )}
      >
        <Sparkles className="h-5 w-5" strokeWidth={1.75} />
      </button>
    </div>
  );
}
