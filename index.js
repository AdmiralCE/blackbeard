const puppeteer = require('puppeteer');

async function getPage() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://www.ada.org/en/ccepr/find-ce-courses#sort=relevancy', {waitUntil: 'networkidle2'});
    // await page.screenshot({ path: 'screenshots/ada.png', fullPage: true })
    let listings = await getNumPages(page);
    browser.close();
}

async function getNumPages(page) {

    const LISTINGS_SELECTOR = '#search > div.coveo-results-section > div:nth-child(4) > div.coveo-results-header > div.coveo-summary-section > span.CoveoQuerySummary > span > span:nth-child(3)';

    const inner = await page.$eval(LISTINGS_SELECTOR, el => {
        let html = el.textContent
        return html.replace(',','').trim();
    });

    const numListings = parseInt(inner);
    // the ADA site allows 10 results per page, so
    const numPages = Math.ceil(numListings / 10); 
    console.log("ADA had "+ numListings + " listings over " + numPages + " pages.")
    return numPages;
}

getPage();
