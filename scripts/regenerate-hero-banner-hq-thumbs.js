const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const roots = [
  path.join(__dirname, '../public/images/hero'),
  path.join(__dirname, '../public/images/services/banner')
];
const outFile = path.join(__dirname, '../src/data/project-thumbs.json');

function relPublic(p) {
  return '/' + path.relative(path.join(__dirname, '..', 'public'), p).replace(/\\/g, '/');
}

async function processDir(dir, map) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name.toLowerCase() === 'thumbs') continue;
      await processDir(full, map);
    } else if (/\.(jpe?g|png|webp)$/i.test(ent.name)) {
      try {
        const dirp = path.dirname(full);
        const ext = path.extname(full);
        const base = path.basename(full, ext);
        const thumbsDir = path.join(dirp, 'thumbs');
        fs.mkdirSync(thumbsDir, { recursive: true });
        const out = path.join(thumbsDir, `${base}-800.webp`);
        // keep large width to preserve detail on hero/banner
        await sharp(full).resize({ width: 1600 }).webp({ quality: 90 }).toFile(out);
        map[relPublic(full)] = relPublic(out);
        console.log('HQ thumb created', out, Math.round(fs.statSync(out).size/1024)+'KB');
      } catch (e) {
        console.error('Error creating HQ thumb', full, e.message);
      }
    }
  }
}

async function main() {
  const map = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};
  for (const r of roots) await processDir(r, map);
  fs.writeFileSync(outFile, JSON.stringify(map, null, 2), 'utf8');
  console.log('Updated mapping', outFile);
}

main().catch(err => { console.error(err); process.exit(1); });
