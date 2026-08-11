import type { Atividade, Campanha, Cliente, Projeto, Proposta, Prospect, Tarefa } from "@/types";

interface Contexto {
  prospects: Prospect[];
  clientes: Cliente[];
  projetos: Projeto[];
  campanhas: Campanha[];
  propostas: Proposta[];
  tarefas: Tarefa[];
}

/** Resolve o "sujeito" (nome de exibição) de uma atividade a partir da entidade referenciada. */
export function resolveNomeEntidade(atividade: Atividade, ctx: Contexto): string {
  switch (atividade.entidadeTipo) {
    case "prospect":
      return ctx.prospects.find((p) => p.id === atividade.entidadeId)?.empresa ?? "Prospect";
    case "cliente":
      return ctx.clientes.find((c) => c.id === atividade.entidadeId)?.empresa ?? "Cliente";
    case "projeto":
      return ctx.projetos.find((p) => p.id === atividade.entidadeId)?.nome ?? "Projeto";
    case "campanha":
      return ctx.campanhas.find((c) => c.id === atividade.entidadeId)?.nome ?? "Campanha";
    case "tarefa":
      return ctx.tarefas.find((t) => t.id === atividade.entidadeId)?.titulo ?? "Tarefa";
    case "proposta": {
      const proposta = ctx.propostas.find((p) => p.id === atividade.entidadeId);
      const prospect = proposta && ctx.prospects.find((p) => p.id === proposta.prospectId);
      return prospect?.empresa ?? "Proposta";
    }
    default:
      return "";
  }
}
