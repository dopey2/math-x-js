const puppeteer = require('puppeteer')

describe("UMD", () => {
    test("Testing that objects from packages are correctly defined ", async () => {

        let browser = null;
        let title = null;
        let isMathXCombinationDefined = null;
        let res1 = null;
        let res2 = null;

        try {
            browser = await puppeteer.launch();

            const page = await browser.newPage();
            await page.goto(`file://${__dirname}/index.html`);

            title = await page.title()
            isMathXCombinationDefined = await page.evaluate("!!MathXCombination");

            const code1 = `
                const { Combination } = MathXCombination;
                Combination.withoutRepetition(["A", "B", "C"], 2);
            `

            const code2 = `
                const { Permutation } = MathXCombination;
                Permutation.withoutRepetition(["A", "B", "C"], 2);
            `

            res1 = await page.evaluate(code1);
            res2 = await page.evaluate(code2);

        } catch (err) {
            console.log(err);
        } finally {
            if(browser) {
                await browser.close()
            }

            expect(title).toBe("@math-x-ts/combination")
            expect(isMathXCombinationDefined).toBe(true);

            expect(res1).toBeDefined();
            expect(Array.isArray(res1)).toBe(true);
            expect(res1.length).toBe(3);

            expect(res2).toBeDefined();
            expect(Array.isArray(res2)).toBe(true);
            expect(res2.length).toBe(6);
        }

    }, 10000);
})
