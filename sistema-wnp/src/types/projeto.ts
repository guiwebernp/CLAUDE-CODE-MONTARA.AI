import type { RefResumo } from "./common";

export type ProjetoStatus = "planejamento" | "em_andamento" | "pausado" | "concluido" | "cancelado";

export type TipoProjeto =
  | "novo_site"
  | "landing_page"
  | "google_ads"
  | "meta_ads"
  | "automacao_whatsapp"
  | "crm"
  | "seo";

export interface Projeto {
  id: string;
  nome: string;
  tipo: TipoProjeto;
  clienteId: string;
  responsavelId: string;
  status: ProjetoStatus;
  progresso: number;
  deadline?: string;
  tarefas: RefResumo[];
  arquivos: RefResumo[];
  criadoEm: string;
  atualizadoEm: string;
}
