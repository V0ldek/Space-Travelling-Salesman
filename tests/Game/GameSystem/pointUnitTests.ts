import "mocha";
import {expect} from "chai";
import {Point} from "../../../wwwroot/scripts/Game/GameSystem/point";

const eps = 0.001;

function expectToEqualPlusMinusEps(actual: number, expected: number) {
    expect(actual - expected).to.below(eps);
}

describe("point.euclideanDistanceTo", () => {
    it("should return sqrt(x^2 + y^2) for distance to 0", () => {
        const zero = new Point(0, 0);
        const oneZero = new Point(1, 0);
        const zeroOne = new Point(0, 1);
        const oneOne = new Point(1, 1);
        const sevenThree = new Point(7, 3);

        expectToEqualPlusMinusEps(zero.euclideanDistanceTo(zero), 0);
        expectToEqualPlusMinusEps(oneZero.euclideanDistanceTo(zero), 1);
        expectToEqualPlusMinusEps(zeroOne.euclideanDistanceTo(zero), 1);
        expectToEqualPlusMinusEps(oneOne.euclideanDistanceTo(zero), Math.sqrt(2));
        expectToEqualPlusMinusEps(sevenThree.euclideanDistanceTo(zero), Math.sqrt(7*7 + 3*3));
    });

    it("should return correct distance between two points", () => {
       const checkUpTo = 20;

       for(let firstX = 0; firstX <= checkUpTo; ++firstX) {
           for(let firstY = 0; firstY <= checkUpTo; ++firstY) {
               for(let secondX = 0; secondX <= checkUpTo; ++secondX) {
                   for(let secondY = 0; secondY <= checkUpTo; ++secondY) {
                       const first = new Point(firstX, firstY);
                       const second = new Point(secondX, secondY);

                       const expected = Math.sqrt(
                           (firstX - secondX) * (firstX - secondX) + (firstY - secondY) * (firstY - secondY));

                       expectToEqualPlusMinusEps(first.euclideanDistanceTo(second), expected);
                       expectToEqualPlusMinusEps(second.euclideanDistanceTo(first), expected);
                   }
               }
           }
       }
    });
});