import {View} from "./view.js";
import {IPlanetCardInfo} from "../Planets/planet.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";
import {IDictionary} from "../dictionary.js";
import {Format} from "../format.js";

export class PlanetCardView extends View {
    private readonly planetCardInfo: IPlanetCardInfo;

    public constructor(planetCardInfo: IPlanetCardInfo, templateFactory: ITemplateFactory) {
        super("planet-card", templateFactory);
        this.planetCardInfo = planetCardInfo;

        this.setModalData();
        this.update();
    }

    public update(): void {
        this.renderedTemplate.renderData(this.getData())
    }

    private setModalData(): void {
        this.renderedTemplate.setAttribute(
            "data-target",
            `${this.planetCardInfo.getName()}-planet-modal`);
    }

    private getData(): IDictionary<string> {
        return {
            name: this.planetCardInfo.getName(),
            position: Format.positionToString(this.planetCardInfo.getPosition())
        };
    }
}