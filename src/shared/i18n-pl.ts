/* Polish texts, keyed by the English source text (see i18n.ts). */
export const PL: Record<string, string> = {
  'Picked {c}.':
    'Wybrano kolor {c}.',
  'Picked {c} (not in the palette – add it with “From drawing”).':
    'Wybrano kolor {c} (nie ma go w palecie – dodaj go przyciskiem „Z rysunku”).',
  'No painted area under the cursor.':
    'Pod kursorem nie ma pomalowanego obszaru.',
  'My palette':
    'Moja paleta',
  'Could not read this file as SVG.':
    'Tego pliku nie da się odczytać jako SVG.',
  'From file':
    'Z pliku',
  'The file’s colors were added as the palette “{name}”.':
    'Kolory z pliku dodano jako paletę „{name}”.',
  'Discard unsaved changes to the current drawing?\n(A copy is kept in History.)':
    'Odrzucić niezapisane zmiany w bieżącym rysunku?\n(Kopia zostanie w Historii.)',
  'Before opening {name}':
    'Przed otwarciem {name}',
  'Opened {name}':
    'Otwarto {name}',
  'Saved {name}':
    'Zapisano {name}',
  'File name:':
    'Nazwa pliku:',
  'PNG width in pixels:':
    'Szerokość PNG w pikselach:',
  'Invalid width.':
    'Nieprawidłowa szerokość.',
  'PNG export failed.':
    'Eksport do PNG nie powiódł się.',
  'Before starting a new drawing':
    'Przed rozpoczęciem nowego rysunku',
  'Applied the grout color and width to {n} {n|line|lines}.':
    'Kolor i szerokość fug zastosowano do {n} {n|linii|linii|linii}.',
  'Autosave failed – remember to save your file.':
    'Autozapis nie powiódł się – pamiętaj, aby zapisać plik.',
  'Autosave':
    'Autozapis',
  'Before restoring an older version':
    'Przed przywróceniem starszej wersji',
  'Restored the version from {time}':
    'Przywrócono wersję z {time}',
  'Symmetry center set.':
    'Ustawiono środek symetrii.',
  'Snapping on':
    'Przyciąganie włączone',
  'Snapping off':
    'Przyciąganie wyłączone',
  'The clipboard has no color codes.':
    'W schowku nie ma kodów kolorów.',
  '{n} {n|area|areas}':
    '{n} {n|obszar|obszary|obszarów}',
  'fill':
    'wypełnienie',
  'stroke':
    'obrys',
  'No color – the bucket erases with it':
    'Bez koloru – wiadro nim wymazuje',
  'Recolored {n} {n|element|elements}.':
    'Zmieniono kolor: {n} {n|element|elementy|elementów}.',
  'Click on the canvas to place the symmetry center.':
    'Kliknij na płótnie, aby umieścić środek symetrii.',
  'Photo unlocked: drag it with the Select tool (where there are no shapes).':
    'Zdjęcie odblokowane: przeciągnij je narzędziem Zaznaczanie (tam, gdzie nie ma kształtów).',
  'Remove the tracing photo?':
    'Usunąć zdjęcie do odrysowania?',
  'Invalid page size.':
    'Nieprawidłowy rozmiar strony.',
  '1 drawing unit = 1 {unit}. Set the page size to the real size of your mosaic.':
    '1 jednostka rysunku = 1 {unit}. Ustaw rozmiar strony na rzeczywisty rozmiar mozaiki.',
  'Could not read that image.':
    'Nie da się odczytać tego obrazu.',
  'Photo loaded and locked. Unlock it to move it with the Select tool.':
    'Zdjęcie wczytane i zablokowane. Odblokuj je, aby przesunąć je narzędziem Zaznaczanie.',
  'Replace the photo to trace with the pasted image?':
    'Zastąpić zdjęcie do odrysowania wklejonym obrazem?',
  'The pasted image is now the photo to trace – “Make a mosaic from the photo” turns it into tiles.':
    'Wklejony obraz jest teraz zdjęciem do odrysowania – „Utwórz mozaikę ze zdjęcia” zrobi z niego płytki.',
  'Replace photo…':
    'Zastąp zdjęcie…',
  'Load photo…':
    'Wczytaj zdjęcie…',
  'Close shape':
    'Zamknij kształt',
  'Done':
    'Gotowe',
  'Start the cut inside a closed area.':
    'Zacznij cięcie wewnątrz zamkniętego obszaru.',
  'Click inside a closed area (or use “Fill whole page”).':
    'Kliknij wewnątrz zamkniętego obszaru (albo użyj „Wypełnij całą stronę”).',
  'That would be about {n} tiles – make the tile size bigger.':
    'To byłoby około {n} {n|płytki|płytek|płytek} – zwiększ rozmiar płytek.',
  'The tiles are bigger than this area.':
    'Płytki są większe niż ten obszar.',
  'This adds {n} lines, which may make editing slow. Continue?':
    'Przybędzie {n} {n|linia|linie|linii}, co może spowolnić edycję. Kontynuować?',
  'Added the pattern “{type}” ({n} {n|line|lines}).':
    'Dodano wzór „{type}” ({n} {n|linia|linie|linii}).',
  'The rows are wider than this area – use a smaller size.':
    'Rzędy są szersze niż ten obszar – użyj mniejszego rozmiaru.',
  'This area is too narrow for a row of that width.':
    'Ten obszar jest za wąski na rząd takiej szerokości.',
  'Added {rows} {rows|row line|row lines} and {cuts} {cuts|cut|cuts} following the outline.':
    'Dodano {rows} {rows|linię rzędu|linie rzędów|linii rzędów} i {cuts} {cuts|cięcie|cięcia|cięć} wzdłuż obrysu.',
  'Painted areas are locked or hidden (see Layers).':
    'Pomalowane obszary są zablokowane lub ukryte (zobacz Warstwy).',
  'No closed area here. The red circles show line ends that don’t touch anything.':
    'Tu nie ma zamkniętego obszaru. Czerwone kółka pokazują końce linii, które niczego nie dotykają.',
  'No closed area here – make sure the lines meet.':
    'Tu nie ma zamkniętego obszaru – sprawdź, czy linie się stykają.',
  'Click to select (Shift adds) · drag to move – the nearest corner snaps · drag handles to edit; shared corners move together (Alt detaches) · yellow handles resize a polygon':
    'Kliknij, aby zaznaczyć (Shift dodaje) · przeciągnij, aby przesunąć – najbliższy narożnik się przyciąga · przeciągaj uchwyty, aby edytować; wspólne narożniki przesuwają się razem (Alt je rozdziela) · żółte uchwyty zmieniają rozmiar wielokąta',
  'Click–click or drag · ends snap to points and onto other lines · Shift: 15° steps · Alt: no snap · Esc: stop':
    'Klik–klik lub przeciąganie · końce przyciągają się do punktów i na inne linie · Shift: co 15° · Alt: bez przyciągania · Esc: koniec',
  'Click corner by corner · click the first corner, double-click or press Enter to close · Backspace removes the last corner · Esc cancels':
    'Klikaj narożnik po narożniku · zamknij kształt kliknięciem pierwszego narożnika, dwuklikiem lub klawiszem Enter · Backspace usuwa ostatni narożnik · Esc anuluje',
  'Drag from the center (or along an edge in “From edge” mode) · click = last size · Shift: 15° rotation · Ctrl: flip side · keys 3–9: sides':
    'Przeciągnij od środka (lub wzdłuż krawędzi w trybie „Od krawędzi”) · kliknięcie = ostatni rozmiar · Shift: obrót co 15° · Ctrl: odwróć stronę · klawisze 3–9: liczba boków',
  'Drag across a tile to cut it straight through, edge to edge · Shift: 15° steps':
    'Przeciągnij przez płytkę, aby przeciąć ją prosto od krawędzi do krawędzi · Shift: co 15°',
  'Click inside a closed area to fill it with the chosen pattern':
    'Kliknij wewnątrz zamkniętego obszaru, aby wypełnić go wybranym wzorem',
  'Click or drag across tiles to paint them · click again to recolor · ∅ swatch erases · Alt+click: pick a color':
    'Kliknij lub przeciągnij przez płytki, aby je pomalować · kliknij ponownie, aby zmienić kolor · próbka ∅ wymazuje · Alt+klik: pobierz kolor',
  'Drag to pan · mouse wheel zooms':
    'Przeciągnij, aby przesunąć widok · kółko myszy powiększa',
  'The lines layer is locked or hidden (see Layers).':
    'Warstwa linii jest zablokowana lub ukryta (zobacz Warstwy).',
  'About {n} tiles – too many, use a bigger tile size.':
    'Około {n} {n|płytka|płytki|płytek} – za dużo, użyj większych płytek.',
  'About {n} tiles.':
    'Około {n} {n|płytka|płytki|płytek}.',
  'Load a photo first.':
    'Najpierw wczytaj zdjęcie.',
  'That gives {n} tiles – use a bigger tile size.':
    'To daje {n} {n|płytkę|płytki|płytek} – użyj większych płytek.',
  'Before making a mosaic from the photo':
    'Przed utworzeniem mozaiki ze zdjęcia',
  'From photo':
    'Ze zdjęcia',
  'New palette “{name}” with {n} {n|color|colors}.':
    'Nowa paleta „{name}” z {n} {n|kolorem|kolorami|kolorami}.',
  'Made a mosaic of {n} tiles from the photo.':
    'Ze zdjęcia powstała mozaika z {n} {n|płytki|płytek|płytek}.',
  'Working…':
    'Pracuję…',
  'Make mosaic':
    'Utwórz mozaikę',
  'Versions are kept in this browser: every few minutes while you work, and before you open, start or restore another drawing. Restoring keeps your current drawing as a version too.':
    'Wersje są przechowywane w tej przeglądarce: co kilka minut podczas pracy oraz przed otwarciem, rozpoczęciem lub przywróceniem innego rysunku. Przy przywracaniu bieżący rysunek też zostaje zapisany jako wersja.',
  'No versions yet. A version is kept every few minutes while you work, and before you open or start another drawing.':
    'Jeszcze brak wersji. Wersja jest zapisywana co kilka minut podczas pracy oraz przed otwarciem lub rozpoczęciem innego rysunku.',
  '{n} painted {n|area|areas}':
    '{n} {n|pomalowany obszar|pomalowane obszary|pomalowanych obszarów}',
  'Saved by hand':
    'Zapisano ręcznie',
  'This browser can’t copy images – use PNG to save one instead.':
    'Ta przeglądarka nie umie kopiować obrazów – zapisz zamiast tego PNG.',
  'Copied the drawing as an image – paste it into the raster app or any other program.':
    'Skopiowano rysunek jako obraz – wklej go do aplikacji rastrowej lub dowolnego programu.',
  'Could not copy the image (the browser refused).':
    'Nie udało się skopiować obrazu (przeglądarka odmówiła).',
  '{n} {n|panel|panels} ({rows} × {cols}) · each printed at real size on {s} {paper} {s|sheet|sheets}.':
    '{n} {n|panel|panele|paneli} ({rows} × {cols}) · każdy drukowany w rzeczywistym rozmiarze na {s} {s|arkuszu|arkuszach|arkuszach} {paper}.',
  'laying plan: {n} {n|panel|panels} ({rows} rows × {cols} columns) of {w} × {h} {unit}':
    'plan układania: {n} {n|panel|panele|paneli} ({rows} rzędów × {cols} kolumn) o wymiarach {w} × {h} {unit}',
  'Panel {n} – row {row}, column {col}':
    'Panel {n} – rząd {row}, kolumna {col}',
  'Panel {n}':
    'Panel {n}',
  'Panel':
    'Panel',
  'tiles per panel and color':
    'płytki według paneli i kolorów',
  'laying plan':
    'plan układania',
  '{c} – click to remove from the mix':
    '{c} – kliknij, aby usunąć z mieszanki',
  'Shift+click two or more swatches to put them in the mix.':
    'Kliknij z Shiftem dwie lub więcej próbek, aby dodać je do mieszanki.',
  'Each tile gets one of these {n} colors at random. Shift+click swatches to change the mix.':
    'Każda płytka dostaje losowo jeden z tych {n} kolorów. Shift+klik na próbkach zmienia mieszankę.',
  'Put at least two colors in the mix first (Shift+click swatches).':
    'Najpierw dodaj do mieszanki co najmniej dwa kolory (Shift+klik na próbkach).',
  'Mixed the colors of {n} {n|area|areas}.':
    'Wymieszano kolory {n} {n|obszaru|obszarów|obszarów}.',
  'Select painted areas first.':
    'Najpierw zaznacz pomalowane obszary.',
  'Cut {n} {n|shape|shapes}. Paste with Ctrl+V – also in another page or drawing.':
    'Wycięto {n} {n|kształt|kształty|kształtów}. Wklej przez Ctrl+V – także na innej stronie lub w innym rysunku.',
  'Copied {n} {n|shape|shapes}. Paste with Ctrl+V – also in another page or drawing.':
    'Skopiowano {n} {n|kształt|kształty|kształtów}. Wklej przez Ctrl+V – także na innej stronie lub w innym rysunku.',
  'Pasted {n} {n|shape|shapes}.':
    'Wklejono {n} {n|kształt|kształty|kształtów}.',
  'Could not store the motifs.':
    'Nie udało się zapisać motywów.',
  'No motifs yet. Select some shapes and save them.':
    'Jeszcze brak motywów. Zaznacz kilka kształtów i zapisz je.',
  '{name} – click, then click on the drawing to place it':
    '{name} – kliknij, a potem kliknij w rysunku, aby go umieścić',
  'Delete this motif':
    'Usuń ten motyw',
  'Delete the motif “{name}”?':
    'Usunąć motyw „{name}”?',
  'Select the shapes of the motif first (Select tool).':
    'Najpierw zaznacz kształty motywu (narzędzie Zaznaczanie).',
  'Name of the motif:':
    'Nazwa motywu:',
  'Motif {n}':
    'Motyw {n}',
  'Saved the motif “{name}”.':
    'Zapisano motyw „{name}”.',
  'This motif could not be read.':
    'Nie da się odczytać tego motywu.',
  'Placed “{name}”. Click again for another one, R turns it, Esc stops.':
    'Umieszczono „{name}”. Kliknij ponownie, aby dodać kolejny, R obraca, Esc kończy.',
  'Click to place the motif · R: turn it by 15° (Shift+R: 90°) · Esc: stop':
    'Kliknij, aby umieścić motyw · R: obrót o 15° (Shift+R: o 90°) · Esc: koniec',
  'There are no motifs to export yet.':
    'Nie ma jeszcze motywów do eksportu.',
  'Imported {n} {n|motif|motifs}.':
    'Zaimportowano {n} {n|motyw|motywy|motywów}.',
  'No motifs found in that file.':
    'W tym pliku nie znaleziono motywów.',
  'That file is not a motif library.':
    'Ten plik nie jest biblioteką motywów.',
  'Page {n}':
    'Strona {n}',
  '{name} copy':
    '{name} – kopia',
  'Page name:':
    'Nazwa strony:',
  'A project needs at least one page.':
    'Projekt musi mieć co najmniej jedną stronę.',
  'Delete the page “{name}”? (A copy of the project is kept in History.)':
    'Usunąć stronę „{name}”? (Kopia projektu zostanie w Historii.)',
  'Before deleting the page {name}':
    'Przed usunięciem strony {name}',
  'Rename…':
    'Zmień nazwę…',
  'Duplicate':
    'Duplikuj',
  'Move left':
    'Przesuń w lewo',
  'Move right':
    'Przesuń w prawo',
  'Delete…':
    'Usuń…',
  'Double-click to rename':
    'Kliknij dwukrotnie, aby zmienić nazwę',
  'Switch to this page':
    'Przejdź do tej strony',
  'Page options':
    'Opcje strony',
  'Load a photo first (Photo section).':
    'Najpierw wczytaj zdjęcie (sekcja Zdjęcie do odrysowania).',
  'The palette is empty – add colors first.':
    'Paleta jest pusta – najpierw dodaj kolory.',
  'Colored {n} {n|area|areas} with the closest palette colors':
    'Pomalowano {n} {n|obszar|obszary|obszarów} najbliższymi kolorami palety',
  '{n} already painted (left as they were)':
    '{n} już {n|był pomalowany|były pomalowane|było pomalowanych} (bez zmian)',
  '{n} outside the photo':
    '{n} poza zdjęciem',
  'colors':
    'kolory',
  'The browser blocked the print window – allow pop-ups for this page.':
    'Przeglądarka zablokowała okno drukowania – zezwól na wyskakujące okna dla tej strony.',
  'Nothing to import from the raster app.':
    'Z aplikacji rastrowej nie ma czego importować.',
  'Opened {n} tiles from the raster app – your previous drawing is in History.':
    'Otwarto {n} {n|płytkę|płytki|płytek} z aplikacji rastrowej – poprzedni rysunek jest w Historii.',
  '<b>{n}</b> painted {n|area|areas} in <b>{c}</b> {c|color|colors}':
    '<b>{n}</b> {n|pomalowany obszar|pomalowane obszary|pomalowanych obszarów} w <b>{c}</b> {c|kolorze|kolorach|kolorach}',
  '<b>{n}</b> not painted yet':
    '<b>{n}</b> jeszcze niepomalowanych',
  'everything is painted':
    'wszystko jest pomalowane',
  'page {w} × {h} {unit}':
    'strona {w} × {h} {unit}',
  'Color':
    'Kolor',
  'Areas':
    'Obszary',
  'Total area':
    'Łączna powierzchnia',
  'Share':
    'Udostępnij',
  'Pieces of the size set above, plus waste':
    'Sztuki o rozmiarze ustawionym powyżej, plus odpad',
  'Pieces to buy':
    'Sztuk do kupienia',
  'Replace with':
    'Zastąp przez',
  'Erase':
    'Wymaż',
  'Nothing is painted yet. Use the paint bucket, or “Color tiles from photo”.':
    'Nic jeszcze nie jest pomalowane. Użyj wiadra albo „Pokoloruj płytki według zdjęcia”.',
  'Recolored {n} {n|area|areas}.':
    'Zmieniono kolor: {n} {n|obszar|obszary|obszarów}.',
  'Erased {n} {n|area|areas}.':
    'Wymazano: {n} {n|obszar|obszary|obszarów}.',
  'Colors that may look alike':
    'Kolory, które mogą wyglądać podobnie',
  '{a} and {b} {how}':
    '{a} i {b} {how}',
  'The link would be {kb} KB – too long. Share the file instead, or leave out the photo.':
    'Link miałby {kb} KB – za długi. Udostępnij raczej plik albo pomiń zdjęcie.',
  'The link is {kb} KB – long links can get cut off in some messengers; sharing the file is safer. Anyone with it can view the mosaic and make their own copy.':
    'Link ma {kb} KB – długie linki bywają ucinane w niektórych komunikatorach; bezpieczniej jest udostępnić plik. Każdy, kto ma link, może obejrzeć mozaikę i zrobić własną kopię.',
  'The link is {kb} KB. Anyone with it can view the mosaic and make their own copy.':
    'Link ma {kb} KB. Każdy, kto ma link, może obejrzeć mozaikę i zrobić własną kopię.',
  'Sharing failed.':
    'Udostępnianie nie powiodło się.',
  'Link copied.':
    'Skopiowano link.',
  'This share link is damaged or incomplete.':
    'Ten link jest uszkodzony lub niekompletny.',
  'Before opening a shared mosaic':
    'Przed otwarciem udostępnionej mozaiki',
  'This is now your own copy – it is saved in this browser like any drawing.':
    'To jest teraz twoja własna kopia – zapisuje się w tej przeglądarce jak każdy rysunek.',
  'Normal colors':
    'Zwykłe kolory',
  'Black & white':
    'Czarno-białe',
  'Red-blind (protanopia)':
    'Ślepota na czerwień (protanopia)',
  'Green-blind (deuteranopia)':
    'Ślepota na zieleń (deuteranopia)',
  'Blue-blind (tritanopia)':
    'Ślepota na niebieski (tritanopia)',
  'look almost the same':
    'wyglądają prawie tak samo',
  'in black & white':
    'w czerni i bieli',
  'for red-blind viewers':
    'dla osób ślepych na czerwień',
  'for green-blind viewers':
    'dla osób ślepych na zieleń',
  'for blue-blind viewers':
    'dla osób ślepych na niebieski',
  'look alike {who}':
    'wyglądają podobnie {who}',
  '{n} {n|tile blends|tiles blend} into a neighbour of another color.':
    '{n} {n|płytka zlewa się|płytki zlewają się|płytek zlewa się} z sąsiednią płytką innego koloru.',
  '{n} {n|tile blends|tiles blend} into a neighbour of another color (in this view).':
    '{n} {n|płytka zlewa się|płytki zlewają się|płytek zlewa się} z sąsiednią płytką innego koloru (w tym widoku).',
  'No tile blends into its neighbours.':
    'Żadna płytka nie zlewa się z sąsiednimi.',
  'Sheet {sheet} – row {row}, column {col} of {cols} · blue strips are covered by the next sheet':
    'Arkusz {sheet} – rząd {row}, kolumna {col} z {cols} · niebieskie pasy zakrywa następny arkusz',
  'One {paper} sheet ({orientation}), at {pct} % of the real size.':
    'Jeden arkusz {paper} ({orientation}), {pct} % rzeczywistego rozmiaru.',
  'One {paper} sheet ({orientation}) at real size.':
    'Jeden arkusz {paper} ({orientation}) w rzeczywistym rozmiarze.',
  '{n} {paper} {n|sheet|sheets} ({orientation}, {rows} × {cols}, overlapping {overlap} mm) at real size.':
    '{n} {n|arkusz|arkusze|arkuszy} {paper} ({orientation}, {rows} × {cols}, zakładka {overlap} mm) w rzeczywistym rozmiarze.',
  '{n} sheets ({rows} × {cols}), real size {w} × {h} cm':
    '{n} arkuszy ({rows} × {cols}), rzeczywisty rozmiar {w} × {h} cm',
  'The picture has many colors: it is snapped to the current palette (use “Reduce to palette” to see the result first).':
    'Obraz ma dużo kolorów: zostanie dopasowany do bieżącej palety (wynik możesz najpierw zobaczyć przez „Zredukuj do palety”).',
  'The picture has many colors: it is snapped to 8 colors suggested from it.':
    'Obraz ma dużo kolorów: zostanie dopasowany do 8 kolorów zaproponowanych na jego podstawie.',
  'Images':
    'Obrazy',
  'PNG image':
    'Obraz PNG',
  'Discard unsaved changes to the current image?\n(Save it first if you want to keep it.)':
    'Odrzucić niezapisane zmiany w bieżącym obrazie?\n(Najpierw go zapisz, jeśli chcesz go zachować.)',
  'Could not read {name} as an image.':
    'Nie da się odczytać {name} jako obrazu.',
  'Opened {name} ({w} × {h} px).':
    'Otwarto {name} ({w} × {h} px).',
  'Size of the new image in pixels (width × height):':
    'Rozmiar nowego obrazu w pikselach (szerokość × wysokość):',
  'Enter a size like 800 × 600 (at most {max} px a side).':
    'Podaj rozmiar, np. 800 × 600 (najwyżej {max} px na bok).',
  'Before starting a new image':
    'Przed rozpoczęciem nowego obrazu',
  'That version could not be read.':
    'Nie da się odczytać tej wersji.',
  'Export failed.':
    'Eksport nie powiódł się.',
  'Autosave failed – remember to save your image.':
    'Autozapis nie powiódł się – pamiętaj, aby zapisać obraz.',
  'The clipboard has no image or color codes.':
    'W schowku nie ma obrazu ani kodów kolorów.',
  'Versions are kept in this browser: every few minutes while you work, and before you open, start or restore another image. Restoring keeps your current image as a version too.':
    'Wersje są przechowywane w tej przeglądarce: co kilka minut podczas pracy oraz przed otwarciem, rozpoczęciem lub przywróceniem innego obrazu. Przy przywracaniu bieżący obraz też zostaje zapisany jako wersja.',
  'No versions yet. A version is kept every few minutes while you work, and before you open or start another image.':
    'Jeszcze brak wersji. Wersja jest zapisywana co kilka minut podczas pracy oraz przed otwarciem lub rozpoczęciem innego obrazu.',
  'The palette is empty – add colors, or let the mosaic suggest some.':
    'Paleta jest pusta – dodaj kolory albo pozwól mozaice jakieś zaproponować.',
  'There is nothing to make a mosaic from (the area is transparent).':
    'Nie ma z czego zrobić mozaiki (obszar jest przezroczysty).',
  'From picture':
    'Z obrazu',
  'Made {n} {n|tile|tiles} in {c} {c|color|colors}.':
    'Utworzono {n} {n|płytkę|płytki|płytek} w {c} {c|kolorze|kolorach|kolorach}.',
  'The palette is empty.':
    'Paleta jest pusta.',
  'Every pixel now has a palette color: {n} {n|pixel|pixels} in {c} {c|color|colors}.':
    'Każdy piksel ma teraz kolor z palety: {n} {n|piksel|piksele|pikseli} w {c} {c|kolorze|kolorach|kolorach}.',
  'At most about {n} tiles in the selection – bigger ones where the picture is calm.':
    'Najwyżej około {n} {n|płytka|płytki|płytek} w zaznaczeniu – większe tam, gdzie obraz jest spokojny.',
  'At most about {n} tiles – bigger ones where the picture is calm.':
    'Najwyżej około {n} {n|płytka|płytki|płytek} – większe tam, gdzie obraz jest spokojny.',
  'About {n} tiles in the selection.':
    'Około {n} {n|płytka|płytki|płytek} w zaznaczeniu.',
  'Turn on “Fill” or “Outline” for polygons.':
    'Dla wielokątów włącz „Wypełnienie” lub „Obrys”.',
  'Picked “transparent”.':
    'Wybrano „przezroczysty”.',
  'Picked {c} (not in the palette – add it with “From image”).':
    'Wybrano kolor {c} (nie ma go w palecie – dodaj go przyciskiem „Z obrazu”).',
  '{n} {n|pixel|pixels}':
    '{n} {n|piksel|piksele|pikseli}',
  'paint color':
    'kolor malowania',
  'outline color':
    'kolor obrysu',
  'Transparent – paints and fills transparent pixels':
    'Przezroczysty – maluje i wypełnia przezroczystymi pikselami',
  'Recolored {n} {n|pixel|pixels}.':
    'Zmieniono kolor: {n} {n|piksel|piksele|pikseli}.',
  'Nothing to paste – or the browser didn’t allow reading the clipboard (try Ctrl+V).':
    'Nie ma czego wkleić – albo przeglądarka nie pozwoliła odczytać schowka (spróbuj Ctrl+V).',
  'Enter a size from 1 to {max} px.':
    'Podaj rozmiar od 1 do {max} px.',
  'This picture has {n} pieces – too many to number. Make a mosaic or reduce it to the palette first.':
    'Ten obraz ma {n} {n|kawałek|kawałki|kawałków} – za dużo do numerowania. Najpierw zrób z niego mozaikę lub zredukuj go do palety.',
  '{n} {n|piece|pieces}':
    '{n} {n|kawałek|kawałki|kawałków}',
  '{n} {n|piece|pieces} in {c} {c|color|colors} · {w} × {h} px':
    '{n} {n|kawałek|kawałki|kawałków} w {c} {c|kolorze|kolorach|kolorach} · {w} × {h} px',
  'Nothing is painted yet.':
    'Nic jeszcze nie jest pomalowane.',
  '{w} × {h} mm · {k} mm per pixel':
    '{w} × {h} mm · {k} mm na piksel',
  'Pieces':
    'Kawałki',
  'Pixels':
    'Piksele',
  'Area':
    'Powierzchnia',
  'transparent':
    'przezroczysty',
  '({w} × {h} px, not placed yet)':
    '({w} × {h} px, jeszcze nieumieszczony)',
  'Cut the selection – paste it here, into the vector app or any other program.':
    'Wycięto zaznaczenie – wklej je tutaj, do aplikacji wektorowej lub dowolnego programu.',
  'Cut the image – paste it here, into the vector app or any other program.':
    'Wycięto obraz – wklej go tutaj, do aplikacji wektorowej lub dowolnego programu.',
  'Copied the selection – paste it here, into the vector app or any other program.':
    'Skopiowano zaznaczenie – wklej je tutaj, do aplikacji wektorowej lub dowolnego programu.',
  'Copied the image – paste it here, into the vector app or any other program.':
    'Skopiowano obraz – wklej go tutaj, do aplikacji wektorowej lub dowolnego programu.',
  'Cut the selection (this browser keeps it for pasting here only).':
    'Wycięto zaznaczenie (ta przeglądarka przechowa je tylko do wklejenia tutaj).',
  'Cut the image (this browser keeps it for pasting here only).':
    'Wycięto obraz (ta przeglądarka przechowa go tylko do wklejenia tutaj).',
  'Copied the selection (this browser keeps it for pasting here only).':
    'Skopiowano zaznaczenie (ta przeglądarka przechowa je tylko do wklejenia tutaj).',
  'Copied the image (this browser keeps it for pasting here only).':
    'Skopiowano obraz (ta przeglądarka przechowa go tylko do wklejenia tutaj).',
  'Select the part to keep first.':
    'Najpierw zaznacz część, którą chcesz zachować.',
  'Could not read the pasted image.':
    'Nie da się odczytać wklejonego obrazu.',
  'The pasted image ({w} × {h}) is bigger than this one ({W} × {H}). Enlarge the canvas to fit it?':
    'Wklejony obraz ({w} × {h}) jest większy niż ten ({W} × {H}). Powiększyć płótno, aby się zmieścił?',
  'Pasted {w} × {h} px – drag it into place, then press Enter (or click outside it).':
    'Wklejono {w} × {h} px – przeciągnij na miejsce i naciśnij Enter (albo kliknij obok).',
  'The link would be {kb} KB – too long. Share the file instead (or make the image smaller).':
    'Link miałby {kb} KB – za długi. Udostępnij raczej plik (albo zmniejsz obraz).',
  'The link is {kb} KB – long links can get cut off in some messengers; sharing the file is safer. Anyone with it can view the image and make their own copy.':
    'Link ma {kb} KB – długie linki bywają ucinane w niektórych komunikatorach; bezpieczniej jest udostępnić plik. Każdy, kto ma link, może obejrzeć obraz i zrobić własną kopię.',
  'The link is {kb} KB. Anyone with it can view the image and make their own copy.':
    'Link ma {kb} KB. Każdy, kto ma link, może obejrzeć obraz i zrobić własną kopię.',
  'Before opening a shared image':
    'Przed otwarciem udostępnionego obrazu',
  'This is now your own copy – it is saved in this browser like any image.':
    'To jest teraz twoja własna kopia – zapisuje się w tej przeglądarce jak każdy obraz.',
  'Drag to select · drag inside the selection to move it (Alt: a copy) · Enter places it · Ctrl+C / X / V copy, cut, paste':
    'Przeciągnij, aby zaznaczyć · przeciągnij wewnątrz zaznaczenia, aby je przesunąć (Alt: kopię) · Enter je umieszcza · Ctrl+C / X / V kopiuj, wytnij, wklej',
  'Drag to paint · Shift: straight line · [ ] size · Shift+B: tip · Alt+click: pick a color':
    'Przeciągnij, aby malować · Shift: prosta linia · [ ] rozmiar · Shift+B: końcówka · Alt+klik: pobierz kolor',
  'Hard pixels in exact colors · Shift: straight line · [ ] size · Alt+click: pick a color':
    'Ostre piksele w dokładnych kolorach · Shift: prosta linia · [ ] rozmiar · Alt+klik: pobierz kolor',
  'Drag to erase to transparent · Shift: straight line · [ ] size':
    'Przeciągnij, aby wymazać do przezroczystości · Shift: prosta linia · [ ] rozmiar',
  'Drag a line · Shift: 15° steps':
    'Przeciągnij linię · Shift: co 15°',
  'Drag from the center · Shift: 15° rotation · keys 3–9: sides':
    'Przeciągnij od środka · Shift: obrót co 15° · klawisze 3–9: liczba boków',
  'Click to fill the area of similar color · Alt+click: pick a color':
    'Kliknij, aby wypełnić obszar podobnego koloru · Alt+klik: pobierz kolor',
  'Click to take a color from the image':
    'Kliknij, aby pobrać kolor z obrazu',
  'No grout – every piece is a tile':
    'Bez fug – każdy kawałek to płytka',
  '{n} {n|tile|tiles} at {w} × {h} mm – too many: make a mosaic or reduce the picture to the palette first.':
    '{n} {n|płytka|płytki|płytek} na {w} × {h} mm – za dużo: najpierw zrób mozaikę lub zredukuj obraz do palety.',
  '{n} {n|tile|tiles} at {w} × {h} mm.':
    '{n} {n|płytka|płytki|płytek} na {w} × {h} mm.',
  'Could not hand the tiles over (browser storage unavailable).':
    'Nie udało się przekazać płytek (pamięć przeglądarki niedostępna).',
  '3D print':
    'Druk 3D',
  'Close':
    'Zamknij',
  'A model where every color stands at its own height. Print it with one nozzle and change the filament at the layers listed below – each tile’s top then shows its color. The 3MF file already contains the filament changes for PrusaSlicer; for other slicers, the plan lists them.':
    'Model, w którym każdy kolor ma własną wysokość. Wydrukuj go jedną dyszą i zmieniaj filament na warstwach podanych poniżej – wierzch każdej płytki pokaże wtedy jej kolor. Plik 3MF zawiera już zmiany filamentu dla PrusaSlicera; dla innych slicerów znajdziesz je w planie.',
  'Size':
    'Rozmiar',
  'Size of the model’s smallest step – about your nozzle width':
    'Rozmiar najmniejszego kroku modelu – mniej więcej szerokość dyszy',
  'Detail':
    'Szczegółowość',
  'Layer height':
    'Wysokość warstwy',
  'How many layers each color gets – more layers cover the color below better':
    'Ile warstw dostaje każdy kolor – więcej warstw lepiej kryje kolor pod spodem',
  'Layers per color':
    'Warstw na kolor',
  'A plate under everything, printed in the first color. 0: unpainted parts are left open':
    'Płyta pod wszystkim, drukowana pierwszym kolorem. 0: niepomalowane miejsca zostają otwarte',
  'Base layers':
    'Warstwy podstawy',
  'Top view of the model':
    'Widok modelu z góry',
  'Print order (bottom first):':
    'Kolejność druku (od dołu):',
  'Lighter colors lower: a darker layer covers a lighter one well. Lines (grout) stay at the bottom':
    'Jaśniejsze kolory niżej: ciemniejsza warstwa dobrze kryje jaśniejszą. Linie (fugi) zostają na dole',
  'Light → dark':
    'Jasne → ciemne',
  'Dark → light':
    'Ciemne → jasne',
  'Which filament to load at which layer, as a text file':
    'Który filament na której warstwie założyć – jako plik tekstowy',
  'Plan':
    'Plan',
  'Just the shape – add the filament changes from the plan in your slicer':
    'Sam kształt – dodaj zmiany filamentu z planu w slicerze',
  'The model, with the filament changes for PrusaSlicer':
    'Model ze zmianami filamentu dla PrusaSlicera',
  'Download 3MF':
    'Pobierz 3MF',
  '{n} colors make a tall print with many filament changes – reduce the colors first (Raster: “Reduce to palette”).':
    '{n} {n|kolor daje|kolory dają|kolorów daje} wysoki wydruk z wieloma zmianami filamentu – najpierw zmniejsz liczbę kolorów (Raster: „Zredukuj do palety”).',
  'Detail lowered to {d} mm for this size.':
    'Szczegółowość obniżona do {d} mm dla tego rozmiaru.',
  'lines':
    'linie',
  'Print earlier (lower)':
    'Drukuj wcześniej (niżej)',
  'Print later (higher)':
    'Drukuj później (wyżej)',
  '{share} % · layers {from}–{to}':
    '{share} % · warstwy {from}–{to}',
  '{share} % · layers {from}–{to} · change at Z {z}':
    '{share} % · warstwy {from}–{to} · zmiana na Z {z}',
  '{n} {n|color|colors} · height {h} mm ({layers} {layers|layer|layers}) · {c} filament {c|change|changes}':
    '{n} {n|kolor|kolory|kolorów} · wysokość {h} mm ({layers} {layers|warstwa|warstwy|warstw}) · {c} {c|zmiana|zmiany|zmian} filamentu',
  'unpainted parts stay at the base ({h} mm)':
    'niepomalowane miejsca zostają na wysokości podstawy ({h} mm)',
  'unpainted parts are left open':
    'niepomalowane miejsca zostają otwarte',
  'Mosaic Paint – 3D print plan for {name}.3mf / {name}.stl':
    'Mosaic Paint – plan druku 3D dla {name}.3mf / {name}.stl',
  'Size {w} × {h} mm · layer height {lh} mm · {lpc} layers per color · base {base} layers':
    'Rozmiar {w} × {h} mm · wysokość warstwy {lh} mm · {lpc} warstw na kolor · podstawa {base} warstw',
  'Total height {total} mm ({layers} layers). Set the slicer’s first layer height to {lh} mm too.':
    'Łączna wysokość {total} mm ({layers} warstw). Ustaw w slicerze także wysokość pierwszej warstwy na {lh} mm.',
  'Start with {color} – layers {from}–{to} (base plate included)':
    'Zacznij od {color} – warstwy {from}–{to} (z płytą podstawy)',
  'Start with {color} – layers {from}–{to}':
    'Zacznij od {color} – warstwy {from}–{to}',
  'Layer {layer} (Z {z} mm): change to {color} – layers {from}–{to}':
    'Warstwa {layer} (Z {z} mm): zmień na {color} – warstwy {from}–{to}',
  'PrusaSlicer: the 3MF file already contains these changes – open it and check the layer slider.':
    'PrusaSlicer: plik 3MF zawiera już te zmiany – otwórz go i sprawdź suwak warstw.',
  'Other slicers (they read only the shape from the 3MF or STL) – add the changes by hand:':
    'Inne slicery (z 3MF lub STL czytają tylko kształt) – dodaj zmiany ręcznie:',
  '- PrusaSlicer, Bambu Studio, OrcaSlicer: in the preview, move the layer slider to each Z above and click “+” (Add color change, M600).':
    '- PrusaSlicer, Bambu Studio, OrcaSlicer: w podglądzie ustaw suwak warstw na każdą wysokość Z powyżej i kliknij „+” (Dodaj zmianę koloru, M600).',
  '- Cura: Extensions › Post Processing › Modify G-Code › “Filament Change” at each layer number above.':
    '- Cura: Rozszerzenia › Przetwarzanie końcowe › Modyfikuj G-code › „Filament Change” przy każdym numerze warstwy powyżej.',
  '- Multi-material printers (AMS, MMU): the same changes work; or assign the filaments to the color changes in the slicer.':
    '- Drukarki wielomateriałowe (AMS, MMU): te same zmiany działają; albo przypisz filamenty do zmian koloru w slicerze.',
  'Could not read the picture.':
    'Nie da się odczytać obrazu.',
  'Saved {name}.3mf ({n} triangles; PrusaSlicer reads its {c} filament {c|change|changes}, other slicers need the plan).':
    'Zapisano {name}.3mf ({n} trójkątów; PrusaSlicer odczyta {c} {c|zmianę|zmiany|zmian} filamentu, inne slicery potrzebują planu).',
  'Saved {name}.stl ({n} triangles). Add the filament changes from the plan in your slicer.':
    'Zapisano {name}.stl ({n} trójkątów). Dodaj zmiany filamentu z planu w slicerze.',
  'Reading the picture…':
    'Wczytywanie obrazu…',
  'History':
    'Historia',
  'Save a version now':
    'Zapisz wersję teraz',
  'Version history needs browser storage (IndexedDB), which is not available here.':
    'Historia wersji wymaga pamięci przeglądarki (IndexedDB), która jest tu niedostępna.',
  'Restore':
    'Przywróć',
  'Version saved.':
    'Zapisano wersję.',
  'Could not save a version (browser storage unavailable).':
    'Nie udało się zapisać wersji (pamięć przeglądarki niedostępna).',
  'used by {what}':
    'używany przez: {what}',
  'Click: {fill} · Right-click: {stroke} · Double-click: edit':
    'Klik: {fill} · Prawy klik: {stroke} · Dwuklik: edytuj',
  'Remove from palette':
    'Usuń z palety',
  'Edit color (hex or any CSS color).\nThe drawing is recolored too.':
    'Edytuj kolor (hex lub dowolny kolor CSS).\nRysunek też zmieni kolor.',
  'Not a valid color: {v}':
    'Nieprawidłowy kolor: {v}',
  'Paste a color code (or several) into the box, then press Enter.':
    'Wklej do pola kod koloru (lub kilka) i naciśnij Enter.',
  'No color found in: {text}':
    'Nie znaleziono koloru w: {text}',
  'Added {n} {n|color|colors}.':
    'Dodano {n} {n|kolor|kolory|kolorów}.',
  'Already in the palette.':
    'Już jest w palecie.',
  'Added {n} {n|color|colors} from the clipboard.':
    'Dodano ze schowka {n} {n|kolor|kolory|kolorów}.',
  'Those colors are already in the palette.':
    'Te kolory już są w palecie.',
  'Name of the new palette:':
    'Nazwa nowej palety:',
  'Palette':
    'Paleta',
  'Created “{name}”. Paste colors to fill it.':
    'Utworzono „{name}”. Wklej kolory, aby ją wypełnić.',
  'Rename palette:':
    'Zmień nazwę palety:',
  'Delete the palette “{name}”? (The drawing is not changed.)':
    'Usunąć paletę „{name}”? (Rysunek się nie zmieni.)',
  'Added {n} {n|color|colors} from the drawing.':
    'Dodano z rysunku {n} {n|kolor|kolory|kolorów}.',
  'No new colors in the drawing.':
    'W rysunku nie ma nowych kolorów.',
  'Remove all colors from this palette? (The drawing is not changed.)':
    'Usunąć wszystkie kolory z tej palety? (Rysunek się nie zmieni.)',
  'Imported {n} {n|color|colors}.':
    'Zaimportowano {n} {n|kolor|kolory|kolorów}.',
  'No new colors found in {name}':
    'Nie znaleziono nowych kolorów w {name}',
  'Installed – Mosaic Paint now works offline too.':
    'Zainstalowano – Mosaic Paint działa teraz także offline.',
  'Simple':
    'Prosty',
  'Expert':
    'Ekspert',
  'New':
    'Nowy',
  'Open…':
    'Otwórz…',
  'Save':
    'Zapisz',
  'Save as…':
    'Zapisz jako…',
  'Copy image':
    'Kopiuj obraz',
  'Print…':
    'Drukuj…',
  'Plan…':
    'Plan…',
  'Report':
    'Raport',
  'Contrast':
    'Kontrast',
  'Share of area':
    'Udział powierzchni',
  'Install app':
    'Zainstaluj aplikację',
  'You are looking at a shared mosaic.':
    'Oglądasz udostępnioną mozaikę.',
  'Make my own copy':
    'Zrób własną kopię',
  'Back to my drawing':
    'Wróć do mojego rysunku',
  'Remove last corner':
    'Usuń ostatni narożnik',
  'Cancel':
    'Anuluj',
  'Colors':
    'Kolory',
  'Fill':
    'Wypełnienie',
  'Stroke':
    'Obrys',
  'Width':
    'Szerokość',
  'Add color':
    'Dodaj kolor',
  'Import…':
    'Importuj…',
  'From drawing':
    'Z rysunku',
  'Export':
    'Eksportuj',
  'Clear':
    'Wyczyść',
  'Click a swatch = fill · right-click = stroke · double-click = edit (also recolors the drawing) · Shift+click = add to the color mix. Ctrl+V on the canvas adds copied colors.':
    'Klik na próbce = wypełnienie · prawy klik = obrys · dwuklik = edycja (zmienia też kolory rysunku) · Shift+klik = dodaj do mieszanki kolorów. Ctrl+V na płótnie dodaje skopiowane kolory.',
  'Line':
    'Linia',
  'Chain lines (next line starts at the last end)':
    'Łącz linie (następna linia zaczyna się na końcu poprzedniej)',
  'Free polygon':
    'Dowolny wielokąt',
  'Click each corner. Click the first corner again, double-click or press Enter to close it.':
    'Kliknij każdy narożnik. Aby zamknąć, kliknij ponownie pierwszy narożnik, kliknij dwukrotnie lub naciśnij Enter.',
  'Fill new shapes with the fill color':
    'Wypełniaj nowe kształty kolorem wypełnienia',
  'Regular polygon':
    'Wielokąt foremny',
  'Sides':
    'Boki',
  'From center':
    'Od środka',
  'From edge':
    'Od krawędzi',
  'Knife':
    'Nóż',
  'Press inside a tile and drag in the direction of the cut. The tile is cut straight across, from edge to edge.':
    'Naciśnij wewnątrz płytki i przeciągnij w kierunku cięcia. Płytka zostanie przecięta prosto od krawędzi do krawędzi.',
  'Pattern':
    'Wzór',
  'Angle':
    'Kąt',
  'Rows':
    'Rzędy',
  'Fill whole page':
    'Wypełnij całą stronę',
  'Click inside a closed area to fill it with tiles. Painted areas keep their color in every new tile. “Rows following the outline” lays rows along the area’s edge and around shapes inside it (Rows 0 = fill it).':
    'Kliknij wewnątrz zamkniętego obszaru, aby wypełnić go płytkami. Pomalowane obszary zachowują kolor w każdej nowej płytce. „Rzędy wzdłuż obrysu” układa rzędy wzdłuż krawędzi obszaru i wokół kształtów w nim (Rzędy 0 = wypełnij całość).',
  'Paint bucket':
    'Wiadro z farbą',
  'Click inside any closed area, or drag across many tiles. Click a painted area again to recolor it. The ∅ swatch erases. Alt+click picks a color.':
    'Kliknij wewnątrz dowolnego zamkniętego obszaru lub przeciągnij przez wiele płytek. Ponowne kliknięcie pomalowanego obszaru zmienia jego kolor. Próbka ∅ wymazuje. Alt+klik pobiera kolor.',
  'Mix colors (a random one per tile)':
    'Mieszaj kolory (losowy na każdą płytkę)',
  'Avoid the same color next to itself':
    'Unikaj tego samego koloru obok siebie',
  'Close gaps up to':
    'Zamykaj szczeliny do',
  'Photo to trace':
    'Zdjęcie do odrysowania',
  'Opacity':
    'Krycie',
  'Show':
    'Pokaż',
  'Locked':
    'Zablokowane',
  'Fit to page':
    'Dopasuj do strony',
  'Remove':
    'Usuń',
  'Keep the photo in saved files':
    'Zachowuj zdjęcie w zapisanych plikach',
  'Make a mosaic from the photo…':
    'Utwórz mozaikę ze zdjęcia…',
  'Color my tiles from the photo':
    'Pokoloruj moje płytki według zdjęcia',
  'Only tiles that aren’t painted yet':
    'Tylko jeszcze niepomalowane płytki',
  'Each tile gets the palette color closest to the photo underneath it. Draw the tile lines first.':
    'Każda płytka dostaje kolor z palety najbliższy zdjęciu pod nią. Najpierw narysuj linie płytek.',
  'Grout preview':
    'Podgląd fug',
  'Preview':
    'Podgląd',
  'Apply to all lines':
    'Zastosuj do wszystkich linii',
  'Motifs':
    'Motywy',
  'Save selection…':
    'Zapisz zaznaczenie…',
  'Click a motif, then click on the drawing to place it (R turns it, Esc stops). Ctrl+C / Ctrl+X / Ctrl+V copy shapes between pages, drawings and browser tabs.':
    'Kliknij motyw, a potem kliknij w rysunku, aby go umieścić (R obraca, Esc kończy). Ctrl+C / Ctrl+X / Ctrl+V kopiują kształty między stronami, rysunkami i kartami przeglądarki.',
  'Symmetry':
    'Symetria',
  'Off':
    'Wył.',
  'Mirror left ↔ right':
    'Odbicie lewo ↔ prawo',
  'Mirror top ↕ bottom':
    'Odbicie góra ↕ dół',
  'Mirror both ways':
    'Odbicie w obu kierunkach',
  'Rotate around center':
    'Obrót wokół środka',
  'Copies':
    'Kopie',
  'also mirrored':
    'także lustrzane',
  'Pick center':
    'Wybierz środek',
  'Page center':
    'Środek strony',
  'Lines, polygons, knife cuts and painting are repeated around the guides.':
    'Linie, wielokąty, cięcia nożem i malowanie powtarzają się wokół prowadnic.',
  'Layers':
    'Warstwy',
  'Lines & shapes':
    'Linie i kształty',
  'Painted areas':
    'Pomalowane obszary',
  'Photo':
    'Zdjęcie',
  'Lock the lines while painting so they can’t be moved by accident.':
    'Zablokuj linie podczas malowania, żeby ich przypadkiem nie przesunąć.',
  'Snapping':
    'Przyciąganie',
  'Snap to points & lines':
    'Przyciągaj do punktów i linii',
  'Shared corners move together':
    'Wspólne narożniki przesuwają się razem',
  'Page edge counts as a line':
    'Krawędź strony liczy się jako linia',
  'Grid, size':
    'Siatka, rozmiar',
  'Snaps to ends & corners ▢, crossings ✕, midpoints △, anywhere along a line ◇, centers ○. Hold Alt to place freely.':
    'Przyciąga do końców i narożników ▢, przecięć ✕, środków odcinków △, dowolnego miejsca na linii ◇ i środków ○. Z wciśniętym Alt umieszczasz swobodnie.',
  'Selection':
    'Zaznaczenie',
  'Radius':
    'Promień',
  'Rotation°':
    'Obrót°',
  'Line width':
    'Szerokość linii',
  'Delete':
    'Usuń',
  'To front':
    'Na wierzch',
  'To back':
    'Na spód',
  'Mix colors':
    'Mieszaj kolory',
  'Page':
    'Strona',
  'Apply':
    'Zastosuj',
  'Background':
    'Tło',
  'Show rulers':
    'Pokaż linijki',
  'Keyboard & mouse':
    'Klawiatura i mysz',
  'Select, Line, Free polygon, Polygon, Ellipse, Curve, Pattern, Bucket, Pan':
    'Zaznaczanie, Linia, Dowolny wielokąt, Wielokąt, Elipsa, Krzywa, Wzór, Wiadro, Przesuwanie',
  'Polygon sides':
    'Liczba boków wielokąta',
  'Toggle snapping':
    'Włącz / wyłącz przyciąganie',
  'Alt':
    'Alt',
  'Draw / drag without snapping; detach a shared corner; Alt+click with the bucket picks a color':
    'Rysuj / przeciągaj bez przyciągania; odłącz wspólny narożnik; Alt+klik wiadrem pobiera kolor',
  'Shift':
    'Shift',
  '15° steps; add to selection':
    'Kroki co 15°; dodaj do zaznaczenia',
  'Ctrl (polygon tool)':
    'Ctrl (narzędzie wielokąt)',
  'Flip side when drawing from an edge':
    'Odwróć stronę przy rysowaniu od krawędzi',
  'Ctrl + drag handle':
    'Ctrl + przeciąganie uchwytu',
  'Freely move a polygon corner (it stops being regular)':
    'Swobodnie przesuń narożnik wielokąta (przestaje być foremny)',
  'Enter / Esc':
    'Enter / Esc',
  'Finish / cancel the current shape':
    'Zakończ / anuluj bieżący kształt',
  'Del':
    'Del',
  'Delete selection (or the last corner of a free polygon)':
    'Usuń zaznaczenie (lub ostatni narożnik dowolnego wielokąta)',
  'Arrows':
    'Strzałki',
  'Nudge (Shift = ×10)':
    'Przesuń (Shift = ×10)',
  'Undo / redo':
    'Cofnij / ponów',
  'Copy, cut, paste shapes (also between pages and drawings). Ctrl+C with nothing selected copies the drawing as an image; pasting an image makes it the photo to trace':
    'Kopiuj, wytnij, wklej kształty (także między stronami i rysunkami). Ctrl+C bez zaznaczenia kopiuje rysunek jako obraz; wklejony obraz staje się zdjęciem do odrysowania',
  'Duplicate, select all':
    'Duplikuj, zaznacz wszystko',
  'Wheel, Space+drag':
    'Kółko, spacja+przeciąganie',
  'Zoom, pan (two fingers on touch screens)':
    'Powiększanie, przesuwanie (na ekranach dotykowych dwoma palcami)',
  'Fit page':
    'Cała strona',
  '＋ Page':
    '＋ Strona',
  'Colors & shopping list':
    'Kolory i lista zakupów',
  'Piece size':
    'Rozmiar sztuki',
  'Waste':
    'Odpad',
  '“Replace with” recolors every area of that color.':
    '„Zastąp przez” zmienia kolor wszystkich obszarów tego koloru.',
  'Download CSV':
    'Pobierz CSV',
  'Print template':
    'Szablon do druku',
  'Opens a print page to use as a cutting or laying template.':
    'Otwiera stronę do druku, której użyjesz jako szablonu do cięcia lub układania.',
  'Paper':
    'Papier',
  'Letter':
    'Letter',
  'Tabloid (11×17 in)':
    'Tabloid (11×17 cali)',
  'Real size (split across several sheets if needed)':
    'Rzeczywisty rozmiar (w razie potrzeby na kilku arkuszach)',
  'Fit on one sheet':
    'Zmieść na jednym arkuszu',
  'In color':
    'W kolorze',
  'In color, with color numbers':
    'W kolorze, z numerami kolorów',
  'Outlines with color numbers (paint by number)':
    'Kontury z numerami kolorów (malowanie według numerów)',
  'Add a page with the color legend':
    'Dodaj stronę z legendą kolorów',
  'Mosaic from photo':
    'Mozaika ze zdjęcia',
  'Lays out tiles over the whole page and gives each tile the color of the photo underneath it.':
    'Rozkłada płytki na całej stronie i daje każdej płytce kolor zdjęcia pod nią.',
  'First load a photo:':
    'Najpierw wczytaj zdjęcie:',
  'Tiles':
    'Płytki',
  'Smaller tiles where the photo has detail':
    'Mniejsze płytki tam, gdzie zdjęcie ma szczegóły',
  'Use the current palette':
    'Użyj bieżącej palety',
  'Suggest':
    'Zaproponuj',
  'colors from the photo (new palette)':
    'kolorów ze zdjęcia (nowa paleta)',
  'Replace the current drawing (it is kept in History)':
    'Zastąp bieżący rysunek (zostanie w Historii)',
  'Laying plan':
    'Plan układania',
  'Splits the mosaic into numbered panels – the size of your work surface or of the mesh sheets you lay the tiles on. The print has an overview, every panel at real size and the number of tiles of each color per panel.':
    'Dzieli mozaikę na numerowane panele – o rozmiarze twojego blatu roboczego lub siatek, na których układasz płytki. Wydruk zawiera przegląd, każdy panel w rzeczywistym rozmiarze i liczbę płytek każdego koloru w panelu.',
  'Panel size':
    'Rozmiar panelu',
  'Tabloid':
    'Tabloid',
  'Color numbers on the tiles':
    'Numery kolorów na płytkach',
  'Show the panels on the drawing':
    'Pokaż panele na rysunku',
  'The whole drawing is packed into the link itself – nothing is uploaded. Whoever opens it sees the mosaic and can make their own copy to edit.':
    'Cały rysunek jest zapakowany w sam link – nic nie jest wysyłane. Kto go otworzy, zobaczy mozaikę i może zrobić własną kopię do edycji.',
  'Include the tracing photo (makes the link much longer)':
    'Dołącz zdjęcie do odrysowania (link będzie dużo dłuższy)',
  'Share file…':
    'Udostępnij plik…',
  'Copy link':
    'Kopiuj link',
  'Switch app':
    'Przełącz aplikację',
  'Vector: tiles as shapes. Raster: paint with pixels. Palettes are shared; copy and paste images between them.':
    'Wektor: płytki jako kształty. Raster: malowanie pikselami. Palety są wspólne; obrazy można kopiować i wklejać między nimi.',
  'Simple shows the essentials; Expert adds symmetry, layers, rulers, the knife, printing and fine settings':
    'Prosty pokazuje to, co najważniejsze; Ekspert dodaje symetrię, warstwy, linijki, nóż, drukowanie i dokładne ustawienia',
  'New drawing':
    'Nowy rysunek',
  'Open SVG (Ctrl+O) – you can also drop a file on the canvas':
    'Otwórz SVG (Ctrl+O) – plik możesz też upuścić na płótno',
  'Save SVG (Ctrl+S)':
    'Zapisz SVG (Ctrl+S)',
  'Save as (Ctrl+Shift+S)':
    'Zapisz jako (Ctrl+Shift+S)',
  'Export a PNG image':
    'Eksportuj obraz PNG',
  'Export a 3D model for printing with filament changes – each color at its own height':
    'Eksportuj model 3D do druku ze zmianami filamentu – każdy kolor na własnej wysokości',
  'Copy the drawing (or the selected shapes) as an image – paste it into the raster app or any other program (Ctrl+C)':
    'Kopiuj rysunek (lub zaznaczone kształty) jako obraz – wklej go do aplikacji rastrowej lub dowolnego programu (Ctrl+C)',
  'Print a real-size template with color numbers':
    'Wydrukuj szablon w rzeczywistym rozmiarze z numerami kolorów',
  'Split the mosaic into numbered panels and print a laying plan':
    'Podziel mozaikę na numerowane panele i wydrukuj plan układania',
  'Colors used, areas and a shopping list':
    'Użyte kolory, powierzchnie i lista zakupów',
  'Earlier versions of your drawing':
    'Wcześniejsze wersje twojego rysunku',
  'Share the mosaic as a link':
    'Udostępnij mozaikę jako link',
  'Undo (Ctrl+Z)':
    'Cofnij (Ctrl+Z)',
  'Redo (Ctrl+Y)':
    'Ponów (Ctrl+Y)',
  'Zoom out (-)':
    'Pomniejsz (-)',
  'Zoom in (+)':
    'Powiększ (+)',
  'Fit page (0)':
    'Cała strona (0)',
  'See the mosaic in black & white or as color-blind people see it (screen only)':
    'Zobacz mozaikę w czerni i bieli lub tak, jak widzą ją osoby z zaburzeniami widzenia barw (tylko na ekranie)',
  'Mark tiles that blend into a neighbouring tile of another color':
    'Oznacz płytki, które zlewają się z sąsiednią płytką innego koloru',
  'Language':
    'Język',
  'Install as an app that also works offline':
    'Zainstaluj jako aplikację, która działa także offline',
  'Show the side panel':
    'Pokaż panel boczny',
  'Select / edit (V)':
    'Zaznaczanie / edycja (V)',
  'Line (L)':
    'Linia (L)',
  'Free polygon – click corner by corner (P)':
    'Dowolny wielokąt – klikanie narożnik po narożniku (P)',
  'Regular polygon (G)':
    'Wielokąt foremny (G)',
  'Knife – cut a tile straight across (K)':
    'Nóż – przetnij płytkę w poprzek (K)',
  'Pattern – fill an area with tiles (T)':
    'Wzór – wypełnij obszar płytkami (T)',
  'Paint bucket – click or drag across tiles (B)':
    'Wiadro z farbą – kliknij lub przeciągnij przez płytki (B)',
  'Pan (H, or hold Space / middle mouse / two fingers)':
    'Przesuwanie (H, albo przytrzymaj spację / środkowy przycisk myszy / dwa palce)',
  'Your saved palettes':
    'Twoje zapisane palety',
  'New palette':
    'Nowa paleta',
  'Rename this palette':
    'Zmień nazwę tej palety',
  'Delete this palette':
    'Usuń tę paletę',
  'Fill color – used by the paint bucket':
    'Kolor wypełnienia – używany przez wiadro',
  'Stroke color – used for new lines and polygons':
    'Kolor obrysu – dla nowych linii i wielokątów',
  'Swap fill and stroke':
    'Zamień wypełnienie i obrys',
  'Line width for new lines and polygons':
    'Szerokość linii dla nowych linii i wielokątów',
  'Paste #hex, rgb(), name…':
    'Wklej #hex, rgb(), nazwę…',
  'Load colors from a .txt / .gpl / .css file':
    'Wczytaj kolory z pliku .txt / .gpl / .css',
  'Add every color used in the drawing':
    'Dodaj każdy kolor użyty w rysunku',
  'Download the palette as a list of hex codes':
    'Pobierz paletę jako listę kodów hex',
  '0 = as many rows as fit':
    '0 = tyle rzędów, ile się zmieści',
  'Lay out tiles over the whole page and color them from the photo':
    'Rozłóż płytki na całej stronie i pokoloruj je według zdjęcia',
  'Color the tiles you have drawn':
    'Pokoloruj narysowane płytki',
  'Grout color':
    'Kolor fug',
  'Give every line this color and width for real':
    'Naprawdę nadaj wszystkim liniom ten kolor i szerokość',
  'Save the selected shapes as a motif':
    'Zapisz zaznaczone kształty jako motyw',
  'Load motifs from a file':
    'Wczytaj motywy z pliku',
  'Download all motifs as a file':
    'Pobierz wszystkie motywy jako plik',
  'Give the selected painted areas random colors from the mix':
    'Nadaj zaznaczonym pomalowanym obszarom losowe kolory z mieszanki',
  'Real-world unit: 1 drawing unit = 1 mm / cm / inch':
    'Jednostka rzeczywista: 1 jednostka rysunku = 1 mm / cm / cal',
  'Add a page (front, back, a color variant…)':
    'Dodaj stronę (przód, tył, wariant kolorystyczny…)',
  'Export…':
    'Eksportuj…',
  'Copy':
    'Kopiuj',
  'Paste':
    'Wklej',
  'You are looking at a shared image.':
    'Oglądasz udostępniony obraz.',
  'Back to my image':
    'Wróć do mojego obrazu',
  'Place':
    'Umieść',
  'Paint':
    'Malowanie',
  'Outline':
    'Obrys',
  'From image':
    'Z obrazu',
  'Click a swatch = paint color · right-click = outline color · double-click = edit (also recolors the image). The ∅ swatch paints transparent. Palettes are shared with the vector app.':
    'Klik na próbce = kolor malowania · prawy klik = kolor obrysu · dwuklik = edycja (zmienia też kolory obrazu). Próbka ∅ maluje przezroczystością. Palety są wspólne z aplikacją wektorową.',
  'Brush':
    'Pędzel',
  'Smooth edges for lines and polygons':
    'Gładkie krawędzie linii i wielokątów',
  'The pencil always paints hard pixels in exact palette colors – best for pixel mosaics. Shift: straight lines in 15° steps.':
    'Ołówek zawsze maluje ostre piksele w dokładnych kolorach palety – najlepszy do mozaik pikselowych. Shift: proste linie co 15°.',
  'Fill with the paint color':
    'Wypełnij kolorem malowania',
  'Outline in the outline color':
    'Obrys w kolorze obrysu',
  'Drag from the center. Shift: 15° rotation steps.':
    'Przeciągnij od środka. Shift: obrót co 15°.',
  'Tolerance':
    'Tolerancja',
  'Only connected pixels':
    'Tylko połączone piksele',
  'Fills the area of similar color under the click. Alt+click picks a color.':
    'Wypełnia obszar podobnego koloru pod kliknięciem. Alt+klik pobiera kolor.',
  'Cut':
    'Wytnij',
  'Crop':
    'Przytnij',
  'Drag inside the selection to move it (Alt+drag moves a copy), a corner to scale it, the knob above it to turn it; two fingers on it scale and turn it. The bar below it turns, flips, duplicates and deletes. Enter places it, Esc cancels.':
    'Przeciągnij wewnątrz zaznaczenia, aby je przesunąć (Alt+przeciąganie przesuwa kopię), za róg, aby je skalować, za uchwyt nad nim, aby je obrócić; dwa palce na nim skalują i obracają je. Pasek pod nim obraca, odbija, duplikuje i usuwa. Enter je umieszcza, Esc anuluje.',
  'Mosaic':
    'Mozaika',
  'Make a mosaic…':
    'Utwórz mozaikę…',
  'Reduce to palette':
    'Zredukuj do palety',
  'Open as vector tiles…':
    'Otwórz jako płytki wektorowe…',
  'Works on the selection, or on the whole image when nothing is selected.':
    'Działa na zaznaczeniu albo na całym obrazie, gdy nic nie jest zaznaczone.',
  'Image':
    'Obraz',
  'Resize image':
    'Zmień rozmiar obrazu',
  'Canvas size':
    'Rozmiar płótna',
  'Pixel grid when zoomed in':
    'Siatka pikseli po powiększeniu',
  'Select, Brush, Pencil, Eraser, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan':
    'Zaznaczanie, Pędzel, Ołówek, Gumka, Linia, Wielokąt, Elipsa, Krzywa, Wiadro, Pipeta, Przesuwanie',
  'Smaller / bigger brush':
    'Mniejszy / większy pędzel',
  'Swap paint and outline colors':
    'Zamień kolor malowania i obrysu',
  'Alt+click':
    'Alt+klik',
  'Pick a color':
    'Pobierz kolor',
  'Straight lines, 15° steps':
    'Proste linie, co 15°',
  'Copy, cut, paste images (also between the two apps and other programs)':
    'Kopiuj, wytnij, wklej obrazy (także między obiema aplikacjami i innymi programami)',
  'Select all, clear the selection':
    'Zaznacz wszystko, wyczyść zaznaczenie',
  'Place / cancel a moved or pasted image':
    'Umieść / anuluj przesunięty lub wklejony obraz',
  'Fit image, actual pixels':
    'Cały obraz, rzeczywiste piksele',
  'Real width':
    'Rzeczywista szerokość',
  'Pieces are areas of one color (tiles). “Replace with” recolors every pixel of that color.':
    'Kawałki to obszary jednego koloru (płytki). „Zastąp przez” zmienia kolor wszystkich pikseli tego koloru.',
  'The image is packed into the link itself – nothing is uploaded. Whoever opens it sees the image and can make their own copy to edit.':
    'Obraz jest zapakowany w sam link – nic nie jest wysyłane. Kto go otworzy, zobaczy obraz i może zrobić własną kopię do edycji.',
  'Make a mosaic':
    'Utwórz mozaikę',
  'Splits the picture into tiles and gives each tile the color underneath it, with grout between the tiles.':
    'Dzieli obraz na płytki, daje każdej płytce kolor, który jest pod nią, i wstawia fugi między płytki.',
  'Squares':
    'Kwadraty',
  'Squares, offset rows':
    'Kwadraty, przesunięte rzędy',
  'Bricks':
    'Cegły',
  'Hexagons':
    'Sześciokąty',
  'Irregular (crazy paving)':
    'Nieregularne (mozaika z odłamków)',
  'Grout':
    'Fugi',
  'Smaller tiles where the picture has detail':
    'Mniejsze płytki tam, gdzie obraz ma szczegóły',
  'colors from the picture (new palette)':
    'kolorów z obrazu (nowa paleta)',
  'Keep the picture’s colors':
    'Zachowaj kolory obrazu',
  'Open as vector tiles':
    'Otwórz jako płytki wektorowe',
  'Every piece of the picture (an area of one color) becomes a tile shape in the vector app, at the real size – ready for its print templates, laying plan, 3D print and editing. Your current vector drawing is kept in its History.':
    'Każdy kawałek obrazu (obszar jednego koloru) staje się kształtem płytki w aplikacji wektorowej, w rzeczywistym rozmiarze – gotowym do szablonów druku, planu układania, druku 3D i edycji. Twój bieżący rysunek wektorowy zostanie w jej Historii.',
  'The grout color becomes the page background; every other piece becomes a tile.':
    'Kolor fug staje się tłem strony; każdy inny kawałek staje się płytką.',
  'Open in the vector app':
    'Otwórz w aplikacji wektorowej',
  'Format':
    'Format',
  'JPEG':
    'JPEG',
  'WebP':
    'WebP',
  'Quality':
    'Jakość',
  'JPEG has no transparency: transparent parts become white.':
    'JPEG nie ma przezroczystości: przezroczyste miejsca będą białe.',
  'Simple shows the essentials; Expert adds opacity, tolerance, resizing and more':
    'Prosty pokazuje to, co najważniejsze; Ekspert dodaje krycie, tolerancję, zmianę rozmiaru i więcej',
  'New image':
    'Nowy obraz',
  'Open an image (Ctrl+O) – you can also drop one on the canvas':
    'Otwórz obraz (Ctrl+O) – możesz go też upuścić na płótno',
  'Save as PNG (Ctrl+S)':
    'Zapisz jako PNG (Ctrl+S)',
  'Export as JPEG or WebP':
    'Eksportuj jako JPEG lub WebP',
  'Colors used, pieces and a shopping list':
    'Użyte kolory, kawałki i lista zakupów',
  'Earlier versions of your image':
    'Wcześniejsze wersje twojego obrazu',
  'Share the image as a link':
    'Udostępnij obraz jako link',
  'Copy the selection (or the whole image) to the clipboard (Ctrl+C)':
    'Kopiuj zaznaczenie (lub cały obraz) do schowka (Ctrl+C)',
  'Paste an image from the clipboard (Ctrl+V)':
    'Wklej obraz ze schowka (Ctrl+V)',
  'Fit image (0)':
    'Cały obraz (0)',
  'Actual pixels (1)':
    'Rzeczywiste piksele (1)',
  'Select – drag a rectangle, then drag it to move (V)':
    'Zaznaczanie – przeciągnij prostokąt, potem przeciągnij, aby go przesunąć (V)',
  'Brush – soft edges (B)':
    'Pędzel – miękkie krawędzie (B)',
  'Pencil – hard pixels in exact colors (P)':
    'Ołówek – ostre piksele w dokładnych kolorach (P)',
  'Eraser (E)':
    'Gumka (E)',
  'Paint bucket – fill an area (F)':
    'Wiadro z farbą – wypełnij obszar (F)',
  'Pick a color (I, or Alt+click with any paint tool)':
    'Pobierz kolor (I, albo Alt+klik dowolnym narzędziem do malowania)',
  'Your saved palettes (shared with the vector app)':
    'Twoje zapisane palety (wspólne z aplikacją wektorową)',
  'Paint color – brush, pencil, lines, polygons and the bucket':
    'Kolor malowania – pędzel, ołówek, linie, wielokąty i wiadro',
  'Outline color – the outline of polygons':
    'Kolor obrysu – obrys wielokątów',
  'Swap paint and outline colors (X)':
    'Zamień kolor malowania i obrysu (X)',
  'Brush, pencil, eraser and line size in pixels ( [ and ] )':
    'Rozmiar pędzla, ołówka, gumki i linii w pikselach ( [ i ] )',
  'Add the colors used in the image (or suggest some for a photo)':
    'Dodaj kolory użyte w obrazie (albo zaproponuj jakieś dla zdjęcia)',
  'Turn the image (or the selection) into tiles with grout':
    'Zamień obraz (lub zaznaczenie) w płytki z fugami',
  'Give every pixel the closest palette color':
    'Nadaj każdemu pikselowi najbliższy kolor z palety',
  'Every tile becomes a shape in the vector app – for its templates, laying plan and editing':
    'Każda płytka staje się kształtem w aplikacji wektorowej – do jej szablonów, planu układania i edycji',
  'Scale the picture to this size':
    'Przeskaluj obraz do tego rozmiaru',
  'Change the canvas size, keeping the picture centered':
    'Zmień rozmiar płótna, obraz zostaje na środku',
  'The width of the finished mosaic':
    'Szerokość gotowej mozaiki',
  'Herringbone':
    'Jodełka',
  'Triangles':
    'Trójkąty',
  'Rings (around the click)':
    'Pierścienie (wokół kliknięcia)',
  'Rows following the outline':
    'Rzędy wzdłuż obrysu',
  'portrait':
    'pionowo',
  'landscape':
    'poziomo',
  'Vector':
    'Wektor',
  'Raster':
    'Raster',
  'Fit':
    'Całość',
  'Thinnest part':
    'Najcieńsza część',
  'Raised parts narrower than this – or more than twice as tall as they are wide – are lowered to what is around them, so nothing prints as a thin tower':
    'Wypukłe miejsca węższe niż ta wartość – lub ponad dwa razy wyższe niż szerokie – zostają obniżone do otoczenia, żeby nic nie drukowało się jako cienka wieżyczka',
  'Grout colors are always printed first, so the lines between the tiles stay low.':
    'Kolory fug drukują się zawsze jako pierwsze, więc linie między płytkami zostają nisko.',
  'Grout / lines: always printed first, so they stay low':
    'Fugi / linie: drukują się zawsze jako pierwsze, więc zostają nisko',
  'grout':
    'fuga',
  '{n} thin {n|piece|pieces} lowered so nothing prints as a thin tower':
    '{n} {n|cienki kawałek obniżony|cienkie kawałki obniżone|cienkich kawałków obniżonych}, żeby nic nie drukowało się jako cienka wieżyczka',
  'Top view':
    'Z góry',
  'Drag to turn · wheel or two fingers to zoom · double-click to reset':
    'Przeciągnij, aby obrócić · kółko lub dwa palce, aby powiększyć · dwuklik przywraca widok',
  'Shows the heights taller than they are, to see the color bands':
    'Pokazuje wysokości większe niż są, żeby było widać warstwy kolorów',
  'Heights ×':
    'Wysokości ×',
  'This browser can’t show 3D (WebGL is off).':
    'Ta przeglądarka nie umie pokazać 3D (WebGL jest wyłączony).',
  'One nozzle – colors by height':
    'Jedna dysza – kolory według wysokości',
  'Several filaments (AMS, MMU…) – flat':
    'Kilka filamentów (AMS, MMU…) – płaski',
  'A flat model with one part per color, for printers that switch filaments by themselves. The 3MF file already assigns filament 1, 2, … to the parts – load the filaments in the order listed below.':
    'Płaski model z jedną częścią na kolor, dla drukarek, które same zmieniają filamenty. Plik 3MF już przypisuje częściom filament 1, 2, … – załaduj filamenty w kolejności podanej poniżej.',
  'How thick the tiles are above the base':
    'Jak grube są płytki nad podstawą',
  'Tile layers':
    'Warstwy płytek',
  'Grout colors end this many layers below the tiles, so the lines between them stay low. 0: all flat':
    'Kolory fug kończą się o tyle warstw niżej niż płytki, więc linie między nimi zostają nisko. 0: wszystko płasko',
  'Grout lower by':
    'Fugi niżej o',
  'layers':
    'warstwy',
  'Filaments:':
    'Filamenty:',
  'Grout colors come first and stay lower than the tiles. The base plate uses filament 1.':
    'Kolory fug są pierwsze i zostają niżej niż płytki. Płyta podstawy używa filamentu 1.',
  '3MF for':
    '3MF dla',
  'The model, one part per color with its filament':
    'Model, jedna część na kolor z jej filamentem',
  'One STL file per color, in a ZIP – load them as parts of one object':
    'Jeden plik STL na kolor, w ZIP-ie – wczytaj je jako części jednego obiektu',
  '{share} % · filament {k}':
    '{share} % · filament {k}',
  '{n} {n|color|colors} = {n} {n|filament|filaments} · flat, {h} mm high ({layers} {layers|layer|layers})':
    '{n} {n|kolor|kolory|kolorów} = {n} {n|filament|filamenty|filamentów} · płaski, wysokość {h} mm ({layers} {layers|warstwa|warstwy|warstw})',
  'Base':
    'Podstawa',
  'Mosaic Paint – multi-filament plan for {name}.3mf':
    'Mosaic Paint – plan wielu filamentów dla {name}.3mf',
  'Size {w} × {h} mm · layer height {lh} mm · base {base} {base|layer|layers} · tiles {tile} {tile|layer|layers} · grout {recess} {recess|layer|layers} lower':
    'Rozmiar {w} × {h} mm · wysokość warstwy {lh} mm · podstawa {base} {base|warstwa|warstwy|warstw} · płytki {tile} {tile|warstwa|warstwy|warstw} · fugi o {recess} {recess|warstwę|warstwy|warstw} niżej',
  'Total height {total} mm.':
    'Łączna wysokość {total} mm.',
  'Filament {k}: {color} (also the base plate)':
    'Filament {k}: {color} (także płyta podstawy)',
  'Filament {k}: {color}':
    'Filament {k}: {color}',
  '{slicer}: open the 3MF – every color is a part of one object with its filament already assigned. Load the filaments in this order (AMS slots, MMU…).':
    '{slicer}: otwórz 3MF – każdy kolor jest częścią jednego obiektu z już przypisanym filamentem. Załaduj filamenty w tej kolejności (sloty AMS, MMU…).',
  'The 3MF is made for {slicer}: other slicers may read it as one part – then use the STL files.':
    'Ten 3MF jest przeznaczony dla {slicer}: inne slicery mogą odczytać go jako jedną część – wtedy użyj plików STL.',
  'STL: one file per color in a ZIP. Load them together as one object made of parts and give each its filament.':
    'STL: jeden plik na kolor w ZIP-ie. Wczytaj je razem jako jeden obiekt z części i każdej przypisz jej filament.',
  'Saved {name}.3mf for {slicer}: {n} {n|part|parts} with their filaments assigned.':
    'Zapisano {name}.3mf dla {slicer}: {n} {n|część|części|części} z przypisanymi filamentami.',
  'Saved {name}-stl.zip: {n} STL {n|file|files}, one per color. Load them as parts of one object.':
    'Zapisano {name}-stl.zip: {n} {n|plik|pliki|plików} STL, po jednym na kolor. Wczytaj je jako części jednego obiektu.',
  'Finishing: frame, corners, hanging hole, magnets':
    'Wykończenie: ramka, narożniki, otwór do zawieszenia, magnesy',
  'A border around the picture. With one nozzle it comes out in the top color, with several filaments in filament 1. 0: none':
    'Obramowanie wokół obrazu. Przy jednej dyszy wychodzi w górnym kolorze, przy kilku filamentach w filamencie 1. 0: brak',
  'Frame':
    'Ramka',
  'How many layers the frame stands above the tiles':
    'O ile warstw ramka wystaje ponad płytki',
  'raised by':
    'wyższa o',
  'Radius of the outline’s corners. 0: square':
    'Promień narożników obrysu. 0: ostre',
  'Rounded corners':
    'Zaokrąglone narożniki',
  'A hole to hang it by, at the top in the middle. 0: none':
    'Otwór do zawieszenia, u góry pośrodku. 0: brak',
  'Hanging hole':
    'Otwór do zawieszenia',
  'Four round pockets in the bottom, one near each corner, to glue magnets in: their diameter. 0: none':
    'Cztery okrągłe gniazda w spodzie, po jednym przy każdym narożniku, do wklejenia magnesów: ich średnica. 0: brak',
  'Magnets':
    'Magnesy',
  'How deep the magnet pockets are (the magnet’s thickness)':
    'Jak głębokie są gniazda na magnesy (grubość magnesu)',
  'deep':
    'głębokość',
  'with the frame {w} × {h} mm, {z} mm high':
    'z ramką {w} × {h} mm, wysokość {z} mm',
  'The model is too thin for magnet pockets.':
    'Model jest za cienki na gniazda na magnesy.',
  'The magnet pockets are only {d} mm deep – the model is thinner there.':
    'Gniazda na magnesy mają tylko {d} mm głębokości – model jest tam cieńszy.',
  'Frame {w} mm wide, up to layer {layer} (Z {z} mm), in filament 1.':
    'Ramka szerokości {w} mm, do warstwy {layer} (Z {z} mm), filamentem 1.',
  'Frame {w} mm wide: it goes on in {color} up to layer {layer} (Z {z} mm).':
    'Ramka szerokości {w} mm: ciągnie się w kolorze {color} do warstwy {layer} (Z {z} mm).',
  'Magnet pockets in the bottom: 4 × {d} mm, {depth} mm deep – glue the magnets in after printing.':
    'Gniazda na magnesy w spodzie: 4 × {d} mm, głębokość {depth} mm – wklej magnesy po wydrukowaniu.',
  'Making the mosaic…':
    'Tworzenie mozaiki…',
  'Could not make the mosaic.':
    'Nie udało się utworzyć mozaiki.',
  'Tracing the tiles…':
    'Odrysowywanie płytek…',
  'Could not trace the tiles.':
    'Nie udało się odrysować płytek.',
  'Working out the model…':
    'Obliczanie modelu…',
  'Working out the model… {p} %':
    'Obliczanie modelu… {p} %',
  'Could not build the 3D model.':
    'Nie udało się utworzyć modelu 3D.',
  'Building the 3D model…':
    'Tworzenie modelu 3D…',
  'Building the 3D model… {p} %':
    'Tworzenie modelu 3D… {p} %',
  'Coaster':
    'Podkładka',
  'HOME':
    'DOM',
  'Sign':
    'Tabliczka',
  '100 × 100 mm, square tiles in rings of color – try 3D… with rounded corners.':
    '100 × 100 mm, kwadratowe płytki w kolorowych pierścieniach – wypróbuj 3D… z zaokrąglonymi narożnikami.',
  'coaster':
    'podkladka',
  'A word in tiles with a border – try Report for a shopping list.':
    'Słowo z płytek z obramowaniem – w Raporcie znajdziesz listę zakupów.',
  'sign':
    'tabliczka',
  'Welcome to Mosaic Paint':
    'Witaj w Mosaic Paint',
  'Design a mosaic: draw lines or lay a tile pattern, then paint the tiles. Everything is measured in real millimetres.':
    'Zaprojektuj mozaikę: narysuj linie lub ułóż wzór płytek, a potem pomaluj płytki. Wszystko jest mierzone w prawdziwych milimetrach.',
  'Draw':
    'Rysowanie',
  'The tools are on the left: lines and shapes, the tile pattern, and the paint bucket that fills a tile with one click.':
    'Narzędzia są po lewej: linie i kształty, wzór płytek oraz wiadro, które jednym kliknięciem maluje płytkę.',
  'Pick a color in the palette, then click tiles with the bucket. Palettes are shared with the raster app.':
    'Wybierz kolor w palecie, a potem klikaj wiadrem płytki. Palety są wspólne z aplikacją rastrową.',
  'When it is done':
    'Gdy skończysz',
  'Report gives a shopping list, 3D… a model to print, Share a link. Expert mode adds printing at real size and laying plans.':
    'Raport daje listę zakupów, 3D… model do druku, Udostępnij link. Tryb Ekspert dodaje drukowanie w rzeczywistym rozmiarze i plany układania.',
  'Start from an example':
    'Zacznij od przykładu',
  'Not sure where to begin? Open an example. The ? button shows this guide again.':
    'Nie wiesz, od czego zacząć? Otwórz przykład. Przycisk ? pokaże ten przewodnik ponownie.',
  'Pixel heart':
    'Pikselowe serce',
  '16 × 16 pixel art – every pixel a tile. Try 3D… or Print.':
    'Pixel art 16 × 16 – każdy piksel to płytka. Wypróbuj 3D… lub Drukuj.',
  'heart':
    'serce',
  'Heart':
    'Serce',
  'Sunset mosaic':
    'Mozaika z zachodem słońca',
  'A picture made into tiles with grout by “Make a mosaic…”. Try Open as vector tiles.':
    'Obraz zamieniony w płytki z fugami przez „Utwórz mozaikę…”. Wypróbuj Otwórz jako płytki wektorowe.',
  'sunset':
    'zachod-slonca',
  'Sunset':
    'Zachód słońca',
  'Welcome to Mosaic Paint Raster':
    'Witaj w Mosaic Paint Raster',
  'Paint with pixels: pixel art, or a photo turned into a mosaic. Each pixel can become a tile.':
    'Maluj pikselami: pixel art albo zdjęcie zamienione w mozaikę. Każdy piksel może stać się płytką.',
  'The tools are on the left: pencil, brush, bucket, lines, shapes and selection.':
    'Narzędzia są po lewej: ołówek, pędzel, wiadro, linie, kształty i zaznaczanie.',
  'Pick a color in the palette. Palettes are shared with the vector app.':
    'Wybierz kolor w palecie. Palety są wspólne z aplikacją wektorową.',
  'Open a photo, then “Make a mosaic…” turns it into tiles with grout in your palette’s colors.':
    'Otwórz zdjęcie, a „Utwórz mozaikę…” zrobi z niego płytki z fugami w kolorach twojej palety.',
  'Examples':
    'Przykłady',
  'Open an example to see how it is made, or to start from it. Your current work is kept in History.':
    'Otwórz przykład, aby zobaczyć, jak jest zrobiony, albo zacząć od niego. Twoja bieżąca praca zostanie w Historii.',
  'Back':
    'Wstecz',
  '{k} of {n}':
    '{k} z {n}',
  'Next':
    'Dalej',
  'Examples…':
    'Przykłady…',
  'Example projects to open':
    'Przykładowe projekty do otwarcia',
  'A short guide to the app':
    'Krótki przewodnik po aplikacji',
  'Guide':
    'Przewodnik',
  'Working… {p} %':
    'Pracuję… {p} %',
  'Your photo':
    'Twoje zdjęcie',
  'Load a photo and turn it into tiles – smaller where it has detail.':
    'Wczytaj zdjęcie i zamień je w płytki – mniejsze tam, gdzie ma szczegóły.',
  'Read the G-code your slicer made and check it against this plan: filament changes, filaments and heights':
    'Wczytaj G-code ze slicera i porównaj go z tym planem: zmiany filamentu, filamenty i wysokości',
  'Check G-code…':
    'Sprawdź G-code…',
  'Change to {color} at Z {z} mm':
    'Zmiana na {color} na Z {z} mm',
  'No filament change to {color} at Z {z} mm':
    'Brak zmiany filamentu na {color} na Z {z} mm',
  'A filament change the plan does not have, at Z {z} mm':
    'Zmiana filamentu, której nie ma w planie, na Z {z} mm',
  'The top is at {z} mm, as planned':
    'Wierzch jest na wysokości {z} mm, zgodnie z planem',
  'The top is at {found} mm instead of {z} mm':
    'Wierzch jest na wysokości {found} mm zamiast {z} mm',
  'Filament {k} ({color}) is not used – assign it to the part “{k} {color}”':
    'Filament {k} ({color}) nie jest używany – przypisz go do części „{k} {color}”',
  'Filament {k} ({color}) prints up to {z} mm':
    'Filament {k} ({color}) drukuje do {z} mm',
  'Filament {k} ({color}) prints up to {found} mm instead of {z} mm':
    'Filament {k} ({color}) drukuje do {found} mm zamiast do {z} mm',
  'No printing found in {name} – is it a G-code file?':
    'W {name} nie ma żadnego drukowania – czy to plik G-code?',
  '{name}: {n} {n|thing|things} to look at':
    '{name}: {n} {n|rzecz|rzeczy|rzeczy} do sprawdzenia',
  '{name}: everything matches the plan':
    '{name}: wszystko zgadza się z planem',
  'Reading the G-code…':
    'Odczytywanie G-code…',
  'Reading the G-code… {p} %':
    'Odczytywanie G-code… {p} %',
  'Could not read {name}.':
    'Nie udało się odczytać {name}.',
  '{name} is {w} × {h} px – painting on it and making mosaics will be slow. Scale it down to {W} × {H} px?':
    '{name} ma {w} × {h} px – malowanie i mozaiki na nim będą powolne. Zmniejszyć go do {W} × {H} px?',
  'It has many colors: “Reduce to palette” or “Make a mosaic…” turn them into a few you can buy tiles in.':
    'Ma dużo kolorów: „Zredukuj do palety” lub „Utwórz mozaikę…” zrobią z nich kilka, w których kupisz płytki.',
  '{n} {n|color|colors}':
    '{n} {n|kolor|kolory|kolorów}',
  'Unpin – it may be cleared with old versions':
    'Odepnij – może zostać usunięta ze starymi wersjami',
  'Pin – kept when old versions are cleared':
    'Przypnij – zostaje, gdy stare wersje są usuwane',
  'Name this version':
    'Nazwij tę wersję',
  'Name of this version:':
    'Nazwa tej wersji:',
  'Share link':
    'Link do udostępnienia',
  'What’s new':
    'Co nowego',
  'Version {v} – what’s new':
    'Wersja {v} – co nowego',
  'Updated to version {v} – click v{v} in the corner to see what’s new.':
    'Zaktualizowano do wersji {v} – kliknij v{v} w rogu, aby zobaczyć, co nowego.',
  'The raster app: paint with pixels, turn photos into mosaics, and copy pictures between both apps.':
    'Aplikacja rastrowa: malowanie pikselami, zdjęcia zamieniane w mozaiki i kopiowanie obrazów między obiema aplikacjami.',
  '3D print: a 3D preview, models for multi-filament printers (AMS, MMU), a frame, rounded corners, a hanging hole and magnet pockets – and a check of the sliced G-code against the plan.':
    'Druk 3D: podgląd 3D, modele dla drukarek wielofilamentowych (AMS, MMU), ramka, zaokrąglone narożniki, otwór do zawieszenia i gniazda na magnesy – oraz sprawdzanie G-code ze slicera względem planu.',
  'Examples to start from, and a short guide for newcomers.':
    'Przykłady na start i krótki przewodnik dla początkujących.',
  'German, Slovak and Polish.':
    'Niemiecki, słowacki i polski.',
  'Heavy work – mosaics, tracing, 3D models – no longer holds up the page.':
    'Ciężka praca – mozaiki, odrysowywanie, modele 3D – już nie blokuje strony.',
  'History: name and pin versions; see their size and colors.':
    'Historia: nazywaj i przypinaj wersje; zobacz ich rozmiar i kolory.',
  'Big images can be scaled down when opened.':
    'Duże obrazy można zmniejszyć przy otwieraniu.',
  'Better keyboard and screen-reader support.':
    'Lepsza obsługa klawiatury i czytników ekranu.',
  'The vector editor: lines, tile patterns, the paint bucket, palettes, reports, printing at real size and sharing as a link.':
    'Edytor wektorowy: linie, wzory płytek, wiadro z farbą, palety, raporty, druk w rzeczywistym rozmiarze i udostępnianie linkiem.',
  'Could not sign in to Discord.':
    'Nie udało się zalogować do Discorda.',
  'Post to the channel':
    'Wyślij na kanał',
  'Post the picture in this channel, as a reply to the message it came from':
    'Wyślij obraz na ten kanał jako odpowiedź na wiadomość, z której pochodzi',
  'That image is no longer available in Discord.':
    'Ten obraz nie jest już dostępny na Discordzie.',
  'Right-click an image in the chat › Apps › Edit image to edit it here – or open or paste one.':
    'Kliknij prawym przyciskiem obraz na czacie › Aplikacje › Edit image, aby edytować go tutaj – albo otwórz lub wklej jakiś.',
  'Posted to the channel.':
    'Wysłano na kanał.',
  'The picture is too big for Discord – make it smaller (Image › Resize image).':
    'Obraz jest za duży dla Discorda – zmniejsz go (Obraz › Zmień rozmiar obrazu).',
  'Could not reach the server.':
    'Nie można połączyć się z serwerem.',
  'Could not connect to Discord.':
    'Nie udało się połączyć z Discordem.',
  'Open the editor with “Edit image” (or the app’s launch button) in this chat to post here – or use Copy and paste the picture.':
    'Otwórz edytor przez „Edit image” (lub przycisk uruchamiania aplikacji) na tym czacie, aby tu wysłać – albo użyj Kopiuj i wklej obraz.',
  'More than 15 minutes have passed, and Discord no longer lets the app post. Use Copy and paste the picture into the chat.':
    'Minęło ponad 15 minut i Discord nie pozwala już aplikacji wysłać obrazu. Użyj Kopiuj i wklej obraz na czat.',
  'Discord did not take the picture. Use Copy and paste it into the chat.':
    'Discord nie przyjął obrazu. Użyj Kopiuj i wklej go na czat.',
  'Select the part to keep with the Select tool (V), then crop.':
    'Narzędziem Zaznaczanie (V) zaznacz część do zachowania, a potem przytnij.',
  'The image is all one color – nothing to trim.':
    'Obraz jest cały w jednym kolorze – nie ma czego przycinać.',
  'There is no border to trim.':
    'Nie ma obramowania do przycięcia.',
  'Trimmed to {w} × {h} px.':
    'Przycięto do {w} × {h} px.',
  'Pen pressure changes the size':
    'Nacisk pióra zmienia rozmiar',
  'Tip':
    'Końcówka',
  'Round':
    'Okrągła',
  'Soft (airbrush)':
    'Miękka (aerograf)',
  'Spray':
    'Spray',
  'Calligraphy':
    'Kaligrafia',
  'Chalk':
    'Kreda',
  'The shape of the brush and eraser':
    'Kształt pędzla i gumki',
  'The angle of the calligraphy nib – 45° for right-handed writing, about 135° for left-handed':
    'Kąt stalówki kaligraficznej – 45° dla praworęcznych, około 135° dla leworęcznych',
  'curve through points':
    'krzywa przez punkty',
  'B-spline':
    'B-spline',
  'cubic Bézier':
    'sześcienna krzywa Béziera',
  'quadratic Bézier':
    'kwadratowa krzywa Béziera',
  'ellipse':
    'elipsa',
  'Drag from corner to corner (or from the center) · Shift: a circle · Alt: no snap':
    'Przeciągnij od rogu do rogu (lub od środka) · Shift: koło · Alt: bez przyciągania',
  'Click the curve’s points · click the first point to close it · double-click or Enter ends it open · Backspace removes the last point · Esc cancels':
    'Klikaj punkty krzywej · kliknięcie pierwszego punktu ją zamyka · dwuklik lub Enter kończy ją otwartą · Backspace usuwa ostatni punkt · Esc anuluje',
  'Turn on “Fill” or “Outline” for shapes.':
    'Dla kształtów włącz „Wypełnienie” lub „Obrys”.',
  'Drag from corner to corner (or from the center) · Shift: a circle':
    'Przeciągnij od rogu do rogu (lub od środka) · Shift: koło',
  'The curve runs smoothly through every point you click.':
    'Krzywa przechodzi gładko przez każdy kliknięty punkt.',
  'The curve is pulled towards each point but only touches the first and the last – very smooth, good for flowing lines.':
    'Każdy punkt przyciąga krzywą, ale dotyka ona tylko pierwszego i ostatniego – bardzo gładka, dobra do płynnych linii.',
  'Click a point, two control points, the next point, two control points … The curve passes through every third point; the control points (round) pull it.':
    'Kliknij punkt, dwa punkty kontrolne, następny punkt, dwa punkty kontrolne … Krzywa przechodzi przez co trzeci punkt; punkty kontrolne (okrągłe) ją przyciągają.',
  'Click a point, a control point, the next point, a control point … The curve passes through every other point; the control points (round) pull it.':
    'Kliknij punkt, punkt kontrolny, następny punkt, punkt kontrolny … Krzywa przechodzi przez co drugi punkt; punkty kontrolne (okrągłe) ją przyciągają.',
  'Ellipse':
    'Elipsa',
  'From corner':
    'Od rogu',
  'Shift: a circle. Select it to drag its axis ends.':
    'Shift: koło. Po zaznaczeniu można przeciągać końce jej osi.',
  'Curve':
    'Krzywa',
  'Type':
    'Rodzaj',
  'Smooth, through the points':
    'Gładka, przez punkty',
  'Smooth, near the points (B-spline)':
    'Gładka, przy punktach (B-spline)',
  'Bézier, cubic':
    'Bézier, sześcienna',
  'Bézier, quadratic':
    'Bézier, kwadratowa',
  'Ellipse – Shift: circle (O)':
    'Elipsa – Shift: koło (O)',
  'Curve – click its points (C)':
    'Krzywa – klikaj jej punkty (C)',
  'Shift: a circle.':
    'Shift: koło.',
  'An open curve is a line in the paint color, as thick as the size; a closed one is filled and outlined like the shapes.':
    'Otwarta krzywa to linia w kolorze malowania o wybranym rozmiarze; zamknięta jest wypełniana i obrysowywana jak kształty.',
  'Ellipses and curves in both apps: the Ellipse tool (O, Shift for a circle) and the Curve tool (C) – smooth through the points, smooth near them (B-spline), or cubic and quadratic Bézier.':
    'Elipsy i krzywe w obu aplikacjach: narzędzie Elipsa (O, z Shiftem koło) i narzędzie Krzywa (C) – gładka przez punkty, gładka przy punktach (B-spline) albo sześcienna i kwadratowa krzywa Béziera.',
  'In the vector app, ellipses and curves stay exact curves: drag their points or axis ends to change them, and paint, cut and mirror them like any tile.':
    'W aplikacji wektorowej elipsy i krzywe pozostają dokładnymi krzywymi: przeciągaj ich punkty lub końce osi, aby je zmienić, i maluj, tnij oraz odbijaj je jak każdą płytkę.',
  'Shift+B':
    'Shift+B',
  'Next brush tip':
    'Następna końcówka pędzla',
  'Brush tip: {tip}':
    'Końcówka pędzla: {tip}',
  'Brush tips for the brush and the eraser: soft (airbrush), spray, calligraphy and chalk. Shift+B switches between them.':
    'Końcówki pędzla i gumki: miękka (aerograf), spray, kaligrafia i kreda. Shift+B przełącza między nimi.',
  'The spray keeps spraying while you hold it still, like an airbrush; the calligraphy nib’s angle can be set (also for left-handed writing).':
    'Spray pryska dalej, gdy trzymasz go w miejscu, jak aerograf; kąt stalówki kaligraficznej można ustawić (także dla leworęcznych).',
  'Keep proportions':
    'Zachowaj proporcje',
  'Flip ↔':
    'Odbij ↔',
  'Flip ↕':
    'Odbij ↕',
  'Rotate by':
    'Obróć o',
  'Rotate':
    'Obróć',
  'Crop to selection':
    'Przytnij do zaznaczenia',
  'Trim edges':
    'Przytnij krawędzie',
  'With a graphics tablet or stylus, the brush, pencil and eraser paint thinner the lighter you press':
    'Z tabletem graficznym lub rysikiem pędzel, ołówek i gumka malują tym cieniej, im lżej naciskasz',
  'Rotate 90° to the left':
    'Obróć o 90° w lewo',
  'Rotate 90° to the right':
    'Obróć o 90° w prawo',
  'Flip left ↔ right':
    'Odbij lewo ↔ prawo',
  'Flip upside down':
    'Odwróć do góry nogami',
  'Rotate by any angle (clockwise; negative: to the left) – the canvas grows to hold the picture':
    'Obróć o dowolny kąt (zgodnie z ruchem wskazówek; ujemny: w lewo) – płótno powiększy się, by zmieścić obraz',
  'Keep only the selection (select it with the Select tool first)':
    'Zachowaj tylko zaznaczenie (najpierw zaznacz narzędziem Zaznaczanie)',
  'Cut off the empty or one-color border around the picture':
    'Odetnij puste lub jednokolorowe obramowanie wokół obrazu',
  'Edit images from a Discord chat: right-click › Apps › Edit image, draw on it, post it back – in the raster or the vector app.':
    'Edycja obrazów z czatu na Discordzie: prawy przycisk › Aplikacje › Edit image, rysuj na nim i wyślij z powrotem – w aplikacji rastrowej lub wektorowej.',
  'Pen pressure: with a graphics tablet or stylus, the brush, pencil and eraser paint thinner the lighter you press.':
    'Nacisk pióra: z tabletem graficznym lub rysikiem pędzel, ołówek i gumka malują tym cieniej, im lżej naciskasz.',
  'Image editing in the raster app: rotate (by 90° or any angle), flip, crop to the selection, trim the border, resize keeping proportions.':
    'Edycja obrazu w aplikacji rastrowej: obrót (o 90° lub dowolny kąt), odbicie, przycięcie do zaznaczenia, przycięcie krawędzi, zmiana rozmiaru z zachowaniem proporcji.',
  'Choose a color':
    'Wybierz kolor',
  'Saturation and brightness':
    'Nasycenie i jasność',
  'Hue':
    'Odcień',
  'Before':
    'Przedtem',
  'Color code':
    'Kod koloru',
  'Also add it to the palette':
    'Dodaj go też do palety',
  'Use this color':
    'Użyj tego koloru',
  'Choose…':
    'Wybierz…',
  'Choose any color: a color area, a hue slider and a color code':
    'Wybierz dowolny kolor: pole koloru, suwak odcienia i kod koloru',
  'Fill color – used by the paint bucket. Click to choose any color':
    'Kolor wypełnienia – używany przez wiadro z farbą. Kliknij, aby wybrać dowolny kolor',
  'Stroke color – used for new lines and polygons. Click to choose any color':
    'Kolor linii – dla nowych linii i wielokątów. Kliknij, aby wybrać dowolny kolor',
  'Paint color – brush, pencil, lines, polygons and the bucket. Click to choose any color':
    'Kolor malowania – pędzel, ołówek, linie, wielokąty i wiadro. Kliknij, aby wybrać dowolny kolor',
  'Outline color – the outline of polygons. Click to choose any color':
    'Kolor obrysu – obrys wielokątów. Kliknij, aby wybrać dowolny kolor',
  'Choose any color: a color area, a hue slider and a color code (Choose… under the palette, or click the current colors).':
    'Wybierz dowolny kolor: pole koloru, suwak odcienia i kod koloru (Wybierz… pod paletą lub kliknij bieżące kolory).',
  'Inside Discord: New, Save as, renaming and the other questions work (they are asked in the page now), and switching between the apps keeps the Post button.':
    'W Discordzie: Nowy, Zapisz jako, zmiana nazwy i inne pytania działają (są teraz zadawane na stronie), a przełączanie między aplikacjami zachowuje przycisk publikowania.',
  'On phones inside Discord, the top bar stays clear of Discord’s own controls.':
    'Na telefonach w Discordzie górny pasek nie jest zasłaniany przez elementy sterujące Discorda.',
  'Quick menu':
    'Szybkie menu',
  'Undo':
    'Cofnij',
  'Redo':
    'Ponów',
  'Fit to the screen':
    'Dopasuj do ekranu',
  'Which color':
    'Który kolor',
  'Choose any color':
    'Wybierz dowolny kolor',
  'The palette is empty – use + to choose a color.':
    'Paleta jest pusta – wybierz kolor przyciskiem +.',
  'Tip: double-tap the drawing for a quick menu – tools, colors and size.':
    'Wskazówka: stuknij dwukrotnie rysunek, aby otworzyć szybkie menu – narzędzia, kolory i rozmiar.',
  'Quick menu on phones and tablets: double-tap the drawing with a finger for undo, the main tools, colors and size – right where you draw.':
    'Szybkie menu na telefonach i tabletach: stuknij dwukrotnie palcem rysunek – cofanie, główne narzędzia, kolory i rozmiar, dokładnie tam, gdzie rysujesz.',
  'Tap or click where to copy from.':
    'Stuknij lub kliknij miejsce, z którego kopiować.',
  'Tap the image where to copy from':
    'Stuknij obraz w miejscu, z którego kopiować',
  'Copying from {x}, {y}':
    'Kopiowanie z {x}, {y}',
  'No source yet: the first tap sets it':
    'Brak źródła: pierwsze stuknięcie je ustawi',
  'Source set – now paint where the copy goes.':
    'Źródło ustawione – teraz maluj tam, gdzie ma być kopia.',
  'Clone':
    'Klonowanie',
  'Set source':
    'Ustaw źródło',
  'Aligned – the source follows the brush':
    'Wyrównane – źródło podąża za pędzlem',
  'Set where to copy from, then paint where the copy should go. Drag the source disc to move it. Size, tip and opacity are the brush\'s.':
    'Ustaw, skąd kopiować, a potem maluj tam, gdzie ma być kopia. Krążek źródła można przeciągnąć. Rozmiar, końcówka i krycie są jak u pędzla.',
  'Clone – paint with a copy of another part of the image · Alt+click or the first tap sets where to copy from (S)':
    'Klonowanie – maluj kopią innej części obrazu · Alt+klik lub pierwsze stuknięcie ustawia, skąd kopiować (S)',
  'The next tap or click sets where to copy from (or Alt+click)':
    'Następne stuknięcie lub kliknięcie ustawia, skąd kopiować (lub Alt+klik)',
  'On: the source moves along with the brush from stroke to stroke. Off: every stroke starts copying from the source':
    'Włączone: źródło przesuwa się z pędzlem od pociągnięcia do pociągnięcia. Wyłączone: każde pociągnięcie kopiuje od źródła',
  'Clone tool in the raster app (S): paint with a copy of another part of the image. Tap (or Alt+click) where to copy from, paint the copy, drag the source disc with a finger to move it; aligned or not, with the brush’s size, tip, opacity and pen pressure.':
    'Narzędzie Klonowanie w aplikacji rastrowej (S): maluj kopią innej części obrazu. Stuknij (lub Alt+klik) miejsce, z którego kopiować, namaluj kopię, krążek źródła przesuń palcem; wyrównane lub nie, z rozmiarem, końcówką, kryciem i naciskiem pióra jak u pędzla.',
  'Adjust colors':
    'Dopasuj kolory',
  'Stretch the picture’s tones to the full range':
    'Rozciągnij tony obrazu na pełny zakres',
  'Auto':
    'Auto',
  'Reset':
    'Resetuj',
  'Hold to see the picture as it was':
    'Przytrzymaj, aby zobaczyć obraz sprzed zmian',
  'Colors adjusted.':
    'Kolory dopasowane.',
  'Heal':
    'Korekta',
  'Adjust colors…':
    'Dopasuj kolory…',
  'Select, Brush, Pencil, Eraser, Clone, Heal, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan':
    'Zaznaczenie, Pędzel, Ołówek, Gumka, Klonowanie, Korekta, Linia, Wielokąt, Elipsa, Krzywa, Wiadro, Pobierz kolor, Przesuń',
  'Heal – like Clone, but the copy takes the color and light of the place you paint: for blemishes, spots and scratches (J)':
    'Korekta – jak Klonowanie, ale kopia przejmuje kolor i światło miejsca, gdzie malujesz: na skazy, plamki i rysy (J)',
  'Brightness, contrast, saturation, levels, sharpening and noise smoothing – for the selection or the whole image':
    'Jasność, kontrast, nasycenie, poziomy, wyostrzanie i wygładzanie szumu – dla zaznaczenia lub całego obrazu',
  'Photo fixes in the raster app: Adjust colors… – brightness, contrast, saturation, levels with Auto, sharpening and noise smoothing, previewed live (hold Before to compare).':
    'Poprawki zdjęć w aplikacji rastrowej: Dopasuj kolory… – jasność, kontrast, nasycenie, poziomy z przyciskiem Auto, wyostrzanie i wygładzanie szumu, z podglądem na żywo (przytrzymaj Przedtem, aby porównać).',
  'Heal brush (J): paints over blemishes, spots and scratches with texture from elsewhere, in the color and light of the spot.':
    'Pędzel korygujący (J): zamalowuje skazy, plamki i rysy fakturą z innego miejsca, w kolorze i świetle poprawianego miejsca.',
  'Filling from the surroundings…':
    'Wypełnianie z otoczenia…',
  'Removed.':
    'Usunięto.',
  'Could not fill it: {why}':
    'Nie udało się wypełnić: {why}',
  'Select what to remove first.':
    'Najpierw zaznacz, co usunąć.',
  'Select':
    'Zaznaczanie',
  'Rectangle':
    'Prostokąt',
  'Lasso':
    'Lasso',
  'Magnetic':
    'Magnetyczne',
  'Wand':
    'Różdżka',
  'Add':
    'Dodaj',
  'Subtract':
    'Odejmij',
  'Drag inside the selection to move it. Copy, Clear, Fill from surroundings and Adjust colors follow its shape.':
    'Przeciągnij wewnątrz zaznaczenia, aby je przesunąć. Kopiuj, Wyczyść, Wypełnij z otoczenia i Dopasuj kolory trzymają się jego kształtu.',
  'Paint over what should disappear; when you lift, it is filled from the picture around it. Works best on backgrounds – grass, sky, walls, skin.':
    'Zamaluj to, co ma zniknąć; po uniesieniu zostanie wypełnione obrazem z otoczenia. Najlepiej działa na tłach – trawa, niebo, ściany, skóra.',
  'Fill with':
    'Wypełnij przez',
  'Surroundings (built in)':
    'Otoczenie (wbudowane)',
  'AI (add-on)':
    'AI (dodatek)',
  'Fill from surroundings':
    'Wypełnij z otoczenia',
  'Select, Brush, Pencil, Eraser, Clone, Heal, Remove, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan':
    'Zaznaczenie, Pędzel, Ołówek, Gumka, Klonowanie, Korekta, Usuń, Linia, Wielokąt, Elipsa, Krzywa, Wiadro, Pobierz kolor, Przesuń',
  'Shift / Alt + select':
    'Shift / Alt + zaznaczanie',
  'Add to / take away from the selection':
    'Dodaj do zaznaczenia / odejmij od niego',
  'Remove – paint over something to make it disappear: it is filled from the picture around it (R)':
    'Usuń – zamaluj coś, aby zniknęło: zostanie wypełnione obrazem z otoczenia (R)',
  'Shape':
    'Kształt',
  'A rectangle: drag across':
    'Prostokąt: przeciągnij',
  'Freehand: draw around it':
    'Odręcznie: obrysuj to',
  'Draw roughly along an edge – the line snaps to it':
    'Rysuj mniej więcej wzdłuż krawędzi – linia się do niej przyciąga',
  'Tap a color: everything similar next to it (or anywhere)':
    'Stuknij kolor: wszystko podobne obok (lub wszędzie)',
  'New selection':
    'Nowe zaznaczenie',
  'Replace the selection':
    'Zastąp zaznaczenie',
  'Add to the selection (or hold Shift)':
    'Dodaj do zaznaczenia (lub przytrzymaj Shift)',
  'Take away from the selection (or hold Alt)':
    'Odejmij od zaznaczenia (lub przytrzymaj Alt)',
  'The selected part disappears: filled from the picture around it':
    'Zaznaczona część znika: wypełniona obrazem z otoczenia',
  'Shaped selections: Lasso, Magnetic (snaps to edges) and Wand (by color), with New / Add / Subtract (or Shift / Alt) – copy, clear, move and Adjust colors follow the shape.':
    'Zaznaczenia dowolnego kształtu: Lasso, Magnetyczne (przyciąga się do krawędzi) i Różdżka (według koloru), z Nowe / Dodaj / Odejmij (lub Shift / Alt) – kopiowanie, czyszczenie, przesuwanie i Dopasuj kolory trzymają się kształtu.',
  'Removing things: the Remove brush (R) and Fill from surroundings for a selection fill the spot with the picture around it – content-aware, on the device.':
    'Usuwanie: pędzel Usuń (R) i Wypełnij z otoczenia dla zaznaczenia wypełniają miejsce obrazem z otoczenia – z uwzględnieniem treści, na urządzeniu.',
  'Text':
    'Tekst',
  'Type here':
    'Pisz tutaj',
  'Font':
    'Czcionka',
  'List the fonts installed on this computer (the browser asks first)':
    'Pokaż czcionki zainstalowane na tym komputerze (przeglądarka najpierw zapyta)',
  'More fonts…':
    'Więcej czcionek…',
  'Style':
    'Styl',
  'Bold':
    'Pogrubienie',
  'Italic':
    'Kursywa',
  'Alignment':
    'Wyrównanie',
  'Left':
    'Do lewej',
  'Center':
    'Do środka',
  'Right':
    'Do prawej',
  'Shadow':
    'Cień',
  'The text is in the paint color, its outline in the outline color. Drag it into place, then press Enter or tap outside it.':
    'Tekst ma kolor malowania, obrys – kolor obrysu. Przeciągnij go na miejsce, potem naciśnij Enter lub stuknij obok.',
  '{n} fonts listed.':
    'Wyświetlono czcionek: {n}.',
  'The browser did not list the fonts.':
    'Przeglądarka nie podała listy czcionek.',
  'Drag the text into place, then press Enter or tap outside it.':
    'Przeciągnij tekst na miejsce, potem naciśnij Enter lub stuknij obok.',
  'Tap where to copy from (or Alt+click), then paint the copy · drag the source disc to move it':
    'Stuknij, skąd kopiować (lub Alt+klik), potem maluj kopię · krążek źródła można przeciągnąć',
  'Tap where to copy from (or Alt+click), then paint over the spot – it blends in when you lift':
    'Stuknij, skąd kopiować (lub Alt+klik), potem zamaluj miejsce – po uniesieniu się wtopi',
  'Paint over what should disappear – it is filled from the surroundings when you lift':
    'Zamaluj to, co ma zniknąć – po uniesieniu wypełni się z otoczenia',
  'Tap to add text · drag it into place · tap it to edit · Enter places it':
    'Stuknij, aby dodać tekst · przeciągnij go · stuknij, aby edytować · Enter go umieszcza',
  'Select, Brush, Pencil, Eraser, Clone, Heal, Remove, Blur, Noise, Twist, Text, Line, Polygon, Ellipse, Curve, Bucket, Pick color, Pan':
    'Zaznaczenie, Pędzel, Ołówek, Gumka, Klonowanie, Korekta, Usuń, Rozmycie, Szum, Skręcenie, Tekst, Linia, Wielokąt, Elipsa, Krzywa, Wiadro, Pobierz kolor, Przesuń',
  'Text – tap to type; fonts, outline, shadow and curved text (T)':
    'Tekst – stuknij i pisz; czcionki, obrys, cień i wygięty tekst (T)',
  'Text tool in the raster app (T): any font (also the installed ones, where the browser lists them), size, bold, italic, alignment, outline, shadow and curved text. It floats until placed – drag it, tap it to edit.':
    'Narzędzie Tekst w aplikacji rastrowej (T): dowolna czcionka (także zainstalowane, gdzie przeglądarka je wyświetla), rozmiar, pogrubienie, kursywa, wyrównanie, obrys, cień i wygięty tekst. Unosi się do czasu umieszczenia – przeciągnij go, stuknij, aby edytować.',
  'The AI could not start in this browser.':
    'Nie udało się uruchomić AI w tej przeglądarce.',
  'Starting the AI…':
    'Uruchamianie AI…',
  'The AI could not do it: {why}':
    'AI nie dała rady: {why}',
  'Looking at the picture…':
    'Analiza obrazu…',
  'Nothing found there – tap the middle of the object.':
    'Nic tam nie znaleziono – stuknij środek obiektu.',
  'the AI add-on is not downloaded':
    'dodatek AI nie jest pobrany',
  'Remove background':
    'Usuń tło',
  'What is in the picture?':
    'Co jest na obrazie?',
  'People (portraits)':
    'Ludzie (portrety)',
  'Any subject (objects, animals, products)':
    'Dowolny obiekt (przedmioty, zwierzęta, produkty)',
  'Each needs a one-time download – the size is shown before anything is downloaded. Everything runs on this device.':
    'Każdy wymaga jednorazowego pobrania – rozmiar zobaczysz, zanim cokolwiek zostanie pobrane. Wszystko działa na tym urządzeniu.',
  'Select the subject':
    'Zaznacz obiekt',
  'Finding the subject…':
    'Szukanie obiektu…',
  'The subject is selected.':
    'Obiekt jest zaznaczony.',
  'Background removed.':
    'Tło usunięte.',
  'Could not load the text recognition.':
    'Nie udało się wczytać rozpoznawania tekstu.',
  'Reading the text…':
    'Odczytywanie tekstu…',
  'Text in the picture':
    'Tekst na obrazie',
  'You can correct it here before copying.':
    'Możesz go tu poprawić przed skopiowaniem.',
  'Copied.':
    'Skopiowano.',
  'Select the text and copy it (Ctrl+C).':
    'Zaznacz tekst i skopiuj go (Ctrl+C).',
  'No text found.':
    'Nie znaleziono tekstu.',
  '3D relief':
    'Relief 3D',
  'A 3D-printable relief of the picture (STL): from its brightness, or from the depth an AI sees in a photo.':
    'Relief obrazu do druku 3D (STL): z jasności albo z głębi, którą AI widzi na zdjęciu.',
  'Brightness – light is high':
    'Jasność – jasne jest wysoko',
  'Brightness – dark is high (a lithophane: hold it against light)':
    'Jasność – ciemne jest wysoko (litofan: oglądaj pod światło)',
  'Depth (AI add-on) – near is high':
    'Głębia (dodatek AI) – bliskie jest wysoko',
  'Relief':
    'Relief',
  'Low':
    'Niski',
  'Medium':
    'Średni',
  'High':
    'Wysoki',
  'Smoothing':
    'Wygładzanie',
  'Height map: white is high':
    'Mapa wysokości: białe jest wysoko',
  'Save STL':
    'Zapisz STL',
  'Working out the depth…':
    'Obliczanie głębi…',
  '{w} × {h} mm, {z} mm high':
    '{w} × {h} mm, wysokość {z} mm',
  'Saved relief.stl.':
    'Zapisano relief.stl.',
  'Select object (AI)':
    'Zaznaczanie obiektu (AI)',
  'Tap an object to select it.':
    'Stuknij obiekt, aby go zaznaczyć.',
  'Object removal (AI)':
    'Usuwanie obiektów (AI)',
  'Remove fills the spot with a trained model – better on objects and structure than the built-in fill.':
    'Usuń wypełnia miejsce wytrenowanym modelem – lepiej niż wbudowane wypełnienie przy obiektach i strukturach.',
  'Background removal – people':
    'Usuwanie tła – ludzie',
  'Removes the background behind people (portraits).':
    'Usuwa tło za ludźmi (portrety).',
  'Background removal – any subject':
    'Usuwanie tła – dowolny obiekt',
  'Removes the background behind the main subject: objects, animals, products.':
    'Usuwa tło za głównym obiektem: przedmioty, zwierzęta, produkty.',
  'Read text (OCR)':
    'Odczyt tekstu (OCR)',
  'Recognizes text in the image, to copy it.':
    'Rozpoznaje tekst na obrazie, aby go skopiować.',
  'Depth for 3D relief (AI)':
    'Głębia do reliefu 3D (AI)',
  'Estimates the depth of a photo for a 3D-printable relief.':
    'Szacuje głębię zdjęcia do reliefu do druku 3D.',
  'Download failed ({status}).':
    'Pobieranie nie powiodło się ({status}).',
  'This needs a one-time download of {size}.':
    'Wymaga to jednorazowego pobrania {size}.',
  'That includes the AI engine ({size}), shared by all AI add-ons.':
    'Obejmuje to silnik AI ({size}), wspólny dla wszystkich dodatków AI.',
  'It is kept in this browser and works offline afterwards; the Add-ons list in the side panel removes it again. Everything runs on this device – your pictures are not uploaded.':
    'Zostaje w tej przeglądarce i potem działa także offline; lista Dodatki w panelu bocznym znów go usuwa. Wszystko działa na tym urządzeniu – Twoje obrazy nie są nigdzie wysyłane.',
  'Download {size}':
    'Pobierz {size}',
  'Downloading…':
    'Pobieranie…',
  '{name} is ready.':
    '{name} – gotowe.',
  'Could not download it: {why}':
    'Nie udało się pobrać: {why}',
  'installed':
    'zainstalowano',
  'Download':
    'Pobierz',
  'Used by add-ons: {size}. Sizes include the shared AI engine where it is not downloaded yet.':
    'Zajęte przez dodatki: {size}. Rozmiary obejmują wspólny silnik AI, jeśli nie jest jeszcze pobrany.',
  'Removed the add-on.':
    'Usunięto dodatek.',
  'Object (AI)':
    'Obiekt (AI)',
  'Remove background…':
    'Usuń tło…',
  'Read text…':
    'Odczytaj tekst…',
  '3D relief…':
    'Relief 3D…',
  'Add-ons':
    'Dodatki',
  'Features that need a one-time download. Nothing is downloaded until you agree; everything runs on this device.':
    'Funkcje wymagające jednorazowego pobrania. Nic nie jest pobierane bez Twojej zgody; wszystko działa na tym urządzeniu.',
  'Tap an object: the AI selects it (an add-on – asks before downloading)':
    'Stuknij obiekt: AI go zaznaczy (dodatek – pyta przed pobraniem)',
  'Make the background transparent, or select the subject (an AI add-on – asks before downloading)':
    'Ustaw przezroczyste tło albo zaznacz obiekt (dodatek AI – pyta przed pobraniem)',
  'Recognize the text in the image or the selection, to copy it (an add-on – asks before downloading)':
    'Rozpoznaj tekst na obrazie lub w zaznaczeniu, aby go skopiować (dodatek – pyta przed pobraniem)',
  'A 3D-printable relief (STL) from the picture\'s brightness, or from AI depth':
    'Relief do druku 3D (STL) z jasności obrazu albo z głębi AI',
  'Add-ons that run on your device, each downloaded only after you agree to its size: Select object (tap it), AI object removal, background removal, Read text (OCR) and depth for 3D reliefs. The side panel lists them and removes them again.':
    'Dodatki działające na Twoim urządzeniu, pobierane dopiero po akceptacji rozmiaru: zaznaczanie obiektu (stuknięciem), usuwanie obiektów przez AI, usuwanie tła, odczyt tekstu (OCR) i głębia do reliefów 3D. Panel boczny je wyświetla i znów usuwa.',
  '3D relief…: a printable relief (STL) from the picture\'s brightness – or a lithophane – or from AI depth.':
    'Relief 3D…: relief do druku (STL) z jasności obrazu – albo litofan – albo z głębi AI.',
  'Layer {n}':
    'Warstwa {n}',
  'Saved as one picture – Save layers (.ora) in the Layers section keeps the layers.':
    'Zapisano jako jeden obraz – warstwy zachowa Zapisz warstwy (.ora) w sekcji Warstwy.',
  'The last layer can’t be deleted.':
    'Ostatniej warstwy nie można usunąć.',
  'There is no layer under this one.':
    'Pod tą warstwą nie ma żadnej.',
  'Name of the layer:':
    'Nazwa warstwy:',
  'Hide this layer':
    'Ukryj tę warstwę',
  'Show this layer':
    'Pokaż tę warstwę',
  'Show {name}':
    'Pokaż {name}',
  'Saved {name} with {n} {n|layer|layers}.':
    'Zapisano {name} z {n} {n|warstwą|warstwami|warstwami}.',
  'Opened {name} ({n} {n|layer|layers}).':
    'Otwarto {name} ({n} {n|warstwa|warstwy|warstw}).',
  'Could not read this OpenRaster file.':
    'Nie udało się odczytać tego pliku OpenRaster.',
  'Merge down':
    'Scal w dół',
  'Flatten':
    'Spłaszcz',
  'Save layers (.ora)':
    'Zapisz warstwy (.ora)',
  'Painting and the other tools work on the active layer. Tap a layer to make it active, double-click to rename. Save keeps the picture as it looks; Save layers keeps the layers.':
    'Malowanie i inne narzędzia działają na aktywnej warstwie. Stuknij warstwę, aby ją aktywować, kliknij dwukrotnie, aby zmienić nazwę. Zapisz zapisuje obraz tak, jak wygląda; Zapisz warstwy zachowuje warstwy.',
  'Layers (.ora)':
    'Warstwy (.ora)',
  'Layers – the top one first':
    'Warstwy – najwyższa pierwsza',
  'A new, empty layer above this one':
    'Nowa, pusta warstwa nad tą',
  'A copy of this layer':
    'Kopia tej warstwy',
  'Move this layer up':
    'Przesuń warstwę w górę',
  'Move up':
    'W górę',
  'Move this layer down':
    'Przesuń warstwę w dół',
  'Move down':
    'W dół',
  'Delete this layer':
    'Usuń tę warstwę',
  'Put this layer onto the one under it':
    'Nałóż tę warstwę na tę pod nią',
  'All the layers as one':
    'Wszystkie warstwy w jedną',
  'Save every layer in one file (OpenRaster – GIMP, Krita and others open it); Open… opens it again':
    'Zapisz wszystkie warstwy w jednym pliku (OpenRaster – otwiera go GIMP, Krita i inne); Otwórz… otwiera go ponownie',
  'Layers in the raster app: paint on the active layer, show / hide, opacity, move, merge, flatten – undo knows them all. Save layers keeps them in an OpenRaster file (.ora – GIMP and Krita open it), and autosave keeps them too.':
    'Warstwy w aplikacji rastrowej: malowanie na aktywnej warstwie, pokazywanie / ukrywanie, krycie, przesuwanie, scalanie, spłaszczanie – Cofnij zna wszystko. Zapisz warstwy zachowuje je w pliku OpenRaster (.ora – otwiera go GIMP i Krita), zachowuje je też automatyczny zapis.',
  'The AI add-ons on phones: much less memory (no more crash on iPhone when selecting an object) – the CPU engine on iPhone and iPad, and one feature\'s models at a time.':
    'Dodatki AI na telefonach: znacznie mniej pamięci (zaznaczanie obiektu na iPhonie już się nie wywala) – na iPhonie i iPadzie silnik CPU i zawsze modele tylko jednej funkcji.',
  'Frame {n} of {count}':
    'Klatka {n} z {count}',
  '{s} s of {total} s':
    '{s} s z {total} s',
  'Choose a frame':
    'Wybierz klatkę',
  'One frame back':
    'Klatka wstecz',
  'Play / pause':
    'Odtwórz / pauza',
  'One frame on':
    'Klatka dalej',
  'Use this frame':
    'Użyj tej klatki',
  'This video can’t be played here – try a GIF or a screenshot of it.':
    'Tego wideo nie da się tu odtworzyć – spróbuj GIF-a albo zrzutu ekranu.',
  'GIFs and videos: open one (or, in Discord, a GIF, a video or a Tenor / Giphy GIF from the chat) and choose the frame to edit – with a slider, frame steps and play.':
    'GIF-y i wideo: otwórz je (w Discordzie także GIF, wideo lub GIF z Tenora / Giphy z czatu) i wybierz klatkę do edycji – suwakiem, krokami klatek lub odtwarzaniem.',
  'Everything was selected – now nothing is.':
    'Zaznaczone było wszystko – teraz nic.',
  'Invert':
    'Odwróć',
  'Select the other shapes instead (Ctrl+I)':
    'Zaznacz zamiast tego pozostałe kształty (Ctrl+I)',
  'Adjust':
    'Dopasuj',
  'Invert selection':
    'Odwróć zaznaczenie',
  'Invert the selection':
    'Odwróć zaznaczenie',
  'Brightness, contrast, warmth and the other photo sliders – for the selection or the whole image':
    'Jasność, kontrast, ciepło i inne suwaki zdjęć – dla zaznaczenia lub całego obrazu',
  'Select what isn\'t selected (Ctrl+I)':
    'Zaznacz to, co nie jest zaznaczone (Ctrl+I)',
  'Light':
    'Światło',
  'Detail and effects':
    'Szczegóły i efekty',
  'Levels':
    'Poziomy',
  'Vibrance':
    'Jaskrawość',
  'Warmth':
    'Ciepło',
  'Tint':
    'Zabarwienie',
  'Fade':
    'Wyblaknięcie',
  'Vignette':
    'Winieta',
  'Black point':
    'Punkt czerni',
  'White point':
    'Punkt bieli',
  'Shadows':
    'Cienie',
  'Highlights':
    'Światła',
  'Midtones':
    'Półtony',
  'Nicer icons for undo / redo, zoom, fit and help; Adjust is in the toolbar and the quick menu, with new sliders – shadows, highlights, warmth, tint, vibrance, fade and vignette. Invert selection (Ctrl+I) in both apps.':
    'Ładniejsze ikony cofania / ponawiania, powiększania, dopasowania i pomocy; Dopasuj na pasku i w szybkim menu, z nowymi suwakami – cienie, światła, ciepło, zabarwienie, jaskrawość, wyblaknięcie i winieta. Odwracanie zaznaczenia (Ctrl+I) w obu aplikacjach.',
  'Select object (AI) no longer crashes on phones: it now uses MobileSAM, which needs a quarter of the memory (and is faster). Its download is larger (45 MB); the old model is removed.':
    'Zaznaczanie obiektu (AI) nie wywala się już na telefonach: używa teraz MobileSAM, który potrzebuje jednej czwartej pamięci (i jest szybszy). Pobieranie jest większe (45 MB); stary model zostaje usunięty.',
  'Import a picture':
    'Importuj obraz',
  'Put a picture from a file into this image – drag it into place, then press Enter (or tap outside it)':
    'Wstaw obraz z pliku do tego obrazu – przeciągnij go na miejsce, potem naciśnij Enter (lub stuknij obok)',
  'Import… puts a picture from a file into the current image (also in the quick menu): it comes in floating, scaled to fit – drag it into place.':
    'Importuj… wstawia obraz z pliku do bieżącego obrazu (także w szybkim menu): pojawia się jako pływający, dopasowany rozmiarem – przeciągnij go na miejsce.',
  'Two fingers on a selection':
    'Dwa palce na zaznaczeniu',
  'Scale, turn and move it (spread, pinch, twist)':
    'Skalowanie, obrót i przesunięcie (rozsuń, ściśnij, obróć palce)',
  'Two fingers on a selection (or a pasted, imported picture or text) scale and turn it: spread or pinch, twist – and move it. It snaps upright and to its own size, and is always made from the original pixels, so it doesn’t blur. Elsewhere two fingers zoom the view as before.':
    'Dwa palce na zaznaczeniu (lub wklejonym, zaimportowanym obrazie albo tekście) skalują i obracają je: rozsuń lub ściśnij palce, obróć nimi – i przesuń. Przyciąga się do pionu i oryginalnego rozmiaru, a zawsze powstaje z oryginalnych pikseli, więc się nie rozmywa. Gdzie indziej dwa palce przybliżają widok jak dotąd.',
  'On phones, the Select shapes (and other rows of choices) wrap onto a second line instead of cutting off the last one – Object (AI) can be tapped again.':
    'Na telefonach kształty zaznaczenia (i inne rzędy opcji) przechodzą do drugiej linii zamiast ucinać ostatnią – Obiekt (AI) znów można nacisnąć.',
  'Drag a corner of the selection':
    'Przeciągnij róg zaznaczenia',
  'Scale it (the opposite corner stays)':
    'Skalowanie (przeciwny róg zostaje na miejscu)',
  'Scale a selection with the mouse: drag one of the handles in its corners – the opposite corner stays put and the proportions are kept. As with two fingers, it is always made from the original pixels.':
    'Skalowanie zaznaczenia myszą: przeciągnij jeden z uchwytów w jego rogach – przeciwny róg zostaje na miejscu, a proporcje są zachowane. Tak jak przy dwóch palcach, zawsze powstaje z oryginalnych pikseli.',
  'Paint to soften – edges of pasted photos blend in · [ ] size · a soft tip blends best':
    'Maluj, aby zmiękczyć – krawędzie wklejonych zdjęć się wtapiają · [ ] rozmiar · najlepiej wtapia miękka końcówka',
  'Paint to add grain – a smooth patch matches the photo around it · [ ] size':
    'Maluj, aby dodać ziarno – gładki fragment pasuje do zdjęcia wokół · [ ] rozmiar',
  'Blur':
    'Rozmycie',
  'Noise':
    'Szum',
  'Strength':
    'Siła',
  'Amount':
    'Ilość',
  'Colored grain':
    'Kolorowe ziarno',
  'To blend a photo in: blur along its edge, then add a little grain so it matches the picture around it. Each stroke adds more; the tip and opacity are the brush\'s.':
    'Jak wtopić zdjęcie: rozmyj jego krawędź, a potem dodaj trochę ziarna, aby pasowało do obrazu wokół. Każde pociągnięcie dodaje więcej; końcówka i krycie są jak w pędzlu.',
  'Blur – paint to soften: blends the edges of a pasted photo into the picture (U)':
    'Rozmycie – maluj, aby zmiękczyć: krawędzie wklejonego zdjęcia wtapiają się w obraz (U)',
  'Noise – paint to add grain: makes a smooth or pasted part match a photo\'s texture (N)':
    'Szum – maluj, aby dodać ziarno: gładki lub wklejony fragment dostaje fakturę zdjęcia (N)',
  'How soft: about this many pixels':
    'Jak miękko: mniej więcej o tyle pikseli',
  'How much grain':
    'Ile ziarna',
  'Off: the same grain in red, green and blue (like film). On: each its own':
    'Wyłączone: to samo ziarno w czerwonym, zielonym i niebieskim (jak film). Włączone: każdy kolor własne',
  'Blur (U) and Noise (N) brushes, to blend photos into each other: blur along the edge of a pasted photo to soften it (a cut-out’s edge fades out), then add a little grain so it matches the picture around it.':
    'Pędzle Rozmycie (U) i Szum (N) do wtapiania zdjęć: rozmyj krawędź wklejonego zdjęcia, aby ją zmiękczyć (krawędź wycinka zanika), a potem dodaj trochę ziarna, aby pasowało do obrazu wokół.',
  'In a narrower window the top bar scrolls on its own instead of pushing the whole page sideways (the canvas could slide out of view).':
    'W węższym oknie górny pasek przewija się sam, zamiast przesuwać całą stronę w bok (płótno mogło zniknąć z widoku).',
  'Compress video…':
    'Zmniejsz wideo…',
  'Make a video small enough for Discord – on your device – and post it here':
    'Zmniejsz wideo tak, by zmieściło się w Discordzie – na twoim urządzeniu – i opublikuj je tutaj',
  'Compress a video':
    'Zmniejsz wideo',
  'The video is made smaller on your device, then posted to the channel.':
    'Wideo zostanie zmniejszone na twoim urządzeniu, a potem opublikowane na kanale.',
  'Choose a video…':
    'Wybierz wideo…',
  'Small enough already – it is posted as it is.':
    'Już jest dość małe – zostanie opublikowane bez zmian.',
  'Use as it is':
    'Użyj bez zmian',
  'Compress':
    'Zmniejsz',
  'Too long for {size} MB – the picture would be very poor. Choose the larger size or a shorter video.':
    'Za długie na {size} MB – obraz byłby bardzo słaby. Wybierz większy rozmiar lub krótsze wideo.',
  '→ about {w} × {h}, {rate} Mbit/s':
    '→ około {w} × {h}, {rate} Mbit/s',
  'Opening {name}…':
    'Otwieranie {name}…',
  'This video can’t be read here – try another one (MP4, MOV or WebM).':
    'Tego wideo nie da się tu odczytać – spróbuj innego (MP4, MOV lub WebM).',
  'Could not compress the video.':
    'Nie udało się zmniejszyć wideo.',
  '{size} (was {before})':
    '{size} (było {before})',
  'without sound (this browser can’t make it)':
    'bez dźwięku (ta przeglądarka nie potrafi go utworzyć)',
  'still too big – choose the larger size or a shorter video':
    'wciąż za duże – wybierz większy rozmiar lub krótsze wideo',
  'Discord did not take a video this big – try 10 MB.':
    'Discord nie przyjął tak dużego wideo – spróbuj 10 MB.',
  'Use “Compress video” on a message or /compress-video in this chat to post here.':
    'Aby opublikować tutaj, użyj „Compress video” na wiadomości lub /compress-video na tym czacie.',
  'More than 15 minutes have passed, and Discord no longer lets the app post. Run /compress-video again.':
    'Minęło ponad 15 minut i Discord nie pozwala już aplikacji publikować. Uruchom /compress-video ponownie.',
  'Discord did not take the video.':
    'Discord nie przyjął wideo.',
  'Choose a video from your device.':
    'Wybierz wideo ze swojego urządzenia.',
  'Discord: compress a video to fit Discord’s limit and post it – right-click a message with a video › Apps › Compress video, or /compress-video for a video from your device. It is made smaller on your device (20 MB or 10 MB), shown, then posted.':
    'Discord: zmniejsz wideo do limitu Discorda i opublikuj je – prawy przycisk na wiadomości z wideo › Aplikacje › Compress video, albo /compress-video dla wideo z urządzenia. Zmniejsza się na twoim urządzeniu (20 MB lub 10 MB), pokazuje, a potem publikuje.',
  'Turn left 90°':
    'Obróć w lewo o 90°',
  'Turn right 90°':
    'Obróć w prawo o 90°',
  'Flip horizontally':
    'Odbij w poziomie',
  'Flip vertically':
    'Odbij w pionie',
  'Duplicate – leave a copy here and move this one on':
    'Duplikuj – kopia zostaje tutaj, a ten przesuwa się dalej',
  'Delete the selected pixels (Del)':
    'Usuń zaznaczone piksele (Del)',
  'Drag the knob above a selection':
    'Przeciągnij uchwyt nad zaznaczeniem',
  'Turn it (Shift: 15° steps)':
    'Obrót (Shift: co 15°)',
  'A selection now has a knob above it to turn it (it snaps upright; Shift: 15° steps) and a bar below it: turn left / right, flip horizontally / vertically, duplicate, delete, cancel, place – with the mouse or a finger.':
    'Zaznaczenie ma teraz nad sobą uchwyt do obracania (przyciąga do pionu; Shift: co 15°) i pasek pod sobą: obrót w lewo / prawo, odbicie w poziomie / pionie, duplikuj, usuń, anuluj, umieść – myszą lub palcem.',
  'Press at the centre, drag out for the size, then go round it to twist – the further round, the stronger · lift to finish':
    'Naciśnij w środku, przeciągnij na zewnątrz dla rozmiaru, potem krąż wokół, by skręcić – im dalej wokół, tym mocniej · puść, by zakończyć',
  'Twist':
    'Skręcenie',
  'Press where the swirl\'s centre should be and drag out: the circle shows how far it reaches. Then go round the centre – the further round, the stronger the twist (back the other way to undo it). Lift to finish; with a selection, only the selected pixels twist.':
    'Naciśnij tam, gdzie ma być środek wiru, i przeciągnij na zewnątrz: okrąg pokazuje, jak daleko sięga. Potem krąż wokół środka – im dalej wokół, tym mocniejsze skręcenie (z powrotem je cofa). Puść, by zakończyć; przy zaznaczeniu skręcają się tylko zaznaczone piksele.',
  'Twist – press, drag out for the size, go round to swirl the picture (W)':
    'Skręcenie – naciśnij, przeciągnij na zewnątrz dla rozmiaru, krąż wokół, a obraz zawiruje (W)',
  'Twist tool (W): press where the swirl’s centre should be, drag out for its size, then go round – the further round, the stronger the twist (either way). With a selection, only the selected pixels twist.':
    'Narzędzie Skręcenie (W): naciśnij tam, gdzie ma być środek wiru, przeciągnij na zewnątrz dla jego rozmiaru, potem krąż wokół – im dalej wokół, tym mocniejsze skręcenie (w obie strony). Przy zaznaczeniu skręcają się tylko zaznaczone piksele.',
  'Click a line or shape to pick it, then drag it – or press Delete':
    'Kliknij linię lub kształt, by go wybrać, potem go przeciągnij – albo naciśnij Delete',
  'Drag to draw a line – it sticks to the lines and corners already there':
    'Przeciągnij, by narysować linię – przyczepia się do linii i rogów, które już są',
  'Drag from the middle to draw a shape – pick how many corners on the right':
    'Przeciągnij od środka, by narysować kształt – po prawej wybierz, ile ma mieć rogów',
  'Drag to draw a circle or an oval':
    'Przeciągnij, by narysować koło lub owal',
  'Click inside an area to fill it with tiles':
    'Kliknij wewnątrz obszaru, by wypełnić go płytkami',
  'Pick a color, then click a tile to paint it – or drag across many tiles':
    'Wybierz kolor, potem kliknij płytkę, by ją pomalować – albo przeciągnij przez wiele płytek',
  'Make a mosaic: draw the lines between the tiles, or fill an area with tiles, then paint each tile.':
    'Zrób mozaikę: narysuj linie między płytkami albo wypełnij obszar płytkami, potem pomaluj każdą płytkę.',
  'Pick a tool on the left: Line, Shapes and Circles draw, Tiles fills an area with tiles, Paint colors a tile when you click it.':
    'Wybierz narzędzie po lewej: Linia, Kształty i Koła rysują, Płytki wypełniają obszar płytkami, Maluj koloruje płytkę, którą klikniesz.',
  'Click a color, then click the tiles with Paint. Made a mistake? The arrow at the top takes it back.':
    'Kliknij kolor, potem płytki narzędziem Maluj. Pomyłka? Strzałka u góry to cofnie.',
  'Shapes':
    'Kształty',
  'Circles':
    'Koła',
  'Small tiles':
    'Małe płytki',
  'Big':
    'Duże',
  'Simple: only the drawing tools and the colors – for children and quick mosaics. Expert: everything':
    'Prosty: tylko narzędzia do rysowania i kolory – dla dzieci i szybkich mozaik. Ekspert: wszystko',
  'Tile size':
    'Rozmiar płytek',
  'The vector app’s Simple mode is now made for children: only the basic tools (with a word under each) – Select, Line, Shapes, Circles, Tiles, Paint – and big colors; on phones and tablets the colors are along the bottom too. Everything else is in Expert mode.':
    'Prosty tryb aplikacji wektorowej jest teraz dla dzieci: tylko podstawowe narzędzia (każde z podpisem) – Zaznacz, Linia, Kształty, Koła, Płytki, Maluj – i duże kolory; na telefonach i tabletach kolory są też na dole. Wszystko inne jest w trybie Ekspert.',
};
