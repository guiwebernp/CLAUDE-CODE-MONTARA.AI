import type { ContatoInfo, Endereco, Money, RefResumo } from "./common";
import type { ServicoWNP } from "./prospect";

export interface ServicoContratado {
  servico: ServicoWNP;
  mensalidade?: Money;
  ativoDesde: string;
}

export interface Cliente {
  id: string;
  prospectOrigemId?: string;
  empresa: string;
  segmento: string;
  contato: ContatoInfo;
  endereco: Endereco;
  servicosContratados: ServicoContratado[];
  mensalidadeTotal: Money;
  projetos: RefResumo[];
  ativo: boolean;
  observacoes?: string;
  criadoEm: string;
  atualizadoEm: string;
}
