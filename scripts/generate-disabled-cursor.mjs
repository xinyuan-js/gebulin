import fs from "node:fs/promises";
import zlib from "node:zlib";
import { promisify } from "node:util";

const deflate = promisify(zlib.deflate);
const width = 32;
const height = 32;
const rgba = Buffer.alloc(width * height * 4, 0);
const colors = {
  K: [7, 7, 7, 255],
  W: [242, 231, 201, 255],
  R: [122, 31, 31, 255],
  B: [48, 18, 18, 255],
  L: [246, 211, 113, 255]
};

function put(x, y, c) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const i = (y * width + x) * 4;
  const v = colors[c];
  rgba[i] = v[0];
  rgba[i + 1] = v[1];
  rgba[i + 2] = v[2];
  rgba[i + 3] = v[3];
}

function rect(x, y, w, h, c) {
  for (let yy = y; yy < y + h; yy += 1) {
    for (let xx = x; xx < x + w; xx += 1) put(xx, yy, c);
  }
}

function pix(x, y, c) {
  rect(x * 2, y * 2, 2, 2, c);
}

const arrow = [
  "K...............",
  "KW..............",
  "KWW.............",
  "KWWW............",
  "KWWWW...........",
  "KWWWWW..........",
  "KWWWWWW.........",
  "KWWWWWWW........",
  "KWWWWKK.........",
  "KWWKWWK.........",
  "KWK.KWWK........",
  "KK..KWWK........",
  "K....KWWK.......",
  ".....KWWK.......",
  "......KK........",
  "................"
];

for (let y = 0; y < arrow.length; y += 1) {
  for (let x = 0; x < arrow[y].length; x += 1) {
    const c = arrow[y][x];
    if (c !== ".") pix(x, y, c);
  }
}

const badge = [
  "..KKKK..",
  ".KRRRRK.",
  "KRRWWRRK",
  "KRWBBWRK",
  "KRWBWWRK",
  "KRRWWRRK",
  ".KRRRRK.",
  "..KKKK.."
];

for (let y = 0; y < badge.length; y += 1) {
  for (let x = 0; x < badge[y].length; x += 1) {
    const c = badge[y][x];
    if (c !== ".") pix(x + 8, y + 8, c);
  }
}

function crc32(buf) {
  let crc = ~0;
  for (const b of buf) {
    crc ^= b;
    for (let k = 0; k < 8; k += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return ~crc >>> 0;
}

function chunk(type, data = Buffer.alloc(0)) {
  const t = Buffer.from(type);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
}

const raw = Buffer.alloc((width * 4 + 1) * height);
for (let y = 0; y < height; y += 1) {
  raw[y * (width * 4 + 1)] = 0;
  rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(width, 0);
ihdr.writeUInt32BE(height, 4);
ihdr[8] = 8;
ihdr[9] = 6;
ihdr[10] = 0;
ihdr[11] = 0;
ihdr[12] = 0;

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr),
  chunk("IDAT", await deflate(raw)),
  chunk("IEND")
]);

await fs.mkdir("apps/web/public/cursors", { recursive: true });
await fs.writeFile("apps/web/public/cursors/disabled.png", png);
console.log(`wrote apps/web/public/cursors/disabled.png (${png.length} bytes)`);
