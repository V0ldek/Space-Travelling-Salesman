import {View} from "../view.js";
import {IPlanetInfo} from "../../Planets/planet.js";
import {ITemplateFactory} from "../../Templates/templateFactory.js";
import {IDictionary} from "../../dictionary.js";
import {Format} from "../../format.js";

export class PlanetModalView extends View {
    private readonly planetInfo: IPlanetInfo;

    public constructor(planetInfo: IPlanetInfo, templateFactory: ITemplateFactory) {
        super(`planet-modal`, templateFactory);
        this.planetInfo = planetInfo;
        this.setModalData();
        this.update();
    }

    protected getData(): IDictionary<string> {
        return {
            name: this.planetInfo.getName(),
            position: Format.positionToString(this.planetInfo.getPosition())
        };
    }

    private setModalData(): void {
        this.renderedTemplate.setId(`${this.planetInfo.getName()}-planet-modal`);
    }
}