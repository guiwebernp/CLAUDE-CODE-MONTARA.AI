import type { Money } from "./common";
import type { ServicoWNP } from "./prospect";

export type PropostaStatus = "rascunho" | "enviada" | "visualizada" | "negociacao" | "aceita" | "recusada";

export interface ItemProposta {
  servico: ServicoWNP;
  setup?: Money;
  mensalidade?: Money;
}

export interface Proposta {
  id: string;
  prospectId: string;
  itens: ItemProposta[];
  valorTotalSetup: Money;
  valorTotalMensalidade: Money;
  prazoValidadeDias: number;
  status: PropostaStatus;
  observacoes?: string;
  enviadaEm?: string;
  criadaEm: string;
  atualizadaEm: string;
}
