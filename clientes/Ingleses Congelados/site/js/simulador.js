/* Monte seu pedido — estimativa de abastecimento semanal.
 *
 * ATENÇÃO: os coeficientes abaixo são estimativas de referência para o protótipo.
 * O time comercial da Ingleses precisa validar/ajustar com os números reais antes
 * de publicar — é só editar TIPOS e CATEGORIAS aqui.
 */

const DIAS_SEMANA = 6;

// taxa = fração dos clientes do dia que levam algum item de panificação
const TIPOS = [
  { id: 'mercado', nome: 'Mercado de bairro', taxa: 0.35 },
  { id: 'supermercado', nome: 'Supermercado', taxa: 0.28 },
  { id: 'conveniencia', nome: 'Conveniência', taxa: 0.22 },
  { id: 'padaria', nome: 'Padaria', taxa: 0.62 },
  { id: 'lanchonete', nome: 'Lanchonete / bar', taxa: 0.3 },
];

// unid = itens por comprador/dia · peso = kg por item
const CATEGORIAS = [
  { id: 'paes', nome: 'Pães', unid: 5, peso: 0.05, padrao: true },
  { id: 'especiais', nome: 'Pães especiais', unid: 0.6, peso: 0.3, padrao: false },
  { id: 'preassados', nome: 'Pré-assados', unid: 1.2, peso: 0.08, padrao: true },
  { id: 'salgados', nome: 'Salgados', unid: 1.5, peso: 0.09, padrao: true },
  { id: 'doces', nome: 'Doces', unid: 0.8, peso: 0.07, padrao: false },
  { id: 'confeitaria', nome: 'Confeitaria', unid: 0.25, peso: 0.12, padrao: false },
];

const PORTES = [
  { ate: 120, texto: '1 forno turbo + 1 estufa + 1 freezer' },
  { ate: 350, texto: '1 forno turbo + 2 estufas + 1 freezer horizontal' },
  { ate: 700, texto: '2 fornos turbo + 2 estufas + 2 freezers' },
  { ate: Infinity, texto: '2 fornos turbo + câmara fria — projeto dedicado' },
];

const el = (id) => document.getElementById(id);
const elTipos = el('sim-tipos');
const elCategorias = el('sim-categorias');
const elClientes = el('sim-clientes');
const elLista = el('sim-lista');
const elTotal = el('sim-total');
const elEquip = el('sim-equip');
const elCta = el('sim-cta');

if (elTipos && elCategorias && elClientes) {
  let tipoAtivo = TIPOS[0].id;

  elTipos.innerHTML = TIPOS.map((t, i) =>
    `<button type="button" class="sim-chip${i === 0 ? ' ativo' : ''}" data-tipo="${t.id}">${t.nome}</button>`
  ).join('');

  elCategorias.innerHTML = CATEGORIAS.map((c) =>
    `<label class="sim-check">
      <input type="checkbox" value="${c.id}"${c.padrao ? ' checked' : ''}>
      <span>${c.nome}</span>
    </label>`
  ).join('');

  const formatar = (kg) => (kg >= 100 ? Math.round(kg) : kg.toFixed(1).replace('.', ','));

  function calcular() {
    const tipo = TIPOS.find((t) => t.id === tipoAtivo);
    const clientes = Math.max(0, Number(elClientes.value) || 0);
    const compradores = clientes * tipo.taxa;

    const marcadas = [...elCategorias.querySelectorAll('input:checked')].map((i) => i.value);
    const itens = CATEGORIAS.filter((c) => marcadas.includes(c.id)).map((c) => ({
      nome: c.nome,
      kg: compradores * c.unid * c.peso * DIAS_SEMANA,
    }));

    const total = itens.reduce((s, i) => s + i.kg, 0);

    elLista.innerHTML = itens.length
      ? itens.map((i) => `<li><span>${i.nome}</span><strong>${formatar(i.kg)} kg</strong></li>`).join('')
      : '<li class="sim-vazio">Selecione ao menos uma categoria.</li>';

    elTotal.textContent = formatar(total);
    elEquip.textContent = total > 0 ? PORTES.find((p) => total <= p.ate).texto : '—';

    const linhas = itens.map((i) => `• ${i.nome}: ~${formatar(i.kg)} kg/semana`).join('\n');
    const texto =
      `Olá! Simulei meu abastecimento no site da Ingleses:\n\n` +
      `Estabelecimento: ${tipo.nome}\n` +
      `Movimento: ~${clientes} clientes/dia\n\n` +
      `Estimativa semanal:\n${linhas}\n\n` +
      `Total: ~${formatar(total)} kg/semana\n` +
      `Equipamento sugerido: ${elEquip.textContent}\n\n` +
      `Gostaria de falar com o comercial.`;

    if (elCta) elCta.href = `https://api.whatsapp.com/send?phone=5548988288670&text=${encodeURIComponent(texto)}`;
  }

  elTipos.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-tipo]');
    if (!btn) return;
    tipoAtivo = btn.dataset.tipo;
    elTipos.querySelectorAll('.sim-chip').forEach((c) => c.classList.toggle('ativo', c === btn));
    calcular();
  });

  document.querySelectorAll('.sim-stepper [data-delta]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const novo = Number(elClientes.value) + Number(btn.dataset.delta);
      elClientes.value = Math.min(5000, Math.max(10, novo));
      calcular();
    });
  });

  elClientes.addEventListener('input', calcular);
  elCategorias.addEventListener('change', calcular);

  calcular();
}
