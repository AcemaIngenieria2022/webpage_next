const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '../public/images/hero');
const outFile = path.join(__dirname, '../src/data/project-thumbs.json');

function relPublic(p) {
  return '/' + path.relative(path.join(__dirname, '..', 'public'), p).replace(/\\/g, '/');
}

async function main() {
  if (!fs.existsSync(srcDir)) {
    console.log('No hero images directory:', srcDir);
    return;
  }
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  const map = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};

  for (const ent of entries) {
    if (ent.isFile() && /\.(jpe?g|png|webp)$/i.test(ent.name)) {
      const full = path.join(srcDir, ent.name);
      const ext = path.extname(ent.name);
      const base = path.basename(ent.name, ext);
      const thumbsDir = path.join(srcDir, 'thumbs');
      if (!fs.existsSync(thumbsDir)) fs.mkdirSync(thumbsDir);
      const out = path.join(thumbsDir, `${base}-800.webp`);
      try {
        await sharp(full).resize({ width: 800 }).webp({ quality: 75 }).toFile(out);
        map[relPublic(full)] = relPublic(out);
        console.log('Hero thumb created', out);
      } catch (e) {
        console.error('Error creating hero thumb', full, e.message);
      }
    }
  }

  fs.writeFileSync(outFile, JSON.stringify(map, null, 2), 'utf8');
  console.log('Updated mapping', outFile);
}

main().catch(console.error);
