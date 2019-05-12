import {IPlayerStateInfo} from "./playerStateInfo.js";

export class PlayerState implements IPlayerStateInfo {
    private readonly nickname: string;
    private credits: number;

    public constructor(credits: number, nickname: string = "V0ldek") {
        this.credits = credits;
        this.nickname = nickname;
    }

    public getCredits(): number {
        return this.credits;
    }

    public changeCredits(amount: number): void {
        if (this.credits + amount < 0) {
            throw new Error(`Invalid transaction, changing by ${amount} when the balance is ${this.credits}.`);
        }
        this.credits += amount;
    }

    public getNickname(): string {
        return this.nickname;
    }
}