import {GameClock} from "../GameSystem/Clock/gameClock.js"
import {TemplateFactory} from "../Templates/templateFactory.js";
import {View} from "./view.js";
import {IDictionary} from "../dictionary.js";
import {ITimeInfo} from "../GameSystem/Clock/timeInfo.js";
import {IPlayerStateInfo} from "../Player/playerStateInfo.js";

export class GameSummaryView extends View {
    private readonly playerStateInfo: IPlayerStateInfo;
    private readonly timeInfo: ITimeInfo;

    public constructor(creditsInfo: IPlayerStateInfo, timeInfo: ITimeInfo, templateFactory: TemplateFactory) {
        super("game-summary", templateFactory);
        this.playerStateInfo = creditsInfo;
        this.timeInfo = timeInfo;
        this.update();
    }

    protected getData(): IDictionary<string> {
        return {
            nickname: this.playerStateInfo.getNickname(),
            score: this.playerStateInfo.getCredits().toString(),
            time: GameClock.ticksToTimeString(this.timeInfo.getRemainingTicks())
        };
    }
}