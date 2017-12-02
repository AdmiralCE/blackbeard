const puppeteer = require('puppeteer');

async function getPage() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://www.ada.org/en/ccepr/find-ce-courses#sort=relevancy');
    // await page.screenshot({ path: 'screenshots/ada.png', fullPage: true })
    let listings = await getNumPages(page);
    browser.close();
}

async function getNumPages(page) {

    const test_select = '#form1 > header > div > div > div > a > img';
    const LISTINGS_SELECTOR = '#search > div.coveo-results-section > div:nth-child(4) > div.coveo-results-header > div.coveo-summary-section > span.CoveoQuerySummary > span > span:nth-child(3)';

    const testStuff = await page.$eval(LISTINGS_SELECTOR, el => el.innerText());

    // const theText = await testStuff.getProperty
    console.log(testStuff)
    // const html = await page.evaluate(stuff => stuff.innerHTML, testStuff);
    // console.log(html);

    // await testStuff.dispose();
    // let bacon = page.$(test_select);
    // console.log(bacon);
    // const inner = await page.evaluate(sel => {
    //     const html = page.$(sel);

    //     return HTML;
    // }, LISTINGS_SELECTOR);

    // console.log(numListings);
//   console.log('numUsers: ', numUsers);

//   /*
//   * GitHub shows 10 resuls per page, so
//   */
//   let numPages = Math.ceil(numUsers / 10);
//   return numPages;
}

getPage();
