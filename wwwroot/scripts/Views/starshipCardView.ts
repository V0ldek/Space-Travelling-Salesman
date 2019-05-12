import {View} from "./view.js";
import {IStarshipCardInfo} from "../Starships/starship.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";
import {IDictionary} from "../dictionary.js";
import {Format} from "../format.js";

export class StarshipCardView extends View {
    private readonly starshipCardInfo: IStarshipCardInfo;

    public constructor(starshipCardInfo: IStarshipCardInfo, templateFactory: ITemplateFactory) {
        super("starship-card", templateFactory);
        this.starshipCardInfo = starshipCardInfo;

        this.setModalData();
        this.update();
    }

    private setModalData(): void {
        this.renderedTemplate.setAttribute(
            "data-target",
            `${this.starshipCardInfo.getName()}-starship-modal`);
    }

    protected getData(): IDictionary<string> {
        return {
            name: this.starshipCardInfo.getName(),
            planet: this.starshipCardInfo.getDestinationPlanetName(),
            eta: this.starshipCardInfo.getEta(),
            position: Format.positionToString(this.starshipCardInfo.getPosition())
        };
    }
}