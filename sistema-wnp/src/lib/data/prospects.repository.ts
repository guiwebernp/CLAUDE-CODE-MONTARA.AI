import { prospectsMock } from "@/lib/mock";
import type { Prospect } from "@/types";

const STATUS_ENCERRADOS = new Set(["ganho", "perdido"]);

export async function getAll(): Promise<Prospect[]> {
  return prospectsMock;
}

export async function getById(id: string): Promise<Prospect | undefined> {
  return prospectsMock.find((p) => p.id === id);
}

export async function getAtivos(): Promise<Prospect[]> {
  return prospectsMock.filter((p) => !STATUS_ENCERRADOS.has(p.status));
}

export const prospectsRepository = { getAll, getById, getAtivos };
