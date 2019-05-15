import {Builder, Capabilities, Key} from "selenium-webdriver";
import {expect} from "chai";
import {driver} from "mocha-webdriver"

describe("starship list", () => {
    it("should view starship modal after clicking on starship card", async function() {
        this.timeout(5000);
        await driver.get("file:///D:/Code/year2/WWW/space-travelling-salesman/wwwroot/game.html");
        await driver.sleep(1000);
        await driver.findWait(2000, "section#game-summary");
        const starshipCards = await driver.findAll("#starship-list .starship-card");

        for(const e of starshipCards) {
            const starshipName = await e.find(".data-name").getText();
            await e.click();
            const openModal = await driver.find(".render-starship-modal .modal:not([hidden])");
            expect(await (await openModal.find(".starship-name .data-name")).getText()).to.equal(starshipName);
            await driver.sendKeys(Key.ESCAPE);
            expect(await openModal.isDisplayed()).to.equal(false);
        }
    });
});