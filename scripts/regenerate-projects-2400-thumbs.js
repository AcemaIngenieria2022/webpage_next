const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '../public/images/projects');
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
        const meta = await sharp(full).metadata();
        if ((meta.width || 0) > 2000) {
          const dirp = path.dirname(full);
          const ext = path.extname(full);
          const base = path.basename(full, ext);
          const thumbsDir = path.join(dirp, 'thumbs');
          fs.mkdirSync(thumbsDir, { recursive: true });
          const out = path.join(thumbsDir, `${base}-2400.webp`);
          await sharp(full).resize({ width: 2400 }).webp({ quality: 90 }).toFile(out);
          map[relPublic(full)] = relPublic(out);
          console.log('HQ2400 created', out, Math.round(fs.statSync(out).size/1024)+'KB');
        }
      } catch (e) {
        console.error('err', full, e.message);
      }
    }
  }
}

async function main() {
  const map = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};
  await processDir(root, map);
  fs.writeFileSync(outFile, JSON.stringify(map, null, 2), 'utf8');
  console.log('Updated mapping', outFile);
}

main().catch(err=>{console.error(err);process.exit(1)});
