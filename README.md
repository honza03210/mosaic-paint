# Mosaic Paint

A vector editor for designing and coloring mosaics with your own palette.

**Use it online: https://honza03210.github.io/mosaic-paint/**
It can be installed as an app ("Install app" button, or the browser's install icon), and then it also works offline.
To run it from a download instead, open `index.html` in Chrome / Edge / Firefox; there's no build step.

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

Ctrl+C / Ctrl+X / Ctrl+V copy shapes and their colors between pages, drawings and browser tabs (they arrive under the mouse, at real size even if the other drawing uses different units). Save a selection as a **motif** to reuse it: click it in the Motifs section, then click on the drawing to place copies (R turns them). The library can be exported and imported as a file.

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

## Files

- `index.html`, `style.css`: UI
- `js/app.js`: editor core (tools, snapping, selection, palettes, undo, autosave, load/save)
- `js/features.js`: report, print template, history, auto-coloring, rulers, install
- `js/geometry.js`: geometry math, including finding closed areas for the bucket
- `js/patterns.js`: tiling patterns
- `js/automosaic.js`: tile layouts for a mosaic from a photo (quadtree, Voronoi) and palette suggestion (k-means)
- `js/photo.js`: reading the photo (average colors, detail, coloring tiles)
- `js/automosaic-ui.js`: the "Mosaic from photo" dialog
- `js/print.js`: splitting the print-out across sheets, print pages
- `js/layplan.js`: the laying plan (panels, per-panel counts)
- `js/contour.js`: rows following an outline (distance field, marching squares)
- `js/mix.js`: the random color mix
- `js/vision.js`: black & white / color-blind views and contrast checks
- `js/pages.js`: several pages per project
- `js/snippets.js`: shapes as small SVG snippets, placed moved / turned / scaled
- `js/motifs.js`: copy / paste and the motif library
- `js/share.js`: share links (compressed drawing in the link) and the read-only viewer
- `js/colors.js`: color parsing and closest-color matching
- `js/store.js`: browser storage for the autosave and versions
- `sw.js`, `manifest.webmanifest`, `icons/`: offline / install support

## Development

```bash
npm install          # test tools only; the app itself has no dependencies
npm run serve        # http://localhost:4173/
npm test             # unit tests (geometry, patterns) + end-to-end tests in Chrome
```

The end-to-end tests (`tests/e2e/`) drive the real app with mouse, keyboard and touch input:
drawing, snapping, painting, painted areas following edits, files, autosave, history, printing, the photo tools, the phone layout and offline start.
They run on every push (GitHub Actions) in Chrome, Firefox and WebKit, plus emulated Android and iPhone. See [TESTING.md](TESTING.md), including the checklist for real devices.
