// Mouse-move cost on a big mosaic, split into script time and total time: node tests/perf/prof-move.js [chromium|webkit|firefox]
const pw = require('@playwright/test');
const { spawn } = require('child_process');
const path = require('path');

(async () => {
  const engine = process.argv[2] || 'webkit';
  const server = spawn(process.execPath, [path.join(__dirname, '..', 'serve.js'), '4176'], { stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 500));
  const browser = await pw[engine].launch(engine === 'chromium' && !process.env.CI ? { channel: 'chrome' } : {});
  const page = await browser.newPage({ viewport: { width: 1400, height: 860 } });
  await page.goto('http://localhost:4176/');
  await page.waitForFunction(() => window.MZ && window.MZ.ready);
  await page.evaluate(() => {
    MZ.loadSVGText('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"></svg>', { restore: true });
    Object.assign(MZ.state.pattern, { type: 'square', size: 20, angle: 0 });
    MZ.setTool('pattern');
    document.querySelector('#btn-pat-page').click();
    const ctx = { ix: MZ.regionIndex() };
    ctx.ix.faces.forEach((f, i) => {
      const reg = ctx.ix.region(f), p = MZ.gridSample(reg.bb, q => MZ.insideRegion(reg, q), 1)[0];
      if (p) MZ.bucketAt(p, ['#264653', '#2a9d8f', '#e9c46a'][i % 3], ctx, f);
    });
    MZ.commit(true);
    MZ.setTool('line');
    window.__js = 0;
    document.querySelector('#canvas').addEventListener('pointermove', () => { window.__t0 = performance.now(); }, { capture: true });
    document.querySelector('#canvas').addEventListener('pointermove', () => { window.__js += performance.now() - window.__t0; });
  });
  const t = Date.now();
  for (let i = 0; i < 40; i++) await page.mouse.move(300 + i * 10, 400 + (i % 5));
  const total = Date.now() - t, js = await page.evaluate(() => window.__js);
  console.log(`${engine}: 40 moves total ${total} ms, script ${js.toFixed(0)} ms`);
  await browser.close();
  server.kill();
})();
