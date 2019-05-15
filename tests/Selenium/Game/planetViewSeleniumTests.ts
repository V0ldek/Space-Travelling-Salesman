import {Key} from "selenium-webdriver";
import {expect} from "chai";
import {driver} from "mocha-webdriver"

describe("planet list", () => {
    it("should view planet modal after clicking on planet card", async function () {
        this.timeout(5000);
        await driver.get("file:///D:/Code/year2/WWW/space-travelling-salesman/wwwroot/game.html");
        await driver.sleep(1000);
        await driver.findWait(2000, "section#game-summary");
        const planetCards = await driver.findAll("#planet-list .planet-card");

        for (const e of planetCards) {
            const planetName = await e.find(".data-name").getText();
            await e.click();
            const openModal = await driver.find(".render-planet-modal .modal:not([hidden])");
            expect(await (await openModal.find(".planet-name .data-name")).getText()).to.equal(planetName);
            await driver.sendKeys(Key.ESCAPE);
            expect(await openModal.isDisplayed()).to.equal(false);
        }
    });
});

describe("map", () => {
    it("should view planet modal after clicking on planet icon", async function () {
        this.timeout(500000);
        await driver.get("file:///D:/Code/year2/WWW/space-travelling-salesman/wwwroot/game.html");
        await driver.findWait(2000, "section#game-summary");
        await driver.executeScript(
            `  var event = new Event("wheel");
           
                    event.x = 500;
                    event.y = 500;
                    event.deltaY = 300;
                    
                    document.querySelector(".game-map-container").dispatchEvent(event);
                    
                    console.log("dispatched");
                 `
        );
        await driver.sleep(1000);
        const planetCards = await driver.findAll(".game-map .game-map-planet-icon");

        for (const e of planetCards) {
            const planetName = await e.find(".data-name").getText();
            const icon = await e.find("img");
            try {
                await icon.click();
            } catch (ElementClickInterceptedError) {
                continue;
            }
            const openModal = await driver.find(".render-planet-modal .modal:not([hidden])");
            expect(await (await openModal.find(".planet-name .data-name")).getText()).to.equal(planetName);
            await driver.sendKeys(Key.ESCAPE);
            expect(await openModal.isDisplayed()).to.equal(false);
        }
    });
});