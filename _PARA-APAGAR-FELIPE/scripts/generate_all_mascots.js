import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPNG(width, height, colorHex, drawType) {
  const r = parseInt(colorHex.slice(1, 3), 16);
  const g = parseInt(colorHex.slice(3, 5), 16);
  const b = parseInt(colorHex.slice(5, 7), 16);

  const rowBytes = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowBytes);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowBytes;
    rawData[rowOffset] = 0;

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const dx = x - width / 2;
      const dy = y - height / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = width * 0.44;

      if (dist <= radius) {
        if (dist >= radius - 2.5) {
          rawData[pixelOffset] = r;
          rawData[pixelOffset + 1] = g;
          rawData[pixelOffset + 2] = b;
          rawData[pixelOffset + 3] = 255;
        } else {
          const innerDist = Math.sqrt(dx * dx + (dy + 2) * (dy + 2));
          if (innerDist < radius * 0.65) {
            rawData[pixelOffset] = Math.min(255, r + 24);
            rawData[pixelOffset + 1] = Math.min(255, g + 24);
            rawData[pixelOffset + 2] = Math.min(255, b + 24);
            rawData[pixelOffset + 3] = 255;
          } else {
            rawData[pixelOffset] = Math.max(10, r - 60);
            rawData[pixelOffset + 1] = Math.max(10, g - 60);
            rawData[pixelOffset + 2] = Math.max(10, b - 60);
            rawData[pixelOffset + 3] = 240;
          }
        }
      } else {
        rawData[pixelOffset] = 0;
        rawData[pixelOffset + 1] = 0;
        rawData[pixelOffset + 2] = 0;
        rawData[pixelOffset + 3] = 0;
      }
    }
  }

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  const ihdrChunk = makeChunk('IHDR', ihdr);

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const length = data.length;
  const chunk = Buffer.alloc(8 + length + 4);
  chunk.writeUInt32BE(length, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crc = crc32(chunk.subarray(4, 8 + length));
  chunk.writeUInt32BE(crc, 8 + length);
  return chunk;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (-(crc & 1) & 0xedb88320);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const targets = [
  path.resolve(process.cwd(), 'assets/mascots'),
  path.resolve(process.cwd(), 'public/assets/mascots'),
  path.resolve(process.cwd(), 'src/assets')
];

for (const dir of targets) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const mascotDefs = [
  { file: 'pelmeni-ru.png', color: '#EF4444', type: 'pelmeni' },
  { file: 'croissant-fr.png', color: '#38BDF8', type: 'croissant' },
  { file: 'pretzel-de.png', color: '#F59E0B', type: 'pretzel' },
  { file: 'tomate-es.png', color: '#E11D48', type: 'tomate' },
  { file: 'batata-en.png', color: '#10B981', type: 'batata' },
  { file: 'pastel-pt.png', color: '#EAB308', type: 'pastel' },
  { file: 'ima-fisica.png', color: '#06B6D4', type: 'ima' },
  { file: 'ampulheta-matematica.png', color: '#8B5CF6', type: 'ampulheta' },
];

for (const m of mascotDefs) {
  const png = createPNG(160, 160, m.color, m.type);
  for (const dir of targets) {
    fs.writeFileSync(path.join(dir, m.file), png);
  }
  console.log(`Generated ${m.file}`);
}

// Generate SVGs as well for vector sharpness
const svgs = {
  'pelmeni-ru.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="46" fill="#1C1518" stroke="#EF4444" stroke-width="3"/><path d="M22 56 C 20 36, 45 30, 50 30 C 55 30, 80 36, 78 56 C 75 75, 25 75, 22 56 Z" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="3"/><path d="M25 50 Q 31 44, 38 48 Q 44 43, 50 47 Q 56 43, 62 48 Q 69 44, 75 50" fill="none" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round"/><path d="M30 34 C 34 23, 66 23, 70 34 L 74 42 L 26 42 Z" fill="#991B1B" stroke="#EF4444" stroke-width="2"/><circle cx="50" cy="29" r="3.5" fill="#F59E0B"/><ellipse cx="43" cy="58" rx="2" ry="3.2" fill="#1E293B"/><ellipse cx="57" cy="58" rx="2" ry="3.2" fill="#1E293B"/><path d="M47 64 Q 50 67 53 64" stroke="#1E293B" stroke-width="1.8" stroke-linecap="round" fill="none"/><circle cx="39" cy="62" r="3" fill="#FDA4AF" opacity="0.7"/><circle cx="61" cy="62" r="3" fill="#FDA4AF" opacity="0.7"/></svg>`,
  'pretzel-de.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="46" fill="#1C1814" stroke="#F59E0B" stroke-width="3"/><path d="M30 40 C 22 25, 45 18, 50 32 C 55 18, 78 25, 70 40 C 65 52, 55 60, 50 68 C 45 60, 35 52, 30 40 Z" fill="#D97706" stroke="#FBBF24" stroke-width="3.5" stroke-linejoin="round"/><path d="M32 42 C 38 52, 45 56, 50 64 C 55 56, 62 52, 68 42" stroke="#92400E" stroke-width="3.5" stroke-linecap="round"/><circle cx="42" cy="36" r="2.5" fill="#FEF3C7"/><circle cx="58" cy="36" r="2.5" fill="#FEF3C7"/><circle cx="36" cy="46" r="2" fill="#FEF3C7"/><circle cx="64" cy="46" r="2" fill="#FEF3C7"/><ellipse cx="44" cy="38" rx="2" ry="3" fill="#1C1814"/><ellipse cx="56" cy="38" rx="2" ry="3" fill="#1C1814"/><path d="M47 43 Q 50 46 53 43" stroke="#1C1814" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>`,
  'croissant-fr.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="46" fill="#121824" stroke="#38BDF8" stroke-width="3"/><path d="M22 62 C 26 40, 42 32, 50 32 C 58 32, 74 40, 78 62 C 68 55, 58 52, 50 52 C 42 52, 32 55, 22 62 Z" fill="#F59E0B" stroke="#D97706" stroke-width="3"/><ellipse cx="50" cy="30" rx="19" ry="8" fill="#1E293B" stroke="#38BDF8" stroke-width="2"/><circle cx="50" cy="22" r="2.5" fill="#38BDF8"/><ellipse cx="44" cy="50" rx="2" ry="3" fill="#451A03"/><path d="M54 50 Q 57 48 60 50" stroke="#451A03" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M48 55 Q 51 58 54 55" stroke="#451A03" stroke-width="1.8" stroke-linecap="round" fill="none"/><path d="M43 65 L 57 65 L 53 72 L 47 72 Z" fill="#EF4444"/></svg>`,
  'tomate-es.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="46" fill="#1C1417" stroke="#F43F5E" stroke-width="3"/><ellipse cx="50" cy="55" rx="27" ry="24" fill="#E11D48" stroke="#BE123C" stroke-width="3"/><ellipse cx="38" cy="46" rx="5" ry="3" fill="#FB7185" transform="rotate(-25 38 46)"/><path d="M50 32 L 50 24" stroke="#15803D" stroke-width="4" stroke-linecap="round"/><ellipse cx="43" cy="52" rx="2.5" ry="3.5" fill="#1C1917"/><ellipse cx="57" cy="52" rx="2.5" ry="3.5" fill="#1C1917"/><path d="M42 61 Q 50 69 58 61" stroke="#1C1917" stroke-width="2.5" stroke-linecap="round" fill="none"/><circle cx="36" cy="57" r="3" fill="#FDA4AF" opacity="0.6"/><circle cx="64" cy="57" r="3" fill="#FDA4AF" opacity="0.6"/></svg>`,
  'batata-en.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="46" fill="#131C18" stroke="#10B981" stroke-width="3"/><ellipse cx="50" cy="57" rx="25" ry="21" fill="#D97706" stroke="#B45309" stroke-width="3"/><circle cx="41" cy="50" r="1.8" fill="#92400E"/><circle cx="61" cy="54" r="1.8" fill="#92400E"/><path d="M36 41 L 64 41 L 62 26 L 38 26 Z" fill="#1E293B" stroke="#10B981" stroke-width="2"/><rect x="30" y="39" width="40" height="4" rx="2" fill="#1E293B" stroke="#10B981" stroke-width="2"/><ellipse cx="44" cy="52" rx="2" ry="3" fill="#1C1917"/><ellipse cx="56" cy="52" rx="2" ry="3" fill="#1C1917"/><path d="M45 61 Q 50 59 55 61" stroke="#92400E" stroke-width="2" stroke-linecap="round" fill="none"/></svg>`,
  'pastel-pt.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="46" fill="#1E1B13" stroke="#EAB308" stroke-width="3"/><path d="M26 62 C 24 45, 40 38, 50 38 C 60 38, 76 45, 74 62 C 72 74, 28 74, 26 62 Z" fill="#FBBF24" stroke="#D97706" stroke-width="3"/><ellipse cx="50" cy="46" rx="16" ry="7" fill="#78350F" opacity="0.45"/><circle cx="46" cy="45" r="2.5" fill="#451A03"/><circle cx="54" cy="46" r="2" fill="#451A03"/><ellipse cx="43" cy="58" rx="2" ry="3" fill="#1F2937"/><ellipse cx="57" cy="58" rx="2" ry="3" fill="#1F2937"/><path d="M47 64 Q 50 67 53 64" stroke="#1F2937" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="38" cy="62" r="3" fill="#FCA5A5" opacity="0.6"/><circle cx="62" cy="62" r="3" fill="#FCA5A5" opacity="0.6"/></svg>`,
  'ima-fisica.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="46" fill="#131B22" stroke="#06B6D4" stroke-width="3"/><path d="M32 66 L 32 46 C 32 32, 68 32, 68 46 L 68 66" stroke="#E11D48" stroke-width="12" stroke-linecap="round" fill="none"/><path d="M68 54 L 68 66" stroke="#2563EB" stroke-width="12" stroke-linecap="round" fill="none"/><rect x="26" y="64" width="12" height="4" rx="1" fill="#F8FAFC"/><rect x="62" y="64" width="12" height="4" rx="1" fill="#F8FAFC"/><ellipse cx="46" cy="40" rx="1.8" ry="2.8" fill="#F8FAFC"/><ellipse cx="54" cy="40" rx="1.8" ry="2.8" fill="#F8FAFC"/><path d="M48 44 Q 50 46 52 44" stroke="#F8FAFC" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
  'ampulheta-matematica.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="46" fill="#181424" stroke="#8B5CF6" stroke-width="3"/><rect x="32" y="24" width="36" height="6" rx="2" fill="#475569" stroke="#8B5CF6" stroke-width="2"/><rect x="32" y="70" width="36" height="6" rx="2" fill="#475569" stroke="#8B5CF6" stroke-width="2"/><path d="M36 30 C 36 44, 46 48, 50 50 C 54 48, 64 44, 64 30 Z" fill="#8B5CF6" fill-opacity="0.2" stroke="#A78BFA" stroke-width="2.5"/><path d="M36 70 C 36 56, 46 52, 50 50 C 54 52, 64 56, 64 70 Z" fill="#8B5CF6" fill-opacity="0.2" stroke="#A78BFA" stroke-width="2.5"/><path d="M40 33 C 43 38, 57 38, 60 33 L 53 47 L 47 47 Z" fill="#F59E0B"/><line x1="50" y1="48" x2="50" y2="58" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 3"/><path d="M42 68 C 45 62, 55 62, 58 68 Z" fill="#F59E0B"/><circle cx="50" cy="50" r="3" fill="#FBBF24"/></svg>`
};

for (const [filename, content] of Object.entries(svgs)) {
  for (const dir of targets) {
    fs.writeFileSync(path.join(dir, filename), content, 'utf8');
  }
}
console.log('All mascots generated in PNG and SVG!');
