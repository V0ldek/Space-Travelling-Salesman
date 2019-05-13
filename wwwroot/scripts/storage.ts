export class Storage {
    private static readonly ApplicationKeyPrefix: string = "spaceTravellingSalesman";

    public static isApplicationEntryKey(key: string): boolean {
        return key.indexOf(Storage.ApplicationKeyPrefix) === 0;
    }

    public static addItemToLocalStorage(key: string, value: string): void {
        window.localStorage.setItem(`${Storage.ApplicationKeyPrefix}:${key}`, value);
    }

    public static getItemFromLocalStorage(key: string): string {
        return window.localStorage.getItem(`${Storage.ApplicationKeyPrefix}:${key}`);
    }

    public static addItemToSessionStorage(key: string, value: string): void {
        window.sessionStorage.setItem(`${Storage.ApplicationKeyPrefix}:${key}`, value);
    }

    public static getItemFromSessionStorage(key: string): string {
        return window.sessionStorage.getItem(`${Storage.ApplicationKeyPrefix}:${key}`);
    }
}