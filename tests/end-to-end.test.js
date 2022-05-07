const { Builder, By, until } = require("selenium-webdriver");
require("geckodriver");

const fileUnderTest = "file://" + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;

// Kontrollerar att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser("firefox").build();
    await driver.get(fileUnderTest);
});

// Avslutar Firefox
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);


/* Testar ifall "Pusha till stacken" visar det senaste tillagda elementet på sidan */
describe("Clicking 'Pusha till stacken'", () => {
	it("should display the new element in stack", async () => {
		let push = await driver.findElement(By.id('push'));
		await push.click();

		let alert = await driver.switchTo().alert();
		await alert.sendKeys("test");
		await alert.accept();

        let stack = await driver.findElement(By.id("top_of_stack")).getText();
        expect(stack).toEqual("test");
	});
});

/* Testar ifall "Poppa stacken!" öppnar en prompt box */
describe("Clicking 'Poppa stacken!'", () => {
    it("should open a prompt box", async () => {
        let pop = await driver.findElement(By.id("pop"));
        await pop.click();
        let alert = await driver.switchTo().alert();
        await alert.accept();
    });
});