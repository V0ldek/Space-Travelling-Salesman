import {View} from "../../../Views/view.js";
import {ITemplateFactory} from "../../Templates/templateFactory.js";
import {IDictionary} from "../../../dictionary.js";
import {ICargoHoldInfo} from "../../Starships/cargoHoldInfo.js";
import {Format} from "../../../format.js";
import {CargoItemView} from "./cargoItemView.js";

export class StarshipCargoView extends View {
    private readonly cargoHoldInfo: ICargoHoldInfo;
    private cargoItemViews: CargoItemView[] = [];

    public constructor(cargoHoldInfo: ICargoHoldInfo, root: HTMLElement, templateFactory: ITemplateFactory) {
        super("starship-cargo", templateFactory, root);
        this.cargoHoldInfo = cargoHoldInfo;
        this.update();
    }

    public update(): void {
        super.update();
        this.removeCargoItemViews();
        this.createCargoItemViews();
    }

    protected getData(): IDictionary<string> {
        const capacityString = this.cargoHoldInfo.getCapacity().toString();
        const cargoString = Format.padNumberToNCharacters(
            this.cargoHoldInfo.getCargoSize().toString(),
            capacityString.length);
        return {
            cargo: cargoString,
            capacity: capacityString
        }
    }

    private removeCargoItemViews(): void {
        this.cargoItemViews.forEach(v => v.remove());
        this.cargoItemViews = [];
    }

    private createCargoItemViews(): void {
        this.cargoHoldInfo.getCargoItems().forEach(i =>
            this.cargoItemViews.push(new CargoItemView(
                i,
                this.renderedTemplate.getElement(),
                this.templateFactory)));
    }
}