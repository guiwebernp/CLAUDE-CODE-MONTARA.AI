// Captador — paletas de cor para cada variação de design
// Cada entrada sobrescreve as CSS custom properties do template base.

const palettes = [
  // ── NOTURNO (base: landing-page.html) ─────────────────────────────────────
  {
    id: 1, nome: 'Noturno Dourado', template: 'landing-page.html',
    css: '' // original, sem override
  },
  {
    id: 2, nome: 'Noturno Coral', template: 'landing-page.html',
    css: `:root{
      --gold:#D4643C; --gold2:#E89070; --gold3:#C45030;
      --gold-dim:rgba(212,100,60,.10); --gold-glow:rgba(212,100,60,.18);
    }`
  },
  {
    id: 3, nome: 'Noturno Roxo', template: 'landing-page.html',
    css: `:root{
      --gold:#9B7FD4; --gold2:#C0A8E8; --gold3:#7B5FBA;
      --gold-dim:rgba(155,127,212,.10); --gold-glow:rgba(155,127,212,.18);
    }`
  },
  {
    id: 4, nome: 'Noturno Esmeralda', template: 'landing-page.html',
    css: `:root{
      --gold:#3DBDA8; --gold2:#6ED4C4; --gold3:#2D9D88;
      --gold-dim:rgba(61,189,168,.10); --gold-glow:rgba(61,189,168,.18);
    }`
  },

  // ── AÇO (base: landing-page-azul.html) ────────────────────────────────────
  {
    id: 5, nome: 'Aço Azul', template: 'landing-page-azul.html',
    css: '' // original, sem override
  },
  {
    id: 6, nome: 'Aço Teal', template: 'landing-page-azul.html',
    css: `:root{
      --blue:#3DBDA8; --blue2:#6ED4C4;
      --blue-dim:rgba(61,189,168,.12); --blue-glow:rgba(61,189,168,.20);
    }`
  },
  {
    id: 7, nome: 'Aço Índigo', template: 'landing-page-azul.html',
    css: `:root{
      --blue:#6B7FD4; --blue2:#9BAAE8;
      --blue-dim:rgba(107,127,212,.12); --blue-glow:rgba(107,127,212,.20);
    }`
  },
  {
    id: 8, nome: 'Aço Prata', template: 'landing-page-azul.html',
    css: `:root{
      --blue:#9BAFBF; --blue2:#C0D0DC;
      --blue-dim:rgba(155,175,191,.12); --blue-glow:rgba(155,175,191,.20);
    }`
  },

  // ── EDITORIAL (base: landing-page-editorial.html) ─────────────────────────
  {
    id: 9, nome: 'Editorial Verde', template: 'landing-page-editorial.html',
    css: '' // original, sem override
  },
  {
    id: 10, nome: 'Editorial Índigo', template: 'landing-page-editorial.html',
    css: `:root{
      --green:#2D3D6A; --green2:#4A5A9A; --green3:#7A8ACA;
      --green-dim:rgba(45,61,106,.07); --green-line:rgba(45,61,106,.20);
    }`
  },
  {
    id: 11, nome: 'Editorial Vinho', template: 'landing-page-editorial.html',
    css: `:root{
      --green:#6A2D3D; --green2:#9A4A5A; --green3:#CA7A8A;
      --green-dim:rgba(106,45,61,.07); --green-line:rgba(106,45,61,.20);
    }`
  },
  {
    id: 12, nome: 'Editorial Âmbar', template: 'landing-page-editorial.html',
    css: `:root{
      --green:#7A5020; --green2:#A07030; --green3:#C8A060;
      --green-dim:rgba(122,80,32,.07); --green-line:rgba(122,80,32,.20);
    }`
  },

  // ── NARRATIVA (base: landing-page-narrativa.html) ─────────────────────────
  {
    id: 13, nome: 'Narrativa Dourado', template: 'landing-page-narrativa.html',
    css: '' // original
  },
  {
    id: 14, nome: 'Narrativa Coral', template: 'landing-page-narrativa.html',
    css: `:root{--accent:#D4643C;--accent2:#E89070;--accent3:#B84C28;--accent-dim:rgba(212,100,60,.10);--accent-glow:rgba(212,100,60,.18);}`
  },
  {
    id: 15, nome: 'Narrativa Roxo', template: 'landing-page-narrativa.html',
    css: `:root{--accent:#9B7FD4;--accent2:#C0A8E8;--accent3:#7B5FBA;--accent-dim:rgba(155,127,212,.10);--accent-glow:rgba(155,127,212,.18);}`
  },
  {
    id: 16, nome: 'Narrativa Teal', template: 'landing-page-narrativa.html',
    css: `:root{--accent:#3DBDA8;--accent2:#6ED4C4;--accent3:#2D9D88;--accent-dim:rgba(61,189,168,.10);--accent-glow:rgba(61,189,168,.18);}`
  },

  // ── IMPACTO (base: landing-page-impacto.html) ─────────────────────────────
  {
    id: 17, nome: 'Impacto Dourado', template: 'landing-page-impacto.html',
    css: '' // original
  },
  {
    id: 18, nome: 'Impacto Coral', template: 'landing-page-impacto.html',
    css: `:root{--accent:#D4643C;--accent2:#E89070;--accent3:#B84C28;--accent-dim:rgba(212,100,60,.08);--accent-glow:rgba(212,100,60,.15);}`
  },
  {
    id: 19, nome: 'Impacto Roxo', template: 'landing-page-impacto.html',
    css: `:root{--accent:#9B7FD4;--accent2:#C0A8E8;--accent3:#7B5FBA;--accent-dim:rgba(155,127,212,.08);--accent-glow:rgba(155,127,212,.15);}`
  },
  {
    id: 20, nome: 'Impacto Teal', template: 'landing-page-impacto.html',
    css: `:root{--accent:#3DBDA8;--accent2:#6ED4C4;--accent3:#2D9D88;--accent-dim:rgba(61,189,168,.08);--accent-glow:rgba(61,189,168,.15);}`
  },

  // ── CLÍNICO (base: landing-page-clinico.html) ─────────────────────────────
  { id:21, nome:'Clínico Verde',   template:'landing-page-clinico.html', css:'' },
  { id:22, nome:'Clínico Azul',    template:'landing-page-clinico.html',
    css:`:root{--accent:#1A4F8A;--accent2:#2A6FB0;--accent3:#0F3060;--accent-dim:rgba(26,79,138,.07);--accent-line:rgba(26,79,138,.15);}` },
  { id:23, nome:'Clínico Vinho',   template:'landing-page-clinico.html',
    css:`:root{--accent:#7A2040;--accent2:#9A3050;--accent3:#5A1030;--accent-dim:rgba(122,32,64,.07);--accent-line:rgba(122,32,64,.15);}` },
  { id:24, nome:'Clínico Grafite', template:'landing-page-clinico.html',
    css:`:root{--accent:#2A3A48;--accent2:#3A5060;--accent3:#1A2830;--accent-dim:rgba(42,58,72,.07);--accent-line:rgba(42,58,72,.15);}` },

  // ── URGÊNCIA (base: landing-page-urgencia.html) ────────────────────────────
  { id:25, nome:'Urgência Vermelho', template:'landing-page-urgencia.html', css:'' },
  { id:26, nome:'Urgência Âmbar',    template:'landing-page-urgencia.html',
    css:`:root{--red:#C07820;--red2:#D09030;--red3:#A06010;--red-dim:rgba(192,120,32,.10);--red-glow:rgba(192,120,32,.20);}` },
  { id:27, nome:'Urgência Roxo',     template:'landing-page-urgencia.html',
    css:`:root{--red:#7040C0;--red2:#9060E0;--red3:#5030A0;--red-dim:rgba(112,64,192,.10);--red-glow:rgba(112,64,192,.20);}` },
  { id:28, nome:'Urgência Teal',     template:'landing-page-urgencia.html',
    css:`:root{--red:#1A8A78;--red2:#2AAA90;--red3:#0A6A58;--red-dim:rgba(26,138,120,.10);--red-glow:rgba(26,138,120,.20);}` },

  // ── MINIMALISTA (base: landing-page-minimalista.html) ─────────────────────
  { id:29, nome:'Minimal Verde',  template:'landing-page-minimalista.html', css:'' },
  { id:30, nome:'Minimal Preto',  template:'landing-page-minimalista.html',
    css:`:root{--ink2:#1C1C1C;--ink3:#000000;}` },
  { id:31, nome:'Minimal Azul',   template:'landing-page-minimalista.html',
    css:`:root{--ink2:#1A4F8A;--ink3:#0F3060;}` },
  { id:32, nome:'Minimal Vinho',  template:'landing-page-minimalista.html',
    css:`:root{--ink2:#7A2040;--ink3:#5A1030;}` },
];

module.exports = { palettes };
