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

    // Disable caching
    await page.setCacheEnabled(false);

    // High resolution for retina-quality screenshots
    await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 2 });

    // Set light green background before rendering
    await page.evaluateOnNewDocument(() => {
      document.body.style.background = '#a6f3a6'; // light green
    });

    await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 0 });

    const profileCard = await page.$('.profile-card');
    if (!profileCard) throw new Error('Profile card element not found');

    // Get bounding box for exact sizing
    const box = await profileCard.boundingBox();
    if (!box) throw new Error('Cannot get profile card size');

    // Capture screenshot with exact size
    await profileCard.screenshot({
      path: tempPath,
      clip: {
        x: box.x,
        y: box.y,
        width: Math.ceil(box.width),
        height: Math.ceil(box.height)
      },
      omitBackground: false
    });

    await browser.close();

    // Apply rounded corners and save final image
    const radius = 24; // adjust roundness
    const img = sharp(tempPath);
    const metadata = await img.metadata();

    const roundedCorners = Buffer.from(
      `<svg><rect x="0" y="0" width="${metadata.width}" height="${metadata.height}" rx="${radius}" ry="${radius}"/></svg>`
    );

    await img
      .composite([{ input: roundedCorners, blend: 'dest-in' }])
      .png()
      .toFile(finalPath);

    fs.unlinkSync(tempPath);

    console.log('Screenshot saved to', finalPath);

  } catch (err) {
    console.error(err);
  }
}

generateScreenshot();
