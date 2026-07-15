const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'public', 'images', 'projects', 'carousel', 'inti');
const thumbsDir = path.join(sourceDir, 'thumbs');

fs.mkdirSync(thumbsDir, { recursive: true });

(async () => {
  const files = fs.readdirSync(sourceDir)
    .filter((file) => file.endsWith('.webp') && !file.includes('-800.webp') && !file.includes('-2400.webp'))
    .sort();

  for (const file of files) {
    const inputPath = path.join(sourceDir, file);
    const name = path.parse(file).name;
    const outputPath = path.join(thumbsDir, `${name}-800.webp`);

    await sharp(inputPath)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 70 })
      .toFile(outputPath);

    console.log(`Generada ${path.relative(rootDir, outputPath)}`);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
