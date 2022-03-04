const puppeteer = require('puppeteer')

describe("UMD", () => {

    let browser = null;
    let title = null;
    let isMathXCoreDefined = null;
    let res = null;

    test("Testing that objects from packages are correctly defined ", async () => {
        // const browser = await puppeteer.launch({ headless: false })

        try {
            browser = await puppeteer.launch();

            const page = await browser.newPage();
            await page.goto(`file://${__dirname}/index.html`);

            title = await page.title()
            isMathXCoreDefined = await page.evaluate("!!MathXCore");
            res = await page.evaluate(`
            const {Add, Constant, Multiply} = MathXCore;
            
            const mathNode = new Add(
                new Constant(3),
                new Multiply(
                    new Constant(4),
                    new Constant(5),
                )
            );
            
            mathNode.evaluate();
        `)

        } catch (err) {
            console.error(err);
        } finally {
            if(browser) {
                await browser.close();
            }

            expect(title).toBe("@math-x-ts/core")
            expect(isMathXCoreDefined).toBe(true);
            expect(res).toBe(23)
        }

    }, 10000);
})