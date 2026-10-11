# Testing

## Automated (runs on every push)

`npm test` builds `dist/mosaic.js`, type-checks the TypeScript (`tsc`), then runs:

- **Unit tests** (`tests/unit/`): geometry (closed areas, holes, T-junctions), tiling patterns, print sheet layout, and that the offline cache lists every file.
- **Unit tests** of the 3D print model (heights, merged boxes, a closed outward-facing STL, the filament plan) and of the raster app's pixel algorithms (flood fill, lines, polygons, palette reduction, the mosaic effect).
- **End-to-end tests** (`tests/e2e/`), driving both apps in:
  - Chrome, Firefox and WebKit (Safari's engine) on desktop;
  - an Android phone (Pixel 7) and an iPhone 14, emulated with touch input.

  They cover drawing, snapping, painting, painted areas following edits, palettes, files, autosave, migration, history, printing (rendered to a real PDF and checked for paper size and page count), the photo tools, the phone layout, offline start, installability (Chrome), and the speed of a 2,500-tile mosaic.

`npm run bench` prints timings for big mosaics; `node tests/perf/print-preview.js <folder>` writes a sample template PDF.

## By hand, on real devices

Emulation can't cover everything. Before relying on a new version, check these:

### Phone or tablet (iPhone/iPad Safari, Android Chrome)
- [ ] Draw lines with a finger; snapping markers appear; the **Done** bar finishes chained lines and free polygons.
- [ ] Pinch with two fingers zooms and pans without drawing or painting anything.
- [ ] Tap and drag with the bucket paints tiles.
- [ ] ☰ opens and closes the side panel; all buttons are reachable.
- [ ] Load a photo from the camera roll; "Color tiles from photo" works.
- [ ] Save: the file is offered for download / sharing.
- [ ] Moving the finger over a big mosaic (2,000+ tiles) feels smooth. (Playwright's WebKit renders in software and is slow here; real Safari uses the GPU.)

### 3D print
`npm run check:slicer` (needs PrusaSlicer installed) builds a sample 3MF, slices it with PrusaSlicer's command line and checks that the M600 filament changes land at the plan's layers and that the mesh is closed.

- [ ] Export a small mosaic (e.g. 60 × 60 mm, 3 colors); the STL opens in the slicer as one flat object of the expected size and height.
- [ ] Add the color changes from the plan; the slicer preview shows each color starting at the listed layer.
- [ ] Print it: every tile's top shows its color, the grout is the lowest band.

### Clipboard between the apps and other programs
- [ ] Vector: Ctrl+C with nothing selected → paste into the raster app, an image editor, a chat: the drawing appears.
- [ ] Raster: select, Ctrl+C → paste into the vector app: it becomes the photo to trace.
- [ ] A screenshot (Win+Shift+S / Cmd+Ctrl+Shift+4) pastes into both apps.
- [ ] Safari / iPhone: the **Copy** and **Paste** buttons work (the browser may ask for permission).

### Install & offline
- [ ] Chrome / Edge: "Install app" appears; the installed app opens in its own window.
- [ ] iPhone: Share → Add to Home Screen; the icon looks right.
- [ ] Turn on flight mode; the app (and your last drawing) still opens.

### Printing on paper
- [ ] Print a 30 × 30 cm mosaic at real size on A4/Letter with the browser's scale at **100 %** ("Actual size", not "Fit to page"); measure a tile with a ruler.
- [ ] The sheets line up when taped together along the blue overlap strips.
- [ ] Colors and numbers are readable; the legend page lists every color.
