import { propostasMock } from "@/lib/mock";
import type { Proposta } from "@/types";

export async function getAll(): Promise<Proposta[]> {
  return propostasMock;
}

export async function getById(id: string): Promise<Proposta | undefined> {
  return propostasMock.find((p) => p.id === id);
}

export async function getByProspectId(prospectId: string): Promise<Proposta[]> {
  return propostasMock.filter((p) => p.prospectId === prospectId);
}

export const propostasRepository = { getAll, getById, getByProspectId };
