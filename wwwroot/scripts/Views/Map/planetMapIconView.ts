import {MapIconView} from "./mapIconView.js";
import {IPlanetCardInfo} from "../../Game/Planets/planetCardInfo.js";
import {ITemplateFactory} from "../../Game/Templates/templateFactory.js";
import {IDictionary} from "../../dictionary.js";
import {Point} from "../../Game/GameSystem/point.js";

export class PlanetMapIconView extends MapIconView {
    private readonly planetCardInfo: IPlanetCardInfo;

    public constructor(planetCardInfo: IPlanetCardInfo, root: HTMLElement, templateFactory: ITemplateFactory) {
        super("game-map-planet-icon", `planet-modal-${planetCardInfo.getId()}`, templateFactory, root);
        this.planetCardInfo = planetCardInfo;
        this.update();
    }

    getRepresentedObjectPosition(): Point {
        return this.planetCardInfo.getPosition();
    }

    protected getData(): IDictionary<string> {
        return {
            name: this.planetCardInfo.getName()
        };
    }
}