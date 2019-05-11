export interface ICreditsInfo {
    getCredits(): number;
}

export interface ICreditsManager extends ICreditsInfo {
    changeCredits(amount: number): void;
}

export interface INicknameInfo {
    getNickname(): string;
}

export class PlayerState implements ICreditsManager, INicknameInfo {
    private credits: number;
    private readonly nickname: string;

    public constructor(credits: number, nickname: string) {
        this.credits = credits;
        this.nickname = nickname;
    }

    public getCredits(): number {
        return this.credits;
    }

    public changeCredits(amount: number): void {
        if(this.credits + amount < 0) {
            throw new Error(`Invalid transaction, changing by ${amount} when the balance is ${this.credits}.`);
        }
        this.credits += amount;
    }

    public getNickname(): string {
        return this.nickname;
    }
}