# Testing

## Automated (runs on every push)

`npm test` builds `dist/mosaic.js`, type-checks the TypeScript (`tsc`), then runs:

- **Unit tests** (`tests/unit/`): geometry (closed areas, holes, T-junctions), tiling patterns, print sheet layout, and that the offline cache lists every file.
- **End-to-end tests** (`tests/e2e/`), driving the real app in:
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

### Install & offline
- [ ] Chrome / Edge: "Install app" appears; the installed app opens in its own window.
- [ ] iPhone: Share → Add to Home Screen; the icon looks right.
- [ ] Turn on flight mode; the app (and your last drawing) still opens.

### Printing on paper
- [ ] Print a 30 × 30 cm mosaic at real size on A4/Letter with the browser's scale at **100 %** ("Actual size", not "Fit to page"); measure a tile with a ruler.
- [ ] The sheets line up when taped together along the blue overlap strips.
- [ ] Colors and numbers are readable; the legend page lists every color.
