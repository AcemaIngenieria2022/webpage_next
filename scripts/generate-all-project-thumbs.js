const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '../public/images/projects');
const outMap = {};
const tasks = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name.toLowerCase() === 'thumbs' || full.split(path.sep).some((seg) => seg.toLowerCase() === 'thumbs')) continue;
      walk(full);
    } else if (/\.(jpe?g|png|webp)$/i.test(ent.name)) {
      if (full.split(path.sep).some((seg) => seg.toLowerCase() === 'thumbs')) continue;
      tasks.push(processImage(full));
    }
  }
}

function relPublic(p) {
  return '/' + path.relative(path.join(__dirname, '..', 'public'), p).replace(/\\/g, '/');
}

async function processImage(fullPath) {
  try {
    const dir = path.dirname(fullPath);
    const ext = path.extname(fullPath);
    const base = path.basename(fullPath, ext);
    const thumbsDir = path.join(dir, 'thumbs');
    if (!fs.existsSync(thumbsDir)) fs.mkdirSync(thumbsDir);
    const out = path.join(thumbsDir, `${base}-480.webp`);
    await sharp(fullPath).resize({ width: 480 }).webp({ quality: 68 }).toFile(out);
    outMap[relPublic(fullPath)] = relPublic(out);
    console.log('Thumb created', out);
  } catch (e) {
    console.error('Error processing', fullPath, e.message);
  }
}

async function main() {
  walk(root);
  await Promise.all(tasks);
  const outFile = path.join(__dirname, '../src/data/project-thumbs.json');
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(outMap, null, 2), 'utf8');
  console.log('Wrote mapping to', outFile);
}

main().catch(console.error);
