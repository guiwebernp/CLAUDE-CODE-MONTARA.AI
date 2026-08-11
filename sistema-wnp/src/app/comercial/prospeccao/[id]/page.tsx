import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone, Mail, Globe, AtSign, MapPin } from "lucide-react";
import { prospectsRepository } from "@/lib/data/prospects.repository";
import { propostasRepository } from "@/lib/data/propostas.repository";
import { atividadesRepository } from "@/lib/data/atividades.repository";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DiagnosticoPanel } from "@/components/comercial/DiagnosticoPanel";
import { AbordagemPanel } from "@/components/comercial/AbordagemPanel";
import { formatDataCurta, formatDataRelativa } from "@/lib/utils/format";

const POTENCIAL_LABEL: Record<string, string> = { alto: "Alto", medio: "Médio", baixo: "Baixo" };

export default async function DossieProspectPage(props: PageProps<"/comercial/prospeccao/[id]">) {
  const { id } = await props.params;

  const prospect = await prospectsRepository.getById(id);
  if (!prospect) notFound();

  const [propostas, atividadesTodas] = await Promise.all([
    propostasRepository.getByProspectId(id),
    atividadesRepository.getAll(),
  ]);

  const historico = atividadesTodas
    .filter(
      (a) =>
        (a.entidadeTipo === "prospect" && a.entidadeId === id) ||
        (a.entidadeTipo === "proposta" && propostas.some((p) => p.id === a.entidadeId))
    )
    .sort((a, b) => new Date(b.ocorridaEm).getTime() - new Date(a.ocorridaEm).getTime());

  return (
    <div className="flex flex-col gap-5 px-8 py-7">
      <div>
        <Link
          href="/comercial/prospeccao"
          className="mb-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-paper-500 hover:text-paper-0"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
          Prospecção
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-semibold text-paper-0">{prospect.empresa}</h1>
          <StatusBadge dominio="pipeline" status={prospect.status} />
          <span className="text-[13px] font-medium text-paper-500">
            Potencial {POTENCIAL_LABEL[prospect.potencialEstimado]}
          </span>
        </div>
        <p className="mt-1 text-sm text-paper-500">
          {prospect.segmento} · {prospect.endereco.cidade}
          {prospect.endereco.estado ? `/${prospect.endereco.estado}` : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="flex flex-col gap-3 p-5">
          <SectionHeader title="Dados da empresa" />
          <Info label="Segmento" valor={prospect.segmento} />
          <Info label="Origem" valor={prospect.origem} />
          <Info label="Cidade" valor={`${prospect.endereco.cidade}${prospect.endereco.estado ? `/${prospect.endereco.estado}` : ""}`} icon={MapPin} />
        </Card>

        <Card className="flex flex-col gap-3 p-5">
          <SectionHeader title="Contato" />
          {prospect.contato.telefone && <Info label="Telefone" valor={prospect.contato.telefone} icon={Phone} />}
          {prospect.contato.whatsapp && <Info label="WhatsApp" valor={prospect.contato.whatsapp} icon={Phone} />}
          {prospect.contato.email && <Info label="E-mail" valor={prospect.contato.email} icon={Mail} />}
          {!prospect.contato.telefone && !prospect.contato.whatsapp && !prospect.contato.email && (
            <p className="text-sm text-paper-500">Nenhum contato direto registrado ainda.</p>
          )}
        </Card>

        <Card className="flex flex-col gap-3 p-5">
          <SectionHeader title="Presença digital" />
          {prospect.contato.site && <Info label="Site" valor={prospect.contato.site} icon={Globe} />}
          {prospect.contato.instagram && (
            <Info label="Instagram" valor={prospect.contato.instagram} icon={AtSign} />
          )}
          {!prospect.contato.site && !prospect.contato.instagram && (
            <p className="text-sm text-paper-500">Nenhuma presença digital identificada ainda.</p>
          )}
        </Card>
      </div>

      <DiagnosticoPanel prospect={prospect} />
      <AbordagemPanel prospect={prospect} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="flex flex-col gap-3 p-5">
          <SectionHeader title="Próximos passos" />
          <p className="text-[13px] text-paper-300">{prospect.proximaAcao ?? "Nenhuma ação definida ainda."}</p>
          {prospect.observacoes && (
            <p className="border-t border-ink-700 pt-3 text-[13px] text-paper-500">{prospect.observacoes}</p>
          )}
          {propostas.length > 0 && (
            <div className="flex flex-col gap-2 border-t border-ink-700 pt-3">
              <p className="text-[12px] font-semibold tracking-[0.04em] text-paper-500 uppercase">Propostas</p>
              {propostas.map((proposta) => (
                <div key={proposta.id} className="flex items-center justify-between gap-3 text-[13px]">
                  <span className="text-paper-300">Proposta de {formatDataCurta(proposta.criadaEm)}</span>
                  <StatusBadge dominio="proposta" status={proposta.status} />
                </div>
              ))}
            </div>
          )}
        </Card>

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
      </div>
    </div>
  );
}

function Info({ label, valor, icon: Icon }: { label: string; valor: string; icon?: typeof Phone }) {
  return (
    <div className="flex items-start gap-2 text-[13px]">
      {Icon && <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-paper-500" strokeWidth={2} />}
      <div>
        <span className="block text-[11px] text-paper-500 uppercase">{label}</span>
        <span className="text-paper-300">{valor}</span>
      </div>
    </div>
  );
}
