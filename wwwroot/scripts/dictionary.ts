export interface IDictionary<T> {
    [name: string]: T
}

export class Dictionary {
    public static forEach<T>(dictionary: IDictionary<T>, action: ((key: string, value: T) => void)): void {
        for (const key in dictionary) {
            if (dictionary.hasOwnProperty(key) && dictionary[key]) {
                action(key, dictionary[key]);
            }
        }
    }

    public static fromArray<T>(array: T[], keyProvider: ((e: T) => string)): IDictionary<T> {
        const result: IDictionary<T> = {};
        for(const item of array) {
            result[keyProvider(item)] =  item;
        }
        return result;
    }
}