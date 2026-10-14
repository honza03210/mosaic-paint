# Mosaic Paint

Two editors for designing and coloring mosaics with your own palette:

- **Vector** (`index.html`): tiles are shapes – draw, snap, pattern, paint, print real-size templates.
- **Raster** (`raster.html`): paint with pixels – brush, pencil, bucket, and a one-click mosaic effect for any picture.

Switch between them with **Vector | Raster** in the top bar. They look and work alike, share your palettes, and pass pictures to each other through the clipboard.

**Use it online: https://honza03210.github.io/mosaic-paint/**
It can be installed as an app ("Install app" button, or the browser's install icon), and then it also works offline.
To run it from a download instead, open `index.html` (or `raster.html`) in Chrome / Edge / Firefox; there's no build step.

## Discord

The raster editor can also run inside Discord as an Activity: right-click a message with an image, a GIF or a video (also Tenor / Giphy GIFs) › Apps › **Edit image** (for a GIF or a video, choose the frame first), draw on it, and **Post to the channel** – in servers, DMs and group DMs, with no bot needed (the picture is posted as an answer to the command, like Wordle's results). The app switch works there too: in the vector app the picture becomes the photo layer to draw shapes on. The backend is a small Cloudflare Worker (free plan) in [`discord/`](discord/README.md), with step-by-step setup.

## Getting started

The first time you open an app, a short guide points out its parts; the **?** button in the top bar shows it again. **Examples…** opens ready-made projects to look at or start from: a coaster, a sign and “Your photo” (load a photo, then Mosaic from photo) in the vector app, a pixel-art heart and a sunset mosaic in the raster app (your current work is kept in History).

## Accessibility

Both apps can be used from the keyboard (every tool has a key, see Keyboard & mouse; palette swatches take Tab, Enter / Space to pick – Shift for the stroke color – and Delete to remove), buttons that only show a symbol are named for screen readers, keyboard focus is always visible, and animations stop when the system asks for less motion. The end-to-end tests check both apps and their dialogs with axe-core (WCAG 2.1 A and AA).

## Languages

Both apps are in English, Czech (čeština), German (Deutsch), Slovak (slovenčina) and Polish (polski). They follow the browser’s language; the language menu in the top bar switches it.

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
   **Choose…** (or a click on the current fill or stroke color) picks any color from a color area, a hue slider or a color code, and can add it to the palette.
2. **Page:** set the real size and unit (mm, cm or in). Saved files and printouts use that real size.
3. **Photo (optional):** load a reference photo, set its opacity, and trace over it.
   Or let the app do it: **Make a mosaic from the photo…** lays out tiles over the whole page (squares, bricks, hexagons or irregular "crazy paving", smaller where the photo has detail) and colors them, using your palette or a palette it suggests from the photo. It is one undo step.
4. **Draw** the tiles with any of these tools:
   - **Line (L)**
   - **Free polygon (P):** click corner by corner.
   - **Regular polygon (G):** drawn from its center or along an existing edge.
   - **Ellipse (O):** dragged from corner to corner or from its center; Shift makes a circle. Selected, its axis ends can be dragged.
   - **Curve (C):** click its points; click the first point again to close it, double-click or Enter to leave it open. Four types: smooth through the points (Catmull–Rom), smooth near the points (B-spline), and cubic or quadratic Bézier, whose round control points pull the curve. Selected, all its points can be dragged.
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

The drawing is autosaved in the browser, and **History** keeps the last 40 versions, each with its size and number of colors. Name a version with ✎, and pin it with ★ to keep it when old versions are cleared (pinned versions don't count toward the 40). The raster app's History works the same way.
A version is saved every few minutes while you work, and before you open, start or restore another drawing.

## Expert extras

- **Symmetry:** mirror left–right, top–bottom or both ways, or rotate N copies around a center (optionally mirrored too). Lines, polygons, knife cuts and painting are repeated.
- **Layers:** show/hide and lock the lines, the painted areas and the photo separately. For example, lock the lines while painting.
- **Rulers** in the page unit.

## Phones and tablets

Draw with one finger; pinch with two fingers to zoom and pan. The ☰ button opens the side panel.
The Done / Cancel bar finishes chained lines and free polygons.
**Double-tap** the drawing with a finger for the quick menu, right where you draw: undo / redo, fit, the main tools, the paint (fill) and outline (line) colors with the palette, and the size. The first tap of the double-tap leaves no mark. While a polygon or curve is being drawn, a double-tap finishes it as before.

## 3D print (both apps)

**3D…** exports the mosaic as a 3D model (3MF or STL) for printing in several colors on an ordinary single-nozzle printer: every color stands at its own height, so you change the filament at a few layers and each tile's top comes out in its color.

- Set the **size** in mm (the vector app takes the page's real size), the **layer height**, **layers per color** (each color is a band this many layers thick – more layers cover the color underneath better) and **base layers** (a plate under everything, printed in the first color; unpainted parts stay at the base, or are left open with 0).
- **Print order:** the list shows the colors from the bottom up, with their layers and where to change filament. Grout always goes first, so the lines between the tiles stay the lowest part and the tiles stand out of them like a real mosaic: lines in the vector app and the grout of a raster mosaic are recognized, and any color can be marked as grout with its **grout** button. The rest goes light → dark (a dark layer covers a light one well); reorder with ↑ ↓.
- **No thin towers:** raised parts narrower than **Thinnest part** (1.2 mm by default), or more than twice as tall as they are wide, are lowered to what is around them – stray pixels, slivers along tile edges, tiny tiles in high colors. Grooves such as grout lines are never filled. The preview shows the model as it will print – from the top, or in **3D**: drag to turn it, zoom with the wheel or two fingers, and make the heights look taller to see the color bands.
- **Download 3MF:** the model with the filament changes built in – PrusaSlicer reads them and puts M600 at the right layers, so you just slice and print. Bambu Studio and OrcaSlicer read only the shape from a 3MF they didn't write: add the changes there from the plan.
- **STL** (the shape only) and **Plan**: which filament to start with and at which layer (and height) to change to the next, with where to add the changes in PrusaSlicer, Bambu Studio, OrcaSlicer and Cura.
- **Detail** sets the smallest step (about your nozzle width). The raster app uses the image's colors; photos with many colors are snapped to the palette.
- **Check G-code…:** open the G-code your slicer made, and the dialog checks it against the plan: with one nozzle, that every filament change (M600 or tool change) takes effect at the planned height and there are no others; with several filaments, that filament 1, 2, … each print up to the height they should. It reads the moves themselves, so it works with any slicer (wipe towers, skirts and brims are left out).
- **Finishing:** a **frame** around the picture (standing a few layers above the tiles; with one nozzle it comes out in the top color, with several filaments in filament 1), **rounded corners**, a **hanging hole** at the top in the middle, and four **magnet pockets** in the bottom near the corners (diameter and depth – at least two layers stay above them, so they get shallower where the model is thin; the slicer bridges over them, glue the magnets in afterwards).
- **Several filaments (AMS, MMU…) – flat:** for printers that change filament by themselves. The model is flat: a base plate, then one part per color, **Tile layers** thick, with grout colors **lower by** a few layers. The 3MF already assigns filament 1, 2, … to the parts (the base plate uses filament 1, like the first color) – PrusaSlicer and Bambu Studio / OrcaSlicer each read only their own way of describing parts, so choose the slicer under **3MF for**. **STL** downloads a ZIP with one STL per color to load as parts of one object; the **Plan** lists which filament goes where.

## Raster app

The raster app paints pixels. It has the same layout, palettes (shared with the vector app) and Simple / Expert switch.

- **Tools:** select (V), brush (B, soft edges), pencil (P, hard pixels in exact palette colors – best for pixel mosaics), eraser (E), line (L), regular polygon (G), ellipse (O), curve (C, the same four types as in the vector app), paint bucket with a tolerance (F), color picker (I, or Alt+click). Shift draws straight lines; [ and ] change the size. The ∅ swatch paints transparent.
- **Selection:** drag a rectangle, then drag it to move it (Alt: a copy); Enter places it, Esc puts it back. Clear, crop, select all (Ctrl+A).
- **Clone (S):** paints with a copy of another part of the image. The first tap (or Alt+click, or **Set source**) sets where to copy from; then paint where the copy should go. A disc shows the source – drag it (with a finger, too) to move it. **Aligned** keeps the source moving along with the brush from stroke to stroke; off, every stroke starts from the source. A stroke copies the picture as it was when it began, so it never repeats its own paint. Size, tip, opacity and pen pressure are the brush's.
- **Heal (J):** like Clone, but when the stroke ends the copy takes the color and light around the painted spot – for blemishes, spots and scratches.
- **Adjust** (toolbar, quick menu, Image section): brightness, contrast, shadows, highlights, saturation, vibrance, warmth, tint, sharpening, noise smoothing, fade, vignette and levels (black point, midtones, white point, with **Auto**), on the selection or the whole image. The picture shows the result as you move the sliders; hold **Before** to compare.
- **Selections of any shape (V):** Rectangle, **Lasso** (draw around it), **Magnetic** (draw roughly along an edge – the line snaps to it) and **Wand** (tap a color). **New / Add / Subtract** (or hold Shift / Alt) combine them; **Invert** (Ctrl+I) selects what isn't selected. Copy, cut, clear, moving and Adjust colors follow the shape.
- **Remove (R):** paint over something and it disappears – filled from the picture around it (content-aware, worked out on your device). For a selection: **Fill from surroundings**.
- **Text (T):** tap the picture and type. Font (common ones, and every installed font where the browser can list them), size, bold, italic, alignment, an outline in the outline color, a shadow and **Curve** (bent along an arc, up or down). The text floats until placed: drag it, tap it to edit it, Enter places it.
- **Layers:** paint on the active layer; show or hide, opacity, move up / down, duplicate, merge down, flatten – each an undo step. Save and the other outputs use the picture as it looks; **Save layers (.ora)** keeps every layer in an OpenRaster file (GIMP and Krita open it; **Open…** opens it again). Autosave keeps the layers too.
- **Import…** (toolbar, quick menu): a picture from a file goes into the current image – floating, scaled down to fit when it is bigger; drag it into place, Enter places it (on the active layer).
- **GIFs and videos:** **Open…** (or drop) an animated GIF or a video and choose the frame to edit – a slider, frame steps and play / pause.
- **Clipboard:** Ctrl+C / Ctrl+X copy the selection (or the whole image) as a PNG; Ctrl+V pastes any picture – from the vector app, a screenshot, another program – under the mouse, ready to move. On touch screens use the **Copy** and **Paste** buttons. Pasted color codes go into the palette.
- **Mosaic:** **Make a mosaic…** turns the image (or the selection) into tiles with grout – squares, squares in offset rows, bricks, hexagons or irregular “crazy paving”, optionally smaller where the picture has detail (the vector app's tile layouts) – colored from your palette, from a palette it suggests, or keeping the picture's colors. **Reduce to palette** gives every pixel the nearest palette color. **Open as vector tiles…** turns every piece (tile) into a shape in the vector app at the real size, with the grout color as the page background – ready for the vector app's templates, laying plan, 3D print and editing (your previous vector drawing goes to its History).
- **Image:** resize (keeping proportions, or not), canvas size, rotate by 90° or any angle (the canvas grows to hold the picture), flip, crop to the selection, and trim an empty or one-color border.
- **Brush tips:** the brush and the eraser can be round, soft (airbrush), spray, calligraphy (a flat nib at 45°, thick and thin strokes) or chalk (grainy, as on rough paper) – Tip under Brush, or Shift+B for the next one. The spray keeps spraying while you hold it still; the calligraphy nib’s angle can be changed (about 135° for left-handed writing).
- **Pen pressure:** with a graphics tablet or stylus the brush, pencil and eraser paint thinner the lighter you press (turn it off under Brush).
- **Files:** open PNG / JPEG / WebP / GIF / SVG (or drop one on the canvas) – an image over 2000 px a side is offered scaled down to 1600 px (painting stays quick), and a photo with hundreds of colors gets a hint to reduce them – save as PNG, export JPEG / WebP (Expert), resize the image or the canvas. The image is autosaved in the browser, and **History** keeps earlier versions (every few minutes, and before opening, starting or restoring another image).
- **Report:** every color with its pieces (connected areas of one color – the tiles), pixels and real area at the width you give – a shopping list – plus “Replace with” and a CSV download.
- **Print… (Expert):** the image at real size over several sheets (or fitted on one), in color, with color numbers on the pieces, or as outlines to paint by number, with a color legend. The numbers match the report.
- **Share:** the image travels inside the link; whoever opens it sees it read-only and can make their own copy.

## Add-ons (downloads on demand)

Some features need a one-time download. Nothing is downloaded until you agree to a dialog that says how much; the files are kept in the browser (so they work offline afterwards) and the **Add-ons** list in the side panel removes them again. Everything runs on your device – pictures are never uploaded.

| Add-on | What it does | Download |
| --- | --- | --- |
| Select object (AI) | Select › **Object (AI)**: tap an object to select it (MobileSAM – light enough for phones) | 45 MB |
| Object removal (AI) | **Remove** › Fill with **AI**: a trained model fills the spot (MI-GAN) | 28 MB |
| Background removal – people / any subject | **Remove background…**: transparent background, or select the subject (MODNet / U²-Netp) | 7 / 5 MB |
| Read text (OCR) | **Read text…**: the text in the image or selection, to copy (Tesseract) | 7 MB + 2–3 MB per language |
| Depth for 3D relief (AI) | **3D relief…** from AI depth (Depth Anything V2 small) | 27 MB |

The AI add-ons share one engine (ONNX Runtime Web, downloaded once: 27 MB with WebGPU, 14 MB without – iPhone and iPad use the one without). On phones it works in less memory (slower, but iOS closes tabs that take much more than a gigabyte) and keeps one feature's models at a time. **3D relief…** also works without any download, from the picture's brightness (light or dark high – a lithophane).

## Files

The apps are written in TypeScript and bundled into one script each: `dist/mosaic.js` (vector) and `dist/raster.js` (raster). The bundles are committed, so GitHub Pages and opening the pages straight from disk need no build step. Heavy work – the mosaic effect, tracing raster tiles, and building the 3D model – runs in a worker, so the page stays responsive and shows progress: the worker (`src/worker/`) is bundled first and goes into each app as a string, which the app starts from a blob URL (so it works from disk too); without workers the same jobs run on the page.

- `index.html`, `raster.html`, `style.css`: UI of the two apps (one stylesheet)
- `src/main.ts`: vector entry point; loads the editor core, then the features
- `src/shared/`: shared by both apps – page helpers, the palette panel (`palette-ui.ts`), images on the clipboard (`clipboard.ts`), the phone layout / install / offline shell (`shell.ts`), the 3D print dialog (`export3d.ts`), the version history (`history-ui.ts`), the examples dialog (`examples-ui.ts`) and the guide (`guide.ts`), print pages, color legends and CSV files (`printing.ts`), the 3D view (`view3d.ts`, plain WebGL), languages (`i18n.ts`: `t()`, word forms, translating the page; `i18n-cs.ts`, `i18n-de.ts`, `i18n-sk.ts`, `i18n-pl.ts`: the texts of each language, keyed by the English text), running jobs in the worker (`work.ts`)
- `src/discord/activity.ts`: the editor as a Discord Activity (`dist/activity.js`, loaded only inside Discord); its backend, a Cloudflare Worker, is in `discord/`
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
  - `gcode.ts`: reading sliced G-code back (filament and tool changes, heights per tool) and checking it against the plan
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

Commit `dist/` and `sw.js` together with the source change: CI checks that they match the build.

**Releases.** The version is the one in `package.json`; the apps show it in the status bar (v1.1.0), and its button opens **What’s new**. To release: raise the version, add what changed at the top of `RELEASES` in `src/shared/whats-new.ts` (and its translations), and run `npm run build` – it also names the offline cache in `sw.js` after the version and the files it keeps, so every release replaces the offline copy. After an update, people who used the app before see the version button marked until they open What’s new.

The end-to-end tests (`tests/e2e/`) drive the real app with mouse, keyboard and touch input:
drawing, snapping, painting, painted areas following edits, files, autosave, history, printing, the photo tools, the phone layout and offline start.
They run on every push (GitHub Actions) in Chrome, Firefox and WebKit, plus emulated Android and iPhone. See [TESTING.md](TESTING.md), including the checklist for real devices.
