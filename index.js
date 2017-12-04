const puppeteer = require('puppeteer');

async function getPage() {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto('http://www.ada.org/en/ccepr/find-ce-courses#sort=relevancy', {waitUntil: 'networkidle2'});
    // await page.screenshot({ path: 'screenshots/ada.png', fullPage: true })
    await page.setViewport({
        width: 1080,
        height: 1920
    });
    let listings = await getNumPages(page);

    await getCourses(page);
    await page.waitForNavigation();

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

async function grabCourseInfo(modal) {
    // are there always 16 rows?
    const courseData = {};
    // possible to use .map with specific number of iterations? ... for loop for now.
    const rowsInCourseInfo = 16;
    await modal.waitForSelector('td > a');
    for (let i = 1; i <= rowsInCourseInfo; i++) {
        let keySelector = `body > span > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`;
        let valueSelector = `body > span > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`;
        let key = await modal.$(keySelector)
            .then( data => data.getProperty('innerText'))
            .then( el => el.jsonValue());
        let value = await modal.$(valueSelector)
            .then( data => data.getProperty('innerText'))
            .then( el => el.jsonValue());

        courseData[key] = value;
    }
    return courseData;
}

async function getCourses (page) {
    try {
        await page.waitForSelector( '#search > div.coveo-results-section > div:nth-child(4)' );
        // lets try a few loops
        const entries_per_page = 3;
        for (let i = 0; i <= entries_per_page; i++) {
            
        }
        // on the ADA website you CANNOT click past page 100. 
        // CLICK INTO COURSE, triggers modal
        // why cant we click any other courses?
        await page.click('#search > div.coveo-results-section > div:nth-child(4) > div.CoveoPager > ul > li:nth-child(2) > a')
        
        // await page.click('#search > div.coveo-results-section > div:nth-child(4) > div.CoveoResultList > div > div:nth-child(2) > div > div > div.result-title-container > a');
        // await page.click('body > div.coveo-modalBox.coveo-quick-view > div.coveo-wrapper > div.coveo-title > span.coveo-quick-view-right-header > span.coveo-close-button');
        // Get list of frames
        // await page.waitFor(() => !document.querySelector('body > div.coveo-modalBox.coveo-quick-view > div.coveo-wrapper'));
        // await page.click( '#search > div.coveo-results-section > div:nth-child(4) > div.CoveoResultList > div > div:nth-child(2) > div > div > div.result-title-container > a' );
        // await page.click('#search > div.coveo-results-section > div:nth-child(4) > div.CoveoResultList > div > div:nth-child(2) > div > div > div.result-title-container > a');
        // let myFrames = await page.frames();
        // console.log( 'Frame Count:', myFrames.length );
        
        // // Select our frame
        // const Modal = myFrames[1];
        
        // courseInfo = await grabCourseInfo(Modal);
        // // closing the modal...
        // // await page.click('body > div.coveo-modalBox.coveo-quick-view > div.coveo-wrapper > div.coveo-title > span.coveo-quick-view-right-header > span.coveo-close-button');
        // console.log(courseInfo);

        // await page.waitForSelector( '#search > div.coveo-results-section > div:nth-child(4)' );
        // let anotherFrame = await page.frames();
    //    await myFrames[0].$$('#search > div.coveo-results-section > div:nth-child(4) > div.CoveoResultList > div > div:nth-child(2) > div > div > div.result-title-container > a').click();
        // await page2.click(page2);
        // console.log(page2);
        // await page.click('#search > div.coveo-results-section > div:nth-child(4) > div.CoveoResultList > div > div:nth-child(2) > div > div > div.result-title-container > a');        
        
        // console.log('second link should have been clicked')

        // await page.click( '#search > div.coveo-results-section > div:nth-child(5) > div.CoveoResultList > div > div:nth-child(1) > div > div > div.result-title-container > a' );
        // await page.close();
        //await button.click();
    }
    catch(e){
        console.log(e.stack);
    }

}


getPage();
