import {LeaderboardEntry} from "./leaderboardEntry.js";
import {Storage} from "../../storage.js";

export class Leaderboard {
    private static readonly KeyPrefix: string = "leaderboard";
    private static readonly EntryKeyPrefix: string = "entry";
    private static readonly StaticEntries: LeaderboardEntry[] = [
        new LeaderboardEntry("V0ldek", 10000),
        new LeaderboardEntry("V0ldek", 7500),
        new LeaderboardEntry("V0ldek", 5000),
        new LeaderboardEntry("V0ldek", 3500),
        new LeaderboardEntry("V0ldek", 2000)
    ];
    // noinspection JSMismatchedCollectionQueryUpdate
    private readonly leaderboardEntries: LeaderboardEntry[] = [];

    public constructor() {
        this.addStaticEntries();
        this.parseEntriesFromLocalStorage();
    }

    public getEntries(): LeaderboardEntry[] {
        return this.leaderboardEntries;
    }

    public static saveScore(nickname: string, credits: number) {
        const numberOfEntries = Leaderboard.getNumberOfEntriesFromLocalStorage();
        const key = `${Leaderboard.EntryKeyPrefix}:${numberOfEntries + 1}`;
        const entry = new LeaderboardEntry(nickname, credits);
        Leaderboard.addItemToLocalStorage(key, JSON.stringify(entry));
    }

    private addStaticEntries(): void {
        Leaderboard.StaticEntries.forEach(e => this.leaderboardEntries.push(e));
    }

    private parseEntriesFromLocalStorage(): void {
        for(const key in window.localStorage) {
            if(!Storage.isApplicationEntryKey(key) || !Leaderboard.isLeaderboardEntryKey(key)) {
                continue;
            }
            const entry = JSON.parse(window.localStorage[key]) as LeaderboardEntry;
            if(entry) {
                this.leaderboardEntries.push(new LeaderboardEntry(entry.nickname, entry.credits));
            }
        }
    }

    private static getNumberOfEntriesFromLocalStorage(): number {
        const number = Leaderboard.getItemFromLocalStorage("numberOfEntries");
        if(!number) {
            Leaderboard.addItemToLocalStorage("numberOfEntries", "0");
            return 0;
        }
        return parseInt(number);
    }

    private static getItemFromLocalStorage(key: string): string {
        return Storage.getItemFromLocalStorage(`${Leaderboard.KeyPrefix}:${key}`);
    }

    private static addItemToLocalStorage(key: string, value: string): void {
        const keyWithPrefix = `${Leaderboard.KeyPrefix}:${key}`;
        if(this.isLeaderboardEntryKey(keyWithPrefix)) {
            this.incrementNumberOfEntriesInLocalStorage();
        }
        Storage.addItemToLocalStorage(keyWithPrefix, value);
    }

    private static isLeaderboardEntryKey(key: string) {
        return key.indexOf(`${Leaderboard.KeyPrefix}:${Leaderboard.EntryKeyPrefix}`) >= 0;
    }

    private static incrementNumberOfEntriesInLocalStorage(): void {
        const number = this.getNumberOfEntriesFromLocalStorage();
        Leaderboard.addItemToLocalStorage("numberOfEntries", (number + 1).toString());
    }
}