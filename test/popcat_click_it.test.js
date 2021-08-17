const pci = require('../lib/popcat_click_it.js');

test('1. Test for Calculate PPS ', () => {
    let r;
    for (let i = 0; i < 10; i++) {
         r = pci.calculatePPS(i, 10);
    }
    expect(r.ms).toBe(5);
    expect(r.pps).toBe(222);
});

