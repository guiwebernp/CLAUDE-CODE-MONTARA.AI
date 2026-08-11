// Simulado — templates preenchidos com dados do prospect. Fase futura troca por LLM real.
import type { Prospect } from "@/types";

export interface Abordagem {
  whatsapp: string;
  email: string;
  ligacao: string;
  instagram: string;
  followUp: string;
}

export function gerarAbordagem(prospect: Prospect): Abordagem {
  const primeiroProblema = prospect.diagnostico?.problemasEncontrados[0];

  return {
    whatsapp: `Oi! Vi o trabalho da ${prospect.empresa} e achei que faz sentido conversarmos — trabalho com posicionamento digital pra empresas de ${prospect.segmento.toLowerCase()} e acho que consigo ajudar vocês a atraírem mais clientes pela internet. Topa bater um papo rápido essa semana?`,
    email: `Assunto: Presença digital da ${prospect.empresa}\n\nOlá,\n\nSou Guilherme, da WNP — trabalho com sites, tráfego pago e automação com IA pra empresas de ${prospect.segmento.toLowerCase()}.${
      primeiroProblema ? ` Reparei que ${primeiroProblema.toLowerCase()}` : ""
    } Acho que dá pra melhorar bastante a captação de clientes de vocês pela internet. Posso te mandar um diagnóstico rápido e gratuito?\n\nAbraço,\nGuilherme`,
    ligacao: `Abertura: se apresentar como WNP, mencionar que trabalha com empresas do segmento de ${prospect.segmento.toLowerCase()} na região de ${prospect.endereco.cidade}. Perguntar como está hoje a geração de clientes pela internet. Se houver abertura, oferecer um diagnóstico digital gratuito e agendar apresentação.`,
    instagram: `Oi! Acompanho o trabalho de vocês e queria te fazer um convite — ajudo empresas como a ${prospect.empresa} a crescerem no digital (site, tráfego, automação). Bora trocar uma ideia?`,
    followUp: `Follow-up: reforçar o valor do diagnóstico gratuito e perguntar se ainda faz sentido conversar essa semana. Se não houver resposta em 3 dias, tentar outro canal de contato.`,
  };
}
