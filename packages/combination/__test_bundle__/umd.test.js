const puppeteer = require('puppeteer')

describe("UMD", () => {
    test("Testing that objects from packages are correctly defined ", async () => {

        let browser = null;
        let title = null;
        let isMathXCoreDefined = null;
        let isMathXParserDefined = null;
        let res = null;

        try {
            browser = await puppeteer.launch();

            const page = await browser.newPage();
            await page.goto(`file://${__dirname}/index.html`);

            title = await page.title()
            isMathXCoreDefined = await page.evaluate("!!MathXCore");
            isMathXParserDefined = await page.evaluate("!!MathXParser");
            res = await page.evaluate("MathXParser.evaluate('1 + 2 * 3')");

        } catch (err) {
            console.log(err);
        } finally {
            if(browser) {
                await browser.close()
            }

            expect(title).toBe("@math-x-ts/parser")
            expect(isMathXCoreDefined).toBe(true);
            expect(isMathXParserDefined).toBe(true)
            expect(res).toBe(7)
        }

    }, 10000);
})
