import {View} from "../view.js";
import {ITemplateFactory} from "../../Templates/templateFactory.js";
import {IDictionary} from "../../dictionary.js";
import {IStarshipCardInfo} from "../../Starships/starship.js";

export class PlanetStarshipView extends View {
    private readonly starshipCardInfo: IStarshipCardInfo;

    public constructor(
        starshipCardInfo: IStarshipCardInfo,
        templateFactory: ITemplateFactory,
        root: HTMLElement) {
        super("planet-starship", templateFactory, root);
        this.starshipCardInfo = starshipCardInfo;
        this.setModalData();
    }

    public remove() {
        this.renderedTemplate.remove();
    }

    protected getData(): IDictionary<string> {
        return {
            name: this.starshipCardInfo.getName()
        }
    }

    private setModalData(): void {
        this.renderedTemplate.getElement().setAttribute(
            "data-target",
            `${this.starshipCardInfo.getName()}-starship-modal`);
    }
}