const puppeteer = require('puppeteer')

describe("UMD", () => {
    test("Testing that objects from packages are correctly defined ", async () => {
        // const browser = await puppeteer.launch({ headless: false })
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.goto(`file://${__dirname}/index.html`);

        const title = await page.title()
        const isMathXCoreDefined = await page.evaluate("!!MathXCore");
        const isMathXParserDefined = await page.evaluate("!!MathXParser");
        const res = await page.evaluate("MathXParser.evaluate('1 + 2 * 3')");

        await browser.close()

        expect(title).toBe("@math-x-ts/parser")
        expect(isMathXCoreDefined).toBe(true);
        expect(isMathXParserDefined).toBe(true)
        expect(res).toBe(7)
    }, 10000);
})