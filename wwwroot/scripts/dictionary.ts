export interface IDictionary<T> {
    [name: string]: T
}

export class Dictionary {
    public static forEach<T>(dictionary: IDictionary<T>, action: ((key: string, value: T) => void)): void {
        for (const key in dictionary) {
            if (dictionary.hasOwnProperty(key)) {
                action(key, dictionary[key]);
            }
        }
    }
}