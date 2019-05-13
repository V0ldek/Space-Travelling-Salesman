import {ITemplateFactory} from "../../Templates/templateFactory.js";
import {IDictionary} from "../../dictionary.js";
import {IStarshipCardInfo} from "../../Starships/starshipCardInfo.js";
import {ModalTriggerView} from "../modalTriggerView.js";

export class PlanetStarshipView extends ModalTriggerView {
    private readonly starshipCardInfo: IStarshipCardInfo;

    public constructor(starshipCardInfo: IStarshipCardInfo, root: HTMLElement, templateFactory: ITemplateFactory) {
        super("planet-starship", `starship-modal-${starshipCardInfo.getId()}`,templateFactory, root);
        this.starshipCardInfo = starshipCardInfo;
    }

    protected getData(): IDictionary<string> {
        return {
            name: this.starshipCardInfo.getName()
        }
    }
}