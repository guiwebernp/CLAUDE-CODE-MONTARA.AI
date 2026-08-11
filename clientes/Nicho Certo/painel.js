const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { gerarLP } = require('./skills/skill-lp');
const { copies } = require('./skills/copies');

const PORT = 3131;
const ROOT = __dirname;

try {
  fs.readFileSync(path.join(ROOT,'.env'),'utf8').split('\n').forEach(l=>{
    const [k,...v]=l.split('='); if(k&&v.length) process.env[k.trim()]=v.join('=').trim().replace(/^["']|["']$/g,'');
  });
} catch {}

function mime(ext){ return ({'.html':'text/html; charset=utf-8','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.gif':'image/gif','.svg':'image/svg+xml'})[ext]||'application/octet-stream'; }
function qs(url){ const o={},i=url.indexOf('?'); if(i<0)return o; url.slice(i+1).split('&').forEach(p=>{const[k,...v]=p.split('=');if(k)o[decodeURIComponent(k)]=decodeURIComponent(v.join('=')||'');}); return o; }
function pathname(url){ return url.split('?')[0]; }
function readBody(req){ return new Promise((res,rej)=>{const c=[];req.on('data',d=>c.push(d));req.on('end',()=>res(Buffer.concat(c)));req.on('error',rej);}); }
function staticFile(res,fp){ try{const d=fs.readFileSync(fp);res.writeHead(200,{'Content-Type':mime(path.extname(fp).toLowerCase())});res.end(d);}catch{res.writeHead(404);res.end('');} }
function json(res,data,status=200){ res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify(data)); }
function listarClientes(){ const dir=path.join(ROOT,'clientes'); if(!fs.existsSync(dir))return []; return fs.readdirSync(dir).filter(d=>d!=='_preview-designs'&&fs.existsSync(path.join(dir,d,'index.html'))).map(d=>{try{const c=JSON.parse(fs.readFileSync(path.join(dir,d,'config.json'),'utf8'));return{slug:d,nome:c.nomeAdvogado,design:c.design,geradoEm:c.geradoEm};}catch{return{slug:d,nome:d,design:'—',geradoEm:null};}}); }

async function callClaude(apiKey,system,user){
  return new Promise((resolve,reject)=>{
    const body=JSON.stringify({model:'claude-sonnet-4-6',max_tokens:8192,system,messages:[{role:'user',content:user}]});
    const req=https.request({hostname:'api.anthropic.com',path:'/v1/messages',method:'POST',headers:{'x-api-key':apiKey,'anthropic-version':'2023-06-01','content-type':'application/json','content-length':Buffer.byteLength(body)}},(res)=>{
      let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{const j=JSON.parse(d);if(j.error)reject(new Error(j.error.message));else resolve(j.content[0].text);}catch(e){reject(e);}});
    });
    req.on('error',reject);req.write(body);req.end();
  });
}

const designFamilias = [
  {nome:'Noturno',    ids:[1,2,3,4],    cor:'#D4A853',desc:'Fundo escuro · extrato bancário no hero'},
  {nome:'Aço',        ids:[5,6,7,8],    cor:'#4A9FC8',desc:'Fundo navy · hero centralizado full-screen'},
  {nome:'Editorial',  ids:[9,10,11,12], cor:'#2D5A3D',desc:'Fundo creme · estilo jornal jurídico'},
  {nome:'Narrativa',  ids:[13,14,15,16],cor:'#9B7FD4',desc:'Coluna estreita · headline gigante'},
  {nome:'Impacto',    ids:[17,18,19,20],cor:'#E07860',desc:'Split 50/50 · contador animado · quiz chat'},
  {nome:'Clínico',    ids:[21,22,23,24],cor:'#1A6B4A',desc:'Fundo branco · checklist · CTA lateral'},
  {nome:'Urgência',   ids:[25,26,27,28],cor:'#C0392B',desc:'Banner de alerta · tipografia condensada'},
  {nome:'Minimalista',ids:[29,30,31,32],cor:'#1C1C1C',desc:'Lora serif · coluna estreita · sem ornamento'},
];
const coresNome = [
  'Dourado','Coral','Roxo','Esmeralda',
  'Azul','Teal','Índigo','Prata',
  'Verde','Índigo','Vinho','Âmbar',
  'Dourado','Coral','Roxo','Teal',
  'Dourado','Coral','Roxo','Teal',
  'Verde','Azul','Vinho','Grafite',
  'Vermelho','Âmbar','Roxo','Teal',
  'Verde','Preto','Azul','Vinho',
];

const EDITOR_INJECT_CSS = `
  [data-nc-edit]:hover { outline: 2px dashed rgba(212,168,83,.45) !important; outline-offset:2px; cursor:text; }
  [data-nc-edit]:focus { outline: 2px solid rgba(212,168,83,.85) !important; outline-offset:2px; background:rgba(212,168,83,.04); }
  [data-nc-edit] { transition: outline .1s; }
`;

const HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Criador de Landing Page \xb7 Nicho Certo</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#080C10;--bg2:#0F1418;--bg3:#161C22;
  --border:rgba(255,255,255,.07);--border2:rgba(255,255,255,.13);
  --text:#E0E8EC;--muted:#5A7A8A;
  --gold:#D4A853;--gold2:#E8C87C;--gold-dim:rgba(212,168,83,.10);
  --green-ok:#2D8A5A;--red-c:rgba(224,120,96,.9);
}
html,body{height:100%;overflow:hidden}
body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;display:grid;grid-template-rows:52px 1fr}
.topbar{background:var(--bg2);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 20px;gap:12px}
.topbar-logo{font-family:'Playfair Display',serif;font-size:17px;font-style:italic;color:var(--gold);white-space:nowrap}
.topbar-sep{color:var(--border2)}
.topbar-product{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.topbar-right{margin-left:auto;display:flex;gap:8px;align-items:center}
.tb-tag{font-family:'IBM Plex Mono',monospace;font-size:9px;padding:3px 8px;border-radius:3px;background:var(--gold-dim);color:var(--gold2);border:1px solid rgba(212,168,83,.2)}
.tb-btn{font-family:'IBM Plex Mono',monospace;font-size:10px;padding:5px 12px;border-radius:4px;border:1px solid var(--border2);color:var(--muted);background:transparent;cursor:pointer;transition:.15s}
.tb-btn:hover{border-color:var(--gold);color:var(--gold)}
.main{display:grid;grid-template-columns:360px 1fr;overflow:hidden}
.sidebar{background:var(--bg2);border-right:1px solid var(--border);display:flex;flex-direction:column;overflow:hidden}
.s-tabs{display:flex;border-bottom:1px solid var(--border);flex-shrink:0}
.stab{flex:1;padding:11px 6px;font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);background:transparent;border:none;border-bottom:2px solid transparent;cursor:pointer;transition:.15s}
.stab.active{color:var(--gold);border-bottom-color:var(--gold)}
.tab-panel{display:none;flex:1;overflow-y:auto;padding:18px;flex-direction:column;gap:12px}
.tab-panel.active{display:flex}
.form-section{display:flex;flex-direction:column;gap:10px}
.section-label{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);opacity:.6;padding:6px 0 2px;border-bottom:1px solid var(--border)}
.field{display:flex;flex-direction:column;gap:4px}
.field label{font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.field input[type=text],.field input[type=tel],.field textarea{background:var(--bg3);border:1px solid var(--border);border-radius:4px;padding:9px 11px;color:var(--text);font-family:'Inter',sans-serif;font-size:13px;outline:none;transition:.15s;width:100%;resize:none}
.field input:focus,.field textarea:focus{border-color:rgba(212,168,83,.4)}
.field input::placeholder,.field textarea::placeholder{color:var(--muted);opacity:.45}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.color-row{display:flex;align-items:center;gap:10px}
.color-input{width:36px;height:36px;border-radius:4px;border:1px solid var(--border2);cursor:pointer;background:transparent;padding:2px}
.color-label{font-size:13px;color:var(--text);flex:1}
.color-reset{font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--muted);background:none;border:none;cursor:pointer;padding:2px;transition:.15s}
.color-reset:hover{color:var(--gold)}
.upload-drop{border:1px dashed var(--border2);border-radius:6px;padding:12px;text-align:center;cursor:pointer;transition:.2s;position:relative;overflow:hidden;min-height:64px;display:flex;align-items:center;justify-content:center}
.upload-drop:hover{border-color:rgba(212,168,83,.4);background:var(--gold-dim)}
.upload-drop input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%}
.upload-placeholder{display:flex;flex-direction:column;align-items:center;gap:4px;pointer-events:none}
.upload-placeholder .icon{font-size:20px;opacity:.4}
.upload-placeholder .lbl{font-size:11px;color:var(--muted)}
.upload-preview{display:none;align-items:center;gap:9px;width:100%;pointer-events:none}
.upload-preview img{width:40px;height:40px;border-radius:4px;object-fit:cover;border:1px solid var(--border2);flex:none}
.upload-preview-logo img{border-radius:2px;object-fit:contain;background:rgba(255,255,255,.05)}
.upload-info{flex:1;min-width:0;text-align:left}
.upload-name{font-size:12px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.upload-size{font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--muted);margin-top:1px}
.upload-rm{background:none;border:none;color:var(--muted);cursor:pointer;font-size:13px;padding:4px;pointer-events:all;position:relative;z-index:2}
.upload-rm:hover{color:#E07860}
.btn-gerar{margin-top:4px;padding:12px;border-radius:4px;background:var(--gold);color:#080C10;font-family:'Inter',sans-serif;font-size:14px;font-weight:700;border:none;cursor:pointer;width:100%;transition:.2s;display:flex;align-items:center;justify-content:center;gap:8px}
.btn-gerar:hover{opacity:.87}.btn-gerar:disabled{opacity:.4;cursor:not-allowed}
.result-card{background:var(--bg3);border:1px solid rgba(212,168,83,.2);border-radius:6px;padding:14px;display:none;flex-direction:column;gap:9px}
.result-card.show{display:flex}
.rl{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.rv{font-size:13px;color:var(--text);font-weight:500;margin-top:1px}
.result-btns{display:flex;gap:8px;margin-top:2px}
.rb{flex:1;padding:8px;border-radius:4px;font-size:12px;font-weight:600;cursor:pointer;transition:.15s;border:none;text-align:center}
.rb-g{background:var(--gold);color:#080C10}.rb-g:hover{opacity:.87}
.rb-f{background:var(--bg2);border:1px solid var(--border2);color:var(--text)}.rb-f:hover{border-color:var(--gold);color:var(--gold)}
.err{background:rgba(224,120,96,.1);border:1px solid rgba(224,120,96,.25);border-radius:4px;padding:9px 12px;font-size:12px;color:#E07860;display:none;line-height:1.5}
.err.show{display:block}
.spinner{display:inline-block;width:13px;height:13px;border:2px solid rgba(8,12,16,.3);border-top-color:#080C10;border-radius:50%;animation:spin .7s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.cli-item{background:var(--bg3);border:1px solid var(--border);border-radius:5px;padding:11px 13px;display:flex;align-items:center;gap:9px;cursor:pointer;transition:.15s}
.cli-item:hover{border-color:var(--border2)}
.cli-dot{width:7px;height:7px;border-radius:50%;background:var(--gold);flex:none}
.cli-info{flex:1;min-width:0}
.cli-nome{font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cli-design{font-family:'IBM Plex Mono',monospace;font-size:9.5px;color:var(--muted);margin-top:1px}
.empty{text-align:center;padding:36px 12px;font-size:13px;color:var(--muted);line-height:1.7}
.right{display:flex;flex-direction:column;overflow:hidden}
.r-tabs{display:flex;border-bottom:1px solid var(--border);flex-shrink:0}
.rtab{padding:13px 18px;font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);background:transparent;border:none;border-bottom:2px solid transparent;cursor:pointer;transition:.15s;display:flex;align-items:center;gap:7px;white-space:nowrap}
.rtab.active{color:var(--gold);border-bottom-color:var(--gold)}
.badge{background:var(--gold-dim);color:var(--gold2);border:1px solid rgba(212,168,83,.2);border-radius:3px;font-size:8.5px;padding:1px 5px}
.r-content{flex:1;overflow:hidden;position:relative}
.rpanel{position:absolute;inset:0;overflow-y:auto;padding:22px;display:none}
.rpanel.active{display:block}
/* design */
.familia-block{margin-bottom:28px}.familia-hd{display:flex;align-items:center;gap:9px;margin-bottom:12px;flex-wrap:wrap}
.familia-dot{width:9px;height:9px;border-radius:50%;flex:none}
.familia-nome{font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase}
.familia-desc{font-size:11.5px;color:var(--muted);flex:1}
.sort-btn{font-family:'IBM Plex Mono',monospace;font-size:9.5px;padding:4px 11px;border:1px solid var(--border2);border-radius:4px;background:transparent;color:var(--muted);cursor:pointer;transition:.15s;margin-left:auto}
.sort-btn:hover{border-color:var(--gold);color:var(--gold)}
.design-row{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.dc{border-radius:5px;overflow:hidden;border:2px solid var(--border);cursor:pointer;transition:.15s;background:var(--bg3)}
.dc:hover{border-color:var(--border2);transform:translateY(-2px)}.dc.selected{border-color:var(--gold);box-shadow:0 0 0 1px var(--gold)}
.iframe-wrap{width:100%;height:120px;overflow:hidden;pointer-events:none}
.iframe-wrap iframe{width:1100px;height:900px;transform:scale(0.182);transform-origin:top left;border:none}
.dc-info{padding:7px 9px;border-top:1px solid var(--border)}
.dc-num{font-family:'IBM Plex Mono',monospace;font-size:8.5px;color:var(--muted)}
.dc-nome{font-size:11.5px;font-weight:500;margin-top:1px}
.dc-cor{font-family:'IBM Plex Mono',monospace;font-size:8.5px;color:var(--muted);margin-top:1px}
/* copy */
.copy-list{display:flex;flex-direction:column;gap:7px}
.copy-item{border:1px solid var(--border);border-radius:5px;padding:11px 13px;cursor:pointer;transition:.15s;display:grid;grid-template-columns:22px 1fr;gap:9px}
.copy-item:hover{border-color:var(--border2)}.copy-item.selected{border-color:var(--gold);background:var(--gold-dim)}
.copy-idx{font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--muted);padding-top:2px}
.copy-h1{font-size:13px;font-weight:500;line-height:1.4;margin-bottom:3px}
.copy-tag{font-size:11.5px;color:var(--muted);line-height:1.5}
/* pers ia */
.pers-panel{display:flex;flex-direction:column;gap:16px;max-width:680px}
.pers-empty{padding:48px 0;text-align:center;color:var(--muted);font-size:14px}
.pers-key-box{background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:16px;display:flex;flex-direction:column;gap:10px}
.pers-key-label{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.pers-key-row{display:flex;gap:8px}
.pers-key-input{flex:1;background:var(--bg);border:1px solid var(--border);border-radius:4px;padding:9px 12px;color:var(--text);font-family:'IBM Plex Mono',monospace;font-size:12px;outline:none;transition:.15s}
.pers-key-input:focus{border-color:rgba(212,168,83,.4)}
.pers-key-save{padding:9px 16px;border-radius:4px;background:var(--bg2);border:1px solid var(--border2);color:var(--text);font-size:12px;font-weight:600;cursor:pointer;transition:.15s}
.pers-key-save:hover{border-color:var(--gold);color:var(--gold)}
.pers-textarea{background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:14px;color:var(--text);font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;resize:vertical;min-height:120px;outline:none;transition:.15s;width:100%}
.pers-textarea:focus{border-color:rgba(212,168,83,.4)}
.pers-exemplos{display:flex;flex-wrap:wrap;gap:6px}
.pers-ex{font-size:11.5px;padding:5px 11px;border:1px solid var(--border2);border-radius:20px;color:var(--muted);cursor:pointer;transition:.15s}
.pers-ex:hover{border-color:var(--gold);color:var(--gold2);background:var(--gold-dim)}
.btn-personalizar{padding:12px 24px;border-radius:4px;background:transparent;border:1px solid var(--gold);color:var(--gold);font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:.2s;display:flex;align-items:center;gap:9px;align-self:flex-start}
.btn-personalizar:hover{background:var(--gold-dim)}.btn-personalizar:disabled{opacity:.4;cursor:not-allowed}
.pers-result{background:var(--bg3);border:1px solid rgba(212,168,83,.2);border-radius:6px;padding:14px;display:none;flex-direction:column;gap:10px}
.pers-result.show{display:flex}
.pers-result-title{font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--gold);letter-spacing:.1em;text-transform:uppercase}
.pers-btns{display:flex;gap:8px}
.pers-btn{flex:1;padding:9px;border-radius:4px;font-size:12px;font-weight:600;cursor:pointer;transition:.15s;border:none;text-align:center}
.pb-g{background:var(--gold);color:#080C10}.pb-g:hover{opacity:.87}
.pb-d{background:var(--bg2);border:1px solid var(--border2);color:var(--text)}.pb-d:hover{border-color:var(--gold);color:var(--gold)}
/* ────── EDITOR / PREVIEW ────── */
#rpanel-preview{padding:0;display:none;flex-direction:column}
#rpanel-preview.active{display:flex}
.prev-modebar{background:var(--bg2);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;padding:7px 14px;flex-shrink:0}
.mode-btn{font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.09em;text-transform:uppercase;padding:5px 13px;border-radius:4px;border:1px solid var(--border2);background:transparent;color:var(--muted);cursor:pointer;transition:.15s;display:flex;align-items:center;gap:6px}
.mode-btn.active{border-color:var(--gold);color:var(--gold);background:var(--gold-dim)}
.mode-btn:hover:not(.active){color:var(--text)}
.mv-sep{width:1px;height:18px;background:var(--border);margin:0 4px}
.mv-spacer{flex:1}
.mv-status{font-family:'IBM Plex Mono',monospace;font-size:9.5px;color:var(--green-ok);display:none}
.mv-status.show{display:block}
.mv-btn{font-family:'IBM Plex Mono',monospace;font-size:9.5px;padding:5px 13px;border-radius:4px;cursor:pointer;transition:.15s;display:none;align-items:center;gap:5px}
.mv-btn.show{display:flex}
.mv-save{background:var(--green-ok);border:none;color:#fff;font-weight:600}.mv-save:hover{opacity:.87}
.mv-cancel{background:transparent;border:1px solid var(--border2);color:var(--muted)}.mv-cancel:hover{border-color:var(--red-c);color:var(--red-c)}
.mv-revert{background:transparent;border:1px solid var(--border2);color:var(--muted)}.mv-revert:hover{border-color:rgba(212,168,83,.5);color:var(--gold)}
.format-hint{background:var(--bg3);border-bottom:1px solid var(--border);padding:7px 14px;font-family:'IBM Plex Mono',monospace;font-size:9.5px;color:var(--muted);display:none;align-items:center;gap:8px;flex-shrink:0}
.format-hint.show{display:flex}
.fh-tag{background:var(--gold-dim);color:var(--gold);border:1px solid rgba(212,168,83,.2);border-radius:3px;padding:2px 7px;font-size:8.5px}
.editor-layout{flex:1;display:flex;overflow:hidden}
/* painel de secoes */
.sec-panel{width:196px;background:var(--bg2);border-right:1px solid var(--border);display:none;flex-direction:column;flex-shrink:0;overflow:hidden}
.sec-panel.show{display:flex}
.sec-panel-hd{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);opacity:.55;padding:11px 12px 8px;border-bottom:1px solid var(--border);flex-shrink:0}
.sec-list{flex:1;overflow-y:auto;padding:6px}
.sec-item{display:flex;align-items:center;gap:6px;padding:6px 7px;border-radius:4px;margin-bottom:2px;cursor:grab;user-select:none;border:1px solid transparent;transition:.12s}
.sec-item:hover{background:var(--bg3);border-color:var(--border)}
.sec-item.drag-over{border-color:var(--gold);background:var(--gold-dim)}
.sec-item.dragging{opacity:.35}
.sec-drag{color:var(--muted);font-size:12px;flex-shrink:0;opacity:.6}
.sec-name{font-size:11px;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--text)}
.sec-arrows{display:flex;flex-direction:column;gap:1px;flex-shrink:0}
.sec-arrows button{background:none;border:none;color:var(--muted);cursor:pointer;padding:1px 4px;font-size:10px;line-height:1;border-radius:2px;transition:.1s}
.sec-arrows button:hover{color:var(--gold);background:var(--gold-dim)}
.sec-panel-hint{padding:8px 12px;font-size:9.5px;color:var(--muted);opacity:.4;border-top:1px solid var(--border);flex-shrink:0;line-height:1.6}
/* frame */
.frame-area{flex:1;position:relative;overflow:hidden}
.prev-empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:var(--muted)}
.prev-empty svg{opacity:.12}
.prev-empty p{font-size:13px}
#previewFrame{width:100%;height:100%;border:none;display:none}
::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}
</style>
</head>
<body>
<div class="topbar">
  <span class="topbar-logo">Nicho Certo</span>
  <span class="topbar-sep">\xb7</span>
  <span class="topbar-product">Criador de Landing Page</span>
  <div class="topbar-right">
    <span class="tb-tag">32 designs</span>
    <span class="tb-tag">20 copies</span>
    <button class="tb-btn" onclick="window.open('/galeria','_blank')">Galeria ↗</button>
  </div>
</div>

<div class="main">
  <!-- SIDEBAR -->
  <div class="sidebar">
    <div class="s-tabs">
      <button class="stab active" onclick="showSTab('novo',this)">Novo cliente</button>
      <button class="stab" onclick="showSTab('clientes',this)">Clientes</button>
    </div>
    <div class="tab-panel active" id="stab-novo">
      <div class="form-section">
        <div class="section-label">Dados do advogado</div>
        <div class="field"><label>Nome *</label><input type="text" id="f-nome" placeholder="Dr. Jo\xe3o Silva"></div>
        <div class="field"><label>Escrit\xf3rio</label><input type="text" id="f-escritorio" placeholder="Jo\xe3o Silva Advocacia"></div>
        <div class="field-row">
          <div class="field"><label>OAB</label><input type="text" id="f-oab" placeholder="SP 123456"></div>
          <div class="field"><label>Cidade/Estado</label><input type="text" id="f-cidade" placeholder="S\xe3o Paulo/SP"></div>
        </div>
        <div class="field"><label>WhatsApp (com 55) *</label><input type="tel" id="f-wa" placeholder="5511999990000"></div>
      </div>
      <div class="form-section">
        <div class="section-label">Identidade visual</div>
        <div class="field"><label>Foto do advogado</label>
          <div class="upload-drop"><input type="file" id="f-foto" accept="image/*" onchange="onUpload(this,'foto')">
            <div id="fotoPlaceholder" class="upload-placeholder"><div class="icon">👤</div><div class="lbl">JPG ou PNG</div></div>
            <div id="fotoPreview" class="upload-preview" style="display:none">
              <img id="fotoThumb" src="" alt=""><div class="upload-info"><div class="upload-name" id="fotoNome"></div><div class="upload-size" id="fotoSize"></div></div>
              <button class="upload-rm" onclick="removeUpload(event,'foto')">✕</button></div></div></div>
        <div class="field"><label>Logo do escrit\xf3rio</label>
          <div class="upload-drop"><input type="file" id="f-logo" accept="image/*" onchange="onUpload(this,'logo')">
            <div id="logoPlaceholder" class="upload-placeholder"><div class="icon">🏙</div><div class="lbl">PNG com fundo transparente</div></div>
            <div id="logoPreview" class="upload-preview upload-preview-logo" style="display:none">
              <img id="logoThumb" src="" alt=""><div class="upload-info"><div class="upload-name" id="logoNome"></div><div class="upload-size" id="logoSize"></div></div>
              <button class="upload-rm" onclick="removeUpload(event,'logo')">✕</button></div></div></div>
        <div class="field"><label>Cor de destaque personalizada</label>
          <div class="color-row">
            <input type="color" id="f-cor" class="color-input" value="#D4A853">
            <span class="color-label" id="corLabel">Usando cor da paleta</span>
            <button class="color-reset" onclick="resetCor()">↺ paleta</button>
          </div></div>
      </div>
      <div class="form-section">
        <div class="section-label">Depoimento de cliente (opcional)</div>
        <div class="field"><label>Texto</label><textarea id="f-dep-texto" placeholder="Estava desesperado com as d\xedvidas. O Dr. Jo\xe3o me orientou sem julgamento..." rows="3"></textarea></div>
        <div class="field-row">
          <div class="field"><label>Nome</label><input type="text" id="f-dep-nome" placeholder="M.S."></div>
          <div class="field"><label>Cidade</label><input type="text" id="f-dep-cidade" placeholder="S\xe3o Paulo/SP"></div>
        </div>
      </div>
      <div class="err" id="errMsg"></div>
      <button class="btn-gerar" id="btnGerar" onclick="gerarLPClick()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Gerar Landing Page
      </button>
      <div class="result-card" id="resultCard">
        <div><div class="rl">Design</div><div class="rv" id="r-design"></div></div>
        <div><div class="rl">Texto</div><div class="rv" id="r-copy"></div></div>
        <div><div class="rl">Arquivo</div><div class="rv" id="r-slug" style="font-family:'IBM Plex Mono',monospace;font-size:11px"></div></div>
        <div class="result-btns">
          <button class="rb rb-g" onclick="previewLP()">Ver LP ↗</button>
          <button class="rb rb-f" onclick="abrirPasta()">Abrir pasta</button>
        </div>
      </div>
    </div>
    <div class="tab-panel" id="stab-clientes">
      <div id="clientes-list"><div class="empty">Carregando...</div></div>
    </div>
  </div>

  <!-- DIREITA -->
  <div class="right">
    <div class="r-tabs">
      <button class="rtab active" onclick="showRTab('design',this)">Design <span class="badge" id="badge-design">nenhum</span></button>
      <button class="rtab" onclick="showRTab('copy',this)">Texto <span class="badge" id="badge-copy">nenhum</span></button>
      <button class="rtab" onclick="showRTab('pers',this)">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
        Personalizar IA
      </button>
      <button class="rtab" id="rtab-preview" onclick="showRTab('preview',this)">Preview / Editor</button>
    </div>
    <div class="r-content">

      <!-- DESIGN -->
      <div class="rpanel active" id="rpanel-design"><div id="design-grid"></div></div>

      <!-- COPY -->
      <div class="rpanel" id="rpanel-copy"><div class="copy-list" id="copy-list"></div></div>

      <!-- PERSONALIZAR IA -->
      <div class="rpanel" id="rpanel-pers">
        <div class="pers-panel">
          <div class="pers-empty" id="persEmpty">Gere uma LP primeiro para personalizar com IA.</div>
          <div id="persForm" style="display:none;flex-direction:column;gap:14px">
            <div class="pers-key-box" id="apiKeyBox" style="display:none">
              <div class="pers-key-label">Chave da API Anthropic</div>
              <div style="font-size:12px;color:var(--muted);line-height:1.6">Necess\xe1ria para a IA personalizar a LP. Salva s\xf3 no seu browser.</div>
              <div class="pers-key-row">
                <input type="password" class="pers-key-input" id="apiKeyInput" placeholder="sk-ant-...">
                <button class="pers-key-save" onclick="salvarApiKey()">Salvar</button>
              </div>
            </div>
            <div>
              <div class="rl" style="margin-bottom:8px">Descreva o que voc\xea quer personalizar</div>
              <textarea class="pers-textarea" id="persInstrucao" placeholder="Ex: adicione as cores azul e dourado, remova a se\xe7\xe3o de FAQ, tom mais formal..."></textarea>
            </div>
            <div>
              <div class="rl" style="margin-bottom:7px">Exemplos r\xe1pidos</div>
              <div class="pers-exemplos">
                <span class="pers-ex" onclick="addEx(this)">Tom mais formal</span>
                <span class="pers-ex" onclick="addEx(this)">Cores azul e dourado</span>
                <span class="pers-ex" onclick="addEx(this)">Remover FAQ</span>
                <span class="pers-ex" onclick="addEx(this)">Adicionar urg\xeancia</span>
                <span class="pers-ex" onclick="addEx(this)">Remover foto</span>
                <span class="pers-ex" onclick="addEx(this)">Tom mais acolhedor</span>
                <span class="pers-ex" onclick="addEx(this)">Paleta verde e cinza</span>
              </div>
            </div>
            <button class="btn-personalizar" id="btnPers" onclick="personalizarLP()">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4"/></svg>
              Personalizar com IA
            </button>
            <div class="err" id="persErr"></div>
            <div class="pers-result" id="persResult">
              <div class="pers-result-title">✓ LP personalizada pela IA</div>
              <div style="font-size:12px;color:var(--muted);line-height:1.6">Vers\xe3o personalizada salva separada da original.</div>
              <div class="pers-btns">
                <button class="pers-btn pb-g" onclick="verPersonalizado()">Ver vers\xe3o IA ↗</button>
                <button class="pers-btn pb-d" onclick="aplicarPersonalizado()">Aplicar como principal</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PREVIEW / EDITOR -->
      <div class="rpanel" id="rpanel-preview">
        <!-- Barra modo -->
        <div class="prev-modebar">
          <button class="mode-btn active" id="btnView" onclick="setMode('view')">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Visualizar
          </button>
          <button class="mode-btn" id="btnEdit" onclick="setMode('edit')">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Editar
          </button>
          <div class="mv-sep"></div>
          <div class="mv-spacer"></div>
          <span class="mv-status" id="mvStatus"></span>
          <button class="mv-btn mv-revert" id="btnRevert" onclick="reverterOriginal()">↺ pr\xe9-edi\xe7\xe3o</button>
          <button class="mv-btn mv-cancel" id="btnCancel" onclick="cancelarEdicao()">Cancelar</button>
          <button class="mv-btn mv-save" id="btnSave" onclick="salvarEdicao()">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Salvar altera\xe7\xf5es
          </button>
        </div>
        <!-- Dica edit mode -->
        <div class="format-hint" id="formatHint">
          <span class="fh-tag">DICA</span>
          Clique em qualquer texto para editar \xb7 Arraste se\xe7\xf5es no painel esquerdo para reordenar
        </div>
        <!-- Layout -->
        <div class="editor-layout">
          <!-- Painel de se\xe7\xf5es -->
          <div class="sec-panel" id="secPanel">
            <div class="sec-panel-hd">Se\xe7\xf5es</div>
            <div class="sec-list" id="sectionList"></div>
            <div class="sec-panel-hint">Arraste ou use ↑↓ para reordenar</div>
          </div>
          <!-- Iframe -->
          <div class="frame-area">
            <div class="prev-empty" id="prevEmpty">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width=".8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>
              <p>Gere uma LP para visualizar aqui</p>
            </div>
            <iframe id="previewFrame" onload="onFrameLoad()"></iframe>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

<script>
var selectedDesign=null,selectedCopy=null,lastSlug=null,persSlug=null;
var fotoFile=null,logoFile=null,usarCor=false;
var editModeActive=false,editBackup='',dragFromIdx=null;
var familias=${JSON.stringify(designFamilias)};
var coresNome=${JSON.stringify(coresNome)};

// TABS
function showSTab(id,btn){document.querySelectorAll('.stab').forEach(b=>b.classList.remove('active'));document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));btn.classList.add('active');document.getElementById('stab-'+id).classList.add('active');if(id==='clientes')carregarClientes();}
function showRTab(id,btn){document.querySelectorAll('.rtab').forEach(b=>b.classList.remove('active'));document.querySelectorAll('.rpanel').forEach(p=>p.classList.remove('active'));btn.classList.add('active');document.getElementById('rpanel-'+id).classList.add('active');}

// UPLOADS
function onUpload(input,tipo){var file=input.files[0];if(!file)return;if(tipo==='foto')fotoFile=file;else logoFile=file;var url=URL.createObjectURL(file);document.getElementById(tipo+'Thumb').src=url;document.getElementById(tipo+'Nome').textContent=file.name;document.getElementById(tipo+'Size').textContent=(file.size/1024).toFixed(0)+' KB';document.getElementById(tipo+'Placeholder').style.display='none';document.getElementById(tipo+'Preview').style.display='flex';}
function removeUpload(e,tipo){e.stopPropagation();if(tipo==='foto')fotoFile=null;else logoFile=null;document.getElementById('f-'+tipo).value='';document.getElementById(tipo+'Preview').style.display='none';document.getElementById(tipo+'Placeholder').style.display='';}
document.getElementById('f-cor').addEventListener('input',function(){usarCor=true;document.getElementById('corLabel').textContent='Personalizada: '+this.value;});
function resetCor(){usarCor=false;document.getElementById('f-cor').value='#D4A853';document.getElementById('corLabel').textContent='Usando cor da paleta';}

// DESIGN PICKER
function buildDesignGrid(){
  var grid=document.getElementById('design-grid');
  familias.forEach(function(f){
    var block=document.createElement('div');block.className='familia-block';
    var hd=document.createElement('div');hd.className='familia-hd';
    hd.innerHTML='<span class="familia-dot" style="background:'+f.cor+'"></span><span class="familia-nome">'+f.nome+'</span><span class="familia-desc">'+f.desc+'</span>';
    var sb=document.createElement('button');sb.className='sort-btn';sb.textContent='Sortear';
    sb.onclick=(function(ids){return function(){selectDesign(ids[Math.floor(Math.random()*ids.length)]);};})(f.ids);
    hd.appendChild(sb);block.appendChild(hd);
    var row=document.createElement('div');row.className='design-row';
    f.ids.forEach(function(id){
      var card=document.createElement('div');card.className='dc';card.id='dc-'+id;
      card.onclick=(function(vid){return function(){selectDesign(vid);};})(id);
      card.innerHTML=
        '<div class="iframe-wrap" data-src="/preview/v'+id+'.html">'
        +'<div style="width:200px;height:120px;background:var(--bg3);display:flex;align-items:center;justify-content:center;opacity:.3;font-family:monospace;font-size:10px">v'+id+'</div>'
        +'</div>'
        +'<div class="dc-info"><div class="dc-num">v'+id+'</div><div class="dc-nome">'+f.nome+'</div><div class="dc-cor">'+coresNome[id-1]+'</div></div>';
      row.appendChild(card);
    });
    block.appendChild(row);grid.appendChild(block);
  });
  // Carrega iframes só quando o card entrar na viewport
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting)return;
      var wrap=e.target;
      if(wrap.dataset.src&&!wrap.querySelector('iframe')){
        var fr=document.createElement('iframe');
        fr.src=wrap.dataset.src;fr.scrolling='no';
        fr.style.cssText='width:1100px;height:900px;transform:scale(0.182);transform-origin:top left;border:none;display:block';
        wrap.innerHTML='';wrap.appendChild(fr);
      }
      obs.unobserve(wrap);
    });
  },{rootMargin:'300px',threshold:0});
  document.querySelectorAll('.iframe-wrap[data-src]').forEach(function(el){obs.observe(el);});
}
function selectDesign(id){selectedDesign=id;document.querySelectorAll('.dc').forEach(c=>c.classList.remove('selected'));var card=document.getElementById('dc-'+id);if(card){card.classList.add('selected');card.scrollIntoView({behavior:'smooth',block:'nearest'});}var nome='';familias.forEach(f=>{if(f.ids.indexOf(id)>=0)nome=f.nome+' '+coresNome[id-1];});document.getElementById('badge-design').textContent='v'+id+' \xb7 '+nome;}

// COPY PICKER
function buildCopyList(data){var list=document.getElementById('copy-list');data.forEach(function(c){var item=document.createElement('div');item.className='copy-item';item.id='cp-'+c.idx;item.onclick=(function(idx){return function(){selectCopy(idx);};})(c.idx);item.innerHTML='<div class="copy-idx">'+c.idx+'</div><div><div class="copy-h1">'+c.h1+'</div><div class="copy-tag">'+c.tagline+'</div></div>';list.appendChild(item);});}
function selectCopy(idx){selectedCopy=idx;document.querySelectorAll('.copy-item').forEach(i=>i.classList.remove('selected'));var item=document.getElementById('cp-'+idx);if(item){item.classList.add('selected');item.scrollIntoView({behavior:'smooth',block:'nearest'});}document.getElementById('badge-copy').textContent='#'+idx;}

// ERROS
function showErr(id,msg){var e=document.getElementById(id);e.textContent=msg;e.classList.add('show');}
function hideErr(id){document.getElementById(id).classList.remove('show');}

// GERAR LP
async function gerarLPClick(){
  var nome=document.getElementById('f-nome').value.trim();
  var wa=document.getElementById('f-wa').value.trim();
  if(!nome){showErr('errMsg','Preencha o nome do advogado.');return;}
  if(!wa){showErr('errMsg','Preencha o WhatsApp.');return;}
  hideErr('errMsg');
  var btn=document.getElementById('btnGerar');
  btn.disabled=true;btn.innerHTML='<span class="spinner"></span> Gerando...';
  var v=selectedDesign||Math.ceil(Math.random()*32);
  var c=selectedCopy||Math.ceil(Math.random()*20);
  var dados={nomeAdvogado:nome,nomeEscritorio:document.getElementById('f-escritorio').value.trim()||nome+' Advocacia',oab:document.getElementById('f-oab').value.trim()||'XX',cidadeEstado:document.getElementById('f-cidade').value.trim()||'Brasil',whatsapp:wa,fotoAdvogado:'foto.jpg',variacao:v,copia:c,corPersonalizada:usarCor?document.getElementById('f-cor').value:null,depoimentoTexto:document.getElementById('f-dep-texto').value.trim()||null,depoimentoNome:document.getElementById('f-dep-nome').value.trim()||null,depoimentoCidade:document.getElementById('f-dep-cidade').value.trim()||null};
  try{
    var res=await fetch('/api/gerar',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(dados)});
    if(!res.ok)throw new Error('Servidor retornou '+res.status);
    var result=await res.json();
    if(!result.ok)throw new Error(result.error||'Erro desconhecido');
    lastSlug=result.slug;
    if(fotoFile){btn.innerHTML='<span class="spinner"></span> Enviando foto...';var ext=fotoFile.name.split('.').pop().toLowerCase()||'jpg';await fetch('/api/upload-arquivo?slug='+encodeURIComponent(result.slug)+'&nome=foto&ext='+ext,{method:'POST',headers:{'Content-Type':'application/octet-stream'},body:await fotoFile.arrayBuffer()});}
    if(logoFile){btn.innerHTML='<span class="spinner"></span> Enviando logo...';var ext2=logoFile.name.split('.').pop().toLowerCase()||'png';await fetch('/api/upload-arquivo?slug='+encodeURIComponent(result.slug)+'&nome=logo&ext='+ext2,{method:'POST',headers:{'Content-Type':'application/octet-stream'},body:await logoFile.arrayBuffer()});await fetch('/api/injetar-logo?slug='+encodeURIComponent(result.slug)+'&logoFile=logo.'+ext2);}
    document.getElementById('r-design').textContent=result.design;
    document.getElementById('r-copy').textContent='varia\xe7\xe3o '+result.copyIdx+' de '+result.copyTotal;
    document.getElementById('r-slug').textContent='clientes/'+result.slug+'/index.html';
    document.getElementById('resultCard').classList.add('show');
    if(!selectedDesign)selectDesign(v);
    if(!selectedCopy)selectCopy(c);
    abrirPreview(result.slug);
    document.getElementById('persEmpty').style.display='none';
    document.getElementById('persForm').style.display='flex';
    persSlug=result.slug;checkApiKey();
  }catch(e){showErr('errMsg','Erro: '+e.message);}
  btn.disabled=false;btn.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg> Gerar Landing Page';
}

function abrirPreview(slug){showRTab('preview',document.getElementById('rtab-preview'));setMode('view');var frame=document.getElementById('previewFrame');frame.src='/lp/'+slug+'/index.html?t='+Date.now();frame.style.display='block';document.getElementById('prevEmpty').style.display='none';}
function previewLP(){if(lastSlug)window.open('/lp/'+lastSlug+'/index.html','_blank');}
function abrirPasta(){if(lastSlug)fetch('/api/abrir-pasta?slug='+encodeURIComponent(lastSlug));}

// CLIENTES
async function carregarClientes(){try{var lista=await(await fetch('/api/clientes')).json();var el=document.getElementById('clientes-list');if(!lista.length){el.innerHTML='<div class="empty">Nenhum cliente ainda.</div>';return;}el.innerHTML='';lista.forEach(function(c){var item=document.createElement('div');item.className='cli-item';item.onclick=function(){verCliente(c.slug);};item.innerHTML='<span class="cli-dot"></span><div class="cli-info"><div class="cli-nome">'+c.nome+'</div><div class="cli-design">'+c.design+'</div></div><span style="color:var(--muted)">→</span>';el.appendChild(item);});}catch{document.getElementById('clientes-list').innerHTML='<div class="empty">Erro ao carregar.</div>';}}
function verCliente(slug){lastSlug=slug;persSlug=slug;abrirPreview(slug);document.getElementById('r-slug').textContent='clientes/'+slug+'/index.html';document.getElementById('resultCard').classList.add('show');document.getElementById('persEmpty').style.display='none';document.getElementById('persForm').style.display='flex';checkApiKey();}

// ─── EDITOR ───────────────────────────────────────────────────────────
function setMode(mode){
  var isEdit=mode==='edit';
  var frame=document.getElementById('previewFrame');
  var hasLP=frame&&frame.style.display!=='none'&&frame.src&&!frame.src.endsWith('/');

  document.getElementById('btnView').classList.toggle('active',!isEdit);
  document.getElementById('btnEdit').classList.toggle('active',isEdit);
  document.getElementById('secPanel').classList.toggle('show',isEdit);
  document.getElementById('formatHint').classList.toggle('show',isEdit);
  ['btnSave','btnCancel','btnRevert'].forEach(id=>document.getElementById(id).classList.toggle('show',isEdit));

  editModeActive=isEdit;

  if(isEdit&&hasLP&&frame.contentDocument&&frame.contentDocument.body){
    editBackup='<!DOCTYPE html>\\n'+frame.contentDocument.documentElement.outerHTML;
    injectEditor(frame.contentDocument);
    buildSectionList(frame.contentDocument);
  }
  if(!isEdit){
    try{cleanEditorUI(frame.contentDocument);}catch(e){}
    document.getElementById('sectionList').innerHTML='';
  }
}

function onFrameLoad(){
  if(editModeActive){
    var doc=document.getElementById('previewFrame').contentDocument;
    injectEditor(doc);buildSectionList(doc);
  }
}

function injectEditor(doc){
  if(doc.getElementById('nc-editor-css'))return;

  var style=doc.createElement('style');style.id='nc-editor-css';
  style.textContent='[data-nc-edit]:hover{outline:2px dashed rgba(212,168,83,.45)!important;outline-offset:2px;cursor:text;}[data-nc-edit]:focus{outline:2px solid rgba(212,168,83,.85)!important;outline-offset:2px;background:rgba(212,168,83,.04);}[data-nc-edit]{transition:outline .1s;}';
  doc.head.appendChild(style);

  // Barra de formatacao flutuante
  var fbar=doc.createElement('div');fbar.id='nc-fbar';
  fbar.style.cssText='position:fixed;top:10px;left:50%;transform:translateX(-50%);background:#1A2028;border:1px solid rgba(212,168,83,.45);border-radius:7px;padding:5px 6px;display:none;gap:3px;z-index:99999;box-shadow:0 4px 24px rgba(0,0,0,.7);align-items:center;pointer-events:all';
  var btns=[
    ['B','Negrito','bold','font-family:Georgia,serif;font-weight:bold;font-size:13px'],
    ['I','It\xe1lico','italic','font-family:Georgia,serif;font-style:italic;font-size:13px'],
    ['|','','','width:1px;height:18px;background:rgba(255,255,255,.12);margin:0 3px;pointer-events:none'],
    ['⇤','Alinhar esquerda','justifyLeft','font-size:14px'],
    ['☰','Centralizar','justifyCenter','font-size:12px'],
    ['⇥','Alinhar direita','justifyRight','font-size:14px'],
    ['|','','','width:1px;height:18px;background:rgba(255,255,255,.12);margin:0 3px;pointer-events:none'],
    ['✕ fmt','Limpar formato','removeFormat','font-size:10px;font-family:monospace;white-space:nowrap'],
  ];
  btns.forEach(function(b){
    var el=b[1]===''?doc.createElement('span'):doc.createElement('button');
    el.style.cssText='display:flex;align-items:center;justify-content:center;background:transparent;border:none;color:#E0E8EC;cursor:pointer;border-radius:4px;padding:4px 6px;min-width:26px;height:26px;'+b[3];
    el.innerHTML=b[0];
    if(b[2]){el.title=b[1];el.onmousedown=function(e){e.preventDefault();doc.execCommand(b[2]);};}
    fbar.appendChild(el);
  });
  doc.body.appendChild(fbar);

  // Torna texto editavel
  doc.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,td,th,blockquote,cite,label,span,strong,em,small,b,i').forEach(function(el){
    if(el.closest('script,style,noscript,[data-nc-no-edit]'))return;
    if(el.querySelector('input,select,textarea,iframe,svg'))return;
    el.contentEditable='true';el.setAttribute('data-nc-edit','1');
  });
  doc.querySelectorAll('a,button').forEach(function(el){
    if(el.querySelector('svg,img'))return;
    el.contentEditable='true';el.setAttribute('data-nc-edit','1');
  });

  doc.addEventListener('selectionchange',function(){
    var sel=doc.getSelection();
    var fb=doc.getElementById('nc-fbar');
    if(!fb)return;
    if(sel&&!sel.isCollapsed&&sel.toString().trim().length>0){fb.style.display='flex';}
    else{fb.style.display='none';}
  });
}

function cleanEditorUI(doc){
  if(!doc)return;
  var css=doc.getElementById('nc-editor-css');if(css)css.remove();
  var fb=doc.getElementById('nc-fbar');if(fb)fb.remove();
  doc.querySelectorAll('[data-nc-edit]').forEach(function(el){el.removeAttribute('contenteditable');el.removeAttribute('data-nc-edit');});
}

// SECOES
function getSections(doc){return [...doc.body.children].filter(function(el){return el.tagName==='SECTION'||el.tagName==='FOOTER';});}

function buildSectionList(doc){
  var list=document.getElementById('sectionList');list.innerHTML='';
  var secs=getSections(doc);
  secs.forEach(function(sec,i){
    var nameEl=sec.querySelector('h1,h2,h3,.section-title,.nav-logo');
    var rawName=nameEl?nameEl.textContent.trim().replace(/\s+/g,' ').slice(0,26):(sec.className||sec.tagName).split(' ')[0];
    var item=document.createElement('div');item.className='sec-item';item.draggable=true;item.dataset.idx=i;
    item.innerHTML='<span class="sec-drag">⠇</span><span class="sec-name" title="'+rawName+'">'+rawName+'</span><div class="sec-arrows"><button onclick="moveSec('+i+',-1)">↑</button><button onclick="moveSec('+i+',1)">↓</button></div>';
    item.addEventListener('dragstart',function(e){dragFromIdx=i;e.dataTransfer.effectAllowed='move';var self=this;setTimeout(function(){self.classList.add('dragging');},0);});
    item.addEventListener('dragend',function(){this.classList.remove('dragging');document.querySelectorAll('.sec-item').forEach(x=>x.classList.remove('drag-over'));});
    item.addEventListener('dragover',function(e){e.preventDefault();document.querySelectorAll('.sec-item').forEach(x=>x.classList.remove('drag-over'));this.classList.add('drag-over');});
    item.addEventListener('drop',function(e){e.preventDefault();var toIdx=parseInt(this.dataset.idx);if(dragFromIdx!==null&&dragFromIdx!==toIdx){moveSec(dragFromIdx,toIdx);}dragFromIdx=null;document.querySelectorAll('.sec-item').forEach(x=>x.classList.remove('drag-over'));});
    list.appendChild(item);
  });
}

function moveSec(from,to){
  var doc=document.getElementById('previewFrame').contentDocument;
  var secs=getSections(doc);
  if(from<0||from>=secs.length||to<0||to>=secs.length||from===to)return;
  var el=secs[from],ref=secs[to];
  if(from<to){el.parentNode.insertBefore(el,ref.nextSibling||null);}
  else{el.parentNode.insertBefore(el,ref);}
  buildSectionList(doc);
}

// SALVAR
async function salvarEdicao(){
  if(!lastSlug)return;
  var frame=document.getElementById('previewFrame');
  var doc=frame.contentDocument;
  cleanEditorUI(doc);
  var html='<!DOCTYPE html>\\n'+doc.documentElement.outerHTML;
  var btn=document.getElementById('btnSave');
  btn.innerHTML='<span class="spinner" style="border:2px solid rgba(255,255,255,.3);border-top-color:#fff"></span> Salvando...';
  btn.disabled=true;
  try{
    var res=await fetch('/api/salvar-lp?slug='+encodeURIComponent(lastSlug),{method:'POST',headers:{'Content-Type':'text/html; charset=utf-8'},body:html});
    var result=await res.json();if(!result.ok)throw new Error(result.error);
    var st=document.getElementById('mvStatus');st.textContent='✓ Salvo';st.style.color='#2D8A5A';st.classList.add('show');
    setTimeout(function(){st.classList.remove('show');},3500);
    editModeActive=false;setMode('view');
    frame.src='/lp/'+lastSlug+'/index.html?t='+Date.now();
  }catch(e){alert('Erro ao salvar: '+e.message);injectEditor(doc);buildSectionList(doc);}
  btn.innerHTML='<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Salvar altera\xe7\xf5es';
  btn.disabled=false;
}

function cancelarEdicao(){
  var frame=document.getElementById('previewFrame');
  if(editBackup){var doc=frame.contentDocument;doc.open();doc.write(editBackup);doc.close();}
  editModeActive=false;setMode('view');
}

function reverterOriginal(){
  if(!lastSlug)return;
  fetch('/api/reverter?slug='+encodeURIComponent(lastSlug)).then(function(){
    setMode('view');document.getElementById('previewFrame').src='/lp/'+lastSlug+'/index.html?t='+Date.now();
  });
}

// PERSONALIZAR IA
function getApiKey(){return localStorage.getItem('nc_api_key')||'';}
function salvarApiKey(){var k=document.getElementById('apiKeyInput').value.trim();if(!k)return;localStorage.setItem('nc_api_key',k);document.getElementById('apiKeyBox').style.display='none';}
function checkApiKey(){document.getElementById('apiKeyBox').style.display=getApiKey()?'none':'block';}
function addEx(el){var ta=document.getElementById('persInstrucao');var txt=el.textContent;ta.value=ta.value?ta.value+', '+txt.toLowerCase():txt;ta.focus();}

async function personalizarLP(){
  var apiKey=getApiKey();if(!apiKey){showErr('persErr','Informe a chave da API acima.');return;}
  var instrucao=document.getElementById('persInstrucao').value.trim();if(!instrucao){showErr('persErr','Descreva o que voc\xea quer personalizar.');return;}
  if(!persSlug){showErr('persErr','Gere uma LP primeiro.');return;}
  hideErr('persErr');
  var btn=document.getElementById('btnPers');btn.disabled=true;btn.innerHTML='<span class="spinner"></span> A IA est\xe1 trabalhando...';
  try{var res=await fetch('/api/personalizar',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({slug:persSlug,instrucao,apiKey})});var result=await res.json();if(!result.ok)throw new Error(result.error);document.getElementById('persResult').classList.add('show');}
  catch(e){showErr('persErr','Erro: '+e.message);}
  btn.disabled=false;btn.innerHTML='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4"/></svg> Personalizar com IA';
}
function verPersonalizado(){if(persSlug)window.open('/lp/'+persSlug+'/index-personalizado.html','_blank');}
async function aplicarPersonalizado(){if(!persSlug)return;await fetch('/api/aplicar-personalizado?slug='+encodeURIComponent(persSlug));setMode('view');document.getElementById('previewFrame').src='/lp/'+persSlug+'/index.html?t='+Date.now();}

// INIT
async function init(){
  buildDesignGrid();
  try{var copies=await(await fetch('/api/copies')).json();buildCopyList(copies);}catch(e){console.error(e);}
}
init();
<\/script>
</body>
</html>`;

// ── SERVIDOR ──────────────────────────────────────────────────────────────
http.createServer(async(req,res)=>{
  const p=pathname(req.url);const q=qs(req.url);
  res.setHeader('Access-Control-Allow-Origin','*');
  if(req.method==='OPTIONS'){res.writeHead(204);return res.end();}
  try{
    if(p==='/')return(res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'}),res.end(HTML));
    if(p==='/galeria')return staticFile(res,path.join(ROOT,'galeria-designs.html'));
    if(p==='/api/copies')return json(res,copies.map((c,i)=>({idx:i+1,h1:c.h1.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim(),tagline:c.tagline.length>88?c.tagline.slice(0,88)+'…':c.tagline})));

    if(req.method==='POST'&&p==='/api/gerar'){
      const raw=await readBody(req);let dados;try{dados=JSON.parse(raw.toString());}catch{return json(res,{ok:false,error:'JSON inv\xe1lido'},400);}
      const r=gerarLP(dados);const pasta=path.join(ROOT,'clientes',r.slug);
      fs.mkdirSync(pasta,{recursive:true});fs.writeFileSync(path.join(pasta,'index.html'),r.html);
      fs.writeFileSync(path.join(pasta,'config.json'),JSON.stringify({...dados,design:r.design,copyIdx:r.copyIdx,geradoEm:new Date().toISOString()},null,2));
      return json(res,{ok:true,slug:r.slug,design:r.design,copyIdx:r.copyIdx,copyTotal:r.copyTotal});
    }
    if(req.method==='POST'&&p==='/api/upload-arquivo'){
      const{slug,nome,ext}=q;if(!slug||!nome){res.writeHead(400);return res.end('');}
      const safeExt=(ext||'jpg').replace(/[^a-z0-9]/gi,'').slice(0,5)||'jpg';
      fs.writeFileSync(path.join(ROOT,'clientes',slug,nome+'.'+safeExt),await readBody(req));
      return json(res,{ok:true,file:nome+'.'+safeExt});
    }
    if(p==='/api/injetar-logo'){
      const{slug,logoFile:lf}=q;if(!slug||!lf){res.writeHead(400);return res.end('');}
      const ip=path.join(ROOT,'clientes',slug,'index.html');
      if(fs.existsSync(ip)){let html=fs.readFileSync(ip,'utf8');html=html.replace(/(class="nav-logo"[^>]*>)([\s\S]*?)(<\/div>)/,`$1<img src="${lf}" style="height:28px;max-width:140px;object-fit:contain;vertical-align:middle" alt="Logo">$3`);fs.writeFileSync(ip,html);}
      return json(res,{ok:true});
    }
    if(p==='/api/clientes')return json(res,listarClientes());
    if(p==='/api/abrir-pasta'){if(q.slug)exec('explorer "'+path.join(ROOT,'clientes',q.slug)+'"');res.writeHead(200);return res.end('ok');}

    // SALVAR EDIÇÃO MANUAL
    if(req.method==='POST'&&p==='/api/salvar-lp'){
      const{slug}=q;if(!slug)return json(res,{ok:false,error:'slug obrigat\xf3rio'},400);
      const ip=path.join(ROOT,'clientes',slug,'index.html');
      if(fs.existsSync(ip))fs.copyFileSync(ip,path.join(ROOT,'clientes',slug,'index-pre-edicao.html'));
      fs.writeFileSync(ip,(await readBody(req)).toString('utf8'));
      return json(res,{ok:true});
    }
    // REVERTER
    if(p==='/api/reverter'){
      const{slug}=q;const bkp=path.join(ROOT,'clientes',slug,'index-pre-edicao.html');const ip=path.join(ROOT,'clientes',slug,'index.html');
      if(fs.existsSync(bkp))fs.copyFileSync(bkp,ip);
      res.writeHead(200);return res.end('ok');
    }
    // PERSONALIZAR IA
    if(req.method==='POST'&&p==='/api/personalizar'){
      const{slug,instrucao,apiKey}=JSON.parse((await readBody(req)).toString());
      if(!apiKey)return json(res,{ok:false,error:'API key n\xe3o fornecida'},400);
      if(!slug||!instrucao)return json(res,{ok:false,error:'par\xe2metros faltando'},400);
      const ip=path.join(ROOT,'clientes',slug,'index.html');
      if(!fs.existsSync(ip))return json(res,{ok:false,error:'LP n\xe3o encontrada'},404);
      const lpHtml=fs.readFileSync(ip,'utf8');
      const htmlMod=await callClaude(apiKey,'Voc\xea \xe9 especialista em HTML/CSS. Modifique o HTML conforme a instru\xe7\xe3o. Retorne APENAS o HTML puro come\xe7ando com <!DOCTYPE html>, sem markdown nem explica\xe7\xf5es.','HTML:\n\n'+lpHtml+'\n\n---\nInstru\xe7\xe3o: '+instrucao);
      fs.writeFileSync(path.join(ROOT,'clientes',slug,'index-personalizado.html'),htmlMod);
      return json(res,{ok:true,slug});
    }
    if(p==='/api/aplicar-personalizado'){
      const{slug}=q;const pp=path.join(ROOT,'clientes',slug,'index-personalizado.html');const ip=path.join(ROOT,'clientes',slug,'index.html');
      if(fs.existsSync(pp)){fs.copyFileSync(ip,path.join(ROOT,'clientes',slug,'index-backup.html'));fs.copyFileSync(pp,ip);}
      res.writeHead(200);return res.end('ok');
    }

    if(p.startsWith('/lp/')){const parts=p.replace('/lp/','').split('/');return staticFile(res,path.join(ROOT,'clientes',parts[0],parts[1]||'index.html'));}
    if(p.startsWith('/preview/'))return staticFile(res,path.join(ROOT,'clientes/_preview-designs',p.replace('/preview/','')));
    res.writeHead(404);res.end('');
  }catch(e){console.error('[erro]',req.method,p,e.message);try{json(res,{ok:false,error:e.message},500);}catch{}}
}).listen(PORT,()=>{
  console.log('\n\x1b[33m\x1b[1m Criador de Landing Page \xb7 Nicho Certo\x1b[0m');
  console.log(' → \x1b[36mhttp://localhost:'+PORT+'\x1b[0m\n');
  exec('start http://localhost:'+PORT);
});
