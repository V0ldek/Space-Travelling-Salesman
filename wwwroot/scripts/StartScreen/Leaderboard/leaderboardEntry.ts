export class LeaderboardEntry {
    private readonly nickname: string;
    private readonly credits: number;

    public constructor(nickname: string, credits: number) {
        this.nickname = nickname;
        this.credits = credits;
    }

    public getNickname(): string {
        return this.nickname;
    }

    public getCredits(): number {
        return this.credits;
    }
}