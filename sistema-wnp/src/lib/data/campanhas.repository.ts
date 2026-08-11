import { campanhasMock } from "@/lib/mock";
import type { Campanha } from "@/types";

export async function getAll(): Promise<Campanha[]> {
  return campanhasMock;
}

export async function getById(id: string): Promise<Campanha | undefined> {
  return campanhasMock.find((c) => c.id === id);
}

export async function getRodando(): Promise<Campanha[]> {
  return campanhasMock.filter((c) => c.status === "ativa" || c.status === "alerta");
}

export async function getComAlerta(): Promise<Campanha[]> {
  return campanhasMock.filter((c) => c.status === "alerta");
}

export const campanhasRepository = { getAll, getById, getRodando, getComAlerta };
