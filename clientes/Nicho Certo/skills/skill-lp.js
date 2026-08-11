const fs = require('fs');
const path = require('path');
const { copies } = require('./copies');
const { palettes } = require('./palettes');

const NOME = 'Captador';

function hexLighten(hex, amount) {
  const h = hex.replace('#', '');
  return '#' + [0,2,4].map(i => {
    const v = parseInt(h.slice(i, i+2), 16);
    return Math.min(255, Math.round(v + (255 - v) * amount)).toString(16).padStart(2, '0');
  }).join('');
}

function hexDarken(hex, amount) {
  const h = hex.replace('#', '');
  return '#' + [0,2,4].map(i => {
    const v = parseInt(h.slice(i, i+2), 16);
    return Math.max(0, Math.round(v * (1 - amount))).toString(16).padStart(2, '0');
  }).join('');
}

function gerarLP(dadosCliente) {
  const v = dadosCliente.variacao || 1;
  const palette = palettes.find(p => p.id === v) || palettes[0];

  const templatePath = path.join(__dirname, '../templates', palette.template);
  let html = fs.readFileSync(templatePath, 'utf8');

  const primeiroNome = dadosCliente.nomeAdvogado.replace(/Dr\.?\s?/i, '').split(' ')[0];
  const nomeUrl = encodeURIComponent(primeiroNome);

  const totalCopies = copies.length;
  let copyIdx;
  if (typeof dadosCliente.copia === 'number') {
    copyIdx = Math.max(0, Math.min(dadosCliente.copia - 1, totalCopies - 1));
  } else {
    copyIdx = Math.floor(Math.random() * totalCopies);
  }
  const c = copies[copyIdx];

  const descricao = dadosCliente.descricaoServico ||
    `${dadosCliente.nomeAdvogado} atua no nicho de ludopatia com base na Lei 14.790/2023 e no CDC. Cada caso é analisado individualmente — a conversa começa sem custo, sem julgamento e sem compromisso. Honorários somente no resultado.`;

  const metaDescricao = `${dadosCliente.nomeAdvogado} — advocacia especializada em ludopatia em ${dadosCliente.cidadeEstado}. ${c.meta_sufixo}`;
  const fotoPath = dadosCliente.fotoAdvogado || 'foto.jpg';
  const slug = gerarSlug(dadosCliente.nomeEscritorio);

  html = html
    .replace(/\{\{COLOR_OVERRIDE\}\}/g, palette.css)
    .replace(/\{\{NOME_ESCRITORIO\}\}/g, dadosCliente.nomeEscritorio)
    .replace(/\{\{NOME_ADVOGADO\}\}/g, dadosCliente.nomeAdvogado)
    .replace(/\{\{NOME_ADVOGADO_URL\}\}/g, nomeUrl)
    .replace(/\{\{OAB\}\}/g, dadosCliente.oab)
    .replace(/\{\{CIDADE_ESTADO\}\}/g, dadosCliente.cidadeEstado)
    .replace(/\{\{WHATSAPP\}\}/g, dadosCliente.whatsapp.replace(/\D/g, ''))
    .replace(/\{\{FOTO_ADVOGADO\}\}/g, fotoPath)
    .replace(/\{\{HEADLINE_H1\}\}/g, c.h1)
    .replace(/\{\{TAGLINE\}\}/g, c.tagline)
    .replace(/\{\{DESCRICAO_SERVICO\}\}/g, descricao)
    .replace(/\{\{CTA_TITULO\}\}/g, c.cta_titulo)
    .replace(/\{\{CTA_SUBTEXTO\}\}/g, c.cta_subtexto)
    .replace(/\{\{META_DESCRICAO\}\}/g, metaDescricao);

  // ── LOGO — injeta no nav se fornecido
  if (dadosCliente.logoFile) {
    html = html.replace(
      /(class="nav-logo"[^>]*>)([\s\S]*?)(<\/div>)/,
      `$1<img src="${dadosCliente.logoFile}" style="height:28px;max-width:140px;object-fit:contain;vertical-align:middle" alt="Logo">$3`
    );
  }

  // ── COR PERSONALIZADA — sobrepõe a paleta
  if (dadosCliente.corPersonalizada) {
    const cor = dadosCliente.corPersonalizada;
    const cor2 = hexLighten(cor, 0.25);
    const cor3 = hexDarken(cor, 0.15);
    const dimAlpha = cor.replace('#','') + '1a';
    const css = `:root{--accent:${cor};--accent2:${cor2};--accent3:${cor3};--accent-dim:rgba(0,0,0,0);--accent-line:rgba(0,0,0,0);` +
      `--red:${cor};--red2:${cor2};--red3:${cor3};--red-dim:rgba(0,0,0,0);` +
      `--blue:${cor};--blue2:${cor2};--blue3:${cor3};` +
      `--green:${cor};--green2:${cor2};--green3:${cor3};` +
      `--ink2:${cor};--ink3:${cor3};}`;
    html = html.replace('</head>', `<style>${css}</style>\n</head>`);
  }

  // ── DEPOIMENTO — injeta antes do footer se fornecido
  if (dadosCliente.depoimentoTexto) {
    const nome = dadosCliente.depoimentoNome || '';
    const cidade = dadosCliente.depoimentoCidade || '';
    const cite = [nome, cidade].filter(Boolean).join(' · ');
    const depoHtml = `
<section style="padding:72px 32px;border-top:1px solid rgba(128,128,128,.12);text-align:center">
  <div style="max-width:640px;margin:0 auto">
    <div style="font-family:Georgia,serif;font-size:48px;opacity:.15;line-height:1;margin-bottom:8px">&ldquo;</div>
    <blockquote style="font-family:Georgia,serif;font-size:clamp(17px,2.6vw,24px);font-style:italic;line-height:1.5;margin:0 0 20px;opacity:.88">${dadosCliente.depoimentoTexto}</blockquote>
    ${cite ? `<cite style="font-family:monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;opacity:.4;font-style:normal">${cite}</cite>` : ''}
  </div>
</section>`;
    html = html.replace('<footer', depoHtml + '\n<footer');
  }

  return { html, slug, design: palette.nome, copyIdx: copyIdx + 1, copyTotal: totalCopies };
}

function gerarSlug(nome) {
  return nome
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function listarDesigns() {
  return palettes.map(p => `  ${p.id}. ${p.nome}`).join('\n');
}

module.exports = { NOME, gerarLP, gerarSlug, listarDesigns };
