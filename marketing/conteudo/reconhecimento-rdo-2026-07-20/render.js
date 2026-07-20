const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Caminho do HTML
    const htmlPath = path.resolve(__dirname, 'carrossel.html');
    await page.goto(`file://${htmlPath}`);

    // Criar pasta instagram se não existir
    const instagramDir = path.join(__dirname, 'instagram');
    if (!fs.existsSync(instagramDir)) {
        fs.mkdirSync(instagramDir, { recursive: true });
    }

    // Encontrar todos os slides
    const slideCount = await page.evaluate(() => {
        return document.querySelectorAll('.slide').length;
    });

    console.log(`📸 Renderizando ${slideCount} slides...`);

    // Renderizar cada slide
    for (let i = 0; i < slideCount; i++) {
        const slideSelector = `.slide:nth-child(${i + 1})`;
        const outputPath = path.join(instagramDir, `slide-${String(i + 1).padStart(2, '0')}.png`);

        // Scroll pra o slide (para o Playwright enxergar melhor)
        await page.evaluate((selector) => {
            const elem = document.querySelector(selector);
            if (elem) elem.scrollIntoView({ block: 'center' });
        }, slideSelector);

        // Screenshot do slide
        const slide = await page.$(slideSelector);
        await slide.screenshot({
            path: outputPath,
            omitBackground: false
        });

        console.log(`✅ Slide ${i + 1}/${slideCount} → ${outputPath}`);
    }

    console.log('\n🎉 Todos os slides renderizados com sucesso!');
    console.log(`📁 Pasta: ${instagramDir}`);

    await browser.close();
})();
