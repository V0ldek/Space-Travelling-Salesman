export class LeaderboardEntry {
    public readonly nickname: string;
    public readonly credits: number;

    public constructor(nickname: string, credits: number) {
        this.nickname = nickname;
        this.credits = credits;
    }
}