import {Point} from "./GameSystem/point.js";

export class Format {
    public static padLeft(source: string, padding: string, length: number) {
        let result = source;
        while (result.length < length) {
            result = padding + result;
        }
        return result;
    }

    public static padNumberToNDigits(number: string, digits: number) {
        return Format.padLeft(number, "0", digits);
    }

    public static minutesAndSecondsToTimeString(minutes: number, seconds: number) {
        const formattedMinutes = Format.padNumberToNDigits(minutes.toString(), 2);
        const formattedSeconds = Format.padNumberToNDigits(seconds.toString(), 2);
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    public static positionToString(position: Point) {
        const x = position.getX().toFixed(2);
        const y = position.getY().toFixed(2);
        return `${Format.padNumberToNDigits(x, 5)}` +
            `, ${Format.padNumberToNDigits(y, 5)}`;
    }
}