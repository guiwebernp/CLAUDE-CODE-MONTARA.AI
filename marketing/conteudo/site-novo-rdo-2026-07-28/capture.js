const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1600 } });

  const sitePath = path.resolve(
    __dirname,
    '..', '..', '..',
    'clientes', 'RDO COMUNICAÇÃO VISUAL', 'site', 'Novo site RDO Comvisual',
    'design_handoff_rdo_site', 'site', 'index.html'
  );
  await page.goto(`file://${sitePath}`);
  await page.waitForTimeout(1500);

  const eyesEl = await page.$('#eyeStage');
  await eyesEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await eyesEl.screenshot({ path: path.join(__dirname, 'raw', 'shot-eyes.png') });
  console.log('✅ shot-eyes.png');

  const shots = [
    { selector: 'header.hero', file: 'shot-hero.png', clipHeight: 1500, xOffset: 0 },
    { selector: '#empresa', file: 'shot-empresa.png', clipHeight: 1400, xOffset: 480 },
    { selector: '#servicos', file: 'shot-servicos.png', clipHeight: 1100, xOffset: 0 },
    { selector: '#portfolio', file: 'shot-portfolio.png', clipHeight: 1300, xOffset: 0 },
    { selector: '#contato', file: 'shot-contato.png', clipHeight: 1400, xOffset: 0 },
  ];

  for (const shot of shots) {
    const el = await page.$(shot.selector);
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const box = await el.boundingBox();
    await page.screenshot({
      path: path.join(__dirname, 'raw', shot.file),
      clip: {
        x: box.x + (shot.xOffset || 0),
        y: box.y,
        width: box.width - (shot.xOffset || 0),
        height: Math.min(shot.clipHeight, box.height),
      },
    });
    console.log(`✅ ${shot.file}`);
  }

  await browser.close();
})();
