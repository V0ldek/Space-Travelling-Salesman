import {View} from "../../../Views/view.js";
import {ITemplateFactory} from "../../../Game/Templates/templateFactory.js";
import {IDictionary} from "../../../dictionary.js";
import {LeaderboardEntry} from "../../Leaderboard/leaderboardEntry.js";

export class LeaderboardEntryView extends View {
    private readonly rank: number;
    private readonly leaderboardEntry: LeaderboardEntry;

    public constructor(leaderboardEntry: LeaderboardEntry,
                       rank: number,
                       root: HTMLElement,
                       templateFactory: ITemplateFactory) {
        super("leaderboard-entry", templateFactory, root);
        this.rank = rank;
        this.leaderboardEntry = leaderboardEntry;
        this.update();
    }

    protected getData(): IDictionary<string> {
        return {
            rank: this.rank.toString(),
            nickname: this.leaderboardEntry.getNickname(),
            credits: this.leaderboardEntry.getCredits().toString()
        };
    }
}