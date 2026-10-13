// The AI on phones: little memory to spare (iOS closes a tab that takes much more than a gigabyte). The engine
// starts lean (no memory arena), keeps only the models of the feature in use, and on iPhone / iPad it is the
// CPU engine (WebGPU is new in Safari's engine, which every iPhone browser uses). Stand-ins for the AI.
const { test } = require('@playwright/test');
const { expect } = require('./helpers');

test('Select object on a phone: a lean start, one feature’s models; the CPU engine on an iPhone', async ({ page }, info) => {
  await page.route(/huggingface\.co|cdn\.jsdelivr\.net/, (r) => r.fulfill({ body: Buffer.alloc(64, 7), contentType: 'application/octet-stream' }));
  await page.addInitScript(() => {
    window.__aiCalls = [];
    window.__aiStub = (op, a) => {
      window.__aiCalls.push([op, op === 'init' ? { gpu: a.gpu, lean: a.lean } : op === 'keepOnly' ? a.keep : null]);
      if (op === 'msamEncode') { window.__s = { w: a.img.width, h: a.img.height }; return true; }
      if (op === 'msamMask') return new Uint8Array(window.__s.w * window.__s.h).fill(255);
      return op === 'has' ? false : true;
    };
  });
  await page.goto('raster.html');
  await page.waitForFunction(() => window.RZ && window.RZ.ready);
  await page.evaluate(() => { RZ.blank(200, 100, '#808080'); RZ.state.selShape = 'object'; RZ.setTool('select'); });
  await page.click('#btn-fit');
  const p = await page.evaluate(() => RZ.screen(100, 50));
  await page.touchscreen.tap(p.x, p.y);
  const d = page.locator('#dlg-addon');
  await expect(d).toBeVisible();
  // the size asked about is the engine this phone gets
  const iphone = info.project.name === 'iphone';
  await expect(d).toContainText(iphone ? '14 MB' : /MB/);
  await d.locator('button[value=ok]').click();
  await expect.poll(() => page.evaluate(() => !!RZ.state.sel)).toBe(true);
  const calls = await page.evaluate(() => window.__aiCalls);
  const init = calls.find(c => c[0] === 'init')[1];
  expect(init.lean).toBe(true);
  if (iphone) expect(init.gpu).toBe(false);
  expect(calls.find(c => c[0] === 'keepOnly')[1]).toEqual(['msamEncoder', 'msamDecoder']);
});
