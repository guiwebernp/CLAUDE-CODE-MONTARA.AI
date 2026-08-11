const http = require('http');
const { exec } = require('child_process');
const PORT = 3232;

const HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>CRM · Nicho Certo</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0d0d0d; --panel:#141414; --card:#1a1a1a;
  --border:#222; --border2:#2e2e2e;
  --text:#fff; --muted:#666; --muted2:#444;
  --gold:#D4A017; --gold2:#e8be4a; --gold-dim:rgba(212,160,23,.10);
  --ok:#10b981; --ok-dim:rgba(16,185,129,.10);
  --alert:#ef4444; --alert-dim:rgba(239,68,68,.10);
  --blue:#3b82f6; --purple:#8b5cf6; --orange:#f97316;
}
html,body{height:100%;overflow:hidden;background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased}
body{display:flex;flex-direction:column}

/* ── ACTION BAR ── */
.action-bar{
  background:var(--panel);border-bottom:1px solid var(--border);
  display:flex;align-items:center;gap:16px;padding:0 24px;height:52px;flex-shrink:0;
}
.ab-stats{display:flex;align-items:center;gap:16px}
.ab-stat{display:flex;flex-direction:column;align-items:center;gap:1px}
.ab-stat-val{font-family:'IBM Plex Mono',monospace;font-size:15px;font-weight:500;color:var(--gold);line-height:1}
.ab-stat-lbl{font-size:8.5px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);font-family:'IBM Plex Mono',monospace}
.ab-sep{width:1px;height:24px;background:var(--border)}
.ab-spacer{flex:1}
.ab-search{
  background:var(--card);border:1px solid var(--border2);border-radius:5px;
  padding:7px 12px;color:var(--text);font-size:13px;outline:none;width:200px;
  font-family:'Inter',sans-serif;transition:.15s;
}
.ab-search:focus{border-color:rgba(212,160,23,.4)}
.ab-search::placeholder{color:var(--muted)}
.btn-novo{
  background:var(--gold);color:#0d0d0d;font-family:'Inter',sans-serif;
  font-size:13px;font-weight:700;padding:8px 16px;border-radius:5px;
  border:none;cursor:pointer;display:flex;align-items:center;gap:7px;
  transition:.15s;white-space:nowrap;
}
.btn-novo:hover{opacity:.88}

/* ── KANBAN ── */
.kanban{flex:1;display:flex;gap:0;overflow-x:auto;overflow-y:hidden;padding:0}
.kanban::-webkit-scrollbar{height:4px}
.kanban::-webkit-scrollbar-track{background:var(--bg)}
.kanban::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}

.col{
  flex:0 0 240px;display:flex;flex-direction:column;
  border-right:1px solid var(--border);
  transition:.15s;
}
.col:last-child{border-right:none;flex:0 0 260px}
.col.drag-over{background:rgba(212,160,23,.04)}
.col-header{
  padding:14px 16px 10px;flex-shrink:0;
  border-bottom:1px solid var(--border);
}
.col-title-row{display:flex;align-items:center;gap:8px;margin-bottom:4px}
.col-bar{width:3px;height:14px;border-radius:2px;flex:none}
.col-title{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.18em;text-transform:uppercase;font-weight:500}
.col-count{
  margin-left:auto;font-family:'IBM Plex Mono',monospace;font-size:10px;
  background:var(--card);border:1px solid var(--border2);border-radius:3px;
  padding:1px 6px;color:var(--muted);
}
.col-value{font-size:11px;color:var(--muted);font-family:'IBM Plex Mono',monospace}

.col-cards{
  flex:1;overflow-y:auto;padding:10px 10px 24px;
  display:flex;flex-direction:column;gap:7px;
}
.col-cards::-webkit-scrollbar{width:2px}
.col-cards::-webkit-scrollbar-thumb{background:var(--border2)}

/* ── CARD ── */
.card{
  background:var(--card);border:1px solid var(--border2);border-radius:7px;
  padding:12px;cursor:pointer;transition:.15s;
  display:flex;flex-direction:column;gap:8px;
  user-select:none;position:relative;
}
.card:hover{border-color:var(--border2);transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,.3)}
.card.dragging{opacity:.35;transform:scale(.97)}
.card.drag-placeholder{border:1px dashed var(--border2);background:transparent;opacity:.5}
.card--alert{border-color:rgba(239,68,68,.3);background:rgba(239,68,68,.04)}

.card-top{display:flex;align-items:flex-start;gap:6px}
.card-badge{
  font-family:'IBM Plex Mono',monospace;font-size:8px;letter-spacing:.08em;
  text-transform:uppercase;padding:3px 7px;border-radius:3px;
  font-weight:500;flex:none;line-height:1.4;margin-top:1px;
}
.badge--o1{background:rgba(212,160,23,.15);color:var(--gold2);border:1px solid rgba(212,160,23,.2)}
.badge--o2{background:rgba(59,130,246,.15);color:#60a5fa;border:1px solid rgba(59,130,246,.2)}
.badge--promo{background:rgba(16,185,129,.15);color:#34d399;border:1px solid rgba(16,185,129,.2)}
.card-dias{
  margin-left:auto;font-family:'IBM Plex Mono',monospace;font-size:9px;
  color:var(--muted);border-radius:3px;padding:2px 6px;background:var(--bg);
  border:1px solid var(--border);white-space:nowrap;
}
.card-dias--alert{background:var(--alert-dim);color:var(--alert);border-color:rgba(239,68,68,.25)}

.card-nome{font-size:13px;font-weight:600;line-height:1.3;flex:1}
.card-cidade{font-size:11.5px;color:var(--muted);display:flex;align-items:center;gap:5px}

.card-footer{display:flex;align-items:center;justify-content:space-between;margin-top:2px}
.card-data{font-family:'IBM Plex Mono',monospace;font-size:9.5px;color:var(--muted)}
.card-entregaveis{display:flex;gap:3px}
.card-dot{
  width:6px;height:6px;border-radius:50%;
  background:var(--border2);border:1px solid var(--border);
}
.card-dot--done{background:var(--ok);border-color:var(--ok)}

/* ── DROP ZONE vazia ── */
.col-empty{
  text-align:center;padding:24px 12px;color:var(--muted2);
  font-size:11.5px;border:1px dashed var(--border);border-radius:6px;
  line-height:1.6;margin:4px 0;
}

/* ── PANEL ── */
.backdrop{
  position:fixed;inset:0;background:rgba(0,0,0,.6);
  display:none;z-index:100;backdrop-filter:blur(2px);
}
.backdrop.show{display:block}

.panel{
  position:fixed;top:0;right:0;width:380px;height:100vh;
  background:var(--panel);border-left:1px solid var(--border);
  transform:translateX(100%);transition:transform .22s cubic-bezier(.25,.46,.45,.94);
  z-index:200;display:flex;flex-direction:column;overflow:hidden;
}
.panel.open{transform:translateX(0)}

.panel-header{
  display:flex;align-items:center;gap:10px;
  padding:16px 20px;border-bottom:1px solid var(--border);flex-shrink:0;
}
.panel-title{font-size:14px;font-weight:600;flex:1}
.panel-tag{
  font-family:'IBM Plex Mono',monospace;font-size:8.5px;letter-spacing:.1em;
  text-transform:uppercase;padding:3px 8px;border-radius:3px;
}
.panel-close{
  width:28px;height:28px;border-radius:4px;background:var(--card);
  border:1px solid var(--border);color:var(--muted);cursor:pointer;
  display:flex;align-items:center;justify-content:center;font-size:14px;
  transition:.15s;
}
.panel-close:hover{border-color:var(--alert);color:var(--alert)}

.panel-body{flex:1;overflow-y:auto;padding:20px}
.panel-body::-webkit-scrollbar{width:2px}
.panel-body::-webkit-scrollbar-thumb{background:var(--border2)}

/* Form inside panel */
.pf-section{margin-bottom:20px}
.pf-section-label{
  font-family:'IBM Plex Mono',monospace;font-size:8.5px;letter-spacing:.18em;
  text-transform:uppercase;color:var(--muted);opacity:.6;
  padding-bottom:8px;border-bottom:1px solid var(--border);margin-bottom:12px;
}
.pf-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.pf-grid--1{grid-template-columns:1fr}
.pf-field{display:flex;flex-direction:column;gap:4px}
.pf-label{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);font-family:'IBM Plex Mono',monospace}
.pf-input,.pf-select,.pf-textarea{
  background:var(--card);border:1px solid var(--border2);border-radius:4px;
  padding:8px 10px;color:var(--text);font-size:13px;outline:none;
  font-family:'Inter',sans-serif;transition:.15s;width:100%;
}
.pf-select{cursor:pointer}
.pf-textarea{resize:vertical;min-height:72px}
.pf-input:focus,.pf-select:focus,.pf-textarea:focus{border-color:rgba(212,160,23,.5)}
.pf-input::placeholder,.pf-textarea::placeholder{color:var(--muted);opacity:.4}
.pf-select option{background:#1a1a1a}

/* Checkboxes entregáveis */
.deliverables{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.deliv-item{
  display:flex;align-items:center;gap:8px;padding:8px 10px;
  background:var(--card);border:1px solid var(--border);border-radius:5px;
  cursor:pointer;transition:.15s;
}
.deliv-item:hover{border-color:var(--border2)}
.deliv-item.done{border-color:rgba(16,185,129,.3);background:var(--ok-dim)}
.deliv-check{
  width:14px;height:14px;border-radius:3px;border:1.5px solid var(--border2);
  display:flex;align-items:center;justify-content:center;flex:none;transition:.15s;
}
.deliv-item.done .deliv-check{background:var(--ok);border-color:var(--ok)}
.deliv-check svg{opacity:0;transition:.15s}
.deliv-item.done .deliv-check svg{opacity:1}
.deliv-name{font-size:12px;color:var(--muted)}
.deliv-item.done .deliv-name{color:var(--text)}

/* Etapa selector no panel */
.etapa-btns{display:flex;flex-wrap:wrap;gap:5px}
.etapa-btn{
  font-family:'IBM Plex Mono',monospace;font-size:8.5px;letter-spacing:.08em;
  text-transform:uppercase;padding:5px 10px;border-radius:4px;
  border:1px solid var(--border);background:transparent;color:var(--muted);
  cursor:pointer;transition:.15s;
}
.etapa-btn:hover{border-color:var(--border2);color:var(--text)}
.etapa-btn.active{border-color:var(--gold);color:var(--gold);background:var(--gold-dim)}

/* Panel footer */
.panel-footer{
  padding:14px 20px;border-top:1px solid var(--border);
  display:flex;gap:8px;flex-shrink:0;
}
.btn-save{
  flex:1;background:var(--gold);color:#0d0d0d;font-weight:700;
  padding:10px;border-radius:5px;border:none;cursor:pointer;font-size:13px;
  font-family:'Inter',sans-serif;transition:.15s;
}
.btn-save:hover{opacity:.88}
.btn-del{
  background:transparent;border:1px solid var(--border2);color:var(--muted);
  padding:10px 14px;border-radius:5px;cursor:pointer;font-size:12px;
  transition:.15s;
}
.btn-del:hover{border-color:var(--alert);color:var(--alert)}

::-webkit-scrollbar{width:3px;height:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}
</style>
</head>
<body>

<!-- ACTION BAR -->
<div class="action-bar">
  <div class="ab-stats">
    <div class="ab-stat"><span class="ab-stat-val" id="stat-total">0</span><span class="ab-stat-lbl">Leads</span></div>
    <div class="ab-sep"></div>
    <div class="ab-stat"><span class="ab-stat-val" id="stat-fechados">0</span><span class="ab-stat-lbl">Fechados</span></div>
    <div class="ab-sep"></div>
    <div class="ab-stat"><span class="ab-stat-val" id="stat-valor">R$ 0</span><span class="ab-stat-lbl">Em carteira</span></div>
  </div>
  <div class="ab-spacer"></div>
  <input class="ab-search" type="text" placeholder="Buscar advogado..." oninput="filtrar(this.value)">
  <button class="btn-novo" onclick="abrirNovo()">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    Novo Advogado
  </button>
</div>

<!-- KANBAN -->
<div class="kanban" id="kanban"></div>

<!-- BACKDROP -->
<div class="backdrop" id="backdrop" onclick="fecharPanel()"></div>

<!-- PANEL -->
<div class="panel" id="panel">
  <div class="panel-header">
    <span class="panel-title" id="panel-title">Novo Advogado</span>
    <span class="panel-tag" id="panel-tag" style="display:none"></span>
    <button class="panel-close" onclick="fecharPanel()">✕</button>
  </div>
  <div class="panel-body" id="panel-body"></div>
  <div class="panel-footer" id="panel-footer"></div>
</div>

<script>
// ── CONSTANTES ──────────────────────────────────────────────────────────────
var ETAPAS = [
  {id:'PROSPECTADO', cor:'#4A7FD4', label:'Prospectado'},
  {id:'QUALIFICADO',  cor:'#D4A017', label:'Qualificado'},
  {id:'EM CALL',      cor:'#f97316', label:'Em Call'},
  {id:'FECHADO',      cor:'#10b981', label:'Fechado'},
  {id:'EM ENTREGA',   cor:'#8b5cf6', label:'Em Entrega'},
  {id:'ENTREGUE',     cor:'#2D8A5A', label:'Entregue'},
];
var OFERTAS = ['Oferta 1','Oferta 2','Promoção'];
var DELIVERABLES = ['LP','Chatbot','Criativos','Roteiros','Radar','Tráfego'];
var COMO_CHEGOU = ['Instagram','Indicação','Google','LinkedIn','YouTube','Outro'];

// ── DADOS ────────────────────────────────────────────────────────────────────
var db = [];
var panelCardId = null;
var panelMode = null; // 'detail' | 'novo'
var dragId = null;
var filtro = '';

function loadDB() {
  try {
    var raw = localStorage.getItem('nc-crm-v1');
    if (raw) db = JSON.parse(raw);
    if (!db.length) db = sampleData();
  } catch(e) { db = sampleData(); }
}
function saveDB() {
  try { localStorage.setItem('nc-crm-v1', JSON.stringify(db)); } catch(e) {}
}
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,6);
}

function sampleData() {
  var now = new Date();
  function daysAgo(d) { return new Date(now - d*86400000).toISOString(); }
  return [
    {id:uid(),nome:'Dr. Carlos Mendes',oab:'SP 123456',cidade:'São Paulo/SP',wa:'5511999990001',email:'carlos@advocacia.com',ig:'@carlosmendes',comoChegou:'Instagram',oferta:'Oferta 1',valor:null,dataFechamento:null,notas:'Viu o anúncio no Instagram. Muito interesse.',etapa:'PROSPECTADO',dataEntrada:daysAgo(5),dataEtapa:daysAgo(5),entregaveis:{LP:false,Chatbot:false,Criativos:false,Roteiros:false,Radar:false,'Tráfego':false}},
    {id:uid(),nome:'Dra. Ana Ribeiro',oab:'MG 87654',cidade:'Belo Horizonte/MG',wa:'5531999990002',email:'ana@ribeiro.adv.br',ig:'@anaribeiro.adv',comoChegou:'Indicação',oferta:'Oferta 2',valor:null,dataFechamento:null,notas:'Indicação do Carlos Mendes.',etapa:'PROSPECTADO',dataEntrada:daysAgo(1),dataEtapa:daysAgo(1),entregaveis:{LP:false,Chatbot:false,Criativos:false,Roteiros:false,Radar:false,'Tráfego':false}},
    {id:uid(),nome:'Dr. Ricardo Lima',oab:'RS 45678',cidade:'Porto Alegre/RS',wa:'5551999990003',email:'ricardo@lima.adv.br',ig:'@drricardolima',comoChegou:'Google',oferta:'Promoção',valor:null,dataFechamento:null,notas:'Pesquisou pelo Google. Já tem clientes de ludopatia.',etapa:'QUALIFICADO',dataEntrada:daysAgo(4),dataEtapa:daysAgo(2),entregaveis:{LP:false,Chatbot:false,Criativos:false,Roteiros:false,Radar:false,'Tráfego':false}},
    {id:uid(),nome:'Dr. Fernando Costa',oab:'RJ 11223',cidade:'Rio de Janeiro/RJ',wa:'5521999990004',email:'fcosta@advocacia.com',ig:'@fernandocosta.adv',comoChegou:'LinkedIn',oferta:'Oferta 1',valor:null,dataFechamento:null,notas:'Agende call para quinta-feira às 14h.',etapa:'EM CALL',dataEntrada:daysAgo(6),dataEtapa:daysAgo(0),entregaveis:{LP:false,Chatbot:false,Criativos:false,Roteiros:false,Radar:false,'Tráfego':false}},
    {id:uid(),nome:'Dra. Mariana Souza',oab:'PR 33445',cidade:'Curitiba/PR',wa:'5541999990005',email:'mariana@souza.adv.br',ig:'@dramariana',comoChegou:'Instagram',oferta:'Oferta 1',valor:2800,dataFechamento:daysAgo(8),notas:'Fechou. Aguardando contrato assinado.',etapa:'FECHADO',dataEntrada:daysAgo(12),dataEtapa:daysAgo(8),entregaveis:{LP:false,Chatbot:false,Criativos:false,Roteiros:false,Radar:false,'Tráfego':false}},
    {id:uid(),nome:'Dr. Paulo Santos',oab:'BA 55667',cidade:'Salvador/BA',wa:'5571999990006',email:'paulo@santos.adv.br',ig:'@drpaulosantos',comoChegou:'Indicação',oferta:'Oferta 2',valor:3500,dataFechamento:daysAgo(10),notas:'LP em revisão. Chatbot pendente.',etapa:'EM ENTREGA',dataEntrada:daysAgo(14),dataEtapa:daysAgo(4),entregaveis:{LP:true,Chatbot:false,Criativos:false,Roteiros:false,Radar:false,'Tráfego':false}},
    {id:uid(),nome:'Dra. Luisa Ferreira',oab:'PE 77889',cidade:'Recife/PE',wa:'5581999990007',email:'luisa@ferreira.adv.br',ig:'@dra.luisaferreira',comoChegou:'Instagram',oferta:'Oferta 1',valor:2800,dataFechamento:daysAgo(21),notas:'Entrega concluída. Cliente satisfeita.',etapa:'ENTREGUE',dataEntrada:daysAgo(28),dataEtapa:daysAgo(7),entregaveis:{LP:true,Chatbot:true,Criativos:true,Roteiros:true,Radar:false,'Tráfego':false}},
    {id:uid(),nome:'Dr. Marcos Oliveira',oab:'GO 99001',cidade:'Goiânia/GO',wa:'5562999990008',email:'marcos@oliveira.adv',ig:'@marcosoliv.adv',comoChegou:'YouTube',oferta:'Promoção',valor:1900,dataFechamento:daysAgo(5),notas:'Entrega completa. Pediu tráfego pago.',etapa:'ENTREGUE',dataEntrada:daysAgo(20),dataEtapa:daysAgo(3),entregaveis:{LP:true,Chatbot:true,Criativos:true,Roteiros:true,Radar:true,'Tráfego':false}},
  ];
}

// ── UTILS ────────────────────────────────────────────────────────────────────
function diasNaEtapa(iso) {
  return Math.floor((Date.now() - new Date(iso)) / 86400000);
}
function fmtData(iso) {
  var d = new Date(iso);
  return d.toLocaleDateString('pt-BR',{day:'2-digit',month:'short'});
}
function badgeClass(oferta) {
  if (oferta === 'Oferta 1') return 'badge--o1';
  if (oferta === 'Oferta 2') return 'badge--o2';
  return 'badge--promo';
}
function etapaCor(id) {
  var e = ETAPAS.find(function(x){return x.id===id;}); return e ? e.cor : '#666';
}

// ── RENDER ───────────────────────────────────────────────────────────────────
function render() {
  var kanban = document.getElementById('kanban');
  kanban.innerHTML = '';

  var filtrados = filtro
    ? db.filter(function(a){return a.nome.toLowerCase().includes(filtro.toLowerCase()) || a.cidade.toLowerCase().includes(filtro.toLowerCase());})
    : db;

  ETAPAS.forEach(function(etapa) {
    var cards = filtrados.filter(function(a){return a.etapa === etapa.id;});

    var col = document.createElement('div');
    col.className = 'col';
    col.id = 'col-' + etapa.id;

    var valor = cards.reduce(function(s,a){return s+(a.valor||0);},0);
    var valorStr = valor > 0 ? 'R$ '+(valor/1000).toFixed(1).replace('.',',')+'k' : '';

    col.innerHTML =
      '<div class="col-header">'
      +'<div class="col-title-row">'
      +'<span class="col-bar" style="background:'+etapa.cor+'"></span>'
      +'<span class="col-title" style="color:'+etapa.cor+'">'+etapa.label+'</span>'
      +'<span class="col-count">'+cards.length+'</span>'
      +'</div>'
      +(valorStr?'<div class="col-value">'+valorStr+'</div>':'')
      +'</div>'
      +'<div class="col-cards" id="cards-'+etapa.id+'"></div>';

    col.addEventListener('dragover', function(e){
      e.preventDefault(); e.dataTransfer.dropEffect='move';
      document.querySelectorAll('.col').forEach(function(c){c.classList.remove('drag-over');});
      col.classList.add('drag-over');
    });
    col.addEventListener('dragleave', function(e){
      if (!col.contains(e.relatedTarget)) col.classList.remove('drag-over');
    });
    col.addEventListener('drop', function(e){
      e.preventDefault();
      col.classList.remove('drag-over');
      if (dragId) moverCard(dragId, etapa.id);
    });

    kanban.appendChild(col);

    var cardsEl = col.querySelector('.col-cards');

    if (cards.length === 0) {
      cardsEl.innerHTML = '<div class="col-empty">Nenhum advogado<br>nesta etapa</div>';
    } else {
      cards.forEach(function(a){ cardsEl.appendChild(buildCard(a)); });
    }
  });

  updateStats();
}

function buildCard(a) {
  var dias = diasNaEtapa(a.dataEtapa);
  var alert = dias > 3;
  var doneCount = Object.values(a.entregaveis).filter(Boolean).length;
  var totalDeliv = Object.keys(a.entregaveis).length;

  var card = document.createElement('div');
  card.className = 'card' + (alert ? ' card--alert' : '');
  card.id = 'card-' + a.id;
  card.draggable = true;

  var dotsHtml = Object.entries(a.entregaveis).map(function(kv){
    return '<span class="card-dot'+(kv[1]?' card-dot--done':'')+'" title="'+kv[0]+'"></span>';
  }).join('');

  card.innerHTML =
    '<div class="card-top">'
    +'<span class="card-badge '+badgeClass(a.oferta)+'">'+a.oferta+'</span>'
    +'<span class="card-dias'+(alert?' card-dias--alert':'')+'" title="Dias nesta etapa">'+dias+'d</span>'
    +'</div>'
    +'<div class="card-nome">'+a.nome+'</div>'
    +'<div class="card-cidade">'
    +'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity=".4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>'
    +a.cidade
    +'</div>'
    +'<div class="card-footer">'
    +'<span class="card-data">'+fmtData(a.dataEntrada)+'</span>'
    +'<div class="card-entregaveis">'+dotsHtml+'</div>'
    +'</div>';

  card.addEventListener('dragstart', function(e){
    dragId = a.id;
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(function(){ card.classList.add('dragging'); }, 0);
  });
  card.addEventListener('dragend', function(){
    card.classList.remove('dragging');
    dragId = null;
    document.querySelectorAll('.col').forEach(function(c){c.classList.remove('drag-over');});
  });
  card.addEventListener('click', function(){ abrirDetalhe(a.id); });

  return card;
}

function updateStats() {
  document.getElementById('stat-total').textContent = db.length;
  var fechados = db.filter(function(a){return a.etapa==='FECHADO'||a.etapa==='EM ENTREGA'||a.etapa==='ENTREGUE';});
  document.getElementById('stat-fechados').textContent = fechados.length;
  var valor = db.reduce(function(s,a){return s+(a.valor||0);},0);
  document.getElementById('stat-valor').textContent = valor > 0 ? 'R$ '+(valor/1000).toFixed(0)+'k' : 'R$ 0';
}

// ── DRAG ────────────────────────────────────────────────────────────────────
function moverCard(id, novaEtapa) {
  var a = db.find(function(x){return x.id===id;});
  if (!a || a.etapa === novaEtapa) return;
  a.etapa = novaEtapa;
  a.dataEtapa = new Date().toISOString();
  saveDB(); render();
}

// ── FILTRO ───────────────────────────────────────────────────────────────────
function filtrar(v) { filtro = v; render(); }

// ── PANEL ────────────────────────────────────────────────────────────────────
function abrirPanel() {
  document.getElementById('panel').classList.add('open');
  document.getElementById('backdrop').classList.add('show');
}
function fecharPanel() {
  document.getElementById('panel').classList.remove('open');
  document.getElementById('backdrop').classList.remove('show');
  panelCardId = null; panelMode = null;
}
document.addEventListener('keydown', function(e){ if(e.key==='Escape') fecharPanel(); });

// ── DETALHE DO CARD ──────────────────────────────────────────────────────────
function abrirDetalhe(id) {
  var a = db.find(function(x){return x.id===id;});
  if (!a) return;
  panelCardId = id; panelMode = 'detail';

  var tag = document.getElementById('panel-tag');
  tag.textContent = a.etapa;
  tag.style.cssText = 'background:'+hexToRgba(etapaCor(a.etapa),.12)+';color:'+etapaCor(a.etapa)+';border:1px solid '+hexToRgba(etapaCor(a.etapa),.25)+';display:inline-flex;font-family:"IBM Plex Mono",monospace;font-size:8.5px;letter-spacing:.1em;text-transform:uppercase;padding:3px 8px;border-radius:3px';
  document.getElementById('panel-title').textContent = a.nome;

  var etapaBtns = ETAPAS.map(function(e){
    return '<button class="etapa-btn'+(a.etapa===e.id?' active':'')+'" onclick="mudarEtapa(\''+e.id+'\')">'+e.label+'</button>';
  }).join('');

  var delivHtml = DELIVERABLES.map(function(d){
    var done = a.entregaveis[d] || false;
    return '<div class="deliv-item'+(done?' done':'')+'" onclick="toggleDeliv(\''+d+'\')" id="deliv-'+d+'">'
      +'<div class="deliv-check"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>'
      +'<span class="deliv-name">'+d+'</span>'
      +'</div>';
  }).join('');

  document.getElementById('panel-body').innerHTML =
    '<div class="pf-section">'
    +'<div class="pf-section-label">Etapa do pipeline</div>'
    +'<div class="etapa-btns">'+etapaBtns+'</div>'
    +'</div>'

    +'<div class="pf-section">'
    +'<div class="pf-section-label">Dados de contato</div>'
    +'<div class="pf-grid">'
    +pField('nome','Nome',a.nome)
    +pField('oab','OAB',a.oab)
    +pField('cidade','Cidade',a.cidade)
    +pField('wa','WhatsApp',a.wa,'tel')
    +pField('email','Email',a.email,'email')
    +pField('ig','Instagram',a.ig)
    +'</div>'
    +'</div>'

    +'<div class="pf-section">'
    +'<div class="pf-section-label">Comercial</div>'
    +'<div class="pf-grid">'
    +pSelect('oferta','Oferta',a.oferta,OFERTAS)
    +pField('valor','Valor (R$)',a.valor||'','number')
    +pField('dataFechamento','Data fechamento',a.dataFechamento?a.dataFechamento.slice(0,10):'','date')
    +pSelect('comoChegou','Como chegou',a.comoChegou,COMO_CHEGOU)
    +'</div>'
    +'</div>'

    +'<div class="pf-section">'
    +'<div class="pf-section-label">Entregáveis</div>'
    +'<div class="deliverables">'+delivHtml+'</div>'
    +'</div>'

    +'<div class="pf-section">'
    +'<div class="pf-section-label">Notas</div>'
    +'<textarea class="pf-textarea" id="pf-notas" placeholder="Observações, próximos passos...">'+a.notas+'</textarea>'
    +'</div>';

  document.getElementById('panel-footer').innerHTML =
    '<button class="btn-save" onclick="salvarDetalhe()">Salvar alterações</button>'
    +'<button class="btn-del" onclick="excluirCard()">Excluir</button>';

  abrirPanel();
}

function pField(id, label, val, type) {
  return '<div class="pf-field"><label class="pf-label">'+label+'</label>'
    +'<input class="pf-input" id="pf-'+id+'" type="'+(type||'text')+'" value="'+(val||'')+'" placeholder="'+label+'"></div>';
}
function pSelect(id, label, val, opts) {
  var options = opts.map(function(o){return '<option value="'+o+'"'+(o===val?' selected':'')+'>'+o+'</option>';}).join('');
  return '<div class="pf-field"><label class="pf-label">'+label+'</label>'
    +'<select class="pf-select" id="pf-'+id+'">'+options+'</select></div>';
}

function mudarEtapa(novaEtapa) {
  if (!panelCardId) return;
  var a = db.find(function(x){return x.id===panelCardId;});
  if (!a) return;
  a.etapa = novaEtapa;
  a.dataEtapa = new Date().toISOString();
  saveDB(); render();
  fecharPanel();
  setTimeout(function(){ abrirDetalhe(panelCardId||a.id); }, 50);
  panelCardId = a.id;
}

function toggleDeliv(nome) {
  var a = db.find(function(x){return x.id===panelCardId;});
  if (!a) return;
  a.entregaveis[nome] = !a.entregaveis[nome];
  var el = document.getElementById('deliv-'+nome);
  if (el) el.classList.toggle('done', a.entregaveis[nome]);
  saveDB(); render();
}

function salvarDetalhe() {
  var a = db.find(function(x){return x.id===panelCardId;});
  if (!a) return;
  a.nome = v('pf-nome') || a.nome;
  a.oab  = v('pf-oab');
  a.cidade = v('pf-cidade');
  a.wa   = v('pf-wa');
  a.email = v('pf-email');
  a.ig   = v('pf-ig');
  a.oferta = v('pf-oferta');
  a.comoChegou = v('pf-comoChegou');
  var val = parseFloat(v('pf-valor'));
  a.valor = isNaN(val) ? null : val;
  a.dataFechamento = v('pf-dataFechamento') || null;
  a.notas = v('pf-notas');
  saveDB(); render(); fecharPanel();
}

function excluirCard() {
  if (!confirm('Excluir este advogado?')) return;
  db = db.filter(function(x){return x.id !== panelCardId;});
  saveDB(); render(); fecharPanel();
}

// ── NOVO ADVOGADO ────────────────────────────────────────────────────────────
function abrirNovo() {
  panelMode = 'novo'; panelCardId = null;
  document.getElementById('panel-title').textContent = 'Novo Advogado';
  var tag = document.getElementById('panel-tag');
  tag.style.display = 'none';

  document.getElementById('panel-body').innerHTML =
    '<div class="pf-section">'
    +'<div class="pf-section-label">Dados do advogado</div>'
    +'<div class="pf-grid">'
    +pField('nome','Nome *','')
    +pField('oab','OAB','')
    +pField('cidade','Cidade/Estado','')
    +pField('wa','WhatsApp','','tel')
    +pField('email','Email','','email')
    +pField('ig','Instagram','')
    +'</div>'
    +'</div>'
    +'<div class="pf-section">'
    +'<div class="pf-section-label">Qualificação</div>'
    +'<div class="pf-grid">'
    +pSelect('comoChegou','Como chegou','Instagram',COMO_CHEGOU)
    +pSelect('oferta','Oferta de interesse','Oferta 1',OFERTAS)
    +'</div>'
    +'</div>'
    +'<div class="pf-section">'
    +'<div class="pf-section-label">Notas</div>'
    +'<div class="pf-grid--1"><div class="pf-field">'
    +'<textarea class="pf-textarea" id="pf-notas" placeholder="Observações iniciais, como veio, o que busca..."></textarea>'
    +'</div></div>'
    +'</div>';

  document.getElementById('panel-footer').innerHTML =
    '<button class="btn-save" onclick="salvarNovo()">Adicionar ao pipeline</button>';

  abrirPanel();
  setTimeout(function(){ var el=document.getElementById('pf-nome'); if(el)el.focus(); }, 200);
}

function salvarNovo() {
  var nome = v('pf-nome');
  if (!nome) { alert('Informe o nome do advogado.'); return; }
  var entregaveis = {};
  DELIVERABLES.forEach(function(d){ entregaveis[d] = false; });
  var a = {
    id: uid(), nome: nome,
    oab: v('pf-oab'), cidade: v('pf-cidade'), wa: v('pf-wa'),
    email: v('pf-email'), ig: v('pf-ig'),
    comoChegou: v('pf-comoChegou') || 'Instagram',
    oferta: v('pf-oferta') || 'Oferta 1',
    valor: null, dataFechamento: null,
    notas: v('pf-notas'),
    etapa: 'PROSPECTADO',
    dataEntrada: new Date().toISOString(),
    dataEtapa: new Date().toISOString(),
    entregaveis: entregaveis,
  };
  db.unshift(a);
  saveDB(); render(); fecharPanel();
}

// ── HELPERS ──────────────────────────────────────────────────────────────────
function v(id) { var el=document.getElementById(id); return el ? el.value.trim() : ''; }
function hexToRgba(hex, alpha) {
  var r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
  return 'rgba('+r+','+g+','+b+','+alpha+')';
}

// ── INIT ─────────────────────────────────────────────────────────────────────
loadDB(); render();
</script>
</body>
</html>`;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(HTML);
}).listen(PORT, () => {
  console.log(' CRM → http://localhost:' + PORT);
});
