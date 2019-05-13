import {TemplateFactory} from "../Game/Templates/templateFactory.js";
import {LeaderboardView} from "./Views/Leaderboard/leaderboardView.js";
import {Leaderboard} from "./Leaderboard/leaderboard.js";
import {NicknameTriggerView} from "./Views/Nickname/nicknameTriggerView.js";
import {NicknameModalView} from "./Views/Nickname/nicknameModalView.js";

export class StartScreen {
    private readonly templateFactory: TemplateFactory;
    private readonly leaderboard: Leaderboard;
    private readonly leaderboardView: LeaderboardView;
    private readonly nicknameTriggerView: NicknameTriggerView;
    private readonly nicknameModalView: NicknameModalView;

    public constructor() {
        this.templateFactory = new TemplateFactory();
        this.leaderboard = new Leaderboard();
        this.leaderboardView = new LeaderboardView(this.leaderboard, this.templateFactory);
        this.nicknameTriggerView = new NicknameTriggerView(this.templateFactory);
        this.nicknameModalView = new NicknameModalView(this.templateFactory);
    }
}