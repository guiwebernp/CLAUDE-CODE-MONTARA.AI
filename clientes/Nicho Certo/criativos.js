'use strict';
const http = require('http');
const { gerarPosts, gerarRoteiros, gerarCriativosHTML } = require('./skills/skill-criativos');

const PORT = 3333;

function readBody(req) {
  return new Promise((res, rej) => {
    const c = [];
    req.on('data', d => c.push(d));
    req.on('end', () => res(Buffer.concat(c)));
    req.on('error', rej);
  });
}

function buildHTML() {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Criativos · Nicho Certo</title>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0d0d0d;--panel:#141414;--card:#1a1a1a;--border:#222;
  --gold:#D4A017;--gold2:#e8be4a;--gold-dim:rgba(212,160,23,.1);
  --text:#fff;--muted:#666;--muted2:#444;--ok:#10b981;--ok-dim:rgba(16,185,129,.12);
}
html,body{height:100%;overflow:hidden;background:var(--bg);color:var(--text);
  font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased}
body{display:grid;grid-template-columns:280px 1fr}

/* SIDEBAR */
.sidebar{background:var(--panel);border-right:1px solid var(--border);
  display:flex;flex-direction:column;overflow-y:auto;padding:20px 16px}
.sidebar-title{font-family:'IBM Plex Mono',monospace;font-size:8.5px;letter-spacing:.22em;
  text-transform:uppercase;color:var(--muted2);padding-bottom:16px;
  border-bottom:1px solid var(--border);margin-bottom:18px}
.field{display:flex;flex-direction:column;gap:5px;margin-bottom:12px}
.field label{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.12em;
  text-transform:uppercase;color:var(--muted)}
.field input[type=text]{background:var(--card);border:1px solid var(--border);color:var(--text);
  padding:8px 10px;font-size:13px;border-radius:4px;outline:none;
  font-family:'Inter',sans-serif;transition:.15s;width:100%}
.field input[type=text]:focus{border-color:var(--gold)}
.field input[type=text]::placeholder{color:var(--muted2)}
.color-row{display:flex;align-items:center;gap:10px}
input[type=color]{width:36px;height:36px;border:1px solid var(--border);
  border-radius:4px;padding:2px;background:var(--card);cursor:pointer;flex-shrink:0}
.presets{display:flex;gap:6px;flex-wrap:wrap}
.swatch{width:22px;height:22px;border-radius:3px;cursor:pointer;transition:.15s;
  border:2px solid transparent}
.swatch:hover{transform:scale(1.15)}
.sidebar-gap{flex:1;min-height:16px}
.btn-gerar{background:var(--gold);color:#000;font-weight:700;font-size:12px;
  padding:12px;border:none;border-radius:4px;cursor:pointer;width:100%;
  letter-spacing:.08em;text-transform:uppercase;transition:.15s;
  font-family:'Inter',sans-serif;margin-top:4px}
.btn-gerar:hover:not(:disabled){background:var(--gold2)}
.btn-gerar:disabled{opacity:.4;cursor:not-allowed}

/* MAIN */
.main{display:grid;grid-template-rows:49px 1fr;overflow:hidden}
.tabs{display:flex;background:var(--panel);border-bottom:1px solid var(--border);padding:0 20px;gap:0}
.tab{padding:0 18px;height:49px;display:flex;align-items:center;
  font-size:10.5px;font-weight:500;color:var(--muted);cursor:pointer;
  border-bottom:2px solid transparent;letter-spacing:.1em;text-transform:uppercase;
  transition:.15s;font-family:'IBM Plex Mono',monospace;user-select:none}
.tab:hover{color:#aaa}
.tab.active{color:var(--text);border-bottom-color:var(--gold)}
.tab-count{font-family:'IBM Plex Mono',monospace;font-size:9px;color:var(--muted2);
  margin-left:5px;letter-spacing:0}
.tab.active .tab-count{color:var(--gold);opacity:.7}
.content{overflow-y:auto;padding:24px 28px}

/* EMPTY */
.empty{display:flex;flex-direction:column;align-items:center;justify-content:center;
  height:calc(100vh - 49px);gap:12px}
.empty svg{opacity:.05}
.empty p{font-size:13px;color:var(--muted)}

/* POSTS */
.posts-list{display:flex;flex-direction:column;gap:14px;max-width:800px}
.post-card{background:var(--card);border:1px solid var(--border);border-radius:6px;
  padding:18px 20px;border-left-width:3px}
.post-card.t-edu{border-left-color:#4A9FC8}
.post-card.t-prova{border-left-color:var(--ok)}
.post-card.t-auto{border-left-color:var(--gold)}
.post-card.t-cta{border-left-color:#D4643C}
.post-header{display:flex;align-items:center;gap:10px;margin-bottom:14px}
.post-num{font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--muted2)}
.badge{font-family:'IBM Plex Mono',monospace;font-size:8px;letter-spacing:.15em;
  padding:3px 8px;border-radius:2px;text-transform:uppercase;flex-shrink:0}
.b-edu{background:rgba(74,159,200,.1);color:#4A9FC8;border:1px solid rgba(74,159,200,.2)}
.b-prova{background:var(--ok-dim);color:var(--ok);border:1px solid rgba(16,185,129,.2)}
.b-auto{background:var(--gold-dim);color:var(--gold);border:1px solid rgba(212,160,23,.2)}
.b-cta{background:rgba(212,100,60,.1);color:#D4643C;border:1px solid rgba(212,100,60,.2)}
.btn-copy{margin-left:auto;background:transparent;border:1px solid var(--border);
  color:var(--muted);font-size:11px;padding:4px 12px;border-radius:3px;cursor:pointer;
  transition:.15s;font-family:'Inter',sans-serif;flex-shrink:0}
.btn-copy:hover{border-color:var(--gold);color:var(--gold)}
.post-gancho{font-family:'Sora',sans-serif;font-size:15px;font-weight:700;color:var(--text);
  margin-bottom:12px;line-height:1.35;letter-spacing:-.01em}
.post-corpo{font-size:12.5px;color:#888;line-height:1.75;margin-bottom:12px;white-space:pre-line}
.post-cta{font-size:12.5px;color:var(--gold);margin-bottom:10px;line-height:1.5;
  white-space:pre-line;font-weight:500}
.post-hashtags{font-size:10.5px;color:var(--muted2);font-family:'IBM Plex Mono',monospace}

/* VISUAIS */
.visuais-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:24px}
.visual-item{display:flex;flex-direction:column;gap:8px}
.card-wrap{width:200px;height:200px;overflow:hidden;border-radius:4px;
  border:1px solid var(--border);cursor:pointer;transition:.15s}
.card-wrap:hover{border-color:#444}
.card-inner{transform:scale(.5);transform-origin:top left;
  width:400px;height:400px;pointer-events:none}
.card-label{font-family:'IBM Plex Mono',monospace;font-size:8.5px;letter-spacing:.15em;
  text-transform:uppercase;color:var(--muted2)}
.card-btns{display:flex;gap:6px}
.card-btns button{background:transparent;border:1px solid var(--border);color:var(--muted);
  font-size:10px;padding:4px 10px;border-radius:3px;cursor:pointer;transition:.15s;
  font-family:'Inter',sans-serif}
.card-btns button:hover{border-color:var(--gold);color:var(--gold)}

/* ROTEIROS */
.roteiros-list{display:flex;flex-direction:column;gap:16px;max-width:760px}
.roteiro-card{background:var(--card);border:1px solid var(--border);border-radius:6px;padding:18px 20px}
.roteiro-header{display:flex;align-items:center;gap:10px;margin-bottom:18px}
.roteiro-meta{font-size:11px;color:var(--muted);font-family:'IBM Plex Mono',monospace}
.rot-section{margin-bottom:14px}
.rot-section:last-child{margin-bottom:0}
.rot-label{font-family:'IBM Plex Mono',monospace;font-size:8px;letter-spacing:.2em;
  text-transform:uppercase;color:var(--muted2);margin-bottom:6px}
.rot-gancho{font-size:14px;font-weight:600;color:var(--text);line-height:1.4}
.rot-corpo{font-size:12px;color:#999;line-height:1.75;white-space:pre-line}
.rot-cta{font-size:12px;color:var(--gold);line-height:1.5;white-space:pre-line}

::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
</style>
</head>
<body>

<aside class="sidebar">
  <div class="sidebar-title">Gerador de Criativos</div>

  <div class="field">
    <label>Nome do Advogado</label>
    <input id="nomeAdvogado" type="text" placeholder="Dr. João Silva">
  </div>
  <div class="field">
    <label>Nome do Escritório</label>
    <input id="nomeEscritorio" type="text" placeholder="Silva Advocacia">
  </div>
  <div class="field">
    <label>OAB</label>
    <input id="oab" type="text" placeholder="SP 123456">
  </div>
  <div class="field">
    <label>WhatsApp</label>
    <input id="whatsapp" type="text" placeholder="(11) 99999-9999">
  </div>
  <div class="field">
    <label>Cidade / Estado</label>
    <input id="cidadeEstado" type="text" placeholder="São Paulo/SP">
  </div>
  <div class="field">
    <label>Cor Primária</label>
    <div class="color-row">
      <input id="corPrimaria" type="color" value="#D4A017">
      <div class="presets">
        <div class="swatch" style="background:#D4A017;border-color:#D4A01788" onclick="setCor('#D4A017')" title="Dourado"></div>
        <div class="swatch" style="background:#D4643C" onclick="setCor('#D4643C')" title="Coral"></div>
        <div class="swatch" style="background:#9B7FD4" onclick="setCor('#9B7FD4')" title="Roxo"></div>
        <div class="swatch" style="background:#3DBDA8" onclick="setCor('#3DBDA8')" title="Verde"></div>
        <div class="swatch" style="background:#4A9FC8" onclick="setCor('#4A9FC8')" title="Azul"></div>
      </div>
    </div>
  </div>

  <div class="sidebar-gap"></div>
  <button class="btn-gerar" id="btnGerar" onclick="gerar()">GERAR TUDO</button>
</aside>

<div class="main">
  <div class="tabs">
    <div class="tab active" data-tab="posts" onclick="showTab('posts')">Posts <span class="tab-count" id="cnt-posts"></span></div>
    <div class="tab" data-tab="visuais" onclick="showTab('visuais')">Visuais <span class="tab-count" id="cnt-visuais"></span></div>
    <div class="tab" data-tab="roteiros" onclick="showTab('roteiros')">Roteiros <span class="tab-count" id="cnt-roteiros"></span></div>
  </div>

  <div class="content" id="mainContent">
    <div class="empty" id="emptyState">
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width=".6">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
      <p>Preencha os dados e clique em Gerar Tudo</p>
    </div>

    <div id="tab-posts" class="tab-pane" style="display:none">
      <div class="posts-list" id="postsList"></div>
    </div>

    <div id="tab-visuais" class="tab-pane" style="display:none">
      <div class="visuais-grid" id="visuaisGrid"></div>
    </div>

    <div id="tab-roteiros" class="tab-pane" style="display:none">
      <div class="roteiros-list" id="roteirosList"></div>
    </div>
  </div>
</div>

<script>
var S = { posts:[], criativos:[], roteiros:[] };

function setCor(hex) {
  document.getElementById('corPrimaria').value = hex;
}

function showTab(id) {
  document.querySelectorAll('.tab').forEach(function(t){
    t.classList.toggle('active', t.dataset.tab === id);
  });
  document.querySelectorAll('.tab-pane').forEach(function(p){
    p.style.display = p.id === 'tab-' + id ? 'block' : 'none';
  });
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function badgeCls(tipo) {
  if (tipo === 'PROVA SOCIAL') return 'badge b-prova';
  if (tipo === 'AUTORIDADE') return 'badge b-auto';
  if (tipo === 'CTA DIRETO') return 'badge b-cta';
  return 'badge b-edu';
}

function cardCls(tipo) {
  if (tipo === 'PROVA SOCIAL') return 'post-card t-prova';
  if (tipo === 'AUTORIDADE') return 'post-card t-auto';
  if (tipo === 'CTA DIRETO') return 'post-card t-cta';
  return 'post-card t-edu';
}

async function gerar() {
  var dados = {
    nomeAdvogado: document.getElementById('nomeAdvogado').value.trim(),
    nomeEscritorio: document.getElementById('nomeEscritorio').value.trim(),
    oab: document.getElementById('oab').value.trim(),
    whatsapp: document.getElementById('whatsapp').value.trim(),
    cidadeEstado: document.getElementById('cidadeEstado').value.trim(),
    corPrimaria: document.getElementById('corPrimaria').value,
  };
  if (!dados.nomeAdvogado || !dados.whatsapp) {
    alert('Preencha ao menos o Nome do Advogado e o WhatsApp.');
    return;
  }
  var btn = document.getElementById('btnGerar');
  btn.disabled = true; btn.textContent = 'Gerando...';
  try {
    var res = await fetch('/api/gerar', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify(dados)
    });
    if (!res.ok) throw new Error('Erro ' + res.status);
    S = await res.json();
    renderPosts(S.posts);
    renderVisuais(S.criativos);
    renderRoteiros(S.roteiros);
    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('cnt-posts').textContent = S.posts.length;
    document.getElementById('cnt-visuais').textContent = S.criativos.length;
    document.getElementById('cnt-roteiros').textContent = S.roteiros.length;
    showTab('posts');
  } catch(e) {
    alert('Erro: ' + e.message);
  } finally {
    btn.disabled = false; btn.textContent = 'GERAR TUDO';
  }
}

function renderPosts(posts) {
  document.getElementById('postsList').innerHTML = posts.map(function(p, i) {
    return '<div class="' + cardCls(p.tipo) + '">' +
      '<div class="post-header">' +
        '<span class="post-num">' + String(p.num).padStart(2,'0') + '</span>' +
        '<span class="' + badgeCls(p.tipo) + '">' + p.tipo + '</span>' +
        '<button class="btn-copy" onclick="cpPost(' + i + ',this)">Copiar</button>' +
      '</div>' +
      '<div class="post-gancho">' + esc(p.gancho) + '</div>' +
      '<div class="post-corpo">' + esc(p.corpo) + '</div>' +
      '<div class="post-cta">📌 ' + esc(p.cta) + '</div>' +
      '<div class="post-hashtags">' + esc(p.hashtags) + '</div>' +
    '</div>';
  }).join('');
}

function cpPost(i, btn) {
  var p = S.posts[i];
  var t = p.gancho + '\\n\\n' + p.corpo + '\\n\\n' + p.cta + '\\n\\n' + p.hashtags;
  navigator.clipboard.writeText(t).then(function(){
    btn.textContent = '✓'; setTimeout(function(){ btn.textContent = 'Copiar'; }, 2000);
  });
}

function renderVisuais(crs) {
  document.getElementById('visuaisGrid').innerHTML = crs.map(function(c, i) {
    return '<div class="visual-item">' +
      '<div class="card-wrap" onclick="abrirCard(' + i + ')" title="Abrir em tamanho real">' +
        '<div class="card-inner">' + c.html + '</div>' +
      '</div>' +
      '<div class="card-label">' + String(c.num).padStart(2,'0') + ' · ' + c.titulo + '</div>' +
      '<div class="card-btns">' +
        '<button onclick="abrirCard(' + i + ')">Abrir ↗</button>' +
        '<button onclick="cpCard(' + i + ',this)">Copiar HTML</button>' +
      '</div>' +
    '</div>';
  }).join('');
}

function abrirCard(i) {
  var c = S.criativos[i];
  var p = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + c.titulo +
    '</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">' +
    '<style>body{margin:0;background:#080808;display:flex;align-items:center;justify-content:center;min-height:100vh;}</style>' +
    '</head><body>' + c.html + '</body></html>';
  window.open(URL.createObjectURL(new Blob([p],{type:'text/html'})), '_blank');
}

function cpCard(i, btn) {
  navigator.clipboard.writeText(S.criativos[i].html).then(function(){
    btn.textContent = '✓'; setTimeout(function(){ btn.textContent = 'Copiar HTML'; }, 2000);
  });
}

function renderRoteiros(rots) {
  document.getElementById('roteirosList').innerHTML = rots.map(function(r, i) {
    return '<div class="roteiro-card">' +
      '<div class="roteiro-header">' +
        '<span class="badge b-auto">' + r.tipo + '</span>' +
        '<span class="roteiro-meta">' + r.duracao + ' &middot; ' + esc(r.formato) + '</span>' +
        '<button class="btn-copy" onclick="cpRot(' + i + ',this)">Copiar</button>' +
      '</div>' +
      '<div class="rot-section"><div class="rot-label">GANCHO</div>' +
        '<div class="rot-gancho">' + esc(r.gancho) + '</div></div>' +
      '<div class="rot-section"><div class="rot-label">CORPO</div>' +
        '<div class="rot-corpo">' + esc(r.corpo) + '</div></div>' +
      '<div class="rot-section"><div class="rot-label">CTA</div>' +
        '<div class="rot-cta">' + esc(r.cta) + '</div></div>' +
    '</div>';
  }).join('');
}

function cpRot(i, btn) {
  var r = S.roteiros[i];
  var t = '[GANCHO]\\n' + r.gancho + '\\n\\n[CORPO]\\n' + r.corpo + '\\n\\n[CTA]\\n' + r.cta;
  navigator.clipboard.writeText(t).then(function(){
    btn.textContent = '✓'; setTimeout(function(){ btn.textContent = 'Copiar'; }, 2000);
  });
}
</script>
</body>
</html>`;
}

http.createServer(async function(req, res) {
  if (req.method === 'POST' && req.url === '/api/gerar') {
    try {
      const body = await readBody(req);
      const dados = JSON.parse(body.toString());
      const posts    = gerarPosts(dados);
      const roteiros = gerarRoteiros(dados);
      const criativos = gerarCriativosHTML(dados);
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ posts, roteiros, criativos }));
    } catch(e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(buildHTML());
}).listen(PORT, function() {
  console.log('\x1b[33m\x1b[1m Gerador de Criativos \xb7 Nicho Certo\x1b[0m');
  console.log(' → \x1b[36mhttp://localhost:' + PORT + '\x1b[0m\n');
});
