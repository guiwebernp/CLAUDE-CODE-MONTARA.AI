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

  // dá um respiro lateral nos cards de serviço do hero pra não encostarem na borda
  await page.addStyleTag({ content: `
    .hero__services { display: none !important; }
    .hero__chevron { display: none !important; }
  ` });

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  // trava os vídeos dos olhos no quadro inicial (olhos abertos) de forma robusta
  await page.evaluate(async () => {
    const vids = [...document.querySelectorAll('video')];
    for (const v of vids) { try { v.pause(); v.currentTime = 0; } catch (e) {} }
    await new Promise(r => setTimeout(r, 500));
    for (const v of vids) { try { v.pause(); v.currentTime = 0; } catch (e) {} }
    await new Promise(r => setTimeout(r, 400));
  });

  // insere um respiro escuro logo após o slogan (garante fundo escuro, sem pegar a próxima seção)
  const bottom = await page.evaluate(() => {
    const tagline = document.querySelector('.hero__tagline');
    const spacer = document.createElement('div');
    spacer.style.height = '150px';
    spacer.style.background = '#05070d';
    tagline.insertAdjacentElement('afterend', spacer);
    return spacer.getBoundingClientRect().bottom;
  });

  await page.screenshot({
    path: path.join(__dirname, 'raw', 'mobile-hero.png'),
    fullPage: true,
    clip: { x: 0, y: 0, width: 390, height: Math.round(bottom) },
  });
  console.log('✅ mobile-hero.png (olhos abertos, sem cards)');

  await browser.close();
})();
