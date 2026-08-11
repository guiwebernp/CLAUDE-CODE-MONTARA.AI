import type { Prioridade } from "./common";

export type TarefaStatus = "a_fazer" | "em_andamento" | "aguardando" | "concluido";

export interface Tarefa {
  id: string;
  titulo: string;
  descricao?: string;
  status: TarefaStatus;
  prioridade: Prioridade;
  responsavelId: string;
  prazo?: string;

  /** No máximo uma destas preenchida, por convenção — a tarefa pertence a uma única origem. */
  clienteId?: string;
  prospectId?: string;
  projetoId?: string;
  campanhaId?: string;

  criadaEm: string;
  atualizadaEm: string;
}
