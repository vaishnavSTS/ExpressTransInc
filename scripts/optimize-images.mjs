// Converts the licensed source photos in assets-src/ into responsive WebP
// variants (plus a JPEG social-sharing image) under public/images/.
// Run with: npm run images
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'assets-src');
const outDir = path.join(root, 'public', 'images');

/** name -> widths to generate. Must stay in sync with src/data/images.ts. */
const jobs = {
  'hero-highway': [640, 1280, 1920],
  'intermodal-container': [640, 1024, 1600],
  'open-road-truck': [640, 1024, 1600],
  'night-highway': [640, 1280, 1920],
};

await mkdir(outDir, { recursive: true });

for (const [name, widths] of Object.entries(jobs)) {
  const input = path.join(srcDir, `${name}.jpg`);
  for (const width of widths) {
    const output = path.join(outDir, `${name}-${width}.webp`);
    const info = await sharp(input).resize({ width }).webp({ quality: 72 }).toFile(output);
    console.log(`${path.relative(root, output)}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
  }
}

// Open Graph / social preview image (1200x630, JPEG for broad compatibility).
const og = path.join(outDir, 'og-image.jpg');
const ogInfo = await sharp(path.join(srcDir, 'hero-highway.jpg'))
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' })
  .jpeg({ quality: 78, mozjpeg: true })
  .toFile(og);
console.log(`${path.relative(root, og)}  ${ogInfo.width}x${ogInfo.height}  ${Math.round(ogInfo.size / 1024)} KB`);
