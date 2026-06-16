const sharp = require('sharp');
const path = require('path');
const orig = path.join(__dirname, '../public/images/projects/bannerproject/sanpelayo.webp');
const thumb = path.join(__dirname, '../public/images/projects/bannerproject/thumbs/sanpelayo-800.webp');

async function run(){
  try{
    const o = await sharp(orig).metadata();
    const t = await sharp(thumb).metadata();
    console.log('orig', {sizeKB: Math.round(require('fs').statSync(orig).size/1024), width: o.width, height: o.height, format: o.format});
    console.log('thumb', {sizeKB: Math.round(require('fs').statSync(thumb).size/1024), width: t.width, height: t.height, format: t.format});
  }catch(e){console.error(e.message);process.exit(1)}
}
run();
