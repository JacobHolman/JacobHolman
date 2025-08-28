import nodeHtmlToImage from 'node-html-to-image';
import fs from 'fs';
import sharp from 'sharp';

const htmlFile = process.argv[2];
if (!htmlFile) {
  console.error('Usage: node html-to-cropped-png.js <html-file>');
  process.exit(1);
}

const html = fs.readFileSync(htmlFile, 'utf8');
const finalPng = './latest.png';

async function htmlToCroppedImage() {
  const buffer = await nodeHtmlToImage({
    html: html,
    transparent: true,
    puppeteerArgs: {
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    },
    encoding: 'buffer'
  });

  await sharp(buffer)
    .trim()
    .png()
    .toFile(finalPng);

  console.log('Cropped image saved to', finalPng);
}

htmlToCroppedImage().catch(console.error);
