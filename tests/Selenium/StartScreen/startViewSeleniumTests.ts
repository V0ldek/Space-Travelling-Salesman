import {Builder, Capabilities, Key} from "selenium-webdriver";
import {expect} from "chai";
import {driver} from "mocha-webdriver"

describe("Start screen start button", () => {
    it("should open a popup with nickname input", async function() {
        this.timeout(5000);
        await driver.get("file:///D:/Code/year2/WWW/space-travelling-salesman/wwwroot/start.html");

        await driver.find(".start-button-container button.start-button").click();
        const input = await driver.find("input.nickname-input");
        expect(await input.isDisplayed()).to.equal(true);
    });
});

describe("Start screen nickname popup", () => {
    afterEach(async () => {
        await driver.executeScript("window.sessionStorage.clear()");
    });

    it("should start a new game with passed nickname", async function() {
        this.timeout(5000);

        await driver.get("file:///D:/Code/year2/WWW/space-travelling-salesman/wwwroot/start.html");

        await driver.find(".start-button-container button.start-button").click();
        const input = await driver.find("input.nickname-input");
        const nickname = "TestNickname";
        await input.sendKeys(nickname);
        await input.sendKeys(Key.ENTER);

        expect(await driver.findWait(2000, "section#game-summary").isPresent()).to.equal(true);
        expect(await driver.find("p#game-summary-nickname").getText()).to.equal(
            `PLAYER: ${nickname.toUpperCase()}`);
    });

    it("should not accept an empty nickname", async function() {
        this.timeout(5000);

        await driver.get("file:///D:/Code/year2/WWW/space-travelling-salesman/wwwroot/start.html");

        await driver.find(".start-button-container button.start-button").click();
        const input = await driver.find("input.nickname-input");
        await input.sendKeys(Key.ENTER);

        try {
            driver.findWait(1, "section#game-summary");
            expect.fail();
        }
        catch(TimeoutError) {}
    });
});