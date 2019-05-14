import "mocha";
import * as sinon from "sinon";
import {expect} from "chai"
import {IUpdateable} from "../../../../wwwroot/scripts/Game/GameSystem/updateable";
import {GameClock} from "../../../../wwwroot/scripts/Game/GameSystem/Clock/gameClock";

describe("gameClock.registerUpdateable", () => {
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        clock.restore();
    });

    it("should call update each tick in the order of registering", () => {
        let updates = 0;

        class TestItem implements IUpdateable {
            private updates: number[] = [];

            public update(): void {
                ++updates;
                this.updates.push(updates);
            }

            public getUpdates(): number[] {
                return this.updates;
            }
        }

        const testItemOne = new TestItem();
        const testItemTwo = new TestItem();
        const gameClock = new GameClock(100);
        gameClock.registerUpdateable(testItemTwo);
        gameClock.registerUpdateable(testItemOne);
        gameClock.start();
        clock.tick(1000);

        expect(testItemTwo.getUpdates()).to.eql([1]);
        expect(testItemOne.getUpdates()).to.eql([2]);

        clock.tick(999);

        expect(testItemTwo.getUpdates()).to.eql([1]);
        expect(testItemOne.getUpdates()).to.eql([2]);

        clock.tick(1);

        expect(testItemTwo.getUpdates()).to.eql([1, 3]);
        expect(testItemOne.getUpdates()).to.eql([2, 4]);

        clock.tick(5000);

        expect(testItemTwo.getUpdates()).to.eql([1, 3, 5, 7, 9, 11, 13]);
        expect(testItemOne.getUpdates()).to.eql([2, 4, 6, 8, 10, 12, 14]);
    });

    it("should stop updating after given ticks", () => {
        class TestItem implements IUpdateable {
            private updates: number = 0;

            public update(): void {
                ++this.updates;
            }

            public getUpdates(): number {
                return this.updates;
            }
        }

        const ticks = 100;
        const testItem = new TestItem();
        const gameClock = new GameClock(ticks);
        gameClock.registerUpdateable(testItem);
        gameClock.start();

        clock.tick(ticks * 1000);

        expect(testItem.getUpdates()).to.equal(ticks);

        clock.tick(10000);

        expect(testItem.getUpdates()).to.equal(ticks);
    });
});

describe("GameClock.getRemainingTicks", () => {
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        clock.restore();
    });

    it("should return correct number of remaining ticks after each tick", () => {
        const ticks = 100;
        const gameClock = new GameClock(ticks);
        gameClock.start();

        for(let expectedRemainingTicks = ticks; expectedRemainingTicks >= 0; --expectedRemainingTicks) {
            expect(gameClock.getRemainingTicks()).to.equal(expectedRemainingTicks);
            clock.tick(1000);
        }
        clock.tick(10000);
        expect(gameClock.getRemainingTicks()).to.equal(0);
    });
});

describe("GameClock.ticksToTimeString", () => {
   it("should return 00:00 for zero", () => {
       expect(GameClock.ticksToTimeString(0)).to.equal("00:00");
   });
   it("should return one second for each tick", () => {
      expect(GameClock.ticksToTimeString(42)).to.equal("00:42");
      expect(GameClock.ticksToTimeString(180)).to.equal("03:00");
      expect(GameClock.ticksToTimeString(222)).to.equal("03:42");
   });
});