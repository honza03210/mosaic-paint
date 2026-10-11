// Breaks a single bucket click on a big hex mosaic into its parts: node tests/perf/prof-click.js
const { chromium } = require('@playwright/test');
const { spawn } = require('child_process');
const path = require('path');

(async () => {
  const server = spawn(process.execPath, [path.join(__dirname, '..', 'serve.js'), '4175'], { stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 500));
  const browser = await chromium.launch({ channel: process.env.CI ? undefined : 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1400, height: 860 } });
  await page.goto('http://localhost:4175/');
  await page.waitForFunction(() => window.MZ && window.MZ.ready);
  const r = await page.evaluate(() => {
    MZ.loadSVGText('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"></svg>', { restore: true });
    Object.assign(MZ.state.pattern, { type: 'hex', size: 12, angle: 0 });
    MZ.setTool('pattern');
    document.querySelector('#btn-pat-page').click();
    const ctx = { ix: MZ.regionIndex() };
    ctx.ix.faces.forEach((f) => {
      const reg = ctx.ix.region(f), p = MZ.gridSample(reg.bb, q => MZ.insideRegion(reg, q), 1)[0];
      if (p) MZ.bucketAt(p, '#2a9d8f', ctx, f);
    });
    MZ.commit();
    const t = {}, time = (n, fn) => { const s = performance.now(); fn(); t[n] = +(performance.now() - s).toFixed(1); };
    time('regionIndex (cached)', () => MZ.regionIndex());
    time('bucketAt', () => MZ.bucketAt({ x: 507, y: 507 }, '#000000', { ix: MZ.regionIndex() }));
    time('commit total', () => MZ.commit());
    time('buildSVGString', () => MZ.buildSVGString());
    time('snapshot innerHTML', () => { void document.querySelector('#mz-fills').innerHTML; void document.querySelector('#mz-shapes').innerHTML; });
    time('palette render', () => MZ.emit('noop'));
    return t;
  });
  console.log(r);
  await browser.close();
  server.kill();
})();
