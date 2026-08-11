// Base de jurisprudência — atualize aqui quando sair novas decisões
const DECISOES = [
  { court: "TJDFT", valor: "R$ 337.000", tema: "Nulidade das apostas · apostador com ludopatia reconhecida", tese: "nulidade", data: "2025-03" },
  { court: "TJRS",  valor: "R$ 206.000", tema: "Falha no bloqueio · apostador com transtorno documentado",  tese: "cuidado",  data: "2025-04" },
  { court: "TJSC",  valor: "R$ 180.000", tema: "Nulidade contratual + responsabilidade civil da plataforma", tese: "nulidade", data: "2025-02" },
  { court: "TJSP",  valor: "R$ 217.000", tema: "Saque bloqueado sem justificativa · caso Betano",           tese: "cuidado",  data: "2025-05" },
  { court: "TJRS",  valor: "R$ 94.000",  tema: "Apostas durante internação psiquiátrica",                   tese: "nulidade", data: "2025-01" },
  { court: "TJSC",  valor: "R$ 128.000", tema: "Saques retidos + falha no dever de informar",               tese: "cuidado",  data: "2025-04" },
  { court: "TJSP",  valor: "R$ 76.000",  tema: "Publicidade predatória · indução ao consumo compulsivo",    tese: "cuidado",  data: "2025-03" },
  { court: "TJDFT", valor: "R$ 155.000", tema: "Vício de consentimento · diagnóstico posterior às apostas", tese: "nulidade", data: "2025-05" }
];

function obterDecisoes(filtros = {}) {
  let resultado = [...DECISOES];
  if (filtros.tribunal && filtros.tribunal !== 'todos') {
    resultado = resultado.filter(d => d.court === filtros.tribunal);
  }
  if (filtros.tese && filtros.tese !== 'todas') {
    resultado = resultado.filter(d => d.tese === filtros.tese);
  }
  return resultado;
}

function gerarResumo() {
  const total = DECISOES.length;
  const favoraveis = DECISOES.filter(d => d.tese === 'nulidade' || d.tese === 'cuidado').length;
  const tribunais = [...new Set(DECISOES.map(d => d.court))];
  const valoresNumericos = DECISOES.map(d => parseInt(d.valor.replace(/\D/g, '')));
  const maiorValor = Math.max(...valoresNumericos);

  return {
    total,
    favoraveis,
    tribunais,
    maiorValor: `R$ ${maiorValor.toLocaleString('pt-BR')}`,
    atualizado: new Date().toLocaleDateString('pt-BR')
  };
}

module.exports = { obterDecisoes, gerarResumo, DECISOES };
