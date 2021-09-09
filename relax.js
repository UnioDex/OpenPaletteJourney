let paletteId;
let palette;
let isTherePalette;
let arr = window.location.search.substring(1).split("=");
if (arr[0] == "palette") {
  paletteId = arr[1];
  palette = GetPalette(paletteId);
  isTherePalette = true;
} else {
  paletteId = 10;
  palette = GetPalette(paletteId);
  isTherePalette = false;
}
