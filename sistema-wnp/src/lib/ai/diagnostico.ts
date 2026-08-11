// Simulado — heurísticas simples sobre os dados do prospect. Fase futura troca por
// uma IA real analisando site/Google/Instagram/anúncios de verdade.
import type { DiagnosticoDigital, Prospect, ServicoWNP } from "@/types";

export function gerarDiagnostico(prospect: Prospect): DiagnosticoDigital {
  const problemas: string[] = [];
  const servicos: ServicoWNP[] = [];

  if (!prospect.contato.site) {
    problemas.push("Não foi identificado site institucional.");
    servicos.push("criacao_site");
  } else {
    problemas.push("Site existente sem sinais claros de otimização para conversão.");
    servicos.push("seo");
  }

  if (!prospect.contato.instagram) {
    problemas.push("Sem presença ativa no Instagram.");
  } else {
    problemas.push("Instagram com frequência de publicação baixa.");
  }

  problemas.push("Não foram identificadas campanhas de tráfego pago em andamento.");
  servicos.push("google_ads", "meta_ads");

  if (prospect.potencialEstimado === "alto") {
    problemas.push("Volume de atendimento parece maior do que a operação comercial consegue acompanhar hoje.");
    servicos.push("crm", "automacao_comercial");
  }

  return {
    gerado: true,
    geradoEm: new Date().toISOString(),
    problemasEncontrados: problemas,
    servicosRecomendados: [...new Set(servicos)],
  };
}
