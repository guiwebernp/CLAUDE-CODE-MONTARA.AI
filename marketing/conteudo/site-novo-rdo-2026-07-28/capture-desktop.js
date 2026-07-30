const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });

  const sitePath = path.resolve(
    __dirname, '..', '..', '..',
    'clientes', 'RDO COMUNICAÇÃO VISUAL', 'site', 'Novo site RDO Comvisual',
    'design_handoff_rdo_site', 'site', 'index.html'
  );
  await page.goto(`file://${sitePath}`);
  await page.waitForTimeout(1500);

  // varre pra lazy-load
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);

  // captura cada seção inteira (element screenshot) — mostra o grid completo
  const secoes = [
    { id: '#empresa',   file: 'desk-empresa.png' },
    { id: '#servicos',  file: 'desk-servicos.png' },
    { id: '#portfolio', file: 'desk-portfolio.png' },
    { id: '#contato',   file: 'desk-contato.png' },
  ];

  for (const s of secoes) {
    const el = await page.$(s.id);
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await el.screenshot({ path: path.join(__dirname, 'raw', s.file) });
    console.log(`✅ ${s.file}`);
  }

  await browser.close();
})();
