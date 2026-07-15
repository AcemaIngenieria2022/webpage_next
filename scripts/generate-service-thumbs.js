const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '../public/images/services');
const outFile = path.join(__dirname, '../src/data/project-thumbs.json');

function relPublic(p) {
  return '/' + path.relative(path.join(__dirname, '..', 'public'), p).replace(/\\/g, '/');
}

async function processImage(fullPath, map) {
  try {
    const dir = path.dirname(fullPath);
    const ext = path.extname(fullPath);
    const base = path.basename(fullPath, ext);
    const thumbsDir = path.join(dir, 'thumbs');
    if (!fs.existsSync(thumbsDir)) fs.mkdirSync(thumbsDir, { recursive: true });
    const out = path.join(thumbsDir, `${base}-800.webp`);
    await sharp(fullPath).resize({ width: 800 }).webp({ quality: 75 }).toFile(out);
    map[relPublic(fullPath)] = relPublic(out);
    console.log('Service thumb created', out);
  } catch (e) {
    console.error('Error processing', fullPath, e.message);
  }
}

async function walk(dir, map) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      // skip thumbs directories to avoid re-processing outputs
      if (ent.name.toLowerCase() === 'thumbs') continue;
      await walk(full, map);
    } else if (/\.(jpe?g|png|webp)$/i.test(ent.name)) {
      await processImage(full, map);
    }
  }
}

async function main() {
  const map = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};
  await walk(srcDir, map);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(map, null, 2), 'utf8');
  console.log('Updated mapping', outFile);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
