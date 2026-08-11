const fs = require('fs');
const path = require('path');

const ESTILOS = {
  1: 'acolhedor',
  2: 'objetivo',
  3: 'educativo',
  4: 'formal'
};

const DESCRICOES = {
  acolhedor: 'empático · humano · ideal para quem está emocionalmente fragilizado',
  objetivo: 'direto · eficiente · ideal para quem quer clareza rápida',
  educativo: 'informativo · gera autoridade · ideal para leads frios',
  formal: 'institucional · sóbrio · ideal para escritórios tradicionais'
};

function gerarChatbot(dadosCliente) {
  const templatePath = path.join(__dirname, '../templates/chatbot.html');
  let template = fs.readFileSync(templatePath, 'utf8');

  const estiloChave = typeof dadosCliente.estiloBot === 'number'
    ? ESTILOS[dadosCliente.estiloBot]
    : dadosCliente.estiloBot || 'acolhedor';

  const sigla = dadosCliente.nomeEscritorio
    .split(' ')
    .filter(p => p.length > 2)
    .slice(0, 2)
    .map(p => p[0].toUpperCase())
    .join('');

  const html = template
    .replace(/\{\{NOME_ESCRITORIO\}\}/g, dadosCliente.nomeEscritorio)
    .replace(/\{\{SIGLA\}\}/g, sigla || 'NC')
    .replace(/\{\{ESTILO_PADRAO\}\}/g, estiloChave);

  return { html, estilo: estiloChave, descricao: DESCRICOES[estiloChave] };
}

function listarEstilos() {
  return Object.entries(ESTILOS).map(([num, chave]) => ({
    num: parseInt(num),
    chave,
    descricao: DESCRICOES[chave]
  }));
}

module.exports = { gerarChatbot, listarEstilos, ESTILOS };
