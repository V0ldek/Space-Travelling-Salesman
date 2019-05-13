import {IPlanetInfo} from "../../Planets/planetInfo.js";
import {ITemplateFactory} from "../../Templates/templateFactory.js";
import {Dictionary, IDictionary} from "../../../dictionary.js";
import {Format} from "../../../format.js";
import {PlanetItemStoreView} from "./planetItemStoreView.js";
import {PlanetStarshipView} from "./planetStarshipView.js";
import {IStarshipCardInfo} from "../../Starships/starshipCardInfo.js";
import {ModalView} from "../../../Views/modalView.js";

export class PlanetModalView extends ModalView {
    private readonly planetInfo: IPlanetInfo;
    private readonly itemStoreViews: PlanetItemStoreView[] = [];
    private readonly starshipViews: IDictionary<PlanetStarshipView> = {};

    public constructor(planetInfo: IPlanetInfo, templateFactory: ITemplateFactory) {
        super(`planet-modal`, `planet-modal-${planetInfo.getId()}`, templateFactory);
        this.planetInfo = planetInfo;
        this.createItemStoreViews();
        this.update();
    }

    public update(): void {
        super.update();
        this.itemStoreViews.forEach(v => v.update());
        Dictionary.forEach(this.starshipViews, (_, v) => v.update());
    }

    public createStarshipView(starshipCardInfo: IStarshipCardInfo): void {
        const name = starshipCardInfo.getName();
        if (this.starshipViews[name]) {
            this.starshipViews[name].remove();
        }
        this.starshipViews[name] = new PlanetStarshipView(
            starshipCardInfo,
            this.renderedTemplate.getElement(),
            this.templateFactory);
    }

    public removeStarshipView(starshipName: string): void {
        if (this.starshipViews[starshipName]) {
            this.starshipViews[starshipName].remove();
        }
    }

    protected getData(): IDictionary<string> {
        return {
            name: this.planetInfo.getName(),
            position: Format.positionToString(this.planetInfo.getPosition())
        };
    }

    private createItemStoreViews(): void {
        for (const itemStore of this.planetInfo.getItemStores()) {
            this.itemStoreViews.push(new PlanetItemStoreView(
                itemStore,
                this.renderedTemplate.getElement(),
                this.templateFactory));
        }
    }
}