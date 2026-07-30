const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 });

  const sitePath = path.resolve(
    __dirname, '..', '..', '..',
    'clientes', 'RDO COMUNICAÇÃO VISUAL', 'site', 'Novo site RDO Comvisual',
    'design_handoff_rdo_site', 'site', 'index.html'
  );
  await page.goto(`file://${sitePath}`);
  await page.waitForTimeout(1500);
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);

  // só o card do formulário
  const form = await page.$('.form-card');
  await form.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await form.screenshot({ path: path.join(__dirname, 'raw', 'mobile-form.png') });
  console.log('✅ mobile-form.png');

  // uma tela do portfólio (heading + filtros + cards)
  const top = await page.evaluate(() => {
    const el = document.querySelector('#portfolio');
    return el.getBoundingClientRect().top + window.scrollY;
  });
  await page.screenshot({
    path: path.join(__dirname, 'raw', 'mobile-portview.png'),
    fullPage: true,
    clip: { x: 0, y: top, width: 390, height: 980 },
  });
  console.log('✅ mobile-portview.png');

  await browser.close();
})();
