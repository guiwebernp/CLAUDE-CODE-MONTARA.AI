const http = require('http');
const fs   = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 4000;
const ROOT = __dirname;
const LP_PORT = 3131;

// ── módulos ──────────────────────────────────────────────────────────────────
const MODULOS = [
  {
    id:'lp', nome:'Gerador de LP', secao:'CRIAÇÃO', pronto:true,
    tag:'ATIVO', url:`http://localhost:${LP_PORT}`,
    desc:'Gera landing pages personalizadas para advogados de ludopatia com 32 designs e 20 variações de copy.',
    icon:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
  },
  {
    id:'chatbot', nome:'Gerador Chatbot', secao:'CRIAÇÃO', pronto:false,
    tag:'EM BREVE',
    desc:'Configura bots de WhatsApp com 4 estilos de comunicação (Acolhedor, Objetivo, Educativo, Formal). Qualifica leads automaticamente antes da call.',
    icon:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    features:['4 estilos de personalidade','Qualificação automática de leads','Integração WhatsApp Business','Respostas baseadas na Lei 14.790/2023'],
  },
  {
    id:'criativos', nome:'Criativos', secao:'CRIAÇÃO', pronto:true,
    tag:'ATIVO', url:'http://localhost:3333',
    desc:'Gera pacote completo de criativos personalizados para o advogado: 6 posts Instagram, 6 cards visuais e 4 roteiros de vídeo.',
    icon:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  },
  {
    id:'radar', nome:'Radar Jurídico', secao:'CRIAÇÃO', pronto:false,
    tag:'EM BREVE',
    desc:'Feed filtrado de jurisprudência sobre ludopatia. STJ, TJSPs e tribunais por estado — filtrado por tese (nulidade, CDC, dever de cuidado).',
    icon:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>`,
    features:['Monitoramento de STJ, STF e TJs','Filtro por tese jurídica','Alertas de novas decisões','Exportação para petições'],
  },
  {
    id:'trafego', nome:'Tráfego Pago', secao:'CRIAÇÃO', pronto:false,
    tag:'EM BREVE',
    desc:'Copies e estrutura de campanhas para Meta Ads e Google Ads. Targeting, criativos e landing pages conectados ao Gerador de LP.',
    icon:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
    features:['Copies para Meta Ads testados','Estrutura de campanha por objetivo','Targeting de nicho pré-configurado','A/B de criativos automático'],
  },
  {
    id:'crm', nome:'CRM', secao:'OPERAÇÃO', pronto:true,
    tag:'ATIVO', url:'http://localhost:3232',
    desc:'Pipeline visual de leads e clientes. Do primeiro contato até o fechamento e acompanhamento de casos. Integrado ao chatbot e LP.',
    icon:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    features:['Pipeline Kanban visual','Histórico completo por cliente','Alertas de prazo processual','Relatório de conversão por canal'],
  },
  {
    id:'instagram', nome:'Instagram', secao:'OPERAÇÃO', pronto:false,
    tag:'EM BREVE',
    desc:'Calendário editorial e conteúdo gerado por IA para o perfil do advogado. Posts educativos, cases (anonimizados) e conteúdo de autoridade.',
    icon:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    features:['30 posts/mês gerados por IA','Calendário de publicação','Stories de prova social','Hashtags do nicho otimizadas'],
  },
  {
    id:'pos-call', nome:'Pós-Call', secao:'OPERAÇÃO', pronto:false,
    tag:'EM BREVE',
    desc:'Sequência de follow-up automatizada após a call de vendas. Materiais de apoio, lembretes de prazo e nurturing até a decisão do cliente.',
    icon:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 5.55 5.55l1.48-1.48a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    features:['Sequência de e-mail/WhatsApp','Material de apoio personalizado','Alertas de prazo para o potencial cliente','Score de intenção de compra'],
  },
];

const secoes = ['CRIAÇÃO','OPERAÇÃO'];

// ── HTML do shell ─────────────────────────────────────────────────────────────
function buildHTML() {
  const sidebarItems = secoes.map(secao => {
    const items = MODULOS.filter(m => m.secao === secao).map(m => `
      <button class="nav-item ${m.pronto?'':'nav-item--soon'}" id="nav-${m.id}" onclick="setModulo('${m.id}')" title="${m.nome}">
        <span class="nav-icon">${m.icon}</span>
        <span class="nav-label">${m.nome}</span>
        ${m.pronto ? '<span class="nav-badge nav-badge--on">✓</span>' : '<span class="nav-badge nav-badge--off">·</span>'}
      </button>`).join('');
    return `<div class="nav-section">
      <div class="nav-section-label">${secao}</div>
      ${items}
    </div>`;
  }).join('');

  const modulosJS = JSON.stringify(MODULOS.map(m => ({
    id: m.id, nome: m.nome, pronto: m.pronto, tag: m.tag,
    desc: m.desc, features: m.features || [], url: m.url || '',
  })));

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Nicho Certo</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:    #0d0d0d;
  --panel: #141414;
  --card:  #1a1a1a;
  --border:#222222;
  --gold:  #D4A017;
  --gold2: #e8be4a;
  --gold-dim:rgba(212,160,23,.10);
  --text:  #ffffff;
  --muted: #666666;
  --muted2:#444444;
  --ok:    #10b981;
  --ok-dim:rgba(16,185,129,.12);
}
html,body{height:100%;overflow:hidden;background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased}
body{display:grid;grid-template-rows:52px 1fr}

/* ── HEADER ── */
.header{
  background:var(--panel);border-bottom:1px solid var(--border);
  display:grid;grid-template-columns:240px 1fr auto;align-items:center;
  padding:0;gap:0;position:relative;z-index:10;flex-shrink:0;
}
.header-logo{
  padding:0 20px;display:flex;align-items:center;gap:10px;
  border-right:1px solid var(--border);height:100%;
}
.logo-mark{
  font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;
  letter-spacing:.22em;text-transform:uppercase;color:var(--gold);white-space:nowrap;
}
.logo-dot{width:5px;height:5px;border-radius:50%;background:var(--gold);flex:none;opacity:.5}
.header-center{padding:0 24px;display:flex;align-items:center;gap:10px}
.header-module{font-size:14px;font-weight:500;color:var(--text)}
.header-module-tag{
  font-family:'IBM Plex Mono',monospace;font-size:9px;padding:3px 8px;
  border-radius:3px;background:var(--ok-dim);color:var(--ok);
  border:1px solid rgba(16,185,129,.2);letter-spacing:.1em;text-transform:uppercase;
}
.header-module-tag--soon{background:rgba(212,160,23,.08);color:rgba(212,160,23,.6);border-color:rgba(212,160,23,.15);}
.header-right{padding:0 24px;display:flex;align-items:center;gap:20px}
.metric{display:flex;flex-direction:column;align-items:flex-end;gap:1px}
.metric-value{font-family:'IBM Plex Mono',monospace;font-size:16px;font-weight:500;color:var(--gold);line-height:1}
.metric-label{font-size:9px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);font-family:'IBM Plex Mono',monospace}
.metric-sep{width:1px;height:28px;background:var(--border)}

/* ── LAYOUT ── */
.body{display:grid;grid-template-columns:240px 1fr;overflow:hidden}

/* ── SIDEBAR ── */
.sidebar{
  background:var(--panel);border-right:1px solid var(--border);
  display:flex;flex-direction:column;overflow-y:auto;padding:12px 0 20px;
}
.nav-section{margin-bottom:6px}
.nav-section-label{
  font-family:'IBM Plex Mono',monospace;font-size:8.5px;letter-spacing:.2em;
  text-transform:uppercase;color:var(--muted2);padding:14px 20px 6px;
}
.nav-item{
  width:100%;display:flex;align-items:center;gap:10px;
  padding:8px 20px;background:transparent;border:none;cursor:pointer;
  color:var(--muted);transition:.15s;text-align:left;position:relative;
  border-left:2px solid transparent;
}
.nav-item:hover{color:var(--text);background:rgba(255,255,255,.03)}
.nav-item.active{color:var(--text);background:var(--gold-dim);border-left-color:var(--gold)}
.nav-item.active .nav-icon{color:var(--gold)}
.nav-item--soon{opacity:.5}
.nav-item--soon:hover{opacity:.7}
.nav-icon{flex:none;display:flex;align-items:center;justify-content:center;width:16px;height:16px}
.nav-label{flex:1;font-size:13px;font-weight:400}
.nav-badge{font-family:'IBM Plex Mono',monospace;font-size:9px}
.nav-badge--on{color:var(--ok)}
.nav-badge--off{color:var(--muted2)}

/* ── CONTEÚDO ── */
.content{overflow:hidden;position:relative;background:var(--bg)}

/* Iframe do módulo ativo */
#module-frame{
  width:100%;height:100%;border:none;display:none;
  background:var(--bg);
}

/* Tela de módulo em breve */
.module-soon{
  position:absolute;inset:0;display:none;flex-direction:column;
  align-items:center;justify-content:center;gap:0;
  background:var(--bg);overflow:hidden;
}
.module-soon.visible{display:flex}

.soon-inner{max-width:520px;width:100%;padding:0 32px}

.soon-tag{
  font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.2em;
  text-transform:uppercase;color:var(--gold);opacity:.7;
  display:flex;align-items:center;gap:8px;margin-bottom:20px;
}
.soon-tag::before{content:'';display:block;width:24px;height:1px;background:var(--gold);opacity:.4}

.soon-name{font-size:clamp(28px,4vw,44px);font-weight:700;line-height:1.1;margin-bottom:16px;letter-spacing:-.02em}

.soon-desc{font-size:15px;color:var(--muted);line-height:1.7;margin-bottom:36px}

.soon-features{display:flex;flex-direction:column;gap:10px;margin-bottom:44px}
.soon-feat{display:flex;align-items:center;gap:12px;font-size:13px;color:rgba(255,255,255,.55)}
.soon-feat::before{
  content:'';display:block;width:4px;height:4px;border-radius:50%;
  background:var(--gold);opacity:.6;flex:none;
}

.soon-status{
  display:inline-flex;align-items:center;gap:8px;
  font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.1em;
  text-transform:uppercase;color:var(--muted);
  border:1px solid var(--border);border-radius:4px;padding:8px 16px;
}
.soon-status-dot{width:6px;height:6px;border-radius:50%;background:var(--muted2)}

/* Tela inicial vazia */
.home-screen{
  position:absolute;inset:0;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:12px;
}
.home-screen svg{opacity:.06}
.home-screen p{font-size:13px;color:var(--muted)}

/* Scrollbar */
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
</style>
</head>
<body>

<!-- HEADER -->
<header class="header">
  <div class="header-logo">
    <span class="logo-mark">Nicho Certo</span>
    <span class="logo-dot"></span>
  </div>
  <div class="header-center">
    <span class="header-module" id="headerModule">Selecione um módulo</span>
    <span class="header-module-tag" id="headerTag" style="display:none"></span>
  </div>
  <div class="header-right">
    <div class="metric">
      <span class="metric-value" id="metricLPs">—</span>
      <span class="metric-label">LPs geradas</span>
    </div>
    <div class="metric-sep"></div>
    <div class="metric">
      <span class="metric-value" id="metricClients">—</span>
      <span class="metric-label">Clientes</span>
    </div>
    <div class="metric-sep"></div>
    <div class="metric">
      <span class="metric-value" id="metricModules">2/8</span>
      <span class="metric-label">Módulos ativos</span>
    </div>
  </div>
</header>

<!-- BODY -->
<div class="body">

  <!-- SIDEBAR -->
  <nav class="sidebar">
    ${sidebarItems}
  </nav>

  <!-- CONTEÚDO -->
  <main class="content">

    <!-- Tela inicial -->
    <div class="home-screen" id="homeScreen">
      <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width=".6"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
      <p>Selecione um módulo na sidebar</p>
    </div>

    <!-- Iframe para módulos prontos -->
    <iframe id="module-frame" src="" title="Módulo"></iframe>

    <!-- Telas em breve -->
    <div class="module-soon" id="soon-screen">
      <div class="soon-inner">
        <div class="soon-tag" id="soon-tag">EM BREVE</div>
        <div class="soon-name" id="soon-name">Módulo</div>
        <div class="soon-desc" id="soon-desc"></div>
        <div class="soon-features" id="soon-features"></div>
        <div class="soon-status">
          <span class="soon-status-dot"></span>
          Em desenvolvimento
        </div>
      </div>
    </div>

  </main>
</div>

<script>
var modulos = ${modulosJS};
var moduloAtivo = null;

function setModulo(id) {
  var m = modulos.find(function(x){ return x.id === id; });
  if (!m) return;
  moduloAtivo = id;

  // Sidebar: atualiza active
  document.querySelectorAll('.nav-item').forEach(function(el){
    el.classList.toggle('active', el.id === 'nav-'+id);
  });

  // Header
  document.getElementById('headerModule').textContent = m.nome;
  var tag = document.getElementById('headerTag');
  tag.textContent = m.tag;
  tag.style.display = 'inline-flex';
  tag.className = 'header-module-tag' + (m.pronto ? '' : ' header-module-tag--soon');

  // Conteúdo
  document.getElementById('homeScreen').style.display = 'none';
  document.getElementById('module-frame').style.display = 'none';
  document.getElementById('soon-screen').classList.remove('visible');

  if (m.pronto) {
    var frame = document.getElementById('module-frame');
    if (frame.getAttribute('data-modulo') !== id) {
      frame.src = m.url;
      frame.setAttribute('data-modulo', id);
    }
    frame.style.display = 'block';
  } else {
    // Tela em breve
    document.getElementById('soon-tag').textContent = m.tag;
    document.getElementById('soon-name').textContent = m.nome;
    document.getElementById('soon-desc').textContent = m.desc;
    var feats = document.getElementById('soon-features');
    feats.innerHTML = '';
    (m.features || []).forEach(function(f){
      var el = document.createElement('div');
      el.className = 'soon-feat';
      el.textContent = f;
      feats.appendChild(el);
    });
    document.getElementById('soon-screen').classList.add('visible');
  }
}

// Métricas — busca da API do LP generator
async function carregarMetricas() {
  try {
    var clientes = await (await fetch('http://localhost:${LP_PORT}/api/clientes')).json();
    document.getElementById('metricLPs').textContent = clientes.length;
    document.getElementById('metricClients').textContent = clientes.length;
  } catch(e) {
    document.getElementById('metricLPs').textContent = '—';
    document.getElementById('metricClients').textContent = '—';
  }
}

// Abre LP por padrão
setModulo('lp');
carregarMetricas();
setInterval(carregarMetricas, 30000);
</script>
</body>
</html>`;
}

// ── Servidor ──────────────────────────────────────────────────────────────────
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(buildHTML());
}).listen(PORT, () => {
  console.log('\n\x1b[33m\x1b[1m Nicho Certo — Shell\x1b[0m');
  console.log(' → \x1b[36mhttp://localhost:' + PORT + '\x1b[0m');
  console.log(' ↳ LP Generator: \x1b[36mhttp://localhost:' + LP_PORT + '\x1b[0m\n');
  exec('start http://localhost:' + PORT);
});
