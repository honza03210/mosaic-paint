// Renders the laying plan of a sample mosaic to a PDF: node tests/perf/plan-preview.js <outdir>
const { chromium } = require('@playwright/test');
const { spawn } = require('child_process');
const path = require('path');

(async () => {
  const out = process.argv[2] || '.';
  const server = spawn(process.execPath, [path.join(__dirname, '..', 'serve.js'), '4179'], { stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 500));
  const browser = await chromium.launch({ channel: process.env.CI ? undefined : 'chrome' });
  const context = await browser.newContext({ viewport: { width: 1400, height: 860 } });
  const page = await context.newPage();
  await page.goto('http://localhost:4179/');
  await page.waitForFunction(() => window.MZ && window.MZ.ready);
  await page.evaluate(() => {
    MZ.loadSVGText('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600mm" height="400mm"></svg>', { restore: true });
    MZ.setMode('expert');
    Object.assign(MZ.state.pattern, { type: 'brick', size: 20, angle: 0 });
    MZ.setTool('pattern');
    document.querySelector('#btn-pat-page').click();
    const ctx = { ix: MZ.regionIndex() }, pal = MZ.state.palette;
    ctx.ix.faces.forEach((f) => {
      const reg = ctx.ix.region(f), p = MZ.gridSample(reg.bb, q => MZ.insideRegion(reg, q), 1)[0];
      if (p) MZ.bucketAt(p, pal[Math.floor(Math.hypot(p.x - 300, p.y - 200) / 40) % pal.length], ctx, f);
    });
    MZ.commit(true);
    document.querySelector('#btn-layplan').click();
    const w = document.querySelector('#lp-w'), h = document.querySelector('#lp-h');
    w.value = 300; h.value = 200; h.dispatchEvent(new Event('change'));
  });
  const [popup] = await Promise.all([context.waitForEvent('page'), page.click('#lp-go')]);
  await popup.waitForLoadState();
  await popup.pdf({ path: path.join(out, 'plan.pdf'), preferCSSPageSize: true });
  await browser.close();
  server.kill();
})();
