const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '../public/images/projects/featured');
const outFile = path.join(__dirname, '../src/data/project-image-placeholders.js');

const files = fs.readdirSync(inputDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));

async function build() {
  const mapping = {};
  for (const file of files) {
    const infile = path.join(inputDir, file);
    try {
      const buf = await sharp(infile).resize(20).webp({ quality: 30 }).toBuffer();
      mapping[file] = `data:image/webp;base64,${buf.toString('base64')}`;
      console.log('Generated blur for', file);
    } catch (err) {
      console.error('Error processing', file, err);
    }
  }

  const content = `// Auto-generated file. Do not edit.
export const projectImagePlaceholders = ${JSON.stringify(mapping, null, 2)};
export default projectImagePlaceholders;
`;

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, content, 'utf8');
  console.log('Wrote', outFile);
}

build().catch(console.error);
