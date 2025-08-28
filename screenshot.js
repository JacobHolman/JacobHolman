import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const htmlFile = process.argv[2];
if (!htmlFile) {
  console.error('Usage: node screenshot.js <html-file>');
  process.exit(1);
}

async function generateScreenshot() {
  try {
    const filePath = `file://${path.resolve(htmlFile)}`;
    const tempPath = path.join(process.cwd(), 'temp.png');
    const finalPath = path.join(process.cwd(), 'latest.png');

    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser',
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.evaluateOnNewDocument(() => {
      document.body.style.background = 'transparent';
    });

    await page.goto(filePath, { waitUntil: 'networkidle0' });

    const profileCard = await page.$('.profile-card');
    if (!profileCard) throw new Error('Profile card element not found');

    await profileCard.screenshot({
      path: tempPath,
      omitBackground: true
    });

    await browser.close();
    const img = sharp(tempPath).ensureAlpha();
    const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (r === 0 && g === 0 && b === 0) {
        data[i + 3] = 0;
      }
    }

    await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .png()
      .toFile(finalPath);

    fs.unlinkSync(tempPath);

    console.log('Screenshot saved to', finalPath);

  } catch (err) {
    console.error(err.message);
  }
}

generateScreenshot();
