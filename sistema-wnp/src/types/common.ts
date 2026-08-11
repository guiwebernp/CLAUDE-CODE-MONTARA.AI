export type Pilar = "trafego" | "comercial" | "operacional";

export type Prioridade = "baixa" | "normal" | "alta" | "urgente";

/** Valor monetário em centavos — evita bugs de ponto flutuante. */
export interface Money {
  valorCentavos: number;
  moeda: "BRL";
}

export interface ContatoInfo {
  telefone?: string;
  whatsapp?: string;
  email?: string;
  site?: string;
  instagram?: string;
}

export interface Endereco {
  cidade: string;
  estado?: string;
}

/** Referência leve entre entidades — só o necessário para exibição rápida. */
export interface RefResumo {
  id: string;
  nome: string;
}
