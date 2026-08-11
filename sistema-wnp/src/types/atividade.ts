export type EntidadeTipo = "prospect" | "cliente" | "projeto" | "tarefa" | "campanha" | "proposta";

export interface Atividade {
  id: string;
  descricao: string;
  entidadeTipo: EntidadeTipo;
  entidadeId: string;
  ocorridaEm: string;
}
