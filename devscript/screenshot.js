import puppeteer from 'puppeteer';

(async () => {
    // Creating a browser instance
    const browser = await puppeteer.launch({ headless: true });

    // Creating a new page
    const page = await browser.newPage();

    // Adjusting width and height of the viewport
    await page.setViewport({ width: 1200, height: 600 });

    const url = 'http://127.0.0.1:8080/';

    // Open URL in current page
    await page.goto(url);

    // Capture screenshot
    await page.screenshot({
        path: './assets/img/screenshot.png',
    });

    // Close the browser instance
    await browser.close();
})();
