'use strict';
const fmlog = require('@waynechang65/fml-consolelog').log;
const pci = require('./lib/popcat_click_it.js');
const HIGH_EFFICIENCY = (process.argv[2] === 'high') ? true : false;

(async () => {
    try {
        await pci.init();
        (HIGH_EFFICIENCY) ? await pci.clickloop2(): await pci.clickloop1();
    } catch (e) {
        fmlog('error_msg', ['ERROR', e.toString(), '']);
		console.log(e.stack);
		await browser.close();
    }
})();