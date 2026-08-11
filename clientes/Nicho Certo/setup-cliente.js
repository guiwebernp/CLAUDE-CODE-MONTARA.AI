const readline = require('readline');
const fs = require('fs');
const path = require('path');

const { gerarLP, gerarSlug } = require('./skills/skill-lp');
const { gerarChatbot, listarEstilos } = require('./skills/skill-chatbot');
const { gerarConteudo } = require('./skills/skill-content');
const { gerarResumo } = require('./skills/skill-radar');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const pergunta = (texto) => new Promise(resolve => rl.question(texto, resolve));

function limpar() { process.stdout.write('\x1Bc'); }
function titulo(t) { console.log(`\n\x1b[32m${t}\x1b[0m`); }
function info(t)   { console.log(`\x1b[90m${t}\x1b[0m`); }
function ok(t)     { console.log(`\x1b[32m✓\x1b[0m ${t}`); }
function erro(t)   { console.log(`\x1b[31m✗\x1b[0m ${t}`); }

async function main() {
  limpar();

  titulo('═══════════════════════════════════════');
  titulo('  NICHO CERTO · Setup de Novo Cliente  ');
  titulo('═══════════════════════════════════════');
  console.log();
  info('Responda as perguntas abaixo para gerar todos os arquivos do cliente.\n');

  const nomeAdvogado   = await pergunta('Nome completo do advogado (ex: Dr. João Silva): ');
  const nomeEscritorio = await pergunta('Nome do escritório (ex: Silva Advocacia):        ');
  const oab            = await pergunta('OAB (ex: SC 12345):                              ');
  const cidadeEstado   = await pergunta('Cidade/Estado (ex: Florianópolis/SC):            ');
  const whatsapp       = await pergunta('WhatsApp com DDI+DDD (ex: 5548999999999):        ');

  console.log();
  titulo('Estilo do chatbot:');
  listarEstilos().forEach(e => {
    console.log(`  \x1b[32m${e.num}\x1b[0m · ${e.chave.padEnd(12)} — ${e.descricao}`);
  });
  const estiloRaw = await pergunta('\nEscolha o estilo (1-4): ');
  const estiloBot = parseInt(estiloRaw) || 1;

  rl.close();

  const dadosCliente = {
    nomeAdvogado:   nomeAdvogado.trim(),
    nomeEscritorio: nomeEscritorio.trim(),
    oab:            oab.trim(),
    cidadeEstado:   cidadeEstado.trim(),
    whatsapp:       whatsapp.trim().replace(/\D/g, ''),
    estiloBot,
    criadoEm:       new Date().toISOString()
  };

  const slug = gerarSlug(dadosCliente.nomeEscritorio);
  const clienteDir = path.join(__dirname, 'clientes', slug);

  if (fs.existsSync(clienteDir)) {
    console.log(`\n\x1b[33m⚠ A pasta "${slug}" já existe. Os arquivos serão sobrescritos.\x1b[0m`);
  }
  fs.mkdirSync(clienteDir, { recursive: true });

  titulo('\nGerando arquivos...\n');

  // 1. Landing Page
  process.stdout.write('  [1/3] Landing page...');
  try {
    const { html } = gerarLP(dadosCliente);
    fs.writeFileSync(path.join(clienteDir, 'index.html'), html, 'utf8');
    console.log(' \x1b[32m✓\x1b[0m');
  } catch (e) {
    console.log(' \x1b[31m✗\x1b[0m'); erro(`    ${e.message}`);
  }

  // 2. Chatbot
  process.stdout.write('  [2/3] Chatbot...');
  try {
    const { html, estilo } = gerarChatbot(dadosCliente);
    fs.writeFileSync(path.join(clienteDir, 'chatbot.html'), html, 'utf8');
    console.log(` \x1b[32m✓\x1b[0m (estilo: ${estilo})`);
  } catch (e) {
    console.log(' \x1b[31m✗\x1b[0m'); erro(`    ${e.message}`);
  }

  // 3. Conteúdo IG
  process.stdout.write('  [3/3] Pack de conteúdo Instagram...');
  try {
    const markdown = gerarConteudo(dadosCliente);
    fs.writeFileSync(path.join(clienteDir, 'conteudo-instagram.md'), markdown, 'utf8');
    console.log(' \x1b[32m✓\x1b[0m');
  } catch (e) {
    console.log(' \x1b[31m✗\x1b[0m'); erro(`    ${e.message}`);
  }

  // config.json
  fs.writeFileSync(
    path.join(clienteDir, 'config.json'),
    JSON.stringify({ ...dadosCliente, slug, radar: gerarResumo() }, null, 2),
    'utf8'
  );

  titulo('\n═══════════════════════════════════════');
  titulo('  ✓ Cliente configurado com sucesso!   ');
  titulo('═══════════════════════════════════════\n');

  console.log(`\x1b[1mPasta gerada:\x1b[0m clientes/${slug}/\n`);
  console.log('  📄 index.html             → Landing page personalizada');
  console.log('  💬 chatbot.html           → Demo do chatbot WhatsApp');
  console.log('  📱 conteudo-instagram.md  → 6 posts prontos para Instagram');
  console.log('  ⚙  config.json            → Dados do cliente\n');

  titulo('Próximos passos:');
  console.log(`  1. Abra \x1b[36mclientes/${slug}/index.html\x1b[0m no navegador e revise`);
  console.log(`  2. Ajuste qualquer texto diretamente no HTML se quiser`);
  console.log(`  3. Faça o deploy no Vercel (arraste a pasta ou use "vercel deploy")`);
  console.log(`  4. Envie o link da LP e o chatbot para o cliente\n`);
}

main().catch(e => {
  erro(`Erro inesperado: ${e.message}`);
  process.exit(1);
});
