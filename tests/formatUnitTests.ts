import {expect} from "chai";
import "mocha";
import {Format} from "../wwwroot/scripts/format";
import {Point} from "../wwwroot/scripts/Game/GameSystem/point";

describe("Format.padNumberToNCharacters", () => {
   it("should pad integers correctly", () => {
      const threeHundredTwentySeven = 327;
      const one = 1;
      const zero = 0;
      const million = 1000000;

      expect(Format.padNumberToNCharacters(threeHundredTwentySeven.toString(), 5)).to.equal("00327");
      expect(Format.padNumberToNCharacters(one.toString(), 5)).to.equal("00001");
      expect(Format.padNumberToNCharacters(zero.toString(), 5)).to.equal("00000");
      expect(Format.padNumberToNCharacters(million.toString(), 5)).to.equal(million.toString());
   });
   it("should pad decimals correctly", () => {
      const half = 0.5;
      const onehundredth = 0.01;
      const fortyTwoPointFortySeven = 42.47;
      const onemilionth = 0.000001;

      expect(Format.padNumberToNCharacters(half.toString(), 6)).to.equal("0000.5");
      expect(Format.padNumberToNCharacters(onehundredth.toString(), 6)).to.equal("000.01");
      expect(Format.padNumberToNCharacters(fortyTwoPointFortySeven.toString(), 6)).to.equal("042.47");
      expect(Format.padNumberToNCharacters(onemilionth.toString(), 6)).to.equal(onemilionth.toString());
   });
});

describe("Format.minutesAndSecondsToTimeString", () => {
   it("should properly format time by padding to two digits", () => {
      const zero = {
         minutes: 0,
         seconds: 0
      };
      const fiveSeconds = {
         minutes: 0,
         seconds: 5
      };
      const fiveMinutes = {
         minutes: 5,
         seconds: 0
      };
      const fiveOFive = {
         minutes: 5,
         seconds: 5
      };
      const twentyThirty = {
         minutes: 20,
         seconds: 30
      };
      const hundredTwentyOFive = {
         minutes: 120,
         seconds: 5
      };

      expect(Format.minutesAndSecondsToTimeString(zero.minutes, zero.seconds)).to.equal("00:00");
      expect(Format.minutesAndSecondsToTimeString(fiveSeconds.minutes, fiveSeconds.seconds)).to.equal("00:05");
      expect(Format.minutesAndSecondsToTimeString(fiveMinutes.minutes, fiveMinutes.seconds)).to.equal("05:00");
      expect(Format.minutesAndSecondsToTimeString(fiveOFive.minutes, fiveOFive.seconds)).to.equal("05:05");
      expect(Format.minutesAndSecondsToTimeString(twentyThirty.minutes, twentyThirty.seconds)).to.equal("20:30");
      expect(Format.minutesAndSecondsToTimeString(hundredTwentyOFive.minutes, hundredTwentyOFive.seconds)).to.equal(
          "120:05");
   });
});

describe("Format.positionToString", () => {
   it("should properly format a point by rounding to two digits", () => {
      const zero = new Point(0, 0);
      const oneZero = new Point(1, 0);
      const zeroOne = new Point(0, 1);
      const piAndE = new Point(Math.PI, Math.E);
      const hundredPointNineNineNineHundredPointNineNineNine = new Point(100.999, 100.999);

      expect(Format.positionToString(zero)).to.equal("00.00, 00.00");
      expect(Format.positionToString(oneZero)).to.equal("01.00, 00.00");
      expect(Format.positionToString(zeroOne)).to.equal("00.00, 01.00");
      expect(Format.positionToString(piAndE)).to.equal("03.14, 02.72");
      expect(Format.positionToString(hundredPointNineNineNineHundredPointNineNineNine)).to.equal("101.00, 101.00");
   });
});