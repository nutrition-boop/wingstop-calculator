import puppeteer from 'puppeteer-core';
import * as fs from 'fs';

const CHROME_PATHS = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
];

async function run() {
    let chromePath = CHROME_PATHS.find(p => fs.existsSync(p));
    if (!chromePath) process.exit(1);

    const browser = await puppeteer.launch({
        executablePath: chromePath,
        headless: "new", 
        defaultViewport: { width: 1280, height: 800 }
    });

    const page = await browser.newPage();
    const query = encodeURIComponent(`Wingstop 459 gonzales la 70737`);
    const url = `https://www.google.com/maps/search/${query}`;
    console.log("Testing URL:", url);
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    await new Promise(r => setTimeout(r, 5000));
    
    // Dump img src
    const images = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img')).map(img => img.src).filter(src => src.startsWith('https://'));
    });
    console.log("All Image SRCs (sample):", images.slice(0, 15));

    const texts = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('div, span, p')).map(e => ({ class: e.className, text: e.textContent })).filter(e => e.text && e.text.length > 50 && e.class);
    });
    fs.writeFileSync('dom-dump.json', JSON.stringify({ images, texts }, null, 2));
    
    await browser.close();
}

run();
