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
    const filePath = `file://${path.resolve(htmlFile)}?t=${Date.now()}`; // prevent caching
    const tempPath = path.join(process.cwd(), 'temp.png');
    const finalPath = path.join(process.cwd(), 'latest.png');

    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser',
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });

    // Set light green background before rendering
    await page.evaluateOnNewDocument(() => {
      document.body.style.background = '#a6f3a6'; // light green
    });

    await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 0 });

    const profileCard = await page.$('.profile-card');
    if (!profileCard) throw new Error('Profile card element not found');

    // Get bounding box and round coordinates
    const box = await profileCard.boundingBox();
    if (!box) throw new Error('Cannot get profile card size');

    // Screenshot only the profile card
    await profileCard.screenshot({
      path: tempPath,
      clip: {
        x: Math.floor(box.x),
        y: Math.floor(box.y),
        width: Math.ceil(box.width),
        height: Math.ceil(box.height)
      },
      omitBackground: false
    });

    await browser.close();

    // Trim the green background automatically
    await sharp(tempPath)
      .trim() // removes solid border color
      .png()
      .toFile(finalPath);

    fs.unlinkSync(tempPath);

    console.log('Screenshot saved to', finalPath);

  } catch (err) {
    console.error(err);
  }
}

generateScreenshot();
