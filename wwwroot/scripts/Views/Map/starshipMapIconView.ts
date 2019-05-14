import {MapIconView} from "./mapIconView.js";
import {ITemplateFactory} from "../../Game/Templates/templateFactory.js";
import {IDictionary} from "../../dictionary.js";
import {Point} from "../../Game/GameSystem/point.js";
import {IStarshipCardInfo} from "../../Game/Starships/starshipCardInfo.js";

export class StarshipMapIconView extends MapIconView {
    private readonly starshipCardInfo: IStarshipCardInfo;

    public constructor(starshipCardInfo: IStarshipCardInfo, root: HTMLElement, templateFactory: ITemplateFactory) {
        super("game-map-starship-icon", `starship-modal-${starshipCardInfo.getId()}`, templateFactory, root);
        this.starshipCardInfo = starshipCardInfo;
        this.update();
    }

    public update() {
        if(this.starshipCardInfo.getEtaToCurrentDestination() === 0) {
            this.hide();
        }
        else {
            this.show();
        }

        super.update();
    }

    public getRepresentedObjectPosition(): Point {
        return this.starshipCardInfo.getPosition();
    }

    private hide(): void {
        this.renderedTemplate.getElement().hidden = true;
    }

    private show(): void {
        this.renderedTemplate.getElement().hidden = false;
    }

    protected getData(): IDictionary<string> {
        return {
            name: this.starshipCardInfo.getName()
        };
    }
}