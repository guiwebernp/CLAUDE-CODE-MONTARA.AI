"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { LABEL_SERVICO } from "@/lib/utils/constants";
import { formatMoneyFromCentavos, formatDataCurta } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { Proposta } from "@/types";

export interface PropostaComProspect extends Proposta {
  prospectNome: string;
}

export function PropostasList({ propostas }: { propostas: PropostaComProspect[] }) {
  const [abertaId, setAbertaId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {propostas.map((proposta) => {
        const aberta = abertaId === proposta.id;
        return (
          <Card key={proposta.id} className="p-0">
            <button
              type="button"
              onClick={() => setAbertaId(aberta ? null : proposta.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <div className="min-w-0">
                <p className="truncate text-[13.5px] font-semibold text-paper-0">{proposta.prospectNome}</p>
                <p className="text-[12px] text-paper-500">
                  Criada em {formatDataCurta(proposta.criadaEm)} · válida {proposta.prazoValidadeDias} dias
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-[13px] font-semibold text-paper-0">
                  {formatMoneyFromCentavos(proposta.valorTotalSetup.valorCentavos)}
                  {proposta.valorTotalMensalidade.valorCentavos > 0 &&
                    ` + ${formatMoneyFromCentavos(proposta.valorTotalMensalidade.valorCentavos)}/mês`}
                </span>
                <StatusBadge dominio="proposta" status={proposta.status} />
                <ChevronDown
                  className={cn("h-4 w-4 text-paper-500 transition-transform", aberta && "rotate-180")}
                  strokeWidth={2}
                />
              </div>
            </button>

            {aberta && (
              <div className="border-t border-ink-700 px-5 py-4">
                <p className="mb-2 text-[12px] font-semibold tracking-[0.04em] text-paper-500 uppercase">
                  Itens da proposta
                </p>
                <ul className="flex flex-col gap-1.5">
                  {proposta.itens.map((item) => (
                    <li key={item.servico} className="flex items-center justify-between text-[13px] text-paper-300">
                      <span>{LABEL_SERVICO[item.servico] ?? item.servico}</span>
                      <span className="text-paper-500">
                        {item.setup && `Setup ${formatMoneyFromCentavos(item.setup.valorCentavos)}`}
                        {item.setup && item.mensalidade && " · "}
                        {item.mensalidade && `${formatMoneyFromCentavos(item.mensalidade.valorCentavos)}/mês`}
                      </span>
                    </li>
                  ))}
                </ul>
                {proposta.observacoes && (
                  <p className="mt-3 border-t border-ink-700 pt-3 text-[13px] text-paper-500">
                    {proposta.observacoes}
                  </p>
                )}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
