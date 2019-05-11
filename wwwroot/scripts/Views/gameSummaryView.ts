import {ICreditsInfo, INicknameInfo} from "../Player/playerState.js";
import {ITimeInfo} from "../GameSystem/gameClock.js"
import {TemplateFactory} from "../template.js";
import {View} from "./view.js";
import {IDictionary} from "../dictionary.js";

export class GameSummaryView extends View {
    private readonly creditsInfo: ICreditsInfo;
    private readonly nicknameInfo: INicknameInfo;
    private readonly timeInfo: ITimeInfo;

    public constructor(creditsInfo: ICreditsInfo,
                       nicknameInfo: INicknameInfo,
                       timeInfo: ITimeInfo,
                       templateFactory: TemplateFactory) {
        super("game-summary", templateFactory);
        this.creditsInfo = creditsInfo;
        this.nicknameInfo = nicknameInfo;
        this.timeInfo = timeInfo;

        this.update();
    }

    public update(): void {
        this.renderedTemplate.renderData(this.getData());
    }

    private getData(): IDictionary<string> {
        return {
            nickname: this.nicknameInfo.getNickname(),
            score: this.creditsInfo.getCredits().toString(),
            time: this.timeInfo.getRemainingTimeString()
        };
    }
}