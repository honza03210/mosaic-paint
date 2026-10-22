/* The raster editor's lessons: one small task per tool (and its settings), in five units. Every task opens
   its own starting picture, drawn here, so the checks know exactly what was there; they are forgiving
   ("most of the star is yellow" is done). The texts are short – one instruction at a time. */
import { t } from '../shared/i18n.ts';
import type { Box, Ctx, Task } from './types.ts';
import { picture, dashedCircle, dashedPath, dot, swatch, clicks, isColor, px, dist, rgb, share, ring, grid, around, seeded, type RGB } from './helpers.ts';

const S = (c: Ctx) => c.RZ.state;
const tool = (id: string) => `#tools [data-tool="${id}"]`;
const pickTool = (id: string, say: string) => ({ say, at: tool(id), done: (c: Ctx) => S(c).tool === id });
/** The picture as it was at the start (to see what a tool changed). */
function keepOriginal(c: Ctx): void {
  const d = c.RZ.doc;
  c.mem.orig = d.getContext('2d').getImageData(0, 0, d.width, d.height);
}
const origAt = (c: Ctx, x: number, y: number): RGB => {
  const o = c.mem.orig as ImageData, i = (Math.floor(y) * o.width + Math.floor(x)) * 4;
  return [o.data[i], o.data[i + 1], o.data[i + 2]];
};
const changed = (c: Ctx, x: number, y: number, by = 30) => dist(px(c, x, y).c, origAt(c, x, y)) > by;
const sizeAtLeast = (n: number, say: string) => ({ say, at: '#opt-size-range', done: (c: Ctx) => S(c).size >= n });
/** Sets an option to a starting value by using its control (so the panel shows it too). */
function setCheck(c: Ctx, sel: string, on: boolean): void { const i = c.d.querySelector<HTMLInputElement>(sel); if (i && i.checked !== on) i.click(); }
const labelOf = (sel: string) => (c: Ctx) => c.d.querySelector(sel)?.closest('label') || c.d.querySelector(sel);
const insideBox = (b: Box, x: number, y: number) => x >= b.x && y >= b.y && x <= b.x + b.w && y <= b.y + b.h;
const selCovers = (c: Ctx, b: Box) => { const s = S(c).sel; return !!s && s.x <= b.x && s.y <= b.y && s.x + s.w >= b.x + b.w && s.y + s.h >= b.y + b.h; };
const floatCentre = (c: Ctx) => { const f = S(c).floating; return f ? { x: f.x + f.canvas.width / 2, y: f.y + f.canvas.height / 2 } : null; };

// ---- unit 1: painting basics -------------------------------------------------------------------------------------
const STARS: [number, number][] = [[110, 90], [260, 170], [400, 80]];
const HEART = [
  '...........',
  '..oo...oo..',
  '.o##o.o##o.',
  'o####o####o',
  'o#########o',
  'o#########o',
  '.o#######o.',
  '..o#####o..',
  '...o###o...',
  '....o#o....',
  '.....o.....',
];
const heartCells = (ch: string): [number, number][] => HEART.flatMap((row, y) => [...row].map((k, x) => (k === ch ? [x + 1.5, y + 1.5] as [number, number] : null)).filter(Boolean) as [number, number][]);
const MUD: [number, number][] = [[175, 125], [320, 115], [205, 215], [330, 210]];
const PURPLE = '#6a4c93';
const feather = (x: CanvasRenderingContext2D, cx: number, cy: number) => { x.beginPath(); x.ellipse(cx, cy, 26, 62, 0.15, 0, Math.PI * 2); };

const unit1: Task[] = [
  {
    id: 'look', unit: 1, tool: 'pan',
    title: t('Look around'), story: t('A ladybird is hiding in the meadow. Zoom in and find it!'),
    learned: t('Zoom in to see details, move around with the hand (or two fingers), and Fit shows the whole picture.'),
    setup: (c) => {
      const r = seeded(4);
      picture(c, 600, 400, (x) => {
        x.fillStyle = '#a8dadc'; x.fillRect(0, 0, 600, 140);
        x.fillStyle = '#8ab17d'; x.fillRect(0, 140, 600, 260);
        for (let i = 0; i < 90; i++) { x.fillStyle = ['#f1faee', '#e9c46a', '#f4a261'][i % 3]; x.beginPath(); x.arc(r() * 600, 150 + r() * 245, 3 + r() * 3, 0, 7); x.fill(); }
        // the ladybird, up on a leaf in the corner
        x.fillStyle = '#2a9d8f'; x.beginPath(); x.ellipse(545, 60, 26, 14, -0.4, 0, 7); x.fill();
        x.fillStyle = '#d62828'; x.beginPath(); x.arc(545, 58, 9, 0, 7); x.fill();
        x.fillStyle = '#1d1d24'; for (const [a, b] of [[542, 55], [548, 61], [544, 62]]) { x.beginPath(); x.arc(a, b, 1.6, 0, 7); x.fill(); }
      });
      c.RZ.setTool('select');
    },
    steps: [
      { say: t('Tap Zoom in to look closer.'), at: '#btn-zoomin', enter: (c) => { c.mem.s0 = S(c).view.s; }, done: (c) => S(c).view.s > c.mem.s0 * 1.4, alt: { say: t('Spread two fingers on the picture to zoom in.'), at: '#stage' } },
      pickTool('pan', t('Tap the hand – it moves the picture.')),
      {
        say: t('Drag the picture until you find the ladybird.'), at: '#stage',
        enter: (c) => { c.mem.v0 = { ...S(c).view }; },
        done: (c) => {
          const v = S(c).view, p = c.RZ.screen(545, 58), st = c.d.querySelector('#stage').getBoundingClientRect();
          const moved = Math.abs(v.x - c.mem.v0.x) + Math.abs(v.y - c.mem.v0.y) > 5;
          return moved && p.x > st.left + 30 && p.x < st.right - 30 && p.y > st.top + 30 && p.y < st.bottom - 30;
        },
      },
      { say: t('You found it! Now tap Fit to see the whole picture again.'), at: '#btn-fit', done: (c) => Math.abs(S(c).view.s - c.mem.s0) / c.mem.s0 < 0.03 },
    ],
  },
  {
    id: 'stars', unit: 1, tool: 'brush',
    title: t('Night sky'), story: t('The night sky needs glowing stars. Paint them with a soft brush.'),
    learned: t('The Brush paints soft lines. Size makes it bigger, and the Soft tip makes it glow at the edges.'),
    setup: (c) => {
      picture(c, 500, 300, (x) => {
        x.fillStyle = '#1d3557'; x.fillRect(0, 0, 500, 300);
        for (const [a, b] of STARS) { x.fillStyle = '#8899aa'; x.beginPath(); x.arc(a, b, 4, 0, 7); x.fill(); dashedCircle(x, a, b, 26); }
      });
      c.RZ.setTool('select');
    },
    steps: [
      pickTool('brush', t('Tap the Brush.')),
      { say: t('Tap the yellow color.'), at: swatch('#e9c46a'), done: (c) => S(c).fill === '#e9c46a' },
      { say: t('Choose the Soft tip – it glows at the edges.'), at: '#opt-tip', done: (c) => S(c).tip === 'soft' },
      sizeAtLeast(30, t('Make the brush big: slide Size to 30 or more.')),
      { say: t('Paint over the 3 stars.'), area: () => around(STARS, 34), done: (c) => STARS.every(([x, y]) => isColor(c, x, y, '#e9c46a', 90)) },
    ],
  },
  {
    id: 'heart', unit: 1, tool: 'pencil',
    title: t('Pixel heart'), story: t('Fill the heart square by square – like a real mosaic.'),
    learned: t('The Pencil paints whole squares in exactly the chosen color – just right for pixel art.'),
    setup: (c) => {
      picture(c, 13, 13, (x) => {
        x.fillStyle = '#dfe7ef'; x.fillRect(0, 0, 13, 13);
        HEART.forEach((row, y) => [...row].forEach((k, i) => { if (k === '.') return; x.fillStyle = k === 'o' ? '#264653' : '#ffffff'; x.fillRect(i + 1, y + 1, 1, 1); }));
      });
      c.RZ.setTool('select');
      // red is the first paint color: start from another one, so choosing red is a real step
      (swatch('#264653')(c) as HTMLElement | null)?.click();
    },
    steps: [
      pickTool('pencil', t('Tap the Pencil.')),
      { say: t('Tap the red color.'), at: swatch('#e76f51'), done: (c) => S(c).fill === '#e76f51' },
      { say: t('Make the pencil as small as it goes: slide Size all the way left.'), at: '#opt-size-range', done: (c) => S(c).size <= 2 },
      { say: t('Fill the inside of the heart, square by square.'), area: () => ({ x: 1, y: 1, w: 11, h: 11 }), done: (c) => share(heartCells('#'), (x, y) => isColor(c, x, y, '#e76f51', 2)) >= 0.9 },
    ],
  },
  {
    id: 'window', unit: 1, tool: 'eraser',
    title: t('Muddy window'), story: t('Someone threw mud at the window. Rub it off!'),
    learned: t('The Eraser takes paint away – where it rubs, the picture becomes see-through (the checkerboard).'),
    setup: (c) => {
      picture(c, 500, 340, (x) => {
        x.fillStyle = '#f4a261'; x.fillRect(0, 0, 500, 340);
        x.fillStyle = '#7a4b2a'; x.fillRect(95, 55, 310, 230);
        x.fillStyle = '#a8dadc'; x.fillRect(110, 70, 280, 200);
        x.fillStyle = '#7a4b2a'; x.fillRect(245, 70, 10, 200); x.fillRect(110, 165, 280, 10);
        x.fillStyle = '#6b4f2c'; for (const [a, b] of MUD) { x.beginPath(); x.arc(a, b, 22, 0, 7); x.fill(); }
      });
      c.RZ.setTool('select');
    },
    steps: [
      pickTool('eraser', t('Tap the Eraser.')),
      sizeAtLeast(30, t('Make it big: slide Size to 30 or more.')),
      { say: t('Rub out the 4 mud spots.'), area: () => around(MUD, 30), done: (c) => MUD.every(([x, y]) => c.RZ.alphaAt(x, y) < 40) },
    ],
  },
  {
    id: 'feather', unit: 1, tool: 'picker',
    title: t('Copy the color'), story: t('The parrot lost a feather. Paint a new one in exactly the same purple.'),
    learned: t('The color picker takes a color from the picture. (Tip: Alt+click does it with any brush.)'),
    setup: (c) => {
      picture(c, 500, 320, (x) => {
        x.fillStyle = '#f1faee'; x.fillRect(0, 0, 500, 320);
        x.fillStyle = PURPLE; feather(x, 170, 160); x.fill(); feather(x, 250, 160); x.fill();
        x.fillStyle = '#ffffff'; x.strokeStyle = '#264653'; x.lineWidth = 3; feather(x, 330, 160); x.fill(); x.stroke();
      });
      c.RZ.setTool('select');
    },
    steps: [
      pickTool('picker', t('Tap the color picker – the dropper.')),
      { say: t('Tap a purple feather to take its color.'), area: () => ({ x: 140, y: 95, w: 140, h: 130 }), done: (c) => !!S(c).fill && dist(rgb(S(c).fill), rgb(PURPLE)) < 12 },
      pickTool('brush', t('Now take the Brush.')),
      sizeAtLeast(20, t('Make it bigger: Size 20 or more.')),
      { say: t('Paint the white feather purple.'), area: () => ({ x: 300, y: 95, w: 60, h: 130 }), done: (c) => share([[330, 160], [326, 130], [334, 190], [324, 112], [336, 208]], (x, y) => isColor(c, x, y, PURPLE, 45)) >= 0.8 },
    ],
  },
  {
    id: 'comic', unit: 1, tool: 'bucket',
    title: t('Color the comic'), story: t('Fill the shapes with color – one tap each.'),
    learned: t('The Paint bucket fills a whole area at once. Tolerance decides how different the colors in it may be.'),
    setup: (c) => {
      picture(c, 500, 340, (x) => {
        x.fillStyle = '#ffffff'; x.fillRect(0, 0, 500, 340);
        x.strokeStyle = '#1d1d24'; x.lineWidth = 4;
        x.beginPath(); x.arc(100, 115, 55, 0, 7); x.stroke();
        x.strokeRect(190, 62, 110, 110);
        x.beginPath(); x.moveTo(330, 172); x.lineTo(470, 172); x.lineTo(400, 58); x.closePath(); x.stroke();
        // a shaded box: light at the top, greyer at the bottom
        const g = x.createLinearGradient(0, 215, 0, 315); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#d4d4d4');
        x.fillStyle = g; x.fillRect(120, 215, 260, 100); x.strokeRect(120, 215, 260, 100);
      });
      c.RZ.setTool('select');
    },
    steps: [
      pickTool('bucket', t('Tap the Paint bucket.')),
      { say: t('Tap the orange color.'), at: swatch('#f4a261'), done: (c) => S(c).fill === '#f4a261' },
      { say: t('Tap inside the circle, the square and the triangle.'), area: () => ({ x: 40, y: 50, w: 440, h: 130 }), done: (c) => [[100, 115], [245, 117], [400, 140]].every(([x, y]) => isColor(c, x, y, S(c).fill, 20)) },
      { say: t('This box is shaded. Slide Tolerance up to 60 or more.'), at: '#opt-tolerance', done: (c) => S(c).tolerance >= 60 },
      { say: t('Now tap inside the shaded box – all of it fills.'), area: () => ({ x: 120, y: 215, w: 260, h: 100 }), done: (c) => share(grid({ x: 126, y: 221, w: 248, h: 88 }, 6), (x, y) => isColor(c, x, y, S(c).fill, 20)) >= 0.92 },
    ],
  },
];

// ---- unit 2: shapes ------------------------------------------------------------------------------------------------
const POSTS = [130, 250, 370];
const CELLS: [number, number][] = [[120, 150], [250, 150], [380, 150]];
const hexPts = (cx: number, cy: number, r: number): [number, number][] => Array.from({ length: 6 }, (_, i) => [cx + r * Math.cos(i * Math.PI / 3), cy + r * Math.sin(i * Math.PI / 3)] as [number, number]);
const SNAKE: [number, number][] = [[70, 200], [150, 120], [250, 190], [350, 110], [430, 170]];
const dark = (c: Ctx, x: number, y: number) => { const p = px(c, x, y); return p.a > 200 && p.c[0] + p.c[1] + p.c[2] < 300; };

const unit2: Task[] = [
  {
    id: 'fence', unit: 2, tool: 'line',
    title: t('Fence'), story: t('The garden needs a fence. Draw the posts with straight lines.'),
    learned: t('The Line tool draws straight lines from where you press to where you let go.'),
    setup: (c) => {
      picture(c, 500, 320, (x) => {
        x.fillStyle = '#a8dadc'; x.fillRect(0, 0, 500, 180);
        x.fillStyle = '#8ab17d'; x.fillRect(0, 180, 500, 140);
        for (const p of POSTS) { dot(x, p, 250); dot(x, p, 120); }
      });
      c.RZ.setTool('select');
    },
    steps: [
      pickTool('line', t('Tap the Line tool.')),
      { say: t('Tap the dark color.'), at: swatch('#264653'), done: (c) => S(c).fill === '#264653' },
      sizeAtLeast(8, t('Make the line thicker: Size 8 or more.')),
      {
        say: t('Draw a line from each bottom dot up to the dot above it.'), area: () => ({ x: 100, y: 105, w: 300, h: 160 }),
        done: (c) => POSTS.every(p => share([140, 160, 180, 200, 220, 235].map(y => [p, y] as [number, number]), (x, y) => [-6, -3, 0, 3, 6].some(d => dark(c, x + d, y))) >= 0.8),
      },
    ],
  },
  {
    id: 'hive', unit: 2, tool: 'ngon',
    title: t('Beehive'), story: t('Bees build cells with 6 sides. Draw 3 honeycomb cells.'),
    learned: t('The Polygon tool draws shapes with as many sides as you choose – filled, outlined or both.'),
    setup: (c) => {
      picture(c, 500, 300, (x) => {
        x.fillStyle = '#fff3c4'; x.fillRect(0, 0, 500, 300);
        for (const [a, b] of CELLS) dashedPath(x, hexPts(a, b, 55));
      });
      c.RZ.setTool('select');
      // start from a square, unfilled – the child sets them
      c.d.querySelector<HTMLElement>('#quick-sides [data-sides="4"]')?.click();
      setCheck(c, '#opt-ngon-fill', false);
    },
    steps: [
      pickTool('ngon', t('Tap the Polygon tool.')),
      { say: t('Tap 6 – a honeycomb cell has 6 sides.'), at: '#quick-sides [data-sides="6"]', done: (c) => S(c).sides === 6 },
      { say: t('Turn on Fill – the cells will be full of color.'), at: labelOf('#opt-ngon-fill'), done: (c) => S(c).ngonFill },
      { say: t('Tap the yellow color.'), at: swatch('#e9c46a'), done: (c) => S(c).fill === '#e9c46a' },
      { say: t('Drag from the middle of each cell outwards.'), area: () => around(CELLS, 62), done: (c) => CELLS.every(([x, y]) => share([[x, y], ...ring(x, y, 30)], (a, b) => isColor(c, a, b, '#e9c46a', 40)) >= 0.75) },
    ],
  },
  {
    id: 'bubbles', unit: 2, tool: 'ellipse',
    title: t('Bubbles'), story: t('Blow 3 round soap bubbles – just the outline, you can see through them.'),
    learned: t('The Ellipse tool draws circles and ovals. From center starts in the middle; Fill and Outline decide how it looks.'),
    setup: (c) => {
      picture(c, 500, 300, (x) => {
        x.fillStyle = '#a8dadc'; x.fillRect(0, 0, 500, 300);
        for (const [a, b] of CELLS) dashedCircle(x, a, b, 45);
      });
      c.RZ.setTool('select');
      c.d.querySelector<HTMLInputElement>('input[name=elmode][value=corner]')?.click();
      setCheck(c, '#opt-ngon-fill', true);
      setCheck(c, '#opt-ngon-outline', false);
    },
    steps: [
      pickTool('ellipse', t('Tap the Ellipse tool.')),
      { say: t('Choose From center.'), at: (c) => c.d.querySelector('input[name=elmode][value=center]')?.closest('label'), done: (c) => S(c).ellipseMode === 'center' },
      { say: t('Turn Fill off – a bubble is see-through.'), at: labelOf('#opt-ngon-fill'), done: (c) => !S(c).ngonFill },
      { say: t('Turn Outline on.'), at: labelOf('#opt-ngon-outline'), done: (c) => S(c).ngonOutline },
      {
        say: t('Drag from the middle of each bubble to its edge.'), area: () => around(CELLS, 52),
        done: (c) => CELLS.every(([x, y]) => isColor(c, x, y, '#a8dadc', 25) && share(ring(x, y, 45, 12), (a, b) => [-9, -5, 0, 5, 9].some(d => { const q = px(c, a + (a - x) / 45 * d, b + (b - y) / 45 * d); return dist(q.c, rgb('#a8dadc')) > 80; })) >= 0.6),
      },
    ],
  },
  {
    id: 'snake', unit: 2, tool: 'curve',
    title: t('Snake'), story: t('Draw a wiggly snake through the dots.'),
    learned: t('The Curve tool draws a smooth line through the points you tap – double-tap (or Enter) finishes it.'),
    setup: (c) => {
      picture(c, 500, 300, (x) => {
        x.fillStyle = '#e9d8a6'; x.fillRect(0, 0, 500, 300);
        SNAKE.forEach(([a, b]) => dot(x, a, b, 7));
      });
      c.RZ.setTool('select');
    },
    steps: [
      pickTool('curve', t('Tap the Curve tool.')),
      { say: t('Tap the green color.'), at: swatch('#2a9d8f'), done: (c) => S(c).fill === '#2a9d8f' },
      sizeAtLeast(10, t('Make it a fat snake: Size 10 or more.')),
      {
        say: t('Tap the dots one by one from the head to the tail – tap the last one twice to finish.'), area: () => around(SNAKE, 26),
        done: (c) => SNAKE.every(([x, y]) => [[0, 0], [5, 0], [-5, 0], [0, 5], [0, -5], [8, 8], [-8, -8], [8, -8], [-8, 8]].some(([a, b]) => isColor(c, x + a, y + b, '#2a9d8f', 40))),
      },
    ],
  },
];

// ---- unit 3: selecting and moving ---------------------------------------------------------------------------------------
const CAT: Box = { x: 55, y: 80, w: 110, h: 120 };
const CUSHION = { cx: 380, cy: 215, rx: 85, ry: 32 };
const FISH: Box = { x: 115, y: 110, w: 170, h: 80 };
const BALLOON = { cx: 140, cy: 125, rx: 45, ry: 55 };
const drawCat = (x: CanvasRenderingContext2D) => {
  x.fillStyle = '#f4a261';
  x.beginPath(); x.arc(110, 150, 45, 0, 7); x.fill();
  x.beginPath(); x.moveTo(72, 125); x.lineTo(80, 85); x.lineTo(100, 110); x.fill();
  x.beginPath(); x.moveTo(148, 125); x.lineTo(140, 85); x.lineTo(120, 110); x.fill();
  x.fillStyle = '#1d1d24'; x.beginPath(); x.arc(95, 145, 5, 0, 7); x.arc(125, 145, 5, 0, 7); x.fill();
};

const unit3: Task[] = [
  {
    id: 'cat', unit: 3, tool: 'select',
    title: t('Move the cat'), story: t('The cat wants to sleep on the red cushion. Carry it there!'),
    learned: t('Select a part of the picture with a box, drag it somewhere else, then Place it.'),
    setup: (c) => {
      picture(c, 500, 300, (x) => {
        x.fillStyle = '#f1faee'; x.fillRect(0, 0, 500, 300);
        x.fillStyle = '#e76f51'; x.beginPath(); x.ellipse(CUSHION.cx, CUSHION.cy, CUSHION.rx, CUSHION.ry, 0, 0, 7); x.fill();
        drawCat(x);
      });
      c.RZ.setTool('brush');
    },
    steps: [
      pickTool('select', t('Tap the Select tool.')),
      { say: t('Drag a box around the whole cat.'), area: () => ({ x: CAT.x - 15, y: CAT.y - 15, w: CAT.w + 30, h: CAT.h + 30 }), done: (c) => selCovers(c, { x: CAT.x + 8, y: CAT.y + 8, w: CAT.w - 16, h: CAT.h - 16 }) },
      {
        say: t('Now drag the cat onto the cushion.'), area: () => ({ x: CAT.x - 10, y: 60, w: 450, h: 200 }),
        // (or already put down there)
        done: (c) => { const m = floatCentre(c); return m ? Math.abs(m.x - CUSHION.cx) < CUSHION.rx && Math.abs(m.y - (CUSHION.cy - 30)) < 60 : isColor(c, CUSHION.cx, CUSHION.cy - 30, '#f4a261', 30); },
      },
      { say: t('Tap Place – the cat lies down.'), at: '#sa-finish', done: (c) => !S(c).floating },
    ],
  },
  {
    id: 'fish', unit: 3, tool: 'select',
    title: t('The fish turns round'), story: t('The fish wants to swim the other way – and a little upwards.'),
    learned: t('A selection can be flipped, and turned with the round knob above it.'),
    setup: (c) => {
      picture(c, 500, 300, (x) => {
        x.fillStyle = '#457b9d'; x.fillRect(0, 0, 500, 300);
        x.fillStyle = '#f4a261';
        x.beginPath(); x.ellipse(210, 150, 62, 32, 0, 0, 7); x.fill();
        x.beginPath(); x.moveTo(152, 150); x.lineTo(120, 118); x.lineTo(120, 182); x.fill();
        x.fillStyle = '#1d1d24'; x.beginPath(); x.arc(248, 142, 5, 0, 7); x.fill();
      });
      c.RZ.setTool('brush');
      clicks(c, '#sa-fliph', 'flips');
    },
    steps: [
      pickTool('select', t('Tap the Select tool.')),
      { say: t('Drag a box around the fish.'), area: () => ({ x: FISH.x - 15, y: FISH.y - 15, w: FISH.w + 30, h: FISH.h + 30 }), done: (c) => selCovers(c, { x: 125, y: 122, w: 145, h: 56 }) || (!!S(c).floating && c.mem.flips > 0) },
      { say: t('Tap Flip horizontally – the fish looks the other way.'), at: '#sa-fliph', done: (c) => c.mem.flips % 2 === 1 },
      {
        say: t('Drag the round knob above the fish a little to the side.'),
        area: (c) => { const k = c.RZ.knobAt(); return k ? { x: k.x - 40, y: k.y - 40, w: 80, h: 80 } : { x: 120, y: 60, w: 180, h: 100 }; },
        done: (c) => { const f = S(c).floating, r = f?.xf ? Math.abs(Math.atan2(Math.sin(f.xf.r), Math.cos(f.xf.r))) * 180 / Math.PI : 0; return r >= 8 && r <= 70; },
      },
      { say: t('Tap Place.'), at: '#sa-finish', done: (c) => !S(c).floating },
    ],
  },
  {
    id: 'balloon', unit: 3, tool: 'select',
    title: t('Two balloons'), story: t('One balloon is not enough. Cut it out along its edge and make a second one.'),
    learned: t('The Lasso selects any shape you draw around. Duplicate leaves a copy and gives you a new one to move.'),
    setup: (c) => {
      picture(c, 500, 320, (x) => {
        x.fillStyle = '#a8dadc'; x.fillRect(0, 0, 500, 320);
        x.strokeStyle = '#264653'; x.lineWidth = 2; x.beginPath(); x.moveTo(140, 180); x.quadraticCurveTo(130, 230, 145, 285); x.stroke();
        x.fillStyle = '#e76f51'; x.beginPath(); x.ellipse(BALLOON.cx, BALLOON.cy, BALLOON.rx, BALLOON.ry, 0, 0, 7); x.fill();
      });
      c.RZ.setTool('brush');
      clicks(c, '#sa-dup', 'dups');
    },
    steps: [
      pickTool('select', t('Tap the Select tool.')),
      { say: t('Choose Lasso – it goes around any shape.'), at: '#sel-shape [data-shape="lasso"]', done: (c) => S(c).selShape === 'lasso' },
      {
        say: t('Draw a line all the way around the balloon.'), area: () => ({ x: 70, y: 50, w: 140, h: 260 }),
        done: (c) => { const s = S(c).sel; return !!s?.mask && s.x <= BALLOON.cx - 30 && s.x + s.w >= BALLOON.cx + 30 && s.y <= BALLOON.cy - 40 && s.y + s.h >= BALLOON.cy + 40; },
      },
      { say: t('Tap Duplicate.'), at: '#sa-dup', done: (c) => c.mem.dups > 0 && !!S(c).floating },
      { say: t('Drag the new balloon over to the empty sky.'), area: () => ({ x: 60, y: 20, w: 430, h: 290 }), done: (c) => { const m = floatCentre(c); if (m && m.x > 260) c.mem.to = m; return !!m && m.x > 260; } },
      { say: t('Tap Place.'), at: '#sa-finish', done: (c) => !S(c).floating && !!c.mem.to && isColor(c, c.mem.to.x, c.mem.to.y, '#e76f51', 40) },
    ],
  },
  {
    id: 'sunset', unit: 3, tool: 'select',
    title: t('Sunset'), story: t('Change the blue sky into an orange sunset.'),
    learned: t('The Wand selects everything of one color with a single tap. Clear empties the selection.'),
    setup: (c) => {
      picture(c, 500, 320, (x) => {
        x.fillStyle = '#a8dadc'; x.fillRect(0, 0, 500, 320);
        x.fillStyle = '#8ab17d'; x.beginPath(); x.ellipse(250, 330, 330, 150, 0, 0, 7); x.fill();
        x.fillStyle = '#264653'; x.fillRect(360, 150, 50, 50); x.beginPath(); x.moveTo(350, 150); x.lineTo(385, 120); x.lineTo(420, 150); x.fill();
      });
      c.RZ.setTool('brush');
    },
    steps: [
      pickTool('select', t('Tap the Select tool.')),
      { say: t('Choose the Wand – it picks one color.'), at: '#sel-shape [data-shape="wand"]', done: (c) => S(c).selShape === 'wand' },
      { say: t('Tap the blue sky.'), area: () => ({ x: 0, y: 0, w: 500, h: 170 }), done: (c) => { const s = S(c).sel; return !!s && s.w >= 450 && s.y <= 5; } },
      { say: t('Tap Clear – the sky disappears.'), at: '#btn-sel-del', done: (c) => c.RZ.alphaAt(30, 30) < 10 },
      pickTool('bucket', t('Now take the Paint bucket.')),
      { say: t('Tap the orange color.'), at: swatch('#f4a261'), done: (c) => S(c).fill === '#f4a261' },
      { say: t('Tap the empty sky – a sunset!'), area: () => ({ x: 0, y: 0, w: 500, h: 170 }), done: (c) => isColor(c, 30, 30, '#f4a261', 20) && isColor(c, 470, 40, '#f4a261', 20) },
    ],
  },
];

// ---- unit 4: text ------------------------------------------------------------------------------------------------------------
const BANNER: Box = { x: 50, y: 40, w: 400, h: 90 };
const dlgText = (c: Ctx) => c.d.querySelector<HTMLDialogElement>('#dlg-text');
const unit4: Task[] = [
  {
    id: 'poster', unit: 4, tool: 'text',
    title: t('Name poster'), story: t('Write your name on the green banner.'),
    learned: t('The Text tool writes words in any size and font – with an outline, a shadow or bent in a curve.'),
    setup: (c) => {
      picture(c, 500, 320, (x) => {
        x.fillStyle = '#f1faee'; x.fillRect(0, 0, 500, 320);
        x.fillStyle = '#2a9d8f'; x.fillRect(BANNER.x, BANNER.y, BANNER.w, BANNER.h);
        x.fillStyle = '#e9c46a'; for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(80 + i * 68, 230, 22, 0, 7); x.fill(); }
      });
      c.RZ.setTool('brush');
    },
    steps: [
      pickTool('text', t('Tap the Text tool.')),
      { say: t('Tap in the middle of the green banner.'), area: () => BANNER, done: (c) => !!dlgText(c)?.open },
      { say: t('Type your name.'), at: '#dlg-text .tx-text', done: (c) => (c.d.querySelector<HTMLTextAreaElement>('#dlg-text .tx-text')?.value.trim().length || 0) >= 2 },
      { say: t('Make the letters big: Size 60.'), at: '#dlg-text .tx-size', done: (c) => +(c.d.querySelector<HTMLInputElement>('#dlg-text .tx-size')?.value || 0) >= 48 },
      { say: t('Turn on Outline.'), at: labelOf('#dlg-text .tx-outline'), done: (c) => !!c.d.querySelector<HTMLInputElement>('#dlg-text .tx-outline')?.checked },
      { say: t('Tap Done.'), at: '#dlg-text .tx-done', done: (c) => !dlgText(c)?.open && !!S(c).floating },
      { say: t('Drag your name into the banner.'), area: () => ({ x: 0, y: 0, w: 500, h: 320 }), done: (c) => { const m = floatCentre(c); return !!m && insideBox(BANNER, m.x, m.y); } },
      { say: t('Tap Place.'), at: '#sa-finish', done: (c) => !S(c).floating },
    ],
  },
];

// ---- unit 5: photo magic ------------------------------------------------------------------------------------------------------
const FLOWER = { cx: 140, cy: 140 };
const APPLE = { cx: 250, cy: 165, r: 110 };
const SCRATCHES: [number, number, number, number][] = [[200, 120, 240, 150], [270, 200, 300, 175], [215, 215, 245, 230]];
const CAN: Box = { x: 225, y: 170, w: 50, h: 80 };
const SAND = '#e9d8a6';
const starPts = (cx: number, cy: number, R: number, r: number): [number, number][] => Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, k = i % 2 ? r : R; return [cx + k * Math.cos(a), cy + k * Math.sin(a)] as [number, number]; });
const STAR = starPts(250, 160, 80, 34);
const noisy = (x: CanvasRenderingContext2D, w: number, h: number, seed: number) => {
  const r = seeded(seed), im = x.getImageData(0, 0, w, h);
  for (let i = 0; i < im.data.length; i += 4) { const v = (r() - 0.5) * 50; im.data[i] += v; im.data[i + 1] += v; im.data[i + 2] += v; }
  x.putImageData(im, 0, 0);
};

const unit5: Task[] = [
  {
    id: 'flowers', unit: 5, tool: 'clone',
    title: t('Twin flowers'), story: t('One pot is empty. Grow the same flower in it – copy it with Clone.'),
    learned: t('Clone paints with a copy of another part of the picture: first tap where to copy from, then paint.'),
    setup: (c) => {
      picture(c, 500, 320, (x) => {
        x.fillStyle = '#f1faee'; x.fillRect(0, 0, 500, 320);
        x.fillStyle = '#7a4b2a'; for (const p of [140, 360]) { x.beginPath(); x.moveTo(p - 45, 230); x.lineTo(p + 45, 230); x.lineTo(p + 32, 300); x.lineTo(p - 32, 300); x.fill(); }
        x.strokeStyle = '#2a9d8f'; x.lineWidth = 6; x.beginPath(); x.moveTo(140, 230); x.lineTo(140, 150); x.stroke();
        x.fillStyle = '#e76f51'; for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; x.beginPath(); x.arc(FLOWER.cx + 26 * Math.cos(a), FLOWER.cy + 26 * Math.sin(a), 17, 0, 7); x.fill(); }
        x.fillStyle = '#e9c46a'; x.beginPath(); x.arc(FLOWER.cx, FLOWER.cy, 14, 0, 7); x.fill();
        // where the twin grows: its middle is where the painting starts (Clone lines that point up with the source)
        dashedPath(x, Array.from({ length: 33 }, (_, i) => [360 + 48 * Math.cos(i * Math.PI / 16), 140 + 48 * Math.sin(i * Math.PI / 16)] as [number, number]), true);
      });
      c.RZ.setTool('select');
    },
    steps: [
      pickTool('clone', t('Tap the Clone tool – the stamp.')),
      sizeAtLeast(30, t('Make it big: Size 30 or more.')),
      { say: t('Tap the middle of the flower – the copy comes from there.'), area: () => ({ x: 90, y: 90, w: 100, h: 100 }), done: (c) => { const s = S(c).clone.src; return !!s && Math.hypot(s.x - FLOWER.cx, s.y - FLOWER.cy) < 35; } },
      {
        say: t('Start in the middle of the dashed circle, then paint all over it – a twin flower grows!'), area: () => ({ x: 300, y: 80, w: 120, h: 120 }),
        done: (c) => share(grid({ x: 318, y: 98, w: 84, h: 84 }, 6), (x, y) => isColor(c, x, y, '#e76f51', 50) || isColor(c, x, y, '#e9c46a', 50)) >= 0.35,
      },
    ],
  },
  {
    id: 'apple', unit: 5, tool: 'heal',
    title: t('Fix the apple'), story: t('The apple has 3 scratches. Heal them so it looks new.'),
    learned: t('Heal copies a clean part and blends it in, so spots and scratches disappear.'),
    setup: (c) => {
      picture(c, 500, 320, (x) => {
        x.fillStyle = '#f1faee'; x.fillRect(0, 0, 500, 320);
        x.fillStyle = '#d94b3a'; x.beginPath(); x.arc(APPLE.cx, APPLE.cy, APPLE.r, 0, 7); x.fill();
        x.strokeStyle = '#2a9d8f'; x.lineWidth = 8; x.beginPath(); x.moveTo(250, 60); x.lineTo(262, 35); x.stroke();
        x.strokeStyle = '#4a1f18'; x.lineWidth = 5; x.lineCap = 'round';
        for (const [a, b, e, f] of SCRATCHES) { x.beginPath(); x.moveTo(a, b); x.lineTo(e, f); x.stroke(); }
      });
      c.RZ.setTool('select');
    },
    steps: [
      pickTool('heal', t('Tap the Heal tool – the plaster.')),
      sizeAtLeast(20, t('Make it bigger: Size 20 or more.')),
      { say: t('Tap a clean part of the apple.'), area: () => ({ x: APPLE.cx - APPLE.r, y: APPLE.cy - APPLE.r, w: 2 * APPLE.r, h: 2 * APPLE.r }), done: (c) => { const s = S(c).clone.src; return !!s && Math.hypot(s.x - APPLE.cx, s.y - APPLE.cy) < APPLE.r - 10; } },
      {
        say: t('Paint over the 3 scratches.'), area: () => ({ x: 185, y: 105, w: 130, h: 140 }),
        done: (c) => SCRATCHES.every(([a, b, e, f]) => dist(px(c, (a + e) / 2, (b + f) / 2).c, rgb('#d94b3a')) < 70),
      },
    ],
  },
  {
    id: 'beach', unit: 5, tool: 'remove',
    title: t('Clean beach'), story: t('Someone left a can on the beach. Make it disappear!'),
    learned: t('Remove fills what you paint over from the picture around it – things vanish.'),
    setup: (c) => {
      picture(c, 500, 320, (x) => {
        x.fillStyle = '#457b9d'; x.fillRect(0, 0, 500, 110);
        x.fillStyle = SAND; x.fillRect(0, 110, 500, 210);
        noisy(x, 500, 320, 9);
        x.fillStyle = '#9aa3a8'; x.fillRect(CAN.x, CAN.y, CAN.w, CAN.h);
        x.fillStyle = '#d62828'; x.fillRect(CAN.x, CAN.y + 25, CAN.w, 26);
      });
      c.RZ.setTool('select');
    },
    steps: [
      pickTool('remove', t('Tap the Remove tool.')),
      sizeAtLeast(30, t('Make it big: Size 30 or more.')),
      {
        say: t('Paint over the whole can, then lift your finger.'), area: () => ({ x: CAN.x - 25, y: CAN.y - 25, w: CAN.w + 50, h: CAN.h + 50 }),
        done: (c) => share(grid({ x: CAN.x + 5, y: CAN.y + 5, w: CAN.w - 10, h: CAN.h - 10 }, 4), (x, y) => dist(px(c, x, y).c, rgb(SAND)) < 60) >= 0.85,
      },
    ],
  },
  {
    id: 'sticker', unit: 5, tool: 'blur',
    title: t('Star sticker'), story: t('The star looks stuck on. Soften its edge with Blur and give it grain with Noise.'),
    learned: t('Blur softens, Noise adds grain – together they blend a pasted picture into a photo.'),
    setup: (c) => {
      picture(c, 500, 320, (x) => {
        const g = x.createLinearGradient(0, 0, 500, 320); g.addColorStop(0, '#2a9d8f'); g.addColorStop(1, '#264653');
        x.fillStyle = g; x.fillRect(0, 0, 500, 320);
        noisy(x, 500, 320, 3);
        x.fillStyle = '#e9c46a'; x.beginPath(); STAR.forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b))); x.closePath(); x.fill();
      });
      c.RZ.setTool('select');
      keepOriginal(c);
    },
    steps: [
      pickTool('blur', t('Tap the Blur tool – the drop.')),
      { say: t('Make it stronger: slide Strength to 6 or more.'), at: '#opt-blur', done: (c) => S(c).blurRadius >= 6 },
      sizeAtLeast(20, t('Make it bigger: Size 20 or more.')),
      {
        say: t('Paint along the edge of the star.'), area: () => around(STAR, 25),
        done: (c) => share(STAR.flatMap((p, i) => { const q = STAR[(i + 1) % STAR.length]; return [p, [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2] as [number, number]]; }), (x, y) => changed(c, x, y, 18)) >= 0.45,
      },
      pickTool('noise', t('Now tap the Noise tool – the dots.')),
      { say: t('Slide Amount to 30 or more.'), at: '#opt-noise', done: (c) => S(c).noiseAmount >= 30 },
      {
        say: t('Paint over the star – it gets grainy, like the photo.'), area: () => around(STAR, 20),
        done: (c) => {
          const pts = grid({ x: 230, y: 140, w: 40, h: 40 }, 5).map(([x, y]) => px(c, x, y).c.reduce((s, v) => s + v, 0) / 3);
          const m = pts.reduce((s, v) => s + v, 0) / pts.length;
          return Math.sqrt(pts.reduce((s, v) => s + (v - m) ** 2, 0) / pts.length) > 7;
        },
      },
    ],
  },
  {
    id: 'whirl', unit: 5, tool: 'twist',
    title: t('Whirlpool'), story: t('Stir up the lake – make a whirlpool in the circle.'),
    learned: t('Twist swirls the picture: press the middle, drag out for the size, go round to twist.'),
    setup: (c) => {
      picture(c, 500, 320, (x) => {
        for (let y = 0; y < 320; y += 16) { x.fillStyle = (y / 16) % 2 ? '#a8dadc' : '#457b9d'; x.fillRect(0, y, 500, 16); }
        dashedCircle(x, 250, 160, 90);
      });
      c.RZ.setTool('select');
      keepOriginal(c);
    },
    steps: [
      pickTool('twist', t('Tap the Twist tool – the spiral.')),
      {
        say: t('Press in the middle of the circle, drag out to its edge, then go round and round.'), area: () => ({ x: 150, y: 60, w: 200, h: 200 }),
        done: (c) => share(grid({ x: 190, y: 100, w: 120, h: 120 }, 7, (x, y) => Math.hypot(x - 250, y - 160) < 70), (x, y) => changed(c, x, y, 40)) >= 0.25,
      },
    ],
  },
];

export const TASKS: Task[] = [...unit1, ...unit2, ...unit3, ...unit4, ...unit5];
export const UNITS: string[] = [t('Painting'), t('Shapes'), t('Selecting and moving'), t('Text'), t('Photo magic')];
