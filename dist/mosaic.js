(() => {
  var __defProp = Object.defineProperty;
  var __export = (target2, all) => {
    for (var name in all)
      __defProp(target2, name, { get: all[name], enumerable: true });
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
    "Drag to paint · Shift: straight line · [ ] size · Alt+click: pick a color": "Tažením malujete · Shift: rovná čára · [ ] velikost · Alt+klik: vybrat barvu",
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
    "Select, Line, Free polygon, Polygon, Pattern, Bucket, Pan": "Výběr, Čára, Volný mnohoúhelník, Mnohoúhelník, Vzor, Kbelík, Posun",
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
    "Drag inside the selection to move it (Alt+drag moves a copy). Enter places it, Esc cancels.": "Tažením uvnitř výběru ho posunete (Alt+tažení posune kopii). Enter ho umístí, Esc zruší.",
    "Mosaic": "Mozaika",
    "Make a mosaic…": "Vytvořit mozaiku…",
    "Reduce to palette": "Převést na paletu",
    "Open as vector tiles…": "Otevřít jako vektorové dlaždice…",
    "Works on the selection, or on the whole image when nothing is selected.": "Pracuje s výběrem, nebo s celým obrázkem, když není nic vybráno.",
    "Image": "Obrázek",
    "Resize image": "Změnit velikost obrázku",
    "Canvas size": "Velikost plátna",
    "Pixel grid when zoomed in": "Mřížka pixelů při přiblížení",
    "Select, Brush, Pencil, Eraser, Line, Polygon, Bucket, Pick color, Pan": "Výběr, Štětec, Tužka, Guma, Čára, Mnohoúhelník, Kbelík, Kapátko, Posun",
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
    "Fit": "Vše"
  };

  // src/shared/i18n.ts
  var LANGS = [["en", "English"], ["cs", "Čeština"]];
  var KEY = "mz-lang";
  function detect() {
    try {
      const saved = typeof localStorage !== "undefined" && localStorage.getItem(KEY);
      if (saved === "en" || saved === "cs") return saved;
    } catch {
    }
    const nav = typeof window !== "undefined" && typeof navigator !== "undefined" ? navigator.language || "" : "";
    return /^(cs|sk)\b/i.test(nav) ? "cs" : "en";
  }
  var lang = detect();
  var dict = lang === "cs" ? CS : {};
  function setLang(l) {
    try {
      localStorage.setItem(KEY, l);
    } catch {
    }
    location.reload();
  }
  function form(n2, forms) {
    const i = lang === "cs" ? n2 === 1 ? 0 : Number.isInteger(n2) && n2 >= 2 && n2 <= 4 ? 1 : 2 : n2 === 1 ? 0 : 1;
    return forms[Math.min(i, forms.length - 1)];
  }
  var num = (v, digits) => v.toLocaleString(lang === "cs" ? "cs-CZ" : "en", digits == null ? void 0 : { minimumFractionDigits: digits, maximumFractionDigits: digits });
  function t(s, vars) {
    let out = dict[s] ?? s;
    if (vars) {
      out = out.replace(/\{(\w+)\|([^}]*)\}/g, (m, k, forms) => k in vars ? form(+vars[k], forms.split("|")) : m);
      out = out.replace(/\{(\w+)\}/g, (m, k) => k in vars ? typeof vars[k] === "number" ? num(vars[k]) : String(vars[k]) : m);
    }
    return out;
  }
  var ATTRS = ["title", "placeholder", "aria-label"];
  function translateDom(root) {
    if (lang === "en") return;
    const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n2 = walk.nextNode(); n2; n2 = walk.nextNode()) {
      const v = n2.nodeValue, key = v.trim();
      if (key && dict[key] != null) n2.nodeValue = v.replace(key, dict[key]);
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
      const t2 = d.transaction(name, mode), req = fn(t2.objectStore(name));
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
    async trimVersions(max, app = "vector") {
      const all = await Store.listVersions(app);
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
    }, 5e3);
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
    fromLab: () => fromLab,
    luminance: () => luminance,
    nearest: () => nearest,
    norm: () => norm,
    parse: () => parse,
    simulate: () => simulate,
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
    const n2 = norm(c);
    if (!n2) return null;
    if (n2[0] === "#") return [1, 3, 5].map((i) => parseInt(n2.slice(i, i + 2), 16));
    const m = n2.match(/[\d.]+/g);
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
  function createPaletteUI(host) {
    const st = host.state;
    function uniqueName2(base) {
      let n2 = base, i = 2;
      while (st.palettes[n2]) n2 = `${base} ${i++}`;
      return n2;
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
      host.save();
      renderSelect();
      render3();
    }
    function addPalette2(name, colors) {
      const n2 = uniqueName2(name);
      st.palettes[n2] = colors;
      switchPalette2(n2);
      return n2;
    }
    function addColors2(list) {
      let added = 0;
      for (const c of list) if (c && !st.palette.includes(c)) {
        st.palette.push(c);
        added++;
      }
      host.save();
      render3();
      return added;
    }
    let paletteKey = "";
    function render3() {
      const box = $("#palette");
      const counts = host.counts(), key = st.palette.join();
      if (key === paletteKey && box.children.length === st.palette.length + 1) {
        [null, ...st.palette].forEach((c, i) => updateSwatch(box.children[i], c, counts));
      } else {
        paletteKey = key;
        box.innerHTML = "";
        for (const c of [null, ...st.palette]) box.append(makeSwatch(c, counts));
      }
      const fb = $("#ac-fill"), sb = $("#ac-stroke");
      fb.className = "acbox" + (st.fill ? "" : " none");
      fb.style.background = st.fill || "";
      if (sb) {
        sb.className = "acbox" + (st.stroke ? "" : " none");
        sb.style.background = st.stroke || "";
      }
      if (host.rendered) host.rendered();
    }
    function updateSwatch(d, c, counts) {
      d.classList.toggle("is-fill", c === st.fill);
      d.classList.toggle("is-stroke", c === st.stroke);
      const n2 = c ? counts.get(c) || 0 : 0;
      const num3 = c ? st.palette.indexOf(c) + 1 : 0;
      const N = host.names;
      d.title = c ? `#${num3}  ${c}${n2 ? " – " + t("used by {what}", { what: host.usage(n2) }) : ""}
` + t("Click: {fill} · Right-click: {stroke} · Double-click: edit", { fill: N.fill, stroke: N.stroke }) : N.none;
      let b = d.querySelector(".count");
      if (n2 && !b) {
        b = document.createElement("span");
        b.className = "count";
        d.prepend(b);
      }
      if (b) {
        if (n2) b.textContent = n2 > 9999 ? Math.round(n2 / 1e3) + "k" : String(n2);
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
        d.append(x);
        d.ondblclick = () => editColor(c);
      }
      d.onclick = (e) => {
        if (e.shiftKey && host.shiftClick) host.shiftClick(c, e);
        else setFill2(c, true);
      };
      d.oncontextmenu = (e) => {
        e.preventDefault();
        setStroke2(c, true);
      };
      return d;
    }
    function setFill2(c, apply) {
      st.fill = c;
      host.save();
      if (!(apply && host.applyFill && host.applyFill(c))) render3();
    }
    function setStroke2(c, apply) {
      st.stroke = c;
      host.save();
      if (!(apply && host.applyStroke && host.applyStroke(c))) render3();
    }
    function removeColor(c) {
      st.palette = st.palette.filter((x) => x !== c);
      host.save();
      render3();
    }
    function editColor(old) {
      const v = prompt(t("Edit color (hex or any CSS color).\nThe drawing is recolored too."), old);
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
      host.save();
      const msg = host.recolor ? host.recolor(old, c) : null;
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
      const n2 = addColors2(cols);
      if (cols.length === 1) setFill2(cols[0], false);
      inp.value = "";
      updatePreview();
      toast(n2 ? t("Added {n} {n|color|colors}.", { n: n2 }) : t("Already in the palette."));
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
      const n2 = addColors2(cols);
      if (cols.length === 1) setFill2(cols[0], false);
      toast(n2 ? t("Added {n} {n|color|colors} from the clipboard.", { n: n2 }) : t("Those colors are already in the palette."));
      return true;
    }
    function bind() {
      const inp = $("#color-input");
      $("#btn-add-color").onclick = addFromInput2;
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
        host.save();
        render3();
      };
      $("#pal-select").onchange = (e) => switchPalette2(e.target.value);
      $("#btn-pal-new").onclick = () => {
        const n2 = prompt(t("Name of the new palette:"), uniqueName2(t("Palette")));
        if (!n2 || !n2.trim()) return;
        const name = uniqueName2(n2.trim());
        st.palettes[name] = [];
        switchPalette2(name);
        toast(t("Created “{name}”. Paste colors to fill it.", { name }));
      };
      $("#btn-pal-rename").onclick = () => {
        const old = st.paletteName, n2 = prompt(t("Rename palette:"), old);
        if (!n2 || !n2.trim() || n2.trim() === old) return;
        const name = uniqueName2(n2.trim()), next = {};
        for (const k of Object.keys(st.palettes)) next[k === old ? name : k] = st.palettes[k];
        st.palettes = next;
        switchPalette2(name);
      };
      $("#btn-pal-delete").onclick = () => {
        if (!confirm(t("Delete the palette “{name}”? (The drawing is not changed.)", { name: st.paletteName }))) return;
        delete st.palettes[st.paletteName];
        if (!Object.keys(st.palettes).length) st.palettes[t("My palette")] = [];
        switchPalette2(Object.keys(st.palettes)[0]);
      };
      $("#btn-pal-doc").onclick = () => {
        const n2 = addColors2(host.docColors());
        toast(n2 ? t("Added {n} {n|color|colors} from the drawing.", { n: n2 }) : t("No new colors in the drawing."));
      };
      $("#btn-pal-export").onclick = () => download(new Blob([st.palette.join("\n") + "\n"], { type: "text/plain" }), st.paletteName + ".txt");
      $("#btn-pal-clear").onclick = () => {
        if (confirm(t("Remove all colors from this palette? (The drawing is not changed.)"))) {
          st.palette = [];
          host.save();
          render3();
        }
      };
      $("#btn-pal-import").onclick = () => $("#pal-file").click();
      $("#pal-file").onchange = async (e) => {
        const f = e.target.files[0];
        if (!f) return;
        const text = await f.text();
        e.target.value = "";
        const n2 = addColors2(parse(text));
        toast(n2 ? t("Imported {n} {n|color|colors}.", { n: n2 }) : t("No new colors found in {name}", { name: f.name }));
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
  var fmt = (n2) => String(Math.round(n2 * 1e3) / 1e3);
  var px = (n2) => n2 / state.view.s;
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
    const n2 = (s || "").match(NUM_RE) || [];
    const out = [];
    for (let i = 0; i + 1 < n2.length; i += 2) out.push({ x: +n2[i], y: +n2[i + 1] });
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
    for (let i = 0, n2 = pts.length; i < n2; i++) {
      const p = pts[i], q = pts[(i + 1) % n2];
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
  function regularPolygon(n2, cx, cy, r, rot) {
    const out = [];
    for (let i = 0; i < n2; i++) {
      const a = rot + i * 2 * Math.PI / n2;
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
    const n2 = segs.length;
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
    for (let oi = 0; oi < n2; oi++) {
      const i = order[oi], bi = bb[i], A = segs[i];
      for (let oj = oi + 1; oj < n2; oj++) {
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
    for (const r of rings) for (let i = 0, n2 = r.length; i < n2; i++) {
      const x = segIntersect(a, b, r[i], r[(i + 1) % n2]);
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
    for (const r of rings) for (let i = 0, n2 = r.length; i < n2; i++) d = Math.min(d, dist(p, project(p, r[i], r[(i + 1) % n2])));
    return d;
  }
  function chordThrough(p, dir, rings) {
    let tmin = -Infinity, tmax = Infinity;
    for (const r of rings) for (let i = 0, n2 = r.length; i < n2; i++) {
      const a = r[i], b = r[(i + 1) % n2], ex = b.x - a.x, ey = b.y - a.y;
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
      if (k === "layers") for (const n2 in state.layers) Object.assign(state.layers[n2], o.layers[n2] || {});
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
    let n2 = 0;
    for (const el of allShapes()) {
      if (fillOf(el) !== from) continue;
      if (!to && isFill(el)) el.remove();
      else paintFill(el, to);
      n2++;
    }
    return n2;
  }
  var applyToSelection = () => state.tool === "select" && state.selection.size > 0;
  var ui = createPaletteUI({
    state,
    save: savePrefs,
    counts: colorCounts,
    usage: (n2) => t("{n} {n|area|areas}", { n: n2 }),
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
      let n2 = replaceColor(old, c);
      for (const el of allShapes()) {
        if (!isFill(el) && norm(getComputedStyle(el).stroke) === old) {
          setPaint(el, "stroke", c);
          n2++;
        }
      }
      if (!n2) return null;
      commit(true);
      return t("Recolored {n} {n|element|elements}.", { n: n2 });
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
    let n2 = 0;
    for (const el of allShapes()) {
      if (isFill(el)) continue;
      setPaint(el, "stroke", state.grout.color);
      el.setAttribute("stroke-width", String(state.grout.width));
      el.style.removeProperty("stroke-width");
      n2++;
    }
    state.grout.on = false;
    $("#grout-on").checked = false;
    applyGrout();
    savePrefs();
    commit(true);
    toast(t("Applied the grout color and width to {n} {n|line|lines}.", { n: n2 }));
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
    if (refImage() && !confirm(t("Replace the photo to trace with the pasted image?"))) return;
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
    const pieces = [], tol = Math.max(eps2, s * 1e-6);
    const keep = (p) => inside(p) && distToRings(p, rings) > eps2 * 20;
    for (const [p, r] of edges) {
      const k1 = key(p), k2 = key(r), k = k1 < k2 ? k1 + "|" + k2 : k2 + "|" + k1;
      if (k1 === k2 || seen.has(k)) continue;
      seen.add(k);
      const A = toDoc2(p), B = toDoc2(r);
      if (Math.max(A.x, B.x) < rb.x0 || Math.min(A.x, B.x) > rb.x1 || Math.max(A.y, B.y) < rb.y0 || Math.min(A.y, B.y) > rb.y1) continue;
      pieces.push(...clipSegment(A, B, rings, keep));
    }
    return { segments: mergeCollinear(pieces, tol) };
  }

  // src/lib/contour.ts
  var INF = 1e20;
  function insideMask(rings, x0, y0, h, nx, ny) {
    const m = new Uint8Array(nx * ny);
    for (let j = 0; j < ny; j++) {
      const y = y0 + (j + 0.5) * h, xs = [];
      for (const r of rings) for (let i = 0, n2 = r.length; i < n2; i++) {
        const a = r[i], b = r[(i + 1) % n2];
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
  function edt1d(f, n2, d, v, z) {
    let k = 0;
    v[0] = 0;
    z[0] = -INF;
    z[1] = INF;
    for (let q = 1; q < n2; q++) {
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
    for (let q = 0; q < n2; q++) {
      while (z[k + 1] < q) k++;
      d[q] = (q - v[k]) * (q - v[k]) + f[v[k]];
    }
  }
  function distanceField(mask, nx, ny) {
    const g = new Float64Array(nx * ny), n2 = Math.max(nx, ny);
    const f = new Float64Array(n2), d = new Float64Array(n2), v = new Int32Array(n2), z = new Float64Array(n2 + 1);
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
    const total = perimeter(loop), n2 = Math.max(3, Math.round(total / len)), step = total / n2, out = [];
    let i = 0, acc = 0, target2 = step / 2;
    while (out.length < n2 && i < loop.length) {
      const a = loop[i], b = loop[(i + 1) % loop.length], s = dist(a, b);
      if (acc + s >= target2) {
        const t2 = (target2 - acc) / s;
        out.push({ x: a.x + (b.x - a.x) * t2, y: a.y + (b.y - a.y) * t2 });
        target2 += step;
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
        const pts = pl.pts, n2 = pts.length, m = pl.closed ? n2 : n2 - 1;
        for (const q of pts) consider(q, "vertex");
        for (let i = 0; i < m; i++) {
          const a = pts[i], c = pts[(i + 1) % n2], pr = project(p, a, c), d = dist(p, pr);
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
    $("#sa-finish").textContent = state.freePts ? t("Close shape") : t("Done");
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
  function finishFree() {
    const pts = state.freePts;
    state.freePts = null;
    previewG.innerHTML = "";
    snapG.innerHTML = "";
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
        finishFree();
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
    const n2 = state.sides;
    return { n: n2, cx: c.x, cy: c.y, r, rot: rotDeg, pts: regularPolygon(n2, c.x, c.y, r, rotDeg * Math.PI / 180) };
  }
  function ngonSpec(a) {
    const n2 = state.sides;
    if (state.ngonMode === "center") {
      let rot = Math.atan2(a.b.y - a.a.y, a.b.x - a.a.x) * 180 / Math.PI;
      if (a.shift) rot = Math.round(rot / 15) * 15;
      const s2 = specFromCenter(a.a, dist(a.a, a.b), rot);
      if (!a.shift) s2.pts[0] = { x: a.b.x, y: a.b.y };
      return s2;
    }
    const L = dist(a.a, a.b);
    if (L < 1e-9) return null;
    const R = L / (2 * Math.sin(Math.PI / n2)), ap = L / (2 * Math.tan(Math.PI / n2));
    const ux = (a.b.x - a.a.x) / L, uy = (a.b.y - a.a.y) / L;
    const centerOn = (side2) => ({ x: (a.a.x + a.b.x) / 2 - uy * ap * side2, y: (a.a.y + a.b.y) / 2 + ux * ap * side2 });
    const occupied = (p) => shapesAt(p).some((e) => !isFill(e) && insideEl(e, p));
    let side = -1;
    if (occupied(centerOn(side)) && !occupied(centerOn(-side))) side = -side;
    if (a.flip) side = -side;
    const c = centerOn(side);
    const s = specFromCenter(c, R, Math.atan2(a.a.y - c.y, a.a.x - c.x) * 180 / Math.PI);
    s.pts[0] = { x: a.a.x, y: a.a.y };
    const i = dist(s.pts[1], a.b) < dist(s.pts[n2 - 1], a.b) ? 1 : n2 - 1;
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
    const P = state.pattern;
    if (P.type === "rows") {
      applyRows(region, P);
      return;
    }
    const origin = P.type === "rings" ? p || { x: state.doc.x + state.doc.w / 2, y: state.doc.y + state.doc.h / 2 } : { x: region.bb.x0, y: region.bb.y0 };
    const res = build({
      type: P.type,
      size: P.size,
      angle: P.angle,
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
    if (segs.length > 3e3 && !confirm(t("This adds {n} lines, which may make editing slow. Continue?", { n: segs.length }))) return;
    addLineSegments(segs);
    commitGeometry();
    toast(t("Added the pattern “{type}” ({n} {n|line|lines}).", { type: t(TYPES.find((p2) => p2[0] === P.type)[1]), n: segs.length }));
  }
  function applyRows(region, P) {
    const span = Math.max(region.bb.x1 - region.bb.x0, region.bb.y1 - region.bb.y0);
    if (P.size * 2 > span) {
      toast(t("The rows are wider than this area – use a smaller size."));
      return;
    }
    const { loops, cuts } = build2({ rings: [region.outer, ...region.holes], width: P.size, length: P.size, rows: P.rows || 0 });
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
        const n2 = showGaps();
        toast(n2 ? t("No closed area here. The red circles show line ends that don’t touch anything.") : t("No closed area here – make sure the lines meet."));
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
        const target2 = { x: a.anchor.x + raw.x - a.start.x, y: a.anchor.y + raw.y - a.start.y };
        const p = resolvePoint(e, target2, { exclude: a.exclude });
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
    root.querySelectorAll("script,foreignObject").forEach((n2) => n2.remove());
    for (const n2 of [root, ...root.querySelectorAll("*")]) {
      for (const a of [...n2.attributes]) {
        if (/^on/i.test(a.name) || /href$/i.test(a.name) && /^\s*javascript:/i.test(a.value)) n2.removeAttribute(a.name);
      }
    }
  }
  function convertLinearPaths() {
    for (const p of [...shapesG.querySelectorAll("path")]) {
      if (p.closest("defs,clipPath,mask,pattern,symbol,marker") || isFill(p)) continue;
      const polys = linearPath(p.getAttribute("d") || "");
      if (!polys || polys.length !== 1 || polys[0].pts.length < 2) continue;
      const n2 = document.createElementNS(SVGNS, polys[0].closed ? "polygon" : "polyline");
      for (const a of p.attributes) if (a.name !== "d") n2.setAttributeNS(a.namespaceURI, a.name, a.value);
      n2.setAttribute("points", ptsStr(polys[0].pts));
      p.replaceWith(n2);
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
    const box = hasVB ? { x: vb[0], y: vb[1], w: vb[2], h: vb[3] } : { x: 0, y: 0, w: parseFloat(root.getAttribute("width")) || 1e3, h: parseFloat(root.getAttribute("height")) || 1e3 };
    const ours = !!root.querySelector('[id="mosaic-shapes"]');
    const wm = /^\s*([\d.]+)\s*(mm|cm|in)\s*$/.exec(root.getAttribute("width") || "");
    let docUnit = wm && hasVB && Math.abs(+wm[1] - box.w) <= box.w * 1e-6 + 1e-9 ? wm[2] : "px";
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
    state.doc = { ...box, bg: ours ? bg : null, unit: docUnit };
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
    const n2 = uniqueName((name || t("From file")).replace(/\.svg$/i, ""));
    state.palettes[n2] = colors;
    switchPalette(n2);
    toast(t("The file’s colors were added as the palette “{name}”.", { name: n2 }));
  }
  function confirmDiscard() {
    return !rt.dirty || confirm(t("Discard unsaved changes to the current drawing?\n(A copy is kept in History.)"));
  }
  var SVG_TYPES = [{ description: "SVG image", accept: { "image/svg+xml": [".svg"] } }];
  async function openFile() {
    if (!confirmDiscard()) return;
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
      const n2 = prompt(t("File name:"), rt.fileName);
      if (!n2) return;
      rt.fileName = /\.svg$/i.test(n2) ? n2 : n2 + ".svg";
    }
    download(new Blob([text], { type: "image/svg+xml" }), rt.fileName);
    rt.dirty = false;
    updateTitle();
  }
  function exportPNG() {
    const d = state.doc;
    const def = unit() === "px" ? Math.max(d.w, 2e3) : 3e3;
    const ans = prompt(t("PNG width in pixels:"), String(Math.round(def)));
    if (!ans) return;
    const W = Math.round(+ans);
    if (!(W > 0 && W <= 16e3)) {
      toast(t("Invalid width."));
      return;
    }
    const H = Math.max(1, Math.round(W * d.h / d.w));
    const url = URL.createObjectURL(new Blob([buildSVGString({ photo: false, grout: state.grout.on, pageOnly: true })], { type: "image/svg+xml" }));
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = W;
      c.height = H;
      c.getContext("2d").drawImage(img, 0, 0, W, H);
      URL.revokeObjectURL(url);
      c.toBlob((b) => b ? download(b, rt.fileName.replace(/\.svg$/i, "") + ".png") : toast(t("PNG export failed.")), "image/png");
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      toast(t("PNG export failed."));
    };
    img.src = url;
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
    if (!confirmDiscard()) return;
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
      await Store.addVersion({ time: Date.now(), name: rt.fileName, note, svg: buildSVGString(), tiles: fillsG.children.length });
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
        const p = pl.pts, n2 = p.length, m = pl.closed ? n2 : n2 - 1, base = segs.length;
        for (let i = 0; i < m; i++) segs.push({ a: p[i], b: p[(i + 1) % n2] });
        if (!pl.closed && m > 0) {
          ends.push({ p: p[0], seg: base });
          ends.push({ p: p[n2 - 1], seg: base + m - 1 });
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
    for (const n2 of [8, 20, 48]) {
      const pts = [];
      for (let i = 0; i < n2; i++) for (let j = 0; j < n2; j++) {
        const p = { x: bb.x0 + (bb.x1 - bb.x0) * (i + 0.5) / n2, y: bb.y0 + (bb.y1 - bb.y0) * (j + 0.5) / n2 };
        if (inside(p)) pts.push(p);
      }
      if (pts.length >= 6 || n2 === 48) {
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
      const inside = (p) => rings.reduce((n2, r) => n2 + (pointInPolygon(p, r) ? 1 : 0), 0) % 2 === 1;
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
    for (const r of [reg.outer, ...reg.holes]) for (let i = 0, n2 = r.length; i < n2; i++) {
      const a = r[i], b = r[(i + 1) % n2], len = dist(a, b);
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
        const n2 = pl.pts.length, m = pl.closed ? n2 : n2 - 1;
        for (let i = 0; i < m; i++) if (dist(p, project(p, pl.pts[i], pl.pts[(i + 1) % n2])) <= t2) return el;
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
      if (!many && EDITABLE.has(el.tagName) && !isFill(el)) docVerts(el).forEach((q, i) => state.handles.push({ el, idx: i, x: q.x, y: q.y }));
    }
    const s = px(rt.handlePx - 2);
    for (const h of state.handles) {
      mk("rect", { x: h.x - s / 2, y: h.y - s / 2, width: s, height: s, class: ngonData(h.el) ? "handle ngon" : "handle" }, selG);
    }
  }
  function describe(el) {
    if (isFill(el)) return "painted area";
    const ng = ngonData(el);
    if (ng) return `${ng.n}-gon`;
    return el.tagName;
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
    const n2 = clamp(Math.round(s.n) || 2, 2, 64), out = [];
    for (let k = 0; k < n2; k++) out.push(rot(k * 2 * Math.PI / n2));
    if (s.mirror) for (let k = 0; k < n2; k++) {
      const r = rot(k * 2 * Math.PI / n2);
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
      const n2 = clamp(Math.round(s.n) || 2, 2, 64);
      for (let k = 0; k < n2; k++) ray(-Math.PI / 2 + k * 2 * Math.PI / n2);
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
      for (const n2 of r.removedNodes) if (n2.nodeType === 1) {
        shapeList = null;
        shapeGrid = null;
        return;
      }
    }
    for (const r of recs) for (const n2 of r.addedNodes) {
      if (n2.nodeType !== 1 || !n2.isConnected) continue;
      for (const el of [n2, ...n2.querySelectorAll(SHAPE_SEL)]) {
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
    const num3 = (n2) => parseFloat(el.getAttribute(n2)) || 0;
    let polys = [];
    if (tag === "line") polys = [{ pts: [{ x: num3("x1"), y: num3("y1") }, { x: num3("x2"), y: num3("y2") }], closed: false }];
    else if (tag === "polyline" || tag === "polygon") polys = [{ pts: parsePoints(el.getAttribute("points")), closed: tag === "polygon" }];
    else if (tag === "rect") {
      const x = num3("x"), y = num3("y"), w = num3("width"), h = num3("height");
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
    const num3 = () => {
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
          let nx = num3(), ny = num3();
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
          let nx = num3(), ny = num3();
          if (rel) {
            nx += x;
            ny += y;
          }
          x = nx;
          y = ny;
          push();
        } else if (C === "H") {
          const v = num3();
          x = rel ? x + v : v;
          push();
        } else if (C === "V") {
          const v = num3();
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
    let n2 = 0;
    for (const pl of g.polys) if (pl.closed && pointInPolygon(p, pl.pts)) n2++;
    return n2 % 2 === 1;
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
  function localVerts(el) {
    if (el.tagName === "line") {
      const n2 = (k) => parseFloat(el.getAttribute(k)) || 0;
      return [{ x: n2("x1"), y: n2("y1") }, { x: n2("x2"), y: n2("y2") }];
    }
    return parsePoints(el.getAttribute("points"));
  }
  function docVerts(el) {
    const m = elMatrix(el);
    return localVerts(el).map((p) => applyM(m, p));
  }
  function setVertex(el, idx, q) {
    if (el.tagName === "line") {
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
      if (!EDITABLE.has(el.tagName) || isFill(el) || !selectable(el)) continue;
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
    const [n2, cx, cy, r, rot] = s.split(/[\s,]+/).map(Number);
    if (!(n2 >= 3) || ![cx, cy, r, rot].every(Number.isFinite)) return null;
    return { n: n2, cx, cy, r, rot };
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

  // src/core/panel.ts
  function setSides(n2) {
    state.sides = clamp(Math.round(n2) || 6, 3, 64);
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
    bindCheck("#opt-newfill", "newFill");
    bindCheck("#opt-newfill2", "newFill", () => {
      $("#opt-newfill").checked = state.newFill;
    });
    $("#opt-newfill").addEventListener("change", () => {
      $("#opt-newfill2").checked = state.newFill;
    });
    const pt = $("#pat-type");
    for (const [v, label] of TYPES) {
      const o = document.createElement("option");
      o.value = v;
      o.textContent = t(label);
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
    $("#btn-ref-remove").onclick = () => {
      if (confirm(t("Remove the tracing photo?"))) {
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
      const n2 = clamp(Math.round(+$("#sel-sides").value) || gd.n, 3, 64);
      const r = +$("#sel-radius").value > 0 ? +$("#sel-radius").value : gd.r;
      const rot = Number.isFinite(+$("#sel-rot").value) ? +$("#sel-rot").value : gd.rot;
      setNgon(el, { ...gd, n: n2, r, rot });
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
  function svgSize(svg2) {
    const vb = /viewBox="\s*[-\d.e]+[\s,]+[-\d.e]+[\s,]+([\d.e]+)[\s,]+([\d.e]+)/.exec(svg2);
    if (vb) return { w: +vb[1], h: +vb[2] };
    const w = /\swidth="([\d.]+)/.exec(svg2), h = /\sheight="([\d.]+)/.exec(svg2);
    return { w: w ? +w[1] : 300, h: h ? +h[1] : 150 };
  }
  async function svgToCanvas(svg2, long) {
    const { w, h } = svgSize(svg2), k = long / Math.max(w, h, 1e-9);
    const W = Math.max(1, Math.round(w * k)), H = Math.max(1, Math.round(h * k));
    const sized = svg2.replace(/<svg\b([^>]*)>/, (m, a) => `<svg${a.replace(/\s(width|height)="[^"]*"/g, "")} width="${W}" height="${H}">`);
    const url = URL.createObjectURL(new Blob([sized], { type: "image/svg+xml" }));
    try {
      const img = await loadImg(url);
      const c = document.createElement("canvas");
      c.width = W;
      c.height = H;
      c.getContext("2d").drawImage(img, 0, 0, W, H);
      return c;
    } finally {
      URL.revokeObjectURL(url);
    }
  }
  async function svgToPng(svg2, long) {
    return canvasToPng(await svgToCanvas(svg2, long));
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
    if (state.tool !== "free" && !(state.tool === "line" && state.chain)) state.lineStart = null;
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
      if (state.tool === "free" && state.freePts) finishFree();
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
    const target2 = e.target;
    if (typingIn(target2)) {
      if (e.key === "Escape") target2.blur();
      return;
    }
    if (target2.tagName === "INPUT" && e.key === " ") return;
    if (document.querySelector("dialog[open]")) return;
    const ctrl = e.ctrlKey || e.metaKey, k = e.key.toLowerCase();
    if (ctrl) {
      if (k === "z" && !e.shiftKey) undo();
      else if (k === "y" || k === "z" && e.shiftKey) redo();
      else if (k === "s") save(e.shiftKey);
      else if (k === "o") openFile();
      else if (k === "d") duplicate();
      else if (k === "a") selectAll();
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
      else if (confirmDiscard()) loadFile(f);
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
  function quadLeaves(box, size, adaptive, busy) {
    const top = adaptive ? size * 2 : size, min = adaptive ? size / 2 : size, out = [];
    const visit = (x, y, s) => {
      if (x >= box.x + box.w - 1e-9 || y >= box.y + box.h - 1e-9) return;
      if (s > min * 1.0001 && busy(x, y, s, s)) {
        const h = s / 2;
        visit(x, y, h);
        visit(x + h, y, h);
        visit(x, y + h, h);
        visit(x + h, y + h, h);
      } else out.push({ x, y, s });
    };
    for (let j = 0; j * top < box.h; j++) for (let i = 0; i * top < box.w; i++) visit(box.x + i * top, box.y + j * top, top);
    return out;
  }
  function clipHalf(poly, f) {
    const out = [];
    for (let i = 0, n2 = poly.length; i < n2; i++) {
      const a = poly[i], b = poly[(i + 1) % n2], fa = f(a), fb = f(b);
      if (fa <= 0) out.push(a);
      if (fa < 0 && fb > 0 || fa > 0 && fb < 0) {
        const t2 = fa / (fa - fb);
        out.push({ x: a.x + (b.x - a.x) * t2, y: a.y + (b.y - a.y) * t2 });
      }
    }
    return out;
  }
  function voronoi(seeds, box) {
    const cell = Math.sqrt(box.w * box.h / Math.max(1, seeds.length)) || 1, grid = /* @__PURE__ */ new Map();
    const key = (i, j) => i + "," + j;
    seeds.forEach((s, idx) => {
      const k = key(Math.floor(s.x / cell), Math.floor(s.y / cell));
      (grid.get(k) || grid.set(k, []).get(k)).push(idx);
    });
    const maxRing = Math.ceil(Math.max(box.w, box.h) / cell) + 1;
    return seeds.map((s, idx) => {
      const ci = Math.floor(s.x / cell), cj = Math.floor(s.y / cell);
      let poly = rect2(box.x, box.y, box.w, box.h);
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
          const n2 = seeds[o], nx = n2.x - s.x, ny = n2.y - s.y, mx = (s.x + n2.x) / 2, my = (s.y + n2.y) / 2;
          poly = clipHalf(poly, (p) => (p.x - mx) * nx + (p.y - my) * ny);
          if (poly.length < 3) break;
        }
      }
      return poly;
    }).filter((p) => p.length >= 3);
  }
  function cells2({ style, box, size, detail = 0, busy = () => false, seed = 1 }) {
    const adaptive = detail > 0;
    if (style === "hex") {
      const s = size / Math.sqrt(3);
      return cells("hex", s, { x0: -s, y0: -s, x1: box.w + s, y1: box.h + s }).map((poly) => poly.map((p) => ({ x: p.x + box.x, y: p.y + box.y })));
    }
    if (style === "brick") {
      const out = [];
      for (let j = 0; j * size < box.h; j++) {
        const off = j % 2 ? -size : 0;
        for (let x = box.x + off; x < box.x + box.w; x += 2 * size) {
          const y = box.y + j * size;
          if (adaptive && busy(x, y, 2 * size, size)) out.push(rect2(x, y, size, size), rect2(x + size, y, size, size));
          else out.push(rect2(x, y, 2 * size, size));
        }
      }
      return out;
    }
    const leaves = quadLeaves(box, size, adaptive, busy);
    if (style === "irregular") {
      const rnd = rng(seed);
      const seeds = leaves.map((l) => ({ x: l.x + l.s * (0.5 + (rnd() - 0.5) * 0.7), y: l.y + l.s * (0.5 + (rnd() - 0.5) * 0.7) })).filter((p) => p.x >= box.x && p.y >= box.y && p.x <= box.x + box.w && p.y <= box.y + box.h);
      return voronoi(seeds, box);
    }
    return leaves.map((l) => rect2(l.x, l.y, l.s, l.s));
  }
  function lines(polys, rings, inside, eps2) {
    const q = eps2 * 10, key = (p) => Math.round(p.x / q) + "," + Math.round(p.y / q), seen = /* @__PURE__ */ new Set(), pieces = [];
    const keep = (p) => inside(p) && distToRings(p, rings) > eps2 * 20;
    for (const poly of polys) for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length], k1 = key(a), k2 = key(b);
      const k = k1 < k2 ? k1 + "|" + k2 : k2 + "|" + k1;
      if (k1 === k2 || seen.has(k)) continue;
      seen.add(k);
      pieces.push(...clipSegment(a, b, rings, keep));
    }
    return mergeCollinear(pieces, eps2);
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

  // src/features/photo-tools.ts
  var PhotoTools = /* @__PURE__ */ (() => {
    async function pixels() {
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
      const box = { x: +im.getAttribute("x"), y: +im.getAttribute("y"), w: +im.getAttribute("width"), h: +im.getAttribute("height") };
      const at = (p) => {
        const u = Math.floor((p.x - box.x) / box.w * W), v = Math.floor((p.y - box.y) / box.h * H);
        if (u < 0 || v < 0 || u >= W || v >= H) return null;
        const i = (v * W + u) * 4;
        return data[i + 3] < 20 ? null : [data[i], data[i + 1], data[i + 2]];
      };
      return { at, box };
    }
    function average(px2, pts) {
      let r = 0, g = 0, b = 0, n2 = 0;
      for (const p of pts) {
        const c = px2.at(p);
        if (!c) continue;
        r += c[0];
        g += c[1];
        b += c[2];
        n2++;
      }
      return n2 ? [r / n2, g / n2, b / n2] : null;
    }
    function detailAt(px2, x, y, w, h) {
      const labs = [];
      for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
        const c = px2.at({ x: x + w * (i + 0.5) / 5, y: y + h * (j + 0.5) / 5 });
        if (c) labs.push(toLab(c));
      }
      if (labs.length < 2) return 0;
      const m = [0, 1, 2].map((k) => labs.reduce((s, l) => s + l[k], 0) / labs.length);
      return labs.reduce((s, l) => s + Math.hypot(l[0] - m[0], l[1] - m[1], l[2] - m[2]), 0) / labs.length;
    }
    function suggestPalette(px2, box, n2) {
      const labs = [];
      for (let i = 0; i < 70; i++) for (let j = 0; j < 70; j++) {
        const c = px2.at({ x: box.x + box.w * (i + 0.5) / 70, y: box.y + box.h * (j + 0.5) / 70 });
        if (c) labs.push(toLab(c));
      }
      return [...new Set(kmeans(labs, n2, 7).map(fromLab))];
    }
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
    return { pixels, average, detailAt, suggestPalette, colorTiles };
  })();

  // src/features/vision.ts
  var Vision = (() => {
    const $10 = (s) => document.querySelector(s);
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
      const defs = $10("#mz-uidefs");
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
        const el = $10(id);
        if (f) el.setAttribute("filter", f);
        else el.removeAttribute("filter");
      }
      $10("#view-filter").value = view;
      $10("#stage").classList.toggle("vision-on", view !== "none");
      if (marking) markLowContrast();
    }
    function markLowContrast() {
      const g = $10("#mz-marks");
      g.innerHTML = "";
      if (!marking) return 0;
      const ix = MZ.regionIndex();
      let n2 = 0;
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
        n2++;
      }
      return n2;
    }
    function setMarking(on2) {
      marking = on2;
      $10("#btn-contrast").classList.toggle("active", on2);
      const n2 = markLowContrast();
      if (on2) MZ.toast(n2 ? view === "none" ? t("{n} {n|tile blends|tiles blend} into a neighbour of another color.", { n: n2 }) : t("{n} {n|tile blends|tiles blend} into a neighbour of another color (in this view).", { n: n2 }) : t("No tile blends into its neighbours."));
    }
    function init() {
      buildFilters();
      const sel2 = $10("#view-filter");
      for (const [v, label] of VIEWS) {
        const o = document.createElement("option");
        o.value = v;
        o.textContent = label;
        sel2.append(o);
      }
      sel2.onchange = () => setView(sel2.value);
      $10("#btn-contrast").onclick = () => setMarking(!marking);
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

  // src/features/report.ts
  var $2 = (s) => document.querySelector(s);
  var { state: state2 } = MZ;
  var esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
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
    let n2 = 0;
    for (const f of ix.faces) {
      const r = ix.region(f), p = MZ.gridSample(r.bb, (q) => MZ.insideRegion(r, q), 1)[0];
      if (p && !MZ.isPaintedAt(p)) n2++;
    }
    return n2;
  }
  var report = { tileW: 10, tileH: 10, waste: 10 };
  try {
    Object.assign(report, JSON.parse(localStorage.getItem("mz-report") || "{}"));
  } catch {
  }
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
    $2("#rep-summary").innerHTML = t("<b>{n}</b> painted {n|area|areas} in <b>{c}</b> {c|color|colors}", { n: tiles, c: rows.length }) + (free ? " · " + t("<b>{n}</b> not painted yet", { n: free }) : " · " + t("everything is painted")) + " · " + t("page {w} × {h} {unit}", { w: MZ.fmt(d.w), h: MZ.fmt(d.h), unit: u });
    const palOpts = state2.palette.map((c, i) => `<option value="${c}" style="background:${c}">#${i + 1} ${c}</option>`).join("");
    $2("#rep-table").innerHTML = `<thead><tr><th>#</th><th></th><th>${t("Color")}</th><th>${t("Areas")}</th><th>${t("Total area")}</th><th>${t("Share of area")}</th>` + (expert ? `<th title="${t("Pieces of the size set above, plus waste")}">${t("Pieces to buy")}</th>` : "") + `<th>${t("Replace with")}</th></tr></thead><tbody>` + rows.map((r) => `<tr><td>${r.n}</td><td><span class="mini" style="background:${r.c}"></span></td><td>${r.c}</td><td>${r.tiles}</td><td>${MZ.fmtArea(r.area)}</td><td>${r.share.toFixed(1)} %</td>` + (expert ? `<td>${r.pieces || "–"}</td>` : "") + `<td><select data-from="${r.c}"><option value="">—</option>${palOpts}<option value="none">${t("Erase")}</option></select></td></tr>`).join("") + `</tbody>`;
    if (!rows.length) $2("#rep-table").innerHTML = `<tbody><tr><td>${t("Nothing is painted yet. Use the paint bucket, or “Color tiles from photo”.")}</td></tr></tbody>`;
    for (const s of document.querySelectorAll("#rep-table select")) {
      s.onchange = () => {
        if (!s.value) return;
        const to = s.value === "none" ? null : s.value;
        const n2 = MZ.replaceColor(s.dataset.from, to);
        MZ.commit(true);
        MZ.toast(to ? t("Recolored {n} {n|area|areas}.", { n: n2 }) : t("Erased {n} {n|area|areas}.", { n: n2 }));
        renderReport();
      };
    }
    for (const el of document.querySelectorAll(".unit-label")) el.textContent = u;
    const alike = Vision.similarPairs(rows.map((r) => r.c));
    $2("#rep-alike").innerHTML = alike.length ? `<h3>${t("Colors that may look alike")}</h3><ul>` + alike.map((p) => `<li><span class="mini" style="background:${p.a}"></span> <span class="mini" style="background:${p.b}"></span> ${esc(t("{a} and {b} {how}", { a: p.a, b: p.b, how: Vision.describe(p.views) }))}</li>`).join("") + "</ul>" : "";
  }
  function reportCSV() {
    const rows = reportRows(), u = MZ.unit();
    const lines2 = [["number", "color", "areas", `area_${u}2`, "share_percent", "pieces"].join(",")];
    for (const r of rows) lines2.push([r.n, r.c, r.tiles, r.area.toFixed(2), r.share.toFixed(2), r.pieces].join(","));
    MZ.download(new Blob([lines2.join("\n") + "\n"], { type: "text/csv" }), MZ.fileName.replace(/\.svg$/i, "") + "-colors.csv");
  }
  $2("#btn-report").onclick = () => {
    $2("#rep-tw").value = report.tileW;
    $2("#rep-th").value = report.tileH;
    $2("#rep-waste").value = report.waste;
    renderReport();
    $2("#dlg-report").showModal();
  };
  for (const id of ["#rep-tw", "#rep-th", "#rep-waste"]) {
    $2(id).onchange = () => {
      report.tileW = +$2("#rep-tw").value || 0;
      report.tileH = +$2("#rep-th").value || 0;
      report.waste = +$2("#rep-waste").value || 0;
      try {
        localStorage.setItem("mz-report", JSON.stringify(report));
      } catch {
      }
      renderReport();
    };
  }
  $2("#rep-csv").onclick = reportCSV;

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
  var esc2 = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
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
  function sheetSections(box, k, L, { title = "", prefix = "" } = {}) {
    const multi = L.sheets.length > 1;
    return L.sheets.map((s) => {
      const vb = [box.x + s.x / k, box.y + s.y / k, s.w / k, s.h / k];
      const shade = [];
      if (multi && s.col < L.cols - 1 && s.w >= L.aw) shade.push([vb[0] + vb[2] - OVERLAP / k, vb[1], OVERLAP / k, vb[3]]);
      if (multi && s.row < L.rows - 1 && s.h >= L.ah) shade.push([vb[0], vb[1] + vb[3] - OVERLAP / k, vb[2], OVERLAP / k]);
      const marks = shade.map((r) => `<rect x="${n(r[0])}" y="${n(r[1])}" width="${n(r[2])}" height="${n(r[3])}" fill="rgba(0,120,255,0.12)" stroke="rgba(0,120,255,0.6)" stroke-dasharray="${n(2 / k)} ${n(2 / k)}" stroke-width="${n(0.3 / k)}"/>`).join("");
      const label = multi ? prefix + t("Sheet {sheet} – row {row}, column {col} of {cols} · blue strips are covered by the next sheet", { sheet: s.label, row: s.label.replace(/\d+$/, ""), col: s.col + 1, cols: L.cols }) : prefix + title;
      return `<section class="sheet"><div class="label">${esc2(label)}</div><svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.map(n).join(" ")}" style="width:${n(s.w * L.scale)}mm;height:${n(s.h * L.scale)}mm"><use href="#art"/>${marks}</svg></section>`;
    });
  }
  function layoutInfo(L, mode) {
    const o = t(L.orientation);
    if (mode === "fit") return t("One {paper} sheet ({orientation}), at {pct} % of the real size.", { paper: L.paper.name, orientation: o, pct: Math.round(L.scale * 100) });
    if (L.sheets.length === 1) return t("One {paper} sheet ({orientation}) at real size.", { paper: L.paper.name, orientation: o });
    return t("{n} {paper} {n|sheet|sheets} ({orientation}, {rows} × {cols}, overlapping {overlap} mm) at real size.", { n: L.sheets.length, paper: L.paper.name, orientation: o, rows: L.rows, cols: L.cols, overlap: OVERLAP });
  }
  function overviewSection(box, k, A, rects, heading, extra = "") {
    const s = Math.min(A.aw / (box.w * k), (A.ah - 20) / (box.h * k));
    const stroke = 0.6 / k / s;
    const marks = rects.map((r) => `<rect x="${n(r.x)}" y="${n(r.y)}" width="${n(r.w)}" height="${n(r.h)}" fill="none" stroke="#0070f0" stroke-width="${n(stroke)}"/><text x="${n(r.x + r.w / 2)}" y="${n(r.y + r.h / 2)}" font-size="${n(Math.min(r.w, r.h) / 4)}" text-anchor="middle" dominant-baseline="central" fill="#0070f0" font-family="Arial" font-weight="bold">${esc2(r.label)}</text>`).join("");
    return `<section class="sheet"><div class="label">${esc2(heading)}</div><svg xmlns="http://www.w3.org/2000/svg" viewBox="${[box.x, box.y, box.w, box.h].map(n).join(" ")}" style="width:${n(box.w * k * s)}mm;height:${n(box.h * k * s)}mm"><use href="#art" opacity="0.45"/>${marks}</svg>${extra}</section>`;
  }
  function page({ art, sections, paper = "a4", orientation = "portrait", title = "Mosaic" }) {
    const p = PAPERS[paper] || PAPERS.a4;
    return `<!doctype html><html><head><meta charset="utf-8"><title>${esc2(title)}</title><style>
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
  function html({ art, box, unit: unit2, mmPerUnit = 0, paper = "a4", mode = "real", legend = "", title = "Mosaic" }) {
    const k = mmPerUnit || MM[unit2] || MM.px;
    const L = layout(box.w * k, box.h * k, paper, mode);
    const sections = [];
    if (L.sheets.length > 1) {
      sections.push(overviewSection(
        box,
        k,
        L,
        L.sheets.map((s) => ({ x: box.x + s.x / k, y: box.y + s.y / k, w: s.w / k, h: s.h / k, label: s.label })),
        `${title} – ` + t("{n} sheets ({rows} × {cols}), real size {w} × {h} cm", { n: L.sheets.length, rows: L.rows, cols: L.cols, w: num(+n(box.w * k / 10)), h: num(+n(box.h * k / 10)) })
      ));
    }
    sections.push(...sheetSections(box, k, L, { title }));
    if (legend) sections.push(`<section class="sheet legend">${legend}</section>`);
    return page({ art, sections, paper, orientation: L.orientation, title });
  }

  // src/features/print.ts
  var $3 = (s) => document.querySelector(s);
  var { state: state3 } = MZ;
  var esc3 = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  function labelSpot(el) {
    const g = MZ.geomOf(el), polys = g.polys.filter((p) => p.closed);
    const pts = MZ.gridSample(g.bbox, (p) => MZ.insideEl(el, p), 80);
    let best = null, bd = 0;
    for (const p of pts) {
      let d = Infinity;
      for (const pl of polys) for (let i = 0, n2 = pl.pts.length; i < n2; i++) d = Math.min(d, dist(p, project(p, pl.pts[i], pl.pts[(i + 1) % n2])));
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
  function legendHTML(rows) {
    return rows.length ? `<h2>${esc3(MZ.fileName)} – ${t("colors")}</h2><table>` + rows.map((r) => `<tr><td class="n">${r.n}</td><td><span style="background:${r.c}"></span></td><td>${r.c}</td><td>${t("{n} {n|area|areas}", { n: r.tiles })}</td><td>${esc3(MZ.fmtArea(r.area))}</td></tr>`).join("") + "</table>" : "";
  }
  function printTemplate() {
    const { art, rows } = printArt(document.querySelector("input[name=print-style]:checked").value);
    const d = state3.doc;
    openPrintPage(html({
      art,
      box: { x: d.x, y: d.y, w: d.w, h: d.h },
      unit: MZ.unit(),
      legend: $3("#print-legend").checked ? legendHTML(rows) : "",
      title: MZ.fileName.replace(/\.svg$/i, ""),
      paper: $3("#print-paper").value,
      mode: document.querySelector("input[name=print-size]:checked").value
    }));
  }
  function openPrintPage(html2) {
    const url = URL.createObjectURL(new Blob([html2], { type: "text/html" }));
    const w = window.open(url, "_blank");
    if (!w) {
      MZ.toast(t("The browser blocked the print window – allow pop-ups for this page."));
      return;
    }
    setTimeout(() => URL.revokeObjectURL(url), 6e4);
  }
  function updatePrintInfo() {
    const d = state3.doc, k = MM[MZ.unit()] || MM.px;
    const mode = document.querySelector("input[name=print-size]:checked").value;
    const L = layout(d.w * k, d.h * k, $3("#print-paper").value, mode);
    $3("#print-info").textContent = layoutInfo(L, mode);
  }
  $3("#btn-print").onclick = () => {
    updatePrintInfo();
    $3("#dlg-print").showModal();
  };
  var PrintTools = { art: printArt, legend: legendHTML, open: openPrintPage, colorStats, colorNumbers };
  for (const el of document.querySelectorAll("#print-paper, input[name=print-size]")) el.onchange = updatePrintInfo;
  $3("#print-go").onclick = () => {
    $3("#dlg-print").close();
    printTemplate();
  };

  // src/shared/history-ui.ts
  var esc4 = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  function initHistoryUI(host, button) {
    const dlg = document.createElement("dialog");
    dlg.id = "dlg-history";
    dlg.innerHTML = `<form method="dialog" class="dlg-head"><h2>${t("History")}</h2><button title="${t("Close")}">✕</button></form>
<p class="note">${esc4(host.texts.intro)}</p>
<div class="row"><button id="hist-save">${t("Save a version now")}</button></div>
<div id="hist-list"></div>`;
    document.body.append(dlg);
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg) dlg.close();
    });
    const list = dlg.querySelector("#hist-list");
    let thumbs2 = [];
    async function render3() {
      thumbs2.forEach((u) => URL.revokeObjectURL(u));
      thumbs2 = [];
      let versions = [];
      try {
        versions = await host.list();
      } catch {
        list.innerHTML = `<p class="note">${t("Version history needs browser storage (IndexedDB), which is not available here.")}</p>`;
        return;
      }
      if (!versions.length) {
        list.innerHTML = `<p class="note">${esc4(host.texts.empty)}</p>`;
        return;
      }
      list.innerHTML = "";
      for (const v of versions) {
        const row = document.createElement("div");
        row.className = "hist-row";
        const url = URL.createObjectURL(host.thumbnail(v));
        thumbs2.push(url);
        const detail = host.detail(v);
        row.innerHTML = `<img src="${url}" alt=""><div class="hist-info"><b>${new Date(v.time).toLocaleString(lang)}</b><span>${esc4(v.name || "")} · ${esc4(v.note || "")}${detail ? ` · ${esc4(detail)}` : ""}</span></div>`;
        const b = document.createElement("button");
        b.textContent = t("Restore");
        b.onclick = async () => {
          dlg.close();
          await host.restore(v);
        };
        row.append(b);
        list.append(row);
      }
    }
    button.onclick = () => {
      render3();
      dlg.showModal();
    };
    dlg.querySelector("#hist-save").onclick = async () => {
      toast(await host.saveNow() ? t("Version saved.") : t("Could not save a version (browser storage unavailable)."));
      render3();
    };
  }

  // src/features/history-ui.ts
  var $4 = (s) => document.querySelector(s);
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
  }, $4("#btn-history"));
  $4("#btn-autocolor").onclick = () => PhotoTools.colorTiles({ onlyUnpainted: state4.onlyUnpainted });

  // src/features/rulers.ts
  var $5 = (s) => document.querySelector(s);
  var { state: state5 } = MZ;
  var rx = $5("#ruler-x");
  var ry = $5("#ruler-y");
  var corner = $5("#ruler-corner");
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
        const label = String(+t2.toFixed(6));
        if (horizontal) c.fillText(label, s + 3, 10);
        else {
          c.save();
          c.translate(10, s + 3);
          c.rotate(-Math.PI / 2);
          c.textAlign = "right";
          c.fillText(label, 0, 0);
          c.restore();
        }
      }
    }
    c.stroke();
  }
  function drawRulers() {
    const show = state5.mode === "expert" && state5.rulers;
    MZ.stage.classList.toggle("with-rulers", show);
    rx.hidden = ry.hidden = corner.hidden = !show;
    if (!show) return;
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
    if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
      navigator.serviceWorker.register("sw.js").catch(() => {
      });
    }
  }

  // src/features/shell.ts
  initShell(MZ.stage);

  // src/features/automosaic.ts
  var $6 = (s) => document.querySelector(s);
  var { state: state6 } = MZ;
  var MAX_TILES = 8e3;
  var opts = { style: "square", size: 10, detail: 50, colors: "palette", count: 12, replace: true };
  try {
    Object.assign(opts, JSON.parse(localStorage.getItem("mz-automosaic") || "{}"));
  } catch {
  }
  var save2 = () => {
    try {
      localStorage.setItem("mz-automosaic", JSON.stringify(opts));
    } catch {
    }
  };
  function estimate() {
    const d = state6.doc, per = { square: 1, brick: 2, hex: Math.sqrt(3) / 2, irregular: 1 }[opts.style] || 1;
    const base = d.w * d.h / (opts.size * opts.size * per);
    return Math.round(opts.detail > 0 && opts.style !== "hex" ? base * (0.5 + opts.detail / 100) : base);
  }
  function renderUI() {
    $6("#am-style").value = opts.style;
    $6("#am-size").value = opts.size;
    $6("#am-detail").value = opts.detail;
    $6("#am-detail-row").hidden = opts.style === "hex";
    $6("#am-count").value = opts.count;
    for (const r of document.querySelectorAll("input[name=am-colors]")) r.checked = r.value === opts.colors;
    $6("#am-replace").checked = opts.replace;
    $6("#am-photo-missing").hidden = !!MZ.refImage();
    const n2 = estimate();
    $6("#am-estimate").textContent = n2 > MAX_TILES ? t("About {n} tiles – too many, use a bigger tile size.", { n: n2 }) : t("About {n} tiles.", { n: n2 });
    $6("#am-go").disabled = !MZ.refImage() || n2 > MAX_TILES;
  }
  async function generate() {
    const px2 = await PhotoTools.pixels();
    if (!px2) {
      MZ.toast(t("Load a photo first."));
      return;
    }
    const d = state6.doc, box = { x: d.x, y: d.y, w: d.w, h: d.h };
    const page2 = [{ x: d.x, y: d.y }, { x: d.x + d.w, y: d.y }, { x: d.x + d.w, y: d.y + d.h }, { x: d.x, y: d.y + d.h }];
    const bar = 4 + (1 - opts.detail / 100) * 26;
    const busy = (x, y, w, h) => PhotoTools.detailAt(px2, x, y, w, h) > bar;
    const cells3 = cells2({ style: opts.style, box, size: opts.size, detail: opts.detail / 100, busy, seed: (Date.now() & 65535) + 1 });
    if (cells3.length > MAX_TILES * 1.5) {
      MZ.toast(t("That gives {n} tiles – use a bigger tile size.", { n: cells3.length }));
      return;
    }
    const segs = lines(cells3, [page2], (p) => pointInPolygon(p, page2), eps);
    if (opts.replace) {
      if (MZ.hasContent()) await MZ.saveVersion(t("Before making a mosaic from the photo"));
      MZ.clearDrawing();
    }
    if (opts.colors === "suggest") {
      const cols = PhotoTools.suggestPalette(px2, px2.box, Math.max(2, Math.min(64, opts.count)));
      const name = MZ.addPalette(t("From photo"), cols);
      MZ.toast(t("New palette “{name}” with {n} {n|color|colors}.", { name, n: cols.length }));
    }
    MZ.addLineSegments(segs);
    const r = await PhotoTools.colorTiles({ onlyUnpainted: false, commit: false, quiet: true });
    MZ.commit();
    MZ.toast(t("Made a mosaic of {n} tiles from the photo.", { n: r ? r.painted : 0 }));
  }
  $6("#btn-automosaic").onclick = () => {
    renderUI();
    $6("#dlg-automosaic").showModal();
  };
  var sel = $6("#am-style");
  for (const [v, label] of STYLES) {
    const o = document.createElement("option");
    o.value = v;
    o.textContent = t(label);
    sel.append(o);
  }
  sel.onchange = () => {
    opts.style = sel.value;
    save2();
    renderUI();
  };
  $6("#am-size").onchange = (e) => {
    const v = parseFloat(e.target.value);
    if (v > 0) opts.size = v;
    save2();
    renderUI();
  };
  $6("#am-detail").oninput = (e) => {
    opts.detail = +e.target.value;
    save2();
    renderUI();
  };
  $6("#am-count").onchange = (e) => {
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
  $6("#am-replace").onchange = (e) => {
    opts.replace = e.target.checked;
    save2();
  };
  $6("#am-load").onclick = () => $6("#ref-file").click();
  $6("#ref-file").addEventListener("change", () => setTimeout(renderUI, 600));
  $6("#am-go").onclick = async () => {
    $6("#am-go").disabled = true;
    $6("#am-go").textContent = t("Working…");
    await new Promise((r) => setTimeout(r, 30));
    try {
      await generate();
    } finally {
      $6("#am-go").textContent = t("Make mosaic");
      $6("#dlg-automosaic").close();
    }
  };

  // src/lib/layplan.ts
  function panels(box, pw, ph) {
    const cols = Math.max(1, Math.ceil(box.w / pw - 1e-9)), rows = Math.max(1, Math.ceil(box.h / ph - 1e-9)), out = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const x = box.x + c * pw, y = box.y + r * ph;
      out.push({ index: out.length + 1, row: r, col: c, x, y, w: Math.min(pw, box.x + box.w - x), h: Math.min(ph, box.y + box.h - y) });
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
    const $10 = (s) => document.querySelector(s);
    const { state: state11 } = MZ;
    const esc5 = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
    const opts3 = { w: 0, h: 0, numbers: true, grid: true, paper: "a4" };
    try {
      Object.assign(opts3, JSON.parse(localStorage.getItem("mz-layplan") || "{}"));
    } catch {
    }
    const save4 = () => {
      try {
        localStorage.setItem("mz-layplan", JSON.stringify(opts3));
      } catch {
      }
    };
    const box = () => ({ x: state11.doc.x, y: state11.doc.y, w: state11.doc.w, h: state11.doc.h });
    const k = () => MM[MZ.unit()] || MM.px;
    const panelSize = () => ({ w: opts3.w > 0 ? opts3.w : 300 / k(), h: opts3.h > 0 ? opts3.h : 300 / k() });
    const plan = () => {
      const s = panelSize();
      return panels(box(), s.w, s.h);
    };
    function drawGrid(show) {
      const g = $10("#mz-panels");
      g.innerHTML = "";
      if (!show) return;
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
      const s = panelSize(), P = plan(), u = MZ.unit();
      $10("#lp-w").value = MZ.fmt(s.w);
      $10("#lp-h").value = MZ.fmt(s.h);
      for (const el of document.querySelectorAll("#dlg-layplan .unit-label")) el.textContent = u;
      $10("#lp-numbers").checked = opts3.numbers;
      $10("#lp-grid").checked = opts3.grid;
      $10("#lp-paper").value = opts3.paper;
      const L = layout(s.w * k(), s.h * k(), opts3.paper, "real");
      $10("#lp-info").textContent = t("{n} {n|panel|panels} ({rows} × {cols}) · each printed at real size on {s} {paper} {s|sheet|sheets}.", { n: P.panels.length, rows: P.rows, cols: P.cols, s: L.sheets.length, paper: L.paper.name });
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
      const P = plan(), K = k(), B = box(), u = MZ.unit();
      const { art, rows, nums } = PrintTools.art(opts3.numbers ? "both" : "colors");
      const title = MZ.fileName.replace(/\.svg$/i, "");
      const sheetsFor2 = (o) => P.panels.reduce((s, q) => s + layout(q.w * K, q.h * K, opts3.paper, "real", o).sheets.length, 0);
      const orientation = sheetsFor2("landscape") < sheetsFor2("portrait") ? "landscape" : "portrait";
      const A = area(opts3.paper, orientation);
      const sections = [overviewSection(
        B,
        K,
        A,
        P.panels.map((q) => ({ ...q, label: String(q.index) })),
        `${title} – ` + t("laying plan: {n} {n|panel|panels} ({rows} rows × {cols} columns) of {w} × {h} {unit}", { n: P.panels.length, rows: P.rows, cols: P.cols, w: MZ.fmt(panelSize().w), h: MZ.fmt(panelSize().h), unit: u })
      )];
      for (const q of P.panels) {
        const L = layout(q.w * K, q.h * K, opts3.paper, "real", orientation);
        sections.push(...sheetSections({ x: q.x, y: q.y, w: q.w, h: q.h }, K, L, {
          title: t("Panel {n} – row {row}, column {col}", { n: q.index, row: q.row + 1, col: q.col + 1 }),
          prefix: t("Panel {n}", { n: q.index }) + " · "
        }));
      }
      const counts = countByPanel(P, tiles());
      const chip = (c) => `<span style="background:${c}"></span>`;
      const table = `<table class="counts"><tr><td class="n">${t("Panel")}</td>${rows.map((r) => `<td class="n">${chip(r.c)} ${r.n}</td>`).join("")}</tr>` + P.panels.map((q) => `<tr><td class="n">${q.index}</td>${rows.map((r) => `<td>${counts.get(q.index).get(r.c) || ""}</td>`).join("")}</tr>`).join("") + "</table>";
      sections.push(`<section class="sheet"><div class="label">${esc5(title)} – ${t("tiles per panel and color")}</div>${table}</section>`);
      if (rows.length) sections.push(`<section class="sheet legend">${PrintTools.legend(rows)}</section>`);
      PrintTools.open(page({ art, sections, paper: opts3.paper, orientation, title: `${title} – ${t("laying plan")}` }));
      void nums;
    }
    $10("#btn-layplan").onclick = () => {
      renderUI2();
      $10("#dlg-layplan").showModal();
    };
    $10("#dlg-layplan").addEventListener("close", () => drawGrid(false));
    for (const id of ["#lp-w", "#lp-h"]) {
      $10(id).onchange = () => {
        const w = parseFloat($10("#lp-w").value), h = parseFloat($10("#lp-h").value);
        if (w > 0) opts3.w = w;
        if (h > 0) opts3.h = h;
        save4();
        renderUI2();
      };
    }
    $10("#lp-numbers").onchange = (e) => {
      opts3.numbers = e.target.checked;
      save4();
    };
    $10("#lp-grid").onchange = (e) => {
      opts3.grid = e.target.checked;
      save4();
      renderUI2();
    };
    $10("#lp-paper").onchange = (e) => {
      opts3.paper = e.target.value;
      save4();
      renderUI2();
    };
    $10("#lp-go").onclick = () => {
      drawGrid(false);
      $10("#dlg-layplan").close();
      printPlan();
    };
    return { panels, panelAt, countByPanel };
  })();

  // src/features/mix.ts
  var $7 = (s) => document.querySelector(s);
  var { state: state7 } = MZ;
  var mix = { on: false, colors: [], avoid: true };
  try {
    Object.assign(mix, JSON.parse(localStorage.getItem("mz-mix") || "{}"));
  } catch {
  }
  var save3 = () => {
    try {
      localStorage.setItem("mz-mix", JSON.stringify(mix));
    } catch {
    }
  };
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
    $7("#mix-on").checked = mix.on;
    $7("#mix-avoid").checked = mix.avoid;
    const box = $7("#mix-colors");
    box.innerHTML = "";
    for (const c of mix.colors) {
      const chip = document.createElement("span");
      chip.className = "mix-chip";
      chip.style.background = c;
      chip.title = t("{c} – click to remove from the mix", { c });
      chip.onclick = () => toggle(c);
      box.append(chip);
    }
    $7("#mix-hint").textContent = mix.colors.length < 2 ? t("Shift+click two or more swatches to put them in the mix.") : t("Each tile gets one of these {n} colors at random. Shift+click swatches to change the mix.", { n: mix.colors.length });
    $7("#btn-mix-sel").hidden = mix.colors.length < 2;
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
    let n2 = 0;
    for (const el of state7.selection) {
      if (!MZ.fillOf(el)) continue;
      const g = MZ.geomOf(el), p = MZ.gridSample(g.bbox, (q) => MZ.insideEl(el, q), 1)[0], f = p && ix.locate(p);
      MZ.paintFill(el, pick(f ? ix.region(f) : null));
      n2++;
    }
    if (n2) MZ.commit(true);
    MZ.toast(n2 ? t("Mixed the colors of {n} {n|area|areas}.", { n: n2 }) : t("Select painted areas first."));
  }
  MZ.on("swatch-shift", (c) => {
    if (c) toggle(c);
  });
  MZ.on("palette", markSwatches);
  $7("#mix-on").onchange = (e) => {
    mix.on = e.target.checked;
    if (mix.on && mix.colors.length < 2) MZ.toast(t("Shift+click two or more swatches to put them in the mix."));
    render();
  };
  $7("#mix-avoid").onchange = (e) => {
    mix.avoid = e.target.checked;
    render();
  };
  $7("#btn-mix-sel").onclick = mixSelection;
  render();

  // src/features/pages.ts
  var Pages = (() => {
    const $10 = (s) => document.querySelector(s);
    const { state: state11 } = MZ;
    const attr = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
    const XML = '<?xml version="1.0" encoding="UTF-8"?>\n';
    let pages = [{ name: t("Page {n}", { n: 1 }), svg: null, history: null, view: null }], cur = 0, switching = false;
    function tag(svg2, name, index) {
      return svg2.replace(/^<\?xml[^>]*>\s*/, "").replace(/<svg\b([^>]*)>/, (m, attrs) => `<svg${attrs.replace(/\s+data-page-(name|index)="[^"]*"/g, "")} data-page-name="${attr(name)}" data-page-index="${index}">`);
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
    function show(i) {
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
      show(i);
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
      show(cur + 1);
      if (!duplicate2) MZ.fitView();
    }
    function rename(i) {
      const n2 = prompt(t("Page name:"), pages[i].name);
      if (!n2 || !n2.trim()) return;
      pages[i].name = n2.trim();
      render3();
      MZ.docChanged();
    }
    function remove(i) {
      if (pages.length < 2) {
        MZ.toast(t("A project needs at least one page."));
        return;
      }
      if (!confirm(t("Delete the page “{name}”? (A copy of the project is kept in History.)", { name: pages[i].name }))) return;
      MZ.saveVersion(t("Before deleting the page {name}", { name: pages[i].name }));
      if (i === cur) {
        pages.splice(i, 1);
        show(Math.min(i, pages.length - 1));
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
      const m = $10("#page-menu");
      if (m) m.remove();
    }
    function openMenu(i, anchor) {
      closeMenu();
      const m = document.createElement("div");
      m.id = "page-menu";
      for (const [label, fn, ok] of [
        [t("Rename…"), () => rename(i), true],
        [t("Duplicate"), () => add(true), true],
        [t("Move left"), () => move(i, -1), i > 0],
        [t("Move right"), () => move(i, 1), i < pages.length - 1],
        [t("Delete…"), () => remove(i), pages.length > 1]
      ]) {
        const b = document.createElement("button");
        b.textContent = label;
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
      const box = $10("#page-tabs");
      box.innerHTML = "";
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
        box.append(tab);
      });
    }
    $10("#page-add").onclick = () => add(false);
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
    const n2 = (v) => String(Math.round(v * 1e3) / 1e3);
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
      root.setAttribute("viewBox", [x0, y0, x1 - x0, y1 - y0].map(n2).join(" "));
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
        el.setAttribute("x1", n2(a.x));
        el.setAttribute("y1", n2(a.y));
        el.setAttribute("x2", n2(b.x));
        el.setAttribute("y2", n2(b.y));
      } else if (!has && (tag === "polygon" || tag === "polyline")) {
        const nums = (el.getAttribute("points") || "").match(/[-+]?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?/gi) || [];
        const pts = [];
        for (let i = 0; i + 1 < nums.length; i += 2) {
          const p = mapPt(m, +nums[i], +nums[i + 1]);
          pts.push(n2(p.x) + "," + n2(p.y));
        }
        el.setAttribute("points", pts.join(" "));
        const ng = (el.getAttribute("data-ngon") || "").split(/\s+/).map(Number);
        if (ng.length === 5 && ng.every(Number.isFinite)) {
          const c = mapPt(m, ng[1], ng[2]);
          el.setAttribute("data-ngon", [ng[0], n2(c.x), n2(c.y), n2(ng[3] * scale), n2(ng[4] + angle)].join(" "));
        }
      } else if (!has && tag === "path" && /^[\s\dMLZmlz.,eE+-]*$/.test(el.getAttribute("d") || "") && !/[mlz]/.test(el.getAttribute("d"))) {
        el.setAttribute("d", el.getAttribute("d").replace(
          /([-+]?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?)[\s,]+([-+]?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?)/gi,
          (s, x, y) => {
            const p = mapPt(m, +x, +y);
            return n2(p.x) + " " + n2(p.y);
          }
        ));
        if (el.hasAttribute("data-area")) el.setAttribute("data-area", n2(+el.getAttribute("data-area") * scale * scale));
      } else {
        el.setAttribute("transform", `${m.toString()} ${el.getAttribute("transform") || ""}`.trim());
        return;
      }
      if (scale !== 1 && el.hasAttribute("stroke-width")) el.setAttribute("stroke-width", n2(+el.getAttribute("stroke-width") * scale));
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
  var $8 = (s) => document.querySelector(s);
  var { state: state8 } = MZ;
  function imageSize(w, h) {
    return Math.round(clamp(Math.max(w, h) * state8.view.s * (window.devicePixelRatio || 1), 1024, 4096));
  }
  async function copyDrawing() {
    if (!canCopyImages()) {
      MZ.toast(t("This browser can’t copy images – use PNG to save one instead."));
      return;
    }
    const svg2 = MZ.buildSVGString({ photo: false, grout: state8.grout.on, pageOnly: true });
    const ok = await copyImage(svgToPng(svg2, imageSize(state8.doc.w, state8.doc.h)));
    MZ.toast(ok ? t("Copied the drawing as an image – paste it into the raster app or any other program.") : t("Could not copy the image (the browser refused)."));
  }
  $8("#btn-copy-img").onclick = () => {
    if (state8.selection.size) copySelection(false, false);
    else copyDrawing();
  };
  document.addEventListener("keydown", (e) => {
    if (!(e.ctrlKey || e.metaKey) || e.shiftKey || e.altKey || e.key.toLowerCase() !== "c") return;
    if (MZ.typingIn(e.target) || state8.selection.size || document.querySelector("dialog[open]")) return;
    if (window.getSelection && String(window.getSelection())) return;
    e.preventDefault();
    copyDrawing();
  });

  // src/features/motifs.ts
  var $9 = (s) => document.querySelector(s);
  var { state: state9 } = MZ;
  var lastPointer = null;
  var internalClip = null;
  MZ.svg.addEventListener("pointermove", (e) => {
    lastPointer = MZ.toDoc(e.clientX, e.clientY);
  });
  MZ.svg.addEventListener("pointerleave", () => {
    lastPointer = null;
  });
  function target(snip) {
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
    const n2 = state9.selection.size;
    if (cut) {
      for (const el of state9.selection) el.remove();
      MZ.setSelection([]);
      MZ.commitGeometry();
    }
    MZ.toast(cut ? t("Cut {n} {n|shape|shapes}. Paste with Ctrl+V – also in another page or drawing.", { n: n2 }) : t("Copied {n} {n|shape|shapes}. Paste with Ctrl+V – also in another page or drawing.", { n: n2 }));
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
    const els = Snippets.place(snip, target(snip));
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
    const list = $9("#motif-list");
    list.innerHTML = "";
    if (!motifs.length) {
      list.innerHTML = `<p class="note">${t("No motifs yet. Select some shapes and save them.")}</p>`;
      return;
    }
    for (const m of motifs) {
      const item = document.createElement("div");
      item.className = "motif" + (placing && placing.id === m.id ? " active" : "");
      item.title = t("{name} – click, then click on the drawing to place it", { name: m.name });
      const url = URL.createObjectURL(new Blob([m.svg], { type: "image/svg+xml" }));
      thumbs.push(url);
      item.innerHTML = `<img src="${url}" alt=""><span></span><button class="del" title="${t("Delete this motif")}">×</button>`;
      item.querySelector("span").textContent = m.name;
      item.onclick = () => startPlacing(m);
      item.querySelector(".del").onclick = async (e) => {
        e.stopPropagation();
        if (!confirm(t("Delete the motif “{name}”?", { name: m.name }))) return;
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
    const svg2 = Snippets.fromElements(state9.selection);
    const name = prompt(t("Name of the motif:"), t("Motif {n}", { n: motifs.length + 1 }));
    if (!name || !name.trim()) return;
    motifs.push({ id: Date.now().toString(36), name: name.trim(), svg: svg2, created: Date.now() });
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
    const g = $9("#mz-preview");
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
  $9("#btn-motif-save").onclick = saveSelection;
  $9("#btn-motif-export").onclick = () => {
    if (!motifs.length) {
      MZ.toast(t("There are no motifs to export yet."));
      return;
    }
    MZ.download(new Blob([JSON.stringify({ mosaicMotifs: 1, motifs }, null, 1)], { type: "application/json" }), "motifs.json");
  };
  $9("#btn-motif-import").onclick = () => $9("#motif-file").click();
  $9("#motif-file").onchange = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const text = await f.text();
    e.target.value = "";
    try {
      const data = JSON.parse(text), list = Array.isArray(data) ? data : data.motifs;
      let n2 = 0;
      for (const m of list || []) {
        if (!m || typeof m.svg !== "string" || !Snippets.parse(m.svg)) continue;
        motifs.push({ id: Date.now().toString(36) + n2, name: String(m.name || "Motif"), svg: m.svg, created: Date.now() });
        n2++;
      }
      await persist();
      render2();
      MZ.toast(n2 ? t("Imported {n} {n|motif|motifs}.", { n: n2 }) : t("No motifs found in that file."));
    } catch (err) {
      console.warn(err);
      MZ.toast(t("That file is not a motif library."));
    }
  };
  load();

  // src/lib/raster.ts
  function rgbOf(c) {
    const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(c);
    return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : toRgb(c);
  }
  function rgba(c, alpha = 255) {
    const rgb = c ? rgbOf(c) : null;
    return rgb ? [rgb[0], rgb[1], rgb[2], alpha] : [0, 0, 0, 0];
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
  function classify(img, colors) {
    const near = nearestCache(colors), index = new Map(colors.map((c, i) => [c, i]));
    const n2 = img.width * img.height, grid = new Int16Array(n2), counts = colors.map(() => 0), d = img.data;
    for (let p = 0, i = 0; p < n2; p++, i += 4) {
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
    for (let i = 0; i < grid.length; i++) out[i] = grid[i] < 0 ? s.baseLayers : topLayer(grid[i], s);
    return out;
  }
  function closedMesh(grid, w, h, cell, s) {
    const Hc = cellHeights(grid, s);
    const height = (x, y) => x < 0 || y < 0 || x >= w || y >= h ? 0 : Hc[y * w + x];
    const level = (x, y) => x < 0 || y < 0 || x >= w || y >= h ? 0 : Math.max(0, grid[y * w + x]);
    const faces = [];
    const Y = (y) => h - y;
    const tops = new Int16Array(w * h);
    for (let i = 0; i < w * h; i++) tops[i] = Hc[i] > 0 ? Hc[i] : -1;
    for (const r of greedyRects(tops, w, h)) {
      const lv = level(r.x, r.y);
      faces.push({ o: [r.x, Y(r.y + r.h), r.level], u: [r.w, 0, 0], v: [0, r.h, 0], level: lv });
    }
    const solid = new Int16Array(w * h);
    for (let i = 0; i < w * h; i++) solid[i] = Hc[i] > 0 ? 0 : -1;
    for (const r of greedyRects(solid, w, h)) faces.push({ o: [r.x, Y(r.y + r.h), 0], u: [0, r.h, 0], v: [r.w, 0, 0], level: 0 });
    for (let y = 0; y <= h; y++) {
      for (let x = 0; x < w; ) {
        const n2 = height(x, y - 1), so = height(x, y);
        if (n2 === so) {
          x++;
          continue;
        }
        let x1 = x + 1;
        while (x1 < w && height(x1, y - 1) === n2 && height(x1, y) === so) x1++;
        const lo = Math.min(n2, so), dz = Math.abs(n2 - so), Y0 = Y(y);
        if (n2 > so) faces.push({ o: [x, Y0, lo], u: [x1 - x, 0, 0], v: [0, 0, dz], level: level(x, y - 1) });
        else faces.push({ o: [x, Y0, lo], u: [0, 0, dz], v: [x1 - x, 0, 0], level: level(x, y) });
        x = x1;
      }
    }
    for (let x = 0; x <= w; x++) {
      for (let y = h - 1; y >= 0; ) {
        const we = height(x - 1, y), ea = height(x, y);
        if (we === ea) {
          y--;
          continue;
        }
        let y1 = y - 1;
        while (y1 >= 0 && height(x - 1, y1) === we && height(x, y1) === ea) y1--;
        const lo = Math.min(we, ea), dz = Math.abs(we - ea), Y0 = Y(y + 1), dy = y - y1;
        if (ea > we) faces.push({ o: [x, Y0, lo], u: [0, 0, dz], v: [0, dy, 0], level: level(x, y) });
        else faces.push({ o: [x, Y0, lo], u: [0, dy, 0], v: [0, 0, dz], level: level(x - 1, y) });
        y = y1;
      }
    }
    const along2 = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
    const corner2 = (f, a, b) => f.o.map((c, k) => c + a * f.u[k] + b * f.v[k]);
    const lineKey = (p, axis) => axis === 0 ? p[1] * 1e5 + p[2] : axis === 1 ? p[0] * 1e5 + p[2] : p[0] * 1e5 + p[1];
    for (const f of faces) for (const [a, b] of [[0, 0], [1, 0], [1, 1], [0, 1]]) {
      const p = corner2(f, a, b);
      for (let axis = 0; axis < 3; axis++) {
        const key = lineKey(p, axis);
        let list = along2[axis].get(key);
        if (!list) along2[axis].set(key, list = []);
        list.push(p[axis]);
      }
    }
    for (const m of along2) for (const [k, list] of m) m.set(k, [...new Set(list)].sort((a, b) => a - b));
    const vertices = [], triangles = [], levels = [], index = /* @__PURE__ */ new Map();
    const vertex = (p) => {
      const key = (p[0] * 2e5 + p[1] * 2) * 2e5 + p[2] * 2;
      let i = index.get(key);
      if (i == null) {
        i = vertices.length / 3;
        index.set(key, i);
        vertices.push(p[0] * cell, p[1] * cell, p[2] * s.layerHeight);
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
  function stl(mesh, name = "Mosaic Paint") {
    const V = mesh.vertices, T = mesh.triangles, n2 = T.length / 3, buf = new ArrayBuffer(84 + n2 * 50), dv = new DataView(buf);
    const header = `${name} – multi-color by layer`.slice(0, 80);
    for (let i = 0; i < header.length; i++) dv.setUint8(i, header.charCodeAt(i) & 127);
    dv.setUint32(80, n2, true);
    let o = 84;
    for (let t2 = 0; t2 < n2; t2++) {
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
  var xmlAttr = (v) => v.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  var num2 = (v) => String(+v.toFixed(4));
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
      { name: "[Content_Types].xml", data: '<?xml version="1.0" encoding="UTF-8"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/><Default Extension="xml" ContentType="application/xml"/></Types>' },
      { name: "_rels/.rels", data: '<?xml version="1.0" encoding="UTF-8"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/></Relationships>' },
      { name: "3D/3dmodel.model", data: modelXml(mesh, plan.map((p) => p.color), name) },
      { name: "Metadata/Prusa_Slicer_custom_gcode_per_print_z.xml", data: colorChangeXml(plan) }
    ];
  }

  // src/lib/zip.ts
  var crcTable = null;
  function crc32(data) {
    if (!crcTable) {
      crcTable = new Uint32Array(256);
      for (let n2 = 0; n2 < 256; n2++) {
        let c2 = n2;
        for (let k = 0; k < 8; k++) c2 = c2 & 1 ? 3988292384 ^ c2 >>> 1 : c2 >>> 1;
        crcTable[n2] = c2 >>> 0;
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

  // src/shared/export3d.ts
  var MAX_CELLS = 4e6;
  var MANY_COLORS = 16;
  var opts2 = { width: 150, detail: 0.4, layerHeight: 0.2, layersPerColor: 3, baseLayers: 3 };
  try {
    Object.assign(opts2, JSON.parse(lsGet("mz-3d") || "{}"));
  } catch {
  }
  var saveOpts = () => lsSet("mz-3d", JSON.stringify(opts2));
  var f2 = (v) => String(+v.toFixed(2));
  var DIALOG = `
<form method="dialog" class="dlg-head"><h2>${t("3D print")}</h2><button title="${t("Close")}">✕</button></form>
<p class="note">${t("A model where every color stands at its own height. Print it with one nozzle and change the filament at the layers listed below – each tile’s top then shows its color. The 3MF file already contains the filament changes for PrusaSlicer; for other slicers, the plan lists them.")}</p>
<div class="row">
  <label>${t("Size")} <input id="m3-w" type="number" min="5" max="2000" step="1"> × <input id="m3-h" type="number" min="5" max="2000" step="1"> mm</label>
  <label title="${t("Size of the model’s smallest step – about your nozzle width")}">${t("Detail")} <input id="m3-detail" type="number" min="0.1" max="5" step="0.05"> mm</label>
</div>
<div class="row">
  <label>${t("Layer height")} <input id="m3-lh" type="number" min="0.04" max="1" step="0.04"> mm</label>
  <label title="${t("How many layers each color gets – more layers cover the color below better")}">${t("Layers per color")} <input id="m3-lpc" type="number" min="1" max="50" step="1"></label>
  <label title="${t("A plate under everything, printed in the first color. 0: unpainted parts are left open")}">${t("Base layers")} <input id="m3-base" type="number" min="0" max="50" step="1"></label>
</div>
<p class="note warn" id="m3-note" hidden></p>
<div class="m3-body">
  <canvas id="m3-preview" title="${t("Top view of the model")}"></canvas>
  <div class="m3-side">
    <div class="row small"><span class="note">${t("Print order (bottom first):")}</span>
      <button id="m3-light" title="${t("Lighter colors lower: a darker layer covers a lighter one well. Lines (grout) stay at the bottom")}">${t("Light → dark")}</button>
      <button id="m3-dark">${t("Dark → light")}</button>
    </div>
    <div id="m3-order"></div>
  </div>
</div>
<p class="note" id="m3-summary"></p>
<div class="row dlg-foot">
  <button id="m3-plan" title="${t("Which filament to load at which layer, as a text file")}">${t("Plan")}</button>
  <button id="m3-stl" title="${t("Just the shape – add the filament changes from the plan in your slicer")}">STL</button>
  <button id="m3-go" class="primary" title="${t("The model, with the filament changes for PrusaSlicer")}">${t("Download 3MF")}</button>
</div>`;
  function initExport3D(host, button) {
    const dlg = document.createElement("dialog");
    dlg.id = "dlg-3d";
    dlg.innerHTML = DIALOG;
    document.body.append(dlg);
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg) dlg.close();
    });
    let colors = [], counts = [], grid = null, gw = 0, gh = 0, cell = opts2.detail;
    let order = [], note = "", lines2 = /* @__PURE__ */ new Set();
    const settings = () => ({ layerHeight: opts2.layerHeight, layersPerColor: opts2.layersPerColor, baseLayers: opts2.baseLayers });
    const used = () => order.filter((i) => counts[i] > 0);
    const size = () => {
      const a = host.aspect();
      return { w: opts2.width, h: opts2.width / a };
    };
    const byBrightness = (lightFirst) => (a, b) => +lines2.has(colors[b]) - +lines2.has(colors[a]) || (luminance(colors[b]) - luminance(colors[a])) * (lightFirst ? 1 : -1);
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
      const c = await host.render(gw, gh);
      const img = c.getContext("2d").getImageData(0, 0, gw, gh);
      const cs = host.colors();
      const prev = order.map((i) => colors[i]);
      colors = cs.colors;
      note = cs.note || "";
      lines2 = new Set(cs.lines || []);
      ({ grid, counts } = classify(img, colors));
      const known = prev.filter((c2) => colors.includes(c2)).map((c2) => colors.indexOf(c2));
      const fresh = colors.map((_, i) => i).filter((i) => !known.includes(i)).sort(byBrightness(true));
      order = [...known, ...fresh];
      render3();
    }
    const rows = /* @__PURE__ */ new Map();
    function move(c, d) {
      const list = used(), k = list.findIndex((ci) => colors[ci] === c), other = list[k + d];
      if (k < 0 || other == null) return;
      const a = order.indexOf(list[k]), b = order.indexOf(other);
      [order[a], order[b]] = [order[b], order[a]];
      render3();
    }
    function render3() {
      const s = settings(), list = used(), { w, h } = size();
      $("#m3-w").value = f2(w);
      $("#m3-h").value = f2(h);
      const warn = [
        note,
        list.length > MANY_COLORS ? t("{n} colors make a tall print with many filament changes – reduce the colors first (Raster: “Reduce to palette”).", { n: list.length }) : "",
        cell > opts2.detail + 1e-9 ? t("Detail lowered to {d} mm for this size.", { d: num(+f2(cell)) }) : ""
      ].filter(Boolean).join(" ");
      $("#m3-note").hidden = !warn;
      $("#m3-note").textContent = warn;
      const plan2 = colorPlan(list.map((i) => colors[i]), s), total = gw * gh || 1, box = $("#m3-order");
      const keep = new Set(list.map((ci) => colors[ci]));
      for (const [c, el] of rows) if (!keep.has(c)) {
        el.remove();
        rows.delete(c);
      }
      list.forEach((ci, k) => {
        const c = colors[ci], p = plan2[k];
        let row = rows.get(c);
        if (!row) {
          row = document.createElement("div");
          row.className = "m3-row";
          row.innerHTML = `<span class="mini" style="background:${c}"></span><code>${c}</code>${lines2.has(c) ? `<span class="tag">${t("lines")}</span>` : ""}<span class="note"></span><button title="${t("Print earlier (lower)")}">↑</button><button title="${t("Print later (higher)")}">↓</button>`;
          const [up2, down2] = row.querySelectorAll("button");
          up2.onclick = () => move(c, -1);
          down2.onclick = () => move(c, 1);
          rows.set(c, row);
        }
        const share = num(Math.max(0.1, +(counts[ci] / total * 100).toFixed(1)));
        row.querySelector(".note").textContent = p.z == null ? t("{share} % · layers {from}–{to}", { share, from: p.fromLayer, to: p.toLayer }) : t("{share} % · layers {from}–{to} · change at Z {z}", { share, from: p.fromLayer, to: p.toLayer, z: num(p.z, 2) });
        const [up, down] = row.querySelectorAll("button");
        up.disabled = k === 0;
        down.disabled = k === list.length - 1;
        if (box.children[k] !== row) box.insertBefore(row, box.children[k] || null);
      });
      const unpainted = grid ? grid.filter((v) => v < 0).length : 0;
      $("#m3-summary").textContent = list.length ? t("{n} {n|color|colors} · height {h} mm ({layers} {layers|layer|layers}) · {c} filament {c|change|changes}", { n: list.length, h: num(modelHeight(list.length, s)), layers: topLayer(list.length - 1, s), c: list.length - 1 }) + (unpainted ? " · " + (opts2.baseLayers ? t("unpainted parts stay at the base ({h} mm)", { h: num(+f2(opts2.baseLayers * opts2.layerHeight)) }) : t("unpainted parts are left open")) : "") : t("Nothing is painted yet.");
      $("#m3-go").disabled = $("#m3-stl").disabled = $("#m3-plan").disabled = !list.length;
      drawPreview();
    }
    function drawPreview() {
      const cv = $("#m3-preview");
      if (!grid) return;
      const k = Math.min(1, 300 / Math.max(gw, gh));
      cv.width = Math.max(1, Math.round(gw * k));
      cv.height = Math.max(1, Math.round(gh * k));
      const small = document.createElement("canvas");
      small.width = gw;
      small.height = gh;
      const sx = small.getContext("2d"), im = sx.createImageData(gw, gh), rgb = colors.map((c) => rgba(c));
      for (let p = 0; p < grid.length; p++) if (grid[p] >= 0) im.data.set(rgb[grid[p]], p * 4);
      sx.putImageData(im, 0, 0);
      const x = cv.getContext("2d");
      x.imageSmoothingEnabled = k < 1;
      x.drawImage(small, 0, 0, cv.width, cv.height);
    }
    function levels() {
      const rank = new Int16Array(colors.length).fill(-1);
      used().forEach((ci, k) => {
        rank[ci] = k;
      });
      return grid.map((v) => v < 0 ? -1 : rank[v]);
    }
    const base = () => host.fileName().replace(/\.[a-z0-9]+$/i, "");
    const plan = () => colorPlan(used().map((i) => colors[i]), settings());
    const mesh = () => closedMesh(levels(), gw, gh, cell, settings());
    function planText() {
      const s = settings(), list = used(), plan2 = colorPlan(list.map((i) => colors[i]), s), { w, h } = size();
      const v = { name: base(), w: f2(w), h: f2(h), lh: s.layerHeight, lpc: s.layersPerColor, base: s.baseLayers, total: modelHeight(list.length, s), layers: topLayer(list.length - 1, s) };
      const first = plan2[0];
      const lines3 = [
        t("Mosaic Paint – 3D print plan for {name}.3mf / {name}.stl", v),
        t("Size {w} × {h} mm · layer height {lh} mm · {lpc} layers per color · base {base} layers", v),
        t("Total height {total} mm ({layers} layers). Set the slicer’s first layer height to {lh} mm too.", v),
        "",
        s.baseLayers ? t("Start with {color} – layers {from}–{to} (base plate included)", { color: first.color, from: first.fromLayer, to: first.toLayer }) : t("Start with {color} – layers {from}–{to}", { color: first.color, from: first.fromLayer, to: first.toLayer }),
        ...plan2.slice(1).map((p) => t("Layer {layer} (Z {z} mm): change to {color} – layers {from}–{to}", { layer: p.changeAtLayer, z: p.z.toFixed(2), color: p.color, from: p.fromLayer, to: p.toLayer })),
        "",
        t("PrusaSlicer: the 3MF file already contains these changes – open it and check the layer slider."),
        t("Other slicers (they read only the shape from the 3MF or STL) – add the changes by hand:"),
        t("- PrusaSlicer, Bambu Studio, OrcaSlicer: in the preview, move the layer slider to each Z above and click “+” (Add color change, M600)."),
        t("- Cura: Extensions › Post Processing › Modify G-Code › “Filament Change” at each layer number above."),
        t("- Multi-material printers (AMS, MMU): the same changes work; or assign the filaments to the color changes in the slicer.")
      ];
      return lines3.join("\n") + "\n";
    }
    let busy;
    const reanalyse = () => {
      clearTimeout(busy);
      busy = setTimeout(() => analyse().catch(() => toast(t("Could not read the picture."))), 50);
    };
    const bindNum = (id, key, min, max, whole, again) => {
      const i = $(id);
      i.value = opts2[key];
      i.onchange = () => {
        let v = +i.value;
        if (Number.isFinite(v) && v > 0 || key === "baseLayers" && v === 0) {
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
    bindNum("#m3-lh", "layerHeight", 0.04, 1, false, false);
    bindNum("#m3-lpc", "layersPerColor", 1, 50, true, false);
    bindNum("#m3-base", "baseLayers", 0, 50, true, false);
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
        opts2.width = v * host.aspect();
        saveOpts();
      }
      reanalyse();
    };
    $("#m3-light").onclick = () => sortBy(true);
    $("#m3-dark").onclick = () => sortBy(false);
    const triangles = (m) => m.triangles.length / 3;
    $("#m3-go").onclick = async () => {
      const m = mesh(), p = plan();
      $("#m3-go").disabled = true;
      try {
        const data = await zip(threeMfFiles(m, p, base()));
        download(new Blob([data], { type: "model/3mf" }), base() + ".3mf");
        toast(t("Saved {name}.3mf ({n} triangles; PrusaSlicer reads its {c} filament {c|change|changes}, other slicers need the plan).", { name: base(), n: triangles(m), c: p.length - 1 }));
      } finally {
        $("#m3-go").disabled = false;
      }
    };
    $("#m3-stl").onclick = () => {
      const m = mesh();
      download(new Blob([stl(m, base())], { type: "model/stl" }), base() + ".stl");
      toast(t("Saved {name}.stl ({n} triangles). Add the filament changes from the plan in your slicer.", { name: base(), n: triangles(m) }));
    };
    $("#m3-plan").onclick = () => download(new Blob([planText()], { type: "text/plain" }), base() + "-3d-plan.txt");
    button.onclick = async () => {
      const real = host.realSize();
      if (real) opts2.width = +real.w.toFixed(2);
      $("#m3-summary").textContent = t("Reading the picture…");
      dlg.showModal();
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
      const svg2 = MZ.buildSVGString({ photo: false, grout: state10.grout.on, pageOnly: true }).replace(/<rect id="mosaic-bg"[^>]*\/>/, "");
      const pic = await svgToCanvas(svg2, Math.max(w, h));
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
    const LONG = 64 * 1024, MAX = 2 * 1024 * 1024;
    const $10 = (s) => document.querySelector(s);
    let link = "";
    async function makeLink() {
      const svg2 = MZ.buildSVGString({ photo: $10("#share-photo").checked }).replace(/>\n</g, "><");
      const packed = await pack(svg2);
      link = `${location.origin}${location.pathname}#view=${packed}`;
      const kb = Math.round(link.length / 1024);
      $10("#share-link").value = link;
      $10("#share-size").textContent = link.length > MAX ? t("The link would be {kb} KB – too long. Share the file instead, or leave out the photo.", { kb }) : link.length > LONG ? t("The link is {kb} KB – long links can get cut off in some messengers; sharing the file is safer. Anyone with it can view the mosaic and make their own copy.", { kb }) : t("The link is {kb} KB. Anyone with it can view the mosaic and make their own copy.", { kb });
      $10("#share-copy").disabled = link.length > MAX;
    }
    async function shareFile() {
      const file = new File([MZ.buildSVGString()], MZ.fileName, { type: "image/svg+xml" });
      try {
        await navigator.share({ files: [file], title: MZ.fileName });
      } catch (e) {
        if (e.name !== "AbortError") MZ.toast(t("Sharing failed."));
      }
    }
    $10("#btn-share").onclick = async () => {
      $10("#dlg-share").showModal();
      await makeLink();
    };
    $10("#share-photo").onchange = makeLink;
    $10("#share-copy").onclick = async () => {
      try {
        await navigator.clipboard.writeText(link);
        MZ.toast(t("Link copied."));
      } catch {
        $10("#share-link").select();
        document.execCommand("copy");
        MZ.toast(t("Link copied."));
      }
    };
    const canShareFiles = !!(navigator.canShare && navigator.canShare({ files: [new File(["x"], "x.svg", { type: "image/svg+xml" })] }));
    $10("#share-file").hidden = !canShareFiles;
    $10("#share-file").onclick = shareFile;
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
      let svg2;
      try {
        svg2 = await unpack(packed);
      } catch {
        MZ.toast(t("This share link is damaged or incomplete."));
        return;
      }
      MZ.pauseAutosave(true);
      if (MZ.hasContent()) await MZ.saveVersion(t("Before opening a shared mosaic"));
      if (!MZ.loadSVGText(svg2, { restore: true, name: "shared.svg" })) {
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
    $10("#viewer-copy").onclick = makeCopy;
    $10("#viewer-close").onclick = closeViewer;
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

  // src/main.ts
  Object.assign(window, { MZ, Geo: geometry_exports, Colors: colors_exports, Store, PhotoTools, LayPlan, Vision, Pages, Snippets, Share });
})();
//# sourceMappingURL=mosaic.js.map
