/**
 * Data de referência usada pelos cálculos de "hoje"/"atrasado" enquanto os dados são mock.
 * Os prazos em lib/mock foram escritos em torno de 2026-08-10 — usar o relógio real do
 * sistema faria "tarefas de hoje"/"atrasadas" ficarem incoerentes assim que o dia virar.
 * Quando o Supabase entrar (dados reais), os call sites voltam a usar `new Date()`.
 */
export const AGORA_MOCK = new Date("2026-08-10T20:00:00.000Z");
