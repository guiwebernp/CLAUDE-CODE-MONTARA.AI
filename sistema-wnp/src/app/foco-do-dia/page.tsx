import Link from "next/link";
import { projetosRepository } from "@/lib/data/projetos.repository";
import { buildFocoHoje } from "@/lib/foco/buildFocoHoje";
import { PageContainer } from "@/components/ui/PageContainer";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FocoHojeHero } from "@/components/dashboard/FocoHojeHero";
import { formatDataRelativa } from "@/lib/utils/format";

export default async function FocoDoDiaPage() {
  const foco = await buildFocoHoje();
  const {
    focoItensCompleto,
    concluidasHoje,
    totalHoje,
    prospectsAtivos,
    tarefasAtrasadas,
    campanhasAlerta,
    propostas,
    clientesAtivos,
  } = foco;

  const projetos = await projetosRepository.getAll();

  const prospectsParaHoje = prospectsAtivos
    .filter((p) => p.proximaAcao)
    .sort((a, b) => {
      const ordem = { alto: 0, medio: 1, baixo: 2 } as const;
      return ordem[a.potencialEstimado] - ordem[b.potencialEstimado];
    })
    .slice(0, 5);

  const clienteIdsComAtraso = new Set<string>();
  for (const tarefa of tarefasAtrasadas) {
    if (tarefa.clienteId) clienteIdsComAtraso.add(tarefa.clienteId);
    if (tarefa.projetoId) {
      const projeto = projetos.find((p) => p.id === tarefa.projetoId);
      if (projeto) clienteIdsComAtraso.add(projeto.clienteId);
    }
    if (tarefa.campanhaId) {
      const campanha = campanhasAlerta.find((c) => c.id === tarefa.campanhaId);
      if (campanha) clienteIdsComAtraso.add(campanha.clienteId);
    }
  }
  for (const campanha of campanhasAlerta) clienteIdsComAtraso.add(campanha.clienteId);
  const clientesComAtencao = clientesAtivos.filter((c) => clienteIdsComAtraso.has(c.id));

  const oportunidades = propostas.filter((p) => p.status === "rascunho" || p.status === "negociacao");

  return (
    <PageContainer title="Foco do Dia" subtitle="Central operacional matinal — prioridades, prospects, clientes e alertas do dia.">
      <div className="flex flex-col gap-4">
        <FocoHojeHero itens={focoItensCompleto} concluidas={concluidasHoje} totalHoje={totalHoje} />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card className="flex flex-col gap-3 p-5">
            <SectionHeader title="Prospects para hoje" />
            {prospectsParaHoje.length === 0 ? (
              <p className="text-sm text-paper-500">Nenhum prospect com próxima ação definida.</p>
            ) : (
              <ul className="flex flex-col gap-2.5">
                {prospectsParaHoje.map((prospect) => (
                  <li key={prospect.id}>
                    <Link
                      href={`/comercial/prospeccao/${prospect.id}`}
                      className="flex items-center justify-between gap-3 text-[13px] hover:text-mint-300"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-paper-0">{prospect.empresa}</span>
                        <span className="block truncate text-[12px] text-paper-500">{prospect.proximaAcao}</span>
                      </span>
                      <StatusBadge dominio="pipeline" status={prospect.status} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="flex flex-col gap-3 p-5">
            <SectionHeader title="Clientes que precisam de atenção" />
            {clientesComAtencao.length === 0 ? (
              <p className="text-sm text-paper-500">Nenhum cliente com pendência crítica agora.</p>
            ) : (
              <ul className="flex flex-col gap-2.5">
                {clientesComAtencao.map((cliente) => (
                  <li key={cliente.id}>
                    <Link
                      href={`/operacional/clientes/${cliente.id}`}
                      className="flex items-center justify-between text-[13px] text-paper-300 hover:text-mint-300"
                    >
                      <span className="font-medium text-paper-0">{cliente.empresa}</span>
                      <span className="text-[12px] text-paper-500">Ver cliente</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card className="flex flex-col gap-3 p-5">
            <SectionHeader title="Campanhas com alerta" />
            {campanhasAlerta.length === 0 ? (
              <p className="text-sm text-paper-500">Nenhuma campanha em alerta.</p>
            ) : (
              <ul className="flex flex-col gap-2.5">
                {campanhasAlerta.map((campanha) => (
                  <li key={campanha.id} className="flex items-center justify-between text-[13px]">
                    <span className="text-paper-300">{campanha.nome}</span>
                    <span className="text-[12px] text-paper-500">CTR {campanha.metricas.ctr}%</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="flex flex-col gap-3 p-5">
            <SectionHeader title="Oportunidades comerciais" />
            {oportunidades.length === 0 ? (
              <p className="text-sm text-paper-500">Nenhuma proposta em aberto no momento.</p>
            ) : (
              <ul className="flex flex-col gap-2.5">
                {oportunidades.map((proposta) => (
                  <li key={proposta.id} className="flex items-center justify-between gap-3 text-[13px]">
                    <span className="text-paper-300">
                      {formatDataRelativa(proposta.criadaEm)} — {proposta.observacoes ?? "proposta em andamento"}
                    </span>
                    <StatusBadge dominio="proposta" status={proposta.status} />
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
