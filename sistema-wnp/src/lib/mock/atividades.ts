import type { Atividade } from "@/types";

/**
 * `descricao` é só a ação (ex.: "Proposta enviada") — o sujeito (nome da
 * empresa/entidade) é resolvido em runtime via `resolveNomeEntidade` a
 * partir de `entidadeTipo`/`entidadeId`, pra timeline ficar "HH:mm — Nome — Ação".
 */
export const atividadesMock: Atividade[] = [
  {
    id: "ativ-001",
    descricao: "Proposta enviada",
    entidadeTipo: "proposta",
    entidadeId: "prop-001",
    ocorridaEm: "2026-08-07T18:42:00.000Z",
  },
  {
    id: "ativ-002",
    descricao: "Campanha entrou em alerta",
    entidadeTipo: "campanha",
    entidadeId: "camp-002",
    ocorridaEm: "2026-08-09T17:31:00.000Z",
  },
  {
    id: "ativ-003",
    descricao: "Prospect avançou para Contato iniciado",
    entidadeTipo: "prospect",
    entidadeId: "pro-001",
    ocorridaEm: "2026-08-08T16:12:00.000Z",
  },
  {
    id: "ativ-004",
    descricao: "Novo prospect cadastrado",
    entidadeTipo: "prospect",
    entidadeId: "pro-004",
    ocorridaEm: "2026-08-09T09:00:00.000Z",
  },
  {
    id: "ativ-005",
    descricao: "Tarefa entrou em andamento",
    entidadeTipo: "tarefa",
    entidadeId: "tar-006",
    ocorridaEm: "2026-08-09T10:00:00.000Z",
  },
  {
    id: "ativ-006",
    descricao: "Projeto atualizado — 55% concluído",
    entidadeTipo: "projeto",
    entidadeId: "prj-008",
    ocorridaEm: "2026-08-09T10:00:00.000Z",
  },
  {
    id: "ativ-007",
    descricao: "Relatório de campanhas atualizado",
    entidadeTipo: "cliente",
    entidadeId: "cli-005",
    ocorridaEm: "2026-08-08T10:00:00.000Z",
  },
];
