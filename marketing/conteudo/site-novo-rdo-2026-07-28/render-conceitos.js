const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(`file://${path.resolve(__dirname, 'conceitos.html')}`);
    await page.waitForTimeout(1200);

    const dir = path.join(__dirname, 'conceitos');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const slides = await page.$$('.slide');
    const nomes = ['conceito-a', 'conceito-b', 'conceito-c'];
    for (let i = 0; i < slides.length; i++) {
        await slides[i].screenshot({ path: path.join(dir, `${nomes[i]}.png`) });
        console.log(`✅ ${nomes[i]}`);
    }
    await browser.close();
})();
