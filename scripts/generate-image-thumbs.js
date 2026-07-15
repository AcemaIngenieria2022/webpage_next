const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '../public/images/projects/featured');
const outputDir = path.join(inputDir, 'thumbs');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(inputDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));

Promise.all(
  files.map(file => {
    const infile = path.join(inputDir, file);
    const ext = path.extname(file);
    const name = path.basename(file, ext);
    const outfile = path.join(outputDir, `${name}-800.webp`);

    return sharp(infile)
      .resize({ width: 1200 })
      .webp({ quality: 75 })
      .toFile(outfile)
      .then(() => console.log('Created', outfile))
      .catch(err => console.error('Error processing', infile, err));
  })
)
  .then(() => console.log('All thumbnails generated'))
  .catch(err => console.error(err));
