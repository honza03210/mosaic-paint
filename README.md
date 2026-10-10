# Mosaic Paint

A small local vector editor for designing and coloring mosaics with your own palette.
**Use it online: https://honza03210.github.io/mosaic-paint/**

Or run it offline: no install or build step, just open `index.html` in Chrome / Edge / Firefox.

## Workflow

1. **Palette** – paste colors into the box under the swatches (or press Ctrl+V anywhere on the canvas).
   It accepts `#hex`, bare hex, `rgb()/hsl()`, CSS names, coolors.co URLs, and GIMP `.gpl` rows, one or many at a time.
   Click a swatch to make it the fill color and right-click to make it the stroke color.
   Double-click a swatch to edit it; every area painted with that color is recolored too.
   The small number on a swatch is how many areas use that color, which helps when counting tiles.
2. **Draw** with the Line tool (L) and the Regular polygon tool (G).
   With Snap on (S), points snap to ends, corners, crossings, midpoints, polygon centers, the page edge, or anywhere along an existing line.
   That last one is how you start or end a line in the middle of another line.
   "From edge" polygon mode builds a polygon on an existing edge, so tiles fit together exactly.
3. **Paint** with the bucket (B). Click inside any area enclosed by lines, polygons, or the page edge.
   The app finds the enclosed area, even one made of many separate lines, and paints it with the fill color. Click it again to recolor.
4. **Edit** with Select (V). Drag shapes, or drag corner handles; corners shared by several lines move together (hold Alt to detach one).
   Yellow handles on regular polygons resize and rotate them. Sides, radius and rotation can also be typed in the Selection panel.
5. **Save SVG** (Ctrl+S) / **Export PNG**. A saved SVG remembers the palette and opens back up for further editing.
   Any other SVG can be opened too (Open… or drag and drop onto the canvas).

Your work is also autosaved in the browser and restored when you reopen the page.

## Files

- `index.html`, `style.css` – UI
- `js/geometry.js` – math: snapping helpers and finding enclosed areas (planar faces) for the bucket
- `js/app.js` – editor: tools, selection, palette, undo, load/save
