// Performance benchmark on big mosaics: node tests/perf/bench.js
// Prints milliseconds for the operations that should feel instant.
const { chromium } = require('@playwright/test');
const { spawn } = require('child_process');
const path = require('path');

const PORT = 4174;

async function main() {
  const server = spawn(process.execPath, [path.join(__dirname, '..', 'serve.js'), String(PORT)], { stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 500));
  const browser = await chromium.launch({ channel: process.env.CI ? undefined : 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1400, height: 860 } });
  page.on('dialog', d => d.accept());
  await page.goto(`http://localhost:${PORT}/`);
  await page.waitForFunction(() => window.MZ && window.MZ.ready);

  for (const [type, size] of [['square', 20], ['hex', 12]]) {
    const r = await page.evaluate(async ([type, size]) => {
      const t = {};
      const time = (name, fn) => { const s = performance.now(); const v = fn(); t[name] = Math.round(performance.now() - s); return v; };
      MZ.loadSVGText('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"></svg>', { restore: true });
      Object.assign(MZ.state.pattern, { type, size, angle: 0 });
      MZ.setTool('pattern');
      time('pattern', () => document.querySelector('#btn-pat-page').click());
      t.lines = document.querySelectorAll('#mz-shapes line').length;
      const pal = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];
      time('paintAll', () => {
        const ctx = { ix: Geo.regionIndex(MZ.boundarySegments()) };
        ctx.ix.faces.forEach((f, i) => {
          const reg = ctx.ix.region(f), p = MZ.gridSample(reg.bb, q => MZ.insideRegion(reg, q), 1)[0];
          if (p) MZ.bucketAt(p, pal[i % 5], ctx, f);
        });
        MZ.commit();
      });
      t.tiles = document.querySelectorAll('.mz-fill').length;

      const svg = document.querySelector('#canvas'), rect = svg.getBoundingClientRect(), v = MZ.state.view;
      const ev = (type, x, y, extra = {}) => svg.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerId: 1, pointerType: 'mouse', button: 0,
        clientX: (x - v.x) * v.s + rect.left, clientY: (y - v.y) * v.s + rect.top, ...extra }));
      MZ.setTool('line');
      time('100 mouse moves (line tool, snapping)', () => { for (let i = 0; i < 100; i++) ev('pointermove', 100 + i * 8, 333 + (i % 7)); });
      MZ.setTool('bucket');
      MZ.state.fill = '#000000';
      time('bucket click', () => { ev('pointerdown', 507, 507); ev('pointerup', 507, 507); });
      MZ.setTool('select');
      time('select click', () => { ev('pointerdown', 497, 503); ev('pointerup', 497, 503); });
      // drag the first selected line's start point a bit (vertex drag + commit with repaint of areas)
      const sel = [...MZ.state.selection][0];
      if (sel && sel.tagName === 'line') {
        const x1 = +sel.getAttribute('x1'), y1 = +sel.getAttribute('y1');
        time('drag a line end (10 moves + release)', () => {
          ev('pointerdown', x1, y1);
          for (let i = 1; i <= 10; i++) ev('pointermove', x1 + i * 1.5, y1, { buttons: 1 });
          ev('pointerup', x1 + 15, y1);
        });
      }
      time('undo', () => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', ctrlKey: true })));
      t.snapshotKB = Math.round(MZ.buildSVGString().length / 1024);
      return t;
    }, [type, size]);
    console.log(`\n${type} ${size}:`, JSON.stringify(r, null, 1));
  }
  await browser.close();
  server.kill();
}

main().catch(e => { console.error(e); process.exit(1); });
