/**
 * Motus: Synthwave
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;

let sunColor1;
let sunColor2;
let groundColor;
let lineColor;
let backgroundColor;

let canvasBg;
let canvasYlines;
let canvasSun;
let canvasMountain;
let cx;
let cy;
let movement = 0;
const horizon = 640;
let mountainY = 440;

// Setup
function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  lineColor = color(palette[0]);
  backgroundColor = color(palette[1]);
  sunColor1 = color(palette[2]);
  sunColor2 = color(palette[3]);
  groundColor = color(palette[4]);

  cx = width / 2;
  cy = height / 2;

  // Draw background gradient
  canvasBg = drawBackground();

  // Draw vertical lines
  canvasYlines = drawYlines();

  // Draw sun
  canvasSun = drawSun();

  // Draw Mountain
  canvasMountain = drawMountain();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cx = width / 2;
  cy = height / 2;
}

// Draw tick
function draw() {
  image(canvasBg, 0, 0);
  image(canvasSun, width / 2 - canvasSun.width / 2, 60);
  image(canvasMountain, cx - canvasMountain.width / 2, mountainY);

  noStroke();
  fill(groundColor);
  rect(0, horizon, width, height);
  image(canvasYlines, 0, 0);

  for (let i = 0; i < 20; i++) {
    stroke(lineColor);
    const yOffset = easeInExpo(i + movement, 0, horizon, 20) + horizon;
    line(0, yOffset, width, yOffset);
  }

  // Speed around 98bpm
  movement += 0.0275;
  if (movement >= 1) {
    movement = 0;
  }

  mountainY -= 0.03;
  if (mountainY <= 333) {
    mountainY = 440;
  }

  fill(0);
  text('Palette #' + paletteId, 10, 10, 70, 80);
  fill(0);
  text('Made with ♥ by Yeet', windowWidth - 120, 10, 120, 80);
  if (!isTherePalette) {
    fill(0);
    text('Enter your palette id to the URL.', 10, 30, 120, 80);
  }
}

function easeInExpo(t, b, c, d) {
  return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
}

function drawBackground() {
  const sky = createGraphics(width, height);
  sky.background(backgroundColor);

  // Draw gradient sky
  sky.noFill();
  for (let i = 0; i <= horizon; i++) {
    const inter = map(i, 0, horizon, 0, 1);
    const c = lerpColor(lineColor, groundColor, inter);
    sky.stroke(c);
    sky.line(0, i, width, i);
  }
  return sky;
}

// Draw vertical lines
function drawYlines() {
  // Horizon
  const yLines = createGraphics(width, height);
  // Vertical lines
  yLines.stroke(lineColor);
  yLines.line(0, horizon, width, horizon);
  yLines.line(cx, horizon, cx, height);
  for (let i = 1; i < 18; i++) {
    const xOffset = i * 30;
    yLines.line(cx + xOffset, horizon, cx + xOffset * 10, height);
    yLines.line(cx - xOffset, horizon, cx - xOffset * 10, height);
  }
  return yLines;
}

// Draw gradient sun
function drawSun() {
  const sun = createGraphics(500, 500);
  sun.noFill();

  for (let i = 0; i <= sun.height; i++) {
    // Draw or skip?
    if (
      (i > 250 && i < 255) ||
      (i > 292 && i < 300) ||
      (i > 332 && i < 342) ||
      (i > 373 && i < 387) ||
      (i > 412 && i < 430) ||
      (i > 452 && i < 475)
    ) {
      continue;
    } else {
      // Calc colour
      const inter = map(i, 0, sun.height, 0, 0.5);
      const c = lerpColor(sunColor1, sunColor2, inter);
      sun.stroke(c);

      // Calc circle
      const s = i * 2;
      const r = sun.width;
      const lineWidth = Math.sqrt(2 * s * r - Math.pow(s, 2));
      const offset = sun.width / 2 - lineWidth / 2;
      sun.line(offset, i, lineWidth + offset, i);
    }
  }
  return sun;
}

// Draw Mountain
function drawMountain() {
  const mountain = createGraphics(610, 310);

  // Draw shapes.
  for (let i = 0; i < mountainJSON.length; i++) {
    const s = mountainJSON[i];

    mountain.stroke(color(s.strokeColour));
    mountain.strokeWeight(s.strokeWeight);
    if (s.fill) {
      mountain.fill(color(s.fill));
    } else {
      mountain.noFill();
    }
    mountain.beginShape(shapeTypeValue(s.type));

    for (let p = 0; p < s.points.length; p++) {
      mountain.vertex(s.points[p].x, s.points[p].y);
    }
    mountain.endShape();
  }
  return mountain;
}

// Converts JSON shape naming into P5 constants
function shapeTypeValue(type) {
  const shapeTypes = {
    POINTS: POINTS,
    LINES: LINES,
    TRIANGLES: TRIANGLES,
    TRIANGLE_STRIP: TRIANGLE_STRIP,
    TRIANGLE_FAN: TRIANGLE_FAN,
    QUADS: QUADS,
    QUAD_STRI: QUAD_STRIP,
    "": "",
  };
  return shapeTypes[type];
}
