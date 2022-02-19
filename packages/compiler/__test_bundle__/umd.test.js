const puppeteer = require('puppeteer')

describe("UMD", () => {
    test("Testing that objects from packages are correctly defined ", async () => {
        // const browser = await puppeteer.launch({ headless: false })
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.goto(`file://${__dirname}/index.html`);

        const title = await page.title()
        const isMathXCoreDefined = await page.evaluate("!!MathXCore");
        const isMathXCompilerDefined = await page.evaluate("!!MathXCompiler");
        const res = await page.evaluate("MathXCompiler.evaluate('1 + 2 * 3')");

        await browser.close()

        expect(title).toBe("@math-x-ts/compiler")
        expect(isMathXCoreDefined).toBe(true);
        expect(isMathXCompilerDefined).toBe(true)
        expect(res).toBe(7)
    }, 10000);
})