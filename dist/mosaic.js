(() => {
  var __defProp = Object.defineProperty;
  var __export = (target3, all) => {
    for (var name in all)
      __defProp(target3, name, { get: all[name], enumerable: true });
  };

  // src/shared/i18n-cs.ts
  var CS = {
    "Picked {c}.": "Vybrána barva {c}.",
    "Picked {c} (not in the palette – add it with “From drawing”).": "Vybrána barva {c} (není v paletě – přidejte ji tlačítkem „Z kresby“).",
    "No painted area under the cursor.": "Pod kurzorem není žádná vybarvená plocha.",
    "My palette": "Moje paleta",
    "Could not read this file as SVG.": "Tento soubor nelze načíst jako SVG.",
    "From file": "Ze souboru",
    "The file’s colors were added as the palette “{name}”.": "Barvy ze souboru byly přidány jako paleta „{name}“.",
    "Discard unsaved changes to the current drawing?\n(A copy is kept in History.)": "Zahodit neuložené změny v aktuální kresbě?\n(Kopie zůstane v Historii.)",
    "Before opening {name}": "Před otevřením {name}",
    "Opened {name}": "Otevřeno: {name}",
    "Saved {name}": "Uloženo: {name}",
    "File name:": "Název souboru:",
    "PNG width in pixels:": "Šířka PNG v pixelech:",
    "Invalid width.": "Neplatná šířka.",
    "PNG export failed.": "Export do PNG se nezdařil.",
    "Before starting a new drawing": "Před založením nové kresby",
    "Applied the grout color and width to {n} {n|line|lines}.": "Barva a šířka spár byla použita na {n} {n|čáru|čáry|čar}.",
    "Autosave failed – remember to save your file.": "Automatické ukládání selhalo – nezapomeňte soubor uložit.",
    "Autosave": "Automatické uložení",
    "Before restoring an older version": "Před obnovením starší verze",
    "Restored the version from {time}": "Obnovena verze z {time}",
    "Symmetry center set.": "Střed symetrie je nastaven.",
    "Snapping on": "Přichytávání zapnuto",
    "Snapping off": "Přichytávání vypnuto",
    "The clipboard has no color codes.": "Ve schránce nejsou žádné kódy barev.",
    "{n} {n|area|areas}": "{n} {n|plocha|plochy|ploch}",
    "fill": "výplň",
    "stroke": "obrys",
    "No color – the bucket erases with it": "Bez barvy – kbelík s ní maže",
    "Recolored {n} {n|element|elements}.": "Přebarveno: {n} {n|prvek|prvky|prvků}.",
    "Click on the canvas to place the symmetry center.": "Klikněte na plátno a umístěte střed symetrie.",
    "Photo unlocked: drag it with the Select tool (where there are no shapes).": "Fotka je odemčená: přetáhněte ji nástrojem Výběr (tam, kde nejsou tvary).",
    "Remove the tracing photo?": "Odstranit fotku k obkreslení?",
    "Invalid page size.": "Neplatná velikost stránky.",
    "1 drawing unit = 1 {unit}. Set the page size to the real size of your mosaic.": "1 jednotka kresby = 1 {unit}. Nastavte velikost stránky na skutečnou velikost mozaiky.",
    "Could not read that image.": "Obrázek nelze načíst.",
    "Photo loaded and locked. Unlock it to move it with the Select tool.": "Fotka je načtená a zamčená. Odemkněte ji, chcete-li ji posunout nástrojem Výběr.",
    "Replace the photo to trace with the pasted image?": "Nahradit fotku k obkreslení vloženým obrázkem?",
    "The pasted image is now the photo to trace – “Make a mosaic from the photo” turns it into tiles.": "Vložený obrázek je teď fotkou k obkreslení – „Vytvořit mozaiku z fotky“ z něj udělá dlaždice.",
    "Replace photo…": "Nahradit fotku…",
    "Load photo…": "Načíst fotku…",
    "Close shape": "Uzavřít tvar",
    "Done": "Hotovo",
    "Start the cut inside a closed area.": "Řez začněte uvnitř uzavřené plochy.",
    "Click inside a closed area (or use “Fill whole page”).": "Klikněte dovnitř uzavřené plochy (nebo použijte „Vyplnit celou stránku“).",
    "That would be about {n} tiles – make the tile size bigger.": "To by bylo asi {n} {n|dlaždice|dlaždice|dlaždic} – zvětšete velikost dlaždic.",
    "The tiles are bigger than this area.": "Dlaždice jsou větší než tato plocha.",
    "This adds {n} lines, which may make editing slow. Continue?": "Přibude {n} {n|čára|čáry|čar}, což může zpomalit úpravy. Pokračovat?",
    "Added the pattern “{type}” ({n} {n|line|lines}).": "Přidán vzor „{type}“ ({n} {n|čára|čáry|čar}).",
    "The rows are wider than this area – use a smaller size.": "Řady jsou širší než tato plocha – použijte menší velikost.",
    "This area is too narrow for a row of that width.": "Tato plocha je na řadu takové šířky příliš úzká.",
    "Added {rows} {rows|row line|row lines} and {cuts} {cuts|cut|cuts} following the outline.": "Přidáno {rows} {rows|čára řady|čáry řad|čar řad} a {cuts} {cuts|řez|řezy|řezů} podél obrysu.",
    "Painted areas are locked or hidden (see Layers).": "Vybarvené plochy jsou zamčené nebo skryté (viz Vrstvy).",
    "No closed area here. The red circles show line ends that don’t touch anything.": "Tady není uzavřená plocha. Červené kroužky ukazují konce čar, které se ničeho nedotýkají.",
    "No closed area here – make sure the lines meet.": "Tady není uzavřená plocha – zkontrolujte, že se čáry stýkají.",
    "Click to select (Shift adds) · drag to move – the nearest corner snaps · drag handles to edit; shared corners move together (Alt detaches) · yellow handles resize a polygon": "Kliknutím vyberete (Shift přidá) · tažením posunete – přichytí se nejbližší roh · tažením úchytů upravíte; společné rohy se posouvají spolu (Alt je oddělí) · žluté úchyty mění velikost mnohoúhelníku",
    "Click–click or drag · ends snap to points and onto other lines · Shift: 15° steps · Alt: no snap · Esc: stop": "Klik–klik nebo tažení · konce se přichytí k bodům a na jiné čáry · Shift: kroky po 15° · Alt: bez přichytávání · Esc: konec",
    "Click corner by corner · click the first corner, double-click or press Enter to close · Backspace removes the last corner · Esc cancels": "Klikejte roh po rohu · tvar uzavřete kliknutím na první roh, dvojklikem nebo klávesou Enter · Backspace odebere poslední roh · Esc zruší",
    "Drag from the center (or along an edge in “From edge” mode) · click = last size · Shift: 15° rotation · Ctrl: flip side · keys 3–9: sides": "Táhněte ze středu (nebo podél hrany v režimu „Od hrany“) · kliknutí = poslední velikost · Shift: otočení po 15° · Ctrl: převrátit stranu · klávesy 3–9: počet stran",
    "Drag across a tile to cut it straight through, edge to edge · Shift: 15° steps": "Táhněte přes dlaždici a rozřízněte ji rovně od hrany k hraně · Shift: kroky po 15°",
    "Click inside a closed area to fill it with the chosen pattern": "Klikněte dovnitř uzavřené plochy a vyplňte ji zvoleným vzorem",
    "Click or drag across tiles to paint them · click again to recolor · ∅ swatch erases · Alt+click: pick a color": "Kliknutím nebo tažením přes dlaždice je vybarvíte · dalším kliknutím přebarvíte · vzorník ∅ maže · Alt+klik: vybrat barvu",
    "Drag to pan · mouse wheel zooms": "Tažením posunete pohled · kolečko myši přibližuje",
    "The lines layer is locked or hidden (see Layers).": "Vrstva čar je zamčená nebo skrytá (viz Vrstvy).",
    "About {n} tiles – too many, use a bigger tile size.": "Asi {n} {n|dlaždice|dlaždice|dlaždic} – příliš mnoho, použijte větší dlaždice.",
    "About {n} tiles.": "Asi {n} {n|dlaždice|dlaždice|dlaždic}.",
    "Load a photo first.": "Nejdřív načtěte fotku.",
    "That gives {n} tiles – use a bigger tile size.": "To dává {n} {n|dlaždici|dlaždice|dlaždic} – použijte větší dlaždice.",
    "Before making a mosaic from the photo": "Před vytvořením mozaiky z fotky",
    "From photo": "Z fotky",
    "New palette “{name}” with {n} {n|color|colors}.": "Nová paleta „{name}“ {n|s|se|s} {n} {n|barvou|barvami|barvami}.",
    "Made a mosaic of {n} tiles from the photo.": "Z fotky vznikla mozaika z {n} {n|dlaždice|dlaždic|dlaždic}.",
    "Working…": "Pracuji…",
    "Make mosaic": "Vytvořit mozaiku",
    "Versions are kept in this browser: every few minutes while you work, and before you open, start or restore another drawing. Restoring keeps your current drawing as a version too.": "Verze se ukládají v tomto prohlížeči: během práce každých pár minut a také předtím, než otevřete, založíte nebo obnovíte jinou kresbu. Při obnovení se i aktuální kresba uloží jako verze.",
    "No versions yet. A version is kept every few minutes while you work, and before you open or start another drawing.": "Zatím žádné verze. Verze se ukládá během práce každých pár minut a předtím, než otevřete nebo založíte jinou kresbu.",
    "{n} painted {n|area|areas}": "{n} {n|vybarvená plocha|vybarvené plochy|vybarvených ploch}",
    "Saved by hand": "Uloženo ručně",
    "This browser can’t copy images – use PNG to save one instead.": "Tento prohlížeč neumí kopírovat obrázky – uložte si místo toho PNG.",
    "Copied the drawing as an image – paste it into the raster app or any other program.": "Kresba je zkopírovaná jako obrázek – vložte ji do rastrové aplikace nebo do jakéhokoli programu.",
    "Could not copy the image (the browser refused).": "Obrázek nelze zkopírovat (prohlížeč to odmítl).",
    "{n} {n|panel|panels} ({rows} × {cols}) · each printed at real size on {s} {paper} {s|sheet|sheets}.": "{n} {n|panel|panely|panelů} ({rows} × {cols}) · každý vytištěný ve skutečné velikosti na {s} {s|list|listy|listů} {paper}.",
    "laying plan: {n} {n|panel|panels} ({rows} rows × {cols} columns) of {w} × {h} {unit}": "plán pokládky: {n} {n|panel|panely|panelů} ({rows} řad × {cols} sloupců) o velikosti {w} × {h} {unit}",
    "Panel {n} – row {row}, column {col}": "Panel {n} – řada {row}, sloupec {col}",
    "Panel {n}": "Panel {n}",
    "Panel": "Panel",
    "tiles per panel and color": "dlaždice podle panelů a barev",
    "laying plan": "plán pokládky",
    "{c} – click to remove from the mix": "{c} – kliknutím odeberete ze směsi",
    "Shift+click two or more swatches to put them in the mix.": "Shift+klikněte na dva nebo více vzorníků a přidejte je do směsi.",
    "Each tile gets one of these {n} colors at random. Shift+click swatches to change the mix.": "Každá dlaždice dostane náhodně jednu z těchto {n} barev. Shift+klikem na vzorníky směs změníte.",
    "Put at least two colors in the mix first (Shift+click swatches).": "Nejdřív dejte do směsi aspoň dvě barvy (Shift+klik na vzorníky).",
    "Mixed the colors of {n} {n|area|areas}.": "Promíchány barvy {n} {n|plochy|ploch|ploch}.",
    "Select painted areas first.": "Nejdřív vyberte vybarvené plochy.",
    "Cut {n} {n|shape|shapes}. Paste with Ctrl+V – also in another page or drawing.": "Vyjmuto: {n} {n|tvar|tvary|tvarů}. Vložte pomocí Ctrl+V – i na jinou stránku nebo do jiné kresby.",
    "Copied {n} {n|shape|shapes}. Paste with Ctrl+V – also in another page or drawing.": "Zkopírováno: {n} {n|tvar|tvary|tvarů}. Vložte pomocí Ctrl+V – i na jinou stránku nebo do jiné kresby.",
    "Pasted {n} {n|shape|shapes}.": "Vloženo: {n} {n|tvar|tvary|tvarů}.",
    "Could not store the motifs.": "Motivy nelze uložit.",
    "No motifs yet. Select some shapes and save them.": "Zatím žádné motivy. Vyberte nějaké tvary a uložte je.",
    "{name} – click, then click on the drawing to place it": "{name} – klikněte a pak kliknutím do kresby motiv umístěte",
    "Delete this motif": "Smazat tento motiv",
    "Delete the motif “{name}”?": "Smazat motiv „{name}“?",
    "Select the shapes of the motif first (Select tool).": "Nejdřív vyberte tvary motivu (nástroj Výběr).",
    "Name of the motif:": "Název motivu:",
    "Motif {n}": "Motiv {n}",
    "Saved the motif “{name}”.": "Motiv „{name}“ je uložen.",
    "This motif could not be read.": "Tento motiv nelze načíst.",
    "Placed “{name}”. Click again for another one, R turns it, Esc stops.": "Umístěn motiv „{name}“. Dalším kliknutím přidáte další, R otáčí, Esc končí.",
    "Click to place the motif · R: turn it by 15° (Shift+R: 90°) · Esc: stop": "Kliknutím umístíte motiv · R: otočit o 15° (Shift+R: o 90°) · Esc: konec",
    "There are no motifs to export yet.": "Zatím nejsou žádné motivy k exportu.",
    "Imported {n} {n|motif|motifs}.": "Importováno: {n} {n|motiv|motivy|motivů}.",
    "No motifs found in that file.": "V tom souboru nejsou žádné motivy.",
    "That file is not a motif library.": "Ten soubor není knihovna motivů.",
    "Page {n}": "Stránka {n}",
    "{name} copy": "{name} – kopie",
    "Page name:": "Název stránky:",
    "A project needs at least one page.": "Projekt musí mít aspoň jednu stránku.",
    "Delete the page “{name}”? (A copy of the project is kept in History.)": "Smazat stránku „{name}“? (Kopie projektu zůstane v Historii.)",
    "Before deleting the page {name}": "Před smazáním stránky {name}",
    "Rename…": "Přejmenovat…",
    "Duplicate": "Duplikovat",
    "Move left": "Posunout doleva",
    "Move right": "Posunout doprava",
    "Delete…": "Smazat…",
    "Double-click to rename": "Dvojklikem přejmenujete",
    "Switch to this page": "Přepnout na tuto stránku",
    "Page options": "Možnosti stránky",
    "Load a photo first (Photo section).": "Nejdřív načtěte fotku (sekce Fotka k obkreslení).",
    "The palette is empty – add colors first.": "Paleta je prázdná – nejdřív přidejte barvy.",
    "Colored {n} {n|area|areas} with the closest palette colors": "Vybarveno {n} {n|plocha|plochy|ploch} nejbližšími barvami palety",
    "{n} already painted (left as they were)": "{n} už {n|byla vybarvená|byly vybarvené|bylo vybarvených} (beze změny)",
    "{n} outside the photo": "{n} mimo fotku",
    "colors": "barvy",
    "The browser blocked the print window – allow pop-ups for this page.": "Prohlížeč zablokoval okno tisku – povolte pro tuto stránku vyskakovací okna.",
    "Nothing to import from the raster app.": "Z rastrové aplikace není co importovat.",
    "Opened {n} tiles from the raster app – your previous drawing is in History.": "Otevřeno {n} {n|dlaždice|dlaždice|dlaždic} z rastrové aplikace – předchozí kresba je v Historii.",
    "<b>{n}</b> painted {n|area|areas} in <b>{c}</b> {c|color|colors}": "<b>{n}</b> {n|vybarvená plocha|vybarvené plochy|vybarvených ploch} {c|v|ve|v} <b>{c}</b> {c|barvě|barvách|barvách}",
    "<b>{n}</b> not painted yet": "<b>{n}</b> ještě nevybarveno",
    "everything is painted": "vše je vybarvené",
    "page {w} × {h} {unit}": "stránka {w} × {h} {unit}",
    "Color": "Barva",
    "Areas": "Plochy",
    "Total area": "Celková plocha",
    "Share": "Sdílet",
    "Pieces of the size set above, plus waste": "Kusy o výše nastavené velikosti, včetně prořezu",
    "Pieces to buy": "Kusů ke koupi",
    "Replace with": "Nahradit za",
    "Erase": "Smazat",
    "Nothing is painted yet. Use the paint bucket, or “Color tiles from photo”.": "Zatím není nic vybarveno. Použijte kbelík nebo „Vybarvit dlaždice z fotky“.",
    "Recolored {n} {n|area|areas}.": "Přebarveno: {n} {n|plocha|plochy|ploch}.",
    "Erased {n} {n|area|areas}.": "Smazáno: {n} {n|plocha|plochy|ploch}.",
    "Colors that may look alike": "Barvy, které mohou vypadat podobně",
    "{a} and {b} {how}": "{a} a {b} {how}",
    "The link would be {kb} KB – too long. Share the file instead, or leave out the photo.": "Odkaz by měl {kb} KB – to je příliš. Sdílejte raději soubor, nebo vynechte fotku.",
    "The link is {kb} KB – long links can get cut off in some messengers; sharing the file is safer. Anyone with it can view the mosaic and make their own copy.": "Odkaz má {kb} KB – dlouhé odkazy některé chatovací aplikace zkracují; bezpečnější je sdílet soubor. Kdokoli s odkazem si mozaiku prohlédne a může si udělat vlastní kopii.",
    "The link is {kb} KB. Anyone with it can view the mosaic and make their own copy.": "Odkaz má {kb} KB. Kdokoli s odkazem si mozaiku prohlédne a může si udělat vlastní kopii.",
    "Sharing failed.": "Sdílení se nezdařilo.",
    "Link copied.": "Odkaz je zkopírován.",
    "This share link is damaged or incomplete.": "Tento odkaz je poškozený nebo neúplný.",
    "Before opening a shared mosaic": "Před otevřením sdílené mozaiky",
    "This is now your own copy – it is saved in this browser like any drawing.": "Teď je to vaše vlastní kopie – ukládá se v tomto prohlížeči jako každá kresba.",
    "Normal colors": "Běžné barvy",
    "Black & white": "Černobíle",
    "Red-blind (protanopia)": "Necitlivost na červenou (protanopie)",
    "Green-blind (deuteranopia)": "Necitlivost na zelenou (deuteranopie)",
    "Blue-blind (tritanopia)": "Necitlivost na modrou (tritanopie)",
    "look almost the same": "vypadají skoro stejně",
    "in black & white": "černobíle",
    "for red-blind viewers": "pro lidi necitlivé na červenou",
    "for green-blind viewers": "pro lidi necitlivé na zelenou",
    "for blue-blind viewers": "pro lidi necitlivé na modrou",
    "look alike {who}": "vypadají podobně {who}",
    "{n} {n|tile blends|tiles blend} into a neighbour of another color.": "{n} {n|dlaždice splývá|dlaždice splývají|dlaždic splývá} se sousední dlaždicí jiné barvy.",
    "{n} {n|tile blends|tiles blend} into a neighbour of another color (in this view).": "{n} {n|dlaždice splývá|dlaždice splývají|dlaždic splývá} se sousední dlaždicí jiné barvy (v tomto zobrazení).",
    "No tile blends into its neighbours.": "Žádná dlaždice nesplývá se sousedními.",
    "Sheet {sheet} – row {row}, column {col} of {cols} · blue strips are covered by the next sheet": "List {sheet} – řada {row}, sloupec {col} z {cols} · modré pruhy překryje další list",
    "One {paper} sheet ({orientation}), at {pct} % of the real size.": "Jeden list {paper} ({orientation}), {pct} % skutečné velikosti.",
    "One {paper} sheet ({orientation}) at real size.": "Jeden list {paper} ({orientation}) ve skutečné velikosti.",
    "{n} {paper} {n|sheet|sheets} ({orientation}, {rows} × {cols}, overlapping {overlap} mm) at real size.": "{n} {n|list|listy|listů} {paper} ({orientation}, {rows} × {cols}, s překryvem {overlap} mm) ve skutečné velikosti.",
    "{n} sheets ({rows} × {cols}), real size {w} × {h} cm": "{n} listů ({rows} × {cols}), skutečná velikost {w} × {h} cm",
    "The picture has many colors: it is snapped to the current palette (use “Reduce to palette” to see the result first).": "Obrázek má mnoho barev: převede se na aktuální paletu (výsledek si nejdřív můžete prohlédnout přes „Převést na paletu“).",
    "The picture has many colors: it is snapped to 8 colors suggested from it.": "Obrázek má mnoho barev: převede se na 8 barev navržených z něj.",
    "Images": "Obrázky",
    "PNG image": "Obrázek PNG",
    "Discard unsaved changes to the current image?\n(Save it first if you want to keep it.)": "Zahodit neuložené změny v aktuálním obrázku?\n(Pokud si ho chcete ponechat, nejdřív ho uložte.)",
    "Could not read {name} as an image.": "Soubor {name} nelze načíst jako obrázek.",
    "Opened {name} ({w} × {h} px).": "Otevřeno: {name} ({w} × {h} px).",
    "Size of the new image in pixels (width × height):": "Velikost nového obrázku v pixelech (šířka × výška):",
    "Enter a size like 800 × 600 (at most {max} px a side).": "Zadejte velikost jako 800 × 600 (nejvýš {max} px na stranu).",
    "Before starting a new image": "Před založením nového obrázku",
    "That version could not be read.": "Tuto verzi nelze načíst.",
    "Export failed.": "Export se nezdařil.",
    "Autosave failed – remember to save your image.": "Automatické ukládání selhalo – nezapomeňte obrázek uložit.",
    "The clipboard has no image or color codes.": "Ve schránce není obrázek ani kódy barev.",
    "Versions are kept in this browser: every few minutes while you work, and before you open, start or restore another image. Restoring keeps your current image as a version too.": "Verze se ukládají v tomto prohlížeči: během práce každých pár minut a také předtím, než otevřete, založíte nebo obnovíte jiný obrázek. Při obnovení se i aktuální obrázek uloží jako verze.",
    "No versions yet. A version is kept every few minutes while you work, and before you open or start another image.": "Zatím žádné verze. Verze se ukládá během práce každých pár minut a předtím, než otevřete nebo založíte jiný obrázek.",
    "The palette is empty – add colors, or let the mosaic suggest some.": "Paleta je prázdná – přidejte barvy, nebo nechte mozaiku nějaké navrhnout.",
    "There is nothing to make a mosaic from (the area is transparent).": "Není z čeho udělat mozaiku (plocha je průhledná).",
    "From picture": "Z obrázku",
    "Made {n} {n|tile|tiles} in {c} {c|color|colors}.": "Vytvořeno {n} {n|dlaždice|dlaždice|dlaždic} {c|v|ve|v} {c} {c|barvě|barvách|barvách}.",
    "The palette is empty.": "Paleta je prázdná.",
    "Every pixel now has a palette color: {n} {n|pixel|pixels} in {c} {c|color|colors}.": "Každý pixel má teď barvu z palety: {n} {n|pixel|pixely|pixelů} {c|v|ve|v} {c} {c|barvě|barvách|barvách}.",
    "At most about {n} tiles in the selection – bigger ones where the picture is calm.": "Nejvýš asi {n} {n|dlaždice|dlaždice|dlaždic} ve výběru – kde je obrázek klidný, budou větší.",
    "At most about {n} tiles – bigger ones where the picture is calm.": "Nejvýš asi {n} {n|dlaždice|dlaždice|dlaždic} – kde je obrázek klidný, budou větší.",
    "About {n} tiles in the selection.": "Asi {n} {n|dlaždice|dlaždice|dlaždic} ve výběru.",
    "Turn on “Fill” or “Outline” for polygons.": "U mnohoúhelníků zapněte „Výplň“ nebo „Obrys“.",
    "Picked “transparent”.": "Vybrána „průhledná“.",
    "Picked {c} (not in the palette – add it with “From image”).": "Vybrána barva {c} (není v paletě – přidejte ji tlačítkem „Z obrázku“).",
    "{n} {n|pixel|pixels}": "{n} {n|pixel|pixely|pixelů}",
    "paint color": "barva malování",
    "outline color": "barva obrysu",
    "Transparent – paints and fills transparent pixels": "Průhledná – maluje a vyplňuje průhlednými pixely",
    "Recolored {n} {n|pixel|pixels}.": "Přebarveno: {n} {n|pixel|pixely|pixelů}.",
    "Nothing to paste – or the browser didn’t allow reading the clipboard (try Ctrl+V).": "Není co vložit – nebo prohlížeč nepovolil čtení schránky (zkuste Ctrl+V).",
    "Enter a size from 1 to {max} px.": "Zadejte velikost od 1 do {max} px.",
    "This picture has {n} pieces – too many to number. Make a mosaic or reduce it to the palette first.": "Obrázek má {n} {n|dílek|dílky|dílků} – to je na číslování příliš. Nejdřív z něj udělejte mozaiku nebo ho převeďte na paletu.",
    "{n} {n|piece|pieces}": "{n} {n|dílek|dílky|dílků}",
    "{n} {n|piece|pieces} in {c} {c|color|colors} · {w} × {h} px": "{n} {n|dílek|dílky|dílků} {c|v|ve|v} {c} {c|barvě|barvách|barvách} · {w} × {h} px",
    "Nothing is painted yet.": "Zatím není nic vybarveno.",
    "{w} × {h} mm · {k} mm per pixel": "{w} × {h} mm · {k} mm na pixel",
    "Pieces": "Dílky",
    "Pixels": "Pixely",
    "Area": "Plocha",
    "transparent": "průhledná",
    "({w} × {h} px, not placed yet)": "({w} × {h} px, ještě neumístěno)",
    "Cut the selection – paste it here, into the vector app or any other program.": "Výběr je vyjmutý – vložte ho sem, do vektorové aplikace nebo do jakéhokoli programu.",
    "Cut the image – paste it here, into the vector app or any other program.": "Obrázek je vyjmutý – vložte ho sem, do vektorové aplikace nebo do jakéhokoli programu.",
    "Copied the selection – paste it here, into the vector app or any other program.": "Výběr je zkopírovaný – vložte ho sem, do vektorové aplikace nebo do jakéhokoli programu.",
    "Copied the image – paste it here, into the vector app or any other program.": "Obrázek je zkopírovaný – vložte ho sem, do vektorové aplikace nebo do jakéhokoli programu.",
    "Cut the selection (this browser keeps it for pasting here only).": "Výběr je vyjmutý (tento prohlížeč ho uchová jen pro vložení sem).",
    "Cut the image (this browser keeps it for pasting here only).": "Obrázek je vyjmutý (tento prohlížeč ho uchová jen pro vložení sem).",
    "Copied the selection (this browser keeps it for pasting here only).": "Výběr je zkopírovaný (tento prohlížeč ho uchová jen pro vložení sem).",
    "Copied the image (this browser keeps it for pasting here only).": "Obrázek je zkopírovaný (tento prohlížeč ho uchová jen pro vložení sem).",
    "Select the part to keep first.": "Nejdřív vyberte část, kterou chcete ponechat.",
    "Could not read the pasted image.": "Vložený obrázek nelze načíst.",
    "The pasted image ({w} × {h}) is bigger than this one ({W} × {H}). Enlarge the canvas to fit it?": "Vložený obrázek ({w} × {h}) je větší než tento ({W} × {H}). Zvětšit plátno, aby se vešel?",
    "Pasted {w} × {h} px – drag it into place, then press Enter (or click outside it).": "Vloženo {w} × {h} px – přetáhněte na místo a stiskněte Enter (nebo klikněte mimo).",
    "The link would be {kb} KB – too long. Share the file instead (or make the image smaller).": "Odkaz by měl {kb} KB – to je příliš. Sdílejte raději soubor (nebo obrázek zmenšete).",
    "The link is {kb} KB – long links can get cut off in some messengers; sharing the file is safer. Anyone with it can view the image and make their own copy.": "Odkaz má {kb} KB – dlouhé odkazy některé chatovací aplikace zkracují; bezpečnější je sdílet soubor. Kdokoli s odkazem si obrázek prohlédne a může si udělat vlastní kopii.",
    "The link is {kb} KB. Anyone with it can view the image and make their own copy.": "Odkaz má {kb} KB. Kdokoli s odkazem si obrázek prohlédne a může si udělat vlastní kopii.",
    "Before opening a shared image": "Před otevřením sdíleného obrázku",
    "This is now your own copy – it is saved in this browser like any image.": "Teď je to vaše vlastní kopie – ukládá se v tomto prohlížeči jako každý obrázek.",
    "Drag to select · drag inside the selection to move it (Alt: a copy) · Enter places it · Ctrl+C / X / V copy, cut, paste": "Tažením vyberete · tažením uvnitř výběru ho posunete (Alt: kopii) · Enter ho umístí · Ctrl+C / X / V kopírovat, vyjmout, vložit",
    "Drag to paint · Shift: straight line · [ ] size · Shift+B: tip · Alt+click: pick a color": "Tažením malujete · Shift: rovná čára · [ ] velikost · Shift+B: hrot · Alt+klik: vybrat barvu",
    "Hard pixels in exact colors · Shift: straight line · [ ] size · Alt+click: pick a color": "Ostré pixely v přesných barvách · Shift: rovná čára · [ ] velikost · Alt+klik: vybrat barvu",
    "Drag to erase to transparent · Shift: straight line · [ ] size": "Tažením mažete do průhlednosti · Shift: rovná čára · [ ] velikost",
    "Drag a line · Shift: 15° steps": "Táhněte čáru · Shift: kroky po 15°",
    "Drag from the center · Shift: 15° rotation · keys 3–9: sides": "Táhněte ze středu · Shift: otočení po 15° · klávesy 3–9: počet stran",
    "Click to fill the area of similar color · Alt+click: pick a color": "Kliknutím vyplníte plochu podobné barvy · Alt+klik: vybrat barvu",
    "Click to take a color from the image": "Kliknutím vezmete barvu z obrázku",
    "No grout – every piece is a tile": "Bez spár – každý dílek je dlaždice",
    "{n} {n|tile|tiles} at {w} × {h} mm – too many: make a mosaic or reduce the picture to the palette first.": "{n} {n|dlaždice|dlaždice|dlaždic} na {w} × {h} mm – příliš mnoho: nejdřív udělejte mozaiku nebo převeďte obrázek na paletu.",
    "{n} {n|tile|tiles} at {w} × {h} mm.": "{n} {n|dlaždice|dlaždice|dlaždic} na {w} × {h} mm.",
    "Could not hand the tiles over (browser storage unavailable).": "Dlaždice nelze předat (úložiště prohlížeče není dostupné).",
    "3D print": "3D tisk",
    "Close": "Zavřít",
    "A model where every color stands at its own height. Print it with one nozzle and change the filament at the layers listed below – each tile’s top then shows its color. The 3MF file already contains the filament changes for PrusaSlicer; for other slicers, the plan lists them.": "Model, ve kterém má každá barva svou výšku. Vytiskněte ho jednou tryskou a ve vrstvách uvedených níže vyměňte filament – horní plocha každé dlaždice pak má svou barvu. Soubor 3MF už výměny filamentu obsahuje pro PrusaSlicer; pro jiné sliceře je najdete v plánu.",
    "Size": "Velikost",
    "Size of the model’s smallest step – about your nozzle width": "Velikost nejmenšího kroku modelu – zhruba šířka vaší trysky",
    "Detail": "Detail",
    "Layer height": "Výška vrstvy",
    "How many layers each color gets – more layers cover the color below better": "Kolik vrstev dostane každá barva – víc vrstev lépe překryje barvu pod ní",
    "Layers per color": "Vrstev na barvu",
    "A plate under everything, printed in the first color. 0: unpainted parts are left open": "Deska pod vším, tištěná první barvou. 0: nevybarvená místa zůstanou otevřená",
    "Base layers": "Vrstev základu",
    "Top view of the model": "Pohled na model shora",
    "Print order (bottom first):": "Pořadí tisku (odspodu):",
    "Lighter colors lower: a darker layer covers a lighter one well. Lines (grout) stay at the bottom": "Světlejší barvy níž: tmavší vrstva světlejší dobře překryje. Čáry (spáry) zůstávají dole",
    "Light → dark": "Světlé → tmavé",
    "Dark → light": "Tmavé → světlé",
    "Which filament to load at which layer, as a text file": "Který filament ve které vrstvě založit, jako textový soubor",
    "Plan": "Plán",
    "Just the shape – add the filament changes from the plan in your slicer": "Jen tvar – výměny filamentu podle plánu přidejte ve sliceru",
    "The model, with the filament changes for PrusaSlicer": "Model i s výměnami filamentu pro PrusaSlicer",
    "Download 3MF": "Stáhnout 3MF",
    "{n} colors make a tall print with many filament changes – reduce the colors first (Raster: “Reduce to palette”).": "{n} {n|barva dává|barvy dávají|barev dává} vysoký výtisk s mnoha výměnami filamentu – nejdřív snižte počet barev (Rastr: „Převést na paletu“).",
    "Detail lowered to {d} mm for this size.": "Detail snížen na {d} mm kvůli této velikosti.",
    "lines": "čáry",
    "Print earlier (lower)": "Tisknout dřív (níž)",
    "Print later (higher)": "Tisknout později (výš)",
    "{share} % · layers {from}–{to}": "{share} % · vrstvy {from}–{to}",
    "{share} % · layers {from}–{to} · change at Z {z}": "{share} % · vrstvy {from}–{to} · výměna ve výšce Z {z}",
    "{n} {n|color|colors} · height {h} mm ({layers} {layers|layer|layers}) · {c} filament {c|change|changes}": "{n} {n|barva|barvy|barev} · výška {h} mm ({layers} {layers|vrstva|vrstvy|vrstev}) · {c} {c|výměna|výměny|výměn} filamentu",
    "unpainted parts stay at the base ({h} mm)": "nevybarvená místa zůstanou ve výšce základu ({h} mm)",
    "unpainted parts are left open": "nevybarvená místa zůstanou otevřená",
    "Mosaic Paint – 3D print plan for {name}.3mf / {name}.stl": "Mosaic Paint – plán 3D tisku pro {name}.3mf / {name}.stl",
    "Size {w} × {h} mm · layer height {lh} mm · {lpc} layers per color · base {base} layers": "Velikost {w} × {h} mm · výška vrstvy {lh} mm · {lpc} vrstev na barvu · základ {base} vrstev",
    "Total height {total} mm ({layers} layers). Set the slicer’s first layer height to {lh} mm too.": "Celková výška {total} mm ({layers} vrstev). Výšku první vrstvy ve sliceru nastavte také na {lh} mm.",
    "Start with {color} – layers {from}–{to} (base plate included)": "Začněte barvou {color} – vrstvy {from}–{to} (včetně základní desky)",
    "Start with {color} – layers {from}–{to}": "Začněte barvou {color} – vrstvy {from}–{to}",
    "Layer {layer} (Z {z} mm): change to {color} – layers {from}–{to}": "Vrstva {layer} (Z {z} mm): vyměňte za {color} – vrstvy {from}–{to}",
    "PrusaSlicer: the 3MF file already contains these changes – open it and check the layer slider.": "PrusaSlicer: soubor 3MF už tyto výměny obsahuje – otevřete ho a zkontrolujte posuvník vrstev.",
    "Other slicers (they read only the shape from the 3MF or STL) – add the changes by hand:": "Jiné sliceře (z 3MF nebo STL načtou jen tvar) – výměny přidejte ručně:",
    "- PrusaSlicer, Bambu Studio, OrcaSlicer: in the preview, move the layer slider to each Z above and click “+” (Add color change, M600).": "- PrusaSlicer, Bambu Studio, OrcaSlicer: v náhledu posuňte posuvník vrstev na každou výšku Z výše a klikněte na „+“ (Přidat změnu barvy, M600).",
    "- Cura: Extensions › Post Processing › Modify G-Code › “Filament Change” at each layer number above.": "- Cura: Rozšíření › Postprocessing › Upravit G-kód › „Filament Change“ u každého čísla vrstvy výše.",
    "- Multi-material printers (AMS, MMU): the same changes work; or assign the filaments to the color changes in the slicer.": "- Tiskárny pro více materiálů (AMS, MMU): fungují stejné výměny; nebo přiřaďte filamenty ke změnám barvy ve sliceru.",
    "Could not read the picture.": "Obrázek nelze načíst.",
    "Saved {name}.3mf ({n} triangles; PrusaSlicer reads its {c} filament {c|change|changes}, other slicers need the plan).": "Uloženo {name}.3mf ({n} trojúhelníků; PrusaSlicer načte {c} {c|výměnu|výměny|výměn} filamentu, jiné sliceře potřebují plán).",
    "Saved {name}.stl ({n} triangles). Add the filament changes from the plan in your slicer.": "Uloženo {name}.stl ({n} trojúhelníků). Výměny filamentu podle plánu přidejte ve sliceru.",
    "Reading the picture…": "Načítám obrázek…",
    "History": "Historie",
    "Save a version now": "Uložit verzi teď",
    "Version history needs browser storage (IndexedDB), which is not available here.": "Historie verzí potřebuje úložiště prohlížeče (IndexedDB), které tu není dostupné.",
    "Restore": "Obnovit",
    "Version saved.": "Verze je uložena.",
    "Could not save a version (browser storage unavailable).": "Verzi nelze uložit (úložiště prohlížeče není dostupné).",
    "used by {what}": "použito: {what}",
    "Click: {fill} · Right-click: {stroke} · Double-click: edit": "Klik: {fill} · Pravý klik: {stroke} · Dvojklik: upravit",
    "Remove from palette": "Odebrat z palety",
    "Edit color (hex or any CSS color).\nThe drawing is recolored too.": "Upravit barvu (hex nebo jakákoli barva CSS).\nPřebarví se i kresba.",
    "Not a valid color: {v}": "Neplatná barva: {v}",
    "Paste a color code (or several) into the box, then press Enter.": "Vložte do pole kód barvy (nebo několik) a stiskněte Enter.",
    "No color found in: {text}": "Nenalezena žádná barva v: {text}",
    "Added {n} {n|color|colors}.": "Přidáno: {n} {n|barva|barvy|barev}.",
    "Already in the palette.": "Už je v paletě.",
    "Added {n} {n|color|colors} from the clipboard.": "Ze schránky přidáno: {n} {n|barva|barvy|barev}.",
    "Those colors are already in the palette.": "Tyto barvy už v paletě jsou.",
    "Name of the new palette:": "Název nové palety:",
    "Palette": "Paleta",
    "Created “{name}”. Paste colors to fill it.": "Vytvořena paleta „{name}“. Naplňte ji vložením barev.",
    "Rename palette:": "Přejmenovat paletu:",
    "Delete the palette “{name}”? (The drawing is not changed.)": "Smazat paletu „{name}“? (Kresba se nezmění.)",
    "Added {n} {n|color|colors} from the drawing.": "Z kresby přidáno: {n} {n|barva|barvy|barev}.",
    "No new colors in the drawing.": "V kresbě nejsou žádné nové barvy.",
    "Remove all colors from this palette? (The drawing is not changed.)": "Odebrat z této palety všechny barvy? (Kresba se nezmění.)",
    "Imported {n} {n|color|colors}.": "Importováno: {n} {n|barva|barvy|barev}.",
    "No new colors found in {name}": "V souboru {name} nejsou žádné nové barvy",
    "Installed – Mosaic Paint now works offline too.": "Nainstalováno – Mosaic Paint teď funguje i offline.",
    "Simple": "Jednoduchý",
    "Expert": "Expert",
    "New": "Nový",
    "Open…": "Otevřít…",
    "Save": "Uložit",
    "Save as…": "Uložit jako…",
    "Copy image": "Kopírovat obrázek",
    "Print…": "Tisk…",
    "Plan…": "Plán…",
    "Report": "Přehled",
    "Contrast": "Kontrast",
    "Share of area": "Podíl plochy",
    "Install app": "Nainstalovat aplikaci",
    "You are looking at a shared mosaic.": "Prohlížíte si sdílenou mozaiku.",
    "Make my own copy": "Udělat si vlastní kopii",
    "Back to my drawing": "Zpět k mé kresbě",
    "Remove last corner": "Odebrat poslední roh",
    "Cancel": "Zrušit",
    "Colors": "Barvy",
    "Fill": "Výplň",
    "Stroke": "Obrys",
    "Width": "Šířka",
    "Add color": "Přidat barvu",
    "Import…": "Importovat…",
    "From drawing": "Z kresby",
    "Export": "Exportovat",
    "Clear": "Vymazat",
    "Click a swatch = fill · right-click = stroke · double-click = edit (also recolors the drawing) · Shift+click = add to the color mix. Ctrl+V on the canvas adds copied colors.": "Klik na vzorník = výplň · pravý klik = obrys · dvojklik = upravit (přebarví i kresbu) · Shift+klik = přidat do směsi barev. Ctrl+V na plátně přidá zkopírované barvy.",
    "Line": "Čára",
    "Chain lines (next line starts at the last end)": "Navazovat čáry (další čára začne na konci předchozí)",
    "Free polygon": "Volný mnohoúhelník",
    "Click each corner. Click the first corner again, double-click or press Enter to close it.": "Klikněte na každý roh. Tvar uzavřete kliknutím na první roh, dvojklikem nebo klávesou Enter.",
    "Fill new shapes with the fill color": "Nové tvary vyplnit barvou výplně",
    "Regular polygon": "Pravidelný mnohoúhelník",
    "Sides": "Strany",
    "From center": "Ze středu",
    "From edge": "Od hrany",
    "Knife": "Nůž",
    "Press inside a tile and drag in the direction of the cut. The tile is cut straight across, from edge to edge.": "Stiskněte uvnitř dlaždice a táhněte ve směru řezu. Dlaždice se rozřízne rovně od hrany k hraně.",
    "Pattern": "Vzor",
    "Angle": "Úhel",
    "Rows": "Řady",
    "Fill whole page": "Vyplnit celou stránku",
    "Click inside a closed area to fill it with tiles. Painted areas keep their color in every new tile. “Rows following the outline” lays rows along the area’s edge and around shapes inside it (Rows 0 = fill it).": "Klikněte dovnitř uzavřené plochy a vyplňte ji dlaždicemi. Vybarvené plochy si barvu ponechají v každé nové dlaždici. „Řady podél obrysu“ kladou řady podél okraje plochy a kolem tvarů uvnitř ní (Řady 0 = vyplnit celou).",
    "Paint bucket": "Kbelík",
    "Click inside any closed area, or drag across many tiles. Click a painted area again to recolor it. The ∅ swatch erases. Alt+click picks a color.": "Klikněte do libovolné uzavřené plochy nebo táhněte přes víc dlaždic. Dalším kliknutím vybarvenou plochu přebarvíte. Vzorník ∅ maže. Alt+klik vybere barvu.",
    "Mix colors (a random one per tile)": "Míchat barvy (každá dlaždice náhodnou)",
    "Avoid the same color next to itself": "Nedávat stejnou barvu vedle sebe",
    "Close gaps up to": "Uzavírat mezery do",
    "Photo to trace": "Fotka k obkreslení",
    "Opacity": "Krytí",
    "Show": "Zobrazit",
    "Locked": "Zamčeno",
    "Fit to page": "Přizpůsobit stránce",
    "Remove": "Odstranit",
    "Keep the photo in saved files": "Ukládat fotku do souborů",
    "Make a mosaic from the photo…": "Vytvořit mozaiku z fotky…",
    "Color my tiles from the photo": "Vybarvit mé dlaždice podle fotky",
    "Only tiles that aren’t painted yet": "Jen dlaždice, které ještě nejsou vybarvené",
    "Each tile gets the palette color closest to the photo underneath it. Draw the tile lines first.": "Každá dlaždice dostane barvu z palety nejbližší fotce pod ní. Nejdřív nakreslete čáry dlaždic.",
    "Grout preview": "Náhled spár",
    "Preview": "Náhled",
    "Apply to all lines": "Použít na všechny čáry",
    "Motifs": "Motivy",
    "Save selection…": "Uložit výběr…",
    "Click a motif, then click on the drawing to place it (R turns it, Esc stops). Ctrl+C / Ctrl+X / Ctrl+V copy shapes between pages, drawings and browser tabs.": "Klikněte na motiv a pak kliknutím do kresby ho umístěte (R otáčí, Esc končí). Ctrl+C / Ctrl+X / Ctrl+V kopírují tvary mezi stránkami, kresbami i panely prohlížeče.",
    "Symmetry": "Symetrie",
    "Off": "Vypnuto",
    "Mirror left ↔ right": "Zrcadlit vlevo ↔ vpravo",
    "Mirror top ↕ bottom": "Zrcadlit nahoře ↕ dole",
    "Mirror both ways": "Zrcadlit oběma směry",
    "Rotate around center": "Otáčet kolem středu",
    "Copies": "Kopie",
    "also mirrored": "i zrcadlově",
    "Pick center": "Vybrat střed",
    "Page center": "Střed stránky",
    "Lines, polygons, knife cuts and painting are repeated around the guides.": "Čáry, mnohoúhelníky, řezy nožem i vybarvování se opakují kolem vodítek.",
    "Layers": "Vrstvy",
    "Lines & shapes": "Čáry a tvary",
    "Painted areas": "Vybarvené plochy",
    "Photo": "Fotka",
    "Lock the lines while painting so they can’t be moved by accident.": "Při vybarvování čáry zamkněte, aby se omylem neposunuly.",
    "Snapping": "Přichytávání",
    "Snap to points & lines": "Přichytávat k bodům a čarám",
    "Shared corners move together": "Společné rohy se posouvají spolu",
    "Page edge counts as a line": "Okraj stránky se počítá jako čára",
    "Grid, size": "Mřížka, velikost",
    "Snaps to ends & corners ▢, crossings ✕, midpoints △, anywhere along a line ◇, centers ○. Hold Alt to place freely.": "Přichytává ke koncům a rohům ▢, průsečíkům ✕, středům úseček △, kamkoli na čáru ◇ a středům ○. Se stisknutým Alt umisťujete volně.",
    "Selection": "Výběr",
    "Radius": "Poloměr",
    "Rotation°": "Otočení°",
    "Line width": "Šířka čáry",
    "Delete": "Smazat",
    "To front": "Dopředu",
    "To back": "Dozadu",
    "Mix colors": "Promíchat barvy",
    "Page": "Stránka",
    "Apply": "Použít",
    "Background": "Pozadí",
    "Show rulers": "Zobrazit pravítka",
    "Keyboard & mouse": "Klávesnice a myš",
    "Select, Line, Free polygon, Polygon, Ellipse, Curve, Pattern, Bucket, Pan": "Výběr, Čára, Volný mnohoúhelník, Mnohoúhelník, Elipsa, Křivka, Vzor, Kbelík, Posun",
    "Polygon sides": "Počet stran mnohoúhelníku",
    "Toggle snapping": "Zapnout / vypnout přichytávání",
    "Alt": "Alt",
    "Draw / drag without snapping; detach a shared corner; Alt+click with the bucket picks a color": "Kreslit / táhnout bez přichytávání; oddělit společný roh; Alt+klik kbelíkem vybere barvu",
    "Shift": "Shift",
    "15° steps; add to selection": "Kroky po 15°; přidat k výběru",
    "Ctrl (polygon tool)": "Ctrl (nástroj mnohoúhelník)",
    "Flip side when drawing from an edge": "Při kreslení od hrany převrátit stranu",
    "Ctrl + drag handle": "Ctrl + tažení úchytu",
    "Freely move a polygon corner (it stops being regular)": "Volně posunout roh mnohoúhelníku (přestane být pravidelný)",
    "Enter / Esc": "Enter / Esc",
    "Finish / cancel the current shape": "Dokončit / zrušit rozkreslený tvar",
    "Del": "Del",
    "Delete selection (or the last corner of a free polygon)": "Smazat výběr (nebo poslední roh volného mnohoúhelníku)",
    "Arrows": "Šipky",
    "Nudge (Shift = ×10)": "Posunout (Shift = ×10)",
    "Undo / redo": "Zpět / znovu",
    "Copy, cut, paste shapes (also between pages and drawings). Ctrl+C with nothing selected copies the drawing as an image; pasting an image makes it the photo to trace": "Kopírovat, vyjmout, vložit tvary (i mezi stránkami a kresbami). Ctrl+C bez výběru zkopíruje kresbu jako obrázek; vložený obrázek se stane fotkou k obkreslení",
    "Duplicate, select all": "Duplikovat, vybrat vše",
    "Wheel, Space+drag": "Kolečko, mezerník+tažení",
    "Zoom, pan (two fingers on touch screens)": "Přiblížení, posun (na dotykových displejích dvěma prsty)",
    "Fit page": "Celá stránka",
    "＋ Page": "＋ Stránka",
    "Colors & shopping list": "Barvy a nákupní seznam",
    "Piece size": "Velikost kusu",
    "Waste": "Prořez",
    "“Replace with” recolors every area of that color.": "„Nahradit za“ přebarví všechny plochy té barvy.",
    "Download CSV": "Stáhnout CSV",
    "Print template": "Tisková šablona",
    "Opens a print page to use as a cutting or laying template.": "Otevře stránku k tisku, kterou použijete jako šablonu pro řezání nebo pokládku.",
    "Paper": "Papír",
    "Letter": "Letter",
    "Tabloid (11×17 in)": "Tabloid (11×17 palců)",
    "Real size (split across several sheets if needed)": "Skutečná velikost (v případě potřeby na více listů)",
    "Fit on one sheet": "Na jeden list",
    "In color": "Barevně",
    "In color, with color numbers": "Barevně, s čísly barev",
    "Outlines with color numbers (paint by number)": "Obrysy s čísly barev (omalovánka podle čísel)",
    "Add a page with the color legend": "Přidat stránku s legendou barev",
    "Mosaic from photo": "Mozaika z fotky",
    "Lays out tiles over the whole page and gives each tile the color of the photo underneath it.": "Rozloží dlaždice po celé stránce a každé dá barvu fotky pod ní.",
    "First load a photo:": "Nejdřív načtěte fotku:",
    "Tiles": "Dlaždice",
    "Smaller tiles where the photo has detail": "Menší dlaždice tam, kde má fotka detaily",
    "Use the current palette": "Použít aktuální paletu",
    "Suggest": "Navrhnout",
    "colors from the photo (new palette)": "barev z fotky (nová paleta)",
    "Replace the current drawing (it is kept in History)": "Nahradit aktuální kresbu (zůstane v Historii)",
    "Laying plan": "Plán pokládky",
    "Splits the mosaic into numbered panels – the size of your work surface or of the mesh sheets you lay the tiles on. The print has an overview, every panel at real size and the number of tiles of each color per panel.": "Rozdělí mozaiku na očíslované panely – o velikosti vaší pracovní plochy nebo sítí, na které dlaždice kladete. Výtisk obsahuje přehled, každý panel ve skutečné velikosti a počet dlaždic každé barvy v panelu.",
    "Panel size": "Velikost panelu",
    "Tabloid": "Tabloid",
    "Color numbers on the tiles": "Čísla barev na dlaždicích",
    "Show the panels on the drawing": "Zobrazit panely v kresbě",
    "The whole drawing is packed into the link itself – nothing is uploaded. Whoever opens it sees the mosaic and can make their own copy to edit.": "Celá kresba je zabalená přímo v odkazu – nic se nikam nenahrává. Kdo ho otevře, uvidí mozaiku a může si udělat vlastní kopii k úpravám.",
    "Include the tracing photo (makes the link much longer)": "Přibalit fotku k obkreslení (odkaz bude mnohem delší)",
    "Share file…": "Sdílet soubor…",
    "Copy link": "Kopírovat odkaz",
    "Switch app": "Přepnout aplikaci",
    "Vector: tiles as shapes. Raster: paint with pixels. Palettes are shared; copy and paste images between them.": "Vektor: dlaždice jako tvary. Rastr: malování pixely. Palety jsou společné; obrázky mezi nimi kopírujte a vkládejte.",
    "Simple shows the essentials; Expert adds symmetry, layers, rulers, the knife, printing and fine settings": "Jednoduchý ukazuje to podstatné; Expert přidává symetrii, vrstvy, pravítka, nůž, tisk a jemná nastavení",
    "New drawing": "Nová kresba",
    "Open SVG (Ctrl+O) – you can also drop a file on the canvas": "Otevřít SVG (Ctrl+O) – soubor můžete také přetáhnout na plátno",
    "Save SVG (Ctrl+S)": "Uložit SVG (Ctrl+S)",
    "Save as (Ctrl+Shift+S)": "Uložit jako (Ctrl+Shift+S)",
    "Export a PNG image": "Exportovat obrázek PNG",
    "Export a 3D model for printing with filament changes – each color at its own height": "Exportovat 3D model pro tisk s výměnami filamentu – každá barva ve své výšce",
    "Copy the drawing (or the selected shapes) as an image – paste it into the raster app or any other program (Ctrl+C)": "Zkopírovat kresbu (nebo vybrané tvary) jako obrázek – vložíte ho do rastrové aplikace nebo jakéhokoli programu (Ctrl+C)",
    "Print a real-size template with color numbers": "Vytisknout šablonu ve skutečné velikosti s čísly barev",
    "Split the mosaic into numbered panels and print a laying plan": "Rozdělit mozaiku na očíslované panely a vytisknout plán pokládky",
    "Colors used, areas and a shopping list": "Použité barvy, plochy a nákupní seznam",
    "Earlier versions of your drawing": "Starší verze vaší kresby",
    "Share the mosaic as a link": "Sdílet mozaiku jako odkaz",
    "Undo (Ctrl+Z)": "Zpět (Ctrl+Z)",
    "Redo (Ctrl+Y)": "Znovu (Ctrl+Y)",
    "Zoom out (-)": "Oddálit (-)",
    "Zoom in (+)": "Přiblížit (+)",
    "Fit page (0)": "Celá stránka (0)",
    "See the mosaic in black & white or as color-blind people see it (screen only)": "Zobrazit mozaiku černobíle nebo tak, jak ji vidí lidé s poruchou barvocitu (jen na obrazovce)",
    "Mark tiles that blend into a neighbouring tile of another color": "Označit dlaždice, které splývají se sousední dlaždicí jiné barvy",
    "Language": "Jazyk",
    "Install as an app that also works offline": "Nainstalovat jako aplikaci, která funguje i offline",
    "Show the side panel": "Zobrazit boční panel",
    "Select / edit (V)": "Výběr / úpravy (V)",
    "Line (L)": "Čára (L)",
    "Free polygon – click corner by corner (P)": "Volný mnohoúhelník – klikání roh po rohu (P)",
    "Regular polygon (G)": "Pravidelný mnohoúhelník (G)",
    "Knife – cut a tile straight across (K)": "Nůž – rozříznout dlaždici napříč (K)",
    "Pattern – fill an area with tiles (T)": "Vzor – vyplnit plochu dlaždicemi (T)",
    "Paint bucket – click or drag across tiles (B)": "Kbelík – klik nebo tažení přes dlaždice (B)",
    "Pan (H, or hold Space / middle mouse / two fingers)": "Posun (H, nebo podržte mezerník / prostřední tlačítko myši / dva prsty)",
    "Your saved palettes": "Vaše uložené palety",
    "New palette": "Nová paleta",
    "Rename this palette": "Přejmenovat tuto paletu",
    "Delete this palette": "Smazat tuto paletu",
    "Fill color – used by the paint bucket": "Barva výplně – používá ji kbelík",
    "Stroke color – used for new lines and polygons": "Barva obrysu – pro nové čáry a mnohoúhelníky",
    "Swap fill and stroke": "Prohodit výplň a obrys",
    "Line width for new lines and polygons": "Šířka čáry pro nové čáry a mnohoúhelníky",
    "Paste #hex, rgb(), name…": "Vložte #hex, rgb(), název…",
    "Load colors from a .txt / .gpl / .css file": "Načíst barvy ze souboru .txt / .gpl / .css",
    "Add every color used in the drawing": "Přidat všechny barvy použité v kresbě",
    "Download the palette as a list of hex codes": "Stáhnout paletu jako seznam kódů hex",
    "0 = as many rows as fit": "0 = tolik řad, kolik se vejde",
    "Lay out tiles over the whole page and color them from the photo": "Rozložit dlaždice po celé stránce a vybarvit je podle fotky",
    "Color the tiles you have drawn": "Vybarvit dlaždice, které jste nakreslili",
    "Grout color": "Barva spár",
    "Give every line this color and width for real": "Opravdu dát všem čarám tuto barvu a šířku",
    "Save the selected shapes as a motif": "Uložit vybrané tvary jako motiv",
    "Load motifs from a file": "Načíst motivy ze souboru",
    "Download all motifs as a file": "Stáhnout všechny motivy jako soubor",
    "Give the selected painted areas random colors from the mix": "Dát vybraným vybarveným plochám náhodné barvy ze směsi",
    "Real-world unit: 1 drawing unit = 1 mm / cm / inch": "Skutečná jednotka: 1 jednotka kresby = 1 mm / cm / palec",
    "Add a page (front, back, a color variant…)": "Přidat stránku (přední strana, zadní strana, barevná varianta…)",
    "Export…": "Exportovat…",
    "Copy": "Kopírovat",
    "Paste": "Vložit",
    "You are looking at a shared image.": "Prohlížíte si sdílený obrázek.",
    "Back to my image": "Zpět k mému obrázku",
    "Place": "Umístit",
    "Paint": "Malování",
    "Outline": "Obrys",
    "From image": "Z obrázku",
    "Click a swatch = paint color · right-click = outline color · double-click = edit (also recolors the image). The ∅ swatch paints transparent. Palettes are shared with the vector app.": "Klik na vzorník = barva malování · pravý klik = barva obrysu · dvojklik = upravit (přebarví i obrázek). Vzorník ∅ maluje průhledně. Palety jsou společné s vektorovou aplikací.",
    "Brush": "Štětec",
    "Smooth edges for lines and polygons": "Hladké okraje čar a mnohoúhelníků",
    "The pencil always paints hard pixels in exact palette colors – best for pixel mosaics. Shift: straight lines in 15° steps.": "Tužka vždy kreslí ostré pixely v přesných barvách palety – nejlepší pro pixelové mozaiky. Shift: rovné čáry v krocích po 15°.",
    "Fill with the paint color": "Vyplnit barvou malování",
    "Outline in the outline color": "Obrys v barvě obrysu",
    "Drag from the center. Shift: 15° rotation steps.": "Táhněte ze středu. Shift: otáčení po 15°.",
    "Tolerance": "Tolerance",
    "Only connected pixels": "Jen souvislé pixely",
    "Fills the area of similar color under the click. Alt+click picks a color.": "Vyplní plochu podobné barvy pod kliknutím. Alt+klik vybere barvu.",
    "Cut": "Vyjmout",
    "Crop": "Oříznout",
    "Drag inside the selection to move it (Alt+drag moves a copy); two fingers on it scale and turn it. Enter places it, Esc cancels.": "Tažením uvnitř výběru ho posunete (Alt+tažení posune kopii); dvěma prsty na něm ho zvětšíte, zmenšíte a otočíte. Enter ho umístí, Esc zruší.",
    "Mosaic": "Mozaika",
    "Make a mosaic…": "Vytvořit mozaiku…",
    "Reduce to palette": "Převést na paletu",
    "Open as vector tiles…": "Otevřít jako vektorové dlaždice…",
    "Works on the selection, or on the whole image when nothing is selected.": "Pracuje s výběrem, nebo s celým obrázkem, když není nic vybráno.",
    "Image": "Obrázek",
    "Resize image": "Změnit velikost obrázku",
    "Canvas size": "Velikost plátna",
    "Pixel grid when zoomed in": "Mřížka pixelů při přiblížení",
    "Select, Brush, Pencil, Eraser, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan": "Výběr, Štětec, Tužka, Guma, Čára, Mnohoúhelník, Elipsa, Křivka, Kbelík, Kapátko, Posun",
    "Smaller / bigger brush": "Menší / větší štětec",
    "Swap paint and outline colors": "Prohodit barvu malování a obrysu",
    "Alt+click": "Alt+klik",
    "Pick a color": "Vybrat barvu",
    "Straight lines, 15° steps": "Rovné čáry, kroky po 15°",
    "Copy, cut, paste images (also between the two apps and other programs)": "Kopírovat, vyjmout, vložit obrázky (i mezi oběma aplikacemi a jinými programy)",
    "Select all, clear the selection": "Vybrat vše, vymazat výběr",
    "Place / cancel a moved or pasted image": "Umístit / zrušit posunutý nebo vložený obrázek",
    "Fit image, actual pixels": "Celý obrázek, skutečné pixely",
    "Real width": "Skutečná šířka",
    "Pieces are areas of one color (tiles). “Replace with” recolors every pixel of that color.": "Dílky jsou plochy jedné barvy (dlaždice). „Nahradit za“ přebarví všechny pixely té barvy.",
    "The image is packed into the link itself – nothing is uploaded. Whoever opens it sees the image and can make their own copy to edit.": "Obrázek je zabalený přímo v odkazu – nic se nikam nenahrává. Kdo ho otevře, uvidí obrázek a může si udělat vlastní kopii k úpravám.",
    "Make a mosaic": "Vytvořit mozaiku",
    "Splits the picture into tiles and gives each tile the color underneath it, with grout between the tiles.": "Rozdělí obrázek na dlaždice, každé dá barvu, která je pod ní, a mezi dlaždice dá spáry.",
    "Squares": "Čtverce",
    "Squares, offset rows": "Čtverce, posunuté řady",
    "Bricks": "Cihly",
    "Hexagons": "Šestiúhelníky",
    "Irregular (crazy paving)": "Nepravidelné (mozaika z úlomků)",
    "Grout": "Spáry",
    "Smaller tiles where the picture has detail": "Menší dlaždice tam, kde má obrázek detaily",
    "colors from the picture (new palette)": "barev z obrázku (nová paleta)",
    "Keep the picture’s colors": "Zachovat barvy obrázku",
    "Open as vector tiles": "Otevřít jako vektorové dlaždice",
    "Every piece of the picture (an area of one color) becomes a tile shape in the vector app, at the real size – ready for its print templates, laying plan, 3D print and editing. Your current vector drawing is kept in its History.": "Každý dílek obrázku (plocha jedné barvy) se stane tvarem dlaždice ve vektorové aplikaci, ve skutečné velikosti – připravený pro tiskové šablony, plán pokládky, 3D tisk i úpravy. Vaše aktuální vektorová kresba zůstane v její Historii.",
    "The grout color becomes the page background; every other piece becomes a tile.": "Barva spár se stane pozadím stránky; každý další dílek se stane dlaždicí.",
    "Open in the vector app": "Otevřít ve vektorové aplikaci",
    "Format": "Formát",
    "JPEG": "JPEG",
    "WebP": "WebP",
    "Quality": "Kvalita",
    "JPEG has no transparency: transparent parts become white.": "JPEG nemá průhlednost: průhledná místa budou bílá.",
    "Simple shows the essentials; Expert adds opacity, tolerance, resizing and more": "Jednoduchý ukazuje to podstatné; Expert přidává krytí, toleranci, změnu velikosti a další",
    "New image": "Nový obrázek",
    "Open an image (Ctrl+O) – you can also drop one on the canvas": "Otevřít obrázek (Ctrl+O) – můžete ho také přetáhnout na plátno",
    "Save as PNG (Ctrl+S)": "Uložit jako PNG (Ctrl+S)",
    "Export as JPEG or WebP": "Exportovat jako JPEG nebo WebP",
    "Colors used, pieces and a shopping list": "Použité barvy, dílky a nákupní seznam",
    "Earlier versions of your image": "Starší verze vašeho obrázku",
    "Share the image as a link": "Sdílet obrázek jako odkaz",
    "Copy the selection (or the whole image) to the clipboard (Ctrl+C)": "Zkopírovat výběr (nebo celý obrázek) do schránky (Ctrl+C)",
    "Paste an image from the clipboard (Ctrl+V)": "Vložit obrázek ze schránky (Ctrl+V)",
    "Fit image (0)": "Celý obrázek (0)",
    "Actual pixels (1)": "Skutečné pixely (1)",
    "Select – drag a rectangle, then drag it to move (V)": "Výběr – táhněte obdélník a tažením ho posuňte (V)",
    "Brush – soft edges (B)": "Štětec – měkké okraje (B)",
    "Pencil – hard pixels in exact colors (P)": "Tužka – ostré pixely v přesných barvách (P)",
    "Eraser (E)": "Guma (E)",
    "Paint bucket – fill an area (F)": "Kbelík – vyplnit plochu (F)",
    "Pick a color (I, or Alt+click with any paint tool)": "Kapátko (I, nebo Alt+klik s jakýmkoli nástrojem malování)",
    "Your saved palettes (shared with the vector app)": "Vaše uložené palety (společné s vektorovou aplikací)",
    "Paint color – brush, pencil, lines, polygons and the bucket": "Barva malování – štětec, tužka, čáry, mnohoúhelníky a kbelík",
    "Outline color – the outline of polygons": "Barva obrysu – obrys mnohoúhelníků",
    "Swap paint and outline colors (X)": "Prohodit barvu malování a obrysu (X)",
    "Brush, pencil, eraser and line size in pixels ( [ and ] )": "Velikost štětce, tužky, gumy a čáry v pixelech ( [ a ] )",
    "Add the colors used in the image (or suggest some for a photo)": "Přidat barvy použité v obrázku (nebo u fotky nějaké navrhnout)",
    "Turn the image (or the selection) into tiles with grout": "Převést obrázek (nebo výběr) na dlaždice se spárami",
    "Give every pixel the closest palette color": "Dát každému pixelu nejbližší barvu z palety",
    "Every tile becomes a shape in the vector app – for its templates, laying plan and editing": "Každá dlaždice se stane tvarem ve vektorové aplikaci – pro její šablony, plán pokládky a úpravy",
    "Scale the picture to this size": "Zmenšit / zvětšit obrázek na tuto velikost",
    "Change the canvas size, keeping the picture centered": "Změnit velikost plátna, obrázek zůstane uprostřed",
    "The width of the finished mosaic": "Šířka hotové mozaiky",
    "Herringbone": "Rybí kost",
    "Triangles": "Trojúhelníky",
    "Rings (around the click)": "Kruhy (kolem kliknutí)",
    "Rows following the outline": "Řady podél obrysu",
    "portrait": "na výšku",
    "landscape": "na šířku",
    "Vector": "Vektor",
    "Raster": "Rastr",
    "Fit": "Vše",
    "Thinnest part": "Nejtenčí část",
    "Raised parts narrower than this – or more than twice as tall as they are wide – are lowered to what is around them, so nothing prints as a thin tower": "Vyvýšená místa užší než tato hodnota – nebo víc než dvakrát vyšší, než jsou široká – se sníží na úroveň okolí, aby se nic netisklo jako tenká věžička",
    "Grout colors are always printed first, so the lines between the tiles stay low.": "Barvy spár se tisknou vždy jako první, takže čáry mezi dlaždicemi zůstanou nízko.",
    "Grout / lines: always printed first, so they stay low": "Spáry / čáry: tisknou se vždy jako první, takže zůstanou nízko",
    "grout": "spáry",
    "{n} thin {n|piece|pieces} lowered so nothing prints as a thin tower": "{n} {n|tenký dílek snížen|tenké dílky sníženy|tenkých dílků sníženo}, aby se nic netisklo jako tenká věžička",
    "Top view": "Shora",
    "Drag to turn · wheel or two fingers to zoom · double-click to reset": "Tažením otáčíte · kolečkem nebo dvěma prsty přibližujete · dvojklik vrátí pohled",
    "Shows the heights taller than they are, to see the color bands": "Zobrazí výšky větší, než jsou, aby byly vidět barevné vrstvy",
    "Heights ×": "Výšky ×",
    "This browser can’t show 3D (WebGL is off).": "Tento prohlížeč neumí zobrazit 3D (WebGL je vypnuté).",
    "One nozzle – colors by height": "Jedna tryska – barvy podle výšky",
    "Several filaments (AMS, MMU…) – flat": "Více filamentů (AMS, MMU…) – plochý",
    "A flat model with one part per color, for printers that switch filaments by themselves. The 3MF file already assigns filament 1, 2, … to the parts – load the filaments in the order listed below.": "Plochý model s jedním dílem pro každou barvu, pro tiskárny, které samy mění filamenty. Soubor 3MF už dílům přiřazuje filament 1, 2, … – založte filamenty v pořadí uvedeném níže.",
    "How thick the tiles are above the base": "Jak silné jsou dlaždice nad podložkou",
    "Tile layers": "Vrstvy dlaždic",
    "Grout colors end this many layers below the tiles, so the lines between them stay low. 0: all flat": "Barvy spár končí o tolik vrstev níž než dlaždice, takže čáry mezi nimi zůstanou nízko. 0: vše rovně",
    "Grout lower by": "Spáry níž o",
    "layers": "vrstvy",
    "Filaments:": "Filamenty:",
    "Grout colors come first and stay lower than the tiles. The base plate uses filament 1.": "Barvy spár jsou první a zůstávají níž než dlaždice. Podložka se tiskne filamentem 1.",
    "3MF for": "3MF pro",
    "The model, one part per color with its filament": "Model, jeden díl pro každou barvu s jejím filamentem",
    "One STL file per color, in a ZIP – load them as parts of one object": "Jeden soubor STL pro každou barvu, v ZIPu – načtěte je jako díly jednoho objektu",
    "{share} % · filament {k}": "{share} % · filament {k}",
    "{n} {n|color|colors} = {n} {n|filament|filaments} · flat, {h} mm high ({layers} {layers|layer|layers})": "{n} {n|barva|barvy|barev} = {n} {n|filament|filamenty|filamentů} · plochý, výška {h} mm ({layers} {layers|vrstva|vrstvy|vrstev})",
    "Base": "Podložka",
    "Mosaic Paint – multi-filament plan for {name}.3mf": "Mosaic Paint – plán více filamentů pro {name}.3mf",
    "Size {w} × {h} mm · layer height {lh} mm · base {base} {base|layer|layers} · tiles {tile} {tile|layer|layers} · grout {recess} {recess|layer|layers} lower": "Velikost {w} × {h} mm · výška vrstvy {lh} mm · podložka {base} {base|vrstva|vrstvy|vrstev} · dlaždice {tile} {tile|vrstva|vrstvy|vrstev} · spáry o {recess} {recess|vrstvu|vrstvy|vrstev} níž",
    "Total height {total} mm.": "Celková výška {total} mm.",
    "Filament {k}: {color} (also the base plate)": "Filament {k}: {color} (i podložka)",
    "Filament {k}: {color}": "Filament {k}: {color}",
    "{slicer}: open the 3MF – every color is a part of one object with its filament already assigned. Load the filaments in this order (AMS slots, MMU…).": "{slicer}: otevřete 3MF – každá barva je díl jednoho objektu a má už přiřazený filament. Založte filamenty v tomto pořadí (sloty AMS, MMU…).",
    "The 3MF is made for {slicer}: other slicers may read it as one part – then use the STL files.": "3MF je určený pro {slicer}: jiné slicery ho mohou načíst jako jeden díl – pak použijte soubory STL.",
    "STL: one file per color in a ZIP. Load them together as one object made of parts and give each its filament.": "STL: jeden soubor pro každou barvu v ZIPu. Načtěte je společně jako jeden objekt z dílů a každému přiřaďte jeho filament.",
    "Saved {name}.3mf for {slicer}: {n} {n|part|parts} with their filaments assigned.": "Uloženo {name}.3mf pro {slicer}: {n} {n|díl|díly|dílů} s přiřazenými filamenty.",
    "Saved {name}-stl.zip: {n} STL {n|file|files}, one per color. Load them as parts of one object.": "Uloženo {name}-stl.zip: {n} {n|soubor|soubory|souborů} STL, jeden pro každou barvu. Načtěte je jako díly jednoho objektu.",
    "Finishing: frame, corners, hanging hole, magnets": "Dokončení: rámeček, rohy, otvor na pověšení, magnety",
    "A border around the picture. With one nozzle it comes out in the top color, with several filaments in filament 1. 0: none": "Okraj kolem obrázku. S jednou tryskou vyjde v horní barvě, s více filamenty ve filamentu 1. 0: žádný",
    "Frame": "Rámeček",
    "How many layers the frame stands above the tiles": "O kolik vrstev rámeček přečnívá nad dlaždice",
    "raised by": "vyšší o",
    "Radius of the outline’s corners. 0: square": "Poloměr rohů obrysu. 0: ostré rohy",
    "Rounded corners": "Zaoblené rohy",
    "A hole to hang it by, at the top in the middle. 0: none": "Otvor na pověšení, nahoře uprostřed. 0: žádný",
    "Hanging hole": "Otvor na pověšení",
    "Four round pockets in the bottom, one near each corner, to glue magnets in: their diameter. 0: none": "Čtyři kruhové kapsy ve spodku, u každého rohu jedna, pro vlepení magnetů: jejich průměr. 0: žádné",
    "Magnets": "Magnety",
    "How deep the magnet pockets are (the magnet’s thickness)": "Jak hluboké jsou kapsy pro magnety (tloušťka magnetu)",
    "deep": "hloubka",
    "with the frame {w} × {h} mm, {z} mm high": "s rámečkem {w} × {h} mm, výška {z} mm",
    "The model is too thin for magnet pockets.": "Model je na kapsy pro magnety příliš tenký.",
    "The magnet pockets are only {d} mm deep – the model is thinner there.": "Kapsy pro magnety jsou hluboké jen {d} mm – model je tam tenčí.",
    "Frame {w} mm wide, up to layer {layer} (Z {z} mm), in filament 1.": "Rámeček široký {w} mm, až do vrstvy {layer} (Z {z} mm), filamentem 1.",
    "Frame {w} mm wide: it goes on in {color} up to layer {layer} (Z {z} mm).": "Rámeček široký {w} mm: pokračuje barvou {color} až do vrstvy {layer} (Z {z} mm).",
    "Magnet pockets in the bottom: 4 × {d} mm, {depth} mm deep – glue the magnets in after printing.": "Kapsy pro magnety ve spodku: 4 × {d} mm, hloubka {depth} mm – magnety vlepte po vytištění.",
    "Making the mosaic…": "Vytvářím mozaiku…",
    "Could not make the mosaic.": "Mozaiku se nepodařilo vytvořit.",
    "Tracing the tiles…": "Obkresluji dlaždice…",
    "Could not trace the tiles.": "Dlaždice se nepodařilo obkreslit.",
    "Working out the model…": "Počítám model…",
    "Working out the model… {p} %": "Počítám model… {p} %",
    "Could not build the 3D model.": "3D model se nepodařilo vytvořit.",
    "Building the 3D model…": "Vytvářím 3D model…",
    "Building the 3D model… {p} %": "Vytvářím 3D model… {p} %",
    "Coaster": "Podtácek",
    "HOME": "DOMOV",
    "Sign": "Cedulka",
    "100 × 100 mm, square tiles in rings of color – try 3D… with rounded corners.": "100 × 100 mm, čtvercové dlaždice v barevných prstencích – zkuste 3D… se zaoblenými rohy.",
    "coaster": "podtacek",
    "A word in tiles with a border – try Report for a shopping list.": "Slovo z dlaždic s okrajem – v Přehledu najdete nákupní seznam.",
    "sign": "cedulka",
    "Welcome to Mosaic Paint": "Vítejte v Mosaic Paint",
    "Design a mosaic: draw lines or lay a tile pattern, then paint the tiles. Everything is measured in real millimetres.": "Navrhněte mozaiku: nakreslete čáry nebo položte vzor dlaždic a pak dlaždice vybarvěte. Vše se měří ve skutečných milimetrech.",
    "Draw": "Kreslení",
    "The tools are on the left: lines and shapes, the tile pattern, and the paint bucket that fills a tile with one click.": "Nástroje jsou vlevo: čáry a tvary, vzor dlaždic a kbelík, který jedním kliknutím vybarví dlaždici.",
    "Pick a color in the palette, then click tiles with the bucket. Palettes are shared with the raster app.": "Vyberte barvu v paletě a klikejte kbelíkem na dlaždice. Palety jsou společné s rastrovou aplikací.",
    "When it is done": "Až bude hotovo",
    "Report gives a shopping list, 3D… a model to print, Share a link. Expert mode adds printing at real size and laying plans.": "Přehled dá nákupní seznam, 3D… model k tisku, Sdílet odkaz. Režim Expert přidá tisk ve skutečné velikosti a plány kladení.",
    "Start from an example": "Začněte od příkladu",
    "Not sure where to begin? Open an example. The ? button shows this guide again.": "Nevíte, kde začít? Otevřete příklad. Tlačítko ? ukáže tohoto průvodce znovu.",
    "Pixel heart": "Pixelové srdce",
    "16 × 16 pixel art – every pixel a tile. Try 3D… or Print.": "Pixel art 16 × 16 – každý pixel je dlaždice. Zkuste 3D… nebo Tisk.",
    "heart": "srdce",
    "Heart": "Srdce",
    "Sunset mosaic": "Mozaika se západem slunce",
    "A picture made into tiles with grout by “Make a mosaic…”. Try Open as vector tiles.": "Obrázek proměněný v dlaždice se spárami pomocí „Vytvořit mozaiku…“. Zkuste Otevřít jako vektorové dlaždice.",
    "sunset": "zapad-slunce",
    "Sunset": "Západ slunce",
    "Welcome to Mosaic Paint Raster": "Vítejte v Mosaic Paint Raster",
    "Paint with pixels: pixel art, or a photo turned into a mosaic. Each pixel can become a tile.": "Malujte pixely: pixel art nebo fotku proměněnou v mozaiku. Každý pixel se může stát dlaždicí.",
    "The tools are on the left: pencil, brush, bucket, lines, shapes and selection.": "Nástroje jsou vlevo: tužka, štětec, kbelík, čáry, tvary a výběr.",
    "Pick a color in the palette. Palettes are shared with the vector app.": "Vyberte barvu v paletě. Palety jsou společné s vektorovou aplikací.",
    "Open a photo, then “Make a mosaic…” turns it into tiles with grout in your palette’s colors.": "Otevřete fotku a „Vytvořit mozaiku…“ z ní udělá dlaždice se spárami v barvách vaší palety.",
    "Examples": "Příklady",
    "Open an example to see how it is made, or to start from it. Your current work is kept in History.": "Otevřete příklad a podívejte se, jak je udělaný, nebo z něj vyjděte. Vaše současná práce zůstane v Historii.",
    "Back": "Zpět",
    "{k} of {n}": "{k} z {n}",
    "Next": "Další",
    "Examples…": "Příklady…",
    "Example projects to open": "Ukázkové projekty k otevření",
    "A short guide to the app": "Krátký průvodce aplikací",
    "Guide": "Průvodce",
    "Working… {p} %": "Pracuji… {p} %",
    "Your photo": "Vaše fotka",
    "Load a photo and turn it into tiles – smaller where it has detail.": "Načtěte fotku a proměňte ji v dlaždice – menší tam, kde má detaily.",
    "Read the G-code your slicer made and check it against this plan: filament changes, filaments and heights": "Načte G-code ze sliceru a porovná ho s tímto plánem: výměny filamentu, filamenty a výšky",
    "Check G-code…": "Zkontrolovat G-code…",
    "Change to {color} at Z {z} mm": "Výměna na {color} v Z {z} mm",
    "No filament change to {color} at Z {z} mm": "Chybí výměna filamentu na {color} v Z {z} mm",
    "A filament change the plan does not have, at Z {z} mm": "Výměna filamentu, kterou plán nemá, v Z {z} mm",
    "The top is at {z} mm, as planned": "Vršek je ve výšce {z} mm, podle plánu",
    "The top is at {found} mm instead of {z} mm": "Vršek je ve výšce {found} mm místo {z} mm",
    "Filament {k} ({color}) is not used – assign it to the part “{k} {color}”": "Filament {k} ({color}) se nepoužívá – přiřaďte ho dílu „{k} {color}“",
    "Filament {k} ({color}) prints up to {z} mm": "Filament {k} ({color}) tiskne do výšky {z} mm",
    "Filament {k} ({color}) prints up to {found} mm instead of {z} mm": "Filament {k} ({color}) tiskne do výšky {found} mm místo {z} mm",
    "No printing found in {name} – is it a G-code file?": "V {name} není žádný tisk – je to soubor G-code?",
    "{name}: {n} {n|thing|things} to look at": "{name}: {n} {n|věc|věci|věcí} ke kontrole",
    "{name}: everything matches the plan": "{name}: vše odpovídá plánu",
    "Reading the G-code…": "Čtu G-code…",
    "Reading the G-code… {p} %": "Čtu G-code… {p} %",
    "Could not read {name}.": "{name} se nepodařilo přečíst.",
    "{name} is {w} × {h} px – painting on it and making mosaics will be slow. Scale it down to {W} × {H} px?": "{name} má {w} × {h} px – malování a mozaiky na něm budou pomalé. Zmenšit ho na {W} × {H} px?",
    "It has many colors: “Reduce to palette” or “Make a mosaic…” turn them into a few you can buy tiles in.": "Má mnoho barev: „Převést na paletu“ nebo „Vytvořit mozaiku…“ z nich udělá pár barev, ve kterých dlaždice koupíte.",
    "{n} {n|color|colors}": "{n} {n|barva|barvy|barev}",
    "Unpin – it may be cleared with old versions": "Odepnout – může být smazána se starými verzemi",
    "Pin – kept when old versions are cleared": "Připnout – zůstane, i když se staré verze mažou",
    "Name this version": "Pojmenovat tuto verzi",
    "Name of this version:": "Název této verze:",
    "Share link": "Odkaz ke sdílení",
    "What’s new": "Co je nového",
    "Version {v} – what’s new": "Verze {v} – co je nového",
    "Updated to version {v} – click v{v} in the corner to see what’s new.": "Aktualizováno na verzi {v} – co je nového, uvidíte po kliknutí na v{v} v rohu.",
    "The raster app: paint with pixels, turn photos into mosaics, and copy pictures between both apps.": "Rastrová aplikace: malování pixely, fotky proměněné v mozaiky a kopírování obrázků mezi oběma aplikacemi.",
    "3D print: a 3D preview, models for multi-filament printers (AMS, MMU), a frame, rounded corners, a hanging hole and magnet pockets – and a check of the sliced G-code against the plan.": "3D tisk: 3D náhled, modely pro tiskárny s více filamenty (AMS, MMU), rámeček, zaoblené rohy, otvor na pověšení a kapsy na magnety – a kontrola G-codu ze sliceru podle plánu.",
    "Examples to start from, and a short guide for newcomers.": "Příklady, od kterých můžete začít, a krátký průvodce pro nováčky.",
    "German, Slovak and Polish.": "Němčina, slovenština a polština.",
    "Heavy work – mosaics, tracing, 3D models – no longer holds up the page.": "Náročná práce – mozaiky, obkreslování, 3D modely – už stránku nezdržuje.",
    "History: name and pin versions; see their size and colors.": "Historie: verze můžete pojmenovat a připnout; vidíte jejich velikost a barvy.",
    "Big images can be scaled down when opened.": "Velké obrázky lze při otevření zmenšit.",
    "Better keyboard and screen-reader support.": "Lepší podpora klávesnice a čteček obrazovky.",
    "The vector editor: lines, tile patterns, the paint bucket, palettes, reports, printing at real size and sharing as a link.": "Vektorový editor: čáry, vzory dlaždic, kbelík, palety, přehledy, tisk ve skutečné velikosti a sdílení odkazem.",
    "Could not sign in to Discord.": "Přihlášení k Discordu se nezdařilo.",
    "Post to the channel": "Poslat do kanálu",
    "Post the picture in this channel, as a reply to the message it came from": "Poslat obrázek do tohoto kanálu jako odpověď na zprávu, ze které pochází",
    "That image is no longer available in Discord.": "Ten obrázek už na Discordu není k dispozici.",
    "Right-click an image in the chat › Apps › Edit image to edit it here – or open or paste one.": "Klikněte pravým tlačítkem na obrázek v chatu › Aplikace › Edit image a upravte ho tady – nebo nějaký otevřete či vložte.",
    "Posted to the channel.": "Posláno do kanálu.",
    "The picture is too big for Discord – make it smaller (Image › Resize image).": "Obrázek je pro Discord příliš velký – zmenšete ho (Obrázek › Změnit velikost obrázku).",
    "Could not reach the server.": "Server není dostupný.",
    "Could not connect to Discord.": "Spojení s Discordem se nezdařilo.",
    "Open the editor with “Edit image” (or the app’s launch button) in this chat to post here – or use Copy and paste the picture.": "Otevřete editor přes „Edit image“ (nebo tlačítko aplikace pro spuštění) v tomto chatu, abyste sem mohli poslat obrázek – nebo použijte Kopírovat a obrázek vložte.",
    "More than 15 minutes have passed, and Discord no longer lets the app post. Use Copy and paste the picture into the chat.": "Uplynulo víc než 15 minut a Discord už aplikaci poslat obrázek nedovolí. Použijte Kopírovat a obrázek vložte do chatu.",
    "Discord did not take the picture. Use Copy and paste it into the chat.": "Discord obrázek nepřijal. Použijte Kopírovat a vložte ho do chatu.",
    "Select the part to keep with the Select tool (V), then crop.": "Nástrojem Výběr (V) vyberte část, kterou chcete ponechat, a pak ořízněte.",
    "The image is all one color – nothing to trim.": "Obrázek je celý jedné barvy – není co ořezávat.",
    "There is no border to trim.": "Není tu žádný okraj k oříznutí.",
    "Trimmed to {w} × {h} px.": "Oříznuto na {w} × {h} px.",
    "Pen pressure changes the size": "Přítlak pera mění velikost",
    "Tip": "Hrot",
    "Round": "Kulatý",
    "Soft (airbrush)": "Měkký (airbrush)",
    "Spray": "Sprej",
    "Calligraphy": "Kaligrafie",
    "Chalk": "Křída",
    "The shape of the brush and eraser": "Tvar štětce a gumy",
    "The angle of the calligraphy nib – 45° for right-handed writing, about 135° for left-handed": "Úhel kaligrafického hrotu – 45° pro praváky, asi 135° pro leváky",
    "curve through points": "křivka přes body",
    "B-spline": "B-spline",
    "cubic Bézier": "kubická Bézierova křivka",
    "quadratic Bézier": "kvadratická Bézierova křivka",
    "ellipse": "elipsa",
    "Drag from corner to corner (or from the center) · Shift: a circle · Alt: no snap": "Táhněte z rohu do rohu (nebo ze středu) · Shift: kruh · Alt: bez přichytávání",
    "Click the curve’s points · click the first point to close it · double-click or Enter ends it open · Backspace removes the last point · Esc cancels": "Klikejte na body křivky · kliknutím na první bod ji uzavřete · dvojklik nebo Enter ji ukončí otevřenou · Backspace odebere poslední bod · Esc zruší",
    "Turn on “Fill” or “Outline” for shapes.": "U tvarů zapněte „Výplň“ nebo „Obrys“.",
    "Drag from corner to corner (or from the center) · Shift: a circle": "Táhněte z rohu do rohu (nebo ze středu) · Shift: kruh",
    "The curve runs smoothly through every point you click.": "Křivka vede plynule přes každý bod, na který kliknete.",
    "The curve is pulled towards each point but only touches the first and the last – very smooth, good for flowing lines.": "Křivku každý bod přitahuje, ale dotkne se jen prvního a posledního – velmi hladká, vhodná pro plynulé linie.",
    "Click a point, two control points, the next point, two control points … The curve passes through every third point; the control points (round) pull it.": "Klikněte na bod, dva řídicí body, další bod, dva řídicí body … Křivka prochází každým třetím bodem; řídicí body (kulaté) ji přitahují.",
    "Click a point, a control point, the next point, a control point … The curve passes through every other point; the control points (round) pull it.": "Klikněte na bod, řídicí bod, další bod, řídicí bod … Křivka prochází každým druhým bodem; řídicí body (kulaté) ji přitahují.",
    "Ellipse": "Elipsa",
    "From corner": "Z rohu",
    "Shift: a circle. Select it to drag its axis ends.": "Shift: kruh. Po výběru můžete táhnout konce jejích os.",
    "Curve": "Křivka",
    "Type": "Typ",
    "Smooth, through the points": "Hladká, přes body",
    "Smooth, near the points (B-spline)": "Hladká, u bodů (B-spline)",
    "Bézier, cubic": "Bézierova, kubická",
    "Bézier, quadratic": "Bézierova, kvadratická",
    "Ellipse – Shift: circle (O)": "Elipsa – Shift: kruh (O)",
    "Curve – click its points (C)": "Křivka – klikejte na její body (C)",
    "Shift: a circle.": "Shift: kruh.",
    "An open curve is a line in the paint color, as thick as the size; a closed one is filled and outlined like the shapes.": "Otevřená křivka je čára v barvě malování o zvolené velikosti; uzavřená se vyplní a obtáhne jako tvary.",
    "Ellipses and curves in both apps: the Ellipse tool (O, Shift for a circle) and the Curve tool (C) – smooth through the points, smooth near them (B-spline), or cubic and quadratic Bézier.": "Elipsy a křivky v obou aplikacích: nástroj Elipsa (O, se Shiftem kruh) a nástroj Křivka (C) – hladká přes body, hladká u bodů (B-spline), nebo kubická a kvadratická Bézierova.",
    "In the vector app, ellipses and curves stay exact curves: drag their points or axis ends to change them, and paint, cut and mirror them like any tile.": "Ve vektorové aplikaci zůstávají elipsy a křivky přesnými křivkami: tažením bodů nebo konců os je měníte a vybarvujete, řežete a zrcadlíte je jako každou dlaždici.",
    "Shift+B": "Shift+B",
    "Next brush tip": "Další hrot štětce",
    "Brush tip: {tip}": "Hrot štětce: {tip}",
    "Brush tips for the brush and the eraser: soft (airbrush), spray, calligraphy and chalk. Shift+B switches between them.": "Hroty pro štětec a gumu: měkký (airbrush), sprej, kaligrafie a křída. Shift+B mezi nimi přepíná.",
    "The spray keeps spraying while you hold it still, like an airbrush; the calligraphy nib’s angle can be set (also for left-handed writing).": "Sprej stříká dál, i když ho držíte na místě, jako airbrush; úhel kaligrafického hrotu lze nastavit (i pro leváky).",
    "Keep proportions": "Zachovat poměr stran",
    "Flip ↔": "Převrátit ↔",
    "Flip ↕": "Převrátit ↕",
    "Rotate by": "Otočit o",
    "Rotate": "Otočit",
    "Crop to selection": "Oříznout na výběr",
    "Trim edges": "Oříznout okraje",
    "With a graphics tablet or stylus, the brush, pencil and eraser paint thinner the lighter you press": "S grafickým tabletem nebo perem kreslí štětec, tužka a guma tím tenčeji, čím lehčeji přitlačíte",
    "Rotate 90° to the left": "Otočit o 90° doleva",
    "Rotate 90° to the right": "Otočit o 90° doprava",
    "Flip left ↔ right": "Převrátit zleva doprava",
    "Flip upside down": "Převrátit vzhůru nohama",
    "Rotate by any angle (clockwise; negative: to the left) – the canvas grows to hold the picture": "Otočit o libovolný úhel (po směru hodin; záporný: doleva) – plátno se zvětší, aby se obrázek vešel",
    "Keep only the selection (select it with the Select tool first)": "Ponechat jen výběr (nejdřív ho vyberte nástrojem Výběr)",
    "Cut off the empty or one-color border around the picture": "Odříznout prázdný nebo jednobarevný okraj kolem obrázku",
    "Edit images from a Discord chat: right-click › Apps › Edit image, draw on it, post it back – in the raster or the vector app.": "Úpravy obrázků z chatu na Discordu: pravé tlačítko › Aplikace › Edit image, kreslete do něj a pošlete ho zpět – v rastrové i vektorové aplikaci.",
    "Pen pressure: with a graphics tablet or stylus, the brush, pencil and eraser paint thinner the lighter you press.": "Přítlak pera: s grafickým tabletem nebo perem kreslí štětec, tužka a guma tím tenčeji, čím lehčeji přitlačíte.",
    "Image editing in the raster app: rotate (by 90° or any angle), flip, crop to the selection, trim the border, resize keeping proportions.": "Úpravy obrázku v rastrové aplikaci: otočení (o 90° nebo o libovolný úhel), převrácení, oříznutí na výběr, oříznutí okrajů a změna velikosti se zachováním poměru stran.",
    "Choose a color": "Vyberte barvu",
    "Saturation and brightness": "Sytost a jas",
    "Hue": "Odstín",
    "Before": "Předtím",
    "Color code": "Kód barvy",
    "Also add it to the palette": "Přidat ji i do palety",
    "Use this color": "Použít tuto barvu",
    "Choose…": "Vybrat…",
    "Choose any color: a color area, a hue slider and a color code": "Vyberte libovolnou barvu: barevná plocha, posuvník odstínu a kód barvy",
    "Fill color – used by the paint bucket. Click to choose any color": "Barva výplně – používá ji kyblík. Kliknutím vyberete libovolnou barvu",
    "Stroke color – used for new lines and polygons. Click to choose any color": "Barva čáry – pro nové čáry a mnohoúhelníky. Kliknutím vyberete libovolnou barvu",
    "Paint color – brush, pencil, lines, polygons and the bucket. Click to choose any color": "Barva malby – štětec, tužka, čáry, mnohoúhelníky a kyblík. Kliknutím vyberete libovolnou barvu",
    "Outline color – the outline of polygons. Click to choose any color": "Barva obrysu – obrys mnohoúhelníků. Kliknutím vyberete libovolnou barvu",
    "Choose any color: a color area, a hue slider and a color code (Choose… under the palette, or click the current colors).": "Vyberte libovolnou barvu: barevná plocha, posuvník odstínu a kód barvy (Vybrat… pod paletou, nebo klikněte na aktuální barvy).",
    "Inside Discord: New, Save as, renaming and the other questions work (they are asked in the page now), and switching between the apps keeps the Post button.": "V Discordu: Nový, Uložit jako, přejmenování a další otázky fungují (ptají se teď přímo na stránce) a přepínání mezi aplikacemi zachová tlačítko pro odeslání.",
    "On phones inside Discord, the top bar stays clear of Discord’s own controls.": "Na telefonech v Discordu horní lišta nezasahuje pod ovládací prvky Discordu.",
    "Quick menu": "Rychlá nabídka",
    "Undo": "Zpět",
    "Redo": "Znovu",
    "Fit to the screen": "Přizpůsobit obrazovce",
    "Which color": "Která barva",
    "Choose any color": "Vybrat libovolnou barvu",
    "The palette is empty – use + to choose a color.": "Paleta je prázdná – barvu vyberete tlačítkem +.",
    "Tip: double-tap the drawing for a quick menu – tools, colors and size.": "Tip: dvojitým klepnutím na kresbu otevřete rychlou nabídku – nástroje, barvy a velikost.",
    "Quick menu on phones and tablets: double-tap the drawing with a finger for undo, the main tools, colors and size – right where you draw.": "Rychlá nabídka na telefonech a tabletech: dvojitým klepnutím prstem na kresbu máte po ruce zpět, hlavní nástroje, barvy a velikost – přímo tam, kde kreslíte.",
    "Tap or click where to copy from.": "Klepněte nebo klikněte tam, odkud kopírovat.",
    "Tap the image where to copy from": "Klepněte do obrázku tam, odkud kopírovat",
    "Copying from {x}, {y}": "Kopíruje se z {x}, {y}",
    "No source yet: the first tap sets it": "Zdroj zatím není: nastaví ho první klepnutí",
    "Source set – now paint where the copy goes.": "Zdroj nastaven – teď malujte tam, kam patří kopie.",
    "Clone": "Klonování",
    "Set source": "Nastavit zdroj",
    "Aligned – the source follows the brush": "Zarovnaně – zdroj se posouvá se štětcem",
    "Set where to copy from, then paint where the copy should go. Drag the source disc to move it. Size, tip and opacity are the brush's.": "Nastavte, odkud kopírovat, a pak malujte tam, kam má kopie přijít. Kotouček zdroje přesunete tažením. Velikost, hrot a krytí jsou jako u štětce.",
    "Clone – paint with a copy of another part of the image · Alt+click or the first tap sets where to copy from (S)": "Klonování – malujte kopií jiné části obrázku · Alt+klik nebo první klepnutí nastaví, odkud kopírovat (S)",
    "The next tap or click sets where to copy from (or Alt+click)": "Další klepnutí nebo kliknutí nastaví, odkud kopírovat (nebo Alt+klik)",
    "On: the source moves along with the brush from stroke to stroke. Off: every stroke starts copying from the source": "Zapnuto: zdroj se posouvá se štětcem od tahu k tahu. Vypnuto: každý tah začne kopírovat ze zdroje",
    "Clone tool in the raster app (S): paint with a copy of another part of the image. Tap (or Alt+click) where to copy from, paint the copy, drag the source disc with a finger to move it; aligned or not, with the brush’s size, tip, opacity and pen pressure.": "Nástroj Klonování v rastrové aplikaci (S): malujte kopií jiné části obrázku. Klepněte (nebo Alt+klik) tam, odkud kopírovat, namalujte kopii, kotouček zdroje posunete prstem; zarovnaně i ne, s velikostí, hrotem, krytím a přítlakem pera jako u štětce.",
    "Adjust colors": "Úprava barev",
    "Stretch the picture’s tones to the full range": "Roztáhnout tóny obrázku na celý rozsah",
    "Auto": "Automaticky",
    "Reset": "Vrátit",
    "Hold to see the picture as it was": "Podržte pro zobrazení původního obrázku",
    "Colors adjusted.": "Barvy upraveny.",
    "Heal": "Retuš",
    "Adjust colors…": "Upravit barvy…",
    "Select, Brush, Pencil, Eraser, Clone, Heal, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan": "Výběr, Štětec, Tužka, Guma, Klonování, Retuš, Čára, Mnohoúhelník, Elipsa, Křivka, Kyblík, Kapátko, Posun",
    "Heal – like Clone, but the copy takes the color and light of the place you paint: for blemishes, spots and scratches (J)": "Retuš – jako Klonování, ale kopie převezme barvu a světlo místa, kam malujete: na skvrny, tečky a škrábance (J)",
    "Brightness, contrast, saturation, levels, sharpening and noise smoothing – for the selection or the whole image": "Jas, kontrast, sytost, úrovně, doostření a vyhlazení šumu – pro výběr nebo celý obrázek",
    "Photo fixes in the raster app: Adjust colors… – brightness, contrast, saturation, levels with Auto, sharpening and noise smoothing, previewed live (hold Before to compare).": "Úpravy fotek v rastrové aplikaci: Upravit barvy… – jas, kontrast, sytost, úrovně s tlačítkem Automaticky, doostření a vyhlazení šumu, s živým náhledem (podržením Předtím porovnáte).",
    "Heal brush (J): paints over blemishes, spots and scratches with texture from elsewhere, in the color and light of the spot.": "Retušovací štětec (J): přemaluje skvrny, tečky a škrábance texturou odjinud, v barvě a světle daného místa.",
    "Filling from the surroundings…": "Vyplňuje se z okolí…",
    "Removed.": "Odstraněno.",
    "Could not fill it: {why}": "Nepodařilo se vyplnit: {why}",
    "Select what to remove first.": "Nejdřív vyberte, co odstranit.",
    "Select": "Výběr",
    "Rectangle": "Obdélník",
    "Lasso": "Laso",
    "Magnetic": "Magnetické",
    "Wand": "Hůlka",
    "Add": "Přidat",
    "Subtract": "Ubrat",
    "Drag inside the selection to move it. Copy, Clear, Fill from surroundings and Adjust colors follow its shape.": "Tažením uvnitř výběru ho přesunete. Kopírovat, Vymazat, Vyplnit z okolí a Upravit barvy respektují jeho tvar.",
    "Paint over what should disappear; when you lift, it is filled from the picture around it. Works best on backgrounds – grass, sky, walls, skin.": "Přemalujte, co má zmizet; po zvednutí se to vyplní z okolního obrázku. Nejlépe funguje na pozadí – tráva, nebe, zdi, kůže.",
    "Fill with": "Vyplnit pomocí",
    "Surroundings (built in)": "Okolí (vestavěné)",
    "AI (add-on)": "AI (doplněk)",
    "Fill from surroundings": "Vyplnit z okolí",
    "Select, Brush, Pencil, Eraser, Clone, Heal, Remove, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan": "Výběr, Štětec, Tužka, Guma, Klonování, Retuš, Odstranit, Čára, Mnohoúhelník, Elipsa, Křivka, Kyblík, Kapátko, Posun",
    "Shift / Alt + select": "Shift / Alt + výběr",
    "Add to / take away from the selection": "Přidat k výběru / ubrat z výběru",
    "Remove – paint over something to make it disappear: it is filled from the picture around it (R)": "Odstranit – přemalujte něco, aby to zmizelo: vyplní se to z okolního obrázku (R)",
    "Shape": "Tvar",
    "A rectangle: drag across": "Obdélník: táhněte přes",
    "Freehand: draw around it": "Od ruky: obkreslete to",
    "Draw roughly along an edge – the line snaps to it": "Kreslete zhruba podél hrany – čára se k ní přichytí",
    "Tap a color: everything similar next to it (or anywhere)": "Klepněte na barvu: vše podobné vedle ní (nebo kdekoli)",
    "New selection": "Nový výběr",
    "Replace the selection": "Nahradit výběr",
    "Add to the selection (or hold Shift)": "Přidat k výběru (nebo držte Shift)",
    "Take away from the selection (or hold Alt)": "Ubrat z výběru (nebo držte Alt)",
    "The selected part disappears: filled from the picture around it": "Vybraná část zmizí: vyplní se z okolního obrázku",
    "Shaped selections: Lasso, Magnetic (snaps to edges) and Wand (by color), with New / Add / Subtract (or Shift / Alt) – copy, clear, move and Adjust colors follow the shape.": "Výběry libovolného tvaru: Laso, Magnetické (přichytí se k hranám) a Hůlka (podle barvy), s Nový / Přidat / Ubrat (nebo Shift / Alt) – kopírování, mazání, přesun i Upravit barvy respektují tvar.",
    "Removing things: the Remove brush (R) and Fill from surroundings for a selection fill the spot with the picture around it – content-aware, on the device.": "Odstraňování: štětec Odstranit (R) a Vyplnit z okolí pro výběr vyplní místo okolním obrázkem – s ohledem na obsah, přímo v zařízení.",
    "Text": "Text",
    "Type here": "Pište sem",
    "Font": "Písmo",
    "List the fonts installed on this computer (the browser asks first)": "Zobrazit písma nainstalovaná v tomto počítači (prohlížeč se nejdřív zeptá)",
    "More fonts…": "Další písma…",
    "Style": "Řez",
    "Bold": "Tučně",
    "Italic": "Kurzíva",
    "Alignment": "Zarovnání",
    "Left": "Vlevo",
    "Center": "Na střed",
    "Right": "Vpravo",
    "Shadow": "Stín",
    "The text is in the paint color, its outline in the outline color. Drag it into place, then press Enter or tap outside it.": "Text má barvu malby, obrys barvu obrysu. Přetáhněte ho na místo a pak stiskněte Enter nebo klepněte mimo něj.",
    "{n} fonts listed.": "Zobrazeno písem: {n}.",
    "The browser did not list the fonts.": "Prohlížeč písma nezobrazil.",
    "Drag the text into place, then press Enter or tap outside it.": "Přetáhněte text na místo a pak stiskněte Enter nebo klepněte mimo něj.",
    "Tap where to copy from (or Alt+click), then paint the copy · drag the source disc to move it": "Klepněte, odkud kopírovat (nebo Alt+klik), pak malujte kopii · kotouček zdroje posunete tažením",
    "Tap where to copy from (or Alt+click), then paint over the spot – it blends in when you lift": "Klepněte, odkud kopírovat (nebo Alt+klik), pak přemalujte místo – po zvednutí splyne",
    "Paint over what should disappear – it is filled from the surroundings when you lift": "Přemalujte, co má zmizet – po zvednutí se vyplní z okolí",
    "Tap to add text · drag it into place · tap it to edit · Enter places it": "Klepnutím přidáte text · přetáhněte ho na místo · klepnutím ho upravíte · Enter ho umístí",
    "Select, Brush, Pencil, Eraser, Clone, Heal, Remove, Text, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan": "Výběr, Štětec, Tužka, Guma, Klonování, Retuš, Odstranit, Text, Čára, Mnohoúhelník, Elipsa, Křivka, Kyblík, Kapátko, Posun",
    "Text – tap to type; fonts, outline, shadow and curved text (T)": "Text – klepněte a pište; písma, obrys, stín a zakřivený text (T)",
    "Text tool in the raster app (T): any font (also the installed ones, where the browser lists them), size, bold, italic, alignment, outline, shadow and curved text. It floats until placed – drag it, tap it to edit.": "Nástroj Text v rastrové aplikaci (T): libovolné písmo (i nainstalovaná, kde je prohlížeč umí zobrazit), velikost, tučné, kurzíva, zarovnání, obrys, stín a zakřivený text. Do umístění plave nad obrázkem – přetáhněte ho, klepnutím upravíte.",
    "The AI could not start in this browser.": "AI se v tomto prohlížeči nepodařilo spustit.",
    "Starting the AI…": "Spouští se AI…",
    "The AI could not do it: {why}": "AI to nezvládla: {why}",
    "Looking at the picture…": "Prohlíží se obrázek…",
    "Nothing found there – tap the middle of the object.": "Nic se tam nenašlo – klepněte doprostřed objektu.",
    "the AI add-on is not downloaded": "doplněk AI není stažený",
    "Remove background": "Odstranit pozadí",
    "What is in the picture?": "Co je na obrázku?",
    "People (portraits)": "Lidé (portréty)",
    "Any subject (objects, animals, products)": "Cokoli (předměty, zvířata, výrobky)",
    "Each needs a one-time download – the size is shown before anything is downloaded. Everything runs on this device.": "Každé potřebuje jednorázové stažení – velikost uvidíte dřív, než se cokoli stáhne. Vše běží v tomto zařízení.",
    "Select the subject": "Vybrat hlavní objekt",
    "Finding the subject…": "Hledá se hlavní objekt…",
    "The subject is selected.": "Hlavní objekt je vybraný.",
    "Background removed.": "Pozadí odstraněno.",
    "Could not load the text recognition.": "Rozpoznávání textu se nepodařilo načíst.",
    "Reading the text…": "Čte se text…",
    "Text in the picture": "Text na obrázku",
    "You can correct it here before copying.": "Před zkopírováním ho tu můžete opravit.",
    "Copied.": "Zkopírováno.",
    "Select the text and copy it (Ctrl+C).": "Označte text a zkopírujte ho (Ctrl+C).",
    "No text found.": "Žádný text se nenašel.",
    "3D relief": "3D reliéf",
    "A 3D-printable relief of the picture (STL): from its brightness, or from the depth an AI sees in a photo.": "Reliéf obrázku pro 3D tisk (STL): podle jasu, nebo podle hloubky, kterou ve fotce vidí AI.",
    "Brightness – light is high": "Jas – světlé je vysoko",
    "Brightness – dark is high (a lithophane: hold it against light)": "Jas – tmavé je vysoko (litofanie: podržte ji proti světlu)",
    "Depth (AI add-on) – near is high": "Hloubka (doplněk AI) – blízké je vysoko",
    "Relief": "Reliéf",
    "Low": "Nízké",
    "Medium": "Střední",
    "High": "Vysoké",
    "Smoothing": "Vyhlazení",
    "Height map: white is high": "Výšková mapa: bílá je vysoko",
    "Save STL": "Uložit STL",
    "Working out the depth…": "Zjišťuje se hloubka…",
    "{w} × {h} mm, {z} mm high": "{w} × {h} mm, výška {z} mm",
    "Saved relief.stl.": "Uloženo relief.stl.",
    "Select object (AI)": "Výběr objektu (AI)",
    "Tap an object to select it.": "Klepnutím na objekt ho vyberete.",
    "Object removal (AI)": "Odstraňování objektů (AI)",
    "Remove fills the spot with a trained model – better on objects and structure than the built-in fill.": "Odstranit vyplní místo natrénovaným modelem – lépe než vestavěné vyplnění u objektů a struktur.",
    "Background removal – people": "Odstranění pozadí – lidé",
    "Removes the background behind people (portraits).": "Odstraní pozadí za lidmi (portréty).",
    "Background removal – any subject": "Odstranění pozadí – cokoli",
    "Removes the background behind the main subject: objects, animals, products.": "Odstraní pozadí za hlavním objektem: předměty, zvířata, výrobky.",
    "Read text (OCR)": "Čtení textu (OCR)",
    "Recognizes text in the image, to copy it.": "Rozpozná text v obrázku, abyste ho mohli zkopírovat.",
    "Depth for 3D relief (AI)": "Hloubka pro 3D reliéf (AI)",
    "Estimates the depth of a photo for a 3D-printable relief.": "Odhadne hloubku fotky pro reliéf k 3D tisku.",
    "Download failed ({status}).": "Stahování selhalo ({status}).",
    "This needs a one-time download of {size}.": "Potřebuje to jednorázově stáhnout {size}.",
    "That includes the AI engine ({size}), shared by all AI add-ons.": "To zahrnuje jádro AI ({size}), společné pro všechny doplňky AI.",
    "It is kept in this browser and works offline afterwards; the Add-ons list in the side panel removes it again. Everything runs on this device – your pictures are not uploaded.": "Zůstane v tomto prohlížeči a pak funguje i offline; v seznamu Doplňky v postranním panelu ho zase odstraníte. Vše běží v tomto zařízení – vaše obrázky se nikam nenahrávají.",
    "Download {size}": "Stáhnout {size}",
    "Downloading…": "Stahuje se…",
    "{name} is ready.": "{name} je připraveno.",
    "Could not download it: {why}": "Nepodařilo se stáhnout: {why}",
    "installed": "staženo",
    "Download": "Stáhnout",
    "Used by add-ons: {size}. Sizes include the shared AI engine where it is not downloaded yet.": "Doplňky zabírají: {size}. Velikosti zahrnují společné jádro AI, pokud ještě není stažené.",
    "Removed the add-on.": "Doplněk odstraněn.",
    "Object (AI)": "Objekt (AI)",
    "Remove background…": "Odstranit pozadí…",
    "Read text…": "Přečíst text…",
    "3D relief…": "3D reliéf…",
    "Add-ons": "Doplňky",
    "Features that need a one-time download. Nothing is downloaded until you agree; everything runs on this device.": "Funkce, které potřebují jednorázové stažení. Nic se nestáhne, dokud nesouhlasíte; vše běží v tomto zařízení.",
    "Tap an object: the AI selects it (an add-on – asks before downloading)": "Klepněte na objekt: AI ho vybere (doplněk – před stažením se zeptá)",
    "Make the background transparent, or select the subject (an AI add-on – asks before downloading)": "Zprůhlednit pozadí, nebo vybrat hlavní objekt (doplněk AI – před stažením se zeptá)",
    "Recognize the text in the image or the selection, to copy it (an add-on – asks before downloading)": "Rozpoznat text v obrázku nebo výběru a zkopírovat ho (doplněk – před stažením se zeptá)",
    "A 3D-printable relief (STL) from the picture's brightness, or from AI depth": "Reliéf pro 3D tisk (STL) podle jasu obrázku, nebo podle hloubky z AI",
    "Add-ons that run on your device, each downloaded only after you agree to its size: Select object (tap it), AI object removal, background removal, Read text (OCR) and depth for 3D reliefs. The side panel lists them and removes them again.": "Doplňky, které běží ve vašem zařízení a stáhnou se až po odsouhlasení velikosti: Výběr objektu (klepnutím), odstraňování objektů AI, odstranění pozadí, Čtení textu (OCR) a hloubka pro 3D reliéfy. Postranní panel je vypisuje a umí je zase odstranit.",
    "3D relief…: a printable relief (STL) from the picture's brightness – or a lithophane – or from AI depth.": "3D reliéf…: reliéf k tisku (STL) podle jasu obrázku – nebo litofanie – nebo podle hloubky z AI.",
    "Layer {n}": "Vrstva {n}",
    "Saved as one picture – Save layers (.ora) in the Layers section keeps the layers.": "Uloženo jako jeden obrázek – vrstvy zachová Uložit vrstvy (.ora) v části Vrstvy.",
    "The last layer can’t be deleted.": "Poslední vrstvu nelze smazat.",
    "There is no layer under this one.": "Pod touto vrstvou žádná není.",
    "Name of the layer:": "Název vrstvy:",
    "Hide this layer": "Skrýt tuto vrstvu",
    "Show this layer": "Zobrazit tuto vrstvu",
    "Show {name}": "Zobrazit {name}",
    "Saved {name} with {n} {n|layer|layers}.": "Uloženo {name} s {n} {n|vrstvou|vrstvami|vrstvami}.",
    "Opened {name} ({n} {n|layer|layers}).": "Otevřeno {name} ({n} {n|vrstva|vrstvy|vrstev}).",
    "Could not read this OpenRaster file.": "Tento soubor OpenRaster se nepodařilo přečíst.",
    "Merge down": "Sloučit dolů",
    "Flatten": "Sloučit vše",
    "Save layers (.ora)": "Uložit vrstvy (.ora)",
    "Painting and the other tools work on the active layer. Tap a layer to make it active, double-click to rename. Save keeps the picture as it looks; Save layers keeps the layers.": "Malování a ostatní nástroje pracují v aktivní vrstvě. Klepnutím vrstvu aktivujete, dvojklikem přejmenujete. Uložit uloží obrázek, jak vypadá; Uložit vrstvy zachová vrstvy.",
    "Layers (.ora)": "Vrstvy (.ora)",
    "Layers – the top one first": "Vrstvy – horní první",
    "A new, empty layer above this one": "Nová prázdná vrstva nad touto",
    "A copy of this layer": "Kopie této vrstvy",
    "Move this layer up": "Posunout vrstvu nahoru",
    "Move up": "Nahoru",
    "Move this layer down": "Posunout vrstvu dolů",
    "Move down": "Dolů",
    "Delete this layer": "Smazat tuto vrstvu",
    "Put this layer onto the one under it": "Vložit tuto vrstvu do té pod ní",
    "All the layers as one": "Všechny vrstvy v jednu",
    "Save every layer in one file (OpenRaster – GIMP, Krita and others open it); Open… opens it again": "Uložit všechny vrstvy do jednoho souboru (OpenRaster – otevře ho GIMP, Krita a další); Otevřít… ho zase otevře",
    "Layers in the raster app: paint on the active layer, show / hide, opacity, move, merge, flatten – undo knows them all. Save layers keeps them in an OpenRaster file (.ora – GIMP and Krita open it), and autosave keeps them too.": "Vrstvy v rastrové aplikaci: malování do aktivní vrstvy, zobrazení / skrytí, krytí, přesun, sloučení – Zpět zná všechno. Uložit vrstvy je zachová v souboru OpenRaster (.ora – otevře ho GIMP i Krita) a zachová je i automatické ukládání.",
    "The AI add-ons on phones: much less memory (no more crash on iPhone when selecting an object) – the CPU engine on iPhone and iPad, and one feature's models at a time.": "Doplňky AI na telefonech: mnohem méně paměti (výběr objektu už na iPhonu nespadne) – na iPhonu a iPadu jádro pro procesor a vždy jen modely jedné funkce.",
    "Frame {n} of {count}": "Snímek {n} z {count}",
    "{s} s of {total} s": "{s} s z {total} s",
    "Choose a frame": "Vyberte snímek",
    "One frame back": "O snímek zpět",
    "Play / pause": "Přehrát / pozastavit",
    "One frame on": "O snímek dál",
    "Use this frame": "Použít tento snímek",
    "This video can’t be played here – try a GIF or a screenshot of it.": "Toto video tu nejde přehrát – zkuste GIF nebo jeho snímek obrazovky.",
    "GIFs and videos: open one (or, in Discord, a GIF, a video or a Tenor / Giphy GIF from the chat) and choose the frame to edit – with a slider, frame steps and play.": "GIFy a videa: otevřete je (v Discordu i GIF, video nebo GIF z Tenoru / Giphy z chatu) a vyberte snímek k úpravě – posuvníkem, po snímcích nebo přehráním.",
    "Everything was selected – now nothing is.": "Vybráno bylo vše – teď není nic.",
    "Invert": "Obrátit",
    "Select the other shapes instead (Ctrl+I)": "Vybrat místo toho ostatní tvary (Ctrl+I)",
    "Adjust": "Úpravy",
    "Invert selection": "Obrátit výběr",
    "Invert the selection": "Obrátit výběr",
    "Brightness, contrast, warmth and the other photo sliders – for the selection or the whole image": "Jas, kontrast, teplota a další posuvníky pro fotky – pro výběr nebo celý obrázek",
    "Select what isn't selected (Ctrl+I)": "Vybrat, co vybrané není (Ctrl+I)",
    "Light": "Světlo",
    "Detail and effects": "Detaily a efekty",
    "Levels": "Úrovně",
    "Vibrance": "Živost",
    "Warmth": "Teplota",
    "Tint": "Odstín",
    "Fade": "Vybledlost",
    "Vignette": "Vinětace",
    "Black point": "Bod černé",
    "White point": "Bod bílé",
    "Shadows": "Stíny",
    "Highlights": "Světla",
    "Midtones": "Střední tóny",
    "Nicer icons for undo / redo, zoom, fit and help; Adjust is in the toolbar and the quick menu, with new sliders – shadows, highlights, warmth, tint, vibrance, fade and vignette. Invert selection (Ctrl+I) in both apps.": "Hezčí ikony pro zpět / znovu, přiblížení, přizpůsobení a nápovědu; Úpravy jsou na liště i v rychlé nabídce s novými posuvníky – stíny, světla, teplota, odstín, živost, vybledlost a vinětace. Obrácení výběru (Ctrl+I) v obou aplikacích.",
    "Select object (AI) no longer crashes on phones: it now uses MobileSAM, which needs a quarter of the memory (and is faster). Its download is larger (45 MB); the old model is removed.": "Výběr objektu (AI) už na telefonech nepadá: teď používá MobileSAM, který potřebuje čtvrtinu paměti (a je rychlejší). Stahování je větší (45 MB); starý model se odstraní.",
    "Import a picture": "Vložit obrázek ze souboru",
    "Put a picture from a file into this image – drag it into place, then press Enter (or tap outside it)": "Vložit obrázek ze souboru do tohoto obrázku – přetáhněte ho na místo a stiskněte Enter (nebo klepněte mimo něj)",
    "Import… puts a picture from a file into the current image (also in the quick menu): it comes in floating, scaled to fit – drag it into place.": "Vložit… přidá obrázek ze souboru do aktuálního obrázku (i v rychlé nabídce): přijde jako plovoucí, zmenšený, aby se vešel – přetáhněte ho na místo.",
    "Two fingers on a selection": "Dva prsty na výběru",
    "Scale, turn and move it (spread, pinch, twist)": "Zvětšit, zmenšit, otočit a posunout (roztažení, sevření, otočení prstů)",
    "Two fingers on a selection (or a pasted, imported picture or text) scale and turn it: spread or pinch, twist – and move it. It snaps upright and to its own size, and is always made from the original pixels, so it doesn’t blur. Elsewhere two fingers zoom the view as before.": "Dva prsty na výběru (nebo na vloženém či importovaném obrázku a textu) ho zvětší, zmenší a otočí: roztáhněte nebo sevřete prsty, otočte jimi – a posuňte ho. Přichytí se ke svislé poloze a k původní velikosti a vždy vzniká z původních pixelů, takže se nerozmazává. Jinde dva prsty přibližují zobrazení jako dřív.",
    "On phones, the Select shapes (and other rows of choices) wrap onto a second line instead of cutting off the last one – Object (AI) can be tapped again.": "Na telefonech se tvary výběru (i jiné řady voleb) zalomí na druhý řádek, místo aby se poslední uřízla – Výběr objektu (AI) jde zase stisknout."
  };

  // src/shared/i18n-de.ts
  var DE = {
    "Picked {c}.": "Farbe {c} gewählt.",
    "Picked {c} (not in the palette – add it with “From drawing”).": "Farbe {c} gewählt (nicht in der Palette – mit „Aus Zeichnung“ hinzufügen).",
    "No painted area under the cursor.": "Unter dem Mauszeiger ist keine bemalte Fläche.",
    "My palette": "Meine Palette",
    "Could not read this file as SVG.": "Diese Datei lässt sich nicht als SVG lesen.",
    "From file": "Aus Datei",
    "The file’s colors were added as the palette “{name}”.": "Die Farben der Datei wurden als Palette „{name}“ hinzugefügt.",
    "Discard unsaved changes to the current drawing?\n(A copy is kept in History.)": "Ungespeicherte Änderungen an der aktuellen Zeichnung verwerfen?\n(Eine Kopie bleibt im Verlauf.)",
    "Before opening {name}": "Vor dem Öffnen von {name}",
    "Opened {name}": "{name} geöffnet",
    "Saved {name}": "{name} gespeichert",
    "File name:": "Dateiname:",
    "PNG width in pixels:": "PNG-Breite in Pixeln:",
    "Invalid width.": "Ungültige Breite.",
    "PNG export failed.": "PNG-Export fehlgeschlagen.",
    "Before starting a new drawing": "Vor dem Beginn einer neuen Zeichnung",
    "Applied the grout color and width to {n} {n|line|lines}.": "Fugenfarbe und -breite auf {n} {n|Linie|Linien} angewendet.",
    "Autosave failed – remember to save your file.": "Automatisches Speichern fehlgeschlagen – denken Sie daran, Ihre Datei zu speichern.",
    "Autosave": "Automatisch gespeichert",
    "Before restoring an older version": "Vor dem Wiederherstellen einer älteren Version",
    "Restored the version from {time}": "Version vom {time} wiederhergestellt",
    "Symmetry center set.": "Symmetriezentrum gesetzt.",
    "Snapping on": "Einrasten an",
    "Snapping off": "Einrasten aus",
    "The clipboard has no color codes.": "Die Zwischenablage enthält keine Farbcodes.",
    "{n} {n|area|areas}": "{n} {n|Fläche|Flächen}",
    "fill": "Füllung",
    "stroke": "Kontur",
    "No color – the bucket erases with it": "Keine Farbe – der Farbeimer radiert damit",
    "Recolored {n} {n|element|elements}.": "{n} {n|Element|Elemente} umgefärbt.",
    "Click on the canvas to place the symmetry center.": "Klicken Sie auf die Zeichenfläche, um das Symmetriezentrum zu setzen.",
    "Photo unlocked: drag it with the Select tool (where there are no shapes).": "Foto entsperrt: Ziehen Sie es mit dem Auswahlwerkzeug (dort, wo keine Formen sind).",
    "Remove the tracing photo?": "Das Foto zum Nachzeichnen entfernen?",
    "Invalid page size.": "Ungültige Seitengröße.",
    "1 drawing unit = 1 {unit}. Set the page size to the real size of your mosaic.": "1 Zeichnungseinheit = 1 {unit}. Stellen Sie die Seitengröße auf die echte Größe Ihres Mosaiks ein.",
    "Could not read that image.": "Dieses Bild lässt sich nicht lesen.",
    "Photo loaded and locked. Unlock it to move it with the Select tool.": "Foto geladen und gesperrt. Entsperren Sie es, um es mit dem Auswahlwerkzeug zu verschieben.",
    "Replace the photo to trace with the pasted image?": "Das Foto zum Nachzeichnen durch das eingefügte Bild ersetzen?",
    "The pasted image is now the photo to trace – “Make a mosaic from the photo” turns it into tiles.": "Das eingefügte Bild ist jetzt das Foto zum Nachzeichnen – „Mosaik aus dem Foto erstellen“ macht Fliesen daraus.",
    "Replace photo…": "Foto ersetzen…",
    "Load photo…": "Foto laden…",
    "Close shape": "Form schließen",
    "Done": "Fertig",
    "Start the cut inside a closed area.": "Beginnen Sie den Schnitt in einer geschlossenen Fläche.",
    "Click inside a closed area (or use “Fill whole page”).": "Klicken Sie in eine geschlossene Fläche (oder nutzen Sie „Ganze Seite füllen“).",
    "That would be about {n} tiles – make the tile size bigger.": "Das wären etwa {n} Fliesen – wählen Sie eine größere Fliesengröße.",
    "The tiles are bigger than this area.": "Die Fliesen sind größer als diese Fläche.",
    "This adds {n} lines, which may make editing slow. Continue?": "Das fügt {n} Linien hinzu, was das Bearbeiten verlangsamen kann. Fortfahren?",
    "Added the pattern “{type}” ({n} {n|line|lines}).": "Muster „{type}“ hinzugefügt ({n} {n|Linie|Linien}).",
    "The rows are wider than this area – use a smaller size.": "Die Reihen sind breiter als diese Fläche – wählen Sie eine kleinere Größe.",
    "This area is too narrow for a row of that width.": "Diese Fläche ist für eine Reihe dieser Breite zu schmal.",
    "Added {rows} {rows|row line|row lines} and {cuts} {cuts|cut|cuts} following the outline.": "{rows} {rows|Reihenlinie|Reihenlinien} und {cuts} {cuts|Schnitt|Schnitte} entlang der Kontur hinzugefügt.",
    "Painted areas are locked or hidden (see Layers).": "Bemalte Flächen sind gesperrt oder ausgeblendet (siehe Ebenen).",
    "No closed area here. The red circles show line ends that don’t touch anything.": "Hier ist keine geschlossene Fläche. Die roten Kreise zeigen Linienenden, die nichts berühren.",
    "No closed area here – make sure the lines meet.": "Hier ist keine geschlossene Fläche – prüfen Sie, ob sich die Linien treffen.",
    "Click to select (Shift adds) · drag to move – the nearest corner snaps · drag handles to edit; shared corners move together (Alt detaches) · yellow handles resize a polygon": "Klicken zum Auswählen (Umschalt fügt hinzu) · Ziehen zum Verschieben – die nächste Ecke rastet ein · Griffe ziehen zum Bearbeiten; gemeinsame Ecken bewegen sich zusammen (Alt trennt) · gelbe Griffe ändern die Größe eines Vielecks",
    "Click–click or drag · ends snap to points and onto other lines · Shift: 15° steps · Alt: no snap · Esc: stop": "Klick–Klick oder Ziehen · Enden rasten an Punkten und auf anderen Linien ein · Umschalt: 15°-Schritte · Alt: ohne Einrasten · Esc: beenden",
    "Click corner by corner · click the first corner, double-click or press Enter to close · Backspace removes the last corner · Esc cancels": "Ecke für Ecke klicken · zum Schließen auf die erste Ecke klicken, doppelklicken oder Enter drücken · Rücktaste entfernt die letzte Ecke · Esc bricht ab",
    "Drag from the center (or along an edge in “From edge” mode) · click = last size · Shift: 15° rotation · Ctrl: flip side · keys 3–9: sides": "Vom Mittelpunkt ziehen (oder entlang einer Kante im Modus „Von Kante“) · Klick = letzte Größe · Umschalt: 15°-Drehung · Strg: Seite wechseln · Tasten 3–9: Seitenzahl",
    "Drag across a tile to cut it straight through, edge to edge · Shift: 15° steps": "Über eine Fliese ziehen, um sie gerade von Kante zu Kante zu schneiden · Umschalt: 15°-Schritte",
    "Click inside a closed area to fill it with the chosen pattern": "In eine geschlossene Fläche klicken, um sie mit dem gewählten Muster zu füllen",
    "Click or drag across tiles to paint them · click again to recolor · ∅ swatch erases · Alt+click: pick a color": "Klicken oder über Fliesen ziehen, um sie zu bemalen · erneut klicken zum Umfärben · Farbfeld ∅ radiert · Alt+Klick: Farbe aufnehmen",
    "Drag to pan · mouse wheel zooms": "Ziehen zum Verschieben · Mausrad zoomt",
    "The lines layer is locked or hidden (see Layers).": "Die Linienebene ist gesperrt oder ausgeblendet (siehe Ebenen).",
    "About {n} tiles – too many, use a bigger tile size.": "Etwa {n} Fliesen – zu viele, wählen Sie eine größere Fliesengröße.",
    "About {n} tiles.": "Etwa {n} Fliesen.",
    "Load a photo first.": "Laden Sie zuerst ein Foto.",
    "That gives {n} tiles – use a bigger tile size.": "Das ergibt {n} Fliesen – wählen Sie eine größere Fliesengröße.",
    "Before making a mosaic from the photo": "Vor dem Erstellen eines Mosaiks aus dem Foto",
    "From photo": "Aus Foto",
    "New palette “{name}” with {n} {n|color|colors}.": "Neue Palette „{name}“ mit {n} {n|Farbe|Farben}.",
    "Made a mosaic of {n} tiles from the photo.": "Mosaik aus {n} Fliesen aus dem Foto erstellt.",
    "Working…": "Arbeite…",
    "Make mosaic": "Mosaik erstellen",
    "Versions are kept in this browser: every few minutes while you work, and before you open, start or restore another drawing. Restoring keeps your current drawing as a version too.": "Versionen werden in diesem Browser gespeichert: alle paar Minuten während der Arbeit und bevor Sie eine andere Zeichnung öffnen, beginnen oder wiederherstellen. Beim Wiederherstellen wird auch die aktuelle Zeichnung als Version gespeichert.",
    "No versions yet. A version is kept every few minutes while you work, and before you open or start another drawing.": "Noch keine Versionen. Eine Version wird alle paar Minuten während der Arbeit gespeichert und bevor Sie eine andere Zeichnung öffnen oder beginnen.",
    "{n} painted {n|area|areas}": "{n} {n|bemalte Fläche|bemalte Flächen}",
    "Saved by hand": "Von Hand gespeichert",
    "This browser can’t copy images – use PNG to save one instead.": "Dieser Browser kann keine Bilder kopieren – speichern Sie stattdessen ein PNG.",
    "Copied the drawing as an image – paste it into the raster app or any other program.": "Zeichnung als Bild kopiert – fügen Sie sie in die Raster-App oder ein anderes Programm ein.",
    "Could not copy the image (the browser refused).": "Das Bild konnte nicht kopiert werden (der Browser hat es abgelehnt).",
    "{n} {n|panel|panels} ({rows} × {cols}) · each printed at real size on {s} {paper} {s|sheet|sheets}.": "{n} {n|Feld|Felder} ({rows} × {cols}) · jedes in Originalgröße auf {s} {paper}-{s|Blatt|Blättern} gedruckt.",
    "laying plan: {n} {n|panel|panels} ({rows} rows × {cols} columns) of {w} × {h} {unit}": "Verlegeplan: {n} {n|Feld|Felder} ({rows} Reihen × {cols} Spalten) zu je {w} × {h} {unit}",
    "Panel {n} – row {row}, column {col}": "Feld {n} – Reihe {row}, Spalte {col}",
    "Panel {n}": "Feld {n}",
    "Panel": "Feld",
    "tiles per panel and color": "Fliesen je Feld und Farbe",
    "laying plan": "Verlegeplan",
    "{c} – click to remove from the mix": "{c} – klicken, um sie aus der Mischung zu entfernen",
    "Shift+click two or more swatches to put them in the mix.": "Umschalt+Klick auf zwei oder mehr Farbfelder legt sie in die Mischung.",
    "Each tile gets one of these {n} colors at random. Shift+click swatches to change the mix.": "Jede Fliese bekommt zufällig eine dieser {n} Farben. Umschalt+Klick auf Farbfelder ändert die Mischung.",
    "Put at least two colors in the mix first (Shift+click swatches).": "Legen Sie zuerst mindestens zwei Farben in die Mischung (Umschalt+Klick auf Farbfelder).",
    "Mixed the colors of {n} {n|area|areas}.": "Farben von {n} {n|Fläche|Flächen} gemischt.",
    "Select painted areas first.": "Wählen Sie zuerst bemalte Flächen aus.",
    "Cut {n} {n|shape|shapes}. Paste with Ctrl+V – also in another page or drawing.": "{n} {n|Form|Formen} ausgeschnitten. Mit Strg+V einfügen – auch auf einer anderen Seite oder in einer anderen Zeichnung.",
    "Copied {n} {n|shape|shapes}. Paste with Ctrl+V – also in another page or drawing.": "{n} {n|Form|Formen} kopiert. Mit Strg+V einfügen – auch auf einer anderen Seite oder in einer anderen Zeichnung.",
    "Pasted {n} {n|shape|shapes}.": "{n} {n|Form|Formen} eingefügt.",
    "Could not store the motifs.": "Die Motive konnten nicht gespeichert werden.",
    "No motifs yet. Select some shapes and save them.": "Noch keine Motive. Wählen Sie einige Formen aus und speichern Sie sie.",
    "{name} – click, then click on the drawing to place it": "{name} – klicken, dann in die Zeichnung klicken, um es zu platzieren",
    "Delete this motif": "Dieses Motiv löschen",
    "Delete the motif “{name}”?": "Das Motiv „{name}“ löschen?",
    "Select the shapes of the motif first (Select tool).": "Wählen Sie zuerst die Formen des Motivs aus (Auswahlwerkzeug).",
    "Name of the motif:": "Name des Motivs:",
    "Motif {n}": "Motiv {n}",
    "Saved the motif “{name}”.": "Motiv „{name}“ gespeichert.",
    "This motif could not be read.": "Dieses Motiv lässt sich nicht lesen.",
    "Placed “{name}”. Click again for another one, R turns it, Esc stops.": "„{name}“ platziert. Erneut klicken für ein weiteres, R dreht es, Esc beendet.",
    "Click to place the motif · R: turn it by 15° (Shift+R: 90°) · Esc: stop": "Klicken, um das Motiv zu platzieren · R: um 15° drehen (Umschalt+R: 90°) · Esc: beenden",
    "There are no motifs to export yet.": "Es gibt noch keine Motive zum Exportieren.",
    "Imported {n} {n|motif|motifs}.": "{n} {n|Motiv|Motive} importiert.",
    "No motifs found in that file.": "In dieser Datei wurden keine Motive gefunden.",
    "That file is not a motif library.": "Diese Datei ist keine Motivbibliothek.",
    "Page {n}": "Seite {n}",
    "{name} copy": "{name} – Kopie",
    "Page name:": "Seitenname:",
    "A project needs at least one page.": "Ein Projekt braucht mindestens eine Seite.",
    "Delete the page “{name}”? (A copy of the project is kept in History.)": "Die Seite „{name}“ löschen? (Eine Kopie des Projekts bleibt im Verlauf.)",
    "Before deleting the page {name}": "Vor dem Löschen der Seite {name}",
    "Rename…": "Umbenennen…",
    "Duplicate": "Duplizieren",
    "Move left": "Nach links",
    "Move right": "Nach rechts",
    "Delete…": "Löschen…",
    "Double-click to rename": "Doppelklick zum Umbenennen",
    "Switch to this page": "Zu dieser Seite wechseln",
    "Page options": "Seitenoptionen",
    "Load a photo first (Photo section).": "Laden Sie zuerst ein Foto (Bereich Foto zum Nachzeichnen).",
    "The palette is empty – add colors first.": "Die Palette ist leer – fügen Sie zuerst Farben hinzu.",
    "Colored {n} {n|area|areas} with the closest palette colors": "{n} {n|Fläche|Flächen} mit den nächstliegenden Palettenfarben bemalt",
    "{n} already painted (left as they were)": "{n} schon bemalt (unverändert gelassen)",
    "{n} outside the photo": "{n} außerhalb des Fotos",
    "colors": "Farben",
    "The browser blocked the print window – allow pop-ups for this page.": "Der Browser hat das Druckfenster blockiert – erlauben Sie Pop-ups für diese Seite.",
    "Nothing to import from the raster app.": "Aus der Raster-App gibt es nichts zu importieren.",
    "Opened {n} tiles from the raster app – your previous drawing is in History.": "{n} Fliesen aus der Raster-App geöffnet – Ihre vorige Zeichnung ist im Verlauf.",
    "<b>{n}</b> painted {n|area|areas} in <b>{c}</b> {c|color|colors}": "<b>{n}</b> {n|bemalte Fläche|bemalte Flächen} in <b>{c}</b> {c|Farbe|Farben}",
    "<b>{n}</b> not painted yet": "<b>{n}</b> noch nicht bemalt",
    "everything is painted": "alles ist bemalt",
    "page {w} × {h} {unit}": "Seite {w} × {h} {unit}",
    "Color": "Farbe",
    "Areas": "Flächen",
    "Total area": "Gesamtfläche",
    "Share": "Teilen",
    "Pieces of the size set above, plus waste": "Stücke der oben eingestellten Größe, plus Verschnitt",
    "Pieces to buy": "Zu kaufende Stücke",
    "Replace with": "Ersetzen durch",
    "Erase": "Löschen",
    "Nothing is painted yet. Use the paint bucket, or “Color tiles from photo”.": "Noch ist nichts bemalt. Nutzen Sie den Farbeimer oder „Fliesen aus Foto färben“.",
    "Recolored {n} {n|area|areas}.": "{n} {n|Fläche|Flächen} umgefärbt.",
    "Erased {n} {n|area|areas}.": "{n} {n|Fläche|Flächen} gelöscht.",
    "Colors that may look alike": "Farben, die ähnlich aussehen können",
    "{a} and {b} {how}": "{a} und {b} {how}",
    "The link would be {kb} KB – too long. Share the file instead, or leave out the photo.": "Der Link wäre {kb} KB groß – zu lang. Teilen Sie lieber die Datei oder lassen Sie das Foto weg.",
    "The link is {kb} KB – long links can get cut off in some messengers; sharing the file is safer. Anyone with it can view the mosaic and make their own copy.": "Der Link ist {kb} KB groß – lange Links werden in manchen Messengern abgeschnitten; die Datei zu teilen ist sicherer. Jeder mit dem Link kann das Mosaik ansehen und eine eigene Kopie anlegen.",
    "The link is {kb} KB. Anyone with it can view the mosaic and make their own copy.": "Der Link ist {kb} KB groß. Jeder mit dem Link kann das Mosaik ansehen und eine eigene Kopie anlegen.",
    "Sharing failed.": "Teilen fehlgeschlagen.",
    "Link copied.": "Link kopiert.",
    "This share link is damaged or incomplete.": "Dieser Link ist beschädigt oder unvollständig.",
    "Before opening a shared mosaic": "Vor dem Öffnen eines geteilten Mosaiks",
    "This is now your own copy – it is saved in this browser like any drawing.": "Das ist jetzt Ihre eigene Kopie – sie wird wie jede Zeichnung in diesem Browser gespeichert.",
    "Normal colors": "Normale Farben",
    "Black & white": "Schwarzweiß",
    "Red-blind (protanopia)": "Rotblind (Protanopie)",
    "Green-blind (deuteranopia)": "Grünblind (Deuteranopie)",
    "Blue-blind (tritanopia)": "Blaublind (Tritanopie)",
    "look almost the same": "sehen fast gleich aus",
    "in black & white": "in Schwarzweiß",
    "for red-blind viewers": "für Rotblinde",
    "for green-blind viewers": "für Grünblinde",
    "for blue-blind viewers": "für Blaublinde",
    "look alike {who}": "sehen {who} ähnlich aus",
    "{n} {n|tile blends|tiles blend} into a neighbour of another color.": "{n} {n|Fliese verschwimmt|Fliesen verschwimmen} mit einer Nachbarfliese anderer Farbe.",
    "{n} {n|tile blends|tiles blend} into a neighbour of another color (in this view).": "{n} {n|Fliese verschwimmt|Fliesen verschwimmen} mit einer Nachbarfliese anderer Farbe (in dieser Ansicht).",
    "No tile blends into its neighbours.": "Keine Fliese verschwimmt mit ihren Nachbarn.",
    "Sheet {sheet} – row {row}, column {col} of {cols} · blue strips are covered by the next sheet": "Blatt {sheet} – Reihe {row}, Spalte {col} von {cols} · blaue Streifen werden vom nächsten Blatt überdeckt",
    "One {paper} sheet ({orientation}), at {pct} % of the real size.": "Ein {paper}-Blatt ({orientation}), {pct} % der Originalgröße.",
    "One {paper} sheet ({orientation}) at real size.": "Ein {paper}-Blatt ({orientation}) in Originalgröße.",
    "{n} {paper} {n|sheet|sheets} ({orientation}, {rows} × {cols}, overlapping {overlap} mm) at real size.": "{n} {paper}-{n|Blatt|Blätter} ({orientation}, {rows} × {cols}, {overlap} mm Überlappung) in Originalgröße.",
    "{n} sheets ({rows} × {cols}), real size {w} × {h} cm": "{n} Blätter ({rows} × {cols}), Originalgröße {w} × {h} cm",
    "The picture has many colors: it is snapped to the current palette (use “Reduce to palette” to see the result first).": "Das Bild hat viele Farben: Es wird auf die aktuelle Palette umgerechnet (mit „Auf Palette reduzieren“ sehen Sie das Ergebnis vorher).",
    "The picture has many colors: it is snapped to 8 colors suggested from it.": "Das Bild hat viele Farben: Es wird auf 8 daraus vorgeschlagene Farben umgerechnet.",
    "Images": "Bilder",
    "PNG image": "PNG-Bild",
    "Discard unsaved changes to the current image?\n(Save it first if you want to keep it.)": "Ungespeicherte Änderungen am aktuellen Bild verwerfen?\n(Speichern Sie es zuerst, wenn Sie es behalten möchten.)",
    "Could not read {name} as an image.": "{name} lässt sich nicht als Bild lesen.",
    "Opened {name} ({w} × {h} px).": "{name} geöffnet ({w} × {h} px).",
    "Size of the new image in pixels (width × height):": "Größe des neuen Bildes in Pixeln (Breite × Höhe):",
    "Enter a size like 800 × 600 (at most {max} px a side).": "Geben Sie eine Größe wie 800 × 600 ein (höchstens {max} px pro Seite).",
    "Before starting a new image": "Vor dem Beginn eines neuen Bildes",
    "That version could not be read.": "Diese Version lässt sich nicht lesen.",
    "Export failed.": "Export fehlgeschlagen.",
    "Autosave failed – remember to save your image.": "Automatisches Speichern fehlgeschlagen – denken Sie daran, Ihr Bild zu speichern.",
    "The clipboard has no image or color codes.": "Die Zwischenablage enthält weder ein Bild noch Farbcodes.",
    "Versions are kept in this browser: every few minutes while you work, and before you open, start or restore another image. Restoring keeps your current image as a version too.": "Versionen werden in diesem Browser gespeichert: alle paar Minuten während der Arbeit und bevor Sie ein anderes Bild öffnen, beginnen oder wiederherstellen. Beim Wiederherstellen wird auch das aktuelle Bild als Version gespeichert.",
    "No versions yet. A version is kept every few minutes while you work, and before you open or start another image.": "Noch keine Versionen. Eine Version wird alle paar Minuten während der Arbeit gespeichert und bevor Sie ein anderes Bild öffnen oder beginnen.",
    "The palette is empty – add colors, or let the mosaic suggest some.": "Die Palette ist leer – fügen Sie Farben hinzu oder lassen Sie das Mosaik welche vorschlagen.",
    "There is nothing to make a mosaic from (the area is transparent).": "Es gibt nichts, woraus ein Mosaik werden kann (die Fläche ist transparent).",
    "From picture": "Aus Bild",
    "Made {n} {n|tile|tiles} in {c} {c|color|colors}.": "{n} {n|Fliese|Fliesen} in {c} {c|Farbe|Farben} erstellt.",
    "The palette is empty.": "Die Palette ist leer.",
    "Every pixel now has a palette color: {n} {n|pixel|pixels} in {c} {c|color|colors}.": "Jedes Pixel hat jetzt eine Palettenfarbe: {n} {n|Pixel|Pixel} in {c} {c|Farbe|Farben}.",
    "At most about {n} tiles in the selection – bigger ones where the picture is calm.": "Höchstens etwa {n} Fliesen in der Auswahl – größere, wo das Bild ruhig ist.",
    "At most about {n} tiles – bigger ones where the picture is calm.": "Höchstens etwa {n} Fliesen – größere, wo das Bild ruhig ist.",
    "About {n} tiles in the selection.": "Etwa {n} Fliesen in der Auswahl.",
    "Turn on “Fill” or “Outline” for polygons.": "Schalten Sie bei Vielecken „Füllung“ oder „Kontur“ ein.",
    "Picked “transparent”.": "„Transparent“ gewählt.",
    "Picked {c} (not in the palette – add it with “From image”).": "Farbe {c} gewählt (nicht in der Palette – mit „Aus Bild“ hinzufügen).",
    "{n} {n|pixel|pixels}": "{n} {n|Pixel|Pixel}",
    "paint color": "Malfarbe",
    "outline color": "Konturfarbe",
    "Transparent – paints and fills transparent pixels": "Transparent – malt und füllt mit transparenten Pixeln",
    "Recolored {n} {n|pixel|pixels}.": "{n} {n|Pixel|Pixel} umgefärbt.",
    "Nothing to paste – or the browser didn’t allow reading the clipboard (try Ctrl+V).": "Nichts zum Einfügen – oder der Browser erlaubt das Lesen der Zwischenablage nicht (versuchen Sie Strg+V).",
    "Enter a size from 1 to {max} px.": "Geben Sie eine Größe von 1 bis {max} px ein.",
    "This picture has {n} pieces – too many to number. Make a mosaic or reduce it to the palette first.": "Dieses Bild hat {n} Teile – zu viele zum Nummerieren. Machen Sie zuerst ein Mosaik daraus oder reduzieren Sie es auf die Palette.",
    "{n} {n|piece|pieces}": "{n} {n|Teil|Teile}",
    "{n} {n|piece|pieces} in {c} {c|color|colors} · {w} × {h} px": "{n} {n|Teil|Teile} in {c} {c|Farbe|Farben} · {w} × {h} px",
    "Nothing is painted yet.": "Noch ist nichts bemalt.",
    "{w} × {h} mm · {k} mm per pixel": "{w} × {h} mm · {k} mm pro Pixel",
    "Pieces": "Teile",
    "Pixels": "Pixel",
    "Area": "Fläche",
    "transparent": "transparent",
    "({w} × {h} px, not placed yet)": "({w} × {h} px, noch nicht platziert)",
    "Cut the selection – paste it here, into the vector app or any other program.": "Auswahl ausgeschnitten – fügen Sie sie hier, in der Vektor-App oder in einem anderen Programm ein.",
    "Cut the image – paste it here, into the vector app or any other program.": "Bild ausgeschnitten – fügen Sie es hier, in der Vektor-App oder in einem anderen Programm ein.",
    "Copied the selection – paste it here, into the vector app or any other program.": "Auswahl kopiert – fügen Sie sie hier, in der Vektor-App oder in einem anderen Programm ein.",
    "Copied the image – paste it here, into the vector app or any other program.": "Bild kopiert – fügen Sie es hier, in der Vektor-App oder in einem anderen Programm ein.",
    "Cut the selection (this browser keeps it for pasting here only).": "Auswahl ausgeschnitten (dieser Browser behält sie nur zum Einfügen hier).",
    "Cut the image (this browser keeps it for pasting here only).": "Bild ausgeschnitten (dieser Browser behält es nur zum Einfügen hier).",
    "Copied the selection (this browser keeps it for pasting here only).": "Auswahl kopiert (dieser Browser behält sie nur zum Einfügen hier).",
    "Copied the image (this browser keeps it for pasting here only).": "Bild kopiert (dieser Browser behält es nur zum Einfügen hier).",
    "Select the part to keep first.": "Wählen Sie zuerst den Teil aus, der bleiben soll.",
    "Could not read the pasted image.": "Das eingefügte Bild lässt sich nicht lesen.",
    "The pasted image ({w} × {h}) is bigger than this one ({W} × {H}). Enlarge the canvas to fit it?": "Das eingefügte Bild ({w} × {h}) ist größer als dieses ({W} × {H}). Die Zeichenfläche vergrößern, damit es passt?",
    "Pasted {w} × {h} px – drag it into place, then press Enter (or click outside it).": "{w} × {h} px eingefügt – an die richtige Stelle ziehen, dann Enter drücken (oder daneben klicken).",
    "The link would be {kb} KB – too long. Share the file instead (or make the image smaller).": "Der Link wäre {kb} KB groß – zu lang. Teilen Sie lieber die Datei (oder verkleinern Sie das Bild).",
    "The link is {kb} KB – long links can get cut off in some messengers; sharing the file is safer. Anyone with it can view the image and make their own copy.": "Der Link ist {kb} KB groß – lange Links werden in manchen Messengern abgeschnitten; die Datei zu teilen ist sicherer. Jeder mit dem Link kann das Bild ansehen und eine eigene Kopie anlegen.",
    "The link is {kb} KB. Anyone with it can view the image and make their own copy.": "Der Link ist {kb} KB groß. Jeder mit dem Link kann das Bild ansehen und eine eigene Kopie anlegen.",
    "Before opening a shared image": "Vor dem Öffnen eines geteilten Bildes",
    "This is now your own copy – it is saved in this browser like any image.": "Das ist jetzt Ihre eigene Kopie – sie wird wie jedes Bild in diesem Browser gespeichert.",
    "Drag to select · drag inside the selection to move it (Alt: a copy) · Enter places it · Ctrl+C / X / V copy, cut, paste": "Ziehen zum Auswählen · in der Auswahl ziehen zum Verschieben (Alt: eine Kopie) · Enter platziert sie · Strg+C / X / V kopieren, ausschneiden, einfügen",
    "Drag to paint · Shift: straight line · [ ] size · Shift+B: tip · Alt+click: pick a color": "Ziehen zum Malen · Umschalt: gerade Linie · [ ] Größe · Umschalt+B: Spitze · Alt+Klick: Farbe aufnehmen",
    "Hard pixels in exact colors · Shift: straight line · [ ] size · Alt+click: pick a color": "Harte Pixel in exakten Farben · Umschalt: gerade Linie · [ ] Größe · Alt+Klick: Farbe aufnehmen",
    "Drag to erase to transparent · Shift: straight line · [ ] size": "Ziehen zum Radieren (transparent) · Umschalt: gerade Linie · [ ] Größe",
    "Drag a line · Shift: 15° steps": "Eine Linie ziehen · Umschalt: 15°-Schritte",
    "Drag from the center · Shift: 15° rotation · keys 3–9: sides": "Vom Mittelpunkt ziehen · Umschalt: 15°-Drehung · Tasten 3–9: Seitenzahl",
    "Click to fill the area of similar color · Alt+click: pick a color": "Klicken, um die Fläche ähnlicher Farbe zu füllen · Alt+Klick: Farbe aufnehmen",
    "Click to take a color from the image": "Klicken, um eine Farbe aus dem Bild aufzunehmen",
    "No grout – every piece is a tile": "Keine Fugen – jedes Teil ist eine Fliese",
    "{n} {n|tile|tiles} at {w} × {h} mm – too many: make a mosaic or reduce the picture to the palette first.": "{n} {n|Fliese|Fliesen} auf {w} × {h} mm – zu viele: Machen Sie zuerst ein Mosaik oder reduzieren Sie das Bild auf die Palette.",
    "{n} {n|tile|tiles} at {w} × {h} mm.": "{n} {n|Fliese|Fliesen} auf {w} × {h} mm.",
    "Could not hand the tiles over (browser storage unavailable).": "Die Fliesen konnten nicht übergeben werden (Browserspeicher nicht verfügbar).",
    "3D print": "3D-Druck",
    "Close": "Schließen",
    "A model where every color stands at its own height. Print it with one nozzle and change the filament at the layers listed below – each tile’s top then shows its color. The 3MF file already contains the filament changes for PrusaSlicer; for other slicers, the plan lists them.": "Ein Modell, in dem jede Farbe ihre eigene Höhe hat. Drucken Sie es mit einer Düse und wechseln Sie das Filament in den unten genannten Schichten – die Oberseite jeder Fliese zeigt dann ihre Farbe. Die 3MF-Datei enthält die Filamentwechsel bereits für PrusaSlicer; für andere Slicer stehen sie im Plan.",
    "Size": "Größe",
    "Size of the model’s smallest step – about your nozzle width": "Größe des kleinsten Schritts des Modells – etwa Ihre Düsenbreite",
    "Detail": "Detail",
    "Layer height": "Schichthöhe",
    "How many layers each color gets – more layers cover the color below better": "Wie viele Schichten jede Farbe bekommt – mehr Schichten decken die Farbe darunter besser ab",
    "Layers per color": "Schichten pro Farbe",
    "A plate under everything, printed in the first color. 0: unpainted parts are left open": "Eine Platte unter allem, in der ersten Farbe gedruckt. 0: Unbemaltes bleibt offen",
    "Base layers": "Basisschichten",
    "Top view of the model": "Draufsicht auf das Modell",
    "Print order (bottom first):": "Druckreihenfolge (von unten):",
    "Lighter colors lower: a darker layer covers a lighter one well. Lines (grout) stay at the bottom": "Hellere Farben nach unten: Eine dunklere Schicht deckt eine hellere gut ab. Linien (Fugen) bleiben unten",
    "Light → dark": "Hell → dunkel",
    "Dark → light": "Dunkel → hell",
    "Which filament to load at which layer, as a text file": "Welches Filament in welcher Schicht einzulegen ist, als Textdatei",
    "Plan": "Plan",
    "Just the shape – add the filament changes from the plan in your slicer": "Nur die Form – fügen Sie die Filamentwechsel laut Plan im Slicer hinzu",
    "The model, with the filament changes for PrusaSlicer": "Das Modell mit den Filamentwechseln für PrusaSlicer",
    "Download 3MF": "3MF herunterladen",
    "{n} colors make a tall print with many filament changes – reduce the colors first (Raster: “Reduce to palette”).": "{n} Farben ergeben einen hohen Druck mit vielen Filamentwechseln – reduzieren Sie zuerst die Farben (Raster: „Auf Palette reduzieren“).",
    "Detail lowered to {d} mm for this size.": "Detail für diese Größe auf {d} mm verringert.",
    "lines": "Linien",
    "Print earlier (lower)": "Früher drucken (tiefer)",
    "Print later (higher)": "Später drucken (höher)",
    "{share} % · layers {from}–{to}": "{share} % · Schichten {from}–{to}",
    "{share} % · layers {from}–{to} · change at Z {z}": "{share} % · Schichten {from}–{to} · Wechsel bei Z {z}",
    "{n} {n|color|colors} · height {h} mm ({layers} {layers|layer|layers}) · {c} filament {c|change|changes}": "{n} {n|Farbe|Farben} · Höhe {h} mm ({layers} {layers|Schicht|Schichten}) · {c} {c|Filamentwechsel|Filamentwechsel}",
    "unpainted parts stay at the base ({h} mm)": "Unbemaltes bleibt auf Höhe der Basis ({h} mm)",
    "unpainted parts are left open": "Unbemaltes bleibt offen",
    "Mosaic Paint – 3D print plan for {name}.3mf / {name}.stl": "Mosaic Paint – 3D-Druckplan für {name}.3mf / {name}.stl",
    "Size {w} × {h} mm · layer height {lh} mm · {lpc} layers per color · base {base} layers": "Größe {w} × {h} mm · Schichthöhe {lh} mm · {lpc} Schichten pro Farbe · Basis {base} Schichten",
    "Total height {total} mm ({layers} layers). Set the slicer’s first layer height to {lh} mm too.": "Gesamthöhe {total} mm ({layers} Schichten). Stellen Sie auch die erste Schichthöhe im Slicer auf {lh} mm.",
    "Start with {color} – layers {from}–{to} (base plate included)": "Beginnen Sie mit {color} – Schichten {from}–{to} (Basisplatte inklusive)",
    "Start with {color} – layers {from}–{to}": "Beginnen Sie mit {color} – Schichten {from}–{to}",
    "Layer {layer} (Z {z} mm): change to {color} – layers {from}–{to}": "Schicht {layer} (Z {z} mm): Wechsel zu {color} – Schichten {from}–{to}",
    "PrusaSlicer: the 3MF file already contains these changes – open it and check the layer slider.": "PrusaSlicer: Die 3MF-Datei enthält diese Wechsel bereits – öffnen Sie sie und prüfen Sie den Schichtregler.",
    "Other slicers (they read only the shape from the 3MF or STL) – add the changes by hand:": "Andere Slicer (sie lesen aus 3MF oder STL nur die Form) – fügen Sie die Wechsel von Hand hinzu:",
    "- PrusaSlicer, Bambu Studio, OrcaSlicer: in the preview, move the layer slider to each Z above and click “+” (Add color change, M600).": "- PrusaSlicer, Bambu Studio, OrcaSlicer: In der Vorschau den Schichtregler auf jede Z-Höhe oben stellen und auf „+“ klicken (Farbwechsel hinzufügen, M600).",
    "- Cura: Extensions › Post Processing › Modify G-Code › “Filament Change” at each layer number above.": "- Cura: Erweiterungen › Nachbearbeitung › G-Code ändern › „Filament Change“ bei jeder Schichtnummer oben.",
    "- Multi-material printers (AMS, MMU): the same changes work; or assign the filaments to the color changes in the slicer.": "- Mehrmaterial-Drucker (AMS, MMU): Dieselben Wechsel funktionieren; oder ordnen Sie die Filamente im Slicer den Farbwechseln zu.",
    "Could not read the picture.": "Das Bild lässt sich nicht lesen.",
    "Saved {name}.3mf ({n} triangles; PrusaSlicer reads its {c} filament {c|change|changes}, other slicers need the plan).": "{name}.3mf gespeichert ({n} Dreiecke; PrusaSlicer liest {c} {c|Filamentwechsel|Filamentwechsel}, andere Slicer brauchen den Plan).",
    "Saved {name}.stl ({n} triangles). Add the filament changes from the plan in your slicer.": "{name}.stl gespeichert ({n} Dreiecke). Fügen Sie die Filamentwechsel laut Plan im Slicer hinzu.",
    "Reading the picture…": "Bild wird gelesen…",
    "History": "Verlauf",
    "Save a version now": "Jetzt eine Version speichern",
    "Version history needs browser storage (IndexedDB), which is not available here.": "Der Versionsverlauf braucht Browserspeicher (IndexedDB), der hier nicht verfügbar ist.",
    "Restore": "Wiederherstellen",
    "Version saved.": "Version gespeichert.",
    "Could not save a version (browser storage unavailable).": "Die Version konnte nicht gespeichert werden (Browserspeicher nicht verfügbar).",
    "used by {what}": "verwendet für {what}",
    "Click: {fill} · Right-click: {stroke} · Double-click: edit": "Klick: {fill} · Rechtsklick: {stroke} · Doppelklick: bearbeiten",
    "Remove from palette": "Aus der Palette entfernen",
    "Edit color (hex or any CSS color).\nThe drawing is recolored too.": "Farbe bearbeiten (Hex oder eine beliebige CSS-Farbe).\nDie Zeichnung wird ebenfalls umgefärbt.",
    "Not a valid color: {v}": "Keine gültige Farbe: {v}",
    "Paste a color code (or several) into the box, then press Enter.": "Fügen Sie einen Farbcode (oder mehrere) in das Feld ein und drücken Sie Enter.",
    "No color found in: {text}": "Keine Farbe gefunden in: {text}",
    "Added {n} {n|color|colors}.": "{n} {n|Farbe|Farben} hinzugefügt.",
    "Already in the palette.": "Schon in der Palette.",
    "Added {n} {n|color|colors} from the clipboard.": "{n} {n|Farbe|Farben} aus der Zwischenablage hinzugefügt.",
    "Those colors are already in the palette.": "Diese Farben sind schon in der Palette.",
    "Name of the new palette:": "Name der neuen Palette:",
    "Palette": "Palette",
    "Created “{name}”. Paste colors to fill it.": "„{name}“ erstellt. Fügen Sie Farben ein, um sie zu füllen.",
    "Rename palette:": "Palette umbenennen:",
    "Delete the palette “{name}”? (The drawing is not changed.)": "Die Palette „{name}“ löschen? (Die Zeichnung bleibt unverändert.)",
    "Added {n} {n|color|colors} from the drawing.": "{n} {n|Farbe|Farben} aus der Zeichnung hinzugefügt.",
    "No new colors in the drawing.": "Keine neuen Farben in der Zeichnung.",
    "Remove all colors from this palette? (The drawing is not changed.)": "Alle Farben aus dieser Palette entfernen? (Die Zeichnung bleibt unverändert.)",
    "Imported {n} {n|color|colors}.": "{n} {n|Farbe|Farben} importiert.",
    "No new colors found in {name}": "Keine neuen Farben in {name} gefunden",
    "Installed – Mosaic Paint now works offline too.": "Installiert – Mosaic Paint funktioniert jetzt auch offline.",
    "Simple": "Einfach",
    "Expert": "Experte",
    "New": "Neu",
    "Open…": "Öffnen…",
    "Save": "Speichern",
    "Save as…": "Speichern unter…",
    "Copy image": "Bild kopieren",
    "Print…": "Drucken…",
    "Plan…": "Plan…",
    "Report": "Übersicht",
    "Contrast": "Kontrast",
    "Share of area": "Flächenanteil",
    "Install app": "App installieren",
    "You are looking at a shared mosaic.": "Sie sehen ein geteiltes Mosaik.",
    "Make my own copy": "Eigene Kopie anlegen",
    "Back to my drawing": "Zurück zu meiner Zeichnung",
    "Remove last corner": "Letzte Ecke entfernen",
    "Cancel": "Abbrechen",
    "Colors": "Farben",
    "Fill": "Füllung",
    "Stroke": "Kontur",
    "Width": "Breite",
    "Add color": "Farbe hinzufügen",
    "Import…": "Importieren…",
    "From drawing": "Aus Zeichnung",
    "Export": "Exportieren",
    "Clear": "Leeren",
    "Click a swatch = fill · right-click = stroke · double-click = edit (also recolors the drawing) · Shift+click = add to the color mix. Ctrl+V on the canvas adds copied colors.": "Klick auf ein Farbfeld = Füllung · Rechtsklick = Kontur · Doppelklick = bearbeiten (färbt auch die Zeichnung um) · Umschalt+Klick = zur Farbmischung hinzufügen. Strg+V auf der Zeichenfläche fügt kopierte Farben hinzu.",
    "Line": "Linie",
    "Chain lines (next line starts at the last end)": "Linien verketten (die nächste Linie beginnt am letzten Ende)",
    "Free polygon": "Freies Vieleck",
    "Click each corner. Click the first corner again, double-click or press Enter to close it.": "Klicken Sie jede Ecke an. Zum Schließen die erste Ecke erneut anklicken, doppelklicken oder Enter drücken.",
    "Fill new shapes with the fill color": "Neue Formen mit der Füllfarbe füllen",
    "Regular polygon": "Regelmäßiges Vieleck",
    "Sides": "Seiten",
    "From center": "Vom Mittelpunkt",
    "From edge": "Von Kante",
    "Knife": "Messer",
    "Press inside a tile and drag in the direction of the cut. The tile is cut straight across, from edge to edge.": "In einer Fliese drücken und in Schnittrichtung ziehen. Die Fliese wird gerade von Kante zu Kante durchgeschnitten.",
    "Pattern": "Muster",
    "Angle": "Winkel",
    "Rows": "Reihen",
    "Fill whole page": "Ganze Seite füllen",
    "Click inside a closed area to fill it with tiles. Painted areas keep their color in every new tile. “Rows following the outline” lays rows along the area’s edge and around shapes inside it (Rows 0 = fill it).": "In eine geschlossene Fläche klicken, um sie mit Fliesen zu füllen. Bemalte Flächen behalten ihre Farbe in jeder neuen Fliese. „Reihen entlang der Kontur“ legt Reihen entlang des Flächenrands und um Formen darin (Reihen 0 = ganz füllen).",
    "Paint bucket": "Farbeimer",
    "Click inside any closed area, or drag across many tiles. Click a painted area again to recolor it. The ∅ swatch erases. Alt+click picks a color.": "In eine beliebige geschlossene Fläche klicken oder über viele Fliesen ziehen. Erneuter Klick auf eine bemalte Fläche färbt sie um. Das Farbfeld ∅ radiert. Alt+Klick nimmt eine Farbe auf.",
    "Mix colors (a random one per tile)": "Farben mischen (eine zufällige pro Fliese)",
    "Avoid the same color next to itself": "Gleiche Farbe nicht nebeneinander",
    "Close gaps up to": "Lücken schließen bis",
    "Photo to trace": "Foto zum Nachzeichnen",
    "Opacity": "Deckkraft",
    "Show": "Anzeigen",
    "Locked": "Gesperrt",
    "Fit to page": "An Seite anpassen",
    "Remove": "Entfernen",
    "Keep the photo in saved files": "Foto in gespeicherten Dateien behalten",
    "Make a mosaic from the photo…": "Mosaik aus dem Foto erstellen…",
    "Color my tiles from the photo": "Meine Fliesen nach dem Foto färben",
    "Only tiles that aren’t painted yet": "Nur noch nicht bemalte Fliesen",
    "Each tile gets the palette color closest to the photo underneath it. Draw the tile lines first.": "Jede Fliese bekommt die Palettenfarbe, die dem Foto darunter am nächsten kommt. Zeichnen Sie zuerst die Fliesenlinien.",
    "Grout preview": "Fugenvorschau",
    "Preview": "Vorschau",
    "Apply to all lines": "Auf alle Linien anwenden",
    "Motifs": "Motive",
    "Save selection…": "Auswahl speichern…",
    "Click a motif, then click on the drawing to place it (R turns it, Esc stops). Ctrl+C / Ctrl+X / Ctrl+V copy shapes between pages, drawings and browser tabs.": "Klicken Sie auf ein Motiv und dann in die Zeichnung, um es zu platzieren (R dreht es, Esc beendet). Strg+C / Strg+X / Strg+V kopieren Formen zwischen Seiten, Zeichnungen und Browser-Tabs.",
    "Symmetry": "Symmetrie",
    "Off": "Aus",
    "Mirror left ↔ right": "Spiegeln links ↔ rechts",
    "Mirror top ↕ bottom": "Spiegeln oben ↕ unten",
    "Mirror both ways": "In beide Richtungen spiegeln",
    "Rotate around center": "Um den Mittelpunkt drehen",
    "Copies": "Kopien",
    "also mirrored": "auch gespiegelt",
    "Pick center": "Mittelpunkt wählen",
    "Page center": "Seitenmitte",
    "Lines, polygons, knife cuts and painting are repeated around the guides.": "Linien, Vielecke, Messerschnitte und Bemalen werden um die Hilfslinien wiederholt.",
    "Layers": "Ebenen",
    "Lines & shapes": "Linien & Formen",
    "Painted areas": "Bemalte Flächen",
    "Photo": "Foto",
    "Lock the lines while painting so they can’t be moved by accident.": "Sperren Sie die Linien beim Bemalen, damit sie nicht versehentlich verschoben werden.",
    "Snapping": "Einrasten",
    "Snap to points & lines": "An Punkten & Linien einrasten",
    "Shared corners move together": "Gemeinsame Ecken bewegen sich zusammen",
    "Page edge counts as a line": "Seitenrand zählt als Linie",
    "Grid, size": "Raster, Größe",
    "Snaps to ends & corners ▢, crossings ✕, midpoints △, anywhere along a line ◇, centers ○. Hold Alt to place freely.": "Rastet an Enden & Ecken ▢, Kreuzungen ✕, Mittelpunkten △, überall auf einer Linie ◇ und Zentren ○ ein. Mit gedrückter Alt-Taste frei platzieren.",
    "Selection": "Auswahl",
    "Radius": "Radius",
    "Rotation°": "Drehung°",
    "Line width": "Linienbreite",
    "Delete": "Löschen",
    "To front": "Nach vorn",
    "To back": "Nach hinten",
    "Mix colors": "Farben mischen",
    "Page": "Seite",
    "Apply": "Anwenden",
    "Background": "Hintergrund",
    "Show rulers": "Lineale anzeigen",
    "Keyboard & mouse": "Tastatur & Maus",
    "Select, Line, Free polygon, Polygon, Ellipse, Curve, Pattern, Bucket, Pan": "Auswahl, Linie, Freies Vieleck, Vieleck, Ellipse, Kurve, Muster, Farbeimer, Verschieben",
    "Polygon sides": "Seitenzahl des Vielecks",
    "Toggle snapping": "Einrasten ein/aus",
    "Alt": "Alt",
    "Draw / drag without snapping; detach a shared corner; Alt+click with the bucket picks a color": "Ohne Einrasten zeichnen / ziehen; gemeinsame Ecke trennen; Alt+Klick mit dem Farbeimer nimmt eine Farbe auf",
    "Shift": "Umschalt",
    "15° steps; add to selection": "15°-Schritte; zur Auswahl hinzufügen",
    "Ctrl (polygon tool)": "Strg (Vieleck-Werkzeug)",
    "Flip side when drawing from an edge": "Beim Zeichnen von einer Kante die Seite wechseln",
    "Ctrl + drag handle": "Strg + Griff ziehen",
    "Freely move a polygon corner (it stops being regular)": "Eine Vieleckecke frei verschieben (es ist dann nicht mehr regelmäßig)",
    "Enter / Esc": "Enter / Esc",
    "Finish / cancel the current shape": "Aktuelle Form beenden / abbrechen",
    "Del": "Entf",
    "Delete selection (or the last corner of a free polygon)": "Auswahl löschen (oder die letzte Ecke eines freien Vielecks)",
    "Arrows": "Pfeiltasten",
    "Nudge (Shift = ×10)": "Verschieben (Umschalt = ×10)",
    "Undo / redo": "Rückgängig / wiederholen",
    "Copy, cut, paste shapes (also between pages and drawings). Ctrl+C with nothing selected copies the drawing as an image; pasting an image makes it the photo to trace": "Formen kopieren, ausschneiden, einfügen (auch zwischen Seiten und Zeichnungen). Strg+C ohne Auswahl kopiert die Zeichnung als Bild; ein eingefügtes Bild wird zum Foto zum Nachzeichnen",
    "Duplicate, select all": "Duplizieren, alles auswählen",
    "Wheel, Space+drag": "Mausrad, Leertaste+Ziehen",
    "Zoom, pan (two fingers on touch screens)": "Zoomen, verschieben (auf Touchscreens mit zwei Fingern)",
    "Fit page": "Ganze Seite",
    "＋ Page": "＋ Seite",
    "Colors & shopping list": "Farben & Einkaufsliste",
    "Piece size": "Stückgröße",
    "Waste": "Verschnitt",
    "“Replace with” recolors every area of that color.": "„Ersetzen durch“ färbt jede Fläche dieser Farbe um.",
    "Download CSV": "CSV herunterladen",
    "Print template": "Druckvorlage",
    "Opens a print page to use as a cutting or laying template.": "Öffnet eine Druckseite, die Sie als Schneide- oder Verlegevorlage verwenden.",
    "Paper": "Papier",
    "Letter": "Letter",
    "Tabloid (11×17 in)": "Tabloid (11×17 Zoll)",
    "Real size (split across several sheets if needed)": "Originalgröße (bei Bedarf auf mehrere Blätter verteilt)",
    "Fit on one sheet": "Auf ein Blatt einpassen",
    "In color": "Farbig",
    "In color, with color numbers": "Farbig, mit Farbnummern",
    "Outlines with color numbers (paint by number)": "Umrisse mit Farbnummern (Malen nach Zahlen)",
    "Add a page with the color legend": "Eine Seite mit der Farblegende hinzufügen",
    "Mosaic from photo": "Mosaik aus Foto",
    "Lays out tiles over the whole page and gives each tile the color of the photo underneath it.": "Verteilt Fliesen über die ganze Seite und gibt jeder Fliese die Farbe des Fotos darunter.",
    "First load a photo:": "Laden Sie zuerst ein Foto:",
    "Tiles": "Fliesen",
    "Smaller tiles where the photo has detail": "Kleinere Fliesen, wo das Foto Details hat",
    "Use the current palette": "Aktuelle Palette verwenden",
    "Suggest": "Vorschlagen:",
    "colors from the photo (new palette)": "Farben aus dem Foto (neue Palette)",
    "Replace the current drawing (it is kept in History)": "Die aktuelle Zeichnung ersetzen (sie bleibt im Verlauf)",
    "Laying plan": "Verlegeplan",
    "Splits the mosaic into numbered panels – the size of your work surface or of the mesh sheets you lay the tiles on. The print has an overview, every panel at real size and the number of tiles of each color per panel.": "Teilt das Mosaik in nummerierte Felder – so groß wie Ihre Arbeitsfläche oder die Netze, auf die Sie die Fliesen legen. Der Ausdruck enthält eine Übersicht, jedes Feld in Originalgröße und die Anzahl der Fliesen jeder Farbe pro Feld.",
    "Panel size": "Feldgröße",
    "Tabloid": "Tabloid",
    "Color numbers on the tiles": "Farbnummern auf den Fliesen",
    "Show the panels on the drawing": "Felder in der Zeichnung anzeigen",
    "The whole drawing is packed into the link itself – nothing is uploaded. Whoever opens it sees the mosaic and can make their own copy to edit.": "Die ganze Zeichnung steckt im Link selbst – nichts wird hochgeladen. Wer ihn öffnet, sieht das Mosaik und kann eine eigene Kopie zum Bearbeiten anlegen.",
    "Include the tracing photo (makes the link much longer)": "Das Foto zum Nachzeichnen mitnehmen (macht den Link viel länger)",
    "Share file…": "Datei teilen…",
    "Copy link": "Link kopieren",
    "Switch app": "App wechseln",
    "Vector: tiles as shapes. Raster: paint with pixels. Palettes are shared; copy and paste images between them.": "Vektor: Fliesen als Formen. Raster: Malen mit Pixeln. Die Paletten sind gemeinsam; Bilder lassen sich zwischen beiden kopieren und einfügen.",
    "Simple shows the essentials; Expert adds symmetry, layers, rulers, the knife, printing and fine settings": "Einfach zeigt das Wesentliche; Experte ergänzt Symmetrie, Ebenen, Lineale, das Messer, Drucken und Feineinstellungen",
    "New drawing": "Neue Zeichnung",
    "Open SVG (Ctrl+O) – you can also drop a file on the canvas": "SVG öffnen (Strg+O) – Sie können eine Datei auch auf die Zeichenfläche ziehen",
    "Save SVG (Ctrl+S)": "SVG speichern (Strg+S)",
    "Save as (Ctrl+Shift+S)": "Speichern unter (Strg+Umschalt+S)",
    "Export a PNG image": "Ein PNG-Bild exportieren",
    "Export a 3D model for printing with filament changes – each color at its own height": "Ein 3D-Modell für den Druck mit Filamentwechseln exportieren – jede Farbe auf ihrer eigenen Höhe",
    "Copy the drawing (or the selected shapes) as an image – paste it into the raster app or any other program (Ctrl+C)": "Die Zeichnung (oder die ausgewählten Formen) als Bild kopieren – in die Raster-App oder ein anderes Programm einfügen (Strg+C)",
    "Print a real-size template with color numbers": "Eine Vorlage in Originalgröße mit Farbnummern drucken",
    "Split the mosaic into numbered panels and print a laying plan": "Das Mosaik in nummerierte Felder teilen und einen Verlegeplan drucken",
    "Colors used, areas and a shopping list": "Verwendete Farben, Flächen und eine Einkaufsliste",
    "Earlier versions of your drawing": "Frühere Versionen Ihrer Zeichnung",
    "Share the mosaic as a link": "Das Mosaik als Link teilen",
    "Undo (Ctrl+Z)": "Rückgängig (Strg+Z)",
    "Redo (Ctrl+Y)": "Wiederholen (Strg+Y)",
    "Zoom out (-)": "Verkleinern (-)",
    "Zoom in (+)": "Vergrößern (+)",
    "Fit page (0)": "Ganze Seite (0)",
    "See the mosaic in black & white or as color-blind people see it (screen only)": "Das Mosaik in Schwarzweiß oder so sehen, wie Farbenblinde es sehen (nur auf dem Bildschirm)",
    "Mark tiles that blend into a neighbouring tile of another color": "Fliesen markieren, die mit einer Nachbarfliese anderer Farbe verschwimmen",
    "Language": "Sprache",
    "Install as an app that also works offline": "Als App installieren, die auch offline funktioniert",
    "Show the side panel": "Seitenleiste anzeigen",
    "Select / edit (V)": "Auswählen / bearbeiten (V)",
    "Line (L)": "Linie (L)",
    "Free polygon – click corner by corner (P)": "Freies Vieleck – Ecke für Ecke klicken (P)",
    "Regular polygon (G)": "Regelmäßiges Vieleck (G)",
    "Knife – cut a tile straight across (K)": "Messer – eine Fliese gerade durchschneiden (K)",
    "Pattern – fill an area with tiles (T)": "Muster – eine Fläche mit Fliesen füllen (T)",
    "Paint bucket – click or drag across tiles (B)": "Farbeimer – klicken oder über Fliesen ziehen (B)",
    "Pan (H, or hold Space / middle mouse / two fingers)": "Verschieben (H, oder Leertaste / mittlere Maustaste / zwei Finger halten)",
    "Your saved palettes": "Ihre gespeicherten Paletten",
    "New palette": "Neue Palette",
    "Rename this palette": "Diese Palette umbenennen",
    "Delete this palette": "Diese Palette löschen",
    "Fill color – used by the paint bucket": "Füllfarbe – für den Farbeimer",
    "Stroke color – used for new lines and polygons": "Konturfarbe – für neue Linien und Vielecke",
    "Swap fill and stroke": "Füllung und Kontur tauschen",
    "Line width for new lines and polygons": "Linienbreite für neue Linien und Vielecke",
    "Paste #hex, rgb(), name…": "#hex, rgb(), Name einfügen…",
    "Load colors from a .txt / .gpl / .css file": "Farben aus einer .txt- / .gpl- / .css-Datei laden",
    "Add every color used in the drawing": "Jede in der Zeichnung verwendete Farbe hinzufügen",
    "Download the palette as a list of hex codes": "Die Palette als Liste von Hex-Codes herunterladen",
    "0 = as many rows as fit": "0 = so viele Reihen, wie passen",
    "Lay out tiles over the whole page and color them from the photo": "Fliesen über die ganze Seite verteilen und nach dem Foto färben",
    "Color the tiles you have drawn": "Die gezeichneten Fliesen färben",
    "Grout color": "Fugenfarbe",
    "Give every line this color and width for real": "Allen Linien wirklich diese Farbe und Breite geben",
    "Save the selected shapes as a motif": "Die ausgewählten Formen als Motiv speichern",
    "Load motifs from a file": "Motive aus einer Datei laden",
    "Download all motifs as a file": "Alle Motive als Datei herunterladen",
    "Give the selected painted areas random colors from the mix": "Den ausgewählten bemalten Flächen zufällige Farben aus der Mischung geben",
    "Real-world unit: 1 drawing unit = 1 mm / cm / inch": "Reale Einheit: 1 Zeichnungseinheit = 1 mm / cm / Zoll",
    "Add a page (front, back, a color variant…)": "Eine Seite hinzufügen (Vorderseite, Rückseite, eine Farbvariante…)",
    "Export…": "Exportieren…",
    "Copy": "Kopieren",
    "Paste": "Einfügen",
    "You are looking at a shared image.": "Sie sehen ein geteiltes Bild.",
    "Back to my image": "Zurück zu meinem Bild",
    "Place": "Platzieren",
    "Paint": "Malen",
    "Outline": "Kontur",
    "From image": "Aus Bild",
    "Click a swatch = paint color · right-click = outline color · double-click = edit (also recolors the image). The ∅ swatch paints transparent. Palettes are shared with the vector app.": "Klick auf ein Farbfeld = Malfarbe · Rechtsklick = Konturfarbe · Doppelklick = bearbeiten (färbt auch das Bild um). Das Farbfeld ∅ malt transparent. Die Paletten sind mit der Vektor-App gemeinsam.",
    "Brush": "Pinsel",
    "Smooth edges for lines and polygons": "Glatte Kanten für Linien und Vielecke",
    "The pencil always paints hard pixels in exact palette colors – best for pixel mosaics. Shift: straight lines in 15° steps.": "Der Stift malt immer harte Pixel in exakten Palettenfarben – ideal für Pixelmosaike. Umschalt: gerade Linien in 15°-Schritten.",
    "Fill with the paint color": "Mit der Malfarbe füllen",
    "Outline in the outline color": "Kontur in der Konturfarbe",
    "Drag from the center. Shift: 15° rotation steps.": "Vom Mittelpunkt ziehen. Umschalt: Drehung in 15°-Schritten.",
    "Tolerance": "Toleranz",
    "Only connected pixels": "Nur zusammenhängende Pixel",
    "Fills the area of similar color under the click. Alt+click picks a color.": "Füllt die Fläche ähnlicher Farbe unter dem Klick. Alt+Klick nimmt eine Farbe auf.",
    "Cut": "Ausschneiden",
    "Crop": "Zuschneiden",
    "Drag inside the selection to move it (Alt+drag moves a copy); two fingers on it scale and turn it. Enter places it, Esc cancels.": "In der Auswahl ziehen, um sie zu verschieben (Alt+Ziehen verschiebt eine Kopie); zwei Finger darauf skalieren und drehen sie. Enter platziert sie, Esc bricht ab.",
    "Mosaic": "Mosaik",
    "Make a mosaic…": "Mosaik erstellen…",
    "Reduce to palette": "Auf Palette reduzieren",
    "Open as vector tiles…": "Als Vektorfliesen öffnen…",
    "Works on the selection, or on the whole image when nothing is selected.": "Wirkt auf die Auswahl oder auf das ganze Bild, wenn nichts ausgewählt ist.",
    "Image": "Bild",
    "Resize image": "Bildgröße ändern",
    "Canvas size": "Leinwandgröße",
    "Pixel grid when zoomed in": "Pixelraster beim Vergrößern",
    "Select, Brush, Pencil, Eraser, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan": "Auswahl, Pinsel, Stift, Radierer, Linie, Vieleck, Ellipse, Kurve, Farbeimer, Pipette, Verschieben",
    "Smaller / bigger brush": "Kleinerer / größerer Pinsel",
    "Swap paint and outline colors": "Mal- und Konturfarbe tauschen",
    "Alt+click": "Alt+Klick",
    "Pick a color": "Farbe aufnehmen",
    "Straight lines, 15° steps": "Gerade Linien, 15°-Schritte",
    "Copy, cut, paste images (also between the two apps and other programs)": "Bilder kopieren, ausschneiden, einfügen (auch zwischen beiden Apps und anderen Programmen)",
    "Select all, clear the selection": "Alles auswählen, Auswahl aufheben",
    "Place / cancel a moved or pasted image": "Verschobenes oder eingefügtes Bild platzieren / abbrechen",
    "Fit image, actual pixels": "Ganzes Bild, tatsächliche Pixel",
    "Real width": "Reale Breite",
    "Pieces are areas of one color (tiles). “Replace with” recolors every pixel of that color.": "Teile sind Flächen einer Farbe (Fliesen). „Ersetzen durch“ färbt jedes Pixel dieser Farbe um.",
    "The image is packed into the link itself – nothing is uploaded. Whoever opens it sees the image and can make their own copy to edit.": "Das Bild steckt im Link selbst – nichts wird hochgeladen. Wer ihn öffnet, sieht das Bild und kann eine eigene Kopie zum Bearbeiten anlegen.",
    "Make a mosaic": "Mosaik erstellen",
    "Splits the picture into tiles and gives each tile the color underneath it, with grout between the tiles.": "Teilt das Bild in Fliesen, gibt jeder Fliese die Farbe darunter und setzt Fugen zwischen die Fliesen.",
    "Squares": "Quadrate",
    "Squares, offset rows": "Quadrate, versetzte Reihen",
    "Bricks": "Ziegel",
    "Hexagons": "Sechsecke",
    "Irregular (crazy paving)": "Unregelmäßig (Bruchmosaik)",
    "Grout": "Fugen",
    "Smaller tiles where the picture has detail": "Kleinere Fliesen, wo das Bild Details hat",
    "colors from the picture (new palette)": "Farben aus dem Bild (neue Palette)",
    "Keep the picture’s colors": "Die Farben des Bildes beibehalten",
    "Open as vector tiles": "Als Vektorfliesen öffnen",
    "Every piece of the picture (an area of one color) becomes a tile shape in the vector app, at the real size – ready for its print templates, laying plan, 3D print and editing. Your current vector drawing is kept in its History.": "Jedes Teil des Bildes (eine Fläche einer Farbe) wird in der Vektor-App zu einer Fliesenform in Originalgröße – bereit für Druckvorlagen, Verlegeplan, 3D-Druck und Bearbeitung. Ihre aktuelle Vektorzeichnung bleibt in deren Verlauf.",
    "The grout color becomes the page background; every other piece becomes a tile.": "Die Fugenfarbe wird zum Seitenhintergrund; jedes andere Teil wird zu einer Fliese.",
    "Open in the vector app": "In der Vektor-App öffnen",
    "Format": "Format",
    "JPEG": "JPEG",
    "WebP": "WebP",
    "Quality": "Qualität",
    "JPEG has no transparency: transparent parts become white.": "JPEG kennt keine Transparenz: Transparente Stellen werden weiß.",
    "Simple shows the essentials; Expert adds opacity, tolerance, resizing and more": "Einfach zeigt das Wesentliche; Experte ergänzt Deckkraft, Toleranz, Größenänderung und mehr",
    "New image": "Neues Bild",
    "Open an image (Ctrl+O) – you can also drop one on the canvas": "Ein Bild öffnen (Strg+O) – Sie können es auch auf die Zeichenfläche ziehen",
    "Save as PNG (Ctrl+S)": "Als PNG speichern (Strg+S)",
    "Export as JPEG or WebP": "Als JPEG oder WebP exportieren",
    "Colors used, pieces and a shopping list": "Verwendete Farben, Teile und eine Einkaufsliste",
    "Earlier versions of your image": "Frühere Versionen Ihres Bildes",
    "Share the image as a link": "Das Bild als Link teilen",
    "Copy the selection (or the whole image) to the clipboard (Ctrl+C)": "Die Auswahl (oder das ganze Bild) in die Zwischenablage kopieren (Strg+C)",
    "Paste an image from the clipboard (Ctrl+V)": "Ein Bild aus der Zwischenablage einfügen (Strg+V)",
    "Fit image (0)": "Ganzes Bild (0)",
    "Actual pixels (1)": "Tatsächliche Pixel (1)",
    "Select – drag a rectangle, then drag it to move (V)": "Auswahl – ein Rechteck aufziehen, dann zum Verschieben ziehen (V)",
    "Brush – soft edges (B)": "Pinsel – weiche Kanten (B)",
    "Pencil – hard pixels in exact colors (P)": "Stift – harte Pixel in exakten Farben (P)",
    "Eraser (E)": "Radierer (E)",
    "Paint bucket – fill an area (F)": "Farbeimer – eine Fläche füllen (F)",
    "Pick a color (I, or Alt+click with any paint tool)": "Farbe aufnehmen (I, oder Alt+Klick mit jedem Malwerkzeug)",
    "Your saved palettes (shared with the vector app)": "Ihre gespeicherten Paletten (gemeinsam mit der Vektor-App)",
    "Paint color – brush, pencil, lines, polygons and the bucket": "Malfarbe – Pinsel, Stift, Linien, Vielecke und Farbeimer",
    "Outline color – the outline of polygons": "Konturfarbe – die Kontur von Vielecken",
    "Swap paint and outline colors (X)": "Mal- und Konturfarbe tauschen (X)",
    "Brush, pencil, eraser and line size in pixels ( [ and ] )": "Größe von Pinsel, Stift, Radierer und Linie in Pixeln ( [ und ] )",
    "Add the colors used in the image (or suggest some for a photo)": "Die im Bild verwendeten Farben hinzufügen (oder für ein Foto welche vorschlagen)",
    "Turn the image (or the selection) into tiles with grout": "Das Bild (oder die Auswahl) in Fliesen mit Fugen verwandeln",
    "Give every pixel the closest palette color": "Jedem Pixel die nächstliegende Palettenfarbe geben",
    "Every tile becomes a shape in the vector app – for its templates, laying plan and editing": "Jede Fliese wird zu einer Form in der Vektor-App – für deren Vorlagen, Verlegeplan und Bearbeitung",
    "Scale the picture to this size": "Das Bild auf diese Größe skalieren",
    "Change the canvas size, keeping the picture centered": "Die Leinwandgröße ändern, das Bild bleibt zentriert",
    "The width of the finished mosaic": "Die Breite des fertigen Mosaiks",
    "Herringbone": "Fischgrät",
    "Triangles": "Dreiecke",
    "Rings (around the click)": "Ringe (um den Klick)",
    "Rows following the outline": "Reihen entlang der Kontur",
    "portrait": "Hochformat",
    "landscape": "Querformat",
    "Vector": "Vektor",
    "Raster": "Raster",
    "Fit": "Alles",
    "Thinnest part": "Dünnste Stelle",
    "Raised parts narrower than this – or more than twice as tall as they are wide – are lowered to what is around them, so nothing prints as a thin tower": "Erhöhte Stellen, die schmaler sind – oder mehr als doppelt so hoch wie breit –, werden auf die Umgebung abgesenkt, damit nichts als dünner Turm gedruckt wird",
    "Grout colors are always printed first, so the lines between the tiles stay low.": "Fugenfarben werden immer zuerst gedruckt, damit die Linien zwischen den Fliesen niedrig bleiben.",
    "Grout / lines: always printed first, so they stay low": "Fugen / Linien: werden immer zuerst gedruckt und bleiben deshalb niedrig",
    "grout": "Fuge",
    "{n} thin {n|piece|pieces} lowered so nothing prints as a thin tower": "{n} {n|dünnes Teil|dünne Teile} abgesenkt, damit nichts als dünner Turm gedruckt wird",
    "Top view": "Draufsicht",
    "Drag to turn · wheel or two fingers to zoom · double-click to reset": "Ziehen zum Drehen · Mausrad oder zwei Finger zum Zoomen · Doppelklick setzt zurück",
    "Shows the heights taller than they are, to see the color bands": "Zeigt die Höhen überhöht, damit die Farbschichten sichtbar werden",
    "Heights ×": "Höhen ×",
    "This browser can’t show 3D (WebGL is off).": "Dieser Browser kann kein 3D anzeigen (WebGL ist aus).",
    "One nozzle – colors by height": "Eine Düse – Farben nach Höhe",
    "Several filaments (AMS, MMU…) – flat": "Mehrere Filamente (AMS, MMU…) – flach",
    "A flat model with one part per color, for printers that switch filaments by themselves. The 3MF file already assigns filament 1, 2, … to the parts – load the filaments in the order listed below.": "Ein flaches Modell mit einem Teil pro Farbe, für Drucker, die Filamente selbst wechseln. Die 3MF-Datei ordnet den Teilen bereits Filament 1, 2, … zu – legen Sie die Filamente in der unten genannten Reihenfolge ein.",
    "How thick the tiles are above the base": "Wie dick die Fliesen über der Basis sind",
    "Tile layers": "Fliesenschichten",
    "Grout colors end this many layers below the tiles, so the lines between them stay low. 0: all flat": "Fugenfarben enden so viele Schichten unter den Fliesen, damit die Linien dazwischen niedrig bleiben. 0: alles flach",
    "Grout lower by": "Fugen tiefer um",
    "layers": "Schichten",
    "Filaments:": "Filamente:",
    "Grout colors come first and stay lower than the tiles. The base plate uses filament 1.": "Fugenfarben kommen zuerst und bleiben niedriger als die Fliesen. Die Basisplatte nutzt Filament 1.",
    "3MF for": "3MF für",
    "The model, one part per color with its filament": "Das Modell, ein Teil pro Farbe mit seinem Filament",
    "One STL file per color, in a ZIP – load them as parts of one object": "Eine STL-Datei pro Farbe in einem ZIP – als Teile eines Objekts laden",
    "{share} % · filament {k}": "{share} % · Filament {k}",
    "{n} {n|color|colors} = {n} {n|filament|filaments} · flat, {h} mm high ({layers} {layers|layer|layers})": "{n} {n|Farbe|Farben} = {n} {n|Filament|Filamente} · flach, {h} mm hoch ({layers} {layers|Schicht|Schichten})",
    "Base": "Basis",
    "Mosaic Paint – multi-filament plan for {name}.3mf": "Mosaic Paint – Mehrfilament-Plan für {name}.3mf",
    "Size {w} × {h} mm · layer height {lh} mm · base {base} {base|layer|layers} · tiles {tile} {tile|layer|layers} · grout {recess} {recess|layer|layers} lower": "Größe {w} × {h} mm · Schichthöhe {lh} mm · Basis {base} {base|Schicht|Schichten} · Fliesen {tile} {tile|Schicht|Schichten} · Fugen {recess} {recess|Schicht|Schichten} tiefer",
    "Total height {total} mm.": "Gesamthöhe {total} mm.",
    "Filament {k}: {color} (also the base plate)": "Filament {k}: {color} (auch die Basisplatte)",
    "Filament {k}: {color}": "Filament {k}: {color}",
    "{slicer}: open the 3MF – every color is a part of one object with its filament already assigned. Load the filaments in this order (AMS slots, MMU…).": "{slicer}: Öffnen Sie die 3MF – jede Farbe ist ein Teil eines Objekts, dem sein Filament bereits zugeordnet ist. Legen Sie die Filamente in dieser Reihenfolge ein (AMS-Slots, MMU…).",
    "The 3MF is made for {slicer}: other slicers may read it as one part – then use the STL files.": "Die 3MF ist für {slicer} gemacht: Andere Slicer lesen sie eventuell als ein Teil – dann nehmen Sie die STL-Dateien.",
    "STL: one file per color in a ZIP. Load them together as one object made of parts and give each its filament.": "STL: eine Datei pro Farbe in einem ZIP. Laden Sie sie zusammen als ein Objekt aus Teilen und geben Sie jedem sein Filament.",
    "Saved {name}.3mf for {slicer}: {n} {n|part|parts} with their filaments assigned.": "{name}.3mf für {slicer} gespeichert: {n} {n|Teil|Teile} mit zugeordneten Filamenten.",
    "Saved {name}-stl.zip: {n} STL {n|file|files}, one per color. Load them as parts of one object.": "{name}-stl.zip gespeichert: {n} STL-{n|Datei|Dateien}, eine pro Farbe. Als Teile eines Objekts laden.",
    "Finishing: frame, corners, hanging hole, magnets": "Feinschliff: Rahmen, Ecken, Aufhängeloch, Magnete",
    "A border around the picture. With one nozzle it comes out in the top color, with several filaments in filament 1. 0: none": "Ein Rand um das Bild. Mit einer Düse wird er in der obersten Farbe gedruckt, mit mehreren Filamenten in Filament 1. 0: keiner",
    "Frame": "Rahmen",
    "How many layers the frame stands above the tiles": "Wie viele Schichten der Rahmen über die Fliesen hinausragt",
    "raised by": "höher um",
    "Radius of the outline’s corners. 0: square": "Radius der Ecken des Umrisses. 0: eckig",
    "Rounded corners": "Abgerundete Ecken",
    "A hole to hang it by, at the top in the middle. 0: none": "Ein Loch zum Aufhängen, oben in der Mitte. 0: keines",
    "Hanging hole": "Aufhängeloch",
    "Four round pockets in the bottom, one near each corner, to glue magnets in: their diameter. 0: none": "Vier runde Vertiefungen in der Unterseite, eine an jeder Ecke, zum Einkleben von Magneten: ihr Durchmesser. 0: keine",
    "Magnets": "Magnete",
    "How deep the magnet pockets are (the magnet’s thickness)": "Wie tief die Magnetvertiefungen sind (die Dicke des Magneten)",
    "deep": "tief",
    "with the frame {w} × {h} mm, {z} mm high": "mit Rahmen {w} × {h} mm, {z} mm hoch",
    "The model is too thin for magnet pockets.": "Das Modell ist für Magnetvertiefungen zu dünn.",
    "The magnet pockets are only {d} mm deep – the model is thinner there.": "Die Magnetvertiefungen sind nur {d} mm tief – das Modell ist dort dünner.",
    "Frame {w} mm wide, up to layer {layer} (Z {z} mm), in filament 1.": "Rahmen {w} mm breit, bis Schicht {layer} (Z {z} mm), in Filament 1.",
    "Frame {w} mm wide: it goes on in {color} up to layer {layer} (Z {z} mm).": "Rahmen {w} mm breit: Er geht in {color} weiter bis Schicht {layer} (Z {z} mm).",
    "Magnet pockets in the bottom: 4 × {d} mm, {depth} mm deep – glue the magnets in after printing.": "Magnetvertiefungen in der Unterseite: 4 × {d} mm, {depth} mm tief – kleben Sie die Magnete nach dem Druck ein.",
    "Making the mosaic…": "Mosaik wird erstellt…",
    "Could not make the mosaic.": "Das Mosaik konnte nicht erstellt werden.",
    "Tracing the tiles…": "Fliesen werden nachgezeichnet…",
    "Could not trace the tiles.": "Die Fliesen konnten nicht nachgezeichnet werden.",
    "Working out the model…": "Modell wird berechnet…",
    "Working out the model… {p} %": "Modell wird berechnet… {p} %",
    "Could not build the 3D model.": "Das 3D-Modell konnte nicht erstellt werden.",
    "Building the 3D model…": "3D-Modell wird erstellt…",
    "Building the 3D model… {p} %": "3D-Modell wird erstellt… {p} %",
    "Coaster": "Untersetzer",
    "HOME": "HEIM",
    "Sign": "Schild",
    "100 × 100 mm, square tiles in rings of color – try 3D… with rounded corners.": "100 × 100 mm, quadratische Fliesen in Farbringen – probieren Sie 3D… mit abgerundeten Ecken.",
    "coaster": "untersetzer",
    "A word in tiles with a border – try Report for a shopping list.": "Ein Wort aus Fliesen mit Rand – unter Übersicht finden Sie eine Einkaufsliste.",
    "sign": "schild",
    "Welcome to Mosaic Paint": "Willkommen bei Mosaic Paint",
    "Design a mosaic: draw lines or lay a tile pattern, then paint the tiles. Everything is measured in real millimetres.": "Entwerfen Sie ein Mosaik: Zeichnen Sie Linien oder legen Sie ein Fliesenmuster und bemalen Sie dann die Fliesen. Alles wird in echten Millimetern gemessen.",
    "Draw": "Zeichnen",
    "The tools are on the left: lines and shapes, the tile pattern, and the paint bucket that fills a tile with one click.": "Die Werkzeuge sind links: Linien und Formen, das Fliesenmuster und der Farbeimer, der eine Fliese mit einem Klick füllt.",
    "Pick a color in the palette, then click tiles with the bucket. Palettes are shared with the raster app.": "Wählen Sie eine Farbe in der Palette und klicken Sie mit dem Farbeimer auf Fliesen. Die Paletten sind mit der Raster-App gemeinsam.",
    "When it is done": "Wenn es fertig ist",
    "Report gives a shopping list, 3D… a model to print, Share a link. Expert mode adds printing at real size and laying plans.": "Übersicht liefert eine Einkaufsliste, 3D… ein Modell zum Drucken, Teilen einen Link. Der Expertenmodus ergänzt Drucken in Originalgröße und Verlegepläne.",
    "Start from an example": "Mit einem Beispiel beginnen",
    "Not sure where to begin? Open an example. The ? button shows this guide again.": "Nicht sicher, wo Sie anfangen sollen? Öffnen Sie ein Beispiel. Die Schaltfläche ? zeigt diese Anleitung erneut.",
    "Pixel heart": "Pixelherz",
    "16 × 16 pixel art – every pixel a tile. Try 3D… or Print.": "16 × 16 Pixel-Art – jedes Pixel eine Fliese. Probieren Sie 3D… oder Drucken.",
    "heart": "herz",
    "Heart": "Herz",
    "Sunset mosaic": "Sonnenuntergang-Mosaik",
    "A picture made into tiles with grout by “Make a mosaic…”. Try Open as vector tiles.": "Ein Bild, das mit „Mosaik erstellen…“ zu Fliesen mit Fugen wurde. Probieren Sie „Als Vektorfliesen öffnen“.",
    "sunset": "sonnenuntergang",
    "Sunset": "Sonnenuntergang",
    "Welcome to Mosaic Paint Raster": "Willkommen bei Mosaic Paint Raster",
    "Paint with pixels: pixel art, or a photo turned into a mosaic. Each pixel can become a tile.": "Malen Sie mit Pixeln: Pixel-Art oder ein Foto als Mosaik. Jedes Pixel kann eine Fliese werden.",
    "The tools are on the left: pencil, brush, bucket, lines, shapes and selection.": "Die Werkzeuge sind links: Stift, Pinsel, Farbeimer, Linien, Formen und Auswahl.",
    "Pick a color in the palette. Palettes are shared with the vector app.": "Wählen Sie eine Farbe in der Palette. Die Paletten sind mit der Vektor-App gemeinsam.",
    "Open a photo, then “Make a mosaic…” turns it into tiles with grout in your palette’s colors.": "Öffnen Sie ein Foto, dann macht „Mosaik erstellen…“ daraus Fliesen mit Fugen in den Farben Ihrer Palette.",
    "Examples": "Beispiele",
    "Open an example to see how it is made, or to start from it. Your current work is kept in History.": "Öffnen Sie ein Beispiel, um zu sehen, wie es gemacht ist, oder um darauf aufzubauen. Ihre aktuelle Arbeit bleibt im Verlauf.",
    "Back": "Zurück",
    "{k} of {n}": "{k} von {n}",
    "Next": "Weiter",
    "Examples…": "Beispiele…",
    "Example projects to open": "Beispielprojekte zum Öffnen",
    "A short guide to the app": "Eine kurze Anleitung zur App",
    "Guide": "Anleitung",
    "Working… {p} %": "Arbeite… {p} %",
    "Your photo": "Ihr Foto",
    "Load a photo and turn it into tiles – smaller where it has detail.": "Laden Sie ein Foto und machen Sie Fliesen daraus – kleinere, wo es Details hat.",
    "Read the G-code your slicer made and check it against this plan: filament changes, filaments and heights": "Den G-Code Ihres Slicers lesen und mit diesem Plan vergleichen: Filamentwechsel, Filamente und Höhen",
    "Check G-code…": "G-Code prüfen…",
    "Change to {color} at Z {z} mm": "Wechsel zu {color} bei Z {z} mm",
    "No filament change to {color} at Z {z} mm": "Kein Filamentwechsel zu {color} bei Z {z} mm",
    "A filament change the plan does not have, at Z {z} mm": "Ein Filamentwechsel, den der Plan nicht hat, bei Z {z} mm",
    "The top is at {z} mm, as planned": "Die Oberkante liegt wie geplant bei {z} mm",
    "The top is at {found} mm instead of {z} mm": "Die Oberkante liegt bei {found} mm statt bei {z} mm",
    "Filament {k} ({color}) is not used – assign it to the part “{k} {color}”": "Filament {k} ({color}) wird nicht verwendet – ordnen Sie es dem Teil „{k} {color}“ zu",
    "Filament {k} ({color}) prints up to {z} mm": "Filament {k} ({color}) druckt bis {z} mm",
    "Filament {k} ({color}) prints up to {found} mm instead of {z} mm": "Filament {k} ({color}) druckt bis {found} mm statt bis {z} mm",
    "No printing found in {name} – is it a G-code file?": "In {name} wird nichts gedruckt – ist das eine G-Code-Datei?",
    "{name}: {n} {n|thing|things} to look at": "{name}: {n} {n|Punkt|Punkte} zu prüfen",
    "{name}: everything matches the plan": "{name}: alles passt zum Plan",
    "Reading the G-code…": "G-Code wird gelesen…",
    "Reading the G-code… {p} %": "G-Code wird gelesen… {p} %",
    "Could not read {name}.": "{name} lässt sich nicht lesen.",
    "{name} is {w} × {h} px – painting on it and making mosaics will be slow. Scale it down to {W} × {H} px?": "{name} ist {w} × {h} px groß – Malen und Mosaike darauf werden langsam. Auf {W} × {H} px verkleinern?",
    "It has many colors: “Reduce to palette” or “Make a mosaic…” turn them into a few you can buy tiles in.": "Es hat viele Farben: „Auf Palette reduzieren“ oder „Mosaik erstellen…“ machen daraus wenige, in denen Sie Fliesen kaufen können.",
    "{n} {n|color|colors}": "{n} {n|Farbe|Farben}",
    "Unpin – it may be cleared with old versions": "Lösen – kann mit alten Versionen gelöscht werden",
    "Pin – kept when old versions are cleared": "Anheften – bleibt, wenn alte Versionen gelöscht werden",
    "Name this version": "Diese Version benennen",
    "Name of this version:": "Name dieser Version:",
    "Share link": "Link zum Teilen",
    "What’s new": "Neuigkeiten",
    "Version {v} – what’s new": "Version {v} – Neuigkeiten",
    "Updated to version {v} – click v{v} in the corner to see what’s new.": "Auf Version {v} aktualisiert – klicken Sie unten in der Ecke auf v{v}, um die Neuigkeiten zu sehen.",
    "The raster app: paint with pixels, turn photos into mosaics, and copy pictures between both apps.": "Die Raster-App: Malen mit Pixeln, Fotos als Mosaik und Bilder zwischen beiden Apps kopieren.",
    "3D print: a 3D preview, models for multi-filament printers (AMS, MMU), a frame, rounded corners, a hanging hole and magnet pockets – and a check of the sliced G-code against the plan.": "3D-Druck: eine 3D-Vorschau, Modelle für Mehrfilament-Drucker (AMS, MMU), ein Rahmen, abgerundete Ecken, ein Aufhängeloch und Magnetvertiefungen – und eine Prüfung des G-Codes aus dem Slicer gegen den Plan.",
    "Examples to start from, and a short guide for newcomers.": "Beispiele zum Loslegen und eine kurze Anleitung für Einsteiger.",
    "German, Slovak and Polish.": "Deutsch, Slowakisch und Polnisch.",
    "Heavy work – mosaics, tracing, 3D models – no longer holds up the page.": "Aufwendige Arbeit – Mosaike, Nachzeichnen, 3D-Modelle – hält die Seite nicht mehr auf.",
    "History: name and pin versions; see their size and colors.": "Verlauf: Versionen benennen und anheften; ihre Größe und Farben sehen.",
    "Big images can be scaled down when opened.": "Große Bilder lassen sich beim Öffnen verkleinern.",
    "Better keyboard and screen-reader support.": "Bessere Unterstützung für Tastatur und Bildschirmleser.",
    "The vector editor: lines, tile patterns, the paint bucket, palettes, reports, printing at real size and sharing as a link.": "Der Vektor-Editor: Linien, Fliesenmuster, der Farbeimer, Paletten, Übersichten, Drucken in Originalgröße und Teilen per Link.",
    "Could not sign in to Discord.": "Anmeldung bei Discord fehlgeschlagen.",
    "Post to the channel": "In den Kanal posten",
    "Post the picture in this channel, as a reply to the message it came from": "Das Bild in diesem Kanal posten, als Antwort auf die Nachricht, aus der es stammt",
    "That image is no longer available in Discord.": "Dieses Bild ist in Discord nicht mehr verfügbar.",
    "Right-click an image in the chat › Apps › Edit image to edit it here – or open or paste one.": "Rechtsklick auf ein Bild im Chat › Apps › Edit image, um es hier zu bearbeiten – oder öffnen oder fügen Sie eines ein.",
    "Posted to the channel.": "In den Kanal gepostet.",
    "The picture is too big for Discord – make it smaller (Image › Resize image).": "Das Bild ist zu groß für Discord – verkleinern Sie es (Bild › Bildgröße ändern).",
    "Could not reach the server.": "Der Server ist nicht erreichbar.",
    "Could not connect to Discord.": "Keine Verbindung zu Discord.",
    "Open the editor with “Edit image” (or the app’s launch button) in this chat to post here – or use Copy and paste the picture.": "Öffnen Sie den Editor mit „Edit image“ (oder der Startschaltfläche der App) in diesem Chat, um hier zu posten – oder nutzen Sie Kopieren und fügen Sie das Bild ein.",
    "More than 15 minutes have passed, and Discord no longer lets the app post. Use Copy and paste the picture into the chat.": "Es sind mehr als 15 Minuten vergangen, und Discord lässt die App nicht mehr posten. Nutzen Sie Kopieren und fügen Sie das Bild in den Chat ein.",
    "Discord did not take the picture. Use Copy and paste it into the chat.": "Discord hat das Bild nicht angenommen. Nutzen Sie Kopieren und fügen Sie es in den Chat ein.",
    "Select the part to keep with the Select tool (V), then crop.": "Wählen Sie mit dem Auswahlwerkzeug (V) den Teil aus, der bleiben soll, und schneiden Sie dann zu.",
    "The image is all one color – nothing to trim.": "Das Bild ist ganz einfarbig – nichts zum Beschneiden.",
    "There is no border to trim.": "Es gibt keinen Rand zum Beschneiden.",
    "Trimmed to {w} × {h} px.": "Auf {w} × {h} px beschnitten.",
    "Pen pressure changes the size": "Stiftdruck ändert die Größe",
    "Tip": "Spitze",
    "Round": "Rund",
    "Soft (airbrush)": "Weich (Airbrush)",
    "Spray": "Sprühdose",
    "Calligraphy": "Kalligrafie",
    "Chalk": "Kreide",
    "The shape of the brush and eraser": "Die Form von Pinsel und Radierer",
    "The angle of the calligraphy nib – 45° for right-handed writing, about 135° for left-handed": "Der Winkel der Kalligrafiefeder – 45° für Rechtshänder, etwa 135° für Linkshänder",
    "curve through points": "Kurve durch Punkte",
    "B-spline": "B-Spline",
    "cubic Bézier": "kubische Bézierkurve",
    "quadratic Bézier": "quadratische Bézierkurve",
    "ellipse": "Ellipse",
    "Drag from corner to corner (or from the center) · Shift: a circle · Alt: no snap": "Von Ecke zu Ecke ziehen (oder vom Mittelpunkt) · Umschalt: ein Kreis · Alt: ohne Einrasten",
    "Click the curve’s points · click the first point to close it · double-click or Enter ends it open · Backspace removes the last point · Esc cancels": "Die Punkte der Kurve anklicken · Klick auf den ersten Punkt schließt sie · Doppelklick oder Eingabe beendet sie offen · Rücktaste entfernt den letzten Punkt · Esc bricht ab",
    "Turn on “Fill” or “Outline” for shapes.": "Schalten Sie bei Formen „Füllung“ oder „Kontur“ ein.",
    "Drag from corner to corner (or from the center) · Shift: a circle": "Von Ecke zu Ecke ziehen (oder vom Mittelpunkt) · Umschalt: ein Kreis",
    "The curve runs smoothly through every point you click.": "Die Kurve verläuft glatt durch jeden Punkt, den Sie anklicken.",
    "The curve is pulled towards each point but only touches the first and the last – very smooth, good for flowing lines.": "Jeder Punkt zieht die Kurve an, sie berührt aber nur den ersten und den letzten – sehr glatt, gut für fließende Linien.",
    "Click a point, two control points, the next point, two control points … The curve passes through every third point; the control points (round) pull it.": "Klicken Sie einen Punkt, zwei Kontrollpunkte, den nächsten Punkt, zwei Kontrollpunkte … Die Kurve geht durch jeden dritten Punkt; die Kontrollpunkte (rund) ziehen sie an.",
    "Click a point, a control point, the next point, a control point … The curve passes through every other point; the control points (round) pull it.": "Klicken Sie einen Punkt, einen Kontrollpunkt, den nächsten Punkt, einen Kontrollpunkt … Die Kurve geht durch jeden zweiten Punkt; die Kontrollpunkte (rund) ziehen sie an.",
    "Ellipse": "Ellipse",
    "From corner": "Von der Ecke",
    "Shift: a circle. Select it to drag its axis ends.": "Umschalt: ein Kreis. Ausgewählt lassen sich die Enden ihrer Achsen ziehen.",
    "Curve": "Kurve",
    "Type": "Art",
    "Smooth, through the points": "Glatt, durch die Punkte",
    "Smooth, near the points (B-spline)": "Glatt, nahe den Punkten (B-Spline)",
    "Bézier, cubic": "Bézier, kubisch",
    "Bézier, quadratic": "Bézier, quadratisch",
    "Ellipse – Shift: circle (O)": "Ellipse – Umschalt: Kreis (O)",
    "Curve – click its points (C)": "Kurve – ihre Punkte anklicken (C)",
    "Shift: a circle.": "Umschalt: ein Kreis.",
    "An open curve is a line in the paint color, as thick as the size; a closed one is filled and outlined like the shapes.": "Eine offene Kurve ist eine Linie in der Malfarbe, so dick wie die Größe; eine geschlossene wird wie die Formen gefüllt und umrandet.",
    "Ellipses and curves in both apps: the Ellipse tool (O, Shift for a circle) and the Curve tool (C) – smooth through the points, smooth near them (B-spline), or cubic and quadratic Bézier.": "Ellipsen und Kurven in beiden Apps: das Werkzeug Ellipse (O, mit Umschalt ein Kreis) und das Werkzeug Kurve (C) – glatt durch die Punkte, glatt nahe den Punkten (B-Spline) oder kubische und quadratische Bézierkurve.",
    "In the vector app, ellipses and curves stay exact curves: drag their points or axis ends to change them, and paint, cut and mirror them like any tile.": "In der Vektor-App bleiben Ellipsen und Kurven exakte Kurven: Ziehen Sie ihre Punkte oder Achsenenden, um sie zu ändern, und malen, schneiden und spiegeln Sie sie wie jede Fliese.",
    "Shift+B": "Umschalt+B",
    "Next brush tip": "Nächste Pinselspitze",
    "Brush tip: {tip}": "Pinselspitze: {tip}",
    "Brush tips for the brush and the eraser: soft (airbrush), spray, calligraphy and chalk. Shift+B switches between them.": "Spitzen für Pinsel und Radierer: weich (Airbrush), Sprühdose, Kalligrafie und Kreide. Umschalt+B wechselt zwischen ihnen.",
    "The spray keeps spraying while you hold it still, like an airbrush; the calligraphy nib’s angle can be set (also for left-handed writing).": "Die Sprühdose sprüht weiter, während Sie sie still halten, wie eine Airbrush; der Winkel der Kalligrafiefeder lässt sich einstellen (auch für Linkshänder).",
    "Keep proportions": "Seitenverhältnis beibehalten",
    "Flip ↔": "Spiegeln ↔",
    "Flip ↕": "Spiegeln ↕",
    "Rotate by": "Drehen um",
    "Rotate": "Drehen",
    "Crop to selection": "Auf Auswahl zuschneiden",
    "Trim edges": "Ränder beschneiden",
    "With a graphics tablet or stylus, the brush, pencil and eraser paint thinner the lighter you press": "Mit einem Grafiktablett oder Stift malen Pinsel, Stift und Radierer umso dünner, je leichter Sie drücken",
    "Rotate 90° to the left": "Um 90° nach links drehen",
    "Rotate 90° to the right": "Um 90° nach rechts drehen",
    "Flip left ↔ right": "Links ↔ rechts spiegeln",
    "Flip upside down": "Auf den Kopf stellen",
    "Rotate by any angle (clockwise; negative: to the left) – the canvas grows to hold the picture": "Um einen beliebigen Winkel drehen (im Uhrzeigersinn; negativ: nach links) – die Leinwand wächst mit",
    "Keep only the selection (select it with the Select tool first)": "Nur die Auswahl behalten (zuerst mit dem Auswahlwerkzeug auswählen)",
    "Cut off the empty or one-color border around the picture": "Den leeren oder einfarbigen Rand um das Bild abschneiden",
    "Edit images from a Discord chat: right-click › Apps › Edit image, draw on it, post it back – in the raster or the vector app.": "Bilder aus einem Discord-Chat bearbeiten: Rechtsklick › Apps › Edit image, darauf zeichnen, zurückposten – in der Raster- oder der Vektor-App.",
    "Pen pressure: with a graphics tablet or stylus, the brush, pencil and eraser paint thinner the lighter you press.": "Stiftdruck: Mit einem Grafiktablett oder Stift malen Pinsel, Stift und Radierer umso dünner, je leichter Sie drücken.",
    "Image editing in the raster app: rotate (by 90° or any angle), flip, crop to the selection, trim the border, resize keeping proportions.": "Bildbearbeitung in der Raster-App: drehen (um 90° oder einen beliebigen Winkel), spiegeln, auf die Auswahl zuschneiden, den Rand beschneiden, Größe mit Seitenverhältnis ändern.",
    "Choose a color": "Farbe wählen",
    "Saturation and brightness": "Sättigung und Helligkeit",
    "Hue": "Farbton",
    "Before": "Vorher",
    "Color code": "Farbcode",
    "Also add it to the palette": "Auch zur Palette hinzufügen",
    "Use this color": "Diese Farbe verwenden",
    "Choose…": "Wählen…",
    "Choose any color: a color area, a hue slider and a color code": "Beliebige Farbe wählen: Farbfläche, Farbton-Regler und Farbcode",
    "Fill color – used by the paint bucket. Click to choose any color": "Füllfarbe – für den Farbeimer. Klicken, um eine beliebige Farbe zu wählen",
    "Stroke color – used for new lines and polygons. Click to choose any color": "Linienfarbe – für neue Linien und Polygone. Klicken, um eine beliebige Farbe zu wählen",
    "Paint color – brush, pencil, lines, polygons and the bucket. Click to choose any color": "Malfarbe – Pinsel, Stift, Linien, Polygone und Farbeimer. Klicken, um eine beliebige Farbe zu wählen",
    "Outline color – the outline of polygons. Click to choose any color": "Umrissfarbe – der Umriss von Polygonen. Klicken, um eine beliebige Farbe zu wählen",
    "Choose any color: a color area, a hue slider and a color code (Choose… under the palette, or click the current colors).": "Beliebige Farbe wählen: Farbfläche, Farbton-Regler und Farbcode (Wählen… unter der Palette, oder auf die aktuellen Farben klicken).",
    "Inside Discord: New, Save as, renaming and the other questions work (they are asked in the page now), and switching between the apps keeps the Post button.": "In Discord: Neu, Speichern unter, Umbenennen und die anderen Fragen funktionieren (sie werden jetzt auf der Seite gestellt), und beim Wechsel zwischen den Apps bleibt die Schaltfläche zum Posten erhalten.",
    "On phones inside Discord, the top bar stays clear of Discord’s own controls.": "Auf Handys in Discord bleibt die obere Leiste frei von Discords eigenen Bedienelementen.",
    "Quick menu": "Schnellmenü",
    "Undo": "Rückgängig",
    "Redo": "Wiederholen",
    "Fit to the screen": "An den Bildschirm anpassen",
    "Which color": "Welche Farbe",
    "Choose any color": "Beliebige Farbe wählen",
    "The palette is empty – use + to choose a color.": "Die Palette ist leer – mit + eine Farbe wählen.",
    "Tip: double-tap the drawing for a quick menu – tools, colors and size.": "Tipp: Zweimal auf die Zeichnung tippen öffnet ein Schnellmenü – Werkzeuge, Farben und Größe.",
    "Quick menu on phones and tablets: double-tap the drawing with a finger for undo, the main tools, colors and size – right where you draw.": "Schnellmenü auf Handys und Tablets: zweimal mit dem Finger auf die Zeichnung tippen – Rückgängig, die wichtigsten Werkzeuge, Farben und Größe, genau dort, wo du zeichnest.",
    "Tap or click where to copy from.": "Tippe oder klicke dorthin, wovon kopiert werden soll.",
    "Tap the image where to copy from": "Tippe ins Bild, wovon kopiert werden soll",
    "Copying from {x}, {y}": "Kopiert von {x}, {y}",
    "No source yet: the first tap sets it": "Noch keine Quelle: das erste Tippen legt sie fest",
    "Source set – now paint where the copy goes.": "Quelle gesetzt – jetzt dort malen, wo die Kopie hin soll.",
    "Clone": "Klonen",
    "Set source": "Quelle festlegen",
    "Aligned – the source follows the brush": "Ausgerichtet – die Quelle folgt dem Pinsel",
    "Set where to copy from, then paint where the copy should go. Drag the source disc to move it. Size, tip and opacity are the brush's.": "Lege fest, wovon kopiert wird, und male dann dort, wo die Kopie hin soll. Die Quellscheibe lässt sich ziehen. Größe, Spitze und Deckkraft sind die des Pinsels.",
    "Clone – paint with a copy of another part of the image · Alt+click or the first tap sets where to copy from (S)": "Klonen – mit einer Kopie eines anderen Bildteils malen · Alt+Klick oder das erste Tippen legt fest, wovon kopiert wird (S)",
    "The next tap or click sets where to copy from (or Alt+click)": "Das nächste Tippen oder Klicken legt fest, wovon kopiert wird (oder Alt+Klick)",
    "On: the source moves along with the brush from stroke to stroke. Off: every stroke starts copying from the source": "An: die Quelle wandert von Strich zu Strich mit dem Pinsel. Aus: jeder Strich kopiert wieder ab der Quelle",
    "Clone tool in the raster app (S): paint with a copy of another part of the image. Tap (or Alt+click) where to copy from, paint the copy, drag the source disc with a finger to move it; aligned or not, with the brush’s size, tip, opacity and pen pressure.": "Klon-Werkzeug in der Raster-App (S): mit einer Kopie eines anderen Bildteils malen. Tippen (oder Alt+Klick), wovon kopiert wird, die Kopie malen, die Quellscheibe mit dem Finger verschieben; ausgerichtet oder nicht, mit Größe, Spitze, Deckkraft und Stiftdruck des Pinsels.",
    "Adjust colors": "Farben anpassen",
    "Stretch the picture’s tones to the full range": "Die Tonwerte des Bildes auf den vollen Umfang strecken",
    "Auto": "Automatisch",
    "Reset": "Zurücksetzen",
    "Hold to see the picture as it was": "Gedrückt halten, um das Bild wie vorher zu sehen",
    "Colors adjusted.": "Farben angepasst.",
    "Heal": "Reparieren",
    "Adjust colors…": "Farben anpassen…",
    "Select, Brush, Pencil, Eraser, Clone, Heal, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan": "Auswahl, Pinsel, Stift, Radierer, Klonen, Reparieren, Linie, Polygon, Ellipse, Kurve, Farbeimer, Farbe aufnehmen, Verschieben",
    "Heal – like Clone, but the copy takes the color and light of the place you paint: for blemishes, spots and scratches (J)": "Reparieren – wie Klonen, aber die Kopie übernimmt Farbe und Licht der Stelle, an der du malst: für Makel, Flecken und Kratzer (J)",
    "Brightness, contrast, saturation, levels, sharpening and noise smoothing – for the selection or the whole image": "Helligkeit, Kontrast, Sättigung, Tonwerte, Schärfen und Rauschglättung – für die Auswahl oder das ganze Bild",
    "Photo fixes in the raster app: Adjust colors… – brightness, contrast, saturation, levels with Auto, sharpening and noise smoothing, previewed live (hold Before to compare).": "Fotokorrekturen in der Raster-App: Farben anpassen… – Helligkeit, Kontrast, Sättigung, Tonwerte mit Automatisch, Schärfen und Rauschglättung, mit Live-Vorschau (Vorher gedrückt halten zum Vergleichen).",
    "Heal brush (J): paints over blemishes, spots and scratches with texture from elsewhere, in the color and light of the spot.": "Reparatur-Pinsel (J): übermalt Makel, Flecken und Kratzer mit Struktur von anderswo, in Farbe und Licht der Stelle.",
    "Filling from the surroundings…": "Wird aus der Umgebung gefüllt…",
    "Removed.": "Entfernt.",
    "Could not fill it: {why}": "Füllen nicht möglich: {why}",
    "Select what to remove first.": "Wähle zuerst aus, was entfernt werden soll.",
    "Select": "Auswahl",
    "Rectangle": "Rechteck",
    "Lasso": "Lasso",
    "Magnetic": "Magnetisch",
    "Wand": "Zauberstab",
    "Add": "Hinzufügen",
    "Subtract": "Abziehen",
    "Drag inside the selection to move it. Copy, Clear, Fill from surroundings and Adjust colors follow its shape.": "Innerhalb der Auswahl ziehen, um sie zu verschieben. Kopieren, Löschen, Aus der Umgebung füllen und Farben anpassen folgen ihrer Form.",
    "Paint over what should disappear; when you lift, it is filled from the picture around it. Works best on backgrounds – grass, sky, walls, skin.": "Übermale, was verschwinden soll; beim Loslassen wird es aus dem umgebenden Bild gefüllt. Am besten auf Hintergründen – Gras, Himmel, Wände, Haut.",
    "Fill with": "Füllen mit",
    "Surroundings (built in)": "Umgebung (eingebaut)",
    "AI (add-on)": "KI (Add-on)",
    "Fill from surroundings": "Aus der Umgebung füllen",
    "Select, Brush, Pencil, Eraser, Clone, Heal, Remove, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan": "Auswahl, Pinsel, Stift, Radierer, Klonen, Reparieren, Entfernen, Linie, Polygon, Ellipse, Kurve, Farbeimer, Farbe aufnehmen, Verschieben",
    "Shift / Alt + select": "Umschalt / Alt + Auswahl",
    "Add to / take away from the selection": "Zur Auswahl hinzufügen / von ihr abziehen",
    "Remove – paint over something to make it disappear: it is filled from the picture around it (R)": "Entfernen – übermale etwas, damit es verschwindet: es wird aus dem umgebenden Bild gefüllt (R)",
    "Shape": "Form",
    "A rectangle: drag across": "Ein Rechteck: darüber ziehen",
    "Freehand: draw around it": "Freihand: drumherum zeichnen",
    "Draw roughly along an edge – the line snaps to it": "Grob an einer Kante entlang zeichnen – die Linie rastet daran ein",
    "Tap a color: everything similar next to it (or anywhere)": "Auf eine Farbe tippen: alles Ähnliche daneben (oder überall)",
    "New selection": "Neue Auswahl",
    "Replace the selection": "Die Auswahl ersetzen",
    "Add to the selection (or hold Shift)": "Zur Auswahl hinzufügen (oder Umschalt halten)",
    "Take away from the selection (or hold Alt)": "Von der Auswahl abziehen (oder Alt halten)",
    "The selected part disappears: filled from the picture around it": "Der ausgewählte Teil verschwindet: aus dem umgebenden Bild gefüllt",
    "Shaped selections: Lasso, Magnetic (snaps to edges) and Wand (by color), with New / Add / Subtract (or Shift / Alt) – copy, clear, move and Adjust colors follow the shape.": "Auswahlen jeder Form: Lasso, Magnetisch (rastet an Kanten ein) und Zauberstab (nach Farbe), mit Neu / Hinzufügen / Abziehen (oder Umschalt / Alt) – Kopieren, Löschen, Verschieben und Farben anpassen folgen der Form.",
    "Removing things: the Remove brush (R) and Fill from surroundings for a selection fill the spot with the picture around it – content-aware, on the device.": "Dinge entfernen: der Entfernen-Pinsel (R) und Aus der Umgebung füllen für eine Auswahl füllen die Stelle mit dem umgebenden Bild – inhaltsbasiert, auf dem Gerät.",
    "Text": "Text",
    "Type here": "Hier tippen",
    "Font": "Schrift",
    "List the fonts installed on this computer (the browser asks first)": "Die auf diesem Computer installierten Schriften auflisten (der Browser fragt zuerst)",
    "More fonts…": "Weitere Schriften…",
    "Style": "Stil",
    "Bold": "Fett",
    "Italic": "Kursiv",
    "Alignment": "Ausrichtung",
    "Left": "Links",
    "Center": "Mittig",
    "Right": "Rechts",
    "Shadow": "Schatten",
    "The text is in the paint color, its outline in the outline color. Drag it into place, then press Enter or tap outside it.": "Der Text hat die Malfarbe, sein Umriss die Umrissfarbe. Ziehe ihn an seinen Platz und drücke dann Enter oder tippe daneben.",
    "{n} fonts listed.": "{n} Schriften aufgelistet.",
    "The browser did not list the fonts.": "Der Browser hat die Schriften nicht aufgelistet.",
    "Drag the text into place, then press Enter or tap outside it.": "Ziehe den Text an seinen Platz und drücke dann Enter oder tippe daneben.",
    "Tap where to copy from (or Alt+click), then paint the copy · drag the source disc to move it": "Tippe, wovon kopiert wird (oder Alt+Klick), dann male die Kopie · die Quellscheibe lässt sich ziehen",
    "Tap where to copy from (or Alt+click), then paint over the spot – it blends in when you lift": "Tippe, wovon kopiert wird (oder Alt+Klick), dann übermale die Stelle – beim Loslassen fügt sie sich ein",
    "Paint over what should disappear – it is filled from the surroundings when you lift": "Übermale, was verschwinden soll – beim Loslassen wird es aus der Umgebung gefüllt",
    "Tap to add text · drag it into place · tap it to edit · Enter places it": "Tippen fügt Text hinzu · an seinen Platz ziehen · antippen zum Bearbeiten · Enter setzt ihn",
    "Select, Brush, Pencil, Eraser, Clone, Heal, Remove, Text, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan": "Auswahl, Pinsel, Stift, Radierer, Klonen, Reparieren, Entfernen, Text, Linie, Polygon, Ellipse, Kurve, Farbeimer, Farbe aufnehmen, Verschieben",
    "Text – tap to type; fonts, outline, shadow and curved text (T)": "Text – tippen und schreiben; Schriften, Umriss, Schatten und gebogener Text (T)",
    "Text tool in the raster app (T): any font (also the installed ones, where the browser lists them), size, bold, italic, alignment, outline, shadow and curved text. It floats until placed – drag it, tap it to edit.": "Text-Werkzeug in der Raster-App (T): jede Schrift (auch die installierten, wo der Browser sie auflistet), Größe, fett, kursiv, Ausrichtung, Umriss, Schatten und gebogener Text. Er schwebt, bis er gesetzt wird – ziehen, antippen zum Bearbeiten.",
    "The AI could not start in this browser.": "Die KI konnte in diesem Browser nicht starten.",
    "Starting the AI…": "KI wird gestartet…",
    "The AI could not do it: {why}": "Die KI konnte es nicht: {why}",
    "Looking at the picture…": "Das Bild wird angesehen…",
    "Nothing found there – tap the middle of the object.": "Dort wurde nichts gefunden – tippe in die Mitte des Objekts.",
    "the AI add-on is not downloaded": "das KI-Add-on ist nicht heruntergeladen",
    "Remove background": "Hintergrund entfernen",
    "What is in the picture?": "Was ist auf dem Bild?",
    "People (portraits)": "Menschen (Porträts)",
    "Any subject (objects, animals, products)": "Beliebiges Motiv (Gegenstände, Tiere, Produkte)",
    "Each needs a one-time download – the size is shown before anything is downloaded. Everything runs on this device.": "Jedes braucht einen einmaligen Download – die Größe wird angezeigt, bevor etwas heruntergeladen wird. Alles läuft auf diesem Gerät.",
    "Select the subject": "Das Motiv auswählen",
    "Finding the subject…": "Das Motiv wird gesucht…",
    "The subject is selected.": "Das Motiv ist ausgewählt.",
    "Background removed.": "Hintergrund entfernt.",
    "Could not load the text recognition.": "Die Texterkennung konnte nicht geladen werden.",
    "Reading the text…": "Der Text wird gelesen…",
    "Text in the picture": "Text im Bild",
    "You can correct it here before copying.": "Du kannst ihn hier vor dem Kopieren korrigieren.",
    "Copied.": "Kopiert.",
    "Select the text and copy it (Ctrl+C).": "Markiere den Text und kopiere ihn (Strg+C).",
    "No text found.": "Kein Text gefunden.",
    "3D relief": "3D-Relief",
    "A 3D-printable relief of the picture (STL): from its brightness, or from the depth an AI sees in a photo.": "Ein 3D-druckbares Relief des Bildes (STL): aus seiner Helligkeit oder aus der Tiefe, die eine KI in einem Foto sieht.",
    "Brightness – light is high": "Helligkeit – hell ist hoch",
    "Brightness – dark is high (a lithophane: hold it against light)": "Helligkeit – dunkel ist hoch (eine Lithophanie: gegen das Licht halten)",
    "Depth (AI add-on) – near is high": "Tiefe (KI-Add-on) – nah ist hoch",
    "Relief": "Relief",
    "Low": "Niedrig",
    "Medium": "Mittel",
    "High": "Hoch",
    "Smoothing": "Glättung",
    "Height map: white is high": "Höhenkarte: weiß ist hoch",
    "Save STL": "STL speichern",
    "Working out the depth…": "Die Tiefe wird ermittelt…",
    "{w} × {h} mm, {z} mm high": "{w} × {h} mm, {z} mm hoch",
    "Saved relief.stl.": "relief.stl gespeichert.",
    "Select object (AI)": "Objekt auswählen (KI)",
    "Tap an object to select it.": "Ein Objekt antippen, um es auszuwählen.",
    "Object removal (AI)": "Objekte entfernen (KI)",
    "Remove fills the spot with a trained model – better on objects and structure than the built-in fill.": "Entfernen füllt die Stelle mit einem trainierten Modell – besser bei Objekten und Strukturen als die eingebaute Füllung.",
    "Background removal – people": "Hintergrund entfernen – Menschen",
    "Removes the background behind people (portraits).": "Entfernt den Hintergrund hinter Menschen (Porträts).",
    "Background removal – any subject": "Hintergrund entfernen – beliebiges Motiv",
    "Removes the background behind the main subject: objects, animals, products.": "Entfernt den Hintergrund hinter dem Hauptmotiv: Gegenstände, Tiere, Produkte.",
    "Read text (OCR)": "Text lesen (OCR)",
    "Recognizes text in the image, to copy it.": "Erkennt Text im Bild, um ihn zu kopieren.",
    "Depth for 3D relief (AI)": "Tiefe für 3D-Relief (KI)",
    "Estimates the depth of a photo for a 3D-printable relief.": "Schätzt die Tiefe eines Fotos für ein 3D-druckbares Relief.",
    "Download failed ({status}).": "Download fehlgeschlagen ({status}).",
    "This needs a one-time download of {size}.": "Dafür ist ein einmaliger Download von {size} nötig.",
    "That includes the AI engine ({size}), shared by all AI add-ons.": "Das enthält die KI-Engine ({size}), die alle KI-Add-ons teilen.",
    "It is kept in this browser and works offline afterwards; the Add-ons list in the side panel removes it again. Everything runs on this device – your pictures are not uploaded.": "Es bleibt in diesem Browser und funktioniert danach auch offline; die Add-on-Liste in der Seitenleiste entfernt es wieder. Alles läuft auf diesem Gerät – deine Bilder werden nicht hochgeladen.",
    "Download {size}": "{size} herunterladen",
    "Downloading…": "Wird heruntergeladen…",
    "{name} is ready.": "{name} ist bereit.",
    "Could not download it: {why}": "Download nicht möglich: {why}",
    "installed": "installiert",
    "Download": "Herunterladen",
    "Used by add-ons: {size}. Sizes include the shared AI engine where it is not downloaded yet.": "Von Add-ons belegt: {size}. Die Größen enthalten die gemeinsame KI-Engine, solange sie nicht heruntergeladen ist.",
    "Removed the add-on.": "Add-on entfernt.",
    "Object (AI)": "Objekt (KI)",
    "Remove background…": "Hintergrund entfernen…",
    "Read text…": "Text lesen…",
    "3D relief…": "3D-Relief…",
    "Add-ons": "Add-ons",
    "Features that need a one-time download. Nothing is downloaded until you agree; everything runs on this device.": "Funktionen, die einen einmaligen Download brauchen. Nichts wird heruntergeladen, bevor du zustimmst; alles läuft auf diesem Gerät.",
    "Tap an object: the AI selects it (an add-on – asks before downloading)": "Ein Objekt antippen: die KI wählt es aus (ein Add-on – fragt vor dem Download)",
    "Make the background transparent, or select the subject (an AI add-on – asks before downloading)": "Den Hintergrund transparent machen oder das Motiv auswählen (ein KI-Add-on – fragt vor dem Download)",
    "Recognize the text in the image or the selection, to copy it (an add-on – asks before downloading)": "Den Text im Bild oder in der Auswahl erkennen, um ihn zu kopieren (ein Add-on – fragt vor dem Download)",
    "A 3D-printable relief (STL) from the picture's brightness, or from AI depth": "Ein 3D-druckbares Relief (STL) aus der Helligkeit des Bildes oder aus KI-Tiefe",
    "Add-ons that run on your device, each downloaded only after you agree to its size: Select object (tap it), AI object removal, background removal, Read text (OCR) and depth for 3D reliefs. The side panel lists them and removes them again.": "Add-ons, die auf deinem Gerät laufen und erst nach Zustimmung zu ihrer Größe heruntergeladen werden: Objekt auswählen (antippen), KI-Objektentfernung, Hintergrund entfernen, Text lesen (OCR) und Tiefe für 3D-Reliefs. Die Seitenleiste listet sie auf und entfernt sie wieder.",
    "3D relief…: a printable relief (STL) from the picture's brightness – or a lithophane – or from AI depth.": "3D-Relief…: ein druckbares Relief (STL) aus der Helligkeit des Bildes – oder eine Lithophanie – oder aus KI-Tiefe.",
    "Layer {n}": "Ebene {n}",
    "Saved as one picture – Save layers (.ora) in the Layers section keeps the layers.": "Als ein Bild gespeichert – Ebenen speichern (.ora) im Bereich Ebenen behält die Ebenen.",
    "The last layer can’t be deleted.": "Die letzte Ebene kann nicht gelöscht werden.",
    "There is no layer under this one.": "Unter dieser Ebene liegt keine.",
    "Name of the layer:": "Name der Ebene:",
    "Hide this layer": "Diese Ebene ausblenden",
    "Show this layer": "Diese Ebene einblenden",
    "Show {name}": "{name} anzeigen",
    "Saved {name} with {n} {n|layer|layers}.": "{name} mit {n} {n|Ebene|Ebenen} gespeichert.",
    "Opened {name} ({n} {n|layer|layers}).": "{name} geöffnet ({n} {n|Ebene|Ebenen}).",
    "Could not read this OpenRaster file.": "Diese OpenRaster-Datei konnte nicht gelesen werden.",
    "Merge down": "Nach unten zusammenfügen",
    "Flatten": "Auf eine Ebene reduzieren",
    "Save layers (.ora)": "Ebenen speichern (.ora)",
    "Painting and the other tools work on the active layer. Tap a layer to make it active, double-click to rename. Save keeps the picture as it looks; Save layers keeps the layers.": "Malen und die anderen Werkzeuge wirken auf die aktive Ebene. Tippe eine Ebene an, um sie zu aktivieren, Doppelklick benennt sie um. Speichern sichert das Bild, wie es aussieht; Ebenen speichern behält die Ebenen.",
    "Layers (.ora)": "Ebenen (.ora)",
    "Layers – the top one first": "Ebenen – die oberste zuerst",
    "A new, empty layer above this one": "Eine neue, leere Ebene über dieser",
    "A copy of this layer": "Eine Kopie dieser Ebene",
    "Move this layer up": "Diese Ebene nach oben",
    "Move up": "Nach oben",
    "Move this layer down": "Diese Ebene nach unten",
    "Move down": "Nach unten",
    "Delete this layer": "Diese Ebene löschen",
    "Put this layer onto the one under it": "Diese Ebene auf die darunter legen",
    "All the layers as one": "Alle Ebenen zu einer",
    "Save every layer in one file (OpenRaster – GIMP, Krita and others open it); Open… opens it again": "Alle Ebenen in einer Datei speichern (OpenRaster – GIMP, Krita und andere öffnen sie); Öffnen… öffnet sie wieder",
    "Layers in the raster app: paint on the active layer, show / hide, opacity, move, merge, flatten – undo knows them all. Save layers keeps them in an OpenRaster file (.ora – GIMP and Krita open it), and autosave keeps them too.": "Ebenen in der Raster-App: auf die aktive Ebene malen, ein- / ausblenden, Deckkraft, verschieben, zusammenfügen, reduzieren – Rückgängig kennt alles. Ebenen speichern behält sie in einer OpenRaster-Datei (.ora – GIMP und Krita öffnen sie), und das automatische Speichern auch.",
    "The AI add-ons on phones: much less memory (no more crash on iPhone when selecting an object) – the CPU engine on iPhone and iPad, and one feature's models at a time.": "Die KI-Add-ons auf Handys: viel weniger Speicher (kein Absturz mehr beim Auswählen eines Objekts auf dem iPhone) – auf iPhone und iPad die CPU-Engine, und immer nur die Modelle einer Funktion.",
    "Frame {n} of {count}": "Bild {n} von {count}",
    "{s} s of {total} s": "{s} s von {total} s",
    "Choose a frame": "Bild auswählen",
    "One frame back": "Ein Bild zurück",
    "Play / pause": "Abspielen / Pause",
    "One frame on": "Ein Bild weiter",
    "Use this frame": "Dieses Bild verwenden",
    "This video can’t be played here – try a GIF or a screenshot of it.": "Dieses Video lässt sich hier nicht abspielen – versuche ein GIF oder einen Screenshot davon.",
    "GIFs and videos: open one (or, in Discord, a GIF, a video or a Tenor / Giphy GIF from the chat) and choose the frame to edit – with a slider, frame steps and play.": "GIFs und Videos: öffne eines (in Discord auch ein GIF, ein Video oder ein Tenor- / Giphy-GIF aus dem Chat) und wähle das Bild zum Bearbeiten – mit Schieberegler, Einzelbildschritten und Abspielen.",
    "Everything was selected – now nothing is.": "Alles war ausgewählt – jetzt nichts mehr.",
    "Invert": "Umkehren",
    "Select the other shapes instead (Ctrl+I)": "Stattdessen die anderen Formen auswählen (Strg+I)",
    "Adjust": "Anpassen",
    "Invert selection": "Auswahl umkehren",
    "Invert the selection": "Die Auswahl umkehren",
    "Brightness, contrast, warmth and the other photo sliders – for the selection or the whole image": "Helligkeit, Kontrast, Wärme und die anderen Foto-Regler – für die Auswahl oder das ganze Bild",
    "Select what isn't selected (Ctrl+I)": "Auswählen, was nicht ausgewählt ist (Strg+I)",
    "Light": "Licht",
    "Detail and effects": "Details und Effekte",
    "Levels": "Tonwerte",
    "Vibrance": "Dynamik",
    "Warmth": "Wärme",
    "Tint": "Farbton",
    "Fade": "Verblassen",
    "Vignette": "Vignette",
    "Black point": "Schwarzpunkt",
    "White point": "Weißpunkt",
    "Shadows": "Tiefen",
    "Highlights": "Lichter",
    "Midtones": "Mitteltöne",
    "Nicer icons for undo / redo, zoom, fit and help; Adjust is in the toolbar and the quick menu, with new sliders – shadows, highlights, warmth, tint, vibrance, fade and vignette. Invert selection (Ctrl+I) in both apps.": "Schönere Symbole für Rückgängig / Wiederholen, Zoom, Einpassen und Hilfe; Anpassen in der Leiste und im Schnellmenü, mit neuen Reglern – Tiefen, Lichter, Wärme, Farbton, Dynamik, Verblassen und Vignette. Auswahl umkehren (Strg+I) in beiden Apps.",
    "Select object (AI) no longer crashes on phones: it now uses MobileSAM, which needs a quarter of the memory (and is faster). Its download is larger (45 MB); the old model is removed.": "Objekt auswählen (KI) stürzt auf Handys nicht mehr ab: es nutzt jetzt MobileSAM, das ein Viertel des Speichers braucht (und schneller ist). Der Download ist größer (45 MB); das alte Modell wird entfernt.",
    "Import a picture": "Ein Bild importieren",
    "Put a picture from a file into this image – drag it into place, then press Enter (or tap outside it)": "Ein Bild aus einer Datei in dieses Bild setzen – an seinen Platz ziehen, dann Enter drücken (oder daneben tippen)",
    "Import… puts a picture from a file into the current image (also in the quick menu): it comes in floating, scaled to fit – drag it into place.": "Importieren… setzt ein Bild aus einer Datei ins aktuelle Bild (auch im Schnellmenü): es kommt schwebend, passend verkleinert – an seinen Platz ziehen.",
    "Two fingers on a selection": "Zwei Finger auf einer Auswahl",
    "Scale, turn and move it (spread, pinch, twist)": "Skalieren, drehen und verschieben (spreizen, zusammenziehen, drehen)",
    "Two fingers on a selection (or a pasted, imported picture or text) scale and turn it: spread or pinch, twist – and move it. It snaps upright and to its own size, and is always made from the original pixels, so it doesn’t blur. Elsewhere two fingers zoom the view as before.": "Zwei Finger auf einer Auswahl (oder einem eingefügten, importierten Bild oder Text) skalieren und drehen sie: spreizen oder zusammenziehen, drehen – und verschieben. Sie rastet aufrecht und bei der Originalgröße ein und entsteht immer aus den ursprünglichen Pixeln, wird also nicht unscharf. Anderswo zoomen zwei Finger die Ansicht wie bisher.",
    "On phones, the Select shapes (and other rows of choices) wrap onto a second line instead of cutting off the last one – Object (AI) can be tapped again.": "Auf Handys brechen die Auswahlformen (und andere Auswahlreihen) in eine zweite Zeile um, statt die letzte abzuschneiden – Objekt (KI) lässt sich wieder antippen."
  };

  // src/shared/i18n-sk.ts
  var SK = {
    "Picked {c}.": "Vybraná farba {c}.",
    "Picked {c} (not in the palette – add it with “From drawing”).": "Vybraná farba {c} (nie je v palete – pridajte ju tlačidlom „Z kresby“).",
    "No painted area under the cursor.": "Pod kurzorom nie je žiadna vyfarbená plocha.",
    "My palette": "Moja paleta",
    "Could not read this file as SVG.": "Tento súbor sa nedá načítať ako SVG.",
    "From file": "Zo súboru",
    "The file’s colors were added as the palette “{name}”.": "Farby zo súboru boli pridané ako paleta „{name}“.",
    "Discard unsaved changes to the current drawing?\n(A copy is kept in History.)": "Zahodiť neuložené zmeny v aktuálnej kresbe?\n(Kópia zostane v Histórii.)",
    "Before opening {name}": "Pred otvorením {name}",
    "Opened {name}": "Otvorené: {name}",
    "Saved {name}": "Uložené: {name}",
    "File name:": "Názov súboru:",
    "PNG width in pixels:": "Šírka PNG v pixeloch:",
    "Invalid width.": "Neplatná šírka.",
    "PNG export failed.": "Export do PNG zlyhal.",
    "Before starting a new drawing": "Pred založením novej kresby",
    "Applied the grout color and width to {n} {n|line|lines}.": "Farba a šírka škár bola použitá na {n} {n|čiaru|čiary|čiar}.",
    "Autosave failed – remember to save your file.": "Automatické ukladanie zlyhalo – nezabudnite súbor uložiť.",
    "Autosave": "Automatické uloženie",
    "Before restoring an older version": "Pred obnovením staršej verzie",
    "Restored the version from {time}": "Obnovená verzia z {time}",
    "Symmetry center set.": "Stred symetrie je nastavený.",
    "Snapping on": "Prichytávanie zapnuté",
    "Snapping off": "Prichytávanie vypnuté",
    "The clipboard has no color codes.": "V schránke nie sú žiadne kódy farieb.",
    "{n} {n|area|areas}": "{n} {n|plocha|plochy|plôch}",
    "fill": "výplň",
    "stroke": "obrys",
    "No color – the bucket erases with it": "Bez farby – vedro ňou maže",
    "Recolored {n} {n|element|elements}.": "Prefarbené: {n} {n|prvok|prvky|prvkov}.",
    "Click on the canvas to place the symmetry center.": "Kliknite na plátno a umiestnite stred symetrie.",
    "Photo unlocked: drag it with the Select tool (where there are no shapes).": "Fotka je odomknutá: presuňte ju nástrojom Výber (tam, kde nie sú tvary).",
    "Remove the tracing photo?": "Odstrániť fotku na obkreslenie?",
    "Invalid page size.": "Neplatná veľkosť stránky.",
    "1 drawing unit = 1 {unit}. Set the page size to the real size of your mosaic.": "1 jednotka kresby = 1 {unit}. Nastavte veľkosť stránky na skutočnú veľkosť mozaiky.",
    "Could not read that image.": "Obrázok sa nedá načítať.",
    "Photo loaded and locked. Unlock it to move it with the Select tool.": "Fotka je načítaná a zamknutá. Ak ju chcete posunúť nástrojom Výber, odomknite ju.",
    "Replace the photo to trace with the pasted image?": "Nahradiť fotku na obkreslenie vloženým obrázkom?",
    "The pasted image is now the photo to trace – “Make a mosaic from the photo” turns it into tiles.": "Vložený obrázok je teraz fotkou na obkreslenie – „Vytvoriť mozaiku z fotky“ z neho urobí dlaždice.",
    "Replace photo…": "Nahradiť fotku…",
    "Load photo…": "Načítať fotku…",
    "Close shape": "Uzavrieť tvar",
    "Done": "Hotovo",
    "Start the cut inside a closed area.": "Rez začnite vnútri uzavretej plochy.",
    "Click inside a closed area (or use “Fill whole page”).": "Kliknite dovnútra uzavretej plochy (alebo použite „Vyplniť celú stránku“).",
    "That would be about {n} tiles – make the tile size bigger.": "To by bolo asi {n} {n|dlaždica|dlaždice|dlaždíc} – zväčšite veľkosť dlaždíc.",
    "The tiles are bigger than this area.": "Dlaždice sú väčšie ako táto plocha.",
    "This adds {n} lines, which may make editing slow. Continue?": "Pribudne {n} {n|čiara|čiary|čiar}, čo môže spomaliť úpravy. Pokračovať?",
    "Added the pattern “{type}” ({n} {n|line|lines}).": "Pridaný vzor „{type}“ ({n} {n|čiara|čiary|čiar}).",
    "The rows are wider than this area – use a smaller size.": "Rady sú širšie ako táto plocha – použite menšiu veľkosť.",
    "This area is too narrow for a row of that width.": "Táto plocha je na rad takej šírky príliš úzka.",
    "Added {rows} {rows|row line|row lines} and {cuts} {cuts|cut|cuts} following the outline.": "Pridané {rows} {rows|čiara radu|čiary radov|čiar radov} a {cuts} {cuts|rez|rezy|rezov} pozdĺž obrysu.",
    "Painted areas are locked or hidden (see Layers).": "Vyfarbené plochy sú zamknuté alebo skryté (pozri Vrstvy).",
    "No closed area here. The red circles show line ends that don’t touch anything.": "Tu nie je uzavretá plocha. Červené krúžky ukazujú konce čiar, ktoré sa ničoho nedotýkajú.",
    "No closed area here – make sure the lines meet.": "Tu nie je uzavretá plocha – skontrolujte, či sa čiary stretávajú.",
    "Click to select (Shift adds) · drag to move – the nearest corner snaps · drag handles to edit; shared corners move together (Alt detaches) · yellow handles resize a polygon": "Kliknutím vyberiete (Shift pridá) · ťahaním posuniete – prichytí sa najbližší roh · ťahaním úchytov upravíte; spoločné rohy sa posúvajú spolu (Alt ich oddelí) · žlté úchyty menia veľkosť mnohouholníka",
    "Click–click or drag · ends snap to points and onto other lines · Shift: 15° steps · Alt: no snap · Esc: stop": "Klik–klik alebo ťahanie · konce sa prichytia k bodom a na iné čiary · Shift: kroky po 15° · Alt: bez prichytávania · Esc: koniec",
    "Click corner by corner · click the first corner, double-click or press Enter to close · Backspace removes the last corner · Esc cancels": "Klikajte roh po rohu · tvar uzavriete kliknutím na prvý roh, dvojklikom alebo klávesom Enter · Backspace odoberie posledný roh · Esc zruší",
    "Drag from the center (or along an edge in “From edge” mode) · click = last size · Shift: 15° rotation · Ctrl: flip side · keys 3–9: sides": "Ťahajte zo stredu (alebo pozdĺž hrany v režime „Od hrany“) · kliknutie = posledná veľkosť · Shift: otočenie po 15° · Ctrl: prevrátiť stranu · klávesy 3–9: počet strán",
    "Drag across a tile to cut it straight through, edge to edge · Shift: 15° steps": "Ťahajte cez dlaždicu a rozrežte ju rovno od hrany k hrane · Shift: kroky po 15°",
    "Click inside a closed area to fill it with the chosen pattern": "Kliknite dovnútra uzavretej plochy a vyplňte ju zvoleným vzorom",
    "Click or drag across tiles to paint them · click again to recolor · ∅ swatch erases · Alt+click: pick a color": "Kliknutím alebo ťahaním cez dlaždice ich vyfarbíte · ďalším kliknutím prefarbíte · vzorkovník ∅ maže · Alt+klik: vybrať farbu",
    "Drag to pan · mouse wheel zooms": "Ťahaním posuniete pohľad · koliesko myši približuje",
    "The lines layer is locked or hidden (see Layers).": "Vrstva čiar je zamknutá alebo skrytá (pozri Vrstvy).",
    "About {n} tiles – too many, use a bigger tile size.": "Asi {n} {n|dlaždica|dlaždice|dlaždíc} – priveľa, použite väčšie dlaždice.",
    "About {n} tiles.": "Asi {n} {n|dlaždica|dlaždice|dlaždíc}.",
    "Load a photo first.": "Najprv načítajte fotku.",
    "That gives {n} tiles – use a bigger tile size.": "To dáva {n} {n|dlaždicu|dlaždice|dlaždíc} – použite väčšie dlaždice.",
    "Before making a mosaic from the photo": "Pred vytvorením mozaiky z fotky",
    "From photo": "Z fotky",
    "New palette “{name}” with {n} {n|color|colors}.": "Nová paleta „{name}“ s {n} {n|farbou|farbami|farbami}.",
    "Made a mosaic of {n} tiles from the photo.": "Z fotky vznikla mozaika z {n} {n|dlaždice|dlaždíc|dlaždíc}.",
    "Working…": "Pracujem…",
    "Make mosaic": "Vytvoriť mozaiku",
    "Versions are kept in this browser: every few minutes while you work, and before you open, start or restore another drawing. Restoring keeps your current drawing as a version too.": "Verzie sa ukladajú v tomto prehliadači: počas práce každých pár minút a tiež predtým, ako otvoríte, založíte alebo obnovíte inú kresbu. Pri obnovení sa aj aktuálna kresba uloží ako verzia.",
    "No versions yet. A version is kept every few minutes while you work, and before you open or start another drawing.": "Zatiaľ žiadne verzie. Verzia sa ukladá počas práce každých pár minút a predtým, ako otvoríte alebo založíte inú kresbu.",
    "{n} painted {n|area|areas}": "{n} {n|vyfarbená plocha|vyfarbené plochy|vyfarbených plôch}",
    "Saved by hand": "Uložené ručne",
    "This browser can’t copy images – use PNG to save one instead.": "Tento prehliadač nevie kopírovať obrázky – uložte si namiesto toho PNG.",
    "Copied the drawing as an image – paste it into the raster app or any other program.": "Kresba je skopírovaná ako obrázok – vložte ju do rastrovej aplikácie alebo do akéhokoľvek programu.",
    "Could not copy the image (the browser refused).": "Obrázok sa nedá skopírovať (prehliadač to odmietol).",
    "{n} {n|panel|panels} ({rows} × {cols}) · each printed at real size on {s} {paper} {s|sheet|sheets}.": "{n} {n|panel|panely|panelov} ({rows} × {cols}) · každý vytlačený v skutočnej veľkosti na {s} {s|list|listy|listov} {paper}.",
    "laying plan: {n} {n|panel|panels} ({rows} rows × {cols} columns) of {w} × {h} {unit}": "plán kladenia: {n} {n|panel|panely|panelov} ({rows} radov × {cols} stĺpcov) s veľkosťou {w} × {h} {unit}",
    "Panel {n} – row {row}, column {col}": "Panel {n} – rad {row}, stĺpec {col}",
    "Panel {n}": "Panel {n}",
    "Panel": "Panel",
    "tiles per panel and color": "dlaždice podľa panelov a farieb",
    "laying plan": "plán kladenia",
    "{c} – click to remove from the mix": "{c} – kliknutím odstránite zo zmesi",
    "Shift+click two or more swatches to put them in the mix.": "Shift+kliknite na dva alebo viac vzorkovníkov a pridajte ich do zmesi.",
    "Each tile gets one of these {n} colors at random. Shift+click swatches to change the mix.": "Každá dlaždica dostane náhodne jednu z týchto {n} farieb. Shift+klikom na vzorkovníky zmes zmeníte.",
    "Put at least two colors in the mix first (Shift+click swatches).": "Najprv dajte do zmesi aspoň dve farby (Shift+klik na vzorkovníky).",
    "Mixed the colors of {n} {n|area|areas}.": "Premiešané farby {n} {n|plochy|plôch|plôch}.",
    "Select painted areas first.": "Najprv vyberte vyfarbené plochy.",
    "Cut {n} {n|shape|shapes}. Paste with Ctrl+V – also in another page or drawing.": "Vystrihnuté: {n} {n|tvar|tvary|tvarov}. Vložte pomocou Ctrl+V – aj na inú stránku alebo do inej kresby.",
    "Copied {n} {n|shape|shapes}. Paste with Ctrl+V – also in another page or drawing.": "Skopírované: {n} {n|tvar|tvary|tvarov}. Vložte pomocou Ctrl+V – aj na inú stránku alebo do inej kresby.",
    "Pasted {n} {n|shape|shapes}.": "Vložené: {n} {n|tvar|tvary|tvarov}.",
    "Could not store the motifs.": "Motívy sa nedajú uložiť.",
    "No motifs yet. Select some shapes and save them.": "Zatiaľ žiadne motívy. Vyberte nejaké tvary a uložte ich.",
    "{name} – click, then click on the drawing to place it": "{name} – kliknite a potom kliknutím do kresby motív umiestnite",
    "Delete this motif": "Zmazať tento motív",
    "Delete the motif “{name}”?": "Zmazať motív „{name}“?",
    "Select the shapes of the motif first (Select tool).": "Najprv vyberte tvary motívu (nástroj Výber).",
    "Name of the motif:": "Názov motívu:",
    "Motif {n}": "Motív {n}",
    "Saved the motif “{name}”.": "Motív „{name}“ je uložený.",
    "This motif could not be read.": "Tento motív sa nedá načítať.",
    "Placed “{name}”. Click again for another one, R turns it, Esc stops.": "Umiestnený motív „{name}“. Ďalším kliknutím pridáte ďalší, R otáča, Esc končí.",
    "Click to place the motif · R: turn it by 15° (Shift+R: 90°) · Esc: stop": "Kliknutím umiestnite motív · R: otočiť o 15° (Shift+R: o 90°) · Esc: koniec",
    "There are no motifs to export yet.": "Zatiaľ nie sú žiadne motívy na export.",
    "Imported {n} {n|motif|motifs}.": "Importované: {n} {n|motív|motívy|motívov}.",
    "No motifs found in that file.": "V tom súbore nie sú žiadne motívy.",
    "That file is not a motif library.": "Ten súbor nie je knižnica motívov.",
    "Page {n}": "Stránka {n}",
    "{name} copy": "{name} – kópia",
    "Page name:": "Názov stránky:",
    "A project needs at least one page.": "Projekt musí mať aspoň jednu stránku.",
    "Delete the page “{name}”? (A copy of the project is kept in History.)": "Zmazať stránku „{name}“? (Kópia projektu zostane v Histórii.)",
    "Before deleting the page {name}": "Pred zmazaním stránky {name}",
    "Rename…": "Premenovať…",
    "Duplicate": "Duplikovať",
    "Move left": "Posunúť doľava",
    "Move right": "Posunúť doprava",
    "Delete…": "Zmazať…",
    "Double-click to rename": "Dvojklikom premenujete",
    "Switch to this page": "Prepnúť na túto stránku",
    "Page options": "Možnosti stránky",
    "Load a photo first (Photo section).": "Najprv načítajte fotku (sekcia Fotka na obkreslenie).",
    "The palette is empty – add colors first.": "Paleta je prázdna – najprv pridajte farby.",
    "Colored {n} {n|area|areas} with the closest palette colors": "Vyfarbené {n} {n|plocha|plochy|plôch} najbližšími farbami palety",
    "{n} already painted (left as they were)": "{n} už {n|bola vyfarbená|boli vyfarbené|bolo vyfarbených} (bez zmeny)",
    "{n} outside the photo": "{n} mimo fotky",
    "colors": "farby",
    "The browser blocked the print window – allow pop-ups for this page.": "Prehliadač zablokoval okno tlače – povoľte pre túto stránku vyskakovacie okná.",
    "Nothing to import from the raster app.": "Z rastrovej aplikácie nie je čo importovať.",
    "Opened {n} tiles from the raster app – your previous drawing is in History.": "Otvorené {n} {n|dlaždica|dlaždice|dlaždíc} z rastrovej aplikácie – predchádzajúca kresba je v Histórii.",
    "<b>{n}</b> painted {n|area|areas} in <b>{c}</b> {c|color|colors}": "<b>{n}</b> {n|vyfarbená plocha|vyfarbené plochy|vyfarbených plôch} v <b>{c}</b> {c|farbe|farbách|farbách}",
    "<b>{n}</b> not painted yet": "<b>{n}</b> ešte nevyfarbené",
    "everything is painted": "všetko je vyfarbené",
    "page {w} × {h} {unit}": "stránka {w} × {h} {unit}",
    "Color": "Farba",
    "Areas": "Plochy",
    "Total area": "Celková plocha",
    "Share": "Zdieľať",
    "Pieces of the size set above, plus waste": "Kusy s veľkosťou nastavenou vyššie, vrátane odpadu",
    "Pieces to buy": "Kusov na kúpu",
    "Replace with": "Nahradiť za",
    "Erase": "Zmazať",
    "Nothing is painted yet. Use the paint bucket, or “Color tiles from photo”.": "Zatiaľ nie je nič vyfarbené. Použite vedro alebo „Vyfarbiť dlaždice podľa fotky“.",
    "Recolored {n} {n|area|areas}.": "Prefarbené: {n} {n|plocha|plochy|plôch}.",
    "Erased {n} {n|area|areas}.": "Zmazané: {n} {n|plocha|plochy|plôch}.",
    "Colors that may look alike": "Farby, ktoré môžu vyzerať podobne",
    "{a} and {b} {how}": "{a} a {b} {how}",
    "The link would be {kb} KB – too long. Share the file instead, or leave out the photo.": "Odkaz by mal {kb} KB – to je priveľa. Zdieľajte radšej súbor alebo vynechajte fotku.",
    "The link is {kb} KB – long links can get cut off in some messengers; sharing the file is safer. Anyone with it can view the mosaic and make their own copy.": "Odkaz má {kb} KB – dlhé odkazy niektoré chatovacie aplikácie skracujú; bezpečnejšie je zdieľať súbor. Ktokoľvek s odkazom si mozaiku pozrie a môže si urobiť vlastnú kópiu.",
    "The link is {kb} KB. Anyone with it can view the mosaic and make their own copy.": "Odkaz má {kb} KB. Ktokoľvek s odkazom si mozaiku pozrie a môže si urobiť vlastnú kópiu.",
    "Sharing failed.": "Zdieľanie zlyhalo.",
    "Link copied.": "Odkaz je skopírovaný.",
    "This share link is damaged or incomplete.": "Tento odkaz je poškodený alebo neúplný.",
    "Before opening a shared mosaic": "Pred otvorením zdieľanej mozaiky",
    "This is now your own copy – it is saved in this browser like any drawing.": "Teraz je to vaša vlastná kópia – ukladá sa v tomto prehliadači ako každá kresba.",
    "Normal colors": "Bežné farby",
    "Black & white": "Čiernobielo",
    "Red-blind (protanopia)": "Necitlivosť na červenú (protanopia)",
    "Green-blind (deuteranopia)": "Necitlivosť na zelenú (deuteranopia)",
    "Blue-blind (tritanopia)": "Necitlivosť na modrú (tritanopia)",
    "look almost the same": "vyzerajú takmer rovnako",
    "in black & white": "čiernobielo",
    "for red-blind viewers": "pre ľudí necitlivých na červenú",
    "for green-blind viewers": "pre ľudí necitlivých na zelenú",
    "for blue-blind viewers": "pre ľudí necitlivých na modrú",
    "look alike {who}": "vyzerajú podobne {who}",
    "{n} {n|tile blends|tiles blend} into a neighbour of another color.": "{n} {n|dlaždica splýva|dlaždice splývajú|dlaždíc splýva} so susednou dlaždicou inej farby.",
    "{n} {n|tile blends|tiles blend} into a neighbour of another color (in this view).": "{n} {n|dlaždica splýva|dlaždice splývajú|dlaždíc splýva} so susednou dlaždicou inej farby (v tomto zobrazení).",
    "No tile blends into its neighbours.": "Žiadna dlaždica nesplýva so susednými.",
    "Sheet {sheet} – row {row}, column {col} of {cols} · blue strips are covered by the next sheet": "List {sheet} – rad {row}, stĺpec {col} z {cols} · modré pruhy prekryje ďalší list",
    "One {paper} sheet ({orientation}), at {pct} % of the real size.": "Jeden list {paper} ({orientation}), {pct} % skutočnej veľkosti.",
    "One {paper} sheet ({orientation}) at real size.": "Jeden list {paper} ({orientation}) v skutočnej veľkosti.",
    "{n} {paper} {n|sheet|sheets} ({orientation}, {rows} × {cols}, overlapping {overlap} mm) at real size.": "{n} {n|list|listy|listov} {paper} ({orientation}, {rows} × {cols}, s prekrytím {overlap} mm) v skutočnej veľkosti.",
    "{n} sheets ({rows} × {cols}), real size {w} × {h} cm": "{n} listov ({rows} × {cols}), skutočná veľkosť {w} × {h} cm",
    "The picture has many colors: it is snapped to the current palette (use “Reduce to palette” to see the result first).": "Obrázok má veľa farieb: prevedie sa na aktuálnu paletu (výsledok si môžete najprv pozrieť cez „Previesť na paletu“).",
    "The picture has many colors: it is snapped to 8 colors suggested from it.": "Obrázok má veľa farieb: prevedie sa na 8 farieb navrhnutých z neho.",
    "Images": "Obrázky",
    "PNG image": "Obrázok PNG",
    "Discard unsaved changes to the current image?\n(Save it first if you want to keep it.)": "Zahodiť neuložené zmeny v aktuálnom obrázku?\n(Ak si ho chcete ponechať, najprv ho uložte.)",
    "Could not read {name} as an image.": "Súbor {name} sa nedá načítať ako obrázok.",
    "Opened {name} ({w} × {h} px).": "Otvorené: {name} ({w} × {h} px).",
    "Size of the new image in pixels (width × height):": "Veľkosť nového obrázka v pixeloch (šírka × výška):",
    "Enter a size like 800 × 600 (at most {max} px a side).": "Zadajte veľkosť ako 800 × 600 (najviac {max} px na stranu).",
    "Before starting a new image": "Pred založením nového obrázka",
    "That version could not be read.": "Túto verziu sa nedá načítať.",
    "Export failed.": "Export zlyhal.",
    "Autosave failed – remember to save your image.": "Automatické ukladanie zlyhalo – nezabudnite obrázok uložiť.",
    "The clipboard has no image or color codes.": "V schránke nie je obrázok ani kódy farieb.",
    "Versions are kept in this browser: every few minutes while you work, and before you open, start or restore another image. Restoring keeps your current image as a version too.": "Verzie sa ukladajú v tomto prehliadači: počas práce každých pár minút a tiež predtým, ako otvoríte, založíte alebo obnovíte iný obrázok. Pri obnovení sa aj aktuálny obrázok uloží ako verzia.",
    "No versions yet. A version is kept every few minutes while you work, and before you open or start another image.": "Zatiaľ žiadne verzie. Verzia sa ukladá počas práce každých pár minút a predtým, ako otvoríte alebo založíte iný obrázok.",
    "The palette is empty – add colors, or let the mosaic suggest some.": "Paleta je prázdna – pridajte farby alebo nechajte mozaiku nejaké navrhnúť.",
    "There is nothing to make a mosaic from (the area is transparent).": "Nie je z čoho urobiť mozaiku (plocha je priehľadná).",
    "From picture": "Z obrázka",
    "Made {n} {n|tile|tiles} in {c} {c|color|colors}.": "Vytvorené {n} {n|dlaždica|dlaždice|dlaždíc} v {c} {c|farbe|farbách|farbách}.",
    "The palette is empty.": "Paleta je prázdna.",
    "Every pixel now has a palette color: {n} {n|pixel|pixels} in {c} {c|color|colors}.": "Každý pixel má teraz farbu z palety: {n} {n|pixel|pixely|pixelov} v {c} {c|farbe|farbách|farbách}.",
    "At most about {n} tiles in the selection – bigger ones where the picture is calm.": "Najviac asi {n} {n|dlaždica|dlaždice|dlaždíc} vo výbere – kde je obrázok pokojný, budú väčšie.",
    "At most about {n} tiles – bigger ones where the picture is calm.": "Najviac asi {n} {n|dlaždica|dlaždice|dlaždíc} – kde je obrázok pokojný, budú väčšie.",
    "About {n} tiles in the selection.": "Asi {n} {n|dlaždica|dlaždice|dlaždíc} vo výbere.",
    "Turn on “Fill” or “Outline” for polygons.": "Pri mnohouholníkoch zapnite „Výplň“ alebo „Obrys“.",
    "Picked “transparent”.": "Vybraná „priehľadná“.",
    "Picked {c} (not in the palette – add it with “From image”).": "Vybraná farba {c} (nie je v palete – pridajte ju tlačidlom „Z obrázka“).",
    "{n} {n|pixel|pixels}": "{n} {n|pixel|pixely|pixelov}",
    "paint color": "farba maľovania",
    "outline color": "farba obrysu",
    "Transparent – paints and fills transparent pixels": "Priehľadná – maľuje a vypĺňa priehľadnými pixelmi",
    "Recolored {n} {n|pixel|pixels}.": "Prefarbené: {n} {n|pixel|pixely|pixelov}.",
    "Nothing to paste – or the browser didn’t allow reading the clipboard (try Ctrl+V).": "Nie je čo vložiť – alebo prehliadač nepovolil čítanie schránky (skúste Ctrl+V).",
    "Enter a size from 1 to {max} px.": "Zadajte veľkosť od 1 do {max} px.",
    "This picture has {n} pieces – too many to number. Make a mosaic or reduce it to the palette first.": "Obrázok má {n} {n|dielik|dieliky|dielikov} – to je na číslovanie priveľa. Najprv z neho urobte mozaiku alebo ho preveďte na paletu.",
    "{n} {n|piece|pieces}": "{n} {n|dielik|dieliky|dielikov}",
    "{n} {n|piece|pieces} in {c} {c|color|colors} · {w} × {h} px": "{n} {n|dielik|dieliky|dielikov} v {c} {c|farbe|farbách|farbách} · {w} × {h} px",
    "Nothing is painted yet.": "Zatiaľ nie je nič vyfarbené.",
    "{w} × {h} mm · {k} mm per pixel": "{w} × {h} mm · {k} mm na pixel",
    "Pieces": "Dieliky",
    "Pixels": "Pixely",
    "Area": "Plocha",
    "transparent": "priehľadná",
    "({w} × {h} px, not placed yet)": "({w} × {h} px, ešte neumiestnené)",
    "Cut the selection – paste it here, into the vector app or any other program.": "Výber je vystrihnutý – vložte ho sem, do vektorovej aplikácie alebo do akéhokoľvek programu.",
    "Cut the image – paste it here, into the vector app or any other program.": "Obrázok je vystrihnutý – vložte ho sem, do vektorovej aplikácie alebo do akéhokoľvek programu.",
    "Copied the selection – paste it here, into the vector app or any other program.": "Výber je skopírovaný – vložte ho sem, do vektorovej aplikácie alebo do akéhokoľvek programu.",
    "Copied the image – paste it here, into the vector app or any other program.": "Obrázok je skopírovaný – vložte ho sem, do vektorovej aplikácie alebo do akéhokoľvek programu.",
    "Cut the selection (this browser keeps it for pasting here only).": "Výber je vystrihnutý (tento prehliadač ho uchová len na vloženie sem).",
    "Cut the image (this browser keeps it for pasting here only).": "Obrázok je vystrihnutý (tento prehliadač ho uchová len na vloženie sem).",
    "Copied the selection (this browser keeps it for pasting here only).": "Výber je skopírovaný (tento prehliadač ho uchová len na vloženie sem).",
    "Copied the image (this browser keeps it for pasting here only).": "Obrázok je skopírovaný (tento prehliadač ho uchová len na vloženie sem).",
    "Select the part to keep first.": "Najprv vyberte časť, ktorú chcete ponechať.",
    "Could not read the pasted image.": "Vložený obrázok sa nedá načítať.",
    "The pasted image ({w} × {h}) is bigger than this one ({W} × {H}). Enlarge the canvas to fit it?": "Vložený obrázok ({w} × {h}) je väčší ako tento ({W} × {H}). Zväčšiť plátno, aby sa zmestil?",
    "Pasted {w} × {h} px – drag it into place, then press Enter (or click outside it).": "Vložené {w} × {h} px – presuňte na miesto a stlačte Enter (alebo kliknite mimo).",
    "The link would be {kb} KB – too long. Share the file instead (or make the image smaller).": "Odkaz by mal {kb} KB – to je priveľa. Zdieľajte radšej súbor (alebo obrázok zmenšite).",
    "The link is {kb} KB – long links can get cut off in some messengers; sharing the file is safer. Anyone with it can view the image and make their own copy.": "Odkaz má {kb} KB – dlhé odkazy niektoré chatovacie aplikácie skracujú; bezpečnejšie je zdieľať súbor. Ktokoľvek s odkazom si obrázok pozrie a môže si urobiť vlastnú kópiu.",
    "The link is {kb} KB. Anyone with it can view the image and make their own copy.": "Odkaz má {kb} KB. Ktokoľvek s odkazom si obrázok pozrie a môže si urobiť vlastnú kópiu.",
    "Before opening a shared image": "Pred otvorením zdieľaného obrázka",
    "This is now your own copy – it is saved in this browser like any image.": "Teraz je to vaša vlastná kópia – ukladá sa v tomto prehliadači ako každý obrázok.",
    "Drag to select · drag inside the selection to move it (Alt: a copy) · Enter places it · Ctrl+C / X / V copy, cut, paste": "Ťahaním vyberiete · ťahaním vo výbere ho posuniete (Alt: kópiu) · Enter ho umiestni · Ctrl+C / X / V kopírovať, vystrihnúť, vložiť",
    "Drag to paint · Shift: straight line · [ ] size · Shift+B: tip · Alt+click: pick a color": "Ťahaním maľujete · Shift: rovná čiara · [ ] veľkosť · Shift+B: hrot · Alt+klik: vybrať farbu",
    "Hard pixels in exact colors · Shift: straight line · [ ] size · Alt+click: pick a color": "Ostré pixely v presných farbách · Shift: rovná čiara · [ ] veľkosť · Alt+klik: vybrať farbu",
    "Drag to erase to transparent · Shift: straight line · [ ] size": "Ťahaním mažete do priehľadnosti · Shift: rovná čiara · [ ] veľkosť",
    "Drag a line · Shift: 15° steps": "Ťahajte čiaru · Shift: kroky po 15°",
    "Drag from the center · Shift: 15° rotation · keys 3–9: sides": "Ťahajte zo stredu · Shift: otočenie po 15° · klávesy 3–9: počet strán",
    "Click to fill the area of similar color · Alt+click: pick a color": "Kliknutím vyplníte plochu podobnej farby · Alt+klik: vybrať farbu",
    "Click to take a color from the image": "Kliknutím vezmete farbu z obrázka",
    "No grout – every piece is a tile": "Bez škár – každý dielik je dlaždica",
    "{n} {n|tile|tiles} at {w} × {h} mm – too many: make a mosaic or reduce the picture to the palette first.": "{n} {n|dlaždica|dlaždice|dlaždíc} na {w} × {h} mm – priveľa: najprv urobte mozaiku alebo preveďte obrázok na paletu.",
    "{n} {n|tile|tiles} at {w} × {h} mm.": "{n} {n|dlaždica|dlaždice|dlaždíc} na {w} × {h} mm.",
    "Could not hand the tiles over (browser storage unavailable).": "Dlaždice sa nedajú odovzdať (úložisko prehliadača nie je dostupné).",
    "3D print": "3D tlač",
    "Close": "Zavrieť",
    "A model where every color stands at its own height. Print it with one nozzle and change the filament at the layers listed below – each tile’s top then shows its color. The 3MF file already contains the filament changes for PrusaSlicer; for other slicers, the plan lists them.": "Model, v ktorom má každá farba svoju výšku. Vytlačte ho jednou tryskou a vo vrstvách uvedených nižšie vymeňte filament – horná plocha každej dlaždice potom má svoju farbu. Súbor 3MF už výmeny filamentu obsahuje pre PrusaSlicer; pre iné slicery ich nájdete v pláne.",
    "Size": "Veľkosť",
    "Size of the model’s smallest step – about your nozzle width": "Veľkosť najmenšieho kroku modelu – zhruba šírka vašej trysky",
    "Detail": "Detail",
    "Layer height": "Výška vrstvy",
    "How many layers each color gets – more layers cover the color below better": "Koľko vrstiev dostane každá farba – viac vrstiev lepšie prekryje farbu pod ňou",
    "Layers per color": "Vrstiev na farbu",
    "A plate under everything, printed in the first color. 0: unpainted parts are left open": "Doska pod všetkým, tlačená prvou farbou. 0: nevyfarbené miesta zostanú otvorené",
    "Base layers": "Vrstiev základu",
    "Top view of the model": "Pohľad na model zhora",
    "Print order (bottom first):": "Poradie tlače (odspodu):",
    "Lighter colors lower: a darker layer covers a lighter one well. Lines (grout) stay at the bottom": "Svetlejšie farby nižšie: tmavšia vrstva svetlejšiu dobre prekryje. Čiary (škáry) zostávajú dole",
    "Light → dark": "Svetlé → tmavé",
    "Dark → light": "Tmavé → svetlé",
    "Which filament to load at which layer, as a text file": "Ktorý filament v ktorej vrstve založiť, ako textový súbor",
    "Plan": "Plán",
    "Just the shape – add the filament changes from the plan in your slicer": "Len tvar – výmeny filamentu podľa plánu pridajte v sliceri",
    "The model, with the filament changes for PrusaSlicer": "Model aj s výmenami filamentu pre PrusaSlicer",
    "Download 3MF": "Stiahnuť 3MF",
    "{n} colors make a tall print with many filament changes – reduce the colors first (Raster: “Reduce to palette”).": "{n} {n|farba dáva|farby dávajú|farieb dáva} vysoký výtlačok s mnohými výmenami filamentu – najprv znížte počet farieb (Raster: „Previesť na paletu“).",
    "Detail lowered to {d} mm for this size.": "Detail znížený na {d} mm kvôli tejto veľkosti.",
    "lines": "čiary",
    "Print earlier (lower)": "Tlačiť skôr (nižšie)",
    "Print later (higher)": "Tlačiť neskôr (vyššie)",
    "{share} % · layers {from}–{to}": "{share} % · vrstvy {from}–{to}",
    "{share} % · layers {from}–{to} · change at Z {z}": "{share} % · vrstvy {from}–{to} · výmena vo výške Z {z}",
    "{n} {n|color|colors} · height {h} mm ({layers} {layers|layer|layers}) · {c} filament {c|change|changes}": "{n} {n|farba|farby|farieb} · výška {h} mm ({layers} {layers|vrstva|vrstvy|vrstiev}) · {c} {c|výmena|výmeny|výmen} filamentu",
    "unpainted parts stay at the base ({h} mm)": "nevyfarbené miesta zostanú vo výške základu ({h} mm)",
    "unpainted parts are left open": "nevyfarbené miesta zostanú otvorené",
    "Mosaic Paint – 3D print plan for {name}.3mf / {name}.stl": "Mosaic Paint – plán 3D tlače pre {name}.3mf / {name}.stl",
    "Size {w} × {h} mm · layer height {lh} mm · {lpc} layers per color · base {base} layers": "Veľkosť {w} × {h} mm · výška vrstvy {lh} mm · {lpc} vrstiev na farbu · základ {base} vrstiev",
    "Total height {total} mm ({layers} layers). Set the slicer’s first layer height to {lh} mm too.": "Celková výška {total} mm ({layers} vrstiev). Výšku prvej vrstvy v sliceri nastavte tiež na {lh} mm.",
    "Start with {color} – layers {from}–{to} (base plate included)": "Začnite farbou {color} – vrstvy {from}–{to} (vrátane základnej dosky)",
    "Start with {color} – layers {from}–{to}": "Začnite farbou {color} – vrstvy {from}–{to}",
    "Layer {layer} (Z {z} mm): change to {color} – layers {from}–{to}": "Vrstva {layer} (Z {z} mm): vymeňte za {color} – vrstvy {from}–{to}",
    "PrusaSlicer: the 3MF file already contains these changes – open it and check the layer slider.": "PrusaSlicer: súbor 3MF už tieto výmeny obsahuje – otvorte ho a skontrolujte posuvník vrstiev.",
    "Other slicers (they read only the shape from the 3MF or STL) – add the changes by hand:": "Iné slicery (z 3MF alebo STL načítajú len tvar) – výmeny pridajte ručne:",
    "- PrusaSlicer, Bambu Studio, OrcaSlicer: in the preview, move the layer slider to each Z above and click “+” (Add color change, M600).": "- PrusaSlicer, Bambu Studio, OrcaSlicer: v náhľade posuňte posuvník vrstiev na každú výšku Z vyššie a kliknite na „+“ (Pridať zmenu farby, M600).",
    "- Cura: Extensions › Post Processing › Modify G-Code › “Filament Change” at each layer number above.": "- Cura: Rozšírenia › Postprocessing › Upraviť G-kód › „Filament Change“ pri každom čísle vrstvy vyššie.",
    "- Multi-material printers (AMS, MMU): the same changes work; or assign the filaments to the color changes in the slicer.": "- Tlačiarne pre viac materiálov (AMS, MMU): fungujú rovnaké výmeny; alebo priraďte filamenty k zmenám farby v sliceri.",
    "Could not read the picture.": "Obrázok sa nedá načítať.",
    "Saved {name}.3mf ({n} triangles; PrusaSlicer reads its {c} filament {c|change|changes}, other slicers need the plan).": "Uložené {name}.3mf ({n} trojuholníkov; PrusaSlicer načíta {c} {c|výmenu|výmeny|výmen} filamentu, iné slicery potrebujú plán).",
    "Saved {name}.stl ({n} triangles). Add the filament changes from the plan in your slicer.": "Uložené {name}.stl ({n} trojuholníkov). Výmeny filamentu podľa plánu pridajte v sliceri.",
    "Reading the picture…": "Načítavam obrázok…",
    "History": "História",
    "Save a version now": "Uložiť verziu teraz",
    "Version history needs browser storage (IndexedDB), which is not available here.": "História verzií potrebuje úložisko prehliadača (IndexedDB), ktoré tu nie je dostupné.",
    "Restore": "Obnoviť",
    "Version saved.": "Verzia je uložená.",
    "Could not save a version (browser storage unavailable).": "Verziu sa nedá uložiť (úložisko prehliadača nie je dostupné).",
    "used by {what}": "použité: {what}",
    "Click: {fill} · Right-click: {stroke} · Double-click: edit": "Klik: {fill} · Pravý klik: {stroke} · Dvojklik: upraviť",
    "Remove from palette": "Odstrániť z palety",
    "Edit color (hex or any CSS color).\nThe drawing is recolored too.": "Upraviť farbu (hex alebo akákoľvek farba CSS).\nPrefarbí sa aj kresba.",
    "Not a valid color: {v}": "Neplatná farba: {v}",
    "Paste a color code (or several) into the box, then press Enter.": "Vložte do poľa kód farby (alebo niekoľko) a stlačte Enter.",
    "No color found in: {text}": "Nenašla sa žiadna farba v: {text}",
    "Added {n} {n|color|colors}.": "Pridané: {n} {n|farba|farby|farieb}.",
    "Already in the palette.": "Už je v palete.",
    "Added {n} {n|color|colors} from the clipboard.": "Zo schránky pridané: {n} {n|farba|farby|farieb}.",
    "Those colors are already in the palette.": "Tieto farby už v palete sú.",
    "Name of the new palette:": "Názov novej palety:",
    "Palette": "Paleta",
    "Created “{name}”. Paste colors to fill it.": "Vytvorená paleta „{name}“. Naplňte ju vložením farieb.",
    "Rename palette:": "Premenovať paletu:",
    "Delete the palette “{name}”? (The drawing is not changed.)": "Zmazať paletu „{name}“? (Kresba sa nezmení.)",
    "Added {n} {n|color|colors} from the drawing.": "Z kresby pridané: {n} {n|farba|farby|farieb}.",
    "No new colors in the drawing.": "V kresbe nie sú žiadne nové farby.",
    "Remove all colors from this palette? (The drawing is not changed.)": "Odstrániť z tejto palety všetky farby? (Kresba sa nezmení.)",
    "Imported {n} {n|color|colors}.": "Importované: {n} {n|farba|farby|farieb}.",
    "No new colors found in {name}": "V súbore {name} nie sú žiadne nové farby",
    "Installed – Mosaic Paint now works offline too.": "Nainštalované – Mosaic Paint teraz funguje aj offline.",
    "Simple": "Jednoduchý",
    "Expert": "Expert",
    "New": "Nový",
    "Open…": "Otvoriť…",
    "Save": "Uložiť",
    "Save as…": "Uložiť ako…",
    "Copy image": "Kopírovať obrázok",
    "Print…": "Tlač…",
    "Plan…": "Plán…",
    "Report": "Prehľad",
    "Contrast": "Kontrast",
    "Share of area": "Podiel plochy",
    "Install app": "Nainštalovať aplikáciu",
    "You are looking at a shared mosaic.": "Prezeráte si zdieľanú mozaiku.",
    "Make my own copy": "Urobiť si vlastnú kópiu",
    "Back to my drawing": "Späť k mojej kresbe",
    "Remove last corner": "Odstrániť posledný roh",
    "Cancel": "Zrušiť",
    "Colors": "Farby",
    "Fill": "Výplň",
    "Stroke": "Obrys",
    "Width": "Šírka",
    "Add color": "Pridať farbu",
    "Import…": "Importovať…",
    "From drawing": "Z kresby",
    "Export": "Exportovať",
    "Clear": "Vymazať",
    "Click a swatch = fill · right-click = stroke · double-click = edit (also recolors the drawing) · Shift+click = add to the color mix. Ctrl+V on the canvas adds copied colors.": "Klik na vzorkovník = výplň · pravý klik = obrys · dvojklik = upraviť (prefarbí aj kresbu) · Shift+klik = pridať do zmesi farieb. Ctrl+V na plátne pridá skopírované farby.",
    "Line": "Čiara",
    "Chain lines (next line starts at the last end)": "Nadväzovať čiary (ďalšia čiara začne na konci predchádzajúcej)",
    "Free polygon": "Voľný mnohouholník",
    "Click each corner. Click the first corner again, double-click or press Enter to close it.": "Kliknite na každý roh. Tvar uzavriete kliknutím na prvý roh, dvojklikom alebo klávesom Enter.",
    "Fill new shapes with the fill color": "Nové tvary vyplniť farbou výplne",
    "Regular polygon": "Pravidelný mnohouholník",
    "Sides": "Strany",
    "From center": "Zo stredu",
    "From edge": "Od hrany",
    "Knife": "Nôž",
    "Press inside a tile and drag in the direction of the cut. The tile is cut straight across, from edge to edge.": "Stlačte vnútri dlaždice a ťahajte v smere rezu. Dlaždica sa rozreže rovno od hrany k hrane.",
    "Pattern": "Vzor",
    "Angle": "Uhol",
    "Rows": "Rady",
    "Fill whole page": "Vyplniť celú stránku",
    "Click inside a closed area to fill it with tiles. Painted areas keep their color in every new tile. “Rows following the outline” lays rows along the area’s edge and around shapes inside it (Rows 0 = fill it).": "Kliknite dovnútra uzavretej plochy a vyplňte ju dlaždicami. Vyfarbené plochy si farbu ponechajú v každej novej dlaždici. „Rady pozdĺž obrysu“ kladú rady pozdĺž okraja plochy a okolo tvarov vnútri nej (Rady 0 = vyplniť celú).",
    "Paint bucket": "Vedro",
    "Click inside any closed area, or drag across many tiles. Click a painted area again to recolor it. The ∅ swatch erases. Alt+click picks a color.": "Kliknite do ľubovoľnej uzavretej plochy alebo ťahajte cez viac dlaždíc. Ďalším kliknutím vyfarbenú plochu prefarbíte. Vzorkovník ∅ maže. Alt+klik vyberie farbu.",
    "Mix colors (a random one per tile)": "Miešať farby (každá dlaždica náhodnú)",
    "Avoid the same color next to itself": "Nedávať rovnakú farbu vedľa seba",
    "Close gaps up to": "Uzatvárať medzery do",
    "Photo to trace": "Fotka na obkreslenie",
    "Opacity": "Krytie",
    "Show": "Zobraziť",
    "Locked": "Zamknuté",
    "Fit to page": "Prispôsobiť stránke",
    "Remove": "Odstrániť",
    "Keep the photo in saved files": "Ukladať fotku do súborov",
    "Make a mosaic from the photo…": "Vytvoriť mozaiku z fotky…",
    "Color my tiles from the photo": "Vyfarbiť moje dlaždice podľa fotky",
    "Only tiles that aren’t painted yet": "Len dlaždice, ktoré ešte nie sú vyfarbené",
    "Each tile gets the palette color closest to the photo underneath it. Draw the tile lines first.": "Každá dlaždica dostane farbu z palety najbližšiu fotke pod ňou. Najprv nakreslite čiary dlaždíc.",
    "Grout preview": "Náhľad škár",
    "Preview": "Náhľad",
    "Apply to all lines": "Použiť na všetky čiary",
    "Motifs": "Motívy",
    "Save selection…": "Uložiť výber…",
    "Click a motif, then click on the drawing to place it (R turns it, Esc stops). Ctrl+C / Ctrl+X / Ctrl+V copy shapes between pages, drawings and browser tabs.": "Kliknite na motív a potom kliknutím do kresby ho umiestnite (R otáča, Esc končí). Ctrl+C / Ctrl+X / Ctrl+V kopírujú tvary medzi stránkami, kresbami aj kartami prehliadača.",
    "Symmetry": "Symetria",
    "Off": "Vypnuté",
    "Mirror left ↔ right": "Zrkadliť vľavo ↔ vpravo",
    "Mirror top ↕ bottom": "Zrkadliť hore ↕ dole",
    "Mirror both ways": "Zrkadliť oboma smermi",
    "Rotate around center": "Otáčať okolo stredu",
    "Copies": "Kópie",
    "also mirrored": "aj zrkadlovo",
    "Pick center": "Vybrať stred",
    "Page center": "Stred stránky",
    "Lines, polygons, knife cuts and painting are repeated around the guides.": "Čiary, mnohouholníky, rezy nožom aj vyfarbovanie sa opakujú okolo vodidiel.",
    "Layers": "Vrstvy",
    "Lines & shapes": "Čiary a tvary",
    "Painted areas": "Vyfarbené plochy",
    "Photo": "Fotka",
    "Lock the lines while painting so they can’t be moved by accident.": "Pri vyfarbovaní čiary zamknite, aby sa omylom neposunuli.",
    "Snapping": "Prichytávanie",
    "Snap to points & lines": "Prichytávať k bodom a čiaram",
    "Shared corners move together": "Spoločné rohy sa posúvajú spolu",
    "Page edge counts as a line": "Okraj stránky sa počíta ako čiara",
    "Grid, size": "Mriežka, veľkosť",
    "Snaps to ends & corners ▢, crossings ✕, midpoints △, anywhere along a line ◇, centers ○. Hold Alt to place freely.": "Prichytáva ku koncom a rohom ▢, priesečníkom ✕, stredom úsečiek △, kamkoľvek na čiaru ◇ a stredom ○. So stlačeným Alt umiestňujete voľne.",
    "Selection": "Výber",
    "Radius": "Polomer",
    "Rotation°": "Otočenie°",
    "Line width": "Šírka čiary",
    "Delete": "Zmazať",
    "To front": "Dopredu",
    "To back": "Dozadu",
    "Mix colors": "Premiešať farby",
    "Page": "Stránka",
    "Apply": "Použiť",
    "Background": "Pozadie",
    "Show rulers": "Zobraziť pravítka",
    "Keyboard & mouse": "Klávesnica a myš",
    "Select, Line, Free polygon, Polygon, Ellipse, Curve, Pattern, Bucket, Pan": "Výber, Čiara, Voľný mnohouholník, Mnohouholník, Elipsa, Krivka, Vzor, Vedro, Posun",
    "Polygon sides": "Počet strán mnohouholníka",
    "Toggle snapping": "Zapnúť / vypnúť prichytávanie",
    "Alt": "Alt",
    "Draw / drag without snapping; detach a shared corner; Alt+click with the bucket picks a color": "Kresliť / ťahať bez prichytávania; oddeliť spoločný roh; Alt+klik vedrom vyberie farbu",
    "Shift": "Shift",
    "15° steps; add to selection": "Kroky po 15°; pridať k výberu",
    "Ctrl (polygon tool)": "Ctrl (nástroj mnohouholník)",
    "Flip side when drawing from an edge": "Pri kreslení od hrany prevrátiť stranu",
    "Ctrl + drag handle": "Ctrl + ťahanie úchytu",
    "Freely move a polygon corner (it stops being regular)": "Voľne posunúť roh mnohouholníka (prestane byť pravidelný)",
    "Enter / Esc": "Enter / Esc",
    "Finish / cancel the current shape": "Dokončiť / zrušiť rozkreslený tvar",
    "Del": "Del",
    "Delete selection (or the last corner of a free polygon)": "Zmazať výber (alebo posledný roh voľného mnohouholníka)",
    "Arrows": "Šípky",
    "Nudge (Shift = ×10)": "Posunúť (Shift = ×10)",
    "Undo / redo": "Späť / znova",
    "Copy, cut, paste shapes (also between pages and drawings). Ctrl+C with nothing selected copies the drawing as an image; pasting an image makes it the photo to trace": "Kopírovať, vystrihnúť, vložiť tvary (aj medzi stránkami a kresbami). Ctrl+C bez výberu skopíruje kresbu ako obrázok; vložený obrázok sa stane fotkou na obkreslenie",
    "Duplicate, select all": "Duplikovať, vybrať všetko",
    "Wheel, Space+drag": "Koliesko, medzerník+ťahanie",
    "Zoom, pan (two fingers on touch screens)": "Priblíženie, posun (na dotykových displejoch dvoma prstami)",
    "Fit page": "Celá stránka",
    "＋ Page": "＋ Stránka",
    "Colors & shopping list": "Farby a nákupný zoznam",
    "Piece size": "Veľkosť kusu",
    "Waste": "Odpad",
    "“Replace with” recolors every area of that color.": "„Nahradiť za“ prefarbí všetky plochy tej farby.",
    "Download CSV": "Stiahnuť CSV",
    "Print template": "Tlačová šablóna",
    "Opens a print page to use as a cutting or laying template.": "Otvorí stránku na tlač, ktorú použijete ako šablónu na rezanie alebo kladenie.",
    "Paper": "Papier",
    "Letter": "Letter",
    "Tabloid (11×17 in)": "Tabloid (11×17 palcov)",
    "Real size (split across several sheets if needed)": "Skutočná veľkosť (v prípade potreby na viac listov)",
    "Fit on one sheet": "Na jeden list",
    "In color": "Farebne",
    "In color, with color numbers": "Farebne, s číslami farieb",
    "Outlines with color numbers (paint by number)": "Obrysy s číslami farieb (maľovanka podľa čísel)",
    "Add a page with the color legend": "Pridať stránku s legendou farieb",
    "Mosaic from photo": "Mozaika z fotky",
    "Lays out tiles over the whole page and gives each tile the color of the photo underneath it.": "Rozloží dlaždice po celej stránke a každej dá farbu fotky pod ňou.",
    "First load a photo:": "Najprv načítajte fotku:",
    "Tiles": "Dlaždice",
    "Smaller tiles where the photo has detail": "Menšie dlaždice tam, kde má fotka detaily",
    "Use the current palette": "Použiť aktuálnu paletu",
    "Suggest": "Navrhnúť",
    "colors from the photo (new palette)": "farieb z fotky (nová paleta)",
    "Replace the current drawing (it is kept in History)": "Nahradiť aktuálnu kresbu (zostane v Histórii)",
    "Laying plan": "Plán kladenia",
    "Splits the mosaic into numbered panels – the size of your work surface or of the mesh sheets you lay the tiles on. The print has an overview, every panel at real size and the number of tiles of each color per panel.": "Rozdelí mozaiku na očíslované panely – s veľkosťou vašej pracovnej plochy alebo sietí, na ktoré dlaždice kladiete. Výtlačok obsahuje prehľad, každý panel v skutočnej veľkosti a počet dlaždíc každej farby v paneli.",
    "Panel size": "Veľkosť panelu",
    "Tabloid": "Tabloid",
    "Color numbers on the tiles": "Čísla farieb na dlaždiciach",
    "Show the panels on the drawing": "Zobraziť panely v kresbe",
    "The whole drawing is packed into the link itself – nothing is uploaded. Whoever opens it sees the mosaic and can make their own copy to edit.": "Celá kresba je zabalená priamo v odkaze – nič sa nikam nenahráva. Kto ho otvorí, uvidí mozaiku a môže si urobiť vlastnú kópiu na úpravy.",
    "Include the tracing photo (makes the link much longer)": "Pribaliť fotku na obkreslenie (odkaz bude oveľa dlhší)",
    "Share file…": "Zdieľať súbor…",
    "Copy link": "Kopírovať odkaz",
    "Switch app": "Prepnúť aplikáciu",
    "Vector: tiles as shapes. Raster: paint with pixels. Palettes are shared; copy and paste images between them.": "Vektor: dlaždice ako tvary. Raster: maľovanie pixelmi. Palety sú spoločné; obrázky medzi nimi kopírujte a vkladajte.",
    "Simple shows the essentials; Expert adds symmetry, layers, rulers, the knife, printing and fine settings": "Jednoduchý ukazuje to podstatné; Expert pridáva symetriu, vrstvy, pravítka, nôž, tlač a jemné nastavenia",
    "New drawing": "Nová kresba",
    "Open SVG (Ctrl+O) – you can also drop a file on the canvas": "Otvoriť SVG (Ctrl+O) – súbor môžete tiež pretiahnuť na plátno",
    "Save SVG (Ctrl+S)": "Uložiť SVG (Ctrl+S)",
    "Save as (Ctrl+Shift+S)": "Uložiť ako (Ctrl+Shift+S)",
    "Export a PNG image": "Exportovať obrázok PNG",
    "Export a 3D model for printing with filament changes – each color at its own height": "Exportovať 3D model na tlač s výmenami filamentu – každá farba vo svojej výške",
    "Copy the drawing (or the selected shapes) as an image – paste it into the raster app or any other program (Ctrl+C)": "Skopírovať kresbu (alebo vybrané tvary) ako obrázok – vložíte ho do rastrovej aplikácie alebo akéhokoľvek programu (Ctrl+C)",
    "Print a real-size template with color numbers": "Vytlačiť šablónu v skutočnej veľkosti s číslami farieb",
    "Split the mosaic into numbered panels and print a laying plan": "Rozdeliť mozaiku na očíslované panely a vytlačiť plán kladenia",
    "Colors used, areas and a shopping list": "Použité farby, plochy a nákupný zoznam",
    "Earlier versions of your drawing": "Staršie verzie vašej kresby",
    "Share the mosaic as a link": "Zdieľať mozaiku ako odkaz",
    "Undo (Ctrl+Z)": "Späť (Ctrl+Z)",
    "Redo (Ctrl+Y)": "Znova (Ctrl+Y)",
    "Zoom out (-)": "Oddialiť (-)",
    "Zoom in (+)": "Priblížiť (+)",
    "Fit page (0)": "Celá stránka (0)",
    "See the mosaic in black & white or as color-blind people see it (screen only)": "Zobraziť mozaiku čiernobielo alebo tak, ako ju vidia ľudia s poruchou farebného videnia (len na obrazovke)",
    "Mark tiles that blend into a neighbouring tile of another color": "Označiť dlaždice, ktoré splývajú so susednou dlaždicou inej farby",
    "Language": "Jazyk",
    "Install as an app that also works offline": "Nainštalovať ako aplikáciu, ktorá funguje aj offline",
    "Show the side panel": "Zobraziť bočný panel",
    "Select / edit (V)": "Výber / úpravy (V)",
    "Line (L)": "Čiara (L)",
    "Free polygon – click corner by corner (P)": "Voľný mnohouholník – klikanie roh po rohu (P)",
    "Regular polygon (G)": "Pravidelný mnohouholník (G)",
    "Knife – cut a tile straight across (K)": "Nôž – rozrezať dlaždicu naprieč (K)",
    "Pattern – fill an area with tiles (T)": "Vzor – vyplniť plochu dlaždicami (T)",
    "Paint bucket – click or drag across tiles (B)": "Vedro – klik alebo ťahanie cez dlaždice (B)",
    "Pan (H, or hold Space / middle mouse / two fingers)": "Posun (H, alebo podržte medzerník / stredné tlačidlo myši / dva prsty)",
    "Your saved palettes": "Vaše uložené palety",
    "New palette": "Nová paleta",
    "Rename this palette": "Premenovať túto paletu",
    "Delete this palette": "Zmazať túto paletu",
    "Fill color – used by the paint bucket": "Farba výplne – používa ju vedro",
    "Stroke color – used for new lines and polygons": "Farba obrysu – pre nové čiary a mnohouholníky",
    "Swap fill and stroke": "Vymeniť výplň a obrys",
    "Line width for new lines and polygons": "Šírka čiary pre nové čiary a mnohouholníky",
    "Paste #hex, rgb(), name…": "Vložte #hex, rgb(), názov…",
    "Load colors from a .txt / .gpl / .css file": "Načítať farby zo súboru .txt / .gpl / .css",
    "Add every color used in the drawing": "Pridať všetky farby použité v kresbe",
    "Download the palette as a list of hex codes": "Stiahnuť paletu ako zoznam kódov hex",
    "0 = as many rows as fit": "0 = toľko radov, koľko sa zmestí",
    "Lay out tiles over the whole page and color them from the photo": "Rozložiť dlaždice po celej stránke a vyfarbiť ich podľa fotky",
    "Color the tiles you have drawn": "Vyfarbiť dlaždice, ktoré ste nakreslili",
    "Grout color": "Farba škár",
    "Give every line this color and width for real": "Naozaj dať všetkým čiaram túto farbu a šírku",
    "Save the selected shapes as a motif": "Uložiť vybrané tvary ako motív",
    "Load motifs from a file": "Načítať motívy zo súboru",
    "Download all motifs as a file": "Stiahnuť všetky motívy ako súbor",
    "Give the selected painted areas random colors from the mix": "Dať vybraným vyfarbeným plochám náhodné farby zo zmesi",
    "Real-world unit: 1 drawing unit = 1 mm / cm / inch": "Skutočná jednotka: 1 jednotka kresby = 1 mm / cm / palec",
    "Add a page (front, back, a color variant…)": "Pridať stránku (predná strana, zadná strana, farebná varianta…)",
    "Export…": "Exportovať…",
    "Copy": "Kopírovať",
    "Paste": "Vložiť",
    "You are looking at a shared image.": "Prezeráte si zdieľaný obrázok.",
    "Back to my image": "Späť k môjmu obrázku",
    "Place": "Umiestniť",
    "Paint": "Maľovanie",
    "Outline": "Obrys",
    "From image": "Z obrázka",
    "Click a swatch = paint color · right-click = outline color · double-click = edit (also recolors the image). The ∅ swatch paints transparent. Palettes are shared with the vector app.": "Klik na vzorkovník = farba maľovania · pravý klik = farba obrysu · dvojklik = upraviť (prefarbí aj obrázok). Vzorkovník ∅ maľuje priehľadne. Palety sú spoločné s vektorovou aplikáciou.",
    "Brush": "Štetec",
    "Smooth edges for lines and polygons": "Hladké okraje čiar a mnohouholníkov",
    "The pencil always paints hard pixels in exact palette colors – best for pixel mosaics. Shift: straight lines in 15° steps.": "Ceruzka vždy kreslí ostré pixely v presných farbách palety – najlepšie pre pixelové mozaiky. Shift: rovné čiary v krokoch po 15°.",
    "Fill with the paint color": "Vyplniť farbou maľovania",
    "Outline in the outline color": "Obrys vo farbe obrysu",
    "Drag from the center. Shift: 15° rotation steps.": "Ťahajte zo stredu. Shift: otáčanie po 15°.",
    "Tolerance": "Tolerancia",
    "Only connected pixels": "Len súvislé pixely",
    "Fills the area of similar color under the click. Alt+click picks a color.": "Vyplní plochu podobnej farby pod kliknutím. Alt+klik vyberie farbu.",
    "Cut": "Vystrihnúť",
    "Crop": "Orezať",
    "Drag inside the selection to move it (Alt+drag moves a copy); two fingers on it scale and turn it. Enter places it, Esc cancels.": "Ťahaním vo výbere ho posuniete (Alt+ťahanie posunie kópiu); dvoma prstami na ňom ho zväčšíte, zmenšíte a otočíte. Enter ho umiestni, Esc zruší.",
    "Mosaic": "Mozaika",
    "Make a mosaic…": "Vytvoriť mozaiku…",
    "Reduce to palette": "Previesť na paletu",
    "Open as vector tiles…": "Otvoriť ako vektorové dlaždice…",
    "Works on the selection, or on the whole image when nothing is selected.": "Pracuje s výberom, alebo s celým obrázkom, keď nie je nič vybrané.",
    "Image": "Obrázok",
    "Resize image": "Zmeniť veľkosť obrázka",
    "Canvas size": "Veľkosť plátna",
    "Pixel grid when zoomed in": "Mriežka pixelov pri priblížení",
    "Select, Brush, Pencil, Eraser, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan": "Výber, Štetec, Ceruzka, Guma, Čiara, Mnohouholník, Elipsa, Krivka, Vedro, Kvapkadlo, Posun",
    "Smaller / bigger brush": "Menší / väčší štetec",
    "Swap paint and outline colors": "Vymeniť farbu maľovania a obrysu",
    "Alt+click": "Alt+klik",
    "Pick a color": "Vybrať farbu",
    "Straight lines, 15° steps": "Rovné čiary, kroky po 15°",
    "Copy, cut, paste images (also between the two apps and other programs)": "Kopírovať, vystrihnúť, vložiť obrázky (aj medzi oboma aplikáciami a inými programami)",
    "Select all, clear the selection": "Vybrať všetko, zrušiť výber",
    "Place / cancel a moved or pasted image": "Umiestniť / zrušiť posunutý alebo vložený obrázok",
    "Fit image, actual pixels": "Celý obrázok, skutočné pixely",
    "Real width": "Skutočná šírka",
    "Pieces are areas of one color (tiles). “Replace with” recolors every pixel of that color.": "Dieliky sú plochy jednej farby (dlaždice). „Nahradiť za“ prefarbí všetky pixely tej farby.",
    "The image is packed into the link itself – nothing is uploaded. Whoever opens it sees the image and can make their own copy to edit.": "Obrázok je zabalený priamo v odkaze – nič sa nikam nenahráva. Kto ho otvorí, uvidí obrázok a môže si urobiť vlastnú kópiu na úpravy.",
    "Make a mosaic": "Vytvoriť mozaiku",
    "Splits the picture into tiles and gives each tile the color underneath it, with grout between the tiles.": "Rozdelí obrázok na dlaždice, každej dá farbu, ktorá je pod ňou, a medzi dlaždice dá škáry.",
    "Squares": "Štvorce",
    "Squares, offset rows": "Štvorce, posunuté rady",
    "Bricks": "Tehly",
    "Hexagons": "Šesťuholníky",
    "Irregular (crazy paving)": "Nepravidelné (mozaika z úlomkov)",
    "Grout": "Škáry",
    "Smaller tiles where the picture has detail": "Menšie dlaždice tam, kde má obrázok detaily",
    "colors from the picture (new palette)": "farieb z obrázka (nová paleta)",
    "Keep the picture’s colors": "Zachovať farby obrázka",
    "Open as vector tiles": "Otvoriť ako vektorové dlaždice",
    "Every piece of the picture (an area of one color) becomes a tile shape in the vector app, at the real size – ready for its print templates, laying plan, 3D print and editing. Your current vector drawing is kept in its History.": "Každý dielik obrázka (plocha jednej farby) sa stane tvarom dlaždice vo vektorovej aplikácii, v skutočnej veľkosti – pripravený na tlačové šablóny, plán kladenia, 3D tlač aj úpravy. Vaša aktuálna vektorová kresba zostane v jej Histórii.",
    "The grout color becomes the page background; every other piece becomes a tile.": "Farba škár sa stane pozadím stránky; každý ďalší dielik sa stane dlaždicou.",
    "Open in the vector app": "Otvoriť vo vektorovej aplikácii",
    "Format": "Formát",
    "JPEG": "JPEG",
    "WebP": "WebP",
    "Quality": "Kvalita",
    "JPEG has no transparency: transparent parts become white.": "JPEG nemá priehľadnosť: priehľadné miesta budú biele.",
    "Simple shows the essentials; Expert adds opacity, tolerance, resizing and more": "Jednoduchý ukazuje to podstatné; Expert pridáva krytie, toleranciu, zmenu veľkosti a ďalšie",
    "New image": "Nový obrázok",
    "Open an image (Ctrl+O) – you can also drop one on the canvas": "Otvoriť obrázok (Ctrl+O) – môžete ho tiež pretiahnuť na plátno",
    "Save as PNG (Ctrl+S)": "Uložiť ako PNG (Ctrl+S)",
    "Export as JPEG or WebP": "Exportovať ako JPEG alebo WebP",
    "Colors used, pieces and a shopping list": "Použité farby, dieliky a nákupný zoznam",
    "Earlier versions of your image": "Staršie verzie vášho obrázka",
    "Share the image as a link": "Zdieľať obrázok ako odkaz",
    "Copy the selection (or the whole image) to the clipboard (Ctrl+C)": "Skopírovať výber (alebo celý obrázok) do schránky (Ctrl+C)",
    "Paste an image from the clipboard (Ctrl+V)": "Vložiť obrázok zo schránky (Ctrl+V)",
    "Fit image (0)": "Celý obrázok (0)",
    "Actual pixels (1)": "Skutočné pixely (1)",
    "Select – drag a rectangle, then drag it to move (V)": "Výber – ťahajte obdĺžnik a ťahaním ho posuňte (V)",
    "Brush – soft edges (B)": "Štetec – mäkké okraje (B)",
    "Pencil – hard pixels in exact colors (P)": "Ceruzka – ostré pixely v presných farbách (P)",
    "Eraser (E)": "Guma (E)",
    "Paint bucket – fill an area (F)": "Vedro – vyplniť plochu (F)",
    "Pick a color (I, or Alt+click with any paint tool)": "Kvapkadlo (I, alebo Alt+klik s akýmkoľvek nástrojom maľovania)",
    "Your saved palettes (shared with the vector app)": "Vaše uložené palety (spoločné s vektorovou aplikáciou)",
    "Paint color – brush, pencil, lines, polygons and the bucket": "Farba maľovania – štetec, ceruzka, čiary, mnohouholníky a vedro",
    "Outline color – the outline of polygons": "Farba obrysu – obrys mnohouholníkov",
    "Swap paint and outline colors (X)": "Vymeniť farbu maľovania a obrysu (X)",
    "Brush, pencil, eraser and line size in pixels ( [ and ] )": "Veľkosť štetca, ceruzky, gumy a čiary v pixeloch ( [ a ] )",
    "Add the colors used in the image (or suggest some for a photo)": "Pridať farby použité v obrázku (alebo pri fotke nejaké navrhnúť)",
    "Turn the image (or the selection) into tiles with grout": "Previesť obrázok (alebo výber) na dlaždice so škárami",
    "Give every pixel the closest palette color": "Dať každému pixelu najbližšiu farbu z palety",
    "Every tile becomes a shape in the vector app – for its templates, laying plan and editing": "Každá dlaždica sa stane tvarom vo vektorovej aplikácii – pre jej šablóny, plán kladenia a úpravy",
    "Scale the picture to this size": "Zmenšiť / zväčšiť obrázok na túto veľkosť",
    "Change the canvas size, keeping the picture centered": "Zmeniť veľkosť plátna, obrázok zostane v strede",
    "The width of the finished mosaic": "Šírka hotovej mozaiky",
    "Herringbone": "Rybia kosť",
    "Triangles": "Trojuholníky",
    "Rings (around the click)": "Kruhy (okolo kliknutia)",
    "Rows following the outline": "Rady pozdĺž obrysu",
    "portrait": "na výšku",
    "landscape": "na šírku",
    "Vector": "Vektor",
    "Raster": "Raster",
    "Fit": "Všetko",
    "Thinnest part": "Najtenšia časť",
    "Raised parts narrower than this – or more than twice as tall as they are wide – are lowered to what is around them, so nothing prints as a thin tower": "Vyvýšené miesta užšie než táto hodnota – alebo viac ako dvakrát vyššie, než sú široké – sa znížia na úroveň okolia, aby sa nič netlačilo ako tenká vežička",
    "Grout colors are always printed first, so the lines between the tiles stay low.": "Farby škár sa tlačia vždy ako prvé, takže čiary medzi dlaždicami zostanú nízko.",
    "Grout / lines: always printed first, so they stay low": "Škáry / čiary: tlačia sa vždy ako prvé, takže zostanú nízko",
    "grout": "škáry",
    "{n} thin {n|piece|pieces} lowered so nothing prints as a thin tower": "{n} {n|tenký dielik znížený|tenké dieliky znížené|tenkých dielikov znížených}, aby sa nič netlačilo ako tenká vežička",
    "Top view": "Zhora",
    "Drag to turn · wheel or two fingers to zoom · double-click to reset": "Ťahaním otáčate · kolieskom alebo dvoma prstami približujete · dvojklik vráti pohľad",
    "Shows the heights taller than they are, to see the color bands": "Zobrazí výšky väčšie, než sú, aby boli vidieť farebné vrstvy",
    "Heights ×": "Výšky ×",
    "This browser can’t show 3D (WebGL is off).": "Tento prehliadač nevie zobraziť 3D (WebGL je vypnuté).",
    "One nozzle – colors by height": "Jedna tryska – farby podľa výšky",
    "Several filaments (AMS, MMU…) – flat": "Viac filamentov (AMS, MMU…) – plochý",
    "A flat model with one part per color, for printers that switch filaments by themselves. The 3MF file already assigns filament 1, 2, … to the parts – load the filaments in the order listed below.": "Plochý model s jedným dielom pre každú farbu, pre tlačiarne, ktoré samy menia filamenty. Súbor 3MF už dielom priraďuje filament 1, 2, … – založte filamenty v poradí uvedenom nižšie.",
    "How thick the tiles are above the base": "Aké hrubé sú dlaždice nad podložkou",
    "Tile layers": "Vrstvy dlaždíc",
    "Grout colors end this many layers below the tiles, so the lines between them stay low. 0: all flat": "Farby škár končia o toľko vrstiev nižšie než dlaždice, takže čiary medzi nimi zostanú nízko. 0: všetko rovno",
    "Grout lower by": "Škáry nižšie o",
    "layers": "vrstvy",
    "Filaments:": "Filamenty:",
    "Grout colors come first and stay lower than the tiles. The base plate uses filament 1.": "Farby škár sú prvé a zostávajú nižšie než dlaždice. Podložka sa tlačí filamentom 1.",
    "3MF for": "3MF pre",
    "The model, one part per color with its filament": "Model, jeden diel pre každú farbu s jej filamentom",
    "One STL file per color, in a ZIP – load them as parts of one object": "Jeden súbor STL pre každú farbu, v ZIPe – načítajte ich ako diely jedného objektu",
    "{share} % · filament {k}": "{share} % · filament {k}",
    "{n} {n|color|colors} = {n} {n|filament|filaments} · flat, {h} mm high ({layers} {layers|layer|layers})": "{n} {n|farba|farby|farieb} = {n} {n|filament|filamenty|filamentov} · plochý, výška {h} mm ({layers} {layers|vrstva|vrstvy|vrstiev})",
    "Base": "Podložka",
    "Mosaic Paint – multi-filament plan for {name}.3mf": "Mosaic Paint – plán viacerých filamentov pre {name}.3mf",
    "Size {w} × {h} mm · layer height {lh} mm · base {base} {base|layer|layers} · tiles {tile} {tile|layer|layers} · grout {recess} {recess|layer|layers} lower": "Veľkosť {w} × {h} mm · výška vrstvy {lh} mm · podložka {base} {base|vrstva|vrstvy|vrstiev} · dlaždice {tile} {tile|vrstva|vrstvy|vrstiev} · škáry o {recess} {recess|vrstvu|vrstvy|vrstiev} nižšie",
    "Total height {total} mm.": "Celková výška {total} mm.",
    "Filament {k}: {color} (also the base plate)": "Filament {k}: {color} (aj podložka)",
    "Filament {k}: {color}": "Filament {k}: {color}",
    "{slicer}: open the 3MF – every color is a part of one object with its filament already assigned. Load the filaments in this order (AMS slots, MMU…).": "{slicer}: otvorte 3MF – každá farba je diel jedného objektu a má už priradený filament. Založte filamenty v tomto poradí (sloty AMS, MMU…).",
    "The 3MF is made for {slicer}: other slicers may read it as one part – then use the STL files.": "3MF je určený pre {slicer}: iné slicery ho môžu načítať ako jeden diel – potom použite súbory STL.",
    "STL: one file per color in a ZIP. Load them together as one object made of parts and give each its filament.": "STL: jeden súbor pre každú farbu v ZIPe. Načítajte ich spoločne ako jeden objekt z dielov a každému priraďte jeho filament.",
    "Saved {name}.3mf for {slicer}: {n} {n|part|parts} with their filaments assigned.": "Uložené {name}.3mf pre {slicer}: {n} {n|diel|diely|dielov} s priradenými filamentmi.",
    "Saved {name}-stl.zip: {n} STL {n|file|files}, one per color. Load them as parts of one object.": "Uložené {name}-stl.zip: {n} {n|súbor|súbory|súborov} STL, jeden pre každú farbu. Načítajte ich ako diely jedného objektu.",
    "Finishing: frame, corners, hanging hole, magnets": "Dokončenie: rámik, rohy, otvor na zavesenie, magnety",
    "A border around the picture. With one nozzle it comes out in the top color, with several filaments in filament 1. 0: none": "Okraj okolo obrázka. S jednou tryskou vyjde v hornej farbe, s viacerými filamentmi vo filamente 1. 0: žiadny",
    "Frame": "Rámik",
    "How many layers the frame stands above the tiles": "O koľko vrstiev rámik prečnieva nad dlaždice",
    "raised by": "vyšší o",
    "Radius of the outline’s corners. 0: square": "Polomer rohov obrysu. 0: ostré rohy",
    "Rounded corners": "Zaoblené rohy",
    "A hole to hang it by, at the top in the middle. 0: none": "Otvor na zavesenie, hore v strede. 0: žiadny",
    "Hanging hole": "Otvor na zavesenie",
    "Four round pockets in the bottom, one near each corner, to glue magnets in: their diameter. 0: none": "Štyri okrúhle vrecká na spodku, pri každom rohu jedno, na vlepenie magnetov: ich priemer. 0: žiadne",
    "Magnets": "Magnety",
    "How deep the magnet pockets are (the magnet’s thickness)": "Aké hlboké sú vrecká na magnety (hrúbka magnetu)",
    "deep": "hĺbka",
    "with the frame {w} × {h} mm, {z} mm high": "s rámikom {w} × {h} mm, výška {z} mm",
    "The model is too thin for magnet pockets.": "Model je na vrecká na magnety príliš tenký.",
    "The magnet pockets are only {d} mm deep – the model is thinner there.": "Vrecká na magnety sú hlboké len {d} mm – model je tam tenší.",
    "Frame {w} mm wide, up to layer {layer} (Z {z} mm), in filament 1.": "Rámik široký {w} mm, až do vrstvy {layer} (Z {z} mm), filamentom 1.",
    "Frame {w} mm wide: it goes on in {color} up to layer {layer} (Z {z} mm).": "Rámik široký {w} mm: pokračuje farbou {color} až do vrstvy {layer} (Z {z} mm).",
    "Magnet pockets in the bottom: 4 × {d} mm, {depth} mm deep – glue the magnets in after printing.": "Vrecká na magnety na spodku: 4 × {d} mm, hĺbka {depth} mm – magnety vlepte po vytlačení.",
    "Making the mosaic…": "Vytváram mozaiku…",
    "Could not make the mosaic.": "Mozaiku sa nepodarilo vytvoriť.",
    "Tracing the tiles…": "Obkresľujem dlaždice…",
    "Could not trace the tiles.": "Dlaždice sa nepodarilo obkresliť.",
    "Working out the model…": "Počítam model…",
    "Working out the model… {p} %": "Počítam model… {p} %",
    "Could not build the 3D model.": "3D model sa nepodarilo vytvoriť.",
    "Building the 3D model…": "Vytváram 3D model…",
    "Building the 3D model… {p} %": "Vytváram 3D model… {p} %",
    "Coaster": "Podložka pod pohár",
    "HOME": "DOMOV",
    "Sign": "Tabuľka",
    "100 × 100 mm, square tiles in rings of color – try 3D… with rounded corners.": "100 × 100 mm, štvorcové dlaždice vo farebných prstencoch – skúste 3D… so zaoblenými rohmi.",
    "coaster": "podlozka",
    "A word in tiles with a border – try Report for a shopping list.": "Slovo z dlaždíc s okrajom – v Prehľade nájdete nákupný zoznam.",
    "sign": "tabulka",
    "Welcome to Mosaic Paint": "Vitajte v Mosaic Paint",
    "Design a mosaic: draw lines or lay a tile pattern, then paint the tiles. Everything is measured in real millimetres.": "Navrhnite mozaiku: nakreslite čiary alebo položte vzor dlaždíc a potom dlaždice vyfarbite. Všetko sa meria v skutočných milimetroch.",
    "Draw": "Kreslenie",
    "The tools are on the left: lines and shapes, the tile pattern, and the paint bucket that fills a tile with one click.": "Nástroje sú vľavo: čiary a tvary, vzor dlaždíc a vedro, ktoré jedným kliknutím vyfarbí dlaždicu.",
    "Pick a color in the palette, then click tiles with the bucket. Palettes are shared with the raster app.": "Vyberte farbu v palete a klikajte vedrom na dlaždice. Palety sú spoločné s rastrovou aplikáciou.",
    "When it is done": "Keď bude hotovo",
    "Report gives a shopping list, 3D… a model to print, Share a link. Expert mode adds printing at real size and laying plans.": "Prehľad dá nákupný zoznam, 3D… model na tlač, Zdieľať odkaz. Režim Expert pridá tlač v skutočnej veľkosti a plány kladenia.",
    "Start from an example": "Začnite od príkladu",
    "Not sure where to begin? Open an example. The ? button shows this guide again.": "Neviete, kde začať? Otvorte príklad. Tlačidlo ? ukáže tohto sprievodcu znova.",
    "Pixel heart": "Pixelové srdce",
    "16 × 16 pixel art – every pixel a tile. Try 3D… or Print.": "Pixel art 16 × 16 – každý pixel je dlaždica. Skúste 3D… alebo Tlač.",
    "heart": "srdce",
    "Heart": "Srdce",
    "Sunset mosaic": "Mozaika so západom slnka",
    "A picture made into tiles with grout by “Make a mosaic…”. Try Open as vector tiles.": "Obrázok premenený na dlaždice so škárami pomocou „Vytvoriť mozaiku…“. Skúste Otvoriť ako vektorové dlaždice.",
    "sunset": "zapad-slnka",
    "Sunset": "Západ slnka",
    "Welcome to Mosaic Paint Raster": "Vitajte v Mosaic Paint Raster",
    "Paint with pixels: pixel art, or a photo turned into a mosaic. Each pixel can become a tile.": "Maľujte pixelmi: pixel art alebo fotku premenenú na mozaiku. Každý pixel sa môže stať dlaždicou.",
    "The tools are on the left: pencil, brush, bucket, lines, shapes and selection.": "Nástroje sú vľavo: ceruzka, štetec, vedro, čiary, tvary a výber.",
    "Pick a color in the palette. Palettes are shared with the vector app.": "Vyberte farbu v palete. Palety sú spoločné s vektorovou aplikáciou.",
    "Open a photo, then “Make a mosaic…” turns it into tiles with grout in your palette’s colors.": "Otvorte fotku a „Vytvoriť mozaiku…“ z nej urobí dlaždice so škárami vo farbách vašej palety.",
    "Examples": "Príklady",
    "Open an example to see how it is made, or to start from it. Your current work is kept in History.": "Otvorte príklad a pozrite sa, ako je urobený, alebo z neho vyjdite. Vaša súčasná práca zostane v Histórii.",
    "Back": "Späť",
    "{k} of {n}": "{k} z {n}",
    "Next": "Ďalej",
    "Examples…": "Príklady…",
    "Example projects to open": "Ukážkové projekty na otvorenie",
    "A short guide to the app": "Krátky sprievodca aplikáciou",
    "Guide": "Sprievodca",
    "Working… {p} %": "Pracujem… {p} %",
    "Your photo": "Vaša fotka",
    "Load a photo and turn it into tiles – smaller where it has detail.": "Načítajte fotku a premeňte ju na dlaždice – menšie tam, kde má detaily.",
    "Read the G-code your slicer made and check it against this plan: filament changes, filaments and heights": "Načíta G-code zo slicera a porovná ho s týmto plánom: výmeny filamentu, filamenty a výšky",
    "Check G-code…": "Skontrolovať G-code…",
    "Change to {color} at Z {z} mm": "Výmena na {color} v Z {z} mm",
    "No filament change to {color} at Z {z} mm": "Chýba výmena filamentu na {color} v Z {z} mm",
    "A filament change the plan does not have, at Z {z} mm": "Výmena filamentu, ktorú plán nemá, v Z {z} mm",
    "The top is at {z} mm, as planned": "Vrch je vo výške {z} mm, podľa plánu",
    "The top is at {found} mm instead of {z} mm": "Vrch je vo výške {found} mm namiesto {z} mm",
    "Filament {k} ({color}) is not used – assign it to the part “{k} {color}”": "Filament {k} ({color}) sa nepoužíva – priraďte ho dielu „{k} {color}“",
    "Filament {k} ({color}) prints up to {z} mm": "Filament {k} ({color}) tlačí do výšky {z} mm",
    "Filament {k} ({color}) prints up to {found} mm instead of {z} mm": "Filament {k} ({color}) tlačí do výšky {found} mm namiesto {z} mm",
    "No printing found in {name} – is it a G-code file?": "V {name} nie je žiadna tlač – je to súbor G-code?",
    "{name}: {n} {n|thing|things} to look at": "{name}: {n} {n|vec|veci|vecí} na kontrolu",
    "{name}: everything matches the plan": "{name}: všetko zodpovedá plánu",
    "Reading the G-code…": "Čítam G-code…",
    "Reading the G-code… {p} %": "Čítam G-code… {p} %",
    "Could not read {name}.": "{name} sa nepodarilo prečítať.",
    "{name} is {w} × {h} px – painting on it and making mosaics will be slow. Scale it down to {W} × {H} px?": "{name} má {w} × {h} px – maľovanie a mozaiky na ňom budú pomalé. Zmenšiť ho na {W} × {H} px?",
    "It has many colors: “Reduce to palette” or “Make a mosaic…” turn them into a few you can buy tiles in.": "Má veľa farieb: „Previesť na paletu“ alebo „Vytvoriť mozaiku…“ z nich urobí pár farieb, v ktorých dlaždice kúpite.",
    "{n} {n|color|colors}": "{n} {n|farba|farby|farieb}",
    "Unpin – it may be cleared with old versions": "Odopnúť – môže byť zmazaná so starými verziami",
    "Pin – kept when old versions are cleared": "Pripnúť – zostane, aj keď sa staré verzie mažú",
    "Name this version": "Pomenovať túto verziu",
    "Name of this version:": "Názov tejto verzie:",
    "Share link": "Odkaz na zdieľanie",
    "What’s new": "Čo je nové",
    "Version {v} – what’s new": "Verzia {v} – čo je nové",
    "Updated to version {v} – click v{v} in the corner to see what’s new.": "Aktualizované na verziu {v} – čo je nové, uvidíte po kliknutí na v{v} v rohu.",
    "The raster app: paint with pixels, turn photos into mosaics, and copy pictures between both apps.": "Rastrová aplikácia: maľovanie pixelmi, fotky premenené na mozaiky a kopírovanie obrázkov medzi oboma aplikáciami.",
    "3D print: a 3D preview, models for multi-filament printers (AMS, MMU), a frame, rounded corners, a hanging hole and magnet pockets – and a check of the sliced G-code against the plan.": "3D tlač: 3D náhľad, modely pre tlačiarne s viacerými filamentmi (AMS, MMU), rámik, zaoblené rohy, otvor na zavesenie a vrecká na magnety – a kontrola G-codu zo slicera podľa plánu.",
    "Examples to start from, and a short guide for newcomers.": "Príklady, od ktorých môžete začať, a krátky sprievodca pre nováčikov.",
    "German, Slovak and Polish.": "Nemčina, slovenčina a poľština.",
    "Heavy work – mosaics, tracing, 3D models – no longer holds up the page.": "Náročná práca – mozaiky, obkresľovanie, 3D modely – už stránku nezdržiava.",
    "History: name and pin versions; see their size and colors.": "História: verzie môžete pomenovať a pripnúť; vidíte ich veľkosť a farby.",
    "Big images can be scaled down when opened.": "Veľké obrázky sa dajú pri otvorení zmenšiť.",
    "Better keyboard and screen-reader support.": "Lepšia podpora klávesnice a čítačiek obrazovky.",
    "The vector editor: lines, tile patterns, the paint bucket, palettes, reports, printing at real size and sharing as a link.": "Vektorový editor: čiary, vzory dlaždíc, vedro, palety, prehľady, tlač v skutočnej veľkosti a zdieľanie odkazom.",
    "Could not sign in to Discord.": "Prihlásenie do Discordu zlyhalo.",
    "Post to the channel": "Poslať do kanála",
    "Post the picture in this channel, as a reply to the message it came from": "Poslať obrázok do tohto kanála ako odpoveď na správu, z ktorej pochádza",
    "That image is no longer available in Discord.": "Ten obrázok už na Discorde nie je k dispozícii.",
    "Right-click an image in the chat › Apps › Edit image to edit it here – or open or paste one.": "Kliknite pravým tlačidlom na obrázok v chate › Aplikácie › Edit image a upravte ho tu – alebo nejaký otvorte či vložte.",
    "Posted to the channel.": "Poslané do kanála.",
    "The picture is too big for Discord – make it smaller (Image › Resize image).": "Obrázok je pre Discord príliš veľký – zmenšite ho (Obrázok › Zmeniť veľkosť obrázka).",
    "Could not reach the server.": "Server nie je dostupný.",
    "Could not connect to Discord.": "Spojenie s Discordom zlyhalo.",
    "Open the editor with “Edit image” (or the app’s launch button) in this chat to post here – or use Copy and paste the picture.": "Otvorte editor cez „Edit image“ (alebo tlačidlo aplikácie na spustenie) v tomto chate, aby ste sem mohli poslať obrázok – alebo použite Kopírovať a obrázok vložte.",
    "More than 15 minutes have passed, and Discord no longer lets the app post. Use Copy and paste the picture into the chat.": "Uplynulo viac ako 15 minút a Discord už aplikácii nedovolí poslať obrázok. Použite Kopírovať a obrázok vložte do chatu.",
    "Discord did not take the picture. Use Copy and paste it into the chat.": "Discord obrázok neprijal. Použite Kopírovať a vložte ho do chatu.",
    "Select the part to keep with the Select tool (V), then crop.": "Nástrojom Výber (V) vyberte časť, ktorú chcete ponechať, a potom orežte.",
    "The image is all one color – nothing to trim.": "Obrázok je celý jednej farby – nie je čo orezávať.",
    "There is no border to trim.": "Nie je tu žiadny okraj na orezanie.",
    "Trimmed to {w} × {h} px.": "Orezané na {w} × {h} px.",
    "Pen pressure changes the size": "Prítlak pera mení veľkosť",
    "Tip": "Hrot",
    "Round": "Okrúhly",
    "Soft (airbrush)": "Mäkký (airbrush)",
    "Spray": "Sprej",
    "Calligraphy": "Kaligrafia",
    "Chalk": "Krieda",
    "The shape of the brush and eraser": "Tvar štetca a gumy",
    "The angle of the calligraphy nib – 45° for right-handed writing, about 135° for left-handed": "Uhol kaligrafického hrotu – 45° pre pravákov, asi 135° pre ľavákov",
    "curve through points": "krivka cez body",
    "B-spline": "B-spline",
    "cubic Bézier": "kubická Bézierova krivka",
    "quadratic Bézier": "kvadratická Bézierova krivka",
    "ellipse": "elipsa",
    "Drag from corner to corner (or from the center) · Shift: a circle · Alt: no snap": "Ťahajte z rohu do rohu (alebo zo stredu) · Shift: kruh · Alt: bez prichytávania",
    "Click the curve’s points · click the first point to close it · double-click or Enter ends it open · Backspace removes the last point · Esc cancels": "Klikajte na body krivky · kliknutím na prvý bod ju uzavriete · dvojklik alebo Enter ju ukončí otvorenú · Backspace odoberie posledný bod · Esc zruší",
    "Turn on “Fill” or “Outline” for shapes.": "Pri tvaroch zapnite „Výplň“ alebo „Obrys“.",
    "Drag from corner to corner (or from the center) · Shift: a circle": "Ťahajte z rohu do rohu (alebo zo stredu) · Shift: kruh",
    "The curve runs smoothly through every point you click.": "Krivka vedie plynulo cez každý bod, na ktorý kliknete.",
    "The curve is pulled towards each point but only touches the first and the last – very smooth, good for flowing lines.": "Krivku každý bod priťahuje, ale dotkne sa len prvého a posledného – veľmi hladká, vhodná na plynulé línie.",
    "Click a point, two control points, the next point, two control points … The curve passes through every third point; the control points (round) pull it.": "Kliknite na bod, dva riadiace body, ďalší bod, dva riadiace body … Krivka prechádza každým tretím bodom; riadiace body (okrúhle) ju priťahujú.",
    "Click a point, a control point, the next point, a control point … The curve passes through every other point; the control points (round) pull it.": "Kliknite na bod, riadiaci bod, ďalší bod, riadiaci bod … Krivka prechádza každým druhým bodom; riadiace body (okrúhle) ju priťahujú.",
    "Ellipse": "Elipsa",
    "From corner": "Z rohu",
    "Shift: a circle. Select it to drag its axis ends.": "Shift: kruh. Po výbere môžete ťahať konce jej osí.",
    "Curve": "Krivka",
    "Type": "Typ",
    "Smooth, through the points": "Hladká, cez body",
    "Smooth, near the points (B-spline)": "Hladká, pri bodoch (B-spline)",
    "Bézier, cubic": "Bézierova, kubická",
    "Bézier, quadratic": "Bézierova, kvadratická",
    "Ellipse – Shift: circle (O)": "Elipsa – Shift: kruh (O)",
    "Curve – click its points (C)": "Krivka – klikajte na jej body (C)",
    "Shift: a circle.": "Shift: kruh.",
    "An open curve is a line in the paint color, as thick as the size; a closed one is filled and outlined like the shapes.": "Otvorená krivka je čiara vo farbe maľovania s nastavenou veľkosťou; uzavretá sa vyplní a obtiahne ako tvary.",
    "Ellipses and curves in both apps: the Ellipse tool (O, Shift for a circle) and the Curve tool (C) – smooth through the points, smooth near them (B-spline), or cubic and quadratic Bézier.": "Elipsy a krivky v oboch aplikáciách: nástroj Elipsa (O, so Shiftom kruh) a nástroj Krivka (C) – hladká cez body, hladká pri bodoch (B-spline), alebo kubická a kvadratická Bézierova.",
    "In the vector app, ellipses and curves stay exact curves: drag their points or axis ends to change them, and paint, cut and mirror them like any tile.": "Vo vektorovej aplikácii zostávajú elipsy a krivky presnými krivkami: ťahaním bodov alebo koncov osí ich meníte a vyfarbujete, režete a zrkadlíte ich ako každú dlaždicu.",
    "Shift+B": "Shift+B",
    "Next brush tip": "Ďalší hrot štetca",
    "Brush tip: {tip}": "Hrot štetca: {tip}",
    "Brush tips for the brush and the eraser: soft (airbrush), spray, calligraphy and chalk. Shift+B switches between them.": "Hroty pre štetec a gumu: mäkký (airbrush), sprej, kaligrafia a krieda. Shift+B medzi nimi prepína.",
    "The spray keeps spraying while you hold it still, like an airbrush; the calligraphy nib’s angle can be set (also for left-handed writing).": "Sprej strieka ďalej, aj keď ho držíte na mieste, ako airbrush; uhol kaligrafického hrotu sa dá nastaviť (aj pre ľavákov).",
    "Keep proportions": "Zachovať pomer strán",
    "Flip ↔": "Prevrátiť ↔",
    "Flip ↕": "Prevrátiť ↕",
    "Rotate by": "Otočiť o",
    "Rotate": "Otočiť",
    "Crop to selection": "Orezať na výber",
    "Trim edges": "Orezať okraje",
    "With a graphics tablet or stylus, the brush, pencil and eraser paint thinner the lighter you press": "S grafickým tabletom alebo perom kreslí štetec, ceruzka a guma tým tenšie, čím ľahšie pritlačíte",
    "Rotate 90° to the left": "Otočiť o 90° doľava",
    "Rotate 90° to the right": "Otočiť o 90° doprava",
    "Flip left ↔ right": "Prevrátiť zľava doprava",
    "Flip upside down": "Prevrátiť hore nohami",
    "Rotate by any angle (clockwise; negative: to the left) – the canvas grows to hold the picture": "Otočiť o ľubovoľný uhol (v smere hodín; záporný: doľava) – plátno sa zväčší, aby sa obrázok zmestil",
    "Keep only the selection (select it with the Select tool first)": "Ponechať len výber (najprv ho vyberte nástrojom Výber)",
    "Cut off the empty or one-color border around the picture": "Odrezať prázdny alebo jednofarebný okraj okolo obrázka",
    "Edit images from a Discord chat: right-click › Apps › Edit image, draw on it, post it back – in the raster or the vector app.": "Úpravy obrázkov z chatu na Discorde: pravé tlačidlo › Aplikácie › Edit image, kreslite doň a pošlite ho späť – v rastrovej aj vektorovej aplikácii.",
    "Pen pressure: with a graphics tablet or stylus, the brush, pencil and eraser paint thinner the lighter you press.": "Prítlak pera: s grafickým tabletom alebo perom kreslí štetec, ceruzka a guma tým tenšie, čím ľahšie pritlačíte.",
    "Image editing in the raster app: rotate (by 90° or any angle), flip, crop to the selection, trim the border, resize keeping proportions.": "Úpravy obrázka v rastrovej aplikácii: otočenie (o 90° alebo o ľubovoľný uhol), prevrátenie, orezanie na výber, orezanie okrajov a zmena veľkosti so zachovaním pomeru strán.",
    "Choose a color": "Vyberte farbu",
    "Saturation and brightness": "Sýtosť a jas",
    "Hue": "Odtieň",
    "Before": "Predtým",
    "Color code": "Kód farby",
    "Also add it to the palette": "Pridať ju aj do palety",
    "Use this color": "Použiť túto farbu",
    "Choose…": "Vybrať…",
    "Choose any color: a color area, a hue slider and a color code": "Vyberte ľubovoľnú farbu: farebná plocha, posúvač odtieňa a kód farby",
    "Fill color – used by the paint bucket. Click to choose any color": "Farba výplne – používa ju vedierko. Kliknutím vyberiete ľubovoľnú farbu",
    "Stroke color – used for new lines and polygons. Click to choose any color": "Farba čiary – pre nové čiary a mnohouholníky. Kliknutím vyberiete ľubovoľnú farbu",
    "Paint color – brush, pencil, lines, polygons and the bucket. Click to choose any color": "Farba maľby – štetec, ceruzka, čiary, mnohouholníky a vedierko. Kliknutím vyberiete ľubovoľnú farbu",
    "Outline color – the outline of polygons. Click to choose any color": "Farba obrysu – obrys mnohouholníkov. Kliknutím vyberiete ľubovoľnú farbu",
    "Choose any color: a color area, a hue slider and a color code (Choose… under the palette, or click the current colors).": "Vyberte ľubovoľnú farbu: farebná plocha, posúvač odtieňa a kód farby (Vybrať… pod paletou, alebo kliknite na aktuálne farby).",
    "Inside Discord: New, Save as, renaming and the other questions work (they are asked in the page now), and switching between the apps keeps the Post button.": "V Discorde: Nový, Uložiť ako, premenovanie a ďalšie otázky fungujú (pýtajú sa teraz priamo na stránke) a prepínanie medzi aplikáciami zachová tlačidlo na odoslanie.",
    "On phones inside Discord, the top bar stays clear of Discord’s own controls.": "Na telefónoch v Discorde horná lišta nezasahuje pod ovládacie prvky Discordu.",
    "Quick menu": "Rýchla ponuka",
    "Undo": "Späť",
    "Redo": "Znova",
    "Fit to the screen": "Prispôsobiť obrazovke",
    "Which color": "Ktorá farba",
    "Choose any color": "Vybrať ľubovoľnú farbu",
    "The palette is empty – use + to choose a color.": "Paleta je prázdna – farbu vyberiete tlačidlom +.",
    "Tip: double-tap the drawing for a quick menu – tools, colors and size.": "Tip: dvojitým ťuknutím na kresbu otvoríte rýchlu ponuku – nástroje, farby a veľkosť.",
    "Quick menu on phones and tablets: double-tap the drawing with a finger for undo, the main tools, colors and size – right where you draw.": "Rýchla ponuka na telefónoch a tabletoch: dvojitým ťuknutím prstom na kresbu máte poruke späť, hlavné nástroje, farby a veľkosť – priamo tam, kde kreslíte.",
    "Tap or click where to copy from.": "Ťuknite alebo kliknite tam, odkiaľ kopírovať.",
    "Tap the image where to copy from": "Ťuknite do obrázka tam, odkiaľ kopírovať",
    "Copying from {x}, {y}": "Kopíruje sa z {x}, {y}",
    "No source yet: the first tap sets it": "Zdroj zatiaľ nie je: nastaví ho prvé ťuknutie",
    "Source set – now paint where the copy goes.": "Zdroj nastavený – teraz maľujte tam, kam patrí kópia.",
    "Clone": "Klonovanie",
    "Set source": "Nastaviť zdroj",
    "Aligned – the source follows the brush": "Zarovnane – zdroj sa posúva so štetcom",
    "Set where to copy from, then paint where the copy should go. Drag the source disc to move it. Size, tip and opacity are the brush's.": "Nastavte, odkiaľ kopírovať, a potom maľujte tam, kam má kópia prísť. Kotúčik zdroja presuniete ťahaním. Veľkosť, hrot a krytie sú ako pri štetci.",
    "Clone – paint with a copy of another part of the image · Alt+click or the first tap sets where to copy from (S)": "Klonovanie – maľujte kópiou inej časti obrázka · Alt+klik alebo prvé ťuknutie nastaví, odkiaľ kopírovať (S)",
    "The next tap or click sets where to copy from (or Alt+click)": "Ďalšie ťuknutie alebo kliknutie nastaví, odkiaľ kopírovať (alebo Alt+klik)",
    "On: the source moves along with the brush from stroke to stroke. Off: every stroke starts copying from the source": "Zapnuté: zdroj sa posúva so štetcom od ťahu k ťahu. Vypnuté: každý ťah začne kopírovať zo zdroja",
    "Clone tool in the raster app (S): paint with a copy of another part of the image. Tap (or Alt+click) where to copy from, paint the copy, drag the source disc with a finger to move it; aligned or not, with the brush’s size, tip, opacity and pen pressure.": "Nástroj Klonovanie v rastrovej aplikácii (S): maľujte kópiou inej časti obrázka. Ťuknite (alebo Alt+klik) tam, odkiaľ kopírovať, namaľujte kópiu, kotúčik zdroja posuniete prstom; zarovnane aj nie, s veľkosťou, hrotom, krytím a prítlakom pera ako pri štetci.",
    "Adjust colors": "Úprava farieb",
    "Stretch the picture’s tones to the full range": "Roztiahnuť tóny obrázka na celý rozsah",
    "Auto": "Automaticky",
    "Reset": "Vrátiť",
    "Hold to see the picture as it was": "Podržte na zobrazenie pôvodného obrázka",
    "Colors adjusted.": "Farby upravené.",
    "Heal": "Retuš",
    "Adjust colors…": "Upraviť farby…",
    "Select, Brush, Pencil, Eraser, Clone, Heal, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan": "Výber, Štetec, Ceruzka, Guma, Klonovanie, Retuš, Čiara, Mnohouholník, Elipsa, Krivka, Vedierko, Kvapkadlo, Posun",
    "Heal – like Clone, but the copy takes the color and light of the place you paint: for blemishes, spots and scratches (J)": "Retuš – ako Klonovanie, ale kópia prevezme farbu a svetlo miesta, kam maľujete: na škvrny, bodky a škrabance (J)",
    "Brightness, contrast, saturation, levels, sharpening and noise smoothing – for the selection or the whole image": "Jas, kontrast, sýtosť, úrovne, doostrenie a vyhladenie šumu – pre výber alebo celý obrázok",
    "Photo fixes in the raster app: Adjust colors… – brightness, contrast, saturation, levels with Auto, sharpening and noise smoothing, previewed live (hold Before to compare).": "Úpravy fotiek v rastrovej aplikácii: Upraviť farby… – jas, kontrast, sýtosť, úrovne s tlačidlom Automaticky, doostrenie a vyhladenie šumu, so živým náhľadom (podržaním Predtým porovnáte).",
    "Heal brush (J): paints over blemishes, spots and scratches with texture from elsewhere, in the color and light of the spot.": "Retušovací štetec (J): premaľuje škvrny, bodky a škrabance textúrou odinakiaľ, vo farbe a svetle daného miesta.",
    "Filling from the surroundings…": "Vypĺňa sa z okolia…",
    "Removed.": "Odstránené.",
    "Could not fill it: {why}": "Nepodarilo sa vyplniť: {why}",
    "Select what to remove first.": "Najprv vyberte, čo odstrániť.",
    "Select": "Výber",
    "Rectangle": "Obdĺžnik",
    "Lasso": "Laso",
    "Magnetic": "Magnetické",
    "Wand": "Palička",
    "Add": "Pridať",
    "Subtract": "Ubrať",
    "Drag inside the selection to move it. Copy, Clear, Fill from surroundings and Adjust colors follow its shape.": "Ťahaním vnútri výberu ho presuniete. Kopírovať, Vymazať, Vyplniť z okolia a Upraviť farby rešpektujú jeho tvar.",
    "Paint over what should disappear; when you lift, it is filled from the picture around it. Works best on backgrounds – grass, sky, walls, skin.": "Premaľujte, čo má zmiznúť; po zdvihnutí sa to vyplní z okolitého obrázka. Najlepšie funguje na pozadí – tráva, obloha, steny, pokožka.",
    "Fill with": "Vyplniť pomocou",
    "Surroundings (built in)": "Okolie (vstavané)",
    "AI (add-on)": "AI (doplnok)",
    "Fill from surroundings": "Vyplniť z okolia",
    "Select, Brush, Pencil, Eraser, Clone, Heal, Remove, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan": "Výber, Štetec, Ceruzka, Guma, Klonovanie, Retuš, Odstrániť, Čiara, Mnohouholník, Elipsa, Krivka, Vedierko, Kvapkadlo, Posun",
    "Shift / Alt + select": "Shift / Alt + výber",
    "Add to / take away from the selection": "Pridať k výberu / ubrať z výberu",
    "Remove – paint over something to make it disappear: it is filled from the picture around it (R)": "Odstrániť – premaľujte niečo, aby to zmizlo: vyplní sa to z okolitého obrázka (R)",
    "Shape": "Tvar",
    "A rectangle: drag across": "Obdĺžnik: ťahajte cez",
    "Freehand: draw around it": "Voľnou rukou: obkreslite to",
    "Draw roughly along an edge – the line snaps to it": "Kreslite zhruba pozdĺž hrany – čiara sa k nej prichytí",
    "Tap a color: everything similar next to it (or anywhere)": "Ťuknite na farbu: všetko podobné vedľa nej (alebo kdekoľvek)",
    "New selection": "Nový výber",
    "Replace the selection": "Nahradiť výber",
    "Add to the selection (or hold Shift)": "Pridať k výberu (alebo držte Shift)",
    "Take away from the selection (or hold Alt)": "Ubrať z výberu (alebo držte Alt)",
    "The selected part disappears: filled from the picture around it": "Vybraná časť zmizne: vyplní sa z okolitého obrázka",
    "Shaped selections: Lasso, Magnetic (snaps to edges) and Wand (by color), with New / Add / Subtract (or Shift / Alt) – copy, clear, move and Adjust colors follow the shape.": "Výbery ľubovoľného tvaru: Laso, Magnetické (prichytí sa k hranám) a Palička (podľa farby), s Nový / Pridať / Ubrať (alebo Shift / Alt) – kopírovanie, mazanie, presun aj Upraviť farby rešpektujú tvar.",
    "Removing things: the Remove brush (R) and Fill from surroundings for a selection fill the spot with the picture around it – content-aware, on the device.": "Odstraňovanie: štetec Odstrániť (R) a Vyplniť z okolia pre výber vyplnia miesto okolitým obrázkom – s ohľadom na obsah, priamo v zariadení.",
    "Text": "Text",
    "Type here": "Píšte sem",
    "Font": "Písmo",
    "List the fonts installed on this computer (the browser asks first)": "Zobraziť písma nainštalované v tomto počítači (prehliadač sa najprv opýta)",
    "More fonts…": "Ďalšie písma…",
    "Style": "Rez",
    "Bold": "Tučné",
    "Italic": "Kurzíva",
    "Alignment": "Zarovnanie",
    "Left": "Vľavo",
    "Center": "Na stred",
    "Right": "Vpravo",
    "Shadow": "Tieň",
    "The text is in the paint color, its outline in the outline color. Drag it into place, then press Enter or tap outside it.": "Text má farbu maľby, obrys farbu obrysu. Presuňte ho na miesto a potom stlačte Enter alebo ťuknite mimo neho.",
    "{n} fonts listed.": "Zobrazené písma: {n}.",
    "The browser did not list the fonts.": "Prehliadač písma nezobrazil.",
    "Drag the text into place, then press Enter or tap outside it.": "Presuňte text na miesto a potom stlačte Enter alebo ťuknite mimo neho.",
    "Tap where to copy from (or Alt+click), then paint the copy · drag the source disc to move it": "Ťuknite, odkiaľ kopírovať (alebo Alt+klik), potom maľujte kópiu · kotúčik zdroja posuniete ťahaním",
    "Tap where to copy from (or Alt+click), then paint over the spot – it blends in when you lift": "Ťuknite, odkiaľ kopírovať (alebo Alt+klik), potom premaľujte miesto – po zdvihnutí splynie",
    "Paint over what should disappear – it is filled from the surroundings when you lift": "Premaľujte, čo má zmiznúť – po zdvihnutí sa vyplní z okolia",
    "Tap to add text · drag it into place · tap it to edit · Enter places it": "Ťuknutím pridáte text · presuňte ho na miesto · ťuknutím ho upravíte · Enter ho umiestni",
    "Select, Brush, Pencil, Eraser, Clone, Heal, Remove, Text, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan": "Výber, Štetec, Ceruzka, Guma, Klonovanie, Retuš, Odstrániť, Text, Čiara, Mnohouholník, Elipsa, Krivka, Vedierko, Kvapkadlo, Posun",
    "Text – tap to type; fonts, outline, shadow and curved text (T)": "Text – ťuknite a píšte; písma, obrys, tieň a zakrivený text (T)",
    "Text tool in the raster app (T): any font (also the installed ones, where the browser lists them), size, bold, italic, alignment, outline, shadow and curved text. It floats until placed – drag it, tap it to edit.": "Nástroj Text v rastrovej aplikácii (T): ľubovoľné písmo (aj nainštalované, kde ich prehliadač vie zobraziť), veľkosť, tučné, kurzíva, zarovnanie, obrys, tieň a zakrivený text. Do umiestnenia pláva nad obrázkom – presuňte ho, ťuknutím upravíte.",
    "The AI could not start in this browser.": "AI sa v tomto prehliadači nepodarilo spustiť.",
    "Starting the AI…": "Spúšťa sa AI…",
    "The AI could not do it: {why}": "AI to nezvládla: {why}",
    "Looking at the picture…": "Prezerá sa obrázok…",
    "Nothing found there – tap the middle of the object.": "Nič sa tam nenašlo – ťuknite do stredu objektu.",
    "the AI add-on is not downloaded": "doplnok AI nie je stiahnutý",
    "Remove background": "Odstrániť pozadie",
    "What is in the picture?": "Čo je na obrázku?",
    "People (portraits)": "Ľudia (portréty)",
    "Any subject (objects, animals, products)": "Čokoľvek (predmety, zvieratá, výrobky)",
    "Each needs a one-time download – the size is shown before anything is downloaded. Everything runs on this device.": "Každé potrebuje jednorazové stiahnutie – veľkosť uvidíte skôr, než sa čokoľvek stiahne. Všetko beží v tomto zariadení.",
    "Select the subject": "Vybrať hlavný objekt",
    "Finding the subject…": "Hľadá sa hlavný objekt…",
    "The subject is selected.": "Hlavný objekt je vybraný.",
    "Background removed.": "Pozadie odstránené.",
    "Could not load the text recognition.": "Rozpoznávanie textu sa nepodarilo načítať.",
    "Reading the text…": "Číta sa text…",
    "Text in the picture": "Text na obrázku",
    "You can correct it here before copying.": "Pred skopírovaním ho tu môžete opraviť.",
    "Copied.": "Skopírované.",
    "Select the text and copy it (Ctrl+C).": "Označte text a skopírujte ho (Ctrl+C).",
    "No text found.": "Nenašiel sa žiadny text.",
    "3D relief": "3D reliéf",
    "A 3D-printable relief of the picture (STL): from its brightness, or from the depth an AI sees in a photo.": "Reliéf obrázka na 3D tlač (STL): podľa jasu, alebo podľa hĺbky, ktorú vo fotke vidí AI.",
    "Brightness – light is high": "Jas – svetlé je vysoko",
    "Brightness – dark is high (a lithophane: hold it against light)": "Jas – tmavé je vysoko (litofánia: podržte ju proti svetlu)",
    "Depth (AI add-on) – near is high": "Hĺbka (doplnok AI) – blízke je vysoko",
    "Relief": "Reliéf",
    "Low": "Nízke",
    "Medium": "Stredné",
    "High": "Vysoké",
    "Smoothing": "Vyhladenie",
    "Height map: white is high": "Výšková mapa: biela je vysoko",
    "Save STL": "Uložiť STL",
    "Working out the depth…": "Zisťuje sa hĺbka…",
    "{w} × {h} mm, {z} mm high": "{w} × {h} mm, výška {z} mm",
    "Saved relief.stl.": "Uložené relief.stl.",
    "Select object (AI)": "Výber objektu (AI)",
    "Tap an object to select it.": "Ťuknutím na objekt ho vyberiete.",
    "Object removal (AI)": "Odstraňovanie objektov (AI)",
    "Remove fills the spot with a trained model – better on objects and structure than the built-in fill.": "Odstrániť vyplní miesto natrénovaným modelom – lepšie ako vstavané vyplnenie pri objektoch a štruktúrach.",
    "Background removal – people": "Odstránenie pozadia – ľudia",
    "Removes the background behind people (portraits).": "Odstráni pozadie za ľuďmi (portréty).",
    "Background removal – any subject": "Odstránenie pozadia – čokoľvek",
    "Removes the background behind the main subject: objects, animals, products.": "Odstráni pozadie za hlavným objektom: predmety, zvieratá, výrobky.",
    "Read text (OCR)": "Čítanie textu (OCR)",
    "Recognizes text in the image, to copy it.": "Rozpozná text v obrázku, aby ste ho mohli skopírovať.",
    "Depth for 3D relief (AI)": "Hĺbka pre 3D reliéf (AI)",
    "Estimates the depth of a photo for a 3D-printable relief.": "Odhadne hĺbku fotky pre reliéf na 3D tlač.",
    "Download failed ({status}).": "Sťahovanie zlyhalo ({status}).",
    "This needs a one-time download of {size}.": "Potrebuje to jednorazovo stiahnuť {size}.",
    "That includes the AI engine ({size}), shared by all AI add-ons.": "To zahŕňa jadro AI ({size}), spoločné pre všetky doplnky AI.",
    "It is kept in this browser and works offline afterwards; the Add-ons list in the side panel removes it again. Everything runs on this device – your pictures are not uploaded.": "Zostane v tomto prehliadači a potom funguje aj offline; v zozname Doplnky v bočnom paneli ho zase odstránite. Všetko beží v tomto zariadení – vaše obrázky sa nikam nenahrávajú.",
    "Download {size}": "Stiahnuť {size}",
    "Downloading…": "Sťahuje sa…",
    "{name} is ready.": "{name} je pripravené.",
    "Could not download it: {why}": "Nepodarilo sa stiahnuť: {why}",
    "installed": "stiahnuté",
    "Download": "Stiahnuť",
    "Used by add-ons: {size}. Sizes include the shared AI engine where it is not downloaded yet.": "Doplnky zaberajú: {size}. Veľkosti zahŕňajú spoločné jadro AI, ak ešte nie je stiahnuté.",
    "Removed the add-on.": "Doplnok odstránený.",
    "Object (AI)": "Objekt (AI)",
    "Remove background…": "Odstrániť pozadie…",
    "Read text…": "Prečítať text…",
    "3D relief…": "3D reliéf…",
    "Add-ons": "Doplnky",
    "Features that need a one-time download. Nothing is downloaded until you agree; everything runs on this device.": "Funkcie, ktoré potrebujú jednorazové stiahnutie. Nič sa nestiahne, kým nesúhlasíte; všetko beží v tomto zariadení.",
    "Tap an object: the AI selects it (an add-on – asks before downloading)": "Ťuknite na objekt: AI ho vyberie (doplnok – pred stiahnutím sa opýta)",
    "Make the background transparent, or select the subject (an AI add-on – asks before downloading)": "Spriehľadniť pozadie, alebo vybrať hlavný objekt (doplnok AI – pred stiahnutím sa opýta)",
    "Recognize the text in the image or the selection, to copy it (an add-on – asks before downloading)": "Rozpoznať text v obrázku alebo výbere a skopírovať ho (doplnok – pred stiahnutím sa opýta)",
    "A 3D-printable relief (STL) from the picture's brightness, or from AI depth": "Reliéf na 3D tlač (STL) podľa jasu obrázka, alebo podľa hĺbky z AI",
    "Add-ons that run on your device, each downloaded only after you agree to its size: Select object (tap it), AI object removal, background removal, Read text (OCR) and depth for 3D reliefs. The side panel lists them and removes them again.": "Doplnky, ktoré bežia vo vašom zariadení a stiahnu sa až po odsúhlasení veľkosti: Výber objektu (ťuknutím), odstraňovanie objektov AI, odstránenie pozadia, Čítanie textu (OCR) a hĺbka pre 3D reliéfy. Bočný panel ich vypisuje a vie ich zase odstrániť.",
    "3D relief…: a printable relief (STL) from the picture's brightness – or a lithophane – or from AI depth.": "3D reliéf…: reliéf na tlač (STL) podľa jasu obrázka – alebo litofánia – alebo podľa hĺbky z AI.",
    "Layer {n}": "Vrstva {n}",
    "Saved as one picture – Save layers (.ora) in the Layers section keeps the layers.": "Uložené ako jeden obrázok – vrstvy zachová Uložiť vrstvy (.ora) v časti Vrstvy.",
    "The last layer can’t be deleted.": "Poslednú vrstvu nemožno zmazať.",
    "There is no layer under this one.": "Pod touto vrstvou žiadna nie je.",
    "Name of the layer:": "Názov vrstvy:",
    "Hide this layer": "Skryť túto vrstvu",
    "Show this layer": "Zobraziť túto vrstvu",
    "Show {name}": "Zobraziť {name}",
    "Saved {name} with {n} {n|layer|layers}.": "Uložené {name} s {n} {n|vrstvou|vrstvami|vrstvami}.",
    "Opened {name} ({n} {n|layer|layers}).": "Otvorené {name} ({n} {n|vrstva|vrstvy|vrstiev}).",
    "Could not read this OpenRaster file.": "Tento súbor OpenRaster sa nepodarilo prečítať.",
    "Merge down": "Zlúčiť nadol",
    "Flatten": "Zlúčiť všetko",
    "Save layers (.ora)": "Uložiť vrstvy (.ora)",
    "Painting and the other tools work on the active layer. Tap a layer to make it active, double-click to rename. Save keeps the picture as it looks; Save layers keeps the layers.": "Maľovanie a ostatné nástroje pracujú v aktívnej vrstve. Ťuknutím vrstvu aktivujete, dvojklikom premenujete. Uložiť uloží obrázok, ako vyzerá; Uložiť vrstvy zachová vrstvy.",
    "Layers (.ora)": "Vrstvy (.ora)",
    "Layers – the top one first": "Vrstvy – horná prvá",
    "A new, empty layer above this one": "Nová prázdna vrstva nad touto",
    "A copy of this layer": "Kópia tejto vrstvy",
    "Move this layer up": "Posunúť vrstvu nahor",
    "Move up": "Nahor",
    "Move this layer down": "Posunúť vrstvu nadol",
    "Move down": "Nadol",
    "Delete this layer": "Zmazať túto vrstvu",
    "Put this layer onto the one under it": "Vložiť túto vrstvu do tej pod ňou",
    "All the layers as one": "Všetky vrstvy do jednej",
    "Save every layer in one file (OpenRaster – GIMP, Krita and others open it); Open… opens it again": "Uložiť všetky vrstvy do jedného súboru (OpenRaster – otvorí ho GIMP, Krita a ďalšie); Otvoriť… ho zase otvorí",
    "Layers in the raster app: paint on the active layer, show / hide, opacity, move, merge, flatten – undo knows them all. Save layers keeps them in an OpenRaster file (.ora – GIMP and Krita open it), and autosave keeps them too.": "Vrstvy v rastrovej aplikácii: maľovanie do aktívnej vrstvy, zobrazenie / skrytie, krytie, presun, zlúčenie – Späť pozná všetko. Uložiť vrstvy ich zachová v súbore OpenRaster (.ora – otvorí ho GIMP aj Krita) a zachová ich aj automatické ukladanie.",
    "The AI add-ons on phones: much less memory (no more crash on iPhone when selecting an object) – the CPU engine on iPhone and iPad, and one feature's models at a time.": "Doplnky AI na telefónoch: oveľa menej pamäte (výber objektu už na iPhone nespadne) – na iPhone a iPade jadro pre procesor a vždy len modely jednej funkcie.",
    "Frame {n} of {count}": "Snímka {n} z {count}",
    "{s} s of {total} s": "{s} s z {total} s",
    "Choose a frame": "Vyberte snímku",
    "One frame back": "O snímku späť",
    "Play / pause": "Prehrať / pozastaviť",
    "One frame on": "O snímku ďalej",
    "Use this frame": "Použiť túto snímku",
    "This video can’t be played here – try a GIF or a screenshot of it.": "Toto video sa tu nedá prehrať – skúste GIF alebo jeho snímku obrazovky.",
    "GIFs and videos: open one (or, in Discord, a GIF, a video or a Tenor / Giphy GIF from the chat) and choose the frame to edit – with a slider, frame steps and play.": "GIFy a videá: otvorte ich (v Discorde aj GIF, video alebo GIF z Tenoru / Giphy z chatu) a vyberte snímku na úpravu – posúvačom, po snímkach alebo prehraním.",
    "Everything was selected – now nothing is.": "Vybraté bolo všetko – teraz nie je nič.",
    "Invert": "Obrátiť",
    "Select the other shapes instead (Ctrl+I)": "Vybrať namiesto toho ostatné tvary (Ctrl+I)",
    "Adjust": "Úpravy",
    "Invert selection": "Obrátiť výber",
    "Invert the selection": "Obrátiť výber",
    "Brightness, contrast, warmth and the other photo sliders – for the selection or the whole image": "Jas, kontrast, teplota a ďalšie posúvače pre fotky – pre výber alebo celý obrázok",
    "Select what isn't selected (Ctrl+I)": "Vybrať, čo vybraté nie je (Ctrl+I)",
    "Light": "Svetlo",
    "Detail and effects": "Detaily a efekty",
    "Levels": "Úrovne",
    "Vibrance": "Živosť",
    "Warmth": "Teplota",
    "Tint": "Odtieň",
    "Fade": "Vyblednutie",
    "Vignette": "Vinetácia",
    "Black point": "Bod čiernej",
    "White point": "Bod bielej",
    "Shadows": "Tiene",
    "Highlights": "Svetlá",
    "Midtones": "Stredné tóny",
    "Nicer icons for undo / redo, zoom, fit and help; Adjust is in the toolbar and the quick menu, with new sliders – shadows, highlights, warmth, tint, vibrance, fade and vignette. Invert selection (Ctrl+I) in both apps.": "Krajšie ikony pre späť / znova, priblíženie, prispôsobenie a pomocníka; Úpravy sú na lište aj v rýchlej ponuke s novými posúvačmi – tiene, svetlá, teplota, odtieň, živosť, vyblednutie a vinetácia. Obrátenie výberu (Ctrl+I) v oboch aplikáciách.",
    "Select object (AI) no longer crashes on phones: it now uses MobileSAM, which needs a quarter of the memory (and is faster). Its download is larger (45 MB); the old model is removed.": "Výber objektu (AI) už na telefónoch nepadá: teraz používa MobileSAM, ktorý potrebuje štvrtinu pamäte (a je rýchlejší). Sťahovanie je väčšie (45 MB); starý model sa odstráni.",
    "Import a picture": "Vložiť obrázok zo súboru",
    "Put a picture from a file into this image – drag it into place, then press Enter (or tap outside it)": "Vložiť obrázok zo súboru do tohto obrázka – presuňte ho na miesto a stlačte Enter (alebo ťuknite mimo neho)",
    "Import… puts a picture from a file into the current image (also in the quick menu): it comes in floating, scaled to fit – drag it into place.": "Vložiť… pridá obrázok zo súboru do aktuálneho obrázka (aj v rýchlej ponuke): príde ako plávajúci, zmenšený, aby sa zmestil – presuňte ho na miesto.",
    "Two fingers on a selection": "Dva prsty na výbere",
    "Scale, turn and move it (spread, pinch, twist)": "Zväčšiť, zmenšiť, otočiť a posunúť (roztiahnutie, stiahnutie, otočenie prstov)",
    "Two fingers on a selection (or a pasted, imported picture or text) scale and turn it: spread or pinch, twist – and move it. It snaps upright and to its own size, and is always made from the original pixels, so it doesn’t blur. Elsewhere two fingers zoom the view as before.": "Dva prsty na výbere (alebo na vloženom či importovanom obrázku a texte) ho zväčšia, zmenšia a otočia: roztiahnite alebo stiahnite prsty, otočte nimi – a posuňte ho. Prichytí sa k zvislej polohe a k pôvodnej veľkosti a vždy vzniká z pôvodných pixelov, takže sa nerozmazáva. Inde dva prsty približujú zobrazenie ako predtým.",
    "On phones, the Select shapes (and other rows of choices) wrap onto a second line instead of cutting off the last one – Object (AI) can be tapped again.": "Na telefónoch sa tvary výberu (aj iné rady volieb) zalomia na druhý riadok namiesto toho, aby sa posledná odrezala – Výber objektu (AI) sa dá zase stlačiť."
  };

  // src/shared/i18n-pl.ts
  var PL = {
    "Picked {c}.": "Wybrano kolor {c}.",
    "Picked {c} (not in the palette – add it with “From drawing”).": "Wybrano kolor {c} (nie ma go w palecie – dodaj go przyciskiem „Z rysunku”).",
    "No painted area under the cursor.": "Pod kursorem nie ma pomalowanego obszaru.",
    "My palette": "Moja paleta",
    "Could not read this file as SVG.": "Tego pliku nie da się odczytać jako SVG.",
    "From file": "Z pliku",
    "The file’s colors were added as the palette “{name}”.": "Kolory z pliku dodano jako paletę „{name}”.",
    "Discard unsaved changes to the current drawing?\n(A copy is kept in History.)": "Odrzucić niezapisane zmiany w bieżącym rysunku?\n(Kopia zostanie w Historii.)",
    "Before opening {name}": "Przed otwarciem {name}",
    "Opened {name}": "Otwarto {name}",
    "Saved {name}": "Zapisano {name}",
    "File name:": "Nazwa pliku:",
    "PNG width in pixels:": "Szerokość PNG w pikselach:",
    "Invalid width.": "Nieprawidłowa szerokość.",
    "PNG export failed.": "Eksport do PNG nie powiódł się.",
    "Before starting a new drawing": "Przed rozpoczęciem nowego rysunku",
    "Applied the grout color and width to {n} {n|line|lines}.": "Kolor i szerokość fug zastosowano do {n} {n|linii|linii|linii}.",
    "Autosave failed – remember to save your file.": "Autozapis nie powiódł się – pamiętaj, aby zapisać plik.",
    "Autosave": "Autozapis",
    "Before restoring an older version": "Przed przywróceniem starszej wersji",
    "Restored the version from {time}": "Przywrócono wersję z {time}",
    "Symmetry center set.": "Ustawiono środek symetrii.",
    "Snapping on": "Przyciąganie włączone",
    "Snapping off": "Przyciąganie wyłączone",
    "The clipboard has no color codes.": "W schowku nie ma kodów kolorów.",
    "{n} {n|area|areas}": "{n} {n|obszar|obszary|obszarów}",
    "fill": "wypełnienie",
    "stroke": "obrys",
    "No color – the bucket erases with it": "Bez koloru – wiadro nim wymazuje",
    "Recolored {n} {n|element|elements}.": "Zmieniono kolor: {n} {n|element|elementy|elementów}.",
    "Click on the canvas to place the symmetry center.": "Kliknij na płótnie, aby umieścić środek symetrii.",
    "Photo unlocked: drag it with the Select tool (where there are no shapes).": "Zdjęcie odblokowane: przeciągnij je narzędziem Zaznaczanie (tam, gdzie nie ma kształtów).",
    "Remove the tracing photo?": "Usunąć zdjęcie do odrysowania?",
    "Invalid page size.": "Nieprawidłowy rozmiar strony.",
    "1 drawing unit = 1 {unit}. Set the page size to the real size of your mosaic.": "1 jednostka rysunku = 1 {unit}. Ustaw rozmiar strony na rzeczywisty rozmiar mozaiki.",
    "Could not read that image.": "Nie da się odczytać tego obrazu.",
    "Photo loaded and locked. Unlock it to move it with the Select tool.": "Zdjęcie wczytane i zablokowane. Odblokuj je, aby przesunąć je narzędziem Zaznaczanie.",
    "Replace the photo to trace with the pasted image?": "Zastąpić zdjęcie do odrysowania wklejonym obrazem?",
    "The pasted image is now the photo to trace – “Make a mosaic from the photo” turns it into tiles.": "Wklejony obraz jest teraz zdjęciem do odrysowania – „Utwórz mozaikę ze zdjęcia” zrobi z niego płytki.",
    "Replace photo…": "Zastąp zdjęcie…",
    "Load photo…": "Wczytaj zdjęcie…",
    "Close shape": "Zamknij kształt",
    "Done": "Gotowe",
    "Start the cut inside a closed area.": "Zacznij cięcie wewnątrz zamkniętego obszaru.",
    "Click inside a closed area (or use “Fill whole page”).": "Kliknij wewnątrz zamkniętego obszaru (albo użyj „Wypełnij całą stronę”).",
    "That would be about {n} tiles – make the tile size bigger.": "To byłoby około {n} {n|płytki|płytek|płytek} – zwiększ rozmiar płytek.",
    "The tiles are bigger than this area.": "Płytki są większe niż ten obszar.",
    "This adds {n} lines, which may make editing slow. Continue?": "Przybędzie {n} {n|linia|linie|linii}, co może spowolnić edycję. Kontynuować?",
    "Added the pattern “{type}” ({n} {n|line|lines}).": "Dodano wzór „{type}” ({n} {n|linia|linie|linii}).",
    "The rows are wider than this area – use a smaller size.": "Rzędy są szersze niż ten obszar – użyj mniejszego rozmiaru.",
    "This area is too narrow for a row of that width.": "Ten obszar jest za wąski na rząd takiej szerokości.",
    "Added {rows} {rows|row line|row lines} and {cuts} {cuts|cut|cuts} following the outline.": "Dodano {rows} {rows|linię rzędu|linie rzędów|linii rzędów} i {cuts} {cuts|cięcie|cięcia|cięć} wzdłuż obrysu.",
    "Painted areas are locked or hidden (see Layers).": "Pomalowane obszary są zablokowane lub ukryte (zobacz Warstwy).",
    "No closed area here. The red circles show line ends that don’t touch anything.": "Tu nie ma zamkniętego obszaru. Czerwone kółka pokazują końce linii, które niczego nie dotykają.",
    "No closed area here – make sure the lines meet.": "Tu nie ma zamkniętego obszaru – sprawdź, czy linie się stykają.",
    "Click to select (Shift adds) · drag to move – the nearest corner snaps · drag handles to edit; shared corners move together (Alt detaches) · yellow handles resize a polygon": "Kliknij, aby zaznaczyć (Shift dodaje) · przeciągnij, aby przesunąć – najbliższy narożnik się przyciąga · przeciągaj uchwyty, aby edytować; wspólne narożniki przesuwają się razem (Alt je rozdziela) · żółte uchwyty zmieniają rozmiar wielokąta",
    "Click–click or drag · ends snap to points and onto other lines · Shift: 15° steps · Alt: no snap · Esc: stop": "Klik–klik lub przeciąganie · końce przyciągają się do punktów i na inne linie · Shift: co 15° · Alt: bez przyciągania · Esc: koniec",
    "Click corner by corner · click the first corner, double-click or press Enter to close · Backspace removes the last corner · Esc cancels": "Klikaj narożnik po narożniku · zamknij kształt kliknięciem pierwszego narożnika, dwuklikiem lub klawiszem Enter · Backspace usuwa ostatni narożnik · Esc anuluje",
    "Drag from the center (or along an edge in “From edge” mode) · click = last size · Shift: 15° rotation · Ctrl: flip side · keys 3–9: sides": "Przeciągnij od środka (lub wzdłuż krawędzi w trybie „Od krawędzi”) · kliknięcie = ostatni rozmiar · Shift: obrót co 15° · Ctrl: odwróć stronę · klawisze 3–9: liczba boków",
    "Drag across a tile to cut it straight through, edge to edge · Shift: 15° steps": "Przeciągnij przez płytkę, aby przeciąć ją prosto od krawędzi do krawędzi · Shift: co 15°",
    "Click inside a closed area to fill it with the chosen pattern": "Kliknij wewnątrz zamkniętego obszaru, aby wypełnić go wybranym wzorem",
    "Click or drag across tiles to paint them · click again to recolor · ∅ swatch erases · Alt+click: pick a color": "Kliknij lub przeciągnij przez płytki, aby je pomalować · kliknij ponownie, aby zmienić kolor · próbka ∅ wymazuje · Alt+klik: pobierz kolor",
    "Drag to pan · mouse wheel zooms": "Przeciągnij, aby przesunąć widok · kółko myszy powiększa",
    "The lines layer is locked or hidden (see Layers).": "Warstwa linii jest zablokowana lub ukryta (zobacz Warstwy).",
    "About {n} tiles – too many, use a bigger tile size.": "Około {n} {n|płytka|płytki|płytek} – za dużo, użyj większych płytek.",
    "About {n} tiles.": "Około {n} {n|płytka|płytki|płytek}.",
    "Load a photo first.": "Najpierw wczytaj zdjęcie.",
    "That gives {n} tiles – use a bigger tile size.": "To daje {n} {n|płytkę|płytki|płytek} – użyj większych płytek.",
    "Before making a mosaic from the photo": "Przed utworzeniem mozaiki ze zdjęcia",
    "From photo": "Ze zdjęcia",
    "New palette “{name}” with {n} {n|color|colors}.": "Nowa paleta „{name}” z {n} {n|kolorem|kolorami|kolorami}.",
    "Made a mosaic of {n} tiles from the photo.": "Ze zdjęcia powstała mozaika z {n} {n|płytki|płytek|płytek}.",
    "Working…": "Pracuję…",
    "Make mosaic": "Utwórz mozaikę",
    "Versions are kept in this browser: every few minutes while you work, and before you open, start or restore another drawing. Restoring keeps your current drawing as a version too.": "Wersje są przechowywane w tej przeglądarce: co kilka minut podczas pracy oraz przed otwarciem, rozpoczęciem lub przywróceniem innego rysunku. Przy przywracaniu bieżący rysunek też zostaje zapisany jako wersja.",
    "No versions yet. A version is kept every few minutes while you work, and before you open or start another drawing.": "Jeszcze brak wersji. Wersja jest zapisywana co kilka minut podczas pracy oraz przed otwarciem lub rozpoczęciem innego rysunku.",
    "{n} painted {n|area|areas}": "{n} {n|pomalowany obszar|pomalowane obszary|pomalowanych obszarów}",
    "Saved by hand": "Zapisano ręcznie",
    "This browser can’t copy images – use PNG to save one instead.": "Ta przeglądarka nie umie kopiować obrazów – zapisz zamiast tego PNG.",
    "Copied the drawing as an image – paste it into the raster app or any other program.": "Skopiowano rysunek jako obraz – wklej go do aplikacji rastrowej lub dowolnego programu.",
    "Could not copy the image (the browser refused).": "Nie udało się skopiować obrazu (przeglądarka odmówiła).",
    "{n} {n|panel|panels} ({rows} × {cols}) · each printed at real size on {s} {paper} {s|sheet|sheets}.": "{n} {n|panel|panele|paneli} ({rows} × {cols}) · każdy drukowany w rzeczywistym rozmiarze na {s} {s|arkuszu|arkuszach|arkuszach} {paper}.",
    "laying plan: {n} {n|panel|panels} ({rows} rows × {cols} columns) of {w} × {h} {unit}": "plan układania: {n} {n|panel|panele|paneli} ({rows} rzędów × {cols} kolumn) o wymiarach {w} × {h} {unit}",
    "Panel {n} – row {row}, column {col}": "Panel {n} – rząd {row}, kolumna {col}",
    "Panel {n}": "Panel {n}",
    "Panel": "Panel",
    "tiles per panel and color": "płytki według paneli i kolorów",
    "laying plan": "plan układania",
    "{c} – click to remove from the mix": "{c} – kliknij, aby usunąć z mieszanki",
    "Shift+click two or more swatches to put them in the mix.": "Kliknij z Shiftem dwie lub więcej próbek, aby dodać je do mieszanki.",
    "Each tile gets one of these {n} colors at random. Shift+click swatches to change the mix.": "Każda płytka dostaje losowo jeden z tych {n} kolorów. Shift+klik na próbkach zmienia mieszankę.",
    "Put at least two colors in the mix first (Shift+click swatches).": "Najpierw dodaj do mieszanki co najmniej dwa kolory (Shift+klik na próbkach).",
    "Mixed the colors of {n} {n|area|areas}.": "Wymieszano kolory {n} {n|obszaru|obszarów|obszarów}.",
    "Select painted areas first.": "Najpierw zaznacz pomalowane obszary.",
    "Cut {n} {n|shape|shapes}. Paste with Ctrl+V – also in another page or drawing.": "Wycięto {n} {n|kształt|kształty|kształtów}. Wklej przez Ctrl+V – także na innej stronie lub w innym rysunku.",
    "Copied {n} {n|shape|shapes}. Paste with Ctrl+V – also in another page or drawing.": "Skopiowano {n} {n|kształt|kształty|kształtów}. Wklej przez Ctrl+V – także na innej stronie lub w innym rysunku.",
    "Pasted {n} {n|shape|shapes}.": "Wklejono {n} {n|kształt|kształty|kształtów}.",
    "Could not store the motifs.": "Nie udało się zapisać motywów.",
    "No motifs yet. Select some shapes and save them.": "Jeszcze brak motywów. Zaznacz kilka kształtów i zapisz je.",
    "{name} – click, then click on the drawing to place it": "{name} – kliknij, a potem kliknij w rysunku, aby go umieścić",
    "Delete this motif": "Usuń ten motyw",
    "Delete the motif “{name}”?": "Usunąć motyw „{name}”?",
    "Select the shapes of the motif first (Select tool).": "Najpierw zaznacz kształty motywu (narzędzie Zaznaczanie).",
    "Name of the motif:": "Nazwa motywu:",
    "Motif {n}": "Motyw {n}",
    "Saved the motif “{name}”.": "Zapisano motyw „{name}”.",
    "This motif could not be read.": "Nie da się odczytać tego motywu.",
    "Placed “{name}”. Click again for another one, R turns it, Esc stops.": "Umieszczono „{name}”. Kliknij ponownie, aby dodać kolejny, R obraca, Esc kończy.",
    "Click to place the motif · R: turn it by 15° (Shift+R: 90°) · Esc: stop": "Kliknij, aby umieścić motyw · R: obrót o 15° (Shift+R: o 90°) · Esc: koniec",
    "There are no motifs to export yet.": "Nie ma jeszcze motywów do eksportu.",
    "Imported {n} {n|motif|motifs}.": "Zaimportowano {n} {n|motyw|motywy|motywów}.",
    "No motifs found in that file.": "W tym pliku nie znaleziono motywów.",
    "That file is not a motif library.": "Ten plik nie jest biblioteką motywów.",
    "Page {n}": "Strona {n}",
    "{name} copy": "{name} – kopia",
    "Page name:": "Nazwa strony:",
    "A project needs at least one page.": "Projekt musi mieć co najmniej jedną stronę.",
    "Delete the page “{name}”? (A copy of the project is kept in History.)": "Usunąć stronę „{name}”? (Kopia projektu zostanie w Historii.)",
    "Before deleting the page {name}": "Przed usunięciem strony {name}",
    "Rename…": "Zmień nazwę…",
    "Duplicate": "Duplikuj",
    "Move left": "Przesuń w lewo",
    "Move right": "Przesuń w prawo",
    "Delete…": "Usuń…",
    "Double-click to rename": "Kliknij dwukrotnie, aby zmienić nazwę",
    "Switch to this page": "Przejdź do tej strony",
    "Page options": "Opcje strony",
    "Load a photo first (Photo section).": "Najpierw wczytaj zdjęcie (sekcja Zdjęcie do odrysowania).",
    "The palette is empty – add colors first.": "Paleta jest pusta – najpierw dodaj kolory.",
    "Colored {n} {n|area|areas} with the closest palette colors": "Pomalowano {n} {n|obszar|obszary|obszarów} najbliższymi kolorami palety",
    "{n} already painted (left as they were)": "{n} już {n|był pomalowany|były pomalowane|było pomalowanych} (bez zmian)",
    "{n} outside the photo": "{n} poza zdjęciem",
    "colors": "kolory",
    "The browser blocked the print window – allow pop-ups for this page.": "Przeglądarka zablokowała okno drukowania – zezwól na wyskakujące okna dla tej strony.",
    "Nothing to import from the raster app.": "Z aplikacji rastrowej nie ma czego importować.",
    "Opened {n} tiles from the raster app – your previous drawing is in History.": "Otwarto {n} {n|płytkę|płytki|płytek} z aplikacji rastrowej – poprzedni rysunek jest w Historii.",
    "<b>{n}</b> painted {n|area|areas} in <b>{c}</b> {c|color|colors}": "<b>{n}</b> {n|pomalowany obszar|pomalowane obszary|pomalowanych obszarów} w <b>{c}</b> {c|kolorze|kolorach|kolorach}",
    "<b>{n}</b> not painted yet": "<b>{n}</b> jeszcze niepomalowanych",
    "everything is painted": "wszystko jest pomalowane",
    "page {w} × {h} {unit}": "strona {w} × {h} {unit}",
    "Color": "Kolor",
    "Areas": "Obszary",
    "Total area": "Łączna powierzchnia",
    "Share": "Udostępnij",
    "Pieces of the size set above, plus waste": "Sztuki o rozmiarze ustawionym powyżej, plus odpad",
    "Pieces to buy": "Sztuk do kupienia",
    "Replace with": "Zastąp przez",
    "Erase": "Wymaż",
    "Nothing is painted yet. Use the paint bucket, or “Color tiles from photo”.": "Nic jeszcze nie jest pomalowane. Użyj wiadra albo „Pokoloruj płytki według zdjęcia”.",
    "Recolored {n} {n|area|areas}.": "Zmieniono kolor: {n} {n|obszar|obszary|obszarów}.",
    "Erased {n} {n|area|areas}.": "Wymazano: {n} {n|obszar|obszary|obszarów}.",
    "Colors that may look alike": "Kolory, które mogą wyglądać podobnie",
    "{a} and {b} {how}": "{a} i {b} {how}",
    "The link would be {kb} KB – too long. Share the file instead, or leave out the photo.": "Link miałby {kb} KB – za długi. Udostępnij raczej plik albo pomiń zdjęcie.",
    "The link is {kb} KB – long links can get cut off in some messengers; sharing the file is safer. Anyone with it can view the mosaic and make their own copy.": "Link ma {kb} KB – długie linki bywają ucinane w niektórych komunikatorach; bezpieczniej jest udostępnić plik. Każdy, kto ma link, może obejrzeć mozaikę i zrobić własną kopię.",
    "The link is {kb} KB. Anyone with it can view the mosaic and make their own copy.": "Link ma {kb} KB. Każdy, kto ma link, może obejrzeć mozaikę i zrobić własną kopię.",
    "Sharing failed.": "Udostępnianie nie powiodło się.",
    "Link copied.": "Skopiowano link.",
    "This share link is damaged or incomplete.": "Ten link jest uszkodzony lub niekompletny.",
    "Before opening a shared mosaic": "Przed otwarciem udostępnionej mozaiki",
    "This is now your own copy – it is saved in this browser like any drawing.": "To jest teraz twoja własna kopia – zapisuje się w tej przeglądarce jak każdy rysunek.",
    "Normal colors": "Zwykłe kolory",
    "Black & white": "Czarno-białe",
    "Red-blind (protanopia)": "Ślepota na czerwień (protanopia)",
    "Green-blind (deuteranopia)": "Ślepota na zieleń (deuteranopia)",
    "Blue-blind (tritanopia)": "Ślepota na niebieski (tritanopia)",
    "look almost the same": "wyglądają prawie tak samo",
    "in black & white": "w czerni i bieli",
    "for red-blind viewers": "dla osób ślepych na czerwień",
    "for green-blind viewers": "dla osób ślepych na zieleń",
    "for blue-blind viewers": "dla osób ślepych na niebieski",
    "look alike {who}": "wyglądają podobnie {who}",
    "{n} {n|tile blends|tiles blend} into a neighbour of another color.": "{n} {n|płytka zlewa się|płytki zlewają się|płytek zlewa się} z sąsiednią płytką innego koloru.",
    "{n} {n|tile blends|tiles blend} into a neighbour of another color (in this view).": "{n} {n|płytka zlewa się|płytki zlewają się|płytek zlewa się} z sąsiednią płytką innego koloru (w tym widoku).",
    "No tile blends into its neighbours.": "Żadna płytka nie zlewa się z sąsiednimi.",
    "Sheet {sheet} – row {row}, column {col} of {cols} · blue strips are covered by the next sheet": "Arkusz {sheet} – rząd {row}, kolumna {col} z {cols} · niebieskie pasy zakrywa następny arkusz",
    "One {paper} sheet ({orientation}), at {pct} % of the real size.": "Jeden arkusz {paper} ({orientation}), {pct} % rzeczywistego rozmiaru.",
    "One {paper} sheet ({orientation}) at real size.": "Jeden arkusz {paper} ({orientation}) w rzeczywistym rozmiarze.",
    "{n} {paper} {n|sheet|sheets} ({orientation}, {rows} × {cols}, overlapping {overlap} mm) at real size.": "{n} {n|arkusz|arkusze|arkuszy} {paper} ({orientation}, {rows} × {cols}, zakładka {overlap} mm) w rzeczywistym rozmiarze.",
    "{n} sheets ({rows} × {cols}), real size {w} × {h} cm": "{n} arkuszy ({rows} × {cols}), rzeczywisty rozmiar {w} × {h} cm",
    "The picture has many colors: it is snapped to the current palette (use “Reduce to palette” to see the result first).": "Obraz ma dużo kolorów: zostanie dopasowany do bieżącej palety (wynik możesz najpierw zobaczyć przez „Zredukuj do palety”).",
    "The picture has many colors: it is snapped to 8 colors suggested from it.": "Obraz ma dużo kolorów: zostanie dopasowany do 8 kolorów zaproponowanych na jego podstawie.",
    "Images": "Obrazy",
    "PNG image": "Obraz PNG",
    "Discard unsaved changes to the current image?\n(Save it first if you want to keep it.)": "Odrzucić niezapisane zmiany w bieżącym obrazie?\n(Najpierw go zapisz, jeśli chcesz go zachować.)",
    "Could not read {name} as an image.": "Nie da się odczytać {name} jako obrazu.",
    "Opened {name} ({w} × {h} px).": "Otwarto {name} ({w} × {h} px).",
    "Size of the new image in pixels (width × height):": "Rozmiar nowego obrazu w pikselach (szerokość × wysokość):",
    "Enter a size like 800 × 600 (at most {max} px a side).": "Podaj rozmiar, np. 800 × 600 (najwyżej {max} px na bok).",
    "Before starting a new image": "Przed rozpoczęciem nowego obrazu",
    "That version could not be read.": "Nie da się odczytać tej wersji.",
    "Export failed.": "Eksport nie powiódł się.",
    "Autosave failed – remember to save your image.": "Autozapis nie powiódł się – pamiętaj, aby zapisać obraz.",
    "The clipboard has no image or color codes.": "W schowku nie ma obrazu ani kodów kolorów.",
    "Versions are kept in this browser: every few minutes while you work, and before you open, start or restore another image. Restoring keeps your current image as a version too.": "Wersje są przechowywane w tej przeglądarce: co kilka minut podczas pracy oraz przed otwarciem, rozpoczęciem lub przywróceniem innego obrazu. Przy przywracaniu bieżący obraz też zostaje zapisany jako wersja.",
    "No versions yet. A version is kept every few minutes while you work, and before you open or start another image.": "Jeszcze brak wersji. Wersja jest zapisywana co kilka minut podczas pracy oraz przed otwarciem lub rozpoczęciem innego obrazu.",
    "The palette is empty – add colors, or let the mosaic suggest some.": "Paleta jest pusta – dodaj kolory albo pozwól mozaice jakieś zaproponować.",
    "There is nothing to make a mosaic from (the area is transparent).": "Nie ma z czego zrobić mozaiki (obszar jest przezroczysty).",
    "From picture": "Z obrazu",
    "Made {n} {n|tile|tiles} in {c} {c|color|colors}.": "Utworzono {n} {n|płytkę|płytki|płytek} w {c} {c|kolorze|kolorach|kolorach}.",
    "The palette is empty.": "Paleta jest pusta.",
    "Every pixel now has a palette color: {n} {n|pixel|pixels} in {c} {c|color|colors}.": "Każdy piksel ma teraz kolor z palety: {n} {n|piksel|piksele|pikseli} w {c} {c|kolorze|kolorach|kolorach}.",
    "At most about {n} tiles in the selection – bigger ones where the picture is calm.": "Najwyżej około {n} {n|płytka|płytki|płytek} w zaznaczeniu – większe tam, gdzie obraz jest spokojny.",
    "At most about {n} tiles – bigger ones where the picture is calm.": "Najwyżej około {n} {n|płytka|płytki|płytek} – większe tam, gdzie obraz jest spokojny.",
    "About {n} tiles in the selection.": "Około {n} {n|płytka|płytki|płytek} w zaznaczeniu.",
    "Turn on “Fill” or “Outline” for polygons.": "Dla wielokątów włącz „Wypełnienie” lub „Obrys”.",
    "Picked “transparent”.": "Wybrano „przezroczysty”.",
    "Picked {c} (not in the palette – add it with “From image”).": "Wybrano kolor {c} (nie ma go w palecie – dodaj go przyciskiem „Z obrazu”).",
    "{n} {n|pixel|pixels}": "{n} {n|piksel|piksele|pikseli}",
    "paint color": "kolor malowania",
    "outline color": "kolor obrysu",
    "Transparent – paints and fills transparent pixels": "Przezroczysty – maluje i wypełnia przezroczystymi pikselami",
    "Recolored {n} {n|pixel|pixels}.": "Zmieniono kolor: {n} {n|piksel|piksele|pikseli}.",
    "Nothing to paste – or the browser didn’t allow reading the clipboard (try Ctrl+V).": "Nie ma czego wkleić – albo przeglądarka nie pozwoliła odczytać schowka (spróbuj Ctrl+V).",
    "Enter a size from 1 to {max} px.": "Podaj rozmiar od 1 do {max} px.",
    "This picture has {n} pieces – too many to number. Make a mosaic or reduce it to the palette first.": "Ten obraz ma {n} {n|kawałek|kawałki|kawałków} – za dużo do numerowania. Najpierw zrób z niego mozaikę lub zredukuj go do palety.",
    "{n} {n|piece|pieces}": "{n} {n|kawałek|kawałki|kawałków}",
    "{n} {n|piece|pieces} in {c} {c|color|colors} · {w} × {h} px": "{n} {n|kawałek|kawałki|kawałków} w {c} {c|kolorze|kolorach|kolorach} · {w} × {h} px",
    "Nothing is painted yet.": "Nic jeszcze nie jest pomalowane.",
    "{w} × {h} mm · {k} mm per pixel": "{w} × {h} mm · {k} mm na piksel",
    "Pieces": "Kawałki",
    "Pixels": "Piksele",
    "Area": "Powierzchnia",
    "transparent": "przezroczysty",
    "({w} × {h} px, not placed yet)": "({w} × {h} px, jeszcze nieumieszczony)",
    "Cut the selection – paste it here, into the vector app or any other program.": "Wycięto zaznaczenie – wklej je tutaj, do aplikacji wektorowej lub dowolnego programu.",
    "Cut the image – paste it here, into the vector app or any other program.": "Wycięto obraz – wklej go tutaj, do aplikacji wektorowej lub dowolnego programu.",
    "Copied the selection – paste it here, into the vector app or any other program.": "Skopiowano zaznaczenie – wklej je tutaj, do aplikacji wektorowej lub dowolnego programu.",
    "Copied the image – paste it here, into the vector app or any other program.": "Skopiowano obraz – wklej go tutaj, do aplikacji wektorowej lub dowolnego programu.",
    "Cut the selection (this browser keeps it for pasting here only).": "Wycięto zaznaczenie (ta przeglądarka przechowa je tylko do wklejenia tutaj).",
    "Cut the image (this browser keeps it for pasting here only).": "Wycięto obraz (ta przeglądarka przechowa go tylko do wklejenia tutaj).",
    "Copied the selection (this browser keeps it for pasting here only).": "Skopiowano zaznaczenie (ta przeglądarka przechowa je tylko do wklejenia tutaj).",
    "Copied the image (this browser keeps it for pasting here only).": "Skopiowano obraz (ta przeglądarka przechowa go tylko do wklejenia tutaj).",
    "Select the part to keep first.": "Najpierw zaznacz część, którą chcesz zachować.",
    "Could not read the pasted image.": "Nie da się odczytać wklejonego obrazu.",
    "The pasted image ({w} × {h}) is bigger than this one ({W} × {H}). Enlarge the canvas to fit it?": "Wklejony obraz ({w} × {h}) jest większy niż ten ({W} × {H}). Powiększyć płótno, aby się zmieścił?",
    "Pasted {w} × {h} px – drag it into place, then press Enter (or click outside it).": "Wklejono {w} × {h} px – przeciągnij na miejsce i naciśnij Enter (albo kliknij obok).",
    "The link would be {kb} KB – too long. Share the file instead (or make the image smaller).": "Link miałby {kb} KB – za długi. Udostępnij raczej plik (albo zmniejsz obraz).",
    "The link is {kb} KB – long links can get cut off in some messengers; sharing the file is safer. Anyone with it can view the image and make their own copy.": "Link ma {kb} KB – długie linki bywają ucinane w niektórych komunikatorach; bezpieczniej jest udostępnić plik. Każdy, kto ma link, może obejrzeć obraz i zrobić własną kopię.",
    "The link is {kb} KB. Anyone with it can view the image and make their own copy.": "Link ma {kb} KB. Każdy, kto ma link, może obejrzeć obraz i zrobić własną kopię.",
    "Before opening a shared image": "Przed otwarciem udostępnionego obrazu",
    "This is now your own copy – it is saved in this browser like any image.": "To jest teraz twoja własna kopia – zapisuje się w tej przeglądarce jak każdy obraz.",
    "Drag to select · drag inside the selection to move it (Alt: a copy) · Enter places it · Ctrl+C / X / V copy, cut, paste": "Przeciągnij, aby zaznaczyć · przeciągnij wewnątrz zaznaczenia, aby je przesunąć (Alt: kopię) · Enter je umieszcza · Ctrl+C / X / V kopiuj, wytnij, wklej",
    "Drag to paint · Shift: straight line · [ ] size · Shift+B: tip · Alt+click: pick a color": "Przeciągnij, aby malować · Shift: prosta linia · [ ] rozmiar · Shift+B: końcówka · Alt+klik: pobierz kolor",
    "Hard pixels in exact colors · Shift: straight line · [ ] size · Alt+click: pick a color": "Ostre piksele w dokładnych kolorach · Shift: prosta linia · [ ] rozmiar · Alt+klik: pobierz kolor",
    "Drag to erase to transparent · Shift: straight line · [ ] size": "Przeciągnij, aby wymazać do przezroczystości · Shift: prosta linia · [ ] rozmiar",
    "Drag a line · Shift: 15° steps": "Przeciągnij linię · Shift: co 15°",
    "Drag from the center · Shift: 15° rotation · keys 3–9: sides": "Przeciągnij od środka · Shift: obrót co 15° · klawisze 3–9: liczba boków",
    "Click to fill the area of similar color · Alt+click: pick a color": "Kliknij, aby wypełnić obszar podobnego koloru · Alt+klik: pobierz kolor",
    "Click to take a color from the image": "Kliknij, aby pobrać kolor z obrazu",
    "No grout – every piece is a tile": "Bez fug – każdy kawałek to płytka",
    "{n} {n|tile|tiles} at {w} × {h} mm – too many: make a mosaic or reduce the picture to the palette first.": "{n} {n|płytka|płytki|płytek} na {w} × {h} mm – za dużo: najpierw zrób mozaikę lub zredukuj obraz do palety.",
    "{n} {n|tile|tiles} at {w} × {h} mm.": "{n} {n|płytka|płytki|płytek} na {w} × {h} mm.",
    "Could not hand the tiles over (browser storage unavailable).": "Nie udało się przekazać płytek (pamięć przeglądarki niedostępna).",
    "3D print": "Druk 3D",
    "Close": "Zamknij",
    "A model where every color stands at its own height. Print it with one nozzle and change the filament at the layers listed below – each tile’s top then shows its color. The 3MF file already contains the filament changes for PrusaSlicer; for other slicers, the plan lists them.": "Model, w którym każdy kolor ma własną wysokość. Wydrukuj go jedną dyszą i zmieniaj filament na warstwach podanych poniżej – wierzch każdej płytki pokaże wtedy jej kolor. Plik 3MF zawiera już zmiany filamentu dla PrusaSlicera; dla innych slicerów znajdziesz je w planie.",
    "Size": "Rozmiar",
    "Size of the model’s smallest step – about your nozzle width": "Rozmiar najmniejszego kroku modelu – mniej więcej szerokość dyszy",
    "Detail": "Szczegółowość",
    "Layer height": "Wysokość warstwy",
    "How many layers each color gets – more layers cover the color below better": "Ile warstw dostaje każdy kolor – więcej warstw lepiej kryje kolor pod spodem",
    "Layers per color": "Warstw na kolor",
    "A plate under everything, printed in the first color. 0: unpainted parts are left open": "Płyta pod wszystkim, drukowana pierwszym kolorem. 0: niepomalowane miejsca zostają otwarte",
    "Base layers": "Warstwy podstawy",
    "Top view of the model": "Widok modelu z góry",
    "Print order (bottom first):": "Kolejność druku (od dołu):",
    "Lighter colors lower: a darker layer covers a lighter one well. Lines (grout) stay at the bottom": "Jaśniejsze kolory niżej: ciemniejsza warstwa dobrze kryje jaśniejszą. Linie (fugi) zostają na dole",
    "Light → dark": "Jasne → ciemne",
    "Dark → light": "Ciemne → jasne",
    "Which filament to load at which layer, as a text file": "Który filament na której warstwie założyć – jako plik tekstowy",
    "Plan": "Plan",
    "Just the shape – add the filament changes from the plan in your slicer": "Sam kształt – dodaj zmiany filamentu z planu w slicerze",
    "The model, with the filament changes for PrusaSlicer": "Model ze zmianami filamentu dla PrusaSlicera",
    "Download 3MF": "Pobierz 3MF",
    "{n} colors make a tall print with many filament changes – reduce the colors first (Raster: “Reduce to palette”).": "{n} {n|kolor daje|kolory dają|kolorów daje} wysoki wydruk z wieloma zmianami filamentu – najpierw zmniejsz liczbę kolorów (Raster: „Zredukuj do palety”).",
    "Detail lowered to {d} mm for this size.": "Szczegółowość obniżona do {d} mm dla tego rozmiaru.",
    "lines": "linie",
    "Print earlier (lower)": "Drukuj wcześniej (niżej)",
    "Print later (higher)": "Drukuj później (wyżej)",
    "{share} % · layers {from}–{to}": "{share} % · warstwy {from}–{to}",
    "{share} % · layers {from}–{to} · change at Z {z}": "{share} % · warstwy {from}–{to} · zmiana na Z {z}",
    "{n} {n|color|colors} · height {h} mm ({layers} {layers|layer|layers}) · {c} filament {c|change|changes}": "{n} {n|kolor|kolory|kolorów} · wysokość {h} mm ({layers} {layers|warstwa|warstwy|warstw}) · {c} {c|zmiana|zmiany|zmian} filamentu",
    "unpainted parts stay at the base ({h} mm)": "niepomalowane miejsca zostają na wysokości podstawy ({h} mm)",
    "unpainted parts are left open": "niepomalowane miejsca zostają otwarte",
    "Mosaic Paint – 3D print plan for {name}.3mf / {name}.stl": "Mosaic Paint – plan druku 3D dla {name}.3mf / {name}.stl",
    "Size {w} × {h} mm · layer height {lh} mm · {lpc} layers per color · base {base} layers": "Rozmiar {w} × {h} mm · wysokość warstwy {lh} mm · {lpc} warstw na kolor · podstawa {base} warstw",
    "Total height {total} mm ({layers} layers). Set the slicer’s first layer height to {lh} mm too.": "Łączna wysokość {total} mm ({layers} warstw). Ustaw w slicerze także wysokość pierwszej warstwy na {lh} mm.",
    "Start with {color} – layers {from}–{to} (base plate included)": "Zacznij od {color} – warstwy {from}–{to} (z płytą podstawy)",
    "Start with {color} – layers {from}–{to}": "Zacznij od {color} – warstwy {from}–{to}",
    "Layer {layer} (Z {z} mm): change to {color} – layers {from}–{to}": "Warstwa {layer} (Z {z} mm): zmień na {color} – warstwy {from}–{to}",
    "PrusaSlicer: the 3MF file already contains these changes – open it and check the layer slider.": "PrusaSlicer: plik 3MF zawiera już te zmiany – otwórz go i sprawdź suwak warstw.",
    "Other slicers (they read only the shape from the 3MF or STL) – add the changes by hand:": "Inne slicery (z 3MF lub STL czytają tylko kształt) – dodaj zmiany ręcznie:",
    "- PrusaSlicer, Bambu Studio, OrcaSlicer: in the preview, move the layer slider to each Z above and click “+” (Add color change, M600).": "- PrusaSlicer, Bambu Studio, OrcaSlicer: w podglądzie ustaw suwak warstw na każdą wysokość Z powyżej i kliknij „+” (Dodaj zmianę koloru, M600).",
    "- Cura: Extensions › Post Processing › Modify G-Code › “Filament Change” at each layer number above.": "- Cura: Rozszerzenia › Przetwarzanie końcowe › Modyfikuj G-code › „Filament Change” przy każdym numerze warstwy powyżej.",
    "- Multi-material printers (AMS, MMU): the same changes work; or assign the filaments to the color changes in the slicer.": "- Drukarki wielomateriałowe (AMS, MMU): te same zmiany działają; albo przypisz filamenty do zmian koloru w slicerze.",
    "Could not read the picture.": "Nie da się odczytać obrazu.",
    "Saved {name}.3mf ({n} triangles; PrusaSlicer reads its {c} filament {c|change|changes}, other slicers need the plan).": "Zapisano {name}.3mf ({n} trójkątów; PrusaSlicer odczyta {c} {c|zmianę|zmiany|zmian} filamentu, inne slicery potrzebują planu).",
    "Saved {name}.stl ({n} triangles). Add the filament changes from the plan in your slicer.": "Zapisano {name}.stl ({n} trójkątów). Dodaj zmiany filamentu z planu w slicerze.",
    "Reading the picture…": "Wczytywanie obrazu…",
    "History": "Historia",
    "Save a version now": "Zapisz wersję teraz",
    "Version history needs browser storage (IndexedDB), which is not available here.": "Historia wersji wymaga pamięci przeglądarki (IndexedDB), która jest tu niedostępna.",
    "Restore": "Przywróć",
    "Version saved.": "Zapisano wersję.",
    "Could not save a version (browser storage unavailable).": "Nie udało się zapisać wersji (pamięć przeglądarki niedostępna).",
    "used by {what}": "używany przez: {what}",
    "Click: {fill} · Right-click: {stroke} · Double-click: edit": "Klik: {fill} · Prawy klik: {stroke} · Dwuklik: edytuj",
    "Remove from palette": "Usuń z palety",
    "Edit color (hex or any CSS color).\nThe drawing is recolored too.": "Edytuj kolor (hex lub dowolny kolor CSS).\nRysunek też zmieni kolor.",
    "Not a valid color: {v}": "Nieprawidłowy kolor: {v}",
    "Paste a color code (or several) into the box, then press Enter.": "Wklej do pola kod koloru (lub kilka) i naciśnij Enter.",
    "No color found in: {text}": "Nie znaleziono koloru w: {text}",
    "Added {n} {n|color|colors}.": "Dodano {n} {n|kolor|kolory|kolorów}.",
    "Already in the palette.": "Już jest w palecie.",
    "Added {n} {n|color|colors} from the clipboard.": "Dodano ze schowka {n} {n|kolor|kolory|kolorów}.",
    "Those colors are already in the palette.": "Te kolory już są w palecie.",
    "Name of the new palette:": "Nazwa nowej palety:",
    "Palette": "Paleta",
    "Created “{name}”. Paste colors to fill it.": "Utworzono „{name}”. Wklej kolory, aby ją wypełnić.",
    "Rename palette:": "Zmień nazwę palety:",
    "Delete the palette “{name}”? (The drawing is not changed.)": "Usunąć paletę „{name}”? (Rysunek się nie zmieni.)",
    "Added {n} {n|color|colors} from the drawing.": "Dodano z rysunku {n} {n|kolor|kolory|kolorów}.",
    "No new colors in the drawing.": "W rysunku nie ma nowych kolorów.",
    "Remove all colors from this palette? (The drawing is not changed.)": "Usunąć wszystkie kolory z tej palety? (Rysunek się nie zmieni.)",
    "Imported {n} {n|color|colors}.": "Zaimportowano {n} {n|kolor|kolory|kolorów}.",
    "No new colors found in {name}": "Nie znaleziono nowych kolorów w {name}",
    "Installed – Mosaic Paint now works offline too.": "Zainstalowano – Mosaic Paint działa teraz także offline.",
    "Simple": "Prosty",
    "Expert": "Ekspert",
    "New": "Nowy",
    "Open…": "Otwórz…",
    "Save": "Zapisz",
    "Save as…": "Zapisz jako…",
    "Copy image": "Kopiuj obraz",
    "Print…": "Drukuj…",
    "Plan…": "Plan…",
    "Report": "Raport",
    "Contrast": "Kontrast",
    "Share of area": "Udział powierzchni",
    "Install app": "Zainstaluj aplikację",
    "You are looking at a shared mosaic.": "Oglądasz udostępnioną mozaikę.",
    "Make my own copy": "Zrób własną kopię",
    "Back to my drawing": "Wróć do mojego rysunku",
    "Remove last corner": "Usuń ostatni narożnik",
    "Cancel": "Anuluj",
    "Colors": "Kolory",
    "Fill": "Wypełnienie",
    "Stroke": "Obrys",
    "Width": "Szerokość",
    "Add color": "Dodaj kolor",
    "Import…": "Importuj…",
    "From drawing": "Z rysunku",
    "Export": "Eksportuj",
    "Clear": "Wyczyść",
    "Click a swatch = fill · right-click = stroke · double-click = edit (also recolors the drawing) · Shift+click = add to the color mix. Ctrl+V on the canvas adds copied colors.": "Klik na próbce = wypełnienie · prawy klik = obrys · dwuklik = edycja (zmienia też kolory rysunku) · Shift+klik = dodaj do mieszanki kolorów. Ctrl+V na płótnie dodaje skopiowane kolory.",
    "Line": "Linia",
    "Chain lines (next line starts at the last end)": "Łącz linie (następna linia zaczyna się na końcu poprzedniej)",
    "Free polygon": "Dowolny wielokąt",
    "Click each corner. Click the first corner again, double-click or press Enter to close it.": "Kliknij każdy narożnik. Aby zamknąć, kliknij ponownie pierwszy narożnik, kliknij dwukrotnie lub naciśnij Enter.",
    "Fill new shapes with the fill color": "Wypełniaj nowe kształty kolorem wypełnienia",
    "Regular polygon": "Wielokąt foremny",
    "Sides": "Boki",
    "From center": "Od środka",
    "From edge": "Od krawędzi",
    "Knife": "Nóż",
    "Press inside a tile and drag in the direction of the cut. The tile is cut straight across, from edge to edge.": "Naciśnij wewnątrz płytki i przeciągnij w kierunku cięcia. Płytka zostanie przecięta prosto od krawędzi do krawędzi.",
    "Pattern": "Wzór",
    "Angle": "Kąt",
    "Rows": "Rzędy",
    "Fill whole page": "Wypełnij całą stronę",
    "Click inside a closed area to fill it with tiles. Painted areas keep their color in every new tile. “Rows following the outline” lays rows along the area’s edge and around shapes inside it (Rows 0 = fill it).": "Kliknij wewnątrz zamkniętego obszaru, aby wypełnić go płytkami. Pomalowane obszary zachowują kolor w każdej nowej płytce. „Rzędy wzdłuż obrysu” układa rzędy wzdłuż krawędzi obszaru i wokół kształtów w nim (Rzędy 0 = wypełnij całość).",
    "Paint bucket": "Wiadro z farbą",
    "Click inside any closed area, or drag across many tiles. Click a painted area again to recolor it. The ∅ swatch erases. Alt+click picks a color.": "Kliknij wewnątrz dowolnego zamkniętego obszaru lub przeciągnij przez wiele płytek. Ponowne kliknięcie pomalowanego obszaru zmienia jego kolor. Próbka ∅ wymazuje. Alt+klik pobiera kolor.",
    "Mix colors (a random one per tile)": "Mieszaj kolory (losowy na każdą płytkę)",
    "Avoid the same color next to itself": "Unikaj tego samego koloru obok siebie",
    "Close gaps up to": "Zamykaj szczeliny do",
    "Photo to trace": "Zdjęcie do odrysowania",
    "Opacity": "Krycie",
    "Show": "Pokaż",
    "Locked": "Zablokowane",
    "Fit to page": "Dopasuj do strony",
    "Remove": "Usuń",
    "Keep the photo in saved files": "Zachowuj zdjęcie w zapisanych plikach",
    "Make a mosaic from the photo…": "Utwórz mozaikę ze zdjęcia…",
    "Color my tiles from the photo": "Pokoloruj moje płytki według zdjęcia",
    "Only tiles that aren’t painted yet": "Tylko jeszcze niepomalowane płytki",
    "Each tile gets the palette color closest to the photo underneath it. Draw the tile lines first.": "Każda płytka dostaje kolor z palety najbliższy zdjęciu pod nią. Najpierw narysuj linie płytek.",
    "Grout preview": "Podgląd fug",
    "Preview": "Podgląd",
    "Apply to all lines": "Zastosuj do wszystkich linii",
    "Motifs": "Motywy",
    "Save selection…": "Zapisz zaznaczenie…",
    "Click a motif, then click on the drawing to place it (R turns it, Esc stops). Ctrl+C / Ctrl+X / Ctrl+V copy shapes between pages, drawings and browser tabs.": "Kliknij motyw, a potem kliknij w rysunku, aby go umieścić (R obraca, Esc kończy). Ctrl+C / Ctrl+X / Ctrl+V kopiują kształty między stronami, rysunkami i kartami przeglądarki.",
    "Symmetry": "Symetria",
    "Off": "Wył.",
    "Mirror left ↔ right": "Odbicie lewo ↔ prawo",
    "Mirror top ↕ bottom": "Odbicie góra ↕ dół",
    "Mirror both ways": "Odbicie w obu kierunkach",
    "Rotate around center": "Obrót wokół środka",
    "Copies": "Kopie",
    "also mirrored": "także lustrzane",
    "Pick center": "Wybierz środek",
    "Page center": "Środek strony",
    "Lines, polygons, knife cuts and painting are repeated around the guides.": "Linie, wielokąty, cięcia nożem i malowanie powtarzają się wokół prowadnic.",
    "Layers": "Warstwy",
    "Lines & shapes": "Linie i kształty",
    "Painted areas": "Pomalowane obszary",
    "Photo": "Zdjęcie",
    "Lock the lines while painting so they can’t be moved by accident.": "Zablokuj linie podczas malowania, żeby ich przypadkiem nie przesunąć.",
    "Snapping": "Przyciąganie",
    "Snap to points & lines": "Przyciągaj do punktów i linii",
    "Shared corners move together": "Wspólne narożniki przesuwają się razem",
    "Page edge counts as a line": "Krawędź strony liczy się jako linia",
    "Grid, size": "Siatka, rozmiar",
    "Snaps to ends & corners ▢, crossings ✕, midpoints △, anywhere along a line ◇, centers ○. Hold Alt to place freely.": "Przyciąga do końców i narożników ▢, przecięć ✕, środków odcinków △, dowolnego miejsca na linii ◇ i środków ○. Z wciśniętym Alt umieszczasz swobodnie.",
    "Selection": "Zaznaczenie",
    "Radius": "Promień",
    "Rotation°": "Obrót°",
    "Line width": "Szerokość linii",
    "Delete": "Usuń",
    "To front": "Na wierzch",
    "To back": "Na spód",
    "Mix colors": "Mieszaj kolory",
    "Page": "Strona",
    "Apply": "Zastosuj",
    "Background": "Tło",
    "Show rulers": "Pokaż linijki",
    "Keyboard & mouse": "Klawiatura i mysz",
    "Select, Line, Free polygon, Polygon, Ellipse, Curve, Pattern, Bucket, Pan": "Zaznaczanie, Linia, Dowolny wielokąt, Wielokąt, Elipsa, Krzywa, Wzór, Wiadro, Przesuwanie",
    "Polygon sides": "Liczba boków wielokąta",
    "Toggle snapping": "Włącz / wyłącz przyciąganie",
    "Alt": "Alt",
    "Draw / drag without snapping; detach a shared corner; Alt+click with the bucket picks a color": "Rysuj / przeciągaj bez przyciągania; odłącz wspólny narożnik; Alt+klik wiadrem pobiera kolor",
    "Shift": "Shift",
    "15° steps; add to selection": "Kroki co 15°; dodaj do zaznaczenia",
    "Ctrl (polygon tool)": "Ctrl (narzędzie wielokąt)",
    "Flip side when drawing from an edge": "Odwróć stronę przy rysowaniu od krawędzi",
    "Ctrl + drag handle": "Ctrl + przeciąganie uchwytu",
    "Freely move a polygon corner (it stops being regular)": "Swobodnie przesuń narożnik wielokąta (przestaje być foremny)",
    "Enter / Esc": "Enter / Esc",
    "Finish / cancel the current shape": "Zakończ / anuluj bieżący kształt",
    "Del": "Del",
    "Delete selection (or the last corner of a free polygon)": "Usuń zaznaczenie (lub ostatni narożnik dowolnego wielokąta)",
    "Arrows": "Strzałki",
    "Nudge (Shift = ×10)": "Przesuń (Shift = ×10)",
    "Undo / redo": "Cofnij / ponów",
    "Copy, cut, paste shapes (also between pages and drawings). Ctrl+C with nothing selected copies the drawing as an image; pasting an image makes it the photo to trace": "Kopiuj, wytnij, wklej kształty (także między stronami i rysunkami). Ctrl+C bez zaznaczenia kopiuje rysunek jako obraz; wklejony obraz staje się zdjęciem do odrysowania",
    "Duplicate, select all": "Duplikuj, zaznacz wszystko",
    "Wheel, Space+drag": "Kółko, spacja+przeciąganie",
    "Zoom, pan (two fingers on touch screens)": "Powiększanie, przesuwanie (na ekranach dotykowych dwoma palcami)",
    "Fit page": "Cała strona",
    "＋ Page": "＋ Strona",
    "Colors & shopping list": "Kolory i lista zakupów",
    "Piece size": "Rozmiar sztuki",
    "Waste": "Odpad",
    "“Replace with” recolors every area of that color.": "„Zastąp przez” zmienia kolor wszystkich obszarów tego koloru.",
    "Download CSV": "Pobierz CSV",
    "Print template": "Szablon do druku",
    "Opens a print page to use as a cutting or laying template.": "Otwiera stronę do druku, której użyjesz jako szablonu do cięcia lub układania.",
    "Paper": "Papier",
    "Letter": "Letter",
    "Tabloid (11×17 in)": "Tabloid (11×17 cali)",
    "Real size (split across several sheets if needed)": "Rzeczywisty rozmiar (w razie potrzeby na kilku arkuszach)",
    "Fit on one sheet": "Zmieść na jednym arkuszu",
    "In color": "W kolorze",
    "In color, with color numbers": "W kolorze, z numerami kolorów",
    "Outlines with color numbers (paint by number)": "Kontury z numerami kolorów (malowanie według numerów)",
    "Add a page with the color legend": "Dodaj stronę z legendą kolorów",
    "Mosaic from photo": "Mozaika ze zdjęcia",
    "Lays out tiles over the whole page and gives each tile the color of the photo underneath it.": "Rozkłada płytki na całej stronie i daje każdej płytce kolor zdjęcia pod nią.",
    "First load a photo:": "Najpierw wczytaj zdjęcie:",
    "Tiles": "Płytki",
    "Smaller tiles where the photo has detail": "Mniejsze płytki tam, gdzie zdjęcie ma szczegóły",
    "Use the current palette": "Użyj bieżącej palety",
    "Suggest": "Zaproponuj",
    "colors from the photo (new palette)": "kolorów ze zdjęcia (nowa paleta)",
    "Replace the current drawing (it is kept in History)": "Zastąp bieżący rysunek (zostanie w Historii)",
    "Laying plan": "Plan układania",
    "Splits the mosaic into numbered panels – the size of your work surface or of the mesh sheets you lay the tiles on. The print has an overview, every panel at real size and the number of tiles of each color per panel.": "Dzieli mozaikę na numerowane panele – o rozmiarze twojego blatu roboczego lub siatek, na których układasz płytki. Wydruk zawiera przegląd, każdy panel w rzeczywistym rozmiarze i liczbę płytek każdego koloru w panelu.",
    "Panel size": "Rozmiar panelu",
    "Tabloid": "Tabloid",
    "Color numbers on the tiles": "Numery kolorów na płytkach",
    "Show the panels on the drawing": "Pokaż panele na rysunku",
    "The whole drawing is packed into the link itself – nothing is uploaded. Whoever opens it sees the mosaic and can make their own copy to edit.": "Cały rysunek jest zapakowany w sam link – nic nie jest wysyłane. Kto go otworzy, zobaczy mozaikę i może zrobić własną kopię do edycji.",
    "Include the tracing photo (makes the link much longer)": "Dołącz zdjęcie do odrysowania (link będzie dużo dłuższy)",
    "Share file…": "Udostępnij plik…",
    "Copy link": "Kopiuj link",
    "Switch app": "Przełącz aplikację",
    "Vector: tiles as shapes. Raster: paint with pixels. Palettes are shared; copy and paste images between them.": "Wektor: płytki jako kształty. Raster: malowanie pikselami. Palety są wspólne; obrazy można kopiować i wklejać między nimi.",
    "Simple shows the essentials; Expert adds symmetry, layers, rulers, the knife, printing and fine settings": "Prosty pokazuje to, co najważniejsze; Ekspert dodaje symetrię, warstwy, linijki, nóż, drukowanie i dokładne ustawienia",
    "New drawing": "Nowy rysunek",
    "Open SVG (Ctrl+O) – you can also drop a file on the canvas": "Otwórz SVG (Ctrl+O) – plik możesz też upuścić na płótno",
    "Save SVG (Ctrl+S)": "Zapisz SVG (Ctrl+S)",
    "Save as (Ctrl+Shift+S)": "Zapisz jako (Ctrl+Shift+S)",
    "Export a PNG image": "Eksportuj obraz PNG",
    "Export a 3D model for printing with filament changes – each color at its own height": "Eksportuj model 3D do druku ze zmianami filamentu – każdy kolor na własnej wysokości",
    "Copy the drawing (or the selected shapes) as an image – paste it into the raster app or any other program (Ctrl+C)": "Kopiuj rysunek (lub zaznaczone kształty) jako obraz – wklej go do aplikacji rastrowej lub dowolnego programu (Ctrl+C)",
    "Print a real-size template with color numbers": "Wydrukuj szablon w rzeczywistym rozmiarze z numerami kolorów",
    "Split the mosaic into numbered panels and print a laying plan": "Podziel mozaikę na numerowane panele i wydrukuj plan układania",
    "Colors used, areas and a shopping list": "Użyte kolory, powierzchnie i lista zakupów",
    "Earlier versions of your drawing": "Wcześniejsze wersje twojego rysunku",
    "Share the mosaic as a link": "Udostępnij mozaikę jako link",
    "Undo (Ctrl+Z)": "Cofnij (Ctrl+Z)",
    "Redo (Ctrl+Y)": "Ponów (Ctrl+Y)",
    "Zoom out (-)": "Pomniejsz (-)",
    "Zoom in (+)": "Powiększ (+)",
    "Fit page (0)": "Cała strona (0)",
    "See the mosaic in black & white or as color-blind people see it (screen only)": "Zobacz mozaikę w czerni i bieli lub tak, jak widzą ją osoby z zaburzeniami widzenia barw (tylko na ekranie)",
    "Mark tiles that blend into a neighbouring tile of another color": "Oznacz płytki, które zlewają się z sąsiednią płytką innego koloru",
    "Language": "Język",
    "Install as an app that also works offline": "Zainstaluj jako aplikację, która działa także offline",
    "Show the side panel": "Pokaż panel boczny",
    "Select / edit (V)": "Zaznaczanie / edycja (V)",
    "Line (L)": "Linia (L)",
    "Free polygon – click corner by corner (P)": "Dowolny wielokąt – klikanie narożnik po narożniku (P)",
    "Regular polygon (G)": "Wielokąt foremny (G)",
    "Knife – cut a tile straight across (K)": "Nóż – przetnij płytkę w poprzek (K)",
    "Pattern – fill an area with tiles (T)": "Wzór – wypełnij obszar płytkami (T)",
    "Paint bucket – click or drag across tiles (B)": "Wiadro z farbą – kliknij lub przeciągnij przez płytki (B)",
    "Pan (H, or hold Space / middle mouse / two fingers)": "Przesuwanie (H, albo przytrzymaj spację / środkowy przycisk myszy / dwa palce)",
    "Your saved palettes": "Twoje zapisane palety",
    "New palette": "Nowa paleta",
    "Rename this palette": "Zmień nazwę tej palety",
    "Delete this palette": "Usuń tę paletę",
    "Fill color – used by the paint bucket": "Kolor wypełnienia – używany przez wiadro",
    "Stroke color – used for new lines and polygons": "Kolor obrysu – dla nowych linii i wielokątów",
    "Swap fill and stroke": "Zamień wypełnienie i obrys",
    "Line width for new lines and polygons": "Szerokość linii dla nowych linii i wielokątów",
    "Paste #hex, rgb(), name…": "Wklej #hex, rgb(), nazwę…",
    "Load colors from a .txt / .gpl / .css file": "Wczytaj kolory z pliku .txt / .gpl / .css",
    "Add every color used in the drawing": "Dodaj każdy kolor użyty w rysunku",
    "Download the palette as a list of hex codes": "Pobierz paletę jako listę kodów hex",
    "0 = as many rows as fit": "0 = tyle rzędów, ile się zmieści",
    "Lay out tiles over the whole page and color them from the photo": "Rozłóż płytki na całej stronie i pokoloruj je według zdjęcia",
    "Color the tiles you have drawn": "Pokoloruj narysowane płytki",
    "Grout color": "Kolor fug",
    "Give every line this color and width for real": "Naprawdę nadaj wszystkim liniom ten kolor i szerokość",
    "Save the selected shapes as a motif": "Zapisz zaznaczone kształty jako motyw",
    "Load motifs from a file": "Wczytaj motywy z pliku",
    "Download all motifs as a file": "Pobierz wszystkie motywy jako plik",
    "Give the selected painted areas random colors from the mix": "Nadaj zaznaczonym pomalowanym obszarom losowe kolory z mieszanki",
    "Real-world unit: 1 drawing unit = 1 mm / cm / inch": "Jednostka rzeczywista: 1 jednostka rysunku = 1 mm / cm / cal",
    "Add a page (front, back, a color variant…)": "Dodaj stronę (przód, tył, wariant kolorystyczny…)",
    "Export…": "Eksportuj…",
    "Copy": "Kopiuj",
    "Paste": "Wklej",
    "You are looking at a shared image.": "Oglądasz udostępniony obraz.",
    "Back to my image": "Wróć do mojego obrazu",
    "Place": "Umieść",
    "Paint": "Malowanie",
    "Outline": "Obrys",
    "From image": "Z obrazu",
    "Click a swatch = paint color · right-click = outline color · double-click = edit (also recolors the image). The ∅ swatch paints transparent. Palettes are shared with the vector app.": "Klik na próbce = kolor malowania · prawy klik = kolor obrysu · dwuklik = edycja (zmienia też kolory obrazu). Próbka ∅ maluje przezroczystością. Palety są wspólne z aplikacją wektorową.",
    "Brush": "Pędzel",
    "Smooth edges for lines and polygons": "Gładkie krawędzie linii i wielokątów",
    "The pencil always paints hard pixels in exact palette colors – best for pixel mosaics. Shift: straight lines in 15° steps.": "Ołówek zawsze maluje ostre piksele w dokładnych kolorach palety – najlepszy do mozaik pikselowych. Shift: proste linie co 15°.",
    "Fill with the paint color": "Wypełnij kolorem malowania",
    "Outline in the outline color": "Obrys w kolorze obrysu",
    "Drag from the center. Shift: 15° rotation steps.": "Przeciągnij od środka. Shift: obrót co 15°.",
    "Tolerance": "Tolerancja",
    "Only connected pixels": "Tylko połączone piksele",
    "Fills the area of similar color under the click. Alt+click picks a color.": "Wypełnia obszar podobnego koloru pod kliknięciem. Alt+klik pobiera kolor.",
    "Cut": "Wytnij",
    "Crop": "Przytnij",
    "Drag inside the selection to move it (Alt+drag moves a copy); two fingers on it scale and turn it. Enter places it, Esc cancels.": "Przeciągnij wewnątrz zaznaczenia, aby je przesunąć (Alt+przeciąganie przesuwa kopię); dwa palce na nim skalują i obracają je. Enter je umieszcza, Esc anuluje.",
    "Mosaic": "Mozaika",
    "Make a mosaic…": "Utwórz mozaikę…",
    "Reduce to palette": "Zredukuj do palety",
    "Open as vector tiles…": "Otwórz jako płytki wektorowe…",
    "Works on the selection, or on the whole image when nothing is selected.": "Działa na zaznaczeniu albo na całym obrazie, gdy nic nie jest zaznaczone.",
    "Image": "Obraz",
    "Resize image": "Zmień rozmiar obrazu",
    "Canvas size": "Rozmiar płótna",
    "Pixel grid when zoomed in": "Siatka pikseli po powiększeniu",
    "Select, Brush, Pencil, Eraser, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan": "Zaznaczanie, Pędzel, Ołówek, Gumka, Linia, Wielokąt, Elipsa, Krzywa, Wiadro, Pipeta, Przesuwanie",
    "Smaller / bigger brush": "Mniejszy / większy pędzel",
    "Swap paint and outline colors": "Zamień kolor malowania i obrysu",
    "Alt+click": "Alt+klik",
    "Pick a color": "Pobierz kolor",
    "Straight lines, 15° steps": "Proste linie, co 15°",
    "Copy, cut, paste images (also between the two apps and other programs)": "Kopiuj, wytnij, wklej obrazy (także między obiema aplikacjami i innymi programami)",
    "Select all, clear the selection": "Zaznacz wszystko, wyczyść zaznaczenie",
    "Place / cancel a moved or pasted image": "Umieść / anuluj przesunięty lub wklejony obraz",
    "Fit image, actual pixels": "Cały obraz, rzeczywiste piksele",
    "Real width": "Rzeczywista szerokość",
    "Pieces are areas of one color (tiles). “Replace with” recolors every pixel of that color.": "Kawałki to obszary jednego koloru (płytki). „Zastąp przez” zmienia kolor wszystkich pikseli tego koloru.",
    "The image is packed into the link itself – nothing is uploaded. Whoever opens it sees the image and can make their own copy to edit.": "Obraz jest zapakowany w sam link – nic nie jest wysyłane. Kto go otworzy, zobaczy obraz i może zrobić własną kopię do edycji.",
    "Make a mosaic": "Utwórz mozaikę",
    "Splits the picture into tiles and gives each tile the color underneath it, with grout between the tiles.": "Dzieli obraz na płytki, daje każdej płytce kolor, który jest pod nią, i wstawia fugi między płytki.",
    "Squares": "Kwadraty",
    "Squares, offset rows": "Kwadraty, przesunięte rzędy",
    "Bricks": "Cegły",
    "Hexagons": "Sześciokąty",
    "Irregular (crazy paving)": "Nieregularne (mozaika z odłamków)",
    "Grout": "Fugi",
    "Smaller tiles where the picture has detail": "Mniejsze płytki tam, gdzie obraz ma szczegóły",
    "colors from the picture (new palette)": "kolorów z obrazu (nowa paleta)",
    "Keep the picture’s colors": "Zachowaj kolory obrazu",
    "Open as vector tiles": "Otwórz jako płytki wektorowe",
    "Every piece of the picture (an area of one color) becomes a tile shape in the vector app, at the real size – ready for its print templates, laying plan, 3D print and editing. Your current vector drawing is kept in its History.": "Każdy kawałek obrazu (obszar jednego koloru) staje się kształtem płytki w aplikacji wektorowej, w rzeczywistym rozmiarze – gotowym do szablonów druku, planu układania, druku 3D i edycji. Twój bieżący rysunek wektorowy zostanie w jej Historii.",
    "The grout color becomes the page background; every other piece becomes a tile.": "Kolor fug staje się tłem strony; każdy inny kawałek staje się płytką.",
    "Open in the vector app": "Otwórz w aplikacji wektorowej",
    "Format": "Format",
    "JPEG": "JPEG",
    "WebP": "WebP",
    "Quality": "Jakość",
    "JPEG has no transparency: transparent parts become white.": "JPEG nie ma przezroczystości: przezroczyste miejsca będą białe.",
    "Simple shows the essentials; Expert adds opacity, tolerance, resizing and more": "Prosty pokazuje to, co najważniejsze; Ekspert dodaje krycie, tolerancję, zmianę rozmiaru i więcej",
    "New image": "Nowy obraz",
    "Open an image (Ctrl+O) – you can also drop one on the canvas": "Otwórz obraz (Ctrl+O) – możesz go też upuścić na płótno",
    "Save as PNG (Ctrl+S)": "Zapisz jako PNG (Ctrl+S)",
    "Export as JPEG or WebP": "Eksportuj jako JPEG lub WebP",
    "Colors used, pieces and a shopping list": "Użyte kolory, kawałki i lista zakupów",
    "Earlier versions of your image": "Wcześniejsze wersje twojego obrazu",
    "Share the image as a link": "Udostępnij obraz jako link",
    "Copy the selection (or the whole image) to the clipboard (Ctrl+C)": "Kopiuj zaznaczenie (lub cały obraz) do schowka (Ctrl+C)",
    "Paste an image from the clipboard (Ctrl+V)": "Wklej obraz ze schowka (Ctrl+V)",
    "Fit image (0)": "Cały obraz (0)",
    "Actual pixels (1)": "Rzeczywiste piksele (1)",
    "Select – drag a rectangle, then drag it to move (V)": "Zaznaczanie – przeciągnij prostokąt, potem przeciągnij, aby go przesunąć (V)",
    "Brush – soft edges (B)": "Pędzel – miękkie krawędzie (B)",
    "Pencil – hard pixels in exact colors (P)": "Ołówek – ostre piksele w dokładnych kolorach (P)",
    "Eraser (E)": "Gumka (E)",
    "Paint bucket – fill an area (F)": "Wiadro z farbą – wypełnij obszar (F)",
    "Pick a color (I, or Alt+click with any paint tool)": "Pobierz kolor (I, albo Alt+klik dowolnym narzędziem do malowania)",
    "Your saved palettes (shared with the vector app)": "Twoje zapisane palety (wspólne z aplikacją wektorową)",
    "Paint color – brush, pencil, lines, polygons and the bucket": "Kolor malowania – pędzel, ołówek, linie, wielokąty i wiadro",
    "Outline color – the outline of polygons": "Kolor obrysu – obrys wielokątów",
    "Swap paint and outline colors (X)": "Zamień kolor malowania i obrysu (X)",
    "Brush, pencil, eraser and line size in pixels ( [ and ] )": "Rozmiar pędzla, ołówka, gumki i linii w pikselach ( [ i ] )",
    "Add the colors used in the image (or suggest some for a photo)": "Dodaj kolory użyte w obrazie (albo zaproponuj jakieś dla zdjęcia)",
    "Turn the image (or the selection) into tiles with grout": "Zamień obraz (lub zaznaczenie) w płytki z fugami",
    "Give every pixel the closest palette color": "Nadaj każdemu pikselowi najbliższy kolor z palety",
    "Every tile becomes a shape in the vector app – for its templates, laying plan and editing": "Każda płytka staje się kształtem w aplikacji wektorowej – do jej szablonów, planu układania i edycji",
    "Scale the picture to this size": "Przeskaluj obraz do tego rozmiaru",
    "Change the canvas size, keeping the picture centered": "Zmień rozmiar płótna, obraz zostaje na środku",
    "The width of the finished mosaic": "Szerokość gotowej mozaiki",
    "Herringbone": "Jodełka",
    "Triangles": "Trójkąty",
    "Rings (around the click)": "Pierścienie (wokół kliknięcia)",
    "Rows following the outline": "Rzędy wzdłuż obrysu",
    "portrait": "pionowo",
    "landscape": "poziomo",
    "Vector": "Wektor",
    "Raster": "Raster",
    "Fit": "Całość",
    "Thinnest part": "Najcieńsza część",
    "Raised parts narrower than this – or more than twice as tall as they are wide – are lowered to what is around them, so nothing prints as a thin tower": "Wypukłe miejsca węższe niż ta wartość – lub ponad dwa razy wyższe niż szerokie – zostają obniżone do otoczenia, żeby nic nie drukowało się jako cienka wieżyczka",
    "Grout colors are always printed first, so the lines between the tiles stay low.": "Kolory fug drukują się zawsze jako pierwsze, więc linie między płytkami zostają nisko.",
    "Grout / lines: always printed first, so they stay low": "Fugi / linie: drukują się zawsze jako pierwsze, więc zostają nisko",
    "grout": "fuga",
    "{n} thin {n|piece|pieces} lowered so nothing prints as a thin tower": "{n} {n|cienki kawałek obniżony|cienkie kawałki obniżone|cienkich kawałków obniżonych}, żeby nic nie drukowało się jako cienka wieżyczka",
    "Top view": "Z góry",
    "Drag to turn · wheel or two fingers to zoom · double-click to reset": "Przeciągnij, aby obrócić · kółko lub dwa palce, aby powiększyć · dwuklik przywraca widok",
    "Shows the heights taller than they are, to see the color bands": "Pokazuje wysokości większe niż są, żeby było widać warstwy kolorów",
    "Heights ×": "Wysokości ×",
    "This browser can’t show 3D (WebGL is off).": "Ta przeglądarka nie umie pokazać 3D (WebGL jest wyłączony).",
    "One nozzle – colors by height": "Jedna dysza – kolory według wysokości",
    "Several filaments (AMS, MMU…) – flat": "Kilka filamentów (AMS, MMU…) – płaski",
    "A flat model with one part per color, for printers that switch filaments by themselves. The 3MF file already assigns filament 1, 2, … to the parts – load the filaments in the order listed below.": "Płaski model z jedną częścią na kolor, dla drukarek, które same zmieniają filamenty. Plik 3MF już przypisuje częściom filament 1, 2, … – załaduj filamenty w kolejności podanej poniżej.",
    "How thick the tiles are above the base": "Jak grube są płytki nad podstawą",
    "Tile layers": "Warstwy płytek",
    "Grout colors end this many layers below the tiles, so the lines between them stay low. 0: all flat": "Kolory fug kończą się o tyle warstw niżej niż płytki, więc linie między nimi zostają nisko. 0: wszystko płasko",
    "Grout lower by": "Fugi niżej o",
    "layers": "warstwy",
    "Filaments:": "Filamenty:",
    "Grout colors come first and stay lower than the tiles. The base plate uses filament 1.": "Kolory fug są pierwsze i zostają niżej niż płytki. Płyta podstawy używa filamentu 1.",
    "3MF for": "3MF dla",
    "The model, one part per color with its filament": "Model, jedna część na kolor z jej filamentem",
    "One STL file per color, in a ZIP – load them as parts of one object": "Jeden plik STL na kolor, w ZIP-ie – wczytaj je jako części jednego obiektu",
    "{share} % · filament {k}": "{share} % · filament {k}",
    "{n} {n|color|colors} = {n} {n|filament|filaments} · flat, {h} mm high ({layers} {layers|layer|layers})": "{n} {n|kolor|kolory|kolorów} = {n} {n|filament|filamenty|filamentów} · płaski, wysokość {h} mm ({layers} {layers|warstwa|warstwy|warstw})",
    "Base": "Podstawa",
    "Mosaic Paint – multi-filament plan for {name}.3mf": "Mosaic Paint – plan wielu filamentów dla {name}.3mf",
    "Size {w} × {h} mm · layer height {lh} mm · base {base} {base|layer|layers} · tiles {tile} {tile|layer|layers} · grout {recess} {recess|layer|layers} lower": "Rozmiar {w} × {h} mm · wysokość warstwy {lh} mm · podstawa {base} {base|warstwa|warstwy|warstw} · płytki {tile} {tile|warstwa|warstwy|warstw} · fugi o {recess} {recess|warstwę|warstwy|warstw} niżej",
    "Total height {total} mm.": "Łączna wysokość {total} mm.",
    "Filament {k}: {color} (also the base plate)": "Filament {k}: {color} (także płyta podstawy)",
    "Filament {k}: {color}": "Filament {k}: {color}",
    "{slicer}: open the 3MF – every color is a part of one object with its filament already assigned. Load the filaments in this order (AMS slots, MMU…).": "{slicer}: otwórz 3MF – każdy kolor jest częścią jednego obiektu z już przypisanym filamentem. Załaduj filamenty w tej kolejności (sloty AMS, MMU…).",
    "The 3MF is made for {slicer}: other slicers may read it as one part – then use the STL files.": "Ten 3MF jest przeznaczony dla {slicer}: inne slicery mogą odczytać go jako jedną część – wtedy użyj plików STL.",
    "STL: one file per color in a ZIP. Load them together as one object made of parts and give each its filament.": "STL: jeden plik na kolor w ZIP-ie. Wczytaj je razem jako jeden obiekt z części i każdej przypisz jej filament.",
    "Saved {name}.3mf for {slicer}: {n} {n|part|parts} with their filaments assigned.": "Zapisano {name}.3mf dla {slicer}: {n} {n|część|części|części} z przypisanymi filamentami.",
    "Saved {name}-stl.zip: {n} STL {n|file|files}, one per color. Load them as parts of one object.": "Zapisano {name}-stl.zip: {n} {n|plik|pliki|plików} STL, po jednym na kolor. Wczytaj je jako części jednego obiektu.",
    "Finishing: frame, corners, hanging hole, magnets": "Wykończenie: ramka, narożniki, otwór do zawieszenia, magnesy",
    "A border around the picture. With one nozzle it comes out in the top color, with several filaments in filament 1. 0: none": "Obramowanie wokół obrazu. Przy jednej dyszy wychodzi w górnym kolorze, przy kilku filamentach w filamencie 1. 0: brak",
    "Frame": "Ramka",
    "How many layers the frame stands above the tiles": "O ile warstw ramka wystaje ponad płytki",
    "raised by": "wyższa o",
    "Radius of the outline’s corners. 0: square": "Promień narożników obrysu. 0: ostre",
    "Rounded corners": "Zaokrąglone narożniki",
    "A hole to hang it by, at the top in the middle. 0: none": "Otwór do zawieszenia, u góry pośrodku. 0: brak",
    "Hanging hole": "Otwór do zawieszenia",
    "Four round pockets in the bottom, one near each corner, to glue magnets in: their diameter. 0: none": "Cztery okrągłe gniazda w spodzie, po jednym przy każdym narożniku, do wklejenia magnesów: ich średnica. 0: brak",
    "Magnets": "Magnesy",
    "How deep the magnet pockets are (the magnet’s thickness)": "Jak głębokie są gniazda na magnesy (grubość magnesu)",
    "deep": "głębokość",
    "with the frame {w} × {h} mm, {z} mm high": "z ramką {w} × {h} mm, wysokość {z} mm",
    "The model is too thin for magnet pockets.": "Model jest za cienki na gniazda na magnesy.",
    "The magnet pockets are only {d} mm deep – the model is thinner there.": "Gniazda na magnesy mają tylko {d} mm głębokości – model jest tam cieńszy.",
    "Frame {w} mm wide, up to layer {layer} (Z {z} mm), in filament 1.": "Ramka szerokości {w} mm, do warstwy {layer} (Z {z} mm), filamentem 1.",
    "Frame {w} mm wide: it goes on in {color} up to layer {layer} (Z {z} mm).": "Ramka szerokości {w} mm: ciągnie się w kolorze {color} do warstwy {layer} (Z {z} mm).",
    "Magnet pockets in the bottom: 4 × {d} mm, {depth} mm deep – glue the magnets in after printing.": "Gniazda na magnesy w spodzie: 4 × {d} mm, głębokość {depth} mm – wklej magnesy po wydrukowaniu.",
    "Making the mosaic…": "Tworzenie mozaiki…",
    "Could not make the mosaic.": "Nie udało się utworzyć mozaiki.",
    "Tracing the tiles…": "Odrysowywanie płytek…",
    "Could not trace the tiles.": "Nie udało się odrysować płytek.",
    "Working out the model…": "Obliczanie modelu…",
    "Working out the model… {p} %": "Obliczanie modelu… {p} %",
    "Could not build the 3D model.": "Nie udało się utworzyć modelu 3D.",
    "Building the 3D model…": "Tworzenie modelu 3D…",
    "Building the 3D model… {p} %": "Tworzenie modelu 3D… {p} %",
    "Coaster": "Podkładka",
    "HOME": "DOM",
    "Sign": "Tabliczka",
    "100 × 100 mm, square tiles in rings of color – try 3D… with rounded corners.": "100 × 100 mm, kwadratowe płytki w kolorowych pierścieniach – wypróbuj 3D… z zaokrąglonymi narożnikami.",
    "coaster": "podkladka",
    "A word in tiles with a border – try Report for a shopping list.": "Słowo z płytek z obramowaniem – w Raporcie znajdziesz listę zakupów.",
    "sign": "tabliczka",
    "Welcome to Mosaic Paint": "Witaj w Mosaic Paint",
    "Design a mosaic: draw lines or lay a tile pattern, then paint the tiles. Everything is measured in real millimetres.": "Zaprojektuj mozaikę: narysuj linie lub ułóż wzór płytek, a potem pomaluj płytki. Wszystko jest mierzone w prawdziwych milimetrach.",
    "Draw": "Rysowanie",
    "The tools are on the left: lines and shapes, the tile pattern, and the paint bucket that fills a tile with one click.": "Narzędzia są po lewej: linie i kształty, wzór płytek oraz wiadro, które jednym kliknięciem maluje płytkę.",
    "Pick a color in the palette, then click tiles with the bucket. Palettes are shared with the raster app.": "Wybierz kolor w palecie, a potem klikaj wiadrem płytki. Palety są wspólne z aplikacją rastrową.",
    "When it is done": "Gdy skończysz",
    "Report gives a shopping list, 3D… a model to print, Share a link. Expert mode adds printing at real size and laying plans.": "Raport daje listę zakupów, 3D… model do druku, Udostępnij link. Tryb Ekspert dodaje drukowanie w rzeczywistym rozmiarze i plany układania.",
    "Start from an example": "Zacznij od przykładu",
    "Not sure where to begin? Open an example. The ? button shows this guide again.": "Nie wiesz, od czego zacząć? Otwórz przykład. Przycisk ? pokaże ten przewodnik ponownie.",
    "Pixel heart": "Pikselowe serce",
    "16 × 16 pixel art – every pixel a tile. Try 3D… or Print.": "Pixel art 16 × 16 – każdy piksel to płytka. Wypróbuj 3D… lub Drukuj.",
    "heart": "serce",
    "Heart": "Serce",
    "Sunset mosaic": "Mozaika z zachodem słońca",
    "A picture made into tiles with grout by “Make a mosaic…”. Try Open as vector tiles.": "Obraz zamieniony w płytki z fugami przez „Utwórz mozaikę…”. Wypróbuj Otwórz jako płytki wektorowe.",
    "sunset": "zachod-slonca",
    "Sunset": "Zachód słońca",
    "Welcome to Mosaic Paint Raster": "Witaj w Mosaic Paint Raster",
    "Paint with pixels: pixel art, or a photo turned into a mosaic. Each pixel can become a tile.": "Maluj pikselami: pixel art albo zdjęcie zamienione w mozaikę. Każdy piksel może stać się płytką.",
    "The tools are on the left: pencil, brush, bucket, lines, shapes and selection.": "Narzędzia są po lewej: ołówek, pędzel, wiadro, linie, kształty i zaznaczanie.",
    "Pick a color in the palette. Palettes are shared with the vector app.": "Wybierz kolor w palecie. Palety są wspólne z aplikacją wektorową.",
    "Open a photo, then “Make a mosaic…” turns it into tiles with grout in your palette’s colors.": "Otwórz zdjęcie, a „Utwórz mozaikę…” zrobi z niego płytki z fugami w kolorach twojej palety.",
    "Examples": "Przykłady",
    "Open an example to see how it is made, or to start from it. Your current work is kept in History.": "Otwórz przykład, aby zobaczyć, jak jest zrobiony, albo zacząć od niego. Twoja bieżąca praca zostanie w Historii.",
    "Back": "Wstecz",
    "{k} of {n}": "{k} z {n}",
    "Next": "Dalej",
    "Examples…": "Przykłady…",
    "Example projects to open": "Przykładowe projekty do otwarcia",
    "A short guide to the app": "Krótki przewodnik po aplikacji",
    "Guide": "Przewodnik",
    "Working… {p} %": "Pracuję… {p} %",
    "Your photo": "Twoje zdjęcie",
    "Load a photo and turn it into tiles – smaller where it has detail.": "Wczytaj zdjęcie i zamień je w płytki – mniejsze tam, gdzie ma szczegóły.",
    "Read the G-code your slicer made and check it against this plan: filament changes, filaments and heights": "Wczytaj G-code ze slicera i porównaj go z tym planem: zmiany filamentu, filamenty i wysokości",
    "Check G-code…": "Sprawdź G-code…",
    "Change to {color} at Z {z} mm": "Zmiana na {color} na Z {z} mm",
    "No filament change to {color} at Z {z} mm": "Brak zmiany filamentu na {color} na Z {z} mm",
    "A filament change the plan does not have, at Z {z} mm": "Zmiana filamentu, której nie ma w planie, na Z {z} mm",
    "The top is at {z} mm, as planned": "Wierzch jest na wysokości {z} mm, zgodnie z planem",
    "The top is at {found} mm instead of {z} mm": "Wierzch jest na wysokości {found} mm zamiast {z} mm",
    "Filament {k} ({color}) is not used – assign it to the part “{k} {color}”": "Filament {k} ({color}) nie jest używany – przypisz go do części „{k} {color}”",
    "Filament {k} ({color}) prints up to {z} mm": "Filament {k} ({color}) drukuje do {z} mm",
    "Filament {k} ({color}) prints up to {found} mm instead of {z} mm": "Filament {k} ({color}) drukuje do {found} mm zamiast do {z} mm",
    "No printing found in {name} – is it a G-code file?": "W {name} nie ma żadnego drukowania – czy to plik G-code?",
    "{name}: {n} {n|thing|things} to look at": "{name}: {n} {n|rzecz|rzeczy|rzeczy} do sprawdzenia",
    "{name}: everything matches the plan": "{name}: wszystko zgadza się z planem",
    "Reading the G-code…": "Odczytywanie G-code…",
    "Reading the G-code… {p} %": "Odczytywanie G-code… {p} %",
    "Could not read {name}.": "Nie udało się odczytać {name}.",
    "{name} is {w} × {h} px – painting on it and making mosaics will be slow. Scale it down to {W} × {H} px?": "{name} ma {w} × {h} px – malowanie i mozaiki na nim będą powolne. Zmniejszyć go do {W} × {H} px?",
    "It has many colors: “Reduce to palette” or “Make a mosaic…” turn them into a few you can buy tiles in.": "Ma dużo kolorów: „Zredukuj do palety” lub „Utwórz mozaikę…” zrobią z nich kilka, w których kupisz płytki.",
    "{n} {n|color|colors}": "{n} {n|kolor|kolory|kolorów}",
    "Unpin – it may be cleared with old versions": "Odepnij – może zostać usunięta ze starymi wersjami",
    "Pin – kept when old versions are cleared": "Przypnij – zostaje, gdy stare wersje są usuwane",
    "Name this version": "Nazwij tę wersję",
    "Name of this version:": "Nazwa tej wersji:",
    "Share link": "Link do udostępnienia",
    "What’s new": "Co nowego",
    "Version {v} – what’s new": "Wersja {v} – co nowego",
    "Updated to version {v} – click v{v} in the corner to see what’s new.": "Zaktualizowano do wersji {v} – kliknij v{v} w rogu, aby zobaczyć, co nowego.",
    "The raster app: paint with pixels, turn photos into mosaics, and copy pictures between both apps.": "Aplikacja rastrowa: malowanie pikselami, zdjęcia zamieniane w mozaiki i kopiowanie obrazów między obiema aplikacjami.",
    "3D print: a 3D preview, models for multi-filament printers (AMS, MMU), a frame, rounded corners, a hanging hole and magnet pockets – and a check of the sliced G-code against the plan.": "Druk 3D: podgląd 3D, modele dla drukarek wielofilamentowych (AMS, MMU), ramka, zaokrąglone narożniki, otwór do zawieszenia i gniazda na magnesy – oraz sprawdzanie G-code ze slicera względem planu.",
    "Examples to start from, and a short guide for newcomers.": "Przykłady na start i krótki przewodnik dla początkujących.",
    "German, Slovak and Polish.": "Niemiecki, słowacki i polski.",
    "Heavy work – mosaics, tracing, 3D models – no longer holds up the page.": "Ciężka praca – mozaiki, odrysowywanie, modele 3D – już nie blokuje strony.",
    "History: name and pin versions; see their size and colors.": "Historia: nazywaj i przypinaj wersje; zobacz ich rozmiar i kolory.",
    "Big images can be scaled down when opened.": "Duże obrazy można zmniejszyć przy otwieraniu.",
    "Better keyboard and screen-reader support.": "Lepsza obsługa klawiatury i czytników ekranu.",
    "The vector editor: lines, tile patterns, the paint bucket, palettes, reports, printing at real size and sharing as a link.": "Edytor wektorowy: linie, wzory płytek, wiadro z farbą, palety, raporty, druk w rzeczywistym rozmiarze i udostępnianie linkiem.",
    "Could not sign in to Discord.": "Nie udało się zalogować do Discorda.",
    "Post to the channel": "Wyślij na kanał",
    "Post the picture in this channel, as a reply to the message it came from": "Wyślij obraz na ten kanał jako odpowiedź na wiadomość, z której pochodzi",
    "That image is no longer available in Discord.": "Ten obraz nie jest już dostępny na Discordzie.",
    "Right-click an image in the chat › Apps › Edit image to edit it here – or open or paste one.": "Kliknij prawym przyciskiem obraz na czacie › Aplikacje › Edit image, aby edytować go tutaj – albo otwórz lub wklej jakiś.",
    "Posted to the channel.": "Wysłano na kanał.",
    "The picture is too big for Discord – make it smaller (Image › Resize image).": "Obraz jest za duży dla Discorda – zmniejsz go (Obraz › Zmień rozmiar obrazu).",
    "Could not reach the server.": "Nie można połączyć się z serwerem.",
    "Could not connect to Discord.": "Nie udało się połączyć z Discordem.",
    "Open the editor with “Edit image” (or the app’s launch button) in this chat to post here – or use Copy and paste the picture.": "Otwórz edytor przez „Edit image” (lub przycisk uruchamiania aplikacji) na tym czacie, aby tu wysłać – albo użyj Kopiuj i wklej obraz.",
    "More than 15 minutes have passed, and Discord no longer lets the app post. Use Copy and paste the picture into the chat.": "Minęło ponad 15 minut i Discord nie pozwala już aplikacji wysłać obrazu. Użyj Kopiuj i wklej obraz na czat.",
    "Discord did not take the picture. Use Copy and paste it into the chat.": "Discord nie przyjął obrazu. Użyj Kopiuj i wklej go na czat.",
    "Select the part to keep with the Select tool (V), then crop.": "Narzędziem Zaznaczanie (V) zaznacz część do zachowania, a potem przytnij.",
    "The image is all one color – nothing to trim.": "Obraz jest cały w jednym kolorze – nie ma czego przycinać.",
    "There is no border to trim.": "Nie ma obramowania do przycięcia.",
    "Trimmed to {w} × {h} px.": "Przycięto do {w} × {h} px.",
    "Pen pressure changes the size": "Nacisk pióra zmienia rozmiar",
    "Tip": "Końcówka",
    "Round": "Okrągła",
    "Soft (airbrush)": "Miękka (aerograf)",
    "Spray": "Spray",
    "Calligraphy": "Kaligrafia",
    "Chalk": "Kreda",
    "The shape of the brush and eraser": "Kształt pędzla i gumki",
    "The angle of the calligraphy nib – 45° for right-handed writing, about 135° for left-handed": "Kąt stalówki kaligraficznej – 45° dla praworęcznych, około 135° dla leworęcznych",
    "curve through points": "krzywa przez punkty",
    "B-spline": "B-spline",
    "cubic Bézier": "sześcienna krzywa Béziera",
    "quadratic Bézier": "kwadratowa krzywa Béziera",
    "ellipse": "elipsa",
    "Drag from corner to corner (or from the center) · Shift: a circle · Alt: no snap": "Przeciągnij od rogu do rogu (lub od środka) · Shift: koło · Alt: bez przyciągania",
    "Click the curve’s points · click the first point to close it · double-click or Enter ends it open · Backspace removes the last point · Esc cancels": "Klikaj punkty krzywej · kliknięcie pierwszego punktu ją zamyka · dwuklik lub Enter kończy ją otwartą · Backspace usuwa ostatni punkt · Esc anuluje",
    "Turn on “Fill” or “Outline” for shapes.": "Dla kształtów włącz „Wypełnienie” lub „Obrys”.",
    "Drag from corner to corner (or from the center) · Shift: a circle": "Przeciągnij od rogu do rogu (lub od środka) · Shift: koło",
    "The curve runs smoothly through every point you click.": "Krzywa przechodzi gładko przez każdy kliknięty punkt.",
    "The curve is pulled towards each point but only touches the first and the last – very smooth, good for flowing lines.": "Każdy punkt przyciąga krzywą, ale dotyka ona tylko pierwszego i ostatniego – bardzo gładka, dobra do płynnych linii.",
    "Click a point, two control points, the next point, two control points … The curve passes through every third point; the control points (round) pull it.": "Kliknij punkt, dwa punkty kontrolne, następny punkt, dwa punkty kontrolne … Krzywa przechodzi przez co trzeci punkt; punkty kontrolne (okrągłe) ją przyciągają.",
    "Click a point, a control point, the next point, a control point … The curve passes through every other point; the control points (round) pull it.": "Kliknij punkt, punkt kontrolny, następny punkt, punkt kontrolny … Krzywa przechodzi przez co drugi punkt; punkty kontrolne (okrągłe) ją przyciągają.",
    "Ellipse": "Elipsa",
    "From corner": "Od rogu",
    "Shift: a circle. Select it to drag its axis ends.": "Shift: koło. Po zaznaczeniu można przeciągać końce jej osi.",
    "Curve": "Krzywa",
    "Type": "Rodzaj",
    "Smooth, through the points": "Gładka, przez punkty",
    "Smooth, near the points (B-spline)": "Gładka, przy punktach (B-spline)",
    "Bézier, cubic": "Bézier, sześcienna",
    "Bézier, quadratic": "Bézier, kwadratowa",
    "Ellipse – Shift: circle (O)": "Elipsa – Shift: koło (O)",
    "Curve – click its points (C)": "Krzywa – klikaj jej punkty (C)",
    "Shift: a circle.": "Shift: koło.",
    "An open curve is a line in the paint color, as thick as the size; a closed one is filled and outlined like the shapes.": "Otwarta krzywa to linia w kolorze malowania o wybranym rozmiarze; zamknięta jest wypełniana i obrysowywana jak kształty.",
    "Ellipses and curves in both apps: the Ellipse tool (O, Shift for a circle) and the Curve tool (C) – smooth through the points, smooth near them (B-spline), or cubic and quadratic Bézier.": "Elipsy i krzywe w obu aplikacjach: narzędzie Elipsa (O, z Shiftem koło) i narzędzie Krzywa (C) – gładka przez punkty, gładka przy punktach (B-spline) albo sześcienna i kwadratowa krzywa Béziera.",
    "In the vector app, ellipses and curves stay exact curves: drag their points or axis ends to change them, and paint, cut and mirror them like any tile.": "W aplikacji wektorowej elipsy i krzywe pozostają dokładnymi krzywymi: przeciągaj ich punkty lub końce osi, aby je zmienić, i maluj, tnij oraz odbijaj je jak każdą płytkę.",
    "Shift+B": "Shift+B",
    "Next brush tip": "Następna końcówka pędzla",
    "Brush tip: {tip}": "Końcówka pędzla: {tip}",
    "Brush tips for the brush and the eraser: soft (airbrush), spray, calligraphy and chalk. Shift+B switches between them.": "Końcówki pędzla i gumki: miękka (aerograf), spray, kaligrafia i kreda. Shift+B przełącza między nimi.",
    "The spray keeps spraying while you hold it still, like an airbrush; the calligraphy nib’s angle can be set (also for left-handed writing).": "Spray pryska dalej, gdy trzymasz go w miejscu, jak aerograf; kąt stalówki kaligraficznej można ustawić (także dla leworęcznych).",
    "Keep proportions": "Zachowaj proporcje",
    "Flip ↔": "Odbij ↔",
    "Flip ↕": "Odbij ↕",
    "Rotate by": "Obróć o",
    "Rotate": "Obróć",
    "Crop to selection": "Przytnij do zaznaczenia",
    "Trim edges": "Przytnij krawędzie",
    "With a graphics tablet or stylus, the brush, pencil and eraser paint thinner the lighter you press": "Z tabletem graficznym lub rysikiem pędzel, ołówek i gumka malują tym cieniej, im lżej naciskasz",
    "Rotate 90° to the left": "Obróć o 90° w lewo",
    "Rotate 90° to the right": "Obróć o 90° w prawo",
    "Flip left ↔ right": "Odbij lewo ↔ prawo",
    "Flip upside down": "Odwróć do góry nogami",
    "Rotate by any angle (clockwise; negative: to the left) – the canvas grows to hold the picture": "Obróć o dowolny kąt (zgodnie z ruchem wskazówek; ujemny: w lewo) – płótno powiększy się, by zmieścić obraz",
    "Keep only the selection (select it with the Select tool first)": "Zachowaj tylko zaznaczenie (najpierw zaznacz narzędziem Zaznaczanie)",
    "Cut off the empty or one-color border around the picture": "Odetnij puste lub jednokolorowe obramowanie wokół obrazu",
    "Edit images from a Discord chat: right-click › Apps › Edit image, draw on it, post it back – in the raster or the vector app.": "Edycja obrazów z czatu na Discordzie: prawy przycisk › Aplikacje › Edit image, rysuj na nim i wyślij z powrotem – w aplikacji rastrowej lub wektorowej.",
    "Pen pressure: with a graphics tablet or stylus, the brush, pencil and eraser paint thinner the lighter you press.": "Nacisk pióra: z tabletem graficznym lub rysikiem pędzel, ołówek i gumka malują tym cieniej, im lżej naciskasz.",
    "Image editing in the raster app: rotate (by 90° or any angle), flip, crop to the selection, trim the border, resize keeping proportions.": "Edycja obrazu w aplikacji rastrowej: obrót (o 90° lub dowolny kąt), odbicie, przycięcie do zaznaczenia, przycięcie krawędzi, zmiana rozmiaru z zachowaniem proporcji.",
    "Choose a color": "Wybierz kolor",
    "Saturation and brightness": "Nasycenie i jasność",
    "Hue": "Odcień",
    "Before": "Przedtem",
    "Color code": "Kod koloru",
    "Also add it to the palette": "Dodaj go też do palety",
    "Use this color": "Użyj tego koloru",
    "Choose…": "Wybierz…",
    "Choose any color: a color area, a hue slider and a color code": "Wybierz dowolny kolor: pole koloru, suwak odcienia i kod koloru",
    "Fill color – used by the paint bucket. Click to choose any color": "Kolor wypełnienia – używany przez wiadro z farbą. Kliknij, aby wybrać dowolny kolor",
    "Stroke color – used for new lines and polygons. Click to choose any color": "Kolor linii – dla nowych linii i wielokątów. Kliknij, aby wybrać dowolny kolor",
    "Paint color – brush, pencil, lines, polygons and the bucket. Click to choose any color": "Kolor malowania – pędzel, ołówek, linie, wielokąty i wiadro. Kliknij, aby wybrać dowolny kolor",
    "Outline color – the outline of polygons. Click to choose any color": "Kolor obrysu – obrys wielokątów. Kliknij, aby wybrać dowolny kolor",
    "Choose any color: a color area, a hue slider and a color code (Choose… under the palette, or click the current colors).": "Wybierz dowolny kolor: pole koloru, suwak odcienia i kod koloru (Wybierz… pod paletą lub kliknij bieżące kolory).",
    "Inside Discord: New, Save as, renaming and the other questions work (they are asked in the page now), and switching between the apps keeps the Post button.": "W Discordzie: Nowy, Zapisz jako, zmiana nazwy i inne pytania działają (są teraz zadawane na stronie), a przełączanie między aplikacjami zachowuje przycisk publikowania.",
    "On phones inside Discord, the top bar stays clear of Discord’s own controls.": "Na telefonach w Discordzie górny pasek nie jest zasłaniany przez elementy sterujące Discorda.",
    "Quick menu": "Szybkie menu",
    "Undo": "Cofnij",
    "Redo": "Ponów",
    "Fit to the screen": "Dopasuj do ekranu",
    "Which color": "Który kolor",
    "Choose any color": "Wybierz dowolny kolor",
    "The palette is empty – use + to choose a color.": "Paleta jest pusta – wybierz kolor przyciskiem +.",
    "Tip: double-tap the drawing for a quick menu – tools, colors and size.": "Wskazówka: stuknij dwukrotnie rysunek, aby otworzyć szybkie menu – narzędzia, kolory i rozmiar.",
    "Quick menu on phones and tablets: double-tap the drawing with a finger for undo, the main tools, colors and size – right where you draw.": "Szybkie menu na telefonach i tabletach: stuknij dwukrotnie palcem rysunek – cofanie, główne narzędzia, kolory i rozmiar, dokładnie tam, gdzie rysujesz.",
    "Tap or click where to copy from.": "Stuknij lub kliknij miejsce, z którego kopiować.",
    "Tap the image where to copy from": "Stuknij obraz w miejscu, z którego kopiować",
    "Copying from {x}, {y}": "Kopiowanie z {x}, {y}",
    "No source yet: the first tap sets it": "Brak źródła: pierwsze stuknięcie je ustawi",
    "Source set – now paint where the copy goes.": "Źródło ustawione – teraz maluj tam, gdzie ma być kopia.",
    "Clone": "Klonowanie",
    "Set source": "Ustaw źródło",
    "Aligned – the source follows the brush": "Wyrównane – źródło podąża za pędzlem",
    "Set where to copy from, then paint where the copy should go. Drag the source disc to move it. Size, tip and opacity are the brush's.": "Ustaw, skąd kopiować, a potem maluj tam, gdzie ma być kopia. Krążek źródła można przeciągnąć. Rozmiar, końcówka i krycie są jak u pędzla.",
    "Clone – paint with a copy of another part of the image · Alt+click or the first tap sets where to copy from (S)": "Klonowanie – maluj kopią innej części obrazu · Alt+klik lub pierwsze stuknięcie ustawia, skąd kopiować (S)",
    "The next tap or click sets where to copy from (or Alt+click)": "Następne stuknięcie lub kliknięcie ustawia, skąd kopiować (lub Alt+klik)",
    "On: the source moves along with the brush from stroke to stroke. Off: every stroke starts copying from the source": "Włączone: źródło przesuwa się z pędzlem od pociągnięcia do pociągnięcia. Wyłączone: każde pociągnięcie kopiuje od źródła",
    "Clone tool in the raster app (S): paint with a copy of another part of the image. Tap (or Alt+click) where to copy from, paint the copy, drag the source disc with a finger to move it; aligned or not, with the brush’s size, tip, opacity and pen pressure.": "Narzędzie Klonowanie w aplikacji rastrowej (S): maluj kopią innej części obrazu. Stuknij (lub Alt+klik) miejsce, z którego kopiować, namaluj kopię, krążek źródła przesuń palcem; wyrównane lub nie, z rozmiarem, końcówką, kryciem i naciskiem pióra jak u pędzla.",
    "Adjust colors": "Dopasuj kolory",
    "Stretch the picture’s tones to the full range": "Rozciągnij tony obrazu na pełny zakres",
    "Auto": "Auto",
    "Reset": "Resetuj",
    "Hold to see the picture as it was": "Przytrzymaj, aby zobaczyć obraz sprzed zmian",
    "Colors adjusted.": "Kolory dopasowane.",
    "Heal": "Korekta",
    "Adjust colors…": "Dopasuj kolory…",
    "Select, Brush, Pencil, Eraser, Clone, Heal, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan": "Zaznaczenie, Pędzel, Ołówek, Gumka, Klonowanie, Korekta, Linia, Wielokąt, Elipsa, Krzywa, Wiadro, Pobierz kolor, Przesuń",
    "Heal – like Clone, but the copy takes the color and light of the place you paint: for blemishes, spots and scratches (J)": "Korekta – jak Klonowanie, ale kopia przejmuje kolor i światło miejsca, gdzie malujesz: na skazy, plamki i rysy (J)",
    "Brightness, contrast, saturation, levels, sharpening and noise smoothing – for the selection or the whole image": "Jasność, kontrast, nasycenie, poziomy, wyostrzanie i wygładzanie szumu – dla zaznaczenia lub całego obrazu",
    "Photo fixes in the raster app: Adjust colors… – brightness, contrast, saturation, levels with Auto, sharpening and noise smoothing, previewed live (hold Before to compare).": "Poprawki zdjęć w aplikacji rastrowej: Dopasuj kolory… – jasność, kontrast, nasycenie, poziomy z przyciskiem Auto, wyostrzanie i wygładzanie szumu, z podglądem na żywo (przytrzymaj Przedtem, aby porównać).",
    "Heal brush (J): paints over blemishes, spots and scratches with texture from elsewhere, in the color and light of the spot.": "Pędzel korygujący (J): zamalowuje skazy, plamki i rysy fakturą z innego miejsca, w kolorze i świetle poprawianego miejsca.",
    "Filling from the surroundings…": "Wypełnianie z otoczenia…",
    "Removed.": "Usunięto.",
    "Could not fill it: {why}": "Nie udało się wypełnić: {why}",
    "Select what to remove first.": "Najpierw zaznacz, co usunąć.",
    "Select": "Zaznaczanie",
    "Rectangle": "Prostokąt",
    "Lasso": "Lasso",
    "Magnetic": "Magnetyczne",
    "Wand": "Różdżka",
    "Add": "Dodaj",
    "Subtract": "Odejmij",
    "Drag inside the selection to move it. Copy, Clear, Fill from surroundings and Adjust colors follow its shape.": "Przeciągnij wewnątrz zaznaczenia, aby je przesunąć. Kopiuj, Wyczyść, Wypełnij z otoczenia i Dopasuj kolory trzymają się jego kształtu.",
    "Paint over what should disappear; when you lift, it is filled from the picture around it. Works best on backgrounds – grass, sky, walls, skin.": "Zamaluj to, co ma zniknąć; po uniesieniu zostanie wypełnione obrazem z otoczenia. Najlepiej działa na tłach – trawa, niebo, ściany, skóra.",
    "Fill with": "Wypełnij przez",
    "Surroundings (built in)": "Otoczenie (wbudowane)",
    "AI (add-on)": "AI (dodatek)",
    "Fill from surroundings": "Wypełnij z otoczenia",
    "Select, Brush, Pencil, Eraser, Clone, Heal, Remove, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan": "Zaznaczenie, Pędzel, Ołówek, Gumka, Klonowanie, Korekta, Usuń, Linia, Wielokąt, Elipsa, Krzywa, Wiadro, Pobierz kolor, Przesuń",
    "Shift / Alt + select": "Shift / Alt + zaznaczanie",
    "Add to / take away from the selection": "Dodaj do zaznaczenia / odejmij od niego",
    "Remove – paint over something to make it disappear: it is filled from the picture around it (R)": "Usuń – zamaluj coś, aby zniknęło: zostanie wypełnione obrazem z otoczenia (R)",
    "Shape": "Kształt",
    "A rectangle: drag across": "Prostokąt: przeciągnij",
    "Freehand: draw around it": "Odręcznie: obrysuj to",
    "Draw roughly along an edge – the line snaps to it": "Rysuj mniej więcej wzdłuż krawędzi – linia się do niej przyciąga",
    "Tap a color: everything similar next to it (or anywhere)": "Stuknij kolor: wszystko podobne obok (lub wszędzie)",
    "New selection": "Nowe zaznaczenie",
    "Replace the selection": "Zastąp zaznaczenie",
    "Add to the selection (or hold Shift)": "Dodaj do zaznaczenia (lub przytrzymaj Shift)",
    "Take away from the selection (or hold Alt)": "Odejmij od zaznaczenia (lub przytrzymaj Alt)",
    "The selected part disappears: filled from the picture around it": "Zaznaczona część znika: wypełniona obrazem z otoczenia",
    "Shaped selections: Lasso, Magnetic (snaps to edges) and Wand (by color), with New / Add / Subtract (or Shift / Alt) – copy, clear, move and Adjust colors follow the shape.": "Zaznaczenia dowolnego kształtu: Lasso, Magnetyczne (przyciąga się do krawędzi) i Różdżka (według koloru), z Nowe / Dodaj / Odejmij (lub Shift / Alt) – kopiowanie, czyszczenie, przesuwanie i Dopasuj kolory trzymają się kształtu.",
    "Removing things: the Remove brush (R) and Fill from surroundings for a selection fill the spot with the picture around it – content-aware, on the device.": "Usuwanie: pędzel Usuń (R) i Wypełnij z otoczenia dla zaznaczenia wypełniają miejsce obrazem z otoczenia – z uwzględnieniem treści, na urządzeniu.",
    "Text": "Tekst",
    "Type here": "Pisz tutaj",
    "Font": "Czcionka",
    "List the fonts installed on this computer (the browser asks first)": "Pokaż czcionki zainstalowane na tym komputerze (przeglądarka najpierw zapyta)",
    "More fonts…": "Więcej czcionek…",
    "Style": "Styl",
    "Bold": "Pogrubienie",
    "Italic": "Kursywa",
    "Alignment": "Wyrównanie",
    "Left": "Do lewej",
    "Center": "Do środka",
    "Right": "Do prawej",
    "Shadow": "Cień",
    "The text is in the paint color, its outline in the outline color. Drag it into place, then press Enter or tap outside it.": "Tekst ma kolor malowania, obrys – kolor obrysu. Przeciągnij go na miejsce, potem naciśnij Enter lub stuknij obok.",
    "{n} fonts listed.": "Wyświetlono czcionek: {n}.",
    "The browser did not list the fonts.": "Przeglądarka nie podała listy czcionek.",
    "Drag the text into place, then press Enter or tap outside it.": "Przeciągnij tekst na miejsce, potem naciśnij Enter lub stuknij obok.",
    "Tap where to copy from (or Alt+click), then paint the copy · drag the source disc to move it": "Stuknij, skąd kopiować (lub Alt+klik), potem maluj kopię · krążek źródła można przeciągnąć",
    "Tap where to copy from (or Alt+click), then paint over the spot – it blends in when you lift": "Stuknij, skąd kopiować (lub Alt+klik), potem zamaluj miejsce – po uniesieniu się wtopi",
    "Paint over what should disappear – it is filled from the surroundings when you lift": "Zamaluj to, co ma zniknąć – po uniesieniu wypełni się z otoczenia",
    "Tap to add text · drag it into place · tap it to edit · Enter places it": "Stuknij, aby dodać tekst · przeciągnij go · stuknij, aby edytować · Enter go umieszcza",
    "Select, Brush, Pencil, Eraser, Clone, Heal, Remove, Text, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan": "Zaznaczenie, Pędzel, Ołówek, Gumka, Klonowanie, Korekta, Usuń, Tekst, Linia, Wielokąt, Elipsa, Krzywa, Wiadro, Pobierz kolor, Przesuń",
    "Text – tap to type; fonts, outline, shadow and curved text (T)": "Tekst – stuknij i pisz; czcionki, obrys, cień i wygięty tekst (T)",
    "Text tool in the raster app (T): any font (also the installed ones, where the browser lists them), size, bold, italic, alignment, outline, shadow and curved text. It floats until placed – drag it, tap it to edit.": "Narzędzie Tekst w aplikacji rastrowej (T): dowolna czcionka (także zainstalowane, gdzie przeglądarka je wyświetla), rozmiar, pogrubienie, kursywa, wyrównanie, obrys, cień i wygięty tekst. Unosi się do czasu umieszczenia – przeciągnij go, stuknij, aby edytować.",
    "The AI could not start in this browser.": "Nie udało się uruchomić AI w tej przeglądarce.",
    "Starting the AI…": "Uruchamianie AI…",
    "The AI could not do it: {why}": "AI nie dała rady: {why}",
    "Looking at the picture…": "Analiza obrazu…",
    "Nothing found there – tap the middle of the object.": "Nic tam nie znaleziono – stuknij środek obiektu.",
    "the AI add-on is not downloaded": "dodatek AI nie jest pobrany",
    "Remove background": "Usuń tło",
    "What is in the picture?": "Co jest na obrazie?",
    "People (portraits)": "Ludzie (portrety)",
    "Any subject (objects, animals, products)": "Dowolny obiekt (przedmioty, zwierzęta, produkty)",
    "Each needs a one-time download – the size is shown before anything is downloaded. Everything runs on this device.": "Każdy wymaga jednorazowego pobrania – rozmiar zobaczysz, zanim cokolwiek zostanie pobrane. Wszystko działa na tym urządzeniu.",
    "Select the subject": "Zaznacz obiekt",
    "Finding the subject…": "Szukanie obiektu…",
    "The subject is selected.": "Obiekt jest zaznaczony.",
    "Background removed.": "Tło usunięte.",
    "Could not load the text recognition.": "Nie udało się wczytać rozpoznawania tekstu.",
    "Reading the text…": "Odczytywanie tekstu…",
    "Text in the picture": "Tekst na obrazie",
    "You can correct it here before copying.": "Możesz go tu poprawić przed skopiowaniem.",
    "Copied.": "Skopiowano.",
    "Select the text and copy it (Ctrl+C).": "Zaznacz tekst i skopiuj go (Ctrl+C).",
    "No text found.": "Nie znaleziono tekstu.",
    "3D relief": "Relief 3D",
    "A 3D-printable relief of the picture (STL): from its brightness, or from the depth an AI sees in a photo.": "Relief obrazu do druku 3D (STL): z jasności albo z głębi, którą AI widzi na zdjęciu.",
    "Brightness – light is high": "Jasność – jasne jest wysoko",
    "Brightness – dark is high (a lithophane: hold it against light)": "Jasność – ciemne jest wysoko (litofan: oglądaj pod światło)",
    "Depth (AI add-on) – near is high": "Głębia (dodatek AI) – bliskie jest wysoko",
    "Relief": "Relief",
    "Low": "Niski",
    "Medium": "Średni",
    "High": "Wysoki",
    "Smoothing": "Wygładzanie",
    "Height map: white is high": "Mapa wysokości: białe jest wysoko",
    "Save STL": "Zapisz STL",
    "Working out the depth…": "Obliczanie głębi…",
    "{w} × {h} mm, {z} mm high": "{w} × {h} mm, wysokość {z} mm",
    "Saved relief.stl.": "Zapisano relief.stl.",
    "Select object (AI)": "Zaznaczanie obiektu (AI)",
    "Tap an object to select it.": "Stuknij obiekt, aby go zaznaczyć.",
    "Object removal (AI)": "Usuwanie obiektów (AI)",
    "Remove fills the spot with a trained model – better on objects and structure than the built-in fill.": "Usuń wypełnia miejsce wytrenowanym modelem – lepiej niż wbudowane wypełnienie przy obiektach i strukturach.",
    "Background removal – people": "Usuwanie tła – ludzie",
    "Removes the background behind people (portraits).": "Usuwa tło za ludźmi (portrety).",
    "Background removal – any subject": "Usuwanie tła – dowolny obiekt",
    "Removes the background behind the main subject: objects, animals, products.": "Usuwa tło za głównym obiektem: przedmioty, zwierzęta, produkty.",
    "Read text (OCR)": "Odczyt tekstu (OCR)",
    "Recognizes text in the image, to copy it.": "Rozpoznaje tekst na obrazie, aby go skopiować.",
    "Depth for 3D relief (AI)": "Głębia do reliefu 3D (AI)",
    "Estimates the depth of a photo for a 3D-printable relief.": "Szacuje głębię zdjęcia do reliefu do druku 3D.",
    "Download failed ({status}).": "Pobieranie nie powiodło się ({status}).",
    "This needs a one-time download of {size}.": "Wymaga to jednorazowego pobrania {size}.",
    "That includes the AI engine ({size}), shared by all AI add-ons.": "Obejmuje to silnik AI ({size}), wspólny dla wszystkich dodatków AI.",
    "It is kept in this browser and works offline afterwards; the Add-ons list in the side panel removes it again. Everything runs on this device – your pictures are not uploaded.": "Zostaje w tej przeglądarce i potem działa także offline; lista Dodatki w panelu bocznym znów go usuwa. Wszystko działa na tym urządzeniu – Twoje obrazy nie są nigdzie wysyłane.",
    "Download {size}": "Pobierz {size}",
    "Downloading…": "Pobieranie…",
    "{name} is ready.": "{name} – gotowe.",
    "Could not download it: {why}": "Nie udało się pobrać: {why}",
    "installed": "zainstalowano",
    "Download": "Pobierz",
    "Used by add-ons: {size}. Sizes include the shared AI engine where it is not downloaded yet.": "Zajęte przez dodatki: {size}. Rozmiary obejmują wspólny silnik AI, jeśli nie jest jeszcze pobrany.",
    "Removed the add-on.": "Usunięto dodatek.",
    "Object (AI)": "Obiekt (AI)",
    "Remove background…": "Usuń tło…",
    "Read text…": "Odczytaj tekst…",
    "3D relief…": "Relief 3D…",
    "Add-ons": "Dodatki",
    "Features that need a one-time download. Nothing is downloaded until you agree; everything runs on this device.": "Funkcje wymagające jednorazowego pobrania. Nic nie jest pobierane bez Twojej zgody; wszystko działa na tym urządzeniu.",
    "Tap an object: the AI selects it (an add-on – asks before downloading)": "Stuknij obiekt: AI go zaznaczy (dodatek – pyta przed pobraniem)",
    "Make the background transparent, or select the subject (an AI add-on – asks before downloading)": "Ustaw przezroczyste tło albo zaznacz obiekt (dodatek AI – pyta przed pobraniem)",
    "Recognize the text in the image or the selection, to copy it (an add-on – asks before downloading)": "Rozpoznaj tekst na obrazie lub w zaznaczeniu, aby go skopiować (dodatek – pyta przed pobraniem)",
    "A 3D-printable relief (STL) from the picture's brightness, or from AI depth": "Relief do druku 3D (STL) z jasności obrazu albo z głębi AI",
    "Add-ons that run on your device, each downloaded only after you agree to its size: Select object (tap it), AI object removal, background removal, Read text (OCR) and depth for 3D reliefs. The side panel lists them and removes them again.": "Dodatki działające na Twoim urządzeniu, pobierane dopiero po akceptacji rozmiaru: zaznaczanie obiektu (stuknięciem), usuwanie obiektów przez AI, usuwanie tła, odczyt tekstu (OCR) i głębia do reliefów 3D. Panel boczny je wyświetla i znów usuwa.",
    "3D relief…: a printable relief (STL) from the picture's brightness – or a lithophane – or from AI depth.": "Relief 3D…: relief do druku (STL) z jasności obrazu – albo litofan – albo z głębi AI.",
    "Layer {n}": "Warstwa {n}",
    "Saved as one picture – Save layers (.ora) in the Layers section keeps the layers.": "Zapisano jako jeden obraz – warstwy zachowa Zapisz warstwy (.ora) w sekcji Warstwy.",
    "The last layer can’t be deleted.": "Ostatniej warstwy nie można usunąć.",
    "There is no layer under this one.": "Pod tą warstwą nie ma żadnej.",
    "Name of the layer:": "Nazwa warstwy:",
    "Hide this layer": "Ukryj tę warstwę",
    "Show this layer": "Pokaż tę warstwę",
    "Show {name}": "Pokaż {name}",
    "Saved {name} with {n} {n|layer|layers}.": "Zapisano {name} z {n} {n|warstwą|warstwami|warstwami}.",
    "Opened {name} ({n} {n|layer|layers}).": "Otwarto {name} ({n} {n|warstwa|warstwy|warstw}).",
    "Could not read this OpenRaster file.": "Nie udało się odczytać tego pliku OpenRaster.",
    "Merge down": "Scal w dół",
    "Flatten": "Spłaszcz",
    "Save layers (.ora)": "Zapisz warstwy (.ora)",
    "Painting and the other tools work on the active layer. Tap a layer to make it active, double-click to rename. Save keeps the picture as it looks; Save layers keeps the layers.": "Malowanie i inne narzędzia działają na aktywnej warstwie. Stuknij warstwę, aby ją aktywować, kliknij dwukrotnie, aby zmienić nazwę. Zapisz zapisuje obraz tak, jak wygląda; Zapisz warstwy zachowuje warstwy.",
    "Layers (.ora)": "Warstwy (.ora)",
    "Layers – the top one first": "Warstwy – najwyższa pierwsza",
    "A new, empty layer above this one": "Nowa, pusta warstwa nad tą",
    "A copy of this layer": "Kopia tej warstwy",
    "Move this layer up": "Przesuń warstwę w górę",
    "Move up": "W górę",
    "Move this layer down": "Przesuń warstwę w dół",
    "Move down": "W dół",
    "Delete this layer": "Usuń tę warstwę",
    "Put this layer onto the one under it": "Nałóż tę warstwę na tę pod nią",
    "All the layers as one": "Wszystkie warstwy w jedną",
    "Save every layer in one file (OpenRaster – GIMP, Krita and others open it); Open… opens it again": "Zapisz wszystkie warstwy w jednym pliku (OpenRaster – otwiera go GIMP, Krita i inne); Otwórz… otwiera go ponownie",
    "Layers in the raster app: paint on the active layer, show / hide, opacity, move, merge, flatten – undo knows them all. Save layers keeps them in an OpenRaster file (.ora – GIMP and Krita open it), and autosave keeps them too.": "Warstwy w aplikacji rastrowej: malowanie na aktywnej warstwie, pokazywanie / ukrywanie, krycie, przesuwanie, scalanie, spłaszczanie – Cofnij zna wszystko. Zapisz warstwy zachowuje je w pliku OpenRaster (.ora – otwiera go GIMP i Krita), zachowuje je też automatyczny zapis.",
    "The AI add-ons on phones: much less memory (no more crash on iPhone when selecting an object) – the CPU engine on iPhone and iPad, and one feature's models at a time.": "Dodatki AI na telefonach: znacznie mniej pamięci (zaznaczanie obiektu na iPhonie już się nie wywala) – na iPhonie i iPadzie silnik CPU i zawsze modele tylko jednej funkcji.",
    "Frame {n} of {count}": "Klatka {n} z {count}",
    "{s} s of {total} s": "{s} s z {total} s",
    "Choose a frame": "Wybierz klatkę",
    "One frame back": "Klatka wstecz",
    "Play / pause": "Odtwórz / pauza",
    "One frame on": "Klatka dalej",
    "Use this frame": "Użyj tej klatki",
    "This video can’t be played here – try a GIF or a screenshot of it.": "Tego wideo nie da się tu odtworzyć – spróbuj GIF-a albo zrzutu ekranu.",
    "GIFs and videos: open one (or, in Discord, a GIF, a video or a Tenor / Giphy GIF from the chat) and choose the frame to edit – with a slider, frame steps and play.": "GIF-y i wideo: otwórz je (w Discordzie także GIF, wideo lub GIF z Tenora / Giphy z czatu) i wybierz klatkę do edycji – suwakiem, krokami klatek lub odtwarzaniem.",
    "Everything was selected – now nothing is.": "Zaznaczone było wszystko – teraz nic.",
    "Invert": "Odwróć",
    "Select the other shapes instead (Ctrl+I)": "Zaznacz zamiast tego pozostałe kształty (Ctrl+I)",
    "Adjust": "Dopasuj",
    "Invert selection": "Odwróć zaznaczenie",
    "Invert the selection": "Odwróć zaznaczenie",
    "Brightness, contrast, warmth and the other photo sliders – for the selection or the whole image": "Jasność, kontrast, ciepło i inne suwaki zdjęć – dla zaznaczenia lub całego obrazu",
    "Select what isn't selected (Ctrl+I)": "Zaznacz to, co nie jest zaznaczone (Ctrl+I)",
    "Light": "Światło",
    "Detail and effects": "Szczegóły i efekty",
    "Levels": "Poziomy",
    "Vibrance": "Jaskrawość",
    "Warmth": "Ciepło",
    "Tint": "Zabarwienie",
    "Fade": "Wyblaknięcie",
    "Vignette": "Winieta",
    "Black point": "Punkt czerni",
    "White point": "Punkt bieli",
    "Shadows": "Cienie",
    "Highlights": "Światła",
    "Midtones": "Półtony",
    "Nicer icons for undo / redo, zoom, fit and help; Adjust is in the toolbar and the quick menu, with new sliders – shadows, highlights, warmth, tint, vibrance, fade and vignette. Invert selection (Ctrl+I) in both apps.": "Ładniejsze ikony cofania / ponawiania, powiększania, dopasowania i pomocy; Dopasuj na pasku i w szybkim menu, z nowymi suwakami – cienie, światła, ciepło, zabarwienie, jaskrawość, wyblaknięcie i winieta. Odwracanie zaznaczenia (Ctrl+I) w obu aplikacjach.",
    "Select object (AI) no longer crashes on phones: it now uses MobileSAM, which needs a quarter of the memory (and is faster). Its download is larger (45 MB); the old model is removed.": "Zaznaczanie obiektu (AI) nie wywala się już na telefonach: używa teraz MobileSAM, który potrzebuje jednej czwartej pamięci (i jest szybszy). Pobieranie jest większe (45 MB); stary model zostaje usunięty.",
    "Import a picture": "Importuj obraz",
    "Put a picture from a file into this image – drag it into place, then press Enter (or tap outside it)": "Wstaw obraz z pliku do tego obrazu – przeciągnij go na miejsce, potem naciśnij Enter (lub stuknij obok)",
    "Import… puts a picture from a file into the current image (also in the quick menu): it comes in floating, scaled to fit – drag it into place.": "Importuj… wstawia obraz z pliku do bieżącego obrazu (także w szybkim menu): pojawia się jako pływający, dopasowany rozmiarem – przeciągnij go na miejsce.",
    "Two fingers on a selection": "Dwa palce na zaznaczeniu",
    "Scale, turn and move it (spread, pinch, twist)": "Skalowanie, obrót i przesunięcie (rozsuń, ściśnij, obróć palce)",
    "Two fingers on a selection (or a pasted, imported picture or text) scale and turn it: spread or pinch, twist – and move it. It snaps upright and to its own size, and is always made from the original pixels, so it doesn’t blur. Elsewhere two fingers zoom the view as before.": "Dwa palce na zaznaczeniu (lub wklejonym, zaimportowanym obrazie albo tekście) skalują i obracają je: rozsuń lub ściśnij palce, obróć nimi – i przesuń. Przyciąga się do pionu i oryginalnego rozmiaru, a zawsze powstaje z oryginalnych pikseli, więc się nie rozmywa. Gdzie indziej dwa palce przybliżają widok jak dotąd.",
    "On phones, the Select shapes (and other rows of choices) wrap onto a second line instead of cutting off the last one – Object (AI) can be tapped again.": "Na telefonach kształty zaznaczenia (i inne rzędy opcji) przechodzą do drugiej linii zamiast ucinać ostatnią – Obiekt (AI) znów można nacisnąć."
  };

  // src/shared/i18n.ts
  var LANGS = [["en", "English"], ["cs", "Čeština"], ["de", "Deutsch"], ["sk", "Slovenčina"], ["pl", "Polski"]];
  var DICTS = { en: {}, cs: CS, de: DE, sk: SK, pl: PL };
  var LOCALES = { en: "en", cs: "cs-CZ", de: "de-DE", sk: "sk-SK", pl: "pl-PL" };
  var isLang = (v) => typeof v === "string" && v in LOCALES;
  var KEY = "mz-lang";
  function detect() {
    try {
      const saved = typeof localStorage !== "undefined" && localStorage.getItem(KEY);
      if (isLang(saved)) return saved;
    } catch {
    }
    const nav = typeof window !== "undefined" && typeof navigator !== "undefined" ? (navigator.language || "").slice(0, 2).toLowerCase() : "";
    return isLang(nav) ? nav : "en";
  }
  var lang = detect();
  var dict = DICTS[lang];
  function setLang(l) {
    try {
      localStorage.setItem(KEY, l);
    } catch {
    }
    location.reload();
  }
  var plurals = /* @__PURE__ */ new Map();
  function wordForm(l, n4, forms) {
    let p = plurals.get(l);
    if (!p) plurals.set(l, p = new Intl.PluralRules(LOCALES[l]));
    const c = p.select(n4), i = c === "one" ? 0 : c === "few" ? 1 : forms.length - 1;
    return forms[Math.min(i, forms.length - 1)];
  }
  var num = (v, digits) => v.toLocaleString(LOCALES[lang], digits == null ? void 0 : { minimumFractionDigits: digits, maximumFractionDigits: digits });
  function t(s, vars) {
    let out = dict[s] ?? s;
    if (vars) {
      out = out.replace(/\{(\w+)\|([^}]*)\}/g, (m, k, forms) => k in vars ? wordForm(lang, +vars[k], forms.split("|")) : m);
      out = out.replace(/\{(\w+)\}/g, (m, k) => k in vars ? typeof vars[k] === "number" ? num(vars[k]) : String(vars[k]) : m);
    }
    return out;
  }
  var ATTRS = ["title", "placeholder", "aria-label"];
  function translateDom(root) {
    if (lang === "en") return;
    const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n4 = walk.nextNode(); n4; n4 = walk.nextNode()) {
      const v = n4.nodeValue, key = v.trim();
      if (key && dict[key] != null) n4.nodeValue = v.replace(key, dict[key]);
    }
    for (const el of root.querySelectorAll ? [root, ...root.querySelectorAll("*")] : []) {
      if (!el.getAttribute) continue;
      for (const a of ATTRS) {
        const v = el.getAttribute(a);
        if (v && dict[v.trim()] != null) el.setAttribute(a, dict[v.trim()]);
      }
    }
    if (root === document.body || root === document) document.documentElement.lang = lang;
  }

  // src/shared/i18n-start.ts
  translateDom(document.body);

  // src/shared/a11y.ts
  var SYMBOLS = /^[^\p{L}\p{N}]{0,3}$/u;
  function label(b) {
    if (b.tagName !== "BUTTON") return;
    const title = b.getAttribute("title");
    if (title && SYMBOLS.test((b.textContent || "").trim())) b.setAttribute("aria-label", title);
  }
  function labelAll(root) {
    if (root instanceof Element && root.matches("button")) label(root);
    root.querySelectorAll?.("button[title]").forEach(label);
  }
  labelAll(document.body);
  new MutationObserver((changes) => {
    for (const c of changes) {
      if (c.type === "attributes") label(c.target);
      else c.addedNodes.forEach((n4) => {
        if (n4 instanceof Element) labelAll(n4);
      });
    }
  }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["title"] });

  // src/lib/store.ts
  var appOf = (v) => v.app || "vector";
  var dbp = null;
  function open() {
    if (!dbp) {
      dbp = new Promise((resolve, reject) => {
        if (!window.indexedDB) {
          reject(new Error("IndexedDB is not available"));
          return;
        }
        const r = indexedDB.open("mosaic-paint", 1);
        r.onupgradeneeded = () => {
          const d = r.result;
          if (!d.objectStoreNames.contains("kv")) d.createObjectStore("kv");
          if (!d.objectStoreNames.contains("versions")) d.createObjectStore("versions", { keyPath: "id", autoIncrement: true });
        };
        r.onsuccess = () => resolve(r.result);
        r.onerror = () => reject(r.error);
      });
      dbp.catch(() => {
        dbp = null;
      });
    }
    return dbp;
  }
  async function run(name, mode, fn) {
    const d = await open();
    return new Promise((resolve, reject) => {
      const t2 = d.transaction(name, mode, { durability: "relaxed" }), req = fn(t2.objectStore(name));
      t2.oncomplete = () => resolve(req ? req.result : void 0);
      t2.onerror = t2.onabort = () => reject(t2.error);
    });
  }
  var Store = {
    get: (k) => run("kv", "readonly", (s) => s.get(k)),
    set: (k, v) => run("kv", "readwrite", (s) => s.put(v, k)),
    addVersion: (v) => run("versions", "readwrite", (s) => s.add(v)),
    /** The versions of one app, newest first. */
    async listVersions(app = "vector") {
      return (await run("versions", "readonly", (s) => s.getAll())).filter((v) => appOf(v) === app).sort((a, b) => b.time - a.time);
    },
    deleteVersion: (id) => run("versions", "readwrite", (s) => s.delete(id)),
    /** Saves changes to a version (its title, pinned). */
    updateVersion: (v) => run("versions", "readwrite", (s) => s.put(v)),
    /** Keeps the newest max versions of an app – pinned ones are kept besides. */
    async trimVersions(max, app = "vector") {
      const all = (await Store.listVersions(app)).filter((v) => !v.pinned);
      for (const v of all.slice(max)) await Store.deleteVersion(v.id);
    }
  };

  // src/shared/ui.ts
  var $ = (s) => document.querySelector(s);
  var $$ = (s) => [...document.querySelectorAll(s)];
  var clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  var toastTimer;
  function toast(msg) {
    const t2 = $("#st-msg");
    t2.textContent = msg;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      t2.textContent = "";
    }, Math.min(15e3, 4e3 + msg.length * 60));
  }
  function lsGet(k) {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  }
  function lsSet(k, v) {
    try {
      localStorage.setItem(k, v);
      return true;
    } catch {
      return false;
    }
  }
  function loadSettings(key, into) {
    try {
      Object.assign(into, JSON.parse(lsGet(key) || "{}"));
    } catch {
    }
  }
  var saveSettings = (key, value) => lsSet(key, JSON.stringify(value));
  function download(blob, name) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(a.href);
    }, 3e4);
  }
  function typingIn(t2) {
    if (!t2) return false;
    if (t2.tagName === "TEXTAREA" || t2.tagName === "SELECT" || t2.isContentEditable) return true;
    return t2.tagName === "INPUT" && !["checkbox", "radio", "range", "color", "button", "file"].includes(t2.type);
  }
  function modalOpen() {
    return [...document.querySelectorAll("dialog[open]")].some((d) => {
      try {
        return d.matches(":modal");
      } catch {
        return d.id !== "guide";
      }
    });
  }
  function readAsDataURL(file) {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
  }
  function loadImg(src) {
    return new Promise((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = src;
    });
  }

  // src/lib/colors.ts
  var colors_exports = {};
  __export(colors_exports, {
    VISION: () => VISION,
    deltaE: () => deltaE,
    fromHsv: () => fromHsv,
    fromLab: () => fromLab,
    luminance: () => luminance,
    nearest: () => nearest,
    norm: () => norm,
    parse: () => parse,
    simulate: () => simulate,
    toHsv: () => toHsv,
    toLab: () => toLab,
    toRgb: () => toRgb
  });
  var ctx = null;
  var cache = /* @__PURE__ */ new Map();
  function norm(s) {
    if (s == null) return null;
    const str = String(s).trim();
    if (!str || str === "none") return null;
    if (cache.has(str)) return cache.get(str);
    let t2 = str;
    if (/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(t2)) t2 = "#" + t2;
    let out = null;
    if (CSS.supports("color", t2) && !/^(inherit|initial|unset|revert|currentcolor)$/i.test(t2)) {
      ctx = ctx || document.createElement("canvas").getContext("2d");
      ctx.fillStyle = "#000";
      ctx.fillStyle = t2;
      out = ctx.fillStyle;
    }
    cache.set(str, out);
    return out;
  }
  function parse(text) {
    const out = [];
    for (const line of String(text).split(/\r?\n/)) {
      const g = line.match(/^\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})(\s|$)/);
      if (g && [g[1], g[2], g[3]].every((v) => +v <= 255)) {
        out.push(norm(`rgb(${g[1]},${g[2]},${g[3]})`));
        continue;
      }
      const re = /#[0-9a-f]{3,8}\b|\b[0-9a-f]{6}\b|(?:rgba?|hsla?)\([^)]*\)|\b[a-z]{3,20}\b/gi;
      for (const tok of line.match(re) || []) {
        const c = norm(tok);
        if (c) out.push(c);
      }
    }
    return [...new Set(out.filter(Boolean))];
  }
  function toRgb(c) {
    if (Array.isArray(c)) return c;
    if (/^#[0-9a-f]{6}$/i.test(c)) return [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
    const n4 = norm(c);
    if (!n4) return null;
    if (n4[0] === "#") return [1, 3, 5].map((i) => parseInt(n4.slice(i, i + 2), 16));
    const m = n4.match(/[\d.]+/g);
    return m ? m.slice(0, 3).map(Number) : null;
  }
  function toLab([r, g, b]) {
    const lin = (v) => {
      v /= 255;
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const X = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047;
    const Y = R * 0.2126 + G * 0.7152 + B * 0.0722;
    const Z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;
    const f = (t2) => t2 > 216 / 24389 ? Math.cbrt(t2) : (24389 / 27 * t2 + 16) / 116;
    const fx = f(X), fy = f(Y), fz = f(Z);
    return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
  }
  function fromLab([L, a, b]) {
    const fy = (L + 16) / 116, fx = fy + a / 500, fz = fy - b / 200;
    const inv = (t2) => t2 ** 3 > 216 / 24389 ? t2 ** 3 : (116 * t2 - 16) / (24389 / 27);
    const X = 0.95047 * inv(fx), Y = inv(fy), Z = 1.08883 * inv(fz);
    const gam = (v) => v <= 31308e-7 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
    const rgb = [
      3.2406 * X - 1.5372 * Y - 0.4986 * Z,
      -0.9689 * X + 1.8758 * Y + 0.0415 * Z,
      0.0557 * X - 0.204 * Y + 1.057 * Z
    ].map((v) => Math.round(Math.max(0, Math.min(1, gam(v))) * 255));
    return "#" + rgb.map((v) => v.toString(16).padStart(2, "0")).join("");
  }
  function nearest(rgb, palette, labs) {
    labs = labs || palette.map((c) => toLab(toRgb(c)));
    const l = toLab(rgb);
    let best = null, bd = Infinity;
    palette.forEach((c, i) => {
      const L = labs[i], d = (l[0] - L[0]) ** 2 + (l[1] - L[1]) ** 2 + (l[2] - L[2]) ** 2;
      if (d < bd) {
        bd = d;
        best = c;
      }
    });
    return best;
  }
  var VISION = {
    gray: [0.2126, 0.7152, 0.0722, 0.2126, 0.7152, 0.0722, 0.2126, 0.7152, 0.0722],
    protan: [0.152286, 1.052583, -0.204868, 0.114503, 0.786281, 0.099216, -3882e-6, -0.048116, 1.051998],
    deutan: [0.367322, 0.860646, -0.227968, 0.280085, 0.672501, 0.047413, -0.01182, 0.04294, 0.968881],
    tritan: [1.255528, -0.076749, -0.178779, -0.078411, 0.930809, 0.147602, 4733e-6, 0.691367, 0.3039]
  };
  var toLin = (v) => {
    v /= 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  var fromLin = (v) => Math.round(255 * Math.max(0, Math.min(1, v <= 31308e-7 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055)));
  function simulate(c, type) {
    const rgb = toRgb(c), m = VISION[type];
    if (!rgb || !m) return rgb;
    const [r, g, b] = rgb.map(toLin);
    return [0, 1, 2].map((i) => fromLin(m[i * 3] * r + m[i * 3 + 1] * g + m[i * 3 + 2] * b));
  }
  function deltaE(a, b) {
    const la = toLab(toRgb(a)), lb = toLab(toRgb(b));
    return Math.hypot(la[0] - lb[0], la[1] - lb[1], la[2] - lb[2]);
  }
  function luminance(c) {
    const [r, g, b] = toRgb(c) || [255, 255, 255];
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  function fromHsv(h, s, v) {
    const f = (n4) => {
      const k = (n4 + h / 60) % 6;
      return Math.round(255 * (v - v * s * Math.max(0, Math.min(k, 4 - k, 1))));
    };
    return "#" + [f(5), f(3), f(1)].map((x) => x.toString(16).padStart(2, "0")).join("");
  }
  function toHsv(c) {
    const rgb = toRgb(c);
    if (!rgb) return null;
    const [r, g, b] = rgb.map((x) => x / 255), max = Math.max(r, g, b), d = max - Math.min(r, g, b);
    let h = 0;
    if (d) h = max === r ? (g - b) / d % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [(h * 60 + 360) % 360, max ? d / max : 0, max];
  }

  // src/shared/dialogs.ts
  var dlg = null;
  function box() {
    if (dlg) return dlg;
    dlg = document.createElement("dialog");
    dlg.id = "dlg-ask";
    dlg.innerHTML = `<form method="dialog">
<p class="ask-msg"></p>
<input class="ask-input" type="text" autocomplete="off" spellcheck="false">
<div class="row dlg-foot"><button value="cancel" formnovalidate>${t("Cancel")}</button><button value="ok" class="primary">OK</button></div>
</form>`;
    document.body.append(dlg);
    return dlg;
  }
  function show(message, value) {
    const d = box(), input = d.querySelector(".ask-input");
    d.querySelector(".ask-msg").textContent = message;
    input.hidden = value == null;
    input.value = value ?? "";
    d.returnValue = "cancel";
    return new Promise((resolve) => {
      d.addEventListener("close", () => resolve(d.returnValue === "ok" ? input.value : null), { once: true });
      d.showModal();
      if (value != null) {
        input.focus();
        input.select();
      } else d.querySelector("button.primary").focus();
    });
  }
  var ask = (message, value = "") => show(message, value);
  var askYes = async (message) => await show(message, null) != null;

  // src/shared/color-picker.ts
  var dlg2 = null;
  function box2() {
    if (dlg2) return dlg2;
    dlg2 = document.createElement("dialog");
    dlg2.id = "dlg-color";
    dlg2.innerHTML = `<form method="dialog">
<div class="dlg-head"><h2>${t("Choose a color")}</h2></div>
<div class="cp-sv" tabindex="0" role="slider" aria-label="${t("Saturation and brightness")}"><div class="cp-knob"></div></div>
<input class="cp-hue" type="range" min="0" max="359" step="1" aria-label="${t("Hue")}">
<div class="row cp-row"><span class="cp-old" title="${t("Before")}"></span><span class="cp-new" title="${t("New")}"></span>
<input class="cp-hex" type="text" spellcheck="false" autocomplete="off" aria-label="${t("Color code")}"></div>
<label class="chk"><input type="checkbox" class="cp-add" checked> ${t("Also add it to the palette")}</label>
<div class="row dlg-foot"><button value="cancel" formnovalidate>${t("Cancel")}</button><button value="ok" class="primary">${t("Use this color")}</button></div>
</form>`;
    document.body.append(dlg2);
    return dlg2;
  }
  function chooseColor(initial) {
    const d = box2(), q = (s2) => d.querySelector(s2);
    const sv = q(".cp-sv"), knob = q(".cp-knob"), hue = q(".cp-hue");
    const hex3 = q(".cp-hex"), now = q(".cp-new");
    let [h, s, v] = toHsv(initial || "#808080") || [0, 0, 0.5];
    const color = () => fromHsv(h, s, v);
    const draw = (fromField = false) => {
      sv.style.backgroundColor = `hsl(${h}, 100%, 50%)`;
      knob.style.left = `${s * 100}%`;
      knob.style.top = `${(1 - v) * 100}%`;
      hue.value = String(Math.round(h));
      now.style.background = color();
      if (!fromField) hex3.value = color();
      sv.setAttribute("aria-valuetext", color());
    };
    q(".cp-old").style.background = initial || "transparent";
    const pick2 = (e) => {
      const r = sv.getBoundingClientRect();
      s = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      v = 1 - Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      draw();
    };
    sv.onpointerdown = (e) => {
      sv.setPointerCapture(e.pointerId);
      pick2(e);
    };
    sv.onpointermove = (e) => {
      if (sv.hasPointerCapture(e.pointerId)) pick2(e);
    };
    sv.onkeydown = (e) => {
      const step = e.shiftKey ? 0.1 : 0.02, moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] };
      const m = moves[e.key];
      if (!m) return;
      e.preventDefault();
      s = Math.min(1, Math.max(0, s + m[0]));
      v = Math.min(1, Math.max(0, v + m[1]));
      draw();
    };
    hue.oninput = () => {
      h = +hue.value;
      draw();
    };
    hex3.oninput = () => {
      const c = norm(hex3.value), hsv = c && toHsv(c);
      if (hsv) {
        [h, s, v] = hsv;
        draw(true);
      }
    };
    draw();
    d.returnValue = "cancel";
    return new Promise((resolve) => {
      d.addEventListener("close", () => {
        resolve(d.returnValue === "ok" ? { color: color(), addToPalette: q(".cp-add").checked } : null);
      }, { once: true });
      d.showModal();
      sv.focus();
    });
  }

  // src/shared/palette-ui.ts
  var DEFAULT_PALETTE = ["#264653", "#2a9d8f", "#8ab17d", "#e9c46a", "#f4a261", "#e76f51", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"];
  var SHARED_KEY = "mz-prefs";
  function readShared() {
    try {
      return JSON.parse(lsGet(SHARED_KEY) || "{}");
    } catch {
      return {};
    }
  }
  function loadSharedPalettes(st) {
    const o = readShared();
    if (o.palettes && typeof o.palettes === "object" && Object.keys(o.palettes).length) st.palettes = o.palettes;
    if (o.paletteName && st.palettes[o.paletteName]) st.paletteName = o.paletteName;
  }
  function createPaletteUI(host2) {
    const st = host2.state;
    function uniqueName2(base) {
      let n4 = base, i = 2;
      while (st.palettes[n4]) n4 = `${base} ${i++}`;
      return n4;
    }
    function renderSelect() {
      const sel2 = $("#pal-select");
      sel2.innerHTML = "";
      for (const name of Object.keys(st.palettes)) {
        const o = document.createElement("option");
        o.value = o.textContent = name;
        sel2.append(o);
      }
      sel2.value = st.paletteName;
    }
    function switchPalette2(name) {
      if (!st.palettes[name]) return;
      st.paletteName = name;
      host2.save();
      renderSelect();
      render3();
    }
    function addPalette2(name, colors) {
      const n4 = uniqueName2(name);
      st.palettes[n4] = colors;
      switchPalette2(n4);
      return n4;
    }
    function addColors2(list) {
      let added = 0;
      for (const c of list) if (c && !st.palette.includes(c)) {
        st.palette.push(c);
        added++;
      }
      host2.save();
      render3();
      return added;
    }
    let paletteKey = "";
    function render3() {
      const box4 = $("#palette");
      const counts = host2.counts(), key = st.palette.join();
      if (key === paletteKey && box4.children.length === st.palette.length + 1) {
        [null, ...st.palette].forEach((c, i) => updateSwatch(box4.children[i], c, counts));
      } else {
        paletteKey = key;
        box4.innerHTML = "";
        for (const c of [null, ...st.palette]) box4.append(makeSwatch(c, counts));
      }
      const fb = $("#ac-fill"), sb = $("#ac-stroke");
      fb.className = "acbox" + (st.fill ? "" : " none");
      fb.style.background = st.fill || "";
      if (sb) {
        sb.className = "acbox" + (st.stroke ? "" : " none");
        sb.style.background = st.stroke || "";
      }
      if (host2.rendered) host2.rendered();
    }
    function updateSwatch(d, c, counts) {
      d.classList.toggle("is-fill", c === st.fill);
      d.classList.toggle("is-stroke", c === st.stroke);
      const n4 = c ? counts.get(c) || 0 : 0;
      const num4 = c ? st.palette.indexOf(c) + 1 : 0;
      const N = host2.names;
      d.title = c ? `#${num4}  ${c}${n4 ? " – " + t("used by {what}", { what: host2.usage(n4) }) : ""}
` + t("Click: {fill} · Right-click: {stroke} · Double-click: edit", { fill: N.fill, stroke: N.stroke }) : N.none;
      d.setAttribute("aria-label", c ? `#${num4} ${c}${n4 ? " – " + t("used by {what}", { what: host2.usage(n4) }) : ""}` : N.none);
      d.setAttribute("aria-pressed", String(c === st.fill));
      let b = d.querySelector(".count");
      if (n4 && !b) {
        b = document.createElement("span");
        b.className = "count";
        d.prepend(b);
      }
      if (b) {
        if (n4) b.textContent = n4 > 9999 ? Math.round(n4 / 1e3) + "k" : String(n4);
        else b.remove();
      }
    }
    function makeSwatch(c, counts) {
      const d = document.createElement("div");
      d.className = "swatch" + (c ? "" : " none");
      if (c) d.style.background = c;
      updateSwatch(d, c, counts);
      if (c) {
        const x = document.createElement("button");
        x.className = "del";
        x.textContent = "×";
        x.title = t("Remove from palette");
        x.onclick = (e) => {
          e.stopPropagation();
          removeColor(c);
        };
        x.tabIndex = -1;
        x.setAttribute("aria-hidden", "true");
        d.append(x);
        d.ondblclick = () => editColor(c);
      }
      d.onclick = (e) => {
        if (e.shiftKey && host2.shiftClick) host2.shiftClick(c, e);
        else setFill2(c, true);
      };
      d.oncontextmenu = (e) => {
        e.preventDefault();
        setStroke2(c, true);
      };
      d.setAttribute("role", "button");
      d.tabIndex = 0;
      d.onkeydown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (e.shiftKey) setStroke2(c, true);
          else setFill2(c, true);
        } else if ((e.key === "Delete" || e.key === "Backspace") && c) {
          e.preventDefault();
          e.stopPropagation();
          removeColor(c);
        }
      };
      return d;
    }
    function setFill2(c, apply) {
      st.fill = c;
      host2.save();
      if (!(apply && host2.applyFill && host2.applyFill(c))) render3();
    }
    function setStroke2(c, apply) {
      st.stroke = c;
      host2.save();
      if (!(apply && host2.applyStroke && host2.applyStroke(c))) render3();
    }
    function removeColor(c) {
      st.palette = st.palette.filter((x) => x !== c);
      host2.save();
      render3();
    }
    async function editColor(old) {
      const v = await ask(t("Edit color (hex or any CSS color).\nThe drawing is recolored too."), old);
      if (v == null) return;
      const c = norm(v);
      if (!c) {
        toast(t("Not a valid color: {v}", { v }));
        return;
      }
      if (c === old) return;
      const i = st.palette.indexOf(old);
      if (st.palette.includes(c)) st.palette.splice(i, 1);
      else st.palette[i] = c;
      if (st.fill === old) st.fill = c;
      if (st.stroke === old) st.stroke = c;
      host2.save();
      const msg = host2.recolor ? host2.recolor(old, c) : null;
      if (msg) toast(msg);
      render3();
    }
    function addFromInput2() {
      const inp = $("#color-input");
      const text = inp.value.trim();
      if (!text) {
        inp.focus();
        toast(t("Paste a color code (or several) into the box, then press Enter."));
        return;
      }
      const cols = parse(text);
      if (!cols.length) {
        toast(t("No color found in: {text}", { text }));
        return;
      }
      const n4 = addColors2(cols);
      if (cols.length === 1) setFill2(cols[0], false);
      inp.value = "";
      updatePreview();
      toast(n4 ? t("Added {n} {n|color|colors}.", { n: n4 }) : t("Already in the palette."));
    }
    function updatePreview() {
      const c = parse($("#color-input").value)[0];
      const p = $("#color-preview");
      p.style.background = c || "transparent";
      p.title = c || "";
    }
    function pasteColors2(text) {
      const cols = parse(text);
      if (!cols.length) return false;
      const n4 = addColors2(cols);
      if (cols.length === 1) setFill2(cols[0], false);
      toast(n4 ? t("Added {n} {n|color|colors} from the clipboard.", { n: n4 }) : t("Those colors are already in the palette."));
      return true;
    }
    async function choose(which) {
      const r = await chooseColor(which === "fill" ? st.fill : st.stroke);
      if (!r) return;
      if (r.addToPalette) addColors2([r.color]);
      if (which === "fill") setFill2(r.color, true);
      else setStroke2(r.color, true);
    }
    function bind() {
      const inp = $("#color-input");
      $("#btn-add-color").onclick = addFromInput2;
      $("#btn-choose-color").onclick = () => choose("fill");
      for (const [id, which] of [["#ac-fill", "fill"], ["#ac-stroke", "stroke"]]) {
        const b = $(id);
        if (!b) continue;
        b.setAttribute("role", "button");
        b.setAttribute("aria-label", b.closest("[title]")?.title || "");
        b.tabIndex = 0;
        b.onclick = () => choose(which);
        b.onkeydown = (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            choose(which);
          }
        };
      }
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addFromInput2();
      });
      inp.addEventListener("input", updatePreview);
      inp.addEventListener("paste", () => setTimeout(() => {
        if (parse(inp.value).length) addFromInput2();
      }, 0));
      $("#btn-swap").onclick = () => {
        const f = st.fill;
        st.fill = st.stroke;
        st.stroke = f;
        host2.save();
        render3();
      };
      $("#pal-select").onchange = (e) => switchPalette2(e.target.value);
      $("#btn-pal-new").onclick = async () => {
        const n4 = await ask(t("Name of the new palette:"), uniqueName2(t("Palette")));
        if (!n4 || !n4.trim()) return;
        const name = uniqueName2(n4.trim());
        st.palettes[name] = [];
        switchPalette2(name);
        toast(t("Created “{name}”. Paste colors to fill it.", { name }));
      };
      $("#btn-pal-rename").onclick = async () => {
        const old = st.paletteName, n4 = await ask(t("Rename palette:"), old);
        if (!n4 || !n4.trim() || n4.trim() === old) return;
        const name = uniqueName2(n4.trim()), next = {};
        for (const k of Object.keys(st.palettes)) next[k === old ? name : k] = st.palettes[k];
        st.palettes = next;
        switchPalette2(name);
      };
      $("#btn-pal-delete").onclick = async () => {
        if (!await askYes(t("Delete the palette “{name}”? (The drawing is not changed.)", { name: st.paletteName }))) return;
        delete st.palettes[st.paletteName];
        if (!Object.keys(st.palettes).length) st.palettes[t("My palette")] = [];
        switchPalette2(Object.keys(st.palettes)[0]);
      };
      $("#btn-pal-doc").onclick = () => {
        const n4 = addColors2(host2.docColors());
        toast(n4 ? t("Added {n} {n|color|colors} from the drawing.", { n: n4 }) : t("No new colors in the drawing."));
      };
      $("#btn-pal-export").onclick = () => download(new Blob([st.palette.join("\n") + "\n"], { type: "text/plain" }), st.paletteName + ".txt");
      $("#btn-pal-clear").onclick = async () => {
        if (await askYes(t("Remove all colors from this palette? (The drawing is not changed.)"))) {
          st.palette = [];
          host2.save();
          render3();
        }
      };
      $("#btn-pal-import").onclick = () => $("#pal-file").click();
      $("#pal-file").onchange = async (e) => {
        const f = e.target.files[0];
        if (!f) return;
        const text = await f.text();
        e.target.value = "";
        const n4 = addColors2(parse(text));
        toast(n4 ? t("Imported {n} {n|color|colors}.", { n: n4 }) : t("No new colors found in {name}", { name: f.name }));
      };
      window.addEventListener("storage", (e) => {
        if (e.key !== SHARED_KEY) return;
        loadSharedPalettes(st);
        renderSelect();
        render3();
      });
    }
    return { uniqueName: uniqueName2, renderSelect, switchPalette: switchPalette2, addPalette: addPalette2, addColors: addColors2, render: render3, setFill: setFill2, setStroke: setStroke2, addFromInput: addFromInput2, updatePreview, pasteColors: pasteColors2, bind };
  }

  // src/core/env.ts
  var SVGNS = "http://www.w3.org/2000/svg";
  var svg = $("#canvas");
  var overlaySvg = $("#overlay");
  var stage = $("#stage");
  var docG = $("#mz-doc");
  var defsG = $("#mz-docdefs");
  var fillsG = $("#mz-fills");
  var shapesG = $("#mz-shapes");
  var refG = $("#mz-ref");
  var selG = $("#mz-sel");
  var previewG = $("#mz-preview");
  var snapG = $("#mz-snapmark");
  var guidesG = $("#mz-guides");
  var flashG = $("#mz-flash");
  var pageRect = $("#mz-page");
  var gridRect = $("#mz-gridrect");
  var gridPattern = $("#mz-grid");
  var gridPath = $("#mz-gridpath");
  var EDITABLE = /* @__PURE__ */ new Set(["line", "polyline", "polygon"]);
  var SHAPE_SEL = "line,polyline,polygon,rect,circle,ellipse,path";
  var EXPERT_TOOLS = /* @__PURE__ */ new Set(["knife"]);
  var VERSION_EVERY_MS = 3 * 60 * 1e3;
  var MAX_VERSIONS = 40;
  var state = {
    mode: "simple",
    tool: "select",
    fill: "#e9c46a",
    stroke: "#222222",
    strokeWidth: 2,
    palettes: { [t("My palette")]: [...DEFAULT_PALETTE] },
    paletteName: t("My palette"),
    snap: true,
    link: true,
    grid: false,
    gridSize: 10,
    border: true,
    gapPct: 0.4,
    chain: false,
    sides: 6,
    ngonMode: "center",
    newFill: false,
    ellipseMode: "corner",
    curveType: "catmull",
    lastRadius: 20,
    lastRot: -90,
    pattern: { type: "square", size: 10, angle: 0, rows: 0 },
    sym: { type: "none", n: 8, mirror: false, cx: null, cy: null },
    layers: { ref: { visible: true, locked: true }, fills: { visible: true, locked: false }, shapes: { visible: true, locked: false } },
    refOpacity: 0.5,
    savePhoto: true,
    onlyUnpainted: true,
    grout: { on: false, color: "#b8b2a7", width: 2 },
    rulers: true,
    doc: { x: 0, y: 0, w: 300, h: 300, bg: "#ffffff", unit: "mm" },
    view: { x: 0, y: 0, s: 1 },
    selection: /* @__PURE__ */ new Set(),
    handles: [],
    lineStart: null,
    freePts: null,
    action: null,
    space: false,
    pickCenter: false,
    /** The colors of the current palette. */
    get palette() {
      return this.palettes[this.paletteName] || (this.palettes[this.paletteName] = []);
    },
    set palette(v) {
      this.palettes[this.paletteName] = v;
    }
  };
  var rt = {
    dirty: false,
    fileName: "mosaic.svg",
    fileHandle: null,
    /** Pointer tolerances in screen pixels; bigger on touch screens. */
    snapPx: 10,
    handlePx: 9,
    hitPx: 6
  };
  var hooks = {};
  var on = (name, fn) => {
    (hooks[name] || (hooks[name] = [])).push(fn);
  };
  var emit = (name, ...args) => (hooks[name] || []).forEach((fn) => {
    try {
      fn(...args);
    } catch (e) {
      console.error(e);
    }
  });
  var handlers = (name) => hooks[name] || [];
  var fmt = (n4) => String(Math.round(n4 * 1e3) / 1e3);
  var px = (n4) => n4 / state.view.s;
  var applyM = (m, p) => ({ x: m.a * p.x + m.c * p.y + m.e, y: m.b * p.x + m.d * p.y + m.f });
  var linM = (m, d) => ({ x: m.a * d.x + m.c * d.y, y: m.b * d.x + m.d * d.y });
  var ptsStr = (pts) => pts.map((p) => fmt(p.x) + "," + fmt(p.y)).join(" ");
  var isFill = (el) => el.classList.contains("mz-fill");
  var NUM_RE = /[-+]?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?/gi;
  function mk(tag, attrs = {}, parent) {
    const e = document.createElementNS(SVGNS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function parsePoints(s) {
    const n4 = (s || "").match(NUM_RE) || [];
    const out = [];
    for (let i = 0; i + 1 < n4.length; i += 2) out.push({ x: +n4[i], y: +n4[i + 1] });
    return out;
  }
  var unit = () => state.doc.unit || "px";
  function fmtLen(v) {
    const u = unit();
    return `${(+v).toFixed(u === "cm" || u === "in" ? 2 : 1)} ${u}`;
  }
  function fmtArea(a) {
    const u = unit();
    if (u === "mm") return a >= 100 ? `${(a / 100).toFixed(1)} cm²` : `${a.toFixed(0)} mm²`;
    if (u === "cm") return `${a.toFixed(1)} cm²`;
    if (u === "in") return `${a.toFixed(2)} in²`;
    return `${Math.round(a)} px²`;
  }

  // src/lib/geometry.ts
  var geometry_exports = {};
  __export(geometry_exports, {
    SpatialGrid: () => SpatialGrid,
    bounds: () => bounds,
    chordThrough: () => chordThrough,
    clipSegment: () => clipSegment,
    dist: () => dist,
    distToRings: () => distToRings,
    eps: () => eps,
    findRegion: () => findRegion,
    planarFaces: () => planarFaces,
    pointInPolygon: () => pointInPolygon,
    polygonArea: () => polygonArea,
    project: () => project,
    regionIndex: () => regionIndex,
    regularPolygon: () => regularPolygon,
    segIntersect: () => segIntersect,
    setEps: () => setEps
  });
  var eps = 0.01;
  function setEps(v) {
    eps = v;
  }
  var dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  var cross = (ax, ay, bx, by) => ax * by - ay * bx;
  function project(p, a, b) {
    const dx = b.x - a.x, dy = b.y - a.y;
    const len2 = dx * dx + dy * dy;
    let t2 = len2 ? ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2 : 0;
    t2 = Math.max(0, Math.min(1, t2));
    return { x: a.x + dx * t2, y: a.y + dy * t2, t: t2 };
  }
  function segIntersect(a, b, c, d) {
    const rx2 = b.x - a.x, ry2 = b.y - a.y, sx = d.x - c.x, sy = d.y - c.y;
    const den = cross(rx2, ry2, sx, sy);
    if (Math.abs(den) < 1e-12) return null;
    const qx = c.x - a.x, qy = c.y - a.y;
    const t2 = cross(qx, qy, sx, sy) / den;
    const u = cross(qx, qy, rx2, ry2) / den;
    if (t2 < 0 || t2 > 1 || u < 0 || u > 1) return null;
    return { x: a.x + rx2 * t2, y: a.y + ry2 * t2, t: t2, u };
  }
  function polygonArea(pts) {
    let s = 0;
    for (let i = 0, n4 = pts.length; i < n4; i++) {
      const p = pts[i], q = pts[(i + 1) % n4];
      s += p.x * q.y - q.x * p.y;
    }
    return s / 2;
  }
  function pointInPolygon(p, pts) {
    let inside = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const a = pts[i], b = pts[j];
      if (a.y > p.y !== b.y > p.y && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) inside = !inside;
    }
    return inside;
  }
  function regularPolygon(n4, cx, cy, r, rot) {
    const out = [];
    for (let i = 0; i < n4; i++) {
      const a = rot + i * 2 * Math.PI / n4;
      out.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
    }
    return out;
  }
  function bounds(pts) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const q of pts) {
      if (q.x < x0) x0 = q.x;
      if (q.x > x1) x1 = q.x;
      if (q.y < y0) y0 = q.y;
      if (q.y > y1) y1 = q.y;
    }
    return { x0, y0, x1, y1 };
  }
  var SpatialGrid = class {
    constructor(cell) {
      this.map = /* @__PURE__ */ new Map();
      this.big = [];
      this.cell = cell > 0 ? cell : 1;
    }
    insert(item, b) {
      const c = this.cell, i0 = Math.floor(b.x0 / c), i1 = Math.floor(b.x1 / c), j0 = Math.floor(b.y0 / c), j1 = Math.floor(b.y1 / c);
      if (!Number.isFinite(i0 + i1 + j0 + j1) || (i1 - i0 + 1) * (j1 - j0 + 1) > 4096) {
        this.big.push(item);
        return;
      }
      for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) {
        const k = i + "," + j, list = this.map.get(k);
        if (list) list.push(item);
        else this.map.set(k, [item]);
      }
    }
    /** Items whose cells touch the box (a superset: callers still check exact bounds). */
    query(x0, y0, x1, y1) {
      const c = this.cell, out = new Set(this.big);
      const i0 = Math.floor(x0 / c), i1 = Math.floor(x1 / c), j0 = Math.floor(y0 / c), j1 = Math.floor(y1 / c);
      if ((i1 - i0 + 1) * (j1 - j0 + 1) > 1e5) {
        for (const list of this.map.values()) for (const it of list) out.add(it);
        return out;
      }
      for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) {
        const list = this.map.get(i + "," + j);
        if (list) for (const it of list) out.add(it);
      }
      return out;
    }
  };
  function planarFaces(segs) {
    const n4 = segs.length;
    const splits = segs.map((s) => [{ t: 0, p: s.a }, { t: 1, p: s.b }]);
    const bb = segs.map((s) => ({
      x0: Math.min(s.a.x, s.b.x) - eps,
      x1: Math.max(s.a.x, s.b.x) + eps,
      y0: Math.min(s.a.y, s.b.y) - eps,
      y1: Math.max(s.a.y, s.b.y) + eps
    }));
    const order = segs.map((_, i) => i).sort((i, j) => bb[i].x0 - bb[j].x0);
    const touch2 = (A, B, list) => {
      for (const q of [B.a, B.b]) {
        const pr = project(q, A.a, A.b);
        if (pr.t > 0 && pr.t < 1 && dist(pr, q) < eps) list.push({ t: pr.t, p: q });
      }
    };
    for (let oi = 0; oi < n4; oi++) {
      const i = order[oi], bi = bb[i], A = segs[i];
      for (let oj = oi + 1; oj < n4; oj++) {
        const j = order[oj], bj = bb[j];
        if (bj.x0 > bi.x1) break;
        if (bj.y0 > bi.y1 || bj.y1 < bi.y0) continue;
        const B = segs[j];
        touch2(A, B, splits[i]);
        touch2(B, A, splits[j]);
        const x = segIntersect(A.a, A.b, B.a, B.b);
        if (x) {
          const p = { x: x.x, y: x.y };
          if (x.t > 0 && x.t < 1) splits[i].push({ t: x.t, p });
          if (x.u > 0 && x.u < 1) splits[j].push({ t: x.u, p });
        }
      }
    }
    const verts = [], grid = /* @__PURE__ */ new Map();
    const vid = (p) => {
      const gx = Math.floor(p.x / eps), gy = Math.floor(p.y / eps);
      for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
        const cell = grid.get(gx + dx + "," + (gy + dy));
        if (cell) {
          for (const id2 of cell) if (dist(verts[id2], p) < eps) return id2;
        }
      }
      const id = verts.length;
      verts.push({ x: p.x, y: p.y });
      const k = gx + "," + gy;
      (grid.get(k) || grid.set(k, []).get(k)).push(id);
      return id;
    };
    const adj = /* @__PURE__ */ new Map();
    const link = (u, v) => {
      if (u === v) return;
      (adj.get(u) || adj.set(u, /* @__PURE__ */ new Set()).get(u)).add(v);
      (adj.get(v) || adj.set(v, /* @__PURE__ */ new Set()).get(v)).add(u);
    };
    for (const list of splits) {
      list.sort((a, b) => a.t - b.t);
      let prev = -1;
      for (const s of list) {
        const id = vid(s.p);
        if (prev >= 0) link(prev, id);
        prev = id;
      }
    }
    const stack = [...adj.keys()].filter((k) => adj.get(k).size < 2);
    while (stack.length) {
      const k = stack.pop(), s = adj.get(k);
      if (!s || s.size >= 2) continue;
      for (const m of s) {
        const ms = adj.get(m);
        ms.delete(k);
        if (ms.size < 2) stack.push(m);
      }
      adj.delete(k);
    }
    const parent = /* @__PURE__ */ new Map();
    const find = (x) => {
      while (parent.get(x) !== x) {
        parent.set(x, parent.get(parent.get(x)));
        x = parent.get(x);
      }
      return x;
    };
    for (const k of adj.keys()) parent.set(k, k);
    for (const [u, s] of adj) for (const v of s) {
      const a = find(u), b = find(v);
      if (a !== b) parent.set(a, b);
    }
    const nbr = /* @__PURE__ */ new Map();
    for (const [k, s] of adj) {
      const o = verts[k];
      const ang = (id) => Math.atan2(verts[id].y - o.y, verts[id].x - o.x);
      nbr.set(k, [...s].sort((a, b) => ang(a) - ang(b)));
    }
    const seen = /* @__PURE__ */ new Set(), faces = [];
    for (const [u, list] of nbr) for (const v of list) {
      if (seen.has(u + ">" + v)) continue;
      const pts = [];
      let a = u, b = v, guard = 0;
      do {
        seen.add(a + ">" + b);
        pts.push(verts[a]);
        const l = nbr.get(b);
        const c = l[(l.indexOf(a) - 1 + l.length) % l.length];
        a = b;
        b = c;
      } while ((a !== u || b !== v) && ++guard < 1e6);
      faces.push({ pts, area: polygonArea(pts), comp: find(u) });
    }
    return faces;
  }
  function regionIndex(segs) {
    const faces = planarFaces(segs);
    for (const f of faces) f.bb = bounds(f.pts);
    const inner = faces.filter((f) => f.area > 0), outer = faces.filter((f) => f.area < 0);
    const all = bounds(inner.flatMap((f) => [{ x: f.bb.x0, y: f.bb.y0 }, { x: f.bb.x1, y: f.bb.y1 }]));
    const grid = new SpatialGrid(Math.max(all.x1 - all.x0, all.y1 - all.y0) / Math.max(8, Math.sqrt(inner.length)));
    for (const f of inner) grid.insert(f, f.bb);
    const regions = /* @__PURE__ */ new Map();
    const locate = (p) => {
      let best = null;
      for (const f of grid.query(p.x, p.y, p.x, p.y)) {
        const b = f.bb;
        if (p.x < b.x0 || p.x > b.x1 || p.y < b.y0 || p.y > b.y1) continue;
        if ((!best || f.area < best.area) && pointInPolygon(p, f.pts)) best = f;
      }
      return best;
    };
    const region = (f) => {
      const known = regions.get(f);
      if (known) return known;
      const cands = outer.filter((h) => h.comp !== f.comp && pointInPolygon(h.pts[0], f.pts));
      const holes = cands.filter((h) => !cands.some((o) => o !== h && pointInPolygon(h.pts[0], o.pts)));
      const r = { outer: f.pts, holes: holes.map((h) => h.pts), area: f.area + holes.reduce((s, h) => s + h.area, 0), bb: f.bb };
      regions.set(f, r);
      return r;
    };
    const within = (b) => [...grid.query(b.x0, b.y0, b.x1, b.y1)].filter((f) => f.bb.x1 >= b.x0 && f.bb.x0 <= b.x1 && f.bb.y1 >= b.y0 && f.bb.y0 <= b.y1);
    return { locate, region, faces: inner, within };
  }
  function findRegion(segs, p) {
    const ix = regionIndex(segs), f = ix.locate(p);
    return f ? ix.region(f) : null;
  }
  function clipSegment(a, b, rings, keep) {
    const ts = [0, 1];
    for (const r of rings) for (let i = 0, n4 = r.length; i < n4; i++) {
      const x = segIntersect(a, b, r[i], r[(i + 1) % n4]);
      if (x) ts.push(x.t);
    }
    ts.sort((p, q) => p - q);
    const at = (t2) => ({ x: a.x + (b.x - a.x) * t2, y: a.y + (b.y - a.y) * t2 });
    const out = [];
    let start = null, end = 0;
    for (let i = 0; i + 1 < ts.length; i++) {
      const t0 = ts[i], t1 = ts[i + 1];
      if (t1 - t0 < 1e-9) continue;
      if (keep(at((t0 + t1) / 2))) {
        if (start === null) start = t0;
        end = t1;
      } else if (start !== null) {
        out.push({ a: at(start), b: at(end) });
        start = null;
      }
    }
    if (start !== null) out.push({ a: at(start), b: at(end) });
    return out;
  }
  function distToRings(p, rings) {
    let d = Infinity;
    for (const r of rings) for (let i = 0, n4 = r.length; i < n4; i++) d = Math.min(d, dist(p, project(p, r[i], r[(i + 1) % n4])));
    return d;
  }
  function chordThrough(p, dir, rings) {
    let tmin = -Infinity, tmax = Infinity;
    for (const r of rings) for (let i = 0, n4 = r.length; i < n4; i++) {
      const a = r[i], b = r[(i + 1) % n4], ex = b.x - a.x, ey = b.y - a.y;
      const den = cross(dir.x, dir.y, ex, ey);
      if (Math.abs(den) < 1e-12) continue;
      const qx = a.x - p.x, qy = a.y - p.y;
      const t2 = cross(qx, qy, ex, ey) / den, u = cross(qx, qy, dir.x, dir.y) / den;
      if (u < -1e-9 || u > 1 + 1e-9) continue;
      if (t2 > 1e-9 && t2 < tmax) tmax = t2;
      if (t2 < -1e-9 && t2 > tmin) tmin = t2;
    }
    if (!Number.isFinite(tmin) || !Number.isFinite(tmax)) return null;
    return { a: { x: p.x + dir.x * tmin, y: p.y + dir.y * tmin }, b: { x: p.x + dir.x * tmax, y: p.y + dir.y * tmax } };
  }

  // src/lib/curves.ts
  var SPLINE_TYPES = ["catmull", "bspline", "bezier3", "bezier2"];
  var lerp = (p, q, t2) => ({ x: p.x + (q.x - p.x) * t2, y: p.y + (q.y - p.y) * t2 });
  var straight = (p, q) => ({ a: p, b: lerp(p, q, 1 / 3), c: lerp(p, q, 2 / 3), d: q });
  var quad = (p, k, q) => ({ a: p, b: lerp(p, k, 2 / 3), c: lerp(q, k, 2 / 3), d: q });
  function toCubics(type, pts, closed) {
    const n4 = pts.length;
    if (n4 < 2) return [];
    if (n4 === 2) return [straight(pts[0], pts[1])];
    if (type === "catmull") {
      const at = (i2) => closed ? pts[(i2 + n4) % n4] : pts[Math.max(0, Math.min(n4 - 1, i2))];
      const out2 = [];
      for (let i2 = 0; i2 < (closed ? n4 : n4 - 1); i2++) {
        const p0 = at(i2 - 1), p1 = at(i2), p2 = at(i2 + 1), p3 = at(i2 + 2);
        out2.push({
          a: p1,
          d: p2,
          b: { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 },
          c: { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 }
        });
      }
      return out2;
    }
    if (type === "bspline") {
      const P3 = closed ? pts : [pts[0], pts[0], ...pts, pts[n4 - 1], pts[n4 - 1]];
      const m = P3.length, at = (i2) => P3[(i2 + m) % m];
      const out2 = [];
      for (let i2 = 0; i2 < (closed ? m : m - 3); i2++) {
        const p0 = at(i2), p1 = at(i2 + 1), p2 = at(i2 + 2), p3 = at(i2 + 3);
        out2.push({
          a: { x: (p0.x + 4 * p1.x + p2.x) / 6, y: (p0.y + 4 * p1.y + p2.y) / 6 },
          b: { x: (2 * p1.x + p2.x) / 3, y: (2 * p1.y + p2.y) / 3 },
          c: { x: (p1.x + 2 * p2.x) / 3, y: (p1.y + 2 * p2.y) / 3 },
          d: { x: (p1.x + 4 * p2.x + p3.x) / 6, y: (p1.y + 4 * p2.y + p3.y) / 6 }
        });
      }
      return out2;
    }
    const step = type === "bezier3" ? 3 : 2, P2 = closed ? [...pts, pts[0]] : pts, out = [];
    let i = 0;
    while (i < P2.length - 1) {
      const k = Math.min(step, P2.length - 1 - i), p = P2[i], q = P2[i + k];
      out.push(k === 3 ? { a: p, b: P2[i + 1], c: P2[i + 2], d: q } : k === 2 ? quad(p, P2[i + 1], q) : straight(p, q));
      i += k;
    }
    return out;
  }
  function onCurve(type, n4, closed, i) {
    if (type === "catmull") return true;
    if (type === "bspline") return !closed && (i === 0 || i === n4 - 1);
    const step = type === "bezier3" ? 3 : 2;
    return i % step === 0 || !closed && i === n4 - 1;
  }
  function cubicsToD(segs, closed, fmt2 = String) {
    if (!segs.length) return "";
    const p = (q) => `${fmt2(q.x)} ${fmt2(q.y)}`;
    return `M${p(segs[0].a)}` + segs.map((s) => ` C${p(s.b)} ${p(s.c)} ${p(s.d)}`).join("") + (closed ? " Z" : "");
  }
  function ellipseFromDrag(a, b, fromCenter, circle) {
    let rx2 = Math.abs(b.x - a.x), ry2 = Math.abs(b.y - a.y);
    if (!fromCenter) {
      rx2 /= 2;
      ry2 /= 2;
    }
    if (circle) rx2 = ry2 = Math.max(rx2, ry2);
    if (fromCenter) return { cx: a.x, cy: a.y, rx: rx2, ry: ry2 };
    return { cx: a.x + Math.sign(b.x - a.x || 1) * rx2, cy: a.y + Math.sign(b.y - a.y || 1) * ry2, rx: rx2, ry: ry2 };
  }

  // src/core/palette.ts
  var PREF_KEYS = [
    "mode",
    "fill",
    "stroke",
    "strokeWidth",
    "palettes",
    "paletteName",
    "snap",
    "link",
    "grid",
    "gridSize",
    "border",
    "gapPct",
    "chain",
    "sides",
    "ngonMode",
    "ellipseMode",
    "curveType",
    "newFill",
    "lastRadius",
    "lastRot",
    "pattern",
    "sym",
    "layers",
    "refOpacity",
    "savePhoto",
    "onlyUnpainted",
    "grout",
    "rulers"
  ];
  function savePrefs() {
    const o = {};
    for (const k of PREF_KEYS) o[k] = state[k];
    lsSet("mz-prefs", JSON.stringify(o));
  }
  function loadPrefs() {
    let o;
    try {
      o = JSON.parse(lsGet("mz-prefs") || "{}");
    } catch {
      return;
    }
    if (Array.isArray(o.palette) && !o.palettes) o.palettes = { [t("My palette")]: o.palette };
    if ("ngonFill" in o && !("newFill" in o)) o.newFill = o.ngonFill;
    for (const k of PREF_KEYS) {
      if (!(k in o)) continue;
      if (k === "layers") for (const n4 in state.layers) Object.assign(state.layers[n4], o.layers[n4] || {});
      else if (["pattern", "sym", "grout"].includes(k)) Object.assign(state[k], o[k]);
      else state[k] = o[k];
    }
    if (!state.palettes[state.paletteName]) state.paletteName = Object.keys(state.palettes)[0] || t("My palette");
  }
  function colorCounts() {
    const m = /* @__PURE__ */ new Map();
    for (const el of allShapes()) {
      const c = fillOf(el);
      if (c) m.set(c, (m.get(c) || 0) + 1);
    }
    return m;
  }
  function replaceColor(from, to) {
    let n4 = 0;
    for (const el of allShapes()) {
      if (fillOf(el) !== from) continue;
      if (!to && isFill(el)) el.remove();
      else paintFill(el, to);
      n4++;
    }
    return n4;
  }
  var applyToSelection = () => state.tool === "select" && state.selection.size > 0;
  var ui = createPaletteUI({
    state,
    save: savePrefs,
    counts: colorCounts,
    usage: (n4) => t("{n} {n|area|areas}", { n: n4 }),
    names: { fill: t("fill"), stroke: t("stroke"), none: t("No color – the bucket erases with it") },
    docColors() {
      const cols = [];
      for (const el of allShapes()) {
        cols.push(fillOf(el));
        if (!isFill(el)) cols.push(norm(getComputedStyle(el).stroke));
      }
      return cols;
    },
    applyFill(c) {
      if (!applyToSelection()) return false;
      for (const el of state.selection) {
        if (isFill(el) && !c) {
          el.remove();
          continue;
        }
        if (el.tagName !== "line") paintFill(el, c);
      }
      commit(true);
      return true;
    },
    applyStroke(c) {
      if (!applyToSelection()) return false;
      for (const el of state.selection) if (!isFill(el)) setPaint(el, "stroke", c);
      commit(true);
      return true;
    },
    recolor(old, c) {
      let n4 = replaceColor(old, c);
      for (const el of allShapes()) {
        if (!isFill(el) && norm(getComputedStyle(el).stroke) === old) {
          setPaint(el, "stroke", c);
          n4++;
        }
      }
      if (!n4) return null;
      commit(true);
      return t("Recolored {n} {n|element|elements}.", { n: n4 });
    },
    // Shift+click is left to add-on modules (the color mix)
    shiftClick: (c, e) => emit("swatch-shift", c, e),
    rendered: () => emit("palette")
  });
  var {
    uniqueName,
    switchPalette,
    addPalette,
    addColors,
    setFill,
    setStroke,
    addFromInput,
    pasteColors,
    render: renderPalette,
    renderSelect: renderPaletteSelect,
    updatePreview: updateColorPreview,
    bind: bindPalette
  } = ui;

  // src/core/grout.ts
  function applyGrout() {
    const g = state.grout;
    shapesG.classList.toggle("grout", g.on);
    shapesG.style.setProperty("--grout-color", g.color);
    shapesG.style.setProperty("--grout-width", g.width + "px");
  }
  var groutCSS = () => `#mosaic-shapes :not(.mz-fill):not(g){stroke:${state.grout.color}!important;stroke-width:${state.grout.width}px!important;stroke-linecap:round}`;
  function bakeGrout() {
    let n4 = 0;
    for (const el of allShapes()) {
      if (isFill(el)) continue;
      setPaint(el, "stroke", state.grout.color);
      el.setAttribute("stroke-width", String(state.grout.width));
      el.style.removeProperty("stroke-width");
      n4++;
    }
    state.grout.on = false;
    $("#grout-on").checked = false;
    applyGrout();
    savePrefs();
    commit(true);
    toast(t("Applied the grout color and width to {n} {n|line|lines}.", { n: n4 }));
  }

  // src/core/photo.ts
  var refImage = () => refG.querySelector("image");
  function inRef(p) {
    const im = refImage();
    if (!im) return false;
    const x = +im.getAttribute("x"), y = +im.getAttribute("y"), w = +im.getAttribute("width"), h = +im.getAttribute("height");
    return p.x >= x && p.x <= x + w && p.y >= y && p.y <= y + h;
  }
  async function loadPhoto(file) {
    let img;
    try {
      img = await loadImg(await readAsDataURL(file));
    } catch {
      toast(t("Could not read that image."));
      return;
    }
    const k = Math.min(1, 2400 / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement("canvas");
    c.width = Math.round(img.naturalWidth * k);
    c.height = Math.round(img.naturalHeight * k);
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    setPhoto(c.toDataURL("image/jpeg", 0.88), c.width, c.height);
    fitPhoto();
    state.layers.ref.visible = true;
    state.layers.ref.locked = true;
    applyLayers();
    savePrefs();
    docChanged();
    toast(t("Photo loaded and locked. Unlock it to move it with the Select tool."));
  }
  async function pastePhoto(file) {
    if (refImage() && !await askYes(t("Replace the photo to trace with the pasted image?"))) return;
    await loadPhoto(file);
    if (refImage()) toast(t("The pasted image is now the photo to trace – “Make a mosaic from the photo” turns it into tiles."));
  }
  function setPhoto(href, nw, nh) {
    refG.innerHTML = "";
    if (!href) {
      renderPhotoUI();
      return;
    }
    const im = mk("image", { href, preserveAspectRatio: "none", "data-nw": nw, "data-nh": nh, x: 0, y: 0, width: nw, height: nh }, refG);
    im.style.opacity = state.refOpacity;
    renderPhotoUI();
  }
  function fitScale() {
    const im = refImage(), d = state.doc;
    return Math.min(d.w / +im.dataset.nw, d.h / +im.dataset.nh);
  }
  function fitPhoto() {
    const im = refImage();
    if (!im) return;
    const d = state.doc, s = fitScale(), w = +im.dataset.nw * s, h = +im.dataset.nh * s;
    im.setAttribute("x", fmt(d.x + (d.w - w) / 2));
    im.setAttribute("y", fmt(d.y + (d.h - h) / 2));
    im.setAttribute("width", fmt(w));
    im.setAttribute("height", fmt(h));
    renderPhotoUI();
  }
  function setPhotoSize(pct) {
    const im = refImage();
    if (!im) return;
    const x = +im.getAttribute("x"), y = +im.getAttribute("y"), w0 = +im.getAttribute("width"), h0 = +im.getAttribute("height");
    const s = fitScale() * pct / 100, w = +im.dataset.nw * s, h = +im.dataset.nh * s;
    im.setAttribute("x", fmt(x + (w0 - w) / 2));
    im.setAttribute("y", fmt(y + (h0 - h) / 2));
    im.setAttribute("width", fmt(w));
    im.setAttribute("height", fmt(h));
    docChanged();
  }
  function renderPhotoUI() {
    const im = refImage();
    $("#ref-controls").hidden = !im;
    $("#btn-ref-load").textContent = im ? t("Replace photo…") : t("Load photo…");
    if (im) $("#ref-size").value = Math.round(+im.getAttribute("width") / (+im.dataset.nw * fitScale()) * 100);
    $("#ref-opacity").value = Math.round(state.refOpacity * 100);
  }

  // src/lib/patterns.ts
  var TYPES = [
    ["square", "Squares"],
    ["brick", "Bricks"],
    ["herringbone", "Herringbone"],
    ["hex", "Hexagons"],
    ["triangle", "Triangles"],
    ["rings", "Rings (around the click)"],
    ["rows", "Rows following the outline"]
  ];
  var rect = (x, y, w, h) => [{ x, y }, { x: x + w, y }, { x: x + w, y: y + h }, { x, y: y + h }];
  var odd = (j) => (j % 2 + 2) % 2 === 1;
  var range = (a0, a1, step) => [Math.floor(a0 / step) - 1, Math.ceil(a1 / step) + 1];
  function cells(type, s, b) {
    const out = [];
    if (type === "square") {
      const [i0, i1] = range(b.x0, b.x1, s), [j0, j1] = range(b.y0, b.y1, s);
      for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) out.push(rect(i * s, j * s, s, s));
    } else if (type === "brick") {
      const L = 2 * s, [j0, j1] = range(b.y0, b.y1, s);
      for (let j = j0; j <= j1; j++) {
        const off = odd(j) ? s : 0, [i0, i1] = range(b.x0 - off, b.x1 - off, L);
        for (let i = i0; i <= i1; i++) out.push(rect(off + i * L, j * s, L, s));
      }
    } else if (type === "hex") {
      const w = Math.sqrt(3) * s, rh = 1.5 * s, [j0, j1] = range(b.y0, b.y1, rh);
      for (let j = j0; j <= j1; j++) {
        const off = odd(j) ? w / 2 : 0, [i0, i1] = range(b.x0 - off, b.x1 - off, w);
        for (let i = i0; i <= i1; i++) out.push(regularPolygon(6, off + i * w, j * rh, s, -Math.PI / 2));
      }
    } else if (type === "triangle") {
      const h = s * Math.sqrt(3) / 2, [j0, j1] = range(b.y0, b.y1, h);
      for (let j = j0; j <= j1; j++) {
        const y = j * h, off = odd(j) ? s / 2 : 0, [i0, i1] = range(b.x0 - off, b.x1 - off, s);
        for (let i = i0; i <= i1; i++) {
          const x = off + i * s;
          out.push([{ x, y: y + h }, { x: x + s / 2, y }, { x: x + s, y: y + h }]);
          out.push([{ x: x + s / 2, y }, { x: x + 1.5 * s, y }, { x: x + s, y: y + h }]);
        }
      }
    } else if (type === "herringbone") {
      const cs = [[b.x0, b.y0], [b.x1, b.y0], [b.x0, b.y1], [b.x1, b.y1]].map(([x, y]) => [x / s, y / s]);
      const ks = cs.map(([u, v]) => (u + v) / 4), ms = cs.map(([u, v]) => (u - v) / 2);
      const k0 = Math.floor(Math.min(...ks)) - 2, k1 = Math.ceil(Math.max(...ks)) + 2;
      const m0 = Math.floor(Math.min(...ms)) - 2, m1 = Math.ceil(Math.max(...ms)) + 2;
      for (let k = k0; k <= k1; k++) for (let m = m0; m <= m1; m++) {
        out.push(rect((2 * k + m) * s, (2 * k - m) * s, s, 2 * s));
        out.push(rect((2 * k + 1 + m) * s, (2 * k + 1 - m) * s, 2 * s, s));
      }
    }
    return out;
  }
  function ringEdges(s, b) {
    const R = Math.max(...[[b.x0, b.y0], [b.x1, b.y0], [b.x0, b.y1], [b.x1, b.y1]].map(([x, y]) => Math.hypot(x, y)));
    const K = Math.ceil(R / s) + 1, angs = [[]];
    for (let k = 1; k <= K; k++) {
      const m = Math.max(6, Math.round(2 * Math.PI * (k + 0.5)));
      angs.push(Array.from({ length: m }, (_, j) => j * 2 * Math.PI / m));
    }
    const at = (r, a) => ({ x: r * Math.cos(a), y: r * Math.sin(a) });
    const edges = [];
    for (let k = 1; k <= K; k++) {
      const all = [...angs[k - 1], ...angs[k]].sort((x, y) => x - y);
      const u = all.filter((a, i) => i === 0 || a - all[i - 1] > 1e-9);
      for (let i = 0; i < u.length; i++) edges.push([at(k * s, u[i]), at(k * s, u[(i + 1) % u.length])]);
      if (k < K) for (const a of angs[k]) edges.push([at(k * s, a), at((k + 1) * s, a)]);
    }
    return edges;
  }
  function mergeCollinear(segs, tol) {
    const groups = /* @__PURE__ */ new Map();
    for (const s of segs) {
      let dx = s.b.x - s.a.x, dy = s.b.y - s.a.y;
      const L = Math.hypot(dx, dy);
      if (L < tol) continue;
      dx /= L;
      dy /= L;
      if (dx < -1e-9 || Math.abs(dx) <= 1e-9 && dy < 0) {
        dx = -dx;
        dy = -dy;
      }
      const off = -dy * s.a.x + dx * s.a.y;
      const key = Math.round(Math.atan2(dy, dx) * 1e6) + "|" + Math.round(off / (tol * 10));
      const t0 = dx * s.a.x + dy * s.a.y, t1 = dx * s.b.x + dy * s.b.y;
      (groups.get(key) || groups.set(key, { dx, dy, off, list: [] }).get(key)).list.push([Math.min(t0, t1), Math.max(t0, t1)]);
    }
    const out = [];
    for (const g of groups.values()) {
      g.list.sort((a, b) => a[0] - b[0]);
      const pt = (t2) => ({ x: g.dx * t2 - g.dy * g.off, y: g.dy * t2 + g.dx * g.off });
      let [c0, c1] = g.list[0];
      for (let i = 1; i <= g.list.length; i++) {
        const iv = g.list[i];
        if (iv && iv[0] <= c1 + tol) {
          c1 = Math.max(c1, iv[1]);
          continue;
        }
        out.push({ a: pt(c0), b: pt(c1) });
        if (iv) [c0, c1] = iv;
      }
    }
    return out;
  }
  function build({ type, size, angle, origin, rings, inside, eps: eps2 }) {
    const s = size, a = (angle || 0) * Math.PI / 180, co = Math.cos(a), si = Math.sin(a);
    const toDoc2 = (p) => ({ x: origin.x + p.x * co - p.y * si, y: origin.y + p.x * si + p.y * co });
    const toFrame = (p) => {
      const dx = p.x - origin.x, dy = p.y - origin.y;
      return { x: dx * co + dy * si, y: -dx * si + dy * co };
    };
    const rb = bounds(rings[0]);
    const fb = bounds([[rb.x0, rb.y0], [rb.x1, rb.y0], [rb.x0, rb.y1], [rb.x1, rb.y1]].map(([x, y]) => toFrame({ x, y })));
    const est = (fb.x1 - fb.x0) * (fb.y1 - fb.y0) / (s * s);
    if (!(s > 0) || est > 4e4) return { error: "tooMany", estimate: Math.round(est) };
    let edges = [];
    if (type === "rings") edges = ringEdges(s, fb);
    else for (const poly of cells(type, s, fb)) for (let i = 0; i < poly.length; i++) edges.push([poly[i], poly[(i + 1) % poly.length]]);
    const q = s * 1e-6, key = (p) => Math.round(p.x / q) + "," + Math.round(p.y / q), seen = /* @__PURE__ */ new Set();
    const pieces2 = [], tol = Math.max(eps2, s * 1e-6);
    const keep = (p) => inside(p) && distToRings(p, rings) > eps2 * 20;
    for (const [p, r] of edges) {
      const k1 = key(p), k2 = key(r), k = k1 < k2 ? k1 + "|" + k2 : k2 + "|" + k1;
      if (k1 === k2 || seen.has(k)) continue;
      seen.add(k);
      const A = toDoc2(p), B = toDoc2(r);
      if (Math.max(A.x, B.x) < rb.x0 || Math.min(A.x, B.x) > rb.x1 || Math.max(A.y, B.y) < rb.y0 || Math.min(A.y, B.y) > rb.y1) continue;
      pieces2.push(...clipSegment(A, B, rings, keep));
    }
    return { segments: mergeCollinear(pieces2, tol) };
  }

  // src/lib/contour.ts
  var INF = 1e20;
  function insideMask(rings, x0, y0, h, nx, ny) {
    const m = new Uint8Array(nx * ny);
    for (let j = 0; j < ny; j++) {
      const y = y0 + (j + 0.5) * h, xs = [];
      for (const r of rings) for (let i = 0, n4 = r.length; i < n4; i++) {
        const a = r[i], b = r[(i + 1) % n4];
        if (a.y > y !== b.y > y) xs.push(a.x + (y - a.y) * (b.x - a.x) / (b.y - a.y));
      }
      xs.sort((p, q) => p - q);
      for (let k = 0; k + 1 < xs.length; k += 2) {
        const i0 = Math.max(0, Math.ceil((xs[k] - x0) / h - 0.5)), i1 = Math.min(nx - 1, Math.floor((xs[k + 1] - x0) / h - 0.5));
        for (let i = i0; i <= i1; i++) m[j * nx + i] = 1;
      }
    }
    return m;
  }
  function edt1d(f, n4, d, v, z) {
    let k = 0;
    v[0] = 0;
    z[0] = -INF;
    z[1] = INF;
    for (let q = 1; q < n4; q++) {
      let s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
      while (s <= z[k]) {
        k--;
        s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
      }
      k++;
      v[k] = q;
      z[k] = s;
      z[k + 1] = INF;
    }
    k = 0;
    for (let q = 0; q < n4; q++) {
      while (z[k + 1] < q) k++;
      d[q] = (q - v[k]) * (q - v[k]) + f[v[k]];
    }
  }
  function distanceField(mask, nx, ny) {
    const g = new Float64Array(nx * ny), n4 = Math.max(nx, ny);
    const f = new Float64Array(n4), d = new Float64Array(n4), v = new Int32Array(n4), z = new Float64Array(n4 + 1);
    for (let i = 0; i < nx * ny; i++) g[i] = mask[i] ? INF : 0;
    for (let x = 0; x < nx; x++) {
      for (let y = 0; y < ny; y++) f[y] = g[y * nx + x];
      edt1d(f, ny, d, v, z);
      for (let y = 0; y < ny; y++) g[y * nx + x] = d[y];
    }
    for (let y = 0; y < ny; y++) {
      for (let x = 0; x < nx; x++) f[x] = g[y * nx + x];
      edt1d(f, nx, d, v, z);
      for (let x = 0; x < nx; x++) g[y * nx + x] = Math.sqrt(d[x]);
    }
    return g;
  }
  var CASES = {
    1: [[3, 2]],
    2: [[2, 1]],
    3: [[3, 1]],
    4: [[0, 1]],
    6: [[0, 2]],
    7: [[3, 0]],
    8: [[3, 0]],
    9: [[0, 2]],
    11: [[0, 1]],
    12: [[3, 1]],
    13: [[2, 1]],
    14: [[3, 2]]
  };
  function isolines(val, nx, ny, level) {
    const pt = /* @__PURE__ */ new Map(), link = /* @__PURE__ */ new Map();
    const at = (i, j) => val[j * nx + i];
    const edgeKey = (i, j, e) => e === 0 ? `h${i},${j}` : e === 2 ? `h${i},${j + 1}` : e === 3 ? `v${i},${j}` : `v${i + 1},${j}`;
    const edgePoint = (i, j, e) => {
      const [ax, ay, bx, by] = e === 0 ? [i, j, i + 1, j] : e === 1 ? [i + 1, j, i + 1, j + 1] : e === 2 ? [i, j + 1, i + 1, j + 1] : [i, j, i, j + 1];
      const va = at(ax, ay), vb = at(bx, by), t2 = (level - va) / (vb - va);
      return { x: ax + (bx - ax) * t2, y: ay + (by - ay) * t2 };
    };
    const add = (k1, k2) => {
      (link.get(k1) || link.set(k1, []).get(k1)).push(k2);
      (link.get(k2) || link.set(k2, []).get(k2)).push(k1);
    };
    for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
      const a = at(i, j), b = at(i + 1, j), c = at(i + 1, j + 1), d = at(i, j + 1);
      const idx = (a >= level ? 8 : 0) | (b >= level ? 4 : 0) | (c >= level ? 2 : 0) | (d >= level ? 1 : 0);
      if (idx === 0 || idx === 15) continue;
      let segs = CASES[idx];
      if (idx === 5 || idx === 10) {
        const high = (a + b + c + d) / 4 >= level;
        segs = idx === 5 ? high ? [[3, 0], [2, 1]] : [[3, 2], [0, 1]] : high ? [[0, 1], [3, 2]] : [[3, 0], [2, 1]];
      }
      for (const [e1, e2] of segs) {
        const k1 = edgeKey(i, j, e1), k2 = edgeKey(i, j, e2);
        if (!pt.has(k1)) pt.set(k1, edgePoint(i, j, e1));
        if (!pt.has(k2)) pt.set(k2, edgePoint(i, j, e2));
        add(k1, k2);
      }
    }
    const used = /* @__PURE__ */ new Set(), loops = [];
    for (const start of link.keys()) {
      if (used.has(start)) continue;
      const loop = [];
      let prev = null, cur = start;
      while (cur && !used.has(cur)) {
        used.add(cur);
        loop.push(pt.get(cur));
        const next = (link.get(cur) || []).find((k) => k !== prev && !used.has(k));
        prev = cur;
        cur = next;
      }
      if (loop.length >= 3) loops.push(loop);
    }
    return loops;
  }
  function simplify(loop, tol) {
    if (loop.length < 8) return loop;
    const rdp = (pts) => {
      if (pts.length < 3) return pts;
      const a = pts[0], b = pts[pts.length - 1];
      let best = -1, bd = tol;
      for (let i = 1; i < pts.length - 1; i++) {
        const d = dist(pts[i], project(pts[i], a, b));
        if (d > bd) {
          bd = d;
          best = i;
        }
      }
      if (best < 0) return [a, b];
      return [...rdp(pts.slice(0, best + 1)).slice(0, -1), ...rdp(pts.slice(best))];
    };
    let far = 0;
    loop.forEach((p, i) => {
      if (dist(p, loop[0]) > dist(loop[far], loop[0])) far = i;
    });
    const one = rdp(loop.slice(0, far + 1)), two = rdp([...loop.slice(far), loop[0]]);
    return [...one.slice(0, -1), ...two.slice(0, -1)];
  }
  var perimeter = (loop) => loop.reduce((s, p, i) => s + dist(p, loop[(i + 1) % loop.length]), 0);
  function along(loop, len) {
    const total = perimeter(loop), n4 = Math.max(3, Math.round(total / len)), step = total / n4, out = [];
    let i = 0, acc = 0, target3 = step / 2;
    while (out.length < n4 && i < loop.length) {
      const a = loop[i], b = loop[(i + 1) % loop.length], s = dist(a, b);
      if (acc + s >= target3) {
        const t2 = (target3 - acc) / s;
        out.push({ x: a.x + (b.x - a.x) * t2, y: a.y + (b.y - a.y) * t2 });
        target3 += step;
      } else {
        acc += s;
        i++;
      }
    }
    return out;
  }
  function build2({ rings, width, length = width, rows = 0 }) {
    const bb = bounds(rings[0]);
    const span = Math.max(bb.x1 - bb.x0, bb.y1 - bb.y0);
    const h = Math.max(width / 6, span / 700);
    const pad = 2, x0 = bb.x0 - pad * h, y0 = bb.y0 - pad * h;
    const nx = Math.ceil((bb.x1 - bb.x0) / h) + 2 * pad, ny = Math.ceil((bb.y1 - bb.y0) / h) + 2 * pad;
    const mask = insideMask(rings, x0, y0, h, nx, ny);
    const field = distanceField(mask, nx, ny);
    for (let i = 0; i < field.length; i++) if (mask[i]) field[i] = (field[i] - 0.5) * h;
    let max = 0;
    for (const v of field) if (v > max) max = v;
    let levels = Math.floor(max / width - 0.25);
    if (rows > 0) levels = Math.min(levels, rows);
    const toDoc2 = (p) => ({ x: x0 + (p.x + 0.5) * h, y: y0 + (p.y + 0.5) * h });
    const levelLoops = [rings];
    for (let k = 1; k <= levels; k++) {
      const loops = isolines(field, nx, ny, k * width).map((l) => simplify(l.map(toDoc2), h * 0.35)).filter((l) => l.length >= 3 && perimeter(l) > width * 1.5);
      if (!loops.length) break;
      levelLoops.push(loops);
    }
    const cuts = [];
    for (let k = 1; k < levelLoops.length; k++) {
      const inner = levelLoops[k], segs = [];
      for (const l of inner) for (let i = 0; i < l.length; i++) segs.push([l[i], l[(i + 1) % l.length]]);
      const grid = new SpatialGrid(width);
      for (const s of segs) grid.insert(s, bounds(s));
      for (const outer of levelLoops[k - 1]) {
        for (const p of along(outer, length)) {
          let best = null, bd = width * 1.6;
          for (const [a, b] of grid.query(p.x - bd, p.y - bd, p.x + bd, p.y + bd)) {
            const q = project(p, a, b), d = dist(p, q);
            if (d < bd) {
              bd = d;
              best = { x: q.x, y: q.y };
            }
          }
          if (best && bd > width * 0.3) cuts.push({ a: p, b: best });
        }
      }
    }
    return { loops: levelLoops.slice(1).flat(), cuts };
  }

  // src/core/snap.ts
  function gridSnap(p) {
    if (!state.grid) return { x: p.x, y: p.y, kind: null };
    const g = state.gridSize, d = state.doc;
    return { x: d.x + Math.round((p.x - d.x) / g) * g, y: d.y + Math.round((p.y - d.y) / g) * g, kind: "grid" };
  }
  function snapPoint(p, opt = {}) {
    if (opt.noSnap) return { x: p.x, y: p.y, kind: null };
    if (!state.snap) return gridSnap(p);
    const r = px(rt.snapPx), ex = opt.exclude;
    let best = null, bd = r;
    const near = [];
    const consider = (q, kind) => {
      const d = dist(p, q);
      if (d < bd) {
        bd = d;
        best = { x: q.x, y: q.y, kind };
      }
    };
    const scan = (g) => {
      const b = g.bbox;
      if (p.x < b.x0 - r || p.x > b.x1 + r || p.y < b.y0 - r || p.y > b.y1 + r) return;
      for (const pl of g.polys) {
        const pts = pl.pts, n4 = pts.length, m = pl.closed ? n4 : n4 - 1;
        for (const q of pts) consider(q, "vertex");
        for (let i = 0; i < m; i++) {
          const a = pts[i], c = pts[(i + 1) % n4], pr = project(p, a, c), d = dist(p, pr);
          if (d < r) near.push({ a, b: c, pr, d });
        }
      }
    };
    if (state.border) scan(pageGeom());
    for (const el of shapesNear(p.x - r, p.y - r, p.x + r, p.y + r)) {
      if (isFill(el) || ex && ex.has(el)) continue;
      scan(geomOf(el));
      const ng = ngonData(el);
      if (ng) consider(applyM(elMatrix(el), { x: ng.cx, y: ng.cy }), "center");
    }
    if (opt.extra) for (const q of opt.extra) consider(q, "vertex");
    if (symOn()) consider(symCenter(), "center");
    if (best) return best;
    let bi = null, bid = r;
    const lim = Math.min(near.length, 80);
    for (let i = 0; i < lim; i++) for (let j = i + 1; j < lim; j++) {
      const x = segIntersect(near[i].a, near[i].b, near[j].a, near[j].b);
      if (x) {
        const d = dist(p, x);
        if (d < bid) {
          bid = d;
          bi = x;
        }
      }
    }
    if (bi) return { x: bi.x, y: bi.y, kind: "intersection" };
    let bm = null, bmd = r * 0.7;
    for (const s of near) {
      const m = { x: (s.a.x + s.b.x) / 2, y: (s.a.y + s.b.y) / 2 }, d = dist(p, m);
      if (d < bmd) {
        bmd = d;
        bm = m;
      }
    }
    if (bm) return { x: bm.x, y: bm.y, kind: "midpoint" };
    if (near.length) {
      near.sort((a, b) => a.d - b.d);
      return { x: near[0].pr.x, y: near[0].pr.y, kind: "edge" };
    }
    return gridSnap(p);
  }
  function constrainAngle(a, b) {
    const ang = Math.atan2(b.y - a.y, b.x - a.x), step = Math.PI / 12;
    const q = Math.round(ang / step) * step;
    const L = Math.hypot(b.x - a.x, b.y - a.y) * Math.cos(ang - q);
    return { x: a.x + L * Math.cos(q), y: a.y + L * Math.sin(q), kind: null };
  }
  function resolvePoint(e, raw, opt = {}) {
    const r = opt.origin && e.shiftKey ? constrainAngle(opt.origin, raw) : snapPoint(raw, { exclude: opt.exclude, extra: opt.extra, noSnap: e.altKey });
    drawSnapMarker(r);
    return r;
  }
  var SNAP_LABEL = { vertex: "point", center: "center", intersection: "crossing", midpoint: "midpoint", edge: "on line", grid: "grid" };
  function drawSnapMarker(r) {
    snapG.innerHTML = "";
    if (!r || !r.kind) return;
    const s = px(6), x = r.x, y = r.y;
    let d;
    switch (r.kind) {
      case "vertex":
        d = `M${x - s} ${y - s}h${2 * s}v${2 * s}h${-2 * s}z`;
        break;
      case "center":
        d = `M${x - s} ${y}a${s} ${s} 0 1 0 ${2 * s} 0a${s} ${s} 0 1 0 ${-2 * s} 0`;
        break;
      case "intersection":
        d = `M${x - s} ${y - s}L${x + s} ${y + s}M${x + s} ${y - s}L${x - s} ${y + s}`;
        break;
      case "midpoint":
        d = `M${x} ${y - s}L${x + s} ${y + s * 0.8}L${x - s} ${y + s * 0.8}z`;
        break;
      case "edge":
        d = `M${x - s} ${y}L${x} ${y - s}L${x + s} ${y}L${x} ${y + s}z`;
        break;
      default:
        d = `M${x - s} ${y}H${x + s}M${x} ${y - s}V${y + s}`;
    }
    mk("path", { d, class: "snap-mark" }, snapG);
    const t2 = mk("text", { x: x + s * 1.6, y: y - s * 1.2, class: "snap-label", "font-size": px(11) }, snapG);
    t2.textContent = SNAP_LABEL[r.kind];
  }
  function drawMeasure(p, text) {
    const t2 = mk("text", { x: p.x + px(14), y: p.y + px(22), class: "measure", "font-size": px(11.5) }, previewG);
    t2.textContent = text;
  }

  // src/core/tools.ts
  function shapeStyle() {
    return { stroke: state.stroke || "none", "stroke-width": state.strokeWidth, "stroke-linecap": "round", "stroke-linejoin": "round" };
  }
  var newFill = () => state.newFill && state.fill ? state.fill : "none";
  function addLines(a, b) {
    for (const [p, q] of symCopies([a, b])) {
      mk("line", { x1: fmt(p.x), y1: fmt(p.y), x2: fmt(q.x), y2: fmt(q.y), ...shapeStyle() }, shapesG);
    }
  }
  function addLineSegments(segs) {
    for (const s of segs) mk("line", { x1: fmt(s.a.x), y1: fmt(s.a.y), x2: fmt(s.b.x), y2: fmt(s.b.y), ...shapeStyle() }, shapesG);
  }
  function addPolygons(pts) {
    for (const q of symCopies(pts)) mk("polygon", { points: ptsStr(q), fill: newFill(), ...shapeStyle() }, shapesG);
  }
  function addNgons(s) {
    const seen = /* @__PURE__ */ new Set();
    symTransforms().forEach((t2, k) => {
      const c = t2({ x: s.cx, y: s.cy }), v0 = t2(s.pts[0]);
      const key = ptKey(c) + "|" + s.pts.map(t2).map(ptKey).sort().join(" ");
      if (seen.has(key)) return;
      seen.add(key);
      const rot = Math.atan2(v0.y - c.y, v0.x - c.x) * 180 / Math.PI;
      const pts = k === 0 ? s.pts : regularPolygon(s.n, c.x, c.y, s.r, rot * Math.PI / 180);
      const el = mk("polygon", { points: ptsStr(pts), fill: newFill(), ...shapeStyle() }, shapesG);
      setNgonData(el, { n: s.n, cx: c.x, cy: c.y, r: s.r, rot });
    });
  }
  function previewStyle() {
    return state.stroke ? { stroke: state.stroke, "stroke-width": state.strokeWidth, "stroke-linecap": "round", "stroke-linejoin": "round", fill: "none", class: "preview" } : { class: "preview-ghost" };
  }
  function previewShape(tag, pts) {
    symCopies(pts).forEach((q, i) => {
      const attrs = tag === "line" ? { x1: q[0].x, y1: q[0].y, x2: q[1].x, y2: q[1].y } : { points: ptsStr(q) };
      mk(tag, { ...attrs, ...i ? { class: "preview-ghost" } : previewStyle() }, previewG);
    });
  }
  function cancelPending() {
    state.lineStart = null;
    state.freePts = null;
    state.action = null;
    previewG.innerHTML = "";
    snapG.innerHTML = "";
    updateStageActions();
  }
  function updateStageActions() {
    $("#stage-actions").hidden = !(state.lineStart || state.freePts);
    $("#sa-back").hidden = !state.freePts;
    $("#sa-finish").textContent = state.freePts && state.tool !== "curve" ? t("Close shape") : t("Done");
  }
  function finishLine(a, b) {
    if (dist(a, b) > px(1)) {
      addLines(a, b);
      commitGeometry();
      state.lineStart = state.chain ? { x: b.x, y: b.y } : null;
    } else state.lineStart = null;
    previewG.innerHTML = "";
    updateStageActions();
  }
  function drawLinePreview(a, b) {
    previewG.innerHTML = "";
    previewShape("line", [a, b]);
    drawMeasure(b, fmtLen(dist(a, b)));
  }
  var lineTool = {
    down(e, raw) {
      if (!canDraw()) return;
      if (state.lineStart) {
        finishLine(state.lineStart, resolvePoint(e, raw, { origin: state.lineStart }));
        return;
      }
      const p = resolvePoint(e, raw);
      state.lineStart = { x: p.x, y: p.y };
      state.action = { type: "line-press", sx: e.clientX, sy: e.clientY, moved: false };
      updateStageActions();
    },
    move(e, raw) {
      const a = state.action;
      if (a && a.type === "line-press" && Math.hypot(e.clientX - a.sx, e.clientY - a.sy) > 4) a.moved = true;
      if (state.lineStart) drawLinePreview(state.lineStart, resolvePoint(e, raw, { origin: state.lineStart }));
      else resolvePoint(e, raw);
    },
    up(e, raw) {
      const a = state.action;
      state.action = null;
      if (a && a.moved && state.lineStart) finishLine(state.lineStart, resolvePoint(e, raw, { origin: state.lineStart }));
    }
  };
  function finishFree(close2 = false) {
    const pts = state.freePts;
    state.freePts = null;
    previewG.innerHTML = "";
    snapG.innerHTML = "";
    if (state.tool === "curve") {
      finishCurve(pts, close2);
      updateStageActions();
      return;
    }
    if (pts && pts.length >= 3) {
      addPolygons(pts);
      commitGeometry();
    } else if (pts && pts.length === 2) {
      addLines(pts[0], pts[1]);
      commitGeometry();
    }
    updateStageActions();
  }
  function freeBack() {
    if (!state.freePts) return;
    state.freePts.pop();
    if (!state.freePts.length) state.freePts = null;
    drawFreePreview(state.freePts ? state.freePts[state.freePts.length - 1] : { x: 0, y: 0 });
    updateStageActions();
  }
  function drawFreePreview(p) {
    if (state.tool === "curve") {
      drawCurvePreview(p);
      return;
    }
    previewG.innerHTML = "";
    const pts = state.freePts;
    if (!pts || !pts.length) return;
    previewShape("polyline", [...pts, p]);
    if (pts.length >= 2) mk("line", { x1: p.x, y1: p.y, x2: pts[0].x, y2: pts[0].y, class: "preview-ghost" }, previewG);
    drawMeasure(p, fmtLen(dist(pts[pts.length - 1], p)));
  }
  var freeTool = {
    down(e, raw) {
      if (!canDraw()) return;
      const pts = state.freePts || [];
      const last = pts[pts.length - 1];
      const p = resolvePoint(e, raw, { origin: last, extra: pts });
      if (pts.length >= 3 && dist(p, pts[0]) < px(rt.snapPx)) {
        finishFree(true);
        return;
      }
      if (last && dist(last, p) < px(2)) return;
      pts.push({ x: p.x, y: p.y });
      state.freePts = pts;
      state.action = { type: "free-press" };
      drawFreePreview(p);
      updateStageActions();
    },
    move(e, raw) {
      const pts = state.freePts;
      const p = resolvePoint(e, raw, { origin: pts && pts[pts.length - 1], extra: pts || [] });
      if (pts) drawFreePreview(p);
    },
    up() {
      state.action = null;
    }
  };
  function specFromCenter(c, r, rotDeg) {
    const n4 = state.sides;
    return { n: n4, cx: c.x, cy: c.y, r, rot: rotDeg, pts: regularPolygon(n4, c.x, c.y, r, rotDeg * Math.PI / 180) };
  }
  function ngonSpec(a) {
    const n4 = state.sides;
    if (state.ngonMode === "center") {
      let rot = Math.atan2(a.b.y - a.a.y, a.b.x - a.a.x) * 180 / Math.PI;
      if (a.shift) rot = Math.round(rot / 15) * 15;
      const s2 = specFromCenter(a.a, dist(a.a, a.b), rot);
      if (!a.shift) s2.pts[0] = { x: a.b.x, y: a.b.y };
      return s2;
    }
    const L = dist(a.a, a.b);
    if (L < 1e-9) return null;
    const R = L / (2 * Math.sin(Math.PI / n4)), ap = L / (2 * Math.tan(Math.PI / n4));
    const ux = (a.b.x - a.a.x) / L, uy = (a.b.y - a.a.y) / L;
    const centerOn = (side2) => ({ x: (a.a.x + a.b.x) / 2 - uy * ap * side2, y: (a.a.y + a.b.y) / 2 + ux * ap * side2 });
    const occupied = (p) => shapesAt(p).some((e) => !isFill(e) && insideEl(e, p));
    let side = -1;
    if (occupied(centerOn(side)) && !occupied(centerOn(-side))) side = -side;
    if (a.flip) side = -side;
    const c = centerOn(side);
    const s = specFromCenter(c, R, Math.atan2(a.a.y - c.y, a.a.x - c.x) * 180 / Math.PI);
    s.pts[0] = { x: a.a.x, y: a.a.y };
    const i = dist(s.pts[1], a.b) < dist(s.pts[n4 - 1], a.b) ? 1 : n4 - 1;
    s.pts[i] = { x: a.b.x, y: a.b.y };
    return s;
  }
  var ngonTool = {
    down(e, raw) {
      if (!canDraw()) return;
      const p = resolvePoint(e, raw);
      state.action = { type: "ngon", a: { x: p.x, y: p.y }, b: { x: p.x, y: p.y }, sx: e.clientX, sy: e.clientY, moved: false };
    },
    move(e, raw) {
      const a = state.action;
      if (!a) {
        resolvePoint(e, raw);
        return;
      }
      if (Math.hypot(e.clientX - a.sx, e.clientY - a.sy) > 3) a.moved = true;
      a.b = resolvePoint(e, raw, { origin: state.ngonMode === "edge" ? a.a : null });
      a.flip = e.ctrlKey || e.metaKey;
      a.shift = e.shiftKey;
      previewG.innerHTML = "";
      const s = a.moved && ngonSpec(a);
      if (s) {
        previewShape("polygon", s.pts);
        drawMeasure(a.b, `side ${fmtLen(2 * s.r * Math.sin(Math.PI / s.n))} · Ø ${fmtLen(2 * s.r)}`);
      }
    },
    up() {
      const a = state.action;
      state.action = null;
      previewG.innerHTML = "";
      if (!a) return;
      const s = a.moved ? ngonSpec(a) : state.ngonMode === "center" ? specFromCenter(a.a, state.lastRadius, state.lastRot) : null;
      if (!s || s.r < px(1)) return;
      state.lastRadius = s.r;
      state.lastRot = s.rot;
      savePrefs();
      addNgons(s);
      commitGeometry();
    }
  };
  function ellipseSpec(a) {
    return ellipseFromDrag(a.a, a.b, state.ellipseMode === "center", a.shift);
  }
  function ellipseCopies(s) {
    return symCopies([{ x: s.cx, y: s.cy }, { x: s.cx + s.rx, y: s.cy }, { x: s.cx, y: s.cy + s.ry }]).map(([c, v]) => {
      let rot = Math.atan2(v.y - c.y, v.x - c.x) * 180 / Math.PI;
      rot = (rot % 180 + 180) % 180;
      if (Math.abs(rot) < 1e-6 || Math.abs(rot - 180) < 1e-6) rot = 0;
      return { cx: c.x, cy: c.y, rx: s.rx, ry: s.ry, rot };
    });
  }
  function ellipseAttrs(e) {
    const at = { cx: fmt(e.cx), cy: fmt(e.cy), rx: fmt(e.rx), ry: fmt(e.ry) };
    if (e.rot) at.transform = `rotate(${fmt(e.rot)} ${fmt(e.cx)} ${fmt(e.cy)})`;
    return at;
  }
  var ellipseTool = {
    down(e, raw) {
      if (!canDraw()) return;
      const p = resolvePoint(e, raw);
      state.action = { type: "ellipse", a: { x: p.x, y: p.y }, b: { x: p.x, y: p.y }, sx: e.clientX, sy: e.clientY, moved: false, shift: false };
    },
    move(e, raw) {
      const a = state.action;
      if (!a) {
        resolvePoint(e, raw);
        return;
      }
      if (Math.hypot(e.clientX - a.sx, e.clientY - a.sy) > 3) a.moved = true;
      a.b = resolvePoint({ shiftKey: false, altKey: e.altKey }, raw);
      a.shift = e.shiftKey;
      previewG.innerHTML = "";
      if (!a.moved) return;
      const s = ellipseSpec(a);
      ellipseCopies(s).forEach((c, i) => mk("ellipse", { ...ellipseAttrs(c), ...i ? { class: "preview-ghost" } : previewStyle() }, previewG));
      drawMeasure(a.b, s.rx === s.ry ? `Ø ${fmtLen(2 * s.rx)}` : `${fmtLen(2 * s.rx)} × ${fmtLen(2 * s.ry)}`);
    },
    up() {
      const a = state.action;
      state.action = null;
      previewG.innerHTML = "";
      if (!a || !a.moved) return;
      const s = ellipseSpec(a);
      if (s.rx < px(1) || s.ry < px(1)) return;
      for (const c of ellipseCopies(s)) mk("ellipse", { ...ellipseAttrs(c), fill: newFill(), ...shapeStyle() }, shapesG);
      commitGeometry();
    }
  };
  var curveD = (pts, closed) => cubicsToD(toCubics(state.curveType, pts, closed), closed, fmt);
  function finishCurve(pts, closed) {
    if (!pts || pts.length < 2 || closed && pts.length < 3) return;
    for (const q of symCopies(pts)) {
      const el = mk("path", { fill: closed ? newFill() : "none", ...shapeStyle() }, shapesG);
      setSpline(el, { type: state.curveType, closed, pts: q });
    }
    commitGeometry();
  }
  function drawCurvePreview(p) {
    previewG.innerHTML = "";
    const pts = state.freePts;
    if (!pts || !pts.length) return;
    const all = [...pts, p];
    symCopies(all).forEach((q, i) => mk("path", { d: curveD(q, false), ...i ? { class: "preview-ghost" } : previewStyle() }, previewG));
    if (state.curveType !== "catmull") mk("polyline", { points: ptsStr(all), class: "preview-ghost" }, previewG);
    const r = px(3);
    all.forEach((q, i) => {
      if (onCurve(state.curveType, all.length, false, i)) mk("rect", { x: q.x - r, y: q.y - r, width: 2 * r, height: 2 * r, class: "handle" }, previewG);
      else mk("circle", { cx: q.x, cy: q.y, r, class: "handle" }, previewG);
    });
  }
  var curveTool = { ...freeTool };
  function knifeCuts(a) {
    const out = [], seen = /* @__PURE__ */ new Set();
    for (const t2 of symTransforms()) {
      const A = t2(a.a), B = t2(a.b), dir = { x: B.x - A.x, y: B.y - A.y };
      if (Math.hypot(dir.x, dir.y) < 1e-9) continue;
      const f = a.ix.locate(A);
      if (!f) continue;
      const r = a.ix.region(f), c = chordThrough(A, dir, [r.outer, ...r.holes]);
      if (!c) continue;
      const key = [ptKey(c.a), ptKey(c.b)].sort().join(" ");
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(c);
    }
    return out;
  }
  var knifeTool = {
    down(e, raw) {
      if (!canDraw()) return;
      state.action = { type: "knife", a: raw, b: raw, ix: regionIndex2(), sx: e.clientX, sy: e.clientY, moved: false, cuts: [] };
      if (!state.action.ix.locate(raw)) {
        state.action = null;
        toast(t("Start the cut inside a closed area."));
        showGaps();
      }
    },
    move(e, raw) {
      const a = state.action;
      if (!a) return;
      if (Math.hypot(e.clientX - a.sx, e.clientY - a.sy) > 4) a.moved = true;
      a.b = e.shiftKey ? constrainAngle(a.a, raw) : raw;
      a.cuts = a.moved ? knifeCuts(a) : [];
      previewG.innerHTML = "";
      a.cuts.forEach((c, i) => mk("line", { x1: c.a.x, y1: c.a.y, x2: c.b.x, y2: c.b.y, ...i ? { class: "preview-ghost" } : previewStyle() }, previewG));
      if (a.cuts[0]) drawMeasure(raw, fmtLen(dist(a.cuts[0].a, a.cuts[0].b)));
    },
    up() {
      const a = state.action;
      state.action = null;
      previewG.innerHTML = "";
      if (!a || !a.moved || !a.cuts.length) return;
      addLineSegments(a.cuts);
      commitGeometry();
    }
  };
  function applyPattern(p) {
    if (!canDraw()) return;
    let region;
    if (p) {
      const ix = regionIndex2(), f = ix.locate(p);
      if (!f) {
        toast(t("Click inside a closed area (or use “Fill whole page”)."));
        showGaps();
        return;
      }
      region = ix.region(f);
    } else {
      const pts = pagePts();
      region = { outer: pts, holes: [], area: state.doc.w * state.doc.h, bb: bounds(pts) };
    }
    const P2 = state.pattern;
    if (P2.type === "rows") {
      applyRows(region, P2);
      return;
    }
    const origin = P2.type === "rings" ? p || { x: state.doc.x + state.doc.w / 2, y: state.doc.y + state.doc.h / 2 } : { x: region.bb.x0, y: region.bb.y0 };
    const res = build({
      type: P2.type,
      size: P2.size,
      angle: P2.angle,
      origin,
      rings: [region.outer, ...region.holes],
      inside: (q) => insideRegion(region, q),
      eps
    });
    if (res.error) {
      toast(t("That would be about {n} tiles – make the tile size bigger.", { n: res.estimate }));
      return;
    }
    const segs = res.segments;
    if (!segs.length) {
      toast(t("The tiles are bigger than this area."));
      return;
    }
    const add = () => {
      addLineSegments(segs);
      commitGeometry();
      toast(t("Added the pattern “{type}” ({n} {n|line|lines}).", { type: t(TYPES.find((p2) => p2[0] === P2.type)[1]), n: segs.length }));
    };
    if (segs.length > 3e3 && !navigator.webdriver) askYes(t("This adds {n} lines, which may make editing slow. Continue?", { n: segs.length })).then((ok) => {
      if (ok) add();
    });
    else add();
  }
  function applyRows(region, P2) {
    const span = Math.max(region.bb.x1 - region.bb.x0, region.bb.y1 - region.bb.y0);
    if (P2.size * 2 > span) {
      toast(t("The rows are wider than this area – use a smaller size."));
      return;
    }
    const { loops, cuts } = build2({ rings: [region.outer, ...region.holes], width: P2.size, length: P2.size, rows: P2.rows || 0 });
    if (!loops.length) {
      toast(t("This area is too narrow for a row of that width."));
      return;
    }
    for (const l of loops) mk("polygon", { points: ptsStr(l), fill: "none", ...shapeStyle() }, shapesG);
    addLineSegments(cuts);
    commitGeometry();
    toast(t("Added {rows} {rows|row line|row lines} and {cuts} {cuts|cut|cuts} following the outline.", { rows: loops.length, cuts: cuts.length }));
  }
  var patternTool = {
    // applied on release, so a pinch / drag that starts here doesn't add a pattern
    down(e, raw) {
      state.action = { type: "pattern", p: raw, sx: e.clientX, sy: e.clientY };
    },
    move() {
    },
    up(e) {
      const a = state.action;
      state.action = null;
      if (a && a.type === "pattern" && Math.hypot(e.clientX - a.sx, e.clientY - a.sy) < 8) applyPattern(a.p);
    }
  };
  var fillChooser = null;
  function setFillChooser(fn) {
    fillChooser = fn;
  }
  function paintPoints(p, ctx2) {
    for (const t2 of symTransforms()) {
      const q = t2(p), f = ctx2.ix.locate(q);
      if (f && ctx2.done.has(f)) continue;
      if (f) ctx2.done.add(f);
      const r = bucketAt(q, fillChooser ? fillChooser(q, f, ctx2) : state.fill, ctx2, f);
      if (r.found) ctx2.found = true;
      if (r.changed) ctx2.changed = true;
    }
  }
  var bucketTool = {
    down(e, raw) {
      if (e.altKey) {
        eyedrop(raw);
        return;
      }
      if (!editable("fills")) {
        toast(t("Painted areas are locked or hidden (see Layers)."));
        return;
      }
      const ctx2 = paintCtx();
      ctx2.done = /* @__PURE__ */ new Set();
      paintPoints(raw, ctx2);
      state.action = { type: "paint", ctx: ctx2 };
      if (!ctx2.found) {
        const n4 = showGaps();
        toast(n4 ? t("No closed area here. The red circles show line ends that don’t touch anything.") : t("No closed area here – make sure the lines meet."));
      }
    },
    move(e, raw) {
      const a = state.action;
      if (a && a.type === "paint") paintPoints(raw, a.ctx);
    },
    up() {
      const a = state.action;
      state.action = null;
      if (a && a.ctx.changed) commit(true);
    }
  };
  var selectTool = {
    down(e, raw) {
      let h = null, hd = px(rt.handlePx);
      for (const c of state.handles) {
        const d = dist(c, raw);
        if (d < hd) {
          hd = d;
          h = c;
        }
      }
      const base = { sx: e.clientX, sy: e.clientY, moved: false };
      if (h) {
        const ng = ngonData(h.el);
        if (ng && !(e.ctrlKey || e.metaKey)) {
          state.action = { ...base, type: "ngon-resize", el: h.el, idx: h.idx, ng, inv: elMatrix(h.el).inverse(), exclude: /* @__PURE__ */ new Set([h.el]) };
          return;
        }
        const targets = state.link && !e.altKey ? verticesAt(h) : [{ el: h.el, idx: h.idx }];
        if (!targets.length) targets.push({ el: h.el, idx: h.idx });
        for (const t2 of targets) t2.inv = elMatrix(t2.el).inverse();
        state.action = { ...base, type: "vertex", targets, exclude: new Set(targets.map((t2) => t2.el)) };
        return;
      }
      const hit = hitTest(raw);
      if (hit) {
        if (e.shiftKey) {
          if (state.selection.has(hit)) state.selection.delete(hit);
          else state.selection.add(hit);
          selectionChanged();
          return;
        }
        if (!state.selection.has(hit)) {
          state.selection.clear();
          state.selection.add(hit);
          selectionChanged();
        }
        const els = [...state.selection];
        let anchor = raw, best = px(14);
        for (const el of els) for (const pl of geomOf(el).polys) for (const q of pl.pts) {
          const d = dist(q, raw);
          if (d < best) {
            best = d;
            anchor = q;
          }
        }
        state.action = { ...base, type: "move", caps: els.map(capture), anchor: { x: anchor.x, y: anchor.y }, start: raw, exclude: new Set(els) };
        return;
      }
      if (!e.shiftKey && state.selection.size) {
        state.selection.clear();
        selectionChanged();
      }
      if (editable("ref") && inRef(raw)) {
        const im = refImage();
        state.action = { ...base, type: "ref-move", start: raw, x0: +im.getAttribute("x"), y0: +im.getAttribute("y") };
        return;
      }
      state.action = { ...base, type: "marquee", start: raw };
    },
    move(e, raw) {
      const a = state.action;
      if (!a) return;
      if (!a.moved && Math.hypot(e.clientX - a.sx, e.clientY - a.sy) < 3) return;
      a.moved = true;
      if (a.type === "vertex") {
        const p = resolvePoint(e, raw, { exclude: a.exclude });
        for (const t2 of a.targets) setVertex(t2.el, t2.idx, applyM(t2.inv, p));
        renderSelection();
      } else if (a.type === "ngon-resize") {
        const p = resolvePoint(e, raw, { exclude: a.exclude });
        const q = applyM(a.inv, p), g = a.ng;
        const r = Math.hypot(q.x - g.cx, q.y - g.cy);
        if (r < 1e-6) return;
        let rot = Math.atan2(q.y - g.cy, q.x - g.cx) * 180 / Math.PI - a.idx * 360 / g.n;
        if (e.shiftKey) rot = Math.round(rot / 15) * 15;
        setNgon(a.el, { ...g, r, rot }, e.shiftKey ? null : q, a.idx);
        renderSelection();
        renderProps();
      } else if (a.type === "move") {
        const target3 = { x: a.anchor.x + raw.x - a.start.x, y: a.anchor.y + raw.y - a.start.y };
        const p = resolvePoint(e, target3, { exclude: a.exclude });
        const d = { x: p.x - a.anchor.x, y: p.y - a.anchor.y };
        for (const c of a.caps) applyMove(c, d);
        renderSelection();
      } else if (a.type === "ref-move") {
        const im = refImage();
        im.setAttribute("x", fmt(a.x0 + raw.x - a.start.x));
        im.setAttribute("y", fmt(a.y0 + raw.y - a.start.y));
      } else if (a.type === "marquee") {
        a.cur = raw;
        previewG.innerHTML = "";
        mk("rect", {
          x: Math.min(a.start.x, raw.x),
          y: Math.min(a.start.y, raw.y),
          width: Math.abs(raw.x - a.start.x),
          height: Math.abs(raw.y - a.start.y),
          class: "marquee"
        }, previewG);
      }
    },
    up() {
      const a = state.action;
      state.action = null;
      previewG.innerHTML = "";
      snapG.innerHTML = "";
      if (!a || !a.moved) return;
      if (a.type === "vertex") {
        for (const t2 of a.targets) t2.el.removeAttribute("data-ngon");
        commitGeometry();
      } else if (a.type === "ngon-resize") commitGeometry();
      else if (a.type === "move") commitFor(a.caps.map((c) => c.el));
      else if (a.type === "ref-move") docChanged();
      else if (a.type === "marquee" && a.cur) {
        const x0 = Math.min(a.start.x, a.cur.x), x1 = Math.max(a.start.x, a.cur.x);
        const y0 = Math.min(a.start.y, a.cur.y), y1 = Math.max(a.start.y, a.cur.y);
        for (const el of allShapes()) {
          if (!selectable(el)) continue;
          const b = geomOf(el).bbox;
          if (b.x0 >= x0 && b.x1 <= x1 && b.y0 >= y0 && b.y1 <= y1) state.selection.add(el);
        }
        selectionChanged();
      }
    }
  };
  var tools = {
    select: selectTool,
    line: lineTool,
    free: freeTool,
    ngon: ngonTool,
    ellipse: ellipseTool,
    curve: curveTool,
    knife: knifeTool,
    pattern: patternTool,
    bucket: bucketTool,
    pan: { down() {
    }, move() {
    }, up() {
    } }
  };
  var HINTS = {
    select: t("Click to select (Shift adds) · drag to move – the nearest corner snaps · drag handles to edit; shared corners move together (Alt detaches) · yellow handles resize a polygon"),
    line: t("Click–click or drag · ends snap to points and onto other lines · Shift: 15° steps · Alt: no snap · Esc: stop"),
    free: t("Click corner by corner · click the first corner, double-click or press Enter to close · Backspace removes the last corner · Esc cancels"),
    ngon: t("Drag from the center (or along an edge in “From edge” mode) · click = last size · Shift: 15° rotation · Ctrl: flip side · keys 3–9: sides"),
    ellipse: t("Drag from corner to corner (or from the center) · Shift: a circle · Alt: no snap"),
    curve: t("Click the curve’s points · click the first point to close it · double-click or Enter ends it open · Backspace removes the last point · Esc cancels"),
    knife: t("Drag across a tile to cut it straight through, edge to edge · Shift: 15° steps"),
    pattern: t("Click inside a closed area to fill it with the chosen pattern"),
    bucket: t("Click or drag across tiles to paint them · click again to recolor · ∅ swatch erases · Alt+click: pick a color"),
    pan: t("Drag to pan · mouse wheel zooms")
  };
  function registerTool(name, handlers2, hint) {
    tools[name] = handlers2;
    HINTS[name] = hint;
  }
  function setTool(tool) {
    if (EXPERT_TOOLS.has(tool) && state.mode !== "expert") tool = "select";
    cancelPending();
    state.tool = tool;
    stage.dataset.tool = tool;
    for (const b of $$("#tools button")) b.classList.toggle("active", b.dataset.tool === tool);
    for (const s of $$(".tool-opts")) s.hidden = s.dataset.for !== tool;
    $("#st-hint").textContent = HINTS[tool];
  }

  // src/core/files.ts
  function buildSVGString(opts3 = {}) {
    const d = state.doc, u = unit();
    const root = document.createElementNS(SVGNS, "svg");
    root.setAttribute("viewBox", `${fmt(d.x)} ${fmt(d.y)} ${fmt(d.w)} ${fmt(d.h)}`);
    root.setAttribute("width", fmt(d.w) + (u === "px" ? "" : u));
    root.setAttribute("height", fmt(d.h) + (u === "px" ? "" : u));
    mk("metadata", { id: "mosaic-palette" }, root).textContent = JSON.stringify({ palette: state.palette, paletteName: state.paletteName, unit: u });
    for (const c of defsG.childNodes) root.appendChild(c.cloneNode(true));
    if (opts3.grout) mk("style", {}, root).textContent = groutCSS();
    if (d.bg) mk("rect", { id: "mosaic-bg", x: d.x, y: d.y, width: d.w, height: d.h, fill: d.bg }, root);
    const im = refImage();
    if (im && (opts3.photo ?? state.savePhoto)) {
      const g = mk("g", { id: "mosaic-reference", visibility: "hidden" }, root);
      const c = im.cloneNode(true);
      c.removeAttribute("style");
      c.setAttribute("data-opacity", String(state.refOpacity));
      g.appendChild(c);
    }
    const f = mk("g", { id: "mosaic-fills" }, root);
    for (const c of fillsG.childNodes) f.appendChild(c.cloneNode(true));
    const s = mk("g", { id: "mosaic-shapes" }, root);
    for (const c of shapesG.childNodes) s.appendChild(c.cloneNode(true));
    let out = '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(root).replace(/></g, ">\n<");
    for (const fn of handlers("serialize")) out = fn(out, opts3) || out;
    return out;
  }
  function sanitize(root) {
    root.querySelectorAll("script,foreignObject").forEach((n4) => n4.remove());
    for (const n4 of [root, ...root.querySelectorAll("*")]) {
      for (const a of [...n4.attributes]) {
        if (/^on/i.test(a.name) || /href$/i.test(a.name) && /^\s*javascript:/i.test(a.value)) n4.removeAttribute(a.name);
      }
    }
  }
  function convertLinearPaths() {
    for (const p of [...shapesG.querySelectorAll("path")]) {
      if (p.closest("defs,clipPath,mask,pattern,symbol,marker") || isFill(p)) continue;
      const polys = linearPath(p.getAttribute("d") || "");
      if (!polys || polys.length !== 1 || polys[0].pts.length < 2) continue;
      const n4 = document.createElementNS(SVGNS, polys[0].closed ? "polygon" : "polyline");
      for (const a of p.attributes) if (a.name !== "d") n4.setAttributeNS(a.namespaceURI, a.name, a.value);
      n4.setAttribute("points", ptsStr(polys[0].pts));
      p.replaceWith(n4);
    }
  }
  function loadSVGText(text, opts3 = {}) {
    const xml = new DOMParser().parseFromString(text, "image/svg+xml");
    const root = xml.documentElement;
    if (!root || root.localName !== "svg" || xml.getElementsByTagName("parsererror").length) {
      if (!opts3.quiet) toast(t("Could not read this file as SVG."));
      return false;
    }
    sanitize(root);
    emit("deserialize", root, opts3);
    const vb = (root.getAttribute("viewBox") || "").trim().split(/[\s,]+/).map(Number);
    const hasVB = vb.length === 4 && vb.every(Number.isFinite) && vb[2] > 0 && vb[3] > 0;
    const box4 = hasVB ? { x: vb[0], y: vb[1], w: vb[2], h: vb[3] } : { x: 0, y: 0, w: parseFloat(root.getAttribute("width")) || 1e3, h: parseFloat(root.getAttribute("height")) || 1e3 };
    const ours = !!root.querySelector('[id="mosaic-shapes"]');
    const wm = /^\s*([\d.]+)\s*(mm|cm|in)\s*$/.exec(root.getAttribute("width") || "");
    let docUnit = wm && hasVB && Math.abs(+wm[1] - box4.w) <= box4.w * 1e-6 + 1e-9 ? wm[2] : "px";
    cancelPending();
    defsG.innerHTML = "";
    fillsG.innerHTML = "";
    shapesG.innerHTML = "";
    let wrap = shapesG, bg = null, photo = null, meta = null;
    if (!ours) {
      const keep = [...root.attributes].filter((a) => !a.name.includes(":") && !/^(xmlns|viewBox|width|height|version|x|y|id|preserveAspectRatio|baseProfile|enable-background)$/i.test(a.name));
      if (keep.length) {
        wrap = mk("g", {}, shapesG);
        for (const a of keep) wrap.setAttribute(a.name, a.value);
      }
    }
    for (const child of [...root.children]) {
      const id = child.getAttribute("id"), tag = child.localName;
      if (id === "mosaic-palette") {
        try {
          meta = JSON.parse(child.textContent);
        } catch {
        }
        continue;
      }
      if (id === "mosaic-bg") {
        bg = child.getAttribute("fill");
        continue;
      }
      if (id === "mosaic-reference") {
        photo = child.querySelector("image");
        continue;
      }
      if (id === "mosaic-pages") continue;
      if (["metadata", "title", "desc", "namedview"].includes(tag)) continue;
      if (tag === "defs" || tag === "style") {
        defsG.appendChild(document.importNode(child, true));
        continue;
      }
      if (id === "mosaic-fills" || id === "mosaic-shapes") {
        const dest = id === "mosaic-fills" ? fillsG : shapesG;
        for (const c of [...child.childNodes]) dest.appendChild(document.importNode(c, true));
        continue;
      }
      wrap.appendChild(document.importNode(child, true));
    }
    convertLinearPaths();
    if (Array.isArray(meta)) meta = { palette: meta };
    if (meta && meta.unit) docUnit = meta.unit;
    if (meta && Array.isArray(meta.palette) && !opts3.restore) importPalette(meta.palette.map(norm).filter(Boolean), meta.paletteName || opts3.name);
    state.doc = { ...box4, bg: ours ? bg : null, unit: docUnit };
    if (photo) {
      const href = photo.getAttribute("href") || photo.getAttributeNS("http://www.w3.org/1999/xlink", "href");
      setPhoto(href, +photo.getAttribute("data-nw") || 1, +photo.getAttribute("data-nh") || 1);
      const im = refImage();
      for (const k of ["x", "y", "width", "height"]) im.setAttribute(k, photo.getAttribute(k));
      const op = parseFloat(photo.getAttribute("data-opacity"));
      if (op >= 0) {
        state.refOpacity = op;
        im.style.opacity = String(op);
      }
      renderPhotoUI();
    } else setPhoto(null);
    state.selection.clear();
    touch();
    applyDoc();
    applyGrout();
    applyLayers();
    resetHistory();
    rt.dirty = false;
    fitView();
    afterChange();
    return true;
  }
  function importPalette(colors, name) {
    if (!colors.length) return;
    const same = (a) => a.length === colors.length && colors.every((c) => a.includes(c));
    const existing = Object.keys(state.palettes).find((k) => same(state.palettes[k]));
    if (existing) {
      switchPalette(existing);
      return;
    }
    const n4 = uniqueName((name || t("From file")).replace(/\.svg$/i, ""));
    state.palettes[n4] = colors;
    switchPalette(n4);
    toast(t("The file’s colors were added as the palette “{name}”.", { name: n4 }));
  }
  async function confirmDiscard() {
    return !rt.dirty || askYes(t("Discard unsaved changes to the current drawing?\n(A copy is kept in History.)"));
  }
  var SVG_TYPES = [{ description: "SVG image", accept: { "image/svg+xml": [".svg"] } }];
  async function openFile() {
    if (!await confirmDiscard()) return;
    const w = window;
    if (w.showOpenFilePicker) {
      try {
        const [h] = await w.showOpenFilePicker({ types: SVG_TYPES });
        const f = await h.getFile();
        if (await openText(await f.text(), f.name)) rt.fileHandle = h;
        return;
      } catch (err) {
        if (err.name === "AbortError") return;
      }
    }
    $("#file-input").click();
  }
  async function openText(text, name) {
    if (hasContent()) await saveVersion(t("Before opening {name}", { name }));
    if (!loadSVGText(text, { name })) return false;
    rt.fileHandle = null;
    rt.fileName = name;
    updateTitle();
    scheduleAutosave();
    toast(t("Opened {name}", { name }));
    return true;
  }
  async function loadFile(f) {
    if (f) await openText(await f.text(), f.name);
  }
  async function save(as) {
    const text = buildSVGString(), w = window;
    if (w.showSaveFilePicker) {
      try {
        if (!rt.fileHandle || as) rt.fileHandle = await w.showSaveFilePicker({ suggestedName: rt.fileName, types: SVG_TYPES });
        const wr = await rt.fileHandle.createWritable();
        await wr.write(text);
        await wr.close();
        rt.fileName = rt.fileHandle.name;
        rt.dirty = false;
        updateTitle();
        scheduleAutosave();
        toast(t("Saved {name}", { name: rt.fileName }));
        return;
      } catch (err) {
        if (err.name === "AbortError") return;
        rt.fileHandle = null;
      }
    }
    if (as) {
      const n4 = await ask(t("File name:"), rt.fileName);
      if (!n4) return;
      rt.fileName = /\.svg$/i.test(n4) ? n4 : n4 + ".svg";
    }
    download(new Blob([text], { type: "image/svg+xml" }), rt.fileName);
    rt.dirty = false;
    updateTitle();
  }
  async function exportPNG() {
    const d = state.doc;
    const def = unit() === "px" ? Math.max(d.w, 2e3) : 3e3;
    const ans = await ask(t("PNG width in pixels:"), String(Math.round(def)));
    if (!ans) return;
    const W = Math.round(+ans);
    if (!(W > 0 && W <= 16e3)) {
      toast(t("Invalid width."));
      return;
    }
    const H = Math.max(1, Math.round(W * d.h / d.w));
    const url2 = URL.createObjectURL(new Blob([buildSVGString({ photo: false, grout: state.grout.on, pageOnly: true })], { type: "image/svg+xml" }));
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = W;
      c.height = H;
      c.getContext("2d").drawImage(img, 0, 0, W, H);
      URL.revokeObjectURL(url2);
      c.toBlob((b) => b ? download(b, rt.fileName.replace(/\.svg$/i, "") + ".png") : toast(t("PNG export failed.")), "image/png");
    };
    img.onerror = () => {
      URL.revokeObjectURL(url2);
      toast(t("PNG export failed."));
    };
    img.src = url2;
  }
  function resetDoc(keepSize) {
    cancelPending();
    defsG.innerHTML = "";
    fillsG.innerHTML = "";
    shapesG.innerHTML = "";
    setPhoto(null);
    const d = state.doc;
    state.doc = keepSize ? { x: 0, y: 0, w: d.w, h: d.h, bg: "#ffffff", unit: unit() } : { x: 0, y: 0, w: 300, h: 300, bg: "#ffffff", unit: "mm" };
    state.selection.clear();
    rt.fileHandle = null;
    rt.fileName = "mosaic.svg";
    touch();
    applyDoc();
    applyGrout();
    resetHistory();
    rt.dirty = false;
    emit("reset");
    fitView();
    afterChange();
  }
  async function newDoc() {
    if (!await confirmDiscard()) return;
    if (hasContent()) await saveVersion(t("Before starting a new drawing"));
    resetDoc(true);
  }
  function clearDrawing() {
    cancelPending();
    fillsG.innerHTML = "";
    shapesG.innerHTML = "";
    state.selection.clear();
    touch();
  }
  function setMode(m) {
    state.mode = m === "expert" ? "expert" : "simple";
    document.body.dataset.mode = state.mode;
    for (const b of $$("#mode-switch button")) b.classList.toggle("active", b.dataset.mode === state.mode);
    if (EXPERT_TOOLS.has(state.tool) && state.mode !== "expert") setTool("select");
    savePrefs();
    applyLayers();
    applyDoc();
    updateView();
    emit("mode");
  }

  // src/core/history.ts
  var history2 = [];
  var hIndex = -1;
  var made = 0;
  var snapshot = () => ({ defs: defsG.innerHTML, fills: fillsG.innerHTML, shapes: shapesG.innerHTML, doc: { ...state.doc } });
  function resetHistory() {
    history2 = [snapshot()];
    hIndex = 0;
    updateUndoUI();
  }
  var getHistory = () => ({ history: history2, hIndex });
  function setHistory(h) {
    history2 = h.history;
    hIndex = h.hIndex;
    updateUndoUI();
  }
  function commit(paintOnly) {
    if (!paintOnly) touch();
    made++;
    history2.splice(hIndex + 1);
    history2.push(snapshot());
    const size = (s) => s.fills.length + s.shapes.length + s.defs.length;
    let total = history2.reduce((t2, s) => t2 + size(s), 0) * 2;
    while (history2.length > 2 && (history2.length > 200 || total > 6e7)) total -= size(history2.shift()) * 2;
    hIndex = history2.length - 1;
    rt.dirty = true;
    afterChange();
  }
  function restore(s) {
    defsG.innerHTML = s.defs;
    fillsG.innerHTML = s.fills;
    shapesG.innerHTML = s.shapes;
    state.doc = { ...s.doc };
    state.selection.clear();
    touch();
    applyDoc();
    applyGrout();
    rt.dirty = true;
    afterChange();
  }
  var restoreCurrent = () => restore(history2[hIndex]);
  var steps = () => made;
  function dropLastStep() {
    if (hIndex <= 0 || hIndex !== history2.length - 1) return;
    history2.pop();
    hIndex--;
    restore(history2[hIndex]);
  }
  function undo() {
    if (hIndex > 0) {
      cancelPending();
      restore(history2[--hIndex]);
    }
  }
  function redo() {
    if (hIndex < history2.length - 1) {
      cancelPending();
      restore(history2[++hIndex]);
    }
  }
  function updateUndoUI() {
    $("#btn-undo").disabled = hIndex <= 0;
    $("#btn-redo").disabled = hIndex >= history2.length - 1;
  }
  function afterChange() {
    renderSelection();
    renderProps();
    renderPalette();
    updateUndoUI();
    updateTitle();
    scheduleAutosave();
    emit("change");
  }
  function docChanged() {
    rt.dirty = true;
    updateTitle();
    scheduleAutosave();
  }
  function updateTitle() {
    document.title = `${rt.dirty ? "• " : ""}${rt.fileName} – Mosaic Paint`;
  }
  var hasContent = () => fillsG.children.length > 0 || shapesG.children.length > 0;
  var autosaveTimer;
  var lastVersionAt = Date.now();
  var restored = false;
  var autosavePaused = false;
  function startAutosave() {
    restored = true;
  }
  function pauseAutosave(on2) {
    autosavePaused = on2;
    if (on2) clearTimeout(autosaveTimer);
  }
  function scheduleAutosave() {
    if (!restored || autosavePaused) return;
    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(autosaveNow, 700);
  }
  async function autosaveNow() {
    const svgText = buildSVGString();
    try {
      await Store.set("current", { svg: svgText, fileName: rt.fileName, time: Date.now() });
    } catch {
      if (!lsSet("mz-autosave", svgText)) toast(t("Autosave failed – remember to save your file."));
    }
    if (hasContent() && Date.now() - lastVersionAt > VERSION_EVERY_MS) saveVersion(t("Autosave"));
  }
  async function saveVersion(note) {
    lastVersionAt = Date.now();
    try {
      const fills = [...fillsG.children, ...shapesG.querySelectorAll("[fill]")].map((el) => el.getAttribute("fill")).filter((f) => f && f !== "none");
      const d = state.doc, colors = new Set(fills).size;
      await Store.addVersion({ time: Date.now(), name: rt.fileName, note, svg: buildSVGString(), tiles: fillsG.children.length, size: { w: d.w, h: d.h, unit: unit() }, colors });
      await Store.trimVersions(MAX_VERSIONS);
      return true;
    } catch {
      return false;
    }
  }
  async function restoreVersion(rec) {
    if (hasContent()) await saveVersion(t("Before restoring an older version"));
    if (loadSVGText(rec.svg, { restore: true })) {
      rt.fileName = rec.name || "mosaic.svg";
      rt.fileHandle = null;
      rt.dirty = true;
      updateTitle();
      scheduleAutosave();
      toast(t("Restored the version from {time}", { time: new Date(rec.time).toLocaleString(lang) }));
    }
  }

  // src/core/areas.ts
  var gapTol = () => Math.max(state.doc.w, state.doc.h) * (state.mode === "expert" ? state.gapPct : 0.4) / 100;
  var lastOpenEnds = [];
  function boundarySegments() {
    const segs = [], ends = [];
    const add = (g) => {
      for (const pl of g.polys) {
        const p = pl.pts, n4 = p.length, m = pl.closed ? n4 : n4 - 1, base = segs.length;
        for (let i = 0; i < m; i++) segs.push({ a: p[i], b: p[(i + 1) % n4] });
        if (!pl.closed && m > 0) {
          ends.push({ p: p[0], seg: base });
          ends.push({ p: p[n4 - 1], seg: base + m - 1 });
        }
      }
    };
    if (state.border) add(pageGeom());
    for (const el of allShapes()) if (!isFill(el)) add(geomOf(el));
    const bridges = bridgeGaps(segs, ends, gapTol());
    return segs.concat(bridges).filter((s) => dist(s.a, s.b) > eps);
  }
  function bridgeGaps(segs, ends, tol) {
    lastOpenEnds = [];
    if (!ends.length) return [];
    const cell = Math.max(tol, eps * 10), grid = /* @__PURE__ */ new Map(), big = [];
    const key = (i, j) => i + "," + j;
    segs.forEach((s, idx) => {
      const i0 = Math.floor(Math.min(s.a.x, s.b.x) / cell), i1 = Math.floor(Math.max(s.a.x, s.b.x) / cell);
      const j0 = Math.floor(Math.min(s.a.y, s.b.y) / cell), j1 = Math.floor(Math.max(s.a.y, s.b.y) / cell);
      if ((i1 - i0 + 1) * (j1 - j0 + 1) > 400) {
        big.push(idx);
        return;
      }
      for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) (grid.get(key(i, j)) || grid.set(key(i, j), []).get(key(i, j))).push(idx);
    });
    const out = [];
    for (const e of ends) {
      const ci = Math.floor(e.p.x / cell), cj = Math.floor(e.p.y / cell), cand = new Set(big);
      for (let i = ci - 1; i <= ci + 1; i++) for (let j = cj - 1; j <= cj + 1; j++) for (const idx of grid.get(key(i, j)) || []) cand.add(idx);
      let touching = false, best = null, bd = tol;
      for (const idx of cand) {
        if (idx === e.seg) continue;
        const s = segs[idx], pr = project(e.p, s.a, s.b), d = dist(e.p, pr);
        if (d < eps) {
          touching = true;
          break;
        }
        if (d < bd) {
          bd = d;
          best = pr;
        }
      }
      if (touching) continue;
      if (best) out.push({ a: e.p, b: { x: best.x, y: best.y } });
      else lastOpenEnds.push(e.p);
    }
    return out;
  }
  function showGaps() {
    flashG.innerHTML = "";
    const v = state.view, r = svg.getBoundingClientRect();
    const vis = lastOpenEnds.filter((p) => p.x >= v.x && p.y >= v.y && p.x <= v.x + r.width / v.s && p.y <= v.y + r.height / v.s);
    for (const p of vis.slice(0, 300)) mk("circle", { cx: p.x, cy: p.y, r: px(9), class: "gap-mark" }, flashG);
    setTimeout(() => {
      flashG.innerHTML = "";
    }, 3500);
    return vis.length;
  }
  var areaIndex = null;
  var areaKey = "";
  var lineObserver = new MutationObserver(() => {
    areaIndex = null;
  });
  lineObserver.observe(shapesG, { childList: true, subtree: true, attributes: true });
  function regionIndex2() {
    const d = state.doc, key = [state.border, gapTol(), d.x, d.y, d.w, d.h].join();
    if (lineObserver.takeRecords().length || key !== areaKey) areaIndex = null;
    if (!areaIndex) {
      areaIndex = regionIndex(boundarySegments());
      areaKey = key;
    }
    return areaIndex;
  }
  function ringsToD(rings) {
    return rings.map((r) => "M" + r.map((p) => fmt(p.x) + " " + fmt(p.y)).join("L") + "Z").join("");
  }
  var nearArea = (a, b) => Math.abs(a - b) <= Math.max(Math.abs(a), Math.abs(b)) * 3e-3 + eps;
  function createFill(region, color, cover) {
    const d = state.doc;
    const path = mk("path", {
      class: "mz-fill",
      d: ringsToD([region.outer, ...region.holes]),
      "fill-rule": "evenodd",
      "stroke-width": fmt(Math.max(d.w, d.h) * 5e-4),
      "stroke-linejoin": "round",
      "data-area": fmt(region.area)
    });
    if (cover) {
      cover.after(path);
      const m = elMatrix(cover.parentNode);
      if (!m.isIdentity) path.setAttribute("transform", m.inverse().toString());
    } else {
      const kids = fillsG.children;
      let lo = 0, hi = kids.length;
      while (lo < hi) {
        const mid = lo + hi >> 1;
        if (+kids[mid].dataset.area >= region.area) lo = mid + 1;
        else hi = mid;
      }
      fillsG.insertBefore(path, kids[lo] || null);
    }
    paintFill(path, color);
    return path;
  }
  var paintCtx = () => ({ ix: regionIndex2() });
  function bucketAt(p, color, ctx2, face) {
    const f = face || ctx2.ix.locate(p), region = f ? ctx2.ix.region(f) : null;
    const near = shapesAt(p), shapesTop = near.filter((e) => !isFill(e));
    const fillsAt = near.filter((e) => isFill(e) && insideEl(e, p));
    const paint = (el) => {
      if (!color && isFill(el)) {
        el.remove();
        return true;
      }
      if (fillOf(el) === color) return false;
      paintFill(el, color);
      return true;
    };
    if (region) {
      const same = fillsAt.find((fl) => nearArea(+fl.dataset.area, region.area));
      if (same) return { found: true, changed: paint(same) };
      const shape2 = shapesTop.find((e) => geomOf(e).polys.some((pl) => pl.closed && pointInPolygon(p, pl.pts) && nearArea(Math.abs(polygonArea(pl.pts)), region.area)));
      if (shape2) return { found: true, changed: paint(shape2) };
      const stale = fillsAt.filter((fl) => +fl.dataset.area < region.area);
      stale.forEach((fl) => fl.remove());
      if (!color) return { found: true, changed: stale.length > 0 };
      createFill(region, color, shapesTop.find((e) => hasFill(e) && insideEl(e, p)));
      return { found: true, changed: true };
    }
    const shape = shapesTop.find((e) => insideEl(e, p));
    if (shape) return { found: true, changed: paint(shape) };
    if (fillsAt[0]) return { found: true, changed: paint(fillsAt[0]) };
    return { found: false, changed: false };
  }
  function gridSample(bb, inside, max) {
    for (const n4 of [8, 20, 48]) {
      const pts = [];
      for (let i = 0; i < n4; i++) for (let j = 0; j < n4; j++) {
        const p = { x: bb.x0 + (bb.x1 - bb.x0) * (i + 0.5) / n4, y: bb.y0 + (bb.y1 - bb.y0) * (j + 0.5) / n4 };
        if (inside(p)) pts.push(p);
      }
      if (pts.length >= 6 || n4 === 48) {
        const step = Math.max(1, Math.floor(pts.length / max));
        return pts.filter((_, k) => k % step === 0);
      }
    }
    return [];
  }
  var insideRegion = (r, p) => pointInPolygon(p, r.outer) && !r.holes.some((h) => pointInPolygon(p, h));
  function setFillRegion(el, region) {
    const m = elMatrix(el);
    const map = m.isIdentity ? (r) => r : /* @__PURE__ */ ((inv) => (r) => r.map((p) => applyM(inv, p)))(m.inverse());
    el.setAttribute("d", ringsToD([region.outer, ...region.holes].map(map)));
    el.setAttribute("data-area", fmt(region.area));
    invalidate(el);
  }
  function reflowFills() {
    const fills = [...docG.querySelectorAll("path.mz-fill")];
    if (!fills.length) return;
    touch();
    const ix = regionIndex2(), tol = eps * 10;
    const owner = /* @__PURE__ */ new Map(), placed = /* @__PURE__ */ new Set(), items = [];
    const sameBox = (a, b) => Math.abs(a.x0 - b.x0) < tol && Math.abs(a.y0 - b.y0) < tol && Math.abs(a.x1 - b.x1) < tol && Math.abs(a.y1 - b.y1) < tol;
    for (const el of fills) {
      const g = geomOf(el), rings = g.polys.filter((p) => p.closed).map((p) => p.pts);
      const inside = (p) => rings.reduce((n4, r) => n4 + (pointInPolygon(p, r) ? 1 : 0), 0) % 2 === 1;
      const area2 = Math.abs(+el.dataset.area) || rings.reduce((s, r) => s + Math.abs(polygonArea(r)), 0);
      const probe = gridSample(g.bbox, inside, 1)[0], pf = probe && ix.locate(probe);
      if (pf && !owner.has(pf) && nearArea(ix.region(pf).area, area2) && sameBox(pf.bb, g.bbox)) {
        owner.set(pf, null);
        continue;
      }
      const samples = gridSample(g.bbox, inside, 64), votes = /* @__PURE__ */ new Map();
      for (const p of samples) {
        const f = ix.locate(p);
        if (f) votes.set(f, (votes.get(f) || 0) + 1);
      }
      items.push({ el, inside, votes, area: area2, bbox: g.bbox, n: samples.length || 1 });
    }
    if (!items.length) return;
    const pairs = [];
    for (const it of items) for (const [f, v] of it.votes) {
      const ov = it.area * v / it.n, fa = ix.region(f).area;
      pairs.push({ it, f, score: ov / (it.area + fa - ov) });
    }
    pairs.sort((a, b) => b.score - a.score || b.it.area - a.it.area);
    for (const { it, f } of pairs) {
      if (placed.has(it) || owner.has(f)) continue;
      owner.set(f, it);
      placed.add(it);
      setFillRegion(it.el, ix.region(f));
    }
    for (const it of items) if (!placed.has(it)) it.el.remove();
    for (const it of items) {
      if (!it.el.isConnected) continue;
      for (const f of ix.within(it.bbox)) {
        if (owner.has(f)) continue;
        const reg = ix.region(f);
        const pts = gridSample(reg.bb, (p) => insideRegion(reg, p), 40);
        if (!pts.length || pts.filter(it.inside).length < pts.length * 0.85) continue;
        owner.set(f, it);
        const c = it.el.cloneNode(false);
        it.el.after(c);
        setFillRegion(c, reg);
      }
    }
    [...fillsG.children].sort((a, b) => (+b.dataset.area || 0) - (+a.dataset.area || 0)).forEach((c) => fillsG.appendChild(c));
  }
  function commitGeometry() {
    reflowFills();
    commit();
  }
  function commitFor(els) {
    if ([...els].every(isFill)) commit();
    else commitGeometry();
  }
  function eyedrop(p) {
    for (const el of shapesAt(p)) {
      if (!insideEl(el, p)) continue;
      const c = fillOf(el);
      if (c) {
        setFill(c, false);
        toast(state.palette.includes(c) ? t("Picked {c}.", { c }) : t("Picked {c} (not in the palette – add it with “From drawing”).", { c }));
        return;
      }
    }
    toast(t("No painted area under the cursor."));
  }
  function neighbourColors(reg) {
    const out = /* @__PURE__ */ new Set(), d = eps * 50;
    for (const r of [reg.outer, ...reg.holes]) for (let i = 0, n4 = r.length; i < n4; i++) {
      const a = r[i], b = r[(i + 1) % n4], len = dist(a, b);
      if (len < d * 4) continue;
      const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, nx = -(b.y - a.y) / len, ny = (b.x - a.x) / len;
      for (const s of [1, -1]) {
        const p = { x: m.x + nx * d * s, y: m.y + ny * d * s };
        if (insideRegion(reg, p)) continue;
        const c = paintedColorAt(p);
        if (c) out.add(c);
      }
    }
    return out;
  }

  // src/core/selection.ts
  function hitTest(p) {
    const tol = px(rt.hitPx), list = shapesAt(p, tol + Math.max(state.doc.w, state.doc.h) / 100).filter(selectable);
    for (const el of list) {
      if (isFill(el)) continue;
      const g = geomOf(el), b = g.bbox, t2 = Math.max(tol, strokeW(el) / 2);
      if (p.x < b.x0 - t2 || p.x > b.x1 + t2 || p.y < b.y0 - t2 || p.y > b.y1 + t2) continue;
      for (const pl of g.polys) {
        const n4 = pl.pts.length, m = pl.closed ? n4 : n4 - 1;
        for (let i = 0; i < m; i++) if (dist(p, project(p, pl.pts[i], pl.pts[(i + 1) % n4])) <= t2) return el;
      }
    }
    for (const el of list) if ((isFill(el) || hasFill(el)) && insideEl(el, p)) return el;
    return null;
  }
  function renderSelection() {
    selG.innerHTML = "";
    state.handles = [];
    const many = state.selection.size > 300;
    for (const el of [...state.selection]) {
      if (!el.isConnected) {
        state.selection.delete(el);
        continue;
      }
      for (const pl of geomOf(el).polys) mk(pl.closed ? "polygon" : "polyline", { points: ptsStr(pl.pts), class: "sel-outline" }, selG);
      if (many || !hasVerts(el) || isFill(el)) continue;
      const vs = docVerts(el), sp = splineData(el);
      if (sp && sp.type !== "catmull") mk(sp.closed ? "polygon" : "polyline", { points: ptsStr(vs), class: "sel-ctrl" }, selG);
      vs.forEach((q, i) => state.handles.push({ el, idx: i, x: q.x, y: q.y, ctrl: !!sp && !onCurve(sp.type, vs.length, sp.closed, i) }));
    }
    const s = px(rt.handlePx - 2);
    for (const h of state.handles) {
      if (h.ctrl) mk("circle", { cx: h.x, cy: h.y, r: s / 2, class: "handle" }, selG);
      else mk("rect", { x: h.x - s / 2, y: h.y - s / 2, width: s, height: s, class: ngonData(h.el) ? "handle ngon" : "handle" }, selG);
    }
  }
  var CURVE_NAMES = {
    catmull: () => t("curve through points"),
    bspline: () => t("B-spline"),
    bezier3: () => t("cubic Bézier"),
    bezier2: () => t("quadratic Bézier")
  };
  function describe(el) {
    if (isFill(el)) return "painted area";
    const ng = ngonData(el);
    if (ng) return `${ng.n}-gon`;
    const sp = splineData(el);
    if (sp) return CURVE_NAMES[sp.type]();
    return el.tagName === "ellipse" ? t("ellipse") : el.tagName;
  }
  function renderProps() {
    const sel2 = [...state.selection].filter((e) => e.isConnected);
    $("#sel-section").hidden = !sel2.length;
    if (!sel2.length) return;
    $("#sel-info").textContent = sel2.length === 1 ? `(${describe(sel2[0])})` : `(${sel2.length} items)`;
    const ng = sel2.length === 1 ? ngonData(sel2[0]) : null;
    $("#ngon-props").hidden = !ng;
    if (ng) {
      $("#sel-sides").value = ng.n;
      $("#sel-radius").value = fmt(ng.r);
      $("#sel-rot").value = fmt(ng.rot);
    }
    const sw = strokeW(sel2[0]);
    $("#sel-sw").value = Number.isFinite(sw) ? fmt(sw) : "";
  }
  function selectionChanged() {
    renderSelection();
    renderProps();
  }
  function capture(el) {
    const c = { el, inv: elMatrix(el).inverse(), ngon: ngonData(el) };
    const tag = el.tagName;
    if (tag === "line") c.line = ["x1", "y1", "x2", "y2"].map((k) => parseFloat(el.getAttribute(k)) || 0);
    else if (tag === "polyline" || tag === "polygon") c.pts = parsePoints(el.getAttribute("points"));
    else if (isFill(el) && !el.hasAttribute("transform") && linearPath(el.getAttribute("d") || "")) c.rings = linearPath(el.getAttribute("d"));
    else {
      c.transform = el.getAttribute("transform") || "";
      c.pinv = elMatrix(el.parentNode).inverse();
    }
    return c;
  }
  function applyMove(c, d) {
    const el = c.el;
    if (c.line) {
      const l = linM(c.inv, d);
      el.setAttribute("x1", fmt(c.line[0] + l.x));
      el.setAttribute("y1", fmt(c.line[1] + l.y));
      el.setAttribute("x2", fmt(c.line[2] + l.x));
      el.setAttribute("y2", fmt(c.line[3] + l.y));
    } else if (c.pts) {
      const l = linM(c.inv, d);
      el.setAttribute("points", ptsStr(c.pts.map((p) => ({ x: p.x + l.x, y: p.y + l.y }))));
      if (c.ngon) setNgonData(el, { ...c.ngon, cx: c.ngon.cx + l.x, cy: c.ngon.cy + l.y });
    } else if (c.rings) {
      el.setAttribute("d", ringsToD(c.rings.map((r) => r.pts.map((p) => ({ x: p.x + d.x, y: p.y + d.y })))));
    } else {
      const l = linM(c.pinv, d);
      let rest = c.transform, tx = l.x, ty = l.y;
      const m = rest.match(/^\s*translate\(\s*([-+\d.e]+)(?:[\s,]+([-+\d.e]+))?\s*\)\s*/i);
      if (m) {
        tx += +m[1];
        ty += +(m[2] || 0);
        rest = rest.slice(m[0].length);
      }
      el.setAttribute("transform", `translate(${fmt(tx)} ${fmt(ty)}) ${rest}`.trim());
    }
    invalidate(el);
  }
  function moveElements(els, d) {
    for (const c of els.map(capture)) applyMove(c, d);
  }
  function deleteSel() {
    if (!state.selection.size) return;
    const els = [...state.selection];
    for (const el of els) el.remove();
    state.selection.clear();
    commitFor(els);
  }
  function duplicate() {
    if (!state.selection.size) return;
    const clones = [...state.selection].map((el) => {
      const c = el.cloneNode(true);
      el.parentNode.appendChild(c);
      return c;
    });
    const off = state.grid ? state.gridSize : Math.max(state.doc.w, state.doc.h) / 100;
    moveElements(clones, { x: off, y: off });
    state.selection = new Set(clones);
    commitFor(clones);
  }
  function toFront() {
    for (const el of state.selection) el.parentNode.appendChild(el);
    if (state.selection.size) commit();
  }
  function toBack() {
    for (const el of [...state.selection].reverse()) el.parentNode.insertBefore(el, el.parentNode.firstChild);
    if (state.selection.size) commit();
  }
  function invertSelection() {
    if (state.tool !== "select") setTool("select");
    state.selection = new Set(allShapes().filter((el) => selectable(el) && !state.selection.has(el)));
    selectionChanged();
  }
  function selectAll() {
    if (state.tool !== "select") setTool("select");
    state.selection = new Set(allShapes().filter(selectable));
    selectionChanged();
  }

  // src/core/view.ts
  function toDoc(cx, cy) {
    const r = svg.getBoundingClientRect(), v = state.view;
    return { x: v.x + (cx - r.left) / v.s, y: v.y + (cy - r.top) / v.s };
  }
  function updateView() {
    const r = svg.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const v = state.view;
    const vb = `${v.x} ${v.y} ${r.width / v.s} ${r.height / v.s}`;
    svg.setAttribute("viewBox", vb);
    overlaySvg.setAttribute("viewBox", vb);
    $("#zoom-label").textContent = Math.round(v.s * 100) + "%";
    gridPath.setAttribute("stroke-width", px(1));
    $("#mz-checker").setAttribute("patternTransform", `scale(${1 / v.s})`);
    renderSelection();
    drawGuides();
    emit("view");
  }
  function fitView() {
    const r = svg.getBoundingClientRect(), d = state.doc;
    if (!r.width || !r.height) return;
    const s = Math.min(r.width / d.w, r.height / d.h) * 0.9;
    state.view = { s, x: d.x + d.w / 2 - r.width / s / 2, y: d.y + d.h / 2 - r.height / s / 2 };
    updateView();
  }
  function zoomAt(cx, cy, factor) {
    const p = toDoc(cx, cy), r = svg.getBoundingClientRect(), v = state.view;
    v.s = clamp(v.s * factor, 5e-3, 2e3);
    v.x = p.x - (cx - r.left) / v.s;
    v.y = p.y - (cy - r.top) / v.s;
    updateView();
  }
  function zoomCenter(f) {
    const r = svg.getBoundingClientRect();
    zoomAt(r.left + r.width / 2, r.top + r.height / 2, f);
  }
  function applyDoc() {
    const d = state.doc;
    setEps(Math.max(d.w, d.h) * 1e-5);
    for (const r of [pageRect, gridRect]) {
      r.setAttribute("x", d.x);
      r.setAttribute("y", d.y);
      r.setAttribute("width", d.w);
      r.setAttribute("height", d.h);
    }
    pageRect.setAttribute("fill", d.bg || "url(#mz-checker)");
    const g = state.gridSize;
    gridPattern.setAttribute("x", d.x);
    gridPattern.setAttribute("y", d.y);
    gridPattern.setAttribute("width", g);
    gridPattern.setAttribute("height", g);
    gridPath.setAttribute("d", `M ${g} 0 L 0 0 0 ${g}`);
    gridRect.style.display = state.grid ? "" : "none";
    $("#doc-w").value = fmt(d.w);
    $("#doc-h").value = fmt(d.h);
    $("#doc-unit").value = unit();
    for (const el of $$(".unit-label")) el.textContent = unit();
    const bg = norm(d.bg);
    $("#doc-bg").value = bg && bg.startsWith("#") ? bg : "#ffffff";
    $("#doc-bg-none").checked = !d.bg;
    $("#opt-gap").value = fmt(gapTol());
    drawGuides();
    emit("view");
  }
  function layer(name) {
    if (state.mode === "simple" && name !== "ref") return { visible: true, locked: false };
    return state.layers[name];
  }
  var layerOf = (el) => isFill(el) ? "fills" : "shapes";
  var editable = (name) => layer(name).visible && !layer(name).locked;
  var selectable = (el) => editable(layerOf(el));
  function applyLayers() {
    refG.style.visibility = layer("ref").visible ? "" : "hidden";
    fillsG.style.visibility = layer("fills").visible ? "" : "hidden";
    shapesG.style.visibility = layer("shapes").visible ? "" : "hidden";
    for (const b of $$("[data-layer]")) {
      const L = state.layers[b.dataset.layer], k = b.dataset.prop;
      b.classList.toggle("off", k === "visible" ? !L.visible : !L.locked);
      b.textContent = k === "visible" ? L.visible ? "👁" : "–" : L.locked ? "🔒" : "🔓";
      b.title = k === "visible" ? L.visible ? "Visible – click to hide" : "Hidden – click to show" : L.locked ? "Locked – click to unlock" : "Unlocked – click to lock";
    }
    $("#ref-show").checked = state.layers.ref.visible;
    $("#ref-lock").checked = state.layers.ref.locked;
    for (const el of [...state.selection]) if (!selectable(el)) state.selection.delete(el);
    renderSelection();
    renderProps();
  }
  function canDraw() {
    if (editable("shapes")) return true;
    toast(t("The lines layer is locked or hidden (see Layers)."));
    return false;
  }
  var symOn = () => state.mode === "expert" && state.sym.type !== "none";
  function symCenter() {
    const s = state.sym, d = state.doc;
    return { x: s.cx ?? d.x + d.w / 2, y: s.cy ?? d.y + d.h / 2 };
  }
  function symTransforms() {
    const id = (p) => p;
    if (!symOn()) return [id];
    const s = state.sym, c = symCenter();
    const rot = (a) => (p) => {
      const dx = p.x - c.x, dy = p.y - c.y, co = Math.cos(a), si = Math.sin(a);
      return { x: c.x + dx * co - dy * si, y: c.y + dx * si + dy * co };
    };
    const mx = (p) => ({ x: 2 * c.x - p.x, y: p.y }), my = (p) => ({ x: p.x, y: 2 * c.y - p.y });
    if (s.type === "mirror-v") return [id, mx];
    if (s.type === "mirror-h") return [id, my];
    if (s.type === "mirror-hv") return [id, mx, my, (p) => mx(my(p))];
    const n4 = clamp(Math.round(s.n) || 2, 2, 64), out = [];
    for (let k = 0; k < n4; k++) out.push(rot(k * 2 * Math.PI / n4));
    if (s.mirror) for (let k = 0; k < n4; k++) {
      const r = rot(k * 2 * Math.PI / n4);
      out.push((p) => r(mx(p)));
    }
    return out;
  }
  var ptKey = (p) => Math.round(p.x / (eps * 10)) + "," + Math.round(p.y / (eps * 10));
  function symCopies(pts) {
    const seen = /* @__PURE__ */ new Set(), out = [];
    for (const t2 of symTransforms()) {
      const q = pts.map(t2), key = q.map(ptKey).sort().join(" ");
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(q);
    }
    return out;
  }
  function drawGuides() {
    guidesG.innerHTML = "";
    if (!symOn()) return;
    const s = state.sym, c = symCenter(), d = state.doc, R = Math.hypot(d.w, d.h);
    const ray = (a) => mk("line", { x1: c.x, y1: c.y, x2: c.x + R * Math.cos(a), y2: c.y + R * Math.sin(a), class: "sym-guide" }, guidesG);
    if (s.type === "mirror-v" || s.type === "mirror-hv") {
      ray(-Math.PI / 2);
      ray(Math.PI / 2);
    }
    if (s.type === "mirror-h" || s.type === "mirror-hv") {
      ray(0);
      ray(Math.PI);
    }
    if (s.type === "radial") {
      const n4 = clamp(Math.round(s.n) || 2, 2, 64);
      for (let k = 0; k < n4; k++) ray(-Math.PI / 2 + k * 2 * Math.PI / n4);
    }
    mk("circle", { cx: c.x, cy: c.y, r: px(5), class: "sym-center" }, guidesG);
  }

  // src/core/doc.ts
  function setPaint(el, prop, color) {
    const v = color || "none";
    el.setAttribute(prop, v);
    if (el.hasAttribute("style")) el.style.removeProperty(prop);
    if (!defsG.getElementsByTagName("style").length) return;
    const cs = getComputedStyle(el)[prop];
    const ok = v === "none" ? cs === "none" : norm(cs) === norm(v);
    if (!ok) el.style.setProperty(prop, v);
  }
  function paintFill(el, c) {
    setPaint(el, "fill", c);
    if (isFill(el)) setPaint(el, "stroke", c);
  }
  function plainFill(el) {
    if (el.hasAttribute("style") || !el.hasAttribute("fill") || defsG.getElementsByTagName("style").length) return null;
    const cls = el.getAttribute("class");
    return cls === null || cls === "mz-fill" ? el.getAttribute("fill") : null;
  }
  function hasFill(el) {
    if (el.tagName === "line") return false;
    const f = plainFill(el);
    return (f !== null ? f : getComputedStyle(el).fill) !== "none";
  }
  function fillOf(el) {
    if (el.tagName === "line") return null;
    const f = plainFill(el);
    return norm(f !== null ? f : getComputedStyle(el).fill);
  }
  var docObserver = new MutationObserver((recs) => applyDocChanges(recs));
  docObserver.observe(docG, { childList: true, subtree: true });
  var shapeList = null;
  var shapeSet = /* @__PURE__ */ new WeakSet();
  var shapeGrid = null;
  var isShape = (el) => el.matches(SHAPE_SEL) && !el.closest("defs,clipPath,mask,pattern,symbol,marker");
  var checkDocChanges = () => applyDocChanges(docObserver.takeRecords());
  function applyDocChanges(recs) {
    if (!recs.length || !shapeList) return;
    for (const r of recs) {
      for (const n4 of r.removedNodes) if (n4.nodeType === 1) {
        shapeList = null;
        shapeGrid = null;
        return;
      }
    }
    for (const r of recs) for (const n4 of r.addedNodes) {
      if (n4.nodeType !== 1 || !n4.isConnected) continue;
      for (const el of [n4, ...n4.querySelectorAll(SHAPE_SEL)]) {
        if (!isShape(el) || shapeSet.has(el)) continue;
        shapeSet.add(el);
        shapeList.push(el);
        if (shapeGrid) shapeGrid.insert(el, geomOf(el).bbox);
      }
    }
  }
  function allShapes() {
    checkDocChanges();
    if (!shapeList) {
      shapeList = [...docG.querySelectorAll(SHAPE_SEL)].filter(isShape);
      shapeSet = new WeakSet(shapeList);
    }
    return shapeList;
  }
  function shapesNear(x0, y0, x1, y1) {
    const list = allShapes();
    if (!shapeGrid) {
      const d = state.doc;
      shapeGrid = new SpatialGrid(Math.max(d.w, d.h) / 100);
      for (const el of list) shapeGrid.insert(el, geomOf(el).bbox);
    }
    const out = [];
    for (const el of shapeGrid.query(x0, y0, x1, y1)) {
      if (!el.isConnected) continue;
      const b = geomOf(el).bbox;
      if (b.x1 >= x0 && b.x0 <= x1 && b.y1 >= y0 && b.y0 <= y1) out.push(el);
    }
    return out.sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1);
  }
  var shapesAt = (p, r = 0) => shapesNear(p.x - r, p.y - r, p.x + r, p.y + r);
  var IDENT = new DOMMatrix();
  function elMatrix(node) {
    if (node === docG || node === shapesG || node === fillsG) return IDENT;
    if (!node.hasAttribute("transform") && (node.parentNode === shapesG || node.parentNode === fillsG)) return IDENT;
    const a = docG.getCTM(), b = node.getCTM && node.getCTM();
    if (!a || !b) return IDENT;
    return DOMMatrix.fromMatrix(a).inverse().multiply(DOMMatrix.fromMatrix(b));
  }
  var geomCache = /* @__PURE__ */ new WeakMap();
  var touch = () => {
    geomCache = /* @__PURE__ */ new WeakMap();
    shapeGrid = null;
  };
  var invalidate = (el) => {
    geomCache.delete(el);
  };
  function geomOf(el) {
    let g = geomCache.get(el);
    if (!g) {
      g = computeGeom(el);
      geomCache.set(el, g);
    }
    return g;
  }
  function computeGeom(el) {
    const tag = el.tagName;
    const num4 = (n4) => parseFloat(el.getAttribute(n4)) || 0;
    let polys = [];
    if (tag === "line") polys = [{ pts: [{ x: num4("x1"), y: num4("y1") }, { x: num4("x2"), y: num4("y2") }], closed: false }];
    else if (tag === "polyline" || tag === "polygon") polys = [{ pts: parsePoints(el.getAttribute("points")), closed: tag === "polygon" }];
    else if (tag === "rect") {
      const x = num4("x"), y = num4("y"), w = num4("width"), h = num4("height");
      if (w > 0 && h > 0) polys = [{ pts: [{ x, y }, { x: x + w, y }, { x: x + w, y: y + h }, { x, y: y + h }], closed: true }];
    } else if (tag === "path") polys = linearPath(el.getAttribute("d") || "") || samplePath(el, false);
    else polys = samplePath(el, true);
    const m = elMatrix(el);
    if (!m.isIdentity) for (const p of polys) p.pts = p.pts.map((q) => applyM(m, q));
    polys = polys.filter((p) => p.pts.length > 1);
    return { polys, bbox: bounds(polys.flatMap((p) => p.pts)) };
  }
  function linearPath(d) {
    const toks = d.match(/[a-z]|[-+]?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?/gi);
    if (!toks) return [];
    const polys = [];
    let i = 0, cmd = null, x = 0, y = 0, sx = 0, sy = 0, cur = null;
    const isCmd = (t2) => /^[a-z]$/i.test(t2);
    const num4 = () => {
      const v = parseFloat(toks[i++]);
      if (!Number.isFinite(v)) throw 0;
      return v;
    };
    const push = () => {
      if (!cur) {
        cur = { pts: [{ x: sx, y: sy }], closed: false };
        polys.push(cur);
      }
      cur.pts.push({ x, y });
    };
    try {
      while (i < toks.length) {
        if (isCmd(toks[i])) cmd = toks[i++];
        else if (!cmd) return null;
        const rel = cmd === cmd.toLowerCase(), C = cmd.toUpperCase();
        if (C === "Z") {
          if (cur) cur.closed = true;
          x = sx;
          y = sy;
          cur = null;
          continue;
        }
        if (i >= toks.length || isCmd(toks[i])) return null;
        if (C === "M") {
          let nx = num4(), ny = num4();
          if (rel) {
            nx += x;
            ny += y;
          }
          x = sx = nx;
          y = sy = ny;
          cur = { pts: [{ x, y }], closed: false };
          polys.push(cur);
          cmd = rel ? "l" : "L";
        } else if (C === "L") {
          let nx = num4(), ny = num4();
          if (rel) {
            nx += x;
            ny += y;
          }
          x = nx;
          y = ny;
          push();
        } else if (C === "H") {
          const v = num4();
          x = rel ? x + v : v;
          push();
        } else if (C === "V") {
          const v = num4();
          y = rel ? y + v : v;
          push();
        } else return null;
      }
    } catch {
      return null;
    }
    for (const p of polys) {
      const a = p.pts[0], b = p.pts[p.pts.length - 1];
      if (p.pts.length > 2 && Math.hypot(a.x - b.x, a.y - b.y) < 1e-9) {
        p.pts.pop();
        p.closed = true;
      }
    }
    return polys;
  }
  function samplePath(el, forceClosed) {
    let len;
    try {
      len = el.getTotalLength();
    } catch {
      return [];
    }
    if (!(len > 0)) return [];
    const N = clamp(Math.ceil(len / (Math.max(state.doc.w, state.doc.h) / 300)), 16, 360), step = len / N;
    const polys = [];
    let cur = [];
    for (let i = 0; i <= N; i++) {
      const q = el.getPointAtLength(i * step), p = { x: q.x, y: q.y };
      if (cur.length && dist(cur[cur.length - 1], p) > step * 1.5 + 1e-6) {
        polys.push(cur);
        cur = [];
      }
      cur.push(p);
    }
    polys.push(cur);
    return polys.filter((p) => p.length > 1).map((pts) => {
      const gap = dist(pts[0], pts[pts.length - 1]);
      const closed = forceClosed || gap < step * 1.5;
      if (closed && gap < 1e-3) pts.pop();
      return { pts, closed };
    });
  }
  function pagePts() {
    const d = state.doc;
    return [{ x: d.x, y: d.y }, { x: d.x + d.w, y: d.y }, { x: d.x + d.w, y: d.y + d.h }, { x: d.x, y: d.y + d.h }];
  }
  function pageGeom() {
    const d = state.doc;
    return { polys: [{ pts: pagePts(), closed: true }], bbox: { x0: d.x, y0: d.y, x1: d.x + d.w, y1: d.y + d.h } };
  }
  function insideEl(el, p) {
    const g = geomOf(el), b = g.bbox;
    if (p.x < b.x0 || p.x > b.x1 || p.y < b.y0 || p.y > b.y1) return false;
    let n4 = 0;
    for (const pl of g.polys) if (pl.closed && pointInPolygon(p, pl.pts)) n4++;
    return n4 % 2 === 1;
  }
  function strokeW(el) {
    return parseFloat(getComputedStyle(el).strokeWidth) || 0;
  }
  function isPaintedAt(p) {
    return shapesAt(p).some((el) => (isFill(el) || hasFill(el)) && insideEl(el, p));
  }
  function paintedColorAt(p) {
    for (const el of shapesAt(p)) if ((isFill(el) || hasFill(el)) && insideEl(el, p)) return fillOf(el);
    return null;
  }
  function hasVerts(el) {
    return EDITABLE.has(el.tagName) || el.tagName === "ellipse" || !!splineData(el);
  }
  function localVerts(el) {
    const n4 = (k) => parseFloat(el.getAttribute(k)) || 0;
    if (el.tagName === "line") return [{ x: n4("x1"), y: n4("y1") }, { x: n4("x2"), y: n4("y2") }];
    if (el.tagName === "ellipse") {
      const cx = n4("cx"), cy = n4("cy"), rx2 = n4("rx"), ry2 = n4("ry");
      return [{ x: cx + rx2, y: cy }, { x: cx, y: cy + ry2 }, { x: cx - rx2, y: cy }, { x: cx, y: cy - ry2 }];
    }
    if (el.tagName === "path") return splineData(el)?.pts || [];
    return parsePoints(el.getAttribute("points"));
  }
  function docVerts(el) {
    const m = elMatrix(el);
    return localVerts(el).map((p) => applyM(m, p));
  }
  function setVertex(el, idx, q) {
    const sp = splineData(el);
    if (sp) {
      sp.pts[idx] = q;
      setSpline(el, sp);
      return;
    }
    if (el.tagName === "ellipse") {
      const c = parseFloat(el.getAttribute(idx % 2 ? "cy" : "cx")) || 0;
      el.setAttribute(idx % 2 ? "ry" : "rx", fmt(Math.max(Math.abs((idx % 2 ? q.y : q.x) - c), 1e-3)));
    } else if (el.tagName === "line") {
      el.setAttribute(idx ? "x2" : "x1", fmt(q.x));
      el.setAttribute(idx ? "y2" : "y1", fmt(q.y));
    } else {
      const pts = localVerts(el);
      pts[idx] = q;
      el.setAttribute("points", ptsStr(pts));
    }
    invalidate(el);
  }
  function verticesAt(p) {
    const out = [], tol = eps * 5;
    for (const el of shapesAt(p, tol)) {
      if (!hasVerts(el) || isFill(el) || !selectable(el)) continue;
      const b = geomOf(el).bbox;
      if (p.x < b.x0 - tol || p.x > b.x1 + tol || p.y < b.y0 - tol || p.y > b.y1 + tol) continue;
      docVerts(el).forEach((q, i) => {
        if (dist(q, p) < tol) out.push({ el, idx: i });
      });
    }
    return out;
  }
  function ngonData(el) {
    const s = el && el.getAttribute && el.getAttribute("data-ngon");
    if (!s || el.tagName !== "polygon") return null;
    const [n4, cx, cy, r, rot] = s.split(/[\s,]+/).map(Number);
    if (!(n4 >= 3) || ![cx, cy, r, rot].every(Number.isFinite)) return null;
    return { n: n4, cx, cy, r, rot };
  }
  function setNgonData(el, g) {
    el.setAttribute("data-ngon", [g.n, fmt(g.cx), fmt(g.cy), fmt(g.r), fmt(g.rot)].join(" "));
  }
  function setNgon(el, g, exact, idx) {
    const pts = regularPolygon(g.n, g.cx, g.cy, g.r, g.rot * Math.PI / 180);
    if (exact) pts[idx] = exact;
    el.setAttribute("points", ptsStr(pts));
    setNgonData(el, g);
    invalidate(el);
  }
  function splineData(el) {
    const s = el && el.tagName === "path" && el.getAttribute("data-spline");
    if (!s) return null;
    const [type, shut, ...rest] = s.trim().split(/\s+/);
    if (!SPLINE_TYPES.includes(type)) return null;
    const pts = parsePoints(rest.join(" "));
    return pts.length >= 2 ? { type, closed: shut === "closed", pts } : null;
  }
  function setSpline(el, sp) {
    el.setAttribute("data-spline", `${sp.type} ${sp.closed ? "closed" : "open"} ${ptsStr(sp.pts)}`);
    el.setAttribute("d", cubicsToD(toCubics(sp.type, sp.pts, sp.closed), sp.closed, fmt));
    invalidate(el);
  }

  // src/shared/curve-notes.ts
  var NOTES = {
    catmull: () => t("The curve runs smoothly through every point you click."),
    bspline: () => t("The curve is pulled towards each point but only touches the first and the last – very smooth, good for flowing lines."),
    bezier3: () => t("Click a point, two control points, the next point, two control points … The curve passes through every third point; the control points (round) pull it."),
    bezier2: () => t("Click a point, a control point, the next point, a control point … The curve passes through every other point; the control points (round) pull it.")
  };
  var curveNote = (type) => (NOTES[type] || NOTES.catmull)();

  // src/core/panel.ts
  function setSides(n4) {
    state.sides = clamp(Math.round(n4) || 6, 3, 64);
    $("#opt-sides").value = state.sides;
    for (const b of $$("#quick-sides button")) b.classList.toggle("active", +b.dataset.sides === state.sides);
    savePrefs();
  }
  function bindCheck(id, key, after) {
    const i = $(id);
    i.checked = !!state[key];
    i.onchange = () => {
      state[key] = i.checked;
      savePrefs();
      if (after) after();
    };
  }
  function bindNumber(id, get, set) {
    const i = $(id);
    i.value = get();
    i.onchange = () => {
      const v = parseFloat(i.value);
      if (Number.isFinite(v) && set(v) !== false) savePrefs();
      i.value = get();
    };
  }
  function bindPanel() {
    for (const b of $$("#tools button")) b.onclick = () => setTool(b.dataset.tool);
    for (const b of $$("#mode-switch button")) b.onclick = () => setMode(b.dataset.mode);
    $("#btn-new").onclick = newDoc;
    $("#btn-open").onclick = openFile;
    $("#file-input").onchange = async (e) => {
      await loadFile(e.target.files[0]);
      e.target.value = "";
    };
    $("#btn-save").onclick = () => save(false);
    $("#btn-saveas").onclick = () => save(true);
    $("#btn-png").onclick = exportPNG;
    $("#btn-undo").onclick = undo;
    $("#btn-redo").onclick = redo;
    $("#btn-fit").onclick = fitView;
    $("#btn-zoomin").onclick = () => zoomCenter(1.25);
    $("#btn-zoomout").onclick = () => zoomCenter(0.8);
    $("#sa-finish").onclick = () => {
      if (state.freePts) finishFree();
      else cancelPending();
    };
    $("#sa-back").onclick = freeBack;
    $("#sa-cancel").onclick = cancelPending;
    bindPalette();
    bindNumber("#stroke-width", () => state.strokeWidth, (v) => {
      if (v < 0) return false;
      state.strokeWidth = v;
    });
    bindCheck("#opt-chain", "chain", () => {
      if (!state.chain) cancelPending();
    });
    const sides = $("#opt-sides");
    sides.onchange = () => setSides(+sides.value);
    for (const b of $$("#quick-sides button")) b.onclick = () => setSides(+b.dataset.sides);
    setSides(state.sides);
    for (const r of $$("input[name=ngmode]")) {
      r.checked = r.value === state.ngonMode;
      r.onchange = () => {
        if (r.checked) {
          state.ngonMode = r.value;
          savePrefs();
        }
      };
    }
    const newFills = $$(".opt-newfill");
    for (const c of newFills) {
      c.checked = state.newFill;
      c.onchange = () => {
        state.newFill = c.checked;
        for (const o of newFills) o.checked = c.checked;
        savePrefs();
      };
    }
    for (const r of $$("input[name=elmode]")) {
      r.checked = r.value === state.ellipseMode;
      r.onchange = () => {
        if (r.checked) {
          state.ellipseMode = r.value;
          savePrefs();
        }
      };
    }
    const ct = $("#opt-curve-type");
    if (!SPLINE_TYPES.includes(state.curveType)) state.curveType = "catmull";
    ct.value = state.curveType;
    const showCurveNote = () => {
      $("#curve-note").textContent = curveNote(state.curveType);
    };
    ct.onchange = () => {
      state.curveType = ct.value;
      savePrefs();
      showCurveNote();
      if (state.freePts) cancelPending();
    };
    showCurveNote();
    const pt = $("#pat-type");
    for (const [v, label2] of TYPES) {
      const o = document.createElement("option");
      o.value = v;
      o.textContent = t(label2);
      pt.append(o);
    }
    pt.value = state.pattern.type;
    const patUI = () => {
      $("#pat-rows-row").hidden = state.pattern.type !== "rows";
      $("#pat-angle-row").hidden = state.pattern.type === "rows";
    };
    pt.onchange = () => {
      state.pattern.type = pt.value;
      savePrefs();
      patUI();
    };
    patUI();
    bindNumber("#pat-rows", () => state.pattern.rows || 0, (v) => {
      state.pattern.rows = Math.max(0, Math.round(v));
    });
    bindNumber("#pat-size", () => state.pattern.size, (v) => {
      if (!(v > 0)) return false;
      state.pattern.size = v;
    });
    bindNumber("#pat-angle", () => state.pattern.angle, (v) => {
      state.pattern.angle = v;
    });
    $("#btn-pat-page").onclick = () => applyPattern(null);
    bindCheck("#opt-snap", "snap");
    bindCheck("#opt-link", "link");
    bindCheck("#opt-border", "border");
    bindCheck("#opt-grid", "grid", applyDoc);
    bindNumber("#opt-gridsize", () => state.gridSize, (v) => {
      if (!(v > 0)) return false;
      state.gridSize = v;
      applyDoc();
    });
    $("#opt-gap").onchange = () => {
      const v = parseFloat($("#opt-gap").value);
      if (v >= 0) {
        state.gapPct = v / Math.max(state.doc.w, state.doc.h) * 100;
        savePrefs();
      }
      $("#opt-gap").value = fmt(gapTol());
    };
    const st = $("#sym-type");
    st.value = state.sym.type;
    const symUI = () => {
      $("#sym-radial").hidden = state.sym.type !== "radial";
      drawGuides();
      savePrefs();
    };
    st.onchange = () => {
      state.sym.type = st.value;
      symUI();
    };
    bindNumber("#sym-n", () => state.sym.n, (v) => {
      state.sym.n = clamp(Math.round(v), 2, 64);
      drawGuides();
    });
    $("#sym-mirror").checked = state.sym.mirror;
    $("#sym-mirror").onchange = () => {
      state.sym.mirror = $("#sym-mirror").checked;
      symUI();
    };
    $("#btn-sym-center").onclick = () => {
      state.pickCenter = !state.pickCenter;
      $("#btn-sym-center").classList.toggle("active", state.pickCenter);
      if (state.pickCenter) toast(t("Click on the canvas to place the symmetry center."));
    };
    $("#btn-sym-reset").onclick = () => {
      state.sym.cx = state.sym.cy = null;
      savePrefs();
      drawGuides();
    };
    symUI();
    for (const b of $$("[data-layer]")) b.onclick = () => {
      const L = state.layers[b.dataset.layer], k = b.dataset.prop;
      L[k] = !L[k];
      savePrefs();
      applyLayers();
    };
    $("#btn-ref-load").onclick = () => $("#ref-file").click();
    $("#ref-file").onchange = async (e) => {
      const f = e.target.files[0];
      if (f) await loadPhoto(f);
      e.target.value = "";
    };
    $("#ref-opacity").oninput = (e) => {
      state.refOpacity = +e.target.value / 100;
      const im = refImage();
      if (im) im.style.opacity = String(state.refOpacity);
    };
    $("#ref-opacity").onchange = () => {
      savePrefs();
      docChanged();
    };
    $("#ref-show").onchange = (e) => {
      state.layers.ref.visible = e.target.checked;
      savePrefs();
      applyLayers();
    };
    $("#ref-lock").onchange = (e) => {
      state.layers.ref.locked = e.target.checked;
      savePrefs();
      applyLayers();
      if (!e.target.checked) toast(t("Photo unlocked: drag it with the Select tool (where there are no shapes)."));
    };
    $("#ref-size").onchange = (e) => setPhotoSize(clamp(+e.target.value || 100, 5, 1e3));
    $("#btn-ref-fit").onclick = () => {
      fitPhoto();
      docChanged();
    };
    $("#btn-ref-remove").onclick = async () => {
      if (await askYes(t("Remove the tracing photo?"))) {
        setPhoto(null);
        docChanged();
      }
    };
    bindCheck("#ref-save", "savePhoto", docChanged);
    bindCheck("#opt-unpainted", "onlyUnpainted");
    const g = state.grout;
    $("#grout-on").checked = g.on;
    $("#grout-on").onchange = (e) => {
      g.on = e.target.checked;
      applyGrout();
      savePrefs();
    };
    $("#grout-color").value = g.color;
    $("#grout-color").oninput = (e) => {
      g.color = e.target.value;
      applyGrout();
    };
    $("#grout-color").onchange = savePrefs;
    bindNumber("#grout-width", () => g.width, (v) => {
      if (v < 0) return false;
      g.width = v;
      applyGrout();
    });
    $("#btn-grout-bake").onclick = bakeGrout;
    const ngonInput = () => {
      const el = [...state.selection][0], gd = ngonData(el);
      if (!gd) return;
      const n4 = clamp(Math.round(+$("#sel-sides").value) || gd.n, 3, 64);
      const r = +$("#sel-radius").value > 0 ? +$("#sel-radius").value : gd.r;
      const rot = Number.isFinite(+$("#sel-rot").value) ? +$("#sel-rot").value : gd.rot;
      setNgon(el, { ...gd, n: n4, r, rot });
      commitGeometry();
    };
    for (const id of ["#sel-sides", "#sel-radius", "#sel-rot"]) $(id).onchange = ngonInput;
    $("#sel-sw").onchange = () => {
      const v = parseFloat($("#sel-sw").value);
      if (!(v >= 0)) return;
      for (const el of state.selection) {
        if (isFill(el)) continue;
        el.setAttribute("stroke-width", String(v));
        el.style.removeProperty("stroke-width");
      }
      commit();
    };
    $("#btn-del").onclick = deleteSel;
    $("#btn-dup").onclick = duplicate;
    $("#btn-front").onclick = toFront;
    $("#btn-sel-invert").onclick = invertSelection;
    $("#btn-back").onclick = toBack;
    $("#btn-doc-size").onclick = () => {
      const w = parseFloat($("#doc-w").value), h = parseFloat($("#doc-h").value);
      if (!(w > 0 && h > 0)) {
        toast(t("Invalid page size."));
        return;
      }
      state.doc.w = w;
      state.doc.h = h;
      applyDoc();
      commitGeometry();
      fitView();
    };
    $("#doc-unit").onchange = (e) => {
      state.doc.unit = e.target.value;
      applyDoc();
      commit();
      toast(t("1 drawing unit = 1 {unit}. Set the page size to the real size of your mosaic.", { unit: unit() }));
    };
    $("#doc-bg").onchange = () => {
      state.doc.bg = $("#doc-bg").value;
      applyDoc();
      commit();
    };
    $("#doc-bg-none").onchange = () => {
      state.doc.bg = $("#doc-bg-none").checked ? null : $("#doc-bg").value;
      applyDoc();
      commit();
    };
    bindCheck("#opt-rulers", "rulers", () => emit("view"));
  }

  // src/shared/clipboard.ts
  var canCopyImages = () => !!(navigator.clipboard && navigator.clipboard.write && typeof ClipboardItem !== "undefined");
  async function copyImage(png, text) {
    if (!canCopyImages()) return false;
    const items = { "image/png": png };
    if (text) items["text/plain"] = new Blob([text], { type: "text/plain" });
    try {
      await navigator.clipboard.write([new ClipboardItem(items)]);
      return true;
    } catch {
      return false;
    }
  }
  function imageFromPaste(e) {
    const dt = e.clipboardData;
    if (!dt) return null;
    for (const f of dt.files || []) if (/^image\//.test(f.type)) return f;
    for (const it of dt.items || []) {
      if (it.kind === "file" && /^image\//.test(it.type)) {
        const f = it.getAsFile();
        if (f) return f;
      }
    }
    return null;
  }
  function canvasToPng(c) {
    return new Promise((res, rej) => c.toBlob((b) => b ? res(b) : rej(new Error("PNG encoding failed")), "image/png"));
  }
  function svgSize(svg3) {
    const vb = /viewBox="\s*[-\d.e]+[\s,]+[-\d.e]+[\s,]+([\d.e]+)[\s,]+([\d.e]+)/.exec(svg3);
    if (vb) return { w: +vb[1], h: +vb[2] };
    const w = /\swidth="([\d.]+)/.exec(svg3), h = /\sheight="([\d.]+)/.exec(svg3);
    return { w: w ? +w[1] : 300, h: h ? +h[1] : 150 };
  }
  async function svgToCanvas(svg3, long) {
    const { w, h } = svgSize(svg3), k = long / Math.max(w, h, 1e-9);
    const W = Math.max(1, Math.round(w * k)), H = Math.max(1, Math.round(h * k));
    const sized = svg3.replace(/<svg\b([^>]*)>/, (m, a) => `<svg${a.replace(/\s(width|height)="[^"]*"/g, "")} width="${W}" height="${H}">`);
    const url2 = URL.createObjectURL(new Blob([sized], { type: "image/svg+xml" }));
    try {
      const img = await loadImg(url2);
      const c = document.createElement("canvas");
      c.width = W;
      c.height = H;
      c.getContext("2d").drawImage(img, 0, 0, W, H);
      return c;
    } finally {
      URL.revokeObjectURL(url2);
    }
  }
  async function svgToPng(svg3, long) {
    return canvasToPng(await svgToCanvas(svg3, long));
  }

  // src/shared/icons.ts
  var svg2 = (body) => `<svg class="ic" viewBox="0 0 20 20" aria-hidden="true">${body}</svg>`;
  var ICONS = {
    undo: svg2('<path d="M7.5 4.5l-4 4 4 4"/><path d="M3.5 8.5h8.25a4.25 4.25 0 0 1 0 8.5H9"/>'),
    redo: svg2('<path d="M12.5 4.5l4 4-4 4"/><path d="M16.5 8.5H8.25a4.25 4.25 0 0 0 0 8.5H11"/>'),
    zoomOut: svg2('<circle cx="8.5" cy="8.5" r="5.5"/><path d="M12.6 12.6l4.4 4.4M6 8.5h5"/>'),
    zoomIn: svg2('<circle cx="8.5" cy="8.5" r="5.5"/><path d="M12.6 12.6l4.4 4.4M6 8.5h5M8.5 6v5"/>'),
    fit: svg2('<path d="M3 7.5V3h4.5M12.5 3H17v4.5M17 12.5V17h-4.5M7.5 17H3v-4.5"/>'),
    help: svg2('<circle cx="10" cy="10" r="7.5"/><path d="M7.7 7.8a2.4 2.4 0 1 1 3.3 2.2c-.6.3-1 .8-1 1.5v.5"/><circle cx="10" cy="14.4" r=".5" class="dot"/>'),
    panel: svg2('<path d="M3 5.5h14M3 10h14M3 14.5h14"/>'),
    adjust: svg2('<path d="M4 4v12M10 4v12M16 4v12"/><circle cx="4" cy="12" r="1.8" class="knob"/><circle cx="10" cy="7" r="1.8" class="knob"/><circle cx="16" cy="13" r="1.8" class="knob"/>'),
    importImage: svg2('<rect x="3" y="4" width="14" height="12" rx="1.5"/><path d="M3 13l4-4 3 3 2-2 5 5"/><path d="M14 1v6M11 4h6"/>'),
    close: svg2('<path d="M5 5l10 10M15 5L5 15"/>')
  };

  // src/shared/quick-menu.ts
  var TAP_MS = 300;
  var GAP_MS = 350;
  var TAP_PX = 12;
  var PAIR_PX = 32;
  var host;
  var box3 = null;
  var target = "fill";
  var hideTimer = 0;
  var toSlider = (v) => {
    const { min, max } = host.size;
    return Math.round(1e3 * Math.log(Math.min(max, Math.max(min, v)) / min) / Math.log(max / min));
  };
  var fromSlider = (k) => {
    const { min, max } = host.size, v = min * Math.pow(max / min, k / 1e3);
    return v >= 10 ? Math.round(v) : v >= 1 ? Math.round(v * 2) / 2 : Math.round(v * 10) / 10;
  };
  function build3() {
    const el = document.createElement("div");
    el.id = "quick-menu";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", t("Quick menu"));
    el.hidden = true;
    el.innerHTML = `<div class="qm-card">
<div class="qm-row qm-head">
  <button class="qm-icon" data-act="undo" title="${t("Undo")}" aria-label="${t("Undo")}">${ICONS.undo}</button>
  <button class="qm-icon" data-act="redo" title="${t("Redo")}" aria-label="${t("Redo")}">${ICONS.redo}</button>
  <button class="qm-icon" data-act="fit" title="${t("Fit to the screen")}" aria-label="${t("Fit to the screen")}"><svg viewBox="0 0 20 20"><path d="M3 7V3h4M13 3h4v4M17 13v4h-4M7 17H3v-4" class="st"/></svg></button>
  <span class="qm-extra"></span>
  <span class="qm-grow"></span>
  <button class="qm-icon" data-act="close" title="${t("Close")}" aria-label="${t("Close")}">✕</button>
</div>
<div class="qm-tools"></div>
<div class="qm-row qm-targets" role="radiogroup" aria-label="${t("Which color")}">
  <button class="qm-target" data-target="fill" role="radio"><span class="qm-chip"></span><span class="qm-tname"></span></button>
  <button class="qm-target" data-target="stroke" role="radio"><span class="qm-chip"></span><span class="qm-tname"></span></button>
  <button class="qm-icon qm-more" data-act="choose" title="${t("Choose any color")}" aria-label="${t("Choose any color")}"><svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="7.5" class="st"/><path d="M10 6v8M6 10h8" class="st"/></svg></button>
</div>
<div class="qm-swatches"></div>
<label class="qm-row qm-size"><span class="qm-slabel"></span><input type="range" min="0" max="1000" step="1"><output></output></label>
</div>`;
    document.body.append(el);
    el.querySelector(".qm-slabel").textContent = host.size.label;
    const extra = el.querySelector(".qm-extra");
    for (const x of host.extra || []) {
      const b = document.createElement("button");
      b.className = "qm-icon";
      b.title = x.label;
      b.setAttribute("aria-label", x.label);
      b.innerHTML = x.icon;
      b.onclick = () => {
        close();
        x.run();
      };
      extra.append(b);
    }
    el.addEventListener("pointerdown", (e) => {
      if (e.target === el) {
        e.preventDefault();
        close();
      }
    });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
    });
    el.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      if (b.dataset.tool) {
        $(`#tools button[data-tool="${b.dataset.tool}"]`).click();
        close();
      } else if (b.dataset.target) {
        target = b.dataset.target;
        renderColors();
      } else if (b.dataset.color != null) {
        const c = b.dataset.color || null;
        if (target === "fill") host.setFill(c, true);
        else host.setStroke(c, true);
        renderColors();
        close();
      } else if (b.dataset.act === "undo" || b.dataset.act === "redo") {
        $(`#btn-${b.dataset.act}`).click();
        renderHead();
      } else if (b.dataset.act === "fit") {
        $("#btn-fit").click();
      } else if (b.dataset.act === "choose") {
        close();
        $(target === "fill" ? "#ac-fill" : "#ac-stroke").click();
      } else if (b.dataset.act === "close") close();
    });
    const range2 = el.querySelector(".qm-size input");
    range2.addEventListener("input", () => {
      const inp = $(host.size.input);
      inp.value = String(fromSlider(+range2.value));
      inp.dispatchEvent(new Event("change"));
      renderSize();
    });
    return el;
  }
  function renderHead() {
    for (const k of ["undo", "redo"]) box3.querySelector(`[data-act="${k}"]`).disabled = $(`#btn-${k}`).disabled;
  }
  function renderTools() {
    const wrap = box3.querySelector(".qm-tools");
    wrap.innerHTML = "";
    for (const id of host.tools) {
      const src = document.querySelector(`#tools button[data-tool="${id}"]`);
      if (!src || getComputedStyle(src).display === "none") continue;
      const b = document.createElement("button");
      b.className = "qm-tool" + (src.classList.contains("active") ? " active" : "");
      b.dataset.tool = id;
      b.title = src.title;
      b.setAttribute("aria-label", src.title);
      b.setAttribute("aria-pressed", String(src.classList.contains("active")));
      b.innerHTML = src.querySelector("svg")?.outerHTML || "";
      wrap.append(b);
    }
  }
  function renderColors() {
    const st = host.state;
    for (const b of box3.querySelectorAll(".qm-target")) {
      const which = b.dataset.target, c = st[which];
      b.classList.toggle("active", which === target);
      b.setAttribute("aria-checked", String(which === target));
      b.querySelector(".qm-chip").style.background = c || "";
      b.querySelector(".qm-chip").classList.toggle("none", !c);
      b.querySelector(".qm-tname").textContent = host.names[which];
    }
    const wrap = box3.querySelector(".qm-swatches"), now = st[target];
    wrap.innerHTML = "";
    const n4 = st.palette.length, rows = n4 > 7 ? 2 : 1;
    wrap.classList.toggle("scroll", n4 > 14);
    wrap.style.setProperty("--qm-rows", String(rows));
    wrap.style.setProperty("--qm-cols", String(Math.max(1, Math.ceil(n4 / rows))));
    for (const c of st.palette) {
      const s = document.createElement("button");
      s.className = "qm-swatch" + (c === now ? " active" : "");
      s.dataset.color = c;
      s.style.background = c;
      s.title = c;
      s.setAttribute("aria-label", c);
      wrap.append(s);
    }
    if (!st.palette.length) wrap.innerHTML = `<span class="qm-empty">${t("The palette is empty – use + to choose a color.")}</span>`;
  }
  function renderSize() {
    const v = parseFloat($(host.size.input).value) || host.size.min;
    box3.querySelector(".qm-size input").value = String(toSlider(v));
    box3.querySelector(".qm-size output").textContent = `${v} ${host.size.unit()}`;
  }
  function openQuickMenu(x, y) {
    box3 = box3 || build3();
    renderHead();
    renderTools();
    renderColors();
    renderSize();
    clearTimeout(hideTimer);
    box3.classList.remove("closing");
    box3.hidden = false;
    const card = box3.querySelector(".qm-card");
    card.classList.remove("in");
    const pad = getComputedStyle(document.body), m = 10;
    const top0 = parseFloat(pad.paddingTop) + m, left0 = parseFloat(pad.paddingLeft) + m;
    const right = innerWidth - parseFloat(pad.paddingRight) - m, bottom = innerHeight - parseFloat(pad.paddingBottom) - m;
    const w = card.offsetWidth, h = card.offsetHeight, gap = 28;
    let top = y - gap - h;
    if (top < top0) top = Math.min(y + gap, bottom - h);
    top = Math.max(top0, top);
    const left = Math.max(left0, Math.min(right - w, x - w / 2));
    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
    card.style.transformOrigin = `${x - left}px ${y - top}px`;
    box3.style.setProperty("--qx", `${x}px`);
    box3.style.setProperty("--qy", `${y}px`);
    void card.offsetWidth;
    card.classList.add("in");
    box3.classList.remove("ripple");
    void box3.offsetWidth;
    box3.classList.add("ripple");
  }
  var quickMenuOpen = () => !!box3 && !box3.hidden && !box3.classList.contains("closing");
  function close() {
    if (!quickMenuOpen()) return;
    box3.querySelector(".qm-card").classList.remove("in");
    box3.classList.add("closing");
    hideTimer = window.setTimeout(() => {
      box3.hidden = true;
      box3.classList.remove("closing");
    }, 160);
  }
  function initQuickMenu(h) {
    host = h;
    let cur = null;
    let last = null;
    let swallow = null;
    const stop = (e) => {
      e.stopImmediatePropagation();
      e.preventDefault();
    };
    const s = h.surface;
    s.addEventListener("pointerdown", (ev) => {
      const e = ev;
      if (e.pointerType !== "touch" || !e.isPrimary) {
        cur = last = null;
        return;
      }
      hintOnce();
      if (last && e.timeStamp - last.t < GAP_MS && Math.hypot(e.clientX - last.x, e.clientY - last.y) < PAIR_PX) {
        if (h.steps() === last.steps + 1) h.dropLastStep();
        h.cancelPending();
        last = null;
        swallow = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false };
        stop(e);
        return;
      }
      last = null;
      cur = { id: e.pointerId, x: e.clientX, y: e.clientY, t: e.timeStamp, steps: h.steps(), busy: h.busy(), moved: false };
    }, true);
    s.addEventListener("pointermove", (ev) => {
      const e = ev;
      if (swallow && e.pointerId === swallow.id) {
        if (Math.hypot(e.clientX - swallow.x, e.clientY - swallow.y) > PAIR_PX) swallow.moved = true;
        stop(e);
        return;
      }
      if (cur && e.pointerId === cur.id && Math.hypot(e.clientX - cur.x, e.clientY - cur.y) > TAP_PX) cur.moved = true;
    }, true);
    s.addEventListener("pointerup", (ev) => {
      const e = ev;
      if (swallow && e.pointerId === swallow.id) {
        const open3 = !swallow.moved;
        swallow = null;
        stop(e);
        if (open3) openQuickMenu(e.clientX, e.clientY);
        return;
      }
      if (cur && e.pointerId === cur.id && !cur.moved && !cur.busy && e.timeStamp - cur.t < TAP_MS) {
        last = { x: e.clientX, y: e.clientY, t: e.timeStamp, steps: cur.steps };
      }
      cur = null;
    }, true);
    s.addEventListener("pointercancel", (ev) => {
      const e = ev;
      if (swallow && e.pointerId === swallow.id) {
        swallow = null;
        stop(e);
      }
      cur = last = null;
    }, true);
    s.addEventListener("dblclick", (e) => {
      if (quickMenuOpen()) stop(e);
    }, true);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && quickMenuOpen()) {
        e.stopImmediatePropagation();
        close();
      }
    }, true);
  }
  function hintOnce() {
    if (navigator.webdriver || lsGet("mz-quick-hint")) return;
    lsSet("mz-quick-hint", "1");
    toast(t("Tip: double-tap the drawing for a quick menu – tools, colors and size."));
  }

  // src/core/input.ts
  function setTouch(on2) {
    rt.snapPx = on2 ? 18 : 10;
    rt.handlePx = on2 ? 18 : 9;
    rt.hitPx = on2 ? 12 : 6;
  }
  var pointers = /* @__PURE__ */ new Map();
  var pinch = null;
  var pinchDone = false;
  function startPinch() {
    const a = state.action;
    if (a && (a.moved && ["move", "vertex", "ngon-resize"].includes(a.type) || a.type === "paint" && a.ctx.changed)) restoreCurrent();
    if (a && a.type === "free-press" && state.freePts) {
      state.freePts.pop();
      if (!state.freePts.length) state.freePts = null;
    }
    if (state.tool !== "free" && state.tool !== "curve" && !(state.tool === "line" && state.chain)) state.lineStart = null;
    state.action = null;
    previewG.innerHTML = "";
    snapG.innerHTML = "";
    const [p1, p2] = [...pointers.values()];
    pinch = { d0: Math.hypot(p1.x - p2.x, p1.y - p2.y) || 1, m0: { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }, view: { ...state.view } };
    pinchDone = true;
  }
  function movePinch() {
    const [p1, p2] = [...pointers.values()];
    const d = Math.hypot(p1.x - p2.x, p1.y - p2.y) || 1, m = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
    const r = svg.getBoundingClientRect(), v0 = pinch.view;
    const s = clamp(v0.s * d / pinch.d0, 5e-3, 2e3);
    const docPt = { x: v0.x + (pinch.m0.x - r.left) / v0.s, y: v0.y + (pinch.m0.y - r.top) / v0.s };
    state.view = { s, x: docPt.x - (m.x - r.left) / s, y: docPt.y - (m.y - r.top) / s };
    updateView();
  }
  function capturePointer(e) {
    try {
      svg.setPointerCapture(e.pointerId);
    } catch {
    }
  }
  function pointerEnd(e) {
    pointers.delete(e.pointerId);
    if (pinch || pinchDone) {
      if (pointers.size < 2) pinch = null;
      if (!pointers.size) pinchDone = false;
      return true;
    }
    return false;
  }
  function bindPointer() {
    svg.addEventListener("pointerdown", (e) => {
      setTouch(e.pointerType === "touch" || e.pointerType === "pen");
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) {
        startPinch();
        return;
      }
      if (pointers.size > 2 || pinch) return;
      pinchDone = false;
      if (e.button === 2) {
        if (state.lineStart || state.action || state.freePts) cancelPending();
        return;
      }
      const raw = toDoc(e.clientX, e.clientY);
      if (state.pickCenter && e.button === 0) {
        const p = snapPoint(raw);
        state.sym.cx = p.x;
        state.sym.cy = p.y;
        state.pickCenter = false;
        $("#btn-sym-center").classList.remove("active");
        savePrefs();
        drawGuides();
        toast(t("Symmetry center set."));
        return;
      }
      if (e.button === 1 || state.space || state.tool === "pan") {
        e.preventDefault();
        state.action = { type: "pan", cx: e.clientX, cy: e.clientY, vx: state.view.x, vy: state.view.y };
        capturePointer(e);
        stage.classList.add("panning");
        return;
      }
      if (e.button !== 0) return;
      capturePointer(e);
      tools[state.tool].down(e, raw);
      updateStageActions();
    });
    svg.addEventListener("pointermove", (e) => {
      if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pinch) {
        if (pointers.size >= 2) movePinch();
        return;
      }
      if (pinchDone) return;
      const raw = toDoc(e.clientX, e.clientY);
      $("#st-pos").textContent = `x ${raw.x.toFixed(1)}  y ${raw.y.toFixed(1)} ${unit()}`;
      const a = state.action;
      if (a && a.type === "pan") {
        state.view.x = a.vx - (e.clientX - a.cx) / state.view.s;
        state.view.y = a.vy - (e.clientY - a.cy) / state.view.s;
        updateView();
        return;
      }
      if (state.space) return;
      if (e.pointerType === "touch" && !pointers.has(e.pointerId)) return;
      tools[state.tool].move(e, raw);
    });
    svg.addEventListener("pointerup", (e) => {
      if (pointerEnd(e)) return;
      const a = state.action;
      if (a && a.type === "pan") {
        state.action = null;
        stage.classList.remove("panning");
        return;
      }
      if (e.button !== 0) return;
      tools[state.tool].up(e, toDoc(e.clientX, e.clientY));
      updateStageActions();
    });
    svg.addEventListener("pointercancel", (e) => {
      pointerEnd(e);
      if (state.action && state.action.type === "paint" && state.action.ctx.changed) commit(true);
      state.action = null;
      previewG.innerHTML = "";
      stage.classList.remove("panning");
    });
    svg.addEventListener("pointerleave", () => {
      if (!state.action) snapG.innerHTML = "";
    });
    svg.addEventListener("dblclick", () => {
      if ((state.tool === "free" || state.tool === "curve") && state.freePts) finishFree();
    });
    svg.addEventListener("contextmenu", (e) => e.preventDefault());
    svg.addEventListener("wheel", (e) => {
      e.preventDefault();
      const dy = e.deltaMode === 1 ? e.deltaY * 30 : e.deltaY;
      zoomAt(e.clientX, e.clientY, Math.exp(-dy * 15e-4));
    }, { passive: false });
    new ResizeObserver(() => updateView()).observe(stage);
  }
  function onKey(e) {
    const target3 = e.target;
    if (typingIn(target3)) {
      if (e.key !== "Escape") return;
      target3.blur();
      if (!state.lineStart && !state.freePts) return;
    }
    if (target3.tagName === "INPUT" && e.key === " ") return;
    if (modalOpen()) return;
    const ctrl = e.ctrlKey || e.metaKey, k = e.key.toLowerCase();
    if (ctrl) {
      if (k === "z" && !e.shiftKey) undo();
      else if (k === "y" || k === "z" && e.shiftKey) redo();
      else if (k === "s") save(e.shiftKey);
      else if (k === "o") openFile();
      else if (k === "d") duplicate();
      else if (k === "a") selectAll();
      else if (k === "i") invertSelection();
      else return;
      e.preventDefault();
      return;
    }
    if (e.key === " ") {
      if (!state.space) {
        state.space = true;
        stage.classList.add("space");
      }
      e.preventDefault();
      return;
    }
    const nudge = (dx, dy) => {
      if (!state.selection.size) return;
      const s = state.grid ? state.gridSize : e.shiftKey ? 10 : 1;
      moveElements([...state.selection], { x: dx * s, y: dy * s });
      commitFor(state.selection);
    };
    switch (k) {
      case "v":
        setTool("select");
        break;
      case "l":
        setTool("line");
        break;
      case "p":
        setTool("free");
        break;
      case "g":
      case "n":
        setTool("ngon");
        break;
      case "o":
        setTool("ellipse");
        break;
      case "c":
        setTool("curve");
        break;
      case "k":
        setTool("knife");
        break;
      case "t":
        setTool("pattern");
        break;
      case "b":
      case "f":
        setTool("bucket");
        break;
      case "h":
        setTool("pan");
        break;
      case "s":
        state.snap = !state.snap;
        $("#opt-snap").checked = state.snap;
        savePrefs();
        toast(state.snap ? t("Snapping on") : t("Snapping off"));
        break;
      case "enter":
        if (state.freePts) finishFree();
        else if (state.lineStart) cancelPending();
        break;
      case "delete":
      case "backspace":
        if (state.freePts) freeBack();
        else deleteSel();
        break;
      case "escape":
        cancelPending();
        if (state.pickCenter) {
          state.pickCenter = false;
          $("#btn-sym-center").classList.remove("active");
        }
        if (state.selection.size) {
          state.selection.clear();
          selectionChanged();
        }
        break;
      case "0":
        fitView();
        break;
      case "+":
      case "=":
        zoomCenter(1.25);
        break;
      case "-":
      case "_":
        zoomCenter(0.8);
        break;
      case "arrowleft":
        nudge(-1, 0);
        break;
      case "arrowright":
        nudge(1, 0);
        break;
      case "arrowup":
        nudge(0, -1);
        break;
      case "arrowdown":
        nudge(0, 1);
        break;
      default:
        if (/^[3-9]$/.test(k)) {
          setSides(+k);
          if (state.tool !== "ngon") setTool("ngon");
        } else return;
    }
    e.preventDefault();
  }
  function bindInput() {
    bindPointer();
    initQuickMenu({
      surface: svg,
      tools: ["select", "line", "free", "ngon", "ellipse", "curve", "bucket", "pattern"],
      state,
      setFill,
      setStroke,
      names: { fill: t("Fill"), stroke: t("Line") },
      size: { input: "#stroke-width", min: 0.1, max: 50, label: t("Line width"), unit },
      busy: () => !!(state.lineStart || state.freePts),
      steps,
      dropLastStep,
      cancelPending() {
        cancelPending();
        updateStageActions();
      }
    });
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", (e) => {
      if (e.key === " ") {
        state.space = false;
        stage.classList.remove("space");
      }
    });
    window.addEventListener("blur", () => {
      state.space = false;
      stage.classList.remove("space");
    });
    document.addEventListener("paste", (e) => {
      if (typingIn(e.target)) return;
      const text = e.clipboardData && e.clipboardData.getData("text") || "";
      const img = imageFromPaste(e);
      if (img && !/data-mosaic-snippet/.test(text)) {
        e.preventDefault();
        pastePhoto(img);
        return;
      }
      for (const fn of handlers("pasteText")) if (fn(text)) {
        e.preventDefault();
        return;
      }
      if (!text) return;
      if (!pasteColors(text)) toast(t("The clipboard has no color codes."));
    });
    stage.addEventListener("dragover", (e) => {
      e.preventDefault();
      stage.classList.add("drop");
    });
    stage.addEventListener("dragleave", () => stage.classList.remove("drop"));
    stage.addEventListener("drop", (e) => {
      e.preventDefault();
      stage.classList.remove("drop");
      const f = e.dataTransfer.files[0];
      if (!f) return;
      if (/^image\//.test(f.type) && !/svg/.test(f.type)) loadPhoto(f);
      else confirmDiscard().then((ok) => {
        if (ok) loadFile(f);
      });
    });
  }

  // src/core/api.ts
  var MZ = {
    addLineSegments,
    clearDrawing,
    addPalette,
    paintedColorAt,
    neighbourColors,
    setFillChooser,
    elMatrix,
    snapPoint,
    toDoc,
    typingIn,
    invalidate,
    setSelection: (els) => {
      state.selection = new Set(els);
      selectionChanged();
    },
    registerTool,
    getHistory,
    setHistory,
    docChanged,
    updateView,
    fitView,
    pauseAutosave,
    state,
    svg,
    stage,
    on,
    emit,
    toast,
    download,
    fmt,
    fmtLen,
    fmtArea,
    unit,
    mk,
    allShapes,
    geomOf,
    isFill,
    hasFill,
    fillOf,
    insideEl,
    isPaintedAt,
    paintFill,
    replaceColor,
    boundarySegments,
    regionIndex: regionIndex2,
    bucketAt,
    gridSample,
    insideRegion,
    commit,
    commitGeometry,
    refImage,
    loadImg,
    buildSVGString,
    loadSVGText,
    openText,
    saveVersion,
    restoreVersion,
    confirmDiscard,
    hasContent,
    setMode,
    setTool,
    get fileName() {
      return rt.fileName;
    },
    /** true once the autosaved drawing has been restored */
    ready: false
  };
  loadPrefs();
  bindPanel();
  bindInput();
  renderPaletteSelect();
  document.body.dataset.mode = state.mode;
  for (const b of $$("#mode-switch button")) b.classList.toggle("active", b.dataset.mode === state.mode);
  applyDoc();
  applyGrout();
  applyLayers();
  renderPhotoUI();
  setTool("select");
  resetHistory();
  afterChange();
  rt.dirty = false;
  updateTitle();
  requestAnimationFrame(fitView);
  (async () => {
    let rec = null;
    try {
      rec = await Store.get("current");
    } catch {
    }
    const text = rec && rec.svg || lsGet("mz-autosave");
    if (text && loadSVGText(text, { quiet: true, restore: true })) {
      if (rec && rec.fileName) rt.fileName = rec.fileName;
      rt.dirty = false;
      updateTitle();
    }
    startAutosave();
    MZ.ready = true;
    emit("ready");
  })();

  // src/lib/automosaic.ts
  var STYLES = [
    ["square", "Squares"],
    ["brick", "Bricks"],
    ["hex", "Hexagons"],
    ["irregular", "Irregular (crazy paving)"]
  ];
  function rng(seed) {
    let a = seed >>> 0 || 1;
    return () => {
      a = a + 1831565813 | 0;
      let t2 = Math.imul(a ^ a >>> 15, 1 | a);
      t2 = t2 + Math.imul(t2 ^ t2 >>> 7, 61 | t2) ^ t2;
      return ((t2 ^ t2 >>> 14) >>> 0) / 4294967296;
    };
  }
  var rect2 = (x, y, w, h) => [{ x, y }, { x: x + w, y }, { x: x + w, y: y + h }, { x, y: y + h }];
  function quadLeaves(box4, size, adaptive, busy) {
    const top = adaptive ? size * 2 : size, min = adaptive ? size / 2 : size, out = [];
    const visit = (x, y, s) => {
      if (x >= box4.x + box4.w - 1e-9 || y >= box4.y + box4.h - 1e-9) return;
      if (s > min * 1.0001 && busy(x, y, s, s)) {
        const h = s / 2;
        visit(x, y, h);
        visit(x + h, y, h);
        visit(x, y + h, h);
        visit(x + h, y + h, h);
      } else out.push({ x, y, s });
    };
    for (let j = 0; j * top < box4.h; j++) for (let i = 0; i * top < box4.w; i++) visit(box4.x + i * top, box4.y + j * top, top);
    return out;
  }
  function clipHalf(poly, f) {
    const out = [];
    for (let i = 0, n4 = poly.length; i < n4; i++) {
      const a = poly[i], b = poly[(i + 1) % n4], fa = f(a), fb = f(b);
      if (fa <= 0) out.push(a);
      if (fa < 0 && fb > 0 || fa > 0 && fb < 0) {
        const t2 = fa / (fa - fb);
        out.push({ x: a.x + (b.x - a.x) * t2, y: a.y + (b.y - a.y) * t2 });
      }
    }
    return out;
  }
  function voronoi(seeds, box4) {
    const cell = Math.sqrt(box4.w * box4.h / Math.max(1, seeds.length)) || 1, grid = /* @__PURE__ */ new Map();
    const key = (i, j) => i + "," + j;
    seeds.forEach((s, idx) => {
      const k = key(Math.floor(s.x / cell), Math.floor(s.y / cell));
      (grid.get(k) || grid.set(k, []).get(k)).push(idx);
    });
    const maxRing = Math.ceil(Math.max(box4.w, box4.h) / cell) + 1;
    return seeds.map((s, idx) => {
      const ci = Math.floor(s.x / cell), cj = Math.floor(s.y / cell);
      let poly = rect2(box4.x, box4.y, box4.w, box4.h);
      const radius = () => Math.max(...poly.map((p) => dist(p, s)));
      for (let r = 0; r <= maxRing && poly.length >= 3; r++) {
        if ((r - 1) * cell > 2 * radius()) break;
        const ring = [];
        for (let i = ci - r; i <= ci + r; i++) for (let j = cj - r; j <= cj + r; j++) {
          if (Math.max(Math.abs(i - ci), Math.abs(j - cj)) !== r) continue;
          for (const o of grid.get(key(i, j)) || []) if (o !== idx) ring.push(o);
        }
        ring.sort((a, b) => dist(seeds[a], s) - dist(seeds[b], s));
        for (const o of ring) {
          const n4 = seeds[o], nx = n4.x - s.x, ny = n4.y - s.y, mx = (s.x + n4.x) / 2, my = (s.y + n4.y) / 2;
          poly = clipHalf(poly, (p) => (p.x - mx) * nx + (p.y - my) * ny);
          if (poly.length < 3) break;
        }
      }
      return poly;
    }).filter((p) => p.length >= 3);
  }
  function cells2({ style, box: box4, size, detail = 0, busy = () => false, seed = 1 }) {
    const adaptive = detail > 0;
    if (style === "hex") {
      const s = size / Math.sqrt(3);
      return cells("hex", s, { x0: -s, y0: -s, x1: box4.w + s, y1: box4.h + s }).map((poly) => poly.map((p) => ({ x: p.x + box4.x, y: p.y + box4.y })));
    }
    if (style === "brick") {
      const out = [];
      for (let j = 0; j * size < box4.h; j++) {
        const off = j % 2 ? -size : 0;
        for (let x = box4.x + off; x < box4.x + box4.w; x += 2 * size) {
          const y = box4.y + j * size;
          if (adaptive && busy(x, y, 2 * size, size)) out.push(rect2(x, y, size, size), rect2(x + size, y, size, size));
          else out.push(rect2(x, y, 2 * size, size));
        }
      }
      return out;
    }
    const leaves = quadLeaves(box4, size, adaptive, busy);
    if (style === "irregular") {
      const rnd = rng(seed);
      const seeds = leaves.map((l) => ({ x: l.x + l.s * (0.5 + (rnd() - 0.5) * 0.7), y: l.y + l.s * (0.5 + (rnd() - 0.5) * 0.7) })).filter((p) => p.x >= box4.x && p.y >= box4.y && p.x <= box4.x + box4.w && p.y <= box4.y + box4.h);
      return voronoi(seeds, box4);
    }
    return leaves.map((l) => rect2(l.x, l.y, l.s, l.s));
  }
  function lines(polys, rings, inside, eps2) {
    const q = eps2 * 10, key = (p) => Math.round(p.x / q) + "," + Math.round(p.y / q), seen = /* @__PURE__ */ new Set(), pieces2 = [];
    const keep = (p) => inside(p) && distToRings(p, rings) > eps2 * 20;
    for (const poly of polys) for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length], k1 = key(a), k2 = key(b);
      const k = k1 < k2 ? k1 + "|" + k2 : k2 + "|" + k1;
      if (k1 === k2 || seen.has(k)) continue;
      seen.add(k);
      pieces2.push(...clipSegment(a, b, rings, keep));
    }
    return mergeCollinear(pieces2, eps2);
  }
  function kmeans(points, k, seed = 1, iterations = 16) {
    if (!points.length) return [];
    k = Math.min(k, points.length);
    const rnd = rng(seed), d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
    const centers = [points[Math.floor(rnd() * points.length)]];
    while (centers.length < k) {
      const w = points.map((p) => Math.min(...centers.map((c) => d2(p, c))));
      let r = rnd() * w.reduce((s, v) => s + v, 0), i = 0;
      while (i < points.length - 1 && (r -= w[i]) > 0) i++;
      centers.push(points[i]);
    }
    let counts = [];
    for (let it = 0; it < iterations; it++) {
      const sums = centers.map(() => [0, 0, 0]);
      counts = centers.map(() => 0);
      for (const p of points) {
        let best = 0, bd = Infinity;
        centers.forEach((c, ci) => {
          const d = d2(p, c);
          if (d < bd) {
            bd = d;
            best = ci;
          }
        });
        sums[best][0] += p[0];
        sums[best][1] += p[1];
        sums[best][2] += p[2];
        counts[best]++;
      }
      centers.forEach((c, ci) => {
        if (counts[ci]) centers[ci] = sums[ci].map((v) => v / counts[ci]);
      });
    }
    return centers.map((c, i) => ({ c, n: counts[i] })).sort((a, b) => b.n - a.n).map((x) => x.c);
  }

  // src/lib/photo.ts
  function sampler({ data, W, H, box: box4 }) {
    return (p) => {
      const u = Math.floor((p.x - box4.x) / box4.w * W), v = Math.floor((p.y - box4.y) / box4.h * H);
      if (u < 0 || v < 0 || u >= W || v >= H) return null;
      const i = (v * W + u) * 4;
      return data[i + 3] < 20 ? null : [data[i], data[i + 1], data[i + 2]];
    };
  }
  function detailAt(at, x, y, w, h) {
    const labs = [];
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
      const c = at({ x: x + w * (i + 0.5) / 5, y: y + h * (j + 0.5) / 5 });
      if (c) labs.push(toLab(c));
    }
    if (labs.length < 2) return 0;
    const m = [0, 1, 2].map((k) => labs.reduce((s, l) => s + l[k], 0) / labs.length);
    return labs.reduce((s, l) => s + Math.hypot(l[0] - m[0], l[1] - m[1], l[2] - m[2]), 0) / labs.length;
  }
  function suggestPalette(at, box4, n4) {
    const labs = [];
    for (let i = 0; i < 70; i++) for (let j = 0; j < 70; j++) {
      const c = at({ x: box4.x + box4.w * (i + 0.5) / 70, y: box4.y + box4.h * (j + 0.5) / 70 });
      if (c) labs.push(toLab(c));
    }
    return [...new Set(kmeans(labs, n4, 7).map(fromLab))];
  }
  function photoMosaic(j, progress) {
    setEps(j.eps);
    const at = sampler(j.photo), d = j.page;
    const page2 = [{ x: d.x, y: d.y }, { x: d.x + d.w, y: d.y }, { x: d.x + d.w, y: d.y + d.h }, { x: d.x, y: d.y + d.h }];
    const bar = 4 + (1 - j.detail / 100) * 26;
    const busy = (x, y, w, h) => detailAt(at, x, y, w, h) > bar;
    const cells3 = cells2({ style: j.style, box: d, size: j.size, detail: j.detail / 100, busy, seed: j.seed });
    progress?.(0.5);
    if (cells3.length > j.maxTiles) return { tiles: cells3.length, lines: [], palette: [] };
    const lines2 = lines(cells3, [page2], (p) => pointInPolygon(p, page2), j.eps);
    progress?.(0.85);
    return { tiles: cells3.length, lines: lines2, palette: j.suggest ? suggestPalette(at, j.photo.box, j.suggest) : [] };
  }

  // src/features/photo-tools.ts
  var PhotoTools = /* @__PURE__ */ (() => {
    async function photoPixels() {
      const im = MZ.refImage();
      if (!im) return null;
      let img;
      try {
        img = await MZ.loadImg(im.getAttribute("href"));
      } catch {
        return null;
      }
      const k = Math.min(1, 1200 / Math.max(img.naturalWidth, img.naturalHeight));
      const W = Math.max(1, Math.round(img.naturalWidth * k)), H = Math.max(1, Math.round(img.naturalHeight * k));
      const cv = document.createElement("canvas");
      cv.width = W;
      cv.height = H;
      const cx = cv.getContext("2d", { willReadFrequently: true });
      cx.drawImage(img, 0, 0, W, H);
      const data = cx.getImageData(0, 0, W, H).data;
      const box4 = { x: +im.getAttribute("x"), y: +im.getAttribute("y"), w: +im.getAttribute("width"), h: +im.getAttribute("height") };
      return { data, W, H, box: box4 };
    }
    async function pixels() {
      const p = await photoPixels();
      return p && { at: sampler(p), box: p.box };
    }
    function average(px2, pts) {
      let r = 0, g = 0, b = 0, n4 = 0;
      for (const p of pts) {
        const c = px2.at(p);
        if (!c) continue;
        r += c[0];
        g += c[1];
        b += c[2];
        n4++;
      }
      return n4 ? [r / n4, g / n4, b / n4] : null;
    }
    const detailAt3 = (px2, x, y, w, h) => detailAt(px2.at, x, y, w, h);
    const suggestPalette2 = (px2, box4, n4) => suggestPalette(px2.at, box4, n4);
    async function colorTiles({ onlyUnpainted = true, commit: commit2 = true, quiet = false } = {}) {
      const px2 = await pixels();
      if (!px2) {
        MZ.toast(t("Load a photo first (Photo section)."));
        return null;
      }
      const pal = MZ.state.palette;
      if (!pal.length) {
        MZ.toast(t("The palette is empty – add colors first."));
        return null;
      }
      const labs = pal.map((c) => toLab(toRgb(c)));
      const ctx2 = { ix: MZ.regionIndex() };
      let painted = 0, skipped = 0, outside = 0;
      for (const f of ctx2.ix.faces) {
        const reg = ctx2.ix.region(f);
        const pts = MZ.gridSample(reg.bb, (p) => MZ.insideRegion(reg, p), 40);
        if (!pts.length) continue;
        if (onlyUnpainted && MZ.isPaintedAt(pts[0])) {
          skipped++;
          continue;
        }
        const rgb = average(px2, pts);
        if (!rgb) {
          outside++;
          continue;
        }
        if (MZ.bucketAt(pts[0], nearest(rgb, pal, labs), ctx2, f).changed) painted++;
      }
      if (commit2 && painted) MZ.commit(true);
      if (!quiet) {
        MZ.toast(t("Colored {n} {n|area|areas} with the closest palette colors", { n: painted }) + (skipped ? " · " + t("{n} already painted (left as they were)", { n: skipped }) : "") + (outside ? " · " + t("{n} outside the photo", { n: outside }) : "") + ".");
      }
      return { painted, skipped, outside };
    }
    return { photoPixels, pixels, average, detailAt: detailAt3, suggestPalette: suggestPalette2, colorTiles };
  })();

  // src/features/vision.ts
  var Vision = (() => {
    const NS = "http://www.w3.org/2000/svg";
    const VIEWS = [
      ["none", t("Normal colors")],
      ["gray", t("Black & white")],
      ["protan", t("Red-blind (protanopia)")],
      ["deutan", t("Green-blind (deuteranopia)")],
      ["tritan", t("Blue-blind (tritanopia)")]
    ];
    const ALIKE = 10;
    let view = "none", marking = false;
    function similarPairs(colors) {
      const out = [];
      for (let i = 0; i < colors.length; i++) for (let j = i + 1; j < colors.length; j++) {
        const a = colors[i], b = colors[j];
        const seen = VIEWS.filter(([t2]) => deltaE(simulate(a, t2), simulate(b, t2)) < ALIKE).map(([t2]) => t2);
        if (seen.length) out.push({ a, b, views: seen, d: deltaE(a, b) });
      }
      return out;
    }
    function describe2(views) {
      if (views.includes("none")) return t("look almost the same");
      const who = { gray: t("in black & white"), protan: t("for red-blind viewers"), deutan: t("for green-blind viewers"), tritan: t("for blue-blind viewers") };
      return t("look alike {who}", { who: views.map((v) => who[v]).join(", ") });
    }
    function buildFilters() {
      const defs = $("#mz-uidefs");
      for (const [t2] of VIEWS) {
        if (t2 === "none") continue;
        const m = VISION[t2], f = document.createElementNS(NS, "filter"), c = document.createElementNS(NS, "feColorMatrix");
        f.id = "mz-vision-" + t2;
        f.setAttribute("color-interpolation-filters", "linearRGB");
        c.setAttribute("type", "matrix");
        c.setAttribute("values", `${m[0]} ${m[1]} ${m[2]} 0 0  ${m[3]} ${m[4]} ${m[5]} 0 0  ${m[6]} ${m[7]} ${m[8]} 0 0  0 0 0 1 0`);
        f.appendChild(c);
        defs.appendChild(f);
      }
    }
    function setView(v) {
      view = VIEWS.some(([t2]) => t2 === v) ? v : "none";
      const f = view === "none" ? null : `url(#mz-vision-${view})`;
      for (const id of ["#mz-doc", "#mz-page", "#mz-ref"]) {
        const el = $(id);
        if (f) el.setAttribute("filter", f);
        else el.removeAttribute("filter");
      }
      $("#view-filter").value = view;
      $("#stage").classList.toggle("vision-on", view !== "none");
      if (marking) markLowContrast();
    }
    function markLowContrast() {
      const g = $("#mz-marks");
      g.innerHTML = "";
      if (!marking) return 0;
      const ix = MZ.regionIndex();
      let n4 = 0;
      for (const f of ix.faces) {
        const reg = ix.region(f), p = MZ.gridSample(reg.bb, (q) => MZ.insideRegion(reg, q), 1)[0];
        const c = p && MZ.paintedColorAt(p);
        if (!c) continue;
        const mine = simulate(c, view);
        const blends = [...MZ.neighbourColors(reg)].some((o) => o !== c && deltaE(mine, simulate(o, view)) < ALIKE);
        if (!blends) continue;
        const path = document.createElementNS(NS, "path");
        path.setAttribute("d", [reg.outer, ...reg.holes].map((r) => "M" + r.map((q) => `${q.x} ${q.y}`).join("L") + "Z").join(""));
        path.setAttribute("class", "contrast-mark");
        g.appendChild(path);
        n4++;
      }
      return n4;
    }
    function setMarking(on2) {
      marking = on2;
      $("#btn-contrast").classList.toggle("active", on2);
      const n4 = markLowContrast();
      if (on2) MZ.toast(n4 ? view === "none" ? t("{n} {n|tile blends|tiles blend} into a neighbour of another color.", { n: n4 }) : t("{n} {n|tile blends|tiles blend} into a neighbour of another color (in this view).", { n: n4 }) : t("No tile blends into its neighbours."));
    }
    function init() {
      buildFilters();
      const sel2 = $("#view-filter");
      for (const [v, label2] of VIEWS) {
        const o = document.createElement("option");
        o.value = v;
        o.textContent = label2;
        sel2.append(o);
      }
      sel2.onchange = () => setView(sel2.value);
      $("#btn-contrast").onclick = () => setMarking(!marking);
      MZ.on("change", () => {
        if (marking) markLowContrast();
      });
      MZ.on("mode", () => {
        if (MZ.state.mode !== "expert" && marking) setMarking(false);
      });
    }
    return { VIEWS, similarPairs, describe: describe2, setView, init, get view() {
      return view;
    } };
  })();
  Vision.init();

  // src/lib/html.ts
  var esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  // src/shared/printing.ts
  function openPrintPage(html2) {
    const url2 = URL.createObjectURL(new Blob([html2], { type: "text/html" }));
    const w = window.open(url2, "_blank");
    if (!w) {
      toast(t("The browser blocked the print window – allow pop-ups for this page."));
      return;
    }
    setTimeout(() => URL.revokeObjectURL(url2), 6e4);
  }
  function legendHTML(title, rows) {
    return rows.length ? `<h2>${esc(title)} – ${t("colors")}</h2><table>` + rows.map((r) => `<tr><td class="n">${r.n}</td><td><span style="background:${r.color}"></span></td><td>${r.color}</td><td>${esc(r.count)}</td><td>${esc(r.area)}</td></tr>`).join("") + "</table>" : "";
  }
  var csvText = (header, rows) => [header, ...rows].map((r) => r.join(",")).join("\n") + "\n";

  // src/features/report.ts
  var { state: state2 } = MZ;
  function colorStats() {
    const map = /* @__PURE__ */ new Map();
    for (const el of MZ.allShapes()) {
      const c = MZ.fillOf(el);
      if (!c) continue;
      let a = MZ.isFill(el) ? Math.abs(+el.dataset.area) : 0;
      if (!a) a = MZ.geomOf(el).polys.filter((p) => p.closed).reduce((s, p) => s + Math.abs(polygonArea(p.pts)), 0);
      const e = map.get(c) || { tiles: 0, area: 0 };
      e.tiles++;
      e.area += a;
      map.set(c, e);
    }
    return map;
  }
  function colorNumbers(colors) {
    const pal = state2.palette, out = /* @__PURE__ */ new Map();
    let next = pal.length + 1;
    for (const c of [...colors].sort((a, b) => (pal.indexOf(a) + 1 || 1e9) - (pal.indexOf(b) + 1 || 1e9))) {
      out.set(c, pal.includes(c) ? pal.indexOf(c) + 1 : next++);
    }
    return out;
  }
  function unpaintedCount() {
    const ix = MZ.regionIndex();
    let n4 = 0;
    for (const f of ix.faces) {
      const r = ix.region(f), p = MZ.gridSample(r.bb, (q) => MZ.insideRegion(r, q), 1)[0];
      if (p && !MZ.isPaintedAt(p)) n4++;
    }
    return n4;
  }
  var report = { tileW: 10, tileH: 10, waste: 10 };
  loadSettings("mz-report", report);
  function reportRows() {
    const stats = colorStats(), nums = colorNumbers(stats.keys());
    const total = [...stats.values()].reduce((s, e) => s + e.area, 0) || 1;
    const piece = report.tileW * report.tileH;
    return [...stats.entries()].map(([c, e]) => ({
      c,
      n: nums.get(c),
      tiles: e.tiles,
      area: e.area,
      share: e.area / total * 100,
      pieces: piece > 0 ? Math.ceil(e.area / piece * (1 + report.waste / 100)) : 0
    })).sort((a, b) => a.n - b.n);
  }
  function renderReport() {
    const rows = reportRows(), d = state2.doc, u = MZ.unit();
    const expert = state2.mode === "expert";
    const tiles = rows.reduce((s, r) => s + r.tiles, 0);
    const free = unpaintedCount();
    $("#rep-summary").innerHTML = t("<b>{n}</b> painted {n|area|areas} in <b>{c}</b> {c|color|colors}", { n: tiles, c: rows.length }) + (free ? " · " + t("<b>{n}</b> not painted yet", { n: free }) : " · " + t("everything is painted")) + " · " + t("page {w} × {h} {unit}", { w: MZ.fmt(d.w), h: MZ.fmt(d.h), unit: u });
    const palOpts = state2.palette.map((c, i) => `<option value="${c}" style="background:${c}">#${i + 1} ${c}</option>`).join("");
    $("#rep-table").innerHTML = `<thead><tr><th>#</th><th></th><th>${t("Color")}</th><th>${t("Areas")}</th><th>${t("Total area")}</th><th>${t("Share of area")}</th>` + (expert ? `<th title="${t("Pieces of the size set above, plus waste")}">${t("Pieces to buy")}</th>` : "") + `<th>${t("Replace with")}</th></tr></thead><tbody>` + rows.map((r) => `<tr><td>${r.n}</td><td><span class="mini" style="background:${r.c}"></span></td><td>${r.c}</td><td>${r.tiles}</td><td>${MZ.fmtArea(r.area)}</td><td>${r.share.toFixed(1)} %</td>` + (expert ? `<td>${r.pieces || "–"}</td>` : "") + `<td><select data-from="${r.c}"><option value="">—</option>${palOpts}<option value="none">${t("Erase")}</option></select></td></tr>`).join("") + `</tbody>`;
    if (!rows.length) $("#rep-table").innerHTML = `<tbody><tr><td>${t("Nothing is painted yet. Use the paint bucket, or “Color tiles from photo”.")}</td></tr></tbody>`;
    for (const s of document.querySelectorAll("#rep-table select")) {
      s.onchange = () => {
        if (!s.value) return;
        const to = s.value === "none" ? null : s.value;
        const n4 = MZ.replaceColor(s.dataset.from, to);
        MZ.commit(true);
        MZ.toast(to ? t("Recolored {n} {n|area|areas}.", { n: n4 }) : t("Erased {n} {n|area|areas}.", { n: n4 }));
        renderReport();
      };
    }
    for (const el of document.querySelectorAll(".unit-label")) el.textContent = u;
    const alike = Vision.similarPairs(rows.map((r) => r.c));
    $("#rep-alike").innerHTML = alike.length ? `<h3>${t("Colors that may look alike")}</h3><ul>` + alike.map((p) => `<li><span class="mini" style="background:${p.a}"></span> <span class="mini" style="background:${p.b}"></span> ${esc(t("{a} and {b} {how}", { a: p.a, b: p.b, how: Vision.describe(p.views) }))}</li>`).join("") + "</ul>" : "";
  }
  function reportCSV() {
    const rows = reportRows(), u = MZ.unit();
    const text = csvText(
      ["number", "color", "areas", `area_${u}2`, "share_percent", "pieces"],
      rows.map((r) => [r.n, r.c, r.tiles, r.area.toFixed(2), r.share.toFixed(2), r.pieces])
    );
    MZ.download(new Blob([text], { type: "text/csv" }), MZ.fileName.replace(/\.svg$/i, "") + "-colors.csv");
  }
  $("#btn-report").onclick = () => {
    $("#rep-tw").value = report.tileW;
    $("#rep-th").value = report.tileH;
    $("#rep-waste").value = report.waste;
    renderReport();
    $("#dlg-report").showModal();
  };
  for (const id of ["#rep-tw", "#rep-th", "#rep-waste"]) {
    $(id).onchange = () => {
      report.tileW = +$("#rep-tw").value || 0;
      report.tileH = +$("#rep-th").value || 0;
      report.waste = +$("#rep-waste").value || 0;
      saveSettings("mz-report", report);
      renderReport();
    };
  }
  $("#rep-csv").onclick = reportCSV;

  // src/lib/print.ts
  var PAPERS = {
    a4: { w: 210, h: 297, name: "A4" },
    letter: { w: 215.9, h: 279.4, name: "Letter" },
    a3: { w: 297, h: 420, name: "A3" },
    tabloid: { w: 279.4, h: 431.8, name: "Tabloid" }
  };
  var MM = { mm: 1, cm: 10, in: 25.4, px: 25.4 / 96 };
  var MARGIN = 10;
  var LABEL = 7;
  var OVERLAP = 10;
  var rowName = (r) => (r >= 26 ? rowName(Math.floor(r / 26) - 1) : "") + String.fromCharCode(65 + r % 26);
  var n = (v) => String(Math.round(v * 1e3) / 1e3);
  function area(paperKey, orientation) {
    const p = PAPERS[paperKey] || PAPERS.a4;
    const [pw, ph] = orientation === "landscape" ? [p.h, p.w] : [p.w, p.h];
    return { paper: p, orientation, aw: pw - 2 * MARGIN, ah: ph - 2 * MARGIN - LABEL };
  }
  function sheetsFor(wmm, hmm, A, mode) {
    if (mode === "fit") {
      const scale = Math.min(A.aw / wmm, A.ah / hmm);
      return { ...A, scale, rows: 1, cols: 1, sheets: [{ label: "", row: 0, col: 0, x: 0, y: 0, w: wmm, h: hmm }], cost: -scale };
    }
    const count = (len, avail) => len <= avail ? 1 : Math.ceil((len - OVERLAP) / (avail - OVERLAP));
    const cols = count(wmm, A.aw), rows = count(hmm, A.ah), sheets = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const x = c * (A.aw - OVERLAP), y = r * (A.ah - OVERLAP);
      sheets.push({ label: rows * cols > 1 ? rowName(r) + (c + 1) : "", row: r, col: c, x, y, w: Math.min(A.aw, wmm - x), h: Math.min(A.ah, hmm - y) });
    }
    return { ...A, scale: 1, rows, cols, sheets, cost: rows * cols };
  }
  function layout(wmm, hmm, paperKey = "a4", mode = "real", orientation = null) {
    const opts3 = (orientation ? [orientation] : ["portrait", "landscape"]).map((o) => sheetsFor(wmm, hmm, area(paperKey, o), mode));
    return opts3.length > 1 && opts3[1].cost < opts3[0].cost ? opts3[1] : opts3[0];
  }
  function sheetSections(box4, k, L, { title = "", prefix = "" } = {}) {
    const multi = L.sheets.length > 1;
    return L.sheets.map((s) => {
      const vb = [box4.x + s.x / k, box4.y + s.y / k, s.w / k, s.h / k];
      const shade = [];
      if (multi && s.col < L.cols - 1 && s.w >= L.aw) shade.push([vb[0] + vb[2] - OVERLAP / k, vb[1], OVERLAP / k, vb[3]]);
      if (multi && s.row < L.rows - 1 && s.h >= L.ah) shade.push([vb[0], vb[1] + vb[3] - OVERLAP / k, vb[2], OVERLAP / k]);
      const marks = shade.map((r) => `<rect x="${n(r[0])}" y="${n(r[1])}" width="${n(r[2])}" height="${n(r[3])}" fill="rgba(0,120,255,0.12)" stroke="rgba(0,120,255,0.6)" stroke-dasharray="${n(2 / k)} ${n(2 / k)}" stroke-width="${n(0.3 / k)}"/>`).join("");
      const label2 = multi ? prefix + t("Sheet {sheet} – row {row}, column {col} of {cols} · blue strips are covered by the next sheet", { sheet: s.label, row: s.label.replace(/\d+$/, ""), col: s.col + 1, cols: L.cols }) : prefix + title;
      return `<section class="sheet"><div class="label">${esc(label2)}</div><svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.map(n).join(" ")}" style="width:${n(s.w * L.scale)}mm;height:${n(s.h * L.scale)}mm"><use href="#art"/>${marks}</svg></section>`;
    });
  }
  function layoutInfo(L, mode) {
    const o = t(L.orientation);
    if (mode === "fit") return t("One {paper} sheet ({orientation}), at {pct} % of the real size.", { paper: L.paper.name, orientation: o, pct: Math.round(L.scale * 100) });
    if (L.sheets.length === 1) return t("One {paper} sheet ({orientation}) at real size.", { paper: L.paper.name, orientation: o });
    return t("{n} {paper} {n|sheet|sheets} ({orientation}, {rows} × {cols}, overlapping {overlap} mm) at real size.", { n: L.sheets.length, paper: L.paper.name, orientation: o, rows: L.rows, cols: L.cols, overlap: OVERLAP });
  }
  function overviewSection(box4, k, A, rects, heading, extra = "") {
    const s = Math.min(A.aw / (box4.w * k), (A.ah - 20) / (box4.h * k));
    const stroke = 0.6 / k / s;
    const marks = rects.map((r) => `<rect x="${n(r.x)}" y="${n(r.y)}" width="${n(r.w)}" height="${n(r.h)}" fill="none" stroke="#0070f0" stroke-width="${n(stroke)}"/><text x="${n(r.x + r.w / 2)}" y="${n(r.y + r.h / 2)}" font-size="${n(Math.min(r.w, r.h) / 4)}" text-anchor="middle" dominant-baseline="central" fill="#0070f0" font-family="Arial" font-weight="bold">${esc(r.label)}</text>`).join("");
    return `<section class="sheet"><div class="label">${esc(heading)}</div><svg xmlns="http://www.w3.org/2000/svg" viewBox="${[box4.x, box4.y, box4.w, box4.h].map(n).join(" ")}" style="width:${n(box4.w * k * s)}mm;height:${n(box4.h * k * s)}mm"><use href="#art" opacity="0.45"/>${marks}</svg>${extra}</section>`;
  }
  function page({ art, sections, paper = "a4", orientation = "portrait", title = "Mosaic" }) {
    const p = PAPERS[paper] || PAPERS.a4;
    return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title><style>
@page { size: ${p.name} ${orientation}; margin: ${MARGIN}mm; }
html, body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
.sheet { page-break-after: always; break-after: page; }
.sheet:last-child { page-break-after: auto; break-after: auto; }
.sheet svg { display: block; }
.label { height: ${LABEL}mm; font-size: 3.2mm; color: #333; }
.legend table, .counts { border-collapse: collapse; }
.legend td, .counts td { padding: 1.2mm 3mm; border-bottom: 0.2mm solid #ccc; font-size: 3.6mm; }
.counts { margin-top: 3mm; }
.legend td.n, .counts td.n { font-weight: bold; }
.legend span, .counts span { display: inline-block; width: 9mm; height: 6mm; border: 0.2mm solid #888; vertical-align: middle; }
* { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
</style></head><body>
<svg width="0" height="0" style="position:absolute"><defs><g id="art">${art}</g></defs></svg>
${sections.join("\n")}
<script>window.onload = () => setTimeout(() => window.print(), 400);<\/script>
</body></html>`;
  }
  function html({ art, box: box4, unit: unit2, mmPerUnit = 0, paper = "a4", mode = "real", legend = "", title = "Mosaic" }) {
    const k = mmPerUnit || MM[unit2] || MM.px;
    const L = layout(box4.w * k, box4.h * k, paper, mode);
    const sections = [];
    if (L.sheets.length > 1) {
      sections.push(overviewSection(
        box4,
        k,
        L,
        L.sheets.map((s) => ({ x: box4.x + s.x / k, y: box4.y + s.y / k, w: s.w / k, h: s.h / k, label: s.label })),
        `${title} – ` + t("{n} sheets ({rows} × {cols}), real size {w} × {h} cm", { n: L.sheets.length, rows: L.rows, cols: L.cols, w: num(+n(box4.w * k / 10)), h: num(+n(box4.h * k / 10)) })
      ));
    }
    sections.push(...sheetSections(box4, k, L, { title }));
    if (legend) sections.push(`<section class="sheet legend">${legend}</section>`);
    return page({ art, sections, paper, orientation: L.orientation, title });
  }

  // src/features/print.ts
  var { state: state3 } = MZ;
  function labelSpot(el) {
    const g = MZ.geomOf(el), polys = g.polys.filter((p) => p.closed);
    const pts = MZ.gridSample(g.bbox, (p) => MZ.insideEl(el, p), 80);
    let best = null, bd = 0;
    for (const p of pts) {
      let d = Infinity;
      for (const pl of polys) for (let i = 0, n4 = pl.pts.length; i < n4; i++) d = Math.min(d, dist(p, project(p, pl.pts[i], pl.pts[(i + 1) % n4])));
      if (d > bd) {
        bd = d;
        best = p;
      }
    }
    return best && { p: best, r: bd };
  }
  function printArt(style) {
    const stats = colorStats(), nums = colorNumbers(stats.keys());
    const doc = new DOMParser().parseFromString(MZ.buildSVGString({ photo: false, grout: state3.grout.on, pageOnly: true }), "image/svg+xml");
    const root = doc.documentElement, NS = "http://www.w3.org/2000/svg";
    const labels = [];
    if (style !== "colors") {
      const big = Math.max(state3.doc.w, state3.doc.h);
      for (const el of MZ.allShapes()) {
        const c = MZ.fillOf(el);
        if (!c) continue;
        const s = labelSpot(el);
        if (!s) continue;
        const size = Math.min(Math.max(s.r * 1.1, big * 4e-3), big * 0.04);
        labels.push({ x: s.p.x, y: s.p.y, size, n: nums.get(c), c });
      }
    }
    if (style === "numbers") {
      for (const el of root.querySelectorAll('[id="mosaic-fills"] *, [id="mosaic-shapes"] *')) {
        if (el.localName === "g" || el.localName === "line") continue;
        const isArea = (el.getAttribute("class") || "").includes("mz-fill");
        if (isArea || el.getAttribute("fill") && el.getAttribute("fill") !== "none") el.setAttribute("fill", "#ffffff");
        if (isArea) el.setAttribute("stroke", "#ffffff");
        el.style.removeProperty("fill");
      }
      const bg = root.querySelector('[id="mosaic-bg"]');
      if (bg) bg.setAttribute("fill", "#ffffff");
    }
    if (labels.length) {
      const g = doc.createElementNS(NS, "g");
      g.setAttribute("font-family", "Arial, sans-serif");
      g.setAttribute("text-anchor", "middle");
      for (const l of labels) {
        const t2 = doc.createElementNS(NS, "text");
        t2.setAttribute("x", MZ.fmt(l.x));
        t2.setAttribute("y", MZ.fmt(l.y + l.size * 0.36));
        t2.setAttribute("font-size", MZ.fmt(l.size));
        t2.setAttribute("fill", style === "numbers" || luminance(l.c) > 140 ? "#000" : "#fff");
        t2.textContent = l.n;
        g.appendChild(t2);
      }
      root.appendChild(g);
    }
    const art = [...root.childNodes].map((c) => new XMLSerializer().serializeToString(c)).join("");
    const rows = [...stats.entries()].map(([c, e]) => ({ c, n: nums.get(c), ...e })).sort((a, b) => a.n - b.n);
    return { art, rows, nums };
  }
  function legendHTML2(rows) {
    return legendHTML(MZ.fileName, rows.map((r) => ({ n: r.n, color: r.c, count: t("{n} {n|area|areas}", { n: r.tiles }), area: MZ.fmtArea(r.area) })));
  }
  function printTemplate() {
    const { art, rows } = printArt(document.querySelector("input[name=print-style]:checked").value);
    const d = state3.doc;
    openPrintPage(html({
      art,
      box: { x: d.x, y: d.y, w: d.w, h: d.h },
      unit: MZ.unit(),
      legend: $("#print-legend").checked ? legendHTML2(rows) : "",
      title: MZ.fileName.replace(/\.svg$/i, ""),
      paper: $("#print-paper").value,
      mode: document.querySelector("input[name=print-size]:checked").value
    }));
  }
  function updatePrintInfo() {
    const d = state3.doc, k = MM[MZ.unit()] || MM.px;
    const mode = document.querySelector("input[name=print-size]:checked").value;
    const L = layout(d.w * k, d.h * k, $("#print-paper").value, mode);
    $("#print-info").textContent = layoutInfo(L, mode);
  }
  $("#btn-print").onclick = () => {
    updatePrintInfo();
    $("#dlg-print").showModal();
  };
  var PrintTools = { art: printArt, legend: legendHTML2, colorStats, colorNumbers };
  for (const el of document.querySelectorAll("#print-paper, input[name=print-size]")) el.onchange = updatePrintInfo;
  $("#print-go").onclick = () => {
    $("#dlg-print").close();
    printTemplate();
  };

  // src/shared/history-ui.ts
  function initHistoryUI(host2, button) {
    const dlg4 = document.createElement("dialog");
    dlg4.id = "dlg-history";
    dlg4.innerHTML = `<form method="dialog" class="dlg-head"><h2>${t("History")}</h2><button title="${t("Close")}">✕</button></form>
<p class="note">${esc(host2.texts.intro)}</p>
<div class="row"><button id="hist-save">${t("Save a version now")}</button></div>
<div id="hist-list"></div>`;
    document.body.append(dlg4);
    dlg4.addEventListener("click", (e) => {
      if (e.target === dlg4) dlg4.close();
    });
    const list = dlg4.querySelector("#hist-list");
    let thumbs2 = [];
    async function render3() {
      thumbs2.forEach((u) => URL.revokeObjectURL(u));
      thumbs2 = [];
      let versions;
      try {
        versions = await host2.list();
      } catch {
        list.innerHTML = `<p class="note">${t("Version history needs browser storage (IndexedDB), which is not available here.")}</p>`;
        return;
      }
      if (!versions.length) {
        list.innerHTML = `<p class="note">${esc(host2.texts.empty)}</p>`;
        return;
      }
      list.innerHTML = "";
      for (const v of versions) {
        const row = document.createElement("div");
        row.className = "hist-row" + (v.pinned ? " pinned" : "");
        const url2 = URL.createObjectURL(host2.thumbnail(v));
        thumbs2.push(url2);
        const when = new Date(v.time).toLocaleString(lang);
        const facts = [
          v.title ? when : "",
          v.name,
          v.note,
          host2.detail(v),
          v.size ? `${num(+v.size.w.toFixed(1))} × ${num(+v.size.h.toFixed(1))} ${v.size.unit}` : "",
          v.colors != null ? t("{n} {n|color|colors}", { n: v.colors }) : ""
        ].filter(Boolean);
        row.innerHTML = `<img src="${url2}" alt=""><div class="hist-info"><b>${v.pinned ? "★ " : ""}${esc(v.title || when)}</b><span>${esc(facts.join(" · "))}</span></div>`;
        const pin = document.createElement("button"), rename = document.createElement("button"), restore2 = document.createElement("button");
        pin.className = "hist-pin";
        pin.textContent = "★";
        pin.title = v.pinned ? t("Unpin – it may be cleared with old versions") : t("Pin – kept when old versions are cleared");
        pin.setAttribute("aria-pressed", String(!!v.pinned));
        pin.onclick = () => change(v, { pinned: !v.pinned });
        rename.textContent = "✎";
        rename.title = rename.ariaLabel = t("Name this version");
        rename.onclick = async () => {
          const title = await ask(t("Name of this version:"), v.title || "");
          if (title != null) change(v, { title: title.trim() || void 0 });
        };
        restore2.textContent = t("Restore");
        restore2.onclick = async () => {
          dlg4.close();
          await host2.restore(v);
        };
        row.append(pin, rename, restore2);
        list.append(row);
      }
    }
    async function change(v, what) {
      try {
        await Store.updateVersion({ ...v, ...what });
      } catch {
        toast(t("Could not save a version (browser storage unavailable)."));
      }
      render3();
    }
    button.onclick = () => {
      render3();
      dlg4.showModal();
    };
    dlg4.querySelector("#hist-save").onclick = async () => {
      toast(await host2.saveNow() ? t("Version saved.") : t("Could not save a version (browser storage unavailable)."));
      render3();
    };
  }

  // src/features/history-ui.ts
  var { state: state4 } = MZ;
  initHistoryUI({
    texts: {
      intro: t("Versions are kept in this browser: every few minutes while you work, and before you open, start or restore another drawing. Restoring keeps your current drawing as a version too."),
      empty: t("No versions yet. A version is kept every few minutes while you work, and before you open or start another drawing.")
    },
    list: () => Store.listVersions("vector"),
    thumbnail: (v) => new Blob([v.svg || ""], { type: "image/svg+xml" }),
    detail: (v) => v.tiles ? t("{n} painted {n|area|areas}", { n: v.tiles }) : "",
    restore: (v) => MZ.restoreVersion(v),
    saveNow: () => MZ.saveVersion(t("Saved by hand"))
  }, $("#btn-history"));
  $("#btn-autocolor").onclick = () => PhotoTools.colorTiles({ onlyUnpainted: state4.onlyUnpainted });

  // src/features/rulers.ts
  var { state: state5 } = MZ;
  var rx = $("#ruler-x");
  var ry = $("#ruler-y");
  var corner = $("#ruler-corner");
  function niceStep(raw) {
    const p = Math.pow(10, Math.floor(Math.log10(raw)));
    for (const m of [1, 2, 5, 10]) if (m * p >= raw) return { step: m * p, minor: m === 2 ? 4 : 5 };
    return { step: 10 * p, minor: 5 };
  }
  function drawRuler(cv, horizontal) {
    const dpr = window.devicePixelRatio || 1, w = cv.clientWidth, h = cv.clientHeight;
    if (!w || !h) return;
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
    const c = cv.getContext("2d");
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.fillStyle = "#27282c";
    c.fillRect(0, 0, w, h);
    c.strokeStyle = "#7d8088";
    c.fillStyle = "#b5b7bd";
    c.font = "10px system-ui, sans-serif";
    const v = state5.view, d = state5.doc, len = horizontal ? w : h;
    const origin = horizontal ? d.x : d.y, start = horizontal ? v.x : v.y;
    const { step, minor } = niceStep(60 / v.s);
    const first = Math.floor((start - origin) / step) * step;
    c.beginPath();
    for (let t2 = first; ; t2 += step / minor) {
      const s = (origin + t2 - start) * v.s;
      if (s > len) break;
      if (s < 0) continue;
      const major = Math.abs(t2 / step - Math.round(t2 / step)) < 1e-6;
      const tick = major ? h * 0.6 : h * 0.25;
      if (horizontal) {
        c.moveTo(s + 0.5, h);
        c.lineTo(s + 0.5, h - tick);
      } else {
        c.moveTo(w, s + 0.5);
        c.lineTo(w - tick, s + 0.5);
      }
      if (major) {
        const label2 = String(+t2.toFixed(6));
        if (horizontal) c.fillText(label2, s + 3, 10);
        else {
          c.save();
          c.translate(10, s + 3);
          c.rotate(-Math.PI / 2);
          c.textAlign = "right";
          c.fillText(label2, 0, 0);
          c.restore();
        }
      }
    }
    c.stroke();
  }
  function drawRulers() {
    const show2 = state5.mode === "expert" && state5.rulers;
    MZ.stage.classList.toggle("with-rulers", show2);
    rx.hidden = ry.hidden = corner.hidden = !show2;
    if (!show2) return;
    corner.textContent = MZ.unit();
    drawRuler(rx, true);
    drawRuler(ry, false);
  }
  MZ.on("view", drawRulers);
  MZ.on("mode", drawRulers);

  // src/shared/shell.ts
  function initShell(stage2) {
    const ls = $("#lang-select");
    for (const [code, name] of LANGS) {
      const o = document.createElement("option");
      o.value = code;
      o.textContent = name;
      ls.append(o);
    }
    ls.value = lang;
    ls.onchange = () => setLang(ls.value);
    $("#btn-panel").onclick = () => document.body.classList.toggle("panel-open");
    new ResizeObserver(([e]) => document.documentElement.style.setProperty("--topbar-h", e.target.offsetHeight + "px")).observe($("#topbar"));
    stage2.addEventListener("pointerdown", () => document.body.classList.remove("panel-open"));
    for (const d of document.querySelectorAll("dialog")) {
      d.addEventListener("click", (e) => {
        if (e.target === d) d.close();
      });
    }
    let installEvent = null;
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      installEvent = e;
      $("#btn-install").hidden = false;
    });
    $("#btn-install").onclick = async () => {
      if (!installEvent) return;
      installEvent.prompt();
      await installEvent.userChoice;
      installEvent = null;
      $("#btn-install").hidden = true;
    };
    window.addEventListener("appinstalled", () => {
      $("#btn-install").hidden = true;
      toast(t("Installed – Mosaic Paint now works offline too."));
    });
    if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol) && !location.hostname.endsWith("discordsays.com")) {
      navigator.serviceWorker.register("sw.js").catch(() => {
      });
    }
  }

  // src/features/shell.ts
  initShell(MZ.stage);

  // worker-source:worker-source
  var worker_source_default = '(()=>{var q=null,et=new Map;function be(e){if(e==null)return null;let t=String(e).trim();if(!t||t==="none")return null;if(et.has(t))return et.get(t);let n=t;/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(n)&&(n="#"+n);let o=null;return CSS.supports("color",n)&&!/^(inherit|initial|unset|revert|currentcolor)$/i.test(n)&&(q=q||document.createElement("canvas").getContext("2d"),q.fillStyle="#000",q.fillStyle=n,o=q.fillStyle),et.set(t,o),o}function nt(e){if(Array.isArray(e))return e;if(/^#[0-9a-f]{6}$/i.test(e))return[1,3,5].map(o=>parseInt(e.slice(o,o+2),16));let t=be(e);if(!t)return null;if(t[0]==="#")return[1,3,5].map(o=>parseInt(t.slice(o,o+2),16));let n=t.match(/[\\d.]+/g);return n?n.slice(0,3).map(Number):null}function G([e,t,n]){let o=g=>(g/=255,g<=.04045?g/12.92:Math.pow((g+.055)/1.055,2.4)),r=o(e),a=o(t),s=o(n),u=(r*.4124+a*.3576+s*.1805)/.95047,l=r*.2126+a*.7152+s*.0722,i=(r*.0193+a*.1192+s*.9505)/1.08883,m=g=>g>216/24389?Math.cbrt(g):(24389/27*g+16)/116,f=m(u),c=m(l),h=m(i);return[116*c-16,500*(f-c),200*(c-h)]}function xt([e,t,n]){let o=(e+16)/116,r=o+t/500,a=o-n/200,s=c=>c**3>216/24389?c**3:(116*c-16)/(24389/27),u=.95047*s(r),l=s(o),i=1.08883*s(a),m=c=>c<=.0031308?12.92*c:1.055*Math.pow(c,1/2.4)-.055;return"#"+[3.2406*u-1.5372*l-.4986*i,-.9689*u+1.8758*l+.0415*i,.0557*u-.204*l+1.057*i].map(c=>Math.round(Math.max(0,Math.min(1,m(c)))*255)).map(c=>c.toString(16).padStart(2,"0")).join("")}function yt(e,t,n){n=n||t.map(s=>G(nt(s)));let o=G(e),r=null,a=1/0;return t.forEach((s,u)=>{let l=n[u],i=(o[0]-l[0])**2+(o[1]-l[1])**2+(o[2]-l[2])**2;i<a&&(a=i,r=s)}),r}var Mt=(e,t)=>({width:e,height:t,data:new Uint8ClampedArray(e*t*4)});function wt(e){let t=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(e);return t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:nt(e)}function Y(e,t=255){let n=e?wt(e):null;return n?[n[0],n[1],n[2],t]:[0,0,0,0]}var rt=e=>e.toString(16).padStart(2,"0"),st=(e,t,n)=>"#"+rt(e)+rt(t)+rt(n);function ot(e,t,n){e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3]}function Pt(e){let t=e.map(o=>G(wt(o))),n=new Map;return(o,r,a)=>{let s=o<<16|r<<8|a,u=n.get(s);return u||(u=yt([o,r,a],e,t),n.set(s,u)),u}}function At(e,t){let{width:n,height:o}=e,r=e.data,a=Mt(n,o),s=a.data,u=Math.max(2,Math.round(t.tile)),l=Math.min(u-1,Math.max(0,Math.round(t.grout))),i=t.palette&&t.palette.length?Pt(t.palette):null,m=Y(t.groutColor),f=new Map,c=0;for(let h=0,g=0;h<o;h+=u,g++){let M=t.bricks&&g%2?-Math.floor(u/2):0;for(let P=M;P<n;P+=u){let p=Math.max(0,P),x=Math.min(n,P+u),d=Math.min(o,h+u),v=0,U=0,A=0,S=0,b=0;for(let w=h;w<d-(d===h+u?l:0);w++)for(let I=p;I<Math.min(x,P+u-l);I++){let R=(w*n+I)*4;b++,!(r[R+3]<128)&&(v+=r[R],U+=r[R+1],A+=r[R+2],S++)}let y=S>0&&S>=b/2,k=[0,0,0,0];if(y){v=Math.round(v/S),U=Math.round(U/S),A=Math.round(A/S);let w=i?i(v,U,A):st(v,U,A);k=Y(w),f.set(w,(f.get(w)||0)+1),c++}for(let w=h;w<d;w++)for(let I=p;I<x;I++){let R=I>=P+u-l||w>=h+u-l;ot(s,(w*n+I)*4,R?y?m:[0,0,0,0]:k)}}}return{img:a,counts:f,tiles:c}}function vt(e){let{width:t,height:n,data:o}=e,r=t*n,a=new Int32Array(r).fill(-1),s=[],u=[],l=m=>o[m*4+3]<128?-1:o[m*4]<<16|o[m*4+1]<<8|o[m*4+2],i=[];for(let m=0;m<r;m++){if(a[m]>=0)continue;let f=l(m);if(f<0)continue;let c=s.length,h=0;for(a[m]=c,i.push(m);i.length;){let g=i.pop(),M=g%t;h++;for(let P of[M>0?g-1:-1,M<t-1?g+1:-1,g-t,g+t])P<0||P>=r||a[P]>=0||l(P)!==f||(a[P]=c,i.push(P))}s.push(st(f>>16,f>>8&255,f&255)),u.push(h)}return{labels:a,colors:s,sizes:u}}function kt(e,t,n,o,r){let a=[],s=e.data;for(let l=0;l<5;l++)for(let i=0;i<5;i++){let m=Math.floor(t+o*(l+.5)/5),f=Math.floor(n+r*(i+.5)/5);if(m<0||f<0||m>=e.width||f>=e.height)continue;let c=(f*e.width+m)*4;s[c+3]>=128&&a.push(G([s[c],s[c+1],s[c+2]]))}if(a.length<2)return 0;let u=[0,1,2].map(l=>a.reduce((i,m)=>i+m[l],0)/a.length);return a.reduce((l,i)=>l+Math.hypot(i[0]-u[0],i[1]-u[1],i[2]-u[2]),0)/a.length}function pe(e,t,n,o){let r=n.length,a=n.map(l=>l.y),s=Math.max(0,Math.floor(Math.min(...a))),u=Math.min(t-1,Math.ceil(Math.max(...a)));for(let l=s;l<=u;l++){let i=l+.5,m=[];for(let f=0;f<r;f++){let c=n[f],h=n[(f+1)%r];c.y<=i!=h.y<=i&&m.push(c.x+(i-c.y)*(h.x-c.x)/(h.y-c.y))}m.sort((f,c)=>f-c);for(let f=0;f+1<m.length;f+=2){let c=Math.max(0,Math.ceil(m[f]-.5)),h=Math.min(e-1,Math.floor(m[f+1]-.5));for(let g=c;g<=h;g++)o(l*e+g)}}}function St(e,t,n){let{width:o,height:r}=e,a=e.data,s=Mt(o,r),u=s.data,l=n.palette&&n.palette.length?Pt(n.palette):null,i=new Map,m=[],f=0;for(let h of t){let g=0,M=0,P=0,p=0,x=0,d=[];if(pe(o,r,h,A=>{d.push(A),x++;let S=A*4;a[S+3]<128||(g+=a[S],M+=a[S+1],P+=a[S+2],p++)}),!p||p<x/2)continue;g=Math.round(g/p),M=Math.round(M/p),P=Math.round(P/p);let v=l?l(g,M,P):st(g,M,P),U=Y(v);for(let A of d)ot(u,A*4,U);i.set(v,(i.get(v)||0)+1),f++,m.push(h)}let c=Math.max(0,n.grout)/2;if(c>0){let h=Y(n.groutColor);for(let g of m)for(let M=0;M<g.length;M++){let P=g[M],p=g[(M+1)%g.length],x=p.x-P.x,d=p.y-P.y,v=x*x+d*d||1,U=Math.max(0,Math.floor(Math.min(P.x,p.x)-c)),A=Math.min(o-1,Math.ceil(Math.max(P.x,p.x)+c)),S=Math.max(0,Math.floor(Math.min(P.y,p.y)-c)),b=Math.min(r-1,Math.ceil(Math.max(P.y,p.y)+c));for(let y=S;y<=b;y++)for(let k=U;k<=A;k++){let w=k+.5,I=y+.5,R=Math.max(0,Math.min(1,((w-P.x)*x+(I-P.y)*d)/v)),B=P.x+R*x-w,$=P.y+R*d-I;B*B+$*$<=c*c&&ot(u,(y*o+k)*4,h)}}}return{img:s,counts:i,tiles:f}}function It(e){let t=new Map;return e.colors.forEach((n,o)=>{let r=t.get(n)||{n:0,color:n,pieces:0,pixels:0};r.pieces++,r.pixels+=e.sizes[o],t.set(n,r)}),[...t.values()].sort((n,o)=>o.pixels-n.pixels).map((n,o)=>({...n,n:o+1}))}var ge=.01;function Rt(e){ge=e}var H=(e,t)=>Math.hypot(e.x-t.x,e.y-t.y),it=(e,t,n,o)=>e*o-t*n;function xe(e,t,n){let o=n.x-t.x,r=n.y-t.y,a=o*o+r*r,s=a?((e.x-t.x)*o+(e.y-t.y)*r)/a:0;return s=Math.max(0,Math.min(1,s)),{x:t.x+o*s,y:t.y+r*s,t:s}}function ye(e,t,n,o){let r=t.x-e.x,a=t.y-e.y,s=o.x-n.x,u=o.y-n.y,l=it(r,a,s,u);if(Math.abs(l)<1e-12)return null;let i=n.x-e.x,m=n.y-e.y,f=it(i,m,s,u)/l,c=it(i,m,r,a)/l;return f<0||f>1||c<0||c>1?null:{x:e.x+r*f,y:e.y+a*f,t:f,u:c}}function Bt(e,t){let n=!1;for(let o=0,r=t.length-1;o<t.length;r=o++){let a=t[o],s=t[r];a.y>e.y!=s.y>e.y&&e.x<(s.x-a.x)*(e.y-a.y)/(s.y-a.y)+a.x&&(n=!n)}return n}function $t(e,t,n,o,r){let a=[];for(let s=0;s<e;s++){let u=r+s*2*Math.PI/e;a.push({x:t+o*Math.cos(u),y:n+o*Math.sin(u)})}return a}function at(e,t,n,o){let r=[0,1];for(let i of n)for(let m=0,f=i.length;m<f;m++){let c=ye(e,t,i[m],i[(m+1)%f]);c&&r.push(c.t)}r.sort((i,m)=>i-m);let a=i=>({x:e.x+(t.x-e.x)*i,y:e.y+(t.y-e.y)*i}),s=[],u=null,l=0;for(let i=0;i+1<r.length;i++){let m=r[i],f=r[i+1];f-m<1e-9||(o(a((m+f)/2))?(u===null&&(u=m),l=f):u!==null&&(s.push({a:a(u),b:a(l)}),u=null))}return u!==null&&s.push({a:a(u),b:a(l)}),s}function lt(e,t){let n=1/0;for(let o of t)for(let r=0,a=o.length;r<a;r++)n=Math.min(n,H(e,xe(e,o[r],o[(r+1)%a])));return n}var Z=(e,t,n,o)=>[{x:e,y:t},{x:e+n,y:t},{x:e+n,y:t+o},{x:e,y:t+o}],ct=e=>(e%2+2)%2===1,z=(e,t,n)=>[Math.floor(e/n)-1,Math.ceil(t/n)+1];function Lt(e,t,n){let o=[];if(e==="square"){let[r,a]=z(n.x0,n.x1,t),[s,u]=z(n.y0,n.y1,t);for(let l=r;l<=a;l++)for(let i=s;i<=u;i++)o.push(Z(l*t,i*t,t,t))}else if(e==="brick"){let r=2*t,[a,s]=z(n.y0,n.y1,t);for(let u=a;u<=s;u++){let l=ct(u)?t:0,[i,m]=z(n.x0-l,n.x1-l,r);for(let f=i;f<=m;f++)o.push(Z(l+f*r,u*t,r,t))}}else if(e==="hex"){let r=Math.sqrt(3)*t,a=1.5*t,[s,u]=z(n.y0,n.y1,a);for(let l=s;l<=u;l++){let i=ct(l)?r/2:0,[m,f]=z(n.x0-i,n.x1-i,r);for(let c=m;c<=f;c++)o.push($t(6,i+c*r,l*a,t,-Math.PI/2))}}else if(e==="triangle"){let r=t*Math.sqrt(3)/2,[a,s]=z(n.y0,n.y1,r);for(let u=a;u<=s;u++){let l=u*r,i=ct(u)?t/2:0,[m,f]=z(n.x0-i,n.x1-i,t);for(let c=m;c<=f;c++){let h=i+c*t;o.push([{x:h,y:l+r},{x:h+t/2,y:l},{x:h+t,y:l+r}]),o.push([{x:h+t/2,y:l},{x:h+1.5*t,y:l},{x:h+t,y:l+r}])}}}else if(e==="herringbone"){let r=[[n.x0,n.y0],[n.x1,n.y0],[n.x0,n.y1],[n.x1,n.y1]].map(([f,c])=>[f/t,c/t]),a=r.map(([f,c])=>(f+c)/4),s=r.map(([f,c])=>(f-c)/2),u=Math.floor(Math.min(...a))-2,l=Math.ceil(Math.max(...a))+2,i=Math.floor(Math.min(...s))-2,m=Math.ceil(Math.max(...s))+2;for(let f=u;f<=l;f++)for(let c=i;c<=m;c++)o.push(Z((2*f+c)*t,(2*f-c)*t,t,2*t)),o.push(Z((2*f+1+c)*t,(2*f+1-c)*t,2*t,t))}return o}function Ft(e,t){let n=new Map;for(let r of e){let a=r.b.x-r.a.x,s=r.b.y-r.a.y,u=Math.hypot(a,s);if(u<t)continue;a/=u,s/=u,(a<-1e-9||Math.abs(a)<=1e-9&&s<0)&&(a=-a,s=-s);let l=-s*r.a.x+a*r.a.y,i=Math.round(Math.atan2(s,a)*1e6)+"|"+Math.round(l/(t*10)),m=a*r.a.x+s*r.a.y,f=a*r.b.x+s*r.b.y;(n.get(i)||n.set(i,{dx:a,dy:s,off:l,list:[]}).get(i)).list.push([Math.min(m,f),Math.max(m,f)])}let o=[];for(let r of n.values()){r.list.sort((l,i)=>l[0]-i[0]);let a=l=>({x:r.dx*l-r.dy*r.off,y:r.dy*l+r.dx*r.off}),[s,u]=r.list[0];for(let l=1;l<=r.list.length;l++){let i=r.list[l];if(i&&i[0]<=u+t){u=Math.max(u,i[1]);continue}o.push({a:a(s),b:a(u)}),i&&([s,u]=i)}}return o}function jt(e){let t=e>>>0||1;return()=>{t=t+1831565813|0;let n=Math.imul(t^t>>>15,1|t);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}var N=(e,t,n,o)=>[{x:e,y:t},{x:e+n,y:t},{x:e+n,y:t+o},{x:e,y:t+o}];function Me(e,t,n,o){let r=n?t*2:t,a=n?t/2:t,s=[],u=(l,i,m)=>{if(!(l>=e.x+e.w-1e-9||i>=e.y+e.h-1e-9))if(m>a*1.0001&&o(l,i,m,m)){let f=m/2;u(l,i,f),u(l+f,i,f),u(l,i+f,f),u(l+f,i+f,f)}else s.push({x:l,y:i,s:m})};for(let l=0;l*r<e.h;l++)for(let i=0;i*r<e.w;i++)u(e.x+i*r,e.y+l*r,r);return s}function we(e,t){let n=[];for(let o=0,r=e.length;o<r;o++){let a=e[o],s=e[(o+1)%r],u=t(a),l=t(s);if(u<=0&&n.push(a),u<0&&l>0||u>0&&l<0){let i=u/(u-l);n.push({x:a.x+(s.x-a.x)*i,y:a.y+(s.y-a.y)*i})}}return n}function Pe(e,t){let n=Math.sqrt(t.w*t.h/Math.max(1,e.length))||1,o=new Map,r=(s,u)=>s+","+u;e.forEach((s,u)=>{let l=r(Math.floor(s.x/n),Math.floor(s.y/n));(o.get(l)||o.set(l,[]).get(l)).push(u)});let a=Math.ceil(Math.max(t.w,t.h)/n)+1;return e.map((s,u)=>{let l=Math.floor(s.x/n),i=Math.floor(s.y/n),m=N(t.x,t.y,t.w,t.h),f=()=>Math.max(...m.map(c=>H(c,s)));for(let c=0;c<=a&&m.length>=3&&!((c-1)*n>2*f());c++){let h=[];for(let g=l-c;g<=l+c;g++)for(let M=i-c;M<=i+c;M++)if(Math.max(Math.abs(g-l),Math.abs(M-i))===c)for(let P of o.get(r(g,M))||[])P!==u&&h.push(P);h.sort((g,M)=>H(e[g],s)-H(e[M],s));for(let g of h){let M=e[g],P=M.x-s.x,p=M.y-s.y,x=(s.x+M.x)/2,d=(s.y+M.y)/2;if(m=we(m,v=>(v.x-x)*P+(v.y-d)*p),m.length<3)break}}return m}).filter(s=>s.length>=3)}function V({style:e,box:t,size:n,detail:o=0,busy:r=()=>!1,seed:a=1}){let s=o>0;if(e==="hex"){let l=n/Math.sqrt(3);return Lt("hex",l,{x0:-l,y0:-l,x1:t.w+l,y1:t.h+l}).map(i=>i.map(m=>({x:m.x+t.x,y:m.y+t.y})))}if(e==="brick"){let l=[];for(let i=0;i*n<t.h;i++){let m=i%2?-n:0;for(let f=t.x+m;f<t.x+t.w;f+=2*n){let c=t.y+i*n;s&&r(f,c,2*n,n)?l.push(N(f,c,n,n),N(f+n,c,n,n)):l.push(N(f,c,2*n,n))}}return l}let u=Me(t,n,s,r);if(e==="irregular"){let l=jt(a),i=u.map(m=>({x:m.x+m.s*(.5+(l()-.5)*.7),y:m.y+m.s*(.5+(l()-.5)*.7)})).filter(m=>m.x>=t.x&&m.y>=t.y&&m.x<=t.x+t.w&&m.y<=t.y+t.h);return Pe(i,t)}return u.map(l=>N(l.x,l.y,l.s,l.s))}function Ct(e,t,n,o){let r=o*10,a=i=>Math.round(i.x/r)+","+Math.round(i.y/r),s=new Set,u=[],l=i=>n(i)&&lt(i,t)>o*20;for(let i of e)for(let m=0;m<i.length;m++){let f=i[m],c=i[(m+1)%i.length],h=a(f),g=a(c),M=h<g?h+"|"+g:g+"|"+h;h===g||s.has(M)||(s.add(M),u.push(...at(f,c,t,l)))}return Ft(u,o)}function Tt(e,t,n=1,o=16){if(!e.length)return[];t=Math.min(t,e.length);let r=jt(n),a=(l,i)=>(l[0]-i[0])**2+(l[1]-i[1])**2+(l[2]-i[2])**2,s=[e[Math.floor(r()*e.length)]];for(;s.length<t;){let l=e.map(f=>Math.min(...s.map(c=>a(f,c)))),i=r()*l.reduce((f,c)=>f+c,0),m=0;for(;m<e.length-1&&(i-=l[m])>0;)m++;s.push(e[m])}let u=[];for(let l=0;l<o;l++){let i=s.map(()=>[0,0,0]);u=s.map(()=>0);for(let m of e){let f=0,c=1/0;s.forEach((h,g)=>{let M=a(m,h);M<c&&(c=M,f=g)}),i[f][0]+=m[0],i[f][1]+=m[1],i[f][2]+=m[2],u[f]++}s.forEach((m,f)=>{u[f]&&(s[f]=i[f].map(c=>c/u[f]))})}return s.map((l,i)=>({c:l,n:u[i]})).sort((l,i)=>i.n-l.n).map(l=>l.c)}var _=(e,t)=>t.baseLayers+(e+1)*t.layersPerColor;function Ae(e,t,n){let o=new Uint8Array(t*n),r=[];for(let a=0;a<n;a++)for(let s=0;s<t;s++){let u=a*t+s,l=e[u];if(l<0||o[u])continue;let i=1;for(;s+i<t&&e[u+i]===l&&!o[u+i];)i++;let m=1;t:for(;a+m<n;){let f=(a+m)*t+s;for(let c=0;c<i;c++)if(e[f+c]!==l||o[f+c])break t;m++}for(let f=a;f<a+m;f++)o.fill(1,f*t+s,f*t+s+i);r.push({x:s,y:a,w:i,h:m,level:l})}return r}function ve(e,t){let n=new Int16Array(e.length);for(let o=0;o<e.length;o++)n[o]=e[o]===-2?0:e[o]<0?t.baseLayers:_(e[o],t);return n}function Gt(e,t){let n=e.length,o=ve(e,t),r=new Int16Array(n);for(let a=0;a<n;a++)r[a]=Math.max(0,e[a]);return{bottom:new Int16Array(n),top:o,level:r}}function mt(e,t,n,o,r){let a=(b,y)=>b>=0&&y>=0&&b<t&&y<n,s=(b,y)=>a(b,y)?e.bottom[y*t+b]:0,u=(b,y)=>{if(!a(b,y))return 0;let k=y*t+b;return e.top[k]>e.bottom[k]?e.top[k]:e.bottom[k]},l=(b,y)=>u(b,y)>s(b,y),i=(b,y)=>a(b,y)?e.level[y*t+b]:0,m=[],f=b=>n-b,c=new Int16Array(t*n),h=b=>{let y=new Map,k=[];for(let w=0;w<n;w++)for(let I=0;I<t;I++){let R=w*t+I;if(!l(I,w)){c[R]=-1;continue}let B=b(I,w)*4096+i(I,w),$=y.get(B);$==null&&($=k.length,y.set(B,$),k.push(B)),c[R]=$}return{rs:Ae(c,t,n),vals:k}};{let{rs:b,vals:y}=h(u);for(let k of b){let w=y[k.level];m.push({o:[k.x,f(k.y+k.h),Math.floor(w/4096)],u:[k.w,0,0],v:[0,k.h,0],level:w%4096})}}{let{rs:b,vals:y}=h(s);for(let k of b){let w=y[k.level];m.push({o:[k.x,f(k.y+k.h),Math.floor(w/4096)],u:[0,k.h,0],v:[k.w,0,0],level:w%4096})}}let g=(b,y,k,w)=>{if(y<=b)return[];if(w<=k||w<=b||k>=y)return[[b,y]];let I=[];return k>b&&I.push([b,k]),w<y&&I.push([w,y]),I},M=(b,y)=>l(b,y)?[s(b,y),u(b,y)]:[0,0];for(let b=0;b<=n;b++)for(let y=0;y<t;){let[k,w]=M(y,b-1),[I,R]=M(y,b);if(k===I&&w===R){y++;continue}let B=y+1;for(;B<t;B++){let[L,F]=M(B,b-1),[j,T]=M(B,b);if(L!==k||F!==w||j!==I||T!==R)break}let $=f(b);for(let[L,F]of g(k,w,I,R))m.push({o:[y,$,L],u:[B-y,0,0],v:[0,0,F-L],level:i(y,b-1)});for(let[L,F]of g(I,R,k,w))m.push({o:[y,$,L],u:[0,0,F-L],v:[B-y,0,0],level:i(y,b)});y=B}for(let b=0;b<=t;b++)for(let y=n-1;y>=0;){let[k,w]=M(b-1,y),[I,R]=M(b,y);if(k===I&&w===R){y--;continue}let B=y-1;for(;B>=0;B--){let[F,j]=M(b-1,B),[T,O]=M(b,B);if(F!==k||j!==w||T!==I||O!==R)break}let $=f(y+1),L=y-B;for(let[F,j]of g(I,R,k,w))m.push({o:[b,$,F],u:[0,0,j-F],v:[0,L,0],level:i(b,y)});for(let[F,j]of g(k,w,I,R))m.push({o:[b,$,F],u:[0,L,0],v:[0,0,j-F],level:i(b-1,y)});y=B}let P=[new Map,new Map,new Map],p=(b,y,k)=>b.o.map((w,I)=>w+y*b.u[I]+k*b.v[I]),x=(b,y)=>y===0?b[1]*1e5+b[2]:y===1?b[0]*1e5+b[2]:b[0]*1e5+b[1];for(let b of m)for(let[y,k]of[[0,0],[1,0],[1,1],[0,1]]){let w=p(b,y,k);for(let I=0;I<3;I++){let R=x(w,I),B=P[I].get(R);B||P[I].set(R,B=[]),B.push(w[I])}}for(let b of P)for(let[y,k]of b)b.set(y,[...new Set(k)].sort((w,I)=>w-I));let d=[],v=[],U=[],A=new Map,S=b=>{let y=(b[0]*2e5+b[1]*2)*2e5+b[2]*2,k=A.get(y);return k==null&&(k=d.length/3,A.set(y,k),d.push(b[0]*o,b[1]*o,b[2]*r)),k};for(let b of m){let y=[p(b,0,0),p(b,1,0),p(b,1,1),p(b,0,1)],k=[];for(let I=0;I<4;I++){let R=y[I],B=y[(I+1)%4],$=R.findIndex((T,O)=>T!==B[O]);k.push(R);let L=Math.min(R[$],B[$]),F=Math.max(R[$],B[$]),j=(P[$].get(x(R,$))||[]).filter(T=>T>L&&T<F);R[$]>B[$]&&j.reverse();for(let T of j){let O=[...R];O[$]=T,k.push(O)}}let w=k.map(S);if(w.length===4)v.push(w[0],w[1],w[2],w[0],w[2],w[3]),U.push(b.level,b.level);else{let I=S(p(b,.5,.5));for(let R=0;R<w.length;R++)v.push(I,w[R],w[(R+1)%w.length]),U.push(b.level)}}return{vertices:d,triangles:v,levels:U}}function zt(e,t,n,o,r,a){let s=Int16Array.from(e),u=t*n,l=new Int32Array(u),i=new Float32Array(u),m=a.heightOf||(c=>c===-2?0:(c<0?r.baseLayers:_(c,r))*r.layerHeight),f=0;for(let c=0;c<12;c++){l.fill(-1);let h=[],g=[];for(let A=0;A<u;A++){if(l[A]>=0)continue;let S=h.length,b=s[A];for(h.push(b),l[A]=S,g.push(A);g.length;){let y=g.pop(),k=y%t;for(let w of[k>0?y-1:-1,k<t-1?y+1:-1,y-t,y+t])w<0||w>=u||l[w]>=0||s[w]!==b||(l[w]=S,g.push(w))}}let M=Math.SQRT2;for(let A=0;A<u;A++){let S=A%t,b=A/t|0,y=l[A],k=S===0||b===0||S===t-1||b===n-1||l[A-1]!==y||l[A+1]!==y||l[A-t]!==y||l[A+t]!==y;i[A]=k?1:1e9}for(let A=0;A<n;A++)for(let S=0;S<t;S++){let b=A*t+S;i[b]<=1||(i[b]=Math.min(i[b],i[b-1]+1,i[b-t]+1,i[b-t-1]+M,i[b-t+1]+M))}for(let A=n-1;A>=0;A--)for(let S=t-1;S>=0;S--){let b=A*t+S;i[b]<=1||(i[b]=Math.min(i[b],i[b+1]+1,i[b+t]+1,i[b+t+1]+M,i[b+t-1]+M))}let P=new Float32Array(h.length);for(let A=0;A<u;A++)i[A]>P[l[A]]&&(P[l[A]]=i[A]);let p=h.map(()=>new Map),x=new Float64Array(h.length).fill(1/0),d=(A,S)=>{let b=l[A],y=l[S];if(b===y)return;let k=s[A],w=s[S];x[b]=Math.min(x[b],m(w)),x[y]=Math.min(x[y],m(k)),w<k&&p[b].set(w,(p[b].get(w)||0)+1),k<w&&p[y].set(k,(p[y].get(k)||0)+1)};for(let A=0;A<n;A++)for(let S=0;S<t;S++){let b=A*t+S;S<t-1&&d(b,b+1),A<n-1&&d(b,b+t)}let v=new Int16Array(h.length).fill(-32768),U=0;if(h.forEach((A,S)=>{let b=m(A)-x[S];if(!(b>1e-9)||!p[S].size)return;let y=Math.max(1,2*P[S]-1)*o;if(y>=a.minWidth&&b<=a.maxRatio*y)return;let k=-2,w=-1;for(let[I,R]of p[S])(R>w||R===w&&I>k)&&(k=I,w=R);v[S]=k,U++}),!U)break;for(let A=0;A<u;A++){let S=v[l[A]];S!==-32768&&(s[A]=S)}f+=U}return{grid:s,lowered:f}}function ft(e,t="Mosaic Paint"){let n=e.vertices,o=e.triangles,r=o.length/3,a=new ArrayBuffer(84+r*50),s=new DataView(a),u=`${t} – multi-color by layer`.slice(0,80);for(let i=0;i<u.length;i++)s.setUint8(i,u.charCodeAt(i)&127);s.setUint32(80,r,!0);let l=84;for(let i=0;i<r;i++){let m=[0,1,2].map(U=>o[i*3+U]*3),f=n[m[1]]-n[m[0]],c=n[m[1]+1]-n[m[0]+1],h=n[m[1]+2]-n[m[0]+2],g=n[m[2]]-n[m[0]],M=n[m[2]+1]-n[m[0]+1],P=n[m[2]+2]-n[m[0]+2],p=c*P-h*M,x=h*g-f*P,d=f*M-c*g,v=Math.hypot(p,x,d)||1;p/=v,x/=v,d/=v;for(let U of[p,x,d])s.setFloat32(l,U,!0),l+=4;for(let U of m)for(let A=0;A<3;A++)s.setFloat32(l,n[U+A],!0),l+=4;s.setUint16(l,0,!0),l+=2}return a}function Dt(e,t){return e.map((n,o)=>{let r=o===0?1:_(o-1,t)+1,a=_(o,t);return{color:n,fromLayer:r,toLayer:a,changeAtLayer:o===0?null:r,z:o===0?null:+(r*t.layerHeight).toFixed(3)}})}var D=-3,ke=(e,t)=>Math.max(e.hole/2+t,e.frame/2);function Ot(e,t,n,o,r){let a=Math.max(0,Math.round(o.frame)),s=t+2*a,u=n+2*a,l=new Int16Array(s*u).fill(D);for(let c=0;c<n;c++)for(let h=0;h<t;h++)l[(c+a)*s+h+a]=e[c*t+h];let i=Math.min(o.corner,s/2,u/2),m=o.hole/2,f=ke(o,r);for(let c=0;c<u;c++)for(let h=0;h<s;h++){let g=h+.5,M=c+.5;if(i>0){let P=g<i?i:g>s-i?s-i:g,p=M<i?i:M>u-i?u-i:M;if((g-P)**2+(M-p)**2>i*i){l[c*s+h]=-2;continue}}m>0&&(g-s/2)**2+(M-f)**2<=m*m&&(l[c*s+h]=-2)}return{grid:l,w:s,h:u}}function _t(e,t,n,o){let r=new Uint8Array(e*t),a=n/2;if(a<=0)return r;let s=[o,e-o],u=[o,t-o];for(let l of s)for(let i of u)for(let m=Math.max(0,Math.floor(i-a));m<Math.min(t,Math.ceil(i+a));m++)for(let f=Math.max(0,Math.floor(l-a));f<Math.min(e,Math.ceil(l+a));f++)(f+.5-l)**2+(m+.5-i)**2<=a*a&&(r[m*e+f]=1);return r}function qt(e,t,n,o=2){let r=n;for(let a=0;a<t.length;a++){if(!t[a])continue;let s=0;for(let u of e)u.top[a]>u.bottom[a]&&(s=Math.max(s,u.top[a]));s>0&&(r=Math.min(r,s-o))}if(r=Math.max(0,r),!r)return 0;for(let a=0;a<t.length;a++)if(t[a])for(let s of e)s.top[a]>s.bottom[a]&&s.bottom[a]<r&&(s.bottom[a]=r,s.top[a]<r&&(s.top[a]=r));return r}function Ht(e,t,n,o){let r=e.length,a={bottom:new Int16Array(r).fill(t),top:new Int16Array(r),level:new Int16Array(r).fill(o)};for(let s=0;s<r;s++)e[s]===D&&(a.top[s]=n);return a}var C=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",\'"\':"&quot;"})[t]),E=e=>String(+e.toFixed(4)),ht=`<?xml version="1.0" encoding="UTF-8"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/><Default Extension="xml" ContentType="application/xml"/></Types>`,X=`<?xml version="1.0" encoding="UTF-8"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/></Relationships>`;function Se(e,t,n){let o=e.vertices,r=e.triangles,a=[];a.push(\'<?xml version="1.0" encoding="UTF-8"?>\',\'<model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">\',`<metadata name="Title">${C(n)}</metadata>`,\'<metadata name="Application">Mosaic Paint</metadata>\',"<resources>",\'<basematerials id="1">\');for(let s of t)a.push(`<base name="${C(s)}" displaycolor="${s.toUpperCase()}FF"/>`);a.push("</basematerials>",`<object id="2" type="model" pid="1" pindex="0" name="${C(n)}">`,"<mesh>","<vertices>");for(let s=0;s<o.length;s+=3)a.push(`<vertex x="${E(o[s])}" y="${E(o[s+1])}" z="${E(o[s+2])}"/>`);a.push("</vertices>","<triangles>");for(let s=0;s<r.length;s+=3)a.push(`<triangle v1="${r[s]}" v2="${r[s+1]}" v3="${r[s+2]}" pid="1" p1="${Math.max(0,e.levels[s/3])}"/>`);return a.push("</triangles>","</mesh>","</object>","</resources>","<build>",\'<item objectid="2"/>\',"</build>","</model>"),a.join(`\n`)}function Ie(e){return[\'<?xml version="1.0" encoding="utf-8"?>\',"<custom_gcodes_per_print_z>",...e.filter(t=>t.z!=null).map(t=>`<code print_z="${t.z}" type="0" extruder="1" color="${t.color}" extra="" gcode="M600"/>`),\'<mode value="SingleExtruder"/>\',"</custom_gcodes_per_print_z>"].join(`\n`)}function Nt(e,t,n){return[{name:"[Content_Types].xml",data:ht},{name:"_rels/.rels",data:X},{name:"3D/3dmodel.model",data:Se(e,t.map(o=>o.color),n)},{name:"Metadata/Prusa_Slicer_custom_gcode_per_print_z.xml",data:Ie(t)}]}function Jt(e,t){let n=(t.baseLayers+t.tileLayers)*t.layerHeight,o=(t.baseLayers+Math.max(1,t.tileLayers-t.groutRecess))*t.layerHeight;return r=>r===-2?0:r<0?t.baseLayers*t.layerHeight:e[r]?o:n}function Yt(e,t,n,o,r,a){let s=t*n,u=[];if(a.baseLayers>0){let l=new Int16Array(s);for(let i=0;i<s;i++)e[i]!==-2&&(l[i]=a.baseLayers);u.push({part:-1,solid:{bottom:new Int16Array(s),top:l,level:new Int16Array(s)}})}for(let l=0;l<o;l++){let i=new Int16Array(s).fill(a.baseLayers),m=new Int16Array(s),f=new Int16Array(s).fill(l),c=a.baseLayers+(r[l]?Math.max(1,a.tileLayers-a.groutRecess):a.tileLayers),h=!1;for(let g=0;g<s;g++)e[g]===l&&(m[g]=c,h=!0);h&&u.push({part:l,solid:{bottom:i,top:m,level:f}})}return u}function Zt(e,t,n="prusa"){return n==="bambu"?Ue(e,t):Re(e,t)}function Ue(e,t){let n=\'xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02" xmlns:BambuStudio="http://schemas.bambulab.com/package/2021" xmlns:p="http://schemas.microsoft.com/3dmanufacturing/production/2015/06" requiredextensions="p"\',o=(i,m)=>`${i.toString(16).padStart(8,"0")}-0000-4000-8000-${m.toString(16).padStart(12,"0")}`,r=[\'<?xml version="1.0" encoding="UTF-8"?>\',`<model unit="millimeter" xml:lang="en-US" ${n}>`,\'<metadata name="BambuStudio:3mfVersion">1</metadata>\',"<resources>"];e.forEach((i,m)=>{let f=i.mesh.vertices,c=i.mesh.triangles;r.push(`<object id="${m+1}" p:UUID="${o(1,m)}" type="model">`,"<mesh>","<vertices>");for(let h=0;h<f.length;h+=3)r.push(`<vertex x="${E(f[h])}" y="${E(f[h+1])}" z="${E(f[h+2])}"/>`);r.push("</vertices>","<triangles>");for(let h=0;h<c.length;h+=3)r.push(`<triangle v1="${c[h]}" v2="${c[h+1]}" v3="${c[h+2]}"/>`);r.push("</triangles>","</mesh>","</object>")}),r.push("</resources>","<build/>","</model>");let a=e.length+1,s="/3D/Objects/object_1.model",u=[\'<?xml version="1.0" encoding="UTF-8"?>\',`<model unit="millimeter" xml:lang="en-US" ${n}>`,\'<metadata name="Application">Mosaic Paint</metadata>\',\'<metadata name="BambuStudio:3mfVersion">1</metadata>\',`<metadata name="Title">${C(t)}</metadata>`,"<resources>",`<object id="${a}" p:UUID="${o(2,0)}" type="model">`,"<components>"];e.forEach((i,m)=>u.push(`<component p:path="${s}" objectid="${m+1}" p:UUID="${o(3,m)}" transform="1 0 0 0 1 0 0 0 1 0 0 0"/>`)),u.push("</components>","</object>","</resources>",`<build p:UUID="${o(4,0)}">`,`<item objectid="${a}" p:UUID="${o(5,0)}" printable="1"/>`,"</build>","</model>");let l=[\'<?xml version="1.0" encoding="UTF-8"?>\',"<config>",`<object id="${a}">`,`<metadata key="name" value="${C(t)}"/>`,\'<metadata key="extruder" value="1"/>\'];return e.forEach((i,m)=>l.push(`<part id="${m+1}" subtype="normal_part">`,`<metadata key="name" value="${C(i.name)}"/>`,`<metadata key="extruder" value="${i.filament||m+1}"/>`,"</part>")),l.push("</object>","</config>"),[{name:"[Content_Types].xml",data:ht},{name:"_rels/.rels",data:X},{name:"3D/3dmodel.model",data:u.join(`\n`)},{name:"3D/_rels/3dmodel.model.rels",data:X.replace("/3D/3dmodel.model",s)},{name:"3D/Objects/object_1.model",data:r.join(`\n`)},{name:"Metadata/model_settings.config",data:l.join(`\n`)}]}function Re(e,t){let n=[],o=[];n.push(\'<?xml version="1.0" encoding="UTF-8"?>\',\'<model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">\',`<metadata name="Title">${C(t)}</metadata>`,\'<metadata name="Application">Mosaic Paint</metadata>\',"<resources>",\'<basematerials id="2">\');for(let s of e)n.push(`<base name="${C(s.name)}" displaycolor="${s.color.toUpperCase()}FF"/>`);n.push("</basematerials>",`<object id="1" type="model" pid="2" pindex="0" name="${C(t)}">`,"<mesh>","<vertices>");for(let s of e){let u=s.mesh.vertices;for(let l=0;l<u.length;l+=3)n.push(`<vertex x="${E(u[l])}" y="${E(u[l+1])}" z="${E(u[l+2])}"/>`)}n.push("</vertices>","<triangles>"),o.push(\'<?xml version="1.0" encoding="UTF-8"?>\',"<config>",\'<object id="1" instances_count="1">\',`<metadata type="object" key="name" value="${C(t)}"/>`);let r=0,a=0;return e.forEach((s,u)=>{let l=s.mesh.triangles,i=l.length/3;for(let m=0;m<l.length;m+=3)n.push(`<triangle v1="${l[m]+r}" v2="${l[m+1]+r}" v3="${l[m+2]+r}" pid="2" p1="${u}"/>`);o.push(`<volume firstid="${a}" lastid="${a+i-1}">`,`<metadata type="volume" key="name" value="${C(s.name)}"/>`,\'<metadata type="volume" key="volume_type" value="ModelPart"/>\',`<metadata type="volume" key="extruder" value="${s.filament||u+1}"/>`,"</volume>"),r+=s.mesh.vertices.length/3,a+=i}),n.push("</triangles>","</mesh>","</object>","</resources>","<build>",\'<item objectid="1"/>\',"</build>","</model>"),o.push("</object>","</config>"),[{name:"[Content_Types].xml",data:ht},{name:"_rels/.rels",data:X},{name:"3D/3dmodel.model",data:n.join(`\n`)},{name:"Metadata/Slic3r_PE_model.config",data:o.join(`\n`)}]}function Vt(e){let t={vertices:[],triangles:[],levels:[]};for(let n of e){let o=t.vertices.length/3;for(let r of n.vertices)t.vertices.push(r);for(let r of n.triangles)t.triangles.push(r+o);for(let r of n.levels)t.levels.push(r)}return t}var K=null;function $e(e){if(!K){K=new Uint32Array(256);for(let n=0;n<256;n++){let o=n;for(let r=0;r<8;r++)o=o&1?3988292384^o>>>1:o>>>1;K[n]=o>>>0}}let t=4294967295;for(let n=0;n<e.length;n++)t=K[(t^e[n])&255]^t>>>8;return(t^4294967295)>>>0}async function Le(e){if(typeof CompressionStream>"u")return null;try{let t=new Blob([e]).stream().pipeThrough(new CompressionStream("deflate-raw"));return new Uint8Array(await new Response(t).arrayBuffer())}catch{return null}}async function Q(e,{compress:t=!0}={}){let n=new TextEncoder,o=[],r=[],a=0;for(let f of e){let c=n.encode(f.name),h=typeof f.data=="string"?n.encode(f.data):f.data,g=$e(h),M=t?await Le(h):null,P=!!M&&M.length<h.length,p=P?M:h,x=new Uint8Array(30+c.length),d=new DataView(x.buffer);d.setUint32(0,67324752,!0),d.setUint16(4,20,!0),d.setUint16(6,2048,!0),d.setUint16(8,P?8:0,!0),d.setUint16(10,0,!0),d.setUint16(12,33,!0),d.setUint32(14,g,!0),d.setUint32(18,p.length,!0),d.setUint32(22,h.length,!0),d.setUint16(26,c.length,!0),x.set(c,30);let v=new Uint8Array(46+c.length),U=new DataView(v.buffer);U.setUint32(0,33639248,!0),U.setUint16(4,20,!0),U.setUint16(6,20,!0),U.setUint16(8,2048,!0),U.setUint16(10,P?8:0,!0),U.setUint16(12,0,!0),U.setUint16(14,33,!0),U.setUint32(16,g,!0),U.setUint32(20,p.length,!0),U.setUint32(24,h.length,!0),U.setUint16(28,c.length,!0),U.setUint32(42,a,!0),v.set(c,46),o.push(x,p),r.push(v),a+=x.length+p.length}let s=r.reduce((f,c)=>f+c.length,0),u=new Uint8Array(22),l=new DataView(u.buffer);l.setUint32(0,101010256,!0),l.setUint16(8,e.length,!0),l.setUint16(10,e.length,!0),l.setUint32(12,s,!0),l.setUint32(16,a,!0);let i=new Uint8Array(a+s+22),m=0;for(let f of[...o,...r,u])i.set(f,m),m+=f.length;return i}var Xt=2,Fe=2,W=e=>({layerHeight:e.layerHeight,layersPerColor:e.layersPerColor,baseLayers:e.baseLayers}),Qt=e=>({layerHeight:e.layerHeight,baseLayers:e.baseLayers,tileLayers:e.tileLayers,groutRecess:Math.min(e.groutRecess,e.tileLayers-1)}),je=(e,t)=>Math.max(1,Math.round(e/t.layerHeight));function Wt(e,t,n,o,r,a,s,u,l){let i=r.filter(h=>a[h]>0),m={list:i,grid:new Int16Array(0),counts:[],lowered:0},f=Int16Array.from(e),c=0;for(let h=0;h<4;h++){l?.(h/4);let g=new Int16Array(s.length).fill(-1);i.forEach((d,v)=>{g[d]=v});let M=f.map(d=>d<0?-1:g[d]),P=u.mode==="flat"?Jt(i.map(d=>s[d]),Qt(u)):void 0,p=zt(M,t,n,o,W(u),{minWidth:u.minWidth,maxRatio:u.maxRatio,heightOf:P});c+=p.lowered;let x=i.map(()=>0);for(let d=0;d<p.grid.length;d++){let v=p.grid[d];v>=0&&x[v]++,f[d]=v<0?-1:i[v]}if(m={list:i,grid:p.grid,counts:x,lowered:c},x.every(d=>d>0))break;i=i.filter((d,v)=>x[v]>0)}return m}var Kt=(e,t)=>(t.mode==="flat"?t.baseLayers+t.tileLayers:_(Math.max(0,e-1),W(t)))+t.frameRaise;function te(e,t,n,o,r){let a=Ot(e,t,n,{frame:r.frame/o,corner:r.corner/o,hole:r.hole/o},Xt/o),s=(r.magnet/2+Xt+r.corner*.3)/o;return{...a,mask:r.magnet>0?_t(a.w,a.h,r.magnet/o,s):null}}function ee(e,t,n){let o=t.length,r;if(n.mode==="flat")r=Yt(e.grid,e.w,e.h,o,t,Qt(n)),n.frame>0&&r.splice(n.baseLayers?1:0,0,{part:D,solid:Ht(e.grid,n.baseLayers,Kt(o,n),0)});else{let a=Gt(e.grid,W(n)),s=Kt(o,n);for(let u=0;u<e.grid.length;u++)e.grid[u]===D&&(a.top[u]=s,a.level[u]=o-1);r=[{part:0,solid:a}]}return e.mask&&qt(r.map(a=>a.solid),e.mask,je(n.magnetDepth,n),Fe),r}function ne(e,t){let n=te(e.grid,e.w,e.h,e.cell,t);return Vt(ee(n,e.grout,t).map(o=>mt(o.solid,n.w,n.h,e.cell,t.layerHeight)))}async function re(e,t){let{shape:n,o}=e,r=te(n.grid,n.w,n.h,n.cell,o);t?.(.05);let a=ee(r,n.grout,o);t?.(.15);let s=a.map((i,m)=>{let f=mt(i.solid,r.w,r.h,n.cell,o.layerHeight);return t?.(.15+.7*(m+1)/a.length),f}),u=s.reduce((i,m)=>i+m.triangles.length/3,0),l=(i,m,f)=>({fileName:i,type:m,data:f,triangles:u,parts:s.length});if(o.mode==="flat"){let i=a.map((f,c)=>{let h=Math.max(0,f.part),g=e.colors[h];return{name:f.part===D?e.labels.frame:f.part<0?e.labels.base:`${f.part+1} ${g}`,color:g,mesh:s[c],filament:h+1}});if(e.kind==="3mf")return l(e.name+".3mf","model/3mf",await Q(Zt(i,e.name,e.slicer)));let m=a.map((f,c)=>({name:`${e.name}-${f.part===D?"frame":f.part<0?"base":`${f.part+1}-${e.colors[f.part].slice(1)}`}.stl`,data:new Uint8Array(ft(i[c].mesh,i[c].name))}));return l(e.name+"-stl.zip","application/zip",await Q(m))}return e.kind==="3mf"?l(e.name+".3mf","model/3mf",await Q(Nt(s[0],Dt(e.colors,W(o)),e.name))):l(e.name+".stl","model/stl",new Uint8Array(ft(s[0],e.name)))}function se(e,t,n,o,r){let a=(f,c)=>f<0||c<0||f>=t||c>=n?-1:e[c*t+f],s=t+1,u=(f,c)=>c*s+f,l=Array.from({length:o},()=>new Map),i=(f,c,h,g,M)=>{let P=l[f],p=u(c,h),x=P.get(p);x?x.push(u(g,M)):P.set(p,[u(g,M)])};for(let f=0;f<n;f++)for(let c=0;c<t;c++){r&&c===0&&f%64===0&&r(.5*f/n);let h=e[f*t+c];h<0||(a(c,f-1)!==h&&i(h,c+1,f,c,f),a(c-1,f)!==h&&i(h,c,f,c,f+1),a(c,f+1)!==h&&i(h,c,f+1,c+1,f+1),a(c+1,f)!==h&&i(h,c+1,f+1,c+1,f))}let m=[];for(let f=0;f<o;f++){r&&f%256===0&&r(.5+.5*f/o);let c=l[f],h=[];for(let[g]of c)for(;c.get(g)&&c.get(g).length;){let M=[g],P=g,p=oe(c,g,-1,s);for(;p!==g;){M.push(p);let x=oe(c,p,P,s);P=p,p=x}h.push(Te(M,s))}m.push(h)}return m}function oe(e,t,n,o){let r=e.get(t),a=0;if(r.length>1&&n>=0){let u=t%o-n%o,l=Math.floor(t/o)-Math.floor(n/o),i=m=>{let f=m%o-t%o,c=Math.floor(m/o)-Math.floor(t/o);return f===l&&c===-u?0:f===u&&c===l?1:2};for(let m=1;m<r.length;m++)i(r[m])<i(r[a])&&(a=m)}let s=r[a];return r.splice(a,1),r.length||e.delete(t),s}function Te(e,t){let n=e.map(a=>({x:a%t,y:Math.floor(a/t)})),o=n.length,r=[];for(let a=0;a<o;a++){let s=n[(a+o-1)%o],u=n[a],l=n[(a+1)%o];(u.x-s.x)*(l.y-u.y)-(u.y-s.y)*(l.x-u.x)!==0&&r.push(u)}return r}function bt(e){let t=0;for(let n=0,o=e.length;n<o;n++){let r=e[n],a=e[(n+1)%o];t+=r.x*a.y-a.x*r.y}return t/2}var tt=e=>String(Math.round(e*1e3)/1e3);function ie(e,t,n,o,r){let a=e.width,s=e.height,u=n/a,l=vt(e);r?.(.15);let i=new Int32Array(l.colors.length).fill(-1),m=[];l.colors.forEach((d,v)=>{d!==t&&(i[v]=m.length,m.push(d))});let f=l.labels.map(d=>d<0?-1:i[d]),c=se(f,a,s,m.length,r&&(d=>r(.15+.8*d))),h=[],g=d=>d.map(v=>`${tt(v.x*u)},${tt(v.y*u)}`).join(" ");c.forEach((d,v)=>{if(d.length===1)h.push(`<polygon points="${g(d[0])}" fill="${m[v]}" stroke="none"/>`);else{let A=[...d].sort((S,b)=>Math.abs(bt(b))-Math.abs(bt(S))).map(S=>"M"+g(S).replace(/ /g,"L")+"Z").join("");h.push(`<path d="${A}" fill="${m[v]}" fill-rule="evenodd" stroke="none"/>`)}});let M=tt(n),P=tt(s*u),p=[...new Set(It(l).map(d=>d.color))];return{svg:`<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${M} ${P}" width="${M}mm" height="${P}mm">\n<metadata id="mosaic-palette">${JSON.stringify({palette:p,paletteName:o,unit:"mm"})}</metadata>\n${t?`<rect id="mosaic-bg" x="0" y="0" width="${M}" height="${P}" fill="${t}"/>`:""}\n<g id="mosaic-fills"></g>\n<g id="mosaic-shapes">\n${h.join(`\n`)}\n</g>\n</svg>`,tiles:m.length}}function Ee({data:e,W:t,H:n,box:o}){return r=>{let a=Math.floor((r.x-o.x)/o.w*t),s=Math.floor((r.y-o.y)/o.h*n);if(a<0||s<0||a>=t||s>=n)return null;let u=(s*t+a)*4;return e[u+3]<20?null:[e[u],e[u+1],e[u+2]]}}function Ge(e,t,n,o,r){let a=[];for(let u=0;u<5;u++)for(let l=0;l<5;l++){let i=e({x:t+o*(u+.5)/5,y:n+r*(l+.5)/5});i&&a.push(G(i))}if(a.length<2)return 0;let s=[0,1,2].map(u=>a.reduce((l,i)=>l+i[u],0)/a.length);return a.reduce((u,l)=>u+Math.hypot(l[0]-s[0],l[1]-s[1],l[2]-s[2]),0)/a.length}function ze(e,t,n){let o=[];for(let r=0;r<70;r++)for(let a=0;a<70;a++){let s=e({x:t.x+t.w*(r+.5)/70,y:t.y+t.h*(a+.5)/70});s&&o.push(G(s))}return[...new Set(Tt(o,n,7).map(xt))]}function ae(e,t){Rt(e.eps);let n=Ee(e.photo),o=e.page,r=[{x:o.x,y:o.y},{x:o.x+o.w,y:o.y},{x:o.x+o.w,y:o.y+o.h},{x:o.x,y:o.y+o.h}],a=4+(1-e.detail/100)*26,s=(i,m,f,c)=>Ge(n,i,m,f,c)>a,u=V({style:e.style,box:o,size:e.size,detail:e.detail/100,busy:s,seed:e.seed});if(t?.(.5),u.length>e.maxTiles)return{tiles:u.length,lines:[],palette:[]};let l=Ct(u,[r],i=>Bt(i,r),e.eps);return t?.(.85),{tiles:u.length,lines:l,palette:e.suggest?ze(n,e.photo.box,e.suggest):[]}}var De=Object.fromEntries(["X","Y","Z","E"].map(e=>[e,new RegExp(`(?:^|\\\\s)${e}(-?[\\\\d.]+)`,"i")])),J=(e,t)=>{let n=De[t].exec(e);return n?+n[1]:null},Oe=/^;\\s*(?:TYPE|FEATURE)\\s*:\\s*(.*)$/i,_e=/wipe|prime|tower|skirt|brim|purge/i;function le(e,t){let n=0,o=0,r=!1,a=0,s=!1,u=!1,l=new Set,i=new Map,m=[],f=null;for(let c=0,h=0;c<e.length;h++){let g=e.indexOf(`\n`,c);g<0&&(g=e.length);let M=e.slice(c,g);c=g+1,t&&h%5e4===0&&t(c/e.length);let P=M.indexOf(";");if(P>=0){let x=Oe.exec(M.slice(P));x&&(u=_e.test(x[1])),M=M.slice(0,P)}if(M=M.trim(),!M)continue;let p=M.split(/\\s/,1)[0].toUpperCase();if(p==="G0"||p==="G1"){let x=J(M,"Z"),d=J(M,"E");if(x!=null&&(n=x),d!=null){let v=r?d>0:d>o;if(r||(o=d),v&&!u&&(J(M,"X")!=null||J(M,"Y")!=null)){let U=Math.round(n*1e3)/1e3;l.add(U);let A=i.get(a);A?(A.from=Math.min(A.from,U),A.to=Math.max(A.to,U)):i.set(a,{from:U,to:U}),f&&(m.push({...f,z:U}),f=null),s=!0}}}else if(p==="G92"){let x=J(M,"E");x!=null&&(o=x)}else if(p==="M82")r=!1;else if(p==="M83")r=!0;else if(p==="M600")f={kind:"M600"};else if(/^T\\d+$/.test(p)){let x=+p.slice(1);s&&x!==a&&(f={kind:"tool",tool:x}),a=x}}return{layers:l.size,top:l.size?Math.max(...l):0,changes:m,tools:[...i].map(([c,h])=>({tool:c,...h})).sort((c,h)=>c.tool-h.tool)}}function qe(e){let t=new Uint8ClampedArray(256),n=Math.min(e.black,e.white-1),o=Math.max(e.white,n+1),r=e.contrast/100,a=r>=0?1/Math.max(.01,1-r):1+r,s=e.brightness/100*255;for(let u=0;u<256;u++){let l=Math.min(1,Math.max(0,(u-n)/(o-n)));l=Math.pow(l,1/e.gamma)*255,l=(l-128)*a+128+s;let i=Math.min(1,Math.max(0,l/255)),m=27/4;l+=255*.25*m*(e.shadows/100*i*(1-i)*(1-i)+e.highlights/100*i*i*(1-i));let f=e.fade/100;f&&(l=255*f*.14+l*(1-f*.22)),t[u]=Math.round(l)}return t}function ue(e,t,n,o){let r=Float32Array.from(e),a=new Float32Array(r.length);o=Math.max(1,Math.round(o));for(let s=0;s<3;s++){for(let u=0;u<n;u++){let l=u*t,i=0;for(let m=-o;m<=o;m++)i+=r[l+Math.min(t-1,Math.max(0,m))];for(let m=0;m<t;m++)a[l+m]=i/(2*o+1),i+=r[l+Math.min(t-1,m+o+1)]-r[l+Math.max(0,m-o)]}for(let u=0;u<t;u++){let l=0;for(let i=-o;i<=o;i++)l+=a[Math.min(n-1,Math.max(0,i))*t+u];for(let i=0;i<n;i++)r[i*t+u]=l/(2*o+1),l+=a[Math.min(n-1,i+o+1)*t+u]-a[Math.max(0,i-o)*t+u]}}return r}function ce(e,t){let n=[new Float32Array(t),new Float32Array(t),new Float32Array(t)];for(let o=0;o<t;o++)n[0][o]=e[o*4],n[1][o]=e[o*4+1],n[2][o]=e[o*4+2];return n}function He(e,t,n,o){let r=t*n,a=ce(e,r),s=1+Math.round(o/40),u=6+o*.4,l=a.map(i=>ue(i,t,n,s));for(let i=0;i<r;i++){let m=Math.hypot(a[0][i]-l[0][i],a[1][i]-l[1][i],a[2][i]-l[2][i]),f=o/100*Math.exp(-(m*m)/(2*u*u));for(let c=0;c<3;c++)e[i*4+c]=a[c][i]+(l[c][i]-a[c][i])*f}}function Ne(e,t,n,o){let r=t*n,a=ce(e,r),s=o/100*1.5,u=a.map(l=>ue(l,t,n,1));for(let l=0;l<r;l++)for(let i=0;i<3;i++)e[l*4+i]=a[i][l]+(a[i][l]-u[i][l])*s}function me(e,t,n,o){let r=new Uint8ClampedArray(e);o.denoise>0&&He(r,t,n,o.denoise);let a=qe(o),s=1+o.saturation/100,u=o.vibrance/100,l=o.warmth/100*28,i=o.tint/100*22,m=o.vignette/100,f=t/2,c=n/2,h=Math.hypot(f,c)||1;for(let g=0,M=0;g<r.length;g+=4,M++){let P=a[r[g]],p=a[r[g+1]],x=a[r[g+2]];if(l&&(P+=l,x-=l),i&&(p-=i,P+=i/2,x+=i/2),s!==1){let d=.299*P+.587*p+.114*x;P=d+(P-d)*s,p=d+(p-d)*s,x=d+(x-d)*s}if(u){let d=Math.max(P,p,x),v=Math.min(P,p,x),U=d>0?(d-v)/d:0,A=1+u*(1-U),S=.299*P+.587*p+.114*x;P=S+(P-S)*A,p=S+(p-S)*A,x=S+(x-S)*A}if(m){let d=M%t,v=(M-d)/t,U=Math.hypot(d+.5-f,v+.5-c)/h,A=Math.max(0,(U-.35)/.65),S=A*A*(3-2*A),b=m>0?1-.65*m*S:1,y=m<0?-m*S*.65:0;P=P*b+(255-P)*y,p=p*b+(255-p)*y,x=x*b+(255-x)*y}r[g]=P,r[g+1]=p,r[g+2]=x}return o.sharpen>0&&Ne(r,t,n,o.sharpen),r}function Je(e){let t=Math.max(1,Math.floor(e.w/2)),n=Math.max(1,Math.floor(e.h/2)),o=new Float32Array(t*n*3),r=new Uint8Array(t*n);for(let a=0;a<n;a++)for(let s=0;s<t;s++){let u=0,l=0,i=0,m=0,f=0;for(let h=0;h<2;h++)for(let g=0;g<2;g++){let M=Math.min(e.w-1,2*s+g),P=Math.min(e.h-1,2*a+h),p=P*e.w+M;if(e.hole[p]){f++;continue}l+=e.px[p*3],i+=e.px[p*3+1],m+=e.px[p*3+2],u++}let c=a*t+s;f&&(r[c]=1),u&&(o[c*3]=l/u,o[c*3+1]=i/u,o[c*3+2]=m/u)}return{w:t,h:n,px:o,hole:r}}function Ye(e){let{w:t,h:n,px:o}=e,r=new Uint8Array(t*n);for(let s=0;s<t*n;s++)r[s]=e.hole[s]?0:1;let a=t*n-r.reduce((s,u)=>s+u,0);for(;a>0;){let s=[];for(let u=0;u<t*n;u++){if(r[u])continue;let l=u%t,i=(u-l)/t,m=0,f=0,c=0,h=0;for(let g=-1;g<=1;g++)for(let M=-1;M<=1;M++){let P=l+M,p=i+g;if(P<0||p<0||P>=t||p>=n)continue;let x=p*t+P;r[x]&&(f+=o[x*3],c+=o[x*3+1],h+=o[x*3+2],m++)}m&&(o[u*3]=f/m,o[u*3+1]=c/m,o[u*3+2]=h/m,s.push(u))}if(!s.length)break;for(let u of s)r[u]=1;a-=s.length}}function Ze(e){let t=e>>>0||1;return()=>(t=t*1664525+1013904223>>>0)/4294967296}function Ve(e,t,n,o){let{w:r,h:a,px:s,hole:u}=e,l=[],i=new Uint8Array(r*a),m=new Int32Array((r+1)*(a+1));for(let p=0;p<a;p++)for(let x=0;x<r;x++)m[(p+1)*(r+1)+x+1]=u[p*r+x]+m[p*(r+1)+x+1]+m[(p+1)*(r+1)+x]-m[p*(r+1)+x];let f=(p,x,d,v)=>m[(v+1)*(r+1)+d+1]-m[x*(r+1)+d+1]-m[(v+1)*(r+1)+p]+m[x*(r+1)+p];for(let p=3;p<a-3;p++)for(let x=3;x<r-3;x++)f(x-3,p-3,x+3,p+3)||(i[p*r+x]=1,l.push(p*r+x));let c=[];for(let p=0;p<a;p++)for(let x=0;x<r;x++)f(Math.max(0,x-3),Math.max(0,p-3),Math.min(r-1,x+3),Math.min(a-1,p+3))&&c.push(p*r+x);let h=t||new Int32Array(r*a).fill(-1);if(!l.length)return h;let g=new Float32Array(r*a).fill(1/0),M=(p,x,d)=>{let v=p%r,U=(p-v)/r,A=x%r,S=(x-A)/r,b=0,y=0;for(let k=-3;k<=3;k++){let w=U+k;if(!(w<0||w>=a)){for(let I=-3;I<=3;I++){let R=v+I;if(R<0||R>=r)continue;let B=(w*r+R)*3,$=((S+k)*r+A+I)*3,L=s[B]-s[$],F=s[B+1]-s[$+1],j=s[B+2]-s[$+2];b+=L*L+F*F+j*j,y++}if(b>d*y)return 1/0}}return y?b/y:1/0},P=(p,x)=>{if(x<0||!i[x])return;let d=M(p,x,g[p]);d<g[p]&&(g[p]=d,h[p]=x)};for(let p of c)(h[p]<0||!i[h[p]])&&(h[p]=l[Math.floor(o()*l.length)]),g[p]=M(p,h[p],1/0);for(let p=0;p<n;p++){let x=p%2?-1:1;for(let v=0;v<c.length;v++){let U=c[x>0?v:c.length-1-v],A=U%r,S=x;if(A-S>=0&&A-S<r){let w=h[U-S];w>=0&&P(U,w+S)}if(U-S*r>=0&&U-S*r<r*a){let w=h[U-S*r];w>=0&&P(U,w+S*r)}let b=Math.max(r,a),y=h[U]%r,k=(h[U]-y)/r;for(;b>=1;){let w=Math.round(y+(o()*2-1)*b),I=Math.round(k+(o()*2-1)*b);w>=0&&I>=0&&w<r&&I<a&&P(U,I*r+w),b/=2}}let d=new Float32Array(r*a*4);for(let v of c){let U=h[v];if(U<0)continue;let A=v%r,S=(v-A)/r,b=U%r,y=(U-b)/r,k=Math.exp(-g[v]/2e3);for(let w=-3;w<=3;w++)for(let I=-3;I<=3;I++){let R=A+I,B=S+w;if(R<0||B<0||R>=r||B>=a||!u[B*r+R])continue;let $=(B*r+R)*4,L=((y+w)*r+b+I)*3;d[$]+=s[L]*k,d[$+1]+=s[L+1]*k,d[$+2]+=s[L+2]*k,d[$+3]+=k}}for(let v=0;v<r*a;v++)!u[v]||!d[v*4+3]||(s[v*3]=d[v*4]/d[v*4+3],s[v*3+1]=d[v*4+1]/d[v*4+3],s[v*3+2]=d[v*4+2]/d[v*4+3]);for(let v of c)g[v]=M(v,h[v],1/0)}return h}function fe(e,t,n=()=>{}){let{width:o,height:r,data:a}=e,s=new Float32Array(o*r*3),u=new Uint8Array(o*r);for(let c=0;c<o*r;c++)u[c]=t[c]>127?1:0,s[c*3]=a[c*4],s[c*3+1]=a[c*4+1],s[c*3+2]=a[c*4+2];let l=[{w:o,h:r,px:s,hole:u}];for(;l[l.length-1].w>48&&l[l.length-1].h>48;)l.push(Je(l[l.length-1]));let i=Ze(12345),m=null;for(let c=l.length-1;c>=0;c--){let h=l[c];if(c===l.length-1)Ye(h);else{let M=l[c+1],P=new Int32Array(h.w*h.h).fill(-1);for(let p=0;p<h.h;p++)for(let x=0;x<h.w;x++){let d=p*h.w+x,v=Math.min(M.w-1,x>>1),U=Math.min(M.h-1,p>>1),A=U*M.w+v;h.hole[d]&&(h.px[d*3]=M.px[A*3],h.px[d*3+1]=M.px[A*3+1],h.px[d*3+2]=M.px[A*3+2]);let S=m?m[A]:-1;if(S>=0){let b=S%M.w,y=(S-b)/M.w;P[d]=Math.min(h.h-1,2*y+(p&1))*h.w+Math.min(h.w-1,2*b+(x&1))}}m=P}m=Ve(h,m,c===0?3:c===1?4:6,i),n(1-c/l.length)}let f=new Uint8ClampedArray(a);for(let c=0;c<o*r;c++)u[c]&&(f[c*4]=s[c*3],f[c*4+1]=s[c*3+1],f[c*4+2]=s[c*3+2],f[c*4+3]=255);return f}function Xe(e,t){let n=e.img,o=e.detail>0&&["square","brick","irregular"].includes(e.shape);if(e.shape==="offset"||e.shape==="square"&&!o)return At(n,{tile:e.tile,grout:e.grout,groutColor:e.groutColor,palette:e.palette,bricks:e.shape==="offset"});let r=4+(1-e.detail/100)*26,a=(l,i,m,f)=>kt(n,l,i,m,f)>r,s=e.shape==="brick"?e.tile/2:e.tile,u=V({style:e.shape,box:{x:0,y:0,w:n.width,h:n.height},size:s,detail:e.detail/100,busy:a,seed:7});return t(.5),St(n,u,{grout:e.grout,groutColor:e.groutColor,palette:e.palette})}var he={mosaic:(e,t)=>Xe(e,t),vectorize:(e,t)=>ie(e.img,e.grout,e.widthMm,e.name,t),towers:(e,t)=>Wt(e.colorGrid,e.w,e.h,e.cell,e.order,e.counts,e.isLine,e.o,t),photoMosaic:(e,t)=>ae(e,t),gcode:(e,t)=>le(e.text,t),view3d:e=>ne(e.shape,e.o),export3d:(e,t)=>re(e,t),inpaint:(e,t)=>({width:e.img.width,height:e.img.height,data:fe(e.img,e.mask,t)}),adjust:e=>({width:e.img.width,height:e.img.height,data:me(e.img.data,e.img.width,e.img.height,e.adjust)})};function pt(e,t=0,n=new Set){if(ArrayBuffer.isView(e))e.buffer instanceof ArrayBuffer&&n.add(e.buffer);else if(e&&typeof e=="object"&&t<2)for(let o of Object.values(e))pt(o,t+1,n);return[...n]}var gt=(e,t=[])=>self.postMessage(e,t);self.onmessage=async e=>{let{id:t,job:n,args:o}=e.data,r=0,a=s=>{let u=Date.now();u-r>100&&(r=u,gt({id:t,progress:s}))};try{let s=await he[n](o,a);gt({id:t,result:s},pt(s))}catch(s){gt({id:t,error:String(s?.message||s)})}};})();\n';

  // src/lib/raster.ts
  var makeImg = (width, height) => ({ width, height, data: new Uint8ClampedArray(width * height * 4) });
  function rgbOf(c) {
    const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(c);
    return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : toRgb(c);
  }
  function rgba(c, alpha = 255) {
    const rgb = c ? rgbOf(c) : null;
    return rgb ? [rgb[0], rgb[1], rgb[2], alpha] : [0, 0, 0, 0];
  }
  var h2 = (v) => v.toString(16).padStart(2, "0");
  var hex = (r, g, b) => "#" + h2(r) + h2(g) + h2(b);
  function setPx(d, i, c) {
    d[i] = c[0];
    d[i + 1] = c[1];
    d[i + 2] = c[2];
    d[i + 3] = c[3];
  }
  function nearestCache(palette) {
    const labs = palette.map((c) => toLab(rgbOf(c)));
    const cache2 = /* @__PURE__ */ new Map();
    return (r, g, b) => {
      const k = r << 16 | g << 8 | b;
      let c = cache2.get(k);
      if (!c) {
        c = nearest([r, g, b], palette, labs);
        cache2.set(k, c);
      }
      return c;
    };
  }
  function mosaic(src, o) {
    const { width: W, height: H } = src, s = src.data, out = makeImg(W, H), d = out.data;
    const T = Math.max(2, Math.round(o.tile)), G = Math.min(T - 1, Math.max(0, Math.round(o.grout)));
    const near = o.palette && o.palette.length ? nearestCache(o.palette) : null;
    const grout = rgba(o.groutColor);
    const counts = /* @__PURE__ */ new Map();
    let tiles = 0;
    for (let ty = 0, row = 0; ty < H; ty += T, row++) {
      const shift = o.bricks && row % 2 ? -Math.floor(T / 2) : 0;
      for (let tx = shift; tx < W; tx += T) {
        const x0 = Math.max(0, tx), x1 = Math.min(W, tx + T), y1 = Math.min(H, ty + T);
        let r = 0, g = 0, b = 0, n4 = 0, all = 0;
        for (let y = ty; y < y1 - (y1 === ty + T ? G : 0); y++) for (let x = x0; x < Math.min(x1, tx + T - G); x++) {
          const i = (y * W + x) * 4;
          all++;
          if (s[i + 3] < 128) continue;
          r += s[i];
          g += s[i + 1];
          b += s[i + 2];
          n4++;
        }
        const filled = n4 > 0 && n4 >= all / 2;
        let c = [0, 0, 0, 0];
        if (filled) {
          r = Math.round(r / n4);
          g = Math.round(g / n4);
          b = Math.round(b / n4);
          const name = near ? near(r, g, b) : hex(r, g, b);
          c = rgba(name);
          counts.set(name, (counts.get(name) || 0) + 1);
          tiles++;
        }
        for (let y = ty; y < y1; y++) for (let x = x0; x < x1; x++) {
          const inGrout = x >= tx + T - G || y >= ty + T - G;
          setPx(d, (y * W + x) * 4, inGrout ? filled ? grout : [0, 0, 0, 0] : c);
        }
      }
    }
    return { img: out, counts, tiles };
  }
  function classify(img, colors) {
    const near = nearestCache(colors), index = new Map(colors.map((c, i) => [c, i]));
    const n4 = img.width * img.height, grid = new Int16Array(n4), counts = colors.map(() => 0), d = img.data;
    for (let p = 0, i = 0; p < n4; p++, i += 4) {
      if (d[i + 3] < 128) {
        grid[p] = -1;
        continue;
      }
      const k = index.get(near(d[i], d[i + 1], d[i + 2]));
      grid[p] = k;
      counts[k]++;
    }
    return { grid, counts };
  }
  function pieces(img) {
    const { width: W, height: H, data: d } = img, n4 = W * H;
    const labels = new Int32Array(n4).fill(-1), colors = [], sizes = [];
    const key = (p) => d[p * 4 + 3] < 128 ? -1 : d[p * 4] << 16 | d[p * 4 + 1] << 8 | d[p * 4 + 2];
    const stack = [];
    for (let p = 0; p < n4; p++) {
      if (labels[p] >= 0) continue;
      const k = key(p);
      if (k < 0) continue;
      const id = colors.length;
      let size = 0;
      labels[p] = id;
      stack.push(p);
      while (stack.length) {
        const q = stack.pop(), x = q % W;
        size++;
        for (const r of [x > 0 ? q - 1 : -1, x < W - 1 ? q + 1 : -1, q - W, q + W]) {
          if (r < 0 || r >= n4 || labels[r] >= 0 || key(r) !== k) continue;
          labels[r] = id;
          stack.push(r);
        }
      }
      colors.push(hex(k >> 16, k >> 8 & 255, k & 255));
      sizes.push(size);
    }
    return { labels, colors, sizes };
  }
  function detailAt2(img, x, y, w, h) {
    const labs = [], d = img.data;
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
      const px2 = Math.floor(x + w * (i + 0.5) / 5), py = Math.floor(y + h * (j + 0.5) / 5);
      if (px2 < 0 || py < 0 || px2 >= img.width || py >= img.height) continue;
      const k = (py * img.width + px2) * 4;
      if (d[k + 3] >= 128) labs.push(toLab([d[k], d[k + 1], d[k + 2]]));
    }
    if (labs.length < 2) return 0;
    const m = [0, 1, 2].map((c) => labs.reduce((s, l) => s + l[c], 0) / labs.length);
    return labs.reduce((s, l) => s + Math.hypot(l[0] - m[0], l[1] - m[1], l[2] - m[2]), 0) / labs.length;
  }
  function polygonPixels(W, H, pts, fn) {
    const n4 = pts.length, ys = pts.map((p) => p.y);
    const top = Math.max(0, Math.floor(Math.min(...ys))), bottom = Math.min(H - 1, Math.ceil(Math.max(...ys)));
    for (let y = top; y <= bottom; y++) {
      const cy = y + 0.5, xs = [];
      for (let i = 0; i < n4; i++) {
        const a = pts[i], c = pts[(i + 1) % n4];
        if (a.y <= cy !== c.y <= cy) xs.push(a.x + (cy - a.y) * (c.x - a.x) / (c.y - a.y));
      }
      xs.sort((p, q) => p - q);
      for (let k = 0; k + 1 < xs.length; k += 2) {
        const x0 = Math.max(0, Math.ceil(xs[k] - 0.5)), x1 = Math.min(W - 1, Math.floor(xs[k + 1] - 0.5));
        for (let x = x0; x <= x1; x++) fn(y * W + x);
      }
    }
  }
  function mosaicCells(src, cells3, o) {
    const { width: W, height: H } = src, s = src.data, out = makeImg(W, H), d = out.data;
    const near = o.palette && o.palette.length ? nearestCache(o.palette) : null;
    const counts = /* @__PURE__ */ new Map(), filled = [];
    let tiles = 0;
    for (const poly of cells3) {
      let r = 0, g = 0, b = 0, n4 = 0, all = 0;
      const px2 = [];
      polygonPixels(W, H, poly, (i) => {
        px2.push(i);
        all++;
        const k = i * 4;
        if (s[k + 3] < 128) return;
        r += s[k];
        g += s[k + 1];
        b += s[k + 2];
        n4++;
      });
      if (!n4 || n4 < all / 2) continue;
      r = Math.round(r / n4);
      g = Math.round(g / n4);
      b = Math.round(b / n4);
      const name = near ? near(r, g, b) : hex(r, g, b), c = rgba(name);
      for (const i of px2) setPx(d, i * 4, c);
      counts.set(name, (counts.get(name) || 0) + 1);
      tiles++;
      filled.push(poly);
    }
    const half = Math.max(0, o.grout) / 2;
    if (half > 0) {
      const gc = rgba(o.groutColor);
      for (const poly of filled) for (let e = 0; e < poly.length; e++) {
        const a = poly[e], b = poly[(e + 1) % poly.length], dx = b.x - a.x, dy = b.y - a.y, L2 = dx * dx + dy * dy || 1;
        const x0 = Math.max(0, Math.floor(Math.min(a.x, b.x) - half)), x1 = Math.min(W - 1, Math.ceil(Math.max(a.x, b.x) + half));
        const y0 = Math.max(0, Math.floor(Math.min(a.y, b.y) - half)), y1 = Math.min(H - 1, Math.ceil(Math.max(a.y, b.y) + half));
        for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
          const cx = x + 0.5, cy = y + 0.5, t2 = Math.max(0, Math.min(1, ((cx - a.x) * dx + (cy - a.y) * dy) / L2));
          const ex = a.x + t2 * dx - cx, ey = a.y + t2 * dy - cy;
          if (ex * ex + ey * ey <= half * half) setPx(d, (y * W + x) * 4, gc);
        }
      }
    }
    return { img: out, counts, tiles };
  }
  function colorRows(p) {
    const m = /* @__PURE__ */ new Map();
    p.colors.forEach((c, i) => {
      const r = m.get(c) || { n: 0, color: c, pieces: 0, pixels: 0 };
      r.pieces++;
      r.pixels += p.sizes[i];
      m.set(c, r);
    });
    return [...m.values()].sort((a, b) => b.pixels - a.pixels).map((r, i) => ({ ...r, n: i + 1 }));
  }

  // src/lib/model3d.ts
  var topLayer = (i, s) => s.baseLayers + (i + 1) * s.layersPerColor;
  function greedyRects(grid, w, h) {
    const done = new Uint8Array(w * h), out = [];
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = y * w + x, lv = grid[i];
      if (lv < 0 || done[i]) continue;
      let rw = 1;
      while (x + rw < w && grid[i + rw] === lv && !done[i + rw]) rw++;
      let rh = 1;
      grow: while (y + rh < h) {
        const row = (y + rh) * w + x;
        for (let k = 0; k < rw; k++) if (grid[row + k] !== lv || done[row + k]) break grow;
        rh++;
      }
      for (let yy = y; yy < y + rh; yy++) done.fill(1, yy * w + x, yy * w + x + rw);
      out.push({ x, y, w: rw, h: rh, level: lv });
    }
    return out;
  }
  function cellHeights(grid, s) {
    const out = new Int16Array(grid.length);
    for (let i = 0; i < grid.length; i++) out[i] = grid[i] === -2 ? 0 : grid[i] < 0 ? s.baseLayers : topLayer(grid[i], s);
    return out;
  }
  function heightSolid(grid, s) {
    const n4 = grid.length, top = cellHeights(grid, s), level = new Int16Array(n4);
    for (let i = 0; i < n4; i++) level[i] = Math.max(0, grid[i]);
    return { bottom: new Int16Array(n4), top, level };
  }
  function solidMesh(sol, w, h, cell, layerHeight) {
    const inside = (x, y) => x >= 0 && y >= 0 && x < w && y < h;
    const bot = (x, y) => inside(x, y) ? sol.bottom[y * w + x] : 0;
    const topOf = (x, y) => {
      if (!inside(x, y)) return 0;
      const i = y * w + x;
      return sol.top[i] > sol.bottom[i] ? sol.top[i] : sol.bottom[i];
    };
    const filled = (x, y) => topOf(x, y) > bot(x, y);
    const level = (x, y) => inside(x, y) ? sol.level[y * w + x] : 0;
    const faces = [];
    const Y = (y) => h - y;
    const lv = new Int16Array(w * h);
    const rects = (heightAt) => {
      const ids = /* @__PURE__ */ new Map(), vals = [];
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const i = y * w + x;
        if (!filled(x, y)) {
          lv[i] = -1;
          continue;
        }
        const k = heightAt(x, y) * 4096 + level(x, y);
        let id = ids.get(k);
        if (id == null) {
          id = vals.length;
          ids.set(k, id);
          vals.push(k);
        }
        lv[i] = id;
      }
      return { rs: greedyRects(lv, w, h), vals };
    };
    {
      const { rs, vals } = rects(topOf);
      for (const r of rs) {
        const k = vals[r.level];
        faces.push({ o: [r.x, Y(r.y + r.h), Math.floor(k / 4096)], u: [r.w, 0, 0], v: [0, r.h, 0], level: k % 4096 });
      }
    }
    {
      const { rs, vals } = rects(bot);
      for (const r of rs) {
        const k = vals[r.level];
        faces.push({ o: [r.x, Y(r.y + r.h), Math.floor(k / 4096)], u: [0, r.h, 0], v: [r.w, 0, 0], level: k % 4096 });
      }
    }
    const diff = (a0, a1, b0, b1) => {
      if (a1 <= a0) return [];
      if (b1 <= b0 || b1 <= a0 || b0 >= a1) return [[a0, a1]];
      const out = [];
      if (b0 > a0) out.push([a0, b0]);
      if (b1 < a1) out.push([b1, a1]);
      return out;
    };
    const col = (x, y) => filled(x, y) ? [bot(x, y), topOf(x, y)] : [0, 0];
    for (let y = 0; y <= h; y++) {
      for (let x = 0; x < w; ) {
        const [n0, n1] = col(x, y - 1), [s0, s1] = col(x, y);
        if (n0 === s0 && n1 === s1) {
          x++;
          continue;
        }
        let x1 = x + 1;
        for (; x1 < w; x1++) {
          const [a0, a1] = col(x1, y - 1), [b0, b1] = col(x1, y);
          if (a0 !== n0 || a1 !== n1 || b0 !== s0 || b1 !== s1) break;
        }
        const Y0 = Y(y);
        for (const [z0, z1] of diff(n0, n1, s0, s1)) faces.push({ o: [x, Y0, z0], u: [x1 - x, 0, 0], v: [0, 0, z1 - z0], level: level(x, y - 1) });
        for (const [z0, z1] of diff(s0, s1, n0, n1)) faces.push({ o: [x, Y0, z0], u: [0, 0, z1 - z0], v: [x1 - x, 0, 0], level: level(x, y) });
        x = x1;
      }
    }
    for (let x = 0; x <= w; x++) {
      for (let y = h - 1; y >= 0; ) {
        const [w0, w1] = col(x - 1, y), [e0, e1] = col(x, y);
        if (w0 === e0 && w1 === e1) {
          y--;
          continue;
        }
        let y1 = y - 1;
        for (; y1 >= 0; y1--) {
          const [a0, a1] = col(x - 1, y1), [b0, b1] = col(x, y1);
          if (a0 !== w0 || a1 !== w1 || b0 !== e0 || b1 !== e1) break;
        }
        const Y0 = Y(y + 1), dy = y - y1;
        for (const [z0, z1] of diff(e0, e1, w0, w1)) faces.push({ o: [x, Y0, z0], u: [0, 0, z1 - z0], v: [0, dy, 0], level: level(x, y) });
        for (const [z0, z1] of diff(w0, w1, e0, e1)) faces.push({ o: [x, Y0, z0], u: [0, dy, 0], v: [0, 0, z1 - z0], level: level(x - 1, y) });
        y = y1;
      }
    }
    const along2 = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
    const corner2 = (f, a, b) => f.o.map((c, k) => c + a * f.u[k] + b * f.v[k]);
    const lineKey = (p, axis) => axis === 0 ? p[1] * 1e5 + p[2] : axis === 1 ? p[0] * 1e5 + p[2] : p[0] * 1e5 + p[1];
    for (const f of faces) for (const [a, b] of [[0, 0], [1, 0], [1, 1], [0, 1]]) {
      const p = corner2(f, a, b);
      for (let axis = 0; axis < 3; axis++) {
        const k = lineKey(p, axis);
        let list = along2[axis].get(k);
        if (!list) along2[axis].set(k, list = []);
        list.push(p[axis]);
      }
    }
    for (const m of along2) for (const [k, list] of m) m.set(k, [...new Set(list)].sort((a, b) => a - b));
    const vertices = [], triangles = [], levels = [], index = /* @__PURE__ */ new Map();
    const vertex = (p) => {
      const k = (p[0] * 2e5 + p[1] * 2) * 2e5 + p[2] * 2;
      let i = index.get(k);
      if (i == null) {
        i = vertices.length / 3;
        index.set(k, i);
        vertices.push(p[0] * cell, p[1] * cell, p[2] * layerHeight);
      }
      return i;
    };
    for (const f of faces) {
      const c = [corner2(f, 0, 0), corner2(f, 1, 0), corner2(f, 1, 1), corner2(f, 0, 1)];
      const ring = [];
      for (let e = 0; e < 4; e++) {
        const a = c[e], b = c[(e + 1) % 4], axis = a.findIndex((v, k) => v !== b[k]);
        ring.push(a);
        const lo = Math.min(a[axis], b[axis]), hi = Math.max(a[axis], b[axis]);
        const mid = (along2[axis].get(lineKey(a, axis)) || []).filter((v) => v > lo && v < hi);
        if (a[axis] > b[axis]) mid.reverse();
        for (const v of mid) {
          const p = [...a];
          p[axis] = v;
          ring.push(p);
        }
      }
      const ids = ring.map(vertex);
      if (ids.length === 4) {
        triangles.push(ids[0], ids[1], ids[2], ids[0], ids[2], ids[3]);
        levels.push(f.level, f.level);
      } else {
        const m = vertex(corner2(f, 0.5, 0.5));
        for (let i = 0; i < ids.length; i++) {
          triangles.push(m, ids[i], ids[(i + 1) % ids.length]);
          levels.push(f.level);
        }
      }
    }
    return { vertices, triangles, levels };
  }
  function removeTowers(input, w, h, cell, s, o) {
    const grid = Int16Array.from(input), n4 = w * h, label2 = new Int32Array(n4), dist2 = new Float32Array(n4);
    const heightOf = o.heightOf || ((lv) => lv === -2 ? 0 : (lv < 0 ? s.baseLayers : topLayer(lv, s)) * s.layerHeight);
    let lowered = 0;
    for (let round = 0; round < 12; round++) {
      label2.fill(-1);
      const levels = [], stack = [];
      for (let p = 0; p < n4; p++) {
        if (label2[p] >= 0) continue;
        const id = levels.length, lv = grid[p];
        levels.push(lv);
        label2[p] = id;
        stack.push(p);
        while (stack.length) {
          const q = stack.pop(), x = q % w;
          for (const r of [x > 0 ? q - 1 : -1, x < w - 1 ? q + 1 : -1, q - w, q + w]) {
            if (r < 0 || r >= n4 || label2[r] >= 0 || grid[r] !== lv) continue;
            label2[r] = id;
            stack.push(r);
          }
        }
      }
      const D = Math.SQRT2;
      for (let p = 0; p < n4; p++) {
        const x = p % w, y = p / w | 0, l = label2[p];
        const edge = x === 0 || y === 0 || x === w - 1 || y === h - 1 || label2[p - 1] !== l || label2[p + 1] !== l || label2[p - w] !== l || label2[p + w] !== l;
        dist2[p] = edge ? 1 : 1e9;
      }
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const p = y * w + x;
        if (dist2[p] <= 1) continue;
        dist2[p] = Math.min(dist2[p], dist2[p - 1] + 1, dist2[p - w] + 1, dist2[p - w - 1] + D, dist2[p - w + 1] + D);
      }
      for (let y = h - 1; y >= 0; y--) for (let x = w - 1; x >= 0; x--) {
        const p = y * w + x;
        if (dist2[p] <= 1) continue;
        dist2[p] = Math.min(dist2[p], dist2[p + 1] + 1, dist2[p + w] + 1, dist2[p + w + 1] + D, dist2[p + w - 1] + D);
      }
      const widest = new Float32Array(levels.length);
      for (let p = 0; p < n4; p++) if (dist2[p] > widest[label2[p]]) widest[label2[p]] = dist2[p];
      const borders = levels.map(() => /* @__PURE__ */ new Map());
      const lowest = new Float64Array(levels.length).fill(Infinity);
      const meet = (a, b) => {
        const la = label2[a], lb = label2[b];
        if (la === lb) return;
        const ga = grid[a], gb = grid[b];
        lowest[la] = Math.min(lowest[la], heightOf(gb));
        lowest[lb] = Math.min(lowest[lb], heightOf(ga));
        if (gb < ga) borders[la].set(gb, (borders[la].get(gb) || 0) + 1);
        if (ga < gb) borders[lb].set(ga, (borders[lb].get(ga) || 0) + 1);
      };
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const p = y * w + x;
        if (x < w - 1) meet(p, p + 1);
        if (y < h - 1) meet(p, p + w);
      }
      const target3 = new Int16Array(levels.length).fill(-32768);
      let changed = 0;
      levels.forEach((lv, id) => {
        const relief = heightOf(lv) - lowest[id];
        if (!(relief > 1e-9) || !borders[id].size) return;
        const width = Math.max(1, 2 * widest[id] - 1) * cell;
        if (width >= o.minWidth && relief <= o.maxRatio * width) return;
        let best = -2, bestN = -1;
        for (const [nl, cnt] of borders[id]) if (cnt > bestN || cnt === bestN && nl > best) {
          best = nl;
          bestN = cnt;
        }
        target3[id] = best;
        changed++;
      });
      if (!changed) break;
      for (let p = 0; p < n4; p++) {
        const tl = target3[label2[p]];
        if (tl !== -32768) grid[p] = tl;
      }
      lowered += changed;
    }
    return { grid, lowered };
  }
  function stl(mesh, name = "Mosaic Paint") {
    const V = mesh.vertices, T = mesh.triangles, n4 = T.length / 3, buf = new ArrayBuffer(84 + n4 * 50), dv = new DataView(buf);
    const header = `${name} – multi-color by layer`.slice(0, 80);
    for (let i = 0; i < header.length; i++) dv.setUint8(i, header.charCodeAt(i) & 127);
    dv.setUint32(80, n4, true);
    let o = 84;
    for (let t2 = 0; t2 < n4; t2++) {
      const p = [0, 1, 2].map((k) => T[t2 * 3 + k] * 3);
      const ux = V[p[1]] - V[p[0]], uy = V[p[1] + 1] - V[p[0] + 1], uz = V[p[1] + 2] - V[p[0] + 2];
      const vx = V[p[2]] - V[p[0]], vy = V[p[2] + 1] - V[p[0] + 1], vz = V[p[2] + 2] - V[p[0] + 2];
      let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      const L = Math.hypot(nx, ny, nz) || 1;
      nx /= L;
      ny /= L;
      nz /= L;
      for (const v of [nx, ny, nz]) {
        dv.setFloat32(o, v, true);
        o += 4;
      }
      for (const q of p) for (let k = 0; k < 3; k++) {
        dv.setFloat32(o, V[q + k], true);
        o += 4;
      }
      dv.setUint16(o, 0, true);
      o += 2;
    }
    return buf;
  }
  function colorPlan(colors, s) {
    return colors.map((color, i) => {
      const from = i === 0 ? 1 : topLayer(i - 1, s) + 1, to = topLayer(i, s);
      return { color, fromLayer: from, toLayer: to, changeAtLayer: i === 0 ? null : from, z: i === 0 ? null : +(from * s.layerHeight).toFixed(3) };
    });
  }
  var modelHeight = (nColors, s) => +(topLayer(nColors - 1, s) * s.layerHeight).toFixed(3);
  var FRAME = -3;
  var holeCentre = (o, margin) => Math.max(o.hole / 2 + margin, o.frame / 2);
  function finishGrid(grid, w, h, o, margin) {
    const b = Math.max(0, Math.round(o.frame)), W = w + 2 * b, H = h + 2 * b, out = new Int16Array(W * H).fill(FRAME);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) out[(y + b) * W + x + b] = grid[y * w + x];
    const r = Math.min(o.corner, W / 2, H / 2), hr = o.hole / 2, hy = holeCentre(o, margin);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const cx = x + 0.5, cy = y + 0.5;
      if (r > 0) {
        const ox = cx < r ? r : cx > W - r ? W - r : cx, oy = cy < r ? r : cy > H - r ? H - r : cy;
        if ((cx - ox) ** 2 + (cy - oy) ** 2 > r * r) {
          out[y * W + x] = -2;
          continue;
        }
      }
      if (hr > 0 && (cx - W / 2) ** 2 + (cy - hy) ** 2 <= hr * hr) out[y * W + x] = -2;
    }
    return { grid: out, w: W, h: H };
  }
  function pocketMask(w, h, d, inset) {
    const mask = new Uint8Array(w * h), r = d / 2;
    if (r <= 0) return mask;
    const xs = [inset, w - inset], ys = [inset, h - inset];
    for (const px2 of xs) for (const py of ys) {
      for (let y = Math.max(0, Math.floor(py - r)); y < Math.min(h, Math.ceil(py + r)); y++) {
        for (let x = Math.max(0, Math.floor(px2 - r)); x < Math.min(w, Math.ceil(px2 + r)); x++) {
          if ((x + 0.5 - px2) ** 2 + (y + 0.5 - py) ** 2 <= r * r) mask[y * w + x] = 1;
        }
      }
    }
    return mask;
  }
  function cutPockets(solids2, mask, depth, keep = 2) {
    let used = depth;
    for (let i = 0; i < mask.length; i++) {
      if (!mask[i]) continue;
      let top = 0;
      for (const s of solids2) if (s.top[i] > s.bottom[i]) top = Math.max(top, s.top[i]);
      if (top > 0) used = Math.min(used, top - keep);
    }
    used = Math.max(0, used);
    if (!used) return 0;
    for (let i = 0; i < mask.length; i++) {
      if (!mask[i]) continue;
      for (const s of solids2) if (s.top[i] > s.bottom[i] && s.bottom[i] < used) {
        s.bottom[i] = used;
        if (s.top[i] < used) s.top[i] = used;
      }
    }
    return used;
  }
  function frameSolid(grid, bottom, top, level) {
    const n4 = grid.length, s = { bottom: new Int16Array(n4).fill(bottom), top: new Int16Array(n4), level: new Int16Array(n4).fill(level) };
    for (let i = 0; i < n4; i++) if (grid[i] === FRAME) s.top[i] = top;
    return s;
  }
  var xmlAttr = (v) => v.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  var num2 = (v) => String(+v.toFixed(4));
  var CONTENT_TYPES = '<?xml version="1.0" encoding="UTF-8"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/><Default Extension="xml" ContentType="application/xml"/></Types>';
  var RELS = '<?xml version="1.0" encoding="UTF-8"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/></Relationships>';
  function modelXml(mesh, colors, name) {
    const V = mesh.vertices, T = mesh.triangles, out = [];
    out.push(
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">',
      `<metadata name="Title">${xmlAttr(name)}</metadata>`,
      '<metadata name="Application">Mosaic Paint</metadata>',
      "<resources>",
      '<basematerials id="1">'
    );
    for (const c of colors) out.push(`<base name="${xmlAttr(c)}" displaycolor="${c.toUpperCase()}FF"/>`);
    out.push("</basematerials>", `<object id="2" type="model" pid="1" pindex="0" name="${xmlAttr(name)}">`, "<mesh>", "<vertices>");
    for (let i = 0; i < V.length; i += 3) out.push(`<vertex x="${num2(V[i])}" y="${num2(V[i + 1])}" z="${num2(V[i + 2])}"/>`);
    out.push("</vertices>", "<triangles>");
    for (let t2 = 0; t2 < T.length; t2 += 3) out.push(`<triangle v1="${T[t2]}" v2="${T[t2 + 1]}" v3="${T[t2 + 2]}" pid="1" p1="${Math.max(0, mesh.levels[t2 / 3])}"/>`);
    out.push("</triangles>", "</mesh>", "</object>", "</resources>", "<build>", '<item objectid="2"/>', "</build>", "</model>");
    return out.join("\n");
  }
  function colorChangeXml(plan) {
    return [
      '<?xml version="1.0" encoding="utf-8"?>',
      "<custom_gcodes_per_print_z>",
      ...plan.filter((p) => p.z != null).map((p) => `<code print_z="${p.z}" type="0" extruder="1" color="${p.color}" extra="" gcode="M600"/>`),
      '<mode value="SingleExtruder"/>',
      "</custom_gcodes_per_print_z>"
    ].join("\n");
  }
  function threeMfFiles(mesh, plan, name) {
    return [
      { name: "[Content_Types].xml", data: CONTENT_TYPES },
      { name: "_rels/.rels", data: RELS },
      { name: "3D/3dmodel.model", data: modelXml(mesh, plan.map((p) => p.color), name) },
      { name: "Metadata/Prusa_Slicer_custom_gcode_per_print_z.xml", data: colorChangeXml(plan) }
    ];
  }
  function flatHeights(grout, f) {
    const tile = (f.baseLayers + f.tileLayers) * f.layerHeight, low = (f.baseLayers + Math.max(1, f.tileLayers - f.groutRecess)) * f.layerHeight;
    return (lv) => lv === -2 ? 0 : lv < 0 ? f.baseLayers * f.layerHeight : grout[lv] ? low : tile;
  }
  function flatParts(grid, w, h, nLevels, grout, f) {
    const n4 = w * h, out = [];
    if (f.baseLayers > 0) {
      const top = new Int16Array(n4);
      for (let i = 0; i < n4; i++) if (grid[i] !== -2) top[i] = f.baseLayers;
      out.push({ part: -1, solid: { bottom: new Int16Array(n4), top, level: new Int16Array(n4) } });
    }
    for (let k = 0; k < nLevels; k++) {
      const bottom = new Int16Array(n4).fill(f.baseLayers), top = new Int16Array(n4), level = new Int16Array(n4).fill(k);
      const up = f.baseLayers + (grout[k] ? Math.max(1, f.tileLayers - f.groutRecess) : f.tileLayers);
      let any = false;
      for (let i = 0; i < n4; i++) if (grid[i] === k) {
        top[i] = up;
        any = true;
      }
      if (any) out.push({ part: k, solid: { bottom, top, level } });
    }
    return out;
  }
  function threeMfPartsFiles(parts, name, slicer = "prusa") {
    return slicer === "bambu" ? bambuPartsFiles(parts, name) : prusaPartsFiles(parts, name);
  }
  function bambuPartsFiles(parts, name) {
    const NS = 'xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02" xmlns:BambuStudio="http://schemas.bambulab.com/package/2021" xmlns:p="http://schemas.microsoft.com/3dmanufacturing/production/2015/06" requiredextensions="p"';
    const uuid = (kind, k) => `${kind.toString(16).padStart(8, "0")}-0000-4000-8000-${k.toString(16).padStart(12, "0")}`;
    const sub = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      `<model unit="millimeter" xml:lang="en-US" ${NS}>`,
      '<metadata name="BambuStudio:3mfVersion">1</metadata>',
      "<resources>"
    ];
    parts.forEach((p, k) => {
      const V = p.mesh.vertices, T = p.mesh.triangles;
      sub.push(`<object id="${k + 1}" p:UUID="${uuid(1, k)}" type="model">`, "<mesh>", "<vertices>");
      for (let i = 0; i < V.length; i += 3) sub.push(`<vertex x="${num2(V[i])}" y="${num2(V[i + 1])}" z="${num2(V[i + 2])}"/>`);
      sub.push("</vertices>", "<triangles>");
      for (let t2 = 0; t2 < T.length; t2 += 3) sub.push(`<triangle v1="${T[t2]}" v2="${T[t2 + 1]}" v3="${T[t2 + 2]}"/>`);
      sub.push("</triangles>", "</mesh>", "</object>");
    });
    sub.push("</resources>", "<build/>", "</model>");
    const whole = parts.length + 1, path = "/3D/Objects/object_1.model";
    const main = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      `<model unit="millimeter" xml:lang="en-US" ${NS}>`,
      '<metadata name="Application">Mosaic Paint</metadata>',
      '<metadata name="BambuStudio:3mfVersion">1</metadata>',
      `<metadata name="Title">${xmlAttr(name)}</metadata>`,
      "<resources>",
      `<object id="${whole}" p:UUID="${uuid(2, 0)}" type="model">`,
      "<components>"
    ];
    parts.forEach((_, k) => main.push(`<component p:path="${path}" objectid="${k + 1}" p:UUID="${uuid(3, k)}" transform="1 0 0 0 1 0 0 0 1 0 0 0"/>`));
    main.push(
      "</components>",
      "</object>",
      "</resources>",
      `<build p:UUID="${uuid(4, 0)}">`,
      `<item objectid="${whole}" p:UUID="${uuid(5, 0)}" printable="1"/>`,
      "</build>",
      "</model>"
    );
    const config = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      "<config>",
      `<object id="${whole}">`,
      `<metadata key="name" value="${xmlAttr(name)}"/>`,
      '<metadata key="extruder" value="1"/>'
    ];
    parts.forEach((p, k) => config.push(
      `<part id="${k + 1}" subtype="normal_part">`,
      `<metadata key="name" value="${xmlAttr(p.name)}"/>`,
      `<metadata key="extruder" value="${p.filament || k + 1}"/>`,
      "</part>"
    ));
    config.push("</object>", "</config>");
    return [
      { name: "[Content_Types].xml", data: CONTENT_TYPES },
      { name: "_rels/.rels", data: RELS },
      { name: "3D/3dmodel.model", data: main.join("\n") },
      { name: "3D/_rels/3dmodel.model.rels", data: RELS.replace("/3D/3dmodel.model", path) },
      { name: "3D/Objects/object_1.model", data: sub.join("\n") },
      { name: "Metadata/model_settings.config", data: config.join("\n") }
    ];
  }
  function prusaPartsFiles(parts, name) {
    const out = [], config = [];
    out.push(
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">',
      `<metadata name="Title">${xmlAttr(name)}</metadata>`,
      '<metadata name="Application">Mosaic Paint</metadata>',
      "<resources>",
      '<basematerials id="2">'
    );
    for (const p of parts) out.push(`<base name="${xmlAttr(p.name)}" displaycolor="${p.color.toUpperCase()}FF"/>`);
    out.push("</basematerials>", `<object id="1" type="model" pid="2" pindex="0" name="${xmlAttr(name)}">`, "<mesh>", "<vertices>");
    for (const p of parts) {
      const V = p.mesh.vertices;
      for (let i = 0; i < V.length; i += 3) out.push(`<vertex x="${num2(V[i])}" y="${num2(V[i + 1])}" z="${num2(V[i + 2])}"/>`);
    }
    out.push("</vertices>", "<triangles>");
    config.push('<?xml version="1.0" encoding="UTF-8"?>', "<config>", '<object id="1" instances_count="1">', `<metadata type="object" key="name" value="${xmlAttr(name)}"/>`);
    let vOffset = 0, tOffset = 0;
    parts.forEach((p, k) => {
      const T = p.mesh.triangles, n4 = T.length / 3;
      for (let t2 = 0; t2 < T.length; t2 += 3) out.push(`<triangle v1="${T[t2] + vOffset}" v2="${T[t2 + 1] + vOffset}" v3="${T[t2 + 2] + vOffset}" pid="2" p1="${k}"/>`);
      config.push(
        `<volume firstid="${tOffset}" lastid="${tOffset + n4 - 1}">`,
        `<metadata type="volume" key="name" value="${xmlAttr(p.name)}"/>`,
        '<metadata type="volume" key="volume_type" value="ModelPart"/>',
        `<metadata type="volume" key="extruder" value="${p.filament || k + 1}"/>`,
        "</volume>"
      );
      vOffset += p.mesh.vertices.length / 3;
      tOffset += n4;
    });
    out.push("</triangles>", "</mesh>", "</object>", "</resources>", "<build>", '<item objectid="1"/>', "</build>", "</model>");
    config.push("</object>", "</config>");
    return [
      { name: "[Content_Types].xml", data: CONTENT_TYPES },
      { name: "_rels/.rels", data: RELS },
      { name: "3D/3dmodel.model", data: out.join("\n") },
      { name: "Metadata/Slic3r_PE_model.config", data: config.join("\n") }
    ];
  }
  function mergeMeshes(meshes) {
    const out = { vertices: [], triangles: [], levels: [] };
    for (const m of meshes) {
      const o = out.vertices.length / 3;
      for (const v of m.vertices) out.vertices.push(v);
      for (const i of m.triangles) out.triangles.push(i + o);
      for (const l of m.levels) out.levels.push(l);
    }
    return out;
  }

  // src/lib/zip.ts
  var crcTable = null;
  function crc32(data) {
    if (!crcTable) {
      crcTable = new Uint32Array(256);
      for (let n4 = 0; n4 < 256; n4++) {
        let c2 = n4;
        for (let k = 0; k < 8; k++) c2 = c2 & 1 ? 3988292384 ^ c2 >>> 1 : c2 >>> 1;
        crcTable[n4] = c2 >>> 0;
      }
    }
    let c = 4294967295;
    for (let i = 0; i < data.length; i++) c = crcTable[(c ^ data[i]) & 255] ^ c >>> 8;
    return (c ^ 4294967295) >>> 0;
  }
  async function deflateRaw(data) {
    if (typeof CompressionStream === "undefined") return null;
    try {
      const s = new Blob([data]).stream().pipeThrough(new CompressionStream("deflate-raw"));
      return new Uint8Array(await new Response(s).arrayBuffer());
    } catch {
      return null;
    }
  }
  async function zip(entries, { compress = true } = {}) {
    const enc = new TextEncoder(), parts = [], central = [];
    let offset = 0;
    for (const e of entries) {
      const name = enc.encode(e.name), raw = typeof e.data === "string" ? enc.encode(e.data) : e.data;
      const crc = crc32(raw), packed = compress ? await deflateRaw(raw) : null;
      const deflated = !!packed && packed.length < raw.length, body = deflated ? packed : raw;
      const local = new Uint8Array(30 + name.length), lv = new DataView(local.buffer);
      lv.setUint32(0, 67324752, true);
      lv.setUint16(4, 20, true);
      lv.setUint16(6, 2048, true);
      lv.setUint16(8, deflated ? 8 : 0, true);
      lv.setUint16(10, 0, true);
      lv.setUint16(12, 33, true);
      lv.setUint32(14, crc, true);
      lv.setUint32(18, body.length, true);
      lv.setUint32(22, raw.length, true);
      lv.setUint16(26, name.length, true);
      local.set(name, 30);
      const cd = new Uint8Array(46 + name.length), cv = new DataView(cd.buffer);
      cv.setUint32(0, 33639248, true);
      cv.setUint16(4, 20, true);
      cv.setUint16(6, 20, true);
      cv.setUint16(8, 2048, true);
      cv.setUint16(10, deflated ? 8 : 0, true);
      cv.setUint16(12, 0, true);
      cv.setUint16(14, 33, true);
      cv.setUint32(16, crc, true);
      cv.setUint32(20, body.length, true);
      cv.setUint32(24, raw.length, true);
      cv.setUint16(28, name.length, true);
      cv.setUint32(42, offset, true);
      cd.set(name, 46);
      parts.push(local, body);
      central.push(cd);
      offset += local.length + body.length;
    }
    const cdSize = central.reduce((s, c) => s + c.length, 0), end = new Uint8Array(22), ev = new DataView(end.buffer);
    ev.setUint32(0, 101010256, true);
    ev.setUint16(8, entries.length, true);
    ev.setUint16(10, entries.length, true);
    ev.setUint32(12, cdSize, true);
    ev.setUint32(16, offset, true);
    const out = new Uint8Array(offset + cdSize + 22);
    let o = 0;
    for (const p of [...parts, ...central, end]) {
      out.set(p, o);
      o += p.length;
    }
    return out;
  }

  // src/lib/build3d.ts
  var MARGIN2 = 2;
  var KEEP = 2;
  var printSettings = (o) => ({ layerHeight: o.layerHeight, layersPerColor: o.layersPerColor, baseLayers: o.baseLayers });
  var flatSettings = (o) => ({ layerHeight: o.layerHeight, baseLayers: o.baseLayers, tileLayers: o.tileLayers, groutRecess: Math.min(o.groutRecess, o.tileLayers - 1) });
  var layersOf = (mm, o) => Math.max(1, Math.round(mm / o.layerHeight));
  function towers(colorGrid, w, h, cell, order, counts, isLine, o, progress) {
    let list = order.filter((i) => counts[i] > 0), out = { list, grid: new Int16Array(0), counts: [], lowered: 0 };
    const g = Int16Array.from(colorGrid);
    let lowered = 0;
    for (let round = 0; round < 4; round++) {
      progress?.(round / 4);
      const rank = new Int16Array(isLine.length).fill(-1);
      list.forEach((ci, k) => {
        rank[ci] = k;
      });
      const levels = g.map((v) => v < 0 ? -1 : rank[v]);
      const heightOf = o.mode === "flat" ? flatHeights(list.map((ci) => isLine[ci]), flatSettings(o)) : void 0;
      const res = removeTowers(levels, w, h, cell, printSettings(o), { minWidth: o.minWidth, maxRatio: o.maxRatio, heightOf });
      lowered += res.lowered;
      const c = list.map(() => 0);
      for (let p = 0; p < res.grid.length; p++) {
        const lv = res.grid[p];
        if (lv >= 0) c[lv]++;
        g[p] = lv < 0 ? -1 : list[lv];
      }
      out = { list, grid: res.grid, counts: c, lowered };
      if (c.every((n4) => n4 > 0)) break;
      list = list.filter((_, k) => c[k] > 0);
    }
    return out;
  }
  var frameTop = (n4, o) => (o.mode === "flat" ? o.baseLayers + o.tileLayers : topLayer(Math.max(0, n4 - 1), printSettings(o))) + o.frameRaise;
  function layout2(g, w, h, cell, o) {
    const f = finishGrid(g, w, h, { frame: o.frame / cell, corner: o.corner / cell, hole: o.hole / cell }, MARGIN2 / cell);
    const inset = (o.magnet / 2 + MARGIN2 + o.corner * 0.3) / cell;
    return { ...f, mask: o.magnet > 0 ? pocketMask(f.w, f.h, o.magnet / cell, inset) : null };
  }
  function columnTop(lv, grout, o) {
    if (lv === -2) return 0;
    if (lv === FRAME) return frameTop(grout.length, o);
    if (o.mode === "flat") return Math.round(flatHeights(grout, flatSettings(o))(lv) / o.layerHeight);
    return lv < 0 ? o.baseLayers : topLayer(lv, printSettings(o));
  }
  function pocketDepth(lay, grout, o) {
    if (!lay.mask) return 0;
    let d = layersOf(o.magnetDepth, o);
    for (let i = 0; i < lay.mask.length; i++) if (lay.mask[i]) {
      const top = columnTop(lay.grid[i], grout, o);
      if (top > 0) d = Math.min(d, top - KEEP);
    }
    return Math.max(0, d);
  }
  function solids(lay, grout, o) {
    const n4 = grout.length;
    let out;
    if (o.mode === "flat") {
      out = flatParts(lay.grid, lay.w, lay.h, n4, grout, flatSettings(o));
      if (o.frame > 0) out.splice(o.baseLayers ? 1 : 0, 0, { part: FRAME, solid: frameSolid(lay.grid, o.baseLayers, frameTop(n4, o), 0) });
    } else {
      const sol = heightSolid(lay.grid, printSettings(o)), top = frameTop(n4, o);
      for (let i = 0; i < lay.grid.length; i++) if (lay.grid[i] === FRAME) {
        sol.top[i] = top;
        sol.level[i] = n4 - 1;
      }
      out = [{ part: 0, solid: sol }];
    }
    if (lay.mask) cutPockets(out.map((p) => p.solid), lay.mask, layersOf(o.magnetDepth, o), KEEP);
    return out;
  }
  function downsample(g, w, h, cell, maxCells) {
    const f = Math.max(1, Math.ceil(Math.sqrt(w * h / maxCells)));
    if (f === 1) return { grid: g, w, h, cell };
    const W = Math.ceil(w / f), H = Math.ceil(h / f), out = new Int16Array(W * H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) out[y * W + x] = g[Math.min(h - 1, y * f) * w + Math.min(w - 1, x * f)];
    return { grid: out, w: W, h: H, cell: cell * f };
  }
  function viewMesh(s, o) {
    const lay = layout2(s.grid, s.w, s.h, s.cell, o);
    return mergeMeshes(solids(lay, s.grout, o).map((p) => solidMesh(p.solid, lay.w, lay.h, s.cell, o.layerHeight)));
  }
  async function exportModel(r, progress) {
    const { shape: s, o } = r, lay = layout2(s.grid, s.w, s.h, s.cell, o);
    progress?.(0.05);
    const sol = solids(lay, s.grout, o);
    progress?.(0.15);
    const meshes = sol.map((p, k) => {
      const m = solidMesh(p.solid, lay.w, lay.h, s.cell, o.layerHeight);
      progress?.(0.15 + 0.7 * (k + 1) / sol.length);
      return m;
    });
    const triangles = meshes.reduce((t2, m) => t2 + m.triangles.length / 3, 0);
    const done = (fileName, type, data) => ({ fileName, type, data, triangles, parts: meshes.length });
    if (o.mode === "flat") {
      const parts = sol.map((p, k) => {
        const lv = Math.max(0, p.part), color = r.colors[lv];
        const name = p.part === FRAME ? r.labels.frame : p.part < 0 ? r.labels.base : `${p.part + 1} ${color}`;
        return { name, color, mesh: meshes[k], filament: lv + 1 };
      });
      if (r.kind === "3mf") return done(r.name + ".3mf", "model/3mf", await zip(threeMfPartsFiles(parts, r.name, r.slicer)));
      const files = sol.map((p, k) => ({
        name: `${r.name}-${p.part === FRAME ? "frame" : p.part < 0 ? "base" : `${p.part + 1}-${r.colors[p.part].slice(1)}`}.stl`,
        data: new Uint8Array(stl(parts[k].mesh, parts[k].name))
      }));
      return done(r.name + "-stl.zip", "application/zip", await zip(files));
    }
    if (r.kind === "3mf") return done(r.name + ".3mf", "model/3mf", await zip(threeMfFiles(meshes[0], colorPlan(r.colors, printSettings(o)), r.name)));
    return done(r.name + ".stl", "model/stl", new Uint8Array(stl(meshes[0], r.name)));
  }

  // src/lib/trace.ts
  function traceAll(labels, W, H, count, progress) {
    const at = (x, y) => x < 0 || y < 0 || x >= W || y >= H ? -1 : labels[y * W + x];
    const V = W + 1, key = (x, y) => y * V + x;
    const out = Array.from({ length: count }, () => /* @__PURE__ */ new Map());
    const add = (l, x0, y0, x1, y1) => {
      const m = out[l], k = key(x0, y0);
      const list = m.get(k);
      if (list) list.push(key(x1, y1));
      else m.set(k, [key(x1, y1)]);
    };
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (progress && x === 0 && y % 64 === 0) progress(0.5 * y / H);
      const l = labels[y * W + x];
      if (l < 0) continue;
      if (at(x, y - 1) !== l) add(l, x + 1, y, x, y);
      if (at(x - 1, y) !== l) add(l, x, y, x, y + 1);
      if (at(x, y + 1) !== l) add(l, x, y + 1, x + 1, y + 1);
      if (at(x + 1, y) !== l) add(l, x + 1, y + 1, x + 1, y);
    }
    const rings = [];
    for (let l = 0; l < count; l++) {
      if (progress && l % 256 === 0) progress(0.5 + 0.5 * l / count);
      const m = out[l], list = [];
      for (const [start] of m) {
        while (m.get(start) && m.get(start).length) {
          const ring = [start];
          let prev = start, cur = take(m, start, -1, V);
          while (cur !== start) {
            ring.push(cur);
            const next = take(m, cur, prev, V);
            prev = cur;
            cur = next;
          }
          list.push(simplify2(ring, V));
        }
      }
      rings.push(list);
    }
    return rings;
  }
  function take(m, from, prev, V) {
    const list = m.get(from);
    let i = 0;
    if (list.length > 1 && prev >= 0) {
      const dx = from % V - prev % V, dy = Math.floor(from / V) - Math.floor(prev / V);
      const score = (to2) => {
        const ex = to2 % V - from % V, ey = Math.floor(to2 / V) - Math.floor(from / V);
        return ex === dy && ey === -dx ? 0 : ex === dx && ey === dy ? 1 : 2;
      };
      for (let k = 1; k < list.length; k++) if (score(list[k]) < score(list[i])) i = k;
    }
    const to = list[i];
    list.splice(i, 1);
    if (!list.length) m.delete(from);
    return to;
  }
  function simplify2(ring, V) {
    const pts = ring.map((k) => ({ x: k % V, y: Math.floor(k / V) })), n4 = pts.length, out = [];
    for (let i = 0; i < n4; i++) {
      const a = pts[(i + n4 - 1) % n4], b = pts[i], c = pts[(i + 1) % n4];
      if ((b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x) !== 0) out.push(b);
    }
    return out;
  }
  function ringArea(r) {
    let s = 0;
    for (let i = 0, n4 = r.length; i < n4; i++) {
      const a = r[i], b = r[(i + 1) % n4];
      s += a.x * b.y - b.x * a.y;
    }
    return s / 2;
  }

  // src/lib/vectorize.ts
  var n2 = (v) => String(Math.round(v * 1e3) / 1e3);
  function piecesSvg(img, grout, widthMm, name, progress) {
    const W = img.width, H = img.height, k = widthMm / W, p = pieces(img);
    progress?.(0.15);
    const ids = new Int32Array(p.colors.length).fill(-1), colors = [];
    p.colors.forEach((c, i) => {
      if (c !== grout) {
        ids[i] = colors.length;
        colors.push(c);
      }
    });
    const labels = p.labels.map((l) => l < 0 ? -1 : ids[l]);
    const rings = traceAll(labels, W, H, colors.length, progress && ((f) => progress(0.15 + 0.8 * f)));
    const shapes = [];
    const pts = (r) => r.map((q) => `${n2(q.x * k)},${n2(q.y * k)}`).join(" ");
    rings.forEach((list, i) => {
      if (list.length === 1) shapes.push(`<polygon points="${pts(list[0])}" fill="${colors[i]}" stroke="none"/>`);
      else {
        const sorted = [...list].sort((a, b) => Math.abs(ringArea(b)) - Math.abs(ringArea(a)));
        const d = sorted.map((r) => "M" + pts(r).replace(/ /g, "L") + "Z").join("");
        shapes.push(`<path d="${d}" fill="${colors[i]}" fill-rule="evenodd" stroke="none"/>`);
      }
    });
    const w = n2(widthMm), h = n2(H * k), palette = [...new Set(colorRows(p).map((r) => r.color))];
    const svg3 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}mm" height="${h}mm">
<metadata id="mosaic-palette">${JSON.stringify({ palette, paletteName: name, unit: "mm" })}</metadata>
${grout ? `<rect id="mosaic-bg" x="0" y="0" width="${w}" height="${h}" fill="${grout}"/>` : ""}
<g id="mosaic-fills"></g>
<g id="mosaic-shapes">
${shapes.join("\n")}
</g>
</svg>`;
    return { svg: svg3, tiles: colors.length };
  }

  // src/lib/gcode.ts
  var WORD = Object.fromEntries(["X", "Y", "Z", "E"].map((l) => [l, new RegExp(`(?:^|\\s)${l}(-?[\\d.]+)`, "i")]));
  var num3 = (line, letter) => {
    const m = WORD[letter].exec(line);
    return m ? +m[1] : null;
  };
  var FEATURE = /^;\s*(?:TYPE|FEATURE)\s*:\s*(.*)$/i;
  var NOT_MODEL = /wipe|prime|tower|skirt|brim|purge/i;
  function readGcode(text, progress) {
    let z = 0, e = 0, relative = false, tool = 0, printed = false, notModel = false;
    const zs = /* @__PURE__ */ new Set(), tools2 = /* @__PURE__ */ new Map(), changes = [];
    let pending = null;
    for (let at = 0, n4 = 0; at < text.length; n4++) {
      let end = text.indexOf("\n", at);
      if (end < 0) end = text.length;
      let line = text.slice(at, end);
      at = end + 1;
      if (progress && n4 % 5e4 === 0) progress(at / text.length);
      const semi = line.indexOf(";");
      if (semi >= 0) {
        const type = FEATURE.exec(line.slice(semi));
        if (type) notModel = NOT_MODEL.test(type[1]);
        line = line.slice(0, semi);
      }
      line = line.trim();
      if (!line) continue;
      const cmd = line.split(/\s/, 1)[0].toUpperCase();
      if (cmd === "G0" || cmd === "G1") {
        const nz = num3(line, "Z"), ne = num3(line, "E");
        if (nz != null) z = nz;
        if (ne != null) {
          const extrudes = relative ? ne > 0 : ne > e;
          if (!relative) e = ne;
          if (extrudes && !notModel && (num3(line, "X") != null || num3(line, "Y") != null)) {
            const key = Math.round(z * 1e3) / 1e3;
            zs.add(key);
            const r = tools2.get(tool);
            if (r) {
              r.from = Math.min(r.from, key);
              r.to = Math.max(r.to, key);
            } else tools2.set(tool, { from: key, to: key });
            if (pending) {
              changes.push({ ...pending, z: key });
              pending = null;
            }
            printed = true;
          }
        }
      } else if (cmd === "G92") {
        const ne = num3(line, "E");
        if (ne != null) e = ne;
      } else if (cmd === "M82") relative = false;
      else if (cmd === "M83") relative = true;
      else if (cmd === "M600") pending = { kind: "M600" };
      else if (/^T\d+$/.test(cmd)) {
        const next = +cmd.slice(1);
        if (printed && next !== tool) pending = { kind: "tool", tool: next };
        tool = next;
      }
    }
    return {
      layers: zs.size,
      top: zs.size ? Math.max(...zs) : 0,
      changes,
      tools: [...tools2].map(([t2, r]) => ({ tool: t2, ...r })).sort((a, b) => a.tool - b.tool)
    };
  }
  function checkHeights(g, plan, top, layerHeight) {
    const near = (a, b) => Math.abs(a - b) <= layerHeight / 2 + 1e-6, used = /* @__PURE__ */ new Set(), out = [];
    for (const p of plan) {
      if (p.z == null) continue;
      const i = g.changes.findIndex((c, k) => !used.has(k) && near(c.z, p.z));
      if (i >= 0) used.add(i);
      out.push({ ok: i >= 0, kind: "change", color: p.color, z: p.z, found: i >= 0 ? g.changes[i].z : null });
    }
    g.changes.forEach((c, k) => {
      if (!used.has(k)) out.push({ ok: false, kind: "extra", z: c.z });
    });
    out.push({ ok: near(g.top, top), kind: "top", z: top, found: g.top });
    return out;
  }
  function checkFilaments(g, expected, layerHeight) {
    return expected.map((f, k) => {
      const r = g.tools.find((x) => x.tool === k), found = r ? r.to : null;
      return { ok: found != null && Math.abs(found - f.top) <= layerHeight / 2 + 1e-6, kind: "filament", filament: k + 1, color: f.color, top: f.top, found };
    });
  }

  // src/lib/adjust.ts
  function toneLUT(a) {
    const lut = new Uint8ClampedArray(256), lo = Math.min(a.black, a.white - 1), hi = Math.max(a.white, lo + 1);
    const c = a.contrast / 100, k = c >= 0 ? 1 / Math.max(0.01, 1 - c) : 1 + c, b = a.brightness / 100 * 255;
    for (let v = 0; v < 256; v++) {
      let x = Math.min(1, Math.max(0, (v - lo) / (hi - lo)));
      x = Math.pow(x, 1 / a.gamma) * 255;
      x = (x - 128) * k + 128 + b;
      const y = Math.min(1, Math.max(0, x / 255)), bump = 27 / 4;
      x += 255 * 0.25 * bump * (a.shadows / 100 * y * (1 - y) * (1 - y) + a.highlights / 100 * y * y * (1 - y));
      const f = a.fade / 100;
      if (f) x = 255 * f * 0.14 + x * (1 - f * 0.22);
      lut[v] = Math.round(x);
    }
    return lut;
  }
  function blurPlane(src, w, h, r) {
    const a = Float32Array.from(src), b = new Float32Array(a.length);
    r = Math.max(1, Math.round(r));
    for (let pass = 0; pass < 3; pass++) {
      for (let y = 0; y < h; y++) {
        const row = y * w;
        let sum = 0;
        for (let i = -r; i <= r; i++) sum += a[row + Math.min(w - 1, Math.max(0, i))];
        for (let x = 0; x < w; x++) {
          b[row + x] = sum / (2 * r + 1);
          sum += a[row + Math.min(w - 1, x + r + 1)] - a[row + Math.max(0, x - r)];
        }
      }
      for (let x = 0; x < w; x++) {
        let sum = 0;
        for (let i = -r; i <= r; i++) sum += b[Math.min(h - 1, Math.max(0, i)) * w + x];
        for (let y = 0; y < h; y++) {
          a[y * w + x] = sum / (2 * r + 1);
          sum += b[Math.min(h - 1, y + r + 1) * w + x] - b[Math.max(0, y - r) * w + x];
        }
      }
    }
    return a;
  }
  function planes(data, n4) {
    const p = [new Float32Array(n4), new Float32Array(n4), new Float32Array(n4)];
    for (let i = 0; i < n4; i++) {
      p[0][i] = data[i * 4];
      p[1][i] = data[i * 4 + 1];
      p[2][i] = data[i * 4 + 2];
    }
    return p;
  }
  function denoise(out, w, h, strength) {
    const n4 = w * h, p = planes(out, n4), r = 1 + Math.round(strength / 40), sigma = 6 + strength * 0.4;
    const blur = p.map((c) => blurPlane(c, w, h, r));
    for (let i = 0; i < n4; i++) {
      const d = Math.hypot(p[0][i] - blur[0][i], p[1][i] - blur[1][i], p[2][i] - blur[2][i]);
      const k = strength / 100 * Math.exp(-(d * d) / (2 * sigma * sigma));
      for (let c = 0; c < 3; c++) out[i * 4 + c] = p[c][i] + (blur[c][i] - p[c][i]) * k;
    }
  }
  function sharpen(out, w, h, amount) {
    const n4 = w * h, p = planes(out, n4), k = amount / 100 * 1.5;
    const blur = p.map((c) => blurPlane(c, w, h, 1));
    for (let i = 0; i < n4; i++) for (let c = 0; c < 3; c++) out[i * 4 + c] = p[c][i] + (p[c][i] - blur[c][i]) * k;
  }
  function applyAdjust(data, w, h, a) {
    const out = new Uint8ClampedArray(data);
    if (a.denoise > 0) denoise(out, w, h, a.denoise);
    const lut = toneLUT(a), s = 1 + a.saturation / 100, vib = a.vibrance / 100, warm = a.warmth / 100 * 28, tint = a.tint / 100 * 22;
    const vg = a.vignette / 100, cx = w / 2, cy = h / 2, rmax = Math.hypot(cx, cy) || 1;
    for (let i = 0, p = 0; i < out.length; i += 4, p++) {
      let r = lut[out[i]], g = lut[out[i + 1]], b = lut[out[i + 2]];
      if (warm) {
        r += warm;
        b -= warm;
      }
      if (tint) {
        g -= tint;
        r += tint / 2;
        b += tint / 2;
      }
      if (s !== 1) {
        const l = 0.299 * r + 0.587 * g + 0.114 * b;
        r = l + (r - l) * s;
        g = l + (g - l) * s;
        b = l + (b - l) * s;
      }
      if (vib) {
        const mx = Math.max(r, g, b), mn = Math.min(r, g, b), sat = mx > 0 ? (mx - mn) / mx : 0, k = 1 + vib * (1 - sat);
        const l = 0.299 * r + 0.587 * g + 0.114 * b;
        r = l + (r - l) * k;
        g = l + (g - l) * k;
        b = l + (b - l) * k;
      }
      if (vg) {
        const x = p % w, y = (p - x) / w, d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / rmax, e = Math.max(0, (d - 0.35) / 0.65), m = e * e * (3 - 2 * e);
        const f = vg > 0 ? 1 - 0.65 * vg * m : 1, add = vg < 0 ? -vg * m * 0.65 : 0;
        r = r * f + (255 - r) * add;
        g = g * f + (255 - g) * add;
        b = b * f + (255 - b) * add;
      }
      out[i] = r;
      out[i + 1] = g;
      out[i + 2] = b;
    }
    if (a.sharpen > 0) sharpen(out, w, h, a.sharpen);
    return out;
  }

  // src/lib/inpaint.ts
  var P = 3;
  function downscale(l) {
    const w = Math.max(1, Math.floor(l.w / 2)), h = Math.max(1, Math.floor(l.h / 2));
    const px2 = new Float32Array(w * h * 3), hole = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      let n4 = 0, s0 = 0, s1 = 0, s2 = 0, holes = 0;
      for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 2; dx++) {
        const sx = Math.min(l.w - 1, 2 * x + dx), sy = Math.min(l.h - 1, 2 * y + dy), i = sy * l.w + sx;
        if (l.hole[i]) {
          holes++;
          continue;
        }
        s0 += l.px[i * 3];
        s1 += l.px[i * 3 + 1];
        s2 += l.px[i * 3 + 2];
        n4++;
      }
      const j = y * w + x;
      if (holes) hole[j] = 1;
      if (n4) {
        px2[j * 3] = s0 / n4;
        px2[j * 3 + 1] = s1 / n4;
        px2[j * 3 + 2] = s2 / n4;
      }
    }
    return { w, h, px: px2, hole };
  }
  function onionFill(l) {
    const { w, h, px: px2 } = l, known = new Uint8Array(w * h);
    for (let i = 0; i < w * h; i++) known[i] = l.hole[i] ? 0 : 1;
    let left = w * h - known.reduce((a, b) => a + b, 0);
    while (left > 0) {
      const next = [];
      for (let i = 0; i < w * h; i++) {
        if (known[i]) continue;
        const x = i % w, y = (i - x) / w;
        let n4 = 0, s0 = 0, s1 = 0, s2 = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const j = ny * w + nx;
          if (!known[j]) continue;
          s0 += px2[j * 3];
          s1 += px2[j * 3 + 1];
          s2 += px2[j * 3 + 2];
          n4++;
        }
        if (n4) {
          px2[i * 3] = s0 / n4;
          px2[i * 3 + 1] = s1 / n4;
          px2[i * 3 + 2] = s2 / n4;
          next.push(i);
        }
      }
      if (!next.length) break;
      for (const i of next) known[i] = 1;
      left -= next.length;
    }
  }
  function rng2(seed) {
    let s = seed >>> 0 || 1;
    return () => (s = s * 1664525 + 1013904223 >>> 0) / 4294967296;
  }
  function solve(l, nnf, iterations, rand) {
    const { w, h, px: px2, hole } = l;
    const valid = [], isValid = new Uint8Array(w * h);
    const sat = new Int32Array((w + 1) * (h + 1));
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) sat[(y + 1) * (w + 1) + x + 1] = hole[y * w + x] + sat[y * (w + 1) + x + 1] + sat[(y + 1) * (w + 1) + x] - sat[y * (w + 1) + x];
    const holesIn = (x0, y0, x1, y1) => sat[(y1 + 1) * (w + 1) + x1 + 1] - sat[y0 * (w + 1) + x1 + 1] - sat[(y1 + 1) * (w + 1) + x0] + sat[y0 * (w + 1) + x0];
    for (let y = P; y < h - P; y++) for (let x = P; x < w - P; x++) {
      if (!holesIn(x - P, y - P, x + P, y + P)) {
        isValid[y * w + x] = 1;
        valid.push(y * w + x);
      }
    }
    const targets = [];
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      if (holesIn(Math.max(0, x - P), Math.max(0, y - P), Math.min(w - 1, x + P), Math.min(h - 1, y + P))) targets.push(y * w + x);
    }
    const map = nnf || new Int32Array(w * h).fill(-1);
    if (!valid.length) return map;
    const dist2 = new Float32Array(w * h).fill(Infinity);
    const D = (t2, s, best) => {
      const tx = t2 % w, ty = (t2 - tx) / w, sx = s % w, sy = (s - sx) / w;
      let d = 0, n4 = 0;
      for (let dy = -P; dy <= P; dy++) {
        const y = ty + dy;
        if (y < 0 || y >= h) continue;
        for (let dx = -P; dx <= P; dx++) {
          const x = tx + dx;
          if (x < 0 || x >= w) continue;
          const a = (y * w + x) * 3, b = ((sy + dy) * w + sx + dx) * 3;
          const e0 = px2[a] - px2[b], e1 = px2[a + 1] - px2[b + 1], e2 = px2[a + 2] - px2[b + 2];
          d += e0 * e0 + e1 * e1 + e2 * e2;
          n4++;
        }
        if (d > best * n4) return Infinity;
      }
      return n4 ? d / n4 : Infinity;
    };
    const tryMatch = (t2, s) => {
      if (s < 0 || !isValid[s]) return;
      const d = D(t2, s, dist2[t2]);
      if (d < dist2[t2]) {
        dist2[t2] = d;
        map[t2] = s;
      }
    };
    for (const t2 of targets) {
      if (map[t2] < 0 || !isValid[map[t2]]) map[t2] = valid[Math.floor(rand() * valid.length)];
      dist2[t2] = D(t2, map[t2], Infinity);
    }
    for (let it = 0; it < iterations; it++) {
      const order = it % 2 ? -1 : 1;
      for (let k = 0; k < targets.length; k++) {
        const t2 = targets[order > 0 ? k : targets.length - 1 - k], x = t2 % w;
        const s = order;
        if (x - s >= 0 && x - s < w) {
          const m = map[t2 - s];
          if (m >= 0) tryMatch(t2, m + s);
        }
        if (t2 - s * w >= 0 && t2 - s * w < w * h) {
          const m = map[t2 - s * w];
          if (m >= 0) tryMatch(t2, m + s * w);
        }
        let rad = Math.max(w, h);
        const cx = map[t2] % w, cy = (map[t2] - cx) / w;
        while (rad >= 1) {
          const rx2 = Math.round(cx + (rand() * 2 - 1) * rad), ry2 = Math.round(cy + (rand() * 2 - 1) * rad);
          if (rx2 >= 0 && ry2 >= 0 && rx2 < w && ry2 < h) tryMatch(t2, ry2 * w + rx2);
          rad /= 2;
        }
      }
      const acc = new Float32Array(w * h * 4);
      for (const t2 of targets) {
        const s = map[t2];
        if (s < 0) continue;
        const tx = t2 % w, ty = (t2 - tx) / w, sx = s % w, sy = (s - sx) / w, wt = Math.exp(-dist2[t2] / 2e3);
        for (let dy = -P; dy <= P; dy++) for (let dx = -P; dx <= P; dx++) {
          const x = tx + dx, y = ty + dy;
          if (x < 0 || y < 0 || x >= w || y >= h || !hole[y * w + x]) continue;
          const a = (y * w + x) * 4, b = ((sy + dy) * w + sx + dx) * 3;
          acc[a] += px2[b] * wt;
          acc[a + 1] += px2[b + 1] * wt;
          acc[a + 2] += px2[b + 2] * wt;
          acc[a + 3] += wt;
        }
      }
      for (let i = 0; i < w * h; i++) {
        if (!hole[i] || !acc[i * 4 + 3]) continue;
        px2[i * 3] = acc[i * 4] / acc[i * 4 + 3];
        px2[i * 3 + 1] = acc[i * 4 + 1] / acc[i * 4 + 3];
        px2[i * 3 + 2] = acc[i * 4 + 2] / acc[i * 4 + 3];
      }
      for (const t2 of targets) dist2[t2] = D(t2, map[t2], Infinity);
    }
    return map;
  }
  function inpaint(img, mask, progress = () => {
  }) {
    const { width: w, height: h, data } = img, px2 = new Float32Array(w * h * 3), hole = new Uint8Array(w * h);
    for (let i = 0; i < w * h; i++) {
      hole[i] = mask[i] > 127 ? 1 : 0;
      px2[i * 3] = data[i * 4];
      px2[i * 3 + 1] = data[i * 4 + 1];
      px2[i * 3 + 2] = data[i * 4 + 2];
    }
    const levels = [{ w, h, px: px2, hole }];
    while (levels[levels.length - 1].w > 48 && levels[levels.length - 1].h > 48) levels.push(downscale(levels[levels.length - 1]));
    const rand = rng2(12345);
    let nnf = null;
    for (let k = levels.length - 1; k >= 0; k--) {
      const l = levels[k];
      if (k === levels.length - 1) onionFill(l);
      else {
        const lo = levels[k + 1], up = new Int32Array(l.w * l.h).fill(-1);
        for (let y = 0; y < l.h; y++) for (let x = 0; x < l.w; x++) {
          const i = y * l.w + x, lx = Math.min(lo.w - 1, x >> 1), ly = Math.min(lo.h - 1, y >> 1), j = ly * lo.w + lx;
          if (l.hole[i]) {
            l.px[i * 3] = lo.px[j * 3];
            l.px[i * 3 + 1] = lo.px[j * 3 + 1];
            l.px[i * 3 + 2] = lo.px[j * 3 + 2];
          }
          const m = nnf ? nnf[j] : -1;
          if (m >= 0) {
            const mx = m % lo.w, my = (m - mx) / lo.w;
            up[i] = Math.min(l.h - 1, 2 * my + (y & 1)) * l.w + Math.min(l.w - 1, 2 * mx + (x & 1));
          }
        }
        nnf = up;
      }
      const its = k === 0 ? 3 : k === 1 ? 4 : 6;
      nnf = solve(l, nnf, its, rand);
      progress(1 - k / levels.length);
    }
    const out = new Uint8ClampedArray(data);
    for (let i = 0; i < w * h; i++) {
      if (!hole[i]) continue;
      out[i * 4] = px2[i * 3];
      out[i * 4 + 1] = px2[i * 3 + 1];
      out[i * 4 + 2] = px2[i * 3 + 2];
      out[i * 4 + 3] = 255;
    }
    return out;
  }

  // src/worker/jobs.ts
  function mosaic2(m, progress) {
    const img = m.img, adaptive = m.detail > 0 && ["square", "brick", "irregular"].includes(m.shape);
    if (m.shape === "offset" || m.shape === "square" && !adaptive) {
      return mosaic(img, { tile: m.tile, grout: m.grout, groutColor: m.groutColor, palette: m.palette, bricks: m.shape === "offset" });
    }
    const bar = 4 + (1 - m.detail / 100) * 26;
    const busy = (x, y, w, h) => detailAt2(img, x, y, w, h) > bar;
    const size = m.shape === "brick" ? m.tile / 2 : m.tile;
    const cells3 = cells2({ style: m.shape, box: { x: 0, y: 0, w: img.width, h: img.height }, size, detail: m.detail / 100, busy, seed: 7 });
    progress(0.5);
    return mosaicCells(img, cells3, { grout: m.grout, groutColor: m.groutColor, palette: m.palette });
  }
  var jobs = {
    mosaic: (a, p) => mosaic2(a, p),
    vectorize: (a, p) => piecesSvg(a.img, a.grout, a.widthMm, a.name, p),
    towers: (a, p) => towers(a.colorGrid, a.w, a.h, a.cell, a.order, a.counts, a.isLine, a.o, p),
    photoMosaic: (a, p) => photoMosaic(a, p),
    gcode: (a, p) => readGcode(a.text, p),
    view3d: (a) => viewMesh(a.shape, a.o),
    export3d: (a, p) => exportModel(a, p),
    inpaint: (a, p) => ({ width: a.img.width, height: a.img.height, data: inpaint(a.img, a.mask, p) }),
    adjust: (a) => ({ width: a.img.width, height: a.img.height, data: applyAdjust(a.img.data, a.img.width, a.img.height, a.adjust) })
  };

  // src/shared/work.ts
  var Cancelled = class extends Error {
    constructor() {
      super("cancelled");
    }
  };
  var isCancelled = (e) => e instanceof Cancelled;
  var lanes = /* @__PURE__ */ new Map();
  var url = "";
  var noWorkers = false;
  var seq = 0;
  function spawn() {
    if (noWorkers || typeof Worker === "undefined") return null;
    try {
      url || (url = URL.createObjectURL(new Blob([worker_source_default], { type: "text/javascript" })));
      return new Worker(url);
    } catch {
      noWorkers = true;
      return null;
    }
  }
  async function runHere(job, args, progress) {
    await new Promise((r) => setTimeout(r, 0));
    return jobs[job](args, progress || (() => {
    }));
  }
  function run2(job, args, o = {}) {
    const name = o.lane || job, old = lanes.get(name);
    if (old) {
      old.worker?.terminate();
      old.reject(new Cancelled());
      lanes.delete(name);
    }
    const worker = spawn();
    if (!worker) return runHere(job, args, o.progress);
    return new Promise((resolve, reject) => {
      const lane = { worker, id: ++seq, resolve, reject, progress: o.progress, job, args };
      lanes.set(name, lane);
      const finish = () => {
        worker.terminate();
        if (lanes.get(name) === lane) lanes.delete(name);
      };
      worker.onmessage = (e) => {
        const m = e.data;
        if (m.id !== lane.id) return;
        if (m.progress != null) {
          lane.progress?.(m.progress);
          return;
        }
        finish();
        if (m.error != null) reject(new Error(m.error));
        else resolve(m.result);
      };
      worker.onerror = (e) => {
        e.preventDefault?.();
        finish();
        noWorkers = true;
        runHere(job, args, o.progress).then(resolve, reject);
      };
      worker.postMessage({ id: lane.id, job, args });
    });
  }

  // src/features/automosaic.ts
  var { state: state6 } = MZ;
  var MAX_TILES = 8e3;
  var opts = { style: "square", size: 10, detail: 50, colors: "palette", count: 12, replace: true };
  loadSettings("mz-automosaic", opts);
  var save2 = () => saveSettings("mz-automosaic", opts);
  function estimate() {
    const d = state6.doc, per = { square: 1, brick: 2, hex: Math.sqrt(3) / 2, irregular: 1 }[opts.style] || 1;
    const base = d.w * d.h / (opts.size * opts.size * per);
    return Math.round(opts.detail > 0 && opts.style !== "hex" ? base * (0.5 + opts.detail / 100) : base);
  }
  function renderUI() {
    $("#am-style").value = opts.style;
    $("#am-size").value = opts.size;
    $("#am-detail").value = opts.detail;
    $("#am-detail-row").hidden = opts.style === "hex";
    $("#am-count").value = opts.count;
    for (const r of document.querySelectorAll("input[name=am-colors]")) r.checked = r.value === opts.colors;
    $("#am-replace").checked = opts.replace;
    $("#am-photo-missing").hidden = !!MZ.refImage();
    const n4 = estimate();
    $("#am-estimate").textContent = n4 > MAX_TILES ? t("About {n} tiles – too many, use a bigger tile size.", { n: n4 }) : t("About {n} tiles.", { n: n4 });
    $("#am-go").disabled = !MZ.refImage() || n4 > MAX_TILES;
  }
  async function generate(progress) {
    const photo = await PhotoTools.photoPixels();
    if (!photo) {
      MZ.toast(t("Load a photo first."));
      return;
    }
    const d = state6.doc;
    const res = await run2("photoMosaic", {
      photo,
      page: { x: d.x, y: d.y, w: d.w, h: d.h },
      style: opts.style,
      size: opts.size,
      detail: opts.detail,
      seed: (Date.now() & 65535) + 1,
      eps,
      maxTiles: MAX_TILES * 1.5,
      suggest: opts.colors === "suggest" ? Math.max(2, Math.min(64, opts.count)) : 0
    }, { progress: (f) => progress(f * 0.7) });
    if (!res.lines.length) {
      MZ.toast(t("That gives {n} tiles – use a bigger tile size.", { n: res.tiles }));
      return;
    }
    const segs = res.lines;
    if (opts.replace) {
      if (MZ.hasContent()) await MZ.saveVersion(t("Before making a mosaic from the photo"));
      MZ.clearDrawing();
    }
    if (opts.colors === "suggest") {
      const cols = res.palette;
      const name = MZ.addPalette(t("From photo"), cols);
      MZ.toast(t("New palette “{name}” with {n} {n|color|colors}.", { name, n: cols.length }));
    }
    MZ.addLineSegments(segs);
    const r = await PhotoTools.colorTiles({ onlyUnpainted: false, commit: false, quiet: true });
    MZ.commit();
    MZ.toast(t("Made a mosaic of {n} tiles from the photo.", { n: r ? r.painted : 0 }));
  }
  $("#btn-automosaic").onclick = () => {
    renderUI();
    $("#dlg-automosaic").showModal();
  };
  var sel = $("#am-style");
  for (const [v, label2] of STYLES) {
    const o = document.createElement("option");
    o.value = v;
    o.textContent = t(label2);
    sel.append(o);
  }
  sel.onchange = () => {
    opts.style = sel.value;
    save2();
    renderUI();
  };
  $("#am-size").onchange = (e) => {
    const v = parseFloat(e.target.value);
    if (v > 0) opts.size = v;
    save2();
    renderUI();
  };
  $("#am-detail").oninput = (e) => {
    opts.detail = +e.target.value;
    save2();
    renderUI();
  };
  $("#am-count").onchange = (e) => {
    const v = Math.round(+e.target.value);
    if (v >= 2 && v <= 64) opts.count = v;
    save2();
    renderUI();
  };
  for (const r of document.querySelectorAll("input[name=am-colors]")) r.onchange = () => {
    if (r.checked) {
      opts.colors = r.value;
      save2();
    }
  };
  $("#am-replace").onchange = (e) => {
    opts.replace = e.target.checked;
    save2();
  };
  $("#am-load").onclick = () => $("#ref-file").click();
  $("#ref-file").addEventListener("change", () => setTimeout(renderUI, 600));
  $("#am-go").onclick = async () => {
    const go = $("#am-go");
    go.disabled = true;
    go.textContent = t("Working…");
    try {
      await generate((f) => {
        go.textContent = t("Working… {p} %", { p: Math.round(f * 100) });
      });
    } catch (e) {
      if (!isCancelled(e)) MZ.toast(t("Could not make the mosaic."));
    } finally {
      go.textContent = t("Make mosaic");
      go.disabled = false;
      $("#dlg-automosaic").close();
    }
  };

  // src/lib/layplan.ts
  function panels(box4, pw, ph) {
    const cols = Math.max(1, Math.ceil(box4.w / pw - 1e-9)), rows = Math.max(1, Math.ceil(box4.h / ph - 1e-9)), out = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const x = box4.x + c * pw, y = box4.y + r * ph;
      out.push({ index: out.length + 1, row: r, col: c, x, y, w: Math.min(pw, box4.x + box4.w - x), h: Math.min(ph, box4.y + box4.h - y) });
    }
    return { rows, cols, panels: out };
  }
  function panelAt(plan, p) {
    return plan.panels.find((q) => p.x >= q.x && p.x < q.x + q.w + 1e-9 && p.y >= q.y && p.y < q.y + q.h + 1e-9) || null;
  }
  function countByPanel(plan, tiles) {
    const out = new Map(plan.panels.map((q) => [q.index, /* @__PURE__ */ new Map()]));
    for (const t2 of tiles) {
      const q = panelAt(plan, t2.p);
      if (!q) continue;
      const m = out.get(q.index);
      m.set(t2.color, (m.get(t2.color) || 0) + 1);
    }
    return out;
  }

  // src/features/layplan.ts
  var LayPlan = (() => {
    const { state: state11 } = MZ;
    const opts3 = { w: 0, h: 0, numbers: true, grid: true, paper: "a4" };
    loadSettings("mz-layplan", opts3);
    const save4 = () => saveSettings("mz-layplan", opts3);
    const box4 = () => ({ x: state11.doc.x, y: state11.doc.y, w: state11.doc.w, h: state11.doc.h });
    const k = () => MM[MZ.unit()] || MM.px;
    const panelSize = () => ({ w: opts3.w > 0 ? opts3.w : 300 / k(), h: opts3.h > 0 ? opts3.h : 300 / k() });
    const plan = () => {
      const s = panelSize();
      return panels(box4(), s.w, s.h);
    };
    function drawGrid(show2) {
      const g = $("#mz-panels");
      g.innerHTML = "";
      if (!show2) return;
      const NS = "http://www.w3.org/2000/svg";
      for (const q of plan().panels) {
        const r = document.createElementNS(NS, "rect");
        for (const [a, v] of [["x", q.x], ["y", q.y], ["width", q.w], ["height", q.h]]) r.setAttribute(a, String(v));
        r.setAttribute("class", "panel-rect");
        g.appendChild(r);
        const t2 = document.createElementNS(NS, "text");
        t2.setAttribute("x", String(q.x + q.w / 2));
        t2.setAttribute("y", String(q.y + q.h / 2));
        t2.setAttribute("font-size", String(Math.min(q.w, q.h) / 5));
        t2.setAttribute("class", "panel-label");
        t2.textContent = String(q.index);
        g.appendChild(t2);
      }
    }
    function renderUI2() {
      const s = panelSize(), P2 = plan(), u = MZ.unit();
      $("#lp-w").value = MZ.fmt(s.w);
      $("#lp-h").value = MZ.fmt(s.h);
      for (const el of document.querySelectorAll("#dlg-layplan .unit-label")) el.textContent = u;
      $("#lp-numbers").checked = opts3.numbers;
      $("#lp-grid").checked = opts3.grid;
      $("#lp-paper").value = opts3.paper;
      const L = layout(s.w * k(), s.h * k(), opts3.paper, "real");
      $("#lp-info").textContent = t("{n} {n|panel|panels} ({rows} × {cols}) · each printed at real size on {s} {paper} {s|sheet|sheets}.", { n: P2.panels.length, rows: P2.rows, cols: P2.cols, s: L.sheets.length, paper: L.paper.name });
      drawGrid(opts3.grid);
    }
    function tiles() {
      const out = [];
      for (const el of MZ.allShapes()) {
        const c = MZ.fillOf(el);
        if (!c) continue;
        const p = MZ.gridSample(MZ.geomOf(el).bbox, (q) => MZ.insideEl(el, q), 1)[0];
        if (p) out.push({ p, color: c });
      }
      return out;
    }
    function printPlan() {
      const P2 = plan(), K = k(), B = box4(), u = MZ.unit();
      const { art, rows, nums } = PrintTools.art(opts3.numbers ? "both" : "colors");
      const title = MZ.fileName.replace(/\.svg$/i, "");
      const sheetsFor2 = (o) => P2.panels.reduce((s, q) => s + layout(q.w * K, q.h * K, opts3.paper, "real", o).sheets.length, 0);
      const orientation = sheetsFor2("landscape") < sheetsFor2("portrait") ? "landscape" : "portrait";
      const A = area(opts3.paper, orientation);
      const sections = [overviewSection(
        B,
        K,
        A,
        P2.panels.map((q) => ({ ...q, label: String(q.index) })),
        `${title} – ` + t("laying plan: {n} {n|panel|panels} ({rows} rows × {cols} columns) of {w} × {h} {unit}", { n: P2.panels.length, rows: P2.rows, cols: P2.cols, w: MZ.fmt(panelSize().w), h: MZ.fmt(panelSize().h), unit: u })
      )];
      for (const q of P2.panels) {
        const L = layout(q.w * K, q.h * K, opts3.paper, "real", orientation);
        sections.push(...sheetSections({ x: q.x, y: q.y, w: q.w, h: q.h }, K, L, {
          title: t("Panel {n} – row {row}, column {col}", { n: q.index, row: q.row + 1, col: q.col + 1 }),
          prefix: t("Panel {n}", { n: q.index }) + " · "
        }));
      }
      const counts = countByPanel(P2, tiles());
      const chip = (c) => `<span style="background:${c}"></span>`;
      const table = `<table class="counts"><tr><td class="n">${t("Panel")}</td>${rows.map((r) => `<td class="n">${chip(r.c)} ${r.n}</td>`).join("")}</tr>` + P2.panels.map((q) => `<tr><td class="n">${q.index}</td>${rows.map((r) => `<td>${counts.get(q.index).get(r.c) || ""}</td>`).join("")}</tr>`).join("") + "</table>";
      sections.push(`<section class="sheet"><div class="label">${esc(title)} – ${t("tiles per panel and color")}</div>${table}</section>`);
      if (rows.length) sections.push(`<section class="sheet legend">${PrintTools.legend(rows)}</section>`);
      openPrintPage(page({ art, sections, paper: opts3.paper, orientation, title: `${title} – ${t("laying plan")}` }));
      void nums;
    }
    $("#btn-layplan").onclick = () => {
      renderUI2();
      $("#dlg-layplan").showModal();
    };
    $("#dlg-layplan").addEventListener("close", () => drawGrid(false));
    for (const id of ["#lp-w", "#lp-h"]) {
      $(id).onchange = () => {
        const w = parseFloat($("#lp-w").value), h = parseFloat($("#lp-h").value);
        if (w > 0) opts3.w = w;
        if (h > 0) opts3.h = h;
        save4();
        renderUI2();
      };
    }
    $("#lp-numbers").onchange = (e) => {
      opts3.numbers = e.target.checked;
      save4();
    };
    $("#lp-grid").onchange = (e) => {
      opts3.grid = e.target.checked;
      save4();
      renderUI2();
    };
    $("#lp-paper").onchange = (e) => {
      opts3.paper = e.target.value;
      save4();
      renderUI2();
    };
    $("#lp-go").onclick = () => {
      drawGrid(false);
      $("#dlg-layplan").close();
      printPlan();
    };
    return { panels, panelAt, countByPanel };
  })();

  // src/features/mix.ts
  var { state: state7 } = MZ;
  var mix = { on: false, colors: [], avoid: true };
  loadSettings("mz-mix", mix);
  var save3 = () => saveSettings("mz-mix", mix);
  var active = () => mix.on && mix.colors.length >= 2;
  function pick(reg) {
    let options = mix.colors;
    if (mix.avoid && reg) {
      const taken = MZ.neighbourColors(reg), free = options.filter((c) => !taken.has(c));
      if (free.length) options = free;
    }
    return options[Math.floor(Math.random() * options.length)];
  }
  var chooser = (q, face, ctx2) => pick(face ? ctx2.ix.region(face) : null);
  function render() {
    MZ.setFillChooser(active() ? chooser : null);
    $("#mix-on").checked = mix.on;
    $("#mix-avoid").checked = mix.avoid;
    const box4 = $("#mix-colors");
    box4.innerHTML = "";
    for (const c of mix.colors) {
      const chip = document.createElement("span");
      chip.className = "mix-chip";
      chip.style.background = c;
      chip.title = t("{c} – click to remove from the mix", { c });
      chip.onclick = () => toggle(c);
      box4.append(chip);
    }
    $("#mix-hint").textContent = mix.colors.length < 2 ? t("Shift+click two or more swatches to put them in the mix.") : t("Each tile gets one of these {n} colors at random. Shift+click swatches to change the mix.", { n: mix.colors.length });
    $("#btn-mix-sel").hidden = mix.colors.length < 2;
    markSwatches();
    save3();
  }
  function markSwatches() {
    const sw = document.querySelectorAll("#palette .swatch");
    [null, ...state7.palette].forEach((c, i) => sw[i] && sw[i].classList.toggle("in-mix", !!c && active() && mix.colors.includes(c)));
  }
  function toggle(c) {
    const i = mix.colors.indexOf(c);
    if (i >= 0) mix.colors.splice(i, 1);
    else mix.colors.push(c);
    if (mix.colors.length >= 2 && i < 0) mix.on = true;
    render();
  }
  function mixSelection() {
    if (!active()) {
      MZ.toast(t("Put at least two colors in the mix first (Shift+click swatches)."));
      return;
    }
    const ix = MZ.regionIndex();
    let n4 = 0;
    for (const el of state7.selection) {
      if (!MZ.fillOf(el)) continue;
      const g = MZ.geomOf(el), p = MZ.gridSample(g.bbox, (q) => MZ.insideEl(el, q), 1)[0], f = p && ix.locate(p);
      MZ.paintFill(el, pick(f ? ix.region(f) : null));
      n4++;
    }
    if (n4) MZ.commit(true);
    MZ.toast(n4 ? t("Mixed the colors of {n} {n|area|areas}.", { n: n4 }) : t("Select painted areas first."));
  }
  MZ.on("swatch-shift", (c) => {
    if (c) toggle(c);
  });
  MZ.on("palette", markSwatches);
  $("#mix-on").onchange = (e) => {
    mix.on = e.target.checked;
    if (mix.on && mix.colors.length < 2) MZ.toast(t("Shift+click two or more swatches to put them in the mix."));
    render();
  };
  $("#mix-avoid").onchange = (e) => {
    mix.avoid = e.target.checked;
    render();
  };
  $("#btn-mix-sel").onclick = mixSelection;
  render();

  // src/features/pages.ts
  var Pages = (() => {
    const { state: state11 } = MZ;
    const attr = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
    const XML = '<?xml version="1.0" encoding="UTF-8"?>\n';
    let pages = [{ name: t("Page {n}", { n: 1 }), svg: null, history: null, view: null }], cur = 0, switching = false;
    function tag(svg3, name, index) {
      return svg3.replace(/^<\?xml[^>]*>\s*/, "").replace(/<svg\b([^>]*)>/, (m, attrs) => `<svg${attrs.replace(/\s+data-page-(name|index)="[^"]*"/g, "")} data-page-name="${attr(name)}" data-page-index="${index}">`);
    }
    MZ.on("serialize", (out, opts3) => {
      out = XML + tag(out, pages[cur].name, cur);
      if (opts3.pageOnly || pages.length < 2) return out;
      const others = pages.map((p, i) => i === cur ? "" : tag(p.svg, p.name, i)).join("\n");
      return out.replace(/<\/svg>\s*$/, `<g id="mosaic-pages" display="none">
${others}
</g>
</svg>`);
    });
    MZ.on("deserialize", (root) => {
      if (switching) return;
      const list = [{ index: +root.getAttribute("data-page-index") || 0, name: root.getAttribute("data-page-name") || t("Page {n}", { n: 1 }), svg: null }];
      const group = root.querySelector('[id="mosaic-pages"]');
      if (group) {
        for (const s of group.children) {
          if (s.localName !== "svg") continue;
          list.push({ index: +s.getAttribute("data-page-index"), name: s.getAttribute("data-page-name") || "Page", svg: XML + new XMLSerializer().serializeToString(s) });
        }
      }
      list.sort((a, b) => a.index - b.index);
      pages = list.map((p) => ({ name: p.name, svg: p.svg, history: null, view: null }));
      cur = pages.findIndex((p) => p.svg === null);
      render3();
    });
    MZ.on("reset", () => {
      pages = [{ name: t("Page {n}", { n: 1 }), svg: null, history: null, view: null }];
      cur = 0;
      render3();
    });
    function capture2() {
      const p = pages[cur];
      p.svg = MZ.buildSVGString({ pageOnly: true });
      p.history = MZ.getHistory();
      p.view = { ...state11.view };
    }
    function show2(i) {
      cur = i;
      const p = pages[i];
      switching = true;
      try {
        MZ.loadSVGText(p.svg, { restore: true, quiet: true });
      } finally {
        switching = false;
      }
      p.svg = null;
      if (p.history) MZ.setHistory(p.history);
      if (p.view) {
        Object.assign(state11.view, p.view);
        MZ.updateView();
      }
      render3();
      MZ.docChanged();
    }
    function switchTo(i) {
      if (i === cur || !pages[i]) return;
      capture2();
      show2(i);
    }
    function blankPage() {
      const d = state11.doc, u = MZ.unit(), size = (v) => v + (u === "px" ? "" : u);
      return `${XML}<svg xmlns="http://www.w3.org/2000/svg" viewBox="${d.x} ${d.y} ${d.w} ${d.h}" width="${size(d.w)}" height="${size(d.h)}"><metadata id="mosaic-palette">{"unit":"${u}"}</metadata><rect id="mosaic-bg" x="${d.x}" y="${d.y}" width="${d.w}" height="${d.h}" fill="#ffffff"/><g id="mosaic-fills"/><g id="mosaic-shapes"/></svg>`;
    }
    function add(duplicate2) {
      capture2();
      const src = pages[cur];
      pages.splice(cur + 1, 0, {
        name: duplicate2 ? t("{name} copy", { name: src.name }) : t("Page {n}", { n: pages.length + 1 }),
        svg: duplicate2 ? src.svg : blankPage(),
        history: null,
        view: duplicate2 ? { ...src.view } : null
      });
      show2(cur + 1);
      if (!duplicate2) MZ.fitView();
    }
    async function rename(i) {
      const n4 = await ask(t("Page name:"), pages[i].name);
      if (!n4 || !n4.trim()) return;
      pages[i].name = n4.trim();
      render3();
      MZ.docChanged();
    }
    async function remove(i) {
      if (pages.length < 2) {
        MZ.toast(t("A project needs at least one page."));
        return;
      }
      if (!await askYes(t("Delete the page “{name}”? (A copy of the project is kept in History.)", { name: pages[i].name }))) return;
      MZ.saveVersion(t("Before deleting the page {name}", { name: pages[i].name }));
      if (i === cur) {
        pages.splice(i, 1);
        show2(Math.min(i, pages.length - 1));
      } else {
        pages.splice(i, 1);
        if (i < cur) cur--;
        render3();
        MZ.docChanged();
      }
    }
    function move(i, by) {
      const j = i + by;
      if (j < 0 || j >= pages.length) return;
      [pages[i], pages[j]] = [pages[j], pages[i]];
      if (cur === i) cur = j;
      else if (cur === j) cur = i;
      render3();
      MZ.docChanged();
    }
    function closeMenu() {
      const m = $("#page-menu");
      if (m) m.remove();
    }
    function openMenu(i, anchor) {
      closeMenu();
      const m = document.createElement("div");
      m.id = "page-menu";
      for (const [label2, fn, ok] of [
        [t("Rename…"), () => rename(i), true],
        [t("Duplicate"), () => add(true), true],
        [t("Move left"), () => move(i, -1), i > 0],
        [t("Move right"), () => move(i, 1), i < pages.length - 1],
        [t("Delete…"), () => remove(i), pages.length > 1]
      ]) {
        const b = document.createElement("button");
        b.textContent = label2;
        b.disabled = !ok;
        b.onclick = () => {
          closeMenu();
          fn();
        };
        m.append(b);
      }
      document.body.append(m);
      const r = anchor.getBoundingClientRect();
      m.style.left = Math.min(r.left, innerWidth - m.offsetWidth - 8) + "px";
      m.style.top = r.top - m.offsetHeight - 4 + "px";
    }
    document.addEventListener("pointerdown", (e) => {
      if (!e.target.closest("#page-menu, .page-more")) closeMenu();
    });
    function render3() {
      const box4 = $("#page-tabs");
      box4.innerHTML = "";
      pages.forEach((p, i) => {
        const tab = document.createElement("div");
        tab.className = "page-tab" + (i === cur ? " active" : "");
        const b = document.createElement("button");
        b.textContent = p.name;
        b.title = i === cur ? t("Double-click to rename") : t("Switch to this page");
        b.onclick = () => switchTo(i);
        b.ondblclick = () => rename(i);
        tab.append(b);
        if (i === cur) {
          const more = document.createElement("button");
          more.className = "page-more";
          more.textContent = "⋯";
          more.title = t("Page options");
          more.onclick = () => openMenu(i, more);
          tab.append(more);
        }
        box4.append(tab);
      });
    }
    $("#page-add").onclick = () => add(false);
    render3();
    return { switchTo, add, get count() {
      return pages.length;
    }, get current() {
      return cur;
    }, get names() {
      return pages.map((p) => p.name);
    } };
  })();

  // src/features/snippets.ts
  var Snippets = (() => {
    const NS = "http://www.w3.org/2000/svg";
    const MM2 = { mm: 1, cm: 10, in: 25.4, px: 25.4 / 96 };
    const n4 = (v) => String(Math.round(v * 1e3) / 1e3);
    function fromElements(els) {
      const fills = [], shapes = [];
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      const ordered = [...els].sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
      for (const el of ordered) {
        const c = el.cloneNode(true), m = MZ.elMatrix(el);
        if (!m.isIdentity) c.setAttribute("transform", m.toString());
        else c.removeAttribute("transform");
        (MZ.isFill(el) ? fills : shapes).push(c);
        const b = MZ.geomOf(el).bbox;
        if (Number.isFinite(b.x0)) {
          x0 = Math.min(x0, b.x0);
          y0 = Math.min(y0, b.y0);
          x1 = Math.max(x1, b.x1);
          y1 = Math.max(y1, b.y1);
        }
      }
      if (!Number.isFinite(x0)) return null;
      const root = document.createElementNS(NS, "svg");
      root.setAttribute("data-mosaic-snippet", "1");
      root.setAttribute("data-unit", MZ.unit());
      root.setAttribute("viewBox", [x0, y0, x1 - x0, y1 - y0].map(n4).join(" "));
      for (const [layer2, list] of [["fills", fills], ["shapes", shapes]]) {
        const g = document.createElementNS(NS, "g");
        g.setAttribute("data-layer", layer2);
        for (const c of list) g.appendChild(c);
        root.appendChild(g);
      }
      return new XMLSerializer().serializeToString(root);
    }
    const isSnippet = (text) => /^\s*(<\?xml[^>]*>\s*)?<svg[\s>]/i.test(text) && /data-mosaic-snippet/.test(text);
    function parse2(text) {
      const xml = new DOMParser().parseFromString(text, "image/svg+xml"), root = xml.documentElement;
      if (!root || root.localName !== "svg" || xml.getElementsByTagName("parsererror").length) return null;
      root.querySelectorAll("script,foreignObject").forEach((e) => e.remove());
      const vb = (root.getAttribute("viewBox") || "0 0 0 0").split(/[\s,]+/).map(Number);
      return { root, box: { x: vb[0], y: vb[1], w: vb[2], h: vb[3] }, unit: root.getAttribute("data-unit") || "px" };
    }
    function placement(snip, at, angle = 0) {
      const k = (MM2[snip.unit] || 1) / (MM2[MZ.unit()] || 1), cx = snip.box.x + snip.box.w / 2, cy = snip.box.y + snip.box.h / 2;
      return new DOMMatrix().translateSelf(at.x, at.y).rotateSelf(angle).scaleSelf(k).translateSelf(-cx, -cy);
    }
    const mapPt = (m, x, y) => ({ x: m.a * x + m.c * y + m.e, y: m.b * x + m.d * y + m.f });
    function mapElement(el, m) {
      const scale = Math.sqrt(Math.abs(m.a * m.d - m.b * m.c)), angle = Math.atan2(m.b, m.a) * 180 / Math.PI;
      const has = el.hasAttribute("transform"), tag = el.localName;
      if (!has && tag === "line") {
        const a = mapPt(m, +el.getAttribute("x1"), +el.getAttribute("y1")), b = mapPt(m, +el.getAttribute("x2"), +el.getAttribute("y2"));
        el.setAttribute("x1", n4(a.x));
        el.setAttribute("y1", n4(a.y));
        el.setAttribute("x2", n4(b.x));
        el.setAttribute("y2", n4(b.y));
      } else if (!has && (tag === "polygon" || tag === "polyline")) {
        const nums = (el.getAttribute("points") || "").match(/[-+]?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?/gi) || [];
        const pts = [];
        for (let i = 0; i + 1 < nums.length; i += 2) {
          const p = mapPt(m, +nums[i], +nums[i + 1]);
          pts.push(n4(p.x) + "," + n4(p.y));
        }
        el.setAttribute("points", pts.join(" "));
        const ng = (el.getAttribute("data-ngon") || "").split(/\s+/).map(Number);
        if (ng.length === 5 && ng.every(Number.isFinite)) {
          const c = mapPt(m, ng[1], ng[2]);
          el.setAttribute("data-ngon", [ng[0], n4(c.x), n4(c.y), n4(ng[3] * scale), n4(ng[4] + angle)].join(" "));
        }
      } else if (!has && tag === "path" && /^[\s\dMLZmlz.,eE+-]*$/.test(el.getAttribute("d") || "") && !/[mlz]/.test(el.getAttribute("d"))) {
        el.setAttribute("d", el.getAttribute("d").replace(
          /([-+]?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?)[\s,]+([-+]?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?)/gi,
          (s, x, y) => {
            const p = mapPt(m, +x, +y);
            return n4(p.x) + " " + n4(p.y);
          }
        ));
        if (el.hasAttribute("data-area")) el.setAttribute("data-area", n4(+el.getAttribute("data-area") * scale * scale));
      } else {
        el.setAttribute("transform", `${m.toString()} ${el.getAttribute("transform") || ""}`.trim());
        return;
      }
      if (scale !== 1 && el.hasAttribute("stroke-width")) el.setAttribute("stroke-width", n4(+el.getAttribute("stroke-width") * scale));
    }
    function place(snip, at, angle = 0) {
      const m = placement(snip, at, angle), out = [];
      const fillsG2 = document.querySelector("#mz-fills"), shapesG2 = document.querySelector("#mz-shapes");
      for (const g of snip.root.children) {
        const dest = g.getAttribute("data-layer") === "fills" ? fillsG2 : shapesG2;
        for (const c of [...g.children]) {
          const el = document.importNode(c, true);
          mapElement(el, m);
          dest.appendChild(el);
          out.push(el);
        }
      }
      return out;
    }
    return { fromElements, isSnippet, parse: parse2, placement, place, mapElement };
  })();

  // src/features/image-clipboard.ts
  var { state: state8 } = MZ;
  function imageSize(w, h) {
    return Math.round(clamp(Math.max(w, h) * state8.view.s * (window.devicePixelRatio || 1), 1024, 4096));
  }
  async function copyDrawing() {
    if (!canCopyImages()) {
      MZ.toast(t("This browser can’t copy images – use PNG to save one instead."));
      return;
    }
    const svg3 = MZ.buildSVGString({ photo: false, grout: state8.grout.on, pageOnly: true });
    const ok = await copyImage(svgToPng(svg3, imageSize(state8.doc.w, state8.doc.h)));
    MZ.toast(ok ? t("Copied the drawing as an image – paste it into the raster app or any other program.") : t("Could not copy the image (the browser refused)."));
  }
  $("#btn-copy-img").onclick = () => {
    if (state8.selection.size) copySelection(false, false);
    else copyDrawing();
  };
  document.addEventListener("keydown", (e) => {
    if (!(e.ctrlKey || e.metaKey) || e.shiftKey || e.altKey || e.key.toLowerCase() !== "c") return;
    if (MZ.typingIn(e.target) || state8.selection.size || modalOpen()) return;
    if (window.getSelection && String(window.getSelection())) return;
    e.preventDefault();
    copyDrawing();
  });

  // src/features/motifs.ts
  var { state: state9 } = MZ;
  var lastPointer = null;
  var internalClip = null;
  MZ.svg.addEventListener("pointermove", (e) => {
    lastPointer = MZ.toDoc(e.clientX, e.clientY);
  });
  MZ.svg.addEventListener("pointerleave", () => {
    lastPointer = null;
  });
  function target2(snip) {
    if (lastPointer) return MZ.snapPoint(lastPointer, {});
    return { x: snip.box.x + snip.box.w / 2, y: snip.box.y + snip.box.h / 2 };
  }
  var clipboardOk = false;
  var pendingCopy = null;
  function copySelection(cut, viaKey = true) {
    const text = Snippets.fromElements(state9.selection);
    if (!text) return;
    internalClip = text;
    pendingCopy = viaKey ? text : null;
    clipboardOk = false;
    if (canCopyImages()) {
      const { w, h } = svgSize(text);
      copyImage(svgToPng(text, imageSize(w, h)), text).then((ok) => {
        if (ok) clipboardOk = true;
        else if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => {
          clipboardOk = true;
        }, () => {
        });
      });
    } else if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => {
      clipboardOk = true;
    }, () => {
    });
    const n4 = state9.selection.size;
    if (cut) {
      for (const el of state9.selection) el.remove();
      MZ.setSelection([]);
      MZ.commitGeometry();
    }
    MZ.toast(cut ? t("Cut {n} {n|shape|shapes}. Paste with Ctrl+V – also in another page or drawing.", { n: n4 }) : t("Copied {n} {n|shape|shapes}. Paste with Ctrl+V – also in another page or drawing.", { n: n4 }));
  }
  document.addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    if (!(e.ctrlKey || e.metaKey) || MZ.typingIn(e.target)) return;
    if ((k === "c" || k === "x") && state9.selection.size) copySelection(k === "x");
    if (k === "v" && internalClip) {
      if (!clipboardOk) {
        e.preventDefault();
        pasteSnippet(internalClip);
        return;
      }
      pasteSeen = false;
      setTimeout(() => {
        if (!pasteSeen && internalClip) pasteSnippet(internalClip);
      }, 80);
    }
  });
  var pasteSeen = true;
  document.addEventListener("paste", () => {
    pasteSeen = true;
  }, true);
  window.addEventListener("blur", () => {
    if (!clipboardOk) internalClip = null;
  });
  for (const type of ["copy", "cut"]) {
    document.addEventListener(type, (e) => {
      if (!pendingCopy || !e.clipboardData) return;
      e.clipboardData.setData("text/plain", pendingCopy);
      e.preventDefault();
      clipboardOk = true;
      pendingCopy = null;
    });
  }
  function pasteSnippet(text) {
    const snip = Snippets.parse(text);
    if (!snip) return false;
    const els = Snippets.place(snip, target2(snip));
    if (!els.length) return false;
    if (state9.tool !== "select") MZ.setTool("select");
    MZ.commitGeometry();
    MZ.setSelection(els.filter((el) => el.isConnected));
    MZ.toast(t("Pasted {n} {n|shape|shapes}.", { n: els.length }));
    return true;
  }
  MZ.on("pasteText", (text) => {
    pasteSeen = true;
    if (Snippets.isSnippet(text)) return pasteSnippet(text);
    if (internalClip && (!clipboardOk || !text.trim())) return pasteSnippet(internalClip);
    return false;
  });
  var motifs = [];
  var placing = null;
  async function load() {
    try {
      motifs = await Store.get("motifs") || [];
    } catch {
      motifs = JSON.parse(localStorage.getItem("mz-motifs") || "[]");
    }
    render2();
  }
  async function persist() {
    try {
      await Store.set("motifs", motifs);
    } catch {
      try {
        localStorage.setItem("mz-motifs", JSON.stringify(motifs));
      } catch {
        MZ.toast(t("Could not store the motifs."));
      }
    }
  }
  var thumbs = [];
  function render2() {
    thumbs.forEach((u) => URL.revokeObjectURL(u));
    thumbs = [];
    const list = $("#motif-list");
    list.innerHTML = "";
    if (!motifs.length) {
      list.innerHTML = `<p class="note">${t("No motifs yet. Select some shapes and save them.")}</p>`;
      return;
    }
    for (const m of motifs) {
      const item = document.createElement("div");
      item.className = "motif" + (placing && placing.id === m.id ? " active" : "");
      item.title = t("{name} – click, then click on the drawing to place it", { name: m.name });
      const url2 = URL.createObjectURL(new Blob([m.svg], { type: "image/svg+xml" }));
      thumbs.push(url2);
      item.innerHTML = `<img src="${url2}" alt=""><span></span><button class="del" title="${t("Delete this motif")}">×</button>`;
      item.querySelector("span").textContent = m.name;
      item.onclick = () => startPlacing(m);
      item.querySelector(".del").onclick = async (e) => {
        e.stopPropagation();
        if (!await askYes(t("Delete the motif “{name}”?", { name: m.name }))) return;
        motifs = motifs.filter((x) => x !== m);
        await persist();
        render2();
      };
      list.append(item);
    }
  }
  async function saveSelection() {
    if (!state9.selection.size) {
      MZ.toast(t("Select the shapes of the motif first (Select tool)."));
      return;
    }
    const svg3 = Snippets.fromElements(state9.selection);
    const name = await ask(t("Name of the motif:"), t("Motif {n}", { n: motifs.length + 1 }));
    if (!name || !name.trim()) return;
    motifs.push({ id: Date.now().toString(36), name: name.trim(), svg: svg3, created: Date.now() });
    await persist();
    render2();
    MZ.toast(t("Saved the motif “{name}”.", { name: name.trim() }));
  }
  function startPlacing(m) {
    const snip = Snippets.parse(m.svg);
    if (!snip) {
      MZ.toast(t("This motif could not be read."));
      return;
    }
    placing = { id: m.id, name: m.name, snip, angle: 0 };
    MZ.setTool("place-motif");
    render2();
    if (lastPointer) preview(lastPointer);
  }
  function preview(p) {
    const g = $("#mz-preview");
    g.innerHTML = "";
    if (!placing) return;
    const at = MZ.snapPoint(p, {}), m = Snippets.placement(placing.snip, at, placing.angle);
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", m.toString());
    group.setAttribute("opacity", "0.6");
    for (const layer2 of placing.snip.root.children) for (const c of layer2.children) group.appendChild(document.importNode(c, true));
    g.appendChild(group);
  }
  MZ.registerTool("place-motif", {
    down(e, raw) {
      if (!placing) return;
      const els = Snippets.place(placing.snip, MZ.snapPoint(raw, {}), placing.angle);
      MZ.commitGeometry();
      MZ.toast(t("Placed “{name}”. Click again for another one, R turns it, Esc stops.", { name: placing.name }));
      return els;
    },
    move(e, raw) {
      preview(raw);
    },
    up() {
    }
  }, t("Click to place the motif · R: turn it by 15° (Shift+R: 90°) · Esc: stop"));
  document.addEventListener("keydown", (e) => {
    if (state9.tool !== "place-motif" || MZ.typingIn(e.target)) return;
    if (e.key === "Escape") {
      placing = null;
      MZ.setTool("select");
      render2();
    } else if (e.key.toLowerCase() === "r" && !e.ctrlKey && !e.metaKey) {
      placing.angle = (placing.angle + (e.shiftKey ? 90 : 15)) % 360;
      if (lastPointer) preview(lastPointer);
      e.stopPropagation();
    }
  }, true);
  document.addEventListener("pointerdown", (e) => {
    const b = e.target.closest?.("#tools button");
    if (b && placing) {
      placing = null;
      render2();
    }
  });
  $("#btn-motif-save").onclick = saveSelection;
  $("#btn-motif-export").onclick = () => {
    if (!motifs.length) {
      MZ.toast(t("There are no motifs to export yet."));
      return;
    }
    MZ.download(new Blob([JSON.stringify({ mosaicMotifs: 1, motifs }, null, 1)], { type: "application/json" }), "motifs.json");
  };
  $("#btn-motif-import").onclick = () => $("#motif-file").click();
  $("#motif-file").onchange = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const text = await f.text();
    e.target.value = "";
    try {
      const data = JSON.parse(text), list = Array.isArray(data) ? data : data.motifs;
      let n4 = 0;
      for (const m of list || []) {
        if (!m || typeof m.svg !== "string" || !Snippets.parse(m.svg)) continue;
        motifs.push({ id: Date.now().toString(36) + n4, name: String(m.name || "Motif"), svg: m.svg, created: Date.now() });
        n4++;
      }
      await persist();
      render2();
      MZ.toast(n4 ? t("Imported {n} {n|motif|motifs}.", { n: n4 }) : t("No motifs found in that file."));
    } catch (err) {
      console.warn(err);
      MZ.toast(t("That file is not a motif library."));
    }
  };
  load();

  // src/shared/view3d.ts
  var VS = `
attribute vec3 aPos; attribute vec3 aNormal; attribute vec3 aColor;
uniform mat4 uView; uniform float uZ;
varying vec3 vColor; varying vec3 vNormal;
void main() {
  vec3 p = vec3(aPos.xy, aPos.z * uZ);
  vec3 n = normalize(vec3(aNormal.xy * uZ, aNormal.z));
  vNormal = n; vColor = aColor;
  gl_Position = uView * vec4(p, 1.0);
}`;
  var FS = `
precision mediump float;
varying vec3 vColor; varying vec3 vNormal;
uniform vec3 uLight;
void main() {
  float d = max(dot(normalize(vNormal), uLight), 0.0);
  gl_FragColor = vec4(vColor * (0.45 + 0.6 * d), 1.0);
}`;
  var mul = (a, b) => {
    const o = new Float32Array(16);
    for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
      let s = 0;
      for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
      o[c * 4 + r] = s;
    }
    return o;
  };
  var perspective = (fov, aspect, near, far) => {
    const f = 1 / Math.tan(fov / 2), nf = 1 / (near - far);
    return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
  };
  var translate = (x, y, z) => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]);
  var rotX = (a) => {
    const c = Math.cos(a), s = Math.sin(a);
    return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
  };
  var rotZ = (a) => {
    const c = Math.cos(a), s = Math.sin(a);
    return new Float32Array([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  };
  function createView3D(canvas) {
    const gl = canvas.getContext("webgl", { antialias: true, preserveDrawingBuffer: true });
    if (!gl) return null;
    const shader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
    const loc = { pos: gl.getAttribLocation(prog, "aPos"), normal: gl.getAttribLocation(prog, "aNormal"), color: gl.getAttribLocation(prog, "aColor") };
    const uView = gl.getUniformLocation(prog, "uView"), uZ = gl.getUniformLocation(prog, "uZ"), uLight = gl.getUniformLocation(prog, "uLight");
    const buffers = { pos: gl.createBuffer(), normal: gl.createBuffer(), color: gl.createBuffer() };
    let count = 0, center = [0, 0, 0], radius = 1, exaggeration = 3;
    const cam = { yaw: -0.5, pitch: 0.85, dist: 3 };
    function upload(name, data) {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers[name]);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    }
    function show2(mesh, colorOf) {
      const V = mesh.vertices, T = mesh.triangles, n4 = T.length / 3;
      const pos = new Float32Array(n4 * 9), nor = new Float32Array(n4 * 9), col = new Float32Array(n4 * 9);
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity, z1 = 0;
      for (let t2 = 0; t2 < n4; t2++) {
        const a = T[t2 * 3] * 3, b = T[t2 * 3 + 1] * 3, c = T[t2 * 3 + 2] * 3;
        const ux = V[b] - V[a], uy = V[b + 1] - V[a + 1], uz = V[b + 2] - V[a + 2];
        const vx = V[c] - V[a], vy = V[c + 1] - V[a + 1], vz = V[c + 2] - V[a + 2];
        let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        const L = Math.hypot(nx, ny, nz) || 1;
        nx /= L;
        ny /= L;
        nz /= L;
        const rgb = colorOf(mesh.levels[t2]);
        const shade = Math.abs(nz) > 0.5 ? 1 : 0.85;
        [a, b, c].forEach((p, k) => {
          const o = t2 * 9 + k * 3;
          pos[o] = V[p];
          pos[o + 1] = V[p + 1];
          pos[o + 2] = V[p + 2];
          nor[o] = nx;
          nor[o + 1] = ny;
          nor[o + 2] = nz;
          col[o] = rgb[0] / 255 * shade;
          col[o + 1] = rgb[1] / 255 * shade;
          col[o + 2] = rgb[2] / 255 * shade;
          x0 = Math.min(x0, V[p]);
          x1 = Math.max(x1, V[p]);
          y0 = Math.min(y0, V[p + 1]);
          y1 = Math.max(y1, V[p + 1]);
          z1 = Math.max(z1, V[p + 2]);
        });
      }
      upload("pos", pos);
      upload("normal", nor);
      upload("color", col);
      count = n4 * 3;
      center = [(x0 + x1) / 2, (y0 + y1) / 2, 0];
      radius = Math.max(1e-3, Math.hypot(x1 - x0, y1 - y0) / 2, z1);
      render3();
    }
    function render3() {
      const dpr = window.devicePixelRatio || 1, w = Math.round(canvas.clientWidth * dpr) || canvas.width, h = Math.round(canvas.clientHeight * dpr) || canvas.height;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.clearColor(0.15, 0.16, 0.18, 1);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      if (!count) return;
      gl.enable(gl.DEPTH_TEST);
      gl.useProgram(prog);
      const proj = perspective(0.7, w / h, radius * 0.05, radius * 20);
      const view = mul(translate(0, 0, -radius * cam.dist), mul(rotX(-cam.pitch), mul(rotZ(cam.yaw), translate(-center[0], -center[1], -center[2]))));
      gl.uniformMatrix4fv(uView, false, mul(proj, view));
      gl.uniform1f(uZ, exaggeration);
      const lx = 0.3, ly = -0.5, lz = 0.8, ll = Math.hypot(lx, ly, lz);
      gl.uniform3f(uLight, lx / ll, ly / ll, lz / ll);
      for (const [name, at] of [["pos", loc.pos], ["normal", loc.normal], ["color", loc.color]]) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers[name]);
        gl.enableVertexAttribArray(at);
        gl.vertexAttribPointer(at, 3, gl.FLOAT, false, 0, 0);
      }
      gl.drawArrays(gl.TRIANGLES, 0, count);
    }
    function reset() {
      cam.yaw = -0.5;
      cam.pitch = 0.85;
      cam.dist = 3;
      render3();
    }
    const pointers2 = /* @__PURE__ */ new Map();
    let pinch2 = 0;
    canvas.style.touchAction = "none";
    canvas.addEventListener("pointerdown", (e) => {
      pointers2.set(e.pointerId, { x: e.clientX, y: e.clientY });
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
      }
      if (pointers2.size === 2) {
        const [a, b] = [...pointers2.values()];
        pinch2 = Math.hypot(a.x - b.x, a.y - b.y);
      }
    });
    canvas.addEventListener("pointermove", (e) => {
      const p = pointers2.get(e.pointerId);
      if (!p) return;
      if (pointers2.size === 2) {
        pointers2.set(e.pointerId, { x: e.clientX, y: e.clientY });
        const [a, b] = [...pointers2.values()], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (pinch2) cam.dist = Math.min(8, Math.max(0.4, cam.dist * pinch2 / d));
        pinch2 = d;
      } else {
        cam.yaw += (e.clientX - p.x) * 0.01;
        cam.pitch = Math.min(1.5, Math.max(0, cam.pitch - (e.clientY - p.y) * 0.01));
        pointers2.set(e.pointerId, { x: e.clientX, y: e.clientY });
      }
      render3();
    });
    const end = (e) => {
      pointers2.delete(e.pointerId);
      pinch2 = 0;
    };
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", end);
    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      cam.dist = Math.min(8, Math.max(0.4, cam.dist * Math.exp(e.deltaY * 1e-3)));
      render3();
    }, { passive: false });
    canvas.addEventListener("dblclick", reset);
    return { show: show2, setExaggeration: (k) => {
      exaggeration = k;
      render3();
    }, reset, render: render3 };
  }

  // src/shared/export3d.ts
  var MAX_CELLS = 4e6;
  var MANY_COLORS = 16;
  var MAX_RATIO = 2;
  var opts2 = {
    width: 150,
    detail: 0.4,
    layerHeight: 0.2,
    layersPerColor: 3,
    baseLayers: 3,
    minWidth: 1.2,
    /** 'height': one nozzle, colors by height; 'flat': several filaments, one part per color */
    mode: "height",
    tileLayers: 5,
    groutRecess: 2,
    slicer: "prusa",
    /** finishing, mm (0: none); the frame stands frameRaise layers above the tiles */
    frame: 0,
    frameRaise: 2,
    corner: 0,
    hole: 0,
    magnet: 0,
    magnetDepth: 2
  };
  loadSettings("mz-3d", opts2);
  var saveOpts = () => saveSettings("mz-3d", opts2);
  var f2 = (v) => String(+v.toFixed(2));
  var DIALOG = `
<form method="dialog" class="dlg-head"><h2>${t("3D print")}</h2><button title="${t("Close")}">✕</button></form>
<div class="seg-btns m3-mode"><button id="m3-mode-height">${t("One nozzle – colors by height")}</button><button id="m3-mode-flat">${t("Several filaments (AMS, MMU…) – flat")}</button></div>
<p class="note" data-mode="height">${t("A model where every color stands at its own height. Print it with one nozzle and change the filament at the layers listed below – each tile’s top then shows its color. The 3MF file already contains the filament changes for PrusaSlicer; for other slicers, the plan lists them.")}</p>
<p class="note" data-mode="flat">${t("A flat model with one part per color, for printers that switch filaments by themselves. The 3MF file already assigns filament 1, 2, … to the parts – load the filaments in the order listed below.")}</p>
<div class="row">
  <label>${t("Size")} <input id="m3-w" type="number" min="5" max="2000" step="1"> × <input id="m3-h" type="number" min="5" max="2000" step="1"> mm</label>
  <label title="${t("Size of the model’s smallest step – about your nozzle width")}">${t("Detail")} <input id="m3-detail" type="number" min="0.1" max="5" step="0.05"> mm</label>
  <label title="${t("Raised parts narrower than this – or more than twice as tall as they are wide – are lowered to what is around them, so nothing prints as a thin tower")}">${t("Thinnest part")} <input id="m3-min" type="number" min="0" max="20" step="0.1"> mm</label>
</div>
<div class="row">
  <label>${t("Layer height")} <input id="m3-lh" type="number" min="0.04" max="1" step="0.04"> mm</label>
  <label data-mode="height" title="${t("How many layers each color gets – more layers cover the color below better")}">${t("Layers per color")} <input id="m3-lpc" type="number" min="1" max="50" step="1"></label>
  <label data-mode="flat" title="${t("How thick the tiles are above the base")}">${t("Tile layers")} <input id="m3-tile" type="number" min="1" max="50" step="1"></label>
  <label data-mode="flat" title="${t("Grout colors end this many layers below the tiles, so the lines between them stay low. 0: all flat")}">${t("Grout lower by")} <input id="m3-recess" type="number" min="0" max="49" step="1"> ${t("layers")}</label>
  <label title="${t("A plate under everything, printed in the first color. 0: unpainted parts are left open")}">${t("Base layers")} <input id="m3-base" type="number" min="0" max="50" step="1"></label>
</div>
<details class="m3-finish" id="m3-finish"><summary>${t("Finishing: frame, corners, hanging hole, magnets")}</summary>
  <div class="row">
    <label title="${t("A border around the picture. With one nozzle it comes out in the top color, with several filaments in filament 1. 0: none")}">${t("Frame")} <input id="m3-frame" type="number" min="0" max="100" step="0.5"> mm</label>
    <label title="${t("How many layers the frame stands above the tiles")}">${t("raised by")} <input id="m3-raise" type="number" min="0" max="50" step="1"> ${t("layers")}</label>
    <label title="${t("Radius of the outline’s corners. 0: square")}">${t("Rounded corners")} <input id="m3-corner" type="number" min="0" max="500" step="0.5"> mm</label>
  </div>
  <div class="row">
    <label title="${t("A hole to hang it by, at the top in the middle. 0: none")}">${t("Hanging hole")} <input id="m3-hole" type="number" min="0" max="50" step="0.5"> mm</label>
    <label title="${t("Four round pockets in the bottom, one near each corner, to glue magnets in: their diameter. 0: none")}">${t("Magnets")} <input id="m3-magnet" type="number" min="0" max="50" step="0.5"> mm</label>
    <label title="${t("How deep the magnet pockets are (the magnet’s thickness)")}">${t("deep")} <input id="m3-mdepth" type="number" min="0.2" max="20" step="0.1"> mm</label>
  </div>
</details>
<p class="note warn" id="m3-note" hidden></p>
<div class="m3-body">
  <div class="m3-view">
    <div class="seg-btns m3-tabs"><button id="m3-tab-top" class="active">${t("Top view")}</button><button id="m3-tab-3d">3D</button></div>
    <canvas id="m3-preview" title="${t("Top view of the model")}"></canvas>
    <canvas id="m3-3d" title="${t("Drag to turn · wheel or two fingers to zoom · double-click to reset")}" hidden></canvas>
    <label class="grow" id="m3-zrow" hidden title="${t("Shows the heights taller than they are, to see the color bands")}">${t("Heights ×")} <input id="m3-z" type="range" min="1" max="10" value="3"></label>
  </div>
  <div class="m3-side">
    <div class="row small"><span class="note" data-mode="height">${t("Print order (bottom first):")}</span><span class="note" data-mode="flat">${t("Filaments:")}</span>
      <button id="m3-light" title="${t("Lighter colors lower: a darker layer covers a lighter one well. Lines (grout) stay at the bottom")}">${t("Light → dark")}</button>
      <button id="m3-dark">${t("Dark → light")}</button>
    </div>
    <div id="m3-order"></div>
    <p class="note" data-mode="height">${t("Grout colors are always printed first, so the lines between the tiles stay low.")}</p>
    <p class="note" data-mode="flat">${t("Grout colors come first and stay lower than the tiles. The base plate uses filament 1.")}</p>
  </div>
</div>
<p class="note" id="m3-summary"></p>
<div id="m3-check" class="m3-check" hidden aria-live="polite"></div>
<div class="row dlg-foot">
  <span id="m3-busy" class="note" aria-live="polite"></span>
  <button id="m3-check-btn" title="${t("Read the G-code your slicer made and check it against this plan: filament changes, filaments and heights")}">${t("Check G-code…")}</button>
  <input type="file" id="m3-gcode" accept=".gcode,.gco,.g" hidden>
  <button id="m3-plan" title="${t("Which filament to load at which layer, as a text file")}">${t("Plan")}</button>
  <button id="m3-stl" title="${t("Just the shape – add the filament changes from the plan in your slicer")}">STL</button>
  <label data-mode="flat">${t("3MF for")} <select id="m3-slicer"><option value="prusa">PrusaSlicer</option><option value="bambu">Bambu Studio, OrcaSlicer</option></select></label>
  <button id="m3-go" class="primary" title="${t("The model, with the filament changes for PrusaSlicer")}">${t("Download 3MF")}</button>
</div>`;
  var SMALL = 2e4;
  function initExport3D(host2, button) {
    const dlg4 = document.createElement("dialog");
    dlg4.id = "dlg-3d";
    dlg4.innerHTML = DIALOG;
    document.body.append(dlg4);
    dlg4.addEventListener("click", (e) => {
      if (e.target === dlg4) dlg4.close();
    });
    let colors = [], counts = [], grid = null, gw = 0, gh = 0, cell = opts2.detail;
    let order = [], note = "", lines2 = /* @__PURE__ */ new Set(), version = 0;
    const groutChoice = /* @__PURE__ */ new Map();
    const isLine = (ci) => lines2.has(colors[ci]);
    const buildOpts = () => ({ ...opts2, maxRatio: MAX_RATIO });
    const settings = () => printSettings(buildOpts());
    const flat = () => flatSettings(buildOpts());
    const isFlat = () => opts2.mode === "flat";
    const size = () => {
      const a = host2.aspect();
      return { w: opts2.width, h: opts2.width / a };
    };
    const normalize = () => {
      order = [...order.filter(isLine), ...order.filter((ci) => !isLine(ci))];
    };
    const busy = (text) => {
      $("#m3-busy").textContent = text;
    };
    let cached = null, cachedKey = "", wanted = "";
    function model() {
      if (!grid) return null;
      const key = [version, order.join(), [...lines2].join(), opts2.mode, opts2.tileLayers, opts2.groutRecess, opts2.layerHeight, opts2.layersPerColor, opts2.baseLayers, opts2.minWidth, cell].join("|");
      if (cached && key === cachedKey) return cached;
      const job = { colorGrid: grid, w: gw, h: gh, cell, order, counts, isLine: colors.map((_, i) => isLine(i)), o: buildOpts() };
      if (gw * gh <= SMALL) {
        cached = towers(job.colorGrid, job.w, job.h, job.cell, job.order, job.counts, job.isLine, job.o);
        cachedKey = key;
        return cached;
      }
      if (wanted !== key) {
        wanted = key;
        busy(t("Working out the model…"));
        run2("towers", job, { progress: (f) => busy(t("Working out the model… {p} %", { p: Math.round(f * 100) })) }).then((m) => {
          if (wanted !== key) return;
          cached = m;
          cachedKey = key;
          busy("");
          render3();
        }, (e) => {
          if (isCancelled(e) || wanted !== key) return;
          wanted = "";
          busy("");
          toast(t("Could not build the 3D model."));
        });
      }
      return null;
    }
    const byBrightness = (lightFirst) => (a, b) => +isLine(b) - +isLine(a) || (luminance(colors[b]) - luminance(colors[a])) * (lightFirst ? 1 : -1);
    function sortBy(lightFirst) {
      order.sort(byBrightness(lightFirst));
      render3();
    }
    async function analyse() {
      const { w, h } = size();
      cell = opts2.detail;
      if (w / cell * (h / cell) > MAX_CELLS) cell = Math.sqrt(w * h / MAX_CELLS);
      gw = Math.max(1, Math.round(w / cell));
      gh = Math.max(1, Math.round(h / cell));
      const c = await host2.render(gw, gh);
      const img = c.getContext("2d").getImageData(0, 0, gw, gh);
      const cs = host2.colors();
      const prev = order.map((i) => colors[i]);
      colors = cs.colors;
      note = cs.note || "";
      lines2 = new Set(cs.lines || []);
      for (const [col, on2] of groutChoice) {
        if (on2) lines2.add(col);
        else lines2.delete(col);
      }
      ({ grid, counts } = classify(img, colors));
      version++;
      const known = prev.filter((c2) => colors.includes(c2)).map((c2) => colors.indexOf(c2));
      const fresh = colors.map((_, i) => i).filter((i) => !known.includes(i)).sort(byBrightness(true));
      order = [...known, ...fresh];
      normalize();
      render3();
    }
    const rows = /* @__PURE__ */ new Map();
    function move(c, d) {
      const m = model(), list = m ? m.list : order.filter((i) => counts[i] > 0);
      const k = list.findIndex((ci) => colors[ci] === c), other = list[k + d];
      if (k < 0 || other == null || isLine(other) !== isLine(list[k])) return;
      const a = order.indexOf(list[k]), b = order.indexOf(other);
      [order[a], order[b]] = [order[b], order[a]];
      render3();
    }
    function toggleGrout(c) {
      const on2 = !lines2.has(c);
      groutChoice.set(c, on2);
      if (on2) lines2.add(c);
      else lines2.delete(c);
      normalize();
      render3();
    }
    function render3() {
      const { w, h } = size(), fl = isFlat();
      for (const el of dlg4.querySelectorAll("[data-mode]")) el.hidden = el.dataset.mode !== opts2.mode;
      $("#m3-mode-height").classList.toggle("active", !fl);
      $("#m3-mode-flat").classList.toggle("active", fl);
      $("#m3-go").title = fl ? t("The model, one part per color with its filament") : t("The model, with the filament changes for PrusaSlicer");
      $("#m3-stl").title = fl ? t("One STL file per color, in a ZIP – load them as parts of one object") : t("Just the shape – add the filament changes from the plan in your slicer");
      $("#m3-w").value = f2(w);
      $("#m3-h").value = f2(h);
      const m = model();
      $("#m3-go").disabled = $("#m3-stl").disabled = $("#m3-plan").disabled = !m || !m.list.length;
      if (!m) return;
      const s = settings(), list = m.list;
      const warn = [
        note,
        !fl && list.length > MANY_COLORS ? t("{n} colors make a tall print with many filament changes – reduce the colors first (Raster: “Reduce to palette”).", { n: list.length }) : "",
        cell > opts2.detail + 1e-9 ? t("Detail lowered to {d} mm for this size.", { d: num(+f2(cell)) }) : "",
        pocketNote(m)
      ].filter(Boolean).join(" ");
      $("#m3-note").hidden = !warn;
      $("#m3-note").textContent = warn;
      const plan = colorPlan(list.map((i) => colors[i]), s), total = gw * gh || 1, box4 = $("#m3-order");
      const keep = new Set(list.map((ci) => colors[ci]));
      for (const [c, el] of rows) if (!keep.has(c)) {
        el.remove();
        rows.delete(c);
      }
      list.forEach((ci, k) => {
        const c = colors[ci], p = plan[k];
        let row = rows.get(c);
        if (!row) {
          row = document.createElement("div");
          row.className = "m3-row";
          row.innerHTML = `<span class="mini" style="background:${c}"></span><code>${c}</code><button class="tag" title="${t("Grout / lines: always printed first, so they stay low")}">${t("grout")}</button><span class="note"></span><button title="${t("Print earlier (lower)")}">↑</button><button title="${t("Print later (higher)")}">↓</button>`;
          const [tag2, up2, down2] = row.querySelectorAll("button");
          tag2.onclick = () => toggleGrout(c);
          up2.onclick = () => move(c, -1);
          down2.onclick = () => move(c, 1);
          rows.set(c, row);
        }
        const share = num(Math.max(0.1, +(m.counts[k] / total * 100).toFixed(1)));
        row.querySelector(".note").textContent = fl ? t("{share} % · filament {k}", { share, k: k + 1 }) : p.z == null ? t("{share} % · layers {from}–{to}", { share, from: p.fromLayer, to: p.toLayer }) : t("{share} % · layers {from}–{to} · change at Z {z}", { share, from: p.fromLayer, to: p.toLayer, z: num(p.z, 2) });
        const [tag, up, down] = row.querySelectorAll("button");
        tag.classList.toggle("on", isLine(ci));
        up.disabled = k === 0 || isLine(list[k - 1]) !== isLine(ci);
        down.disabled = k === list.length - 1 || isLine(list[k + 1]) !== isLine(ci);
        if (box4.children[k] !== row) box4.insertBefore(row, box4.children[k] || null);
      });
      const unpainted = grid ? grid.filter((v) => v < 0).length : 0;
      const fs = flat();
      const atBase = unpainted ? " · " + (opts2.baseLayers ? t("unpainted parts stay at the base ({h} mm)", { h: num(+f2(opts2.baseLayers * opts2.layerHeight)) }) : t("unpainted parts are left open")) : "";
      const lowered = m.lowered ? " · " + t("{n} thin {n|piece|pieces} lowered so nothing prints as a thin tower", { n: m.lowered }) : "";
      let summary = !list.length ? t("Nothing is painted yet.") : (fl ? t("{n} {n|color|colors} = {n} {n|filament|filaments} · flat, {h} mm high ({layers} {layers|layer|layers})", { n: list.length, h: num(+f2((fs.baseLayers + fs.tileLayers) * fs.layerHeight)), layers: fs.baseLayers + fs.tileLayers }) : t("{n} {n|color|colors} · height {h} mm ({layers} {layers|layer|layers}) · {c} filament {c|change|changes}", { n: list.length, h: num(modelHeight(list.length, s)), layers: topLayer(list.length - 1, s), c: list.length - 1 })) + atBase + lowered;
      if (list.length && opts2.frame > 0) {
        const f = finished(m);
        summary += " · " + t("with the frame {w} × {h} mm, {z} mm high", { w: num(+f2(f.w * cell)), h: num(+f2(f.h * cell)), z: num(+f2(frameTop(list.length, buildOpts()) * opts2.layerHeight)) });
      }
      $("#m3-summary").textContent = summary;
      drawPreview(m);
      if (view) schedule3d();
    }
    let laid = null, laidKey = "";
    function finished(m) {
      const key = [cachedKey, opts2.frame, opts2.corner, opts2.hole, opts2.magnet].join("|");
      if (!laid || key !== laidKey) {
        laid = layout2(m.grid, gw, gh, cell, buildOpts());
        laidKey = key;
      }
      return laid;
    }
    const pocketDepth2 = (m) => pocketDepth(finished(m), m.list.map(isLine), buildOpts());
    function pocketNote(m) {
      if (!opts2.magnet || !m.list.length) return "";
      const d = pocketDepth2(m);
      if (!d) return t("The model is too thin for magnet pockets.");
      return d < layersOf(opts2.magnetDepth, buildOpts()) ? t("The magnet pockets are only {d} mm deep – the model is thinner there.", { d: num(+f2(d * opts2.layerHeight)) }) : "";
    }
    let view = null, timer3d;
    const schedule3d = () => {
      clearTimeout(timer3d);
      timer3d = setTimeout(update3d, 120);
    };
    function update3d() {
      if (!view || $("#m3-3d").hidden) return;
      const m = model();
      if (!m || !m.list.length) return;
      const d = downsample(m.grid, gw, gh, cell, 16e4);
      const rgb = m.list.map((ci) => rgba(colors[ci]).slice(0, 3));
      run2("view3d", { shape: { ...d, grout: m.list.map(isLine) }, o: buildOpts() }).then((mesh) => {
        view.show(mesh, (lv) => rgb[Math.max(0, lv)] || [200, 200, 200]);
      }, (e) => {
        if (!isCancelled(e)) toast(t("Could not build the 3D model."));
      });
    }
    function showTab(three) {
      if (three && !view) {
        view = createView3D($("#m3-3d"));
        if (!view) {
          toast(t("This browser can’t show 3D (WebGL is off)."));
          return;
        }
        view.setExaggeration(+$("#m3-z").value);
      }
      $("#m3-3d").hidden = !three;
      $("#m3-zrow").hidden = !three;
      $("#m3-preview").hidden = three;
      $("#m3-tab-3d").classList.toggle("active", three);
      $("#m3-tab-top").classList.toggle("active", !three);
      if (three) update3d();
    }
    function drawPreview(m) {
      const cv = $("#m3-preview");
      if (!m.list.length) return;
      const f = finished(m), k = Math.min(1, 300 / Math.max(f.w, f.h));
      cv.width = Math.max(1, Math.round(f.w * k));
      cv.height = Math.max(1, Math.round(f.h * k));
      const small = document.createElement("canvas");
      small.width = f.w;
      small.height = f.h;
      const sx = small.getContext("2d"), im = sx.createImageData(f.w, f.h), rgb = m.list.map((ci) => rgba(colors[ci]));
      const frame = rgb[isFlat() ? 0 : rgb.length - 1];
      for (let p = 0; p < f.grid.length; p++) {
        const lv = f.grid[p];
        if (lv >= 0) im.data.set(rgb[lv], p * 4);
        else if (lv === FRAME) im.data.set(frame, p * 4);
      }
      sx.putImageData(im, 0, 0);
      const x = cv.getContext("2d");
      x.imageSmoothingEnabled = k < 1;
      x.drawImage(small, 0, 0, cv.width, cv.height);
    }
    const base = () => host2.fileName().replace(/\.[a-z0-9]+$/i, "");
    function finishLines(m) {
      const out = [], list = m.list;
      if (opts2.frame > 0) {
        const top = frameTop(list.length, buildOpts()), v = { w: num(opts2.frame), layer: top, z: (top * opts2.layerHeight).toFixed(2) };
        out.push(isFlat() ? t("Frame {w} mm wide, up to layer {layer} (Z {z} mm), in filament 1.", v) : t("Frame {w} mm wide: it goes on in {color} up to layer {layer} (Z {z} mm).", { ...v, color: colors[list[list.length - 1]] }));
      }
      const d = pocketDepth2(m);
      if (d) out.push(t("Magnet pockets in the bottom: 4 × {d} mm, {depth} mm deep – glue the magnets in after printing.", { d: num(opts2.magnet), depth: (d * opts2.layerHeight).toFixed(2) }));
      return out;
    }
    function flatPlanText(m) {
      const fs = flat(), list = m.list, { w, h } = size(), slicer2 = opts2.slicer === "bambu" ? "Bambu Studio / OrcaSlicer" : "PrusaSlicer";
      const v = { name: base(), w: f2(w), h: f2(h), lh: fs.layerHeight, base: fs.baseLayers, tile: fs.tileLayers, recess: fs.groutRecess, total: f2((fs.baseLayers + fs.tileLayers) * fs.layerHeight), slicer: slicer2 };
      const lines3 = [
        t("Mosaic Paint – multi-filament plan for {name}.3mf", v),
        t("Size {w} × {h} mm · layer height {lh} mm · base {base} {base|layer|layers} · tiles {tile} {tile|layer|layers} · grout {recess} {recess|layer|layers} lower", v),
        t("Total height {total} mm.", v),
        "",
        ...list.map((ci, k) => k === 0 && fs.baseLayers ? t("Filament {k}: {color} (also the base plate)", { k: k + 1, color: colors[ci] }) : t("Filament {k}: {color}", { k: k + 1, color: colors[ci] })),
        ...finishLines(m),
        "",
        t("{slicer}: open the 3MF – every color is a part of one object with its filament already assigned. Load the filaments in this order (AMS slots, MMU…).", v),
        t("The 3MF is made for {slicer}: other slicers may read it as one part – then use the STL files.", v),
        t("STL: one file per color in a ZIP. Load them together as one object made of parts and give each its filament.")
      ];
      return lines3.join("\n") + "\n";
    }
    function planText(m) {
      if (isFlat()) return flatPlanText(m);
      const s = settings(), list = m.list, plan = colorPlan(list.map((i) => colors[i]), s), { w, h } = size();
      const v = { name: base(), w: f2(w), h: f2(h), lh: s.layerHeight, lpc: s.layersPerColor, base: s.baseLayers, total: modelHeight(list.length, s), layers: topLayer(list.length - 1, s) };
      const first = plan[0];
      const lines3 = [
        t("Mosaic Paint – 3D print plan for {name}.3mf / {name}.stl", v),
        t("Size {w} × {h} mm · layer height {lh} mm · {lpc} layers per color · base {base} layers", v),
        t("Total height {total} mm ({layers} layers). Set the slicer’s first layer height to {lh} mm too.", v),
        "",
        s.baseLayers ? t("Start with {color} – layers {from}–{to} (base plate included)", { color: first.color, from: first.fromLayer, to: first.toLayer }) : t("Start with {color} – layers {from}–{to}", { color: first.color, from: first.fromLayer, to: first.toLayer }),
        ...plan.slice(1).map((p) => t("Layer {layer} (Z {z} mm): change to {color} – layers {from}–{to}", { layer: p.changeAtLayer, z: p.z.toFixed(2), color: p.color, from: p.fromLayer, to: p.toLayer })),
        ...finishLines(m),
        "",
        t("PrusaSlicer: the 3MF file already contains these changes – open it and check the layer slider."),
        t("Other slicers (they read only the shape from the 3MF or STL) – add the changes by hand:"),
        t("- PrusaSlicer, Bambu Studio, OrcaSlicer: in the preview, move the layer slider to each Z above and click “+” (Add color change, M600)."),
        t("- Cura: Extensions › Post Processing › Modify G-Code › “Filament Change” at each layer number above."),
        t("- Multi-material printers (AMS, MMU): the same changes work; or assign the filaments to the color changes in the slicer.")
      ];
      return lines3.join("\n") + "\n";
    }
    function showCheck(name, g, m) {
      const o = buildOpts(), lh = opts2.layerHeight, grout = m.list.map(isLine), mm = (v) => num(+f2(v));
      let findings;
      if (isFlat()) {
        findings = checkFilaments(g, m.list.map((ci, k) => {
          let top = columnTop(k, grout, o);
          if (k === 0 && opts2.frame > 0) top = Math.max(top, frameTop(m.list.length, o));
          return { color: colors[ci], top: top * lh };
        }), lh);
      } else {
        const top = Math.max(topLayer(m.list.length - 1, settings()), opts2.frame > 0 ? frameTop(m.list.length, o) : 0) * lh;
        findings = checkHeights(g, colorPlan(m.list.map((ci) => colors[ci]), settings()), top, lh);
      }
      const say = (f) => {
        switch (f.kind) {
          case "change":
            return f.ok ? t("Change to {color} at Z {z} mm", { color: f.color, z: mm(f.z) }) : t("No filament change to {color} at Z {z} mm", { color: f.color, z: mm(f.z) });
          case "extra":
            return t("A filament change the plan does not have, at Z {z} mm", { z: mm(f.z) });
          case "top":
            return f.ok ? t("The top is at {z} mm, as planned", { z: mm(f.z) }) : t("The top is at {found} mm instead of {z} mm", { found: mm(f.found), z: mm(f.z) });
          case "filament":
            return f.found == null ? t("Filament {k} ({color}) is not used – assign it to the part “{k} {color}”", { k: f.filament, color: f.color }) : f.ok ? t("Filament {k} ({color}) prints up to {z} mm", { k: f.filament, color: f.color, z: mm(f.top) }) : t("Filament {k} ({color}) prints up to {found} mm instead of {z} mm", { k: f.filament, color: f.color, found: mm(f.found), z: mm(f.top) });
        }
      };
      const bad = findings.filter((f) => !f.ok).length, box4 = $("#m3-check");
      const head = !g.layers ? t("No printing found in {name} – is it a G-code file?", { name }) : bad ? t("{name}: {n} {n|thing|things} to look at", { name, n: bad }) : t("{name}: everything matches the plan", { name });
      box4.innerHTML = `<b>${esc(head)}</b>` + (g.layers ? "<ul>" + findings.map((f) => `<li class="${f.ok ? "ok" : "bad"}">${f.ok ? "✓" : "✗"} ${esc(say(f))}</li>`).join("") + "</ul>" : "");
      box4.classList.toggle("bad", !g.layers || bad > 0);
      box4.hidden = false;
    }
    async function save4(kind) {
      const m = model();
      if (!m || !m.list.length) return;
      const btn = $(kind === "3mf" ? "#m3-go" : "#m3-stl");
      btn.disabled = true;
      busy(t("Building the 3D model…"));
      try {
        const r = await run2("export3d", {
          kind,
          shape: { grid: m.grid, w: gw, h: gh, cell, grout: m.list.map(isLine) },
          o: buildOpts(),
          colors: m.list.map((ci) => colors[ci]),
          name: base(),
          slicer: opts2.slicer,
          labels: { base: t("Base"), frame: t("Frame") }
        }, { progress: (f) => busy(t("Building the 3D model… {p} %", { p: Math.round(f * 100) })) });
        download(new Blob([r.data], { type: r.type }), r.fileName);
        const v = { name: base(), n: r.triangles, c: m.list.length - 1 };
        if (isFlat()) {
          toast(kind === "3mf" ? t("Saved {name}.3mf for {slicer}: {n} {n|part|parts} with their filaments assigned.", { name: base(), slicer: opts2.slicer === "bambu" ? "Bambu Studio" : "PrusaSlicer", n: r.parts }) : t("Saved {name}-stl.zip: {n} STL {n|file|files}, one per color. Load them as parts of one object.", { name: base(), n: r.parts }));
        } else {
          toast(kind === "3mf" ? t("Saved {name}.3mf ({n} triangles; PrusaSlicer reads its {c} filament {c|change|changes}, other slicers need the plan).", v) : t("Saved {name}.stl ({n} triangles). Add the filament changes from the plan in your slicer.", v));
        }
      } catch (e) {
        if (!isCancelled(e)) toast(t("Could not build the 3D model."));
      } finally {
        busy("");
        btn.disabled = false;
      }
    }
    let timer;
    const reanalyse = () => {
      clearTimeout(timer);
      timer = setTimeout(() => analyse().catch(() => toast(t("Could not read the picture."))), 50);
    };
    const CAN_BE_0 = ["baseLayers", "minWidth", "groutRecess", "frame", "frameRaise", "corner", "hole", "magnet"];
    const bindNum = (id, key, min, max, whole, again) => {
      const i = $(id);
      i.value = opts2[key];
      i.onchange = () => {
        let v = +i.value;
        if (Number.isFinite(v) && v > 0 || CAN_BE_0.includes(key) && v === 0) {
          v = clamp(whole ? Math.round(v) : v, min, max);
          opts2[key] = v;
          saveOpts();
        }
        i.value = opts2[key];
        if (again) reanalyse();
        else render3();
      };
    };
    bindNum("#m3-detail", "detail", 0.1, 5, false, true);
    bindNum("#m3-min", "minWidth", 0, 20, false, false);
    bindNum("#m3-lh", "layerHeight", 0.04, 1, false, false);
    bindNum("#m3-lpc", "layersPerColor", 1, 50, true, false);
    bindNum("#m3-base", "baseLayers", 0, 50, true, false);
    bindNum("#m3-tile", "tileLayers", 1, 50, true, false);
    bindNum("#m3-recess", "groutRecess", 0, 49, true, false);
    bindNum("#m3-frame", "frame", 0, 100, false, false);
    bindNum("#m3-raise", "frameRaise", 0, 50, true, false);
    bindNum("#m3-corner", "corner", 0, 500, false, false);
    bindNum("#m3-hole", "hole", 0, 50, false, false);
    bindNum("#m3-magnet", "magnet", 0, 50, false, false);
    bindNum("#m3-mdepth", "magnetDepth", 0.2, 20, false, false);
    if (opts2.frame || opts2.corner || opts2.hole || opts2.magnet) $("#m3-finish").open = true;
    const setMode2 = (mode) => {
      opts2.mode = mode;
      saveOpts();
      render3();
    };
    $("#m3-mode-height").onclick = () => setMode2("height");
    $("#m3-mode-flat").onclick = () => setMode2("flat");
    const slicer = $("#m3-slicer");
    slicer.value = opts2.slicer;
    slicer.onchange = () => {
      opts2.slicer = slicer.value;
      saveOpts();
    };
    $("#m3-w").onchange = () => {
      const v = +$("#m3-w").value;
      if (v >= 5 && v <= 2e3) {
        opts2.width = v;
        saveOpts();
      }
      reanalyse();
    };
    $("#m3-h").onchange = () => {
      const v = +$("#m3-h").value;
      if (v >= 5 && v <= 2e3) {
        opts2.width = v * host2.aspect();
        saveOpts();
      }
      reanalyse();
    };
    $("#m3-tab-top").onclick = () => showTab(false);
    $("#m3-tab-3d").onclick = () => showTab(true);
    $("#m3-z").oninput = () => {
      if (view) view.setExaggeration(+$("#m3-z").value);
    };
    $("#m3-light").onclick = () => sortBy(true);
    $("#m3-dark").onclick = () => sortBy(false);
    $("#m3-go").onclick = () => save4("3mf");
    $("#m3-stl").onclick = () => save4("stl");
    $("#m3-check-btn").onclick = () => $("#m3-gcode").click();
    $("#m3-gcode").onchange = async () => {
      const input = $("#m3-gcode"), file = input.files[0];
      input.value = "";
      const m = model();
      if (!file || !m || !m.list.length) return;
      busy(t("Reading the G-code…"));
      try {
        const g = await run2("gcode", { text: await file.text() }, { progress: (f) => busy(t("Reading the G-code… {p} %", { p: Math.round(f * 100) })) });
        showCheck(file.name, g, m);
      } catch (e) {
        if (!isCancelled(e)) toast(t("Could not read {name}.", { name: file.name }));
      } finally {
        busy("");
      }
    };
    $("#m3-plan").onclick = () => {
      const m = model();
      if (m && m.list.length) download(new Blob([planText(m)], { type: "text/plain" }), base() + "-3d-plan.txt");
    };
    button.onclick = async () => {
      const real = host2.realSize();
      if (real) opts2.width = +real.w.toFixed(2);
      $("#m3-summary").textContent = t("Reading the picture…");
      dlg4.showModal();
      await analyse().catch(() => toast(t("Could not read the picture.")));
    };
  }

  // src/features/export3d.ts
  var { state: state10 } = MZ;
  initExport3D({
    aspect: () => state10.doc.w / state10.doc.h,
    realSize() {
      const k = MM[MZ.unit()] || MM.px;
      return { w: state10.doc.w * k, h: state10.doc.h * k };
    },
    async render(w, h) {
      const svg3 = MZ.buildSVGString({ photo: false, grout: state10.grout.on, pageOnly: true }).replace(/<rect id="mosaic-bg"[^>]*\/>/, "");
      const pic = await svgToCanvas(svg3, Math.max(w, h));
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      c.getContext("2d").drawImage(pic, 0, 0, w, h);
      return c;
    },
    colors() {
      const fills = /* @__PURE__ */ new Set(), strokes = /* @__PURE__ */ new Set();
      for (const el of MZ.allShapes()) {
        const f = MZ.fillOf(el);
        if (f) fills.add(f);
        if (!MZ.isFill(el)) {
          const cs = getComputedStyle(el), s = norm(cs.stroke);
          if (s && parseFloat(cs.strokeWidth) > 0) strokes.add(s);
        }
      }
      const lines2 = [...strokes].filter((c) => !fills.has(c));
      return { colors: [...fills, ...lines2], lines: lines2 };
    },
    fileName: () => MZ.fileName
  }, document.querySelector("#btn-3d"));

  // src/features/raster-import.ts
  async function importFromRaster() {
    if (location.hash !== "#from-raster") return;
    history.replaceState(null, "", location.pathname + location.search);
    let rec = null;
    try {
      rec = await Store.get("handoff");
    } catch {
    }
    if (!rec || !rec.svg) {
      MZ.toast(t("Nothing to import from the raster app."));
      return;
    }
    await Store.set("handoff", null).catch(() => {
    });
    if (await MZ.openText(rec.svg, rec.name)) {
      MZ.toast(t("Opened {n} tiles from the raster app – your previous drawing is in History.", { n: rec.tiles }));
    }
  }
  MZ.on("ready", importFromRaster);
  window.addEventListener("hashchange", importFromRaster);

  // src/lib/pack.ts
  var b64url = (bytes) => {
    let s = "";
    for (let i = 0; i < bytes.length; i += 32768) s += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + 32768)));
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  };
  var fromB64url = (s) => {
    const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  };
  var pipe = async (bytes, stream) => new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer());
  async function pack(text) {
    const bytes = new TextEncoder().encode(text);
    if (typeof CompressionStream !== "undefined") return "z" + b64url(await pipe(bytes, new CompressionStream("deflate-raw")));
    return "u" + b64url(bytes);
  }
  async function unpack(s) {
    const bytes = fromB64url(s.slice(1));
    return new TextDecoder().decode(s[0] === "z" ? await pipe(bytes, new DecompressionStream("deflate-raw")) : bytes);
  }

  // src/features/share.ts
  var Share = (() => {
    const LONG = 64 * 1024, MAX2 = 2 * 1024 * 1024;
    let link = "";
    async function makeLink() {
      const svg3 = MZ.buildSVGString({ photo: $("#share-photo").checked }).replace(/>\n</g, "><");
      const packed = await pack(svg3);
      link = `${location.origin}${location.pathname}#view=${packed}`;
      const kb = Math.round(link.length / 1024);
      $("#share-link").value = link;
      $("#share-size").textContent = link.length > MAX2 ? t("The link would be {kb} KB – too long. Share the file instead, or leave out the photo.", { kb }) : link.length > LONG ? t("The link is {kb} KB – long links can get cut off in some messengers; sharing the file is safer. Anyone with it can view the mosaic and make their own copy.", { kb }) : t("The link is {kb} KB. Anyone with it can view the mosaic and make their own copy.", { kb });
      $("#share-copy").disabled = link.length > MAX2;
    }
    async function shareFile() {
      const file = new File([MZ.buildSVGString()], MZ.fileName, { type: "image/svg+xml" });
      try {
        await navigator.share({ files: [file], title: MZ.fileName });
      } catch (e) {
        if (e.name !== "AbortError") MZ.toast(t("Sharing failed."));
      }
    }
    $("#btn-share").onclick = async () => {
      $("#dlg-share").showModal();
      await makeLink();
    };
    $("#share-photo").onchange = makeLink;
    $("#share-copy").onclick = async () => {
      try {
        await navigator.clipboard.writeText(link);
        MZ.toast(t("Link copied."));
      } catch {
        $("#share-link").select();
        document.execCommand("copy");
        MZ.toast(t("Link copied."));
      }
    };
    const canShareFiles = !!(navigator.canShare && navigator.canShare({ files: [new File(["x"], "x.svg", { type: "image/svg+xml" })] }));
    $("#share-file").hidden = !canShareFiles;
    $("#share-file").onclick = shareFile;
    let viewing = false;
    const blockKeys = (e) => {
      if (!viewing || MZ.typingIn(e.target)) return;
      const k = e.key;
      if (["+", "=", "-", "_", "0", " "].includes(k) && !e.ctrlKey && !e.metaKey) return;
      if (k === "Escape") return;
      e.stopPropagation();
    };
    document.addEventListener("keydown", blockKeys, true);
    document.addEventListener("paste", (e) => {
      if (viewing) e.stopPropagation();
    }, true);
    async function openShared(packed) {
      let svg3;
      try {
        svg3 = await unpack(packed);
      } catch {
        MZ.toast(t("This share link is damaged or incomplete."));
        return;
      }
      MZ.pauseAutosave(true);
      if (MZ.hasContent()) await MZ.saveVersion(t("Before opening a shared mosaic"));
      if (!MZ.loadSVGText(svg3, { restore: true, name: "shared.svg" })) {
        MZ.pauseAutosave(false);
        return;
      }
      viewing = true;
      document.body.classList.add("viewer");
      MZ.setTool("pan");
      MZ.fitView();
    }
    function makeCopy() {
      viewing = false;
      document.body.classList.remove("viewer");
      history.replaceState(null, "", location.pathname + location.search);
      MZ.pauseAutosave(false);
      MZ.setTool("select");
      MZ.docChanged();
      MZ.toast(t("This is now your own copy – it is saved in this browser like any drawing."));
    }
    function closeViewer() {
      history.replaceState(null, "", location.pathname + location.search);
      location.reload();
    }
    $("#viewer-copy").onclick = makeCopy;
    $("#viewer-close").onclick = closeViewer;
    const fromHash = () => {
      const m = /^#view=([zu][A-Za-z0-9_-]+)$/.exec(location.hash);
      if (m) openShared(m[1]);
    };
    MZ.on("ready", fromHash);
    window.addEventListener("hashchange", fromHash);
    return { pack, unpack, get viewing() {
      return viewing;
    } };
  })();

  // src/lib/examples.ts
  var n3 = (v) => String(Math.round(v * 1e3) / 1e3);
  var GROUT = "#d9d4cb";
  function tileSvg(w, h, tiles, paletteName) {
    const palette = [...new Set(tiles.map((t2) => t2[3]))];
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}mm" height="${h}mm">
<metadata id="mosaic-palette">${JSON.stringify({ palette: [...palette, GROUT], paletteName, unit: "mm" })}</metadata>
<rect id="mosaic-bg" x="0" y="0" width="${w}" height="${h}" fill="${GROUT}"/>
<g id="mosaic-fills"></g>
<g id="mosaic-shapes">
${tiles.map(([x, y, s, c]) => `<rect x="${n3(x)}" y="${n3(y)}" width="${n3(s)}" height="${n3(s)}" fill="${c}" stroke="none"/>`).join("\n")}
</g>
</svg>`;
  }
  function coasterSvg(paletteName) {
    const rings = ["#e76f51", "#f4a261", "#e9c46a", "#2a9d8f", "#264653"], tiles = [];
    for (let j = 0; j < 10; j++) for (let i = 0; i < 10; i++) {
      const ring = Math.floor(Math.max(Math.abs(i - 4.5), Math.abs(j - 4.5)));
      tiles.push([i * 10 + 0.75, j * 10 + 0.75, 8.5, rings[ring]]);
    }
    return tileSvg(100, 100, tiles, paletteName);
  }
  var FONT = {
    A: [".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
    D: ["####.", "#...#", "#...#", "#...#", "#...#", "#...#", "####."],
    E: ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
    H: ["#...#", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
    I: [".###.", "..#..", "..#..", "..#..", "..#..", "..#..", ".###."],
    J: ["..###", "...#.", "...#.", "...#.", "#..#.", "#..#.", ".##.."],
    M: ["#...#", "##.##", "#.#.#", "#.#.#", "#...#", "#...#", "#...#"],
    O: [".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
    V: ["#...#", "#...#", "#...#", "#...#", "#...#", ".#.#.", "..#.."]
  };
  var signLetters = Object.keys(FONT).join("");
  function signSvg(word, paletteName) {
    const letters = [...word.toUpperCase()].filter((c) => FONT[c]), pitch = 6, cols = letters.length * 6 + 3, rows = 11;
    const tiles = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      let color = r === 0 || c === 0 || r === rows - 1 || c === cols - 1 ? "#e76f51" : "#f1e3c6";
      const li = Math.floor((c - 2) / 6), lc = (c - 2) % 6, lr = r - 2;
      if (lr >= 0 && lr < 7 && li >= 0 && li < letters.length && lc < 5 && FONT[letters[li]][lr][lc] === "#") color = "#264653";
      tiles.push([c * pitch + 0.5, r * pitch + 0.5, pitch - 1, color]);
    }
    return tileSvg(cols * pitch, rows * pitch, tiles, paletteName);
  }
  var hex2 = (c) => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
  var HEART_COLORS = { o: "#6b1d2a", R: "#e63946", r: "#c1121f", "*": "#ffd6dc" };
  var HEART_PALETTE = Object.values(HEART_COLORS);
  function sunsetImage(W = 240, H = 160) {
    const data = new Uint8ClampedArray(W * H * 4), horizon = Math.round(H * 0.58);
    const mix2 = (a, b, f) => a.map((v, i) => v + (b[i] - v) * f);
    const sky = ["#2b2d5c", "#6b3e75", "#c0566b", "#f28a4a"].map(hex2), sea = ["#457b9d", "#1d3557"].map(hex2);
    const sun = { x: W / 2, y: horizon, r: H * 0.2 };
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      let c;
      if (y < horizon) {
        const f = y / horizon * (sky.length - 1), k = Math.min(sky.length - 2, Math.floor(f));
        c = mix2(sky[k], sky[k + 1], f - k);
        if ((x - sun.x) ** 2 + (y - sun.y) ** 2 < sun.r ** 2) c = hex2("#ffd27a");
      } else {
        c = mix2(sea[0], sea[1], (y - horizon) / (H - horizon));
        const half = sun.r * (1 - 0.6 * (y - horizon) / (H - horizon));
        if (Math.abs(x - sun.x) < half && Math.floor((y - horizon) / 6) % 2 === 0) c = hex2("#f4a261");
      }
      data.set([...c.map(Math.round), 255], (y * W + x) * 4);
    }
    return { width: W, height: H, data };
  }
  function photoTilesSvg(paletteName) {
    const img = sunsetImage(16, 12), tiles = [];
    for (let y = 0; y < 12; y++) for (let x = 0; x < 16; x++) {
      const i = (y * 16 + x) * 4, c = "#" + [0, 1, 2].map((k) => img.data[i + k].toString(16).padStart(2, "0")).join("");
      tiles.push([x * 10 + 0.75, y * 10 + 0.75, 8.5, c]);
    }
    return tileSvg(160, 120, tiles, paletteName);
  }

  // src/shared/examples-ui.ts
  function initExamples(button, examples) {
    const dlg4 = document.createElement("dialog");
    dlg4.id = "dlg-examples";
    dlg4.innerHTML = `<form method="dialog" class="dlg-head"><h2>${t("Examples")}</h2><button title="${t("Close")}">✕</button></form>
<p class="note">${t("Open an example to see how it is made, or to start from it. Your current work is kept in History.")}</p>
<div class="ex-list"></div>`;
    document.body.append(dlg4);
    dlg4.addEventListener("click", (e) => {
      if (e.target === dlg4) dlg4.close();
    });
    const list = dlg4.querySelector(".ex-list");
    for (const ex of examples) {
      const card = document.createElement("button");
      card.className = "ex-card";
      card.dataset.example = ex.id;
      card.innerHTML = `<img alt=""><b></b><span class="note"></span>`;
      card.querySelector("b").textContent = ex.title;
      card.querySelector(".note").textContent = ex.text;
      card.onclick = async () => {
        dlg4.close();
        await ex.open();
      };
      list.append(card);
    }
    button.onclick = () => {
      list.querySelectorAll("img").forEach((img, k) => {
        if (!img.src) img.src = examples[k].preview();
      });
      dlg4.showModal();
    };
  }

  // src/shared/guide.ts
  function initGuide(button, steps2, key) {
    const card = document.createElement("dialog");
    card.id = "guide";
    card.innerHTML = `<div class="dlg-head"><h2></h2><button class="guide-close" title="${t("Close")}">✕</button></div>
<p class="guide-text"></p>
<div class="row dlg-foot"><span class="note guide-count"></span><button class="guide-back">${t("Back")}</button><button class="guide-next primary"></button></div>`;
    document.body.append(card);
    let at = 0, marked = null;
    const mark = (el) => {
      marked?.classList.remove("guide-target");
      marked = el;
      marked?.classList.add("guide-target");
    };
    function draw() {
      const s = steps2[at];
      card.querySelector("h2").textContent = s.title;
      card.querySelector(".guide-text").textContent = s.text;
      card.querySelector(".guide-count").textContent = t("{k} of {n}", { k: at + 1, n: steps2.length });
      card.querySelector(".guide-back").disabled = at === 0;
      card.querySelector(".guide-next").textContent = at === steps2.length - 1 ? t("Done") : t("Next");
      const el = s.target ? document.querySelector(s.target) : null;
      mark(el && el.offsetParent ? el : null);
      marked?.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
    function close2() {
      mark(null);
      card.close();
      lsSet(key, "1");
    }
    function show2() {
      at = 0;
      draw();
      if (!card.open) card.show();
    }
    card.querySelector(".guide-close").onclick = close2;
    card.querySelector(".guide-back").onclick = () => {
      at = Math.max(0, at - 1);
      draw();
    };
    card.querySelector(".guide-next").onclick = () => {
      if (at === steps2.length - 1) close2();
      else {
        at++;
        draw();
      }
    };
    card.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close2();
      }
    });
    button.onclick = show2;
    if (!lsGet(key) && !location.hash && !navigator.webdriver && !location.hostname.endsWith("discordsays.com")) setTimeout(show2, 600);
    return { show: show2 };
  }

  // src/features/examples.ts
  var svgUrl = (svg3) => "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg3);
  async function open2(svg3, name) {
    if (!await MZ.confirmDiscard()) return;
    await MZ.openText(svg3, name);
  }
  function fromPhoto() {
    const input = document.querySelector("#ref-file"), before = MZ.refImage();
    input.addEventListener("change", () => {
      const started = Date.now(), wait = () => {
        if (MZ.refImage() && MZ.refImage() !== before) document.querySelector("#btn-automosaic").click();
        else if (Date.now() - started < 5e3) setTimeout(wait, 100);
      };
      wait();
    }, { once: true });
    input.click();
  }
  var coaster = () => coasterSvg(t("Coaster"));
  var sign = () => signSvg(t("HOME"), t("Sign"));
  initExamples(document.querySelector("#btn-examples"), [
    {
      id: "coaster",
      title: t("Coaster"),
      text: t("100 × 100 mm, square tiles in rings of color – try 3D… with rounded corners."),
      preview: () => svgUrl(coaster()),
      open: () => open2(coaster(), t("coaster") + ".svg")
    },
    {
      id: "sign",
      title: t("Sign"),
      text: t("A word in tiles with a border – try Report for a shopping list."),
      preview: () => svgUrl(sign()),
      open: () => open2(sign(), t("sign") + ".svg")
    },
    {
      id: "photo",
      title: t("Your photo"),
      text: t("Load a photo and turn it into tiles – smaller where it has detail."),
      preview: () => svgUrl(photoTilesSvg("")),
      open: fromPhoto
    }
  ]);
  initGuide(document.querySelector("#btn-guide"), [
    { title: t("Welcome to Mosaic Paint"), text: t("Design a mosaic: draw lines or lay a tile pattern, then paint the tiles. Everything is measured in real millimetres.") },
    { title: t("Draw"), text: t("The tools are on the left: lines and shapes, the tile pattern, and the paint bucket that fills a tile with one click."), target: "#tools" },
    { title: t("Colors"), text: t("Pick a color in the palette, then click tiles with the bucket. Palettes are shared with the raster app."), target: "#palette" },
    { title: t("When it is done"), text: t("Report gives a shopping list, 3D… a model to print, Share a link. Expert mode adds printing at real size and laying plans."), target: "#btn-report" },
    { title: t("Start from an example"), text: t("Not sure where to begin? Open an example. The ? button shows this guide again."), target: "#btn-examples" }
  ], "mz-guide-vector");

  // src/lib/gif.ts
  function lzw(minCode, data, count) {
    const out = new Uint8Array(count), clear = 1 << minCode, eoi = clear + 1;
    const prefix = new Int16Array(4096), suffix = new Uint8Array(4096), stack = new Uint8Array(4097);
    let size = minCode + 1, mask = (1 << size) - 1, next = eoi + 1, old = -1, first = 0;
    let bits = 0, acc = 0, o = 0, p = 0;
    for (let i = 0; i < clear; i++) {
      prefix[i] = -1;
      suffix[i] = i;
    }
    while (o < count) {
      while (bits < size) {
        if (p >= data.length) return out;
        acc |= data[p++] << bits;
        bits += 8;
      }
      const code = acc & mask;
      acc >>>= size;
      bits -= size;
      if (code === clear) {
        size = minCode + 1;
        mask = (1 << size) - 1;
        next = eoi + 1;
        old = -1;
        continue;
      }
      if (code === eoi) break;
      let c = code, sp = 0;
      if (old === -1) {
        out[o++] = suffix[code];
        old = code;
        first = code;
        continue;
      }
      if (code >= next) {
        stack[sp++] = first;
        c = old;
      }
      while (c >= clear) {
        stack[sp++] = suffix[c];
        c = prefix[c];
      }
      first = suffix[c];
      stack[sp++] = first;
      while (sp && o < count) out[o++] = stack[--sp];
      if (next < 4096) {
        prefix[next] = old;
        suffix[next] = first;
        next++;
        if ((next & mask) === 0 && next < 4096) {
          size++;
          mask = (1 << size) - 1;
        }
      }
      old = code;
    }
    return out;
  }
  function decodeGif(buf, each) {
    if (buf.length < 13 || String.fromCharCode(buf[0], buf[1], buf[2]) !== "GIF") throw new Error("not a GIF");
    const width = buf[6] | buf[7] << 8, height = buf[8] | buf[9] << 8, flags = buf[10];
    let p = 13, global = null;
    if (flags & 128) {
      const n4 = 3 * (1 << (flags & 7) + 1);
      global = buf.subarray(p, p + n4);
      p += n4;
    }
    const canvas = new Uint8ClampedArray(width * height * 4), frames = [];
    let delay = 100, transparent = -1, disposal = 0;
    const subBlocks = () => {
      const parts = [];
      let len = 0;
      while (p < buf.length && buf[p]) {
        const n4 = buf[p];
        parts.push(buf.subarray(p + 1, p + 1 + n4));
        len += n4;
        p += n4 + 1;
      }
      p++;
      const out = new Uint8Array(len);
      let o = 0;
      for (const s of parts) {
        out.set(s, o);
        o += s.length;
      }
      return out;
    };
    while (p < buf.length) {
      const b = buf[p++];
      if (b === 59) break;
      if (b === 33) {
        const label2 = buf[p++];
        if (label2 === 249 && buf[p] >= 4) {
          const f3 = buf[p + 1];
          disposal = f3 >> 2 & 7;
          delay = (buf[p + 2] | buf[p + 3] << 8) * 10 || 100;
          transparent = f3 & 1 ? buf[p + 4] : -1;
        }
        subBlocks();
        continue;
      }
      if (b !== 44) break;
      const x0 = buf[p] | buf[p + 1] << 8, y0 = buf[p + 2] | buf[p + 3] << 8, w = buf[p + 4] | buf[p + 5] << 8, h = buf[p + 6] | buf[p + 7] << 8, f = buf[p + 8];
      p += 9;
      let table = global;
      if (f & 128) {
        const n4 = 3 * (1 << (f & 7) + 1);
        table = buf.subarray(p, p + n4);
        p += n4;
      }
      const interlaced = !!(f & 64), minCode = buf[p++], idx = lzw(minCode, subBlocks(), w * h);
      const before = disposal === 3 ? canvas.slice() : null;
      const rows = [];
      if (interlaced) for (const [start, step] of [[0, 8], [4, 8], [2, 4], [1, 2]]) for (let y = start; y < h; y += step) rows.push(y);
      for (let r = 0; r < h; r++) {
        const y = interlaced ? rows[r] : r, Y = y0 + y;
        if (Y >= height) continue;
        for (let x = 0; x < w; x++) {
          const X = x0 + x, ci = idx[r * w + x];
          if (X >= width || ci === transparent || !table || ci * 3 + 2 >= table.length) continue;
          const o = (Y * width + X) * 4;
          canvas[o] = table[ci * 3];
          canvas[o + 1] = table[ci * 3 + 1];
          canvas[o + 2] = table[ci * 3 + 2];
          canvas[o + 3] = 255;
        }
      }
      if (each) {
        if (each(canvas, delay, frames.length)) return { width, height, frames };
        frames.push({ rgba: new Uint8ClampedArray(0), delay });
      } else frames.push({ rgba: canvas.slice(), delay });
      if (disposal === 2) {
        for (let y = y0; y < Math.min(height, y0 + h); y++) canvas.fill(0, (y * width + x0) * 4, (y * width + Math.min(width, x0 + w)) * 4);
      } else if (disposal === 3 && before) canvas.set(before);
      delay = 100;
      transparent = -1;
      disposal = 0;
    }
    if (!frames.length) throw new Error("no frames");
    return { width, height, frames };
  }

  // src/shared/frames.ts
  var isMotion = (b, name = "") => /^video\//.test(b.type) || b.type === "image/gif" || /\.(gif|mp4|webm|mov|m4v)$/i.test(name);
  var isVideo = (b, name) => /^video\//.test(b.type) || /\.(mp4|webm|mov|m4v)$/i.test(name);
  var PREVIEW = 480;
  var canvasOf = (w, h) => {
    const c = document.createElement("canvas");
    c.width = Math.max(1, w);
    c.height = Math.max(1, h);
    return c;
  };
  async function gifSource(bytes, view) {
    const W = bytes[6] | bytes[7] << 8, H = bytes[8] | bytes[9] << 8, k = Math.min(1, PREVIEW / Math.max(W, H, 1));
    const small = [], delays = [], work = [];
    const g = decodeGif(bytes, (rgba2, delay, i) => {
      delays[i] = delay;
      work.push(createImageBitmap(new ImageData(rgba2.slice(), W, H), { resizeWidth: Math.max(1, Math.round(W * k)), resizeHeight: Math.max(1, Math.round(H * k)), resizeQuality: "medium" }).then((b) => {
        small[i] = b;
      }));
    });
    await Promise.all(work);
    const full = (i) => {
      let out = null;
      decodeGif(bytes, (rgba2, _d, k2) => {
        if (k2 !== i) return false;
        out = canvasOf(W, H);
        out.getContext("2d").putImageData(new ImageData(rgba2.slice(), W, H), 0, 0);
        return true;
      });
      return out;
    };
    if (g.frames.length < 2) return full(0);
    view.width = small[0].width;
    view.height = small[0].height;
    return {
      count: g.frames.length,
      label: (i) => t("Frame {n} of {count}", { n: i + 1, count: g.frames.length }),
      async show(i) {
        view.getContext("2d").clearRect(0, 0, view.width, view.height);
        view.getContext("2d").drawImage(small[i], 0, 0);
      },
      delay: (i) => Math.max(20, delays[i] || 100),
      async take(i) {
        return full(i);
      },
      close() {
        for (const b of small) b.close();
      }
    };
  }
  function videoSource(blob, src, video) {
    const url2 = URL.createObjectURL(blob);
    const tryLoad = (s) => new Promise((resolve, reject) => {
      video.onloadeddata = () => resolve();
      video.onerror = () => reject(new Error("cannot play"));
      video.src = s;
      video.load();
    });
    return tryLoad(url2).catch(() => src ? tryLoad(src) : Promise.reject(new Error("cannot play"))).then(async () => {
      if (!isFinite(video.duration)) {
        await new Promise((resolve) => {
          const done = () => {
            if (isFinite(video.duration)) {
              video.ondurationchange = null;
              resolve();
            }
          };
          video.ondurationchange = done;
          video.currentTime = 1e7;
          setTimeout(resolve, 3e3);
        });
        video.currentTime = 0;
      }
      const fps = 30, d = isFinite(video.duration) && video.duration > 0 ? video.duration : 0, count = Math.max(1, Math.floor(d * fps));
      const seek = (i) => new Promise((resolve) => {
        const tm = Math.min(Math.max(0, d - 1e-3), i / fps);
        if (Math.abs(video.currentTime - tm) < 1e-3) {
          resolve();
          return;
        }
        video.onseeked = () => resolve();
        video.currentTime = tm;
      });
      return {
        count,
        label: (i) => t("{s} s of {total} s", { s: (i / fps).toFixed(2), total: d.toFixed(1) }),
        show: seek,
        delay: () => 1e3 / fps,
        async take(i) {
          await seek(i);
          const c = canvasOf(video.videoWidth, video.videoHeight);
          c.getContext("2d").drawImage(video, 0, 0);
          return c;
        },
        close() {
          video.removeAttribute("src");
          video.load();
          URL.revokeObjectURL(url2);
        }
      };
    });
  }
  var dlg3 = null;
  function dialog() {
    if (dlg3) return dlg3;
    dlg3 = document.createElement("dialog");
    dlg3.id = "dlg-frame";
    dlg3.innerHTML = `<div class="dlg-head"><h2>${t("Choose a frame")}</h2></div>
<div class="fr-stage"><canvas class="fr-canvas"></canvas><video class="fr-video" muted playsinline preload="auto"></video></div>
<input class="fr-slider" type="range" min="0" step="1" aria-label="${t("Frame")}">
<div class="row fr-controls">
  <button class="fr-prev" title="${t("One frame back")}" aria-label="${t("One frame back")}">◀</button>
  <button class="fr-play" title="${t("Play / pause")}" aria-label="${t("Play / pause")}">▶</button>
  <button class="fr-next" title="${t("One frame on")}" aria-label="${t("One frame on")}">▶▏</button>
  <span class="fr-label note grow"></span>
</div>
<div class="row dlg-foot"><button class="fr-cancel">${t("Cancel")}</button><button class="fr-ok primary">${t("Use this frame")}</button></div>`;
    document.body.append(dlg3);
    return dlg3;
  }
  async function chooseFrame(blob, name, o = {}) {
    const d = dialog(), q = (s) => d.querySelector(s);
    const view = q(".fr-canvas"), video = q(".fr-video"), slider = q(".fr-slider");
    const vid = isVideo(blob, name);
    view.hidden = vid;
    video.hidden = !vid;
    let src;
    try {
      if (vid) src = await videoSource(blob, o.src, video);
      else {
        const s = await gifSource(new Uint8Array(await blob.arrayBuffer()), view);
        if (s instanceof HTMLCanvasElement) return s;
        src = s;
      }
    } catch {
      toast(vid ? t("This video can’t be played here – try a GIF or a screenshot of it.") : t("Could not read {name} as an image.", { name }));
      return null;
    }
    let i = 0, playing = false, timer = 0;
    const go = async (k) => {
      i = Math.max(0, Math.min(src.count - 1, k));
      slider.value = String(i);
      q(".fr-label").textContent = src.label(i);
      await src.show(i);
    };
    const stop = () => {
      playing = false;
      clearTimeout(timer);
      q(".fr-play").textContent = "▶";
    };
    const tick = async () => {
      if (!playing) return;
      await go(i + 1 >= src.count ? 0 : i + 1);
      timer = window.setTimeout(tick, src.delay(i));
    };
    slider.max = String(src.count - 1);
    slider.oninput = () => {
      stop();
      go(+slider.value);
    };
    q(".fr-prev").onclick = () => {
      stop();
      go(i - 1);
    };
    q(".fr-next").onclick = () => {
      stop();
      go(i + 1);
    };
    q(".fr-play").onclick = () => {
      if (playing) stop();
      else {
        playing = true;
        q(".fr-play").textContent = "❚❚";
        tick();
      }
    };
    await go(0);
    const pick2 = await new Promise((resolve) => {
      const answer = (yes) => () => {
        d.oncancel = null;
        d.close();
        resolve(yes);
      };
      q(".fr-ok").onclick = answer(true);
      q(".fr-cancel").onclick = answer(false);
      d.oncancel = answer(false);
      d.showModal();
    });
    stop();
    try {
      return pick2 ? await src.take(i) : null;
    } finally {
      src.close();
    }
  }

  // src/features/discord-host.ts
  var MAX = 2400;
  Object.assign(MZ, {
    async openImage(blob, name, o = {}) {
      if (isMotion(blob, name)) {
        const c = await chooseFrame(blob, name, o);
        if (!c) return;
        blob = await canvasToPng(c);
        name = name.replace(/\.[a-z0-9]+$/i, "") + ".png";
      }
      const url2 = URL.createObjectURL(blob);
      let w, h;
      try {
        const img = await MZ.loadImg(url2), k = Math.min(1, MAX / Math.max(img.naturalWidth, img.naturalHeight));
        w = Math.max(1, Math.round(img.naturalWidth * k));
        h = Math.max(1, Math.round(img.naturalHeight * k));
      } catch {
        MZ.toast(t("Could not read that image."));
        return;
      } finally {
        URL.revokeObjectURL(url2);
      }
      const page2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"></svg>`;
      if (!await MZ.openText(page2, name.replace(/\.[a-z0-9]+$/i, "") + ".svg")) return;
      await loadPhoto(blob);
      MZ.state.refOpacity = 1;
      const im = refImage();
      if (im) im.style.opacity = "1";
      renderPhotoUI();
    },
    /** The drawing with the photo under it, as a PNG (pixel drawings at their size, others 2000 px wide). */
    async png() {
      const d = MZ.state.doc;
      const svg3 = MZ.buildSVGString({ photo: true, grout: MZ.state.grout.on, pageOnly: true }).replace(/(<g id="mosaic-reference")[^>]*>/, "$1>");
      const long = MZ.unit() === "px" ? Math.round(Math.max(d.w, d.h)) : 2e3;
      return canvasToPng(await svgToCanvas(svg3, long));
    },
    t
  });
  if ((location.hostname.endsWith("discordsays.com") || window.__discordSdk) && !document.querySelector('script[src="dist/activity.js"]')) {
    const s = document.createElement("script");
    s.src = "dist/activity.js";
    document.head.append(s);
  }

  // src/shared/whats-new.ts
  var VERSION = true ? "2.5.1" : "dev";
  var RELEASES = [
    {
      version: "2.5.1",
      date: "2026-10-17",
      items: [
        "On phones, the Select shapes (and other rows of choices) wrap onto a second line instead of cutting off the last one – Object (AI) can be tapped again."
      ]
    },
    {
      version: "2.5.0",
      date: "2026-10-14",
      items: [
        "Two fingers on a selection (or a pasted, imported picture or text) scale and turn it: spread or pinch, twist – and move it. It snaps upright and to its own size, and is always made from the original pixels, so it doesn’t blur. Elsewhere two fingers zoom the view as before."
      ]
    },
    {
      version: "2.4.0",
      date: "2026-10-14",
      items: [
        "Import… puts a picture from a file into the current image (also in the quick menu): it comes in floating, scaled to fit – drag it into place."
      ]
    },
    {
      version: "2.3.1",
      date: "2026-10-13",
      items: [
        "Select object (AI) no longer crashes on phones: it now uses MobileSAM, which needs a quarter of the memory (and is faster). Its download is larger (45 MB); the old model is removed."
      ]
    },
    {
      version: "2.3.0",
      date: "2026-10-13",
      items: [
        "Nicer icons for undo / redo, zoom, fit and help; Adjust is in the toolbar and the quick menu, with new sliders – shadows, highlights, warmth, tint, vibrance, fade and vignette. Invert selection (Ctrl+I) in both apps."
      ]
    },
    {
      version: "2.2.0",
      date: "2026-10-13",
      items: [
        "GIFs and videos: open one (or, in Discord, a GIF, a video or a Tenor / Giphy GIF from the chat) and choose the frame to edit – with a slider, frame steps and play."
      ]
    },
    {
      version: "2.1.1",
      date: "2026-10-13",
      items: [
        "The AI add-ons on phones: much less memory (no more crash on iPhone when selecting an object) – the CPU engine on iPhone and iPad, and one feature's models at a time."
      ]
    },
    {
      version: "2.1.0",
      date: "2026-10-13",
      items: [
        "Layers in the raster app: paint on the active layer, show / hide, opacity, move, merge, flatten – undo knows them all. Save layers keeps them in an OpenRaster file (.ora – GIMP and Krita open it), and autosave keeps them too."
      ]
    },
    {
      version: "2.0.0",
      date: "2026-10-13",
      items: [
        "Add-ons that run on your device, each downloaded only after you agree to its size: Select object (tap it), AI object removal, background removal, Read text (OCR) and depth for 3D reliefs. The side panel lists them and removes them again.",
        "3D relief…: a printable relief (STL) from the picture's brightness – or a lithophane – or from AI depth."
      ]
    },
    {
      version: "1.9.0",
      date: "2026-10-13",
      items: [
        "Text tool in the raster app (T): any font (also the installed ones, where the browser lists them), size, bold, italic, alignment, outline, shadow and curved text. It floats until placed – drag it, tap it to edit."
      ]
    },
    {
      version: "1.8.0",
      date: "2026-10-13",
      items: [
        "Shaped selections: Lasso, Magnetic (snaps to edges) and Wand (by color), with New / Add / Subtract (or Shift / Alt) – copy, clear, move and Adjust colors follow the shape.",
        "Removing things: the Remove brush (R) and Fill from surroundings for a selection fill the spot with the picture around it – content-aware, on the device."
      ]
    },
    {
      version: "1.7.0",
      date: "2026-10-13",
      items: [
        "Photo fixes in the raster app: Adjust colors… – brightness, contrast, saturation, levels with Auto, sharpening and noise smoothing, previewed live (hold Before to compare).",
        "Heal brush (J): paints over blemishes, spots and scratches with texture from elsewhere, in the color and light of the spot."
      ]
    },
    {
      version: "1.6.0",
      date: "2026-10-13",
      items: [
        "Clone tool in the raster app (S): paint with a copy of another part of the image. Tap (or Alt+click) where to copy from, paint the copy, drag the source disc with a finger to move it; aligned or not, with the brush’s size, tip, opacity and pen pressure."
      ]
    },
    {
      version: "1.5.0",
      date: "2026-10-13",
      items: [
        "Quick menu on phones and tablets: double-tap the drawing with a finger for undo, the main tools, colors and size – right where you draw."
      ]
    },
    {
      version: "1.4.0",
      date: "2026-10-12",
      items: [
        "Ellipses and curves in both apps: the Ellipse tool (O, Shift for a circle) and the Curve tool (C) – smooth through the points, smooth near them (B-spline), or cubic and quadratic Bézier.",
        "In the vector app, ellipses and curves stay exact curves: drag their points or axis ends to change them, and paint, cut and mirror them like any tile."
      ]
    },
    {
      version: "1.3.0",
      date: "2026-10-12",
      items: [
        "Brush tips for the brush and the eraser: soft (airbrush), spray, calligraphy and chalk. Shift+B switches between them.",
        "The spray keeps spraying while you hold it still, like an airbrush; the calligraphy nib’s angle can be set (also for left-handed writing)."
      ]
    },
    {
      version: "1.2.1",
      date: "2026-10-12",
      items: [
        "Choose any color: a color area, a hue slider and a color code (Choose… under the palette, or click the current colors).",
        "Inside Discord: New, Save as, renaming and the other questions work (they are asked in the page now), and switching between the apps keeps the Post button.",
        "On phones inside Discord, the top bar stays clear of Discord’s own controls."
      ]
    },
    {
      version: "1.2.0",
      date: "2026-10-12",
      items: [
        "Edit images from a Discord chat: right-click › Apps › Edit image, draw on it, post it back – in the raster or the vector app.",
        "Pen pressure: with a graphics tablet or stylus, the brush, pencil and eraser paint thinner the lighter you press.",
        "Image editing in the raster app: rotate (by 90° or any angle), flip, crop to the selection, trim the border, resize keeping proportions."
      ]
    },
    {
      version: "1.1.0",
      date: "2026-10-11",
      items: [
        "The raster app: paint with pixels, turn photos into mosaics, and copy pictures between both apps.",
        "3D print: a 3D preview, models for multi-filament printers (AMS, MMU), a frame, rounded corners, a hanging hole and magnet pockets – and a check of the sliced G-code against the plan.",
        "Examples to start from, and a short guide for newcomers.",
        "German, Slovak and Polish.",
        "Heavy work – mosaics, tracing, 3D models – no longer holds up the page.",
        "History: name and pin versions; see their size and colors.",
        "Big images can be scaled down when opened.",
        "Better keyboard and screen-reader support."
      ]
    },
    {
      version: "1.0.0",
      date: "2026-10-10",
      items: [
        "The vector editor: lines, tile patterns, the paint bucket, palettes, reports, printing at real size and sharing as a link."
      ]
    }
  ];
  var KEY2 = "mz-version";
  function initWhatsNew() {
    const dlg4 = document.createElement("dialog");
    dlg4.id = "dlg-whats-new";
    dlg4.innerHTML = `<form method="dialog" class="dlg-head"><h2>${t("What’s new")}</h2><button title="${t("Close")}">✕</button></form>` + RELEASES.map((r) => `<h3>${esc(r.version)} <span class="note">${esc(new Date(r.date).toLocaleDateString(document.documentElement.lang || "en"))}</span></h3><ul>` + r.items.map((i) => `<li>${esc(t(i))}</li>`).join("") + "</ul>").join("");
    document.body.append(dlg4);
    dlg4.addEventListener("click", (e) => {
      if (e.target === dlg4) dlg4.close();
    });
    const button = document.createElement("button");
    button.id = "st-version";
    button.textContent = "v" + VERSION;
    button.title = t("Version {v} – what’s new", { v: VERSION });
    $("#status").append(button);
    const seen = lsGet(KEY2);
    if (seen && seen !== VERSION) {
      button.classList.add("new");
      toast(t("Updated to version {v} – click v{v} in the corner to see what’s new.", { v: VERSION }));
    } else if (!seen) lsSet(KEY2, VERSION);
    button.onclick = () => {
      button.classList.remove("new");
      lsSet(KEY2, VERSION);
      dlg4.showModal();
    };
  }

  // src/main.ts
  initWhatsNew();
  Object.assign(window, { MZ, Geo: geometry_exports, Colors: colors_exports, Store, PhotoTools, LayPlan, Vision, Pages, Snippets, Share });
})();
//# sourceMappingURL=mosaic.js.map
