import {IPlayerStateInfo} from "./playerStateInfo.js";
import {IUpdateable} from "../GameSystem/updateable";
import {GameSummaryView} from "../Views/gameSummaryView.js";
import {ITimeInfo} from "../GameSystem/Clock/timeInfo.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";

export class PlayerState implements IPlayerStateInfo, IUpdateable {
    private readonly nickname: string;
    private readonly gameSummaryView: GameSummaryView;
    private credits: number;

    public constructor(credits: number,
                       nickname: string = "V0ldek",
                       timeInfo: ITimeInfo,
                       templateFactory: ITemplateFactory) {
        this.credits = credits;
        this.nickname = nickname;
        this.gameSummaryView = new GameSummaryView(this, timeInfo, templateFactory);
    }

    public update(): void {
        this.gameSummaryView.update();
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