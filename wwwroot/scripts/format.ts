export class Format {
    public static padLeft(source: string, padding: string, length: number) {
        let result = source;
        while(result.length < length) {
            result = padding + result;
        }
        return result;
    }

    public static padNumberToTwoDigits(number: number) {
        return Format.padLeft(number.toString(), "0", 2);
    }

    public static minutesAndSecondsToTimeString(minutes: number, seconds: number) {
        return `${Format.padNumberToTwoDigits(minutes)}:${Format.padNumberToTwoDigits(seconds)}`;
    }
}