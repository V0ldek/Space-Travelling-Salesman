import {IPositionInfo} from "./GameSystem/position.js";

export class Format {
    public static padLeft(source: string, padding: string, length: number) {
        let result = source;
        while(result.length < length) {
            result = padding + result;
        }
        return result;
    }

    public static padNumberToNDigits(number: number, digits: number) {
        return Format.padLeft(number.toString(), "0", digits);
    }

    public static minutesAndSecondsToTimeString(minutes: number, seconds: number) {
        return `${Format.padNumberToNDigits(minutes, 2)}:${Format.padNumberToNDigits(seconds, 2)}`;
    }

    public static positionToString(position: IPositionInfo) {
        return `${Format.padNumberToNDigits(position.getX(), 3)}`+
               `, ${Format.padNumberToNDigits(position.getY(), 3)}`;
    }

    public static sanitizeSelectorQuery(query: string) {
        const regexString = /['!@$^%&*#()\[\]{}.<>;:?`\\=]/g;
        const regex = new RegExp(regexString);
        return query.replace(regex, "\\$&");
    }
}