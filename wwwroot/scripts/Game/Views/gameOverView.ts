import {View} from "../../Views/view.js";
import {IPlayerStateInfo} from "../Player/playerStateInfo.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";
import {IDictionary} from "../../dictionary.js";

export class GameOverView extends View {
    private readonly playerStateInfo: IPlayerStateInfo;

    public constructor(playerStateInfo: IPlayerStateInfo, templateFactory: ITemplateFactory) {
        super("game-over-screen", templateFactory);
        this.playerStateInfo = playerStateInfo;
        this.setButtonBehaviour();
        this.update();
    }

    protected getData(): IDictionary<string> {
        return {
            credits: this.playerStateInfo.getCredits().toString()
        };
    }

    private setButtonBehaviour() {
        const button = this.renderedTemplate.getElement().querySelector("button.exit-to-start-button");
        button.addEventListener("click", () => {
            this.remove();
            window.location.href = "./index.html";
        });
    }
}