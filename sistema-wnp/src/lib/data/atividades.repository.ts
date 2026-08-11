import { atividadesMock } from "@/lib/mock";
import type { Atividade } from "@/types";

export async function getAll(): Promise<Atividade[]> {
  return atividadesMock;
}

export async function getRecentes(limite = 6): Promise<Atividade[]> {
  return [...atividadesMock]
    .sort((a, b) => new Date(b.ocorridaEm).getTime() - new Date(a.ocorridaEm).getTime())
    .slice(0, limite);
}

export const atividadesRepository = { getAll, getRecentes };
