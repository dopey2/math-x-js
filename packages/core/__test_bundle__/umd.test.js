const puppeteer = require('puppeteer')

describe("UMD", () => {
    test("Testing that objects from packages are correctly defined ", async () => {
        // const browser = await puppeteer.launch({ headless: false })
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.goto(`file://${__dirname}/index.html`);

        const title = await page.title()
        const isMathXCoreDefined = await page.evaluate("!!MathXCore");
        const res = await page.evaluate(`
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

        await browser.close()

        expect(title).toBe("@math-x-ts/core")
        expect(isMathXCoreDefined).toBe(true);
        expect(res).toBe(23)
    }, 10000);
})