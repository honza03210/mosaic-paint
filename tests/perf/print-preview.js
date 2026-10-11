// Renders the print template of a sample mosaic to a PDF and a screenshot: node tests/perf/print-preview.js <outdir>
const { chromium } = require('@playwright/test');
const { spawn } = require('child_process');
const path = require('path');

(async () => {
  const out = process.argv[2] || '.';
  const server = spawn(process.execPath, [path.join(__dirname, '..', 'serve.js'), '4178'], { stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 500));
  const browser = await chromium.launch({ channel: process.env.CI ? undefined : 'chrome' });
  const context = await browser.newContext({ viewport: { width: 1400, height: 860 } });
  const page = await context.newPage();
  await page.goto('http://localhost:4178/');
  await page.waitForFunction(() => window.MZ && window.MZ.ready);
  await page.evaluate(() => {
    MZ.loadSVGText('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300mm" height="300mm"></svg>', { restore: true });
    MZ.setMode('expert');
    Object.assign(MZ.state.pattern, { type: 'hex', size: 12, angle: 0 });
    MZ.setTool('pattern');
    document.querySelector('#btn-pat-page').click();
    const ctx = { ix: MZ.regionIndex() }, pal = MZ.state.palette;
    ctx.ix.faces.forEach((f) => {
      const reg = ctx.ix.region(f), p = MZ.gridSample(reg.bb, q => MZ.insideRegion(reg, q), 1)[0];
      if (p) MZ.bucketAt(p, pal[(Math.floor(p.x / 40) + Math.floor(p.y / 40)) % pal.length], ctx, f);
    });
    MZ.commit(true);
    document.querySelector('#btn-print').click();
    document.querySelector('input[name=print-style][value=both]').checked = true;
  });
  const [popup] = await Promise.all([context.waitForEvent('page'), page.click('#print-go')]);
  await popup.waitForLoadState();
  await popup.pdf({ path: path.join(out, 'template.pdf'), preferCSSPageSize: true });
  await popup.emulateMedia({ media: 'print' });
  await popup.setViewportSize({ width: 820, height: 1200 });
  await popup.screenshot({ path: path.join(out, 'template.png'), fullPage: false });
  await browser.close();
  server.kill();
})();
