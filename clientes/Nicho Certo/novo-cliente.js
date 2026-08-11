#!/usr/bin/env node
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { NOME, gerarLP, gerarSlug } = require('./skills/skill-lp');
const { palettes } = require('./skills/palettes');
const { copies } = require('./skills/copies');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(res => rl.question(q, res));

const R = '\x1b[0m';
const B = '\x1b[1m';
const DIM = '\x1b[2m';
const GOLD = '\x1b[33m';
const TEAL = '\x1b[36m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';

function clear() { process.stdout.write('\x1b[2J\x1b[H'); }

function linha(c = '─', n = 60) { return c.repeat(n); }

function header() {
  console.log('');
  console.log(GOLD + B + '  Captador' + R + DIM + ' — gerador de landing pages' + R);
  console.log(DIM + '  ' + linha() + R);
  console.log('');
}

function mostrarDesigns() {
  const familias = [
    { nome: 'Noturno',   ids: [1,2,3,4],     desc: 'fundo escuro + extrato bancário no hero' },
    { nome: 'Aço',       ids: [5,6,7,8],     desc: 'fundo navy + hero centralizado full-screen' },
    { nome: 'Editorial', ids: [9,10,11,12],  desc: 'fundo creme + estilo jornal jurídico' },
    { nome: 'Narrativa', ids: [13,14,15,16], desc: 'coluna estreita + headline gigante' },
    { nome: 'Impacto',   ids: [17,18,19,20], desc: 'split 50/50 + contador animado + quiz chat' },
  ];
  const cores = {
    1:'Dourado', 2:'Coral', 3:'Roxo', 4:'Esmeralda',
    5:'Azul',   6:'Teal',  7:'Índigo', 8:'Prata',
    9:'Verde', 10:'Índigo', 11:'Vinho', 12:'Âmbar',
    13:'Dourado', 14:'Coral', 15:'Roxo', 16:'Teal',
    17:'Dourado', 18:'Coral', 19:'Roxo', 20:'Teal',
  };

  console.log(B + '  Designs disponíveis:' + R);
  console.log('');
  familias.forEach(f => {
    const ids = f.ids.map(i => GOLD + i + R + DIM + ' ' + cores[i] + R).join('  ');
    console.log('  ' + B + f.nome + R + DIM + ' — ' + f.desc + R);
    console.log('  ' + ids);
    console.log('');
  });
  console.log(DIM + '  Dica: veja todos na galeria → galeria-designs.html' + R);
}

function mostrarCopies() {
  const exemplos = [1,3,9,12,19];
  console.log(B + '  Variações de texto disponíveis' + R + DIM + ' (20 no total):' + R);
  console.log('');
  exemplos.forEach(i => {
    const c = copies[i - 1];
    const headline = c.h1.replace(/<[^>]+>/g, '').replace(/\n/g, ' ');
    console.log('  ' + GOLD + i + R + '  ' + DIM + '"' + headline.slice(0, 56) + '..."' + R);
  });
  console.log(DIM + '  ...' + R);
  console.log('');
}

async function run() {
  clear();
  header();

  console.log('  Vamos configurar a LP do novo advogado.');
  console.log('  Responda as perguntas abaixo. ' + DIM + '(Enter = pular / usar padrão)' + R);
  console.log('');

  // ── DADOS DO CLIENTE ─────────────────────────────────────────────────────
  const nomeAdvogado = (await ask('  ' + B + 'Nome do advogado' + R + ' (ex: Dr. João Silva): ')).trim();
  if (!nomeAdvogado) { console.log(RED + '\n  Nome obrigatório.' + R); rl.close(); return; }

  const nomeEscritorio = (await ask('  ' + B + 'Nome do escritório' + R + ' (Enter = "' + nomeAdvogado + ' Advocacia"): ')).trim()
    || nomeAdvogado + ' Advocacia';

  const oab = (await ask('  ' + B + 'OAB' + R + ' (ex: SP 123456 — Enter = deixar genérico): ')).trim() || 'XX';

  const cidadeEstado = (await ask('  ' + B + 'Cidade/Estado' + R + ' (ex: São Paulo/SP): ')).trim() || 'Brasil';

  const whatsapp = (await ask('  ' + B + 'WhatsApp' + R + ' com código do país (ex: 5548999990000): ')).trim();
  if (!whatsapp) { console.log(RED + '\n  WhatsApp obrigatório.' + R); rl.close(); return; }

  const foto = (await ask('  ' + B + 'Foto do advogado' + R + ' (nome do arquivo, ex: foto.jpg — Enter = foto.jpg): ')).trim() || 'foto.jpg';

  // ── DESIGN ───────────────────────────────────────────────────────────────
  console.log('');
  mostrarDesigns();

  const designInput = (await ask('  ' + B + 'Qual design?' + R + ' (número 1–20, ou Enter = aleatório): ')).trim();
  let variacao = parseInt(designInput);
  if (!variacao || variacao < 1 || variacao > 20) {
    variacao = Math.ceil(Math.random() * 20);
    console.log(DIM + '  → sorteado: variacao ' + variacao + R);
  }
  const palette = palettes.find(p => p.id === variacao);

  // ── COPY ─────────────────────────────────────────────────────────────────
  console.log('');
  mostrarCopies();

  const copyInput = (await ask('  ' + B + 'Qual texto?' + R + ' (número 1–20, ou Enter = aleatório): ')).trim();
  let copia = parseInt(copyInput);
  if (!copia || copia < 1 || copia > 20) {
    copia = Math.ceil(Math.random() * 20);
    console.log(DIM + '  → sorteado: texto ' + copia + R);
  }

  // ── GERA ─────────────────────────────────────────────────────────────────
  console.log('');
  console.log(DIM + '  ' + linha() + R);
  console.log('');
  console.log('  Gerando LP...');

  const dadosCliente = { nomeAdvogado, nomeEscritorio, oab, cidadeEstado, whatsapp, fotoAdvogado: foto, variacao, copia };

  let resultado;
  try {
    resultado = gerarLP(dadosCliente);
  } catch (e) {
    console.log(RED + '\n  Erro ao gerar: ' + e.message + R);
    rl.close(); return;
  }

  const pasta = path.join(__dirname, 'clientes', resultado.slug);
  fs.mkdirSync(pasta, { recursive: true });
  const saida = path.join(pasta, 'index.html');
  fs.writeFileSync(saida, resultado.html);

  // Salva config do cliente
  fs.writeFileSync(path.join(pasta, 'config.json'), JSON.stringify({
    ...dadosCliente, design: resultado.design, copyIdx: resultado.copyIdx, geradoEm: new Date().toISOString()
  }, null, 2));

  // ── RESULTADO ─────────────────────────────────────────────────────────────
  console.log('');
  console.log(GREEN + B + '  ✓ LP gerada com sucesso!' + R);
  console.log('');
  console.log('  ' + B + 'Arquivo:' + R + ' clientes/' + resultado.slug + '/index.html');
  console.log('  ' + B + 'Design: ' + R + resultado.design);
  console.log('  ' + B + 'Texto:  ' + R + 'variação ' + resultado.copyIdx + ' de ' + resultado.copyTotal);
  console.log('');
  console.log(DIM + '  ' + linha() + R);
  console.log('');
  console.log('  ' + B + 'Próximos passos:' + R);
  console.log(DIM + '  1. Salve a foto do advogado em clientes/' + resultado.slug + '/' + foto + R);
  console.log(DIM + '  2. Abra a LP no browser (abrindo agora...)' + R);
  console.log(DIM + '  3. Arraste a pasta clientes/' + resultado.slug + '/ no Netlify para publicar' + R);
  console.log('');

  // Abre no browser
  const cmd = process.platform === 'win32' ? 'start "" "' + saida + '"' : 'open "' + saida + '"';
  exec(cmd);

  rl.close();
}

run().catch(e => { console.error(RED + '\n  Erro: ' + e.message + R); rl.close(); });
