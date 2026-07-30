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

  // varre a página toda pra disparar lazy-load das imagens
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 700) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);

  const pageHeight = await page.evaluate(() => document.body.scrollHeight);

  // hero: uma tela cheia
  await page.screenshot({ path: path.join(__dirname, 'raw', 'mobile-hero.png') });
  console.log('✅ mobile-hero.png');

  const secoes = [
    { id: '#empresa',   file: 'mobile-empresa.png',   height: 1500 },
    { id: '#servicos',  file: 'mobile-servicos.png',  height: 2100 },
    { id: '#portfolio', file: 'mobile-portfolio.png', height: 1700 },
    { id: '#contato',   file: 'mobile-contato.png',   height: 1700 },
  ];

  for (const s of secoes) {
    const top = await page.evaluate((id) => {
      const el = document.querySelector(id);
      return el.getBoundingClientRect().top + window.scrollY;
    }, s.id);

    const height = Math.min(s.height, pageHeight - top - 2);

    await page.screenshot({
      path: path.join(__dirname, 'raw', s.file),
      fullPage: true,
      clip: { x: 0, y: top, width: 390, height },
    });
    console.log(`✅ ${s.file}  (y=${Math.round(top)}, h=${Math.round(height)})`);
  }

  await browser.close();
})();
