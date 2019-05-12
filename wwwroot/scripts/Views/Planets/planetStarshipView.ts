import {ITemplateFactory} from "../../Templates/templateFactory.js";
import {IDictionary} from "../../dictionary.js";
import {IStarshipCardInfo} from "../../Starships/starshipCardInfo.js";
import {RemovableView} from "../removableView.js";

export class PlanetStarshipView extends RemovableView {
    private readonly starshipCardInfo: IStarshipCardInfo;

    public constructor(starshipCardInfo: IStarshipCardInfo, root: HTMLElement, templateFactory: ITemplateFactory) {
        super("planet-starship", templateFactory, root);
        this.starshipCardInfo = starshipCardInfo;
        this.setModalData();
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