/**
 * Convierte las fotos de "Proyectos en desarrollo" (JPG grandes) a WEBP optimizado
 * y genera las miniaturas 480 / 800 / 2400 que usa la web.
 *
 * Uso: node scripts/update-developing-projects-images.js "<carpeta con los JPG>"
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const sourceDir = process.argv[2];
if (!sourceDir || !fs.existsSync(sourceDir)) {
  console.error('Indica la carpeta con las fotos. Ej: node scripts/update-developing-projects-images.js "C:/Users/.../Proyectos en desarrollo - Web"');
  process.exit(1);
}

// archivo original -> nombre base en /public/images/projects/developing
const MAP = {
  'Puerto Libertador.JPG': 'libertador',
  'Lorica I - IV.JPG': 'lorica',
  'Cementera.JPG': 'cementera',
  'Tierra Alta l.JPG': 'tierraalta1',
  'Tierralta II.JPG': 'tierraalta2',
  'Tierra Alta III.JPG': 'tierraalta3',
  'Laureles I -VIII.JPG': 'laureles',
  'El Viento.JPG': 'elviento',
  'Primavera.JPG': 'primavera',
  'Puerto del Sol.JPG': 'puertodelsol',
};

const outDir = path.join(__dirname, '..', 'public', 'images', 'projects', 'developing');
const thumbsDir = path.join(outDir, 'thumbs');

(async () => {
  fs.mkdirSync(thumbsDir, { recursive: true });
  for (const [file, base] of Object.entries(MAP)) {
    const input = path.join(sourceDir, file);
    if (!fs.existsSync(input)) {
      console.warn(`No se encontró ${file}, se omite.`);
      continue;
    }
    const img = () => sharp(input).rotate(); // respeta la orientación EXIF
    await img().resize({ width: 2400, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(outDir, `${base}.webp`));
    for (const width of [480, 800, 2400]) {
      await img().resize({ width, withoutEnlargement: true }).webp({ quality: width === 480 ? 75 : 80 }).toFile(path.join(thumbsDir, `${base}-${width}.webp`));
    }
    console.log(`✓ ${file} -> ${base}.webp`);
  }
})();
