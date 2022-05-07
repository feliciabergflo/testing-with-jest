const { Builder, By, until } = require("selenium-webdriver");
const { get } = require("selenium-webdriver/http");
const { DriverService } = require("selenium-webdriver/remote");
require("geckodriver");

const fileUnderTest = "file://" + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;

// Kontrollerar att Firefox är igång
beforeAll(async () => {
    driver = await new Builder().forBrowser("firefox").build();
    await driver.get(fileUnderTest);
});

// Avslutar Firefox
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);


/* Testar ifall "Pusha till stacken" öppnar en prompt box
samt visar det senaste tillagda elementet på sidan */
describe('Clicking "Pusha till stacken"', () => {
	it('should open a prompt box and display new element in stack', async () => {
		let push = await driver.findElement(By.id('push'));
		await push.click();

		let alert = await driver.switchTo().alert();
		await alert.sendKeys("test");
		await alert.accept();

        let stack = await driver.findElement(By.id("top_of_stack")).getText();
        expect(stack).toEqual("test");
	});
});

/* Testar ifall "Poppa stacken!" öppnar en prompt box
samt raderar det senaste tillagda elementet på sidan */
describe("Clicking 'Poppa stacken!'", () => {
    it("should open a prompt box", async () => {
		let push = await driver.findElement(By.id('push'));
		await push.click();
		let pushAlert = await driver.switchTo().alert();
		await pushAlert.sendKeys("test");   
        await pushAlert.accept();     
    
        let pop = await driver.findElement(By.id("pop"));
        await pop.click();
        let popAlert = await driver.switchTo().alert();
        await popAlert.accept();
    });
});