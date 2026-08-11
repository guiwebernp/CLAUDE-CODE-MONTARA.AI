import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { clientesRepository } from "@/lib/data/clientes.repository";
import { projetosRepository } from "@/lib/data/projetos.repository";
import { tarefasRepository } from "@/lib/data/tarefas.repository";
import { campanhasRepository } from "@/lib/data/campanhas.repository";
import { atividadesRepository } from "@/lib/data/atividades.repository";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { LABEL_SERVICO } from "@/lib/utils/constants";
import { formatMoneyFromCentavos, formatDataRelativa } from "@/lib/utils/format";

export default async function DetalheClientePage(props: PageProps<"/operacional/clientes/[id]">) {
  const { id } = await props.params;

  const cliente = await clientesRepository.getById(id);
  if (!cliente) notFound();

  const [projetos, tarefasTodas, campanhasTodas, atividadesTodas] = await Promise.all([
    projetosRepository.getByClienteId(id),
    tarefasRepository.getAll(),
    campanhasRepository.getAll(),
    atividadesRepository.getAll(),
  ]);

  const projetoIds = new Set(projetos.map((p) => p.id));
  const campanhas = campanhasTodas.filter((c) => c.clienteId === id);
  const campanhaIds = new Set(campanhas.map((c) => c.id));

  const tarefas = tarefasTodas.filter(
    (t) => t.clienteId === id || (t.projetoId && projetoIds.has(t.projetoId)) || (t.campanhaId && campanhaIds.has(t.campanhaId))
  );

  const historico = atividadesTodas
    .filter(
      (a) =>
        (a.entidadeTipo === "cliente" && a.entidadeId === id) ||
        (a.entidadeTipo === "projeto" && projetoIds.has(a.entidadeId)) ||
        (a.entidadeTipo === "campanha" && campanhaIds.has(a.entidadeId))
    )
    .sort((a, b) => new Date(b.ocorridaEm).getTime() - new Date(a.ocorridaEm).getTime());

  return (
    <div className="flex flex-col gap-5 px-8 py-7">
      <div>
        <Link
          href="/operacional/clientes"
          className="mb-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-paper-500 hover:text-paper-0"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
          Clientes
        </Link>
        <h1 className="text-xl font-semibold text-paper-0">{cliente.empresa}</h1>
        <p className="mt-1 text-sm text-paper-500">
          {cliente.segmento} · {cliente.endereco.cidade}
          {cliente.endereco.estado ? `/${cliente.endereco.estado}` : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="flex flex-col gap-3 p-5 lg:col-span-2">
          <SectionHeader title="Serviços contratados" />
          <ul className="flex flex-col gap-2">
            {cliente.servicosContratados.map((servico) => (
              <li key={servico.servico} className="flex items-center justify-between text-[13px]">
                <span className="text-paper-300">{LABEL_SERVICO[servico.servico] ?? servico.servico}</span>
                <span className="text-paper-500">
                  {servico.mensalidade ? `${formatMoneyFromCentavos(servico.mensalidade.valorCentavos)}/mês` : "Setup único"}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="flex flex-col gap-1 p-5">
          <span className="text-[12px] font-semibold tracking-[0.04em] text-paper-500 uppercase">
            Mensalidade total
          </span>
          <span className="font-display text-2xl font-semibold text-paper-0">
            {formatMoneyFromCentavos(cliente.mensalidadeTotal.valorCentavos)}
          </span>
        </Card>
      </div>

      <Card className="flex flex-col gap-3 p-5">
        <SectionHeader title="Projetos" />
        {projetos.length === 0 ? (
          <p className="text-sm text-paper-500">Nenhum projeto registrado.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {projetos.map((projeto) => (
              <li key={projeto.id} className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-paper-0">{projeto.nome}</p>
                  <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-ink-700">
                    <div className="h-full rounded-full bg-mint-400" style={{ width: `${projeto.progresso}%` }} />
                  </div>
                </div>
                <StatusBadge dominio="projeto" status={projeto.status} />
              </li>
            ))}
          </ul>
        )}
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="flex flex-col gap-3 p-5">
          <SectionHeader title="Tarefas" />
          {tarefas.length === 0 ? (
            <p className="text-sm text-paper-500">Nenhuma tarefa relacionada.</p>
          ) : (
            <ul className="flex flex-col gap-2.5">
              {tarefas.map((tarefa) => (
                <li key={tarefa.id} className="flex items-center justify-between gap-3 text-[13px]">
                  <span className="truncate text-paper-300">{tarefa.titulo}</span>
                  <StatusBadge dominio="tarefa" status={tarefa.status} />
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="flex flex-col gap-3 p-5">
          <SectionHeader title="Campanhas" />
          {campanhas.length === 0 ? (
            <p className="text-sm text-paper-500">Nenhuma campanha ativa.</p>
          ) : (
            <ul className="flex flex-col gap-2.5">
              {campanhas.map((campanha) => (
                <li key={campanha.id} className="flex items-center justify-between gap-3 text-[13px]">
                  <span className="truncate text-paper-300">{campanha.nome}</span>
                  <StatusBadge dominio="campanha" status={campanha.status} />
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="flex flex-col gap-3 p-5">
          <SectionHeader title="Histórico" />
          {historico.length === 0 ? (
            <p className="text-sm text-paper-500">Nenhuma atividade registrada ainda.</p>
          ) : (
            <ul className="flex flex-col gap-2.5">
              {historico.map((atividade) => (
                <li key={atividade.id} className="flex items-center justify-between gap-3 text-[13px]">
                  <span className="text-paper-300">{atividade.descricao}</span>
                  <span className="shrink-0 text-[12px] text-paper-500">
                    {formatDataRelativa(atividade.ocorridaEm)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="flex flex-col gap-3 p-5">
          <SectionHeader title="Observações" />
          <p className="text-[13px] text-paper-300">{cliente.observacoes ?? "Nenhuma observação registrada."}</p>
          <p className="border-t border-ink-700 pt-3 text-[12px] text-paper-500">
            Documentos e reuniões ainda não têm módulo próprio — chegam em fase futura.
          </p>
        </Card>
      </div>
    </div>
  );
}
