const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcRoot = path.join(__dirname, '../public/images/services');
const outFile = path.join(__dirname, '../src/data/project-thumbs.json');
const SIZE_THRESHOLD = 300 * 1024; // 300 KB

function relPublic(p) {
  return '/' + path.relative(path.join(__dirname, '..', 'public'), p).replace(/\\/g, '/');
}

async function walk(dir, map) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name.toLowerCase() === 'thumbs') continue;
      await walk(full, map);
    } else if (/\.(jpe?g|png|webp)$/i.test(ent.name)) {
      const stat = fs.statSync(full);
      if (stat.size > SIZE_THRESHOLD) {
        const dirp = path.dirname(full);
        const ext = path.extname(full);
        const base = path.basename(full, ext);
        const thumbsDir = path.join(dirp, 'thumbs');
        fs.mkdirSync(thumbsDir, { recursive: true });
        const out = path.join(thumbsDir, `${base}-800.webp`);
        try {
          // Larger width + higher quality for big originals
          await sharp(full).resize({ width: 1600 }).webp({ quality: 90 }).toFile(out);
          map[relPublic(full)] = relPublic(out);
          console.log('HQ thumb created', out, Math.round(fs.statSync(out).size/1024)+'KB');
        } catch (e) {
          console.error('Error creating HQ thumb', full, e.message);
        }
      }
    }
  }
}

async function main() {
  const map = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};
  await walk(srcRoot, map);
  fs.writeFileSync(outFile, JSON.stringify(map, null, 2), 'utf8');
  console.log('Updated mapping', outFile);
}

main().catch(err => { console.error(err); process.exit(1); });
