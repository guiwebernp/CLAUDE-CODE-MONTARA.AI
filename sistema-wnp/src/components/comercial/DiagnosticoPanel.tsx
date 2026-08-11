"use client";

import { useState } from "react";
import { AlertTriangle, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { gerarDiagnostico } from "@/lib/ai/diagnostico";
import { LABEL_SERVICO } from "@/lib/utils/constants";
import type { DiagnosticoDigital, Prospect } from "@/types";

export function DiagnosticoPanel({ prospect }: { prospect: Prospect }) {
  const [diagnostico, setDiagnostico] = useState<DiagnosticoDigital | undefined>(prospect.diagnostico);
  const [gerando, setGerando] = useState(false);

  function handleGerar() {
    setGerando(true);
    setTimeout(() => {
      setDiagnostico(gerarDiagnostico(prospect));
      setGerando(false);
    }, 500);
  }

  return (
    <Card className="flex flex-col gap-4 p-5">
      <SectionHeader
        title="Diagnóstico digital"
        action={
          <Button variant="ghost" onClick={handleGerar} disabled={gerando}>
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            {diagnostico ? "Gerar novamente" : gerando ? "Gerando..." : "Gerar diagnóstico"}
          </Button>
        }
      />

      {!diagnostico ? (
        <p className="text-sm text-paper-500">
          Ainda não gerado. Clique em &quot;Gerar diagnóstico&quot; para analisar site, redes e presença digital
          deste prospect.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-2 text-[12px] font-semibold tracking-[0.04em] text-paper-500 uppercase">
              Problemas encontrados
            </p>
            <ul className="flex flex-col gap-1.5">
              {diagnostico.problemasEncontrados.map((problema) => (
                <li key={problema} className="flex items-start gap-2 text-[13px] text-paper-300">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-coral-400" strokeWidth={2} />
                  {problema}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 text-[12px] font-semibold tracking-[0.04em] text-paper-500 uppercase">
              Serviços recomendados
            </p>
            <div className="flex flex-wrap gap-1.5">
              {diagnostico.servicosRecomendados.map((servico) => (
                <span
                  key={servico}
                  className="rounded-full border border-mint-500/30 bg-mint-900/30 px-2.5 py-1 text-[12px] font-medium text-mint-300"
                >
                  {LABEL_SERVICO[servico] ?? servico}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
