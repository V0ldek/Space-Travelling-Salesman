import {View} from "../../../Views/view.js";
import {ITemplateFactory} from "../../../Game/Templates/templateFactory.js";
import {LeaderboardEntryView} from "./leaderboardEntryView.js";
import {Leaderboard} from "../../Leaderboard/leaderboard.js";
import {IDictionary} from "../../../dictionary.js";
import {LeaderboardEntry} from "../../Leaderboard/leaderboardEntry.js";

export class LeaderboardView extends View {
    private static readonly Size: number = 10;
    private readonly leaderboard: Leaderboard;
    private readonly leaderboardEntryViews: LeaderboardEntryView[] = [];

    public constructor(leaderboard: Leaderboard, templateFactory: ITemplateFactory) {
        super("leaderboard", templateFactory);
        this.leaderboard = leaderboard;
        this.createLeaderboardEntryViews();
    }

    private createLeaderboardEntryViews(): void {
        const leaderboardEntries = this.leaderboard.getEntries().sort(
            (a, b) => b.getCredits() - a.getCredits());
        for(let i = leaderboardEntries.length; i < LeaderboardView.Size; ++i) {
            leaderboardEntries.push(new LeaderboardEntry("-", 0));
        }
        leaderboardEntries.splice(0, LeaderboardView.Size).forEach(
            (e, i) => this.createLeaderboardEntryView(e, i + 1));
    }

    private createLeaderboardEntryView(leaderboardEntry: LeaderboardEntry, rank: number): void {
        this.leaderboardEntryViews.push(
            new LeaderboardEntryView(
                leaderboardEntry,
                rank,
                this.renderedTemplate.getElement(),
                this.templateFactory));
    }

    protected getData(): IDictionary<string> {
        return {};
    }
}