import nodeHtmlToImage from 'node-html-to-image';
import fs from 'fs';
import sharp from 'sharp';

const htmlFile = process.argv[2];
if (!htmlFile) {
  console.error('Usage: node html-to-cropped-png.js <html-file>');
  process.exit(1);
}

const html = fs.readFileSync(htmlFile, 'utf8');
const tempPng = './latest-raw.png';
const finalPng = './latest.png';

async function htmlToCroppedImage() {
  await nodeHtmlToImage({
    output: tempPng,
    html: html,
    transparent: true
  });

  await sharp(tempPng)
    .trim()
    .png()
    .toFile(finalPng);

  fs.unlinkSync(tempPng);

  console.log('Cropped image saved to', finalPng);
}

htmlToCroppedImage().catch(console.error);
