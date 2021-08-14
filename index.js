'use strict';
const puppeteer = require('puppeteer');
const fmlog = require('@waynechang65/fml-consolelog').log;
const os = require('os');

let browser, page;
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3723.0 Safari/537.36';

async function init(opt) {
	let this_os = os.platform();
	browser = (this_os === 'linux') ?
		await puppeteer.launch(Object.assign({
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		}, opt)) :
		await puppeteer.launch(Object.assign({
			headless: false
		}, opt));

	page = await browser.newPage();
	await page.setRequestInterception(true);
	page.on('request', request => {
		if (request.resourceType() === 'image')
			request.abort();
		else
			request.continue();
	});
	page.setUserAgent(userAgent);
    fmlog('sys_msg', ['POPCAT-Click-it', 'Ready. Go!']);
}

async function clickloop() {
    const url = 'https://popcat.click';
    try {
        await page.goto(url, { waitUntil: 'networkidle0' });
        let i = 0;
        for(;;) {
            i++;
            await page.click('#app');
            await page.waitForTimeout(38); // 30000/799 = 38ms/pop
            fmlog('command_msg',
	            ['POPCAT-Click-it', i.toString(), 'Click', '-', '-', '-']);
            if (i !== 1 && (i % 100000) === 0) {
                await page.waitForTimeout(2000);
                await page.screenshot({ path: `screenshot${i}.png` });
            }
        }
    } catch (e) {
        fmlog('error_msg', ['ERROR', e.toString(), '']);
		console.log(e.stack);
		await browser.close();
    }
}

(async () => {
    await init();
    await clickloop();
})();