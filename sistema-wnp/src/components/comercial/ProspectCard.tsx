import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { formatDataRelativa } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { Prospect } from "@/types";

const POTENCIAL_CLASS: Record<Prospect["potencialEstimado"], string> = {
  alto: "bg-mint-400",
  medio: "bg-paper-500",
  baixo: "bg-paper-500/40",
};

export function ProspectCard({ prospect }: { prospect: Prospect }) {
  return (
    <Link href={`/comercial/prospeccao/${prospect.id}`}>
      <Card className="flex flex-col gap-2 p-3.5 hover:border-mint-500/40">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[13px] font-semibold text-paper-0">{prospect.empresa}</span>
          <span
            className={cn("mt-1 h-1.5 w-1.5 shrink-0 rounded-full", POTENCIAL_CLASS[prospect.potencialEstimado])}
            title={`Potencial ${prospect.potencialEstimado}`}
          />
        </div>
        <span className="text-[12px] text-paper-500">{prospect.segmento}</span>
        {prospect.proximaAcao && <p className="line-clamp-2 text-[12px] text-paper-300">{prospect.proximaAcao}</p>}
        {prospect.ultimaInteracaoEm && (
          <span className="text-[11px] text-paper-500">{formatDataRelativa(prospect.ultimaInteracaoEm)}</span>
        )}
      </Card>
    </Link>
  );
}
