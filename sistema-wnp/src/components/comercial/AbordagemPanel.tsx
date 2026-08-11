"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { gerarAbordagem, type Abordagem } from "@/lib/ai/abordagem";
import type { Prospect } from "@/types";

const ABAS: { chave: keyof Abordagem; label: string }[] = [
  { chave: "whatsapp", label: "WhatsApp" },
  { chave: "email", label: "E-mail" },
  { chave: "ligacao", label: "Roteiro de ligação" },
  { chave: "instagram", label: "Instagram" },
  { chave: "followUp", label: "Follow-up" },
];

export function AbordagemPanel({ prospect }: { prospect: Prospect }) {
  const [abordagem, setAbordagem] = useState<Abordagem | null>(null);
  const [abaAtiva, setAbaAtiva] = useState<keyof Abordagem>("whatsapp");

  return (
    <Card className="flex flex-col gap-4 p-5">
      <SectionHeader
        title="Gerador de abordagem"
        action={
          !abordagem && (
            <Button variant="ghost" onClick={() => setAbordagem(gerarAbordagem(prospect))}>
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              Gerar abordagem
            </Button>
          )
        }
      />

      {!abordagem ? (
        <p className="text-sm text-paper-500">
          Gera mensagem de WhatsApp, e-mail, roteiro de ligação, mensagem de Instagram e follow-up usando o contexto
          deste prospect.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-1 rounded-[var(--radius-control)] border border-ink-700 bg-ink-800 p-0.5 self-start">
            {ABAS.map((aba) => (
              <button
                key={aba.chave}
                type="button"
                onClick={() => setAbaAtiva(aba.chave)}
                className={cn(
                  "rounded-[var(--radius-control)] px-2.5 py-1 text-[12px] font-semibold transition-colors",
                  abaAtiva === aba.chave ? "bg-mint-400 text-ink-900" : "text-paper-300 hover:text-paper-0"
                )}
              >
                {aba.label}
              </button>
            ))}
          </div>
          <p className="rounded-[var(--radius-control)] border border-ink-700 bg-ink-750 p-3.5 text-[13px] leading-relaxed whitespace-pre-line text-paper-300">
            {abordagem[abaAtiva]}
          </p>
        </div>
      )}
    </Card>
  );
}
