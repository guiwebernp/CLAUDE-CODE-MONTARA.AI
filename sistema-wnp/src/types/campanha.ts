export type CanalCampanha = "google_ads" | "meta_ads";
export type CampanhaStatus = "ativa" | "pausada" | "encerrada" | "alerta";

export interface MetricasCampanha {
  investimentoCentavos: number;
  impressoes: number;
  cliques: number;
  ctr: number;
  cpcCentavos: number;
  leads: number;
  cplCentavos: number;
  conversoes: number;
  cpaCentavos: number;
  roas: number;
}

export interface Campanha {
  id: string;
  nome: string;
  canal: CanalCampanha;
  clienteId: string;
  status: CampanhaStatus;
  periodoInicio: string;
  periodoFim?: string;
  metricas: MetricasCampanha;
  criadaEm: string;
  atualizadaEm: string;
}
