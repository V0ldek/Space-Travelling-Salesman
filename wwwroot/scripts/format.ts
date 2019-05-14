import {Point} from "./Game/GameSystem/point.js";

export class Format {
    public static padLeft(source: string, padding: string, length: number): string {
        let result = source;
        while (result.length < length) {
            result = padding + result;
        }
        return result;
    }

    public static padNumberToNCharacters(number: string, characters: number): string {
        return Format.padLeft(number, "0", characters);
    }

    public static minutesAndSecondsToTimeString(minutes: number, seconds: number): string {
        const formattedMinutes = Format.padNumberToNCharacters(minutes.toString(), 2);
        const formattedSeconds = Format.padNumberToNCharacters(seconds.toString(), 2);
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    public static positionToString(position: Point): string {
        const x = position.getX().toFixed(2);
        const y = position.getY().toFixed(2);
        return `${Format.padNumberToNCharacters(x, 5)}` +
            `, ${Format.padNumberToNCharacters(y, 5)}`;
    }
}