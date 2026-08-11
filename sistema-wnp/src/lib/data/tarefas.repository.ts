import { tarefasMock } from "@/lib/mock";
import type { Tarefa } from "@/types";

export async function getAll(): Promise<Tarefa[]> {
  return tarefasMock;
}

export async function getById(id: string): Promise<Tarefa | undefined> {
  return tarefasMock.find((t) => t.id === id);
}

export async function getPendentes(): Promise<Tarefa[]> {
  return tarefasMock.filter((t) => t.status !== "concluido");
}

export async function getAtrasadas(referencia: Date = new Date()): Promise<Tarefa[]> {
  return tarefasMock.filter((t) => t.status !== "concluido" && t.prazo && new Date(t.prazo) < referencia);
}

export const tarefasRepository = { getAll, getById, getPendentes, getAtrasadas };
