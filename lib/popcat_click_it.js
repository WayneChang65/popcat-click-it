'use strict';
const DEBUG = false;

const puppeteer = require('puppeteer');
const fmlog = require('@waynechang65/fml-consolelog').log;
const os = require('os');
const userAgent = 'Mozilla/5.0.1 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3723.0 Safari/537.36';
const maSize = 10; // moving average (size = 10)
const avg = (nums) => nums.reduce((a, b) => a + b) / nums.length;

let browser, page;
let timeClicks = [];

async function _init(opt) {
    let this_os = os.platform();

    browser = (this_os === 'linux') ?
        await puppeteer.launch(Object.assign({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }, opt)) :
        await puppeteer.launch(Object.assign({
            headless: false
        }, opt));

    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(180 * 1000); // 3 mins
    page.setUserAgent(userAgent);
    fmlog('sys_msg', ['POPCAT-Click-it', 'Ready. Go!']);
}

async function _clickloop1() {
    const url = 'https://popcat.click';

    await page.goto(url, { waitUntil: 'networkidle0' });
    fmlog('sys_msg', ['Click Mode', 'Running.']);

    let i = 0;
    for (;;) {
        let startRun = process.hrtime(); // --START--
        i++;
        await page.click('#app');
        await page.waitForTimeout(38); // 30000/799 = 38ms/pop
        let endRun = process.hrtime(startRun); // --END--
        let { ms, pps } = _calculatePPS(endRun[1] / 1000000, maSize);
        fmlog('command_msg',
            ['POPCAT-Click-it', i.toString(), 'Click',
                `Speed: ${pps} PPS`, `Speed(avg): ${ms} ms/click`,
                (endRun[1] / 1000000).toString()
            ]);
        if (i !== 1 && (i % 100000) === 0) {
            await page.waitForTimeout(2000); // 2secs for saving the pic
            await page.screenshot({ path: `result-${i}.png` });
        }
    }
}

async function _clickloop2() {
    const url = 'https://popcat.click';

    await page.goto(url, { waitUntil: 'networkidle0' });
    fmlog('sys_msg', ['High Effiency Mode', 'Running.']);
    await page.evaluate(() => {
        let i = 0;
        setInterval(() => {
            fetch('https://stats.popcat.click/pop?pop_count=800&captcha_token=TWNO1');
            console.log(`Total ${ i += 800 } clicks  Speed(cal avg): ${ Math.round(30000 / 800) } ms/click` +
                `  Speed(cal avg): ${Math.round(1000 / (30000 / 800))} PPS`);
        }, 30000);
    });
    page.on('console', consoleObj => console.log(consoleObj.text()));
}

function _calculatePPS(time_click, size) {
    timeClicks.push(time_click);
    if (timeClicks.length > size) timeClicks = timeClicks.slice(1);
    if (DEBUG) console.log(timeClicks);
    if (DEBUG) console.log(`Speed(avg): ${Math.round(avg(timeClicks))} ms/click`);
    if (DEBUG) console.log(`Speed: ${Math.round(1000 / avg(timeClicks))} PPS`);
    return {
        ms: Math.round(avg(timeClicks)),
        pps: Math.round(1000 / avg(timeClicks))
    }
}

module.exports = {
    init: _init,
    clickloop1: _clickloop1,
    clickloop2: _clickloop2,
    calculatePPS: _calculatePPS
};