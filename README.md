# Mosaic Paint

Two editors for designing and coloring mosaics with your own palette:

- **Vector** (`index.html`): tiles are shapes – draw, snap, pattern, paint, print real-size templates.
- **Raster** (`raster.html`): paint with pixels – brush, pencil, bucket, and a one-click mosaic effect for any picture.

Switch between them with **Vector | Raster** in the top bar. They look and work alike, share your palettes, and pass pictures to each other through the clipboard.

**Use it online: https://honza03210.github.io/mosaic-paint/**
It can be installed as an app ("Install app" button, or the browser's install icon), and then it also works offline.
To run it from a download instead, open `index.html` (or `raster.html`) in Chrome / Edge / Firefox; there's no build step.

## Getting started

The first time you open an app, a short guide points out its parts; the **?** button in the top bar shows it again. **Examples…** opens ready-made projects to look at or start from: a coaster, a sign and “Your photo” (load a photo, then Mosaic from photo) in the vector app, a pixel-art heart and a sunset mosaic in the raster app (your current work is kept in History).

## Languages

Both apps are in English and Czech (čeština). They follow the browser’s language; the language menu in the top bar switches it.

## Simple and Expert mode

The switch in the top-left corner chooses how much of the app you see.

- **Simple** has the whole workflow: palettes, drawing, patterns, painting, tracing a photo, the color report, grout preview and history.
- **Expert** adds the knife, symmetry, layers, rulers, the printable template, and finer settings:
  - gap tolerance and snapping details
  - numeric polygon editing and line widths
  - a material estimate and CSV export in the report

## Workflow

1. **Palette:** paste colors into the box under the swatches, or press Ctrl+V anywhere on the canvas.
   It accepts `#hex`, bare hex, `rgb()/hsl()`, color names, coolors.co links and GIMP `.gpl` rows.
   Keep several named palettes and switch between them with the drop-down.
   Click a swatch to use it as the fill, right-click to use it as the stroke, and double-click to edit it, which also recolors the drawing.
2. **Page:** set the real size and unit (mm, cm or in). Saved files and printouts use that real size.
3. **Photo (optional):** load a reference photo, set its opacity, and trace over it.
   Or let the app do it: **Make a mosaic from the photo…** lays out tiles over the whole page (squares, bricks, hexagons or irregular "crazy paving", smaller where the photo has detail) and colors them, using your palette or a palette it suggests from the photo. It is one undo step.
4. **Draw** the tiles with any of these tools:
   - **Line (L)**
   - **Free polygon (P):** click corner by corner.
   - **Regular polygon (G):** drawn from its center or along an existing edge.
   - **Pattern (T):** fills an area with squares, bricks, herringbone, hexagons, triangles or rings, or with **rows following the outline** (opus vermiculatum): rows of tiles that run along the area's edge and around any shapes inside it.
   - **Knife (K, Expert):** cuts a tile straight across.

   **Snap** (S) puts points exactly on ends, corners, crossings, midpoints or anywhere along a line.
5. **Paint:**
   - **Bucket (B):** click or drag across tiles. **Mix colors:** Shift+click two or more swatches and each tile gets one of them at random (optionally never the same color next to itself), so big backgrounds look alive. "Mix colors" in the Selection panel does the same for selected areas.
      Small gaps where lines almost meet are closed automatically. If an area isn't closed, the line ends that don't touch anything are circled in red.
   - **Color tiles from photo:** gives every tile the palette color closest to the photo underneath it.
   - **Painted areas follow the lines:** move, add or delete lines and the colors reshape with them. A tile cut in two keeps its color in both halves.
6. **Check:**
   - **Report** lists every color with its number of areas, total area and share of the mosaic, and can replace one color with another everywhere. In Expert mode it also estimates how many pieces to buy and exports a CSV.
   - **Grout preview** shows the lines in a grout color and width without changing them.
   - **View menu** (top bar): see the mosaic in black & white or as people with red-, green- or blue-blindness see it (screen only). The report lists colors that may look alike, and **Contrast** (Expert) marks tiles that blend into a neighbouring tile.
7. **Output:**
   - **Save** writes an SVG that remembers the palette, unit and photo.
   - **PNG** exports an image.
   - **Print… (Expert)** opens a template in color, with color numbers, or as a paint-by-number outline, plus a legend page. At real size it is split across overlapping, labeled sheets (A1, A2, …) with an overview page; or it can be fitted onto one sheet.

## Laying plan (Expert)

**Plan…** splits a large mosaic into numbered panels of the size of your work surface or mesh sheets (shown on the drawing while you choose). The print has an overview with the panel numbers, every panel at real size (on several overlapping sheets if it is bigger than the paper) with color numbers, a table of how many tiles of each color every panel needs, and the color legend.

## Copy, paste and motifs

Ctrl+C / Ctrl+X / Ctrl+V copy shapes and their colors between pages, drawings and browser tabs (they arrive under the mouse, at real size even if the other drawing uses different units). Copied shapes also go on the clipboard as a picture, for the raster app and other programs; **Copy image** (or Ctrl+C with nothing selected) copies the whole drawing as a picture. Pasting a picture (from the raster app, a screenshot, a web page) makes it the photo to trace. Save a selection as a **motif** to reuse it: click it in the Motifs section, then click on the drawing to place copies (R turns them). The library can be exported and imported as a file.

## Pages

A project can have several pages (front and back, color variants, …): the bar under the drawing switches between them, and ⋯ renames, duplicates, moves or deletes a page. Each page has its own drawing, size, photo, undo steps and view; palettes are shared. All pages are saved in one SVG file (other programs show the current page).

## Sharing

**Share** packs the whole drawing (all pages) into a link. Nothing is uploaded: the drawing travels inside the link itself. Whoever opens it sees the mosaic read-only and can **make their own copy** to edit; their own drawing is never touched. Very large mosaics make long links – on phones, "Share file…" sends the SVG file instead.

## Safety net

The drawing is autosaved in the browser, and **History** keeps the last 40 versions.
A version is saved every few minutes while you work, and before you open, start or restore another drawing.

## Expert extras

- **Symmetry:** mirror left–right, top–bottom or both ways, or rotate N copies around a center (optionally mirrored too). Lines, polygons, knife cuts and painting are repeated.
- **Layers:** show/hide and lock the lines, the painted areas and the photo separately. For example, lock the lines while painting.
- **Rulers** in the page unit.

## Phones and tablets

Draw with one finger; pinch with two fingers to zoom and pan. The ☰ button opens the side panel.
The Done / Cancel bar finishes chained lines and free polygons.

## 3D print (both apps)

**3D…** exports the mosaic as a 3D model (3MF or STL) for printing in several colors on an ordinary single-nozzle printer: every color stands at its own height, so you change the filament at a few layers and each tile's top comes out in its color.

- Set the **size** in mm (the vector app takes the page's real size), the **layer height**, **layers per color** (each color is a band this many layers thick – more layers cover the color underneath better) and **base layers** (a plate under everything, printed in the first color; unpainted parts stay at the base, or are left open with 0).
- **Print order:** the list shows the colors from the bottom up, with their layers and where to change filament. Grout always goes first, so the lines between the tiles stay the lowest part and the tiles stand out of them like a real mosaic: lines in the vector app and the grout of a raster mosaic are recognized, and any color can be marked as grout with its **grout** button. The rest goes light → dark (a dark layer covers a light one well); reorder with ↑ ↓.
- **No thin towers:** raised parts narrower than **Thinnest part** (1.2 mm by default), or more than twice as tall as they are wide, are lowered to what is around them – stray pixels, slivers along tile edges, tiny tiles in high colors. Grooves such as grout lines are never filled. The preview shows the model as it will print – from the top, or in **3D**: drag to turn it, zoom with the wheel or two fingers, and make the heights look taller to see the color bands.
- **Download 3MF:** the model with the filament changes built in – PrusaSlicer reads them and puts M600 at the right layers, so you just slice and print. Bambu Studio and OrcaSlicer read only the shape from a 3MF they didn't write: add the changes there from the plan.
- **STL** (the shape only) and **Plan**: which filament to start with and at which layer (and height) to change to the next, with where to add the changes in PrusaSlicer, Bambu Studio, OrcaSlicer and Cura.
- **Detail** sets the smallest step (about your nozzle width). The raster app uses the image's colors; photos with many colors are snapped to the palette.
- **Finishing:** a **frame** around the picture (standing a few layers above the tiles; with one nozzle it comes out in the top color, with several filaments in filament 1), **rounded corners**, a **hanging hole** at the top in the middle, and four **magnet pockets** in the bottom near the corners (diameter and depth – at least two layers stay above them, so they get shallower where the model is thin; the slicer bridges over them, glue the magnets in afterwards).
- **Several filaments (AMS, MMU…) – flat:** for printers that change filament by themselves. The model is flat: a base plate, then one part per color, **Tile layers** thick, with grout colors **lower by** a few layers. The 3MF already assigns filament 1, 2, … to the parts (the base plate uses filament 1, like the first color) – PrusaSlicer and Bambu Studio / OrcaSlicer each read only their own way of describing parts, so choose the slicer under **3MF for**. **STL** downloads a ZIP with one STL per color to load as parts of one object; the **Plan** lists which filament goes where.

## Raster app

The raster app paints pixels. It has the same layout, palettes (shared with the vector app) and Simple / Expert switch.

- **Tools:** select (V), brush (B, soft edges), pencil (P, hard pixels in exact palette colors – best for pixel mosaics), eraser (E), line (L), regular polygon (G), paint bucket with a tolerance (F), color picker (I, or Alt+click). Shift draws straight lines; [ and ] change the size. The ∅ swatch paints transparent.
- **Selection:** drag a rectangle, then drag it to move it (Alt: a copy); Enter places it, Esc puts it back. Clear, crop, select all (Ctrl+A).
- **Clipboard:** Ctrl+C / Ctrl+X copy the selection (or the whole image) as a PNG; Ctrl+V pastes any picture – from the vector app, a screenshot, another program – under the mouse, ready to move. On touch screens use the **Copy** and **Paste** buttons. Pasted color codes go into the palette.
- **Mosaic:** **Make a mosaic…** turns the image (or the selection) into tiles with grout – squares, squares in offset rows, bricks, hexagons or irregular “crazy paving”, optionally smaller where the picture has detail (the vector app's tile layouts) – colored from your palette, from a palette it suggests, or keeping the picture's colors. **Reduce to palette** gives every pixel the nearest palette color. **Open as vector tiles…** turns every piece (tile) into a shape in the vector app at the real size, with the grout color as the page background – ready for the vector app's templates, laying plan, 3D print and editing (your previous vector drawing goes to its History).
- **Files:** open PNG / JPEG / WebP / GIF / SVG (or drop one on the canvas), save as PNG, export JPEG / WebP (Expert), resize the image or the canvas. The image is autosaved in the browser, and **History** keeps earlier versions (every few minutes, and before opening, starting or restoring another image).
- **Report:** every color with its pieces (connected areas of one color – the tiles), pixels and real area at the width you give – a shopping list – plus “Replace with” and a CSV download.
- **Print… (Expert):** the image at real size over several sheets (or fitted on one), in color, with color numbers on the pieces, or as outlines to paint by number, with a color legend. The numbers match the report.
- **Share:** the image travels inside the link; whoever opens it sees it read-only and can make their own copy.

## Files

The apps are written in TypeScript and bundled into one script each: `dist/mosaic.js` (vector) and `dist/raster.js` (raster). The bundles are committed, so GitHub Pages and opening the pages straight from disk need no build step. Heavy work – the mosaic effect, tracing raster tiles, and building the 3D model – runs in a worker, so the page stays responsive and shows progress: the worker (`src/worker/`) is bundled first and goes into each app as a string, which the app starts from a blob URL (so it works from disk too); without workers the same jobs run on the page.

- `index.html`, `raster.html`, `style.css`: UI of the two apps (one stylesheet)
- `src/main.ts`: vector entry point; loads the editor core, then the features
- `src/shared/`: shared by both apps – page helpers, the palette panel (`palette-ui.ts`), images on the clipboard (`clipboard.ts`), the phone layout / install / offline shell (`shell.ts`), the 3D print dialog (`export3d.ts`), the version history (`history-ui.ts`), the examples dialog (`examples-ui.ts`) and the guide (`guide.ts`), print pages, color legends and CSV files (`printing.ts`), the 3D view (`view3d.ts`, plain WebGL), languages (`i18n.ts`: `t()`, word forms, translating the page; `i18n-cs.ts`: the Czech texts), running jobs in the worker (`work.ts`)
- `src/worker/`: the worker – its jobs (`jobs.ts`: plain data in and out) and its entry point (`worker.ts`)
- `src/lib/`: pure logic with no page or editor access (unit-tested in Node)
  - `geometry.ts`: geometry math, including finding closed areas for the bucket
  - `patterns.ts`: tiling patterns
  - `contour.ts`: rows following an outline (distance field, marching squares)
  - `automosaic.ts`: tile layouts for a mosaic from a photo (quadtree, Voronoi) and palette suggestion (k-means)
  - `colors.ts`: color parsing, closest-color matching, color-blind simulation
  - `print.ts`: splitting the print-out across sheets, print pages
  - `layplan.ts`: laying-plan panels and per-panel counts
  - `pack.ts`: compressing a drawing into a share link
  - `store.ts`: browser storage for the autosave and versions
  - `raster.ts`: pixel algorithms – flood fill, hard-edged lines and polygons, reducing to a palette, the mosaic effect, pieces (connected areas) with number spots and outlines, mosaics of any tile polygons
  - `model3d.ts`: the 3D print model – colors as height bands, one closed surface (no T-junctions), binary STL, 3MF with PrusaSlicer color changes, the filament-change plan; the flat multi-filament model (one part per color) as a PrusaSlicer or Bambu Studio 3MF; finishing (frame, rounded corners, hanging hole, magnet pockets)
  - `build3d.ts`: the 3D model as the dialog builds it – thin towers lowered, finishing, the solids of either kind of model, the files
  - `vectorize.ts`: raster tiles as a Mosaic Paint SVG (one polygon per piece)
  - `examples.ts`: the example projects, made on the spot
  - `photo.ts`: reading a photo over the drawing – colors, detail, palette suggestions, the tile layout of Mosaic from photo
  - `html.ts`: escaping text for HTML
  - `zip.ts`: a small ZIP writer (3MF files are ZIP archives)
  - `trace.ts`: outlines of pixel areas as polygons (corner points only, holes, diagonal pixels kept apart)
- `src/core/`: the editor
  - `env.ts`: page elements, settings and state, small helpers, events between modules
  - `doc.ts`: shapes and their geometry, painting, regular-polygon data
  - `view.ts`: zoom / pan, page, layers, symmetry
  - `snap.ts`: snapping and the size labels shown while drawing
  - `selection.ts`: selecting, moving, the selection commands
  - `areas.ts`: closed areas, the paint bucket, painted areas following edited lines
  - `tools.ts`: the drawing tools
  - `history.ts`: undo / redo, autosave, versions
  - `palette.ts`: palettes, swatches, fill and line colors
  - `photo.ts`, `grout.ts`: the tracing photo and the grout preview
  - `files.ts`: reading / writing SVG, open, save, PNG export, mode
  - `input.ts`, `panel.ts`: mouse, touch, keyboard, paste, drop; the side panel
  - `api.ts`: startup and the `MZ` interface used by the features
- `src/features/`: one module per vector feature: `report`, `print`, `history-ui`, `rulers`, `shell` (phone layout, install), `photo-tools`, `automosaic`, `layplan`, `mix`, `vision`, `pages`, `snippets`, `motifs`, `share`, `image-clipboard`, `export3d`, `raster-import`
- `src/raster/`: the raster app – `state`, `canvas` (image, zoom, drawing on screen), `history` (undo, autosave), `paint` (painting tools), `select` (selection, clipboard), `palette`, `mosaic`, `export3d`, `report`, `print`, `share`, `vectorize`, `files`, `tools`, `input`, `panel`, `main`
- `sw.js`, `manifest.webmanifest`, `icons/`: offline / install support

## Development

```bash
npm install          # build and test tools; the app itself has no dependencies
npm run build        # bundle src/ into dist/mosaic.js (node build.mjs --watch rebuilds on change)
npm run serve        # http://localhost:4173/
npm run lint         # ESLint
npm test             # build, type check, lint, unit tests, then end-to-end tests
```

Commit `dist/` together with the source change: CI checks that it matches.

The end-to-end tests (`tests/e2e/`) drive the real app with mouse, keyboard and touch input:
drawing, snapping, painting, painted areas following edits, files, autosave, history, printing, the photo tools, the phone layout and offline start.
They run on every push (GitHub Actions) in Chrome, Firefox and WebKit, plus emulated Android and iPhone. See [TESTING.md](TESTING.md), including the checklist for real devices.
