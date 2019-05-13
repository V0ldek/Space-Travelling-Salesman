import {IPlanetCardInfo} from "../../Planets/planetCardInfo.js";
import {ITemplateFactory} from "../../Templates/templateFactory.js";
import {IDictionary} from "../../dictionary.js";
import {Format} from "../../format.js";
import {ModalTriggerView} from "../modalTriggerView.js";

export class PlanetCardView extends ModalTriggerView {
    private readonly planetCardInfo: IPlanetCardInfo;

    public constructor(planetCardInfo: IPlanetCardInfo, templateFactory: ITemplateFactory) {
        super("planet-card", `planet-modal-${planetCardInfo.getId()}`, templateFactory);
        this.planetCardInfo = planetCardInfo;
        this.update();
    }

    protected getData(): IDictionary<string> {
        return {
            name: this.planetCardInfo.getName(),
            position: Format.positionToString(this.planetCardInfo.getPosition())
        };
    }
}