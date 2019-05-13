import {IStarshipCardInfo} from "../../Starships/starshipCardInfo.js";
import {ITemplateFactory} from "../../Templates/templateFactory.js";
import {IDictionary} from "../../dictionary.js";
import {Format} from "../../format.js";
import {GameClock} from "../../GameSystem/Clock/gameClock.js";
import {ModalTriggerView} from "../modalTriggerView.js";

export class StarshipCardView extends ModalTriggerView {
    private readonly starshipCardInfo: IStarshipCardInfo;

    public constructor(starshipCardInfo: IStarshipCardInfo, templateFactory: ITemplateFactory) {
        super("starship-card", `starship-modal-${starshipCardInfo.getId()}`, templateFactory);
        this.starshipCardInfo = starshipCardInfo;
        this.update();
    }

    protected getData(): IDictionary<string> {
        const eta = this.starshipCardInfo.getEtaToCurrentDestination();
        const etaString = eta > 0 ? ` in ${GameClock.ticksToTimeString(eta)}` : "";
        return {
            name: this.starshipCardInfo.getName(),
            planet: this.starshipCardInfo.getDestinationName(),
            eta: etaString,
            position: Format.positionToString(this.starshipCardInfo.getPosition())
        };
    }
}