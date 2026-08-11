import type { CampanhaStatus } from "@/types/campanha";
import type { ProjetoStatus } from "@/types/projeto";
import type { ProspectStatus } from "@/types/prospect";
import type { PropostaStatus } from "@/types/proposta";
import type { TarefaStatus } from "@/types/tarefa";

export type StatusDominio = "pipeline" | "tarefa" | "proposta" | "projeto" | "campanha";

export type StatusTom = "neutro" | "progresso" | "positivo" | "negativo" | "alerta";

export const TOM_CLASSNAME: Record<StatusTom, string> = {
  neutro: "bg-ink-700 text-paper-300 border-ink-600",
  progresso: "bg-mint-900/40 text-mint-300 border-mint-500/30",
  positivo: "bg-mint-500/15 text-mint-300 border-mint-500/40",
  negativo: "bg-coral-500/15 text-coral-300 border-coral-600/40",
  alerta: "bg-coral-500/10 text-coral-400 border-coral-600/30",
};

interface StatusMeta {
  label: string;
  tom: StatusTom;
}

const PIPELINE_STATUS: Record<ProspectStatus, StatusMeta> = {
  novo: { label: "Novo", tom: "neutro" },
  pesquisando: { label: "Pesquisando", tom: "neutro" },
  qualificado: { label: "Qualificado", tom: "progresso" },
  contato_iniciado: { label: "Contato iniciado", tom: "progresso" },
  reuniao: { label: "Reunião", tom: "progresso" },
  proposta: { label: "Proposta", tom: "progresso" },
  negociacao: { label: "Negociação", tom: "progresso" },
  ganho: { label: "Ganho", tom: "positivo" },
  perdido: { label: "Perdido", tom: "negativo" },
};

const TAREFA_STATUS: Record<TarefaStatus, StatusMeta> = {
  a_fazer: { label: "A fazer", tom: "neutro" },
  em_andamento: { label: "Em andamento", tom: "progresso" },
  aguardando: { label: "Aguardando", tom: "alerta" },
  concluido: { label: "Concluído", tom: "positivo" },
};

const PROPOSTA_STATUS: Record<PropostaStatus, StatusMeta> = {
  rascunho: { label: "Rascunho", tom: "neutro" },
  enviada: { label: "Enviada", tom: "progresso" },
  visualizada: { label: "Visualizada", tom: "progresso" },
  negociacao: { label: "Negociação", tom: "progresso" },
  aceita: { label: "Aceita", tom: "positivo" },
  recusada: { label: "Recusada", tom: "negativo" },
};

const PROJETO_STATUS: Record<ProjetoStatus, StatusMeta> = {
  planejamento: { label: "Planejamento", tom: "neutro" },
  em_andamento: { label: "Em andamento", tom: "progresso" },
  pausado: { label: "Pausado", tom: "alerta" },
  concluido: { label: "Concluído", tom: "positivo" },
  cancelado: { label: "Cancelado", tom: "negativo" },
};

const CAMPANHA_STATUS: Record<CampanhaStatus, StatusMeta> = {
  ativa: { label: "Ativa", tom: "positivo" },
  pausada: { label: "Pausada", tom: "neutro" },
  encerrada: { label: "Encerrada", tom: "neutro" },
  alerta: { label: "Alerta", tom: "alerta" },
};

const STATUS_POR_DOMINIO: Record<StatusDominio, Record<string, StatusMeta>> = {
  pipeline: PIPELINE_STATUS,
  tarefa: TAREFA_STATUS,
  proposta: PROPOSTA_STATUS,
  projeto: PROJETO_STATUS,
  campanha: CAMPANHA_STATUS,
};

export function getStatusMeta(dominio: StatusDominio, status: string): StatusMeta {
  return STATUS_POR_DOMINIO[dominio][status] ?? { label: status, tom: "neutro" };
}

export const LABEL_SERVICO: Record<string, string> = {
  criacao_site: "Criação de site",
  google_ads: "Google Ads",
  meta_ads: "Meta Ads",
  seo: "SEO",
  automacao_comercial: "Automação comercial",
  crm: "CRM",
  chatbot_ia: "Chatbot IA",
};

export const PRIORIDADE_META: Record<string, StatusMeta> = {
  baixa: { label: "Baixa", tom: "neutro" },
  normal: { label: "Normal", tom: "progresso" },
  alta: { label: "Alta", tom: "alerta" },
  urgente: { label: "Urgente", tom: "negativo" },
};
