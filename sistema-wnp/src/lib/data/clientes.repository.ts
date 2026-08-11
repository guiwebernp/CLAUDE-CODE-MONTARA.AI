import { clientesMock } from "@/lib/mock";
import type { Cliente } from "@/types";

/**
 * Hoje lê de lib/mock. Quando o Supabase entrar (fase futura), só esta
 * implementação muda — componentes continuam chamando as mesmas funções.
 */
export async function getAll(): Promise<Cliente[]> {
  return clientesMock;
}

export async function getById(id: string): Promise<Cliente | undefined> {
  return clientesMock.find((c) => c.id === id);
}

export async function getAtivos(): Promise<Cliente[]> {
  return clientesMock.filter((c) => c.ativo);
}

export const clientesRepository = { getAll, getById, getAtivos };
