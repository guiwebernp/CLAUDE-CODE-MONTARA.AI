import { projetosMock } from "@/lib/mock";
import type { Projeto } from "@/types";

export async function getAll(): Promise<Projeto[]> {
  return projetosMock;
}

export async function getById(id: string): Promise<Projeto | undefined> {
  return projetosMock.find((p) => p.id === id);
}

export async function getByClienteId(clienteId: string): Promise<Projeto[]> {
  return projetosMock.filter((p) => p.clienteId === clienteId);
}

export async function getEmAndamento(): Promise<Projeto[]> {
  return projetosMock.filter((p) => p.status === "em_andamento");
}

export const projetosRepository = { getAll, getById, getByClienteId, getEmAndamento };
