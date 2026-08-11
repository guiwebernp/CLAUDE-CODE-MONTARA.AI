import type { ContatoInfo, Endereco } from "./common";

export type ProspectStatus =
  | "novo"
  | "pesquisando"
  | "qualificado"
  | "contato_iniciado"
  | "reuniao"
  | "proposta"
  | "negociacao"
  | "ganho"
  | "perdido";

export const PROSPECT_PIPELINE: ProspectStatus[] = [
  "novo",
  "pesquisando",
  "qualificado",
  "contato_iniciado",
  "reuniao",
  "proposta",
  "negociacao",
  "ganho",
  "perdido",
];

export type PotencialEstimado = "baixo" | "medio" | "alto";

export type ServicoWNP =
  | "criacao_site"
  | "google_ads"
  | "meta_ads"
  | "seo"
  | "automacao_comercial"
  | "crm"
  | "chatbot_ia";

export interface DiagnosticoDigital {
  gerado: boolean;
  geradoEm?: string;
  problemasEncontrados: string[];
  servicosRecomendados: ServicoWNP[];
}

export interface Prospect {
  id: string;
  empresa: string;
  segmento: string;
  responsavelId: string;
  contato: ContatoInfo;
  endereco: Endereco;
  origem: string;
  status: ProspectStatus;
  potencialEstimado: PotencialEstimado;
  ultimaInteracaoEm?: string;
  proximaAcao?: string;
  observacoes?: string;
  diagnostico?: DiagnosticoDigital;
  criadoEm: string;
  atualizadoEm: string;
}
